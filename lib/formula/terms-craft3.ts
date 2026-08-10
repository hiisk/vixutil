/**
 * 공예 섹션의 용어 — 퀼트·자수 두 번째 묶음과 양초 두 번째 묶음(ko·en).
 *
 * terms-craft.ts에 이미 있는 열쇠는 여기 다시 적지 않는다. 같은 이름을 다시
 * 정의하면 병합 순서에 따라 저쪽 섹션의 라벨이 조용히 바뀌는데, 지난주에
 * fabricWidth와 piece가 실제로 그랬다. 그래서 새로 만들기 전에 terms-rate·body·
 * geo·craft를 전부 훑고, 뜻이 맞으면 있는 것을 쓴다 — 이 묶음은 quiltW·blocksW·
 * boltWidth·strips·fabricLength·designW·chartW·flossLen·overhang·waxWeight·
 * fragrancePct·containerVol·shrinkPct·percentA·unitCost·marginRate를 물려받았다.
 *
 * 이름을 좁게 짓는다. 염료를 dyePct로 두면 비누 쪽 색소와 부딪히고, 보더 폭을
 * borderWidth로 두면 도형 섹션의 테두리와 부딪힌다. 왁스에만 있는 값은 wax를
 * 앞에 붙이고(waxDyePct·waxStock·waxLoss), 자수실에만 있는 값은 floss를 붙인다
 * (flossPerSkein·flossSkeins). 부딪힐 자리를 미리 없애는 편이 나중에 무엇이
 * 어디서 바뀌었는지 찾는 것보다 싸다.
 *
 * stsPerInch는 용어와 단위에 같은 이름으로 둔다. TERMS와 UNITS는 서로 다른
 * 표이고(people·percent도 양쪽에 있다), 값 자체가 "1인치 코 수"이므로 라벨과
 * 단위가 같은 말을 가리키는 것이 맞다.
 */
import type { Term } from './terms.ts';

export const CRAFT3_TERMS: Record<string, Term> = {
  /* ───────── 퀼트 — 새싱·보더 ───────── */
  sashingW:         { ko: '새싱 폭',            en: 'Sashing width' },
  sashingLen:       { ko: '새싱 총 길이',       en: 'Sashing length' },
  borderW:          { ko: '보더 폭',            en: 'Border width' },
  borderW2:         { ko: '두 번째 보더 폭',    en: 'Second border width' },
  borderLen:        { ko: '보더 스트립 길이',   en: 'Border strip length' },
  borderedW:        { ko: '보더 포함 폭',       en: 'Width with borders' },
  borderedH:        { ko: '보더 포함 길이',     en: 'Length with borders' },
  mitreStripW:      { ko: '위아래 스트립 길이', en: 'Strip for top and bottom' },
  mitreStripH:      { ko: '옆면 스트립 길이',   en: 'Strip for the sides' },
  mitreMark:        { ko: '끝에서 표시 위치',   en: 'Mark from each end' },
  mitreDiag:        { ko: '대각선 절단 길이',   en: 'Diagonal cut length' },

  /* ───────── 퀼트 — 프리컷 ───────── */
  fqW:              { ko: '팻쿼터 폭',          en: 'Fat quarter width' },
  fqH:              { ko: '팻쿼터 길이',        en: 'Fat quarter length' },
  fqLeftover:       { ko: '남는 원단',          en: 'Fabric left over' },
  rollStrips:       { ko: '스트립 장수',        en: 'Strips in the roll' },
  rollStripW:       { ko: '프리컷 스트립 폭',   en: 'Precut strip width' },
  rollStripLen:     { ko: '스트립 길이',        en: 'Strip length' },
  piecedArea:       { ko: '이은 면적',          en: 'Pieced area' },

  /* ───────── 자수 ───────── */
  flossPerSkein:    { ko: '한 타래 길이',       en: 'Metres per skein' },
  flossSpare:       { ko: '실 여유율',          en: 'Floss spare' },
  flossSkeins:      { ko: '타래 수',            en: 'Skeins to buy' },
  flossSkeinYield:  { ko: '타래당 가닥 길이',   en: 'Single-strand metres per skein' },
  flossLeft:        { ko: '남는 실 길이',       en: 'Floss left over' },
  hoopD:            { ko: '수틀 지름',          en: 'Hoop diameter' },
  hoopInch:         { ko: '수틀 인치',          en: 'Hoop size in inches' },
  threadsPerStitch: { ko: '한 코가 덮는 올 수', en: 'Threads per stitch' },
  stsPerInch:       { ko: '1인치 코 수',        en: 'Stitches per inch' },

  /* ───────── 양초 — 붓기·배합 ───────── */
  firstPour:        { ko: '첫 붓기 무게',       en: 'First pour' },
  topUpWt:          { ko: '2차 붓기 무게',      en: 'Top-up pour' },
  waxDyePct:        { ko: '염료 비율',          en: 'Dye load' },
  waxDyeWt:         { ko: '염료 양',            en: 'Dye' },
  totalLoadPct:     { ko: '전체 첨가 비율',     en: 'Total additive load' },
  waxA:             { ko: '왁스 A 무게',        en: 'Wax A' },
  waxB:             { ko: '왁스 B 무게',        en: 'Wax B' },
  waxLayers:        { ko: '층 수',              en: 'Layers' },
  waxPerLayer:      { ko: '한 층 왁스',         en: 'Wax per layer' },
  layerVol:         { ko: '한 층 부피',         en: 'Volume per layer' },
  waxHeight:        { ko: '왁스 높이',          en: 'Wax height' },

  /* ───────── 양초 — 허용치·재고·값 ───────── */
  maxFragrancePct:  { ko: '최대 향 허용치',     en: 'Maximum fragrance load' },
  maxFragranceWt:   { ko: '최대 향료 무게',     en: 'Maximum oil' },
  fragranceHeadroom:{ ko: '남은 여유',          en: 'Headroom left' },
  waxStock:         { ko: '가진 왁스',          en: 'Wax on hand' },
  meltLossPct:      { ko: '손실률',             en: 'Melt loss' },
  waxLoss:          { ko: '손실되는 왁스',      en: 'Wax lost' },
  leftoverWax:      { ko: '남는 왁스',          en: 'Wax left over' },
  marginAtPrice:    { ko: '그 값의 이익률',     en: 'Margin at your price' },
};

export const CRAFT3_UNITS: Record<string, Term> = {
  flossSkein: { ko: '타래',   en: 'skeins' },
  stsPerInch: { ko: '코/인치', en: 'sts/in' },
};
