import { STEMS, BRANCHES, getSipseong } from './saju-data';
import type { Pillar, Element } from './saju-data';

export interface DomainFortune {
  id: string;
  emoji: string;
  title: string;
  score: 1|2|3|4|5;
  grade: '대길'|'길'|'보통'|'주의'|'흉';
  summary: string;
  points: string[];
  advice: string;
  colorKey: 'rose'|'pink'|'blue'|'amber'|'indigo'|'green'|'teal'|'violet'|'purple'|'orange';
}

type SipCats = { 비겁:number; 식상:number; 재성:number; 관성:number; 인성:number };

const SS_CAT: Record<string, keyof SipCats> = {
  비견:'비겁', 겁재:'비겁', 식신:'식상', 상관:'식상',
  편재:'재성', 정재:'재성', 편관:'관성', 정관:'관성',
  편인:'인성', 정인:'인성',
};

const GRADES: Record<1|2|3|4|5, '대길'|'길'|'보통'|'주의'|'흉'> = {
  5:'대길', 4:'길', 3:'보통', 2:'주의', 1:'흉',
};

function countSip(ilganIdx: number, pillars: (Pillar|null)[]): SipCats {
  const c: SipCats = { 비겁:0, 식상:0, 재성:0, 관성:0, 인성:0 };
  for (const p of pillars) {
    if (!p) continue;
    const cat = SS_CAT[getSipseong(ilganIdx, p.stemIdx)];
    if (cat) c[cat]++;
  }
  return c;
}

function clamp(n: number): 1|2|3|4|5 {
  return Math.min(5, Math.max(1, Math.round(n))) as 1|2|3|4|5;
}

// 도화살 지지: 子(0)卯(3)午(6)酉(9)
const PEACH = new Set([0, 3, 6, 9]);
// 역마살 지지: 寅(2)申(8)巳(5)亥(11)
const YONGMA = new Set([2, 8, 5, 11]);

export function analyzeFortune(
  dayPillar: Pillar,
  yearPillar: Pillar,
  monthPillar: Pillar,
  hourPillar: Pillar | null,
  gender: 'male'|'female',
  singang: boolean,
  ohaengCounts: Record<string, number>,
): DomainFortune[] {
  const ilg = dayPillar.stemIdx;
  const dayStem   = STEMS[ilg];
  const dayBranch = BRANCHES[dayPillar.branchIdx];
  const allPillars = [yearPillar, monthPillar, dayPillar, hourPillar];
  const others     = [yearPillar, monthPillar, hourPillar];
  const sc  = countSip(ilg, others);

  const ySS = getSipseong(ilg, yearPillar.stemIdx);
  const mSS = getSipseong(ilg, monthPillar.stemIdx);
  const hSS = hourPillar ? getSipseong(ilg, hourPillar.stemIdx) : '';
  const allSS = [ySS, mSS, hSS];

  const hasPeach  = allPillars.some(p => p && PEACH.has(p.branchIdx));
  const hasYongma = allPillars.some(p => p && YONGMA.has(p.branchIdx));
  const missingEls = (['목','화','토','금','수'] as Element[]).filter(e => !ohaengCounts[e]);
  const dominantEl = (Object.entries(ohaengCounts) as [Element,number][]).sort((a,b)=>b[1]-a[1])[0]?.[0];

  const partnerCat  = gender === 'female' ? sc.관성 : sc.재성;
  const partnerStar = gender === 'female'
    ? (allSS.includes('정관') ? '정관' : allSS.includes('편관') ? '편관' : null)
    : (allSS.includes('정재') ? '정재' : allSS.includes('편재') ? '편재' : null);

  const el = dayStem.element;
  const elName = `${el}(${dayStem.kor})`;

  // ─── 1. 연애운 ──────────────────────────────────────────────────────────────
  const loveScore = clamp(3
    + (partnerCat >= 2 ? 1 : partnerCat === 0 ? -1 : 0)
    + (hasPeach ? 1 : 0)
    + (singang && partnerCat === 0 ? -1 : 0)
  );

  const love: DomainFortune = {
    id: 'love', emoji: '💕', title: '연애운',
    score: loveScore, grade: GRADES[loveScore], colorKey: 'rose',
    summary: loveScore >= 4
      ? '이성 인기가 높고 만남 기회가 자연스럽게 찾아오는 사주입니다.'
      : loveScore === 3
      ? '인연이 서서히 무르익는 사주입니다. 때를 놓치지 마세요.'
      : '연애보다 자기 성장에 집중하는 시기입니다. 준비된 후 더 좋은 인연이 옵니다.',
    points: gender === 'female' ? [
      partnerCat >= 2
        ? `관성(官星 — ${allSS.filter(s=>['정관','편관'].includes(s)).join('·')})이 뚜렷해 이성 인연이 자연스럽게 찾아오는 구조입니다.`
        : partnerCat === 0
        ? '관성(官星)이 없어 연애보다 일·자기 목표에 더 집중하는 성향입니다. 인연은 결국 자신이 강해진 후에 옵니다.'
        : '관성이 하나여서 인연이 선택적으로 찾아옵니다. 넓게 만나기보다 깊이 있는 관계 하나를 키우는 것이 맞습니다.',
      partnerStar === '정관'
        ? '정관(正官) 기운으로 안정적이고 사회적으로 인정받는 남성과 인연이 깊습니다.'
        : partnerStar === '편관'
        ? '편관(偏官) 기운으로 강렬하고 도전적인 남성과 인연이 많습니다. 자신의 주관을 명확히 세우는 것이 중요합니다.'
        : '이성보다 자신의 목표를 향해 나아갈 때 자연스럽게 이성이 따라오는 패턴입니다.',
      hasPeach
        ? '도화살(桃花殺) 기운이 있어 매력이 자연스럽게 발산되고 이성이 먼저 다가오는 경우도 많습니다.'
        : '조용한 내면적 매력을 가진 사주입니다. 먼저 다가가는 용기를 낼 때 더 많은 인연이 열립니다.',
      singang
        ? '신강해 스스로 조건을 높게 설정하는 경향이 있습니다. 마음을 조금 열면 더 좋은 만남이 옵니다.'
        : '신약해 상대에게 의지하는 성향이 생기기 쉽습니다. 자신의 가치를 먼저 높이는 것이 중요합니다.',
    ] : [
      partnerCat >= 2
        ? `재성(財星 — ${allSS.filter(s=>['정재','편재'].includes(s)).join('·')})이 강해 이성 인기가 높고 만남의 기회가 자주 찾아오는 구조입니다.`
        : partnerCat === 0
        ? '재성(財星)이 없어 이성 인연이 적거나 늦게 찾아오는 경향이 있습니다. 일이나 학문에 집중하는 시기가 길 수 있습니다.'
        : '재성이 하나여서 이성 만남이 선별적입니다. 질 좋은 한 명과의 관계에 집중하는 것이 맞습니다.',
      partnerStar === '편재'
        ? '편재(偏財)가 있어 이성 인기는 높지만 관계가 단명하기 쉽습니다. 한 사람에게 집중하는 의식적인 노력이 필요합니다.'
        : partnerStar === '정재'
        ? '정재(正財)가 있어 현실적이고 가정적인 이성과 인연이 깊습니다.'
        : '이성에게 다가갈 때 직접적이고 진심 어린 표현이 가장 효과적입니다.',
      hasPeach
        ? '도화살(桃花殺) 기운으로 자연스러운 매력이 있으며 이성이 먼저 다가오는 경우가 많습니다.'
        : '차분하고 깊이 있는 매력을 가진 사주입니다. 공통 관심사를 기반으로 만남을 만드는 것이 효과적입니다.',
      singang
        ? '신강해 주도적인 연애를 즐기지만, 상대방을 배려하는 유연함도 함께 키워야 오래가는 관계가 됩니다.'
        : '신약해 이성에게 의지하는 성향이 생기기 쉽습니다. 먼저 자신의 독립적인 가치를 키우는 것이 중요합니다.',
    ],
    advice: loveScore >= 4
      ? hasPeach ? '먼저 말 걸거나 마음을 표현해보세요. 지금이 인연을 잡을 기회입니다.' : '일상에서 만나는 사람들과의 교류를 넓혀보세요. 좋은 인연이 가까이 있습니다.'
      : '자신감을 키우는 취미나 모임에 참여해보세요. 자연스러운 만남이 연결됩니다.',
  };

  // ─── 2. 결혼운 ──────────────────────────────────────────────────────────────
  const hasStablePartner = gender === 'female'
    ? allSS.includes('정관') : allSS.includes('정재');
  const marriageScore = clamp(3
    + (hasStablePartner ? 1 : 0)
    + (partnerCat === 0 ? -1 : 0)
    + (sc.비겁 >= 3 ? -1 : 0)
  );
  const lateMarriage = partnerCat === 0 || (singang && sc.비겁 >= 2);

  const marriage: DomainFortune = {
    id: 'marriage', emoji: '💍', title: '결혼운',
    score: marriageScore, grade: GRADES[marriageScore], colorKey: 'pink',
    summary: marriageScore >= 4
      ? '결혼 인연이 뚜렷한 사주입니다. 적절한 시기에 자연스럽게 이루어집니다.'
      : marriageScore === 3
      ? '결혼은 서두르기보다 자신이 준비된 시점에 이루어지는 사주입니다.'
      : '독립적 성향이 강하거나 인연이 늦을 수 있습니다. 준비된 사람에게 더 좋은 인연이 옵니다.',
    points: [
      lateMarriage
        ? '배우자 별이 약하거나 독립성이 강해 결혼 시기가 다소 늦어지는 경향이 있습니다. 30대 중반 이후에 더 안정적인 인연이 옵니다.'
        : !singang && partnerCat >= 1
        ? '신약하고 배우자 별이 있어 결혼 후 더 안정감을 찾는 이상적인 구조입니다. 20대 후반~30대 초반에 인연이 올 수 있습니다.'
        : '결혼 인연은 자연스럽게 찾아오지만, 자신의 성장과 병행할 때 더욱 빛납니다.',
      gender === 'female'
        ? (hasStablePartner ? '정관(正官)이 있어 사회적으로 안정적이고 책임감 강한 배우자와 인연이 맺어지기 쉽습니다.' : partnerStar === '편관' ? '편관(偏官)이 강하면 강렬하지만 변동성 있는 남성과 인연이 생기기 쉽습니다. 자신의 주관을 명확히 세우는 것이 중요합니다.' : '배우자 별이 약해 스스로 준비된 상태일 때 더 좋은 만남이 찾아옵니다.')
        : (hasStablePartner ? '정재(正財)가 있어 현실적이고 가정적인 배우자와 인연이 깊습니다.' : partnerStar === '편재' ? '편재(偏財)가 강하면 매력적이지만 안정감 부족한 이성과 인연이 많습니다. 관계의 안정성을 우선으로 두세요.' : '배우자 별이 약해 스스로 경제적·심리적으로 준비된 후 인연이 옵니다.'),
      `일지(日支)는 배우자 자리입니다. ${dayBranch.hanja}(${dayBranch.kor}) 일지는 ${dayBranch.element} 기운으로, ${
        dayBranch.element === '수' ? '지혜롭고 섬세한 배우자와의 인연을 나타냅니다.'
        : dayBranch.element === '목' ? '활기차고 성장 지향적인 배우자와의 인연을 나타냅니다.'
        : dayBranch.element === '화' ? '열정적이고 표현력 강한 배우자와의 인연을 나타냅니다.'
        : dayBranch.element === '토' ? '안정적이고 현실적인 배우자와의 인연을 나타냅니다.'
        : '원칙 있고 결단력 강한 배우자와의 인연을 나타냅니다.'
      }`,
      sc.비겁 >= 3
        ? '비겁이 강해 결혼 후에도 독립성을 유지하고 싶은 마음이 강합니다. 적당한 개인 공간이 보장되는 관계를 구성하면 오히려 행복한 결혼 생활이 됩니다.'
        : '배우자와의 감정 교류가 자연스러운 사주 구조입니다. 서로의 차이를 인정하는 것이 결혼의 핵심입니다.',
    ],
    advice: lateMarriage
      ? '결혼보다 자신의 경제력과 내면 성숙을 먼저 다지세요. 준비된 사람에게 좋은 인연이 옵니다.'
      : '배우자 후보를 만날 때 외모보다 가치관과 생활 방식의 일치를 우선으로 판단하세요.',
  };

  // ─── 3. 직업·이직운 ─────────────────────────────────────────────────────────
  const dominantCat = (Object.entries(sc) as [keyof SipCats, number][])
    .sort((a,b)=>b[1]-a[1])[0]?.[0];
  const careerTypeLabel =
    dominantCat === '관성' ? '안정 직장형' :
    dominantCat === '식상' ? '전문직·창업형' :
    dominantCat === '재성' ? '사업·영업형' :
    dominantCat === '인성' ? '전문지식형' : '독립 추진형';

  const careerScore = clamp(3
    + (sc.관성 >= 2 ? 1 : 0)
    + (sc.식상 >= 2 && sc.관성 === 0 ? 1 : 0)
    + (singang && sc.비겁 >= 2 ? 1 : 0)
    + (!singang && sc.비겁 >= 3 ? -1 : 0)
  );

  const career: DomainFortune = {
    id: 'career', emoji: '💼', title: '직업·이직운',
    score: careerScore, grade: GRADES[careerScore], colorKey: 'blue',
    summary: `${careerTypeLabel} 사주입니다. ${careerScore >= 4 ? '현재 직업 환경이 유리하게 작용하고 있습니다.' : careerScore === 3 ? '이직 시기를 신중하게 고르는 것이 중요합니다.' : '직업적 변화가 잦을 수 있으나 결국 자신만의 길을 찾게 됩니다.'}`,
    points: [
      dominantCat === '관성'
        ? '관성(官星)이 강해 조직 내에서 규범을 잘 따르고 안정적으로 승진하는 구조입니다. 공직·대기업·금융권에서 두각을 나타냅니다.'
        : dominantCat === '식상'
        ? '식상(食傷)이 강해 창의력과 표현력이 뛰어납니다. 상관은 직장 내 상하 관계에 마찰을 줄 수 있어, 프리랜서나 전문직이 더 잘 맞는 경우가 많습니다.'
        : dominantCat === '재성'
        ? '재성(財星)이 강해 영업·사업·투자 감각이 탁월합니다. 고정 월급보다 성과 기반 보상 체계에서 더욱 동기부여됩니다.'
        : dominantCat === '인성'
        ? '인성(印星)이 강해 학문과 전문 지식을 통한 커리어가 유리합니다. 교육·연구·법무·의료 분야에서 신뢰받는 전문가가 됩니다.'
        : '비겁(比劫)이 강해 독립적으로 일하고 싶은 욕구가 강합니다. 타인의 지시를 받는 환경보다 자신의 영역을 구축하는 것이 훨씬 더 잘 맞습니다.',
      singang
        ? '신강(身强)해 강한 추진력과 자기 결정권이 있어 도전적인 직업 환경에서 강점을 발휘합니다. 이직이나 독립 시도에서도 망설임이 적습니다.'
        : '신약(身弱)해 혼자보다 협력 환경에서 더 큰 성과를 냅니다. 좋은 동료와 조직이 중요한 자산이며 지원받을수록 더 빛납니다.',
      sc.관성 >= 1 && sc.식상 >= 1
        ? '관성과 식상이 공존해 조직 내에서 창의적인 역할(기획·마케팅·콘텐츠)을 맡는 것이 최적입니다.'
        : sc.관성 === 0
        ? '관성이 없어 상하관계나 규율이 강한 환경이 맞지 않습니다. 자유도가 높거나 자신이 리더인 환경이 최선입니다.'
        : '현재 직장에서의 안정성을 유지하면서 부업이나 부가 수입 채널을 만들어두는 것이 장기적으로 유리합니다.',
      `${dayStem.hanja}(${dayStem.kor}) 일간은 ${dayStem.aptitude} 분야에 자연스러운 재능이 있습니다.`,
    ],
    advice: sc.관성 === 0
      ? '이직을 고려한다면 자유도가 높거나 직접 결정권이 있는 포지션을 찾아보세요.'
      : singang
      ? '이직 타이밍은 현재 대운이 유리한지 먼저 확인하세요. 준비된 상태에서 이동하는 것이 성공률이 높습니다.'
      : '안정적인 조직 내에서 전문성을 쌓는 것이 장기적으로 더 유리합니다. 이직은 신중히 결정하세요.',
  };

  // ─── 4. 재물운 ──────────────────────────────────────────────────────────────
  const hasShiksin   = allSS.includes('식신');
  const hasPyeongjae = allSS.includes('편재');
  const hasJeongjae  = allSS.includes('정재');
  const wealthScore  = clamp(3
    + (sc.재성 >= 2 ? 1 : sc.재성 === 0 ? -1 : 0)
    + (sc.식상 >= 1 && sc.재성 >= 1 ? 1 : 0)
    + (sc.비겁 >= 3 ? -1 : 0)
    + (missingEls.includes('금') ? -1 : 0)
  );

  const wealth: DomainFortune = {
    id: 'wealth', emoji: '💰', title: '재물운',
    score: wealthScore, grade: GRADES[wealthScore], colorKey: 'amber',
    summary: wealthScore >= 4
      ? hasShiksin ? '식신생재(食神生財) 구조로 능력이 돈을 부르는 이상적인 재물 사주입니다.' : '꾸준히 재물을 모으는 구조가 갖춰진 사주입니다.'
      : wealthScore === 3
      ? '재물운은 보통 수준입니다. 어떻게 버느냐보다 어떻게 관리하느냐가 더 중요합니다.'
      : '재물 기복이 크거나 모으는 것에 어려움이 있는 구조입니다. 관리 전략이 필수입니다.',
    points: [
      hasPyeongjae && hasJeongjae
        ? '정재와 편재가 공존해 안정적인 수입과 투자 수익이 모두 있는 구조입니다. 재물 기복은 있지만 전체적으로 경제적 여유가 생깁니다.'
        : hasJeongjae
        ? '정재(正財)가 있어 성실한 노력으로 꾸준히 재산을 쌓는 구조입니다. 예적금·부동산 등 안전자산 중심 관리가 잘 맞습니다.'
        : hasPyeongjae
        ? '편재(偏財)가 있어 사업·투자·영업으로 큰 수입을 얻을 수 있지만 지출도 크고 기복이 있습니다. 비상금 확보가 필수입니다.'
        : sc.재성 === 0
        ? '재성이 없어 재물에 큰 관심이 없거나 손에 잘 쥐어지지 않는 구조입니다. 지식·기술 자산을 경제적 가치로 전환하는 재테크가 더 잘 맞습니다.'
        : '재성이 약하지만 다른 십성을 통해 간접적으로 재물을 만들 수 있습니다.',
      hasShiksin
        ? '식신(食神)이 있어 내 재능과 능력으로 자연스럽게 재물이 따라오는 구조입니다. 좋아하는 일을 깊이 파고들수록 경제적 보상이 커집니다.'
        : sc.식상 >= 1
        ? '식상(食傷) 에너지가 있어 전문 기술이나 창작 활동으로 부가 수입을 만들 수 있습니다. 본업 외 부업 채널을 열어두는 것이 유리합니다.'
        : '재물을 만드는 식상이 약해 능동적으로 수입 채널을 개발하는 노력이 필요합니다.',
      sc.비겁 >= 3
        ? '비겁(比劫)이 강해 돈이 들어와도 주변으로 빠져나가는 구조가 만들어지기 쉽습니다. 공동투자·보증은 피하고 단독으로 재물을 관리하세요.'
        : '재물 관리 면에서는 계획적인 지출 패턴을 만드는 것이 가장 중요합니다.',
      ohaengCounts['금'] > 0
        ? '금(金) 기운이 있어 재물 감각이 예리하고 가치 있는 것을 알아보는 눈이 있습니다.'
        : '금(金) 기운이 부족해 재물 관리에 소홀해지기 쉽습니다. 흰색·은색 소품을 가까이 두거나 서쪽 방향 활동을 늘려 금 기운을 보충해보세요.',
    ],
    advice: wealthScore >= 4
      ? '현금 자산을 일정 비율로 분산 투자하는 포트폴리오를 구성하세요. 재물운이 좋은 지금이 기반을 다질 최적의 시기입니다.'
      : sc.비겁 >= 3
      ? '비겁이 강할 때는 단독 자산 관리 원칙을 세우세요. 돈을 빌려주거나 보증 서는 일은 반드시 피하세요.'
      : '월 수입의 20% 이상을 자동이체로 저축하는 시스템을 만들면 자연스럽게 재물이 쌓입니다.',
  };

  // ─── 5. 학업·시험운 ─────────────────────────────────────────────────────────
  const hasJeongin  = allSS.includes('정인');
  const hasPyeongin = allSS.includes('편인');
  const studyScore  = clamp(3
    + (sc.인성 >= 2 ? 1 : 0)
    + (hasJeongin ? 1 : 0)
    + (sc.비겁 >= 3 && sc.인성 === 0 ? -1 : 0)
    + (singang && sc.인성 >= 1 ? 1 : 0)
  );

  const study: DomainFortune = {
    id: 'study', emoji: '📚', title: '학업·시험운',
    score: studyScore, grade: GRADES[studyScore], colorKey: 'indigo',
    summary: studyScore >= 4
      ? '학습 집중력과 시험 운이 뛰어난 사주입니다. 노력한 만큼 결과가 나옵니다.'
      : studyScore === 3
      ? '꾸준한 노력이 성과를 만드는 사주입니다. 방법론보다 지속성이 핵심입니다.'
      : '집중력을 유지하는 것이 과제입니다. 환경과 방법을 바꿔보는 것이 효과적입니다.',
    points: [
      sc.인성 >= 2
        ? '인성(印星)이 강해 학문에 대한 욕구가 높고 집중력이 오래 지속됩니다. 시험·자격증 취득에서 좋은 결과를 낼 수 있는 구조입니다.'
        : sc.인성 === 1
        ? '인성이 하나 있어 학습 잠재력은 충분합니다. 일정한 공부 루틴을 만들면 안정적인 성과가 나옵니다.'
        : '인성이 약해 암기·장기 집중보다 경험 기반의 실전 학습이 더 효과적입니다.',
      hasJeongin
        ? '정인(正印)이 있어 귀인의 도움과 좋은 스승을 만나는 운이 있습니다. 좋은 멘토나 강사를 적극적으로 찾아보세요.'
        : hasPyeongin
        ? '편인(偏印)이 있어 독창적인 학습법이 잘 맞습니다. 남다른 시각으로 문제를 풀어가는 데 강점이 있습니다.'
        : '스스로 틀을 만들어 공부하는 독학 방식이 오히려 더 효율적일 수 있습니다.',
      sc.식상 >= 1
        ? '식상(食傷)이 있어 단순 암기보다 창의적·비판적으로 이해하는 학습이 잘 맞습니다. 글쓰기·토론·발표 형식의 공부가 기억에 잘 남습니다.'
        : '체계적인 커리큘럼을 따라가는 방식이 잘 맞습니다. 혼자 방향을 잡기보다 좋은 커리큘럼을 찾는 것이 핵심입니다.',
      ohaengCounts['수'] > 0
        ? '수(水) 기운은 지혜와 기억력을 상징합니다. 수 기운이 있어 정보를 빠르게 흡수하고 연결 짓는 능력이 뛰어납니다.'
        : '수(水) 기운이 부족해 집중력과 기억력이 약해질 수 있습니다. 파란색 노트 활용·충분한 수분 섭취·저녁 복습을 습관화해보세요.',
    ],
    advice: studyScore >= 4
      ? '현재 학습 리듬을 유지하되 시험 2주 전부터는 새 내용보다 복습에 집중하는 전략이 효과적입니다.'
      : sc.인성 === 0
      ? '짧은 집중 시간(포모도로 25분)을 반복하고, 손으로 직접 쓰는 노트 정리가 기억력 향상에 도움이 됩니다.'
      : '매일 같은 시간·같은 장소에서 공부하는 루틴을 만들면 집중력이 빠르게 올라옵니다.',
  };

  // ─── 6. 건강운 ──────────────────────────────────────────────────────────────
  const HEALTH_MAP: Record<Element, { organ: string; sym: string }> = {
    목: { organ: '간·담낭', sym: '간 기능 저하, 근육 경련, 눈 피로' },
    화: { organ: '심장·소장', sym: '혈압 불규칙, 순환계 이상, 불면증' },
    토: { organ: '위장·비장', sym: '소화 불량, 위염, 식욕 불규칙' },
    금: { organ: '폐·대장', sym: '호흡기 질환, 피부 트러블, 변비' },
    수: { organ: '신장·방광', sym: '신장 기능 저하, 부종, 생식기 건강' },
  };
  const healthScore = clamp(
    (singang ? 4 : 3) - (missingEls.length >= 2 ? 1 : 0) + (missingEls.length === 0 ? 1 : 0)
  );
  const weakOrgan = missingEls[0] ? HEALTH_MAP[missingEls[0]] : null;

  const health: DomainFortune = {
    id: 'health', emoji: '🏥', title: '건강운',
    score: healthScore, grade: GRADES[healthScore], colorKey: 'green',
    summary: healthScore >= 4
      ? `전반적으로 체력과 기운이 좋은 사주입니다.${singang ? ' 신강해 활동적인 에너지가 넘칩니다.' : ''}`
      : healthScore === 3
      ? '균형 잡힌 건강 관리가 필요한 사주입니다. 특정 장기에 주의를 기울이세요.'
      : `오행 불균형으로 ${weakOrgan ? weakOrgan.organ : '특정 장기'}에 주의가 필요합니다.`,
    points: [
      singang
        ? '신강(身强)해 타고난 체력이 강합니다. 오히려 과도한 활동이나 스트레스로 에너지를 소모하지 않도록 주의가 필요합니다.'
        : '신약(身弱)해 체력 소모가 빠릅니다. 규칙적인 수면과 영양 관리가 무엇보다 중요합니다.',
      weakOrgan
        ? `${missingEls[0]} 오행이 부족해 ${weakOrgan.organ} 건강에 주의가 필요합니다 (${weakOrgan.sym}). 정기적인 관련 건강 검진을 권장합니다.`
        : '오행 균형이 양호해 특별히 취약한 장기는 없습니다. 규칙적인 건강검진으로 현재 상태를 유지하세요.',
      missingEls.length >= 2
        ? `${missingEls.join('·')} 기운이 동시에 부족합니다. 해당 오행의 식품을 식단에 추가하고(목→채소류, 화→붉은 과일, 수→미역·콩)스트레스 관리를 최우선으로 하세요.`
        : dominantEl
        ? `${dominantEl}(${HEALTH_MAP[dominantEl as Element]?.organ ?? ''}) 기운이 과도하게 강해 해당 장기에 부담이 갈 수 있습니다. 관련 자극성 음식 과다 섭취를 줄이세요.`
        : '전반적인 건강 균형이 잘 맞는 사주입니다.',
      el === '화' || (ohaengCounts['화'] ?? 0) >= 3
        ? '화(火) 기운이 강해 열성 체질일 수 있습니다. 수분을 충분히 섭취하고 과한 카페인·매운 음식을 피하세요.'
        : el === '수' || (ohaengCounts['수'] ?? 0) >= 3
        ? '수(水) 기운이 강해 몸이 차거나 순환이 잘 안 될 수 있습니다. 따뜻한 음식을 즐기고 하체 순환 운동을 꾸준히 하세요.'
        : '균형 잡힌 식사와 규칙적인 수면이 건강을 지키는 가장 좋은 방법입니다.',
    ],
    advice: healthScore <= 2
      ? `${weakOrgan?.organ ?? '주요 장기'} 관련 정기검진(1년 1회)을 예약하고, 스트레스 지수를 낮추는 루틴(명상, 산책)을 시작하세요.`
      : singang
      ? '에너지가 넘칠 때 과로하지 않도록 주의하세요. 쉬는 것도 실력입니다.'
      : '일찍 자고 일찍 일어나는 규칙적인 수면 패턴이 신약 체질을 보완하는 최선입니다.',
  };

  // ─── 7. 대인관계·인맥운 ──────────────────────────────────────────────────────
  const socialScore = clamp(3
    + (sc.식상 >= 2 ? 1 : 0)
    + (sc.인성 >= 2 ? 1 : 0)
    + (hasPeach ? 1 : 0)
    + (sc.비겁 >= 3 ? -1 : 0)
  );

  const social: DomainFortune = {
    id: 'social', emoji: '🤝', title: '대인관계·인맥운',
    score: socialScore, grade: GRADES[socialScore], colorKey: 'teal',
    summary: socialScore >= 4
      ? '자연스럽게 인맥이 모이고 귀인의 도움을 받기 쉬운 사주입니다.'
      : socialScore === 3
      ? '선택적인 인간관계를 형성하는 사주입니다. 소수의 깊은 인맥이 힘이 됩니다.'
      : '독립적 성향이 강해 인간관계에서 에너지 소모가 크게 느껴질 수 있습니다.',
    points: [
      sc.식상 >= 2
        ? '식상(食傷)이 강해 표현력과 유머 감각이 뛰어나며 처음 만나는 사람과도 자연스럽게 친해지는 능력이 있습니다.'
        : sc.식상 === 0
        ? '식상이 약해 자신의 생각을 표현하는 것이 서툴 수 있습니다. 글쓰기나 예술 활동으로 표현 채널을 만들어보세요.'
        : '필요할 때 적절하게 자신을 표현하는 능력이 있습니다.',
      sc.인성 >= 1
        ? '인성(印星)이 있어 지성적인 매력으로 신뢰받으며, 배움의 자리에서 좋은 인연을 만나는 운이 있습니다.'
        : '인맥보다는 실력으로 인정받는 것을 더 가치 있게 여기는 성향입니다.',
      sc.비겁 >= 3
        ? '비겁이 강해 독립성을 중시하다 보면 주변과 거리가 생기기 쉽습니다. 의도적으로 교류 시간을 만들어야 인맥이 유지됩니다.'
        : sc.관성 >= 1
        ? '관성(官星)이 있어 사회적 역할·책임에서 신뢰를 쌓습니다. 직장이나 공식 자리에서의 인맥이 실질적인 도움이 됩니다.'
        : '진심을 다하는 소수의 관계가 많은 피상적 관계보다 삶에 더 큰 영향을 미칩니다.',
      hasPeach
        ? '도화(桃花) 기운이 있어 자연스러운 매력이 발산되고 처음 보는 사람도 쉽게 마음을 여는 경향이 있습니다.'
        : '신뢰를 천천히 쌓아가는 형입니다. 첫인상보다 시간이 지날수록 진가가 드러나는 매력이 있습니다.',
    ],
    advice: sc.비겁 >= 3
      ? '한 달에 한 번은 지인 모임에 참여하거나 새로운 사람을 만나는 자리를 만들어보세요. 인맥은 관리할 때 빛납니다.'
      : socialScore >= 4
      ? '자연스럽게 모이는 인연을 소중히 관리하세요. 먼저 연락하고 챙기는 작은 습관이 인맥을 넓힙니다.'
      : '공통 관심사를 가진 커뮤니티(스터디, 동호회)에 참여하면 자연스럽게 질 좋은 인맥이 형성됩니다.',
  };

  // ─── 8. 사업·창업운 ─────────────────────────────────────────────────────────
  const bizScore = clamp(3
    + (singang && sc.재성 >= 1 ? 1 : 0)
    + (sc.식상 >= 1 && sc.재성 >= 1 ? 1 : 0)
    + (!singang && sc.관성 >= 2 ? -1 : 0)
    + (sc.비겁 >= 3 && sc.재성 === 0 ? -1 : 0)
  );

  const business: DomainFortune = {
    id: 'business', emoji: '🚀', title: '사업·창업운',
    score: bizScore, grade: GRADES[bizScore], colorKey: 'violet',
    summary: bizScore >= 4
      ? '사업 에너지와 재물을 만드는 구조가 갖춰진 사주입니다. 창업·독립에 유리합니다.'
      : bizScore === 3
      ? '사업 잠재력은 있으나 타이밍과 아이템 선정이 성패를 가릅니다.'
      : '안정적인 직장 생활이 더 잘 맞는 사주입니다. 사업은 철저한 준비 후 부업으로 시작하세요.',
    points: [
      singang
        ? '신강(身强)해 강한 추진력과 자기 결정권이 있어 사업 환경에서 강점을 발휘합니다.'
        : '신약(身弱)한 사주는 사업보다는 파트너십이나 프리랜서 방식이 더 안전합니다. 역할을 분담하는 구조를 만드세요.',
      sc.재성 >= 1
        ? (hasPyeongjae ? '편재(偏財)가 있어 투자·유통·서비스업 등 큰 흐름을 타는 사업에 강합니다.' : '정재(正財)가 있어 꾸준히 수익을 만드는 안정형 사업이 잘 맞습니다.')
        : '재성이 없으면 직접 재물을 만들기보다 전문 기술을 파는 구조(컨설팅·강의·전문직)가 더 수익성이 높습니다.',
      sc.식상 >= 1 && sc.재성 >= 1
        ? '식신생재(食神生財) 구조가 있어 재능이 직접 수익으로 연결되는 이상적인 사업 구조입니다. 자신의 전문성을 상품화하세요.'
        : sc.관성 >= 2
        ? '관성이 강해 규범과 법규를 중시하는 사업 방식이 맞습니다. 합법적이고 체계적인 사업 모델이 장기 생존력이 높습니다.'
        : '사업 아이디어를 실행하기 전 소규모 테스트(MVP)를 충분히 거치는 것이 리스크를 줄이는 핵심입니다.',
      `${dayStem.hanja}(${dayStem.kor}) 일간은 ${dayStem.aptitude} 분야에서 자연스러운 사업 아이템을 발굴할 수 있습니다.`,
    ],
    advice: bizScore >= 4
      ? '사업 계획이 있다면 소규모로 먼저 테스트해보세요. 현재 사주 구조는 행동할 때 더 유리합니다.'
      : bizScore <= 2
      ? '현재 직업에서 전문성을 극대화하세요. 사업은 안정적인 수입원을 확보한 뒤 부업으로 시작하는 것이 안전합니다.'
      : '사업을 준비한다면 6개월 이상의 운영 자금을 확보한 상태에서 시작하는 것이 가장 중요합니다.',
  };

  // ─── 9. 이직·변화운 ─────────────────────────────────────────────────────────
  const changeScore = clamp(3
    + (hasYongma ? 1 : 0)
    + (singang ? 1 : 0)
    + (sc.비겁 >= 2 ? 1 : 0)
    + (sc.관성 >= 3 ? -1 : 0)
  );

  const change: DomainFortune = {
    id: 'change', emoji: '🔄', title: '이직·변화운',
    score: changeScore, grade: GRADES[changeScore], colorKey: 'orange',
    summary: changeScore >= 4
      ? '변화와 이동에 강한 사주입니다. 새로운 환경이 오히려 기회가 됩니다.'
      : changeScore === 3
      ? '이직·변화는 충분한 준비 후 타이밍을 잡아야 하는 사주입니다.'
      : '안정된 환경에서 성과를 내는 사주입니다. 잦은 변화는 오히려 독이 될 수 있습니다.',
    points: [
      hasYongma
        ? '역마살(驛馬殺) 기운이 있어 이동·이직·해외 관련 활동에서 오히려 운이 열리는 구조입니다. 머물기보다 움직일 때 기회가 옵니다.'
        : '역마 기운이 없어 이동보다는 한 곳에 집중하는 것이 더 안정적입니다.',
      singang
        ? '신강해 변화를 두려워하지 않고 새로운 환경에서도 빠르게 적응합니다. 이직 후 6개월이면 주도권을 잡는 경우가 많습니다.'
        : '신약해 환경의 영향을 크게 받습니다. 이직 전 새 직장에 대한 충분한 정보 수집과 재정 안전망 확보가 필수입니다.',
      sc.비겁 >= 2
        ? '비겁(比劫)이 강해 독립적으로 일하고 싶은 욕구가 높습니다. 이직 목표를 단순 회사 변경이 아닌 커리어 방향 전환으로 잡으면 더 큰 성취가 옵니다.'
        : sc.관성 >= 3
        ? '관성이 매우 강해 조직 안에서의 안정성을 중시합니다. 이직보다는 현재 조직 내 부서 이동이나 포지션 변경을 먼저 검토하세요.'
        : '이직을 고려한다면 현재 대운과 세운을 함께 확인하는 것이 중요합니다. 대운이 유리한 시기에 움직이면 성공 확률이 높아집니다.',
      `이직 적합 분야: ${dayStem.aptitude}. 기존 커리어와 연관성이 높을수록 이직 후 적응 속도가 빠릅니다.`,
    ],
    advice: changeScore >= 4
      ? '이직을 결심했다면 6개월치 생활비를 확보한 상태에서 움직이세요. 조급함이 최대의 적입니다.'
      : changeScore <= 2
      ? '현재 위치에서 전문성을 더 쌓는 것이 우선입니다. 이직은 최소 3년치 경력이 쌓인 후 고려하세요.'
      : '이직 전 반드시 새 직장의 문화·성장성·직속 상사를 충분히 파악하고 결정하세요.',
  };

  // ─── 10. 미래 총운 ────────────────────────────────────────────────────────────
  const FUTURE_TXT: Record<Element, [string, string]> = {
    목: [
      '목(木) 일간이 신강하면 계획했던 성장이 실현되는 시기가 옵니다. 새로운 분야에 뛰어들거나 기반을 넓히는 결정이 장기적으로 유리합니다.',
      '목(木) 일간이 신약하면 서두르기보다 기초를 단단히 하는 시기가 필요합니다. 수(水)와 화(火) 기운의 지원이 도움이 됩니다.',
    ],
    화: [
      '화(火) 일간이 신강하면 주목받는 위치에 자연스럽게 오르게 됩니다. 커리어·창작·사회적 인지도에서 상승세가 이어집니다.',
      '화(火) 일간이 신약하면 표현하고 싶은 욕구에 비해 에너지가 따라주지 않을 수 있습니다. 목(木) 기운의 지지를 받는 협력 관계를 만들어보세요.',
    ],
    토: [
      '토(土) 일간이 신강하면 오랜 노력이 결실을 맺는 시기가 옵니다. 부동산·재산 관리에서 유리한 결정을 내릴 수 있습니다.',
      '토(土) 일간이 신약하면 자신의 영역을 명확히 정하는 것이 중요합니다. 주변의 압박에 흔들리지 않는 내면의 힘을 키워보세요.',
    ],
    금: [
      '금(金) 일간이 신강하면 결단력이 강해지고 경쟁 상황에서도 원칙을 지키며 앞서나갑니다. 어떤 환경에서도 냉정하게 판단하는 힘이 있습니다.',
      '금(金) 일간이 신약하면 지나친 완벽주의가 스스로를 지치게 만들 수 있습니다. 유연성을 기르고 80%의 완성도에서 멈추는 연습이 필요합니다.',
    ],
    수: [
      '수(水) 일간이 신강하면 통찰력이 극대화됩니다. 흐름을 읽고 먼저 움직이는 능력으로 중요한 결정에서 유리한 위치를 차지합니다.',
      '수(水) 일간이 신약하면 생각이 많아 결정이 느려질 수 있습니다. 토(土) 기운으로 방향을 잡거나 행동에 집중하는 것이 도움이 됩니다.',
    ],
  };

  const futureScore = clamp(
    (singang ? 4 : 3)
    + (sc.관성 >= 1 ? 0 : sc.재성 >= 1 ? 0 : sc.식상 >= 1 ? 0 : -1)
    - (missingEls.length >= 3 ? 1 : 0)
  );

  const future: DomainFortune = {
    id: 'future', emoji: '🔮', title: '미래 총운',
    score: futureScore, grade: GRADES[futureScore], colorKey: 'purple',
    summary: futureScore >= 4
      ? `${elName} 일간의 기운이 충실하게 발현되는 삶의 흐름을 갖고 있습니다.`
      : `${elName} 일간으로 ${singang ? '강한 에너지를 올바른 방향으로 집중하는 것' : '기반을 단단히 쌓아 나가는 것'}이 미래의 핵심입니다.`,
    points: [
      singang ? FUTURE_TXT[el][0] : FUTURE_TXT[el][1],
      sc.관성 >= 1
        ? '관성이 있어 사회적 인정과 성취를 통해 미래가 열립니다. 커리어와 명예를 소중히 여기는 삶의 방향이 맞습니다.'
        : sc.재성 >= 1
        ? '재성이 있어 경제적 성취가 삶의 만족도를 높이는 중요한 요소입니다. 재물을 통한 자유와 안정을 목표로 방향을 설정하세요.'
        : sc.식상 >= 1
        ? '식상이 강해 재능과 창의성을 펼치는 삶이 미래의 행복과 직결됩니다. 좋아하는 것으로 살아갈 방법을 찾아보세요.'
        : '비겁이 강한 사주는 결국 독립적인 길을 통해 자신만의 영역을 구축하게 됩니다.',
      '대운(大運)은 10년 단위로 삶의 큰 흐름을 바꿉니다. 현재 대운의 기운을 최대한 활용하는 것이 미래 설계의 출발점입니다.',
      `${dayStem.kor}(${dayStem.hanja}) 일간의 핵심 강점: ${dayStem.personality.slice(0, 60)}...`,
    ],
    advice: '연간 목표를 세울 때 사주의 강점 분야에 에너지를 집중하면 성과가 빠릅니다. 약점 분야는 보완보다 위임으로 극복하는 전략이 효율적입니다.',
  };

  return [love, marriage, career, wealth, study, health, social, business, change, future];
}
