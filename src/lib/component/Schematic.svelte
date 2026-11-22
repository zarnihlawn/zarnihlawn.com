<script lang="ts">
	let {
		kind,
		class: className = ''
	}: {
		kind:
			| 'hero'
			| 'work'
			| 'academic'
			| 'library'
			| 'community'
			| 'database'
			| 'terminal'
			| 'folders'
			| 'documents'
			| 'hospital'
			| 'queue'
			| 'swatch'
			| 'anomaly'
			| 'escape'
			| 'dispatch'
			| 'biomarker'
			| 'allowlist'
			| 'gallery'
			| 'dbide'
			| 'tunnel'
			| 'notepad'
			| 'calculator';
		class?: string;
	} = $props();
</script>

{#if kind === 'hero'}
	<svg class={className} viewBox="0 0 320 260" width="320" height="260" aria-hidden="true">
		<g fill="none" stroke="currentColor" stroke-width="1.25">
			<path d="M16 214h288" />
			<path d="M70 214l24 18M120 214l24 18M170 214l24 18M220 214l24 18" />
			<polygon points="118,78 176,108 118,138 60,108" />
			<polygon points="60,108 118,138 118,196 60,166" />
			<polygon points="176,108 118,138 118,196 176,166" />
			<polygon points="214,46 262,70 214,94 166,70" />
			<polygon points="166,70 214,94 214,142 166,118" />
			<polygon points="262,70 214,94 214,142 262,118" />
			<polygon points="246,128 286,148 246,168 206,148" />
			<polygon points="206,148 246,168 246,204 206,184" />
			<polygon points="286,148 246,168 246,204 286,184" />
		</g>
	</svg>
{:else if kind === 'work'}
	<svg class={className} viewBox="0 0 320 260" width="320" height="260" aria-hidden="true">
		<g fill="none" stroke="currentColor" stroke-width="1.25">
			<path d="M20 218h280" />
			<rect x="52" y="156" width="88" height="62" />
			<path d="M52 172h88M52 188h64" />
			<path d="M72 48h48v24H72zM56 72h80v80H56z" />
			<path d="M64 88h64M64 104h48M64 120h56" />
			<polygon points="168,92 228,124 168,156 108,124" />
			<polygon points="108,124 168,156 168,208 108,176" />
			<polygon points="228,124 168,156 168,208 228,176" />
			<circle cx="252" cy="56" r="10" />
			<circle cx="276" cy="88" r="8" />
			<path d="M242 62l20 22M266 82l4 14" />
			<path d="M168 124h-20M188 140v-16" stroke-dasharray="4 3" />
		</g>
	</svg>
{:else if kind === 'academic'}
	<svg class={className} viewBox="0 0 320 260" width="320" height="260" aria-hidden="true">
		<g fill="none" stroke="currentColor" stroke-width="1.25">
			<path d="M20 218h280" />
			<path d="M48 196 160 132 272 196 160 226Z" />
			<path d="M160 132v94" />
			<path d="M96 164 160 196 224 164" />
			<rect x="56" y="72" width="52" height="68" />
			<path d="M64 84h36M64 96h40M64 108h28" />
			<rect x="118" y="56" width="52" height="84" />
			<path d="M126 68h36M126 80h40M126 92h32M126 104h44" />
			<rect x="180" y="68" width="52" height="72" />
			<path d="M188 80h36M188 92h28M188 104h40" />
			<polygon points="248,48 296,72 248,96 200,72" />
			<path d="M224 72v28M248 96v28M272 72v28" />
			<circle cx="248" cy="40" r="6" fill="currentColor" stroke="none" />
		</g>
	</svg>
{:else if kind === 'library'}
	<svg class={className} viewBox="0 0 320 260" width="320" height="260" aria-hidden="true">
		<g fill="none" stroke="currentColor" stroke-width="1.25">
			<path d="M20 218h280" />
			<path d="M48 40h224v178H48z" />
			<path d="M56 122h208M56 178h208" />
			<rect x="70" y="62" width="18" height="60" />
			<rect x="94" y="50" width="22" height="72" />
			<rect x="122" y="70" width="16" height="52" />
			<path d="M144 96l20-26 46 32" />
			<rect x="214" y="58" width="20" height="64" />
			<rect x="240" y="72" width="14" height="50" />
			<rect x="70" y="140" width="24" height="38" />
			<rect x="100" y="132" width="18" height="46" />
			<rect x="124" y="148" width="26" height="30" />
			<path d="M160 178v-34l30 10v34z" />
			<path d="M160 144l30 10" />
			<rect x="204" y="136" width="20" height="42" />
			<rect x="230" y="126" width="16" height="52" />
			<path d="M252 178v-40h12v40" stroke-dasharray="4 3" />
			<circle cx="160" cy="196" r="4" fill="currentColor" stroke="none" />
		</g>
	</svg>
{:else if kind === 'community'}
	<svg class={className} viewBox="0 0 320 260" width="320" height="260" aria-hidden="true">
		<g fill="none" stroke="currentColor" stroke-width="1.25">
			<path d="M20 218h280" />
			<circle cx="160" cy="92" r="17" />
			<path d="M139 148q21 -20 42 0v70" />
			<circle cx="102" cy="110" r="14" />
			<path d="M85 160q17 -18 34 0v58" />
			<circle cx="218" cy="110" r="14" />
			<path d="M201 160q17 -18 34 0v58" />
			<path d="M139 148h-20M181 148h20" stroke-dasharray="4 3" />
			<path d="M120 200h80v18h-80z" />
			<path d="M160 92V62M148 74l12 -12 12 12" />
		</g>
	</svg>
{:else if kind === 'database'}
	<svg class={className} viewBox="0 0 160 120" width="160" height="120" aria-hidden="true">
		<g fill="none" stroke="currentColor" stroke-width="1.25">
			<ellipse cx="78" cy="28" rx="36" ry="12" />
			<path d="M42 28v36c0 7 16 12 36 12s36-5 36-12V28" />
			<path d="M42 46c0 7 16 12 36 12s36-5 36-12" />
			<path d="M42 64c0 7 16 12 36 12s36-5 36-12" />
			<circle cx="28" cy="86" r="6" />
			<circle cx="132" cy="40" r="6" />
			<path d="M34 82l74-36" />
		</g>
	</svg>
{:else if kind === 'terminal'}
	<svg class={className} viewBox="0 0 160 120" width="160" height="120" aria-hidden="true">
		<g fill="none" stroke="currentColor" stroke-width="1.25">
			<rect x="18" y="16" width="124" height="88" />
			<path d="M18 36h124" />
			<circle cx="32" cy="26" r="2" fill="currentColor" stroke="none" />
			<circle cx="42" cy="26" r="2" fill="currentColor" stroke="none" />
			<path d="M32 54h28M32 68h52M32 82h40" />
		</g>
	</svg>
{:else if kind === 'folders'}
	<svg class={className} viewBox="0 0 160 120" width="160" height="120" aria-hidden="true">
		<g fill="none" stroke="currentColor" stroke-width="1.25">
			<path d="M28 40h28l8 8h52v40H28z" />
			<path d="M40 32h28l8 8h48v40H40z" />
			<path d="M52 24h28l8 8h44v40H52z" />
		</g>
	</svg>
{:else if kind === 'hospital'}
	<svg class={className} viewBox="0 0 160 120" width="160" height="120" aria-hidden="true">
		<g fill="none" stroke="currentColor" stroke-width="1.25">
			<path d="M12 102h136" />
			<path d="M26 102V26h52v28h44v48" />
			<path d="M45 14h14M52 7v14" />
			<path d="M36 40h12M36 54h12M36 68h12M56 40h12M56 54h12M56 68h12" />
			<rect x="46" y="86" width="12" height="16" />
			<path d="M86 80h9l4-10 5 20 4-10h11" />
		</g>
	</svg>
{:else if kind === 'queue'}
	<svg class={className} viewBox="0 0 160 120" width="160" height="120" aria-hidden="true">
		<g fill="none" stroke="currentColor" stroke-width="1.25">
			<path d="M12 102h136" />
			<rect x="22" y="10" width="116" height="38" />
			<path d="M34 36V24l9-6v24z" />
			<path d="M50 23a9 9 0 0 1 0 14" />
			<path d="M57 18a17 17 0 0 1 0 24" />
			<path d="M76 22h46" />
			<path d="M76 34h30" />
			<path d="M80 48v16" stroke-dasharray="3 3" />
			<rect x="20" y="64" width="34" height="38" />
			<rect x="63" y="64" width="34" height="38" />
			<rect x="106" y="64" width="34" height="38" />
			<path d="M20 76h34M63 76h34M106 76h34" stroke-dasharray="2 3" />
			<path d="M28 88h18M28 94h10M71 88h18M71 94h10M114 88h18M114 94h10" />
		</g>
	</svg>
{:else if kind === 'swatch'}
	<svg class={className} viewBox="0 0 160 120" width="160" height="120" aria-hidden="true">
		<g fill="none" stroke="currentColor" stroke-width="1.25">
			<path d="M22 104c12-7 22-7 34-1s24 6 36 0 22-7 34-1" />
			<rect x="34" y="30" width="40" height="56" rx="3" transform="rotate(-15 54 58)" />
			<rect x="60" y="24" width="40" height="56" rx="3" />
			<rect x="86" y="30" width="40" height="56" rx="3" transform="rotate(15 106 58)" />
			<path d="M60 62h40" />
			<circle cx="68" cy="42" r="3" fill="currentColor" stroke="none" />
			<circle cx="94" cy="36" r="3" fill="currentColor" stroke="none" />
		</g>
	</svg>
{:else if kind === 'anomaly'}
	<svg class={className} viewBox="0 0 160 120" width="160" height="120" aria-hidden="true">
		<g fill="none" stroke="currentColor" stroke-width="1.25">
			<path d="M20 104V18M20 104h128" />
			<path d="M20 62h88M96 104V46" stroke-dasharray="3 3" />
			<circle cx="46" cy="76" r="2" fill="currentColor" stroke="none" />
			<circle cx="58" cy="68" r="2" fill="currentColor" stroke="none" />
			<circle cx="40" cy="64" r="2" fill="currentColor" stroke="none" />
			<circle cx="54" cy="82" r="2" fill="currentColor" stroke="none" />
			<circle cx="66" cy="78" r="2" fill="currentColor" stroke="none" />
			<circle cx="48" cy="54" r="2" fill="currentColor" stroke="none" />
			<circle cx="120" cy="34" r="7" />
			<circle cx="120" cy="34" r="2" fill="currentColor" stroke="none" />
		</g>
	</svg>
{:else if kind === 'escape'}
	<svg class={className} viewBox="0 0 160 120" width="160" height="120" aria-hidden="true">
		<g fill="none" stroke="currentColor" stroke-width="1.25">
			<path d="M12 102h136" />
			<path d="M46 102V22h56v80" />
			<path d="M102 22l16 12v68" />
			<rect x="58" y="54" width="14" height="11" />
			<path d="M61 54v-5a4 4 0 0 1 8 0v5" />
			<path d="M18 44h12v8H18z" />
			<path d="M30 44l34 34M30 52l34 32" />
			<circle cx="132" cy="52" r="5" />
			<path d="M132 57v14M132 66h6M132 71h4" />
		</g>
	</svg>
{:else if kind === 'dispatch'}
	<svg class={className} viewBox="0 0 160 120" width="160" height="120" aria-hidden="true">
		<g fill="none" stroke="currentColor" stroke-width="1.25">
			<path d="M12 102h136" />
			<path d="M18 96c16-4 20-22 34-24s26 12 36-6" stroke-dasharray="4 3" />
			<path d="M88 66c4-8 4-14 0-20-3-5-9-9-9-16a9 9 0 0 1 18 0c0 7-6 11-9 16" />
			<circle cx="88" cy="62" r="3" />
			<path d="M118 74v18M109 83h18" />
		</g>
	</svg>
{:else if kind === 'biomarker'}
	<svg class={className} viewBox="0 0 160 120" width="160" height="120" aria-hidden="true">
		<g fill="none" stroke="currentColor" stroke-width="1.25">
			<path d="M14 60h10l5-16 6 32 6-24 6 16 6-8h9" />
			<circle cx="70" cy="60" r="5" />
			<path d="M75 60l14-16h45M75 60l14 16h45" />
			<circle cx="136" cy="40" r="3" fill="currentColor" stroke="none" />
			<circle cx="136" cy="80" r="3" fill="currentColor" stroke="none" />
			<path d="M86 24v72" stroke-dasharray="3 3" />
		</g>
	</svg>
{:else if kind === 'allowlist'}
	<svg class={className} viewBox="0 0 160 120" width="160" height="120" aria-hidden="true">
		<g fill="none" stroke="currentColor" stroke-width="1.25">
			<rect x="14" y="18" width="92" height="80" />
			<path d="M14 34h92" />
			<circle cx="22" cy="26" r="2" fill="currentColor" stroke="none" />
			<circle cx="30" cy="26" r="2" fill="currentColor" stroke="none" />
			<path d="M24 48l3 3 5-6M24 64l3 3 5-6M24 80l3 3 5-6" />
			<path d="M40 50h50M40 66h42M40 82h46" />
			<path d="M106 56h6" stroke-dasharray="3 3" />
			<path d="M128 34l12 5v14c0 9-6 15-12 18-6-3-12-9-12-18V39z" />
			<circle cx="128" cy="50" r="3" />
		</g>
	</svg>
{:else if kind === 'gallery'}
	<svg class={className} viewBox="0 0 160 120" width="160" height="120" aria-hidden="true">
		<g fill="none" stroke="currentColor" stroke-width="1.25">
			<rect x="20" y="20" width="34" height="26" />
			<rect x="20" y="54" width="34" height="26" />
			<path d="M58 20h20M58 26h12" />
			<rect x="70" y="46" width="66" height="52" />
			<path d="M70 46h66M76 62l10-9 9 12M114 84l-9-11" />
			<circle cx="122" cy="60" r="4" />
			<path d="M66 42h8M70 38v8M132 42h8M136 38v8M66 102h8M70 98v8M132 102h8M136 98v8" />
		</g>
	</svg>
{:else if kind === 'dbide'}
	<svg class={className} viewBox="0 0 160 120" width="160" height="120" aria-hidden="true">
		<g fill="none" stroke="currentColor" stroke-width="1.25">
			<path d="M14 22h50M14 22v82h50M64 22v82" />
			<ellipse cx="39" cy="26" rx="12" ry="4" />
			<path d="M27 26v12c0 2 5 4 12 4s12-2 12-4V26" />
			<rect x="22" y="50" width="6" height="6" />
			<rect x="22" y="66" width="6" height="6" />
			<rect x="22" y="82" width="6" height="6" />
			<path d="M32 53h20M32 69h20M32 85h14" />
			<rect x="76" y="22" width="70" height="82" />
			<path d="M76 36h70" />
			<path d="M86 48h26M86 62h38M86 76h18M86 90h30" />
			<path d="M120 62h4" stroke-dasharray="2 2" />
		</g>
	</svg>
{:else if kind === 'tunnel'}
	<svg class={className} viewBox="0 0 160 120" width="160" height="120" aria-hidden="true">
		<g fill="none" stroke="currentColor" stroke-width="1.25">
			<path d="M80 16l20 8v18c0 13-9 21-20 25-11-4-20-12-20-25V24z" />
			<circle cx="80" cy="38" r="4" />
			<path d="M80 42v10" />
			<path d="M12 102h136" />
			<path d="M16 92c22-12 60-12 82 0" stroke-dasharray="4 3" />
			<path d="M62 92c22-12 60-12 82 0" stroke-dasharray="4 3" />
		</g>
	</svg>
{:else if kind === 'notepad'}
	<svg class={className} viewBox="0 0 160 120" width="160" height="120" aria-hidden="true">
		<g fill="none" stroke="currentColor" stroke-width="1.25">
			<path d="M34 16h76v88H34z" />
			<path d="M34 32h76" />
			<path d="M42 16h20v16H42z" />
			<path d="M46 44h52M46 56h52M46 68h40M46 80h28" />
			<path d="M96 76v16" />
			<path d="M92 76h8M92 92h8" />
		</g>
	</svg>
{:else if kind === 'calculator'}
	<svg class={className} viewBox="0 0 160 120" width="160" height="120" aria-hidden="true">
		<g fill="none" stroke="currentColor" stroke-width="1.25">
			<path d="M26 14h108v92H26z" />
			<path d="M34 22h92v22H34z" />
			<path d="M108 30h10M108 38h6" />
			<rect x="34" y="54" width="26" height="14" />
			<rect x="67" y="54" width="26" height="14" />
			<rect x="100" y="54" width="26" height="14" />
			<rect x="34" y="74" width="26" height="14" />
			<rect x="67" y="74" width="26" height="14" />
			<rect x="100" y="74" width="26" height="14" />
			<rect x="67" y="94" width="26" height="6" />
			<path d="M41 61h12M74 61h12M107 61h12M41 81h12M74 81h12M107 81h12" stroke-dasharray="2 3" />
		</g>
	</svg>
{:else}
	<svg class={className} viewBox="0 0 160 120" width="160" height="120" aria-hidden="true">
		<g fill="none" stroke="currentColor" stroke-width="1.25">
			<rect x="46" y="22" width="70" height="82" />
			<path d="M58 40h46M58 52h46M58 64h32" />
			<rect x="34" y="16" width="70" height="82" />
			<path d="M46 34h46M46 46h40" />
		</g>
	</svg>
{/if}
