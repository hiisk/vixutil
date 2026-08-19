import Link from 'next/link';

import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import LangPicker from '@/components/LangPicker';
import PageGlow from '@/components/PageGlow';
import SiteFooter from '@/components/SiteFooter';
import { langOfLocale } from '@/lib/i18n/lang';
import { localeHref, type AnyLocale10 } from '@/lib/locales';
import {
  ADS_SETTINGS_URL, LEGAL_CHROME, LEGAL_EMAIL, LEGAL_KINDS, LEGAL_LOOK, LEGAL_REVISED,
  legalCopy, legalRoute, type LegalKind,
} from '@/lib/legal';

/**
 * 소개·문의·개인정보 처리방침·이용약관 네 장을 그리는 화면 하나.
 *
 * 40장(갈래 넷 × 언어 열)이 이 컴포넌트를 같이 쓴다. 화면을 갈래마다 만들면
 * 글머리 모양·개정일 자리·언어 버튼이 조금씩 어긋나는데, 정책 문서에서 그
 * 어긋남은 "이 사이트는 이걸 대충 만들었다"로 읽힌다.
 *
 * ── 왜 아래에 네 장을 서로 걸어 두는가 ─────────────────────────
 * 푸터에도 링크가 있지만 푸터는 도구 목록이 먼저 나와 한참 아래다. 심사자와
 * 크롤러가 정책 문서를 훑을 때는 옆 문서로 바로 건너가는 줄이 본문 끝에 있어야
 * 한다 — 네 장이 서로를 걸면 어느 한 장에 들어와도 나머지 셋에 한 번에 닿는다.
 *
 * 제휴 카드(푸터 기본)는 끄지 않는다. 끈 화면은 자기 카드를 세워야 하고
 * (tests/referral-coverage.test.ts) 정책 문서 한가운데에 카드를 놓는 것이
 * 더 나쁘다. 푸터 자리는 본문이 끝난 뒤라 읽는 것을 가로막지 않는다.
 */
export default function LegalPage({ kind, locale }: { kind: LegalKind; locale: AnyLocale10 }) {
  const lang = langOfLocale(locale);
  const copy = legalCopy(kind, lang);
  const chrome = LEGAL_CHROME[lang];
  const look = LEGAL_LOOK[kind];
  const route = legalRoute(kind);
  /* 언어 앞머리는 localeHref가 붙인다 — 한국어는 앞머리가 없다 */
  const homeHref = localeHref(locale, '/');

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: chrome.home, path: homeHref },
          { name: copy.h1, path: localeHref(locale, route) },
        ])}
      />

      <PageGlow accent={look.accent} />
      <div className={`h-1 topbar`} />

      <header className="page-head">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link prefetch={false} href={homeHref} className="page-back hover:text-slate-600 dark:hover:text-slate-300">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {chrome.home}
          </Link>
          <span className="ml-auto shrink-0">
            {/* 네 장은 열 언어가 모두 있으므로 available로 좁히지 않는다 */}
            <LangPicker current={locale} route={`/${kind}`} />
          </span>
        </div>
      </header>

      <main className="relative max-w-3xl mx-auto px-4 py-9">
        <h1 className="page-h1">{copy.h1}</h1>
        <p className="note-sm mb-8">{copy.lead}</p>

        {copy.sections.map(s => (
          <section key={s.h2} className="mb-8">
            <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-2">{s.h2}</h2>
            {s.body.map(p => (
              <p key={p} className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-2">{p}</p>
            ))}

            {s.list && (
              <ul className="mt-3 list-card">
                {s.list.map(item => (
                  <li key={item} className="cell-note">{item}</li>
                ))}
              </ul>
            )}

            {/*
              메일과 광고 설정 링크는 문구가 아니라 상수에서 온다. 열 언어 문구에
              주소를 적으면 바꿀 때 한 곳이 남고, 그 언어만 죽은 주소를 안내한다.
            */}
            {s.mail && (
              <div className="mt-3 rounded-lg border chip-off px-4 py-4">
                <p className="label-caps mb-1.5">{chrome.mailLabel}</p>
                <a
                  href={`mailto:${LEGAL_EMAIL}`}
                  className="text-sm font-bold text-blue-600 dark:text-blue-400 break-all hover:underline"
                >
                  {LEGAL_EMAIL}
                </a>
              </div>
            )}

            {s.ads && (
              <p className="mt-3 text-sm">
                <a
                  href={ADS_SETTINGS_URL}
                  rel="nofollow noopener"
                  target="_blank"
                  className="font-bold text-blue-600 dark:text-blue-400 break-all hover:underline"
                >
                  {ADS_SETTINGS_URL.replace('https://', '')}
                </a>
              </p>
            )}
          </section>
        ))}

        <p className="note-xs border-t border-slate-100 dark:border-slate-800 pt-5">
          {chrome.revised} · {LEGAL_REVISED}
        </p>

        {/* 나머지 세 장으로 건너가는 줄 — 푸터보다 위에서 만나야 한다 */}
        <nav className="foot-nav">
          {LEGAL_KINDS.filter(k => k !== kind).map(k => (
            <Link prefetch={false} key={k} href={localeHref(locale, legalRoute(k))} className="hover:text-slate-600 dark:hover:text-slate-300">
              {chrome.nav[k]}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={locale} />
    </div>
  );
}
