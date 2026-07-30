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
import { FREQS, FREQ_ICON, freqSlug } from './sound/freqs';
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
export type Section = 'calculator' | 'test' | 'quiz' | 'generator' | 'checklist' | 'fortune' | 'snap' | 'random' | 'device' | 'image' | 'text' | 'game' | 'color' | 'time' | 'sound' | 'food' | 'convert' | 'rate' | 'body' | 'geometry' | 'country' | 'hanja' | 'metro' | 'music';

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
  ...FORTUNE_ITEMS,
  ...SNAP_ITEMS,
];

/** 홈 화면 배지가 낡지 않도록 실제 개수를 데이터에서 뽑는다. */
export const SECTION_COUNTS: Record<Section, number> = SEARCH_INDEX.reduce(
  (acc, item) => ({ ...acc, [item.section]: (acc[item.section] ?? 0) + 1 }),
  {} as Record<Section, number>,
);
