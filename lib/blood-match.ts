/**
 * 혈액형 궁합 — 재미로 보는 궁합.
 *
 * 혈액형과 성격·궁합 사이엔 과학적 근거가 없다(이 사이트의 혈액형 운세 페이지에서도
 * 바넘 효과의 예로 다룬다). 그래서 이 궁합은 "맞다/틀리다"가 아니라 오락으로만 쓴다.
 * 다만 계산은 결정론적이라 같은 조합은 늘 같은 결과가 나오고, 그 점을 페이지에서 밝힌다.
 *
 * 점수·해석은 대중적으로 회자되는 혈액형 성격론(A 섬세·B 자유·O 대범·AB 독특)을
 * 조합한 것으로, 어느 것도 사실 주장이 아니다.
 */

export type BloodType = 'A' | 'B' | 'O' | 'AB';
export const BLOOD_TYPES: { id: BloodType; name: string; emoji: string; trait: string }[] = [
  { id: 'A',  name: 'A형',  emoji: '🅰️', trait: '섬세·배려' },
  { id: 'B',  name: 'B형',  emoji: '🅱️', trait: '자유·개성' },
  { id: 'O',  name: 'O형',  emoji: '⭕',  trait: '대범·사교' },
  { id: 'AB', name: 'AB형', emoji: '🆎',  trait: '이성·독창' },
];

interface PairData {
  score: number;
  label: string;
  emoji: string;
  headline: string;
  reason: string;
  love: string;
  advice: string;
}

/** 두 혈액형을 정해진 순서(A<B<O<AB)로 통일해 키를 만든다. 궁합은 대칭이다.
 *  문자열 정렬은 'AB'를 'B' 앞에 놓아 키가 어긋나므로 타입 순서를 직접 쓴다. */
const ORDER: Record<BloodType, number> = { A: 0, B: 1, O: 2, AB: 3 };
function key(a: BloodType, b: BloodType): string {
  return ORDER[a] <= ORDER[b] ? `${a}-${b}` : `${b}-${a}`;
}

const PAIRS: Record<string, PairData> = {
  'A-A': {
    score: 78, label: '차분한 안정 궁합', emoji: '🤝', headline: '서로를 잘 이해하는 편안한 사이',
    reason: '둘 다 섬세하고 배려심이 많아 서로의 기분을 잘 읽어요. 큰 갈등 없이 잔잔하게 흘러갑니다.',
    love: '조심스럽지만 깊어지는 연애를 해요. 표현을 아끼지 않으면 오래갑니다.',
    advice: '둘 다 속으로 삭이는 편이라, 서운한 건 쌓아두지 말고 그때그때 말해보세요.',
  },
  'A-B': {
    score: 71, label: '끌리는 정반대 궁합', emoji: '⚡', headline: '다른 매력에 서로 끌리는 사이',
    reason: '섬세한 A와 자유로운 B는 성향이 꽤 달라요. 그 차이가 처음엔 신선한 끌림이 됩니다.',
    love: '한쪽의 계획성과 다른 쪽의 즉흥성이 만나 지루할 틈이 없어요.',
    advice: 'B의 자유를 A가 불안해하지 않고, A의 세심함을 B가 잔소리로 여기지 않는 게 핵심이에요.',
  },
  'A-O': {
    score: 85, label: '든든한 찰떡 궁합', emoji: '💛', headline: '대범한 O가 섬세한 A를 품는 사이',
    reason: '너그러운 O가 세심한 A를 편안하게 감싸줘요. 서로의 부족한 부분을 잘 채우는 조합입니다.',
    love: 'O의 리드와 A의 배려가 어우러져 안정적인 연애로 이어지기 좋아요.',
    advice: 'O는 A의 섬세한 신호를 흘려듣지 않고, A는 O를 믿고 조금 더 기대도 좋아요.',
  },
  'A-AB': {
    score: 74, label: '통하는 감성 궁합', emoji: '🙂', headline: '섬세함끼리 은근히 통하는 사이',
    reason: '둘 다 예민하고 감성적인 면이 있어 서로의 깊은 마음을 알아줍니다.',
    love: '말없이도 통하는 순간이 많은 잔잔한 연애예요.',
    advice: 'AB의 종잡을 수 없는 면을 A가 너무 분석하지 않는 게 편해요.',
  },
  'B-B': {
    score: 76, label: '자유로운 영혼 궁합', emoji: '🤸', headline: '서로의 자유를 존중하는 사이',
    reason: '둘 다 개성이 뚜렷하고 얽매이는 걸 싫어해요. 각자의 세계를 인정하면 편안합니다.',
    love: '간섭 없이 각자 즐기면서도 함께하는 쿨한 연애를 해요.',
    advice: '자유를 즐기되, 무관심으로 흐르지 않게 표현은 챙기세요.',
  },
  'B-O': {
    score: 82, label: '활기찬 에너지 궁합', emoji: '🔥', headline: '함께 있으면 신나는 사이',
    reason: '자유로운 B와 사교적인 O가 만나 분위기가 늘 활기차요. 잘 놀고 잘 통하는 조합입니다.',
    love: '활동적인 데이트를 즐기는 에너지 넘치는 커플이 됩니다.',
    advice: '둘 다 추진력이 강해 부딪힐 때가 있어요. 한 발씩 양보하면 최고의 파트너예요.',
  },
  'B-AB': {
    score: 80, label: '톡톡 튀는 궁합', emoji: '✨', headline: '지루할 틈 없는 개성파 사이',
    reason: '자유로운 B와 독창적인 AB가 만나면 발상이 통통 튀어요. 서로의 개성을 재밌어합니다.',
    love: '남들과 다른 우리만의 방식으로 즐기는 독특한 연애예요.',
    advice: '둘 다 변덕이 있을 수 있으니, 중요한 약속은 분명히 정해두면 좋아요.',
  },
  'O-O': {
    score: 79, label: '시원시원 궁합', emoji: '😎', headline: '솔직하고 화끈한 사이',
    reason: '둘 다 대범하고 솔직해 뒤끝이 없어요. 할 말은 하고 금방 푸는 시원한 조합입니다.',
    love: '표현이 직설적이라 오해가 적고, 화끈하게 사랑하는 연애예요.',
    advice: '둘 다 지기 싫어할 수 있어요. 자존심 싸움만 조심하면 든든한 커플이에요.',
  },
  'O-AB': {
    score: 83, label: '보완하는 궁합', emoji: '💛', headline: '대범함과 이성이 어우러지는 사이',
    reason: '사교적인 O와 이성적인 AB가 서로의 빈 곳을 채워요. 균형이 잘 잡히는 조합입니다.',
    love: 'O의 따뜻함과 AB의 냉철함이 만나 안정과 자극을 함께 주는 연애예요.',
    advice: 'AB의 거리 두는 면을 O가 서운해하지 않으면 오래갑니다.',
  },
  'AB-AB': {
    score: 77, label: '독특하게 통하는 궁합', emoji: '🎭', headline: '남다른 둘이 서로를 알아보는 사이',
    reason: '둘 다 개성 있고 예측 불가라, 남들은 어려워해도 서로는 잘 통해요.',
    love: '우리만 아는 코드로 통하는, 특별한 연애를 합니다.',
    advice: '둘 다 감정 기복이 있을 수 있으니, 솔직한 대화로 오해를 자주 풀어주세요.',
  },
};

export interface BloodMatchResult extends PairData {
  a: BloodType;
  b: BloodType;
}

export function calcBloodMatch(a: BloodType, b: BloodType): BloodMatchResult {
  const data = PAIRS[key(a, b)];
  return { a, b, ...data };
}
