/**
 * 공예 섹션 — 퀼트·자수 두 번째 묶음 (8종)
 *
 * 앞의 여덟은 "퀼트 한 장을 덮는 데 얼마"를 셌다. 여기 여덟은 그 사이를 채우는
 * 것들이다 — 블록과 블록 사이의 새싱, 바깥을 두르는 보더, 사 온 팻쿼터와
 * 젤리롤에서 실제로 몇 조각이 나오는지.
 *
 * 퀼트가 인치로 굳어 있는 것은 여기서 더 심하다. 팻쿼터는 1야드를 넷으로 갈라
 * 18 × 22인치(약 50 × 55cm), 젤리롤은 2.5인치(6.4cm) 스트립 40장, 원단 폭은
 * 42인치(107cm)다. 셋 다 도구가 아니라 유통 단위라서 cm로 바꿔 적으면 무엇을
 * 세는지 알 수 없어진다. 그래서 입력은 cm로 두고 그 숫자가 몇 인치에서 왔는지
 * 본문에 함께 적는다.
 *
 * 보더는 모서리에서 자란다. 안쪽 보더를 두르면 다음 보더가 감쌀 폭이 보더 폭의
 * 두 배만큼 늘어나므로, 바깥 보더 스트립은 반드시 안쪽 보더를 더한 치수로
 * 재단해야 한다. 이 한 겹을 빼먹는 것이 보더 계산에서 가장 흔한 실수다.
 *
 * 십자수의 카운트는 원단 올 수이고, 한 코가 몇 올을 덮는지는 사람이 정한다.
 * 28카운트 린넨을 두 올씩 뜨면 14카운트 아이다와 같은 크기가 되는데, 이 나눗셈이
 * 카운트 환산의 전부다.
 */
import type { FormulaTool } from '../formula/types.ts';
import { ratio } from '../formula/types.ts';
import { round } from '../formula/num.ts';

/** 셀비지를 잘라내고 실제로 쓰는 폭 — quilt.ts와 같은 셈 */
const usableWidth = (fabricWidth: number) => Math.max(1, fabricWidth - 2);

/** 1인치 = 2.54cm — 카운트가 1인치 기준이라 여기서만 쓴다 */
const INCH = 2.54;

/** 1/4인치 시접 두 번 — 완성 폭에 더해 재단 폭을 만든다 */
const TWO_SEAMS = 1.2;

export const QUILT2_TOOLS: FormulaTool[] = [
  {
    slug: 'quilt-sashing',
    icon: '🟦',
    category: '퀼트·자수',
    fields: [
      { key: 'bw', term: 'blocksW', unit: 'block', def: 4, min: 1, step: 1 },
      { key: 'bh', term: 'blocksH', unit: 'block', def: 5, min: 1, step: 1 },
      { key: 'bs', term: 'blockSize', unit: 'cm', def: 25, min: 1 },
      { key: 'sw', term: 'sashingW', unit: 'cm', def: 6, min: 1, step: 0.5 },
      { key: 'fw', term: 'boltWidth', unit: 'cm', def: 107, min: 10 },
    ],
    formula: '{sashingLen} = {blocksH} × ({blocksW} + 1) × {blockSize} + ({blocksH} + 1) × {quiltW}',
    compute: v => {
      const width = v.bw * v.bs + (v.bw + 1) * v.sw;
      // 블록 사이에 끼우는 짧은 조각과, 줄 사이를 통째로 지르는 긴 띠를 따로 센다
      const shortPieces = v.bh * (v.bw + 1) * v.bs;
      const longStrips = (v.bh + 1) * width;
      const total = shortPieces + longStrips;
      const strips = Math.ceil(ratio(total, usableWidth(v.fw)));
      return [
        { term: 'sashingLen', unit: 'cm', value: round(total, 1), digits: 1, primary: true },
        { term: 'strips', unit: 'strip', value: strips, digits: 0 },
        { term: 'fabricLength', unit: 'cm', value: round(strips * v.sw, 1), digits: 1 },
        { term: 'quiltW', unit: 'cm', value: round(width, 1), digits: 1 },
      ];
    },
    ko: { title: '퀼트 새싱 계산기', desc: '블록 배치와 새싱 폭으로 새싱 총 길이와 원단을 구합니다.',
      long: '가로 4 × 세로 5, 25cm 블록에 6cm 새싱을 두르면 완성 폭이 4 × 25 + 5 × 6 = 130cm입니다. 새싱은 두 종류로 나가는데, 블록 사이에 끼우는 짧은 조각이 5줄 × 5개 × 25cm = 625cm, 줄 사이와 위아래를 지르는 긴 띠가 6개 × 130cm = 780cm여서 합이 1,405cm입니다. 원단 폭 107cm에서 셀비지 2cm를 빼면 한 줄이 105cm이므로 14줄, 사야 할 길이는 14 × 6 = 84cm입니다.',
      note: '새싱 폭은 완성 폭입니다. 6cm로 마감하려면 1/4인치 시접 두 번(1.2cm)을 더해 7.2cm로 재단하세요. 짧은 조각은 전부 같은 길이여야 하는데, 그 길이는 블록의 완성 크기가 아니라 재단 크기와 같습니다 — 블록 옆면의 시접이 아직 살아 있기 때문입니다.' },
    en: { title: 'Quilt Sashing Calculator', desc: 'Total sashing length and fabric from a block layout and sashing width.',
      long: 'Four blocks across by five down, 25 cm blocks with 6 cm sashing, finishes 4 × 25 + 5 × 6 = 130 cm wide. Sashing goes in as two kinds of piece: the short ones between blocks come to 5 rows × 5 × 25 cm = 625 cm, and the long strips between the rows and along the top and bottom come to 6 × 130 cm = 780 cm, so 1,405 cm in all. A 107 cm fabric yields 105 cm once the selvedge is trimmed, so 14 strips, and 14 × 6 = 84 cm of fabric to buy.',
      note: 'The sashing width entered is the finished width. To finish 6 cm, cut 7.2 cm — two 1/4 in seams. Every short piece must be the same length, and that length is the block\'s cut size rather than its finished size, because the seam allowance on the block edge is still there.' },
  },
  {
    slug: 'quilt-border',
    icon: '🟪',
    category: '퀼트·자수',
    fields: [
      { key: 'w', term: 'quiltW', unit: 'cm', def: 150, min: 1 },
      { key: 'h', term: 'quiltH', unit: 'cm', def: 200, min: 1 },
      { key: 'b1', term: 'borderW', unit: 'cm', def: 6, min: 0, step: 0.5 },
      { key: 'b2', term: 'borderW2', unit: 'cm', def: 10, min: 0, step: 0.5 },
      { key: 'fw', term: 'boltWidth', unit: 'cm', def: 107, min: 10 },
    ],
    formula: '{borderLen} = 2 × ({quiltW} + {quiltH} + 2 × {borderW}) + 2 × ({quiltW} + {quiltH} + 4 × {borderW} + 2 × {borderW2})',
    compute: v => {
      // 옆면을 먼저 붙이고 위아래를 나중에 붙인다 — 위아래가 보더 폭만큼 길어진다
      const inner = 2 * v.h + 2 * (v.w + 2 * v.b1);
      const midW = v.w + 2 * v.b1;
      const midH = v.h + 2 * v.b1;
      const outer = v.b2 > 0 ? 2 * midH + 2 * (midW + 2 * v.b2) : 0;
      const stripsIn = Math.ceil(ratio(inner, usableWidth(v.fw)));
      const stripsOut = Math.ceil(ratio(outer, usableWidth(v.fw)));
      const fabric = stripsIn * (v.b1 + TWO_SEAMS) + stripsOut * (v.b2 + TWO_SEAMS);
      return [
        { term: 'borderLen', unit: 'cm', value: round(inner + outer, 1), digits: 1, primary: true },
        { term: 'strips', unit: 'strip', value: stripsIn + stripsOut, digits: 0 },
        { term: 'fabricLength', unit: 'cm', value: round(fabric, 1), digits: 1 },
        { term: 'borderedW', unit: 'cm', value: round(v.w + 2 * (v.b1 + v.b2), 1), digits: 1 },
        { term: 'borderedH', unit: 'cm', value: round(v.h + 2 * (v.b1 + v.b2), 1), digits: 1 },
      ];
    },
    ko: { title: '퀼트 보더 계산기', desc: '퀼트 크기와 보더 폭으로 보더 스트립 길이와 원단을 구합니다.',
      long: '150 × 200cm 퀼트에 6cm 보더를 두르면 옆면 두 줄이 각 200cm, 위아래 두 줄은 그 보더가 이미 붙어 있으므로 150 + 12 = 162cm입니다. 합이 724cm입니다. 두 번째 보더 10cm는 커진 162 × 212cm를 두르므로 옆면 212, 위아래 182 × 2가 되어 788cm, 전체 1,512cm입니다. 완성 크기는 182 × 232cm가 됩니다.',
      note: '바깥 보더를 안쪽 보더 없이 잰 치수로 재단하면 모서리마다 안쪽 보더 폭만큼 모자랍니다. 이 도구는 옆면을 먼저 붙이는 순서로 셈하는데, 위아래를 먼저 붙일 생각이면 폭과 길이를 바꿔 넣으세요. 원단은 완성 폭에 1/4인치 시접 두 번(1.2cm)을 더한 폭으로 잡았습니다 — 두 보더의 원단이 다르면 줄 수를 각각 나눠 사세요.' },
    en: { title: 'Quilt Border Calculator', desc: 'Border strip lengths and fabric for one or two borders round a quilt.',
      long: 'On a 150 × 200 cm quilt a 6 cm border needs two side strips of 200 cm and two top-and-bottom strips of 150 + 12 = 162 cm, since the sides are already attached — 724 cm together. A second 10 cm border goes round the enlarged 162 × 212 cm top: sides of 212 and top and bottom of 182 each, another 788 cm, for 1,512 cm in all. The quilt finishes 182 × 232 cm.',
      note: 'Cut the outer border to the unbordered measurement and it falls short by the inner border width at every corner. This works in the sides-first order; if you attach top and bottom first, swap the width and length. Fabric is figured at the finished width plus two 1/4 in seams (1.2 cm) — if the two borders are different fabrics, split the strip count between them.' },
  },
  {
    slug: 'fat-quarter-yield',
    icon: '🧺',
    category: '퀼트·자수',
    fields: [
      { key: 'fw', term: 'fqW', unit: 'cm', def: 50, min: 1 },
      { key: 'fh', term: 'fqH', unit: 'cm', def: 55, min: 1 },
      { key: 'pw', term: 'pieceW', unit: 'cm', def: 11.4, min: 0.5, step: 0.1 },
      { key: 'ph', term: 'pieceH', unit: 'cm', def: 11.4, min: 0.5, step: 0.1 },
    ],
    formula: '{piecesOut} = ⌊{fqW} ÷ {pieceW}⌋ × ⌊{fqH} ÷ {pieceH}⌋',
    compute: v => {
      // 조각을 돌려 놓으면 더 나오는 경우가 있어 두 방향을 다 세고 많은 쪽을 쓴다
      const acrossA = Math.floor(ratio(v.fw, v.pw));
      const downA = Math.floor(ratio(v.fh, v.ph));
      const acrossB = Math.floor(ratio(v.fw, v.ph));
      const downB = Math.floor(ratio(v.fh, v.pw));
      const a = acrossA * downA;
      const b = acrossB * downB;
      const best = Math.max(a, b);
      const perRow = a >= b ? acrossA : acrossB;
      const left = Math.max(0, v.fw * v.fh - best * v.pw * v.ph);
      return [
        { term: 'piecesOut', unit: 'sheet', value: best, digits: 0, primary: true },
        { term: 'perRow', unit: 'sheet', value: perRow, digits: 0 },
        { term: 'fqLeftover', unit: 'cm2', value: round(left, 0), digits: 0 },
      ];
    },
    ko: { title: '팻쿼터 조각 수 계산기', desc: '팻쿼터 한 장에서 그 크기 조각이 몇 개 나오는지 구합니다.',
      long: '팻쿼터는 1야드를 넷으로 가른 18 × 22인치, 약 50 × 55cm입니다. 4.5인치(11.4cm) 정사각으로 자르면 가로 4개, 세로 4개로 16개가 나오고 671㎠가 남습니다. 조각이 정사각이 아니면 돌려 놓는 쪽이 더 나오는 경우가 있어 두 방향을 다 세고 많은 쪽을 보여줍니다.',
      note: '조각 치수는 재단 치수로 넣으세요 — 완성 치수를 넣으면 시접이 빠져 실제보다 많이 나옵니다. 팻쿼터는 자른 자리가 삐뚤한 채로 팔리는 일이 많으니 한 변에서 1cm쯤은 못 쓰는 것으로 보고, 아슬아슬하게 맞는 배치라면 한 장 더 사 두세요.' },
    en: { title: 'Fat Quarter Calculator', desc: 'How many pieces of a given size come out of one fat quarter.',
      long: 'A fat quarter is a yard quartered — 18 × 22 in, about 50 × 55 cm. Cutting 4.5 in (11.4 cm) squares gives four across and four down, so 16 squares with 671 cm² left over. When the piece is not square, turning it can yield more, so both orientations are counted and the better one shown.',
      note: 'Enter the cut size, not the finished size; entering finished sizes leaves out the seam allowance and overstates the yield. Fat quarters are often cut off-square at the shop, so treat about 1 cm of one edge as unusable — if the layout only just fits, buy a second one.' },
  },
  {
    slug: 'jelly-roll-yield',
    icon: '🧻',
    category: '퀼트·자수',
    fields: [
      { key: 'n', term: 'rollStrips', unit: 'strip', def: 40, min: 1, step: 1 },
      { key: 'sw', term: 'rollStripW', unit: 'cm', def: 6.4, min: 1, step: 0.1 },
      { key: 'sl', term: 'rollStripLen', unit: 'cm', def: 107, min: 1 },
    ],
    formula: '{piecedArea} = {rollStrips} × ({rollStripW} − 1.2) × ({rollStripLen} − 1.2) ÷ 10000',
    compute: v => {
      // 이으면 긴 변 양쪽으로 1/4인치씩 사라진다 — 남는 것이 완성 치수다
      const finW = Math.max(0, v.sw - TWO_SEAMS);
      const finL = Math.max(0, v.sl - TWO_SEAMS);
      return [
        { term: 'piecedArea', unit: 'm2', value: round(v.n * finW * finL / 10000, 2), digits: 2, primary: true },
        { term: 'quiltW', unit: 'cm', value: round(v.n * finW, 1), digits: 1 },
        { term: 'quiltH', unit: 'cm', value: round(finL, 1), digits: 1 },
      ];
    },
    ko: { title: '젤리롤 퀼트 크기 계산기', desc: '스트립 수와 크기로 이었을 때의 면적과 퀼트 크기를 구합니다.',
      long: '젤리롤은 2.5인치(6.4cm) 스트립 40장을 원단 폭 42인치(107cm)로 자른 묶음입니다. 이으면 긴 변 양쪽으로 1/4인치씩 먹히므로 한 장의 완성 폭이 5.2cm, 길이가 105.8cm입니다. 40장을 나란히 이으면 208 × 105.8cm, 면적으로 2.2㎡가 됩니다.',
      note: '스트립을 그냥 이어 붙이면 폭이 208cm인 짧고 넓은 천이 됩니다. 침대 크기로 맞추려면 반으로 갈라 잇거나(104 × 211cm), 길게 이어 붙인 뒤 다시 잘라 쓰세요. 스트립 폭이 좁을수록 시접에 먹히는 비율이 커집니다 — 6.4cm는 19%, 3.8cm(1.5인치)는 32%가 시접으로 사라집니다.' },
    en: { title: 'Jelly Roll Quilt Calculator', desc: 'Usable area and finished size from a roll of precut strips.',
      long: 'A jelly roll is 40 strips of 2.5 in (6.4 cm) cut across a 42 in (107 cm) width. Sewing them together takes 1/4 in off each long edge, so one strip finishes 5.2 cm wide by 105.8 cm long. Joined side by side, 40 of them make 208 × 105.8 cm — an area of 2.2 m².',
      note: 'Sewn straight together the strips give a short, wide panel 208 cm across. For a bed size, cut it in half and rejoin (104 × 211 cm), or piece a long strip set and crosscut it. The narrower the strip, the more of it the seams eat: 19% at 6.4 cm, 32% at 3.8 cm (1.5 in).' },
  },
  {
    slug: 'mitred-corner',
    icon: '📐',
    category: '퀼트·자수',
    fields: [
      { key: 'w', term: 'quiltW', unit: 'cm', def: 150, min: 1 },
      { key: 'h', term: 'quiltH', unit: 'cm', def: 200, min: 1 },
      { key: 'bw', term: 'borderW', unit: 'cm', def: 15, min: 1, step: 0.5 },
    ],
    formula: '{mitreStripW} = {quiltW} + 2 × {borderW} + 10,  {mitreStripH} = {quiltH} + 2 × {borderW} + 10',
    compute: v => {
      // 양쪽 끝에 보더 폭 + 5cm를 남긴다 — 그 몫이 45도로 잘려 나간다
      const slack = v.bw + 5;
      return [
        { term: 'mitreStripW', unit: 'cm', value: round(v.w + 2 * slack, 1), digits: 1, primary: true },
        { term: 'mitreStripH', unit: 'cm', value: round(v.h + 2 * slack, 1), digits: 1 },
        { term: 'mitreMark', unit: 'cm', value: round(slack, 1), digits: 1 },
        { term: 'mitreDiag', unit: 'cm', value: round(v.bw * Math.SQRT2, 1), digits: 1 },
      ];
    },
    ko: { title: '보더 마이터 코너 계산기', desc: '마이터 보더로 두를 때 스트립 재단 길이와 45도 자리를 구합니다.',
      long: '마이터 코너는 두 보더가 액자처럼 45도로 만나는 마감입니다. 모서리에서 대각선을 만들려면 스트립이 퀼트 변보다 양쪽으로 보더 폭만큼 더 나와 있어야 하고, 넉넉하게 한쪽에 5cm를 더 둡니다. 150cm 변에 15cm 보더면 150 + 2 × 20 = 190cm를 자르고, 스트립 양 끝에서 20cm 들어온 자리에 표시해 그 사이만 박습니다. 자를 대각선 길이는 15 × √2 = 21.2cm입니다.',
      note: '박는 선을 스트립 끝까지 이어 박으면 모서리를 접을 수 없습니다. 표시한 두 점 사이만 박고 시작과 끝을 되박음하세요. 대각선은 바이어스라 다림질에서 늘어나므로, 두 스트립을 45도로 맞대어 박은 뒤에 여유를 잘라내세요 — 먼저 자르면 되돌릴 수 없습니다.' },
    en: { title: 'Mitred Border Corner Calculator', desc: 'Cut length for each mitred border strip and where the 45° cut falls.',
      long: 'A mitred corner is where two borders meet at 45° like a picture frame. To make that diagonal the strip has to run past the quilt edge by the border width at each end, plus 5 cm for safety. On a 150 cm side with a 15 cm border, cut 150 + 2 × 20 = 190 cm, mark 20 cm in from each end and stitch only between the marks. The diagonal to cut measures 15 × √2 = 21.2 cm.',
      note: 'Stitching right to the ends of the strip makes the corner impossible to fold. Sew between the two marks only and backstitch at both. The diagonal is on the bias and stretches under the iron, so join the two strips at 45° first and trim the excess afterwards — trimming first cannot be undone.' },
  },
  {
    slug: 'floss-skeins',
    icon: '🪡',
    category: '퀼트·자수',
    fields: [
      { key: 'fl', term: 'flossLen', unit: 'm', def: 60, min: 0.5, step: 0.5 },
      { key: 'ps', term: 'flossPerSkein', unit: 'm', def: 8, min: 1, step: 0.5 },
      { key: 'sp', term: 'flossSpare', unit: 'percent', def: 10, min: 0, max: 50 },
    ],
    formula: '{flossSkeins} = ⌈{flossLen} × (1 + {flossSpare} ÷ 100) ÷ ({flossPerSkein} × 6)⌉',
    compute: v => {
      const need = v.fl * (1 + v.sp / 100);
      // 한 타래는 6가닥이 8m씩 — 단일 가닥으로 풀면 48m다
      const perSkein = v.ps * 6;
      const skeins = Math.ceil(ratio(need, perSkein));
      return [
        { term: 'flossSkeins', unit: 'flossSkein', value: skeins, digits: 0, primary: true },
        { term: 'flossSkeinYield', unit: 'm', value: round(perSkein, 1), digits: 1 },
        { term: 'flossLeft', unit: 'm', value: round(Math.max(0, skeins * perSkein - need), 1), digits: 1 },
      ];
    },
    ko: { title: '자수실 타래 수 계산기', desc: '필요한 실 길이로 사야 할 자수실 타래 수를 구합니다.',
      long: '한 타래는 6가닥이 8m씩 감긴 것이므로, 단일 가닥으로 풀면 48m입니다. 필요한 길이 60m에 여유 10%를 더하면 66m이고 48로 나누면 1.4, 올려서 두 타래입니다. 남는 30m는 다음 도안에서 씁니다.',
      note: '길이는 단일 가닥 기준으로 넣으세요. 2가닥으로 놓는다면 "실을 몇 m 뽑았나"가 아니라 그 두 배가 들어갑니다. 색을 나중에 더 살 생각이라면 염색 로트를 확인하세요 — 같은 번호라도 로트가 다르면 색이 미세하게 달라 넓은 면에서는 이음 자리가 보입니다.' },
    en: { title: 'Embroidery Floss Skeins Calculator', desc: 'How many skeins to buy for a given length of floss.',
      long: 'A skein is six strands of 8 m, which unwinds to 48 m of single strand. Sixty metres of need plus 10% spare is 66 m; divided by 48 that is 1.4, rounded up to two skeins, with 30 m left for the next chart.',
      note: 'Enter the length on a single-strand basis. Stitching with two strands uses twice the length you pull, not the length you pull. If you plan to buy more of a colour later, check the dye lot — the same number in a different lot shifts slightly, and the join shows across a large filled area.' },
  },
  {
    slug: 'hoop-size',
    icon: '⭕',
    category: '퀼트·자수',
    fields: [
      { key: 'dw', term: 'designW', unit: 'cm', def: 18, min: 1 },
      { key: 'dh', term: 'designH', unit: 'cm', def: 25, min: 1 },
      { key: 'oh', term: 'overhang', unit: 'cm', def: 2, min: 0, step: 0.5 },
    ],
    formula: '{hoopD} = √(({designW} + 2 × {overhang})² + ({designH} + 2 × {overhang})²)',
    compute: v => {
      const w = v.dw + 2 * v.oh;
      const h = v.dh + 2 * v.oh;
      // 원 안에 사각형이 들어가는 조건은 대각선이므로 지름은 대각선으로 정해진다
      const diag = Math.sqrt(w * w + h * h);
      return [
        { term: 'hoopD', unit: 'cm', value: round(diag, 1), digits: 1, primary: true },
        { term: 'hoopInch', unit: 'inch', value: round(ratio(diag, INCH), 1), digits: 1 },
        { term: 'cutW', unit: 'cm', value: round(diag + 16, 1), digits: 1 },
      ];
    },
    ko: { title: '자수 수틀 크기 계산기', desc: '도안 크기와 작업 여백으로 필요한 수틀 지름을 구합니다.',
      long: '수틀은 둥글고 도안은 네모라서, 도안이 안에 들어가는 조건은 가로도 세로도 아니고 대각선입니다. 18 × 25cm 도안에 사방 2cm 여백을 두면 22 × 29cm이고, 대각선은 √(22² + 29²) = 36.4cm — 14.3인치입니다. 가로 22cm만 보고 8인치(20cm) 수틀을 고르면 도안이 틀 밖으로 나갑니다.',
      note: '원단은 수틀 지름보다 사방 8cm 이상 커야 나사 쪽에 물릴 수 있습니다. 큰 도안은 지름을 키우는 대신 수틀을 옮겨 가며 놓는데, 이미 놓은 코를 틀에 물리면 실이 눌려 자리가 남습니다 — 스크롤 프레임이나 큐브 프레임을 쓰면 그 자국이 없습니다.' },
    en: { title: 'Embroidery Hoop Size Calculator', desc: 'The smallest hoop diameter that clears a design plus its margin.',
      long: 'A hoop is round and a design is rectangular, so what has to fit is neither the width nor the height but the diagonal. An 18 × 25 cm design with 2 cm of working margin becomes 22 × 29 cm, and the diagonal is √(22² + 29²) = 36.4 cm, or 14.3 in. Choosing an 8 in (20 cm) hoop because the design is only 22 cm across puts part of it outside the ring.',
      note: 'The fabric needs at least 8 cm beyond the hoop on every side so there is something to grip at the screw. Large designs are usually worked by moving the hoop rather than buying a bigger one, but clamping over finished stitches crushes them and leaves a mark — a scroll or stretcher frame avoids that.' },
  },
  {
    slug: 'thread-count-convert',
    icon: '🔣',
    category: '퀼트·자수',
    fields: [
      { key: 'ct', term: 'aidaCount', unit: 'none', def: 28, min: 6, max: 40, step: 1 },
      { key: 'ov', term: 'threadsPerStitch', unit: 'none', def: 2, min: 1, max: 4, step: 1 },
      { key: 'cw', term: 'chartW', unit: 'sts', def: 100, min: 1, step: 1 },
      { key: 'ch', term: 'chartH', unit: 'sts', def: 140, min: 1, step: 1 },
    ],
    formula: '{stsPerInch} = {aidaCount} ÷ {threadsPerStitch},  {designW} = {chartW} ÷ {stsPerInch} × 2.54',
    compute: v => {
      const eff = ratio(v.ct, v.ov);
      const cell = ratio(INCH, eff);
      return [
        { term: 'stsPerInch', unit: 'stsPerInch', value: round(eff, 1), digits: 1, primary: true },
        { term: 'designW', unit: 'cm', value: round(v.cw * cell, 1), digits: 1 },
        { term: 'designH', unit: 'cm', value: round(v.ch * cell, 1), digits: 1 },
        { term: 'scalePct', unit: 'percent', value: round(v.ov * 100, 0), digits: 0 },
      ];
    },
    ko: { title: '이븐위브 카운트 환산 계산기', desc: '원단 카운트와 한 코가 덮는 올 수로 실질 코 수와 완성 크기를 구합니다.',
      long: '카운트는 1인치에 들어가는 올 수입니다. 아이다는 올이 네 가닥씩 묶여 있어 한 코가 한 묶음을 덮지만, 린넨과 이븐위브는 두 올을 한 코로 놓는 것이 보통입니다. 28카운트를 두 올씩 놓으면 실질 14코/인치가 되어 100 × 140코 도안이 18.1 × 25.4cm로 나옵니다 — 14카운트 아이다와 같은 크기입니다. 배율 200%는 같은 원단을 한 올씩 놓았을 때보다 두 배로 커진다는 뜻입니다.',
      note: '도안에 적힌 "28카운트"가 실질 14코라는 뜻인지 아닌지는 도안마다 다릅니다. 완성 크기가 절반이나 두 배로 어긋나면 대개 이 자리입니다. 한 올씩 놓는 페티포인트는 코가 작아 눈이 금방 지치고, 백스티치 선이 원단 짜임에 눌려 사선으로 흔들립니다.' },
    en: { title: 'Fabric Count Conversion Calculator', desc: 'Effective stitches per inch and finished size when stitching over more than one thread.',
      long: 'Count is threads per inch. Aida groups its threads in fours so one stitch covers one block, but linen and evenweave are normally worked over two threads. Stitching 28-count over two gives an effective 14 stitches per inch, so a 100 × 140 chart finishes 18.1 × 25.4 cm — the same as 14-count aida. The 200% scale means the design is twice the size it would be worked over one thread.',
      note: 'Whether a pattern\'s "28-count" already means an effective 14 differs from designer to designer; a finished size that comes out half or double is almost always this. Working over one thread (petit point) makes tiny stitches that tire the eye, and backstitch lines wander diagonally as the weave pulls them.' },
  },
];
