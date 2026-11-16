const previews = {
  uae: { title: '阿联酋市场拓展与客户跟进', kind: '真实工作项目', summary: '参与客户沟通与业务跟进，将销售需求表单接入统一的跟进表格。', output: '产出：标准化表单与信息同步流程' },
  hera: { title: 'HERA 东南亚市场进入研究', kind: '独立市场研究', summary: '比较六个市场的公开指标，建立可调权重模型，并设计首轮 GTM 验证。', output: '产出：市场比较模型与验证计划' },
  tuide: { title: 'TUIDE 品牌策划研究', kind: '个人兴趣 · 非官方提案', summary: '围绕七位成员的共同品牌认知，提出概念、视觉规则与传播应用。', output: '产出：十页品牌概念提案' },
  content: { title: '英文内容运营', kind: '真实工作项目', summary: '参与英文科技内容的研究、写作辅助、事实核验、图文审校与发布。', output: '产出：十篇可完整阅读的文章样本' }
};
const panel = document.querySelector('#work-preview');
const links = [...document.querySelectorAll('.hotspot')];
let selected = null;
function show(link) {
  const item = previews[link.dataset.project];
  selected = link.dataset.project;
  links.forEach(other => other.classList.toggle('is-selected', other === link));
  panel.innerHTML = `<p class="work-preview-kind">${item.kind}</p><h2>${item.title}</h2><p>${item.summary}</p><p class="work-preview-output">${item.output}</p><a href="${link.getAttribute('href')}">进入项目 ↗</a>`;
  panel.classList.add('is-visible');
}
links.forEach(link => {
  link.addEventListener('pointerenter', event => { if (event.pointerType !== 'touch') show(link); });
  link.addEventListener('focus', () => show(link));
});
show(links[0]);
