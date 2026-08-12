/**
 * 계산기끼리 서로 이어져 있는지 본다 — 들어오는 링크가 0인 페이지가 없어야 한다.
 *
 * ── 2026-08-12에 무엇이 있었나 ────────────────────────────
 * `getRelatedCalcs`가 분류의 **앞에서 여섯 개**를 늘 뽑았다. 그래서 항목이
 * 일곱 개를 넘는 분류에서는 일곱 번째부터 형제에게서 들어오는 링크가 0이었다.
 *
 *   141개 중 73개(52%)가 그 상태였다 — 퇴직금·실업급여·육아휴직 급여처럼
 *   검색량이 큰 페이지가 거기 들어 있었다.
 *
 * 화면은 멀쩡했다. 관련 계산기 칸에 여섯 개가 잘 떠 있었으니 눈으로는 알 수
 * 없었다. 드러나는 것은 "누가 나를 가리키나"를 세어 봤을 때뿐이다.
 *
 * 들어오는 링크가 없는 페이지는 크롤러가 사이트맵으로만 닿는다. 사이트맵은
 * 그 주소가 **있다**는 것만 말해 주고 **중요하다**고는 말해 주지 않는다.
 *
 * 이 검사가 지키는 것: 새 계산기를 분류 뒤에 붙이거나 이웃 고르는 방식을
 * 되돌리면 걸린다. 둘 다 빌드는 멀쩡히 끝난다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CATS, getRelatedCalcs } from '../lib/calculator-catalog.ts';

const LIMIT = 6;
const ALL = CATS.flatMap(c => c.calcs);

/** 각 계산기를 몇 곳이 가리키는가 */
function inboundCounts(limit = LIMIT): Map<string, number> {
  const n = new Map<string, number>(ALL.map(c => [c.href, 0]));
  for (const c of ALL) {
    for (const r of getRelatedCalcs(c.href, limit)) n.set(r.href, (n.get(r.href) ?? 0) + 1);
  }
  return n;
}

test('들어오는 링크가 0인 계산기가 없다', () => {
  const counts = inboundCounts();
  const orphans = [...counts].filter(([, n]) => n === 0).map(([h]) => h.replace('/calculator/', ''));
  assert.deepEqual(
    orphans, [],
    `아무도 가리키지 않는 계산기 ${orphans.length}개 — 크롤러가 사이트맵으로만 닿는다:\n  ` + orphans.join(' '),
  );
});

test('한 분류 안에서 링크가 고르게 퍼진다', () => {
  /*
   * 원형으로 감으면 항목이 limit보다 많은 분류에서는 **모두 정확히 limit개**의
   * 형제 목록에 들어간다. 앞에서 N개를 뽑는 방식으로 되돌리면 앞쪽에 몰리고
   * 뒤쪽이 0이 되므로, 최댓값과 최솟값의 차이로 잡는다.
   *
   * 세는 것은 **같은 분류에서 오는 링크만**이다. 처음에 전체 링크를 셌더니
   * 직장인 분류가 6~18로 나와 검사가 실패했는데, 그것은 버그가 아니라
   * 인기(hot) 계산기가 작은 분류의 보충 자리에서도 링크를 받기 때문이었다.
   * 원형으로 감는 규칙이 지키는 것은 형제 사이의 고르기이므로 그것만 본다.
   */
  for (const cat of CATS) {
    if (cat.calcs.length <= LIMIT + 1) continue;   // 작은 분류는 hot 보충이 섞인다
    const own = new Set(cat.calcs.map(c => c.href));
    const got = new Map<string, number>(cat.calcs.map(c => [c.href, 0]));
    for (const c of cat.calcs) {
      for (const r of getRelatedCalcs(c.href, LIMIT)) {
        if (own.has(r.href)) got.set(r.href, (got.get(r.href) ?? 0) + 1);
      }
    }
    const counts = [...got.values()];
    const min = Math.min(...counts);
    const max = Math.max(...counts);
    assert.equal(max, LIMIT, `${cat.label}(${cat.calcs.length}개): 한 항목이 ${max}번 걸렸다`);
    assert.equal(min, LIMIT, `${cat.label}(${cat.calcs.length}개): 형제 링크가 ${min}~${max}로 쏠렸다`);
  }
});

test('이웃 목록에 자기가 들어가지 않는다', () => {
  /* 자기 자신을 가리키면 링크 하나를 헛되게 쓴다 — 원형으로 감을 때 나기 쉽다 */
  const self: string[] = [];
  for (const c of ALL) {
    if (getRelatedCalcs(c.href, LIMIT).some(r => r.href === c.href)) self.push(c.href);
  }
  assert.deepEqual(self, [], '자기를 이웃으로 고른 계산기다');
});

test('이웃이 겹치지 않고 개수가 채워진다', () => {
  const bad: string[] = [];
  for (const c of ALL) {
    const rel = getRelatedCalcs(c.href, LIMIT);
    const hrefs = rel.map(r => r.href);
    if (new Set(hrefs).size !== hrefs.length) bad.push(`${c.href}: 같은 이웃이 두 번`);
    // 전체가 LIMIT보다 많으므로 여섯 개가 늘 채워져야 한다
    if (rel.length !== LIMIT) bad.push(`${c.href}: 이웃이 ${rel.length}개뿐`);
  }
  assert.deepEqual(bad, [], bad.join('\n  '));
});

test('이웃은 같은 분류를 먼저 채운다', () => {
  /*
   * 인기 계산기로 보충하는 것은 분류가 작을 때만이어야 한다. 같은 분류에
   * 여섯 개가 남아 있는데도 다른 분류가 섞이면 주제가 흐려진다.
   */
  for (const cat of CATS) {
    if (cat.calcs.length < LIMIT + 1) continue;
    for (const c of cat.calcs) {
      const rel = getRelatedCalcs(c.href, LIMIT);
      const outside = rel.filter(r => !cat.calcs.some(x => x.href === r.href));
      assert.deepEqual(
        outside.map(r => r.href), [],
        `${c.href}: 같은 분류에 자리가 있는데 밖에서 ${outside.length}개를 끌어왔다`,
      );
    }
  }
});

test('작은 분류는 인기 계산기로 채운다', () => {
  /* 항목이 여섯 개 미만인 분류에서도 이웃 칸이 비지 않아야 한다 */
  const small = CATS.filter(c => c.calcs.length <= LIMIT);
  assert.ok(small.length > 0, '작은 분류가 없다 — 이 검사가 아무것도 안 본다');
  for (const cat of small) {
    for (const c of cat.calcs) {
      assert.equal(getRelatedCalcs(c.href, LIMIT).length, LIMIT, `${c.href}: 이웃 칸이 비었다`);
    }
  }
});
