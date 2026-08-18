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
      role: "Chair Professor · Doctoral Supervisor",
      institution: "University of Science and Technology of China",
      image: "assets/avatars/chen-enhong.jpg",
      bio: "Chair Professor and doctoral supervisor at USTC, and Deputy Director of the State Key Laboratory of Cognitive Intelligence. His research spans data mining, machine learning, personalized recommendation, and intelligent education. He is an IEEE Fellow and a Fellow of CCF and CAAI."
    },
    {
      id: "kai-zhang",
      group: "leadership",
      name: "Kai Zhang",
      role: "Specially Appointed Associate Researcher",
      institution: "University of Science and Technology of China",
      image: "assets/avatars/kai-zhang.jpg",
      bio: "Specially Appointed Associate Researcher at USTC. His research interests include artificial intelligence, natural language processing, large language models, knowledge representation, and reasoning."
    },
    {
      id: "yuhang-yang",
      group: "member",
      name: "Yuhang Yang",
      role: "MSc Student · Class of 2025",
      institution: "University of Science and Technology of China",
      image: "assets/avatars/yuhang-yang.jpg",
      bio: "A master's student at USTC, class of 2025, working on computational biology and intelligence omics."
    },
    {
      id: "tenghao-wang",
      group: "member",
      name: "Tenghao Wang",
      role: "MSc Student · Class of 2026",
      institution: "University of Science and Technology of China",
      image: "assets/avatars/tenghao-wang.jpg",
      bio: "A master's student at USTC, class of 2026, working on computational biology and intelligence omics."
    },
    {
      id: "yonggan-bu",
      group: "member",
      name: "Yonggan Bu",
      role: "Undergraduate · Class of 2024",
      institution: "University of Science and Technology of China",
      image: "assets/avatars/yonggan-bu.png",
      bio: "An undergraduate student at USTC, class of 2024, working on computational biology and intelligence omics."
    },
    {
      id: "bin-ma",
      group: "member",
      name: "Bin Ma",
      role: "Undergraduate · Class of 2024",
      institution: "University of Science and Technology of China",
      image: "assets/avatars/bin-ma.png",
      bio: "An undergraduate student at USTC, class of 2024, working on computational biology and intelligence omics."
    },
    {
      id: "yijia-qiu",
      group: "member",
      name: "Yijia Qiu",
      role: "Undergraduate · Class of 2024",
      institution: "University of Science and Technology of China",
      image: "assets/avatars/yijia-qiu.png",
      bio: "An undergraduate student at USTC, class of 2024, working on computational biology and intelligence omics."
    },
    {
      id: "yiming-luo",
      group: "collaborator",
      name: "Yiming Luo",
      role: "Eight-Year MD-PhD Program · Class of 2021",
      institution: "Peking University Cancer Hospital",
      image: "assets/avatars/yiming-luo.png",
      bio: "A student in the eight-year MD-PhD program at Peking University Cancer Hospital, class of 2021."
    },
    {
      id: "pengfei-guan",
      group: "collaborator",
      name: "Pengfei Guan",
      role: "Undergraduate · Class of 2024",
      institution: "Peking University Health Science Center",
      image: "assets/avatars/pengfei-guan.png",
      bio: "An undergraduate student at Peking University Health Science Center, class of 2024."
    },
    {
      id: "shengyuan-zhou",
      group: "collaborator",
      name: "Shengyuan Zhou",
      role: "Undergraduate · Class of 2024",
      institution: "Peking University Health Science Center",
      image: "assets/avatars/shengyuan-zhou.png",
      bio: "An undergraduate student at Peking University Health Science Center, class of 2024."
    },
    {
      id: "junyu-li",
      group: "collaborator",
      name: "Junyu Li",
      role: "Undergraduate · Class of 2024",
      institution: "Peking University Health Science Center",
      image: "assets/avatars/junyu-li.jpg",
      bio: "An undergraduate student at Peking University Health Science Center, class of 2024."
    }
  ];

  let selectedId = null;
  let selectedTrigger = null;

  function bubble(person) {
    return `<article class="person-bubble person-${person.group}" data-person="${person.id}"><button type="button" data-person-id="${person.id}" aria-controls="team-profile" aria-expanded="false" aria-label="View ${person.name}'s profile"><span class="portrait"><img src="${person.image}" alt="${person.name}"></span><strong>${person.name}</strong><span class="person-meta">${person.role}</span></button></article>`;
  }

  function render() {
    ["leadership", "member", "collaborator"].forEach((group) => {
      const root = stage.querySelector(`[data-team-group="${group}"]`);
      if (root) root.innerHTML = people.filter((person) => person.group === group).map(bubble).join("");
    });
  }

  function selectPerson(id) {
    const person = people.find((item) => item.id === id);
    if (!person) return;
    selectedId = person.id;
    selectedTrigger = stage.querySelector(`[data-person-id="${person.id}"]`);
    stage.classList.add("is-focused");
    stage.querySelectorAll("[data-person]").forEach((node) => node.classList.toggle("is-selected", node.dataset.person === person.id));
    stage.querySelectorAll("[data-person-id]").forEach((button) => button.setAttribute("aria-expanded", String(button.dataset.personId === person.id)));
    profile.hidden = false;
    profile.innerHTML = `<p class="profile-group">${person.institution}</p><h3>${person.name}</h3><p class="profile-role">${person.role}</p><p class="profile-bio">${person.bio}</p>`;
  }

  function clearSelection() {
    if (!selectedId) return;
    stage.classList.remove("is-focused");
    stage.querySelectorAll("[data-person]").forEach((node) => node.classList.remove("is-selected"));
    stage.querySelectorAll("[data-person-id]").forEach((button) => button.setAttribute("aria-expanded", "false"));
    profile.hidden = true;
    profile.innerHTML = "";
    selectedId = null;
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
}());
