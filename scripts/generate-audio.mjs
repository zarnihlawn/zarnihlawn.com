// Prebuilt narration for the blog. One MP3 per post in static/blog/audio/.
//
// Needs the edge-tts CLI once: python3 -m venv .venv && .venv/bin/pip install edge-tts
// Point EDGE_TTS at that binary if it is not on PATH.
// Usage: npm run audio [-- --force]

import { execFile } from 'node:child_process';
import { mkdir, readdir, readFile, rm, stat } from 'node:fs/promises';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const run = promisify(execFile);
const ROOT = fileURLToPath(new URL('..', import.meta.url));
const SOURCE = path.join(ROOT, 'src/lib/content/blog');
const OUT = path.join(ROOT, 'static/blog/audio');
const VOICE = 'en-US-AndrewNeural';
const BIN = process.env.EDGE_TTS ?? 'edge-tts';
const force = process.argv.includes('--force');

function spoken(raw) {
	const [, frontmatter = '', body = ''] = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/) ?? [];
	const title = frontmatter.match(/^title:\s*'(.+)'$/m)?.[1] ?? '';

	const text = body
		.replace(/```[\s\S]*?```/g, ' ')
		.replace(/^#{1,6}\s+/gm, '. ')
		.replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
		.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
		.replace(/[*_`~]/g, '')
		.replace(/^\s*[-*]\s+/gm, '. ')
		.replace(/\s+/g, ' ')
		.replace(/\.(\s*\.)+/g, '.')
		.trim();

	return `${title}. ${text}`;
}

async function isFresh(md, mp3) {
	const [source, target] = await Promise.all([stat(md), stat(mp3).catch(() => null)]);
	return target !== null && target.size > 0 && target.mtimeMs > source.mtimeMs;
}

/** The speech endpoint drops long requests intermittently, so retry before failing the run. */
async function speak(text, mp3, attempt = 1) {
	try {
		await run(BIN, ['--voice', VOICE, '--text', text, '--write-media', mp3], {
			maxBuffer: 1024 * 1024
		});
	} catch (error) {
		await rm(mp3, { force: true });
		if (attempt >= 3) throw error;
		await new Promise((resolve) => setTimeout(resolve, attempt * 3000));
		return speak(text, mp3, attempt + 1);
	}
}

await mkdir(OUT, { recursive: true });

const files = (await readdir(SOURCE)).filter((name) => name.endsWith('.md')).sort();
let built = 0;

for (const name of files) {
	const slug = name.replace(/\.md$/, '');
	const md = path.join(SOURCE, name);
	const mp3 = path.join(OUT, `${slug}.mp3`);

	if (!force && (await isFresh(md, mp3))) continue;

	const text = spoken(await readFile(md, 'utf8'));
	await speak(text, mp3);
	built += 1;
	console.log(`built ${path.relative(ROOT, mp3)}`);
}

console.log(built === 0 ? 'audio up to date' : `${built} file(s) built`);
