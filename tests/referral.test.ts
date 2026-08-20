import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import {
  REFERRALS, RANKED_REFERRALS, REFERRAL_REL, hasRankBasis, referralHref, referralSubId,
} from '../lib/referral.ts';
import { ALL_LOCALES10 } from '../lib/locales.ts';
import { appEntries, appFile, appJoin, footerSrc } from './app-path.ts';

const ROOT = join(import.meta.dirname, '..');
/*
 * 전에는 out/을 봤다. ISR로 바꾸면서 out/이 없어졌는데 조건을 안 고쳐서
 * 아래 검사가 말없이 건너뛰고 있었다. HTML은 .next/server/app, 번들은
 * .next/static에 있다 — out/일 때 한 그릇이던 것이 둘로 갈렸다.
 */
const OUT = join(ROOT, '.next', 'server', 'app');
const STATIC = join(ROOT, '.next', 'static');
const built = existsSync(OUT) && existsSync(STATIC);

test('제휴 링크가 lib/referral.ts 한 곳에서만 관리된다', () => {
  // 링크가 두 벌로 갈라지면 한쪽만 바뀌는 사고가 난다.
  // (실제로 크립토 페이지가 별도로 하드코딩하고 있었다.)
  const hardcoded: string[] = [];

  const scan = (dir: string) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, e.name);
      if (e.isDirectory()) { scan(p); continue; }
      if (!/\.tsx?$/.test(e.name)) continue;
      if (relative(ROOT, p) === join('lib', 'referral.ts')) continue;

      const src = readFileSync(p, 'utf8');
      for (const r of REFERRALS) {
        const host = new URL(r.href).host;
        if (src.includes(host)) hardcoded.push(`${relative(ROOT, p)}: ${host}`);
      }
    }
  };
  for (const d of ['app', 'components', 'lib']) scan(join(ROOT, d));

  assert.deepEqual(hardcoded, [], `제휴 링크를 직접 박아둔 곳:\n  ${hardcoded.join('\n  ')}`);
});

test('제휴 링크에 rel="sponsored"가 붙는다', () => {
  // 제휴 링크임을 검색엔진에 알리지 않으면 링크 스팸으로 취급될 수 있다.
  assert.match(REFERRAL_REL, /sponsored/, 'rel에 sponsored가 없다');
  assert.match(REFERRAL_REL, /noopener/, 'rel에 noopener가 없다 — 새 탭 보안');

  const card = readFileSync(join(ROOT, 'components', 'ReferralCards.tsx'), 'utf8');
  assert.match(card, /rel=\{REFERRAL_REL\}/, '카드가 REFERRAL_REL을 쓰지 않는다');
});

test('제휴 카드가 광고임을 명시한다', () => {
  // 광고임을 숨기면 당장은 클릭이 늘어도 신뢰를 잃는다.
  // 푸터에 있던 표기를 카드로 옮겼으므로 검사도 카드를 본다.
  const card = readFileSync(join(ROOT, 'components', 'ReferralCards.tsx'), 'utf8');
  assert.match(card, /'광고'/, '한국어 광고 표기가 없다');
  assert.match(card, /'Ad'/, '영어 광고 표기가 없다');
});

test('제휴 카드가 "광고"임을 명시한다(관계 고지)', () => {
  // 위험 고지 문구는 사이트 소유자 결정으로 뺐다. 다만 제휴 관계를 알리는
  // "광고" 표기는 유지한다 — 이건 위험 경고가 아니라 광고 표시라 별개이고,
  // 숨기면 신뢰와 검색 신호를 잃는다.
  const card = readFileSync(join(ROOT, 'components', 'ReferralCards.tsx'), 'utf8');
  assert.match(card, /'광고'/, '광고 표기가 사라졌다');
});

test('결과 화면 노출이 팝업이 아니라 본문에 들어간다', () => {
  // 인터스티셜·오버레이는 애드센스 정책에 걸린다. 저품질 판정을 한 번 받은
  // 사이트에서는 특히 위험하고, 사용자가 보려고 누른 결과를 가리면 광고를
  // 보기 전에 뒤로 가기를 누른다.
  const card = readFileSync(join(ROOT, 'components', 'ReferralCards.tsx'), 'utf8');
  for (const banned of ['fixed inset-0', 'position: fixed', 'z-50', 'backdrop-blur', 'role="dialog"']) {
    assert.ok(!card.includes(banned), `오버레이로 보이는 마크업: ${banned}`);
  }

  // 두 결과 화면이 실제로 카드를 렌더하는지 확인한다.
  for (const engine of ['TestEngine.tsx', 'QuizEngine.tsx']) {
    const src = readFileSync(join(ROOT, 'components', engine), 'utf8');
    // 엔진은 lang을 받아 넘긴다 — 문자열을 못 박으면 언어를 넘기는 순간 깨진다
    assert.match(src, /<Ad lang=\{lang\} placement="result" \/>|<Ad \/>/, `${engine}: 결과 화면에 광고가 없다`);
  }
});

test('"1위" 문구는 무엇에 대한 1위인지 밝힌다', () => {
  // 근거 없는 종합 순위("코인 선물 사이트 1위")를 사실처럼 내보내지 않기 위한 규칙이다.
  // 돈이 오가는 결정을 앞둔 사람에게 확인할 수 없는 순위를 보여주면 안 된다.
  for (const r of REFERRALS) {
    for (const [lang, copy] of Object.entries(r.copy)) {
      assert.ok(hasRankBasis(copy.rankLabel), `${r.id}.${lang}: 순위 근거 없음 — "${copy.rankLabel}"`);
    }
  }
});

test('근거 없는 순위 문구는 규칙에 걸린다', () => {
  // 규칙이 실제로 거르는지 확인한다 — 통과만 하는 검사는 아무것도 지키지 못한다.
  assert.equal(hasRankBasis('1위'), false);
  assert.equal(hasRankBasis('#1'), false);
  assert.equal(hasRankBasis('선물 거래량 1위'), true);
  assert.equal(hasRankBasis('#1 new-user bonus'), true);
});

test('모든 제휴 항목에 열 언어 문구가 다 있다', () => {
  // 이 카드는 푸터에 있어 모든 화면에 뜬다. 한 언어라도 비면 그 언어권 화면
  // 아래에 빈 카드나 남의 언어 광고가 붙는다.
  for (const r of REFERRALS) {
    assert.equal(Object.keys(r.copy).length, ALL_LOCALES10.length, `${r.id}: 언어 수가 다르다`);
    for (const [lang, copy] of Object.entries(r.copy)) {
      assert.ok(copy.rankLabel.length > 0, `${r.id}.${lang}: rankLabel 누락`);
      assert.ok(copy.bonus.length > 0, `${r.id}.${lang}: bonus 누락`);
      assert.ok(copy.perks.length > 0, `${r.id}.${lang}: perks 비어 있음`);
      assert.ok(copy.cta.length > 0, `${r.id}.${lang}: cta 누락`);
    }
    assert.ok(r.href.startsWith('https://'), `${r.id}: https가 아니다`);
  }
});

test('노출 순서에 중복이나 빈틈이 없다', () => {
  const ranks = REFERRALS.map(r => r.rank);
  assert.equal(new Set(ranks).size, ranks.length, 'rank 중복');
  assert.deepEqual([...ranks].sort(), REFERRALS.map((_, i) => i + 1), 'rank가 1부터 연속이 아니다');
  assert.deepEqual(RANKED_REFERRALS.map(r => r.rank), [...ranks].sort());
});

test('혜택 금액이 화면 쪽에 하드코딩돼 있지 않다', () => {
  // 예전에는 푸터와 signals 페이지가 각각 금액을 박아두고 있었다.
  // 프로모션이 바뀔 때 한 군데만 고치면 두 화면이 다른 금액을 말하게 된다.
  const amounts = REFERRALS.flatMap(r => Object.values(r.copy).map(c => c.bonus))
    .map(b => b.replace(/[^0-9,]/g, ''))
    .filter(n => n.length > 0);

  for (const file of [
    join('components', 'ReferralCards.tsx'),
    join('components', 'SiteFooter.tsx'),
    join('app', 'crypto', 'signals', 'page.tsx'),
  ]) {
    const src = readFileSync(file.startsWith('app/') ? appFile(file) : join(ROOT, file), 'utf8');
    for (const n of amounts) {
      assert.ok(!src.includes(`$${n}`), `${file}: 금액 $${n}이 하드코딩돼 있다`);
    }
  }
});

test('빌드된 페이지에 제휴 링크가 실린다', { skip: built ? false : '빌드 산출물 없음 — npm run build 필요' }, () => {
  const walk = (dir: string, out: string[] = []): string[] => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, e.name);
      if (e.isDirectory()) walk(p, out);
      // 확장자로 거르지 않는다 — HTML만 모으면 JS 번들 검사가 빈 배열을 보고
      // 조용히 통과한다(실제로 그렇게 통과할 뻔했다). 거르기는 호출부에서 한다.
      else out.push(p);
    }
    return out;
  };

  const host = new URL(REFERRALS[0].href).host;

  // 푸터에서 카드를 뺐으므로 "모든 HTML에 들어 있다"는 더 이상 성립하지 않는다.
  // 지금은 두 경로로 나간다.
  //
  //  1) 계산기는 CalcShell이 서버 렌더라 정적 HTML에 그대로 실린다.
  //  2) 나머지 섹션은 결과가 나온 뒤에 그리므로 정적 HTML이 아니라 JS 번들에 있다.
  //     (테스트·퀴즈 결과 화면, 생성기 결과, 체크리스트 진행 중, 운세)
  //
  // 둘 다 확인한다 — 한쪽만 보면 반대쪽이 통째로 빠져도 통과한다.
  //
  // en/ja는 제외한다. 로컬라이즈된 계산기 허브라 CalcShell을 쓰지 않고, 제휴 문구도
  // 한국어·영어만 있어서 일본어 페이지에 넣을 것이 없다.
  const LOCALIZED_HUBS = ['en.html', 'ja.html'];
  // route group 때문에 계산기가 app 바로 밑이 아닐 수 있다 — 이름으로 찾는다
  const calcRoot = ['calculator', ...readdirSync(OUT, { withFileTypes: true })
    .filter(e => e.isDirectory() && e.name.startsWith('('))
    .map(e => join(e.name, 'calculator'))]
    .map(r => join(OUT, r)).find(existsSync);
  assert.ok(calcRoot, '빌드 산출물에서 계산기 폴더를 못 찾았다');
  const calcPages = walk(calcRoot)
    .filter(p => p.endsWith('.html'))
    .filter(p => !LOCALIZED_HUBS.includes(p.split('/').pop()!));

  const withRef = calcPages.filter(p => readFileSync(p.startsWith('app/') ? appFile(p) : p, 'utf8').includes(host));
  assert.ok(calcPages.length > 50, `계산기 페이지가 ${calcPages.length}개뿐 — 경로가 바뀌었나`);
  assert.equal(withRef.length, calcPages.length,
    `계산기 ${calcPages.length}개 중 ${withRef.length}개에만 제휴 링크가 있다`);

  const chunks = walk(STATIC).filter(p => p.endsWith('.js'));
  const inBundle = chunks.some(p => readFileSync(p.startsWith('app/') ? appFile(p) : p, 'utf8').includes(host));
  assert.ok(inBundle, '결과 화면용 번들에 제휴 링크가 없다 — 결과 지점 노출이 통째로 빠졌다');
});

test('crypto 페이지가 모두 제휴 노출을 갖는다', () => {
  // 푸터에서 카드를 뺐을 때 crypto 5개 중 4개가 통째로 비었다. 제휴가 가장
  // 맥락에 맞는 섹션인데도 signals에만 남아 있었다 — 나머지는 푸터에 기대고 있었다.
  const dir = appJoin('crypto');
  const pages: string[] = [];
  const collect = (d: string) => {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      const p = join(d, e.name);
      if (e.isDirectory()) collect(p);
      else if (e.name === 'page.tsx') pages.push(p);
    }
  };
  collect(dir);

  assert.ok(pages.length >= 5, `crypto 페이지가 ${pages.length}개뿐 — 경로가 바뀌었나`);
  const missing = pages
    .filter(p => !readFileSync(p.startsWith('app/') ? appFile(p) : p, 'utf8').includes('<Ad'))
    .map(p => relative(ROOT, p));
  assert.deepEqual(missing, [], `제휴 노출이 없는 crypto 페이지: ${missing.join(', ')}`);
});

test('한국어 페이지에 영어 제휴 문구가 붙지 않는다', () => {
  // 김프만 한국어 페이지라 lang="en"을 붙이면 본문과 언어가 어긋난다.
  const src = readFileSync(appJoin('crypto', 'kimchi-premium', 'page.tsx'), 'utf8');
  assert.match(src, /<Ad lang="ko"|<Ad \/>/, '김프 페이지에 한국어 광고가 아니다');
});

test('운세 페이지가 모두 결과 지점 노출을 갖는다', () => {
  // 푸터에서 카드를 뺀 뒤, FortuneDisplay를 안 쓰는 페이지 4개(dream·tarot·biorhythm·
  // name-match)가 조용히 카드 없이 남아 있었다. 페이지마다 결과를 그리는 방식이
  // 달라서 눈으로는 안 보였다 — 목록으로 훑어야 잡힌다.
  const dir = appJoin('fortune');
  const pages = readdirSync(dir, { withFileTypes: true })
    .filter(e => e.isDirectory())
    .map(e => e.name);

  assert.ok(pages.length >= 9, `운세 페이지가 ${pages.length}개뿐 — 경로가 바뀌었나`);

  // 결과 지점 카드를 대신 들고 있는 컴포넌트들. 하나라도 쓰면 노출이 보장된다.
  //  - FortuneDisplay: 별자리·띠·MBTI 운세·혈액형·오늘의 종합운세
  //  - MatchResultCard: 궁합 4종(띠·별자리·혈액형·MBTI)의 공용 결과 카드
  //  - ReferralCards: 직접 배치(dream·tarot·biorhythm·name-match)
  const CARRIERS = ['FortuneDisplay', 'MatchResultCard', '<Ad', 'SiteFooter'];
  // card는 타로 78장을 찾아보는 자료 목록이라 "내 결과"가 없다 — 공유할 결과 지점도 없다
  const REFERENCE_ONLY = ['card'];
  /*
   * 페이지가 화면을 components/의 컴포넌트에 넘기기도 한다 — 2026-08-15에 사주가
   * 그렇게 됐다(page.tsx는 <SajuKo />만 그린다). 안 따라가면 멀쩡한 위임을
   * "빠졌다"고 한다. 아래 스냅 검사가 이미 같은 일을 한다.
   */
  const carried = (src: string, depth = 0): boolean => {
    if (CARRIERS.some(c => src.includes(c))) return true;
    if (depth > 0) return false;
    for (const m of src.matchAll(/from '@\/(components\/[\w/.-]+)'/g)) {
      for (const ext of ['.tsx', '.ts']) {
        const f = join(ROOT, m[1] + ext);
        if (!existsSync(f)) continue;
        if (carried(readFileSync(f, 'utf8'), depth + 1)) return true;
      }
    }
    return false;
  };
  const missing = pages.filter(slug => !REFERENCE_ONLY.includes(slug)).filter(slug =>
    !carried(readFileSync(join(dir, slug, 'page.tsx'), 'utf8')));
  assert.deepEqual(missing, [], `결과 지점 노출이 없는 운세 페이지: ${missing.join(', ')}`);

  // 대리 컴포넌트(MatchResultCard)가 실제로 제휴 카드를 들고 있는지 확인 —
  // 여기서 빠지면 궁합 4종이 한꺼번에 조용히 사라진다.
  const mrc = readFileSync(join(ROOT, 'components', 'MatchResultCard.tsx'), 'utf8');
  assert.match(mrc, /<Ad \/>|<Ad lang/, 'MatchResultCard에 광고가 없다');
});

test('스냅 페이지가 모두 결과 지점 노출을 갖는다', () => {
  // 대부분은 SaveResultCard(스냅 전용)가 대신 들고, first-impression만 직접 붙인다.
  // 새 스냅 페이지를 만들 때 둘 중 하나도 안 쓰면 여기서 걸린다.
  //
  // 페이지가 화면을 components/snap의 컴포넌트에 넘기는 것도 있다(새 다섯이
  // MeasuredTest 하나를 함께 쓴다). 그때는 그 컴포넌트까지 따라가서 본다 —
  // 안 따라가면 멀쩡한 위임을 "빠졌다"고 한다.
  const snapDir = appJoin('snap');
  const pages = readdirSync(snapDir, { withFileTypes: true })
    .filter(e => e.isDirectory())
    .map(e => e.name);

  assert.ok(pages.length >= 11, `스냅 페이지가 ${pages.length}개뿐 — 경로가 바뀌었나`);

  // lens는 렌즈 화각 104가지를 찾아보는 자료 목록이라 "내 결과"가 없다 — 공유할 결과 지점도 없다
  const REFERENCE_ONLY = ['lens'];
  const shows = (src: string) => src.includes('SaveResultCard') || src.includes('<Ad');
  const missing = pages.filter(slug => !REFERENCE_ONLY.includes(slug)).filter(slug => {
    const src = readFileSync(join(snapDir, slug, 'page.tsx'), 'utf8');
    if (shows(src)) return false;
    // 화면을 넘긴 곳까지 한 겹 따라간다
    return ![...src.matchAll(/from '@\/components\/snap\/(\w+)'/g)]
      .map(m => join(ROOT, 'components', 'snap', `${m[1]}.tsx`))
      .filter(existsSync)
      .some(f => shows(readFileSync(f, 'utf8')));
  });
  assert.deepEqual(missing, [], `결과 지점 노출이 없는 스냅 페이지: ${missing.join(', ')}`);
});

test('SaveResultCard가 제휴 카드를 들고 있다', () => {
  // 스냅 10개가 이 컴포넌트 하나에 의존한다. 여기서 빠지면 10개가 한꺼번에 조용히 빠진다.
  const src = readFileSync(join(ROOT, 'components', 'SaveResultCard.tsx'), 'utf8');
  assert.match(src, /<Ad lang=\{lang\} \/>|<Ad \/>/, 'SaveResultCard에 광고가 없다');
});

test('푸터가 제휴 카드를 세우되 끌 수 있다', () => {
  /*
    한때 푸터에서 카드를 뺐던 적이 있다. 이유는 둘이었다 — 결과 지점 카드와
    겹쳐 한 페이지에 두 번 얹혔고, 짧은 계산기 페이지에서 광고 대 콘텐츠 비율이
    나빠졌다.

    그래서 손으로 넣는 방식으로 돌아갔는데, 그쪽의 값이 더 컸다. 카드가 코인·
    운세·뽑기·관상 네 섹션에만 남고 나머지 스물일곱 섹션 — 방문의 대부분 — 에는
    아예 없었다. 새 페이지를 만들 때마다 또 빠졌다.

    지금은 푸터가 기본으로 세우고, 자기 카드를 세운 페이지가 referral={false}로
    끈다. 겹침은 tests/referral-coverage.test.ts가 양방향으로 막는다. 계산기는
    CalcShell이 이미 자기 카드를 갖고 있어 예전 밀도 그대로다.
  */
  const footer = footerSrc();
  assert.match(footer, /<Ad lang=\{lang\} \/>/, '푸터에 광고가 없다');
  assert.match(footer, /referral = true/, '푸터 카드를 끌 수 있는 문이 없다');
  assert.match(footer, /\{referral &&/, 'referral을 실제로 보고 있지 않다');
});

test('sub-id가 짧고 안전한 낱말이다', () => {
  /*
    거래소 쪽은 파라미터가 길면 자른다. 잘린 값끼리는 구별이 안 되므로 애초에
    짧게 만들고, 인코딩이 필요한 글자를 남기지 않는다.
  */
  assert.equal(referralSubId('ko', 'result', 'calc'), 'ko-calc-result');
  assert.equal(referralSubId('zh-hans', 'rail'), 'zh-hans-rail');
  // 섹션 이름에 무엇이 들어와도 소문자·숫자·하이픈만 남는다 (공백·슬래시·한글 모두)
  assert.equal(referralSubId('en', 'section', 'Body Fat /calc'), 'en-body-fat-calc-section');
  for (const s of [
    referralSubId('ko', 'result', '아주 긴 섹션 이름 that keeps going and going'),
    referralSubId('pt-br', 'result', 'unit-converter-temperature-kelvin'),
  ]) {
    assert.ok(s.length <= 32, `sub-id가 32자를 넘는다: ${s}`);
    assert.match(s, /^[a-z0-9]+(-[a-z0-9]+)*$/, `sub-id에 안전하지 않은 글자가 있다: ${s}`);
  }
});

test('sub-id 파라미터를 확인한 거래소에만 붙인다', () => {
  /*
    확인 안 된 파라미터를 붙였다가 링크가 깨지면 수익이 0이 된다.
    지금은 두 곳 다 subIdParam이 없다 — Bybit은 짧은 리디렉션 링크라 모르는
    쿼리를 어떻게 다루는지 확인이 안 됐고, Binance는 대시보드에서 초대 코드를
    따로 만들어 채널을 가른다(문서에 sub-id 파라미터가 없다).
    그래서 링크는 글자 하나 달라지지 않아야 한다.
  */
  for (const r of REFERRALS) {
    if (r.subIdParam) continue;
    assert.equal(referralHref(r, 'ko-calc-result'), r.href, `${r.id}: 확인 안 된 파라미터가 붙었다`);
  }

  // 파라미터 이름을 확인해 적어 넣으면 그때는 실제로 붙어야 한다.
  const withParam = { ...REFERRALS[0], subIdParam: 'sub_id' };
  const u = new URL(referralHref(withParam, 'ko-calc-result'));
  assert.equal(u.searchParams.get('sub_id'), 'ko-calc-result');
  assert.equal(u.origin + u.pathname, new URL(REFERRALS[0].href).origin + new URL(REFERRALS[0].href).pathname,
    '파라미터를 붙이면서 링크의 몸통이 바뀌었다');
});

test('제휴 링크를 만드는 곳이 referralHref 하나다', () => {
  // 문자열이 화면 쪽에 흩어지면 한 곳만 고쳐지고 나머지는 옛 링크로 남는다.
  for (const f of ['ReferralCards.tsx']) {
    const src = readFileSync(join(ROOT, 'components', f), 'utf8');
    assert.match(src, /href=\{referralHref\(r, subId\)\}/, `${f}: referralHref를 거치지 않는다`);
    assert.match(src, /data-ref-sub=\{subId\}/, `${f}: sub-id를 마크업에 남기지 않는다 — GA가 읽을 것이 없다`);
  }
  // GA가 그 값을 실제로 읽어 보낸다 (거래소가 안 받아 주므로 우리 쪽 유일한 눈이다)
  const ga = readFileSync(join(ROOT, 'components', 'GoogleAnalytics.tsx'), 'utf8');
  assert.match(ga, /data-ref-sub/, 'GA가 제휴 클릭을 읽지 않는다');
  assert.match(ga, /referral_click/, 'GA에 제휴 클릭 이벤트가 없다');
});
