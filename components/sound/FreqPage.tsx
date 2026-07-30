import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd, webAppJsonLd } from '@/components/JsonLd';
import TonePlayer from '@/components/sound/TonePlayer';
import WaveShape from '@/components/sound/WaveShape';
import { LANGS8, prefix8, type Lang8 } from '@/lib/i18n/lang8';
import { FREQ_ICON, freqOf, freqSlug } from '@/lib/sound/freqs';
import { dtmfKeys, freqFacts, nearbyFreqs } from '@/lib/sound/facts';
import { SOUND_UI } from '@/lib/sound/ui';

/**
 * 주파수 한 장 — 여덟 언어가 이 컴포넌트 하나를 쓴다.
 *
 * 재생 단추가 맨 위다. 이 화면에 오는 사람은 "8000Hz 소리"를 들으러 왔고,
 * 파장과 음이름은 듣고 나서 읽을 거리다.
 */
export default function FreqPage({ slug, lang }: { slug: string; lang: Lang8 }) {
  const freq = freqOf(slug);
  if (!freq) return null;

  const ui = SOUND_UI[lang];
  const f = freqFacts(freq);
  const prefix = prefix8(lang);
  const homeHref = lang === 'ko' ? '/' : `${prefix}/sound/hz`;
  const path = `${prefix}/sound/hz/${slug}`;
  const base = lang === 'ko' ? 'ko' : 'en';
  const keys = dtmfKeys(freq.hz);
  const nearby = nearbyFreqs(freq.hz);

  const rows: { label: string; value: string }[] = [
    { label: ui.wavelength, value: f.wavelengthLabel },
    { label: ui.period, value: f.periodLabel },
    { label: ui.note, value: f.note },
    { label: ui.cents, value: f.onPitch ? ui.onPitchLabel : ui.centsLabel(f.cents) },
    { label: ui.audible, value: f.audible ? ui.audibleYes : ui.audibleNo },
    { label: ui.harmonics, value: f.harmonics.map(h => `${h} Hz`).join(' · ') },
    { label: ui.octaveDown, value: `${f.octaveDown} Hz` },
    { label: ui.octaveUp, value: `${f.octaveUp} Hz` },
  ];

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: `${prefix}/sound/hz` },
          { name: `${freq.hz} Hz`, path },
        ])}
      />
      <JsonLd data={webAppJsonLd(`${freq.hz} Hz`, ui.metaDesc(f), path)} />

      <PageGlow accent="emerald" />
      <div className="h-1 bg-gradient-to-r from-emerald-400 to-teal-500" />

      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-100 dark:border-slate-800 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href={homeHref} className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.home}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <Link href={`${prefix}/sound/hz`} className="text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium truncate">
            {ui.section}
          </Link>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg bg-gradient-to-br from-emerald-400 to-teal-500">
            <ToolIcon emoji={FREQ_ICON} accent="rgba(255,255,255,0.55)" className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 mb-1 tabular-nums">{freq.hz} Hz</h1>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            {ui.rangeLabel[f.range]} · {f.note}
          </p>
        </div>

        <section className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 px-4 py-6 mb-6">
          <TonePlayer
            hz={freq.hz}
            playLabel={ui.play}
            stopLabel={ui.stop}
            volumeLabel={ui.volume}
            safety={ui.safety}
            noAudioLabel={ui.noAudio}
          />
        </section>

        <section className="flex justify-center mb-6">
          <WaveShape periodLabel={f.periodLabel} />
        </section>

        {/* 이 주파수를 왜 찾는지는 계산으로 안 나온다 — 갈래마다 한 줄씩 */}
        {freq.tags.length > 0 && (
          <section className="mb-6 flex flex-col gap-2">
            {freq.tags.map(t => (
              <div key={t} className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3">
                <p className="text-[11px] font-black text-emerald-600 dark:text-emerald-400 mb-0.5">{ui.tagLabel[t]}</p>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{ui.tagNote[t]}</p>
                {t === 'dtmf' && keys.length > 0 && (
                  <p className="mt-1.5 text-sm font-black text-slate-700 dark:text-slate-200 tracking-widest">{keys.join(' · ')}</p>
                )}
              </div>
            ))}
          </section>
        )}

        <section className="rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {rows.map(r => (
                <tr key={r.label}>
                  <th scope="row" className="text-left px-4 py-3 font-bold text-slate-500 dark:text-slate-400 w-1/2 bg-slate-50 dark:bg-slate-900/40">
                    {r.label}
                  </th>
                  <td className="px-4 py-3 font-black text-slate-800 dark:text-slate-100 tabular-nums">{r.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="mt-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{ui.howTitle}</h2>
          <ul className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800">
            {ui.how.map(h => (
              <li key={h} className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={ui.freqFaq(f)} lang={base} title={ui.faqTitle} />

        <section className="mt-8" aria-label={ui.nearbyTitle}>
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">{ui.nearbyTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3">{ui.nearbyNote}</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {nearby.map(n => {
              const nf = freqFacts(n);
              return (
                <Link
                  key={n.hz}
                  href={`${prefix}/sound/hz/${freqSlug(n.hz)}`}
                  className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2.5 text-center hover:shadow-sm transition-all"
                >
                  <span className="block text-sm font-black text-slate-800 dark:text-slate-100 tabular-nums">{n.hz} Hz</span>
                  <span className="block text-[11px] text-slate-400 dark:text-slate-500">{nf.note}</span>
                </Link>
              );
            })}
          </div>
        </section>

        <nav className="mt-8 flex flex-wrap justify-center gap-x-3 gap-y-1.5 text-xs font-bold text-slate-400 dark:text-slate-500" aria-label="Language">
          {LANGS8.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/sound/hz/${slug}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
