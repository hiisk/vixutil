import { CATS } from './calculator-catalog.ts';
import { PERCENT_ICON } from './percent/list.ts';
import { TESTS } from './test-data.ts';
import { QUIZZES } from './quiz-data.ts';
import { GENERATORS } from './generator-data.ts';
import { CHECKLISTS } from './checklist-data.ts';
import { RANDOM_TOOLS } from './random-tools.ts';
import { DEVICE_TOOLS } from './device-tools.ts';
import { IMAGE_TOOLS } from './image-tools.ts';
import { TEXT_TOOLS } from './text-tools.ts';
import { GAME_TOOLS } from './game-tools.ts';
import { COLOR_TOOLS } from './color-tools.ts';
import { TIME_TOOLS } from './time-tools.ts';
import { SOUND_TOOLS } from './sound-tools.ts';
import { FOOD_TOOLS } from './food-tools.ts';
import { CONVERT_TOOLS } from './convert-tools.ts';
import { RATE_TOOLS } from './rate-tools.ts';
import { BODY_TOOLS } from './body-tools.ts';
import { GEO_TOOLS } from './geo-tools.ts';
import { CRAFT_TOOLS } from './craft-tools.ts';
import { IDIOMS } from './hanja-tools.ts';
import { NAMED_COLORS_8 } from './color/named8.ts';
import { INGREDIENTS } from './food/ingredients8.ts';
import { TIME_CITIES, timeCountry } from './time/cities8.ts';
import { SCREENS, SCREEN_ICON } from './device/screens.ts';
import { LENSES, LENS_ICON } from './lens/list.ts';
import { ALGS, CUBE_ICON } from './cube/list.ts';
import { ROLLS, DICE_ICON } from './dice/list.ts';
import { PATTERNS, REGEX_ICON } from './regex/list.ts';
import { NUMBER_ICON } from './number/list.ts';
import { ASCII_ICON } from './ascii/list.ts';
import { PORTS, PORT_ICON } from './port/list.ts';
import { CHMOD_ICON } from './chmod/list.ts';
import { FRACTION_ICON } from './fraction/list.ts';
import { KEYCODE_ICON } from './keycode/list.ts';
import { CIDR_ICON } from './cidr/list.ts';
import { CODE_ICON } from './code/list.ts';
import { TIMES_ICON } from './times/list.ts';
import { SQRT_ICON } from './sqrt/list.ts';
import { ROMAN_ICON } from './roman/list.ts';
import { YEAR_ICON } from './year/list.ts';
import { PX_ICON } from './rem/list.ts';
import { PASSWORD_ICON } from './password/list.ts';
import { OPENINGS, CHESS_ICON } from './chess/list.ts';
import { HANDS, POKER_ICON, labelOf } from './poker/list.ts';
import { handFacts } from './poker/facts.ts';
import { fullName } from './chess/names.ts';
import { portFacts } from './port/facts.ts';
import { whatOf } from './regex/desc.ts';
import { rollFacts } from './dice/facts.ts';
import { caseFacts } from './cube/facts.ts';
import { lensFacts } from './lens/facts.ts';
import { FREQS, FREQ_ICON, freqSlug } from './sound/freqs.ts';
import { EXTS, EXT_ICON } from './ext/list.ts';
import { CARDS, TAROT_ICON } from './tarot/deck.ts';
import { GLYPHS, GLYPH_ICON } from './glyph/list.ts';
import { HTTP_ITEMS, HTTP_ICON } from './http/list.ts';
import { CMD_ITEMS } from './cmd/list.ts';
import { cmdDesc } from './cmd/desc.ts';
import { SC_ITEMS, primaryCombo } from './shortcut/list.ts';
import { scDesc } from './shortcut/desc.ts';
import { SC_UI } from './shortcut/ui.ts';
import { EM_ITEMS } from './emoji/list.ts';
import { emojiDesc } from './emoji/desc.ts';
import { httpDesc } from './http/desc.ts';
import { IMG_SIZES, IMG_SIZE_ICON } from './imgsize/list.ts';
import { sizeFacts } from './imgsize/facts.ts';
import { glyphFacts } from './glyph/facts.ts';
import { cardView } from './tarot/facts.ts';
import { extFacts } from './ext/facts.ts';
import { freqFacts } from './sound/facts.ts';
import { screenFacts } from './device/facts.ts';
import { foodFacts } from './food/facts.ts';
import { COUNTRIES, HOLIDAY_ICON } from './holidays/countries.ts';
import { MBTI_TYPES } from './mbti-match.ts';
import { PROFILES as MBTI_PROFILES } from './mbti/profiles.ts';
import { functionStack as mbtiStack } from './mbti/functions.ts';
import { MBTI_ICON } from './mbti/facts.ts';

import { HOLIDAY_UI } from './holidays/ui-l10n.ts';

const HOLIDAY_UI_KO = HOLIDAY_UI.ko;

/**
 * 사이트 전체 검색 인덱스.
 *
 * 지금까지는 섹션별 허브에만 검색이 있어서, "실업급여"를 찾으려면 그게 계산기에
 * 있다는 걸 미리 알아야 했다. 실제로는 계산기와 체크리스트 양쪽에 있는데도.
 * 어느 섹션에 있는지 모르는 사용자는 찾을 방법이 없었다.
 *
 * 검색 페이지에서만 쓴다 — 홈에 실으면 랜딩 페이지가 무거워진다.
 */
export type Section = 'calculator' | 'test' | 'quiz' | 'generator' | 'checklist' | 'fortune' | 'snap' | 'random' | 'device' | 'image' | 'text' | 'game' | 'color' | 'time' | 'sound' | 'food' | 'convert' | 'rate' | 'body' | 'geometry' | 'craft' | 'hanja' | 'ext' | 'http' | 'cmd' | 'shortcut' | 'emoji' | 'chess' | 'poker' | 'number' | 'ascii' | 'port' | 'chmod' | 'fraction' | 'keycode' | 'cidr' | 'code' | 'times' | 'sqrt' | 'roman' | 'year' | 'rem' | 'password' | 'percent' | 'holidays';

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
  holidays:   { label: '공휴일',     icon: '📅', accent: 'bg-sky-50 text-sky-700 border-sky-200' },
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
  craft:      { label: '공예', icon: '🧶', accent: 'bg-amber-50 text-amber-700 border-amber-200' },
  hanja:      { label: '사자성어', icon: '📖', accent: 'bg-amber-50 text-amber-700 border-amber-200' },
  ext:        { label: '파일 확장자', icon: '📄', accent: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  http:       { label: 'HTTP 코드', icon: '🗄️', accent: 'bg-teal-50 text-teal-700 border-teal-200' },
  cmd:        { label: '터미널 명령어', icon: '⌨️', accent: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  shortcut:   { label: '키보드 단축키', icon: '⌨️', accent: 'bg-sky-50 text-sky-700 border-sky-200' },
  emoji:      { label: '이모지 뜻', icon: '😀', accent: 'bg-amber-50 text-amber-700 border-amber-200' },
  chess:      { label: '체스',      icon: '♟️', accent: 'bg-violet-50 text-violet-700 border-violet-200' },
  poker:      { label: '포커',      icon: '🃏', accent: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  number:     { label: '수',        icon: '🔢', accent: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  ascii:      { label: '아스키',    icon: '⌨️', accent: 'bg-teal-50 text-teal-700 border-teal-200' },
  port:       { label: '포트',      icon: '🔌', accent: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200' },
  chmod:      { label: '파일 권한',  icon: '🔒', accent: 'bg-orange-50 text-orange-700 border-orange-200' },
  fraction:   { label: '분수',      icon: '➗', accent: 'bg-lime-50 text-lime-700 border-lime-200' },
  keycode:    { label: '키 코드',    icon: '🔑', accent: 'bg-slate-50 text-slate-700 border-slate-200' },
  cidr:       { label: '서브넷',    icon: '🌐', accent: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
  code:       { label: '부호',      icon: '📶', accent: 'bg-violet-50 text-violet-700 border-violet-200' },
  times:      { label: '곱셈표',    icon: '🔢', accent: 'bg-teal-50 text-teal-700 border-teal-200' },
  percent:    { label: '퍼센트',    icon: PERCENT_ICON, accent: 'bg-sky-50 text-sky-700 border-sky-200' },
  sqrt:       { label: '제곱근',    icon: '📐', accent: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  roman:      { label: '로마 숫자',  icon: '🏛️', accent: 'bg-amber-50 text-amber-700 border-amber-200' },
  year:       { label: '연도',      icon: '📅', accent: 'bg-rose-50 text-rose-700 border-rose-200' },
  rem:        { label: 'CSS 단위',  icon: '📏', accent: 'bg-violet-50 text-violet-700 border-violet-200' },
  password:   { label: '비밀번호',   icon: '🔑', accent: 'bg-teal-50 text-teal-700 border-teal-200' },
};

/**
 * 운세·스냅은 콘텐츠 데이터 배열이 아니라 각각 독립 페이지라 손으로 적는다.
 * 페이지가 실재하는지는 테스트가 검사한다.
 */
const FORTUNE_ITEMS: SearchItem[] = [
  { href: '/fortune/dream',  title: '꿈 해몽',      desc: '돼지·뱀·불 등 꿈에 나온 소재로 의미 찾기', section: 'fortune', icon: '🌙' },
  { href: '/fortune/saju',   title: '사주 분석',    desc: '생년월일로 사주 4주와 오행 균형 보기',    section: 'fortune', icon: '🔯' },
  /* 사주 주제 일곱 — 통합 페이지 하나로는 "사주 연애운"·"이직 시기 사주" 같은 말이
     한 항목에만 몰린다. 검색 상자에서도 주제마다 따로 걸리게 둔다. */
  { href: '/fortune/saju/love',      title: '사주 연애운', desc: '배우자궁(일지)과 도화살로 보는 연애 인연', section: 'fortune', icon: '💕' },
  { href: '/fortune/saju/job',       title: '사주 취업운', desc: '관성과 인성, 직업궁으로 보는 취업운',      section: 'fortune', icon: '💼' },
  { href: '/fortune/saju/career',    title: '사주 이직운', desc: '역마살과 대운 전환점으로 보는 이직 시기',  section: 'fortune', icon: '🔄' },
  { href: '/fortune/saju/promotion', title: '사주 승진운', desc: '정관과 관인상생으로 보는 승진운',          section: 'fortune', icon: '🏅' },
  { href: '/fortune/saju/money',     title: '사주 재물운', desc: '재성과 식상생재로 보는 재물운',            section: 'fortune', icon: '💰' },
  { href: '/fortune/saju/health',    title: '사주 건강운', desc: '오행의 태과·불급으로 보는 건강운',         section: 'fortune', icon: '🏥' },
  { href: '/fortune/saju/study',     title: '사주 학업운', desc: '인성과 문창귀인으로 보는 학업·시험운',     section: 'fortune', icon: '📚' },
  { href: '/fortune/zodiac', title: '별자리 운세',  desc: '12별자리 오늘의 운세',                   section: 'fortune', icon: '⭐' },
  { href: '/fortune/animal', title: '띠 운세',      desc: '쥐·소·범 등 12띠 오늘의 운세',           section: 'fortune', icon: '🐉' },
  { href: '/fortune/tarot',  title: '타로 카드',    desc: '78장 풀덱에서 카드 뽑기',                section: 'fortune', icon: '🃏' },
  { href: '/fortune/mbti',   title: 'MBTI 운세',   desc: '16가지 성격 유형별 오늘의 운세',          section: 'fortune', icon: '🧠' },
  { href: '/fortune/blood-type', title: '혈액형 운세', desc: 'A·B·O·AB형 오늘의 운세',              section: 'fortune', icon: '🩸' },
  { href: '/fortune/biorhythm',  title: '바이오리듬', desc: '생년월일로 신체·감성·지성 리듬 그래프',  section: 'fortune', icon: '📈' },
  { href: '/fortune/ilju',       title: '일주 60가지', desc: '갑자일주부터 계해일주까지 — 성격·앉은 자리·공망', section: 'fortune', icon: '📜' },
  { href: '/fortune/unseong',    title: '십이운성', desc: '장생·건록·제왕 — 일간이 어느 자리에서 힘이 센가', section: 'fortune', icon: '🌿' },
  { href: '/fortune/sinsal',     title: '십이신살', desc: '도화살·역마살·화개살 — 사주 네 기둥의 십이신살', section: 'fortune', icon: '🌸' },
  { href: '/fortune/samjae',     title: '삼재',      desc: '내 띠 삼재가 언제인지 — 들삼재·눌삼재·날삼재', section: 'fortune', icon: '🗓️' },
  { href: '/fortune/saju-match', title: '사주 궁합', desc: '생년월일시로 보는 명리 궁합 — 일간·배우자궁·오행·십성', section: 'fortune', icon: '💑' },
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
  { href: '/snap/face-thirds', title: '얼굴 삼등분 검사', desc: '이마·코·턱 세 칸의 비율을 실측', section: 'snap', icon: '📏' },
  { href: '/snap/eye-spacing', title: '눈 간격 검사', desc: '두 눈 사이가 눈 하나 너비인지 실측', section: 'snap', icon: '👀' },
  { href: '/snap/face-shape', title: '얼굴형 판별', desc: '계란형·둥근형·각진형·긴 얼굴·하트형', section: 'snap', icon: '🥚' },
  { href: '/snap/brows', title: '눈썹 균형 검사', desc: '좌우 높이와 눈썹 사이 간격을 실측', section: 'snap', icon: '🤨' },
  { href: '/snap/lips', title: '입술 비율 검사', desc: '윗입술과 아랫입술의 두께 비를 실측', section: 'snap', icon: '👄' },
  { href: '/snap/contrast', title: '사진 대비 검사', desc: '밋밋한지 한쪽이 탔는지 실측', section: 'snap', icon: '🌗' },
  { href: '/snap/backdrop', title: '배경 정리도 검사', desc: '증명사진에 쓸 만큼 배경이 깔끔한지', section: 'snap', icon: '🖼️' },
  { href: '/snap/id-photo', title: '증명사진 규격 검사', desc: '여권 사진 규격에 맞는지 다섯 가지로 확인', section: 'snap', icon: '🪪' },
  { href: '/snap/head-pose', title: '고개 각도 측정', desc: '기울기·좌우 돌림·끄덕임을 실측', section: 'snap', icon: '🧭' },
  { href: '/snap/real-smile', title: '진짜 웃음 지수', desc: '눈까지 웃는 뒤센 미소인지 측정', section: 'snap', icon: '😄' },
  { href: '/snap/eye-open', title: '눈 뜬 정도 측정', desc: '눈 감긴 사진인지 EAR로 측정', section: 'snap', icon: '👁️' },
  { href: '/snap/framing', title: '인물 구도 분석', desc: '삼분할과 머리 위 여백을 실측', section: 'snap', icon: '🖼️' },
  { href: '/snap/lighting', title: '조명 방향 분석', desc: '빛이 어디서 오는지, 역광인지', section: 'snap', icon: '💡' },
  { href: '/snap/sharpness', title: '사진 선명도 검사', desc: '흔들렸는지, 초점이 맞았는지', section: 'snap', icon: '🔍' },
  { href: '/snap/white-balance', title: '화이트밸런스 검사', desc: '사진 색이 어느 쪽으로 치우쳤는지', section: 'snap', icon: '🎚️' },
  { href: '/snap/distance', title: '촬영 거리 어림', desc: '얼마나 가까이서 찍었고 얼굴이 얼마나 왜곡됐는지', section: 'snap', icon: '📏' },
  { href: '/snap/mirror', title: '좌우 합성 얼굴', desc: '왼쪽만·오른쪽만으로 만든 두 얼굴', section: 'snap', icon: '🪞' },
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
  ...CRAFT_TOOLS.map(t => ({ href: `/craft/${t.slug}`, title: t.ko.title, desc: t.ko.desc, section: 'craft' as const, icon: t.icon })),
  ...IDIOMS.map(i => ({ href: `/hanja/${i.slug}`, title: `${i.reading} ${i.hanja}`, desc: i.ko.meaning.slice(0, 60), section: 'hanja' as const, icon: i.icon })),
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
  { href: '/number', title: '수 사전', desc: '1부터 200까지의 소인수분해·약수·진법·로마 숫자', section: 'number' as const, icon: NUMBER_ICON },
  { href: '/ascii', title: 'ASCII 코드표', desc: '128자의 진법·HTML 엔티티·Ctrl 조합', section: 'ascii' as const, icon: ASCII_ICON },
  ...MBTI_TYPES.map(t => ({
    href: `/fortune/mbti/${t.toLowerCase()}`,
    title: `${t} 특징`,
    desc: `${MBTI_PROFILES[t].line} · 인지기능 ${mbtiStack(t).join(' ')}`,
    section: 'fortune' as const,
    icon: MBTI_ICON,
  })),
  { href: '/holidays', title: '나라별 공휴일', desc: '미국·영국·독일·프랑스·스페인·브라질·일본의 공휴일을 해마다', section: 'holidays' as const, icon: HOLIDAY_ICON },
  ...COUNTRIES.map(c => ({
    href: `/holidays/${c.code}`,
    title: `${HOLIDAY_UI_KO.countries[c.code]} 공휴일`,
    desc: `${c.nativeWord} · 연도별로 날짜·요일·대체 여부까지`,
    section: 'holidays' as const,
    icon: HOLIDAY_ICON,
  })),
  { href: '/port', title: '포트 번호 사전', desc: '22·80·443·3306 등 포트 127개의 서비스와 구간', section: 'port' as const, icon: PORT_ICON },
  { href: '/chmod', title: 'chmod 권한표', desc: '755·644가 여는 것과 umask까지 125가지', section: 'chmod' as const, icon: CHMOD_ICON },
  { href: '/fraction', title: '분수를 소수로', desc: '분모 20까지 기약분수 127가지의 소수·퍼센트', section: 'fraction' as const, icon: FRACTION_ICON },
  { href: '/keycode', title: '키 코드 사전', desc: 'code·key·keyCode를 자판 키 120개에서', section: 'keycode' as const, icon: KEYCODE_ICON },
  { href: '/cidr', title: 'CIDR 서브넷 표', desc: '/0부터 /32까지 마스크·주소 수·호스트 수', section: 'cidr' as const, icon: CIDR_ICON },
  { href: '/code', title: '모스 부호표', desc: '모스·NATO 음성 문자·점자 116가지', section: 'code' as const, icon: CODE_ICON },
  { href: '/times', title: '곱셈표', desc: '1단부터 20단까지 210칸의 곱과 나누기', section: 'times' as const, icon: TIMES_ICON },
  { href: '/percent', title: '퍼센트 계산', desc: '200의 15%·15% 할인·30은 200의 몇 %', section: 'percent' as const, icon: PERCENT_ICON },
  { href: '/sqrt', title: '제곱근표', desc: '1부터 200까지 소수와 근호를 간단히 한 꼴', section: 'sqrt' as const, icon: SQRT_ICON },
  { href: '/roman', title: '로마 숫자 연도표', desc: '1900년부터 2100년까지 한 해씩, 글자를 조각내어', section: 'roman' as const, icon: ROMAN_ICON },
  { href: '/year', title: '연도 사전', desc: '1900년부터 2100년까지 윤년·요일·주 수·띠', section: 'year' as const, icon: YEAR_ICON },
  { href: '/rem', title: 'CSS 단위표', desc: 'px를 rem·pt·pc·인치로, 1px부터 120px까지', section: 'rem' as const, icon: PX_ICON },
  { href: '/password', title: '비밀번호 세기 계산', desc: '몇 비트인지, 저장 방식에 따라 얼마나 버티는지', section: 'password' as const, icon: PASSWORD_ICON },
  { href: '/text/regex', title: '정규식 모음', desc: '표기법과 검사식 133가지, 보기까지 함께', section: 'text' as const, icon: REGEX_ICON },
  { href: '/random/dice', title: '주사위 확률표', desc: '1~6개로 나올 수 있는 합 111가지의 확률', section: 'random' as const, icon: DICE_ICON },
  { href: '/game/cube', title: '큐브 공식 모음', desc: 'F2L·OLL·PLL 119가지 경우와 공식', section: 'game' as const, icon: CUBE_ICON },
  { href: '/snap/lens', title: '렌즈 화각 계산', desc: '초점거리와 센서로 보는 104가지 화각', section: 'snap' as const, icon: LENS_ICON },
  { href: '/device/screen', title: '기기 화면 규격', desc: '해상도·인치·PPI를 108가지 화면에서', section: 'device' as const, icon: SCREEN_ICON },
  { href: '/sound/hz', title: '주파수 소리 듣기', desc: '20Hz~24kHz 113가지 순음', section: 'sound' as const, icon: FREQ_ICON },
  { href: '/image/size', title: '이미지 크기 모음', desc: '썸네일·인쇄·증명사진 116가지 규격', section: 'image' as const, icon: IMG_SIZE_ICON },
  { href: '/http', title: 'HTTP 코드 사전', desc: '상태 코드와 헤더 132가지의 뜻', section: 'http' as const, icon: HTTP_ICON },
  { href: '/ext', title: '파일 확장자 사전', desc: '140가지 확장자의 여는 프로그램과 MIME 타입', section: 'ext' as const, icon: EXT_ICON },
  ...GLYPHS.map(g => ({
    href: `/text/char/${g.slug}`,
    title: `${g.char} 특수문자`,
    desc: `${glyphFacts(g).unicode} · ${glyphFacts(g).entity}`,
    section: 'text' as const,
    icon: GLYPH_ICON,
  })),
  ...IMG_SIZES.map(x => ({
    href: `/image/size/${x.slug}`,
    title: `${x.name} 크기`,
    desc: `${x.w}×${x.h} · ${sizeFacts(x).ratioLabel}`,
    section: 'image' as const,
    icon: IMG_SIZE_ICON,
  })),
  ...HTTP_ITEMS.map(x => ({
    href: `/http/${x.slug}`,
    title: `HTTP ${x.name}`,
    desc: httpDesc(x.slug, 'ko'),
    section: 'http' as const,
    icon: HTTP_ICON,
  })),
  ...CMD_ITEMS.map(x => ({ href: `/cmd/${x.slug}`, title: x.name, desc: cmdDesc(x.slug, 'ko'), section: 'cmd' as const, icon: '⌨️' })),
  // 앱 이름을 제목 앞에 붙인다 — "엑셀 절대참조"와 "Excel F4" 둘 다로 찾는다
  ...SC_ITEMS.map(x => ({ href: `/shortcut/${x.slug}`, title: `${SC_UI.ko.appLabel[x.app]} ${x.action} — ${primaryCombo(x)}`, desc: scDesc(x.slug, 'ko'), section: 'shortcut' as const, icon: '⌨️' })),
  ...EM_ITEMS.map(x => ({ href: `/emoji/${x.slug}`, title: `${x.char} ${x.common}`, desc: emojiDesc(x.slug, 'ko'), section: 'emoji' as const, icon: '😀' })),
  // 제목이 오류 문구 그대로다 — 붙여 넣고 찾는 사람이 눈으로 맞춰 본다
  ...FORTUNE_ITEMS,
  ...SNAP_ITEMS,
];

/** 홈 화면 배지가 낡지 않도록 실제 개수를 데이터에서 뽑는다. */
export const SECTION_COUNTS: Record<Section, number> = SEARCH_INDEX.reduce(
  (acc, item) => ({ ...acc, [item.section]: (acc[item.section] ?? 0) + 1 }),
  {} as Record<Section, number>,
);
