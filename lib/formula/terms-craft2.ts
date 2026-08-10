/**
 * 공예 섹션 둘째 묶음의 용어(ko·en) — 뜨개·재봉에서 새로 생긴 것만.
 *
 * 이미 있는 열쇠는 여기 다시 적지 않는다. 사전은 나중에 한 덩이로 합쳐지므로
 * 같은 열쇠를 다시 정의하면 뒤에 오는 쪽이 앞의 라벨을 조용히 덮는다 — 실제로
 * fabricWidth와 단위 piece가 그렇게 다른 섹션의 라벨을 바꿔 놓았다. 그래서
 * stitchGauge·targetWidth·cutW·finishedLen·boltWidth·chestCm·diff·totalLen처럼
 * 뜻이 같은 것은 그대로 물려 쓰고, 여기에는 없던 개념만 담는다.
 *
 * 이름을 일부러 길게 둔 것이 몇 개 있다. 용지는 sheetW가 아니라 printSheetW다 —
 * sheet는 단위로 이미 '장'이고, 밀랍 시트나 퀼트 조각을 세는 다른 도구가 같은
 * 이름을 쓸 자리가 있다. 배색 실도 mainWeight가 아니라 mainColourWt로 둔다.
 * 겹칠 만한 이름은 분야를 앞에 붙여 두는 편이 나중에 합칠 때 안전하다.
 *
 * 여유를 뜻하는 말이 셋으로 갈린다. negEase는 몸보다 작게 뜨는 비율(모자·양말),
 * easePct는 부호를 허용하는 옷의 여유(스웨터), zipAllow는 트임 위아래로 더 두는
 * 길이다. 하나로 합치면 부호와 단위가 섞여 절반이 틀린 값이 된다.
 */
import type { Term } from './terms.ts';

export const CRAFT2_TERMS: Record<string, Term> = {
  /* ───────── 뜨개 ───────── */
  origYardage:      { ko: '원래 실 100g당 길이',   en: 'Original yarn, m per 100 g' },
  subYardage:       { ko: '대체 실 100g당 길이',   en: 'Substitute yarn, m per 100 g' },
  patternBalls:     { ko: '도안의 볼 수',          en: 'Balls the pattern calls for' },
  easePct:          { ko: '여유 비율',             en: 'Ease' },
  finishedCirc:     { ko: '완성 둘레',             en: 'Finished circumference' },
  footCirc:         { ko: '발둘레',                en: 'Foot circumference' },
  repeatRows:       { ko: '반복 단 수',            en: 'Rows per repeat' },
  fullRepeats:      { ko: '반복 횟수',             en: 'Full repeats' },
  leftoverRows:     { ko: '남는 단',               en: 'Leftover rows' },
  mainColourPct:    { ko: '주 색 비율',            en: 'Main colour share' },
  mainColourWt:     { ko: '주 색 실 무게',         en: 'Main colour yarn' },
  contrastColourWt: { ko: '보조 색 실 무게',       en: 'Contrast colour yarn' },
  leftoverWt:       { ko: '남은 실 무게',          en: 'Yarn left' },
  metrePerRow:      { ko: '한 단에 드는 길이',     en: 'Metres per row' },
  rowsLeft:         { ko: '더 뜰 수 있는 단',      en: 'Rows left' },
  bedW:             { ko: '침대 폭',               en: 'Mattress width' },
  bedLen:           { ko: '침대 길이',             en: 'Mattress length' },
  dropLen:          { ko: '늘어뜨릴 길이',         en: 'Drop per side' },

  /* ───────── 재봉·부속 ───────── */
  openingLen:       { ko: '트임 길이',             en: 'Opening length' },
  zipAllow:         { ko: '트임 위아래 여유',      en: 'Allowance beyond the opening' },
  zipperLen:        { ko: '지퍼 사이즈',           en: 'Zipper size' },
  placketLen:       { ko: '단 길이',               en: 'Placket length' },
  buttonCount:      { ko: '단추 개수',             en: 'Buttons' },
  holeMargin:       { ko: '끝 여백',               en: 'Margin at each end' },
  holeGap:          { ko: '단추 구멍 간격',        en: 'Spacing between buttonholes' },
  holeSpan:         { ko: '구멍이 놓이는 구간',    en: 'Span the buttonholes cover' },
  pleatCount:       { ko: '주름 개수',             en: 'Pleats' },
  pleatDepth:       { ko: '주름 깊이',             en: 'Pleat depth' },
  pleatTake:        { ko: '주름이 먹는 폭',        en: 'Fabric the pleats consume' },
  foldCount:        { ko: '접는 횟수',             en: 'Fold count' },
  hemDepth:         { ko: '밑단 폭',               en: 'Hem depth' },
  hemTurn:          { ko: '접어 넘기는 몫',        en: 'Fabric turned under' },
  bigCirc:          { ko: '큰 둘레',               en: 'Larger circumference' },
  smallCirc:        { ko: '작은 둘레',             en: 'Smaller circumference' },
  dartCount:        { ko: '다트 개수',             en: 'Darts' },
  dartIntake:       { ko: '다트 하나가 집는 양',   en: 'Intake per dart' },
  dartLeg:          { ko: '중심선에서 한쪽',       en: 'Half-intake per leg' },
  rotatedLen:       { ko: '돌려 놓았을 때 길이',   en: 'Length if pieces are turned' },
  seamLen:          { ko: '박는 길이',             en: 'Seam length' },
  stitchPerCm:      { ko: '1cm당 땀 수',           en: 'Stitches per cm' },
  threadRatio:      { ko: '실 배수',               en: 'Thread per seam length' },
  threadLen:        { ko: '드는 실 길이',          en: 'Thread needed' },
  spoolLen:         { ko: '실패 하나 길이',        en: 'Metres per spool' },
  spools:           { ko: '실패 개수',             en: 'Spools' },
  printSheetW:      { ko: '용지 폭',               en: 'Sheet width' },
  printSheetH:      { ko: '용지 길이',             en: 'Sheet length' },
  stickerW:         { ko: '라벨 폭',               en: 'Label width' },
  stickerH:         { ko: '라벨 길이',             en: 'Label height' },
  printMargin:      { ko: '인쇄 여백',             en: 'Printer margin' },
  labelGap:         { ko: '라벨 사이 간격',        en: 'Gap between labels' },
  labelsPerSheet:   { ko: '한 장에서 나오는 라벨', en: 'Labels per sheet' },
  labelRows:        { ko: '세로 줄 수',            en: 'Rows down the sheet' },
  labelsTurned:     { ko: '90도 돌렸을 때',        en: 'Labels if turned 90°' },
};

/* 단위는 둘만 새로 생겼다 — 나머지는 cm·m·gram·row·sts·ea·ball·strip을 그대로 쓴다 */
export const CRAFT2_UNITS: Record<string, Term> = {
  stsPerCm: { ko: '땀/cm', en: 'sts/cm' },
  spool:    { ko: '개',    en: 'spools' },
};
