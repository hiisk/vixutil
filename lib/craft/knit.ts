/**
 * 공예 섹션 — 뜨개·코바늘 (8종)
 *
 * 뜨개 계산은 전부 게이지에서 나온다. 게이지는 "10cm에 몇 코"인데, 같은 실과
 * 같은 바늘이어도 사람마다 다르다. 그래서 도안의 코 수를 그대로 쓰면 폭이
 * 어긋나고, 게이지로 되짚어야 내 손에 맞는 코 수가 나온다.
 *
 * 실 양은 면적으로 잡는다 — 시험 뜨기 한 조각의 무게와 면적을 알면 완성품
 * 면적에 비례해 늘리면 된다. 볼 개수는 올림이고, 염색 로트가 갈리면 같은
 * 색을 못 구하므로 여유를 따로 드러낸다.
 */
import type { FormulaTool } from '../formula/types.ts';
import { round } from '../formula/num.ts';

const ceil = (n: number) => Math.ceil(n);

export const KNIT_TOOLS: FormulaTool[] = [
  {
    slug: 'yarn-needed',
    icon: '🧶',
    category: '뜨개',
    fields: [
      { key: 'w', term: 'targetWidth', unit: 'cm', def: 50, min: 1 },
      { key: 'h', term: 'targetLength', unit: 'cm', def: 60, min: 1 },
      { key: 'sw', term: 'swatchArea', unit: 'cm2', def: 100, min: 1 },
      { key: 'sg', term: 'swatchWeight', unit: 'gram', def: 12, min: 0.1 },
    ],
    formula: '{yarnWeight} = {targetWidth} × {targetLength} ÷ {swatchArea} × {swatchWeight}',
    compute: v => {
      const g = v.sw > 0 ? (v.w * v.h) / v.sw * v.sg : 0;
      return [
        { term: 'yarnWeight', unit: 'gram', value: round(g, 0), digits: 0, primary: true },
        { term: 'spare', unit: 'gram', value: round(g * 0.15, 0), digits: 0 },
      ];
    },
    ko: { title: '실 소요량 계산기', desc: '시험 뜨기 무게로 완성품에 필요한 실 무게를 구합니다.',
      long: '10cm × 10cm를 떠서 무게를 재면 1㎠에 몇 g이 드는지 알 수 있습니다. 완성품 면적을 곱하면 필요한 실 무게가 나옵니다. 도안에 적힌 양은 도안 게이지 기준이라, 내 게이지가 다르면 그만큼 어긋납니다.',
      note: '15% 정도 여유를 두세요. 소매·목처럼 늘어나는 부분과 마무리에 더 들고, 염색 로트가 갈리면 같은 색을 다시 구하기 어렵습니다.' },
    en: { title: 'Yarn Requirement Calculator', desc: 'Weigh a swatch to find how much yarn a finished piece needs.',
      long: 'Knit a 10 cm square and weigh it: that tells you the grams per square centimetre. Multiply by the area of the finished piece and you have the yarn weight. The figure printed on a pattern assumes the pattern gauge, so it drifts as soon as yours differs.',
      note: 'Add about 15% spare. Sleeves, necklines and finishing eat more than the flat area suggests, and once a dye lot sells out the same shade is hard to match.' },
  },
  {
    slug: 'yarn-skeins',
    icon: '🧵',
    category: '뜨개',
    fields: [
      { key: 'need', term: 'yarnLength', unit: 'm', def: 900, min: 1 },
      { key: 'ball', term: 'ballLength', unit: 'm', def: 200, min: 1 },
      { key: 'spare', term: 'spare', unit: 'percent', def: 15, min: 0, max: 100 },
    ],
    formula: '{balls} = ⌈{yarnLength} × (1 + {spare} ÷ 100) ÷ {ballLength}⌉',
    compute: v => {
      const withSpare = v.need * (1 + v.spare / 100);
      // 빈 입력은 엔진이 0으로 넘긴다 — 0으로 나누면 NaN이 화면에 뜬다
      const balls = v.ball > 0 ? ceil(withSpare / v.ball) : 0;
      return [
        { term: 'balls', unit: 'ball', value: balls, digits: 0, primary: true },
        { term: 'yarnLength', unit: 'm', value: round(withSpare, 0), digits: 0 },
      ];
    },
    ko: { title: '실 볼 개수 계산기', desc: '필요한 길이와 한 볼 길이로 몇 볼을 사야 하는지 구합니다.',
      long: '볼은 쪼개서 살 수 없으므로 나눗셈 결과를 올림합니다. 여유를 먼저 얹고 나서 올리는 것이 중요합니다 — 올린 다음에 여유를 더하면 한 볼이 더 필요해도 안 보입니다.',
      note: '실 라벨의 길이는 표시값입니다. 같은 무게라도 실제 길이는 조금씩 다르니, 딱 맞게 사면 마지막 몇 단에서 모자랄 수 있습니다.' },
    en: { title: 'How Many Skeins Calculator', desc: 'Turn the length you need and the metres per ball into how many balls to buy.',
      long: 'You cannot buy part of a ball, so the division rounds up. Adding the spare before rounding matters: round first and a genuine shortfall of one ball disappears from the answer.',
      note: 'The length on a label is nominal. Two balls of the same weight can differ by several metres, so buying the exact number risks running out in the last few rows.' },
  },
  {
    slug: 'gauge-stitches',
    icon: '📏',
    category: '뜨개',
    fields: [
      { key: 'g', term: 'stitchGauge', unit: 'stsPer10', def: 22, min: 1 },
      { key: 'w', term: 'targetWidth', unit: 'cm', def: 50, min: 1 },
    ],
    formula: '{stitches} = {stitchGauge} × {targetWidth} ÷ 10',
    compute: v => {
      const sts = Math.round(v.g * v.w / 10);
      return [
        { term: 'stitches', unit: 'sts', value: sts, digits: 0, primary: true },
        { term: 'targetWidth', unit: 'cm', value: v.g > 0 ? round(sts / v.g * 10, 1) : 0, digits: 1 },
      ];
    },
    ko: { title: '코 수 계산기', desc: '게이지와 원하는 폭으로 시작할 코 수를 구합니다.',
      long: '10cm에 22코라면 1cm에 2.2코입니다. 원하는 폭에 곱하면 코 수가 나옵니다. 무늬가 몇 코 단위로 반복되면 그 배수로 맞춰 올리거나 내리세요.',
      note: '게이지는 세탁·블로킹 뒤에 재야 맞습니다. 뜬 직후의 폭은 실을 적신 뒤 달라집니다.' },
    en: { title: 'Stitches to Cast On Calculator', desc: 'Turn your gauge and a target width into a cast-on count.',
      long: '22 stitches over 10 cm is 2.2 per centimetre; multiply by the width you want. If the stitch pattern repeats over a set number, round to the nearest multiple of it.',
      note: 'Measure gauge after washing and blocking. The width straight off the needles changes once the yarn has been wet.' },
  },
  {
    slug: 'gauge-convert',
    icon: '🔁',
    category: '뜨개',
    fields: [
      { key: 'pg', term: 'patternGauge', unit: 'stsPer10', def: 22, min: 1 },
      { key: 'mg', term: 'myGauge', unit: 'stsPer10', def: 20, min: 1 },
      { key: 'sts', term: 'stitches', unit: 'sts', def: 110, min: 1 },
    ],
    formula: '{stitches} = {stitches} × {myGauge} ÷ {patternGauge}',
    compute: v => {
      const adj = v.pg > 0 ? Math.round(v.sts * v.mg / v.pg) : 0;
      return [
        { term: 'stitches', unit: 'sts', value: adj, digits: 0, primary: true },
        { term: 'targetWidth', unit: 'cm', value: v.mg > 0 ? round(adj / v.mg * 10, 1) : 0, digits: 1 },
      ];
    },
    ko: { title: '게이지 보정 계산기', desc: '도안 게이지와 내 게이지가 다를 때 코 수를 다시 구합니다.',
      long: '도안이 22코 게이지로 110코를 시키는데 내가 20코로 뜬다면, 110코는 도안보다 넓어집니다. 내 게이지 비율만큼 코 수를 줄여야 같은 폭이 됩니다.',
      note: '코 수만 맞추면 폭은 맞아도 길이가 어긋납니다. 단 수는 단 게이지로 따로 계산하세요.' },
    en: { title: 'Gauge Conversion Calculator', desc: 'Recalculate a pattern stitch count when your gauge differs from the pattern.',
      long: 'If a pattern written at 22 stitches per 10 cm tells you to cast on 110 and you knit at 20, those 110 stitches come out wider than intended. Scaling the count by the ratio of the gauges restores the width.',
      note: 'Matching stitches fixes the width but not the length. Work rows out separately from your row gauge.' },
  },
  {
    slug: 'yarn-weight-length',
    icon: '⚖️',
    category: '뜨개',
    fields: [
      { key: 'bl', term: 'ballLength', unit: 'm', def: 200, min: 1 },
      { key: 'bw', term: 'ballWeight', unit: 'gram', def: 50, min: 1 },
      { key: 'g', term: 'yarnWeight', unit: 'gram', def: 320, min: 0 },
    ],
    formula: '{yarnLength} = {yarnWeight} × {ballLength} ÷ {ballWeight}',
    compute: v => {
      const mpg = v.bw > 0 ? v.bl / v.bw : 0;
      return [
        { term: 'yarnLength', unit: 'm', value: round(v.g * mpg, 0), digits: 0, primary: true },
        { term: 'metrePerGram', unit: 'm', value: round(mpg, 2), digits: 2 },
      ];
    },
    ko: { title: '실 무게 ↔ 길이 계산기', desc: '남은 실 무게로 길이를 되짚습니다.',
      long: '라벨의 길이와 무게가 g당 길이를 정합니다. 남은 실을 저울에 올리면 몇 미터가 남았는지 알 수 있어서, 한 단에 드는 길이와 비교하면 몇 단을 더 뜰 수 있는지 나옵니다.',
      note: '실을 감아 둔 볼에 심이나 종이가 있으면 그 무게를 빼세요. 5g만 잘못 봐도 20m가 어긋납니다.' },
    en: { title: 'Yarn Weight to Length Calculator', desc: 'Weigh leftover yarn to find how many metres are left.',
      long: 'The length and weight on the label fix the metres per gram. Put the remainder on a scale and you know what is left, which tells you how many more rows it will carry once you know the length a row eats.',
      note: 'Subtract the core or band if the ball is still wound on one. Being 5 g out moves the answer by about 20 m.' },
  },
  {
    slug: 'wpi-weight',
    icon: '🔍',
    category: '뜨개',
    fields: [
      { key: 'wpi', term: 'wpi', unit: 'none', def: 12, min: 3, max: 40 },
    ],
    formula: '{stitchGauge} ≈ {wpi} × 1.9',
    compute: v => {
      // WPI 구간 → 실 굵기 번호(0 레이스 ~ 6 슈퍼벌키). 경계는 흔히 쓰이는 값이다.
      const table: [number, number][] = [[35, 0], [18, 1], [16, 2], [14, 3], [12, 4], [9, 5], [6, 6]];
      const cls = table.find(([w]) => v.wpi >= w)?.[1] ?? 6;
      return [
        { term: 'yarnClass', unit: 'none', value: cls, digits: 0, primary: true },
        { term: 'stitchGauge', unit: 'stsPer10', value: Math.round(v.wpi * 1.9), digits: 0 },
      ];
    },
    ko: { title: 'WPI 실 굵기 계산기', desc: '1인치에 몇 번 감기는지로 실 굵기 번호를 찾습니다.',
      long: '자에 실을 빈틈없이 감아 1인치를 채운 감김 수(WPI)가 굵기를 말해 줍니다. 라벨이 없는 실이나 남은 실을 분류할 때 씁니다 — 12 WPI면 대체로 4번(worsted)입니다.',
      note: '당겨 감으면 WPI가 커져 실이 가늘게 나옵니다. 실이 눌리지 않을 만큼만 나란히 감으세요.' },
    en: { title: 'Wraps Per Inch (WPI) Calculator', desc: 'Identify a yarn weight class from wraps per inch.',
      long: 'Wind the yarn side by side along a ruler until an inch is full: that count is the WPI, and it maps onto the standard weight numbers. It is how you classify a yarn with no band, or a leftover — around 12 WPI is usually worsted.',
      note: 'Winding under tension raises the WPI and makes the yarn read thinner than it is. Lay the wraps together without squashing them.' },
  },
  {
    slug: 'hat-cast-on',
    icon: '🎩',
    category: '뜨개',
    fields: [
      { key: 'head', term: 'headCirc', unit: 'cm', def: 56, min: 20 },
      { key: 'ease', term: 'negEase', unit: 'percent', def: 10, min: 0, max: 30 },
      { key: 'g', term: 'stitchGauge', unit: 'stsPer10', def: 20, min: 1 },
    ],
    formula: '{castOn} = {headCirc} × (1 − {negEase} ÷ 100) × {stitchGauge} ÷ 10',
    compute: v => {
      const circ = v.head * (1 - v.ease / 100);
      return [
        { term: 'castOn', unit: 'sts', value: Math.round(circ * v.g / 10), digits: 0, primary: true },
        { term: 'targetWidth', unit: 'cm', value: round(circ, 1), digits: 1 },
      ];
    },
    ko: { title: '모자 시작 코 계산기', desc: '머리둘레와 음수 여유로 모자 시작 코 수를 구합니다.',
      long: '모자는 머리보다 작게 떠야 벗겨지지 않습니다. 둘레의 10% 정도를 빼는 것이 보통이고, 신축이 큰 무늬(고무뜨기)면 더 빼도 됩니다.',
      note: '무늬 반복 코 수의 배수로 맞추세요. 2×2 고무뜨기는 4의 배수여야 이음선이 어긋나지 않습니다.' },
    en: { title: 'Hat Cast-On Calculator', desc: 'Work out a hat cast-on from head circumference and negative ease.',
      long: 'A hat has to finish smaller than the head or it rides up. Taking about 10% off the measured circumference is the usual starting point, and a very stretchy rib can take more.',
      note: 'Round to a multiple of the pattern repeat. A 2×2 rib needs a multiple of four or the join will not line up.' },
  },
  {
    slug: 'sleeve-decrease',
    icon: '📉',
    category: '뜨개',
    fields: [
      { key: 'start', term: 'startSts', unit: 'sts', def: 72, min: 2 },
      { key: 'end', term: 'endSts', unit: 'sts', def: 48, min: 1 },
      { key: 'rows', term: 'rows', unit: 'row', def: 120, min: 2 },
    ],
    formula: '{everyRows} = {rows} ÷ (({startSts} − {endSts}) ÷ 2)',
    compute: v => {
      const dec = Math.max(0, (v.start - v.end) / 2);
      return [
        { term: 'everyRows', unit: 'row', value: dec > 0 ? Math.floor(v.rows / dec) : 0, digits: 0, primary: true },
        { term: 'decreases', unit: 'none', value: Math.round(dec), digits: 0 },
      ];
    },
    ko: { title: '소매 줄임 계산기', desc: '시작·끝 코 수와 단 수로 몇 단마다 줄일지 구합니다.',
      long: '줄임 한 번에 양쪽에서 각 1코씩, 두 코가 줄어듭니다. 줄여야 할 코를 2로 나눈 것이 줄임 횟수이고, 그것으로 단 수를 나누면 간격이 나옵니다.',
      note: '나누어떨어지지 않으면 남는 단을 겨드랑이 쪽에 몰아 두세요. 손목 쪽에서 간격이 흔들리면 눈에 보입니다.' },
    en: { title: 'Sleeve Decrease Calculator', desc: 'Space decreases evenly from a starting and ending stitch count.',
      long: 'One decrease round takes a stitch off each side, so two stitches go at a time. Half the difference is the number of decrease rounds, and dividing the rows by that gives the interval.',
      note: 'When it does not divide evenly, put the leftover rows up at the underarm. Uneven spacing shows most near the cuff.' },
  },
];
