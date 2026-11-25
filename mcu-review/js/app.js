/**
 * 单片机项目复盘 · 渲染层
 * 纯原生 JS，零依赖。数据来自 data.js。
 */

/* ---------- 工具：根据掌握度返回颜色 ---------- */
function masteryColor(m) {
  if (m >= 80) return "var(--accent-3)";
  if (m >= 60) return "var(--accent)";
  if (m >= 40) return "var(--warn)";
  return "var(--danger)";
}

/* ---------- 渲染统计 ---------- */
function renderStats() {
  const el = document.getElementById("stats");
  if (!el) return;
  el.innerHTML = stats
    .map(
      (s) => `
    <div class="stat">
      <div class="num">${s.value}<span class="suffix">${s.suffix}</span></div>
      <div class="lbl">${s.label}</div>
    </div>`
    )
    .join("");
}

/* ---------- 渲染项目卡片 ---------- */
function statusBadge(status) {
  const map = { 已完成: "status-done", 进行中: "status-doing", 规划中: "status-plan" };
  return `<span class="badge ${map[status] || ""}">${status}</span>`;
}
function levelBadge(level) {
  return `<span class="badge lv-${level}">${level}</span>`;
}

function renderProjects() {
  const el = document.getElementById("projects-grid");
  if (!el) return;
  el.innerHTML = projects
    .map(
      (p) => `
    <article class="card">
      <div class="card-top">
        <h3>${p.name}</h3>
        <span class="date">${p.date}</span>
      </div>
      <div class="tags-row">
        ${statusBadge(p.status)}
        ${levelBadge(p.level)}
      </div>
      <p class="summary">${p.summary}</p>
      <h4>// 关键收获</h4>
      <ul class="highlights">
        ${p.highlights.map((h) => `<li>${h}</li>`).join("")}
      </ul>
      <div class="stack">
        ${p.stack.map((t) => `<span>${t}</span>`).join("")}
      </div>
    </article>`
    )
    .join("");
}

/* ---------- 渲染技能树 ---------- */
function renderSkillTree() {
  const el = document.getElementById("skill-tree");
  if (!el) return;
  el.innerHTML = skillTree
    .map(
      (branch, i) => `
    <div class="skill-branch ${i === 0 ? "open" : ""}" data-idx="${i}">
      <div class="branch-head">
        <div class="icon">${branchIcon(branch.name)}</div>
        <div class="b-name">${branch.name}</div>
        <div class="b-mastery">${branch.mastery}%</div>
        <div class="chevron">▶</div>
      </div>
      <div class="branch-bar"><span style="width:${branch.mastery}%"></span></div>
      <div class="branch-body">
        ${branch.children
          .map(
            (leaf) => `
          <div class="skill-leaf">
            <div class="l-name">${leaf.name}</div>
            <div class="l-bar"><span style="width:${leaf.mastery}%"></span></div>
            <div class="l-mastery">${leaf.mastery}%</div>
            <div class="l-tags">
              ${(leaf.tags || []).map((t) => `<span>${t}</span>`).join("")}
            </div>
          </div>`
          )
          .join("")}
      </div>
    </div>`
    )
    .join("");

  // 折叠交互
  el.querySelectorAll(".skill-branch .branch-head").forEach((head) => {
    head.addEventListener("click", () => {
      head.parentElement.classList.toggle("open");
    });
  });
}

function branchIcon(name) {
  const map = {
    硬件设计: "🔌",
    嵌入式软件: "⚙️",
    通信协议: "📡",
    操作系统: "🗂️",
    调试与工具: "🔧",
    工程素养: "📐",
  };
  return map[name] || "▣";
}

/* ---------- 渲染时间线 ---------- */
function renderTimeline() {
  const el = document.getElementById("timeline");
  if (!el) return;
  el.innerHTML = timeline
    .map(
      (t) => `
    <div class="tl-item">
      <div class="tl-date">${t.date}</div>
      <h4>${t.title}</h4>
      <p>${t.text}</p>
      <span class="tl-tag">${t.tag}</span>
    </div>`
    )
    .join("");
}

/* ---------- 渲染路线图 ---------- */
function renderRoadmap() {
  const el = document.getElementById("roadmap-grid");
  if (!el) return;
  el.innerHTML = roadmap
    .map(
      (r) => `
    <div class="rm-card">
      <div class="phase">${r.phase}</div>
      <h4>${r.title}</h4>
      <p>${r.desc}</p>
    </div>`
    )
    .join("");
}

/* ---------- 滚动入场动画（轻量） ---------- */
function setupReveal() {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.style.opacity = 1;
          e.target.style.transform = "translateY(0)";
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.08 }
  );
  document
    .querySelectorAll(".card, .skill-branch, .stat, .tl-item, .rm-card")
    .forEach((el) => {
      el.style.opacity = 0;
      el.style.transform = "translateY(22px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      io.observe(el);
    });
}

/* ---------- 启动 ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderStats();
  renderProjects();
  renderSkillTree();
  renderTimeline();
  renderRoadmap();
  setupReveal();

  // 年份
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
});
