/**
 * 빌드된 HTML의 <html lang>을 경로에 맞게 바꾼다.
 *
 * app/layout.tsx가 lang="ko"를 박고 있어서 번역 페이지가 전부 한국어로 선언돼
 * 나갔다. 스크린리더가 영어 문장을 한국어 음운으로 읽고,
 * 크롬이 엉뚱한 번역을 권한다.
 *
 * 정석은 route group으로 root layout을 언어별로 두는 것이다(<html>은 root
 * layout만 그린다). 하지만 라우트 수백 개를 언어별 그룹으로 옮기는
 * 구조 변경이고, 지금은 섹션이 계속 추가되는 중이라 그 비용을 낼 때가 아니다.
 *
 * output: "export"라 out/의 HTML이 최종 산출물이다. 여기서 한 글자를 바꾸면
 * 크롤러·스크린리더·브라우저가 보는 값이 전부 맞는다. <html>에는 이미
 * suppressHydrationWarning이 있어 하이드레이션 경고도 나지 않는다.
 *
 * 나중에 route group으로 옮기면 이 스크립트는 지워도 된다 —
 * tests/html-lang.test.ts가 그때도 값이 맞는지 지켜준다.
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { LOCALES, NEXT_LOCALES } from '../lib/locales.ts';

const OUT = new URL('../out/', import.meta.url).pathname;

/**
 * URL 경로 → lang 값. 위에서부터 먼저 맞는 것을 쓴다.
 *
 * 파일 이름이 아니라 URL 경로로 판단한다 — /en은 en.html로 나오고 /en/color는
 * en/color.html로 나와서, 파일 이름만 보면 앞의 것을 놓친다.
 */
/*
  규칙은 lib/locales.ts에서 만든다. 한때 여기에 언어를 손으로 적어 뒀는데,
  언어를 여섯 개 늘렸을 때 이 목록만 그대로여서 새 언어 페이지가 전부
  lang="ko"로 나갔다 — 빌드는 통과하고 요약도 "800장 교정"이라 정상처럼 보였다.

  계산기 카탈로그는 /calculator/en처럼 섹션 안에 언어가 들어가 있어서, 접두어
  규칙보다 먼저 봐야 한다. 접두어는 긴 것부터 본다 — pt-br이 pt보다 먼저 걸려야
  한다(지금은 pt가 없지만, 나중에 유럽 포르투갈어를 더하면 순서가 문제가 된다).
*/
// 늘리는 중인 언어(중국어)도 함께 본다 — 여기서 빠뜨리면 그 언어 페이지가
// 전부 lang="ko"로 나가고, 빌드는 통과한다.
const PREFIXED = [...LOCALES, ...NEXT_LOCALES].filter(l => l.path !== '');

const RULES = [
  ...PREFIXED.map(l => [p => p === `calculator/${l.path}`, l.tag]),
  ...[...PREFIXED]
    .sort((a, b) => b.path.length - a.path.length)
    .map(l => [p => p === l.path || p.startsWith(`${l.path}/`), l.tag]),
];

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

const files = await walk(OUT);
let changed = 0;
const counts = {};

for (const f of files) {
  const rel = f.slice(OUT.length);
  const path = rel.replace(/\.html$/, '').replace(/\/index$/, '');
  const rule = RULES.find(([match]) => match(path));
  if (!rule) continue;
  const lang = rule[1];
  const src = await readFile(f, 'utf8');
  const next = src.replace('<html lang="ko"', `<html lang="${lang}"`);
  if (next !== src) {
    await writeFile(f, next);
    changed++;
    counts[lang] = (counts[lang] ?? 0) + 1;
  }
}

const summary = Object.entries(counts).map(([l, n]) => `${l} ${n}장`).join(' · ');
console.log(`html lang 교정: ${changed}장${summary ? ` (${summary})` : ''}`);
