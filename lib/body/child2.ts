/**
 * 몸 수치 - 아이·성장 둘째 묶음 (6종)
 *
 * 아이는 체중이 기준이 되는 계산이 많다. 수분·열량·약 용량이 모두 kg당으로
 * 정해져 있어서, 어른 용량을 반으로 쪼개는 식으로는 맞지 않는다.
 */
import type { FormulaTool } from '../formula/types.ts';
import { ratio } from '../formula/types.ts';
import { round } from '../formula/num.ts';

export const CHILD2_TOOLS: FormulaTool[] = [
  {
    slug: 'child-water-need',
    icon: '💧',
    category: '아이·성장',
    fields: [
      { key: 'kg', term: 'weightKgB', unit: 'kg', def: 18, min: 1, max: 80 },
    ],
    formula: '{childWater} = 100 × 10 + 50 × 10 + 20 × ({weightKgB} − 20)',
    compute: v => {
      // 홀리데이-시가: 처음 10kg은 kg당 100ml, 다음 10kg은 50ml, 그 위는 20ml
      const kg = v.kg;
      const ml = kg <= 10 ? kg * 100 : kg <= 20 ? 1000 + (kg - 10) * 50 : 1500 + (kg - 20) * 20;
      return [
        { term: 'childWater', unit: 'ml', value: Math.round(ml), digits: 0, primary: true },
        { term: 'fluidPerKg', unit: 'ml', value: round(ratio(ml, kg), 1), digits: 1 },
        { term: 'fluidPerHour', unit: 'ml', value: round(ratio(ml, 24), 1), digits: 1 },
      ];
    },
    ko: { title: '아이 하루 수분 요구량 계산기', desc: '체중으로 아이에게 필요한 하루 수분량을 구합니다.',
      long: '홀리데이-시가 방식입니다. 처음 10kg에는 kg당 100ml, 다음 10kg에는 50ml, 20kg을 넘는 부분에는 20ml를 줍니다. 18kg이면 1,000 + 400 = 1,400ml입니다.',
      note: '음식에 든 수분이 포함된 총량입니다. 열이 나거나 설사를 하면 요구량이 늘어나므로 그때는 진료를 받으세요.' },
    en: { title: 'Child’s Daily Fluid Need', desc: 'Daily fluid requirement from a child’s weight.',
      long: 'The Holliday–Segar method: 100 mL per kilogram for the first 10 kg, 50 mL for the next 10, and 20 mL for every kilogram above 20. An 18 kg child needs 1,000 + 400 = 1,400 mL.',
      note: 'That total includes water inside food. Fever and diarrhoea raise the requirement — see a clinician in those cases.' },
  },
  {
    slug: 'child-calorie-need',
    icon: '🍽️',
    category: '아이·성장',
    fields: [
      { key: 'kg', term: 'weightKgB', unit: 'kg', def: 20, min: 1, max: 80 },
      { key: 'age', term: 'ageYears', def: 6, min: 0, max: 18 },
    ],
    formula: '{childKcal} = {weightKgB} × (100 − {ageYears} × 3.5)',
    compute: v => {
      const perKg = Math.max(35, 100 - v.age * 3.5);
      const kcal = v.kg * perKg;
      return [
        { term: 'childKcal', unit: 'kcal', value: Math.round(kcal), digits: 0, primary: true },
        { term: 'kcalPerKg', unit: 'kcal', value: round(perKg, 1), digits: 1 },
        { term: 'proteinG', unit: 'gram', value: round(v.kg * 1.1, 1), digits: 1 },
      ];
    },
    ko: { title: '아이 하루 열량 요구량 계산기', desc: '나이와 체중으로 아이에게 필요한 하루 열량을 추정합니다.',
      long: '아이는 체중당 열량 요구량이 어른보다 훨씬 높고, 자라면서 줄어듭니다. 돌 무렵 kg당 100kcal 근처에서 시작해 청소년기에 어른 수준인 35~40kcal로 내려갑니다.',
      note: '활동량이 많은 아이는 이보다 20~30% 더 필요합니다. 성장 곡선을 따라가는지가 열량이 맞는지 보는 가장 확실한 신호입니다.' },
    en: { title: 'Child’s Daily Calorie Need', desc: 'Estimate daily calories from a child’s age and weight.',
      long: 'Children need far more calories per kilogram than adults, and the figure falls as they grow — from around 100 kcal/kg near their first birthday down to the adult 35–40 by adolescence.',
      note: 'Very active children need 20–30% more. Tracking along their growth curve is the surest sign the intake is right.' },
  },
  {
    slug: 'growth-velocity',
    icon: '📈',
    category: '아이·성장',
    fields: [
      { key: 'before', term: 'heightBefore', unit: 'cm', def: 112, min: 30 },
      { key: 'now', term: 'heightNow', unit: 'cm', def: 118, min: 30 },
      { key: 'months', term: 'monthsGap', unit: 'month', def: 12, min: 1, max: 60 },
    ],
    formula: '{growthVelocity} = ({heightNow} − {heightBefore}) ÷ {monthsGap} × 12',
    compute: v => {
      const perYear = ratio(v.now - v.before, v.months) * 12;
      return [
        { term: 'growthVelocity', unit: 'cmPerYear', value: round(perYear, 2), digits: 2, primary: true },
        { term: 'diff', unit: 'cm', value: round(v.now - v.before, 1), digits: 1 },
        { term: 'change', unit: 'percent', value: round(ratio(v.now - v.before, v.before) * 100, 2), digits: 2 },
      ];
    },
    verdict: (_v, out) => {
      const s = out[0].value;
      return s >= 5
        ? { ko: `연 ${s}cm는 학령기 아이의 정상 속도(연 5~7cm) 안입니다.`, en: `${s} cm a year is inside the school-age normal band of 5–7 cm.`, l10n: { es: `${s} cm al año está dentro de la franja normal de 5–7 cm en edad escolar.`, 'pt-br': `${s} cm por ano está dentro da faixa normal de 5–7 cm na idade escolar.`, ja: `年${s}cmは学齢期の正常範囲(年5〜7cm)の内側です。`, de: `${s} cm im Jahr liegen im normalen Schulalter-Bereich von 5–7 cm.`, fr: `${s} cm par an entre dans la plage normale de 5 à 7 cm à l’âge scolaire.`, hi: `साल में ${s} सेमी स्कूल-उम्र के सामान्य दायरे (5–7 सेमी) के भीतर है।` }, tone: 'good' }
        : { ko: `연 ${s}cm는 느린 편입니다. 학령기에 연 4cm 아래면 원인을 확인해 볼 신호로 봅니다.`, en: `${s} cm a year is slow; under 4 cm during school years is treated as worth investigating.`, l10n: { es: `${s} cm al año es lento; por debajo de 4 cm en edad escolar se considera motivo para investigar.`, 'pt-br': `${s} cm por ano é lento; abaixo de 4 cm na idade escolar é tido como motivo para investigar.`, ja: `年${s}cmは遅い方です。学齢期に年4cmを下回るなら原因を確認しておきたい合図と見ます。`, de: `${s} cm im Jahr sind langsam; unter 4 cm in der Schulzeit gilt als Grund, der Ursache nachzugehen.`, fr: `${s} cm par an, c’est lent ; sous 4 cm pendant les années d’école, on cherche la cause.`, hi: `साल में ${s} सेमी धीमा है; स्कूल के वर्षों में 4 सेमी से कम हो तो कारण जाँचने लायक़ माना जाता है।` }, tone: 'warn' };
    },
    ko: { title: '성장 속도 계산기', desc: '두 시점의 키로 1년에 몇 cm 자라는지 계산합니다.',
      long: '키 차이를 기간으로 나눈 뒤 12를 곱해 연간 속도로 바꿉니다. 절대 키보다 속도가 중요한데, 작아도 제 속도로 자라면 정상이고 크더라도 속도가 꺾이면 살펴봐야 하기 때문입니다.',
      note: '최소 6개월, 되도록 1년 간격으로 재야 의미가 있습니다. 짧은 간격은 측정 오차가 속도를 흔들어 버립니다.' },
    en: { title: 'Growth Velocity', desc: 'How many centimetres a year from two height measurements.',
      long: 'Divide the height gain by the months and multiply by twelve. Velocity matters more than absolute height: a small child growing at the right speed is fine, while a tall one whose speed drops needs a look.',
      note: 'Use at least six months between measurements, ideally a year. Over short gaps, measurement error swamps the signal.' },
  },
  {
    slug: 'formula-per-kg',
    icon: '🍼',
    category: '아이·성장',
    fields: [
      { key: 'kg', term: 'weightKgB', unit: 'kg', def: 5.2, min: 1, max: 15 },
      { key: 'perKg', term: 'formulaPerKg', unit: 'ml', def: 150, min: 100, max: 200 },
      { key: 'feeds', term: 'feeds', def: 6, min: 1, max: 12 },
    ],
    formula: '{milkMl} = {weightKgB} × {formulaPerKg}',
    compute: v => {
      const daily = v.kg * v.perKg;
      return [
        { term: 'perFeed', unit: 'ml', value: Math.round(ratio(daily, v.feeds)), digits: 0, primary: true },
        { term: 'milkMl', unit: 'ml', value: Math.round(daily), digits: 0 },
        { term: 'calories', unit: 'kcal', value: Math.round(daily * 0.67), digits: 0 },
      ];
    },
    ko: { title: '체중당 분유량 계산기', desc: '아기 체중을 기준으로 하루 분유량과 1회 수유량을 구합니다.',
      long: '생후 몇 개월까지는 체중 1kg당 하루 150ml가 기준입니다. 5.2kg이면 하루 780ml이고, 6회로 나누면 한 번에 130ml입니다. 표준 분유는 100ml에 약 67kcal입니다.',
      note: '아기마다 먹는 양이 다르고, 배고픔 신호를 따르는 것이 숫자보다 우선입니다. 체중이 성장 곡선을 따라 오르면 양은 맞는 것입니다.' },
    en: { title: 'Formula Volume per Kilogram', desc: 'Daily and per-feed formula from a baby’s weight.',
      long: 'For the first months the reference is 150 mL per kilogram a day. At 5.2 kg that is 780 mL, or 130 mL across six feeds. Standard formula holds about 67 kcal per 100 mL.',
      note: 'Babies vary, and hunger cues come before arithmetic. If weight climbs along the growth curve, the volume is right.' },
  },
  {
    slug: 'child-fever-dose',
    icon: '💊',
    category: '아이·성장',
    fields: [
      { key: 'kg', term: 'weightKgB', unit: 'kg', def: 15, min: 2, max: 60 },
      { key: 'perKg', term: 'dosePerKg', unit: 'mg', def: 12, min: 5, max: 20 },
      { key: 'times', term: 'feeds', def: 4, min: 1, max: 6 },
    ],
    formula: '{feverDose} = {weightKgB} × {dosePerKg}',
    compute: v => {
      const dose = v.kg * v.perKg;
      return [
        { term: 'feverDose', unit: 'mg', value: Math.round(dose), digits: 0, primary: true },
        { term: 'maxDaily', unit: 'mg', value: Math.round(dose * v.times), digits: 0 },
        { term: 'mgPerKg', unit: 'mg', value: round(v.perKg * v.times, 1), digits: 1 },
      ];
    },
    ko: { title: '아이 해열제 체중당 용량 계산기', desc: '체중과 kg당 용량으로 1회 용량과 하루 총량을 구합니다.',
      long: '아이 약은 나이가 아니라 체중으로 정합니다. 같은 나이에도 체중이 두 배 차이 나는 경우가 있어서입니다. 체중에 kg당 용량을 곱하면 1회 용량, 여기에 하루 횟수를 곱하면 하루 총량입니다.',
      note: '실제 용량과 최대 횟수는 성분과 제품마다 다릅니다. 이 계산은 약병에 적힌 지시를 확인하는 보조 수단이고, 투약 전에는 반드시 제품 설명서나 의료진의 지시를 따르세요.' },
    en: { title: 'Child Fever Medicine Dose by Weight', desc: 'Per-dose and daily totals from weight and mg per kilogram.',
      long: 'Children’s medicine is dosed by weight, not age — two children the same age can differ twofold in weight. Weight times the per-kilogram dose gives one dose; times the daily frequency gives the daily total.',
      note: 'The real dose and maximum frequency depend on the active ingredient and the product. Use this to check the label, and always follow the product instructions or your clinician before giving anything.' },
  },
  {
    slug: 'corrected-age',
    icon: '📅',
    category: '아이·성장',
    fields: [
      { key: 'birth', term: 'birthWeeks', unit: 'week', def: 32, min: 22, max: 42 },
      { key: 'now', term: 'ageWeeks', unit: 'week', def: 20, min: 0, max: 200 },
    ],
    formula: '{correctedAge} = {ageWeeks} − (40 − {birthWeeks})',
    compute: v => {
      const early = 40 - v.birth;
      const corrected = v.now - early;
      return [
        { term: 'correctedAge', unit: 'week', value: round(corrected, 1), digits: 1, primary: true },
        { term: 'diff', unit: 'week', value: round(early, 1), digits: 1 },
        { term: 'months', unit: 'month', value: round(corrected / 4.345, 1), digits: 1 },
      ];
    },
    verdict: (_v, out) =>
      out[0].value < 0
        ? { ko: `아직 예정일 전입니다. 예정일까지 ${round(-out[0].value, 1)}주 남았습니다.`, en: `Still before the due date — ${round(-out[0].value, 1)} weeks to go.`, l10n: { es: `Todavía antes de la fecha prevista: faltan ${round(-out[0].value, 1)} semanas.`, 'pt-br': `Ainda antes da data prevista: faltam ${round(-out[0].value, 1)} semanas.`, ja: `まだ予定日前です。予定日まであと${round(-out[0].value, 1)}週あります。`, de: `Noch vor dem Termin — es fehlen ${round(-out[0].value, 1)} Wochen.`, fr: `Encore avant le terme : il reste ${round(-out[0].value, 1)} semaines.`, hi: `अभी नियत तिथि से पहले हैं — ${round(-out[0].value, 1)} हफ़्ते बाक़ी हैं।` }, tone: 'warn' }
        : { ko: `교정 연령은 ${out[0].value}주(약 ${out[2].value}개월)입니다. 발달 이정표는 이 나이로 봅니다.`, en: `Corrected age is ${out[0].value} weeks (about ${out[2].value} months) — read milestones against this.`, l10n: { es: `La edad corregida es de ${out[0].value} semanas (unos ${out[2].value} meses): lee los hitos del desarrollo con esta edad.`, 'pt-br': `A idade corrigida é de ${out[0].value} semanas (cerca de ${out[2].value} meses): leia os marcos do desenvolvimento por essa idade.`, ja: `修正月齢は${out[0].value}週(約${out[2].value}か月)です。発達の目安はこの年齢で読んでください。`, de: `Das korrigierte Alter beträgt ${out[0].value} Wochen (etwa ${out[2].value} Monate) — Entwicklungsschritte danach lesen.`, fr: `L’âge corrigé est de ${out[0].value} semaines (environ ${out[2].value} mois) : lis les étapes du développement à cet âge.`, hi: `सुधारी हुई आयु ${out[0].value} हफ़्ते (लगभग ${out[2].value} महीने) है — विकास के पड़ाव इसी उम्र के हिसाब से देखें।` }, tone: 'good' },
    ko: { title: '조산아 교정 연령 계산기', desc: '예정일보다 이른 출생을 반영한 교정 연령을 구합니다.',
      long: '40주를 만삭으로 보고, 그보다 이르게 태어난 주 수를 지금 나이에서 뺍니다. 32주에 태어나 생후 20주라면 8주를 빼 교정 12주입니다. 발달 이정표는 이 나이를 기준으로 읽어야 합니다.',
      note: '보통 만 2세까지 교정 연령을 씁니다. 그 뒤로는 격차가 줄어 실제 나이로 봅니다.' },
    en: { title: 'Corrected Age for Preterm Babies', desc: 'Adjust a baby’s age for how early they arrived.',
      long: 'Treat 40 weeks as full term and subtract the weeks missed from the current age. Born at 32 weeks and now 20 weeks old means subtracting eight, for a corrected age of 12 weeks. Developmental milestones should be read against this figure.',
      note: 'Corrected age is generally used until about two years, after which the gap closes and actual age applies.' },
  },
];
