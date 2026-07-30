/**
 * 몸 수치 - 대사·칼로리 둘째 묶음 (10종)
 *
 * 하루에 얼마를 쓰는지는 첫 묶음이 다뤘다. 여기는 그 열량을 무엇으로 채울지 —
 * 단백질·섬유·당류·나트륨·카페인의 양과 상한이다.
 */
import type { FormulaTool } from '../formula/types.ts';
import { ratio } from '../formula/types.ts';
import { round } from '../formula/num.ts';

export const METABOLISM2_TOOLS: FormulaTool[] = [
  {
    slug: 'bmr-mifflin',
    icon: '🔥',
    category: '대사·칼로리',
    fields: [
      { key: 'kg', term: 'weightKgB', unit: 'kg', def: 70, min: 1 },
      { key: 'cm', term: 'heightCm', unit: 'cm', def: 172, min: 50 },
      { key: 'age', term: 'ageYears', def: 35, min: 5, max: 100 },
      { key: 'sex', term: 'sexFactor', def: 1, min: 0, max: 1 },
    ],
    formula: '{bmrMifflin} = 10 × {weightKgB} + 6.25 × {heightCm} − 5 × {ageYears} + (5 × {sexFactor} − 161 × (1 − {sexFactor}))',
    compute: v => {
      const base = 10 * v.kg + 6.25 * v.cm - 5 * v.age;
      const bmr = base + (v.sex === 1 ? 5 : -161);
      return [
        { term: 'bmrMifflin', unit: 'kcal', value: Math.round(bmr), digits: 0, primary: true },
        { term: 'kcalPerKg', unit: 'kcal', value: round(ratio(bmr, v.kg), 1), digits: 1 },
        { term: 'tdee', unit: 'kcal', value: Math.round(bmr * 1.375), digits: 0 },
      ];
    },
    ko: { title: '기초대사량 (미플린-세인트 지어)', desc: '가장 널리 쓰이는 공식으로 하루 최소 소비 열량을 구합니다.',
      long: '1990년에 나온 이 식은 지금 임상과 앱에서 표준으로 쓰입니다. 해리스-베네딕트보다 현대인의 실측값에 가깝고, 보통 5% 정도 낮게 나옵니다.',
      note: '기초대사량은 누워서 아무것도 안 할 때의 값입니다. 실제로 먹어야 할 양은 여기에 활동계수를 곱한 뒤에 나옵니다.' },
    en: { title: 'BMR (Mifflin–St Jeor)', desc: 'The most widely used formula for daily resting calories.',
      long: 'Published in 1990, this is now the clinical and app standard. It tracks modern measurements better than Harris–Benedict and typically comes out about 5% lower.',
      note: 'BMR is what you burn lying still doing nothing. What you should actually eat only appears after multiplying by an activity factor.' },
    zh: { title: '基础代谢率（Mifflin-St Jeor）', desc: '用最通行的公式计算每日最低消耗热量。',
      long: '这个1990年提出的公式如今是临床与应用程序的标准，比Harris-Benedict更贴近现代人的实测值，通常低约5%。',
      note: '基础代谢率是完全静卧时的消耗。真正该吃多少，要再乘以活动系数才能得出。' },
  },
  {
    slug: 'calorie-surplus-gain',
    icon: '📈',
    category: '대사·칼로리',
    fields: [
      { key: 'surplus', term: 'surplus', unit: 'kcal', def: 300, min: 0, max: 2000 },
      { key: 'weeks', term: 'weeksNeeded', unit: 'week', def: 12, min: 1, max: 104 },
    ],
    formula: '{gainPerWeek} = {surplus} × 7 ÷ 7700',
    compute: v => {
      const perWeek = v.surplus * 7 / 7700;
      return [
        { term: 'gainPerWeek', unit: 'kg', value: round(perWeek, 3), digits: 3, primary: true },
        { term: 'diff', unit: 'kg', value: round(perWeek * v.weeks, 2), digits: 2 },
        { term: 'calories', unit: 'kcal', value: Math.round(v.surplus * 7 * v.weeks), digits: 0 },
      ];
    },
    verdict: (_v, out) => {
      const w = out[0].value;
      return w <= 0.35
        ? { ko: `주당 ${w}kg은 지방이 덜 붙는 속도입니다. 근력 운동과 함께면 대부분 근육으로 갑니다.`, en: `${w} kg a week is the lean-gain pace; with resistance training most of it is muscle.`, zh: `每周${w}公斤属于增肌不易堆脂的速度，配合力量训练大部分会转为肌肉。`, tone: 'good' }
        : { ko: `주당 ${w}kg은 빠릅니다. 늘어난 무게의 절반 이상이 지방일 수 있습니다.`, en: `${w} kg a week is fast — over half of it may be fat.`, zh: `每周${w}公斤偏快，增加的重量中可能过半是脂肪。`, tone: 'warn' };
    },
    ko: { title: '증량 속도 계산기', desc: '하루 잉여 열량으로 주당 몇 kg 늘어나는지 계산합니다.',
      long: '체중 1kg을 늘리는 데 약 7,700kcal이 필요하다고 봅니다. 하루 잉여를 7배 해 한 주치로 만들고 7,700으로 나눕니다. 하루 300kcal이면 주당 약 0.27kg입니다.',
      note: '7,700kcal은 지방 1kg 기준이라 근육이 늘 때는 오차가 있습니다. 실제 증가폭은 개인의 대사 적응에 따라 이 값의 절반에서 두 배까지 벌어집니다.' },
    en: { title: 'Weight Gain from a Surplus', desc: 'How fast you gain from a given daily calorie surplus.',
      long: 'A kilogram of body weight is treated as roughly 7,700 kcal. Multiply the daily surplus by seven for a week and divide. A 300 kcal surplus gives about 0.27 kg a week.',
      note: 'The 7,700 figure is for fat, so muscle gain deviates. Real-world gain ranges from half to double this depending on metabolic adaptation.' },
    zh: { title: '增重速度计算器', desc: '按每日热量盈余算出每周增重多少公斤。',
      long: '增加1公斤体重约需7700千卡。把每日盈余乘以7得到一周，再除以7700。每日盈余300千卡约为每周0.27公斤。',
      note: '7700千卡是按脂肪计的，增肌时会有偏差。实际增幅因代谢适应差异，可能在此值的一半到两倍之间。' },
  },
  {
    slug: 'weekly-loss-target',
    icon: '🎯',
    category: '대사·칼로리',
    fields: [
      { key: 'perWeek', term: 'lossPerWeek', unit: 'kg', def: 0.5, min: 0.05, max: 2 },
      { key: 'tdee', term: 'tdee', unit: 'kcal', def: 2400, min: 800 },
    ],
    formula: '{needDeficit} = {lossPerWeek} × 7700 ÷ 7',
    compute: v => {
      const deficit = v.perWeek * 7700 / 7;
      return [
        { term: 'needDeficit', unit: 'kcal', value: Math.round(deficit), digits: 0, primary: true },
        { term: 'calories', unit: 'kcal', value: Math.round(v.tdee - deficit), digits: 0 },
        { term: 'percent', unit: 'percent', value: round(ratio(deficit, v.tdee) * 100, 1), digits: 1 },
      ];
    },
    verdict: (v, out) => {
      const eat = out[1].value;
      const pct = out[2].value;
      return eat < 1200
        ? { ko: `하루 ${eat}kcal은 너무 적습니다. 목표 속도를 낮추거나 활동량을 늘려 적자를 만드세요.`, en: `Eating ${eat} kcal a day is too little — slow the target or add activity instead.`, zh: `每天只吃${eat}千卡过少，请放慢目标或通过增加活动来制造缺口。`, tone: 'bad' }
        : pct > 25
          ? { ko: `소비의 ${pct}%를 깎는 것은 큽니다. 20% 안쪽이 지키기 쉽습니다.`, en: `Cutting ${pct}% of your burn is steep; under 20% is easier to sustain.`, zh: `削减消耗的${pct}%偏大，控制在20%以内更容易坚持。`, tone: 'warn' }
          : { ko: `하루 ${out[0].value}kcal 적자, 섭취 ${eat}kcal이면 무리 없는 속도입니다.`, en: `A ${out[0].value} kcal deficit eating ${eat} kcal a day is a sustainable pace.`, zh: `每日缺口${out[0].value}千卡、摄入${eat}千卡，属于可持续的速度。`, tone: 'good' };
    },
    ko: { title: '주당 감량 목표 → 필요 적자', desc: '주당 몇 kg을 빼려면 하루에 얼마를 줄여야 하는지 계산합니다.',
      long: '주당 목표에 7,700을 곱해 한 주에 필요한 적자를 만들고 7로 나눕니다. 주 0.5kg이면 하루 약 550kcal입니다. 소비 열량에서 그만큼 뺀 값이 먹어야 할 양입니다.',
      note: '적자를 먹는 양만으로 만들면 기초대사량이 떨어집니다. 절반은 활동으로 만드는 편이 정체기를 늦춥니다.' },
    en: { title: 'Weekly Loss Target to Daily Deficit', desc: 'The daily cut needed for a given weekly weight loss.',
      long: 'Multiply the weekly target by 7,700 for the week’s deficit, then divide by seven. Half a kilogram a week needs about 550 kcal a day. Subtract that from your burn to get what to eat.',
      note: 'Making the whole deficit by eating less drives resting metabolism down. Building half of it from activity delays the plateau.' },
    zh: { title: '每周减重目标换算每日缺口', desc: '算出每周减指定公斤数所需的每日热量缺口。',
      long: '把每周目标乘以7700得到一周所需缺口，再除以7。每周0.5公斤约需每日550千卡。用总消耗减去它，就是应摄入的热量。',
      note: '全靠少吃制造缺口会压低基础代谢，其中一半由活动来完成能延后平台期。' },
  },
  {
    slug: 'food-burn-time',
    icon: '🏃',
    category: '대사·칼로리',
    fields: [
      { key: 'kcal', term: 'foodKcal', unit: 'kcal', def: 500, min: 0 },
      { key: 'kg', term: 'weightKgB', unit: 'kg', def: 70, min: 1 },
      { key: 'met', term: 'metValue', def: 7, min: 1, max: 20 },
    ],
    formula: '{burnMinutes} = {foodKcal} ÷ ({metValue} × 3.5 × {weightKgB} ÷ 200)',
    compute: v => {
      const perMin = v.met * 3.5 * v.kg / 200;
      return [
        { term: 'burnMinutes', unit: 'minute', value: Math.round(ratio(v.kcal, perMin)), digits: 0, primary: true },
        { term: 'calories', unit: 'kcal', value: round(perMin, 1), digits: 1 },
        { term: 'hours', unit: 'hour', value: round(ratio(v.kcal, perMin * 60), 2), digits: 2 },
      ];
    },
    ko: { title: '음식 열량 태우는 시간', desc: '먹은 열량을 운동으로 태우려면 몇 분이 걸리는지 계산합니다.',
      long: 'MET는 가만히 있을 때의 몇 배로 힘든 운동인지를 나타냅니다. 걷기 3, 조깅 7, 달리기 10 정도입니다. 체중과 MET로 분당 소비를 만들고 음식 열량을 나눕니다.',
      note: '"이거 태우려면 한 시간 달려야 한다"는 계산은 먹는 쪽을 줄이는 게 훨씬 쉽다는 뜻이기도 합니다. 운동은 열량보다 다른 이유로 하는 편이 낫습니다.' },
    en: { title: 'Time to Burn a Food’s Calories', desc: 'How many minutes of exercise a snack costs.',
      long: 'A MET is how many times harder than sitting still an activity is: walking about 3, jogging 7, running 10. Weight and MET give calories a minute; divide the food by it.',
      note: 'The “you would have to run an hour” figure also shows how much easier it is to eat less. Exercise for the other reasons, not the arithmetic.' },
    zh: { title: '消耗食物热量所需时间', desc: '算出用运动消耗掉一份食物的热量需要多少分钟。',
      long: 'MET表示某项活动相当于静坐的多少倍强度：步行约3，慢跑7，跑步10。用体重和MET得出每分钟消耗，再用食物热量去除。',
      note: '“要跑一小时才能消耗掉”这个数字，也说明少吃比多动容易得多。运动更适合为了别的理由去做。' },
  },
  {
    slug: 'bmr-per-kg',
    icon: '🌡️',
    category: '대사·칼로리',
    fields: [
      { key: 'bmr', term: 'bmrMifflin', unit: 'kcal', def: 1600, min: 500 },
      { key: 'kg', term: 'weightKgB', unit: 'kg', def: 70, min: 1 },
    ],
    formula: '{kcalPerKg} = {bmrMifflin} ÷ {weightKgB}',
    compute: v => [
      { term: 'kcalPerKg', unit: 'kcal', value: round(ratio(v.bmr, v.kg), 2), digits: 2, primary: true },
      { term: 'bmrMifflin', unit: 'kcal', value: Math.round(v.bmr), digits: 0 },
      { term: 'hours', unit: 'kcal', value: round(ratio(v.bmr, 24), 1), digits: 1 },
    ],
    verdict: (_v, out) => {
      const k = out[0].value;
      return k >= 22
        ? { ko: `체중 1kg당 ${k}kcal은 높은 편입니다. 근육 비율이 높거나 젊은 편입니다.`, en: `${k} kcal per kilogram is on the high side — more muscle or a younger body.`, zh: `每公斤${k}千卡偏高，通常见于肌肉比例高或较年轻的人。`, tone: 'good' }
        : k >= 18
          ? { ko: `체중 1kg당 ${k}kcal은 보통 범위입니다.`, en: `${k} kcal per kilogram is a typical range.`, zh: `每公斤${k}千卡属于常见范围。`, tone: 'good' }
          : { ko: `체중 1kg당 ${k}kcal은 낮은 편입니다. 근육이 적거나 나이가 있는 경우입니다.`, en: `${k} kcal per kilogram is low — less muscle, or an older body.`, zh: `每公斤${k}千卡偏低，多见于肌肉较少或年龄较大者。`, tone: 'warn' };
    },
    ko: { title: '체중당 기초대사량 계산기', desc: '기초대사량을 체중으로 나눠 대사가 활발한지 봅니다.',
      long: '몸무게가 다른 사람끼리 기초대사량을 그냥 비교할 수는 없습니다. 체중으로 나누면 같은 자로 잴 수 있고, 보통 성인은 kg당 20kcal 안팎입니다.',
      note: '근육은 지방보다 대사가 활발하므로 체지방률이 낮으면 이 값이 올라갑니다. 같은 체중에서 값이 높으면 근육이 많다는 뜻입니다.' },
    en: { title: 'BMR per Kilogram', desc: 'Divide resting calories by weight to see how active your metabolism runs.',
      long: 'You cannot compare two people’s BMR directly when they weigh different amounts. Dividing by weight puts them on one scale; most adults land near 20 kcal per kilogram.',
      note: 'Muscle burns more than fat, so a lower body-fat percentage raises this. At the same weight, a higher figure means more muscle.' },
    zh: { title: '每公斤基础代谢率', desc: '把基础代谢率除以体重，看代谢是否活跃。',
      long: '体重不同的人之间不能直接比较基础代谢率。除以体重后就能用同一把尺衡量，多数成年人在每公斤20千卡左右。',
      note: '肌肉的代谢比脂肪活跃，体脂率低会拉高这个数值。同样体重下数值更高，意味着肌肉更多。' },
  },
  {
    slug: 'protein-per-meal',
    icon: '🍗',
    category: '대사·칼로리',
    fields: [
      { key: 'kg', term: 'weightKgB', unit: 'kg', def: 70, min: 1 },
      { key: 'perKg', term: 'gPerKg', def: 1.6, min: 0.5, max: 3 },
      { key: 'meals', term: 'mealsPerDay', def: 4, min: 1, max: 8 },
    ],
    formula: '{proteinPerMeal} = {weightKgB} × {gPerKg} ÷ {mealsPerDay}',
    compute: v => {
      const daily = v.kg * v.perKg;
      return [
        { term: 'proteinPerMeal', unit: 'gram', value: round(ratio(daily, v.meals), 1), digits: 1, primary: true },
        { term: 'proteinG', unit: 'gram', value: round(daily, 1), digits: 1 },
        { term: 'calories', unit: 'kcal', value: Math.round(daily * 4), digits: 0 },
      ];
    },
    verdict: (_v, out) => {
      const per = out[0].value;
      return per >= 20 && per <= 45
        ? { ko: `한 끼 ${per}g은 근육 합성이 잘 도는 구간입니다.`, en: `${per} g a meal sits in the range that drives muscle synthesis well.`, zh: `每餐${per}克处于有效促进肌肉合成的区间。`, tone: 'good' }
        : per < 20
          ? { ko: `한 끼 ${per}g은 적습니다. 끼니를 줄여 한 번에 20g 이상 모으는 편이 낫습니다.`, en: `${per} g a meal is low; fewer, larger meals clearing 20 g work better.`, zh: `每餐${per}克偏少，减少餐数、单餐达到20克以上更有效。`, tone: 'warn' }
          : { ko: `한 끼 ${per}g은 많습니다. 한 번에 다 쓰지 못하므로 끼니를 나누는 편이 낫습니다.`, en: `${per} g in one sitting is more than the body uses at once — spread it out.`, zh: `单餐${per}克超过身体一次能利用的量，建议分餐。`, tone: 'warn' };
    },
    ko: { title: '한 끼 단백질 배분 계산기', desc: '하루 단백질을 끼니 수로 나눠 한 끼에 얼마씩 먹을지 정합니다.',
      long: '하루 총량만 맞추는 것보다 끼니마다 20~40g씩 고르게 나누는 편이 근육 합성에 유리합니다. 체중에 g/kg을 곱해 하루 총량을 만들고 끼니 수로 나눕니다.',
      note: '체중당 1.6g은 근력 운동을 하는 사람 기준입니다. 앉아 지내면 0.8~1.0g, 감량 중이면 1.8~2.2g으로 올려 잡습니다.' },
    en: { title: 'Protein per Meal', desc: 'Split your daily protein across meals.',
      long: 'Spreading protein into 20–40 g servings beats simply hitting a daily total. Multiply weight by grams per kilogram for the day, then divide by meals.',
      note: '1.6 g/kg assumes you lift. Sedentary sits at 0.8–1.0; while cutting, 1.8–2.2 protects muscle better.' },
    zh: { title: '每餐蛋白质分配', desc: '把每日蛋白质按餐数分配，确定每餐吃多少。',
      long: '与只凑够每日总量相比，每餐均匀分成20到40克更有利于肌肉合成。用体重乘以每公斤克数得到每日总量，再除以餐数。',
      note: '每公斤1.6克是按有力量训练者计的。久坐者取0.8至1.0，减脂期可提高到1.8至2.2。' },
  },
  {
    slug: 'fiber-need',
    icon: '🥦',
    category: '대사·칼로리',
    fields: [
      { key: 'kcal', term: 'calories', unit: 'kcal', def: 2200, min: 500 },
    ],
    formula: '{fiberG} = {calories} ÷ 1000 × 14',
    compute: v => [
      { term: 'fiberG', unit: 'gram', value: round(v.kcal / 1000 * 14, 1), digits: 1, primary: true },
      { term: 'fiberPerMeal', unit: 'gram', value: round(v.kcal / 1000 * 14 / 3, 1), digits: 1 },
      { term: 'calories', unit: 'kcal', value: Math.round(v.kcal), digits: 0 },
    ],
    ko: { title: '식이섬유 권장량 계산기', desc: '먹는 열량에 맞춰 하루 식이섬유 목표를 구합니다.',
      long: '열량 1,000kcal마다 14g이 기준입니다. 2,200kcal을 먹으면 약 31g입니다. 열량에 비례하는 기준이라 많이 먹는 사람은 섬유도 더 필요합니다.',
      note: '갑자기 늘리면 가스와 복통이 옵니다. 한 주에 5g씩 올리고 물을 함께 늘리세요.' },
    en: { title: 'Daily Fibre Target', desc: 'Scale your fibre goal to how much you eat.',
      long: 'The reference is 14 g per 1,000 kcal, so 2,200 kcal calls for about 31 g. Because it scales with intake, people who eat more need more fibre.',
      note: 'Ramping up fast brings gas and cramps. Add about 5 g a week, and raise your water at the same time.' },
    zh: { title: '每日膳食纤维目标', desc: '按摄入热量推算每日膳食纤维目标量。',
      long: '标准是每1000千卡14克，摄入2200千卡则约需31克。由于与摄入量成比例，吃得多的人需要的纤维也更多。',
      note: '骤然增加会引起胀气与腹痛。建议每周增加约5克，并同时增加饮水。' },
  },
  {
    slug: 'sugar-limit',
    icon: '🍬',
    category: '대사·칼로리',
    fields: [
      { key: 'kcal', term: 'calories', unit: 'kcal', def: 2000, min: 500 },
      { key: 'pct', term: 'percent', unit: 'percent', def: 10, min: 1, max: 25 },
    ],
    formula: '{sugarLimitG} = {calories} × {percent} ÷ 100 ÷ 4',
    compute: v => {
      const g = v.kcal * (v.pct / 100) / 4;
      return [
        { term: 'sugarLimitG', unit: 'gram', value: round(g, 1), digits: 1, primary: true },
        { term: 'calories', unit: 'kcal', value: Math.round(v.kcal * (v.pct / 100)), digits: 0 },
        { term: 'count', unit: 'none', value: round(ratio(g, 4), 1), digits: 1 },
      ];
    },
    ko: { title: '당류 상한 계산기', desc: '하루 열량의 몇 %까지 당류로 먹어도 되는지 그램으로 바꿉니다.',
      long: '세계보건기구는 첨가당을 하루 열량의 10% 아래, 되도록 5% 아래로 권합니다. 당류 1g은 4kcal이므로 2,000kcal의 10%는 50g입니다. 각설탕 하나가 약 4g입니다.',
      note: '과일에 원래 들어 있는 당은 이 상한에 넣지 않습니다. 상한이 적용되는 것은 조리·가공에서 넣은 첨가당입니다.' },
    en: { title: 'Added Sugar Limit', desc: 'Turn a percentage-of-calories sugar cap into grams.',
      long: 'The WHO advises keeping added sugar under 10% of daily calories, ideally under 5%. Sugar is 4 kcal a gram, so 10% of 2,000 kcal is 50 g — roughly twelve sugar cubes.',
      note: 'Sugar naturally present in whole fruit does not count against this. The cap is for sugar added in cooking and processing.' },
    zh: { title: '添加糖上限计算器', desc: '把“占每日热量百分之几”的糖上限换算成克数。',
      long: '世界卫生组织建议添加糖低于每日热量的10%，最好低于5%。糖每克4千卡，因此2000千卡的10%为50克，约合十二块方糖。',
      note: '水果中天然含有的糖不计入此上限，受限的是烹调与加工中添加的糖。' },
  },
  {
    slug: 'sodium-salt',
    icon: '🧂',
    category: '대사·칼로리',
    fields: [
      { key: 'sodium', term: 'sodiumMg', unit: 'mg', def: 2000, min: 0 },
    ],
    formula: '{saltG} = {sodiumMg} × 2.54 ÷ 1000',
    compute: v => [
      { term: 'saltG', unit: 'gram', value: round(v.sodium * 2.54 / 1000, 2), digits: 2, primary: true },
      { term: 'sodiumMg', unit: 'mg', value: Math.round(v.sodium), digits: 0 },
      { term: 'percent', unit: 'percent', value: round(ratio(v.sodium, 2000) * 100, 0), digits: 0 },
    ],
    verdict: (v) =>
      v.sodium <= 2000
        ? { ko: '세계보건기구 권고인 하루 나트륨 2,000mg 안입니다.', en: 'Inside the WHO guidance of 2,000 mg of sodium a day.', zh: '在世界卫生组织每日钠2000毫克的建议之内。', tone: 'good' }
        : { ko: `권고 2,000mg을 ${Math.round(v.sodium - 2000)}mg 넘겼습니다.`, en: `${Math.round(v.sodium - 2000)} mg over the 2,000 mg guidance.`, zh: `超出2000毫克建议量${Math.round(v.sodium - 2000)}毫克。`, tone: 'warn' },
    ko: { title: '나트륨 ↔ 소금 환산기', desc: '영양표시의 나트륨을 소금 몇 g인지로 바꿉니다.',
      long: '소금은 나트륨과 염소가 결합한 물질이라 나트륨보다 무겁습니다. 나트륨 1g은 소금 약 2.54g에 해당합니다. 영양표시는 나트륨으로, 요리법은 소금으로 적혀 있어 이 환산이 자주 필요합니다.',
      note: '세계보건기구 권고는 나트륨 2,000mg, 소금으로는 약 5g입니다. 국·찌개 한 그릇에 그 절반이 들어 있는 경우가 흔합니다.' },
    en: { title: 'Sodium to Salt Converter', desc: 'Turn the sodium on a label into grams of salt.',
      long: 'Salt is sodium bonded to chloride, so it weighs more: one gram of sodium is about 2.54 g of salt. Labels use sodium while recipes use salt, which is why this conversion comes up so often.',
      note: 'WHO guidance is 2,000 mg of sodium — about 5 g of salt. A single bowl of soup or stew often holds half of that.' },
    zh: { title: '钠与盐换算器', desc: '把营养标签上的钠换算成多少克盐。',
      long: '盐是钠与氯的化合物，比钠更重：1克钠约相当于2.54克盐。标签用钠标示而食谱用盐计量，因此常需换算。',
      note: '世界卫生组织建议每日钠2000毫克，约合5克盐。一碗汤或炖菜常常就含其中一半。' },
  },
  {
    slug: 'caffeine-limit',
    icon: '☕',
    category: '대사·칼로리',
    fields: [
      { key: 'kg', term: 'weightKgB', unit: 'kg', def: 65, min: 10 },
      { key: 'perCup', term: 'caffeineMg', unit: 'mg', def: 120, min: 1 },
    ],
    formula: '{caffeineLimit} = {weightKgB} × 6',
    compute: v => {
      const limit = Math.min(400, v.kg * 6);
      return [
        { term: 'caffeineLimit', unit: 'mg', value: Math.round(limit), digits: 0, primary: true },
        { term: 'coffeeCups', unit: 'none', value: round(ratio(limit, v.perCup), 1), digits: 1 },
        { term: 'mgPerKg', unit: 'mg', value: round(ratio(limit, v.kg), 1), digits: 1 },
      ];
    },
    verdict: (_v, out) => ({
      ko: `하루 ${out[0].value}mg, 이 잔으로는 ${out[1].value}잔까지입니다. 성인 상한은 400mg에서 더 올라가지 않습니다.`,
      en: `${out[0].value} mg a day — about ${out[1].value} of these cups. The adult ceiling does not rise above 400 mg.`,
      zh: `每日${out[0].value}毫克，约合${out[1].value}杯。成人上限不超过400毫克。`,
      tone: 'good',
    }),
    ko: { title: '카페인 하루 상한 계산기', desc: '체중을 기준으로 하루 카페인 상한과 커피 잔 수를 구합니다.',
      long: '체중 1kg당 6mg이 성인 기준이고, 전체 상한은 400mg입니다. 65kg이면 390mg으로 상한 안에 들어옵니다. 아메리카노 한 잔이 대략 120mg입니다.',
      note: '임신 중에는 200mg으로 낮춰 잡고, 청소년은 체중당 2.5mg이 기준입니다. 에너지드링크와 초콜릿, 일부 진통제에도 카페인이 들어 있습니다.' },
    en: { title: 'Daily Caffeine Ceiling', desc: 'Your caffeine limit by body weight, in milligrams and cups.',
      long: 'The adult reference is 6 mg per kilogram with an overall cap of 400 mg, so 65 kg gives 390 mg — just inside. A single Americano runs about 120 mg.',
      note: 'In pregnancy the figure drops to 200 mg, and for adolescents it is 2.5 mg per kilogram. Energy drinks, chocolate and some painkillers carry caffeine too.' },
    zh: { title: '每日咖啡因上限', desc: '按体重算出每日咖啡因上限及可喝的杯数。',
      long: '成人参考值为每公斤6毫克，总上限400毫克。65公斤对应390毫克，刚好在上限内。一杯美式约120毫克。',
      note: '孕期应降至200毫克，青少年按每公斤2.5毫克计。能量饮料、巧克力和部分止痛药也含咖啡因。' },
  },
];
