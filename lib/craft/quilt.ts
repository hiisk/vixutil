/**
 * 공예 섹션 — 퀼트·자수 (8종)
 *
 * 퀼트는 인치로 만들어진 분야다. 원단 폭 42인치(약 107cm), 바인딩 스트립
 * 2.5인치(6.4cm), HST에 더하는 7/8인치(2.2cm)가 모두 인치에서 온 관습이라
 * cm만 적어 두면 도안과 어긋난다. 그래서 계산은 cm로 하고 그 관습이 어디서
 * 나온 숫자인지 본문에 함께 적는다.
 *
 * 원단 폭은 그대로 못 쓴다 — 양쪽 셀비지를 잘라내야 하므로 실제로 쓰는 폭은
 * 2cm 정도 좁다. 바인딩 줄 수와 뒷천 폭 수가 그 2cm에서 갈리는 경우가 있어
 * 여기서는 폭에서 2cm를 뺀 값으로 센다.
 *
 * 십자수의 '카운트'도 1인치에 들어가는 코 수다. 14카운트는 한 코가
 * 2.54 ÷ 14 = 0.18cm이므로, 같은 도안이 원단만 바꿔도 커지고 작아진다.
 */
import type { FormulaTool } from '../formula/types.ts';
import { ratio } from '../formula/types.ts';
import { round } from '../formula/num.ts';

/** 셀비지를 잘라내고 실제로 쓰는 폭 */
const usableWidth = (fabricWidth: number) => Math.max(1, fabricWidth - 2);

/** 1인치 = 2.54cm — 카운트가 1인치 기준이라 여기서만 쓴다 */
const INCH = 2.54;

export const QUILT_TOOLS: FormulaTool[] = [
  {
    slug: 'quilt-binding',
    icon: '🔲',
    category: '퀼트·자수',
    fields: [
      { key: 'w', term: 'quiltW', unit: 'cm', def: 150, min: 1 },
      { key: 'h', term: 'quiltH', unit: 'cm', def: 200, min: 1 },
      { key: 'sw', term: 'stripW', unit: 'cm', def: 6.4, min: 2, step: 0.1 },
      { key: 'fw', term: 'boltWidth', unit: 'cm', def: 107, min: 10 },
    ],
    formula: '{bindingLen} = 2 × ({quiltW} + {quiltH}) + 4 × {stripW} + 25',
    compute: v => {
      const len = 2 * (v.w + v.h) + 4 * v.sw + 25;
      const strips = Math.ceil(ratio(len, usableWidth(v.fw)));
      return [
        { term: 'bindingLen', unit: 'cm', value: round(len, 1), digits: 1, primary: true },
        { term: 'strips', unit: 'strip', value: strips, digits: 0 },
        { term: 'fabricLength', unit: 'cm', value: round(strips * v.sw, 1), digits: 1 },
      ];
    },
    ko: { title: '퀼트 바인딩 계산기', desc: '퀼트 크기로 바인딩 길이와 잘라야 할 스트립 수를 구합니다.',
      long: '둘레는 2 × (150 + 200) = 700cm입니다. 네 모서리를 접어 넘기는 데 스트립 폭만큼(6.4 × 4 = 25.6cm), 대각선으로 잇고 시작과 끝을 겹치는 데 25cm를 더해 750.6cm를 잡습니다. 스트립은 원단 폭 방향으로 자르므로 셀비지 2cm를 뺀 105cm가 한 줄이고, 그래서 8줄이 필요합니다.',
      note: '2.5인치(6.4cm) 스트립을 반으로 접어 1/4인치 시접으로 박으면 완성 폭이 약 1cm입니다. 스트립끼리는 45도로 이어야 합니다 — 직각으로 이으면 그 자리만 두꺼워져 모서리에서 뭉칩니다.' },
    en: { title: 'Quilt Binding Calculator', desc: 'Binding length and the number of strips to cut for a quilt.',
      long: 'The perimeter is 2 × (150 + 200) = 700 cm. Add one strip width at each of the four corners (6.4 × 4 = 25.6 cm) plus 25 cm for the diagonal joins and the closing overlap, giving 750.6 cm. Strips are cut across the fabric, and with 2 cm of selvedge trimmed each one runs 105 cm — hence eight strips.',
      note: 'A 2.5 in (6.4 cm) strip folded double and sewn with a 1/4 in seam finishes about 1 cm wide. Join strips on a 45° diagonal; square joins stack up thick and bunch at the corners.' },
  },
  {
    slug: 'quilt-backing',
    icon: '🛏️',
    category: '퀼트·자수',
    fields: [
      { key: 'w', term: 'quiltW', unit: 'cm', def: 150, min: 1 },
      { key: 'h', term: 'quiltH', unit: 'cm', def: 200, min: 1 },
      { key: 'oh', term: 'overhang', unit: 'cm', def: 10, min: 0 },
      { key: 'fw', term: 'boltWidth', unit: 'cm', def: 107, min: 10 },
    ],
    formula: '{backingLen} = ⌈({quiltW} + 2 × {overhang}) ÷ ({fabricWidth} − 2)⌉ × ({quiltH} + 2 × {overhang})',
    compute: v => {
      const needW = v.w + 2 * v.oh;
      const needH = v.h + 2 * v.oh;
      const panels = Math.max(1, Math.ceil(ratio(needW, usableWidth(v.fw))));
      return [
        { term: 'backingLen', unit: 'cm', value: round(panels * needH, 1), digits: 1, primary: true },
        { term: 'pieceCount', unit: 'sheet', value: panels, digits: 0 },
        { term: 'cutW', unit: 'cm', value: round(needW, 1), digits: 1 },
      ];
    },
    ko: { title: '퀼트 뒷천 계산기', desc: '퀼트 크기와 사방 여유로 뒷천 원단 길이를 구합니다.',
      long: '퀼팅하는 동안 세 겹이 서로 밀리므로 뒷천은 사방으로 여유를 둡니다. 한 변 10cm면 필요한 크기가 170 × 220cm인데, 170cm는 쓸 수 있는 원단 폭(107 − 2 = 105cm)을 넘으므로 두 폭을 이어야 합니다. 그래서 사야 할 길이는 220 × 2 = 440cm입니다.',
      note: '이을 때 셀비지는 반드시 잘라내세요 — 짜임이 촘촘해 그 줄만 당겨져 주름이 잡힙니다. 롱아암 퀼팅을 맡기면 한 변 10cm 이상을 요구하는 곳이 많으니 미리 확인하세요. 폭 240cm 이상인 광폭 뒷천을 쓰면 이음 없이 한 폭으로 끝납니다.' },
    en: { title: 'Quilt Backing Calculator', desc: 'Backing fabric length from quilt size, overhang and fabric width.',
      long: 'The three layers shift while you quilt, so the backing is cut larger on every side. At 10 cm per side you need 170 × 220 cm, and 170 cm exceeds the usable width (107 − 2 = 105 cm), so two lengths have to be seamed: 220 × 2 = 440 cm to buy.',
      note: 'Trim the selvedges before seaming — they are woven tighter and pull that line into a ridge. Longarm quilters often ask for 10 cm or more per side, so check before cutting. Wide backing at 240 cm or more avoids the seam altogether.' },
  },
  {
    slug: 'quilt-batting',
    icon: '☁️',
    category: '퀼트·자수',
    fields: [
      { key: 'w', term: 'quiltW', unit: 'cm', def: 150, min: 1 },
      { key: 'h', term: 'quiltH', unit: 'cm', def: 200, min: 1 },
      { key: 'oh', term: 'overhang', unit: 'cm', def: 5, min: 0 },
    ],
    formula: '{battingArea} = ({quiltW} + 2 × {overhang}) × ({quiltH} + 2 × {overhang}) ÷ 10000',
    compute: v => {
      const cw = v.w + 2 * v.oh;
      const ch = v.h + 2 * v.oh;
      return [
        { term: 'battingArea', unit: 'm2', value: round(cw * ch / 10000, 2), digits: 2, primary: true },
        { term: 'cutW', unit: 'cm', value: round(cw, 1), digits: 1 },
        { term: 'cutH', unit: 'cm', value: round(ch, 1), digits: 1 },
      ];
    },
    ko: { title: '퀼트 솜 계산기', desc: '퀼트 크기와 여유로 솜 재단 크기와 면적을 구합니다.',
      long: '솜은 뒷천보다 여유를 적게 둡니다. 한 변 5cm면 160 × 210cm, 면적으로는 3.36㎡입니다. 뒷천과 같은 크기로 자르면 남는 솜이 두껍게 접혀 노루발에 걸립니다.',
      note: '솜은 인치로 정해진 규격(유아용·트윈·퀸 등)으로 팝니다. 롤로 사면 남는 조각을 이어 쓸 수 있는데, 겹치지 말고 맞대어 지그재그로 박아야 두께가 그대로 유지됩니다. 면 솜은 세탁 후 3~5% 줄어듭니다.' },
    en: { title: 'Quilt Batting Calculator', desc: 'Batting cut size and area from quilt dimensions and overhang.',
      long: 'Batting takes less overhang than backing. At 5 cm per side that is 160 × 210 cm, an area of 3.36 m². Cutting it as large as the backing leaves a thick fold that catches under the foot.',
      note: 'Batting is sold in named sizes set in inches — crib, twin, queen. Buying it by the roll lets you join offcuts: butt the edges together rather than overlapping and zigzag them so the loft stays even. Cotton batting shrinks 3–5% in the wash.' },
  },
  {
    slug: 'quilt-blocks',
    icon: '🧱',
    category: '퀼트·자수',
    fields: [
      { key: 'w', term: 'quiltW', unit: 'cm', def: 150, min: 1 },
      { key: 'h', term: 'quiltH', unit: 'cm', def: 200, min: 1 },
      { key: 'bs', term: 'blockSize', unit: 'cm', def: 25, min: 1 },
    ],
    formula: '{blocks} = ⌊{quiltW} ÷ {blockSize}⌋ × ⌊{quiltH} ÷ {blockSize}⌋',
    compute: v => {
      const bw = Math.floor(ratio(v.w, v.bs));
      const bh = Math.floor(ratio(v.h, v.bs));
      return [
        { term: 'blocks', unit: 'block', value: bw * bh, digits: 0, primary: true },
        { term: 'blocksW', unit: 'block', value: bw, digits: 0 },
        { term: 'blocksH', unit: 'block', value: bh, digits: 0 },
      ];
    },
    ko: { title: '퀼트 블록 배치 계산기', desc: '퀼트 크기와 블록 크기로 가로·세로 블록 수와 총 개수를 구합니다.',
      long: '150 ÷ 25 = 6, 200 ÷ 25 = 8이므로 48블록입니다. 나누어떨어지지 않으면 내림한 만큼만 블록으로 채우고 남는 폭은 사이 띠(새싱)나 보더로 메웁니다 — 블록 크기를 억지로 맞추는 것보다 보더 폭을 조절하는 편이 훨씬 쉽습니다.',
      note: '블록 크기는 완성 치수입니다. 25cm 완성 블록은 시접 0.6cm씩을 더해 26.2cm로 재단해야 하고, 이을 때마다 그 시접이 사라집니다. 12인치(30.5cm)가 가장 흔한 블록 크기입니다.' },
    en: { title: 'Quilt Block Layout Calculator', desc: 'Blocks across, down and in total for a quilt of a given size.',
      long: '150 ÷ 25 = 6 across and 200 ÷ 25 = 8 down, so 48 blocks. When it does not divide evenly, use the whole blocks you get and make up the difference in sashing or borders — adjusting a border is far easier than resizing every block.',
      note: 'Block size here is the finished size. A 25 cm finished block is cut at 26.2 cm with 0.6 cm on each edge, and that allowance disappears into every seam. Twelve inches (30.5 cm) is the most common block size.' },
  },
  {
    slug: 'hst-squares',
    icon: '🔺',
    category: '퀼트·자수',
    fields: [
      { key: 'fin', term: 'hstFinished', unit: 'cm', def: 10, min: 1, step: 0.5 },
      { key: 'sa', term: 'seamAllow', unit: 'cm', def: 0.6, min: 0.2, max: 1.5, step: 0.1 },
    ],
    formula: '{hstCut} = {hstFinished} + 2 × {seamAllow} + √2 × {seamAllow}',
    compute: v => {
      const trim = v.fin + 2 * v.sa;
      return [
        { term: 'hstCut', unit: 'cm', value: round(trim + Math.SQRT2 * v.sa, 2), digits: 2, primary: true },
        { term: 'cutW', unit: 'cm', value: round(trim, 1), digits: 1 },
      ];
    },
    ko: { title: 'HST 재단 치수 계산기', desc: '완성 HST 크기로 처음 자를 정사각형 치수를 구합니다.',
      long: '정사각형 두 장을 겹쳐 대각선으로 박고 갈라 HST 두 장을 얻습니다. 그 정사각형은 완성 치수에 좌우 시접(0.6 × 2 = 1.2cm)과 대각선 시접(√2 × 0.6 ≈ 0.85cm)을 함께 지고 있어야 하므로 12.05cm입니다. 시접을 정확히 1/4인치(0.64cm)로 두면 이 값이 완성 치수 + 7/8인치(2.2cm)가 되는데, 퀼트에서 외워 쓰는 규칙이 바로 이것입니다.',
      note: '계산대로 딱 자르는 것보다 조금 크게 자르고 다듬는 편이 낫습니다. 대각선은 바이어스여서 다루는 동안 늘어나 완성 치수가 조금씩 작아집니다. 박은 뒤 11.2cm(완성 + 시접 두 번)로 다듬으면 블록이 맞습니다.' },
    en: { title: 'Half Square Triangle Calculator', desc: 'What size to cut the starting squares for a finished HST.',
      long: 'Two squares sewn along the diagonal and cut apart give two HST units. That square has to carry the finished size plus the two side allowances (0.6 × 2 = 1.2 cm) and the diagonal seam (√2 × 0.6 ≈ 0.85 cm), so 12.05 cm. Set the allowance to an exact 1/4 in (0.64 cm) and the answer becomes finished + 7/8 in (2.2 cm) — the rule quilters memorise.',
      note: 'Cutting slightly generous and trimming beats cutting exactly. The diagonal is on the bias and grows as you handle it, so exact cutting tends to finish small. Trim the sewn unit to 11.2 cm — finished plus two allowances — and the block will fit.' },
  },
  {
    slug: 'aida-size',
    icon: '✖️',
    category: '퀼트·자수',
    fields: [
      { key: 'cw', term: 'chartW', unit: 'sts', def: 100, min: 1, step: 1 },
      { key: 'ch', term: 'chartH', unit: 'sts', def: 140, min: 1, step: 1 },
      { key: 'ct', term: 'aidaCount', unit: 'none', def: 14, min: 6, max: 32, step: 1 },
    ],
    formula: '{designW} = {chartW} ÷ {aidaCount} × 2.54,  {designH} = {chartH} ÷ {aidaCount} × 2.54',
    compute: v => {
      const cell = ratio(INCH, v.ct);
      return [
        { term: 'designW', unit: 'cm', value: round(v.cw * cell, 1), digits: 1, primary: true },
        { term: 'designH', unit: 'cm', value: round(v.ch * cell, 1), digits: 1 },
        { term: 'stitchCount', unit: 'sts', value: Math.round(v.cw * v.ch), digits: 0 },
      ];
    },
    ko: { title: '십자수 완성 크기 계산기', desc: '도안 코 수와 원단 카운트로 완성 크기를 구합니다.',
      long: '카운트는 1인치에 들어가는 코 수입니다. 14카운트면 한 코가 2.54 ÷ 14 = 0.18cm이므로 가로 100코는 18.1cm(7.1인치), 세로 140코는 25.4cm(10인치)가 됩니다. 같은 도안을 18카운트에 놓으면 14.1 × 19.8cm로 작아집니다.',
      note: '린넨과 이븐위브는 보통 두 올을 한 코로 세므로 카운트를 절반으로 넣으세요 — 28카운트 린넨은 14카운트 아이다와 같은 크기가 됩니다. 액자를 먼저 정했다면 도안을 고치는 것보다 카운트를 바꿔 크기를 맞추는 것이 쉽습니다.' },
    en: { title: 'Cross Stitch Size Calculator', desc: 'Finished design size from chart stitch counts and fabric count.',
      long: 'Count is stitches per inch. On 14-count each stitch is 2.54 ÷ 14 = 0.18 cm, so 100 stitches across is 18.1 cm (7.1 in) and 140 down is 25.4 cm (10 in). Put the same chart on 18-count and it shrinks to 14.1 × 19.8 cm.',
      note: 'Linen and evenweave are normally stitched over two threads, so enter half the count — 28-count linen finishes the same size as 14-count aida. If the frame is already chosen, changing fabric count fits the design far more easily than redrawing the chart.' },
  },
  {
    slug: 'aida-fabric',
    icon: '🖼️',
    category: '퀼트·자수',
    fields: [
      { key: 'dw', term: 'designW', unit: 'cm', def: 18, min: 1 },
      { key: 'dh', term: 'designH', unit: 'cm', def: 25, min: 1 },
      { key: 'oh', term: 'overhang', unit: 'cm', def: 8, min: 0 },
    ],
    formula: '{cutW} = {designW} + 2 × {overhang},  {cutH} = {designH} + 2 × {overhang}',
    compute: v => [
      { term: 'cutW', unit: 'cm', value: round(v.dw + 2 * v.oh, 1), digits: 1, primary: true },
      { term: 'cutH', unit: 'cm', value: round(v.dh + 2 * v.oh, 1), digits: 1 },
    ],
    ko: { title: '십자수 원단 크기 계산기', desc: '완성 도안 크기와 여백으로 원단 재단 크기를 구합니다.',
      long: '도안 바깥으로 사방 여백을 둡니다. 한 변 8cm면 18 × 25cm 도안이 34 × 41cm 원단이 됩니다. 이 여백은 액자에 넣을 때 뒤로 넘겨 고정하는 몫이라, 아깝다고 줄이면 스트레칭에서 모자랍니다.',
      note: '액자용은 한 변 7.5cm(3인치), 최소한 5cm는 두세요. 수틀에 물릴 때는 수틀 지름보다 넉넉해야 합니다. 아이다는 잘린 면이 잘 풀리므로 재단하고 바로 지그재그로 박거나 테이프로 막으세요.' },
    en: { title: 'Cross Stitch Fabric Calculator', desc: 'Fabric cut size from a finished design size and margin.',
      long: 'The fabric is cut with a margin all round the design. At 8 cm per side, an 18 × 25 cm design needs 34 × 41 cm. That margin is what wraps to the back when the piece is framed, so trimming it to save fabric leaves nothing to stretch over the board.',
      note: 'Allow 7.5 cm (3 in) per side for framing and never less than 5 cm. Working in a hoop needs more again, since the fabric has to clear the hoop itself. Aida frays quickly from a cut edge — zigzag or tape it as soon as you cut.' },
  },
  {
    slug: 'floss-length',
    icon: '🧵',
    category: '퀼트·자수',
    fields: [
      { key: 'n', term: 'stitchCount', unit: 'sts', def: 1000, min: 1, step: 1 },
      { key: 'st', term: 'strandCount', unit: 'none', def: 2, min: 1, max: 6, step: 1 },
      { key: 'ct', term: 'aidaCount', unit: 'none', def: 14, min: 6, max: 32, step: 1 },
    ],
    formula: '{flossLen} = {stitchCount} × {strandCount} × 4 × √2 × 2.54 ÷ {aidaCount} ÷ 100',
    compute: v => {
      const cell = ratio(INCH, v.ct);
      // 앞면은 대각선 둘(2√2 × 한 칸), 뒷면으로 건너가는 몫과 시작·끝이 그만큼 더 든다
      const perStitch = 4 * Math.SQRT2 * cell;
      const totalCm = v.n * v.st * perStitch;
      // DMC 한 타래 = 6가닥 × 8m = 단일 가닥 48m(4,800cm)
      return [
        { term: 'flossLen', unit: 'm', value: round(totalCm / 100, 1), digits: 1, primary: true },
        { term: 'balls', unit: 'ball', value: Math.ceil(ratio(totalCm, 4800)), digits: 0 },
      ];
    },
    ko: { title: '자수실 소요량 계산기', desc: '스티치 수와 가닥 수로 필요한 자수실 길이를 구합니다.',
      long: '14카운트의 한 코는 0.18cm 정사각이고, 십자 하나는 그 대각선 두 개라 0.51cm입니다. 뒷면으로 건너가는 몫과 시작·끝을 정리하는 몫이 앞면과 비슷하게 들어가므로 한 가닥 기준 약 1.03cm로 잡습니다. 2가닥으로 1,000코를 놓으면 20.5m입니다.',
      note: 'DMC 한 타래는 6가닥 8m, 단일 가닥으로 치면 48m입니다. 2가닥이면 한 타래로 약 2,300코를 놓을 수 있습니다. 뒷면에서 멀리 건너뛰거나 색을 자주 바꾸면 실이 훨씬 빨리 줄어드니, 한 색이 도안 전체에 흩어져 있으면 여유를 더 두세요.' },
    en: { title: 'Embroidery Floss Calculator', desc: 'Floss length needed from stitch count, strands and fabric count.',
      long: 'On 14-count each stitch sits in a 0.18 cm square, and one cross is two diagonals of it — 0.51 cm. Travelling on the back and securing the starts and ends eats roughly as much again, so budget about 1.03 cm per stitch per strand. Two strands over 1,000 stitches comes to 20.5 m.',
      note: 'A DMC skein is six strands of 8 m, or 48 m of single strand, which covers about 2,300 stitches at two strands. Long jumps on the back and frequent colour changes burn through it much faster, so allow extra for a colour scattered across the whole chart.' },
  },
];
