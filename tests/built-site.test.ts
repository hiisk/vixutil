import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const OUT = join(import.meta.dirname, '..', 'out');

/**
 * 빌드 산출물(out/)을 검사한다. `npm run build`를 돌린 적이 없으면 건너뛴다 —
 * 테스트만 돌리는 사람을 막지 않기 위해서다.
 */
const built = existsSync(OUT);

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

test('빌드된 페이지에 끊어진 내부 링크가 없다', { skip: built ? false : 'out/ 없음 — npm run build 필요' }, () => {
  const files = walk(OUT);
  const htmls = files.filter(f => f.endsWith('.html'));
  assert.ok(htmls.length > 100, `HTML이 ${htmls.length}개뿐 — 빌드가 불완전하다`);

  // 존재하는 라우트 = html 파일 경로 + 실제 정적 파일
  const routes = new Set<string>(['/']);
  for (const f of htmls) {
    const r = '/' + relative(OUT, f).replace(/\.html$/, '');
    routes.add(r);
    if (r.endsWith('/index')) routes.add(r.slice(0, -'/index'.length));
  }
  const assets = new Set(files.map(f => '/' + relative(OUT, f)));

  const broken = new Map<string, string>();
  for (const f of htmls) {
    const html = readFileSync(f, 'utf8');
    for (const m of html.matchAll(/href="(\/[^"#?]*)"/g)) {
      const href = m[1];
      const norm = href.replace(/\/$/, '') || '/';
      if (routes.has(norm) || assets.has(href) || href.startsWith('/_next')) continue;
      if (!broken.has(href)) broken.set(href, '/' + relative(OUT, f));
    }
  }

  const list = [...broken].map(([h, src]) => `${h} (예: ${src})`);
  assert.deepEqual(list, [], `존재하지 않는 곳을 가리키는 링크:\n  ${list.join('\n  ')}`);
});

test('아이콘 파일이 실제로 출력된다', { skip: built ? false : 'out/ 없음' }, () => {
  // apple-icon 규약은 .svg를 지원하지 않는다. 예전에 app/apple-icon.svg를 두는 바람에
  // 모든 페이지가 존재하지 않는 아이콘을 가리키고 있었다.
  for (const icon of ['apple-icon', 'icon.svg', 'favicon.ico']) {
    const p = join(OUT, icon);
    assert.ok(existsSync(p), `${icon}이 빌드 출력에 없다`);
    assert.ok(statSync(p).size > 0, `${icon}이 비어 있다`);
  }
});
