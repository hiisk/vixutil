/**
 * QR 코드 인코더 — 버전 1~10, 오류정정 L·M·Q·H.
 *
 * ── 왜 라이브러리를 안 쓰나 ─────────────────────────────────
 * QR 인코딩은 규격(ISO/IEC 18004)이라 지어낼 것이 하나도 없다. 이 저장소가
 * 서 있는 방식 그대로다 — 규칙을 적고 검사가 되짚는다. 표를 손으로 적는 곳은
 * 딱 한 군데(블록 나누기)이고 나머지는 전부 계산이다. 그래야 표 오타가 검사에
 * 걸린다. 클라이언트 짐도 늘지 않는다.
 *
 * ── 왜 10까지만인가 ────────────────────────────────────────
 * 버전 40까지 하려면 손으로 적는 표가 160줄로 늘고, 그 줄은 계산으로 되짚을
 * 수 없는 순수한 자료다 — 오타가 나면 "자기와 일관된 틀린 QR"이 나온다.
 * 10에서 끊으면 표가 80칸이고 등급 L에서 UTF-8 271바이트가 들어간다. 이 도구가
 * 실제로 받는 것(주소·와이파이 비밀번호·연락처)은 거의 다 100바이트 아래다.
 *
 * **모자라면 정직하게 던진다.** 잘라 내면 화면에는 그럴듯한 사각형이 뜨지만
 * 스캐너는 아무것도 못 읽는다 — 이 도구에서 가장 위험한 자리가 여기다.
 *
 * ── 좌표 규약 ──────────────────────────────────────────────
 * modules[row][col], true가 어두운 칸(dark module)이다. 규격은 (i, j)를
 * (행, 열)로 쓰므로 그쪽에 맞췄다. 마스크 조건식도 규격 그대로 읽힌다.
 */

/** 오류정정 등급 — 되살릴 수 있는 손상 비율이 L 7% · M 15% · Q 25% · H 30% */
export type Ecl = 'L' | 'M' | 'Q' | 'H';
export const ECLS: readonly Ecl[] = ['L', 'M', 'Q', 'H'];

/** 인코딩 모드 — 숫자(numeric) · 영숫자(alphanumeric) · 바이트(byte, UTF-8) */
export type Mode = 'numeric' | 'alnum' | 'byte';

/** 이 인코더가 만드는 가장 큰 버전 */
export const MAX_VERSION = 10;
export const MIN_VERSION = 1;

/* ══════════════════════ 손으로 적는 것: 블록 나누기 ══════════════════════ */

/*
 * 규격에서 계산으로 얻을 수 없는 자료는 이 둘뿐이다. 나머지(전체 코드워드 수,
 * 데이터 코드워드 수, 글자 수 한도, 정렬 무늬 자리)는 모두 여기서 나온다.
 *
 * 표가 틀리면 QR이 자기와 일관되게 틀린다. 그래서 tests/qr.test.ts가
 * "데이터 + 오류정정 = 그 버전의 전체 코드워드"를 40칸 전부 되짚는다 —
 * 이 항등식은 세 표 중 어느 하나만 어긋나도 깨진다.
 */

/** 블록 하나에 붙는 오류정정 코드워드 수 (ISO/IEC 18004 표 13~16) */
const EC_PER_BLOCK: Record<Ecl, readonly number[]> = {
  //   v1  v2  v3  v4  v5  v6  v7  v8  v9 v10
  L: [  7, 10, 15, 20, 26, 18, 20, 24, 30, 18],
  M: [ 10, 16, 26, 18, 24, 16, 18, 22, 22, 26],
  Q: [ 13, 22, 18, 26, 18, 24, 18, 22, 20, 24],
  H: [ 17, 28, 22, 16, 22, 28, 26, 26, 24, 28],
};

/** 오류정정 블록 수 — 데이터를 이만큼 쪼개 각각에 부호를 붙인다 */
const BLOCK_COUNT: Record<Ecl, readonly number[]> = {
  //   v1  v2  v3  v4  v5  v6  v7  v8  v9 v10
  L: [  1,  1,  1,  1,  1,  2,  2,  2,  2,  4],
  M: [  1,  1,  1,  2,  2,  4,  4,  4,  5,  5],
  Q: [  1,  1,  2,  2,  4,  4,  6,  6,  8,  8],
  H: [  1,  1,  2,  4,  4,  4,  5,  6,  8,  8],
};

function checkVersion(version: number): void {
  if (!Number.isInteger(version) || version < MIN_VERSION || version > MAX_VERSION) {
    throw new RangeError(`qr: 버전이 ${MIN_VERSION}~${MAX_VERSION} 밖이다 — ${version}`);
  }
}

/** 블록 하나에 붙는 오류정정 코드워드 수 */
export function ecPerBlock(version: number, ecl: Ecl): number {
  checkVersion(version);
  return EC_PER_BLOCK[ecl][version - 1];
}

/** 오류정정 블록 수 */
export function blockCount(version: number, ecl: Ecl): number {
  checkVersion(version);
  return BLOCK_COUNT[ecl][version - 1];
}

/* ══════════════════════ 계산하는 것: 크기와 용량 ══════════════════════ */

/** 한 변의 칸 수 — 버전 n은 17 + 4n이다 */
export const moduleSize = (version: number): number => {
  checkVersion(version);
  return version * 4 + 17;
};

/**
 * 정렬 무늬(alignment pattern)의 중심 좌표.
 *
 * 규격은 표로 주지만 규칙이 있다 — 첫 자리는 늘 6, 마지막은 4n+10이고,
 * 사이를 짝수 간격으로 고르게 나눈다. 표로 적으면 오타를 잡을 길이 없으므로
 * 규칙으로 둔다. (버전 32만 규칙에서 벗어나는데 여기서는 10까지라 닿지 않는다)
 */
export function alignmentPositions(version: number): number[] {
  checkVersion(version);
  if (version === 1) return [];
  const count = Math.floor(version / 7) + 2;
  const last = version * 4 + 10;
  const step = Math.floor((version * 4 + count * 2 + 1) / (count * 2 - 2)) * 2;
  const out = [6];
  for (let k = count - 1, pos = last; k >= 1; k--, pos -= step) out[k] = pos;
  return out;
}

/**
 * 데이터·오류정정에 쓸 수 있는 칸 수 — 전체에서 기능 무늬를 뺀다.
 *
 * 표를 적는 대신 뺄셈으로 얻는다. 그래서 "전체 코드워드 수"가 규격 표와 맞는지
 * 검사가 물으면, 그것이 곧 크기·정렬 무늬·버전 정보 자리를 다 되짚는 셈이 된다.
 */
export function rawDataModules(version: number): number {
  const size = moduleSize(version);
  let n = size * size;
  n -= 8 * 8 * 3;        // 위치 찾기 무늬(finder) 셋 + 분리자(separator)
  n -= 15 * 2 + 1;       // 포맷 정보 두 벌 + 늘 어두운 칸 하나
  n -= (size - 16) * 2;  // 타이밍 패턴 — 찾기 무늬에 이미 든 부분은 뺀 길이
  if (version >= 2) {
    const k = alignmentPositions(version).length;
    n -= (k - 1) * (k - 1) * 25;  // 타이밍 줄과 안 겹치는 정렬 무늬 (5×5)
    n -= (k - 2) * 2 * 20;        // 타이밍 줄에 걸린 정렬 무늬 — 5칸이 이미 세어졌다
    if (version >= 7) n -= 36;    // 버전 정보 두 벌 (18칸씩)
  }
  return n;
}

/** 그 버전이 담는 전체 코드워드 수 (데이터 + 오류정정) */
export const totalCodewords = (version: number): number => Math.floor(rawDataModules(version) / 8);

/**
 * 코드워드로 채우고 남는 비트 — 버전에 따라 0~7개다.
 *
 * 남은 칸은 밝게 두고 마스크만 씌운다. 규격이 그렇게 정한 것이고, 이 칸을
 * 안 세면 지그재그 배치가 마지막에 데이터를 한 칸 밀어 넣어 전부 어긋난다.
 */
export const remainderBits = (version: number): number => rawDataModules(version) % 8;

/** 그 버전·등급의 데이터 코드워드 수 */
export function dataCodewords(version: number, ecl: Ecl): number {
  return totalCodewords(version) - ecPerBlock(version, ecl) * blockCount(version, ecl);
}

/**
 * 글자 수 지시자(character count indicator)의 비트 수.
 *
 * 버전이 커지면 담을 글자가 많아져 자릿수도 늘어난다. 10~26 구간에서 바이트
 * 모드만 8 → 16으로 두 배 뛰는 것이 규격이다(숫자·영숫자는 두 칸씩).
 */
export function countBits(version: number, mode: Mode): number {
  checkVersion(version);
  const wide = version >= 10;
  if (mode === 'numeric') return wide ? 12 : 10;
  if (mode === 'alnum') return wide ? 11 : 9;
  return wide ? 16 : 8;
}

/** 모드 지시자(mode indicator) 4비트 */
const MODE_BITS: Record<Mode, number> = { numeric: 0b0001, alnum: 0b0010, byte: 0b0100 };

/**
 * 그 버전·등급·모드에 들어가는 글자 수 (바이트 모드는 바이트 수).
 *
 * 숫자는 3자에 10비트, 영숫자는 2자에 11비트로 묶여 들어가므로 남는 비트로
 * 한두 자를 더 넣을 수 있다 — 숫자 2자는 7비트, 1자는 4비트, 영숫자 1자는 6비트.
 */
export function capacityChars(version: number, ecl: Ecl, mode: Mode): number {
  const bits = dataCodewords(version, ecl) * 8 - 4 - countBits(version, mode);
  if (bits <= 0) return 0;
  if (mode === 'byte') return Math.floor(bits / 8);
  if (mode === 'numeric') {
    const rest = bits % 10;
    return Math.floor(bits / 10) * 3 + (rest >= 7 ? 2 : rest >= 4 ? 1 : 0);
  }
  return Math.floor(bits / 11) * 2 + (bits % 11 >= 6 ? 1 : 0);
}

/** 이 인코더가 그 등급·모드로 받을 수 있는 최대치 — 화면이 "231/271"을 보이는 데 쓴다 */
export const maxCapacity = (ecl: Ecl, mode: Mode): number => capacityChars(MAX_VERSION, ecl, mode);

/* ══════════════════════ 모드 고르기 ══════════════════════ */

/** 영숫자 모드가 담는 45자 — 순서가 곧 값이다(0→0 … Z→35, 공백→36) */
export const ALNUM_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:';

const ALNUM_VALUE = new Map<string, number>([...ALNUM_CHARS].map((c, i) => [c, i]));

/** UTF-8 바이트 열 — 한글·이모지·악센트는 모두 이 길을 간다 */
export const utf8Bytes = (text: string): number[] => [...new TextEncoder().encode(text)];

/**
 * 가장 짧게 들어가는 모드를 고른다.
 *
 * 숫자만이면 숫자(3자 10비트), 대문자·숫자·몇 가지 기호면 영숫자(2자 11비트),
 * 그 밖은 바이트(1바이트 8비트)다. 소문자가 하나라도 있으면 영숫자가 아니다 —
 * 규격의 45자에 소문자가 없다.
 *
 * 빈 문자열은 바이트로 본다. 어느 모드로도 담기지만 화면이 빈 입력에서
 * 인코딩을 부르지 않으므로 기준만 하나 정해 둔다.
 */
export function pickMode(text: string): Mode {
  if (text.length > 0 && /^[0-9]+$/.test(text)) return 'numeric';
  if (text.length > 0 && [...text].every(c => ALNUM_VALUE.has(c))) return 'alnum';
  return 'byte';
}

/** 그 모드에서 세는 길이 — 바이트 모드만 글자 수가 아니라 바이트 수다 */
export function payloadLength(text: string, mode: Mode): number {
  return mode === 'byte' ? utf8Bytes(text).length : [...text].length;
}

/* ══════════════════════ 갈루아 체 GF(256) ══════════════════════ */

/*
 * 리드-솔로몬(Reed-Solomon) 부호는 바이트를 GF(256)의 원소로 보고 다항식
 * 나눗셈을 한다. 원시 다항식은 규격이 정한 x⁸+x⁴+x³+x²+1 (0x11D)이고
 * 생성원(primitive element)은 2다.
 *
 * 곱셈은 로그 표로 한다 — a·b = α^(log a + log b). 지수 표를 255칸 대신
 * 512칸으로 두면 더한 지수를 255로 나눌 필요가 없다.
 */
const GF_EXP = new Uint8Array(512);
const GF_LOG = new Uint8Array(256);
{
  let x = 1;
  for (let i = 0; i < 255; i++) {
    GF_EXP[i] = x;
    GF_LOG[x] = i;
    x <<= 1;
    if (x & 0x100) x ^= 0x11d;
  }
  for (let i = 255; i < 512; i++) GF_EXP[i] = GF_EXP[i - 255];
}

/** α^n — 지수는 255로 감는다 */
export const gfExp = (n: number): number => GF_EXP[((n % 255) + 255) % 255];

/** GF(256)의 곱셈. 0은 로그가 없으므로 먼저 걸러낸다 */
export function gfMul(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return GF_EXP[GF_LOG[a] + GF_LOG[b]];
}

/**
 * 생성 다항식(generator polynomial) — (x − α⁰)(x − α¹)…(x − α^(n−1)).
 *
 * GF(2)의 뺄셈은 XOR과 같으므로 부호를 신경 쓰지 않는다. 돌려주는 배열은
 * 차수가 높은 쪽부터고 맨 앞은 언제나 1이라, 길이가 n+1이다.
 *
 * 규격 부록에 계수 표가 있지만 적지 않는다. 이렇게 만들면 검사가
 * "gen(α^i) = 0 (i < n)"으로 되짚을 수 있고, 그 성질이 곧 정의다.
 */
export function generatorPoly(degree: number): number[] {
  if (degree < 1) throw new RangeError(`qr: 생성 다항식의 차수가 ${degree}`);
  let poly = [1];
  for (let i = 0; i < degree; i++) {
    const next = new Array<number>(poly.length + 1).fill(0);
    for (let j = 0; j < poly.length; j++) {
      next[j] ^= poly[j];                          // x를 곱한 자리
      next[j + 1] ^= gfMul(poly[j], GF_EXP[i]);    // α^i를 곱한 자리
    }
    poly = next;
  }
  return poly;
}

/** 다항식 값 — 계수는 차수가 높은 쪽부터, 호너(Horner) 셈 */
export function polyEval(coeffs: readonly number[], x: number): number {
  let y = 0;
  for (const c of coeffs) y = gfMul(y, x) ^ c;
  return y;
}

/**
 * 오류정정 코드워드 — data·x^degree를 생성 다항식으로 나눈 나머지.
 */
export function rsRemainder(data: readonly number[], degree: number): number[] {
  const gen = generatorPoly(degree);
  const rem = new Array<number>(degree).fill(0);
  for (const byte of data) {
    const factor = byte ^ rem[0];
    rem.shift();
    rem.push(0);
    for (let i = 0; i < degree; i++) rem[i] ^= gfMul(gen[i + 1], factor);
  }
  return rem;
}

/**
 * 신드롬(syndrome) — 부호어를 α⁰…α^(degree−1)에 넣은 값.
 *
 * 데이터 + 나머지는 생성 다항식의 배수라서 그 근에서 모두 0이 되어야 한다.
 * 검사가 이걸 본다: 0이 아니면 나눗셈이 틀렸다는 뜻이고, 코드워드를 한 비트만
 * 흔들면 0이 아니게 되어야 한다.
 */
export function syndromes(codeword: readonly number[], degree: number): number[] {
  return Array.from({ length: degree }, (_, i) => polyEval(codeword, GF_EXP[i]));
}

/* ══════════════════════ 비트 열 만들기 ══════════════════════ */

/** 비트를 하나씩 담는다. 코드워드로 묶는 것은 마지막에 한 번만 한다 */
class BitBuffer {
  readonly bits: number[] = [];
  push(value: number, len: number): void {
    for (let i = len - 1; i >= 0; i--) this.bits.push((value >>> i) & 1);
  }
  get length(): number {
    return this.bits.length;
  }
}

/**
 * 데이터 비트 — 모드 지시자 + 글자 수 + 알맹이.
 *
 * 종단자(terminator)와 채움은 여기서 하지 않는다. 그쪽은 버전이 정해진 뒤
 * 남은 자리를 봐야 알 수 있어 codewordsFor가 맡는다.
 */
function segmentBits(text: string, mode: Mode, version: number): BitBuffer {
  const buf = new BitBuffer();
  buf.push(MODE_BITS[mode], 4);
  buf.push(payloadLength(text, mode), countBits(version, mode));

  if (mode === 'numeric') {
    for (let i = 0; i < text.length; i += 3) {
      const chunk = text.slice(i, i + 3);
      // 3자 10비트 · 2자 7비트 · 1자 4비트 — 자릿수 × 3 + 1이다
      buf.push(Number(chunk), chunk.length * 3 + 1);
    }
  } else if (mode === 'alnum') {
    const chars = [...text];
    for (let i = 0; i < chars.length; i += 2) {
      const a = ALNUM_VALUE.get(chars[i]);
      if (a === undefined) throw new Error(`qr: 영숫자 모드에 없는 글자 — ${chars[i]}`);
      if (i + 1 < chars.length) {
        const b = ALNUM_VALUE.get(chars[i + 1])!;
        buf.push(a * 45 + b, 11);   // 두 자를 45진수 한 수로
      } else {
        buf.push(a, 6);
      }
    }
  } else {
    for (const byte of utf8Bytes(text)) buf.push(byte, 8);
  }
  return buf;
}

/**
 * 그 버전·등급으로 담을 데이터 코드워드 — 종단자와 채움까지 끝낸 상태.
 *
 * 채움 코드워드 0xEC·0x11을 번갈아 쓰는 것은 규격이 정한 값이다. 뜻은 없고
 * 어느 쪽으로도 치우치지 않는 무늬를 만들려는 것이다.
 */
export function codewordsFor(text: string, mode: Mode, version: number, ecl: Ecl): number[] {
  const need = dataCodewords(version, ecl);
  const capacity = need * 8;
  const buf = segmentBits(text, mode, version);
  if (buf.length > capacity) {
    throw new Error(`qr: 비트가 넘친다 (${buf.length} > ${capacity}) — 버전 고르기가 틀렸다`);
  }

  // 종단자는 0 네 개인데, 자리가 모자라면 있는 만큼만 넣는다
  buf.push(0, Math.min(4, capacity - buf.length));
  // 코드워드 경계까지 0으로 맞춘다
  buf.push(0, (8 - (buf.length % 8)) % 8);

  const out: number[] = [];
  for (let i = 0; i < buf.length; i += 8) {
    let byte = 0;
    for (let k = 0; k < 8; k++) byte = (byte << 1) | buf.bits[i + k];
    out.push(byte);
  }
  for (let i = 0; out.length < need; i++) out.push(i % 2 === 0 ? 0xec : 0x11);
  return out;
}

/**
 * 블록으로 쪼개 부호를 붙이고 규격 순서대로 섞는다(interleave).
 *
 * 왜 섞나 — 한곳이 찢기거나 가려졌을 때 피해를 블록마다 나눠 갖게 하려는 것이다.
 * 몰아서 두면 한 블록이 통째로 죽어 되살릴 수 없다.
 *
 * 블록 길이는 두 가지뿐이다. 전체를 블록 수로 나눠 짧은 쪽 길이를 얻고,
 * 나머지만큼의 블록이 한 칸씩 길다.
 */
export function interleave(data: readonly number[], version: number, ecl: Ecl): number[] {
  const blocks = blockCount(version, ecl);
  const ecLen = ecPerBlock(version, ecl);
  const raw = totalCodewords(version);
  const shortLen = Math.floor(raw / blocks);
  const shortCount = blocks - (raw % blocks);

  const dataBlocks: number[][] = [];
  const ecBlocks: number[][] = [];
  let at = 0;
  for (let b = 0; b < blocks; b++) {
    const len = shortLen - ecLen + (b < shortCount ? 0 : 1);
    const part = data.slice(at, at + len);
    at += len;
    dataBlocks.push(part);
    ecBlocks.push(rsRemainder(part, ecLen));
  }
  if (at !== data.length) {
    throw new Error(`qr: 데이터 코드워드가 ${data.length}개인데 블록이 ${at}개를 먹었다`);
  }

  const out: number[] = [];
  const longest = shortLen - ecLen + 1;
  for (let i = 0; i < longest; i++) {
    for (let b = 0; b < blocks; b++) if (i < dataBlocks[b].length) out.push(dataBlocks[b][i]);
  }
  for (let i = 0; i < ecLen; i++) {
    for (let b = 0; b < blocks; b++) out.push(ecBlocks[b][i]);
  }
  return out;
}

/* ══════════════════════ 포맷·버전 정보 ══════════════════════ */

/*
 * 두 정보는 데이터가 아니라 스캐너가 **먼저** 읽어야 하는 값이다. 그래서
 * 오류정정을 따로 쓴다 — 포맷 15비트는 BCH(15,5), 버전 18비트는 BCH(18,6)이다.
 *
 * 포맷 정보에만 0x5412를 XOR하는 것은 값이 전부 0인 경우(등급 M·마스크 0)를
 * 없애려는 것이다. 그 자리가 온통 밝으면 위치 찾기 무늬 옆이 텅 비어 스캐너가
 * 기준을 잡지 못한다.
 */

/** 포맷 정보가 쓰는 등급 번호 — 규격이 정한 순서라 L·M·Q·H 차례가 아니다 */
const ECL_FORMAT: Record<Ecl, number> = { L: 1, M: 0, Q: 3, H: 2 };

/** 포맷 정보 15비트 */
export function formatBits(ecl: Ecl, mask: number): number {
  if (!Number.isInteger(mask) || mask < 0 || mask > 7) throw new RangeError(`qr: 마스크가 0~7 밖이다 — ${mask}`);
  const data = (ECL_FORMAT[ecl] << 3) | mask;
  let rem = data;
  for (let i = 0; i < 10; i++) rem = (rem << 1) ^ ((rem >>> 9) * 0x537);
  return ((data << 10) | (rem & 0x3ff)) ^ 0x5412;
}

/** 버전 정보 18비트 — 버전 7부터만 넣는다 */
export function versionBits(version: number): number {
  checkVersion(version);
  let rem = version;
  for (let i = 0; i < 12; i++) rem = (rem << 1) ^ ((rem >>> 11) * 0x1f25);
  return (version << 12) | (rem & 0xfff);
}

/* ══════════════════════ 칸 배치 ══════════════════════ */

/** 그리는 중의 판 — modules는 어두움, fixed는 "기능 무늬라 데이터가 못 오는 칸" */
interface Board {
  size: number;
  modules: boolean[][];
  fixed: boolean[][];
}

function blankBoard(version: number): Board {
  const size = moduleSize(version);
  const grid = (): boolean[][] => Array.from({ length: size }, () => new Array<boolean>(size).fill(false));
  return { size, modules: grid(), fixed: grid() };
}

/** 기능 무늬 한 칸 — 데이터가 덮지 못하게 표시까지 한다 */
function setFixed(board: Board, row: number, col: number, dark: boolean): void {
  if (row < 0 || col < 0 || row >= board.size || col >= board.size) return;
  board.modules[row][col] = dark;
  board.fixed[row][col] = true;
}

/**
 * 위치 찾기 무늬(finder pattern) — 7×7의 겹사각형. 중심에서의 체비쇼프
 * 거리(가로·세로 중 큰 쪽)가 2와 4일 때만 밝다.
 *
 * −4~4를 도는 것은 분리자(separator)까지 한 번에 그리려는 것이다. 거리 4는
 * 밝으므로 무늬 둘레 한 칸이 저절로 비고, 판 밖으로 나가는 쪽은 버려진다.
 */
function drawFinder(board: Board, row: number, col: number): void {
  for (let dr = -4; dr <= 4; dr++) {
    for (let dc = -4; dc <= 4; dc++) {
      const dist = Math.max(Math.abs(dr), Math.abs(dc));
      setFixed(board, row + dr, col + dc, dist !== 2 && dist !== 4);
    }
  }
}

/** 정렬 무늬(alignment pattern) — 5×5. 거리 1만 밝다 */
function drawAlignment(board: Board, row: number, col: number): void {
  for (let dr = -2; dr <= 2; dr++) {
    for (let dc = -2; dc <= 2; dc++) {
      setFixed(board, row + dr, col + dc, Math.max(Math.abs(dr), Math.abs(dc)) !== 1);
    }
  }
}

/** 포맷 정보를 두 자리에 같이 적는다 — 한쪽이 가려져도 읽히게 */
function drawFormat(board: Board, ecl: Ecl, mask: number): void {
  const bits = formatBits(ecl, mask);
  const bit = (i: number): boolean => ((bits >>> i) & 1) !== 0;
  const size = board.size;

  // 왼쪽 위 — 8번 열을 타고 내려오다 8번 행을 타고 오른쪽으로 간다
  for (let i = 0; i <= 5; i++) setFixed(board, i, 8, bit(i));
  setFixed(board, 7, 8, bit(6));
  setFixed(board, 8, 8, bit(7));
  setFixed(board, 8, 7, bit(8));
  for (let i = 9; i < 15; i++) setFixed(board, 8, 14 - i, bit(i));

  // 오른쪽 위와 왼쪽 아래 — 같은 15비트를 나눠 갖는다
  for (let i = 0; i < 8; i++) setFixed(board, 8, size - 1 - i, bit(i));
  for (let i = 8; i < 15; i++) setFixed(board, size - 15 + i, 8, bit(i));
  setFixed(board, size - 8, 8, true);   // 늘 어두운 칸(dark module)
}

/** 기능 무늬 전부 — 데이터를 넣기 전에 자리를 다 잡아 둔다 */
function drawFunctionPatterns(board: Board, version: number, ecl: Ecl): void {
  const size = board.size;

  // 타이밍 패턴 — 6번 행과 6번 열. 찾기 무늬가 곧 덮어쓰므로 먼저 긋는다
  for (let i = 0; i < size; i++) {
    setFixed(board, 6, i, i % 2 === 0);
    setFixed(board, i, 6, i % 2 === 0);
  }

  drawFinder(board, 3, 3);
  drawFinder(board, 3, size - 4);
  drawFinder(board, size - 4, 3);

  const pos = alignmentPositions(version);
  for (let a = 0; a < pos.length; a++) {
    for (let b = 0; b < pos.length; b++) {
      // 세 꼭지는 찾기 무늬가 이미 차지했다
      const corner = (a === 0 && b === 0) || (a === 0 && b === pos.length - 1) || (a === pos.length - 1 && b === 0);
      if (!corner) drawAlignment(board, pos[a], pos[b]);
    }
  }

  // 마스크는 아직 모르지만 자리는 지금 잡아 둬야 데이터가 안 들어온다
  drawFormat(board, ecl, 0);

  if (version >= 7) {
    const bits = versionBits(version);
    for (let i = 0; i < 18; i++) {
      const dark = ((bits >>> i) & 1) !== 0;
      const far = size - 11 + (i % 3);
      const near = Math.floor(i / 3);
      setFixed(board, near, far, dark);   // 오른쪽 위
      setFixed(board, far, near, dark);   // 왼쪽 아래
    }
  }
}

/**
 * 지그재그 순서로 훑을 자리를 차례대로 낸다 — 오른쪽 아래에서 시작한다.
 *
 * 두 칸 폭의 띠를 위로 훑고, 다음 띠는 아래로 훑는다. **6번 열은 띠에서 아예
 * 빼야 한다** — 타이밍 패턴이라 데이터가 못 오는데, 그 열을 세어 두면 왼쪽
 * 띠들의 짝이 한 칸씩 어긋난다.
 *
 * 처음에는 `right`를 그대로 두고 "6이면 5를 쓴다"로만 했다가 4번 열을 두 번
 * 훑고 0번 열을 아예 안 훑었다. 버전 1에서는 훑은 칸 수가 우연히 같아
 * 개수 검사로는 안 걸렸고, 버전 8에서 다섯 칸이 모자라 드러났다.
 * 그래서 자리 자체를 6에서 5로 **당겨** 다음 띠가 3에서 시작하게 한다.
 */
function* zigzagCells(size: number): Generator<[number, number]> {
  let right = size - 1;
  while (right >= 1) {
    if (right === 6) right = 5;
    const upward = ((right + 1) & 2) === 0;
    for (let step = 0; step < size; step++) {
      const row = upward ? size - 1 - step : step;
      yield [row, right];
      yield [row, right - 1];
    }
    right -= 2;
  }
}

/**
 * 코드워드를 지그재그 순서로 놓는다.
 *
 * 남는 비트(remainder bits)가 있는 버전에서는 마지막 칸 몇이 밝게 남는다.
 * 그래서 "놓은 비트 수"만 세면 자리를 두 번 밟는 실수를 못 잡는다 — 밟은
 * 자리를 따로 표시해 두 번 밟기와 안 밟은 자리를 둘 다 짚는다.
 */
function drawCodewords(board: Board, codewords: readonly number[]): void {
  const size = board.size;
  const total = codewords.length * 8;
  const seen = Array.from({ length: size }, () => new Array<boolean>(size).fill(false));
  let at = 0;

  for (const [row, col] of zigzagCells(size)) {
    if (board.fixed[row][col]) continue;
    if (seen[row][col]) throw new Error(`qr: (${row},${col})을 두 번 밟았다 — 지그재그가 어긋났다`);
    seen[row][col] = true;
    if (at >= total) continue;      // 남는 비트 — 밝게 둔다
    board.modules[row][col] = ((codewords[at >>> 3] >>> (7 - (at & 7))) & 1) !== 0;
    at++;
  }

  if (at !== total) throw new Error(`qr: 코드워드 ${total}비트 중 ${at}비트만 놓였다`);
  let missed = 0;
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) if (!board.fixed[row][col] && !seen[row][col]) missed++;
  }
  if (missed > 0) throw new Error(`qr: 데이터 칸 ${missed}개를 안 밟았다 — 지그재그가 어긋났다`);
}

/* ══════════════════════ 마스크 ══════════════════════ */

/**
 * 마스크 여덟 가지의 조건식 — 규격의 (i, j)를 (행, 열)로 그대로 옮겼다.
 *
 * 참인 칸의 색을 뒤집는다. 목적은 하나다 — 어두운 칸이 몰리거나 위치 찾기
 * 무늬를 닮은 무늬가 데이터 쪽에 생기면 스캐너가 헷갈린다.
 */
export const MASK_RULES: readonly ((row: number, col: number) => boolean)[] = [
  (i, j) => (i + j) % 2 === 0,
  (i) => i % 2 === 0,
  (_i, j) => j % 3 === 0,
  (i, j) => (i + j) % 3 === 0,
  (i, j) => (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0,
  (i, j) => ((i * j) % 2) + ((i * j) % 3) === 0,
  (i, j) => (((i * j) % 2) + ((i * j) % 3)) % 2 === 0,
  (i, j) => (((i + j) % 2) + ((i * j) % 3)) % 2 === 0,
];

/** 마스크를 씌운다. 두 번 부르면 원래대로 돌아온다(XOR) */
function applyMask(board: Board, mask: number): void {
  const rule = MASK_RULES[mask];
  if (!rule) throw new RangeError(`qr: 마스크가 0~7 밖이다 — ${mask}`);
  for (let row = 0; row < board.size; row++) {
    for (let col = 0; col < board.size; col++) {
      if (!board.fixed[row][col] && rule(row, col)) board.modules[row][col] = !board.modules[row][col];
    }
  }
}

/** 벌점 네 가지를 따로 돌려준다 — 검사가 규칙 하나를 빼고 다시 골라 볼 수 있게 */
export interface MaskPenalty {
  /** 규칙 1: 한 줄에 같은 색이 다섯 이상 이어짐 */
  n1: number;
  /** 규칙 2: 2×2가 한 색 */
  n2: number;
  /** 규칙 3: 위치 찾기 무늬를 닮은 1:1:3:1:1 무늬 */
  n3: number;
  /** 규칙 4: 어두운 칸 비율이 50%에서 멀어짐 */
  n4: number;
}

export const penaltyTotal = (p: MaskPenalty): number => p.n1 + p.n2 + p.n3 + p.n4;

/** 규칙 3이 찾는 무늬 — 어두움 1 : 밝음 1 : 어두움 3 : 밝음 1 : 어두움 1 에 밝은 네 칸이 붙은 꼴 */
const FINDER_LIKE: readonly boolean[][] = (() => {
  const core = [true, false, true, true, true, false, true];
  const quiet = [false, false, false, false];
  return [[...core, ...quiet], [...quiet, ...core]];
})();

/**
 * 마스크 벌점.
 *
 * 규격의 네 규칙을 그대로 센다. 점수가 낮을수록 좋은 무늬다 — 값 자체에는
 * 뜻이 없고 여덟 마스크를 견주는 데만 쓴다.
 */
export function maskPenalty(modules: readonly boolean[][]): MaskPenalty {
  const size = modules.length;
  const at = (row: number, col: number): boolean => modules[row][col];
  let n1 = 0;
  let n2 = 0;
  let n3 = 0;

  /* 규칙 1 — 다섯이 이어지면 3점, 그 뒤로 한 칸마다 1점 */
  const runs = (get: (k: number) => boolean): void => {
    let run = 1;
    for (let k = 1; k < size; k++) {
      if (get(k) === get(k - 1)) {
        run++;
        if (run === 5) n1 += 3;
        else if (run > 5) n1 += 1;
      } else run = 1;
    }
  };
  for (let i = 0; i < size; i++) {
    runs(k => at(i, k));
    runs(k => at(k, i));
  }

  /* 규칙 2 — 2×2 덩어리마다 3점. 3×3은 2×2가 넉 개라 12점이 된다 */
  for (let row = 0; row + 1 < size; row++) {
    for (let col = 0; col + 1 < size; col++) {
      const c = at(row, col);
      if (c === at(row, col + 1) && c === at(row + 1, col) && c === at(row + 1, col + 1)) n2 += 3;
    }
  }

  /* 규칙 3 — 찾기 무늬 닮은 꼴마다 40점. 가로·세로 양쪽을 본다 */
  const scan = (get: (k: number) => boolean): void => {
    for (let start = 0; start + 11 <= size; start++) {
      for (const pattern of FINDER_LIKE) {
        let hit = true;
        for (let k = 0; k < 11 && hit; k++) if (get(start + k) !== pattern[k]) hit = false;
        if (hit) n3 += 40;
      }
    }
  };
  for (let i = 0; i < size; i++) {
    scan(k => at(i, k));
    scan(k => at(k, i));
  }

  /*
   * 규칙 4 — 어두운 비율이 50%에서 5%씩 멀어질 때마다 10점.
   *
   * 실수로 재면 반올림 자리에서 마스크 선택이 흔들린다. |비율−50|/5은
   * |어두움×20 − 전체×10| / 전체와 같은 값이라 정수만으로 셀 수 있다.
   */
  let dark = 0;
  for (let row = 0; row < size; row++) for (let col = 0; col < size; col++) if (at(row, col)) dark++;
  const total = size * size;
  const n4 = Math.floor(Math.abs(dark * 20 - total * 10) / total) * 10;

  return { n1, n2, n3, n4 };
}

/* ══════════════════════ 바깥에 내놓는 것 ══════════════════════ */

/** 만든 QR 한 장 */
export interface QrCode {
  version: number;
  ecl: Ecl;
  mode: Mode;
  /** 한 변의 칸 수 = 17 + 4 × 버전 */
  size: number;
  /** 고른 마스크 번호 */
  mask: number;
  /** modules[행][열], true가 어두운 칸 */
  modules: boolean[][];
  /** 고른 마스크의 벌점 내역 — 화면이 보여 주지는 않지만 검사가 본다 */
  penalty: MaskPenalty;
  /** 그 버전·등급이 담는 데이터 코드워드 수 */
  dataCodewords: number;
  /** 실제로 쓴 길이 (바이트 모드는 바이트 수) */
  used: number;
}

/**
 * 담을 수 없을 때 던지는 오류.
 *
 * **잘라 내지 않는다.** 잘린 QR은 화면에 멀쩡한 사각형으로 뜨는데 스캐너는
 * 아무것도 못 읽는다 — 사람이 인쇄해서 붙이고 나서야 알게 되는 종류의 고장이다.
 * 그래서 여기서 멈추고, 얼마가 넘쳤는지 숫자로 말한다.
 */
export class QrTooLongError extends Error {
  /* 필드를 따로 적는다 — 생성자 매개변수에 readonly를 붙이는 꼴은
     node --test의 타입 지우기(strip-only)가 파싱하지 못한다 */
  readonly needed: number;
  readonly limit: number;
  readonly mode: Mode;
  readonly ecl: Ecl;

  constructor(needed: number, limit: number, mode: Mode, ecl: Ecl) {
    super(`qr: 너무 길다 — ${mode} 모드 등급 ${ecl}에서 ${limit}까지인데 ${needed}이다`);
    this.name = 'QrTooLongError';
    this.needed = needed;
    this.limit = limit;
    this.mode = mode;
    this.ecl = ecl;
  }
}

export interface QrOptions {
  ecl?: Ecl;
  /** 이 버전보다 작게는 만들지 않는다 — 칸을 크게 하고 싶을 때 쓴다 */
  minVersion?: number;
}

/** 담을 수 있는 가장 작은 버전. 없으면 null */
export function pickVersion(text: string, mode: Mode, ecl: Ecl, minVersion = MIN_VERSION): number | null {
  const from = Math.max(MIN_VERSION, Math.min(minVersion, MAX_VERSION));
  const len = payloadLength(text, mode);
  for (let v = from; v <= MAX_VERSION; v++) {
    if (len <= capacityChars(v, ecl, mode)) return v;
  }
  return null;
}

/**
 * 글을 QR로.
 *
 * 순서는 규격대로다 — 모드를 고르고, 담을 수 있는 가장 작은 버전을 고르고,
 * 비트를 만들고, 블록으로 쪼개 리드-솔로몬 부호를 붙여 섞고, 기능 무늬를 그린
 * 판에 지그재그로 놓고, 마스크 여덟 가지를 다 씌워 벌점이 가장 낮은 것을 남긴다.
 */
export function encodeQr(text: string, options: QrOptions = {}): QrCode {
  const ecl = options.ecl ?? 'M';
  const mode = pickMode(text);
  const version = pickVersion(text, mode, ecl, options.minVersion ?? MIN_VERSION);
  if (version === null) {
    throw new QrTooLongError(payloadLength(text, mode), maxCapacity(ecl, mode), mode, ecl);
  }

  const board = blankBoard(version);
  drawFunctionPatterns(board, version, ecl);
  drawCodewords(board, interleave(codewordsFor(text, mode, version, ecl), version, ecl));

  /*
   * 여덟 가지를 다 해 보고 고른다. 마스크는 XOR이라 같은 것을 두 번 씌우면
   * 원래대로 돌아오므로 판을 복사하지 않는다.
   *
   * 포맷 정보를 마스크마다 다시 적는 것을 빠뜨리면 안 된다 — 그 15칸도 무늬의
   * 일부라 벌점에 들어가고, 마스크 번호가 그 안에 들어 있다.
   */
  let best = 0;
  let bestScore = Number.POSITIVE_INFINITY;
  let bestPenalty: MaskPenalty = { n1: 0, n2: 0, n3: 0, n4: 0 };
  for (let mask = 0; mask < 8; mask++) {
    applyMask(board, mask);
    drawFormat(board, ecl, mask);
    const penalty = maskPenalty(board.modules);
    const score = penaltyTotal(penalty);
    if (score < bestScore) {
      bestScore = score;
      best = mask;
      bestPenalty = penalty;
    }
    applyMask(board, mask);
  }
  applyMask(board, best);
  drawFormat(board, ecl, best);

  return {
    version,
    ecl,
    mode,
    size: board.size,
    mask: best,
    modules: board.modules,
    penalty: bestPenalty,
    dataCodewords: dataCodewords(version, ecl),
    used: payloadLength(text, mode),
  };
}

/**
 * 마스크 여덟 가지의 벌점을 그대로 돌려준다 — 검사가 최솟값 고르기를 되짚는 자리.
 *
 * encodeQr 안에서 이미 하는 일이지만, 벌점 규칙 하나를 빼면 다른 마스크가
 * 뽑히는지 보려면 여덟 개를 다 볼 수 있어야 한다.
 */
export function maskScores(text: string, options: QrOptions = {}): MaskPenalty[] {
  const ecl = options.ecl ?? 'M';
  const mode = pickMode(text);
  const version = pickVersion(text, mode, ecl, options.minVersion ?? MIN_VERSION);
  if (version === null) throw new QrTooLongError(payloadLength(text, mode), maxCapacity(ecl, mode), mode, ecl);

  const board = blankBoard(version);
  drawFunctionPatterns(board, version, ecl);
  drawCodewords(board, interleave(codewordsFor(text, mode, version, ecl), version, ecl));

  const out: MaskPenalty[] = [];
  for (let mask = 0; mask < 8; mask++) {
    applyMask(board, mask);
    drawFormat(board, ecl, mask);
    out.push(maskPenalty(board.modules));
    applyMask(board, mask);
  }
  return out;
}

export interface SvgOptions {
  /** 칸 하나를 몇 픽셀로 그릴지 — width·height에만 쓰인다(viewBox는 칸 단위) */
  scale?: number;
  /** 여백(quiet zone)을 몇 칸 둘지. 규격 권고는 4다 */
  margin?: number;
  dark?: string;
  light?: string;
  /** 배경을 그리지 않는다 — 투명 PNG로 쓰고 싶을 때 */
  transparent?: boolean;
}

/**
 * 어두운 칸을 path 하나로 모은 d 속성값 — 좌표 단위는 칸이다.
 *
 * 칸마다 <rect>를 적지 않는 이유는 개수다. 버전 10은 칸이 3,249개라 태그로
 * 적으면 그만큼 늘어난다. path 하나면 화면에 그리는 노드가 하나다.
 *
 * 화면(components/text/QrTool.tsx)과 내려받는 SVG가 이 값을 함께 쓴다 —
 * 두 곳에서 따로 만들면 미리 보기와 내려받은 파일이 달라질 수 있다.
 */
export function qrPath(qr: QrCode, margin = 4): string {
  let path = '';
  for (let row = 0; row < qr.size; row++) {
    for (let col = 0; col < qr.size; col++) {
      if (qr.modules[row][col]) path += `M${col + margin} ${row + margin}h1v1h-1z`;
    }
  }
  return path;
}

/**
 * SVG 문자열.
 *
 * 왜 SVG인가 — 확대해도 안 깨지고, 인쇄할 때 칸 경계가 흐려지지 않는다.
 * QR은 칸 경계가 흐려지면 못 읽으므로 이 차이가 실제로 중요하다.
 */
export function qrToSvg(qr: QrCode, options: SvgOptions = {}): string {
  const { scale = 8, margin = 4, dark = '#000000', light = '#ffffff', transparent = false } = options;
  const span = qr.size + margin * 2;
  const px = span * scale;
  const bg = transparent ? '' : `<rect width="${span}" height="${span}" fill="${light}"/>`;
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${px}" height="${px}" viewBox="0 0 ${span} ${span}" ` +
    `shape-rendering="crispEdges">${bg}<path d="${qrPath(qr, margin)}" fill="${dark}"/></svg>`
  );
}
