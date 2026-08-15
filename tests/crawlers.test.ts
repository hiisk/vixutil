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
  AI_ANSWER_CRAWLERS, ALLOWED_CRAWLERS, ASSISTANT_FETCHERS, BLOCKED_CRAWLERS,
  BULK_SCRAPERS, SEARCH_BOTS, SEO_CRAWLERS,
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

test('가르는 잣대가 "되돌려주는 것이 있는가"에 머문다', () => {
  /*
   * 2026-08-15에 Pro로 올라가며 AI 답변 크롤러를 받는 쪽으로 옮겼다. 그 판단의
   * 근거는 한도가 아니라 **인용이 달리는 제품이 뒤에 있는가**다. 요금제 이야기로
   * 목록이 흔들리지 않게 양쪽 끝을 못 박는다.
   *
   * 값이 싸졌다고 아무거나 받으면 안 되고(대량 수집은 여전히 되돌려주는 것이 0),
   * 반대로 한 번 데었다고 인용 경로까지 닫아 두면 유입을 통째로 버린다.
   */
  for (const bot of ['GPTBot', 'ClaudeBot', 'Google-Extended', 'Applebot-Extended']) {
    assert.ok(AI_ANSWER_CRAWLERS.includes(bot), `${bot}이 AI 답변 목록에서 빠졌다`);
    assert.ok(!BLOCKED_CRAWLERS.includes(bot),
      `${bot}이 막혔다 — AI 답변에 인용될 기회가 사라진다`);
  }
  /* 되돌려주는 것이 없는 쪽은 요금제와 무관하게 막는다 */
  for (const bot of ['CCBot', 'Bytespider', 'AhrefsBot', 'SemrushBot']) {
    assert.ok(BLOCKED_CRAWLERS.includes(bot), `${bot}이 막는 목록에서 빠졌다`);
  }
  /* 이름이 닮은 짝 — 사람이 물어서 가져가는 쪽은 언제나 받는다 */
  for (const bot of ['ChatGPT-User', 'Claude-User', 'Perplexity-User']) {
    assert.ok(ALLOWED_CRAWLERS.includes(bot), `${bot}가 받는 목록에 없다`);
    assert.ok(!BLOCKED_CRAWLERS.includes(bot), `${bot}가 막혔다`);
  }
});

test('낱장 공유 카드는 AI 크롤러에게도 안 열린다', async () => {
  /*
   * AI 크롤러를 받는 것과 카드를 내주는 것은 다른 문제다. 카드 한 장을 그리는 값이
   * CPU라(142,020장 전부면 79 CPU-시간 ≈ $10) 답변에 쓰이지도 않는 이미지를
   * 그려 줄 이유가 없다.
   *
   * 그래서 AI 크롤러는 robots.txt에 **제 규칙을 갖지 않는다** — `*` 규칙에 얹혀
   * `/og/*​/*​/*` 금지를 함께 받는다. 여기에 이름을 적으면 그 금지가 풀린다.
   */
  const src = await import('node:fs').then(fs => fs.readFileSync('app/robots.ts', 'utf8'));
  for (const bot of ['AI_ANSWER_CRAWLERS', 'ASSISTANT_FETCHERS', 'SEARCH_BOTS']) {
    assert.ok(!src.includes(bot),
      `robots.ts가 ${bot}에게 제 규칙을 준다 — /og/*​/*​/* 금지가 풀려 카드 값이 샌다`);
  }
  assert.match(src, /disallow:\s*"\/og\/\*\/\*\/\*"/, '낱장 카드 금지가 사라졌다');
});

test('접두어가 겹치는 짝은 둘 다 적혀 있다', () => {
  /*
   * robots.txt의 User-agent 판정은 **가장 구체적인 규칙이 이긴다.** 그래서 막는
   * 이름이 받는 이름으로 시작하면(또는 그 반대), 두 이름이 **모두** 적혀 있어야
   * 각자 자기 규칙 묶음을 갖는다. 하나만 적으면 넓은 쪽이 좁은 쪽까지 덮는다.
   *
   * 2026-08-15에 Applebot-Extended를 받는 쪽으로 옮기면서 **받는 쪽과 막는 쪽
   * 사이의 충돌은 0이 됐다.** 그래도 검사를 지우지 않는다 — 목록을 늘리다 새
   * 충돌이 생기는 것이 원래 위험이고, 지금이 그것을 잡기 가장 좋은 상태다.
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
  assert.deepStrictEqual(collisions, [],
    '접두어가 겹치는 짝이 생겼다 — 넓은 쪽 규칙이 좁은 쪽을 덮는다. 두 이름을 모두 적어라');

  /*
   * Applebot과 Applebot-Extended는 이제 둘 다 받는다. 그래도 **둘 다 적혀 있어야**
   * 한다 — Extended를 지우면 애플이 기본값(학습 허용/금지)을 저 혼자 정한다.
   */
  assert.ok(SEARCH_BOTS.includes('Applebot'), '검색용 Applebot이 빠졌다');
  assert.ok(AI_ANSWER_CRAWLERS.includes('Applebot-Extended'), 'Applebot-Extended가 빠졌다');
});

test('목록에 중복과 빈 값이 없다', () => {
  for (const [name, list] of [
    ['SEARCH_BOTS', SEARCH_BOTS], ['ASSISTANT_FETCHERS', ASSISTANT_FETCHERS],
    ['AI_ANSWER_CRAWLERS', AI_ANSWER_CRAWLERS], ['BULK_SCRAPERS', BULK_SCRAPERS],
    ['SEO_CRAWLERS', SEO_CRAWLERS],
  ] as const) {
    assert.equal(new Set(list).size, list.length, `${name}에 중복이 있다`);
    for (const b of list) {
      assert.ok(b.trim().length > 0, `${name}에 빈 값이 있다`);
      assert.equal(b, b.trim(), `${name}의 "${b}"에 앞뒤 공백이 있다`);
    }
  }
});

test('proxy.ts의 차단 정규식이 lib/crawlers.ts와 같다', async () => {
  /*
   * proxy의 matcher는 빌드 때 정적으로 읽혀 변수를 못 쓴다(문서: "matcher 값은
   * 상수여야 한다"). 그래서 목록을 정규식 리터럴로 한 벌 더 적을 수밖에 없고,
   * 두 곳에 적힌 것은 반드시 어긋난다(늘릴 때 한쪽만 고친다). 여기서 맞대 본다.
   *
   * 2026-08-13에 proxy가 캐시 헤더도 붙이게 했다가 되돌렸다 — 배포해서 재 보니
   * Cache-Control만은 프레임워크 것이 이겼다(proxy.ts 머리말). 그래서 이 파일은
   * 다시 봇 UA에만 도는 상태이고, matcher의 has 조건이 그 몫이다.
   */
  const { readFileSync } = await import('node:fs');
  const { join } = await import('node:path');
  const src = readFileSync(join(import.meta.dirname, '..', 'proxy.ts'), 'utf8');

  /* 이름을 |로 이어 붙인 것이 그대로 정규식이 된다 — 특수문자가 끼면 그 전제가 깨진다 */
  for (const b of BLOCKED_CRAWLERS) {
    assert.match(b, /^[A-Za-z0-9 _-]+$/, `"${b}"에 정규식 특수문자가 있다 — 이어 붙이는 방식부터 바꿔야 한다`);
  }

  const expected = `.*(${BLOCKED_CRAWLERS.join('|')}).*`;
  assert.ok(
    src.includes(expected),
    'proxy.ts의 matcher 정규식이 BLOCKED_CRAWLERS와 어긋난다 — lib/crawlers.ts를 고쳤으면 여기도 맞춰라',
  );

  /* Next는 has 값을 ^…$로 감싼다(prepare-destination.js) — 같은 방식으로 본다 */
  const re = new RegExp(`^${expected}$`);
  for (const bot of ALLOWED_CRAWLERS) {
    const ua = `Mozilla/5.0 (compatible; ${bot}/1.0; +https://example.com/bot)`;
    assert.ok(!re.test(ua), `${bot}이 proxy에서 403을 받는다 — 검색 유입이 끊긴다`);
  }
  for (const bot of BLOCKED_CRAWLERS) {
    assert.ok(re.test(`Mozilla/5.0 (compatible; ${bot}/1.0)`), `${bot}이 proxy를 그냥 지나간다`);
  }

  /* 함수 본문도 같은 목록을 쓴다 — 손으로 적힌 이름이 있으면 어긋난다 */
  assert.match(src, /import \{ BLOCKED_CRAWLERS \} from '@\/lib\/crawlers'/, 'proxy.ts가 목록을 안 가져온다');

  /* 규칙을 지키는 봇이 스스로 물러날 수 있게 robots.txt만은 열어 둔다 */
  assert.match(src, /\(\?!robots/, 'proxy가 robots.txt까지 막는다 — 정책을 볼 길이 없어진다');
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
