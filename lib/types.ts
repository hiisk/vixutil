export interface TestQ {
  q: string;
  axis?: 'EI' | 'SN' | 'TF' | 'JP'; // MBTI axis (high score = E/S/T/J)
  opts: { text: string; score: number }[];
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
}

export interface Test {
  slug: string;
  title: string;
  desc: string;
  icon: string;
  category: string;
  type?: 'score' | 'mbti'; // default 'score'
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
