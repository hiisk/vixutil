/**
 * 타로 뽑기가 고르게 나오는지, 오늘의 타로가 하루마다 바뀌는지 본다.
 *
 * ── 왜 이 검사가 생겼나 ────────────────────────────────────
 * drawCards의 섞기가 `sort(() => Math.random() - 0.5)`였다. 비교 함수가
 * 일관되지 않으면 정렬은 고른 순열을 주지 않는다 — 78장에서 세 장을 뽑아
 * 재보니 0번(바보)이 기대값의 2.8배, 끝자리가 0.57배였다. 화면으로는
 * "오늘도 바보가 나왔네" 정도로 보여서 아무도 못 잡는다.
 *
 * 색 이름은 아홉 언어가 전부 LUCKY_COLORS_EN을 읽어서 일본어 화면에
 * "White"가 나오고 있었다. 번역이 없어서가 아니라 안 거쳐서 그랬다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { drawCards, getFullDeck, TAROT_CARDS } from '../lib/fortune-data.ts';
import { luckyColors } from '../lib/fortune-intl.ts';
import { dailyTarot } from '../lib/tarot-intl.ts';
import { INTL_LOCALES10 } from '../lib/locales.ts';

test('뽑은 카드에 같은 장이 두 번 들어가지 않는다', () => {
  for (let i = 0; i < 200; i++) {
    const ids = drawCards(10, true).map(d => d.card.id);
    assert.equal(new Set(ids).size, ids.length, `중복: ${ids}`);
  }
  assert.equal(drawCards(3).length, 3);
  assert.equal(drawCards(78, true).length, 78, '78장을 다 달라고 하면 78장이 와야 한다');
});

test('78장이 고르게 뽑힌다 — 앞자리에 쏠리지 않는다', () => {
  // 20,000번 × 3장이면 장당 기대값 769. 편향된 정렬 섞기는 여기서 3배 이상 갈렸다.
  const TRIALS = 20_000, K = 3;
  const deck = getFullDeck();
  const seen = new Map<number, number>();
  for (let i = 0; i < TRIALS; i++) {
    for (const d of drawCards(K, true)) seen.set(d.card.id, (seen.get(d.card.id) ?? 0) + 1);
  }
  assert.equal(seen.size, deck.length, `${deck.length - seen.size}장은 한 번도 안 나왔다`);

  const expected = (TRIALS * K) / deck.length;
  const lo = Math.min(...seen.values()), hi = Math.max(...seen.values());
  // 고른 섞기면 표준편차가 √769 ≈ 28이라 ±20%면 통계적 요동으로는 절대 안 넘는다.
  assert.ok(lo > expected * 0.8, `가장 안 나온 카드가 ${lo}회 — 기대값 ${expected}의 80% 미만`);
  assert.ok(hi < expected * 1.2, `가장 많이 나온 카드가 ${hi}회 — 기대값 ${expected}의 120% 초과`);
});

test('역방향이 35% 근처로 나온다', () => {
  const N = 20_000;
  let rev = 0;
  for (let i = 0; i < N; i++) if (drawCards(1)[0].reversed) rev++;
  const rate = rev / N;
  assert.ok(rate > 0.30 && rate < 0.40, `역방향 비율 ${rate}`);
});

test('오늘의 타로는 날짜마다 바뀌고 같은 날엔 안 바뀐다', () => {
  // 같은 날 두 번 부르면 같은 카드 — 새로고침마다 바뀌면 신뢰를 잃는다
  assert.deepEqual(dailyTarot('20260815', 'en'), dailyTarot('20260815', 'en'));

  // 한 해를 돌려 보면 22장이 골고루 나온다 (한 장에 굳어 있지 않다)
  const ids = new Set<number>();
  for (let d = 1; d <= 365; d++) {
    const key = `2026${String(d).padStart(4, '0')}`;
    ids.add(dailyTarot(key, 'en').id);
  }
  assert.equal(ids.size, TAROT_CARDS.length, `1년에 ${ids.size}장만 나온다`);
});

test('오늘의 타로 행운색 이름이 언어를 따른다', () => {
  const key = '20260815';
  const en = dailyTarot(key, 'en');
  for (const lang of INTL_LOCALES10) {
    const v = dailyTarot(key, lang);
    // hex는 열 언어가 같아야 한다 — 같은 날 같은 색이어야 하므로
    assert.equal(v.color[1], en.color[1], `${lang}: 색 hex가 en과 다르다`);
    assert.equal(v.id, en.id, `${lang}: 카드가 en과 다르다`);
    if (lang !== 'en') {
      assert.notEqual(v.color[0], en.color[0], `${lang}: 색 이름이 영어 그대로다 — ${v.color[0]}`);
    }
  }
});

test('열 언어의 행운색 표가 같은 길이·같은 hex다', () => {
  const en = luckyColors('en');
  for (const lang of ['ko', ...INTL_LOCALES10] as const) {
    const c = luckyColors(lang);
    assert.equal(c.length, en.length, `${lang}: 색 개수가 다르다`);
    for (let i = 0; i < c.length; i++) {
      assert.equal(c[i][1], en[i][1], `${lang}: ${i}번째 hex가 다르다`);
      assert.ok(c[i][0].trim().length > 0, `${lang}: ${i}번째 색 이름이 비었다`);
    }
  }
});

test('오늘의 타로를 그리는 컴포넌트가 렌더 중에 오늘 날짜를 읽지 않는다', async () => {
  // 아홉 언어는 빌드에서 통째로 구워진다 — 렌더에서 new Date()를 부르면
  // 배포한 날의 카드가 HTML에 박혀 다음 배포까지 그대로 나가고,
  // 붙는 순간 오늘 카드로 갈리며 하이드레이션이 깨진다.
  const { readFileSync } = await import('node:fs');
  const { join } = await import('node:path');
  const src = readFileSync(join(import.meta.dirname, '..', 'components/fortune/TarotIntl.tsx'), 'utf8');
  assert.ok(
    src.includes('useSyncExternalStore'),
    'useSyncExternalStore로 서버는 null, 브라우저는 오늘 값을 주어야 한다',
  );
  assert.ok(
    !/useMemo\([^)]*\bnew Date\(\)/.test(src),
    'useMemo 안에서 new Date()를 부르면 서버에서도 돈다',
  );
});
