import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import { LANG_CODES } from '../lib/i18n/lang.ts';
import { appEntries } from './app-path.ts';

/**
 * 공유 카드가 빌드 중에 바깥으로 나가지 않는지 본다.
 *
 * next/og가 들고 있는 폰트는 Geist(라틴) 하나뿐이다. 넘긴 폰트가 글자를 못 덮으면
 * Satori는 구글 폰트 API로 요청을 보내고(loadGoogleFont), Vercel 빌드에서는 그게
 * ETIMEDOUT이 났다. 실패해도 빌드는 통과한다 — 카드에 두부(□)가 찍힌 채로 나갈
 * 뿐이라, 사람이 카드를 열어 보기 전에는 아무도 모른다.
 *
 * 그래서 여기서는 "카드가 그려졌는가"가 아니라 **"밖으로 나갔는가"**를 본다.
 * 실제 렌더는 next/og(WASM)를 띄워야 해서 느리므로, 폰트가 글자를 덮는지를
 * cmap으로 직접 확인한다 — 덮으면 Satori가 나갈 이유가 없다.
 */
const ROOT = join(import.meta.dirname, '..');
const DIR = join(ROOT, 'lib', 'og-fonts');

/** TTF의 cmap에서 코드포인트 집합을 뽑는다 (format 4·12만 본다) */
function coverage(file: string): Set<number> {
  const b = readFileSync(file);
  const numTables = b.readUInt16BE(4);
  let cmapOff = 0;
  for (let i = 0; i < numTables; i++) {
    const p = 12 + i * 16;
    if (b.toString('latin1', p, p + 4) === 'cmap') cmapOff = b.readUInt32BE(p + 8);
  }
  assert.ok(cmapOff, `${file}: cmap 테이블이 없다`);
  const out = new Set<number>();
  const n = b.readUInt16BE(cmapOff + 2);
  for (let i = 0; i < n; i++) {
    const rec = cmapOff + 4 + i * 8;
    const sub = cmapOff + b.readUInt32BE(rec + 4);
    const format = b.readUInt16BE(sub);
    if (format === 4) {
      const segX2 = b.readUInt16BE(sub + 6);
      const ends = sub + 14;
      const starts = ends + segX2 + 2;
      for (let s = 0; s < segX2 / 2; s++) {
        const end = b.readUInt16BE(ends + s * 2);
        const start = b.readUInt16BE(starts + s * 2);
        if (start === 0xffff) continue;
        for (let c = start; c <= end && c !== 0xffff; c++) out.add(c);
      }
    } else if (format === 12) {
      const groups = b.readUInt32BE(sub + 12);
      for (let g = 0; g < groups; g++) {
        const p = sub + 16 + g * 12;
        const start = b.readUInt32BE(p);
        const end = b.readUInt32BE(p + 4);
        for (let c = start; c <= end; c++) out.add(c);
      }
    }
  }
  return out;
}

const FILES = existsSync(DIR) ? readdirSync(DIR).filter(f => f.endsWith('.ttf')) : [];

test('폰트 파일이 갖춰져 있다', () => {
  const want = ['base', 'kr', 'jp', 'sc', 'tc', 'deva'];
  const missing: string[] = [];
  for (const w of want)
    for (const weight of ['regular', 'bold'])
      if (!FILES.includes(`noto-${w}-${weight}.ttf`)) missing.push(`noto-${w}-${weight}.ttf`);
  assert.deepStrictEqual(missing, [], 'scripts/build-og-fonts.py로 만든다');
});

test('한 벌이 8MB를 크게 넘지 않는다', () => {
  // 부분집합이라 작다. 전체 한자 폰트를 넣으면 하나가 10MB이므로, 갑자기 커졌다면
  // 부분집합이 아니라 전체를 넣은 것이다.
  const total = FILES.reduce((n, f) => n + readFileSync(join(DIR, f)).length, 0);
  assert.ok(total < 12 * 1024 * 1024, `${(total / 1024 / 1024).toFixed(1)}MB`);
});

/** 언어마다 카드에 실제로 나오는 글자 — 못 덮으면 그 언어 카드가 밖으로 나간다 */
const SAMPLES: Record<string, string> = {
  ko: '특수문자 324가지 — 복사해서 쓰세요 · 화면 규격',
  en: 'Special characters — 324 to copy · café',
  es: 'Caracteres especiales — 324 · ñ áéíóú',
  pt: 'Caracteres especiais — 324 · ção',
  ja: '特殊文字 324種類 — コピーして使う「例」',
  de: 'Sonderzeichen — 324 zum Kopieren · Größe',
  fr: 'Caractères spéciaux — 324 à copier · où',
  hi: 'विशेष वर्ण 324 — कॉपी करके इस्तेमाल करें',
  zh: '特殊符号 324 种 — 复制即可使用 · 屏幕规格',
  tw: '特殊符號 324 種 — 複製即可使用 · 螢幕規格',
};

test('열 언어 보기 글자를 폰트가 모두 덮는다', () => {
  const cover = new Map<string, Set<number>>();
  const get = (n: string) => {
    let c = cover.get(n);
    if (!c) { c = coverage(join(DIR, `noto-${n}-regular.ttf`)); cover.set(n, c); }
    return c;
  };
  // og-image.ts의 고르는 규칙과 같은 조건이어야 한다
  const pick = (t: string) => {
    const f = ['base'];
    if (/[가-힣ᄀ-ᇿ㄰-㆏]/.test(t)) f.push('kr');
    if (/[぀-ヿ]/.test(t)) f.push('jp');
    if (/[ऀ-ॿ]/.test(t)) f.push('deva');
    if (/[一-鿿㐀-䶿豈-﫿]/.test(t) && !/[぀-ヿ]/.test(t))
      f.push(/[臺灣繁體會學實國個來時後們對開關聲點體萬與號說語]/.test(t) ? 'tc' : 'sc');
    return f;
  };
  const bad: string[] = [];
  for (const lang of LANG_CODES) {
    const text = SAMPLES[lang];
    assert.ok(text, `${lang}: 보기 글자가 없다`);
    const sets = pick(text).map(get);
    for (const ch of [...text]) {
      const c = ch.codePointAt(0)!;
      // 기본 라틴은 next/og의 Geist가 덮는다
      if (c <= 0x7e) continue;
      if (!sets.some(s => s.has(c))) bad.push(`${lang}: ${ch} (U+${c.toString(16).toUpperCase()})`);
    }
  }
  assert.deepStrictEqual(bad, []);
});

test('공유 카드가 ImageResponse를 직접 부르지 않는다', () => {
  /*
   * 직접 부르면 폰트가 안 실린다. 그 실수는 빌드를 깨지 않고 카드만 조용히
   * 망가뜨리므로, 호출 자리를 하나로 묶어 두고 여기서 지킨다.
   *
   * 전에는 app 곳곳의 opengraph-image.tsx 1,799장을 훑었다. 그 1,799개
   * 라우트 엔트리가 빌드를 죽여서 lib/og-cards의 대응표 열 개로 접었다 —
   * 카드는 그대로고 훑을 자리만 바뀌었다(tests/og-cards.test.ts 참고).
   */
  const dir = join(ROOT, 'lib', 'og-cards');
  const files = readdirSync(dir).filter(f => f.endsWith('.ts') || f.endsWith('.tsx'));
  const cards = files
    .filter(f => /^[a-z]{2}\.tsx$/.test(f))
    .flatMap(f => [...readFileSync(join(dir, f), 'utf8').matchAll(/^ {2}'[^']*': \(\) =>/gm)]);
  assert.equal(cards.length, 2239, `공유 카드가 ${cards.length}장`);
  const bad = files.filter(f => readFileSync(join(dir, f), 'utf8').includes('new ImageResponse'));
  assert.deepStrictEqual(bad, []);
});
