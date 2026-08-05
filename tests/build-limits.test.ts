import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * 빌드가 컨테이너 안에서 죽지 않게 거는 세 가지 상한을 지킨다.
 *
 * 셋 다 next.config.ts가 아니라 **명령줄**에 있다. 설정 파일로는 못 거는 값이라
 * 그런데, 그래서 누가 스크립트를 손보다 조용히 지워도 아무 데서도 티가 안 난다.
 * 지워진 것은 다음 Vercel 빌드가 exit 137로 알려 준다 — 그때는 30분이 지난 뒤다.
 *
 * 셋 다 "왜 이 값인가"가 next.config.ts 주석에 실측과 함께 적혀 있다.
 * 여기서는 그것이 명령줄에 살아 있는지만 본다.
 */
const ROOT = join(import.meta.dirname, '..');
const build: string = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')).scripts.build;

test('rayon 스레드 수를 명시한다', () => {
  /*
   * @next/swc가 쓰는 rayon은 RAYON_NUM_THREADS가 없으면 available_parallelism()으로
   * 정하는데, 빌드 컨테이너에 CPU 쿼터가 없으면 그 값이 할당분(2)이 아니라 호스트의
   * 코어 수다. 2코어 위에서 수십 스레드가 저마다 작업 메모리를 들고 서로 밀친다.
   * 안 걸었을 때 최대 RSS 2,912MB, 2로 걸었을 때 2,024MB.
   */
  assert.match(build, /RAYON_NUM_THREADS=/);
});

test('node 힙 상한을 명시한다', () => {
  /*
   * node는 힙 상한을 시스템 전체 메모리로 정한다. 8GB에서 프로세스당 4,192MB라,
   * 워커가 둘만 돼도 허용 힙이 컨테이너보다 크다. 실측 최대가 워커 536MB·주
   * 프로세스 868MB라 1536이면 넉넉하다.
   */
  const m = build.match(/--max-old-space-size=(\d+)/);
  assert.ok(m, 'NODE_OPTIONS=--max-old-space-size가 없다');
  assert.ok(Number(m[1]) <= 2048, `${m[1]}MB — 워커까지 곱하면 8GB를 넘는다`);
});

test('타입 검사가 next build 앞에서 따로 돈다', () => {
  /*
   * next build 안에서 돌면 3만 페이지를 컴파일한 힙을 쥔 채 그 위에서 시작해
   * 봉우리가 겹친다. 앞으로 빼야 최대 사용량이 합이 아니라 둘 중 큰 쪽이 된다.
   * 그래서 next.config.ts가 typescript.ignoreBuildErrors를 켜 두는데, 이 순서가
   * 깨지면 그 줄은 "타입 검사를 아예 안 한다"는 뜻이 돼 버린다.
   */
  const tsc = build.indexOf('tsc --noEmit');
  const next = build.indexOf('next build');
  assert.ok(tsc >= 0, 'tsc --noEmit이 없다 — ignoreBuildErrors와 겹치면 검사가 사라진다');
  assert.ok(next >= 0, 'next build가 없다');
  assert.ok(tsc < next, '타입 검사가 next build 뒤에 있다');
});

test('상한이 next build에만 걸린다', () => {
  // tsc 앞에 두면 타입 검사도 1.5GB로 묶인다. 그쪽은 냉간에서 1.3GB를 쓴다.
  const opts = build.indexOf('NODE_OPTIONS');
  assert.ok(opts > build.indexOf('tsc --noEmit'), 'NODE_OPTIONS가 tsc까지 묶고 있다');
});
