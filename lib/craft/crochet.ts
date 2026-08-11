/**
 * 공예 섹션 — 코바늘 12종
 *
 * 코바늘을 대바늘 계산에 얹으면 답이 어긋난다. 세 가지가 다르다.
 *
 * 첫째, 코가 정사각형이 아니다. 대바늘 메리야스는 코 높이가 폭보다 낮아 게이지를
 * 코와 단으로 따로 재면 되지만, 코바늘은 코 자체가 종류마다 높이가 정해져 있다 —
 * 짧은뜨기는 폭과 비슷하고 한길긴뜨기는 폭의 두 배쯤이다. 그래서 단 게이지를
 * 따로 재기 전에 코 폭 × 코 높이 배수로 먼저 잡을 수 있고, 도안이 sc냐 dc냐만
 * 바뀌어도 같은 길이에 필요한 단 수가 절반으로 줄어든다.
 *
 * 둘째, 원형은 고정된 개수로 늘린다. 대바늘 원형은 아무 자리에서나 늘려도 되지만
 * 코바늘 아미구루미·모티브는 한 라운드에 정해진 수(대개 6)만 늘려서 코 수가
 * 6·12·18…로 간다. 그래서 목표 둘레에서 라운드 수가 바로 나온다.
 *
 * 셋째, 같은 면적에 실이 훨씬 많이 든다. 한 코를 만들 때마다 바늘에 실을 여러 번
 * 감아 빼내므로 코 하나가 먹는 실 길이가 대바늘보다 길다. 같은 실·같은 면적에서
 * 3분의 1쯤 더 드는 것이 보통이고, 촘촘한 짧은뜨기는 그보다 더 든다. 그래서
 * "대바늘 도안의 실 양"을 그대로 사면 모자란다.
 *
 * 사슬(chain)은 코가 아니라 코를 놓을 바탕이다. 사슬 게이지와 코 게이지가 따로
 * 잡히고, 둘이 어긋나면 폭은 맞는데 첫 단이 당겨 밑변이 오그라든다 — 이 섹션에서
 * 사슬을 두 방향(폭 → 사슬, 사슬 → 폭)으로 다 두는 이유다.
 */
import type { FormulaTool } from '../formula/types.ts';
import { ratio } from '../formula/types.ts';
import { round } from '../formula/num.ts';

/** 시중에 파는 코바늘 호수(mm). 사이에 있는 값은 살 수 없다 */
const HOOKS = [2, 2.25, 2.5, 2.75, 3, 3.25, 3.5, 3.75, 4, 4.5, 5, 5.5, 6, 6.5, 7, 8, 9, 10, 12, 15];

/** 실 굵기 번호 → [호수 하단, 호수 상단, 게이지 하단, 게이지 상단]. 관례이고 물리 법칙이 아니다 */
const YARN_HOOK: [number, number, number, number][] = [
  [1.4, 2.25, 32, 42],
  [2.25, 3.5, 21, 32],
  [3.5, 4.5, 16, 20],
  [4.5, 5.5, 12, 17],
  [5.5, 6.5, 11, 14],
  [6.5, 9, 8, 11],
  [9, 15, 6, 9],
  [15, 25, 4, 6],
];

export const CROCHET_TOOLS: FormulaTool[] = [
  {
    slug: 'crochet-chain',
    icon: '🔗',
    category: '뜨개',
    fields: [
      { key: 'g', term: 'stitchGauge', unit: 'stsPer10', def: 16, min: 1 },
      { key: 'w', term: 'targetWidth', unit: 'cm', def: 100, min: 1 },
      { key: 'turn', term: 'turnCh', unit: 'sts', def: 3, min: 0, max: 6, step: 1 },
    ],
    formula: '{chainCount} = {stitchGauge} × {targetWidth} ÷ 10 + {turnCh}',
    compute: v => {
      const sts = Math.round(ratio(v.g * v.w, 10));
      const turn = Math.max(0, Math.round(v.turn));
      return [
        { term: 'chainCount', unit: 'sts', value: sts + turn, digits: 0, primary: true },
        { term: 'stitches', unit: 'sts', value: sts, digits: 0 },
        { term: 'targetWidth', unit: 'cm', value: round(ratio(sts, v.g) * 10, 1), digits: 1 },
      ];
    },
    ko: { title: '코바늘 사슬 코 수 계산기', desc: '게이지와 원하는 폭으로 시작 사슬 코 수와 기둥 코를 구합니다.',
      long: '10cm에 16코라면 1cm에 1.6코이므로 100cm 담요는 160코입니다. 여기에 기둥 코를 더해야 사슬이 됩니다 — 한길긴뜨기(dc)는 3사슬, 반길긴뜨기는 2사슬, 짧은뜨기는 1사슬이므로 163사슬을 잡습니다. 기둥 코는 첫 코를 대신하거나 높이를 맞추는 몫이라 폭에는 들어가지 않습니다.',
      note: '사슬은 코보다 작아서 같은 손으로 떠도 사슬 게이지가 코 게이지보다 촘촘합니다. 163사슬이 자에 대면 맞아도 첫 단을 뜨면 밑변이 당겨 오그라듭니다 — 사슬만 한 호수 큰 바늘로 뜨거나, 사슬을 건너뛰고 첫 단을 바로 만드는 파운데이션 뜨기(fdc)를 쓰세요. 무늬가 몇 코 단위로 반복되면 160코를 그 배수로 먼저 맞추고 기둥 코를 더합니다.' },
    en: { title: 'Crochet Chain Calculator', desc: 'Starting chain length from your gauge, a target width and the turning chain.',
      long: '16 stitches over 10 cm is 1.6 per centimetre, so a 100 cm blanket is 160 stitches. The chain is those stitches plus the turning chain: 3 for double crochet, 2 for half double, 1 for single, which makes 163 chains here. The turning chain either stands in for the first stitch or just buys height, so it never counts towards the width.',
      note: 'A chain is smaller than the stitch worked into it, so the same hands chain tighter than they crochet. Those 163 chains can measure right on the ruler and still pull the bottom edge in once the first row goes on. Chain with a hook one size up, or skip the chain entirely and use a foundation row (fdc). If the pattern repeats over a set number of stitches, round the 160 to that multiple first and add the turning chain afterwards.' },
  },
  {
    slug: 'crochet-gauge-rounds',
    icon: '📐',
    category: '뜨개',
    fields: [
      { key: 'g', term: 'stitchGauge', unit: 'stsPer10', def: 16, min: 1 },
      { key: 'hr', term: 'stitchHeightRatio', unit: 'times', def: 2, min: 0.5, max: 3, step: 0.1 },
      { key: 'len', term: 'targetLength', unit: 'cm', def: 60, min: 1 },
    ],
    formula: '{rowHeight} = 10 ÷ {stitchGauge} × {stitchHeightRatio},  {rounds} = {targetLength} ÷ {rowHeight}',
    compute: v => {
      // 코 폭에서 단 높이를 만든다 — 코바늘은 코 종류가 높이를 정한다
      const stW = ratio(10, v.g);
      const rowH = stW * v.hr;
      return [
        { term: 'rounds', unit: 'round', value: Math.round(ratio(v.len, rowH)), digits: 0, primary: true },
        { term: 'rowGauge', unit: 'rowsPer10', value: round(ratio(10, rowH), 1), digits: 1 },
        { term: 'rowHeight', unit: 'cm', value: round(rowH, 2), digits: 2 },
      ];
    },
    ko: { title: '코바늘 단 수(라운드) 계산기', desc: '코 게이지와 코 높이 배수로 떠야 할 단·라운드 수를 구합니다.',
      long: '코바늘은 코 종류가 높이를 정합니다. 16코 게이지면 한 코의 폭이 0.625cm이고, 한길긴뜨기는 폭의 2배쯤이라 한 단이 1.25cm입니다. 60cm를 뜨려면 48단입니다. 같은 실로 짧은뜨기(배수 1.1)로 바꾸면 한 단이 0.69cm로 낮아져 87단을 떠야 하고, 시간과 실이 거의 두 배로 듭니다.',
      note: '배수는 대략값입니다 — 짧은뜨기 1.0~1.2, 반길긴뜨기 1.4~1.6, 한길긴뜨기 1.9~2.1, 두길긴뜨기 2.6~3.0 사이에서 손 힘에 따라 움직입니다. 정확히 맞춰야 하는 옷이라면 스와치를 10단 떠서 높이를 재고 10으로 나누세요. 무늬뜨기(V자·모티브·구슬뜨기)는 이 배수가 통하지 않으니 무늬 한 반복의 높이를 직접 재야 합니다.' },
    en: { title: 'Crochet Row and Round Calculator', desc: 'Rows or rounds to work, from stitch gauge and how tall the stitch is.',
      long: 'In crochet the stitch itself sets the height. At 16 stitches per 10 cm one stitch is 0.625 cm wide, and a double crochet stands about twice that, so a row is 1.25 cm and 60 cm takes 48 rows. Switch the same yarn to single crochet (ratio 1.1) and a row drops to 0.69 cm — 87 rows, close to double the time and yarn.',
      note: 'The ratios are approximate: single crochet 1.0–1.2, half double 1.4–1.6, double 1.9–2.1, treble 2.6–3.0, drifting with your tension. For a garment that has to fit, work ten rows, measure the height and divide by ten. Textured patterns — V-stitches, motifs, bobbles — do not follow the ratio at all, so measure one full repeat instead.' },
  },
  {
    slug: 'granny-square-size',
    icon: '🔲',
    category: '뜨개',
    fields: [
      { key: 'n', term: 'rounds', unit: 'round', def: 6, min: 0, max: 40, step: 1 },
      { key: 'rd', term: 'roundDepth', unit: 'cm', def: 2, min: 0, step: 0.1 },
      { key: 'tw', term: 'targetWidth', unit: 'cm', def: 30, min: 0 },
    ],
    formula: '{squareSize} = 2 × {roundDepth} × {rounds},  {roundsNeeded} = ⌈{targetWidth} ÷ (2 × {roundDepth})⌉',
    compute: v => {
      // 라운드 하나가 네 변에 각각 붙으므로 한 변은 라운드 폭의 두 배씩 커진다
      const per = 2 * v.rd;
      return [
        { term: 'squareSize', unit: 'cm', value: round(per * v.n, 1), digits: 1, primary: true },
        { term: 'roundsNeeded', unit: 'round', value: Math.ceil(ratio(v.tw, per)), digits: 0 },
      ];
    },
    ko: { title: '그라니 스퀘어 크기 계산기', desc: '라운드 수와 한 라운드 폭으로 모티브 완성 크기를 구합니다.',
      long: '모티브는 중심에서 사방으로 자라므로 한 변은 라운드마다 폭의 두 배씩 커집니다. 한 라운드가 2cm인 실에서 6라운드면 24cm입니다. 30cm를 맞추려면 8라운드(32cm)가 필요하고 7라운드는 28cm에서 멈춥니다 — 라운드는 반만 뜰 수 없어 목표 크기는 대개 정확히 안 맞습니다.',
      note: '한 라운드 폭은 실과 바늘이 정합니다. 첫 라운드는 중심 링에 들어가는 다발이라 다른 라운드보다 좁고, 코너에서 사슬을 몇 개 두는지에 따라 라운드마다 0.2~0.3cm씩 흔들립니다. 3라운드까지 뜬 뒤 한 변을 재서 6으로 나누면(라운드 수의 두 배) 그 실의 실제 라운드 폭이 나옵니다 — 한 변이 12cm면 라운드 폭은 2cm입니다. 그 값으로 다시 계산하세요.' },
    en: { title: 'Granny Square Size Calculator', desc: 'Finished motif size from the rounds worked and the growth per round.',
      long: 'A motif grows outwards on all four sides, so each round adds twice its own depth to the side. With a round measuring 2 cm, six rounds give a 24 cm square. Asking for 30 cm needs eight rounds (32 cm) because seven stop at 28 — you cannot work half a round, so a target size rarely lands exactly.',
      note: 'The depth per round comes from the yarn and hook. Round one is a cluster crammed into the centre ring and sits narrower than the rest, and the number of chains at each corner moves every round by 2–3 mm. Work three rounds, measure one side and divide by six — twice the round count, because each round grows both ends of that side. A 12 cm side means 2 cm per round, and that is the number worth putting back into this calculator.' },
  },
  {
    slug: 'granny-blanket-squares',
    icon: '🛋️',
    category: '뜨개',
    fields: [
      { key: 'bw', term: 'targetWidth', unit: 'cm', def: 120, min: 1 },
      { key: 'bl', term: 'targetLength', unit: 'cm', def: 150, min: 1 },
      { key: 'ss', term: 'squareSize', unit: 'cm', def: 20, min: 1 },
      { key: 'jw', term: 'joinW', unit: 'cm', def: 0.5, min: 0, step: 0.1 },
    ],
    formula: '{squaresAcross} = ⌊({targetWidth} + {joinW}) ÷ ({squareSize} + {joinW})⌋,  {squareCount} = {squaresAcross} × {squaresDown}',
    compute: v => {
      // n장을 이으면 이음은 n−1개다 — 양쪽에 이음을 하나씩 더해 나누면 몫이 n이 된다
      const step = v.ss + v.jw;
      const fit = (space: number) => Math.max(0, Math.floor(ratio(space + v.jw, step)));
      const across = fit(v.bw);
      const down = fit(v.bl);
      return [
        { term: 'squareCount', unit: 'ea', value: across * down, digits: 0, primary: true },
        { term: 'squaresAcross', unit: 'ea', value: across, digits: 0 },
        { term: 'squaresDown', unit: 'ea', value: down, digits: 0 },
        { term: 'joinedW', unit: 'cm', value: round(across * v.ss + Math.max(0, across - 1) * v.jw, 1), digits: 1 },
      ];
    },
    ko: { title: '그라니 스퀘어 담요 계산기', desc: '담요 크기와 모티브 크기, 이음 폭으로 필요한 모티브 수를 구합니다.',
      long: '20cm 모티브를 0.5cm 이음으로 붙이면 한 장이 차지하는 자리는 20.5cm이고, 마지막 장 뒤에는 이음이 없으므로 나눌 때 이음 하나를 미리 더합니다. 120cm 폭에는 (120 + 0.5) ÷ 20.5 = 5.87 → 5장, 150cm 길이에는 7장이 들어가 35장이 필요합니다. 이때 완성 폭은 5 × 20 + 4 × 0.5 = 102cm입니다.',
      note: '102cm는 목표 120cm보다 18cm 작습니다. 내림이라 그렇습니다 — 한 줄을 더 붙여 122.5cm로 넘기든, 9cm 테두리를 둘러 메우든 둘 중 하나를 골라야 합니다. 모티브 크기는 손으로 뜬 값이라 장마다 다르므로, 이어 붙이기 전에 다 뜬 모티브를 블로킹해서 크기를 맞추세요. 이음 폭은 방식이 정합니다 — 겉뜨기 이음은 거의 0, 사슬 이음은 0.5~1cm, 짧은뜨기 이음은 1cm를 넘습니다.' },
    en: { title: 'Granny Square Blanket Calculator', desc: 'How many motifs a blanket needs, and how many across and down.',
      long: 'A 20 cm motif joined with a 0.5 cm seam occupies 20.5 cm, and since the last motif has no seam after it, one join is added before dividing. Across 120 cm that is (120 + 0.5) ÷ 20.5 = 5.87 → 5 motifs; down 150 cm it is 7, so 35 squares. Those five make a finished width of 5 × 20 + 4 × 0.5 = 102 cm.',
      note: '102 cm is 18 cm short of the 120 cm you asked for, because the division rounds down. You have to choose: add a sixth column and overshoot to 122.5 cm, or crochet a 9 cm border and make up the difference. Hand-made motifs also vary, so block them all to one size before joining. The join width depends on the method — a slip-stitch join is near zero, a chain join 0.5–1 cm, a single-crochet join more than 1 cm.' },
  },
  {
    slug: 'amigurumi-increase',
    icon: '🧸',
    category: '뜨개',
    fields: [
      { key: 'circ', term: 'finishedCirc', unit: 'cm', def: 30, min: 0 },
      { key: 'g', term: 'stitchGauge', unit: 'stsPer10', def: 25, min: 0 },
      { key: 'start', term: 'startSts', unit: 'sts', def: 6, min: 1, max: 12, step: 1 },
    ],
    formula: '{stitches} = {finishedCirc} × {stitchGauge} ÷ 10,  {incRounds} = ⌈{stitches} ÷ {startSts}⌉',
    compute: v => {
      const target = Math.round(ratio(v.circ * v.g, 10));
      const start = Math.max(0, Math.round(v.start));
      const incR = start > 0 ? Math.ceil(target / start) : 0;
      return [
        { term: 'incRounds', unit: 'round', value: incR, digits: 0, primary: true },
        { term: 'stitches', unit: 'sts', value: incR * start, digits: 0 },
        { term: 'diameter', unit: 'cm', value: round(ratio(v.circ, Math.PI), 1), digits: 1 },
      ];
    },
    ko: { title: '아미구루미 늘림 계산기 (매직링)', desc: '목표 둘레와 게이지로 매직링 시작 코와 늘림 라운드 수를 구합니다.',
      long: '아미구루미는 매직링에 짧은뜨기 6코로 시작해 라운드마다 6코씩 늘립니다 — 6, 12, 18, 24처럼 시작 코의 배수로 갑니다. 둘레 30cm에 25코 게이지면 목표는 75코이고(지름으로는 30 ÷ π = 9.5cm), 6으로 나누면 13라운드입니다. 라운드는 반만 뜰 수 없으므로 실제로는 78코가 되어 둘레가 31.2cm로 조금 커집니다. 시작 코를 8로 두면 늘림이 라운드마다 8코가 되어 10라운드에 80코로 더 빨리 커지고 바닥이 더 평평해집니다.',
      note: '늘림 수를 시작 코와 같게 두는 것이 규칙입니다. 6으로 시작해 라운드마다 8코를 늘리면 원이 평면을 지나 물결처럼 주름지고, 4코만 늘리면 원이 아니라 그릇처럼 오목해집니다. 아미구루미 게이지는 옷보다 훨씬 촘촘하게 잡습니다 — 솜이 코 사이로 비쳐 나오지 않도록 실 굵기보다 1~1.5호 작은 바늘을 쓰기 때문입니다. 그래서 실 라벨의 권장 게이지를 그대로 넣으면 크기가 크게 나옵니다.' },
    en: { title: 'Amigurumi Increase Calculator (Magic Ring)', desc: 'Magic ring start and increase rounds from a target circumference and gauge.',
      long: 'Amigurumi starts with 6 single crochet in a magic ring and adds 6 every round — 6, 12, 18, 24, always multiples of the starting count. A 30 cm circumference at 25 stitches per 10 cm needs 75 stitches, which is 30 ÷ π = 9.5 cm across, and 75 ÷ 6 rounds up to 13 increase rounds. You cannot work half a round, so you land on 78 stitches and the circumference creeps up to 31.2 cm. Start with 8 instead and you increase 8 per round, reaching 80 stitches in 10 rounds with a flatter base.',
      note: 'The rule is that the increases per round equal the starting count. Start with 6 and increase 8 a round and the circle passes flat and ruffles; increase only 4 and it curls into a bowl instead of lying open. Amigurumi gauge is far tighter than garment gauge, because the hook is deliberately 1–1.5 sizes smaller than the yarn asks for so the stuffing cannot show through. Feeding the gauge printed on the yarn band into this will give you a much bigger toy than you wanted.' },
  },
  {
    slug: 'crochet-yarn-per-stitch',
    icon: '🧶',
    category: '뜨개',
    fields: [
      { key: 'ss', term: 'swatchStitches', unit: 'sts', def: 200, min: 0, step: 1 },
      { key: 'sy', term: 'swatchYarnLen', unit: 'm', def: 12, min: 0, step: 0.1 },
      { key: 'ps', term: 'projectStitches', unit: 'sts', def: 8000, min: 0, step: 100 },
    ],
    formula: '{yarnPerStitch} = {swatchYarnLen} × 100 ÷ {swatchStitches},  {yarnLength} = {yarnPerStitch} × {projectStitches} ÷ 100',
    compute: v => {
      const perSt = ratio(v.sy * 100, v.ss);
      const total = ratio(v.sy, v.ss) * v.ps;
      return [
        { term: 'yarnPerStitch', unit: 'cm', value: round(perSt, 2), digits: 2, primary: true },
        { term: 'yarnLength', unit: 'm', value: round(total, 0), digits: 0 },
        { term: 'spare', unit: 'm', value: round(total * 0.15, 0), digits: 0 },
      ];
    },
    ko: { title: '코바늘 한 코에 드는 실 계산기', desc: '시험 뜨기의 코 수와 쓴 실 길이로 한 코에 드는 실과 총량을 구합니다.',
      long: '코바늘은 코마다 실을 바늘에 감아 빼내므로 코 하나가 먹는 길이가 대바늘보다 깁니다. 200코를 뜨는 데 12m가 들었다면 한 코는 6cm입니다. 한 단이 200코인 담요를 40단 뜨면 8,000코이므로 8,000 × 6cm = 480m이고, 여유 15%를 더해 552m를 잡습니다. 코 수는 도안에서 셀 수 있으니(한 단 코 수 × 단 수) 면적을 재는 것보다 정확합니다.',
      note: '코 종류를 바꾸면 이 값이 통째로 달라집니다. 한길긴뜨기 한 코는 짧은뜨기 한 코의 두 배 가까운 실을 먹지만 대신 높이가 두 배라, 같은 면적에서는 촘촘한 짧은뜨기가 결국 더 많이 듭니다. 그래서 스와치는 실제로 뜰 코로 떠야 합니다. 재는 법은 두 가지입니다 — 자를 실을 미리 재서 다 쓰는 것, 또는 스와치 무게에 g당 길이를 곱하는 것. 무게로 잴 때는 자른 실 끝(꼬리)이 무게에 들어가니 3~4g짜리 작은 스와치에서는 오차가 큽니다.' },
    en: { title: 'Crochet Yarn Per Stitch Calculator', desc: 'Yarn one stitch eats, and the total for a project, from a swatch.',
      long: 'Every crochet stitch wraps yarn over the hook and pulls it through, so one stitch swallows more length than a knitted one. If 200 stitches took 12 m, a stitch is 6 cm. A blanket 200 stitches wide and 40 rows deep is 8,000 stitches, so 8,000 × 6 cm = 480 m, and 15% spare puts it at 552 m. You can count stitches straight off the pattern (stitches per row × rows), which makes this more reliable than measuring area.',
      note: 'Change the stitch and this number changes with it. One double crochet takes nearly twice the yarn of one single crochet, but it also stands twice as tall — so over the same area the dense single crochet still wins on total yarn. Swatch in the stitch you will actually use. Measure it either by cutting a known length and using it up, or by weighing the swatch and multiplying by the metres per gram; with a 3–4 g swatch the starting and ending tails are a real share of that weight.' },
  },
  {
    slug: 'hook-from-gauge',
    icon: '🎯',
    category: '뜨개',
    fields: [
      { key: 'hook', term: 'hookSize', unit: 'mm', def: 5, min: 1, max: 20, step: 0.25 },
      { key: 'mg', term: 'myGauge', unit: 'stsPer10', def: 18, min: 0 },
      { key: 'pg', term: 'patternGauge', unit: 'stsPer10', def: 16, min: 0 },
    ],
    formula: '{hookNeeded} = {hookSize} × {myGauge} ÷ {patternGauge}',
    compute: v => {
      // 코 폭이 바늘 지름에 비례한다고 본다 — 게이지 비율만큼 호수를 옮긴다
      const need = ratio(v.hook * v.mg, v.pg);
      const stock = need > 0 ? HOOKS.reduce((a, b) => (Math.abs(b - need) < Math.abs(a - need) ? b : a)) : 0;
      return [
        { term: 'hookNeeded', unit: 'mm', value: round(need, 2), digits: 2, primary: true },
        { term: 'stockHook', unit: 'mm', value: stock, digits: 2 },
        { term: 'hookChange', unit: 'mm', value: round(need - v.hook, 2), digits: 2 },
      ];
    },
    ko: { title: '코바늘 호수 보정 계산기', desc: '내 게이지와 도안 게이지의 차이를 바늘 호수 차이로 바꿉니다.',
      long: '코 폭은 대체로 바늘 지름에 비례합니다. 5mm로 떠서 10cm에 18코가 나왔는데 도안이 16코를 요구하면 내 코가 작은 것이니 바늘을 키워야 합니다 — 5 × 18 ÷ 16 = 5.63mm, 즉 0.63mm 더 굵은 바늘입니다. 그런데 5.63mm 바늘은 없어서 5.5mm를 씁니다. 그러면 게이지는 16.4코쯤에서 멈추고 16코에 정확히 닿지는 않습니다.',
      note: '호수는 계단으로 뜁니다. 4mm 근처는 0.25mm 간격이지만 7mm를 넘으면 1mm씩 뛰므로, 굵은 실에서는 한 호수만 바꿔도 게이지가 두세 코씩 움직여 목표를 지나칩니다. 그때는 바늘이 아니라 실을 바꾸거나 코 종류·무늬를 바꾸는 것이 답입니다. 손 힘도 호수만큼 게이지를 바꿉니다 — 같은 5mm로 두 사람이 두 코씩 다르게 뜹니다. 그래서 스와치는 반드시 도안과 같은 코, 같은 방향(평면인지 원형인지)으로 뜨고 블로킹한 뒤에 재세요.' },
    en: { title: 'Crochet Hook Size From Gauge Calculator', desc: 'Turn the gap between your gauge and the pattern gauge into a hook change.',
      long: 'Stitch width scales roughly with hook diameter. If a 5 mm hook gives you 18 stitches per 10 cm and the pattern wants 16, your stitches are too small and the hook has to grow: 5 × 18 ÷ 16 = 5.63 mm, a change of 0.63 mm. Nobody sells a 5.63 mm hook, so you reach for the 5.5 — which lands near 16.4 stitches and never quite hits 16.',
      note: 'Hook sizes come in steps. Around 4 mm they are 0.25 mm apart, but past 7 mm they jump a whole millimetre, so with thick yarn one size can move the gauge two or three stitches and overshoot the target. At that point the fix is a different yarn, stitch or texture, not a different hook. Your own tension moves gauge as much as a hook size does — two people with the same 5 mm hook can be two stitches apart. Swatch in the pattern stitch, worked the same way round as the project, and measure after blocking.' },
  },
  {
    slug: 'crochet-vs-knit-yarn',
    icon: '⚖️',
    category: '뜨개',
    fields: [
      { key: 'kw', term: 'knitYarnWt', unit: 'gram', def: 500, min: 0 },
      { key: 'f', term: 'crochetExtraPct', unit: 'percent', def: 33, min: 0, max: 100 },
    ],
    formula: '{crochetYarnWt} = {knitYarnWt} × (1 + {crochetExtraPct} ÷ 100)',
    compute: v => {
      const c = v.kw * (1 + v.f / 100);
      return [
        { term: 'crochetYarnWt', unit: 'gram', value: round(c, 0), digits: 0, primary: true },
        { term: 'extraYarnWt', unit: 'gram', value: round(c - v.kw, 0), digits: 0 },
      ];
    },
    ko: { title: '코바늘 vs 대바늘 실 양 계산기', desc: '같은 면적을 코바늘로 뜰 때 실이 얼마나 더 드는지 구합니다.',
      long: '대바늘 도안이 500g을 요구하는 옷을 같은 크기로 코바늘로 뜨면 33% 기준에서 665g, 즉 165g이 더 듭니다. 50g 볼로는 세 볼 넘게 차이 납니다. 코마다 바늘에 실을 감아 빼내는 횟수가 많고, 코바늘 천이 더 두껍고 촘촘해서 같은 면적에 실이 더 들어가기 때문입니다.',
      note: '33%는 가운데 값이고 코 종류가 이 비율을 정합니다. 촘촘한 짧은뜨기는 40~50%까지 가고, 구멍이 큰 한길긴뜨기나 그라니 무늬는 20~25%에서 그칩니다 — 무늬 사이의 구멍이 실을 대신하기 때문입니다. 필레 크로셰처럼 절반이 구멍인 무늬는 대바늘보다 덜 들 수도 있습니다. 정확히 알아야 하면 두 방법으로 같은 크기 스와치를 떠서 무게를 재세요. 그리고 이 값은 무게이므로, 볼 개수로 옮길 때는 라벨의 100g당 길이로 다시 나눠야 합니다.' },
    en: { title: 'Crochet vs Knitting Yarn Calculator', desc: 'How much more yarn the same finished area takes in crochet.',
      long: 'A knitting pattern calling for 500 g, worked to the same size in crochet at the 33% figure, wants 665 g — 165 g more, over three extra 50 g balls. Each crochet stitch takes more wraps of yarn to make, and crochet fabric is thicker and denser, so more yarn goes into the same square metre.',
      note: '33% is the middle of the range and the stitch decides where you land. Dense single crochet runs 40–50% more, while open double crochet or granny patterns stop at 20–25%, because the holes between the clusters replace yarn. Filet crochet, half of which is holes, can even come out under the knitted figure. If it has to be exact, work the same swatch both ways and weigh them. And this answer is a weight: convert it to balls using the metres per 100 g on the band, not by counting balls directly.' },
  },
  {
    slug: 'round-increase-even',
    icon: '➕',
    category: '뜨개',
    fields: [
      { key: 'sts', term: 'stitches', unit: 'sts', def: 60, min: 0, step: 1 },
      { key: 'inc', term: 'increases', unit: 'sts', def: 8, min: 0, step: 1 },
    ],
    formula: '{everyNSts} = ⌊{stitches} ÷ {increases}⌋,  {leftoverSts} = {stitches} − {everyNSts} × {increases}',
    compute: v => {
      const sts = Math.max(0, Math.round(v.sts));
      const inc = Math.max(0, Math.round(v.inc));
      const everyN = inc > 0 ? Math.floor(sts / inc) : 0;
      return [
        { term: 'everyNSts', unit: 'sts', value: everyN, digits: 0, primary: true },
        { term: 'leftoverSts', unit: 'sts', value: sts - everyN * inc, digits: 0 },
        { term: 'endSts', unit: 'sts', value: sts + inc, digits: 0 },
      ];
    },
    ko: { title: '라운드 늘림 배분 계산기', desc: '라운드의 코 수와 늘릴 코 수로 몇 코마다 늘릴지 구합니다.',
      long: '60코 라운드에 8코를 늘린다면 60 ÷ 8 = 7.5이므로 7코마다 늘립니다. 7 × 8 = 56코를 쓰고 4코가 남습니다. 남는 4코는 버리는 것이 아니라 여덟 구간 중 넷을 8코로 늘려 쓰는 것입니다 — 7, 8, 7, 8, 7, 8, 7, 8로 번갈아 두면 눈에 안 띕니다. 끝나면 68코가 됩니다.',
      note: '남는 코를 한곳에 몰면 그 자리가 부풀어 옆선처럼 보입니다. 반대로 "8코마다"로 잘못 계산하면 8 × 8 = 64코라서 마지막 늘림을 넣을 자리가 4코 모자랍니다. 라운드로 도는 작품에서는 늘림 자리가 라운드마다 같은 위치에 오면 방사선처럼 줄이 서는데, 원하는 것이 아니면 라운드마다 시작 위치를 몇 코 옮기세요. 아미구루미처럼 코 수가 시작 코의 배수로 정해진 것은 이 계산이 아니라 늘림 라운드 계산기를 씁니다.' },
    en: { title: 'Even Increase Spacing Calculator', desc: 'Where to place increases evenly around a round, and what to do with the remainder.',
      long: 'Adding 8 stitches to a 60-stitch round: 60 ÷ 8 = 7.5, so you increase every 7th stitch. That spends 7 × 8 = 56 stitches and leaves 4 over. Those 4 are not waste — four of the eight gaps become 8 stitches instead of 7, and alternating 7, 8, 7, 8, 7, 8, 7, 8 hides them completely. You finish the round with 68.',
      note: 'Pile the remainder into one place and it bulges like a seam. Round the other way — "every 8th stitch" — and 8 × 8 = 64 leaves you 4 stitches short of the last increase. Working in the round, increases stacked at the same point every round line up into visible radial ridges; if that is not the look you want, shift the starting point a few stitches each round. For amigurumi, where the count is locked to multiples of the starting stitches, use the increase-rounds calculator instead.' },
  },
  {
    slug: 'crochet-border',
    icon: '🖼️',
    category: '뜨개',
    fields: [
      { key: 'w', term: 'targetWidth', unit: 'cm', def: 100, min: 0 },
      { key: 'h', term: 'targetLength', unit: 'cm', def: 120, min: 0 },
      { key: 'g', term: 'stitchGauge', unit: 'stsPer10', def: 16, min: 0 },
      { key: 'ce', term: 'cornerExtra', unit: 'sts', def: 2, min: 0, max: 6, step: 1 },
    ],
    formula: '{perimeter} = 2 × ({targetWidth} + {targetLength}),  {borderSts} = {perimeter} × {stitchGauge} ÷ 10 + 4 × {cornerExtra}',
    compute: v => {
      const perim = 2 * (v.w + v.h);
      const side = Math.round(ratio(perim * v.g, 10));
      const corner = 4 * Math.max(0, Math.round(v.ce));
      return [
        { term: 'borderSts', unit: 'sts', value: side + corner, digits: 0, primary: true },
        { term: 'perimeter', unit: 'cm', value: round(perim, 1), digits: 1 },
        { term: 'cornerSts', unit: 'sts', value: corner, digits: 0 },
      ];
    },
    ko: { title: '코바늘 테두리 코 수 계산기', desc: '작품 둘레와 게이지로 테두리 첫 라운드의 코 수를 구합니다.',
      long: '100 × 120cm 담요의 둘레는 2 × (100 + 120) = 440cm입니다. 16코 게이지면 704코이고, 네 모서리에 2코씩 더해 712코로 첫 라운드를 돕니다. 모서리 코가 없으면 테두리가 모서리에서 당겨 담요가 오각형처럼 오그라듭니다 — 짧은뜨기 테두리는 모서리마다 2~3코, 한길긴뜨기 테두리는 사슬 2 + 5코 다발이 보통입니다.',
      note: '위아래 변과 좌우 변은 코를 세는 방식이 다릅니다. 위아래는 코 머리에 하나씩 넣으면 되지만, 좌우는 단의 옆면이라 몇 코가 들어갈지 게이지가 정해 주지 않습니다. 한길긴뜨기 단 옆면에는 대개 2코, 짧은뜨기 단 옆면에는 1코가 들어갑니다. 그래서 이 값은 목표치이고, 실제로는 첫 라운드를 돌면서 코 수를 맞추게 됩니다. 무늬 테두리(조가비·피코)는 반복 수의 배수여야 하므로 712를 그 배수로 올리고 남는 몫을 모서리에서 흡수하세요.' },
    en: { title: 'Crochet Border Stitch Calculator', desc: 'Stitches for the first round of a border, corners included.',
      long: 'A 100 × 120 cm blanket has a perimeter of 2 × (100 + 120) = 440 cm. At 16 stitches per 10 cm that is 704 stitches, plus 2 at each of the four corners, so you work 712 in the first round. Leave the corner stitches out and the border pulls in at the corners until the blanket looks pentagonal — single crochet borders usually want 2–3 stitches per corner, double crochet ones a chain-2 plus a 5-stitch cluster.',
      note: 'The top and bottom edges are counted differently from the sides. Along the top you put one stitch in each stitch head, but the sides are row ends, and no gauge tells you how many fit there: roughly 2 into the side of a double crochet row, 1 into a single crochet row. Treat this figure as the target you correct towards while working the first round. A patterned edging — shells, picots — has to come out on a multiple of its repeat, so round 712 up to that multiple and absorb the difference at the corners.' },
  },
  {
    slug: 'chain-to-length',
    icon: '📏',
    category: '뜨개',
    fields: [
      { key: 'ch', term: 'chainCount', unit: 'sts', def: 163, min: 0, step: 1 },
      { key: 'cg', term: 'chainGauge', unit: 'stsPer10', def: 20, min: 0 },
      { key: 'g', term: 'stitchGauge', unit: 'stsPer10', def: 16, min: 0 },
    ],
    formula: '{chainLen} = {chainCount} ÷ {chainGauge} × 10,  {targetWidth} = {chainCount} ÷ {stitchGauge} × 10',
    compute: v => {
      const chLen = ratio(v.ch, v.cg) * 10;
      const rowW = ratio(v.ch, v.g) * 10;
      return [
        { term: 'chainLen', unit: 'cm', value: round(chLen, 1), digits: 1, primary: true },
        { term: 'targetWidth', unit: 'cm', value: round(rowW, 1), digits: 1 },
        { term: 'diff', unit: 'cm', value: round(rowW - chLen, 1), digits: 1 },
      ];
    },
    ko: { title: '사슬 길이 확인 계산기', desc: '사슬 코 수와 사슬 게이지로 그 사슬이 만드는 길이를 되짚습니다.',
      long: '163사슬을 10cm에 20사슬로 떴다면 사슬은 81.5cm입니다. 그런데 그 사슬에 10cm에 16코로 첫 단을 뜨면 첫 단은 101.9cm를 원합니다 — 20.4cm 차이입니다. 사슬이 그만큼 늘어나야 첫 단이 펴지므로, 밑변은 팽팽하게 당겨지고 천은 위로 갈수록 넓어지는 사다리꼴이 됩니다.',
      note: '이것이 코바늘에서 가장 흔한 실패이고, 사슬을 자에 대고 재는 것으로는 절대 안 잡힙니다 — 자에 댈 때는 손으로 늘려 재기 때문입니다. 사슬 게이지는 사슬 20개를 뜨고 힘을 뺀 채로 재세요. 차이가 크면 사슬만 한두 호수 큰 바늘로 뜨거나, 파운데이션 짧은뜨기·한길긴뜨기(fsc·fdc)로 사슬과 첫 단을 한 번에 만드세요 — 그러면 밑변이 첫 단과 같은 게이지로 나오고 이 계산 자체가 필요 없습니다. 차이가 음수면 사슬이 오히려 헐렁한 것이니 밑변이 늘어져 물결칩니다.' },
    en: { title: 'Chain to Length Calculator', desc: 'The length a foundation chain actually gives, checked against the first row.',
      long: '163 chains worked at 20 chains per 10 cm measure 81.5 cm. Work the first row into them at 16 stitches per 10 cm and that row wants 101.9 cm — a gap of 20.4 cm. The chain has to stretch by that much for the row to lie flat, so the bottom edge ends up taut and the fabric widens as it grows: a trapezoid, not a rectangle.',
      note: 'This is the most common failure in crochet, and measuring the chain against a ruler will never catch it, because you stretch it while you measure. Chain twenty, let go, and measure it relaxed. If the gap is big, chain with a hook one or two sizes larger, or skip the chain and use a foundation row (fsc, fdc) that makes the chain and the first row together — the base then comes out at row gauge and this calculation stops mattering. A negative gap means the chain is looser than the row, and the bottom edge will ripple instead.' },
  },
  {
    slug: 'crochet-hook-yarn-match',
    icon: '🔍',
    category: '뜨개',
    fields: [
      { key: 'cls', term: 'yarnClass', unit: 'none', def: 4, min: 0, max: 7, step: 1 },
    ],
    formula: '{hookMin} ~ {hookMax} ← {yarnClass} (0 ~ 7)',
    compute: v => {
      const i = Math.min(YARN_HOOK.length - 1, Math.max(0, Math.round(v.cls)));
      const [lo, hi, gl, gh] = YARN_HOOK[i];
      return [
        { term: 'hookSize', unit: 'mm', value: round((lo + hi) / 2, 2), digits: 2, primary: true },
        { term: 'hookMin', unit: 'mm', value: lo, digits: 2 },
        { term: 'hookMax', unit: 'mm', value: hi, digits: 2 },
        { term: 'stitchGauge', unit: 'stsPer10', value: round((gl + gh) / 2, 1), digits: 1 },
      ];
    },
    ko: { title: '실 굵기별 코바늘 호수 계산기', desc: '실 굵기 번호로 코바늘 호수 범위와 대략의 게이지를 찾습니다.',
      long: '번호는 0(레이스)부터 7(점보)까지입니다. 4번(worsted·아란)이면 코바늘은 5.5~6.5mm, 짧은뜨기 게이지는 10cm에 11~14코쯤이라 가운데인 6.0mm와 12.5코를 기준으로 잡습니다. 3번(DK)은 4.5~5.5mm에 12~17코, 5번(청키)은 6.5~9mm에 8~11코입니다. 아미구루미는 이 표보다 1~1.5호 작은 바늘을 씁니다 — 솜이 비치지 않게 천을 빽빽하게 만들기 때문입니다.',
      note: '이 표는 관례이고 물리 법칙이 아닙니다. 실 굵기 번호는 무게 구간이 아니라 나라·회사가 정한 분류여서, 같은 4번이라도 100g당 길이가 180m와 230m으로 갈립니다. 게이지 범위도 대바늘 기준으로 적힌 라벨과 다릅니다 — 같은 실에서 코바늘은 대바늘보다 큰 바늘을 쓰고 코가 더 큽니다. 그래서 여기 나온 호수는 스와치를 뜰 첫 바늘일 뿐입니다. 도안 게이지가 있으면 그것이 이 표를 이깁니다.' },
    en: { title: 'Crochet Hook and Yarn Weight Calculator', desc: 'Hook size range and typical gauge band for a yarn weight number.',
      long: 'The numbers run from 0 (lace) to 7 (jumbo). Weight 4 — worsted or aran — takes a 5.5–6.5 mm hook at roughly 11–14 single crochet per 10 cm, so the middle of the band is 6.0 mm and 12.5 stitches. Weight 3 (DK) is 4.5–5.5 mm at 12–17, weight 5 (chunky) is 6.5–9 mm at 8–11. Amigurumi deliberately drops 1–1.5 sizes below this to make fabric dense enough to hide the stuffing.',
      note: 'This mapping is a convention, not physics. The weight number is a category set by companies and national bodies rather than a measured range, so two yarns both labelled 4 can run 180 m and 230 m per 100 g. The gauge on a yarn band is usually a knitting figure as well, and crochet uses a larger hook with larger stitches on the same yarn. Treat the size here as the hook you swatch with first. Where a pattern states its own gauge, that beats this table.' },
  },
];
