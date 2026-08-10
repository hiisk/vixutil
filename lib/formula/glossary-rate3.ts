/**
 * 사업·마케팅 비율 열둘에서 생긴 용어의 뜻풀이(3언어).
 *
 * 라벨만으로는 어느 쪽으로 나눈 값인지 알 수 없는 것들이 대부분이다 — 마크업과
 * 이익률, ROAS와 본전 ROAS, 공헌이익과 이익. 여기서 분모를 한 번씩 못 박아 둔다.
 */
import type { Term } from './terms.ts';

export const RATE3_DESC: Record<string, Term> = {
  /* ───────── 마진 vs 마크업 ───────── */
  marginFromMarkup: { ko: '그 마크업으로 팔았을 때 매출에서 남는 비율. 마크업보다 항상 작습니다.', en: 'The share of revenue left when you sell at that markup — always smaller than the markup.' },
  markupFromMargin: { ko: '그 이익률을 맞추려면 원가에 얹어야 하는 비율. 이익률보다 항상 큽니다.', en: 'What you must add to cost to hit that margin — always larger than the margin.' },
  priceFactor: { ko: '판매가가 원가의 몇 배인지. 마크업 50%면 1.5배입니다.', en: 'Price as a multiple of cost; a 50% markup makes it 1.5×.' },

  /* ───────── 손익분기·공헌이익 ───────── */
  fixedCost: { ko: '팔리든 안 팔리든 나가는 돈. 임대료와 급여가 여기 들어갑니다.', en: 'Money that goes out whether you sell or not — rent and salaries live here.' },
  varCost: { ko: '한 개가 팔릴 때만 붙는 돈. 재료비·포장비·결제 수수료입니다.', en: 'Cost that only appears when one more unit sells — materials, packaging, payment fees.' },
  targetProfit: { ko: '고정비를 다 메운 뒤 남기고 싶은 금액. 0이면 그냥 본전입니다.', en: 'What you want left after fixed costs are covered; zero just means break even.' },
  contribMargin: { ko: '한 개를 더 팔 때 회사에 남는 돈. 이 돈이 고정비를 갚습니다.', en: 'What one more sale leaves in the business — this is what pays down fixed costs.' },
  contribRatio: { ko: '공헌이익을 단가로 나눈 비율. 개수를 못 셀 때 이 비율로 매출을 잡습니다.', en: 'Contribution over price; when units cannot be counted, this gets you the revenue.' },
  breakEvenUnits: { ko: '고정비를 딱 메우는 수량. 한 개라도 모자라면 적자입니다.', en: 'The quantity that exactly covers fixed costs; one short and you are in the red.' },
  breakEvenRevenue: { ko: '본전이 되는 매출액. 본전 수량에 단가를 곱한 값입니다.', en: 'The sales figure that breaks even — break-even units times the price.' },
  unitsForProfit: { ko: '고정비를 메우고 목표 이익까지 남기는 데 필요한 수량.', en: 'Units needed to cover fixed costs and leave the target profit on top.' },

  /* ───────── 투자 회수 ───────── */
  monthlyCash: { ko: '매달 들어온 돈에서 나간 돈을 뺀 순현금. 감가상각은 빼지 않습니다.', en: 'Cash in minus cash out each month; depreciation is not deducted.' },
  paybackMonths: { ko: '투자금을 되찾는 데 걸리는 개월. 돈의 시간 가치는 무시한 값입니다.', en: 'Months until the investment is back, ignoring the time value of money.' },

  /* ───────── 정액 감가상각 ───────── */
  salvageValue: { ko: '내용연수가 끝났을 때 남는다고 보는 값. 0으로 두면 전액을 나눕니다.', en: 'What it is assumed to be worth at the end of its life; set zero to spread the whole cost.' },
  yearsElapsed: { ko: '취득한 뒤 지난 햇수. 장부가액을 볼 시점입니다.', en: 'Years since you bought it — the point you want the book value for.' },
  annualDepr: { ko: '해마다 비용으로 떨어내는 금액. 정액법이라 매년 같습니다.', en: 'The amount written off each year; straight line makes it the same every year.' },
  monthlyDepr: { ko: '연 감가액을 12로 나눈 값. 월 단위 손익에 쓰입니다.', en: 'The yearly figure over twelve, for monthly accounts.' },
  bookValue: { ko: '그 시점의 장부상 남은 값. 잔존가치 아래로는 내려가지 않습니다.', en: 'What the books still carry it at; it never falls below salvage value.' },

  /* ───────── 저축률·은퇴 자산 ───────── */
  monthlySaved: { ko: '한 달에 쓰지 않고 남긴 금액. 빚을 갚은 원금도 여기 넣을 수 있습니다.', en: 'What you kept instead of spending this month; debt principal repaid can count here.' },
  savingsRate: { ko: '실수령액 가운데 남긴 비율. 세전으로 나누면 높게 나옵니다.', en: 'The share of take-home pay you kept; dividing by gross inflates it.' },
  yearsPerYearSpend: { ko: '1년치 생활비를 모으는 데 걸리는 해. 저축률이 오르면 급하게 짧아집니다.', en: 'Years to bank one year of spending; it shortens fast as the rate climbs.' },
  annualSpend: { ko: '한 해에 쓰는 돈 전체. 세금과 보험료까지 넣어야 목표가 맞습니다.', en: 'Everything you spend in a year; include tax and insurance or the target is too low.' },
  withdrawRate: { ko: '자산에서 해마다 꺼내 쓰는 비율. 낮출수록 필요 자산이 커집니다.', en: 'The share you draw from the portfolio each year; lower means a bigger portfolio.' },
  fireNumber: { ko: '그 인출률로 생활비를 지탱하는 자산 규모.', en: 'The portfolio that carries that spending at that withdrawal rate.' },

  /* ───────── 주거비 부담 ───────── */
  housingCost: { ko: '한 달 주거에 나가는 돈. 관리비를 넣는지 먼저 정하세요.', en: 'What housing costs you in a month; decide up front whether utilities are in it.' },
  guidePct: { ko: '견주려는 기준선. 흔히 인용되는 30%는 법이 아니라 관행입니다.', en: 'The line you measure against; the oft-quoted 30% is a convention, not a rule.' },
  guideMax: { ko: '그 기준선을 지킬 때의 주거비 한도.', en: 'The most you could spend on housing and still sit on that line.' },

  /* ───────── 프리랜서 시급 ───────── */
  targetIncome: { ko: '한 해에 벌고 싶은 금액. 세전으로 넣으면 결과도 세전입니다.', en: 'What you want to earn in a year; put it in before tax and the answer is before tax.' },
  billableHours: { ko: '일주일에 실제로 청구되는 시간. 보통 주 40시간 중 20~30시간입니다.', en: 'Hours a week you can actually invoice — usually 20 to 30 out of 40.' },
  weeksWorked: { ko: '한 해에 실제로 일하는 주 수. 휴가와 아픈 날을 뺍니다.', en: 'Weeks you actually work in a year, with holidays and sick days taken out.' },
  overheadPct: { ko: '돈이 안 되는 시간과 비용을 목표 소득에 얹는 비율.', en: 'The uplift for unpaid time and running costs, added on top of the target.' },
  hourlyRate: { ko: '목표를 채우기 위해 청구해야 하는 시간당 금액.', en: 'What you have to charge per hour to land on the target.' },
  billableYear: { ko: '한 해에 청구할 수 있는 시간의 합계. 이 값으로 나눕니다.', en: 'Billable hours across the year — the number you divide by.' },
  mustBill: { ko: '부담률까지 얹어 실제로 청구해야 하는 연 금액.', en: 'What you must actually invoice in a year once overhead is added.' },

  /* ───────── 교차 환율 ───────── */
  rateAB: { ko: 'B 하나가 A로 얼마인지. 고시된 환율을 그대로 넣습니다.', en: 'How much A one unit of B costs — enter the quoted rate as it stands.' },
  rateBC: { ko: 'C 하나가 B로 얼마인지. 두 환율의 B가 서로 약분됩니다.', en: 'How much B one unit of C costs; the two B figures cancel out.' },
  rateAC: { ko: '두 환율을 이어 붙여 얻은 A와 C 사이의 환율.', en: 'The A-to-C rate you get by chaining the two quotes.' },
  rateCA: { ko: 'A 하나가 C로 얼마인지. A/C 환율의 역수입니다.', en: 'How much C one unit of A costs — the reciprocal of the A/C rate.' },
  netCrossRate: { ko: '두 구간에서 스프레드를 각각 떼인 뒤 실제로 물게 되는 환율.', en: 'The rate you really pay once a spread is taken on each of the two legs.' },

  /* ───────── 광고 효율 ───────── */
  adSpend: { ko: '그 기간에 광고에 쓴 돈. 제작비는 보통 따로 셉니다.', en: 'What you spent on ads in the period; production costs are usually counted apart.' },
  adRevenue: { ko: '그 광고에 귀속된 매출. 귀속 기준을 바꾸면 크게 달라집니다.', en: 'Revenue attributed to those ads; change the attribution window and it moves a lot.' },
  roas: { ko: '광고 매출을 광고비로 나눈 배수. 이익이 아니라 매출 기준입니다.', en: 'Revenue over ad spend, as a multiple — measured on revenue, not profit.' },
  roasPct: { ko: '같은 값을 퍼센트로 쓴 것. 4배가 400%입니다.', en: 'The same figure written as a percentage; 4× is 400%.' },
  breakEvenRoas: { ko: '이익률로 광고비를 겨우 메우는 ROAS. 이익률 40%면 2.5배입니다.', en: 'The ROAS at which the margin just covers the spend; at 40% margin that is 2.5×.' },
  impressions: { ko: '광고가 화면에 뜬 횟수. 사람 수가 아니라 횟수입니다.', en: 'How many times the ad was shown — times, not people.' },
  clicks: { ko: '광고를 눌러 들어온 횟수.', en: 'How many times the ad was clicked through.' },
  cpc: { ko: '클릭 한 번에 든 돈. 광고비를 클릭 수로 나눕니다.', en: 'What one click cost — spend divided by clicks.' },
  cpm: { ko: '노출 1,000회에 든 돈. 지면 경쟁이 이 값을 정합니다.', en: 'Cost for a thousand impressions; auction competition sets it.' },
  ctr: { ko: '노출 가운데 클릭으로 이어진 비율. 소재가 이 값을 정합니다.', en: 'The share of impressions that turned into clicks; the creative sets it.' },
  ctrTarget: { ko: '소재를 고쳐 닿으려는 클릭률.', en: 'The click-through rate you hope a better creative reaches.' },
  cpcAtTarget: { ko: 'CPM이 그대로일 때 그 클릭률에서의 CPC. CTR과 반비례합니다.', en: 'CPC at that click-through rate if CPM holds — the two move inversely.' },
};
