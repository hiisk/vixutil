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
 * 맞췄다 — /sitemap/ko.xml이 한국어 전부이고, 그 뒤가 언어별 파일이다. 얻는 것이 둘이다:
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

/**
 * 구운 조각을 이름과 함께 읽는다 — /sitemap/ko.xml → { id: 'ko', urls: […] }.
 *
 * 이름이 언어다. 번호로 두면 어느 언어가 한도를 넘겨 쪼개질 때 뒤 번호가 밀려
 * 서치 콘솔의 파일별 이력이 다른 언어를 가리킨다.
 */
function chunks(): { id: string; urls: string[] }[] {
  const dir = join(BUILT, 'sitemap');
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter(f => f.endsWith('.xml.body') || /\.xml$/.test(f))
    .map(f => ({
      id: f.replace(/\.xml(\.body)?$/, ''),
      urls: [...readFileSync(join(dir, f), 'utf8').matchAll(/<loc>https:\/\/vixutil\.com\/?([^<]*)<\/loc>/g)].map(m => m[1]),
    }))
    .filter(c => c.urls.length);
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
  assert.deepEqual(mixed.map(x => `${x.id}.xml: ${x.langs.join(' · ')}`), [], '조각에 언어가 섞였다');
});

test('조각 이름이 언어와 같다', { skip }, () => {
  /*
   * 이름이 곧 서치 콘솔에서 보게 되는 파일이다. ko.xml이 한국어가 아니면 그
   * 화면의 숫자를 잘못 읽게 된다. 한도를 넘겨 쪼갠 것은 'ko-2' 꼴이다.
   */
  const wrong = built
    .map(c => ({ id: c.id, langs: [...langsIn(c)] }))
    .filter(x => x.langs.length === 1 && x.langs[0] !== x.id.replace(/-\d+$/, ''));
  assert.deepEqual(wrong.map(x => `${x.id}.xml에 ${x.langs[0]}`), [], '조각 이름과 안에 든 언어가 다르다');
});

test('한국어가 조각 하나에 다 들어간다', { skip }, () => {
  /* 유입이 한국어에서 온다 — ko.xml만 읽혀도 한 장도 빠지지 않아야 한다 */
  const ko = built.find(c => c.id === 'ko');
  assert.ok(ko, 'ko.xml이 없다');
  const koTotal = flat.filter(p => langOf(p) === 'ko').length;
  assert.ok(koTotal > 15_000, `한국어 주소가 ${koTotal}개뿐 — 세는 방식이 깨졌다`);
  assert.equal(ko.urls.length, koTotal, `한국어 ${koTotal}개 중 ko.xml에 ${ko.urls.length}개만 들어갔다`);
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
  for (const c of built) {
    assert.ok(c.urls.length <= CHUNK_LIMIT, `${c.id}.xml이 ${c.urls.length}개 — 규약 한도 5만을 넘겼다`);
  }
});
