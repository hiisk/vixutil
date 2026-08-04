/**
 * 프리픽스 계산이 스스로 어긋나지 않는지 본다.
 *
 * 자료가 없으니 위험한 곳은 계산뿐인데, 이쪽 계산은 눈으로 검산하기가 어렵다 —
 * 255.255.254.0이 /23인지 /22인지는 세어 봐야 안다. 그래서 검사가 **마스크를
 * 다시 프리픽스로 되돌린다.** 비트를 세는 길과 뺄셈으로 만드는 길이 다르므로,
 * 둘이 만나면 두 길 다 맞은 것이다.
 *
 * 주소 개수는 2^96 같은 수라 보통 수로는 셀 수 없다. BigInt로 세고, 한 비트
 * 줄면 정확히 두 배가 되는지로 확인한다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { CIDR_ICON, CIDR_SLUGS, PREFIXES, V4_BITS, V6_BITS, prefixOf, slugOf } from '../lib/cidr/list.ts';
import { FAMILIES, bitsOfMask, blocksOf, cidrFacts, maskOf, neighbours, prefixesOf } from '../lib/cidr/facts.ts';
import { CIDR_UI } from '../lib/cidr/ui.ts';
import { LANG_CODES } from '../lib/i18n/lang.ts';
import { DENSE, hanProblem } from './han.ts';

const TWO = BigInt(2);

test('100가지가 넘고 주소가 겹치지 않는다', () => {
  assert.ok(PREFIXES.length >= 100, `${PREFIXES.length}가지뿐이다`);
  assert.equal(PREFIXES.length, V4_BITS + 1 + V6_BITS + 1);
  assert.equal(PREFIXES.length, 162);
  assert.equal(new Set(CIDR_SLUGS).size, PREFIXES.length, 'slug 중복');
  assert.deepEqual(prefixOf('v4-24'), { family: 'v4', bits: 24 });
  assert.equal(prefixOf('24'), undefined, '어느 쪽인지 없는 주소는 받지 않는다');
  assert.equal(prefixOf('v4-33'), undefined, 'IPv4는 32까지다');
  assert.equal(prefixOf('v6-128')!.bits, 128);
});

test('마스크를 되돌리면 그 프리픽스가 나온다', () => {
  for (const p of prefixesOf('v4')) {
    const f = cidrFacts(p);
    assert.equal(bitsOfMask(f.mask!), p.bits, `/${p.bits}: 마스크를 되돌리면 다르다 — ${f.mask}`);
    // 네 토막이 모두 0~255다
    for (const part of f.mask!.split('.')) {
      const n = Number(part);
      assert.ok(n >= 0 && n <= 255, `/${p.bits}: 마스크 토막이 범위 밖이다`);
      // 마스크의 각 바이트는 1이 앞에 몰려 있어야 한다 — 255,254,252…128,0 뿐이다
      assert.match(n.toString(2).padStart(8, '0'), /^1*0*$/, `/${p.bits}: 마스크에 구멍이 있다 — ${part}`);
    }
    // 와일드카드는 마스크를 뒤집은 것이다
    const back = f.wildcard!.split('.').map((w, i) => Number(w) + Number(f.mask!.split('.')[i]));
    assert.deepEqual(back, [255, 255, 255, 255], `/${p.bits}: 마스크와 와일드카드를 더하면 255가 아니다`);
    assert.equal(parseInt(f.maskHex!, 16), parseInt(f.bin, 2), `/${p.bits}: 16진수 마스크가 비트와 다르다`);
  }
  assert.equal(maskOf(24), '255.255.255.0');
  assert.equal(maskOf(23), '255.255.254.0');
  assert.equal(maskOf(0), '0.0.0.0');
  assert.equal(maskOf(32), '255.255.255.255');
  assert.equal(bitsOfMask('255.255.240.0'), 20);
});

test('비트 그림이 1과 0으로만 갈린다', () => {
  for (const p of prefixesOf('v4')) {
    const f = cidrFacts(p);
    assert.equal(f.bin.length, 32, `/${p.bits}: 32비트가 아니다`);
    assert.equal(f.bin, `${'1'.repeat(p.bits)}${'0'.repeat(32 - p.bits)}`, `/${p.bits}: 비트 그림이 다르다`);
    assert.equal((f.bin.match(/1/g) ?? []).length, p.bits, `/${p.bits}: 1의 개수가 프리픽스와 다르다`);
  }
});

test('주소 개수가 한 비트마다 두 배가 된다', () => {
  for (const family of FAMILIES) {
    const list = prefixesOf(family);
    for (let i = 1; i < list.length; i++) {
      const wider = cidrFacts(list[i - 1]);
      const narrower = cidrFacts(list[i]);
      assert.equal(wider.addresses, narrower.addresses * TWO, `${family}/${list[i].bits}: 두 배가 아니다`);
    }
    // 가장 긴 프리픽스는 주소 하나뿐이다
    const last = cidrFacts(list[list.length - 1]);
    assert.equal(last.addresses, BigInt(1), `${family}: 마지막 프리픽스가 주소 하나가 아니다`);
  }
  assert.equal(cidrFacts({ family: 'v4', bits: 24 }).addresses, BigInt(256));
  assert.equal(cidrFacts({ family: 'v4', bits: 0 }).addresses, TWO ** BigInt(32));
  assert.equal(cidrFacts({ family: 'v6', bits: 64 }).addresses, TWO ** BigInt(64));
});

test('쓸 수 있는 주소에서 두 개를 빼되 31과 32는 예외다', () => {
  for (const p of prefixesOf('v4')) {
    const f = cidrFacts(p);
    if (p.bits <= 30) {
      assert.equal(f.usable, f.addresses - TWO, `/${p.bits}: 망 주소와 브로드캐스트를 빼지 않았다`);
      assert.ok(f.usable > BigInt(0), `/${p.bits}: 쓸 수 있는 주소가 없다`);
    } else {
      // /31은 두 주소를 다 쓰고(RFC 3021) /32는 하나뿐이다 — 공식대로면 0과 -1이 된다
      assert.equal(f.usable, f.addresses, `/${p.bits}: 예외 자리인데 뺐다`);
    }
  }
  assert.equal(cidrFacts({ family: 'v4', bits: 24 }).usable, BigInt(254));
  assert.equal(cidrFacts({ family: 'v4', bits: 30 }).usable, BigInt(2));
  assert.equal(cidrFacts({ family: 'v4', bits: 31 }).usable, BigInt(2));
  assert.equal(cidrFacts({ family: 'v4', bits: 32 }).usable, BigInt(1));
  // IPv6에는 브로드캐스트가 없어 뺄 것이 없다
  assert.equal(cidrFacts({ family: 'v6', bits: 64 }).usable, cidrFacts({ family: 'v6', bits: 64 }).addresses);
});

test('안에 드는 작은 망의 개수가 맞는다', () => {
  for (const p of prefixesOf('v4')) {
    const f = cidrFacts(p);
    if (p.bits <= 24) {
      assert.equal(f.subnets, TWO ** BigInt(24 - p.bits), `/${p.bits}: /24 개수가 다르다`);
      // 다른 길: /24 하나가 256개이므로 주소 수를 256으로 나눈 값과 같아야 한다
      assert.equal(f.subnets, f.addresses / BigInt(256), `/${p.bits}: 나눗셈과 다르다`);
    } else {
      assert.equal(f.subnets, BigInt(0), `/${p.bits}: /24보다 좁은데 개수가 있다`);
    }
  }
  assert.equal(cidrFacts({ family: 'v4', bits: 16 }).subnets, BigInt(256));
  assert.equal(cidrFacts({ family: 'v6', bits: 48 }).subnets, BigInt(65536), 'IPv6의 /48에는 /64가 65,536개다');
  assert.equal(cidrFacts({ family: 'v6', bits: 56 }).subnets, BigInt(256));
});

test('예전 분류와 16진수 경계가 맞다', () => {
  assert.equal(cidrFacts({ family: 'v4', bits: 8 }).classful, 'A');
  assert.equal(cidrFacts({ family: 'v4', bits: 16 }).classful, 'B');
  assert.equal(cidrFacts({ family: 'v4', bits: 24 }).classful, 'C');
  assert.equal(cidrFacts({ family: 'v4', bits: 25 }).classful, undefined);
  assert.equal(cidrFacts({ family: 'v6', bits: 8 }).classful, undefined, 'IPv6에는 분류가 없다');
  for (const p of PREFIXES) {
    assert.equal(cidrFacts(p).nibble, p.bits % 4 === 0, `${slugOf(p)}: 16진수 경계 표시가 어긋난다`);
  }
});

test('특수 대역이 제 프리픽스에 붙는다', () => {
  for (const p of PREFIXES) {
    for (const block of blocksOf(p)) {
      const bits = Number(block.split('/')[1]);
      assert.equal(bits, p.bits, `${block}: /${p.bits} 자리에 붙어 있다`);
      const v6 = block.includes(':');
      assert.equal(v6, p.family === 'v6', `${block}: 갈래가 다르다`);
    }
  }
  assert.ok(blocksOf({ family: 'v4', bits: 8 }).includes('10.0.0.0/8'));
  assert.ok(blocksOf({ family: 'v6', bits: 10 }).includes('fe80::/10'));
  assert.deepEqual(blocksOf({ family: 'v4', bits: 27 }), [], '아무 대역도 없는 프리픽스가 있다');
});

test('이웃이 자기 자신을 빼고 같은 갈래에 머문다', () => {
  for (const p of PREFIXES) {
    const n = neighbours(p);
    assert.ok(!n.some(o => o.bits === p.bits), `${slugOf(p)}: 이웃에 자기 자신이 있다`);
    for (const o of n) assert.equal(o.family, p.family, `${slugOf(p)}: 다른 갈래가 섞였다`);
  }
});

test('프리픽스 아이콘은 목록과 카드가 같은 그림을 쓴다', async () => {
  const { ICON_FOR } = await import('../lib/og-icon-map.ts');
  assert.equal(ICON_FOR[CIDR_ICON], 'globe', '이모지가 지구 아이콘으로 이어지지 않는다');
});

/* ───────── 화면 문구 ───────── */

test('열 언어 문구가 모두 채워져 있다', () => {
  const f = cidrFacts({ family: 'v4', bits: 24 });
  for (const lang of LANG_CODES) {
    const ui = CIDR_UI[lang];
    for (const [key, val] of Object.entries(ui)) {
      assert.ok(val != null, `${lang}.${key}가 비었다`);
      if (typeof val === 'string') {
        assert.ok(val.trim().length > 0, `${lang}.${key}가 빈 문자열이다`);
        assert.equal(hanProblem(lang, val), '', `${lang}.${key}: ${hanProblem(lang, val)}`);
      }
    }
    assert.equal(ui.how.length, 4, `${lang}: 읽는 방법 수가 다르다`);
    assert.equal(ui.hubFaq.length, 5, `${lang}: 허브 FAQ 수가 다르다`);
    assert.equal(ui.prefixFaq(f).length, 4, `${lang}: 상세 FAQ 수가 다르다`);
    for (const fam of FAMILIES) {
      assert.ok(ui.familyLabel[fam], `${lang}: ${fam} 이름이 없다`);
      assert.ok(ui.familyNote[fam]?.length >= (DENSE.has(lang) ? 6 : 12), `${lang}: ${fam} 설명이 없다`);
    }
  }
});

test('언어끼리 글자가 섞이지 않는다', () => {
  // 일본어 문장 한가운데 한글이 남아 있어도 화면은 멀쩡해 보인다 — 실제로 그랬다
  const HAN_OK = new Set(['ja', 'zh', 'tw']);
  for (const lang of LANG_CODES) {
    const ui = CIDR_UI[lang];
    const strings = [
      ...Object.values(ui).filter((v): v is string => typeof v === 'string'),
      ...ui.how,
      ...ui.hubFaq.flatMap(q => [q.q, q.a]),
      ...FAMILIES.map(f => ui.familyNote[f]),
      ui.desc(cidrFacts({ family: 'v4', bits: 24 })),
      ui.desc(cidrFacts({ family: 'v6', bits: 64 })),
    ];
    for (const s of strings) {
      if (lang !== 'ko') assert.ok(!/[가-힣]/.test(s), `${lang}: 한글이 섞였다 — ${s}`);
      if (lang !== 'ja') assert.ok(!/[ぁ-んァ-ヶ]/.test(s), `${lang}: 가나가 섞였다 — ${s}`);
      if (!HAN_OK.has(lang)) assert.ok(!/[一-龯]/.test(s), `${lang}: 한자가 섞였다 — ${s}`);
      if (lang !== 'hi') assert.ok(!/[ऀ-ॿ]/.test(s), `${lang}: 데바나가리가 섞였다 — ${s}`);
    }
  }
});

test('설명이 162가지 모두에서 만들어진다', () => {
  for (const p of PREFIXES) {
    const f = cidrFacts(p);
    for (const lang of LANG_CODES) {
      const ui = CIDR_UI[lang];
      const d = ui.desc(f);
      const floor = DENSE.has(lang) ? 20 : 35;
      assert.ok(d.length > floor, `${lang}/${slugOf(p)}: 설명이 너무 짧다 — ${d}`);
      assert.ok(d.includes(`/${p.bits}`), `${lang}/${slugOf(p)}: 설명에 프리픽스가 없다`);
      const meta = ui.metaDesc(f);
      assert.ok(meta.length > (DENSE.has(lang) ? 25 : 40), `${lang}/${slugOf(p)}: 메타 설명이 너무 짧다`);
      assert.ok(ui.metaTitle(f).includes(`/${p.bits}`), `${lang}/${slugOf(p)}: 제목에 프리픽스가 없다`);
    }
  }
});

test('열 언어를 통틀어 제목이 겹치지 않는다', () => {
  const seen = new Map<string, string>();
  for (const lang of LANG_CODES) {
    for (const p of PREFIXES) {
      const title = CIDR_UI[lang].metaTitle(cidrFacts(p));
      const before = seen.get(title);
      assert.equal(before, undefined, `"${title}"를 ${before}와 ${lang}/${slugOf(p)}가 함께 쓴다`);
      seen.set(title, `${lang}/${slugOf(p)}`);
    }
  }
});

test('큰 수는 거듭제곱으로 적는다', () => {
  // 2^64를 자릿수로 끊어 놓아도 읽히지 않는다. 32비트까지만 끊어 적는다
  assert.equal(CIDR_UI.en.count(BigInt(256), 8), '256');
  assert.equal(CIDR_UI.en.count(BigInt(4294967296), 32), '4,294,967,296');
  assert.equal(CIDR_UI.de.count(BigInt(4294967296), 32), '4.294.967.296');
  assert.equal(CIDR_UI.en.count(BigInt(2) ** BigInt(64), 64), '2^64');
  assert.equal(CIDR_UI.ko.count(BigInt(2) ** BigInt(96), 96), '2^96');
});
