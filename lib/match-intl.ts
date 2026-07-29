/* ────────────────────────────────────────────────
   궁합 4종(별자리·띠·혈액형·MBTI)의 영어·중국어 문구.

   판정 로직은 각 lib(star-match·zodiac-match·blood-match·mbti-match)의
   순수 함수를 그대로 쓴다. 여기 있는 건 그 결과에 붙일 문구뿐이라,
   세 언어가 같은 조합에 같은 점수·같은 유형을 낸다.

   띠 궁합의 육합·삼합·충은 중화권에서 六合·三合·相冲으로 그대로 쓰는 개념이라
   중국어는 번역이 아니라 원래 용어를 쓴다. 영어는 대응 용어가 없어 풀어 썼다.
──────────────────────────────────────────────── */
import type { MatchType } from './zodiac-match.ts';
import type { StarMatchType } from './star-match.ts';
import type { MatchBand } from './mbti-match.ts';
import type { Lang } from './fortune-intl.ts';

export type IntlLang = Exclude<Lang, 'ko'>;

interface Texts { label: string; headline: string; reason: string; love: string; advice: string }

/* ── 띠 궁합 ── */
export const ZODIAC_MATCH_TEXT: Record<IntlLang, Record<MatchType, Texts>> = {
  en: {
    yukhap: {
      label: 'Perfect pair (Six Harmonies)', headline: 'The pairing that pulls toward each other',
      reason: 'In the Chinese zodiac these two form a Six Harmonies pair — the classic match, each covering what the other lacks.',
      love: 'The attraction is easy and being together feels natural. You settle into each other without much effort.',
      advice: 'When it fits this well it is easy to take each other for granted. Small, steady gestures are what keep it.',
    },
    samhap: {
      label: 'Great match (Three Harmonies)', headline: 'Part of the same trio — you simply get along',
      reason: 'These two belong to the same Three Harmonies group, a trio traditionally read as naturally aligned in outlook.',
      love: 'Your values line up, which makes this a good long-run match. You end up as easy as friends.',
      advice: 'The easier the bond, the more manners matter. Keep familiarity from turning into inattention.',
    },
    same: {
      label: 'Mirror match', headline: 'Alike enough to be easy — and to clash',
      reason: 'Same sign, so your temperaments run alike. You understand each other well, and you trip on the same things.',
      love: 'There are plenty of moments where nothing needs saying. But you may share the same blind spot.',
      advice: 'Enjoy what you share, and agree to cover each other where you are both weak.',
    },
    neutral: {
      label: 'Steady match', headline: 'Good as long as you meet each other halfway',
      reason: 'No special traditional relationship here — which is where most pairs sit. It comes down to how you treat each other.',
      love: 'It may feel plain at first, then grow on you. It deepens if you do not ration your affection.',
      advice: 'Say what you expect out loud. Matching pace is the whole thing.',
    },
    clash: {
      label: 'Takes work', headline: 'Opposite signs — friction comes easily',
      reason: 'These sit directly opposite in the zodiac, a clash pairing. Bumps are likely, but so is learning from the difference.',
      love: 'You may spar early on. Accept the differences and you become a couple that grows each other.',
      advice: 'The key is not reading "different" as "wrong". Give a step each and the clash turns into chemistry.',
    },
  },
  zh: {
    yukhap: {
      label: '天生一对（六合）', headline: '互相吸引的最佳搭配',
      reason: '十二地支中的六合关系，被视为彼此补足、最相配的一对。',
      love: '吸引来得自然，相处也轻松，不用费力就能慢慢融进彼此。',
      advice: '正因为太合拍，容易把对方当成理所当然。持续做些小小的表达，才走得远。',
    },
    samhap: {
      label: '很合拍（三合）', headline: '同属一组，天然合得来',
      reason: '两者同属十二地支的三合组，传统上视为心意相通、方向一致的组合。',
      love: '价值观对得上，适合长久相处，最后会像朋友一样自在。',
      advice: '关系越自在越要留意分寸，别让熟悉变成不上心。',
    },
    same: {
      label: '相似型', headline: '因为像所以舒服，也因为像而碰撞',
      reason: '同一生肖，性情相近。彼此容易理解，但也容易在同样的地方栽跟头。',
      love: '很多时候不用说也懂。不过两人可能有同样的弱点，需要互补。',
      advice: '享受相似的部分，不足的地方就说好彼此补上。',
    },
    neutral: {
      label: '平稳型', headline: '愿意迁就，就足够好',
      reason: '不属于特别的相性关系 —— 大多数组合都在这里，关键在于怎么对待彼此。',
      love: '一开始也许平淡，越了解越有感情。不吝表达就会加深。',
      advice: '把彼此的期待坦白说出来，误会就少了。关键是把节奏调到一起。',
    },
    clash: {
      label: '需要磨合', headline: '正对面的相冲，容易起摩擦',
      reason: '两者在十二地支中正好相对，属于相冲。容易碰撞，但也正因为不同，能学到的更多。',
      love: '前期可能会拌嘴，一旦接受差异，反而会成为彼此成长的一对。',
      advice: '关键是别把「不同」当成「不对」。各让一步，相冲反而变成默契。',
    },
  },
};

/* ── 별자리 궁합 ── */
export const STAR_MATCH_TEXT: Record<IntlLang, Record<StarMatchType, Texts>> = {
  en: {
    'same-element': {
      label: 'Perfect pair (same element)', headline: 'Same wavelength — the talking is easy',
      reason: 'Both signs share an element, so you take in the world the same way and understand each other quickly.',
      love: 'Common ground is wide and conversation flows. It runs comfortably, with little friction.',
      advice: 'Being this similar can turn into coasting. Make new experiences together on purpose.',
    },
    complement: {
      label: 'Great match (complementary elements)', headline: 'You lift each other',
      reason: 'These elements complement each other (fire↔air, earth↔water) — each supplies what the other runs short on.',
      love: 'One brings the heat, the other the calm. You are both stimulation and rest for each other.',
      advice: 'The difference is the appeal. Enjoy their way of doing things rather than trying to change it.',
    },
    'same-sign': {
      label: 'Mirror match', headline: 'Alike enough to be easy — including the weak spots',
      reason: 'Same sign, same temperament. Comfortable, but you may share the same blind spot and need to cover for each other.',
      love: 'Tastes and rhythms line up, so it is easy from the start. You may just be clumsy in the same places.',
      advice: 'Enjoy what you share, and agree in advance who covers what neither of you is good at.',
    },
    challenge: {
      label: 'Takes work', headline: 'Different elements — you have to meet in the middle',
      reason: 'Different elements can grate at first. But the further apart you start, the more there is to learn from each other.',
      love: 'You may spar early. Respect the difference and it turns into the kind of relationship that lasts.',
      advice: 'Do not read "different" as "wrong". Step toward each other and the friction becomes chemistry.',
    },
  },
  zh: {
    'same-element': {
      label: '天生一对（同属性）', headline: '同一个频道，话很好说',
      reason: '两个星座同属一个元素，感受世界的方式相近，很容易理解对方。',
      love: '共鸣多，聊得来，相处平顺，少有大摩擦。',
      advice: '太相似容易变成安于现状，刻意一起去做点新鲜的事。',
    },
    complement: {
      label: '很合拍（互补属性）', headline: '彼此托举的组合',
      reason: '属于互补元素（火↔风、土↔水），刚好补上对方欠缺的部分。',
      love: '一方热情、一方从容，既是彼此的刺激，也是彼此的安放处。',
      advice: '不同正是魅力所在。与其想改变对方的方式，不如就这样享受。',
    },
    'same-sign': {
      label: '相似型', headline: '因为像所以轻松，弱点也一样',
      reason: '同一星座，气质相近。相处舒服，但可能有相同的盲点，需要互补。',
      love: '喜好和节奏都相近，一开始就很自在，只是可能在同样的地方笨拙。',
      advice: '享受相似的部分，不擅长的地方事先说好谁来补。',
    },
    challenge: {
      label: '需要磨合', headline: '属性不同，得往中间靠',
      reason: '不同元素之间起初容易错拍，但差得越远，能互相学到的也越多。',
      love: '前期可能会拌嘴，尊重差异之后，反而会成为长久的关系。',
      advice: '别把「不同」当成「不对」。各走一步，摩擦就变成默契。',
    },
  },
};

/* ── MBTI 궁합 ── */
export const MBTI_MATCH_TEXT: Record<IntlLang, Record<MatchBand, Texts>> = {
  en: {
    best: {
      label: 'Perfect pair', headline: 'You see things the same way and fill each other in',
      reason: '', // MBTI는 축(N/S·T/F 등)별로 문장을 조립하므로 아래 AXIS_TEXT를 쓴다
      love: 'Values and conversation line up, so it is calm and exciting at once. You become each other’s place to land.',
      advice: 'When it fits this well it is easy to take each other for granted. Small, steady gestures are what keep it.',
    },
    good: {
      label: 'Good match', headline: 'Conversation comes easily',
      reason: '',
      love: 'You overlap in a lot of places, which makes talking fun. The differences read as refreshing rather than difficult.',
      advice: 'Enjoy the overlap, and accept the differences rather than trying to edit them.',
    },
    ok: {
      label: 'Steady match', headline: 'Good enough if you meet halfway',
      reason: '',
      love: 'It needs some tuning at first, then grows on you the more you learn about each other.',
      advice: 'Say your expectations plainly and the misunderstandings drop. Matching pace is the whole thing.',
    },
    work: {
      label: 'Takes work', headline: 'Different enough that there is a lot to learn',
      reason: '',
      love: 'Plenty of differences, so expect some sparring early. Respect them and you grow together.',
      advice: 'Read it as "different", not "wrong". Step toward each other and the friction becomes chemistry.',
    },
  },
  zh: {
    best: {
      label: '天生一对', headline: '看事情的角度相通，还能互相补足',
      reason: '',
      love: '价值观和聊天都对得上，既安心又心动，会成为彼此的落脚处。',
      advice: '正因为太合拍，容易把对方当成理所当然。持续做些小小的表达，才走得远。',
    },
    good: {
      label: '很合拍', headline: '聊得来的好组合',
      reason: '',
      love: '相通的地方多，聊天很愉快，不同的部分反而成了新鲜的刺激。',
      advice: '相通的地方尽情享受，不同的地方与其想改，不如先认下来。',
    },
    ok: {
      label: '平稳型', headline: '愿意迁就就足够好',
      reason: '',
      love: '一开始需要调整，越了解越有感情。',
      advice: '把期待坦白说出来，误会就少了。关键是把节奏调到一起。',
    },
    work: {
      label: '需要磨合', headline: '差异大，能学到的也多',
      reason: '',
      love: '不同的地方多，前期可能会拌嘴，尊重差异就能一起成长。',
      advice: '看作「不同」而不是「不对」。各让一步，摩擦就变成默契。',
    },
  },
};

/** MBTI 이유 문장은 축별로 조립한다 — 한국어 reasonText와 같은 규칙 */
export const MBTI_AXIS_TEXT: Record<IntlLang, {
  nsSame: string; nsDiff: string; tfSame: string; tfDiff: string; eiDiff: string; jpDiff: string; join: string; end: string;
}> = {
  en: {
    nsSame: 'You take in the world the same way (N/S), so conversation lands',
    nsDiff: 'You take in the world differently (N/S), so your perspectives can diverge',
    tfSame: 'Your basis for deciding (T/F) is similar too, which makes choices smooth',
    tfDiff: 'Your basis for deciding (T/F) differs, which causes friction but also balance',
    eiDiff: 'Your energy runs in opposite directions (E/I), so you refill each other’s rhythm',
    jpDiff: 'You live differently (J/P), blending flexibility with planning',
    join: '. ', end: '.',
  },
  zh: {
    nsSame: '看待世界的方式（N/S）相同，话很好说',
    nsDiff: '看待世界的方式（N/S）不同，视角上会有差异',
    tfSame: '判断标准（T/F）也相近，做决定很顺',
    tfDiff: '判断标准（T/F）不同，偶尔会碰撞，但也互相补足',
    eiDiff: '能量方向（E/I）相反，刚好补上彼此的节奏',
    jpDiff: '生活方式（J/P）不同，灵活与计划性交织在一起',
    join: '，', end: '。',
  },
};

/* ── 공통 UI 문구 ── */
export const MATCH_UI: Record<IntlLang, Record<string, string>> = {
  en: {
    pickBoth: 'Choose both sides to see the result',
    you: 'You', partner: 'Them',
    score: 'Compatibility',
    why: 'Why',
    love: 'In a relationship',
    advice: 'Advice',
    reset: 'Start over',
    disclaimer: 'Compatibility here follows traditional rules and is for entertainment. What actually decides a relationship is how two people treat each other.',
  },
  zh: {
    pickBoth: '两边都选好才会出结果',
    you: '你', partner: '对方',
    score: '契合度',
    why: '原因',
    love: '恋爱时',
    advice: '建议',
    reset: '重新选择',
    disclaimer: '这里的合盘依据传统说法，仅供娱乐。真正决定一段关系的，是两个人如何对待彼此。',
  },
};
