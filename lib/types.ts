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

export interface Generator {
  slug: string;
  title: string;
  desc: string;
  icon: string;
  category: string;
  type: 'combine' | 'pick' | 'password' | 'number';
  pools?: string[][];
  items?: string[];
  count?: number;
  separator?: string;
  min?: number;
  max?: number;
}
