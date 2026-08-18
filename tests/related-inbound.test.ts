import { test } from 'node:test';
import assert from 'node:assert/strict';

import { COLOR_TOOLS, relatedColorTools } from '../lib/color-tools.ts';
import { CONVERT_TOOLS, relatedConvertTools } from '../lib/convert-tools.ts';
import { DEVICE_TOOLS, relatedDeviceTools } from '../lib/device-tools.ts';
import { FOOD_TOOLS, relatedFoodTools } from '../lib/food-tools.ts';
import { GAME_TOOLS, relatedGameTools } from '../lib/game-tools.ts';
import { IMAGE_TOOLS, relatedImageTools } from '../lib/image-tools.ts';
import { SOUND_TOOLS, relatedSoundTools } from '../lib/sound-tools.ts';
import { TEXT_TOOLS, relatedTextTools } from '../lib/text-tools.ts';
import { TIME_TOOLS, relatedTimeTools } from '../lib/time-tools.ts';
import { IDIOMS, relatedIdioms } from '../lib/hanja-tools.ts';
import { rotatePick, relatedFor } from '../lib/related-rotate.ts';

/**
 * 관련 항목이 **모든 낱장을 한 번은 가리키는지** 본다.
 *
 * 열두 섹션이 모두 `[...같은갈래, ...나머지].slice(0, limit)`이었다. 늘 목록의
 * 앞쪽만 나오므로, 뒤에 붙인 항목은 나가는 링크는 있는데 들어오는 링크가 없다.
 * 재 보니 174/504가 그랬다 — 열 언어를 곱하면 천칠백 장이 사이트 안에서 아무도
 * 가리키지 않는 페이지였다.
 *
 * 이 검사가 없으면 다음에 항목을 늘릴 때 똑같은 일이 조용히 다시 생긴다.
 * 새로 넣는 것은 언제나 목록 끝에 붙기 때문이다.
 */
type WithSlug = { slug: string };
const SECTIONS: [string, WithSlug[], (slug: string) => WithSlug[]][] = [
  ['color', COLOR_TOOLS, relatedColorTools],
  ['convert', CONVERT_TOOLS, relatedConvertTools],
  ['device', DEVICE_TOOLS, relatedDeviceTools],
  ['food', FOOD_TOOLS, relatedFoodTools],
  ['game', GAME_TOOLS, relatedGameTools],
  ['image', IMAGE_TOOLS, relatedImageTools],
  ['sound', SOUND_TOOLS, relatedSoundTools],
  ['text', TEXT_TOOLS, relatedTextTools],
  ['time', TIME_TOOLS, relatedTimeTools],
  ['hanja', IDIOMS, relatedIdioms],
];

test('낱장마다 들어오는 내부 링크가 하나 이상 있다', () => {
  const bad: string[] = [];
  for (const [name, items, related] of SECTIONS) {
    const inbound = new Map(items.map(i => [i.slug, 0]));
    for (const i of items) {
      for (const r of related(i.slug)) inbound.set(r.slug, (inbound.get(r.slug) ?? 0) + 1);
    }
    const orphans = [...inbound].filter(([, n]) => n === 0).map(([s]) => s);
    if (orphans.length) bad.push(`${name}: ${orphans.length}/${items.length} (${orphans.slice(0, 4).join(', ')}…)`);
  }
  assert.deepEqual(bad, [], `사이트맵에만 있고 안에서 아무도 안 가리키는 낱장:\n  ${bad.join('\n  ')}`);
});

test('관련 항목이 자기 자신을 가리키지 않고 겹치지도 않는다', () => {
  for (const [name, items, related] of SECTIONS) {
    for (const i of items) {
      const slugs = related(i.slug).map(r => r.slug);
      assert.ok(!slugs.includes(i.slug), `${name}/${i.slug}: 자기를 가리킨다`);
      assert.equal(new Set(slugs).size, slugs.length, `${name}/${i.slug}: 같은 것을 두 번 가리킨다`);
    }
  }
});

test('관련 항목은 같은 갈래를 먼저 채운다', () => {
  /*
   * 돌려 고르더라도 갈래 우선은 지켜져야 한다 — 그게 이 목록의 쓸모다.
   * 다만 **마지막 한 칸은 고리에 내준다**(목록상 바로 다음 항목). 그 칸은
   * 갈래가 다를 수 있으므로 앞의 칸들만 본다.
   */
  const cat = (x: unknown) => (x as { category?: string; region?: string; city?: string });
  for (const [name, items, related] of SECTIONS) {
    for (const i of items.slice(0, 20)) {
      const mine = cat(i).category ?? cat(i).region ?? cat(i).city;
      if (!mine) continue;
      const got = related(i.slug);
      const head = got.slice(0, Math.max(0, got.length - 1)); // 고리 칸을 뺀다
      /*
       * 개수를 세는 대신 **차례**를 본다 — 다른 갈래가 한 번 나온 뒤에 같은 갈래가
       * 또 나오면 안 된다. 개수로 재면 "목록상 다음 항목이 마침 같은 갈래"인
       * 경우에 하나가 어긋나는데(color/palette가 그랬다), 그건 규칙 위반이 아니다.
       */
      const isMine = (r: unknown) => (cat(r).category ?? cat(r).region ?? cat(r).city) === mine;
      let sawOther = false;
      for (const r of head) {
        if (!isMine(r)) sawOther = true;
        else assert.ok(!sawOther, `${name}/${i.slug}: 다른 갈래 뒤에 같은 갈래가 또 나온다`);
      }
    }
  }
});

test('마지막 칸은 목록상 바로 다음 항목이다', () => {
  /*
   * 이 고리가 고아를 막는다. 갈래에 혼자뿐인 항목은 같은 갈래에서 받을 링크가
   * 없고, 갈래가 큰 항목들은 나머지까지 내려오지 않기 때문에 고리가 없으면
   * 아무도 안 가리키게 된다 — image의 palette가 실제로 그랬다.
   */
  const bad: string[] = [];
  for (const [name, items, related] of SECTIONS) {
    for (let n = 0; n < items.length; n++) {
      const got = related(items[n].slug);
      if (got.length === 0) continue;
      const want = items[(n + 1) % items.length].slug;
      if (got[got.length - 1].slug !== want) {
        bad.push(`${name}/${items[n].slug}: 끝이 ${got[got.length - 1].slug}, 기대는 ${want}`);
      }
    }
  }
  assert.deepEqual(bad.slice(0, 5), [], `고리가 끊겼다 (${bad.length}곳):\n  ${bad.slice(0, 5).join('\n  ')}`);
});

test('rotatePick은 자리를 넘겨도 돌아오고 개수를 지킨다', () => {
  const pool = ['a', 'b', 'c', 'd'];
  assert.deepEqual(rotatePick(pool, 0, 2), ['a', 'b']);
  assert.deepEqual(rotatePick(pool, 3, 3), ['d', 'a', 'b']);
  assert.deepEqual(rotatePick(pool, 7, 2), ['d', 'a'], '길이보다 큰 자리는 나머지로 돌아온다');
  assert.deepEqual(rotatePick(pool, -1, 2), ['d', 'a'], '음수 자리도 돌아온다');
  assert.deepEqual(rotatePick(pool, 0, 99), pool, '풀보다 많이 달라고 해도 한 바퀴까지만');
  assert.deepEqual(rotatePick([], 0, 3), []);
});

test('relatedFor는 갈래가 모자라면 나머지로 채운다', () => {
  const all = [
    { slug: 'a', c: 'x' }, { slug: 'b', c: 'x' },
    { slug: 'c', c: 'y' }, { slug: 'd', c: 'y' }, { slug: 'e', c: 'y' },
  ];
  const got = relatedFor(all, all[0], t => t.c === 'x', 3);
  assert.equal(got.length, 3);
  assert.equal(got[got.length - 1].slug, 'b', '마지막 칸은 목록상 다음 항목(b)이다');
  assert.ok(!got.some(g => g.slug === 'a'), '자기는 안 들어간다');
  assert.equal(new Set(got.map(g => g.slug)).size, got.length, '같은 것이 두 번 나오지 않는다');
});

test('갈래에 혼자뿐인 항목도 들어오는 링크를 받는다', () => {
  /*
   * 고리를 넣은 까닭 그 자체를 짚는다. z는 자기 갈래에 혼자라 같은 갈래에서
   * 받을 링크가 없고, x 갈래 셋은 자기들끼리 자리가 차서 나머지까지 안 내려온다.
   */
  const all = [
    { slug: 'a', c: 'x' }, { slug: 'b', c: 'x' }, { slug: 'c', c: 'x' }, { slug: 'd', c: 'x' },
    { slug: 'z', c: 'lonely' },
  ];
  const inbound = new Map(all.map(i => [i.slug, 0]));
  for (const i of all) {
    for (const r of relatedFor(all, i, t => t.c === i.c, 3)) inbound.set(r.slug, inbound.get(r.slug)! + 1);
  }
  assert.ok(inbound.get('z')! > 0, 'z를 아무도 안 가리킨다');
  assert.deepEqual([...inbound].filter(([, n]) => n === 0), [], '고아가 있다');
});
