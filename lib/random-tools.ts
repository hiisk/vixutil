/**
 * 랜덤 뽑기(결정 도우미) 섹션의 도구 메타데이터.
 *
 * 각 도구는 브라우저에서 난수로 결과를 만드는 인터랙티브 컴포넌트다.
 * 사진·외부 이미지 없이 이모지·SVG·CSS만으로 구현한다(정적 배포와 CSP에 맞음).
 *
 * 여기엔 목록/검색/사이트맵/상세 라우팅에 필요한 메타만 둔다.
 * slug → 실제 컴포넌트 매핑은 app/random/[slug]/page.tsx에서 한다.
 */
export interface RandomTool {
  slug: string;
  title: string;
  desc: string;
  icon: string;
  category: string;
  /** 상세 페이지 상단 히어로 그라디언트 */
  gradient: string;
  /** 검색·메타에 쓰는 한 줄 설명(길게) */
  long: string;
}

const RANDOM_TOOLS: RandomTool[] = [
  {
    slug: 'roulette',
    title: '룰렛 돌림판',
    desc: '항목을 넣고 돌려서 하나를 뽑는 룰렛',
    icon: '🎡',
    category: '뽑기',
    gradient: 'from-rose-500 to-pink-600',
    long: '점심 메뉴, 벌칙, 당번 등 항목을 자유롭게 넣고 돌림판을 돌려 무작위로 하나를 정하세요. 예/아니오, 메뉴 추천 등 프리셋도 제공합니다.',
  },
  {
    slug: 'ladder',
    title: '사다리타기',
    desc: '참가자와 결과를 잇는 사다리 게임',
    icon: '🪜',
    category: '뽑기',
    gradient: 'from-violet-500 to-purple-600',
    long: '참가자와 결과를 입력하면 무작위 사다리가 만들어집니다. 이름을 눌러 어떤 결과로 이어지는지 경로를 따라가 보세요. 당번·선물·순서 정하기에 딱.',
  },
  {
    slug: 'pick',
    title: '당첨자 뽑기',
    desc: '명단에서 당첨자를 무작위로 추첨',
    icon: '🎯',
    category: '추첨',
    gradient: 'from-amber-400 to-orange-500',
    long: '이름이나 항목 목록을 넣고 원하는 인원만큼 무작위로 뽑습니다. 경품 추첨, 발표자 정하기, 청소 당번 뽑기 등에 사용하세요.',
  },
  {
    slug: 'order',
    title: '순서 정하기',
    desc: '명단을 무작위 순서로 정렬',
    icon: '🔀',
    category: '추첨',
    gradient: 'from-cyan-500 to-sky-600',
    long: '참가자나 항목을 넣으면 무작위 순서로 정렬해 줍니다. 발표 순서, 게임 차례, 줄서기 순서 등을 공정하게 정할 때 쓰세요.',
  },
  {
    slug: 'secret-santa',
    title: '마니또 뽑기',
    desc: '자기 자신은 빼고 서로의 마니또를 배정',
    icon: '🎁',
    category: '추첨',
    gradient: 'from-rose-500 to-red-600',
    long: '참가자를 넣으면 아무도 자기 자신에게 걸리지 않게 마니또(비밀 친구)를 배정합니다. 폰을 돌려가며 각자 자기 마니또만 몰래 확인할 수 있어요. 연말 모임·마니또 게임에 딱.',
  },
  {
    slug: 'team',
    title: '팀 나누기',
    desc: '인원을 원하는 팀 수로 랜덤 배분',
    icon: '👥',
    category: '추첨',
    gradient: 'from-sky-500 to-blue-600',
    long: '참가자 명단을 넣고 팀 개수를 정하면 인원을 공평하게 무작위로 나눕니다. 조 편성, 게임 팀, 스터디 그룹 짜기에 좋습니다.',
  },
  {
    slug: 'number',
    title: '숫자 뽑기',
    desc: '범위 안에서 숫자 추첨 · 로또 번호',
    icon: '🔢',
    category: '숫자',
    gradient: 'from-emerald-400 to-teal-600',
    long: '원하는 범위에서 숫자를 무작위로 뽑습니다. 중복 없이 여러 개 뽑기, 로또(1~45 중 6개) 프리셋도 지원합니다.',
  },
  {
    slug: 'coin-dice',
    title: '동전·주사위',
    desc: '동전 던지기와 주사위 굴리기',
    icon: '🪙',
    category: '숫자',
    gradient: 'from-fuchsia-500 to-rose-500',
    long: '앞/뒤 동전 던지기와 1~6 주사위 굴리기를 한 곳에서. 간단한 결정이나 게임에 빠르게 쓰세요. 주사위는 여러 개도 굴릴 수 있습니다.',
  },
];

export default RANDOM_TOOLS;
export { RANDOM_TOOLS };
export const RANDOM_TOOLS_MAP: Record<string, RandomTool> = Object.fromEntries(
  RANDOM_TOOLS.map(t => [t.slug, t]),
);
