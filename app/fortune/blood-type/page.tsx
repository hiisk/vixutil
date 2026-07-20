'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import { BLOOD_TYPES } from '@/lib/fortune-data';
import FortuneDisplay from '@/components/FortuneDisplay';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';
import PageGlow from '@/components/PageGlow';

export default function BloodTypePage() {
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    // 공유 링크(?id=)로 들어온 경우 선택 상태를 복원한다. URL은 프리렌더 시점에
    // 알 수 없으므로 마운트 후에 읽을 수밖에 없다.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (id && BLOOD_TYPES.some(t => t.id === id)) setSelected(id);
  }, []);

  function handleSelect(id: string) {
    setSelected(id);
    window.history.replaceState(null, '', `?id=${id}`);
  }

  const type = BLOOD_TYPES.find(t => t.id === selected);

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageGlow accent="rose" />
      <div className="h-1 bg-gradient-to-r from-rose-500 to-red-600" />
      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/fortune" className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-rose-600 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            운세
          </Link>
          <span className="text-slate-200">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 flex-1 truncate">
            {type ? `${type.name} 운세` : '혈액형 운세'}
          </span>
        </div>
      </header>

      <div className="max-w-xl mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">🩸 혈액형 오늘의 운세</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">내 혈액형을 선택하세요</p>
        </div>

        <div className="grid grid-cols-4 gap-2 mb-6">
          {BLOOD_TYPES.map(t => (
            <button
              key={t.id}
              onClick={() => handleSelect(t.id)}
              className={`rounded-xl p-3 text-center transition-all border ${
                selected === t.id
                  ? 'bg-rose-600 border-rose-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-rose-300 text-slate-700 dark:text-slate-200'
              }`}
            >
              <div className="text-xl mb-0.5">{t.emoji}</div>
              <p className={`text-sm font-black ${selected === t.id ? 'text-white' : 'text-slate-800 dark:text-slate-100'}`}>{t.name}</p>
            </button>
          ))}
        </div>

        {type ? (
          <div>
            <div className="flex items-center gap-2 mb-4 text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2">
              <span className="font-semibold text-slate-700 dark:text-slate-200">{type.nickname}</span>
              <span className="text-slate-300 dark:text-slate-600">·</span>
              <span>{type.trait}</span>
            </div>
            <FortuneDisplay
              subjectId={`blood-${type.id}`}
              subjectName={type.name}
              subjectEmoji={type.emoji}
              badge={type.nickname}
            />
          </div>
        ) : (
          <div className="text-center py-12 text-slate-300 dark:text-slate-600">
            <div className="text-5xl mb-3">☝️</div>
            <p className="text-sm">혈액형을 선택하면 오늘의 운세를 볼 수 있습니다</p>
          </div>
        )}

        {/*
          혈액형 성격론에 근거가 없다는 건 이 사이트의 심리 퀴즈에서도 바넘 효과의
          예시로 쓰고 있는 내용이다. 운세 페이지를 만들면서 그걸 못 본 척하면
          앞뒤가 안 맞으니, 재미로 보라는 말을 눈에 띄는 자리에 적어둔다.
        */}
        <div className="mt-8 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
          <h2 className="text-sm font-black text-slate-800 dark:text-slate-100 mb-2">혈액형으로 성격을 알 수 있나요?</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            아닙니다. 혈액형과 성격의 관련성은 여러 차례 검증됐지만 일관된 연관은 확인되지 않았습니다.
            혈액형 성격론이 잘 들어맞는 것처럼 느껴지는 이유는 <strong className="text-slate-800 dark:text-slate-100">바넘 효과</strong> 때문입니다 —
            누구에게나 해당되는 모호한 설명을 자기 이야기로 받아들이는 심리 현상이죠.
            이 페이지의 운세도 혈액형에서 계산해 낸 것이 아니라, 날짜와 혈액형을 섞은 값으로 문장을 고르는 것입니다.
            재미로만 봐주세요.
          </p>
        </div>

        <Faq items={SECTION_FAQ['fortune/blood-type']} />
      </div>
      <SiteFooter />
    </div>
  );
}
