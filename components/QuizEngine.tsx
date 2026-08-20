'use client';
import ToolIcon from '@/components/ToolIcon';
import Ad from '@/components/Ad';
import PageHero from '@/components/PageHero';
import { useState } from 'react';
import Link from 'next/link';
import type { Quiz } from '@/lib/types';
import type { AnyLocale10 } from '@/lib/locales';
import ShareButton from './ShareButton';
import SaveResultCard from './SaveResultCard';
import PageGlow from './PageGlow';
import { thumbSurface } from '@/lib/thumbnail';
import { gradeVar } from '@/lib/grade-color';

type Phase = 'start' | 'question' | 'answer' | 'result';

export type QuizLang = AnyLocale10;

/**
 * 사용자에게 보이는 문구만 언어별로 갈라둔다. 채점·진행 로직은 열 언어가 동일하다.
 *
 * Partial이 아니라 Record<QuizLang, …>다 — 언어가 빠지면 tsc가 잡는다.
 */
const UI: Record<QuizLang, {
  allQuizzes: string; start: string; correct: string; wrong: string;
  explanation: string; next: string; seeResult: string; retry: string; more: string;
  meta: (n: number) => string;
  score: (p: number) => string;
  wrongCount: (n: number) => string;
  grades: [string, string, string, string, string];
  msgs: [string, string, string, string, string];
  /** 공유 제목 — q는 퀴즈 이름, s는 score()로 이미 꾸민 점수 */
  shareTitle: (q: string, s: string) => string;
  /** 공유 설명의 앞머리 — 맞힌 수 / 전체 수 */
  shareDesc: (c: number, t: number) => string;
}> = {
  ko: {
    allQuizzes: '전체 퀴즈', start: '퀴즈 시작하기 →', correct: '✓ 정답!', wrong: '✗ 오답',
    explanation: '💡 해설', next: '다음 문제 →', seeResult: '결과 보기 →', retry: '다시 풀기', more: '다른 퀴즈 보기',
    meta: n => `${n}문항 · 4지선다 · 해설 포함`,
    score: p => `${p}점`,
    wrongCount: n => `틀린 문제 (${n}개)`,
    grades: ['만점!', '우수', '양호', '보통', '분발'],
    msgs: ['완벽해요! 모든 문제를 맞혔습니다!', '훌륭해요! 높은 점수네요!', '꽤 잘 알고 계시네요!', '조금 더 공부해봐요!', '다시 도전해봐요!'],
    shareTitle: (q, s) => `${q} ${s} 달성!`,
    shareDesc: (c, t) => `${c}/${t}문제 정답`,
  },
  en: {
    allQuizzes: 'All quizzes', start: 'Start the quiz →', correct: '✓ Correct', wrong: '✗ Wrong',
    explanation: '💡 Explanation', next: 'Next question →', seeResult: 'See results →', retry: 'Try again', more: 'More quizzes',
    meta: n => `${n} questions · four choices · with explanations`,
    score: p => `${p}%`,
    wrongCount: n => `Missed (${n})`,
    grades: ['Perfect', 'Excellent', 'Good', 'Fair', 'Keep going'],
    msgs: ['Perfect — every single one right.', 'Excellent, that is a strong score.', 'You know this reasonably well.', 'Worth another look at this one.', 'Give it another go.'],
    shareTitle: (q, s) => `${q} — scored ${s}`,
    shareDesc: (c, t) => `${c} of ${t} right`,
  },
  es: {
    allQuizzes: 'Todos los tests', start: 'Empezar el test →', correct: '✓ ¡Correcto!', wrong: '✗ Incorrecto',
    explanation: '💡 Explicación', next: 'Siguiente →', seeResult: 'Ver resultados →', retry: 'Volver a intentarlo', more: 'Más tests',
    meta: n => `${n} preguntas · cuatro opciones · con explicación`,
    score: p => `${p}%`,
    wrongCount: n => `Falladas (${n})`,
    grades: ['Perfecto', 'Excelente', 'Bien', 'Regular', 'A seguir'],
    msgs: ['¡Perfecto, todas acertadas!', 'Excelente, es una nota alta.', 'Se te da bastante bien.', 'Merece otra vuelta.', 'Inténtalo otra vez.'],
    shareTitle: (q, s) => `${q}: he sacado ${s}`,
    shareDesc: (c, t) => `${c} de ${t} correctas`,
  },
  'pt-br': {
    allQuizzes: 'Todos os quizzes', start: 'Começar o quiz →', correct: '✓ Certo!', wrong: '✗ Errado',
    explanation: '💡 Explicação', next: 'Próxima →', seeResult: 'Ver resultado →', retry: 'Tentar de novo', more: 'Mais quizzes',
    meta: n => `${n} perguntas · quatro opções · com explicação`,
    score: p => `${p}%`,
    wrongCount: n => `Erradas (${n})`,
    grades: ['Perfeito', 'Excelente', 'Bom', 'Razoável', 'Continue'],
    msgs: ['Perfeito — acertou todas.', 'Excelente, nota alta.', 'Você manja bem disso.', 'Vale dar mais uma olhada.', 'Tente de novo.'],
    shareTitle: (q, s) => `${q}: tirei ${s}`,
    shareDesc: (c, t) => `${c} de ${t} certas`,
  },
  ja: {
    allQuizzes: 'クイズ一覧', start: 'クイズをはじめる →', correct: '✓ 正解！', wrong: '✗ 不正解',
    explanation: '💡 解説', next: '次の問題 →', seeResult: '結果を見る →', retry: 'もう一度', more: 'ほかのクイズ',
    meta: n => `全${n}問 · 4択 · 解説つき`,
    score: p => `${p}点`,
    wrongCount: n => `間違えた問題（${n}問）`,
    grades: ['満点！', '優秀', '良好', 'まずまず', 'もう一歩'],
    msgs: ['完璧です。全問正解！', 'お見事、高得点です。', 'なかなかよくご存じですね。', 'もう少し見直してみましょう。', 'もう一度挑戦してみましょう。'],
    shareTitle: (q, s) => `${q}で${s}を取りました！`,
    shareDesc: (c, t) => `${t}問中${c}問正解`,
  },
  de: {
    allQuizzes: 'Alle Quiz', start: 'Quiz starten →', correct: '✓ Richtig!', wrong: '✗ Falsch',
    explanation: '💡 Erklärung', next: 'Weiter →', seeResult: 'Ergebnis ansehen →', retry: 'Nochmal versuchen', more: 'Mehr Quiz',
    meta: n => `${n} Fragen · vier Antworten · mit Erklärung`,
    score: p => `${p} %`,
    wrongCount: n => `Falsch (${n})`,
    grades: ['Perfekt', 'Ausgezeichnet', 'Gut', 'Geht so', 'Weiter üben'],
    msgs: ['Perfekt — alles richtig.', 'Ausgezeichnet, starkes Ergebnis.', 'Da kennst du dich ordentlich aus.', 'Da lohnt sich ein zweiter Blick.', 'Versuch es noch einmal.'],
    shareTitle: (q, s) => `${q} — ${s} geschafft!`,
    shareDesc: (c, t) => `${c} von ${t} richtig`,
  },
  fr: {
    allQuizzes: 'Tous les quiz', start: 'Commencer le quiz →', correct: '✓ Correct !', wrong: '✗ Faux',
    explanation: '💡 Explication', next: 'Suivante →', seeResult: 'Voir le résultat →', retry: 'Réessayer', more: 'Plus de quiz',
    meta: n => `${n} questions · quatre choix · avec explication`,
    score: p => `${p} %`,
    wrongCount: n => `Ratées (${n})`,
    grades: ['Parfait', 'Excellent', 'Bien', 'Passable', 'Continue'],
    msgs: ['Parfait — tout juste.', 'Excellent, beau score.', 'Tu maîtrises plutôt bien.', 'Ça mérite une relecture.', 'Retente ta chance.'],
    shareTitle: (q, s) => `${q} — ${s} au compteur !`,
    shareDesc: (c, t) => `${c} bonnes réponses sur ${t}`,
  },
  hi: {
    allQuizzes: 'सभी क्विज़', start: 'क्विज़ शुरू करें →', correct: '✓ सही!', wrong: '✗ ग़लत',
    explanation: '💡 व्याख्या', next: 'अगला सवाल →', seeResult: 'नतीजा देखें →', retry: 'फिर से हल करें', more: 'और क्विज़',
    meta: n => `${n} सवाल · चार विकल्प · व्याख्या सहित`,
    score: p => `${p}%`,
    wrongCount: n => `ग़लत (${n})`,
    grades: ['पूरे अंक!', 'बहुत बढ़िया', 'अच्छा', 'ठीक-ठाक', 'और मेहनत'],
    msgs: ['बिल्कुल सही — सारे सवाल सही निकले!', 'बहुत बढ़िया, स्कोर ऊँचा है।', 'आप इसे ठीक-ठाक जानते हैं।', 'इस पर एक बार और नज़र डालिए।', 'एक बार और कोशिश कीजिए।'],
    shareTitle: (q, s) => `${q} में मुझे ${s} मिले!`,
    shareDesc: (c, t) => `${t} में से ${c} सही`,
  },
  'zh-hans': {
    allQuizzes: '全部测验', start: '开始测验 →', correct: '✓ 答对了！', wrong: '✗ 答错了',
    explanation: '💡 解析', next: '下一题 →', seeResult: '看结果 →', retry: '再做一次', more: '别的测验',
    meta: n => `${n}道题 · 四选一 · 附解析`,
    score: p => `${p}分`,
    wrongCount: n => `答错的题（${n}道）`,
    grades: ['满分！', '优秀', '良好', '一般', '再加把劲'],
    msgs: ['完美，全部答对！', '很棒，分数很高。', '这块你掌握得不错。', '这部分值得再看一遍。', '再来一次试试。'],
    shareTitle: (q, s) => `${q}，我考了${s}！`,
    shareDesc: (c, t) => `${t}题答对${c}题`,
  },
  'zh-hant': {
    allQuizzes: '全部測驗', start: '開始測驗 →', correct: '✓ 答對了！', wrong: '✗ 答錯了',
    explanation: '💡 解析', next: '下一題 →', seeResult: '看結果 →', retry: '再做一次', more: '別的測驗',
    meta: n => `${n}道題 · 四選一 · 附解析`,
    score: p => `${p}分`,
    wrongCount: n => `答錯的題（${n}道）`,
    grades: ['滿分！', '優秀', '良好', '普通', '再加把勁'],
    msgs: ['完美，全部答對！', '很棒，分數很高。', '這塊你掌握得不錯。', '這部分值得再看一遍。', '再來一次試試。'],
    shareTitle: (q, s) => `${q}，我考了${s}！`,
    shareDesc: (c, t) => `${t}題答對${c}題`,
  },
};

function medal(pct: number) {
  if (pct === 100) return '🏆';
  if (pct >= 80) return '🥇';
  if (pct >= 60) return '🥈';
  if (pct >= 40) return '🥉';
  return '📚';
}
/** 캔버스는 테일윈드 클래스를 모른다 — 등급 색을 hex로도 들고 있는다 */
function grade(pct: number, ui: (typeof UI)[QuizLang]) {
  if (pct === 100) return { label: ui.grades[0], color: 'from-yellow-400 to-amber-500', textColor: 'text-amber-100', hex: ['#facc15', '#f59e0b'] };
  if (pct >= 80)  return { label: ui.grades[1], color: 'from-amber-400 to-orange-500', textColor: 'text-amber-100', hex: ['#fbbf24', '#f97316'] };
  if (pct >= 60)  return { label: ui.grades[2], color: 'from-sky-400 to-blue-500', textColor: 'text-sky-100', hex: ['#38bdf8', '#3b82f6'] };
  if (pct >= 40)  return { label: ui.grades[3], color: 'from-slate-400 to-slate-600', textColor: 'text-slate-200', hex: ['#94a3b8', '#475569'] };
  return { label: ui.grades[4], color: 'from-rose-400 to-red-600', textColor: 'text-rose-100', hex: ['#fb7185', '#dc2626'] };
}

  /*
   * headerRight — 머리줄 오른쪽에 얹을 것(언어 고르개).
   * 예전에는 부르는 쪽이 이 엔진 **위에** 자기 줄을 하나 더 만들어 고르개를
   * 놓았다. 화면 위쪽 50px이 고르개 하나에 쓰였고, 머리 띠가 두 겹으로 보였다.
   * 머리줄이 이미 있으므로 그 안에 넣는다.
   */
export default function QuizEngine({ quiz, lang = 'ko', headerRight }: { quiz: Quiz; lang?: QuizLang; headerRight?: React.ReactNode }) {
  const ui = UI[lang];
  const hubHref = lang === 'ko' ? '/quiz' : `/${lang}/quiz`;
  const [phase, setPhase] = useState<Phase>('start');
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const [wrongList, setWrongList] = useState<number[]>([]);

  const total = quiz.questions.length;
  const pct = Math.round((correct / total) * 100);
  const g = grade(pct, ui);
  const q = quiz.questions[current];
  const isCorrect = selected === q?.correct;
  const progress = Math.round((current / total) * 100);

  function handleAnswer(idx: number) {
    setSelected(idx);
    setPhase('answer');
    if (idx === q.correct) {
      setCorrect(c => c + 1);
    } else {
      setWrongList(w => [...w, current]);
    }
  }

  function next() {
    if (current + 1 >= total) { setPhase('result'); }
    else { setCurrent(c => c + 1); setSelected(null); setPhase('question'); }
  }

  function restart() { setPhase('start'); setCurrent(0); setSelected(null); setCorrect(0); setWrongList([]); }

  const msg =
    pct === 100 ? ui.msgs[0] :
    pct >= 80 ? ui.msgs[1] :
    pct >= 60 ? ui.msgs[2] :
    pct >= 40 ? ui.msgs[3] : ui.msgs[4];

  /* ── START ── */
  if (phase === 'start') return (
    <div className="page-wrap flex flex-col">
      <PageGlow accent="amber" />
      <div className="h-1 topbar" />
      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center">
          <Link href={hubHref} className="text-sm text-slate-500 dark:text-slate-400 hover:text-amber-600 flex items-center gap-1.5 font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.allQuizzes}
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
            <ToolIcon emoji={quiz.icon} className="h-5 w-5" />
          </span>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{quiz.category}</span>
        </div>
        <div className="hero-band">
            <PageHero title={quiz.title} desc={quiz.desc} />
          </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-8">{ui.meta(quiz.questions.length)}</p>
        <button onClick={() => setPhase('question')}
          className="w-full max-w-xs bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold py-4 rounded-lg text-base transition-colors shadow-sm shadow-amber-200">
          {ui.start}
        </button>
      </div>
    </div>
  );

  /* ── QUESTION / ANSWER ── */
  if (phase === 'question' || phase === 'answer') return (
    <div className="min-h-screen bg-white dark:bg-slate-900 flex flex-col">
      <div className="h-1.5 bg-amber-100 dark:bg-amber-950/40">
        <div className="h-full bg-sec transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>
      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <span className="text-sm font-bold text-amber-600 truncate mr-2">{quiz.title}</span>
          <span className="text-xs text-slate-500 dark:text-slate-400 shrink-0">{current + 1} / {total}</span>
        </div>
      </header>
      <div key={current} className="flex-1 px-4 py-8 max-w-lg mx-auto w-full qz-fade">
        <div className="flex items-center gap-2 mb-5">
          <span className="text-xs font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/30 px-2.5 py-1 rounded-full">Q{current + 1}</span>
          {phase === 'answer' && (
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${isCorrect ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700' : 'bg-red-50 dark:bg-red-950/30 text-red-700'}`}>
              {isCorrect ? ui.correct : ui.wrong}
            </span>
          )}
        </div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-6 leading-relaxed tracking-tight">{q.q}</h2>
        <div className="flex flex-col gap-2.5">
          {q.opts.map((opt, i) => {
            const answered = phase === 'answer';
            const isRight = i === q.correct;
            const isChosen = i === selected;
            let cls = 'group w-full text-left flex items-center gap-3 border rounded-lg pl-3 pr-4 py-3.5 text-sm font-medium transition-all ';
            let badgeCls = 'shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ';
            if (answered) {
              if (isRight) { cls += 'bg-emerald-50 dark:bg-emerald-950/30 border-2 border-emerald-400 text-emerald-800 dark:text-emerald-300 font-bold'; badgeCls += 'bg-emerald-500 text-white'; }
              else if (isChosen) { cls += 'bg-red-50 dark:bg-red-950/30 border-2 border-red-400 text-red-700 dark:text-red-300'; badgeCls += 'bg-red-500 text-white'; }
              else { cls += 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400'; badgeCls += 'border-2 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400'; }
            } else {
              cls += 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-amber-400 hover:bg-sec-soft hover:shadow-sm active:scale-[0.99] cursor-pointer';
              badgeCls += 'border-2 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 group-hover:border-amber-500 group-hover:bg-amber-500 group-hover:text-amber-950';
            }
            return (
              <button key={i} className={cls} onClick={() => phase === 'question' && handleAnswer(i)} disabled={answered}>
                <span className={badgeCls}>
                  {answered && isRight ? '✓' : answered && isChosen ? '✕' : ['①', '②', '③', '④', '⑤'][i]}
                </span>
                <span className="flex-1 leading-snug">{opt}</span>
              </button>
            );
          })}
        </div>
        {phase === 'answer' && (
          <div className="mt-5 space-y-3">
            {q.explanation && (
              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 rounded-lg p-4">
                <p className="text-xs font-bold text-blue-600 mb-1">{ui.explanation}</p>
                <p className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed">{q.explanation}</p>
              </div>
            )}
            <button onClick={next}
              className="w-full bg-amber-500 hover:bg-amber-600 text-amber-950 rounded-xl py-3.5 font-bold text-sm transition-colors">
              {current + 1 >= total ? ui.seeResult : ui.next}
            </button>
          </div>
        )}
      </div>
      <style jsx>{`
        .qz-fade { animation: qzFade 0.28s ease-out; }
        @keyframes qzFade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );

  /* ── RESULT ── */
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 flex flex-col">
      <div className="h-1 topbar" />
      <div className="flex-1 px-4 py-8 max-w-lg mx-auto w-full">
        {/* Score hero card */}
        <div className="result-card mb-6 p-8" style={gradeVar(g.color)}>
          <div className="text-7xl mb-3 filter drop-shadow-sm">{medal(pct)}</div>
          <div className="text-5xl font-bold mb-1">{correct}<span className="text-2xl font-normal opacity-70"> / {total}</span></div>
          <div className={`text-2xl font-bold ${g.textColor} mb-2`}>{ui.score(pct)} · {g.label}</div>
          <p className={`text-sm ${g.textColor}`}>{msg}</p>
          {/* progress bar */}
          <div className="mt-4 bg-black/20 rounded-full h-2 overflow-hidden">
            <div className="bg-white/80 dark:bg-slate-900/80 h-full transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>

        {/* Wrong answers */}
        {wrongList.length > 0 && (
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/40 rounded-lg p-4 mb-5">
            <p className="text-xs font-bold text-red-500 mb-2">{ui.wrongCount(wrongList.length)}</p>
            <div className="space-y-1">
              {wrongList.map(idx => (
                <p key={idx} className="text-xs text-red-700 dark:text-red-300">Q{idx + 1}. {quiz.questions[idx].q.substring(0, 40)}…</p>
              ))}
            </div>
          </div>
        )}

        {/* lang을 안 넘기면 ShareButton 기본값이 'ko'라 아홉 외국어 화면에 한국어 버튼이 붙는다 */}
        <ShareButton title={ui.shareTitle(quiz.title, ui.score(pct))} description={`${ui.shareDesc(correct, total)} · ${msg}`} type="quiz" lang={lang} />

        {/* 링크만 나가면 SNS에서 안 보인다 — 점수를 정사각 이미지로도 내보낸다 */}
        <div className="mt-3">
          <SaveResultCard
            emoji={medal(pct)}
            title={`${ui.score(pct)} · ${g.label}`}
            subtitle={quiz.title}
            body={`${ui.shareDesc(correct, total)} · ${msg}`}
            from={g.hex[0]}
            to={g.hex[1]}
            fileName={`vixutil-${quiz.slug}`}
            lang={lang}
            eyebrow="QUIZ · vixutil.com"
            url={`vixutil.com${hubHref}`}
            referral={false}
          />
        </div>

        {/* 결과 화면 노출 — 위치 선정 근거는 TestEngine의 같은 자리에 적어두었다. */}
        <Ad lang={lang} placement="result" />

        <div className="mt-6 flex flex-col gap-3">
          <button onClick={restart} className="w-full bg-amber-500 hover:bg-amber-600 text-amber-950 rounded-xl py-3.5 font-bold text-sm transition-colors">
            {ui.retry}
          </button>
          <Link href={hubHref} className="w-full block text-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 rounded-xl py-3.5 font-bold text-sm transition-colors">
            {ui.more}
          </Link>
        </div>
      </div>
    </div>
  );
}
