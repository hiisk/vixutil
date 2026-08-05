import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

import { LOCALES, NEXT_LOCALES } from '../lib/locales.ts';
import { appFile } from './app-path.ts';

/**
 * <html lang>이 경로의 언어와 맞는지 본다.
 *
 * app/layout.tsx가 lang="ko"를 박고 있어서 한때 영어·중국어 960장이 전부
 * 한국어로 선언돼 나갔다. hreflang·canonical은 멀쩡했으므로 이 값만 따로
 * 보지 않으면 드러나지 않는다 — 스크린리더가 영어를 한국어 음운으로 읽고
 * 크롬이 엉뚱한 번역을 권하는 것으로만 나타난다.
 *
 * 전에는 빌드된 out/의 HTML을 훑어 확인했다. ISR로 바꾸면서 낱장이 요청 때
 * 만들어지므로 그 방법이 통하지 않는다 — 빌드가 끝나도 훑을 파일이 없다.
 *
 * 대신 **구조**를 본다. <html>은 루트 레이아웃만 그리고, 루트 레이아웃은 route
 * group마다 하나씩 있다(app/(ko)/layout.tsx …). 그 짝이 맞으면 어느 페이지가
 * 언제 만들어지든 lang이 맞는다. 산출물을 훑는 것보다 오히려 촘촘하다 —
 * 미리 굽지 않는 아홉만 장까지 함께 지켜지기 때문이다.
 */
const ROOT = join(import.meta.dirname, '..');
const APP = join(ROOT, 'app');

/** 그룹 폴더 이름 → 그 그룹이 선언해야 하는 lang */
const WANT = new Map<string, string>(
  [...LOCALES, ...NEXT_LOCALES].map(l => [`(${l.path || 'ko'})`, l.tag]),
);

test('언어마다 route group이 하나씩 있다', () => {
  const groups = readdirSync(APP, { withFileTypes: true })
    .filter(e => e.isDirectory() && e.name.startsWith('('))
    .map(e => e.name);
  assert.deepStrictEqual([...groups].sort(), [...WANT.keys()].sort());
});

test('그룹마다 루트 레이아웃이 그 언어의 lang을 준다', () => {
  const bad: string[] = [];
  for (const [group, tag] of WANT) {
    const p = join(APP, group, 'layout.tsx');
    if (!existsSync(p)) { bad.push(`${group}: layout.tsx 없음`); continue; }
    if (!readFileSync(p.startsWith('app/') ? appFile(p) : p, 'utf8').includes(`lang="${tag}"`)) bad.push(`${group}: lang="${tag}"가 없다`);
  }
  assert.deepStrictEqual(bad, []);
});

test('루트 레이아웃이 app/layout.tsx에 남아 있지 않다', () => {
  /*
   * app/layout.tsx가 있으면 그것이 유일한 루트 레이아웃이 되고, 그룹별
   * layout.tsx는 <html>을 못 그린 채 그냥 감싸는 레이아웃이 된다. 그러면 모든
   * 언어가 다시 lang="ko"로 나간다 — 빌드는 통과하므로 열어 보기 전엔 모른다.
   */
  assert.ok(!existsSync(join(APP, 'layout.tsx')), 'app/layout.tsx를 지워야 그룹별 루트가 산다');
});

test('언어 폴더가 자기 그룹 안에 있다', () => {
  // app/(en)/en/… 꼴이어야 /en/… 주소가 (en) 그룹의 lang을 받는다
  const bad: string[] = [];
  for (const l of [...LOCALES, ...NEXT_LOCALES]) {
    if (!l.path) continue;
    if (!existsSync(join(APP, `(${l.path})`, l.path))) bad.push(`app/(${l.path})/${l.path} 없음`);
    if (existsSync(join(APP, l.path))) bad.push(`app/${l.path}가 그룹 밖에 남아 있다`);
  }
  assert.deepStrictEqual(bad, []);
});

const NEXT_APP = join(ROOT, '.next', 'server', 'app');

test('빌드된 HTML의 lang이 실제로 갈린다', { skip: existsSync(NEXT_APP) ? false : '.next 없음 — 빌드 필요' }, () => {
  /*
   * 구조만 봐서는 Next가 정말 그룹별 루트를 썼는지 알 수 없다. 빌드가 있으면
   * 실제 HTML로 한 번 더 확인한다. 미리 구운 것만 보지만, 갈리는지 아닌지는
   * 그것으로 드러난다.
   */
  const found = new Map<string, string>();
  const walk = (d: string) => {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      const p = join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith('.html')) {
        const seg = p.slice(NEXT_APP.length + 1).split('/')[0].replace(/\.html$/, '');
        const lang = readFileSync(p, 'utf8').match(/<html lang="([^"]+)"/)?.[1];
        if (lang && !found.has(seg)) found.set(seg, lang);
      }
    }
  };
  walk(NEXT_APP);

  const bad: string[] = [];
  for (const l of [...LOCALES, ...NEXT_LOCALES]) {
    if (!l.path) continue;
    const got = found.get(l.path);
    if (got && got !== l.tag) bad.push(`/${l.path} → lang="${got}" (${l.tag}이어야 한다)`);
  }
  assert.deepStrictEqual(bad, []);
  assert.ok(found.size > 5, `빌드된 HTML을 ${found.size}개밖에 못 찾았다`);
});
