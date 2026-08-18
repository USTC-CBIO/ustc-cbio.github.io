# Task 2 Report

## Changed Files

- `i18n.js`
- `styles.css`
- `.superpowers/sdd/2026-08-18-cbio-bilingual-site/task-2-report.md`

## Commands And Outputs

### 1. Baseline contract before implementation

Command:

```text
python -m unittest tests/test_bilingual_site.py -v
```

Output:

```text
test_header_dimensions_keep_desktop_and_responsive_contract ... FAIL
test_language_runtime_contract_exists ... ERROR
test_named_research_projects_remain_exact ... ok
test_pages_declare_language_runtime_and_page_id ... FAIL

ERROR: i18n.js was missing
FAIL: styles.css did not yet contain the 190px desktop header contract
FAIL: page files did not yet contain Task 3 page markers/runtime script tags
```

### 2. JavaScript syntax check

Command:

```text
node --check i18n.js
```

Output:

```text
exit 0
```

### 3. Contract suite after implementation

Command:

```text
python -m unittest tests/test_bilingual_site.py -v
```

Output:

```text
test_header_dimensions_keep_desktop_and_responsive_contract ... ok
test_language_runtime_contract_exists ... ok
test_named_research_projects_remain_exact ... ok
test_pages_declare_language_runtime_and_page_id ... FAIL

FAIL: page files still do not contain data-page and i18n.js markers
This is the expected remaining Task 3 failure scope.
```

### 4. Diff hygiene

Command:

```text
git diff --check
```

Output:

```text
warning: in the working copy of 'styles.css', LF will be replaced by CRLF the next time Git touches it
```

## Self-Review

- Exposed `window.CBIO_I18N.getLanguage()`, `window.CBIO_I18N.t()`, and `window.CBIO_I18N.setLanguage()` before initialization.
- Implemented safe language normalization plus localStorage read/write fallbacks with in-memory persistence when storage is unavailable.
- Added a complete English-first dictionary with Chinese translations for common, page, title, and dynamic-script keys, while preserving named research objects such as `stPainter`, `DeepSpatial`, and `DriftST` literally.
- Implemented dot-key lookup, `{name}` interpolation, document title updates, `<html lang>` updates, marker-driven text updates, and generic declared-attribute updates through `data-i18n-attr`.
- Injected exactly one `.language-toggle` button under `.header-inner`, with correct English/Chinese labels and the required `cbio:language-change` event on actual language changes.
- Updated the desktop header height to `190px`, made `.header-inner` the positioning anchor, and added the requested responsive toggle placement at `max-width:980px` and `max-width:640px` without changing responsive logo dimensions.

## Concerns

- The contract suite is intentionally still red on `test_pages_declare_language_runtime_and_page_id` because Task 3 has not yet added `data-page` attributes or `<script src="i18n.js">` tags to the eight HTML files.
- Running `python -m unittest` generated an untracked `tests/__pycache__/` directory in the worktree. I did not stage it.
- The repo also already had an unrelated untracked `docs/superpowers/plans/` directory before this task, and I preserved it untouched.
