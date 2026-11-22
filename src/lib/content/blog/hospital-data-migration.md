---
title: 'Notes from a hospital data migration'
date: '2026-08-20'
category: 'Notes'
excerpt: 'Legacy reports, duplicate patients, and an extract that had never been run against a real working set. What a year of day-to-day data work actually taught.'
cover: '/blog/hospital-migration.svg'
---

Most of the work in a hospital data role is not building features. It is establishing that two
systems mean the same thing when they say "patient encounter", and that is a much harder problem
than it sounds.

## The extract is never the schema

The documentation describes columns that stopped being populated in 2019. The live data has three
spellings of the same department, a free-text field where half the rows are numeric, and a
surrogate key that is not actually unique. The only reliable schema is the one you derive by
profiling the extract against a working set.

## Duplicates are a policy question

Deduplicating patients means deciding what makes two records the same person. Name plus date of
birth collides for twins. National ID is missing for a third of the rows. Anything you choose will
be wrong for some subset, so the decision belongs with the people who own the consequences, not
the migration script.

## What actually held up

- Profile first, and write the profile into the repo so it can be re-run.
- Keep the raw extract immutable and derive everything downstream.
- Make every transformation idempotent, because you will run it twenty times.
- Ship a reconciliation report before you ship the migration.

The unglamorous conclusion: the migration is a data contract, and the code is the least interesting
part of it.
