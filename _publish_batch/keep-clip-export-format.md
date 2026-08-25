# Markdown, CSV, HTML, RTF, or Plain Text: Which Keep Clip Export Should You Use?

**Author:** Sasha  
**Format:** Knowledge Guide  
**Status:** draft  
**Product:** Keep Clip  
**Research:** `../../agents/sasha/research/2026-08-23-product-function-guide-sweep.md`  
**Own Words research-informed humanizing pass:** complete

There is no best export format. There is only a best format for what you plan to do next.

Keep Clip can export saved material as Markdown, CSV, HTML, RTF, or plain text. Those formats overlap enough that choosing among them can look arbitrary. It is not. Each preserves a different balance of structure, readability, formatting, and ease of import.

A useful rule is to choose the receiving system first, then choose the file format.

## Choose Markdown for a portable working archive

Markdown is usually the strongest default when the clips are going into a text-based personal knowledge system, source repository, or folder of notes meant to remain readable without special software.

It works especially well for:

- Obsidian and other Markdown-based PKM tools
- Git repositories
- long-term note archives
- material you expect to edit as ordinary text
- workflows where links and light formatting should survive

Markdown's advantage is that the markup remains legible even when no Markdown renderer is available. A heading written as `## Heading` is still understandable in a plain text editor.

The tradeoff is that Markdown is deliberately modest. Complex document layout, spreadsheet-style analysis, and precise visual formatting are not its strengths.

If the next step is `put these clips into my notes and keep working with them`, Markdown is often the most natural choice.

## Choose CSV when the clips are becoming data

CSV is the useful choice when you care less about reading the export from top to bottom and more about rows, columns, filtering, sorting, or analysis.

Typical destinations include:

- Excel
- Google Sheets
- LibreOffice Calc
- Python or R
- database import tools
- an LLM that you want to reason over structured fields

CSV is good at keeping repeated fields aligned across many records. A column can hold clip text, another the title, another a URL, another tags, and so on.

That makes questions such as `Which domains appear most often?` or `Show all clips with this tag` much easier than they would be in a prose document.

The tradeoff is readability. Long quotations and notes can make a CSV unpleasant to inspect as raw text, especially because commas, quotation marks, and line breaks have to be escaped according to CSV conventions.

Use CSV when the archive is about to be *processed*.

## Choose HTML when you want a readable archive in a browser

HTML is useful when you want the export to open as a formatted document almost anywhere a web browser exists.

Good uses include:

- a browsable snapshot of clips
- sharing a readable export with someone who should not need Keep Clip
- preserving links as clickable links
- keeping headings and formatting visible without a word processor

HTML is also an established, widely understood format. The file can be inspected as source text if necessary, but most people will simply open it in a browser.

The weakness is that HTML is a document representation, not a convenient analysis table or a particularly pleasant format for hand editing. It can also contain much more markup than Markdown or plain text.

Choose it when `open and read this nicely` matters more than `edit this as notes` or `analyze these rows`.

## Choose RTF when the destination is a conventional document editor

Rich Text Format sits in an older but still useful middle ground between plain text and a full word-processing file format.

It can preserve more visible formatting than TXT while remaining readable by many word processors and document applications.

RTF is a sensible choice when:

- the next stop is Word or another word processor
- you want a document that looks more finished than plain text
- the recipient is not using Markdown tools
- you expect to copy, edit, or print the material as a conventional document

Its disadvantage is that raw RTF is not pleasant to read or edit by hand. It contains control syntax intended for software rather than humans.

If you are building a durable text archive for yourself, Markdown or TXT will often be cleaner. If you are handing the material to a word-processing workflow, RTF can be convenient.

## Choose plain text when you want the fewest assumptions

TXT is the least ambitious format in the list, which is sometimes exactly what you want.

Plain text is useful for:

- simple archival copies
- moving material between systems with unknown import capabilities
- scripts or tools that need unformatted text
- keeping a fallback representation that almost any computer can open

It carries very little presentation. That is both the strength and the cost.

If formatting, clickable links, field boundaries, or richer structure matter, plain text may discard too much. If the important thing is `these words should remain readable`, the simplicity is hard to beat.

## If you are leaving Keep Clip, export two ways when the archive matters

When an export is part of a serious migration rather than a temporary handoff, there is no rule saying you must pick exactly one representation.

For example:

- Markdown as the readable working archive
- CSV as the structured analysis/import copy

or:

- HTML as a browsable snapshot
- TXT as the minimal fallback

The two files serve different recovery paths. Storage is cheap; reconstructing lost structure or context may not be.

This is particularly sensible before deleting the original app data or moving a long-lived research archive to a different system.

## Choose by the next question

A compact decision table:

| If you want to... | Start with... |
| --- | --- |
| move clips into Obsidian or a text-based PKM system | Markdown |
| sort, filter, calculate, or analyze | CSV |
| open a formatted archive in a browser | HTML |
| edit as a conventional formatted document | RTF |
| preserve the words with minimal formatting assumptions | TXT |

Do not choose a format because it sounds more archival or technical. Choose the one the next tool can use without forcing you to repair the export first.

Portability is not merely the existence of an Export button. It is the ability to get the information out in a form that remains useful after it leaves.

## Sources

- John Gruber and the CommonMark project, [CommonMark specification](https://spec.commonmark.org/), documenting a widely used standardized interpretation of Markdown syntax.
- Y. Shafranovich, [RFC 4180: Common Format and MIME Type for Comma-Separated Values (CSV) Files](https://www.rfc-editor.org/rfc/rfc4180), describing the common CSV interchange format and `text/csv` media type.

## Product connection

**Keep Clip.** Keep Clip exports saved clips as Markdown, CSV, HTML, RTF, or plain text. The formats are alternatives, not tiers: use the one that best matches the system receiving the archive.