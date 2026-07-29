/**
 * 오늘의 행운 색.
 *
 * 이름(선택) + 날짜를 시드로 그날의 행운 색을 정한다. 이름을 넣으면 사람마다,
 * 안 넣으면 "오늘 모두의 색"으로 쓸 수 있다. 결정론적이라 같은 날 같은 입력은
 * 같은 색이 나온다. 재미·참고용이다.
 *
 * node --test에서 단독 로드되도록 seededInt를 자체 인라인한다.
 */
function seededInt(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h >>> 0);
}

export interface LuckyColor {
  name: string;
  hex: string;
  meaning: string;
  tip: string;
  keywords: string[];
}

const COLORS: LuckyColor[] = [
  { name: '레드', hex: '#ef4444', meaning: '열정과 자신감이 솟는 하루', tip: '중요한 자리엔 빨간 포인트 아이템 하나로 존재감을 더해보세요.', keywords: ['열정', '자신감', '추진력'] },
  { name: '오렌지', hex: '#f97316', meaning: '활력과 사교운이 좋은 날', tip: '먼저 웃으며 인사해보세요. 좋은 인연이 따라옵니다.', keywords: ['활력', '사교', '긍정'] },
  { name: '옐로', hex: '#eab308', meaning: '행운과 기회가 다가오는 하루', tip: '작은 제안이나 기회에 "예스"라고 답해보세요.', keywords: ['행운', '기회', '명랑'] },
  { name: '그린', hex: '#22c55e', meaning: '안정과 치유의 기운이 흐르는 날', tip: '잠깐이라도 초록을 곁에 두거나 산책으로 마음을 쉬어가세요.', keywords: ['안정', '치유', '균형'] },
  { name: '블루', hex: '#3b82f6', meaning: '집중력과 신뢰가 빛나는 하루', tip: '미뤄둔 일을 처리하기 좋은 날. 차분히 하나씩 끝내보세요.', keywords: ['집중', '신뢰', '차분함'] },
  { name: '네이비', hex: '#4338ca', meaning: '침착함과 지혜가 필요한 날', tip: '성급한 결정보다 한 번 더 생각하는 신중함이 득이 됩니다.', keywords: ['침착', '지혜', '신중'] },
  { name: '퍼플', hex: '#a855f7', meaning: '감성과 직관이 예민해지는 하루', tip: '떠오르는 아이디어를 메모해두세요. 영감이 재산이 됩니다.', keywords: ['감성', '직관', '창의'] },
  { name: '핑크', hex: '#ec4899', meaning: '사랑과 다정함이 커지는 날', tip: '고마운 사람에게 짧은 안부 한마디를 건네보세요.', keywords: ['사랑', '다정', '온기'] },
  { name: '화이트', hex: '#e2e8f0', meaning: '새 출발과 정리에 좋은 하루', tip: '책상이나 마음속 하나를 비워보세요. 새로운 게 들어옵니다.', keywords: ['순수', '정리', '시작'] },
  { name: '블랙', hex: '#334155', meaning: '세련됨과 자기 보호의 기운', tip: '무리한 부탁은 정중히 거절해도 좋은 날. 나를 먼저 챙기세요.', keywords: ['세련', '보호', '중심'] },
  { name: '골드', hex: '#f59e0b', meaning: '재물운과 성취의 기운이 도는 날', tip: '가계부를 열어보거나 작은 목표 하나를 마무리해보세요.', keywords: ['재물', '성취', '풍요'] },
  { name: '민트', hex: '#14b8a6', meaning: '상쾌함과 균형이 살아나는 하루', tip: '물을 자주 마시고 가볍게 몸을 움직이면 컨디션이 오릅니다.', keywords: ['상쾌', '균형', '회복'] },
];

export function ymdOf(d: Date): string {
  return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
}

export interface TodayColorResult {
  lucky: LuckyColor;
  avoid: LuckyColor;
}

export function getTodayColor(name: string, ymd: string): TodayColorResult {
  const base = `lucky-color-${name.trim()}-${ymd}`;
  const li = seededInt(base) % COLORS.length;
  // 피해야 할 색은 행운의 색과 겹치지 않게 고른다.
  let ai = seededInt(`${base}-avoid`) % COLORS.length;
  if (ai === li) ai = (ai + 1) % COLORS.length;
  return { lucky: COLORS[li], avoid: COLORS[ai] };
}

export { COLORS };
