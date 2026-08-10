/**
 * 피사계 심도 — 계산한 값을 다른 길로 되짚는다.
 *
 * 과초점거리는 f²/(N·c)+f이므로, 거꾸로 (H−f)·N·c를 하면 f²가 나와야 한다.
 * 앞뒤 한계는 그 H에서만 나오므로 H가 맞으면 나머지는 관계로 확인한다 —
 * 가까운 쪽 < 피사체 < 먼 쪽, s가 H에 닿으면 먼 쪽이 무한대.
 *
 * 널리 알려진 값 하나를 못으로 박아 둔다: 50mm f/8, 35mm 판형의 과초점거리는
 * 약 10.5m이고 그 절반인 5.2m부터 무한대까지 맞는다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  APERTURES, CELLS, FOCALS, FORMATS, SUBJECTS,
  cellOf, formatOf, slugOf,
} from '../lib/dof/list.ts';
import { dofFacts, farMm, hyperfocalMm, nearMm } from '../lib/dof/facts.ts';

const facts = (slug: string) => {
  const c = cellOf(slug);
  assert.ok(c, `${slug} 칸이 없다`);
  return dofFacts(c);
};

test('칸은 초점거리 12가지 × 조리개 10가지', () => {
  assert.equal(FOCALS.length, 12);
  assert.equal(APERTURES.length, 10);
  assert.equal(CELLS.length, 120);
  assert.equal(new Set(CELLS.map(slugOf)).size, 120);
  for (const c of CELLS) assert.deepEqual(cellOf(slugOf(c)), c, slugOf(c));

  // 두 축은 오르는 차례여야 한다 — 이웃 칸이 거기에 기댄다
  for (let i = 1; i < FOCALS.length; i++) assert.ok(FOCALS[i] > FOCALS[i - 1], String(FOCALS[i]));
  for (let i = 1; i < APERTURES.length; i++) assert.ok(APERTURES[i] > APERTURES[i - 1], String(APERTURES[i]));

  assert.equal(cellOf('50mm'), undefined);
  assert.equal(cellOf('55mm-f1-8'), undefined, '축에 없는 초점거리가 열리면 안 된다');
  assert.equal(cellOf('50mm-f3-2'), undefined, '축에 없는 조리개가 열리면 안 된다');
  assert.equal(slugOf({ focal: 50, aperture: 1.8 }), '50mm-f1-8');
});

test('과초점거리를 거꾸로 풀면 초점거리의 제곱이 나온다', () => {
  const coc = formatOf('ff')!.coc;
  for (const c of CELLS) {
    const h = hyperfocalMm(c.focal, c.aperture, coc);
    const back = (h - c.focal) * c.aperture * coc;
    assert.ok(Math.abs(back - c.focal ** 2) < 1e-6, `${slugOf(c)}: ${back} vs ${c.focal ** 2}`);
  }
  // 널리 쓰이는 값 — 50mm f/8은 10.5m 남짓이다
  assert.equal(facts('50mm-f8').hyperfocal, 10.47);
  // 초점거리가 두 배면 과초점거리는 네 배에 가깝다(+f 항만큼 어긋난다)
  const a = hyperfocalMm(50, 8, coc);
  const b = hyperfocalMm(100, 8, coc);
  assert.ok(Math.abs(b / a - 4) < 0.02, `${b / a}`);
  // 조리개를 두 배로 조이면 과초점거리는 절반에 가깝다
  const c8 = hyperfocalMm(50, 8, coc);
  const c16 = hyperfocalMm(50, 16, coc);
  assert.ok(Math.abs(c16 / c8 - 0.5) < 0.01, `${c16 / c8}`);
});

test('과초점거리에 맞추면 그 절반부터 맞는다', () => {
  /*
   * 어림이 아니라 식에서 그대로 떨어진다. s = H를 넣으면
   *   H(H−f) ÷ (H + H − 2f) = H(H−f) ÷ 2(H−f) = H/2
   * 이므로 정확히 절반이다. 두 값을 각각 두 자리에서 끊었으니 그만큼만 어긋난다.
   */
  for (const c of CELLS) {
    const f = dofFacts(c);
    assert.ok(Math.abs(f.hyperfocalNear - f.hyperfocal / 2) <= 0.011,
      `${f.slug}: ${f.hyperfocalNear} vs ${f.hyperfocal / 2}`);
  }
  assert.equal(facts('50mm-f8').hyperfocal, 10.47);
  assert.equal(facts('50mm-f8').hyperfocalNear, 5.23);
});

test('가까운 쪽 < 피사체 < 먼 쪽이고, H에 닿으면 무한대다', () => {
  for (const c of CELLS) {
    const f = dofFacts(c);
    assert.equal(f.spans.length, SUBJECTS.length);
    for (const s of f.spans) {
      assert.ok(s.near > 0, `${f.slug} ${s.subject}m: 앞이 0 이하다`);
      assert.ok(s.near <= s.subject + 1e-6, `${f.slug} ${s.subject}m: 앞이 피사체보다 멀다`);
      if (s.far === null) {
        // 무한대는 피사체가 과초점거리에 닿았을 때만이다
        assert.ok(s.subject >= f.hyperfocal - 0.05, `${f.slug} ${s.subject}m: H(${f.hyperfocal}) 앞인데 무한대다`);
        assert.equal(s.depth, null, `${f.slug}: 먼 쪽이 없는데 폭이 있다`);
      } else {
        assert.ok(s.far >= s.subject - 1e-6, `${f.slug} ${s.subject}m: 뒤가 피사체보다 가깝다`);
        assert.ok(s.subject < f.hyperfocal + 0.05, `${f.slug} ${s.subject}m: H를 넘었는데 끝이 있다`);
        assert.ok(Math.abs((s.depth as number) - (s.far - s.near)) <= 0.02,
          `${f.slug} ${s.subject}m: 폭이 뒤-앞과 다르다`);
      }
    }
  }
});

test('조리개를 조이면 깊어지고 초점거리가 길면 얕아진다', () => {
  const depthAt2 = (slug: string) => facts(slug).spans.find(s => s.subject === 2)!.depth;
  // 같은 렌즈에서 조일수록 깊다
  for (const focal of FOCALS) {
    let prev: number | null = null;
    for (const a of APERTURES) {
      const d = dofFacts({ focal, aperture: a }).spans.find(s => s.subject === 2)!.depth;
      if (d === null) { prev = null; continue; }   // 무한대에 닿으면 더 볼 것이 없다
      if (prev !== null) assert.ok(d >= prev, `${focal}mm f/${a}: 조였는데 얕아졌다`);
      prev = d;
    }
  }
  // 같은 조리개에서 초점거리가 길수록 얕다
  for (const a of APERTURES) {
    let prev: number | null = null;
    for (const focal of FOCALS) {
      const d = dofFacts({ focal, aperture: a }).spans.find(s => s.subject === 2)!.depth;
      if (d === null) continue;
      if (prev !== null) assert.ok(d <= prev, `${focal}mm f/${a}: 길어졌는데 깊어졌다`);
      prev = d;
    }
  }
  // 85mm f/1.4로 2m 인물을 찍으면 앞뒤 폭이 손바닥만 하다
  const d = depthAt2('85mm-f1-4');
  assert.ok(d !== null && d > 0.02 && d < 0.09, `85mm f/1.4의 2m 심도가 ${d}m`);
});

test('피사체가 멀수록 심도는 거리의 제곱으로 는다', () => {
  /*
   * H보다 훨씬 가까운 자리에서는 폭이 대략 2Ncs²/f²이다. 이 근사와 실제 식이
   * 어긋나지 않는지 본다 — 식을 잘못 옮겨 적으면 여기서 갈린다.
   */
  const coc = formatOf('ff')!.coc;
  for (const c of CELLS) {
    const f = dofFacts(c);
    for (const s of f.spans) {
      if (s.far === null || s.subject > f.hyperfocal / 10) continue;
      const approx = (2 * c.aperture * coc * (s.subject * 1000) ** 2) / c.focal ** 2 / 1000;
      assert.ok(Math.abs((s.depth as number) - approx) <= approx * 0.25 + 0.01,
        `${f.slug} ${s.subject}m: ${s.depth} vs 어림 ${approx}`);
    }
  }
});

test('판형이 작을수록 같은 렌즈가 깊어 보인다', () => {
  for (const c of CELLS) {
    const f = dofFacts(c);
    assert.equal(f.formats.length, FORMATS.length);
    // 허용 착란원이 작을수록 과초점거리는 멀다
    for (let i = 1; i < f.formats.length; i++) {
      assert.ok(f.formats[i].hyperfocal > f.formats[i - 1].hyperfocal,
        `${f.slug}: ${f.formats[i].key}가 ${f.formats[i - 1].key}보다 가깝다`);
    }
    // 첫 줄은 35mm 판형이고 본문 값과 같아야 한다
    assert.equal(f.formats[0].key, 'ff');
    assert.equal(f.formats[0].hyperfocal, f.hyperfocal);
  }
});

test('이웃 칸이 실제로 이웃이고 자기를 가리키지 않는다', () => {
  for (const c of CELLS) {
    const f = dofFacts(c);
    for (const [name, n] of [['wider', f.wider], ['tighter', f.tighter],
      ['shorter', f.shorter], ['longer', f.longer]] as const) {
      if (!n) continue;
      assert.notEqual(n.slug, f.slug, `${f.slug}: ${name}가 자기 자신`);
      assert.ok(cellOf(n.slug), `${f.slug}: ${name} ${n.slug} 칸이 없다`);
    }
    if (f.wider) assert.ok(f.wider.aperture < c.aperture, f.slug);
    if (f.tighter) assert.ok(f.tighter.aperture > c.aperture, f.slug);
    if (f.shorter) assert.ok(f.shorter.focal < c.focal, f.slug);
    if (f.longer) assert.ok(f.longer.focal > c.focal, f.slug);
    // 연 쪽은 과초점거리가 멀다(심도가 얕다)
    if (f.wider) assert.ok(dofFacts(cellOf(f.wider.slug)!).hyperfocal > f.hyperfocal, f.slug);
    if (f.tighter) assert.ok(dofFacts(cellOf(f.tighter.slug)!).hyperfocal < f.hyperfocal, f.slug);
  }
  assert.equal(facts('50mm-f1-4').wider, null);
  assert.equal(facts('50mm-f22').tighter, null);
  assert.equal(facts('14mm-f8').shorter, null);
  assert.equal(facts('400mm-f8').longer, null);
});

test('축에 없는 값을 넣으면 조용히 답하지 않는다', () => {
  assert.throws(() => dofFacts({ focal: 55, aperture: 8 }), /모르는 초점거리/);
  assert.throws(() => dofFacts({ focal: 50, aperture: 3.2 }), /모르는 조리개/);
});

test('식 하나를 직접 확인한다', () => {
  // 손으로 셈해도 같은지 — 50mm f/8, c=0.03: H = 2500/0.24 + 50 = 10466.7mm
  assert.ok(Math.abs(hyperfocalMm(50, 8, 0.03) - 10466.666) < 0.01);
  // 2m 피사체: 앞 1.68m, 뒤 2.47m 남짓
  const h = hyperfocalMm(50, 8, 0.03);
  assert.ok(Math.abs(nearMm(2000, h, 50) / 1000 - 1.68) < 0.01);
  assert.ok(Math.abs((farMm(2000, h, 50) as number) / 1000 - 2.47) < 0.01);
  // 피사체가 H를 넘으면 끝이 없다
  assert.equal(farMm(h, h, 50), null);
  assert.equal(farMm(h + 1, h, 50), null);
});
test('언어끼리 글자가 섞이지 않는다', async () => {
  const { LANG_CODES } = await import('../lib/i18n/lang.ts');
  const { DOF_UI } = await import('../lib/dof/ui.ts');
  const { hanProblem } = await import('./han.ts');
  const HAN_OK = new Set(['ja', 'zh', 'tw']);
  // 값이 0이 되는 칸, 큰 칸, 주유가 필요한 칸 — 문장 갈래를 모두 밟는다
  const shown = [
    dofFacts({ focal: 50, aperture: 8 }),
    dofFacts({ focal: 14, aperture: 22 }),
    dofFacts({ focal: 400, aperture: 1.4 }),
  ];
  for (const lang of LANG_CODES) {
    const ui = DOF_UI[lang];
    const strings = [
      ...Object.values(ui).filter((v): v is string => typeof v === 'string'),
      ...ui.how,
      ...ui.hubFaq.flatMap(q => [q.q, q.a]),
      ...shown.flatMap(f => [ui.desc(f), ui.metaTitle(f), ui.metaDesc(f),
        ...ui.cellFaq(f).flatMap(q => [q.q, q.a])]),
      ...FORMATS.map(x => ui.formatName(x.key)),
    ];
    for (const s of strings) {
      if (lang !== 'ko') assert.ok(!/[가-힣]/.test(s), `${lang}: 한글이 섞였다 — ${s}`);
      if (lang !== 'ja') assert.ok(!/[ぁ-んァ-ヶ]/.test(s), `${lang}: 가나가 섞였다 — ${s}`);
      if (!HAN_OK.has(lang)) assert.ok(!/[一-龯]/.test(s), `${lang}: 한자가 섞였다 — ${s}`);
      if (lang !== 'hi') assert.ok(!/[ऀ-ॿ]/.test(s), `${lang}: 데바나가리가 섞였다 — ${s}`);
      const han = hanProblem(lang, s);
      assert.equal(han, '', `${lang}: ${han} — ${s}`);
    }
  }
});

test('열 언어 모두 문구가 채워져 있다', async () => {
  const { LANG_CODES } = await import('../lib/i18n/lang.ts');
  const { DENSE } = await import('./han.ts');
  const { DOF_UI } = await import('../lib/dof/ui.ts');
  const f = dofFacts({ focal: 50, aperture: 8 });
  for (const lang of LANG_CODES) {
    const ui = DOF_UI[lang];
    const floor = DENSE.has(lang) ? 6 : 12;
    for (const [key, v] of Object.entries(ui)) {
      if (typeof v !== 'string') continue;
      assert.ok(v.trim().length > 0, `${lang}.${key}: 비어 있다`);
    }
    assert.ok(ui.hubLead.length >= (DENSE.has(lang) ? 20 : 35), `${lang}: hubLead가 짧다`);
    assert.equal(ui.how.length, 4, `${lang}: 알아 둘 것이 네 줄이 아니다`);
    assert.equal(ui.hubFaq.length, 5, `${lang}: 질문이 다섯이 아니다`);
    for (const h of ui.how) assert.ok(h.length >= floor, `${lang}: 너무 짧다 — ${h}`);
    for (const q of ui.hubFaq) assert.ok(q.q.length >= floor && q.a.length >= floor * 2, `${lang}: 답이 짧다 — ${q.q}`);
    assert.equal(ui.cellFaq(f).length, 4, `${lang}: 낱장 질문이 넷이 아니다`);
    // 나눗셈의 뜻과 "값을 안 내는 이유" — 전제 둘은 길게 밝혀야 한다
    assert.ok(ui.hyperNote.length >= floor * 6, `${lang}: 과초점 설명이 짧다`);
    assert.ok(ui.cocNote.length >= floor * 6, `${lang}: 착란원 설명이 짧다`);
    assert.ok(ui.ruleNote.length >= floor * 6, `${lang}: 두 축 설명이 짧다`);
  }
});

test('낱장 문장이 실제 숫자를 담는다', async () => {
  const { LANG_CODES } = await import('../lib/i18n/lang.ts');
  const { DOF_UI } = await import('../lib/dof/ui.ts');
  // 자리표만 채우고 값을 안 넣으면 열 언어가 다 같은 문장이 된다
  for (const lang of LANG_CODES) {
    const ui = DOF_UI[lang];
    for (const c of [{ focal: 50, aperture: 8 }, { focal: 85, aperture: 1.8 }]) {
      const f = dofFacts(c);
      assert.ok(ui.desc(f).includes(String(f.hyperfocal)), `${lang}: desc에 과초점거리가 없다`);
      assert.ok(ui.metaTitle(f).includes(String(c.focal)), `${lang}: metaTitle에 초점거리가 없다`);
      assert.ok(ui.metaDesc(f).includes(String(f.hyperfocal)), `${lang}: metaDesc에 과초점거리가 없다`);
    }
    // 칸이 다르면 문장도 달라야 한다
    assert.notEqual(ui.desc(dofFacts({ focal: 50, aperture: 8 })), ui.desc(dofFacts({ focal: 85, aperture: 1.8 })), lang);
  }
});

test('카메라 아이콘은 목록과 카드가 같은 그림을 쓴다', async () => {
  const { ICON_FOR } = await import('../lib/og-icon-map.ts');
  const { DOF_ICON } = await import('../lib/dof/list.ts');
  assert.ok(ICON_FOR[DOF_ICON], `${DOF_ICON} 이모지가 아이콘으로 이어지지 않는다`);
});
