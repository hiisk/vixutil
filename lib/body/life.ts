/** 몸 수치 - 생활 대사 (6종) */
import type { FormulaTool } from '../formula/types.ts';
import { ratio } from '../formula/types.ts';
import { round } from '../formula/num.ts';

export const LIFE_TOOLS: FormulaTool[] = [
  {
    slug: 'glucose-unit',
    icon: '🔄',
    category: '생활 대사',
    fields: [{ key: 'mgdl', term: 'glucose', unit: 'mgdlU', def: 100, min: 10, max: 900 }],
    formula: '{mmolL} = {glucose} ÷ 18',
    compute: v => [
      { term: 'mmolL', unit: 'mmolU', value: round(v.mgdl / 18, 2), digits: 2, primary: true },
      { term: 'a1c', unit: 'percent', value: round((v.mgdl + 46.7) / 28.7, 1), digits: 1 },
    ],
    ko: { title: '혈당 단위 변환(mg/dL ↔ mmol/L)', desc: '한국·미국식 혈당 수치를 유럽식으로 바꿉니다.',
      long: '한국과 미국은 mg/dL, 유럽과 중국 일부는 mmol/L을 씁니다. 포도당의 분자량 때문에 18로 나누면 됩니다 — 100mg/dL은 5.6mmol/L입니다.',
      note: '아래 값은 그 혈당이 평균으로 유지될 때의 HbA1c 추정치입니다.' },
    en: { title: 'Glucose Units (mg/dL ↔ mmol/L)', desc: 'Convert blood glucose between US and European units.',
      long: 'The US and Korea report mg/dL while Europe uses mmol/L. Because of glucose’s molar mass you divide by 18 — 100 mg/dL is 5.6 mmol/L.',
      note: 'The second figure estimates the HbA1c that this glucose level would produce if sustained.' },
    zh: { title: '血糖单位换算(mg/dL ↔ mmol/L)', desc: '在美式与欧式血糖单位之间换算。',
      long: '美国和韩国用毫克/分升，欧洲多用毫摩尔/升。由于葡萄糖的摩尔质量，除以18即可 — 100毫克/分升等于5.6毫摩尔/升。',
      note: '第二个数值是该血糖水平长期维持时的HbA1c估算值。' },
  },
  {
    slug: 'cholesterol-unit',
    icon: '🧫',
    category: '생활 대사',
    fields: [{ key: 'mgdl', term: 'totalChol', unit: 'mgdlU', def: 200, min: 20, max: 600 }],
    formula: '{mmolL} = {totalChol} ÷ 38.67',
    compute: v => [
      { term: 'mmolL', unit: 'mmolU', value: round(v.mgdl / 38.67, 2), digits: 2, primary: true },
      { term: 'result', unit: 'mmolU', value: round(v.mgdl / 88.57, 2), digits: 2 },
    ],
    ko: { title: '콜레스테롤 단위 변환', desc: '콜레스테롤과 중성지방의 mg/dL을 mmol/L로 바꿉니다.',
      long: '콜레스테롤은 38.67로, 중성지방은 88.57로 나눕니다. 분자량이 달라 나누는 수가 다릅니다 — 아래 값이 중성지방 기준입니다.',
      note: '해외 검사지를 읽을 때 두 단위를 섞으면 수치가 두 배 이상 어긋납니다.' },
    en: { title: 'Cholesterol Unit Converter', desc: 'Convert cholesterol and triglycerides from mg/dL to mmol/L.',
      long: 'Cholesterol divides by 38.67 and triglycerides by 88.57 — different molar masses mean different divisors. The second figure uses the triglyceride factor.',
      note: 'Mixing the two units when reading a foreign lab report throws the numbers off by more than double.' },
    zh: { title: '胆固醇单位换算器', desc: '把胆固醇和甘油三酯从毫克/分升换算为毫摩尔/升。',
      long: '胆固醇除以38.67，甘油三酯除以88.57 — 摩尔质量不同，除数也不同。第二个数值按甘油三酯的系数换算。',
      note: '阅读国外化验单时混用这两个单位，数值会相差两倍以上。' },
  },
  {
    slug: 'sleep-cycles',
    icon: '😴',
    category: '생활 대사',
    fields: [
      { key: 'cycles', term: 'cycles', def: 5, min: 1, max: 8 },
      { key: 'fallAsleep', term: 'minutes', def: 15, min: 0, max: 90 },
    ],
    formula: '{sleepHours} = ({cycles} × 90 + {minutes}) ÷ 60',
    compute: v => {
      const total = v.cycles * 90 + v.fallAsleep;
      return [
        { term: 'sleepHours', unit: 'hour', value: round(total / 60, 2), digits: 2, primary: true },
        { term: 'minutes', value: total, digits: 0 },
      ];
    },
    verdict: (v, out) => {
      const h = out[0].value;
      const enough = h >= 7 && h <= 9;
      return {
        ko: enough ? `${h}시간은 성인 권장 수면(7~9시간) 안입니다.` : h < 7 ? `${h}시간은 권장 수면보다 짧습니다.` : `${h}시간은 권장 수면보다 깁니다.`,
        en: enough ? `${h} hours falls inside the recommended 7–9 for adults.` : h < 7 ? `${h} hours is short of the recommended range.` : `${h} hours is longer than the recommended range.`,
        zh: enough ? `${h}小时在成人推荐睡眠(7~9小时)范围内。` : h < 7 ? `${h}小时少于推荐睡眠时长。` : `${h}小时长于推荐睡眠时长。`,
        tone: enough ? 'good' : 'warn',
      };
    },
    ko: { title: '수면 주기 계산기', desc: '90분 주기 단위로 자야 할 시간을 계산합니다.',
      long: '수면은 얕은 잠과 깊은 잠이 약 90분마다 반복됩니다. 주기 끝에서 깨면 같은 시간을 자도 덜 피곤합니다. 잠드는 데 걸리는 시간도 더해야 실제 누워 있어야 할 시간이 됩니다.',
      note: '주기 길이는 사람마다 80~110분으로 다릅니다. 90분은 평균값입니다.' },
    en: { title: 'Sleep Cycle Calculator', desc: 'Plan sleep in 90-minute cycles so you wake between them.',
      long: 'Sleep alternates between light and deep stages about every 90 minutes, and waking at the end of a cycle feels better than waking mid-cycle. Add the time it takes you to fall asleep to get total time in bed.',
      note: 'Cycle length varies from 80 to 110 minutes between individuals — 90 is only the average.' },
    zh: { title: '睡眠周期计算器', desc: '按90分钟一个周期安排睡眠，让自己在周期之间醒来。',
      long: '睡眠中浅睡与深睡约每90分钟循环一次，在周期结束时醒来比在中途醒来更清爽。再加上入睡所需时间，才是实际需要卧床的时长。',
      note: '周期长度因人而异，为80~110分钟 — 90分钟只是平均值。' },
  },
  {
    slug: 'alcohol-bac',
    icon: '🍺',
    category: '생활 대사',
    fields: [
      { key: 'ml', term: 'drinkMl', def: 500, min: 10, max: 3000 },
      { key: 'abv', term: 'abv', unit: 'percent', def: 5, min: 0.5, max: 60, step: 0.5 },
      { key: 'weight', term: 'weightKgB', def: 70, min: 20, max: 200 },
      { key: 'sex', term: 'sexFactor', def: 1, min: 0, max: 1, step: 1 },
    ],
    formula: '{bac} = {drinkMl} × {abv} ÷ 100 × 0.789 ÷ ({weightKgB} × r) ÷ 10,  r = 0.68 (M) · 0.55 (F)',
    compute: v => {
      // 순알코올 g = 부피 × 도수/100 × 0.789
      const grams = v.ml * (v.abv / 100) * 0.789;
      const r = v.sex >= 0.5 ? 0.68 : 0.55;
      const bac = ratio(grams, v.weight * r) / 10;
      return [
        { term: 'bac', unit: 'percent', value: round(bac, 3), digits: 3, primary: true },
        { term: 'result', unit: 'gram', value: round(grams, 1), digits: 1 },
        { term: 'clearHours', unit: 'hour', value: round(ratio(bac, 0.015), 1), digits: 1 },
      ];
    },
    verdict: (v, out) => {
      const b = out[0].value;
      const over = b >= 0.03;
      return {
        ko: over ? `추정 ${b}%는 한국 음주운전 기준(0.03%)을 넘습니다 — 운전하지 마세요.` : `추정 ${b}%입니다. 추정값이므로 운전 가능 여부의 근거로 쓸 수 없습니다.`,
        en: over ? `An estimated ${b}% exceeds Korea’s 0.03% driving limit — do not drive.` : `Estimated at ${b}%. This is only an estimate and must not be used to decide whether to drive.`,
        zh: over ? `估算${b}%已超过韩国酒驾标准(0.03%) — 请勿驾车。` : `估算为${b}%。这只是估算值，不能作为能否驾车的依据。`,
        tone: over ? 'bad' : 'warn',
      };
    },
    ko: { title: '혈중 알코올 농도 계산기', desc: '마신 술의 양과 도수로 혈중 알코올 농도를 추정합니다(위드마크 식).',
      long: '순알코올 무게를 체중과 체내 수분 계수로 나눕니다. 시간당 약 0.015%씩 분해되므로 완전히 빠지는 데 걸리는 시간도 함께 보여줍니다.',
      note: '개인차가 매우 큽니다. 이 값은 어떤 경우에도 운전 가능 여부의 판단 근거가 될 수 없습니다 — 마셨다면 운전하지 마세요.' },
    en: { title: 'Blood Alcohol Estimator', desc: 'Estimate BAC from the volume and strength of what you drank (Widmark).',
      long: 'The mass of pure alcohol is divided by body weight and a body-water factor. Alcohol clears at roughly 0.015% per hour, so the time to reach zero is shown too.',
      note: 'Individual variation is very large. This must never be used to decide whether you can drive — if you have been drinking, do not drive.' },
    zh: { title: '血液酒精浓度计算器', desc: '按饮酒量和酒精度估算血液酒精浓度(Widmark公式)。',
      long: '把纯酒精的质量除以体重和体液系数。酒精每小时约代谢0.015%，因此同时给出完全代谢所需的时间。',
      note: '个体差异极大。此数值在任何情况下都不能作为能否开车的判断依据 — 喝了酒就不要开车。' },
  },
  {
    slug: 'alcohol-clear',
    icon: '⏳',
    category: '생활 대사',
    fields: [
      { key: 'bac', term: 'bac', unit: 'percent', def: 0.08, min: 0.001, max: 0.5, step: 0.005 },
      { key: 'rate', term: 'rate', unit: 'percent', def: 0.015, min: 0.008, max: 0.025, step: 0.001 },
    ],
    formula: '{clearHours} = {bac} ÷ {rate}',
    compute: v => {
      const hours = ratio(v.bac, v.rate);
      return [
        { term: 'clearHours', unit: 'hour', value: round(hours, 1), digits: 1, primary: true },
        { term: 'minutes', value: Math.round(hours * 60), digits: 0 },
      ];
    },
    ko: { title: '알코올 분해 시간 계산기', desc: '혈중 알코올이 0이 되기까지 걸리는 시간을 추정합니다.',
      long: '알코올은 시간당 일정량씩 분해됩니다(대개 0.010~0.020%). 농도를 그 속도로 나눈 값이 필요한 시간입니다.',
      note: '커피·사우나·운동은 분해 속도를 빠르게 하지 못합니다. 시간 외에는 방법이 없습니다.' },
    en: { title: 'Alcohol Clearance Time', desc: 'Estimate how long until your blood alcohol reaches zero.',
      long: 'Alcohol is eliminated at a roughly constant rate — usually 0.010–0.020% per hour. Divide the concentration by that rate for the time needed.',
      note: 'Coffee, saunas and exercise do not speed elimination up. Only time does.' },
    zh: { title: '酒精代谢时间计算器', desc: '估算血液酒精降到零所需的时间。',
      long: '酒精以大致恒定的速度代谢，通常为每小时0.010~0.020%。用浓度除以该速度即为所需时间。',
      note: '咖啡、桑拿和运动都无法加快代谢速度。除了等待时间别无他法。' },
  },
  {
    slug: 'caffeine-half-life',
    icon: '☕',
    category: '생활 대사',
    fields: [
      { key: 'mg', term: 'caffeineMg', def: 150, min: 10, max: 1000 },
      { key: 'hours', term: 'hoursLater', def: 8, min: 0, max: 48 },
      { key: 'half', term: 'clearHours', unit: 'hour', def: 5, min: 1, max: 12, step: 0.5 },
    ],
    formula: '{remainMg} = {caffeineMg} × 0.5 ^ ({hoursLater} ÷ {clearHours})',
    compute: v => {
      const remain = v.mg * 0.5 ** ratio(v.hours, v.half);
      return [
        { term: 'remainMg', unit: 'mg', value: round(remain, 1), digits: 1, primary: true },
        { term: 'percent', unit: 'percent', value: round(ratio(remain, v.mg) * 100, 1), digits: 1 },
      ];
    },
    verdict: (v, out) => {
      const left = out[0].value;
      const much = left >= 50;
      return {
        ko: much ? `${v.hours}시간 뒤에도 ${left}mg가 남습니다 — 수면에 영향을 줄 수 있습니다.` : `${v.hours}시간 뒤 ${left}mg가 남습니다.`,
        en: much ? `${left} mg remains after ${v.hours} hours — enough to affect sleep.` : `${left} mg remains after ${v.hours} hours.`,
        zh: much ? `${v.hours}小时后仍残留${left}毫克 — 足以影响睡眠。` : `${v.hours}小时后残留${left}毫克。`,
        tone: much ? 'warn' : 'good',
      };
    },
    ko: { title: '카페인 잔량 계산기', desc: '커피를 마신 뒤 몇 시간이 지나면 카페인이 얼마나 남는지 계산합니다.',
      long: '카페인 반감기는 평균 5시간입니다. 아메리카노 한 잔(약 150mg)을 오후 3시에 마시면 밤 11시에도 절반 가까이 남아 있습니다.',
      note: '반감기는 사람마다 2시간에서 10시간까지 다릅니다. 임신·경구피임약·간질환은 반감기를 늘립니다.' },
    en: { title: 'Caffeine Remaining', desc: 'See how much caffeine is still in you hours after a coffee.',
      long: 'Caffeine’s half-life averages five hours. An americano at 3 pm (about 150 mg) still leaves close to half in your system at 11 pm.',
      note: 'Half-life ranges from 2 to 10 hours between people; pregnancy, oral contraceptives and liver disease all lengthen it.' },
    zh: { title: '咖啡因残留计算器', desc: '喝完咖啡若干小时后，体内还剩多少咖啡因。',
      long: '咖啡因的半衰期平均为5小时。下午3点喝一杯美式(约150毫克)，到晚上11点体内仍残留近一半。',
      note: '半衰期因人而异，从2小时到10小时；怀孕、口服避孕药和肝病都会延长它。' },
  },
];
