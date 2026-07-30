import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import { LOCALES } from '../lib/locales.ts';

/**
 * <html lang>이 경로의 언어와 맞는지 본다.
 *
 * app/layout.tsx가 lang="ko"를 박고 있어서 한때 영어·중국어 960장이 전부
 * 한국어로 선언돼 나갔다. hreflang·canonical은 멀쩡했으므로 이 값만 따로
 * 보지 않으면 드러나지 않는다 — 스크린리더가 영어를 한국어 음운으로 읽고
 * 크롬이 엉뚱한 번역을 권하는 것으로만 나타난다.
 *
 * 지금은 scripts/fix-html-lang.mjs가 빌드 뒤에 고친다. 나중에 route group으로
 * root layout을 언어별로 나누면 그 스크립트는 지워도 되지만, 이 검사는 남는다.
 */
const OUT = join(import.meta.dirname, '..', 'out');
const built = existsSync(OUT);

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

/**
 * 경로에서 기대되는 lang.
 *
 * 목록을 여기 적지 않는다 — lib/locales.ts가 원천이다. 같은 목록을 테스트에
 * 또 두면 언어를 늘렸을 때 이 검사만 옛 목록을 보고 통과해 버린다. 실제로
 * 중국어를 걷어낸 뒤에도 여기엔 zh 규칙이 남아 있었고, 새 언어 여섯 개는
 * 기대값이 'ko'로 떨어져 오류를 못 잡을 상태였다.
 *
 * 계산기 영어·일본어판만 /calculator/en처럼 언어가 뒤에 온다.
 */
function expected(path: string): string {
  // 언어가 뒤에 오는 형태를 먼저 본다
  for (const { path: p, tag } of LOCALES) {
    if (p && path === `calculator/${p}`) return tag;
  }
  // 접두어는 긴 것부터 — pt-br이 pt보다 먼저 걸려야 한다
  const prefixed = [...LOCALES]
    .filter(l => l.path)
    .sort((a, b) => b.path.length - a.path.length)
    .find(l => path === l.path || path.startsWith(`${l.path}/`));
  return prefixed ? prefixed.tag : 'ko';
}

test('모든 페이지의 html lang이 경로의 언어와 맞는다', { skip: built ? false : 'out/ 없음 — npm run build 필요' }, () => {
  const wrong: string[] = [];
  for (const f of walk(OUT)) {
    const rel = relative(OUT, f);
    if (rel === '404.html') continue;
    const path = rel.replace(/\.html$/, '').replace(/\/index$/, '');
    const m = readFileSync(f, 'utf8').match(/<html lang="([^"]+)"/);
    const want = expected(path);
    if (!m) wrong.push(`${rel}: lang 없음`);
    else if (m[1] !== want) wrong.push(`${rel}: "${m[1]}" (기대 "${want}")`);
  }
  assert.deepEqual(
    wrong.slice(0, 20), [],
    `lang이 틀린 페이지 ${wrong.length}장. scripts/fix-html-lang.mjs가 빌드 뒤에 도는지 확인하라`,
  );
});
