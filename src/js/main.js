import { initI18n, toggleLang, getLang, t } from './i18n.js';
import { renderAll, updateStaticText } from './render.js';

async function boot() {
  // 1. 初始化 i18n（加载数据、读取语言偏好）
  const result = await initI18n('zh');
  if (!result.ok) {
    const langBtn = document.getElementById('langToggle');
    if (langBtn) langBtn.disabled = true;
    const tagline = document.querySelector('.sidebar__tagline');
    if (tagline) {
      tagline.textContent = 'Sorry, the page content could not be loaded. Please refresh or try again later.';
      tagline.style.color = '#dc3545';
    }
    return;
  }

  // 2. 更新页面标题
  document.title = t('hero.name') + ' | ' + t('hero.major');

  // 3. 首次渲染
  renderAll();
  updateStaticText();

  // 4. 设置语言切换按钮
  const langBtn = document.getElementById('langToggle');
  if (langBtn) {
    updateLangBtnText();
    langBtn.addEventListener('click', () => {
      toggleLang();
      updateLangBtnText();
      renderAll();
      updateStaticText();
      document.title = t('hero.name') + ' | ' + t('hero.major');
    });
  }

  // 5. 平滑滚动导航（点击锚点链接）
  document.querySelectorAll('.content-nav a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        const mainContent = document.getElementById('mainContent');
        if (mainContent) {
          mainContent.scrollTo({ top: target.offsetTop - 20, behavior: 'smooth' });
        }
      }
    });
  });

  // 6. 设置版权年份
  const yearEl = document.getElementById('copyrightYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 7. 滚动高亮当前导航项
  highlightNavOnScroll();
}

function updateLangBtnText() {
  const btn = document.getElementById('langToggle');
  if (btn) {
    btn.textContent = getLang() === 'zh' ? 'EN' : '中文';
  }
}

function highlightNavOnScroll() {
  const mainContent = document.getElementById('mainContent');
  const sections = document.querySelectorAll('#mainContent section[id]');
  const navLinks = document.querySelectorAll('.content-nav a');
  let ticking = false;

  if (!mainContent) return;

  mainContent.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        let current = '';
        sections.forEach(section => {
          if (mainContent.scrollTop + 80 >= section.offsetTop) {
            current = section.getAttribute('id');
          }
        });
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
        ticking = false;
      });
      ticking = true;
    }
  });
}

// 启动
boot();
