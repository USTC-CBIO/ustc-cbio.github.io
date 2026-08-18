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
    "media-talk.html",
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

    def test_team_language_toggle_preserves_selected_profile_contract(self):
        team_runtime = (ROOT / "team.js").read_text(encoding="utf-8")
        self.assertIn('event.target.closest("[data-language-toggle]")', team_runtime)

    def test_attribute_markers_do_not_replace_nested_header_dom(self):
        runtime = (ROOT / "i18n.js").read_text(encoding="utf-8")
        self.assertIn('if (node.hasAttribute("data-i18n-attr")) return;', runtime)

    def test_pages_use_the_current_logo_favicon(self):
        styles = (ROOT / "styles.css").read_text(encoding="utf-8")
        self.assertIn('assets/cbio-lab-logo.png', styles)
        for page_name in PAGES:
            content = (ROOT / page_name).read_text(encoding="utf-8")
            self.assertIn('assets/cbio-lab-favicon.png', content, page_name)

    def test_media_home_uses_featured_and_empty_card_layout(self):
        media = (ROOT / "media.html").read_text(encoding="utf-8")
        self.assertIn('class="media-feature-grid"', media)
        self.assertIn('href="media-talk.html"', media)
        self.assertIn('class="media-feature-card media-feature-card--empty"', media)
        self.assertIn('class="media-mini-grid"', media)

    def test_media_talk_page_embeds_the_requested_bilibili_video(self):
        detail_path = ROOT / "media-talk.html"
        self.assertTrue(detail_path.exists(), "media-talk.html should be created")
        if not detail_path.exists():
            return
        detail = detail_path.read_text(encoding="utf-8")
        runtime = (ROOT / "i18n.js").read_text(encoding="utf-8")
        self.assertIn('data-page="mediaTalk"', detail)
        self.assertIn('class="video-frame"', detail)
        self.assertIn('player.bilibili.com/player.html?isOutside=true&amp;aid=117115101185979&amp;bvid=BV1b6b66uEZM&amp;cid=41019245559&amp;p=1', detail)
        self.assertIn('"media-talk.html": "mediaTalk"', runtime)

    def test_media_talk_uses_the_evo2_paper_reading_copy(self):
        runtime = (ROOT / "i18n.js").read_text(encoding="utf-8")
        self.assertIn("【论文精读 #01｜Nature】Evo 2：跨生命域基因组建模与设计", runtime)
        self.assertIn("本期论文精读聚焦 Nature 论文《Evo 2》", runtime)
        self.assertIn("This paper reading focuses on the Nature paper Evo 2", runtime)


if __name__ == "__main__":
    unittest.main()
