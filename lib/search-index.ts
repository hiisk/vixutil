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
export type Section = 'calculator' | 'test' | 'quiz' | 'generator' | 'checklist' | 'fortune' | 'snap' | 'random' | 'device' | 'image' | 'text' | 'game' | 'color' | 'time' | 'sound' | 'food' | 'convert' | 'rate' | 'body' | 'geometry' | 'country' | 'hanja' | 'metro' | 'music' | 'ext' | 'html' | 'css' | 'http' | 'element' | 'chess' | 'poker' | 'number' | 'ascii' | 'port' | 'chmod' | 'resistor' | 'fraction' | 'keycode' | 'cidr' | 'code' | 'darts' | 'times' | 'sqrt' | 'roman' | 'tire' | 'screw' | 'year';

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
