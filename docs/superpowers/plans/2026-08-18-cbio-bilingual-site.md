# CBIO Lab Bilingual Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a persistent, accessible Chinese/English toggle for all eight static pages while preserving named research projects and fixing the desktop logo's vertical overflow.

**Architecture:** Add one shared `i18n.js` runtime and one translation dictionary instead of duplicating page DOM. Static page copy receives stable `data-i18n` keys; `team.js` renders language-aware dynamic member data; `script.js` consumes the current language for hero credits. The language button is injected into the shared header so every page gets the same control without duplicating button markup.

**Tech Stack:** Vanilla HTML, CSS, and browser JavaScript; `localStorage`; Python `unittest` for static contract checks; no new runtime dependencies.

**Spec:** `docs/superpowers/specs/2026-08-18-cbio-bilingual-site-design.md`

## Global Constraints

- Cover exactly these eight pages: `index.html`, `research.html`, `team.html`, `publications.html`, `data-code.html`, `news.html`, `media.html`, and `contact.html`.
- Preserve `stPainter`, `DeepSpatial`, `DriftST`, and every other named research object exactly in both languages, including case.
- Use the `cbio-language` localStorage key; default to English when no valid value exists.
- Do not change URLs, image assets, navigation destinations, or introduce a framework, build tool, or third-party dependency.
- Add the toggle at the far right of the desktop header and beside the mobile menu control without overlap.
- Set the desktop `.site-header` height to `190px`; preserve the existing `92px` and `76px` responsive header heights.
- Keep team focus, Escape dismissal, menu behavior, hero rotation, and current-page navigation behavior working.

## File Map

- Create `i18n.js`: shared translation dictionary, language state, toggle injection, DOM attribute updates, title/lang updates, and `cbio:language-change` event.
- Create `tests/test_bilingual_site.py`: dependency-free static contract tests for all pages, script order, translation markers, preserved project names, and header dimensions.
- Modify `styles.css`: desktop header height, relative header positioning, language toggle styling, focus state, and responsive placement.
- Modify `script.js`: use language-aware hero credits and refresh the visible credit after language changes.
- Modify `team.js`: add Chinese member fields, render localized bubble/profile copy, localize profile labels, and rerender selected members on language changes.
- Modify all eight HTML files: add `data-page`, `data-i18n` markers, translated attribute markers, and the shared `i18n.js` script before existing page scripts.

### Task 1: Add static bilingual contracts before implementation

**Files:**

- Create: `tests/test_bilingual_site.py`
- Test: `tests/test_bilingual_site.py`

**Interfaces:**

- Consumes: the eight page documents, `styles.css`, and the planned `i18n.js` script reference.
- Produces: a repeatable `python -m unittest tests/test_bilingual_site.py -v` contract suite that fails against the current English-only tree and passes after Tasks 2–4.

- [ ] **Step 1: Write the failing static contract test**

Create a `unittest.TestCase` that loads the eight named HTML files from `Path(__file__).parents[1]`, asserts `data-page` and `i18n.js` on every page, checks `i18n.js` appears before `script.js`, checks the storage key/event/toggle contract in `i18n.js`, checks desktop and responsive header dimensions in `styles.css`, and checks that `stPainter`, `DeepSpatial`, and `DriftST` remain present in the page corpus.

```python
import unittest
from pathlib import Path


ROOT = Path(__file__).parents[1]
PAGES = (
    "index.html", "research.html", "team.html", "publications.html",
    "data-code.html", "news.html", "media.html", "contact.html",
)


class BilingualSiteContractTests(unittest.TestCase):
    def test_pages_declare_language_runtime_and_page_id(self):
        for page_name in PAGES:
            content = (ROOT / page_name).read_text(encoding="utf-8")
            self.assertIn('data-page="', content, page_name)
            self.assertIn('src="i18n.js"', content, page_name)
            self.assertLess(content.index('src="i18n.js"'), content.index('src="script.js"'), page_name)

    def test_language_runtime_contract_exists(self):
        runtime = (ROOT / "i18n.js").read_text(encoding="utf-8")
        self.assertIn('cbio-language', runtime)
        self.assertIn('cbio:language-change', runtime)
        self.assertIn('language-toggle', runtime)

    def test_header_dimensions_keep_desktop_and_responsive_contract(self):
        styles = (ROOT / "styles.css").read_text(encoding="utf-8")
        self.assertIn('.site-header{height:190px', styles)
        self.assertIn('@media(max-width:980px){.site-header{height:92px}', styles)
        self.assertIn('@media(max-width:640px){.site-header{height:76px}', styles)

    def test_named_research_projects_remain_exact(self):
        corpus = "\n".join((ROOT / page).read_text(encoding="utf-8") for page in PAGES)
        for project in ("stPainter", "DeepSpatial", "DriftST"):
            self.assertIn(project, corpus)


if __name__ == "__main__":
    unittest.main()
```

- [ ] **Step 2: Run the contract and verify the expected red state**

Run `python -m unittest tests/test_bilingual_site.py -v` and expect failure because the current pages do not declare `data-page`, `i18n.js`, or the new header height.

- [ ] **Step 3: Commit the test contract**

```text
git add tests/test_bilingual_site.py
git commit -m "test: define bilingual site contracts"
```

### Task 2: Build the shared language runtime and header control

**Files:**

- Create: `i18n.js`
- Modify: `styles.css:6-14,129-130`
- Test: `tests/test_bilingual_site.py`

**Interfaces:**

- Consumes: page `data-page`, `data-i18n`, and `data-i18n-attr` attributes added in Task 3.
- Produces: `window.CBIO_I18N.getLanguage()`, `window.CBIO_I18N.t(key, variables)`, `window.CBIO_I18N.setLanguage(language)`, and the `cbio:language-change` document event.

- [ ] **Step 1: Implement the translation dictionary and state manager**

In `i18n.js`, define `const STORAGE_KEY = "cbio-language"`; accept only `"en"` or `"zh"`; default to English; define complete `common`, page, and title dictionaries; keep named research objects literal in both languages; implement dot-key lookup and `{name}` interpolation; update text, declared attributes, document title, `<html lang>`, and localStorage; dispatch `new CustomEvent("cbio:language-change", { detail: { language: nextLanguage } })`; and expose `getLanguage`, `t`, and `setLanguage` on `window.CBIO_I18N` before initialization.

- [ ] **Step 2: Inject the top-right language button**

Create exactly one button per page under `.header-inner`:

```html
<button class="language-toggle" type="button" data-language-toggle aria-label="Switch to Chinese">中文</button>
```

The runtime must no-op if the button already exists, toggle between `en` and `zh`, and display `中文` in English mode or `EN` in Chinese mode.

- [ ] **Step 3: Fix header geometry and style the control**

Update `styles.css` with this desktop rule and matching responsive placement:

```css
.site-header{height:190px;background:#fff}
.header-inner{position:relative;...}
.language-toggle{position:absolute;top:16px;right:0;min-height:36px;padding:0 12px;border:1px solid var(--line);border-radius:6px;background:#fff;color:var(--teal);font:500 12px Inter,sans-serif;cursor:pointer}
.language-toggle:hover{background:#eef9fa;border-color:var(--teal)}
.language-toggle:focus-visible{outline:3px solid color-mix(in srgb,var(--green) 68%,white);outline-offset:3px}
```

At `max-width:980px`, keep `.site-header{height:92px}` and place the toggle at `top:50%;right:58px;transform:translateY(-50%)`; at `max-width:640px`, keep `.site-header{height:76px}` and use `right:54px`. Do not change `.logo-image` dimensions in the responsive rules.

- [ ] **Step 4: Run syntax and runtime contract checks**

Run `node --check i18n.js` and `python -m unittest tests/test_bilingual_site.py -v`. `node --check` must exit 0; the runtime assertions must pass, while page-marker assertions remain pending until Task 3.

### Task 3: Mark all eight static pages for translation

**Files:**

- Modify: `index.html`
- Modify: `research.html`
- Modify: `team.html`
- Modify: `publications.html`
- Modify: `data-code.html`
- Modify: `news.html`
- Modify: `media.html`
- Modify: `contact.html`
- Test: `tests/test_bilingual_site.py`

**Interfaces:**

- Consumes: keys exposed by `window.CBIO_I18N` from Task 2.
- Produces: eight complete documents whose static copy can be updated by `i18n.js` without changing DOM structure.

- [ ] **Step 1: Add page IDs and common translation markers**

For each file, add `data-page="home|research|team|publications|data-code|news|media|contact"` to `<body>`; add `<script src="i18n.js" defer></script>` before `<script src="script.js" defer></script>`; keep `team.js` after `script.js`; add `data-i18n` to all nav labels, footer strings, plain-text headings, paragraphs, card labels, card links, and button labels; and add `data-i18n-attr="aria-label"` where the logo or menu accessible label changes.

- [ ] **Step 2: Mark page-specific copy**

Use these namespaces and preserve named research objects in literal text:

- `home.*`: hero, selected findings, “What we study”, three method cards, latest news, and brand/footer copy.
- `research.*`: hero, approach, three research directions, future directions, and arrow labels; keep `stPainter`, `DeepSpatial`, and `DriftST` unchanged.
- `team.*`: hero, intro, people heading/description, group labels, and footer; leave member names and project names to `team.js` data.
- `publications.*`: hero, selected work copy, and three publication titles; keep method names inside titles unchanged.
- `dataCode.*`: hero, resource intro, four resource cards, and link labels; keep `stPainter`, `DeepSpatial`, and `DriftST` unchanged.
- `news.*`: hero, lab notes, and three news cards.
- `media.*`: hero, intro, and four media cards.
- `contact.*`: hero, work-with-us copy, position headings, conversation copy, and mail link label.

- [ ] **Step 3: Run the static contract**

Run `python -m unittest tests/test_bilingual_site.py -v` and expect all static contract tests to pass.

### Task 4: Localize dynamic scripts without changing interactions

**Files:**

- Modify: `script.js:1-16`
- Modify: `team.js:8-185`
- Test: `tests/test_bilingual_site.py`

**Interfaces:**

- Consumes: `window.CBIO_I18N.getLanguage()`, `window.CBIO_I18N.t()`, and `cbio:language-change` from Task 2.
- Produces: localized hero credits and localized team bubbles/profiles while preserving selected member state and existing click/Escape behavior.

- [ ] **Step 1: Localize homepage hero credits**

Replace the single credits array with an `en`/`zh` object, keep named scientific terms unchanged, make `showSlide(index)` read the current language, and register `document.addEventListener("cbio:language-change", () => showSlide(slide));` after slide initialization.

- [ ] **Step 2: Add Chinese member data and language helpers**

Extend every `people` object with `nameZh`, `roleZh`, `institutionZh`, and `bioZh`. Add `language()` and `personText(person, field)` helpers that choose `Zh` fields only when `window.CBIO_I18N.getLanguage()` is `zh`. Use them for bubble names, roles, institutions, bios, image alt text, profile headings, and the localized `team.open` button label.

- [ ] **Step 3: Re-render on language changes while preserving focus**

Keep `selectedId` unchanged. After `render()` repopulates the three groups, call `selectPerson(selectedId)` when a member is already selected, then register:

```javascript
document.addEventListener("cbio:language-change", () => {
  render();
});
```

Do not alter outside-click clearing, Escape restoration, image paths, or group membership counts.

- [ ] **Step 4: Run script syntax checks**

Run `node --check script.js`, `node --check team.js`, and `python -m unittest tests/test_bilingual_site.py -v`; all commands must exit 0.

### Task 5: Browser verification and integration commit

**Files:**

- Test: all eight HTML pages in a local static server
- Verify: `styles.css`, `i18n.js`, `script.js`, and `team.js`

**Interfaces:**

- Consumes: the complete implementation from Tasks 1–4.
- Produces: verified desktop/mobile behavior and a single reviewable implementation commit.

- [ ] **Step 1: Start the static server and smoke-test all routes**

Run `python -m http.server 8000` from the repository root. Open each route at `http://127.0.0.1:8000/<page>` and verify page title, non-empty main content, language button, and no console errors.

- [ ] **Step 2: Verify English → Chinese → English on desktop**

On `media.html`, confirm initial English language/title and `中文`; click it and confirm Chinese `<html lang>`, title, nav/headings/body/footer, and `EN`; verify `stPainter`, `DeepSpatial`, and `DriftST` remain unchanged wherever present; click `EN` and confirm the complete English state returns without navigation or scroll reset.

- [ ] **Step 3: Verify persistence and team interaction**

Set `zh` on `team.html`, navigate to `research.html`, and reload to confirm persistence. On `team.html`, select a member, switch language, confirm the same member remains selected with localized profile text, then press `Escape` and confirm the profile closes.

- [ ] **Step 4: Verify responsive header and logo**

Check desktop, `768px`-wide, and `390px`-wide viewports. Confirm the logo is no longer clipped/high, the language button remains visible at the far right, the mobile menu still opens, and no horizontal overflow appears.

- [ ] **Step 5: Run final checks and commit**

Run `node --check i18n.js`, `node --check script.js`, `node --check team.js`, `python -m unittest tests/test_bilingual_site.py -v`, `git diff --check`, and `git status --short --branch`. Expect all checks to pass and only planned files to be changed. Then run:

```text
git add i18n.js script.js team.js styles.css index.html research.html team.html publications.html data-code.html news.html media.html contact.html tests/test_bilingual_site.py
git commit -m "Add bilingual site toggle and fix header logo alignment"
```
