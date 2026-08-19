'use client';
/*
 * ── 왜 클라이언트 컴포넌트인가 (2026-08-13) ──────────────────
 * 서버 컴포넌트가 그린 마크업은 **요청마다 두 번** 나간다 — 브라우저가 볼 HTML과,
 * 그 옆에 인라인으로 붙는 RSC 짐(직렬화된 트리)이다. 클래스 문자열까지 두 번
 * 실린다. 재 보니 낱장 한 장에서 RSC 짐이 61%였고 보이는 글자는 6%였다.
 *
 * Hobby의 Fast Origin Transfer 한도가 30일에 10GB인데, 주소 20만 개를 한 번 훑는
 * 데만 6GB가 들어 사이트가 실제로 멈췄다(한도의 348%).
 *
 * 마크업을 클라이언트 컴포넌트로 옮기면 그 마크업은 **캐시되는 JS 묶음**으로
 * 가고, 요청마다 넘어가는 것은 props(slug·lang) 둘뿐이다. HTML은 그대로 서버에서
 * 그려지므로 크롤러가 읽는 내용은 하나도 줄지 않는다. 게다가 JS는 Fast Data
 * Transfer(한도 100GB, 여유 많음)로 세어지고 크롤러는 애초에 받아 가지 않는다.
 *
 * 실측: /laundry 낱장이 gzip 27.8KB → 14.0KB (RSC 61% → 17%).
 */
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd, webAppJsonLd } from '@/components/JsonLd';
import TonePlayer from '@/components/sound/TonePlayer';
import WaveShape from '@/components/sound/WaveShape';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { FREQ_ICON, freqOf, freqSlug } from '@/lib/sound/freqs';
import { dtmfKeys, freqFacts, nearbyFreqs } from '@/lib/sound/facts';
import { SOUND_UI } from '@/lib/sound/ui';
import LangPicker from '@/components/LangPicker';

/**
 * 주파수 한 장 — 여덟 언어가 이 컴포넌트 하나를 쓴다.
 *
 * 재생 단추가 맨 위다. 이 화면에 오는 사람은 "8000Hz 소리"를 들으러 왔고,
 * 파장과 음이름은 듣고 나서 읽을 거리다.
 */
export default function FreqPage({ slug, lang }: { slug: string; lang: Lang }) {
  const freq = freqOf(slug);
  if (!freq) return null;

  const ui = SOUND_UI[lang];
  const f = freqFacts(freq);
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : `${prefix}/sound/hz`;
  const path = `${prefix}/sound/hz/${slug}`;
  /*
    푸터와 FAQ에 실제 언어를 그대로 넘긴다.
    예전에는 여기서 ko와 en 둘로 좁혔다. 두 컴포넌트가 그 둘만 알던 시절의
    흔적인데, 지금은 둘 다 열 언어를 받는다. 좁혀 둔 채로 두면 중국어 화면
    아래에 영어 푸터와 영어 제휴 카드가 붙는다 — 실제로 그 상태였다.
  */
  const base = localeOfLang(lang);
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
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: `${prefix}/sound/hz` },
          { name: `${freq.hz} Hz`, path },
        ])}
      />
      <JsonLd data={webAppJsonLd(`${freq.hz} Hz`, ui.metaDesc(f), path)} />

      <PageGlow accent="emerald" />
      <div className="h-1 topbar" />

      <header className="page-head">
        <div className="page-bar">
          <Link prefetch={false} href={homeHref} className="page-back hover:text-slate-700 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.home}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <Link prefetch={false} href={`${prefix}/sound/hz`} className="text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium truncate">
            {ui.section}
          </Link>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/sound/hz/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg bg-sec-soft">
            <ToolIcon emoji={FREQ_ICON} className="w-7 h-7" />
          </div>
          <h1 className="page-h1 tabular-nums">{freq.hz} Hz</h1>
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
              <div key={t} className="rounded-2xl border chip-off px-4 py-3">
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
          <h2 className="sec-h2">{ui.howTitle}</h2>
          <ul className="list-card">
            {ui.how.map(h => (
              <li key={h} className="cell-note">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={ui.freqFaq(f)} lang={base} title={ui.faqTitle} />

        <section className="mt-8" aria-label={ui.nearbyTitle}>
          <h2 className="sec-h2-tight">{ui.nearbyTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3">{ui.nearbyNote}</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {nearby.map(n => {
              const nf = freqFacts(n);
              return (
                <Link prefetch={false}
                  key={n.hz}
                  href={`${prefix}/sound/hz/${freqSlug(n.hz)}`}
                  className="rounded-xl border chip-off px-3 py-2.5 text-center hover:shadow-sm transition-all"
                >
                  <span className="block text-sm font-black text-slate-800 dark:text-slate-100 tabular-nums">{n.hz} Hz</span>
                  <span className="block text-[11px] text-slate-400 dark:text-slate-500">{nf.note}</span>
                </Link>
              );
            })}
          </div>
        </section>

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link prefetch={false} key={l.lang} href={`${l.prefix}/sound/hz/${slug}`} hrefLang={l.hreflang} className="dim-link">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
