/**
 * 몸 수치 - 생활 대사 둘째 묶음 (6종)
 *
 * 잠·술·담배·땀처럼 하루 습관이 몸에 쌓이는 방식을 숫자로 본다. 기준은 국제
 * 학회 값을 쓰고, 술 단위는 나라마다 다르므로 그램으로 함께 보여 준다.
 */
import type { FormulaTool } from '../formula/types.ts';
import { ratio } from '../formula/types.ts';
import { round } from '../formula/num.ts';

export const LIFE2_TOOLS: FormulaTool[] = [
  {
    slug: 'sleep-debt',
    icon: '😴',
    category: '생활 대사',
    fields: [
      { key: 'need', term: 'sleepNeed', unit: 'hour', def: 8, min: 4, max: 12 },
      { key: 'actual', term: 'sleepActual', unit: 'hour', def: 6.2, min: 2, max: 12 },
      { key: 'days', term: 'days', unit: 'day', def: 5, min: 1, max: 7 },
    ],
    formula: '{sleepDebt} = ({sleepNeed} − {sleepActual}) × {days}',
    compute: v => {
      const gap = Math.max(0, v.need - v.actual);
      return [
        { term: 'sleepDebt', unit: 'hour', value: round(gap * v.days, 1), digits: 1, primary: true },
        { term: 'diff', unit: 'hour', value: round(gap, 1), digits: 1 },
        { term: 'percent', unit: 'percent', value: round(ratio(v.actual, v.need) * 100, 1), digits: 1 },
      ];
    },
    verdict: (_v, out) => {
      const d = out[0].value;
      return d === 0
        ? { ko: '부채가 없습니다.', en: 'No debt accumulated.', zh: '没有累积睡眠债。', tone: 'good' }
        : d < 5
          ? { ko: `${d}시간이 쌓였습니다. 주말에 1~2시간씩 더 자면 메울 수 있는 정도입니다.`, en: `${d} hours accumulated — an extra hour or two at the weekend clears it.`, zh: `累积${d}小时，周末多睡一两小时即可补回。`, tone: 'warn' }
          : { ko: `${d}시간이 쌓였습니다. 하루 몰아 자는 것으로는 회복되지 않으니 취침 시간을 앞당기세요.`, en: `${d} hours is too much for one long lie-in — move bedtime earlier instead.`, zh: `累积${d}小时，靠一天补觉难以恢复，应提前入睡时间。`, tone: 'bad' };
    },
    ko: { title: '수면 부채 계산기', desc: '필요한 만큼 못 잔 시간이 며칠 동안 얼마나 쌓였는지 계산합니다.',
      long: '하루 부족분에 날 수를 곱합니다. 잠은 저축과 달라서 미리 몰아 자 둘 수는 없지만 부족분은 쌓이고, 쌓인 만큼 반응 속도와 판단력이 떨어집니다.',
      note: '주말에 한 번에 메우는 것은 부분적으로만 통합니다. 부채가 클수록 매일 30분씩 앞당기는 쪽이 확실합니다.' },
    en: { title: 'Sleep Debt', desc: 'How many hours of sleep you have fallen behind over several days.',
      long: 'Multiply the nightly shortfall by the number of days. Sleep is not a savings account you can pay into ahead of time, but the shortfall does accumulate, and reaction time and judgement fall with it.',
      note: 'One long weekend lie-in only partly repays it. The larger the debt, the more reliable it is to move bedtime 30 minutes earlier every night.' },
    zh: { title: '睡眠债计算器', desc: '算出几天内累积了多少睡眠不足。',
      long: '把每晚的不足量乘以天数。睡眠不像储蓄那样可以提前存入，但不足会累积，反应速度与判断力也随之下降。',
      note: '周末一次补足只能部分偿还。睡眠债越大，越应该每天提前30分钟入睡。' },
  },
  {
    slug: 'jet-lag-days',
    icon: '✈️',
    category: '생활 대사',
    fields: [
      { key: 'gap', term: 'timezoneGap', unit: 'hour', def: 8, min: 1, max: 14 },
      { key: 'east', term: 'goEast', def: 1, min: 0, max: 1 },
    ],
    formula: '{adaptDays} = {timezoneGap} ÷ (1.5 − 0.5 × {goEast})',
    compute: v => {
      // 동쪽으로 갈 때는 하루 약 1시간, 서쪽으로 갈 때는 약 1.5시간씩 맞춰진다
      const perDay = v.east === 1 ? 1 : 1.5;
      const days = ratio(v.gap, perDay);
      return [
        { term: 'adaptDays', unit: 'day', value: round(days, 1), digits: 1, primary: true },
        { term: 'hours', unit: 'hour', value: round(perDay, 1), digits: 1 },
        { term: 'timezoneGap', unit: 'hour', value: Math.round(v.gap), digits: 0 },
      ];
    },
    verdict: (v, out) =>
      v.east === 1
        ? { ko: `동쪽으로 ${v.gap}시간이면 약 ${out[0].value}일 걸립니다. 동쪽은 하루를 짧게 만들어야 해서 더 힘듭니다.`, en: `Eight zones east takes about ${out[0].value} days; going east shortens your day, which is harder.`, zh: `向东${v.gap}小时约需${out[0].value}天。向东需要缩短一天，因此更难适应。`, tone: 'warn' }
        : { ko: `서쪽으로 ${v.gap}시간이면 약 ${out[0].value}일 걸립니다. 서쪽은 하루를 늘리는 방향이라 비교적 수월합니다.`, en: `${v.gap} zones west takes about ${out[0].value} days; westward lengthens your day and is easier.`, zh: `向西${v.gap}小时约需${out[0].value}天。向西是延长一天，相对容易。`, tone: 'good' },
    ko: { title: '시차 적응 일수 계산기', desc: '시차와 이동 방향으로 적응에 걸리는 날을 추정합니다.',
      long: '몸속 시계는 하루에 한두 시간씩만 옮겨집니다. 동쪽으로 갈 때는 하루 약 1시간, 서쪽으로 갈 때는 약 1.5시간이 기준이라 같은 시차라도 방향에 따라 적응 기간이 달라집니다.',
      note: '아침 햇빛을 쬐면 동쪽 이동이, 저녁 빛을 쬐면 서쪽 이동이 빨라집니다. 도착지 시간에 맞춰 바로 식사와 취침을 옮기는 것이 가장 효과가 큽니다.' },
    en: { title: 'Jet Lag Adjustment Days', desc: 'Estimate how long adaptation takes from the time shift and direction.',
      long: 'The body clock only moves an hour or so a day: roughly 1 hour when travelling east and 1.5 westward. The same number of time zones therefore costs different amounts depending on direction.',
      note: 'Morning light speeds up eastward shifts and evening light speeds up westward ones. Moving meals and bedtime to local time on arrival helps most of all.' },
    zh: { title: '时差适应天数计算器', desc: '按时差与飞行方向估算适应所需的天数。',
      long: '生物钟每天只能移动一到两小时：向东约每天1小时，向西约1.5小时。因此同样的时差，方向不同所需时间也不同。',
      note: '晨光有助于向东调整，晚间光照有助于向西调整。抵达后立即按当地时间安排进餐与就寝效果最好。' },
  },
  {
    slug: 'standard-drinks',
    icon: '🍺',
    category: '생활 대사',
    fields: [
      { key: 'ml', term: 'drinkMl', unit: 'ml', def: 500, min: 0 },
      { key: 'abv', term: 'abv', unit: 'percent', def: 5, min: 0, max: 96 },
    ],
    formula: '{pureAlcoholG} = {drinkMl} × {abv} ÷ 100 × 0.789',
    compute: v => {
      const g = v.ml * (v.abv / 100) * 0.789;
      return [
        { term: 'pureAlcoholG', unit: 'gram', value: round(g, 1), digits: 1, primary: true },
        { term: 'standardDrinks', unit: 'glass', value: round(ratio(g, 10), 2), digits: 2 },
        { term: 'alcoholKcal', unit: 'kcal', value: Math.round(g * 7), digits: 0 },
      ];
    },
    verdict: (_v, out) => ({
      ko: `순알코올 ${out[0].value}g입니다. 10g을 한 잔으로 세는 기준(WHO)으로는 ${out[1].value}잔이고, 열량은 ${out[2].value}kcal입니다.`,
      en: `That is ${out[0].value} g of pure alcohol — ${out[1].value} standard drinks at the WHO 10 g unit, and ${out[2].value} kcal.`,
      zh: `纯酒精${out[0].value}克。按世卫组织每单位10克计为${out[1].value}标准杯，热量${out[2].value}千卡。`,
      tone: 'warn',
    }),
    ko: { title: '표준 잔 수 계산기', desc: '마신 양과 도수로 순알코올 그램과 표준 잔 수를 구합니다.',
      long: '알코올은 물보다 가벼워서 부피에 0.789를 곱해야 그램이 됩니다. 500ml 맥주 5도면 순알코올 약 20g입니다. 알코올은 1g에 7kcal로 지방 다음으로 열량이 큽니다.',
      note: '표준 한 잔의 정의가 나라마다 다릅니다. 세계보건기구와 대부분의 유럽은 10g, 미국은 14g, 영국의 1유닛은 8g입니다. 그래서 그램을 함께 봐야 비교가 됩니다.' },
    en: { title: 'Standard Drinks Calculator', desc: 'Grams of pure alcohol and standard drinks from volume and strength.',
      long: 'Alcohol is lighter than water, so multiply the volume by 0.789 to get grams. A 500 mL beer at 5% holds about 20 g. At 7 kcal a gram, alcohol is second only to fat for energy density.',
      note: 'A “standard drink” differs by country: the WHO and most of Europe use 10 g, the US 14 g, and a UK unit is 8 g. That is why the grams matter for comparison.' },
    zh: { title: '标准杯数计算器', desc: '用饮酒量与度数算出纯酒精克数和标准杯数。',
      long: '酒精比水轻，体积需乘0.789才能换算成克。500毫升5度的啤酒约含20克纯酒精。酒精每克7千卡，能量密度仅次于脂肪。',
      note: '“标准一杯”的定义各国不同：世卫组织与欧洲多数国家为10克，美国为14克，英国的1单位为8克。因此比较时应看克数。' },
  },
  {
    slug: 'pack-years',
    icon: '🚬',
    category: '생활 대사',
    fields: [
      { key: 'cigs', term: 'cigsPerDay', def: 15, min: 0, max: 100 },
      { key: 'years', term: 'smokeYears', unit: 'year', def: 20, min: 0, max: 80 },
    ],
    formula: '{packYears} = {cigsPerDay} ÷ 20 × {smokeYears}',
    compute: v => {
      const py = v.cigs / 20 * v.years;
      return [
        { term: 'packYears', unit: 'packYear', value: round(py, 1), digits: 1, primary: true },
        { term: 'count', unit: 'none', value: Math.round(v.cigs * 365 * v.years), digits: 0 },
        { term: 'percent', unit: 'percent', value: round(ratio(v.cigs, 20) * 100, 0), digits: 0 },
      ];
    },
    verdict: (_v, out) => {
      const py = out[0].value;
      return py === 0
        ? { ko: '흡연력이 없습니다.', en: 'No smoking history.', zh: '无吸烟史。', tone: 'good' }
        : py >= 20
          ? { ko: `${py}갑년입니다. 20갑년 이상은 폐암 검진 대상을 정하는 기준으로 쓰이는 수준입니다.`, en: `${py} pack-years. Twenty or more is the threshold used to select people for lung cancer screening.`, zh: `${py}包年。20包年以上是筛选肺癌筛查对象所用的界值。`, tone: 'bad' }
          : { ko: `${py}갑년입니다. 끊은 뒤에도 이 값은 줄지 않지만 위험은 시간이 지나며 내려갑니다.`, en: `${py} pack-years. The figure does not fall after quitting, but the risk does over time.`, zh: `${py}包年。戒烟后这个数字不会减少，但风险会随时间下降。`, tone: 'warn' };
    },
    ko: { title: '흡연 갑년 계산기', desc: '하루 개비 수와 흡연 기간으로 누적 흡연량을 구합니다.',
      long: '하루 한 갑(20개비)을 1년 피운 것을 1갑년으로 셉니다. 하루 개비 수를 20으로 나눠 갑 수로 바꾸고 기간을 곱합니다. 하루 반 갑 40년과 두 갑 10년은 모두 20갑년입니다.',
      note: '누적량이 같아도 최근까지 피웠는지가 위험에 더 크게 작용합니다. 갑년은 위험 크기의 한 축일 뿐입니다.' },
    en: { title: 'Smoking Pack-Years', desc: 'Cumulative tobacco exposure from cigarettes a day and years smoked.',
      long: 'One pack-year is a pack a day (20 cigarettes) for one year. Divide daily cigarettes by 20 for packs and multiply by the years. Half a pack for forty years and two packs for ten both come to 20 pack-years.',
      note: 'For the same total, how recently you smoked weighs more heavily on risk. Pack-years is only one axis of it.' },
    zh: { title: '吸烟包年计算器', desc: '用每天支数与吸烟年数算出累积吸烟量。',
      long: '每天一包（20支）持续一年记为1包年。把每天支数除以20换成包数，再乘以年数。每天半包吸40年与每天两包吸10年，都是20包年。',
      note: '累积量相同时，距今多久仍在吸烟对风险影响更大。包年只是风险的一个维度。' },
  },
  {
    slug: 'sweat-rate',
    icon: '💦',
    category: '생활 대사',
    fields: [
      { key: 'loss', term: 'weightLoss', unit: 'kg', def: 1.2, min: 0, max: 5 },
      { key: 'drank', term: 'drankMl', unit: 'ml', def: 500, min: 0 },
      { key: 'hours', term: 'hours', unit: 'hour', def: 1.5, min: 0.25, max: 12 },
    ],
    formula: '{sweatRate} = ({weightLoss} × 1000 + {drankMl}) ÷ {hours}',
    compute: v => {
      const total = v.loss * 1000 + v.drank;
      return [
        { term: 'sweatRate', unit: 'mlPerHour', value: Math.round(ratio(total, v.hours)), digits: 0, primary: true },
        { term: 'waterMl', unit: 'ml', value: Math.round(total), digits: 0 },
        { term: 'percent', unit: 'percent', value: round(ratio(v.loss, 70) * 100, 2), digits: 2 },
      ];
    },
    verdict: (_v, out) => {
      const r = out[0].value;
      return r >= 1500
        ? { ko: `시간당 ${r}ml는 많은 편입니다. 물만으로는 나트륨이 부족해지므로 전해질을 함께 보충하세요.`, en: `${r} mL an hour is heavy sweating — water alone leaves you short of sodium, so add electrolytes.`, zh: `每小时${r}毫升属于大量出汗，仅补水会导致钠不足，应同时补充电解质。`, tone: 'warn' }
        : { ko: `시간당 ${r}ml입니다. 이 정도면 운동 중 이 양에 가깝게 마시는 것을 목표로 하세요.`, en: `${r} mL an hour — aim to drink close to this rate while training.`, zh: `每小时${r}毫升，训练时应以接近这一速率补水为目标。`, tone: 'good' };
    },
    ko: { title: '땀 손실량 계산기', desc: '운동 전후 체중 변화로 시간당 수분 손실을 구합니다.',
      long: '운동 중 줄어든 체중은 거의 전부 물입니다. 줄어든 무게(1kg = 1,000ml)에 마신 양을 더하면 실제로 빠져나간 수분이고, 시간으로 나누면 시간당 손실률이 됩니다.',
      note: '체중의 2%를 넘게 잃으면 운동 능력이 떨어집니다. 70kg이면 1.4kg이 그 선입니다.' },
    en: { title: 'Sweat Rate', desc: 'Hourly fluid loss from weight change across a session.',
      long: 'Weight lost during exercise is almost entirely water. Add what you drank to the weight lost (1 kg = 1,000 mL) for the fluid that actually left, then divide by the hours for an hourly rate.',
      note: 'Losing more than 2% of body weight degrades performance. For a 70 kg athlete that line sits at 1.4 kg.' },
    zh: { title: '汗液流失量计算器', desc: '用运动前后的体重变化算出每小时水分流失。',
      long: '运动中减少的体重几乎全是水分。把减少的重量（1公斤=1000毫升）加上已饮水量，即为实际流失的水分，再除以小时数得到每小时流失率。',
      note: '流失超过体重的2%会降低运动表现。70公斤者的这条线约在1.4公斤。' },
  },
  {
    slug: 'alcohol-calories',
    icon: '🍷',
    category: '생활 대사',
    fields: [
      { key: 'ml', term: 'drinkMl', unit: 'ml', def: 350, min: 0 },
      { key: 'abv', term: 'abv', unit: 'percent', def: 17, min: 0, max: 96 },
      { key: 'kg', term: 'weightKgB', unit: 'kg', def: 70, min: 1 },
    ],
    formula: '{alcoholKcal} = {drinkMl} × {abv} ÷ 100 × 0.789 × 7',
    compute: v => {
      const g = v.ml * (v.abv / 100) * 0.789;
      const kcal = g * 7;
      return [
        { term: 'alcoholKcal', unit: 'kcal', value: Math.round(kcal), digits: 0, primary: true },
        { term: 'pureAlcoholG', unit: 'gram', value: round(g, 1), digits: 1 },
        { term: 'burnMinutes', unit: 'minute', value: Math.round(ratio(kcal, 7 * 3.5 * v.kg / 200)), digits: 0 },
      ];
    },
    ko: { title: '술 열량 계산기', desc: '술의 양과 도수로 알코올에서 나오는 열량을 구합니다.',
      long: '알코올 1g은 7kcal입니다. 탄수화물·단백질(4kcal)보다 높고 지방(9kcal)보다 낮습니다. 350ml 17도 소주 한 병이면 순알코올 약 47g, 330kcal입니다. 안주는 여기 안 들어 있습니다.',
      note: '알코올 열량은 저장되지 않고 먼저 태워지는데, 그 사이 지방 연소가 밀립니다. 그래서 총 열량 계산보다 체중에 더 불리하게 작용하는 경우가 많습니다.' },
    en: { title: 'Calories in a Drink', desc: 'Energy from the alcohol itself, from volume and strength.',
      long: 'Alcohol carries 7 kcal a gram — above carbohydrate and protein at 4, below fat at 9. A 350 mL bottle of 17% spirit holds about 47 g of alcohol and 330 kcal. Food alongside it is not included.',
      note: 'Alcohol calories are not stored; they get burned first, which pushes fat oxidation to the back of the queue. That is why the effect on weight is often worse than the calorie count suggests.' },
    zh: { title: '酒的热量计算器', desc: '按酒量与度数算出酒精本身带来的热量。',
      long: '酒精每克7千卡，高于碳水与蛋白质的4千卡，低于脂肪的9千卡。350毫升17度的白酒约含47克纯酒精、330千卡，不含佐餐食物。',
      note: '酒精热量不会被储存而是优先燃烧，这会把脂肪氧化推到后面。因此它对体重的影响往往比热量数字看起来更不利。' },
  },
];
