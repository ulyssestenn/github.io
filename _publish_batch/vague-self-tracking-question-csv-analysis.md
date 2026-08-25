# How to Turn a Vague Self-Tracking Question Into Useful CSV Analysis

**Author:** Annie  
**Format:** Knowledge Guide  
**Status:** draft  
**Product:** Track Analysis  
**Research:** `../../agents/annie/research/2026-08-23-product-function-guide-sweep.md`  
**Own Words research-informed humanizing pass:** complete

`What affects my energy?` is a reasonable human question and a terrible data-analysis request.

It contains no definition of energy, no time window, no candidate factors, no comparison, and no indication of what result would actually change a decision. An LLM can still produce an answer. That is part of the problem. When the question is vague enough, almost any pattern can be made to sound relevant.

A useful analysis begins before you upload the CSV. Narrow the question until the model has something specific to count, compare, and fail to find.

## Turn the broad question into one observable outcome

Start with the thing you want to explain.

Instead of `What affects my sleep?`, try `On which logged days did I record fewer than seven hours of sleep?` or `Which entries mention difficulty falling asleep, and what happened in the preceding six hours?`

Instead of `What makes my workouts better?`, try `Compare the days I rated a workout as strong with the days I rated it as poor. What logged differences appear most consistently beforehand?`

The outcome does not have to be a perfectly standardized measurement. It does need to be identifiable in the data.

If the log never records sleep duration, asking the model to calculate sleep duration is not analysis. It is invitation to guess.

## Choose a plausible comparison rather than asking for every correlation

Once the outcome is clear, decide what comparison is worth inspecting.

Suppose the question is whether late coffee is associated with worse sleep. A reasonable first pass might compare days with coffee logged after 2 pm, days with coffee but none after 2 pm, and days with no coffee entry only if your logging is complete enough for absence to mean anything.

Then define the sleep outcome you actually have: total hours, sleep rating, time to fall asleep, or some other logged measure.

This is much better than asking an LLM to `find everything correlated with sleep`. A personal log may contain food, exercise, stress, travel, supplements, symptoms, and dozens of idiosyncratic events. Search broadly enough and something will look interesting.

A narrow comparison makes the model show its work.

## Pick the time window before looking at the result

Timing is often the difference between a sensible question and a story assembled after the fact.

If you are looking at food before a symptom, decide whether `before` means six hours, 24 hours, or the previous calendar day. If you are looking at exercise and sleep, decide whether same-day exercise, the previous 12 hours, or the preceding 48 hours is the relevant window.

There is no universal correct window. The right choice depends on the phenomenon and sometimes on domain knowledge you may not have. In that case, analyze a few clearly labeled windows rather than letting the model quietly choose whichever one produces the most interesting result.

For example:

> For each headache entry, summarize foods logged in the preceding 6 hours and 24 hours separately. Do not combine the windows.

That request is far easier to audit than `What foods cause my headaches?`

## Ask for counts before explanations

LLMs are fluent explainers. Make them earn the explanation.

A useful first request often looks like this:

> Identify every day with an energy rating of 8/10 or higher. Count how many there are. For those days, summarize sleep duration, exercise, caffeine timing, and any recurring supplements logged in the previous 24 hours. Then do the same for days rated 4/10 or lower. Show the counts and missing data before interpreting differences.

You want to know which records were included, how many observations there are, what data is missing, what the comparison actually shows, and only then possible interpretations.

If the model says `late coffee appears strongly associated with poor sleep`, you should be able to ask: How many late-coffee days? How many comparison days? What counted as poor sleep? Were there exceptions?

## Make the model look for counterexamples

A good personal-data question should be capable of producing an inconvenient result.

Add requests such as:

- Show days that contradict the apparent pattern.
- List high-energy days that followed poor sleep.
- List good-sleep nights after late caffeine.
- Tell me if the sample is too small for the apparent difference to be persuasive.
- Identify variables that are usually logged only on bad days and therefore may be subject to recording bias.

Counterexamples matter because a personal log is not a controlled experiment. Behavior changes together. A stressful week may change sleep, exercise, coffee, diet, and logging habits at the same time.

The CSV can reveal temporal patterns. It cannot magically separate those influences.

## Distinguish missing from negative

If there is no coffee entry on Tuesday, does that mean no coffee was consumed, or that coffee simply was not logged?

If `no coffee` days matter to the analysis, the dataset needs a way to distinguish them from unrecorded days. The same problem applies to medications, symptoms, workouts, alcohol, supplements, or almost any event-based log.

Tell the model explicitly how to interpret absence:

> Do not assume that no coffee entry means no coffee unless the day contains an explicit `no coffee` entry.

That single instruction may prevent a bogus comparison group.

## Ask a question that could change something

A useful analysis ends with a decision boundary.

`What patterns are in my data?` may be interesting. It is open-ended enough to produce a small horoscope.

A better question is attached to a possible action: `Is there enough evidence in my log to justify testing a two-week no-caffeine-after-noon experiment?` or `Which recurring variable should I track more consistently next month because the current data is too incomplete to evaluate it?`

This keeps the analysis in proportion. The first CSV pass does not need to explain your life. It needs to tell you whether a better question is worth asking next.

## A reusable prompt structure

For many personal datasets, this skeleton works well:

> **Question:** [one narrow question].  
> **Outcome:** Define [the outcome] using [specific entries or threshold].  
> **Comparison:** Compare [group A] with [group B].  
> **Window:** Look at [time period] before/after each outcome.  
> **Missing data:** Do not treat missing entries as negative events unless explicitly logged.  
> **First show:** counts, included dates, missingness, and counterexamples.  
> **Then:** summarize patterns without claiming causation.  
> **Finally:** suggest one follow-up question or low-risk tracking change that would make the evidence clearer.

The important part is not the wording. It is forcing the analysis to have a defined outcome, a comparison, a window, and a way to fail.

Track Analysis can make the CSV easy to produce. It cannot make an underspecified question precise after the fact. That part still belongs to the person asking it.

## Product connection

**Track Analysis.** Track Analysis Pro exports timestamped freeform logs as CSV so users can analyze their own data with an external LLM. The app itself does not diagnose conditions or establish causes; exported patterns should be treated as observations to investigate, not medical conclusions.