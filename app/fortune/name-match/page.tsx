'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';
import ReferralCards from '@/components/ReferralCards';
import { SECTION_FAQ } from '@/lib/section-faq';
import PageGlow from '@/components/PageGlow';
import { matchNames, verdictFor, type MatchResult } from '@/lib/name-match';

/**
 * 줄여나간 과정을 삼각형으로 그린다. 결과 숫자만 보여주면 "그래서 어떻게 나온 건데"가
 * 남는데, 이 계산은 과정을 보여주는 게 재미의 절반이다.
 */
function Steps({ result }: { result: MatchResult }) {
  const chars = [...result.nameA].flatMap((c, i) => {
    const b = [...result.nameB][i];
    return b ? [c, b] : [c];
  });
  const tail = [...result.nameB].slice([...result.nameA].length);
  const labels = [...chars, ...tail];

  return (
    <div className="overflow-x-auto">
      <div className="inline-flex flex-col items-center gap-1 min-w-full py-1">
        <div className="flex gap-1.5">
          {labels.map((ch, i) => (
            <span key={i} className="w-8 text-center text-xs font-bold text-slate-400 dark:text-slate-500">{ch}</span>
          ))}
        </div>
        {result.steps.map((row, si) => (
          <div key={si} className="flex gap-1.5">
            {row.map((n, i) => (
              <span
                key={i}
                className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-black ${
                  si === result.steps.length - 1
                    ? 'bg-rose-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {n}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function NameMatchPage() {
  const [nameA, setNameA] = useState('');
  const [nameB, setNameB] = useState('');
  const [submitted, setSubmitted] = useState<[string, string] | null>(null);
  const [error, setError] = useState('');

  const result = useMemo(
    () => (submitted ? matchNames(submitted[0], submitted[1]) : null),
    [submitted],
  );

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!matchNames(nameA, nameB)) {
      setError('두 사람 모두 한글 이름을 한 글자 이상 입력해주세요.');
      setSubmitted(null);
      return;
    }
    setError('');
    setSubmitted([nameA, nameB]);
  }

  const verdict = result ? verdictFor(result.score) : null;

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageGlow accent="rose" />
      <div className="h-1 bg-gradient-to-r from-pink-500 to-rose-600" />
      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/fortune" className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-rose-600 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            운세
          </Link>
          <span className="text-slate-200">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">이름 궁합</span>
        </div>
      </header>

      <div className="max-w-xl mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">💕 이름 궁합</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">두 사람 이름의 획수로 보는 궁합</p>
        </div>

        <form onSubmit={submit} className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 mb-6">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">내 이름</label>
              <input value={nameA} onChange={e => setNameA(e.target.value)} placeholder="김민수" maxLength={10}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:border-rose-400 focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">상대 이름</label>
              <input value={nameB} onChange={e => setNameB(e.target.value)} placeholder="이지은" maxLength={10}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:border-rose-400 focus:outline-none" />
            </div>
          </div>
          {error && <p className="text-xs text-rose-600 dark:text-rose-400 mt-2">{error}</p>}
          <button type="submit" className="w-full mt-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-black py-3 transition-colors">
            궁합 보기
          </button>
        </form>

        {result && verdict ? (
          <div className="space-y-4">
            <div className="rounded-2xl border border-rose-200 dark:border-rose-900/50 bg-gradient-to-br from-rose-50 to-pink-50/50 dark:from-rose-950/30 dark:to-transparent p-6 text-center">
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">
                {result.nameA} <span className="text-rose-400">×</span> {result.nameB}
              </p>
              <div className="text-5xl my-2">{verdict.emoji}</div>
              <p className="text-5xl font-black text-rose-600 dark:text-rose-400 leading-none">{result.score}%</p>
              <p className="text-base font-black text-slate-800 dark:text-slate-100 mt-3">{verdict.label}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mt-2">{verdict.comment}</p>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4">
              <h2 className="text-sm font-black text-slate-800 dark:text-slate-100 mb-3">계산 과정</h2>
              <Steps result={result} />
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-3 leading-relaxed">
                이름을 한 글자씩 번갈아 놓고 각 글자의 획수를 적은 뒤, 이웃한 두 수를 더해 일의 자리만 남기는 과정을
                두 자리가 될 때까지 반복합니다.
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-slate-300 dark:text-slate-600">
            <div className="text-5xl mb-3">☝️</div>
            <p className="text-sm">두 사람의 이름을 입력해보세요</p>
          </div>
        )}

        {/*
          획수 기준이 사이트마다 다르다는 점을 밝혀둔다. "다른 데서는 80% 나왔는데
          여기는 32%"라는 반응이 나오는 게 정상이고, 그 이유가 계산 오류가 아니라
          기준 차이라는 걸 알려주는 편이 낫다.
        */}
        <div className="mt-8 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
          <h2 className="text-sm font-black text-slate-800 dark:text-slate-100 mb-2">다른 사이트와 결과가 달라요</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            한글 획수를 세는 기준이 하나로 정해져 있지 않기 때문입니다. 예를 들어 ㄱ을 1획으로 보는 표도 있고 2획으로 보는 표도 있어서,
            어느 표를 쓰느냐에 따라 같은 이름도 다른 숫자가 나옵니다. 이 페이지는 널리 쓰이는 표 하나를 골라 쓰고 있을 뿐이고,
            <strong className="text-slate-800 dark:text-slate-100"> 어느 쪽이 맞다고 할 근거는 없습니다</strong>.
            애초에 이름 획수가 두 사람의 관계에 대해 알려줄 수 있는 것은 없습니다. 점수가 낮게 나와도 마음 쓰지 마세요 —
            공책 귀퉁이에서 하던 놀이를 화면으로 옮겨온 것뿐입니다.
          </p>
        </div>

        {result && <ReferralCards placement="result" />}

        <Faq items={SECTION_FAQ['fortune/name-match']} />
      </div>
      <SiteFooter />
    </div>
  );
}
