import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { appJoin, footerSrc } from './app-path.ts';

/**
 * 푸터는 모든 페이지에 붙으므로 여기 링크가 하나 깨지면 사이트 전체가 깨진 링크를
 * 갖는다. 그리고 언어별 목록을 손으로 관리하니, 없는 페이지로 보내는 일이 생긴다.
 */
const src = footerSrc();

/** 특정 배열 안의 href만 뽑는다 */
function hrefsIn(arrayName: string): string[] {
  const start = src.indexOf(`const ${arrayName}`);
  /* 없으면 빈 배열이다 — 「그 목록이 사라졌는가」를 부르는 쪽에서 판단한다 */
  if (start < 0) return [];
  const end = src.indexOf('];', start);
  const block = end > start ? src.slice(start, end) : src.slice(start, src.indexOf('\n\n', start));
  return [...block.matchAll(/href: "([^"]+)"/g)].map(m => m[1]);
}

/** 그 경로에 실제로 페이지가 있는가 */
const routeExists = (href: string): boolean => {
  const clean = href.replace(/^\//, '');
  return existsSync(appJoin(...clean.split('/'), 'page.tsx'));
};

test('손으로 적은 목록이 비어 있지 않고, 그 경로에 실제 페이지가 있다', () => {
  /*
   * ── 손으로 적는 목록이 이제 둘뿐이다 (2026-08-13) ──────────
   * 전에는 SECTIONS_EN(영어 섹션 넷)도 손으로 적었는데, 아홉 언어를 접은 뒤로
   * 영어에도 114개 섹션이 다 있어서 lib/locale-home.ts에서 뽑도록 바꿨다.
   * 그 넷 중 하나가 `/calculator/en`이었다 — 계산기 158개 중 89개만 걸고 그중
   * 44개는 영어판이 있는데도 한국어 쪽을 가리키던 낡은 허브다.
   *
   * 남은 손 목록은 한국어 섹션·인기 도구와 영어 /crypto 한 줄이다. 한국어는
   * homeSections('ko')가 빈 배열이라(그쪽은 아홉 언어용) 손으로 둘 수밖에 없다.
   *
   * **그래서 routeExists를 실제로 쓴다.** 전에는 정의만 되고 아무도 안 불러서,
   * 푸터가 없는 페이지를 가리켜도 이 파일이 통과했다.
   */
  for (const name of ['SECTIONS', 'POPULAR']) {
    assert.ok(hrefsIn(name).length > 0, `${name}가 비었다`);
  }
  assert.equal(hrefsIn('SECTIONS_EN').length, 0,
    'SECTIONS_EN이 되살아났다 — 영어 섹션은 homeSections(\'en\')에서 나와야 한다');
  assert.match(src, /homeSections\(lang\)/, '푸터가 섹션 목록을 자료에서 안 뽑는다');

  const missing = [...hrefsIn('SECTIONS'), ...hrefsIn('POPULAR'), ...hrefsIn('CRYPTO_EN')]
    .filter(h => !routeExists(h));
  assert.deepEqual(missing, [], `푸터가 없는 페이지를 가리킨다 — 모든 화면에서 깨진 링크가 된다`);
});

test('열 언어 문구가 다 있고 다른 언어 문구가 새지 않는다', () => {
  /*
   * 이 검사는 **본문이 비어 있었다.** 이름은 "중국어 문구가 채워져 있고 영어가
   * 새지 않는다"였는데 assert가 한 줄도 없어서 무엇을 적어도 통과했다. 그 사이
   * 푸터가 중국어에서 검색 링크를 통째로 감추고 있었는데(약 4만 장) 아무도 못 봤다.
   *
   * 이제 실제로 본다 — 열 언어가 다섯 열쇠를 다 갖고, 한자권·데바나가리 문구가
   * 라틴 문자만으로 되어 있지 않은지(= 영어를 그대로 베껴 둔 자리인지).
   */
  const langs = ['ko', 'en', 'es', 'pt-br', 'ja', 'de', 'fr', 'hi', 'zh-hans', 'zh-hant'];
  const keys = ['searchHint', 'searchCta', 'browse', 'popular', 'tagline'];
  const copyBlock = src.slice(src.indexOf('const COPY'), src.indexOf('export default function SiteFooter'));
  for (const l of langs) {
    const key = l.includes('-') ? `'${l}'` : l;
    const at = copyBlock.indexOf(`${key}: {`);
    assert.ok(at >= 0, `COPY에 ${l}이 없다 — 그 언어 푸터가 undefined로 죽는다`);
    const block = copyBlock.slice(at, copyBlock.indexOf('},', at));
    for (const k of keys) assert.ok(block.includes(`${k}:`), `COPY.${l}에 ${k}가 없다`);
  }
  /* 한자·데바나가리 언어는 제 문자가 있어야 한다 — 영어를 베껴 두면 여기서 걸린다 */
  for (const [l, re] of [['ja', /[ぁ-んァ-ン一-龯]/], ['zh-hans', /[一-龯]/], ['zh-hant', /[一-龯]/], ['hi', /[ऀ-ॿ]/]] as const) {
    const key = l.includes('-') ? `'${l}'` : l;
    const at = copyBlock.indexOf(`${key}: {`);
    const block = copyBlock.slice(at, copyBlock.indexOf('},', at));
    assert.match(block, re, `COPY.${l}이 제 문자를 안 쓴다 — 다른 언어 문구가 새어 든 자리다`);
  }
});

test('검색 링크를 언어로 가리지 않는다', () => {
  /*
   * 중국어만 검색 링크를 감추는 줄이 있었다("아직 없어서 404다"). 그 뒤 중국어
   * 검색이 채워졌는데 줄이 남아, 중국어 약 4만 장에서 진입점이 사라져 있었다.
   * 2026-08-13에 라이브로 확인했다 — /zh-hans/search·/zh-hant/search 둘 다 200.
   *
   * 같은 실수가 다시 나면 여기서 걸린다: 언어로 검색 링크를 가르는 조건이 있으면 흠이다.
   */
  assert.ok(!/hasSearch/.test(src), '검색 링크를 언어로 가리는 조건이 되살아났다');
  assert.ok(!/lang\.startsWith\('zh-'\)/.test(src), '중국어만 따로 가르는 줄이 있다');
  assert.match(src, /href=\{searchHref\}/, '푸터에 검색 링크가 없다');
});

test('중국어 페이지를 그리는 컴포넌트가 lang을 그대로 넘긴다', () => {
  const pages = [
    'components/FormulaPage.tsx', 'components/FormulaHub.tsx',
    'components/HanjaPage.tsx', 'components/HanjaHub.tsx',
    'components/ConvertPage.tsx', 'components/ConvertHub.tsx',
  ];
  for (const f of pages) {
    const body = readFileSync(f, 'utf8');
    assert.ok(
      !body.includes("lang === 'ko' ? 'ko' : 'en'"),
      `${f}가 중국어를 영어로 깎아서 넘긴다`,
    );
    /* referral={false}가 붙어도 lang은 그대로여야 한다 — 광고 자리를 본문으로
       옮긴 화면들이 그 꼴이다(2026-08-20) */
    assert.match(body, /<SiteFooter lang=\{lang\}( referral=\{false\})? \/>/, `${f}가 lang을 넘기지 않는다`);
  }
});
