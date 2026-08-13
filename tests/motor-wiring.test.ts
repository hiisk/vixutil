/**
 * 모터 배선 — 계산이 아니라 이어짐을 본다(계산은 motor-power.test.ts).
 *
 * 접힌 라우트는 등록부에서 한 줄이 빠져도 빌드가 통과하고, 사이트맵은 그 주소를
 * 계속 내걸며, 아홉 언어에서만 조용히 404가 된다. 그래서 껍데기·공유 모듈·문구가
 * 실제로 이어져 있는지를 파일과 데이터로 되짚는다.
 *
 * 열 언어 문구는 튜플이라 칸이 채워졌는지만 tsc가 본다 — 빈 문자열이나 영어 원문이
 * 남아도 컴파일은 통과하므로, 여기서 값을 직접 센다. 소수점 기호까지 함께 본다:
 * es·pt·de·fr는 쉼표를 쓰는데 문장에 점이 남으면 표와 본문이 다른 얼굴이 된다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { koLeafSrc } from './app-path.ts';

import { LANGS, LANG_CODES } from '../lib/i18n/lang.ts';
import { CARD_KEYS } from '../lib/og-cards/keys.ts';
import { CELLS, MOTOR_ICON, MOTOR_SLUGS } from '../lib/motor/list.ts';
import { motorFacts } from '../lib/motor/facts.ts';
import { MOTOR_UI, cellName, fmtNum } from '../lib/motor/ui.ts';
import { ICON_FOR } from '../lib/og-icon-map.ts';
import { DENSE, hanProblem } from './han.ts';

const ROOT = join(import.meta.dirname, '..');
const FOLD_LANGS = ['en', 'es', 'pt-br', 'ja', 'de', 'fr', 'hi', 'zh-hans', 'zh-hant'];

/** 소수점에 쉼표를 쓰는 언어 — lib/motor/ui.ts와 같은 목록이어야 한다 */
const COMMA_LANGS = new Set(['es', 'pt', 'de', 'fr']);

/** 문장 갈래를 두루 밟는 표본 — 가장 작은 것, 널리 쓰는 것, 가장 큰 것, 50Hz 쪽 */
const SHOWN = [
  motorFacts({ kw: 2.2, rpm: 1800 }),
  motorFacts({ kw: 0.1, rpm: 3600 }),
  motorFacts({ kw: 75, rpm: 750 }),
  motorFacts({ kw: 11, rpm: 1500 }),
];

test('모터 아이콘은 목록과 카드가 같은 그림을 쓴다', () => {
  assert.ok(ICON_FOR[MOTOR_ICON], `${MOTOR_ICON} 이모지가 아이콘으로 이어지지 않는다 — 공유 카드에 컬러 이모지가 그대로 나간다`);
});

test('공유 모듈 둘과 낱장 껍데기 아홉이 있고 제 언어로 부른다', () => {
  /*
   * 껍데기는 언어 이름만 다르다. 복사하다 언어를 안 바꾸면 그 언어 낱장 전체가
   * 다른 언어로 그려진다 — 화면은 멀쩡해서 안 드러난다.
   */
  assert.ok(existsSync(join(ROOT, 'lib', 'fold', 'pages', 'motor.tsx')), '허브 공유 모듈이 없다');
  assert.ok(existsSync(join(ROOT, 'lib', 'fold', 'pages', 'motor__slug.tsx')), '낱장 공유 모듈이 없다');

  for (const lang of FOLD_LANGS) {
    const p = join(ROOT, 'app', `(${lang})`, lang, 'motor', '[slug]', 'page.tsx');
    assert.ok(existsSync(p), `${lang}에 낱장 껍데기가 없다`);
    const src = readFileSync(p, 'utf8');
    assert.ok(src.includes(`build('${lang}')`), `${lang} 껍데기가 제 언어로 안 부른다`);
    /* 2026-08-13: force-dynamic → ISR. 둘이 함께 있어야 캐시가 걸린다 —
       revalidate만 있으면 라우트가 동적으로 잡혀 아무 효과가 없다(실측 확인).
       까닭은 tests/prerender-budget.test.ts 머리말. */
    assert.ok(/export const revalidate = false/.test(src), `${lang} 낱장이 revalidate = false가 아니다 — 없으면 캐시가 안 걸리고, 주기를 주면 ISR 쓰기가 되살아난다`);
    assert.ok(src.includes('generateStaticParams'), `${lang} 낱장이 generateStaticParams를 안 내보낸다 — revalidate만으로는 안 걸린다`);
  }
  // 한국어 허브는 접지 않는다 — 파일이 직접 있다
  assert.ok(existsSync(join(ROOT, 'app', '(ko)', 'motor', 'page.tsx')), '한국어 허브가 없다');
  /*
   * 한국어 낱장은 lib/ko/pages 모듈이다(라우팅 표 2,048 한도). force-dynamic은
   * 모듈이 아니라 디스패처 라우트가 선언하므로 여기서 보지 않는다 —
   * generateStaticParams는 디스패처가 모아 쓰는 손잡이라 여기서 본다.
   */
  const ko = koLeafSrc('motor');
  assert.ok(ko.includes('generateStaticParams'), '한국어 낱장에 generateStaticParams가 없다');
  assert.ok(ko.includes('MOTOR_SLUGS') || ko.includes('motorParams'), '한국어 낱장이 모터 목록을 안 돌린다');
});

test('사이트맵에 실릴 장수가 데이터와 맞는다', () => {
  // 허브 1 + 낱장 136이 열 언어씩 — 낱장 수가 틀리면 목록 쪽이 깨진 것이다
  assert.equal(MOTOR_SLUGS.length, 136);
  assert.equal(new Set(MOTOR_SLUGS).size, 136, 'slug가 겹친다');
  assert.equal(LANGS.length, 10);
  assert.equal((1 + MOTOR_SLUGS.length) * LANGS.length, 1370);
});

test('화면이 /torque와 /ampere로 잇는다', () => {
  /*
   * 이름이 겹치는 두 섹션이다 — /torque는 나사를 조이는 토크, /ampere는 단상 가전
   * 전류다. 헷갈릴 만한 자리라 허브와 낱장 양쪽에서 길을 내 둔다. 링크를 지우면
   * 이 표만 보고 조임 토크를 찾던 사람이 막힌다.
   */
  for (const name of ['MotorHubPage', 'MotorPage']) {
    const src = readFileSync(join(ROOT, 'components', 'motor', `${name}.tsx`), 'utf8');
    assert.ok(src.includes('${prefix}/torque'), `${name}이 /torque로 안 잇는다`);
    assert.ok(src.includes('${prefix}/ampere'), `${name}이 /ampere로 안 잇는다`);
    assert.ok(src.includes('ui.torqueLink'), `${name}이 조임 토크 문구를 안 쓴다`);
    assert.ok(src.includes('ui.ampereLink'), `${name}이 가전 전류 문구를 안 쓴다`);
  }
});

test('열 언어 모두 문구가 채워져 있다', () => {
  const f = SHOWN[0];
  for (const lang of LANG_CODES) {
    const ui = MOTOR_UI[lang];
    const floor = DENSE.has(lang) ? 6 : 12;
    for (const [key, v] of Object.entries(ui)) {
      if (typeof v !== 'string') continue;
      assert.ok(v.trim().length > 0, `${lang}.${key}: 비어 있다`);
    }
    assert.ok(ui.hubLead.length >= (DENSE.has(lang) ? 20 : 35), `${lang}: hubLead가 짧다`);
    assert.equal(ui.how.length, 4, `${lang}: 알아 둘 것이 네 줄이 아니다`);
    assert.equal(ui.hubFaq.length, 3, `${lang}: 질문이 셋이 아니다`);
    for (const h of ui.how) assert.ok(h.length >= floor, `${lang}: 너무 짧다 — ${h}`);
    for (const q of ui.hubFaq) assert.ok(q.q.length >= floor && q.a.length >= floor * 2, `${lang}: 답이 짧다 — ${q.q}`);
    assert.equal(ui.cellFaq(f).length, 3, `${lang}: 낱장 질문이 셋이 아니다`);
    // 셈의 전제 다섯 — 식·주파수·마력·감속기·전류는 길게 밝혀야 한다
    assert.ok(ui.formulaNote.length >= floor * 6, `${lang}: 식 설명이 짧다`);
    assert.ok(ui.hzNote.length >= floor * 6, `${lang}: 주파수 설명이 짧다`);
    assert.ok(ui.hpNote.length >= floor * 6, `${lang}: 마력 설명이 짧다`);
    assert.ok(ui.gearNote.length >= floor * 6, `${lang}: 감속기 설명이 짧다`);
    assert.ok(ui.currentNote.length >= floor * 6, `${lang}: 전류 설명이 짧다`);
    // 대표값이라는 말을 빼면 전압·역률·효율이 규격처럼 읽힌다
    assert.ok(ui.currentNote.includes('√3'), `${lang}: 전류 설명에 √3이 없다`);
  }
});

/** 그 언어 화면에 나가는 문장 전부 */
const stringsOf = (lang: (typeof LANG_CODES)[number]): string[] => {
  const ui = MOTOR_UI[lang];
  return [
    ...Object.values(ui).filter((v): v is string => typeof v === 'string'),
    ...ui.how,
    ...ui.hubFaq.flatMap(q => [q.q, q.a]),
    ...SHOWN.flatMap(f => [ui.desc(f), ui.metaTitle(f), ui.metaDesc(f),
      ...ui.cellFaq(f).flatMap(q => [q.q, q.a])]),
  ];
};

test('언어끼리 글자가 섞이지 않는다', () => {
  const HAN_OK = new Set(['ja', 'zh', 'tw']);
  for (const lang of LANG_CODES) {
    for (const s of stringsOf(lang)) {
      if (lang !== 'ko') assert.ok(!/[가-힣]/.test(s), `${lang}: 한글이 섞였다 — ${s}`);
      if (lang !== 'ja') assert.ok(!/[ぁ-んァ-ヶ]/.test(s), `${lang}: 가나가 섞였다 — ${s}`);
      if (!HAN_OK.has(lang)) assert.ok(!/[一-龯]/.test(s), `${lang}: 한자가 섞였다 — ${s}`);
      if (lang !== 'hi') assert.ok(!/[ऀ-ॿ]/.test(s), `${lang}: 데바나가리가 섞였다 — ${s}`);
      const han = hanProblem(lang, s);
      assert.equal(han, '', `${lang}: ${han} — ${s}`);
    }
  }
});

test('화면 문구에 이모지가 없다', () => {
  /*
   * 섹션 아이콘은 ToolIcon이 SVG로 바꿔 그리지만 본문의 이모지는 그대로 나간다 —
   * 글꼴에 없는 자리에서 두부가 되고, 공유 카드에서도 정형되지 않는다.
   */
  const EMOJI = /[\u{1F300}-\u{1FAFF}\u{1F000}-\u{1F2FF}\u{2600}-\u{27BF}\u{FE0F}]/u;
  for (const lang of LANG_CODES) {
    for (const s of stringsOf(lang)) {
      assert.ok(!EMOJI.test(s), `${lang}: 문구에 이모지가 들어 있다 — ${s}`);
    }
  }
});

test('소수점 기호가 언어를 따른다', () => {
  /*
   * 11.7과 11,7은 같은 값이지만 한 화면에 둘이 섞이면 다른 값처럼 읽힌다.
   * 표는 fmtNum이 찍고 본문은 ui.ts가 찍으므로, 두 곳이 같은 규칙인지 본다.
   */
  assert.equal(fmtNum('de', 11.7), '11,7');
  assert.equal(fmtNum('fr', 2.2), '2,2');
  assert.equal(fmtNum('en', 11.7), '11.7');
  assert.equal(fmtNum('ko', 0.75), '0.75');
  assert.equal(fmtNum('hi', 0.265), '0.265');
  // 칸 이름도 같은 규칙을 지나야 한다 — 출력에 소수점이 들어가는 섹션이다
  assert.equal(cellName('es', { kw: 2.2, rpm: 1800 }), '2,2kW 1800rpm');
  assert.equal(cellName('ja', { kw: 2.2, rpm: 1800 }), '2.2kW 1800rpm');

  for (const lang of LANG_CODES) {
    for (const s of stringsOf(lang)) {
      if (COMMA_LANGS.has(lang)) {
        assert.ok(!/\d\.\d/.test(s), `${lang}: 소수점이 점으로 남았다 — ${s}`);
      } else {
        assert.ok(!/\d,\d/.test(s), `${lang}: 숫자에 쉼표가 끼었다 — ${s}`);
      }
    }
  }
});

test('낱장 문장이 실제 숫자를 담는다', () => {
  // 자리표만 채우고 값을 안 넣으면 열 언어가 다 같은 문장이 된다
  for (const lang of LANG_CODES) {
    const ui = MOTOR_UI[lang];
    const n = (x: number) => fmtNum(lang, x);
    for (const f of SHOWN) {
      assert.ok(ui.desc(f).includes(n(f.torque)), `${lang}: desc에 토크가 없다`);
      assert.ok(ui.desc(f).includes(n(f.omega)), `${lang}: desc에 각속도가 없다`);
      assert.ok(ui.desc(f).includes(n(f.ps)), `${lang}: desc에 미터법 마력이 없다`);
      assert.ok(ui.desc(f).includes(n(f.hp)), `${lang}: desc에 영국 마력이 없다`);
      assert.ok(ui.metaTitle(f).includes(n(f.torque)), `${lang}: metaTitle에 토크가 없다`);
      assert.ok(ui.metaTitle(f).includes(n(f.cell.kw)), `${lang}: metaTitle에 출력이 없다`);
      assert.ok(ui.metaTitle(f).includes(String(f.cell.rpm)), `${lang}: metaTitle에 회전수가 없다`);
      assert.ok(ui.metaDesc(f).includes(String(f.speed.hz)), `${lang}: metaDesc에 주파수가 없다`);
      assert.ok(ui.metaDesc(f).includes(String(f.fullRpm)), `${lang}: metaDesc에 전부하 회전수가 없다`);
      assert.ok(ui.metaDesc(f).includes(n(f.pair.torque)), `${lang}: metaDesc에 다른 주파수의 토크가 없다`);
      // 감속기와 전류는 낱장 질문이 짚어 준다
      assert.ok(ui.cellFaq(f)[1].a.includes(n(f.gears[2].torque)), `${lang}: 낱장 질문에 감속 토크가 없다`);
      assert.ok(ui.cellFaq(f)[2].a.includes(n(f.currents[0].amp)), `${lang}: 낱장 질문에 전류가 없다`);
    }
    assert.notEqual(ui.desc(SHOWN[0]), ui.desc(SHOWN[1]), lang);
    // 50Hz 칸과 60Hz 칸이 같은 문장이 되면 짝을 안 읽고 있는 것이다
    assert.notEqual(ui.metaDesc(SHOWN[0]), ui.metaDesc(SHOWN[3]), lang);
  }
});

test('열 언어 제목이 언어를 통틀어 유일하다', () => {
  /*
   * 같은 제목이 두 장에 붙으면 검색 결과에서 어느 쪽인지 가릴 수 없다. 언어를
   * 가로질러 세는 것은, 번역을 옮겨 적다 원문이 그대로 남는 실수를 잡기 위해서다.
   */
  const titles: string[] = [];
  for (const lang of LANG_CODES) {
    const ui = MOTOR_UI[lang];
    titles.push(ui.hubTitle, ui.hubMetaTitle);
    for (const c of CELLS) titles.push(ui.metaTitle(motorFacts(c)));
  }
  const seen = new Map<string, number>();
  for (const t of titles) seen.set(t, (seen.get(t) ?? 0) + 1);
  const dup = [...seen].filter(([, n]) => n > 1).map(([t]) => t);
  assert.deepEqual(dup, [], `제목이 겹친다: ${dup.slice(0, 3).join(' / ')}`);
  assert.equal(titles.length, (CELLS.length + 2) * 10);
});

/*
 * ── 배선을 되짚는다 (2026-08-12에 배선을 넣고 주석을 벗겼다) ──────────
 * 등록부에서 한 줄이 빠지면 아홉 언어에서 조용히 404가 되고, 사이트맵은 그 주소를
 * 계속 내걸며, 빌드도 tsc도 통과한다. 그래서 파일 원문으로 되짚는다.
 */
test('등록부·사이트맵·검색 색인·카드가 모터를 건다', () => {
  const reg = readFileSync(join(ROOT, 'lib', 'fold', 'registry.ts'), 'utf8');
  assert.ok(reg.includes(`'motor': () => import('./pages/motor')`), 'STATIC_ROUTES에 motor가 없다');
  assert.ok(reg.includes(`'motor': () => import('./pages/motor__slug')`), 'SLUG_ROUTES에 motor가 없다');
  const ko = readFileSync(join(ROOT, 'lib', 'ko', 'registry.ts'), 'utf8');
  assert.ok(ko.includes(`'motor': () => import('./pages/motor__slug')`), 'KO_LEAVES에 motor가 없다');
  const map = readFileSync(join(ROOT, 'app', 'sitemap.ts'), 'utf8');
  assert.ok(map.includes(`from "@/lib/motor/list"`), '사이트맵이 모터 목록을 안 불러온다');
  assert.match(map, /\/motor`, changeFrequency: weekly, priority: 0\.85/, '허브 줄이 없다');
  assert.match(map, /MOTOR_CELLS\.map/, '낱장 줄이 없다 — 136칸이 사이트맵에서 빠진다');
  const idx = readFileSync(join(ROOT, 'lib', 'search-index.ts'), 'utf8');
  assert.ok(idx.includes(`section: 'motor' as const`), '검색 색인에 낱장 항목이 없다');
  assert.ok(idx.includes(`{ href: '/motor',`), '검색 색인에 허브 항목이 없다');
  assert.ok(/motor:\s*\{ label:/.test(idx), 'SECTION_META에 이름표가 없다');
  const home = readFileSync(join(ROOT, 'lib', 'locale-home.ts'), 'utf8');
  assert.ok(home.includes(`route: '/motor'`), '아홉 언어 홈에 카드가 없다');
  const koHome = readFileSync(join(ROOT, 'app', '(ko)', 'page.tsx'), 'utf8');
  assert.ok(koHome.includes(`href: '/motor'`), '한국어 홈에 카드가 없다');
  for (const lang of LANG_CODES) {
    assert.ok(CARD_KEYS[lang].includes('motor'), `${lang} 카드 열쇠에 motor가 없다`);
    const src = readFileSync(join(ROOT, 'lib', 'og-cards', `${lang}.tsx`), 'utf8');
    assert.ok(src.includes(`'motor': () => motorHub('${lang}')`), `${lang}.tsx에 카드 본체가 없다`);
  }
});
