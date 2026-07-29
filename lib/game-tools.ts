/**
 * 두뇌 게임(/game) 섹션의 도구 메타데이터.
 *
 * 이 섹션의 전제: 결과가 숫자로 남는 짧은 게임이다. 오락이지만 점수가 나오면
 * 사람은 한 번 더 한다 — 반응속도 300ms를 본 사람은 250ms를 노린다. 그래서
 * 모든 게임이 기록을 남기고 또래 평균과 견줄 수 있게 한다.
 *
 * 목록·검색·사이트맵·상세 셸에 필요한 메타만 둔다.
 * 실제 게임은 components/game/*.tsx가 슬러그별로 담당한다.
 */
export interface GameTool {
  slug: string;
  title: string;
  desc: string;
  icon: string;
  category: string;
  gradient: string;
  og: [string, string];
  long: string;
  metaTitle: string;
  features: string[];
}

export const GAME_TOOLS: GameTool[] = [
  {
    slug: 'reaction',
    title: '반응속도 테스트',
    desc: '초록불이 켜지면 얼마나 빨리 누르나',
    icon: '⚡',
    category: '반응·속도',
    gradient: 'from-emerald-500 to-teal-600',
    og: ['#10b981', '#0d9488'],
    metaTitle: '반응속도 테스트 - 내 반응 시간 밀리초로 측정',
    long: '화면이 초록으로 바뀌는 순간 누르세요. 다섯 번을 재서 평균과 최고 기록을 밀리초로 알려주고, 사람의 평균 반응속도와 견줘 어느 정도인지 보여줍니다.',
    features: ['다섯 번 측정 후 평균·최고 기록', '너무 일찍 누르면 무효 처리', '사람 평균과 비교', '기록 다시 도전'],
  },
  {
    slug: 'cps',
    title: '클릭 속도 테스트',
    desc: '10초 동안 몇 번이나 클릭할 수 있나',
    icon: '🖱️',
    category: '반응·속도',
    gradient: 'from-sky-500 to-indigo-600',
    og: ['#0ea5e9', '#4f46e5'],
    metaTitle: '클릭 속도 테스트 - 초당 클릭 수(CPS) 측정',
    long: '정해진 시간 동안 최대한 빠르게 클릭해 초당 클릭 수(CPS)를 잽니다. 5초·10초·30초 중에 고를 수 있고, 휴대폰에서는 터치로도 같은 방식으로 측정됩니다.',
    features: ['5초 · 10초 · 30초 중 선택', '초당 클릭 수(CPS) 계산', '최고 기록 저장', '남은 시간 실시간 표시'],
  },
  {
    slug: 'aim',
    title: '표적 클릭 게임',
    desc: '30초 동안 과녁을 몇 개나 맞히나',
    icon: '🎯',
    category: '반응·속도',
    gradient: 'from-rose-500 to-orange-500',
    og: ['#f43f5e', '#f97316'],
    metaTitle: '표적 클릭 게임 - 마우스 정확도·에임 연습',
    long: '무작위 위치에 나타나는 과녁을 제한 시간 안에 최대한 많이 맞히세요. 명중 수와 놓친 클릭으로 정확도를 계산해 주므로 마우스 조작 연습에도 쓸 수 있습니다.',
    features: ['30초 동안 명중 수 측정', '빗나간 클릭까지 세어 정확도 계산', '과녁 크기 선택', '평균 명중 간격 표시'],
  },
  {
    slug: 'typing',
    title: '타자 연습',
    desc: '한글 문장을 쳐서 타수와 정확도 측정',
    icon: '⌨️',
    category: '반응·속도',
    gradient: 'from-violet-500 to-fuchsia-600',
    og: ['#8b5cf6', '#d946ef'],
    metaTitle: '타자 연습 - 한글 타수(타/분)와 정확도 측정',
    long: '주어진 문장을 그대로 쳐서 분당 타수와 정확도를 잽니다. 틀린 글자는 즉시 표시되고, 문장은 매번 바뀌므로 외워서 치는 일이 없습니다.',
    features: ['분당 타수(타/분) 계산', '글자 단위 정확도', '틀린 글자 즉시 표시', '문장 여러 개 연속 연습'],
  },
  {
    slug: 'memory',
    title: '순서 기억 게임',
    desc: '색이 켜지는 순서를 따라 누르기',
    icon: '🧠',
    category: '기억력',
    gradient: 'from-amber-500 to-rose-500',
    og: ['#f59e0b', '#f43f5e'],
    metaTitle: '순서 기억 게임 - 색 순서 따라하기로 기억력 측정',
    long: '색깔 단추가 하나씩 켜지는 순서를 기억했다가 그대로 눌러야 합니다. 맞힐 때마다 순서가 한 칸씩 길어지므로, 몇 단계까지 갔는지가 곧 단기 기억력 점수가 됩니다.',
    features: ['단계마다 순서가 길어짐', '소리 없이도 색으로 구분', '최고 단계 기록', '틀린 지점 표시'],
  },
  {
    slug: 'number-memory',
    title: '숫자 암기 테스트',
    desc: '점점 길어지는 숫자를 외워서 입력',
    icon: '🔢',
    category: '기억력',
    gradient: 'from-indigo-500 to-violet-600',
    og: ['#6366f1', '#7c3aed'],
    metaTitle: '숫자 암기 테스트 - 몇 자리까지 외울 수 있나',
    long: '숫자가 잠깐 보였다가 사라지면 그대로 입력하세요. 맞히면 한 자리가 늘어납니다. 사람이 한 번에 외우는 숫자는 보통 일곱 자리 안팎이라 그 근처에서 갈립니다.',
    features: ['맞힐 때마다 한 자리씩 증가', '보여주는 시간 자동 조절', '최고 자릿수 기록', '정답과 내 답 비교'],
  },
  {
    slug: 'sequence',
    title: '패턴 기억 게임',
    desc: '격자에 켜진 칸의 위치를 기억하기',
    icon: '🔲',
    category: '기억력',
    gradient: 'from-slate-600 to-indigo-700',
    og: ['#475569', '#4338ca'],
    metaTitle: '패턴 기억 게임 - 격자 위치 기억력 측정',
    long: '격자에서 몇 칸이 잠깐 켜졌다가 꺼집니다. 어디였는지 기억해 그 칸들을 누르세요. 단계가 오를수록 켜지는 칸이 늘고 격자도 넓어집니다.',
    features: ['단계마다 켜지는 칸 증가', '3×3에서 시작해 격자 확대', '최고 단계 기록', '틀린 칸 표시'],
  },
  {
    slug: 'color-blind',
    title: '색 구분 테스트',
    desc: '미세하게 다른 색 하나를 찾아내기',
    icon: '🎨',
    category: '감각',
    gradient: 'from-fuchsia-500 to-violet-600',
    og: ['#d946ef', '#7c3aed'],
    metaTitle: '색 구분 테스트 - 미세한 색 차이 구별하기',
    long: '같은 색 사각형 사이에 딱 하나 다른 색이 섞여 있습니다. 단계가 오를수록 차이가 줄어들어 결국 구분이 안 되는 지점이 오는데, 그 지점이 곧 내 색 구분 한계입니다.',
    features: ['단계마다 색 차이 감소', '한계 단계 기록', '화면 밝기 안내', '색약 검사와의 차이 설명'],
  },
  {
    slug: 'hearing',
    title: '가청 주파수 테스트',
    desc: '몇 Hz까지 들리는지 확인',
    icon: '👂',
    category: '감각',
    gradient: 'from-cyan-500 to-blue-600',
    og: ['#06b6d4', '#2563eb'],
    metaTitle: '가청 주파수 테스트 - 몇 Hz까지 들리는지 측정',
    long: '주파수를 조금씩 올려가며 어디까지 들리는지 확인합니다. 사람의 가청 상한은 나이가 들수록 낮아져서, 들리는 주파수로 대략적인 귀 나이를 가늠해 볼 수 있습니다.',
    features: ['20Hz~20kHz 단계별 재생', '들리는 한계 주파수 기록', '나이대별 평균과 비교', '이어폰 권장 안내'],
  },
  {
    slug: 'math',
    title: '암산 대결',
    desc: '30초 동안 몇 문제나 푸나',
    icon: '➕',
    category: '두뇌',
    gradient: 'from-emerald-500 to-lime-600',
    og: ['#10b981', '#65a30d'],
    metaTitle: '암산 대결 - 30초 사칙연산 문제 풀기',
    long: '제한 시간 안에 사칙연산 문제를 최대한 많이 푸세요. 난이도를 고를 수 있고, 맞힌 수와 정확도, 한 문제당 평균 시간을 알려줍니다.',
    features: ['덧셈·뺄셈·곱셈·나눗셈 선택', '쉬움·보통·어려움 난이도', '문제당 평균 풀이 시간', '틀린 문제 다시 보기'],
  },
];

/** 같은 카테고리를 먼저, 그다음 나머지에서 채운다. */
export function relatedGameTools(slug: string, limit = 4): GameTool[] {
  const current = GAME_TOOLS.find(t => t.slug === slug);
  if (!current) return [];
  const others = GAME_TOOLS.filter(t => t.slug !== slug);
  const same = others.filter(t => t.category === current.category);
  const rest = others.filter(t => t.category !== current.category);
  return [...same, ...rest].slice(0, limit);
}

export function findGameTool(slug: string): GameTool | undefined {
  return GAME_TOOLS.find(t => t.slug === slug);
}
