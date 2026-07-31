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
        ? { ko: `주당 ${w}kg은 지방이 덜 붙는 속도입니다. 근력 운동과 함께면 대부분 근육으로 갑니다.`, en: `${w} kg a week is the lean-gain pace; with resistance training most of it is muscle.`, l10n: { es: `${w} kg por semana es el ritmo de ganancia limpia; con entrenamiento de fuerza la mayor parte va a músculo.`, 'pt-br': `${w} kg por semana é o ritmo de ganho limpo; com treino de força a maior parte vira músculo.`, ja: `週${w}kgは脂肪がつきにくいペースです。筋力トレーニングと合わせればほとんどが筋肉に向かいます。`, de: `${w} kg pro Woche ist das Tempo für sauberen Zuwachs; mit Krafttraining geht das meiste in Muskeln.`, fr: `${w} kg par semaine, c’est le rythme d’une prise sèche ; avec de la musculation, l’essentiel part en muscle.`, hi: `हफ़्ते में ${w} किग्रा वह रफ़्तार है जिस पर वसा कम चढ़ती है; वज़न वाली कसरत के साथ ज़्यादातर हिस्सा मांसपेशी बनता है।` }, tone: 'good' }
        : { ko: `주당 ${w}kg은 빠릅니다. 늘어난 무게의 절반 이상이 지방일 수 있습니다.`, en: `${w} kg a week is fast — over half of it may be fat.`, l10n: { es: `${w} kg por semana es rápido: más de la mitad puede ser grasa.`, 'pt-br': `${w} kg por semana é rápido: mais da metade pode ser gordura.`, ja: `週${w}kgは速い方です。増えた重さの半分以上が脂肪になりかねません。`, de: `${w} kg pro Woche ist schnell — über die Hälfte davon kann Fett sein.`, fr: `${w} kg par semaine, c’est rapide : plus de la moitié peut être du gras.`, hi: `हफ़्ते में ${w} किग्रा तेज़ है — बढ़े हुए वज़न का आधे से ज़्यादा हिस्सा वसा हो सकता है।` }, tone: 'warn' };
    },
    ko: { title: '증량 속도 계산기', desc: '하루 잉여 열량으로 주당 몇 kg 늘어나는지 계산합니다.',
      long: '체중 1kg을 늘리는 데 약 7,700kcal이 필요하다고 봅니다. 하루 잉여를 7배 해 한 주치로 만들고 7,700으로 나눕니다. 하루 300kcal이면 주당 약 0.27kg입니다.',
      note: '7,700kcal은 지방 1kg 기준이라 근육이 늘 때는 오차가 있습니다. 실제 증가폭은 개인의 대사 적응에 따라 이 값의 절반에서 두 배까지 벌어집니다.' },
    en: { title: 'Weight Gain from a Surplus', desc: 'How fast you gain from a given daily calorie surplus.',
      long: 'A kilogram of body weight is treated as roughly 7,700 kcal. Multiply the daily surplus by seven for a week and divide. A 300 kcal surplus gives about 0.27 kg a week.',
      note: 'The 7,700 figure is for fat, so muscle gain deviates. Real-world gain ranges from half to double this depending on metabolic adaptation.' },
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
        ? { ko: `하루 ${eat}kcal은 너무 적습니다. 목표 속도를 낮추거나 활동량을 늘려 적자를 만드세요.`, en: `Eating ${eat} kcal a day is too little — slow the target or add activity instead.`, l10n: { es: `Comer ${eat} kcal al día es muy poco: baja el ritmo del objetivo o suma actividad en su lugar.`, 'pt-br': `Comer ${eat} kcal por dia é pouco demais: diminua o ritmo da meta ou acrescente atividade.`, ja: `一日${eat}kcalは少なすぎます。目標のペースを落とすか、活動量を増やして赤字を作ってください。`, de: `${eat} kcal am Tag sind zu wenig — nimm das Ziel zurück oder beweg dich stattdessen mehr.`, fr: `Manger ${eat} kcal par jour, c’est trop peu : ralentis l’objectif ou ajoute de l’activité.`, hi: `दिन में ${eat} kcal बहुत कम है — लक्ष्य धीमा करें या इसके बजाय गतिविधि बढ़ाकर घाटा बनाएँ।` }, tone: 'bad' }
        : pct > 25
          ? { ko: `소비의 ${pct}%를 깎는 것은 큽니다. 20% 안쪽이 지키기 쉽습니다.`, en: `Cutting ${pct}% of your burn is steep; under 20% is easier to sustain.`, l10n: { es: `Recortar el ${pct} % de lo que gastas es mucho; por debajo del 20 % se sostiene mejor.`, 'pt-br': `Cortar ${pct} % do que você gasta é muito; abaixo de 20 % se sustenta melhor.`, ja: `消費の${pct}%を削るのは大きい方です。20%以内なら続けやすくなります。`, de: `${pct} % deines Verbrauchs zu streichen ist viel; unter 20 % hält man leichter durch.`, fr: `Couper ${pct} % de ta dépense, c’est beaucoup ; sous 20 %, ça tient mieux dans la durée.`, hi: `अपने ख़र्च का ${pct}% काटना बड़ा है; 20% के भीतर रहना निभाना आसान है।` }, tone: 'warn' }
          : { ko: `하루 ${out[0].value}kcal 적자, 섭취 ${eat}kcal이면 무리 없는 속도입니다.`, en: `A ${out[0].value} kcal deficit eating ${eat} kcal a day is a sustainable pace.`, l10n: { es: `Un déficit de ${out[0].value} kcal comiendo ${eat} kcal al día es un ritmo sostenible.`, 'pt-br': `Um déficit de ${out[0].value} kcal comendo ${eat} kcal por dia é um ritmo sustentável.`, ja: `一日${out[0].value}kcalの赤字、摂取${eat}kcalなら無理のないペースです。`, de: `Ein Defizit von ${out[0].value} kcal bei ${eat} kcal am Tag ist ein durchhaltbares Tempo.`, fr: `Un déficit de ${out[0].value} kcal en mangeant ${eat} kcal par jour, c’est un rythme tenable.`, hi: `रोज़ ${eat} kcal खाकर ${out[0].value} kcal का घाटा — यह निभने लायक़ रफ़्तार है।` }, tone: 'good' };
    },
    ko: { title: '주당 감량 목표 → 필요 적자', desc: '주당 몇 kg을 빼려면 하루에 얼마를 줄여야 하는지 계산합니다.',
      long: '주당 목표에 7,700을 곱해 한 주에 필요한 적자를 만들고 7로 나눕니다. 주 0.5kg이면 하루 약 550kcal입니다. 소비 열량에서 그만큼 뺀 값이 먹어야 할 양입니다.',
      note: '적자를 먹는 양만으로 만들면 기초대사량이 떨어집니다. 절반은 활동으로 만드는 편이 정체기를 늦춥니다.' },
    en: { title: 'Weekly Loss Target to Daily Deficit', desc: 'The daily cut needed for a given weekly weight loss.',
      long: 'Multiply the weekly target by 7,700 for the week’s deficit, then divide by seven. Half a kilogram a week needs about 550 kcal a day. Subtract that from your burn to get what to eat.',
      note: 'Making the whole deficit by eating less drives resting metabolism down. Building half of it from activity delays the plateau.' },
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
        ? { ko: `체중 1kg당 ${k}kcal은 높은 편입니다. 근육 비율이 높거나 젊은 편입니다.`, en: `${k} kcal per kilogram is on the high side — more muscle or a younger body.`, l10n: { es: `${k} kcal por kilo está en la parte alta: más músculo o un cuerpo más joven.`, 'pt-br': `${k} kcal por quilo está no lado alto: mais músculo ou um corpo mais jovem.`, ja: `体重1kgあたり${k}kcalは高めです。筋肉の割合が高いか、若い体です。`, de: `${k} kcal pro Kilogramm ist eher hoch — mehr Muskeln oder ein jüngerer Körper.`, fr: `${k} kcal par kilo, c’est plutôt haut : plus de muscle, ou un corps plus jeune.`, hi: `प्रति किलो ${k} kcal ऊँची तरफ़ है — मांसपेशी ज़्यादा है या शरीर जवान है।` }, tone: 'good' }
        : k >= 18
          ? { ko: `체중 1kg당 ${k}kcal은 보통 범위입니다.`, en: `${k} kcal per kilogram is a typical range.`, l10n: { es: `${k} kcal por kilo es un rango típico.`, 'pt-br': `${k} kcal por quilo é uma faixa típica.`, ja: `体重1kgあたり${k}kcalは標準的な範囲です。`, de: `${k} kcal pro Kilogramm ist ein üblicher Bereich.`, fr: `${k} kcal par kilo, c’est une plage classique.`, hi: `प्रति किलो ${k} kcal सामान्य दायरा है।` }, tone: 'good' }
          : { ko: `체중 1kg당 ${k}kcal은 낮은 편입니다. 근육이 적거나 나이가 있는 경우입니다.`, en: `${k} kcal per kilogram is low — less muscle, or an older body.`, l10n: { es: `${k} kcal por kilo es bajo: menos músculo, o un cuerpo de más edad.`, 'pt-br': `${k} kcal por quilo é baixo: menos músculo, ou um corpo de mais idade.`, ja: `体重1kgあたり${k}kcalは低めです。筋肉が少ないか、年齢を重ねた体です。`, de: `${k} kcal pro Kilogramm ist niedrig — weniger Muskeln oder ein älterer Körper.`, fr: `${k} kcal par kilo, c’est bas : moins de muscle, ou un corps plus âgé.`, hi: `प्रति किलो ${k} kcal कम है — मांसपेशी कम है या उम्र ज़्यादा।` }, tone: 'warn' };
    },
    ko: { title: '체중당 기초대사량 계산기', desc: '기초대사량을 체중으로 나눠 대사가 활발한지 봅니다.',
      long: '몸무게가 다른 사람끼리 기초대사량을 그냥 비교할 수는 없습니다. 체중으로 나누면 같은 자로 잴 수 있고, 보통 성인은 kg당 20kcal 안팎입니다.',
      note: '근육은 지방보다 대사가 활발하므로 체지방률이 낮으면 이 값이 올라갑니다. 같은 체중에서 값이 높으면 근육이 많다는 뜻입니다.' },
    en: { title: 'BMR per Kilogram', desc: 'Divide resting calories by weight to see how active your metabolism runs.',
      long: 'You cannot compare two people’s BMR directly when they weigh different amounts. Dividing by weight puts them on one scale; most adults land near 20 kcal per kilogram.',
      note: 'Muscle burns more than fat, so a lower body-fat percentage raises this. At the same weight, a higher figure means more muscle.' },
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
        ? { ko: `한 끼 ${per}g은 근육 합성이 잘 도는 구간입니다.`, en: `${per} g a meal sits in the range that drives muscle synthesis well.`, l10n: { es: `${per} g por comida cae en el rango que mueve bien la síntesis muscular.`, 'pt-br': `${per} g por refeição fica na faixa que puxa bem a síntese muscular.`, ja: `一食${per}gは筋肉の合成がよく回る範囲です。`, de: `${per} g pro Mahlzeit liegen im Bereich, der die Muskelsynthese gut antreibt.`, fr: `${per} g par repas tombe dans la fourchette qui fait bien tourner la synthèse musculaire.`, hi: `एक बार में ${per} g वह दायरा है जिसमें मांसपेशी बनने की प्रक्रिया अच्छी चलती है।` }, tone: 'good' }
        : per < 20
          ? { ko: `한 끼 ${per}g은 적습니다. 끼니를 줄여 한 번에 20g 이상 모으는 편이 낫습니다.`, en: `${per} g a meal is low; fewer, larger meals clearing 20 g work better.`, l10n: { es: `${per} g por comida es poco; conviene hacer menos comidas y más grandes que pasen de 20 g.`, 'pt-br': `${per} g por refeição é pouco; melhor fazer menos refeições e maiores, passando de 20 g.`, ja: `一食${per}gは少なめです。食事の回数を減らして一度に20g以上まとめる方が効きます。`, de: `${per} g pro Mahlzeit sind wenig; lieber weniger, dafür größere Mahlzeiten über 20 g.`, fr: `${per} g par repas, c’est peu ; mieux vaut moins de repas, plus copieux, dépassant 20 g.`, hi: `एक बार में ${per} g कम है; कम बार पर बड़ी मात्रा में, 20 g से ऊपर लेना बेहतर काम करता है।` }, tone: 'warn' }
          : { ko: `한 끼 ${per}g은 많습니다. 한 번에 다 쓰지 못하므로 끼니를 나누는 편이 낫습니다.`, en: `${per} g in one sitting is more than the body uses at once — spread it out.`, l10n: { es: `${per} g de una sentada es más de lo que el cuerpo aprovecha a la vez: repártelo.`, 'pt-br': `${per} g de uma vez é mais do que o corpo aproveita de uma só vez: divida ao longo do dia.`, ja: `一食${per}gは多めです。一度に使い切れないので、食事を分けた方が無駄がありません。`, de: `${per} g auf einmal sind mehr, als der Körper in einem Zug verwertet — verteil es.`, fr: `${per} g d’un coup, c’est plus que ce que le corps utilise à la fois : répartis-les.`, hi: `एक बार में ${per} g उससे ज़्यादा है जितना शरीर एक साथ काम में लाता है — इसे बाँट लें।` }, tone: 'warn' };
    },
    ko: { title: '한 끼 단백질 배분 계산기', desc: '하루 단백질을 끼니 수로 나눠 한 끼에 얼마씩 먹을지 정합니다.',
      long: '하루 총량만 맞추는 것보다 끼니마다 20~40g씩 고르게 나누는 편이 근육 합성에 유리합니다. 체중에 g/kg을 곱해 하루 총량을 만들고 끼니 수로 나눕니다.',
      note: '체중당 1.6g은 근력 운동을 하는 사람 기준입니다. 앉아 지내면 0.8~1.0g, 감량 중이면 1.8~2.2g으로 올려 잡습니다.' },
    en: { title: 'Protein per Meal', desc: 'Split your daily protein across meals.',
      long: 'Spreading protein into 20–40 g servings beats simply hitting a daily total. Multiply weight by grams per kilogram for the day, then divide by meals.',
      note: '1.6 g/kg assumes you lift. Sedentary sits at 0.8–1.0; while cutting, 1.8–2.2 protects muscle better.' },
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
        ? { ko: '세계보건기구 권고인 하루 나트륨 2,000mg 안입니다.', en: 'Inside the WHO guidance of 2,000 mg of sodium a day.', l10n: { es: 'Dentro de la recomendación de la OMS de 2.000 mg de sodio al día.', 'pt-br': 'Dentro da recomendação da OMS de 2.000 mg de sódio por dia.', ja: '世界保健機関の勧告である一日ナトリウム2,000mgの内側です。', de: 'Innerhalb der WHO-Empfehlung von 2.000 mg Natrium pro Tag.', fr: 'Dans la limite de l’OMS de 2 000 mg de sodium par jour.', hi: 'विश्व स्वास्थ्य संगठन की रोज़ाना 2,000 mg सोडियम की सलाह के भीतर।' }, tone: 'good' }
        : { ko: `권고 2,000mg을 ${Math.round(v.sodium - 2000)}mg 넘겼습니다.`, en: `${Math.round(v.sodium - 2000)} mg over the 2,000 mg guidance.`, l10n: { es: `${Math.round(v.sodium - 2000)} mg por encima de la recomendación de 2.000 mg.`, 'pt-br': `${Math.round(v.sodium - 2000)} mg acima da recomendação de 2.000 mg.`, ja: `勧告の2,000mgを${Math.round(v.sodium - 2000)}mg超えています。`, de: `${Math.round(v.sodium - 2000)} mg über der Empfehlung von 2.000 mg.`, fr: `${Math.round(v.sodium - 2000)} mg au-dessus de la limite de 2 000 mg.`, hi: `2,000 mg की सलाह से ${Math.round(v.sodium - 2000)} mg ज़्यादा।` }, tone: 'warn' },
    ko: { title: '나트륨 ↔ 소금 환산기', desc: '영양표시의 나트륨을 소금 몇 g인지로 바꿉니다.',
      long: '소금은 나트륨과 염소가 결합한 물질이라 나트륨보다 무겁습니다. 나트륨 1g은 소금 약 2.54g에 해당합니다. 영양표시는 나트륨으로, 요리법은 소금으로 적혀 있어 이 환산이 자주 필요합니다.',
      note: '세계보건기구 권고는 나트륨 2,000mg, 소금으로는 약 5g입니다. 국·찌개 한 그릇에 그 절반이 들어 있는 경우가 흔합니다.' },
    en: { title: 'Sodium to Salt Converter', desc: 'Turn the sodium on a label into grams of salt.',
      long: 'Salt is sodium bonded to chloride, so it weighs more: one gram of sodium is about 2.54 g of salt. Labels use sodium while recipes use salt, which is why this conversion comes up so often.',
      note: 'WHO guidance is 2,000 mg of sodium — about 5 g of salt. A single bowl of soup or stew often holds half of that.' },
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
      l10n: { es: `${out[0].value} mg al día, unas ${out[1].value} tazas de estas. El techo para adultos no pasa de 400 mg.`, 'pt-br': `${out[0].value} mg por dia, cerca de ${out[1].value} xícaras dessas. O teto para adultos não passa de 400 mg.`, ja: `一日${out[0].value}mg、このカップで${out[1].value}杯までです。成人の上限は400mgから上には動きません。`, de: `${out[0].value} mg am Tag — etwa ${out[1].value} solcher Tassen. Die Obergrenze für Erwachsene steigt nicht über 400 mg.`, fr: `${out[0].value} mg par jour, soit environ ${out[1].value} tasses comme celle-ci. Le plafond adulte ne dépasse pas 400 mg.`, hi: `दिन में ${out[0].value} mg, यानी ऐसे लगभग ${out[1].value} कप। वयस्कों की ऊपरी सीमा 400 mg से आगे नहीं बढ़ती।` },
      tone: 'good',
    }),
    ko: { title: '카페인 하루 상한 계산기', desc: '체중을 기준으로 하루 카페인 상한과 커피 잔 수를 구합니다.',
      long: '체중 1kg당 6mg이 성인 기준이고, 전체 상한은 400mg입니다. 65kg이면 390mg으로 상한 안에 들어옵니다. 아메리카노 한 잔이 대략 120mg입니다.',
      note: '임신 중에는 200mg으로 낮춰 잡고, 청소년은 체중당 2.5mg이 기준입니다. 에너지드링크와 초콜릿, 일부 진통제에도 카페인이 들어 있습니다.' },
    en: { title: 'Daily Caffeine Ceiling', desc: 'Your caffeine limit by body weight, in milligrams and cups.',
      long: 'The adult reference is 6 mg per kilogram with an overall cap of 400 mg, so 65 kg gives 390 mg — just inside. A single Americano runs about 120 mg.',
      note: 'In pregnancy the figure drops to 200 mg, and for adolescents it is 2.5 mg per kilogram. Energy drinks, chocolate and some painkillers carry caffeine too.' },
  },
];
