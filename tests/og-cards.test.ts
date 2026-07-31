/**
 * 공유 카드는 섹션마다 한 장이고, 상세 페이지는 그것을 물려받는다.
 *
 * 예전에는 상세 라우트마다 opengraph-image.tsx를 두어 페이지 하나에 카드 하나를
 * 만들었다. 카드가 정확해지는 대신 값이 컸다 — [slug] 라우트 274개가 언어를
 * 곱해 31,440장을 찍었고, 그것만으로 산출물이 6GB에 빌드가 이십 분을 넘겼다.
 * 배포가 아예 안 되는 지점까지 갔다.
 *
 * 그래서 상세 카드를 걷어냈다. Next는 그 자리에 카드가 없으면 위 구획의 카드를
 * 물려주므로, 주사위 상세 페이지는 주사위 섹션 카드를 그대로 쓴다 — 실제로
 * og:image와 twitter:image가 /random/dice/opengraph-image를 가리키는 것을
 * 확인하고 지웠다.
 *
 * 이 검사는 그 결정이 조용히 뒤집히는 것을 막는다. [slug] 아래에 카드를 하나
 * 되살리면 그 섹션 하나로 이미지가 천 장 넘게 늘어나는데, 그 사실은 빌드가
 * 느려지고 배포가 실패할 때에야 드러난다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const APP = join(import.meta.dirname, '..', 'app');

/** app 아래의 모든 opengraph-image.tsx */
function ogRoutes(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) ogRoutes(p, out);
    else if (name === 'opengraph-image.tsx') out.push(relative(APP, p));
  }
  return out;
}

test('상세 라우트에는 공유 카드를 두지 않는다', () => {
  const inSlug = ogRoutes(APP).filter(p => p.includes('['));
  assert.deepEqual(
    inSlug,
    [],
    `동적 라우트 아래의 카드는 페이지 수만큼 이미지를 찍는다. 섹션 카드를 물려받게 두라:\n${inSlug.join('\n')}`,
  );
});

test('카드를 만드는 섹션에는 그 자리에 카드가 있다', () => {
  // 상세가 물려받을 카드가 정작 없으면 미리보기가 통째로 빈다.
  // 동적 라우트를 가진 구획은 그 위에 카드가 있어야 한다.
  const missing: string[] = [];
  const walk = (dir: string) => {
    const names = readdirSync(dir);
    const hasDynamic = names.some(n => n.startsWith('[') && statSync(join(dir, n)).isDirectory());
    if (hasDynamic && names.includes('page.tsx') && !existsSync(join(dir, 'opengraph-image.tsx'))) {
      missing.push(relative(APP, dir));
    }
    for (const n of names) {
      const p = join(dir, n);
      if (statSync(p).isDirectory()) walk(p);
    }
  };
  walk(APP);
  assert.deepEqual(missing, [], `상세를 가진 이 구획에 물려줄 카드가 없다:\n${missing.join('\n')}`);
});

test('카드 라우트 수가 갑자기 불어나지 않는다', () => {
  // 언어 열 개 × 구획이라 자연히 백 단위다. 천 단위를 크게 넘어서면
  // 동적 라우트에 카드가 다시 생겼다는 뜻이다.
  const all = ogRoutes(APP);
  assert.ok(all.length > 0, '카드가 하나도 없다');
  assert.ok(all.length < 1600, `카드 라우트가 ${all.length}개다 — 동적 라우트에 생기지 않았는지 보라`);
});
