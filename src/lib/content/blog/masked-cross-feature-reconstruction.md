---
title: 'Masked Cross-Feature Reconstruction, in plain terms'
date: '2026-11-05'
category: 'Research'
excerpt: 'What the ICAIT paper actually claims, why masking beats reconstruction-only autoencoders on tabular data, and where the method still falls over.'
cover: '/blog/masked-reconstruction.svg'
---

Tabular anomaly detection is an awkward problem. You have rows of mixed types, some columns
with heavy tails, a lot of missingness, and a training set that is supposed to contain only
normal traffic. Deep models from vision do not transfer cleanly, because a tabular row has no
spatial structure to convolve over.

## The premise

Reconstruction-based detectors train an autoencoder on normal rows and score a test row by how
badly it comes back. The failure mode is that an autoencoder with enough capacity learns to copy
the input, including the parts that make an anomaly unusual. If a column is rare, the model
memorises it instead of learning what it correlates with.

Masked modelling fixes that by removing information before the model sees it. Hide a subset of
cells and the only way to restore them is to learn the joint structure of the remaining columns.
A row that violates that structure reconstructs badly, which is exactly the signal you want.

## Why cross-feature masking matters

The interesting part is not masking itself, it is _which_ cells you mask. Random masking across
features forces the model to understand pairwise and higher-order relationships. Mask a whole
column group and the model has to infer it from everything else. On tabular data, that inference
is the entire task: anomalies are usually a broken relationship between two columns that are
individually unremarkable.

## Where it is still fragile

- **High-cardinality categoricals.** One-hot columns reconstruct trivially; the mask barely hurts.
- **Duplicate features.** If two columns carry the same signal, masking one is a no-op.
- **Very small training sets.** The joint structure is noisy, so the reconstruction error of normal
  rows overlaps the anomalies and the threshold does all the work.

The paper's contribution is a masking strategy that stays learnable rather than fixed, which is
what makes the reconstruction error usable as a score across datasets with very different feature
counts.
