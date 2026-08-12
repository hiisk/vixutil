import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import {
  ALNUM_CHARS, ECLS, MAX_VERSION, MIN_VERSION,
  alignmentPositions, blockCount, capacityChars, codewordsFor, dataCodewords,
  ecPerBlock, encodeQr, formatBits, gfExp, gfMul, generatorPoly, interleave,
  maskPenalty, maskScores, maxCapacity, moduleSize, penaltyTotal, pickMode,
  pickVersion, polyEval, qrPath, qrToSvg, rawDataModules, remainderBits,
  rsRemainder, syndromes, totalCodewords, utf8Bytes, versionBits,
  QrTooLongError, type Ecl, type MaskPenalty, type Mode,
} from '../lib/qr.ts';
import {
  emailPayload, geoPayload, normalizeUrl, phonePayload, smsPayload,
  vcardPayload, wifiPayload, QR_FORMATS,
} from '../lib/qr-format.ts';
import { QR_UI } from '../lib/qr-ui.ts';
import { TEXT_TOOLS, findTextTool } from '../lib/text-tools.ts';
import { TEXT_INTL_SLUGS, textToolsIntl } from '../lib/text-tools-intl.ts';
import { SECTION_FAQ } from '../lib/section-faq.ts';
import { hanProblem, DENSE } from './han.ts';
import { appJoin } from './app-path.ts';

const ROOT = join(import.meta.dirname, '..');
const VERSIONS = Array.from({ length: MAX_VERSION }, (_, i) => i + 1);

/**
 * QR 인코더 검사.
 *
 * ── 무엇이 위험한가 ────────────────────────────────────────
 * QR은 **자기와 일관되게 틀릴 수 있다.** 표에 오타가 하나 있어도 모든 단계가
 * 그 값을 그대로 물고 가서 사각형이 예쁘게 나온다. 화면에서는 아무 이상이
 * 없고, 인쇄해 붙인 뒤에 "스캔이 안 된다"로만 드러난다.
 *
 * 그래서 세 갈래로 되짚는다.
 *
 * 1. **바깥에서 온 값에 못 박는다.** ISO/IEC 18004 부록 I의 예제("01234567",
 *    버전 1·등급 M)는 데이터 코드워드와 오류정정 코드워드가 문서에 적혀 있다.
 *    그 열여섯 개와 열 개를 그대로 적어 둔다. 규격의 표 C.1(포맷 정보)과
 *    D.1(버전 정보)도 비트열을 그대로 적는다.
 * 2. **항등식으로 표를 되짚는다.** 손으로 적은 것은 블록 나누기 표뿐이고,
 *    "데이터 + 오류정정 = 그 버전의 전체 코드워드"가 40칸에서 모두 맞아야 한다.
 *    전체 코드워드는 기하(크기·정렬 무늬·버전 정보 자리)에서 계산되므로,
 *    이 식은 표와 기하를 한꺼번에 본다.
 * 3. **굳힌 판 하나를 둔다.** 아래 GOLDEN은 이 인코더가 낸 판이지만, 만들 때
 *    애플 CoreImage의 QR 판독기로 실제로 읽어 "01234567"이 나오는 것을
 *    확인했다(버전 1~10 × 등급 넷 × 세 모드, 111장 전부 통과). 밖에서 읽힌
 *    판을 굳혀 두면 지그재그 배치나 마스크가 흔들릴 때 여기서 걸린다.
 */

/* ══════════════════════ 규격 표와 맞는가 ══════════════════════ */

test('한 변은 17 + 4n이다', () => {
  for (const v of VERSIONS) assert.equal(moduleSize(v), 17 + 4 * v, `버전 ${v}`);
  assert.equal(moduleSize(1), 21);
  assert.equal(moduleSize(10), 57);
});

test('버전 밖을 부르면 던진다', () => {
  assert.throws(() => moduleSize(0), RangeError);
  assert.throws(() => moduleSize(MAX_VERSION + 1), RangeError);
  assert.throws(() => moduleSize(2.5), RangeError);
});

test('전체 코드워드 수가 규격 표와 같다', () => {
  // ISO/IEC 18004 표 1 — 이 열 개는 기하에서 계산된 값이라 기하가 틀리면 어긋난다
  const SPEC = [26, 44, 70, 100, 134, 172, 196, 242, 292, 346];
  assert.deepEqual(VERSIONS.map(totalCodewords), SPEC);
});

test('남는 비트 수가 규격 표와 같다', () => {
  // 버전 2~6은 7비트가 남고 나머지는 0이다. 이 값을 안 세면 지그재그가 밀린다
  assert.deepEqual(VERSIONS.map(remainderBits), [0, 7, 7, 7, 7, 7, 0, 0, 0, 0]);
  for (const v of VERSIONS) {
    assert.equal(rawDataModules(v), totalCodewords(v) * 8 + remainderBits(v), `버전 ${v}`);
  }
});

test('데이터 코드워드 수가 규격 표와 같다', () => {
  const SPEC: Record<Ecl, number[]> = {
    L: [19, 34, 55, 80, 108, 136, 156, 194, 232, 274],
    M: [16, 28, 44, 64, 86, 108, 124, 154, 182, 216],
    Q: [13, 22, 34, 48, 62, 76, 88, 110, 132, 154],
    H: [9, 16, 26, 36, 46, 60, 66, 86, 100, 122],
  };
  for (const ecl of ECLS) {
    assert.deepEqual(VERSIONS.map(v => dataCodewords(v, ecl)), SPEC[ecl], `등급 ${ecl}`);
  }
});

test('데이터 + 오류정정 = 그 버전의 전체 코드워드 (40칸 전부)', () => {
  /*
   * 표 오타를 잡는 항등식이다. 블록 수·블록당 오류정정 수·전체 코드워드가
   * 서로 독립적으로 나오므로, 어느 하나만 어긋나도 여기서 깨진다.
   */
  const wrong: string[] = [];
  for (const v of VERSIONS) {
    for (const ecl of ECLS) {
      const total = totalCodewords(v);
      const ec = ecPerBlock(v, ecl) * blockCount(v, ecl);
      if (dataCodewords(v, ecl) + ec !== total) wrong.push(`v${v}-${ecl}`);
      // 블록 하나가 데이터 없이 부호만 갖는 일은 없다
      if (dataCodewords(v, ecl) < blockCount(v, ecl)) wrong.push(`v${v}-${ecl} 블록보다 데이터가 적다`);
    }
  }
  assert.deepEqual(wrong, []);
});

test('등급을 올리면 담는 데이터가 줄어든다', () => {
  for (const v of VERSIONS) {
    const [l, m, q, h] = ECLS.map(e => dataCodewords(v, e));
    assert.ok(l > m && m > q && q > h, `버전 ${v}: ${l} ${m} ${q} ${h}`);
  }
});

test('정렬 무늬 자리가 규격 표와 같다', () => {
  assert.deepEqual(alignmentPositions(1), []);
  assert.deepEqual(alignmentPositions(2), [6, 18]);
  assert.deepEqual(alignmentPositions(6), [6, 34]);
  assert.deepEqual(alignmentPositions(7), [6, 22, 38]);
  assert.deepEqual(alignmentPositions(8), [6, 24, 42]);
  assert.deepEqual(alignmentPositions(9), [6, 26, 46]);
  assert.deepEqual(alignmentPositions(10), [6, 28, 50]);
  for (const v of VERSIONS.slice(1)) {
    const pos = alignmentPositions(v);
    assert.equal(pos[0], 6, `버전 ${v}: 첫 자리`);
    assert.equal(pos[pos.length - 1], moduleSize(v) - 7, `버전 ${v}: 마지막 자리`);
  }
});

test('글자 수 한도가 규격 표와 같다', () => {
  // ISO/IEC 18004 표 7에서 몇 칸을 뽑았다 — 숫자 / 영숫자 / 바이트
  const pick = (v: number, ecl: Ecl): number[] =>
    (['numeric', 'alnum', 'byte'] as Mode[]).map(m => capacityChars(v, ecl, m));
  assert.deepEqual(pick(1, 'L'), [41, 25, 17]);
  assert.deepEqual(pick(1, 'M'), [34, 20, 14]);
  assert.deepEqual(pick(1, 'Q'), [27, 16, 11]);
  assert.deepEqual(pick(1, 'H'), [17, 10, 7]);
  assert.deepEqual(pick(2, 'M'), [63, 38, 26]);
  assert.deepEqual(pick(10, 'L'), [652, 395, 271]);
  assert.deepEqual(pick(10, 'H'), [288, 174, 119]);
  // 버전이 커지면 한도는 줄지 않는다
  for (const ecl of ECLS) {
    for (const mode of ['numeric', 'alnum', 'byte'] as Mode[]) {
      for (let v = 2; v <= MAX_VERSION; v++) {
        assert.ok(capacityChars(v, ecl, mode) > capacityChars(v - 1, ecl, mode), `v${v}-${ecl}-${mode}`);
      }
    }
  }
});

/* ══════════════════════ 리드-솔로몬 따로 되짚기 ══════════════════════ */

test('GF(256) 곱셈이 결합·교환·분배 법칙을 지킨다', () => {
  for (let a = 0; a < 256; a += 7) {
    for (let b = 0; b < 256; b += 11) {
      assert.equal(gfMul(a, b), gfMul(b, a), `교환 ${a}·${b}`);
      for (let c = 0; c < 256; c += 29) {
        assert.equal(gfMul(gfMul(a, b), c), gfMul(a, gfMul(b, c)), `결합 ${a}·${b}·${c}`);
        // 덧셈은 XOR이다 — a(b+c) = ab + ac
        assert.equal(gfMul(a, b ^ c), gfMul(a, b) ^ gfMul(a, c), `분배 ${a}(${b}+${c})`);
      }
    }
  }
});

test('GF(256)에 1이 항등원이고 0이 흡수원이다', () => {
  for (let a = 0; a < 256; a++) {
    assert.equal(gfMul(a, 1), a, `${a}·1`);
    assert.equal(gfMul(a, 0), 0, `${a}·0`);
  }
});

test('α의 지수는 255마다 되돌아오고 0을 뺀 255개를 다 만든다', () => {
  assert.equal(gfExp(0), 1);
  assert.equal(gfExp(255), 1);
  const seen = new Set(Array.from({ length: 255 }, (_, i) => gfExp(i)));
  assert.equal(seen.size, 255, '생성원이 아니다 — 원시 다항식이 틀렸다');
  assert.ok(!seen.has(0), '0이 나왔다');
});

test('생성 다항식은 차수가 맞고 α⁰…α^(n−1)에서 0이 된다', () => {
  /*
   * 규격 부록의 계수 표를 적는 대신 성질로 본다. 이것이 생성 다항식의 정의라
   * 표를 잘못 옮기는 실수가 아예 생기지 않는다.
   */
  for (const degree of [7, 10, 13, 15, 16, 17, 18, 20, 22, 24, 26, 28, 30]) {
    const gen = generatorPoly(degree);
    assert.equal(gen.length, degree + 1, `차수 ${degree}: 계수 개수`);
    assert.equal(gen[0], 1, `차수 ${degree}: 최고차 계수가 1이 아니다`);
    for (let i = 0; i < degree; i++) {
      assert.equal(polyEval(gen, gfExp(i)), 0, `차수 ${degree}: α^${i}이 근이 아니다`);
    }
    // 근이 아닌 곳에서는 0이 아니어야 한다 — 위 검사가 늘 참이 되지 않게
    assert.notEqual(polyEval(gen, gfExp(degree)), 0, `차수 ${degree}: α^${degree}까지 0이다`);
  }
  assert.throws(() => generatorPoly(0), RangeError);
});

test('오류가 없는 부호어의 신드롬은 모두 0이다', () => {
  for (const degree of [7, 10, 13, 17, 26]) {
    for (const len of [1, 9, 19, 100]) {
      const data = Array.from({ length: len }, (_, i) => (i * 37 + 11) & 0xff);
      const code = [...data, ...rsRemainder(data, degree)];
      assert.deepEqual(syndromes(code, degree), new Array(degree).fill(0), `차수 ${degree}, 길이 ${len}`);
    }
  }
});

test('한 바이트만 흔들면 신드롬이 0이 아니게 된다', () => {
  // 위 검사가 "늘 0을 돌려주는 함수"로도 통과하지 않게 하는 자리다
  const data = Array.from({ length: 16 }, (_, i) => (i * 13 + 5) & 0xff);
  const code = [...data, ...rsRemainder(data, 10)];
  for (let at = 0; at < code.length; at++) {
    const broken = [...code];
    broken[at] ^= 1;
    assert.notDeepEqual(syndromes(broken, 10), new Array(10).fill(0), `${at}번째를 흔들었는데 0이다`);
  }
});

/* ══════════════════════ 알려진 예에 못 박기 ══════════════════════ */

/** ISO/IEC 18004 부록 I — "01234567", 버전 1, 등급 M, 숫자 모드 */
const ISO_DATA = [0x10, 0x20, 0x0c, 0x56, 0x61, 0x80, 0xec, 0x11, 0xec, 0x11, 0xec, 0x11, 0xec, 0x11, 0xec, 0x11];
const ISO_EC = [0xa5, 0x24, 0xd4, 0xc1, 0xed, 0x36, 0xc7, 0x87, 0x2c, 0x55];

test('규격 부록의 예제와 코드워드가 같다 — "01234567" 버전 1·등급 M', () => {
  assert.equal(pickMode('01234567'), 'numeric');
  const data = codewordsFor('01234567', 'numeric', 1, 'M');
  assert.equal(data.length, 16, '데이터 코드워드 수');
  assert.deepEqual(data, ISO_DATA, '데이터 코드워드가 규격 예제와 다르다');
  assert.deepEqual(rsRemainder(data, 10), ISO_EC, '오류정정 코드워드가 규격 예제와 다르다');
  // 블록이 하나뿐인 버전이라 섞기는 데이터 다음에 부호가 그대로 붙는 꼴이다
  assert.deepEqual(interleave(data, 1, 'M'), [...ISO_DATA, ...ISO_EC]);
});

test('널리 인용되는 예와 코드워드가 같다 — "HELLO WORLD" 버전 1·등급 Q', () => {
  /*
   * 영숫자 모드는 두 글자를 45진수 한 수로 묶는다(H·E → 17×45+14 = 779).
   * 이 예제의 데이터 코드워드는 여러 구현과 규격 해설에서 같게 나온다.
   */
  assert.equal(pickMode('HELLO WORLD'), 'alnum');
  assert.deepEqual(
    codewordsFor('HELLO WORLD', 'alnum', 1, 'Q'),
    [0x20, 0x5b, 0x0b, 0x78, 0xd1, 0x72, 0xdc, 0x4d, 0x43, 0x40, 0xec, 0x11, 0xec],
  );
});

test('종단자와 채움 코드워드가 규격대로 들어간다', () => {
  // 자리가 꽉 차면 종단자를 넣을 자리가 없다 — 그래도 넘치지 않아야 한다
  const full = '0'.repeat(capacityChars(1, 'H', 'numeric'));
  const cw = codewordsFor(full, 'numeric', 1, 'H');
  assert.equal(cw.length, dataCodewords(1, 'H'));
  /*
   * "1"은 모드 4 + 글자 수 10 + 알맹이 4 = 18비트다. 종단자 넷을 붙이고
   * 코드워드 경계까지 0으로 맞추면 세 바이트가 되고, 남은 열여섯 칸을
   * 0xEC·0x11이 번갈아 채운다(규격이 정한 값이라 뜻은 없다).
   */
  const padded = codewordsFor('1', 'numeric', 1, 'L');
  assert.equal(padded.length, 19);
  assert.deepEqual(padded.slice(0, 3), [0x10, 0x04, 0x40]);
  assert.deepEqual(
    padded.slice(3),
    Array.from({ length: 16 }, (_, i) => (i % 2 === 0 ? 0xec : 0x11)),
  );
});

test('포맷 정보 비트열이 규격 표 C.1과 같다', () => {
  const b15 = (n: number): string => n.toString(2).padStart(15, '0');
  assert.equal(b15(formatBits('L', 0)), '111011111000100');
  assert.equal(b15(formatBits('M', 0)), '101010000010010');
  assert.equal(b15(formatBits('Q', 0)), '011010101011111');
  assert.equal(b15(formatBits('H', 0)), '001011010001001');
  assert.equal(b15(formatBits('L', 1)), '111001011110011');
  assert.equal(b15(formatBits('Q', 7)), '010101111101101');
  assert.equal(b15(formatBits('H', 7)), '000100000111011');
  // 서른두 가지가 서로 다르고, 어느 둘도 세 비트 이내로는 안 닮는다(BCH의 최소 거리)
  const all: number[] = [];
  for (const ecl of ECLS) for (let m = 0; m < 8; m++) all.push(formatBits(ecl, m));
  assert.equal(new Set(all).size, 32);
  for (let i = 0; i < all.length; i++) {
    for (let k = i + 1; k < all.length; k++) {
      const diff = (all[i] ^ all[k]).toString(2).replace(/0/g, '').length;
      assert.ok(diff >= 7, `${i}·${k}의 거리가 ${diff}뿐`);
    }
  }
  assert.throws(() => formatBits('M', 8), RangeError);
});

test('버전 정보 비트열이 규격 표 D.1과 같다', () => {
  const b18 = (n: number): string => n.toString(2).padStart(18, '0');
  assert.equal(b18(versionBits(7)), '000111110010010100');
  assert.equal(b18(versionBits(8)), '001000010110111100');
  assert.equal(b18(versionBits(9)), '001001101010011001');
  assert.equal(b18(versionBits(10)), '001010010011010011');
});

/* ══════════════════════ 굳힌 판 ══════════════════════ */

/**
 * "01234567" 버전 1·등급 M의 판. 애플 CoreImage 판독기로 읽어 "01234567"이
 * 나오는 것을 확인하고 굳혔다 — 자기가 만든 것을 자기가 확인하는 고리가
 * 되지 않게 하려고 밖의 판독기를 한 번 거쳤다.
 */
const GOLDEN = [
  '#######...###.#######',
  '#.....#.###...#.....#',
  '#.###.#..##...#.###.#',
  '#.###.#..#.##.#.###.#',
  '#.###.#.##.##.#.###.#',
  '#.....#....#..#.....#',
  '#######.#.#.#.#######',
  '.....................',
  '#.#.#.#...#.#...#..#.',
  '##.#....#.##.#.#...#.',
  '...##.###.##.###.###.',
  '##..##.#.#.###.##..#.',
  '..#..###.###.###....#',
  '........#.#...#....#.',
  '#######.....#...#...#',
  '#.....#...#...#..#.##',
  '#.###.#.###.#.#.###.#',
  '#.###.#..#.#.#.#.###.',
  '#.###.#.##.#.###..#.#',
  '#.....#....###.###...',
  '#######.#..#.###..#.#',
];

test('굳힌 판과 한 칸도 다르지 않다', () => {
  const qr = encodeQr('01234567', { ecl: 'M' });
  assert.equal(qr.version, 1);
  assert.equal(qr.mask, 0);
  const drawn = qr.modules.map(row => row.map(m => (m ? '#' : '.')).join(''));
  assert.deepEqual(drawn, GOLDEN);
});

/* ══════════════════════ 기능 무늬 ══════════════════════ */

/** 세 꼭지의 위치 찾기 무늬 중심 — (행, 열) */
const finderCenters = (size: number): [number, number][] => [[3, 3], [3, size - 4], [size - 4, 3]];

test('위치 찾기 무늬가 세 꼭지에 있다', () => {
  for (const v of VERSIONS) {
    const qr = encodeQr(`v${v}`, { ecl: 'M', minVersion: v });
    const at = (r: number, c: number): boolean => qr.modules[r][c];
    for (const [cr, cc] of finderCenters(qr.size)) {
      for (let dr = -3; dr <= 3; dr++) {
        for (let dc = -3; dc <= 3; dc++) {
          const dist = Math.max(Math.abs(dr), Math.abs(dc));
          // 겹사각형 — 중심에서 거리 2만 밝고 나머지는 어둡다
          assert.equal(at(cr + dr, cc + dc), dist !== 2, `버전 ${v} 무늬(${cr},${cc}) 칸(${dr},${dc})`);
        }
      }
    }
  }
});

test('찾기 무늬 둘레의 분리자가 비어 있다', () => {
  for (const v of VERSIONS) {
    const qr = encodeQr(`v${v}`, { ecl: 'H', minVersion: v });
    const size = qr.size;
    for (const [cr, cc] of finderCenters(size)) {
      for (let dr = -4; dr <= 4; dr++) {
        for (let dc = -4; dc <= 4; dc++) {
          if (Math.max(Math.abs(dr), Math.abs(dc)) !== 4) continue;
          const r = cr + dr;
          const c = cc + dc;
          if (r < 0 || c < 0 || r >= size || c >= size) continue;   // 판 밖은 여백이다
          assert.equal(qr.modules[r][c], false, `버전 ${v} 분리자 (${r},${c})가 어둡다`);
        }
      }
    }
  }
});

test('타이밍 패턴이 6번 행·열에서 한 칸씩 번갈아 간다', () => {
  for (const v of VERSIONS) {
    const qr = encodeQr(`v${v}`, { ecl: 'Q', minVersion: v });
    // 찾기 무늬와 분리자 밖(8 ~ size−9)이 타이밍 패턴이다
    for (let i = 8; i <= qr.size - 9; i++) {
      assert.equal(qr.modules[6][i], i % 2 === 0, `버전 ${v} 가로 타이밍 ${i}`);
      assert.equal(qr.modules[i][6], i % 2 === 0, `버전 ${v} 세로 타이밍 ${i}`);
    }
  }
});

test('늘 어두운 칸이 있다', () => {
  for (const v of VERSIONS) {
    const qr = encodeQr(`v${v}`, { ecl: 'L', minVersion: v });
    assert.equal(qr.modules[qr.size - 8][8], true, `버전 ${v}`);
  }
});

test('정렬 무늬가 자기 자리에 있다', () => {
  for (const v of VERSIONS.slice(1)) {
    const qr = encodeQr(`v${v}`, { ecl: 'M', minVersion: v });
    const pos = alignmentPositions(v);
    const last = pos.length - 1;
    for (let a = 0; a <= last; a++) {
      for (let b = 0; b <= last; b++) {
        // 세 꼭지는 찾기 무늬가 이미 차지했다
        if ((a === 0 && b === 0) || (a === 0 && b === last) || (a === last && b === 0)) continue;
        for (let dr = -2; dr <= 2; dr++) {
          for (let dc = -2; dc <= 2; dc++) {
            const want = Math.max(Math.abs(dr), Math.abs(dc)) !== 1;
            assert.equal(qr.modules[pos[a] + dr][pos[b] + dc], want, `버전 ${v} 정렬(${pos[a]},${pos[b]})`);
          }
        }
      }
    }
  }
});

/* ══════════════════════ 마스크 ══════════════════════ */

const argmin = (scores: MaskPenalty[], score: (p: MaskPenalty) => number): number => {
  let best = 0;
  let bestValue = Number.POSITIVE_INFINITY;
  scores.forEach((p, i) => {
    const v = score(p);
    if (v < bestValue) {
      bestValue = v;
      best = i;
    }
  });
  return best;
};

test('마스크 여덟 가지를 다 재고 벌점이 가장 낮은 것을 고른다', () => {
  for (const text of ['01234567', 'HELLO WORLD', 'https://vixutil.com/text/qr', '안녕하세요 QR', 'T3', 'T91']) {
    for (const ecl of ECLS) {
      const scores = maskScores(text, { ecl });
      assert.equal(scores.length, 8, '여덟 가지를 다 안 쟀다');
      const qr = encodeQr(text, { ecl });
      assert.equal(qr.mask, argmin(scores, penaltyTotal), `${text} ${ecl}: 최솟값이 아니다`);
      assert.deepEqual(qr.penalty, scores[qr.mask], `${text} ${ecl}: 벌점 내역이 다르다`);
      // 여덟이 전부 같은 점수면 "골랐다"고 할 수 없다
      assert.ok(new Set(scores.map(penaltyTotal)).size >= 4, `${text} ${ecl}: 점수가 거의 같다`);
    }
  }
});

test('벌점 규칙 하나를 빼면 다른 마스크가 뽑힌다', () => {
  /*
   * 네 규칙이 실제로 선택에 쓰인다는 것을 규칙마다 하나씩 보인다. 아래
   * 짝은 400여 개 입력을 훑어 찾은 것이다 — 규칙 하나를 지우고 검사를
   * 돌리면 그 줄이 깨진다.
   */
  const CASES: [string, Ecl, keyof MaskPenalty, number, number][] = [
    ['T3', 'H', 'n1', 7, 1],
    ['T0', 'Q', 'n2', 0, 3],
    ['T0', 'L', 'n3', 6, 7],
    ['T91', 'M', 'n4', 2, 6],
  ];
  for (const [text, ecl, drop, whole, without] of CASES) {
    const scores = maskScores(text, { ecl });
    assert.equal(argmin(scores, penaltyTotal), whole, `${text} ${ecl}: 전부 셀 때`);
    const partial = (p: MaskPenalty): number =>
      (['n1', 'n2', 'n3', 'n4'] as const).filter(k => k !== drop).reduce((sum, k) => sum + p[k], 0);
    assert.equal(argmin(scores, partial), without, `${text} ${ecl}: ${drop}를 뺐을 때`);
  }
});

test('벌점 네 규칙을 손으로 만든 판에서 확인한다', () => {
  const grid = (rows: string[]): boolean[][] => rows.map(r => [...r].map(c => c === '#'));
  const light = (n: number): boolean[][] => grid(Array.from({ length: n }, () => '.'.repeat(n)));

  /*
   * 5×5 전부 밝음.
   *  규칙1 — 줄마다 5칸이 이어져 3점, 가로 5줄 + 세로 5줄 = 30
   *  규칙2 — 2×2 덩어리가 4×4 = 16곳, 각 3점 = 48
   *  규칙3 — 11칸을 볼 자리가 없다 = 0
   *  규칙4 — 어두운 비율 0%, 50%에서 열 단계 = 100
   */
  assert.deepEqual(maskPenalty(light(5)), { n1: 30, n2: 48, n3: 0, n4: 100 });

  // 6칸이 이어지면 3 + 1 = 4점씩 — 가로 6줄 + 세로 6줄 = 48
  assert.equal(maskPenalty(light(6)).n1, 48);
  assert.equal(maskPenalty(light(6)).n2, 5 * 5 * 3);

  // 규칙3 — 찾기 무늬 닮은 꼴(1:1:3:1:1 + 밝은 네 칸)이 한 줄에 하나면 40점
  const finderLike = grid([
    '#.###.#....',
    ...Array.from({ length: 10 }, () => '...........'),
  ]);
  assert.equal(maskPenalty(finderLike).n3, 40);
  // 뒤집힌 꼴도 센다
  const reversed = grid([
    '....#.###.#',
    ...Array.from({ length: 10 }, () => '...........'),
  ]);
  assert.equal(maskPenalty(reversed).n3, 40);
  // 무늬가 없으면 0
  assert.equal(maskPenalty(grid(Array.from({ length: 11 }, () => '#.#.#.#.#.#'))).n3, 0);

  // 규칙4 — 정확히 반이 어두우면 0점
  assert.equal(maskPenalty(grid(['#.', '.#'])).n4, 0);
  assert.equal(maskPenalty(grid(['##', '##'])).n4, 100);
});

test('마스크 조건식이 규격의 여덟 가지와 같다', () => {
  // (i, j) = (행, 열). 규격 표 10을 그대로 옮긴 것인지 몇 칸으로 확인한다
  const qr = encodeQr('01234567', { ecl: 'M' });
  assert.ok(qr.mask >= 0 && qr.mask <= 7);
  // 마스크가 다르면 판도 달라야 한다 — 같으면 마스크가 안 씌워진 것이다
  const shapes = new Set<string>();
  for (const text of ['1', '12', '123', '1234', '12345', '123456', '1234567', '12345678']) {
    shapes.add(encodeQr(text, { ecl: 'M' }).modules.map(r => r.map(Number).join('')).join(''));
  }
  assert.equal(shapes.size, 8, '입력이 달라도 판이 같다');
});

/* ══════════════════════ 모드 고르기 ══════════════════════ */

test('숫자만이면 숫자 모드, 대문자·숫자면 영숫자, 그 밖은 바이트', () => {
  assert.equal(pickMode('0123456789'), 'numeric');
  assert.equal(pickMode('7'), 'numeric');
  assert.equal(pickMode('HELLO WORLD'), 'alnum');
  assert.equal(pickMode('ABC-123'), 'alnum');
  assert.equal(pickMode('A$%*+-./: 0'), 'alnum');
  // 소문자는 영숫자 45자에 없다
  assert.equal(pickMode('hello'), 'byte');
  assert.equal(pickMode('Hello World'), 'byte');
  assert.equal(pickMode('https://vixutil.com'), 'byte');
  // 한글·이모지·악센트는 UTF-8 바이트로 간다
  assert.equal(pickMode('안녕하세요'), 'byte');
  assert.equal(pickMode('café'), 'byte');
  assert.equal(pickMode(''), 'byte');
  assert.equal(ALNUM_CHARS.length, 45, '영숫자 모드는 45자다');
  assert.equal(new Set(ALNUM_CHARS).size, 45, '영숫자 표에 겹치는 글자가 있다');
});

test('한글은 UTF-8 바이트 수로 센다', () => {
  assert.deepEqual(utf8Bytes('가'), [0xea, 0xb0, 0x80]);
  assert.equal(utf8Bytes('안녕하세요').length, 15);
  assert.equal(encodeQr('안녕하세요', { ecl: 'M' }).used, 15, '글자 수가 아니라 바이트 수여야 한다');
  assert.equal(encodeQr('01234567', { ecl: 'M' }).used, 8);
});

test('짧은 모드를 고르면 더 작은 QR이 된다', () => {
  // 같은 글자 수인데 숫자 쪽이 작아야 한다 — 모드 고르기가 실제로 이득을 낸다
  const digits = encodeQr('1'.repeat(40), { ecl: 'L' });
  const letters = encodeQr('A'.repeat(40), { ecl: 'L' });
  const lower = encodeQr('a'.repeat(40), { ecl: 'L' });
  assert.equal(digits.mode, 'numeric');
  assert.equal(letters.mode, 'alnum');
  assert.equal(lower.mode, 'byte');
  assert.ok(digits.version <= letters.version, `숫자 v${digits.version} > 영숫자 v${letters.version}`);
  assert.ok(letters.version <= lower.version, `영숫자 v${letters.version} > 바이트 v${lower.version}`);
});

test('가장 작은 버전을 고른다', () => {
  for (const ecl of ECLS) {
    for (const mode of ['numeric', 'alnum', 'byte'] as Mode[]) {
      for (const v of VERSIONS) {
        const fill = mode === 'numeric' ? '1' : mode === 'alnum' ? 'A' : 'a';
        const text = fill.repeat(capacityChars(v, ecl, mode));
        assert.equal(pickVersion(text, mode, ecl), v, `${mode} ${ecl}: 꽉 찬 v${v}`);
        if (v < MAX_VERSION) {
          const over = fill.repeat(capacityChars(v, ecl, mode) + 1);
          assert.ok((pickVersion(over, mode, ecl) ?? 99) > v, `${mode} ${ecl}: 한 자 넘겼는데 v${v}`);
        }
      }
    }
  }
});

test('minVersion을 주면 그 아래로 내려가지 않는다', () => {
  for (const v of VERSIONS) {
    assert.equal(encodeQr('1', { ecl: 'M', minVersion: v }).version, v);
  }
});

/* ══════════════════════ 너무 길면 정직하게 실패 ══════════════════════ */

test('담을 수 없으면 던진다 — 잘라 내지 않는다', () => {
  for (const ecl of ECLS) {
    for (const mode of ['numeric', 'alnum', 'byte'] as Mode[]) {
      const limit = maxCapacity(ecl, mode);
      const fill = mode === 'numeric' ? '1' : mode === 'alnum' ? 'A' : 'a';

      // 딱 한도까지는 만들어진다
      const ok = encodeQr(fill.repeat(limit), { ecl });
      assert.equal(ok.version, MAX_VERSION, `${mode} ${ecl}: 한도가 최대 버전이 아니다`);
      assert.equal(ok.used, limit);

      // 한 자만 넘겨도 던진다
      assert.throws(
        () => encodeQr(fill.repeat(limit + 1), { ecl }),
        (error: unknown) => {
          assert.ok(error instanceof QrTooLongError, `${mode} ${ecl}: 다른 오류가 왔다 — ${String(error)}`);
          assert.equal(error.limit, limit);
          assert.equal(error.needed, limit + 1);
          assert.equal(error.ecl, ecl);
          assert.equal(error.mode, mode);
          return true;
        },
        `${mode} ${ecl}: 넘쳤는데 만들어졌다`,
      );
      assert.equal(pickVersion(fill.repeat(limit + 1), mode, ecl), null);
    }
  }
});

test('넘친 입력을 잘라서 담는 길이 없다', () => {
  /*
   * 이 검사의 목적은 "언젠가 누가 자르게 고치는 것"을 막는 데 있다. 잘린 QR은
   * 화면에 멀쩡한 사각형으로 나오고 스캐너만 조용히 실패한다.
   */
  const limit = maxCapacity('H', 'byte');
  const text = 'a'.repeat(limit + 50);
  let made: unknown = null;
  try {
    made = encodeQr(text, { ecl: 'H' });
  } catch (error) {
    assert.ok(error instanceof QrTooLongError);
  }
  assert.equal(made, null, '넘친 입력으로 QR이 만들어졌다 — 잘라 담았을 가능성이 있다');
  // 한글은 글자 수가 적어도 바이트로는 셋씩이라 훨씬 일찍 걸린다
  assert.throws(() => encodeQr('한'.repeat(limit), { ecl: 'H' }), QrTooLongError);
});

/* ══════════════════════ 블록 나누기와 섞기 ══════════════════════ */

test('섞은 결과의 길이가 전체 코드워드 수와 같다', () => {
  for (const v of VERSIONS) {
    for (const ecl of ECLS) {
      const need = dataCodewords(v, ecl);
      const data = Array.from({ length: need }, (_, i) => (i * 7 + 3) & 0xff);
      const mixed = interleave(data, v, ecl);
      assert.equal(mixed.length, totalCodewords(v), `v${v}-${ecl}`);
      // 데이터가 하나도 사라지지 않는다
      const counts = new Map<number, number>();
      for (const b of data) counts.set(b, (counts.get(b) ?? 0) + 1);
      for (const b of mixed) if (counts.has(b)) counts.set(b, counts.get(b)! - 1);
      assert.ok([...counts.values()].every(n => n <= 0), `v${v}-${ecl}: 데이터가 빠졌다`);
    }
  }
});

test('데이터 코드워드 수가 안 맞으면 섞기가 던진다', () => {
  assert.throws(() => interleave([1, 2, 3], 1, 'M'), /데이터 코드워드/);
});

test('블록이 여럿인 버전도 블록마다 부호를 따로 붙인다', () => {
  // 버전 10·등급 H는 블록이 여덟이다 — 하나로 몰아 계산하면 여기서 어긋난다
  assert.equal(blockCount(10, 'H'), 8);
  const need = dataCodewords(10, 'H');
  const data = Array.from({ length: need }, (_, i) => i & 0xff);
  const mixed = interleave(data, 10, 'H');
  const ecLen = ecPerBlock(10, 'H');
  const blocks = blockCount(10, 'H');
  assert.equal(mixed.length, need + ecLen * blocks);
  // 뒤쪽 ecLen×blocks 칸이 부호다. 블록별로 갈라 신드롬이 0인지 본다
  const shortLen = Math.floor(totalCodewords(10) / blocks);
  const shortCount = blocks - (totalCodewords(10) % blocks);
  let at = 0;
  for (let b = 0; b < blocks; b++) {
    const len = shortLen - ecLen + (b < shortCount ? 0 : 1);
    const part = data.slice(at, at + len);
    at += len;
    const code = [...part, ...rsRemainder(part, ecLen)];
    assert.deepEqual(syndromes(code, ecLen), new Array(ecLen).fill(0), `블록 ${b}`);
  }
  assert.equal(at, need);
});

/* ══════════════════════ 그리기 ══════════════════════ */

test('SVG가 칸 단위 viewBox와 여백을 갖는다', () => {
  const qr = encodeQr('https://vixutil.com', { ecl: 'M' });
  const svg = qrToSvg(qr, { scale: 8, margin: 4, dark: '#123456', light: '#fedcba' });
  const span = qr.size + 8;
  assert.match(svg, new RegExp(`viewBox="0 0 ${span} ${span}"`));
  assert.match(svg, new RegExp(`width="${span * 8}"`));
  assert.ok(svg.includes('fill="#123456"'), '어두운 색이 안 들어갔다');
  assert.ok(svg.includes('fill="#fedcba"'), '바탕 색이 안 들어갔다');
  assert.ok(svg.startsWith('<svg') && svg.endsWith('</svg>'));
  // transparent면 바탕 사각형이 없다
  assert.ok(!qrToSvg(qr, { transparent: true }).includes('#fedcba'));

  // path의 사각형 개수가 어두운 칸 수와 같다
  const dark = qr.modules.flat().filter(Boolean).length;
  assert.equal((qrPath(qr, 4).match(/h1v1h-1z/g) ?? []).length, dark);
  assert.ok(dark > 0);
});

test('여백을 주면 좌표가 그만큼 밀린다', () => {
  const qr = encodeQr('1', { ecl: 'M' });
  assert.ok(qrPath(qr, 0).startsWith('M0 0'), '왼쪽 위 첫 칸이 (0,0)이어야 한다');
  assert.ok(qrPath(qr, 4).startsWith('M4 4'));
});

/* ══════════════════════ 널리 쓰이는 문자열 꼴 ══════════════════════ */

test('와이파이 꼴이 관행대로 나온다', () => {
  assert.equal(
    wifiPayload({ ssid: 'MyHome', password: 'letmein', auth: 'WPA' }),
    'WIFI:T:WPA;S:MyHome;P:letmein;;',
  );
  // 열린 망은 비밀번호 항목 자체가 빠진다
  assert.equal(wifiPayload({ ssid: 'Coffee Shop', auth: 'nopass' }), 'WIFI:T:nopass;S:Coffee Shop;;');
  assert.equal(wifiPayload({ ssid: 'Coffee Shop', password: 'x', auth: 'nopass' }), 'WIFI:T:nopass;S:Coffee Shop;;');
  assert.equal(
    wifiPayload({ ssid: 'Guest', password: 'x', auth: 'WPA', hidden: true }),
    'WIFI:T:WPA;S:Guest;P:x;H:true;;',
  );
});

test('와이파이 비밀번호의 특수문자를 벗긴다', () => {
  /*
   * 벗기지 않으면 세미콜론 자리에서 잘려 **엉뚱한 비밀번호로 연결을 시도한다.**
   * 잘린 것을 알 방법이 없어서 사람은 공유기가 고장 났다고 생각한다.
   */
  const out = wifiPayload({ ssid: 'a;b', password: 'p:a,s"s\\1', auth: 'WPA' });
  assert.equal(out, 'WIFI:T:WPA;S:a\\;b;P:p\\:a\\,s\\"s\\\\1;;');
  /*
   * 이름이 16진수처럼 생기면 따옴표로 감싼다 — 안 감싸면 진짜 "deadbeef"라는
   * 이름이 바이트 열로 읽힌다. 대신 "Cafe"처럼 우연히 16진수 글자로만 된
   * 흔한 이름도 감싸인다(lib/qr-format.ts에 그 맞바꿈을 적어 뒀다).
   * 규칙을 바꾸는 사람이 두 경우를 다 보게 여기 나란히 못 박는다.
   */
  assert.equal(wifiPayload({ ssid: 'deadbeef', auth: 'nopass' }), 'WIFI:T:nopass;S:"deadbeef";;');
  assert.equal(wifiPayload({ ssid: 'Cafe', auth: 'nopass' }), 'WIFI:T:nopass;S:"Cafe";;');
  assert.equal(wifiPayload({ ssid: 'abz123', auth: 'nopass' }), 'WIFI:T:nopass;S:abz123;;');
});

test('연락처 꼴이 vCard 3.0이다', () => {
  const out = vcardPayload({ lastName: '홍', firstName: '길동', phone: '010-1234-5678', email: 'a@b.com' });
  const lines = out.split('\r\n');
  assert.equal(lines[0], 'BEGIN:VCARD');
  assert.equal(lines[1], 'VERSION:3.0');
  assert.equal(lines[2], 'N:홍;길동;;;', 'N은 다섯 칸이라 빈 칸도 자리를 지켜야 한다');
  assert.ok(lines.includes('FN:길동 홍'));
  assert.ok(lines.includes('TEL;TYPE=CELL:010-1234-5678'));
  assert.equal(lines[lines.length - 1], 'END:VCARD');
  assert.ok(out.includes('\r\n'), 'CRLF가 아니면 한 항목으로 뭉쳐 읽는 앱이 있다');
  // 쉼표·세미콜론·줄바꿈을 벗긴다
  assert.ok(vcardPayload({ org: 'A, B; C' }).includes('ORG:A\\, B\\; C'));
  assert.ok(vcardPayload({ note: 'a\nb' }).includes('NOTE:a\\nb'));
});

test('메일·전화·문자·좌표·주소 꼴', () => {
  assert.equal(emailPayload({ to: 'a@b.com' }), 'mailto:a@b.com');
  assert.equal(emailPayload({ to: 'a@b.com', subject: 'hi there' }), 'mailto:a@b.com?subject=hi%20there');
  assert.equal(emailPayload({ to: 'a@b.com', body: 'x&y' }), 'mailto:a@b.com?body=x%26y');

  // 괄호·공백·붙임표를 빼야 전화 앱이 번호로 알아본다
  assert.equal(phonePayload('+82 (10) 1234-5678'), 'tel:+821012345678');
  assert.equal(smsPayload({ number: '010-1234-5678', message: '가는 중' }), 'SMSTO:01012345678:가는 중');
  assert.equal(smsPayload({ number: '01012345678' }), 'SMSTO:01012345678');
  assert.equal(geoPayload({ lat: ' 37.5665 ', lon: '126.9780' }), 'geo:37.5665,126.9780');

  // 스킴이 없으면 https를 붙이고, 있으면 건드리지 않는다
  assert.equal(normalizeUrl('vixutil.com/text/qr'), 'https://vixutil.com/text/qr');
  assert.equal(normalizeUrl('http://a.com'), 'http://a.com');
  assert.equal(normalizeUrl('mailto:a@b.com'), 'mailto:a@b.com');
  assert.equal(normalizeUrl('  '), '');
});

test('만들어진 꼴이 전부 QR에 들어간다', () => {
  const payloads = [
    wifiPayload({ ssid: '우리집 와이파이', password: 'p@ss;word', auth: 'WPA' }),
    vcardPayload({ lastName: 'Hong', firstName: 'Gildong', org: 'vixutil', phone: '01012345678', email: 'a@b.com' }),
    emailPayload({ to: 'hello@vixutil.com', subject: '문의', body: '안녕하세요' }),
    phonePayload('+82-10-1234-5678'),
    smsPayload({ number: '01012345678', message: 'hi' }),
    geoPayload({ lat: '37.5665', lon: '126.9780' }),
    normalizeUrl('vixutil.com/text/qr'),
  ];
  for (const payload of payloads) {
    const qr = encodeQr(payload, { ecl: 'M' });
    assert.ok(qr.version >= MIN_VERSION && qr.version <= MAX_VERSION, payload);
    assert.equal(qr.size, moduleSize(qr.version));
    assert.equal(qr.modules.length, qr.size);
    assert.ok(qr.modules.every(row => row.length === qr.size), '판이 정사각형이 아니다');
  }
});

/* ══════════════════════ 열 언어 문구 ══════════════════════ */

const LOCALES = Object.keys(QR_UI) as (keyof typeof QR_UI)[];
/** 화면 로케일 → tests/han.ts가 쓰는 짧은 열쇠 */
const HAN_KEY: Record<string, string> = { 'zh-hans': 'zh', 'zh-hant': 'tw' };

/** 사전을 훑어 (경로, 문자열) 짝을 낸다 — 함수 값은 실제로 불러 본다 */
function strings(value: unknown, path: string): [string, string][] {
  if (typeof value === 'string') return [[path, value]];
  if (typeof value === 'function') return [[path, (value as (a: number, b: number) => string)(3, 271)]];
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([k, v]) => strings(v, `${path}.${k}`));
  }
  return [];
}

test('열 언어가 다 있고 열쇠가 빠진 곳이 없다', () => {
  assert.equal(LOCALES.length, 10, `언어가 ${LOCALES.length}개뿐`);
  const koKeys = strings(QR_UI.ko, 'ko').map(([p]) => p.slice(3));
  assert.ok(koKeys.length >= 45, `문구가 ${koKeys.length}개뿐 — 사전이 얇다`);
  for (const locale of LOCALES) {
    const keys = strings(QR_UI[locale], locale).map(([p]) => p.slice(locale.length + 1));
    assert.deepEqual(keys, koKeys, `${locale}: 한국어와 열쇠가 다르다`);
  }
});

test('열 언어 문구가 비어 있지 않다', () => {
  const empty: string[] = [];
  for (const locale of LOCALES) {
    for (const [path, value] of strings(QR_UI[locale], locale)) {
      if (!value.trim()) empty.push(path);
    }
  }
  assert.deepEqual(empty, []);
});

test('남의 언어 글자가 안 섞인다', () => {
  const problems: string[] = [];
  for (const locale of LOCALES) {
    const lang = HAN_KEY[locale] ?? locale;
    for (const [path, value] of strings(QR_UI[locale], locale)) {
      const problem = hanProblem(lang, value);
      if (problem) problems.push(`${path}: ${problem}`);
    }
  }
  assert.deepEqual(problems, []);
});

test('안내 문장이 번역을 안 한 채 남아 있지 않다', () => {
  /*
   * 한국어를 그대로 복사해 두면 열쇠는 다 차 있고 화면도 안 비어 조용히 지나간다.
   * 긴 문장만 본다 — 라벨은 언어끼리 같을 수 있다(Wi-Fi·SMS·Version 같은 것).
   */
  const LONG = ['eclHint', 'lowContrast', 'note', 'empty', 'textPlaceholder'] as const;
  for (const key of LONG) {
    const values = LOCALES.map(l => QR_UI[l][key]);
    assert.equal(new Set(values).size, 10, `${key}가 언어끼리 같다`);
    for (const locale of LOCALES) {
      if (locale === 'ko') continue;
      assert.notEqual(QR_UI[locale][key], QR_UI.ko[key], `${locale}.${key}가 한국어 그대로다`);
    }
  }
  // 넘침 안내는 숫자를 두 개 다 받아 적어야 한다
  for (const locale of LOCALES) {
    const text = QR_UI[locale].tooLong(300, 271);
    assert.ok(text.includes('300') && text.includes('271'), `${locale}: 넘친 양을 안 적는다`);
  }
});

test('설명이 그 언어에서 너무 짧지 않다', () => {
  // 한글·가나·한자는 로마자의 절반 남짓이라 하한을 둘로 나눈다(tests/han.ts의 DENSE)
  for (const locale of LOCALES) {
    const lang = HAN_KEY[locale] ?? locale;
    const floor = DENSE.has(lang) ? 12 : 24;
    for (const key of ['eclHint', 'note', 'lowContrast'] as const) {
      const value = QR_UI[locale][key];
      assert.ok(value.length >= floor, `${locale}.${key}가 ${value.length}자뿐`);
    }
  }
});

test('꼴 이름표가 여덟 가지에 다 있다', () => {
  for (const locale of LOCALES) {
    for (const format of QR_FORMATS) {
      assert.ok(QR_UI[locale].formats[format]?.trim(), `${locale}: ${format} 이름표가 없다`);
    }
    assert.equal(Object.keys(QR_UI[locale].formats).length, QR_FORMATS.length, `${locale}: 이름표 개수`);
  }
});

test('모드 이름표가 세 가지에 다 있다', () => {
  for (const locale of LOCALES) {
    for (const mode of ['numeric', 'alnum', 'byte'] as Mode[]) {
      assert.ok(QR_UI[locale].modes[mode]?.trim(), `${locale}: ${mode}`);
    }
  }
});

/* ══════════════════════ 배선 ══════════════════════ */

test('도구 카탈로그와 열 언어 목록에 실려 있다', () => {
  const tool = findTextTool('qr');
  assert.ok(tool, '한국어 카탈로그에 없다');
  assert.equal(tool.category, '기호·입력');
  assert.ok((TEXT_INTL_SLUGS as readonly string[]).includes('qr'), '다국어 슬러그에 없다');
  for (const lang of ['en', 'es', 'pt-br', 'ja', 'de', 'fr', 'hi', 'zh-hans', 'zh-hant'] as const) {
    const found = textToolsIntl(lang).find(t => t.slug === 'qr');
    assert.ok(found, `${lang}에 없다`);
    assert.ok(found.metaTitle.includes(found.title), `${lang}: metaTitle에 제목이 없다`);
    assert.ok(found.long.length >= 40, `${lang}: 설명이 ${found.long.length}자뿐`);
    assert.ok(found.features.length >= 3, `${lang}: 기능이 ${found.features.length}개뿐`);
  }
  // 기존 도구를 밀어내지 않았다
  assert.ok(TEXT_TOOLS.length >= 19, `도구가 ${TEXT_TOOLS.length}개뿐`);
});

test('한국어 라우트와 접힌 아홉 언어 모듈이 둘 다 있다', () => {
  assert.ok(existsSync(join(appJoin('text'), 'qr', 'page.tsx')), '한국어 페이지가 없다');
  const fold = join(ROOT, 'lib', 'fold', 'pages', 'text__qr.tsx');
  assert.ok(existsSync(fold), '접힌 모듈이 없다');
  /*
   * 등록부에서 한 줄이 빠지면 아홉 언어가 **조용히** 404가 된다 — 모듈 파일은
   * 그대로 있고 빌드도 통과하며 사이트맵은 그 주소를 계속 내건다.
   */
  const registry = readFileSync(join(ROOT, 'lib', 'fold', 'registry.ts'), 'utf8');
  assert.ok(registry.includes("'text/qr': () => import('./pages/text__qr')"), '접기 등록부에 없다');

  const page = readFileSync(join(appJoin('text'), 'qr', 'page.tsx'), 'utf8');
  assert.ok(page.includes('TextShell'), '공용 셸을 안 쓴다');
  assert.ok(page.includes('slug="qr"'), '셸에 넘긴 slug가 다르다');
  assert.ok(page.includes("canonical: '/text/qr'"), 'canonical이 없다');
});

test('FAQ가 있다', () => {
  assert.ok((SECTION_FAQ['text/qr'] ?? []).length >= 2, `FAQ가 ${(SECTION_FAQ['text/qr'] ?? []).length}개뿐`);
  for (const item of SECTION_FAQ['text/qr']) {
    assert.ok(item.q.trim().length >= 8, `질문이 짧다: ${item.q}`);
    assert.ok(item.a.trim().length >= 30, `답이 짧다: ${item.a}`);
  }
});

test('화면 컴포넌트가 입력한 글을 밖으로 내보내지 않는다', () => {
  /*
   * 와이파이 비밀번호와 연락처를 받는 도구다. 전송 경로가 생기면 "브라우저
   * 안에서만 처리한다"는 안내가 그대로 거짓이 된다.
   */
  const src = readFileSync(join(ROOT, 'components', 'text', 'QrTool.tsx'), 'utf8');
  assert.doesNotMatch(src, /\bfetch\s*\(|XMLHttpRequest|navigator\.sendBeacon|new WebSocket/);
  assert.ok(src.startsWith("'use client'"), '클라이언트 컴포넌트가 아니다');
  /*
   * 인코더는 순수해야 한다 — React나 JSX가 닿으면 node --test가 이 파일을
   * "Unknown file extension" 또는 파싱 오류로 못 읽는다. 이 검사 파일이 lib/qr.ts를
   * import해 여기까지 왔다는 것 자체가 파싱은 되었다는 증거이므로, 남은 것은
   * "나중에 누가 화면 조각을 여기 넣는 것"을 막는 일이다.
   */
  const encoder = readFileSync(join(ROOT, 'lib', 'qr.ts'), 'utf8');
  assert.doesNotMatch(encoder, /from ['"]react['"]|['"]use client['"]|<[A-Za-z][^>]*\/?>\s*[;)]/);
  for (const file of ['qr.ts', 'qr-format.ts', 'qr-ui.ts']) {
    assert.doesNotMatch(
      readFileSync(join(ROOT, 'lib', file), 'utf8'),
      /\bfetch\s*\(|XMLHttpRequest|localStorage|document\./,
      `lib/${file}가 브라우저나 서버를 건드린다 — 순수해야 검사가 부를 수 있다`,
    );
  }
});
