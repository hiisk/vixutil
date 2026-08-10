/**
 * 공예 섹션의 용어(ko·en).
 *
 * 뜨개·재봉·퀼트·양초·비누·수지·구슬이 한 섹션에 모이는데, 같은 낱말이
 * 분야마다 다른 것을 가리키는 자리가 있다. "게이지"는 뜨개에서 10cm에 들어가는
 * 코 수이고 와이어에서는 굵기 번호다 — 그래서 gauge를 그냥 쓰지 않고
 * stitchGauge·rowGauge로 갈라 둔다.
 *
 * 무게와 부피를 섞지 않는다. 왁스·수지·비누는 무게로 재고(저울이 정확하다),
 * 용기와 몰드는 부피로 잰다. 그 사이를 잇는 것이 밀도이므로 밀도를 입력으로
 * 드러내 둔다 — 재료마다 다르고, 숨기면 남의 재료 답이 된다.
 */
import type { Term } from './terms.ts';

/*
 * fabricWidth를 쓰지 않고 boltWidth로 둔다. /geometry의 커튼 도구가 이미
 * fabricWidth를 "필요 원단 폭"(계산 결과)으로 쓰고 있어서, 여기서 "사는 원단의
 * 폭"으로 다시 정의하면 병합 순서상 저쪽 라벨이 조용히 바뀐다. 단위 piece·hour도
 * 같은 이유로 넣지 않는다 — piece는 /rate가 '개'로 쓰고 있는데 '장'으로 덮으면
 * 울타리 기둥이 "12장"이 된다.
 */
export const CRAFT_TERMS: Record<string, Term> = {
  /* ───────── 뜨개 ───────── */
  stitchGauge:   { ko: '10cm 코 수',      en: 'Stitches per 10 cm' },
  rowGauge:      { ko: '10cm 단 수',      en: 'Rows per 10 cm' },
  patternGauge:  { ko: '도안 10cm 코 수', en: 'Pattern stitches per 10 cm' },
  myGauge:       { ko: '내 10cm 코 수',   en: 'My stitches per 10 cm' },
  targetWidth:   { ko: '완성 폭',         en: 'Finished width' },
  targetLength:  { ko: '완성 길이',       en: 'Finished length' },
  stitches:      { ko: '코 수',           en: 'Stitches' },
  rows:          { ko: '단 수',           en: 'Rows' },
  castOn:        { ko: '시작 코 수',      en: 'Cast-on stitches' },
  swatchArea:    { ko: '시험 뜨기 면적',  en: 'Swatch area' },
  swatchWeight:  { ko: '시험 뜨기 무게',  en: 'Swatch weight' },
  yarnWeight:    { ko: '필요한 실 무게',  en: 'Yarn needed' },
  yarnLength:    { ko: '필요한 실 길이',  en: 'Yarn length needed' },
  ballLength:    { ko: '한 볼 길이',      en: 'Metres per ball' },
  ballWeight:    { ko: '한 볼 무게',      en: 'Grams per ball' },
  balls:         { ko: '볼 개수',         en: 'Balls' },
  spare:         { ko: '여유',            en: 'Spare' },
  metrePerGram:  { ko: 'g당 길이',        en: 'Metres per gram' },
  wpi:           { ko: 'WPI(1인치 감김)', en: 'Wraps per inch' },
  yarnClass:     { ko: '실 굵기 번호',    en: 'Yarn weight number' },
  headCirc:      { ko: '머리둘레',        en: 'Head circumference' },
  negEase:       { ko: '음수 여유',       en: 'Negative ease' },
  startSts:      { ko: '시작 코',         en: 'Starting stitches' },
  endSts:        { ko: '끝 코',           en: 'Ending stitches' },
  everyRows:     { ko: '몇 단마다',       en: 'Every n rows' },
  decreases:     { ko: '줄임 횟수',       en: 'Decrease rounds' },

  /* ───────── 재봉·천 ───────── */
  boltWidth:     { ko: '원단 폭',         en: 'Fabric width' },
  fabricLength:  { ko: '필요 원단 길이',  en: 'Fabric needed' },
  pieceW:        { ko: '조각 폭',         en: 'Piece width' },
  pieceH:        { ko: '조각 길이',       en: 'Piece length' },
  pieceCount:    { ko: '조각 수',         en: 'Pieces needed' },
  piecesOut:     { ko: '나오는 조각 수',  en: 'Pieces you get' },
  perRow:        { ko: '한 줄에',         en: 'Per row' },
  seamAllow:     { ko: '시접',            en: 'Seam allowance' },
  cutW:          { ko: '재단 폭',         en: 'Cut width' },
  cutH:          { ko: '재단 길이',       en: 'Cut length' },
  gatherRatio:   { ko: '개더 비율',       en: 'Gather ratio' },
  finishedLen:   { ko: '완성 길이',       en: 'Finished length' },
  elasticLen:    { ko: '고무줄 길이',     en: 'Elastic length' },
  stretchPct:    { ko: '당김 비율',       en: 'Stretch' },
  beforeWash:    { ko: '세탁 전',         en: 'Before washing' },
  afterWash:     { ko: '세탁 후',         en: 'After washing' },
  shrinkPct:     { ko: '수축률',          en: 'Shrinkage' },
  extraNeeded:   { ko: '더 사야 하는 양', en: 'Extra to buy' },
  scalePct:      { ko: '배율',            en: 'Scale' },
  scaledLen:     { ko: '바뀐 치수',       en: 'Scaled measurement' },

  /* ───────── 퀼트·자수 ───────── */
  quiltW:        { ko: '퀼트 폭',         en: 'Quilt width' },
  quiltH:        { ko: '퀼트 길이',       en: 'Quilt length' },
  bindingLen:    { ko: '바인딩 길이',     en: 'Binding length' },
  stripW:        { ko: '스트립 폭',       en: 'Strip width' },
  strips:        { ko: '스트립 수',       en: 'Strips to cut' },
  backingLen:    { ko: '뒷천 길이',       en: 'Backing needed' },
  overhang:      { ko: '여유(한 변)',     en: 'Overhang per side' },
  battingArea:   { ko: '솜 면적',         en: 'Batting area' },
  blockSize:     { ko: '블록 크기',       en: 'Block size' },
  blocksW:       { ko: '가로 블록 수',    en: 'Blocks across' },
  blocksH:       { ko: '세로 블록 수',    en: 'Blocks down' },
  blocks:        { ko: '블록 수',         en: 'Blocks' },
  hstFinished:   { ko: '완성 HST 크기',   en: 'Finished HST size' },
  hstCut:        { ko: '재단 정사각 크기', en: 'Cut squares at' },
  aidaCount:     { ko: '아이다 카운트',   en: 'Fabric count' },
  chartW:        { ko: '도안 가로 코',    en: 'Chart stitches across' },
  chartH:        { ko: '도안 세로 코',    en: 'Chart stitches down' },
  designW:       { ko: '완성 가로',       en: 'Design width' },
  designH:       { ko: '완성 세로',       en: 'Design height' },
  stitchCount:   { ko: '스티치 수',       en: 'Stitch count' },
  flossLen:      { ko: '실 길이',         en: 'Floss length' },
  strandCount:   { ko: '가닥 수',         en: 'Strands' },

  /* ───────── 양초 ───────── */
  containerVol:  { ko: '용기 부피',       en: 'Container volume' },
  waxDensity:    { ko: '왁스 밀도',       en: 'Wax density' },
  waxWeight:     { ko: '왁스 무게',       en: 'Wax needed' },
  fillPct:       { ko: '채우는 비율',     en: 'Fill level' },
  candleCount:   { ko: '양초 개수',       en: 'Candles' },
  fragrancePct:  { ko: '향 비율',         en: 'Fragrance load' },
  fragranceWt:   { ko: '향료 무게',       en: 'Fragrance oil' },
  totalBatch:    { ko: '전체 무게',       en: 'Total batch' },
  burnRate:      { ko: '시간당 소모',     en: 'Burn rate' },
  burnHours:     { ko: '연소 시간',       en: 'Burn time' },
  vesselD:       { ko: '용기 지름',       en: 'Container diameter' },
  vesselH:       { ko: '용기 높이',       en: 'Container height' },
  baseWeight:    { ko: '베이스 무게',     en: 'Soap base needed' },
  unitCost:      { ko: '개당 원가',       en: 'Cost per piece' },

  /* ───────── 비누·수지 ───────── */
  oilWeight:     { ko: '오일 무게',       en: 'Oil weight' },
  sapValue:      { ko: 'SAP 값',          en: 'SAP value' },
  superfat:      { ko: '슈퍼팻',          en: 'Superfat' },
  lyeWeight:     { ko: '가성소다 무게',   en: 'Lye needed' },
  lyePurity:     { ko: '가성소다 순도',   en: 'Lye purity' },
  waterRatio:    { ko: '물:소다 비율',    en: 'Water : lye ratio' },
  waterWeight:   { ko: '물 무게',         en: 'Water' },
  batchTotal:    { ko: '반죽 총량',       en: 'Batter total' },
  recipeScale:   { ko: '레시피 배율',     en: 'Recipe scale' },
  mouldVol:      { ko: '몰드 부피',       en: 'Mould volume' },
  resinDensity:  { ko: '수지 밀도',       en: 'Resin density' },
  resinWeight:   { ko: '수지 무게',       en: 'Resin needed' },
  mixRatioA:     { ko: '혼합비 A',        en: 'Ratio part A' },
  mixRatioB:     { ko: '혼합비 B',        en: 'Ratio part B' },
  partA:         { ko: 'A제 양',          en: 'Part A' },
  partB:         { ko: 'B제 양',          en: 'Part B' },
  pigmentPct:    { ko: '색소 비율',       en: 'Pigment load' },
  pigmentWt:     { ko: '색소 양',         en: 'Pigment' },
  modelVol:      { ko: '원형 부피',       en: 'Model volume' },
  siliconeWt:    { ko: '실리콘 무게',     en: 'Silicone needed' },

  /* ───────── 구슬·장식 ───────── */
  beadD:         { ko: '구슬 지름',       en: 'Bead diameter' },
  strandLen:     { ko: '줄 길이',         en: 'Strand length' },
  beadCount:     { ko: '구슬 개수',       en: 'Beads' },
  beadWt:        { ko: '구슬 1개 무게',   en: 'Weight per bead' },
  totalBeadWt:   { ko: '구슬 총 무게',    en: 'Total bead weight' },
  wireD:         { ko: '와이어 지름',     en: 'Wire diameter' },
  mandrelD:      { ko: '심 지름',         en: 'Mandrel diameter' },
  ringCount:     { ko: '링 개수',         en: 'Rings' },
  wireLen:       { ko: '와이어 길이',     en: 'Wire length' },
  wraps:         { ko: '감는 횟수',       en: 'Wraps' },
  knotLen:       { ko: '매듭 구간 길이',  en: 'Knotted length' },
  cordMultiple:  { ko: '코드 배수',       en: 'Cord multiple' },
  cordLen:       { ko: '코드 길이',       en: 'Cord length' },
  cordCount:     { ko: '코드 가닥 수',    en: 'Cords' },
  boxW:          { ko: '상자 폭',         en: 'Box width' },
  boxD:          { ko: '상자 깊이',       en: 'Box depth' },
  boxH:          { ko: '상자 높이',       en: 'Box height' },
  wrapW:         { ko: '포장지 폭',       en: 'Paper width' },
  wrapH:         { ko: '포장지 길이',      en: 'Paper length' },
  ribbonLen:     { ko: '리본 길이',       en: 'Ribbon length' },
  clayDensity:   { ko: '점토 밀도',       en: 'Clay density' },
  clayWeight:    { ko: '점토 무게',       en: 'Clay needed' },
};

export const CRAFT_UNITS: Record<string, Term> = {
  stsPer10:  { ko: '코/10cm', en: 'sts/10 cm' },
  rowsPer10: { ko: '단/10cm', en: 'rows/10 cm' },
  sts:       { ko: '코',      en: 'sts' },
  row:       { ko: '단',      en: 'rows' },
  ball:      { ko: '볼',      en: 'balls' },
  gPerCm3:   { ko: 'g/㎤',    en: 'g/cm³' },
  sheet:     { ko: '장',      en: '' },
  strip:     { ko: '줄',      en: '' },
  block:     { ko: '개',      en: '' },
  gPerHour:  { ko: 'g/시간',  en: 'g/h' },
  candle:    { ko: '개',      en: '' },
  bead:      { ko: '개',      en: '' },
  ring:      { ko: '개',      en: '' },
  cord:      { ko: '가닥',    en: '' },
};
