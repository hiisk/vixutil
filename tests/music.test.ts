/**
 * 음악 이론 데이터 검사.
 *
 * 이 섹션이 틀리는 방식은 눈에 안 보인다. 구성음이 한 음 어긋나거나 조표를
 * 잘못 골라 A♯로 적어도 화면은 멀쩡하고, 음악을 아는 사람만 알아챈다. 그래서
 * 아는 답을 박아 두고 잰다 — C 메이저는 C·E·G, D 단음계의 여섯 번째 음은 B♭.
 *
 * 열 언어도 같은 방식으로 본다. 한 언어만 빠지거나 어순이 한 틀로 찍히면
 * 그 나라 사람이 자기 말로 검색하는 이름과 어긋난다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

import { LANGS as LANG_INFO, LANG_CODES, alternates, type Lang } from '../lib/i18n/lang.ts';
import {
  KIND_WORD, MUSIC_ITEMS, accidentalOf, colorOf, feelOf, iconOf, itemsOfKind,
  musicItem, noteListOf, notesOf, relatedItems, stepsOf, symbolOf, titleOf,
} from '../lib/music/catalog.ts';
import { CHORD_QUALITIES, INTERVALS, SCALE_MODES } from '../lib/music/theory.ts';
import { SOLFEGE, freq, isBlack, keySignature, noteName, noteSymbol, slugOf } from '../lib/music/notes.ts';
import { frequencies, itemFacts } from '../lib/music/facts.ts';
import { MUSIC_UI, musicAlternates } from '../lib/music/ui.ts';
import { appFile } from './app-path.ts';
import { hasOwnCard } from '../lib/og-cards/index.ts';

const LANGS = LANG_CODES;
const HANGUL = /[가-힣]/;
const dense = (lang: Lang) => lang === 'ja';

test('항목이 100개를 넘고 slug가 겹치지 않는다', () => {
  assert.ok(MUSIC_ITEMS.length >= 100, `${MUSIC_ITEMS.length}개뿐`);
  assert.equal(new Set(MUSIC_ITEMS.map(i => i.slug)).size, MUSIC_ITEMS.length, 'slug 중복');
  // 성질을 더하면 12장이 함께 생긴다 — 수를 박아 두면 늘릴 때마다 여기부터 고쳐야 한다
  assert.equal(itemsOfKind('chord').length, 12 * CHORD_QUALITIES.length, '코드가 12 × 성질 수가 아니다');
  assert.ok(itemsOfKind('scale').length >= 24, '음계가 모자라다');
  assert.equal(itemsOfKind('interval').length, 12);
});

test('slug는 URL에 쓸 수 있는 소문자·하이픈만 쓴다', () => {
  for (const i of MUSIC_ITEMS) assert.match(i.slug, /^[a-z0-9-]+$/, i.slug);
});

test('아는 코드의 구성음이 실제로 맞는다', () => {
  const notes = (slug: string) => {
    const it = musicItem(slug);
    assert.ok(it, `${slug} 없음`);
    return noteListOf(it, 'en').join(' ');
  };
  assert.equal(notes('c-major-chord'), 'C E G');
  assert.equal(notes('a-minor-chord'), 'A C E');
  assert.equal(notes('g-dom7-chord'), 'G B D F');
  assert.equal(notes('c-maj7-chord'), 'C E G B');
  assert.equal(notes('d-min7-chord'), 'D F A C');
  assert.equal(notes('b-dim-chord'), 'B D F');
  assert.equal(notes('c-aug-chord'), 'C E G#');
  assert.equal(notes('d-sus4-chord'), 'D G A');
  // 반음이 섞인 조도 조표를 따라 적는다
  assert.equal(notes('f-sharp-major-chord'), 'F# A# C#');
  assert.equal(notes('e-flat-major-chord'), 'Eb G Bb');
  assert.equal(notes('c-sharp-minor-chord'), 'C# E G#');
});

test('음계도 아는 답과 맞고 단조는 나란한조의 조표를 쓴다', () => {
  const notes = (slug: string) => {
    const it = musicItem(slug);
    assert.ok(it, `${slug} 없음`);
    return noteListOf(it, 'en').join(' ');
  };
  assert.equal(notes('c-major-scale'), 'C D E F G A B');
  assert.equal(notes('g-major-scale'), 'G A B C D E F#');
  assert.equal(notes('e-flat-major-scale'), 'Eb F G Ab Bb C D');
  assert.equal(notes('a-minor-scale'), 'A B C D E F G');
  // 밑음의 장조로 계산하면 A#이 나오는 자리 — 악보는 Bb으로 적는다
  assert.equal(notes('d-minor-scale'), 'D E F G A Bb C');
  assert.equal(notes('e-minor-scale'), 'E F# G A B C D');
  assert.equal(notes('c-dorian-scale'), 'C D Eb F G A Bb');
  assert.equal(notes('c-mixolydian-scale'), 'C D E F G A Bb');
  assert.equal(notes('c-pentatonic-scale'), 'C D E G A');
});

test('음정은 반음 수만큼 떨어져 있다', () => {
  for (const iv of INTERVALS) {
    const it = musicItem(iv.slug);
    assert.ok(it, `${iv.slug} 없음`);
    const [lo, hi] = stepsOf(it);
    assert.equal(lo, 0);
    assert.equal(hi, iv.semitones, `${iv.slug}: ${hi}반음`);
  }
  const fifth = musicItem('perfect-fifth');
  assert.ok(fifth);
  assert.equal(noteListOf(fifth, 'en').join(' '), 'C G');
});

test('URL의 밑음과 화면에 적히는 밑음이 같다', () => {
  // a-sharp-dim으로 들어와 화면에 Bb라 적히면 검색 결과와 페이지가 어긋난다
  for (const item of MUSIC_ITEMS) {
    if (item.kind === 'interval') continue;
    const shown = slugOf(noteSymbol(item.root, accidentalOf(item)));
    assert.ok(item.slug.startsWith(`${shown}-`), `${item.slug}: 화면은 ${shown}`);
  }
});

test('구성음에 같은 음이 두 번 들어가지 않는다', () => {
  for (const item of MUSIC_ITEMS) {
    const ns = notesOf(item);
    // 옥타브만 예외다 — 같은 음이름이 한 옥타브 위에 다시 나오는 것이 그 음정의 내용이다
    if (item.slug !== 'octave') {
      assert.equal(new Set(ns).size, ns.length, `${item.slug}: 같은 음이 두 번 — ${ns.join(',')}`);
    }
    assert.ok(ns.length >= 2, `${item.slug}: 음이 ${ns.length}개`);
    for (const n of ns) assert.ok(n >= 0 && n < 12, `${item.slug}: 피치 클래스 ${n}`);
  }
});

test('색은 여섯 자리 hex이고 아이콘은 그린 그림이 있는 이모지다', () => {
  const map = readFileSync('lib/og-icon-map.ts', 'utf8');
  for (const item of MUSIC_ITEMS) {
    assert.match(colorOf(item), /^#[0-9a-f]{6}$/i, `${item.slug}: ${colorOf(item)}`);
    assert.ok(map.includes(iconOf(item)), `${item.slug}: ${iconOf(item)}에 그린 아이콘이 없다`);
  }
});

test('열 언어 이름과 설명이 다 있고 언어마다 다른 이름이 나온다', () => {
  for (const item of MUSIC_ITEMS) {
    for (const lang of LANGS) {
      const t = titleOf(item, lang);
      assert.ok(t.trim().length > 1, `${item.slug} ${lang}: 이름 없음`);
      assert.ok(!t.includes('undefined'), `${item.slug} ${lang}: ${t}`);
      const feel = feelOf(item, lang);
      assert.ok(feel.length > (dense(lang) ? 12 : 20), `${item.slug} ${lang}: 설명이 짧다`);
      if (lang !== 'ko') assert.ok(!HANGUL.test(t + feel), `${item.slug} ${lang}에 한글`);
    }
  }
});

test('언어마다 음 이름 관례가 다르다', () => {
  // 독일어는 B를 H로, B♭을 B로 쓴다 — 바흐가 BACH를 음으로 적을 수 있던 표기다
  assert.equal(noteName(11, 'de'), 'H');
  assert.equal(noteName(10, 'de', 'flat'), 'B');
  assert.equal(noteName(11, 'en'), 'B');
  // 라틴 계열은 Do·Ré·Mi로 부른다
  assert.equal(noteName(0, 'es'), 'Do');
  assert.equal(noteName(2, 'fr'), 'Ré');
  assert.equal(noteName(0, 'pt'), 'Dó');
  assert.equal(noteName(3, 'es', 'flat'), 'Mib');
  // 힌디에는 사르감이 있다
  assert.equal(SOLFEGE.hi[0], 'सा');
  for (const lang of LANGS) assert.equal(SOLFEGE[lang].length, 7, `${lang} 계이름이 일곱이 아니다`);
});

test('코드 이름의 어순이 언어마다 맞다', () => {
  const c = musicItem('c-major-chord');
  assert.ok(c);
  assert.equal(titleOf(c, 'ko'), 'C 메이저 코드');
  assert.equal(titleOf(c, 'en'), 'C major chord');
  assert.equal(titleOf(c, 'es'), 'Acorde de Do mayor');
  assert.equal(titleOf(c, 'de'), 'C-Dur-Akkord');
  assert.equal(titleOf(c, 'ja'), 'Cメジャーコード');
  // 이미 Akkord가 든 독일어 이름에 또 붙이면 "Akkord-Akkord"가 된다
  const m7 = musicItem('f-sharp-min7-chord');
  assert.ok(m7);
  assert.ok(!/Akkord-Akkord/.test(titleOf(m7, 'de')), titleOf(m7, 'de'));
  assert.equal(titleOf(m7, 'de'), 'Mollseptakkord auf F#');
});

test('코드 기호는 만국 공통으로 적힌다', () => {
  const sym = (slug: string) => {
    const it = musicItem(slug);
    assert.ok(it, slug);
    return symbolOf(it);
  };
  assert.equal(sym('c-major-chord'), 'C');
  assert.equal(sym('a-minor-chord'), 'Am');
  assert.equal(sym('g-dom7-chord'), 'G7');
  assert.equal(sym('c-maj7-chord'), 'Cmaj7');
  assert.equal(sym('d-min7-chord'), 'Dm7');
  assert.equal(sym('f-sharp-min7-chord'), 'F#m7');
});

test('주파수가 평균율과 맞는다', () => {
  assert.equal(freq(9, 4), 440);        // A4
  assert.equal(freq(0, 4), 261.63);     // C4
  assert.equal(freq(9, 5), 880);        // 한 옥타브 위는 두 배
  // 화면에 쓰는 값은 소수 둘째 자리까지 — 서버와 브라우저가 갈리면 하이드레이션이 깨진다
  for (const item of MUSIC_ITEMS) {
    for (const hz of frequencies(item)) {
      assert.ok(Number.isFinite(hz) && hz > 20 && hz < 4000, `${item.slug}: ${hz}Hz`);
      assert.equal(Math.round(hz * 100) / 100, hz, `${item.slug}: ${hz} 자리수`);
    }
  }
});

test('조표와 검은 건반이 맞는다', () => {
  assert.equal(keySignature(0), 0);     // C장조
  assert.equal(keySignature(7), 1);     // G장조 올림표 하나
  assert.equal(keySignature(5), -1);    // F장조 내림표 하나
  assert.equal(keySignature(10), -2);   // B♭장조 내림표 둘
  assert.deepEqual([0, 2, 4, 5, 7, 9, 11].map(isBlack), [false, false, false, false, false, false, false]);
  assert.deepEqual([1, 3, 6, 8, 10].map(isBlack), [true, true, true, true, true]);
});

test('추천 항목은 자기를 넣지 않고 비지 않는다', () => {
  for (const item of MUSIC_ITEMS) {
    const rel = relatedItems(item.slug);
    assert.ok(rel.length > 0, `${item.slug}: 추천이 비었다`);
    assert.ok(!rel.some(r => r.slug === item.slug), `${item.slug}: 자기를 추천한다`);
  }
  assert.deepEqual(relatedItems('없는항목'), []);
  assert.equal(musicItem('없는항목'), undefined);
});

test('열 언어 라우트와 공유 카드가 다 있다', () => {
  for (const { prefix } of LANG_INFO) {
    const p = `app${prefix}/music`;
    assert.ok(existsSync(appFile(`${p}/page.tsx`)), `${p}/page.tsx 없음`);
    assert.ok(existsSync(appFile(`${p}/[slug]/page.tsx`)), `${p}/[slug]/page.tsx 없음`);
    // 카드는 이제 파일이 아니라 lib/og-cards의 대응표에 있다 — 물려받은 것은 안 친다
    assert.ok(hasOwnCard(p.replace(/^app/, '') || '/'), `${p}에 제 공유 카드가 없다`);
  }
});

test('hreflang은 아홉 줄이고 포르투갈어는 /pt-br이다', () => {
  const a = musicAlternates('c-major-chord');
  assert.equal(Object.keys(a).length, LANGS.length + 1);
  assert.equal(a.ko, '/music/c-major-chord');
  assert.equal(a.en, '/en/music/c-major-chord');
  assert.equal(a['pt-BR'], '/pt-br/music/c-major-chord');
  assert.equal(a['x-default'], '/en/music/c-major-chord');
  assert.equal(musicAlternates().ko, '/music');
  assert.equal(alternates('/music').hi, '/hi/music');
});

test('사이트맵과 검색 인덱스에 음악 이론이 들어 있다', () => {
  const map = readFileSync(appFile('app/sitemap.ts'), 'utf8');
  assert.ok(map.includes('/music'), '사이트맵에 /music 없음');
  assert.ok(map.includes('MUSIC_ITEMS'), '사이트맵이 항목 목록을 돌지 않는다');
  const idx = readFileSync('lib/search-index.ts', 'utf8');
  assert.ok(idx.includes("'music'"), '검색 인덱스에 music 없음');
});

test('화면 문구가 열 언어로 다 있다', () => {
  for (const lang of LANGS) {
    const ui = MUSIC_UI[lang];
    assert.ok(ui, `${lang}: 문구 묶음이 없다`);
    assert.ok(ui.hubTitle.length > 4 && ui.hubLead.length > 20, `${lang}: 허브 문구가 짧다`);
    assert.equal(ui.how.length, 4, `${lang}: 읽는 방법이 네 줄이 아니다`);
    for (const h of ui.how) assert.ok(h.length > 20, `${lang}: 설명이 짧다 — ${h}`);
    for (const k of ['home', 'section', 'notesLabel', 'stepsLabel', 'symbolLabel', 'hzLabel', 'keyboardLabel', 'playLabel', 'stopLabel', 'relatedLabel', 'faqTitle', 'chordGroup', 'scaleGroup', 'intervalGroup'] as const) {
      assert.ok(ui[k].trim().length > 0, `${lang}.${k}가 비었다`);
    }
    assert.ok(ui.countLabel(3).includes('3'), `${lang}: 음 수 표기에 숫자가 없다`);
    assert.ok(ui.semitone(4).includes('4'), `${lang}: 반음 표기에 숫자가 없다`);
    if (lang !== 'ko') {
      const joined = ui.hubTitle + ui.hubLead + ui.how.join('') + ui.chordGroup + ui.scaleGroup;
      assert.ok(!HANGUL.test(joined), `${lang} 화면 문구에 한글`);
    }
    for (const kind of ['chord', 'scale', 'interval'] as const) {
      assert.ok(KIND_WORD[lang][kind].trim(), `${lang}: ${kind} 이름 없음`);
    }
  }
});

test('SEO 문구가 언어마다 실제 구성음을 담는다', () => {
  const item = musicItem('c-major-chord');
  assert.ok(item);
  for (const lang of LANGS) {
    const ui = MUSIC_UI[lang];
    const f = itemFacts(item, lang);
    assert.equal(f.notes.length, 3);
    assert.ok(ui.hubMetaTitle.length > 15, `${lang}: 허브 메타 제목이 짧다`);
    assert.ok(ui.hubMetaDesc.length > 60, `${lang}: 허브 메타 설명이 짧다`);
    const title = ui.metaTitle(f);
    const desc = ui.metaDesc(f);
    assert.ok(title.includes(f.title), `${lang}: 메타 제목에 이름이 없다 — ${title}`);
    assert.ok(desc.includes(f.notes[0]), `${lang}: 메타 설명에 구성음이 없다 — ${desc}`);
    assert.ok(desc.includes(f.symbol), `${lang}: 메타 설명에 기호가 없다`);
    assert.ok(desc.length > 60, `${lang}: 메타 설명이 짧다 (${desc.length}자)`);
    if (lang !== 'ko') assert.ok(!HANGUL.test(title + desc), `${lang} 메타에 한글`);
  }
});

test('FAQ가 항목마다 다섯 개 이상이고 언어마다 채워져 있다', () => {
  for (const lang of LANGS) {
    const ui = MUSIC_UI[lang];
    assert.ok(ui.hubFaq.length >= 4, `${lang}: 허브 FAQ가 ${ui.hubFaq.length}개`);
    for (const it of ui.hubFaq) {
      assert.ok(it.q.length > 5 && it.a.length > (dense(lang) ? 30 : 50), `${lang}: 빈 허브 FAQ — ${it.q}`);
    }
    // 종류마다 하나씩만 재도 문장 틀은 같다 — 135장을 다 돌면 검사가 느려진다
    for (const slug of ['c-major-chord', 'd-minor-scale', 'perfect-fifth']) {
      const item = musicItem(slug);
      assert.ok(item, slug);
      const f = itemFacts(item, lang);
      const faq = ui.itemFaq(f);
      assert.ok(faq.length >= 5, `${slug} ${lang}: FAQ가 ${faq.length}개`);
      assert.equal(new Set(faq.map(x => x.q)).size, faq.length, `${slug} ${lang}: FAQ 질문 중복`);
      for (const it of faq) {
        assert.ok(it.q.length > 5 && it.a.length > (dense(lang) ? 15 : 25), `${slug} ${lang}: 빈 FAQ — ${it.q}`);
      }
      assert.ok(faq[0].a.includes(f.notes[0]), `${slug} ${lang}: FAQ에 구성음이 없다`);
      if (lang !== 'ko') {
        assert.ok(!HANGUL.test(faq.map(x => x.q + x.a).join('')), `${slug} ${lang} FAQ에 한글`);
      }
    }
  }
});

test('성질과 선법 정의가 열 언어로 채워져 있다', () => {
  for (const q of [...CHORD_QUALITIES, ...SCALE_MODES]) {
    for (const lang of LANGS) {
      assert.ok(q.name[lang]?.trim(), `${q.id} ${lang}: 이름 없음`);
    }
    assert.ok(q.steps[0] === 0, `${q.id}: 밑음이 0이 아니다`);
    assert.equal(new Set(q.steps).size, q.steps.length, `${q.id}: 같은 간격이 두 번`);
  }
  for (const iv of INTERVALS) {
    for (const lang of LANGS) {
      assert.ok(iv.name[lang]?.trim(), `${iv.slug} ${lang}: 이름 없음`);
      assert.ok(iv.ear[lang]?.trim(), `${iv.slug} ${lang}: 귀로 익히는 예가 없음`);
    }
  }
});
