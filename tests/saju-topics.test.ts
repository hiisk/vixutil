import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { buildChart, countElements, getSingang, BRANCHES } from '../lib/saju-data.ts';
import { sajuFacts } from '../lib/saju-fortune-facts.ts';
import { analyzeFortune } from '../lib/saju-fortune.ts';
import { analyzeFortuneIntl } from '../lib/saju-fortune-intl.ts';
import { SAJU_L10N, type SajuL10nLang } from '../lib/saju-l10n/index.ts';
import { TOPIC_L10N } from '../lib/saju-topics-l10n/index.ts';
import { KO } from '../lib/saju-topics-l10n/ko.ts';
import {
  TOPIC_SLUGS, TOPIC_DOMAIN, TOPIC_EMOJI, TOPIC_COLOR,
  isTopicSlug, topicEvidence, topicQuery, type TopicSlug,
} from '../lib/saju-topics.ts';
import { ALL_LOCALES10 } from '../lib/locales.ts';
import { SLUG_ROUTES } from '../lib/fold/registry.ts';
import { KO_DEEP_LEAVES } from '../lib/ko/registry.ts';

/**
 * 사주 주제 낱장 — /fortune/saju/<주제>.
 *
 * 이 검사가 지키는 것은 셋이다.
 *  1. 주제마다 짚는 자리가 **실제로 다르다**. 통합 페이지의 한 문단을 떼어낸
 *     것이면 낼 이유가 없다 — 이 저장소는 얇다는 이유로 섹션 57개를 지웠다.
 *  2. 열 언어 문구가 다 찼다. term()류는 조용히 영어로 폴백하므로 화면만 봐서는
 *     안 채운 열쇠가 안 보인다. 그래서 사전 열쇠를 직접 센다.
 *  3. 이름이 주소로 안 나간다.
 */

const ROOT = join(import.meta.dirname, '..');

/** 시험용 사주 — 시각까지 넣어 네 기둥을 다 세운다 */
function facts(y: number, m: number, d: number, h: number, g: 'male' | 'female') {
  const chart = buildChart({ year: y, month: m, day: d, hour: h, minute: 0 }, g);
  const pillars = [chart.year, chart.month, chart.day, chart.hour];
  const counts = countElements(pillars);
  const { strong } = getSingang(chart.day.stemIdx, pillars);
  return {
    chart, counts, strong,
    f: sajuFacts(chart.day, chart.year, chart.month, chart.hour, g, strong, counts),
  };
}

const SAMPLE = facts(1995, 3, 17, 14, 'female');
const SAMPLE_M = facts(1988, 11, 2, 9, 'male');

/* ────────────────────────────────────────────────
   1. 주제가 실제로 갈리는가
──────────────────────────────────────────────── */

test('주제마다 짚는 자리가 다르다 — 같은 사주로 열어도 근거 줄이 겹치지 않는다', () => {
  const { f, chart } = SAMPLE;
  const seen = new Map<string, string[]>();
  for (const t of TOPIC_SLUGS) {
    const rows = topicEvidence(t, f, chart.day, chart.month, chart.daewoons[2].pillar);
    assert.equal(rows.length, 4, `${t}의 근거가 넷이 아니다`);
    seen.set(t, rows.map(r => r.term));
  }

  // 어느 두 주제도 네 줄이 통째로 같아서는 안 된다
  for (const a of TOPIC_SLUGS) {
    for (const b of TOPIC_SLUGS) {
      if (a >= b) continue;
      assert.notDeepEqual(
        seen.get(a), seen.get(b),
        `${a}와 ${b}가 같은 자리를 짚는다 — 주소를 둘로 가를 이유가 없다`,
      );
    }
  }

  // 주제 고유의 자리가 실제로 등장하는지 — 명리에서 그 주제가 보는 글자다
  assert.ok(seen.get('love')!.includes('spouseSeat'), '연애가 배우자궁(일지)을 안 본다');
  assert.ok(seen.get('love')!.includes('peach'), '연애가 도화살을 안 본다');
  assert.ok(seen.get('career')!.includes('yongma'), '이직이 역마살을 안 본다');
  assert.ok(seen.get('promotion')!.includes('gwanIn'), '승진이 관인상생을 안 본다');
  assert.ok(seen.get('promotion')!.includes('sanggwan'), '승진이 상관견관을 안 본다');
  assert.ok(seen.get('money')!.includes('siksangSaengJae'), '재물이 식상생재를 안 본다');
  assert.ok(seen.get('study')!.includes('munchang'), '학업이 문창귀인을 안 본다');
  assert.ok(seen.get('health')!.includes('missingEl'), '건강이 오행의 불급을 안 본다');
  assert.ok(seen.get('job')!.includes('careerSeat'), '취업이 직업궁(월지)을 안 본다');
});

test('주제 해설이 서로 다른 글이다 — 연애와 재물이 같은 문단이면 안 된다', () => {
  const { chart, counts, strong } = SAMPLE;
  const domains = analyzeFortune(chart.day, chart.year, chart.month, chart.hour, 'female', strong, counts);

  const texts = new Map<TopicSlug, string>();
  for (const t of TOPIC_SLUGS) {
    const d = domains.find(x => x.id === TOPIC_DOMAIN[t]);
    assert.ok(d, `${t}가 가리키는 영역(${TOPIC_DOMAIN[t]})이 없다`);
    texts.set(t, [d.intro, d.summary, ...d.points, d.advice].join('\n'));
  }
  for (const a of TOPIC_SLUGS) {
    for (const b of TOPIC_SLUGS) {
      if (a >= b) continue;
      assert.notEqual(texts.get(a), texts.get(b), `${a}와 ${b}의 해설이 같은 글이다`);
    }
  }
});

test('주제가 가리키는 영역이 열 언어에서 모두 실제로 나온다', () => {
  const { chart, counts, strong } = SAMPLE;
  for (const lang of Object.keys(SAJU_L10N) as SajuL10nLang[]) {
    const domains = analyzeFortuneIntl(chart.day, chart.year, chart.month, chart.hour, 'female', strong, counts, lang);
    for (const t of TOPIC_SLUGS) {
      const d = domains.find(x => x.id === TOPIC_DOMAIN[t]);
      assert.ok(d, `${lang}에 ${TOPIC_DOMAIN[t]} 영역이 없다`);
      assert.ok(d.title.trim().length > 0, `${lang}/${t} 제목이 비었다`);
      assert.equal(d.points.length, 4, `${lang}/${t}의 근거가 넷이 아니다`);
      for (const p of d.points) {
        assert.ok(p && p.trim().length > 0, `${lang}/${t}에 빈 근거 줄이 있다`);
      }
    }
  }
});

test('한국어와 아홉 언어가 같은 사주에 같은 점수를 낸다 — 승진 포함', () => {
  const { chart, counts, strong } = SAMPLE_M;
  const ko = analyzeFortune(chart.day, chart.year, chart.month, chart.hour, 'male', strong, counts);
  for (const lang of Object.keys(SAJU_L10N) as SajuL10nLang[]) {
    const intl = analyzeFortuneIntl(chart.day, chart.year, chart.month, chart.hour, 'male', strong, counts, lang);
    assert.deepEqual(
      intl.map(d => [d.id, d.score]),
      ko.map(d => [d.id, d.score]),
      `${lang}의 점수가 한국어와 다르다`,
    );
  }
});

/* ────────────────────────────────────────────────
   2. 새로 더한 명리 판정
──────────────────────────────────────────────── */

test('문창귀인은 일간이 정한 지지가 있을 때만 선다', () => {
  /*
   * 조견표: 甲-巳 乙-午 丙-申 丁-酉 戊-申 己-酉 庚-亥 辛-子 壬-寅 癸-卯.
   * 열 일간을 다 돌며 "그 지지가 사주에 있는가"와 판정이 일치하는지 본다 —
   * 표를 한 줄만 잘못 옮겨도 여기서 걸린다.
   */
  const WANT = [5, 6, 8, 9, 8, 9, 11, 0, 2, 3];
  let saw = 0;
  for (let y = 1980; y < 2000; y++) {
    for (const m of [2, 5, 8, 11]) {
      const { f, chart } = facts(y, m, 15, 10, 'male');
      const branches = [chart.year, chart.month, chart.day, chart.hour]
        .map(p => (p ? p.branchIdx : -1));
      const want = branches.includes(WANT[chart.day.stemIdx]);
      assert.equal(f.hasMunchang, want, `${y}-${m} 문창귀인 판정이 조견표와 다르다`);
      if (want) saw++;
    }
  }
  assert.ok(saw > 0, '문창귀인이 한 번도 안 섰다 — 표가 통째로 틀렸을 수 있다');
});

test('관인상생·상관견관은 천간 십성으로 정해진다', () => {
  for (const [y, m, d, h] of [[1995, 3, 17, 14], [1988, 11, 2, 9], [2001, 7, 4, 21]] as const) {
    const { f } = facts(y, m, d, h, 'female');
    assert.equal(f.gwanInSangsaeng, f.allSS.includes('정관') && f.allSS.includes('정인'));
    assert.equal(f.sanggwanGyeonGwan, f.allSS.includes('상관') && f.allSS.includes('정관'));
    // 상관견관은 정관이 있어야 성립한다 — 관성이 아예 없으면 칠 대상이 없다
    if (f.sc.관성 === 0) assert.equal(f.sanggwanGyeonGwan, false);
  }
});

test('승진 점수는 정관·관인상생이 올리고 상관견관·무관이 내린다', () => {
  const { chart, counts, strong } = SAMPLE;
  const base = sajuFacts(chart.day, chart.year, chart.month, chart.hour, 'female', strong, counts);
  assert.ok(base.scores.promotion >= 1 && base.scores.promotion <= 5);

  // 승진은 취업·이직과 다른 점수여야 뜻이 있다 — 셋이 늘 같으면 가른 보람이 없다
  let differs = 0;
  for (let y = 1970; y < 2005; y++) {
    const { f } = facts(y, 6, 10, 12, 'male');
    if (f.scores.promotion !== f.scores.career || f.scores.promotion !== f.scores.change) differs++;
  }
  assert.ok(differs > 10, `승진 점수가 취업·이직과 거의 늘 같다(${differs}/35) — 가를 이유가 없다`);
});

/* ────────────────────────────────────────────────
   3. 열 언어 문구가 다 찼는가 — 열쇠를 직접 센다
──────────────────────────────────────────────── */

test('주제 문구가 열 언어에 다 있다 — 폴백이 아니라 열쇠를 센다', () => {
  const wantTitles = Object.keys(KO.title).sort();
  const wantLeads = Object.keys(KO.lead).sort();
  const wantTerms = Object.keys(KO.terms).sort();
  const wantUi = Object.keys(KO.ui).sort();

  assert.deepEqual(wantTitles, [...TOPIC_SLUGS].sort(), 'ko 제목이 주제 목록과 안 맞는다');

  for (const lang of ALL_LOCALES10) {
    const c = TOPIC_L10N[lang];
    assert.ok(c, `${lang} 주제 문구가 없다`);
    assert.deepEqual(Object.keys(c.title).sort(), wantTitles, `${lang}의 title 열쇠가 모자라다`);
    assert.deepEqual(Object.keys(c.lead).sort(), wantLeads, `${lang}의 lead 열쇠가 모자라다`);
    assert.deepEqual(Object.keys(c.terms).sort(), wantTerms, `${lang}의 terms 열쇠가 모자라다`);
    assert.deepEqual(Object.keys(c.ui).sort(), wantUi, `${lang}의 ui 열쇠가 모자라다`);

    // 빈 문자열은 열쇠가 있는 것과 마찬가지로 안 채운 것이다
    for (const [k, v] of Object.entries({ ...c.title, ...c.lead, ...c.terms })) {
      assert.ok(typeof v === 'string' && v.trim().length > 0, `${lang}의 ${k}가 비었다`);
    }
    for (const [k, v] of Object.entries(c.ui)) {
      assert.ok(typeof v === 'string' && v.trim().length > 0, `${lang}의 ui.${k}가 비었다`);
    }

    // 자리표시자를 지우면 이름·값이 화면에서 사라진다
    assert.ok(c.ui.countOf.includes('{n}'), `${lang}의 countOf에 {n}이 없다`);
    assert.ok(c.ui.titleOf.includes('{name}') && c.ui.titleOf.includes('{topic}'), `${lang}의 titleOf에 자리표시자가 없다`);
    assert.ok(c.ui.introLead.includes('{term}') && c.ui.introLead.includes('{value}'), `${lang}의 introLead에 자리표시자가 없다`);
  }
});

test('영어 문구를 그대로 베껴 둔 언어가 없다', () => {
  // 한자권은 제목이 겹칠 수 있으므로 라틴 문자권만 본다
  for (const lang of ['es', 'pt-br', 'de', 'fr'] as const) {
    const same = TOPIC_SLUGS.filter(t => TOPIC_L10N[lang].lead[t] === TOPIC_L10N.en.lead[t]);
    assert.equal(same.length, 0, `${lang}가 영어 소개를 그대로 쓴다: ${same.join(', ')}`);
  }
});

test('승진 영역 문구가 아홉 언어에 다 있다', () => {
  const wantPoints = Object.keys(SAJU_L10N.en.domains.promotion.points).sort();
  assert.ok(wantPoints.length >= 10, '영어 승진 근거 열쇠가 모자라다');
  for (const lang of Object.keys(SAJU_L10N) as SajuL10nLang[]) {
    const d = SAJU_L10N[lang].domains.promotion;
    assert.ok(d, `${lang}에 승진 영역이 없다`);
    assert.deepEqual(Object.keys(d.points).sort(), wantPoints, `${lang}의 승진 근거 열쇠가 모자라다`);
    assert.equal(d.sum.length, 3, `${lang}의 승진 요약이 셋이 아니다`);
    assert.equal(d.adv.length, 2, `${lang}의 승진 조언이 둘이 아니다`);
    assert.ok((d.intro as string).length > 80, `${lang}의 승진 머리말이 너무 짧다`);
  }
});

/* ────────────────────────────────────────────────
   4. 슬러그와 배선
──────────────────────────────────────────────── */

test('목록 밖 슬러그는 주제가 아니다', () => {
  for (const t of TOPIC_SLUGS) assert.ok(isTopicSlug(t));
  for (const bad of ['', 'all', 'LOVE', '연애', 'love/', 'marriage', 'business', '../love', 'toString']) {
    assert.equal(isTopicSlug(bad), false, `${bad}가 주제로 통과한다 — 404여야 한다`);
  }
});

test('주제 표가 서로 빠짐없이 맞는다', () => {
  for (const t of TOPIC_SLUGS) {
    assert.ok(TOPIC_DOMAIN[t], `${t}에 영역이 없다`);
    assert.ok(TOPIC_EMOJI[t], `${t}에 이모지가 없다`);
    assert.ok(TOPIC_COLOR[t], `${t}에 색이 없다`);
  }
  // 두 주제가 같은 영역을 가리키면 같은 글이 두 주소에 난다
  const domains = TOPIC_SLUGS.map(t => TOPIC_DOMAIN[t]);
  assert.equal(new Set(domains).size, domains.length, '두 주제가 같은 영역을 가리킨다');
});

test('라우팅 표를 한 칸도 안 쓴다 — 이미 있는 캐치올이 받는다', () => {
  assert.ok(SLUG_ROUTES['fortune/saju'], 'SLUG_ROUTES에 fortune/saju가 없다');
  assert.ok(KO_DEEP_LEAVES['fortune/saju'], 'KO_DEEP_LEAVES에 fortune/saju가 없다');

  // 주제마다 라우트 파일을 만들면 Vercel 2,048칸이 그만큼 준다
  for (const dir of ['app/(ko)/fortune/saju/[topic]', 'app/(ko)/fortune/saju/[slug]', 'app/(en)/en/fortune/saju/[slug]']) {
    assert.throws(() => readFileSync(join(ROOT, dir, 'page.tsx')), `${dir}가 생겼다 — 라우팅 표를 쓴다`);
  }
});

test('사이트맵과 검색 상자에 일곱 주제가 다 있다', () => {
  const sitemap = readFileSync(join(ROOT, 'app/sitemap.ts'), 'utf8');
  assert.ok(sitemap.includes('/fortune/saju/${t}'), '사이트맵에 주제 블록이 없다');

  const idx = readFileSync(join(ROOT, 'lib/search-index.ts'), 'utf8');
  for (const t of TOPIC_SLUGS) {
    assert.ok(idx.includes(`/fortune/saju/${t}`), `검색 상자에 ${t}가 없다`);
  }
});

/* ────────────────────────────────────────────────
   5. 이름은 브라우저 밖으로 안 나간다
──────────────────────────────────────────────── */

test('이름을 주소에도 서버에도 안 보낸다', () => {
  const src = readFileSync(join(ROOT, 'components/fortune/SajuKo.tsx'), 'utf8');

  // 주소에 싣는 열쇠 — 이름이 끼면 캐시가 이름마다 갈리고 개인정보가 남는다
  const params = src.match(/new URLSearchParams\(\{([^}]*)\}/);
  assert.ok(params, 'replaceState에 쓰는 열쇠를 못 찾았다');
  assert.equal(/\bname\b/.test(params[1]), false, `이름이 주소에 실린다: ${params[1]}`);

  // 사주 계산에 이름을 넣으면 틀린 명리다
  assert.equal(/buildChart\([^)]*name/.test(src), false, '이름이 사주 계산에 들어간다');

  // 서버로 내보내는 길이 없어야 한다.
  // sessionStorage는 뺐다 — 주제를 옮길 때 이름을 들고 가는 자리이고, 탭 안에서만
  // 살다 닫으면 사라진다. localStorage는 남으므로 여전히 막는다.
  for (const sink of ['fetch(', 'navigator.sendBeacon', 'XMLHttpRequest', 'localStorage', 'document.cookie']) {
    assert.equal(src.includes(sink), false, `${sink}가 있다 — 이름이 새는 길인지 확인해야 한다`);
  }
  /*
   * 2026-08-15부터 이름 칸은 낱장(SajuTopicPage)이 갖고, 명식은 통합 화면이 뽑는다.
   * 그래서 새는 길은 두 파일을 다 봐야 한다 — 주소 열쇠는 위에서 봤고,
   * 이름을 들고 다니는 자리는 아래에서 본다.
   */
  const leaf = readFileSync(join(ROOT, 'components/fortune/SajuTopicPage.tsx'), 'utf8');
  for (const sink of ['fetch(', 'navigator.sendBeacon', 'XMLHttpRequest', 'localStorage', 'document.cookie']) {
    assert.equal(leaf.includes(sink), false, `낱장에 ${sink}가 있다 — 이름이 새는 길인지 확인해야 한다`);
  }
  assert.ok(leaf.includes('sessionStorage'), '이름을 주제 사이에서 들고 갈 길이 없다');
  assert.equal(/replaceState[^;]*name/.test(leaf), false, '낱장이 이름을 주소에 싣는다');

  // 이름 없이도 페이지가 온전해야 한다 — 빈 값이 기본
  assert.ok(/useState\(''\)/.test(src), '이름의 기본값이 빈 문자열이 아니다');
});

/* ────────────────────────────────────────────────
   6. 주제 전환 장치 — 입력값을 물고 간다
──────────────────────────────────────────────── */

test('전환 링크가 생년월일시·성별을 물고 간다', () => {
  const q = topicQuery({ year: '1995', month: '3', day: '17', hour: '14:20', gender: 'female' });
  const p = new URLSearchParams(q.slice(1));
  assert.equal(p.get('y'), '1995');
  assert.equal(p.get('m'), '3');
  assert.equal(p.get('d'), '17');
  assert.equal(p.get('h'), '14:20');
  assert.equal(p.get('g'), 'female');
  // 주제를 바꿀 때마다 다시 넣게 하면 아무도 안 쓴다 — 다섯이 다 있어야 한다
  assert.equal([...p.keys()].sort().join(','), 'd,g,h,m,y');
});

test('전환 링크에 이름이 안 실린다', () => {
  const q = topicQuery({ year: '1995', month: '3', day: '17', hour: '', gender: 'male' });
  assert.equal(/name|이름/.test(q), false, `이름이 전환 링크에 실린다: ${q}`);
  // 시각은 선택이라 비면 뺀다 — 빈 h=가 붙으면 받는 쪽이 시주를 0시로 세운다
  assert.equal(q.includes('h='), false, `빈 시각이 실린다: ${q}`);
});

test('값이 덜 찼으면 전환 링크에 아무것도 안 붙인다', () => {
  for (const v of [
    { year: '', month: '3', day: '17', gender: 'male' },
    { year: '1995', month: '', day: '17', gender: 'male' },
    { year: '1995', month: '3', day: '', gender: 'male' },
  ]) {
    assert.equal(topicQuery(v), '', '반쯤 채운 값이 주소에 실린다');
  }
});

test('전환 칩이 값을 물고 가고, 지금 주제를 표시한다', () => {
  const nav = readFileSync(join(ROOT, 'components/fortune/SajuTopicNav.tsx'), 'utf8');

  // 링크가 query를 안 붙이면 옮길 때마다 생년월일을 다시 넣어야 한다
  assert.ok(/href=\{.*\+ query\}/.test(nav), '전환 링크가 입력값을 안 물고 간다');

  // 지금 보고 있는 주제가 어느 것인지 분명해야 한다
  assert.ok(nav.includes('chip-now'), '지금 주제를 채워서 표시하지 않는다');
  assert.ok(nav.includes('aria-current'), '지금 주제에 aria-current가 없다');

  // 값 칩 한 벌을 쓴다 — 낱장은 HTML·.rsc·.segments 세 곳에 저장되므로
  // 긴 class 문자열을 마크업에 적으면 그대로 세 배가 된다
  assert.ok(nav.includes('chip-v'), 'globals.css의 값 칩을 안 쓴다');
  assert.equal(/border-slate-200 dark:border-slate-700 bg-white/.test(nav), false,
    'chip-v가 대신하는 긴 class 문자열이 마크업에 남아 있다');
});

test('세 화면이 모두 전환 장치에 값을 넘긴다', () => {
  /* 낱장은 이 둘을 품으므로 전환 장치도 함께 받는다(2026-08-15) */
  const users = [
    'components/fortune/SajuIntl.tsx',
    'components/fortune/SajuKo.tsx',
  ];
  for (const f of users) {
    const src = readFileSync(join(ROOT, f), 'utf8');
    assert.ok(src.includes('<SajuTopicNav'), `${f}에 전환 장치가 없다`);
    assert.ok(/<SajuTopicNav[^>]*query=\{/.test(src), `${f}가 전환 장치에 값을 안 넘긴다`);
  }
});

test('값을 달고 돌아온 허브가 다시 안 묻는다', () => {
  // 낱장 → 허브로 돌아올 때도 ?y=가 붙는다. 허브가 그것을 안 읽으면
  // 사람은 같은 생년월일을 또 넣게 된다.
  for (const f of ['components/fortune/SajuIntl.tsx', 'components/fortune/SajuKo.tsx']) {
    const src = readFileSync(join(ROOT, f), 'utf8');
    assert.ok(src.includes("get('y')"), `${f}가 돌아온 값을 안 읽는다`);
  }
});

/* ────────────────────────────────────────────────
   7. 검색어 — 새 페이지를 안 만들고 있는 페이지가 걸리게 한다
──────────────────────────────────────────────── */

test('자주 묻는 질문이 열 언어에 다 있다', () => {
  for (const lang of ALL_LOCALES10) {
    const c = TOPIC_L10N[lang];
    assert.equal(c.faqCommon.length, 2, `${lang}의 공통 물음이 둘이 아니다`);
    assert.deepEqual(Object.keys(c.faqTopic).sort(), [...TOPIC_SLUGS].sort(),
      `${lang}의 주제별 물음이 일곱이 아니다`);

    for (const { q, a } of [...c.faqCommon, ...Object.values(c.faqTopic)]) {
      assert.ok(q.trim().length > 0, `${lang}: 빈 물음`);
      // section-faq 검사와 같은 잣대 — 짧은 답은 검색 결과에 안 뜬다
      assert.ok(a.trim().length >= 20, `${lang}: 답이 너무 짧다 — "${q}"`);
    }
    // 한 페이지에 같은 물음이 두 번 뜨면 FAQPage가 깨진다
    for (const t of TOPIC_SLUGS) {
      const qs = [...c.faqCommon.map(f => f.q), c.faqTopic[t].q];
      assert.equal(new Set(qs).size, qs.length, `${lang}/${t}: 물음이 겹친다`);
    }
  }
});

test('건강 답변은 진단이 아니라고 말하고 의료기관을 가리킨다', () => {
  // 없는 말을 만들지 않는다 — 병을 알아맞힌다고 하면 안 된다
  const SEE_DOCTOR =
    /의사|의료|병원|진료|doctor|médico|medic|arzt|médecin|चिकित्सक|डॉक्टर|医師|医療|医院|医生|病院|醫師|醫生|醫院|醫療/i;
  for (const lang of ALL_LOCALES10) {
    const a = TOPIC_L10N[lang].faqTopic.health.a;
    assert.ok(SEE_DOCTOR.test(a), `${lang}: 건강 답이 의료기관을 안 가리킨다`);
  }
});

test('없는 말을 만들지 않는다 — 적중률·보장 같은 것', () => {
  const BAD = /적중률|9\d\s?%|100\s?%|guarantee|guaranteed|100% accurate|絶対に当たる|保证准确|保證準確/i;
  for (const lang of ALL_LOCALES10) {
    const c = TOPIC_L10N[lang];
    const all = [
      ...Object.values(c.title), ...Object.values(c.lead),
      c.ui.metaTitle, c.ui.metaDescSuffix,
      ...c.faqCommon.flatMap(f => [f.q, f.a]),
      ...Object.values(c.faqTopic).flatMap(f => [f.q, f.a]),
    ].join('\n');
    const hit = all.match(BAD);
    assert.equal(hit, null, `${lang}: 근거 없는 말 — "${hit?.[0]}"`);
  }
});

test('<title> 틀이 열 언어에 있고 주제 자리를 남긴다', () => {
  for (const lang of ALL_LOCALES10) {
    const c = TOPIC_L10N[lang];
    assert.ok(c.ui.metaTitle.includes('{topic}'), `${lang}의 metaTitle에 {topic}이 없다`);
    assert.ok(c.ui.metaDescSuffix.trim().length > 0, `${lang}의 metaDescSuffix가 비었다`);

    for (const t of TOPIC_SLUGS) {
      const title = c.ui.metaTitle.replace('{topic}', c.title[t]);
      // 낱말 나열은 역효과다 — 같은 낱말이 세 번 넘게 들어가면 그 꼴이다
      const words = title.split(/[\s·・,，、|｜—–\-]+/).filter(w => w.length >= 2);
      for (const w of new Set(words)) {
        const n = words.filter(x => x === w).length;
        assert.ok(n <= 2, `${lang}/${t}: "${w}"가 제목에 ${n}번 — 낱말 나열이다\n  ${title}`);
      }
      assert.ok(title.length <= 70, `${lang}/${t}: 제목이 ${title.length}자 — 검색 결과에서 잘린다\n  ${title}`);
    }
  }
});

test('사주가 daily·animal·zodiac 페이지의 검색어를 안 뺏는다', () => {
  /*
   * 자기 사이트끼리 경쟁하면 둘 다 진다. 조사에서 갈린 것(2026-08-15):
   *  · "무료 운세"·"오늘의 운세" — 네이버 자동완성이 은행 위젯과 "오늘"로 채워진다.
   *    생년월일시를 안 받는 물음이라 /fortune/daily의 것이다.
   *  · "띠별 운세" — 열두 띠만 보는 물음이라 /fortune/animal의 것이다.
   *  · "별자리 운세" — /fortune/zodiac의 것이다.
   *  · 궁합·相性·合婚 — 두 사람을 받는 별개 페이지다.
   */
  const STEAL: [RegExp, string][] = [
    [/오늘의\s*운세/, '/fortune/daily'],
    [/무료\s운세/, '/fortune/daily'],   // "무료사주"는 되고 띄어 쓴 "무료 운세"는 안 된다
    [/띠별/, '/fortune/animal'],
    [/별자리/, '/fortune/zodiac'],
    [/궁합/, '궁합(두 사람) 페이지'],
    [/今日の運勢/, '/fortune/daily'],
    [/干支占い/, '/fortune/animal'],
    [/今日运势|今日運勢/, '/fortune/daily'],
    [/生肖运势|生肖運勢/, '/fortune/animal'],
  ];
  for (const lang of ALL_LOCALES10) {
    const c = TOPIC_L10N[lang];
    const text = [...Object.values(c.title), ...Object.values(c.lead), c.ui.metaTitle].join('\n');
    for (const [re, owner] of STEAL) {
      assert.equal(re.test(text), false,
        `${lang}: ${owner}가 맡아야 할 말(${re.source})을 사주가 쓴다 — 우리끼리 싸운다`);
    }
  }

  // 한국어 허브도 같은 잣대로 본다
  const hub = readFileSync(join(ROOT, 'app/(ko)/fortune/saju/layout.tsx'), 'utf8');
  const meta = hub.match(/title: '([^']*)'[\s\S]*?description: '([^']*)'/);
  assert.ok(meta, '허브 메타데이터를 못 찾았다');
  for (const re of [/오늘의\s*운세/, /띠별/, /별자리/]) {
    assert.equal(re.test(meta[1] + meta[2]), false, `허브가 다른 페이지의 검색어를 쓴다: ${re.source}`);
  }
  // 사주가 실제로 노리는 말은 들어 있어야 한다
  assert.ok(/무료/.test(meta[1]) && /사주팔자/.test(meta[1]), `허브 제목에 노리는 말이 없다: ${meta[1]}`);
});

test('검색어를 노린다고 새 페이지를 만들지 않았다', () => {
  // 도어웨이 페이지는 정책 위반이다. 주소는 주제 일곱뿐이어야 한다.
  const sitemap = readFileSync(join(ROOT, 'app/sitemap.ts'), 'utf8');
  for (const bad of ['saju-free', 'free-saju', 'saju/muryo', '무료사주', 'saju/manseryeok']) {
    assert.equal(sitemap.includes(bad), false, `검색어 전용 페이지가 생겼다: ${bad}`);
  }
  assert.equal(TOPIC_SLUGS.length, 7, '주제가 일곱이 아니다 — 검색어마다 늘리면 안 된다');
});

test('입력칸에 라벨이 있고 힌트가 입력 형식으로 안 읽힌다', () => {
  /*
   * 2026-08-15에 사용자가 "입력할 때 힌트들이 이상하다"고 했다. 주제 낱장만
   * 문구를 손으로 적고 있었고 월·일 칸이 `1-12`, `1-31`이었다 — 숫자 칸에서
   * 그것은 예시가 아니라 **"이렇게 적어라"**로 읽힌다. 게다가 세 칸에 라벨이
   * 없어서 한 글자만 입력해도 힌트가 사라지고 어느 칸인지 알 수 없었다.
   *
   * 다른 화면(SajuIntl·한국어 통합)은 처음부터 공용 문구를 쓰고 있었다. 여기만
   * 갈라져 있던 것이라, 다시 갈라지는 것을 막는다.
   */
  /* 폼은 2026-08-15에 셋에서 하나로 모였다 — 이제 여기만 보면 세 화면이 다 걸린다 */
  const src = readFileSync(new URL('../components/fortune/SajuForm.tsx', import.meta.url), 'utf8');

  /* 범위를 힌트로 적지 않는다 — 범위는 min/max가 지킨다 */
  const ranges = [...src.matchAll(/placeholder=\{?['"`]([^'"`]*\d+\s*-\s*\d+[^'"`]*)['"`]/g)].map(m => m[1]);
  assert.deepEqual(ranges, [], `힌트에 범위가 적혀 있다 — 입력 형식으로 읽힌다: ${ranges.join(', ')}`);

  /* 힌트는 표에서 온다 — 손으로 적으면 열 언어 가운데 아홉이 한국어를 본다 */
  assert.match(src, /const ph = k === 'year' \? fc\.yearPh/, '날짜 칸 힌트가 표에서 오지 않는다');
  assert.ok(!/placeholder=\{k === 'year' \? '/.test(src), '날짜 칸 힌트를 손으로 적었다');

  /* 라벨 — 값이 채워져도 남는 것이 있어야 한다 */
  for (const [what, re] of [
    ['생년월일', /htmlFor="saju-year"[\s\S]{0,120}\{fc\.birthLabel\}/],
    /* 2026-08-20: «모름»을 체크로 받으면서 시 고르개가 항상 있지는 않게 됐다.
       htmlFor가 없는 순간이 생기므로 라벨 문구와 aria-label로 본다. */
    ['태어난 시각', /className="fld-lbl">\{fc\.hourLabel\}/],
    ['시 고르개 이름', /id="saju-hour" aria-label=\{fc\.hourLabel\}/],
    ['시각 안내', /\{fc\.hourNote\}/],
    ['성별', /\{fc\.genderLabel\}/],
  ] as const) {
    assert.match(src, re, `${what} 라벨이 없다`);
  }

  /*
   * 성별 단추는 말로만 쓴다 — 대운 방향이 성별로 갈리므로 무엇이 골라져
   * 있는지가 분명해야 한다.
   *
   * 2026-08-20에 ♂·♀ 기호를 뺐다. 글자가 이미 「남성」·「여성」이라고 말하고
   * 있어서 기호는 같은 말을 두 번 하는 것이었다. 그래서 이 검사도 «기호가
   * 있는가»가 아니라 «말이 있는가»를 본다.
   */
  assert.match(src, /fc\.male/, '성별 단추에 남성 문구가 없다');
  assert.match(src, /fc\.female/, '성별 단추에 여성 문구가 없다');
  assert.ok(!/[♂♀]/.test(src), '성별 기호가 남아 있다 — 글자만 쓴다');

  /* 범위는 브라우저가 지킨다 */
  assert.match(src, /min=\{k === 'year' \? 1900 : 1\}/, '월·일 칸에 min이 없다');
  assert.match(src, /max=\{k === 'year' \? 2100 : k === 'month' \? 12 : 31\}/, '월·일 칸에 max가 없다');
});

test('입력칸 문구가 열 언어에 다 있고, 아홉은 이미 있던 번역을 쓴다', async () => {
  /*
   * 새로 쓴 말은 한국어뿐이어야 한다. 아홉 언어를 여기서 또 번역하면 같은 말이
   * 두 벌이 되고, 곧 한쪽만 고쳐진다 — 이 저장소가 겪은 그 병이다.
   */
  const { sajuForm } = await import('../lib/saju-form.ts');
  const { DATE_FORM } = await import('../lib/fortune-form-intl.ts');
  const { SAJU_L10N } = await import('../lib/saju-l10n/index.ts');

  const keys = ['birthLabel', 'yearPh', 'monthPh', 'dayPh',
    'genderLabel', 'male', 'female', 'hourLabel', 'hourNote'] as const;

  const missing: string[] = [];
  for (const lang of ALL_LOCALES10) {
    const f = sajuForm(lang);
    for (const k of keys) {
      if (!f[k] || !f[k].trim()) missing.push(`${lang}.${k}`);
    }
    /* 아홉 언어는 원본을 그대로 가져와야 한다 — 베껴 두면 여기서 갈린다 */
    if (lang !== 'ko') {
      assert.equal(f.yearPh, DATE_FORM[lang as keyof typeof DATE_FORM].yearPh,
        `${lang}: 연도 힌트가 공용 표와 다르다 — 베껴 적었다`);
      assert.equal(f.hourNote, SAJU_L10N[lang as keyof typeof SAJU_L10N].ui.hourNote,
        `${lang}: 시각 안내가 사주 사전과 다르다 — 베껴 적었다`);
    }
  }
  assert.deepEqual(missing, [], `입력칸 문구가 비어 있다: ${missing.join(', ')}`);

  /* 한국어는 범위가 아니라 이름이다 */
  const ko = sajuForm('ko');
  assert.equal(ko.monthPh, '월');
  assert.equal(ko.dayPh, '일');
  assert.match(ko.yearPh, /1995/, '연도 힌트에 예시 연도가 없다');
});

test('사주 폼은 하나뿐이다 — 세 화면이 각자 그리지 않는다', () => {
  /*
   * 2026-08-15에 셋에서 하나로 모았다. 갈라져 있으면 고칠 때마다 세 곳을 손대야
   * 하고, 실제로 두 곳만 고친 채로 남아 주제 낱장의 힌트가 `1-12`가 됐었다.
   *
   * 다시 갈라지는 것을 막는다 — 입력칸을 직접 그리는 화면이 있으면 실패한다.
   */
  /* 폼을 그리는 화면은 둘 — 낱장은 이 둘을 품는다(2026-08-15) */
  const screens = [
    'components/fortune/SajuKo.tsx',
    'components/fortune/SajuIntl.tsx',
  ];
  const leaf = readFileSync(new URL('../components/fortune/SajuTopicPage.tsx', import.meta.url), 'utf8');
  assert.match(leaf, /<SajuKo\b/, '낱장이 한국어 통합 화면을 안 쓴다');
  assert.match(leaf, /<SajuIntl\b/, '낱장이 아홉 언어 통합 화면을 안 쓴다');
  assert.ok(!/<SajuForm\b/.test(leaf), '낱장이 폼을 또 그린다 — 통합 화면 것과 둘이 된다');

  const own: string[] = [];
  for (const f of [...screens, 'components/fortune/SajuTopicPage.tsx']) {
    const src = readFileSync(new URL(`../${f}`, import.meta.url), 'utf8');
    if (screens.includes(f)) assert.match(src, /<SajuForm\b/, `${f}가 공용 폼을 안 쓴다`);
    /* 생년월일·시각 칸을 직접 그리면 안 된다. 이름 칸(text)은 그 화면 것이라 뺀다 */
    if (/type="number"/.test(src) || /type="time"/.test(src)) own.push(f);
  }
  assert.deepEqual(own, [], `입력칸을 직접 그리는 화면이 있다 — 폼이 다시 갈라진다: ${own.join(', ')}`);
});
