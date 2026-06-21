// 천간 (Heavenly Stems)
export const STEMS = [
  { idx: 0, hanja: '甲', kor: '갑', element: '목' as const, yinyang: '양', emoji: '🌳', color: '#16a34a',
    nature: '큰 나무·대나무',
    personality: '타고난 리더십과 개척정신을 가진 사람입니다. 큰 나무처럼 당당하게 서서 주위를 이끄는 힘이 있으며, 새로운 것에 도전하는 것을 두려워하지 않습니다. 목표를 향해 곧게 나아가는 추진력이 강하나, 타인의 의견에 귀를 기울이는 유연함도 키워나가면 더 큰 성공을 이룰 수 있습니다.' },
  { idx: 1, hanja: '乙', kor: '을', element: '목' as const, yinyang: '음', emoji: '🌿', color: '#15803d',
    nature: '풀·넝쿨',
    personality: '유연하고 적응력이 뛰어나며, 부드러운 방법으로 원하는 것을 이루어가는 능력이 있습니다. 인간관계가 풍부하고 배려심이 깊어 주위 사람들에게 사랑받는 편입니다. 넝쿨이 지지대를 타고 자라듯 환경을 잘 활용하는 영리함과 끈기가 있습니다.' },
  { idx: 2, hanja: '丙', kor: '병', element: '화' as const, yinyang: '양', emoji: '☀️', color: '#dc2626',
    nature: '태양·큰 불',
    personality: '밝고 따뜻한 성격으로 어디서든 주목을 받는 존재입니다. 태양처럼 당당하게 빛나며 주위를 환히 밝히는 에너지가 넘칩니다. 열정과 카리스마가 강하지만, 때로는 지나친 자기 확신이 갈등을 일으킬 수 있으니 상대방의 입장도 배려하는 것이 중요합니다.' },
  { idx: 3, hanja: '丁', kor: '정', element: '화' as const, yinyang: '음', emoji: '🕯️', color: '#ea580c',
    nature: '촛불·화롯불',
    personality: '섬세하고 감성이 풍부하며, 촛불처럼 주위를 따뜻하게 밝히는 존재입니다. 직관이 뛰어나고 예술적 감각이 발달해 있으며, 진실된 마음으로 사람들과 깊은 관계를 맺습니다. 때로는 예민함이 너무 강해 상처받기 쉬우니 자신을 보호하는 경계선을 만드는 것도 필요합니다.' },
  { idx: 4, hanja: '戊', kor: '무', element: '토' as const, yinyang: '양', emoji: '⛰️', color: '#ca8a04',
    nature: '산·큰 대지',
    personality: '듬직하고 신뢰감이 넘치며, 산처럼 든든한 존재입니다. 책임감이 강하고 흔들리지 않는 원칙으로 주위에 안정감을 줍니다. 다소 고집스럽게 보일 수 있지만 그 안에 타인을 위하는 따뜻한 마음이 담겨 있습니다.' },
  { idx: 5, hanja: '己', kor: '기', element: '토' as const, yinyang: '음', emoji: '🌾', color: '#a16207',
    nature: '평원·논밭',
    personality: '성실하고 꼼꼼하며, 비옥한 대지처럼 다양한 것을 품어안는 포용력이 있습니다. 조화를 중시하고 협력하는 데 뛰어나며, 꾸준한 노력으로 탄탄한 결실을 맺습니다. 때로는 우유부단하게 보일 수 있지만 사실은 모든 것을 신중하게 고려하는 깊은 사고의 결과입니다.' },
  { idx: 6, hanja: '庚', kor: '경', element: '금' as const, yinyang: '양', emoji: '⚔️', color: '#475569',
    nature: '강철·도끼',
    personality: '의지가 강하고 결단력이 뛰어나며, 강철처럼 단단한 신념을 가진 사람입니다. 원칙을 중시하고 불의를 참지 못하는 강직한 성격으로, 한 번 결정한 것은 끝까지 밀어붙이는 추진력이 있습니다. 그러나 때로는 지나친 고집이 관계에 마찰을 일으킬 수 있으니 유연함을 기르는 것이 도움이 됩니다.' },
  { idx: 7, hanja: '辛', kor: '신', element: '금' as const, yinyang: '음', emoji: '💎', color: '#64748b',
    nature: '보석·날카로운 칼',
    personality: '예민하고 섬세한 감각을 가진 완벽주의자입니다. 보석처럼 날카롭고 정교한 심미안으로 아름다움과 품질을 추구합니다. 높은 기준을 가지고 있어 스스로에게도 엄격하지만, 그 안에서 나오는 날카로운 통찰력이 주위 사람들에게 큰 도움을 줍니다.' },
  { idx: 8, hanja: '壬', kor: '임', element: '수' as const, yinyang: '양', emoji: '🌊', color: '#2563eb',
    nature: '큰 강·바다',
    personality: '포용력이 넓고 지혜로우며, 큰 강처럼 많은 것을 담아내는 깊이가 있습니다. 다재다능하고 아이디어가 풍부하며, 어떤 상황에서도 유연하게 흘러가는 적응력을 가지고 있습니다. 내면 깊은 곳에 강한 야망을 품고 있으며, 그 흐름이 결국 바다에 닿듯 큰 목표를 이루어내는 사람입니다.' },
  { idx: 9, hanja: '癸', kor: '계', element: '수' as const, yinyang: '음', emoji: '🌧️', color: '#1d4ed8',
    nature: '빗물·샘물',
    personality: '직관이 뛰어나고 감수성이 풍부하며, 빗물처럼 섬세하게 모든 것을 느끼는 사람입니다. 신비로운 매력이 있고 상상력이 풍부하며, 예술적 감각과 영적인 통찰력을 갖추고 있습니다. 타인의 감정에 민감하게 반응하며 깊이 공감하는 능력으로 주위 사람들에게 위안을 주는 존재입니다.' },
] as const;

// 지지 (Earthly Branches)
export const BRANCHES = [
  { idx: 0,  hanja: '子', kor: '자', animal: '쥐',     element: '수' as const, season: '겨울', hours: '23-01시', emoji: '🐀' },
  { idx: 1,  hanja: '丑', kor: '축', animal: '소',     element: '토' as const, season: '겨울', hours: '01-03시', emoji: '🐂' },
  { idx: 2,  hanja: '寅', kor: '인', animal: '호랑이', element: '목' as const, season: '봄',   hours: '03-05시', emoji: '🐅' },
  { idx: 3,  hanja: '卯', kor: '묘', animal: '토끼',   element: '목' as const, season: '봄',   hours: '05-07시', emoji: '🐇' },
  { idx: 4,  hanja: '辰', kor: '진', animal: '용',     element: '토' as const, season: '봄',   hours: '07-09시', emoji: '🐉' },
  { idx: 5,  hanja: '巳', kor: '사', animal: '뱀',     element: '화' as const, season: '여름', hours: '09-11시', emoji: '🐍' },
  { idx: 6,  hanja: '午', kor: '오', animal: '말',     element: '화' as const, season: '여름', hours: '11-13시', emoji: '🐎' },
  { idx: 7,  hanja: '未', kor: '미', animal: '양',     element: '토' as const, season: '여름', hours: '13-15시', emoji: '🐑' },
  { idx: 8,  hanja: '申', kor: '신', animal: '원숭이', element: '금' as const, season: '가을', hours: '15-17시', emoji: '🐒' },
  { idx: 9,  hanja: '酉', kor: '유', animal: '닭',     element: '금' as const, season: '가을', hours: '17-19시', emoji: '🐓' },
  { idx: 10, hanja: '戌', kor: '술', animal: '개',     element: '토' as const, season: '가을', hours: '19-21시', emoji: '🐕' },
  { idx: 11, hanja: '亥', kor: '해', animal: '돼지',   element: '수' as const, season: '겨울', hours: '21-23시', emoji: '🐖' },
] as const;

export type Element = '목' | '화' | '토' | '금' | '수';

export const ELEMENT_INFO: Record<Element, { color: string; bg: string; border: string; emoji: string; label: string }> = {
  목: { color: '#15803d', bg: '#f0fdf4', border: '#86efac', emoji: '🌳', label: '목(木)' },
  화: { color: '#dc2626', bg: '#fef2f2', border: '#fca5a5', emoji: '🔥', label: '화(火)' },
  토: { color: '#ca8a04', bg: '#fefce8', border: '#fde047', emoji: '⛰️', label: '토(土)' },
  금: { color: '#475569', bg: '#f8fafc', border: '#cbd5e1', emoji: '⚙️', label: '금(金)' },
  수: { color: '#2563eb', bg: '#eff6ff', border: '#93c5fd', emoji: '💧', label: '수(水)' },
};

export interface Pillar { stemIdx: number; branchIdx: number }

/* ── 년주 ── */
export function getYearPillar(year: number, month: number, day: number): Pillar {
  // 입춘(~2/4) 이전이면 전년도 기준
  const y = (month < 2 || (month === 2 && day < 4)) ? year - 1 : year;
  return {
    stemIdx:   ((y - 4) % 10 + 10) % 10,
    branchIdx: ((y - 4) % 12 + 12) % 12,
  };
}

/* ── 월주 ── */
export function getMonthPillar(month: number, day: number, yearStemIdx: number): Pillar {
  // 절기 시작 [gregorianMonth, approxDay] → 지지 branch index
  const JEOLGI: [number, number, number][] = [
    [1,  5,  1],  // 소한 → 축월(1)
    [2,  4,  2],  // 입춘 → 인월(2)
    [3,  6,  3],  // 경칩 → 묘월(3)
    [4,  5,  4],  // 청명 → 진월(4)
    [5,  6,  5],  // 입하 → 사월(5)
    [6,  6,  6],  // 망종 → 오월(6)
    [7,  7,  7],  // 소서 → 미월(7)
    [8,  8,  8],  // 입추 → 신월(8)
    [9,  8,  9],  // 백로 → 유월(9)
    [10, 8, 10],  // 한로 → 술월(10)
    [11, 7, 11],  // 입동 → 해월(11)
    [12, 7,  0],  // 대설 → 자월(0)
  ];

  let branchIdx = 0; // 자월 기본값 (대설 이전 → 전년 자월)
  for (let i = 11; i >= 0; i--) {
    const [m, d, b] = JEOLGI[i];
    if (month > m || (month === m && day >= d)) {
      branchIdx = b;
      break;
    }
  }

  // 오호둔원법: 인월 기준 천간
  const BASE = [2, 4, 6, 8, 0]; // 갑/기=丙, 을/경=戊, 병/신=庚, 정/임=壬, 무/계=甲
  const baseStem = BASE[yearStemIdx % 5];
  const offset = (branchIdx - 2 + 12) % 12;
  return { stemIdx: (baseStem + offset) % 10, branchIdx };
}

/* ── 일주 ── */
// (JDN + 49) % 60 공식 기반; JDN = unixDay + 2440588
// => (unixDay + 2440637) % 60 => offset = 2440637 % 60 = 17
const DAY_OFFSET = 17;
export function getDayPillar(date: Date): Pillar {
  const unixDay = Math.floor(date.getTime() / 86400000);
  const idx = ((unixDay + DAY_OFFSET) % 60 + 60) % 60;
  return { stemIdx: idx % 10, branchIdx: idx % 12 };
}

/* ── 시주 ── */
export function getHourPillar(hour: number, dayStemIdx: number): Pillar {
  // 자시=23-01(branch 0), 축시=01-03(1), ...
  const branchIdx = Math.floor(((hour + 1) % 24) / 2);
  // 오자둔원법
  const BASE = [0, 2, 4, 6, 8]; // 갑/기=甲, 을/경=丙, 병/신=戊, 정/임=庚, 무/계=壬
  const stemIdx = (BASE[dayStemIdx % 5] + branchIdx) % 10;
  return { stemIdx, branchIdx };
}

/* ── 오행 집계 ── */
const STEM_ELEMENTS: Element[] = ['목','목','화','화','토','토','금','금','수','수'];
const BRANCH_ELEMENTS: Element[] = ['수','토','목','목','토','화','화','토','금','금','토','수'];

export function countElements(pillars: (Pillar | null)[]): Record<Element, number> {
  const cnt: Record<Element, number> = { 목:0, 화:0, 토:0, 금:0, 수:0 };
  for (const p of pillars) {
    if (!p) continue;
    cnt[STEM_ELEMENTS[p.stemIdx]]++;
    cnt[BRANCH_ELEMENTS[p.branchIdx]]++;
  }
  return cnt;
}

/* ── 헬퍼 ── */
export function pillarLabel(p: Pillar) {
  return `${STEMS[p.stemIdx].kor}${BRANCHES[p.branchIdx].kor}`;
}
export function pillarHanja(p: Pillar) {
  return `${STEMS[p.stemIdx].hanja}${BRANCHES[p.branchIdx].hanja}`;
}

// 시간 → 시진 이름
export const SI_NAMES = ['자시','축시','인시','묘시','진시','사시','오시','미시','신시','유시','술시','해시'];
export function hourToSi(hour: number): string {
  return SI_NAMES[Math.floor(((hour + 1) % 24) / 2)];
}
