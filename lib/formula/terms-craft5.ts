/**
 * 공예 다섯째 묶음의 용어(ko·en) — 코바늘 12종과 재봉 마감·피팅 12종이 쓴다.
 *
 * 여기 있는 것은 "다른 어느 terms 파일에도 없는 열쇠"뿐이다. 뜻이 같으면 그대로
 * 물려 쓴다 — 게이지는 stitchGauge, 완성 폭·길이는 targetWidth·targetLength,
 * 코 수는 stitches, 시작 코는 startSts, 완성 둘레는 finishedCirc, 시접은
 * seamAllow, 재단 치수는 cutW·cutH, 차이는 diff, 남은 양은 remaining,
 * 둘레는 perimeter, 반지름은 radius, 지름은 diameter다. 같은 뜻에 두 번째
 * 이름을 붙이면 같은 값이 페이지마다 다른 말로 나온다.
 *
 * 반대로 코바늘에는 대바늘에 없는 개념이 있어서 새로 만든다. 사슬(chain)은
 * 코가 아니라 코를 놓을 바탕이고, 게이지가 코와 따로 잡힌다 — 그래서
 * chainGauge를 stitchGauge와 갈라 둔다. 두 값이 어긋나는 것이 코바늘에서 제일
 * 흔한 실패이므로 한 이름으로 묶으면 그 실패가 안 보인다. 라운드도 rows와
 * 갈라 rounds로 둔다. 평면으로 왕복하는 단과 중심에서 돌려 나가는 라운드는
 * 코가 늘어나는 방식이 다르다.
 *
 * 모티브는 blockSize·blocksW를 빌리지 않는다. 저쪽은 퀼트 블록이고 라벨이
 * '블록'인데, 코바늘 쪽에서 그 말을 쓰는 사람은 없다 — squareSize·squaresAcross로
 * 따로 뒀다. 실패도 spoolLen을 빌리지 않고 coneLen을 만들었다. 콘은 5,000m
 * 단위로 파는 다른 물건이라 '실패 하나 길이'라는 라벨이 답을 흐린다.
 *
 * 단위는 둘만 새로 만든다. round(단)는 라운드를 세고, cone(개)은 콘을 센다.
 * piece·hour·sheet는 다시 정의하지 않는다 — /rate와 퀼트 쪽 라벨이 조용히
 * 바뀐다.
 */
import type { Term } from './terms.ts';

export const CRAFT5_TERMS: Record<string, Term> = {
  /* ───────── 코바늘 — 사슬·게이지 ───────── */
  turnCh:            { ko: '기둥 코(사슬)',        en: 'Turning chain' },
  chainCount:        { ko: '사슬 코 수',           en: 'Chain stitches' },
  chainGauge:        { ko: '10cm 사슬 코 수',      en: 'Chains per 10 cm' },
  chainLen:          { ko: '사슬 길이',            en: 'Chain length' },
  stitchHeightRatio: { ko: '코 높이 배수',         en: 'Stitch height in stitch widths' },
  rowHeight:         { ko: '한 단 높이',           en: 'Row height' },
  rounds:            { ko: '라운드 수',            en: 'Rounds' },
  roundsNeeded:      { ko: '필요한 라운드 수',     en: 'Rounds needed' },

  /* ───────── 코바늘 — 모티브·담요 ───────── */
  roundDepth:        { ko: '한 라운드 폭',         en: 'Growth per round' },
  squareSize:        { ko: '모티브 한 변',         en: 'Square size' },
  joinW:             { ko: '이음 폭',              en: 'Join width' },
  squaresAcross:     { ko: '가로 모티브 수',       en: 'Squares across' },
  squaresDown:       { ko: '세로 모티브 수',       en: 'Squares down' },
  squareCount:       { ko: '모티브 개수',          en: 'Squares needed' },
  joinedW:           { ko: '이어 붙인 폭',         en: 'Width once joined' },

  /* ───────── 코바늘 — 늘림·테두리 ───────── */
  incRounds:         { ko: '늘림 라운드 수',       en: 'Increase rounds' },
  increases:         { ko: '늘림 코 수',           en: 'Increases' },
  everyNSts:         { ko: '몇 코마다',            en: 'Every n stitches' },
  leftoverSts:       { ko: '남는 코',              en: 'Leftover stitches' },
  borderSts:         { ko: '테두리 코 수',         en: 'Border stitches' },
  cornerSts:         { ko: '모서리 코 수',         en: 'Corner stitches' },
  cornerExtra:       { ko: '모서리 한 곳 추가 코', en: 'Extra stitches per corner' },

  /* ───────── 코바늘 — 실·바늘 ───────── */
  swatchStitches:    { ko: '시험 뜨기 코 수',      en: 'Stitches in the swatch' },
  swatchYarnLen:     { ko: '시험 뜨기에 쓴 실',    en: 'Yarn the swatch used' },
  projectStitches:   { ko: '작품 전체 코 수',      en: 'Stitches in the project' },
  yarnPerStitch:     { ko: '한 코에 드는 실',      en: 'Yarn per stitch' },
  knitYarnWt:        { ko: '대바늘로 뜰 때 실',    en: 'Yarn if knitted' },
  crochetExtraPct:   { ko: '코바늘 추가 비율',     en: 'Extra crochet takes' },
  crochetYarnWt:     { ko: '코바늘 실 무게',       en: 'Yarn if crocheted' },
  extraYarnWt:       { ko: '더 드는 실',           en: 'Extra yarn' },
  hookSize:          { ko: '코바늘 호수',          en: 'Hook size' },
  hookNeeded:        { ko: '필요한 호수',          en: 'Hook size needed' },
  stockHook:         { ko: '살 수 있는 호수',      en: 'Nearest hook sold' },
  hookChange:        { ko: '호수 변화',            en: 'Change in hook size' },
  hookMin:           { ko: '호수 하단',            en: 'Smallest hook' },
  hookMax:           { ko: '호수 상단',            en: 'Largest hook' },

  /* ───────── 재봉 — 소매·허리·밑단 ───────── */
  armholeCirc:       { ko: '암홀 둘레',            en: 'Armhole circumference' },
  capEasePct:        { ko: '소매산 이즈 비율',     en: 'Sleeve cap ease' },
  capLen:            { ko: '소매산 길이',          en: 'Sleeve cap length' },
  easeAmt:           { ko: '분배할 이즈',          en: 'Ease to distribute' },
  easeCm:            { ko: '여유(cm)',             en: 'Ease (cm)' },
  overlapLen:        { ko: '겹침 길이',            en: 'Overlap' },
  bandWidth:         { ko: '밴드 완성 폭',         en: 'Finished band width' },
  hemEdgeLen:        { ko: '밑단 곡선 길이',       en: 'Hem edge length' },
  facingW:           { ko: '안단 폭',              en: 'Facing width' },
  facingLen:         { ko: '안단 길이',            en: 'Facing strip length' },
  innerEdgeLen:      { ko: '안쪽 변 길이',         en: 'Inner edge length' },

  /* ───────── 재봉 — 단추·심지·시접 ───────── */
  buttonD:           { ko: '단추 지름',            en: 'Button diameter' },
  buttonThick:       { ko: '단추 두께',            en: 'Button thickness' },
  holeEase:          { ko: '구멍 여유',            en: 'Buttonhole ease' },
  holeLen:           { ko: '단추 구멍 길이',       en: 'Buttonhole length' },
  ballHoleLen:       { ko: '둥근 단추일 때 길이',  en: 'Length for a ball button' },
  interfacedArea:    { ko: '심지 붙일 면적',       en: 'Area to interface' },
  fusibleW:          { ko: '심지 폭',              en: 'Interfacing width' },
  fusibleLen:        { ko: '필요한 심지 길이',     en: 'Interfacing needed' },
  firstPass:         { ko: '1차 박음 시접',        en: 'First pass' },
  secondPass:        { ko: '2차 박음 시접',        en: 'Second pass' },
  trimTo:            { ko: '다듬을 폭',            en: 'Trim to' },

  /* ───────── 재봉 — 바지·다트·수축·생산 ───────── */
  frontRise:         { ko: '앞 밑위 길이',         en: 'Front rise' },
  flySharePct:       { ko: '밑위 중 트임 비율',    en: 'Fly share of the rise' },
  flyLen:            { ko: '지퍼 트임 길이',       en: 'Fly opening length' },
  apexDist:          { ko: '다트 끝까지 길이',     en: 'Dart leg to the apex' },
  apexToHem:         { ko: '다트 끝에서 밑단까지', en: 'Apex to hem' },
  rotationDeg:       { ko: '회전 각도',            en: 'Rotation angle' },
  hemSwing:          { ko: '밑단이 벌어지는 양',   en: 'Hem swing' },
  shrinkLenPct:      { ko: '길이 방향 수축률',     en: 'Lengthwise shrinkage' },
  shrinkCrossPct:    { ko: '폭 방향 수축률',       en: 'Crosswise shrinkage' },
  coneLen:           { ko: '콘 하나 길이',         en: 'Metres per cone' },
  threadPerItem:     { ko: '한 벌에 드는 실',      en: 'Thread per garment' },
  runSize:           { ko: '만들 벌 수',           en: 'Garments in the run' },
  itemsPerCone:      { ko: '콘 하나로 만들 벌 수', en: 'Garments per cone' },
  conesNeeded:       { ko: '필요한 콘 개수',       en: 'Cones needed' },
  fullBust:          { ko: '실제 가슴둘레',        en: 'Full bust' },
  patternBust:       { ko: '도안 가슴둘레',        en: 'Pattern bust' },
  fbaTotal:          { ko: '전체 부족분',          en: 'Total difference' },
  fbaPerPiece:       { ko: '조각에 벌릴 양',       en: 'Spread per piece' },
  cordD:             { ko: '코드 지름',            en: 'Cord diameter' },
};

/* 단위는 둘만 새로 생겼다 — cm·mm·m·gram·percent·times·sts·row·ea·deg·cm2는 있는 것을 쓴다 */
export const CRAFT5_UNITS: Record<string, Term> = {
  round: { ko: '단', en: 'rnds' },
  cone:  { ko: '개', en: 'cones' },
};
