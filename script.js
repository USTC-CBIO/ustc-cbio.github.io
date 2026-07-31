const translations = {
  zh: {
    navResearch: "研究方向",
    navPeople: "团队成员",
    navPublications: "论文成果",
    navNews: "课题组动态",
    navJoin: "加入我们",
    heroEyebrow: "智能驱动的生物组学",
    heroLine1: "读懂",
    heroAccent: "生命的语言。",
    heroCopy: "我们开发智能、可解释的计算方法，将复杂的多组学数据转化为生物学洞见。",
    exploreResearch: "探索研究方向",
    workWithUs: "与我们合作",
    scroll: "向下探索",
    ourMission: "我们的使命",
    missionTitle: "生物学正在进入数据富集时代，而理解数据是下一个前沿。",
    missionCopy: "IBO Lab 聚焦人工智能、计算生物学与组学的交叉领域。我们设计跨尺度连接分子测量的模型，从细胞和组织延伸至患者与人群。",
    whatWeStudy: "研究方向",
    researchTitle: "从数据到发现。",
    researchLead: "我们开发计算方法，让高维生物学数据变得更可理解、可预测、可应用。",
    area1Title: "单细胞智能",
    area1Copy: "从单细胞与空间组学数据中学习细胞状态、发育轨迹与相互作用。",
    area2Title: "多模态基础模型",
    area2Copy: "融合序列、表达、影像与临床背景，构建可泛化的生物学模型。",
    area3Title: "可解释的生物发现",
    area3Copy: "超越预测，揭示机制、生物标志物与可验证的生物学假说。",
    quote: "“我们不只问模型能预测什么，更关心它能帮助我们理解怎样的生物学。”",
    quoteBy: "IBO Lab 的研究理念",
    selectedWork: "代表成果",
    publicationsTitle: "探索正在发生。",
    viewAll: "查看全部论文",
    comingSoon: "即将更新",
    pubPlaceholder1: "在这里展示课题组最新的研究论文。",
    pubPlaceholder2: "添加第二篇代表性论文或预印本。",
    pubPlaceholder3: "展示开源数据、代码或科学资源。",
    peopleKicker: "团队成员",
    peopleTitle: "不同的背景，<br />共同的好奇心。",
    peopleCopy: "我们正在组建一支横跨机器学习、生物信息学、基因组学与医学的交叉团队。",
    meetTeam: "认识团队",
    teamPhotoNote: "团队照片 / 课题组合影",
    labNotes: "课题组动态",
    newsTitle: "IBO 最新消息。",
    allNews: "全部动态",
    launchDate: "主页上线 · 2026",
    launchTitle: "IBO Lab 正在启航。",
    launchCopy: "关注我们如何为智能生物发现打造新的研究工具。",
    updateLabel: "研究进展",
    eventLabel: "学术活动",
    peopleLabel: "团队成员",
    newsPlaceholder1: "发布新论文、获奖信息或课题组里程碑。",
    newsPlaceholder2: "预告即将举行的报告或学术会议。",
    newsPlaceholder3: "欢迎新成员加入 IBO Lab。",
    joinKicker: "加入我们",
    joinTitle: "对生物学保持好奇，<br />对未来充满想象。",
    joinCopy: "我们欢迎希望为生物组学构建严谨、创新且有价值的智能方法的同学与合作者。",
    startConversation: "联系我们",
    emailNote: "正式上线前，请将 your-email@example.edu 替换为课题组邮箱。",
    navigate: "网站导航",
    connect: "联系我们",
    footerTagline: "智能驱动的生物组学",
    backTop: "返回顶部 ↑"
  }
};

const originalText = new Map();
const translatableNodes = document.querySelectorAll("[data-i18n]");
const langButton = document.querySelector(".lang-toggle");
const langOptions = document.querySelectorAll("[data-lang-option]");
const menuButton = document.querySelector(".menu-toggle");
const header = document.querySelector("[data-header]");
const navLinks = document.querySelectorAll(".site-nav a");

translatableNodes.forEach((node) => {
  originalText.set(node, node.innerHTML);
});

function setLanguage(lang) {
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  translatableNodes.forEach((node) => {
    const key = node.dataset.i18n;
    node.innerHTML = lang === "zh" && translations.zh[key]
      ? translations.zh[key]
      : originalText.get(node);
  });
  langOptions.forEach((option) => {
    option.classList.toggle("active", option.dataset.langOption === lang);
  });
  localStorage.setItem("ibo-language", lang);
}

langButton.addEventListener("click", () => {
  setLanguage(document.documentElement.lang.startsWith("zh") ? "en" : "zh");
});

setLanguage(localStorage.getItem("ibo-language") || "en");

menuButton.addEventListener("click", () => {
  const open = document.body.classList.toggle("menu-open");
  menuButton.setAttribute("aria-expanded", String(open));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("menu-open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 32);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -30px" }
);

document.querySelectorAll(".reveal").forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 3, 2) * 80}ms`;
  observer.observe(element);
});

document.querySelector("[data-year]").textContent = new Date().getFullYear();
