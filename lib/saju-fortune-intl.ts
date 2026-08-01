import { STEMS } from './saju-data.ts';
import type { Pillar } from './saju-data.ts';
import type { SajuIntlLang } from './saju-intl.ts';
import { SAJU_L10N } from './saju-l10n/index.ts';
import type { SajuCopy } from './saju-l10n/types.ts';
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

function dominantCat(f: SajuFacts): string {
  return (Object.entries(f.sc) as [string, number][]).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '비겁';
}

/** 관성/재성 중 사주에 실제로 있는 별 이름을 이어 붙인다 */
/* ────────────────────────────────────────────────
   생성기 — 하나뿐이다. 조건은 여기, 말은 언어 파일에.
──────────────────────────────────────────────── */

/** `{el}` 같은 자리표시자를 채운다 — 어순이 다른 언어도 제자리에 넣을 수 있다 */
function fill(tpl: string, vars: Record<string, string>): string {
  return tpl.replace(/\{(\w+)\}/g, (m, k) => vars[k] ?? m);
}

function build(f: SajuFacts, c: SajuCopy): DomainFortuneIntl[] {
  const sc = f.sc;
  const s = f.scores;
  const g = c.grades;
  const stem = STEMS.find(x => x.kor === f.dayStemKor)!;
  const si = c.stems[stem.hanja];
  const el = c.elements[f.dayStemElement];
  const dc = dominantCat(f);
  const missing = f.missingEls[0] ? c.organ[f.missingEls[0]] : null;
  const female = f.gender === 'female';
  const stars = (keys: string[]) => f.allSS.filter(x => keys.includes(x)).map(x => c.star[x] ?? x).join(c.starSep);
  /** 점수 5·4 / 3 / 그 아래 */
  const band = (n: number, d: [string, string, string]) => (n >= 4 ? d[0] : n === 3 ? d[1] : d[2]);

  const D = c.domains;
  const dayVars = { stem: stem.hanja, reading: si.kor };

  const love: DomainFortuneIntl = {
    id: 'love', emoji: '💕', title: D.love.title, score: s.love, grade: g[s.love], colorKey: 'rose',
    intro: typeof D.love.intro === 'string' ? D.love.intro : female ? D.love.intro.female : D.love.intro.male,
    summary: band(s.love, D.love.sum),
    points: [
      f.partnerCat >= 2
        ? fill(female ? D.love.points.manyF : D.love.points.manyM, { stars: stars(female ? ['정관', '편관'] : ['정재', '편재']) })
        : f.partnerCat === 0
        ? (female ? D.love.points.noneF : D.love.points.noneM)
        : D.love.points.one,
      f.partnerStar === (female ? '정관' : '정재')
        ? (female ? D.love.points.properF : D.love.points.properM)
        : f.partnerStar === (female ? '편관' : '편재')
        ? (female ? D.love.points.indirectF : D.love.points.indirectM)
        : D.love.points.otherStar,
      f.hasPeach ? D.love.points.peach : D.love.points.noPeach,
      f.singang ? D.love.points.strong : D.love.points.weak,
    ],
    advice: s.love >= 4 ? D.love.adv[0] : D.love.adv[1],
  };

  const marriage: DomainFortuneIntl = {
    id: 'marriage', emoji: '💍', title: D.marriage.title, score: s.marriage, grade: g[s.marriage], colorKey: 'pink',
    intro: D.marriage.intro as string,
    // 늦은 결혼은 점수보다 먼저 본다 — 점수가 높아도 시기가 늦다는 말이 우선이다
    summary: f.lateMarriage ? D.marriage.sum[2] : s.marriage >= 4 ? D.marriage.sum[0] : D.marriage.sum[1],
    points: [
      f.lateMarriage ? D.marriage.points.late : D.marriage.points.normal,
      f.hasStablePartner
        ? (female ? D.marriage.points.stableF : D.marriage.points.stableM)
        : f.partnerStar ? D.marriage.points.indirect : D.marriage.points.noStar,
      sc.비겁 >= 3 ? D.marriage.points.heavySelf : D.marriage.points.moderate,
      f.singang ? D.marriage.points.strong : D.marriage.points.weak,
    ],
    advice: f.lateMarriage ? D.marriage.adv[1] : D.marriage.adv[0],
  };

  const career: DomainFortuneIntl = {
    id: 'career', emoji: '💼', title: D.career.title, score: s.career, grade: g[s.career], colorKey: 'blue',
    intro: D.career.intro as string,
    summary: `${c.careerType[dc]}. ${band(s.career, D.career.sum)}`,
    points: [
      D.career.points[dc] ?? D.career.points['비겁'],
      f.singang ? D.career.points.strong : D.career.points.weak,
      sc.관성 >= 1 && sc.식상 >= 1 ? D.career.points.both
        : sc.관성 === 0 ? D.career.points.noAuth
        : D.career.points.otherAuth,
      fill(D.career.points.aptitude, { ...dayVars, aptitude: si.aptitude.toLowerCase() }),
    ],
    advice: sc.관성 === 0 ? D.career.points.advNoAuth
      : f.singang ? D.career.adv[0] : D.career.adv[1],
  };

  const wealth: DomainFortuneIntl = {
    id: 'wealth', emoji: '💰', title: D.wealth.title, score: s.wealth, grade: g[s.wealth], colorKey: 'amber',
    intro: D.wealth.intro as string,
    summary: s.wealth >= 4
      ? (f.allSS.includes('식신') ? D.wealth.points.sikshin : D.wealth.sum[0])
      : s.wealth === 3 ? D.wealth.sum[1] : D.wealth.sum[2],
    points: [
      sc.재성 >= 2 ? fill(D.wealth.points.many, { stars: stars(['정재', '편재']) })
        : sc.재성 === 0 ? D.wealth.points.none : D.wealth.points.one,
      sc.식상 >= 1 && sc.재성 >= 1 ? D.wealth.points.linked : D.wealth.points.unlinked,
      sc.비겁 >= 3 ? D.wealth.points.heavySelf : D.wealth.points.moderate,
      f.missingEls.includes('금') ? D.wealth.points.noMetal : D.wealth.points.ok,
    ],
    advice: sc.비겁 >= 3 ? D.wealth.adv[0] : D.wealth.adv[1],
  };

  const study: DomainFortuneIntl = {
    id: 'study', emoji: '📚', title: D.study.title, score: s.study, grade: g[s.study], colorKey: 'indigo',
    intro: D.study.intro as string,
    summary: band(s.study, D.study.sum),
    points: [
      sc.인성 >= 2 ? D.study.points.many : sc.인성 === 0 ? D.study.points.none : D.study.points.one,
      f.hasJeongin ? D.study.points.jeongin : f.hasPyeongin ? D.study.points.pyeongin : D.study.points.neither,
      f.singang ? D.study.points.strong : D.study.points.weak,
      sc.비겁 >= 3 ? D.study.points.heavySelf : D.study.points.ok,
    ],
    advice: f.hasJeongin ? D.study.adv[0] : D.study.adv[1],
  };

  const health: DomainFortuneIntl = {
    id: 'health', emoji: '🏥', title: D.health.title, score: s.health, grade: g[s.health], colorKey: 'green',
    intro: D.health.intro as string,
    summary: s.health >= 4
      ? D.health.sum[0] + (f.singang ? D.health.points.sumStrongSuffix : '')
      : s.health === 3 ? D.health.sum[1] : D.health.sum[2],
    points: [
      missing
        ? fill(D.health.points.missing, {
            el: c.elements[f.missingEls[0]].label, organ: missing.organ, sym: missing.sym,
          })
        : D.health.points.noMissing,
      f.singang ? D.health.points.strong : D.health.points.weak,
      f.missingEls.length >= 2
        ? fill(D.health.points.twoPlus, { els: f.missingEls.map(e => c.elements[e].label).join(', ') })
        : D.health.points.balanceOk,
      f.dominantEl
        ? fill(D.health.points.dominant, { el: c.elements[f.dominantEl].label })
        : D.health.points.noDominant,
    ],
    advice: missing
      ? fill(D.health.adv[0], { shortage: c.elements[f.missingEls[0]].shortage })
      : D.health.adv[1],
  };

  const social: DomainFortuneIntl = {
    id: 'social', emoji: '🤝', title: D.social.title, score: s.social, grade: g[s.social], colorKey: 'teal',
    intro: D.social.intro as string,
    summary: band(s.social, D.social.sum),
    points: [
      sc.식상 >= 2 ? D.social.points.outStrong : D.social.points.outWeak,
      sc.인성 >= 2 ? D.social.points.resStrong : D.social.points.resWeak,
      f.hasPeach ? D.social.points.peach : D.social.points.noPeach,
      sc.비겁 >= 3 ? D.social.points.heavySelf : D.social.points.moderate,
    ],
    advice: sc.비겁 >= 3 ? D.social.adv[0] : D.social.adv[1],
  };

  const business: DomainFortuneIntl = {
    id: 'business', emoji: '🚀', title: D.business.title, score: s.business, grade: g[s.business], colorKey: 'violet',
    intro: D.business.intro as string,
    summary: band(s.business, D.business.sum),
    points: [
      f.singang && sc.재성 >= 1 ? D.business.points.strongWealth
        : f.singang ? D.business.points.strongOnly : D.business.points.weak,
      sc.식상 >= 1 && sc.재성 >= 1 ? D.business.points.linked : D.business.points.unlinked,
      !f.singang && sc.관성 >= 2 ? D.business.points.weakAuth : D.business.points.authOk,
      sc.비겁 >= 3 && sc.재성 === 0 ? D.business.points.noChannel : D.business.points.channelOk,
    ],
    advice: f.singang ? D.business.adv[0] : D.business.adv[1],
  };

  const change: DomainFortuneIntl = {
    id: 'change', emoji: '🔄', title: D.change.title, score: s.change, grade: g[s.change], colorKey: 'orange',
    intro: D.change.intro as string,
    summary: band(s.change, D.change.sum),
    points: [
      f.hasYongma ? D.change.points.yongma : D.change.points.noYongma,
      f.singang ? D.change.points.strong : D.change.points.weak,
      sc.비겁 >= 2 ? D.change.points.selfOk : D.change.points.structure,
      sc.관성 >= 3 ? D.change.points.heavyAuth : D.change.points.authOk,
    ],
    advice: f.hasYongma ? D.change.adv[0] : D.change.adv[1],
  };

  const future: DomainFortuneIntl = {
    id: 'future', emoji: '🔮', title: D.future.title, score: s.future, grade: g[s.future], colorKey: 'purple',
    intro: D.future.intro as string,
    summary: fill(s.future >= 4 ? D.future.sum[0] : f.singang ? D.future.sum[1] : D.future.sum[2], { elLabel: el.label }),
    points: [
      el.advice,
      sc.관성 >= 1 ? D.future.points.auth
        : sc.재성 >= 1 ? D.future.points.wealth
        : sc.식상 >= 1 ? D.future.points.output
        : D.future.points.self,
      D.future.points.luckPillars,
      fill(D.future.points.dayMaster, { ...dayVars, trait: si.personality.split(/[.。]/)[0] }),
    ],
    advice: D.future.adv[0],
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
  return build(facts, SAJU_L10N[lang]);
}

/** 영역별 운세 블록의 화면 문구 */
export const DOMAIN_UI: Record<FortuneIntlLang, SajuCopy['domainUi']> =
  Object.fromEntries((Object.keys(SAJU_L10N) as FortuneIntlLang[]).map(l => [l, SAJU_L10N[l].domainUi])) as
    Record<FortuneIntlLang, SajuCopy['domainUi']>;
