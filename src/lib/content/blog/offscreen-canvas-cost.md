---
title: 'An offscreen canvas is not free'
date: '2026-10-22'
category: 'Engineering'
excerpt: 'OffscreenCanvas is sold as the fix for janky rendering, but the transfer itself is where most of the budget goes. Notes from profiling a diagram editor.'
cover: '/blog/offscreen-canvas.svg'
---

The pitch for `OffscreenCanvas` is simple: move painting off the main thread and the page stops
dropping frames. In practice the wins are real but much narrower than the pitch, and the transfer
step is where most of the budget quietly goes.

## Measure the transfer, not the paint

A canvas handed to a worker with `transferControlToOffscreen` is zero-copy, but only the handle.
Any data the worker needs to draw has to be copied or transferred as well. For a diagram with a
few thousand nodes, serialising the scene graph into a shared buffer took longer than the paint it
was replacing.

The fix that actually held was to keep the scene graph in the worker and send only deltas, then
let the worker own layout. Once the main thread stopped being the source of truth, both sides got
cheaper.

## What still belongs on the main thread

- Text measurement, if you rely on the DOM for it.
- Anything that needs to read back a pixel synchronously.
- Hit testing against DOM elements layered above the canvas.

## The short version

If your rendering is dominated by draw calls, moving to a worker helps. If it is dominated by
building the data to draw, a worker just relocates the cost and adds a hop. Profile first, and
profile the transfer specifically.
