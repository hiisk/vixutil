import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join } from 'node:path';

/**
 * Next의 내보내기 복사 단계 패치가 아직 붙는지 본다.
 *
 * 그 패치는 npm install이 아니라 build에서 걸리므로, Next를 올린 뒤 처음
 * 알아채는 자리가 Vercel 빌드가 되기 쉽다. 앵커가 안 맞으면 스크립트가 exit 1로
 * 멈추도록 해 두었지만, 그 사실을 **여기서 먼저** 알아야 배포 전에 손볼 수 있다.
 *
 * 패치가 무엇을 고치는지는 scripts/patch-next-export.mjs 첫머리에 적어 두었다.
 */
const ROOT = join(import.meta.dirname, '..');
const require = createRequire(import.meta.url);

test('패치 스크립트가 지금 깔린 Next에 붙는다', () => {
  // 이미 붙어 있으면 그대로 통과하고, 자리를 못 찾으면 exit 1로 멈춘다
  const out = execFileSync('node', [join(ROOT, 'scripts', 'patch-next-export.mjs')], {
    cwd: ROOT,
    encoding: 'utf8',
  });
  assert.match(out, /패치/, out);
});

test('복사 단계에 동시성 제한이 실제로 걸려 있다', () => {
  const file = require.resolve('next/dist/export/index.js');
  const src = readFileSync(file, 'utf8');
  assert.ok(src.includes('__runPool'), '패치가 안 붙어 있다');
  assert.ok(
    !src.includes('await Promise.all(Object.keys(prerenderManifest.routes).map(async'),
    '제한 없는 Promise.all이 그대로 남아 있다',
  );
});

test('빌드가 패치를 먼저 부른다', () => {
  // build에서 빠지면 Vercel에서만 조용히 옛 동작으로 돌아간다
  const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));
  const build: string = pkg.scripts.build;
  const patchAt = build.indexOf('patch-next-export');
  const buildAt = build.indexOf('next build');
  assert.ok(patchAt >= 0, 'build에 patch-next-export가 없다');
  assert.ok(patchAt < buildAt, 'next build보다 먼저 와야 한다');
});

test('묶은 동시성이 모든 작업을 끝내고 오류를 삼키지 않는다', async () => {
  /*
   * 패치가 넣는 함수와 같은 것을 여기서 다시 돌려 본다. 원본을 그대로 가져다
   * 쓰지 않는 이유는, 그 파일이 Next의 것이라 언제든 통째로 갈릴 수 있어서다 —
   * 성질을 못 박아 두면 갈렸을 때 위의 검사가 먼저 걸린다.
   */
  async function runPool(tasks: (() => Promise<void>)[], limit: number) {
    let next = 0;
    await Promise.all(
      Array.from({ length: Math.min(limit, tasks.length) }, async () => {
        while (next < tasks.length) await tasks[next++]();
      }),
    );
  }

  let live = 0;
  let peak = 0;
  let done = 0;
  const tasks = Array.from({ length: 2000 }, () => async () => {
    live++;
    peak = Math.max(peak, live);
    await new Promise(r => setTimeout(r, 0));
    live--;
    done++;
  });
  await runPool(tasks, 64);
  assert.equal(done, 2000, '작업을 다 끝내지 못했다');
  assert.ok(peak <= 64, `동시에 ${peak}개가 떴다`);

  await runPool([], 64); // 빈 목록에서 멈추지 않는다

  await assert.rejects(
    runPool([async () => { throw new Error('boom'); }], 4),
    /boom/,
    '오류를 삼키면 복사 실패가 조용히 지나간다',
  );
});
