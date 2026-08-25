# When Should Recurring Events Become One-Tap Stacks Instead of Free Text?

**Author:** Annie  
**Format:** Knowledge Guide  
**Status:** draft  
**Product:** Track Analysis  
**Research:** `../../agents/annie/research/2026-08-23-product-function-guide-sweep.md`  
**Own Words research-informed humanizing pass:** complete

A shortcut is useful when it compresses repetition. It becomes dangerous to the usefulness of a log when it compresses away differences you may later care about.

That is the decision behind one-tap stacks in Track Analysis Pro. A recurring supplement or medication routine can be logged as a saved group rather than typed item by item every time. For a stable routine, that removes pointless friction. For a routine that changes constantly, the same shortcut can turn several different events into one misleading label.

The question is not whether stacks are faster. They are. The question is whether the recurring event is actually the same event.

## A good stack is boringly stable

Suppose a morning routine usually contains the same three items in the same amounts. Typing all three names every day adds effort without adding much information.

That is a strong candidate for a stack.

The same is true when the thing you care about analytically is the group itself. If later you mostly want to know whether `morning routine` happened, a one-tap entry gives you a clean, consistent event in the history.

Good candidates usually have three properties:

- the membership changes rarely
- the important details are already known and stable
- you expect to compare `routine happened` with `routine did not happen`

When those conditions hold, free text is mostly clerical work.

## Keep free text when variation is the information

Now imagine a routine that changes several times a week.

Monday: A + B + C.  
Tuesday: A + C.  
Wednesday: A + B + C at different amounts.  
Thursday: A + B + D.

Calling all four events `Morning Stack` makes the log neater and the data worse.

If you later ask an LLM whether B appears before a particular outcome, the stack label may hide whether B was present on each day. If dose or timing changes matter, hiding those differences behind one tap creates the same problem.

Keep explicit entries when:

- items frequently enter or leave the routine
- quantities vary in ways you may want to analyze
- timing varies enough to matter
- you are actively experimenting with the composition
- the individual components are more analytically important than the group

A shortcut should remove repetition, not evidence.

## Do not build a stack around an aspiration

There is another failure mode: making a stack for the routine you *intend* to follow rather than the one you actually repeat.

A saved shortcut called `Ideal Morning` may contain six things. If the real routine usually contains four and varies from day to day, the stack encourages the log to record the template rather than the event.

The safer approach is to wait until recurrence has earned automation.

If you have typed essentially the same combination enough times that the repetition is annoying, that is evidence that a stack will help. If you are creating the stack before the behavior exists, it is closer to a checklist than a logging shortcut.

Track what happened first. Automate what proves stable.

## Make the stack name analytically useful

A stack name becomes a data value. `Stack 1` is technically sufficient, but it does not help much when you export the history months later.

Prefer a name that will still make sense outside the app:

- `Morning supplements`
- `Evening routine`
- `Post-workout group`

Avoid names that imply a medical effect you have not established, such as `Migraine prevention` or `Sleep fix`, unless that phrase is simply a personal label and you are prepared to remember that it is not a conclusion.

The name should describe the routine, not certify what the routine does.

## Split a stack when a distinction becomes useful

A stable shortcut does not have to remain permanent.

Suppose a routine was identical for six months, then one component changes. You now have a few choices:

- edit the stack if the old version no longer matters for future comparison
- create a second stack if you want the history to distinguish the two versions clearly
- return temporarily to free text while the routine is changing

The right choice depends on what you expect to ask later.

If a future question might be `Did the old routine and new routine line up with different outcomes?`, preserving separate labels is useful. If the change is trivial and analytically irrelevant, maintaining multiple historical variants may create needless complexity.

A personal log does not need perfect version control. It does need enough distinction to avoid treating meaningfully different events as identical.

## Use stacks for logging friction, not for medical judgment

Track Analysis supports supplement and medication stacks because these are common recurring events. A stack does not validate the safety, appropriateness, effectiveness, interaction profile, or dosage of anything inside it.

That distinction is especially important because a neat history can look more authoritative than it is. The app can tell you that a routine was logged. It cannot tell you that the routine caused a symptom to improve or that a medication plan should change.

If you are tracking medications or symptoms for healthcare purposes, preserve the details your clinician actually needs and make treatment decisions with a qualified professional.

## A simple test

Before turning a recurring event into a stack, ask:

> If I see this stack name in a CSV six months from now, will I know enough about what happened?

If yes, the shortcut is probably earning its keep.

If the answer is `only if I remember which version I meant that week`, keep typing the details a little longer.

## Product connection

**Track Analysis.** Track Analysis Pro lets users save recurring supplement and medication groups as one-tap stacks while retaining freeform logging for events that do not fit a stable template. Stacks are a logging convenience, not a medical recommendation or analysis feature.