/** 비율 섹션 - 비율·증감 (12종) */
import type { FormulaTool } from '../formula/types.ts';
import { ratio } from '../formula/types.ts';
import { gcd, round } from '../formula/num.ts';

export const PERCENT_TOOLS: FormulaTool[] = [
  {
    slug: 'percent-of',
    icon: '📊',
    category: '비율·증감',
    fields: [
      { key: 'base', term: 'base', def: 84000, min: 0 },
      { key: 'rate', term: 'percent', unit: 'percent', def: 15, step: 0.1 },
    ],
    formula: '{result} = {base} × {percent} ÷ 100',
    compute: v => [
      { term: 'result', value: round(v.base * v.rate / 100, 2), digits: 2, primary: true },
      { term: 'remaining', value: round(v.base - v.base * v.rate / 100, 2), digits: 2 },
    ],
    ko: { title: 'X의 Y% 계산기', desc: '어떤 값의 몇 퍼센트가 얼마인지 계산합니다.',
      long: '기준값에 비율을 곱하고 100으로 나누면 해당 몫이 나옵니다. 8만 4천의 15%는 1만 2천 6백입니다.',
      note: '퍼센트는 100분의 1이라는 뜻입니다. 15%는 0.15를 곱하는 것과 같습니다.' },
    en: { title: 'Percent of a Number', desc: 'Find what a given percentage of a value comes to.',
      long: 'Multiply the base by the percentage and divide by 100. 15% of 84,000 is 12,600.',
      note: 'Percent means hundredths, so taking 15% is the same as multiplying by 0.15.' },
  },
  {
    slug: 'what-percent',
    icon: '🥧',
    category: '비율·증감',
    fields: [
      { key: 'part', term: 'part', def: 37, min: 0 },
      { key: 'whole', term: 'whole', def: 250, min: 0.0001 },
    ],
    formula: '{percent} = {part} ÷ {whole} × 100',
    compute: v => [
      { term: 'percent', unit: 'percent', value: round(ratio(v.part, v.whole) * 100, 2), digits: 2, primary: true },
      { term: 'remaining', unit: 'percent', value: round(100 - ratio(v.part, v.whole) * 100, 2), digits: 2 },
    ],
    ko: { title: 'A는 B의 몇 %인가', desc: '부분이 전체에서 차지하는 비율을 구합니다.',
      long: '부분을 전체로 나눠 100을 곱하면 비중입니다. 250 중 37은 14.8%입니다.',
      note: '전체보다 부분이 크면 100%를 넘습니다. 오타가 아니라 계산이 맞는 경우도 있습니다.' },
    en: { title: 'A is What Percent of B', desc: 'Find what share a part represents out of a whole.',
      long: 'Divide the part by the whole and multiply by 100. 37 out of 250 is 14.8%.',
      note: 'If the part is larger than the whole you get more than 100% — sometimes that is correct, not a typo.' },
  },
  {
    slug: 'percent-change',
    icon: '📈',
    category: '비율·증감',
    fields: [
      { key: 'before', term: 'before', def: 45000, min: 0 },
      { key: 'after', term: 'after', def: 52000, min: 0 },
    ],
    formula: '{change} = ({after} − {before}) ÷ {before} × 100',
    compute: v => [
      { term: 'change', unit: 'percent', value: round(ratio(v.after - v.before, v.before) * 100, 2), digits: 2, primary: true },
      { term: 'diff', value: round(v.after - v.before, 2), digits: 2 },
    ],
    verdict: (v, out) => {
      const c = out[0].value;
      if (c === 0) return {
        ko: '변화가 없습니다.', en: 'No change.',
        l10n: { es: 'Sin variación.', 'pt-br': 'Sem variação.', ja: '変化はありません。', de: 'Keine Veränderung.', fr: 'Aucune variation.', hi: 'कोई बदलाव नहीं।' },
      };
      const up = c > 0;
      const abs = Math.abs(c);
      return {
        ko: up ? `${abs}% 증가했습니다.` : `${abs}% 감소했습니다.`,
        en: up ? `An increase of ${abs}%.` : `A decrease of ${abs}%.`,
        l10n: {
          es: up ? `Un aumento del ${abs} %.` : `Una bajada del ${abs} %.`,
          'pt-br': up ? `Um aumento de ${abs} %.` : `Uma queda de ${abs} %.`,
          ja: up ? `${abs}%の増加です。` : `${abs}%の減少です。`,
          de: up ? `Ein Anstieg um ${abs} %.` : `Ein Rückgang um ${abs} %.`,
          fr: up ? `Une hausse de ${abs} %.` : `Une baisse de ${abs} %.`,
          hi: up ? `${abs}% की बढ़त।` : `${abs}% की गिरावट।`,
        },
        tone: up ? 'good' : 'bad',
      };
    },
    ko: { title: '증감률 계산기', desc: '이전 값과 이후 값으로 몇 % 늘거나 줄었는지 구합니다.',
      long: '변화량을 이전 값으로 나눕니다. 이후 값으로 나누면 다른 숫자가 나오므로 기준을 반드시 이전 값으로 잡습니다.',
      note: '이전 값이 0이면 증감률을 정의할 수 없습니다. 그때는 절대 증가량으로 말해야 합니다.' },
    en: { title: 'Percent Change', desc: 'Find the percentage increase or decrease between two values.',
      long: 'Divide the change by the earlier value. Dividing by the later value gives a different figure, so the base must be the "before".',
      note: 'Percent change is undefined when the starting value is zero — report the absolute increase instead.' },
  },
  {
    slug: 'percent-diff',
    icon: '🔀',
    category: '비율·증감',
    fields: [
      { key: 'a', term: 'ratioA', def: 120, min: 0 },
      { key: 'b', term: 'ratioB', def: 150, min: 0 },
    ],
    formula: '{percent} = |{ratioA} − {ratioB}| ÷ (({ratioA} + {ratioB}) ÷ 2) × 100',
    compute: v => [
      { term: 'percent', unit: 'percent', value: round(ratio(Math.abs(v.a - v.b), (v.a + v.b) / 2) * 100, 2), digits: 2, primary: true },
      { term: 'diff', value: round(Math.abs(v.a - v.b), 2), digits: 2 },
    ],
    ko: { title: '퍼센트 차이 계산기', desc: '어느 쪽도 기준이 아닐 때 두 값의 상대적 차이를 구합니다.',
      long: '두 값의 평균을 기준으로 차이를 나눕니다. 증감률과 달리 A와 B를 바꿔 넣어도 같은 값이 나옵니다.',
      note: '측정값 두 개를 비교할 때 씁니다. 시간 순서가 있는 값이라면 증감률이 맞습니다.' },
    en: { title: 'Percentage Difference', desc: 'Compare two values relative to each other when neither is the baseline.',
      long: 'The difference is divided by the average of the two, so unlike percent change, swapping A and B gives the same answer.',
      note: 'Use this for two measurements. If the values are before-and-after in time, percent change is the right tool.' },
  },
  {
    slug: 'percent-point',
    icon: '📏',
    category: '비율·증감',
    fields: [
      { key: 'before', term: 'before', unit: 'percent', def: 4, min: 0 },
      { key: 'after', term: 'after', unit: 'percent', def: 5, min: 0 },
    ],
    formula: '{pointDiff} = {after} − {before}',
    compute: v => [
      { term: 'pointDiff', value: round(v.after - v.before, 2), digits: 2, primary: true },
      { term: 'change', unit: 'percent', value: round(ratio(v.after - v.before, v.before) * 100, 1), digits: 1 },
    ],
    verdict: (v, out) => ({
      ko: `${out[0].value}%p 올랐고, 비율로는 ${out[1].value}% 증가입니다.`,
      en: `Up ${out[0].value} percentage points, which is a ${out[1].value}% increase in relative terms.`,
      l10n: {
        es: `Sube ${out[0].value} puntos porcentuales, lo que en términos relativos es un aumento del ${out[1].value} %.`,
        'pt-br': `Sobe ${out[0].value} pontos percentuais, o que em termos relativos é um aumento de ${out[1].value} %.`,
        ja: `${out[0].value}ポイント上がり、率でみると${out[1].value}%の増加です。`,
        de: `Ein Plus von ${out[0].value} Prozentpunkten, relativ gesehen also ein Anstieg um ${out[1].value} %.`,
        fr: `Une hausse de ${out[0].value} points de pourcentage, soit ${out[1].value} % en relatif.`,
        hi: `${out[0].value} प्रतिशत अंक की बढ़त, जो अनुपात में ${out[1].value}% की बढ़ोतरी है।`,
      },
      tone: 'warn',
    }),
    ko: { title: '퍼센트포인트 계산기', desc: '4%에서 5%로 오른 것이 1%p인지 25% 증가인지 구분합니다.',
      long: '비율끼리의 뺄셈은 퍼센트포인트(%p)이고, 그 변화를 원래 비율로 나눈 것은 퍼센트 증가입니다. 둘은 같은 사실의 다른 표현입니다.',
      note: '기사에서 "금리가 25% 올랐다"와 "1%p 올랐다"가 같은 뜻일 수 있습니다. 어느 쪽인지 확인하세요.' },
    en: { title: 'Percentage Point vs Percent', desc: 'Tell apart a 1-point rise and a 25% rise when a rate goes from 4% to 5%.',
      long: 'Subtracting one rate from another gives percentage points; dividing that gap by the original rate gives percent change. Both describe the same fact.',
      note: '"Rates rose 25%" and "rates rose 1 point" can describe the same move — always check which is meant.' },
  },
  {
    slug: 'reverse-percent',
    icon: '🔄',
    category: '비율·증감',
    fields: [
      { key: 'after', term: 'after', def: 66000, min: 0 },
      { key: 'rate', term: 'change', unit: 'percent', def: 10, min: -99 },
    ],
    formula: '{original} = {after} ÷ (1 + {change} ÷ 100)',
    compute: v => {
      const orig = ratio(v.after, 1 + v.rate / 100);
      return [
        { term: 'original', value: round(orig, 2), digits: 2, primary: true },
        { term: 'diff', value: round(v.after - orig, 2), digits: 2 },
      ];
    },
    ko: { title: '원래 값 역산', desc: '몇 % 오른 뒤의 값만 알 때 오르기 전 값을 구합니다.',
      long: '10% 올라 6만 6천 원이 됐다면 원래 값은 6만 원입니다. 6만 6천에서 10%를 빼면 5만 9천 4백이 나와 틀립니다.',
      note: '내린 경우에는 비율에 음수를 넣습니다. 20% 할인 후 값이라면 −20을 넣습니다.' },
    en: { title: 'Reverse Percentage', desc: 'Recover the original value when you only know the value after a change.',
      long: 'If a 10% rise ended at 66,000, the original was 60,000. Taking 10% off 66,000 gives 59,400, which is wrong.',
      note: 'For a decrease, enter a negative rate — after a 20% discount, use −20.' },
  },
  {
    slug: 'ratio-split',
    icon: '➗',
    category: '비율·증감',
    fields: [
      { key: 'total', term: 'total', def: 1200000, min: 0 },
      { key: 'a', term: 'ratioA', def: 3, min: 0 },
      { key: 'b', term: 'ratioB', def: 2, min: 0 },
    ],
    formula: '{shareA} = {total} × {ratioA} ÷ ({ratioA} + {ratioB})',
    compute: v => {
      const sum = v.a + v.b;
      const shareA = ratio(v.total * v.a, sum);
      return [
        { term: 'shareA', value: Math.round(shareA), digits: 0, primary: true },
        { term: 'shareB', value: Math.round(v.total - shareA), digits: 0 },
        { term: 'percentA', unit: 'percent', value: round(ratio(v.a, sum) * 100, 1), digits: 1 },
      ];
    },
    ko: { title: '비율 분배 계산기', desc: '금액을 3:2 같은 비율로 나눠 각자의 몫을 구합니다.',
      long: '비의 합으로 전체를 나눈 뒤 각자의 비를 곱합니다. 3:2로 120만 원을 나누면 72만 원과 48만 원입니다.',
      note: '반올림 때문에 두 몫의 합이 총액과 1원 어긋날 수 있습니다. 남는 쪽을 한쪽에 몰아주면 맞습니다.' },
    en: { title: 'Split by Ratio', desc: 'Divide an amount in a ratio like 3:2 and see each share.',
      long: 'Divide the total by the sum of the ratio parts, then multiply by each part. 1,200,000 split 3:2 gives 720,000 and 480,000.',
      note: 'Rounding can leave the two shares off by one unit — give the remainder to one side to reconcile.' },
  },
  {
    slug: 'ratio-simplify',
    icon: '🔽',
    category: '비율·증감',
    fields: [
      { key: 'a', term: 'ratioA', def: 1920, min: 1 },
      { key: 'b', term: 'ratioB', def: 1080, min: 1 },
    ],
    formula: '{shareA} : {shareB} = {ratioA} ÷ G : {ratioB} ÷ G',
    compute: v => {
      const g = gcd(v.a, v.b);
      return [
        { term: 'shareA', value: Math.round(v.a / g), digits: 0, primary: true },
        { term: 'shareB', value: Math.round(v.b / g), digits: 0 },
        { term: 'result', unit: 'times', value: round(ratio(v.a, v.b), 3), digits: 3 },
      ];
    },
    ko: { title: '비 간단히 하기', desc: '두 수의 비를 최소 정수비로 줄입니다.',
      long: '두 수를 최대공약수로 나누면 더 줄일 수 없는 비가 됩니다. 1920:1080은 16:9입니다.',
      note: '소수를 넣으면 정수로 반올림한 뒤 계산합니다. 정확한 비가 필요하면 양쪽에 같은 수를 곱해 정수로 만들어 넣으세요.' },
    en: { title: 'Simplify a Ratio', desc: 'Reduce a ratio of two numbers to its smallest whole-number form.',
      long: 'Divide both by their greatest common divisor and nothing further cancels. 1920:1080 becomes 16:9.',
      note: 'Decimals are rounded to integers first. For an exact result, scale both sides by the same factor until they are whole.' },
  },
  {
    slug: 'proportion',
    icon: '🟰',
    category: '비율·증감',
    fields: [
      { key: 'a', term: 'ratioA', def: 3, min: 0.0001 },
      { key: 'b', term: 'ratioB', def: 8, min: 0 },
      { key: 'c', term: 'base', def: 12, min: 0 },
    ],
    formula: '{unknown} = {ratioB} × {base} ÷ {ratioA}',
    compute: v => [
      { term: 'unknown', value: round(ratio(v.b * v.c, v.a), 3), digits: 3, primary: true },
      { term: 'result', unit: 'times', value: round(ratio(v.b, v.a), 3), digits: 3 },
    ],
    ko: { title: '비례식 계산기', desc: 'A : B = C : ? 에서 빈칸을 구합니다.',
      long: '비례식은 겹쳐 곱한 값이 서로 같습니다. B와 C를 곱해 A로 나누면 빈칸이 나옵니다. 3:8 = 12:32입니다.',
      note: '레시피를 인원수에 맞춰 늘릴 때, 도면을 확대할 때 그대로 쓰입니다.' },
    en: { title: 'Proportion Solver', desc: 'Solve for the missing term in A : B = C : ?',
      long: 'In a proportion the cross products are equal, so the unknown is B × C ÷ A. 3:8 = 12:32.',
      note: 'This is the same maths you use to scale a recipe up for more people or enlarge a drawing.' },
  },
  {
    slug: 'cagr',
    icon: '📉',
    category: '비율·증감',
    fields: [
      { key: 'start', term: 'before', def: 10000000, min: 0.0001 },
      { key: 'end', term: 'after', def: 24000000, min: 0 },
      { key: 'years', term: 'years', unit: 'year', def: 5, min: 0.1, step: 0.5 },
    ],
    formula: '{cagr} = (({after} ÷ {before}) ^ (1 ÷ {years}) − 1) × 100',
    compute: v => {
      const g = ratio(v.end, v.start);
      const cagr = g > 0 && v.years > 0 ? (g ** (1 / v.years) - 1) * 100 : 0;
      return [
        { term: 'cagr', unit: 'percent', value: round(cagr, 2), digits: 2, primary: true },
        { term: 'totalGrowth', unit: 'percent', value: round((g - 1) * 100, 1), digits: 1 },
      ];
    },
    ko: { title: '연평균 성장률(CAGR)', desc: '몇 년에 걸친 총 성장을 매년 같은 비율로 환산합니다.',
      long: '총 성장률을 연수로 나누면 안 됩니다. 복리로 쌓이므로 거듭제곱근을 써야 매년의 실제 성장률이 나옵니다.',
      note: '5년에 140% 성장은 연 28%가 아니라 연 19.14%입니다. 나눗셈은 매년 성장을 과대평가합니다.' },
    en: { title: 'CAGR Calculator', desc: 'Convert total growth over several years into one steady annual rate.',
      long: 'You cannot just divide total growth by the number of years — growth compounds, so the annual rate needs a root, not a division.',
      note: '140% over five years is 19.14% a year, not 28%. Dividing overstates the yearly rate.' },
  },
  {
    slug: 'ratio-to-percent',
    icon: '🥧',
    category: '비율·증감',
    fields: [
      { key: 'a', term: 'ratioA', def: 7, min: 0 },
      { key: 'b', term: 'ratioB', def: 3, min: 0 },
    ],
    formula: '{percentA} = {ratioA} ÷ ({ratioA} + {ratioB}) × 100',
    compute: v => {
      const sum = v.a + v.b;
      return [
        { term: 'percentA', unit: 'percent', value: round(ratio(v.a, sum) * 100, 1), digits: 1, primary: true },
        { term: 'percentB', unit: 'percent', value: round(ratio(v.b, sum) * 100, 1), digits: 1 },
      ];
    },
    ko: { title: '비를 백분율로', desc: '7:3 같은 비를 각각 몇 %인지로 바꿉니다.',
      long: '각 항을 두 항의 합으로 나눕니다. 7:3은 70%와 30%이고, 두 값을 더하면 항상 100%가 됩니다.',
      note: '비는 두 값의 관계, 백분율은 전체 대비 몫입니다. 7:3에서 7은 3의 2.33배이면서 전체의 70%입니다.' },
    en: { title: 'Ratio to Percentage', desc: 'Turn a ratio like 7:3 into the percentage each side represents.',
      long: 'Divide each term by the sum of both. 7:3 is 70% and 30%, and the two always add to 100%.',
      note: 'A ratio relates two values; a percentage relates one to the whole. In 7:3, the 7 is 2.33× the 3 and 70% of the total.' },
  },
  {
    slug: 'weighted-percent',
    icon: '🧱',
    category: '비율·증감',
    fields: [
      { key: 'a', term: 'ratioA', def: 300, min: 0 },
      { key: 'ra', term: 'percentA', unit: 'percent', def: 20, min: 0 },
      { key: 'b', term: 'ratioB', def: 700, min: 0 },
      { key: 'rb', term: 'percentB', unit: 'percent', def: 5, min: 0 },
    ],
    formula: '{percent} = ({ratioA} × {percentA} + {ratioB} × {percentB}) ÷ ({ratioA} + {ratioB})',
    compute: v => {
      const sum = v.a + v.b;
      const overall = ratio(v.a * v.ra + v.b * v.rb, sum);
      return [
        { term: 'percent', unit: 'percent', value: round(overall, 2), digits: 2, primary: true },
        { term: 'result', unit: 'percent', value: round((v.ra + v.rb) / 2, 2), digits: 2 },
      ];
    },
    verdict: (v, out) => ({
      ko: `가중평균 ${out[0].value}%는 단순평균 ${out[1].value}%와 다릅니다 — 양이 많은 쪽으로 끌립니다.`,
      en: `The weighted ${out[0].value}% differs from the simple average of ${out[1].value}% — it leans toward the larger group.`,
      l10n: {
        es: `El ${out[0].value} % ponderado no coincide con el ${out[1].value} % de la media simple: se inclina hacia el grupo más grande.`,
        'pt-br': `Os ${out[0].value} % ponderados não batem com os ${out[1].value} % da média simples: puxam para o grupo maior.`,
        ja: `加重平均の${out[0].value}%は単純平均の${out[1].value}%とは違います。数の多い側に引っぱられます。`,
        de: `Die gewichteten ${out[0].value} % weichen vom einfachen Mittel von ${out[1].value} % ab — sie neigen zur größeren Gruppe.`,
        fr: `Les ${out[0].value} % pondérés diffèrent des ${out[1].value} % de la moyenne simple : ils penchent vers le groupe le plus grand.`,
        hi: `भारित ${out[0].value}% सीधे औसत ${out[1].value}% से अलग है — यह बड़े समूह की तरफ़ झुकता है।`,
      },
      tone: 'warn',
    }),
    ko: { title: '가중평균 비율', desc: '크기가 다른 두 집단의 비율을 합쳐 전체 비율을 구합니다.',
      long: '비율의 단순평균은 틀립니다. 각 비율에 그 집단의 크기를 곱해 더한 뒤 전체 크기로 나눠야 합니다.',
      note: '불량률 20%인 300개와 5%인 700개를 합치면 전체 불량률은 9.5%입니다. 단순평균 12.5%가 아닙니다.' },
    en: { title: 'Weighted Average Rate', desc: 'Combine the rates of two groups of different sizes into one overall rate.',
      long: 'Averaging two rates directly is wrong. Multiply each rate by its group size, add them, then divide by the total size.',
      note: 'A 20% defect rate on 300 units plus 5% on 700 gives 9.5% overall, not the 12.5% a simple average suggests.' },
  },
];
