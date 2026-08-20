import { test } from 'node:test';
import assert from 'node:assert/strict';
import { matchSaju, matchGrade, MATCH_GRADES } from '../lib/saju-match.ts';
import { BRANCHES, STEMS, buildChart } from '../lib/saju-data.ts';

/**
 * 사주 궁합의 계산 규칙.
 *
 * 화면으로는 «그럴듯해 보인다»밖에 확인할 수 없는 종류다 — 육합인지 충인지,
 * 상생인지 상극인지는 눈으로 안 보인다. 명리 규칙을 검사로 붙들어 둔다.
 */

const B = (year: number, month: number, day: number, hour: number | null = null) =>
  ({ year, month, day, hour });

/**
 * 조건에 맞는 일주를 가진 날짜를 찾는다 — 규칙 검사에 쓸 표본.
 *
 * **천간과 지지는 아무렇게나 짝지어지지 않는다.** 육십갑자는 둘의 짝수·홀수가
 * 맞는 60가지뿐이라, 「갑축」 같은 조합은 존재하지 않는다. 그래서 일간·일지를
 * 둘 다 못 박으면 표본을 못 찾는 경우가 생긴다(실제로 처음 그렇게 짰다).
 * 재려는 축에 필요한 것만 조건으로 건다.
 */
function findDay(
  want: (c: { stemIdx: number; branchIdx: number }) => boolean,
): { year: number; month: number; day: number } | null {
  for (let y = 1990; y <= 2000; y++) {
    for (let m = 1; m <= 12; m++) {
      for (let d = 1; d <= 28; d++) {
        const c = buildChart(B(y, m, d), 'male');
        if (want(c.day)) return { year: y, month: m, day: d };
      }
    }
  }
  return null;
}

test('총점은 0~100 안에 있고, 축 넷이 모두 나온다', () => {
  const r = matchSaju(B(1995, 3, 15, 8), 'male', B(1997, 7, 22, 14), 'female');
  assert.ok(r, '결과가 없다');
  assert.ok(r.total >= 0 && r.total <= 100, `총점이 ${r.total}이다`);
  assert.deepEqual(r.axes.map(a => a.id), ['ilgan', 'ilji', 'ohaeng', 'sipseong']);
  for (const a of r.axes) {
    assert.ok(a.score >= 0 && a.score <= 5, `${a.id} 점수가 ${a.score}`);
    assert.ok(a.note.trim().length > 10, `${a.id}에 설명이 없다`);
  }
});

test('순서를 바꿔도 일간·일지·오행 판정은 같다', () => {
  /* 십성만 «내 기준»이라 방향이 있다. 나머지 셋은 두 사람의 관계 자체라
     순서를 뒤집어도 같아야 한다 — 안 그러면 어느 쪽을 먼저 넣느냐로 궁합이
     달라진다. */
  const x = B(1995, 3, 15, 8), y = B(1997, 7, 22, 14);
  const ab = matchSaju(x, 'male', y, 'female')!;
  const ba = matchSaju(y, 'female', x, 'male')!;
  for (const id of ['ilgan', 'ilji', 'ohaeng'] as const) {
    assert.equal(
      ab.axes.find(a => a.id === id)!.score,
      ba.axes.find(a => a.id === id)!.score,
      `${id}이 순서에 따라 달라진다`,
    );
  }
});

test('일지가 충이면 가장 낮고, 육합이면 가장 높다', () => {
  /* 자(0)-오(6)는 충, 자(0)-축(1)은 육합. 같은 일간(갑=0)으로 맞춰 두고
     일지만 바꿔 그 자리만 재는 것이다. */
  /* 일지 축은 지지만 본다 — 천간은 무엇이든 상관없다 */
  const base = findDay(d => d.branchIdx === 0);   // 일지 자
  const chung = findDay(d => d.branchIdx === 6);  // 일지 오 — 자와 충
  const hap = findDay(d => d.branchIdx === 1);    // 일지 축 — 자와 육합
  assert.ok(chung && hap && base, '표본 날짜를 못 찾았다 — 명식 계산이 바뀌었는지 보라');

  const withChung = matchSaju(B(base.year, base.month, base.day), 'male',
                              B(chung.year, chung.month, chung.day), 'female')!;
  const withHap = matchSaju(B(base.year, base.month, base.day), 'male',
                            B(hap.year, hap.month, hap.day), 'female')!;
  const iljiOf = (r: typeof withHap) => r.axes.find(a => a.id === 'ilji')!;

  assert.equal(iljiOf(withChung).score, 1, '충인데 최저점이 아니다');
  assert.equal(iljiOf(withHap).score, 5, '육합인데 최고점이 아니다');
  assert.ok(iljiOf(withChung).note.includes('충'), '충이라고 말해 주지 않는다');
  assert.ok(iljiOf(withHap).note.includes('육합'), '육합이라고 말해 주지 않는다');
});

test('일간이 상생이면 상극보다 높다', () => {
  /* 갑(목,0)과 병(화,2)은 목생화 — 상생. 갑(목,0)과 무(토,4)는 목극토 — 상극.
     일지를 같은 자(0)로 맞춰 일간만 다르게 한다. */
  const gap = findDay(d => d.stemIdx === 0 && d.branchIdx === 0);    // 갑자
  const byeong = findDay(d => d.stemIdx === 2 && d.branchIdx === 0);  // 병자
  const mu = findDay(d => d.stemIdx === 4 && d.branchIdx === 0);      // 무자
  assert.ok(gap && byeong && mu, '표본 날짜를 못 찾았다');

  const saeng = matchSaju(B(gap.year, gap.month, gap.day), 'male',
                          B(byeong.year, byeong.month, byeong.day), 'female')!;
  const geuk = matchSaju(B(gap.year, gap.month, gap.day), 'male',
                         B(mu.year, mu.month, mu.day), 'female')!;
  const s = saeng.axes.find(a => a.id === 'ilgan')!.score;
  const g = geuk.axes.find(a => a.id === 'ilgan')!.score;
  assert.ok(s > g, `상생 ${s}이 상극 ${g}보다 높지 않다`);
});

test('한쪽에 없는 오행을 다른 쪽이 채우면 그렇다고 말한다', () => {
  const r = matchSaju(B(1995, 3, 15, 8), 'male', B(1988, 11, 3, 20), 'female')!;
  const oh = r.axes.find(a => a.id === 'ohaeng')!;
  const claimed = r.aFills.length + r.bFills.length;
  if (claimed > 0) {
    assert.ok(/갖고 있습니다/.test(oh.note), '채워 준다고 하면서 설명에 안 적었다');
  }
  /* 채운다고 한 오행이 실제로 한쪽에만 있는지 — 목록과 설명이 어긋나면 거짓말이다 */
  for (const e of r.bFills) assert.ok(oh.note.includes(e), `${e}을 채운다면서 설명에 없다`);
});

test('시각을 몰라도 계산된다', () => {
  const r = matchSaju(B(1995, 3, 15, null), 'male', B(1997, 7, 22, null), 'female');
  assert.ok(r, '시각이 없으면 결과가 안 나온다');
  assert.equal(r.a.hour, null);
  assert.ok(r.total > 0);
});

test('이 검사가 실제로 문다', () => {
  /* 표본 찾기가 헛돌면 위 검사들이 «아무것도 안 재고» 통과한다 */
  const d = findDay(x => x.stemIdx === 0 && x.branchIdx === 0);
  assert.ok(d, '갑자일을 못 찾았다');

  /* 60간지의 짝 규칙 — 천간과 지지의 짝수·홀수가 맞아야 존재한다.
     이걸 모르고 「갑축」을 찾다가 검사가 멎었다. */
  assert.equal(findDay(x => x.stemIdx === 0 && x.branchIdx === 1), null, '갑축이 있다고 나온다 — 명식 계산이 깨졌다');
  const c = buildChart(B(d!.year, d!.month, d!.day), 'male');
  assert.equal(STEMS[c.day.stemIdx].kor, '갑');
  assert.equal(BRANCHES[c.day.branchIdx].kor, '자');
});

test('등급 색이 두 테마의 결과판에서 다 읽힌다', () => {
  /* 결과판 바탕이 라이트=흰색, 다크=slate-900이다. 색을 한 벌만 쓰므로 양쪽에서
     다 통과해야 한다 — 처음 골랐던 #ca8a04는 흰 바탕에서 2.94로 미달이었고,
     그건 다크에서 보고 라이트를 안 봤기 때문이다. */
  const hex = (h: string) => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
  const lum = (c: number[]) => {
    const [r, g, b] = c.map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const ratio = (a: number[], b: number[]) => {
    const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
    return (hi + 0.05) / (lo + 0.05);
  };
  /* 60px 숫자라 WCAG 대형 글자 기준 3.0 */
  const GROUNDS = { 라이트: [255, 255, 255], 다크: [15, 23, 42] };
  for (const g of MATCH_GRADES) {
    for (const [theme, bg] of Object.entries(GROUNDS)) {
      const r = ratio(hex(g.color), bg);
      assert.ok(r >= 3, `${theme}에서 «${g.label}» ${g.color}의 대비가 ${r.toFixed(2)} — 3.0 미달`);
    }
  }
});

test('총점 어디를 집어도 등급이 하나 나온다', () => {
  for (let t = 0; t <= 100; t++) {
    const g = matchGrade(t);
    assert.ok(g, `${t}점에 등급이 없다`);
    assert.ok(t >= g.min, `${t}점이 «${g.label}»(${g.min} 이상)에 잘못 들어갔다`);
  }
  assert.equal(matchGrade(100).label, '아주 잘 맞습니다');
  assert.equal(matchGrade(0).label, '부딪힘이 많은 궁합');
});
