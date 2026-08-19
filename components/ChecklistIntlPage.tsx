import { UI } from '@/lib/meta/checklist-hub-ui';
import ToolIcon from '@/components/ToolIcon';
import { localesWithItem } from '@/lib/locale-alternates';
import { ALL_LOCALES10 } from '@/lib/locales';
import Link from 'next/link';
import LangPicker from '@/components/LangPicker';
import PageGlow from '@/components/PageGlow';
import ChecklistEngine from '@/components/ChecklistEngine';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import Faq from '@/components/Faq';
import { SECTION_FAQ_INTL } from '@/lib/section-faq-intl';
import { checklistFaqIntl } from '@/lib/content-faq-intl';
import { CHECKLISTS_INTL, CHECKLISTS_INTL_MAP, type ChecklistIntlLang } from '@/lib/checklist-l10n/index';
import { localeAlternates, hubAlternates } from '@/lib/locale-alternates';
import type { Checklist } from '@/lib/types';
import { withCard } from '@/lib/og-cards';

/**
 * 한국어를 뺀 아홉 언어의 체크리스트 허브와 개별 페이지.
 *
 * 심리테스트·퀴즈와 같은 이유로 화면은 한 벌만 둔다([[components/TestIntlPage.tsx]]).
 * 한국어(app/checklist)는 128종이라 목록 구조부터 달라서 자기 화면을 쓴다.
 *
 * 카드 제목에서 "체크리스트"라는 낱말을 떼는 것은 언어마다 다르다 — 영어는
 * ' Checklist'가 뒤에 붙지만 스페인어는 'Lista para …'처럼 앞에 온다. 그래서
 * 잘라낼 문자열을 언어별로 적어 두고, 없으면 제목을 그대로 쓴다.
 */


/* UI 표는 lib/meta/checklist-hub-ui.ts로 옮겼다 — 허브 메타와 같이 쓴다 */


/*
 * 허브는 열 언어, 상세는 아홉 언어다.
 *
 * 항목 목록을 언어마다 따로 썼기 때문에 한국어와 번역판은 겹치는 슬러그가
 * 하나도 없다 — 상세에서 한국어를 띄우면 전부 404다. 하지만 허브 자체는
 * 열 언어에 다 있으므로, 여기까지 아홉 개로 두면 한국어에서 건너간 사람이
 * 돌아올 길이 없어진다. 실제로 그 상태였다.
 */
const HUB_LANGS = ALL_LOCALES10;
const INTL_LANGS = Object.keys(CHECKLISTS_INTL) as ChecklistIntlLang[];
const countOf = (c: Checklist) => c.sections.reduce((s, sec) => s + sec.items.length, 0);

/** 카드에 넣을 짧은 제목. 떼어낼 낱말이 없으면 제목 그대로 둔다. */
function shortTitle(title: string, trim?: string) {
  if (!trim) return title;
  const cut = title.replace(trim, '').trim();
  return cut.length >= 2 ? cut : title;
}

export { checklistIntlMeta } from '@/lib/meta/checklist-hub';

export function ChecklistIntlHub({ lang }: { lang: ChecklistIntlLang }) {
  const ui = UI[lang];
  const lists = CHECKLISTS_INTL[lang];
  return (
    <div className="page-wrap">
      {/* 한국어 허브가 내던 구조화 데이터를 아홉 언어에도 낸다 — 목록 페이지는
          CollectionPage와 ItemList가 있어야 검색 결과에서 목록으로 읽힌다 */}
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: `/${lang}` },
          { name: ui.crumb, path: `/${lang}/checklist` },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(
          ui.crumb,
          `/${lang}/checklist`,
          CHECKLISTS_INTL[lang].map(x => ({ name: x.title, path: `/${lang}/checklist/${x.slug}` })),
        )}
      />
      <PageGlow accent="sky" />
      <div className="h-1 topbar" />
      <header className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link prefetch={false} href={`/${lang}/checklist`} className="font-black text-sky-600 text-lg shrink-0">vixutil</Link>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{ui.nav}</span>
          <span className="ml-auto flex items-center gap-2">
            <LangPicker current={lang} route="/checklist" available={HUB_LANGS} />
          </span>
        </div>
      </header>

      <div className="hero-band max-w-5xl mx-auto px-4 py-10">
        <p className="text-xs font-bold text-sky-600 tracking-widest uppercase mb-2">{ui.eyebrow}</p>
        <h1 className="page-h1">{ui.h1}</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">
          {ui.leadA}<strong className="text-slate-700 dark:text-slate-200">{ui.leadB}</strong>{ui.leadC}
        </p>

        <div className="grid sm:grid-cols-2 gap-2">
          {lists.map(c => (
            <Link prefetch={false} key={c.slug} href={`/${lang}/checklist/${c.slug}`} className="hub-card group">
              <span className="bg-sec-soft inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
                <ToolIcon emoji={c.icon} className="h-5 w-5" />
              </span>
              <span className="hub-card-body">
                <span className="hub-card-title group-hover:text-sec">{shortTitle(c.title, ui.trim)}</span>
                <span className="block truncate text-xs text-slate-400 dark:text-slate-500">{c.desc}</span>
              </span>
              <span className="shrink-0 text-[10px] font-bold text-slate-400 dark:text-slate-500">{countOf(c)}</span>
            </Link>
          ))}
        </div>

        {/* 한국어 허브에만 있던 FAQ를 아홉 언어에도 붙인다 — FAQPage 구조화 데이터가
            함께 나가야 검색 결과에서 접힘 항목을 받을 수 있다 */}
        <Faq items={SECTION_FAQ_INTL[lang].checklist} lang={lang} />
      </div>

      <footer className="border-t border-slate-100 dark:border-slate-800 py-8 text-center">
        <span className="text-sm font-black text-sky-600">vixutil</span>
        <p className="text-xs text-slate-400 mt-1">{ui.foot}</p>
      </footer>
    </div>
  );
}

export function checklistIntlDetailMeta(lang: ChecklistIntlLang, slug: string) {
  const checklist = CHECKLISTS_INTL_MAP[lang][slug];
  if (!checklist) return {};
  const ui = UI[lang];
  const n = countOf(checklist);
  // 낱장은 섹션 카드(/og/<언어>/checklist)를 물려받는다 — 여기에 카드를 새로 만들지 않는다
  return withCard({
    title: ui.detailTitle(checklist.title, n),
    description: ui.detailDesc(checklist.desc, n),
    alternates: {
      canonical: `/${lang}/checklist/${slug}`,
      // 한국어에 같은 슬러그가 있으면 그것까지 넣는다 — 상호 선언이 아니면
      // 구글이 무시한다. 어느 언어에 실제로 있는지는 이 함수가 안다.
      languages: localeAlternates('checklist', slug),
    },
  });
}

export function ChecklistIntlDetail({ lang, checklist }: { lang: ChecklistIntlLang; checklist: Checklist }) {
  const ui = UI[lang];
  const others = CHECKLISTS_INTL[lang].filter(c => c.slug !== checklist.slug).slice(0, 6);
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: `/${lang}/checklist` },
          { name: ui.crumb, path: `/${lang}/checklist` },
          { name: checklist.title, path: `/${lang}/checklist/${checklist.slug}` },
        ])}
      />
      <div className="max-w-lg mx-auto px-4 w-full pt-3 flex justify-end">
        <LangPicker current={lang} route={`/checklist/${checklist.slug}`} available={localesWithItem('checklist', checklist.slug)} />
      </div>
      <ChecklistEngine checklist={checklist} lang={lang} />
      <div className="max-w-lg mx-auto px-4 w-full">
        {/* 상세 FAQ도 한국어에만 있었다. 데이터에서 만들어 페이지마다 답이 달라진다 */}
        <Faq items={checklistFaqIntl(lang, checklist)} lang={lang} className="" />
      </div>
      <div className="max-w-lg mx-auto px-4 w-full pb-10 pt-8">
        <h2 className="text-sm font-black text-slate-700 dark:text-slate-200 mb-3">{ui.more}</h2>
        <div className="grid grid-cols-2 gap-2">
          {others.map(o => (
            <Link prefetch={false} key={o.slug} href={`/${lang}/checklist/${o.slug}`}
              className="rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 p-3 hover:-translate-y-0.5 hover:shadow transition-all">
              <ToolIcon emoji={o.icon} className="text-slate-800 dark:text-slate-100 w-6 h-6 mx-auto mb-1" />
              <div className="text-xs font-bold text-slate-600 dark:text-slate-300 leading-tight">{o.title}</div>
            </Link>
          ))}
        </div>
      </div>
      <footer className="border-t border-slate-100 dark:border-slate-800 py-8 text-center">
        <Link prefetch={false} href={`/${lang}/checklist`} className="text-sm font-black text-sky-600">vixutil</Link>
        <p className="text-xs text-slate-400 mt-1">{ui.foot}</p>
      </footer>
    </>
  );
}
