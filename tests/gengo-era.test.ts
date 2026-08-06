/**
 * 일본 연호 — 더하기 하나를 다른 길로 되짚는다.
 *
 * 서기로 옮기는 규칙은 연호마다 정해진 수를 더하는 것뿐이라 검사할 것이
 * 없어 보이지만, 정작 틀리기 쉬운 자리는 연호가 바뀌는 해다. 그래서 이
 * 검사는 값보다 **이어짐**을 본다 — 앞 연호의 마지막 해와 다음 연호의
 * 원년이 같은 서기에 앉는지, 개원이 즉일이었는지 익일이었는지.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CELLS, ERAS, cellOf, eraOf, slugOf } from '../lib/gengo/list.ts';
import { atEra, atGregorian, eraYearOf, gengoFacts, gregorianOf } from '../lib/gengo/facts.ts';

const facts = (slug: string) => {
  const c = cellOf(slug);
  assert.ok(c, `${slug} 칸이 없다`);
  return gengoFacts(c);
};

test('칸은 연호마다 실제로 있었던 해 전부', () => {
  assert.equal(ERAS.length, 5);
  // 45 + 15 + 64 + 31 + 8
  assert.equal(CELLS.length, ERAS.reduce((n, e) => n + e.last, 0));
  assert.equal(CELLS.length, 163);
  assert.equal(new Set(CELLS.map(slugOf)).size, 163);
  for (const c of CELLS) assert.deepEqual(cellOf(slugOf(c)), c, slugOf(c));
  // 연차는 1부터 마지막까지 빈틈이 없다
  for (const e of ERAS) {
    const years = atEra(e.key).map(c => c.year);
    assert.deepEqual(years, Array.from({ length: e.last }, (_, i) => i + 1), e.key);
  }
  assert.equal(cellOf('meiji-46'), undefined);
  assert.equal(cellOf('showa-0'), undefined);
  assert.equal(cellOf('keio-1'), undefined);
});

test('서기는 연차에 연호의 기준 수를 더한 값', () => {
  // 널리 쓰이는 자리 — 기준 수 다섯
  assert.equal(eraOf('meiji')?.base, 1867);
  assert.equal(eraOf('taisho')?.base, 1911);
  assert.equal(eraOf('showa')?.base, 1925);
  assert.equal(eraOf('heisei')?.base, 1988);
  assert.equal(eraOf('reiwa')?.base, 2018);
  for (const c of CELLS) {
    const e = eraOf(c.era)!;
    const f = gengoFacts(c);
    assert.equal(f.gregorian, e.base + c.year, f.slug);
    // 되돌리면 연차가 나온다
    assert.equal(eraYearOf(e.base, f.gregorian), c.year, f.slug);
  }
  // 자주 찾는 해들
  assert.equal(facts('showa-64').gregorian, 1989);
  assert.equal(facts('heisei-31').gregorian, 2019);
  assert.equal(facts('reiwa-8').gregorian, 2026);
  assert.equal(facts('meiji-1').gregorian, 1868);
});

test('연호는 끊기지 않고 이어진다', () => {
  for (let i = 1; i < ERAS.length; i++) {
    const before = ERAS[i - 1];
    const now = ERAS[i];
    // 앞 연호의 마지막 해와 이 연호의 원년이 같은 서기에 앉는다
    assert.equal(
      gregorianOf(before.base, before.last),
      gregorianOf(now.base, 1),
      `${before.key} → ${now.key}`,
    );
    // 기준 수의 차이가 앞 연호의 길이에서 하나를 뺀 값이다
    assert.equal(now.base - before.base, before.last - 1, `${before.key} → ${now.key}`);
  }
});

test('한 해에 연호가 둘 앉는 자리는 넷', () => {
  const doubled = CELLS.filter(c => gengoFacts(c).overlap !== null);
  // 겹치는 자리마다 칸이 둘씩이므로 여덟 칸이 나온다
  assert.equal(doubled.length, 8);
  const years = [...new Set(doubled.map(c => gengoFacts(c).gregorian))].sort();
  assert.deepEqual(years, [1912, 1926, 1989, 2019]);
  // 서로를 가리킨다
  for (const c of doubled) {
    const f = gengoFacts(c);
    assert.ok(f.overlap);
    const back = facts(f.overlap.slug);
    assert.equal(back.overlap?.slug, f.slug, f.slug);
    assert.equal(back.gregorian, f.gregorian, f.slug);
  }
  assert.equal(facts('meiji-45').overlap?.slug, 'taisho-1');
  assert.equal(facts('reiwa-1').overlap?.slug, 'heisei-31');
  // 겹치지 않는 해는 하나뿐이다
  assert.equal(facts('heisei-12').overlap, null);
});

test('즉일 개원과 익일 개원이 갈린다', () => {
  const day = 24 * 60 * 60 * 1000;
  for (let i = 1; i < ERAS.length; i++) {
    const before = ERAS[i - 1];
    const now = ERAS[i];
    assert.ok(before.until, before.key);
    const gap = Date.parse(now.from) - Date.parse(before.until);
    if (now.sameDay) {
      // 즉일 개원 — 그 하루가 두 연호에 함께 든다
      assert.equal(gap, 0, `${before.key} → ${now.key}`);
      assert.equal(now.from, before.until, `${before.key} → ${now.key}`);
    } else {
      // 익일 개원 — 앞 연호가 끝난 다음 날부터다
      assert.equal(gap, day, `${before.key} → ${now.key}`);
    }
  }
  // 大正과 昭和는 즉일, 平成과 令和는 익일이다
  assert.equal(eraOf('taisho')?.sameDay, true);
  assert.equal(eraOf('showa')?.sameDay, true);
  assert.equal(eraOf('heisei')?.sameDay, false);
  assert.equal(eraOf('reiwa')?.sameDay, false);
  // 겹침이 전하는 값도 그 구분을 그대로 든다
  assert.equal(facts('meiji-45').overlap?.sameDay, true);
  assert.equal(facts('showa-64').overlap?.sameDay, false);
});

test('서기로 되짚으면 그 해의 연호가 나온다', () => {
  assert.deepEqual(atGregorian(2000).map(slugOf), ['heisei-12']);
  assert.deepEqual(atGregorian(1912).map(slugOf), ['meiji-45', 'taisho-1']);
  assert.deepEqual(atGregorian(1989).map(slugOf), ['showa-64', 'heisei-1']);
  // 연호가 시작되기 전과 아직 오지 않은 해에는 아무것도 없다
  assert.deepEqual(atGregorian(1867), []);
  assert.deepEqual(atGregorian(2100), []);
  // 모든 칸은 자기 서기로 되짚으면 자기를 포함한다
  for (const c of CELLS) {
    const f = gengoFacts(c);
    assert.ok(atGregorian(f.gregorian).some(x => slugOf(x) === f.slug), f.slug);
  }
});

test('앞뒤 칸은 연호를 넘어서도 이어진다', () => {
  const f = facts('meiji-45');
  assert.equal(f.next?.slug, 'taisho-1');
  assert.equal(facts('taisho-1').prev?.slug, 'meiji-45');
  assert.equal(facts('heisei-1').prev?.slug, 'showa-64');
  // 양 끝은 더 갈 곳이 없다
  assert.equal(facts('meiji-1').prev, null);
  assert.equal(facts('reiwa-8').next, null);
  // 이어 가면 서기가 한 해씩 늘거나 제자리다(겹치는 해에서 제자리다)
  for (const c of CELLS) {
    const g = gengoFacts(c);
    if (!g.next) continue;
    const step = facts(g.next.slug).gregorian - g.gregorian;
    assert.ok(step === 1 || step === 0, `${g.slug} ${step}`);
  }
});
