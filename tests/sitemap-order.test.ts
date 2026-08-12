/**
 * 사이트맵을 자르는 자리가 크롤 예산을 어디에 쓰는지 정한다 — 조각 하나 = 언어 하나.
 *
 * ── 서치 콘솔이 알려 준 것 (2026-08-12) ────────────────────────
 * `/sitemap.xml`: 발견된 페이지 **50,000**, 그 뒤로 다시 읽지 않음.
 * 구글은 사이트맵을 **앞에서부터** 읽고 제 예산에서 끊는다. 그때 읽힌 5만 개를
 * 세어 보니 열 언어에 얇게 퍼져 한국어는 19,903개 중 5,218개(26%)뿐이었고,
 * 끊긴 자리는 `fr/game/poker/k9s`처럼 값만 바꿔 찍은 표였다.
 *
 * 주소를 빼는 것은 노출을 포기하는 것이라 하지 않았다. 대신 자르는 자리를 언어에
 * 맞췄다 — 조각 0이 한국어 전부이고, 그 뒤가 아홉 언어다. 얻는 것이 둘이다:
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
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BUILT = join(import.meta.dirname, '..', '.next', 'server', 'app');
const CHUNK_LIMIT = 50_000;   // 사이트맵 규약의 한 파일 한도

const INTL = new Set(['en', 'es', 'pt-br', 'ja', 'de', 'fr', 'hi', 'zh-hans', 'zh-hant']);

/** 구운 조각을 **번호순으로** 읽는다 — 사전순으로 읽으면 10이 2보다 앞에 온다 */
function chunks(): string[][] {
  const dir = join(BUILT, 'sitemap');
  if (!existsSync(dir)) return [];
  const files = readdirSync(dir)
    .map(f => /^(\d+)\.xml(\.body)?$/.exec(f) && { f, n: Number(RegExp.$1) })
    .filter((x): x is { f: string; n: number } => !!x)
    .sort((a, b) => a.n - b.n);
  return files.map(({ f }) =>
    [...readFileSync(join(dir, f), 'utf8').matchAll(/<loc>https:\/\/vixutil\.com\/?([^<]*)<\/loc>/g)]
      .map(m => m[1]),
  );
}

const built = chunks();
const skip = built.length ? false : '빌드 산출물 없음 — npm run build 필요';
const flat = built.flat();
const langOf = (p: string) => {
  const first = p.split('/')[0];
  return INTL.has(first) ? first : 'ko';
};

/** 조각 → 그 안에 든 언어들 */
const langsIn = (c: string[]) => new Set(c.map(langOf));

test('조각 하나에 언어 하나만 든다', { skip }, () => {
  /*
   * 이것이 서치 콘솔에서 언어별 색인율을 읽을 수 있게 하는 조건이다. 45,000개씩
   * 기계적으로 자르면 조각마다 언어가 섞여 그 수치가 아무것도 말해 주지 않는다.
   */
  const mixed = built
    .map((c, i) => ({ i, langs: [...langsIn(c)] }))
    .filter(x => x.langs.length > 1);
  assert.deepEqual(mixed.map(x => `조각 ${x.i}: ${x.langs.join(' · ')}`), [], '조각에 언어가 섞였다');
});

test('조각 0이 한국어다', { skip }, () => {
  /* 유입이 한국어에서 온다 — 구글이 첫 조각만 읽어도 한 장도 빠지지 않아야 한다 */
  assert.ok(built.length > 0, '조각이 없다');
  assert.deepEqual([...langsIn(built[0])], ['ko'], '첫 조각이 한국어가 아니다');

  const koTotal = flat.filter(p => langOf(p) === 'ko').length;
  assert.ok(koTotal > 15_000, `한국어 주소가 ${koTotal}개뿐 — 세는 방식이 깨졌다`);
  assert.equal(built[0].length, koTotal, `한국어 ${koTotal}개 중 첫 조각에 ${built[0].length}개만 들어갔다`);
});

test('열 언어가 모두 조각을 갖는다', { skip }, () => {
  /* 언어 하나가 조용히 빠지면 그 언어 전체가 색인 요청에서 사라진다 */
  const covered = new Set(built.flatMap(c => [...langsIn(c)]));
  const missing = [...INTL, 'ko'].filter(l => !covered.has(l));
  assert.deepEqual(missing, [], '사이트맵에 조각이 없는 언어다');
});

test('자르는 자리를 바꿔도 주소가 늘거나 줄지 않는다', { skip }, () => {
  /* 언어별로 묶다가 항목을 잃거나 겹치게 하면 색인이 통째로 어긋난다 */
  assert.equal(new Set(flat).size, flat.length, '같은 주소가 두 번 실렸다');
  assert.ok(flat.length > 150_000, `주소가 ${flat.length}개뿐 — 세는 방식이 깨졌다`);
  built.forEach((c, i) => {
    assert.ok(c.length <= CHUNK_LIMIT, `조각 ${i}이 ${c.length}개 — 규약 한도 5만을 넘겼다`);
  });
});
