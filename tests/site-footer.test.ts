import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

/**
 * 푸터는 모든 페이지에 붙으므로 여기 링크가 하나 깨지면 사이트 전체가 깨진 링크를
 * 갖는다. 그리고 언어별 목록을 손으로 관리하니, 없는 페이지로 보내는 일이 생긴다.
 */
const src = readFileSync('components/SiteFooter.tsx', 'utf8');

/** 특정 배열 안의 href만 뽑는다 */
function hrefsIn(arrayName: string): string[] {
  const start = src.indexOf(`const ${arrayName}`);
  assert.ok(start >= 0, `${arrayName}가 없다`);
  const end = src.indexOf('];', start);
  return [...src.slice(start, end).matchAll(/href: "([^"]+)"/g)].map(m => m[1]);
}

/** 그 경로에 실제로 페이지가 있는가 */
const routeExists = (href: string): boolean => {
  const clean = href.replace(/^\//, '');
  return existsSync(`app/${clean}/page.tsx`);
};

test('푸터가 두 언어의 섹션 목록을 모두 갖는다', () => {
  for (const name of ['SECTIONS', 'SECTIONS_EN', 'POPULAR', 'POPULAR_EN']) {
    assert.ok(hrefsIn(name).length > 0, `${name}가 비었다`);
  }
});



test('중국어 문구가 채워져 있고 영어 문구가 새지 않는다', () => {
  const zhBlock = src.slice(src.indexOf('  zh: {'), src.indexOf('} as const;'));
});

test('푸터의 Lang 타입이 세 언어를 받는다 — 좁으면 중국어 페이지가 영어 푸터를 쓴다', () => {
});

test('중국어 페이지를 그리는 컴포넌트가 lang을 그대로 넘긴다', () => {
  const pages = [
    'components/FormulaPage.tsx', 'components/FormulaHub.tsx',
    'components/CountryPage.tsx', 'components/CountryHub.tsx',
    'components/HanjaPage.tsx', 'components/HanjaHub.tsx',
    'components/ConvertPage.tsx', 'components/ConvertHub.tsx',
  ];
  for (const f of pages) {
    const body = readFileSync(f, 'utf8');
    assert.ok(
      !body.includes("lang === 'ko' ? 'ko' : 'en'"),
      `${f}가 중국어를 영어로 깎아서 넘긴다`,
    );
    assert.match(body, /<SiteFooter lang=\{lang\} \/>/, `${f}가 lang을 넘기지 않는다`);
  }
});
