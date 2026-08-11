/**
 * 한국어 통합 검색이 브라우저로 보내는 짐의 크기와 모양.
 *
 * ── 왜 이 파일이 생겼나 ──────────────────────────────────
 * /search는 SEARCH_INDEX를 클라이언트 컴포넌트의 prop으로 넘긴다. 그러면 그
 * 배열이 HTML과 RSC 페이로드에 **글자 그대로 직렬화되어** 들어간다. 그리고
 * Vercel은 프리렌더된 응답이 19.07MB를 넘으면 런타임에 FALLBACK_BODY_TOO_LARGE로
 * 실패시킨다 — 빌드는 통과하고 배포도 되지만 그 페이지만 죽는다.
 *
 * 실제로 그 일이 났다. 배포 로그가 `search (63.17 MB)`를 찍었다. 원인은 검색
 * 목록에 섹션 넷을 더하면서 스프레드 네 줄이 **HTTP_ITEMS.map의 객체 안쪽**으로
 * 들어간 것이었다. 배열을 객체에 스프레드하는 것은 문법 오류가 아니다 —
 * `{...[a,b]}`는 `{0:a,1:b}`가 된다. 그래서 tsc도 통과하고 빌드도 통과했고,
 * HTTP 낱장 196개가 각각 1,880개짜리 목록을 통째로 품어 59MB가 되었다.
 * 동시에 그 네 섹션은 색인에서 사라져 한국어 검색으로는 찾을 수 없었고,
 * SECTION_COUNTS가 undefined가 되어 홈 배지가 "undefined개"가 되었다.
 *
 * lib/search-index.ts는 그때까지 어떤 검사도 불러 본 적이 없었다. 상대 경로
 * import 199개에 확장자가 없어 node가 읽지 못했기 때문이다. 확장자를 붙여
 * 열어 두었고, 그래서 이 파일이 가능해졌다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SEARCH_INDEX, SECTION_COUNTS, SECTION_META, type Section } from '../lib/search-index.ts';

const bytes = (v: unknown) => Buffer.byteLength(JSON.stringify(v));
const MB = 1024 * 1024;

/**
 * Vercel의 한도는 19.07MB이고, 한 페이지가 그 짐을 여러 벌로 굽는다 —
 * HTML과 .rsc와 segment까지 각각 한 벌이다. 그래서 한 벌 기준으로 넉넉히 아래에
 * 선을 둔다. 지금 3.3MB이고, 여기 닿았다면 짐을 줄일 때가 온 것이지 선을 올릴
 * 때가 아니다 — 올리면 배포는 되고 그 페이지만 죽는다.
 */
const MAX_PAYLOAD = 8 * MB;

test('검색 짐이 프리렌더 한도 안에 든다', () => {
  const size = bytes(SEARCH_INDEX);
  assert.ok(
    size <= MAX_PAYLOAD,
    `검색 짐이 ${(size / MB).toFixed(2)}MB — ${(MAX_PAYLOAD / MB).toFixed(0)}MB를 넘었다.\n` +
    '  Vercel은 프리렌더 응답 19.07MB를 넘기면 그 페이지를 런타임에 실패시킨다.\n' +
    '  한 항목이 품고 있어야 할 것은 href·title·desc·section·icon 다섯뿐이다.',
  );
});

test('항목마다 아는 열쇠 다섯만 있다', () => {
  /*
   * 이 검사가 배열을 객체에 스프레드한 사고를 직접 잡는다. 그때 항목의 열쇠는
   * href·title·… 말고 '0','1','2'…가 되었고, 크기 검사보다 원인을 먼저 가리킨다.
   */
  const OK = new Set(['href', 'title', 'desc', 'section', 'icon']);
  const bad: string[] = [];
  for (const it of SEARCH_INDEX) {
    const extra = Object.keys(it).filter(k => !OK.has(k));
    if (extra.length) bad.push(`${(it as { href?: string }).href ?? '(주소 없음)'}: ${extra.slice(0, 4).join(', ')}`);
  }
  assert.deepEqual(bad.slice(0, 5), [], `모르는 열쇠가 든 항목 ${bad.length}개`);
});

test('항목 하나가 비정상적으로 크지 않다', () => {
  /*
   * 평균이 아니라 최대를 본다. 사고 당시 HTTP 항목 하나가 30만 바이트였는데,
   * 전체 평균으로는 묻혀 보였다. 한 줄 설명 하나가 4KB를 넘을 이유는 없다.
   */
  const fat = SEARCH_INDEX
    .map(it => ({ href: (it as { href: string }).href, b: bytes(it) }))
    .filter(x => x.b > 4096)
    .sort((a, b) => b.b - a.b);
  assert.deepEqual(fat.slice(0, 5).map(x => `${x.href}: ${x.b}B`), [], `4KB 넘는 항목 ${fat.length}개`);
});

test('화면에 있는 섹션이 색인에도 있다', () => {
  /*
   * SECTION_META에 이름표가 있으면 검색 결과에 꼬리표로 붙는다. 그런데 그 섹션의
   * 항목이 색인에 하나도 없으면 꼬리표만 있고 찾을 수는 없는 섹션이 된다 —
   * 스프레드가 엉뚱한 곳에 들어갔을 때 정확히 그렇게 되었다.
   */
  const present = new Set(SEARCH_INDEX.map(it => it.section));
  const missing = (Object.keys(SECTION_META) as Section[]).filter(s => !present.has(s));
  assert.deepEqual(missing, [], '이름표는 있는데 색인에 항목이 없는 섹션이다');
});

test('홈 배지가 셀 수 있는 수를 받는다', () => {
  /*
   * 홈은 `${SECTION_COUNTS.error}개`로 배지를 찍는다. 그 섹션이 색인에 없으면
   * undefined가 되고 화면에 "undefined개"가 그대로 나온다. 배포된 적이 있다.
   */
  const bad = (Object.keys(SECTION_META) as Section[])
    .filter(s => typeof SECTION_COUNTS[s] !== 'number' || !Number.isFinite(SECTION_COUNTS[s]) || SECTION_COUNTS[s] < 1);
  assert.deepEqual(bad, [], '홈 배지가 undefined로 찍힌다');
});

test('같은 주소를 두 항목이 쓰지 않는다', () => {
  const seen = new Map<string, number>();
  for (const it of SEARCH_INDEX) seen.set(it.href, (seen.get(it.href) ?? 0) + 1);
  const dup = [...seen].filter(([, n]) => n > 1).map(([h, n]) => `${h} ×${n}`);
  assert.deepEqual(dup.slice(0, 8), [], `주소가 겹치는 항목 ${dup.length}개 — 검색 결과에 같은 줄이 두 번 나온다`);
});
