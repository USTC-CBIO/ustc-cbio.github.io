(function () {
  "use strict";

  const stage = document.querySelector("[data-team-stage]");
  if (!stage) return;

  const people = [
    {
      group: "leadership",
      name: "Kai Zhang",
      role: "Associate Researcher",
      institution: "University of Science and Technology of China",
      image: "assets/avatars/kai-zhang.png"
    },
    {
      group: "leadership",
      name: "Qi Liu",
      role: "Professor · Doctoral Supervisor",
      institution: "University of Science and Technology of China",
      image: "assets/avatars/qi-liu.png"
    },
    {
      group: "leadership",
      name: "Enhong Chen",
      role: "Professor · Doctoral Supervisor",
      institution: "University of Science and Technology of China",
      image: "assets/avatars/chen-enhong.png"
    },
    {
      group: "member",
      name: "Yuhang Yang",
      role: "MSc Student · Class of 2025",
      institution: "University of Science and Technology of China",
      image: "assets/avatars/yuhang-yang.jpg"
    },
    {
      group: "member",
      name: "Tenghao Wang",
      role: "MSc Student · Class of 2026",
      institution: "University of Science and Technology of China",
      image: "assets/avatars/tenghao-wang.jpg"
    },
    {
      group: "member",
      name: "Yonggan Bu",
      role: "Undergraduate · Class of 2024",
      institution: "University of Science and Technology of China",
      image: "assets/avatars/yonggan-bu.png"
    },
    {
      group: "member",
      name: "Bin Ma",
      role: "Undergraduate · Class of 2024",
      institution: "University of Science and Technology of China",
      image: "assets/avatars/bin-ma.png"
    },
    {
      group: "member",
      name: "Yijia Qiu",
      role: "Undergraduate · Class of 2024",
      institution: "University of Science and Technology of China",
      image: "assets/avatars/yijia-qiu.png"
    },
    {
      group: "member",
      name: "Junyu Li",
      role: "Undergraduate · Class of 2024",
      institution: "University of Science and Technology of China",
      image: "assets/avatars/junyu-li.jpg"
    },
    {
      group: "member",
      name: "Yunhan Wang",
      role: "Undergraduate · Class of 2025",
      institution: "University of Science and Technology of China",
      image: "assets/avatars/yunhan-wang.jpg"
    },
    {
      group: "collaborator",
      name: "Yiming Luo",
      role: "Eight-Year MD-PhD Program · Class of 2021",
      institution: "Peking University Cancer Hospital",
      image: "assets/avatars/yiming-luo.png"
    },
    {
      group: "collaborator",
      name: "Keyan Wang",
      role: "Direct PhD Student · Class of 2026",
      institution: "Peking University Cancer Hospital",
      image: "assets/avatars/keyan-wang.png"
    },
    {
      group: "collaborator",
      name: "Shengyuan Zhou",
      role: "Undergraduate · Class of 2022",
      institution: "Peking University Cancer Hospital",
      image: "assets/avatars/shengyuan-zhou.png"
    },
    {
      group: "collaborator",
      name: "Pengfei Guan",
      role: "Undergraduate · Class of 2024",
      institution: "Peking University Cancer Hospital",
      image: "assets/avatars/pengfei-guan.png"
    }
  ];

  function card(person) {
    return `<article class="person-bubble person-${person.group}"><span class="portrait"><img src="${person.image}" alt="${person.name}" loading="lazy" decoding="async"></span><div class="person-bubble-body"><h4>${person.name}</h4><p class="person-meta">${person.role}</p><p class="person-institution">${person.institution}</p></div></article>`;
  }

  ["leadership", "member", "collaborator"].forEach((group) => {
    const root = stage.querySelector(`[data-team-group="${group}"]`);
    if (root) root.innerHTML = people.filter((person) => person.group === group).map(card).join("");
  });
}());
