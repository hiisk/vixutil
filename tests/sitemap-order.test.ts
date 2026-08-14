/**
 * 사이트맵을 자르는 자리가 크롤 예산을 어디에 쓰는지 정한다 — 파일 하나 = 언어 하나.
 *
 * ── 서치 콘솔이 알려 준 것 (2026-08-12) ────────────────────────
 * `/sitemap.xml`: 발견된 페이지 **50,000**, 그 뒤로 다시 읽지 않음.
 * 구글은 사이트맵을 **앞에서부터** 읽고 제 예산에서 끊는다. 그때 읽힌 5만 개를
 * 세어 보니 열 언어에 얇게 퍼져 한국어는 19,903개 중 5,218개(26%)뿐이었고,
 * 끊긴 자리는 `fr/game/poker/k9s`처럼 값만 바꿔 찍은 표였다.
 *
 * 주소를 빼는 것은 노출을 포기하는 것이라 하지 않았다. 대신 자르는 자리를 언어에
 * 맞췄다 — /sitemap.xml이 한국어 전부이고, /sitemap2.xml부터가 아홉 언어다. 얻는 것이 둘이다:
 * 구글이 첫 조각만 읽어도 한국어가 다 들어가고, **서치 콘솔이 파일별 색인 현황을
 * 보여 주므로** 언어별 색인율을 바로 읽을 수 있다.
 *
 * 이 검사가 지키는 것: 새 섹션을 더하면서 자르는 층을 건드리면 조용히 예전으로
 * 돌아간다. 사이트맵은 여전히 잘 만들어지고 개수도 같으므로 아무도 눈치채지
 * 못한다 — 다음 크롤에서 한국어가 다시 뒤로 밀릴 뿐이다.
 *
 * app/sitemap.ts는 @/ 별칭을 써서 node가 직접 못 읽는다. 그래서 **구운 조각을**
 * 읽는다 — 구글이 실제로 받는 것과 같은 파일이다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { sitemapChunkFiles } from './app-path.ts';

const CHUNK_LIMIT = 50_000;   // 사이트맵 규약의 한 파일 한도

const INTL = new Set(['en', 'es', 'pt-br', 'ja', 'de', 'fr', 'hi', 'zh-hans', 'zh-hant']);

/**
 * 구운 사이트맵 파일을 자리 순서로 읽는다 — sitemap.xml(0) · sitemap2.xml(1) …
 *
 * 조각은 /sitemap.xml 의 **형제**다. generateSitemaps를 쓰면 /sitemap/0.xml 밑으로
 * 내려가는데, 구글이 이미 등록해 둔 주소는 /sitemap.xml이므로 그 자리에 실제
 * 사이트맵(한국어)이 오게 두었다(까닭은 app/sitemap.ts).
 */
function chunks(): { id: string; urls: string[] }[] {
  return sitemapChunkFiles()
    .map(p => ({
      id: p.replace(/\.body$/, '').replace(/.*\//, ''),
      urls: [...readFileSync(p, 'utf8').matchAll(/<loc>https:\/\/vixutil\.com\/?([^<]*)<\/loc>/g)]
        .map(m => m[1]),
    }))
    .filter(c => c.urls.length > 0);
}

const built = chunks();
const skip = built.length ? false : '빌드 산출물 없음 — npm run build 필요';
const flat = built.flatMap(c => c.urls);
const langOf = (p: string) => {
  const first = p.split('/')[0];
  return INTL.has(first) ? first : 'ko';
};

/** 조각 → 그 안에 든 언어들 */
const langsIn = (c: { urls: string[] }) => new Set(c.urls.map(langOf));

test('조각 하나에 언어 하나만 든다', { skip }, () => {
  /*
   * 이것이 서치 콘솔에서 언어별 색인율을 읽을 수 있게 하는 조건이다. 45,000개씩
   * 기계적으로 자르면 조각마다 언어가 섞여 그 수치가 아무것도 말해 주지 않는다.
   */
  const mixed = built
    .map(c => ({ id: c.id, langs: [...langsIn(c)] }))
    .filter(x => x.langs.length > 1);
  assert.deepEqual(mixed.map(x => `${x.id}: ${x.langs.join(' · ')}`), [], '파일에 언어가 섞였다');
});

test('언어가 정해진 순서로, 한 언어의 조각은 붙어서 나온다', { skip }, () => {
  /*
   * ── 2026-08-14에 순서를 바꿨다 ────────────────────────────
   * 앞자리가 곧 우선순위다. 구글은 사이트맵을 앞에서부터 읽고 제 예산에서 끊는다.
   * 국외 유입이 먼저가 되었으므로 en을 첫 조각으로 올리고 ko를 맨 뒤로 내렸다.
   *
   * 번호가 아니라 **차례**를 본다. 한 언어가 45,000을 넘으면 조각을 여럿 갖고
   * 뒤 언어가 밀리는데, 그때도 언어끼리 섞이거나 앞뒤로 찢어지면 안 된다.
   */
  const ORDER = ['en', 'es', 'pt-br', 'de', 'fr', 'ja', 'zh-hans', 'zh-hant', 'hi', 'ko'];
  const seq = built.map(c => [...langsIn(c)]).filter(l => l.length === 1).map(l => l[0]);
  /* 같은 언어가 연달아 나온 것을 한 칸으로 줄인다 */
  const collapsed = seq.filter((l, i) => l !== seq[i - 1]);
  assert.deepEqual(collapsed, ORDER,
    `언어 차례가 어긋났다 — 나온 차례: ${collapsed.join(' · ')}`);
  /* 줄이기 전에 같은 언어가 두 군데로 흩어져 있으면 위에서 안 잡힌다 */
  assert.equal(new Set(collapsed).size, collapsed.length, '한 언어가 앞뒤로 찢어졌다');
});

test('/sitemap.xml이 영어다 — 앞자리가 우선순위다', { skip }, () => {
  /* 국외 유입이 먼저다. 구글이 첫 조각만 읽어도 영어가 한 장도 빠지지 않아야 한다 */
  assert.ok(built.length > 0, '사이트맵 파일이 없다');
  assert.equal(built[0].id, 'sitemap.xml', `첫 자리가 ${built[0].id}이다 — /sitemap.xml이어야 한다`);
  assert.deepEqual([...langsIn(built[0])], ['en'], '/sitemap.xml이 영어가 아니다');

  const enTotal = flat.filter(p => langOf(p) === 'en').length;
  assert.ok(enTotal > 15_000, `영어 주소가 ${enTotal}개뿐 — 세는 방식이 깨졌다`);
  const enChunks = built.filter(c => [...langsIn(c)].join() === 'en');
  assert.equal(enChunks.reduce((n, c) => n + c.urls.length, 0), enTotal,
    `영어 ${enTotal}개 중 앞 조각들에 다 안 들어갔다`);
});

test('한국어도 한 장도 안 빠진다 — 뒤로 보냈지 버린 것이 아니다', { skip }, () => {
  const koTotal = flat.filter(p => langOf(p) === 'ko').length;
  assert.ok(koTotal > 15_000, `한국어 주소가 ${koTotal}개뿐 — 세는 방식이 깨졌다`);
  const koChunks = built.filter(c => [...langsIn(c)].join() === 'ko');
  assert.equal(koChunks.reduce((n, c) => n + c.urls.length, 0), koTotal,
    `한국어 ${koTotal}개 중 조각에 다 안 들어갔다`);
});

test('열 언어가 모두 제 파일을 갖는다', { skip }, () => {
  /* 언어 하나가 조용히 빠지면 그 언어 전체가 색인 요청에서 사라진다 */
  const covered = new Set(built.flatMap(c => [...langsIn(c)]));
  const missing = [...INTL, 'ko'].filter(l => !covered.has(l));
  assert.deepEqual(missing, [], '사이트맵에 조각이 없는 언어다');
});

test('자르는 자리를 바꿔도 주소가 늘거나 줄지 않는다', { skip }, () => {
  /* 언어별로 묶다가 항목을 잃거나 겹치게 하면 색인이 통째로 어긋난다 */
  assert.equal(new Set(flat).size, flat.length, '같은 주소가 두 번 실렸다');
  assert.ok(flat.length > 150_000, `주소가 ${flat.length}개뿐 — 세는 방식이 깨졌다`);
  for (const c of built) {
    assert.ok(c.urls.length <= CHUNK_LIMIT, `${c.id}이 ${c.urls.length}개 — 규약 한도 5만을 넘겼다`);
  }
});
