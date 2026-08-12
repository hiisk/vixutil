/**
 * 크롤러 정책 — 검색 엔진을 막지 않는지, 목록이 어긋나지 않는지 본다.
 *
 * ── 왜 이 검사가 생겼나 (2026-08-13) ───────────────────────
 * Hobby의 Edge 요청 한도 100만을 지키려고 봇을 가리기 시작했다. 그런데 이 목록에서
 * **한 줄만 잘못 적으면 구글이 막힌다** — 그러면 요금은 0이 되고 사이트도 0이 된다.
 * robots.txt는 화면이 아니라 텍스트 파일이라 눈으로 확인할 일이 없고, 잘못돼도
 * 몇 주 뒤 색인이 빠질 때 알게 된다.
 *
 * 그래서 이 검사가 지키는 것은 하나다 — **검색 엔진은 절대 막히지 않는다.**
 *
 * 이름이 비슷한 짝이 함정이다. GPTBot(학습용, 막음)과 ChatGPT-User(사람이 물어서
 * 그때 가져감, 받음)는 접두어가 같다. 그래서 부분 문자열로 견주면 안 되고 정확히
 * 맞대야 한다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  ALLOWED_CRAWLERS, ASSISTANT_FETCHERS, BLOCKED_CRAWLERS, SEARCH_BOTS,
  SEO_CRAWLERS, TRAINING_CRAWLERS,
} from '../lib/crawlers.ts';

test('검색 엔진이 막힌 목록에 없다', () => {
  /* 이것이 이 검사의 본체다 — 여기가 깨지면 색인이 빠진다 */
  for (const bot of SEARCH_BOTS) {
    assert.ok(!BLOCKED_CRAWLERS.includes(bot), `${bot}이 막혔다 — 검색 색인에서 빠진다`);
  }
  /* 반드시 있어야 하는 것들을 못 박는다 — 목록에서 지워지면 걸린다 */
  for (const must of ['Googlebot', 'Bingbot', 'Yeti', 'Daum']) {
    assert.ok(SEARCH_BOTS.includes(must), `${must}가 받는 목록에서 사라졌다`);
  }
});

test('받는 목록과 막는 목록이 겹치지 않는다', () => {
  const both = ALLOWED_CRAWLERS.filter(b => BLOCKED_CRAWLERS.includes(b));
  assert.deepStrictEqual(both, [], '같은 봇이 두 목록에 있다');
});

test('이름이 비슷한 짝을 헷갈리지 않았다', () => {
  /*
   * 학습용과 사용자 요청용은 이름이 닮았다. 방향을 못 박아 둔다.
   *
   * 처음에는 "부분 문자열로 견주면 Claude-User가 막힌다"고 적었는데 **그것이
   * 사실이 아니었다** — 'Claude-User'는 'ClaudeBot'을 포함하지 않는다. 지어낸
   * 예시로 검사를 세운 것이라, 실제 충돌을 코드로 찾는 쪽으로 고쳤다(아래 검사).
   */
  const pairs: [string, string][] = [
    ['GPTBot', 'ChatGPT-User'],
    ['ClaudeBot', 'Claude-User'],
  ];
  for (const [blocked, allowed] of pairs) {
    assert.ok(BLOCKED_CRAWLERS.includes(blocked), `${blocked}이 막는 목록에 없다`);
    assert.ok(ALLOWED_CRAWLERS.includes(allowed), `${allowed}가 받는 목록에 없다`);
    assert.ok(!BLOCKED_CRAWLERS.includes(allowed), `${allowed}가 막혔다`);
  }
});

test('접두어가 겹치는 짝은 둘 다 적혀 있다', () => {
  /*
   * robots.txt의 User-agent 판정은 **가장 구체적인 규칙이 이긴다.** 그래서 막는
   * 이름이 받는 이름으로 시작하면(또는 그 반대), 두 이름이 **모두** 적혀 있어야
   * 각자 자기 규칙 묶음을 갖는다. 하나만 적으면 넓은 쪽이 좁은 쪽까지 덮는다.
   *
   * 지금 실제로 겹치는 짝은 하나다 — 애플이 검색용 Applebot과 학습용
   * Applebot-Extended를 쓴다. Applebot만 허용하고 Extended를 안 적으면 학습
   * 수집까지 함께 받게 된다.
   *
   * 목록을 늘릴 때 새 충돌이 생기면 여기서 걸린다 — 그때 두 이름을 모두 적어라.
   */
  const low = (s: string) => s.toLowerCase();
  const collisions: string[] = [];
  for (const a of ALLOWED_CRAWLERS) {
    for (const b of BLOCKED_CRAWLERS) {
      if (low(b).startsWith(low(a)) || low(a).startsWith(low(b))) {
        collisions.push(`${a} ↔ ${b}`);
      }
    }
  }
  /* 알고 있는 짝 하나만 있어야 한다 — 새로 생기면 눈으로 보고 이 목록에 더한다 */
  assert.deepStrictEqual(collisions, ['Applebot ↔ Applebot-Extended'],
    '접두어가 겹치는 짝이 늘거나 줄었다 — 두 이름을 모두 적었는지 확인하라');

  assert.ok(SEARCH_BOTS.includes('Applebot'), '검색용 Applebot이 빠졌다');
  assert.ok(BLOCKED_CRAWLERS.includes('Applebot-Extended'), '학습용 Applebot-Extended가 빠졌다');
});

test('목록에 중복과 빈 값이 없다', () => {
  for (const [name, list] of [
    ['SEARCH_BOTS', SEARCH_BOTS], ['ASSISTANT_FETCHERS', ASSISTANT_FETCHERS],
    ['TRAINING_CRAWLERS', TRAINING_CRAWLERS], ['SEO_CRAWLERS', SEO_CRAWLERS],
  ] as const) {
    assert.equal(new Set(list).size, list.length, `${name}에 중복이 있다`);
    for (const b of list) {
      assert.ok(b.trim().length > 0, `${name}에 빈 값이 있다`);
      assert.equal(b, b.trim(), `${name}의 "${b}"에 앞뒤 공백이 있다`);
    }
  }
});

test('robots.txt가 이 목록을 쓰고 검색 엔진을 허용한다', async () => {
  /*
   * app/robots.ts는 라우트 파일이지만 순수 함수라 불러올 수 있다. 다만 사이트맵
   * 모듈을 함께 끌어오므로 @/ 별칭이 필요해서, 여기서는 원문을 읽어 확인한다.
   */
  const { readFileSync } = await import('node:fs');
  const { join } = await import('node:path');
  const src = readFileSync(join(import.meta.dirname, '..', 'app', 'robots.ts'), 'utf8');

  assert.match(src, /BLOCKED_CRAWLERS/, 'robots.ts가 막는 목록을 안 쓴다');
  assert.match(src, /from "@\/lib\/crawlers"/, 'robots.ts가 lib/crawlers를 안 가져온다');
  /* 모두 허용하는 줄이 남아 있어야 한다 — 그것이 검색 엔진을 받는 근거다 */
  assert.match(src, /userAgent: "\*", allow: "\/"/, 'robots.ts에 전체 허용 규칙이 없다');
  /* 봇 이름을 robots.ts에 직접 적지 않았다 — 두 곳에 적히면 한쪽만 고쳐진다 */
  for (const bot of ['GPTBot', 'AhrefsBot', 'SemrushBot']) {
    assert.ok(!src.includes(bot), `robots.ts에 ${bot}이 직접 적혀 있다 — lib/crawlers.ts만 고쳐야 한다`);
  }
});
