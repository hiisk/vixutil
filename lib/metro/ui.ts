/** 지하철 게임 화면의 3언어 문구 */
import type { Lang } from '../formula/terms.ts';

export const METRO_UI = {
  ko: {
    home: '홈',
    section: '지하철 역 맞추기',
    hubTitle: '지하철 노선 역 이름 맞추기',
    hubLead: '서울·도쿄·런던·뉴욕 노선을 골라 기점부터 역 이름을 순서대로 타이핑하세요',
    placeholder: '다음 역 이름을 타이핑…',
    start: '시작',
    skip: '건너뛰기',
    perMin: '분당 역',
    accuracy: '정확도',
    wrongTry: '아직 맞지 않습니다',
    nextIs: (n: number, t: number) => `${n}번째 역 / 전체 ${t}개`,
    restart: '다시 하기',
    giveUp: '정답 보기',
    hint: '힌트',
    solvedOf: (a: number, b: number) => `${a} / ${b}`,
    elapsed: '경과 시간',
    remaining: '남은 역',
    done: '모두 맞혔습니다',
    doneIn: (t: string) => `${t}에 완주했습니다`,
    already: '이미 맞힌 역입니다',
    notFound: '이 노선에 없는 역입니다',
    hintFirst: (c: string) => `다음 역은 "${c}"로 시작합니다`,
    hintLen: (n: number) => `다음 역은 ${n}글자입니다`,
    hintNear: (a: string) => `${a} 옆의 역입니다`,
    hintUsed: (n: number) => `힌트 ${n}번 사용`,
    listTitle: '역 목록',
    howTitle: '푸는 방법',
    how: [
      '기점부터 순서대로 다음 역 이름을 타이핑합니다. 다 치는 순간 엔터 없이 넘어갑니다.',
      '노선도가 맞힐 역 쪽으로 따라 움직이고, 지나온 역이 화면에 남아 실마리가 됩니다.',
      '로마자로 쳐도 정답으로 받습니다. 공백과 하이픈, 대소문자는 무시합니다.',
      '막히면 힌트를 누르거나 건너뛰기로 넘어갈 수 있습니다. 건너뛴 역은 오타로 셉니다.',
    ],
    related: '다른 노선',
    stations: '역 수',
    lineColor: '노선색',
    loopNote: '순환선',
  },
  en: {
    home: 'Home',
    section: 'Name the Stations',
    hubTitle: 'Metro Line Station Quiz',
    hubLead: 'Pick a line in Seoul, Tokyo, London or New York and type its stations in order from the terminus',
    placeholder: 'Type the next station…',
    start: 'Start',
    skip: 'Skip',
    perMin: 'Stations/min',
    accuracy: 'Accuracy',
    wrongTry: 'Not it yet',
    nextIs: (n: number, t: number) => `Station ${n} of ${t}`,
    restart: 'Play again',
    giveUp: 'Reveal answers',
    hint: 'Hint',
    solvedOf: (a: number, b: number) => `${a} / ${b}`,
    elapsed: 'Elapsed',
    remaining: 'Left',
    done: 'You named them all',
    doneIn: (t: string) => `Finished in ${t}`,
    already: 'Already found',
    notFound: 'Not on this line',
    hintFirst: (c: string) => `The next station starts with “${c}”`,
    hintLen: (n: number) => `The next station has ${n} characters`,
    hintNear: (a: string) => `It is next to ${a}`,
    hintUsed: (n: number) => `${n} hints used`,
    listTitle: 'Station list',
    howTitle: 'How to play',
    how: [
      'Type the next station in order from the terminus. Finish the word and it advances without Enter.',
      'The map follows the station you are on, and the ones behind you stay visible as clues.',
      'Romanised spellings count. Spaces, hyphens and letter case are ignored.',
      'Stuck? Take a hint or skip the station — a skip counts as a miss.',
    ],
    related: 'Other lines',
    stations: 'Stations',
    lineColor: 'Line colour',
    loopNote: 'Loop line',
  },
} as const;

export const METRO_LANGS: { lang: Lang; label: string; prefix: string }[] = [
  { lang: 'ko', label: '한국어', prefix: '' },
  { lang: 'en', label: 'EN', prefix: '/en' },
];

/** 경과 시간을 분:초로 */
export const clock = (ms: number): string => {
  const total = Math.floor(ms / 1000);
  const m = Math.floor(total / 60);
  const sec = total % 60;
  return `${m}:${String(sec).padStart(2, '0')}`;
};

/** hreflang 묶음 — 노선 slug만 넣으면 네 줄이 기계적으로 나온다 */
export function metroAlternates(slug?: string) {
  const path = slug ? `/metro/${slug}` : '/metro';
  return { 'ko': path, 'en': `/en${path}`, 'x-default': `/en${path}` };
}
