---
title: 'Presenting masked reconstruction at ICAIT 2026'
date: '2026-11-05'
category: 'Research'
excerpt: 'On 5 November 2026 I presented my MSc work at ICAIT in Yangon: can hiding table cells beat a diffusion baseline that damages every row? What the numbers said, and what I refused to claim.'
cover: '/blog/icait-talk.webp'
---

On 5 November 2026 I stood behind a podium at ICAIT and defended four years of questions with
three numbers. The screen behind me showed four magnifying glasses aimed at the same cloud of
points. That slide was doing the honest thing for a change: it admitted the score comes from more
than one place.

Below is what I actually said, rewritten the way I would say it to a colleague rather than to an
examiner.

## The problem, without the jargon

Picture a spreadsheet of events. Bank transfers, sensor readings, login records. Almost every row
is boring. A handful are not: a fraudulent transfer, a machine about to fail, a reading that means
someone should be called.

Modern anomaly detectors find those rows in a strange way. They **damage** each row on purpose,
then ask how hard it is to repair. The current fashion is diffusion: add noise gradually over
hundreds of small steps, train a network to reverse it, and use the residual as a score. It works.
It is also expensive for a job that only ever needed a ranking.

My question was narrower and, I think, more useful: if the damage is cheaper — simply **hide some
cells** and force a guess from the remaining columns — can we match that expensive method under
exactly the same rules?

## Why hiding cells is not just cheap noise

Each cell in a row can be imagined with a dial: how much of its own value is allowed to leak
through into the corrupted version.

Diffusion turns one shared dial down for every column at once. Until the dial reaches zero, every
cell still keeps a faded copy of itself, and the model can cheat by reading that copy. It learns to
denoise, not necessarily to understand.

Masking snaps selected cells to zero. Those cells keep nothing. The only way to fill them is to
borrow from the other columns, which is exactly what a table anomaly violates: it is a row where
two reasonable-looking columns stop agreeing with each other.

That distinction is the whole thesis. Masking is not a cheaper approximation of diffusion. It is a
different corruption, and it removes the shortcut.

## The boring part that decides everything

Most of the work was not the model. It was refusing to give myself an easy win.

Protocol choices — how rows are split, how features are scaled, whether the training set is clean
or already contaminated — move rankings about as much as swapping algorithms does. A number
produced under friendlier rules is not a result, it is a footnote with a chart.

So I reproduced the published baseline's protocol instead of using the default runner from the
benchmark suite. Scaling statistics and early stopping came from training data only. Test labels
appeared once, at scoring. Five seeds, and an unweighted average so that one large dataset cannot
carry the headline.

Two training settings, because the real world gives you both: train on normal rows only, or train
on a mix that already contains anomalies and hope the model learns what strange looks like.

## What the numbers were

Across fifty-seven public datasets and five seeds, the average was a win:

- Semi-supervised, trained on clean normals: **65.27** PR-AUC and **88.64** ROC-AUC, against
  **61.36** and **83.17** for the published diffusion baseline.
- Unsupervised, trained on the contaminated matrix: **46.31** and **84.23**, against **32.77** and
  **74.08**.

The larger gap is in the messy setting, which is also the setting most real deployments live in.

Cost came out where the theory predicted. Five hundred and seventy runs — fifty-seven datasets,
two settings, five seeds — finished in **8.28 hours** on a single RTX 3090. Masking needs a handful
of hide-and-repair draws rather than hundreds of ordered noise steps, roughly an order of magnitude
fewer forward passes at scoring time.

I am careful with that claim: it is a structural comparison plus my own measured campaign, not a
hardware-matched race against the authors' code.

## The slide I did not want to show

The result I am least comfortable with is also the one I put on screen in the middle of the talk.

The system I measured is two levels. The first is my masked network. The second is a routing map
that, per dataset and per setting, picks either the network or a classical detector. Of one hundred
and fourteen slots, the network took thirty-four and eighty were delegated.

The map was built during development and then frozen before the five-seed run, so the scores are
not tuned on the test pass. But it still required having seen those datasets before. The headline
average therefore describes the routed system, not my network everywhere. Classical detectors from
1999 to 2008 are still serious competition, and delegated classical methods on their own can clear
the diffusion baseline.

I could have presented the network-only numbers and nobody in the room would have known. Splitting
by modality is what kept that honest: on unsupervised PR-AUC the margin is carried by classical
tables and vision embeddings, and **language embeddings fail**. The overall ranking looks fine, but
the anomalies do not sit at the top of an analyst's inspection list, which is the only place that
matters. That failure is a result, not a footnote.

And one process failure, stated plainly: I designed an ablation with routing switched off, to
isolate masking as the cause of the margin, and I did not run it. It is in the appendix as a
limitation, not dressed up as a finding.

## How this would be used

Security and fraud teams stare at large tables of events. Most rows are fine. A few might be
account abuse, or the quiet early signature of a leak. The useful thing a model can do there is
**rank**: put the strangest rows at the top of a human's queue, cheaply enough to run often.

Concretely, a team could build a feature table from their own logs, compare classical detectors
against a masked model under one fixed protocol, and judge success by whether real incidents rise
to the top of that queue. That is a modest claim, and it is the one my evidence supports. I have
not run this inside a live company deployment, and I say so.

## Questions I was glad to get

The viva and the floor asked the right things: why not compare against a locally reimplemented
baseline, why not route harder, and what a mask even means for an embedding where columns have no
names. My answers were: the published numbers keep me from optimising my own copy of the baseline;
routing harder would be a different system and I would have to disclose it too; and language
features need a mask curriculum designed for dense vectors, which is the next piece of work.

A related paper from this dissertation has been submitted to ICAIT UIT 2026, and the review
decision is still pending. If it is accepted, this becomes a citation instead of a talk.

## What I would do next

Three things, in the order I would actually do them: run the ablation with routing off and report
the network on its own merits, adapt masking for language embeddings instead of borrowing the
tabular curriculum, and stop calling a two-level system a single method in the abstract.

Presenting taught me something the write-up could not. The part of the talk that landed was not
the PR-AUC margin. It was the slide admitting that eighty of a hundred and fourteen jobs were
handed to older algorithms. People trust a result more when you show them where it does not hold.

Thank you to Dr. La Wynn Sandi for supervising the dissertation, and to everyone at ICAIT who
asked a hard question instead of a polite one.
