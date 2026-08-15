export interface TestOpt {
  text: string;
  score: number;
  /** 범주형(type: 'category')에서 이 보기가 표를 주는 유형 열쇠 — 결과의 k와 같다 */
  k?: string;
  /** 사분면(type: 'quadrant')에서 축마다 더할 값. 축 순서는 한 테스트 안에서 고정이다 */
  ax?: number[];
}

export interface TestQ {
  q: string;
  axis?: 'EI' | 'SN' | 'TF' | 'JP'; // MBTI axis (high score = E/S/T/J)
  opts: TestOpt[];
}

export interface TestResult {
  min: number;
  max: number;
  title: string;
  desc: string;
  emoji: string;
  traits?: string[];
  color?: string; // tailwind gradient e.g. 'from-violet-500 to-pink-600'
  mbtiType?: string; // 'INTJ', 'ENFP', etc. — used when test.type === 'mbti'
  /**
   * type: 'category'면 유형 열쇠, type: 'quadrant'면 축 부호 문자열('+-' 등).
   * 두 형 모두 min/max는 안 쓴다 — MBTI형과 같이 전부 0으로 둔다.
   */
  k?: string;
}

export interface Test {
  slug: string;
  title: string;
  desc: string;
  icon: string;
  category: string;
  /**
   * 채점 방식. 없으면 예전 그대로 점수합 → 구간이다.
   *  - mbti     : 축 넷을 임계값으로 갈라 네 글자를 만든다
   *  - category : 표를 가장 많이 받은 유형 (순서 없는 결과용 — 언어형/봉사형/선물형…)
   *  - quadrant : 축 두 개의 부호 조합 (주장×협조, 불안×회피처럼 축이 둘인 결과용)
   */
  type?: 'score' | 'mbti' | 'category' | 'quadrant';
  questions: TestQ[];
  results: TestResult[];
}

export interface QuizQ {
  q: string;
  opts: string[];
  correct: number;
  explanation?: string;
}

export interface Quiz {
  slug: string;
  title: string;
  desc: string;
  icon: string;
  category: string;
  questions: QuizQ[];
}

export interface ChecklistItem {
  id: string;
  text: string;
  note?: string;
}

export interface ChecklistSection {
  title: string;
  icon: string;
  items: ChecklistItem[];
}

export interface Checklist {
  slug: string;
  title: string;
  desc: string;
  icon: string;
  category: string;
  sections: ChecklistSection[];
}

export interface Generator {
  slug: string;
  title: string;
  desc: string;
  icon: string;
  category: string;
  /** sample = min~max 범위에서 중복 없이 count개를 뽑아 오름차순 정렬 (로또 등) */
  type: 'combine' | 'pick' | 'password' | 'number' | 'sample';
  pools?: string[][];
  items?: string[];
  count?: number;
  separator?: string;
  min?: number;
  max?: number;
}
