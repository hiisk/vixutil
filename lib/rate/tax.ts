/** 비율 섹션 - 세금·정산 (8종) */
import type { FormulaTool } from '../formula/types.ts';
import { ratio } from '../formula/types.ts';
import { round } from '../formula/num.ts';

export const TAX_TOOLS: FormulaTool[] = [
  {
    slug: 'vat-add',
    icon: '🧾',
    category: '세금·정산',
    fields: [
      { key: 'supply', term: 'supply', unit: 'money', def: 100000, min: 0 },
      { key: 'rate', term: 'rate', unit: 'percent', def: 10, min: 0 },
    ],
    formula: '{total} = {supply} × (1 + {rate} ÷ 100)',
    compute: v => {
      const vat = v.supply * (v.rate / 100);
      return [
        { term: 'total', unit: 'money', value: Math.round(v.supply + vat), digits: 0, primary: true },
        { term: 'vat', unit: 'money', value: Math.round(vat), digits: 0 },
      ];
    },
    ko: { title: '부가세 포함 금액', desc: '공급가액에 부가세를 더해 청구할 총액을 구합니다.',
      long: '공급가액의 10%가 부가세이고, 둘을 합친 값이 거래처에 청구하는 금액입니다. 세율은 나라와 품목에 따라 바꿔 넣을 수 있습니다.',
      note: '견적서에 "부가세 별도"라고 썼다면 여기서 나온 합계가 실제 입금될 금액입니다.' },
    en: { title: 'Add VAT', desc: 'Add VAT to a net amount to get the total you should invoice.',
      long: 'VAT is the rate applied to the net amount, and the two together are what the customer pays. Change the rate for your country or product class.',
      note: 'If your quote said "plus VAT", the total shown here is the amount that will actually be transferred.' },
  },
  {
    slug: 'vat-extract',
    icon: '🔖',
    category: '세금·정산',
    fields: [
      { key: 'total', term: 'total', unit: 'money', def: 110000, min: 0 },
      { key: 'rate', term: 'rate', unit: 'percent', def: 10, min: 0 },
    ],
    formula: '{supply} = {total} ÷ (1 + {rate} ÷ 100)',
    compute: v => {
      const supply = ratio(v.total, 1 + v.rate / 100);
      return [
        { term: 'supply', unit: 'money', value: Math.round(supply), digits: 0, primary: true },
        { term: 'vat', unit: 'money', value: Math.round(v.total - supply), digits: 0 },
      ];
    },
    ko: { title: '부가세 역산', desc: '부가세가 포함된 총액에서 공급가액과 세액을 분리합니다.',
      long: '세율 10%라면 총액을 1.1로 나눈 값이 공급가액입니다. 총액의 10%를 그냥 빼면 세액을 조금 크게 잡습니다.',
      note: '11만 원의 부가세는 1만 원입니다. 1만 1천 원이 아닙니다 — 세금은 공급가액 기준으로 붙습니다.' },
    en: { title: 'Extract VAT', desc: 'Split a VAT-inclusive total into the net amount and the tax.',
      long: 'At a 10% rate, divide the total by 1.1 to get the net amount. Taking 10% off the total instead overstates the tax.',
      note: 'The VAT inside 110 is 10, not 11 — the tax is charged on the net amount, not on the total.' },
  },
  {
    slug: 'tip',
    icon: '💰',
    category: '세금·정산',
    fields: [
      { key: 'bill', term: 'amount', unit: 'money', def: 82000, min: 0 },
      { key: 'rate', term: 'percent', unit: 'percent', def: 15, min: 0 },
      { key: 'people', term: 'people', unit: 'people', def: 4, min: 1 },
    ],
    formula: '{perPerson} = {amount} × (1 + {percent} ÷ 100) ÷ {people}',
    compute: v => {
      const tip = v.bill * (v.rate / 100);
      const total = v.bill + tip;
      return [
        { term: 'perPerson', unit: 'money', value: Math.round(ratio(total, v.people)), digits: 0, primary: true },
        { term: 'tip', unit: 'money', value: Math.round(tip), digits: 0 },
        { term: 'total', unit: 'money', value: Math.round(total), digits: 0 },
      ];
    },
    ko: { title: '팁 계산기', desc: '식사 금액에 팁을 얹고 인원수로 나눕니다.',
      long: '팁 비율을 금액에 곱해 더하면 총액, 인원으로 나누면 1인당 낼 돈입니다. 미국은 보통 15~20%가 기준입니다.',
      note: '영수증에 gratuity나 service charge가 이미 붙어 있으면 팁이 포함된 것입니다. 두 번 내지 않도록 확인하세요.' },
    en: { title: 'Tip Calculator', desc: 'Add a tip to the bill and split it across the table.',
      long: 'Multiply the bill by the tip rate, add it on, then divide by the number of people. 15–20% is the usual range in the US.',
      note: 'If the receipt already lists gratuity or a service charge, the tip is included — check before adding a second one.' },
  },
  {
    slug: 'dutch-pay',
    icon: '👥',
    category: '세금·정산',
    fields: [
      { key: 'total', term: 'total', unit: 'money', def: 137000, min: 0 },
      { key: 'people', term: 'people', unit: 'people', def: 5, min: 1 },
    ],
    formula: '{perPerson} = {total} ÷ {people}',
    compute: v => {
      const exact = ratio(v.total, v.people);
      const rounded = Math.ceil(exact / 100) * 100;
      return [
        { term: 'perPerson', unit: 'money', value: rounded, digits: 0, primary: true },
        { term: 'diff', unit: 'money', value: Math.round(rounded * v.people - v.total), digits: 0 },
      ];
    },
    ko: { title: '더치페이 계산기', desc: '총액을 인원수로 나누고 100원 단위로 올려 걷을 금액을 정합니다.',
      long: '나눈 값에 소수점이 남으면 걷기 불편합니다. 100원 단위로 올림한 금액과 그렇게 걷을 때 남는 돈을 함께 보여줍니다.',
      note: '남는 돈은 보통 계산한 사람이 갖거나 다음 자리 몫으로 둡니다.' },
    en: { title: 'Split the Bill', desc: 'Divide a total across people and round up to a convenient amount.',
      long: 'An exact split usually leaves awkward change, so this rounds up to the nearest 100 and shows the surplus you collect.',
      note: 'The surplus normally goes to whoever paid the card, or towards the next round.' },
  },
  {
    slug: 'withholding',
    icon: '📄',
    category: '세금·정산',
    fields: [
      { key: 'gross', term: 'grossPay', unit: 'money', def: 3000000, min: 0 },
      { key: 'rate', term: 'rate', unit: 'percent', def: 3.3, min: 0, step: 0.1 },
    ],
    formula: '{netPay} = {grossPay} × (1 − {rate} ÷ 100)',
    compute: v => {
      const tax = v.gross * (v.rate / 100);
      return [
        { term: 'netPay', unit: 'money', value: Math.round(v.gross - tax), digits: 0, primary: true },
        { term: 'taxAmt', unit: 'money', value: Math.round(tax), digits: 0 },
      ];
    },
    ko: { title: '원천징수 3.3% 계산기', desc: '프리랜서 지급액에서 세금을 떼고 실수령액을 구합니다.',
      long: '사업소득 원천징수는 소득세 3%와 지방소득세 0.3%를 합쳐 3.3%입니다. 지급액에서 이 몫을 뗀 나머지가 통장에 들어옵니다.',
      note: '떼인 세금은 다음 해 종합소득세 신고 때 정산됩니다. 소득이 적으면 상당액을 환급받습니다.' },
    en: { title: 'Withholding Tax', desc: 'Take withholding tax off a freelance payment to see the net amount.',
      long: "Korea's business-income withholding is 3% income tax plus 0.3% local tax, or 3.3% in total. What is left after that is what reaches your account.",
      note: 'The withheld amount is settled when you file your annual return — with low income much of it comes back as a refund.' },
  },
  {
    slug: 'commission',
    icon: '🤝',
    category: '세금·정산',
    fields: [
      { key: 'amount', term: 'amount', unit: 'money', def: 500000, min: 0 },
      { key: 'rate', term: 'rate', unit: 'percent', def: 12, min: 0, step: 0.1 },
    ],
    formula: '{settle} = {amount} − {amount} × {rate} ÷ 100',
    compute: v => {
      const fee = v.amount * (v.rate / 100);
      return [
        { term: 'settle', unit: 'money', value: Math.round(v.amount - fee), digits: 0, primary: true },
        { term: 'feeAmt', unit: 'money', value: Math.round(fee), digits: 0 },
      ];
    },
    ko: { title: '수수료 정산 계산기', desc: '판매액에서 플랫폼 수수료를 빼고 실제 정산액을 구합니다.',
      long: '오픈마켓과 배달앱은 판매액의 일정 비율을 수수료로 뗍니다. 정산액은 그 나머지이고, 원가는 여기서 다시 빠집니다.',
      note: '수수료에도 부가세가 붙는 경우가 많습니다. 계약서에 "부가세 별도"라면 실제 부담은 여기보다 큽니다.' },
    en: { title: 'Commission & Payout', desc: 'Subtract a platform commission from your sales to see the actual payout.',
      long: 'Marketplaces and delivery apps take a percentage of each sale. The payout is what remains — your own costs still come out of that.',
      note: 'Commission is often subject to VAT too. If your contract says "plus VAT", your real cost is higher than shown.' },
  },
  {
    slug: 'effective-rate',
    icon: '📊',
    category: '세금·정산',
    fields: [
      { key: 'gross', term: 'grossPay', unit: 'money', def: 4000000, min: 0 },
      { key: 'net', term: 'netPay', unit: 'money', def: 3380000, min: 0 },
    ],
    formula: '{effRate} = ({grossPay} − {netPay}) ÷ {grossPay} × 100',
    compute: v => [
      { term: 'effRate', unit: 'percent', value: round(ratio(v.gross - v.net, v.gross) * 100, 2), digits: 2, primary: true },
      { term: 'taxAmt', unit: 'money', value: Math.round(v.gross - v.net), digits: 0 },
    ],
    ko: { title: '실효세율 계산기', desc: '세전 금액과 실수령액으로 실제로 몇 %를 뗐는지 구합니다.',
      long: '급여명세서의 공제 항목이 여러 줄이면 합계를 보기 어렵습니다. 세전과 실수령만 넣으면 전체 공제율이 한 숫자로 나옵니다.',
      note: '세율 구간과 실효세율은 다릅니다. 최고 구간이 24%여도 전체 평균은 그보다 훨씬 낮습니다.' },
    en: { title: 'Effective Tax Rate', desc: 'From gross and net pay, see what share was actually deducted.',
      long: 'Payslips split deductions across many lines, which hides the total. Enter gross and net and the whole deduction rate comes out as one number.',
      note: 'A tax bracket is not an effective rate. Even in a 24% bracket, the average across your income is much lower.' },
  },
  {
    slug: 'gross-up',
    icon: '🔼',
    category: '세금·정산',
    fields: [
      { key: 'net', term: 'netPay', unit: 'money', def: 1000000, min: 0 },
      { key: 'rate', term: 'rate', unit: 'percent', def: 3.3, min: 0, max: 99, step: 0.1 },
    ],
    formula: '{grossPay} = {netPay} ÷ (1 − {rate} ÷ 100)',
    compute: v => {
      const gross = ratio(v.net, 1 - v.rate / 100);
      return [
        { term: 'grossPay', unit: 'money', value: Math.round(gross), digits: 0, primary: true },
        { term: 'taxAmt', unit: 'money', value: Math.round(gross - v.net), digits: 0 },
      ];
    },
    ko: { title: '세전 금액 역산', desc: '실수령 목표를 맞추려면 계약 금액을 얼마로 써야 하는지 계산합니다.',
      long: '100만 원을 받고 싶은데 3.3%를 뗀다면 계약 금액은 103만 3천 원이 아닙니다. 100만 원을 0.967로 나눠야 맞습니다.',
      note: '세율을 그냥 더해 견적을 쓰면 매번 실수령이 목표보다 조금씩 모자랍니다.' },
    en: { title: 'Gross-Up Calculator', desc: 'Work out the contract amount needed to hit a target net payment.',
      long: 'To net 1,000,000 with 3.3% withheld, the contract is not 1,033,000 — you divide 1,000,000 by 0.967.',
      note: 'Quoting by simply adding the tax rate leaves you a little short of the target every time.' },
  },
];
