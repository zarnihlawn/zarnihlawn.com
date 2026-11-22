---
title: 'Why the dialog closed itself'
date: '2026-09-18'
category: 'Engineering'
excerpt: 'A native dialog driven by URL state has three sources of truth and they will fight. One ordering rule that ended a week of flakiness.'
cover: '/blog/dialog-closed-itself.svg'
---

A modal whose visibility is derived from router state looks clean until someone hits Escape. Then
`close` fires, the URL still says the dialog is open, an effect observes that and reopens it, and
the user sees a dialog flicker back.

The problem is that three things claim to own the open state: the `<dialog>` element, the URL, and
whatever component last wrote to either.

## One owner, one direction

Pick the URL as the only source of truth. Then make every mutation of the element a consequence of
a URL change, and every user gesture a URL change. That gives one data flow instead of three.

- `Escape` and backdrop clicks close the element, and their `close` handler calls `history.back()`.
- A URL change opens or closes the element, never both.
- Programmatic close is flagged, so the handler does not push a second history entry.

## The flag is not optional

Without a flag marking programmatic closes, closing the dialog from a URL change fires `close`,
which calls `history.back()`, which changes the URL again. The loop is short and very confusing to
debug from a stack trace because it looks like user input.

## What this buys

Once the URL is the only owner, deep links, back button, and hard refresh all behave identically,
and the flaky tests stop being flaky because there is no second path to the same state.
