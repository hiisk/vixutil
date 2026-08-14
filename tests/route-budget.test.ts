/**
 * 라우팅 표가 조용히 불어나는 것을 잡는다.
 *
 * ── 왜 이 검사가 생겼나 (2026-08-13) ───────────────────────
 * 이 저장소는 배포가 라우팅 표 때문에 죽은 적이 있다.
 *
 *   Maximum number of routes (rewrites, redirects, etc) exceeded.
 *   Max is 2048, received 2094.
 *
 * **빌드는 성공하고 배포에서 죽는다.** 그래서 로컬에서는 아무 신호가 없고, 고치는
 * 데 하루가 들었다(언어마다 열한 갈래를 하나로 접었다). 그런데 그 뒤로도 **그 수를
 * 지켜보는 검사가 없었다** — 같은 사고를 다시 당할 자리가 그대로 남아 있었다.
 *
 * ── 무엇을 세고, 무엇을 세지 않나 ─────────────────────────
 * `.next/routes-manifest.json`의 `staticRoutes`와 `dynamicRoutes`를 센다. 이것이
 * 빌드가 실제로 내놓는 라우트 목록이다.
 *
 * **Vercel이 2,048과 견주는 수가 이 둘을 어떻게 합친 값인지는 확인하지 못했다.**
 * 흔히 「동적 라우트 하나가 두 칸」이라고 하는데, 그 셈이라면 지금이 이미 한도를
 * 넘는다(913×2 + 516 = 2,342). 그런데 같은 셈으로 2,325였던 커밋(39caec21)이
 * 배포에 성공했다. 즉 **그 공식은 Vercel의 셈이 아니다.** 무엇이 맞는지 모르는
 * 채로 한도를 흉내내면 거짓 경보가 나거나(작업이 막힌다) 거짓 안심을 준다.
 *
 * 그래서 이 검사는 한도를 흉내내지 않고 **변화를 지켜본다.** 아래 수는 배포에
 * 성공한 상태에서 잰 값이고, 여기서 크게 늘면 멈춘다. 그 순간이 배포를 눈으로
 * 확인해야 하는 순간이다. 늘리는 것 자체를 막는 것이 아니라, **모르고 늘리는 것**을
 * 막는다.
 *
 * ── 수를 올릴 때 ──────────────────────────────────────────
 * 라우트를 일부러 더했으면 아래 수를 고치고 내력에 한 줄 남겨라. 동적 라우트를
 * 늘렸다면(= 새 섹션을 라우트로 냈다면) **배포를 확인한 뒤에** 올려라 — 정적
 * 라우트는 하나가 한 칸이지만 동적 라우트는 그보다 비싸다는 것만은 분명하다.
 *
 *   내력
 *   ─────────────────────────────────────────────
 *   동적 912 / 정적 482   39caec21 (배포 성공)
 *   동적 913 / 정적 516   2026-08-13 — 계산기 여덟·게임 넷·QR을 더했다(정적만 +17,
 *                         동적은 sitemap11 방어 라우트 하나)
 *   동적 922 / 정적 517   2026-08-13 — /dpi를 열 언어로 냈다. 섹션 하나가 동적을
 *                         **아홉** 먹는다(한국어는 접혀 정적 하나) — 이 검사가
 *                         잡아서 알게 된 수다. **배포를 확인하지 않았다.**
 *                         마지막으로 배포에 성공한 것은 동적 912(39caec21)이고
 *                         지금은 +10이다. 다음 배포가 라우팅 표로 죽으면
 *                         여기가 원인이고, 그때는 언어별 [slug] 라우트를
 *                         캐치올로 접는 것이 고침이다(tests/fold-routes.test.ts).
 *   동적 907 / 정적 517   2026-08-14 — 한자·연호·다다미·혈액형 유전을 여섯 언어에서
 *                         뺐다(SECTION_LOCALES). **처음으로 줄어든 값이다** —
 *                         4갈래 × 6언어 = 24개 낱장 라우트를 지웠다. 늘리기만
 *                         하던 이 수가 줄 수도 있다는 것을 여기 적어 둔다.
 *                         마지막 배포 성공은 여전히 912이고, 이제 그보다 **낮다**.
 *   동적 931 / 정적 517   2026-08-14 — /date를 열 언어로 냈다(날짜 낱장 366일).
 *                         또 아홉을 먹었다 — 새 **섹션**은 언제나 동적 아홉이다
 *                         (한국어는 [section]/[slug] 디스패처에 접혀 0).
 *                         **배포를 확인하지 않았다.** 마지막 성공은 여전히 912이고
 *                         지금은 +19다. 여유를 2,048로 보면 아직 크지만, 이 수는
 *                         Vercel이 어떻게 세는지 모르는 채로 견주는 값이라
 *                         (머리말 참고) 배포 한 번으로 확인하는 편이 낫다.
 *
 *                         값 낱장(convert 33,120장·BMI 41,310장·생일 3,660장)은
 *                         **동적을 하나도 안 먹었다** — 이미 있는 세 칸 라우트에
 *                         얹었기 때문이다. 장수를 늘릴 때 라우트를 안 늘리는 것이
 *                         이 저장소가 찾은 길이다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = join(import.meta.dirname, '..');
const MANIFEST = join(ROOT, '.next', 'routes-manifest.json');

/** 배포에 성공한 상태에서 잰 수 */
const EXPECT_DYNAMIC = 907;
const EXPECT_STATIC = 517;
/**
 * 얼마까지 늘어도 넘기나.
 *
 * 정적 라우트는 낱장 계산기를 더할 때마다 한 칸씩 는다 — 그때마다 검사를 고치게
 * 하면 아무도 읽지 않고 수만 올린다. 그래서 정적에는 여유를 두고, **동적은 한
 * 칸도 그냥 넘기지 않는다** — 동적이 느는 것은 새 섹션을 냈다는 뜻이고 그것이
 * 배포를 죽인 원인이었다.
 */
const STATIC_SLACK = 40;

const manifest = existsSync(MANIFEST)
  ? (JSON.parse(readFileSync(MANIFEST, 'utf8')) as {
      staticRoutes?: unknown[];
      dynamicRoutes?: unknown[];
      rewrites?: { beforeFiles?: unknown[]; afterFiles?: unknown[]; fallback?: unknown[] };
      redirects?: unknown[];
    })
  : null;

const skip = manifest ? false : '빌드 산출물 없음 — npm run build 뒤에 돌린다';

test('동적 라우트 수가 배포에 성공한 값과 같다', { skip }, () => {
  const n = manifest!.dynamicRoutes?.length ?? 0;
  assert.equal(
    n,
    EXPECT_DYNAMIC,
    `동적 라우트가 ${EXPECT_DYNAMIC} → ${n}로 바뀌었다.\n` +
      '  동적 라우트는 정적보다 비싸고, 이 표가 넘치면 빌드는 성공하고 배포가 죽는다\n' +
      '  (Maximum number of routes exceeded. Max is 2048).\n' +
      '  일부러 늘렸다면 배포를 확인한 뒤 이 검사의 EXPECT_DYNAMIC과 내력을 고쳐라.\n' +
      '  줄였다면 그것도 적어 두어라 — 여유가 얼마인지 아는 것이 이 검사의 목적이다.',
  );
});

test('정적 라우트가 여유 안에서 늘어난다', { skip }, () => {
  const n = manifest!.staticRoutes?.length ?? 0;
  assert.ok(
    n <= EXPECT_STATIC + STATIC_SLACK,
    `정적 라우트가 ${n}개다 — 기준 ${EXPECT_STATIC}에 여유 ${STATIC_SLACK}을 더한 ` +
      `${EXPECT_STATIC + STATIC_SLACK}을 넘었다. 계산기 낱장을 ${STATIC_SLACK}개 넘게 더했다면 ` +
      'EXPECT_STATIC을 올리고 내력에 남겨라.',
  );
  /* 크게 줄었으면 그것도 사고다 — 등록부에서 빠져 라우트가 사라진 것일 수 있다 */
  assert.ok(
    n >= EXPECT_STATIC - STATIC_SLACK,
    `정적 라우트가 ${n}개로 줄었다 (기준 ${EXPECT_STATIC}). 라우트가 사라졌다면 그 주소는 ` +
      '404가 되고 사이트맵은 계속 내건다.',
  );
});

test('리라이트·리다이렉트가 표를 먹지 않는다', { skip }, () => {
  /*
   * 한도의 이름이 「rewrites, redirects, etc」다. 리라이트를 하나 넣으면 라우트
   * 하나와 같은 값을 먹는다. 지금은 리다이렉트 하나뿐이고, 늘어나면 알아야 한다.
   */
  const rw = manifest!.rewrites;
  const rewrites =
    (rw?.beforeFiles?.length ?? 0) + (rw?.afterFiles?.length ?? 0) + (rw?.fallback?.length ?? 0);
  assert.equal(rewrites, 0, `리라이트가 ${rewrites}개 생겼다 — 라우팅 표를 함께 먹는다`);
  assert.ok(
    (manifest!.redirects?.length ?? 0) <= 2,
    `리다이렉트가 ${manifest!.redirects?.length}개다 — 늘었으면 표의 여유를 다시 재라`,
  );
});

test('이 검사가 실제로 물는다', () => {
  /*
   * 위 셋은 빌드가 없으면 건너뛴다. 건너뛰는 검사는 초록으로 보이지만 아무것도
   * 지키지 않는다 — 이 저장소에서 out/이 없어 22개가 조용히 skip된 적이 있다.
   * 그래서 셈 자체는 빌드 없이도 확인한다.
   */
  const judge = (dynamic: number, staticN: number) => ({
    dynamicOk: dynamic === EXPECT_DYNAMIC,
    staticOk: staticN <= EXPECT_STATIC + STATIC_SLACK && staticN >= EXPECT_STATIC - STATIC_SLACK,
  });

  assert.deepEqual(judge(EXPECT_DYNAMIC, EXPECT_STATIC), { dynamicOk: true, staticOk: true });
  /* 섹션 하나를 열 언어로 더하면 동적이 10 늘고 반드시 걸려야 한다 */
  assert.equal(judge(EXPECT_DYNAMIC + 10, EXPECT_STATIC).dynamicOk, false, '동적이 늘어도 통과한다');
  assert.equal(judge(EXPECT_DYNAMIC - 10, EXPECT_STATIC).dynamicOk, false, '동적이 줄어도 통과한다');
  /* 정적은 여유 안에서 통과하고 넘으면 걸린다 */
  assert.equal(judge(EXPECT_DYNAMIC, EXPECT_STATIC + STATIC_SLACK).staticOk, true);
  assert.equal(judge(EXPECT_DYNAMIC, EXPECT_STATIC + STATIC_SLACK + 1).staticOk, false);
  assert.equal(judge(EXPECT_DYNAMIC, EXPECT_STATIC - STATIC_SLACK - 1).staticOk, false);
});
