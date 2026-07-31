/**
 * 화면 규격이 스스로 어긋나지 않는지 본다.
 *
 * 이 섹션의 위험은 하나뿐이다 — 108가지 중 하나의 해상도나 인치를 잘못 적는 것.
 * 잘못 적어도 페이지는 멀쩡히 뜨고 숫자도 그럴듯해서 눈으로는 못 잡는다.
 *
 * 그래서 제조사가 공표한 PPI를 데이터에 함께 적어 두고, 해상도와 대각선으로
 * 계산한 값과 대조한다. 셋 중 하나라도 틀리면 여기서 어긋난다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { SCREENS, SCREEN_KINDS, SCREEN_SLUGS, screen, screensOfKind } from '../lib/device/screens.ts';
import { commonRatio, resolutionClass, retinaDistanceIn, screenFacts, screenView, similarScreens } from '../lib/device/facts.ts';
import { DEVICE_UI } from '../lib/device/ui.ts';
import { LANG_CODES } from '../lib/i18n/lang.ts';
import { hanProblem } from './han.ts';

test('100가지가 넘는다', () => {
  assert.ok(SCREENS.length >= 100, `${SCREENS.length}가지뿐이다`);
});

test('slug이 겹치지 않고 주소로 쓸 수 있다', () => {
  assert.equal(new Set(SCREEN_SLUGS).size, SCREENS.length, 'slug 중복');
  for (const s of SCREENS) {
    assert.match(s.slug, /^[a-z0-9-]+$/, `주소에 못 쓰는 slug: ${s.slug}`);
    assert.ok(s.name.trim().length > 0, `이름이 없다: ${s.slug}`);
  }
});

test('계산한 PPI가 제조사 공표값과 맞는다', () => {
  /*
    이 검사가 이 파일의 이유다. 해상도·대각선·공표 PPI 셋은 서로 묶여 있어서
    하나만 틀려도 계산값이 어긋난다. 6ppi까지 봐주는 것은 제조사마다 반올림과
    유효 화면 영역 처리가 조금씩 다르기 때문이다.
  */
  for (const s of SCREENS) {
    const calc = Math.sqrt(s.w ** 2 + s.h ** 2) / s.inch;
    assert.ok(
      Math.abs(calc - s.ppi) <= 6,
      `${s.slug}: 공표 ${s.ppi}ppi인데 ${s.w}×${s.h} / ${s.inch}인치로는 ${calc.toFixed(1)}ppi다`,
    );
  }
});

test('갈래가 모두 채워져 있다', () => {
  for (const k of SCREEN_KINDS) {
    assert.ok(screensOfKind(k).length > 0, `${k} 갈래가 비었다`);
  }
  assert.equal(
    SCREEN_KINDS.reduce((n, k) => n + screensOfKind(k).length, 0),
    SCREENS.length,
    '갈래에 안 들어간 화면이 있다',
  );
});

test('알려진 화면의 값이 맞는다', () => {
  // 널리 알려진 기준점 몇 개 — 계산식을 갈아엎어도 이 값들은 그대로여야 한다
  const iphone = screenFacts(screen('iphone-16-pro')!);
  assert.equal(iphone.ppi, 458);
  assert.equal(iphone.ratioLabel, '19.5:9');
  assert.ok(iphone.portrait);

  const monitor = screenFacts(screen('monitor-27-4k')!);
  assert.equal(monitor.ppi, 163);
  assert.equal(monitor.ratio, '16:9');
  assert.equal(monitor.className, '4K UHD');
  assert.equal(monitor.megapixels, 8.3);

  const tv = screenFacts(screen('tv-65-4k')!);
  assert.equal(tv.ppi, 68);
  // 같은 4K인데 밀도는 27인치 모니터의 절반 아래다 — 이 섹션이 말하려는 것
  assert.ok(tv.ppi < monitor.ppi / 2);
  assert.equal(tv.pixels, monitor.pixels);
});

test('세로로 긴 화면은 짧은 변으로 등급을 부른다', () => {
  // 1206×2622를 긴 변으로 부르면 QHD가 되는데 아무도 그렇게 부르지 않는다
  assert.equal(resolutionClass(1206, 2622), '1.5K');
  assert.equal(resolutionClass(1080, 2340), 'FHD+');
  assert.equal(resolutionClass(1440, 3120), 'QHD+');
  // 4:3 태블릿은 세로로 들어도 긴 변 기준이다
  assert.equal(resolutionClass(2064, 2752), 'QHD');
  assert.equal(resolutionClass(3840, 2160), '4K UHD');
});

test('화면비는 가장 가까운 이름을 고른다', () => {
  // 3440÷1440은 2.389다. 21:9(2.333)와 2.4% 어긋나지만 21:9로 팔린다
  assert.equal(commonRatio(3440 / 1440), '21:9');
  // 허용치를 넓혔다고 20:9가 19.5:9로 흘러가면 안 된다
  assert.equal(commonRatio(2400 / 1080), '20:9');
  assert.equal(commonRatio(2340 / 1080), '19.5:9');
  assert.equal(commonRatio(1920 / 1080), '16:9');
  assert.equal(commonRatio(1080 / 1920), '16:9', '세로 화면도 같은 이름이어야 한다');
  // 1.7은 16:10(1.6)과도 16:9(1.78)와도 4% 넘게 떨어져 있다
  assert.equal(commonRatio(1.7), null, '흔한 비가 아니면 이름을 붙이지 않는다');
  assert.equal(commonRatio(1.61), '16:10', '0.6% 차이는 16:10으로 봐야 한다');
});

test('화면비 값은 늘 1보다 크다', () => {
  // 세로 화면에서 w/h를 그대로 쓰면 0.46이 나와 아무도 못 읽는다
  for (const s of SCREENS) {
    assert.ok(screenFacts(s).ratioValue >= 1, `${s.slug}: ${screenFacts(s).ratioValue}`);
  }
});

test('픽셀이 안 보이는 거리는 밀도에 반비례한다', () => {
  // 1각분 기준 — 밀도가 두 배면 거리는 절반이다
  assert.ok(Math.abs(retinaDistanceIn(300) - 11.46) < 0.01);
  assert.ok(Math.abs(retinaDistanceIn(600) - retinaDistanceIn(300) / 2) < 0.001);
  const phone = screenFacts(screen('iphone-16-pro')!);
  const tv = screenFacts(screen('tv-65-4k')!);
  // 휴대폰은 20cm 안쪽, 65인치 TV는 1m 넘게 떨어져야 격자가 사라진다
  assert.ok(phone.retinaCm < 25 && tv.retinaCm > 100);
});

test('실제 크기는 대각선과 맞아떨어진다', () => {
  for (const s of SCREENS) {
    const f = screenFacts(s);
    const diag = Math.sqrt(f.widthIn ** 2 + f.heightIn ** 2);
    assert.ok(Math.abs(diag - s.inch) < 0.05, `${s.slug}: 가로세로로 잰 대각선 ${diag.toFixed(2)} ≠ ${s.inch}`);
    // 인치는 소수 둘째 자리, mm는 첫째 자리에서 끊는다. 0.005인치가 0.13mm라 그만큼은 벌어진다
    assert.ok(Math.abs(f.widthMm - f.widthIn * 25.4) < 0.2, `${s.slug}: mm 환산이 어긋난다`);
  }
});

test('픽셀 수와 메가픽셀이 맞는다', () => {
  for (const s of SCREENS) {
    const f = screenFacts(s);
    assert.equal(f.pixels, s.w * s.h);
    assert.ok(Math.abs(f.megapixels - f.pixels / 1e6) < 0.05, `${s.slug}: 메가픽셀 어긋남`);
  }
});

test('견줄 화면은 자기 자신을 빼고 같은 갈래를 먼저 준다', () => {
  for (const s of SCREENS) {
    const near = similarScreens(s.slug);
    assert.ok(near.length > 0, `${s.slug}: 견줄 화면이 없다`);
    assert.ok(!near.some(n => n.slug === s.slug), `${s.slug}: 자기 자신이 들어 있다`);
    assert.equal(new Set(near.map(n => n.slug)).size, near.length, `${s.slug}: 중복`);
    // 같은 갈래가 여덟 개 넘게 있으면 목록이 전부 같은 갈래여야 한다
    if (screensOfKind(s.kind).length > 9) {
      assert.ok(near.every(n => n.kind === s.kind), `${s.slug}: 같은 갈래를 먼저 주지 않는다`);
    }
  }
});

test('열 언어가 모두 채워져 있다', () => {
  const v = screenView('iphone-16-pro')!;
  for (const lang of LANG_CODES) {
    const ui = DEVICE_UI[lang];
    for (const [key, val] of Object.entries(ui)) {
      assert.ok(val != null, `${lang}.${key}가 비었다`);
      if (typeof val === 'string') assert.ok(val.trim().length > 0, `${lang}.${key}가 빈 문자열이다`);
      if (typeof val === 'string') assert.equal(hanProblem(lang, val), '');
    }
    assert.equal(ui.how.length, 4, `${lang}: 설명 수가 다르다`);
    assert.equal(ui.hubFaq.length, 5, `${lang}: 허브 FAQ 수가 다르다`);
    assert.equal(ui.screenFaq(v).length, 5, `${lang}: 상세 FAQ 수가 다르다`);
    assert.equal(ui.compareCols.length, 4, `${lang}: 표 머리 수가 다르다`);
    for (const k of SCREEN_KINDS) assert.ok(ui.kindLabel[k], `${lang}: ${k} 이름이 없다`);
  }
});

test('FAQ 답이 그 화면의 숫자를 담고 있다', () => {
  // 틀만 열 벌 두고 값을 끼워 넣는 구조라, 값이 안 끼워진 채 나가면 모든 기기가 같은 글이 된다
  for (const slug of ['iphone-16-pro', 'tv-65-4k', 'macbook-air-13-m3']) {
    const v = screenView(slug)!;
    for (const lang of LANG_CODES) {
      const faq = DEVICE_UI[lang].screenFaq(v);
      const joined = faq.map(f => `${f.q} ${f.a}`).join(' ');
      assert.ok(joined.includes(v.name), `${lang}/${slug}: 이름이 안 들어갔다`);
      assert.ok(joined.includes(String(v.ppi)), `${lang}/${slug}: 밀도가 안 들어갔다`);
      assert.ok(joined.includes(String(v.w)), `${lang}/${slug}: 해상도가 안 들어갔다`);
      for (const item of faq) assert.ok(item.q.trim() && item.a.trim(), `${lang}/${slug}: 빈 FAQ`);
      assert.equal(hanProblem(lang, joined), '');
    }
  }
});

test('힌디어 문구에 라틴 문자가 새지 않는다', () => {
  // 앞선 섹션에서 힌디어 사이에 영어 조각이 남아 있던 적이 있다. 기기 이름은 브랜드라 예외다
  const v = screenView('iphone-16-pro')!;
  const ui = DEVICE_UI.hi;
  const texts = [ui.hubTitle, ui.hubLead, ...ui.how, ...ui.hubFaq.map(f => `${f.q} ${f.a}`)];
  for (const t of texts) {
    const stripped = t
      .replace(/iPhone|Galaxy|iPad|MacBook|Retina|Apple/g, '')
      .replace(/\b(ppi|PPI|K|UHD|MP|mm|cm|in)\b/g, '');
    assert.ok(!/[A-Za-z]{4,}/.test(stripped), `힌디어에 라틴 낱말이 남았다: ${t}`);
  }
  assert.ok(ui.metaDesc(v).includes('iPhone 16 Pro'), '기기 이름은 그대로 두어야 한다');
});

test('프랑스어 관사가 모음 앞에서 줄어든다', () => {
  // "le iPhone"은 틀린 프랑스어다. 108개 중 절반 가까이가 모음으로 시작한다
  const apple = DEVICE_UI.fr.screenFaq(screenView('iphone-16-pro')!);
  const galaxy = DEVICE_UI.fr.screenFaq(screenView('galaxy-s24-ultra')!);
  const appleText = apple.map(f => f.q).join(' ');
  const galaxyText = galaxy.map(f => f.q).join(' ');
  assert.ok(appleText.includes("l'iPhone"), '모음 앞에서 관사가 줄지 않았다');
  assert.ok(!appleText.includes('le iPhone') && !appleText.includes('du iPhone'), '줄지 않은 관사가 남았다');
  assert.ok(galaxyText.includes('le Galaxy') || galaxyText.includes('du Galaxy'), '자음 앞에서는 관사가 그대로여야 한다');
});

test('모든 화면이 라우트 값을 만들 수 있다', () => {
  for (const s of SCREENS) {
    const v = screenView(s.slug);
    assert.ok(v, `${s.slug}: 값을 못 만든다`);
    assert.equal(v!.name, s.name);
    for (const lang of LANG_CODES) {
      const title = DEVICE_UI[lang].metaTitle(v!.name);
      const desc = DEVICE_UI[lang].metaDesc(v!);
      assert.ok(title.includes(s.name), `${lang}/${s.slug}: 제목에 이름이 없다`);
      assert.ok(desc.length > 40, `${lang}/${s.slug}: 설명이 너무 짧다`);
    }
  }
});

test('화면 아이콘은 목록과 카드가 같은 그림을 쓴다', async () => {
  const { ICON_FOR } = await import('../lib/og-icon-map.ts');
  const { SCREEN_ICON } = await import('../lib/device/screens.ts');
  assert.equal(ICON_FOR[SCREEN_ICON], 'screen', '이모지가 화면 아이콘으로 이어지지 않는다');
});
