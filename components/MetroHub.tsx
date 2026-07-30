import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import type { Lang } from '@/lib/formula/terms';
import { METRO_UI, METRO_LANGS } from '@/lib/metro/ui';
import { METRO_CITIES, METRO_LINES, totalStations } from '@/lib/metro-lines';

/**
 * 지하철 게임 허브 — 도시별로 노선을 모아 보여준다.
 *
 * 도시 이름은 노선 데이터에서 그 언어 표기를 가져온다. 도시 목록을 따로 두면
 * 도시를 더할 때 한쪽만 고쳐지는 날이 온다.
 */
export default function MetroHub({ lang }: { lang: Lang }) {
  const ui = METRO_UI[lang];
  const prefix = lang === 'ko' ? '' : `/${lang}`;
  const homeHref = lang === 'ko' ? '/' : `${prefix}/metro`;

  const cityName = (city: string) => METRO_LINES.find(l => l.city === city)?.[lang].city ?? city;

  const faq = [
    { q: ui.howTitle, a: ui.how.join(' ') },
    {
      q: lang === 'ko' ? '역 이름은 어느 언어로 적어야 하나요?'
        : lang === 'zh' ? '车站名要用哪种语言填写？'
        : 'Which language do I type station names in?',
      a: lang === 'ko' ? '그 도시에서 부르는 이름으로 적습니다. 도쿄 노선은 한자, 런던 노선은 영어 철자입니다. 한자·한글 노선은 로마자로 적어도 정답으로 받습니다.'
        : lang === 'zh' ? '按当地的叫法填写：东京线路用日文汉字，伦敦线路用英文拼写。汉字与韩文的线路也接受罗马字拼写。'
        : 'Use the name the city itself uses — kanji for Tokyo lines, English spellings for London. For kanji and Hangul lines, romanised spellings also count.',
    },
    {
      q: lang === 'ko' ? '노선도는 실제 지도인가요?'
        : lang === 'zh' ? '线路图是真实地图吗？'
        : 'Is the map geographically accurate?',
      a: lang === 'ko' ? '도식입니다. 실제 좌표로 그리면 역이 한곳에 뭉쳐 이름을 얹을 자리가 없어서, 굽이의 순서만 맞춘 노선도로 그렸습니다.'
        : lang === 'zh' ? '这是示意图。若按真实坐标绘制，车站会挤在一起而无处放站名，因此只保留了走向与转折的顺序。'
        : 'It is a schematic. Real coordinates bunch the stations together with no room for labels, so the map keeps only the order of the turns.',
    },
  ];

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd data={breadcrumbJsonLd([{ name: ui.home, path: homeHref }, { name: ui.section, path: `${prefix}/metro` }])} />
      <PageGlow accent="indigo" />
      <div className="h-1 bg-gradient-to-r from-slate-500 to-slate-700" />

      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-100 dark:border-slate-800 sticky top-0 z-20">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href={homeHref} className="text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 font-medium shrink-0">
            {ui.home}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200 truncate">{ui.section}</span>
          <span className="ml-auto flex items-center gap-2 text-xs font-bold text-slate-400 dark:text-slate-500 shrink-0">
            {METRO_LANGS.filter(l => l.lang !== lang).map(l => (
              <Link key={l.lang} href={`${l.prefix}/metro`} hrefLang={l.lang} className="hover:text-slate-700">
                {l.label}
              </Link>
            ))}
          </span>
        </div>
      </header>

      <main className="relative max-w-3xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">{ui.hubTitle}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">{ui.hubLead}</p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 tabular-nums">
            {METRO_LINES.length} · {totalStations()} {ui.stations}
          </p>
        </div>

        {METRO_CITIES.map(city => {
          const lines = METRO_LINES.filter(l => l.city === city);
          return (
            <section key={city} className="mb-8">
              {/*
                도시 머리에는 아이콘을 안 붙인다. 국기 이모지는 모두 같은 깃발
                도형으로 그려지므로 아홉 줄이 똑같은 그림이 되어 알려 주는 것이 없다.
                국기는 공유 카드에서만 쓴다.
              */}
              <h2 className="flex items-baseline gap-2 text-base font-black text-slate-800 dark:text-slate-100 mb-3">
                {cityName(city)}
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500">{lines.length}</span>
                <span className="text-xs font-normal text-slate-400 dark:text-slate-500">{lines[0][lang].country}</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-2">
                {lines.map(l => (
                  <Link
                    key={l.slug}
                    href={`${prefix}/metro/${l.slug}`}
                    className="group flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 hover:shadow-sm hover:border-slate-400 transition-all"
                  >
                    <span className="w-2.5 h-9 rounded-full shrink-0" style={{ background: l.color }} />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-bold text-slate-800 dark:text-slate-100 truncate">
                        {l[lang].line}
                      </span>
                      <span className="block text-xs text-slate-500 dark:text-slate-400">
                        {l.stations.length} {ui.stations}{l.loop ? ` · ${ui.loopNote}` : ''}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        <Faq items={faq} lang={lang} />
      </main>

      <SiteFooter lang={lang} />
    </div>
  );
}
