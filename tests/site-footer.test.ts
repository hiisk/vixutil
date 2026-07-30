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

test('푸터가 세 언어의 섹션 목록을 모두 갖는다', () => {
  for (const name of ['SECTIONS', 'SECTIONS_EN', 'SECTIONS_ZH', 'POPULAR', 'POPULAR_EN', 'POPULAR_ZH']) {
    assert.ok(hrefsIn(name).length > 0, `${name}가 비었다`);
  }
});

test('중국어 푸터의 섹션 링크가 모두 실제 /zh 라우트를 가리킨다', () => {
  const missing = hrefsIn('SECTIONS_ZH').filter(h => !h.startsWith('/zh/') || !routeExists(h));
  assert.deepEqual(missing, [], `없는 곳을 가리키는 링크: ${missing.join(', ')}`);
});

test('중국어 인기 도구 링크도 모두 실제 페이지다', () => {
  // 상세 페이지는 [slug] 동적 라우트라 섹션 허브 존재로 확인한다
  const bad = hrefsIn('POPULAR_ZH').filter(h => {
    const m = h.match(/^\/zh\/([a-z-]+)\//);
    return !m || !existsSync(`app/zh/${m[1]}/[slug]/page.tsx`);
  });
  assert.deepEqual(bad, [], `동적 라우트가 없는 링크: ${bad.join(', ')}`);
});

test('중국어 문구가 채워져 있고 영어 문구가 새지 않는다', () => {
  const zhBlock = src.slice(src.indexOf('  zh: {'), src.indexOf('} as const;'));
  assert.match(zhBlock, /[一-鿿]/, 'zh 문구에 한자가 없다');
  assert.ok(!/[가-힣]/.test(zhBlock), 'zh 문구에 한글이 있다');
  assert.ok(!/Browse other tools|Popular tools/.test(zhBlock), 'zh 문구에 영어가 남아 있다');
});

test('푸터의 Lang 타입이 세 언어를 받는다 — 좁으면 중국어 페이지가 영어 푸터를 쓴다', () => {
  assert.match(src, /type Lang = 'ko' \| 'en' \| 'zh'/);
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
