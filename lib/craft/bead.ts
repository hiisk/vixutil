/**
 * 공예 섹션 — 구슬·포장 (8종)
 *
 * 구슬은 지름이 곧 한 알이 차지하는 길이다. 그래서 줄 길이를 지름으로 나누면
 * 개수가 나오는데, 결과는 언제나 내림한다 — 반 알은 없고, 한 알이 남는 쪽이
 * 모자란 쪽보다 낫다. 사이에 스페이서나 매듭이 들어가면 지름에 그 간격을 더해
 * "한 알 간격"으로 삼는다.
 *
 * 와이어와 링은 전부 원주 계산이다. 심에 감으면 와이어의 중심선이 원을 그리고,
 * 그 지름은 심 지름 + 와이어 지름이다. 얇은 와이어에서는 무시할 만하지만 1mm를
 * 넘어가면 링 하나마다 3mm가 어긋나 스무 개에 6cm가 된다.
 *
 * 포장은 높이가 두 번씩 들어간다. 상자를 한 바퀴 돌리면 폭에 높이가 두 번,
 * 방향을 바꿔 한 바퀴 더 돌리면 깊이에 높이가 또 두 번 붙는다 — 리본과 포장지가
 * 늘 눈대중보다 긴 이유다.
 */
import type { FormulaTool } from '../formula/types.ts';
import { ratio } from '../formula/types.ts';
import { round } from '../formula/num.ts';

export const BEAD_TOOLS: FormulaTool[] = [
  {
    slug: 'bead-count',
    icon: '🔵',
    category: '구슬·포장',
    fields: [
      { key: 'len', term: 'strandLen', unit: 'cm', def: 45, min: 1 },
      { key: 'd', term: 'beadD', unit: 'mm', def: 8, min: 0.5, step: 0.5 },
      { key: 'gap', term: 'spare', unit: 'mm', def: 0, min: 0, step: 0.5 },
    ],
    formula: '{beadCount} = ⌊{strandLen} × 10 ÷ ({beadD} + {spare})⌋',
    compute: v => {
      const pitch = v.d + v.gap; // 한 알이 차지하는 길이 = 지름 + 사이 간격
      const n = pitch > 0 ? Math.floor(v.len * 10 / pitch) : 0;
      return [
        { term: 'beadCount', unit: 'bead', value: n, digits: 0, primary: true },
        { term: 'strandLen', unit: 'cm', value: round(n * pitch / 10, 1), digits: 1 },
      ];
    },
    ko: { title: '구슬 개수 계산기', desc: '줄 길이와 구슬 지름으로 필요한 구슬 개수를 구합니다.',
      long: '구슬은 지름만큼 줄을 차지하므로 줄 길이를 지름으로 나누면 개수입니다. 45cm 줄에 8mm 구슬이면 56개가 들어가고 44.8cm를 채웁니다. 스페이서나 매듭이 사이에 들어간다면 그 간격을 여유 칸에 넣으세요 — 한 알 간격이 지름 + 여유로 바뀝니다.',
      note: '나눗셈은 내림합니다. 반 알은 없고, 남는 몇 mm는 매듭 쪽으로 몰립니다. 클래스프와 크림프가 1~2cm를 차지하니 그만큼 줄 길이에서 먼저 빼세요. 지름 표기는 공칭값이라 천연석은 알마다 달라, 실제로는 계산값보다 한두 개 어긋납니다.' },
    en: { title: 'Bead Count Calculator', desc: 'Find how many beads fill a strand from its length and the bead diameter.',
      long: 'A bead takes up its own diameter along the thread, so the strand length divided by the diameter is the count. A 45 cm strand of 8 mm beads holds 56 and fills 44.8 cm. If spacers or knots sit between beads, put that gap in the spare field — the pitch becomes diameter plus gap.',
      note: 'The division rounds down: there are no half beads, and the few leftover millimetres end up at the clasp. Subtract 1–2 cm from the strand length first for the clasp and crimps. Printed diameters are nominal, and natural stone varies bead to bead, so expect to be one or two out in practice.' },
  },
  {
    slug: 'bead-weight',
    icon: '⚖️',
    category: '구슬·포장',
    fields: [
      { key: 'n', term: 'beadCount', unit: 'bead', def: 100, min: 1 },
      { key: 'w', term: 'beadWt', unit: 'gram', def: 0.6, min: 0.01, step: 0.1 },
    ],
    formula: '{totalBeadWt} = {beadCount} × {beadWt}',
    compute: v => [
      { term: 'totalBeadWt', unit: 'gram', value: round(v.n * v.w, 1), digits: 1, primary: true },
      { term: 'count', unit: 'bead', value: Math.floor(ratio(100, v.w)), digits: 0 },
    ],
    ko: { title: '구슬 무게 계산기', desc: '구슬 개수와 한 알 무게로 총 무게를 구합니다.',
      long: '한 알 무게를 알면 곱하기만 남습니다. 8mm 유리 구슬이 대략 0.6g이라 100개면 60g입니다. 한 알을 저울에 올리면 0.0g으로 읽히니, 20개를 한꺼번에 달아 20으로 나누세요 — 그것이 한 알 무게를 얻는 가장 정확한 방법입니다. 아래에는 100g 봉지에 몇 개가 들어가는지 함께 보여줍니다.',
      note: '구슬은 개수보다 무게로 파는 일이 많아서, 봉지 무게를 개수로 되짚어야 도안에 맞는지 알 수 있습니다. 같은 8mm라도 유리·아크릴·금속이 세 배까지 차이 나므로 재질이 바뀌면 한 알 무게를 다시 재세요. 봉지 무게에는 구멍에 남은 가루와 부스러기도 들어 있습니다.' },
    en: { title: 'Bead Weight Calculator', desc: 'Multiply a bead count by the weight of one bead.',
      long: 'Once you know what one bead weighs the rest is multiplication: 8 mm glass rounds run about 0.6 g, so 100 of them is 60 g. A single bead reads as 0.0 g on a kitchen scale, so weigh twenty and divide by twenty — that is the accurate way to get the per-bead figure. The second line shows how many beads a 100 g bag holds.',
      note: 'Beads are usually sold by weight rather than by count, so converting a bag weight back into beads is the only way to know whether it covers the pattern. The same 8 mm bead can differ threefold between glass, acrylic and metal, so re-weigh whenever the material changes. Bag weights also include the dust and chips that come with them.' },
  },
  {
    slug: 'wire-length-wrap',
    icon: '🌀',
    category: '구슬·포장',
    fields: [
      { key: 'm', term: 'mandrelD', unit: 'mm', def: 8, min: 0.5, step: 0.5 },
      { key: 'w', term: 'wireD', unit: 'mm', def: 0.8, min: 0.1, step: 0.1 },
      { key: 'n', term: 'wraps', unit: 'none', def: 5, min: 1 },
    ],
    formula: '{wireLen} = {wraps} × π × ({mandrelD} + {wireD})',
    compute: v => [
      { term: 'wireLen', unit: 'mm', value: round(v.n * Math.PI * (v.m + v.w), 1), digits: 1, primary: true },
      { term: 'finishedLen', unit: 'mm', value: round(v.n * v.w, 1), digits: 1 },
    ],
    ko: { title: '와이어 감기 길이 계산기', desc: '심 지름과 감는 횟수로 필요한 와이어 길이를 구합니다.',
      long: '와이어를 심이나 구슬에 감으면 와이어의 중심선이 원을 그립니다. 그 원의 지름은 심 지름에 와이어 지름을 더한 값이므로, 8mm 심에 0.8mm 와이어를 5바퀴 감으면 138mm가 듭니다. 감은 구간의 높이는 바퀴 수 × 와이어 지름이라 4mm입니다 — 베일 길이를 맞출 때 이 값을 봅니다.',
      note: '양쪽에 2~3cm씩 더 두고 자르세요. 집게로 잡을 손잡이가 없으면 마지막 바퀴를 조일 수 없고, 조이면서 와이어가 조금 늘어납니다. 굵은 와이어(0.8mm/20게이지 이상)는 손으로 감기 어려워 실제 바퀴가 계산보다 헐거워집니다.' },
    en: { title: 'Wire Wrapping Length Calculator', desc: 'Work out the wire a set of wraps needs around a mandrel.',
      long: 'Wire wrapped around a mandrel or bead follows a circle drawn by its own centreline, and that circle\'s diameter is the mandrel plus the wire. Five wraps of 0.8 mm wire on an 8 mm mandrel take 138 mm. The wrapped section stands wraps × wire diameter tall, here 4 mm, which is the figure to check when sizing a bail.',
      note: 'Cut 2–3 cm extra at each end. Without a tail to grip with pliers you cannot tighten the last wrap, and the wire stretches slightly as you pull it in. Heavy wire, 0.8 mm / 20 gauge and up, resists wrapping by hand, so real coils come out looser than the arithmetic.' },
  },
  {
    slug: 'jump-ring',
    icon: '⭕',
    category: '구슬·포장',
    fields: [
      { key: 'm', term: 'mandrelD', unit: 'mm', def: 6, min: 0.5, step: 0.5 },
      { key: 'w', term: 'wireD', unit: 'mm', def: 1, min: 0.1, step: 0.1 },
      { key: 'len', term: 'wireLen', unit: 'cm', def: 100, min: 1 },
    ],
    formula: '{ringCount} = {wireLen} × 10 ÷ (π × ({mandrelD} + {wireD}))',
    compute: v => {
      const per = Math.PI * (v.m + v.w); // 링 하나에 드는 와이어 길이(mm)
      return [
        { term: 'ringCount', unit: 'ring', value: per > 0 ? Math.floor(v.len * 10 / per) : 0, digits: 0, primary: true },
        { term: 'wireLen', unit: 'mm', value: round(per, 1), digits: 1 },
      ];
    },
    ko: { title: '점프링 계산기', desc: '심 지름과 와이어 지름으로 링 개수와 링 하나의 와이어 길이를 구합니다.',
      long: '링 하나는 원 하나입니다. 중심선 지름이 심 지름 + 와이어 지름이므로 6mm 심에 1mm 와이어면 한 링에 22mm가 들고, 1m 와이어에서 45개가 나옵니다. 코일로 감을 때 코일 길이는 링 개수 × 와이어 지름이라 45개면 45mm짜리 코일이 됩니다 — 코일을 먼저 감고 통째로 자르는 순서라면 이 길이로 심의 길이를 정하세요.',
      note: '심 지름 ÷ 와이어 지름을 종횡비(AR)라고 부릅니다. 4보다 작으면 링이 빡빡해 다시 닫기 어렵고, 체인메일 패턴은 AR을 지정해 두는 일이 많으니 지름 두 개를 임의로 바꾸면 패턴이 안 맞습니다. 자를 때마다 톱날 두께만큼 없어져서 실제 개수는 계산보다 한두 개 적습니다.' },
    en: { title: 'Jump Ring Calculator', desc: 'Turn a mandrel and wire diameter into ring count and wire per ring.',
      long: 'A jump ring is one circle, and its centreline diameter is the mandrel plus the wire. A 6 mm mandrel with 1 mm wire takes 22 mm per ring, so a metre of wire yields 45. Wound as a coil, the coil measures ring count × wire diameter — 45 rings is a 45 mm coil, which is how you decide how long a mandrel to wind on if you coil first and cut after.',
      note: 'Mandrel divided by wire diameter is the aspect ratio, AR. Below about 4 the ring is too tight to close cleanly, and chainmail patterns specify an AR, so changing either diameter on its own breaks the weave. Each cut also loses the width of the saw blade, so the real yield is a ring or two short.' },
  },
  {
    slug: 'macrame-cord',
    icon: '🔗',
    category: '구슬·포장',
    fields: [
      { key: 'len', term: 'knotLen', unit: 'cm', def: 30, min: 1 },
      { key: 'mult', term: 'cordMultiple', unit: 'times', def: 4, min: 1, max: 12, step: 0.5 },
      { key: 'n', term: 'cordCount', unit: 'cord', def: 8, min: 1 },
    ],
    formula: '{cordLen} = {knotLen} × {cordMultiple}',
    compute: v => {
      const per = v.len * v.mult;
      return [
        { term: 'cordLen', unit: 'cm', value: round(per, 0), digits: 0, primary: true },
        { term: 'total', unit: 'm', value: round(per * v.n / 100, 1), digits: 1 },
      ];
    },
    ko: { title: '마크라메 코드 길이 계산기', desc: '매듭 구간 길이와 배수로 한 가닥 길이와 전체 길이를 구합니다.',
      long: '매듭은 코드를 먹습니다 — 평매듭은 완성 길이의 네 배가 기준이라, 30cm 구간이면 한 가닥을 120cm로 자릅니다. 여덟 가닥이면 9.6m가 필요합니다. 고리에 반으로 접어 거는 가닥은 접힌 뒤 길이가 절반이 되므로 여덟 배로 잘라야 합니다.',
      note: '배수는 매듭에 따라 다릅니다 — 평매듭 4배, 나선 매듭은 6배 이상, 촘촘한 무늬는 8배까지 갑니다. 코드가 굵어지면 같은 매듭도 더 먹으니, 짧게 한 가닥 매어 보고 배수를 직접 재는 것이 가장 정확합니다. 모자란 코드는 중간에 이어 붙일 수 없어 처음부터 다시 매야 합니다.' },
    en: { title: 'Macrame Cord Length Calculator', desc: 'Get the cut length per cord and the total from a knotted length.',
      long: 'Knots eat cord. Square knots run on the rule of four times the finished length, so a 30 cm knotted section means cutting each cord at 120 cm; eight cords come to 9.6 m in total. A cord folded over a ring loses half its length to the fold, so cut those at eight times instead.',
      note: 'The multiple depends on the knot: four times for square knots, six or more for a spiral, up to eight for dense patterns. Thicker cord eats more for the same knot, so tying a short test section and measuring it is the reliable way to set the multiple. Cord that comes up short cannot be joined mid-piece — you start again.' },
  },
  {
    slug: 'ribbon-length',
    icon: '🎁',
    category: '구슬·포장',
    fields: [
      { key: 'w', term: 'boxW', unit: 'cm', def: 20, min: 1 },
      { key: 'd', term: 'boxD', unit: 'cm', def: 15, min: 1 },
      { key: 'h', term: 'boxH', unit: 'cm', def: 8, min: 1 },
      { key: 'bow', term: 'spare', unit: 'cm', def: 30, min: 0 },
    ],
    formula: '{ribbonLen} = 2 × ({boxW} + {boxH}) + 2 × ({boxD} + {boxH}) + {spare}',
    compute: v => {
      const cm = 2 * (v.w + v.h) + 2 * (v.d + v.h) + v.bow;
      return [
        { term: 'ribbonLen', unit: 'cm', value: round(cm, 0), digits: 0, primary: true },
        { term: 'total', unit: 'm', value: round(cm / 100, 2), digits: 2 },
      ];
    },
    ko: { title: '선물 리본 길이 계산기', desc: '상자 치수와 매듭 여유로 십자 포장 리본 길이를 구합니다.',
      long: '십자로 두르는 리본은 상자를 두 바퀴 도는 셈입니다 — 폭 방향으로 한 바퀴, 깊이 방향으로 한 바퀴이고 두 바퀴에 높이가 각각 두 번 들어갑니다. 20 × 15 × 8cm 상자면 두 바퀴가 102cm이고, 매듭에 30cm를 더해 132cm입니다.',
      note: '답을 좌우하는 것은 매듭 여유입니다 — 손으로 묶는 나비 매듭은 25~35cm, 큰 장식 매듭은 60cm를 넘게 씁니다. 폭이 좁은 리본은 매듭이 작아 여유를 줄일 수 있습니다. 새틴은 자른 끝이 풀리므로 1cm는 사선으로 다시 자를 몫으로 두세요.' },
    en: { title: 'Gift Ribbon Length Calculator', desc: 'Work out ribbon for a cross wrap from the box and a bow allowance.',
      long: 'A cross wrap goes around the box twice — once the short way, once the long way — and the height is counted twice on each pass. A 20 × 15 × 8 cm box takes 102 cm for the two passes, plus 30 cm for the bow, giving 132 cm.',
      note: 'The bow allowance is what decides the answer: a hand-tied bow wants 25–35 cm, a large decorative one over 60 cm. Narrow ribbon ties a smaller bow and needs less. Satin frays where it is cut, so leave a centimetre to trim back on the diagonal.' },
  },
  {
    slug: 'giftwrap-size',
    icon: '📦',
    category: '구슬·포장',
    fields: [
      { key: 'w', term: 'boxW', unit: 'cm', def: 20, min: 1 },
      { key: 'd', term: 'boxD', unit: 'cm', def: 15, min: 1 },
      { key: 'h', term: 'boxH', unit: 'cm', def: 8, min: 1 },
      { key: 'ov', term: 'overhang', unit: 'cm', def: 3, min: 0 },
    ],
    formula: '{wrapW} = 2 × ({boxW} + {boxH}) + {overhang}, {wrapH} = {boxD} + 1.5 × {boxH} + {overhang}',
    compute: v => [
      { term: 'wrapW', unit: 'cm', value: round(2 * (v.w + v.h) + v.ov, 0), digits: 0, primary: true },
      { term: 'wrapH', unit: 'cm', value: round(v.d + 1.5 * v.h + v.ov, 0), digits: 0 },
    ],
    ko: { title: '포장지 크기 계산기', desc: '상자 치수와 겹치는 여유로 필요한 포장지 크기를 구합니다.',
      long: '한 방향은 상자를 한 바퀴 돌아야 하므로 (폭 + 높이) × 2에 겹치는 몫을 더합니다 — 20 × 8cm 면이면 59cm입니다. 다른 방향은 깊이에 양쪽 끝을 접어 덮을 몫으로 높이의 4분의 3씩, 곧 높이의 1.5배를 더해 30cm입니다. 두 값이 자를 종이의 가로와 세로입니다.',
      note: '포장지는 롤 폭이 정해져 있습니다(대개 70cm 안팎). 짧은 쪽 치수가 롤 폭을 넘으면 상자를 돌려 재단하거나 두 장을 이어야 합니다. 무늬가 한 방향인 종이는 돌릴 수 없으니 살 때 폭을 먼저 확인하세요. 딱 맞게 자르는 것보다 2cm 남기고 접어 넣는 편이 깔끔합니다.' },
    en: { title: 'Gift Wrap Size Calculator', desc: 'Find the sheet of paper a box needs, overlap included.',
      long: 'One direction has to travel all the way around the box, so it is (width + height) × 2 plus the overlap — 59 cm for a 20 × 8 cm cross-section. The other direction is the depth plus enough to fold over each end, about three quarters of the height on each side, so depth plus 1.5 × height: 30 cm. Those two numbers are the sheet to cut.',
      note: 'Wrapping paper comes on rolls of fixed width, usually around 70 cm. If the shorter figure exceeds the roll width you have to turn the box or join two sheets. Directional patterns cannot be turned, so check the roll width before buying. Cutting exactly to size looks worse than leaving 2 cm to fold under.' },
  },
  {
    slug: 'clay-weight',
    icon: '🧱',
    category: '구슬·포장',
    fields: [
      { key: 'vol', term: 'modelVol', unit: 'cm3', def: 60, min: 0.1 },
      { key: 'den', term: 'clayDensity', unit: 'gPerCm3', def: 1.7, min: 0.4, max: 2.5, step: 0.05 },
    ],
    formula: '{clayWeight} = {modelVol} × {clayDensity}',
    compute: v => {
      const g = v.vol * v.den;
      return [
        { term: 'clayWeight', unit: 'gram', value: round(g, 0), digits: 0, primary: true },
        { term: 'count', unit: 'block', value: Math.ceil(ratio(g, 57)), digits: 0 },
      ];
    },
    ko: { title: '점토 무게 계산기', desc: '만들 부피와 점토 밀도로 필요한 점토 무게를 구합니다.',
      long: '점토는 부피로 만들고 무게로 삽니다. 폴리머 클레이는 대체로 1.7 g/㎤이라 60㎤ 모형에 102g이 들고, 57g 블록으로는 두 덩이입니다. 자연건조 점토는 더 가벼워(1.2~1.5) 같은 부피에 무게가 덜 들지만, 마르면서 수분이 빠져 부피가 10% 넘게 줄어드니 그만큼 크게 만들어야 합니다.',
      note: '속을 알루미늄 포일로 채우면 점토 무게가 절반 이하로 줍니다 — 두꺼운 폴리머 클레이는 속까지 고르게 굳지 않아 식으면서 갈라지므로, 큰 모형은 아끼려서가 아니라 갈라지지 않게 하려고 심을 넣습니다. 블록 무게는 브랜드마다 다릅니다(피모 57g, 피모 프로페셔널 85g).' },
    en: { title: 'Clay Weight Calculator', desc: 'Convert a volume and a clay density into the clay to buy.',
      long: 'Clay is modelled by volume and sold by weight. Polymer clay runs about 1.7 g/cm³, so a 60 cm³ piece takes 102 g — two of the standard 57 g blocks. Air-dry clay is lighter, 1.2–1.5, so the same volume weighs less, but it loses water as it dries and shrinks by over 10%, which you have to build in.',
      note: 'Filling the core with aluminium foil cuts the clay weight by more than half — and thick polymer clay does not cure evenly all the way through, so it cracks as it cools. Big pieces get an armature to stop the cracking, not just to save clay. Block weights vary by brand: Fimo 57 g, Fimo Professional 85 g.' },
  },
];
