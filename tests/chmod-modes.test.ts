/**
 * 권한 모드가 스스로 어긋나지 않는지 본다.
 *
 * 자료가 없으니 베낄 일도 없지만, 대신 규칙을 잘못 옮겨 적으면 그럴듯한 답이
 * 나온다 — rwx의 순서가 바뀌어도, umask의 뺄셈 밑값을 666과 777 중 잘못 골라도
 * 화면은 멀쩡해 보인다. 그래서 검사는 다른 길로 같은 값에 이른다: 8진수를
 * 비트로 풀어 rwx와 맞춰 보고, umask는 실제로 깎아 봐서 원래 모드가 나오는지 본다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { CHMOD_ICON, COMMON, DIGITS, MODES, modeOf } from '../lib/chmod/list.ts';
import { EXEC, READ, WHOS, WRITE, chmodFacts, modesOfOwner, neighbours } from '../lib/chmod/facts.ts';
import { CHMOD_UI } from '../lib/chmod/ui.ts';
import { LANG_CODES } from '../lib/i18n/lang.ts';
import { DENSE, hanProblem } from './han.ts';

test('100가지가 넘고 주소가 겹치지 않는다', () => {
  assert.ok(MODES.length >= 100, `${MODES.length}가지뿐이다`);
  assert.equal(MODES.length, DIGITS.length ** 3, '다섯 값의 세 자리 조합이다');
  assert.equal(MODES.length, 125);
  assert.equal(new Set(MODES).size, MODES.length, 'slug 중복');
  assert.equal(modeOf('755'), '755');
  assert.equal(modeOf('777'), '777');
  assert.equal(modeOf('000'), '000');
  assert.equal(modeOf('123'), undefined, '쓰지 않는 값이 든 모드는 내지 않는다');
  assert.equal(modeOf('75'), undefined, '세 자리가 아니면 받지 않는다');
});

test('모든 모드가 세 자리이고 쓰는 값만 든다', () => {
  const allowed = new Set(DIGITS.map(String));
  for (const m of MODES) {
    assert.equal(m.length, 3, `${m}: 세 자리가 아니다`);
    for (const c of m) assert.ok(allowed.has(c), `${m}: 쓰지 않는 값 ${c}가 들었다`);
  }
  // 자주 쓰는 모드는 전부 목록 안에 있어야 한다 — 없으면 허브가 없는 페이지를 건다
  for (const m of COMMON) assert.ok(MODES.includes(m), `${m}: 자주 쓰는 모드인데 목록에 없다`);
  assert.equal(new Set(COMMON).size, COMMON.length, '자주 쓰는 모드 중복');
});

test('rwx 표기가 비트와 맞는다', () => {
  for (const m of MODES) {
    const f = chmodFacts(m);
    assert.equal(f.symbolic.length, 9, `${m}: 아홉 칸이 아니다`);
    WHOS.forEach((who, i) => {
      const digit = f.digits[i];
      const p = f.perm[who];
      assert.equal(p.digit, digit, `${m}: ${who} 자리 값이 다르다`);
      assert.equal(p.read, (digit & READ) !== 0, `${m}: ${who} 읽기가 어긋난다`);
      assert.equal(p.write, (digit & WRITE) !== 0, `${m}: ${who} 쓰기가 어긋난다`);
      assert.equal(p.exec, (digit & EXEC) !== 0, `${m}: ${who} 실행이 어긋난다`);
      // 다른 길: 값을 더해 되돌린다
      assert.equal((p.read ? 4 : 0) + (p.write ? 2 : 0) + (p.exec ? 1 : 0), digit, `${m}: ${who} 값을 되돌리면 다르다`);
      assert.equal(f.symbolic.slice(i * 3, i * 3 + 3), p.rwx, `${m}: ${who} 칸이 자리에 없다`);
    });
  }
  assert.equal(chmodFacts('755').symbolic, 'rwxr-xr-x');
  assert.equal(chmodFacts('644').symbolic, 'rw-r--r--');
  assert.equal(chmodFacts('600').symbolic, 'rw-------');
  assert.equal(chmodFacts('777').symbolic, 'rwxrwxrwx');
  assert.equal(chmodFacts('000').symbolic, '---------');
});

test('ls -l 줄과 chmod 표기가 서로 같은 권한을 말한다', () => {
  for (const m of MODES) {
    const f = chmodFacts(m);
    assert.equal(f.lsFile, `-${f.symbolic}`, `${m}: 파일 줄이 다르다`);
    assert.equal(f.lsDir, `d${f.symbolic}`, `${m}: 디렉터리 줄이 다르다`);
    // u=rwx,g=rx,o=rx 를 다시 읽어 rwx로 되돌린다
    const parts = f.assign.split(',');
    assert.equal(parts.length, 3, `${m}: 세 토막이 아니다`);
    const back = parts.map(part => {
      const bits = part.split('=')[1];
      return `${bits.includes('r') ? 'r' : '-'}${bits.includes('w') ? 'w' : '-'}${bits.includes('x') ? 'x' : '-'}`;
    }).join('');
    assert.equal(back, f.symbolic, `${m}: chmod 표기를 되돌리면 다르다 — ${f.assign}`);
  }
  assert.equal(chmodFacts('755').assign, 'u=rwx,g=rx,o=rx');
  assert.equal(chmodFacts('000').assign, 'u=,g=,o=', '아무 권한도 없으면 오른쪽이 빈다');
});

test('2진수와 10진수가 같은 수다', () => {
  for (const m of MODES) {
    const f = chmodFacts(m);
    assert.equal(f.bin.length, 9, `${m}: 아홉 비트가 아니다`);
    assert.equal(parseInt(f.bin, 2), f.decimal, `${m}: 2진수와 10진수가 다르다`);
    assert.equal(parseInt(m, 8), f.decimal, `${m}: 8진수로 읽은 값과 다르다`);
    // 비트가 선 자리와 rwx가 그려진 자리가 같아야 한다
    assert.equal(f.bin.split('').filter(b => b === '1').length, f.symbolic.replace(/-/g, '').length, `${m}: 선 비트 수와 권한 수가 다르다`);
  }
  assert.equal(chmodFacts('755').decimal, 493);
  assert.equal(chmodFacts('644').decimal, 420);
  assert.equal(chmodFacts('777').decimal, 511);
});

test('umask를 실제로 깎아 보면 그 모드가 나온다', () => {
  for (const m of MODES) {
    const f = chmodFacts(m);
    // 디렉터리는 777에서 umask를 깎는다
    const dir = f.umaskDir.split('').map(c => 7 - Number(c)).join('');
    assert.equal(dir, m, `${m}: 디렉터리 umask를 깎으면 ${dir}가 된다`);
    if (f.umaskFile) {
      const file = f.umaskFile.split('').map(c => 6 - Number(c)).join('');
      assert.equal(file, m, `${m}: 파일 umask를 깎으면 ${file}가 된다`);
    } else {
      // 실행 비트가 있는 모드는 파일에서 umask만으로 만들 수 없다
      assert.ok(f.digits.some(d => (d & EXEC) !== 0), `${m}: 실행 비트가 없는데 파일 umask가 없다`);
    }
  }
  assert.equal(chmodFacts('755').umaskDir, '022');
  assert.equal(chmodFacts('644').umaskFile, '022');
  assert.equal(chmodFacts('755').umaskFile, undefined, '755는 파일에서 umask로 나오지 않는다');
  assert.equal(chmodFacts('700').umaskDir, '077');
});

test('위험 표시가 실제 권한과 맞는다', () => {
  for (const m of MODES) {
    const f = chmodFacts(m);
    assert.equal(f.worldWritable, f.perm.other.write, `${m}: 세상 쓰기 표시가 어긋난다`);
    assert.equal(f.ownerOnly, f.digits[1] === 0 && f.digits[2] === 0, `${m}: 소유자 전용 표시가 어긋난다`);
  }
  assert.equal(chmodFacts('777').worldWritable, true);
  assert.equal(chmodFacts('666').worldWritable, true);
  assert.equal(chmodFacts('755').worldWritable, false);
  assert.equal(chmodFacts('700').ownerOnly, true);
  assert.equal(chmodFacts('750').ownerOnly, false);
  // 세상 쓰기가 되는 모드는 기타 자리가 6이나 7인 것뿐이다
  const dangerous = MODES.filter(m => chmodFacts(m).worldWritable);
  assert.equal(dangerous.length, 25 * 2, '기타 자리가 6·7인 조합 쉰 가지다');
});

test('소유자 자리로 묶으면 다섯 무리가 스물다섯씩이다', () => {
  for (const d of DIGITS) {
    assert.equal(modesOfOwner(d).length, 25, `${d}xx가 스물다섯이 아니다`);
    for (const m of modesOfOwner(d)) assert.equal(Number(m[0]), d, `${m}: 다른 무리에 섞였다`);
  }
  assert.equal(DIGITS.reduce<number>((n, d) => n + modesOfOwner(d).length, 0), MODES.length, '무리 밖 모드가 있다');
});

test('이웃은 한 자리만 다르다', () => {
  for (const m of MODES) {
    const n = neighbours(m);
    assert.ok(!n.includes(m), `${m}: 이웃에 자기 자신이 있다`);
    // 한 자리에 네 가지 다른 값이 있고 자리는 셋이다
    assert.equal(n.length, 12, `${m}: 이웃이 열둘이 아니다`);
    for (const o of n) {
      const diff = o.split('').filter((c, i) => c !== m[i]).length;
      assert.equal(diff, 1, `${m}↔${o}: 두 자리 이상 다르다`);
    }
  }
});

test('권한 아이콘은 목록과 카드가 같은 그림을 쓴다', async () => {
  const { ICON_FOR } = await import('../lib/og-icon-map.ts');
  assert.equal(ICON_FOR[CHMOD_ICON], 'lock', '이모지가 자물쇠 아이콘으로 이어지지 않는다');
});

/* ───────── 화면 문구 ───────── */

test('열 언어 문구가 모두 채워져 있다', () => {
  const f = chmodFacts('755');
  for (const lang of LANG_CODES) {
    const ui = CHMOD_UI[lang];
    for (const [key, val] of Object.entries(ui)) {
      assert.ok(val != null, `${lang}.${key}가 비었다`);
      if (typeof val === 'string') {
        assert.ok(val.trim().length > 0, `${lang}.${key}가 빈 문자열이다`);
        assert.equal(hanProblem(lang, val), '', `${lang}.${key}: ${hanProblem(lang, val)}`);
      }
    }
    assert.equal(ui.how.length, 4, `${lang}: 읽는 방법 수가 다르다`);
    assert.equal(ui.hubFaq.length, 5, `${lang}: 허브 FAQ 수가 다르다`);
    assert.equal(ui.modeFaq(f).length, 4, `${lang}: 상세 FAQ 수가 다르다`);
    for (const who of WHOS) assert.ok(ui.whoLabel[who], `${lang}: ${who} 이름이 없다`);
    // 자주 쓰는 열 가지는 쓰임새가 언어마다 있어야 한다 — 없으면 허브 줄이 빈다
    for (const m of COMMON) {
      assert.ok(ui.commonUse[m], `${lang}: ${m}의 쓰임새가 없다`);
      assert.ok(ui.commonUse[m].length >= (DENSE.has(lang) ? 6 : 12), `${lang}: ${m}의 쓰임새가 너무 짧다`);
    }
    assert.equal(Object.keys(ui.commonUse).length, COMMON.length, `${lang}: 쓰임새 수가 목록과 다르다`);
  }
});

test('설명이 125가지 모두에서 만들어진다', () => {
  for (const m of MODES) {
    const f = chmodFacts(m);
    for (const lang of LANG_CODES) {
      const ui = CHMOD_UI[lang];
      const d = ui.desc(f);
      const floor = DENSE.has(lang) ? 20 : 35;
      assert.ok(d.length > floor, `${lang}/${m}: 설명이 너무 짧다 — ${d}`);
      assert.ok(d.includes(m), `${lang}/${m}: 설명에 모드가 없다`);
      assert.ok(d.includes(f.symbolic), `${lang}/${m}: 설명에 rwx 표기가 없다`);
      const meta = ui.metaDesc(f);
      assert.ok(meta.includes(f.lsFile), `${lang}/${m}: 메타 설명에 ls -l 줄이 없다`);
      assert.ok(meta.length > (DENSE.has(lang) ? 25 : 40), `${lang}/${m}: 메타 설명이 너무 짧다`);
      assert.ok(ui.metaTitle(f).includes(m), `${lang}/${m}: 제목에 모드가 없다`);
    }
  }
});

test('한국어 조사가 모드를 읽은 소리를 따른다', () => {
  // 755는 "칠오오"라 755는, 700은 "칠공공"이라 700은이다
  const d = (mode: string) => CHMOD_UI.ko.desc(chmodFacts(mode));
  assert.ok(d('755').startsWith('755는'), d('755'));
  assert.ok(d('644').startsWith('644는'), d('644'));
  assert.ok(d('700').startsWith('700은'), d('700'));
  assert.ok(d('777').startsWith('777은'), d('777'));
  assert.ok(d('666').startsWith('666은'), d('666'));
});

test('열 언어를 통틀어 제목이 겹치지 않는다', () => {
  const seen = new Map<string, string>();
  for (const lang of LANG_CODES) {
    for (const m of MODES) {
      const title = CHMOD_UI[lang].metaTitle(chmodFacts(m));
      const before = seen.get(title);
      assert.equal(before, undefined, `"${title}"를 ${before}와 ${lang}/${m}가 함께 쓴다`);
      seen.set(title, `${lang}/${m}`);
    }
  }
});

test('허브가 125가지를 모두 건다', () => {
  const linked = new Set(DIGITS.flatMap(d => modesOfOwner(d)));
  for (const m of MODES) assert.ok(linked.has(m), `${m}: 허브에서 걸리지 않는다`);
});
