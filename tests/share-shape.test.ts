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
 *  1. title·text·url은 한 통이 아니라 **세 조각**이다. title은 안드로이드에서
 *     Intent.EXTRA_SUBJECT로 가는데 메신저는 그것을 통째로 버리고, text와 url을
 *     같이 넘기면 iOS는 활동 항목 두 개를 넘겨 앱마다 하나만 집거나 두 통으로
 *     쪼갠다. 그래서 링크 공유는 전부 lib/share/ui.ts의 shareOne 하나를 지난다 —
 *     문구와 주소를 한 문자열로 이어 text 한 칸으로만 넘긴다. 조각이 하나뿐이라
 *     쪼갤 수가 없다. (까닭과 득실은 그 함수 주석에 적혀 있다.)
 *
 *  2. files와 text를 같이 넘기면 메신저가 하나로 못 묶어서 사진 한 통,
 *     글 한 통으로 나눠 보낸다. 그림을 보낼 때는 그림만 보낸다.
 *
 * 이 검사가 없으면 공유 자리를 새로 만들 때마다 같은 실수를 되풀이한다.
 * 실제로 열여섯 곳이 결과를 title 칸에 담고 있었다 — 「오늘의 행운 로또 번호:
 * 13, 14, 15, 16, 19, 20 + 17」이 정확히 버려지는 칸에 들어 있었다.
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
  // lib/share가 빠지면 정작 유일한 navigator.share 호출을 안 보게 된다
  for (const d of ['app', 'components', 'lib/share']) walk(join(ROOT, d));
  return out;
}

test('공유 자리를 실제로 찾는다', () => {
  // 정규식이 헛돌면 아래 검사들이 조용히 통과한다
  const n = sources().reduce((c, f) => c + shareCalls(f.src).length, 0);
  assert.ok(n >= 1, `navigator.share 호출을 ${n}개밖에 못 찾았다 — 찾는 방식이 깨졌다`);

  // 링크 공유는 전부 shareOne을 지나야 한다 — 부르는 곳이 사라지면 여기가 운다
  const users = sources().filter(f => /\bshareOne\(/.test(f.src) && !f.path.startsWith('lib'));
  assert.ok(users.length >= 15, `shareOne을 부르는 파일이 ${users.length}개뿐이다 — 자리마다 또 손으로 짜고 있다`);
});

test('링크 공유는 앱에 조각을 하나만 넘긴다', () => {
  /*
   * title은 메신저가 버리고, text와 url을 같이 넘기면 iOS에서 두 조각이 된다.
   * 그래서 최상위 열쇠가 text 하나뿐이어야 한다. 새 자리가 손으로 짜기 시작하면
   * 여기서 걸린다 — 고칠 곳은 lib/share/ui.ts의 shareOne 하나다.
   */
  const bad: string[] = [];
  for (const { path, src } of sources()) {
    for (const arg of shareCalls(src)) {
      if (hasProp(arg, 'files')) continue; // 그림 공유는 아래 검사가 본다
      const keys = topLevelKeys(arg);
      if (keys.length === 1 && keys[0] === 'text') continue;
      bad.push(`${path}: navigator.share에 ${keys.join('·')} — text 하나여야 한다`);
    }
  }
  assert.deepStrictEqual(bad, [], '조각이 둘 이상이면 받는 쪽에서 나뉘거나 버려진다');
});

test('shareOne은 문구와 주소를 한 문자열로 잇는다', async () => {
  const { shareOne } = await import('../lib/share/ui.ts');
  const set = (v: unknown) => Object.defineProperty(globalThis, 'navigator', { value: v, configurable: true });
  const before = Object.getOwnPropertyDescriptor(globalThis, 'navigator')!;
  try {
    // 공유 자체가 없는 환경(데스크톱 대부분)에서 떨어지는 길도 같은 문자열이어야 한다
    const seen: unknown[] = [];
    set({ clipboard: { writeText: (t: string) => { seen.push(t); return Promise.resolve(); } } });
    assert.equal(await shareOne('내 결과', 'https://vixutil.com/x'), true);
    assert.deepStrictEqual(seen, ['내 결과\nhttps://vixutil.com/x']);

    // 공유가 되는 환경에서는 넘기는 객체가 { text } 하나다
    const sent: unknown[] = [];
    set({ share: (d: unknown) => { sent.push(d); return Promise.resolve(); } });
    assert.equal(await shareOne('내 결과', 'https://vixutil.com/x'), false);
    assert.deepStrictEqual(sent, [{ text: '내 결과\nhttps://vixutil.com/x' }]);
  } finally {
    Object.defineProperty(globalThis, 'navigator', before);
  }
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
