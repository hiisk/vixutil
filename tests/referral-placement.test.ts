/**
 * 제휴 배치 — 한 화면에 몇 번, 어디에 뜨는가.
 *
 * 수익이 제휴에서 나오므로 노출을 늘리는 손질이 자주 들어온다. 그때마다 되돌아가는
 * 실수가 정해져 있어서 여기서 붙든다.
 *
 *  1) 같은 화면에 같은 광고가 두 번 뜬다 — 본문 카드를 세우고 푸터 것을 안 끈다.
 *     방금 운세·스냅 12장을 고쳤다. 이 검사가 이번 작업의 핵심이다.
 *  2) 옆 레일과 본문 카드가 같은 거래소를 나란히 두 번 보여 준다.
 *  3) 옆 레일이 좁은 화면까지 내려와 본문을 밀어내거나 가로 스크롤을 만든다.
 *  4) 새로 만든 링크에 rel="sponsored"가 빠진다.
 *  5) 큰 화면 폭을 손질하다 모바일 폭까지 같이 바뀐다.
 *
 * tests/referral-coverage.test.ts와 1)이 겹치는데, 그쪽은 "조건부로만 뜨는 카드"를
 * 봐주는 예외(들여쓰기 heuristic)를 갖고 있다. 여기서는 예외 없이 본다 —
 * 지금 45장이 이 규칙을 지키고 있어서 예외가 필요 없다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import { RANKED_REFERRALS, REFERRAL_REL, referralSplit } from '../lib/referral.ts';

const ROOT = join(import.meta.dirname, '..');
const ASIDE = join(ROOT, 'components', 'ReferralAside.tsx');
const CARDS = join(ROOT, 'components', 'ReferralCards.tsx');
/** 제휴 레일을 세운 껍데기 — 본문 폭도 여기서 정한다 */
const SHELLS = ['CalcShell.tsx', 'CalcShellIntl.tsx'];

const read = (p: string) => readFileSync(p, 'utf8');

function tsxFiles(dir: string, out: string[] = []): string[] {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) tsxFiles(p, out);
    else if (e.name.endsWith('.tsx')) out.push(p);
  }
  return out;
}

/** 카드를 정의하는 두 파일은 스스로를 세지 않는다 */
const scanned = [...tsxFiles(join(ROOT, 'app')), ...tsxFiles(join(ROOT, 'components'))]
  .filter(f => f !== ASIDE && f !== CARDS && !f.endsWith('SiteFooter.tsx'));

test('같은 화면에 제휴가 두 번 뜨지 않는다', () => {
  /*
    푸터는 referral 기본값이 true라 모든 화면에 카드를 하나 세운다. 본문에 자기
    카드를 세운 화면은 referral={false}로 그 자리를 꺼야 한다. 안 끄면 한 페이지에
    같은 광고가 두 번 뜨고, 짧은 페이지에서는 광고 대 콘텐츠 비율만 나빠진다 —
    저품질 판정을 한 번 받은 사이트에서 감수할 이유가 없다.
  */
  const both: string[] = [];
  const bad: string[] = [];

  for (const f of scanned) {
    const src = read(f);
    if (!src.includes('<ReferralCards') && !src.includes('<ReferralAside')) continue;
    if (!src.includes('<SiteFooter')) continue;
    both.push(relative(ROOT, f));
    if (!src.includes('referral={false}')) bad.push(relative(ROOT, f));
  }

  // 훑는 대상이 실제로 있는지 먼저 확인한다 — 0장을 훑고 통과하는 검사는 아무것도 지키지 못한다.
  assert.ok(both.length >= 40, `제휴 카드와 푸터를 함께 쓰는 파일이 ${both.length}장뿐 — 경로나 컴포넌트 이름이 바뀌었나`);
  assert.deepEqual(bad, [],
    `푸터 카드와 겹친다. <SiteFooter ... referral={false} />로 푸터 자리를 꺼라:\n  ${bad.join('\n  ')}`);
});

test('레일을 세운 껍데기가 푸터 카드를 끈다', () => {
  // 위 검사가 목록으로 잡지만, 레일을 새로 붙인 두 껍데기는 이름으로 못 박아 둔다.
  for (const s of SHELLS) {
    const src = read(join(ROOT, 'components', s));
    assert.match(src, /<ReferralAside/, `${s}: 옆 레일이 없다`);
    assert.match(src, /referral=\{false\}/, `${s}: 푸터 카드를 끄지 않았다`);
  }
});

test('옆 레일과 본문 카드가 같은 제휴를 두 번 보여 주지 않는다', () => {
  /*
    가르는 규칙은 lib/referral.ts의 referralSplit 하나다. 화면 쪽에서 손으로
    고르면 제휴를 하나 더할 때 한쪽만 늘어난다.
  */
  const all = RANKED_REFERRALS.map(r => r.id);
  const { narrow, wide, rail } = referralSplit(true);
  const wideIds = wide.map(r => r.id);
  const railIds = rail.map(r => r.id);

  assert.ok(railIds.length > 0, '레일이 맡은 몫이 비어 있다 — 레일에 보여줄 것이 없다');
  assert.deepEqual(wideIds.filter(id => railIds.includes(id)), [],
    '넓은 화면에서 본문 카드와 레일이 같은 거래소를 보여준다');
  assert.deepEqual([...wideIds, ...railIds].sort(), [...all].sort(),
    '가르고 나니 사라진 거래소가 있다 — 몫을 합치면 전부여야 한다');

  // 좁은 화면(레일이 없다)에서는 하나도 잃지 않는다. 갈라 놓기만 하면 휴대폰에서 제휴가 줄어든다.
  assert.deepEqual(narrow.map(r => r.id), all, '좁은 화면 본문 카드에서 거래소가 빠졌다');

  // 레일이 없는 화면은 예전 그대로여야 한다.
  const off = referralSplit(false);
  assert.deepEqual(off.rail, [], '레일이 없는데 레일 몫이 있다');
  assert.deepEqual(off.wide.map(r => r.id), all, '레일이 없는 화면에서 본문 카드가 줄었다');
});

test('본문 카드가 레일 몫을 넓은 화면에서만 감춘다', () => {
  // 감추기는 CSS가 한다(서버 렌더라 화면 폭을 모른다). xl:hidden이 빠지면 xl에서
  // 같은 거래소가 두 번 뜨고, lg:hidden으로 잘못 적으면 레일이 없는 lg에서 하나가 사라진다.
  const src = read(CARDS);
  assert.match(src, /xl:hidden/, '본문 카드에 레일 몫을 감추는 xl:hidden이 없다');
  assert.ok(!/(?<!\w)lg:hidden/.test(src), '레일은 xl부터인데 카드를 lg에서 감춘다 — lg 화면에 제휴가 하나 줄어든다');

  for (const s of SHELLS) {
    const shell = read(join(ROOT, 'components', s));
    assert.match(shell, /<ReferralCards[^/]*\brail\b/, `${s}: 레일을 세웠는데 본문 카드에 rail을 안 넘겼다 — 같은 거래소가 두 번 뜬다`);
  }
});

test('옆 레일이 xl 미만에서 렌더되지 않는다', () => {
  /*
    좁은 화면에서 본문을 밀어내거나 가로 스크롤을 만들면 안 된다. lg가 아니라
    xl인 까닭은 본문이 이미 lg에서 672px로 넓어지기 때문이다 — lg에서 둘을 다
    넣으면 본문이 좁아진다.
  */
  const src = read(ASIDE);
  const rail = src.match(/^const RAIL =\s*\n?\s*'([^']+)'/m)?.[1];
  assert.ok(rail, '레일의 클래스 문자열을 찾지 못했다 — 이름이 바뀌었나');

  const tokens = rail.split(/\s+/);
  assert.ok(tokens.includes('hidden'), `레일이 기본으로 감춰져 있지 않다 — ${rail}`);
  assert.ok(tokens.includes('xl:block'), `레일이 xl에서 열리지 않는다 — ${rail}`);
  for (const bp of ['sm:block', 'md:block', 'lg:block']) {
    assert.ok(!tokens.includes(bp), `레일이 xl보다 낮은 곳에서 열린다 — ${bp}`);
  }
});

test('레일 껍데기가 xl 미만의 레이아웃을 건드리지 않는다', () => {
  /*
    껍데기는 xl 미만에서 그냥 블록이어야 한다. 접두어 없는 flex나 max-w가 섞이면
    레일이 안 보이는 화면에서까지 폭이 바뀌고, 최악은 가로 스크롤이 생긴다.
  */
  const src = read(ASIDE);
  const wraps = [...src.matchAll(/^\s*(narrow|wide): '([^']+)',$/gm)];
  assert.equal(wraps.length, 2, 'RAIL_WRAP의 두 갈래를 찾지 못했다');

  for (const [, name, cls] of wraps) {
    for (const tok of cls.split(/\s+/)) {
      if (/^(flex|items-|justify-|gap-|max-w-)/.test(tok)) {
        assert.fail(`RAIL_WRAP.${name}: "${tok}"에 xl: 접두어가 없다 — 좁은 화면 레이아웃이 바뀐다`);
      }
      assert.ok(
        tok.startsWith('xl:') || tok === 'mx-auto' || tok === 'w-full',
        `RAIL_WRAP.${name}: 뜻밖의 클래스 "${tok}" — 좁은 화면에 영향이 없는지 확인하라`,
      );
    }
  }
});

test('넓은 화면에서 본문 + 레일이 껍데기 폭에 들어간다', () => {
  /*
    폭을 눈으로 어림하면 어느 한쪽이 삐져나가 가로 스크롤이 생긴다. 숫자로 센다.
    본문(lg 이상 값) + gap + 레일 ≤ 껍데기 최대 폭.
  */
  const REM = 16;
  const SCALE: Record<string, number> = {
    'max-w-2xl': 42 * REM, 'max-w-4xl': 56 * REM, 'max-w-6xl': 72 * REM, 'max-w-7xl': 80 * REM,
    'gap-8': 2 * REM, 'w-72': 18 * REM,
  };
  const aside = read(ASIDE);

  const wrapCls = (name: string) =>
    aside.match(new RegExp(`^\\s*${name}: '([^']+)',$`, 'm'))?.[1] ?? '';
  const railCls = aside.match(/^const RAIL =\s*\n?\s*'([^']+)'/m)?.[1] ?? '';
  const railW = SCALE[railCls.split(/\s+/).find(t => /^w-\d+$/.test(t)) ?? ''];
  assert.ok(railW >= 280 && railW <= 320, `레일 폭이 280~320px 밖이다 — ${railW}px`);

  // 껍데기 폭과 lg 이상의 본문 폭이 짝을 이룬다
  for (const [name, bodyCls] of [['narrow', 'max-w-2xl'], ['wide', 'max-w-4xl']]) {
    const cls = wrapCls(name);
    const wrapMax = SCALE[cls.split(/\s+/).map(t => t.replace('xl:', '')).find(t => t.startsWith('max-w-')) ?? ''];
    const gap = SCALE[cls.split(/\s+/).map(t => t.replace('xl:', '')).find(t => t.startsWith('gap-')) ?? ''];
    assert.ok(wrapMax && gap, `RAIL_WRAP.${name}: 폭이나 간격을 읽지 못했다 — ${cls}`);
    const need = SCALE[bodyCls] + gap + railW;
    assert.ok(need <= wrapMax,
      `RAIL_WRAP.${name}: 본문 ${SCALE[bodyCls]} + 간격 ${gap} + 레일 ${railW} = ${need}px가 껍데기 ${wrapMax}px를 넘는다`);
  }
});

test('모바일 본문 폭이 바뀌지 않았다', () => {
  /*
    큰 화면을 넓히면서 모바일까지 같이 넓히면 손이 닿는 폭이 깨진다. 접두어 없는
    값은 예전 그대로 두고 lg:만 얹는다.
  */
  for (const s of SHELLS) {
    const src = read(join(ROOT, 'components', s));
    const m = src.match(/const width = wide \? '([^']+)' : '([^']+)';/);
    assert.ok(m, `${s}: 본문 폭을 정하는 한 줄을 찾지 못했다`);
    const [, wideCls, narrowCls] = m;

    assert.equal(narrowCls.split(/\s+/)[0], 'max-w-xl', `${s}: 모바일 기본 폭이 바뀌었다 — ${narrowCls}`);
    assert.equal(wideCls.split(/\s+/)[0], 'max-w-3xl', `${s}: wide의 모바일 폭이 바뀌었다 — ${wideCls}`);
    for (const cls of [narrowCls, wideCls]) {
      for (const tok of cls.split(/\s+/).slice(1)) {
        assert.match(tok, /^(lg|xl):max-w-/, `${s}: "${tok}"에 큰 화면 접두어가 없다 — 모바일 폭이 바뀐다`);
      }
    }
  }
});

test('머리글과 본문이 같은 폭을 쓴다', () => {
  /*
    예전에는 같은 삼항식이 머리글 줄과 본문 줄에 각각 적혀 있었다. 한쪽만 고치면
    제목이 본문과 다른 자리에서 시작한다 — 그래서 폭을 기둥 하나에 두고 둘이
    그 안에 들어간다. 폭이 쓰이는 자리는 정확히 한 곳이어야 한다.
  */
  for (const s of SHELLS) {
    const src = read(join(ROOT, 'components', s));
    const uses = [...src.matchAll(/\$\{width\}/g)].length;
    assert.equal(uses, 1, `${s}: 본문 폭이 ${uses}곳에 적혀 있다 — 기둥 하나만 폭을 갖는다`);
    assert.match(src, /className=\{`\$\{width\} mx-auto w-full min-w-0 xl:mx-0`\}/,
      `${s}: 본문 기둥의 클래스가 예상과 다르다 (min-w-0가 없으면 flex 안에서 넘칠 수 있다)`);
    /*
      ── 문자열 대조에서 «폭을 안 정한다»로 바꿨다 (2026-08-19) ──
      전에는 머리글·본문의 클래스 문자열을 통째로 대조했다. 그래서 여백을 한
      단계 조이거나 머리 타일을 붙이는 것처럼 **폭과 무관한 변경**에도 검사가
      깨졌고, 깨질 때마다 검사를 따라 고치게 되어 검사가 지키려던 것이 흐려졌다.

      지키려던 것은 하나다 — 폭을 정하는 자리가 기둥 하나뿐이어야 한다. 그러니
      머리글과 본문이 «자기 폭을 안 갖는지»를 직접 본다. max-w-가 그 안에
      들어오면 기둥이 둘이 된다.
    */
    const head = src.match(/<div className="[^"]*">\s*\n\s*<PageHero/)?.[0] ?? '';
    assert.ok(head, `${s}: 머리글 자리를 찾지 못했다 — PageHero가 기둥 안에 있어야 한다`);
    assert.doesNotMatch(head, /max-w-/, `${s}: 머리글이 자기 폭을 정하고 있다`);

    const main = src.match(/<main className="[^"]*">/)?.[0] ?? '';
    assert.ok(main, `${s}: <main>을 찾지 못했다`);
    assert.doesNotMatch(main, /max-w-/, `${s}: 본문이 자기 폭을 다시 정하고 있다`);

    /*
      머리는 본문과 **같은 기둥 안**에 있어야 한다. 기둥 밖에 두면 옆 레일 자리만큼
      오른쪽으로 밀려서 제목이 본문과 다른 자리에서 시작한다 — 실제로 그렇게 밀렸고
      화면으로만 보였다. 그래서 기둥은 한 번만 그린다.
    */
    assert.match(src, /function Column\(/, `${s}: 기둥이 한 곳에 없다`);
    assert.equal([...src.matchAll(/<Column[\s>]/g)].length, 1,
      `${s}: 기둥은 하나여야 한다 — 머리도 그 안에 들어간다`);
    const heroIdx = src.indexOf('<PageHero');
    const colIdx = src.indexOf('<Column');
    assert.ok(colIdx >= 0 && heroIdx > colIdx, `${s}: 머리가 기둥 밖에 있다`);
  }
});

test('제휴 링크마다 rel이 붙는다', () => {
  // 제휴 링크임을 검색엔진에 알리지 않으면 링크 스팸으로 취급될 수 있다.
  assert.match(REFERRAL_REL, /sponsored/, 'rel에 sponsored가 없다');
  assert.match(REFERRAL_REL, /noopener/, 'rel에 noopener가 없다 — 새 창 보안');

  for (const f of [CARDS, ASIDE]) {
    const src = read(f);
    const anchors = [...src.matchAll(/<a\b[\s\S]*?>/g)].map(m => m[0]);
    assert.ok(anchors.length > 0, `${relative(ROOT, f)}: 링크를 찾지 못했다`);
    for (const a of anchors) {
      assert.match(a, /rel=\{REFERRAL_REL\}/, `${relative(ROOT, f)}: rel 없는 제휴 링크가 있다`);
      assert.match(a, /target="_blank"/, `${relative(ROOT, f)}: 새 창으로 열지 않는다`);
    }
  }
});

test('옆 레일이 오버레이가 아니다', () => {
  // 화면에 떠서 본문을 가리는 광고는 애드센스 정책에 걸리고, 사용자는 광고를
  // 보기 전에 뒤로 가기를 누른다. sticky는 자리를 차지하며 따라오는 것이라 다르다.
  const src = read(ASIDE);
  assert.ok(!src.includes('role="dialog"'), '오버레이로 보이는 마크업: role="dialog"');

  // 주석에도 "fixed"라는 낱말이 나오므로 원문 전체를 훑지 않는다 — 클래스만 본다.
  // 클래스를 안 보고 원문을 보면 주석을 고쳤을 뿐인데 검사가 깨진다.
  const classes = [
    ...[...src.matchAll(/className="([^"]*)"/g)].map(m => m[1]),
    ...[...src.matchAll(/'([^']*)'/g)].map(m => m[1]),
  ].join(' ');
  for (const banned of ['fixed', 'z-50', 'backdrop-blur']) {
    assert.ok(!classes.split(/\s+/).includes(banned), `오버레이로 보이는 클래스: ${banned}`);
  }
  assert.match(src, /sticky/, '레일이 스크롤을 따라오지 않는다');
  assert.match(src, /max-h-\[calc\(100vh/, '레일 높이가 화면을 넘을 수 있다');
  assert.match(src, /overflow-y-auto/, '레일이 넘칠 때 그 안에서 스크롤되지 않는다');
});
