import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { COUPANG, COUPANG_DISCLOSURE, COUPANG_MIN_WIDTH, coupangWidgetUrl } from '../lib/coupang.ts';

/**
 * 쿠팡 파트너스 광고에서 지켜야 하는 것.
 *
 * 광고 자체는 iframe 안에서 쿠팡이 그리므로 우리가 지킬 것은 셋뿐이다 —
 * 대가성 표기, 폭, 그리고 «걷어낸 것이 정말 걷혔는가».
 */

const ROOT = join(import.meta.dirname, '..');
const AD = readFileSync(join(ROOT, 'components', 'CoupangAd.tsx'), 'utf8');

/**
 * 주석을 걷어낸 코드.
 *
 * 「1200을 하드코딩하지 마라」 검사를 파일 전체에 걸었더니 **그 규칙을 설명하는
 * 주석 자체가** 걸렸다(width:"1200"이라고 예시를 적어 두었다). 규칙이 지키려는
 * 것은 코드이지 설명이 아니다.
 */
const AD_CODE = AD.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

test('대가성 표기가 광고 위에 있다', () => {
  /*
   * 공정위가 요구하는 표기다. 광고 «아래»에 적으면 이미 다 보고 난 뒤라
   * 뜻이 없다. 마크업에서 문구가 슬롯보다 먼저 나오는지 본다.
   */
  const iDisclosure = AD.indexOf('COUPANG_DISCLOSURE');
  const iSlot = AD.indexOf('ref={slot}');
  assert.ok(iDisclosure > 0, '고지 문구를 안 쓰고 있다');
  assert.ok(iSlot > 0, '광고 슬롯을 못 찾았다');
  assert.ok(iDisclosure < iSlot, '고지가 광고보다 아래에 있다');
});

test('고지 문구가 「포스팅」이 아니라 「페이지」다', () => {
  /* 「포스팅」은 블로그 글에 쓰는 말이라 이 사이트에는 안 맞는다 */
  assert.ok(COUPANG_DISCLOSURE.includes('이 페이지는'), `문구가 «${COUPANG_DISCLOSURE}»다`);
  assert.ok(!COUPANG_DISCLOSURE.includes('포스팅'), '아직 「포스팅」이라고 적혀 있다');
  /* 빠지면 안 되는 세 마디 */
  for (const must of ['쿠팡 파트너스', '수수료']) {
    assert.ok(COUPANG_DISCLOSURE.includes(must), `«${must}»가 빠졌다`);
  }
});

test('너비를 상수로 박지 않는다', () => {
  /*
   * 쿠팡 위젯은 **넘긴 width 그대로 iframe을 박는다.** 반응형이 아니다.
   * 실측: width 1200 → iframe 1200px → 모바일에서 문서 scrollWidth 1200.
   * 그래서 붙는 자리를 재서 넘겨야 한다.
   */
  assert.ok(/clientWidth/.test(AD_CODE), '컨테이너 너비를 재지 않는다');
  assert.ok(/coupangWidgetUrl\(width\)/.test(AD_CODE), '잰 너비를 위젯 주소에 안 넘긴다');
  /* 쿠팡이 예시로 주는 1200이 코드에 남아 있으면 안 된다 */
  assert.ok(!/1200/.test(AD_CODE), '1200이 하드코딩돼 있다');
  assert.ok(COUPANG_MIN_WIDTH >= 100, '최소 너비가 너무 작다');
});

test('쿠팡 g.js를 쓰지 않는다', () => {
  /*
   * 붙여서 재 봤더니 g.js는 <ins>를 **document.body 끝**에 붙인다.
   * document.currentScript를 안 보므로 React가 그리는 자리에 담을 수 없다.
   * 그 스크립트가 만들어 내는 iframe을 우리가 직접 그린다.
   */
  assert.ok(!/g\.js|PartnersCoupang/.test(AD_CODE), 'g.js를 다시 끌어다 쓰고 있다');
  assert.ok(/<iframe/.test(AD), '위젯 iframe을 직접 안 그린다');
  assert.ok(/minHeight/.test(AD), '높이를 미리 안 잡아 광고가 뜰 때 화면이 밀린다');
  assert.ok(/loading="lazy"/.test(AD), '본문 아래 광고를 즉시 받아 온다');
});

test('위젯 주소에 트래킹 코드가 들어간다', () => {
  /* 빠지면 광고는 뜨는데 수수료가 안 붙는다 — 화면으로는 구별이 안 되는 종류다 */
  const url = coupangWidgetUrl(358);
  assert.ok(url.startsWith('https://ads-partners.coupang.com/widgets.html?'), url);
  const q = new URL(url).searchParams;
  assert.equal(q.get('trackingCode'), COUPANG.trackingCode);
  assert.equal(q.get('id'), String(COUPANG.id));
  assert.equal(q.get('width'), '358', '잰 너비가 주소에 안 들어간다');
  assert.equal(q.get('height'), String(COUPANG.height));
  assert.equal(q.get('template'), 'carousel');
});

test('한국어가 아니면 아예 안 그린다', () => {
  /* 쿠팡은 한국에서만 산다 — 아홉 언어 화면에 띄우면 자리만 버린다 */
  assert.ok(/lang === 'ko'/.test(AD), '언어를 안 가린다');
  assert.ok(/if \(!enabled\) return null/.test(AD), '한국어가 아닐 때도 무언가 그린다');
});

/*
 * ── 「광고를 못 받으면 고지도 숨긴다」를 뺐다 ────────────────
 * g.js를 쓰던 때는 스크립트 로드 실패를 알 수 있어서 그때 고지도 감췄다.
 * iframe으로 바꾼 뒤에는 남의 출처라 실패를 알 수 없고, 알 필요도 없다 —
 * 고지문이 말하는 것은 «이 광고가 떴다»가 아니라 «이 페이지가 파트너스
 * 활동을 한다»이고, 그건 광고가 안 떠도 참이다.
 */

test('코인 거래소 제휴가 남김없이 걷혔다', () => {
  /*
   * 제휴 카드가 붙은 화면이 일흔 곳인데 내주는 것은 코인 선물 거래소 둘뿐이라,
   * BMI·사주·실수령액을 보러 온 사람에게 엉뚱한 것을 내밀고 있었다. 걷어냈다.
   * 한 곳이라도 남으면 지운 lib/referral.ts를 찾다가 빌드가 죽는다.
   */
  /* import와 JSX만 본다 — 주석에 남은 옛 이름은 잔재가 아니라 내력이다 */
  const left = execSync(
    "grep -rln \"from '.*Referral\\|<ReferralCards\\|<ReferralAside\\|from '@/lib/referral\" app components lib || true",
    { cwd: ROOT, encoding: 'utf8' },
  ).trim().split('\n').filter(Boolean);
  assert.deepEqual(left, [], `제휴 잔재가 남았다:\n  ${left.join('\n  ')}`);
});

test('이 검사가 실제로 문다', () => {
  /* 위 검사들이 «파일을 못 읽어서» 조용히 통과하는 것이 아님을 확인한다 */
  assert.ok(AD.length > 1500, `CoupangAd.tsx가 ${AD.length}자뿐이다 — 경로가 틀렸다`);
  assert.equal(COUPANG.template, 'carousel');
  assert.ok(COUPANG.id > 0 && COUPANG.trackingCode.length > 3, '파트너스 설정이 비었다');

  /* 규칙을 일부러 어긴 표본이 걸려야 한다 */
  assert.ok(/1200/.test('width: "1200"'), '1200 규칙이 원본을 못 잡는다');
  /* 주석 걷기가 헛돌면 AD_CODE가 통째로 비어 위 검사가 전부 거짓 통과한다 */
  assert.ok(AD_CODE.length > 800, `주석을 걷었더니 ${AD_CODE.length}자뿐이다`);
  assert.ok(AD_CODE.includes('coupangWidgetUrl'), '코드가 통째로 사라졌다');
  assert.ok(!AD_CODE.includes('g.js를 안 쓴다'), '주석이 안 걷혔다');
  assert.ok(!'이 페이지는 쿠팡 파트너스'.includes('포스팅'));
  assert.ok('이 포스팅은 쿠팡 파트너스'.includes('포스팅'), '포스팅 규칙이 원본을 못 잡는다');
});

test('한 화면에 광고가 둘 뜨지 않는다', () => {
  /*
   * 코인 카드는 본문 하나 + 옆 레일 하나로 두 자리를 썼다. 레일을 걷어내면서
   * 기계적으로 바꿨더니 **CalcShell에 CoupangAd가 둘** 남아, 계산기 화면마다
   * 광고가 두 번 떴다(브라우저에서 세 보고 알았다).
   *
   * 한 파일 안의 개수만 본다. 페이지가 본문에 직접 넣을 때는 푸터 쪽을
   * referral={false}로 끄는 규칙이 따로 있고, 그건 아래 검사가 본다.
   */
  const files = execSync("grep -rl '<CoupangAd' app components lib || true",
    { cwd: ROOT, encoding: 'utf8' }).trim().split('\n').filter(Boolean);
  const twice: string[] = [];
  for (const f of files) {
    const n = (readFileSync(join(ROOT, f), 'utf8').match(/<CoupangAd\b/g) ?? []).length;
    if (n > 1) twice.push(`${f}: ${n}번`);
  }
  assert.deepEqual(twice, [], `한 파일에 광고가 두 번 들어갔다:\n  ${twice.join('\n  ')}`);
});

test('본문에 광고를 넣은 페이지는 푸터 쪽을 끈다', () => {
  /* 안 끄면 본문 하나 + 푸터 하나로 한 화면에 둘이 된다 */
  const files = execSync("grep -rl '<CoupangAd' app || true",
    { cwd: ROOT, encoding: 'utf8' }).trim().split('\n').filter(Boolean);
  const bad = files.filter(f => {
    const src = readFileSync(join(ROOT, f), 'utf8');
    return src.includes('<SiteFooter') && !src.includes('referral={false}');
  });
  assert.deepEqual(bad, [], `본문 광고와 푸터 광고가 겹친다:\n  ${bad.join('\n  ')}`);
});
