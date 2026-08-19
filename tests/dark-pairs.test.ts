import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

/**
 * 밝은 면을 칠하면서 어두운 짝을 안 붙인 자리를 잡는다.
 *
 * ── 왜 (2026-08-20) ─────────────────────────────────────────
 * 다크 모드에서 계산기 표마다 **흰 가로줄**이 그어져 있었다. 원인은 한 줄이다:
 *
 *     <div className="divide-y divide-slate-100">   ← dark: 짝이 없다
 *
 * 라이트에서는 거의 안 보이는 옅은 회색인데, 어두운 지면에서는 그 색이 그대로
 * 남아 흰 선이 된다. 92곳이 그랬다. bg-white·bg-slate-50도 같은 병으로 40곳.
 *
 * 화면을 안 열면 안 보이고, 열어도 «다크로 바꿔서» 봐야 보인다. 그래서 사람이
 * 아니라 검사가 지켜야 하는 종류다.
 *
 * ── 무엇을 안 잡나 ──────────────────────────────────────────
 * 투명도가 붙은 것(bg-white/25)과 그라디언트 안의 색은 뺀다. 그쪽은 대개 진한
 * 판 위에 얹는 것이라 두 테마에서 같은 값이 맞다.
 */

const ROOTS = ['app', 'components'];

/** 어두운 지면에서 그대로 두면 안 되는 유틸리티 */
const NEEDS_PAIR = /\b(?:divide-slate-(?:50|100|200)|bg-white|bg-slate-50|border-slate-(?:100|200))\b/;

/** 짝이 이미 있는가 — 같은 className 안에 dark:가 있으면 됐다 */
const HAS_DARK = /\bdark:(?:bg|border|divide)-/;

/** 진한 판 위에 얹는 것들 — 두 테마에서 같은 값이 맞다 */
const EXEMPT = /\/\d{1,3}\b|from-|via-|\[/;

function tsxFiles(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...tsxFiles(p));
    else if (name.endsWith('.tsx')) out.push(p);
  }
  return out;
}

function offenders(): string[] {
  const bad: string[] = [];
  for (const root of ROOTS) {
    for (const file of tsxFiles(root)) {
      const src = readFileSync(file, 'utf8');
      for (const m of src.matchAll(/className="([^"]*)"/g)) {
        const cls = m[1];
        if (!NEEDS_PAIR.test(cls)) continue;
        if (HAS_DARK.test(cls) || EXEMPT.test(cls)) continue;
        bad.push(`${file}: ${cls.slice(0, 70)}`);
      }
    }
  }
  return bad;
}

test('밝은 면에는 어두운 짝이 있다', () => {
  const bad = offenders();
  assert.deepEqual(
    bad, [],
    `다크 모드에서 흰 판·흰 줄로 남는다 — dark: 짝을 붙여라:\n  ${bad.slice(0, 12).join('\n  ')}`,
  );
});

test('이 검사가 실제로 문다', () => {
  /* 위 검사가 «아무것도 없어서» 통과하는 것이 아님을 확인한다.
     같은 규칙을 일부러 어긴 문자열이 걸려야 한다. */
  const sample = 'divide-y divide-slate-100';
  assert.ok(NEEDS_PAIR.test(sample), '규칙이 문제의 원본을 못 잡는다');
  assert.ok(!HAS_DARK.test(sample), '짝이 없는데 있다고 본다');

  const fixed = 'divide-y divide-slate-100 dark:divide-slate-800';
  assert.ok(HAS_DARK.test(fixed), '고친 것을 여전히 문제로 본다');

  /* 실제로 훑는 파일이 있어야 한다 — 경로가 틀리면 빈 목록으로 늘 통과한다 */
  const n = ROOTS.reduce((s, r) => s + tsxFiles(r).length, 0);
  assert.ok(n > 300, `훑은 파일이 ${n}개뿐이다 — 경로가 틀렸다`);
});
