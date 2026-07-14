import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = join(import.meta.dirname, '..');
const APP = join(ROOT, 'app');

/**
 * 페이지 컴포넌트를 모은다. 크립토는 독립된 다크 테마 영어 섹션이라 제외한다.
 * [slug] 동적 라우트는 엔진 컴포넌트가 화면을 그리므로 별도로 본다.
 */
function pageFiles(dir: string, out: string[] = []): string[] {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === 'crypto') continue;
      pageFiles(p, out);
    } else if (e.name === 'page.tsx') {
      out.push(p);
    }
  }
  return out;
}

/** 화면의 뼈대를 직접 그리는 페이지 — 공용 셸(CalcShell/엔진)에 위임하지 않는 것들 */
function ownsLayout(src: string): boolean {
  return /min-h-screen/.test(src);
}

test('자체 레이아웃을 그리는 페이지는 모두 배경 글로우를 쓴다', () => {
  // 글로우가 없으면 반투명 카드가 그냥 흐린 흰 판으로 보인다.
  // 실제로 운세·스냅 18개 페이지가 이걸 빠뜨려 디자인이 따로 놀았다.
  const missing: string[] = [];

  for (const f of pageFiles(APP)) {
    const src = readFileSync(f, 'utf8');
    if (!ownsLayout(src)) continue;              // 셸에 위임하는 페이지
    if (src.includes('PageGlow')) continue;
    missing.push(relative(APP, f).replace('/page.tsx', ''));
  }

  assert.deepEqual(missing, [], `배경 글로우가 없는 페이지:\n  ${missing.join('\n  ')}`);
});

test('공용 셸과 엔진이 배경 글로우를 쓴다', () => {
  // [slug] 페이지는 화면을 엔진에 위임하므로 엔진이 글로우를 그려야 한다.
  const shells = ['CalcShell.tsx', 'TestEngine.tsx', 'QuizEngine.tsx', 'GeneratorEngine.tsx', 'ChecklistEngine.tsx'];
  const missing = shells.filter(s => {
    const p = join(ROOT, 'components', s);
    assert.ok(existsSync(p), `${s}가 없다`);
    return !readFileSync(p, 'utf8').includes('PageGlow');
  });
  assert.deepEqual(missing, [], `글로우가 없는 셸: ${missing.join(', ')}`);
});

test('PageGlow가 지원하는 accent만 쓴다', () => {
  // 오타가 나면 undefined를 구조분해해 런타임에 터진다.
  const glow = readFileSync(join(ROOT, 'components', 'PageGlow.tsx'), 'utf8');
  const supported = new Set([...glow.matchAll(/^ {2}(\w+):\s*\[/gm)].map(m => m[1]));
  assert.ok(supported.size >= 4, `accent를 ${supported.size}개만 찾음 — 파싱 실패`);

  const bad: string[] = [];
  for (const dir of ['app', 'components']) {
    const scan = (d: string) => {
      for (const e of readdirSync(d, { withFileTypes: true })) {
        const p = join(d, e.name);
        if (e.isDirectory()) scan(p);
        else if (e.name.endsWith('.tsx')) {
          const src = readFileSync(p, 'utf8');
          for (const m of src.matchAll(/<PageGlow[^>]*accent="(\w+)"/g)) {
            if (!supported.has(m[1])) bad.push(`${relative(ROOT, p)}: "${m[1]}"`);
          }
        }
      }
    };
    scan(join(ROOT, dir));
  }
  assert.deepEqual(bad, [], `PageGlow가 모르는 accent:\n  ${bad.join('\n  ')}`);
});
