---
title: 'Diffusion schedules are just noise budgets'
date: '2026-09-02'
category: 'Research'
excerpt: 'The noise schedule in a diffusion model is a spending plan: how much corruption per step, and where the model gets its easiest training signal.'
cover: '/blog/diffusion-schedule.svg'
---

Most introductions to diffusion models present the noise schedule as a hyperparameter and move on.
It is more useful to think of it as a budget: a plan for how much corruption to apply at each step,
and therefore where the model spends its capacity.

## Linear is a bad default

A linear schedule from very little noise to almost pure noise puts most of its steps in a region
where the sample is already destroyed. The model spends capacity modelling nothing. Cosine
schedules were introduced for exactly this reason: they keep the signal-to-noise ratio moving at a
roughly even rate per step.

## What changes when you tune it

- **Early steps** decide fine detail. Too little noise there and the model never learns local
  structure.
- **Late steps** decide global composition. Too much and the model only ever sees structure-free
  input.
- **Step count** does not fix a bad shape. It just samples a bad curve more finely.

## Why it matters for anomaly detection

In denoising-autoencoder detectors the schedule is doing double duty: it is both the training
corruption and, at inference, the scale at which you measure reconstruction error. Choosing it
carefully is closer to choosing a feature representation than to tuning a learning rate.
