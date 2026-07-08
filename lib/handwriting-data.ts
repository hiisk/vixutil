/**
 * 손글씨 심리 테스트 — 업로드한 손글씨 사진에서 실제 획의 평균 기울기와
 * 필압(잉크 진하기)을 측정한다. 기울기는 지문 인식에도 쓰이는 구조텐서
 * (structure tensor) 방식으로 이미지의 그라디언트 방향을 분석해 구하며,
 * 합성 각도 데이터로 공식이 실제 각도를 정확히 복원하는 것을 확인했다.
 * 여기에 붙는 성격 해석은 필적학(그래폴로지)에 근거한 오락 콘텐츠다.
 */

import { hashString, mix32, pick, pickByRatio, toPercent } from './ratio-pick';

export const SLANT_POOL: string[] = [
  '왼쪽으로 뚜렷하게 기운 필체입니다. 감정을 겉으로 잘 드러내지 않고, 행동보다 생각을 먼저 정리하는 신중한 성향을 나타낸다고 봅니다.',
  '왼쪽으로 살짝 기운 필체입니다. 즉흥적으로 움직이기보다 한 발 물러나 상황을 살피는 차분한 성향으로 해석됩니다.',
  '왼쪽으로 은은하게 기운 필체입니다. 내면의 생각이 많고, 결정을 내리기 전 여러 번 곱씹어보는 신중한 타입입니다.',
  '수직에 가까운 살짝 왼쪽 성향의 필체입니다. 감정과 이성의 균형을 중시하며, 침착하게 상황을 판단하는 편으로 여겨집니다.',
  '거의 수직으로 곧게 선 필체입니다. 감정에 치우치지 않고 이성적으로 판단하는 균형 잡힌 성향을 상징한다고 봅니다.',
  '수직에 가까운 살짝 오른쪽 성향의 필체입니다. 필요할 때는 감정을 자연스럽게 표현할 줄 아는 균형 잡힌 타입입니다.',
  '오른쪽으로 은은하게 기운 필체입니다. 생각한 것을 행동으로 옮기는 데 거침이 없고, 사람들과의 교류를 즐기는 성향으로 해석됩니다.',
  '오른쪽으로 살짝 기운 필체입니다. 감정 표현이 솔직하고, 새로운 사람과의 만남을 어려워하지 않는 편으로 여겨집니다.',
  '오른쪽으로 뚜렷하게 기운 필체입니다. 열정적이고 적극적인 성향을 상징하며, 하고 싶은 말은 바로바로 표현하는 타입으로 해석됩니다.',
  '오른쪽으로 크게 기운 필체입니다. 감정 표현이 풍부하고 사교적이며, 생각이 든 순간 바로 행동으로 옮기는 추진력이 있다고 봅니다.',
];

export const PRESSURE_POOL: string[] = [
  '매우 연한 필압입니다. 섬세하고 차분한 성향으로, 감정을 절제하며 신중하게 표현하는 타입으로 해석됩니다.',
  '연한 필압입니다. 부드럽고 조심스러운 성향으로, 남에게 부담을 주지 않으려는 배려심이 묻어난다고 봅니다.',
  '은은한 필압입니다. 침착하고 차분한 에너지를 지닌 타입으로, 감정 기복이 적은 편으로 여겨집니다.',
  '적당한 필압입니다. 안정적이고 균형 잡힌 성향으로, 상황에 맞게 유연하게 대처하는 타입으로 해석됩니다.',
  '또렷한 필압입니다. 자기 생각이 뚜렷하고 확신을 가지고 행동하는 성향을 나타낸다고 봅니다.',
  '진한 필압입니다. 에너지가 넘치고 열정적인 성향으로, 하고자 하는 일에 강한 추진력을 보이는 타입입니다.',
  '매우 진한 필압입니다. 감정 표현이 강렬하고 존재감이 뚜렷한 성향으로 해석됩니다.',
  '힘있게 눌러쓴 필압입니다. 강한 의지와 집중력을 상징하며, 한번 마음먹은 일은 끝까지 밀어붙이는 타입으로 여겨집니다.',
];

export const TIP_POOL: string[] = [
  '오늘은 하고 싶은 말을 글로 먼저 정리해보면 생각이 훨씬 명확해질 거예요.',
  '오늘은 손편지나 메모 한 줄이 마음을 전하는 데 큰 힘이 될 수 있어요.',
  '오늘은 평소보다 감정 표현을 조금 더 솔직하게 해봐도 좋은 날입니다.',
  '오늘은 다이어리나 메모장에 하루를 짧게 기록해보는 것도 좋은 습관이 될 수 있어요.',
  '오늘은 중요한 이야기를 말보다 글로 먼저 전달해보는 것도 방법이에요.',
  '오늘은 필체를 조금 바꿔 써보는 것도 기분 전환에 도움이 될 수 있어요.',
  '오늘은 생각나는 대로 자유롭게 끄적여보는 낙서도 스트레스 해소에 좋아요.',
  '오늘은 누군가에게 짧은 감사 메시지를 손글씨로 남겨보는 건 어떨까요.',
  '오늘은 목표를 손으로 직접 적어보면 실행력이 높아진다는 이야기가 있어요.',
  '오늘은 평소 쓰던 필기구를 바꿔보는 것도 새로운 기분을 줄 수 있어요.',
];

export interface HandwritingResult {
  slantPercent: number;
  slantDeg: number;
  slantText: string;
  pressurePercent: number;
  pressureText: string;
  tip: string;
}

/**
 * slantRatio(0~1, 0.5가 수직)와 pressureRatio(0~1, 필압)로 결과를 만든다.
 * slantDeg(-35~35, 실제 측정 각도)도 그대로 노출해 UI에서 숫자로 보여줄 수 있게 한다.
 */
export function getHandwritingResult(slantRatio: number, pressureRatio: number): HandwritingResult {
  const slantText = pickByRatio(SLANT_POOL, slantRatio);
  const pressureText = pickByRatio(PRESSURE_POOL, pressureRatio);

  const seed = mix32(Math.floor(slantRatio * 99991 + pressureRatio * 15485863) >>> 0);
  const today = new Date();
  const ymd = `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}`;
  const tipSeed = (hashString(ymd) ^ seed) >>> 0;
  const tip = pick(TIP_POOL, tipSeed);

  return {
    slantPercent: toPercent(slantRatio),
    slantDeg: Math.round((slantRatio - 0.5) * 70),
    slantText,
    pressurePercent: toPercent(pressureRatio),
    pressureText,
    tip,
  };
}
