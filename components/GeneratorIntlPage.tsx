import { UI } from '@/lib/meta/generator-hub-ui';
import Ad from '@/components/Ad';
import PageHero from '@/components/PageHero';
import ToolIcon from '@/components/ToolIcon';
import Link from 'next/link';
import LangPicker from '@/components/LangPicker';
import PageGlow from '@/components/PageGlow';
import EnGeneratorEngine from '@/components/EnGeneratorEngine';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import { thumbSurface } from '@/lib/thumbnail';
import { GENERATORS_INTL, GENERATORS_INTL_MAP, type GeneratorIntlLang } from '@/lib/generator-l10n';
import { alternateLanguages10 } from '@/lib/locales';
import type { Generator } from '@/lib/types';
import { withCard } from '@/lib/og-cards';

/**
 * 한국어·영어를 뺀 여덟 언어의 생성기 허브와 개별 페이지.
 *
 * 영어는 이미 `app/en/generator/*`가 손으로 쓰여 있어 그대로 둔다 — 그 페이지에는
 * 영어 전용 SEO 문단이 붙어 있어서 옮겨 담으면 오히려 잃는 것이 있다.
 * 나머지 여덟은 여기 한 벌을 공유한다.
 */

/* UI 표는 lib/meta/generator-hub-ui.ts로 옮겼다 — 허브 메타와 같이 쓴다 */

/**
 * 여덟 언어 + 영어가 같은 스무 종을 가진다. 한국어는 이백 종이 넘고 그 스무 개를
 * 모두 품고 있어서, 어느 상세 페이지에서 넘어가도 같은 슬러그가 있다.
 */
export const GENERATOR_LANGS = [...(Object.keys(GENERATORS_INTL) as GeneratorIntlLang[]), 'en', 'ko'] as const;
const countOf = (g: Generator) => g.count ?? 6;

export { generatorIntlMeta } from '@/lib/meta/generator-hub';

export function GeneratorIntlHub({ lang }: { lang: GeneratorIntlLang }) {
  const ui = UI[lang];
  const gens = GENERATORS_INTL[lang];
  return (
    <div className="page-wrap">
      <JsonLd data={breadcrumbJsonLd([{ name: ui.home, path: `/${lang}` }, { name: ui.crumb, path: `/${lang}/generator` }])} />
      <JsonLd data={itemListJsonLd(ui.crumb, `/${lang}/generator`, gens.map(g => ({ name: g.title, path: `/${lang}/generator/${g.slug}` })))} />
      <PageGlow accent="emerald" />
      <div className="h-1 topbar" />
      <header className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link prefetch={false} href={`/${lang}/generator`} className="font-bold text-emerald-600 text-lg shrink-0">vixutil</Link>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{ui.nav}</span>
          <span className="ml-auto flex items-center gap-2">
            <LangPicker current={lang} route="/generator" available={GENERATOR_LANGS} />
          </span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="hero-band">
          <PageHero title={ui.h1} desc={ui.lead} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {gens.map(g => (
            <Link prefetch={false} key={g.slug} href={`/${lang}/generator/${g.slug}`}
              className={`group relative overflow-hidden rounded-lg ${thumbSurface(g.slug, 'generator')} p-5 min-h-[9.5rem] flex flex-col justify-between hover:-translate-y-1 hover:border-slate-300 dark:hover:border-slate-700 transition-all`}>
              <ToolIcon emoji={g.icon} className="w-9 h-9 drop-shadow-sm transition-transform group-hover:scale-110" />
              <div>
                <div className="text-base font-bold drop-shadow leading-tight">{g.title}</div>
                <div className="text-[11px] font-medium opacity-80 mt-1 line-clamp-2">{g.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <footer className="border-t border-slate-100 dark:border-slate-800 py-8 text-center">
        <span className="text-sm font-bold text-emerald-600">vixutil</span>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{ui.foot}</p>
      </footer>
    </div>
  );
}

export function generatorIntlDetailMeta(lang: GeneratorIntlLang, slug: string) {
  const gen = GENERATORS_INTL_MAP[lang][slug];
  if (!gen) return {};
  const ui = UI[lang];
  // 낱장은 섹션 카드(/og/<언어>/generator)를 물려받는다 — 여기에 카드를 새로 만들지 않는다
  return withCard({
    title: ui.detailTitle(gen.title),
    description: ui.detailDesc(gen.desc),
    alternates: { canonical: `/${lang}/generator/${slug}`, languages: alternateLanguages10(`/generator/${slug}`) },
  });
}

export function GeneratorIntlDetail({ lang, gen }: { lang: GeneratorIntlLang; gen: Generator }) {
  const ui = UI[lang];
  const others = GENERATORS_INTL[lang].filter(g => g.slug !== gen.slug).slice(0, 6);
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: `/${lang}/generator` },
          { name: ui.crumb, path: `/${lang}/generator` },
          { name: gen.title, path: `/${lang}/generator/${gen.slug}` },
        ])}
      />
      <div className="max-w-lg mx-auto px-4 w-full pt-3 flex justify-end">
        <LangPicker current={lang} route={`/generator/${gen.slug}`} available={GENERATOR_LANGS} />
      </div>
      <EnGeneratorEngine gen={gen} lang={lang} />

      <div className="max-w-lg mx-auto px-4 w-full pb-12">
        <div className="mb-8">
          <Ad lang={lang} />
        </div>

        <section className="prose-sm text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
          <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-2">{ui.about(gen.title)}</h2>
          <p>{ui.aboutBody(gen.title)}</p>
        </section>

        <Faq items={ui.faq({ title: gen.title, count: countOf(gen) })} lang={lang} className="" />

        <div className="pt-8">
          <h2 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">{ui.more}</h2>
          <div className="grid grid-cols-2 gap-2">
            {others.map(o => (
              <Link prefetch={false} key={o.slug} href={`/${lang}/generator/${o.slug}`}
                className="rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 p-3 hover:-translate-y-0.5 hover:shadow transition-all">
                <ToolIcon emoji={o.icon} className="text-slate-800 dark:text-slate-100 w-6 h-6 mx-auto mb-1" />
                <div className="text-xs font-bold text-slate-600 dark:text-slate-300 leading-tight">{o.title}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <footer className="border-t border-slate-100 dark:border-slate-800 py-8 text-center">
        <Link prefetch={false} href={`/${lang}/generator`} className="text-sm font-bold text-emerald-600">vixutil</Link>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{ui.foot}</p>
      </footer>
    </>
  );
}
