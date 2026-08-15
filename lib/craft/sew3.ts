/**
 * 공예 섹션 — 재봉 셋째 묶음 12종 (몸에 맞추기와 마감)
 *
 * 앞의 열여섯 개는 "천을 얼마나 사는가"와 "그 천이 어디로 사라지는가"였다. 여기는
 * 그다음, 옷이 몸에 맞는가와 끝을 어떻게 닫는가다. 세 가지 셈이 계속 나온다.
 *
 * 하나. 여유(ease)가 두 가지다. 입기 위한 여유는 몸 치수에 더하는 길이지만,
 * 소매산 이즈는 두 곡선의 길이 차이를 주름 없이 먹여 넣는 몫이다 — 후자는 몸이
 * 아니라 실과 다림질이 감당하고, 감당할 수 있는 양이 천마다 다르다. 그래서 비율을
 * 입력으로 드러낸다. 모직은 5cm를 먹지만 코팅 면은 1cm에서 주름이 잡힌다.
 *
 * 둘. 도안 조각은 몸의 4분의 1이다. 앞판을 접어 놓고 자르므로 한 장은 앞의
 * 절반이고 몸통 둘레의 4분의 1이다. 그래서 둘레에서 나온 부족분은 조각에 4로
 * 나눠 벌린다 — 그대로 벌리면 네 배 큰 옷이 된다. 다트도 같은 이유로 중심선
 * 좌우로 절반씩 갈린다.
 *
 * 셋. 곡선에서는 길이가 반지름에 비례한다. 곡선 밑단에 곧은 안단을 붙이면 안쪽
 * 변이 남고, 다트를 돌리면 밑단이 벌어진다. 둘 다 "천이 부족하거나 남는다"는
 * 말이 아니라 호의 길이가 반지름에 따라 달라진다는 기하학이다 — 그래서 이 묶음의
 * 절반은 원과 각도를 다룬다.
 *
 * 부속은 파는 규격이 따로 있다는 원칙을 그대로 물려받는다. 콘 실은 5,000m,
 * 파이핑 코드는 미터, 지퍼는 정해진 사이즈로만 나온다.
 */
import type { FormulaTool } from '../formula/types.ts';
import { ratio } from '../formula/types.ts';
import { round } from '../formula/num.ts';

/** 바지 앞 지퍼로 파는 길이(cm). 트임은 지퍼에 맞춰 박으므로 가까운 값을 고른다 */
const FLY_ZIPS = [10, 12, 15, 18, 20, 23, 25];

export const SEW3_TOOLS: FormulaTool[] = [
  {
    slug: 'sleeve-cap-ease',
    icon: '👕',
    category: '재봉',
    fields: [
      { key: 'ah', term: 'armholeCirc', unit: 'cm', def: 46, min: 1 },
      { key: 'e', term: 'capEasePct', unit: 'percent', def: 8, min: 0, max: 20, step: 0.5 },
    ],
    formula: '{capLen} = {armholeCirc} × (1 + {capEasePct} ÷ 100),  {easeAmt} = {capLen} − {armholeCirc}',
    compute: v => {
      const cap = v.ah * (1 + v.e / 100);
      return [
        { term: 'capLen', unit: 'cm', value: round(cap, 1), digits: 1, primary: true },
        { term: 'easeAmt', unit: 'cm', value: round(cap - v.ah, 1), digits: 1 },
      ];
    },
    ko: { title: '소매산 이즈 계산기', desc: '암홀 둘레와 이즈 비율로 소매산 곡선 길이와 먹일 양을 구합니다.',
      long: '소매산은 암홀보다 길어야 어깨의 둥근 면을 덮습니다. 암홀 46cm에 8%면 소매산은 49.7cm이고, 3.7cm를 주름 없이 먹여 넣어야 합니다. 이 3.7cm를 고르게 펴는 것이 아니라 앞뒤 너치 사이의 위쪽 3분의 1에 대부분을 몰고, 겨드랑이 솔기에서 위로 3~4cm 구간에는 이즈를 넣지 않습니다 — 그 구간은 거의 직선이라 먹일 자리가 없습니다.',
      note: '비율은 천이 정합니다. 모직·플란넬은 다림질로 5cm까지 줄어들지만 코팅 면·타프타·가죽은 1cm만 넘어도 주름이 잡히고, 니트는 애초에 이즈를 넣지 않습니다(0~2%). 셔츠 소매는 평평하게 박으므로 2~3%면 충분하고, 정장 재킷은 어깨 패드가 받쳐 주므로 8~12%까지 갑니다. 암홀은 앞뒤 시접선을 따라 줄자를 세워서 재세요 — 시접 안쪽으로 재면 2cm가 짧게 나옵니다.' },
    en: { title: 'Sleeve Cap Ease Calculator', desc: 'Sleeve cap length and the ease to work in, from the armhole and a percentage.',
      long: 'A sleeve cap has to be longer than the armhole to cover the round of the shoulder. On a 46 cm armhole at 8%, the cap measures 49.7 cm and 3.7 cm has to disappear without a single pleat. That 3.7 cm is not spread evenly: most of it goes into the upper third between the front and back notches, and none into the 3–4 cm just above the underarm seam, where the curve is nearly straight and there is nowhere to put it.',
      note: 'The fabric sets the percentage. Wool and flannel will shrink 5 cm away under the iron, while coated cotton, taffeta and leather pucker past about 1 cm, and knits take none at all (0–2%). A flat-set shirt sleeve wants only 2–3%; a tailored jacket, with a pad behind it, takes 8–12%. Measure the armhole along the seam line with the tape standing on edge — running it inside the allowance reads about 2 cm short.' },
  },
  {
    slug: 'waistband-length',
    icon: '〰️',
    category: '재봉',
    fields: [
      { key: 'w', term: 'waistCm', unit: 'cm', def: 76, min: 20 },
      { key: 'e', term: 'easeCm', unit: 'cm', def: 2, min: 0, step: 0.5 },
      { key: 'ov', term: 'overlapLen', unit: 'cm', def: 3, min: 0, step: 0.5 },
      { key: 'sa', term: 'seamAllow', unit: 'cm', def: 1, min: 0, max: 5, step: 0.1 },
      { key: 'bw', term: 'bandWidth', unit: 'cm', def: 3.5, min: 0.5, step: 0.5 },
    ],
    formula: '{cutH} = {waistCm} + {easeCm} + {overlapLen} + 2 × {seamAllow},  {cutW} = 2 × {bandWidth} + 2 × {seamAllow}',
    compute: v => {
      const fin = v.w + v.e;
      return [
        { term: 'cutH', unit: 'cm', value: round(fin + v.ov + 2 * v.sa, 1), digits: 1, primary: true },
        { term: 'cutW', unit: 'cm', value: round(2 * v.bw + 2 * v.sa, 1), digits: 1 },
        { term: 'finishedCirc', unit: 'cm', value: round(fin, 1), digits: 1 },
      ];
    },
    ko: { title: '허리 밴드 길이 계산기', desc: '허리둘레와 여유·겹침·시접으로 밴드 재단 치수를 구합니다.',
      long: '허리 76cm에 여유 2cm를 더하면 완성 둘레 78cm입니다. 여기에 단추가 물릴 겹침 3cm와 양 끝 시접 1cm씩을 더해 83cm로 자릅니다. 폭은 접어서 두 겹으로 쓰므로 완성 폭 3.5cm의 두 배에 위아래 시접 1cm씩을 더해 9cm입니다 — 완성 폭 그대로 자르면 접을 것이 없습니다.',
      note: '겹침은 단추 지름이 아니라 단추 위치가 정합니다. 겹침 3cm에 단추를 끝에서 1.5cm에 두면 단추가 앞 중심에 옵니다. 여유 2cm는 앉았을 때 허리가 굵어지는 몫이라 바지·스커트에서는 빼지 마세요 — 바지에서 0을 넣으면 앉을 수 없습니다. 밴드에는 심지를 붙여야 허리가 접히지 않고, 심지는 완성 폭(3.5cm)에만 붙이고 시접에는 붙이지 않습니다. 니트 밴드는 이 계산이 아니라 늘림 비율로 잡습니다 — 허리보다 짧게 자르고 늘려 붙입니다.' },
    en: { title: 'Waistband Length Calculator', desc: 'Cut length and width for a waistband from the waist, ease, overlap and allowances.',
      long: 'A 76 cm waist plus 2 cm of ease finishes at 78 cm. Add a 3 cm overlap for the button to sit on and 1 cm of seam allowance at each end, and you cut 83 cm. The width is folded double, so it is twice the finished 3.5 cm plus 1 cm of allowance top and bottom: 9 cm. Cut it at the finished width and there is nothing left to fold.',
      note: 'The overlap is set by where the button goes, not by its diameter: with a 3 cm overlap and the button 1.5 cm in from the end, the button lands on centre front. The 2 cm of ease is what your waist gains when you sit down, so never take it to zero on trousers or a skirt. Interface the band or the waist will collapse — and interface only the finished 3.5 cm, not the seam allowances. A knit band is not this calculation at all: it is cut shorter than the waist and stretched to fit.' },
  },
  {
    slug: 'curved-hem-facing',
    icon: '🌀',
    category: '재봉',
    fields: [
      { key: 'hl', term: 'hemEdgeLen', unit: 'cm', def: 200, min: 1 },
      { key: 'r', term: 'radius', unit: 'cm', def: 60, min: 1 },
      { key: 'fw', term: 'facingW', unit: 'cm', def: 5, min: 0.5, step: 0.5 },
      { key: 'sa', term: 'seamAllow', unit: 'cm', def: 1, min: 0, max: 5, step: 0.1 },
    ],
    formula: '{innerEdgeLen} = {hemEdgeLen} × ({radius} − {facingW}) ÷ {radius},  {facingLen} = {hemEdgeLen} + 2 × {seamAllow}',
    compute: v => {
      // 호의 길이는 반지름에 비례한다 — 안단을 접어 올리면 자유 변이 더 작은 원에 놓인다
      const inner = Math.max(0, v.hl * ratio(v.r - v.fw, v.r));
      return [
        { term: 'facingLen', unit: 'cm', value: round(v.hl + 2 * v.sa, 1), digits: 1, primary: true },
        { term: 'innerEdgeLen', unit: 'cm', value: round(inner, 1), digits: 1 },
        { term: 'diff', unit: 'cm', value: round(v.hl - inner, 1), digits: 1 },
      ];
    },
    ko: { title: '곡선 밑단 안단 계산기', desc: '밑단 곡선과 안단 폭으로 안단 길이와 남는 양을 구합니다.',
      long: '곡선 밑단은 반지름 60cm인 원의 일부이고 그 호가 200cm라면, 5cm 폭 안단을 접어 올렸을 때 자유 변은 반지름 55cm 자리에 놓입니다. 호의 길이는 반지름에 비례하므로 200 × 55 ÷ 60 = 183.3cm면 됩니다. 곧은 띠 200cm를 붙이면 16.7cm가 남아 안쪽에서 주름이 잡힙니다. 안단 자체는 이어 붙일 시접 1cm씩을 더해 202cm로 준비합니다.',
      note: '해법은 셋입니다. 안단을 곧은 띠가 아니라 같은 곡선(도넛 모양)으로 재단하면 정확히 맞습니다. 바이어스 테이프를 쓰면 다림질로 안쪽을 줄이며 붙일 수 있어 좁은 폭에서는 이 방법이 제일 빠릅니다. 아니면 안단 폭을 줄이세요 — 남는 양은 폭에 비례하므로 5cm에서 16.7cm였던 것이 1cm에서는 3.3cm로 줄어들고, A라인 스커트 밑단을 1cm 이하로 좁게 접는 관행이 여기서 나옵니다. 반지름은 원형 스커트라면 둘레 ÷ 2π로, 아니면 밑단 곡선에 원을 대 보고 재세요.' },
    en: { title: 'Curved Hem Facing Calculator', desc: 'Facing strip length for a curved hem, and the excess the curve leaves.',
      long: 'A curved hem is part of a circle. If that circle has a 60 cm radius and the hem arc is 200 cm, turning a 5 cm facing up puts its free edge on a 55 cm radius. Arc length scales with radius, so the free edge only needs 200 × 55 ÷ 60 = 183.3 cm. Apply a straight 200 cm strip and 16.7 cm has nowhere to go but into ripples on the inside. The strip itself is cut at 202 cm, with 1 cm at each end to join it.',
      note: 'There are three fixes. Cut the facing as the same curve — a doughnut, not a straight strip — and it fits exactly. Use bias tape and you can shrink its inner edge under the iron as you go, which is the fastest route at narrow widths. Or make the facing narrower: the excess scales with the width, so the 16.7 cm at 5 cm becomes 3.3 cm at 1 cm, which is exactly why A-line skirt hems are traditionally turned under 1 cm or less. Get the radius from circumference ÷ 2π on a circle skirt, or by fitting a circle against the hem curve.' },
  },
  {
    slug: 'buttonhole-size',
    icon: '👔',
    category: '재봉',
    fields: [
      { key: 'd', term: 'buttonD', unit: 'cm', def: 1.5, min: 0.1, step: 0.1 },
      { key: 'th', term: 'buttonThick', unit: 'cm', def: 0.3, min: 0, step: 0.1 },
      { key: 'ea', term: 'holeEase', unit: 'cm', def: 0.3, min: 0, max: 1, step: 0.1 },
    ],
    formula: '{holeLen} = {buttonD} + {buttonThick} + {holeEase},  {ballHoleLen} = π × {buttonD} ÷ 2',
    compute: v => [
      { term: 'holeLen', unit: 'cm', value: round(v.d + v.th + v.ea, 2), digits: 2, primary: true },
      { term: 'ballHoleLen', unit: 'cm', value: round(Math.PI * v.d / 2, 2), digits: 2 },
    ],
    ko: { title: '단추 구멍 크기 계산기', desc: '단추 지름과 두께로 단추 구멍 길이를 구합니다.',
      long: '단추는 구멍을 비스듬히 통과하므로 지름만으로는 안 들어갑니다. 지름 1.5cm에 두께 0.3cm면 1.8cm이고, 여유 0.3cm를 더해 2.1cm로 박습니다. 두께를 빼먹는 것이 가장 흔한 실수입니다 — 얇은 셔츠 단추는 0.15cm라 차이가 안 보이지만 코트 단추는 0.5cm를 넘어 구멍이 통째로 모자랍니다. 둥근 단추는 지름이 아니라 반 둘레가 기준이라 π × 1.5 ÷ 2 = 2.36cm가 필요합니다.',
      note: '재봉틀의 자동 단추 구멍 발은 단추를 끼워 길이를 스스로 정하는데, 그 값은 두께를 포함한 실물 기준이라 위 계산과 대체로 맞습니다. 그래도 반드시 같은 천 조각에 시험해 보세요 — 심지와 겹수에 따라 0.2cm씩 달라집니다. 가로 구멍은 앞 중심에서 옷단 쪽으로 0.2~0.3cm 넘겨 시작해야 단추가 잠긴 뒤 앞 중심에 앉습니다 — 단추가 구멍 안에서 옷단 쪽 끝으로 끌려가기 때문입니다. 니트는 구멍이 늘어나므로 계산값보다 0.2cm 짧게 잡고, 자수용 심지를 뒤에 붙이세요.' },
    en: { title: 'Buttonhole Size Calculator', desc: 'Buttonhole length from a button\'s diameter and its thickness.',
      long: 'A button passes through on edge, so its diameter alone will not fit. A 1.5 cm button 0.3 cm thick needs 1.8 cm, plus 0.3 cm of ease, so you stitch 2.1 cm. Forgetting the thickness is the classic error: on a thin shirt button at 0.15 cm nobody notices, but a coat button can be over 0.5 cm thick and the hole comes out plainly too small. A ball button is governed by half its circumference instead: π × 1.5 ÷ 2 = 2.36 cm.',
      note: 'An automatic buttonhole foot measures the real button, thickness included, so it usually lands close to this figure. Test it on a scrap of the same fabric anyway — interfacing and the number of layers move it by a couple of millimetres. A horizontal buttonhole should start 2–3 mm past centre front towards the edge, because the fastened button is pulled to that end of the hole and has to end up on centre front. On knits, cut 2 mm shorter than calculated and back the area with interfacing, because the opening stretches.' },
  },
  {
    slug: 'interfacing-yardage',
    icon: '🧻',
    category: '재봉',
    fields: [
      { key: 'a', term: 'interfacedArea', unit: 'cm2', def: 3000, min: 0, step: 10 },
      { key: 'fw', term: 'fusibleW', unit: 'cm', def: 90, min: 1 },
      { key: 'sp', term: 'spare', unit: 'percent', def: 25, min: 0, max: 100 },
    ],
    formula: '{fusibleLen} = {interfacedArea} × (1 + {spare} ÷ 100) ÷ {fusibleW}',
    compute: v => {
      const bare = ratio(v.a, v.fw);
      const need = ratio(v.a * (1 + v.sp / 100), v.fw);
      return [
        { term: 'fusibleLen', unit: 'cm', value: round(need, 1), digits: 1, primary: true },
        { term: 'extraNeeded', unit: 'cm', value: round(need - bare, 1), digits: 1 },
      ];
    },
    ko: { title: '심지 소요량 계산기', desc: '심지를 붙일 면적과 심지 폭으로 사야 할 심지 길이를 구합니다.',
      long: '심지가 들어가는 조각을 다 더합니다 — 셔츠라면 칼라 두 장, 칼라 밴드 두 장, 커프스 두 장, 앞단 두 줄로 대략 3,000㎠(0.3㎡)입니다. 90cm 폭 심지에서는 3,000 ÷ 90 = 33.3cm면 되지만, 조각이 사각형이 아니라 빈틈이 남으므로 25%를 얹어 41.7cm를 삽니다. 8.3cm가 자투리로 나가는 몫입니다.',
      note: '면적으로 나누는 계산은 언제나 조금 낙관적입니다 — 칼라처럼 곡선인 조각은 사각형으로 잘라 놓고 다듬으므로 실제로는 조각을 배치해 봐야 정확합니다. 접착 심지는 다리면 2~3% 줄어들기 때문에 조각보다 크게 잘라 붙이고 나서 다듬는 것(블록 퓨징)이 안전합니다. 원단 방향도 맞추세요 — 심지에도 결이 있어서 90도로 붙이면 칼라가 한쪽으로 휩니다. 편물 심지와 직물 심지는 폭이 달라(대개 90cm와 112cm) 같은 면적에서 사는 길이가 20% 이상 벌어집니다.' },
    en: { title: 'Interfacing Yardage Calculator', desc: 'How much interfacing to buy from the area to be interfaced and its width.',
      long: 'Add up every piece that gets interfaced — on a shirt that is two collar pieces, two collar stands, two cuffs and two front bands, roughly 3,000 cm² (0.3 m²). On 90 cm interfacing, 3,000 ÷ 90 = 33.3 cm would do it, but the pieces are not rectangles and leave gaps, so 25% on top makes it 41.7 cm. The 8.3 cm difference is what ends up as offcuts.',
      note: 'Dividing by area is always slightly optimistic: curved pieces like collars are cut from squares and trimmed, so only laying the pieces out gives the true figure. Fusible interfacing also shrinks 2–3% under the iron, which is why block-fusing — pressing an oversized piece and cutting after — is the safer order. Match the grain as well: interfacing has one, and applying it crossways makes a collar twist. Knit and woven interfacings come in different widths, commonly 90 cm and 112 cm, so the same area can differ by more than 20% in what you buy.' },
  },
  {
    slug: 'french-seam-allowance',
    icon: '🪡',
    category: '재봉',
    fields: [
      { key: 'p1', term: 'firstPass', unit: 'cm', def: 0.6, min: 0.1, max: 3, step: 0.1 },
      { key: 'p2', term: 'secondPass', unit: 'cm', def: 0.9, min: 0.1, max: 3, step: 0.1 },
    ],
    formula: '{seamAllow} = {firstPass} + {secondPass},  {trimTo} = {secondPass} − 0.3',
    compute: v => [
      { term: 'seamAllow', unit: 'cm', value: round(v.p1 + v.p2, 2), digits: 2, primary: true },
      { term: 'trimTo', unit: 'cm', value: round(Math.max(0, v.p2 - 0.3), 2), digits: 2 },
    ],
    ko: { title: '통솔(프렌치 심) 시접 계산기',
      desc: '1차·2차 박음 폭으로 통솔에 필요한 시접을 구합니다.',
      long: '통솔은 겉끼리 반대로 놓고 한 번 박은 뒤, 뒤집어 그 솔기를 감싸며 다시 박는 마감입니다. 두 번째 박음선은 첫 솔기에서 재므로 원래 자른 끝에서 보면 두 박음 폭의 합만큼 들어옵니다 — 0.6 + 0.9 = 1.5cm입니다. 도안이 주는 1.5cm 시접이 그대로 통솔이 되는 것이 여기서 나옵니다. 1차를 박고 나면 시접을 0.6cm로 다듬어야 2차 박음선(0.9cm) 안쪽으로 0.3cm 여유를 두고 숨습니다.',
      note: '다듬는 폭이 2차 박음 폭보다 크면 잘린 실이 솔기 밖으로 삐져나옵니다 — 통솔에서 실패하는 지점은 거의 항상 여기입니다. 반대로 너무 좁게 다듬으면 얇은 천에서 올이 풀려 솔기가 빠집니다. 통솔은 곡선에서 접히므로 소매 암홀처럼 굽은 솔기에는 쓰기 어렵고, 두꺼운 천에서는 솔기가 네 겹으로 쌓여 두둑해집니다 — 시폰·론·거즈처럼 얇고 잘 풀리는 천이 통솔의 자리입니다.' },
    en: { title: 'French Seam Allowance Calculator', desc: 'The allowance a French seam needs, from its two passes.',
      long: 'A French seam is sewn once with the right sides out, then turned and sewn again so the first seam is enclosed. The second line is measured from the first seam, so from the original cut edge the finished seam sits at the sum of the two passes: 0.6 + 0.9 = 1.5 cm. That is why the 1.5 cm allowance printed on most patterns converts straight into a French seam. After the first pass you trim the allowance to 0.6 cm, which leaves 0.3 cm of clearance inside the 0.9 cm second pass.',
      note: 'Trim wider than the second pass and cut threads whisker out through the finished seam — that is where French seams nearly always fail. Trim too narrow and a fine fabric frays until the seam pulls out. A French seam also has to fold along its length, which makes it awkward on a curve such as a sleeve head, and in heavy cloth it stacks four layers into a ridge. Chiffon, lawn and gauze — light and fray-prone — are where it belongs.' },
  },
  {
    slug: 'zip-fly-length',
    icon: '⛓️',
    category: '재봉',
    fields: [
      { key: 'fr', term: 'frontRise', unit: 'cm', def: 26, min: 5 },
      { key: 'bw', term: 'bandWidth', unit: 'cm', def: 3.5, min: 0, step: 0.5 },
      { key: 'sh', term: 'flySharePct', unit: 'percent', def: 70, min: 10, max: 100 },
    ],
    formula: '{flyLen} = ({frontRise} − {bandWidth}) × {flySharePct} ÷ 100',
    compute: v => {
      const open = Math.max(0, v.fr - v.bw) * v.sh / 100;
      // 파는 사이즈 가운데 가장 가까운 것 — 트임은 지퍼 길이에 맞춰 박는다
      const zip = open > 0 ? FLY_ZIPS.reduce((a, b) => (Math.abs(b - open) < Math.abs(a - open) ? b : a)) : 0;
      return [
        { term: 'flyLen', unit: 'cm', value: round(open, 1), digits: 1, primary: true },
        { term: 'zipperLen', unit: 'cm', value: zip, digits: 0 },
      ];
    },
    ko: { title: '바지 지퍼 트임 길이 계산기', desc: '앞 밑위 길이와 밴드 폭으로 지퍼 트임과 지퍼 사이즈를 구합니다.',
      long: '앞 밑위 26cm에서 허리 밴드 3.5cm를 빼면 밴드 아래로 22.5cm가 남습니다. 트임은 그중 위쪽 70%인 15.8cm이고, 아래 30%는 가랑이 곡선이라 트임이 지나갈 수 없습니다. 파는 사이즈는 10 · 12 · 15 · 18 · 20 · 23 · 25cm이므로 가장 가까운 15cm를 씁니다 — 트임을 지퍼에 맞춰 박으면 되니 딱 맞는 사이즈는 필요하지 않습니다.',
      note: '앞 밑위는 앞 중심선을 따라 허리선에서 가랑이점까지 재고, 뒤 밑위(더 긴 쪽)와 섞지 마세요. 비율은 옷에 따라 다릅니다 — 청바지·로우라이즈는 65~70%, 하이웨이스트 슬랙스는 55~60%로 잡아야 트임 끝이 배꼽 위까지 올라오지 않습니다. 지퍼가 계산값보다 길면 코일 지퍼는 아래를 잘라 실로 새 멈춤을 만들 수 있지만, 금속·비슬론은 이빨을 자르면 슬라이더가 빠집니다. 트임 아래 끝은 반드시 되박음이나 바텍으로 막으세요 — 앉을 때 힘이 그 한 점에 몰립니다.' },
    en: { title: 'Fly Zipper Length Calculator', desc: 'Fly opening length and the zip size to buy, from the front rise.',
      long: 'Take the 3.5 cm waistband off a 26 cm front rise and 22.5 cm is left below the band. The fly takes the top 70% of that — 15.8 cm — because the bottom 30% is the crotch curve, where an opening cannot go. Stock sizes step 10 · 12 · 15 · 18 · 20 · 23 · 25 cm, so the 15 is the one to buy: the topstitching is set to the zip, so you do not need an exact match.',
      note: 'Measure the front rise down the centre front from the waist seam to the crotch point, and do not confuse it with the back rise, which is longer. The share varies by garment: 65–70% on jeans and low-rise trousers, 55–60% on high-waisted slacks, or the opening reaches above the navel. If the zip is longer than the calculation, a coil zip can be shortened from the bottom with a hand-sewn stop, but cutting the teeth off a metal or Vislon zip releases the slider. Always bar-tack or backstitch the bottom of the opening — sitting down puts the whole load on that one point.' },
  },
  {
    slug: 'bust-dart-rotation',
    icon: '🔻',
    category: '재봉',
    fields: [
      { key: 'it', term: 'dartIntake', unit: 'cm', def: 5, min: 0, step: 0.1 },
      { key: 'ad', term: 'apexDist', unit: 'cm', def: 12, min: 0, step: 0.5 },
      { key: 'ah', term: 'apexToHem', unit: 'cm', def: 30, min: 0 },
    ],
    formula: '{rotationDeg} = 2 × asin({dartIntake} ÷ 2 ÷ {apexDist}),  {hemSwing} = {rotationDeg} × π ÷ 180 × {apexToHem}',
    compute: v => {
      // 다트 두 다리가 꼭짓점에서 벌리는 각 — 집는 양이 현, 다트 길이가 반지름이다
      const sin = Math.min(1, Math.max(0, ratio(v.it / 2, v.ad)));
      const rad = 2 * Math.asin(sin);
      return [
        { term: 'rotationDeg', unit: 'deg', value: round(rad * 180 / Math.PI, 1), digits: 1, primary: true },
        { term: 'hemSwing', unit: 'cm', value: round(rad * v.ah, 1), digits: 1 },
      ];
    },
    ko: { title: '가슴 다트 회전 계산기', desc: '다트 분량과 다트 길이로 다트를 돌릴 각도와 밑단 벌어짐을 구합니다.',
      long: '다트는 꼭짓점을 중심으로 종이를 접는 것이라 각도로 다룰 수 있습니다. 집는 양 5cm가 현이고 꼭짓점까지 12cm가 반지름이면 2 × asin(2.5 ÷ 12) = 24.0도입니다. 이 각도는 다트를 어디로 옮겨도 변하지 않습니다 — 옆선 다트를 닫고 허리 다트를 열든, 어깨나 목선으로 옮기든 같은 24.0도가 이동합니다. 꼭짓점에서 밑단까지 30cm라면 다트를 옮길 때 밑단이 0.42rad × 30 = 12.6cm 벌어집니다.',
      note: '같은 각도라도 집는 양은 다트 길이에 따라 달라집니다 — 24.0도를 꼭짓점 6cm 자리에서 집으면 2.5cm뿐입니다. 그래서 "다트 분량 5cm"를 다른 자리에 그대로 옮기면 각도가 두 배가 되어 가슴이 뾰루지처럼 솟습니다. 꼭짓점은 가슴점(BP)에 정확히 두지 않고 1.5~2cm 앞에서 멈추세요 — 점에 닿으면 원뿔의 꼭대기가 생깁니다. 각도가 30도를 넘으면 다트 하나로 감당하기 어려우니 두 개로 갈라 나란히 두거나 프린세스 라인으로 바꾸세요. 종이로 실제로 돌려 보는 것이 이 계산보다 언제나 정확합니다.' },
    en: { title: 'Bust Dart Rotation Calculator', desc: 'The angle a dart represents, and how far the hem swings when you rotate it.',
      long: 'A dart is a fold of paper about its point, so it can be handled as an angle. With a 5 cm intake as the chord and 12 cm to the apex as the radius, that is 2 × asin(2.5 ÷ 12) = 24.0°. The angle does not change wherever you move it: close the side dart and open a waist dart, or move it to the shoulder or the neckline, and the same 24.0° travels. With 30 cm from apex to hem, rotating the dart swings the hem open by 0.42 rad × 30 = 12.6 cm.',
      note: 'The same angle means different intakes at different lengths — 24.0° taken 6 cm from the apex is only 2.5 cm. So copying "a 5 cm dart" to another position doubles the angle and makes the bust point out like a cone. Stop the dart point 1.5–2 cm short of the bust point rather than on it, or you build that cone deliberately. Past about 30° a single dart cannot swallow the shaping: split it into two side by side, or convert to a princess seam. Actually rotating the paper is always more reliable than the arithmetic.' },
  },
  {
    slug: 'grainline-shrink-adjust',
    icon: '🧺',
    category: '재봉',
    fields: [
      { key: 'len', term: 'finishedLen', unit: 'cm', def: 100, min: 1 },
      { key: 'w', term: 'targetWidth', unit: 'cm', def: 50, min: 1 },
      { key: 'sl', term: 'shrinkLenPct', unit: 'percent', def: 5, min: 0, max: 30, step: 0.5 },
      { key: 'sc', term: 'shrinkCrossPct', unit: 'percent', def: 3, min: 0, max: 30, step: 0.5 },
    ],
    formula: '{cutH} = {finishedLen} ÷ (1 − {shrinkLenPct} ÷ 100),  {cutW} = {targetWidth} ÷ (1 − {shrinkCrossPct} ÷ 100)',
    compute: v => {
      const h = ratio(v.len, 1 - v.sl / 100);
      const w = ratio(v.w, 1 - v.sc / 100);
      return [
        { term: 'cutH', unit: 'cm', value: round(h, 1), digits: 1, primary: true },
        { term: 'cutW', unit: 'cm', value: round(w, 1), digits: 1 },
        { term: 'extraNeeded', unit: 'cm', value: round(h - v.len, 1), digits: 1 },
      ];
    },
    ko: { title: '결 방향 수축 보정 계산기', desc: '길이·폭 방향 수축률을 따로 넣어 조각의 재단 치수를 구합니다.',
      long: '수축은 두 방향이 다릅니다. 길이(날실) 방향 5%, 폭(씨실) 방향 3%인 천에서 완성 100 × 50cm 조각을 얻으려면 100 ÷ 0.95 = 105.3cm, 50 ÷ 0.97 = 51.5cm로 잘라야 합니다. 길이에서 5.3cm가 세탁으로 사라지는데, 5%를 그냥 더해 105cm로 잡으면 조금 모자랍니다 — 더하는 것이 아니라 나누는 것이 맞습니다.',
      note: '대개 길이 방향이 더 많이 줄어듭니다. 직조·염색 공정에서 날실을 당겨 놓기 때문이고, 데님은 길이 3~10%에 폭 1~2%로 갈립니다. 이 계산은 어쩔 수 없이 미리 세탁하지 못하는 경우(니트 원단이 감겨 온 그대로 재단해야 하는 등)의 임시 방편입니다 — 재단 전에 물에 넣어 줄여 두면 이 보정 자체가 필요 없고 그것이 언제나 더 정확합니다. 여러 번 줄어드는 천도 있어서 세 번째 세탁까지 조금씩 더 줄어드니, 한 번 세탁한 수축률만 믿으면 옷이 두 번째 세탁에서 또 짧아집니다.' },
    en: { title: 'Grainline Shrinkage Adjustment Calculator', desc: 'Cut sizes when lengthwise and crosswise shrinkage differ.',
      long: 'Shrinkage is not the same in both directions. On a fabric losing 5% lengthwise (warp) and 3% crosswise (weft), a piece that has to finish at 100 × 50 cm is cut at 100 ÷ 0.95 = 105.3 cm by 50 ÷ 0.97 = 51.5 cm. That is 5.3 cm going into the wash lengthwise — and adding 5% instead, for 105 cm, comes out slightly short. The correct operation is to divide, not to add.',
      note: 'The lengthwise figure is usually the bigger one, because weaving and finishing hold the warp under tension; denim often splits 3–10% lengthwise against 1–2% across. Treat this as the fallback for fabric you genuinely cannot pre-wash, such as a knit that has to be cut as it comes off the roll. Washing before cutting removes the guesswork and is always more accurate. Some fabrics also keep shrinking into the second and third wash, so trusting a single wash test can leave the garment shorter again later.' },
  },
  {
    slug: 'thread-cone-yield',
    icon: '🧵',
    category: '재봉',
    fields: [
      { key: 'cl', term: 'coneLen', unit: 'm', def: 5000, min: 1 },
      { key: 'tp', term: 'threadPerItem', unit: 'm', def: 60, min: 0.1, step: 0.5 },
      { key: 'rs', term: 'runSize', unit: 'ea', def: 120, min: 0, step: 1 },
    ],
    formula: '{itemsPerCone} = ⌊{coneLen} ÷ {threadPerItem}⌋,  {conesNeeded} = ⌈{runSize} × {threadPerItem} ÷ {coneLen}⌉',
    compute: v => {
      const per = Math.floor(ratio(v.cl, v.tp));
      const cones = Math.ceil(ratio(v.rs * v.tp, v.cl));
      return [
        { term: 'itemsPerCone', unit: 'ea', value: per, digits: 0, primary: true },
        { term: 'conesNeeded', unit: 'cone', value: cones, digits: 0 },
        { term: 'remaining', unit: 'm', value: round(Math.max(0, cones * v.cl - v.rs * v.tp), 0), digits: 0 },
      ];
    },
    ko: { title: '재봉실 콘 개수 계산기', desc: '콘 하나의 길이와 한 벌에 드는 실로 만들 수 있는 벌 수를 구합니다.',
      long: '5,000m 콘에서 한 벌에 60m가 드는 옷이면 83벌이 나옵니다(83.3벌이지만 벌은 쪼갤 수 없어 내림). 120벌을 만들려면 7,200m가 필요하므로 콘 두 개를 사고 2,800m가 남습니다. 한 벌에 드는 실은 솔기 길이 × 배수로 구합니다 — 티셔츠 한 장은 오버로크가 많아 60~120m, 셔츠 한 장은 본봉이 많아 100~150m입니다.',
      note: '콘 하나로 다 못 만든다면 색깔이 문제입니다. 염색 로트가 갈리면 같은 번호라도 미세하게 다르고, 한 벌 안에서 콘이 바뀌면 솔기 색이 어긋나 보입니다 — 그래서 실은 벌 수가 아니라 로트 단위로 넉넉히 사 둡니다. 오버로크는 바늘·루퍼가 3~4개라 실이 동시에 여러 콘에서 나가므로 한 대에 같은 색 콘을 세 개 이상 놓아야 하고, 그 셈은 이 값을 3~4로 곱한 것이 아니라 이미 한 벌 소요에 들어 있습니다. 콘의 마지막 몇십 미터는 감김이 헐거워 장력이 흔들리니 계산에 넣지 마세요.' },
    en: { title: 'Thread Cone Yield Calculator', desc: 'Garments one cone will sew, and how many cones a production run takes.',
      long: 'A 5,000 m cone at 60 m per garment yields 83 garments — 83.3, rounded down, because you cannot sell a part-sewn one. A run of 120 needs 7,200 m, so you buy two cones and 2,800 m is left. Get the metres per garment from seam length × the thread ratio: a t-shirt, mostly overlocked, runs 60–120 m, while a shirt, mostly lockstitch, runs 100–150 m.',
      note: 'When one cone will not cover the run, colour is the real constraint. Dye lots differ slightly even under the same number, and changing cone mid-garment shows as mismatched seams — which is why thread is bought by the lot rather than by the garment. An overlocker also feeds three or four cones at once, so a machine needs that many cones of the same colour standing by; that is not this answer multiplied by three, because the per-garment figure already counts all of those threads. Leave the last few dozen metres of a cone out of the plan: the winding goes loose and the tension wanders.' },
  },
  {
    slug: 'full-bust-adjustment',
    icon: '🎽',
    category: '재봉',
    fields: [
      { key: 'fb', term: 'fullBust', unit: 'cm', def: 104, min: 40 },
      { key: 'pb', term: 'patternBust', unit: 'cm', def: 92, min: 40 },
    ],
    formula: '{fbaTotal} = {fullBust} − {patternBust},  {fbaPerPiece} = {fbaTotal} ÷ 4',
    compute: v => {
      const total = v.fb - v.pb;
      return [
        { term: 'fbaPerPiece', unit: 'cm', value: round(total / 4, 2), digits: 2, primary: true },
        { term: 'fbaTotal', unit: 'cm', value: round(total, 1), digits: 1 },
      ];
    },
    ko: { title: '가슴 여유 보정(FBA) 계산기', desc: '실제 가슴둘레와 도안 사이즈의 차이를 조각에 벌릴 양으로 바꿉니다.',
      long: '윗가슴으로 사이즈를 고르면 도안의 가슴둘레가 실제보다 작습니다. 실제 104cm, 그 사이즈의 도안 가슴둘레 92cm면 차이는 12cm입니다. 그런데 앞판은 접어서 자르므로 한 장이 몸 둘레의 4분의 1이고, 벌릴 양은 12 ÷ 4 = 3cm입니다. 다트 분량도 같은 3cm가 늘어납니다. 12cm를 그대로 벌리면 네 배 큰 옷이 나옵니다.',
      note: '도안 가슴둘레는 사이즈 표의 몸 치수여야 합니다 — 완성 가슴둘레(finished bust)를 넣으면 디자인 여유가 이미 들어 있어 보정이 통째로 사라지거나 옷이 헐렁해집니다. 차이가 음수면 FBA가 아니라 반대인 SBA(줄이는 보정)이고 같은 값을 접어 넣습니다. 차이가 2.5cm 이하면 대개 보정하지 않고 넘어갑니다 — 그 정도는 다림질과 착용 여유가 먹습니다. 앞판이 접힘 없이 두 장으로 나뉜 도안(프린세스 라인·앞 중심 솔기)은 조각이 앞의 절반이므로 12 ÷ 2 = 6cm를 한 장에 나눠 넣습니다.' },
    en: { title: 'Full Bust Adjustment (FBA) Calculator', desc: 'How far to spread a pattern piece from the gap between your bust and the pattern\'s.',
      long: 'Choosing a size by high bust leaves the pattern\'s bust smaller than yours. At a 104 cm full bust against a 92 cm pattern bust, the gap is 12 cm. But a front cut on the fold is a quarter of the body, so the spread on the piece is 12 ÷ 4 = 3 cm, and the dart intake grows by the same 3 cm. Spread the full 12 cm and the garment comes out four times too big.',
      note: 'The pattern bust has to be the body measurement from the size chart, not the finished bust — the finished figure already contains design ease, so using it either erases the adjustment or leaves the top swimming. A negative gap is not an FBA but its opposite, an SBA, folded out by the same amount. Under about 2.5 cm most sewists skip the adjustment entirely; pressing and wearing ease absorb that much. On a pattern whose front is two pieces rather than cut on the fold — a princess line or a centre-front seam — each piece is half the front, so 12 ÷ 2 = 6 cm is distributed across it.' },
  },
  {
    slug: 'piping-strip-width',
    icon: '⭕',
    category: '재봉',
    fields: [
      { key: 'cd', term: 'cordD', unit: 'mm', def: 5, min: 0.5, step: 0.5 },
      { key: 'sa', term: 'seamAllow', unit: 'cm', def: 1, min: 0, max: 5, step: 0.1 },
      { key: 'sl', term: 'seamLen', unit: 'cm', def: 200, min: 0 },
    ],
    formula: '{stripW} = π × {cordD} ÷ 10 + 2 × {seamAllow},  {bindingLen} = {seamLen} × 1.1',
    compute: v => {
      // 띠가 코드를 한 바퀴 감싸고 두 끝이 시접으로 남는다 — 감싸는 몫은 지름이 아니라 둘레다
      const w = Math.PI * (v.cd / 10) + 2 * v.sa;
      const len = v.sl * 1.1;
      return [
        { term: 'stripW', unit: 'cm', value: round(w, 2), digits: 2, primary: true },
        { term: 'bindingLen', unit: 'cm', value: round(len, 1), digits: 1 },
        { term: 'cordLen', unit: 'cm', value: Math.ceil(len / 100) * 100, digits: 0 },
      ];
    },
    ko: { title: '파이핑 스트립 폭 계산기', desc: '코드 지름과 시접으로 파이핑용 바이어스 띠의 폭을 구합니다.',
      long: '띠는 코드를 한 바퀴 감싸므로 필요한 폭은 지름이 아니라 둘레입니다. 5mm 코드의 둘레는 π × 0.5 = 1.57cm이고, 양쪽에 시접 1cm씩을 더해 3.57cm 폭으로 자릅니다 — 인치로 파는 도안이 1/8인치 코드에 1/2인치 시접으로 1.5인치(3.8cm) 띠를 시키는 것과 거의 같은 폭입니다. 길이는 붙일 솔기 200cm에 이음과 모서리 몫 10%를 더해 220cm, 코드는 미터로 파니 3m를 삽니다.',
      note: '띠는 반드시 바이어스(45도)로 자르세요. 곧게 자른 띠는 곡선과 모서리에서 접히고, 파이핑이 들어가는 자리는 대개 곡선입니다. 필요한 바이어스 길이를 정사각형 크기로 바꾸는 것은 바이어스 테이프 계산기가 합니다. 코드가 굵어지면 시접보다 감싸는 몫이 커지므로 폭을 다시 계산해야 하고, 미리 만들어 파는 파이핑을 쓸 때는 그 플랜지(시접) 폭이 내 도안 시접과 같은지 확인하세요 — 다르면 파이핑이 솔기에서 보이는 굵기가 달라집니다. 세탁하면 면 코드가 줄어드니 코드도 미리 물에 담가 두는 편이 안전합니다.' },
    en: { title: 'Piping Strip Width Calculator', desc: 'How wide to cut the bias strip for a given piping cord.',
      long: 'The strip wraps all the way round the cord, so what it has to cover is the circumference, not the diameter. A 5 mm cord measures π × 0.5 = 1.57 cm around, and with 1 cm of seam allowance on each side you cut a 3.57 cm strip — near enough the imperial rule of a 1.5 in (3.8 cm) strip for 1/8 in cord at a 1/2 in allowance. For length, a 200 cm seam plus 10% for joins and corners is 220 cm, and since cord is sold by the metre you buy 3 m.',
      note: 'Cut the strip on the bias at 45°. A straight-grain strip kinks on curves and corners, and piping is almost always going somewhere curved. Turning a required bias length into a square of fabric is the bias binding calculator\'s job. As the cord gets fatter the wrapping share outgrows the allowance, so recalculate rather than reusing an old width. If you buy ready-made piping, check that its flange matches your pattern\'s seam allowance — if it does not, the visible thickness at the seam changes. Cotton cord shrinks, so pre-wash the cord as well as the fabric.' },
  },
];
