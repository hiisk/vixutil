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
import { COUNTRIES, relatedCountries } from '../lib/country-tools.ts';
import { IDIOMS, relatedIdioms } from '../lib/hanja-tools.ts';
import { METRO_LINES, relatedLines } from '../lib/metro-lines.ts';
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
  ['country', COUNTRIES, relatedCountries],
  ['hanja', IDIOMS, relatedIdioms],
  ['metro', METRO_LINES, relatedLines],
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
  // 돌려 고르더라도 갈래 우선은 지켜져야 한다 — 그게 이 목록의 쓸모다
  const cat = (x: unknown) => (x as { category?: string; region?: string; city?: string });
  for (const [name, items, related] of SECTIONS) {
    for (const i of items.slice(0, 20)) {
      const mine = cat(i).category ?? cat(i).region ?? cat(i).city;
      if (!mine) continue;
      const sameCount = items.filter(x => (cat(x).category ?? cat(x).region ?? cat(x).city) === mine).length - 1;
      const got = related(i.slug);
      const wantSame = Math.min(sameCount, got.length);
      const headSame = got.slice(0, wantSame)
        .every(r => (cat(r).category ?? cat(r).region ?? cat(r).city) === mine);
      assert.ok(headSame, `${name}/${i.slug}: 앞쪽이 같은 갈래가 아니다`);
    }
  }
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
  assert.equal(got[0].slug, 'b', '같은 갈래가 먼저다');
  assert.ok(!got.some(g => g.slug === 'a'), '자기는 안 들어간다');
});
