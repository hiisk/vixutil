/** 몸 수치 - 아이·성장 (6종) */
import type { FormulaTool } from '../formula/types.ts';
import { ratio } from '../formula/types.ts';
import { round } from '../formula/num.ts';

export const CHILD_TOOLS: FormulaTool[] = [
  {
    slug: 'child-height',
    icon: '📊',
    category: '아이·성장',
    fields: [
      { key: 'father', term: 'fatherCm', def: 175, min: 120, max: 220 },
      { key: 'mother', term: 'motherCm', def: 162, min: 120, max: 220 },
      { key: 'sex', term: 'sexFactor', def: 1, min: 0, max: 1, step: 1 },
    ],
    formula: '{childHeight} = ({fatherCm} + {motherCm} ± 13) ÷ 2',
    compute: v => {
      const mid = v.sex >= 0.5 ? (v.father + v.mother + 13) / 2 : (v.father + v.mother - 13) / 2;
      return [
        { term: 'childHeight', unit: 'cm', value: round(mid, 1), digits: 1, primary: true },
        { term: 'hrLow', unit: 'cm', value: round(mid - 8.5, 1), digits: 1 },
        { term: 'hrHigh', unit: 'cm', value: round(mid + 8.5, 1), digits: 1 },
      ];
    },
    ko: { title: '아이 예상 키 계산기', desc: '부모 키로 자녀의 성인 키를 추정합니다.',
      long: '부모 키의 평균에 아들은 6.5cm를 더하고 딸은 6.5cm를 뺍니다(합계 기준 ±13cm). 실제 키는 이 값에서 위아래 8.5cm 범위 안에 들어가는 경우가 많습니다.',
      note: '유전은 키의 약 80%를 설명합니다. 수면·영양·질병에 따라 범위 밖으로 나가는 일도 흔합니다.' },
    en: { title: "Child's Predicted Height", desc: 'Estimate a child’s adult height from the parents’ heights.',
      long: 'Take the average of both parents, then add 6.5 cm for a boy or subtract 6.5 cm for a girl. Actual adult height usually lands within about 8.5 cm either side.',
      note: 'Genetics explains roughly 80% of height — sleep, nutrition and illness often push the result outside the range.' },
  },
  {
    slug: 'baby-milk',
    icon: '🍼',
    category: '아이·성장',
    fields: [
      { key: 'weight', term: 'weightKgB', def: 4.5, min: 1, max: 15, step: 0.1 },
      { key: 'feeds', term: 'feeds', def: 7, min: 1, max: 15 },
    ],
    formula: '{milkMl} = {weightKgB} × 150,  {perFeed} = {milkMl} ÷ {feeds}',
    compute: v => {
      const daily = v.weight * 150;
      return [
        { term: 'perFeed', unit: 'ml', value: Math.round(ratio(daily, v.feeds)), digits: 0, primary: true },
        { term: 'milkMl', unit: 'ml', value: Math.round(daily), digits: 0 },
      ];
    },
    ko: { title: '신생아 수유량 계산기', desc: '체중으로 하루 총 분유량과 1회 수유량을 구합니다.',
      long: '신생아는 체중 1kg당 하루 150ml 정도를 먹습니다. 4.5kg 아기가 하루 7번 먹으면 한 번에 약 96ml입니다.',
      note: '아기마다 차이가 큽니다. 체중 증가와 기저귀 횟수가 정상이면 수유량이 계산값과 달라도 괜찮습니다.' },
    en: { title: 'Newborn Feeding Amount', desc: 'Get daily formula volume and per-feed amount from a baby’s weight.',
      long: 'Newborns take roughly 150 mL per kilogram per day. A 4.5 kg baby feeding seven times a day takes about 96 mL per feed.',
      note: 'Babies vary widely — if weight gain and nappy counts are normal, differing from this number is fine.' },
  },
  {
    slug: 'baby-weight-gain',
    icon: '📈',
    category: '아이·성장',
    fields: [
      { key: 'birth', term: 'birthWeight', def: 3200, min: 500, max: 6000 },
      { key: 'now', term: 'nowWeight', def: 4100, min: 500, max: 20000 },
    ],
    formula: '{gainPercent} = ({nowWeight} − {birthWeight}) ÷ {birthWeight} × 100',
    compute: v => [
      { term: 'gainPercent', unit: 'percent', value: round(ratio(v.now - v.birth, v.birth) * 100, 1), digits: 1, primary: true },
      { term: 'diff', unit: 'gram', value: Math.round(v.now - v.birth), digits: 0 },
    ],
    verdict: v => {
      const lost = v.now < v.birth;
      const pct = ratio(v.birth - v.now, v.birth) * 100;
      return lost && pct > 10 ? {
        ko: `출생 체중보다 ${round(pct, 1)}% 줄었습니다. 10%를 넘는 감소는 진료가 필요합니다.`,
        en: `Down ${round(pct, 1)}% from birth weight — a loss over 10% needs medical review.`,
        tone: 'bad',
      } : null;
    },
    ko: { title: '신생아 체중 증가율', desc: '출생 체중 대비 현재 체중의 증가율을 봅니다.',
      long: '신생아는 태어나고 며칠간 체중이 5~7% 줄었다가 2주쯤에 출생 체중을 회복합니다. 이후 하루 20~30g씩 늘어납니다.',
      note: '출생 체중보다 10% 이상 줄었거나 2주가 지나도 회복되지 않으면 진료가 필요합니다.' },
    en: { title: 'Newborn Weight Gain', desc: 'Compare current weight against birth weight as a percentage.',
      long: 'Newborns typically lose 5–7% in the first days and regain birth weight by about two weeks, then gain 20–30 g a day.',
      note: 'A loss over 10%, or failure to regain birth weight by two weeks, warrants medical review.' },
  },
  {
    slug: 'child-dose',
    icon: '💊',
    category: '아이·성장',
    fields: [
      { key: 'weight', term: 'weightKgB', def: 15, min: 1, max: 100, step: 0.5 },
      { key: 'perKg', term: 'dosePerKg', def: 10, min: 0.1, max: 100, step: 0.1 },
      { key: 'times', term: 'feeds', def: 3, min: 1, max: 6 },
    ],
    formula: '{doseMg} = {weightKgB} × {dosePerKg}',
    compute: v => {
      const per = v.weight * v.perKg;
      return [
        { term: 'doseMg', unit: 'mg', value: round(per, 1), digits: 1, primary: true },
        { term: 'result', unit: 'mg', value: round(per * v.times, 1), digits: 1 },
      ];
    },
    ko: { title: '체중별 약 용량 계산기', desc: '체중 1kg당 용량으로 1회 투여량과 하루 총량을 구합니다.',
      long: '소아 약은 체중을 기준으로 용량을 정합니다. 예를 들어 아세트아미노펜은 1회 10~15mg/kg, 하루 최대 75mg/kg가 일반적인 기준입니다.',
      note: '반드시 처방과 제품 설명서를 따르세요. 이 계산기는 처방을 확인하는 용도이며 처방을 대신할 수 없습니다.' },
    en: { title: 'Paediatric Dose by Weight', desc: 'Compute a single dose and daily total from a mg/kg figure.',
      long: 'Children’s medication is dosed by body weight. Paracetamol, for instance, is commonly 10–15 mg/kg per dose with a daily ceiling near 75 mg/kg.',
      note: 'Always follow the prescription and package insert — this tool is for checking a dose, never for setting one.' },
  },
  {
    slug: 'blood-volume',
    icon: '🩸',
    category: '아이·성장',
    fields: [
      { key: 'weight', term: 'weightKgB', def: 60, min: 1, max: 200 },
      { key: 'perKg', term: 'dosePerKg', def: 70, min: 50, max: 100 },
    ],
    formula: '{bloodMl} = {weightKgB} × {dosePerKg}',
    compute: v => {
      const ml = v.weight * v.perKg;
      return [
        { term: 'bloodMl', unit: 'ml', value: Math.round(ml), digits: 0, primary: true },
        { term: 'result', unit: 'percent', value: round(ratio(400, ml) * 100, 1), digits: 1 },
      ];
    },
    ko: { title: '혈액량 계산기', desc: '체중으로 몸 안의 총 혈액량을 추정합니다.',
      long: '성인은 체중 1kg당 약 70ml, 신생아는 85~90ml입니다. 아래 값은 400ml를 헌혈할 때 전체 혈액의 몇 %인지 보여줍니다.',
      note: '헌혈은 보통 전체 혈액량의 10% 이내로 제한합니다. 체중 50kg 미만은 전혈 헌혈이 제한됩니다.' },
    en: { title: 'Blood Volume Calculator', desc: 'Estimate total blood volume from body weight.',
      long: 'Adults hold about 70 mL per kilogram; newborns 85–90 mL. The second figure shows what share of your volume a 400 mL donation represents.',
      note: 'Donations are kept within roughly 10% of blood volume, which is why whole-blood donation has a minimum weight.' },
  },
  {
    slug: 'growth-percent',
    icon: '🌱',
    category: '아이·성장',
    fields: [
      { key: 'before', term: 'before', unit: 'cm', def: 120, min: 1, max: 250 },
      { key: 'after', term: 'after', unit: 'cm', def: 128, min: 1, max: 250 },
      { key: 'months', term: 'months', def: 12, min: 1, max: 120 },
    ],
    formula: '{result} = ({after} − {before}) ÷ {months} × 12',
    compute: v => {
      const perYear = ratio((v.after - v.before) * 12, v.months);
      return [
        { term: 'result', unit: 'cm', value: round(perYear, 1), digits: 1, primary: true },
        { term: 'diff', unit: 'cm', value: round(v.after - v.before, 1), digits: 1 },
      ];
    },
    verdict: (v, out) => {
      const y = out[0].value;
      const slow = y < 4;
      return {
        ko: slow ? `연 ${y}cm는 학령기 평균(5~6cm)보다 느립니다.` : `연 ${y}cm로 자라고 있습니다.`,
        en: slow ? `${y} cm a year is slower than the 5–6 cm typical of school age.` : `Growing at ${y} cm a year.` ? `每年${y}厘米低于学龄期常见的5~6厘米。` : `目前以每年${y}厘米的速度生长。`,
        tone: slow ? 'warn' : 'good',
      };
    },
    ko: { title: '연간 성장 속도 계산기', desc: '두 시점의 키로 연간 몇 cm 자라는지 환산합니다.',
      long: '기간이 1년이 아니어도 연간 속도로 바꿔 비교할 수 있습니다. 만 3세~사춘기 전에는 연 5~6cm가 일반적입니다.',
      note: '연 4cm 미만으로 오래 지속되면 성장 클리닉 상담을 권합니다. 사춘기에는 연 7~9cm까지 빨라집니다.' },
    en: { title: 'Annual Growth Rate', desc: 'Convert two height measurements into centimetres gained per year.',
      long: 'Any interval can be rescaled to a yearly rate for comparison. Between age 3 and puberty, 5–6 cm a year is typical.',
      note: 'Sustained growth under 4 cm a year is worth a specialist review; during puberty the rate rises to 7–9 cm.' },
  },
];
