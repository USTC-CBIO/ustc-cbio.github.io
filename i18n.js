(function () {
  "use strict";

  const STORAGE_KEY = "cbio-language";
  const DEFAULT_LANGUAGE = "en";
  const SUPPORTED_LANGUAGES = new Set(["en", "zh"]);
  const PAGE_FROM_PATH = {
    "index.html": "home",
    "research.html": "research",
    "team.html": "team",
    "publications.html": "publications",
    "data-code.html": "dataCode",
    "news.html": "news",
    "media.html": "media",
    "contact.html": "contact"
  };

  const DICTIONARY = {
    en: {
      titles: {
        home: "CBIO Lab | Computational Biology and Intelligent Omics",
        research: "Research | CBIO Lab",
        team: "Team | CBIO Lab",
        publications: "Publications | CBIO Lab",
        dataCode: "Data & Code | CBIO Lab",
        news: "News | CBIO Lab",
        media: "Media | CBIO Lab",
        contact: "Contact | CBIO Lab"
      },
      common: {
        logo: {
          homeAriaLabel: "CBIO Lab home",
          imageAriaLabel: "CBIO Lab"
        },
        menu: {
          openAriaLabel: "Open menu"
        },
        navigation: {
          ariaLabel: "Main navigation"
        },
        nav: {
          home: "Home",
          research: "Research",
          team: "Team",
          publications: "Publications",
          dataCode: "Data & Code",
          news: "News",
          media: "Media",
          contact: "Contact"
        },
        footer: {
          tagline: "Computational Biology and Intelligent Omics"
        },
        imageAlts: {
          stPainter: "stPainter method overview",
          deepSpatial: "DeepSpatial method overview",
          driftST: "DriftST method overview"
        },
        languageToggle: {
          switchToChinese: "Switch to Chinese",
          switchToEnglish: "Switch to English",
          buttonEnglish: "EN",
          buttonChinese: "中文"
        }
      },
      home: {
        hero: {
          eyebrow: "CBIO LAB · COMPUTATIONAL BIOLOGY AND INTELLIGENT OMICS",
          title: "How can artificial intelligence help us understand the language of life?",
          body: "We develop computational methods that turn complex molecular measurements into biological insight."
        },
        heroCredits: [
          "Spatial omics · CBIO Lab",
          "Single-cell omics · CBIO Lab",
          "3D spatial reconstruction · CBIO Lab"
        ],
        selectedFindings: {
          heading: "Selected findings",
          action: "All publications →",
          stPainterVenue: "Nature Communications · 2026",
          stPainterTitle: "Enhancing Pan-cancer Spatial Transcriptomics at Single-cell Resolution with stPainter",
          deepSpatialVenue: "bioRxiv · 2026",
          deepSpatialTitle: "Reconstructing True 3D Spatial Omics at Single-Cell Resolution",
          driftSTVenue: "arXiv · 2026",
          driftSTTitle: "DriftST: One-Step Generative Inference of Spatial Transcriptomics from H&E Histology"
        },
        whatWeStudy: {
          heading: "What we study",
          body: "The CBIO Lab develops AI methods for spatial omics. We enhance spatial gene expression, reconstruct continuous three-dimensional tissues from serial slices, and infer spatial transcriptomics directly from histology images.",
          enhancementTitle: "Gene expression enhancement",
          enhancementBody: "stPainter imputes unmeasured genes and denoises spatial transcriptomics at single-cell resolution.",
          reconstructionTitle: "3D spatial reconstruction",
          reconstructionBody: "DeepSpatial transforms discrete serial sections into continuous three-dimensional tissue atlases.",
          generationTitle: "Histology-to-ST generation",
          generationBody: "DriftST predicts spatial gene-expression distributions from H&E pathology images in one step."
        },
        latestNews: {
          heading: "Latest news",
          action: "View all news →",
          item1Date: "July 2026",
          item1Title: "CBIO Lab is taking shape",
          item2Date: "Coming soon",
          item2Title: "Follow our research, people, and lab milestones"
        }
      },
      research: {
        hero: {
          eyebrow: "CBIO LAB · RESEARCH",
          title: "Artificial intelligence for spatial omics.",
          body: "We develop generative and representation-learning methods that expand what spatial omics can measure, reconstruct, and reveal."
        },
        approach: {
          heading: "Our approach",
          body: "Spatial transcriptomics preserves molecular measurements in their tissue context, but current technologies remain limited by gene coverage, two-dimensional sampling, and experimental cost. We use machine learning to enhance gene expression, recover continuous three-dimensional organization, and infer spatial transcriptomics from routine histology."
        },
        directions: {
          enhancementTitle: "Spatial gene enhancement",
          enhancementBody: "stPainter uses pan-cancer single-cell pretraining and latent diffusion to impute unmeasured genes without matched reference tissue.",
          true3dTitle: "True 3D spatial omics",
          true3dBody: "DeepSpatial combines optimal transport, flow matching, and gene transformers to reconstruct continuous tissue from serial sections.",
          histologyTitle: "Histology-to-ST inference",
          histologyBody: "DriftST uses one-step generative modeling and co-expression attention to predict spatial transcriptomics from H&E images."
        },
        future: {
          heading: "Future directions",
          body: "Our next projects extend spatial omics through multimodal learning, benchmark development, and richer tissue modeling.",
          openAriaLabel: "Open future direction",
          multimodalMeta: "Multimodal learning",
          multimodalTitle: "Aligning spatial omics with histology and other molecular modalities",
          multiomicsMeta: "Spatial multi-omics",
          multiomicsTitle: "Fusing complementary omics measurements in a shared tissue context",
          benchmarksMeta: "Benchmarks",
          benchmarksTitle: "Evaluating histology-to-ST prediction, cell segmentation, and multi-slice alignment",
          spatiotemporalMeta: "Spatiotemporal biology",
          spatiotemporalTitle: "Modeling tissue microenvironments across space and time"
        }
      },
      team: {
        hero: {
          eyebrow: "CBIO LAB · TEAM",
          title: "Different backgrounds. One shared curiosity.",
          body: "We bring together machine learning, bioinformatics, genomics, medicine, and experimental biology."
        },
        intro: {
          heading: "Meet the lab",
          body: "CBIO Lab is an interdisciplinary research community built around rigorous science, generous collaboration, and the belief that the best methods begin with meaningful biological questions."
        },
        people: {
          heading: "Our people",
          body: "Select a portrait to read a short profile. The group brings together academic leadership, lab members, and collaborators across institutions."
        },
        groups: {
          leadership: "Academic leadership",
          members: "Lab members",
          collaborators: "Collaborators"
        },
        open: "View {name}'s profile"
      },
      publications: {
        hero: {
          eyebrow: "CBIO LAB · PUBLICATIONS",
          title: "Research, shared.",
          body: "Our papers, preprints, methods, and scientific resources for intelligence in biological omics."
        },
        selectedWork: {
          heading: "Selected work",
          body: "Three representative projects use artificial intelligence to enhance spatial gene expression, reconstruct true three-dimensional spatial omics, and generate spatial transcriptomics from pathology images.",
          stPainterVenue: "Nature Communications · 2026",
          stPainterTitle: "Enhancing Pan-cancer Spatial Transcriptomics at Single-cell Resolution with stPainter",
          deepSpatialVenue: "bioRxiv · 2026",
          deepSpatialTitle: "Reconstructing True 3D Spatial Omics at Single-Cell Resolution",
          driftSTVenue: "arXiv · 2026",
          driftSTTitle: "DriftST: One-Step Generative Inference of Spatial Transcriptomics from H&E Histology"
        }
      },
      dataCode: {
        hero: {
          eyebrow: "CBIO LAB · DATA & CODE",
          title: "Open tools for open discovery.",
          body: "Reusable software, datasets, models, and interactive resources from our research."
        },
        resources: {
          heading: "Research resources",
          body: "We aim to make our work reproducible and useful beyond the lab. Each project can link to its repository, documentation, model weights, dataset, and associated publication.",
          stPainterLabel: "Gene imputation · Pretrained model",
          stPainterTitle: "stPainter",
          stPainterBody: "Pan-cancer pretraining for spatial gene-expression enhancement at single-cell resolution.",
          stPainterLink: "Project resources →",
          deepSpatialLabel: "3D reconstruction · Generative model",
          deepSpatialTitle: "DeepSpatial",
          deepSpatialBody: "Continuous-volume reconstruction for transcriptomic and proteomic spatial omics.",
          deepSpatialLink: "Project resources →",
          driftSTLabel: "Histology-to-ST · One-step generation",
          driftSTTitle: "DriftST",
          driftSTBody: "Generative inference of spatial transcriptomics directly from H&E pathology images.",
          driftSTLink: "Project resources →",
          benchmarksLabel: "Benchmarks · In development",
          benchmarksTitle: "Spatial omics benchmarks",
          benchmarksBody: "Evaluation resources for H&E-to-ST prediction, cell segmentation, and multi-slice alignment.",
          benchmarksLink: "Coming soon →"
        }
      },
      news: {
        hero: {
          eyebrow: "CBIO LAB · NEWS",
          title: "Latest from the lab.",
          body: "New papers, people, events, awards, and other milestones from the CBIO community."
        },
        notes: {
          heading: "Lab notes",
          body: "This page is ready for your real announcements. Each story card can link to a longer article, publication, university news release, or external event page."
        },
        stories: {
          item1Label: "Lab update · July 2026",
          item1Title: "CBIO Lab is taking shape",
          item1Body: "We are building a new home for intelligence in biological omics.",
          item2Label: "Publication · Coming soon",
          item2Title: "Share your newest paper here",
          item2Body: "Add a short introduction and link readers to the publication.",
          item3Label: "People · Coming soon",
          item3Title: "Welcome a new lab member",
          item3Body: "Introduce new students, researchers, and collaborators."
        }
      },
      media: {
        hero: {
          eyebrow: "CBIO LAB · MEDIA",
          title: "Science beyond the paper.",
          body: "Talks, interviews, explainers, press coverage, and visual stories about our research."
        },
        intro: {
          heading: "CBIO in the world",
          body: "Use this page to make complex research approachable and to collect public-facing conversations about the lab’s work."
        },
        items: {
          talkTitle: "Research talk or seminar",
          talkBody: "Add a video recording, conference presentation, or invited lecture.",
          talkLink: "Watch video →",
          pressTitle: "Press coverage",
          pressBody: "Link to a feature about a new result, collaboration, or lab milestone.",
          pressLink: "Read article →",
          explainerTitle: "Omics explainer",
          explainerBody: "Share an accessible explanation of a concept, method, or dataset.",
          explainerLink: "Explore story →",
          podcastTitle: "Podcast or interview",
          podcastBody: "Collect conversations about biological AI and the future of omics.",
          podcastLink: "Listen now →"
        }
      },
      contact: {
        hero: {
          eyebrow: "CBIO LAB · CONTACT",
          title: "Get in touch.",
          body: "Connect with CBIO Lab about research, collaboration, open positions, or other questions."
        },
        join: {
          heading: "Work with us",
          body: "CBIO Lab values intellectual curiosity, thoughtful collaboration, clear communication, and respect for different disciplinary backgrounds. Experience in every area is not required—we care about your questions, your foundations, and your willingness to learn."
        },
        positions: {
          placeholder: "Position placeholder",
          phd: "PhD students",
          postdoc: "Postdoctoral researchers",
          collaborationLabel: "Collaboration",
          collaborationTitle: "Students and research collaborators"
        },
        conversation: {
          heading: "Start a conversation",
          body: "Introduce yourself, describe the biological or computational questions that motivate you, and attach a CV or relevant work. Replace the placeholder address before launch.",
          emailLabel: "your-email@example.edu"
        }
      }
    },
    zh: {
      titles: {
        home: "CBIO Lab | 计算生物学与智能组学",
        research: "研究 | CBIO Lab",
        team: "团队 | CBIO Lab",
        publications: "论文发表 | CBIO Lab",
        dataCode: "数据与代码 | CBIO Lab",
        news: "新闻动态 | CBIO Lab",
        media: "媒体内容 | CBIO Lab",
        contact: "联系 | CBIO Lab"
      },
      common: {
        logo: {
          homeAriaLabel: "CBIO Lab 首页",
          imageAriaLabel: "CBIO Lab"
        },
        menu: {
          openAriaLabel: "打开菜单"
        },
        navigation: {
          ariaLabel: "主导航"
        },
        nav: {
          home: "首页",
          research: "研究",
          team: "团队",
          publications: "论文发表",
          dataCode: "数据与代码",
          news: "新闻动态",
          media: "媒体内容",
          contact: "联系"
        },
        footer: {
          tagline: "计算生物学与智能组学"
        },
        imageAlts: {
          stPainter: "stPainter 方法概览",
          deepSpatial: "DeepSpatial 方法概览",
          driftST: "DriftST 方法概览"
        },
        languageToggle: {
          switchToChinese: "切换到中文",
          switchToEnglish: "切换到英文",
          buttonEnglish: "EN",
          buttonChinese: "中文"
        }
      },
      home: {
        hero: {
          eyebrow: "CBIO LAB · 计算生物学与智能组学",
          title: "人工智能如何帮助我们理解生命的语言？",
          body: "我们开发计算方法，将复杂的分子测量转化为可解释的生物学洞见。"
        },
        heroCredits: [
          "空间组学 · CBIO Lab",
          "单细胞组学 · CBIO Lab",
          "三维空间重建 · CBIO Lab"
        ],
        selectedFindings: {
          heading: "精选成果",
          action: "全部论文 →",
          stPainterVenue: "Nature Communications · 2026",
          stPainterTitle: "利用 stPainter 在单细胞分辨率上增强泛癌空间转录组",
          deepSpatialVenue: "bioRxiv · 2026",
          deepSpatialTitle: "在单细胞分辨率上重建真实三维空间组学",
          driftSTVenue: "arXiv · 2026",
          driftSTTitle: "DriftST：从 H&E 组织学图像一步推断空间转录组"
        },
        whatWeStudy: {
          heading: "我们的研究方向",
          body: "CBIO Lab 开发面向空间组学的人工智能方法。我们提升空间基因表达质量，从连续切片重建三维组织结构，并直接从组织学图像推断空间转录组。",
          enhancementTitle: "基因表达增强",
          enhancementBody: "stPainter 在单细胞分辨率上补全未测量基因，并为空间转录组降噪。",
          reconstructionTitle: "三维空间重建",
          reconstructionBody: "DeepSpatial 将离散的连续切片转化为连续的三维组织图谱。",
          generationTitle: "组织学到空间转录组生成",
          generationBody: "DriftST 从 H&E 病理图像一步预测空间基因表达分布。"
        },
        latestNews: {
          heading: "最新动态",
          action: "查看全部新闻 →",
          item1Date: "2026 年 7 月",
          item1Title: "CBIO Lab 正在成形",
          item2Date: "即将推出",
          item2Title: "关注我们的研究、成员与实验室里程碑"
        }
      },
      research: {
        hero: {
          eyebrow: "CBIO LAB · 研究",
          title: "面向空间组学的人工智能。",
          body: "我们开发生成式与表征学习方法，扩展空间组学能够测量、重建和揭示的内容。"
        },
        approach: {
          heading: "我们的研究方法",
          body: "空间转录组学在组织背景中保留分子测量，但当前技术仍受限于基因覆盖范围、二维采样和实验成本。我们利用机器学习增强基因表达、恢复连续的三维组织结构，并从常规组织学图像中推断空间转录组。"
        },
        directions: {
          enhancementTitle: "空间基因增强",
          enhancementBody: "stPainter 结合泛癌单细胞预训练与潜变量扩散，在无需匹配参考组织的情况下补全未测量基因。",
          true3dTitle: "真实三维空间组学",
          true3dBody: "DeepSpatial 结合最优传输、流匹配与基因 Transformer，从连续切片中重建连续组织。",
          histologyTitle: "组织学到空间转录组推断",
          histologyBody: "DriftST 利用一步生成建模与共表达注意力，从 H&E 图像预测空间转录组。"
        },
        future: {
          heading: "未来方向",
          body: "我们的下一批项目将通过多模态学习、基准构建和更丰富的组织建模来推进空间组学。",
          openAriaLabel: "打开未来方向",
          multimodalMeta: "多模态学习",
          multimodalTitle: "将空间组学与组织学及其他分子模态对齐",
          multiomicsMeta: "空间多组学",
          multiomicsTitle: "在统一的组织背景中融合互补的组学测量",
          benchmarksMeta: "基准测试",
          benchmarksTitle: "评估组织学到空间转录组预测、细胞分割与多切片对齐",
          spatiotemporalMeta: "时空生物学",
          spatiotemporalTitle: "跨越空间与时间建模组织微环境"
        }
      },
      team: {
        hero: {
          eyebrow: "CBIO LAB · 团队",
          title: "不同背景，同样的好奇心。",
          body: "我们汇聚机器学习、生物信息学、基因组学、医学与实验生物学。"
        },
        intro: {
          heading: "认识实验室",
          body: "CBIO Lab 是一个跨学科研究共同体，重视严谨的科学、慷慨的合作，并相信最好的方法始于真正重要的生物学问题。"
        },
        people: {
          heading: "我们的成员",
          body: "选择头像即可查看简短介绍。这个团队汇聚了学术带头人、实验室成员以及跨机构合作伙伴。"
        },
        groups: {
          leadership: "学术带头人",
          members: "实验室成员",
          collaborators: "合作成员"
        },
        open: "查看 {name} 的简介"
      },
      publications: {
        hero: {
          eyebrow: "CBIO LAB · 论文发表",
          title: "让研究被共享。",
          body: "我们的论文、预印本、方法与科学资源，聚焦生物组学智能。"
        },
        selectedWork: {
          heading: "代表性工作",
          body: "三个代表性项目利用人工智能增强空间基因表达、重建真实的三维空间组学，并从病理图像生成空间转录组。",
          stPainterVenue: "Nature Communications · 2026",
          stPainterTitle: "利用 stPainter 在单细胞分辨率上增强泛癌空间转录组",
          deepSpatialVenue: "bioRxiv · 2026",
          deepSpatialTitle: "在单细胞分辨率上重建真实三维空间组学",
          driftSTVenue: "arXiv · 2026",
          driftSTTitle: "DriftST：从 H&E 组织学图像一步推断空间转录组"
        }
      },
      dataCode: {
        hero: {
          eyebrow: "CBIO LAB · 数据与代码",
          title: "开放工具，服务开放发现。",
          body: "来自我们研究的可复用软件、数据集、模型和交互式资源。"
        },
        resources: {
          heading: "研究资源",
          body: "我们希望让研究成果在实验室之外同样可复现、可复用。每个项目都可以链接到代码仓库、文档、模型权重、数据集以及相关论文。",
          stPainterLabel: "基因插补 · 预训练模型",
          stPainterTitle: "stPainter",
          stPainterBody: "面向空间基因表达增强的泛癌预训练，可达到单细胞分辨率。",
          stPainterLink: "项目资源 →",
          deepSpatialLabel: "三维重建 · 生成式模型",
          deepSpatialTitle: "DeepSpatial",
          deepSpatialBody: "面向转录组与蛋白组空间组学的连续体积重建。",
          deepSpatialLink: "项目资源 →",
          driftSTLabel: "组织学到空间转录组 · 一步生成",
          driftSTTitle: "DriftST",
          driftSTBody: "直接从 H&E 病理图像生成空间转录组推断。",
          driftSTLink: "项目资源 →",
          benchmarksLabel: "基准测试 · 开发中",
          benchmarksTitle: "空间组学基准",
          benchmarksBody: "用于评估 H&E 到空间转录组预测、细胞分割和多切片对齐的资源。",
          benchmarksLink: "即将推出 →"
        }
      },
      news: {
        hero: {
          eyebrow: "CBIO LAB · 新闻动态",
          title: "实验室最新动态。",
          body: "来自 CBIO 社群的新论文、新成员、活动、奖项与其他重要进展。"
        },
        notes: {
          heading: "实验室札记",
          body: "这个页面已经准备好承载你们的真实公告。每张动态卡片都可以链接到更长的文章、论文、校内新闻稿或外部活动页面。"
        },
        stories: {
          item1Label: "实验室更新 · 2026 年 7 月",
          item1Title: "CBIO Lab 正在成形",
          item1Body: "我们正在打造一个面向生物组学智能的新家园。",
          item2Label: "论文发表 · 即将推出",
          item2Title: "在这里分享你的最新论文",
          item2Body: "添加简短介绍，并引导读者查看论文。",
          item3Label: "成员动态 · 即将推出",
          item3Title: "欢迎新的实验室成员",
          item3Body: "介绍新加入的学生、研究人员和合作伙伴。"
        }
      },
      media: {
        hero: {
          eyebrow: "CBIO LAB · 媒体内容",
          title: "超越论文的科学。",
          body: "围绕我们研究的讲座、访谈、科普解读、媒体报道和视觉化故事。"
        },
        intro: {
          heading: "走向公众的 CBIO",
          body: "用这个页面让复杂研究更易理解，并汇集关于实验室工作的对外交流内容。"
        },
        items: {
          talkTitle: "研究报告或学术讲座",
          talkBody: "添加视频录播、会议报告或受邀演讲。",
          talkLink: "观看视频 →",
          pressTitle: "媒体报道",
          pressBody: "链接到关于新成果、合作项目或实验室里程碑的报道。",
          pressLink: "阅读文章 →",
          explainerTitle: "组学科普解读",
          explainerBody: "分享对某个概念、方法或数据集的通俗解释。",
          explainerLink: "查看故事 →",
          podcastTitle: "播客或访谈",
          podcastBody: "汇集关于生物人工智能与组学未来的对话。",
          podcastLink: "立即收听 →"
        }
      },
      contact: {
        hero: {
          eyebrow: "CBIO LAB · 联系",
          title: "与我们联系。",
          body: "就研究、合作、开放职位或其他问题与 CBIO Lab 取得联系。"
        },
        join: {
          heading: "与我们共事",
          body: "CBIO Lab 重视智识好奇心、周到合作、清晰沟通，以及对不同学科背景的尊重。你不必在每个方向上都已有经验，我们更看重你的问题意识、基础能力和学习意愿。"
        },
        positions: {
          placeholder: "职位占位",
          phd: "博士生",
          postdoc: "博士后研究人员",
          collaborationLabel: "合作",
          collaborationTitle: "学生与科研合作伙伴"
        },
        conversation: {
          heading: "开始交流",
          body: "欢迎介绍你自己，说明激发你兴趣的生物学或计算问题，并附上简历或相关作品。上线前请将占位邮箱替换为正式地址。",
          emailLabel: "your-email@example.edu"
        }
      }
    }
  };

  let fallbackLanguage = DEFAULT_LANGUAGE;
  let activeLanguage = DEFAULT_LANGUAGE;

  function normalizeLanguage(language) {
    return SUPPORTED_LANGUAGES.has(language) ? language : DEFAULT_LANGUAGE;
  }

  function readStoredLanguage() {
    try {
      const storedLanguage = window.localStorage.getItem(STORAGE_KEY);
      if (SUPPORTED_LANGUAGES.has(storedLanguage)) {
        fallbackLanguage = storedLanguage;
        return storedLanguage;
      }
    } catch (error) {
      // Ignore storage access failures and fall back to memory.
    }
    return fallbackLanguage;
  }

  function writeStoredLanguage(language) {
    fallbackLanguage = language;
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch (error) {
      // Ignore storage access failures and keep the in-memory value.
    }
  }

  function getPageKey() {
    const declaredPage = document.body?.dataset.page;
    if (declaredPage) return declaredPage;
    const path = window.location.pathname.split("/").pop() || "index.html";
    return PAGE_FROM_PATH[path] || "home";
  }

  function readDictionaryValue(language, key) {
    return key.split(".").reduce((value, segment) => {
      if (value == null) return undefined;
      return value[segment];
    }, DICTIONARY[language]);
  }

  function resolveTranslation(key, variables, language) {
    const targetLanguage = normalizeLanguage(language || activeLanguage);
    const translation = readDictionaryValue(targetLanguage, key);
    const fallback = readDictionaryValue(DEFAULT_LANGUAGE, key);
    const value = translation === undefined ? fallback : translation;

    if (typeof value === "string") {
      return value.replace(/\{(\w+)\}/g, (match, name) => {
        if (!variables || variables[name] === undefined || variables[name] === null) {
          return match;
        }
        return String(variables[name]);
      });
    }

    return value;
  }

  function t(key, variables) {
    const value = resolveTranslation(key, variables, activeLanguage);
    return typeof value === "string" ? value : key;
  }

  function updateTextNodes(language) {
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      if (node.hasAttribute("data-i18n-attr")) return;
      const key = node.getAttribute("data-i18n");
      if (!key) return;
      const value = resolveTranslation(key, null, language);
      if (typeof value === "string") {
        node.textContent = value;
      }
    });
  }

  function updateAttributeNodes(language) {
    document.querySelectorAll("[data-i18n-attr]").forEach((node) => {
      const baseKey = node.getAttribute("data-i18n");
      const declarations = (node.getAttribute("data-i18n-attr") || "")
        .split(",")
        .map((entry) => entry.trim())
        .filter(Boolean);

      declarations.forEach((entry) => {
        const delimiterIndex = entry.indexOf(":");
        const attributeName = delimiterIndex === -1 ? entry : entry.slice(0, delimiterIndex).trim();
        const key = delimiterIndex === -1 ? baseKey : entry.slice(delimiterIndex + 1).trim();
        if (!attributeName || !key) return;
        const value = resolveTranslation(key, null, language);
        if (typeof value === "string") {
          node.setAttribute(attributeName, value);
        }
      });
    });
  }

  function updateDocumentMetadata(language) {
    const title = resolveTranslation("titles." + getPageKey(), null, language);
    if (typeof title === "string") {
      document.title = title;
    }
    document.documentElement.lang = language;
  }

  function ensureLanguageToggle() {
    const headerInner = document.querySelector(".header-inner");
    if (!headerInner) return null;

    let toggle = headerInner.querySelector("[data-language-toggle]");
    if (!toggle) {
      toggle = document.createElement("button");
      toggle.className = "language-toggle";
      toggle.type = "button";
      toggle.setAttribute("data-language-toggle", "");
      toggle.setAttribute("aria-label", DICTIONARY.en.common.languageToggle.switchToChinese);
      toggle.textContent = DICTIONARY.en.common.languageToggle.buttonChinese;
      headerInner.appendChild(toggle);
    }

    if (toggle.dataset.cbioBound !== "true") {
      toggle.addEventListener("click", () => {
        setLanguage(activeLanguage === "en" ? "zh" : "en");
      });
      toggle.dataset.cbioBound = "true";
    }

    return toggle;
  }

  function updateLanguageToggle(language) {
    const toggle = ensureLanguageToggle();
    if (!toggle) return;

    const nextLanguageKey = language === "en" ? "switchToChinese" : "switchToEnglish";
    const buttonTextKey = language === "en" ? "buttonChinese" : "buttonEnglish";

    toggle.setAttribute("aria-label", resolveTranslation("common.languageToggle." + nextLanguageKey, null, language));
    toggle.textContent = resolveTranslation("common.languageToggle." + buttonTextKey, null, language);
  }

  function applyLanguage(language) {
    updateTextNodes(language);
    updateAttributeNodes(language);
    updateDocumentMetadata(language);
    updateLanguageToggle(language);
  }

  function setLanguage(language, options) {
    const nextLanguage = normalizeLanguage(language);
    const shouldEmit = !options || options.emit !== false;
    const hasChanged = nextLanguage !== activeLanguage;

    activeLanguage = nextLanguage;
    writeStoredLanguage(nextLanguage);
    applyLanguage(nextLanguage);

    if (shouldEmit && hasChanged) {
      document.dispatchEvent(new CustomEvent("cbio:language-change", {
        detail: { language: nextLanguage }
      }));
    }

    return activeLanguage;
  }

  function getLanguage() {
    return activeLanguage;
  }

  window.CBIO_I18N = {
    getLanguage,
    t,
    setLanguage
  };

  activeLanguage = readStoredLanguage();
  applyLanguage(activeLanguage);
}());
