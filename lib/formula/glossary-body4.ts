/**
 * 몸 섹션 넷째 묶음 용어의 뜻풀이(3언어).
 *
 * 라벨만 보면 어디서 재는 값인지 모르는 것들이 많다 — '운동 전 체중'은 옷을
 * 벗고 화장실에 다녀온 뒤의 무게이고, '끝 심박'은 걷기를 멈춘 그 순간의 값이다.
 * 재는 법이 곧 그 숫자의 정확도이므로 여기에 한 줄로 적어 둔다.
 */
import type { Term } from './terms.ts';

export const BODY4_DESC: Record<string, Term> = {
  /* 임신 중 체중 증가 */
  preBmi: { ko: '임신 전 체중으로 계산한 BMI. 권장 증가 구간을 이 값이 정합니다.', en: 'BMI from your weight before pregnancy — it selects which gain range applies.' },
  gestWeek: { ko: '마지막 생리 첫날부터 센 지금의 주수. 만삭은 40주입니다.', en: 'Weeks counted from the first day of your last period; term is 40 weeks.' },
  gainNow: { ko: '이번 주까지 늘어 있으리라 보는 무게의 가운데 값.', en: 'The midpoint of the gain expected to have accumulated by this week.' },
  gainNowLow: { ko: '이번 주 기준 권장 범위의 아래끝. 이보다 적어도 곧 이상은 아닙니다.', en: 'The lower end of this week’s range; below it is not automatically a problem.' },
  gainNowHigh: { ko: '이번 주 기준 권장 범위의 위끝.', en: 'The upper end of the range for this week.' },
  gainTotalLow: { ko: '만삭까지 늘어날 무게의 권장 하한.', en: 'The recommended minimum total gain by full term.' },
  gainTotalHigh: { ko: '만삭까지 늘어날 무게의 권장 상한.', en: 'The recommended maximum total gain by full term.' },

  /* 체수분 */
  tbw: { ko: '몸 안의 물을 모두 합한 부피. 세포 안과 밖의 물을 함께 셉니다.', en: 'All the water in the body, inside and outside the cells, added together.' },
  tbwPct: { ko: '그 물이 체중에서 차지하는 비율. 지방이 많으면 낮아집니다.', en: 'That water as a share of body weight; more fat pushes it down.' },

  /* 대사 나이 */
  metaAge: { ko: '내 기초대사량과 같은 평균값을 가지는 나이. 소비자 저울의 개념입니다.', en: 'The age whose average BMR matches yours — a consumer-scale idea, not a clinical one.' },

  /* 걸음 → 거리 */
  distanceMi: { ko: '같은 거리를 마일로 바꾼 값. 1마일은 1.609km입니다.', en: 'The same distance in miles; one mile is 1.609 km.' },
  strideEst: { ko: '보폭을 모를 때 키의 0.415배로 어림한 값.', en: 'A stand-in stride when you have not measured one: 0.415 times height.' },
  stepsPerKm: { ko: '그 보폭으로 1km를 걸을 때 드는 걸음 수.', en: 'How many steps of that length make up one kilometre.' },

  /* 록포트 걷기 검사 */
  mileWalkMin: { ko: '1마일(1.609km)을 가장 빠르게 걸어 나온 기록. 뛰면 안 됩니다.', en: 'Your time walking one mile (1.609 km) as fast as you can — walking, not running.' },

  /* 허리둘레 기준선 */
  waistLimit: { ko: '지금 값에 대해 다음으로 만나는 성별 기준선.', en: 'The next sex-specific line your measurement runs into.' },
  toThreshold: { ko: '그 기준선까지 남은(또는 넘은) 양. 방향은 판정 문장에 있습니다.', en: 'How far you sit from that line; the verdict says which side you are on.' },

  /* 땀으로 잃은 체중 비율 */
  weightPreEx: { ko: '운동 직전, 화장실에 다녀와 가벼운 옷차림으로 잰 체중.', en: 'Weight taken just before you start, after the toilet and in light clothing.' },
  weightPostEx: { ko: '운동 직후 땀을 닦고 같은 옷차림으로 다시 잰 체중.', en: 'Weight taken right after, towelled dry and in the same clothing.' },
  bodyLossPct: { ko: '운동 동안 줄어든 체중이 처음 체중에서 차지하는 비율.', en: 'The weight lost during the session as a share of your starting weight.' },
  sweatTotalMl: { ko: '줄어든 무게에 마신 양을 더한, 실제로 흘린 땀의 양.', en: 'Weight lost plus what you drank — the sweat you actually produced.' },
  rehydrateMl: { ko: '줄어든 무게를 되돌리기 위해 몇 시간에 걸쳐 마실 양.', en: 'What to drink over the next few hours to make the lost weight back.' },

  /* 악력 */
  gripKg: { ko: '악력계를 최대로 쥐어 나온 값. 좋은 쪽 손의 최고 기록을 씁니다.', en: 'Your best squeeze on a hand dynamometer, taking the stronger hand.' },
  gripRatio: { ko: '악력을 체중으로 나눈 값. 몸집 차이를 덜어 내고 봅니다.', en: 'Grip divided by body weight, which takes body size out of the comparison.' },
};
