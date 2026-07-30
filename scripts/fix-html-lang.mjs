/**
 * 빌드된 HTML의 <html lang>을 경로에 맞게 바꾼다.
 *
 * app/layout.tsx가 lang="ko"를 박고 있어서 영어·중국어·일본어 960장이 전부
 * 한국어로 선언돼 나갔다. 스크린리더가 영어 문장을 한국어 음운으로 읽고,
 * 크롬이 엉뚱한 번역을 권한다.
 *
 * 정석은 route group으로 root layout을 언어별로 두는 것이다(<html>은 root
 * layout만 그린다). 하지만 라우트 300개를 (ko)/(en)/(zh) 그룹으로 옮기는
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
import { LOCALES } from '../lib/locales.ts';

const OUT = new URL('../out/', import.meta.url).pathname;

/**
 * URL 경로 → lang 값.
 *
 * 목록을 여기 적지 않는다 — lib/locales.ts가 "언어를 늘리거나 줄일 때 여기만
 * 고친다"고 선언한 원천이고, 같은 목록을 두 군데 두면 한쪽만 고쳐진다.
 * 실제로 그렇게 됐다: 중국어를 걷어낸 뒤에도 이 파일에는 zh 규칙이 남아 있었고,
 * 새로 들어온 여섯 언어는 손으로 다시 적어야 했다.
 *
 * 경로(pt-br)와 선언(pt-BR)이 다른 것은 의도된 것이다 — locales.ts의 주석 참고.
 *
 * 파일 이름이 아니라 URL 경로로 판단한다. /en은 en.html로, /en/color는
 * en/color.html로 나와서 파일 이름 앞부분만 보면 앞의 것을 놓친다.
 *
 * 계산기 영어·일본어판은 /calculator/en처럼 언어가 뒤에 온다. 이 형태는 그
 * 두 장뿐이라 규칙으로 같이 만든다.
 */
const PREFIXED = LOCALES.filter(l => l.path);

const RULES = [
  // 언어가 뒤에 오는 형태를 먼저 본다 — /calculator/en은 접두어 규칙에 걸리지 않는다
  ...PREFIXED.map(({ path, tag }) => [p => p === `calculator/${path}`, tag]),
  // 접두어는 긴 것부터. pt-br이 pt보다 먼저 걸려야 한다(지금은 pt가 없지만,
  // 유럽 포르투갈어를 더하는 날 순서가 조용히 문제가 된다)
  ...[...PREFIXED]
    .sort((a, b) => b.path.length - a.path.length)
    .map(({ path, tag }) => [p => p === path || p.startsWith(`${path}/`), tag]),
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
