/**
 * 몸 섹션 셋째 묶음 (12종).
 *
 * 앞의 110종이 "내 숫자가 얼마인가"였다면 여기는 **그 숫자가 어느 칸에 드는가**와
 * **어디까지 가야 하는가**다 — 혈압 분류, 신장 기능 단계, 목표 체지방률까지의
 * 감량, 나이별 권장 수면. 나머지는 재는 방법이 따로 있는 것들이다: 피부두께로
 * 재는 체지방, 순탄수와 혈당부하, 100g당 열량, 체중당 출력, 임계 수영 속도,
 * 마라톤 전후반 배분.
 *
 * 0을 넣어도 유한한 값이 나와야 한다 — 나누는 자리마다 ratio()를 뒀다.
 */
import type { FormulaTool } from '../formula/types.ts';
import { ratio } from '../formula/types.ts';
import { round } from '../formula/num.ts';

/** 나이별 권장 수면(시간) — 미국수면의학회 권고를 구간으로 옮긴 것 */
const SLEEP_BY_AGE: [max: number, low: number, high: number][] = [
  [1, 12, 16],
  [2, 11, 14],
  [5, 10, 13],
  [12, 9, 12],
  [18, 8, 10],
  [Infinity, 7, 9],
];

export const BODY_EXTRA_TOOLS: FormulaTool[] = [
  /* ───────── 체중·체형 ───────── */
  {
    slug: 'skinfold-body-fat',
    icon: '🤏',
    category: '체중·체형',
    fields: [
      { key: 'sum', term: 'skinSum', unit: 'mm', def: 50, min: 0 },
      { key: 'age', term: 'ageYears', unit: 'year', def: 35, min: 0, max: 100 },
      { key: 'sex', term: 'sexFactor', def: 1, min: 0, max: 1, step: 1 },
      { key: 'weight', term: 'weightKgB', unit: 'kg', def: 70, min: 0 },
    ],
    formula: '{bodyFat} = 495 ÷ (1.10938 − 0.0008267 × {skinSum} + 0.0000016 × {skinSum}² − 0.0002574 × {ageYears}) − 450',
    compute: v => {
      const s = v.sum;
      // Jackson–Pollock 3부위 — 남녀의 계수가 다르다
      const density = v.sex >= 1
        ? 1.10938 - 0.0008267 * s + 0.0000016 * s * s - 0.0002574 * v.age
        : 1.0994921 - 0.0009929 * s + 0.0000023 * s * s - 0.0001392 * v.age;
      const fat = Math.min(70, Math.max(0, ratio(495, density) - 450));
      return [
        { term: 'bodyFat', unit: 'percent', value: round(fat, 2), digits: 2, primary: true },
        { term: 'fatMass', unit: 'kg', value: round((v.weight * fat) / 100, 2), digits: 2 },
        { term: 'leanMass', unit: 'kg', value: round(v.weight * (1 - fat / 100), 2), digits: 2 },
      ];
    },
    ko: { title: '피부두께 체지방률 계산기', desc: '캘리퍼로 잰 세 곳의 두께 합으로 체지방률을 구합니다.',
      long: '집게로 피부를 집어 피하지방의 두께를 재는 방법입니다. 세 곳의 합에서 몸 전체의 밀도를 추정하고, 밀도에서 체지방률을 계산합니다. 남녀의 지방이 붙는 자리가 달라 계수가 따로 있습니다.',
      note: '남자는 가슴·복부·허벅지, 여자는 삼두·허리 위·허벅지를 잽니다. 같은 자리를 같은 힘으로 재야 하므로, 절대값보다 같은 조건에서의 변화를 보는 데 씁니다.' },
    en: { title: 'Skinfold Body Fat Calculator', desc: 'Body fat from the sum of three caliper measurements.',
      long: 'Calipers pinch the skin to measure the fat layer beneath it. The sum of three sites estimates whole-body density, and density converts to a body fat percentage. Men and women store fat differently, so each has its own coefficients.',
      note: 'Men measure chest, abdomen and thigh; women triceps, suprailiac and thigh. Consistency of site and pressure matters more than the absolute number, so track the change rather than the value.' },
  },
  {
    slug: 'fat-loss-target',
    icon: '🎯',
    category: '체중·체형',
    fields: [
      { key: 'weight', term: 'weightKgB', unit: 'kg', def: 80, min: 0 },
      { key: 'fat', term: 'bodyFat', unit: 'percent', def: 25, min: 0, max: 70 },
      { key: 'target', term: 'targetFat', unit: 'percent', def: 15, min: 0, max: 70 },
    ],
    formula: '{targetWeight} = {weightKgB} × (100 − {bodyFat}) ÷ (100 − {targetFat})',
    compute: v => {
      const lean = v.weight * (1 - v.fat / 100);
      const goal = ratio(lean, 1 - v.target / 100);
      return [
        { term: 'targetWeight', unit: 'kg', value: round(goal, 2), digits: 2, primary: true },
        { term: 'lossKg', unit: 'kg', value: round(Math.max(0, v.weight - goal), 2), digits: 2 },
        { term: 'leanMass', unit: 'kg', value: round(lean, 2), digits: 2 },
      ];
    },
    ko: { title: '목표 체지방률까지 감량 계산기', desc: '근육을 지킨다고 볼 때 목표 체지방률에 닿는 체중을 구합니다.',
      long: '체지방률은 지방을 뺀 몸(제지방)을 그대로 두고 지방만 줄인다고 가정해 계산합니다. 제지방량은 그대로이므로 목표 체중은 제지방량을 (1 − 목표 체지방률)로 나눈 값이 됩니다.',
      note: '실제로는 급하게 빼면 근육도 함께 빠져서 목표 체중까지 가도 체지방률이 덜 떨어집니다. 주당 체중의 1% 이내로 줄이면 제지방 손실이 적습니다.' },
    en: { title: 'Weight at a Target Body Fat', desc: 'The weight you would reach at a target body fat, holding lean mass steady.',
      long: 'The calculation assumes you lose fat while keeping everything else — muscle, bone, water. Because lean mass stays put, the goal weight is simply lean mass divided by one minus the target fat share.',
      note: 'In practice, losing weight quickly takes muscle with it, so the body fat percentage falls short even at the goal weight. Staying under about 1% of body weight per week keeps lean losses small.' },
  },

  /* ───────── 대사·칼로리 ───────── */
  {
    slug: 'net-carbs',
    icon: '🍞',
    category: '대사·칼로리',
    fields: [
      { key: 'carb', term: 'carbG', unit: 'gram', def: 45, min: 0 },
      { key: 'fiber', term: 'fiberG', unit: 'gram', def: 8, min: 0 },
      { key: 'alc', term: 'sugarAlc', unit: 'gram', def: 5, min: 0 },
    ],
    formula: '{netCarb} = {carbG} − {fiberG} − {sugarAlc} ÷ 2',
    compute: v => {
      // 당알코올은 절반만 흡수되는 것으로 본다 — 에리스리톨은 거의 0이지만 말티톨은 더 높다
      const net = Math.max(0, v.carb - v.fiber - v.alc / 2);
      return [
        { term: 'netCarb', unit: 'gram', value: round(net, 1), digits: 1, primary: true },
        { term: 'calories', unit: 'kcal', value: round(net * 4, 0), digits: 0 },
      ];
    },
    ko: { title: '순탄수 계산기', desc: '총탄수에서 식이섬유와 당알코올을 빼 실제로 흡수되는 탄수화물을 구합니다.',
      long: '식이섬유는 소화되지 않고 지나가므로 혈당을 올리지 않습니다. 당알코올은 종류마다 다르지만 대체로 절반쯤만 흡수됩니다. 그 둘을 뺀 것이 실제로 몸에 들어오는 탄수화물입니다.',
      note: '에리스리톨은 거의 흡수되지 않고 말티톨은 상당히 흡수됩니다. 성분표에 종류가 적혀 있으면 그에 맞춰 조정하세요.' },
    en: { title: 'Net Carbs Calculator', desc: 'Total carbs minus fibre and sugar alcohols — what your body actually absorbs.',
      long: 'Fibre passes through undigested and does not raise blood sugar. Sugar alcohols vary, but roughly half of them are absorbed. What remains after subtracting both is the carbohydrate that actually reaches you.',
      note: 'Erythritol is barely absorbed while maltitol is largely absorbed. If the label names the type, adjust the figure accordingly.' },
  },
  {
    slug: 'glycemic-load',
    icon: '🍚',
    category: '대사·칼로리',
    fields: [
      { key: 'gi', term: 'giValue', def: 70, min: 0, max: 120 },
      { key: 'carb', term: 'carbG', unit: 'gram', def: 30, min: 0 },
    ],
    formula: '{glValue} = {giValue} × {carbG} ÷ 100',
    compute: v => [
      { term: 'glValue', value: round((v.gi * v.carb) / 100, 1), digits: 1, primary: true },
      { term: 'calories', unit: 'kcal', value: round(v.carb * 4, 0), digits: 0 },
    ],
    verdict: (v, out) => {
      const gl = out[0].value;
      if (v.carb <= 0) return null;
      if (gl < 10) {
        return {
          tone: 'good', ko: '혈당부하 10 미만으로 낮습니다. 혈당이 완만하게 오릅니다.',
          en: 'A glycaemic load under 10 is low — blood sugar rises gently.',
          l10n: {
            es: 'Una carga glucémica menor de 10 es baja: la glucosa sube despacio.',
            'pt-br': 'Carga glicêmica abaixo de 10 é baixa: a glicose sobe devagar.',
            ja: 'グリセミック負荷が10未満と低く、血糖はゆるやかに上がります。',
            de: 'Eine glykämische Last unter 10 ist niedrig — der Blutzucker steigt sanft.',
            fr: 'Une charge glycémique inférieure à 10 est faible : la glycémie monte doucement.',
            hi: '10 से कम ग्लाइसेमिक लोड कम माना जाता है — रक्त शर्करा धीरे बढ़ती है।',
            'zh-hans': '血糖负荷低于 10 属于低负荷，血糖上升平缓。',
            'zh-hant': '血糖負荷低於 10 屬於低負荷，血糖上升平緩。',
          },
        };
      }
      if (gl < 20) {
        return {
          tone: 'warn', ko: '혈당부하 10~19로 중간입니다. 단백질이나 지방과 함께 먹으면 완만해집니다.',
          en: 'A load of 10–19 is moderate; pairing it with protein or fat flattens the rise.',
          l10n: {
            es: 'Una carga de 10 a 19 es media; acompañarla de proteína o grasa suaviza la subida.',
            'pt-br': 'Carga de 10 a 19 é média; acompanhar com proteína ou gordura suaviza a subida.',
            ja: '負荷10〜19は中程度です。たんぱく質や脂質と一緒にとるとゆるやかになります。',
            de: 'Eine Last von 10–19 ist mittel; mit Eiweiß oder Fett kombiniert flacht der Anstieg ab.',
            fr: 'Une charge de 10 à 19 est moyenne ; associée à des protéines ou des lipides, la montée s’aplatit.',
            hi: '10–19 का लोड मध्यम है; प्रोटीन या वसा के साथ लेने पर बढ़त धीमी हो जाती है।',
            'zh-hans': '负荷 10~19 属中等，与蛋白质或脂肪同食可让血糖上升更平缓。',
            'zh-hant': '負荷 10~19 屬中等，與蛋白質或脂肪同食可讓血糖上升更平緩。',
          },
        };
      }
      return {
        tone: 'bad', ko: '혈당부하 20 이상으로 높습니다. 양을 줄이거나 반을 나눠 먹는 편이 낫습니다.',
        en: 'A load of 20 or more is high — a smaller portion, or splitting it, works better.',
        l10n: {
          es: 'Una carga de 20 o más es alta: conviene reducir la ración o partirla en dos.',
          'pt-br': 'Carga de 20 ou mais é alta: melhor reduzir a porção ou dividi-la.',
          ja: '負荷20以上は高めです。量を減らすか、半分に分けて食べるほうが無難です。',
          de: 'Eine Last ab 20 ist hoch — eine kleinere Portion oder Aufteilen ist besser.',
          fr: 'Une charge de 20 ou plus est élevée : mieux vaut réduire la portion ou la partager.',
          hi: '20 या उससे अधिक लोड ऊँचा है — मात्रा घटाना या दो हिस्सों में लेना बेहतर है।',
          'zh-hans': '负荷 20 以上偏高，减少分量或分两次吃更稳妥。',
          'zh-hant': '負荷 20 以上偏高，減少分量或分兩次吃更穩妥。',
        },
      };
    },
    ko: { title: '혈당부하(GL) 계산기', desc: '혈당지수에 실제로 먹는 탄수화물 양을 곱해 혈당 부담을 구합니다.',
      long: '혈당지수는 그 음식이 얼마나 빨리 혈당을 올리는지만 말해 줍니다. 수박은 지수가 높지만 한 조각에 든 탄수화물이 적어 실제 부담은 작습니다. 지수에 양을 곱한 혈당부하가 실제로 몸이 받는 값입니다.',
      note: '10 미만이 낮음, 10~19가 중간, 20 이상이 높음입니다. 하루 합계로는 100 언저리를 기준으로 봅니다.' },
    en: { title: 'Glycaemic Load Calculator', desc: 'Glycaemic index multiplied by the carbohydrate you actually eat.',
      long: 'The glycaemic index only says how fast a food raises blood sugar. Watermelon scores high, yet a slice holds little carbohydrate, so its real impact is small. Index times portion — the glycaemic load — is what the body actually meets.',
      note: 'Under 10 is low, 10–19 moderate, 20 and above high. Across a whole day, around 100 is the usual reference point.' },
  },
  {
    slug: 'calorie-density',
    icon: '⚖️',
    category: '대사·칼로리',
    fields: [
      { key: 'kcal', term: 'foodKcal', unit: 'kcal', def: 250, min: 0 },
      { key: 'gram', term: 'foodG', unit: 'gram', def: 150, min: 0 },
    ],
    formula: '{kcalPer100} = {foodKcal} × 100 ÷ {foodG}',
    compute: v => {
      const per100 = ratio(v.kcal * 100, v.gram);
      return [
        { term: 'kcalPer100', unit: 'kcal', value: round(per100, 1), digits: 1, primary: true },
        { term: 'gramPer200', unit: 'gram', value: round(ratio(200 * 100, per100), 0), digits: 0 },
      ];
    },
    ko: { title: '칼로리 밀도 계산기', desc: '100g당 열량과, 200kcal어치가 몇 그램인지를 구합니다.',
      long: '같은 200kcal이라도 밀도가 낮은 음식은 한 접시가 되고 높은 음식은 한 줌이 됩니다. 배부름은 대체로 부피와 무게가 정하므로, 밀도가 낮은 것을 먼저 채우면 같은 열량으로 더 오래 버팁니다.',
      note: '채소와 국물은 100g당 50kcal 아래, 밥과 빵은 130~270kcal, 견과와 기름은 600kcal를 넘습니다.' },
    en: { title: 'Calorie Density Calculator', desc: 'Calories per 100 g, and how many grams make up 200 kcal.',
      long: 'The same 200 kcal is a full plate of one food and a small handful of another. Fullness tracks volume and weight more than calories, so filling up on low-density foods first stretches the same energy much further.',
      note: 'Vegetables and broths sit under 50 kcal per 100 g, rice and bread run 130–270, and nuts and oils clear 600.' },
  },

  /* ───────── 심장·운동 ───────── */
  {
    slug: 'power-to-weight',
    icon: '🚴',
    category: '심장·운동',
    fields: [
      { key: 'watt', term: 'powerW', def: 250, min: 0 },
      { key: 'weight', term: 'weightKgB', unit: 'kg', def: 72, min: 0 },
    ],
    formula: '{wattPerKg} = {powerW} ÷ {weightKgB}',
    compute: v => {
      const wkg = ratio(v.watt, v.weight);
      const lighter = ratio(v.watt, v.weight - 1);
      return [
        { term: 'wattPerKg', value: round(wkg, 2), digits: 2, primary: true },
        { term: 'change', unit: 'percent', value: round(v.weight > 1 ? ratio(lighter - wkg, wkg) * 100 : 0, 2), digits: 2 },
      ];
    },
    verdict: (_v, out) => {
      const wkg = out[0].value;
      if (wkg <= 0) return null;
      if (wkg >= 4) {
        return {
          tone: 'good', ko: '4W/kg 이상입니다. 아마추어 경기에서 앞자리를 다투는 수준입니다.',
          en: 'At 4 W/kg and above you are racing near the front of an amateur field.',
          l10n: {
            es: 'A partir de 4 W/kg compites en la cabeza de un pelotón amateur.',
            'pt-br': 'De 4 W/kg para cima você anda na frente de um pelotão amador.',
            ja: '4W/kg以上です。アマチュアレースで先頭を争う水準です。',
            de: 'Ab 4 W/kg fährst du im vorderen Feld eines Amateurrennens mit.',
            fr: 'À partir de 4 W/kg, vous roulez en tête d’un peloton amateur.',
            hi: '4 W/kg से ऊपर होने पर आप शौकिया दौड़ में आगे की पंक्ति में हैं।',
            'zh-hans': '达到 4 W/kg 以上，在业余比赛里属于领先集团的水平。',
            'zh-hant': '達到 4 W/kg 以上，在業餘比賽裡屬於領先集團的水準。',
          },
        };
      }
      if (wkg >= 2.5) {
        return {
          tone: 'warn', ko: '2.5~4W/kg는 꾸준히 타는 동호인 구간입니다. 긴 오르막에서 차이가 벌어집니다.',
          en: '2.5–4 W/kg is the committed club range; long climbs are where the gaps open.',
          l10n: {
            es: 'De 2,5 a 4 W/kg es el rango del ciclista de club; en las subidas largas se abren las diferencias.',
            'pt-br': 'De 2,5 a 4 W/kg é a faixa do ciclista de clube; nas subidas longas as diferenças aparecem.',
            ja: '2.5〜4W/kgは走り込んでいる愛好者の範囲です。長い上りで差がつきます。',
            de: '2,5–4 W/kg ist der Bereich ambitionierter Hobbyfahrer; an langen Anstiegen reißen die Lücken auf.',
            fr: 'De 2,5 à 4 W/kg, c’est la plage du cyclosportif régulier ; les écarts se creusent dans les longues montées.',
            hi: '2.5–4 W/kg नियमित शौकिया राइडर की सीमा है; लंबी चढ़ाई पर अंतर खुलता है।',
            'zh-hans': '2.5~4 W/kg 是稳定训练的车友区间，长坡上差距会拉开。',
            'zh-hant': '2.5~4 W/kg 是穩定訓練的車友區間，長坡上差距會拉開。',
          },
        };
      }
      return {
        tone: 'bad', ko: '2.5W/kg 아래입니다. 평지는 무리 없지만 긴 오르막에서 뒤처집니다.',
        en: 'Below 2.5 W/kg the flat is fine, but long climbs will leave you behind.',
        l10n: {
          es: 'Por debajo de 2,5 W/kg el llano va bien, pero las subidas largas te dejan atrás.',
          'pt-br': 'Abaixo de 2,5 W/kg o plano vai bem, mas as subidas longas deixam você para trás.',
          ja: '2.5W/kg未満です。平地は問題ありませんが、長い上りでは離されます。',
          de: 'Unter 2,5 W/kg geht es in der Ebene gut, an langen Anstiegen verlierst du Anschluss.',
          fr: 'Sous 2,5 W/kg, le plat passe bien, mais les longues montées vous distancent.',
          hi: '2.5 W/kg से नीचे समतल रास्ता ठीक रहता है, पर लंबी चढ़ाई पर पिछड़ जाएँगे।',
          'zh-hans': '低于 2.5 W/kg，平路没问题，长坡上会被拉开。',
          'zh-hant': '低於 2.5 W/kg，平路沒問題，長坡上會被拉開。',
        },
      };
    },
    ko: { title: '체중당 출력(W/kg) 계산기', desc: '자전거 출력을 체중으로 나눠 오르막 실력을 견줍니다.',
      long: '평지에서는 절대 출력이 속도를 정하지만 오르막에서는 중력과 싸우므로 체중당 출력이 정합니다. 그래서 같은 250W라도 60kg과 85kg의 오르막 속도가 크게 갈립니다.',
      note: '함께 나오는 값은 1kg을 뺐을 때 W/kg이 몇 % 오르는지입니다. 출력을 그만큼 올리는 것보다 대개 어렵지 않지만, 근육까지 빠지면 출력도 함께 내려갑니다.' },
    en: { title: 'Power-to-Weight Calculator', desc: 'Cycling power divided by body weight — the number that decides climbs.',
      long: 'On the flat, raw watts set your speed; on a climb you are fighting gravity, so watts per kilogram decide it. That is why the same 250 W moves a 60 kg rider up a hill far faster than an 85 kg one.',
      note: 'The second figure shows what losing one kilogram does to the ratio. It is usually easier than adding the equivalent watts — but if muscle goes too, the power falls with it.' },
  },
  {
    slug: 'swim-css',
    icon: '🏊',
    category: '심장·운동',
    fields: [
      { key: 't400', term: 'swim400', unit: 'sec', def: 380, min: 0 },
      { key: 't200', term: 'swim200', unit: 'sec', def: 175, min: 0 },
    ],
    formula: '{per100m} = ({swim400} − {swim200}) ÷ 2',
    compute: v => {
      const css = Math.max(0, (v.t400 - v.t200) / 2);
      return [
        { term: 'per100m', unit: 'sec', value: round(css, 1), digits: 1, primary: true },
        { term: 'finishTime', unit: 'sec', value: round(css * 15, 0), digits: 0 },
      ];
    },
    ko: { title: '임계 수영 속도(CSS) 계산기', desc: '400m와 200m 기록으로 오래 유지할 수 있는 100m 페이스를 구합니다.',
      long: '두 거리의 기록 차를 거리 차로 나누면, 젖산이 쌓이기 시작하는 경계의 속도가 나옵니다. 400m와 200m의 차이가 곧 200m를 더 가는 데 걸린 시간이므로, 그 절반이 100m당 페이스입니다.',
      note: '두 기록을 같은 날 충분히 쉬고 전력으로 재야 합니다. 200m를 설렁설렁 헤엄치면 CSS가 실제보다 느리게 나옵니다.' },
    en: { title: 'Critical Swim Speed Calculator', desc: 'Your sustainable 100 m pace from a 400 m and a 200 m time trial.',
      long: 'Divide the difference between two times by the difference in distance and you get the speed at the threshold where lactate starts to build. The gap between 400 m and 200 m is the time for the extra 200 m, so half of it is the pace per 100 m.',
      note: 'Swim both trials all-out on the same day with full recovery between. Cruising the 200 m makes the result look slower than your real threshold.' },
  },
  {
    slug: 'negative-split',
    icon: '⏱️',
    category: '심장·운동',
    fields: [
      { key: 'total', term: 'timeMin', unit: 'minute', def: 240, min: 0 },
      { key: 'split', term: 'splitPct', unit: 'percent', def: 2, min: 0, max: 20 },
      { key: 'dist', term: 'distanceKm', unit: 'km', def: 42.195, min: 0, step: 0.001 },
    ],
    formula: '{firstHalf} = {timeMin} ÷ (2 − {splitPct} ÷ 100)',
    compute: v => {
      const first = ratio(v.total, 2 - v.split / 100);
      return [
        { term: 'firstHalf', unit: 'minute', value: round(first, 2), digits: 2, primary: true },
        { term: 'secondHalf', unit: 'minute', value: round(v.total - first, 2), digits: 2 },
        { term: 'paceMin', unit: 'minPerKm', value: round(ratio(v.total, v.dist), 2), digits: 2 },
      ];
    },
    ko: { title: '네거티브 스플릿 배분 계산기', desc: '목표 기록을 후반이 조금 더 빠르도록 전후반으로 나눕니다.',
      long: '초반에 아낀 힘이 후반의 속도가 됩니다. 마라톤 기록 상위권은 대부분 후반이 전반보다 빠르고, 반대로 초반에 과하게 나간 주자는 후반에 그보다 훨씬 크게 잃습니다.',
      note: '2%면 4시간 목표에서 전반이 121분, 후반이 119분입니다. 코스에 오르막이 몰려 있으면 그 구간을 느리게 잡고 나머지로 벌충하세요.' },
    en: { title: 'Negative Split Pacing Calculator', desc: 'Split a goal time so the second half comes in slightly faster.',
      long: 'Energy saved early becomes speed later. Most fast marathon times are run with a quicker second half, while runners who go out too hard lose far more in the closing miles than they gained at the start.',
      note: 'At 2%, a four-hour goal means 121 minutes out and 119 back. If the hills are bunched in one section, plan to lose time there and make it up on the rest.' },
  },

  /* ───────── 건강 지표 ───────── */
  {
    slug: 'blood-pressure-category',
    icon: '🩺',
    category: '건강 지표',
    fields: [
      { key: 'sys', term: 'systolic', unit: 'mmHg', def: 128, min: 0, max: 260 },
      { key: 'dia', term: 'diastolic', unit: 'mmHg', def: 82, min: 0, max: 200 },
    ],
    formula: '{result} = max( stage({systolic}), stage({diastolic}) )',
    compute: v => {
      // 두 값 가운데 더 나쁜 쪽이 단계를 정한다 — 하나만 높아도 그 단계다
      const bySys = v.sys >= 180 ? 4 : v.sys >= 140 ? 3 : v.sys >= 130 ? 2 : v.sys >= 120 ? 1 : 0;
      const byDia = v.dia >= 120 ? 4 : v.dia >= 90 ? 3 : v.dia >= 80 ? 2 : 0;
      return [
        { term: 'result', value: Math.max(bySys, byDia), digits: 0, primary: true },
        { term: 'diff', unit: 'mmHg', value: round(Math.max(0, v.sys - 120), 0), digits: 0 },
        { term: 'map', unit: 'mmHg', value: round((v.sys + 2 * v.dia) / 3, 1), digits: 1 },
      ];
    },
    verdict: (_v, out) => {
      const stage = out[0].value;
      const T: Record<number, { tone: 'good' | 'warn' | 'bad'; ko: string; en: string; l10n: Record<string, string> }> = {
        0: { tone: 'good', ko: '정상 범위입니다(120/80 미만).', en: 'Normal — under 120/80.',
          l10n: { es: 'Normal: por debajo de 120/80.', 'pt-br': 'Normal: abaixo de 120/80.', ja: '正常範囲です（120/80未満）。',
            de: 'Normal — unter 120/80.', fr: 'Normale : sous 120/80.', hi: 'सामान्य — 120/80 से नीचे।',
            'zh-hans': '正常范围，低于 120/80。', 'zh-hant': '正常範圍，低於 120/80。' } },
        1: { tone: 'warn', ko: '주의 단계입니다(수축기 120~129). 아직 약은 아니고 생활습관 단계입니다.',
          en: 'Elevated (systolic 120–129) — lifestyle territory, not medication yet.',
          l10n: { es: 'Elevada (sistólica 120–129): terreno de hábitos, aún no de fármacos.',
            'pt-br': 'Elevada (sistólica 120–129): terreno de hábitos, ainda não de remédio.',
            ja: '注意段階です（収縮期120〜129）。まだ薬ではなく生活習慣の段階です。',
            de: 'Erhöht (systolisch 120–129) — noch Sache des Lebensstils, nicht der Medikamente.',
            fr: 'Élevée (systolique 120–129) : affaire d’hygiène de vie, pas encore de médicaments.',
            hi: 'बढ़ी हुई (सिस्टोलिक 120–129) — अभी दवा नहीं, जीवनशैली का चरण है।',
            'zh-hans': '偏高（收缩压 120~129），属于生活方式调整阶段，还不到用药。',
            'zh-hant': '偏高（收縮壓 120~129），屬於生活方式調整階段，還不到用藥。' } },
        2: { tone: 'warn', ko: '고혈압 1기입니다(130~139 또는 80~89). 재 보고 이어지면 진료를 받으세요.',
          en: 'Stage 1 hypertension (130–139 or 80–89) — recheck, and see a doctor if it persists.',
          l10n: { es: 'Hipertensión de grado 1 (130–139 u 80–89): vuelve a medir y consulta si persiste.',
            'pt-br': 'Hipertensão estágio 1 (130–139 ou 80–89): meça de novo e procure um médico se persistir.',
            ja: '高血圧1度です（130〜139または80〜89）。測り直して続くなら受診してください。',
            de: 'Hypertonie Grad 1 (130–139 oder 80–89) — nachmessen und bei Bestand ärztlich abklären.',
            fr: 'Hypertension de grade 1 (130–139 ou 80–89) : remesurez et consultez si cela persiste.',
            hi: 'उच्च रक्तचाप चरण 1 (130–139 या 80–89) — दोबारा नापें, बना रहे तो डॉक्टर को दिखाएँ।',
            'zh-hans': '一级高血压（130~139 或 80~89），复测后若持续请就医。',
            'zh-hant': '一級高血壓（130~139 或 80~89），複測後若持續請就醫。' } },
        3: { tone: 'bad', ko: '고혈압 2기입니다(140 이상 또는 90 이상). 진료가 필요합니다.',
          en: 'Stage 2 hypertension (140+ or 90+) — this needs medical attention.',
          l10n: { es: 'Hipertensión de grado 2 (140+ o 90+): requiere atención médica.',
            'pt-br': 'Hipertensão estágio 2 (140+ ou 90+): precisa de acompanhamento médico.',
            ja: '高血圧2度です（140以上または90以上）。受診が必要です。',
            de: 'Hypertonie Grad 2 (140+ oder 90+) — ärztliche Behandlung ist nötig.',
            fr: 'Hypertension de grade 2 (140+ ou 90+) : une prise en charge médicale s’impose.',
            hi: 'उच्च रक्तचाप चरण 2 (140+ या 90+) — चिकित्सकीय देखभाल आवश्यक है।',
            'zh-hans': '二级高血压（140 以上或 90 以上），需要就医。',
            'zh-hant': '二級高血壓（140 以上或 90 以上），需要就醫。' } },
        4: { tone: 'bad', ko: '고혈압 위기 수준입니다(180/120 이상). 곧바로 응급 진료를 받으세요.',
          en: 'Hypertensive crisis (180/120 or above) — seek emergency care now.',
          l10n: { es: 'Crisis hipertensiva (180/120 o más): busca atención urgente de inmediato.',
            'pt-br': 'Crise hipertensiva (180/120 ou mais): procure atendimento de emergência agora.',
            ja: '高血圧クリーゼの水準です（180/120以上）。直ちに救急を受診してください。',
            de: 'Hypertensive Krise (ab 180/120) — sofort notfallmedizinische Hilfe suchen.',
            fr: 'Crise hypertensive (180/120 ou plus) : consultez en urgence immédiatement.',
            hi: 'उच्च रक्तचाप संकट (180/120 या अधिक) — तुरंत आपातकालीन चिकित्सा लें।',
            'zh-hans': '高血压危象（180/120 以上），请立即就医急诊。',
            'zh-hant': '高血壓危象（180/120 以上），請立即就醫急診。' } },
      };
      return T[stage];
    },
    ko: { title: '혈압 단계 분류 계산기', desc: '수축기와 이완기 값이 어느 단계에 드는지 봅니다.',
      long: '두 값 가운데 더 나쁜 쪽이 단계를 정합니다. 수축기가 정상이어도 이완기가 90을 넘으면 고혈압 2기입니다. 한쪽만 보고 안심하면 안 되는 이유가 여기 있습니다.',
      note: '한 번 잰 값으로는 정하지 않습니다. 다른 날 앉아서 5분 쉰 뒤 두 번씩, 여러 날 잰 평균으로 봅니다.' },
    en: { title: 'Blood Pressure Category', desc: 'Which stage a systolic and diastolic reading falls into.',
      long: 'The worse of the two numbers sets the stage. A perfectly normal systolic still lands in stage 2 if the diastolic is over 90, which is why looking at only one of them is misleading.',
      note: 'One reading decides nothing. Take two measurements after sitting quietly for five minutes, on several different days, and use the average.' },
  },
  {
    slug: 'kidney-stage',
    icon: '🫘',
    category: '건강 지표',
    fields: [
      { key: 'egfr', term: 'egfr', def: 72, min: 0, max: 150 },
    ],
    formula: '{result} = stage({egfr}) → G1 … G5',
    compute: v => {
      const g = v.egfr >= 90 ? 1 : v.egfr >= 60 ? 2 : v.egfr >= 30 ? 3 : v.egfr >= 15 ? 4 : 5;
      return [
        { term: 'result', value: g, digits: 0, primary: true },
        { term: 'remainPct', unit: 'percent', value: round(Math.min(100, v.egfr), 1), digits: 1 },
      ];
    },
    verdict: v => {
      const e = v.egfr;
      if (e >= 60) {
        return {
          tone: 'good', ko: 'eGFR 60 이상으로 신기능이 유지되는 구간입니다. 단백뇨가 없다면 정기 확인이면 됩니다.',
          en: 'An eGFR of 60 or more means function is preserved; without protein in the urine, routine checks suffice.',
          l10n: {
            es: 'Un FGe de 60 o más indica función conservada; sin proteinuria, basta el control rutinario.',
            'pt-br': 'TFGe de 60 ou mais indica função preservada; sem proteinúria, basta o acompanhamento de rotina.',
            ja: 'eGFR60以上で腎機能は保たれています。たんぱく尿がなければ定期確認で足ります。',
            de: 'Eine eGFR ab 60 zeigt erhaltene Funktion; ohne Eiweiß im Urin reichen Routinekontrollen.',
            fr: 'Un DFGe de 60 ou plus traduit une fonction conservée ; sans protéinurie, un suivi de routine suffit.',
            hi: 'eGFR 60 या अधिक होने पर कार्यक्षमता बनी हुई है; मूत्र में प्रोटीन न हो तो नियमित जाँच पर्याप्त है।',
            'zh-hans': 'eGFR 达到 60 以上说明肾功能尚可，若无蛋白尿，定期复查即可。',
            'zh-hant': 'eGFR 達到 60 以上說明腎功能尚可，若無蛋白尿，定期複查即可。',
          },
        };
      }
      if (e >= 30) {
        return {
          tone: 'warn', ko: '중등도 저하 구간입니다. 약 용량 조정과 혈압·혈당 관리를 함께 봐야 합니다.',
          en: 'Moderately reduced — drug doses need review alongside blood pressure and glucose control.',
          l10n: {
            es: 'Reducción moderada: hay que revisar las dosis de fármacos junto con la tensión y la glucosa.',
            'pt-br': 'Redução moderada: as doses de medicamentos precisam de revisão junto com pressão e glicemia.',
            ja: '中等度の低下です。薬の用量調整と血圧・血糖の管理を併せて見る必要があります。',
            de: 'Mäßig eingeschränkt — Medikamentendosen gehören zusammen mit Blutdruck und Blutzucker überprüft.',
            fr: 'Baisse modérée : les doses de médicaments doivent être revues avec la tension et la glycémie.',
            hi: 'मध्यम रूप से घटी हुई — दवाओं की मात्रा के साथ रक्तचाप और शर्करा नियंत्रण भी देखना होगा।',
            'zh-hans': '中度下降，需要复核用药剂量，并同时管理血压和血糖。',
            'zh-hant': '中度下降，需要複核用藥劑量，並同時管理血壓和血糖。',
          },
        };
      }
      return {
        tone: 'bad', ko: '고도 저하 구간입니다. 신장내과 진료와 신대체요법 준비를 논의할 단계입니다.',
        en: 'Severely reduced — this is the stage for nephrology care and planning renal replacement.',
        l10n: {
          es: 'Reducción grave: es la etapa de acudir a nefrología y planificar el tratamiento sustitutivo.',
          'pt-br': 'Redução grave: é a fase de acompanhamento com nefrologia e de planejar a terapia substitutiva.',
          ja: '高度の低下です。腎臓内科の受診と腎代替療法の準備を相談する段階です。',
          de: 'Stark eingeschränkt — jetzt gehören Nephrologie und die Planung eines Nierenersatzverfahrens dazu.',
          fr: 'Baisse sévère : c’est le moment du suivi en néphrologie et de la préparation d’une suppléance.',
          hi: 'गंभीर रूप से घटी हुई — यह नेफ्रोलॉजी परामर्श और रीनल रिप्लेसमेंट की तैयारी का चरण है।',
          'zh-hans': '重度下降，应转诊肾内科并开始讨论肾脏替代治疗的准备。',
          'zh-hant': '重度下降，應轉診腎內科並開始討論腎臟替代治療的準備。',
        },
      };
    },
    ko: { title: '만성콩팥병 단계 계산기', desc: 'eGFR 값이 G1부터 G5까지 어느 단계에 드는지 봅니다.',
      long: 'eGFR은 콩팥이 1분에 걸러 내는 혈액의 양을 몸 크기에 맞춰 환산한 값입니다. 90 이상이 G1, 60~89가 G2이고, 60 아래로 석 달 넘게 이어지면 만성콩팥병으로 봅니다.',
      note: 'G1과 G2는 단백뇨 같은 콩팥 손상 증거가 함께 있어야 병으로 봅니다. 수치 하나만으로 정해지지 않습니다.' },
    en: { title: 'Chronic Kidney Disease Stage', desc: 'Which stage from G1 to G5 an eGFR value falls into.',
      long: 'eGFR estimates how much blood the kidneys filter each minute, scaled to body size. Above 90 is G1 and 60–89 is G2; a value under 60 sustained for more than three months is what defines chronic kidney disease.',
      note: 'G1 and G2 count as disease only alongside other evidence of kidney damage, such as protein in the urine. The number alone does not settle it.' },
  },

  /* ───────── 아이·성장 ───────── */
  {
    slug: 'child-sleep-need',
    icon: '🛏️',
    category: '아이·성장',
    fields: [
      { key: 'age', term: 'ageYears', unit: 'year', def: 7, min: 0, max: 25 },
    ],
    formula: '{sleepNeed} = ({sleepMin} + {sleepMax}) ÷ 2',
    compute: v => {
      const band = SLEEP_BY_AGE.find(([max]) => v.age <= max) ?? SLEEP_BY_AGE[SLEEP_BY_AGE.length - 1];
      const [, low, high] = band;
      return [
        { term: 'sleepNeed', unit: 'hour', value: round((low + high) / 2, 1), digits: 1, primary: true },
        { term: 'sleepMin', unit: 'hour', value: low, digits: 0 },
        { term: 'sleepMax', unit: 'hour', value: high, digits: 0 },
      ];
    },
    ko: { title: '나이별 권장 수면 시간', desc: '아이의 나이에 맞는 하루 수면 시간을 구합니다.',
      long: '어릴수록 많이 자야 하고, 그 양은 나이가 들며 계단처럼 줄어듭니다. 돌 전에는 낮잠을 합쳐 12~16시간, 초등학생은 9~12시간, 청소년은 8~10시간이 권장 구간입니다.',
      note: '돌 전후로는 낮잠이 이 시간에 포함됩니다. 아침에 스스로 깨고 낮에 졸려 하지 않으면 그 아이에게는 충분한 것입니다.' },
    en: { title: 'Sleep Needed by Age', desc: 'How much sleep a child needs each day at a given age.',
      long: 'The younger the child, the more sleep is needed, and the amount steps down as they grow. Under one it is 12–16 hours including naps, primary-school children need 9–12, and teenagers 8–10.',
      note: 'For infants and toddlers, naps count towards the total. If a child wakes on their own and is not drowsy during the day, they are getting enough.' },
  },

  /* ───────── 생활 대사 ───────── */
  {
    slug: 'nap-timing',
    icon: '😴',
    category: '생활 대사',
    fields: [
      { key: 'plan', term: 'minutes', unit: 'minute', def: 45, min: 0, max: 180 },
    ],
    formula: '{result} = {minutes} ≤ 55 → 20, {minutes} > 55 → 90',
    compute: v => {
      // 30~60분 사이에서 깨면 깊은 잠 도중이라 오히려 더 멍하다
      const best = v.plan <= 55 ? 20 : 90;
      return [
        { term: 'result', unit: 'minute', value: best, digits: 0, primary: true },
        { term: 'diff', unit: 'minute', value: round(best - v.plan, 0), digits: 0 },
      ];
    },
    verdict: v => {
      if (v.plan <= 0) return null;
      if (v.plan <= 25 || v.plan >= 80) {
        return {
          tone: 'good', ko: '깊은 잠에 빠지기 전이거나 한 주기를 마친 뒤라, 깨고 나서 개운합니다.',
          en: 'You wake either before deep sleep or after a full cycle, so you come round clear-headed.',
          l10n: {
            es: 'Despiertas antes del sueño profundo o tras un ciclo completo, así que te levantas despejado.',
            'pt-br': 'Você acorda antes do sono profundo ou após um ciclo completo, então desperta com a cabeça limpa.',
            ja: '深い眠りに入る前か、一周期を終えた後なので、目覚めがすっきりします。',
            de: 'Du wachst vor dem Tiefschlaf oder nach einem vollen Zyklus auf und bist gleich klar im Kopf.',
            fr: 'Vous vous réveillez avant le sommeil profond ou après un cycle complet : la tête est claire.',
            hi: 'आप गहरी नींद से पहले या पूरा चक्र पूरा होने के बाद उठते हैं, इसलिए दिमाग साफ़ रहता है।',
            'zh-hans': '你在进入深睡前或完成一个周期后醒来，起来时头脑清醒。',
            'zh-hant': '你在進入深睡前或完成一個週期後醒來，起來時頭腦清醒。',
          },
        };
      }
      return {
        tone: 'warn', ko: '깊은 잠 한가운데서 깨는 길이입니다. 20분으로 줄이거나 90분으로 늘리세요.',
        en: 'This length wakes you mid deep sleep — cut it to 20 minutes or stretch it to 90.',
        l10n: {
          es: 'Esta duración te despierta en pleno sueño profundo: bájala a 20 minutos o súbela a 90.',
          'pt-br': 'Essa duração acorda você no meio do sono profundo: reduza para 20 minutos ou estenda para 90.',
          ja: '深い眠りの最中に目覚める長さです。20分に短くするか、90分まで延ばしてください。',
          de: 'Diese Länge weckt dich mitten im Tiefschlaf — kürze auf 20 Minuten oder dehne auf 90 aus.',
          fr: 'Cette durée vous réveille en plein sommeil profond : ramenez-la à 20 minutes ou poussez à 90.',
          hi: 'यह अवधि आपको गहरी नींद के बीच जगाती है — इसे 20 मिनट कर दें या 90 मिनट तक बढ़ाएँ।',
          'zh-hans': '这个时长会让你在深睡中被叫醒，缩到 20 分钟或拉长到 90 分钟。',
          'zh-hant': '這個時長會讓你在深睡中被叫醒，縮到 20 分鐘或拉長到 90 分鐘。',
        },
      };
    },
    ko: { title: '낮잠 길이 계산기', desc: '계획한 낮잠 길이가 개운하게 깨는 구간인지 봅니다.',
      long: '잠은 얕은 잠에서 깊은 잠으로 내려갔다 다시 올라오는 주기를 대략 90분마다 되풀이합니다. 20분 안에 깨면 깊은 잠에 들기 전이라 바로 개운하고, 한 주기를 다 채우고 깨도 마찬가지입니다.',
      note: '30~60분은 가장 나쁜 구간입니다. 깊은 잠 한가운데서 깨면 30분 넘게 멍한 상태가 이어져, 안 잔 것보다 못할 때도 있습니다.' },
    en: { title: 'Nap Length Calculator', desc: 'Whether your planned nap ends at a point you can wake up clear.',
      long: 'Sleep cycles down into deep sleep and back up roughly every 90 minutes. Waking within about 20 minutes catches you before deep sleep starts, and waking after a full cycle catches you on the way back up.',
      note: 'Thirty to sixty minutes is the worst window. Waking from the middle of deep sleep leaves you foggy for half an hour or more — sometimes worse than not napping at all.' },
  },
];
