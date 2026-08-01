'use client';
import ToolIcon from '@/components/ToolIcon';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import PageGlow from '@/components/PageGlow';
import ReferralCards from '@/components/ReferralCards';
import {
  getBiorhythm, getChartSeries,
  type BiorhythmResult, type ChartPoint, type Phase,
} from '@/lib/biorhythm';
import { t, cycles, phaseLabels, biorhythmComment, type Lang } from '@/lib/fortune-intl';
import { DATE_FORM, type DateForm } from '@/lib/fortune-form-intl';

const CYCLE_COLOR: Record<string, string> = {
  physical: '#ef4444',
  emotional: '#22c55e',
  intellectual: '#3b82f6',
};

const PHASE_STYLE: Record<string, string> = {
  high: 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900/50',
  low: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700',
  critical: 'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-900/50',
};

const W = 640;
const H = 200;
const PAD = 8;

type IntlLang = Exclude<Lang, 'ko'>;

const COPY: Record<IntlLang, {
  title: string; lead: string;
  submit: string; empty: string; todayRhythm: string;
  daysOld: (n: string) => string;
  chartNote: string;
  cycleOf: (d: string, p: number) => string;
  criticalToday: string;
  nextCritical: (n: number) => string;
  chartAlt: string; scienceQ: string; scienceA: string;
} & DateForm> = {
  en: {
    ...DATE_FORM.en,
    title: 'Biorhythm Calculator',
    lead: 'See your physical, emotional and intellectual rhythms from your date of birth',
    submit: 'Show my rhythms',
    empty: 'Enter your date of birth to see today’s rhythms',
    todayRhythm: 'Today’s rhythms',
    daysOld: n => `${n} days since birth`,
    chartNote: 'Dashed line is today · a critical day is where a curve crosses the centre line',
    cycleOf: (d, p) => `${d} · ${p}-day cycle`,
    criticalToday: 'Today is a critical day',
    nextCritical: n => `${n} days to the next critical day`,
    chartAlt: 'Biorhythm chart',
    scienceQ: 'Is biorhythm science?',
    scienceA: 'No. The 23-day physical, 28-day emotional and 33-day intellectual cycles were proposed in the early twentieth century and have simply stuck; there is no confirmed evidence that they predict how you actually feel or think. The calculation itself is fully deterministic — the same birth date produces the same chart anywhere. A number being precise and a number being right are two different things. Your body will tell you how today is going more accurately than this graph will.',
  },
  es: {
    ...DATE_FORM.es,
    title: 'Calculadora de biorritmo',
    lead: 'Mira tus ritmos físico, emocional e intelectual a partir de tu fecha de nacimiento',
    submit: 'Ver mis ritmos',
    empty: 'Escribe tu fecha de nacimiento para ver los ritmos de hoy',
    todayRhythm: 'Los ritmos de hoy',
    daysOld: n => `${n} días desde el nacimiento`,
    chartNote: 'La línea discontinua es hoy · el día crítico es donde una curva cruza la línea central',
    cycleOf: (d, p) => `${d} · ciclo de ${p} días`,
    criticalToday: 'Hoy es un día crítico',
    nextCritical: n => `${n} días hasta el próximo día crítico`,
    chartAlt: 'Gráfico de biorritmo',
    scienceQ: '¿El biorritmo es ciencia?',
    scienceA: 'No. Los ciclos de 23 días (físico), 28 (emocional) y 33 (intelectual) se propusieron a principios del siglo XX y simplemente se quedaron; no hay pruebas confirmadas de que predigan cómo te sientes o piensas. El cálculo sí es completamente determinista: la misma fecha de nacimiento da el mismo gráfico en cualquier parte. Que un número sea preciso y que sea correcto son cosas distintas. Tu cuerpo te dirá cómo va el día con más exactitud que esta gráfica.',
  },
  'pt-br': {
    ...DATE_FORM['pt-br'],
    title: 'Calculadora de biorritmo',
    lead: 'Veja seus ritmos físico, emocional e intelectual a partir da data de nascimento',
    submit: 'Ver meus ritmos',
    empty: 'Digite sua data de nascimento para ver os ritmos de hoje',
    todayRhythm: 'Os ritmos de hoje',
    daysOld: n => `${n} dias desde o nascimento`,
    chartNote: 'A linha tracejada é hoje · o dia crítico é onde uma curva cruza a linha central',
    cycleOf: (d, p) => `${d} · ciclo de ${p} dias`,
    criticalToday: 'Hoje é um dia crítico',
    nextCritical: n => `${n} dias até o próximo dia crítico`,
    chartAlt: 'Gráfico de biorritmo',
    scienceQ: 'Biorritmo é ciência?',
    scienceA: 'Não. Os ciclos de 23 dias (físico), 28 (emocional) e 33 (intelectual) foram propostos no início do século XX e simplesmente ficaram; não há evidência confirmada de que prevejam como você se sente ou pensa. O cálculo em si é totalmente determinístico: a mesma data de nascimento gera o mesmo gráfico em qualquer lugar. Um número ser preciso e um número ser certo são coisas diferentes. Seu corpo vai dizer como está o dia com mais exatidão do que este gráfico.',
  },
  ja: {
    ...DATE_FORM.ja,
    title: 'バイオリズム計算',
    lead: '生年月日から身体・感情・知性の三つのリズムを見ます',
    submit: 'リズムを見る',
    empty: '生年月日を入れると今日のリズムが出ます',
    todayRhythm: '今日のリズム',
    daysOld: n => `生まれてから${n}日`,
    chartNote: '破線が今日 · 曲線が中央線を横切る日が要注意日です',
    cycleOf: (d, p) => `${d} · ${p}日周期`,
    criticalToday: '今日は要注意日です',
    nextCritical: n => `次の要注意日まで${n}日`,
    chartAlt: 'バイオリズムのグラフ',
    scienceQ: 'バイオリズムは科学ですか',
    scienceA: 'いいえ。身体23日・感情28日・知性33日という周期は20世紀初めに提唱され、そのまま広まったものです。実際の体調や思考を予測できるという確かな証拠はありません。計算そのものは完全に決まっていて、同じ生年月日ならどこで計算しても同じグラフになります。数字が正確であることと、数字が正しいことは別です。今日の調子は、このグラフより自分の体のほうが正確に教えてくれます。',
  },
  de: {
    ...DATE_FORM.de,
    title: 'Biorhythmus-Rechner',
    lead: 'Sieh deinen körperlichen, emotionalen und geistigen Rhythmus aus deinem Geburtsdatum',
    submit: 'Rhythmen anzeigen',
    empty: 'Gib dein Geburtsdatum ein, um die Rhythmen von heute zu sehen',
    todayRhythm: 'Die Rhythmen von heute',
    daysOld: n => `${n} Tage seit der Geburt`,
    chartNote: 'Die gestrichelte Linie ist heute · ein kritischer Tag ist dort, wo eine Kurve die Mittellinie kreuzt',
    cycleOf: (d, p) => `${d} · ${p}-Tage-Zyklus`,
    criticalToday: 'Heute ist ein kritischer Tag',
    nextCritical: n => `${n} Tage bis zum nächsten kritischen Tag`,
    chartAlt: 'Biorhythmus-Diagramm',
    scienceQ: 'Ist Biorhythmus Wissenschaft?',
    scienceA: 'Nein. Die Zyklen von 23 Tagen (körperlich), 28 (emotional) und 33 (geistig) wurden zu Beginn des 20. Jahrhunderts vorgeschlagen und haben sich schlicht gehalten; es gibt keinen bestätigten Beleg, dass sie vorhersagen, wie du dich tatsächlich fühlst oder denkst. Die Rechnung selbst ist vollständig determiniert — dasselbe Geburtsdatum ergibt überall dieselbe Kurve. Dass eine Zahl genau ist, heißt nicht, dass sie stimmt. Dein Körper sagt dir zuverlässiger, wie der Tag läuft, als dieses Diagramm.',
  },
  fr: {
    ...DATE_FORM.fr,
    title: 'Calculateur de biorythme',
    lead: 'Voyez vos rythmes physique, émotionnel et intellectuel à partir de votre date de naissance',
    submit: 'Voir mes rythmes',
    empty: 'Saisissez votre date de naissance pour voir les rythmes du jour',
    todayRhythm: 'Les rythmes du jour',
    daysOld: n => `${n} jours depuis la naissance`,
    chartNote: 'La ligne en pointillés est aujourd’hui · le jour critique est là où une courbe croise l’axe central',
    cycleOf: (d, p) => `${d} · cycle de ${p} jours`,
    criticalToday: 'Aujourd’hui est un jour critique',
    nextCritical: n => `${n} jours avant le prochain jour critique`,
    chartAlt: 'Graphique de biorythme',
    scienceQ: 'Le biorythme est-il une science ?',
    scienceA: 'Non. Les cycles de 23 jours (physique), 28 (émotionnel) et 33 (intellectuel) ont été proposés au début du XXᵉ siècle et sont simplement restés ; rien ne confirme qu’ils prédisent ce que vous ressentez ou pensez réellement. Le calcul, lui, est entièrement déterministe : la même date de naissance donne partout la même courbe. Qu’un nombre soit précis et qu’il soit juste sont deux choses différentes. Votre corps vous dira comment se passe la journée plus fidèlement que ce graphique.',
  },
  hi: {
    ...DATE_FORM.hi,
    title: 'बायोरिदम कैलकुलेटर',
    lead: 'जन्म तिथि से अपनी शारीरिक, भावनात्मक और बौद्धिक लय देखिए',
    submit: 'मेरी लय दिखाइए',
    empty: 'आज की लय देखने के लिए जन्म तिथि भरिए',
    todayRhythm: 'आज की लय',
    daysOld: n => `जन्म से ${n} दिन`,
    chartNote: 'बिंदुदार रेखा आज है · जहाँ कोई वक्र बीच की रेखा काटता है वही नाज़ुक दिन है',
    cycleOf: (d, p) => `${d} · ${p} दिन का चक्र`,
    criticalToday: 'आज नाज़ुक दिन है',
    nextCritical: n => `अगले नाज़ुक दिन में ${n} दिन`,
    chartAlt: 'बायोरिदम चार्ट',
    scienceQ: 'क्या बायोरिदम विज्ञान है?',
    scienceA: 'नहीं। 23 दिन (शारीरिक), 28 (भावनात्मक) और 33 (बौद्धिक) के चक्र बीसवीं सदी की शुरुआत में सुझाए गए थे और बस चलते रहे; इसका कोई पक्का प्रमाण नहीं कि ये बताते हों कि आप सचमुच कैसा महसूस करते या सोचते हैं। गणना ज़रूर पूरी तरह तय है — वही जन्म तिथि हर जगह वही चार्ट देती है। किसी अंक का सटीक होना और सही होना दो अलग बातें हैं। आज कैसा जा रहा है, यह इस ग्राफ़ से ज़्यादा सही आपका शरीर बताएगा।',
  },
  'zh-hans': {
    ...DATE_FORM['zh-hans'],
    title: '生物节律计算',
    lead: '用出生日期看你的体力、情绪和智力三条节律',
    submit: '查看我的节律',
    empty: '填入出生日期就能看到今天的节律',
    todayRhythm: '今天的节律',
    daysOld: n => `出生至今 ${n} 天`,
    chartNote: '虚线是今天 · 曲线穿过中线的那天就是临界日',
    cycleOf: (d, p) => `${d} · ${p} 天周期`,
    criticalToday: '今天是临界日',
    nextCritical: n => `距离下一个临界日还有 ${n} 天`,
    chartAlt: '生物节律曲线图',
    scienceQ: '生物节律是科学吗？',
    scienceA: '不是。体力23天、情绪28天、智力33天这三个周期是二十世纪初提出来的，后来就一直沿用；并没有确凿证据表明它们能预测你真实的身心状态。计算本身完全是确定的——同一个出生日期在哪里算都得到同一张图。数字精确和数字正确是两回事。今天状态如何，你的身体比这张图更准。',
  },
  'zh-hant': {
    ...DATE_FORM['zh-hant'],
    title: '生物節律計算',
    lead: '用出生日期看你的體力、情緒和智力三條節律',
    submit: '查看我的節律',
    empty: '填入出生日期就能看到今天的節律',
    todayRhythm: '今天的節律',
    daysOld: n => `出生至今 ${n} 天`,
    chartNote: '虛線是今天 · 曲線穿過中線的那天就是臨界日',
    cycleOf: (d, p) => `${d} · ${p} 天週期`,
    criticalToday: '今天是臨界日',
    nextCritical: n => `距離下一個臨界日還有 ${n} 天`,
    chartAlt: '生物節律曲線圖',
    scienceQ: '生物節律是科學嗎？',
    scienceA: '不是。體力23天、情緒28天、智力33天這三個週期是二十世紀初提出來的，後來就一直沿用；並沒有確鑿證據表明它們能預測你真實的身心狀態。計算本身完全是確定的——同一個出生日期在哪裡算都得到同一張圖。數字精確和數字正確是兩回事。今天狀態如何，你的身體比這張圖更準。',
  },
};

function cyclesFor(lang: IntlLang) {
  return cycles(lang);
}

function phaseLabel(lang: IntlLang, phase: Phase): string {
  return phaseLabels(lang)[phase];
}

/** 세 리듬 평균으로 한 줄 총평 — 한국어 overallComment의 언어별 대응 */
function comment(result: BiorhythmResult, lang: IntlLang): string {
  const cycles = cyclesFor(lang);
  const co = biorhythmComment(lang);
  const criticals = result.cycles.filter(c => c.phase === 'critical');

  if (criticals.length >= 2) {
    const sep = ' and ';
    return co.multiCritical(criticals.map(c => cycles.find(x => x.key === c.key)!.label).join(sep));
  }
  if (criticals.length === 1) {
    return co.oneCritical(cycles.find(x => x.key === criticals[0].key)!.label);
  }
  if (result.average >= 60) return co.veryHigh;
  if (result.average >= 20) return co.high;
  if (result.average >= -20) return co.mid;
  if (result.average >= -60) return co.low;
  return co.veryLow;
}

function Chart({ points, lang }: { points: ChartPoint[]; lang: IntlLang }) {
  const n = points.length;
  const x = (i: number) => PAD + (i / (n - 1)) * (W - PAD * 2);
  const y = (v: number) => H / 2 - v * (H / 2 - PAD);

  const path = (key: 'physical' | 'emotional' | 'intellectual') =>
    points.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(p[key]).toFixed(1)}`).join(' ');

  const todayX = x(points.findIndex(p => p.offset === 0));
  const today = points.find(pt => pt.offset === 0)!;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label={COPY[lang].chartAlt}>
      <line x1={PAD} y1={H / 2} x2={W - PAD} y2={H / 2} stroke="currentColor" strokeWidth={1} className="text-slate-200 dark:text-slate-700" />
      <line x1={todayX} y1={PAD} x2={todayX} y2={H - PAD} stroke="currentColor" strokeWidth={1.5} strokeDasharray="4 3" className="text-slate-400 dark:text-slate-500" />
      {cyclesFor(lang).map(c => (
        <path key={c.key} d={path(c.key)} fill="none" stroke={CYCLE_COLOR[c.key]} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      ))}
      {cyclesFor(lang).map(c => (
        <circle key={c.key} cx={todayX} cy={y(today[c.key])} r={4} fill={CYCLE_COLOR[c.key]} stroke="white" strokeWidth={1.5} />
      ))}
    </svg>
  );
}

function Result({ result, points, lang }: { result: BiorhythmResult; points: ChartPoint[]; lang: IntlLang }) {
  const c = COPY[lang];
  const cycles = cyclesFor(lang);
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
        <div className="flex items-baseline justify-between mb-1">
          <h2 className="text-sm font-black text-slate-800 dark:text-slate-100">{c.todayRhythm}</h2>
          <span className="text-xs text-slate-400 dark:text-slate-500">{c.daysOld(result.days.toLocaleString())}</span>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{comment(result, lang)}</p>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4">
        <Chart points={points} lang={lang} />
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mt-2">
          {cycles.map(cy => (
            <span key={cy.key} className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <span className="w-3 h-0.5 rounded" style={{ backgroundColor: CYCLE_COLOR[cy.key] }} />
              {cy.label}
            </span>
          ))}
        </div>
        <p className="text-center text-[11px] text-slate-400 dark:text-slate-500 mt-2">{c.chartNote}</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        {result.cycles.map(state => {
          const meta = cycles.find(cy => cy.key === state.key)!;
          return (
            <div key={state.key} className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{meta.emoji}</span>
                <span className="text-sm font-black text-slate-800 dark:text-slate-100">{meta.label}</span>
                <span className={`ml-auto text-[11px] font-bold px-2 py-0.5 rounded-full border ${PHASE_STYLE[state.phase]}`}>
                  {phaseLabel(lang, state.phase)}
                </span>
              </div>
              <p className="text-3xl font-black leading-none" style={{ color: CYCLE_COLOR[state.key] }}>
                {state.percent > 0 ? '+' : ''}{state.percent}%
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">{c.cycleOf(meta.desc, meta.period)}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                {state.daysToCritical === 0 ? c.criticalToday : c.nextCritical(state.daysToCritical)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Biorhythm({ lang }: { lang: IntlLang }) {
  const [form, setForm] = useState({ year: '', month: '', day: '' });
  const [birth, setBirth] = useState<Date | null>(null);
  const [error, setError] = useState('');
  const c = COPY[lang];

  const points = useMemo(() => (birth ? getChartSeries(birth) : []), [birth]);
  const result = useMemo(() => (birth ? getBiorhythm(birth) : null), [birth]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const y = Number(form.year), m = Number(form.month), d = Number(form.day);

    if (!y || !m || !d) { setError(c.errAll); return; }
    if (m < 1 || m > 12) { setError(c.errMonth); return; }
    if (d < 1 || d > 31) { setError(c.errDay); return; }

    const date = new Date(y, m - 1, d);
    // 2월 30일처럼 없는 날짜는 Date가 조용히 다음 달로 넘긴다. 되돌려 확인한다.
    if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) {
      setError(c.errInvalid);
      return;
    }
    if (date > new Date()) { setError(c.errFuture); return; }

    setError('');
    setBirth(date);
  }

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageGlow accent="emerald" />
      <div className="h-1 bg-gradient-to-r from-emerald-500 to-teal-600" />
      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href={`/${lang}/fortune`} className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-emerald-600 transition-colors font-medium">
            <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {t('fortuneOf', lang)}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{c.title}</span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">📈 {c.title}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{c.lead}</p>
        </div>

        <form onSubmit={submit} className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 mb-6">
          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{c.birthLabel}</label>
          <div className="grid grid-cols-3 gap-2">
            <input type="number" inputMode="numeric" placeholder={c.yearPh} value={form.year}
              onChange={e => setForm({ ...form, year: e.target.value })}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:border-emerald-400 focus:outline-none" />
            <input type="number" inputMode="numeric" placeholder={c.monthPh} min={1} max={12} value={form.month}
              onChange={e => setForm({ ...form, month: e.target.value })}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:border-emerald-400 focus:outline-none" />
            <input type="number" inputMode="numeric" placeholder={c.dayPh} min={1} max={31} value={form.day}
              onChange={e => setForm({ ...form, day: e.target.value })}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:border-emerald-400 focus:outline-none" />
          </div>
          {error && <p className="text-xs text-rose-600 dark:text-rose-400 mt-2">{error}</p>}
          <button type="submit" className="w-full mt-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-black py-3 transition-colors">
            {c.submit}
          </button>
        </form>

        {result && points.length > 0 ? (
          <Result result={result} points={points} lang={lang} />
        ) : (
          <div className="text-center py-12 text-slate-300 dark:text-slate-600">
            <ToolIcon emoji="☝️" className="w-12 h-12 mx-auto mb-3 text-slate-800 dark:text-slate-100" />
            <p className="text-sm">{c.empty}</p>
          </div>
        )}

        {/*
          한국어 페이지와 같은 이유로 이 문단은 반드시 유지한다. 바이오리듬은 계산이
          결정론적이라 오히려 과학처럼 보이기 쉬운데, 주기값 자체에 근거가 없다는
          점은 분명히 적어야 한다.
        */}
        <div className="mt-8 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
          <h2 className="text-sm font-black text-slate-800 dark:text-slate-100 mb-2">{c.scienceQ}</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{c.scienceA}</p>
        </div>

        {result && <div className="mt-4"><ReferralCards lang="en" placement="result" /></div>}
      </div>
    </div>
  );
}
