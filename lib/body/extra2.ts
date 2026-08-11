/**
 * 몸 섹션 넷째 묶음 (8종).
 *
 * 122종이 이미 있어서 "또 하나의 비율"은 넣을 자리가 없다. 여기 든 것은 전부
 * **출처가 있는 발표된 기준**이거나 **다른 방법으로는 못 구하는 방향**이다 —
 * IOM/NAM 임신 중 체중 증가 구간, Watson 체수분 회귀식, Rockport 1마일 걷기
 * 검사(Kline 1987), WHO 허리둘레 절대 기준선, EWGSOP2 악력 절단점. 걸음→거리는
 * stride-from-height가 만 보만 계산해 주던 방향을 열어 준 것이고, 땀 손실률은
 * sweat-rate가 시간당 속도만 주던 자리에 적자를 채운다.
 *
 * 건강 쪽은 계산하는 것과 계산하지 못하는 것을 분명히 갈라 적었다. 0을 넣어도
 * 유한한 값이 나와야 하므로 나누는 자리마다 ratio()를 두고, 회귀식은 위아래를
 * 잘라 둔다 — 자르지 않으면 전부 0일 때 VO2max 132가 나온다.
 */
import type { FormulaTool, Verdict } from '../formula/types.ts';
import { ratio } from '../formula/types.ts';
import { round } from '../formula/num.ts';

/** IOM/NAM 임신 전 BMI별 만삭까지 권장 증가(kg)와 그 BMI 구간 표기 */
const IOM_GAIN: [maxBmi: number, low: number, high: number, band: string][] = [
  [18.5, 12.5, 18, '< 18.5'],
  [25, 11.5, 16, '18.5–24.9'],
  [30, 7, 11.5, '25–29.9'],
  [Infinity, 5, 9, '≥ 30'],
];
/** 1분기는 주수와 무관하게 0.5~2kg만 늘고, 남은 몫이 13주에서 40주에 고르게 붙는다 */
const TRI1_WEEK = 13;
const TERM_WEEK = 40;
const TRI1_LOW = 0.5;
const TRI1_HIGH = 2;

const gainBand = (bmi: number) => IOM_GAIN.find(([max]) => bmi < max) ?? IOM_GAIN[IOM_GAIN.length - 1];

/** VO2max 네 구간의 이름 — 쿠퍼 테스트와 같은 척도이므로 같은 칸을 쓴다 */
const VO2_WORD: Record<string, [string, string, string, string]> = {
  ko: ['매우 우수', '좋음', '보통', '낮음'],
  en: ['excellent', 'good', 'average', 'below average'],
  es: ['excelente', 'buena', 'media', 'por debajo de la media'],
  'pt-br': ['excelente', 'boa', 'média', 'abaixo da média'],
  ja: ['非常に優秀', '良好', '平均的', '平均以下'],
  de: ['ausgezeichnet', 'gut', 'durchschnittlich', 'unterdurchschnittlich'],
  fr: ['excellente', 'bonne', 'moyenne', 'sous la moyenne'],
  hi: ['बहुत बढ़िया', 'अच्छा', 'औसत', 'औसत से नीचे'],
  'zh-hans': ['非常优秀', '良好', '一般', '低于平均'],
  'zh-hant': ['非常優秀', '良好', '一般', '低於平均'],
};

export const BODY_EXTRA2_TOOLS: FormulaTool[] = [
  /* ───────── 체중·체형 ───────── */
  {
    slug: 'pregnancy-weight-gain',
    icon: '🤰',
    category: '체중·체형',
    fields: [
      { key: 'bmi', term: 'preBmi', def: 22, min: 0, max: 60, step: 0.1 },
      { key: 'week', term: 'gestWeek', unit: 'week', def: 24, min: 0, max: 42 },
    ],
    formula: '{gainNowLow} = 0.5 + ({gainTotalLow} − 0.5) × ({gestWeek} − 13) ÷ 27',
    compute: v => {
      const [, low, high] = gainBand(v.bmi);
      const w = Math.min(TERM_WEEK, Math.max(0, v.week));
      // 1분기 안이면 0.5~2kg를 주수에 비례해 나누고, 넘으면 남은 몫을 27주에 고르게 얹는다
      const nowLow = w <= TRI1_WEEK
        ? TRI1_LOW * (w / TRI1_WEEK)
        : TRI1_LOW + ((low - TRI1_LOW) / (TERM_WEEK - TRI1_WEEK)) * (w - TRI1_WEEK);
      const nowHigh = w <= TRI1_WEEK
        ? TRI1_HIGH * (w / TRI1_WEEK)
        : TRI1_HIGH + ((high - TRI1_HIGH) / (TERM_WEEK - TRI1_WEEK)) * (w - TRI1_WEEK);
      return [
        { term: 'gainNow', unit: 'kg', value: round((nowLow + nowHigh) / 2, 1), digits: 1, primary: true },
        { term: 'gainNowLow', unit: 'kg', value: round(nowLow, 2), digits: 2 },
        { term: 'gainNowHigh', unit: 'kg', value: round(nowHigh, 2), digits: 2 },
        { term: 'gainTotalLow', unit: 'kg', value: low, digits: 1 },
        { term: 'gainTotalHigh', unit: 'kg', value: high, digits: 1 },
      ];
    },
    verdict: v => {
      const [, low, high, band] = gainBand(v.bmi);
      const rl = round((low - TRI1_LOW) / (TERM_WEEK - TRI1_WEEK), 2);
      const rh = round((high - TRI1_HIGH) / (TERM_WEEK - TRI1_WEEK), 2);
      const b = round(v.bmi, 1);
      return {
        ko: `임신 전 BMI ${b}은 ${band} 구간입니다. 만삭까지 ${low}~${high}kg, 13주 뒤로는 주당 ${rl}~${rh}kg가 IOM 권장 흐름입니다.`,
        en: `A pre-pregnancy BMI of ${b} sits in the ${band} band: ${low}–${high} kg by full term, and ${rl}–${rh} kg a week after week 13.`,
        l10n: {
          es: `Un IMC previo al embarazo de ${b} está en la banda ${band}: ${low}–${high} kg hasta el término y ${rl}–${rh} kg por semana desde la semana 13.`,
          'pt-br': `Um IMC pré-gestacional de ${b} fica na faixa ${band}: ${low}–${high} kg até o termo e ${rl}–${rh} kg por semana a partir da 13ª semana.`,
          ja: `妊娠前BMI ${b}は${band}の区分です。満期までに${low}〜${high}kg、13週以降は週あたり${rl}〜${rh}kgがIOMの目安です。`,
          de: `Ein BMI von ${b} vor der Schwangerschaft liegt im Band ${band}: ${low}–${high} kg bis zum Termin und ${rl}–${rh} kg pro Woche ab Woche 13.`,
          fr: `Un IMC de ${b} avant la grossesse se situe dans la tranche ${band} : ${low}–${high} kg jusqu’au terme et ${rl}–${rh} kg par semaine après la 13ᵉ semaine.`,
          hi: `गर्भावस्था से पहले का ${b} BMI ${band} वर्ग में आता है: पूर्ण अवधि तक ${low}–${high} kg, और 13वें सप्ताह के बाद हर सप्ताह ${rl}–${rh} kg।`,
          'zh-hans': `孕前 BMI ${b} 属于 ${band} 区间：足月前共增 ${low}~${high} kg，第 13 周之后每周 ${rl}~${rh} kg。`,
          'zh-hant': `孕前 BMI ${b} 屬於 ${band} 區間：足月前共增 ${low}~${high} kg，第 13 週之後每週 ${rl}~${rh} kg。`,
        },
      };
    },
    ko: { title: '임신 중 체중 증가 계산기', desc: '임신 전 BMI와 지금 주수로 권장 증가 범위를 구합니다.',
      long: '미국 의학원(IOM, 지금의 NAM)은 임신 전 BMI에 따라 만삭까지의 권장 증가를 네 구간으로 나눕니다 — 18.5 미만은 12.5~18kg, 18.5~24.9는 11.5~16kg, 25~29.9는 7~11.5kg, 30 이상은 5~9kg입니다. 1분기에는 0.5~2kg만 늘고 남은 몫이 13주에서 40주에 고르게 붙는다고 보므로, BMI 22로 24주라면 지금까지 4.98~7.70kg, 가운데 값으로 6.3kg이 됩니다. 이것은 하나의 숫자가 아니라 범위이고, 초음파와 진찰을 함께 보는 조산사·의사의 판단이 이 표보다 앞섭니다.',
      note: '한 번 잰 체중으로는 아무것도 정해지지 않습니다. 부종과 입덧은 이 표가 세워진 바탕에서 벗어나 있고, 쌍둥이는 아예 다른 구간(BMI 18.5~24.9에서 16.8~24.5kg)을 씁니다.' },
    en: { title: 'Pregnancy Weight Gain Calculator', desc: 'The recommended gain range for a pre-pregnancy BMI at your current week.',
      long: 'The Institute of Medicine (now the NAM) splits total recommended gain by pre-pregnancy BMI into four bands: under 18.5 gains 12.5–18 kg, 18.5–24.9 gains 11.5–16, 25–29.9 gains 7–11.5, and 30 and above gains 5–9. The first trimester accounts for only 0.5–2 kg, with the remainder spread evenly from week 13 to week 40, so a BMI of 22 at week 24 gives a window of 4.98–7.70 kg, or 6.3 kg at the midpoint. This is a range and not a single figure, and the judgement of a midwife or doctor who can see the scans and the rest of the picture takes precedence over the table.',
      note: 'A single weigh-in settles nothing. Swelling and morning sickness both fall outside what this table was built on, and twin pregnancies use a different band entirely — 16.8–24.5 kg for a BMI of 18.5–24.9.' },
  },
  {
    slug: 'body-water',
    icon: '💧',
    category: '체중·체형',
    fields: [
      { key: 'sex', term: 'sexFactor', def: 1, min: 0, max: 1, step: 1 },
      { key: 'age', term: 'ageYears', unit: 'year', def: 35, min: 0, max: 100 },
      { key: 'height', term: 'heightCm', unit: 'cm', def: 175, min: 0, max: 250 },
      { key: 'weight', term: 'weightKgB', unit: 'kg', def: 70, min: 0, max: 250 },
    ],
    formula: '{tbw} = 2.447 − 0.09156 × {ageYears} + 0.1074 × {heightCm} + 0.3362 × {weightKgB}',
    compute: v => {
      // Watson 1980 — 여자 식에는 나이 항이 아예 없다
      const litres = v.sex >= 0.5
        ? 2.447 - 0.09156 * v.age + 0.1074 * v.height + 0.3362 * v.weight
        : -2.097 + 0.1069 * v.height + 0.2466 * v.weight;
      const tbw = Math.max(0, litres);
      return [
        { term: 'tbw', unit: 'liter', value: round(tbw, 2), digits: 2, primary: true },
        { term: 'tbwPct', unit: 'percent', value: round(ratio(tbw, v.weight) * 100, 1), digits: 1 },
        { term: 'leanMass', unit: 'kg', value: round(ratio(tbw, 0.732), 2), digits: 2 },
      ];
    },
    ko: { title: '체수분량 계산기', desc: '성별·나이·키·체중으로 몸속 물의 부피와 체중 대비 비율을 구합니다.',
      long: 'Watson 회귀식은 중수소 희석법으로 실제 체수분을 잰 1,000명 남짓의 자료에서 나온 식입니다. 175cm·70kg·35세 남자는 41.57L가 나오고, 이는 체중의 59.4%입니다. 제지방 조직의 73.2%가 물이므로 체수분을 0.732로 나누면 제지방량 56.8kg도 함께 어림됩니다. 여자 식에는 나이 항이 없어 나이를 바꿔도 값이 움직이지 않습니다.',
      note: '회귀식은 집단의 평균을 그리는 것이어서 개인의 값은 위아래로 벌어집니다. 게다가 체수분은 하루 안에서도 움직입니다 — 짠 것을 먹거나 땀을 흘리거나 탄수화물을 채우면 실제 값이 이 추정과 몇 리터씩 어긋납니다.' },
    en: { title: 'Total Body Water Calculator', desc: 'Litres of water in the body, and what share of body weight that is.',
      long: 'The Watson equations come from about a thousand people whose body water was actually measured by deuterium dilution. A 35-year-old man of 175 cm and 70 kg comes out at 41.57 L, which is 59.4% of body weight. Lean tissue is 73.2% water, so dividing body water by 0.732 also estimates lean mass — 56.8 kg here. The equation for women carries no age term at all, so changing age leaves their figure untouched.',
      note: 'A regression describes the average of a population, so individuals scatter above and below it. Body water also moves within a single day: salty food, a sweaty session or a carbohydrate load can put the real figure litres away from this estimate.' },
  },
  {
    slug: 'waist-risk',
    icon: '📏',
    category: '체중·체형',
    fields: [
      { key: 'waist', term: 'waistCm', unit: 'cm', def: 92, min: 0, max: 200, step: 0.5 },
      { key: 'sex', term: 'sexFactor', def: 1, min: 0, max: 1, step: 1 },
    ],
    formula: '{result} = band({waistCm}) — {sexFactor} = 1 → 94 / 102, 0 → 80 / 88',
    compute: v => {
      const male = v.sex >= 0.5;
      const t1 = male ? 94 : 80;
      const t2 = male ? 102 : 88;
      const band = v.waist >= t2 ? 2 : v.waist >= t1 ? 1 : 0;
      // 아직 첫 선을 안 넘었으면 첫 선이, 넘었으면 둘째 선이 지금 볼 기준이다
      const limit = band === 0 ? t1 : t2;
      return [
        { term: 'result', value: band, digits: 0, primary: true },
        { term: 'waistLimit', unit: 'cm', value: limit, digits: 0 },
        { term: 'toThreshold', unit: 'cm', value: round(Math.abs(limit - v.waist), 1), digits: 1 },
      ];
    },
    verdict: (v, out) => {
      const band = out[0].value;
      const limit = out[1].value;
      const gap = out[2].value;
      const t1 = v.sex >= 0.5 ? 94 : 80;
      const T: Verdict[] = [
        {
          tone: 'good',
          ko: `허리둘레 ${v.waist}cm는 ${t1}cm 기준선 아래로, ${gap}cm 여유가 있습니다.`,
          en: `A waist of ${v.waist} cm sits under the ${t1} cm line, with ${gap} cm of room.`,
          l10n: {
            es: `Una cintura de ${v.waist} cm queda bajo el límite de ${t1} cm, con ${gap} cm de margen.`,
            'pt-br': `Uma cintura de ${v.waist} cm fica abaixo da linha de ${t1} cm, com ${gap} cm de folga.`,
            ja: `ウエスト${v.waist}cmは${t1}cmの基準線より下で、${gap}cmの余裕があります。`,
            de: `Ein Taillenumfang von ${v.waist} cm liegt unter der Grenze von ${t1} cm — ${gap} cm Luft.`,
            fr: `Un tour de taille de ${v.waist} cm reste sous le seuil de ${t1} cm, avec ${gap} cm de marge.`,
            hi: `${v.waist} cm की कमर ${t1} cm की रेखा से नीचे है, ${gap} cm की गुंजाइश बची है।`,
            'zh-hans': `腰围 ${v.waist} cm 在 ${t1} cm 的界线以下，还有 ${gap} cm 的余量。`,
            'zh-hant': `腰圍 ${v.waist} cm 在 ${t1} cm 的界線以下，還有 ${gap} cm 的餘量。`,
          },
        },
        {
          tone: 'warn',
          ko: `${t1}cm를 넘어 ${limit}cm까지 ${gap}cm 남았습니다. WHO는 이 구간을 대사 위험이 커지는 칸으로 둡니다.`,
          en: `Past ${t1} cm, with ${gap} cm left to ${limit} cm. WHO places this band at increased metabolic risk.`,
          l10n: {
            es: `Ya pasa de ${t1} cm y faltan ${gap} cm para ${limit} cm. La OMS sitúa esta banda en riesgo metabólico aumentado.`,
            'pt-br': `Já passou de ${t1} cm e faltam ${gap} cm para ${limit} cm. A OMS coloca esta faixa em risco metabólico aumentado.`,
            ja: `${t1}cmを超え、${limit}cmまで${gap}cmです。WHOはこの区間を代謝リスクが高まる帯としています。`,
            de: `Über ${t1} cm, noch ${gap} cm bis ${limit} cm. Die WHO ordnet dieses Band einem erhöhten Stoffwechselrisiko zu.`,
            fr: `Au-delà de ${t1} cm, il reste ${gap} cm jusqu’à ${limit} cm. L’OMS place cette tranche en risque métabolique accru.`,
            hi: `${t1} cm पार हो चुका है, ${limit} cm तक ${gap} cm बाकी है। WHO इस बैंड को बढ़े हुए मेटाबॉलिक जोखिम में रखता है।`,
            'zh-hans': `已超过 ${t1} cm，距 ${limit} cm 还有 ${gap} cm。WHO 把这一区间列为代谢风险升高。`,
            'zh-hant': `已超過 ${t1} cm，距 ${limit} cm 還有 ${gap} cm。WHO 把這一區間列為代謝風險升高。`,
          },
        },
        {
          tone: 'bad',
          ko: `${limit}cm를 ${gap}cm 넘었습니다. WHO가 위험이 크게 커진다고 보는 칸이며, 그 뜻은 진료에서 가려집니다.`,
          en: `You are ${gap} cm past ${limit} cm, the band WHO calls substantially increased risk; what it means for you is settled in a consultation.`,
          l10n: {
            es: `Está ${gap} cm por encima de ${limit} cm, la banda que la OMS considera de riesgo muy aumentado; lo que significa para usted se decide en consulta.`,
            'pt-br': `Está ${gap} cm acima de ${limit} cm, a faixa que a OMS considera de risco bastante aumentado; o que isso significa para você se decide em consulta.`,
            ja: `${limit}cmを${gap}cm超えています。WHOがリスクが大きく高まるとする帯で、その意味は診察で判断されます。`,
            de: `Du liegst ${gap} cm über ${limit} cm — das Band, das die WHO als deutlich erhöhtes Risiko einstuft; was das für dich heißt, klärt die Praxis.`,
            fr: `Vous êtes ${gap} cm au-dessus de ${limit} cm, la tranche que l’OMS qualifie de risque nettement accru ; ce que cela signifie pour vous se décide en consultation.`,
            hi: `${limit} cm से ${gap} cm ऊपर हैं — WHO इसे काफ़ी बढ़े हुए जोखिम का बैंड कहता है; आपके लिए इसका अर्थ जाँच में तय होता है।`,
            'zh-hans': `已超过 ${limit} cm ${gap} cm，属于 WHO 所说风险明显升高的区间；对你意味着什么由问诊判断。`,
            'zh-hant': `已超過 ${limit} cm ${gap} cm，屬於 WHO 所說風險明顯升高的區間；對你意味著什麼由問診判斷。`,
          },
        },
      ];
      return T[band];
    },
    ko: { title: '허리둘레 기준선 계산기', desc: '허리둘레를 성별 절대 기준선(남 94·102cm, 여 80·88cm)에 맞춰 봅니다.',
      long: 'WHO와 IDF는 허리둘레에 성별로 두 개의 선을 둡니다 — 남자는 94cm와 102cm, 여자는 80cm와 88cm입니다. 첫 선을 넘으면 위험이 커지는 칸, 둘째 선을 넘으면 크게 커지는 칸입니다. 남자 92cm라면 아직 첫 선 아래이고 2cm가 남습니다. 같은 허리둘레를 다루는 도구가 둘 더 있는데, whtr(허리·키 비율)은 키로 나눠 0.5를 보고, whr(허리·엉덩이 비율)은 지방이 어디 붙었는지를 봅니다. 이 도구만이 나눗셈 없이 절대 센티미터를 봅니다.',
      note: '이 선들은 유럽인 자료에서 나왔습니다. IDF는 남아시아·중국·일본계 남자에게 90cm를 따로 두므로, 인구에 따라 선이 4cm 낮아집니다. 재는 자리는 갈비뼈 아래끝과 골반뼈 위끝의 중간이고, 숨을 편히 내쉰 끝에 줄자를 살에 파묻지 않고 잽니다. 이 수치가 내 몸에서 무슨 뜻인지는 진료에서 가려집니다.' },
    en: { title: 'Waist Circumference Risk Calculator', desc: 'Your waist against the sex-specific lines: 94 and 102 cm for men, 80 and 88 for women.',
      long: 'WHO and the IDF draw two lines through waist circumference for each sex — 94 cm and 102 cm for men, 80 cm and 88 cm for women. Crossing the first puts you in the increased-risk band, and crossing the second in the substantially-increased-risk band. A man at 92 cm is still under the first line with 2 cm to spare. Two other tools work on the same measurement: whtr divides waist by height and watches the 0.5 mark, and whr compares waist to hip to see where fat sits. This is the only one that reads the raw centimetres without dividing by anything.',
      note: 'These lines came from European data. The IDF sets a separate 90 cm value for men of South Asian, Chinese and Japanese origin, so the line moves 4 cm depending on the population. Measure midway between the lowest rib and the top of the hip bone, at the end of a normal breath out, with the tape snug but not pressing into the skin. What the number means for your body is settled in a consultation.' },
  },

  /* ───────── 대사·칼로리 ───────── */
  {
    slug: 'metabolic-age',
    icon: '⏳',
    category: '대사·칼로리',
    fields: [
      { key: 'sex', term: 'sexFactor', def: 1, min: 0, max: 1, step: 1 },
      { key: 'age', term: 'ageYears', unit: 'year', def: 35, min: 0, max: 100 },
      // 체지방률을 앞에 둔다 — 값을 실제로 움직이는 칸이라 자동 표가 이 칸으로 그려진다
      { key: 'fat', term: 'bodyFat', unit: 'percent', def: 18, min: 0, max: 70, step: 0.1 },
      { key: 'height', term: 'heightCm', unit: 'cm', def: 175, min: 0, max: 250 },
      { key: 'weight', term: 'weightKgB', unit: 'kg', def: 70, min: 0, max: 250 },
    ],
    formula: '{metaAge} = {ageYears} + (avgBmr − {bmr}) ÷ 5',
    compute: v => {
      const lean = Math.max(0, v.weight * (1 - v.fat / 100));
      // 내 값은 제지방량에서 나오는 Katch–McArdle, 견주는 곡선은 나이가 든 Mifflin
      const mine = 370 + 21.6 * lean;
      const avg = 10 * v.weight + 6.25 * v.height - 5 * v.age + (v.sex >= 0.5 ? 5 : -161);
      const age = Math.min(85, Math.max(18, v.age + (avg - mine) / 5));
      return [
        { term: 'metaAge', unit: 'year', value: round(age, 1), digits: 1, primary: true },
        { term: 'bmr', unit: 'kcal', value: Math.round(mine), digits: 0 },
        { term: 'diff', unit: 'year', value: round(age - v.age, 1), digits: 1 },
        { term: 'leanMass', unit: 'kg', value: round(lean, 2), digits: 2 },
      ];
    },
    verdict: (v, out) => {
      const m = out[0].value;
      const d = out[2].value;
      const gap = Math.abs(d);
      // 체지방률 1%p가 대사 나이를 몇 살 움직이는가 — 21.6 × 체중 ÷ 100 ÷ 5
      const s = round(0.0432 * v.weight, 1);
      return {
        tone: d <= 0 ? 'good' : 'warn',
        ko: `대사 나이 ${m}살은 실제 나이보다 ${gap}살 ${d >= 0 ? '많습니다' : '적습니다'}. 이 차이는 거의 전부 제지방량에서 나옵니다 — 체지방률이 1%p만 달라도 여기서 약 ${s}살이 움직입니다.`,
        en: `A metabolic age of ${m} is ${gap} years ${d >= 0 ? 'above' : 'below'} your actual age. Almost all of that gap comes from lean mass — one percentage point of body fat moves it by about ${s} years.`,
        l10n: {
          es: `Una edad metabólica de ${m} queda ${gap} años ${d >= 0 ? 'por encima' : 'por debajo'} de tu edad real. Casi toda esa diferencia viene de la masa magra: un punto porcentual de grasa la mueve unos ${s} años.`,
          'pt-br': `Uma idade metabólica de ${m} fica ${gap} anos ${d >= 0 ? 'acima' : 'abaixo'} da sua idade real. Quase toda essa diferença vem da massa magra: um ponto percentual de gordura a move cerca de ${s} anos.`,
          ja: `代謝年齢${m}歳は実年齢より${gap}歳${d >= 0 ? '上' : '下'}です。この差はほぼすべて除脂肪量から来ます — 体脂肪率が1ポイント違うだけで約${s}歳動きます。`,
          de: `Ein metabolisches Alter von ${m} liegt ${gap} Jahre ${d >= 0 ? 'über' : 'unter'} deinem tatsächlichen Alter. Fast der ganze Abstand kommt aus der fettfreien Masse — ein Prozentpunkt Körperfett verschiebt ihn um etwa ${s} Jahre.`,
          fr: `Un âge métabolique de ${m} se situe ${gap} ans ${d >= 0 ? 'au-dessus' : 'en dessous'} de votre âge réel. Presque tout l’écart vient de la masse maigre : un point de pourcentage de graisse le déplace d’environ ${s} ans.`,
          hi: `${m} की चयापचय आयु आपकी वास्तविक आयु से ${gap} वर्ष ${d >= 0 ? 'अधिक' : 'कम'} है। यह अंतर लगभग पूरा दुबले द्रव्यमान से आता है — शरीर वसा में एक प्रतिशत अंक इसे करीब ${s} वर्ष खिसका देता है।`,
          'zh-hans': `代谢年龄 ${m} 岁比实际年龄${d >= 0 ? '大' : '小'} ${gap} 岁。这个差距几乎全部来自去脂体重——体脂率差 1 个百分点，就能让它移动约 ${s} 岁。`,
          'zh-hant': `代謝年齡 ${m} 歲比實際年齡${d >= 0 ? '大' : '小'} ${gap} 歲。這個差距幾乎全部來自去脂體重——體脂率差 1 個百分點，就能讓它移動約 ${s} 歲。`,
        },
      };
    },
    ko: { title: '대사 나이 계산기', desc: '제지방량에서 나온 기초대사량을 나이별 평균 곡선에 얹어 봅니다.',
      long: '먼저 체지방률에서 제지방량을 구하고, Katch–McArdle 식(370 + 21.6 × 제지방량)으로 기초대사량을 냅니다. 그다음 같은 성별·키·체중에서 나이만 바꿔 가며 Mifflin–St Jeor 평균 곡선을 그리고, 내 값과 만나는 나이를 찾습니다. Mifflin은 나이 한 살에 5kcal씩 내려가므로, 평균보다 5kcal 높으면 대사 나이가 한 살 젊게 나옵니다. 175cm·70kg·35세 남자가 체지방률 18%라면 제지방량 57.4kg에 기초대사량 1,610kcal이고, 같은 몸의 35세 평균은 1,624kcal이므로 대사 나이는 37.8살입니다.',
      note: '"대사 나이"는 체성분 저울이 만들어 낸 소비자용 개념이고 임상에서 쓰는 지표가 아닙니다. 실제로 재는 것은 나이가 아니라 제지방량 하나입니다 — 위 예에서도 체지방률이 1%p 달라지면 대사 나이가 3살씩 움직입니다. 게다가 내 값은 Katch–McArdle, 견주는 곡선은 Mifflin–St Jeor라 평균 체성분에서 두 식이 정확히 겹치지 않으므로, 절대 나이보다 차이의 방향과 크기를 보세요.' },
    en: { title: 'Metabolic Age Calculator', desc: 'Your composition-based BMR laid over the average BMR curve by age.',
      long: 'Lean mass comes first, from body fat percentage, and then BMR from the Katch–McArdle equation: 370 + 21.6 × lean mass. Next, the Mifflin–St Jeor average is traced across ages at the same sex, height and weight, and the age where that curve meets your figure is the answer. Mifflin drops 5 kcal per year of age, so running 5 kcal above the average buys you one year. A 35-year-old man of 175 cm and 70 kg at 18% body fat carries 57.4 kg of lean mass and a BMR of 1,610 kcal, while the average for that body at 35 is 1,624 kcal — a metabolic age of 37.8.',
      note: '"Metabolic age" is a consumer idea invented by body-composition scales, not a clinical measure. The only thing it really reads is lean mass: in the example above, one percentage point of body fat shifts the answer by three years. Your own figure also comes from Katch–McArdle while the reference curve is Mifflin–St Jeor, and the two do not line up exactly at an average body composition — so read the direction and size of the gap rather than the year itself.' },
  },

  /* ───────── 심장·운동 ───────── */
  {
    slug: 'steps-distance',
    icon: '🗺️',
    category: '심장·운동',
    fields: [
      { key: 'steps', term: 'steps', unit: 'step', def: 8000, min: 0 },
      { key: 'stride', term: 'strideCm', unit: 'cm', def: 70, min: 0, max: 150 },
      { key: 'height', term: 'heightCm', unit: 'cm', def: 170, min: 0, max: 250 },
    ],
    formula: '{distanceKm} = {steps} × {strideCm} ÷ 100000',
    compute: v => {
      const km = (v.steps * v.stride) / 100000;
      return [
        { term: 'distanceKm', unit: 'km', value: round(km, 2), digits: 2, primary: true },
        { term: 'distanceMi', unit: 'mile', value: round(ratio(km, 1.609344), 2), digits: 2 },
        { term: 'strideEst', unit: 'cm', value: round(v.height * 0.415, 1), digits: 1 },
        { term: 'stepsPerKm', unit: 'step', value: Math.round(ratio(100000, v.stride)), digits: 0 },
      ];
    },
    ko: { title: '걸음 수 → 거리 계산기', desc: '걸음 수에 보폭을 곱해 걸은 거리를 km와 마일로 구합니다.',
      long: '거리는 걸음 수에 보폭을 곱한 것이 전부입니다. 보폭 70cm로 8,000걸음이면 5.6km, 3.48마일이고 1km에는 1,429걸음이 듭니다. 보폭을 재 본 적이 없으면 키의 0.415배를 쓰는데, 키 170cm면 70.6cm가 나와 위 값과 거의 같습니다. 같은 재료를 쓰는 도구가 둘 더 있습니다 — stride-from-height는 키에서 보폭만 내놓고 거리는 만 보로 고정해 보여 주며, steps-calories는 거리를 거쳐 태운 열량을 냅니다. 이 도구는 내가 실제로 걸은 걸음 수를 거리로 바꾸는 방향만 봅니다.',
      note: '보폭은 상황마다 달라집니다. 뛰면 걷기보다 훨씬 길어지고, 오르막·모래·짐은 짧게 만듭니다. 정확히 하려면 열 걸음을 평소 걸음으로 걷고 그 거리를 열로 나누세요. 손목 시계와 휴대폰은 팔만 흔들려도 걸음을 세고 밀차를 밀면 안 세므로, 걸음 수 자체에도 오차가 있습니다.' },
    en: { title: 'Steps to Distance Calculator', desc: 'Steps times stride length, in kilometres and miles.',
      long: 'Distance is nothing more than steps multiplied by stride. At a 70 cm stride, 8,000 steps make 5.6 km or 3.48 miles, and a kilometre takes 1,429 of them. If you have never measured your stride, 0.415 times height stands in — at 170 cm that gives 70.6 cm, almost exactly the value used above. Two neighbouring tools use the same ingredients: stride-from-height returns only the stride and fixes the distance at ten thousand steps, while steps-calories passes through distance on the way to calories burned. This one covers the steps-to-distance direction with whatever step count you actually walked.',
      note: 'Stride is not a constant. Running stretches it well beyond a walking stride, and hills, sand and a loaded bag all shorten it. To pin it down, walk ten normal paces and divide the distance by ten. Watches and phones add their own error, counting steps when only your arm swings and missing them when you push a trolley.' },
  },
  {
    slug: 'vo2max-rockport',
    icon: '🫁',
    category: '심장·운동',
    fields: [
      { key: 'weight', term: 'weightKgB', unit: 'kg', def: 80, min: 0, max: 250 },
      { key: 'age', term: 'ageYears', unit: 'year', def: 30, min: 0, max: 100 },
      { key: 'sex', term: 'sexFactor', def: 1, min: 0, max: 1, step: 1 },
      { key: 'time', term: 'mileWalkMin', unit: 'minute', def: 12, min: 0, max: 40, step: 0.1 },
      { key: 'hr', term: 'peakHr', unit: 'bpm', def: 140, min: 0, max: 220 },
    ],
    formula: '{vo2max} = 132.853 − 0.0769 × ({weightKgB} × 2.2046) − 0.3877 × {ageYears} + 6.315 × {sexFactor} − 3.2649 × {mileWalkMin} − 0.1565 × {peakHr}',
    compute: v => {
      // Kline 1987 — 무게는 파운드로 넣는 식이다
      const raw = 132.853
        - 0.0769 * (v.weight * 2.20462)
        - 0.3877 * v.age
        + 6.315 * (v.sex >= 0.5 ? 1 : 0)
        - 3.2649 * v.time
        - 0.1565 * v.hr;
      const vo2 = Math.min(90, Math.max(0, raw));
      return [
        { term: 'vo2max', value: round(vo2, 1), digits: 1, primary: true },
        { term: 'metFromVo2', value: round(vo2 / 3.5, 1), digits: 1 },
        { term: 'paceMin', unit: 'minPerKm', value: round(ratio(v.time, 1.609344), 2), digits: 2 },
      ];
    },
    verdict: (_v, out) => {
      const x = out[0].value;
      if (x <= 0) return null;
      const b = x >= 55 ? 0 : x >= 45 ? 1 : x >= 35 ? 2 : 3;
      const w = (lang: string) => VO2_WORD[lang][b];
      return {
        tone: b <= 1 ? 'good' : b === 2 ? 'warn' : 'bad',
        ko: `VO2max ${x}는 ${w('ko')} 수준입니다. 이 식의 표준오차가 약 5mL/kg/min이므로 ±5의 폭으로 읽으세요.`,
        en: `A VO2max of ${x} is ${w('en')}. The equation's standard error is about 5 mL/kg/min, so read it as ±5.`,
        l10n: {
          es: `Una VO2máx de ${x} es ${w('es')}. El error estándar de la ecuación ronda los 5 mL/kg/min, así que léela con ±5.`,
          'pt-br': `Uma VO2máx de ${x} é ${w('pt-br')}. O erro padrão da equação é de cerca de 5 mL/kg/min, então leia com ±5.`,
          ja: `VO2max ${x}は${w('ja')}な水準です。この式の標準誤差は約5mL/kg/minなので、±5の幅で読んでください。`,
          de: `Eine VO2max von ${x} ist ${w('de')}. Der Standardfehler der Gleichung liegt bei etwa 5 mL/kg/min — lies den Wert also mit ±5.`,
          fr: `Une VO2max de ${x} est ${w('fr')}. L’erreur type de l’équation est d’environ 5 mL/kg/min : lisez-la donc à ±5 près.`,
          hi: `${x} का VO2max ${w('hi')} है। इस समीकरण की मानक त्रुटि लगभग 5 mL/kg/min है, इसलिए इसे ±5 के दायरे में पढ़ें।`,
          'zh-hans': `VO2max ${x} 属于${w('zh-hans')}水平。该公式的标准误差约为 5 mL/kg/min，请按 ±5 的范围来看。`,
          'zh-hant': `VO2max ${x} 屬於${w('zh-hant')}水準。該公式的標準誤差約為 5 mL/kg/min，請按 ±5 的範圍來看。`,
        },
      };
    },
    ko: { title: '록포트 걷기 검사 계산기', desc: '1마일을 빠르게 걷고 시간과 끝 심박수로 VO2max를 추정합니다.',
      long: '1마일(1.609km)을 가장 빠르게 걸어 시간을 재고, 멈춘 그 순간의 심박수를 함께 넣습니다. Kline이 1987년에 세운 회귀식이 체중·나이·성별과 함께 그 둘을 받습니다. 30세 남자가 80kg으로 12분에 걷고 끝 심박이 140이면 VO2max는 52.9mL/kg/min, MET로는 15.1이고 걷기 페이스는 7.46분/km입니다. 이미 있는 두 도구와 무엇이 다른지가 중요합니다 — vo2max-cooper는 12분을 전력으로 **달린 거리**를 받고, vo2max-resting은 아무것도 하지 않고 안정 심박수만 받습니다. 이 검사만이 최대가 아닌 강도로 걸으면서 시간과 심박을 함께 씁니다.',
      note: '반드시 걸어야 합니다 — 한쪽 발이 늘 땅에 붙어 있어야 하고, 달리면 식의 바탕에서 벗어납니다. 심박은 멈춘 직후 몇 초 안의 값이어야 하며, 시계가 보여 주는 구간 평균을 넣으면 낮게 잡혀 VO2max가 높게 나옵니다. 표준오차는 약 5mL/kg/min으로 실험실 측정을 대신하지 못합니다. 기본값의 12분은 시속 8km로 경보에 가까운 속도라 결과도 높게 나옵니다 — 보통은 15~18분이 걸리고, 그러면 값도 그만큼 내려갑니다. 최대 운동이 아니어서 부담이 작은 검사이지만, 심장·폐 질환이 있다면 검사 여부는 의료진의 판단에 따릅니다.' },
    en: { title: 'Rockport Walk Test Calculator', desc: 'VO₂max from a brisk one-mile walk: your time and your heart rate at the finish.',
      long: 'Walk one mile (1.609 km) as fast as you can, note the time, and take your pulse the moment you stop. The regression Kline published in 1987 takes those two alongside weight, age and sex. A 30-year-old man of 80 kg walking it in 12 minutes and finishing at 140 bpm gets a VO₂max of 52.9 mL/kg/min, which is 15.1 METs at a walking pace of 7.46 min/km. What separates it from the two tests already here matters: vo2max-cooper takes the **distance** covered in an all-out 12-minute run, and vo2max-resting takes nothing but a resting pulse. Only this one has you working at a submaximal effort while using both time and heart rate.',
      note: 'It must be a walk — one foot stays on the ground throughout, and breaking into a run puts you outside what the equation was built on. The pulse has to be the one from the first few seconds after stopping; feeding in the lap average a watch shows runs low and pushes VO₂max up. The standard error is around 5 mL/kg/min, so it does not replace a lab measurement. The 12 minutes in the defaults is 8 km/h, close to race-walking pace, so it returns a high figure — most people take 15 to 18, and the result drops accordingly. The submaximal effort makes this a gentler test than a run, but if you have heart or lung disease, whether to do it at all is your clinician\'s call.' },
  },

  /* ───────── 건강 지표 ───────── */
  {
    slug: 'grip-strength-norm',
    icon: '💪',
    category: '건강 지표',
    fields: [
      { key: 'grip', term: 'gripKg', unit: 'kg', def: 38, min: 0, max: 120, step: 0.5 },
      { key: 'sex', term: 'sexFactor', def: 1, min: 0, max: 1, step: 1 },
      { key: 'weight', term: 'weightKgB', unit: 'kg', def: 70, min: 0, max: 250 },
    ],
    formula: '{result} = {gripKg} < cutoff({sexFactor}) → 1 : 0 — cutoff = 27 / 16',
    compute: v => {
      // EWGSOP2 2019 근력 저하 절단점 — 남 27kg, 여 16kg
      const cut = v.sex >= 0.5 ? 27 : 16;
      return [
        { term: 'result', value: v.grip < cut ? 1 : 0, digits: 0, primary: true },
        { term: 'toThreshold', unit: 'kg', value: round(Math.abs(v.grip - cut), 1), digits: 1 },
        { term: 'gripRatio', value: round(ratio(v.grip, v.weight), 2), digits: 2 },
      ];
    },
    verdict: (v, out) => {
      const low = out[0].value === 1;
      const gap = out[1].value;
      const cut = v.sex >= 0.5 ? 27 : 16;
      if (!low) {
        return {
          tone: 'good',
          ko: `악력 ${v.grip}kg는 EWGSOP2 절단점 ${cut}kg보다 ${gap}kg 높습니다. 이 기준에서는 근력 저하로 걸러지지 않습니다.`,
          en: `A grip of ${v.grip} kg is ${gap} kg above the EWGSOP2 cut-off of ${cut} kg, so this screen does not flag low strength.`,
          l10n: {
            es: `Una fuerza de ${v.grip} kg está ${gap} kg por encima del punto de corte EWGSOP2 de ${cut} kg: este cribado no señala debilidad.`,
            'pt-br': `Uma pega de ${v.grip} kg está ${gap} kg acima do ponto de corte EWGSOP2 de ${cut} kg: este rastreio não sinaliza força baixa.`,
            ja: `握力${v.grip}kgはEWGSOP2のカットオフ${cut}kgより${gap}kg高く、このスクリーニングでは筋力低下に該当しません。`,
            de: `Eine Griffkraft von ${v.grip} kg liegt ${gap} kg über dem EWGSOP2-Grenzwert von ${cut} kg — dieses Screening zeigt keine Kraftminderung an.`,
            fr: `Une poigne de ${v.grip} kg dépasse de ${gap} kg le seuil EWGSOP2 de ${cut} kg : ce dépistage ne signale pas de faiblesse.`,
            hi: `${v.grip} kg की पकड़ EWGSOP2 की ${cut} kg सीमा से ${gap} kg ऊपर है, इसलिए यह स्क्रीनिंग कम ताक़त नहीं दर्शाती।`,
            'zh-hans': `握力 ${v.grip} kg 高出 EWGSOP2 的 ${cut} kg 界值 ${gap} kg，这项筛查不提示肌力偏低。`,
            'zh-hant': `握力 ${v.grip} kg 高出 EWGSOP2 的 ${cut} kg 界值 ${gap} kg，這項篩查不提示肌力偏低。`,
          },
        };
      }
      return {
        tone: 'warn',
        ko: `악력 ${v.grip}kg는 EWGSOP2 절단점 ${cut}kg보다 ${gap}kg 낮습니다. 이것은 걸러 내는 선일 뿐 진단이 아니며, 다음 판단은 의료진에게 있습니다.`,
        en: `A grip of ${v.grip} kg is ${gap} kg below the EWGSOP2 cut-off of ${cut} kg. That is a screening line rather than a diagnosis, and what follows is a clinician's call.`,
        l10n: {
          es: `Una fuerza de ${v.grip} kg queda ${gap} kg por debajo del punto de corte EWGSOP2 de ${cut} kg. Es una línea de cribado, no un diagnóstico: lo siguiente lo decide el personal sanitario.`,
          'pt-br': `Uma pega de ${v.grip} kg fica ${gap} kg abaixo do ponto de corte EWGSOP2 de ${cut} kg. É uma linha de rastreio, não um diagnóstico: o passo seguinte é decisão médica.`,
          ja: `握力${v.grip}kgはEWGSOP2のカットオフ${cut}kgより${gap}kg低いです。これは診断ではなくふるい分けの線であり、次の判断は医療者に委ねられます。`,
          de: `Eine Griffkraft von ${v.grip} kg liegt ${gap} kg unter dem EWGSOP2-Grenzwert von ${cut} kg. Das ist eine Screening-Linie, keine Diagnose — der nächste Schritt gehört der Ärztin oder dem Arzt.`,
          fr: `Une poigne de ${v.grip} kg est ${gap} kg sous le seuil EWGSOP2 de ${cut} kg. C’est une ligne de dépistage et non un diagnostic : la suite revient au soignant.`,
          hi: `${v.grip} kg की पकड़ EWGSOP2 की ${cut} kg सीमा से ${gap} kg नीचे है। यह जाँच की रेखा है, निदान नहीं — आगे का निर्णय चिकित्सक का है।`,
          'zh-hans': `握力 ${v.grip} kg 低于 EWGSOP2 的 ${cut} kg 界值 ${gap} kg。这只是筛查线而非诊断，下一步由医生判断。`,
          'zh-hant': `握力 ${v.grip} kg 低於 EWGSOP2 的 ${cut} kg 界值 ${gap} kg。這只是篩查線而非診斷，下一步由醫師判斷。`,
        },
      };
    },
    ko: { title: '악력 기준치 계산기', desc: '악력계 수치를 사르코페니아 선별 절단점(남 27kg, 여 16kg)에 맞춰 봅니다.',
      long: '유럽 사르코페니아 작업반이 2019년에 고친 기준(EWGSOP2)은 근력 저하의 선을 남자 27kg, 여자 16kg에 둡니다. 아시아 작업반(AWGS 2019)은 남자 28kg, 여자 18kg로 조금 높게 잡습니다. 70kg 남자가 38kg을 쥐면 선보다 11kg 위이고, 체중당으로는 0.54입니다. 몸 섹션의 근육 관련 도구들과 재는 것이 다릅니다 — ffmi와 muscle-mass-index는 근육의 **양**을, one-rep-max는 특정 동작으로 든 무게를 봅니다. 악력만이 발표된 절단점이 붙은 **힘**의 값이고, 그래서 걷는 속도·수술 후 회복·사망률과의 연관이 반복해서 확인됐습니다.',
      note: '악력계 모델과 자세가 값을 몇 kg씩 바꿉니다. 앉아서 팔꿈치를 90도로 굽히고, 좋은 쪽 손으로 세 번 쥔 뒤 가장 높은 값을 씁니다. 손목이나 손가락에 통증·관절염이 있으면 근력과 무관하게 낮게 나옵니다. 이 선은 걸러 내기 위한 것이고 그 자체로 무엇을 정하지 않습니다 — 근육량과 신체 기능을 함께 본 의료진의 평가가 판단을 맡습니다.' },
    en: { title: 'Grip Strength Norm Calculator', desc: 'Your dynamometer reading against the sarcopenia screening cut-offs: 27 kg for men, 16 kg for women.',
      long: 'The revised European consensus on sarcopenia (EWGSOP2, 2019) puts the line for low muscle strength at 27 kg for men and 16 kg for women. The Asian working group (AWGS 2019) sets it slightly higher, at 28 kg and 18 kg. A 70 kg man squeezing 38 kg sits 11 kg above the line, or 0.54 per kilogram of body weight. This measures something different from the muscle tools already in the section: ffmi and muscle-mass-index describe how much muscle there **is**, and one-rep-max describes a weight moved in one specific lift. Grip is the only measure of **force** here that carries published cut-offs, which is why its links to walking speed, surgical recovery and mortality keep turning up in the literature.',
      note: 'The make of dynamometer and your posture shift the number by several kilograms. Sit with the elbow at ninety degrees, squeeze three times with the stronger hand, and take the best attempt. Pain or arthritis in the wrist or fingers drags the reading down regardless of muscle. This line exists to sort people for a closer look and decides nothing on its own — an assessment that also weighs muscle mass and physical function is what governs.' },
  },

  /* ───────── 생활 대사 ───────── */
  {
    slug: 'sweat-loss-percent',
    icon: '🚰',
    category: '생활 대사',
    fields: [
      { key: 'pre', term: 'weightPreEx', unit: 'kg', def: 72, min: 0, max: 250, step: 0.1 },
      { key: 'post', term: 'weightPostEx', unit: 'kg', def: 70.6, min: 0, max: 250, step: 0.1 },
      { key: 'drank', term: 'drankMl', unit: 'ml', def: 500, min: 0 },
    ],
    formula: '{bodyLossPct} = ({weightPreEx} − {weightPostEx}) ÷ {weightPreEx} × 100',
    compute: v => {
      // 마신 물이 잃은 것보다 많아 무게가 늘었으면 손실은 0이다 — 음수는 뜻이 없다
      const lossKg = Math.max(0, v.pre - v.post);
      return [
        { term: 'bodyLossPct', unit: 'percent', value: round(ratio(lossKg, v.pre) * 100, 2), digits: 2, primary: true },
        { term: 'sweatTotalMl', unit: 'ml', value: Math.round(lossKg * 1000 + v.drank), digits: 0 },
        { term: 'rehydrateMl', unit: 'ml', value: Math.round(lossKg * 1500), digits: 0 },
      ];
    },
    verdict: (_v, out) => {
      const p = out[0].value;
      if (p < 1) {
        return {
          tone: 'good',
          ko: `체중의 ${p}%만 줄었습니다. 1% 아래면 운동 능력에 영향이 없는 범위이고, 0을 목표로 억지로 더 마실 이유는 없습니다.`,
          en: `You finished ${p}% down. Under 1% has no measurable effect on performance, and there is no reason to force extra fluid to reach zero.`,
          l10n: {
            es: `Terminaste con un ${p}% menos. Por debajo del 1% no hay efecto medible en el rendimiento y no hace falta forzar más líquido para llegar a cero.`,
            'pt-br': `Você terminou ${p}% abaixo. Menos de 1% não tem efeito mensurável no desempenho e não há motivo para forçar líquido até chegar a zero.`,
            ja: `体重の${p}%だけ減りました。1%未満なら運動能力への影響はなく、0を目指して無理に飲む必要もありません。`,
            de: `Du hast ${p}% verloren. Unter 1% ist kein messbarer Leistungseffekt zu erwarten, und niemand muss zusätzlich trinken, um auf null zu kommen.`,
            fr: `Vous avez terminé à ${p}% de moins. Sous 1%, aucun effet mesurable sur la performance, et rien n’oblige à boire davantage pour atteindre zéro.`,
            hi: `आपका वजन केवल ${p}% घटा। 1% से कम पर प्रदर्शन पर मापने योग्य असर नहीं होता, और शून्य पाने के लिए ज़बरदस्ती पीने की ज़रूरत नहीं।`,
            'zh-hans': `体重只下降了 ${p}%。低于 1% 对运动表现没有可测影响，也不必为了归零而勉强多喝。`,
            'zh-hant': `體重只下降了 ${p}%。低於 1% 對運動表現沒有可測影響，也不必為了歸零而勉強多喝。`,
          },
        };
      }
      if (p < 2) {
        return {
          tone: 'warn',
          ko: `체중의 ${p}%가 줄었습니다. 2%가 능력이 떨어지기 시작하는 선이므로, 다음 운동에서는 시간당 조금 더 마시는 쪽으로 맞춰 보세요.`,
          en: `You are ${p}% down. Two percent is where performance starts to slip, so aim to drink a little more per hour next time.`,
          l10n: {
            es: `Has bajado un ${p}%. El 2% es donde empieza a caer el rendimiento, así que la próxima vez bebe algo más por hora.`,
            'pt-br': `Você caiu ${p}%. Os 2% são o ponto em que o desempenho começa a cair, então beba um pouco mais por hora na próxima.`,
            ja: `体重の${p}%が減りました。2%が能力の落ち始める線なので、次は時間あたり少し多めに飲んでみてください。`,
            de: `Du liegst ${p}% im Minus. Bei zwei Prozent beginnt die Leistung nachzugeben — trink beim nächsten Mal etwas mehr pro Stunde.`,
            fr: `Vous êtes à ${p}% de moins. C’est à 2% que la performance commence à céder : buvez un peu plus par heure la prochaine fois.`,
            hi: `आपका वजन ${p}% घटा। 2% वह रेखा है जहाँ प्रदर्शन गिरने लगता है, इसलिए अगली बार प्रति घंटा थोड़ा और पिएँ।`,
            'zh-hans': `体重下降了 ${p}%。2% 是表现开始下滑的界线，下次每小时可以多喝一点。`,
            'zh-hant': `體重下降了 ${p}%。2% 是表現開始下滑的界線，下次每小時可以多喝一點。`,
          },
        };
      }
      return {
        tone: 'bad',
        ko: `체중의 ${p}%가 줄어 2% 선을 넘었습니다. 이 정도면 지구력과 체온 조절이 함께 떨어지므로, 다음 몇 시간에 걸쳐 나눠 마셔 되돌리세요.`,
        en: `At ${p}% you are past the 2% line, where endurance and temperature control both fall off. Make it back gradually over the next few hours.`,
        l10n: {
          es: `Con un ${p}% has pasado la línea del 2%, donde caen a la vez la resistencia y la termorregulación. Recupéralo poco a poco en las próximas horas.`,
          'pt-br': `Com ${p}% você passou da linha de 2%, onde caem juntas a resistência e o controle da temperatura. Reponha aos poucos nas próximas horas.`,
          ja: `体重の${p}%が減り、2%の線を越えました。持久力と体温調節がともに落ちる水準なので、次の数時間に分けて飲み戻してください。`,
          de: `Mit ${p}% bist du über der 2-Prozent-Linie, ab der Ausdauer und Temperaturregelung gemeinsam nachlassen. Hol es über die nächsten Stunden verteilt zurück.`,
          fr: `À ${p}%, vous avez franchi la limite des 2%, où l’endurance et la thermorégulation lâchent ensemble. Rattrapez progressivement sur les heures qui suivent.`,
          hi: `${p}% पर आप 2% की रेखा पार कर गए, जहाँ सहनशक्ति और तापमान नियंत्रण दोनों गिरते हैं। अगले कुछ घंटों में थोड़ा-थोड़ा पीकर पूरा करें।`,
          'zh-hans': `下降 ${p}% 已越过 2% 的界线，耐力和体温调节会同时变差。请在接下来几小时里分次补回。`,
          'zh-hant': `下降 ${p}% 已越過 2% 的界線，耐力和體溫調節會同時變差。請在接下來幾小時裡分次補回。`,
        },
      };
    },
    ko: { title: '땀으로 잃은 체중 비율 계산기', desc: '운동 전후 체중으로 체중의 몇 %를 잃었는지와 2% 선까지의 거리를 봅니다.',
      long: '운동 중 줄어든 체중은 거의 전부 물이므로, 처음 체중으로 나누면 탈수의 정도가 비율로 나옵니다. 72kg으로 시작해 500ml를 마시고 70.6kg으로 끝났다면 1.4kg, 곧 1.94%가 줄어든 것이고, 흘린 땀은 마신 물을 더한 1,900ml입니다. 되돌리려면 잃은 1kg마다 1.5L, 여기서는 2,100ml를 몇 시간에 걸쳐 나눠 마십니다. 같은 재료를 쓰는 sweat-rate는 시간으로 나눠 **시간당 속도**를 내놓아 다음 운동에 얼마나 마실지를 정해 줍니다. 이 도구는 나누지 않고 끝난 시점의 **적자**를 봅니다.',
      note: '2%라는 선은 더운 데서 오래 하는 운동에서 나온 값이고, 짧고 시원한 운동에서는 그만큼 영향이 크지 않습니다. 긴 운동에서는 줄어든 무게가 전부 물도 아닙니다 — 태운 탄수화물과 지방, 숨으로 나간 것이 얼마쯤 섞입니다. 0.1kg 단위로 재는 저울이 필요하고, 손실을 0으로 만들려고 지나치게 마시면 저나트륨증 위험이 생기므로 목표는 0이 아닙니다.' },
    en: { title: 'Sweat Loss Percentage Calculator', desc: 'What share of body mass a session cost you, measured against the 2% threshold.',
      long: 'Weight lost during exercise is almost all water, so dividing by your starting weight turns it into a percentage of dehydration. Starting at 72 kg, drinking 500 mL and finishing at 70.6 kg means 1.4 kg or 1.94% gone, while the sweat you actually produced is 1,900 mL once the drink is added back. Replacing it takes about 1.5 L per kilogram lost — 2,100 mL here, spread over the next few hours. The neighbouring sweat-rate tool divides the same measurements by time to give an **hourly rate**, which is what you plan the next session around. This one leaves time out and reads the **deficit** you finished with.',
      note: 'The 2% line comes from prolonged exercise in the heat; a short cool session is far less affected. Over long events the lost weight is not purely water either — burned carbohydrate and fat, and losses through breathing, make up part of it. You need a scale that reads to 0.1 kg, and zero loss is not the goal: drinking heavily enough to prevent any loss carries a risk of hyponatraemia.' },
  },
];
