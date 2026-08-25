# How to Preserve Highlights Before Removing an Ebook From Your Phone

**Author:** Nico  
**Format:** Knowledge Guide  
**Status:** draft  
**Product:** Guten  
**Research:** `../../agents/nico/research/2026-08-23-product-function-guide-sweep.md`  
**Own Words research-informed humanizing pass:** complete

An ebook file and the record of what you did while reading it are not the same thing.

The EPUB may be disposable. The highlighted passage, bookmark, reading position, or note may be the part you actually want to keep.

That distinction becomes important when storage is tight, a book has been finished, or a phone is about to be replaced. Deleting a downloaded book can be harmless if the reading record lives separately. It can also be a small archival disaster if the annotations existed only inside the file or app installation you just removed.

Guten is designed so that bookmarks, highlights, and notes survive removal of the downloaded Project Gutenberg EPUB. Even so, it is worth understanding the layers involved before treating any one device as permanent storage.

## First ask what you are trying to preserve

Readers often say `save my book` when they mean several different things:

- the ebook file itself
- the place where reading stopped
- bookmarks
- highlighted quotations
- notes written about those passages
- a collection assignment such as `To Read` or `Roman virtue`
- reader preferences

Those objects have different replacement costs.

A Project Gutenberg EPUB can usually be downloaded again. A note explaining why a paragraph mattered to a research project cannot be recreated from the book itself.

When deciding what deserves backup, preserve the information you created first.

## Removing the EPUB is not the same as deleting the reading record in Guten

In Guten, downloaded Project Gutenberg books can be removed from the device without deleting the associated bookmarks, highlights, and notes. If you later download the book again, that annotation record remains available.

That makes storage cleanup much less consequential than it is in systems where the book file and annotations are inseparable.

Still, there are two different risks:

**Book-file risk:** the local EPUB disappears.  
**Device/app-data risk:** the phone is lost, reset, or replaced and the local reading database disappears with it.

Guten's annotation persistence solves the first problem. Backup or export addresses the second.

## Use JSON backup when you want to restore the Guten library as Guten

Guten's JSON backup and restore is the appropriate tool when the goal is recovery or migration of the app's reading state.

The backup can preserve progress, bookmarks, highlights, notes, Collections, and preferences. It is therefore much richer than simply copying the EPUB directory.

Think of this as a *reconstruction backup*: you want another Guten installation to know how the library was configured and what reading activity had been saved.

Before changing phones or doing anything that could erase app data, create a current backup and put the backup file somewhere that will survive the device transition.

Do not confuse `a backup exists on the same phone` with `the data is protected from losing the phone`.

## Export notes separately when they belong to work outside the reader

A backup is good for restoration. It is not necessarily the best long-term form for ideas you expect to use elsewhere.

Guten Premium's Notes Manager can search and filter annotations across the library and export them as Markdown, CSV, JSON, or plain text. If highlights have become research material, quotations for an essay, study notes, or part of a PKM system, export the relevant material into the system where that work actually lives.

This creates a useful separation:

- Guten remains the reading environment
- the exported notes become part of the project or archive that needs them

You do not have to export every underline merely because export exists. A highlight can be useful while reading and disposable afterward. Export the material whose value now extends beyond the book.

## Keep enough context around an exported highlight

A sentence copied out of a classic can become surprisingly difficult to place six months later.

When exporting or moving important notes, preserve at least the book and author context. Chapter information is useful when available. Your own note may be more important than the quotation itself because it records why you saved it.

If the quotation will appear in formal writing, verify it against the edition or translation you intend to cite rather than assuming an exported highlight is a complete scholarly citation.

This matters especially with public-domain books because the underlying work may exist in many editions and translations. `Homer` or `Plato` does not identify which English wording you copied.

## Do a migration check before wiping the old phone

When moving devices, do not treat the existence of a backup file as proof that the process worked.

A sensible migration sequence is:

1. create a current Guten backup on the old device
2. copy the backup somewhere accessible from the new device
3. install Guten on the new device
4. restore the backup
5. open several representative books or annotation records
6. confirm that bookmarks, notes, highlights, Collections, and progress look right
7. only then erase the old device if that is the plan

A restore test is cheap compared with discovering after a factory reset that the one file you trusted was stale, incomplete, or never copied off the phone.

## Storage cleanup should remove replaceable things first

If the immediate problem is storage space, downloaded public-domain EPUBs are unusually good candidates for removal because they can be fetched again and Guten keeps the reading annotations separately.

That makes the decision quite different from deleting:

- a unique personal note
- an exported research archive
- a locally created document
- a book file acquired from a source that may no longer be available

The easiest bytes to delete are the ones the network can reconstruct for you later.

A reading app becomes much easier to live with when finishing a book does not create a permanent obligation to keep its local file merely to preserve the marks you made inside it.

## Product connection

**Guten.** Guten keeps bookmarks, highlights, and notes even when a downloaded Project Gutenberg EPUB is removed. It also supports JSON backup and restore, while Premium's Notes Manager can export annotations to Markdown, CSV, JSON, or plain text when the reading record needs to move beyond the reader.