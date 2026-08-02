import ToolIcon from '@/components/ToolIcon';
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
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <PageGlow accent="rose" />
      <div className="h-1 bg-gradient-to-r from-rose-500 to-pink-600" />
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
        <p className="text-xs font-bold text-rose-600 tracking-widest uppercase mb-2">{ui.eyebrow}</p>
        <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">{ui.hubTitle}</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">{ui.hubLead}</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {RANDOM_TOOLS.map(t => {
            const l = randomL10n(t.slug, lang);
            return (
              <Link
                key={t.slug}
                href={localeHref(lang, `/random/${t.slug}`)}
                className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${t.gradient} text-white p-5 min-h-[9rem] flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl transition-all`}
              >
                <ToolIcon emoji={t.icon} accent="rgba(255,255,255,0.55)" className="w-9 h-9 drop-shadow-lg transition-transform group-hover:scale-110" />
                <div>
                  <div className="text-base font-black drop-shadow leading-tight">{l.title}</div>
                  <div className="text-[11px] font-medium text-white/80 mt-1 line-clamp-2">{l.desc}</div>
                </div>
              </Link>
            );
          })}
        </div>
        <Link
          href={localeHref(lang, '/random/dice')}
          className="group mt-6 flex items-center gap-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-5 py-4 hover:shadow-lg hover:-translate-y-0.5 transition-all"
        >
          <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl shrink-0 bg-gradient-to-br from-rose-600 to-orange-500">
            <ToolIcon emoji={DICE_ICON} accent="rgba(255,255,255,0.55)" className="w-6 h-6 text-white transition-transform group-hover:scale-110" />
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
