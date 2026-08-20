'use client';
import ToolIcon from '@/components/ToolIcon';
import Ad from '@/components/Ad';
import PageHero from '@/components/PageHero';
import { useState } from 'react';
import Link from 'next/link';
import type { Test, TestOpt, TestResult } from '@/lib/types';
import type { AnyLocale10 } from '@/lib/locales';
import ShareButton from './ShareButton';
import SaveResultCard from './SaveResultCard';
import PageGlow from './PageGlow';
import { thumbSurface } from '@/lib/thumbnail';
import { renderEmphasis, stripEmphasis } from '@/lib/emphasis';

/*
 * 결과 이미지의 배경색.
 *
 * 화면의 히어로 카드는 result.color(테일윈드 클래스)로 칠하는데 캔버스는
 * 클래스를 모른다. 수백 개 결과의 색을 전부 hex로 옮겨 적는 대신 섹션의
 * 대표색 한 쌍만 쓴다 — 테스트 페이지의 상단 띠와 같은 보라·자홍이다.
 */
const CARD_FROM = '#8b5cf6';
const CARD_TO = '#db2777';

function getMbtiType(scores: Record<string, number>): string {
  const e = (scores.EI ?? 0) >= 8 ? 'E' : 'I';
  const s = (scores.SN ?? 0) >= 8 ? 'S' : 'N';
  const t = (scores.TF ?? 0) >= 8 ? 'T' : 'F';
  const j = (scores.JP ?? 0) >= 8 ? 'J' : 'P';
  return e + s + t + j;
}

/*
 * 채점 방식 네 가지.
 *
 * 점수합 → 구간(기본)은 결과에 순서가 있을 때만 맞는다. "언어형/봉사형/선물형/
 * 스킨십형"처럼 순서가 없는 넷을 한 줄에 세우면 "말 → 시간 → 행동 → 선물"이라는
 * 뜻 없는 순서가 생기고, 가운데 유형은 답이 섞이기만 해도 나와버린다.
 * 그래서 결과의 생김새에 맞는 채점을 골라 쓴다. 데이터에 type이 없으면
 * 예전 그대로 점수합이다 — 263종 중 259종이 그 길로 간다.
 */

/**
 * 범주형: 표를 가장 많이 받은 유형.
 *
 * 동점이면 그중 마지막에 고른 쪽이 이긴다. results에 먼저 적은 쪽으로 붙이면
 * 순서가 곧 가중치가 되어 맨 앞 결과가 34%·맨 뒤가 18%로 갈렸다. 마지막 선택을
 * 보면 넷이 25%씩으로 고르고, "표가 같으면 최근에 기운 쪽"이라는 뜻도 선다.
 */
function byVotes(results: TestResult[], chosen: TestOpt[]): TestResult | undefined {
  const votes: Record<string, number> = {};
  const last: Record<string, number> = {};
  chosen.forEach((o, i) => { if (o.k) { votes[o.k] = (votes[o.k] ?? 0) + 1; last[o.k] = i; } });
  return results.reduce((best, r) => {
    const v = votes[r.k!] ?? 0, bv = votes[best.k!] ?? 0;
    return v > bv || (v === bv && (last[r.k!] ?? -1) > (last[best.k!] ?? -1)) ? r : best;
  }, results[0]);
}

/** 사분면: 축마다 합을 내고 부호를 이어 붙인 열쇠('+-' 등)로 결과를 찾는다 */
function byAxes(results: TestResult[], chosen: TestOpt[]): TestResult | undefined {
  const sums: number[] = [];
  for (const o of chosen) (o.ax ?? []).forEach((v, i) => { sums[i] = (sums[i] ?? 0) + v; });
  // 합이 0이면 '-'다. 그 몫까지 합쳐 tests/test-result-balance.test.ts가 결과 배분을 잰다
  const key = sums.map(v => (v > 0 ? '+' : '-')).join('');
  return results.find(r => r.k === key);
}

export type TestLang = AnyLocale10;

/**
 * 사용자에게 보이는 문구만 언어별로 갈라둔다. 채점 로직은 열 언어가 동일하다.
 *
 * Partial이 아니라 Record<TestLang, …>다. 언어가 빠지면 tsc가 잡는다 —
 * Partial이면 그 언어만 화면이 조용히 비고 검사도 초록이 뜬다.
 */
const UI: Record<TestLang, {
  allTests: string; start: string; restart: string; retake: string; more: string;
  traits: string; resultOf: (cat: string) => string; meta: (n: number) => string;
  myMbti: (t: string) => string;
  /** 공유 제목 — t는 테스트 이름, r은 결과 한 줄 */
  shareTitle: (t: string, r: string) => string;
}> = {
  ko: {
    allTests: '전체 테스트', start: '테스트 시작하기 →', restart: '다시하기',
    retake: '다시 테스트하기', more: '다른 테스트 보기', traits: '주요 특성',
    resultOf: cat => `${cat} 테스트 결과`,
    meta: n => `${n}문항 · 약 2분 소요`,
    myMbti: t => `나의 MBTI는 ${t}!`,
    shareTitle: (t, r) => `${t} 결과: ${r}`,
  },
  en: {
    allTests: 'All tests', start: 'Start the test →', restart: 'Start over',
    retake: 'Take it again', more: 'More tests', traits: 'Key traits',
    resultOf: cat => `${cat} test result`,
    meta: n => `${n} questions · about 2 minutes`,
    myMbti: t => `My MBTI is ${t}!`,
    shareTitle: (t, r) => `My ${t} result: ${r}`,
  },
  es: {
    allTests: 'Todos los tests', start: 'Empezar el test →', restart: 'Volver a empezar',
    retake: 'Hacerlo otra vez', more: 'Más tests', traits: 'Rasgos principales',
    resultOf: cat => `Resultado del test de ${cat}`,
    meta: n => `${n} preguntas · unos 2 minutos`,
    myMbti: t => `¡Mi MBTI es ${t}!`,
    shareTitle: (t, r) => `Mi resultado de ${t}: ${r}`,
  },
  'pt-br': {
    allTests: 'Todos os testes', start: 'Começar o teste →', restart: 'Começar de novo',
    retake: 'Fazer de novo', more: 'Mais testes', traits: 'Traços principais',
    resultOf: cat => `Resultado do teste de ${cat}`,
    meta: n => `${n} perguntas · cerca de 2 minutos`,
    myMbti: t => `Meu MBTI é ${t}!`,
    shareTitle: (t, r) => `Meu resultado de ${t}: ${r}`,
  },
  ja: {
    allTests: '診断一覧', start: '診断をはじめる →', restart: 'やり直す',
    retake: 'もう一度診断する', more: 'ほかの診断を見る', traits: '主な特徴',
    resultOf: cat => `${cat}診断の結果`,
    meta: n => `全${n}問 · 約2分`,
    myMbti: t => `私のMBTIは${t}！`,
    shareTitle: (t, r) => `${t}の結果: ${r}`,
  },
  de: {
    allTests: 'Alle Tests', start: 'Test starten →', restart: 'Von vorn',
    retake: 'Noch einmal machen', more: 'Mehr Tests', traits: 'Wichtigste Merkmale',
    resultOf: cat => `Ergebnis: ${cat}`,
    meta: n => `${n} Fragen · etwa 2 Minuten`,
    myMbti: t => `Mein MBTI ist ${t}!`,
    shareTitle: (t, r) => `Mein Ergebnis bei ${t}: ${r}`,
  },
  fr: {
    allTests: 'Tous les tests', start: 'Commencer le test →', restart: 'Recommencer',
    retake: 'Refaire le test', more: 'Plus de tests', traits: 'Traits principaux',
    resultOf: cat => `Résultat du test ${cat}`,
    meta: n => `${n} questions · environ 2 minutes`,
    myMbti: t => `Mon MBTI est ${t} !`,
    shareTitle: (t, r) => `Mon résultat au ${t} : ${r}`,
  },
  hi: {
    allTests: 'सभी टेस्ट', start: 'टेस्ट शुरू करें →', restart: 'फिर से शुरू',
    retake: 'दोबारा टेस्ट करें', more: 'और टेस्ट देखें', traits: 'मुख्य ख़ूबियाँ',
    resultOf: cat => `${cat} टेस्ट का नतीजा`,
    meta: n => `${n} सवाल · लगभग 2 मिनट`,
    myMbti: t => `मेरा MBTI है ${t}!`,
    shareTitle: (t, r) => `${t} का मेरा नतीजा: ${r}`,
  },
  'zh-hans': {
    allTests: '全部测试', start: '开始测试 →', restart: '重新开始',
    retake: '再测一次', more: '看看别的测试', traits: '主要特点',
    resultOf: cat => `${cat}测试结果`,
    meta: n => `${n}道题 · 约2分钟`,
    myMbti: t => `我的MBTI是${t}！`,
    shareTitle: (t, r) => `我的${t}结果：${r}`,
  },
  'zh-hant': {
    allTests: '全部測驗', start: '開始測驗 →', restart: '重新開始',
    retake: '再測一次', more: '看看別的測驗', traits: '主要特點',
    resultOf: cat => `${cat}測驗結果`,
    meta: n => `${n}道題 · 約2分鐘`,
    myMbti: t => `我的MBTI是${t}！`,
    shareTitle: (t, r) => `我的${t}結果：${r}`,
  },
};

  /*
   * headerRight — 머리줄 오른쪽에 얹을 것(언어 고르개).
   * 예전에는 부르는 쪽이 이 엔진 **위에** 자기 줄을 하나 더 만들어 고르개를
   * 놓았다. 화면 위쪽 50px이 고르개 하나에 쓰였고, 머리 띠가 두 겹으로 보였다.
   * 머리줄이 이미 있으므로 그 안에 넣는다.
   */
export default function TestEngine({ test, lang = 'ko', headerRight }: { test: Test; lang?: TestLang; headerRight?: React.ReactNode }) {
  const ui = UI[lang];
  const hubHref = lang === 'ko' ? '/test' : `/${lang}/test`;
  const [phase, setPhase] = useState<'start' | 'question' | 'result'>('start');
  /* 고른 보기의 번호만 남긴다 — 점수합·축합·표는 전부 여기서 다시 계산한다 */
  const [picks, setPicks] = useState<number[]>([]);
  const current = picks.length;

  const isMbti = test.type === 'mbti';

  function pick(optIndex: number) {
    const next = [...picks, optIndex];
    setPicks(next);
    if (next.length >= test.questions.length) setPhase('result');
  }

  function restart() { setPhase('start'); setPicks([]); }

  const chosen = picks.map((oi, qi) => test.questions[qi].opts[oi]);
  const total = chosen.reduce((s, o) => s + o.score, 0);

  let mbtiType: string | null = null;
  if (isMbti) {
    const axisScores: Record<string, number> = {};
    picks.forEach((oi, qi) => {
      const a = test.questions[qi].axis;
      if (a) axisScores[a] = (axisScores[a] ?? 0) + test.questions[qi].opts[oi].score;
    });
    mbtiType = getMbtiType(axisScores);
  }

  const result = (
    isMbti ? test.results.find(r => r.mbtiType === mbtiType)
    : test.type === 'category' ? byVotes(test.results, chosen)
    : test.type === 'quadrant' ? byAxes(test.results, chosen)
    : test.results.find(r => total >= r.min && total <= r.max)
  ) ?? test.results[test.results.length - 1];
  const progress = Math.round((current / test.questions.length) * 100);

  /* ── START ── */
  if (phase === 'start') return (
    <div className="page-wrap flex flex-col">
      <PageGlow accent="violet" />
      <div className="h-1 topbar" />
      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center gap-2">
          <Link href={hubHref} className="text-sm text-slate-500 dark:text-slate-400 hover:text-violet-600 flex items-center gap-1.5 font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.allTests}
          </Link>
        {headerRight && <span className="ml-auto shrink-0">{headerRight}</span>}
        </div>
      </header>
      <div className="flex-1 px-4 py-8 max-w-lg mx-auto w-full">
        {/*
          128px 아이콘 판이 첫 화면을 통째로 차지했다. 시작 화면은 «무엇을
          하는 것이고 얼마나 걸리나»를 알려 주는 자리지 소개 포스터가 아니다.
          칩 하나로 줄이고 왼쪽에 세운다 — 다른 갈래와 같은 규격이다.
        */}
        <div className="mb-3 flex items-center gap-2">
          <span className="bg-sec-soft inline-flex h-10 w-10 items-center justify-center rounded-lg">
            <ToolIcon emoji={test.icon} className="h-5 w-5" />
          </span>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{test.category}</span>
        </div>
        <div className="hero-band">
            <PageHero title={test.title} desc={test.desc} />
          </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-8">{ui.meta(test.questions.length)}</p>
        <button onClick={() => setPhase('question')}
          className="btn-pri">
          {ui.start}
        </button>
      </div>
    </div>
  );

  /* ── QUESTION ── */
  if (phase === 'question') {
    const q = test.questions[current];
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 flex flex-col">
        <div className="h-1.5 bg-violet-100 dark:bg-violet-950/40">
          <div className="h-full bg-sec transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
        <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
          <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
            <span className="text-sm font-bold text-violet-600 truncate mr-2">{test.title}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 shrink-0">{current + 1} / {test.questions.length}</span>
          </div>
        </header>
        <div key={current} className="flex-1 px-4 py-10 max-w-lg mx-auto w-full te-fade">
          <span className="inline-block text-xs font-bold text-violet-700 dark:text-violet-300 bg-violet-50 dark:bg-violet-950/40 px-2.5 py-1 rounded-full mb-4">Q{current + 1}</span>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-8 leading-relaxed whitespace-pre-line tracking-tight">{q.q}</h2>
          <div className="flex flex-col gap-2.5">
            {q.opts.map((opt, i) => (
              <button key={i} onClick={() => pick(i)}
                className="group w-full text-left flex items-center gap-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg pl-3 pr-4 py-3.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:border-violet-400 hover:bg-sec-soft hover:text-violet-700 hover:shadow-sm active:scale-[0.99] transition-all">
                <span className="shrink-0 w-7 h-7 rounded-full border-2 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-xs font-medium flex items-center justify-center transition-colors group-hover:border-violet-500 group-hover:bg-violet-500 group-hover:text-white">
                  {['A', 'B', 'C', 'D', 'E'][i] ?? i + 1}
                </span>
                <span className="flex-1 leading-snug">{opt.text}</span>
                <svg className="w-4 h-4 shrink-0 text-slate-200 dark:text-slate-700 group-hover:text-sec group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            ))}
          </div>
        </div>
        <style jsx>{`
          .te-fade { animation: teFade 0.28s ease-out; }
          @keyframes teFade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        `}</style>
      </div>
    );
  }

  /* ── RESULT ── */
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 flex flex-col">
      <div className="h-1 topbar" />
      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center">
          <button onClick={restart} className="text-sm text-slate-500 dark:text-slate-400 hover:text-violet-600 flex items-center gap-1.5 font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.restart}
          </button>
        </div>
      </header>
      <div className="flex-1 px-4 py-8 max-w-lg mx-auto w-full">
        {/*
          ── 결과 카드 (2026-08-20) ────────────────────────────────
          단계마다 다른 그라디언트 판에 흰 글자와 7xl 이모지를 얹고 있었다.
          결과 문장이 대여섯 줄인데 색 판 위의 흰 글자는 읽기가 눈에 띄게
          힘들고, 그 꼴 자체가 어느 템플릿에나 있다.

          판을 흰 종이로 되돌리고 **등급 색은 위쪽 굵은 선 하나**로 남긴다 —
          결과 등급은 정보라 색을 버리지 않되, 면적을 안 먹게 한다. 이모지도
          한 급 줄여 제목이 화면의 주인이 되게 했다.
        */}
        <div className="te-pop surface relative mb-6 overflow-hidden p-7 text-center">
          <span className="te-grade" aria-hidden="true" />
          <div className="te-pop-emoji mb-3 text-5xl">{result.emoji}</div>
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">{ui.resultOf(test.category)}</span>
          {mbtiType && (
            <p className="mt-3 text-4xl font-bold tracking-widest text-slate-900 dark:text-white">{mbtiType}</p>
          )}
          <h2 className="mt-1.5 mb-3 text-[1.625rem] font-bold leading-tight tracking-[-0.03em] text-balance text-slate-900 dark:text-white">{result.title}</h2>
          <p className="text-[15px] leading-relaxed text-slate-600 dark:text-slate-300 text-pretty">{renderEmphasis(result.desc)}</p>
        </div>

        {/* Traits */}
        {result.traits && result.traits.length > 0 && (
          <div className="bg-slate-50 dark:bg-slate-950 rounded-lg p-5 mb-5">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wide">{ui.traits}</p>
            <div className="flex flex-wrap gap-2">
              {result.traits.map((t, i) => (
                <span key={i} className="text-xs font-bold px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-full text-slate-700 dark:text-slate-200 shadow-sm">
                  ✦ {t}
                </span>
              ))}
            </div>
          </div>
        )}
        <style jsx>{`
          .te-pop { animation: tePop 0.4s cubic-bezier(0.22, 1, 0.36, 1); }
          .te-pop-emoji { animation: tePopEmoji 0.55s cubic-bezier(0.34, 1.56, 0.64, 1); }
          @keyframes tePop { from { opacity: 0; transform: scale(0.94) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
          @keyframes tePopEmoji { 0% { opacity: 0; transform: scale(0.3); } 60% { transform: scale(1.15); } 100% { opacity: 1; transform: scale(1); } }
        `}</style>

        {/* lang을 안 넘기면 ShareButton 기본값이 'ko'라 아홉 외국어 화면에 한국어 버튼이 붙는다 */}
        <ShareButton
          title={ui.shareTitle(test.title, `${mbtiType ? `${mbtiType} ` : ''}${result.emoji} ${result.title}`)}
          description={`${mbtiType ? `${ui.myMbti(mbtiType)}\n` : ''}${result.title}\n\n${stripEmphasis(result.desc)}`}
          type="test"
          lang={lang}
        />

        {/* 링크만 나가면 SNS에서 안 보인다 — 결과를 정사각 이미지로도 내보낸다 */}
        <div className="mt-3">
          <SaveResultCard
            emoji={result.emoji}
            title={`${mbtiType ? `${mbtiType} · ` : ''}${result.title}`}
            subtitle={ui.resultOf(test.category)}
            body={stripEmphasis(result.desc)}
            from={CARD_FROM}
            to={CARD_TO}
            fileName={`vixutil-${test.slug}`}
            lang={lang}
            eyebrow="TEST · vixutil.com"
            url={`vixutil.com${hubHref}`}
            referral={false}
          />
        </div>

        {/*
          결과 화면은 사용자가 직접 버튼을 눌러 도달한, 시선이 가장 오래 머무는
          자리다. 공유 버튼 다음·다음 행동 버튼 앞에 둔다 — 결과를 다 읽고 나서
          자연스럽게 눈에 들어오되, 결과 자체를 가리지는 않는 위치다.
        */}
        {/* lang을 안 넘기면 기본값 'ko'라 아홉 외국어 결과 화면에 한국어 카드가 붙는다 */}
        <Ad lang={lang} placement="result" />

        <div className="mt-6 flex flex-col gap-3">
          <button onClick={restart}
            className="w-full bg-violet-600 hover:bg-violet-700 text-white rounded-xl py-3.5 font-bold text-sm transition-colors">
            {ui.retake}
          </button>
          <Link href={hubHref}
            className="w-full block text-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 rounded-xl py-3.5 font-bold text-sm transition-colors">
            {ui.more}
          </Link>
        </div>
      </div>
    </div>
  );
}
