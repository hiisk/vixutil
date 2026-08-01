import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

import { ALL_LOCALES10, localeTag } from '../lib/locales.ts';

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

test('한 언어 안에서 title과 description이 겹치지 않는다', { skip: built ? false : 'out/ 없음 — npm run build 필요' }, () => {
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

  for (const f of walk(OUT).filter(f => f.endsWith('.html'))) {
    const rel = relative(OUT, f).replace(/\.html$/, '');
    const route = '/' + rel;
    if (route === '/404' || route === '/_not-found') continue;

    const html = readFileSync(f, 'utf8');
    const t = html.match(/<title>([^<]*)<\/title>/)?.[1];
    const d = html.match(/<meta name="description" content="([^"]*)"/)?.[1];

    assert.ok(t, `${route}: <title>이 없다`);
    assert.ok(d, `${route}: description이 없다`);

    // 첫 칸이 언어 폴더면 그 언어, 아니면 한국어(루트)
    const head = rel.split('/')[0];
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

test('허브 페이지가 상세 콘텐츠를 통째로 싣지 않는다', { skip: built ? false : 'out/ 없음 — npm run build 필요' }, () => {
  // 허브는 카드 그리드만 그린다. 클라이언트 컴포넌트에 전체 객체를 넘기면
  // 모든 문항·결과·섹션이 HTML에 직렬화된다. 실제로 /test가 1.2MB였다.
  // 카드에 필요한 건 slug·title·desc·category(+icon)뿐이다.
  //
  // 상한을 440KB로 둔 이유: 카드 아이콘을 이모지에서 그린 아이콘으로 바꾸면서
  // 카드마다 <svg><use>가 붙어 /test가 389KB에서 434KB가 됐다. 도형 자체는
  // <symbol>로 한 번만 싣지만(ToolIconSprite) 참조 태그는 장수만큼 붙는다.
  // 이 검사가 잡으려는 것은 상세 콘텐츠 직렬화(1.2MB급)이므로 그 감시는 유지된다.
  const LIMIT = 440 * 1024;
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
  for (const page of ['test/mbti.html', 'quiz/wine.html']) {
    const html = readFileSync(join(OUT, page), 'utf8');
    const m = html.match(/property="og:image" content="https:\/\/vixutil\.com([^"?]+)/);
    assert.ok(m, `${page}에 og:image가 없다 — 공유 미리보기가 깨진다`);
    const f = join(OUT, m[1]);
    assert.ok(existsSync(f), `${page}가 가리키는 ${m[1]}가 없다 — 공유 미리보기가 깨진다`);
    assert.ok(statSync(f).size > 1000, `${m[1]}가 비어 있다`);
  }
});

test('색인되는 페이지에는 h1이 정확히 하나 있다', { skip: built ? false : 'out/ 없음 — npm run build 필요' }, () => {
  // h1이 없으면 크롤러가 페이지 주제를 잡을 근거가 약해진다. 실제로 홈·검색·타로
  // 세 곳이 h1 없이 색인되고 있었다 — 그중 홈은 사이트에서 권위가 가장 높은 페이지다.
  //
  // noindex 페이지는 제외한다. 색인되지 않으므로 h1이 없어도 잃을 것이 없고,
  // 코인별 price-prediction 731개가 여기 해당한다.
  const problems: string[] = [];

  for (const f of walk(OUT).filter(f => f.endsWith('.html'))) {
    const route = '/' + relative(OUT, f).replace(/\.html$/, '');
    if (route === '/404' || route === '/_not-found') continue;

    const html = readFileSync(f, 'utf8');
    if (/name="robots"[^>]*noindex/i.test(html)) continue;

    const count = (html.match(/<h1\b/g) ?? []).length;
    if (count !== 1) problems.push(`${route}: h1이 ${count}개`);
  }

  assert.deepEqual(problems, [], `h1 문제:\n  ${problems.slice(0, 10).join('\n  ')}`);
});

test('모든 페이지에 canonical이 있고 자기 URL을 가리킨다', { skip: built ? false : 'out/ 없음 — npm run build 필요' }, () => {
  // canonical이 없으면 ?utm=, 슬래시 유무, 파라미터 조합으로 같은 페이지가
  // 여러 URL로 색인돼 순위가 나뉜다. 실제로 1413개 페이지 전부 없었다.
  //
  // 더 위험한 건 canonical이 "틀린" 경우다 — 엉뚱한 URL을 정본으로 지목하면
  // 그 페이지가 색인에서 통째로 빠진다. 그래서 자기 URL을 가리키는지까지 본다.
  const BASE = 'https://vixutil.com';
  const problems: string[] = [];

  for (const f of walk(OUT).filter(f => f.endsWith('.html'))) {
    const route = '/' + relative(OUT, f).replace(/\.html$/, '');
    if (route === '/404' || route === '/_not-found') continue; // 오류 페이지는 canonical이 없는 게 맞다

    const html = readFileSync(f, 'utf8');
    const found = html.match(/rel="canonical"\s+href="([^"]+)"/)?.[1];

    if (!found) { problems.push(`${route}: canonical 없음`); continue; }

    // 홈은 Next가 metadataBase와 '/'를 합치며 트레일링 슬래시를 뺀다.
    // https://vixutil.com 과 https://vixutil.com/ 은 같은 URL이라 문제가 아니다.
    const expected = route === '/index' ? BASE : `${BASE}${route}`;
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

  for (const f of walk(OUT).filter(f => f.endsWith('.html'))) {
    const html = readFileSync(f, 'utf8');
    const m = html.match(/\{"@context":"https:\/\/schema\.org","@type":"BreadcrumbList".*?\]\}/);
    if (!m) continue;

    const route = '/' + relative(OUT, f).replace(/\.html$/, '');
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
    return !existsSync(f) || !readFileSync(f, 'utf8').includes('"WebApplication"');
  });
  assert.deepEqual(missing, [], `WebApplication이 없는 계산기: ${missing.join(', ')}`);
});

test('상세 페이지에 BreadcrumbList가 있다', { skip: built ? false : 'out/ 없음' }, () => {
  // 검색 결과에 "홈 > 심리테스트 > MBTI" 경로가 표시된다. 클릭률에 직접 영향을 준다.
  const samples = ['test/mbti', 'quiz/joseon', 'generator/lotto', 'checklist/moving', 'calculator/salary'];
  const missing = samples.filter(s => {
    const f = join(OUT, `${s}.html`);
    return !existsSync(f) || !readFileSync(f, 'utf8').includes('BreadcrumbList');
  });
  assert.deepEqual(missing, [], `BreadcrumbList가 없는 페이지: ${missing.join(', ')}`);
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

test('hreflang 표기가 BCP 47이다', { skip: built ? false : 'out/ 없음 — npm run build 필요' }, () => {
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
  for (const f of walk(OUT).filter(f => f.endsWith('.html'))) {
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
