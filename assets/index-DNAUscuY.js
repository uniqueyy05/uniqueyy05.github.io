(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))t(o);new MutationObserver(o=>{for(const c of o)if(c.type==="childList")for(const a of c.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&t(a)}).observe(document,{childList:!0,subtree:!0});function r(o){const c={};return o.integrity&&(c.integrity=o.integrity),o.referrerPolicy&&(c.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?c.credentials="include":o.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function t(o){if(o.ep)return;o.ep=!0;const c=r(o);fetch(o.href,c)}})();const u={};let l="zh";async function g(e="zh"){l=localStorage.getItem("lang")||e;try{const n=await Promise.all([fetch("data/zh.json"),fetch("data/en.json")]);for(const o of n)if(!o.ok)throw new Error(`Failed to load i18n data: ${o.url} returned ${o.status}`);const[r,t]=await Promise.all(n.map(o=>o.json()));return u.zh=r,u.en=t,{ok:!0}}catch(n){return console.error("i18n initialization failed:",n),{ok:!1,error:n}}}function h(){return l}function _(e){return e!=="zh"&&e!=="en"?(console.warn(`setLang: invalid language "${e}"`),!1):(l=e,localStorage.setItem("lang",e),document.documentElement.lang=e,!0)}function y(){const e=l==="zh"?"en":"zh";return _(e),e}function d(e){const n=e.split(".");let r=u[l];for(const t of n){if(r==null)return e;r=r[t]}return r??e}function s(){return u[l]}function m(){s()&&(E(),$(),L(),b(),j(),T(),I())}function v(){document.querySelectorAll("[data-i18n]").forEach(n=>{const r=n.getAttribute("data-i18n");r&&(n.textContent=d(r))});const e=s();e&&(document.documentElement.lang=e.lang)}function E(){var r;const e=(r=s())==null?void 0:r.about,n=document.getElementById("aboutContent");!e||!n||(n.innerHTML=e.paragraphs.map(t=>`<p>${i(t)}</p>`).join(""))}function $(){var r;const e=(r=s())==null?void 0:r.projects,n=document.getElementById("projectsGrid");!e||!n||(n.innerHTML=e.items.map(t=>`
    <div class="project-card">
      <h3 class="project-card__title">${i(t.title)}</h3>
      <p class="project-card__desc">${i(t.description)}</p>
      <div class="project-card__techs">
        ${t.techs.map(o=>`<span class="tag">${i(o)}</span>`).join("")}
      </div>
      ${t.link?`<a class="project-card__link" href="${i(t.link)}" target="_blank" rel="noopener">GitHub →</a>`:""}
    </div>
  `).join(""))}function L(){var r;const e=(r=s())==null?void 0:r.research,n=document.getElementById("researchList");!e||!n||(n.innerHTML=e.items.map(t=>`
    <div class="research__item">
      <h3>${i(t.title)}</h3>
      <p class="research__venue">${i(t.venue)}</p>
      <p class="research__abstract">${i(t.abstract)}</p>
      ${t.link?`<a href="${i(t.link)}" target="_blank" rel="noopener">View Paper →</a>`:""}
    </div>
  `).join(""))}function b(){var r;const e=(r=s())==null?void 0:r.awards,n=document.getElementById("awardsTimeline");!e||!n||(n.innerHTML=e.items.map(t=>`
    <div class="timeline__item">
      <p class="timeline__date">${i(t.date)}</p>
      <p class="timeline__title">${i(t.name)} — <strong>${i(t.level)}</strong></p>
      <p class="timeline__desc">${i(t.description)}</p>
    </div>
  `).join(""))}function j(){var r;const e=(r=s())==null?void 0:r.skills,n=document.getElementById("skillsGrid");!e||!n||(n.innerHTML=e.categories.map(t=>`
    <div class="skills__category">
      <h3>${i(t.name)}</h3>
      <div class="skills__tags">
        ${t.items.map(o=>`<span class="tag">${i(o)}</span>`).join("")}
      </div>
    </div>
  `).join(""))}function T(){var r;const e=(r=s())==null?void 0:r.experience,n=document.getElementById("experienceTimeline");!e||!n||(n.innerHTML=e.items.map(t=>`
    <div class="timeline__item">
      <p class="timeline__date">${i(t.date)}</p>
      <p class="timeline__title">${i(t.title)}</p>
      <p class="timeline__desc">${i(t.description)}</p>
    </div>
  `).join(""))}function I(){var r;const e=(r=s())==null?void 0:r.contact,n=document.getElementById("contactList");!e||!n||(n.innerHTML=e.items.map(t=>`
    <div class="contact__item">
      <span class="contact__label">${i(t.label)}</span>
      <a href="${i(t.link)}">${i(t.value)}</a>
    </div>
  `).join(""))}function i(e){if(e==null)return"";const n=document.createElement("div");return n.textContent=e,n.innerHTML}async function k(){if(!(await g("zh")).ok){const t=document.getElementById("langToggle");t&&(t.disabled=!0);const o=document.querySelector(".sidebar__tagline");o&&(o.textContent="Sorry, the page content could not be loaded. Please refresh or try again later.",o.style.color="#dc3545");return}document.title=d("hero.name")+" | "+d("hero.major"),m();const n=document.getElementById("langToggle");n&&(p(),n.addEventListener("click",()=>{y(),p(),m(),v(),document.title=d("hero.name")+" | "+d("hero.major")})),document.querySelectorAll(".content-nav a").forEach(t=>{t.addEventListener("click",o=>{o.preventDefault();const c=t.getAttribute("href").slice(1),a=document.getElementById(c);if(a){const f=document.getElementById("mainContent");f&&f.scrollTo({top:a.offsetTop-20,behavior:"smooth"})}})});const r=document.getElementById("copyrightYear");r&&(r.textContent=new Date().getFullYear()),B()}function p(){const e=document.getElementById("langToggle");e&&(e.textContent=h()==="zh"?"EN":"中文")}function B(){const e=document.getElementById("mainContent"),n=document.querySelectorAll("#mainContent section[id]"),r=document.querySelectorAll(".content-nav a");let t=!1;e&&e.addEventListener("scroll",()=>{t||(requestAnimationFrame(()=>{let o="";n.forEach(c=>{e.scrollTop+80>=c.offsetTop&&(o=c.getAttribute("id"))}),r.forEach(c=>{c.classList.toggle("active",c.getAttribute("href")===`#${o}`)}),t=!1}),t=!0)})}k();
