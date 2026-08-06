/**
 * 시간 도구(/time) 섹션의 도구 메타데이터.
 *
 * 이 섹션의 전제: 시간과 관련된 잔일은 대부분 "재는 것"과 "세는 것"이다.
 * 재는 쪽은 타이머·스톱워치, 세는 쪽은 며칠·몇 주·근무일이다. 둘 다 브라우저
 * 안에서 끝나고, 재는 도구는 탭을 열어 둔 채로 쓰게 되므로 화면이 단순해야 한다.
 */
// node에서 직접 로드할 수 있게 확장자를 명시한다 (allowImportingTsExtensions)
import { relatedFor } from './related-rotate.ts';

export interface TimeTool {
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

export const TIME_TOOLS: TimeTool[] = [
  {
    slug: 'timer',
    title: '타이머',
    desc: '시간을 정해두고 끝나면 소리로 알림',
    icon: '⏲️',
    category: '재기',
    gradient: 'from-rose-500 to-orange-500',
    og: ['#f43f5e', '#f97316'],
    metaTitle: '타이머 - 온라인 카운트다운 알람',
    long: '분·초를 정해 두면 남은 시간이 크게 표시되고 끝나면 소리로 알려줍니다. 라면 3분, 스트레칭 10분처럼 자주 쓰는 시간은 버튼 하나로 맞출 수 있습니다.',
    features: ['1분·3분·5분·10분 빠른 설정', '남은 시간 크게 표시', '종료 알림음', '탭 제목에도 남은 시간 표시'],
  },
  {
    slug: 'stopwatch',
    title: '스톱워치',
    desc: '흐른 시간을 재고 구간마다 기록',
    icon: '⏱️',
    category: '재기',
    gradient: 'from-sky-500 to-indigo-600',
    og: ['#0ea5e9', '#4f46e5'],
    metaTitle: '스톱워치 - 온라인 랩타임 측정',
    long: '시작한 순간부터 흐른 시간을 100분의 1초까지 잽니다. 랩 버튼으로 구간을 나눠 기록할 수 있어 운동 세트나 반복 작업 시간을 비교할 때 씁니다.',
    features: ['0.01초 단위 측정', '랩(구간) 기록', '구간별 소요 시간 비교', '가장 빠른·느린 구간 표시'],
  },
  {
    slug: 'pomodoro',
    title: '뽀모도로 타이머',
    desc: '25분 집중 · 5분 휴식 반복',
    icon: '🍅',
    category: '재기',
    gradient: 'from-red-500 to-rose-600',
    og: ['#ef4444', '#e11d48'],
    metaTitle: '뽀모도로 타이머 - 25분 집중 5분 휴식',
    long: '25분 집중하고 5분 쉬는 것을 네 번 반복한 뒤 길게 쉬는 방법입니다. 지금이 집중 시간인지 휴식 시간인지 화면 색으로 바로 알 수 있고, 몇 번째인지도 세어 줍니다.',
    features: ['집중·휴식 자동 전환', '네 번마다 긴 휴식', '단계별 화면 색 구분', '완료한 뽀모도로 개수 기록'],
  },
  {
    slug: 'alarm',
    title: '알람',
    desc: '정한 시각에 소리로 깨우기',
    icon: '⏰',
    category: '재기',
    gradient: 'from-amber-500 to-orange-600',
    og: ['#f59e0b', '#ea580c'],
    metaTitle: '알람 - 지정한 시각에 울리는 온라인 알람',
    long: '시각을 정해 두면 그때 소리로 알려줍니다. 타이머와 달리 "몇 분 뒤"가 아니라 "몇 시 몇 분"으로 맞추므로, 회의 시작이나 약 먹을 시간처럼 정해진 시각에 씁니다.',
    features: ['시:분으로 시각 지정', '남은 시간 함께 표시', '알림음 선택', '탭을 켜 둔 채로 동작'],
  },
  {
    slug: 'worldclock',
    title: '세계 시계',
    desc: '주요 도시의 지금 시각을 한눈에',
    icon: '🌍',
    category: '세계 시간',
    gradient: 'from-cyan-500 to-blue-600',
    og: ['#06b6d4', '#2563eb'],
    metaTitle: '세계 시계 - 주요 도시 현재 시각',
    long: '서울·뉴욕·런던·도쿄 등 주요 도시의 현재 시각과 날짜를 함께 보여줍니다. 지금이 그곳의 새벽인지 업무 시간인지 색으로 구분해, 연락해도 되는 시간인지 바로 알 수 있습니다.',
    features: ['주요 도시 현재 시각', '날짜가 다른 곳 표시', '업무 시간·새벽 구분 표시', '도시 추가·제거'],
  },
  {
    slug: 'timezone',
    title: '시차 계산',
    desc: '해외 회의 시간을 서로의 시각으로',
    icon: '🕰️',
    category: '세계 시간',
    gradient: 'from-indigo-500 to-violet-600',
    og: ['#6366f1', '#7c3aed'],
    metaTitle: '시차 계산 - 해외 회의 시간 변환',
    long: '한국 시각을 정하면 상대 도시에서는 몇 시인지, 반대로도 바꿔 줍니다. 하루 전체를 시간대별로 늘어놓아 양쪽 모두 업무 시간인 구간을 눈으로 찾을 수 있습니다.',
    features: ['두 도시 시각 상호 변환', '하루 전체 시간대 비교표', '양쪽 업무 시간 겹치는 구간 표시', '서머타임 자동 반영'],
  },
  {
    slug: 'workdays',
    title: '근무일 계산',
    desc: '주말 빼고 며칠인지 세기',
    icon: '📆',
    category: '날짜 세기',
    gradient: 'from-emerald-500 to-teal-600',
    og: ['#10b981', '#0d9488'],
    metaTitle: '근무일 계산 - 주말 제외 영업일 수 계산',
    long: '두 날짜 사이의 근무일(주말 제외)을 셉니다. 공휴일을 직접 넣어 뺄 수 있고, "오늘부터 근무일 10일 뒤"처럼 반대 방향으로도 계산합니다.',
    features: ['주말 제외 근무일 수', '공휴일 직접 추가', '근무일 기준 n일 뒤 날짜', '전체 일수와 나란히 비교'],
  },
  {
    slug: 'date-add',
    title: '날짜 더하기·빼기',
    desc: '이 날짜에서 며칠·몇 달 뒤는 언제',
    icon: '➕',
    category: '날짜 세기',
    gradient: 'from-violet-500 to-fuchsia-600',
    og: ['#8b5cf6', '#d946ef'],
    metaTitle: '날짜 더하기·빼기 - 며칠 뒤가 언제인지 계산',
    long: '기준 날짜에 일·주·개월·년을 더하거나 빼서 언제인지 알려줍니다. 계약 만료일, 유통기한, 100일처럼 세다가 틀리기 쉬운 날짜를 정확히 계산합니다.',
    features: ['일·주·개월·년 단위 가감', '월말 처리(1월 31일 + 1개월)', '결과 요일 함께 표시', '자주 쓰는 100일·1년 버튼'],
  },
  {
    slug: 'weeknumber',
    title: '주차·분기 확인',
    desc: '오늘이 몇 주차이고 몇 분기인지',
    icon: '🗓️',
    category: '날짜 세기',
    gradient: 'from-slate-600 to-indigo-700',
    og: ['#475569', '#4338ca'],
    metaTitle: '주차·분기 확인 - 오늘이 몇 주차인지',
    long: '날짜를 넣으면 그 해 몇 번째 주인지(ISO 기준), 몇 분기인지, 그 해의 며칠째인지 알려줍니다. 주차로 일정을 관리하는 회사에서 "몇 주차 회의"를 맞출 때 씁니다.',
    features: ['ISO 8601 주차 계산', '분기·연중 일수 표시', '해당 주의 월요일~일요일 날짜', '남은 날짜·진행률'],
  },
  {
    slug: 'lived',
    title: '살아온 시간',
    desc: '태어나서 지금까지 몇 초인지',
    icon: '🎂',
    category: '날짜 세기',
    gradient: 'from-pink-500 to-rose-600',
    og: ['#ec4899', '#e11d48'],
    metaTitle: '살아온 시간 - 태어나서 지금까지 일·시간·초',
    long: '생년월일을 넣으면 지금까지 몇 년 몇 개월 며칠인지, 그리고 그것이 몇 시간·몇 분·몇 초인지 보여줍니다. 10000일처럼 기념할 만한 날이 언제인지도 함께 알려줍니다.',
    features: ['년·월·일과 총 일수', '시간·분·초 단위 환산', '다가오는 1000일 단위 기념일', '심장이 뛴 횟수 추정'],
  },
];

/** 같은 카테고리를 먼저, 그다음 나머지에서 채운다. */
export function relatedTimeTools(slug: string, limit = 4): TimeTool[] {
  const current = TIME_TOOLS.find(t => t.slug === slug);
  if (!current) return [];
  // 갈래 안의 자리부터 돌려 고른다 — 앞 여섯만 뽑으면 목록 뒤쪽은 들어오는 링크가 0이 된다
  return relatedFor(TIME_TOOLS, current, t => t.category === current.category, limit);
}

export function findTimeTool(slug: string): TimeTool | undefined {
  return TIME_TOOLS.find(t => t.slug === slug);
}
