import { getData, t } from './i18n.js';

/**
 * 渲染所有动态内容区域
 */
export function renderAll() {
  const data = getData();
  if (!data) return;
  renderAbout();
  renderProjects();
  renderResearch();
  renderAwards();
  renderSkills();
  renderExperience();
  renderContact();
}

/** 更新所有带 data-i18n 属性的静态文本 */
export function updateStaticText() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key) {
      el.textContent = t(key);
    }
  });
  // 更新 HTML lang 属性
  const data = getData();
  if (data) {
    document.documentElement.lang = data.lang;
  }
}

function renderAbout() {
  const section = getData()?.about;
  const container = document.getElementById('aboutContent');
  if (!section || !container) return;
  container.innerHTML = section.paragraphs.map(p => `<p>${escapeHtml(p)}</p>`).join('');
}

function renderProjects() {
  const section = getData()?.projects;
  const grid = document.getElementById('projectsGrid');
  if (!section || !grid) return;
  grid.innerHTML = section.items.map(item => `
    <div class="project-card">
      <h3 class="project-card__title">${escapeHtml(item.title)}</h3>
      <p class="project-card__desc">${escapeHtml(item.description)}</p>
      <div class="project-card__techs">
        ${item.techs.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('')}
      </div>
      ${item.link ? `<a class="project-card__link" href="${escapeHtml(item.link)}" target="_blank" rel="noopener">GitHub →</a>` : ''}
    </div>
  `).join('');
}

function renderResearch() {
  const section = getData()?.research;
  const list = document.getElementById('researchList');
  if (!section || !list) return;
  list.innerHTML = section.items.map(item => `
    <div class="research__item">
      <h3>${escapeHtml(item.title)}</h3>
      <p class="research__venue">${escapeHtml(item.venue)}</p>
      <p class="research__abstract">${escapeHtml(item.abstract)}</p>
      ${item.link ? `<a href="${escapeHtml(item.link)}" target="_blank" rel="noopener">View Paper →</a>` : ''}
    </div>
  `).join('');
}

function renderAwards() {
  const section = getData()?.awards;
  const container = document.getElementById('awardsTimeline');
  if (!section || !container) return;
  container.innerHTML = section.items.map(item => `
    <div class="timeline__item">
      <p class="timeline__date">${escapeHtml(item.date)}</p>
      <p class="timeline__title">${escapeHtml(item.name)} — <strong>${escapeHtml(item.level)}</strong></p>
      <p class="timeline__desc">${escapeHtml(item.description)}</p>
    </div>
  `).join('');
}

function renderSkills() {
  const section = getData()?.skills;
  const grid = document.getElementById('skillsGrid');
  if (!section || !grid) return;
  grid.innerHTML = section.categories.map(cat => `
    <div class="skills__category">
      <h3>${escapeHtml(cat.name)}</h3>
      <div class="skills__tags">
        ${cat.items.map(s => `<span class="tag">${escapeHtml(s)}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

function renderExperience() {
  const section = getData()?.experience;
  const container = document.getElementById('experienceTimeline');
  if (!section || !container) return;
  container.innerHTML = section.items.map(item => `
    <div class="timeline__item">
      <p class="timeline__date">${escapeHtml(item.date)}</p>
      <p class="timeline__title">${escapeHtml(item.title)}</p>
      <p class="timeline__desc">${escapeHtml(item.description)}</p>
    </div>
  `).join('');
}

function renderContact() {
  const section = getData()?.contact;
  const container = document.getElementById('contactList');
  if (!section || !container) return;
  container.innerHTML = section.items.map(item => `
    <div class="contact__item">
      <span class="contact__label">${escapeHtml(item.label)}</span>
      <a href="${escapeHtml(item.link)}">${escapeHtml(item.value)}</a>
    </div>
  `).join('');
}

/** 基本的 HTML 转义，防 XSS */
function escapeHtml(str) {
  if (str == null) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
