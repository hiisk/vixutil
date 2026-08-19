/**
 * 계산기 낱장의 공유 카드 (2026-08-18).
 *
 * ── 왜 필요한가 ──────────────────────────────────────────────────
 * 계산기 159장이 카드를 **한 장으로 돌려쓰고 있었다.** /calculator/salary도
 * /calculator/loan도 공유하면 "실생활 계산기 · 85개+"라는 같은 그림이 나갔다.
 * <title>에는 무슨 계산기인지 들어 있는데 그림에는 없다 — 카톡·트위터에서
 * 링크는 그림으로 먼저 읽히므로, 유입이 제일 큰 갈래에서 그 자리를 비워 둔
 * 셈이었다.
 *
 * ── 무엇을 얼마나 여는가 ────────────────────────────────────────
 * 한국어 159 + 열 언어로 낸 것 아홉 언어분. 낱장 카드를 켤 때 재는 것은
 * 페이지 수가 아니라 **열리는 주소 공간**이다(og-cards/index.ts의
 * DETAIL_SECTIONS 머리말). 286,266장을 열면 크롤 한 바퀴가 28.7GB지만 이쪽은
 * 수백 장이고, 그마저 robots.ts가 `/og/*​/*​/*`를 막아 두어 크롤러는 못 가져간다 —
 * 링크 미리보기를 만드는 것들만 통과한다. 값은 공유 횟수를 따라간다.
 *
 * ── 문구는 어디서 오나 ──────────────────────────────────────────
 * 한국어는 계산기 카탈로그(lib/calculator-catalog.ts)가 이미 제목과 한 줄
 * 설명을 들고 있다. 그 밖의 언어는 lib/calc-l10n이 같은 것을 언어별로 들고
 * 있다. 어느 쪽에도 없는 슬러그는 그 언어의 **허브 문구**로 되돌린다 — 지금
 * 나가는 섹션 카드와 같은 말이라 아무것도 나빠지지 않는다.
 *
 * og-cards/render.ts를 여기서 부르지 않는다. 그쪽이 이 파일을 부르므로
 * 서로 물게 되고, 그러면 모듈이 초기화되는 순서에 기대는 코드가 된다.
 */
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { CATS } from '../calculator-catalog.ts';
import { calcCopy } from '../calc-l10n/index.ts';
import { CALC_SHELL } from '../calc-l10n/shell.ts';
import type { CalcLang } from '../calc-l10n/types.ts';
import { localeOfLang, type Lang } from '../i18n/lang.ts';

/** 섹션 카드와 같은 파랑 — 낱장이 계열에서 떨어져 나오지 않게 한다 */
const FROM = '#1d4ed8';
const TO = '#3b82f6';

/** 한국어 카탈로그를 슬러그로 찾는다 — 한 번만 편다 */
const KO = new Map<string, { title: string; desc: string }>(
  CATS.flatMap(c =>
    c.calcs.map(x => [x.href.replace('/calculator/', ''), { title: x.title, desc: x.desc }] as const),
  ),
);

/** 데바나가리는 카드에서 정형되지 않는다 — 색·지하철에서와 같은 이유다 */
const cardLang = (lang: Lang): Lang => (lang === 'hi' ? 'en' : lang);

/** 한국어 섹션 카드와 같은 말 — lib/og-cards/ko.tsx의 'calculator'와 짝이다 */
const KO_HUB = { title: '실생활 계산기', desc: '세금 · 금융 · 대출 · 부동산 · 건강 등 실생활 계산기' };

function copyOf(lang: Lang, slug: string): { title: string; desc: string } {
  const l = cardLang(lang);
  if (l === 'ko') return KO.get(slug) ?? KO_HUB;
  const intl = localeOfLang(l) as CalcLang;
  const c = calcCopy(intl, slug);
  if (c) return { title: c.title, desc: c.short || c.desc };
  const shell = CALC_SHELL[intl];
  return { title: shell.hubTitle, desc: shell.hubLead };
}

/**
 * 계산기 한 장의 카드.
 * 부르는 곳은 lib/og-cards/render.ts의 DETAIL 하나뿐이다.
 */
export function calcCard(lang: Lang, slug: string): ReactElement {
  const { title, desc } = copyOf(lang, slug);
  return ogCard({ icon: '🧮', eyebrow: 'Calculator', title, desc, from: FROM, to: TO });
}
