'use client';
import { shareOne } from '@/lib/share/ui';
import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import ToolIcon from '@/components/ToolIcon';
import PageGlow from '@/components/PageGlow';
import LangPicker from '@/components/LangPicker';
import ReferralCards from '@/components/ReferralCards';
import { ALL_LOCALES10, localeHref, type AnyLocale10 } from '@/lib/locales';
import {
  STEMS, BRANCHES,
  buildChart, countElements, getSingang, pillarHanja,
  type Element, type Pillar,
} from '@/lib/saju-data';
import { sajuFacts } from '@/lib/saju-fortune-facts';
import { analyzeFortune } from '@/lib/saju-fortune';
import { analyzeFortuneIntl } from '@/lib/saju-fortune-intl';
import { type SajuL10nLang } from '@/lib/saju-l10n/index';
import { TOPIC_L10N } from '@/lib/saju-topics-l10n/index';
import SajuForm from '@/components/fortune/SajuForm';
import SajuTopicNav from '@/components/fortune/SajuTopicNav';
import Faq from '@/components/Faq';
import SajuEvidence, { evidenceTerm, evidenceValue } from '@/components/fortune/SajuEvidence';
import {
  TOPIC_DOMAIN, TOPIC_EMOJI, TOPIC_COLOR, topicEvidence, topicQuery, NAME_KEY,
  type TopicSlug,
} from '@/lib/saju-topics';

/**
 * 사주 주제 낱장 — /fortune/saju/<주제>, 열 언어가 이 컴포넌트 하나를 쓴다.
 *
 * ── 왜 하나인가 ──────────────────────────────────────────
 * 통합 페이지는 한국어(app/(ko)/fortune/saju)와 아홉 언어(SajuIntl)가 화면을 따로
 * 갖고 있다. 한국어 문구가 lib/saju-fortune.ts 안에 코드와 섞여 있어서 갈렸던 것인데,
 * 주제 낱장은 처음부터 표(lib/saju-topics-l10n/)로 시작하므로 가를 이유가 없다.
 * 해설만 언어에 따라 analyzeFortune / analyzeFortuneIntl로 갈라 받는다 — 둘은 같은
 * 모양을 돌려주고, 점수는 lib/saju-fortune-facts.ts 한 벌에서 나오므로 같다.
 *
 * ── 이름은 브라우저 밖으로 안 나간다 ─────────────────────
 * 이름으로 사주가 바뀌지 않는다(그건 틀린 명리다). 부르는 말과 공유 문구에만 쓴다.
 * 그래서 name은 useState에만 있고 주소(replaceState)에도, 서버에도 넣지 않는다 —
 * 주소에 넣으면 개인정보인 데다 캐시가 이름마다 갈린다.
 * tests/saju-topics.test.ts가 주소에 쓰는 열쇠를 세어 그것을 지킨다.
 */

/** 공유 링크에 싣는 열쇠 — 이름은 여기 없다. 늘릴 때 검사도 함께 본다. */
export const SHARE_KEYS = ['y', 'm', 'd', 'h', 'g'] as const;

const COLOR: Record<string, { bg: string; border: string; text: string; dot: string; grad: string }> = {
  rose:   { bg: 'bg-rose-50 dark:bg-rose-950/30',     border: 'border-rose-200 dark:border-rose-900/50',     text: 'text-rose-700 dark:text-rose-300',     dot: 'bg-rose-400',   grad: 'from-rose-500 to-rose-700' },
  blue:   { bg: 'bg-blue-50 dark:bg-blue-950/30',     border: 'border-blue-200 dark:border-blue-900/50',     text: 'text-blue-700 dark:text-blue-300',     dot: 'bg-blue-400',   grad: 'from-blue-500 to-blue-700' },
  orange: { bg: 'bg-orange-50 dark:bg-orange-950/30', border: 'border-orange-200 dark:border-orange-900/50', text: 'text-orange-700 dark:text-orange-300', dot: 'bg-orange-400', grad: 'from-orange-500 to-orange-700' },
  teal:   { bg: 'bg-teal-50 dark:bg-teal-950/30',     border: 'border-teal-200 dark:border-teal-900/50',     text: 'text-teal-700 dark:text-teal-300',     dot: 'bg-teal-400',   grad: 'from-teal-500 to-teal-700' },
  amber:  { bg: 'bg-amber-50 dark:bg-amber-950/30',   border: 'border-amber-200 dark:border-amber-900/50',   text: 'text-amber-700 dark:text-amber-300',   dot: 'bg-amber-400',  grad: 'from-amber-500 to-amber-700' },
  green:  { bg: 'bg-green-50 dark:bg-green-950/30',   border: 'border-green-200 dark:border-green-900/50',   text: 'text-green-700 dark:text-green-300',   dot: 'bg-green-400',  grad: 'from-green-600 to-green-800' },
  indigo: { bg: 'bg-indigo-50 dark:bg-indigo-950/30', border: 'border-indigo-200 dark:border-indigo-900/50', text: 'text-indigo-700 dark:text-indigo-300', dot: 'bg-indigo-400', grad: 'from-indigo-500 to-indigo-700' },
};

const ELEMENT_HEX: Record<Element, string> = {
  목: '#15803d', 화: '#dc2626', 토: '#ca8a04', 금: '#475569', 수: '#2563eb',
};

const fill = (tpl: string, vars: Record<string, string>) =>
  tpl.replace(/\{(\w+)\}/g, (m, k) => vars[k] ?? m);

type Gender = 'male' | 'female';

/** 네 기둥 한 칸 */
function PillarCell({ label, p }: { label: string; p: Pillar | null }) {
  if (!p) return (
    <div className="rounded-xl border border-dashed border-slate-200 dark:border-slate-700 p-2.5 text-center">
      <p className="text-[10px] text-slate-400 dark:text-slate-500 mb-1">{label}</p>
      <p className="text-xl text-slate-300 dark:text-slate-600">—</p>
    </div>
  );
  const s = STEMS[p.stemIdx], b = BRANCHES[p.branchIdx];
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-2.5 text-center">
      <p className="text-[10px] text-slate-400 dark:text-slate-500 mb-1">{label}</p>
      <p className="text-xl font-black leading-tight" style={{ color: ELEMENT_HEX[s.element] }}>{s.hanja}</p>
      <p className="text-xl font-black leading-tight" style={{ color: ELEMENT_HEX[b.element] }}>{b.hanja}</p>
    </div>
  );
}

export default function SajuTopicPage({ lang, topic }: { lang: AnyLocale10; topic: TopicSlug }) {
  const c = TOPIC_L10N[lang];
  const isKo = lang === 'ko';
  const col = COLOR[TOPIC_COLOR[topic]] ?? COLOR.indigo;

  const [form, setForm] = useState({ year: '', month: '', day: '', hour: '', gender: 'male' as Gender });
  const [name, setName] = useState('');
  const [chart, setChart] = useState<ReturnType<typeof buildChart> | null>(null);
  const [birthYear, setBirthYear] = useState(0);
  const [gender, setGender] = useState<Gender>('male');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const run = useCallback((y: string, m: string, d: string, h: string, g: Gender) => {
    const yi = parseInt(y, 10), mi = parseInt(m, 10), di = parseInt(d, 10);
    if (!yi || !mi || !di || yi < 1900 || yi > 2100 || mi < 1 || mi > 12 || di < 1 || di > 31) {
      setError(c.ui.empty); return;
    }
    setError('');
    const [hh, mm] = h.split(':');
    setChart(buildChart({
      year: yi, month: mi, day: di,
      hour: h === '' ? null : parseInt(hh, 10),
      minute: parseInt(mm ?? '0', 10) || 0,
    }, g));
    setBirthYear(yi);
    setGender(g);
    // 이름은 넣지 않는다 — 개인정보이고, 주소에 넣으면 캐시가 이름마다 갈린다
    window.history.replaceState({}, '', `?${new URLSearchParams({ y, m, d, ...(h ? { h } : {}), g })}`);
    setTimeout(() => document.getElementById('topic-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
  }, [c.ui.empty]);

  // 공유된 링크로 들어오면 폼을 채우고 바로 푼다. 주소에 이름은 없다.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const y = p.get('y') ?? '', m = p.get('m') ?? '', d = p.get('d') ?? '';
    const h = p.get('h') ?? '', g = (p.get('g') ?? 'male') as Gender;
    /* 이름은 주소에 없다 — 주제를 옮겨 다닐 때만 탭 안에서 따라온다.
       sessionStorage라 탭을 닫으면 사라지고, 서버로는 안 간다. */
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setName(sessionStorage.getItem(NAME_KEY) ?? '');
    if (y && m && d) { setForm({ year: y, month: m, day: d, hour: h, gender: g }); run(y, m, d, h, g); }
  }, [run]);

  /** 이름은 상태와 sessionStorage에만 둔다 */
  const changeName = useCallback((v: string) => {
    setName(v);
    sessionStorage.setItem(NAME_KEY, v);
  }, []);

  /* ── 파생 ── */
  const pillars = chart ? [chart.year, chart.month, chart.day, chart.hour] : [];
  const counts = chart ? countElements(pillars) : ({} as Record<string, number>);
  const singang = chart ? getSingang(chart.day.stemIdx, pillars) : null;
  const facts = chart && singang
    ? sajuFacts(chart.day, chart.year, chart.month, chart.hour, gender, singang.strong, counts)
    : null;

  const age = chart ? new Date().getFullYear() - birthYear : 0;
  const currentDaewoon = chart?.daewoons.find(d => age >= d.startAge && age <= d.endAge)?.pillar ?? null;

  const domains = chart && singang
    ? (isKo
        ? analyzeFortune(chart.day, chart.year, chart.month, chart.hour, gender, singang.strong, counts)
        : analyzeFortuneIntl(chart.day, chart.year, chart.month, chart.hour, gender, singang.strong, counts, lang as SajuL10nLang))
    : [];
  const domain = domains.find(d => d.id === TOPIC_DOMAIN[topic]);

  const rows = facts && chart
    ? topicEvidence(topic, facts, chart.day, chart.month, currentDaewoon)
    : [];

  const topicTitle = c.title[topic];
  const heading = name.trim()
    ? fill(c.ui.titleOf, { name: name.trim(), topic: topicTitle })
    : topicTitle;

  async function share() {
    if (!chart) return;
    // 이름은 공유 문구에만 들어간다 — 주소(location.href)에는 없다
    const text = `${heading} — ${pillarHanja(chart.day)}\n${domain ? `${domain.grade} · ${domain.summary}` : ''}`;
    // 글과 주소가 한 덩이로 — 나뉘면 받는 쪽에 둘 중 하나만 온다
    if (await shareOne(text)) { setCopied(true); setTimeout(() => setCopied(false), 2000); }
  }

  const hubHref = localeHref(lang, '/fortune/saju');

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageGlow accent="violet" />
      <div className={`h-1 bg-gradient-to-r ${col.grad}`} />

      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href={hubHref} className="page-back hover:text-indigo-600 text-sm text-slate-400 dark:text-slate-500 flex items-center gap-1">
            <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {c.ui.backToAll}
          </Link>
          <span className="ml-auto shrink-0">
            <LangPicker current={lang} route={`/fortune/saju/${topic}`} available={ALL_LOCALES10} />
          </span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <ToolIcon emoji={TOPIC_EMOJI[topic]} className="w-12 h-12 mx-auto mb-3 text-slate-800 dark:text-slate-100" />
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-1.5">{heading}</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{c.lead[topic]}</p>
        </div>

        {/* ── 입력 ── 폼은 components/fortune/SajuForm.tsx 하나뿐이다 */}
        <SajuForm
          lang={lang} value={form} onChange={setForm}
          onSubmit={() => run(form.year, form.month, form.day, form.hour, form.gender)}
          submitClass={col.grad} error={error}
          submitLabel={<>{TOPIC_EMOJI[topic]} {topicTitle}</>}
        >
          {/* 이름 — 부르는 말과 공유 문구에만 쓴다. 주소에도 서버에도 안 보낸다. */}
          <label htmlFor="saju-topic-name" className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{c.ui.nameLabel}</label>
          <input id="saju-topic-name" type="text" value={name} placeholder={c.ui.namePh} autoComplete="off"
            onChange={e => changeName(e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:border-indigo-400 focus:outline-none mb-1" />
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{c.ui.nameNote}</p>
        </SajuForm>

        {/* ══ 결과 ══ */}
        {chart && domain && facts ? (
          <div id="topic-result" className="space-y-4">

            {/* 명식 */}
            <div className="grid grid-cols-4 gap-2">
              <PillarCell label="年" p={chart.year} />
              <PillarCell label="月" p={chart.month} />
              <PillarCell label="日" p={chart.day} />
              <PillarCell label="時" p={chart.hour} />
            </div>

            {/*
              이 주제가 짚는 자리 — 주제마다 다른 글자를 본다. 같은 사주로 연애와
              재물을 열면 이 표가 다르다. 그것이 주제를 가른 이유다.
            */}
            <div className={`rounded-2xl border ${col.border} ${col.bg} p-5`}>
              <p className={`text-xs font-black uppercase tracking-wide mb-3 ${col.text}`}>{c.ui.evidence}</p>
              <SajuEvidence lang={lang} rows={rows} />
            </div>

            {/* 점수와 해설 */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
              <div className="flex items-center gap-2 mb-3">
                <p className="label-caps text-xs font-black text-slate-400 dark:text-slate-500 uppercase">{c.ui.reading}</p>
                <span className="ml-auto flex gap-1.5">
                  {[1, 2, 3, 4, 5].map(i => (
                    <span key={i} className={`w-4 h-4 rounded-full ${i <= domain.score ? col.dot : 'bg-slate-200 dark:bg-slate-700'}`} />
                  ))}
                </span>
                <span className={`text-xs font-black px-2.5 py-1 rounded-full ${col.bg} ${col.text}`}>{domain.grade}</span>
              </div>

              {/* 사주마다 갈리는 머리말 — 첫 근거 줄을 문장으로 세운다 */}
              {rows[0] && (
                <p className={`text-sm font-bold leading-relaxed mb-3 ${col.text}`}>
                  {fill(c.ui.introLead, { term: evidenceTerm(lang, rows[0].term), value: evidenceValue(lang, rows[0]) })}
                </p>
              )}

              <p className="text-sm font-bold text-slate-700 dark:text-slate-200 leading-relaxed mb-4">{domain.summary}</p>

              <div className="space-y-2.5">
                {domain.points.map((pt, i) => (
                  <div key={i} className="flex gap-3 rounded-xl border border-slate-100 dark:border-slate-800 p-3">
                    <span className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black text-white ${col.dot}`}>{i + 1}</span>
                    <p className="text-sm text-slate-700 dark:text-slate-200 leading-[1.85]">{pt}</p>
                  </div>
                ))}
              </div>

              <div className={`mt-4 rounded-xl border ${col.border} ${col.bg} p-4`}>
                <p className="text-sm text-slate-700 dark:text-slate-200 leading-[1.85]">💡 {domain.advice}</p>
              </div>
            </div>

            {/* 배경 — 이 운이 명리에서 무엇을 보는가. 사람이 아니라 주제에 붙는 글이다. */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
              <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-2">{c.ui.background}</p>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-[1.9]">{domain.intro}</p>
            </div>

            <button onClick={share}
              className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 py-3 text-xs font-bold text-slate-600 dark:text-slate-300 hover:border-indigo-300 transition-colors">
              {copied ? '✓' : '🔗'}
            </button>

            <ReferralCards lang={isKo ? 'ko' : 'en'} placement="result" />
          </div>
        ) : (
          <div className="text-center py-10 text-slate-300 dark:text-slate-600">
            <ToolIcon emoji="☝️" className="w-12 h-12 mx-auto mb-3 text-slate-800 dark:text-slate-100" />
            <p className="text-sm">{c.ui.empty}</p>
          </div>
        )}

        {/*
          다른 주제로 가는 줄. 뒤에 붙인 낱장은 들어오는 링크가 0이 되기 쉬워서
          일곱 장이 서로를 가리키게 둔다.
        */}
        {/*
          자주 묻는 질문. 검색 결과에 물음이 그대로 뜨는 자리라 실제로 묻는 것만
          적는다 — Faq가 FAQPage 구조화 데이터도 함께 내보낸다. 어느 주제에서나
          같은 물음 둘에 그 주제의 물음 하나를 붙인다.
        */}
        <Faq lang={lang} items={[...c.faqCommon, c.faqTopic[topic]]} />

        <div className="mt-8">
          <SajuTopicNav lang={lang} current={topic} query={topicQuery(form)} />
          <Link href={hubHref + topicQuery(form)} className="next-step">
            🔯 {c.ui.backToAll}
          </Link>
        </div>
      </div>
    </div>
  );
}
