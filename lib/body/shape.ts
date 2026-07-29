/** 몸 수치 - 체중·체형 (10종) */
import type { FormulaTool } from '../formula/types.ts';
import { ratio } from '../formula/types.ts';
import { round } from '../formula/num.ts';

const bmiOf = (kg: number, cm: number) => ratio(kg, (cm / 100) ** 2);

export const SHAPE_TOOLS: FormulaTool[] = [
  {
    slug: 'bmi',
    icon: '⚖️',
    category: '체중·체형',
    fields: [
      { key: 'height', term: 'heightCm', def: 170, min: 50, max: 250 },
      { key: 'weight', term: 'weightKgB', def: 68, min: 10, max: 300 },
    ],
    formula: '{bmi} = {weightKgB} ÷ ({heightCm} ÷ 100)²',
    compute: v => {
      const bmi = bmiOf(v.weight, v.height);
      return [
        { term: 'bmi', value: round(bmi, 1), digits: 1, primary: true },
        { term: 'idealWeight', unit: 'kg', value: round(22 * (v.height / 100) ** 2, 1), digits: 1 },
      ];
    },
    verdict: (v, out) => {
      const b = out[0].value;
      const band = b < 18.5 ? 0 : b < 23 ? 1 : b < 25 ? 2 : b < 30 ? 3 : 4;
      const ko = ['저체중', '정상', '과체중', '경도 비만', '중등도 이상 비만'][band];
      const en = ['underweight', 'normal', 'overweight', 'obese class I', 'obese class II or higher'][band];
      const zh = ['体重不足', '正常', '超重', '轻度肥胖', '中度以上肥胖'][band];
      return {
        ko: `BMI ${b}은 아시아·태평양 기준으로 ${ko}입니다.`,
        en: `A BMI of ${b} is ${en} by the Asia-Pacific classification.`,
        zh: `BMI ${b}按亚太标准属于${zh}。`,
        tone: band === 1 ? 'good' : band === 2 || band === 0 ? 'warn' : 'bad',
      };
    },
    ko: { title: 'BMI 계산기', desc: '키와 체중으로 체질량지수와 표준 체중을 구합니다.',
      long: 'BMI는 체중을 키(m)의 제곱으로 나눈 값입니다. 아시아·태평양 기준은 23 이상을 과체중, 25 이상을 비만으로 봅니다 — WHO 국제 기준(25·30)보다 낮습니다.',
      note: 'BMI는 근육과 지방을 구분하지 못합니다. 운동량이 많은 사람은 실제보다 높게 나옵니다.' },
    en: { title: 'BMI Calculator', desc: 'Get your body mass index and ideal weight from height and weight.',
      long: 'BMI is weight divided by height in metres squared. The Asia-Pacific cut-offs treat 23 as overweight and 25 as obese — lower than the WHO international values of 25 and 30.',
      note: 'BMI cannot tell muscle from fat, so it reads high for people who train heavily.' },
    zh: { title: 'BMI计算器', desc: '用身高和体重算出身体质量指数与标准体重。',
      long: 'BMI是体重除以身高(米)的平方。亚太标准以23为超重、25为肥胖 — 低于WHO国际标准的25和30。',
      note: 'BMI无法区分肌肉和脂肪，训练量大的人测出的数值会偏高。' },
  },
  {
    slug: 'ideal-weight',
    icon: '🎯',
    category: '체중·체형',
    fields: [
      { key: 'height', term: 'heightCm', def: 170, min: 100, max: 250 },
      { key: 'sex', term: 'sexFactor', def: 1, min: 0, max: 1, step: 1 },
    ],
    formula: '{idealWeight} = 22 × ({heightCm} ÷ 100)²',
    compute: v => {
      const m = v.height / 100;
      const bmi22 = 22 * m ** 2;
      // Devine 공식 — 임상 약용량 계산에 아직 쓰인다
      const devine = v.sex >= 0.5 ? 50 + 0.9 * (v.height - 152.4) : 45.5 + 0.9 * (v.height - 152.4);
      return [
        { term: 'idealWeight', unit: 'kg', value: round(bmi22, 1), digits: 1, primary: true },
        { term: 'result', unit: 'kg', value: round(devine, 1), digits: 1 },
      ];
    },
    ko: { title: '표준 체중 계산기', desc: 'BMI 22 기준 표준 체중과 Devine 공식 값을 함께 봅니다.',
      long: 'BMI 22는 사망률이 가장 낮은 구간이라 표준 체중의 기준으로 쓰입니다. 아래 값은 병원에서 약 용량을 정할 때 쓰는 Devine 공식 결과입니다.',
      note: '표준 체중은 목표가 아니라 참고선입니다. 골격과 근육량에 따라 건강한 체중은 사람마다 다릅니다.' },
    en: { title: 'Ideal Weight Calculator', desc: 'See ideal weight at BMI 22 alongside the clinical Devine formula.',
      long: 'BMI 22 sits near the lowest-mortality range, which is why it is used as a reference weight. The second figure is the Devine formula hospitals use for drug dosing.',
      note: 'Ideal weight is a reference line, not a goal — a healthy weight varies with frame and muscle mass.' },
    zh: { title: '标准体重计算器', desc: '同时给出BMI 22对应的标准体重和临床Devine公式值。',
      long: 'BMI 22接近死亡率最低区间，因此被用作参考体重。第二个数值是医院用于计算药物剂量的Devine公式结果。',
      note: '标准体重是参考线而非目标 — 健康体重会因骨架和肌肉量而异。' },
  },
  {
    slug: 'bmi-target-weight',
    icon: '📉',
    category: '체중·체형',
    fields: [
      { key: 'height', term: 'heightCm', def: 170, min: 100, max: 250 },
      { key: 'weight', term: 'weightKgB', def: 80, min: 10, max: 300 },
      { key: 'target', term: 'bmiTarget', def: 23, min: 15, max: 40, step: 0.5 },
    ],
    formula: '{targetWeight} = {bmiTarget} × ({heightCm} ÷ 100)²',
    compute: v => {
      const tw = v.target * (v.height / 100) ** 2;
      return [
        { term: 'targetWeight', unit: 'kg', value: round(tw, 1), digits: 1, primary: true },
        { term: 'diff', unit: 'kg', value: round(v.weight - tw, 1), digits: 1 },
        { term: 'bmi', value: round(bmiOf(v.weight, v.height), 1), digits: 1 },
      ];
    },
    ko: { title: '목표 BMI 체중 계산기', desc: '원하는 BMI에 닿으려면 체중이 몇 kg이어야 하는지 역산합니다.',
      long: '목표 BMI에 키(m)의 제곱을 곱하면 그 BMI가 되는 체중입니다. 현재 체중과의 차이가 감량 또는 증량해야 할 양입니다.',
      note: '한 달에 체중의 4% 이상을 줄이면 근육 손실이 커집니다. 목표까지 기간을 넉넉히 잡으세요.' },
    en: { title: 'Target Weight for a BMI', desc: 'Work backwards from a BMI goal to the weight it requires.',
      long: 'Multiply the target BMI by height in metres squared to get the weight that produces it. The gap from your current weight is what you need to lose or gain.',
      note: 'Losing more than about 4% of body weight a month costs muscle — give the goal enough time.' },
    zh: { title: '目标BMI体重计算器', desc: '想达到某个BMI，体重需要是多少公斤？',
      long: '把目标BMI乘以身高(米)的平方，就是达到该BMI的体重。与当前体重的差额就是需要减掉或增加的量。',
      note: '每月减重超过体重的4%会明显流失肌肉 — 请给目标留足时间。' },
  },
  {
    slug: 'body-fat-navy',
    icon: '📏',
    category: '체중·체형',
    fields: [
      { key: 'sex', term: 'sexFactor', def: 1, min: 0, max: 1, step: 1 },
      { key: 'height', term: 'heightCm', def: 175, min: 100, max: 250 },
      { key: 'waist', term: 'waistCm', def: 85, min: 40, max: 200 },
      { key: 'neck', term: 'neckCm', def: 38, min: 20, max: 80 },
    ],
    formula: '{bodyFat} = 495 ÷ (1.0324 − 0.19077·log({waistCm}−{neckCm}) + 0.15456·log({heightCm})) − 450',
    compute: v => {
      const log10 = (x: number) => (x > 0 ? Math.log10(x) : 0);
      const male = v.sex >= 0.5;
      const gap = Math.max(1, v.waist - v.neck);
      const pct = male
        ? 495 / (1.0324 - 0.19077 * log10(gap) + 0.15456 * log10(v.height)) - 450
        : 495 / (1.29579 - 0.35004 * log10(gap) + 0.221 * log10(v.height)) - 450;
      return [
        { term: 'bodyFat', unit: 'percent', value: round(Math.max(0, pct), 1), digits: 1, primary: true },
      ];
    },
    verdict: (v, out) => {
      const p = out[0].value;
      const male = v.sex >= 0.5;
      const high = male ? 25 : 32;
      const low = male ? 10 : 18;
      const ok = p >= low && p < high;
      return {
        ko: ok ? `${p}%는 통상 권장 범위 안입니다.` : p >= high ? `${p}%는 권장 범위(${low}~${high}%)보다 높습니다.` : `${p}%는 권장 범위보다 낮습니다.`,
        en: ok ? `${p}% falls inside the usual healthy range.` : p >= high ? `${p}% is above the usual range of ${low}–${high}%.` : `${p}% is below the usual healthy range.`,
        zh: ok ? `${p}%在通常的健康范围内。` : p >= high ? `${p}%高于通常范围(${low}~${high}%)。` : `${p}%低于通常的健康范围。`,
        tone: ok ? 'good' : 'warn',
      };
    },
    ko: { title: '체지방률 계산기(해군식)', desc: '줄자만으로 체지방률을 추정하는 미 해군 공식입니다.',
      long: '허리와 목의 둘레 차이, 그리고 키를 로그로 넣어 체지방률을 추정합니다. 여성은 엉덩이둘레를 포함한 별도 계수를 씁니다.',
      note: '추정값입니다. 오차가 3~4%p 정도 있으니 절대 수치보다 변화 추이를 보세요.' },
    en: { title: 'Body Fat (Navy Method)', desc: 'Estimate body fat percentage using only a tape measure.',
      long: 'The US Navy formula takes the waist-minus-neck girth and your height through logarithms to estimate fat percentage. The female version uses different coefficients.',
      note: 'This is an estimate with roughly 3–4 points of error — watch the trend rather than the absolute number.' },
    zh: { title: '体脂率计算器(海军法)', desc: '只用一把软尺估算体脂率的美国海军公式。',
      long: '该公式把「腰围减颈围」和身高取对数来估算体脂率。女性版本使用不同的系数。',
      note: '这是估算值，误差约3~4个百分点 — 请关注变化趋势而非绝对数字。' },
  },
  {
    slug: 'lean-mass',
    icon: '💪',
    category: '체중·체형',
    fields: [
      { key: 'weight', term: 'weightKgB', def: 70, min: 10, max: 300 },
      { key: 'fat', term: 'bodyFat', unit: 'percent', def: 20, min: 1, max: 70, step: 0.5 },
    ],
    formula: '{leanMass} = {weightKgB} × (1 − {bodyFat} ÷ 100)',
    compute: v => {
      const fatMass = v.weight * (v.fat / 100);
      return [
        { term: 'leanMass', unit: 'kg', value: round(v.weight - fatMass, 1), digits: 1, primary: true },
        { term: 'fatMass', unit: 'kg', value: round(fatMass, 1), digits: 1 },
      ];
    },
    ko: { title: '제지방량 계산기', desc: '체중과 체지방률로 근육·뼈를 포함한 제지방량을 구합니다.',
      long: '체중에서 체지방을 뺀 나머지가 제지방량입니다. 감량할 때 이 값이 유지되면 지방만 빠졌다는 뜻입니다.',
      note: '단백질 섭취와 근력 운동 없이 감량하면 제지방량도 함께 줄어듭니다.' },
    en: { title: 'Lean Body Mass', desc: 'Get lean mass — muscle and bone — from weight and body fat percentage.',
      long: 'Lean mass is what remains after subtracting fat. If it holds steady while you lose weight, you lost fat and not muscle.',
      note: 'Cutting weight without protein and resistance training takes lean mass down with the fat.' },
    zh: { title: '去脂体重计算器', desc: '用体重和体脂率算出包含肌肉与骨骼的去脂体重。',
      long: '体重减去脂肪剩下的就是去脂体重。减重期间它保持不变，说明减掉的是脂肪而不是肌肉。',
      note: '减重时若不补充蛋白质、不做力量训练，去脂体重也会一起下降。' },
  },
  {
    slug: 'whr',
    icon: '🔄',
    category: '체중·체형',
    fields: [
      { key: 'waist', term: 'waistCm', def: 85, min: 40, max: 200 },
      { key: 'hip', term: 'hipCm', def: 96, min: 40, max: 200 },
      { key: 'sex', term: 'sexFactor', def: 1, min: 0, max: 1, step: 1 },
    ],
    formula: '{whr} = {waistCm} ÷ {hipCm}',
    compute: v => [
      { term: 'whr', value: round(ratio(v.waist, v.hip), 3), digits: 3, primary: true },
      { term: 'diff', unit: 'cm', value: round(v.hip - v.waist, 1), digits: 1 },
    ],
    verdict: (v, out) => {
      const r = out[0].value;
      const limit = v.sex >= 0.5 ? 0.9 : 0.85;
      const ok = r < limit;
      return {
        ko: ok ? `${r}은 기준선 ${limit} 아래입니다.` : `${r}은 복부 비만 기준 ${limit}을 넘었습니다.`,
        en: ok ? `${r} is below the ${limit} threshold.` : `${r} exceeds the abdominal-obesity threshold of ${limit}.`,
        zh: ok ? `${r}低于${limit}的界值。` : `${r}超过了腹型肥胖界值${limit}。`,
        tone: ok ? 'good' : 'bad',
      };
    },
    ko: { title: '허리-엉덩이 비율(WHR)', desc: '복부에 지방이 몰렸는지 보는 지표입니다.',
      long: 'WHO는 남성 0.90, 여성 0.85 이상을 복부 비만으로 봅니다. 같은 BMI라도 WHR이 높으면 심혈관 위험이 큽니다.',
      note: '허리는 배꼽 높이, 엉덩이는 가장 튀어나온 부분에서 재고, 숨을 내쉰 상태로 측정합니다.' },
    en: { title: 'Waist-to-Hip Ratio', desc: 'Check whether fat is concentrated around your abdomen.',
      long: 'The WHO treats 0.90 for men and 0.85 for women as abdominal obesity. At the same BMI, a higher ratio carries greater cardiovascular risk.',
      note: 'Measure the waist at navel height and the hips at their widest point, after breathing out.' },
    zh: { title: '腰臀比计算器', desc: '判断脂肪是否集中在腹部的指标。',
      long: 'WHO将男性0.90、女性0.85以上视为腹型肥胖。BMI相同时，腰臀比更高意味着心血管风险更大。',
      note: '腰围在肚脐高度测量，臀围在最宽处测量，测时呼气放松。' },
  },
  {
    slug: 'whtr',
    icon: '📐',
    category: '체중·체형',
    fields: [
      { key: 'waist', term: 'waistCm', def: 85, min: 40, max: 200 },
      { key: 'height', term: 'heightCm', def: 170, min: 100, max: 250 },
    ],
    formula: '{whtr} = {waistCm} ÷ {heightCm}',
    compute: v => [
      { term: 'whtr', value: round(ratio(v.waist, v.height), 3), digits: 3, primary: true },
      { term: 'result', unit: 'cm', value: round(v.height / 2, 1), digits: 1 },
    ],
    verdict: (v, out) => {
      const r = out[0].value;
      const ok = r < 0.5;
      return {
        ko: ok ? `${r}로 0.5 아래입니다 — 허리가 키의 절반보다 짧습니다.` : `${r}로 0.5를 넘었습니다 — 허리가 키의 절반보다 굵습니다.`,
        en: ok ? `${r} is under 0.5 — your waist is less than half your height.` : `${r} is over 0.5 — your waist exceeds half your height.`,
        zh: ok ? `${r}低于0.5 — 腰围小于身高的一半。` : `${r}高于0.5 — 腰围超过身高的一半。`,
        tone: ok ? 'good' : 'bad',
      };
    },
    ko: { title: '허리-키 비율(WHtR)', desc: '허리둘레가 키의 절반을 넘는지 확인합니다.',
      long: '"허리둘레를 키의 절반 아래로"라는 단순한 기준입니다. BMI보다 심혈관·대사 질환 위험을 잘 예측한다는 연구가 여러 편 있습니다.',
      note: '어린이와 성인 모두 0.5를 기준선으로 씁니다. 단위는 cm든 인치든 비율이라 상관없습니다.' },
    en: { title: 'Waist-to-Height Ratio', desc: 'Check whether your waist is more than half your height.',
      long: 'The rule is simply "keep your waist under half your height". Several studies find it predicts cardiometabolic risk better than BMI.',
      note: 'The 0.5 line applies to both children and adults, and the units cancel out — centimetres or inches both work.' },
    zh: { title: '腰高比计算器', desc: '看腰围是否超过身高的一半。',
      long: '规则很简单：「腰围保持在身高的一半以下」。多项研究发现它比BMI更能预测心血管与代谢风险。',
      note: '0.5这条界线对儿童和成人都适用，单位会约掉 — 用厘米或英寸都可以。' },
  },
  {
    slug: 'bsa',
    icon: '🧑‍⚕️',
    category: '체중·체형',
    fields: [
      { key: 'height', term: 'heightCm', def: 170, min: 30, max: 250 },
      { key: 'weight', term: 'weightKgB', def: 65, min: 2, max: 300 },
    ],
    formula: '{bsa} = 0.007184 × {heightCm}^0.725 × {weightKgB}^0.425',
    compute: v => {
      const duBois = 0.007184 * v.height ** 0.725 * v.weight ** 0.425;
      const mosteller = Math.sqrt((v.height * v.weight) / 3600);
      return [
        { term: 'bsa', unit: 'm2', value: round(duBois, 3), digits: 3, primary: true },
        { term: 'result', unit: 'm2', value: round(mosteller, 3), digits: 3 },
      ];
    },
    ko: { title: '체표면적 계산기', desc: '항암제 용량 등에 쓰이는 체표면적을 Du Bois·Mosteller 두 식으로 구합니다.',
      long: '체표면적은 체중보다 대사량과 잘 비례해서 약 용량 기준으로 쓰입니다. Du Bois 식이 고전이고, 암산이 쉬운 Mosteller 식도 널리 쓰입니다.',
      note: '실제 투여량은 반드시 처방에 따릅니다. 이 값은 처방 내용을 이해하기 위한 참고용입니다.' },
    en: { title: 'Body Surface Area', desc: 'Calculate BSA — used for chemotherapy dosing — with both Du Bois and Mosteller.',
      long: 'BSA tracks metabolic rate better than weight does, which is why drug doses are scaled to it. Du Bois is the classic formula; Mosteller is easier to compute and also widely used.',
      note: 'Actual dosing must follow the prescription — this figure is for understanding it, not for setting it.' },
    zh: { title: '体表面积计算器', desc: '用Du Bois和Mosteller两个公式算出化疗给药常用的体表面积。',
      long: '体表面积比体重更贴合代谢率，所以药物剂量常按它折算。Du Bois是经典公式，Mosteller更易心算也广泛使用。',
      note: '实际给药必须遵照处方 — 此数值仅用于理解处方，不能用于自行决定剂量。' },
  },
  {
    slug: 'ponderal-index',
    icon: '🧮',
    category: '체중·체형',
    fields: [
      { key: 'height', term: 'heightCm', def: 170, min: 30, max: 250 },
      { key: 'weight', term: 'weightKgB', def: 65, min: 2, max: 300 },
    ],
    formula: '{ponderal} = {weightKgB} ÷ ({heightCm} ÷ 100)³',
    compute: v => [
      { term: 'ponderal', value: round(ratio(v.weight, (v.height / 100) ** 3), 2), digits: 2, primary: true },
      { term: 'bmi', value: round(bmiOf(v.weight, v.height), 1), digits: 1 },
    ],
    ko: { title: '신체충실지수(PI)', desc: '키의 세제곱으로 나누는 지수로, 키가 아주 크거나 작을 때 BMI를 보완합니다.',
      long: 'BMI는 키의 제곱으로 나누기 때문에 키가 큰 사람에게 불리하고 작은 사람에게 유리하게 나옵니다. 세제곱으로 나누는 PI는 그 왜곡이 적습니다.',
      note: '성인 기준 대략 11~15가 정상 범위로 쓰이지만 BMI만큼 표준화된 기준은 없습니다.' },
    en: { title: 'Ponderal Index', desc: 'A height-cubed index that corrects BMI at extreme heights.',
      long: 'Because BMI divides by height squared, it penalises tall people and flatters short ones. The Ponderal Index divides by height cubed and distorts less.',
      note: 'Roughly 11–15 is treated as normal in adults, but the cut-offs are far less standardised than BMI.' },
    zh: { title: '体质指数(PI)', desc: '按身高立方计算的指数，弥补BMI在极端身高时的偏差。',
      long: 'BMI除以身高的平方，因此对高个子偏严、对矮个子偏松。PI除以身高的立方，这种失真更小。',
      note: '成人大致以11~15为正常范围，但其界值远不如BMI标准化。' },
  },
  {
    slug: 'adjusted-weight',
    icon: '🏥',
    category: '체중·체형',
    fields: [
      { key: 'height', term: 'heightCm', def: 165, min: 100, max: 250 },
      { key: 'weight', term: 'weightKgB', def: 95, min: 10, max: 300 },
      { key: 'sex', term: 'sexFactor', def: 1, min: 0, max: 1, step: 1 },
    ],
    formula: '{result} = {idealWeight} + 0.4 × ({weightKgB} − {idealWeight})',
    compute: v => {
      const devine = v.sex >= 0.5 ? 50 + 0.9 * (v.height - 152.4) : 45.5 + 0.9 * (v.height - 152.4);
      const adjusted = devine + 0.4 * (v.weight - devine);
      return [
        { term: 'result', unit: 'kg', value: round(adjusted, 1), digits: 1, primary: true },
        { term: 'idealWeight', unit: 'kg', value: round(devine, 1), digits: 1 },
      ];
    },
    ko: { title: '조정 체중 계산기', desc: '비만인 경우 약 용량 계산에 쓰는 조정 체중을 구합니다.',
      long: '지방 조직에도 약이 일부 분포하므로, 표준 체중에 초과분의 40%를 더해 씁니다. 실제 체중을 그대로 쓰면 과다 투여가 될 수 있습니다.',
      note: '표준 체중보다 30% 이상 무거울 때 주로 씁니다. 약물마다 기준 체중이 달라 처방을 따라야 합니다.' },
    en: { title: 'Adjusted Body Weight', desc: 'Compute the adjusted weight used for drug dosing in obesity.',
      long: 'Because drugs distribute partly into fat tissue, dosing uses ideal weight plus 40% of the excess. Using actual weight can overdose.',
      note: 'It is typically applied above about 130% of ideal weight, and the right weight metric differs by drug — follow the prescription.' },
    zh: { title: '调整体重计算器', desc: '算出肥胖者给药时使用的调整体重。',
      long: '药物会部分分布到脂肪组织，因此按「标准体重加上超出部分的40%」计算。直接用实际体重可能导致过量。',
      note: '一般在超过标准体重约30%时使用，且不同药物采用的体重指标不同 — 请遵照处方。' },
  },
];
