import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

import { APP_DIR, builtHtml, foldHubs, foldSlugs, sitemapRoutes } from './app-path.ts';
import { DEEP_PREFIX_ROUTES } from '../lib/fold/deep-prefix.ts';
import { sectionHasLocale } from '../lib/i18n/lang.ts';
import { SLUG_ROUTES } from '../lib/fold/registry.ts';
import type { AnyLocale10 } from '../lib/locales.ts';

/**
 * 접힌 국제 라우트가 사이트맵과 어긋나지 않는지 본다.
 *
 * ── 왜 이 검사가 생겼나 (2026-08-10) ──────────────────────────
 * 아홉 언어 × 335개 라우트 파일(3,015개)로는 Vercel 무료 빌드가 컴파일만으로
 * 45분을 다 먹었다. 다섯 번 잘렸고 `Compiled successfully`가 한 번도 안 찍혔다.
 * 그래서 이렇게 갈랐다 —
 *   · 허브 242개 × 9 → 언어마다 [[...path]] 캐치올 하나가 lib/fold/registry.ts를
 *     보고 굽는다. 라우트 파일은 아홉 개뿐이다.
 *   · 낱장  93개 × 9 → 라우트 파일은 그대로 두고, 알맹이만 lib/fold/pages/의
 *     공유 모듈로 접었다(요청 때 그린다 — ISR 쓰기 0).
 *
 * **위험은 목록이 코드에서 빠지는 것이다.** 전에는 파일이 없으면 곧 404였고
 * 빌드가 라우트 목록을 보여 줬다. 지금은 등록부에서 한 줄이 사라져도 빌드는
 * 멀쩡히 끝나고, 사이트맵은 그 주소를 계속 내걸며, 아홉 언어에서 그 페이지만
 * 조용히 404가 된다. 그래서 **사이트맵을 기준으로 되짚는다.**
 */
const FOLD_LANGS = ['en', 'es', 'pt-br', 'ja', 'de', 'fr', 'hi', 'zh-hans', 'zh-hant'];

/**
 * 낱장 라우트 무늬 — 'body', 'snap/lens' 꼴 (그 아래 [slug]가 받는다).
 *
 * deep은 세 칸 낱장을 한 라우트로 접은 [a]/[b]/[slug]가 있는지다. 2026-08-12에
 * Vercel 라우팅 표 2,048개를 넘겨(2,094개) 배포가 죽어서, 언어마다 열한 갈래를
 * 하나로 접었다. 그 뒤로는 폴더를 훑어서 받는 라우트를 알 수 없다 — 등록부의
 * SLUG_ROUTES가 근거다.
 */
function leafPrefixes(lang: string): { slug: Set<string>; catchAll: Set<string>; deep: boolean } {
  const slug = new Set<string>();
  const catchAll = new Set<string>();
  const base = join(APP_DIR, `(${lang})`, lang);
  const walk = (dir: string, rel: string[]) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      if (!e.isDirectory()) continue;
      if (e.name === '[slug]') slug.add(rel.join('/'));
      else if (e.name === '[...slug]') catchAll.add(rel.join('/'));
      else if (!e.name.startsWith('[')) walk(join(dir, e.name), [...rel, e.name]);
    }
  };
  walk(base, []);
  const deep = existsSync(join(base, '[a]', '[b]', '[slug]', 'page.tsx'));
  return { slug, catchAll, deep };
}

/** 두 칸으로 된 낱장 열쇠 — [a]/[b]/[slug]가 받을 수 있는 것 */
const DEEP_SLUGS = new Set(foldSlugs().filter(k => k.includes('/')));

test('사이트맵의 국제 주소가 전부 받는 라우트를 가진다', { skip: sitemapRoutes() ? false : '빌드 산출물 없음' }, () => {
  const hubs = new Set(foldHubs());
  const urls = sitemapRoutes()!;

  const byLang = new Map(FOLD_LANGS.map(l => [l, leafPrefixes(l)]));
  const orphan = new Map<string, string>();   // 무늬 → 보기 주소
  let checked = 0;

  for (const u of urls) {
    const segs = u.split('/').filter(Boolean);
    const lang = segs[0];
    if (!byLang.has(lang)) continue;          // 한국어는 라우트 파일이 그대로다
    checked++;
    const rest = segs.slice(1);
    const key = rest.join('/');
    if (hubs.has(key)) continue;              // 허브 — 캐치올이 굽는다

    const { slug, catchAll, deep } = byLang.get(lang)!;
    if (rest.length >= 1 && slug.has(rest.slice(0, -1).join('/'))) continue;
    if ([...catchAll].some(p => key.startsWith(p + '/'))) continue;
    // 세 칸 낱장은 [a]/[b]/[slug] 하나가 받는다 — 앞 두 칸이 등록부에 있어야 한다
    if (deep && rest.length === 3 && DEEP_SLUGS.has(rest.slice(0, 2).join('/'))) continue;
    /* 접두 갈래 — 둘째 칸이 목록이라 첫 칸만 등록한다(convert/<쌍>/<값>) */
    if (deep && rest.length === 3 && DEEP_PREFIX_ROUTES[rest[0]]) continue;
    /*
     * 접히지 않고 라우트 파일로 남은 정적 장 — 정책·소개 네 장(2026-08-12)이 그렇다.
     * 접기 이후 이 검사는 "허브냐 낱장이냐"만 물었는데, 그 둘 중 어느 쪽도 아닌
     * 장이 다시 생겼다. 파일이 실제로 있는지 보면 되므로 그것을 본다 — 없는 것을
     * 있다고 넘겨주지 않으니 검사가 헐거워지지도 않는다.
     */
    if (existsSync(join(APP_DIR, `(${lang})`, lang, ...rest, 'page.tsx'))) continue;

    // 무늬로 묶어 보고한다 — 낱장 하나가 빠지면 십만 줄이 쏟아진다
    const pattern = `${lang}/${rest.slice(0, -1).join('/')}/…`;
    if (!orphan.has(pattern)) orphan.set(pattern, u);
  }

  assert.ok(checked > 100_000, `국제 주소를 ${checked}개밖에 못 봤다 — 사이트맵이나 세는 방식이 깨졌다`);
  assert.deepEqual(
    [...orphan].map(([p, u]) => `${p} (예: ${u})`), [],
    '사이트맵에 있는데 받는 라우트가 없다 — 아홉 언어에서 404가 된다.\n' +
    '  허브라면 lib/fold/registry.ts에, 낱장이라면 app/(xx)/xx/…/[slug]/page.tsx에 넣으라',
  );
});

test('접힌 허브가 아홉 언어에서 같은 목록이다', () => {
  /*
   * 접기의 값어치가 여기 있다 — 아홉 언어가 등록부 하나를 같이 보므로
   * "한 언어에만 있는 페이지"가 생길 수 없다. 그 성질이 유지되는지 본다.
   * (한국어는 손으로 적으므로 여기 대상이 아니다 — 그쪽은 별도 검사가 본다)
   */
  for (const lang of FOLD_LANGS) {
    const p = join(APP_DIR, `(${lang})`, lang, '[[...path]]', 'page.tsx');
    assert.ok(existsSync(p), `${lang}에 허브 캐치올이 없다`);
    const src = readFileSync(p, 'utf8');
    /* 2026-08-14: 목록을 그대로 굽지 않고 그 언어가 내는 갈래만 거른다.
       거르는 표는 lib/i18n/lang.ts의 SECTION_LOCALES 하나뿐이라 여전히 갈라지지 않는다 */
    assert.match(src, /staticKeysFor\(/, `${lang} 캐치올이 등록부 목록을 안 굽는다 — 허브가 갈라진다`);
    assert.match(src, new RegExp(`'${lang}'`), `${lang} 캐치올이 제 언어를 안 넘긴다`);
  }
});

test('빌드가 허브를 언어마다 다 구웠다', { skip: sitemapRoutes() ? false : '빌드 산출물 없음' }, () => {
  /*
   * 위 검사는 소스를 읽을 뿐이다. 굽는 목록이 실제로 산출물이 됐는지는
   * .next를 세어야 안다 — generateStaticParams가 조용히 빈 배열을 내도
   * 빌드는 성공으로 끝나고, 그때 허브 2,178장이 매 요청 함수를 탄다.
   */
  const hubs = foldHubs();
  const short: string[] = [];
  for (const lang of FOLD_LANGS) {
    /* 그 언어에서 안 내기로 한 갈래는 안 구워야 맞다 — SECTION_LOCALES */
    const mine = hubs.filter(h => sectionHasLocale(h.split('/')[0], lang as AnyLocale10));
    const missing = mine.filter(h => !builtHtml(h ? `/${lang}/${h}` : `/${lang}`));
    if (missing.length) short.push(`${lang}: ${missing.length}장 안 구움 (예: ${missing[0]})`);
    /* 반대쪽도 본다 — 안 내기로 한 갈래가 구워져 있으면 그것도 어긋난 것이다 */
    const extra = hubs.filter(h => !sectionHasLocale(h.split('/')[0], lang as AnyLocale10))
      .filter(h => builtHtml(`/${lang}/${h}`));
    if (extra.length) short.push(`${lang}: 안 내기로 한 ${extra.join(', ')}이 구워졌다`);
  }
  assert.deepEqual(short, [], `구운 허브가 SECTION_LOCALES와 어긋난다:\n  ${short.join('\n  ')}`);
});

test('낱장 라우트가 아홉 언어에 똑같이 있다', () => {
  /*
   * 낱장은 라우트 파일이 언어마다 남아 있다(허브와 달리 굽지 않아야 해서
   * 캐치올에 못 넣는다 — 구운 라우트 안에서는 요청 때 그리기로 못 빠져나간다).
   * 파일이 아홉 벌이라는 것은 한 언어에서만 빠질 수 있다는 뜻이다.
   */
  /*
   * 2026-08-14: 갈래에 따라 언어를 줄이기 시작했다(한자·연호·다다미·혈액형 유전은
   * 한자 문화권만). 그래서 "en과 완전히 같다"가 아니라 **SECTION_LOCALES가 정한
   * 만큼만 다르다**를 본다. 표에 없는 차이는 여전히 잡힌다.
   */
  /* FOLD_LANGS는 주소에 쓰는 이름이라 그대로 locale이다(pt-br·zh-hans) */
  /*
   * 무엇이 있어야 하는가는 **등록부**가 정한다(en을 본보기로 삼지 않는다).
   * en은 SECTION_LOCALES 때문에 한자 문화권 갈래가 빠져 있어서 본보기로 쓰면
   * 그 갈래들을 따로 되붙여야 하고, 낱장이 통째로 없어진 갈래(2026-08-15의
   * 조합 격자 열넷)를 지울 때 그 되붙이는 목록이 조용히 어긋난다.
   */
  const expected = (locale: string) =>
    Object.keys(SLUG_ROUTES)
      /* 두 칸 열쇠(body/bmi)는 라우트 파일이 아니라 [a]/[b]/[slug] 캐치올이 받는다 */
      .filter(k => !k.includes('/'))
      .filter(k => sectionHasLocale(k, locale as AnyLocale10));
  const ref = leafPrefixes('en');
  /* 2026-08-15: 검색 수요가 없는 참조표 갈래를 통째로 지우면서 68 → 35로 내렸다
     2026-08-18: 조합 격자 낱장 열다섯 갈래를 지워 26이다 */
  assert.ok(ref.slug.size > 24, `en 낱장 무늬가 ${ref.slug.size}개뿐 — 세는 방식이 깨졌다`);
  for (const lang of FOLD_LANGS) {
    const got = leafPrefixes(lang);
    assert.deepEqual([...got.slug].sort(), [...new Set(expected(lang))].sort(),
      `${lang}의 낱장 라우트가 SECTION_LOCALES와 어긋난다`);
    assert.deepEqual([...got.catchAll].sort(), [...ref.catchAll].sort(), `${lang}의 캐치올 낱장이 en과 다르다`);
  }
  /* 줄인 갈래가 실제로 빠져 있는지 — 위 식이 저절로 맞아떨어지는 것을 막는다 */
  assert.ok(!leafPrefixes('en').slug.has('hanja'), 'en에 한자 낱장 라우트가 남아 있다');
  assert.ok(leafPrefixes('ja').slug.has('hanja'), 'ja에서 한자 낱장 라우트가 사라졌다');
});

test('낱장 껍데기가 제 언어로 공유 모듈을 부른다', () => {
  /*
   * 껍데기는 다섯 줄이고 언어 이름만 다르다. 복사하다 언어를 안 바꾸면
   * 그 언어 낱장 전체가 다른 언어로 그려진다 — 화면은 멀쩡해서 안 드러난다.
   */
  const bad: string[] = [];
  for (const lang of FOLD_LANGS) {
    const walk = (dir: string) => {
      for (const e of readdirSync(dir, { withFileTypes: true })) {
        const p = join(dir, e.name);
        if (e.isDirectory()) walk(p);
        else if (e.name === 'page.tsx' && dir.includes('[') && !dir.includes('[[...path]]')) {
          const src = readFileSync(p, 'utf8');
          if (!src.includes(`build('${lang}')`)) bad.push(p.replace(APP_DIR, 'app'));
        }
      }
    };
    walk(join(APP_DIR, `(${lang})`, lang));
  }
  assert.deepEqual(bad.slice(0, 5), [], `제 언어로 안 부르는 낱장 ${bad.length}개`);
});
