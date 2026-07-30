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
  zh: { 5: '大吉', 4: '吉', 3: '普通', 2: '注意', 1: '凶' },
};

/** 십성 다섯 갈래의 언어별 이름 */
const CAT: Record<FortuneIntlLang, Record<string, string>> = {
  en: {
    비겁: 'the self group (比劫)', 식상: 'the output group (食傷)', 재성: 'the wealth star (財星)',
    관성: 'the authority star (官星)', 인성: 'the resource star (印星)',
  },
  zh: {
    비겁: '比劫', 식상: '食伤', 재성: '财星', 관성: '官星', 인성: '印星',
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
  zh: {
    정관: '正官', 편관: '偏官', 정재: '正财', 편재: '偏财',
    정인: '正印', 편인: '偏印', 식신: '食神',
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
  zh: {
    목: { organ: '肝与胆', sym: '疲乏、眼睛干涩、紧张性头痛' },
    화: { organ: '心与循环系统', sym: '心慌、手脚冰凉、睡不安稳' },
    토: { organ: '胃与脾', sym: '消化不良、食欲起伏、腹胀' },
    금: { organ: '肺与大肠', sym: '呼吸道不适、皮肤问题、便秘' },
    수: { organ: '肾与膀胱', sym: '肾功能偏弱、浮肿、生殖健康' },
  },
};

/** 직업 성향 라벨 — 가장 강한 십성 갈래로 정한다 */
const CAREER_TYPE: Record<FortuneIntlLang, Record<string, string>> = {
  en: {
    관성: 'a stable-organisation type', 식상: 'a specialist or founder type',
    재성: 'a business and sales type', 인성: 'an expert-knowledge type', 비겁: 'an independent-driver type',
  },
  zh: {
    관성: '安稳组织型', 식상: '专业与创业型', 재성: '经营与销售型',
    인성: '专业知识型', 비겁: '独立推进型',
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

/* ────────────────────────────────────────────────
   중국어
──────────────────────────────────────────────── */
function buildZh(f: SajuFacts): DomainFortuneIntl[] {
  const sc = f.sc;
  const s = f.scores;
  const g = GRADES.zh;
  const stem = STEMS.find(x => x.kor === f.dayStemKor)!;
  const si = STEMS_INTL.zh[stem.hanja];
  const elLabel = ELEMENT_INTL.zh[f.dayStemElement].label;
  const dc = dominantCat(f);
  const organ = f.missingEls[0] ? ORGAN.zh[f.missingEls[0]] : null;
  const female = f.gender === 'female';

  const love: DomainFortuneIntl = {
    id: 'love', emoji: '💕', title: '恋爱运', score: s.love, grade: g[s.love], colorKey: 'rose',
    intro: female
      ? '在四柱里，女性的异性缘看官星。官星的强弱与种类，决定了遇到人的频率、关系的深度和恋爱的方式。命中带桃花煞时，多半是魅力自然外放、对方先靠过来。'
      : '在四柱里，男性的异性缘看财星。财星的强弱与种类，决定了对待感情的方式、关系能维持多久，以及恋爱的模式。若同时带桃花煞，吸引力会显得毫不费力。',
    summary: s.love >= 4
      ? '异性缘旺、机会自然会来的命格。'
      : s.love === 3
      ? '缘分是慢慢熟的命格。时机来了别错过。'
      : '这段时期更适合把力气放在自己成长上。准备好了，更好的缘分才会来。',
    points: [
      f.partnerCat >= 2
        ? `${female ? '官星' : '财星'}明显（${starList(f, 'zh', female ? ['정관', '편관'] : ['정재', '편재'])}），缘分往往会自己找上来。`
        : f.partnerCat === 0
        ? `命中没有${female ? '官星' : '财星'}，注意力自然更多放在工作和自己的目标上。缘分往往在你长成自己之后才来。`
        : '只有一颗配偶星，缘分是有选择性的。深耕一段关系比广泛结识更合适。',
      f.partnerStar === (female ? '정관' : '정재')
        ? female ? '正官指向一位安稳、在社会上受认可的对象。' : '正财指向一位务实、有家庭观念的对象。'
        : f.partnerStar === (female ? '편관' : '편재')
        ? female ? '偏官指向强烈而带挑战性的对象。把自己的主张立清楚很重要。' : '偏财带来人气，但关系容易短。专注在一个人身上，在这里是个需要刻意做的选择。'
        : '这个命格的模式是：先往自己的目标走，缘分才跟上来。',
      f.hasPeach
        ? '带桃花煞，魅力容易被看见，常有人先来靠近。'
        : '你的魅力是安静而内向的那种。愿意先开口时，机会会多很多。',
      f.singang
        ? '身强的人容易把标准定得高。稍微放松一点，会遇到更好的。'
        : '身弱的人容易依赖对方。先把自己的立足点垫高，这一点才会变。',
    ],
    advice: s.love >= 4
      ? '机会是有的；决定结果的是你能不能在其中一段上定下来。'
      : '与其去追，不如把自己变得有意思。对的人会认出这一点。',
  };

  const marriage: DomainFortuneIntl = {
    id: 'marriage', emoji: '💍', title: '婚姻运', score: s.marriage, grade: g[s.marriage], colorKey: 'pink',
    intro: '婚姻看配偶星与比劫的搭配。配偶星安稳有利于成家；比劫过重则意味着两股强意志相撞，多半会把时间往后推。四柱不定日期，它描述的是你手上的条件。',
    summary: f.lateMarriage
      ? '命格指向晚婚。这里「准备好」比「早」更重要。'
      : s.marriage >= 4
      ? '条件有利于稳定的婚姻。'
      : '婚姻可成，前提是现实的准备要刻意去做。',
    points: [
      f.lateMarriage
        ? '配偶星弱，或比劫偏重，通常会把婚期往后推。这不是警告 —— 这种格局里晚成的婚姻往往更稳。'
        : '配偶星够清楚，婚姻可以按常规节奏成形。',
      f.hasStablePartner
        ? female ? '正官有利于遇到社会上安稳、对责任认真的配偶。' : '正财有利于遇到务实、顾家的配偶。'
        : f.partnerStar
        ? '配偶星是偏的那一种 —— 吸引容易，安稳需要刻意去建。'
        : '配偶星偏弱，更合适的对象会在你自己安定之后出现。',
      sc.비겁 >= 3
        ? '比劫重，等于一个家里有两股强意志。早点谈清楚「事情怎么定」，能免掉大半摩擦。'
        : '比劫适中，婚姻里的给与让会自然一些。',
      f.singang
        ? '身强的人在争执里不容易退。事先想好哪些事情你愿意让，比赢下它们更值。'
        : '身弱的人容易迁就。在积成怨气之前把想要的说出来，是这里真正的功课。',
    ],
    advice: f.lateMarriage
      ? '不要拿别人的时间表量自己。这种格局靠准备，不靠快。'
      : '钱、双方家庭、住哪里，这些在婚前谈完而不是婚后。那场对话才是真正的仪式。',
  };

  const career: DomainFortuneIntl = {
    id: 'career', emoji: '💼', title: '事业与转职运', score: s.career, grade: g[s.career], colorKey: 'blue',
    intro: '事业看官星、食伤、财星的组合。官星强适合在组织里发展；食伤强则更适合以创造为核心的环境。身强的人扛得住独立和转职；身弱的人成败很大程度取决于同事的质量。',
    summary: `${CAREER_TYPE.zh[dc]}。${s.career >= 4 ? '当前的工作环境正在帮你。' : s.career === 3 ? '关键在于把转职的时机挑对。' : '工作可能变动较多，但最终你会找到自己的路。'}`,
    points: [
      dc === '관성'
        ? '官星强，能顺应制度并在其中稳步上升。公职、大企业、金融都适合。'
        : dc === '식상'
        ? '食伤强，创造力与表达力都好，但也容易和层级摩擦，所以自由职业或专业岗往往更合适。'
        : dc === '재성'
        ? '财星强，对销售、经营、投资很有感觉。绩效制比固定薪水更能激励这种命格。'
        : dc === '인성'
        ? '印星强，靠知识与专业积累事业。教育、研究、法务、医疗都会回报它。'
        : '比劫强，想独立做事。建自己的一块地盘，比听人安排适合得多。',
      f.singang
        ? '身强自带推力、能自己拿主意，在要求高的环境里表现更好。要不要动，很少是犹豫的问题。'
        : '身弱在协作里做出的成果比独自更大。好同事是实在的资产，被支撑时你会明显更亮。',
      sc.관성 >= 1 && sc.식상 >= 1
        ? '官星与食伤并存，最适合在组织里担任有创造性的角色 —— 策划、市场、内容。'
        : sc.관성 === 0
        ? '没有官星，层级重的环境不适合你。自由度高、或由你来定的环境更对。'
        : '守住现在的稳定，同时搭一条副业或额外收入的通道，长期更有利。',
      `${stem.hanja}（${si.kor}）日干在${si.aptitude}方面有天然的才能。`,
    ],
    advice: sc.관성 === 0
      ? '如果考虑转职，找一个真正有自主权或决定权的位置。'
      : f.singang
      ? '动之前先看当前大运是否有利。从准备好的状态出发，成功率高得多。'
      : '在稳定的组织里把专业做深，长期更有利。转职要慎重。',
  };

  const wealth: DomainFortuneIntl = {
    id: 'wealth', emoji: '💰', title: '财运', score: s.wealth, grade: g[s.wealth], colorKey: 'amber',
    intro: '财运看财星的强弱，以及食伤怎么去生它。食神生财的格局，是靠能力自然把钱挣出来的理想结构。反过来，比劫太重时，钱进来也容易从旁边漏走，所以怎么管比怎么挣更关键。',
    summary: s.wealth >= 4
      ? f.allSS.includes('식신') ? '食神生财的格局 —— 能力换成收入。这是最理想的财格。' : '有稳定积累结构的财格，钱留得住。'
      : s.wealth === 3
      ? '财运普通。怎么管比怎么挣更重要。'
      : '钱在这个命格里走得快。设一个固定的存钱机制，比提高收入更有用。',
    points: [
      sc.재성 >= 2
        ? `财星强（${starList(f, 'zh', ['정재', '편재'])}），对钱有实在的直觉。`
        : sc.재성 === 0
        ? '没有财星，收入更多来自专业与口碑，而不是做买卖。把本事做出来，钱跟着来。'
        : '只有一颗财星 —— 一条可靠的通道，胜过几条投机的。',
      sc.식상 >= 1 && sc.재성 >= 1
        ? '食伤生财：你做出来的东西能变成收入。把自己的本事做成产品，是最短的一条路。'
        : '这个命格里「做」和「挣」没有自动连上，收入更取决于位置。站在哪里很重要。',
      sc.비겁 >= 3
        ? '比劫重，钱容易往身边的人那边漏。发薪日自动转走，比靠意志力有用。'
        : '比劫适中，进来的钱大致留得住。',
      f.missingEls.includes('금')
        ? '命中缺金，传统上读作守财偏弱。把这当成「存钱要变成结构而不是选项」的理由。'
        : '和钱有关的五行没有缺口，常规的自律就够了。',
    ],
    advice: sc.비겁 >= 3
      ? '发薪当天就把固定的一笔挪到拿不到的地方。这个命格不适合把钱放在手边。'
      : '先把一条收入通道做深，再加第二条。宽而不深，是这种格局常见的失手处。',
  };

  const study: DomainFortuneIntl = {
    id: 'study', emoji: '📚', title: '学业与考试运', score: s.study, grade: g[s.study], colorKey: 'indigo',
    intro: '学业看印星。正印适合按部就班、有结构的学习；偏印靠直觉与独特角度，但受不了重复。比劫强而无印星的人，靠做来学比靠读来学更有效。',
    summary: s.study >= 4
      ? '吃得进书、也留得住的命格。'
      : s.study === 3
      ? '学得进去，但方法比时长更要紧。'
      : '靠做来学，比靠读来学更适合你。',
    points: [
      sc.인성 >= 2
        ? '印星强，吸收好也记得住。长线学习和考证都会回报这个命格。'
        : sc.인성 === 0
        ? '没有印星，只靠读是留不住的。拿材料动手做点什么，才记得住。'
        : '一颗印星 —— 有结构在的时候，足以稳步学下去。',
      f.hasJeongin
        ? '正印适合正统、有结构的学习。有大纲、有进度表，对你有利。'
        : f.hasPyeongin
        ? '偏印学得快、角度斜，而且很快对刷题厌烦。换材料比硬逼重复更有效。'
        : '没有印星时，动力得来自具体目标。先定下要考什么，再往回排。',
      f.singang
        ? '身强撑得住重的进度表。风险是过头 —— 在需要之前就把休息排进去。'
        : '身弱更适合短而规律，而不是长时间硬冲。这里持续性胜过强度。',
      sc.비겁 >= 3
        ? '比劫重，容易被别人带走注意力。要么一个人学，要么找真的安静的自习环境。'
        : '专注度尚可，常规方法就适用。',
    ],
    advice: f.hasJeongin
      ? '定一份大纲然后照着走。这个命格回报正统的准备，多于回报小聪明。'
      : '早点开始做真题，而不是留到最后。从真实题目往回推，比顺着读更合适你。',
  };

  const health: DomainFortuneIntl = {
    id: 'health', emoji: '🏥', title: '健康运', score: s.health, grade: g[s.health], colorKey: 'green',
    intro: '五行的平衡直接读到身上：木对肝胆，火对心与循环，土对脾胃，金对肺与大肠，水对肾与膀胱。某一行完全没有，就是要留意的地方；身强身弱则定了体力的底子。',
    summary: s.health >= 4
      ? `整体体力与精神都不错。${f.singang ? '身强，活动的能量很足。' : ''}`
      : s.health === 3
      ? '这个命格需要均衡地照看。留意下面点出的部位。'
      : '体力见底比命格看起来要快。这种格局里，休息不是可选项。',
    points: [
      organ
        ? `命中缺${ELEMENT_INTL.zh[f.missingEls[0]].label}，传统上指向${organ.organ} —— 留意${organ.sym}。`
        : '五行没有缺口，也就没有特别突出的弱处。常规的均衡就够。',
      f.singang
        ? '身强有能量可花，而且往往真会花掉。比起生病，用力过度造成的损伤更可能发生。'
        : '身弱恢复得慢一些。睡够、按时吃饭，比任何补品都有用。',
      f.missingEls.length >= 2
        ? `缺两行以上（${f.missingEls.map(e => ELEMENT_INTL.zh[e].label).join('、')}），平衡是偏的。定期检查比等症状出现再反应更值。`
        : '五行平衡尚可，常规照看就够。',
      f.dominantEl
        ? `命中${ELEMENT_INTL.zh[f.dominantEl].label}偏旺。过旺和缺一样值得留意 —— 它常表现为同一系统上的紧张。`
        : '没有哪一行明显偏旺。',
    ],
    advice: organ
      ? `${ELEMENT_INTL.zh[f.missingEls[0]].shortage} 这些都不能代替医生 —— 如果一直不好，去看一下。`
      : '睡眠、活动、按时吃饭，基本覆盖这个命格需要的。持续不好的症状归医生，不归命盘。',
  };

  const social: DomainFortuneIntl = {
    id: 'social', emoji: '🤝', title: '人际与人脉运', score: s.social, grade: g[s.social], colorKey: 'teal',
    intro: '人际看食伤（表达）、印星（怎么接住别人）与比劫（在人群里怎么站住）。带桃花煞则多一份看得见的吸引力。',
    summary: s.social >= 4
      ? '人自然会向这个命格靠过来，攒起来的人脉是实在的资产。'
      : s.social === 3
      ? '圈子不大但稳。深比广更适合你。'
      : '人少一点、走近一点。这是一种可行的形状，不是缺陷。',
    points: [
      sc.식상 >= 2
        ? '食伤强，表达顺畅、读场也准。你是那个会去搭线的人。'
        : '表达不是这里的强项。做那个「说到做到」的人，是这一点行得通的版本。',
      sc.인성 >= 2
        ? '印星强，会听也记得住。别人愿意跟你说事，这本身就是一种人脉。'
        : '你倾向照字面理解别人，效率高，偶尔也吃亏。多问一句你觉得不必问的话。',
      f.hasPeach
        ? '带桃花煞，在人群里不用刻意就会被看见。'
        : '你的存在感是慢慢累积的，不是一见就有。多次接触对你才有效。',
      sc.비겁 >= 3
        ? '比劫重，会把竞争带进友情。挑那些强项和你不一样的人来合作。'
        : '比劫适中，合作不太会有摩擦。',
    ],
    advice: sc.비겁 >= 3
      ? '这种格局里，钱和朋友之间留点距离。那正是它出问题的具体位置。'
      : '把少数关系认真维持住，胜过收集很多。值得的那几个，记得跟进。',
  };

  const business: DomainFortuneIntl = {
    id: 'business', emoji: '🚀', title: '事业与创业运', score: s.business, grade: g[s.business], colorKey: 'violet',
    intro: '创业看命格是否强到能扛风险（身强），以及有没有财星与食伤把力气换成收入。身弱而官星重的人，受雇比创业更合适。',
    summary: s.business >= 4
      ? '这个格局支持自己出来做，风险扛得住。'
      : s.business === 3
      ? '有合适的伙伴补上你缺的那块，创业可行。'
      : '这个命格在组织里更好，或者先在别处攒好底子再创业。',
    points: [
      f.singang && sc.재성 >= 1
        ? '身强又有财星，扛得住风险也看得到回报。这是创业的格局。'
        : f.singang
        ? '命格够强能扛风险，但财星薄 —— 找一个管钱的人搭。'
        : '身弱独自扛风险会受伤。合伙人在这里不是可选项。',
      sc.식상 >= 1 && sc.재성 >= 1
        ? '食伤生财：你做出来的东西可以直接成为产品。'
        : '这里从「做」到「挣」不是自动的。先定谁去卖，再定做什么。',
      !f.singang && sc.관성 >= 2
        ? '身弱而官星重，受雇的结构对你更好。创业对这个格局是更难的一条路。'
        : '命盘里没有反对你自己干的地方。',
      sc.비겁 >= 3 && sc.재성 === 0
        ? '比劫重而无财星：劲有，但通到钱的路没有。先把路找出来。'
        : '本钱和力气在这里能找到回报的出口。',
    ],
    advice: f.singang
      ? '开始之前定好你愿意亏多少，到了就停。这个命格否则会冲过那条线。'
      : '一边有薪水一边把东西做起来，直到它能自己站住。这种格局最怕脚下没有底。',
  };

  const change: DomainFortuneIntl = {
    id: 'change', emoji: '🔄', title: '变动与转换运', score: s.change, grade: g[s.change], colorKey: 'orange',
    intro: '对变动的胃口看驿马煞、命格强弱，以及比劫的轻重。官星重则往另一边拉，倾向于留下。',
    summary: s.change >= 4
      ? '会动的命格。变动在这里往往有好结果。'
      : s.change === 3
      ? '时机是挑出来的而不是被逼出来的时候，变动可行。'
      : '留下来把深度做出来，比动更适合这个命格。',
    points: [
      f.hasYongma
        ? '带驿马煞，动对你合适 —— 搬迁、出行、换领域都算。'
        : '没有驿马，根对你的重要程度可能超过你愿意承认的。变动在这里成本更高，所以要动就动得值得。',
      f.singang
        ? '身强的人动完站得住。拖着你的很少是犹豫。'
        : '身弱要先把下一步安排好再离开现在这一步。',
      sc.비겁 >= 2
        ? '比劫支持独立 —— 变动之后自己走一条路是现实的。'
        : '你更适合动进一个结构里，而不是动到空地上。',
      sc.관성 >= 3
        ? '官星过重，把你绑在一堆义务上。先把它们解开，否则动只是把它们搬了个地方。'
        : '结构上没有什么把你钉在原处。',
    ],
    advice: f.hasYongma
      ? '动是合适的，但目的地要按「要做的事」来挑，而不是按「要离开」来挑。'
      : '动之前，把「你想要什么变得不一样」说清楚。如果答案只有「不要这个」，那动了也修不好。',
  };

  const future: DomainFortuneIntl = {
    id: 'future', emoji: '🔮', title: '总体走向', score: s.future, grade: g[s.future], colorKey: 'purple',
    intro: '大的走向来自日干的五行，以及命格的强弱。大运约十年一转，当当前大运的方向和你自己的能量指向同一边时，成就最大。',
    summary: s.future >= 4
      ? `${elLabel}日干，能量能充分展开的一段人生。`
      : `${elLabel}日干 —— ${f.singang ? '把强的能量朝一个方向集中' : '把底子扎实地垫起来'}，是接下来的关键。`,
    points: [
      `${ELEMENT_INTL.zh[f.dayStemElement].advice}`,
      sc.관성 >= 1
        ? '有官星，靠社会认可与成就把路打开。重视事业和名声的方向对你合适。'
        : sc.재성 >= 1
        ? '有财星，物质上的成就会明显提高你的满意度。把钱换来的自由与安稳当目标去设。'
        : sc.식상 >= 1
        ? '食伤强，能把才华展开的人生，和幸福是直接连着的。想办法用喜欢的事情活下去。'
        : '比劫重的人最后会建起自己的一块地盘。独立这条路在这里不是弯路，就是正路。',
      '大运每十年换一次大的流向。看清当前这一步指向哪里，才是规划的起点。',
      `${stem.hanja}（${si.kor}）日干的核心强项：${si.personality.split('。')[0]}。`,
    ],
    advice: '定年度目标时，把力气放在命格强的那几块，回报来得快。弱的那几块，交给别人比自己硬补更有效率。',
  };

  return [love, marriage, career, wealth, study, health, social, business, change, future];
}

/**
 * 영역별 운세 열 가지를 언어에 맞게 만든다.
 *
 * 점수는 lib/saju-fortune-facts.ts가 계산하므로 한국어와 같다 — 문장만 갈린다.
 */
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
  return lang === 'en' ? buildEn(facts) : buildZh(facts);
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
  zh: {
    title: '分领域运势',
    lead: '从同一张命盘读出的十个领域。分数来自命格结构，与你什么时候打开这一页无关。',
    showAll: '展开全部十项', collapse: '收起',
    scoreOf: n => `${n} / 5`,
  },
};
