/**
 * 월별 탄생석·탄생화 데이터.
 *
 * 널리 통용되는 월별 탄생석(현대 표준)과 대표 탄생화를 담았다. 실제 전해지는
 * 정보라 지어낸 예측이 아니며, 성격 문구(blurb)만 재미로 보는 참고용이다.
 */
export interface BirthInfo {
  month: number;
  stone: string;
  stoneEn: string;
  emoji: string;
  color: string;       // 대표 색(스와치용 hex)
  stoneMeaning: string;
  flower: string;
  flowerMeaning: string;
  blurb: string;       // 이 달에 태어난 사람 — 재미로 보는 성향
}

const BIRTH_INFO: BirthInfo[] = [
  {
    month: 1, stone: '가넷', stoneEn: 'Garnet', emoji: '❤️', color: '#9b1b30',
    stoneMeaning: '진실·우정·변치 않는 마음',
    flower: '카네이션', flowerMeaning: '사랑과 매력',
    blurb: '한결같고 믿음직한 사람이 많아요. 한번 마음을 준 관계에 끝까지 진심을 다하는 의리파예요.',
  },
  {
    month: 2, stone: '자수정', stoneEn: 'Amethyst', emoji: '🟣', color: '#8b5cf6',
    stoneMeaning: '평화·성실·마음의 안정',
    flower: '프리지아', flowerMeaning: '순결과 천진난만',
    blurb: '차분하면서도 속이 깊은 편이에요. 겉으로 요란하지 않아도 자기 세계가 단단한 사람이 많아요.',
  },
  {
    month: 3, stone: '아쿠아마린', stoneEn: 'Aquamarine', emoji: '🩵', color: '#7fd4d4',
    stoneMeaning: '젊음·행복·용기',
    flower: '수선화', flowerMeaning: '자존심과 신비로움',
    blurb: '맑고 자유로운 기운을 지녔어요. 어디서든 분위기를 산뜻하게 만드는 힘이 있는 사람이 많아요.',
  },
  {
    month: 4, stone: '다이아몬드', stoneEn: 'Diamond', emoji: '💎', color: '#b9f2ff',
    stoneMeaning: '영원·순수·강인함',
    flower: '데이지', flowerMeaning: '순수와 희망',
    blurb: '단단한 심지를 지닌 사람이 많아요. 겉은 부드러워도 결정적인 순간엔 흔들리지 않는 강함이 있어요.',
  },
  {
    month: 5, stone: '에메랄드', stoneEn: 'Emerald', emoji: '💚', color: '#2ecc71',
    stoneMeaning: '행복·사랑·희망',
    flower: '은방울꽃', flowerMeaning: '행복이 돌아옴',
    blurb: '따뜻하고 생기 있는 사람이 많아요. 곁에 있으면 마음이 편안해지는 다정한 에너지를 지녔어요.',
  },
  {
    month: 6, stone: '진주', stoneEn: 'Pearl', emoji: '🤍', color: '#f4f0e6',
    stoneMeaning: '건강·장수·순결',
    flower: '장미', flowerMeaning: '사랑과 열정',
    blurb: '은은하지만 존재감이 확실한 사람이 많아요. 부드러운 겉모습 안에 우아한 자부심을 품고 있어요.',
  },
  {
    month: 7, stone: '루비', stoneEn: 'Ruby', emoji: '❤️‍🔥', color: '#e0115f',
    stoneMeaning: '열정·용기·사랑',
    flower: '백합', flowerMeaning: '순결과 위엄',
    blurb: '뜨거운 열정을 지닌 사람이 많아요. 좋아하는 일에 몰입하는 에너지가 주변까지 물들여요.',
  },
  {
    month: 8, stone: '페리도트', stoneEn: 'Peridot', emoji: '🫒', color: '#9bbb59',
    stoneMeaning: '부부의 행복·평화',
    flower: '해바라기', flowerMeaning: '동경과 숭배',
    blurb: '밝고 긍정적인 사람이 많아요. 해바라기처럼 좋은 쪽을 바라보며 주변을 환하게 하는 힘이 있어요.',
  },
  {
    month: 9, stone: '사파이어', stoneEn: 'Sapphire', emoji: '🔷', color: '#0f52ba',
    stoneMeaning: '성실·진실·지혜',
    flower: '과꽃(아스터)', flowerMeaning: '추억과 믿음',
    blurb: '진중하고 신뢰감 있는 사람이 많아요. 말보다 행동으로 증명하는, 깊이 있는 매력을 지녔어요.',
  },
  {
    month: 10, stone: '오팔', stoneEn: 'Opal', emoji: '🌈', color: '#a8c3bc',
    stoneMeaning: '희망·순수·창의',
    flower: '코스모스', flowerMeaning: '순정과 조화',
    blurb: '감각과 개성이 남다른 사람이 많아요. 오팔처럼 보는 각도마다 다른 매력이 반짝이는 다채로운 사람이에요.',
  },
  {
    month: 11, stone: '토파즈', stoneEn: 'Topaz', emoji: '🟡', color: '#ffc87c',
    stoneMeaning: '우정·인내·희망',
    flower: '국화', flowerMeaning: '고결과 진실',
    blurb: '따뜻하면서 끈기 있는 사람이 많아요. 서두르지 않고 자기 길을 꾸준히 걸어 결국 이뤄내는 편이에요.',
  },
  {
    month: 12, stone: '터키석', stoneEn: 'Turquoise', emoji: '🩵', color: '#30d5c8',
    stoneMeaning: '성공·번영·행운',
    flower: '포인세티아', flowerMeaning: '축복과 축하',
    blurb: '밝고 복을 부르는 기운을 지닌 사람이 많아요. 사람들과 잘 어울리며 좋은 인연을 끌어당기는 매력이 있어요.',
  },
];

export default BIRTH_INFO;
export { BIRTH_INFO };

export function getBirthInfo(month: number): BirthInfo | null {
  return BIRTH_INFO.find(b => b.month === month) ?? null;
}
