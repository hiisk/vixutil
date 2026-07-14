import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = join(import.meta.dirname, '..');

/** 크립토 화면을 그리는 파일들. OG 이미지는 별도 캔버스라 제외한다. */
function cryptoFiles(): string[] {
  const out: string[] = [];
  const walk = (dir: string) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith('.tsx') && !e.name.includes('opengraph')) out.push(p);
    }
  };
  walk(join(ROOT, 'app', 'crypto'));
  walk(join(ROOT, 'components', 'crypto'));
  return out;
}

const ACCENTS = ['yellow', 'amber', 'emerald', 'rose', 'sky', 'blue', 'orange'];
/** 컬러 배경 위의 밝은 글씨는 정상이다 (예: 노란 버튼 위 흰 글씨) */
const ON_COLOR_BG = /(?<![\w:-])bg-\w+-[4-9]00/;

/** 문자열 안에서 dark: 짝 없이 쓰인 밝은 강조색(100~400)을 찾는다 */
function faintAccents(text: string): string[] {
  if (ON_COLOR_BG.test(text)) return [];
  const found: string[] = [];
  for (const fam of ACCENTS) {
    const re = new RegExp(`(?<![\\w:-])text-${fam}-[1-4]00(?![\\w-])`, 'g');
    for (const m of text.matchAll(re)) {
      if (!text.includes(`dark:text-${fam}-`)) found.push(m[0]);
    }
  }
  return found;
}

test('크립토 강조색이 흰 배경에서 흐리지 않다', () => {
  /*
    크립토는 원래 다크 전용이라 text-emerald-400, text-amber-300 같은 밝은 톤을
    골라 썼다. 라이트 기본으로 바꾸면서 이것들이 흰 배경에서 거의 안 읽히게 됐다.

    라이트에서는 600~700으로 진하게, 다크에서는 원래 밝은 톤으로 되돌려야 한다.
    이 검사를 세 번에 걸쳐 통과시키는 동안 매번 놓친 곳이 나왔다 — className
    안, 상수(BIAS_STYLE·VOTE_CLR), 삼항식 안. 눈으로는 못 잡는다.
  */
  const bad: string[] = [];

  for (const f of cryptoFiles()) {
    const src = readFileSync(f, 'utf8');
    const name = relative(ROOT, f);

    // className="..." 과 className={`...`}
    for (const m of src.matchAll(/className=(?:"([^"]*)"|\{`([^`]*)`\})/g)) {
      for (const c of faintAccents(m[1] ?? m[2] ?? '')) bad.push(`${name}: ${c} (className)`);
    }
    // 상수·삼항식에 든 클래스 문자열
    for (const m of src.matchAll(/'([^']*text-(?:yellow|amber|emerald|rose|sky|blue|orange)-[1-4]00[^']*)'/g)) {
      for (const c of faintAccents(m[1])) bad.push(`${name}: ${c} (상수)`);
    }
  }

  assert.deepEqual(bad, [], `흰 배경에서 흐릴 강조색:\n  ${[...new Set(bad)].join('\n  ')}`);
});

test('크립토에 흰 글씨가 일반 배경 위에 남아 있지 않다', () => {
  // text-white는 컬러 카드·버튼 위에서만 쓰여야 한다. 흰 배경 위에 있으면 사라진다.
  const bad: string[] = [];
  for (const f of cryptoFiles()) {
    const src = readFileSync(f, 'utf8');
    for (const m of src.matchAll(/className=(?:"([^"]*)"|\{`([^`]*)`\})/g)) {
      const cls = m[1] ?? m[2] ?? '';
      if (!/(?<![\w:-])text-white(?![\w-])/.test(cls)) continue;
      if (ON_COLOR_BG.test(cls) || /bg-gradient-to-/.test(cls) || cls.includes('dark:text-')) continue;
      bad.push(`${relative(ROOT, f)}: ${cls.slice(0, 60)}`);
    }
  }
  assert.deepEqual(bad, [], `일반 배경 위의 흰 글씨:\n  ${bad.join('\n  ')}`);
});

test('가입 배너의 금액이 라이트에서 진하게 나온다', () => {
  // 배너의 주인공은 금액이다. 브랜드 컬러(밝은 노랑)를 글자에 그대로 쓰면
  // 흰 배경에서 안 읽힌다 — 색은 배경 틴트·테두리·CTA 버튼에만 쓴다.
  const src = readFileSync(join(ROOT, 'app', 'crypto', 'signals', 'page.tsx'), 'utf8');

  for (const amount of ['Up to \\$30,000', 'Up to \\$600']) {
    const re = new RegExp(`className="([^"]*)"[^>]*>${amount}`);
    const cls = src.match(re)?.[1];
    assert.ok(cls, `${amount} 배너 금액을 찾지 못함`);
    assert.match(cls, /text-\w+-[67]00/, `${amount}: 라이트에서 흐린 색을 쓰고 있다 — ${cls}`);
    assert.match(cls, /dark:text-\w+-[1-4]00/, `${amount}: 다크 대응이 없다 — ${cls}`);
  }
});
