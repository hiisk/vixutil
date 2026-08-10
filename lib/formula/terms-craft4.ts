/**
 * 공예 섹션 확장분의 용어(ko·en) — 비누·수지 8종, 구슬·포장 8종이 쓴다.
 *
 * 여기 있는 것은 "다른 어느 terms 파일에도 없는 열쇠"뿐이다. 이미 있는 개념은
 * 새로 만들지 않고 그대로 쓴다 — 오일 무게는 oilWeight, 물 무게는 waterWeight,
 * 상자 치수는 boxW·boxD·boxH, 여유는 spare, 손목둘레는 wristCm다. 같은 뜻에
 * 두 번째 이름을 붙이면 같은 값이 페이지마다 다른 말로 나온다.
 *
 * 반대로 뜻이 다르면 반드시 갈라 둔다. 세 가지 오일을 한 화면에서 받으려면
 * 칸마다 이름이 달라야 하므로 oilWeight·sapValue를 세 번 쓰지 못하고
 * oil1Wt~oil3Sap을 새로 뒀다. rollWidth는 이미 /geometry의 벽지 도구가
 * '벽지 폭(cm)'으로 쓰고 있어서 완충재 롤에 쓰면 저쪽 라벨이 벽지가 아닌 것을
 * 가리키게 된다 — 그래서 wrapRollW를 따로 만들었다. 봉투도 wrapW·wrapH(포장지
 * 폭·길이)를 빌리지 않고 mailerW·mailerL로 뒀다. 포장지는 둘러 감는 종이고
 * 봉투는 안에 넣는 자루라, 한 이름으로 묶으면 같은 라벨이 두 가지를 뜻한다.
 *
 * 단위는 layer(겹)와 link(개)만 새로 만든다. day·sheet·ea·bead·gram·mm는
 * 이미 있는 것을 쓴다 — 특히 piece를 다시 정의하지 않는다. /rate가 '개'로
 * 쓰고 있어서 뜻을 덮으면 그쪽 결과가 조용히 바뀐다.
 */
import type { Term } from './terms.ts';

export const CRAFT4_TERMS: Record<string, Term> = {
  /* ───────── 비누 (여러 오일·물 감량·몰드·건조) ───────── */
  oil1Wt:        { ko: '오일 1 무게',      en: 'Oil 1 weight' },
  oil1Sap:       { ko: '오일 1 SAP 값',    en: 'Oil 1 SAP value' },
  oil2Wt:        { ko: '오일 2 무게',      en: 'Oil 2 weight' },
  oil2Sap:       { ko: '오일 2 SAP 값',    en: 'Oil 2 SAP value' },
  oil3Wt:        { ko: '오일 3 무게',      en: 'Oil 3 weight' },
  oil3Sap:       { ko: '오일 3 SAP 값',    en: 'Oil 3 SAP value' },
  blendSap:      { ko: '배합 평균 SAP',    en: 'Blend SAP value' },
  waterDiscount: { ko: '물 감량률',        en: 'Water discount' },
  lyeSolution:   { ko: '소다액 무게',      en: 'Lye solution weight' },
  batterDensity: { ko: '반죽 밀도',        en: 'Batter density' },
  lyePctOfOil:   { ko: '오일 대비 소다 비율', en: 'Lye as share of oil' },
  curedDays:     { ko: '지난 날수',        en: 'Days since making' },
  targetCure:    { ko: '목표 건조 일수',   en: 'Target cure days' },
  curePct:       { ko: '건조 진행률',      en: 'Cured' },

  /* ───────── 수지 (코팅·돔·색 분배·실리콘) ───────── */
  resinVol:      { ko: '수지 부피',        en: 'Resin volume' },
  domeH:         { ko: '돔 높이',          en: 'Dome height' },
  colours:       { ko: '색 수',            en: 'Colours' },
  mainSharePct:  { ko: '주색 비율',        en: 'Main colour share' },
  mainCupWt:     { ko: '주색 컵 무게',     en: 'Main colour cup' },
  cupWeight:     { ko: '나머지 컵 무게',   en: 'Each other cup' },
  catalystPct:   { ko: '촉매 비율',        en: 'Catalyst share' },

  /* ───────── 구슬·장식 ───────── */
  claspLen:      { ko: '잠금장치 몫',      en: 'Clasp allowance' },
  linkLen:       { ko: '링크 한 칸 길이',  en: 'Link length' },
  linkCount:     { ko: '링크 개수',        en: 'Links' },
  loopAllow:     { ko: '고리 여유',        en: 'Loop allowance' },

  /* ───────── 포장 (완충재·박엽지·매듭·봉투) ───────── */
  layers:        { ko: '감는 겹 수',       en: 'Wrap layers' },
  wrapRollW:     { ko: '롤 폭',            en: 'Roll width' },
  wrapLen:       { ko: '완충재 길이',      en: 'Wrap length' },
  sheetsPer:     { ko: '상자당 장수',      en: 'Sheets per parcel' },
  loops:         { ko: '고리 수',          en: 'Loops' },
  loopLen:       { ko: '고리 길이',        en: 'Loop length' },
  tailLen:       { ko: '꼬리 길이',        en: 'Tail length' },
  mailerW:       { ko: '봉투 폭',          en: 'Mailer width' },
  mailerL:       { ko: '봉투 길이',        en: 'Mailer length' },
};

export const CRAFT4_UNITS: Record<string, Term> = {
  layer: { ko: '겹', en: '' },
  link:  { ko: '개', en: '' },
};
