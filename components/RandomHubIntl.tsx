import ToolIcon from '@/components/ToolIcon';
import PageHero from '@/components/PageHero';
import Link from 'next/link';
import PageGlow from '@/components/PageGlow';
import { RANDOM_TOOLS } from '@/lib/random-tools';
import { ROLLS, DICE_ICON } from '@/lib/dice/list';
import { langOfLocale } from '@/lib/i18n/lang';
import { DICE_UI } from '@/lib/dice/ui';
import { RANDOM_UI, randomL10n, type RandomLang } from '@/lib/random-ui-intl';
import { ALL_LOCALES10, localeHref } from '@/lib/locales';
import LangPicker from '@/components/LangPicker';

/**
 * 랜덤 뽑기 허브 — 여덟 언어가 이 컴포넌트 하나를 쓴다.
 *
 * 언어마다 허브 파일을 복사해 두면 도구를 하나 추가할 때 여덟 군데를 고쳐야 하고,
 * 그중 한 곳을 빠뜨리면 그 언어에서만 새 도구가 안 보인다 — 링크가 깨지는 게
 * 아니라 그냥 없어서 어떤 검사에도 안 걸린다.
 */
export default function RandomHubIntl({ lang }: { lang: RandomLang }) {
  // 데이터 섹션은 짧은 열쇠(pt·zh·tw)를 쓰고 도구 계층은 경로 꼴(pt-br·zh-hans)을 쓴다
  const dice = DICE_UI[langOfLocale(lang)];
  const ui = RANDOM_UI[lang];
  const hubHref = localeHref(lang, '/random');

  return (
    <div className="page-wrap">
      <PageGlow accent="rose" />
      <div className="h-1 topbar" />
      <header className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link href={hubHref} className="font-black text-rose-600 text-lg shrink-0">{lang === 'ko' ? 'vix.' : 'vixutil'}</Link>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{ui.hubTitle}</span>
          <span className="ml-auto shrink-0">
            <LangPicker current={lang} route="/random" available={ALL_LOCALES10} />
          </span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="hero-band">
          <PageHero title={ui.hubTitle} desc={ui.hubLead} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {RANDOM_TOOLS.map(t => {
            const l = randomL10n(t.slug, lang);
            return (
              <Link
                key={t.slug}
                href={localeHref(lang, `/random/${t.slug}`)}
                className="group flex min-h-[8rem] flex-col justify-between rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 transition-colors hover:border-slate-300 dark:hover:border-slate-700"
              >
                <span className="bg-sec-soft inline-flex h-9 w-9 items-center justify-center rounded-lg">
                    <ToolIcon emoji={t.icon} className="h-5 w-5" />
                  </span>
                <div>
                  <div className="text-base font-black drop-shadow leading-tight">{l.title}</div>
                  <div className="text-[11px] font-medium opacity-80 mt-1 line-clamp-2">{l.desc}</div>
                </div>
              </Link>
            );
          })}
        </div>
        <Link
          href={localeHref(lang, '/random/dice')}
          className="group mt-6 flex items-center gap-4 rounded-lg border chip-off px-5 py-4 hover:border-slate-300 dark:hover:border-slate-700 hover:-translate-y-0.5 transition-all"
        >
          <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl shrink-0 bg-sec-soft">
            <ToolIcon emoji={DICE_ICON} className="w-6 h-6 transition-transform group-hover:scale-110" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-black text-slate-800 dark:text-slate-100">{dice.hubTitle}</span>
            <span className="block text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">{dice.hubLead}</span>
          </span>
          <span className="ml-auto text-[11px] font-bold text-slate-400 dark:text-slate-500 shrink-0">{ROLLS.length}</span>
        </Link>
      </div>

      <footer className="border-t border-slate-100 dark:border-slate-800 py-8 text-center">
        <span className="text-sm font-black text-rose-600">vixutil</span>
        <p className="text-xs text-slate-400 mt-1">{ui.hubFoot}</p>
      </footer>
    </div>
  );
}
