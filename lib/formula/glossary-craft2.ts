/**
 * 공예 둘째 묶음 용어의 뜻풀이(ko·en) — 뜨개·재봉에서 새로 생긴 열쇠.
 *
 * 여기서 틀리는 것은 계산이 아니라 "어디를 재는가"다. 발둘레를 발목에서 재고,
 * 주름 깊이에 겉으로 보이는 폭을 넣고, 지퍼 트임에 완성 치수 대신 재단 치수를
 * 넣는 식이다. 라벨만 보면 어느 쪽인지 알 수 없으므로 재는 자리를 한 줄로
 * 적어 둔다.
 *
 * 이미 뜻풀이가 있는 열쇠(chestCm·targetWidth·cutH·diff 같은 것)는 다시 적지
 * 않는다 — 사전이 합쳐질 때 뒤가 앞을 덮으므로, 같은 개념에 설명이 둘이면
 * 어느 것이 화면에 나오는지 파일 순서가 정하게 된다.
 */
import type { Term } from './terms.ts';

export const CRAFT2_DESC: Record<string, Term> = {
  /* 뜨개 */
  origYardage: { ko: '도안이 쓴 실의 라벨 길이를 100g 기준으로 환산한 값. 50g에 200m면 400입니다.', en: 'The pattern yarn\'s label length scaled to 100 g — 200 m per 50 g is 400.' },
  subYardage: { ko: '바꿔 쓸 실의 같은 값. 무게가 아니라 이 길이를 맞춥니다.', en: 'The same figure for the yarn you are swapping in; this is what you match, not the weight.' },
  patternBalls: { ko: '도안이 그 사이즈에 요구하는 볼 수. 사이즈별로 다르니 내 사이즈 줄을 보세요.', en: 'Balls the pattern lists for your size — read the row for your size, not the first one.' },
  easePct: { ko: '몸 치수에 더하는(음수면 빼는) 비율. 완성 둘레와 몸의 차이입니다.', en: 'What you add to the body measurement, or take off if negative — the gap between body and garment.' },
  finishedCirc: { ko: '다 뜬 옷을 눌러 편 채로 잰 둘레. 몸 치수가 아닙니다.', en: 'The garment measured flat and unstretched, right round — not the body it fits.' },
  footCirc: { ko: '발볼에서 가장 굵은 곳의 둘레. 발등을 지나게 잽니다.', en: 'The foot at its widest across the ball, taped over the instep.' },
  repeatRows: { ko: '무늬나 색이 한 바퀴 돌아오는 데 걸리는 단 수.', en: 'Rows it takes for the stripe or pattern to come back round.' },
  fullRepeats: { ko: '온전히 들어가는 반복의 수. 남는 단은 따로 셉니다.', en: 'How many whole repeats fit; the remainder is counted separately.' },
  leftoverRows: { ko: '반복을 채우고 남는 단 수. 눈에 안 띄는 자리에 몰아 둡니다.', en: 'Rows left after the last whole repeat — hide them where the eye is already busy.' },
  mainColourPct: { ko: '차트에서 주 색이 차지하는 칸의 비율. 무늬 없는 구간은 전부 주 색입니다.', en: 'The share of chart squares in the main colour; plain stretches all count as main.' },
  mainColourWt: { ko: '주 색으로 사야 하는 실 무게. 볼 수가 아니라 g입니다.', en: 'Main-colour yarn to buy, in grams rather than balls.' },
  contrastColourWt: { ko: '보조 색으로 드는 실 무게. 차트 비율에서 가장 많이 벗어나는 값입니다.', en: 'Contrast yarn by weight — the figure that drifts furthest from the chart.' },
  leftoverWt: { ko: '지금 남아 있는 실의 무게. 심과 라벨은 빼고 잽니다.', en: 'What the remaining yarn weighs, with the core and band off the scale.' },
  metrePerRow: { ko: '한 단을 뜨는 데 드는 실 길이. 그 단의 코 수에 비례합니다.', en: 'Yarn one row eats; it scales with the number of stitches in that row.' },
  rowsLeft: { ko: '남은 실로 더 뜰 수 있는 단 수. 마무리에 쓸 몫은 빠져 있습니다.', en: 'Rows the leftovers still carry, before keeping anything back for finishing.' },
  bedW: { ko: '매트리스의 폭. 침구가 아니라 매트리스 자체를 잽니다.', en: 'The mattress across, measured on the mattress itself rather than over the bedding.' },
  bedLen: { ko: '매트리스의 길이. 머리판은 빼고 잽니다.', en: 'The mattress head to foot, excluding the headboard.' },
  dropLen: { ko: '침대 옆으로 늘어뜨릴 길이. 폭에는 양쪽으로 두 번 들어갑니다.', en: 'How far it hangs over the side; the width takes this twice, once each side.' },

  /* 재봉·부속 */
  openingLen: { ko: '지퍼가 실제로 벌어져야 하는 구간. 완성 치수에서 잽니다.', en: 'The run that actually has to open, measured on the finished piece.' },
  zipAllow: { ko: '트임 위아래로 더 두는 길이. 끝을 박고 마감하는 데 들어갑니다.', en: 'Extra beyond the opening, spent on stitching and finishing the ends.' },
  zipperLen: { ko: '사야 하는 지퍼의 표시 사이즈. 파는 규격까지 올린 값입니다.', en: 'The stated size to buy, rounded up to one that is actually sold.' },
  placketLen: { ko: '단추가 놓이는 단의 전체 길이. 목선부터 밑단까지입니다.', en: 'The whole length of the button band, neckline to hem.' },
  buttonCount: { ko: '달 단추의 개수. 구멍 수와 같습니다.', en: 'How many buttons go on — the same as the number of holes.' },
  holeMargin: { ko: '단의 양 끝에서 비워 두는 길이. 위아래 각각입니다.', en: 'The clear length left at each end of the band, top and bottom alike.' },
  holeGap: { ko: '구멍 중심에서 다음 구멍 중심까지의 거리. 간격 수는 단추 수보다 하나 적습니다.', en: 'Centre to centre between holes; there is one fewer gap than there are buttons.' },
  holeSpan: { ko: '첫 구멍에서 마지막 구멍까지의 길이. 단 길이에서 여백을 뺀 몫입니다.', en: 'First hole to last hole — the band less both end margins.' },
  pleatCount: { ko: '잡을 주름의 개수. 완성 폭 안에 들어가는 수입니다.', en: 'How many pleats you are folding into the finished width.' },
  pleatDepth: { ko: '접혀 안으로 들어가는 깊이. 겉에 보이는 폭이 아닙니다.', en: 'How deep the fold goes underneath, not the width you see.' },
  pleatTake: { ko: '주름 때문에 더 잘라야 하는 폭. 주름마다 깊이의 두 배입니다.', en: 'The extra width the pleats swallow — twice the depth for each one.' },
  foldCount: { ko: '밑단을 접어 올리는 횟수. 두 번 접기면 2입니다.', en: 'How many times the hem is turned up; a double fold is 2.' },
  hemDepth: { ko: '완성된 밑단의 폭. 접어 올린 한 겹의 높이입니다.', en: 'The finished hem width — the height of one turn-up.' },
  hemTurn: { ko: '밑단으로 접혀 사라지는 길이. 재단 길이에 더해야 하는 몫입니다.', en: 'Length that disappears into the hem, which is what the cut length has to add.' },
  bigCirc: { ko: '가슴처럼 큰 쪽의 둘레. 옷이 아니라 몸에서 잰 값입니다.', en: 'The larger measurement, such as the bust, taken on the body rather than the pattern.' },
  smallCirc: { ko: '허리처럼 작은 쪽의 둘레. 같은 자세로 잽니다.', en: 'The smaller measurement, such as the waist, taken in the same posture.' },
  dartCount: { ko: '차이를 나눠 집는 다트의 개수. 앞뒤를 합친 수입니다.', en: 'How many darts share the difference, front and back together.' },
  dartIntake: { ko: '다트 하나가 집어 없애는 폭. 두 다리를 합친 값입니다.', en: 'The width one dart removes, both legs added together.' },
  dartLeg: { ko: '중심선에서 한쪽으로 벌리는 폭. 재단면에 그리는 선입니다.', en: 'How far one leg opens from the dart\'s centre line — the line you mark.' },
  rotatedLen: { ko: '조각을 90도 돌려 놓았을 때 드는 원단 길이. 결이 있으면 쓸 수 없는 값입니다.', en: 'Fabric length if the pieces were turned 90° — a figure a napped cloth cannot use.' },
  seamLen: { ko: '실이 지나갈 솔기의 전체 길이. 솔기가 여러 개면 더해서 넣으세요.', en: 'Total length of seam the thread has to cover; add several seams together.' },
  stitchPerCm: { ko: '1cm에 들어가는 땀 수. 미싱의 땀 길이 다이얼과 반대로 움직입니다.', en: 'Stitches in one centimetre — it moves opposite to the stitch length dial.' },
  threadRatio: { ko: '솔기 길이의 몇 배가 실로 들어가는지. 직선 본봉은 2.5배 안팎입니다.', en: 'Times the seam length that ends up as thread; a straight lockstitch sits near 2.5.' },
  threadLen: { ko: '드는 실의 총 길이. 윗실과 밑실을 합친 값입니다.', en: 'Total thread needed, needle and bobbin thread together.' },
  spoolLen: { ko: '실패 하나에 감긴 길이. 라벨에 적힌 m 값입니다.', en: 'Metres wound on one spool, as printed on the label.' },
  spools: { ko: '사야 하는 실패 개수. 쪼갤 수 없어 올림입니다.', en: 'Spools to buy; you cannot split one, so it rounds up.' },
  printSheetW: { ko: '인쇄할 용지의 폭. A4는 21cm입니다.', en: 'The paper width you print on — 21 cm for A4.' },
  printSheetH: { ko: '인쇄할 용지의 길이. A4는 29.7cm입니다.', en: 'The paper length you print on — 29.7 cm for A4.' },
  stickerW: { ko: '라벨 한 장의 폭. 재단선 기준으로 잽니다.', en: 'One label across, measured out to the cut line.' },
  stickerH: { ko: '라벨 한 장의 길이. 재단선 기준으로 잽니다.', en: 'One label down, measured out to the cut line.' },
  printMargin: { ko: '프린터가 닿지 못하는 테두리. 기종마다 다르니 시험 인쇄로 확인하세요.', en: 'The border the printer cannot reach; it differs by model, so test-print it.' },
  labelGap: { ko: '라벨 사이에 비워 두는 폭. 칼날이나 가위가 지나갈 자리입니다.', en: 'The space left between labels, where the blade or the scissors travel.' },
  labelsPerSheet: { ko: '용지 한 장에서 나오는 라벨 수. 가로 개수 × 세로 줄 수입니다.', en: 'Labels one sheet yields — across times down.' },
  labelRows: { ko: '세로로 놓이는 줄 수. 여백을 뺀 높이 안에서 셉니다.', en: 'Rows down the sheet, counted inside the printable height.' },
  labelsTurned: { ko: '라벨을 90도 돌려 놓았을 때의 개수. 둘 중 큰 쪽으로 판을 짭니다.', en: 'The count with the labels rotated 90°; lay the sheet out whichever way wins.' },
};
