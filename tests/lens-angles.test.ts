/**
 * 렌즈 화각이 스스로 어긋나지 않는지 본다.
 *
 * 이 자료의 위험은 그럴듯한 오답이다. 46.8도를 47.5도로 적어도 아무도 못 잡고,
 * 크롭 배수를 손으로 적으면 대각선과 어긋난 채 남는다. 그래서 표에는 초점거리와
 * 센서 크기만 두고, 널리 알려진 값 몇 개를 못으로 박아 계산 자체를 검사한다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { FOCALS, LENSES, LENS_ICON, LENS_SLUGS, SENSORS, lensOf, lensesOfSensor, sensorOf } from '../lib/lens/list.ts';
import { angleOf, lensFacts, neighbourFocals, sameFieldOfView } from '../lib/lens/facts.ts';
import { LENS_UI } from '../lib/lens/ui.ts';
import { LANG_CODES } from '../lib/i18n/lang.ts';
import { DENSE, hanProblem } from './han.ts';

test('100가지가 넘는다', () => {
  assert.ok(LENSES.length >= 100, `${LENSES.length}가지뿐이다`);
  assert.equal(LENSES.length, FOCALS.length * SENSORS.length, '초점거리 × 센서 수와 맞지 않는다');
});

test('열쇠가 겹치지 않고 주소로 쓸 수 있다', () => {
  assert.equal(new Set(LENS_SLUGS).size, LENSES.length, 'slug 중복');
  for (const l of LENSES) {
    assert.match(l.slug, /^[0-9]+mm-[a-z0-9-]+$/, `주소에 못 쓰는 slug: ${l.slug}`);
    assert.equal(l.slug, `${l.focal}mm-${l.sensor}`, `${l.slug}: 열쇠가 값과 다르다`);
    assert.ok(sensorOf(l.sensor), `${l.slug}: 없는 센서를 가리킨다`);
  }
});

test('널리 알려진 화각과 맞는다', () => {
  // 50mm 풀프레임의 대각 화각 46.8도는 어느 표에나 실려 있는 값이다
  assert.equal(lensFacts(lensOf('50mm-ff')!).diagonal, 46.8);
  // 35mm 풀프레임은 63도 언저리, 24mm는 84도 언저리
  assert.ok(Math.abs(lensFacts(lensOf('35mm-ff')!).diagonal - 63.4) < 0.3);
  assert.ok(Math.abs(lensFacts(lensOf('24mm-ff')!).diagonal - 84.1) < 0.5);
  // 수평 화각도 함께 — 50mm 풀프레임은 약 39.6도
  assert.ok(Math.abs(lensFacts(lensOf('50mm-ff')!).horizontal - 39.6) < 0.2);
});

test('크롭 배수가 대각선 비와 같다', () => {
  assert.equal(lensFacts(lensOf('50mm-ff')!).crop, 1, '풀프레임은 1이어야 한다');
  assert.equal(lensFacts(lensOf('50mm-mft')!).crop, 2, '마이크로포서드는 2여야 한다');
  assert.ok(Math.abs(lensFacts(lensOf('50mm-apsc')!).crop - 1.53) < 0.02, 'APS-C는 1.5 언저리여야 한다');
  const ff = Math.hypot(36, 24);
  for (const s of SENSORS) {
    const f = lensFacts(lensesOfSensor(s.key)[0]);
    assert.ok(Math.abs(f.crop - ff / Math.hypot(s.w, s.h)) < 0.01, `${s.key}: 크롭 배수가 대각선과 어긋난다`);
  }
});

test('환산 초점거리는 초점거리 × 크롭 배수다', () => {
  for (const l of LENSES) {
    const f = lensFacts(l);
    // 화면에 적히는 크롭 배수를 그대로 곱해도 화면에 적히는 환산값이 나와야 한다
    assert.equal(f.equiv, Math.round(l.focal * f.crop), `${l.slug}: 환산이 어긋난다`);
    assert.ok(f.equiv >= l.focal - 1, `${l.slug}: 환산이 실제보다 작다`);
  }
  // 같은 화면을 만드는 짝 — 50mm 풀프레임과 25mm 마이크로포서드
  assert.equal(lensFacts(lensOf('50mm-ff')!).equiv, lensFacts(lensOf('25mm-mft')!).equiv);
});

test('화각은 초점거리가 길수록 좁아진다', () => {
  for (const s of SENSORS) {
    const list = lensesOfSensor(s.key);
    for (let i = 1; i < list.length; i++) {
      const before = lensFacts(list[i - 1]);
      const now = lensFacts(list[i]);
      assert.ok(now.diagonal < before.diagonal, `${s.key}: ${before.focal}mm보다 ${now.focal}mm가 넓다`);
      assert.ok(now.widthAt2m < before.widthAt2m, `${s.key}: ${now.focal}mm가 더 넓게 담는다`);
    }
  }
});

test('세 방향 화각의 크기 순서가 맞는다', () => {
  // 가로가 세로보다 길므로 대각 > 가로 > 세로여야 한다
  for (const l of LENSES) {
    const f = lensFacts(l);
    assert.ok(f.diagonal >= f.horizontal, `${l.slug}: 대각이 가로보다 좁다`);
    assert.ok(f.horizontal > f.vertical, `${l.slug}: 가로가 세로보다 좁다`);
    assert.ok(f.diagonal > 0 && f.diagonal < 180, `${l.slug}: 화각 범위 밖`);
  }
});

test('2미터 앞 가로 폭이 삼각비와 맞는다', () => {
  for (const l of LENSES) {
    const f = lensFacts(l);
    const expected = 2 * 2 * Math.tan((f.horizontal / 2) * (Math.PI / 180));
    assert.ok(Math.abs(f.widthAt2m - expected) < 0.02, `${l.slug}: 폭이 화각과 어긋난다`);
  }
  // 50mm 풀프레임은 2미터 앞에서 1.4미터쯤 담는다
  assert.ok(Math.abs(lensFacts(lensOf('50mm-ff')!).widthAt2m - 1.44) < 0.05);
});

test('한 변의 화각 계산이 정의대로다', () => {
  assert.ok(Math.abs(angleOf(36, 36) - 53.13) < 0.01, '변과 초점거리가 같으면 약 53.13도다');
  assert.ok(Math.abs(angleOf(2, 1) - 90) < 0.001, '변이 초점거리의 두 배면 90도다');
});

test('갈래가 환산 초점거리를 따른다', () => {
  assert.equal(lensFacts(lensOf('50mm-ff')!).kind, 'standard');
  assert.equal(lensFacts(lensOf('8mm-ff')!).kind, 'ultrawide');
  assert.equal(lensFacts(lensOf('200mm-ff')!).kind, 'tele');
  assert.equal(lensFacts(lensOf('800mm-ff')!).kind, 'supertele');
  // 같은 50mm라도 마이크로포서드에서는 환산 100mm라 망원이 된다
  assert.equal(lensFacts(lensOf('50mm-mft')!).kind, 'tele');
  for (const k of ['ultrawide', 'wide', 'standard', 'tele', 'supertele'] as const) {
    assert.ok(LENSES.some(l => lensFacts(l).kind === k), `${k} 갈래가 비었다`);
  }
});

test('같은 화각 짝은 센서마다 하나씩, 환산이 가깝다', () => {
  for (const l of LENSES) {
    const mates = sameFieldOfView(l.slug);
    assert.equal(mates.length, SENSORS.length - 1, `${l.slug}: 짝의 수가 다르다`);
    assert.equal(new Set(mates.map(m => m.sensor)).size, mates.length, `${l.slug}: 같은 센서가 겹친다`);
    assert.ok(!mates.some(m => m.sensor === l.sensor), `${l.slug}: 자기 센서가 들어 있다`);
  }
  // 50mm 풀프레임의 짝은 APS-C 35mm, 마이크로포서드 25mm 언저리다
  const mates = sameFieldOfView('50mm-ff').map(m => m.slug);
  assert.ok(mates.includes('35mm-apsc'), `APS-C 짝이 35mm가 아니다: ${mates.join(', ')}`);
  assert.ok(mates.includes('25mm-mft'), `MFT 짝이 25mm가 아니다: ${mates.join(', ')}`);
});

test('이웃 초점거리는 같은 센서에서 초점거리 순으로 준다', () => {
  for (const l of LENSES) {
    const near = neighbourFocals(l.slug);
    assert.ok(near.length > 0, `${l.slug}: 이웃이 없다`);
    assert.ok(!near.some(n => n.slug === l.slug), `${l.slug}: 자기 자신이 들어 있다`);
    for (const n of near) assert.equal(n.sensor, l.sensor, `${l.slug}: 다른 센서가 섞였다`);
    const focals = near.map(n => n.focal);
    assert.deepEqual(focals, [...focals].sort((a, b) => a - b), `${l.slug}: 초점거리 순이 아니다`);
  }
});

test('열 언어 문구가 모두 채워져 있다', () => {
  const f = lensFacts(lensOf('50mm-ff')!);
  for (const lang of LANG_CODES) {
    const ui = LENS_UI[lang];
    for (const [key, val] of Object.entries(ui)) {
      assert.ok(val != null, `${lang}.${key}가 비었다`);
      if (typeof val === 'string') assert.ok(val.trim().length > 0, `${lang}.${key}가 빈 문자열이다`);
      if (typeof val === 'string') assert.equal(hanProblem(lang, val), '');
    }
    assert.equal(ui.how.length, 4, `${lang}: 읽는 방법 수가 다르다`);
    assert.equal(ui.hubFaq.length, 5, `${lang}: 허브 FAQ 수가 다르다`);
    assert.equal(ui.lensFaq(f, 'x').length, 4, `${lang}: 상세 FAQ 수가 다르다`);
    for (const s of SENSORS) assert.ok(ui.sensorNote[s.key]?.length >= 10, `${lang}: ${s.key} 설명이 없다`);
    for (const k of ['ultrawide', 'wide', 'standard', 'tele', 'supertele'] as const) {
      assert.ok(ui.kindLabel[k], `${lang}: ${k} 이름이 없다`);
      assert.ok(ui.kindNote[k]?.length >= 10, `${lang}: ${k} 설명이 없다`);
    }
  }
});

test('언어끼리 글자가 섞이지 않는다', () => {
  // 센서 이름과 mm 단위는 어느 언어에서나 로마자 그대로 쓴다 — 그 밖의 글자만 본다
  const f = lensFacts(lensOf('85mm-apsc')!);
  for (const lang of LANG_CODES) {
    const ui = LENS_UI[lang];
    const texts = [
      ui.hubTitle, ui.hubLead, ui.hubMetaTitle, ui.hubMetaDesc, ui.section,
      ...ui.how,
      ...Object.values(ui.sensorNote), ...Object.values(ui.kindNote),
      ...ui.hubFaq.flatMap(q => [q.q, q.a]),
      ...ui.lensFaq(f, ui.kindLabel[f.kind]).flatMap(q => [q.q, q.a]),
    ];
    for (const t of texts) {
      if (lang !== 'ko') assert.ok(!/[가-힣]/.test(t), `${lang}: 한글이 섞였다 — ${t}`);
      if (lang !== 'ja' && lang !== 'ko') assert.ok(!/[ぁ-んァ-ヶ]/.test(t), `${lang}: 가나가 섞였다 — ${t}`);
      if (lang !== 'hi') assert.ok(!/[ऀ-ॿ]/.test(t), `${lang}: 데바나가리가 섞였다 — ${t}`);
    }
  }
});

test('모든 렌즈가 열 언어 메타를 만든다', () => {
  for (const l of LENSES) {
    const f = lensFacts(l);
    for (const lang of LANG_CODES) {
      const ui = LENS_UI[lang];
      const title = ui.metaTitle(f.focal, f.sensorName);
      assert.ok(title.includes(String(f.focal)), `${lang}/${l.slug}: 제목에 초점거리가 없다`);
      assert.ok(title.includes(f.sensorName), `${lang}/${l.slug}: 제목에 센서가 없다`);
      const desc = ui.metaDesc(f, ui.kindLabel[f.kind]);
      assert.ok(desc.includes(String(f.diagonal)), `${lang}/${l.slug}: 설명에 화각이 없다`);
      const floor = DENSE.has(lang) ? 25 : 40;
      assert.ok(desc.length > floor, `${lang}/${l.slug}: 설명이 너무 짧다`);
    }
  }
});

test('상세 FAQ가 렌즈마다 다른 답을 준다', () => {
  for (const lang of LANG_CODES) {
    const ui = LENS_UI[lang];
    const wide = ui.lensFaq(lensFacts(lensOf('16mm-ff')!), 'x')[0].a;
    const tele = ui.lensFaq(lensFacts(lensOf('300mm-ff')!), 'x')[0].a;
    assert.notEqual(wide, tele, `${lang}: 렌즈가 달라도 같은 답이 나온다`);
  }
});

test('렌즈 아이콘은 목록과 카드가 같은 그림을 쓴다', async () => {
  const { ICON_FOR } = await import('../lib/og-icon-map.ts');
  assert.equal(ICON_FOR[LENS_ICON], 'camera', '이모지가 사진기 아이콘으로 이어지지 않는다');
});
