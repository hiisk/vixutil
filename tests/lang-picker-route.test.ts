import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { appEntries, appJoin } from './app-path.ts';

const ROOT = join(import.meta.dirname, '..');

/**
 * LangPicker에 넘기는 route가 진짜 경로인지 본다.
 *
 * 2026-08-02에 일곱 군데가 접두어를 빼먹고 있었다:
 *
 *     <LangPicker route={`/${slug}`} />        // 원소·포커·큐브·주사위·정규식·체스·렌즈
 *
 * 원소 페이지에서는 한국어 링크가 `/element/1`이 아니라 `/1`을 가리켰다. 열
 * 언어 전부가 그랬으므로 그 페이지에서는 어느 언어로도 건너갈 수 없었다.
 *
 * 메뉴는 눌러야 그려져서 빌드된 HTML에는 안 나온다. hreflang은 metadata가
 * 따로 만들기 때문에 hreflang 검사에도 안 걸린다. 그래서 소스를 본다.
 *
 * 적는 것은 최소로 둔다 — 섹션 목록을 여기 적지 않고 app/에서 읽는다.
 */

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name === '.next') continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (e.name.endsWith('.tsx')) out.push(p);
  }
  return out;
}

/** app/ 바로 아래의 섹션 이름 — 언어 디렉터리는 뺀다. */
function sections(): Set<string> {
  const LOCALE_DIR = /^(en|es|pt-br|ja|de|fr|hi|zh-hans|zh-hant)$/;
  const out = new Set<string>();
  for (const e of appEntries()) {
    if (!e.isDirectory() || LOCALE_DIR.test(e.name)) continue;
    if (e.name.startsWith('[') || e.name.startsWith('(')) continue;
    out.add(e.name);
  }
  // 언어 디렉터리 안쪽도 섹션이다 — 한국어에만 없는 섹션이 있을 수 있다
  for (const e of readdirSync(appJoin('en'), { withFileTypes: true })) {
    if (e.isDirectory() && !e.name.startsWith('[')) out.add(e.name);
  }
  return out;
}

/** route= 에 넘긴 값을 문자열로 뽑는다. 문자열 리터럴과 템플릿 둘 다 받는다. */
function pickerRoutes(src: string): string[] {
  const out: string[] = [];
  for (const m of src.matchAll(/<LangPicker[\s\S]{0,400}?\/>/g)) {
    const tag = m[0];
    const lit = tag.match(/route=(?:\{)?["'`]([^"'`]*)["'`]/);
    if (lit) { out.push(lit[1]); continue; }
    const tpl = tag.match(/route=\{`([^`]*)`\}/);
    if (tpl) out.push(tpl[1]);
  }
  return out;
}

/**
 * 첫 칸이 통째로 치환식이어도 되는 예외.
 *
 * FormulaHub·FormulaPage는 body·geometry·rate 셋이 함께 쓰는데, `section.key`가
 * 곧 그 섹션 이름이다(`/body`, `/geometry`, `/rate`). 값이 섹션 이름이라는 걸
 * 확인한 것만 여기 적는다 — 그냥 통과시키려고 더하면 이 검사가 무의미해진다.
 */
const DYNAMIC_SECTION_OK = new Set([
  '${section.key}',
  /*
   * LegalPage는 소개·문의·개인정보 처리방침·이용약관 넷이 함께 쓰는데, `kind`가
   * 곧 그 주소다(/about, /contact, /privacy, /terms). 값이 LEGAL_KINDS의 넷뿐이고
   * 그 넷에 라우트 파일이 열 언어로 다 있는지는 tests/legal-pages.test.ts가 센다.
   */
  '${kind}',
]);

const SECTIONS = sections();
const FILES = walk(join(ROOT, 'app')).concat(walk(join(ROOT, 'components')));

test('LangPicker의 route는 섹션 이름으로 시작한다', () => {
  const bad: string[] = [];
  for (const f of FILES) {
    for (const route of pickerRoutes(readFileSync(f, 'utf8'))) {
      if (route === '/') continue;                     // 첫 화면
      assert.ok(route.startsWith('/'), `${f}: route가 /로 시작하지 않는다 — ${route}`);

      const first = route.slice(1).split('/')[0];
      // 첫 칸이 통째로 치환식이면 접두어를 빼먹은 것이다 — `/${slug}` 꼴
      if (first.startsWith('${')) {
        if (!DYNAMIC_SECTION_OK.has(first)) bad.push(`${rel(f)}: ${route} (섹션 접두어가 빠졌다)`);
        continue;
      }
      // 치환식이 섞이지 않은 첫 칸은 실제 섹션이어야 한다
      if (!first.includes('${') && !SECTIONS.has(first)) {
        bad.push(`${rel(f)}: ${route} (섹션 ${first} 없음)`);
        continue;
      }
      // components/<섹션>/ 아래라면 그 폴더의 섹션을 가리켜야 한다.
      // 다른 섹션의 화면을 베껴 오면 이름만 그대로 남아 언어 메뉴가 남의 집을
      // 가리킨다 — 실제로 /dew를 만들 때 /windchill이 그대로 남았다.
      const owner = /components\/([a-z0-9-]+)\//.exec(rel(f))?.[1];
      if (owner && SECTIONS.has(owner) && !first.includes('${') && first !== owner) {
        bad.push(`${rel(f)}: ${route} (이 폴더는 ${owner} 섹션이다)`);
      }
    }
  }
  assert.deepStrictEqual(bad, []);
});

test('route를 뽑는 정규식이 두 표기를 다 잡는다', () => {
  // 검사기가 헛돌면 위 검사가 조용히 통과한다 — 잡아야 할 것과 아닌 것을 나란히 넣어 본다
  const sample = [
    '<LangPicker current="ko" route="/snap" available={X} />',
    '<LangPicker current={lang} route={`/game/${slug}`} />',
    '<LangPicker current={lang}\n  route={`/${slug}`}\n  available={Y} />',
  ].join('\n');
  assert.deepStrictEqual(pickerRoutes(sample), ['/snap', '/game/${slug}', '/${slug}']);
});

test('app/ 에서 섹션을 읽어 온다', () => {
  // 섹션 목록이 비면 위 검사가 전부 통과해 버린다
  assert.ok(SECTIONS.size > 20, `섹션이 ${SECTIONS.size}개뿐이다`);
  for (const s of ['snap', 'fortune', 'element', 'convert', 'image']) {
    assert.ok(SECTIONS.has(s), `${s}를 못 읽었다`);
  }
});

function rel(f: string) {
  return f.slice(ROOT.length + 1);
}
