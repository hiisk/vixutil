import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';

import { ICON_FOR, GROUPS } from '../lib/og-icon-map.ts';

/**
 * 공유(OG) 카드가 빠짐없이 붙는지 본다.
 *
 * 카드는 두 군데서 조용히 어긋난다. 둘 다 빌드를 통과하므로 800장을 눈으로
 * 뒤지지 않으면 모른다.
 *  1. 새 섹션 폴더에 opengraph-image.tsx를 안 넣으면 상위 카드를 물려받는다.
 *     링크를 공유해도 그 섹션 이름이 안 나온다. (상세 페이지는 물려받는 것이
 *     정상이라 아래 SHARED_CARD에서 뺀다.)
 *  2. 데이터에 새 이모지를 쓰면 그린 아이콘이 없어 컬러 이모지가 그대로 나가
 *     흑백 세트에서 튄다.
 */

const ROOT = join(import.meta.dirname, '..');
const APP = join(ROOT, 'app');
const LIB = join(ROOT, 'lib');

function pageDirs(dir: string): string[] {
  const out: string[] = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (!e.isDirectory()) continue;
    const p = join(dir, e.name);
    if (existsSync(join(p, 'page.tsx'))) out.push(p);
    out.push(...pageDirs(p));
  }
  return out;
}

function ogRoutes(dir: string): string[] {
  const out: string[] = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...ogRoutes(p));
    else if (e.name === 'opengraph-image.tsx') out.push(p);
  }
  return out;
}

/**
 * 자체 카드를 두지 않는 구간.
 *
 * 계산기 107종은 섹션 카드를 함께 쓴다 — 계산기 하나하나가 SNS로 공유되는
 * 물건이 아니고, 카드를 따로 두면 색과 아이콘이 거의 같아 구분도 안 된다.
 * 코인 도구는 noindex라 검색·공유 대상이 아니다. /search는 검색창 자체다.
 *
 * 동적 라우트([slug]) 전체가 같은 이유로 여기 들어온다. 다만 계산기와 달리
 * 이쪽은 값이 훨씬 컸다 — [slug] 라우트 274개가 언어 열을 곱해 이미지 31,440장,
 * 6GB를 찍었고 빌드가 이십 분을 넘겨 배포가 실패하는 지점까지 갔다. 카드
 * 하나하나는 정확했지만, 그 정확함을 아무도 보지 않는 자리에서 사는 값이었다.
 *
 * 지금은 상세가 섹션 카드를 물려받는다 — og:image·twitter:image가 상위 구획의
 * 카드를 가리키는 것을 확인하고 걷어냈다. 되살리지 못하게 막는 검사는
 * tests/og-cards.test.ts에 따로 있다.
 */
const SHARED_CARD = [
  /^calculator\/[^/]+$/, /^calculator\/dev\/[^/]+$/,
  /^crypto\//, /^search$/,
  /\[/,
];

test('모든 페이지가 자기 공유 카드를 갖는다', () => {
  const orphans = pageDirs(APP)
    .map(d => relative(APP, d))
    .filter(rel => !SHARED_CARD.some(re => re.test(rel)))
    .filter(rel => !existsSync(join(APP, rel, 'opengraph-image.tsx')));
  assert.deepEqual(
    orphans, [],
    `상위 섹션 카드를 물려받는 라우트다. 폴더에 opengraph-image.tsx를 넣어라:\n  ${orphans.join('\n  ')}`,
  );
});

/**
 * 카드가 쓰는 이모지를 모은다.
 *
 * 데이터 모듈 목록을 손으로 적지 않는다 — 적어두면 새 섹션이 생겼을 때 이
 * 테스트만 조용히 못 보고 지나간다. 대신 OG 라우트가 무엇을 import하는지 보고
 * 그 모듈을 따라간다. 라우트가 카드를 그리는 데 쓰는 데이터가 곧 검사 대상이다.
 */
function cardEmojis(): Map<string, string> {
  const found = new Map<string, string>();
  const add = (icon: string, where: string) => {
    if (icon && !found.has(icon)) found.set(icon, where);
  };

  /** 체크리스트는 섹션마다 아이콘이 또 있다. 카드에 쓰는 건 항목당 첫 번째뿐 */
  const cardIconsOnly = /checklist-(data|en|zh)\.ts$/;

  const scan = (file: string) => {
    const src = readFileSync(file, 'utf8');
    const where = relative(ROOT, file);
    if (cardIconsOnly.test(file)) {
      for (const blk of src.split(/(?=slug:)/).slice(1)) {
        const m = blk.match(/icon:\s*'([^']*)'/);
        if (m) add(m[1], where);
      }
      return;
    }
    for (const m of src.matchAll(/icon:\s*'([^']*)'/g)) add(m[1], where);
  };

  /** '@/lib/x' · './x' · './x.ts' 를 lib 안 파일 경로로 */
  const resolve = (spec: string): string | null => {
    const name = spec.replace(/^@\/lib\//, '').replace(/^\.\//, '').replace(/\.ts$/, '');
    if (spec.startsWith('@/lib/') || spec.startsWith('./')) {
      const p = join(LIB, `${name}.ts`);
      return existsSync(p) ? p : null;
    }
    return null;
  };

  const seen = new Set<string>();
  const follow = (file: string, depth: number) => {
    if (seen.has(file) || depth > 3) return;
    seen.add(file);
    scan(file);
    const src = readFileSync(file, 'utf8');
    for (const m of src.matchAll(/from\s+'([^']+)'/g)) {
      const p = resolve(m[1]);
      if (p) follow(p, depth + 1);
    }
  };

  for (const route of ogRoutes(APP)) follow(route, 0);
  return found;
}

/**
 * 국기는 일부러 이모지로 둔다.
 *
 * 지역표시 두 글자로 된 국기(🇰🇷 🇰🇪 …)를 일반 깃발 윤곽 하나로 묶으면 나라
 * 100곳이 전부 같은 그림이 된다. 국기는 그 나라의 정체성이라 흑백 선으로
 * 대체할 수 있는 것이 아니다. ToolIcon·ogGlyph가 이모지로 폴백한다.
 */
function isNationalFlag(emoji: string): boolean {
  const cps = [...emoji].map(c => c.codePointAt(0)!);
  return cps.length === 2 && cps.every(c => c >= 0x1f1e6 && c <= 0x1f1ff);
}

test('카드에 쓰는 모든 이모지에 그린 아이콘이 있다', () => {
  const missing = [...cardEmojis()]
    .filter(([emoji]) => !ICON_FOR[emoji] && !isNationalFlag(emoji))
    .map(([emoji, where]) => `${emoji}  (${where})`);
  assert.deepEqual(
    missing, [],
    `아이콘이 없어 이모지가 그대로 나간다. lib/og-icons.tsx에 도형을 그리고 lib/og-icon-map.ts에 묶어라:\n  ${missing.join('\n  ')}`,
  );
});

test('매핑이 가리키는 아이콘 이름이 모두 정의돼 있다', () => {
  // og-icons.tsx는 JSX라 import할 수 없어 정의 이름만 본문에서 읽는다
  const src = readFileSync(join(LIB, 'og-icons.tsx'), 'utf8');
  const defined = new Set([...src.matchAll(/^ {2}(\w+): a =>/gm)].map(m => m[1]));
  const used = new Set(Object.keys(GROUPS));

  assert.deepEqual([...used].filter(n => !defined.has(n)), [], '매핑은 있는데 도형이 없다 (카드가 빈다)');
  assert.deepEqual([...defined].filter(n => !used.has(n)), [], '도형만 있고 아무 이모지도 안 가리킨다 (죽은 코드)');
});

test('한 이모지가 두 아이콘에 겹쳐 들어가지 않는다', () => {
  const seen = new Map<string, string>();
  const dupes: string[] = [];
  for (const [name, emojis] of Object.entries(GROUPS)) {
    for (const e of emojis) {
      const prev = seen.get(e);
      if (prev) dupes.push(`${e} → ${prev} / ${name}`);
      else seen.set(e, name);
    }
  }
  assert.deepEqual(dupes, [], '뒤에 선언된 쪽이 이기므로 어느 아이콘이 나올지 읽어서는 알 수 없다');
});
