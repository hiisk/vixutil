import { test } from 'node:test';
import assert from 'node:assert/strict';
import { RATE_TOOLS, rateTool } from '../lib/rate-tools.ts';
import { RATE_SECTION } from '../lib/rate-section.ts';
import { groupNum } from '../lib/formula/ui.ts';
import { checkFormulaSection, primaryOf as primaryIn, checkEngineLabels } from './formula-section-checks.ts';

/* 구조·i18n·라우트 검사는 세 섹션이 공유한다 (tests/formula-section-checks.ts) */
checkFormulaSection(RATE_SECTION, 100);
checkEngineLabels(RATE_SECTION);

const primaryOf = (slug: string, v: Record<string, number>) => primaryIn(RATE_TOOLS, slug, v);

/* ───────── 계산이 실제로 맞는지 ───────── */



test('할인율: 39,000원 30% 할인은 27,300원', () => {
  assert.equal(primaryOf('discount', { price: 39000, rate: 30 }), 27300);
});

test('할인율 역산: 50,000 → 35,000은 30%', () => {
  assert.equal(primaryOf('discount-rate', { list: 50000, sale: 35000 }), 30);
});

test('이중 할인: 30% 후 20%는 50%가 아니라 44%', () => {
  const t = rateTool('double-discount')!;
  const out = t.compute({ price: 100000, first: 30, second: 20 });
  assert.equal(out[0].value, 56000);
  assert.equal(out[1].value, 44);
});

test('부가세 역산: 110,000원의 공급가액은 100,000원, 세액은 10,000원', () => {
  const t = rateTool('vat-extract')!;
  const out = t.compute({ total: 110000, rate: 10 });
  assert.equal(out[0].value, 100000);
  assert.equal(out[1].value, 10000);
});

test('원천징수 3.3%: 300만 원의 실수령은 2,901,000원', () => {
  assert.equal(primaryOf('withholding', { gross: 3000000, rate: 3.3 }), 2901000);
});

test('세전 역산: 실수령 100만 원, 3.3%면 계약금은 1,034,126원', () => {
  assert.equal(primaryOf('gross-up', { net: 1000000, rate: 3.3 }), 1034126);
});

test('증감률: 45,000 → 52,000은 15.56%', () => {
  assert.equal(primaryOf('percent-change', { before: 45000, after: 52000 }), 15.56);
});

test('퍼센트포인트: 4% → 5%는 1%p이면서 25% 증가', () => {
  const t = rateTool('percent-point')!;
  const out = t.compute({ before: 4, after: 5 });
  assert.equal(out[0].value, 1);
  assert.equal(out[1].value, 25);
});

test('원래 값 역산: 10% 올라 66,000이면 원래는 60,000', () => {
  assert.equal(primaryOf('reverse-percent', { after: 66000, rate: 10 }), 60000);
});

test('비 간단히: 1920:1080은 16:9', () => {
  const t = rateTool('ratio-simplify')!;
  const out = t.compute({ a: 1920, b: 1080 });
  assert.equal(out[0].value, 16);
  assert.equal(out[1].value, 9);
});

test('CAGR: 1000만이 5년 뒤 2400만이면 연 19.14%', () => {
  assert.equal(primaryOf('cagr', { start: 10000000, end: 24000000, years: 5 }), 19.14);
});

test('가중평균: 300개 20%와 700개 5%는 9.5% — 단순평균 12.5%가 아니다', () => {
  const t = rateTool('weighted-percent')!;
  const out = t.compute({ a: 300, ra: 20, b: 700, rb: 5 });
  assert.equal(out[0].value, 9.5);
  assert.equal(out[1].value, 12.5);
});

test('복리: 1000만 원 연 6% 10년은 17,908,477원', () => {
  assert.equal(primaryOf('compound-interest', { principal: 10000000, rate: 6, years: 10 }), 17908477);
});

test('단리: 1000만 원 연 3.5% 3년의 만기는 11,050,000원', () => {
  assert.equal(primaryOf('simple-interest', { principal: 10000000, rate: 3.5, years: 3 }), 11050000);
});

test('대출: 2억 연 4.5% 30년의 월 상환액은 1,013,371원', () => {
  assert.equal(primaryOf('loan-payment', { principal: 200000000, rate: 4.5, years: 30 }), 1013371);
});

test('72의 법칙: 연 7%면 약 10.3년, 정확히는 10.24년', () => {
  const t = rateTool('rule-of-72')!;
  const out = t.compute({ rate: 7 });
  assert.equal(out[0].value, 10.3);
  assert.equal(out[1].value, 10.24);
});

test('손실 회복: 30% 하락은 42.86% 상승이 필요하다', () => {
  assert.equal(primaryOf('loss-recovery', { loss: 30 }), 42.86);
});

test('손실 회복: 50% 하락은 정확히 100% 상승이 필요하다', () => {
  assert.equal(primaryOf('loss-recovery', { loss: 50 }), 100);
});

test('실질 이자율: 명목 3.5%, 물가 2.5%면 0.98%', () => {
  assert.equal(primaryOf('real-rate', { nominal: 3.5, inflation: 2.5 }), 0.98);
});

test('농도: 물 200g에 소금 30g을 녹인 용액 230g은 13.04%', () => {
  assert.equal(primaryOf('concentration', { solute: 30, solution: 230 }), 13.04);
});

test('희석: 20% 300g을 5%로 만들려면 물 900g', () => {
  assert.equal(primaryOf('dilute-water', { conc: 20, solution: 300, target: 5 }), 900);
});

test('혼합: 30% 200g과 10% 300g은 18%', () => {
  assert.equal(primaryOf('mix-two', { a: 200, ra: 30, b: 300, rb: 10 }), 18);
});

test('소금물: 3% 1kg은 소금 30g과 물 970g', () => {
  const t = rateTool('salt-water')!;
  const out = t.compute({ target: 3, total: 1000 });
  assert.equal(out[0].value, 30);
  assert.equal(out[1].value, 970);
});

test('배율 희석: 1000배 20L는 원액 20ml, 물 1L당 1ml', () => {
  const t = rateTool('dilution-fold')!;
  const out = t.compute({ fold: 1000, batch: 20 });
  assert.equal(out[0].value, 20);
  assert.equal(out[1].value, 1);
});

test('ppm: 0.05%는 500ppm', () => {
  assert.equal(primaryOf('ppm-percent', { percent: 0.05 }), 500);
});

test('승률: 27승 18패는 60%', () => {
  assert.equal(primaryOf('win-rate', { wins: 27, losses: 18 }), 60);
});

test('점수: 55점 만점에 43점은 78.2점', () => {
  assert.equal(primaryOf('score-percent', { score: 43, max: 55 }), 78.2);
});

test('손익분기: 고정비 300만, 단가 15,000, 변동비 6,000이면 334개', () => {
  assert.equal(primaryOf('breakeven', { fixed: 3000000, price: 15000, variable: 6000 }), 334);
});

test('단가가 변동비보다 낮으면 손익분기점이 없다고 알린다', () => {
  const t = rateTool('breakeven')!;
  const v = { fixed: 3000000, price: 5000, variable: 6000 };
  const verdict = t.verdict!(v, t.compute(v));
  assert.ok(verdict && verdict.tone === 'bad');
});

test('groupNum은 세 자리마다 끊고 정수의 0을 지우지 않는다', () => {
  assert.equal(groupNum(1200000, 0), '1,200,000');
  assert.equal(groupNum(600, 0), '600');
  assert.equal(groupNum(0.05, 2), '0.05');
});

/*
 * ───────── 셋째 묶음 13종 ─────────
 *
 * 기대값은 계산기를 돌려 얻은 것이 아니라 손으로 세운 것이다. 대출은 이자 0%로
 * 두면 나눗셈이 되고, 연속 희석은 한 번만 하면 그냥 나누기이고, 상대평가는
 * 평균이 이미 목표면 아무것도 안 바뀐다 — 새 식이 옛 식과 만나는 자리를 골랐다.
 */
const outsOf = (slug: string, v: Record<string, number>) => {
  const t = rateTool(slug)!;
  assert.ok(t, `${slug} 없음`);
  return t.compute(v);
};

test('구간 단가: 기준을 넘으면 전부 싼 단가, 못 넘으면 전부 제값', () => {
  assert.equal(primaryOf('bulk-tier-price', { qty: 250, unit: 1200, tierQty: 100, tierPrice: 950 }), 237500);
  assert.equal(primaryOf('bulk-tier-price', { qty: 99, unit: 1200, tierQty: 100, tierPrice: 950 }), 118800);
});

test('구간 단가: 99개가 100개보다 비싸질 수 있다', () => {
  const at99 = primaryOf('bulk-tier-price', { qty: 99, unit: 1200, tierQty: 100, tierPrice: 950 });
  const at100 = primaryOf('bulk-tier-price', { qty: 100, unit: 1200, tierQty: 100, tierPrice: 950 });
  assert.ok(at99 > at100, `${at99} vs ${at100}`);
  const t = rateTool('bulk-tier-price')!;
  const v = { qty: 99, unit: 1200, tierQty: 100, tierPrice: 950 };
  assert.equal(t.verdict!(v, t.compute(v))!.tone, 'warn');
});

test('구간 단가: 실제 1개당은 총액을 개수로 나눈 값이다', () => {
  const out = outsOf('bulk-tier-price', { qty: 250, unit: 1200, tierQty: 100, tierPrice: 950 });
  assert.equal(out[1].value, 950);
  assert.equal(out[2].value, 62500);
});

test('사용량 분담: 1250 중 320을 썼으면 25.6%, 18만 원 중 46,080원', () => {
  const out = outsOf('usage-split', { amount: 180000, used: 320, total: 1250 });
  assert.equal(out[0].value, 46080);
  assert.equal(out[1].value, 25.6);
  assert.equal(out[0].value + out[2].value, 180000);
});

test('보상판매: 150만 원에 30만 원을 받으면 20% 할인이고 지불액은 120만 원', () => {
  const out = outsOf('trade-in-discount', { list: 1500000, credit: 300000, resale: 380000 });
  assert.equal(out[0].value, 1200000);
  assert.equal(out[1].value, 20);
  assert.equal(out[2].value, 80000);
});

test('보상판매: 보상액이 시세보다 높으면 좋다고, 낮으면 주의라고 알린다', () => {
  const t = rateTool('trade-in-discount')!;
  const better = { list: 1500000, credit: 400000, resale: 380000 };
  const worse = { list: 1500000, credit: 300000, resale: 380000 };
  assert.equal(t.verdict!(better, t.compute(better))!.tone, 'good');
  assert.equal(t.verdict!(worse, t.compute(worse))!.tone, 'warn');
});

test('배수: 2배는 100% 증가지 200%가 아니다', () => {
  assert.equal(primaryOf('multiple-to-percent', { multiple: 2, before: 100 }), 100);
  assert.equal(primaryOf('multiple-to-percent', { multiple: 3, before: 100 }), 200);
  assert.equal(primaryOf('multiple-to-percent', { multiple: 1, before: 100 }), 0);
  assert.equal(primaryOf('multiple-to-percent', { multiple: 0.5, before: 100 }), -50);
});

test('반감: 절반이 되는 기간만큼 지나면 남은 비율이 50%가 된다', () => {
  // 반감 기간이 소수 둘째 자리에서 잘려 나오므로(4.27년) 되먹이면 49.96%가 된다
  const half = primaryOf('halving-rate', { rate: 15, years: 10 });
  const out = outsOf('halving-rate', { rate: 15, years: half });
  assert.ok(Math.abs(out[1].value - 50) < 0.1, `${out[1].value}%`);
});

test('반감: 해마다 50%씩 줄면 반감 기간이 1년이다', () => {
  assert.equal(primaryOf('halving-rate', { rate: 50, years: 3 }), 1);
  assert.equal(outsOf('halving-rate', { rate: 50, years: 3 })[1].value, 12.5);
});

test('반감: 안 줄면(0%) 절반이 되는 날이 없어 0으로 표시한다', () => {
  const out = outsOf('halving-rate', { rate: 0, years: 10 });
  assert.equal(out[0].value, 0);
  assert.equal(out[1].value, 100);
});

test('남은 원금: 이자가 0이면 낸 개월만큼 원금이 곧바로 줄어든다', () => {
  // 3억을 360개월에 무이자로 나누면 매달 정확히 1/360, 60개월 뒤 5/6이 남는다
  const out = outsOf('loan-balance', { principal: 360000000, rate: 0, years: 30, paid: 60 });
  assert.equal(out[0].value, 300000000);
  assert.equal(out[1].value, 60000000);
  assert.equal(out[2].value, 0);
});

test('남은 원금: 이자가 붙으면 5년을 갚아도 10%가 안 줄어든다', () => {
  const left = primaryOf('loan-balance', { principal: 300000000, rate: 4.2, years: 30, paid: 60 });
  assert.ok(left > 300000000 * 0.9, `${left}`);
  assert.ok(left < 300000000, `${left}`);
});

test('남은 원금: 만기까지 다 갚으면 0이 된다', () => {
  assert.equal(primaryOf('loan-balance', { principal: 300000000, rate: 4.2, years: 30, paid: 360 }), 0);
});

test('거치기간: 거치가 없으면 더 내는 이자가 0이다', () => {
  const out = outsOf('interest-only-period', { principal: 300000000, rate: 4.2, years: 30, grace: 0 });
  assert.equal(out[2].value, 0);
});

test('거치기간: 거치가 길수록 총이자도 월 상환액도 함께 커진다', () => {
  const short = outsOf('interest-only-period', { principal: 300000000, rate: 4.2, years: 30, grace: 12 });
  const long = outsOf('interest-only-period', { principal: 300000000, rate: 4.2, years: 30, grace: 60 });
  assert.ok(long[0].value > short[0].value, `이자 ${long[0].value} vs ${short[0].value}`);
  assert.ok(long[1].value > short[1].value, `월납 ${long[1].value} vs ${short[1].value}`);
});

test('상환 개월: 이자가 0이면 잔액을 납입액으로 나눈 값이다', () => {
  assert.equal(primaryOf('payoff-months', { balance: 3000000, rate: 0, pay: 300000 }), 10);
});

test('상환 개월: 납입액이 한 달 이자보다 작으면 안 끝난다고 알린다', () => {
  const t = rateTool('payoff-months')!;
  // 300만 원에 연 19.9%면 한 달 이자가 49,750원이다
  const v = { balance: 3000000, rate: 19.9, pay: 40000 };
  assert.equal(t.verdict!(v, t.compute(v))!.tone, 'bad');
  assert.equal(primaryOf('payoff-months', v), 0);
});

test('상환 개월: 이자가 붙으면 무이자보다 오래 걸린다', () => {
  const free = primaryOf('payoff-months', { balance: 3000000, rate: 0, pay: 300000 });
  const withRate = primaryOf('payoff-months', { balance: 3000000, rate: 19.9, pay: 300000 });
  assert.ok(withRate > free, `${withRate} vs ${free}`);
});

test('인출: 이율이 0이면 목돈을 인출액으로 나눈 개월만큼 간다', () => {
  const out = outsOf('withdrawal-years', { fund: 36000000, rate: 0, draw: 1000000 });
  assert.equal(out[1].value, 36);
  assert.equal(out[0].value, 3);
});

test('인출: 인출액이 이자보다 적으면 원금이 안 줄어 좋다고 알린다', () => {
  const t = rateTool('withdrawal-years')!;
  // 3억에 연 3%면 한 달 이자가 75만 원이다
  const v = { fund: 300000000, rate: 3, draw: 700000 };
  assert.equal(t.verdict!(v, t.compute(v))!.tone, 'good');
});

test('세율 구간: 경계 아래면 전부 낮은 세율이고 실효세율이 그 값과 같다', () => {
  const out = outsOf('marginal-tax-step', { income: 40000000, line: 50000000, low: 15, high: 24 });
  assert.equal(out[0].value, 6000000);
  assert.equal(out[1].value, 15);
  assert.equal(out[2].value, 0);
});

test('세율 구간: 경계를 넘겨도 넘긴 만큼에만 높은 세율이 붙는다', () => {
  const out = outsOf('marginal-tax-step', { income: 55000000, line: 50000000, low: 15, high: 24 });
  assert.equal(out[0].value, 8700000);
  assert.equal(out[2].value, 1200000);
});

test('세율 구간: 경계를 조금 넘겼다고 실수령이 줄어들지는 않는다', () => {
  const just = outsOf('marginal-tax-step', { income: 50000000, line: 50000000, low: 15, high: 24 });
  const over = outsOf('marginal-tax-step', { income: 50100000, line: 50000000, low: 15, high: 24 });
  assert.ok(50100000 - over[0].value > 50000000 - just[0].value, '경계를 넘겼는데 실수령이 줄었다');
  assert.ok(over[1].value < 24, `실효세율 ${over[1].value}가 높은 세율 이상이다`);
});

test('커피: 20g에 1:15면 물 300ml, 잔에는 260ml', () => {
  const out = outsOf('coffee-ratio', { bean: 20, ratio: 15 });
  assert.equal(out[0].value, 300);
  assert.equal(out[1].value, 260);
});

test('연속 희석: 10배를 세 번이면 1000배이고 100%가 0.1%가 된다', () => {
  const out = outsOf('serial-dilution', { fold: 10, steps: 3, start: 100 });
  assert.equal(out[0].value, 0.1);
  assert.equal(out[1].value, 1000);
  assert.equal(out[2].value, 1000);
});

test('연속 희석: 한 번만 하면 그냥 나누기와 같고, 0번이면 그대로다', () => {
  assert.equal(primaryOf('serial-dilution', { fold: 4, steps: 1, start: 100 }), 25);
  assert.equal(primaryOf('serial-dilution', { fold: 10, steps: 0, start: 100 }), 100);
});

test('상대평가: 평균이 이미 목표면 점수가 그대로다', () => {
  const out = outsOf('curve-grade', { score: 72, avg: 75, target: 75 });
  assert.equal(out[0].value, 72);
  assert.equal(out[1].value, 0);
  assert.equal(out[2].value, 0);
});

test('상대평가: 평균을 10점 올리면 모두가 10점씩 오르고 순위는 안 바뀐다', () => {
  const low = primaryOf('curve-grade', { score: 40, avg: 65, target: 75 });
  const high = primaryOf('curve-grade', { score: 72, avg: 65, target: 75 });
  assert.equal(low, 50);
  assert.equal(high, 82);
  assert.equal(high - low, 32);
});

test('상대평가: 100점을 넘겨 올릴 수는 없다', () => {
  assert.equal(primaryOf('curve-grade', { score: 95, avg: 65, target: 90 }), 100);
});
