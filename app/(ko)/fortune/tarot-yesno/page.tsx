'use client';
import { useState } from 'react';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';
import ReferralCards from '@/components/ReferralCards';
import ShareButton from '@/components/ShareButton';
import PageGlow from '@/components/PageGlow';
import { SECTION_FAQ } from '@/lib/section-faq';
import { TAROT_CARDS } from '@/lib/fortune-data';
import LangPicker from '@/components/LangPicker';
import { ALL_LOCALES10 } from '@/lib/locales';

type Verdict = 'yes' | 'no' | 'maybe';

// 메이저 아르카나 22장의 정방향 예/아니오 성향(전통적 통용 기준).
// 역방향이면 yes↔no가 뒤집히고 maybe는 유지된다.
const YESNO_BASE: Verdict[] = [
  'yes',   // 0 바보
  'yes',   // 1 마법사
  'maybe', // 2 여사제
  'yes',   // 3 여황제
  'yes',   // 4 황제
  'yes',   // 5 교황
  'yes',   // 6 연인
  'yes',   // 7 전차
  'yes',   // 8 힘
  'maybe', // 9 은둔자
  'yes',   // 10 운명의 수레바퀴
  'maybe', // 11 정의
  'no',    // 12 매달린 사람
  'no',    // 13 죽음
  'maybe', // 14 절제
  'no',    // 15 악마
  'no',    // 16 탑
  'yes',   // 17 별
  'no',    // 18 달
  'yes',   // 19 태양
  'yes',   // 20 심판
  'yes',   // 21 세계
];

const VERDICT: Record<Verdict, { label: string; emoji: string; gradient: string; note: string }> = {
  yes:   { label: '예 · YES',    emoji: '✅', gradient: 'from-emerald-400 to-teal-600', note: '긍정적인 흐름이에요. 자신을 믿고 밀고 나가도 좋습니다.' },
  no:    { label: '아니오 · NO',  emoji: '❌', gradient: 'from-rose-400 to-red-600',    note: '지금은 신중할 때예요. 한 박자 쉬어가며 다시 생각해 보세요.' },
  maybe: { label: '글쎄요 · MAYBE', emoji: '🤔', gradient: 'from-amber-400 to-orange-500', note: '아직 반반이에요. 조건과 타이밍을 조금 더 살펴볼 필요가 있어요.' },
};

interface Result {
  card: typeof TAROT_CARDS[number];
  reversed: boolean;
  verdict: Verdict;
}

function draw(): Result {
  const card = TAROT_CARDS[Math.floor(Math.random() * TAROT_CARDS.length)];
  const reversed = Math.random() < 0.45;
  const base = YESNO_BASE[card.id] ?? 'maybe';
  const verdict: Verdict = reversed && base !== 'maybe' ? (base === 'yes' ? 'no' : 'yes') : base;
  return { card, reversed, verdict };
}

export default function TarotYesNoPage() {
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState<Result | null>(null);
  const [drawing, setDrawing] = useState(false);

  function pull() {
    if (drawing) return;
    setDrawing(true);
    setResult(null);
    window.setTimeout(() => {
      setResult(draw());
      setDrawing(false);
    }, 650);
  }

  const v = result ? VERDICT[result.verdict] : null;

  return (
    <div className="page-wrap">
      <PageGlow accent="violet" />
      <div className="h-1 topbar" />
      <header className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/" className="font-bold text-violet-600 text-lg shrink-0">vix.</Link>
          <Link href="/fortune" className="text-sm font-bold text-slate-700 dark:text-slate-200">타로 예스/노</Link>
          <span className="ml-auto shrink-0">
            <LangPicker current="ko" route="/fortune/tarot-yesno" available={ALL_LOCALES10} />
          </span>
        </div>
      </header>

      <div className="hero-band max-w-lg mx-auto px-4 py-8">
        <div className="mb-6">
          <p className="text-xs font-bold text-violet-600 tracking-widest uppercase mb-1">Yes or No Tarot</p>
          <h1 className="page-h1">타로 예스/노</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            궁금한 것을 마음속으로 떠올리고, 카드 한 장으로 답을 받아보세요
          </p>
        </div>

        <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">질문 (선택)</label>
        <input
          value={question}
          onChange={e => setQuestion(e.target.value)}
          placeholder="예: 이번 결정, 지금 하는 게 맞을까?"
          className="fld w-full focus:ring-2 focus:ring-violet-400 mb-5"
        />

        <button
          onClick={pull}
          disabled={drawing}
          className="w-full bg-sec font-bold text-lg rounded-lg py-4 mb-6 shadow-sm shadow-violet-200 dark:shadow-none hover:-translate-y-0.5 hover:border-slate-300 dark:hover:border-slate-700 transition-all disabled:opacity-70"
        >
          {drawing ? '카드를 뽑는 중…' : result ? '🔮 다시 뽑기' : '🔮 카드 뽑기'}
        </button>

        {v && result && (
          <>
            {question.trim() && (
              <p className="text-center text-sm text-slate-500 dark:text-slate-400 italic mb-3">“{question.trim()}”</p>
            )}
            {/* 판정 히어로 */}
            <div className={`dt-flip rounded-xl bg-gradient-to-br ${v.gradient} text-white p-8 text-center mb-4`}>
              <div className="text-6xl mb-2">{v.emoji}</div>
              <div className="text-3xl font-bold drop-shadow">{v.label}</div>
              <p className="text-sm text-white/90 mt-2">{v.note}</p>
            </div>

            {/* 근거 카드 */}
            <div className="rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 p-5 mb-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl" style={{ transform: result.reversed ? 'rotate(180deg)' : 'none', display: 'inline-block' }}>{result.card.emoji}</span>
                <div>
                  <div className="text-xs font-medium text-slate-400">{result.card.nameEn} · {result.reversed ? '역방향' : '정방향'}</div>
                  <div className="text-base font-bold text-slate-800 dark:text-slate-100">{result.card.name}</div>
                </div>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                {result.reversed ? result.card.reversed : result.card.upright}
              </p>
            </div>

            <div className="mb-6">
              <ShareButton
                title={`타로 예스/노: ${v.label}`}
                description="마음속 질문에 타로가 답한다 — 당신의 답은?"
                type="fortune"
              />
            </div>

            <ReferralCards placement="result" />
          </>
        )}

        <p className="text-center text-[11px] text-slate-400 dark:text-slate-500 mt-6">
          타로 예스/노는 재미와 마음 정리를 위한 참고용입니다. 중요한 결정은 스스로의 판단으로 내리세요.
        </p>

        <Faq items={SECTION_FAQ['fortune/tarot-yesno']} />
      </div>
      <SiteFooter referral={false} />

      <style jsx>{`
        @keyframes dtFlip { 0% { opacity: 0; transform: rotateY(90deg) scale(0.92); } 100% { opacity: 1; transform: rotateY(0) scale(1); } }
        .dt-flip { animation: dtFlip 0.5s cubic-bezier(0.22, 1, 0.36, 1); }
      `}</style>
    </div>
  );
}
