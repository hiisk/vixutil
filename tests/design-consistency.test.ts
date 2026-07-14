import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = join(import.meta.dirname, '..');
const APP = join(ROOT, 'app');

/**
 * 페이지 컴포넌트를 모은다. 크립토도 라이트 기본으로 전환돼 이제 함께 검사한다.
 * [slug] 동적 라우트는 엔진 컴포넌트가 화면을 그리므로 별도로 본다.
 */
function pageFiles(dir: string, out: string[] = []): string[] {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) {
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

test('기본 테마는 라이트다 — 시스템 설정을 따르지 않는다', () => {
  // 구글 자동 광고는 흰 배경으로 렌더된다. 시스템이 다크인 사용자에게 자동으로
  // 검은 페이지를 주면 그 위에 흰 광고 블록이 박혀 어색해진다. 광고 색은 우리가
  // 못 바꾸므로 페이지를 밝게 두고, 다크는 사용자가 직접 켤 때만 적용한다.
  const layout = readFileSync(join(APP, 'layout.tsx'), 'utf8');
  const init = layout.match(/const THEME_INIT = `([\s\S]*?)`;/)?.[1];
  assert.ok(init, 'THEME_INIT을 찾지 못함');

  assert.doesNotMatch(init, /matchMedia|prefers-color-scheme/,
    '테마 초기화가 시스템 설정을 따르고 있다 — 라이트가 기본이어야 한다');
  assert.match(init, /localStorage/, '저장된 선택은 반영해야 한다');
});

test('항상 어두운 페이지가 남아 있지 않다', () => {
  // 크립토도 라이트 기본으로 전환했다. dark: 접두어 없는 어두운 루트 배경이
  // 남아 있으면 그 페이지만 검게 나온다.
  const stuck: string[] = [];
  for (const f of pageFiles(APP)) {
    const src = readFileSync(f, 'utf8');
    const root = src.match(/min-h-screen[^"`]*/)?.[0] ?? '';
    if (/(?<!dark:)bg-slate-9\d\d/.test(root)) stuck.push(relative(APP, f).replace('/page.tsx', ''));
  }
  assert.deepEqual(stuck, [], `라이트 기본이 아닌 페이지:\n  ${stuck.join('\n  ')}`);
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
