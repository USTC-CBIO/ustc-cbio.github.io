(function () {
  "use strict";

  const stage = document.querySelector("[data-team-stage]");
  const profile = stage?.querySelector("[data-team-profile]");
  if (!stage || !profile) return;

  const people = [
    {
      id: "chen-enhong",
      group: "leadership",
      name: "Enhong Chen",
      nameZh: "陈恩红",
      role: "Chair Professor · Doctoral Supervisor",
      roleZh: "讲席教授 · 博士生导师",
      institution: "University of Science and Technology of China",
      institutionZh: "中国科学技术大学",
      image: "assets/avatars/chen-enhong.jpg",
      bio: "Chair Professor and doctoral supervisor at USTC, and Deputy Director of the State Key Laboratory of Cognitive Intelligence. His research spans data mining, machine learning, personalized recommendation, and intelligent education. He is an IEEE Fellow and a Fellow of CCF and CAAI.",
      bioZh: "中国科学技术大学讲席教授、博士生导师，认知智能全国重点实验室副主任。研究方向涵盖数据挖掘、机器学习、个性化推荐与智能教育。现为 IEEE Fellow，以及 CCF Fellow 和 CAAI Fellow。"
    },
    {
      id: "kai-zhang",
      group: "leadership",
      name: "Kai Zhang",
      nameZh: "张凯",
      role: "Specially Appointed Associate Researcher",
      roleZh: "特任副研究员",
      institution: "University of Science and Technology of China",
      institutionZh: "中国科学技术大学",
      image: "assets/avatars/kai-zhang.jpg",
      bio: "Specially Appointed Associate Researcher at USTC. His research interests include artificial intelligence, natural language processing, large language models, knowledge representation, and reasoning.",
      bioZh: "中国科学技术大学特任副研究员。研究兴趣包括人工智能、自然语言处理、大语言模型、知识表示与推理。"
    },
    {
      id: "yuhang-yang",
      group: "member",
      name: "Yuhang Yang",
      nameZh: "杨宇航",
      role: "MSc Student · Class of 2025",
      roleZh: "硕士生 · 2025 级",
      institution: "University of Science and Technology of China",
      institutionZh: "中国科学技术大学",
      image: "assets/avatars/yuhang-yang.jpg",
      bio: "A master's student at USTC, class of 2025, working on computational biology and intelligence omics.",
      bioZh: "中国科学技术大学 2025 级硕士生，研究方向为计算生物学与智能组学。"
    },
    {
      id: "tenghao-wang",
      group: "member",
      name: "Tenghao Wang",
      nameZh: "王腾昊",
      role: "MSc Student · Class of 2026",
      roleZh: "硕士生 · 2026 级",
      institution: "University of Science and Technology of China",
      institutionZh: "中国科学技术大学",
      image: "assets/avatars/tenghao-wang.jpg",
      bio: "A master's student at USTC, class of 2026, working on computational biology and intelligence omics.",
      bioZh: "中国科学技术大学 2026 级硕士生，研究方向为计算生物学与智能组学。"
    },
    {
      id: "yonggan-bu",
      group: "member",
      name: "Yonggan Bu",
      nameZh: "卜永淦",
      role: "Undergraduate · Class of 2024",
      roleZh: "本科生 · 2024 级",
      institution: "University of Science and Technology of China",
      institutionZh: "中国科学技术大学",
      image: "assets/avatars/yonggan-bu.png",
      bio: "An undergraduate student at USTC, class of 2024, working on computational biology and intelligence omics.",
      bioZh: "中国科学技术大学 2024 级本科生，研究方向为计算生物学与智能组学。"
    },
    {
      id: "bin-ma",
      group: "member",
      name: "Bin Ma",
      nameZh: "马斌",
      role: "Undergraduate · Class of 2024",
      roleZh: "本科生 · 2024 级",
      institution: "University of Science and Technology of China",
      institutionZh: "中国科学技术大学",
      image: "assets/avatars/bin-ma.png",
      bio: "An undergraduate student at USTC, class of 2024, working on computational biology and intelligence omics.",
      bioZh: "中国科学技术大学 2024 级本科生，研究方向为计算生物学与智能组学。"
    },
    {
      id: "yijia-qiu",
      group: "member",
      name: "Yijia Qiu",
      nameZh: "邱一嘉",
      role: "Undergraduate · Class of 2024",
      roleZh: "本科生 · 2024 级",
      institution: "University of Science and Technology of China",
      institutionZh: "中国科学技术大学",
      image: "assets/avatars/yijia-qiu.png",
      bio: "An undergraduate student at USTC, class of 2024, working on computational biology and intelligence omics.",
      bioZh: "中国科学技术大学 2024 级本科生，研究方向为计算生物学与智能组学。"
    },
    {
      id: "yiming-luo",
      group: "collaborator",
      name: "Yiming Luo",
      nameZh: "罗一鸣",
      role: "Eight-Year MD-PhD Program · Class of 2021",
      roleZh: "八年制 MD-PhD 项目 · 2021 级",
      institution: "Peking University Cancer Hospital",
      institutionZh: "北京大学肿瘤医院",
      image: "assets/avatars/yiming-luo.png",
      bio: "A student in the eight-year MD-PhD program at Peking University Cancer Hospital, class of 2021.",
      bioZh: "北京大学肿瘤医院 2021 级八年制 MD-PhD 项目学生。"
    },
    {
      id: "pengfei-guan",
      group: "collaborator",
      name: "Pengfei Guan",
      nameZh: "关鹏飞",
      role: "Undergraduate · Class of 2024",
      roleZh: "本科生 · 2024 级",
      institution: "Peking University Health Science Center",
      institutionZh: "北京大学医学部",
      image: "assets/avatars/pengfei-guan.png",
      bio: "An undergraduate student at Peking University Health Science Center, class of 2024.",
      bioZh: "北京大学医学部 2024 级本科生。"
    },
    {
      id: "shengyuan-zhou",
      group: "collaborator",
      name: "Shengyuan Zhou",
      nameZh: "周晟源",
      role: "Undergraduate · Class of 2024",
      roleZh: "本科生 · 2024 级",
      institution: "Peking University Health Science Center",
      institutionZh: "北京大学医学部",
      image: "assets/avatars/shengyuan-zhou.png",
      bio: "An undergraduate student at Peking University Health Science Center, class of 2024.",
      bioZh: "北京大学医学部 2024 级本科生。"
    },
    {
      id: "junyu-li",
      group: "collaborator",
      name: "Junyu Li",
      nameZh: "李俊宇",
      role: "Undergraduate · Class of 2024",
      roleZh: "本科生 · 2024 级",
      institution: "Peking University Health Science Center",
      institutionZh: "北京大学医学部",
      image: "assets/avatars/junyu-li.jpg",
      bio: "An undergraduate student at Peking University Health Science Center, class of 2024.",
      bioZh: "北京大学医学部 2024 级本科生。"
    }
  ];

  let selectedId = null;
  let selectedTrigger = null;

  function language() {
    return window.CBIO_I18N?.getLanguage?.() === "zh" ? "zh" : "en";
  }

  function personText(person, field) {
    const localizedField = field + "Zh";
    return language() === "zh" && person[localizedField] ? person[localizedField] : person[field];
  }

  function profileLabel(person) {
    return window.CBIO_I18N?.t
      ? window.CBIO_I18N.t("team.open", { name: personText(person, "name") })
      : `View ${personText(person, "name")}'s profile`;
  }

  function bubble(person) {
    const name = personText(person, "name");
    const role = personText(person, "role");
    return `<article class="person-bubble person-${person.group}" data-person="${person.id}"><button type="button" data-person-id="${person.id}" aria-controls="team-profile" aria-expanded="false" aria-label="${profileLabel(person)}"><span class="portrait"><img src="${person.image}" alt="${name}"></span><strong>${name}</strong><span class="person-meta">${role}</span></button></article>`;
  }

  function render() {
    ["leadership", "member", "collaborator"].forEach((group) => {
      const root = stage.querySelector(`[data-team-group="${group}"]`);
      if (root) root.innerHTML = people.filter((person) => person.group === group).map(bubble).join("");
    });
    if (selectedId) selectPerson(selectedId);
  }

  function selectPerson(id) {
    const person = people.find((item) => item.id === id);
    if (!person) return;
    const name = personText(person, "name");
    const role = personText(person, "role");
    const institution = personText(person, "institution");
    const bio = personText(person, "bio");
    selectedId = person.id;
    selectedTrigger = stage.querySelector(`[data-person-id="${person.id}"]`);
    stage.classList.add("is-focused");
    stage.querySelectorAll("[data-person]").forEach((node) => node.classList.toggle("is-selected", node.dataset.person === person.id));
    stage.querySelectorAll("[data-person-id]").forEach((button) => button.setAttribute("aria-expanded", String(button.dataset.personId === person.id)));
    profile.hidden = false;
    profile.setAttribute("aria-label", profileLabel(person));
    profile.innerHTML = `<p class="profile-group">${institution}</p><h3>${name}</h3><p class="profile-role">${role}</p><p class="profile-bio">${bio}</p>`;
  }

  function clearSelection() {
    if (!selectedId) return;
    stage.classList.remove("is-focused");
    stage.querySelectorAll("[data-person]").forEach((node) => node.classList.remove("is-selected"));
    stage.querySelectorAll("[data-person-id]").forEach((button) => button.setAttribute("aria-expanded", "false"));
    profile.hidden = true;
    profile.removeAttribute("aria-label");
    profile.innerHTML = "";
    selectedId = null;
    selectedTrigger = null;
  }

  stage.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-person-id]");
    if (trigger) {
      selectPerson(trigger.dataset.personId);
      return;
    }
    if (selectedId && !event.target.closest("[data-team-profile]")) clearSelection();
  });

  document.addEventListener("click", (event) => {
    if (selectedId && !event.target.closest("[data-team-stage]")) clearSelection();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && selectedId) {
      const restore = selectedTrigger;
      clearSelection();
      restore?.focus();
    }
  });

  render();
  document.addEventListener("cbio:language-change", () => {
    render();
  });
}());
