import unittest
from pathlib import Path


ROOT = Path(__file__).parents[1]
PAGES = (
    "index.html",
    "research.html",
    "team.html",
    "publications.html",
    "data-code.html",
    "news.html",
    "media.html",
    "contact.html",
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
        self.assertIn("cbio-language", runtime)
        self.assertIn("cbio:language-change", runtime)
        self.assertIn("language-toggle", runtime)

    def test_header_dimensions_keep_desktop_and_responsive_contract(self):
        styles = (ROOT / "styles.css").read_text(encoding="utf-8")
        self.assertIn(".site-header{height:190px", styles)
        self.assertIn("@media(max-width:980px){.site-header{height:92px}", styles)
        self.assertIn("@media(max-width:640px){.site-header{height:76px}", styles)

    def test_named_research_projects_remain_exact(self):
        corpus = "\n".join((ROOT / page).read_text(encoding="utf-8") for page in PAGES)
        for project in ("stPainter", "DeepSpatial", "DriftST"):
            self.assertIn(project, corpus)


if __name__ == "__main__":
    unittest.main()
