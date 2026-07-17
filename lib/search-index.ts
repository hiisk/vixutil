import { CATS } from './calculator-catalog';
import { TESTS } from './test-data';
import { QUIZZES } from './quiz-data';
import { GENERATORS } from './generator-data';
import { CHECKLISTS } from './checklist-data';

/**
 * 사이트 전체 검색 인덱스.
 *
 * 지금까지는 섹션별 허브에만 검색이 있어서, "실업급여"를 찾으려면 그게 계산기에
 * 있다는 걸 미리 알아야 했다. 실제로는 계산기와 체크리스트 양쪽에 있는데도.
 * 어느 섹션에 있는지 모르는 사용자는 찾을 방법이 없었다.
 *
 * 검색 페이지에서만 쓴다 — 홈에 실으면 랜딩 페이지가 무거워진다.
 */
export type Section = 'calculator' | 'test' | 'quiz' | 'generator' | 'checklist' | 'fortune' | 'snap';

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
  ...FORTUNE_ITEMS,
  ...SNAP_ITEMS,
];

/** 홈 화면 배지가 낡지 않도록 실제 개수를 데이터에서 뽑는다. */
export const SECTION_COUNTS: Record<Section, number> = SEARCH_INDEX.reduce(
  (acc, item) => ({ ...acc, [item.section]: (acc[item.section] ?? 0) + 1 }),
  {} as Record<Section, number>,
);
