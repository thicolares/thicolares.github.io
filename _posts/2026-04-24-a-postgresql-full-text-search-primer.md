---
layout: post
title: A PostgreSQL Full Text Search primer
date: 2026-04-24
categories: [PostgreSQL, Search]
tags: [fts, full-text-search, postgresql, unaccent]
---

The PostgreSQL's Full Text Search (FTS) is a built-in system for searching natural language text efficiently, beyond what simple `LIKE` or `=` can do. Instead of comparing raw strings, FTS pre-processes text into a `tsvector` and searches it with a `tsquery`.

I’ve used this in production: it’s a solid, low-cost alternative to external search for small or mid apps, keeping everything in-DB. Keep it simple and scale only when the pain shows.

Let’s walk through a quick example and cover the key concepts as we go.

Create a simple table with a text column:

```sql
CREATE TABLE docs (
    id SERIAL PRIMARY KEY,
    body TEXT
);
```

Insert some sample data:

```sql
INSERT INTO docs (body) VALUES
    ('The quick brown fox jumps over the lazy dog'),
    ('PostgreSQL full-text search is powerful'),
    ('Café com leite, não. Melhor acarajé!'),
    ('Running and jogging are great exercises'),
    ('A imersão nem Osíris sabe como aconteceu');
```

Skipping the index for now, as PostgreSQL will seq-scan 5 rows anyway. I’ll show it later.


Then query the table using FTS:

```sql
SELECT id, body FROM docs
WHERE to_tsvector('english', body) @@ to_tsquery('english', 'run | power')
```

That's it haha. Results:

```sql
id|body                                   |
--+---------------------------------------+
 2|PostgreSQL full-text search is powerful|
 4|Running and jogging are great exercises|
 ```


## Let's break down the query

### `to_tsvector('english', body)` 

It processes the body column of each row using the `'english'` dictionary: tokenizes, lowercases, stems and produces a `tsvector`. The `tsvector` is a specialized data type designed for full-text search. It represents a document as a sorted list of lexemes—words that have been normalized.

```sql
SELECT to_tsvector('english', 'Running and jogging are great exercises');
```

Output:

```sql
to_tsvector                          |
-------------------------------------+
'exercis':6 'great':5 'jog':3 'run':1|
```

Because I'm using the `'english'` dictionary, it removes stop words (like "and", "are"), lowercases everything, applies stemming to reduce words to their root form (`running` becomes `run`, `jogging` becomes `jog`), and it provides positional offsets for each lexeme in the original text, counted by word. More: the [Dictionaries](https://www.postgresql.org/docs/current/textsearch-dictionaries.html) docs. 


Pure `tsvector` are simpler:

```sql
SELECT 'Running and jogging are great exercises'::tsvector;
```

Output:

```sql
tsvector                                           |
---------------------------------------------------+
'Running' 'and' 'are' 'exercises' 'great' 'jogging'|
```

### `to_tsquery('english', 'running')`

It parses your search terms using the same config, applying the same stemming. So `running` becomes `run`. You can also use operators like `|` (OR) and `&` (AND) to combine search terms

```sql
SELECT to_tsquery('english', 'running | jogging');
```

Output:

```sql
to_tsquery
-----------
'run' | 'jog'
```

### `@@`

Is the a basic text match operator _"does this tsvector satisfy this `tsquery`?"_ Check the [text search operators](https://www.postgresql.org/docs/current/functions-textsearch.html) docs for more options.


## Use the index, Luke!

Again, I skipped creating an index in the example above because for 5 rows it's pointless as PostgreSQL will always seq-scan a tiny table regardless. But you should create one for better performance as your data grows:

```sql
CREATE INDEX idx_docs_fts ON docs USING GIN (to_tsvector('english', body));
```

A [GIN (Generalized Inverted Index)](https://www.postgresql.org/docs/current/indexes-types.html#INDEXES-TYPES-GIN) is a PostgreSQL index type optimized for multi-valued data types like JSONB, arrays, and full-text search vectors.

Without the index, PostgreSQL reads every row that matches the conditions, calls `to_tsvector()` on each, then checks the match. On 1M matched rows, that's 1M function calls per query.

With the GIN index, `to_tsvector('english', body)` is computed once at write time and stored in the index structure. The index maps each lexeme to the rows containing it. The tradeoff is like any index: more disk space and slower writes, but much faster reads: instead of scanning every row, PostgreSQL jumps directly (with a faster lookup) to matching rows via the index.


## Thought provoking question

Will that work with accents? Like, if I search for `acaraje` will it match `acarajé`?


## References:

- [PostgreSQL Full Text Search documentation](https://www.postgresql.org/docs/current/textsearch.html)
- [PostgreSQL Text Search Dictionaries](https://www.postgresql.org/docs/current/textsearch-dictionaries.html)
- [PostgreSQL Text Search Operators](https://www.postgresql.org/docs/current/functions-textsearch.html)
- [PostgreSQL Index Types](https://www.postgresql.org/docs/current/indexes-types.html)