/**
 * 공예 확장분 용어의 뜻풀이(ko·en).
 *
 * 이 열여섯 도구는 "어디를 재는가"에서 답이 갈린다. 몰드 부피를 겉치수로 재거나,
 * SAP을 오일 무게로 착각하거나, 돔 높이를 조각 두께로 넣거나, 봉투 길이를 봉함부
 * 포함으로 재는 식이다. 그래서 라벨을 다시 풀어 쓰지 않고 재는 자리와 재는 방법을
 * 적는다 — 물을 채워 재라, 열 칸을 재서 나눠라, 눌린 상태로 재라처럼.
 */
import type { Term } from './terms.ts';

export const CRAFT4_DESC: Record<string, Term> = {
  /* 비누 — 여러 오일 */
  oil1Wt: { ko: '첫 번째 오일의 무게. 물과 가성소다는 빼고 오일만 답니다.', en: 'Weight of the first oil alone, excluding water and lye.' },
  oil1Sap: { ko: '그 오일의 SAP 값. 오일 1g당 KOH의 mg이며 공급처 자료값을 씁니다.', en: 'That oil\'s SAP — milligrams of KOH per gram, taken from its own data sheet.' },
  oil2Wt: { ko: '두 번째 오일의 무게. 쓰지 않으면 0으로 둡니다.', en: 'Weight of the second oil; leave it at zero if unused.' },
  oil2Sap: { ko: '두 번째 오일의 SAP 값. 코코넛은 258, 팜은 199 안팎입니다.', en: 'The second oil\'s SAP value — coconut near 258, palm near 199.' },
  oil3Wt: { ko: '세 번째 오일의 무게. 캐스터처럼 소량만 넣는 오일 자리입니다.', en: 'Weight of the third oil — the slot for small additions such as castor.' },
  oil3Sap: { ko: '세 번째 오일의 SAP 값. 캐스터는 180, 시어버터는 128 안팎입니다.', en: 'The third oil\'s SAP value — castor near 180, shea butter near 128.' },
  blendSap: { ko: '배합 전체의 SAP 값. 무게로 가중한 평균이라 오일 하나만 바꿔도 움직입니다.', en: 'The blend\'s SAP, weighted by oil weight — it moves if any one oil changes.' },

  /* 비누 — 물·몰드·건조 */
  waterDiscount: { ko: '기준 물 양에서 덜어 내는 비율. 가성소다 무게는 건드리지 않습니다.', en: 'How much you cut from the full water; the lye weight never changes.' },
  lyeSolution: { ko: '물과 가성소다를 합친 무게. 오일에 붓는 액체의 총량입니다.', en: 'Water plus lye together — the total liquid you pour into the oils.' },
  batterDensity: { ko: '반죽 1㎤의 무게. 부어 본 몰드가 있으면 반죽 무게 ÷ 몰드 부피로 구합니다.', en: 'Grams per cm³ of batter; from a poured mould it is batter weight ÷ mould volume.' },
  lyePctOfOil: { ko: '오일 무게에 대한 가성소다의 비율. 배합이 정해지면 소다 ÷ 오일로 구합니다.', en: 'Lye as a percentage of the oil weight — lye ÷ oil once the blend is fixed.' },
  curedDays: { ko: '비누를 만든 날부터 오늘까지의 날수. 몰드에서 빼낸 날이 아닙니다.', en: 'Days from the day you made it to today, not from the day you unmoulded.' },
  targetCure: { ko: '건조를 끝낼 목표 일수. 콜드 프로세스는 대개 28~42일로 잡습니다.', en: 'The cure you are aiming at — usually 28–42 days for cold process.' },
  curePct: { ko: '목표 일수에 대한 진행률. 100%를 넘어도 바는 계속 좋아집니다.', en: 'Progress against the target; bars keep improving past 100%.' },

  /* 수지 */
  resinVol: { ko: '부어야 하는 수지의 부피. 1㎤가 1ml이며 컵에 남는 몫은 빠져 있습니다.', en: 'Resin volume to pour — one cm³ is one mL, before what stays in the cup.' },
  domeH: { ko: '조각 표면에서 돔 꼭대기까지의 높이. 조각 두께가 아닙니다.', en: 'Height from the surface of the piece to the top of the dome, not its thickness.' },
  colours: { ko: '나눠 담을 색의 개수. 컵 하나에 한 색으로 봅니다.', en: 'How many colours you are splitting into, counting one cup per colour.' },
  mainSharePct: { ko: '바탕색이 가져갈 비율. 0으로 두면 전부 균등하게 나눕니다.', en: 'The share the base colour takes; zero splits everything evenly.' },
  mainCupWt: { ko: '바탕색 컵에 담을 무게. A제와 B제를 섞은 뒤 나눈 값입니다.', en: 'What to put in the base-colour cup, split after A and B are combined.' },
  cupWeight: { ko: '나머지 색 한 컵에 담을 무게. 컵마다 같은 양입니다.', en: 'What each remaining colour cup gets — the same amount in every one.' },
  catalystPct: { ko: '전체에서 촉매(B제)가 차지하는 비율. 백금형은 50%, 주석형은 5~10%입니다.', en: 'The catalyst\'s share of the batch — 50% for platinum cure, 5–10% for tin.' },

  /* 구슬·장식 */
  claspLen: { ko: '잠금장치와 크림프가 먹는 길이. 닫은 상태로 끝에서 끝까지 잽니다.', en: 'Length taken by the clasp and crimps, measured end to end when closed.' },
  linkLen: { ko: '링크 한 칸의 길이. 열 칸을 재서 10으로 나누면 정확합니다.', en: 'One link along the chain; measure ten links and divide by ten.' },
  linkCount: { ko: '자를 링크의 개수. 반 칸은 없어 내림합니다.', en: 'Links to cut; there are no half links, so it rounds down.' },
  loopAllow: { ko: '루프를 만들고 끝을 마감하는 데 두는 몫. 래핑 루프는 20mm를 넘습니다.', en: 'Extra for forming the loop and finishing the end; a wrapped loop needs over 20 mm.' },

  /* 포장 */
  layers: { ko: '상자를 몇 겹으로 감을지. 깨질 물건은 세 겹 이상으로 봅니다.', en: 'How many layers you wrap the box in; fragile goods want three or more.' },
  wrapRollW: { ko: '쓰는 롤의 폭. 상자의 짧은 쪽을 덮을 만큼 넓어야 합니다.', en: 'The width of the roll you have; it must span the box\'s shorter face.' },
  wrapLen: { ko: '롤에서 뽑아야 하는 길이. 겹침과 모서리 몫이 들어 있습니다.', en: 'Length to pull off the roll, overlap and corners included.' },
  sheetsPer: { ko: '상자 하나에 넣는 장수. 대개 감싸는 한 장과 덮는 한 장입니다.', en: 'Sheets per parcel — usually one to wrap and one to cover.' },
  loops: { ko: '매듭에 만들 고리 수. 한 쪽이 아니라 전체 고리를 셉니다.', en: 'Loops in the finished bow, counting both sides together.' },
  loopLen: { ko: '고리 하나의 길이. 중앙에서 고리 끝까지이며 리본은 그 두 배를 먹습니다.', en: 'One loop from the centre to its tip; the ribbon spends twice that.' },
  tailLen: { ko: '매듭 아래로 늘어뜨릴 꼬리 한 줄의 길이. 자를 몫은 따로 둡니다.', en: 'One tail hanging below the knot, before what you trim off.' },
  mailerW: { ko: '봉투의 안쪽 폭. 봉함부를 뺀 자루 부분을 잽니다.', en: 'The mailer\'s inside width, measuring the sleeve without the lip.' },
  mailerL: { ko: '봉투의 안쪽 길이. 접어 붙이는 봉함부가 포함된 값입니다.', en: 'The mailer\'s inside length, with the fold-over adhesive lip included.' },
};
