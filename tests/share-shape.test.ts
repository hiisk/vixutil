import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

/**
 * 공유가 한 덩이로 가는지 본다.
 *
 * navigator.share에 무엇을 넘기느냐로 받는 쪽 모습이 갈린다. 두 가지를 틀리면
 * 하나로 보낸 것이 둘로 쪼개져 도착한다 — 보내는 쪽 화면에서는 안 보이고,
 * 실제로 카톡에 보내 본 사람만 안다.
 *
 *  1. 주소를 url 칸이 아니라 text 안에 박으면, 앱은 그것을 그냥 글로 본다.
 *     그리고 글 안의 주소를 따로 알아채서 미리보기를 하나 더 만든다 —
 *     글 한 덩이와 카드 한 장이 따로 온다. url 칸에 넣어야 앱이 og 태그로
 *     카드 하나를 만들고, 그림과 글이 그 안에 함께 들어간다.
 *
 *  2. files와 text를 같이 넘기면 메신저가 하나로 못 묶어서 사진 한 통,
 *     글 한 통으로 나눠 보낸다. 그림을 보낼 때는 그림만 보낸다.
 *
 * 이 검사가 없으면 공유 자리를 새로 만들 때마다 같은 실수를 되풀이한다.
 * 실제로 ShareButton 하나가 열여섯 곳 중 혼자 1번을 어기고 있었고, 그 버튼은
 * 스물여섯 장이 쓰고 있었다.
 */
const ROOT = join(import.meta.dirname, '..');

/** navigator.share( … ) 의 괄호 안을 통째로 집는다 */
function shareCalls(src: string): string[] {
  const out: string[] = [];
  for (const m of src.matchAll(/navigator\.share\(/g)) {
    let i = m.index! + m[0].length;
    let depth = 1;
    const start = i;
    while (i < src.length && depth > 0) {
      if (src[i] === '(') depth++;
      else if (src[i] === ')') depth--;
      i++;
    }
    out.push(src.slice(start, i - 1));
  }
  return out;
}

/**
 * 넘긴 객체의 **최상위 열쇠**만 뽑는다.
 *
 * "이름이 어딘가 나오는가"로 보면 세 번 틀린다. `url:`만 찾으면 축약한
 * `{ url }`을 놓치고, 이름만 찾으면 `text: \`\${title} \${url}\`` 이나
 * `text: title + ' ' + url` 의 url을 속성으로 세어 **정작 고쳐야 할 그 모양을
 * 통과시킨다.** 뒤쪽이 더 나쁘다 — 검사가 있는데 안 잡는다.
 *
 * 그래서 문자열 안을 비우고, 겉 중괄호를 벗기고, 깊이 0의 쉼표로만 끊어
 * 열쇠를 읽는다. 값 안에 무엇이 있든 상관하지 않는다.
 */
function topLevelKeys(arg: string): string[] {
  const bare = arg.replace(/`[^`]*`/g, "''").replace(/'[^']*'/g, "''").replace(/"[^"]*"/g, "''");
  const open = bare.indexOf('{');
  if (open < 0) return []; // 변수를 통째로 넘긴 자리 — 여기서는 못 본다
  const parts: string[] = [];
  let depth = 0, cur = '';
  for (const ch of bare.slice(open + 1)) {
    if ('{(['.includes(ch)) depth++;
    else if (ch === '}' && depth === 0) break;
    else if ('})]'.includes(ch)) depth--;
    if (ch === ',' && depth === 0) { parts.push(cur); cur = ''; continue; }
    cur += ch;
  }
  parts.push(cur);
  return parts
    .map(p => p.split(':')[0].trim())
    .filter(k => /^[A-Za-z_$][\w$]*$/.test(k));
}

function hasProp(arg: string, name: string): boolean {
  return topLevelKeys(arg).includes(name);
}

function sources(): { path: string; src: string }[] {
  const out: { path: string; src: string }[] = [];
  const walk = (dir: string) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith('.tsx') || e.name.endsWith('.ts'))
        out.push({ path: p.slice(ROOT.length + 1), src: readFileSync(p, 'utf8') });
    }
  };
  for (const d of ['app', 'components']) walk(join(ROOT, d));
  return out;
}

test('공유 자리를 실제로 찾는다', () => {
  // 정규식이 헛돌면 아래 검사들이 조용히 통과한다
  const n = sources().reduce((c, f) => c + shareCalls(f.src).length, 0);
  assert.ok(n >= 15, `navigator.share 호출을 ${n}개밖에 못 찾았다 — 찾는 방식이 깨졌다`);
});

test('링크 공유는 주소를 url 칸으로 넘긴다', () => {
  const bad: string[] = [];
  for (const { path, src } of sources()) {
    for (const arg of shareCalls(src)) {
      if (hasProp(arg, 'files')) continue; // 그림 공유는 아래 검사가 본다
      if (hasProp(arg, 'url')) continue;
      bad.push(`${path}: navigator.share(${arg.replace(/\s+/g, ' ').trim().slice(0, 70)}…)`);
    }
  }
  assert.deepStrictEqual(bad, [], 'url 칸이 없으면 글과 미리보기가 따로 간다');
});

test('그림 공유는 그림만 넘긴다', () => {
  const bad: string[] = [];
  for (const { path, src } of sources()) {
    for (const arg of shareCalls(src)) {
      if (!hasProp(arg, 'files')) continue;
      const extra = ['title', 'text', 'url'].filter(k => hasProp(arg, k));
      if (extra.length) bad.push(`${path}: files와 ${extra.join('·')}를 같이 넘긴다`);
    }
  }
  assert.deepStrictEqual(bad, [], '메신저가 사진과 글을 따로 보낸다 — 출처는 그림 안에 그려 넣는다');
});

test('결과 그림이 출처를 품고 있다', () => {
  /*
   * 위 검사 때문에 그림 공유에서는 글을 못 붙인다. 그러면 출처가 그림 안에만
   * 남으므로, 그것마저 지워지면 공유된 그림에서 사이트로 돌아올 길이 없어진다.
   */
  const src = readFileSync(join(ROOT, 'lib', 'canvas-result-card.ts'), 'utf8');
  const drawn = [...src.matchAll(/fillText\(\s*'([^']*)'/g)].map(m => m[1]);
  assert.ok(
    drawn.some(t => t.includes('vixutil.com')),
    '결과 카드에 vixutil.com이 안 그려진다 — 공유된 그림에 출처가 없다',
  );
});
