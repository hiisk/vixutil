/**
 * 색상 도구(/color) 섹션의 도구 메타데이터.
 *
 * 이 섹션의 전제: 색을 고르는 일은 대부분 "이 색과 어울리는 색"과 "이 색 위에
 * 글씨가 읽히는가" 두 가지다. 앞은 색상환 규칙, 뒤는 대비 계산으로 답이 나온다.
 * 둘 다 순수 계산이라 브라우저에서 끝난다.
 */
export interface ColorTool {
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

export const COLOR_TOOLS: ColorTool[] = [
  {
    slug: 'palette',
    title: '팔레트 생성기',
    desc: '기준 색에 어울리는 색을 규칙대로 뽑기',
    icon: '🎨',
    category: '팔레트',
    gradient: 'from-violet-500 to-fuchsia-600',
    og: ['#8b5cf6', '#d946ef'],
    metaTitle: '팔레트 생성기 - 어울리는 색 조합 만들기',
    long: '색 하나를 고르면 보색·유사색·삼각 배색처럼 색상환 규칙에 따라 어울리는 색을 뽑아줍니다. 감으로 고르는 대신 규칙으로 고르면 조합이 크게 어긋나지 않습니다.',
    features: ['보색·유사색·삼각·사각 배색', '단색 명도 변화', '색마다 HEX 복사', '팔레트 전체 CSS로 복사'],
  },
  {
    slug: 'shades',
    title: '명도 단계 생성',
    desc: '색 하나로 50~900 단계 만들기',
    icon: '🪜',
    category: '팔레트',
    gradient: 'from-indigo-500 to-violet-600',
    og: ['#6366f1', '#7c3aed'],
    metaTitle: '명도 단계 생성 - 색 하나로 50~900 팔레트',
    long: '브랜드 색 하나를 넣으면 밝은 쪽(틴트)과 어두운 쪽(셰이드)으로 열 단계를 만들어 줍니다. Tailwind나 디자인 시스템에서 쓰는 50·100·…·900 형태 그대로 나옵니다.',
    features: ['50~900 열 단계 생성', '단계별 HEX·HSL 표시', '흰 글씨·검은 글씨 가독 표시', 'CSS 변수로 한 번에 복사'],
  },
  {
    slug: 'mixer',
    title: '색 섞기',
    desc: '두 색 사이의 중간색을 만들기',
    icon: '🧪',
    category: '팔레트',
    gradient: 'from-teal-500 to-sky-600',
    og: ['#14b8a6', '#0284c7'],
    metaTitle: '색 섞기 - 두 색 사이 중간색 만들기',
    long: '두 색을 정하고 비율을 움직이면 그 사이의 색이 만들어집니다. 그라디언트에서 특정 지점의 색을 뽑거나, 브랜드 색 두 개를 섞은 중간 톤을 찾을 때 씁니다.',
    features: ['비율 슬라이더로 중간색 조절', '중간 단계 여러 개 한 번에 보기', 'HEX·RGB 복사', '섞인 색의 대비 확인'],
  },
  {
    slug: 'random',
    title: '랜덤 색 뽑기',
    desc: '마음에 드는 색은 잠그고 다시 뽑기',
    icon: '🎲',
    category: '팔레트',
    gradient: 'from-rose-500 to-orange-500',
    og: ['#f43f5e', '#f97316'],
    metaTitle: '랜덤 색 뽑기 - 색 조합 무작위 생성',
    long: '색 다섯 개를 무작위로 뽑습니다. 마음에 드는 색은 자물쇠로 잠그고 나머지만 다시 뽑을 수 있어서, 원하는 조합이 나올 때까지 빠르게 돌려볼 수 있습니다.',
    features: ['한 번에 다섯 색 생성', '마음에 드는 색 잠금', '너무 튀지 않는 채도 범위', 'HEX 한 번에 복사'],
  },
  {
    slug: 'contrast',
    title: '명도 대비 검사',
    desc: '글자가 읽히는지 WCAG 기준으로 확인',
    icon: '👁️',
    category: '접근성',
    gradient: 'from-emerald-500 to-teal-600',
    og: ['#10b981', '#0d9488'],
    metaTitle: '명도 대비 검사 - WCAG 기준 색 대비 계산',
    long: '배경색과 글자색의 대비비를 계산해 웹 접근성 기준(WCAG AA·AAA)을 통과하는지 알려줍니다. 실제 글자를 얹은 미리보기로 눈으로도 확인할 수 있습니다.',
    features: ['대비비 계산(1~21)', 'AA·AAA 통과 여부 표시', '큰 글씨 기준 별도 판정', '통과할 때까지 밝기 자동 조절'],
  },
  {
    slug: 'colorblind',
    title: '색맹 시뮬레이터',
    desc: '색각 이상이 있는 눈에 어떻게 보이는지',
    icon: '👓',
    category: '접근성',
    gradient: 'from-amber-500 to-rose-500',
    og: ['#f59e0b', '#f43f5e'],
    metaTitle: '색맹 시뮬레이터 - 색약자에게 보이는 색 미리보기',
    long: '고른 색이 적색맹·녹색맹·청색맹·전색맹인 사람에게 어떻게 보이는지 변환해 보여줍니다. 빨강과 초록만으로 상태를 구분하는 화면이 왜 문제인지 바로 확인할 수 있습니다.',
    features: ['네 가지 색각 유형 변환', '두 색이 구분되는지 나란히 비교', '팔레트 전체 시뮬레이션', '대비 기준 함께 확인'],
  },
  {
    slug: 'gradient',
    title: '그라디언트 만들기',
    desc: '두세 색으로 CSS 그라디언트 생성',
    icon: '🌈',
    category: 'CSS',
    gradient: 'from-fuchsia-500 to-sky-500',
    og: ['#d946ef', '#0ea5e9'],
    metaTitle: '그라디언트 만들기 - CSS linear-gradient 코드 생성',
    long: '색과 각도를 정하면 CSS linear-gradient 코드를 만들어 줍니다. 색 위치를 조절해 어디서 색이 바뀔지 정할 수 있고, 결과는 그대로 붙여 넣어 쓸 수 있습니다.',
    features: ['색 두세 개와 위치 조절', '각도·방사형 선택', 'CSS 코드 즉시 복사', 'Tailwind 클래스 안내'],
  },
  {
    slug: 'shadow',
    title: '그림자 만들기',
    desc: 'box-shadow를 눈으로 보며 조절',
    icon: '🌫️',
    category: 'CSS',
    gradient: 'from-slate-600 to-indigo-700',
    og: ['#475569', '#4338ca'],
    metaTitle: '그림자 만들기 - CSS box-shadow 코드 생성',
    long: '그림자의 위치·번짐·색·투명도를 조절하면서 결과를 바로 보고 CSS 코드를 가져갑니다. 그림자를 여러 겹 쌓아 자연스러운 깊이를 만드는 프리셋도 있습니다.',
    features: ['위치·흐림·번짐·색 조절', '안쪽 그림자(inset) 지원', '자연스러운 다중 그림자 프리셋', 'CSS 코드 복사'],
  },
  {
    slug: 'name',
    title: '색 이름 찾기',
    desc: '이 색과 가장 가까운 이름은 무엇인가',
    icon: '🏷️',
    category: '변환',
    gradient: 'from-lime-500 to-emerald-600',
    og: ['#84cc16', '#059669'],
    metaTitle: '색 이름 찾기 - HEX와 가장 가까운 색 이름',
    long: '색 코드를 넣으면 가장 가까운 이름 있는 색(빨강·산호·청록 등)을 찾아 주고, HEX·RGB·HSL·CMYK 값을 한 번에 보여줍니다. 색을 말로 설명해야 할 때 씁니다.',
    features: ['가장 가까운 이름 있는 색', 'HEX·RGB·HSL·CMYK 동시 표시', '이름 색과의 차이 표시', '값마다 따로 복사'],
  },
  {
    slug: 'temperature',
    title: '색온도 변환',
    desc: '켈빈(K) 값을 실제 색으로 보기',
    icon: '🔥',
    category: '변환',
    gradient: 'from-orange-500 to-cyan-600',
    og: ['#f97316', '#0891b2'],
    metaTitle: '색온도 변환 - 켈빈(K)을 RGB 색으로',
    long: '2700K 전구색이 실제로 어떤 색인지, 6500K 주광색이 얼마나 푸른지 눈으로 확인합니다. 조명을 고르거나 사진 화이트밸런스를 이해할 때 도움이 됩니다.',
    features: ['1000K~12000K 슬라이더', '전구색·주백색·주광색 프리셋', 'RGB·HEX 값 표시', '두 색온도 나란히 비교'],
  },
];

/** 같은 카테고리를 먼저, 그다음 나머지에서 채운다. */
export function relatedColorTools(slug: string, limit = 4): ColorTool[] {
  const current = COLOR_TOOLS.find(t => t.slug === slug);
  if (!current) return [];
  const others = COLOR_TOOLS.filter(t => t.slug !== slug);
  const same = others.filter(t => t.category === current.category);
  const rest = others.filter(t => t.category !== current.category);
  return [...same, ...rest].slice(0, limit);
}

export function findColorTool(slug: string): ColorTool | undefined {
  return COLOR_TOOLS.find(t => t.slug === slug);
}
