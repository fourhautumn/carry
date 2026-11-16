import { projects } from './data-projects.js';
import { articles } from './data-articles.js';
import { caseStories } from './data-case-stories.js';
import { heraView, mountHeraView } from './hera-view.js';

const esc = (value) => String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const projectUrl = (project) => `project.html?slug=${encodeURIComponent(project.slug)}`;

const detail = document.querySelector('#project-detail');
if (detail) {
  const params = new URLSearchParams(location.search);
  const project = projects.find((item) => item.slug === params.get('slug'));
  if (!project) {
    document.title = '项目未找到 — CARRY/On';
    detail.innerHTML = '<main class="case-missing"><h1>项目未找到</h1><a href="work.html">返回 WORK ↗</a></main>';
  } else if (project.slug === 'content') {
    const article = articles.find((item) => item.slug === params.get('article'));
    if (article) renderArticle(project, article);
    else renderWritingIndex(project);
  } else {
    renderCase(project);
  }
}

function objectArt(slug) {
  if (slug === 'tuide') return '<img class="tuide-hero-image" src="a-tuide--source--tuide-material-hero.png" alt="原提案的线条与材质视觉实验">';
  if (slug === 'hera') return '';
  const asset = { uae: 'pixel-tower.svg' }[slug];
  return `<img class="pixel-object" src="a-${asset}" alt="" aria-hidden="true">`;
}

function renderCase(project) {
  document.title = `${project.title} — CARRY/On`;
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  const story = caseStories[project.slug];
  const body = project.slug === 'uae' ? renderUaeCase(story) : project.slug === 'hera' ? renderHeraCase(story) : renderTuideCase(story);
  detail.innerHTML = `
    <article class="case-page case-${project.slug}">
      <header class="case-hero">
        <div class="case-hero-copy"><a class="case-back" href="work.html">← 回到包里</a><p class="case-kind">${esc(project.kind)}</p><h1>${project.slug === 'tuide' ? 'TUIDE <small>品牌策划研究</small>' : esc(project.title)}</h1>${project.slug === 'tuide' ? '' : `<p class="case-theme">${esc(project.theme)}</p>`}</div>
        <div class="case-art" role="presentation">${objectArt(project.slug)}</div>
        ${project.slug === 'uae' ? '<aside class="uae-hero-notes"><p><span>现场工作</span>客户沟通、需求整理、供应商协调</p><p><span>可确认阶段</span>样品寄送 / 下单</p></aside>' : ''}
      </header>
      <div class="case-content">
        ${project.slug === 'hera' ? heraView() : ''}
        ${project.slug === 'tuide' ? tuideReferenceBoard() : ''}
        ${body}
        ${project.slug === 'tuide' ? '<a class="case-source" href="tuide-original.html" target="_blank" rel="noopener noreferrer">阅读原十页提案 <span>↗</span></a>' : ''}
        ${project.external && project.slug !== 'tuide' ? `<a class="case-source" href="${esc(project.external.url)}" target="_blank" rel="noopener noreferrer">${esc(project.external.label)} <span>↗</span></a>` : ''}
      </div>
      <nav class="case-bottom-nav" aria-label="作品导航"><a href="work.html">← 全部作品</a><a href="${projectUrl(next)}">下一个：${esc(next.title)} ↗</a></nav>
    </article>`;
  if (project.slug === 'hera') mountHeraView();
  if (project.slug === 'tuide') mountTuideReferences();
}

function renderUaeCase(story) {
  return `<section class="exhibit uae-context" id="background"><div class="exhibit-label"><span>01 / THE SETTING</span><h2>${esc(story[0].title)}</h2></div><p>${esc(story[0].paragraphs[0])}</p></section>
    <section class="exhibit uae-frictions" id="problems"><div class="exhibit-label"><span>02 / FRICTION</span><h2>${esc(story[1].title)}</h2></div><div><div class="uae-issue-lines">${story[1].points.map((point, i) => `<p><span>${String(i + 1).padStart(2, '0')}</span>${esc(point)}</p>`).join('')}</div><p class="exhibit-note">物流与价格问题不能靠 CRM 流程解决；整理客户信息针对的是跟进与交接环节。</p></div></section>
    <section class="exhibit uae-record" id="information"><div class="exhibit-label"><span>03 / INFORMATION</span><h2>${esc(story[2].title)}</h2></div><div><p>${esc(story[2].paragraphs[0])}</p><ol class="uae-flow" aria-label="客户信息整理流程复盘示意">${story[2].flow.map((step, i) => `<li><span>${String(i + 1).padStart(2, '0')}</span><strong>${esc(step)}</strong></li>`).join('')}</ol><small>流程复盘示意，只呈现本人参与的环节。</small></div></section>
    <section class="exhibit uae-progress" id="progress"><div class="exhibit-label"><span>04 / FOLLOW-UP</span><h2>${esc(story[3].title)}</h2></div><div><p>${esc(story[3].paragraphs[0])}</p><div class="uae-confirmed"><span>可确认的业务推进阶段</span><strong>样品寄送</strong><strong>下单</strong></div></div></section>
    <section class="exhibit uae-reflection" id="reflection"><div class="exhibit-label"><span>05 / REVIEW</span><h2>${esc(story[4].title)}</h2></div><p>${esc(story[4].paragraphs[0])}</p></section>`;
}

function renderHeraCase(story) {
  return `<section class="exhibit hera-context" id="background"><div class="exhibit-label"><span>01 / QUESTION</span><h2>${esc(story[0].title)}</h2></div><p>${esc(story[0].paragraphs[0])}</p></section>
    <section class="exhibit hera-evidence" id="comparison"><div class="exhibit-label"><span>02 / EVIDENCE</span><h2>${esc(story[1].title)}</h2></div><div>${story[1].paragraphs.map((paragraph) => `<p>${esc(paragraph)}</p>`).join('')}</div></section>
    <section class="exhibit hera-alternatives" id="competitors"><div class="exhibit-label"><span>03 / POSITION</span><h2>${esc(story[2].title)}</h2></div><p>${esc(story[2].paragraphs[0])}</p></section>
    <section class="exhibit hera-experiment" id="validation"><div class="exhibit-label"><span>04 / NEXT TEST</span><h2>${esc(story[3].title)}</h2></div><div><p>${esc(story[3].paragraphs[0])}</p><div class="hera-plan" aria-label="尚未执行的首轮验证计划"><span>本地化落地页</span><span>90 秒演示</span><span>访谈报名</span><span>与菲律宾对照</span></div><small>计划尚未执行；没有访谈发现、转化率或收入数据。</small></div></section>
    <section class="exhibit hera-role" id="my-work"><div class="exhibit-label"><span>05 / ROLE</span><h2>${esc(story[4].title)}</h2></div><p>${esc(story[4].paragraphs[0])}</p></section>`;
}

function renderTuideCase(story) {
  return `<section class="exhibit tuide-origin" id="origin"><div class="exhibit-label"><span>01 / START</span><h2>${esc(story[0].title)}</h2></div><div><p>${esc(story[0].paragraphs[0])}</p><img src="a-tuide--source--tuide-banner-group.jpg" alt="TUIDE 团体影像，作为原始设定参考" loading="lazy"><small>原始设定 / 团体影像</small></div></section>
    <section class="exhibit tuide-setting" id="setting"><div class="exhibit-label"><span>02 / SOURCE WORLD</span><h2>${esc(story[1].title)}</h2></div><div><p>${esc(story[1].paragraphs[0])}</p><div class="tuide-words" aria-label="原始设定中的三个线索"><span>WE TUIDE</span><span>WE TUNE</span><span>WE PLAY</span></div></div></section>
    <section class="exhibit tuide-idea" id="idea"><div class="exhibit-label"><span>03 / IDEA</span><h2>${esc(story[2].title)}</h2></div><div><strong>Tuned<br>Together.</strong><p>${esc(story[2].paragraphs[0])}</p></div></section>
    <section class="exhibit tuide-material" id="material"><div class="exhibit-label"><span>04 / MATERIAL</span><h2>${esc(story[3].title)}</h2></div><div><img src="a-tuide--source--tuide-material-hero.png" alt="原提案中用不同材质线迹形成的 TUIDE 视觉实验" loading="lazy"><p>${esc(story[3].paragraphs[0])}</p><small>原提案视觉实验 / 个人方案</small></div></section>
    <section class="exhibit tuide-choice" id="experiments"><div class="exhibit-label"><span>05 / EDIT</span><h2>${esc(story[4].title)}</h2></div><div><p>${esc(story[4].paragraphs[0])}</p><div class="tuide-choice-line"><span>保留</span><strong>不完全一致的线迹</strong><span>放弃</span><strong>过于规整的字标</strong></div></div></section>
    <section class="exhibit tuide-application" id="applications"><div class="exhibit-label"><span>06 / APPLICATION</span><h2>${esc(story[5].title)}</h2></div><div><p>${esc(story[5].paragraphs[0])}</p><div class="tuide-application-path" aria-label="提案中的内容应用顺序"><span>集体海报</span><span>动态与社交预告</span><span>成员内容</span></div></div></section>
    <section class="exhibit tuide-ending" id="direction"><div class="exhibit-label"><span>07 / DIRECTION</span><h2>${esc(story[6].title)}</h2></div><p>${esc(story[6].paragraphs[0])}</p></section>`;
}

function articleUrl(article) { return `project.html?slug=content&article=${encodeURIComponent(article.slug)}`; }
function articleImage(article) { return article.html.match(/<img[^>]*src="([^"]+)"/)?.[1] ?? ''; }

function renderWritingIndex(project) {
  document.title = `${project.title} — CARRY/On`;
  const links = articles.map((article, i) => `<li><button type="button" data-article="${esc(article.slug)}" aria-current="${i === 0 ? 'true' : 'false'}" aria-controls="writing-preview"><span>${String(i + 1).padStart(2, '0')}</span><strong>${esc(article.title)}</strong><b aria-hidden="true">＋</b></button></li>`).join('');
  detail.innerHTML = `<div class="notebook-page writing-index-page"><div class="notebook-top"><a href="work.html">← 回到包里</a><span>WRITING / 10 ARTICLES</span></div>
    <section class="notebook-project-overview"><p class="case-kind">真实工作项目 / SEO 英文内容创作</p><h1>英文内容运营</h1><div class="writing-overview-grid"><div><h2><span>01</span>工作内容</h2><p>研究英文科技话题，使用 AI 辅助写作与修改，核验产品事实，并参与图文审校与发布。</p></div><div><h2><span>02</span>工作流程</h2><p>资料研究、文章结构调整、事实核验、图文制作与审校，各环节都需要核对原始资料。</p></div><div><h2><span>03</span>文章作品</h2><p>十篇已发表的英文文章，收录于 Google 和 Medium Publication。点击标题查看配图和全文。</p></div></div></section>
    <div class="notebook-layout"><nav class="notebook-index" aria-label="文章目录"><div class="notebook-index-inner"><p class="notebook-label">CONTENTS / 01—10</p><p class="notebook-title">内容创作</p><ol>${links}</ol></div></nav><aside class="writing-index-preview" id="writing-preview" aria-live="polite"></aside></div>
    <nav class="notebook-bottom"><a href="work.html">← WORK</a><a href="project.html?slug=hera">HERA ↗</a></nav></div>`;
  const preview = detail.querySelector('#writing-preview');
  const buttons = [...detail.querySelectorAll('[data-article]')];
  const layout = detail.querySelector('.notebook-layout');
  const placePreview = (button) => {
    if (matchMedia('(max-width:767px)').matches) button.parentElement.append(preview);
    else layout.append(preview);
  };
  const show = (button) => {
    const article = articles.find((item) => item.slug === button.dataset.article);
    buttons.forEach((item) => item.setAttribute('aria-current', item === button ? 'true' : 'false'));
    preview.innerHTML = `<span class="preview-meta">ARTICLE ${String(articles.indexOf(article) + 1).padStart(2, '0')} / 10</span><img src="${esc(articleImage(article))}" alt="${esc(article.title)} 的文章配图" loading="lazy"><div><h2>${esc(article.title)}</h2><a href="${articleUrl(article)}">阅读全文 ↗</a></div>`;
    placePreview(button);
  };
  buttons.forEach((button) => { button.addEventListener('pointerenter', (event) => { if (event.pointerType !== 'touch' && matchMedia('(min-width:768px) and (hover:hover)').matches) show(button); }); button.addEventListener('focus', () => show(button)); button.addEventListener('click', () => show(button)); });
  show(buttons[0]);
  addEventListener('resize', () => placePreview(buttons.find((button) => button.getAttribute('aria-current') === 'true')));
}

function renderArticle(project, chosen) {
  document.title = `${chosen.title} — CARRY/On`;
  const toc = chosen.toc.map((entry) => `<li class="toc-level-${entry.level}"><a href="#${entry.id}">${esc(entry.title)}</a></li>`).join('');
  detail.innerHTML = `
    <div class="notebook-page article-reading-page">
      <div class="notebook-top"><a href="project.html?slug=content">← 文章目录</a><span>WRITING / ARTICLE ${String(articles.indexOf(chosen) + 1).padStart(2, '0')}</span></div>
      <div class="notebook-layout">
        <article class="notebook-sheet" id="article"><div class="sheet-top"><span>ARTICLE ${String(articles.indexOf(chosen) + 1).padStart(2, '0')} / 10</span><span>DARIA YU</span></div><h1>${esc(chosen.title)}</h1><details class="article-toc"><summary>本文目录 <span>↗</span></summary><ol>${toc}</ol></details><div class="article-copy">${chosen.html}</div><div class="sheet-end"><span>END OF ARTICLE</span><a href="#article">回到文章开头 ↑</a></div></article>
      </div>
      <nav class="notebook-bottom" aria-label="作品导航"><a href="project.html?slug=content">← 文章目录</a><a href="work.html">WORK ↗</a></nav>
    </div>`;
}

function tuideReferences() { return [
  ['ref-body-sequence.jpg', '动作的连续性', '动作切片提示：七个人可以有不同步的节奏，也能在同一画面中产生联系。'],
  ['ref-fragmented-identity.jpg', '碎片与身份', '破碎构图让“共同”保留个人边界，避免把成员做成同一种符号。'],
  ['ref-material-alphabet.jpg', '材质字母', '材料差异能直接进入字形，而不只附着在颜色上。'],
  ['ref-line-and-body.jpg', '线与身体', '线的路径可以追随动作，连接成员与空间。'],
  ['ref-fibre-lettering.jpg', '纤维文字', '纤维边缘的偶然性带来手作感，适合社团设定。'],
  ['ref-collective-rhythm.jpg', '集体节奏', '不同位置和姿态形成团体节奏，同时保留每个人的状态。']
]; }

function tuideReferenceBoard() {
  const first = tuideReferences()[0];
  return `<div class="tuide-reference-intro"><p class="case-kind">VISUAL REFERENCES</p><h2>视觉参考</h2><div class="tuide-reference-board">${tuideReferences().map(([file, title], i) => `<button class="tuide-ref" type="button" draggable="false" data-ref="${i}" aria-label="查看${esc(title)}的设计观察"><img src="a-tuide--source--${file}" alt="${esc(title)}视觉参考" loading="lazy" draggable="false"><span>${String(i + 1).padStart(2, '0')} / ${esc(title)}</span></button>`).join('')}</div><p class="tuide-observation" id="tuide-observation" aria-live="polite"><strong>${esc(first[1])} / </strong>${esc(first[2])}</p></div>`;
}

function mountTuideReferences() {
  const observation = detail.querySelector('#tuide-observation');
  const canDrag = matchMedia('(min-width:768px) and (prefers-reduced-motion:no-preference)').matches;
  detail.querySelectorAll('.tuide-ref').forEach((button) => {
    let state = null, suppressClick = false;
    button.addEventListener('click', (event) => {
      if (suppressClick) { event.preventDefault(); suppressClick = false; return; }
      const ref = tuideReferences()[Number(button.dataset.ref)];
      observation.innerHTML = `<strong>${esc(ref[1])} / </strong>${esc(ref[2])}`;
    });
    if (!canDrag) return;
    button.addEventListener('pointerdown', (event) => {
      if (event.pointerType === 'touch') return;
      const x = Number(button.dataset.x || 0), y = Number(button.dataset.y || 0);
      state = { startX:event.clientX, startY:event.clientY, x, y, lastX:event.clientX, lastY:event.clientY, vx:0, vy:0, moved:false };
      button.setPointerCapture(event.pointerId);
    });
    button.addEventListener('pointermove', (event) => {
      if (!state) return;
      const dx=event.clientX-state.startX, dy=event.clientY-state.startY;
      state.vx=event.clientX-state.lastX; state.vy=event.clientY-state.lastY;
      state.lastX=event.clientX; state.lastY=event.clientY;
      if (Math.hypot(dx,dy)>5) state.moved=true;
      button.style.setProperty('--dx',`${state.x+dx}px`); button.style.setProperty('--dy',`${state.y+dy}px`);
    });
    button.addEventListener('pointerup', (event) => {
      if (!state) return;
      const dx=event.clientX-state.startX, dy=event.clientY-state.startY;
      const x=state.x+dx+(state.moved?state.vx*2:0), y=state.y+dy+(state.moved?state.vy*2:0);
      if (state.moved) { suppressClick=true; button.style.transition='transform .2s ease-out'; setTimeout(()=>{button.style.transition='';},220); }
      button.dataset.x=x; button.dataset.y=y;
      button.style.setProperty('--dx',`${x}px`); button.style.setProperty('--dy',`${y}px`);
      state=null;
    });
  });
}
