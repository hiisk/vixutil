/**
 * 자재 수량(생활 계산 셋째 묶음)의 용어(ko·en).
 *
 * 앞의 생활 계산이 "부피와 면적이 얼마인가"였다면 여기는 "그래서 몇 포대인가"다.
 * 그 사이를 잇는 것이 수율(포대당 몇 L, 묶음당 몇 ㎡, ㎡당 몇 kg)이므로 수율을
 * 입력 용어로 드러내 둔다 — 제품마다 다르고, 숨기면 남의 제품 답이 된다.
 *
 * 여유율은 기존 extraPct를, 깔 두께는 gravelDepth를 그대로 쓴다. 같은 개념에
 * 이름을 새로 지으면 /geometry 안에서만 두 가지 말이 생긴다.
 */
import type { Term } from './terms.ts';

/*
 * 단위 sheet·piece·kg은 이미 있는 것을 쓴다. 여기 새로 넣는 것은 포대·묶음·팩·
 * 스퀘어와 밀도(kg/㎥)뿐이다 — 이름이 겹치면 병합 순서상 다른 섹션의 라벨이
 * 조용히 바뀐다. ㎡당·1m당 같은 비율은 라벨에 이미 적어 두고 단위는 kg을 쓴다.
 */
export const GEO4_TERMS: Record<string, Term> = {
  /* ───────── 포대·수율 ───────── */
  bagCount:       { ko: '포대 수',            en: 'Bags needed' },
  bagYieldL:      { ko: '포대당 부피(L)',     en: 'Yield per bag (L)' },
  bagWeight:      { ko: '한 포대 무게(kg)',   en: 'Bag weight (kg)' },
  bagVolume:      { ko: '한 포대 부피(L)',    en: 'Bag volume (L)' },
  bagCover:       { ko: '포대당 시공 면적',   en: 'Area one bag covers' },

  /* ───────── 모르타르·줄눈·접착제 ───────── */
  mortarPerBrick: { ko: '벽돌 1장당 모르타르', en: 'Mortar per brick' },
  mortarVol:      { ko: '모르타르 부피',      en: 'Mortar volume' },
  jointWidth:     { ko: '줄눈 폭(mm)',        en: 'Joint width (mm)' },
  jointDepth:     { ko: '줄눈 깊이(mm)',      en: 'Joint depth (mm)' },
  groutDensity:   { ko: '줄눈재 밀도',        en: 'Grout density' },
  groutKg:        { ko: '줄눈재 무게',        en: 'Grout needed' },
  groutRate:      { ko: '㎡당 줄눈재',        en: 'Grout per m²' },
  adhesiveRate:   { ko: '㎡당 접착제',        en: 'Adhesive per m²' },
  adhesiveKg:     { ko: '접착제 무게',        en: 'Adhesive needed' },

  /* ───────── 벽지 무늬 ───────── */
  patternRepeat:  { ko: '무늬 반복 길이(cm)', en: 'Pattern repeat (cm)' },
  dropsPerRoll:   { ko: '롤당 폭 수',         en: 'Drops per roll' },
  extraRolls:     { ko: '무늬로 더 드는 롤',  en: 'Extra rolls from the repeat' },

  /* ───────── 지붕 슁글 ───────── */
  bundleCover:    { ko: '묶음당 시공 면적',   en: 'Coverage per bundle' },
  bundleCount:    { ko: '묶음 수',            en: 'Bundles needed' },
  ridgeLen:       { ko: '능선·귀마루 길이',   en: 'Ridge and hip length' },
  squares:        { ko: '스퀘어',             en: 'Squares' },

  /* ───────── 바닥·판재 ───────── */
  packCover:      { ko: '팩당 시공 면적',     en: 'Coverage per pack' },
  packCount:      { ko: '팩 수',              en: 'Packs needed' },
  plankLen:       { ko: '판 한 장 길이',      en: 'Plank length' },
  offcut:         { ko: '줄 끝 남는 조각',    en: 'Offcut at the row end' },
  sheetWidth:     { ko: '판 폭(mm)',          en: 'Sheet width (mm)' },
  sheetLength:    { ko: '판 길이(mm)',        en: 'Sheet length (mm)' },
  sheetCount:     { ko: '필요한 판 수',       en: 'Sheets needed' },
  compoundRate:   { ko: '이음선 1m당 퍼티',   en: 'Compound per metre of joint' },
  compoundKg:     { ko: '퍼티 무게',          en: 'Joint compound' },
  tapeLen:        { ko: '조인트 테이프 길이', en: 'Joint tape' },

  /* ───────── 걸레받이 ───────── */
  doorWidth:      { ko: '문 개구부 폭',       en: 'Door opening width' },
  doorCount:      { ko: '문 개수',            en: 'Door openings' },
  stockLen:       { ko: '한 자루 길이',       en: 'Stock length' },
  stockCount:     { ko: '사야 할 자루 수',    en: 'Lengths to buy' },
  skirtLen:       { ko: '걸레받이 길이',      en: 'Skirting needed' },

  /* ───────── 모래 ───────── */
  sandDensity:    { ko: '모래 밀도',          en: 'Sand density' },
  sandKg:         { ko: '모래 무게',          en: 'Sand needed' },
};

export const GEO4_UNITS: Record<string, Term> = {
  bag:      { ko: '포대',   en: 'bags' },
  bundle:   { ko: '묶음',   en: 'bundles' },
  pack:     { ko: '팩',     en: 'packs' },
  square:   { ko: '스퀘어', en: 'squares' },
  kgPerM3:  { ko: 'kg/㎥',  en: 'kg/m³' },
};
