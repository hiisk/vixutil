/**
 * 이웃 고르기 — 여덟 도구 섹션에 아무도 안 가리키는 페이지가 없어야 한다.
 *
 * ── 2026-08-12에 무엇이 있었나 ────────────────────────────
 * 여덟 섹션(color·game·image·sound·text·time·food·device)이 모두
 * `[...same, ...rest].slice(0, count)`였다. 즉 같은 갈래의 **앞에서 넉 개**를
 * 늘 뽑았다. 그래서
 *
 *   - 갈래에 항목이 다섯 개를 넘으면 뒤쪽이 아무에게도 안 걸렸고
 *   - **갈래에 혼자 있는 항목은 어느 쪽에서도 안 걸렸다**(/image의 palette).
 *     다들 제 갈래로 넉 칸을 다 써 버려 "다른 갈래" 자리가 아예 생기지 않았다
 *
 * 열두 도구가 그 상태였다. 열 언어이므로 **120쪽이 들어오는 링크 0**이었다.
 * 화면은 멀쩡했다 — 관련 도구 칸에 넉 개가 잘 떠 있었으니 눈으로는 알 수 없고,
 * "누가 나를 가리키나"를 세어 봐야 드러난다.
 *
 * 고친 방법은 lib/related-window.ts 하나로 모으고, 자기 자리 다음부터 원형으로
 * 감으면서 **마지막 한 칸을 다른 갈래에 남겨 두는** 것이다.
 *
 * 이 검사가 지키는 것: 섹션에 도구를 더하거나 고르는 방식을 되돌리면 걸린다.
 * 둘 다 빌드는 멀쩡히 끝난다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { relatedWindow } from '../lib/related-window.ts';
import { colorToolsIntl, relatedColorToolsIntl } from '../lib/color-tools-intl.ts';
import { gameToolsIntl, relatedGameToolsIntl } from '../lib/game-tools-intl.ts';
import { imageToolsIntl, relatedImageToolsIntl } from '../lib/image-tools-intl.ts';
import { soundToolsIntl, relatedSoundToolsIntl } from '../lib/sound-tools-intl.ts';
import { textToolsIntl, relatedTextToolsIntl } from '../lib/text-tools-intl.ts';
import { timeToolsIntl, relatedTimeToolsIntl } from '../lib/time-tools-intl.ts';
import { foodToolsIntl, relatedFoodToolsIntl } from '../lib/food-tools-intl.ts';
import { deviceToolsIntl, relatedDeviceToolsIntl } from '../lib/device-tools-intl.ts';

type Tool = { slug: string; category?: string };
type Section = {
  name: string;
  list: (lang: string) => Tool[];
  related: (lang: string, slug: string, count?: number) => Tool[];
};

/*
 * 언어마다 목록이 새로 만들어지므로 대표로 셋을 본다.
 *
 * 한국어는 넣지 않는다 — 이 여덟 섹션은 **아홉 언어용**이고 한국어는 별도
 * 페이지를 쓴다. 처음에 'ko'를 넣었더니 COPY['ko']가 없어 목록 만들기 자체가
 * 터졌다. 검사가 잡은 것은 고립된 도구가 아니라 내 잘못된 가정이었다.
 */
const LANGS = ['en', 'ja', 'de'];

const SECTIONS: Section[] = [
  { name: 'color', list: colorToolsIntl as Section['list'], related: relatedColorToolsIntl as Section['related'] },
  { name: 'game', list: gameToolsIntl as Section['list'], related: relatedGameToolsIntl as Section['related'] },
  { name: 'image', list: imageToolsIntl as Section['list'], related: relatedImageToolsIntl as Section['related'] },
  { name: 'sound', list: soundToolsIntl as Section['list'], related: relatedSoundToolsIntl as Section['related'] },
  { name: 'text', list: textToolsIntl as Section['list'], related: relatedTextToolsIntl as Section['related'] },
  { name: 'time', list: timeToolsIntl as Section['list'], related: relatedTimeToolsIntl as Section['related'] },
  { name: 'food', list: foodToolsIntl as Section['list'], related: relatedFoodToolsIntl as Section['related'] },
  { name: 'device', list: deviceToolsIntl as Section['list'], related: relatedDeviceToolsIntl as Section['related'] },
];

test('여덟 섹션에 들어오는 링크가 0인 도구가 없다', () => {
  const orphans: string[] = [];
  for (const lang of LANGS) {
    for (const s of SECTIONS) {
      const all = s.list(lang);
      const inbound = new Map<string, number>(all.map(t => [t.slug, 0]));
      for (const t of all) {
        for (const r of s.related(lang, t.slug)) inbound.set(r.slug, (inbound.get(r.slug) ?? 0) + 1);
      }
      for (const [slug, n] of inbound) if (n === 0) orphans.push(`${lang}/${s.name}/${slug}`);
    }
  }
  assert.deepEqual(
    orphans, [],
    `아무도 가리키지 않는 도구 ${orphans.length}개 — 크롤러가 사이트맵으로만 닿는다:\n  ` + orphans.join('\n  '),
  );
});

test('갈래에 혼자 있는 도구도 링크를 받는다', () => {
  /*
   * 이것이 palette를 놓쳤던 자리다. 갈래에 혼자면 제 갈래에서 오는 링크가
   * 있을 수 없으므로, 남의 "다른 갈래" 칸에 들어가는 것 말고는 길이 없다.
   */
  let checked = 0;
  for (const s of SECTIONS) {
    const all = s.list('en');
    const lonely = all.filter(t => all.filter(x => x.category === t.category).length === 1);
    for (const t of lonely) {
      const inbound = all.filter(x => s.related('en', x.slug).some(r => r.slug === t.slug)).length;
      assert.ok(inbound > 0, `${s.name}/${t.slug}: 갈래에 혼자인데 들어오는 링크가 0이다`);
      checked++;
    }
  }
  assert.ok(checked > 0, '갈래에 혼자인 도구가 없다 — 이 검사가 아무것도 안 본다');
});

test('이웃 칸이 늘 채워지고 자기가 안 들어간다', () => {
  const bad: string[] = [];
  for (const s of SECTIONS) {
    const all = s.list('en');
    for (const t of all) {
      const rel = s.related('en', t.slug);
      const want = Math.min(4, all.length - 1);
      if (rel.length !== want) bad.push(`${s.name}/${t.slug}: 이웃이 ${rel.length}개 (${want}개여야)`);
      if (rel.some(r => r.slug === t.slug)) bad.push(`${s.name}/${t.slug}: 자기를 이웃으로 골랐다`);
      if (new Set(rel.map(r => r.slug)).size !== rel.length) bad.push(`${s.name}/${t.slug}: 같은 이웃이 두 번`);
    }
  }
  assert.deepEqual(bad, [], bad.join('\n  '));
});

test('이웃은 같은 갈래를 먼저 채우되 한 칸은 밖에 남긴다', () => {
  for (const s of SECTIONS) {
    const all = s.list('en');
    for (const t of all) {
      const rel = s.related('en', t.slug);
      const same = rel.filter(r => r.category === t.category).length;
      const sameAvailable = all.filter(x => x.slug !== t.slug && x.category === t.category).length;
      // 같은 갈래가 넉넉하면 세 칸까지 채우고 한 칸은 다른 갈래다
      const want = Math.min(sameAvailable, sameAvailable >= 4 ? 3 : 4);
      assert.equal(same, want, `${s.name}/${t.slug}: 같은 갈래 ${same}개 (${want}개여야)`);
    }
  }
});

test('원형으로 감는 규칙 자체를 되짚는다', () => {
  /* 헬퍼만 따로 본다 — 섹션 자료와 무관하게 규칙이 맞는지 */
  const all = [1, 2, 3, 4, 5];
  assert.deepEqual(relatedWindow(all, 1, 3), [2, 3, 4]);
  assert.deepEqual(relatedWindow(all, 4, 3), [5, 1, 2], '끝에서 앞으로 감아 돌지 않는다');
  assert.deepEqual(relatedWindow(all, 5, 3), [1, 2, 3]);
  // 목록에 없는 항목은 앞에서부터
  assert.deepEqual(relatedWindow(all, 99, 2), [1, 2]);
  // 경계
  assert.deepEqual(relatedWindow(all, 1, 0), []);
  assert.deepEqual(relatedWindow([], 1, 3), []);
  assert.deepEqual(relatedWindow([7], 7, 3), [], '자기 하나뿐이면 이웃이 없다');

  // 모두가 정확히 count번씩 남의 목록에 들어간다
  const N = 9, C = 4;
  const items = Array.from({ length: N }, (_, i) => i);
  const seen = new Map(items.map(i => [i, 0]));
  for (const i of items) for (const j of relatedWindow(items, i, C)) seen.set(j, (seen.get(j) ?? 0) + 1);
  assert.deepEqual([...new Set(seen.values())], [C], `고르게 안 퍼졌다: ${[...seen.values()].join(' ')}`);
});
