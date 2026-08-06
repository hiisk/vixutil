/**
 * 포트 목록이 스스로 어긋나지 않는지 본다.
 *
 * 여기서는 자료를 적었으므로(번호 → 서비스) 베끼다 틀릴 자리가 있다. 그래서
 * 검사는 두 가지를 본다. 하나는 목록 자체가 성립하는가 — 번호가 오름차순이고
 * 겹치지 않고 16비트 안에 드는가. 다른 하나는 **적은 것과 계산이 맞물리는가** —
 * 21의 짝이 990이라고 적었으면 990도 목록에 있어야 하고, 그 짝은 21보다
 * 뒤에 있어야 하며, 잘 알려진 포트라고 적힌 것은 실제로 1023 이하여야 한다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  PORTS, PORT_ICON, PORT_MAX, PORT_SLUGS, REGISTERED_MAX, WELL_KNOWN_MAX, portOf,
} from '../lib/port/list.ts';
import { GROUPS, RANGES, neighbours, portFacts, portsOfGroup, portsOfRange, rangeOf, sameGroup } from '../lib/port/facts.ts';
import { PORT_UI } from '../lib/port/ui.ts';
import { LANG_CODES } from '../lib/i18n/lang.ts';
import { DENSE, hanProblem } from './han.ts';

test('100개가 넘고 주소가 겹치지 않는다', () => {
  assert.ok(PORTS.length >= 100, `${PORTS.length}개뿐이다`);
  assert.equal(new Set(PORT_SLUGS).size, PORTS.length, 'slug 중복');
  assert.equal(portOf('22')!.name, 'ssh');
  assert.equal(portOf('022'), undefined, '앞에 0이 붙은 주소는 받지 않는다');
  assert.equal(portOf('65536'), undefined);
});

test('번호가 오름차순이고 16비트 안에 든다', () => {
  PORTS.forEach((x, i) => {
    assert.ok(x.port >= 1 && x.port <= PORT_MAX, `${x.name}: 포트 범위 밖이다 — ${x.port}`);
    if (i > 0) assert.ok(x.port > PORTS[i - 1].port, `${x.name}: 오름차순이 아니다`);
  });
  assert.equal(PORT_MAX, 2 ** 16 - 1, '포트 번호는 16비트다');
  assert.equal(new Set(PORTS.map(x => x.port)).size, PORTS.length, '번호 중복');
});

test('이름이 겹치지 않고 꼴이 맞는다', () => {
  const names = PORTS.map(x => x.name);
  assert.equal(new Set(names).size, names.length, '이름 중복');
  for (const x of PORTS) {
    assert.match(x.name, /^[a-z0-9][a-z0-9-]*$/, `${x.port}: 이름 꼴이 아니다 — ${x.name}`);
    assert.ok(x.service.length >= 3, `${x.port}: 설명이 너무 짧다`);
  }
  // 잘 알려진 몇 개를 못으로 박는다 — 한 줄 밀리면 여기서 걸린다
  assert.equal(portOf('80')!.name, 'http');
  assert.equal(portOf('443')!.name, 'https');
  assert.equal(portOf('53')!.name, 'domain');
  assert.equal(portOf('3306')!.name, 'mysql');
  assert.equal(portOf('5432')!.name, 'postgresql');
  assert.equal(portOf('6379')!.name, 'redis');
  assert.equal(portOf('27017')!.name, 'mongodb');
});

test('범위 갈래가 번호와 맞아떨어진다', () => {
  for (const x of PORTS) {
    const f = portFacts(x);
    if (x.port <= WELL_KNOWN_MAX) assert.equal(f.range, 'well-known', `${x.port}: 갈래가 다르다`);
    else if (x.port <= REGISTERED_MAX) assert.equal(f.range, 'registered', `${x.port}: 갈래가 다르다`);
    else assert.equal(f.range, 'dynamic', `${x.port}: 갈래가 다르다`);
    // 권한이 필요한 것은 정확히 1023 이하다
    assert.equal(f.privileged, x.port <= 1023, `${x.port}: 권한 표시가 어긋난다`);
  }
  assert.equal(rangeOf(0), 'well-known');
  assert.equal(rangeOf(1023), 'well-known');
  assert.equal(rangeOf(1024), 'registered');
  assert.equal(rangeOf(49151), 'registered');
  assert.equal(rangeOf(49152), 'dynamic');
  assert.equal(RANGES.reduce((n, r) => n + portsOfRange(r).length, 0), PORTS.length, '범위 밖 포트가 있다');
});

test('16진수와 두 바이트가 번호와 같은 수다', () => {
  for (const x of PORTS) {
    const f = portFacts(x);
    assert.equal(parseInt(f.hex, 16), x.port, `${x.port}: 16진수가 어긋난다`);
    assert.equal(parseInt(f.bin, 2), x.port, `${x.port}: 2진수가 어긋난다`);
    assert.equal(f.bin.length, 16, `${x.port}: 16비트로 적지 않았다`);
    assert.equal(f.bytes[0] * 256 + f.bytes[1], x.port, `${x.port}: 두 바이트를 합치면 번호가 아니다`);
    assert.ok(f.bytes.every(b => b >= 0 && b <= 255), `${x.port}: 바이트가 범위 밖이다`);
  }
  assert.equal(portFacts(portOf('80')!).hex, '0050');
  assert.deepEqual(portFacts(portOf('443')!).bytes, [1, 187]);
});

test('암호화된 짝이 서로를 가리킨다', () => {
  for (const x of PORTS) {
    if (x.secure === undefined) continue;
    const pair = PORTS.find(o => o.port === x.secure);
    assert.ok(pair, `${x.port}: 짝 ${x.secure}가 목록에 없다`);
    // 짝은 한쪽에만 적고 반대 방향은 계산으로 만든다
    assert.equal(portFacts(pair!).plain, x.port, `${x.port}: 짝이 되돌아오지 않는다`);
    assert.equal(pair!.secure, undefined, `${x.port}: 짝을 양쪽에 적었다`);
    assert.equal(x.group, pair!.group, `${x.port}: 짝의 갈래가 다르다`);
  }
  assert.equal(portFacts(portOf('80')!).secure, 443);
  assert.equal(portFacts(portOf('443')!).plain, 80);
  assert.equal(portFacts(portOf('143')!).secure, 993);
  assert.equal(portFacts(portOf('22')!).secure, undefined, 'SSH는 처음부터 암호화된다');
});

test('갈래가 빈 곳 없이 덮는다', () => {
  assert.equal(GROUPS.reduce((n, g) => n + portsOfGroup(g).length, 0), PORTS.length, '갈래 밖 포트가 있다');
  for (const g of GROUPS) assert.ok(portsOfGroup(g).length > 0, `${g}: 아무도 들지 않았다`);
  assert.equal(portOf('80')!.group, 'web');
  assert.equal(portOf('25')!.group, 'mail');
  assert.equal(portOf('22')!.group, 'remote');
});

test('이웃과 같은 갈래가 자기 자신을 뺀다', () => {
  for (const x of PORTS) {
    const n = neighbours(x.port);
    assert.ok(!n.some(o => o.port === x.port), `${x.port}: 이웃에 자기 자신이 있다`);
    assert.ok(n.length > 0, `${x.port}: 이웃이 없다`);
    const g = sameGroup(x);
    assert.ok(!g.some(o => o.port === x.port), `${x.port}: 같은 갈래에 자기 자신이 있다`);
    for (const o of g) assert.equal(o.group, x.group, `${x.port}: 다른 갈래가 섞였다`);
  }
});

test('관습으로 굳은 번호를 따로 표시한다', () => {
  // 3000·8080은 등록된 것이 아니라 관습이다. 뒤섞으면 "IANA에 있다"는 거짓말이 된다
  const custom = PORTS.filter(x => x.custom).map(x => x.port);
  assert.deepEqual(custom, [2222, 3000, 4200, 4444, 5000, 5173, 6060, 8000, 8006, 8123, 8888, 9000, 9093, 11434, 19132, 25565, 51820]);
  for (const port of custom) assert.equal(portFacts(portOf(String(port))!).custom, true);
  assert.equal(portFacts(portOf('80')!).custom, false);
});

test('포트 아이콘은 목록과 카드가 같은 그림을 쓴다', async () => {
  const { ICON_FOR } = await import('../lib/og-icon-map.ts');
  assert.equal(ICON_FOR[PORT_ICON], 'plug', '이모지가 플러그 아이콘으로 이어지지 않는다');
});

/* ───────── 화면 문구 ───────── */

test('열 언어 문구가 모두 채워져 있다', () => {
  const f = portFacts(portOf('443')!);
  for (const lang of LANG_CODES) {
    const ui = PORT_UI[lang];
    for (const [key, val] of Object.entries(ui)) {
      assert.ok(val != null, `${lang}.${key}가 비었다`);
      if (typeof val === 'string') {
        assert.ok(val.trim().length > 0, `${lang}.${key}가 빈 문자열이다`);
        assert.equal(hanProblem(lang, val), '', `${lang}.${key}: ${hanProblem(lang, val)}`);
      }
    }
    assert.equal(ui.how.length, 4, `${lang}: 읽는 방법 수가 다르다`);
    assert.equal(ui.hubFaq.length, 5, `${lang}: 허브 FAQ 수가 다르다`);
    assert.equal(ui.portFaq(f).length, 4, `${lang}: 상세 FAQ 수가 다르다`);
    // 한 글자가 한 낱말인 언어는 같은 말이 훨씬 짧다 — "浏览器敲门的地方。"는 아홉 자다
    const floor = DENSE.has(lang) ? 6 : 12;
    for (const g of GROUPS) {
      assert.ok(ui.groupLabel[g], `${lang}: ${g} 이름이 없다`);
      assert.ok(ui.groupNote[g]?.length >= floor, `${lang}: ${g} 설명이 없다`);
    }
    for (const r of RANGES) {
      assert.ok(ui.rangeLabel[r], `${lang}: ${r} 이름이 없다`);
      assert.ok(ui.rangeNote[r]?.length >= floor, `${lang}: ${r} 설명이 없다`);
    }
    for (const p of ['tcp', 'udp', 'both'] as const) assert.ok(ui.protoLabel[p], `${lang}: ${p} 이름이 없다`);
  }
});

test('설명이 127개 모두에서 만들어진다', () => {
  for (const x of PORTS) {
    const f = portFacts(x);
    for (const lang of LANG_CODES) {
      const ui = PORT_UI[lang];
      const d = ui.desc(f);
      const floor = DENSE.has(lang) ? 20 : 35;
      assert.ok(d.length > floor, `${lang}/${x.port}: 설명이 너무 짧다 — ${d}`);
      assert.ok(d.includes(String(x.port)), `${lang}/${x.port}: 설명에 번호가 없다`);
      // 짝이 있는 포트는 설명에서 짝을 알려 준다 — 80을 찾은 사람이 443을 알아야 한다
      if (f.secure) assert.ok(d.includes(String(f.secure)), `${lang}/${x.port}: 설명에 암호화 짝이 없다`);
      const meta = ui.metaDesc(f);
      assert.ok(meta.includes(x.name), `${lang}/${x.port}: 메타 설명에 이름이 없다`);
      assert.ok(meta.length > (DENSE.has(lang) ? 25 : 40), `${lang}/${x.port}: 메타 설명이 너무 짧다`);
      assert.ok(ui.metaTitle(f).includes(String(x.port)), `${lang}/${x.port}: 제목에 번호가 없다`);
    }
  }
});

test('열 언어를 통틀어 제목이 겹치지 않는다', () => {
  // 영어와 스페인어·포르투갈어는 "Port"와 "Puerto"로 갈리지만, 독일어와
  // 프랑스어는 둘 다 Port다 — 그래서 한쪽에 낱말을 더 붙여 두었다
  const seen = new Map<string, string>();
  for (const lang of LANG_CODES) {
    for (const x of PORTS) {
      const title = PORT_UI[lang].metaTitle(portFacts(x));
      const before = seen.get(title);
      assert.equal(before, undefined, `"${title}"를 ${before}와 ${lang}/${x.port}가 함께 쓴다`);
      seen.set(title, `${lang}/${x.port}`);
    }
  }
});

test('허브가 127개를 모두 건다', () => {
  const linked = new Set(GROUPS.flatMap(g => portsOfGroup(g).map(x => x.port)));
  for (const x of PORTS) assert.ok(linked.has(x.port), `${x.port}: 허브에서 걸리지 않는다`);
});
