import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  CONVERT_TOOLS, CONVERT_MAP, CONVERT_CATEGORIES, convert, convertBack, format,
  findConvertTool, relatedConvertTools,
} from '../lib/convert-tools.ts';
import { convertFaq } from '../lib/convert-faq.ts';
import { CONVERT_EN, CONVERT_CATEGORY, CONVERT_L10N } from '../lib/convert-i18n.ts';
import { convertAlternates, CONVERT_HUB_FAQ } from '../lib/convert-ui-intl.ts';
import { ALL_LOCALES10, INTL_LOCALES, localeHref, localeTag } from '../lib/locales.ts';
import { SECTION_FAQ } from '../lib/section-faq.ts';
import { appJoin } from './app-path.ts';
import { hasOwnCard } from '../lib/og-cards/index.ts';

const ROOT = join(import.meta.dirname, '..');

/**
 * 쉰 개를 엔진 하나가 그린다. 그래서 화면이 아니라 데이터가 틀릴 위험이 크다 —
 * 계수 하나가 어긋나도 화면은 멀쩡해 보이고, 그 단위를 실제로 쓰는 사람만 안다.
 */

test('쉰 개 이상을 담는다', () => {
  assert.ok(CONVERT_TOOLS.length >= 50, `${CONVERT_TOOLS.length}개뿐`);
  assert.ok(new Set(CONVERT_TOOLS.map(t => t.category)).size >= 8, '분류가 너무 적다');
});

test('slug와 제목이 중복되지 않는다', () => {
  for (const key of ['slug', 'title', 'metaTitle', 'long'] as const) {
    const vals = CONVERT_TOOLS.map(t => t[key]);
    const dup = [...new Set(vals.filter((v, i) => vals.indexOf(v) !== i))];
    assert.deepEqual(dup, [], `${key}가 겹친다: ${dup.join(' / ')}`);
  }
});

test('모든 도구에 필요한 값이 있다', () => {
  for (const t of CONVERT_TOOLS) {
    assert.ok(t.from.trim() && t.to.trim(), `${t.slug}: 단위 이름 누락`);
    assert.ok(Number.isFinite(t.factor) && t.factor !== 0, `${t.slug}: 계수가 이상하다`);
    assert.ok(t.digits >= 0 && t.digits <= 6, `${t.slug}: 자릿수가 이상하다`);
    assert.ok(t.quick.length >= 4, `${t.slug}: 자주 찾는 값이 부족하다`);
    assert.ok(t.long.length >= 40, `${t.slug}: 설명이 짧다`);
    assert.ok(t.note.length >= 30, `${t.slug}: 주의사항이 짧다`);
    assert.ok(CONVERT_CATEGORIES.includes(t.category), `${t.slug}: 허브에 없는 분류 ${t.category}`);
  }
});

test('변환과 역변환이 서로 맞는다', () => {
  for (const t of CONVERT_TOOLS) {
    for (const v of [0, 1, 7.5, 100]) {
      const back = convertBack(convert(v, t), t);
      assert.ok(Math.abs(back - v) < 1e-6, `${t.slug}: ${v} → ${convert(v, t)} → ${back}`);
    }
  }
});

test('알려진 값과 일치한다', () => {
  const at = (slug: string, v: number) => convert(v, CONVERT_MAP[slug]);
  // 정의값 — 어긋나면 계수가 잘못된 것이다
  assert.ok(Math.abs(at('cm-inch', 2.54) - 1) < 1e-6, '2.54cm는 1인치');
  assert.ok(Math.abs(at('m-feet', 0.3048) - 1) < 1e-6, '0.3048m는 1피트');
  assert.ok(Math.abs(at('km-mile', 1.609344) - 1) < 1e-6, '1.609344km는 1마일');
  assert.equal(at('celsius-fahrenheit', 100), 212, '물 끓는점');
  assert.equal(at('celsius-fahrenheit', 0), 32, '물 어는점');
  assert.equal(at('celsius-kelvin', -273.15), 0, '절대영도');
  assert.equal(at('geun-g', 1), 600, '고기 한 근');
  assert.equal(at('don-g', 1), 3.75, '금 한 돈');
  assert.equal(at('byte-bit', 1), 8, '1바이트는 8비트');
  assert.equal(at('mbps-mbs', 100), 12.5, '100Mbps는 12.5MB/s');
  assert.equal(at('cubicm-l', 1), 1000, '1㎥는 1000L');
  assert.ok(Math.abs(at('pyeong-m2', 1) - 3.305785) < 1e-5, '1평');
});

test('정수 결과의 0을 지우지 않는다', () => {
  // 꼬리 0을 무조건 지우면 600g이 6g이 된다 — 실제로 그렇게 만들었다가 잡은 버그다
  assert.equal(format(600, 0), '600');
  assert.equal(format(1000, 1), '1000');
  assert.equal(format(1.5, 2), '1.5');
  assert.equal(format(1.0, 2), '1');
  assert.equal(format(0, 2), '0');
});

test('FAQ가 실제 계산값을 담는다', () => {
  for (const t of CONVERT_TOOLS) {
    const faq = convertFaq(t);
    assert.equal(faq.length, 3, `${t.slug}: FAQ 개수`);
    for (const item of faq) {
      assert.ok(item.q.trim().length > 0, `${t.slug}: 빈 질문`);
      assert.ok(item.a.trim().length >= 20, `${t.slug}: 답변이 짧다 — ${item.q}`);
    }
    // 첫 문항의 답에는 1단위 변환값이 들어가야 한다
    assert.ok(faq[0].a.includes(format(convert(1, t), Math.max(t.digits, 2))), `${t.slug}: 계산값이 답에 없다`);
  }
});

test('허브와 상세 라우트가 있다', () => {
  assert.ok(existsSync(appJoin('convert', 'page.tsx')));
  assert.ok(existsSync(appJoin('convert', '[slug]', 'page.tsx')));
  assert.ok((SECTION_FAQ.convert ?? []).length >= 3, '허브 FAQ가 부족하다');
});

test('허브가 모든 분류를 그린다', () => {
  // 세 언어가 공용 허브 컴포넌트를 쓰므로 그쪽을 본다
  const hub = readFileSync(join(ROOT, 'components', 'ConvertHub.tsx'), 'utf8');
  assert.ok(hub.includes('CONVERT_CATEGORIES'), '허브가 분류 목록을 쓰지 않는다');
  const orphan = CONVERT_TOOLS.filter(t => !CONVERT_CATEGORIES.includes(t.category));
  assert.deepEqual(orphan, [], '허브에 안 그려지는 도구가 있다');
});

test('검색 인덱스·사이트맵·푸터가 이 섹션을 싣는다', () => {
  const index = readFileSync(join(ROOT, 'lib', 'search-index.ts'), 'utf8');
  assert.ok(index.includes('CONVERT_TOOLS'), '검색 인덱스 누락');
  assert.ok(index.includes('convert:'), 'SECTION_META 누락');

  const sitemap = readFileSync(appJoin('sitemap.ts'), 'utf8');
  assert.ok(sitemap.includes('CONVERT_TOOLS'), '사이트맵 누락');

  const footer = readFileSync(join(ROOT, 'components', 'SiteFooter.tsx'), 'utf8');
  assert.ok(footer.includes('"/convert"'), '푸터 누락');
});

test('관련 도구가 자기 자신을 넣지 않는다', () => {
  for (const t of CONVERT_TOOLS) {
    const related = relatedConvertTools(t.slug);
    assert.ok(related.length > 0, `${t.slug}: 추천이 비어 있다`);
    assert.ok(!related.some(r => r.slug === t.slug), `${t.slug}: 자기 자신 추천`);
  }
  assert.equal(findConvertTool('없는변환'), undefined);
  assert.deepEqual(relatedConvertTools('없는변환'), []);
});

test('번역 문구가 백 개 × 일곱 언어 모두 있다', () => {
  /*
    빠진 항목은 화면을 깨뜨리지 않는다 — convertL10n()이 조용히 한국어로 되돌리므로
    스페인어 페이지에 한글 한 줄이 섞인 채 배포된다. 그러니 여기서 세어 둔다.

    일본어는 같은 내용을 절반 이하의 글자로 담는다. 길이 기준을 로마자에 맞추면
    멀쩡한 문장이 스물한 개나 걸린다(실제로 걸렸다).
  */
  for (const lang of INTL_LOCALES) {
    const map = CONVERT_L10N[lang];
    const missing = CONVERT_TOOLS.filter(t => !map[t.slug]).map(t => t.slug);
    assert.deepEqual(missing, [], `${lang} 문구 누락: ${missing.join(', ')}`);

    const extra = Object.keys(map).filter(k => !CONVERT_MAP[k]);
    assert.deepEqual(extra, [], `${lang}에 없는 slug가 있다: ${extra.join(', ')}`);

    const dense = lang === 'ja';
    const minLong = dense ? 22 : 40, minNote = dense ? 16 : 20;
    for (const t of CONVERT_TOOLS) {
      const l = map[t.slug];
      assert.ok(l.title.trim() && l.desc.trim(), `${t.slug}: ${lang} 제목·설명 누락`);
      assert.ok(l.long.length >= minLong, `${t.slug}: ${lang} 설명이 짧다`);
      assert.ok(l.note.length >= minNote, `${t.slug}: ${lang} 주의사항이 짧다`);
    }
  }
});

test('언어별 제목이 서로 겹치지 않는다', () => {
  // 겹치면 검색엔진이 중복 페이지로 본다
  for (const lang of INTL_LOCALES) {
    const titles = CONVERT_TOOLS.map(t => CONVERT_L10N[lang][t.slug].title);
    const dup = [...new Set(titles.filter((v, i) => titles.indexOf(v) !== i))];
    assert.deepEqual(dup, [], `${lang} 제목이 겹친다: ${dup.join(' / ')}`);
  }
});

test('분류 이름이 열 언어로 번역돼 있다', () => {
  // 열쇠가 한 글자만 달라도 그 묶음이 허브에서 조용히 사라진다
  for (const lang of ALL_LOCALES10) {
    for (const c of CONVERT_CATEGORIES) {
      assert.ok(CONVERT_CATEGORY[lang][c], `${lang} 분류 누락: ${c}`);
    }
  }
});

test('허브 FAQ가 일곱 언어에 다 있다', () => {
  for (const lang of INTL_LOCALES) {
    const faq = CONVERT_HUB_FAQ[lang];
    assert.ok(faq.length >= 3, `${lang} 허브 FAQ가 ${faq.length}문항뿐`);
    for (const { q, a } of faq) {
      assert.ok(q.trim().length >= 8 && a.trim().length >= 30, `${lang} FAQ 문장이 짧다: ${q}`);
      assert.ok(!/[가-힣]/.test(q + a), `${lang} 허브 FAQ에 한글이 섞였다: ${q}`);
    }
  }
});

test('열 언어 라우트가 다 있다', () => {
  for (const lang of ALL_LOCALES10) {
    const base = appJoin(...localeHref(lang, '/convert').split('/').filter(Boolean));
    assert.ok(existsSync(join(base, 'page.tsx')), `${lang} 허브 없음`);
    // 카드는 이제 파일이 아니라 lib/og-cards의 대응표에 있다
    assert.ok(hasOwnCard(localeHref(lang, '/convert')), `${lang} 허브 공유 카드 없음`);
    assert.ok(existsSync(join(base, '[slug]', 'page.tsx')), `${lang} 상세 없음`);
  }
});

test('hreflang이 열 언어를 모두 가리킨다', () => {
  // 한 언어라도 빠지면 그 언어 페이지가 중복으로 취급된다.
  // 중국어 둘을 더한 뒤에도 여덟 언어짜리를 부르고 있어서, 중국어 페이지는
  // 있는데 아무도 선언하지 않는 상태가 오래 갔다.
  const alt = convertAlternates('cm-inch');
  for (const lang of ALL_LOCALES10) {
    assert.equal(alt[localeTag(lang)], localeHref(lang, '/convert/cm-inch'), `${lang} 대안 주소가 틀렸다`);
  }
  assert.equal(alt['x-default'], '/en/convert/cm-inch');
  // 경로는 소문자, 선언은 BCP 47 — 브라질만 둘이 다르다
  assert.equal(alt['pt-BR'], '/pt-br/convert/cm-inch');

  const hub = convertAlternates();
  assert.equal(hub.ko, '/convert');
  assert.equal(Object.keys(hub).length, ALL_LOCALES10.length + 1);
});

test('FAQ가 언어마다 그 언어로 나온다', () => {
  const tool = CONVERT_MAP['cm-inch'];
  const one = format(convert(1, tool), Math.max(tool.digits, 2));

  assert.ok(/[가-힣]/.test(convertFaq(tool, 'ko')[0].q), '한국어 FAQ에 한글이 없다');

  for (const lang of INTL_LOCALES) {
    const faq = convertFaq(tool, lang);
    assert.equal(faq.length, 3, `${lang} FAQ 문항 수가 다르다`);
    for (const [i, item] of faq.entries()) {
      assert.ok(!/[가-힣]/.test(item.q + item.a), `${lang} FAQ ${i + 1}번에 한글이 섞였다`);
    }
    // 어느 언어에서도 답에 실제 계산값이 들어가야 한다
    assert.ok(faq[0].a.includes(one), `${lang}: 계산값이 답에 없다`);
  }
});

test('사이트맵에 열 언어가 다 실린다', () => {
  /*
    번역 아홉 언어는 INTL_LOCALES10을 돌려 만든다. 주소를 한 줄씩 적어 두면 언어를
    늘릴 때 사이트맵만 조용히 빠지고, 색인에서 그 언어가 통째로 사라진다 —
    실제로 중국어가 그렇게 빠져 convert 100쪽이 사이트맵에 0건이었다.
  */
  const sitemap = readFileSync(appJoin('sitemap.ts'), 'utf8');
  assert.ok(sitemap.includes('/convert`') || sitemap.includes('/convert/'), '사이트맵에 한국어 /convert 없음');
  assert.match(sitemap, /INTL_LOCALES10\.flatMap[\s\S]{0,200}\/convert/, '번역 언어를 목록에서 만들지 않는다');
});

test('한글 단위 기호는 번역 일곱 언어에서 바뀐다', () => {
  /*
    '리'·'자'·'돈' 같은 기호를 그대로 두면 영어 페이지 입력칸에 읽을 수 없는
    글자가 박힌다. 한자권에서는 같은 한자라도 값이 달라(근 600g ↔ 斤 500g)
    둘을 함께 적어야 오해가 없다.
  */
  const hangul = /[가-힣]/;
  const bad: string[] = [];
  for (const t of CONVERT_TOOLS) {
    if (!hangul.test(t.from) && !hangul.test(t.to)) continue;
    for (const lang of INTL_LOCALES) {
      const l = CONVERT_L10N[lang][t.slug];
      if (hangul.test(l.from ?? t.from) || hangul.test(l.to ?? t.to)) bad.push(`${t.slug}(${lang})`);
    }
  }
  assert.deepEqual(bad, [], `기호를 안 바꾼 곳: ${bad.join(', ')}`);
});
