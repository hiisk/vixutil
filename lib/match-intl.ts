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
import { spread } from './match-l10n/index.ts';
import type { Texts, MatchUi } from './match-l10n/types.ts';

export type IntlLang = Exclude<Lang, 'ko'>;

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
  ...spread('zodiac'),
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
  ...spread('star'),
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
  ...spread('mbti'),
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
  ...spread('axis'),
};

/* ── 혈액형 궁합 ──
   키는 blood-match.ts의 key()와 같은 규칙(A<B<O<AB 순서)으로 만든다. */
export const BLOOD_MATCH_TEXT: Record<IntlLang, Record<string, Texts>> = {
  en: {
    'A-A': {
      label: 'Quiet and steady', headline: 'Two people who read each other easily',
      reason: 'Both of you are attentive and considerate, so you pick up on each other’s mood quickly. It runs smoothly, without big conflict.',
      love: 'A careful romance that deepens over time. It lasts if you do not ration your affection.',
      advice: 'You both tend to swallow things. Say what stung when it happens rather than storing it.',
    },
    'A-B': {
      label: 'Opposites attract', headline: 'Drawn to what the other one has',
      reason: 'Careful A and free-roaming B are quite different people. Early on that difference reads as a fresh kind of pull.',
      love: 'One brings the planning, the other the spontaneity — you rarely get bored.',
      advice: 'It works when A does not read B’s freedom as a threat, and B does not read A’s care as nagging.',
    },
    'A-O': {
      label: 'Solid match', headline: 'Easygoing O makes room for careful A',
      reason: 'Generous O wraps around detail-minded A comfortably. Each covers what the other runs short on.',
      love: 'O leads, A looks after the details, and it settles into something stable.',
      advice: 'O should not let A’s small signals pass unnoticed; A can afford to lean on O a little more.',
    },
    'A-AB': {
      label: 'Quietly in tune', headline: 'Two sensitive people who get each other',
      reason: 'Both of you run sensitive and inward, so you recognise what the other is actually feeling.',
      love: 'A calm romance with plenty of moments that need no explaining.',
      advice: 'It is easier when A does not over-analyse AB’s harder-to-pin-down side.',
    },
    'B-B': {
      label: 'Free spirits', headline: 'Two people who respect each other’s space',
      reason: 'Both of you have a strong sense of self and dislike being tied down. Acknowledge each other’s world and it stays comfortable.',
      love: 'A relaxed romance where you each do your own thing and still come back together.',
      advice: 'Enjoy the freedom, but keep expressing things so it does not drift into indifference.',
    },
    'B-O': {
      label: 'High energy', headline: 'Being together is simply fun',
      reason: 'Free-roaming B and sociable O keep the mood lively. You play well together and talk easily.',
      love: 'An active, energetic couple who like doing things rather than sitting still.',
      advice: 'You both push hard, so you will collide sometimes. Give a step each and you are a formidable pair.',
    },
    'B-AB': {
      label: 'Sparky match', headline: 'Two originals who never run out of ideas',
      reason: 'Free-roaming B and inventive AB bounce off each other. You find each other’s quirks entertaining.',
      love: 'A distinctive romance run entirely on your own terms.',
      advice: 'You can both be changeable, so pin down the plans that actually matter.',
    },
    'O-O': {
      label: 'Straight talkers', headline: 'Honest, warm and quick to move on',
      reason: 'Both of you are broad-minded and direct, with nothing left simmering. You say it and then it is over.',
      love: 'Direct expression means fewer misunderstandings, and no half-measures.',
      advice: 'Neither of you likes losing. Skip the pride contests and you are a dependable pair.',
    },
    'O-AB': {
      label: 'Complementary', headline: 'Warmth and clear thinking together',
      reason: 'Sociable O and rational AB fill in each other’s gaps. The balance holds well.',
      love: 'O’s warmth and AB’s cool head give you both stability and stimulation.',
      advice: 'It lasts as long as O does not take AB’s need for distance personally.',
    },
    'AB-AB': {
      label: 'Uniquely in tune', headline: 'Two unusual people who recognise each other',
      reason: 'Both of you are original and hard to predict — other people may find that difficult, but you two follow each other easily.',
      love: 'A relationship that runs on a code only the two of you read.',
      advice: 'You can both swing emotionally. Clear the misunderstandings often, with plain conversation.',
    },
  },
  ...spread('blood'),
};

/* ── 공통 UI 문구 ── */
export const MATCH_UI: Record<IntlLang, MatchUi> = {
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
  ...spread('ui'),
};
