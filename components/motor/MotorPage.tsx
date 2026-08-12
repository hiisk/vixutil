import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import MotorList from '@/components/motor/MotorList';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { cellOf } from '@/lib/motor/list';
import { atPower, atSpeed, motorFacts } from '@/lib/motor/facts';
import { MOTOR_UI, cellName, fmtNum } from '@/lib/motor/ui';

export default function MotorPage({ slug, lang }: { slug: string; lang: Lang }) {
  const c = cellOf(slug);
  if (!c) return null;
  const f = motorFacts(c);
  const ui = MOTOR_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/motor`;
  const path = `${hub}/${slug}`;
  const base = localeOfLang(lang);
  const here = cellName(lang, c);
  const n = (x: number) => fmtNum(lang, x);

  const rows: [string, string][] = [
    [ui.powerLabel, `${n(c.kw)} kW · ${f.watts} W`],
    [ui.rpmLabel, `${c.rpm} rpm`],
    [ui.hzLabel, `${f.speed.hz} Hz`],
    [ui.polesLabel, `${f.speed.poles}`],
    [ui.omegaLabel, `${n(f.omega)} rad/s`],
    [ui.torqueLabel, `${n(f.torque)} N·m`],
    [ui.kgfmLabel, `${n(f.kgfm)} kgf·m`],
    [ui.lbftLabel, `${n(f.lbft)} lb·ft`],
    [ui.psLabel, `${n(f.ps)} PS`],
    [ui.hpLabel, `${n(f.hp)} hp`],
    [ui.fullRpmLabel, `${f.fullRpm} rpm · ${n(f.fullTorque)} N·m`],
  ];

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: here, path },
        ])}
      />

      <PageGlow accent="indigo" />
      <div className="h-1 bg-gradient-to-r from-indigo-600 to-sky-400" />

      <header className="page-head">
        <div className="page-bar">
          <Link href={hub} className="page-back hover:text-slate-700 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="row-name">{here}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/motor/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="mx-auto mb-5 w-72 rounded-2xl border-2 border-indigo-400 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-950/40 px-4 py-5 text-center shadow-lg">
          <div className="text-sm font-bold text-slate-600 dark:text-slate-300">{here}</div>
          <div className="text-4xl font-black text-slate-900 dark:text-slate-100 leading-tight tabular-nums">{n(f.torque)} N·m</div>
          <div className="mt-1 text-sm font-bold text-indigo-700 dark:text-indigo-300 tabular-nums">{n(f.kgfm)} kgf·m</div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400 tabular-nums">
            {f.speed.hz} Hz · {f.speed.poles}P · {n(f.omega)} rad/s
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="page-h1">{ui.metaTitle(f)}</h1>
          <p className="note-sm">{ui.desc(f)}</p>
        </div>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.hzTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.hzNote}</p>
          {/* 같은 출력·같은 극수인데 주파수만 다른 짝 — 나라를 바꾸면 이 두 줄이 답이다 */}
          <ul className="list-card">
            <li className="flex items-baseline justify-between gap-3 px-4 py-2.5">
              <span className="text-sm text-slate-600 dark:text-slate-300 tabular-nums">
                {f.speed.hz} Hz · {c.rpm} rpm
              </span>
              <span className="cell-num shrink-0">{n(f.torque)} N·m</span>
            </li>
            <li className="px-4 py-2.5">
              <Link href={`${hub}/${f.pair.slug}`} className="flex items-baseline justify-between gap-3 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors">
                <span className="text-sm tabular-nums">
                  {f.pair.hz} Hz · {f.pair.rpm} rpm
                </span>
                <span className="text-sm font-bold tabular-nums shrink-0">{n(f.pair.torque)} N·m</span>
              </Link>
            </li>
          </ul>
        </section>

        <dl className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden mb-8">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-3 px-4 py-2.5 bg-white dark:bg-slate-900">
              <dt className="text-xs text-slate-500 dark:text-slate-400 shrink-0">{k}</dt>
              <dd className="cell-num text-right break-all">{v}</dd>
            </div>
          ))}
        </dl>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.gearTableTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.gearNote}</p>
          <ul className="list-card">
            {f.gears.map(g => (
              <li key={g.ratio} className="flex items-baseline justify-between gap-3 px-4 py-2.5">
                <span className="text-sm text-slate-600 dark:text-slate-300 tabular-nums">
                  {ui.ratioLabel} {g.ratio} · {n(g.rpm)} rpm
                </span>
                <span className="cell-num shrink-0">{n(g.torque)} N·m</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.currentTableTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.currentNote}</p>
          <ul className="list-card">
            {f.currents.map(cur => (
              <li key={cur.volt} className="flex items-baseline justify-between gap-3 px-4 py-2.5">
                <span className="text-sm text-slate-600 dark:text-slate-300 tabular-nums">
                  {cur.volt} V · cosφ {n(f.pf)} · η {n(f.eff)}
                </span>
                <span className="cell-num shrink-0">{n(cur.amp)} A</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.neighbourTitle}</h2>
          <MotorList cells={f.neighbours.map(x => ({ kw: x.kw, rpm: x.rpm }))} path={hub} lang={lang} by="both" />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.powerRowTitle}</h2>
          <MotorList cells={atPower(c.kw)} path={hub} lang={lang} by="rpm" current={slug} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.speedRowTitle}</h2>
          <MotorList cells={atSpeed(c.rpm)} path={hub} lang={lang} by="power" current={slug} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.howTitle}</h2>
          <ul className="list-card">
            {ui.how.map(h => (
              <li key={h} className="cell-note">{h}</li>
            ))}
          </ul>
        </section>

        {/*
         * 이어 보기 — 이름이 겹치는 두 섹션으로 길을 낸다. /torque는 나사를 조이는
         * 토크이고 /ampere는 단상 콘센트 쪽 전류라 둘 다 이 표와 다른 값을 다룬다.
         * 헷갈릴 만한 자리에서 미리 갈라 주는 것이 링크의 몫이다.
         */}
        <section className="mb-8">
          <h2 className="sec-h2">{ui.linkTitle}</h2>
          <ul className="list-card">
            <li className="px-4 py-2.5">
              <Link href={`${prefix}/torque`} className="cell-note hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors">
                {ui.torqueLink}
              </Link>
            </li>
            <li className="px-4 py-2.5">
              <Link href={`${prefix}/ampere`} className="cell-note hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors">
                {ui.ampereLink}
              </Link>
            </li>
          </ul>
        </section>

        <Faq items={ui.cellFaq(f)} lang={base} title={ui.faqTitle} />

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/motor/${slug}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
