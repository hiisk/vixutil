import { STEMS } from './saju-data.ts';
import type { Pillar } from './saju-data.ts';
import { ELEMENT_INTL, STEMS_INTL, type SajuIntlLang } from './saju-intl.ts';
import { sajuFacts, type SajuFacts, type Score } from './saju-fortune-facts.ts';

/**
 * 사주 영역별 운세 열 가지의 영어·중국어 문장.
 *
 * 점수와 판단 근거는 lib/saju-fortune-facts.ts가 계산한다 — 한국어와 같은 한 벌을
 * 쓰므로 세 언어가 같은 입력에 같은 점수를 낸다. 여기서는 그 사실을 문장으로만
 * 바꾼다.
 *
 * 십성·오행 용어는 영어권에서 통용되는 표기를 쓴다. 十神을 'ten gods',
 * 官星을 'authority star'처럼 옮기고 한자를 함께 남긴다 — 처음 보는 사람에게는
 * 뜻이 필요하고, 이미 아는 사람에게는 한자가 열쇠다.
 */
export type FortuneIntlLang = SajuIntlLang;

export interface DomainFortuneIntl {
  id: string;
  emoji: string;
  title: string;
  score: Score;
  grade: string;
  intro: string;
  summary: string;
  points: string[];
  advice: string;
  colorKey: 'rose' | 'pink' | 'blue' | 'amber' | 'indigo' | 'green' | 'teal' | 'violet' | 'purple' | 'orange';
}

const GRADES: Record<FortuneIntlLang, Record<Score, string>> = {
  en: { 5: 'Excellent', 4: 'Good', 3: 'Fair', 2: 'Caution', 1: 'Difficult' },
};

/** 십성 다섯 갈래의 언어별 이름 */
const CAT: Record<FortuneIntlLang, Record<string, string>> = {
  en: {
    비겁: 'the self group (比劫)', 식상: 'the output group (食傷)', 재성: 'the wealth star (財星)',
    관성: 'the authority star (官星)', 인성: 'the resource star (印星)',
  },
};

/** 배우자 별 이름 */
const STAR: Record<FortuneIntlLang, Record<string, string>> = {
  en: {
    정관: 'Proper Authority (正官)', 편관: 'Indirect Authority (偏官)',
    정재: 'Proper Wealth (正財)', 편재: 'Indirect Wealth (偏財)',
    정인: 'Proper Resource (正印)', 편인: 'Indirect Resource (偏印)',
    식신: 'Nourishment (食神)',
  },
};

/** 장기·증상 — 오행 하나가 아예 없을 때 짚어 주는 부분 */
const ORGAN: Record<FortuneIntlLang, Record<string, { organ: string; sym: string }>> = {
  en: {
    목: { organ: 'liver and gallbladder', sym: 'fatigue, eye strain, tension headaches' },
    화: { organ: 'heart and circulation', sym: 'palpitations, cold hands and feet, disturbed sleep' },
    토: { organ: 'stomach and spleen', sym: 'indigestion, appetite swings, bloating' },
    금: { organ: 'lungs and large intestine', sym: 'respiratory trouble, skin problems, constipation' },
    수: { organ: 'kidneys and bladder', sym: 'reduced kidney function, swelling, reproductive health' },
  },
};

/** 직업 성향 라벨 — 가장 강한 십성 갈래로 정한다 */
const CAREER_TYPE: Record<FortuneIntlLang, Record<string, string>> = {
  en: {
    관성: 'a stable-organisation type', 식상: 'a specialist or founder type',
    재성: 'a business and sales type', 인성: 'an expert-knowledge type', 비겁: 'an independent-driver type',
  },
};

function dominantCat(f: SajuFacts): string {
  return (Object.entries(f.sc) as [string, number][]).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '비겁';
}

/** 관성/재성 중 사주에 실제로 있는 별 이름을 이어 붙인다 */
function starList(f: SajuFacts, lang: FortuneIntlLang, keys: string[]): string {
  const found = f.allSS.filter(s => keys.includes(s));
  const sep = lang === 'en' ? ' and ' : '、';
  return found.map(s => STAR[lang][s] ?? s).join(sep);
}

/* ────────────────────────────────────────────────
   영어
──────────────────────────────────────────────── */
function buildEn(f: SajuFacts): DomainFortuneIntl[] {
  const sc = f.sc;
  const s = f.scores;
  const g = GRADES.en;
  const stem = STEMS.find(x => x.kor === f.dayStemKor)!;
  const si = STEMS_INTL.en[stem.hanja];
  const elLabel = ELEMENT_INTL.en[f.dayStemElement].label;
  const dc = dominantCat(f);
  const organ = f.missingEls[0] ? ORGAN.en[f.missingEls[0]] : null;
  const female = f.gender === 'female';

  const love: DomainFortuneIntl = {
    id: 'love', emoji: '💕', title: 'Romance', score: s.love, grade: g[s.love], colorKey: 'rose',
    intro: female
      ? 'In saju, a woman’s romantic connections are read from the authority star (官星). Its strength and kind shape how often you meet people, how deep those relationships go, and the way you approach romance. A Peach Blossom branch (桃花殺) in the chart usually means attraction that draws others toward you first.'
      : 'In saju, a man’s romantic connections are read from the wealth star (財星). Its strength and kind shape how you approach a partner, how long relationships hold, and the pattern they follow. A Peach Blossom branch (桃花殺) alongside it means attraction that comes across without effort.',
    summary: s.love >= 4
      ? 'A chart where attraction runs high and meeting people happens without forcing it.'
      : s.love === 3
      ? 'A chart where connections ripen slowly. The timing matters — do not let it pass.'
      : 'A period better spent on your own growth than on romance. Better connections arrive once you are ready.',
    points: [
      f.partnerCat >= 2
        ? `${female ? 'The authority star' : 'The wealth star'} is clearly present (${starList(f, 'en', female ? ['정관', '편관'] : ['정재', '편재'])}), so connections tend to arrive on their own.`
        : f.partnerCat === 0
        ? `${female ? 'With no authority star' : 'With no wealth star'} in the chart, your attention naturally goes to work and your own goals rather than romance. The connection tends to come after you have grown into yourself.`
        : 'Only one partner star, so connections are selective. One relationship built deeply suits you better than meeting widely.',
      f.partnerStar === (female ? '정관' : '정재')
        ? female
          ? 'Proper Authority (正官) points to a bond with someone stable and socially recognised.'
          : 'Proper Wealth (正財) points to a bond with someone practical and family-minded.'
        : f.partnerStar === (female ? '편관' : '편재')
        ? female
          ? 'Indirect Authority (偏官) points to intense, challenging partners. Knowing your own mind clearly matters here.'
          : 'Indirect Wealth (偏財) brings popularity but short-lived relationships. Choosing to focus on one person is a deliberate act here.'
        : 'The pattern is that romance follows once you are moving toward your own goals, not before.',
      f.hasPeach
        ? 'A Peach Blossom branch (桃花殺) means your appeal reads easily and people often approach you first.'
        : 'Yours is a quieter, inward kind of appeal. More opens up when you find the nerve to approach first.',
      f.singang
        ? 'A strong chart (身强) tends to set its own bar high. Loosening that a little brings better meetings.'
        : 'A weak chart (身弱) leans on a partner easily. Raising your own footing first is what changes this.',
    ],
    advice: s.love >= 4
      ? 'Opportunities are there; what decides the outcome is whether you can commit to one of them.'
      : 'Rather than chasing, build what makes you interesting. The right connection recognises that.',
  };

  const marriage: DomainFortuneIntl = {
    id: 'marriage', emoji: '💍', title: 'Marriage', score: s.marriage, grade: g[s.marriage], colorKey: 'pink',
    intro: 'Marriage is read from the partner star together with the self group (比劫). A stable partner star favours a settled union; a heavy self group means competing wills, which tends to shift the timing later. Saju does not fix a date — it describes the conditions you are working with.',
    summary: f.lateMarriage
      ? 'The chart points to a later marriage. Being ready matters more here than being early.'
      : s.marriage >= 4
      ? 'Conditions favour a stable union.'
      : 'A workable union, provided the practical groundwork is laid deliberately.',
    points: [
      f.lateMarriage
        ? 'A weak partner star, or a strong self group, usually shifts marriage later. That is not a warning — later marriages in this configuration tend to be more settled.'
        : 'The partner star is clear enough that a union can form at an ordinary pace.',
      f.hasStablePartner
        ? female
          ? 'Proper Authority (正官) favours a spouse who is socially stable and takes responsibility seriously.'
          : 'Proper Wealth (正財) favours a spouse who is practical and family-oriented.'
        : f.partnerStar
        ? 'The partner star is the indirect kind — attraction is easy, stability is the thing to build for deliberately.'
        : 'With the partner star weak, the better match arrives once you are settled in yourself.',
      sc.비겁 >= 3
        ? 'A heavy self group (比劫) means two strong wills in one house. Agreeing on how decisions get made, early, prevents most of the friction.'
        : 'The self group is moderate, so give and take in a marriage comes more naturally.',
      f.singang
        ? 'A strong chart holds its ground in an argument. Deciding in advance which things you will yield on is worth more than winning them.'
        : 'A weak chart accommodates readily. Saying what you actually want, before resentment builds, is the work here.',
    ],
    advice: f.lateMarriage
      ? 'Do not measure yourself against other people’s timing. This configuration does better with preparation than with speed.'
      : 'Talk through money, family and where you will live before the wedding rather than after. That conversation is the real ceremony.',
  };

  const career: DomainFortuneIntl = {
    id: 'career', emoji: '💼', title: 'Work and career', score: s.career, grade: g[s.career], colorKey: 'blue',
    intro: 'Career is read from the combination of authority (官星), output (食傷) and wealth (財星) stars. A strong authority star does well inside an organisation; a strong output star does better where creativity is the point. A strong chart (身强) handles independence and job changes; a weak chart (身弱) is made or broken by the quality of its colleagues.',
    summary: `${CAREER_TYPE.en[dc]}. ${s.career >= 4 ? 'The current working environment is working in your favour.' : s.career === 3 ? 'Choosing the timing of a move carefully is what matters.' : 'Work may change often, but you end up finding your own path through it.'}`,
    points: [
      dc === '관성'
        ? 'A strong authority star (官星) follows structure well and rises steadily inside it. Public service, large firms and finance suit this.'
        : dc === '식상'
        ? 'A strong output star (食傷) brings creativity and expression. It also chafes against hierarchy, which is why freelance or specialist work often fits better.'
        : dc === '재성'
        ? 'A strong wealth star (財星) brings a real feel for sales, business and investment. Performance-based pay motivates this chart more than a fixed salary.'
        : dc === '인성'
        ? 'A strong resource star (印星) builds a career through knowledge and expertise. Education, research, law and medicine reward it.'
        : 'A strong self group (比劫) wants to work independently. Building your own patch suits you far better than taking instruction.',
      f.singang
        ? 'A strong chart carries its own momentum and decides for itself, which shows well in demanding environments. Hesitation over a move is rarely the problem.'
        : 'A weak chart achieves more in collaboration than alone. Good colleagues are a real asset here, and support visibly lifts your output.',
      sc.관성 >= 1 && sc.식상 >= 1
        ? 'Authority and output together suit a creative role inside an organisation — planning, marketing, content.'
        : sc.관성 === 0
        ? 'With no authority star, environments heavy on hierarchy do not suit you. High autonomy, or being the one who decides, is the better fit.'
        : 'Holding a stable position while building a second income channel is the stronger long-term play.',
      `The ${stem.hanja} (${si.kor}) day master has natural aptitude in ${si.aptitude.toLowerCase()}.`,
    ],
    advice: sc.관성 === 0
      ? 'If you are considering a move, look for a position with real autonomy or decision-making power.'
      : f.singang
      ? 'Check whether the current luck pillar favours a move before making one. Moving from a prepared position succeeds far more often.'
      : 'Building depth inside a stable organisation pays better over time. Weigh a move carefully.',
  };

  const wealth: DomainFortuneIntl = {
    id: 'wealth', emoji: '💰', title: 'Wealth', score: s.wealth, grade: g[s.wealth], colorKey: 'amber',
    intro: 'Wealth is read from the strength of the wealth star (財星) and how the output star (食傷) feeds it. When Nourishment (食神) generates wealth — the 食神生財 configuration — earning follows naturally from ability. When the self group (比劫) is too heavy, money that comes in tends to leave again, which makes how you manage it the decisive factor.',
    summary: s.wealth >= 4
      ? f.allSS.includes('식신')
        ? 'A 食神生財 configuration — ability turning into income. This is the ideal wealth structure.'
        : 'A chart set up to accumulate steadily.'
      : s.wealth === 3
      ? 'Ordinary wealth prospects. How you manage it matters more than how you earn it.'
      : 'Money moves through this chart quickly. A fixed savings mechanism does more for you than a higher income would.',
    points: [
      sc.재성 >= 2
        ? `A strong wealth star (${starList(f, 'en', ['정재', '편재'])}) brings a real instinct for money.`
        : sc.재성 === 0
        ? 'With no wealth star, income tends to come from expertise and reputation rather than from dealing. Build the skill and the money follows it.'
        : 'One wealth star — a single reliable channel serves you better than several speculative ones.',
      sc.식상 >= 1 && sc.재성 >= 1
        ? 'Output feeding wealth: what you make turns into income. Productising your own ability is the shortest path here.'
        : 'Output and wealth are not linked in this chart, so income depends more on position than on output. Where you stand matters.',
      sc.비겁 >= 3
        ? 'A heavy self group means money leaks toward the people around you. Automatic transfers on payday do more than willpower.'
        : 'The self group is moderate, so what comes in tends to stay.',
      f.missingEls.includes('금')
        ? 'Metal (金) is absent, which classically reads as weak retention. Treat that as a reason to make saving structural rather than optional.'
        : 'The elements around money are not missing, so ordinary discipline is enough.',
    ],
    advice: sc.비겁 >= 3
      ? 'Move a fixed amount out of reach the day you are paid. This chart does not do well with money left within easy reach.'
      : 'Grow one income channel deep before adding a second. Breadth without depth is the common failure in this configuration.',
  };

  const study: DomainFortuneIntl = {
    id: 'study', emoji: '📚', title: 'Study and exams', score: s.study, grade: g[s.study], colorKey: 'indigo',
    intro: 'Study is read from the resource star (印星). Proper Resource (正印) favours steady, structured learning; Indirect Resource (偏印) favours intuition and unusual angles but resists routine. A strong self group with no resource star tends to learn by doing rather than by reading.',
    summary: s.study >= 4
      ? 'A chart that takes to study well and holds what it learns.'
      : s.study === 3
      ? 'Study works here, but the method matters more than the hours.'
      : 'Learning through doing suits you better than learning through reading.',
    points: [
      sc.인성 >= 2
        ? 'A strong resource star absorbs and retains well. Long-form study and qualifications reward this chart.'
        : sc.인성 === 0
        ? 'No resource star: reading alone will not stick. Learn by building something with the material.'
        : 'One resource star — enough to learn steadily when the structure is there.',
      f.hasJeongin
        ? 'Proper Resource (正印) favours orthodox, structured study. A syllabus and a schedule work in your favour.'
        : f.hasPyeongin
        ? 'Indirect Resource (偏印) learns fast and sideways, and gets bored with drills. Vary the material rather than forcing repetition.'
        : 'Without either resource star, motivation has to come from a concrete goal. Pick the exam, then work back from it.',
      f.singang
        ? 'A strong chart can push through a heavy schedule. The risk is overreach — plan in rest before you need it.'
        : 'A weak chart does better in short, regular sessions than in long pushes. Consistency beats intensity here.',
      sc.비겁 >= 3
        ? 'A heavy self group is easily distracted by other people. Study alone, or in a group that is actually silent.'
        : 'Concentration is workable, so the ordinary methods apply.',
    ],
    advice: f.hasJeongin
      ? 'Set a syllabus and follow it. This chart rewards orthodox preparation more than clever shortcuts.'
      : 'Use past papers early rather than late. Working backwards from the real question fits this chart better than reading forward.',
  };

  const health: DomainFortuneIntl = {
    id: 'health', emoji: '🏥', title: 'Health', score: s.health, grade: g[s.health], colorKey: 'green',
    intro: 'The balance of the five elements is read directly onto the body: Wood (木) to the liver and gallbladder, Fire (火) to the heart and circulation, Earth (土) to the stomach and spleen, Metal (金) to the lungs and large intestine, Water (水) to the kidneys and bladder. An element entirely absent points to where attention is due, and a strong or weak chart sets the baseline for stamina.',
    summary: s.health >= 4
      ? `Generally good stamina and energy.${f.singang ? ' A strong chart carries plenty of active energy.' : ''}`
      : s.health === 3
      ? 'Balanced management is what this chart needs. Watch the specific area below.'
      : 'Stamina runs out faster here than the chart lets on. Rest is not optional in this configuration.',
    points: [
      organ
        ? `${ELEMENT_INTL.en[f.missingEls[0]].label} is absent, which classically points to the ${organ.organ} — watch for ${organ.sym}.`
        : 'No element is missing, so no single area stands out as the weak point. Ordinary balance holds.',
      f.singang
        ? 'A strong chart has energy to spend and tends to spend it. Injury from overdoing it is the more likely failure than illness.'
        : 'A weak chart recovers more slowly. Sleep and regular meals do more for you here than any supplement.',
      f.missingEls.length >= 2
        ? `Two or more elements missing (${f.missingEls.map(e => ELEMENT_INTL.en[e].label).join(', ')}) means the balance tilts. Regular checks are worth more than reacting to symptoms.`
        : 'The element balance is workable, so routine care is enough.',
      f.dominantEl
        ? `${ELEMENT_INTL.en[f.dominantEl].label} dominates the chart. An excess is as worth watching as an absence — it tends to show as tension in that same organ system.`
        : 'No element dominates strongly.',
    ],
    advice: organ
      ? `${ELEMENT_INTL.en[f.missingEls[0]].shortage} None of this replaces a doctor — if something persists, get it looked at.`
      : 'Sleep, movement and regular meals cover most of what this chart needs. Anything persistent belongs with a doctor, not a chart.',
  };

  const social: DomainFortuneIntl = {
    id: 'social', emoji: '🤝', title: 'People and networks', score: s.social, grade: g[s.social], colorKey: 'teal',
    intro: 'Social life is read from the output star (食傷) for expression, the resource star (印星) for how you take people in, and the self group (比劫) for how you hold your own among them. A Peach Blossom branch adds visible appeal.',
    summary: s.social >= 4
      ? 'People come easily to this chart, and the network it builds is a real asset.'
      : s.social === 3
      ? 'A moderate circle that holds. Depth serves you better than breadth.'
      : 'Fewer people, held closer. That is a workable shape, not a deficiency.',
    points: [
      sc.식상 >= 2
        ? 'A strong output star expresses easily and reads a room well. You are the one who makes the introduction.'
        : 'Expression is not the strong suit here. Being the person who follows through is the version of this that works.',
      sc.인성 >= 2
        ? 'A strong resource star listens and remembers. People tell you things, which is its own kind of network.'
        : 'You take people at face value, which is efficient and occasionally costly. Ask one more question than feels necessary.',
      f.hasPeach
        ? 'A Peach Blossom branch (桃花殺) makes you visible in a group without trying.'
        : 'Your presence builds over time rather than immediately. Repeat contact is what works for you.',
      sc.비겁 >= 3
        ? 'A heavy self group brings competition into friendships. Choose collaborators whose strengths differ from yours.'
        : 'The self group is moderate, so cooperation comes without much friction.',
    ],
    advice: sc.비겁 >= 3
      ? 'Keep some distance between money and friendship in this configuration. It is the specific place where it goes wrong.'
      : 'Maintaining a small number of connections properly beats collecting many. Follow up on the ones that matter.',
  };

  const business: DomainFortuneIntl = {
    id: 'business', emoji: '🚀', title: 'Business and founding', score: s.business, grade: g[s.business], colorKey: 'violet',
    intro: 'Founding a business is read from whether the chart is strong enough to carry risk (身强) and whether wealth and output stars are present to turn effort into income. A weak chart with a heavy authority star does better employed than founding.',
    summary: s.business >= 4
      ? 'The configuration supports running your own thing.'
      : s.business === 3
      ? 'Founding is possible with the right partner covering what you lack.'
      : 'This chart does better inside an organisation, or founding only after building a base elsewhere.',
    points: [
      f.singang && sc.재성 >= 1
        ? 'A strong chart with a wealth star can carry the risk and see the return. This is the founding configuration.'
        : f.singang
        ? 'The chart is strong enough to carry risk but the wealth star is thin — pair with someone who handles money.'
        : 'A weak chart takes damage from carrying risk alone. A co-founder is not optional here.',
      sc.식상 >= 1 && sc.재성 >= 1
        ? 'Output feeding wealth: what you make can become the product directly.'
        : 'The link from making to earning is not automatic here. Decide who sells before you decide what to build.',
      !f.singang && sc.관성 >= 2
        ? 'A weak chart with a heavy authority star does better with the structure of employment. Founding is the harder road for this configuration.'
        : 'Nothing in the chart argues against working for yourself.',
      sc.비겁 >= 3 && sc.재성 === 0
        ? 'Heavy self group with no wealth star: energy is there, the channel to money is not. Find the channel first.'
        : 'Capital and effort can find their way to a return here.',
    ],
    advice: f.singang
      ? 'Set the amount you are prepared to lose before you start, and stop at it. This chart pushes past the line otherwise.'
      : 'Build the thing alongside a paying job until it stands on its own. This configuration does badly with no floor under it.',
  };

  const change: DomainFortuneIntl = {
    id: 'change', emoji: '🔄', title: 'Change and moving on', score: s.change, grade: g[s.change], colorKey: 'orange',
    intro: 'Appetite for change is read from the Traveling Horse branch (驛馬殺), whether the chart is strong, and how heavy the self group is. A heavy authority star pulls the other way, toward staying.',
    summary: s.change >= 4
      ? 'A chart that moves well. Change tends to work out here.'
      : s.change === 3
      ? 'Change is workable when the timing is chosen rather than forced.'
      : 'Staying and building depth serves this chart better than moving.',
    points: [
      f.hasYongma
        ? 'A Traveling Horse branch (驛馬殺) means movement suits you — relocation, travel, changing field.'
        : 'Without the Traveling Horse, roots matter more to you than you might admit. Change costs more here, so make it count.',
      f.singang
        ? 'A strong chart lands well after a move. Hesitation is rarely what holds you back.'
        : 'A weak chart needs the next thing lined up before leaving the current one.',
      sc.비겁 >= 2
        ? 'The self group supports independence — going your own way after a change is realistic.'
        : 'You do better moving into a structure than into open ground.',
      sc.관성 >= 3
        ? 'A very heavy authority star ties you to obligations. Untangle those first, or a move just relocates them.'
        : 'Nothing is holding you in place structurally.',
    ],
    advice: f.hasYongma
      ? 'Movement suits you, but pick the destination on the work rather than on the leaving.'
      : 'Before changing, name exactly what you want to be different. If the answer is only "not this", the change will not fix it.',
  };

  const future: DomainFortuneIntl = {
    id: 'future', emoji: '🔮', title: 'The wider outlook', score: s.future, grade: g[s.future], colorKey: 'purple',
    intro: 'The wider current comes from the element of your day master and whether the chart is strong or weak. Luck pillars (大運) turn over roughly every ten years, and the largest achievements come when the direction of the current pillar and your own energy point the same way.',
    summary: s.future >= 4
      ? `A ${elLabel} day master with its energy expressing fully.`
      : `A ${elLabel} day master — ${f.singang ? 'aiming strong energy in one direction' : 'building the base solidly'} is the key to what comes next.`,
    points: [
      `${ELEMENT_INTL.en[f.dayStemElement].advice}`,
      sc.관성 >= 1
        ? 'With an authority star, recognition and achievement open the way forward. A direction that values career and standing fits.'
        : sc.재성 >= 1
        ? 'With a wealth star, material achievement is what raises your satisfaction. Aim for the freedom and stability money buys.'
        : sc.식상 >= 1
        ? 'With a strong output star, a life that expresses your talent is directly tied to your happiness. Find the way to live off what you like doing.'
        : 'A heavy self group ends up building its own patch. The independent route is not a detour here — it is the road.',
      'Luck pillars shift the larger current every ten years. Reading where the current one points is where planning should start.',
      `The ${stem.hanja} (${si.kor}) day master’s core strength: ${si.personality.split('.')[0]}.`,
    ],
    advice: 'When setting goals for the year, put your energy into the areas the chart is strong in — the return comes faster. For weak areas, delegating works better than trying to fix them.',
  };

  return [love, marriage, career, wealth, study, health, social, business, change, future];
}


export function analyzeFortuneIntl(
  dayPillar: Pillar,
  yearPillar: Pillar,
  monthPillar: Pillar,
  hourPillar: Pillar | null,
  gender: 'male' | 'female',
  singang: boolean,
  ohaengCounts: Record<string, number>,
  lang: FortuneIntlLang,
): DomainFortuneIntl[] {
  const facts = sajuFacts(dayPillar, yearPillar, monthPillar, hourPillar, gender, singang, ohaengCounts);
  return buildEn(facts);
}

/** 영역별 운세 블록의 화면 문구 */
export const DOMAIN_UI: Record<FortuneIntlLang, {
  title: string; lead: string; showAll: string; collapse: string; scoreOf: (n: number) => string;
}> = {
  en: {
    title: 'By area of life',
    lead: 'Ten areas read from the same chart. The score comes from the structure, not from the date you opened this.',
    showAll: 'Show all ten', collapse: 'Show fewer',
    scoreOf: n => `${n} / 5`,
  },
};
