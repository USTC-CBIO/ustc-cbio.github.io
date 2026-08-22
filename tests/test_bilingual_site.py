import re
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


class EnglishSiteContractTests(unittest.TestCase):
    def test_site_is_english_only(self):
        corpus = "\n".join((ROOT / page).read_text(encoding="utf-8") for page in PAGES)
        corpus += (ROOT / "script.js").read_text(encoding="utf-8")
        corpus += (ROOT / "team.js").read_text(encoding="utf-8")
        self.assertNotIn('src="i18n.js"', corpus)
        self.assertNotIn("data-i18n", corpus)
        self.assertNotIn("language-toggle", corpus)
        self.assertIsNone(re.search(r"[\u4e00-\u9fff]", corpus))

    def test_pages_keep_page_ids_and_shared_runtime(self):
        for page_name in PAGES:
            content = (ROOT / page_name).read_text(encoding="utf-8")
            self.assertIn('lang="en"', content, page_name)
            self.assertIn('data-page="', content, page_name)
            self.assertIn('src="script.js', content, page_name)

    def test_header_dimensions_keep_desktop_and_responsive_contract(self):
        styles = (ROOT / "styles.css").read_text(encoding="utf-8")
        self.assertIn(".site-header{height:190px", styles)
        self.assertIn("@media(max-width:980px){.site-header{height:92px}", styles)
        self.assertIn("@media(max-width:640px){.site-header{height:76px}", styles)

    def test_named_research_projects_remain_exact(self):
        corpus = "\n".join((ROOT / page).read_text(encoding="utf-8") for page in PAGES)
        for project in ("stPainter", "DeepSpatial", "DriftST"):
            self.assertIn(project, corpus)

    def test_team_uses_static_information_cards(self):
        team = (ROOT / "team.html").read_text(encoding="utf-8")
        runtime = (ROOT / "team.js").read_text(encoding="utf-8")
        self.assertNotIn("data-team-profile", team)
        self.assertNotIn("data-person-id", runtime)
        self.assertIn('name: "Keyan Wang"', runtime)
        self.assertIn('role: "Direct PhD Student · Class of 2026"', runtime)
        self.assertIn('institution: "Peking University Cancer Hospital"', runtime)
        self.assertIn('class="person-institution"', runtime)
        self.assertIn('class="person-bio"', runtime)

    def test_data_code_has_resources_without_paper_buttons(self):
        content = (ROOT / "data-code.html").read_text(encoding="utf-8")
        self.assertIn(">Code</span>", content)
        self.assertIn(">Data</span>", content)
        self.assertIn(">Homepage</span>", content)
        self.assertNotIn(">Paper</span>", content)
        self.assertNotIn("nature.com/articles", content)
        self.assertNotIn("biorxiv.org/content", content)
        self.assertNotIn("arxiv.org/abs", content)

    def test_contact_uses_current_yuhang_email(self):
        content = (ROOT / "contact.html").read_text(encoding="utf-8")
        self.assertIn("yyh20030806@mail.ustc.edu.cn", content)
        self.assertNotIn("3279325045@qq.com", content)

    def test_pages_use_the_current_logo_favicon(self):
        styles = (ROOT / "styles.css").read_text(encoding="utf-8")
        self.assertIn("assets/cbio-lab-logo.png", styles)
        for page_name in PAGES:
            content = (ROOT / page_name).read_text(encoding="utf-8")
            self.assertIn("assets/cbio-lab-favicon.png", content, page_name)

    def test_media_home_uses_single_featured_video_with_full_cover(self):
        media = (ROOT / "media.html").read_text(encoding="utf-8")
        styles = (ROOT / "styles.css").read_text(encoding="utf-8")
        self.assertIn('class="media-feature-grid media-feature-grid--single"', media)
        self.assertIn('src="assets/evo2-bilibili-cover.jpg"', media)
        self.assertIn("object-fit:contain", styles)
        self.assertNotIn("media-card-label", media)

    def test_media_talk_embeds_the_requested_bilibili_video(self):
        detail = (ROOT / "media-talk.html").read_text(encoding="utf-8")
        self.assertIn('class="video-frame"', detail)
        self.assertIn("bvid=BV1b6b66uEZM", detail)
        self.assertIn("Evo 2: Genome Modeling and Design across the Tree of Life", detail)

    def test_pages_use_the_shared_footer(self):
        for page_name in PAGES:
            content = (ROOT / page_name).read_text(encoding="utf-8")
            self.assertIn('class="site-footer"', content, page_name)
            self.assertIn('class="footer-links"', content, page_name)
            self.assertIn('src="assets/cbio-lab-logo.png"', content, page_name)


if __name__ == "__main__":
    unittest.main()
