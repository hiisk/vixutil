/**
 * 공예 섹션 — 재봉 추가 8종
 *
 * 첫 여덟 개가 "천을 얼마나 사는가"였다면 여기는 "그 천이 어디로 사라지는가"다.
 * 재봉에서 원단은 세 가지 방식으로 없어진다 — 접히고(밑단·시접), 겹치고(주름),
 * 집힌다(다트). 세 가지 모두 완성 치수에는 안 보이지만 재단 치수에는 반드시
 * 들어가야 하고, 대개 한 자리에 두 번 이상 들어간다. 밑단은 접는 횟수만큼,
 * 주름은 깊이의 두 배씩, 다트는 중심선 좌우로 절반씩이다.
 *
 * 부속은 파는 규격이 따로 있다. 지퍼는 5cm 단위가 아니라 정해진 사이즈로만
 * 나오므로 계산값을 그 사다리에 올려 놓아야 살 수 있는 숫자가 된다 — 나눗셈
 * 결과를 그대로 적으면 가게에 없는 물건이 된다.
 *
 * 마지막 하나는 만든 것을 파는 쪽이다. 라벨을 직접 인쇄하는 사람에게 한 장에서
 * 몇 개가 나오는지는 원가와 바로 이어진다. 이때 여백과 간격은 라벨 크기보다
 * 답을 크게 흔든다 — 나누기 전에 여백을 먼저 빼야 한다.
 */
import type { FormulaTool } from '../formula/types.ts';
import { ratio } from '../formula/types.ts';
import { round } from '../formula/num.ts';

/** 시중에 파는 지퍼 길이(cm). 이 사다리 위로 올려야 살 수 있는 숫자가 된다 */
const ZIP_SIZES = [10, 12, 15, 18, 20, 23, 25, 30, 35, 40, 45, 50, 55, 60, 70, 80, 90];

export const SEW2_TOOLS: FormulaTool[] = [
  {
    slug: 'zipper-length',
    icon: '⛓️',
    category: '재봉',
    fields: [
      { key: 'open', term: 'openingLen', unit: 'cm', def: 22, min: 1 },
      { key: 'allow', term: 'zipAllow', unit: 'cm', def: 2, min: 0, max: 10, step: 0.5 },
    ],
    formula: '{totalLen} = {openingLen} + {zipAllow},  {zipperLen} ≥ {totalLen} (10 · 12 · 15 · 18 · 20 · 23 · 25 · 30 · 35 · 40 · 45 · 50 cm)',
    compute: v => {
      const need = v.open + v.allow;
      const size = need > 0 ? (ZIP_SIZES.find(s => s >= need) ?? Math.ceil(need / 10) * 10) : 0;
      return [
        { term: 'zipperLen', unit: 'cm', value: size, digits: 0, primary: true },
        { term: 'totalLen', unit: 'cm', value: round(need, 1), digits: 1 },
      ];
    },
    ko: { title: '지퍼 길이 계산기', desc: '트임 길이와 여유로 사야 할 지퍼 사이즈를 구합니다.',
      long: '트임 22cm에 위아래 여유 2cm를 더하면 24cm가 필요합니다. 그런데 24cm 지퍼는 팔지 않습니다 — 시중 규격은 10 · 12 · 15 · 18 · 20 · 23 · 25 · 30 · 35 · 40 · 45 · 50 · 55 · 60 · 70 · 80 · 90cm로 뛰므로 25cm를 사야 합니다. 인치로 파는 곳은 4 · 5 · 7 · 9 · 12 · 14 · 16 · 18 · 20 · 22 · 24인치입니다.',
      note: '표시 길이는 슬라이더가 움직이는 구간(이빨) 기준이고 테이프는 위아래로 더 있습니다. 긴 것을 사서 자르는 방법은 코일 지퍼에서만 통합니다 — 금속·비슬론은 이빨을 자르면 슬라이더가 빠지고, 오픈 지퍼는 아래쪽을 아예 손댈 수 없습니다.' },
    en: { title: 'Zipper Length Calculator', desc: 'Which zipper size to buy for an opening, rounded up to a size that exists.',
      long: 'A 22 cm opening plus 2 cm of allowance top and bottom needs 24 cm — and nobody sells a 24 cm zip. Stock metric sizes step 10 · 12 · 15 · 18 · 20 · 23 · 25 · 30 · 35 · 40 · 45 · 50 · 55 · 60 · 70 · 80 · 90 cm, so you buy the 25. Shops selling in inches step 4 · 5 · 7 · 9 · 12 · 14 · 16 · 18 · 20 · 22 · 24 in.',
      note: 'The stated length measures the toothed run the slider travels, not the tape, which continues past it at both ends. Buying long and shortening only works on coil zips: cut the teeth off a metal or Vislon one and the slider comes off, and a separating zip cannot be touched at the bottom at all.' },
  },
  {
    slug: 'buttonhole-spacing',
    icon: '👔',
    category: '재봉',
    fields: [
      { key: 'len', term: 'placketLen', unit: 'cm', def: 60, min: 1 },
      { key: 'n', term: 'buttonCount', unit: 'ea', def: 6, min: 2, step: 1 },
      { key: 'm', term: 'holeMargin', unit: 'cm', def: 2, min: 0 },
    ],
    formula: '{holeGap} = ({placketLen} − 2 × {holeMargin}) ÷ ({buttonCount} − 1)',
    compute: v => {
      const span = Math.max(0, v.len - 2 * v.m);
      return [
        { term: 'holeGap', unit: 'cm', value: v.n > 1 ? round(span / (v.n - 1), 2) : 0, digits: 2, primary: true },
        { term: 'holeSpan', unit: 'cm', value: round(span, 1), digits: 1 },
      ];
    },
    ko: { title: '단추 구멍 간격 계산기', desc: '단 길이와 단추 개수, 끝 여백으로 단추 구멍 간격을 구합니다.',
      long: '60cm 단에서 위아래 2cm씩 비우면 단추가 놓이는 구간은 56cm입니다. 여기에 6개를 놓을 때 나누는 수는 6이 아니라 5입니다 — 첫 구멍과 마지막 구멍은 구간의 양 끝에 있으므로 사이가 5개뿐입니다. 56 ÷ 5 = 11.2cm 간격이고, 6으로 나눠 9.3cm로 잡으면 마지막 구멍이 끝에서 한참 남습니다.',
      note: '블라우스는 가슴에서 가장 나온 지점에 구멍 하나를 먼저 박고 그 위아래로 간격을 잡습니다 — 균등 배분만 하면 그 자리가 비어 입었을 때 벌어집니다. 구멍 길이는 간격과 별개로 (단추 지름 + 단추 두께)만큼 필요합니다.' },
    en: { title: 'Buttonhole Spacing Calculator', desc: 'Even spacing between buttonholes along a placket.',
      long: 'On a 60 cm placket with 2 cm clear at each end, the buttonholes occupy 56 cm. Six buttons divide that by five, not by six: the first and last sit at the ends of the span, so there are only five gaps between them. That is 56 ÷ 5 = 11.2 cm. Divide by six instead and you get 9.3 cm, leaving the last hole stranded well short of the end.',
      note: 'On a blouse, place one buttonhole at the fullest part of the bust first and space the others from there — even spacing alone leaves that point between two holes, which is exactly where the front gapes. The hole itself still has to be as long as the button diameter plus its thickness.' },
  },
  {
    slug: 'pleat-fabric',
    icon: '〰️',
    category: '재봉',
    fields: [
      { key: 'w', term: 'targetWidth', unit: 'cm', def: 50, min: 1 },
      { key: 'n', term: 'pleatCount', unit: 'ea', def: 10, min: 0, step: 1 },
      { key: 'd', term: 'pleatDepth', unit: 'cm', def: 4, min: 0, step: 0.5 },
    ],
    formula: '{cutW} = {targetWidth} + {pleatCount} × 2 × {pleatDepth}',
    compute: v => {
      const take = v.n * 2 * v.d;
      return [
        { term: 'cutW', unit: 'cm', value: round(v.w + take, 1), digits: 1, primary: true },
        { term: 'pleatTake', unit: 'cm', value: round(take, 1), digits: 1 },
      ];
    },
    ko: { title: '주름(플리츠) 원단 계산기', desc: '완성 폭과 주름 개수·깊이로 필요한 원단 폭을 구합니다.',
      long: '이 계산기는 칼주름 기준입니다. 칼주름 하나는 깊이의 세 배를 먹는데 그중 한 배는 겉으로 보이는 면이라 이미 완성 폭에 들어 있습니다 — 그래서 더 잘라야 하는 것은 주름마다 깊이의 두 배입니다. 완성 50cm에 깊이 4cm 주름 10개면 50 + 10 × 8 = 130cm를 자릅니다. 빈틈없이(겉면 폭 = 깊이) 잡으면 12.5개가 들어가고 원단은 정확히 3배인 150cm가 되는데, 그것이 흔히 말하는 "칼주름은 깊이의 3배"입니다. 박스 주름은 양쪽으로 접으므로 같은 깊이에서 4배를 먹습니다.',
      note: '주름은 접힌 채로 허리선에 함께 박히므로 그 자리에 천이 세 겹으로 쌓입니다. 데님이나 트위드는 깊이를 줄이거나 개수를 줄이지 않으면 바늘이 지나가지 않습니다. 무늬가 있는 천은 주름이 무늬를 잘라먹으니 깊이를 무늬 반복에 맞추세요.' },
    en: { title: 'Pleated Fabric Width Calculator', desc: 'Fabric width needed for a pleated panel from the finished width and the pleats.',
      long: 'This works in knife pleats. One knife pleat consumes three times its depth, but one of those three is the face you can see, which is already counted in the finished width — so what you have to add is twice the depth per pleat. A 50 cm finished panel with ten 4 cm pleats is cut at 50 + 10 × 8 = 130 cm. Pack them so the visible face equals the depth and 12.5 pleats fit, making the fabric exactly 3× the finished width at 150 cm: that is where "knife pleats take three times the depth" comes from. Box pleats fold both ways and take four times the depth instead.',
      note: 'Pleats are stitched into the waist seam while folded, so three layers of cloth stack up in that seam. In denim or tweed you have to cut the depth or the count before the needle will go through. On a printed fabric, match the depth to the print repeat or the pleats will slice the pattern apart.' },
  },
  {
    slug: 'hem-allowance',
    icon: '↩️',
    category: '재봉',
    fields: [
      { key: 'len', term: 'finishedLen', unit: 'cm', def: 70, min: 1 },
      { key: 'folds', term: 'foldCount', unit: 'none', def: 2, min: 1, max: 2, step: 1 },
      { key: 'd', term: 'hemDepth', unit: 'cm', def: 2, min: 0, step: 0.5 },
    ],
    formula: '{cutH} = {finishedLen} + {foldCount} × {hemDepth}',
    compute: v => {
      const turn = v.folds * v.d;
      return [
        { term: 'cutH', unit: 'cm', value: round(v.len + turn, 1), digits: 1, primary: true },
        { term: 'hemTurn', unit: 'cm', value: round(turn, 1), digits: 1 },
      ];
    },
    ko: { title: '밑단 시접 계산기', desc: '완성 길이와 접는 횟수, 밑단 폭으로 재단 길이를 구합니다.',
      long: '접는 횟수가 곧 원단이 들어가는 횟수입니다. 두 번 접기(2)는 자른 끝을 안으로 감추려고 같은 폭을 두 번 올리는 것이므로, 완성 70cm에 밑단 폭 2cm면 70 + 2 × 2 = 74cm를 자릅니다. 끝을 오버로크로 마감하고 한 번만 올리면(1) 72cm면 됩니다. 시접 계산기와 달리 밑단은 한쪽 끝에만 있으므로 2를 곱하지 않습니다.',
      note: '곡선 밑단은 폭이 넓을수록 접을 때 안쪽에 천이 남아 주름이 집니다 — A라인 스커트 아랫단은 1cm 이하로 좁게 접거나 바이어스 테이프로 마감하세요. 니트는 밑단이 늘어나므로 넓게 접고 트윈 니들이나 지그재그로 박습니다.' },
    en: { title: 'Hem Allowance Calculator', desc: 'Cut length from a finished length, the hem depth and how many times you fold it.',
      long: 'The number of folds is the number of times the fabric is spent. A double fold (2) turns the same depth up twice to bury the raw edge, so a 70 cm finished length with a 2 cm hem is cut at 70 + 2 × 2 = 74 cm. Overlock the edge and turn it once (1) and 72 cm is enough. Unlike a seam allowance, a hem sits at one end only, so nothing here is doubled for the opposite edge.',
      note: 'On a curved hem the excess has nowhere to go once the fold is deep: the inside gathers and ripples. Keep an A-line skirt hem under 1 cm, or finish it with bias tape. Knits want the opposite — a deep hem and a twin needle or zigzag, so the stitching can stretch with the fabric.' },
  },
  {
    slug: 'dart-intake',
    icon: '🔻',
    category: '재봉',
    fields: [
      { key: 'big', term: 'bigCirc', unit: 'cm', def: 96, min: 1 },
      { key: 'small', term: 'smallCirc', unit: 'cm', def: 76, min: 0 },
      { key: 'n', term: 'dartCount', unit: 'ea', def: 4, min: 1, step: 1 },
    ],
    formula: '{dartIntake} = ({bigCirc} − {smallCirc}) ÷ {dartCount}',
    compute: v => {
      const total = Math.max(0, v.big - v.small);
      const intake = ratio(total, v.n);
      return [
        { term: 'dartIntake', unit: 'cm', value: round(intake, 2), digits: 2, primary: true },
        { term: 'dartLeg', unit: 'cm', value: round(intake / 2, 2), digits: 2 },
        { term: 'diff', unit: 'cm', value: round(total, 1), digits: 1 },
      ];
    },
    ko: { title: '다트 분량 계산기', desc: '두 둘레의 차이와 다트 개수로 다트 하나가 집는 양을 구합니다.',
      long: '가슴 96cm와 허리 76cm의 차이 20cm를 다트가 나눠 집습니다. 앞뒤에 두 개씩 네 개면 하나에 5cm이고, 다트는 중심선을 기준으로 좌우로 벌어지므로 한쪽 다리는 2.5cm입니다 — 재단면에 그리는 선은 이 2.5cm입니다.',
      note: '20cm를 네 개로 나눈 5cm가 그대로 답은 아닙니다. 실제로는 곡선이 큰 쪽이 더 집으므로 앞 6cm·뒤 4cm처럼 배분합니다. 다트 하나가 4cm를 넘으면 끝이 뾰루지처럼 솟으니 두 개로 갈라 나란히 두세요.' },
    en: { title: 'Dart Intake Calculator', desc: 'How much each dart takes in, from the difference between two circumferences.',
      long: 'The 20 cm between a 96 cm bust and a 76 cm waist is what the darts have to swallow. Four of them — two front, two back — take 5 cm each, and because a dart opens either side of its centre line, each leg is drawn 2.5 cm out. That 2.5 cm is the line you actually mark on the pattern.',
      note: 'Splitting 20 cm four ways does not mean four equal darts. The side with more curve takes more, so 6 cm at the front and 4 cm at the back is the usual sort of split. Once a single dart passes about 4 cm its point bubbles, and the fix is two smaller darts side by side.' },
  },
  {
    slug: 'fabric-nap-layout',
    icon: '➡️',
    category: '재봉',
    fields: [
      { key: 'pw', term: 'pieceW', unit: 'cm', def: 40, min: 1 },
      { key: 'ph', term: 'pieceH', unit: 'cm', def: 50, min: 1 },
      { key: 'n', term: 'pieceCount', unit: 'sheet', def: 6, min: 1, step: 1 },
      { key: 'fw', term: 'boltWidth', unit: 'cm', def: 110, min: 1 },
    ],
    formula: '{fabricLength} = ⌈{pieceCount} ÷ ⌊{boltWidth} ÷ {pieceW}⌋⌉ × {pieceH}',
    compute: v => {
      const perRow = Math.floor(ratio(v.fw, v.pw));
      const rows = Math.ceil(ratio(v.n, Math.max(1, perRow)));
      // 결이 없다면 눕혀 놓는 배치도 고를 수 있다 — 그 값을 같이 보여 결의 값을 드러낸다
      const turnedPerRow = Math.floor(ratio(v.fw, v.ph));
      const turnedRows = Math.ceil(ratio(v.n, Math.max(1, turnedPerRow)));
      return [
        { term: 'fabricLength', unit: 'cm', value: round(rows * v.ph, 1), digits: 1, primary: true },
        { term: 'rotatedLen', unit: 'cm', value: round(turnedRows * v.pw, 1), digits: 1 },
        { term: 'perRow', unit: 'sheet', value: perRow, digits: 0 },
      ];
    },
    ko: { title: '결 방향 원단 계산기', desc: '모든 조각을 한 방향으로 놓아야 하는 천의 소요 길이를 구합니다.',
      long: '벨벳·코듀로이·기모, 그리고 한 방향 무늬가 있는 천은 조각을 모두 같은 방향으로 놓아야 색과 무늬가 한 벌 안에서 같아 보입니다. 110cm 폭에 40 × 50cm 조각 6장을 세워 놓으면 한 줄에 2장, 3줄이니 150cm입니다. 눕혀 놓으면 한 줄에 2장(110 ÷ 50), 3줄이지만 줄 길이가 40cm라 120cm로 끝납니다 — 결이 있는 천은 이 30cm를 아낄 수 없습니다. 원단 소요량 계산기는 이렇게 돌려 놓는 배치까지 고를 수 있다고 보므로 더 짧은 값이 나옵니다.',
      note: '벨벳은 결을 위로 향하면 짙게, 아래로 향하면 밝게 보입니다 — 어느 쪽이든 한 벌 안에서는 같아야 합니다. 큰 무늬가 반복되는 천은 조각마다 무늬를 맞추는 몫(반복 길이 하나)을 더 잡아야 하므로 이 값보다 더 듭니다.' },
    en: { title: 'Napped Fabric Layout Calculator', desc: 'Fabric length when every piece has to lie in the same direction.',
      long: 'Velvet, corduroy, brushed cloth and one-way prints need every piece laid the same way up, or the colour changes from panel to panel. Six 40 × 50 cm pieces upright on 110 cm fabric fit two across, three rows, 150 cm. Turned on their side they still fit two across (110 ÷ 50) in three rows, but each row is only 40 cm long, so 120 cm does it — and a napped fabric cannot claim that 30 cm. The fabric yardage calculator assumes you are free to turn pieces, which is why it quotes less.',
      note: 'Velvet reads darker with the nap running up and lighter with it running down; either is fine as long as the whole garment agrees. A large repeating print costs more again, because each piece needs up to one full repeat of extra length to match at the seams.' },
  },
  {
    slug: 'sewing-thread-length',
    icon: '🧵',
    category: '재봉',
    fields: [
      { key: 'len', term: 'seamLen', unit: 'cm', def: 200, min: 1 },
      { key: 'spc', term: 'stitchPerCm', unit: 'stsPerCm', def: 4, min: 1, max: 12, step: 0.5 },
      { key: 'r', term: 'threadRatio', unit: 'times', def: 2.5, min: 1, max: 20, step: 0.1 },
      { key: 'sp', term: 'spoolLen', unit: 'm', def: 200, min: 1 },
    ],
    formula: '{threadLen} = {seamLen} × {threadRatio} ÷ 100,  {spools} = ⌈{threadLen} ÷ {spoolLen}⌉',
    compute: v => {
      const metres = v.len * v.r / 100;
      return [
        { term: 'threadLen', unit: 'm', value: round(metres, 2), digits: 2, primary: true },
        { term: 'stitchCount', unit: 'sts', value: Math.round(v.len * v.spc), digits: 0 },
        { term: 'spools', unit: 'spool', value: metres > 0 && v.sp > 0 ? Math.ceil(metres / v.sp) : 0, digits: 0 },
      ];
    },
    ko: { title: '재봉실 길이 계산기', desc: '솔기 길이와 실 배수로 드는 실 길이와 실패 개수를 구합니다.',
      long: '직선 본봉은 윗실과 밑실이 천 안에서 서로 얽히므로 솔기 길이보다 훨씬 많은 실을 먹습니다. 배수 2.5배면 200cm 솔기에 500cm, 즉 5m입니다. 땀을 촘촘하게 해도 총 길이는 크게 안 변합니다 — 땀이 두 배로 많아지면 한 땀이 쓰는 실이 절반이 되기 때문입니다. 땀 수(200 × 4 = 800땀)가 정하는 것은 실 길이가 아니라 솔기의 강도와 바늘 구멍의 개수입니다.',
      note: '배수는 천 두께에 따라 커집니다. 얇은 천의 본봉은 2.5배지만 데님 여러 겹은 3배를 넘고, 4실 오버로크는 솔기 길이의 12~18배까지 갑니다 — 오버로크는 실이 천의 겉을 감싸므로 계산 자체가 다릅니다. 실패에 적힌 길이도 표시값이고, 마지막 몇 미터는 감김이 헐거워 못 쓰는 경우가 있습니다.' },
    en: { title: 'Sewing Thread Length Calculator', desc: 'Thread a seam consumes, and how many spools that takes.',
      long: 'A straight lockstitch loops the needle and bobbin threads around each other inside the fabric, so it eats far more thread than the seam is long. At 2.5×, a 200 cm seam takes 500 cm — 5 m. Stitching finer barely changes that total, because twice as many stitches each use half as much thread. What the density (200 × 4 = 800 stitches) really sets is the strength of the seam and the number of holes punched in the cloth.',
      note: 'The ratio climbs with thickness. Thin cloth on a lockstitch sits near 2.5, several layers of denim pass 3, and a four-thread overlock runs 12–18 times the seam length because its thread wraps the outside of the fabric rather than locking inside it. Spool lengths are nominal too, and the last few metres are often too loosely wound to sew with.' },
  },
  {
    slug: 'sticker-sheet-yield',
    icon: '🏷️',
    category: '재봉',
    fields: [
      { key: 'sw', term: 'printSheetW', unit: 'cm', def: 21, min: 1 },
      { key: 'sh', term: 'printSheetH', unit: 'cm', def: 29.7, min: 1 },
      { key: 'lw', term: 'stickerW', unit: 'cm', def: 5, min: 0.1, step: 0.1 },
      { key: 'lh', term: 'stickerH', unit: 'cm', def: 3, min: 0.1, step: 0.1 },
      { key: 'm', term: 'printMargin', unit: 'cm', def: 0.5, min: 0, step: 0.1 },
      { key: 'gap', term: 'labelGap', unit: 'cm', def: 0.2, min: 0, step: 0.1 },
    ],
    formula: '{perRow} = ⌊({printSheetW} − 2 × {printMargin} + {labelGap}) ÷ ({stickerW} + {labelGap})⌋,  {labelRows} = ⌊({printSheetH} − 2 × {printMargin} + {labelGap}) ÷ ({stickerH} + {labelGap})⌋,  {labelsPerSheet} = {perRow} × {labelRows}',
    compute: v => {
      const usableW = Math.max(0, v.sw - 2 * v.m);
      const usableH = Math.max(0, v.sh - 2 * v.m);
      // n개를 놓으면 사이 간격은 n−1개다 — 양쪽에 간격을 하나씩 더해 나누면 그 몫이 n이 된다
      const fit = (space: number, item: number) => Math.max(0, Math.floor(ratio(space + v.gap, item + v.gap)));
      const across = fit(usableW, v.lw);
      const down = fit(usableH, v.lh);
      return [
        { term: 'labelsPerSheet', unit: 'ea', value: across * down, digits: 0, primary: true },
        { term: 'perRow', unit: 'ea', value: across, digits: 0 },
        { term: 'labelRows', unit: 'strip', value: down, digits: 0 },
        { term: 'labelsTurned', unit: 'ea', value: fit(usableW, v.lh) * fit(usableH, v.lw), digits: 0 },
      ];
    },
    ko: { title: '스티커 라벨 장수 계산기', desc: '용지와 라벨 크기, 여백과 간격으로 한 장에서 나오는 라벨 수를 구합니다.',
      long: 'A4(21 × 29.7cm)에서 여백 0.5cm를 사방으로 빼면 쓸 수 있는 자리는 20 × 28.7cm입니다. 5 × 3cm 라벨을 0.2cm씩 띄우면 가로는 (20 + 0.2) ÷ (5 + 0.2) = 3.88 → 3개, 세로는 (28.7 + 0.2) ÷ (3 + 0.2) = 9.03 → 9줄이라 27개입니다. 간격에 1을 더해 나누는 이유는 라벨 3개 사이에 간격이 2개뿐이기 때문입니다. 라벨을 90도 돌려 놓으면 가로 6 × 세로 5 = 30개로 세 개가 더 나옵니다 — 두 방향을 다 세어 보고 큰 쪽으로 판을 짜세요.',
      note: '프린터의 실제 인쇄 여백은 기종마다 다르고 급지 쪽이 더 넓습니다. 여백을 0으로 잡으면 마지막 줄이 잘리므로 시험 인쇄로 확인하세요. 커팅기로 자를 때는 칼날이 지나는 폭 때문에 간격을 0.2cm 이상 두고, 재단선이 라벨보다 조금 크게 잡히니 그 몫을 라벨 치수에 넣으세요.' },
    en: { title: 'Sticker Labels Per Sheet Calculator', desc: 'How many labels fit on one printed sheet, both orientations compared.',
      long: 'On A4 (21 × 29.7 cm) a 0.5 cm margin all round leaves 20 × 28.7 cm to work with. Setting 5 × 3 cm labels 0.2 cm apart, across you get (20 + 0.2) ÷ (5 + 0.2) = 3.88 → 3, and down (28.7 + 0.2) ÷ (3 + 0.2) = 9.03 → 9, so 27 labels. One gap is added before dividing because three labels have only two gaps between them. Turn the labels 90° and it becomes 6 across by 5 down — 30 labels, three more. Count both ways before you lay the sheet out.',
      note: 'Real printer margins differ by model and are wider on the feed edge, so a margin of zero silently crops the last row — test-print before committing. If a cutting machine is doing the trimming, keep at least 0.2 cm of gap for the blade path and add the bleed to the label size, since the cut line sits slightly outside the label.' },
  },
];
