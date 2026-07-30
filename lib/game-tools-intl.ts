// node에서 직접 로드할 수 있게 확장자를 명시한다 (allowImportingTsExtensions)
import type { GameTool } from './game-tools.ts';
import { GAME_TOOLS } from './game-tools.ts';

/**
 * 두뇌 게임(/game) 섹션의 영어·중국어 메타데이터.
 *
 * slug·icon·gradient·og는 한국어와 공유하고 사람이 읽는 문구만 갈아 끼운다.
 *
 * 타자 연습은 언어마다 재는 대상이 다르다 — 한국어는 자판을 누른 횟수(타/분),
 * 영어는 분당 단어 수(WPM), 중국어는 분당 글자 수다. 문구도 그에 맞춰 쓴다.
 */
export type GameIntlLang = 'en';

interface ToolCopy {
  title: string; desc: string; category: string;
  metaTitle: string; long: string; features: string[];
}

const COPY: Record<GameIntlLang, Record<string, ToolCopy>> = {
  en: {
    reaction: {
      title: 'Reaction Time Test', desc: 'How fast can you click when it turns green', category: 'Speed',
      metaTitle: 'Reaction Time Test — Measure Your Reaction in Milliseconds',
      long: 'Click the moment the screen turns green. It takes five readings, gives you the average and your best in milliseconds, and shows where you land against typical human reaction time.',
      features: ['Average and best over five rounds', 'Clicking too early is voided', 'Compared against the human average', 'Try again for a better record'],
    },
    cps: {
      title: 'Click Speed Test', desc: 'How many clicks can you get in 10 seconds', category: 'Speed',
      metaTitle: 'Click Speed Test — Measure Your CPS (Clicks Per Second)',
      long: 'Click as fast as you can for a set time to measure clicks per second. Choose 5, 10 or 30 seconds; on a phone, tapping is measured exactly the same way.',
      features: ['5, 10 or 30 seconds', 'Clicks per second calculated', 'Best score saved', 'Time remaining shown live'],
    },
    aim: {
      title: 'Aim Trainer', desc: 'How many targets can you hit in 30 seconds', category: 'Speed',
      metaTitle: 'Aim Trainer — Mouse Accuracy and Aim Practice',
      long: 'Hit as many targets as you can before time runs out, each appearing in a random spot. It counts your misses too and works out accuracy, so it works as mouse practice rather than just a score.',
      features: ['Hits counted over 30 seconds', 'Misses counted for real accuracy', 'Choose the target size', 'Average time between hits'],
    },
    typing: {
      title: 'Typing Speed Test', desc: 'Type sentences to measure WPM and accuracy', category: 'Speed',
      metaTitle: 'Typing Speed Test — Measure WPM and Accuracy Free',
      long: 'Type the sentence you are given to measure words per minute and accuracy. Mistakes are marked as you go, and the sentence changes each round so you cannot memorise your way through it.',
      features: ['Words per minute and characters per minute', 'Accuracy per character', 'Wrong characters marked immediately', 'Several sentences back to back'],
    },
    memory: {
      title: 'Sequence Memory Game', desc: 'Repeat the order the colours light up in', category: 'Memory',
      metaTitle: 'Sequence Memory Game — Test Your Short-Term Memory',
      long: 'Colour buttons light up one at a time and you have to press them back in the same order. Every correct round adds one more step, so how far you get is a short-term memory score.',
      features: ['The sequence grows every level', 'Colours distinguish it without sound', 'Best level saved', 'Shows where you went wrong'],
    },
    'number-memory': {
      title: 'Number Memory Test', desc: 'Memorise a number that keeps getting longer', category: 'Memory',
      metaTitle: 'Number Memory Test — How Many Digits Can You Hold',
      long: 'A number appears briefly, disappears, and you type it back. Get it right and it gains a digit. Most people hold around seven digits at once, so that is where it usually starts to break down.',
      features: ['One more digit on every correct answer', 'Display time adjusts automatically', 'Best digit count saved', 'Your answer compared with the number'],
    },
    sequence: {
      title: 'Pattern Memory Game', desc: 'Remember which squares in the grid lit up', category: 'Memory',
      metaTitle: 'Pattern Memory Game — Test Visual and Spatial Memory',
      long: 'A few squares in a grid flash on and off. Remember where they were and press them. Higher levels light more squares, and the grid itself gets bigger.',
      features: ['More squares light up each level', 'Starts at 3×3 and expands', 'Best level saved', 'Wrong squares shown'],
    },
    'color-blind': {
      title: 'Colour Discrimination Test', desc: 'Find the one square that is a slightly different colour', category: 'Senses',
      metaTitle: 'Colour Discrimination Test — Spot the Subtle Difference',
      long: 'Among identical squares, exactly one is a different colour. Each level shrinks the difference until you can no longer tell — and that point is the limit of your colour discrimination.',
      features: ['The difference shrinks each level', 'Your limit level saved', 'Notes on screen brightness', 'How this differs from a colour blindness test'],
    },
    hearing: {
      title: 'Hearing Frequency Test', desc: 'Find out how high a frequency you can hear', category: 'Senses',
      metaTitle: 'Hearing Test Online — How Many Hz Can You Hear',
      long: 'Steps the frequency up bit by bit to find where you stop hearing it. The upper limit of human hearing drops with age, so the frequency you reach gives a rough sense of your ear age.',
      features: ['20Hz to 20kHz in steps', 'Your upper limit recorded', 'Compared against typical ranges by age', 'Headphones recommended'],
    },
    math: {
      title: 'Mental Maths Challenge', desc: 'How many can you solve in 30 seconds', category: 'Brain',
      metaTitle: 'Mental Maths Challenge — 30 Seconds of Arithmetic',
      long: 'Solve as many arithmetic problems as you can before the clock runs out. Pick the operations and difficulty, and it reports how many you got, your accuracy and the average time per problem.',
      features: ['Choose addition, subtraction, multiplication, division', 'Easy, normal and hard', 'Average time per problem', 'Review the ones you skipped'],
    },
  },
};

/** 언어별 도구 목록 — 번역이 없는 slug는 한국어로 폴백해 화면이 깨지지 않는다 */
export function gameToolsIntl(lang: GameIntlLang): GameTool[] {
  return GAME_TOOLS.map(t => {
    const c = COPY[lang][t.slug];
    return c ? { ...t, ...c } : t;
  });
}

export function findGameToolIntl(lang: GameIntlLang, slug: string): GameTool | undefined {
  return gameToolsIntl(lang).find(t => t.slug === slug);
}

export function relatedGameToolsIntl(lang: GameIntlLang, slug: string, count = 4): GameTool[] {
  const all = gameToolsIntl(lang);
  const self = all.find(t => t.slug === slug);
  if (!self) return all.slice(0, count);
  // 같은 분류를 먼저, 모자라면 나머지로 채운다
  const same = all.filter(t => t.slug !== slug && t.category === self.category);
  const rest = all.filter(t => t.slug !== slug && t.category !== self.category);
  return [...same, ...rest].slice(0, count);
}

/** 셸 UI 문구 */
export const GAME_SHELL_UI: Record<GameIntlLang, {
  home: string; section: string; canDo: string; others: string;
  notice: string; footNote: string;
}> = {
  en: {
    home: 'Home', section: 'Brain games',
    canDo: 'What this game does', others: 'Other games',
    notice: '🎮 Your best scores stay on this device. No sign-up, nothing uploaded.',
    footNote: 'These are for fun, not diagnostic tests. Scores shift with your screen, mouse and how tired you are.',
  },
};
