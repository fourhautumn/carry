import { heraResearch } from './data-hera-research.js';

const names = { demand: '需求', commercial: '商业承载', accessibility: '可进入性', digital: '数字化' };
const marketNames = { ID: '印尼', VN: '越南', PH: '菲律宾', TH: '泰国', MY: '马来西亚', SG: '新加坡' };
const normalize = (value, values) => {
  const min = Math.min(...values), max = Math.max(...values);
  return min === max ? 50 : (value - min) / (max - min) * 100;
};
const logNormalize = (value, values) => normalize(Math.log(value), values.map(Math.log));

// Identical to the scoring logic in the existing HERA build. The four weights
// are explicit percentages; scores are comparative proxies, not market outcomes.
export function rankMarkets(weights) {
  const markets = heraResearch.markets;
  const creators = markets.map(m => m.channels100k);
  const gmv = markets.map(m => m.digitalGmv);
  const gdp = markets.map(m => m.gdp);
  const english = markets.filter(m => m.english !== null).map(m => m.english);
  return markets.map(m => {
    const dimensions = {
      demand: .7 * logNormalize(m.channels100k, creators) + .3 * normalize(m.digitalGmv, gmv),
      commercial: logNormalize(m.gdp, gdp),
      accessibility: m.code === 'SG' ? 100 : normalize(m.english, english),
      digital: normalize(m.digitalGmv, gmv)
    };
    const total = Object.entries(dimensions).reduce((sum, [key, score]) => sum + score * weights[key] / 100, 0);
    return { ...m, dimensions, total };
  }).sort((a, b) => b.total - a.total);
}

export function heraView() {
  const source = heraResearch.sources;
  return `<section class="hera-lab" aria-labelledby="hera-lab-title">
    <div class="hera-lab-heading"><span>HERA / RESEARCH MODEL</span><h2 id="hera-lab-title">六个市场，四种观察角度。</h2><p>下方复现原研究的公开指标与计算方式。拖动权重，观察排序如何变化；总权重无需固定为 100，计算沿用原站的百分比公式。</p></div>
    <div class="hera-controls" id="hera-controls">${Object.entries(heraResearch.defaultWeights).map(([key, value]) => `<label><span>${names[key]} <output for="weight-${key}" id="output-${key}">${value}%</output></span><input id="weight-${key}" type="range" min="0" max="100" step="5" value="${value}" data-weight="${key}"></label>`).join('')}</div>
    <p class="hera-weight-total" id="hera-weight-total"></p>
    <div class="hera-rank" id="hera-rank" aria-live="polite"></div>
    <details class="hera-data"><summary>查看原始指标与数据来源 ↗</summary><div class="hera-table-scroll"><table><caption>旧站六市场比较数据；指标年份与局限见来源说明</caption><thead><tr><th scope="col">市场</th><th scope="col">10 万订阅 YouTube 频道</th><th scope="col">人均 GDP（美元）</th><th scope="col">数字经济 GMV（十亿美元）</th><th scope="col">EF EPI</th></tr></thead><tbody>${heraResearch.markets.map(m => `<tr><th scope="row">${marketNames[m.code]}</th><td>${m.channels100k.toLocaleString()}</td><td>${m.gdp.toLocaleString()}</td><td>${m.digitalGmv}</td><td>${m.english ?? '未纳入'}</td></tr>`).join('')}</tbody></table></div><ul class="hera-source-list">${['youtube','income','english','digital'].map(key => `<li><a href="${source[key].url}" target="_blank" rel="noopener noreferrer">${source[key].title} ↗</a><span>${source[key].publisher} · ${source[key].date}</span><small>${source[key].note}</small></li>`).join('')}</ul></details>
    <p class="hera-method">原站方法：需求 = 70% 创作者规模 + 30% 数字经济 GMV；商业承载 = 人均 GDP；可进入性 = EF EPI（新加坡因 2025 年未收录，原站设为 100）；数字化 = GMV。偏斜指标先取对数，再做 min-max 归一化。总分为各维度分数 × 对应权重之和。指标是公开代理值，不等于 HERA 的实际潜在客户。</p>
    <p class="hera-model-note"><strong>模型使用提示：</strong>GMV 同时进入「需求」与「数字化」，在默认权重下合计占总分的 25.5%，存在重复计入；此页保留原始公式和排名供复核。新加坡的 EF EPI 2025 缺失，模型里的 100 是人为设定的替代值，不是测量结果。调整权重是情景比较，不是已经验证的市场效果。</p>
    <div class="hera-competitors"><h3>替代方案</h3><ul>${heraResearch.competitors.map(c => `<li><strong>${c.name}</strong><span>${c.job}</span><small>${c.gap}</small></li>`).join('')}</ul><p>以上对比保留原研究的产品假设。HERA 的<a href="https://hera.video/" target="_blank" rel="noopener noreferrer">当前官网 ↗</a>已将产品描述为涵盖图片、设计和动态的创意画布；价格与功能进入商业决策前需重新核对。</p></div>
  </section>`;
}

export function mountHeraView() {
  const controls = document.querySelector('#hera-controls');
  if (!controls) return;
  const update = () => {
    const weights = Object.fromEntries([...controls.querySelectorAll('input')].map(input => [input.dataset.weight, Number(input.value)]));
    for (const [key, value] of Object.entries(weights)) document.querySelector(`#output-${key}`).textContent = `${value}%`;
    const sum = Object.values(weights).reduce((a, b) => a + b, 0);
    document.querySelector('#hera-weight-total').textContent = `当前权重合计 ${sum}%${sum === 100 ? '' : '；原模型不自动重新分配其余权重'}`;
    document.querySelector('#hera-rank').innerHTML = rankMarkets(weights).map((m, index) => `<div class="hera-rank-row"><span>${String(index + 1).padStart(2, '0')}</span><strong>${marketNames[m.code]} <small>${m.name}</small></strong><div class="hera-rank-bar"><i style="width:${m.total.toFixed(2)}%"></i></div><b>${m.total.toFixed(1)}</b></div>`).join('');
  };
  controls.addEventListener('input', update);
  update();
}
