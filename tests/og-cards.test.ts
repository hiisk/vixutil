import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

import { LANGS, LANG_CODES, type Lang } from '../lib/i18n/lang.ts';
import { CARD_KEYS } from '../lib/og-cards/keys.ts';
import { allCardParams, cardUrl, parseCardSlug } from '../lib/og-cards/index.ts';
import { APP_DIR, foldHubs, stripGroups } from './app-path.ts';

/**
 * 공유 카드가 한 장도 안 빠졌는지 본다.
 *
 * ── 어떻게 여기까지 왔나 ────────────────────────────────────────
 * 처음에는 상세 라우트마다 opengraph-image.tsx를 두어 페이지 하나에 카드
 * 하나를 만들었다. [slug] 라우트 274개에 언어를 곱해 31,440장이 찍히면서
 * 산출물이 6GB, 빌드가 이십 분을 넘겼다. 그래서 상세 카드를 걷어내고 섹션
 * 카드를 물려받게 했다 — 1,799장으로 줄었다.
 *
 * 그래도 모자랐다. 카드 한 장이 라우트 엔트리 하나라, 1,799개 엔트리가
 * 컴파일에서 204초를 먹었고 2코어 8GB 빌드 컨테이너가 SIGKILL로 죽었다.
 * 그래서 카드는 그대로 두고 **엔트리만** 하나로 접었다(컴파일 86초).
 * 자세한 것은 lib/og-cards/index.ts 머리말에 있다.
 *
 * ── 그래서 무엇이 위험해졌나 ────────────────────────────────────
 * 파일 규약은 "그 자리에 파일이 있으면 그 카드, 없으면 조상 것"을 알아서
 * 해 줬으므로 빠뜨릴 수가 없었다. 이제 카드를 붙이는 것은 lib/og-cards의
 * withCard이고, 그건 사람이 부르는 것이다 — **부르는 것을 잊으면 그 페이지만
 * 조용히 카드를 잃는다.** 빌드도 타입도 통과하고, 링크를 어딘가에 붙여
 * 보기 전에는 아무도 모른다.
 *
 * 그래서 여기서는 "카드가 예쁜가"가 아니라 **"모든 페이지가 카드를 받는가"**를 본다.
 */
const ROOT = join(import.meta.dirname, '..');
const CARDS_DIR = join(ROOT, 'lib', 'og-cards');

test('카드 장수가 아는 수와 같다', () => {
  /*
   * 줄었다면 어떤 언어의 어떤 섹션이 카드를 잃은 것이고, 늘었다면 새 섹션이
   * 들어온 것이다 — 둘 다 사람이 알고 넘어가야 하는 변화다. 그래서 숫자를
   * 박아 두고, 바뀔 때마다 왜 바뀌었는지 여기 적는다.
   *
   *   1,799  파일 규약을 접었을 때의 장수(app 곳곳의 opengraph-image.tsx)
   *   1,849  새 스냅테스트 다섯을 열 언어로 더함(+50)
   *   1,899  픽셀을 보는 스냅테스트 다섯을 더함(+50)
   *   1,979  새 섹션 여덟(ampere·uv·hike·insul·air·size·bra·petfood)을 열
   *          언어씩 더함(+80)
   *   1,989  비밀번호 세기를 열 언어씩 더함(+10)
   *   1,999  TV 시청거리를 열 언어씩 더함(+10)
   *   2,009  큰 수 단위를 열 언어씩 더함(+10)
   *   2,019  일본 연호를 열 언어씩 더함(+10)
   *   2,029  케이블 대역폭을 열 언어씩 더함(+10)
   *   2,039  다다미 방 넓이를 열 언어씩 더함(+10)
   *   2,049  목재 실측 치수를 열 언어씩 더함(+10)
   *   2,059  보조배터리 반입을 열 언어씩 더함(+10)
   *   2,069  골프 핸디캡을 열 언어씩 더함(+10)
   *   2,079  전자레인지 와트 환산을 열 언어씩 더함(+10)
   *   2,089  지진 규모와 에너지를 열 언어씩 더함(+10)
   *   2,099  침대 규격과 방을 열 언어씩 더함(+10)
   *   2,109  와인 병 크기를 열 언어씩 더함(+10)
 *   2,119  수혈 적합표를 열 언어씩 더함(+10)
 *   2,129  노출값(EV) 표를 열 언어씩 더함(+10)
 *   2,139  혈액형 유전표를 열 언어씩 더함(+10)
 *   2,149  RAID 용량표를 열 언어씩 더함(+10)
 *   2,159  도시 사이 거리를 열 언어씩 더함(+10)
 *   2,169  공기청정기 평수를 열 언어씩 더함(+10)
 *   2,179  술 순수 알코올량을 열 언어씩 더함(+10)
 *   2,429  그 뒤로 새 섹션 스물다섯을 열 언어씩 더함(+250)
 *   2,439  피사계 심도(초점거리 × 조리개)를 열 언어씩 더함(+10)
 *   2,449  자전거 기어비(체인링 × 스프라켓)를 열 언어씩 더함(+10)
 *   2,459  딜레이 타임(템포 × 음표)을 열 언어씩 더함(+10)
 *   2,469  필라멘트 길이(재료 × 스풀 무게)를 열 언어씩 더함(+10)
 *   2,479  공예 계산기(뜨개·재봉·퀼트·양초·비누·구슬)를 열 언어씩 더함(+10)
 *   2,489  터미널 명령어 사전을 열 언어씩 더함(+10)
 *   2,519  단축키·이모지·오류 문구 사전을 열 언어씩 더함(+30)
 *   2,549  반지 사이즈·철근 물량·비료 시비량을 열 언어씩 더함(+30)
 *   2,569  모터 토크·강재 무게를 열 언어씩 더함(+20)
 *   2,579  물 경도를 열 언어씩 더함(+10)
 *   2,589  태양 고도를 열 언어씩 더함(+10)
   */
  const WANT = 2589;
  const total = LANG_CODES.reduce((n, l) => n + CARD_KEYS[l].length, 0);
  assert.equal(total, WANT);
  assert.equal(allCardParams().length, WANT);
});

test('keys.ts가 언어별 대응표와 어긋나지 않는다', () => {
  /*
   * 주소를 푸는 쪽(keys.ts)과 그리는 쪽(<언어>.tsx)이 갈라져 있다 — 후자는
   * JSX를 끌고 와서 node --test가 못 읽기 때문이다. 갈라 놓은 값은 어긋난다.
   * 어긋나면 keys.ts에만 있는 경로는 404를 내고, .tsx에만 있는 카드는
   * 아무도 안 부르는 그림이 된다. 그래서 .tsx를 글자로 읽어 맞춰 본다.
   */
  const bad: string[] = [];
  for (const lang of LANG_CODES) {
    const src = readFileSync(join(CARDS_DIR, `${lang}.tsx`), 'utf8');
    const inFile = [...src.matchAll(/^ {2}'([^']*)': \(\) =>/gm)].map(m => m[1]);
    assert.ok(inFile.length > 0, `${lang}.tsx에서 카드를 하나도 못 읽었다`);
    const a = [...inFile].sort();
    const b = [...CARD_KEYS[lang]].sort();
    if (a.join('\n') !== b.join('\n')) {
      const only = (x: string[], y: string[]) => x.filter(k => !y.includes(k));
      bad.push(`${lang}: .tsx에만 ${JSON.stringify(only(a, b))} · keys.ts에만 ${JSON.stringify(only(b, a))}`);
    }
  }
  assert.deepStrictEqual(bad, []);
});

test('카드 주소는 언어 칸으로 시작한다', () => {
  // /og/paper가 "한국어 paper"인지 "paper라는 언어"인지 가릴 수 있어야 한다
  const segs = new Set(LANGS.map(l => l.prefix.slice(1) || 'ko'));
  assert.deepStrictEqual(allCardParams().filter(p => !segs.has(p.slug[0])).slice(0, 5), []);
  for (const p of allCardParams()) assert.ok(parseCardSlug(p.slug), p.slug.join('/'));
});

/**
 * app을 훑어 페이지 라우트를 모은다 — 그룹 폴더는 주소에 안 들어간다.
 *
 * 2026-08-10 접기 뒤로 국제 **허브**는 파일이 아니라 언어마다 하나인
 * [[...path]] 캐치올이 받는다. 그 캐치올을 그대로 세면 주소 하나로 잡혀
 * 허브 2,178장이 이 검사에서 통째로 빠진다 — 접힌 목록으로 되돌려 놓는다.
 */
const FOLD_LANGS = ['en', 'es', 'pt-br', 'ja', 'de', 'fr', 'hi', 'zh-hans', 'zh-hant'];

function pageRoutes(): string[] {
  const out: string[] = [];
  const walk = (dir: string, rel: string) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      if (e.isDirectory()) walk(join(dir, e.name), `${rel}/${e.name}`);
      else if (e.name === 'page.tsx') out.push(stripGroups(rel) || '/');
    }
  };
  walk(APP_DIR, '');
  const hubs = foldHubs();
  return out
    .filter(r => !r.includes('[[...path]]'))
    .concat(FOLD_LANGS.flatMap(l => hubs.map(h => (h ? `/${l}/${h}` : `/${l}`))));
}

test('모든 페이지가 카드를 받는다', () => {
  /*
   * 파일 규약이 하던 보증을 여기서 되찾는다. 낱장은 자기 섹션 카드를
   * 물려받으므로 [slug] 같은 칸이 있어도 상관없다 — cardUrl이 조상으로 올라간다.
   */
  const routes = pageRoutes();
  assert.ok(routes.length > 3000, `페이지를 ${routes.length}개밖에 못 찾았다`);
  assert.deepStrictEqual(routes.filter(r => !cardUrl(r)).slice(0, 10), []);
});

test('낱장은 자기 섹션 카드를 물려받는다', () => {
  const cases: [string, string][] = [
    ['/paper', '/og/ko/paper'],
    ['/paper/a4-72', '/og/ko/paper'], // 낱장 → 섹션
    ['/en/paper/a0-72', '/og/en/paper'],
    ['/en/color/name', '/og/en/color/name'], // 도구마다 제 카드가 있다
    ['/zh-hans/time/alarm', '/og/zh-hans/time/alarm'],
    ['/', '/og/ko'],
    ['/en', '/og/en'],
    ['/en/crypto', '/og/en'], // 한국어에만 있는 섹션 → 그 언어 첫 화면 카드
  ];
  for (const [route, want] of cases) assert.equal(cardUrl(route), want, route);
});

test('canonical을 든 메타데이터는 모두 withCard를 거친다', () => {
  /*
   * withCard를 안 부르면 그 페이지만 카드를 잃는다 — 빌드도 타입도 통과한다.
   * 그래서 "canonical을 든 객체 리터럴"을 전부 찾아 감싸였는지 본다.
   * 새 섹션을 손으로 적을 때 빠뜨리는 것을 여기서 잡는다.
   */
  const bad: string[] = [];
  const walk = (dir: string) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, e.name);
      if (e.isDirectory()) { walk(p); continue; }
      if (!e.name.endsWith('.ts') && !e.name.endsWith('.tsx')) continue;
      const src = readFileSync(p, 'utf8');
      if (!src.includes('canonical:')) continue;
      const lines = src.split('\n');
      for (let i = 0; i < lines.length; i++) {
        const m = /^(\s*)(?:return|export const metadata[^=]*=) \{$/.exec(lines[i]);
        if (!m) continue;
        let j = i + 1;
        while (j < lines.length && lines[j] !== `${m[1]}};`) j++;
        if (lines.slice(i, j).some(l => l.includes('canonical:')))
          bad.push(`${p.slice(ROOT.length + 1)}:${i + 1}`);
      }
    }
  };
  for (const d of ['lib', 'app']) walk(join(ROOT, d));
  assert.deepStrictEqual(bad.slice(0, 10), []);
});

test('카드를 그리는 라우트는 하나뿐이다', () => {
  /*
   * opengraph-image.tsx가 되살아나면 그 장마다 라우트 엔트리가 하나씩 생긴다.
   * 1,799장이었을 때 컴파일이 204초였고 2코어 8GB 빌드가 SIGKILL로 죽었다.
   * 접은 뒤 86초다. 파일 규약이 편해 보인다고 다시 늘리면 같은 자리로 돌아간다.
   */
  const found: string[] = [];
  const walk = (dir: string) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.startsWith('opengraph-image') || e.name.startsWith('twitter-image')) found.push(p);
    }
  };
  walk(APP_DIR);
  assert.deepStrictEqual(found, [], '카드는 app/og/[...slug]/route.tsx 하나가 그린다');
});

test('카드 대응표가 ImageResponse를 직접 부르지 않는다', () => {
  // 직접 부르면 폰트가 안 실린다 — 부르는 자리는 lib/og-image.ts 하나여야 한다
  const bad = readdirSync(CARDS_DIR)
    .filter(f => f.endsWith('.tsx') || f.endsWith('.ts'))
    .filter(f => readFileSync(join(CARDS_DIR, f), 'utf8').includes('new ImageResponse'));
  assert.deepStrictEqual(bad, []);
});

test('언어마다 카드 수가 엇비슷하다', () => {
  /*
   * 한 언어만 뭉텅 빠지면 그 언어 카드가 전부 첫 화면 카드로 떨어진다.
   * 조상으로 올라가는 규칙 때문에 404가 아니라 "엉뚱한 그림"으로 나타나서
   * 눈에 안 띈다. 한국어만 전용 섹션이 있어 조금 많다.
   */
  const counts = LANG_CODES.map(l => [l, CARD_KEYS[l].length] as [Lang, number]);
  const min = Math.min(...counts.map(c => c[1]));
  assert.deepStrictEqual(counts.filter(([, n]) => n < min * 0.9), []);
  assert.ok(min >= 170, `가장 적은 언어가 ${min}장뿐: ${JSON.stringify(counts)}`);
});
