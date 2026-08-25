# How to Write Freeform Log Entries That an AI Can Actually Analyze Later

**Author:** Annie  
**Format:** Knowledge Guide  
**Status:** draft  
**Product:** Track Analysis  
**Research:** `../../agents/annie/research/2026-08-23-product-function-guide-sweep.md`  
**Own Words research-informed humanizing pass:** complete

Freeform logging is useful because life does not arrive in dropdown menus. It also creates a predictable problem: six weeks later, the data may be full of entries that made perfect sense at the time and are miserable to analyze in aggregate.

`Coffee. Bad sleep.` is understandable to the person who wrote it. It is not very good data.

The answer is not to turn every observation into a form with 14 required fields. A few small habits make plain-English logs much easier for an LLM, spreadsheet, or future human to interpret without destroying the reason freeform capture was useful in the first place.

## Use the same words for the same recurring things

If one day you write `coffee`, the next day `latte`, and the third day `caffeine`, an LLM may correctly infer that the entries are related. It may also treat them as different categories when the distinction matters.

Choose stable names for things you expect to compare later.

If `coffee` is the useful category, use `coffee` consistently and add detail afterward:

- `Coffee, 12 oz, 8:10 am`
- `Coffee, 8 oz, 1:45 pm`
- `Coffee, decaf, 7:30 pm`

If espresso versus brewed coffee matters to the question, preserve that distinction from the beginning. Consistency does not mean stripping away detail. It means giving the repeated thing a repeated name.

The same applies to workouts, supplements, symptoms, foods, medications, routines, and locations. A model can normalize messy language, but asking it to reconstruct your vocabulary is extra uncertainty you do not need to create.

## Put quantities next to the thing they describe

`Took magnesium` is useful if all you care about is whether magnesium occurred.

`Magnesium 200 mg` is more useful if the amount might matter later.

Likewise:

- `Ran 3.2 miles in 31 minutes`
- `Slept 6 h 20 min`
- `Headache, 4/10`
- `Water, 16 oz`

Do not invent precision you did not actually observe. `Energy 6.7/10` is not better than `Energy 7/10` merely because it has a decimal place. But where a real quantity exists, include the unit. `200` without `mg`, `mL`, `minutes`, or some other unit forces later analysis to guess.

## Let the timestamp do its job, but record time when the event happened earlier

Track Analysis timestamps entries automatically. If you log the event when it happens, there is no reason to repeat `at 2:03 pm` in every entry.

Delayed logging is different.

Suppose you remember at 10 pm that you had coffee at 3 pm. If you simply enter `Coffee`, the recorded timestamp describes when you remembered to log it, not when the coffee occurred. Add the actual event time in the text:

`Coffee, 12 oz, around 3 pm.`

The same issue matters for sleep, symptoms, meals, exercise, or anything else where sequence may later be part of the analysis.

Approximate timing is fine when that is all you know. `Around 3 pm` is more honest and more useful than a fabricated `3:00 pm`.

## Separate what happened from what you think caused it

A log becomes much easier to analyze when observations and interpretations are distinguishable.

Compare:

`Coffee ruined my sleep.`

with:

`Coffee, 12 oz, 4:15 pm. Took 55 minutes to fall asleep.`

The second entry preserves the events without deciding the causal story in advance.

That does not mean you cannot record interpretations. They may be useful. Just label them as such:

`Headache started 5:30 pm. Possible trigger: skipped lunch.`

Now a later analysis can treat `headache started` as the observation and `possible trigger` as your hypothesis rather than confusing the two.

This matters especially for health-related tracking. Patterns in a personal log can generate useful questions, but neither a correlation in the CSV nor an LLM's explanation establishes medical causation.

## Record absences only when the absence is informative

Most logs naturally record events: what you ate, did, felt, or took. Sometimes the absence of an event is itself important.

If you are investigating whether afternoon caffeine relates to sleep, days with no afternoon caffeine are useful comparison cases. You do not need to write `no coffee` every hour. One explicit entry such as `No caffeine after noon today` can make the comparison much easier later.

Likewise, if a routine usually happens and did not, `Skipped usual evening run` may carry information that an empty log cannot distinguish from forgetting to record it.

Do not turn the log into a census of everything that failed to happen. Add negative entries when they create a meaningful comparison group.

## Prefer one readable sentence to an improvised codebook

Short abbreviations feel efficient at capture time:

`Mg 2, cof 1, en 5, slp bad.`

They also create a private language that may become ambiguous even to its author.

If you use abbreviations, make them stable and obvious. Otherwise, ordinary language is often the better compression format. LLMs are unusually good at reading ordinary language. There is little reason to disguise the information from them.

A good entry can be compact without being cryptic:

`Magnesium 200 mg. Coffee 12 oz at 1:30 pm. Energy 5/10.`

That is still fast to write, and its meaning is far more durable.

## Do not force structure before you know which distinctions matter

The advantage of freeform logging is that you can preserve something you did not anticipate needing.

Imagine a rigid tracker with a field for `coffee: yes/no`. Six weeks later you realize the interesting distinction may be *time of day*. If your entries said only yes or no, that information is gone.

Freeform capture lets you keep richer context while the question is still forming. Once a pattern becomes important, you can become more consistent about the parts you want to compare.

This is why a useful freeform log often becomes *slightly* more structured over time without turning into a form. Stable vocabulary, quantities with units, honest timestamps, and clear observations are enough to make a large difference.

## Before exporting, read ten random entries

A quick quality check is to open entries from different days and ask whether someone who was not present could understand them.

If `felt bad again` appears repeatedly, ask what `bad` meant. Energy? Mood? Pain? Nausea? Sleepiness? If the distinction matters, start naming it.

If several entries use different words for the same recurring thing, normalize your language going forward. You do not necessarily need to rewrite the entire past. An LLM can help map obvious variants during analysis, as long as you tell it to show the mapping rather than silently assuming equivalence.

The goal is not a perfect dataset. Personal logs are messy because life is messy. The useful threshold is much lower: preserve enough consistent meaning that later analysis can compare events without inventing the missing context.

## Product connection

**Track Analysis.** Track Analysis stores timestamped freeform entries locally on Android and lets Pro users export them as CSV for analysis with an external LLM of their choice. The app does not perform medical diagnosis or send the log to an AI service automatically.