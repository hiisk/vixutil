import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

import { NEW_SNAP_SLUGS } from '../lib/snap/tool-text.ts';
import { appFile } from './app-path.ts';

/**
 * 스냅테스트 허브가 만든 도구를 모두 거는지 본다.
 *
 * **아홉 언어와 한국어가 서로 다른 길로 목록을 만든다.** 아홉 언어는
 * `components/snap/SnapHubPage.tsx`가 `newSnapHubCards()`로 NEW_SNAP_SLUGS를
 * 훑어 자동으로 걸지만, 한국어 허브(`app/(ko)/snap/page.tsx`)는 **손으로 적은
 * TYPES 배열**을 쓴다.
 *
 * 2026-08-07에 새 도구 일곱을 넣었더니 아홉 언어에는 바로 걸리고 한국어에만
 * 안 걸렸다 — 라우트도 200이고 공유 카드도 나오는데 허브에서만 안 보였다.
 * 다른 언어를 열어 보면 멀쩡해서 눈으로도 안 잡힌다.
 * [[home-missing-sections]]에서 홈 카드 열여덟이 빠졌던 것과 같은 꼴이다.
 */
const ROOT = join(import.meta.dirname, '..');

/** 그 파일이 거는 /snap/<슬러그> — import 줄은 뺀다(경로가 아니라 모듈이다) */
function snapHrefs(path: string): Set<string> {
  const src = readFileSync(path, 'utf8').replace(/^import[^\n]*\n/gm, '');
  const out = new Set<string>();
  for (const m of src.matchAll(/['"`]\/snap\/([a-z-]+)['"`]/g)) out.add(m[1]);
  return out;
}

test('한국어 허브가 새 스냅테스트를 모두 건다', () => {
  const linked = snapHrefs(appFile('app/(ko)/snap/page.tsx'));
  const missing = NEW_SNAP_SLUGS.filter(s => !linked.has(s));
  assert.deepEqual(
    [...missing], [],
    `한국어 허브에 카드가 없는 도구 ${missing.length}개 — 아홉 언어에는 자동으로 걸리므로 한국어만 빠진다`,
  );
});

test('한국어 허브가 없는 페이지를 걸지 않는다', () => {
  /*
   * 반대 방향도 본다. 손으로 적는 배열이라 오타 하나면 404로 가는 링크가 된다.
   */
  const dir = appFile('app/(ko)/snap');
  const onDisk = new Set(
    readdirSync(dir, { withFileTypes: true }).filter(e => e.isDirectory()).map(e => e.name),
  );
  const dead = [...snapHrefs(appFile('app/(ko)/snap/page.tsx'))].filter(s => !onDisk.has(s));
  assert.deepEqual(dead, [], `허브가 없는 페이지를 건다(404): ${dead.join(', ')}`);
});

test('아홉 언어 허브도 같은 목록을 자동으로 건다', () => {
  /*
   * 자동이라 지금은 어긋날 수 없지만, 누군가 SnapHubPage에서 목록을 손으로
   * 바꾸면 그때부터 어긋난다. 자동이라는 사실 자체를 검사로 못 박는다.
   */
  const src = readFileSync(join(ROOT, 'components', 'snap', 'SnapHubPage.tsx'), 'utf8');
  assert.match(src, /newSnapHubCards\(lang\)/, '아홉 언어 허브가 자동 목록을 안 쓴다');
});

test('새 도구마다 열 언어 라우트가 다 있다', () => {
  const LANGS = ['en', 'es', 'pt-br', 'ja', 'de', 'fr', 'hi', 'zh-hans', 'zh-hant'];
  const missing: string[] = [];
  for (const slug of NEW_SNAP_SLUGS) {
    try {
      readFileSync(appFile(`app/(ko)/snap/${slug}/page.tsx`), 'utf8');
    } catch {
      missing.push(`ko/${slug}`);
    }
    for (const lang of LANGS) {
      try {
        readFileSync(appFile(`app/(${lang})/${lang}/snap/${slug}/page.tsx`), 'utf8');
      } catch {
        missing.push(`${lang}/${slug}`);
      }
    }
  }
  assert.deepEqual(missing, [], `라우트가 없는 자리: ${missing.join(', ')}`);
});
