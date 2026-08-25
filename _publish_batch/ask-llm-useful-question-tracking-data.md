# How to Ask an LLM a Useful Question About Your Own Tracking Data

**Author:** Donald  
**Format:** Knowledge Guide  
**Status:** draft  
**Product:** Track Analysis  
**Research:** `../../agents/donald/research/2026-08-23-product-function-guide-sweep.md`  
**Own Words research-informed humanizing pass:** complete

An LLM can read a CSV full of personal log entries and produce an explanation almost immediately. That is exactly why the first prompt matters.

If you ask `What do you notice?`, the model is rewarded for noticing *something*. It may find a useful pattern. It may also turn ordinary coincidence, inconsistent logging, or a handful of anecdotes into a polished story.

A better workflow makes the model do boring work before interpretive work.

Track Analysis Pro exports a timestamped freeform log as CSV. Once you choose an external LLM and decide to share that export with it, begin by making the model understand the dataset before asking it to explain your life.

## First ask the model to describe what it received

A good opening prompt is procedural:

> Read this CSV and describe its structure. Tell me the date range, number of entries, fields present, and the major recurring kinds of events you can identify. Do not infer causes or give health advice yet. Flag ambiguous abbreviations or entries you are not sure how to interpret.

This catches obvious misunderstandings. If the model thinks `Mg` means milligrams when you meant magnesium, or treats an edited note as a separate event, fix that before analysis.

It also reveals how complete the data actually is. A six-month file may contain only four sleep entries. That is important to know before asking for a sleep pattern.

## Define the outcome in observable terms

Avoid questions such as:

`What improves my health?`

`Why am I tired?`

`Which supplement works best?`

Those require definitions, causal assumptions, and often medical judgment the log cannot supply.

Ask about something the CSV actually records:

- `Compare days where I logged energy 8/10 or higher with days at 4/10 or lower.`
- `For each headache entry, list events logged in the previous 24 hours.`
- `Compare sleep duration on days with coffee after 2 pm versus other days where coffee timing is known.`
- `How often did I log exercise on the same day as high energy?`

You can move from those observations to a better hypothesis later.

## Ask for counts and examples before conclusions

A sentence like `late caffeine appears linked to worse sleep` should never arrive without the numbers behind it.

Ask the model to show:

- number of relevant days or events
- dates included in each group
- missing data
- averages or medians when the variable supports them
- representative examples
- counterexamples

For example:

> Before interpreting anything, show how many days had coffee after 2 pm, how many comparison days had known coffee timing, the sleep outcome for each group, and at least three days that do not fit the apparent pattern.

This is not formal statistical analysis merely because it contains counts. It does make the model's reasoning inspectable.

## Tell it what missing data means — or does not mean

Event logs have an awkward property: absence of an entry may mean the event did not happen, or it may mean you forgot to log it.

If you did not record `no coffee`, the model should not automatically treat a day without a coffee entry as caffeine-free.

Say so explicitly:

> Treat missing entries as unknown unless the log explicitly states that an event did not occur.

The same rule can apply to exercise, symptoms, medications, supplements, food, and sleep.

If your logging practice was consistent enough that missingness has a different meaning, explain that. The model cannot know your recording habits from the CSV alone.

## Separate exploration from testing

There are two legitimate modes of personal-data analysis.

**Exploration:** `What recurring variables appear near my low-energy entries?`

This is useful for generating hypotheses. It is also vulnerable to finding accidental patterns because the search space is large.

**Testing a specific question:** `Are low-energy entries more common on days after fewer than six hours of logged sleep?`

This is narrower and easier to audit.

Do not let an exploratory result quietly become a confirmed explanation.

If the model discovers that headaches often follow a particular food, treat that as a reason to inspect the records and perhaps track the relationship more deliberately. It is not evidence that the food caused the headaches.

## Ask what the data cannot answer

One of the most useful prompts is:

> What important uncertainty or missing information prevents a stronger conclusion here?

A good answer may identify very few relevant observations, inconsistent terminology, missing comparison days, several variables changing together, delayed logging that makes timestamps unreliable, outcomes recorded only when unusually bad, or lack of a meaningful baseline.

This turns the model from an explanation generator into a critic of the dataset.

## Ask for counterexamples explicitly

Models are very good at compressing a messy record into a coherent narrative. Counterexamples resist that compression.

If the model says `exercise is associated with higher energy`, ask:

- Which exercise days had low energy?
- Which high-energy days had no exercise?
- Were exercise entries more likely to be logged on good days?
- Does the apparent relationship survive if we look only at weeks with complete energy ratings?

An explanation that becomes much weaker after one counterexample query was probably too strong to begin with.

## Keep medical interpretation outside the prompt's authority

Track Analysis can be used to record symptoms, medications, supplements, sleep, food, activity, and other personal observations. That does not make the exported dataset diagnostic.

An LLM may confidently name conditions, mechanisms, drug interactions, or treatment changes. Do not treat fluency as clinical authority.

A safer prompt boundary is:

> Identify patterns and questions worth discussing. Do not diagnose, recommend changing medication, or claim that correlations establish causation.

For healthcare decisions, bring the relevant record and questions to a qualified clinician.

## A reusable analysis prompt

A strong general prompt might be:

> I am attaching a personal tracking CSV. First describe the dataset: date range, entry count, fields, recurring event types, missingness, and any ambiguous terms. Then answer this question: **[specific question]**. Define the comparison groups explicitly. Show counts, dates, and counterexamples before interpretation. Do not treat missing entries as negative events unless I explicitly logged the absence. Distinguish observation from causation. Tell me what the data cannot establish and what one change in future logging would make the question easier to answer.

That prompt is deliberately less exciting than `Analyze my life.`

It is also much more likely to produce something you can inspect, challenge, and use.

## Product connection

**Track Analysis.** Track Analysis Pro exports local freeform logs as CSV so users can deliberately share them with an external LLM of their choice. The app does not upload the data automatically or perform the LLM analysis itself, leaving the user in control of when and where the export is analyzed.