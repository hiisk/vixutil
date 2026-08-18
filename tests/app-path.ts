import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

/**
 * 라우트 경로 → 파일 경로.
 *
 * <html lang>을 언어별로 주려고 app/ 아래를 route group으로 갈랐다
 * (app/(ko)/color, app/(en)/en/color …). 그룹 폴더는 **주소에 안 나타나므로**
 * /color는 그대로지만, 파일 경로는 한 칸 깊어졌다.
 *
 * 검사 스물두 개가 join(ROOT, 'app', 'color', …) 꼴로 파일을 찾고 있었고,
 * 옮긴 뒤 여든아홉 개가 한꺼번에 깨졌다. 검사마다 그룹 이름을 적어 두면 그룹을
 * 하나 더할 때 스물두 곳을 고쳐야 하므로, 여기서 한 번만 풀어 준다.
 */
const ROOT = join(import.meta.dirname, '..');
const APP = join(ROOT, 'app');

/** 언어 폴더 이름 → 그 폴더를 감싸는 그룹 */
const GROUP_OF = (seg: string): string => `(${seg})`;

/** 접힌 아홉 언어 — 이들의 **허브** 라우트는 [[...path]] 캐치올이 받는다 */
const FOLDED_LANGS = new Set(['en', 'es', 'pt-br', 'ja', 'de', 'fr', 'hi', 'zh-hans', 'zh-hant']);

/**
 * 접힌 국제 허브 목록 — 'color', 'snap/distance' 꼴. 첫 화면('')도 들어 있다.
 *
 * 2026-08-10에 아홉 언어의 허브 page.tsx 2,178개를 언어당 캐치올 하나로 접었다
 * (컴파일이 Vercel 45분을 다 먹어 다섯 번 잘린 것을 푼 자리). 낱장 라우트는
 * 그대로 남아 있고 허브만 여기 목록으로 옮겨 왔다 — 파일을 찾던 검사들이
 * 조용히 "없음"으로 통과하지 않도록, 목록의 출처를 한 곳으로 둔다.
 */
export function foldHubs(): string[] {
  const src = readFileSync(join(ROOT, 'lib', 'fold', 'registry.ts'), 'utf8');
  const m = src.match(/export const STATIC_ROUTES[^{]*\{([\s\S]*?)\n\}/);
  if (!m) throw new Error('lib/fold/registry.ts에서 STATIC_ROUTES를 못 찾았다 — 꼴이 바뀌었으면 이 헬퍼도 고치라');
  const keys = [...m[1].matchAll(/'([^']*)':/g)].map(x => x[1]);
  if (keys.length < 200) throw new Error(`접힌 허브가 ${keys.length}개뿐 — 접기가 깨졌는지 보라`);
  return keys;
}

/**
 * 한국어 낱장 모듈의 경로 — 'body' 또는 'game/chess'를 준다.
 *
 * 2026-08-12에 한국어 낱장 101개를 라우트 둘로 접었다(Vercel 라우팅 표 2,048 한도).
 * 알맹이는 lib/ko/pages로 옮겼고 그리는 것은 그대로다. 검사가 라우트 파일을 읽어
 * 주장하던 자리를 여기로 돌린다 — 파일이 어디 있는지는 이 헬퍼만 알면 된다.
 */
export function koLeafFile(section: string): string {
  return join(ROOT, 'lib', 'ko', 'pages', `${section.replace(/\//g, '__')}__slug.tsx`);
}

/** 그 갈래의 한국어 낱장 모듈이 있는가 */
export function hasKoLeaf(section: string): boolean {
  return existsSync(koLeafFile(section));
}

/** 한국어 낱장 모듈의 소스 — 없으면 던진다(검사가 조용히 통과하지 않게) */
export function koLeafSrc(section: string): string {
  const f = koLeafFile(section);
  if (!existsSync(f)) throw new Error(`한국어 낱장 모듈이 없다: ${section} (${f})`);
  return readFileSync(f, 'utf8');
}

/**
 * 'app/color' 또는 'app/en/color'를 받아 그 언어의 낱장이 있는지 본다.
 *
 * 낱장이 사는 곳이 언어마다 다르다 — 한국어는 lib/ko/pages 모듈이고(2026-08-12에
 * Vercel 라우팅 표 2,048 한도 때문에 접었다), 아홉 언어는 아직 라우트 파일이다.
 * 언어별로 갈라 묻는 검사가 여러 곳이라 그 갈림을 여기 한 군데에 둔다.
 */
export function hasLeafAt(appPath: string): boolean {
  const rel = appPath.replace(/^app\/?/, '');
  const first = rel.split('/')[0];
  if (FOLDED_LANGS.has(first)) return existsSync(join(appJoin(rel), '[slug]', 'page.tsx'));
  return hasKoLeaf(rel);
}

/**
 * 접힌 낱장 열쇠 — 'body', 'game/chess' 꼴. SLUG_ROUTES가 근거다.
 *
 * foldHubs와 짝이다. 허브는 캐치올이 등록부를 보고 굽고, 낱장은 라우트가
 * 등록부를 보고 받는다 — 어느 쪽이든 파일 유무로는 알 수 없다.
 */
export function foldSlugs(): string[] {
  const src = readFileSync(join(ROOT, 'lib', 'fold', 'registry.ts'), 'utf8');
  const m = src.match(/export const SLUG_ROUTES[^{]*\{([\s\S]*?)\n\}/);
  if (!m) throw new Error('lib/fold/registry.ts에서 SLUG_ROUTES를 못 찾았다 — 꼴이 바뀌었으면 이 헬퍼도 고치라');
  const keys = [...m[1].matchAll(/'([^']*)':/g)].map(x => x[1]);
  /* 2026-08-18: 조합 격자 낱장을 지워 57 → 38이다(한 축 열다섯 + 두 축 넷) */
  if (keys.length < 28) throw new Error(`접힌 낱장이 ${keys.length}개뿐 — 접기가 깨졌는지 보라`);
  return keys;
}

/**
 * 그 언어에 이 라우트의 페이지가 있는가 — 파일이든 접힌 허브든.
 * route는 '/random' 또는 'random' 꼴, lang은 'ko'·'en'·'pt-br' …
 */
export function hasPage(lang: string, route: string): boolean {
  const rel = route.replace(/^\//, '');
  if (FOLDED_LANGS.has(lang) && foldHubs().includes(rel)) return true;
  return existsSync(join(appJoin(lang === 'ko' ? rel : `${lang}/${rel}`), 'page.tsx'));
}

/**
 * 접힌 라우트('body/[slug]' 꼴) → lib/fold/pages/ 모듈 경로. 없으면 null.
 * 이름 규칙은 접기 생성기와 같다: '.'→home, '/[...'→'__x', '/['→'__', '/'→'__'
 */
export function foldPageFile(rel: string): string | null {
  const name = rel === '' || rel === '.'
    ? 'home'
    : rel.replace('/[...', '__x').replace('/[', '__').replaceAll(']', '').replaceAll('/', '__');
  const p = join(ROOT, 'lib', 'fold', 'pages', `${name}.tsx`);
  return existsSync(p) ? p : null;
}

export function appJoin(...parts: string[]): string {
  // 'de/altitude'처럼 슬래시가 든 조각이 그대로 들어온다 — 먼저 쪼갠다
  const raw = parts.flatMap(p => p.split('/')).filter(Boolean);
  // 그룹 이름을 앞에 적어 넘기는 검사가 있다 — '(en)/en/…'의 그룹은 주소에 없다
  const segs = raw[0]?.startsWith('(') && raw[1] === raw[0].slice(1, -1) ? raw.slice(1) : raw;
  // 1) app/ 바로 아래 (sitemap.ts·robots.ts·globals.css 같은 것)
  const plain = join(APP, ...segs);
  if (existsSync(plain)) return plain;

  // 2) 언어 폴더면 그 언어의 그룹 안 — app/(en)/en/…
  if (segs.length > 0) {
    const inLangGroup = join(APP, GROUP_OF(segs[0]), ...segs);
    if (existsSync(inLangGroup)) return inLangGroup;

    /*
     * 2.5) 접힌 국제 라우트 — 2026-08-10에 아홉 언어의 page.tsx 3,015개를
     * 언어당 캐치올 하나 + lib/fold/pages/ 모듈 335개로 접었다(빌드가 45분을
     * 넘던 컴파일 입력을 8할 줄이는 자리). 언어별 파일을 찾는 검사들이 그대로
     * 살도록, 여기서 그 라우트의 접힌 모듈을 돌려준다.
     */
    if (FOLDED_LANGS.has(segs[0]) && segs[segs.length - 1] === 'page.tsx') {
      const folded = foldPageFile(segs.slice(1, -1).join('/'));
      if (folded) return folded;
    }
  }

  // 3) 나머지는 한국어 그룹 안 — app/(ko)/color/…
  const inKo = join(APP, '(ko)', ...segs);
  if (existsSync(inKo)) return inKo;

  /*
   * 어디에도 없으면 (ko) 경로를 돌려준다. 부르는 쪽이 existsSync로 "없음"을
   * 확인하는 검사가 많아서, 여기서 던지면 그 검사들이 의도와 다르게 죽는다.
   */
  return inKo;
}

/**
 * 'app/en/country/page.tsx' 같은 문자열 경로를 풀어 준다.
 *
 * 검사 여럿이 라우트를 문자열로 적어 두고 existsSync에 그대로 넘긴다.
 * 앞의 'app/'만 떼고 appJoin에 넘기면 그룹이 끼어든 자리를 알아서 찾는다.
 */
export function appFile(path: string): string {
  const rel = path.replace(/^\.?\/?app\//, '');
  return appJoin(...rel.split('/'));
}

/** app/ 아래 모든 그룹의 뿌리 — 라우트를 훑는 검사가 쓴다 */
export const APP_ROOTS: string[] = ['(ko)', '(en)', '(es)', '(pt-br)', '(ja)', '(de)', '(fr)', '(hi)', '(zh-hans)', '(zh-hant)']
  .map(g => join(APP, g))
  .filter(existsSync);

/**
 * app/ 바로 아래의 라우트 이름들 — 그룹 폴더를 걷어낸 결과.
 *
 * readdirSync(app)을 그대로 쓰면 (ko)·(en) 같은 그룹이 섹션으로 잡힌다.
 * 그룹은 주소에 없으므로 한 겹 들어가서 모으고, 언어 폴더도 그대로 낸다.
 */
export function appEntries(): { name: string; dir: string; isDirectory: () => boolean }[] {
  const out: { name: string; dir: string; isDirectory: () => boolean }[] = [];
  const seen = new Set<string>();
  const push = (base: string, name: string) => {
    if (seen.has(name)) return;
    seen.add(name);
    const dir = join(base, name);
    const isDir = statSync(dir).isDirectory();
    out.push({ name, dir, isDirectory: () => isDir });
  };
  for (const e of readdirSync(APP, { withFileTypes: true })) {
    if (e.isDirectory() && e.name.startsWith('(')) {
      for (const inner of readdirSync(join(APP, e.name), { withFileTypes: true })) {
        if (inner.name === 'layout.tsx') continue; // 그룹의 루트 레이아웃은 라우트가 아니다
        push(join(APP, e.name), inner.name);
      }
    } else push(APP, e.name);
  }
  return out;
}

/** app/ 기준 상대 경로에서 route group 폴더를 걷어낸다 — 주소에는 안 나타난다 */
export function stripGroups(rel: string): string {
  return rel.split('/').filter(x => !(x.startsWith('(') && x.endsWith(')'))).join('/');
}

export { APP as APP_DIR };

/*
 * ── 빌드 산출물 쪽 ───────────────────────────────────────────────
 * ISR로 바꾸면서 out/이 없어졌다. 미리 구운 HTML은 .next/server/app에 남는데,
 * 그 아래에도 route group 폴더가 그대로 있다((ko)/color.html 꼴).
 *
 * 이 헬퍼가 없어서 SEO·i18n 검사 여덟 개가 out/을 못 찾아 **말없이 건너뛰고
 * 있었다.** 초록이라 아무도 안 봤다 — hreflang 짝, canonical, og:locale,
 * 구조화 데이터가 그동안 한 번도 안 확인됐다.
 */
const BUILT_DIR = join(ROOT, '.next', 'server', 'app');

/** 빌드 산출물이 있는가 — 없으면 그쪽 검사는 건너뛴다 */
export const isBuilt = (): boolean => existsSync(BUILT_DIR);

/**
 * 라우트 → 미리 구운 HTML 경로. 안 구웠으면 null.
 *
 * 낱장은 대개 null이다. PRERENDER_PER_ROUTE가 0이라 빌드가 허브만 굽는다 —
 * "없다"와 "틀렸다"를 가려야 한다.
 */
export function builtHtml(route: string): string | null {
  const rel = route === '/' ? 'index' : route.replace(/^\//, '');
  const direct = join(BUILT_DIR, `${rel}.html`);
  if (existsSync(direct)) return direct;
  for (const g of readdirSync(BUILT_DIR, { withFileTypes: true })) {
    if (!g.isDirectory() || !g.name.startsWith('(')) continue;
    const p = join(BUILT_DIR, g.name, `${rel}.html`);
    if (existsSync(p)) return p;
  }
  return null;
}

export { BUILT_DIR };

/**
 * 빌드된 사이트맵의 주소 전부 (99,000개쯤). 빌드 전이면 null.
 *
 * ISR로 바꾼 뒤 "구운 파일 목록"은 더는 주소 목록이 아니다 — 한국어 낱장은
 * 안 굽고 번역 낱장은 굽는 식이라, 구운 것만 세면 실제와 다른 그림이 나온다.
 * 사이트맵은 굽는 것과 무관하게 전부를 담으므로 이쪽이 맞다.
 */
export function sitemapRoutes(): string[] | null {
  const files = sitemapChunkFiles();
  if (!files.length) return null;
  return files.flatMap(p =>
    [...readFileSync(p, 'utf8').matchAll(/<loc>https:\/\/vixutil\.com([^<]*)<\/loc>/g)].map(m => m[1] || '/'),
  );
}

/**
 * 구운 사이트맵 조각 파일들 — /sitemap/0.xml, /sitemap/1.xml …
 *
 * 2026-08-10에 한 파일을 조각으로 나눴다(주소 16만 개는 규약의 5만 제한을
 * 세 배 넘긴다). 그래서 여기서도 한 파일이 아니라 조각을 모아 읽는다.
 * 옛 이름도 함께 본다 — 한 파일로 되돌리는 변경이 있어도 검사가 눈멀지 않게.
 */
export function sitemapChunkFiles(): string[] {
  if (!existsSync(BUILT_DIR)) return [];
  const out: string[] = [];
  /*
   * 2026-08-12: 조각이 /sitemap.xml 의 형제다 — sitemap.xml · sitemap2.xml …
   *
   * 한 주소마다 `sitemap2.xml`(폴더)과 `sitemap2.xml.body`(내용)가 같이 있다.
   * 이름만 보고 담으면 같은 조각을 두 번 세어 개수 검사가 두 배로 나온다.
   */
  for (const f of readdirSync(BUILT_DIR)) {
    if (!/^sitemap(\d+)?\.xml(\.body)?$/.test(f)) continue;
    const p = join(BUILT_DIR, f);
    if (statSync(p).isFile()) out.push(p);
  }
  /* 옛 꼴(/sitemap/0.xml)도 함께 본다 — 되돌리는 변경이 있어도 검사가 눈멀지 않게 */
  const dir = join(BUILT_DIR, 'sitemap');
  if (existsSync(dir) && statSync(dir).isDirectory()) {
    for (const f of readdirSync(dir).sort()) {
      if (/\.xml(\.body)?$/.test(f)) out.push(join(dir, f));
    }
  }
  return out.sort((a, b) => partNo(a) - partNo(b));
}

/** 파일 이름에서 자리 번호 — sitemap.xml=0, sitemap2.xml=1, /sitemap/3.xml=3 */
function partNo(p: string): number {
  const base = p.replace(/\.body$/, '').replace(/.*\//, '');
  if (p.includes('/sitemap/')) return Number(base.replace('.xml', '')) || 0;
  const m = /^sitemap(\d+)?\.xml$/.exec(base);
  return m?.[1] ? Number(m[1]) - 1 : 0;
}

/**
 * 푸터의 원본 — 두 파일을 이어 붙인다.
 *
 * 2026-08-15에 섹션 바로가기 격자를 `components/SectionShortcuts.tsx`로 떼어냈다
 * (검색 화면의 빈 첫 화면에서도 같은 목록을 쓰려고). 푸터가 그것을 렌더하므로
 * **화면에 나오는 것은 그대로**인데, `SiteFooter.tsx`만 읽던 검사 열다섯이
 * "푸터에 이 섹션이 없다"고 하기 시작했다. 푸터는 이제 두 파일이다.
 */
export function footerSrc(): string {
  return ['SiteFooter', 'SectionShortcuts']
    .map(n => readFileSync(join(APP, '..', 'components', `${n}.tsx`), 'utf8'))
    .join('\n');
}
