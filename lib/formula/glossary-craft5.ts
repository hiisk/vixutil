/**
 * 코바늘·재봉 마감 용어의 뜻풀이(ko·en).
 *
 * 이 스물네 도구는 "무엇을 어디서 재는가"에서 답이 갈린다. 사슬 게이지를 손으로
 * 늘려 재거나, 암홀을 시접 안쪽으로 재거나, 도안 가슴둘레에 완성 치수를 넣거나,
 * 다트 길이를 가슴점까지로 재는 식이다. 그래서 라벨을 다시 풀어 쓰지 않고 재는
 * 자리와 재는 방법을 적는다 — 힘을 뺀 채로 재라, 시접선을 따라 재라, 사이즈 표의
 * 몸 치수를 쓰라처럼.
 */
import type { Term } from './terms.ts';

export const CRAFT5_DESC: Record<string, Term> = {
  /* ───────── 코바늘 — 사슬·게이지 ───────── */
  turnCh: { ko: '단을 올릴 때 세우는 사슬 수. 짧은뜨기 1, 반길긴뜨기 2, 한길긴뜨기 3입니다.', en: 'Chains stood up to start a row: 1 for single, 2 for half double, 3 for double crochet.' },
  chainCount: { ko: '처음 잡는 사슬의 개수. 기둥 코가 포함된 값입니다.', en: 'How many chains you make to start, turning chain included.' },
  chainGauge: { ko: '힘을 뺀 사슬 10cm에 들어가는 사슬 수. 늘려서 재면 안 됩니다.', en: 'Chains per 10 cm of relaxed chain — never measure it stretched.' },
  chainLen: { ko: '그 사슬이 늘리지 않은 상태로 재는 길이.', en: 'The length that chain measures when it is not being pulled.' },
  stitchHeightRatio: { ko: '코 폭에 대한 코 높이의 배수. 짧은뜨기 약 1.1, 한길긴뜨기 약 2입니다.', en: 'Stitch height as a multiple of its width — about 1.1 for single, 2 for double crochet.' },
  rowHeight: { ko: '한 단이 올라가는 높이. 코 종류가 정합니다.', en: 'How much height one row adds, which the stitch type decides.' },
  rounds: { ko: '중심에서 돌려 나간 라운드의 수. 평면으로 왕복하는 단과는 다릅니다.', en: 'Rounds worked outwards from the centre, as opposed to rows worked back and forth.' },
  roundsNeeded: { ko: '목표 크기에 닿기까지 떠야 하는 라운드 수. 반 라운드는 없어 올림합니다.', en: 'Rounds needed to reach the target size; there are no half rounds, so it rounds up.' },

  /* ───────── 코바늘 — 모티브·담요 ───────── */
  roundDepth: { ko: '라운드 하나가 바깥으로 자라는 폭. 3라운드를 뜬 뒤 한 변을 재서 6으로 나눕니다.', en: 'How far one round grows outwards; work three rounds, measure a side and divide by six.' },
  squareSize: { ko: '모티브 한 변의 완성 길이. 블로킹한 뒤에 잽니다.', en: 'One side of the finished motif, measured after blocking.' },
  joinW: { ko: '모티브를 이을 때 사이에 생기는 폭. 겉뜨기 이음은 거의 0입니다.', en: 'Width the join adds between motifs; a slip-stitch join is almost zero.' },
  squaresAcross: { ko: '가로로 놓이는 모티브 수. 목표 폭을 넘지 않게 내림합니다.', en: 'Motifs across the width, rounded down so it never overshoots the target.' },
  squaresDown: { ko: '세로로 놓이는 모티브 수. 가로와 같은 방식으로 셉니다.', en: 'Motifs down the length, counted the same way as across.' },
  squareCount: { ko: '떠야 하는 모티브의 총 개수. 가로 × 세로입니다.', en: 'Total motifs to make — across times down.' },
  joinedW: { ko: '모티브를 다 이었을 때 실제로 나오는 폭. 목표보다 작을 수 있습니다.', en: 'The width you actually get once joined, which can fall short of the target.' },

  /* ───────── 코바늘 — 늘림·테두리 ───────── */
  incRounds: { ko: '목표 코 수까지 늘리며 도는 라운드 수. 라운드마다 시작 코만큼 늘립니다.', en: 'Rounds of increasing to reach the target, adding the starting count each round.' },
  increases: { ko: '그 라운드에서 늘릴 코의 개수.', en: 'How many stitches you are adding in that round.' },
  everyNSts: { ko: '늘림을 넣는 간격. 이 코 수마다 한 번 늘립니다.', en: 'The spacing: increase once in every this many stitches.' },
  leftoverSts: { ko: '간격으로 나누고 남는 코. 몇 구간을 한 코씩 넓혀 흡수합니다.', en: 'Stitches left over after spacing; absorb them by widening a few gaps by one.' },
  borderSts: { ko: '테두리 첫 라운드에 넣을 코 수. 모서리 몫이 포함된 값입니다.', en: 'Stitches for the first round of the border, corners included.' },
  cornerSts: { ko: '네 모서리에 더 넣는 코의 합. 없으면 테두리가 당겨 오그라듭니다.', en: 'Extra stitches at the four corners together; without them the border pulls in.' },
  cornerExtra: { ko: '모서리 한 곳에 더 넣는 코 수. 짧은뜨기 2~3, 한길긴뜨기는 다발로 넣습니다.', en: 'Extra stitches at one corner — 2–3 in single crochet, a cluster in double.' },

  /* ───────── 코바늘 — 실·바늘 ───────── */
  swatchStitches: { ko: '시험 뜨기에 실제로 들어간 코의 개수. 한 단 코 수 × 단 수로 셉니다.', en: 'Stitches actually worked in the swatch — stitches per row times rows.' },
  swatchYarnLen: { ko: '그 시험 뜨기가 쓴 실의 길이. 미리 재서 자른 실을 쓰면 정확합니다.', en: 'Yarn the swatch consumed; cutting a measured length first is the accurate way.' },
  projectStitches: { ko: '작품 전체의 코 수. 도안의 한 단 코 수와 단 수로 셉니다.', en: 'Total stitches in the project, counted from the pattern\'s rows and stitch counts.' },
  yarnPerStitch: { ko: '코 하나가 먹는 실의 길이. 코 종류를 바꾸면 통째로 달라집니다.', en: 'Length one stitch eats; it changes completely with the stitch type.' },
  knitYarnWt: { ko: '같은 것을 대바늘로 뜰 때 드는 실 무게. 도안에 적힌 값입니다.', en: 'Yarn weight the same piece takes knitted — the figure printed on the pattern.' },
  crochetExtraPct: { ko: '코바늘이 더 먹는 비율. 촘촘한 짧은뜨기는 40~50%까지 갑니다.', en: 'How much more crochet takes; dense single crochet reaches 40–50%.' },
  crochetYarnWt: { ko: '코바늘로 뜰 때 드는 실 무게. 볼 개수로 바꿀 때는 라벨 길이로 다시 나눕니다.', en: 'Yarn weight crocheted; divide by the band\'s metres to turn it into balls.' },
  extraYarnWt: { ko: '대바늘보다 더 사야 하는 실. 볼 몇 개 차이로 나옵니다.', en: 'Extra yarn to buy over the knitted version, usually a few balls\' worth.' },
  hookSize: { ko: '쓰는 코바늘의 지름(mm). 손잡이가 아니라 목의 지름입니다.', en: 'Hook diameter in mm, measured at the shaft rather than the handle.' },
  hookNeeded: { ko: '게이지를 맞추려면 필요한 지름. 파는 호수와는 다를 수 있습니다.', en: 'The diameter that would match gauge, which may not be a size on sale.' },
  stockHook: { ko: '그 값에 가장 가까운, 실제로 파는 호수.', en: 'The nearest hook size actually sold.' },
  hookChange: { ko: '지금 바늘에서 옮겨야 하는 폭. 양수면 굵은 바늘로 갑니다.', en: 'How far to move from your current hook; positive means go thicker.' },
  hookMin: { ko: '그 실에 권하는 호수의 하단.', en: 'The smallest hook usually recommended for that yarn.' },
  hookMax: { ko: '그 실에 권하는 호수의 상단.', en: 'The largest hook usually recommended for that yarn.' },

  /* ───────── 재봉 — 소매·허리·밑단 ───────── */
  armholeCirc: { ko: '암홀 시접선을 따라 한 바퀴 잰 길이. 시접 안쪽으로 재면 짧게 나옵니다.', en: 'The armhole measured right round its seam line; inside the allowance reads short.' },
  capEasePct: { ko: '소매산을 암홀보다 길게 두는 비율. 천이 감당할 수 있는 만큼만 줍니다.', en: 'How much longer the cap is than the armhole — only as much as the fabric can take.' },
  capLen: { ko: '소매산 곡선의 길이. 암홀보다 이즈만큼 깁니다.', en: 'Length of the sleeve cap curve, longer than the armhole by the ease.' },
  easeAmt: { ko: '주름 없이 먹여 넣어야 하는 길이. 너치 사이에 몰아 넣습니다.', en: 'Length to work in without pleats, concentrated between the notches.' },
  easeCm: { ko: '몸 치수에 더하는 여유 길이. 앉았을 때 늘어나는 몫입니다.', en: 'Ease added to the body measurement — what the body gains when you sit.' },
  overlapLen: { ko: '단추가 물리도록 밴드 끝을 겹치는 길이. 단추 위치가 정합니다.', en: 'How far the band overlaps for the button, set by where the button sits.' },
  bandWidth: { ko: '밴드의 완성 폭. 접어서 두 겹으로 쓰므로 재단 폭은 그 두 배입니다.', en: 'Finished width of the band; folded double, so it is cut at twice this.' },
  hemEdgeLen: { ko: '밑단 곡선을 따라 잰 길이. 직선 거리가 아닙니다.', en: 'Length measured along the hem curve, not straight across it.' },
  facingW: { ko: '안단이 위로 덮는 폭. 넓을수록 곡선에서 남는 양이 커집니다.', en: 'How far the facing reaches up; the wider it is, the more a curve leaves over.' },
  facingLen: { ko: '안단으로 준비할 띠의 길이. 이어 붙일 시접이 들어 있습니다.', en: 'Length of strip to prepare for the facing, joining allowances included.' },
  innerEdgeLen: { ko: '접어 올렸을 때 안쪽 자유 변이 놓이는 길이. 밑단보다 짧습니다.', en: 'Length the free inner edge sits at once turned up — shorter than the hem.' },

  /* ───────── 재봉 — 단추·심지·시접 ───────── */
  buttonD: { ko: '단추를 위에서 봤을 때의 지름. 발(생크)은 뺍니다.', en: 'The button\'s diameter seen from above, ignoring the shank.' },
  buttonThick: { ko: '단추의 두께. 이 값을 빼먹으면 구멍이 모자랍니다.', en: 'Thickness of the button; leave it out and the hole comes up short.' },
  holeEase: { ko: '단추가 드나들 여유. 0.2~0.3cm면 충분합니다.', en: 'Clearance for the button to pass — 2–3 mm is enough.' },
  holeLen: { ko: '박아야 하는 단추 구멍의 길이. 지름 + 두께 + 여유입니다.', en: 'Length of buttonhole to stitch: diameter plus thickness plus clearance.' },
  ballHoleLen: { ko: '둥근 단추일 때의 구멍 길이. 지름이 아니라 반 둘레가 기준입니다.', en: 'Buttonhole length for a ball button, set by half its circumference.' },
  interfacedArea: { ko: '심지가 들어가는 조각의 면적을 모두 더한 값.', en: 'The areas of every piece that gets interfaced, added together.' },
  fusibleW: { ko: '사는 심지의 폭. 편물 심지와 직물 심지가 다릅니다.', en: 'Width of the interfacing you buy; knit and woven types differ.' },
  fusibleLen: { ko: '사야 하는 심지의 길이. 자투리 몫이 들어 있습니다.', en: 'Interfacing length to buy, with the offcut waste already in it.' },
  firstPass: { ko: '겉끼리 반대로 놓고 처음 박는 폭.', en: 'The width of the first pass, sewn with the right sides out.' },
  secondPass: { ko: '뒤집어 솔기를 감싸며 다시 박는 폭. 첫 솔기에서 잽니다.', en: 'The second pass that encloses the seam, measured from the first stitching.' },
  trimTo: { ko: '1차 박음 뒤 시접을 다듬을 폭. 2차 박음 폭보다 좁아야 합니다.', en: 'Trim the allowance to this after the first pass; it must stay under the second.' },

  /* ───────── 재봉 — 바지·다트·수축·생산 ───────── */
  frontRise: { ko: '앞 중심선을 따라 허리선에서 가랑이점까지의 길이. 뒤 밑위와 섞지 마세요.', en: 'Waist to crotch point down the centre front — not to be confused with the back rise.' },
  flySharePct: { ko: '밴드 아래 밑위 가운데 트임이 차지하는 비율. 아래쪽은 가랑이 곡선입니다.', en: 'The share of the rise below the band that the opening takes; the rest is the crotch curve.' },
  flyLen: { ko: '지퍼가 여는 트임의 길이. 지퍼 사이즈에 맞춰 박습니다.', en: 'Length of the opening the zip has to clear, topstitched to the zip.' },
  apexDist: { ko: '다트 끝(꼭짓점)에서 집는 자리까지의 길이. 다트 다리의 길이입니다.', en: 'From the dart point to where the intake is taken — the length of the dart leg.' },
  apexToHem: { ko: '다트 끝에서 밑단까지의 길이. 다트를 돌릴 때 벌어짐이 여기에 비례합니다.', en: 'Dart point to hem; the swing when you rotate the dart scales with it.' },
  rotationDeg: { ko: '다트가 꼭짓점에서 벌리는 각도. 옮겨도 이 값은 변하지 않습니다.', en: 'The angle the dart opens at its point; moving the dart never changes it.' },
  hemSwing: { ko: '다트를 옮길 때 밑단이 벌어지는 길이.', en: 'How far the hem opens out when the dart is rotated away.' },
  shrinkLenPct: { ko: '날실(길이) 방향으로 줄어드는 비율. 대개 폭 방향보다 큽니다.', en: 'Shrinkage along the warp; usually the larger of the two directions.' },
  shrinkCrossPct: { ko: '씨실(폭) 방향으로 줄어드는 비율.', en: 'Shrinkage across the weft, the fabric\'s width direction.' },
  coneLen: { ko: '콘 하나에 감긴 실의 길이. 표시값이며 마지막 몇십 미터는 장력이 흔들립니다.', en: 'Metres wound on one cone — nominal, and the last few dozen run loose.' },
  threadPerItem: { ko: '한 벌을 박는 데 드는 실의 길이. 솔기 길이 × 실 배수로 구합니다.', en: 'Thread one garment consumes — seam length times the thread ratio.' },
  runSize: { ko: '이번에 만들 벌 수.', en: 'How many garments you are making in this run.' },
  itemsPerCone: { ko: '콘 하나로 완성할 수 있는 벌 수. 반 벌은 없어 내림합니다.', en: 'Garments one cone finishes; there are no half garments, so it rounds down.' },
  conesNeeded: { ko: '사야 하는 콘의 개수. 색을 맞추려면 로트 단위로 넉넉히 삽니다.', en: 'Cones to buy; to keep the colour matched, buy generously within one lot.' },
  fullBust: { ko: '가슴에서 가장 나온 지점을 지나 한 바퀴 잰 둘레.', en: 'The circumference measured round the fullest part of the bust.' },
  patternBust: { ko: '그 사이즈의 사이즈 표에 적힌 몸 가슴둘레. 완성 치수가 아닙니다.', en: 'The body bust listed for that size in the chart, not the finished measurement.' },
  fbaTotal: { ko: '몸과 도안의 둘레 차이. 조각에 나누기 전의 값입니다.', en: 'The circumference gap between body and pattern, before it is divided up.' },
  fbaPerPiece: { ko: '도안 조각에서 실제로 벌릴 양. 접어 자르는 앞판은 4분의 1입니다.', en: 'What you actually spread on the pattern piece — a quarter for a front cut on the fold.' },
  cordD: { ko: '파이핑 안에 넣는 코드의 지름. 필요한 폭은 지름이 아니라 둘레가 정합니다.', en: 'Diameter of the piping cord; the strip width comes from its circumference.' },
};
