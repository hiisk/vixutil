/**
 * 공예 섹션 — 재봉·원단 (8종)
 *
 * 원단은 폭이 정해져 있고 길이만 사는 물건이다. 그래서 "필요한 천"은 면적이
 * 아니라 길이로 나오고, 그 길이는 조각이 폭 방향에 몇 개 들어가는지에 따라
 * 계단처럼 뛴다 — 110cm 폭에 40cm 조각은 두 장이 들어가고 세 장은 안 들어간다.
 * 남는 30cm는 버리는 몫이다. 그래서 나눗셈이 아니라 내림·올림으로 잡는다.
 *
 * 치수는 완성 치수와 재단 치수를 갈라 둔다. 시접은 마주 보는 두 변에 각각
 * 붙으므로 한 방향에 두 배로 들어가고, 세탁 수축은 사고 나서 되돌릴 수 없으니
 * 수축률은 더하지 않고 나눈다 — 4% 줄어드는 천은 4%를 더해서는 모자란다.
 */
import type { FormulaTool } from '../formula/types.ts';
import { ratio } from '../formula/types.ts';
import { round } from '../formula/num.ts';

export const SEW_TOOLS: FormulaTool[] = [
  {
    slug: 'fabric-yardage',
    icon: '✂️',
    category: '재봉',
    fields: [
      { key: 'pw', term: 'pieceW', unit: 'cm', def: 40, min: 1 },
      { key: 'ph', term: 'pieceH', unit: 'cm', def: 50, min: 1 },
      { key: 'n', term: 'pieceCount', unit: 'sheet', def: 6, min: 1, step: 1 },
      { key: 'fw', term: 'boltWidth', unit: 'cm', def: 110, min: 1 },
    ],
    formula: '{perRow} = ⌊{fabricWidth} ÷ {pieceW}⌋,  {fabricLength} = ⌈{pieceCount} ÷ {perRow}⌉ × {pieceH}',
    compute: v => {
      const perRow = Math.floor(ratio(v.fw, v.pw));
      // 조각이 원단 폭보다 넓으면 한 줄에 한 장으로 잡는다 — 실제로는 이어 붙이거나 배치를 돌려야 한다
      const rows = Math.ceil(ratio(v.n, Math.max(1, perRow)));
      return [
        { term: 'fabricLength', unit: 'cm', value: round(rows * v.ph, 1), digits: 1, primary: true },
        { term: 'perRow', unit: 'sheet', value: perRow, digits: 0 },
      ];
    },
    ko: { title: '원단 소요량 계산기', desc: '조각 크기와 장수, 원단 폭으로 사야 할 원단 길이를 구합니다.',
      long: '원단은 폭이 고정이라 폭 방향에 몇 장이 들어가는지가 먼저 정해집니다. 110cm 폭에 40cm 조각이면 두 장이고 남는 30cm는 못 씁니다. 6장을 얻으려면 3줄이 필요하므로 길이는 3 × 50 = 150cm입니다. 폭에 세 장이 들어가면 같은 6장이 100cm로 끝납니다.',
      note: '조각 폭이 원단 폭보다 넓으면 한 줄에 한 장으로 잡습니다 — 실제로는 이어 붙이거나 배치를 돌려야 합니다. 무늬 방향이 정해진 원단은 돌려 놓을 수 없어 이 값보다 더 듭니다.' },
    en: { title: 'Fabric Yardage Calculator', desc: 'How much fabric to buy from piece size, quantity and fabric width.',
      long: 'Fabric comes in a fixed width, so the first thing to settle is how many pieces fit across it. A 40 cm piece on 110 cm fabric fits twice and the leftover 30 cm is waste, so six pieces need three rows and the length is 3 × 50 = 150 cm. Fit three across and the same six pieces cost only 100 cm.',
      note: 'If a piece is wider than the fabric this assumes one piece per row; in practice you would have to seam it or turn the layout. Directional prints cannot be turned, so they need more than this figure.' },
  },
  {
    slug: 'fabric-pieces',
    icon: '🧩',
    category: '재봉',
    fields: [
      { key: 'fw', term: 'boltWidth', unit: 'cm', def: 110, min: 1 },
      { key: 'fl', term: 'fabricLength', unit: 'cm', def: 200, min: 1 },
      { key: 'pw', term: 'pieceW', unit: 'cm', def: 40, min: 1 },
      { key: 'ph', term: 'pieceH', unit: 'cm', def: 50, min: 1 },
    ],
    formula: '{piecesOut} = ⌊{fabricWidth} ÷ {pieceW}⌋ × ⌊{fabricLength} ÷ {pieceH}⌋',
    compute: v => {
      const perRow = Math.floor(ratio(v.fw, v.pw));
      const rows = Math.floor(ratio(v.fl, v.ph));
      return [
        { term: 'piecesOut', unit: 'sheet', value: perRow * rows, digits: 0, primary: true },
        { term: 'perRow', unit: 'sheet', value: perRow, digits: 0 },
      ];
    },
    ko: { title: '원단 재단 배치 계산기', desc: '가진 원단에서 같은 조각을 몇 장 뺄 수 있는지 구합니다.',
      long: '폭 방향으로 ⌊110 ÷ 40⌋ = 2장, 길이 방향으로 ⌊200 ÷ 50⌋ = 4줄이므로 8장이 나옵니다. 두 방향 모두 내림이라 남는 30cm 띠는 계산에 들어가지 않습니다 — 그 자리에 작은 조각을 끼우는 것은 따로 세야 합니다.',
      note: '시접을 포함한 재단 치수로 넣으세요. 완성 치수로 계산하면 장수는 늘어나지만 실제로는 시접이 없어 못 씁니다. 세탁하지 않은 원단은 수축분만큼 더 줄어듭니다.' },
    en: { title: 'Fabric Cutting Layout Calculator', desc: 'How many identical pieces you can cut from fabric you already have.',
      long: 'Across the width you get ⌊110 ÷ 40⌋ = 2, down the length ⌊200 ÷ 50⌋ = 4 rows, so eight pieces. Both divisions round down, which is why the leftover 30 cm strip does not count — squeezing smaller pieces into it is a separate calculation.',
      note: 'Enter cut sizes with the seam allowance already included. Working from finished sizes raises the count but leaves nothing to sew with. Unwashed fabric also loses its shrinkage before you cut.' },
  },
  {
    slug: 'seam-allowance',
    icon: '📐',
    category: '재봉',
    fields: [
      { key: 'w', term: 'targetWidth', unit: 'cm', def: 40, min: 1 },
      { key: 'h', term: 'targetLength', unit: 'cm', def: 50, min: 1 },
      { key: 'sa', term: 'seamAllow', unit: 'cm', def: 1, min: 0, max: 5, step: 0.1 },
    ],
    formula: '{cutW} = {targetWidth} + 2 × {seamAllow},  {cutH} = {targetLength} + 2 × {seamAllow}',
    compute: v => [
      { term: 'cutW', unit: 'cm', value: round(v.w + 2 * v.sa, 1), digits: 1, primary: true },
      { term: 'cutH', unit: 'cm', value: round(v.h + 2 * v.sa, 1), digits: 1 },
    ],
    ko: { title: '시접 재단 치수 계산기', desc: '완성 치수와 시접 폭으로 재단할 치수를 구합니다.',
      long: '시접은 마주 보는 두 변에 각각 붙으므로 한 방향에 두 배로 들어갑니다. 완성 40 × 50cm에 시접 1cm면 재단은 42 × 52cm입니다. 한 번만 더하면 완성품이 2cm 작아집니다.',
      note: '시접 폭은 분야마다 다릅니다. 한국·일본 의류 도안은 1cm, 미국 도안은 5/8인치(1.6cm), 퀼트는 1/4인치(0.6cm)를 씁니다. 밑단처럼 두 번 접는 자리는 접는 폭의 두 배를 따로 더하세요.' },
    en: { title: 'Seam Allowance Calculator', desc: 'Turn a finished size and a seam allowance into the size to cut.',
      long: 'Allowance is added at both opposing edges, so each direction gains twice the allowance. A 40 × 50 cm finished piece at 1 cm allowance is cut 42 × 52 cm. Add it once and the finished piece comes out 2 cm small.',
      note: 'The standard allowance differs by tradition: 1 cm in Korean and Japanese garment patterns, 5/8 in (1.6 cm) in American ones, 1/4 in (0.6 cm) in quilting. A double-folded hem needs twice the fold depth added on top.' },
  },
  {
    slug: 'bias-binding',
    icon: '🪡',
    category: '재봉',
    fields: [
      { key: 'len', term: 'bindingLen', unit: 'cm', def: 300, min: 1 },
      { key: 'sw', term: 'stripW', unit: 'cm', def: 4, min: 0.5, step: 0.5 },
    ],
    formula: '{cutW} = √({bindingLen} × {stripW} × 1.1)',
    compute: v => {
      // 이음 시접과 통을 다듬는 몫으로 면적에 10%를 얹는다
      const side = Math.sqrt(v.len * v.sw * 1.1);
      return [
        { term: 'cutW', unit: 'cm', value: round(side, 1), digits: 1, primary: true },
        { term: 'fabricLength', unit: 'cm', value: Math.ceil(side / 10) * 10, digits: 0 },
      ];
    },
    ko: { title: '바이어스 테이프 계산기', desc: '필요한 바이어스 길이와 폭으로 정사각 원단 크기를 구합니다.',
      long: '바이어스는 45도로 자르므로 긴 띠를 그냥 뽑을 수 없고, 정사각형을 대각선으로 갈라 잇거나 통으로 감아 연속으로 자릅니다. 정해지는 것은 길이가 아니라 면적입니다 — 300cm × 4cm = 1,200㎠에 이음과 다듬는 몫 10%를 더하면 √1,320 ≈ 36.3cm 정사각이면 됩니다.',
      note: '완성 폭 1cm인 양면 접기 테이프는 네 배 폭(4cm)으로 자릅니다. 완성 폭을 그대로 넣으면 접을 것이 없습니다. 니트처럼 이미 늘어나는 천은 바이어스로 자를 필요가 없습니다.' },
    en: { title: 'Continuous Bias Binding Calculator', desc: 'Size of the fabric square that yields a given length of bias strip.',
      long: 'Bias strips run at 45°, so you cannot pull a long one straight off the roll; you cut a square on the diagonal and join it, or wind it as one continuous tube. What the length really fixes is an area: 300 cm × 4 cm = 1,200 cm², plus 10% for the joins and trimming, so √1,320 ≈ 36.3 cm square.',
      note: 'Double-fold tape finishing 1 cm wide is cut four times that — 4 cm. Entering the finished width leaves nothing to fold under. Knits already stretch and rarely need bias-cut binding at all.' },
  },
  {
    slug: 'gather-ratio',
    icon: '👕',
    category: '재봉',
    fields: [
      { key: 'fin', term: 'finishedLen', unit: 'cm', def: 60, min: 1 },
      { key: 'r', term: 'gatherRatio', unit: 'times', def: 2, min: 1, max: 5, step: 0.1 },
    ],
    formula: '{fabricLength} = {finishedLen} × {gatherRatio}',
    compute: v => [
      { term: 'fabricLength', unit: 'cm', value: round(v.fin * v.r, 1), digits: 1, primary: true },
      { term: 'extraNeeded', unit: 'cm', value: round(v.fin * v.r - v.fin, 1), digits: 1 },
    ],
    ko: { title: '개더 비율 계산기', desc: '완성 길이와 개더 비율로 잘라야 할 원단 길이를 구합니다.',
      long: '개더 비율은 완성 길이의 몇 배를 잡아 주름을 잡을지입니다. 60cm 자리에 2배면 120cm를 자르고 60cm로 줄여 붙이므로, 60cm가 주름으로 들어갑니다. 얇은 천은 2.5~3배까지 가고 두꺼운 천은 1.5배가 한계입니다 — 같은 2배도 천 두께에 따라 볼륨이 전혀 다릅니다.',
      note: '비율은 자르기 전에 정하세요. 개더 실을 당기는 것으로 길이를 늘릴 수는 없습니다. 러플과 프릴도 같은 계산이지만 보통 2배 이상을 씁니다.' },
    en: { title: 'Gathering Ratio Calculator', desc: 'Length of fabric to cut for a gathered or ruffled edge.',
      long: 'The gather ratio is how many times the finished length you cut before drawing it up. Two times a 60 cm opening means cutting 120 cm and gathering it back to 60, so 60 cm disappears into the folds. Fine fabrics take 2.5–3×, heavy ones stop near 1.5× — the same ratio reads as a completely different volume depending on the cloth.',
      note: 'Fix the ratio before cutting: pulling the gathering thread cannot add length later. Ruffles and frills use the same arithmetic, usually at 2× or more.' },
  },
  {
    slug: 'elastic-length',
    icon: '〰️',
    category: '재봉',
    fields: [
      { key: 'circ', term: 'finishedLen', unit: 'cm', def: 76, min: 5 },
      { key: 'pct', term: 'stretchPct', unit: 'percent', def: 10, min: 0, max: 40 },
      { key: 'sa', term: 'seamAllow', unit: 'cm', def: 2.5, min: 0, max: 10, step: 0.5 },
    ],
    formula: '{elasticLen} = {finishedLen} × (1 − {stretchPct} ÷ 100) + {seamAllow}',
    compute: v => [
      { term: 'elasticLen', unit: 'cm', value: round(v.circ * (1 - v.pct / 100) + v.sa, 1), digits: 1, primary: true },
    ],
    ko: { title: '고무줄 길이 계산기', desc: '몸 치수와 당김 비율로 잘라야 할 고무줄 길이를 구합니다.',
      long: '고무줄은 재는 치수보다 짧게 자릅니다. 허리 76cm에서 10%를 빼면 68.4cm이고, 끝을 겹쳐 박는 2.5cm를 더해 70.9cm를 자릅니다. 이렇게 만든 고리는 76cm까지 벌어지려면 11.1% 늘어나야 하는데(10 ÷ 90), 그것이 고무줄에 실제로 요구하는 당김입니다.',
      note: '당김을 30% 넘게 잡으면 입을 때는 들어가도 하루 종일 자국이 남습니다. 고무줄은 종류마다 회복력이 달라, 자르기 전에 몸에 둘러 편한 길이를 재 보는 것이 어떤 공식보다 정확합니다.' },
    en: { title: 'Elastic Length Calculator', desc: 'How long to cut elastic from a body measurement and a stretch figure.',
      long: 'Elastic is cut shorter than the body it has to fit. Take 10% off a 76 cm waist for 68.4 cm, add 2.5 cm to overlap the ends, and cut 70.9 cm. The finished loop then has to stretch 11.1% (10 ÷ 90) to reach 76 cm, and that is the demand you are really putting on the elastic.',
      note: 'Past about 30% stretch it still goes on but leaves marks all day. Recovery varies a lot between elastics, so wrapping it round the body and finding the comfortable length beats any formula.' },
  },
  {
    slug: 'fabric-shrinkage',
    icon: '🧺',
    category: '재봉',
    fields: [
      { key: 'b', term: 'beforeWash', unit: 'cm', def: 100, min: 1 },
      { key: 'a', term: 'afterWash', unit: 'cm', def: 96, min: 1 },
      { key: 'need', term: 'finishedLen', unit: 'cm', def: 200, min: 1 },
    ],
    formula: '{shrinkPct} = ({beforeWash} − {afterWash}) ÷ {beforeWash} × 100,  {fabricLength} = {finishedLen} ÷ (1 − {shrinkPct} ÷ 100)',
    compute: v => {
      const shrink = ratio(v.b - v.a, v.b);
      const buy = ratio(v.need, 1 - shrink);
      return [
        { term: 'shrinkPct', unit: 'percent', value: round(shrink * 100, 2), digits: 2, primary: true },
        { term: 'fabricLength', unit: 'cm', value: round(buy, 1), digits: 1 },
        { term: 'extraNeeded', unit: 'cm', value: round(buy - v.need, 1), digits: 1 },
      ];
    },
    ko: { title: '원단 수축률 계산기', desc: '세탁 전후 치수로 수축률과 더 사야 할 원단을 구합니다.',
      long: '10cm가 아니라 긴 구간을 재세요. 100cm가 세탁 후 96cm면 수축률 4%입니다. 세탁 뒤에 200cm가 남아야 한다면 200 ÷ 0.96 = 208.3cm를 사야 하고 8.3cm가 수축으로 사라집니다. 4%를 그냥 더해 208cm로 잡으면 조금 모자랍니다 — 더하는 것이 아니라 나누는 것이 맞습니다.',
      note: '면과 린넨은 첫 세탁에서 3~10%, 데님은 그보다 더 줄어듭니다. 폭도 같이 줄어드니 폭 방향이 빠듯한 재단이면 따로 확인하세요. 재단 전에 미리 물에 넣어 줄여 두면 이 계산이 필요 없습니다.' },
    en: { title: 'Fabric Shrinkage Calculator', desc: 'Shrinkage percentage and the extra fabric to buy, from a wash test.',
      long: 'Measure a long run rather than 10 cm. If 100 cm comes back as 96, shrinkage is 4%. To be left with 200 cm after washing you need 200 ÷ 0.96 = 208.3 cm, so 8.3 cm goes in the wash. Adding 4% instead gives 208 cm, which is slightly short — the correct step is to divide, not to add.',
      note: 'Cotton and linen lose 3–10% on the first wash and denim more. Width shrinks as well, so check that separately when a piece only just fits across. Pre-washing before you cut removes the guesswork entirely.' },
  },
  {
    slug: 'pattern-scale',
    icon: '📄',
    category: '재봉',
    fields: [
      { key: 'len', term: 'finishedLen', unit: 'cm', def: 20, min: 0.1 },
      { key: 'pct', term: 'scalePct', unit: 'percent', def: 120, min: 10, max: 400 },
    ],
    formula: '{scaledLen} = {finishedLen} × {scalePct} ÷ 100',
    compute: v => [
      { term: 'scaledLen', unit: 'cm', value: round(v.len * v.pct / 100, 2), digits: 2, primary: true },
    ],
    ko: { title: '도안 확대·축소 계산기', desc: '치수와 배율로 확대·축소한 도안 치수를 구합니다.',
      long: '치수는 배율에 비례하지만 원단 소요는 배율의 제곱에 비례합니다. 20cm 선을 120%로 키우면 24cm가 되고, 같은 조각의 면적은 144%가 됩니다 — 도안을 조금 키웠다가 원단이 모자라는 이유입니다. 프린터 배율도 여기 넣는 값과 같은 120%입니다.',
      note: '출력할 때 "용지에 맞추기"를 끄고 배율을 직접 넣으세요. 도안에 있는 확인용 정사각형을 자로 재서 맞는지 본 다음에 자릅니다. 시접은 배율로 늘리지 않고 원래 폭 그대로 두세요.' },
    en: { title: 'Sewing Pattern Scale Calculator', desc: 'Scaled measurement when you enlarge or reduce a printed pattern.',
      long: 'Lengths scale with the percentage, but fabric use scales with its square. A 20 cm line at 120% becomes 24 cm while the area of the same piece becomes 144% — which is why a slightly enlarged pattern runs out of fabric. The printer zoom is that same 120%.',
      note: 'Turn off "fit to page" when printing and type the scale in yourself, then measure the test square printed on the pattern before cutting anything. Seam allowances stay at their original width instead of being scaled up.' },
  },
];
