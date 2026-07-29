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
export type GameIntlLang = 'en' | 'zh';

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
  zh: {
    reaction: {
      title: '反应速度测试', desc: '变绿的那一刻你能多快点下去', category: '反应与速度',
      metaTitle: '反应速度测试 — 以毫秒测你的反应时间',
      long: '屏幕变绿的那一刻就点下去。测五次，给出平均值和最快成绩（毫秒），并和人的平均反应速度作对比。',
      features: ['五次测量后给出平均与最快', '提前点击视为无效', '与人类平均值对比', '可重新挑战刷新记录'],
    },
    cps: {
      title: '点击速度测试', desc: '10 秒内你能点多少次', category: '反应与速度',
      metaTitle: '点击速度测试 — 测每秒点击次数（CPS）',
      long: '在规定时间内尽可能快地点击，测出每秒点击次数（CPS）。可以选 5 秒、10 秒或 30 秒；手机上用触摸也是同样的测法。',
      features: ['可选 5／10／30 秒', '计算每秒点击次数（CPS）', '保存最高记录', '实时显示剩余时间'],
    },
    aim: {
      title: '瞄准点击游戏', desc: '30 秒内能打中多少靶', category: '反应与速度',
      metaTitle: '瞄准点击游戏 — 鼠标精度与瞄准练习',
      long: '在限定时间内尽可能多地击中随机位置出现的靶子。它也会统计打空的点击并算出命中率，所以还能当鼠标操作练习用。',
      features: ['统计 30 秒内的命中数', '把打空的点击也算进命中率', '可选择靶子大小', '显示平均命中间隔'],
    },
    typing: {
      title: '打字速度测试', desc: '输入句子，测每分钟字数与正确率', category: '反应与速度',
      metaTitle: '打字速度测试 — 免费测每分钟字数与正确率',
      long: '照着给出的句子输入，测每分钟字数和正确率。打错的字会立刻标出来，句子每轮都会变，所以没法靠背下来蒙过去。',
      features: ['计算每分钟字数', '按字统计正确率', '错字立即标出', '可连续练习多个句子'],
    },
    memory: {
      title: '顺序记忆游戏', desc: '照着颜色亮起的顺序按回去', category: '记忆力',
      metaTitle: '顺序记忆游戏 — 用颜色顺序测短期记忆',
      long: '彩色按钮会一个一个亮起，你要记住顺序并照样按回去。每答对一次顺序就长一位，所以走到第几关就是短期记忆的分数。',
      features: ['每关顺序变长一位', '不靠声音，用颜色区分', '记录最高关数', '标出出错的位置'],
    },
    'number-memory': {
      title: '数字记忆测试', desc: '记住越来越长的数字并输入', category: '记忆力',
      metaTitle: '数字记忆测试 — 你能记住几位数',
      long: '数字短暂出现后消失，你把它输入回去。答对就多一位。人一次能记住的数字通常在七位左右，所以大多在那附近开始撑不住。',
      features: ['每答对一次多一位', '显示时间自动调整', '记录最高位数', '把你的答案和正确答案对照'],
    },
    sequence: {
      title: '图案记忆游戏', desc: '记住格子里亮起的位置', category: '记忆力',
      metaTitle: '图案记忆游戏 — 测视觉空间记忆',
      long: '格子里会有几格短暂亮起后熄灭。记住是哪几格并点它们。关数越高亮起的格子越多，格子本身也会变大。',
      features: ['每关亮起的格子变多', '从 3×3 开始逐步扩大', '记录最高关数', '标出点错的格子'],
    },
    'color-blind': {
      title: '辨色力测试', desc: '找出颜色略有不同的那一格', category: '感官',
      metaTitle: '辨色力测试 — 分辨细微的颜色差异',
      long: '一堆同色方块中，恰好有一格颜色不同。关数越高差异越小，直到再也分不出来 —— 那个点就是你的辨色极限。',
      features: ['每关色差变小', '记录极限关数', '附屏幕亮度提示', '说明它与色盲检查的区别'],
    },
    hearing: {
      title: '听力频率测试', desc: '看看你能听到多少 Hz', category: '感官',
      metaTitle: '在线听力测试 — 你能听到多少 Hz',
      long: '一级一级往上调频率，找出你听不到的那一点。人的听觉上限随年龄下降，所以能听到的频率大致能反映耳朵的「年龄」。',
      features: ['20Hz~20kHz 分段播放', '记录能听到的上限频率', '与各年龄段的大致范围对比', '建议使用耳机'],
    },
    math: {
      title: '心算挑战', desc: '30 秒内你能做对几题', category: '脑力',
      metaTitle: '心算挑战 — 30 秒四则运算',
      long: '在限定时间内尽可能多地做四则运算题。可以选运算种类和难度，结束后给出做对的题数、正确率和每题平均用时。',
      features: ['可选加、减、乘、除', '简单／普通／困难三档难度', '每题平均用时', '可回看跳过的题'],
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
  zh: {
    home: '首页', section: '脑力小游戏',
    canDo: '这个游戏能做什么', others: '其他小游戏',
    notice: '🎮 最高分只留在这台设备上。无需注册，也不会上传。',
    footNote: '这些只是娱乐，不是诊断性检查。成绩会随屏幕、鼠标和疲劳程度变化。',
  },
};
