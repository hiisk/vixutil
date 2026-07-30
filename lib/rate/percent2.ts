/**
 * 비율 섹션 - 비율·증감 둘째 묶음 (10종)
 *
 * 첫 묶음이 "몇 %인가"를 다뤘으니 여기는 한 겹 더 들어간 것들 — 비율의 비율,
 * 두 번 연속 변한 것의 합계, 백분위, 반비례처럼 한 번에 안 풀리는 것들이다.
 */
import type { FormulaTool } from '../formula/types.ts';
import { ratio } from '../formula/types.ts';
import { round } from '../formula/num.ts';

export const PERCENT2_TOOLS: FormulaTool[] = [
  {
    slug: 'percent-of-percent',
    icon: '🎯',
    category: '비율·증감',
    fields: [
      { key: 'whole', term: 'whole', unit: 'none', def: 5000, min: 0 },
      { key: 'outer', term: 'outerPct', unit: 'percent', def: 40, min: 0, max: 100 },
      { key: 'inner', term: 'innerPct', unit: 'percent', def: 25, min: 0, max: 100 },
    ],
    formula: '{netPercent} = {outerPct} × {innerPct} ÷ 100',
    compute: v => {
      const net = (v.outer / 100) * (v.inner / 100);
      return [
        { term: 'netPercent', unit: 'percent', value: round(net * 100, 2), digits: 2, primary: true },
        { term: 'result', unit: 'none', value: round(v.whole * net, 1), digits: 1 },
        { term: 'part', unit: 'none', value: round(v.whole * (v.outer / 100), 1), digits: 1 },
      ];
    },
    ko: { title: '비율의 비율 계산기', desc: '전체의 40% 중 25%가 전체의 몇 %인지 계산합니다.',
      long: '두 비율을 곱하고 100으로 나눕니다. 전체 5,000명 중 40%가 여성이고 그중 25%가 20대라면, 20대 여성은 전체의 10%인 500명입니다. 두 비율을 더해서 65%라고 하면 완전히 다른 뜻이 됩니다.',
      note: '"그중"인지 "전체 중"인지가 핵심입니다. 설문 결과를 읽을 때 이 구분을 놓치면 규모를 몇 배로 잘못 볼 수 있습니다.' },
    en: { title: 'Percentage of a Percentage', desc: 'Work out what 25% of 40% comes to as a share of the whole.',
      long: 'Multiply the two percentages and divide by 100. If 40% of 5,000 people are women and 25% of those are in their twenties, that group is 10% of everyone — 500 people. Adding to get 65% means something else entirely.',
      note: 'The whole thing turns on “of those” versus “of everyone”. Miss it while reading a survey and you can misjudge the size by several times.' },
    zh: { title: '比例的比例计算器', desc: '算出“整体的40%中的25%”占整体的百分之几。',
      long: '把两个百分比相乘再除以100。5000人中40%为女性，其中25%是二十多岁，那么这一群体占整体的10%，即500人。若相加得65%，含义就完全不同了。',
      note: '关键在于“其中”还是“整体中”。读问卷结果时忽略这一点，规模可能被误判数倍。' },
  },
  {
    slug: 'compound-change',
    icon: '🔁',
    category: '비율·증감',
    fields: [
      { key: 'start', term: 'before', unit: 'none', def: 100, min: 0 },
      { key: 'a', term: 'changeA', unit: 'percent', def: 20, min: -100, max: 500 },
      { key: 'b', term: 'changeB', unit: 'percent', def: -20, min: -100, max: 500 },
    ],
    formula: '{totalGrowth} = ((1 + {changeA} ÷ 100) × (1 + {changeB} ÷ 100) − 1) × 100',
    compute: v => {
      const factor = (1 + v.a / 100) * (1 + v.b / 100);
      return [
        { term: 'totalGrowth', unit: 'percent', value: round((factor - 1) * 100, 2), digits: 2, primary: true },
        { term: 'after', unit: 'none', value: round(v.start * factor, 2), digits: 2 },
        { term: 'diff', unit: 'none', value: round(v.start * (factor - 1), 2), digits: 2 },
      ];
    },
    verdict: (v, out) => {
      const sum = v.a + v.b;
      const real = out[0].value;
      return {
        ko: `${v.a}% 올랐다가 ${v.b}% 변하면 합계 ${sum}%가 아니라 ${real}%입니다. 20% 올랐다가 20% 내리면 본전이 아니라 4% 손실입니다.`,
        en: `Up ${v.a}% then ${v.b}% gives ${real}%, not the ${sum}% you get by adding. Up 20% then down 20% is a 4% loss, not break-even.`,
        zh: `先变动${v.a}%再变动${v.b}%，结果是${real}%而非相加的${sum}%。涨20%再跌20%不是回本，而是亏4%。`,
        tone: 'warn',
      };
    },
    ko: { title: '연속 증감률 계산기', desc: '두 번 연달아 오르고 내렸을 때의 총 변화율을 계산합니다.',
      long: '변화율은 더하는 것이 아니라 곱하는 것입니다. 1에 각 변화율을 더한 값을 곱하고 다시 1을 빼면 총 변화율이 나옵니다. 올랐다 같은 비율로 내리면 항상 처음보다 낮아집니다.',
      note: '내릴 때의 기준이 커진 금액이라 손실이 더 큽니다. 그래서 주가가 반으로 떨어지면 원래대로 오려면 50%가 아니라 100%가 올라야 합니다.' },
    en: { title: 'Two Changes in a Row', desc: 'The total change after something rises and then falls.',
      long: 'Percentage changes multiply, they do not add. Multiply (1 + each change) and subtract one. A rise followed by an equal-sized fall always leaves you below where you started.',
      note: 'The fall works off the larger number, which is why halving a price needs a 100% rise to undo — not 50%.' },
    zh: { title: '连续增减率计算器', desc: '算出先涨后跌两次变动后的总变化率。',
      long: '变化率是相乘而不是相加。把(1 + 各变化率)相乘再减1即得总变化率。先涨后按同样比例跌，结果总是低于起点。',
      note: '下跌是以变大后的金额为基数，所以跌幅影响更大：股价腰斩后需要上涨100%才能回到原位，而不是50%。' },
  },
  {
    slug: 'percent-error',
    icon: '📏',
    category: '비율·증감',
    fields: [
      { key: 'truth', term: 'trueVal', unit: 'none', def: 250, min: 0 },
      { key: 'measured', term: 'measured', unit: 'none', def: 243, min: 0 },
    ],
    formula: '{errorPct} = |{measured} − {trueVal}| ÷ {trueVal} × 100',
    compute: v => [
      { term: 'errorPct', unit: 'percent', value: round(ratio(Math.abs(v.measured - v.truth), v.truth) * 100, 2), digits: 2, primary: true },
      { term: 'diff', unit: 'none', value: round(v.measured - v.truth, 2), digits: 2 },
      { term: 'percent', unit: 'percent', value: round(ratio(v.measured, v.truth) * 100, 2), digits: 2 },
    ],
    verdict: (_v, out) => {
      const e = out[0].value;
      return e <= 1
        ? { ko: `오차 ${e}%는 정확한 편입니다.`, en: `An error of ${e}% is tight.`, zh: `${e}%的误差属于精确范围。`, tone: 'good' }
        : e <= 5
          ? { ko: `오차 ${e}%는 대체로 받아들일 수 있는 수준입니다.`, en: `An error of ${e}% is usually acceptable.`, zh: `${e}%的误差通常可以接受。`, tone: 'warn' }
          : { ko: `오차 ${e}%는 큽니다. 측정 방법을 다시 보세요.`, en: `An error of ${e}% is large — revisit the method.`, zh: `${e}%的误差偏大，建议检查测量方法。`, tone: 'bad' };
    },
    ko: { title: '오차율 계산기', desc: '측정값이 참값에서 몇 % 벗어났는지 계산합니다.',
      long: '차이의 절댓값을 참값으로 나눕니다. 분모가 참값이라는 점이 중요합니다 — 측정값으로 나누면 같은 오차인데도 값이 달라져 실험 간 비교가 안 됩니다.',
      note: '참값이 0에 가까우면 오차율이 폭발합니다. 그런 경우에는 비율 대신 차이의 절대값을 쓰세요.' },
    en: { title: 'Percent Error', desc: 'How far a measurement strayed from the true value, as a percentage.',
      long: 'Divide the absolute difference by the true value. The denominator matters: dividing by the measurement instead makes identical errors look different and breaks comparison between runs.',
      note: 'When the true value nears zero the percentage explodes. Report the absolute difference in that case.' },
    zh: { title: '误差率计算器', desc: '算出测量值偏离真值百分之几。',
      long: '用差的绝对值除以真值。分母必须是真值：若除以测量值，同样的误差会得出不同数字，实验之间就无法比较。',
      note: '真值接近0时误差率会急剧放大，这种情况请改用差值的绝对量。' },
  },
  {
    slug: 'required-growth',
    icon: '📈',
    category: '비율·증감',
    fields: [
      { key: 'start', term: 'startVal', unit: 'none', def: 100000000, min: 1 },
      { key: 'end', term: 'endVal', unit: 'none', def: 300000000, min: 1 },
      { key: 'years', term: 'years', unit: 'year', def: 5, min: 1, max: 60 },
    ],
    formula: '{neededRate} = (({endVal} ÷ {startVal}) ^ (1 ÷ {years}) − 1) × 100',
    compute: v => {
      const r = Math.pow(ratio(v.end, v.start), 1 / v.years) - 1;
      return [
        { term: 'neededRate', unit: 'percent', value: round(r * 100, 2), digits: 2, primary: true },
        { term: 'totalGrowth', unit: 'percent', value: round((ratio(v.end, v.start) - 1) * 100, 1), digits: 1 },
        { term: 'diff', unit: 'none', value: Math.round(v.end - v.start), digits: 0 },
      ];
    },
    ko: { title: '목표까지 필요한 성장률', desc: '기간 안에 목표에 닿으려면 매년 몇 %씩 늘어야 하는지 계산합니다.',
      long: '목표를 시작값으로 나눠 몇 배가 되어야 하는지 구하고, 그 값에 기간의 역수 제곱을 씌웁니다. 3배가 5년이면 매년 24.6%씩 늘어야 합니다 — 총 200% 성장을 5로 나눈 40%가 아닙니다.',
      note: '복리라서 뒤로 갈수록 절대 증가폭이 커집니다. 초반 실적이 목표선에 못 미치는 것은 정상입니다.' },
    en: { title: 'Growth Rate Needed', desc: 'The yearly growth required to hit a target within a set time.',
      long: 'Divide the target by the start to see the multiple needed, then take the year-th root. Tripling in five years needs 24.6% a year — not the 40% you get by dividing 200% growth by five.',
      note: 'Because it compounds, the absolute gains arrive late. Falling behind the line in the early years is expected.' },
    zh: { title: '达成目标所需增长率', desc: '算出在给定期限内达到目标所需的年增长率。',
      long: '用目标除以起始值得到需要翻的倍数，再开年数次方。五年增至三倍需要每年24.6%，而不是把总增长200%除以5得到的40%。',
      note: '因为是复利，绝对增量集中在后期。前几年落后于目标线是正常现象。' },
  },
  {
    slug: 'percentile-rank',
    icon: '🏅',
    category: '비율·증감',
    fields: [
      { key: 'rank', term: 'rankNo', unit: 'none', def: 42, min: 1 },
      { key: 'total', term: 'totalPeople', unit: 'people', def: 320, min: 1 },
    ],
    formula: '{topPercent} = {rankNo} ÷ {totalPeople} × 100',
    compute: v => [
      { term: 'topPercent', unit: 'percent', value: round(ratio(v.rank, v.total) * 100, 2), digits: 2, primary: true },
      { term: 'grade', unit: 'percent', value: round((1 - ratio(v.rank, v.total)) * 100, 2), digits: 2 },
      { term: 'count', unit: 'people', value: Math.max(0, v.total - v.rank), digits: 0 },
    ],
    ko: { title: '상위 몇 % 계산기', desc: '순위와 전체 인원으로 상위 비율과 백분위를 계산합니다.',
      long: '순위를 전체 인원으로 나눕니다. 320명 중 42등은 상위 13.13%이고, 백분위로는 86.88입니다. 상위 비율은 낮을수록 좋고 백분위는 높을수록 좋아 방향이 반대입니다.',
      note: '동점자가 있으면 순위 매기는 방식(공동 순위·평균 순위)에 따라 값이 조금씩 달라집니다. 성적표의 백분위와 정확히 같지 않을 수 있습니다.' },
    en: { title: 'Top Percentage & Percentile', desc: 'Turn a rank out of a total into a top-x% and a percentile.',
      long: 'Divide the rank by the head count. Forty-second of 320 is the top 13.13%, or the 86.88th percentile. Note the directions are opposite — a low top-% is good, a high percentile is good.',
      note: 'Ties shift the answer depending on how ranks are assigned, so this may not match a report card’s percentile exactly.' },
    zh: { title: '前百分之几与百分位', desc: '用名次和总人数算出前百分之几以及百分位。',
      long: '用名次除以总人数。320人中的第42名处于前13.13%，百分位为86.88。两者方向相反：前百分之几越小越好，百分位越大越好。',
      note: '存在同分时，名次的处理方式（并列或平均）会略微改变结果，可能与成绩单上的百分位不完全一致。' },
  },
  {
    slug: 'ratio-three',
    icon: '🍰',
    category: '비율·증감',
    fields: [
      { key: 'total', term: 'total', unit: 'none', def: 600000, min: 0 },
      { key: 'a', term: 'ratioA', unit: 'none', def: 3, min: 0 },
      { key: 'b', term: 'ratioB', unit: 'none', def: 2, min: 0 },
      { key: 'c', term: 'ratioC', unit: 'none', def: 1, min: 0 },
    ],
    formula: '{shareA} = {total} × {ratioA} ÷ ({ratioA} + {ratioB} + {ratioC})',
    compute: v => {
      const sum = v.a + v.b + v.c;
      return [
        { term: 'shareA', unit: 'none', value: Math.round(ratio(v.total * v.a, sum)), digits: 0, primary: true },
        { term: 'shareB', unit: 'none', value: Math.round(ratio(v.total * v.b, sum)), digits: 0 },
        { term: 'shareC', unit: 'none', value: Math.round(ratio(v.total * v.c, sum)), digits: 0 },
      ];
    },
    ko: { title: '3:2:1 세 몫 나누기', desc: '세 사람이 정한 비율대로 금액을 나눕니다.',
      long: '비율을 모두 더해 몫의 수를 만들고, 전체를 그 수로 나눠 한 몫의 값을 구한 뒤 각자의 비율만큼 곱합니다. 3:2:1이면 여섯 몫이므로 60만 원은 30만·20만·10만이 됩니다.',
      note: '반올림 때문에 세 몫의 합이 전체와 1~2 차이 날 수 있습니다. 정산할 때는 한 사람이 나머지를 흡수하도록 정해 두세요.' },
    en: { title: 'Split Three Ways by Ratio', desc: 'Divide an amount between three people in an agreed ratio.',
      long: 'Add the ratio numbers to count the parts, divide the total by that to value one part, then multiply by each person’s number. At 3:2:1 there are six parts, so 600,000 splits into 300,000, 200,000 and 100,000.',
      note: 'Rounding can leave the three shares a unit or two off the total. Agree in advance who absorbs the remainder.' },
    zh: { title: '按3:2:1三方分配', desc: '按约定比例把金额分给三个人。',
      long: '先把比例相加得到总份数，用总额除以份数得到每份金额，再乘各自的比例数。3:2:1共6份，60万即分为30万、20万和10万。',
      note: '四舍五入可能让三份之和与总额相差一两个单位，结算前应约定由谁吸收余数。' },
  },
  {
    slug: 'per-mille',
    icon: '🔢',
    category: '비율·증감',
    fields: [
      { key: 'part', term: 'part', unit: 'none', def: 35, min: 0 },
      { key: 'whole', term: 'whole', unit: 'none', def: 8000, min: 1 },
    ],
    formula: '{permille} = {part} ÷ {whole} × 1000',
    compute: v => {
      const p = ratio(v.part, v.whole);
      return [
        { term: 'permille', unit: 'permille', value: round(p * 1000, 3), digits: 3, primary: true },
        { term: 'percent', unit: 'percent', value: round(p * 100, 4), digits: 4 },
        { term: 'ppmValue', unit: 'none', value: round(p * 1000000, 1), digits: 1 },
      ];
    },
    ko: { title: '천분율(‰)·ppm 변환기', desc: '아주 작은 비율을 퍼센트·천분율·ppm으로 함께 봅니다.',
      long: '퍼센트가 100분의 몇이라면 천분율은 1000분의 몇, ppm은 100만분의 몇입니다. 0.4375%는 4.375‰이고 4,375ppm입니다. 비율이 작을 때 퍼센트로 쓰면 소수점이 길어져 읽기 어렵습니다.',
      note: '혈중 알코올 농도, 세율, 수질 기준처럼 분야마다 관습 단위가 다릅니다. 자료를 인용할 때 단위를 함께 옮기세요.' },
    en: { title: 'Per Mille (‰) & ppm Converter', desc: 'See a small share as a percentage, per mille and parts per million at once.',
      long: 'Percent is out of 100, per mille out of 1,000, ppm out of a million. 0.4375% is 4.375‰ and 4,375 ppm. Percentages get unreadable once the decimals pile up.',
      note: 'Blood alcohol, tax rates and water quality each have a conventional unit. Carry the unit across whenever you quote a figure.' },
    zh: { title: '千分率(‰)与ppm换算器', desc: '把极小的比例同时看作百分比、千分率和ppm。',
      long: '百分比是万分之百，千分率是千分之几，ppm是百万分之几。0.4375%等于4.375‰，也等于4375ppm。比例很小时用百分比表示，小数位会长到难以阅读。',
      note: '血液酒精浓度、税率、水质标准各有惯用单位。引用数据时请一并标明单位。' },
  },
  {
    slug: 'inverse-proportion',
    icon: '👷',
    category: '비율·증감',
    fields: [
      { key: 'people', term: 'workers', unit: 'people', def: 4, min: 1 },
      { key: 'days', term: 'totalDays', unit: 'day', def: 12, min: 0 },
      { key: 'newPeople', term: 'people', unit: 'people', def: 6, min: 1 },
    ],
    formula: '{daysNeeded} = {workers} × {totalDays} ÷ {people}',
    compute: v => {
      const work = v.people * v.days;
      return [
        { term: 'daysNeeded', unit: 'day', value: round(ratio(work, v.newPeople), 2), digits: 2, primary: true },
        { term: 'result', unit: 'none', value: round(work, 1), digits: 1 },
        { term: 'diff', unit: 'day', value: round(v.days - ratio(work, v.newPeople), 2), digits: 2 },
      ];
    },
    ko: { title: '반비례 계산기 (사람·일수)', desc: '사람이 늘면 며칠로 줄어드는지 계산합니다.',
      long: '일의 총량은 사람 수 × 일수로 일정하다고 봅니다. 4명이 12일 걸리는 일은 48인일이므로 6명이면 8일입니다. 사람이 1.5배가 되면 기간은 1÷1.5배가 됩니다.',
      note: '현실에서는 사람이 늘수록 조율 비용이 붙어 딱 반비례하지 않습니다. 소프트웨어 개발에서는 이 가정이 특히 잘 깨집니다.' },
    en: { title: 'Inverse Proportion (People × Days)', desc: 'How the schedule shrinks when you add people.',
      long: 'Treat the work as fixed at people × days. Four people taking twelve days is 48 person-days, so six people take eight. Multiply the crew by 1.5 and the time divides by 1.5.',
      note: 'In practice coordination costs eat into this, so it is never exactly inverse. Software projects break the assumption hardest.' },
    zh: { title: '反比例计算器（人数与天数）', desc: '算出增加人手后工期会缩短到几天。',
      long: '把工作量视为人数×天数的固定值。4人需12天即48人日，6人则需8天。人手增至1.5倍，工期变为原来的1÷1.5。',
      note: '现实中人手增加会带来协调成本，并非严格反比。软件开发中这一假设最容易失效。' },
  },
  {
    slug: 'remaining-percent',
    icon: '🔋',
    category: '비율·증감',
    fields: [
      { key: 'total', term: 'whole', unit: 'none', def: 500, min: 1 },
      { key: 'used', term: 'usedAmt', unit: 'none', def: 180, min: 0 },
    ],
    formula: '{remainPct} = ({whole} − {usedAmt}) ÷ {whole} × 100',
    compute: v => {
      const left = Math.max(0, v.total - v.used);
      return [
        { term: 'remainPct', unit: 'percent', value: round(ratio(left, v.total) * 100, 1), digits: 1, primary: true },
        { term: 'remaining', unit: 'none', value: round(left, 2), digits: 2 },
        { term: 'percent', unit: 'percent', value: round(ratio(v.used, v.total) * 100, 1), digits: 1 },
      ];
    },
    ko: { title: '남은 비율 계산기', desc: '전체와 쓴 양으로 남은 비율과 쓴 비율을 함께 봅니다.',
      long: '전체에서 쓴 양을 빼 남은 양을 만들고 전체로 나눕니다. 데이터 요금제, 잉크, 연차처럼 "얼마 남았나"를 세는 것에 두루 씁니다.',
      note: '쓴 양이 전체를 넘으면 남은 비율을 0으로 둡니다. 음수 잔량은 뜻이 없으므로 초과분은 따로 관리하세요.' },
    en: { title: 'Percentage Remaining', desc: 'See what share is left and what share is gone.',
      long: 'Subtract what is used from the total, then divide by the total. Handy for data plans, ink, annual leave — anything where the question is “how much is left”.',
      note: 'If usage exceeds the total the remainder is held at zero; a negative balance is meaningless, so track the overage separately.' },
    zh: { title: '剩余比例计算器', desc: '同时查看剩余比例与已用比例。',
      long: '用总量减去已用量得到剩余量，再除以总量。适用于流量套餐、墨水、年假等“还剩多少”的场景。',
      note: '已用量超过总量时剩余比例按0处理；负余额没有意义，超额部分应单独记录。' },
  },
  {
    slug: 'index-rebase',
    icon: '📊',
    category: '비율·증감',
    fields: [
      { key: 'base', term: 'base', unit: 'none', def: 12500, min: 1 },
      { key: 'now', term: 'actual', unit: 'none', def: 14375, min: 0 },
    ],
    formula: '{indexVal} = {actual} ÷ {base} × 100',
    compute: v => [
      { term: 'indexVal', unit: 'none', value: round(ratio(v.now, v.base) * 100, 2), digits: 2, primary: true },
      { term: 'change', unit: 'percent', value: round((ratio(v.now, v.base) - 1) * 100, 2), digits: 2 },
      { term: 'diff', unit: 'none', value: round(v.now - v.base, 2), digits: 2 },
    ],
    ko: { title: '지수 환산 계산기 (기준=100)', desc: '기준 시점을 100으로 놓고 현재 값을 지수로 바꿉니다.',
      long: '현재 값을 기준 값으로 나누고 100을 곱합니다. 지수 115는 기준보다 15% 높다는 뜻이라, 단위가 다른 여러 지표를 한 그래프에 겹쳐 볼 때 편합니다.',
      note: '기준 시점을 바꾸면 그래프 모양은 그대로지만 숫자가 전부 달라집니다. 지수를 인용할 때는 기준 연도를 반드시 함께 적으세요.' },
    en: { title: 'Rebase to an Index of 100', desc: 'Set a base period to 100 and express the current value as an index.',
      long: 'Divide the current value by the base and multiply by 100. An index of 115 means 15% above base, which lets you overlay series with completely different units on one chart.',
      note: 'Changing the base period leaves the shape untouched but every number moves. Always quote the base year alongside an index.' },
    zh: { title: '指数换算（基准=100）', desc: '把基准期设为100，将当前值表示为指数。',
      long: '用当前值除以基准值再乘100。指数115表示高于基准15%，便于把单位完全不同的多条数据叠在同一张图上。',
      note: '更换基准期虽不改变曲线形状，但所有数字都会变。引用指数时务必标明基准年份。' },
  },
];
