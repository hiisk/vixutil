import { test } from 'node:test';
import assert from 'node:assert/strict';
import { RATE_TOOLS, rateTool } from '../lib/rate-tools.ts';
import { RATE_SECTION } from '../lib/rate-section.ts';
import { groupNum } from '../lib/formula/ui.ts';
import { checkFormulaSection, primaryOf as primaryIn } from './formula-section-checks.ts';

/* 구조·i18n·라우트 검사는 세 섹션이 공유한다 (tests/formula-section-checks.ts) */
checkFormulaSection(RATE_SECTION, 100);

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
