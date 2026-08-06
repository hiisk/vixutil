import { CATS } from './calculator-catalog';
import { TESTS } from './test-data';
import { QUIZZES } from './quiz-data';
import { GENERATORS } from './generator-data';
import { CHECKLISTS } from './checklist-data';
import { RANDOM_TOOLS } from './random-tools';
import { DEVICE_TOOLS } from './device-tools';
import { IMAGE_TOOLS } from './image-tools';
import { TEXT_TOOLS } from './text-tools';
import { GAME_TOOLS } from './game-tools';
import { COLOR_TOOLS } from './color-tools';
import { TIME_TOOLS } from './time-tools';
import { SOUND_TOOLS } from './sound-tools';
import { FOOD_TOOLS } from './food-tools';
import { CONVERT_TOOLS } from './convert-tools';
import { RATE_TOOLS } from './rate-tools';
import { BODY_TOOLS } from './body-tools';
import { GEO_TOOLS } from './geo-tools';
import { COUNTRIES } from './country-tools';
import { IDIOMS } from './hanja-tools';
import { METRO_LINES } from './metro-lines';
import { lineIcon, lineTitle } from './metro/types';
import { MUSIC_ITEMS, iconOf, symbolOf, titleOf } from './music/catalog';
import { NAMED_COLORS_8 } from './color/named8';
import { INGREDIENTS } from './food/ingredients8';
import { TIME_CITIES, timeCountry } from './time/cities8';
import { SCREENS, SCREEN_ICON } from './device/screens';
import { LENSES, LENS_ICON } from './lens/list';
import { ALGS, CUBE_ICON } from './cube/list';
import { ROLLS, DICE_ICON } from './dice/list';
import { PATTERNS, REGEX_ICON } from './regex/list';
import { ELEMENTS, ELEMENT_ICON } from './element/list';
import { NUMBERS, NUMBER_ICON } from './number/list';
import { CODES, ASCII_ICON } from './ascii/list';
import { PORTS, PORT_ICON } from './port/list';
import { MODES, CHMOD_ICON } from './chmod/list';
import { VALUES as RESISTOR_VALUES, RESISTOR_ICON } from './resistor/list';
import { FRACTIONS, FRACTION_ICON, slugOf as fractionSlug } from './fraction/list';
import { KEYS, KEYCODE_ICON, slugOf as keySlug } from './keycode/list';
import { PREFIXES, CIDR_ICON, slugOf as cidrSlug } from './cidr/list';
import { CHARS as CODE_CHARS, CODE_ICON, charSlug } from './code/list';
import { SCORES as DARTS_SCORES, DARTS_ICON } from './darts/list';
import { PRODUCTS, TIMES_ICON, slugOf as timesSlug } from './times/list';
import { NUMBERS as SQRT_NUMBERS, SQRT_ICON } from './sqrt/list';
import { ROMAN_ICON, YEARS as ROMAN_YEARS } from './roman/list';
import { TIRES, TIRE_ICON, labelOf as tireLabel, slugOf as tireSlug } from './tire/list';
import { SCREWS, SCREW_ICON, labelOf as screwLabel, slugOf as screwSlug } from './screw/list';
import { YEARS as CAL_YEARS, YEAR_ICON } from './year/list';
import { PACES, PACE_ICON, labelOf as paceLabel, slugOf as paceSlug } from './pace/list';
import { PIXELS, PX_ICON } from './rem/list';
import { SPEEDS, STOP_ICON } from './stop/list';
import { ALTITUDES, ALTITUDE_ICON } from './altitude/list';
import { CHANNELS, WIFI_ICON, labelOf as wifiLabel, slugOf as wifiSlug } from './wifi/list';
import { FRET_ICON, SPOTS, slugOf as fretSlug } from './fret/list';
import { GRAVITY_ICON, WEIGHTS } from './gravity/list';
import { CELLS as WC_CELLS, WINDCHILL_ICON, slugOf as wcSlug } from './windchill/list';
import { CELLS as DEW_CELLS, DEW_ICON, slugOf as dewSlug } from './dew/list';
import { BITS, DRILL_ICON, slugOf as drillSlug } from './drill/list';
import { BANDWIDTH_ICON, CELLS as BW_CELLS, sizeLabel as bwSize, slugOf as bwSlug } from './bandwidth/list';
import { BATTERY_ICON, CELLS as BATT_CELLS, slugOf as battSlug } from './battery/list';
import { CELLS as WIRE_CELLS, WIRE_ICON, sizeLabel as wireLabel, slugOf as wireSlug } from './wire/list';
import { CELLS as PAPER_CELLS, PAPER_ICON, slugOf as paperSlug } from './paper/list';
import { CELLS as TORQUE_CELLS, TORQUE_ICON, gradeOf as torqueGrade, sizeLabel as torqueSize, slugOf as torqueSlug } from './torque/list';
import { CELLS as LUMEN_CELLS, LUMEN_ICON, slugOf as lumenSlug } from './lumen/list';
import { AMPERE_ICON, CELLS as AMP_CELLS, applianceOf, circuitOf, slugOf as ampSlug } from './ampere/list';
import { CELLS as UV_CELLS, UV_ICON, skinOf, slugOf as uvSlug } from './uv/list';
import { CELLS as HIKE_CELLS, HIKE_ICON, slugOf as hikeSlug } from './hike/list';
import { CELLS as INSUL_CELLS, INSUL_ICON, slugOf as insulSlug } from './insul/list';
import { AIR_ICON, CELLS as AIR_CELLS, pollutantOf, slugOf as airSlug } from './air/list';
import { OPENINGS, CHESS_ICON } from './chess/list';
import { HANDS, POKER_ICON, labelOf } from './poker/list';
import { handFacts } from './poker/facts';
import { fullName } from './chess/names';
import { elementFacts } from './element/facts';
import { factorText, numberFacts } from './number/facts';
import { asciiFacts } from './ascii/facts';
import { portFacts } from './port/facts';
import { chmodFacts } from './chmod/facts';
import { resistorFacts } from './resistor/facts';
import { fractionFacts } from './fraction/facts';
import { keyFacts } from './keycode/facts';
import { cidrFacts } from './cidr/facts';
import { charFacts } from './code/facts';
import { dartsFacts } from './darts/facts';
import { timesFacts } from './times/facts';
import { sqrtFacts } from './sqrt/facts';
import { romanFacts } from './roman/facts';
import { tireFacts } from './tire/facts';
import { screwFacts } from './screw/facts';
import { yearFacts } from './year/facts';
import { paceFacts } from './pace/facts';
import { pxFacts } from './rem/facts';
import { stopFacts } from './stop/facts';
import { altitudeFacts } from './altitude/facts';
import { wifiFacts } from './wifi/facts';
import { fretFacts, nameOf as fretNote } from './fret/facts';
import { gravityFacts } from './gravity/facts';
import { windchillFacts } from './windchill/facts';
import { dewFacts } from './dew/facts';
import { drillFacts } from './drill/facts';
import { bandwidthFacts } from './bandwidth/facts';
import { batteryFacts } from './battery/facts';
import { wireFacts } from './wire/facts';
import { paperFacts } from './paper/facts';
import { torqueFacts } from './torque/facts';
import { lumenFacts } from './lumen/facts';
import { ampereFacts } from './ampere/facts';
import { uvFacts } from './uv/facts';
import { hikeFacts } from './hike/facts';
import { insulFacts } from './insul/facts';
import { airFacts } from './air/facts';
import { YEAR_UI } from './year/ui';
import { nameOf } from './element/names';
import { whatOf } from './regex/desc';
import { rollFacts } from './dice/facts';
import { caseFacts } from './cube/facts';
import { lensFacts } from './lens/facts';
import { FREQS, FREQ_ICON, freqSlug } from './sound/freqs';
import { EXTS, EXT_ICON } from './ext/list';
import { CARDS, TAROT_ICON } from './tarot/deck';
import { GLYPHS, GLYPH_ICON } from './glyph/list';
import { TAGS, TAG_ICON } from './html/tags';
import { CSS_PROPS, CSS_ICON } from './css/props';
import { HTTP_ITEMS, HTTP_ICON } from './http/list';
import { httpDesc } from './http/desc';
import { propDesc } from './css/desc';
import { IMG_SIZES, IMG_SIZE_ICON } from './imgsize/list';
import { sizeFacts } from './imgsize/facts';
import { tagDesc } from './html/desc';
import { glyphFacts } from './glyph/facts';
import { cardView } from './tarot/facts';
import { extFacts } from './ext/facts';
import { freqFacts } from './sound/facts';
import { screenFacts } from './device/facts';
import { foodFacts } from './food/facts';

/**
 * 사이트 전체 검색 인덱스.
 *
 * 지금까지는 섹션별 허브에만 검색이 있어서, "실업급여"를 찾으려면 그게 계산기에
 * 있다는 걸 미리 알아야 했다. 실제로는 계산기와 체크리스트 양쪽에 있는데도.
 * 어느 섹션에 있는지 모르는 사용자는 찾을 방법이 없었다.
 *
 * 검색 페이지에서만 쓴다 — 홈에 실으면 랜딩 페이지가 무거워진다.
 */
export type Section = 'calculator' | 'test' | 'quiz' | 'generator' | 'checklist' | 'fortune' | 'snap' | 'random' | 'device' | 'image' | 'text' | 'game' | 'color' | 'time' | 'sound' | 'food' | 'convert' | 'rate' | 'body' | 'geometry' | 'country' | 'hanja' | 'metro' | 'music' | 'ext' | 'html' | 'css' | 'http' | 'element' | 'chess' | 'poker' | 'number' | 'ascii' | 'port' | 'chmod' | 'resistor' | 'fraction' | 'keycode' | 'cidr' | 'code' | 'darts' | 'times' | 'sqrt' | 'roman' | 'tire' | 'screw' | 'year' | 'pace' | 'rem' | 'stop' | 'altitude' | 'wifi' | 'fret' | 'gravity' | 'windchill' | 'dew' | 'drill' | 'bandwidth' | 'battery' | 'wire' | 'paper' | 'torque' | 'lumen' | 'ampere' | 'uv' | 'hike' | 'insul' | 'air';

export interface SearchItem {
  href: string;
  title: string;
  desc: string;
  section: Section;
  icon: string;
}

export const SECTION_META: Record<Section, { label: string; icon: string; accent: string }> = {
  calculator: { label: '계산기',     icon: '📊', accent: 'bg-blue-50 text-blue-700 border-blue-200' },
  test:       { label: '심리 테스트', icon: '🧭', accent: 'bg-violet-50 text-violet-700 border-violet-200' },
  quiz:       { label: '퀴즈',       icon: '🏆', accent: 'bg-amber-50 text-amber-700 border-amber-200' },
  generator:  { label: '생성기',     icon: '✨', accent: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  checklist:  { label: '체크리스트',  icon: '✅', accent: 'bg-sky-50 text-sky-700 border-sky-200' },
  fortune:    { label: '운세',       icon: '🔮', accent: 'bg-purple-50 text-purple-700 border-purple-200' },
  snap:       { label: '스냅테스트',  icon: '📸', accent: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200' },
  random:     { label: '랜덤 뽑기',   icon: '🎲', accent: 'bg-rose-50 text-rose-700 border-rose-200' },
  device:     { label: '기기 점검',   icon: '🧰', accent: 'bg-teal-50 text-teal-700 border-teal-200' },
  image:      { label: '이미지 도구', icon: '🖼️', accent: 'bg-violet-50 text-violet-700 border-violet-200' },
  text:       { label: '텍스트 도구', icon: '✍️', accent: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  game:       { label: '두뇌 게임', icon: '🕹️', accent: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  color:      { label: '색상 도구', icon: '🎨', accent: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200' },
  time:       { label: '시간 도구', icon: '⏰', accent: 'bg-sky-50 text-sky-700 border-sky-200' },
  sound:      { label: '소리 도구', icon: '🔊', accent: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  food:       { label: '계량·요리', icon: '🍳', accent: 'bg-amber-50 text-amber-700 border-amber-200' },
  convert:    { label: '단위 변환', icon: '🔄', accent: 'bg-blue-50 text-blue-700 border-blue-200' },
  rate:       { label: '비율 계산', icon: '📐', accent: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  body:       { label: '몸 수치', icon: '🩺', accent: 'bg-rose-50 text-rose-700 border-rose-200' },
  geometry:   { label: '도형·수학', icon: '📐', accent: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  country:    { label: '나라 정보', icon: '🧭', accent: 'bg-sky-50 text-sky-700 border-sky-200' },
  hanja:      { label: '사자성어', icon: '📖', accent: 'bg-amber-50 text-amber-700 border-amber-200' },
  metro:      { label: '지하철 퀴즈', icon: '🚇', accent: 'bg-slate-50 text-slate-700 border-slate-200' },
  music:      { label: '음악 이론', icon: '🎹', accent: 'bg-sky-50 text-sky-700 border-sky-200' },
  ext:        { label: '파일 확장자', icon: '📄', accent: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  html:       { label: 'HTML 태그', icon: '🪟', accent: 'bg-orange-50 text-orange-700 border-orange-200' },
  css:        { label: 'CSS 속성', icon: '🎨', accent: 'bg-blue-50 text-blue-700 border-blue-200' },
  http:       { label: 'HTTP 코드', icon: '🗄️', accent: 'bg-teal-50 text-teal-700 border-teal-200' },
  element:    { label: '원소',      icon: '⚛️', accent: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
  chess:      { label: '체스',      icon: '♟️', accent: 'bg-violet-50 text-violet-700 border-violet-200' },
  poker:      { label: '포커',      icon: '🃏', accent: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  number:     { label: '수',        icon: '🔢', accent: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  ascii:      { label: '아스키',    icon: '⌨️', accent: 'bg-teal-50 text-teal-700 border-teal-200' },
  port:       { label: '포트',      icon: '🔌', accent: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200' },
  chmod:      { label: '파일 권한',  icon: '🔒', accent: 'bg-orange-50 text-orange-700 border-orange-200' },
  resistor:   { label: '저항',      icon: '⚡', accent: 'bg-amber-50 text-amber-700 border-amber-200' },
  fraction:   { label: '분수',      icon: '➗', accent: 'bg-lime-50 text-lime-700 border-lime-200' },
  keycode:    { label: '키 코드',    icon: '🔑', accent: 'bg-slate-50 text-slate-700 border-slate-200' },
  cidr:       { label: '서브넷',    icon: '🌐', accent: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
  code:       { label: '부호',      icon: '📶', accent: 'bg-violet-50 text-violet-700 border-violet-200' },
  darts:      { label: '다트',      icon: '🎯', accent: 'bg-red-50 text-red-700 border-red-200' },
  times:      { label: '곱셈표',    icon: '🔢', accent: 'bg-teal-50 text-teal-700 border-teal-200' },
  sqrt:       { label: '제곱근',    icon: '📐', accent: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  roman:      { label: '로마 숫자',  icon: '🏛️', accent: 'bg-amber-50 text-amber-700 border-amber-200' },
  tire:       { label: '타이어',    icon: '🛞', accent: 'bg-slate-50 text-slate-700 border-slate-200' },
  screw:      { label: '나사',      icon: '🔩', accent: 'bg-zinc-50 text-zinc-700 border-zinc-200' },
  year:       { label: '연도',      icon: '📅', accent: 'bg-rose-50 text-rose-700 border-rose-200' },
  pace:       { label: '러닝 페이스', icon: '🏃', accent: 'bg-teal-50 text-teal-700 border-teal-200' },
  rem:        { label: 'CSS 단위',  icon: '📏', accent: 'bg-violet-50 text-violet-700 border-violet-200' },
  stop:       { label: '정지거리',  icon: '🚗', accent: 'bg-red-50 text-red-700 border-red-200' },
  altitude:   { label: '고도',      icon: '⛰️', accent: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
  wifi:       { label: '와이파이',  icon: '📶', accent: 'bg-blue-50 text-blue-700 border-blue-200' },
  fret:       { label: '기타 지판',  icon: '🎸', accent: 'bg-amber-50 text-amber-700 border-amber-200' },
  gravity:    { label: '천체 몸무게', icon: '🌍', accent: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  windchill:  { label: '체감온도',  icon: '❄️', accent: 'bg-sky-50 text-sky-700 border-sky-200' },
  dew:        { label: '이슬점',    icon: '💧', accent: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
  drill:      { label: '드릴 비트',  icon: '🔩', accent: 'bg-neutral-50 text-neutral-700 border-neutral-200' },
  bandwidth:  { label: '다운로드',   icon: '🔽', accent: 'bg-sky-50 text-sky-700 border-sky-200' },
  battery:    { label: '배터리 충전', icon: '🔋', accent: 'bg-green-50 text-green-700 border-green-200' },
  wire:       { label: '전선 굵기',  icon: '🔌', accent: 'bg-amber-50 text-amber-700 border-amber-200' },
  paper:      { label: '종이 규격',  icon: '📄', accent: 'bg-slate-50 text-slate-700 border-slate-200' },
  torque:     { label: '조임 토크',  icon: '🔧', accent: 'bg-orange-50 text-orange-700 border-orange-200' },
  lumen:      { label: '방 밝기',    icon: '💡', accent: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  ampere:     { label: '가전 전류',  icon: '⚡', accent: 'bg-amber-50 text-amber-700 border-amber-200' },
  uv:         { label: '자외선',     icon: '☀️', accent: 'bg-orange-50 text-orange-700 border-orange-200' },
  hike:       { label: '등산 시간',  icon: '⛰️', accent: 'bg-green-50 text-green-700 border-green-200' },
  insul:      { label: '단열재',     icon: '🧱', accent: 'bg-stone-50 text-stone-700 border-stone-200' },
  air:        { label: '대기질',     icon: '🌫️', accent: 'bg-slate-50 text-slate-700 border-slate-200' },
};

/**
 * 운세·스냅은 콘텐츠 데이터 배열이 아니라 각각 독립 페이지라 손으로 적는다.
 * 페이지가 실재하는지는 테스트가 검사한다.
 */
const FORTUNE_ITEMS: SearchItem[] = [
  { href: '/fortune/dream',  title: '꿈 해몽',      desc: '돼지·뱀·불 등 꿈에 나온 소재로 의미 찾기', section: 'fortune', icon: '🌙' },
  { href: '/fortune/saju',   title: '사주 분석',    desc: '생년월일로 사주 4주와 오행 균형 보기',    section: 'fortune', icon: '🔯' },
  { href: '/fortune/zodiac', title: '별자리 운세',  desc: '12별자리 오늘의 운세',                   section: 'fortune', icon: '⭐' },
  { href: '/fortune/animal', title: '띠 운세',      desc: '쥐·소·범 등 12띠 오늘의 운세',           section: 'fortune', icon: '🐉' },
  { href: '/fortune/tarot',  title: '타로 카드',    desc: '78장 풀덱에서 카드 뽑기',                section: 'fortune', icon: '🃏' },
  { href: '/fortune/mbti',   title: 'MBTI 운세',   desc: '16가지 성격 유형별 오늘의 운세',          section: 'fortune', icon: '🧠' },
  { href: '/fortune/blood-type', title: '혈액형 운세', desc: 'A·B·O·AB형 오늘의 운세',              section: 'fortune', icon: '🩸' },
  { href: '/fortune/biorhythm',  title: '바이오리듬', desc: '생년월일로 신체·감성·지성 리듬 그래프',  section: 'fortune', icon: '📈' },
  { href: '/fortune/name-match', title: '이름 궁합',  desc: '두 사람 이름 획수로 보는 궁합 점수',     section: 'fortune', icon: '💕' },
  { href: '/fortune/zodiac-match', title: '띠 궁합',  desc: '십이지 삼합·육합으로 보는 두 사람 궁합',  section: 'fortune', icon: '🐲' },
  { href: '/fortune/star-match',   title: '별자리 궁합', desc: '12별자리 원소로 보는 두 사람 궁합',       section: 'fortune', icon: '⭐' },
  { href: '/fortune/blood-match',  title: '혈액형 궁합', desc: 'A·B·O·AB형으로 보는 두 사람 궁합',       section: 'fortune', icon: '🩸' },
  { href: '/fortune/mbti-match',   title: 'MBTI 궁합',  desc: '16유형으로 보는 두 사람 궁합 점수',       section: 'fortune', icon: '🧠' },
  { href: '/fortune/daily',        title: '오늘의 종합운세', desc: '생년월일로 보는 오늘의 총운·연애·금전운', section: 'fortune', icon: '🔮' },
  { href: '/fortune/daily-tarot',  title: '오늘의 타로',   desc: '매일 바뀌는 오늘의 타로 카드 한 장',     section: 'fortune', icon: '🃏' },
  { href: '/fortune/tarot-yesno',  title: '타로 예스/노',  desc: '질문을 떠올리고 카드로 받는 예·아니오',   section: 'fortune', icon: '🔮' },
  { href: '/fortune/lucky-lotto',  title: '행운의 로또 번호', desc: '생년월일로 보는 오늘의 행운 번호',        section: 'fortune', icon: '🍀' },
  { href: '/fortune/birth-stone',  title: '탄생석·탄생화', desc: '태어난 달의 보석과 꽃, 그 의미',           section: 'fortune', icon: '💎' },
  { href: '/fortune/today-color',  title: '오늘의 행운 색', desc: '이름·날짜로 보는 오늘의 행운 컬러',        section: 'fortune', icon: '🎨' },
];

const SNAP_ITEMS: SearchItem[] = [
  { href: '/snap/first-impression', title: '첫인상 분석',      desc: '눈·얼굴선·입꼬리로 보는 첫인상 유형',   section: 'snap', icon: '✨' },
  { href: '/snap/face-reading',   title: '관상 테스트',        desc: '사진 속 얼굴로 보는 관상 풀이',        section: 'snap', icon: '🔮' },
  { href: '/snap/personal-color', title: '퍼스널컬러 진단',     desc: '피부 톤으로 보는 봄·여름·가을·겨울',   section: 'snap', icon: '🎨' },
  { href: '/snap/animal-face',    title: '동물상 테스트',       desc: '강아지상·고양이상 등 닮은 동물 찾기',   section: 'snap', icon: '🐶' },
  { href: '/snap/golden-ratio',   title: '얼굴 황금비율',       desc: '얼굴 비율을 황금비와 비교',            section: 'snap', icon: '📐' },
  { href: '/snap/face-symmetry',  title: '얼굴 대칭 분석',      desc: '좌우 대칭 지수 측정',                 section: 'snap', icon: '🪞' },
  { href: '/snap/smile-score',    title: '미소 지수 측정',      desc: '표정에서 미소 강도 점수화',            section: 'snap', icon: '😊' },
  { href: '/snap/expression',     title: '표정 감정 분석',      desc: '기쁨·슬픔·놀람 등 표정 인식',          section: 'snap', icon: '😮' },
  { href: '/snap/couple-match',   title: '커플 관상 궁합',      desc: '두 사람 얼굴로 보는 궁합 점수',        section: 'snap', icon: '💑' },
  { href: '/snap/photo-mood',     title: '사진 감성 분석',      desc: '색감과 톤으로 보는 사진 분위기',       section: 'snap', icon: '🖼️' },
  { href: '/snap/handwriting',    title: '손글씨 심리 테스트',   desc: '글씨체로 보는 성격 풀이',             section: 'snap', icon: '✍️' },
];

export const SEARCH_INDEX: SearchItem[] = [
  // 계산기는 카탈로그가 유일한 출처다 (개발자 도구 포함).
  ...CATS.flatMap(cat =>
    cat.calcs.map(c => ({
      href: c.href,
      title: c.title,
      desc: c.desc,
      section: 'calculator' as const,
      icon: cat.icon,
    })),
  ),
  ...TESTS.map(t => ({ href: `/test/${t.slug}`, title: t.title, desc: t.desc, section: 'test' as const, icon: t.icon })),
  ...QUIZZES.map(q => ({ href: `/quiz/${q.slug}`, title: q.title, desc: q.desc, section: 'quiz' as const, icon: q.icon })),
  ...GENERATORS.map(g => ({ href: `/generator/${g.slug}`, title: g.title, desc: g.desc, section: 'generator' as const, icon: g.icon })),
  ...CHECKLISTS.map(c => ({ href: `/checklist/${c.slug}`, title: c.title, desc: c.desc, section: 'checklist' as const, icon: c.icon })),
  ...RANDOM_TOOLS.map(t => ({ href: `/random/${t.slug}`, title: t.title, desc: t.desc, section: 'random' as const, icon: t.icon })),
  ...DEVICE_TOOLS.map(t => ({ href: `/device/${t.slug}`, title: t.title, desc: t.desc, section: 'device' as const, icon: t.icon })),
  ...IMAGE_TOOLS.map(t => ({ href: `/image/${t.slug}`, title: t.title, desc: t.desc, section: 'image' as const, icon: t.icon })),
  ...TEXT_TOOLS.map(t => ({ href: `/text/${t.slug}`, title: t.title, desc: t.desc, section: 'text' as const, icon: t.icon })),
  ...GAME_TOOLS.map(t => ({ href: `/game/${t.slug}`, title: t.title, desc: t.desc, section: 'game' as const, icon: t.icon })),
  ...COLOR_TOOLS.map(t => ({ href: `/color/${t.slug}`, title: t.title, desc: t.desc, section: 'color' as const, icon: t.icon })),
  ...TIME_TOOLS.map(t => ({ href: `/time/${t.slug}`, title: t.title, desc: t.desc, section: 'time' as const, icon: t.icon })),
  ...SOUND_TOOLS.map(t => ({ href: `/sound/${t.slug}`, title: t.title, desc: t.desc, section: 'sound' as const, icon: t.icon })),
  ...FOOD_TOOLS.map(t => ({ href: `/food/${t.slug}`, title: t.title, desc: t.desc, section: 'food' as const, icon: t.icon })),
  ...CONVERT_TOOLS.map(t => ({ href: `/convert/${t.slug}`, title: t.title, desc: t.desc, section: 'convert' as const, icon: t.icon })),
  ...RATE_TOOLS.map(t => ({ href: `/rate/${t.slug}`, title: t.ko.title, desc: t.ko.desc, section: 'rate' as const, icon: t.icon })),
  ...BODY_TOOLS.map(t => ({ href: `/body/${t.slug}`, title: t.ko.title, desc: t.ko.desc, section: 'body' as const, icon: t.icon })),
  ...GEO_TOOLS.map(t => ({ href: `/geometry/${t.slug}`, title: t.ko.title, desc: t.ko.desc, section: 'geometry' as const, icon: t.icon })),
  ...COUNTRIES.map(c => ({ href: `/country/${c.slug}`, title: `${c.ko.name} 여행 정보`, desc: c.ko.intro.slice(0, 60), section: 'country' as const, icon: c.icon })),
  ...IDIOMS.map(i => ({ href: `/hanja/${i.slug}`, title: `${i.reading} ${i.hanja}`, desc: i.ko.meaning.slice(0, 60), section: 'hanja' as const, icon: i.icon })),
  ...METRO_LINES.map(l => ({ href: `/metro/${l.slug}`, title: `${lineTitle(l, 'ko')} 역 이름 맞추기`, desc: l.text.ko.intro.slice(0, 60), section: 'metro' as const, icon: lineIcon(l) })),
  ...MUSIC_ITEMS.map(i => ({ href: `/music/${i.slug}`, title: `${titleOf(i, 'ko')} 구성음`, desc: `${symbolOf(i)} — ${titleOf(i, 'en')}`, section: 'music' as const, icon: iconOf(i) })),
  ...NAMED_COLORS_8.map(c => ({ href: `/color/${c.slug}`, title: `${c.name.ko} 색상 코드`, desc: `${c.hex.toUpperCase()} — ${c.name.en}`, section: 'color' as const, icon: '🎨' })),
  ...INGREDIENTS.map(i => ({ href: `/food/${i.slug}`, title: `${i.name.ko} 1컵 무게`, desc: `미국컵 ${foodFacts(i).grams.cupUs}g · 한국컵 ${foodFacts(i).grams.cupMetric}g`, section: 'food' as const, icon: '⚖️' })),
  ...TIME_CITIES.map(c => ({ href: `/time/${c.slug}`, title: `${c.name.ko} 현재 시각`, desc: `${timeCountry(c.country)?.name.ko ?? ''} · ${c.zone}`, section: 'time' as const, icon: '🕰️' })),
  ...SCREENS.map(sc => ({
    href: `/device/screen/${sc.slug}`,
    title: `${sc.name} 화면 규격`,
    desc: `${sc.w}×${sc.h} · ${sc.inch}인치 · ${screenFacts(sc).ppi}ppi`,
    section: 'device' as const,
    icon: SCREEN_ICON,
  })),
  ...HANDS.map(h => {
    const f = handFacts(h);
    return {
      href: `/game/poker/${h.slug}`,
      title: `${labelOf(h)} 시작 핸드`,
      desc: `조합 ${f.combos}가지 · 첸 점수 ${f.score}점`,
      section: 'poker' as const,
      icon: POKER_ICON,
    };
  }),
  ...OPENINGS.map(x => ({
    href: `/game/chess/${x.slug}`,
    title: fullName(x.family, x.line, 'ko'),
    desc: x.moves.join(' '),
    section: 'chess' as const,
    icon: CHESS_ICON,
  })),
  ...ELEMENTS.map(x => {
    const f = elementFacts(x);
    return {
      href: `/element/${x.z}`,
      title: `${nameOf(x.z, 'ko')} ${x.symbol}`,
      desc: `원자번호 ${x.z} · 원자량 ${x.mass} · ${f.period}주기`,
      section: 'element' as const,
      icon: ELEMENT_ICON,
    };
  }),
  ...NUMBERS.map(n => {
    const f = numberFacts(n);
    return {
      href: `/number/${n}`,
      title: `숫자 ${n}`,
      desc: f.prime ? `소수 · 약수 2개 · 2진수 ${f.bin}` : `${factorText(f.factors)} · 약수 ${f.divisors.length}개 · 2진수 ${f.bin}`,
      section: 'number' as const,
      icon: NUMBER_ICON,
    };
  }),
  ...CODES.map(code => {
    const f = asciiFacts(code);
    return {
      href: `/ascii/${code}`,
      title: `ASCII ${code} ${f.label}`,
      desc: `16진수 ${f.hex} · 2진수 ${f.bin}${f.ctrl ? ` · ${f.ctrl}` : ''}`,
      section: 'ascii' as const,
      icon: ASCII_ICON,
    };
  }),
  ...PORTS.map(x => {
    const f = portFacts(x);
    return {
      href: `/port/${x.port}`,
      title: `${x.port}번 포트 ${x.name}`,
      desc: `${x.service} · ${f.proto === 'both' ? 'TCP·UDP' : f.proto.toUpperCase()}`,
      section: 'port' as const,
      icon: PORT_ICON,
    };
  }),
  ...MODES.map(mode => {
    const f = chmodFacts(mode);
    return {
      href: `/chmod/${mode}`,
      title: `chmod ${mode}`,
      desc: `${f.symbolic} · ls -l ${f.lsFile}`,
      section: 'chmod' as const,
      icon: CHMOD_ICON,
    };
  }),
  ...RESISTOR_VALUES.map(ohms => {
    const f = resistorFacts(ohms);
    return {
      href: `/resistor/${ohms}`,
      title: `${f.display} 저항 색띠`,
      desc: `${f.code} · ${f.bands4.slice(0, 3).join(' · ')}`,
      section: 'resistor' as const,
      icon: RESISTOR_ICON,
    };
  }),
  ...FRACTIONS.map(f => {
    const x = fractionFacts(f);
    return {
      href: `/fraction/${fractionSlug(f)}`,
      title: `${f.n}/${f.d} 소수로`,
      desc: `${x.decimal.text} · ${x.percent.text}%`,
      section: 'fraction' as const,
      icon: FRACTION_ICON,
    };
  }),
  ...KEYS.map(x => {
    const f = keyFacts(x);
    return {
      href: `/keycode/${keySlug(x)}`,
      title: `${x.code} 키 코드`,
      desc: `keyCode ${x.keyCode} · key ${f.label} · location ${f.location}`,
      section: 'keycode' as const,
      icon: KEYCODE_ICON,
    };
  }),
  ...PREFIXES.map(p => {
    const f = cidrFacts(p);
    return {
      href: `/cidr/${cidrSlug(p)}`,
      title: `${p.family === 'v4' ? 'IPv4' : 'IPv6'} /${p.bits} 서브넷`,
      desc: f.mask ? `마스크 ${f.mask} · 호스트 ${f.usable}` : `주소 2^${f.hostBits}`,
      section: 'cidr' as const,
      icon: CIDR_ICON,
    };
  }),
  ...CODE_CHARS.map(x => {
    const f = charFacts(x);
    return {
      href: `/code/${charSlug(x)}`,
      title: `${x.char} 모스 부호`,
      desc: `${x.morse}${x.nato ? ` · ${x.nato}` : ''}${f.braille ? ` · 점자 ${f.braille}` : ''}`,
      section: 'code' as const,
      icon: CODE_ICON,
    };
  }),
  ...DARTS_SCORES.map(score => {
    const f = dartsFacts(score);
    return {
      href: `/darts/${score}`,
      title: `${score}점 다트 마무리`,
      desc: f.bogey ? '세 다트로는 끝낼 수 없는 보기 수' : `${f.darts}다트 · ${f.route.map(t => t.label).join(' ')}`,
      section: 'darts' as const,
      icon: DARTS_ICON,
    };
  }),
  ...PRODUCTS.map(p => {
    const f = timesFacts(p);
    return {
      href: `/times/${timesSlug(p)}`,
      title: `${p.a} × ${p.b} = ${f.product}`,
      desc: `${f.divisions[0]} · ${p.a}단`,
      section: 'times' as const,
      icon: TIMES_ICON,
    };
  }),
  ...SQRT_NUMBERS.map(n => {
    const f = sqrtFacts(n);
    return {
      href: `/sqrt/${n}`,
      title: `√${n} = ${f.exact !== null ? f.exact : f.radical}`,
      desc: f.exact !== null ? `${f.exact} × ${f.exact} = ${n}` : `약 ${f.value} · ${f.between[0]}과 ${f.between[1]} 사이`,
      section: 'sqrt' as const,
      icon: SQRT_ICON,
    };
  }),
  ...ROMAN_YEARS.map(y => {
    const f = romanFacts(y);
    return {
      href: `/roman/${y}`,
      title: `${y}년 = ${f.roman}`,
      desc: `${f.parts.map(p => p.letters).join(' + ')} · ${f.length}자`,
      section: 'roman' as const,
      icon: ROMAN_ICON,
    };
  }),
  ...TIRES.map(t => {
    const f = tireFacts(t);
    return {
      href: `/tire/${tireSlug(t)}`,
      title: `${tireLabel(t)} 타이어 규격`,
      desc: `외경 ${f.diameter}mm · 사이드월 ${f.sidewall}mm · 1km ${f.revsPerKm}바퀴`,
      section: 'tire' as const,
      icon: TIRE_ICON,
    };
  }),
  ...SCREWS.map(w => {
    const f = screwFacts(w);
    return {
      href: `/screw/${screwSlug(w)}`,
      title: `${screwLabel(w)} 나사 규격`,
      desc: `탭 드릴 ${f.tapDrill}mm · 골지름 ${f.minorMale}mm · ${w.coarse ? '보통' : '가는'} 나사`,
      section: 'screw' as const,
      icon: SCREW_ICON,
    };
  }),
  ...CAL_YEARS.map(y => {
    const f = yearFacts(y);
    const ui = YEAR_UI.ko;
    return {
      href: `/year/${y}`,
      title: `${y}년 — ${f.leap ? '윤년' : '평년'} ${f.days}일`,
      desc: `1월 1일 ${ui.weekdays[f.firstWeekday]} · ${ui.stems[f.stem]}${ui.branches[f.branch]}년 ${ui.zodiac[f.branch]}띠`,
      section: 'year' as const,
      icon: YEAR_ICON,
    };
  }),
  ...PACES.map(p => {
    const f = paceFacts(p);
    return {
      href: `/pace/${paceSlug(p)}`,
      title: `${paceLabel(p)} 페이스 러닝`,
      desc: `풀코스 ${f.finishes[3].text} · 하프 ${f.finishes[2].text} · 시속 ${f.kmh}km`,
      section: 'pace' as const,
      icon: PACE_ICON,
    };
  }),
  ...PIXELS.map(px => {
    const f = pxFacts(px);
    return {
      href: `/rem/${px}`,
      title: `${px}px는 몇 rem`,
      desc: `${f.rem}rem · ${f.pt}pt · ${f.mm}mm`,
      section: 'rem' as const,
      icon: PX_ICON,
    };
  }),
  ...SPEEDS.map(v => {
    const f = stopFacts(v);
    return {
      href: `/stop/${v}`,
      title: `시속 ${v}km 정지거리`,
      desc: `마른 노면 ${f.dryTotal}m · 젖은 노면 ${f.surfaces[1].total}m · 공주거리 ${f.reaction}m`,
      section: 'stop' as const,
      icon: STOP_ICON,
    };
  }),
  ...ALTITUDES.map(m => {
    const f = altitudeFacts(m);
    return {
      href: `/altitude/${m}`,
      title: `해발 ${m}m 기압과 끓는점`,
      desc: `${f.hpa}hPa · 물은 ${f.boilC}도에 끓음 · 산소 ${f.o2Percent}%`,
      section: 'altitude' as const,
      icon: ALTITUDE_ICON,
    };
  }),
  ...CHANNELS.map(c => {
    const f = wifiFacts(c);
    return {
      href: `/wifi/${wifiSlug(c)}`,
      title: `${wifiLabel(c)}번 채널`,
      desc: `${f.center}MHz · ${f.span.from}~${f.span.to}MHz · 겹침 ${f.overlaps.length}개`,
      section: 'wifi' as const,
      icon: WIFI_ICON,
    };
  }),
  ...SPOTS.map(p => {
    const f = fretFacts(p);
    const note = fretNote(p, 'ko');
    return {
      href: `/fret/${fretSlug(p)}`,
      title: `기타 ${p.string}번 줄 ${p.fret === 0 ? '개방현' : `${p.fret}프렛`} — ${note}${f.octave}`,
      desc: `${f.hz}Hz · 같은 음 ${f.sameNote.length}자리 · 너트에서 ${f.distances[0].mm}mm`,
      section: 'fret' as const,
      icon: FRET_ICON,
    };
  }),
  ...WEIGHTS.map(w => {
    const f = gravityFacts(w);
    return {
      href: `/gravity/${w}`,
      title: `${w}kg — 달과 화성에서 몇 kg`,
      desc: `달 ${f.bodies[4].kg}kg · 화성 ${f.bodies[5].kg}kg · 목성 ${f.bodies[6].kg}kg`,
      section: 'gravity' as const,
      icon: GRAVITY_ICON,
    };
  }),
  ...WC_CELLS.map(c => {
    const f = windchillFacts(c);
    return {
      href: `/windchill/${wcSlug(c)}`,
      title: `${c.t}도에 시속 ${c.v}km — 체감 ${f.felt}도`,
      desc: `기온보다 ${f.drop}도 낮게 · ${f.frostbite !== null ? `동상 ${f.frostbite}분` : '동상 위험 구간 아님'}`,
      section: 'windchill' as const,
      icon: WINDCHILL_ICON,
    };
  }),
  ...DEW_CELLS.map(c => {
    const f = dewFacts(c);
    return {
      href: `/dew/${dewSlug(c)}`,
      title: `${c.t}도 습도 ${c.rh}% — 이슬점 ${f.dew}도`,
      desc: `공기 1m³에 물 ${f.absolute}g · 기온과 ${f.spread}도 차이`,
      section: 'dew' as const,
      icon: DEW_ICON,
    };
  }),
  ...BITS.map(b => {
    const f = drillFacts(b);
    return {
      href: `/drill/${drillSlug(b)}`,
      title: `${b.name} 드릴 — ${b.mm}mm`,
      desc: `${f.inch}인치 · 가까운 것 ${f.near.map(n => n.name).join(', ')}${f.taps.length ? ` · ${f.taps[0].label} 탭 드릴` : ''}`,
      section: 'drill' as const,
      icon: DRILL_ICON,
    };
  }),
  ...BW_CELLS.map(c => {
    const f = bandwidthFacts(c);
    return {
      href: `/bandwidth/${bwSlug(c)}`,
      title: `${bwSize(c.mb)} 파일을 ${c.mbps}Mbps로 — ${f.parts.days ? `${f.parts.days}일 ${f.parts.hours}시간` : f.parts.hours ? `${f.parts.hours}시간 ${f.parts.minutes}분` : f.parts.minutes ? `${f.parts.minutes}분 ${f.parts.seconds}초` : `${f.real}초`}`,
      desc: `실제 속도 ${f.perSecond}MB/s · 1분 안에 받으려면 ${f.minuteSpeed}Mbps`,
      section: 'bandwidth' as const,
      icon: BANDWIDTH_ICON,
    };
  }),
  ...BATT_CELLS.map(c => {
    const f = batteryFacts(c);
    return {
      href: `/battery/${battSlug(c)}`,
      title: `${c.mah}mAh를 ${c.watt}W로 — ${f.minutes >= 60 ? `${Math.floor(f.minutes / 60)}시간 ${f.minutes % 60}분` : `${f.minutes}분`}`,
      desc: `${f.wh}Wh · ${f.step.volt}V ${f.step.amp}A · 80%까지 ${f.to80}분`,
      section: 'battery' as const,
      icon: BATTERY_ICON,
    };
  }),
  ...WIRE_CELLS.map(c => {
    const f = wireFacts(c);
    return {
      href: `/wire/${wireSlug(c)}`,
      title: `${wireLabel(c.size)}로 ${c.amp}A — 230V에서 ${f.reach[3].metres}m`,
      desc: `${f.area}mm² · 1m에 ${f.ohmPerM}Ω · 10m 왕복 ${f.dropPer10m}V`,
      section: 'wire' as const,
      icon: WIRE_ICON,
    };
  }),
  ...PAPER_CELLS.map(c => {
    const f = paperFacts(c);
    return {
      href: `/paper/${paperSlug(c)}`,
      title: `${c.size.key.toUpperCase()} ${c.dpi}dpi — ${f.pixels.w}×${f.pixels.h}픽셀`,
      desc: `${f.sheet.short}×${f.sheet.long}mm · 80g 종이 한 장 ${f.weights[1].grams}g`,
      section: 'paper' as const,
      icon: PAPER_ICON,
    };
  }),
  ...TORQUE_CELLS.map(c => {
    const f = torqueFacts(c);
    return {
      href: `/torque/${torqueSlug(c)}`,
      title: `${torqueSize(c.d)} ${torqueGrade(c.grade)?.label} 조임 토크 — ${f.turns[1].nm}N·m`,
      desc: `기름을 바르면 ${f.turns[2].nm}N·m · 목표 축력 ${f.preload}N · ${f.kgfm}kgf·m`,
      section: 'torque' as const,
      icon: TORQUE_ICON,
    };
  }),
  ...LUMEN_CELLS.map(c => {
    const f = lumenFacts(c);
    const NAME: Record<string, string> = { hall: '복도', bedroom: '침실', living: '거실', bath: '욕실', kitchen: '주방', study: '서재', workshop: '작업실', detail: '정밀 작업' };
    return {
      href: `/lumen/${lumenSlug(c)}`,
      title: `${c.area}㎡ ${NAME[c.use]} 밝기 — ${f.lumen}루멘`,
      desc: `${f.lux}럭스 기준 · LED ${f.watts[0].watt}W · 800루멘 전구 ${f.bulbs}개`,
      section: 'lumen' as const,
      icon: LUMEN_ICON,
    };
  }),
  ...AMP_CELLS.map(c => {
    const f = ampereFacts(c);
    const NAME: Record<string, string> = { purifier: '공기청정기', laptop: '노트북', fan: '선풍기', tv: 'TV', fridge: '냉장고', blanket: '전기장판', console: '게임기', desktop: '데스크톱', washer: '세탁기', toaster: '토스터', rice: '전기밥솥', microwave: '전자레인지', coffee: '커피머신', iron: '다리미', dryer: '헤어드라이어', vacuum: '청소기', aircon: '에어컨', kettle: '전기포트', heater: '전기히터', induction: '인덕션' };
    return {
      href: `/ampere/${ampSlug(c)}`,
      title: `${NAME[c.key]} ${applianceOf(c.key)?.watt}W — ${circuitOf(c.circuit)?.volt}V에서 ${f.amp}A`,
      desc: `함께 ${f.together}대 · 전선 ${f.wire}${f.stripOk ? '' : ' · 멀티탭 금지'}`,
      section: 'ampere' as const,
      icon: AMPERE_ICON,
    };
  }),
  ...UV_CELLS.map(c => {
    const f = uvFacts(c);
    return {
      href: `/uv/${uvSlug(c)}`,
      title: `자외선 지수 ${c.uv}·${skinOf(c.skin)?.roman}형 피부 — ${f.minutes}분`,
      desc: `SPF 30이면 ${f.shields[1].minutes}분 · 두 시간을 버티려면 SPF ${f.needSpf}`,
      section: 'uv' as const,
      icon: UV_ICON,
    };
  }),
  ...HIKE_CELLS.map(c => {
    const f = hikeFacts(c);
    const h = Math.floor(f.upMinutes / 60);
    const m = f.upMinutes % 60;
    return {
      href: `/hike/${hikeSlug(c)}`,
      title: `${c.km}km에 오름 ${c.up}m — ${h ? `${h}시간 ${m}분` : `${m}분`}`,
      desc: `왕복 ${Math.round(f.roundMinutes / 60 * 10) / 10}시간 · 평균 경사 ${f.slope}도 · 평지로 치면 ${f.equivalent}km`,
      section: 'hike' as const,
      icon: HIKE_ICON,
    };
  }),
  ...INSUL_CELLS.map(c => {
    const f = insulFacts(c);
    const NAME: Record<string, string> = { vacuum: '진공단열재', phenolic: '페놀폼', pur: '경질우레탄', xps: '압출법 스티로폼', eps2: '비드법 2종', eps1: '비드법 1종', glasswool: '글라스울', mineralwool: '미네랄울', cellulose: '셀룰로스', wood: '목재', plaster: '석고보드', concrete: '콘크리트' };
    return {
      href: `/insul/${insulSlug(c)}`,
      title: `${NAME[c.key]} ${c.mm}mm — 열저항 ${f.r}`,
      desc: `열관류율 ${f.u} · 콘크리트로 치면 ${f.concrete}m`,
      section: 'insul' as const,
      icon: INSUL_ICON,
    };
  }),
  ...AIR_CELLS.map(c => {
    const f = airFacts(c);
    const NAME: Record<string, string> = { pm25: '초미세먼지', pm10: '미세먼지', o3: '오존', no2: '이산화질소', co: '일산화탄소', so2: '아황산가스' };
    const GRADE: Record<string, string> = { good: '좋음', normal: '보통', bad: '나쁨', veryBad: '매우 나쁨' };
    return {
      href: `/air/${airSlug(c)}`,
      title: `${NAME[c.key]} ${c.value}${pollutantOf(c.key)?.unit} — 한국 ${GRADE[f.korea]}, AQI ${f.epa}`,
      desc: `${f.split ? '두 나라의 판정이 갈리는 자리' : '두 나라의 판정이 같은 자리'}${f.cigarettes !== null ? ` · 하루면 담배 ${f.cigarettes}개비` : ''}`,
      section: 'air' as const,
      icon: AIR_ICON,
    };
  }),
  ...PATTERNS.map(x => ({
    href: `/text/regex/${x.slug}`,
    title: `${whatOf(x.slug, 'ko')} 정규식`,
    desc: x.re,
    section: 'text' as const,
    icon: REGEX_ICON,
  })),
  ...ROLLS.map(r => {
    const f = rollFacts(r);
    return {
      href: `/random/dice/${r.slug}`,
      title: `주사위 ${r.dice}개 합 ${r.sum} 확률`,
      desc: `${f.percent}% — ${f.total}가지 중 ${f.ways}가지`,
      section: 'random' as const,
      icon: DICE_ICON,
    };
  }),
  ...ALGS.map(a => {
    const f = caseFacts(a);
    return {
      href: `/game/cube/${a.slug}`,
      title: `큐브 ${a.label} 공식`,
      desc: `${a.alg} — ${f.moves}수`,
      section: 'game' as const,
      icon: CUBE_ICON,
    };
  }),
  ...LENSES.map(l => {
    const f = lensFacts(l);
    return {
      href: `/snap/lens/${l.slug}`,
      title: `${l.focal}mm ${f.sensorName} 화각`,
      desc: `대각 ${f.diagonal}도 · 35mm 환산 ${f.equiv}mm`,
      section: 'snap' as const,
      icon: LENS_ICON,
    };
  }),
  ...FREQS.map(f => {
    const facts = freqFacts(f);
    return {
      href: `/sound/hz/${freqSlug(f.hz)}`,
      title: `${f.hz}Hz 소리`,
      desc: `${facts.note} · 파장 ${facts.wavelengthLabel}`,
      section: 'sound' as const,
      icon: FREQ_ICON,
    };
  }),
  ...EXTS.map(x => ({
    href: `/ext/${x.ext}`,
    title: `.${x.ext} 파일`,
    desc: `${extFacts(x).mime} · ${x.apps.slice(0, 2).join(', ')}`,
    section: 'ext' as const,
    icon: EXT_ICON,
  })),
  ...CARDS.map(c => {
    const v = cardView(c.slug, 'ko')!;
    return {
      href: `/fortune/card/${c.slug}`,
      title: `타로 ${v.name}`,
      desc: v.kindLine,
      section: 'fortune' as const,
      icon: TAROT_ICON,
    };
  }),
  /* 자료 목록의 첫 장 — 개별 항목만 싣고 목록을 빼면 "타로"로 검색해도 안 나온다 */
  { href: '/fortune/card', title: '타로 78장 뜻', desc: '메이저 22장과 마이너 56장의 정방향·역방향', section: 'fortune' as const, icon: TAROT_ICON },
  { href: '/text/char', title: '특수문자 모음', desc: '화살표·별·체크 168개를 눌러서 복사', section: 'text' as const, icon: GLYPH_ICON },
  { href: '/game/poker', title: '홀덤 시작 핸드', desc: '시작 핸드 169가지의 확률과 첸 점수', section: 'poker' as const, icon: POKER_ICON },
  { href: '/game/chess', title: '체스 오프닝', desc: '오프닝 174가지의 수순과 판 그림', section: 'chess' as const, icon: CHESS_ICON },
  { href: '/element', title: '주기율표', desc: '원소 118가지의 기호·원자량·전자 배치', section: 'element' as const, icon: ELEMENT_ICON },
  { href: '/number', title: '수 사전', desc: '1부터 200까지의 소인수분해·약수·진법·로마 숫자', section: 'number' as const, icon: NUMBER_ICON },
  { href: '/ascii', title: 'ASCII 코드표', desc: '128자의 진법·HTML 엔티티·Ctrl 조합', section: 'ascii' as const, icon: ASCII_ICON },
  { href: '/port', title: '포트 번호 사전', desc: '22·80·443·3306 등 포트 127개의 서비스와 구간', section: 'port' as const, icon: PORT_ICON },
  { href: '/chmod', title: 'chmod 권한표', desc: '755·644가 여는 것과 umask까지 125가지', section: 'chmod' as const, icon: CHMOD_ICON },
  { href: '/resistor', title: '저항 색띠표', desc: 'E24 계열 144가지의 색띠와 오차', section: 'resistor' as const, icon: RESISTOR_ICON },
  { href: '/fraction', title: '분수를 소수로', desc: '분모 20까지 기약분수 127가지의 소수·퍼센트', section: 'fraction' as const, icon: FRACTION_ICON },
  { href: '/keycode', title: '키 코드 사전', desc: 'code·key·keyCode를 자판 키 120개에서', section: 'keycode' as const, icon: KEYCODE_ICON },
  { href: '/cidr', title: 'CIDR 서브넷 표', desc: '/0부터 /32까지 마스크·주소 수·호스트 수', section: 'cidr' as const, icon: CIDR_ICON },
  { href: '/code', title: '모스 부호표', desc: '모스·NATO 음성 문자·점자 116가지', section: 'code' as const, icon: CODE_ICON },
  { href: '/darts', title: '다트 마무리표', desc: '2점부터 170점까지 몇 다트에 끝나는지와 수순', section: 'darts' as const, icon: DARTS_ICON },
  { href: '/times', title: '곱셈표', desc: '1단부터 20단까지 210칸의 곱과 나누기', section: 'times' as const, icon: TIMES_ICON },
  { href: '/sqrt', title: '제곱근표', desc: '1부터 200까지 소수와 근호를 간단히 한 꼴', section: 'sqrt' as const, icon: SQRT_ICON },
  { href: '/roman', title: '로마 숫자 연도표', desc: '1900년부터 2100년까지 한 해씩, 글자를 조각내어', section: 'roman' as const, icon: ROMAN_ICON },
  { href: '/tire', title: '타이어 규격표', desc: '외경·둘레·1km 회전수와 바꿔 낄 수 있는 치수', section: 'tire' as const, icon: TIRE_ICON },
  { href: '/screw', title: '미터 나사 규격표', desc: 'M1부터 M64까지 탭 드릴·골지름·응력단면적', section: 'screw' as const, icon: SCREW_ICON },
  { href: '/year', title: '연도 사전', desc: '1900년부터 2100년까지 윤년·요일·주 수·띠', section: 'year' as const, icon: YEAR_ICON },
  { href: '/pace', title: '러닝 페이스표', desc: '5K·10K·하프·풀코스 완주 시간과 목표별 페이스', section: 'pace' as const, icon: PACE_ICON },
  { href: '/rem', title: 'CSS 단위표', desc: 'px를 rem·pt·pc·인치로, 1px부터 120px까지', section: 'rem' as const, icon: PX_ICON },
  { href: '/stop', title: '정지거리표', desc: '시속별 공주거리·제동거리, 노면 네 가지로', section: 'stop' as const, icon: STOP_ICON },
  { href: '/altitude', title: '고도별 기압표', desc: '해발 0m부터 5000m까지 기압·끓는점·산소', section: 'altitude' as const, icon: ALTITUDE_ICON },
  { href: '/wifi', title: '와이파이 채널표', desc: '2.4·5·6GHz 채널의 주파수와 겹침, 왜 1·6·11인가', section: 'wifi' as const, icon: WIFI_ICON },
  { href: '/fret', title: '기타 지판표', desc: '여섯 줄 0~23프렛의 음과 주파수, 프렛 거리', section: 'fret' as const, icon: FRET_ICON },
  { href: '/gravity', title: '천체별 몸무게표', desc: '달·화성·목성에서 저울에 얼마로 찍히는지', section: 'gravity' as const, icon: GRAVITY_ICON },
  { href: '/windchill', title: '체감온도표', desc: '기온과 풍속이 만나는 210칸의 체감온도', section: 'windchill' as const, icon: WINDCHILL_ICON },
  { href: '/dew', title: '이슬점표', desc: '기온과 습도로 보는 189칸, 습도만으로는 모르는 눅눅함', section: 'dew' as const, icon: DEW_ICON },
  { href: '/air', title: '미세먼지 농도와 대기질 지수', desc: '한국 등급과 미국 AQI를 나란히, 담배 개비 환산까지', section: 'air' as const, icon: AIR_ICON },
  { href: '/insul', title: '단열재 열저항 계산', desc: '재료와 두께로 열저항·열관류율, 콘크리트 환산까지', section: 'insul' as const, icon: INSUL_ICON },
  { href: '/hike', title: '등산 시간 계산', desc: '거리와 누적 오름으로, 네이스미스의 규칙', section: 'hike' as const, icon: HIKE_ICON },
  { href: '/uv', title: '자외선 화상 시간', desc: '지수와 피부 타입으로 몇 분에 붉어지는지', section: 'uv' as const, icon: UV_ICON },
  { href: '/ampere', title: '가전 전류 계산', desc: '소비전력과 전압으로 몇 암페어, 한 회로에 몇 대', section: 'ampere' as const, icon: AMPERE_ICON },
  { href: '/lumen', title: '방 밝기 계산', desc: '넓이와 쓰임으로 필요한 루멘, 광원별 소비 전력', section: 'lumen' as const, icon: LUMEN_ICON },
  { href: '/torque', title: '볼트 조임 토크표', desc: 'M3부터 M36까지 등급 8가지, 마찰 상태별 토크', section: 'torque' as const, icon: TORQUE_ICON },
  { href: '/paper', title: '종이 규격표', desc: 'A·B·C 계열과 레터, 해상도별 픽셀과 장당 무게', section: 'paper' as const, icon: PAPER_ICON },
  { href: '/wire', title: '전선 굵기 계산', desc: 'AWG·mm² 20가지와 전류 10가지, 3% 안에 드는 길이', section: 'wire' as const, icon: WIRE_ICON },
  { href: '/battery', title: '배터리 충전 시간', desc: '용량과 충전기가 만나는 200칸, 전압·케이블·기내 반입까지', section: 'battery' as const, icon: BATTERY_ICON },
  { href: '/bandwidth', title: '다운로드 시간 계산', desc: '파일 크기와 회선 속도가 만나는 240칸', section: 'bandwidth' as const, icon: BANDWIDTH_ICON },
  { href: '/drill', title: '드릴 비트 규격표', desc: '미터·인치·번호·문자 네 계열과 나사 탭 드릴', section: 'drill' as const, icon: DRILL_ICON },
  { href: '/text/regex', title: '정규식 모음', desc: '표기법과 검사식 133가지, 보기까지 함께', section: 'text' as const, icon: REGEX_ICON },
  { href: '/random/dice', title: '주사위 확률표', desc: '1~6개로 나올 수 있는 합 111가지의 확률', section: 'random' as const, icon: DICE_ICON },
  { href: '/game/cube', title: '큐브 공식 모음', desc: 'F2L·OLL·PLL 119가지 경우와 공식', section: 'game' as const, icon: CUBE_ICON },
  { href: '/snap/lens', title: '렌즈 화각 계산', desc: '초점거리와 센서로 보는 104가지 화각', section: 'snap' as const, icon: LENS_ICON },
  { href: '/device/screen', title: '기기 화면 규격', desc: '해상도·인치·PPI를 108가지 화면에서', section: 'device' as const, icon: SCREEN_ICON },
  { href: '/sound/hz', title: '주파수 소리 듣기', desc: '20Hz~24kHz 113가지 순음', section: 'sound' as const, icon: FREQ_ICON },
  { href: '/image/size', title: '이미지 크기 모음', desc: '썸네일·인쇄·증명사진 116가지 규격', section: 'image' as const, icon: IMG_SIZE_ICON },
  { href: '/http', title: 'HTTP 코드 사전', desc: '상태 코드와 헤더 132가지의 뜻', section: 'http' as const, icon: HTTP_ICON },
  { href: '/css', title: 'CSS 속성 사전', desc: '154개 속성의 쓰임과 값, 상속', section: 'css' as const, icon: CSS_ICON },
  { href: '/html', title: 'HTML 태그 사전', desc: '126개 태그의 쓰임과 속성', section: 'html' as const, icon: TAG_ICON },
  { href: '/ext', title: '파일 확장자 사전', desc: '140가지 확장자의 여는 프로그램과 MIME 타입', section: 'ext' as const, icon: EXT_ICON },
  ...GLYPHS.map(g => ({
    href: `/text/char/${g.slug}`,
    title: `${g.char} 특수문자`,
    desc: `${glyphFacts(g).unicode} · ${glyphFacts(g).entity}`,
    section: 'text' as const,
    icon: GLYPH_ICON,
  })),
  ...TAGS.map(t => ({
    href: `/html/${t.name}`,
    title: `<${t.name}> 태그`,
    desc: tagDesc(t.name, 'ko'),
    section: 'html' as const,
    icon: TAG_ICON,
  })),
  ...IMG_SIZES.map(x => ({
    href: `/image/size/${x.slug}`,
    title: `${x.name} 크기`,
    desc: `${x.w}×${x.h} · ${sizeFacts(x).ratioLabel}`,
    section: 'image' as const,
    icon: IMG_SIZE_ICON,
  })),
  ...CSS_PROPS.map(p => ({
    href: `/css/${p.name}`,
    title: `CSS ${p.name}`,
    desc: propDesc(p.name, 'ko'),
    section: 'css' as const,
    icon: CSS_ICON,
  })),
  ...HTTP_ITEMS.map(x => ({
    href: `/http/${x.slug}`,
    title: `HTTP ${x.name}`,
    desc: httpDesc(x.slug, 'ko'),
    section: 'http' as const,
    icon: HTTP_ICON,
  })),
  ...FORTUNE_ITEMS,
  ...SNAP_ITEMS,
];

/** 홈 화면 배지가 낡지 않도록 실제 개수를 데이터에서 뽑는다. */
export const SECTION_COUNTS: Record<Section, number> = SEARCH_INDEX.reduce(
  (acc, item) => ({ ...acc, [item.section]: (acc[item.section] ?? 0) + 1 }),
  {} as Record<Section, number>,
);
