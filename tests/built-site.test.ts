import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

import { ALL_LOCALES10, localeTag } from '../lib/locales.ts';
import { appEntries, appFile } from './app-path.ts';
import { CARD_KEYS } from '../lib/og-cards/keys.ts';
import { parseCardSlug } from '../lib/og-cards/index.ts';

/*
 * ISR로 바꾸면서 out/이 없어졌다. 미리 구운 페이지는 .next/server/app에
 * 남으므로 그쪽을 본다 — 전부가 아니라 빌드에서 구운 것만이다. 나머지
 * 아홉만 장은 요청 때 만들어지므로 여기서 볼 수 없다. 링크·메타 규칙은
 * 자료 쪽 검사가 이미 지키고 있고, 이 파일은 '실제로 그려진 HTML'을 보는
 * 마지막 그물로 남는다.
 */
const OUT = join(import.meta.dirname, '..', '.next', 'server', 'app');

/**
 * 빌드 산출물(.next/server/app)을 검사한다. `npm run build`를 돌린 적이 없으면 건너뛴다 —
 * 테스트만 돌리는 사람을 막지 않기 위해서다.
 */
const built = existsSync(OUT);

/*
 * HTML만 모은다. .next/server/app에는 청크·rsc·meta까지 6만 개가 들어 있어서
 * 전부 모으면 배열을 만들다 죽는다(out/일 때는 HTML과 정적 파일뿐이었다).
 */
function walk(dir: string, out: string[] = []): string[] {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

/**
 * 산출물 경로 → 실제 주소.
 *
 * .next/server/app 아래에는 route group 폴더가 그대로 남는다 —
 * (ko)/paper.html, (en)/en/paper.html 꼴이다. 주소에는 안 나타나므로 걷어낸다.
 * out/일 때는 없던 단계라, 여기를 안 거치면 모든 주소가 /(ko)/…로 어긋난다.
 */
/** Next가 만드는 내부 페이지 — 주소로 노출되지 않으므로 검사에서 뺀다 */
const INTERNAL = /^\/(_global-error|_not-found|404|500)$/;

function routeOf(file: string): string {
  const rel = relative(OUT, file).replace(/\.html$/, '');
  const segs = rel.split('/').filter(s => !(s.startsWith('(') && s.endsWith(')')));
  const r = '/' + segs.join('/');
  return r === '/index' ? '/' : r.replace(/\/index$/, '');
}

test('내부 링크가 실제 라우트 모양과 맞는다', { skip: built ? false : '.next 없음 — npm run build 필요' }, () => {
  /*
   * 전에는 "빌드된 HTML 목록"을 유효한 주소로 삼았다. ISR로 바꾸면서 낱장을
   * 미리 굽지 않으므로 그 방법이 통하지 않는다 — /paper/a4-300dpi는 멀쩡한
   * 주소인데 빌드 산출물에는 없다.
   *
   * 대신 app/의 **라우트 모양**과 맞춰 본다. app/(ko)/paper/[slug]/page.tsx가
   * 있으면 /paper/무엇이든은 성립한다. 낱장 이름이 실제로 있는지는 자료 쪽
   * 검사가 이미 본다(각 섹션의 slug 중복·형식 검사). 여기서 잡는 것은 섹션
   * 이름을 잘못 적거나 없어진 곳을 가리키는 링크다.
   */
  const APP = join(import.meta.dirname, '..', 'app');

  /** app/ 를 훑어 라우트 모양을 모은다 — route group "(xx)"는 주소에 안 나온다 */
  const patterns: string[][] = [];
  const collect = (dir: string, segs: string[]) => {
    let hasPage = false;
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      if (e.isFile() && e.name === 'page.tsx') hasPage = true;
      else if (e.isDirectory()) {
        const name = e.name;
        const next = name.startsWith('(') && name.endsWith(')') ? segs : [...segs, name];
        collect(join(dir, name), next);
      }
    }
    if (hasPage) patterns.push(segs);
  };
  collect(APP, []);
  assert.ok(patterns.length > 100, `라우트를 ${patterns.length}개밖에 못 찾았다`);

  /*
   * ── 2026-08-10 접기 ──
   * 국제 허브는 언어마다 [[...path]] 캐치올 하나가 굽는다. 그 무늬를 그대로
   * 두면 /en/무엇이든이 전부 "맞는 라우트"가 되어, 이 검사가 국제 링크의
   * 오탈자에 눈을 감는다(낱장 라우트는 그대로 남아 있으니 여기만 갈면 된다).
   * 캐치올을 빼고 lib/fold/registry.ts가 실제로 굽는 허브 목록을 넣는다.
   */
  const FOLD_LANGS = ['en', 'es', 'pt-br', 'ja', 'de', 'fr', 'hi', 'zh-hans', 'zh-hant'];
  const caught = patterns.filter(p => p.includes('[[...path]]'));
  assert.equal(caught.length, FOLD_LANGS.length, `언어 캐치올이 ${caught.length}개 — 아홉과 어긋난다`);
  for (const p of caught) patterns.splice(patterns.indexOf(p), 1);

  const reg = readFileSync(join(import.meta.dirname, '..', 'lib', 'fold', 'registry.ts'), 'utf8');
  const m = reg.match(/export const STATIC_ROUTES[^{]*\{([\s\S]*?)\n\}/);
  assert.ok(m, 'registry.ts에서 STATIC_ROUTES를 못 찾았다 — 꼴이 바뀌었으면 이 검사도 고치라');
  const hubs = [...m![1].matchAll(/'([^']*)':/g)].map(x => x[1]);
  assert.ok(hubs.length > 200, `접힌 허브가 ${hubs.length}개뿐 — 접기가 깨졌는지 보라`);
  for (const lang of FOLD_LANGS) {
    for (const k of hubs) patterns.push([lang, ...k.split('/').filter(Boolean)]);
  }

  /*
   * [slug]은 한 칸, [...slug]는 남은 칸 전부를 받는다(catch-all).
   * 그 차이를 안 보면 /en/calculator/dev/base64 같은 주소를 놓친다 —
   * app/(en)/en/calculator/[...slug]가 받는 자리다.
   */
  const matches = (href: string) => {
    const segs = href.split('/').filter(Boolean);
    return patterns.some(pat => {
      const catchAll = pat.findIndex(p => p.startsWith('[...') || p.startsWith('[[...'));
      if (catchAll >= 0) {
        if (segs.length < catchAll) return false;
        return pat.slice(0, catchAll).every((p, i) => p.startsWith('[') || p === segs[i]);
      }
      if (pat.length !== segs.length) return false;
      return pat.every((p, i) => p.startsWith('[') || p === segs[i]);
    });
  };

  const htmls = walk(OUT);
  assert.ok(htmls.length > 100, `HTML이 ${htmls.length}개뿐 — 빌드가 불완전하다`);

  const broken = new Map<string, string>();
  for (const f of htmls) {
    const html = readFileSync(f, 'utf8');
    for (const m of html.matchAll(/href="(\/[^"#?]*)"/g)) {
      const href = m[1];
      const norm = href.replace(/\/$/, '') || '/';
      // 아이콘·공유카드는 page.tsx가 아니라 파일 규약으로 생기는 라우트다
      const META_ROUTE = /^\/(apple-icon|icon|favicon|opengraph-image|robots|sitemap)(\.[a-z0-9]+)?$/;
      if (norm === '/' || href.startsWith('/_next') || /\.[a-z0-9]+$/i.test(href)) continue;
      if (META_ROUTE.test(norm)) continue;
      if (matches(norm)) continue;
      if (!broken.has(href)) broken.set(href, '/' + relative(OUT, f));
    }
  }
  const list = [...broken].map(([h, src]) => `${h} (예: ${src})`);
  assert.deepEqual(list, [], `어떤 라우트에도 안 맞는 링크:\n  ${list.join('\n  ')}`);
});

test('한 언어 안에서 title과 description이 겹치지 않는다', { skip: built ? false : '.next 없음 — npm run build 필요' }, () => {
  // 같은 언어의 두 페이지가 같은 title/description을 쓰면 검색엔진이 중복으로
  // 보고 하나만 색인하거나 순위를 깎는다.
  //
  // 언어를 가로질러서는 세지 않는다. 스페인어와 포르투갈어는 가까워서 "Calculadora
  // de IMC"처럼 같은 말이 나오는 자리가 61곳 있는데, 두 페이지는 서로를 hreflang으로
  // 가리키고 있어 검색엔진이 언어 변형으로 읽는다 — 중복이 아니다. 억지로 떼어놓으면
  // 어색한 포르투갈어를 쓰게 된다. 여기서 볼 것은 "같은 독자를 두고 경쟁하는 두
  // 페이지가 같은 제목인가"이고, 그건 언어 안에서만 성립한다.
  const LOCALE_DIRS = new Set(['en', 'es', 'pt-br', 'ja', 'de', 'fr', 'hi', 'zh-hans', 'zh-hant']);
  const titles = new Map<string, string[]>();
  const descs = new Map<string, string[]>();

  for (const f of walk(OUT)) {
    if (INTERNAL.test(routeOf(f))) continue;
    const route = routeOf(f);
    if (route === '/404' || route === '/_not-found') continue;

    const html = readFileSync(f, 'utf8');
    const t = html.match(/<title>([^<]*)<\/title>/)?.[1];
    const d = html.match(/<meta name="description" content="([^"]*)"/)?.[1];

    assert.ok(t, `${route}: <title>이 없다`);
    assert.ok(d, `${route}: description이 없다`);

    // 첫 칸이 언어 폴더면 그 언어, 아니면 한국어(루트)
    const head = route.split('/')[1] ?? '';
    const lang = LOCALE_DIRS.has(head) ? head : 'ko';
    const tk = `${lang}\u0000${t}`;
    const dk = `${lang}\u0000${d}`;
    (titles.get(tk) ?? titles.set(tk, []).get(tk)!).push(route);
    (descs.get(dk) ?? descs.set(dk, []).get(dk)!).push(route);
  }

  const show = (k: string) => k.split('\u0000')[1];
  const dupT = [...titles].filter(([, v]) => v.length > 1).map(([k, v]) => `title "${show(k)}" ← ${v.join(', ')}`);
  const dupD = [...descs].filter(([, v]) => v.length > 1).map(([k, v]) => `desc "${show(k).slice(0, 40)}…" ← ${v.join(', ')}`);

  assert.deepEqual([...dupT, ...dupD], [], `한 언어 안에서 메타데이터가 겹친다:\n  ${[...dupT, ...dupD].join('\n  ')}`);
});

test('허브 페이지가 상세 콘텐츠를 통째로 싣지 않는다', { skip: built ? false : '.next 없음 — npm run build 필요' }, () => {
  // 허브는 카드 그리드만 그린다. 클라이언트 컴포넌트에 전체 객체를 넘기면
  // 모든 문항·결과·섹션이 HTML에 직렬화된다. 실제로 /test가 1.2MB였다.
  // 카드에 필요한 건 slug·title·desc·category(+icon)뿐이다.
  //
  // 상한을 480KB로 둔 이유: 카드 아이콘을 이모지에서 그린 아이콘으로 바꾸면서
  // 카드마다 <svg><use>가 붙어 /test가 389KB에서 434KB가 됐고(그때 상한 440KB),
  // 심리테스트를 228종에서 240종으로 늘리며 450KB가 됐다. 도형 자체는
  // <symbol>로 한 번만 싣지만(ToolIconSprite) 참조 태그는 장수만큼 붙는다.
  // 카드 한 장이 2KB 안팎이므로 항목을 늘리면 이 값도 함께 올라간다.
  //
  // 이 검사가 잡으려는 것은 상세 콘텐츠 직렬화다 — 전체 객체를 클라이언트
  // 컴포넌트에 넘기면 문항·결과가 통째로 실려 1.2MB급이 된다. 480KB는 그보다
  // 한참 아래라 그 감시는 그대로 살아 있다.
  const LIMIT = 480 * 1024;
  const oversized: string[] = [];

  for (const hub of ['test', 'quiz', 'generator', 'checklist']) {
    const p = join(OUT, `${hub}.html`);
    assert.ok(existsSync(p), `${hub}.html이 없다`);
    const size = statSync(p).size;
    if (size > LIMIT) oversized.push(`/${hub}: ${Math.round(size / 1024)}KB`);
  }

  assert.deepEqual(oversized, [], `허브 HTML이 너무 크다 (상한 ${LIMIT / 1024}KB):\n  ${oversized.join('\n  ')}`);
});

test('허브 페이지가 모든 항목을 카드로 렌더한다', { skip: built ? false : 'out/ 없음' }, () => {
  // 경량 데이터로 바꾸다가 항목이 누락되면 안 된다.
  const expected: Record<string, number> = { test: 150, quiz: 100, generator: 100, checklist: 70 };
  for (const [hub, min] of Object.entries(expected)) {
    const html = readFileSync(join(OUT, `${hub}.html`), 'utf8');
    const cards = new Set([...html.matchAll(new RegExp(`href="/${hub}/([a-z0-9-]+)"`, 'g'))].map(m => m[1]));
    assert.ok(cards.size >= min, `/${hub}: 카드가 ${cards.size}개뿐 (최소 ${min}개 기대)`);
  }
});

test('허브 카드가 OG 이미지를 썸네일로 쓰지 않는다', { skip: built ? false : 'out/ 없음' }, () => {
  // OG 이미지는 1200×630 PNG(개당 ~90KB)다. 200px 카드 썸네일로 쓰면 /test 하나에
  // 194 × 90KB ≈ 17MB를 받게 된다. 게다가 그 크기에선 이미지 속 글씨가 안 읽히고
  // 제목·설명은 카드 아래 텍스트로 또 나온다 — 순수 장식이었다.
  const withImages: string[] = [];
  for (const hub of ['test', 'quiz', 'generator', 'checklist']) {
    const html = readFileSync(join(OUT, `${hub}.html`), 'utf8');
    const imgs = [...html.matchAll(/<img[^>]+src="([^"]+)"/g)].map(m => m[1]);
    const ogThumbs = imgs.filter(src => src.includes('opengraph-image'));
    if (ogThumbs.length) withImages.push(`/${hub}: ${ogThumbs.length}개`);
  }
  assert.deepEqual(withImages, [], `허브가 OG 이미지를 썸네일로 쓰고 있다:\n  ${withImages.join('\n  ')}`);
});

test('OG 이미지는 공유용으로 계속 생성된다', { skip: built ? false : 'out/ 없음' }, () => {
  // 카드 썸네일로는 안 쓰지만 소셜 공유 미리보기에는 반드시 필요하다.
  // 공유는 이 사이트의 주요 유입 채널이라 실수로 지우면 안 된다.
  //
  // 예전에는 상세 페이지마다 카드를 따로 구웠는데, 그게 3만 1천 장 5.8GB라
  // 빌드가 디스크를 넘겼다. 지금은 섹션 카드 하나를 물려받는다 — 그래서 검사할
  // 것은 "상세 페이지에 파일이 있느냐"가 아니라 "상세 페이지가 가리키는 주소에
  // 파일이 있느냐"다. 앞의 것을 보면 멀쩡한 공유를 깨졌다고 한다.
  /*
   * ── 한동안 이 검사는 아무것도 안 보고 초록이었다 ──────────────
   * ISR로 바꾼 뒤 낱장을 안 굽게 되면서 보기로 들었던 test/mbti.html이 산출물에서
   * 사라졌다. "있는 것만 본다"고 걸러 두었더니 걸러진 뒤에 남는 것이 없어서,
   * 반복문이 한 번도 안 돌고 통과했다.
   *
   * 그래서 두 가지를 바꿨다. 첫째, 반드시 구워지는 허브를 본다. 둘째, "가리키는
   * 파일이 있는가"가 아니라 "가리키는 주소를 카드 대응표가 아는가"를 본다 —
   * 카드는 이제 빌드가 아니라 첫 요청 때 만들어지므로 파일은 있을 수가 없다.
   */
  const hubs = ['test.html', 'quiz.html', 'paper.html', 'color.html'].filter(f =>
    existsSync(join(OUT, f)),
  );
  assert.ok(hubs.length >= 3, `허브가 ${hubs.length}장뿐 — 볼 것이 없으면 이 검사는 무의미하다`);
  for (const page of hubs) {
    const html = readFileSync(join(OUT, page), 'utf8');
    const m = html.match(/property="og:image" content="https:\/\/vixutil\.com([^"?]+)/);
    assert.ok(m, `${page}에 og:image가 없다 — 공유 미리보기가 깨진다`);
    const slug = m[1].replace(/^\/og\//, '').split('/');
    const at = parseCardSlug(slug);
    assert.ok(at, `${page}가 가리키는 ${m[1]}가 카드 주소 꼴이 아니다`);
    assert.ok(
      CARD_KEYS[at.lang].includes(at.key),
      `${page}가 가리키는 ${m[1]}를 카드 대응표가 모른다 — 열면 404다`,
    );
  }
});

test('색인되는 페이지에는 h1이 정확히 하나 있다', { skip: built ? false : '.next 없음 — npm run build 필요' }, () => {
  // h1이 없으면 크롤러가 페이지 주제를 잡을 근거가 약해진다. 실제로 홈·검색·타로
  // 세 곳이 h1 없이 색인되고 있었다 — 그중 홈은 사이트에서 권위가 가장 높은 페이지다.
  //
  // noindex 페이지는 제외한다. 색인되지 않으므로 h1이 없어도 잃을 것이 없고,
  // 코인별 price-prediction 731개가 여기 해당한다.
  const problems: string[] = [];

  for (const f of walk(OUT)) {
    if (INTERNAL.test(routeOf(f))) continue;
    const route = routeOf(f);
    if (route === '/404' || route === '/_not-found') continue;

    const html = readFileSync(f, 'utf8');
    if (/name="robots"[^>]*noindex/i.test(html)) continue;

    const count = (html.match(/<h1\b/g) ?? []).length;
    if (count !== 1) problems.push(`${route}: h1이 ${count}개`);
  }

  assert.deepEqual(problems, [], `h1 문제:\n  ${problems.slice(0, 10).join('\n  ')}`);
});

test('모든 페이지에 canonical이 있고 자기 URL을 가리킨다', { skip: built ? false : '.next 없음 — npm run build 필요' }, () => {
  // canonical이 없으면 ?utm=, 슬래시 유무, 파라미터 조합으로 같은 페이지가
  // 여러 URL로 색인돼 순위가 나뉜다. 실제로 1413개 페이지 전부 없었다.
  //
  // 더 위험한 건 canonical이 "틀린" 경우다 — 엉뚱한 URL을 정본으로 지목하면
  // 그 페이지가 색인에서 통째로 빠진다. 그래서 자기 URL을 가리키는지까지 본다.
  const BASE = 'https://vixutil.com';
  const problems: string[] = [];

  for (const f of walk(OUT)) {
    if (INTERNAL.test(routeOf(f))) continue;
    const route = routeOf(f);
    if (route === '/404' || route === '/_not-found') continue; // 오류 페이지는 canonical이 없는 게 맞다

    const html = readFileSync(f, 'utf8');
    const found = html.match(/rel="canonical"\s+href="([^"]+)"/)?.[1];

    if (!found) { problems.push(`${route}: canonical 없음`); continue; }

    // 홈은 Next가 metadataBase와 '/'를 합치며 트레일링 슬래시를 뺀다.
    // https://vixutil.com 과 https://vixutil.com/ 은 같은 URL이라 문제가 아니다.
    // routeOf가 /index를 /로 정규화한다. 홈의 canonical은 트레일링 슬래시가 없다
    const expected = route === '/' ? BASE : `${BASE}${route}`;
    if (found.replace(/\/$/, '') !== expected) {
      problems.push(`${route}: "${found}" (기대: "${expected}")`);
    }
  }

  assert.deepEqual(problems, [], `canonical 문제:\n  ${problems.slice(0, 10).join('\n  ')}`);
});

test('breadcrumb의 마지막 항목이 자기 URL을 가리킨다', { skip: built ? false : 'out/ 없음' }, () => {
  // 마지막 항목이 자기 경로가 아니면(계산기 97개가 /calculator를 가리키고 있었다)
  // 2번과 3번 항목의 URL이 같아져 구글이 breadcrumb을 무효로 볼 수 있다.
  const BASE = 'https://vixutil.com';
  const bad: string[] = [];

  for (const f of walk(OUT)) {
    if (INTERNAL.test(routeOf(f))) continue;
    const html = readFileSync(f, 'utf8');
    const m = html.match(/\{"@context":"https:\/\/schema\.org","@type":"BreadcrumbList".*?\]\}/);
    if (!m) continue;

    const route = routeOf(f);
    const crumbs = JSON.parse(m[0]) as { itemListElement: { item: string }[] };
    const last = crumbs.itemListElement.at(-1)?.item;

    if (last !== `${BASE}${route}`) bad.push(`${route}: 마지막이 "${last}"`);
  }

  assert.deepEqual(bad, [], `breadcrumb 마지막이 자기 URL이 아닌 페이지:\n  ${bad.slice(0, 8).join('\n  ')}`);
});

test('계산기는 WebApplication 구조화 데이터를 낸다', { skip: built ? false : 'out/ 없음' }, () => {
  // 무료 웹 도구임을 알리면 검색에서 도구로 인식된다.
  const samples = ['salary', 'loan', 'bmi', 'refinance', 'annual-leave'];
  const missing = samples.filter(s => {
    const f = join(OUT, 'calculator', `${s}.html`);
    return !existsSync(f) || !readFileSync(f.startsWith('app/') ? appFile(f) : f, 'utf8').includes('"WebApplication"');
  });
  assert.deepEqual(missing, [], `WebApplication이 없는 계산기: ${missing.join(', ')}`);
});

test('상세 페이지에 BreadcrumbList가 있다', { skip: built ? false : 'out/ 없음' }, () => {
  // 검색 결과에 "홈 > 심리테스트 > MBTI" 경로가 표시된다. 클릭률에 직접 영향을 준다.
  /*
   * ISR로 바꾼 뒤 낱장은 미리 굽지 않으므로 산출물에 없을 수 있다. 없는 것을
   * "빵꾸"로 세면 안 구운 것을 깨진 것으로 읽는다 — 있는 것만 본다.
   */
  const samples = ['test/mbti', 'quiz/joseon', 'generator/lotto', 'checklist/moving', 'calculator/salary'];
  const present = samples.filter(s => existsSync(join(OUT, `${s}.html`)));
  assert.ok(present.length > 0, '미리 구운 상세 페이지가 하나도 없다 — 표본을 다시 골라야 한다');
  const missing = present.filter(s =>
    !readFileSync(join(OUT, `${s}.html`), 'utf8').includes('BreadcrumbList'));
  assert.deepEqual(missing, [], `BreadcrumbList가 없는 페이지: ${missing.join(', ')}`);
});

test('아이콘 파일 규약이 맞다', () => {
  /*
   * apple-icon 규약은 .svg를 지원하지 않는다. 예전에 app/apple-icon.svg를 두는
   * 바람에 모든 페이지가 존재하지 않는 아이콘을 가리켰다.
   *
   * 전에는 out/에 파일이 떨어졌는지로 봤다. 지금은 아이콘도 라우트로 제공되어
   * 산출물에 파일이 없으므로, app/의 파일 이름 규약을 직접 본다 — 잘못된 확장자를
   * 잡아내는 데는 이쪽이 더 곧다.
   */
  const APP = join(import.meta.dirname, '..', 'app');
  assert.ok(existsSync(join(APP, 'favicon.ico')), 'app/favicon.ico가 없다');
  assert.ok(existsSync(join(APP, 'icon.svg')), 'app/icon.svg가 없다');
  assert.ok(!existsSync(join(APP, 'apple-icon.svg')), 'apple-icon은 .svg를 지원하지 않는다');
  const appleIcon = ['(ko)/apple-icon.tsx', 'apple-icon.tsx', 'apple-icon.png']
    .find(f => existsSync(join(APP, f)));
  assert.ok(appleIcon, 'apple-icon이 없다 (.tsx 또는 .png)');
});

test('hreflang 표기가 BCP 47이다', { skip: built ? false : '.next 없음 — npm run build 필요' }, () => {
  /*
   * 경로는 소문자(`/pt-br/…`)지만 hreflang은 BCP 47이라 지역 부분이 대문자다
   * (`pt-BR`, `zh-Hans`). 심리테스트를 아홉 언어로 넓힐 때 languages 열쇠에
   * 경로를 그대로 넣어서 `hrefLang="pt-br"`이 나갔다. 화면은 멀쩡하고 링크도
   * 살아 있어서 어느 검사에도 안 걸렸다 — 구글만 조용히 무시한다.
   *
   * 그래서 레지스트리가 아니라 **빌드된 HTML**을 본다. 표가 맞아도 그것을
   * 쓰지 않는 페이지가 있으면 소용이 없다.
   */
  const known = new Set([...ALL_LOCALES10.map(localeTag), 'x-default']);
  const bad = new Map<string, string>();
  for (const f of walk(OUT)) {
    if (INTERNAL.test(routeOf(f))) continue;
    for (const m of readFileSync(f, 'utf8').matchAll(/hrefLang="([^"]+)"/g)) {
      if (!known.has(m[1])) bad.set(m[1], relative(OUT, f));
    }
  }
  assert.deepEqual(
    [...bad], [],
    `등록되지 않은 hreflang 표기 — 경로를 그대로 쓰면 pt-br이 나간다:\n  ${
      [...bad].map(([t, f]) => `${t} (${f})`).join('\n  ')}`,
  );
});

test('hreflang이 서로를 가리킨다', { skip: built ? false : '.next 없음 — npm run build 필요' }, () => {
  /*
   * A가 B를 대안으로 선언하면 B도 A를 선언해야 한다. 한쪽만 걸린 hreflang은
   * 구글이 통째로 무시하므로, 있으나 마나가 아니라 **없느니만 못하다**.
   *
   * 실제로 이렇게 깨졌다: 심리테스트를 아홉 언어로 넓히면서 languages에 언어
   * 목록을 직접 박았더니, 한국어에도 같은 슬러그가 있는 9개(social-battery 등)에서
   * 한국어 쪽은 영어를 선언하는데 영어 쪽은 한국어를 빠뜨렸다. 두 페이지 다
   * 멀쩡히 뜨고 링크도 살아 있어서 눈으로는 알 수 없다.
   */
  const declared = new Map<string, Set<string>>();
  for (const f of walk(OUT)) {
    if (INTERNAL.test(routeOf(f))) continue;
    // out/index.html의 주소는 '/index'가 아니라 '/'다. 이걸 안 맞추면
    // 모든 언어 첫 화면이 서로를 못 가리키는 것으로 잘못 세어진다.
    const self = routeOf(f);
    const set = new Set<string>();
    for (const m of readFileSync(f, 'utf8').matchAll(/hrefLang="([^"]+)" href="https:\/\/vixutil\.com([^"]*)"/g)) {
      if (m[1] !== 'x-default') set.add(m[2] === '' ? '/' : m[2].replace(/\/$/, '') || '/');
    }
    if (set.size) declared.set(self, set);
  }
  /*
   * 사이트 전체를 본다. 한때 6,448건이 걸렸는데 원인은 하나였다 —
   * 중국어 두 언어를 더한 뒤에도 대부분의 섹션이 여덟 언어짜리
   * `alternateLanguages()`를 부르고 있어서, **중국어 페이지는 존재하는데
   * 아무도(자기 자신조차) 선언하지 않았다.** 열 언어짜리로 바꿔 풀었다.
   *
   * 넓히기 전에 반드시 슬러그가 실제로 다 있는지 확인한다. 없는 페이지를
   * 대안으로 선언하면 구글이 404를 받아 지금보다 나빠진다 —
   * 그래서 두 함수가 따로 있는 것이다(lib/locales.ts).
   */
  const bad: string[] = [];
  for (const [self, targets] of declared) {
    for (const t of targets) {
      if (t === self) continue;
      const back = declared.get(t);
      if (!back) continue;              // 상대가 hreflang을 아예 안 달았으면 이 검사 밖이다
      if (!back.has(self)) bad.push(`${self} → ${t} (돌아오는 선언 없음)`);
    }
  }
  assert.deepEqual(
    bad.slice(0, 20), [],
    `한쪽으로만 걸린 hreflang ${bad.length}건 — 구글은 상호 선언이 아니면 무시한다:\n  ${bad.slice(0, 20).join('\n  ')}`,
  );
});
