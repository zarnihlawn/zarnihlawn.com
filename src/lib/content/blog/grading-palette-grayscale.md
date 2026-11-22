---
title: 'Grading a colour palette to grayscale'
date: '2026-10-03'
category: 'Design'
excerpt: 'A palette that reads well in colour can collapse into mud without it. A short method for checking contrast before you commit to tokens.'
cover: '/blog/palette-grayscale.svg'
---

Every palette eventually meets a grayscale constraint: a printed proof, a `prefers-contrast` mode,
a screenshot pasted into a document that strips colour. If the lightness values are bunched, the
whole thing turns into mud and hierarchy disappears.

## Check luminance spacing, not hue

Take each colour token and pull its relative luminance. Sort the list and look at the gaps. If
three tokens cluster within a tenth of each other, they are one token wearing three costumes.
Spacing luminance deliberately — even steps of roughly 0.12 — gives you a palette that survives
desaturation.

## Where the accent goes

A single accent colour should be the darkest or lightest thing on the page, never in the middle of
the range. In the middle it reads as a slightly off neutral once the colour is gone. At an extreme
it stays a clear signal in both modes.

## Test it as a screenshot

The cheapest check is to open a page, screenshot it, and apply a grayscale filter. If you cannot
still tell primary from secondary from disabled, the tokens are wrong, regardless of what the
colour values say.
