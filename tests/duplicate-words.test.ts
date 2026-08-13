import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

/**
 * 화면 문구에 같은 낱말이 잇달아 두 번 적힌 곳을 잡는다.
 *
 * ── 무엇이 있었나 (2026-08-13) ────────────────────────────────
 * 사주 결과 화면의 제목이 **"나의 사주 사주"**였다. 사용자가 보고 알려 줄 때까지
 * 아무도 못 봤다. 같은 파일에 "생년월일과 성별로 사주 사주(四柱)를 분석합니다"가
 * 하나 더 있었고, 셸 셋에는 "알 수 없는 소리 도구 도구:"가, 퀴즈 해설에는
 * "청약 청약 혜택"이 있었다. 여섯 곳이다.
 *
 * 이런 오타는 **읽을 때 눈이 미끄러진다.** 문장이 문법에 맞고 뜻도 통해서
 * 검토로는 안 걸리고, 화면에 뜬 것을 우연히 봐야 알게 된다.
 *
 * ── 무엇을 보고 무엇을 안 보나 ────────────────────────────────
 * 화면 코드(app·components)의 **문자열 리터럴만** 본다. 주석은 뺀다 — 설명문에서
 * 낱말이 겹치는 것은 흠이 아니다.
 *
 * lib의 내용 자료(퀴즈·테스트·생성기)는 **일부러 되풀이하는 말이 많다** —
 * "괜찮아 괜찮아", "뭐니 뭐니 해도", "채워도 채워도", "까도 까도", 노래 제목
 * "그래도 그래도 그래도". 그래서 여기서는 화면 코드만 보고, 자료 쪽은 사람이
 * 쓸 때 판단한다. 화면 라벨에서 같은 낱말이 잇달아 나오는 것은 거의 언제나 실수다.
 */
const ROOT = join(import.meta.dirname, '..');

/** 잇달아 두 번 나온 한글 낱말 — 2~6자로 잡는다(한 자는 "그 그날" 같은 정상 문장이 걸린다) */
const DUP = /([가-힣]{2,6})\s+\1(?![가-힣])/g;

/**
 * 일부러 되풀이하는 화면 문구가 생기면 여기 적는다.
 *
 * **비어 있는 것이 정상이다.** 목록이 길어지면 검사가 아무것도 안 지키게 되므로,
 * 더할 때는 "정말 화면에 두 번 보여야 하는 말인가"를 먼저 묻는다.
 */
const ALLOW: string[] = [];

test('화면 문구에 같은 낱말이 잇달아 두 번 적힌 곳이 없다', () => {
  const walk = (dir: string, out: string[] = []): string[] => {
    for (const e of readdirSync(join(ROOT, dir), { withFileTypes: true })) {
      const rel = `${dir}/${e.name}`;
      if (e.isDirectory()) walk(rel, out);
      else if (e.name.endsWith('.tsx')) out.push(rel);
    }
    return out;
  };
  const files = [...walk('app'), ...walk('components')];
  assert.ok(files.length > 500, `화면 파일을 ${files.length}개밖에 못 찾았다 — 훑는 방식이 깨졌다`);

  const bad: string[] = [];
  for (const rel of files) {
    const lines = readFileSync(join(ROOT, rel), 'utf8').split('\n');
    lines.forEach((line, i) => {
      const t = line.trim();
      /* 주석 줄은 건너뛴다 */
      if (t.startsWith('*') || t.startsWith('//') || t.startsWith('/*')) return;
      for (const m of line.matchAll(DUP)) {
        if (ALLOW.some(a => line.includes(a))) continue;
        bad.push(`${rel}:${i + 1} "${m[1]} ${m[1]}"`);
      }
    });
  }

  assert.deepEqual(
    bad, [],
    `같은 낱말이 잇달아 두 번 적힌 화면 문구 ${bad.length}곳 — ` +
    '읽을 때 눈이 미끄러져 검토로는 안 걸리는 자리다. 일부러 되풀이한 것이면 ALLOW에 적어라',
  );
});
