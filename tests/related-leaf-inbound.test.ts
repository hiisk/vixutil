import { test } from 'node:test';
import assert from 'node:assert/strict';

import { GLYPHS } from '../lib/glyph/list.ts';
import { relatedGlyphs } from '../lib/glyph/facts.ts';
import { EXTS } from '../lib/ext/list.ts';
import { relatedExts } from '../lib/ext/facts.ts';
import { HTTP_ITEMS } from '../lib/http/list.ts';
import { relatedHttp } from '../lib/http/facts.ts';
import { CSS_PROPS } from '../lib/css/props.ts';
import { relatedProps } from '../lib/css/facts.ts';
import { TAGS } from '../lib/html/tags.ts';
import { relatedTags } from '../lib/html/facts.ts';
import { IMG_SIZES } from '../lib/imgsize/list.ts';
import { sameKind } from '../lib/imgsize/facts.ts';
import { MUSIC_ITEMS, relatedItems } from '../lib/music/catalog.ts';

/**
 * 자료 섹션의 낱장이 **아무에게도 안 가리켜지는지** 본다.
 *
 * ── 무엇이 있었나 (2026-08-13) ────────────────────────────────
 * 이웃을 고를 때 `filter(...).slice(0, limit)`을 쓰면 목록 **앞쪽만** 서로
 * 가리키고 뒤에 붙인 것은 들어오는 링크가 0이 된다. 화면은 멀쩡하다 —
 * 관련 항목 칸이 꽉 차 있으니 눈으로는 알 수 없다.
 *
 * 이 저장소에서 같은 병이 여러 번 났고, 2026-08-12에 `lib/related-window.ts`로
 * 고치는 방법을 세웠다. 그런데 **그때 옮긴 것은 아홉 언어 도구 여덟 섹션뿐**이라,
 * 자료 섹션 일곱은 옛 방식 그대로 남아 있었다. 세어 보니 이랬다.
 *
 *   text/char 218/423 · ext 130/266 · http 118/195 · css 78/237 ·
 *   music 63/211 · html 52/151 · image/size 44/177   = 703장
 *
 * 열 언어에 다 있는 섹션이므로 실제로는 그 열 배다.
 *
 * ── 왜 기존 검사가 못 잡았나 ──────────────────────────────────
 * 세 검사가 각각 **자기가 아는 섹션만** 봤다 — related-inbound는 relatedFor를
 * 쓰는 12섹션, related-window는 relatedWindow를 쓰는 8섹션, related-pick-inbound는
 * pickRelated를 쓰는 4섹션. 위 일곱은 셋 중 어디에도 없었다.
 *
 * 그래서 이 파일은 **고르는 방법이 아니라 결과**로 센다. 새 섹션이 어떤 방법을
 * 쓰든 여기 한 줄만 더하면 같은 병을 잡는다.
 */

type Case = {
  name: string;
  /** 모든 낱장의 식별자 */
  ids: string[];
  /** 그 낱장이 가리키는 이웃들의 식별자 */
  neighbors: (id: string) => string[];
};

const CASES: Case[] = [
  {
    name: 'text/char', ids: GLYPHS.map(g => g.slug),
    neighbors: id => relatedGlyphs(id).map(g => g.slug),
  },
  {
    name: 'ext', ids: EXTS.map(x => x.ext),
    neighbors: id => relatedExts(id),
  },
  {
    name: 'http', ids: HTTP_ITEMS.map(x => x.slug),
    neighbors: id => relatedHttp(id),
  },
  {
    name: 'css', ids: CSS_PROPS.map(p => p.name),
    neighbors: id => relatedProps(id),
  },
  {
    name: 'html', ids: TAGS.map(t => t.name),
    neighbors: id => relatedTags(id),
  },
  {
    name: 'image/size', ids: IMG_SIZES.map(x => x.slug),
    neighbors: id => sameKind(id).map(x => x.slug),
  },
  {
    name: 'music', ids: MUSIC_ITEMS.map(x => x.slug),
    neighbors: id => relatedItems(id).map(x => x.slug),
  },
];

for (const c of CASES) {
  test(`${c.name} — 들어오는 링크가 0인 낱장이 없다`, () => {
    assert.ok(c.ids.length > 100, `${c.name} 목록이 ${c.ids.length}개뿐이다 — 세는 방식이 깨졌다`);

    const inbound = new Map(c.ids.map(id => [id, 0]));
    for (const id of c.ids) {
      for (const n of c.neighbors(id)) {
        if (n !== id && inbound.has(n)) inbound.set(n, inbound.get(n)! + 1);
      }
    }
    const orphans = [...inbound].filter(([, n]) => n === 0).map(([id]) => id);
    assert.deepEqual(
      orphans.slice(0, 8), [],
      `${c.name}에 들어오는 링크가 0인 낱장 ${orphans.length}개 — 사이트맵에만 있는 상태가 된다. ` +
      'lib/related-window.ts의 relatedWindow/relatedBySlug로 옮겨라',
    );
  });
}

test('이웃이 자기 자신을 넣지 않는다', () => {
  /* 원형으로 감을 때 자기를 빼는 것을 잊으면 한 칸이 늘 낭비된다 */
  for (const c of CASES) {
    for (const id of c.ids.slice(0, 30)) {
      assert.ok(!c.neighbors(id).includes(id), `${c.name}/${id}가 자기 자신을 이웃으로 든다`);
    }
  }
});
