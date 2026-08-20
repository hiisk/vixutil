import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

import { LANGS, LANG_CODES, type Lang } from '../lib/i18n/lang.ts';
import { CARD_KEYS } from '../lib/og-cards/keys.ts';
import { DETAIL_SECTIONS, allCardParams, cardUrl, parseCardSlug } from '../lib/og-cards/index.ts';
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
 *   2,599  세탁 기호를 열 언어씩 더함(+10)
 *   2,609  퍼즐 게임 2048을 열 언어씩 더함(+10)
 *   2,619  지뢰찾기를 열 언어씩 더함(+10)
 *   2,629  스도쿠를 열 언어씩 더함(+10)
 *   2,639  슬라이딩 퍼즐을 열 언어씩 더함(+10)
 *   2,649  QR 코드 만들기를 열 언어씩 더함(+10)
 *   2,659  마우스 감도 허브를 열 언어씩 더함(+10)
 *   2,669  퍼센트 계산을 열 언어씩 더함(+10)
 *   2,549  규격·중량표 열둘을 통째로 지움(-120) — steel·rebar·screw·drill·wire·
 *          torque·tire·paper·lumber·filament·gear·resistor. 허브도 안 남겼다
 *   2,239  참조표 서른하나를 통째로 지움(-310) — windchill·dew·bandwidth·battery·
 *          bpm·lumen·drink·purifier·sun·exposure·raid·blood·ampere·heredity·
 *          powerbank·viewing·size·bra·ring·petfood·golf·cable·bignum·wifi·
 *          quake·pace·stop·element·craft·tatami·gengo. 한자 문화권 전용이던
 *          셋(heredity·tatami·gengo)도 카드는 열 언어에 다 있었다 — 그래서 −10씩이다
 *   2,099  찾아올 사람이 없는 갈래 열넷을 통째로 지움(-140) — gravity·microwave·
 *          insul·motor·fertilizer·wine·uv·dof·hardness·fret·bed·hike·altitude·
 *          darts. 허브도 안 남겼다
 *   2,109  craft를 되살림(+10) — 잘못 지웠던 것이다. 슬러그가 도구 이름인
 *          공식 계산기 40종이라 참조표 격자가 아니었다
 *
 *   2,109  2026-08-15에 낱장 카드를 켰지만 **이 수는 안 움직인다.** 낱장 카드는
 *          CARD_KEYS에 안 들어가고 요청 때 그려진다(DETAIL_SECTIONS 스물둘).
 *          여기서 세는 것은 미리 구울 수 있는 섹션 카드뿐이다 — 낱장은
 *          아래 「낱장 카드」 검사 셋이 따로 본다
 *
 *   2,079  laundry·air·dpi 셋을 통째로 지움(-30) — 한 공식·한 표에서 뽑아낸
 *          값 격자라 그 주제를 하러 찾아오는 사람이 없었다. 갈래 하나가 열
 *          언어씩 카드를 물고 있어 −10씩이다
 *
 *   2,009  2026-08-18에 country·html·css·error·music·metro·flight 일곱 갈래를
 *          통째로 지움(−70). 손으로 쓴 자료지만 위키·MDN·스택오버플로에 밀려
 *          들어오는 사람이 없다고 봤다
 *
 *   2,010  2026-08-20에 /fortune/saju-match를 냈다(+1). 궁합 도구가 다섯인데
 *          정작 그 갈래에서 제일 많이 치는 「사주 궁합」이 없었다. 한국어
 *          하나뿐이라 열 장이 아니라 한 장이다
 *
 *   2,011  같은 날 /fortune/samjae(+1). 연초마다 크게 검색되는 말인데 없었다
   */
  const WANT = 2011;
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

/**
 * ── 낱장 카드 (2026-08-15) ──────────────────────────────────────
 * 섹션 카드 2,109장을 낱장 286,266개가 나눠 쓰고 있었다 — /color/cherry도
 * /color/skyblue도 "색" 한 장이 나갔다. DETAIL_SECTIONS에 적힌 섹션은 이제
 * 슬러그까지 실은 주소(`/og/ko/color/cherry`)를 내고, 그리는 것은 render.ts의
 * DETAIL이 한다.
 *
 * 여기서 지키는 것은 **갈라 둔 둘이 어긋나지 않는 것**이다. 이름(index.ts)과
 * 그림(render.ts)이 갈라져 있는 까닭은 CARD_KEYS와 같다 — render.ts는 .tsx를
 * 끌고 와서 node --test가 못 읽는다. 어긋나면 이름만 있는 쪽은 카드가 404가
 * 되고(공유하면 그림이 아예 없다), 그림만 있는 쪽은 아무도 안 부른다.
 */
const DETAIL_MAP_KEYS = (): string[] => {
  const src = readFileSync(join(CARDS_DIR, 'render.ts'), 'utf8');
  const body = src.slice(src.indexOf('const DETAIL: Record'));
  return [...body.slice(0, body.indexOf('\n};')).matchAll(/^ {2}'([^']+)':/gm)].map(m => m[1]);
};

test('낱장 카드: 이름(index.ts)과 그림(render.ts)이 같다', () => {
  const drawn = DETAIL_MAP_KEYS();
  assert.ok(drawn.length > 0, 'render.ts에서 DETAIL을 하나도 못 읽었다');
  assert.deepStrictEqual([...drawn].sort(), [...DETAIL_SECTIONS].sort());
});

test('낱장 카드: 섹션 카드가 열 언어에 다 있다', () => {
  /*
   * 낱장 카드는 그 섹션 카드가 있는 언어에서만 나간다(cardUrl이 조상을 찾은
   * 뒤에 판단한다). 어느 언어에서 섹션 카드가 빠지면 그 언어만 조용히 낱장
   * 카드를 잃으므로 — 「언어 하나만 빠지는 구멍」 — 여기서 가로질러 센다.
   */
  const missing: string[] = [];
  for (const key of DETAIL_SECTIONS) {
    for (const lang of LANG_CODES) if (!CARD_KEYS[lang].includes(key)) missing.push(`${lang}:${key}`);
  }
  assert.deepStrictEqual(missing, []);
});

test('낱장 카드: 낱장마다 주소가 다르다', () => {
  /*
   * 이 검사의 요점은 **다르다**는 것 하나다. 고장 나면 둘이 같은 값이 되고,
   * 그것이 바로 고치려던 상태다(공유하면 전부 같은 그림).
   */
  assert.equal(cardUrl('/color/cherry'), '/og/ko/color/cherry');
  assert.notEqual(cardUrl('/color/cherry'), cardUrl('/color/skyblue'));
  assert.equal(cardUrl('/ja/game/chess/ruy-lopez'), '/og/ja/game/chess/ruy-lopez');

  // 허브는 그대로 섹션 카드다 — 칸이 하나 늘면 안 된다
  assert.equal(cardUrl('/color'), '/og/ko/color');
  assert.equal(cardUrl('/game/chess'), '/og/ko/game/chess');

  // 제 카드를 가진 낱장(color/name)은 낱장 카드로 새지 않는다
  assert.equal(cardUrl('/color/name'), '/og/ko/color/name');

  // 낱장 카드가 없는 섹션은 예전대로 섹션 카드를 물려받는다
  assert.equal(cardUrl('/convert/fps-ms'), '/og/ko/convert');
});

test('카드 주소는 언어 칸으로 시작한다', () => {
  // /og/chmod가 "한국어 chmod"인지 "chmod라는 언어"인지 가릴 수 있어야 한다
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
  /* 2026-08-15: 참조표 갈래를 통째로 지우면서 2,772 → 2,600으로 내렸다
     2026-08-18: 조합 격자 낱장과 갈래 일곱을 지워 2,431이다 */
  assert.ok(routes.length > 2350, `페이지를 ${routes.length}개밖에 못 찾았다`);
  assert.deepStrictEqual(routes.filter(r => !cardUrl(r)).slice(0, 10), []);
});

test('낱장은 자기 섹션 카드를 물려받는다', () => {
  const cases: [string, string][] = [
    ['/chmod', '/og/ko/chmod'],
    ['/chmod/755', '/og/ko/chmod'], // 낱장 → 섹션
    ['/en/chmod/644', '/og/en/chmod'],
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
   *
   * ── 이 검사가 1,394장을 놓쳤던 두 가지 ──────────────────────────
   * 처음에는 "return {" 줄부터 같은 들여쓰기의 "};"까지를 블록으로 잘라, 그
   * 안에 canonical이 있으면서 withCard로 안 감싸인 자리를 찾았다. 둘이 샜다.
   *
   *   ① 훑는 곳이 lib과 app뿐이었다. 메타데이터를 만드는 곳이 언제나
   *      라우트 옆이라고 본 것인데, 국제 페이지 일곱은 화면과 메타를 한
   *      파일에 담은 components/*IntlPage.tsx였다. 라우트는 그 함수를
   *      부르기만 한다 — 검사가 한 번도 열어 본 적 없는 파일들이었다.
   *   ② 블록의 시작을 "return {"이 줄 끝인 것으로만 봤다. 한국어
   *      test·quiz 낱장은 "return { title: ..., alternates: {"처럼 한 줄에
   *      이어 적어서, 정규식이 안 물었고 블록이 아예 안 열렸다.
   *
   * 그래서 글자를 세는 쪽으로 바꾼다. 파일에 적힌 canonical의 수만큼
   * withCard가 있어야 한다 — 줄바꿈을 어떻게 하든 걸리고, 폴더를 늘려도
   * 규칙이 그대로다. 짝이 어긋난 것(다른 객체를 감싼 withCard 하나로
   * 안 감싼 canonical 하나를 가리는 것)까지는 못 보지만, 그건 옛 블록
   * 방식도 못 봤다. 확실히 잡는 것은 "부르는 것을 통째로 잊은" 자리다.
   */
  const bad: string[] = [];
  const walk = (dir: string) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, e.name);
      if (e.isDirectory()) { walk(p); continue; }
      if (!e.name.endsWith('.ts') && !e.name.endsWith('.tsx')) continue;
      const src = readFileSync(p, 'utf8');
      const canon = src.match(/canonical:/g)?.length ?? 0;
      const wrapped = src.match(/withCard\(/g)?.length ?? 0;
      if (canon > wrapped) bad.push(`${p.slice(ROOT.length + 1)}: canonical ${canon}개 · withCard ${wrapped}개`);
    }
  };
  // withCard가 사는 곳은 제 몸 안에서 canonical을 읽으므로 셈에서 뺀다
  for (const d of ['lib', 'app', 'components']) walk(join(ROOT, d));
  assert.deepStrictEqual(bad.filter(b => !b.startsWith('lib/og-cards/')).slice(0, 10), []);
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
