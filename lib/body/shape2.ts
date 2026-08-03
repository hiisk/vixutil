/**
 * 몸 수치 - 체중·체형 둘째 묶음 (10종)
 *
 * BMI 하나로 끝나지 않는 것들을 모았다. 같은 BMI에서도 지방이 어디 붙었는지,
 * 근육이 얼마나 있는지, 뼈대가 굵은지가 다르므로 지표를 여러 개 겹쳐 봐야 한다.
 */
import type { FormulaTool } from '../formula/types.ts';
import { ratio } from '../formula/types.ts';
import { round } from '../formula/num.ts';

const bmiOf = (kg: number, cm: number): number => ratio(kg, Math.pow(cm / 100, 2));

export const SHAPE2_TOOLS: FormulaTool[] = [
  {
    slug: 'bmi-prime',
    icon: '📏',
    category: '체중·체형',
    fields: [
      { key: 'kg', term: 'weightKgB', unit: 'kg', def: 74, min: 1 },
      { key: 'cm', term: 'heightCm', unit: 'cm', def: 172, min: 50 },
    ],
    formula: '{bmiPrime} = {bmi} ÷ 25',
    compute: v => {
      const bmi = bmiOf(v.kg, v.cm);
      return [
        { term: 'bmiPrime', unit: 'none', value: round(ratio(bmi, 25), 3), digits: 3, primary: true },
        { term: 'bmi', unit: 'none', value: round(bmi, 1), digits: 1 },
        { term: 'diff', unit: 'kg', value: round(v.kg - 25 * Math.pow(v.cm / 100, 2), 1), digits: 1 },
      ];
    },
    verdict: (_v, out) => {
      const p = out[0].value;
      return p < 0.74
        ? { ko: `${p}은 저체중 쪽입니다. 1보다 얼마나 작은지가 그대로 여유입니다.`, en: `${p} sits in the underweight range; how far below one is your margin.`, l10n: { es: `${p} cae en la franja de bajo peso; lo que falta hasta uno es tu margen.`, 'pt-br': `${p} fica na faixa de baixo peso; o quanto falta até um é a sua margem.`, ja: `${p}は低体重の側です。1からどれだけ下かが、そのまま余裕の幅になります。`, de: `${p} liegt im Untergewicht; wie weit unter eins, das ist dein Spielraum.`, fr: `${p} se situe côté insuffisance pondérale ; l’écart sous un, c’est ta marge.`, hi: `${p} कम वज़न की तरफ़ है; एक से जितना नीचे, उतनी ही आपकी गुंजाइश।` }, tone: 'warn' }
        : p <= 1
          ? { ko: `${p}은 정상 범위입니다. 1이 과체중 문턱입니다.`, en: `${p} is in range — one is the overweight threshold.`, l10n: { es: `${p} está en rango: uno es el umbral del sobrepeso.`, 'pt-br': `${p} está na faixa normal: um é o limite do sobrepeso.`, ja: `${p}は正常範囲です。1が過体重の入り口になります。`, de: `${p} liegt im Rahmen — eins ist die Schwelle zum Übergewicht.`, fr: `${p} est dans la norme : un marque le seuil du surpoids.`, hi: `${p} सामान्य दायरे में है — एक ही अधिक वज़न की दहलीज़ है।` }, tone: 'good' }
          : { ko: `${p}은 과체중 문턱을 ${round((p - 1) * 100, 0)}% 넘겼습니다.`, en: `${p} is ${round((p - 1) * 100, 0)}% past the overweight threshold.`, l10n: { es: `${p} supera el umbral de sobrepeso en un ${round((p - 1) * 100, 0)} %.`, 'pt-br': `${p} passa do limite de sobrepeso em ${round((p - 1) * 100, 0)} %.`, ja: `${p}は過体重の入り口を${round((p - 1) * 100, 0)}%超えています。`, de: `${p} liegt ${round((p - 1) * 100, 0)} % über der Übergewichtsschwelle.`, fr: `${p} dépasse le seuil de surpoids de ${round((p - 1) * 100, 0)} %.`, hi: `${p} अधिक वज़न की दहलीज़ से ${round((p - 1) * 100, 0)}% ऊपर है।` }, tone: 'bad' };
    },
    ko: { title: 'BMI 프라임 계산기', desc: 'BMI를 과체중 기준선으로 나눠 1을 기준으로 읽습니다.',
      long: 'BMI 25가 과체중 문턱이라면 BMI를 25로 나눈 값은 1이 문턱이 됩니다. 0.92면 문턱의 92%, 1.15면 15% 넘긴 것이라 숫자를 외우지 않아도 위치가 바로 보입니다.',
      note: 'BMI 25 기준은 세계보건기구의 국제 기준입니다. 아시아·태평양 기준은 23을 과체중으로 보므로 그 기준으로 읽으려면 23으로 나누세요.' },
    en: { title: 'BMI Prime', desc: 'BMI divided by the overweight cut-off, so one is the line.',
      long: 'If BMI 25 is the overweight threshold, dividing BMI by 25 puts the line at exactly one. 0.92 means 92% of the way there; 1.15 means 15% past it — no need to remember the cut-offs.',
      note: 'The 25 cut-off is the WHO international standard. Asia-Pacific guidance treats 23 as overweight, so divide by 23 to read it that way.' },
  },
  {
    slug: 'healthy-weight-range',
    icon: '🎯',
    category: '체중·체형',
    fields: [
      { key: 'cm', term: 'heightCm', unit: 'cm', def: 168, min: 50 },
      { key: 'kg', term: 'weightKgB', unit: 'kg', def: 70, min: 1 },
    ],
    formula: '{weightLow} = 18.5 × ({heightCm} ÷ 100) ²',
    compute: v => {
      const m2 = Math.pow(v.cm / 100, 2);
      const lo = 18.5 * m2;
      const hi = 24.9 * m2;
      return [
        { term: 'weightLow', unit: 'kg', value: round(lo, 1), digits: 1, primary: true },
        { term: 'weightHigh', unit: 'kg', value: round(hi, 1), digits: 1 },
        { term: 'bmi', unit: 'none', value: round(bmiOf(v.kg, v.cm), 1), digits: 1 },
        { term: 'diff', unit: 'kg', value: round(v.kg > hi ? v.kg - hi : v.kg < lo ? v.kg - lo : 0, 1), digits: 1 },
      ];
    },
    verdict: (v, out) => {
      const gap = out[3].value;
      return gap === 0
        ? { ko: `${out[0].value}~${out[1].value}kg 범위 안에 있습니다.`, en: `You are inside the ${out[0].value}–${out[1].value} kg band.`, l10n: { es: `Estás dentro de la franja de ${out[0].value}–${out[1].value} kg.`, 'pt-br': `Você está dentro da faixa de ${out[0].value}–${out[1].value} kg.`, ja: `${out[0].value}〜${out[1].value}kgの範囲に入っています。`, de: `Du liegst im Bereich von ${out[0].value}–${out[1].value} kg.`, fr: `Tu es dans la fourchette ${out[0].value}–${out[1].value} kg.`, hi: `आप ${out[0].value}–${out[1].value} किग्रा के दायरे में हैं।` }, tone: 'good' }
        : gap > 0
          ? { ko: `범위 위쪽을 ${round(gap, 1)}kg 넘겼습니다.`, en: `You are ${round(gap, 1)} kg above the band.`, l10n: { es: `Estás ${round(gap, 1)} kg por encima de la franja.`, 'pt-br': `Você está ${round(gap, 1)} kg acima da faixa.`, ja: `範囲の上限を${round(gap, 1)}kg超えています。`, de: `Du liegst ${round(gap, 1)} kg über dem Bereich.`, fr: `Tu es ${round(gap, 1)} kg au-dessus de la fourchette.`, hi: `आप दायरे से ${round(gap, 1)} किग्रा ऊपर हैं।` }, tone: 'warn' }
          : { ko: `범위 아래쪽보다 ${round(-gap, 1)}kg 적습니다.`, en: `You are ${round(-gap, 1)} kg below the band.`, l10n: { es: `Estás ${round(-gap, 1)} kg por debajo de la franja.`, 'pt-br': `Você está ${round(-gap, 1)} kg abaixo da faixa.`, ja: `範囲の下限より${round(-gap, 1)}kg少ないです。`, de: `Du liegst ${round(-gap, 1)} kg unter dem Bereich.`, fr: `Tu es ${round(-gap, 1)} kg sous la fourchette.`, hi: `आप दायरे से ${round(-gap, 1)} किग्रा नीचे हैं।` }, tone: 'warn' };
    },
    ko: { title: '정상 체중 범위 계산기', desc: '키로 BMI 정상 구간에 해당하는 체중 범위를 구합니다.',
      long: 'BMI 18.5부터 24.9까지가 정상 구간이므로, 키(m)의 제곱에 두 숫자를 각각 곱하면 체중 범위가 나옵니다. 정상 체중은 한 점이 아니라 폭이 넓은 띠입니다.',
      note: '근육이 많으면 이 범위를 넘겨도 문제가 아닙니다. 범위를 벗어났을 때는 허리둘레와 체지방률을 함께 보세요.' },
    en: { title: 'Healthy Weight Range', desc: 'The weight band that puts your BMI in the normal range.',
      long: 'The normal band runs from BMI 18.5 to 24.9, so multiply your height in metres squared by each number. Healthy weight is a wide band, not a single figure.',
      note: 'Plenty of muscle can push you above the band without any problem. If you fall outside it, look at waist and body fat too.' },
  },
  {
    slug: 'waist-target',
    icon: '📐',
    category: '체중·체형',
    fields: [
      { key: 'cm', term: 'heightCm', unit: 'cm', def: 172, min: 50 },
      { key: 'waist', term: 'waistCm', unit: 'cm', def: 92, min: 30 },
    ],
    formula: '{waistTarget} = {heightCm} × 0.5',
    compute: v => {
      const target = v.cm * 0.5;
      return [
        { term: 'waistTarget', unit: 'cm', value: round(target, 1), digits: 1, primary: true },
        { term: 'whtr', unit: 'none', value: round(ratio(v.waist, v.cm), 3), digits: 3 },
        { term: 'diff', unit: 'cm', value: round(v.waist - target, 1), digits: 1 },
      ];
    },
    verdict: (_v, out) =>
      out[2].value <= 0
        ? { ko: `목표 안에 있습니다. 허리·키 비율이 ${out[1].value}입니다.`, en: `Inside target — your waist-to-height is ${out[1].value}.`, l10n: { es: `Dentro del objetivo: tu relación cintura-estatura es ${out[1].value}.`, 'pt-br': `Dentro da meta: sua relação cintura-altura é ${out[1].value}.`, ja: `目標の内側です。ウエスト身長比は${out[1].value}です。`, de: `Im Ziel — dein Taille-Größe-Verhältnis liegt bei ${out[1].value}.`, fr: `Dans l’objectif : ton rapport tour de taille/taille est de ${out[1].value}.`, hi: `लक्ष्य के भीतर — आपका कमर-लंबाई अनुपात ${out[1].value} है।` }, tone: 'good' }
        : { ko: `목표보다 ${out[2].value}cm 굵습니다. 허리·키 비율 ${out[1].value}는 0.5를 넘습니다.`, en: `${out[2].value} cm over target; a ratio of ${out[1].value} is past 0.5.`, l10n: { es: `${out[2].value} cm por encima del objetivo; una relación de ${out[1].value} pasa de 0,5.`, 'pt-br': `${out[2].value} cm acima da meta; uma relação de ${out[1].value} passa de 0,5.`, ja: `目標より${out[2].value}cm太いです。比${out[1].value}は0.5を超えています。`, de: `${out[2].value} cm über dem Ziel; ein Verhältnis von ${out[1].value} liegt über 0,5.`, fr: `${out[2].value} cm au-dessus de l’objectif ; un rapport de ${out[1].value} dépasse 0,5.`, hi: `लक्ष्य से ${out[2].value} सेमी ज़्यादा; ${out[1].value} का अनुपात 0.5 पार कर जाता है।` }, tone: 'warn' },
    ko: { title: '목표 허리둘레 계산기', desc: '키의 절반을 기준으로 목표 허리둘레를 구합니다.',
      long: '허리둘레가 키의 절반을 넘지 않으면 된다는 기준은 남녀·인종을 가리지 않고 쓸 수 있어 간단합니다. 172cm라면 86cm가 상한입니다.',
      note: '허리는 배꼽 높이에서 숨을 내쉰 뒤 재야 합니다. 배에 힘을 주거나 옷 위로 재면 실제보다 작게 나옵니다.' },
    en: { title: 'Target Waist Size', desc: 'Keep your waist under half your height.',
      long: 'The “waist under half your height” rule works across sexes and populations, which is why it is so widely quoted. At 172 cm the ceiling is 86 cm.',
      note: 'Measure at navel height after breathing out. Holding your stomach in or measuring over clothes reads smaller than reality.' },
  },
  {
    slug: 'body-fat-bmi',
    icon: '🫀',
    category: '체중·체형',
    fields: [
      { key: 'kg', term: 'weightKgB', unit: 'kg', def: 74, min: 1 },
      { key: 'cm', term: 'heightCm', unit: 'cm', def: 172, min: 50 },
      { key: 'age', term: 'ageYears', def: 35, min: 5, max: 100 },
      { key: 'sex', term: 'sexFactor', def: 1, min: 0, max: 1 },
    ],
    formula: '{bodyFat} = 1.20 × {bmi} + 0.23 × {ageYears} − 10.8 × {sexFactor} − 5.4',
    compute: v => {
      const bmi = bmiOf(v.kg, v.cm);
      const fat = 1.2 * bmi + 0.23 * v.age - 10.8 * v.sex - 5.4;
      return [
        { term: 'bodyFat', unit: 'percent', value: round(Math.max(0, fat), 1), digits: 1, primary: true },
        { term: 'fatMass', unit: 'kg', value: round(v.kg * Math.max(0, fat) / 100, 1), digits: 1 },
        { term: 'leanMass', unit: 'kg', value: round(v.kg * (1 - Math.max(0, fat) / 100), 1), digits: 1 },
        { term: 'bmi', unit: 'none', value: round(bmi, 1), digits: 1 },
      ];
    },
    ko: { title: 'BMI로 체지방률 추정', desc: 'BMI·나이·성별만으로 체지방률을 추정합니다.',
      long: '줄자도 체성분계도 없을 때 쓰는 추정식입니다. 같은 BMI라도 나이가 많으면 지방 비율이 높고, 여성이 남성보다 약 11%p 높게 나옵니다.',
      note: '근육이 많은 사람에게는 실제보다 높게 나옵니다. 줄자를 쓸 수 있으면 목·허리로 재는 방식이 더 정확합니다.' },
    en: { title: 'Body Fat from BMI', desc: 'Estimate body fat percentage from BMI, age and sex alone.',
      long: 'This is the estimate to use when you have neither a tape measure nor a scale that reads composition. At the same BMI, older bodies carry more fat, and women read about 11 points higher than men.',
      note: 'It overestimates for muscular people. If you have a tape measure, the neck-and-waist method is more accurate.' },
  },
  {
    slug: 'ffmi',
    icon: '💪',
    category: '체중·체형',
    fields: [
      { key: 'kg', term: 'weightKgB', unit: 'kg', def: 80, min: 1 },
      { key: 'cm', term: 'heightCm', unit: 'cm', def: 178, min: 50 },
      { key: 'fat', term: 'bodyFat', unit: 'percent', def: 15, min: 1, max: 60 },
    ],
    formula: '{ffmi} = {leanMass} ÷ ({heightCm} ÷ 100) ² + 6.1 × (1.8 − {heightCm} ÷ 100)',
    compute: v => {
      const lean = v.kg * (1 - v.fat / 100);
      const m = v.cm / 100;
      const raw = ratio(lean, m * m);
      return [
        { term: 'ffmi', unit: 'none', value: round(raw + 6.1 * (1.8 - m), 1), digits: 1, primary: true },
        { term: 'leanMass', unit: 'kg', value: round(lean, 1), digits: 1 },
        { term: 'fatMass', unit: 'kg', value: round(v.kg - lean, 1), digits: 1 },
      ];
    },
    verdict: (_v, out) => {
      const f = out[0].value;
      return f < 18
        ? { ko: `${f}은 근육이 적은 편입니다.`, en: `${f} is on the light side for muscle.`, l10n: { es: `${f} indica poca masa muscular.`, 'pt-br': `${f} indica pouca massa muscular.`, ja: `${f}は筋肉が少なめの部類です。`, de: `${f} spricht für wenig Muskelmasse.`, fr: `${f} indique peu de masse musculaire.`, hi: `${f} यानी मांसपेशी कम होने की तरफ़।` }, tone: 'warn' }
        : f < 22
          ? { ko: `${f}은 꾸준히 운동한 몸의 범위입니다.`, en: `${f} is the range of a consistently trained body.`, l10n: { es: `${f} es el rango de un cuerpo entrenado con constancia.`, 'pt-br': `${f} é a faixa de um corpo treinado com constância.`, ja: `${f}は継続して鍛えてきた体の範囲です。`, de: `${f} ist der Bereich eines beständig trainierten Körpers.`, fr: `${f} correspond à un corps entraîné avec régularité.`, hi: `${f} लगातार कसरत किए शरीर का दायरा है।` }, tone: 'good' }
          : { ko: `${f}은 매우 높습니다. 25 부근은 자연적으로 도달하기 어려운 수준으로 봅니다.`, en: `${f} is very high; around 25 is considered hard to reach naturally.`, l10n: { es: `${f} es muy alto; en torno a 25 se considera difícil de alcanzar de forma natural.`, 'pt-br': `${f} é muito alto; perto de 25 é tido como difícil de alcançar naturalmente.`, ja: `${f}はかなり高い値です。25あたりは自然には届きにくい水準とされます。`, de: `${f} ist sehr hoch; um 25 gilt als natürlich kaum erreichbar.`, fr: `${f} est très élevé ; autour de 25 est considéré comme difficile à atteindre naturellement.`, hi: `${f} बहुत ऊँचा है; 25 के आसपास प्राकृतिक रूप से पहुँचना कठिन माना जाता है।` }, tone: 'good' };
    },
    ko: { title: 'FFMI 제지방 지수 계산기', desc: '지방을 뺀 몸무게를 키로 나눠 근육량 수준을 봅니다.',
      long: 'BMI는 근육과 지방을 구분하지 못하므로, 지방을 뺀 무게만으로 같은 계산을 하면 근육량 지표가 됩니다. 키에 따른 편향을 줄이기 위해 1.8m 기준으로 보정합니다.',
      note: '체지방률 입력이 틀리면 결과가 그만큼 틀립니다. 체성분계 값은 수분 상태에 따라 하루에도 몇 %p씩 움직입니다.' },
    en: { title: 'FFMI (Fat-Free Mass Index)', desc: 'Divide your fat-free weight by height to gauge muscle.',
      long: 'BMI cannot separate muscle from fat, so running the same calculation on fat-free weight turns it into a muscle index. A correction to a 1.8 m reference removes most of the height bias.',
      note: 'A wrong body-fat input carries straight through. Bioimpedance readings swing several points in a day with hydration.' },
  },
  {
    slug: 'weight-change-percent',
    icon: '📉',
    category: '체중·체형',
    fields: [
      { key: 'before', term: 'weightBefore', unit: 'kg', def: 78, min: 1 },
      { key: 'now', term: 'weightNow', unit: 'kg', def: 72, min: 1 },
      { key: 'months', term: 'months', unit: 'month', def: 3, min: 1 },
    ],
    formula: '{change} = ({weightNow} − {weightBefore}) ÷ {weightBefore} × 100',
    compute: v => {
      const pct = ratio(v.now - v.before, v.before) * 100;
      return [
        { term: 'change', unit: 'percent', value: round(pct, 2), digits: 2, primary: true },
        { term: 'diff', unit: 'kg', value: round(v.now - v.before, 1), digits: 1 },
        { term: 'lossPerWeek', unit: 'kg', value: round(ratio(v.before - v.now, v.months * 4.345), 2), digits: 2 },
      ];
    },
    verdict: (v, out) => {
      const drop = -out[0].value;
      const fast = drop / v.months > 2.5;
      return drop >= 5 && v.months <= 6
        ? { ko: `6개월 안에 5% 이상 줄었습니다(${round(drop, 1)}%). 의도한 감량이 아니라면 확인이 필요한 변화입니다.`, en: `A drop of ${round(drop, 1)}% within six months is the level clinicians flag if it was not intentional.`, l10n: { es: `Una bajada del ${round(drop, 1)} % en seis meses es el nivel que los médicos marcan si no fue buscada.`, 'pt-br': `Uma queda de ${round(drop, 1)} % em seis meses é o nível que os médicos sinalizam se não foi intencional.`, ja: `半年で${round(drop, 1)}%の減少は、意図した減量でなければ医師が注意を向ける水準です。`, de: `Ein Verlust von ${round(drop, 1)} % in sechs Monaten ist die Marke, bei der Ärztinnen und Ärzte nachfragen, wenn er ungewollt war.`, fr: `Une perte de ${round(drop, 1)} % en six mois est le niveau que les médecins relèvent si elle n’était pas voulue.`, hi: `छह महीने में ${round(drop, 1)}% की गिरावट वह स्तर है जिस पर डॉक्टर ध्यान देते हैं, अगर यह जानबूझकर न हुई हो।` }, tone: 'warn' }
        : fast
          ? { ko: `월 ${round(drop / v.months, 1)}% 감량은 빠른 편입니다. 근육 손실이 함께 오기 쉽습니다.`, en: `Losing ${round(drop / v.months, 1)}% a month is brisk; muscle tends to go with it.`, l10n: { es: `Perder un ${round(drop / v.months, 1)} % al mes es rápido; el músculo suele irse con ello.`, 'pt-br': `Perder ${round(drop / v.months, 1)} % por mês é rápido; o músculo costuma ir junto.`, ja: `月${round(drop / v.months, 1)}%の減量は速い部類です。筋肉も一緒に落ちやすくなります。`, de: `${round(drop / v.months, 1)} % im Monat ist zügig; Muskulatur geht dabei gern mit.`, fr: `Perdre ${round(drop / v.months, 1)} % par mois est rapide ; le muscle part souvent avec.`, hi: `महीने में ${round(drop / v.months, 1)}% घटाना तेज़ है; मांसपेशी भी साथ चली जाती है।` }, tone: 'warn' }
          : { ko: `기간과 폭이 무리 없는 범위입니다.`, en: `The pace and size of the change look reasonable.`, l10n: { es: `El ritmo y la magnitud del cambio parecen razonables.`, 'pt-br': `O ritmo e o tamanho da mudança parecem razoáveis.`, ja: `期間と幅は無理のない範囲です。`, de: `Tempo und Ausmaß der Veränderung wirken vernünftig.`, fr: `Le rythme et l’ampleur du changement paraissent raisonnables.`, hi: `बदलाव की रफ़्तार और मात्रा दोनों वाजिब लगती हैं।` }, tone: 'good' };
    },
    ko: { title: '체중 변화율 계산기', desc: '체중이 몇 % 변했는지와 주당 변화 속도를 함께 봅니다.',
      long: '차이를 이전 체중으로 나눕니다. 절대 kg보다 비율이 의미 있는데, 50kg인 사람의 3kg과 100kg인 사람의 3kg은 몸에 주는 부담이 다르기 때문입니다.',
      note: '의도하지 않은 감량이 6개월에 5%를 넘거나 1년에 10%를 넘으면 원인을 찾아야 하는 신호로 봅니다.' },
    en: { title: 'Weight Change Percentage', desc: 'How much your weight moved in percent, and the weekly pace.',
      long: 'Divide the difference by the earlier weight. The percentage matters more than the kilograms: 3 kg off a 50 kg frame is not the same event as 3 kg off 100 kg.',
      note: 'Unintentional loss above 5% in six months, or 10% in a year, is treated as a signal worth investigating.' },
  },
  {
    slug: 'frame-size',
    icon: '🦴',
    category: '체중·체형',
    fields: [
      { key: 'cm', term: 'heightCm', unit: 'cm', def: 170, min: 50 },
      { key: 'wrist', term: 'wristCm', unit: 'cm', def: 17, min: 8, max: 30 },
    ],
    formula: '{frameIndex} = {heightCm} ÷ {wristCm}',
    compute: v => [
      { term: 'frameIndex', unit: 'none', value: round(ratio(v.cm, v.wrist), 2), digits: 2, primary: true },
      { term: 'wristCm', unit: 'cm', value: round(v.wrist, 1), digits: 1 },
      { term: 'heightCm', unit: 'cm', value: round(v.cm, 1), digits: 1 },
    ],
    verdict: (_v, out) => {
      const r = out[0].value;
      return r > 10.4
        ? { ko: `${r}은 뼈대가 가는 쪽입니다. 같은 키에서 표준 체중이 조금 낮게 잡힙니다.`, en: `${r} indicates a small frame — expect a slightly lower reference weight at this height.`, l10n: { es: `${r} indica una complexión ligera: a esta estatura el peso de referencia baja un poco.`, 'pt-br': `${r} indica compleição leve: nessa altura o peso de referência fica um pouco menor.`, ja: `${r}は骨格が細い方です。同じ身長でも標準体重が少し低めに出ます。`, de: `${r} steht für einen zarten Körperbau — bei dieser Größe liegt das Referenzgewicht etwas niedriger.`, fr: `${r} correspond à une ossature fine : à cette taille, le poids de référence descend un peu.`, hi: `${r} यानी हड्डियों का ढाँचा पतला — इसी लंबाई पर आदर्श वज़न थोड़ा कम बैठता है।` }, tone: 'good' }
        : r >= 9.6
          ? { ko: `${r}은 보통 뼈대입니다.`, en: `${r} is a medium frame.`, l10n: { es: `${r} es una complexión media.`, 'pt-br': `${r} é uma compleição média.`, ja: `${r}は標準的な骨格です。`, de: `${r} ist ein mittlerer Körperbau.`, fr: `${r} correspond à une ossature moyenne.`, hi: `${r} यानी सामान्य ढाँचा।` }, tone: 'good' }
          : { ko: `${r}은 뼈대가 굵은 쪽입니다. 같은 키에서 표준 체중이 조금 높게 잡힙니다.`, en: `${r} indicates a large frame — the reference weight sits a little higher.`, l10n: { es: `${r} indica una complexión ancha: el peso de referencia sube un poco.`, 'pt-br': `${r} indica compleição larga: o peso de referência sobe um pouco.`, ja: `${r}は骨格が太い方です。同じ身長でも標準体重が少し高めに出ます。`, de: `${r} steht für einen kräftigen Körperbau — das Referenzgewicht liegt etwas höher.`, fr: `${r} correspond à une ossature large : le poids de référence monte un peu.`, hi: `${r} यानी ढाँचा चौड़ा — आदर्श वज़न थोड़ा ऊपर बैठता है।` }, tone: 'good' };
    },
    ko: { title: '골격 크기 계산기', desc: '키를 손목둘레로 나눠 뼈대가 가는지 굵은지 봅니다.',
      long: '손목은 지방이 거의 붙지 않아 뼈대 크기를 재는 자리로 쓰입니다. 키를 손목둘레로 나눈 값이 클수록 뼈대가 가늘다는 뜻입니다.',
      note: '골격 크기는 표준 체중을 몇 kg 조정하는 참고값이지 건강 지표가 아닙니다. 뼈대가 굵다고 체지방이 적은 것은 아닙니다.' },
    en: { title: 'Body Frame Size', desc: 'Divide height by wrist circumference to gauge how heavy your skeleton is.',
      long: 'The wrist carries almost no fat, which makes it a clean place to measure frame. A larger height-to-wrist figure means a finer frame.',
      note: 'Frame size only nudges a reference weight by a few kilograms; it is not a health measure. A big frame says nothing about body fat.' },
  },
  {
    slug: 'muscle-mass-index',
    icon: '🏋️',
    category: '체중·체형',
    fields: [
      { key: 'kg', term: 'weightKgB', unit: 'kg', def: 62, min: 1 },
      { key: 'cm', term: 'heightCm', unit: 'cm', def: 165, min: 50 },
      { key: 'fat', term: 'bodyFat', unit: 'percent', def: 28, min: 1, max: 60 },
    ],
    formula: '{smi} = {leanMass} × 0.75 ÷ ({heightCm} ÷ 100) ²',
    compute: v => {
      const lean = v.kg * (1 - v.fat / 100);
      // 사지 근육은 제지방의 약 3/4을 차지한다
      const limb = lean * 0.75;
      return [
        { term: 'smi', unit: 'none', value: round(ratio(limb, Math.pow(v.cm / 100, 2)), 2), digits: 2, primary: true },
        { term: 'leanMass', unit: 'kg', value: round(lean, 1), digits: 1 },
        { term: 'fatMass', unit: 'kg', value: round(v.kg - lean, 1), digits: 1 },
      ];
    },
    verdict: (v, out) => {
      const cut = v.fat >= 25 ? 5.7 : 7.0;
      return out[0].value >= cut
        ? { ko: `${out[0].value}는 기준선 ${cut} 위입니다.`, en: `${out[0].value} sits above the ${cut} cut-off.`, l10n: { es: `${out[0].value} queda por encima del umbral de ${cut}.`, 'pt-br': `${out[0].value} fica acima do limite de ${cut}.`, ja: `${out[0].value}は基準値${cut}を上回っています。`, de: `${out[0].value} liegt über dem Grenzwert von ${cut}.`, fr: `${out[0].value} passe au-dessus du seuil de ${cut}.`, hi: `${out[0].value} सीमा ${cut} से ऊपर है।` }, tone: 'good' }
        : { ko: `${out[0].value}는 기준선 ${cut}보다 낮습니다. 근력 운동과 단백질 섭취를 함께 보세요.`, en: `${out[0].value} is below the ${cut} cut-off — look at resistance training and protein together.`, l10n: { es: `${out[0].value} queda por debajo del umbral de ${cut}: mira a la vez el entrenamiento de fuerza y la proteína.`, 'pt-br': `${out[0].value} fica abaixo do limite de ${cut}: olhe junto o treino de força e a proteína.`, ja: `${out[0].value}は基準値${cut}を下回っています。筋力トレーニングとたんぱく質を合わせて見直してください。`, de: `${out[0].value} liegt unter dem Grenzwert von ${cut} — schau dir Krafttraining und Eiweiß gemeinsam an.`, fr: `${out[0].value} passe sous le seuil de ${cut} : regarde ensemble la musculation et les protéines.`, hi: `${out[0].value} सीमा ${cut} से नीचे है — वज़न वाली कसरत और प्रोटीन दोनों साथ देखें।` }, tone: 'warn' };
    },
    ko: { title: '사지근육지수 추정 계산기', desc: '팔다리 근육량을 키로 나눠 근육이 부족한지 봅니다.',
      long: '근육이 나이와 함께 줄어드는 것을 보는 지표입니다. 제지방량의 약 4분의 3을 사지 근육으로 잡고 키의 제곱으로 나눕니다. 낮으면 걷기·계단 오르기부터 힘들어집니다.',
      note: '제대로 재려면 체성분 측정 장비가 필요합니다. 이 값은 체지방률에서 되짚은 추정치이므로 방향만 참고하세요.' },
    en: { title: 'Skeletal Muscle Index (Estimate)', desc: 'Limb muscle divided by height, to spot muscle shortfall.',
      long: 'This is the index used to track muscle lost with age. Take about three quarters of fat-free mass as limb muscle and divide by height squared. Low values show up first as trouble with stairs and walking.',
      note: 'A proper measurement needs body-composition equipment. This works backwards from body fat, so treat it as a direction rather than a number.' },
  },
  {
    slug: 'ideal-weight-broca',
    icon: '⚖️',
    category: '체중·체형',
    fields: [
      { key: 'cm', term: 'heightCm', unit: 'cm', def: 172, min: 100 },
      { key: 'sex', term: 'sexFactor', def: 1, min: 0, max: 1 },
      { key: 'kg', term: 'weightKgB', unit: 'kg', def: 74, min: 1 },
    ],
    formula: '{brocaWeight} = ({heightCm} − 100) × (0.9 × {sexFactor} + 0.85 × (1 − {sexFactor}))',
    compute: v => {
      const factor = v.sex === 1 ? 0.9 : 0.85;
      const ideal = (v.cm - 100) * factor;
      return [
        { term: 'brocaWeight', unit: 'kg', value: round(ideal, 1), digits: 1, primary: true },
        { term: 'percent', unit: 'percent', value: round(ratio(v.kg, ideal) * 100, 1), digits: 1 },
        { term: 'diff', unit: 'kg', value: round(v.kg - ideal, 1), digits: 1 },
      ];
    },
    ko: { title: '브로카 변법 표준체중', desc: '키에서 100을 뺀 뒤 계수를 곱하는 고전 방식으로 표준체중을 구합니다.',
      long: '19세기에 만들어져 지금도 병원 서식에서 보이는 계산입니다. 남성은 0.9, 여성은 0.85를 곱합니다. 계산이 암산으로 되는 것이 장점이고, BMI 기반 값보다 조금 낮게 나옵니다.',
      note: '키가 아주 크거나 아주 작으면 오차가 커집니다. 150cm 아래나 190cm 위에서는 BMI 기반 정상 범위를 쓰는 편이 낫습니다.' },
    en: { title: 'Broca Index Ideal Weight', desc: 'The classic “height minus 100, times a factor” reference weight.',
      long: 'A nineteenth-century calculation still printed on hospital forms. Multiply by 0.9 for men and 0.85 for women. Its virtue is that you can do it in your head; it lands a little below BMI-based figures.',
      note: 'Accuracy falls away at the extremes. Below 150 cm or above 190 cm, use the BMI-based healthy range instead.' },
  },
  {
    slug: 'waist-chest-ratio',
    icon: '👕',
    category: '체중·체형',
    fields: [
      { key: 'waist', term: 'waistCm', unit: 'cm', def: 84, min: 30 },
      { key: 'chest', term: 'chestCm', unit: 'cm', def: 100, min: 40 },
      { key: 'hip', term: 'hipCm', unit: 'cm', def: 98, min: 40 },
    ],
    formula: '{shapeRatio} = {waistCm} ÷ {chestCm}',
    compute: v => [
      { term: 'shapeRatio', unit: 'none', value: round(ratio(v.waist, v.chest), 3), digits: 3, primary: true },
      { term: 'whr', unit: 'none', value: round(ratio(v.waist, v.hip), 3), digits: 3 },
      { term: 'diff', unit: 'cm', value: round(v.chest - v.waist, 1), digits: 1 },
    ],
    verdict: (v, out) => {
      const wc = out[0].value;
      const whr = out[1].value;
      return wc < 0.85 && whr < 0.9
        ? { ko: `가슴·엉덩이보다 허리가 뚜렷하게 좁습니다. 옷을 고를 때 허리 라인이 있는 쪽이 잘 맞습니다.`, en: `Your waist is clearly narrower than both chest and hip — fitted cuts suit this shape.`, l10n: { es: `Tu cintura es claramente más estrecha que pecho y cadera: los cortes entallados le sientan bien a esta silueta.`, 'pt-br': `Sua cintura é bem mais estreita que peito e quadril: cortes ajustados caem bem nessa silhueta.`, ja: `胸・腰よりウエストがはっきり細い体型です。服はウエストラインの入ったものが合います。`, de: `Deine Taille ist deutlich schmaler als Brust und Hüfte — taillierte Schnitte stehen dieser Form gut.`, fr: `Ta taille est nettement plus fine que la poitrine et les hanches : les coupes cintrées vont bien à cette silhouette.`, hi: `आपकी कमर छाती और कूल्हे दोनों से साफ़ तौर पर पतली है — कमर पर फ़िट होने वाले कपड़े इस आकार पर जँचते हैं।` }, tone: 'good' }
        : v.waist >= v.chest
          ? { ko: `허리가 가슴보다 굵습니다. 허리둘레를 키의 절반 아래로 두는 것을 먼저 보세요.`, en: `Your waist is wider than your chest; the first target is getting it under half your height.`, l10n: { es: `Tu cintura es más ancha que tu pecho; el primer objetivo es bajarla por debajo de la mitad de tu estatura.`, 'pt-br': `Sua cintura é mais larga que o peito; a primeira meta é levá-la abaixo da metade da sua altura.`, ja: `ウエストが胸より太い状態です。まずは身長の半分より細くすることを目標にしてください。`, de: `Deine Taille ist breiter als die Brust; das erste Ziel ist, sie unter die halbe Körpergröße zu bringen.`, fr: `Ton tour de taille dépasse ton tour de poitrine ; le premier objectif est de le ramener sous la moitié de ta taille.`, hi: `आपकी कमर छाती से चौड़ी है; पहला लक्ष्य इसे अपनी लंबाई के आधे से नीचे लाना है।` }, tone: 'warn' }
          : { ko: `허리와 가슴 차이가 크지 않은 직선형입니다.`, en: `Waist and chest are close — a straighter shape.`, l10n: { es: `Cintura y pecho van parejos: una silueta más recta.`, 'pt-br': `Cintura e peito ficam próximos: uma silhueta mais reta.`, ja: `ウエストと胸の差が小さい、直線的な体型です。`, de: `Taille und Brust liegen nah beieinander — eine geradere Form.`, fr: `Taille et poitrine sont proches : une silhouette plus droite.`, hi: `कमर और छाती के बीच फ़र्क़ कम है — आकार ज़्यादा सीधा है।` }, tone: 'good' };
    },
    ko: { title: '허리·가슴·엉덩이 비율 계산기', desc: '세 둘레로 체형이 어느 쪽에 가까운지 봅니다.',
      long: '허리를 가슴으로 나눈 값과 허리를 엉덩이로 나눈 값을 함께 봅니다. 두 값이 모두 작으면 허리가 들어간 체형, 허리가 가슴보다 굵으면 복부에 지방이 몰린 체형입니다.',
      note: '체형은 좋고 나쁨이 아니라 옷 고르기와 지방 분포를 보는 참고입니다. 건강 판단은 허리·키 비율로 하세요.' },
    en: { title: 'Waist, Chest & Hip Ratios', desc: 'Read your shape from three circumferences.',
      long: 'Look at waist over chest alongside waist over hip. Both small means a defined waist; a waist wider than the chest means fat has gathered around the middle.',
      note: 'Shape is not good or bad — it helps with clothes and shows fat distribution. For health, use waist-to-height.' },
  },
  {
    slug: 'body-roundness-index',
    icon: '⭕',
    category: '체중·체형',
    fields: [
      { key: 'height', term: 'heightCm', unit: 'cm', def: 170, min: 0 },
      { key: 'waist', term: 'waistCm', unit: 'cm', def: 85, min: 0 },
    ],
    formula: '{bri} = 364.2 − 365.5 × √(1 − (({waistCm} ÷ 2π) ÷ (0.5 × {heightCm}))²)',
    compute: v => {
      // 허리가 키에 견줘 지나치게 크면 뿌리 안이 음수가 된다 — 그 자리는 0으로 눌러 둔다
      const e = ratio(v.waist / (2 * Math.PI), 0.5 * v.height);
      const inner = 1 - e ** 2;
      const bri = inner > 0 ? 364.2 - 365.5 * Math.sqrt(inner) : 364.2;
      return [
        { term: 'bri', unit: 'none', value: round(Math.max(bri, 0), 2), digits: 2, primary: true },
        { term: 'whtr', unit: 'none', value: round(ratio(v.waist, v.height), 3), digits: 3 },
      ];
    },
    ko: { title: '신체 원형 지수(BRI)', desc: '키와 허리둘레만으로 몸통이 얼마나 둥근지를 하나의 수로 냅니다.',
      long: '몸을 타원으로 보고 그 납작한 정도를 재는 지수입니다. BMI가 못 보는 배 둘레를 반영하므로, 같은 BMI라도 허리가 굵으면 값이 커집니다. 보통 1에서 16 사이로 나옵니다.',
      note: '몸무게를 넣지 않으므로 근육과 지방을 가리지 못합니다. BMI·허리둘레와 함께 보세요.' },
    en: { title: 'Body Roundness Index', desc: 'Turn height and waist alone into a single number for how round the torso is.',
      long: 'The index treats the body as an ellipse and measures how flattened it is. It captures the belly that BMI misses, so two people with the same BMI differ once their waists do. Values usually land between 1 and 16.',
      note: 'It ignores weight, so it cannot tell muscle from fat. Read it next to BMI and the waist measurement itself.' },
  },
  {
    slug: 'relative-fat-mass',
    icon: '📉',
    category: '체중·체형',
    fields: [
      { key: 'sex', term: 'sexFactor', def: 1, min: 0, max: 1, step: 1 },
      { key: 'height', term: 'heightCm', unit: 'cm', def: 170, min: 0 },
      { key: 'waist', term: 'waistCm', unit: 'cm', def: 85, min: 0 },
    ],
    formula: '{bodyFat} = 64 (\u2642) / 76 (\u2640) − 20 × ({heightCm} ÷ {waistCm})',
    compute: v => {
      const base = v.sex >= 0.5 ? 64 : 76;
      const fat = base - 20 * ratio(v.height, v.waist);
      return [
        { term: 'bodyFat', unit: 'percent', value: round(Math.max(fat, 0), 1), digits: 1, primary: true },
        { term: 'whtr', unit: 'none', value: round(ratio(v.waist, v.height), 3), digits: 3 },
      ];
    },
    ko: { title: '상대 지방량(RFM)', desc: '줄자 하나로 체지방률을 어림합니다. 키와 허리둘레만 있으면 됩니다.',
      long: '키를 허리둘레로 나눈 값에 20을 곱해 상수에서 빼는 식입니다. 남자는 64, 여자는 76에서 시작합니다. 목둘레까지 재는 해군식보다 재는 곳이 하나 적습니다.',
      note: '어디까지나 어림값입니다. 허리는 숨을 내쉰 상태에서 배꼽 높이를 재세요 — 재는 자리가 달라지면 값이 크게 흔들립니다.' },
    en: { title: 'Relative Fat Mass', desc: 'Estimate body fat with a tape measure alone — height and waist are all it needs.',
      long: 'Divide height by waist, multiply by 20 and subtract from a constant: 64 for men, 76 for women. It needs one measurement fewer than the navy method, which also asks for the neck.',
      note: 'It is an estimate, not a measurement. Take the waist at navel height after breathing out — moving the tape moves the answer a long way.' },
  },
];
