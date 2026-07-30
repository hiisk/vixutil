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

const OUT = new URL('../out/', import.meta.url).pathname;

/**
 * URL 경로 → lang 값. 위에서부터 먼저 맞는 것을 쓴다.
 *
 * 파일 이름이 아니라 URL 경로로 판단한다 — /en은 en.html로 나오고 /en/color는
 * en/color.html로 나와서, 파일 이름만 보면 앞의 것을 놓친다.
 */
const RULES = [
  [p => p === 'calculator/en', 'en'],
  [p => p === 'calculator/ja', 'ja'],
  [p => p === 'en' || p.startsWith('en/'), 'en'],
  // 본문이 간체라 zh보다 정확하다 (음성 합성·글꼴 선택에 쓰인다)
  [p => p === 'zh' || p.startsWith('zh/'), 'zh-Hans'],
  // 지하철 섹션부터 쓰는 여섯 언어. 목록은 lib/metro/lang.ts와 같아야 한다
  [p => p === 'es' || p.startsWith('es/'), 'es'],
  // 상파울루·리우 노선을 담았으니 유럽 포르투갈어가 아니다
  [p => p === 'pt' || p.startsWith('pt/'), 'pt-BR'],
  [p => p === 'ja' || p.startsWith('ja/'), 'ja'],
  [p => p === 'de' || p.startsWith('de/'), 'de'],
  [p => p === 'fr' || p.startsWith('fr/'), 'fr'],
  [p => p === 'hi' || p.startsWith('hi/'), 'hi'],
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
