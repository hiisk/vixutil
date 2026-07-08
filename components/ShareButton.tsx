'use client';
import { useState } from 'react';

const TEST_CTA = ['친구도 테스트 해보기', '내 결과 자랑하기', '친구 결과와 비교하기', '친구는 어떤 결과일까?', '생각보다 정확한 테스트', '친구한테도 보내보기', '이건 친구도 해봐야 함', '의외로 정확해서 공유'];
const QUIZ_CTA = ['내 점수 자랑하기', '친구도 도전해보기', '몇 점 받을 수 있을까?', '친구와 퀴즈 대결하기', '친구도 맞출 수 있을까?', '점수 공유하기'];
const GEN_CTA = ['친구도 하나 뽑아보기', '친구에게 보여주기', '친구는 뭐가 나올까?', '결과 공유하기', '의외로 괜찮은 결과'];
const CALC_CTA = ['친구 결과와 비교하기', '결과 보내기', '도움이 됐다면 공유', '계산 결과 공유하기'];
const FORTUNE_CTA = ['오늘 운세 공유하기', '친구 운세도 보여주기', '내 운세 자랑하기', '친구는 오늘 운세가 어떨까?', '결과 공유하기'];

type CTAType = 'test' | 'quiz' | 'generator' | 'calculator' | 'fortune';

function getCTA(type: CTAType): string {
  const pools: Record<CTAType, string[]> = { test: TEST_CTA, quiz: QUIZ_CTA, generator: GEN_CTA, calculator: CALC_CTA, fortune: FORTUNE_CTA };
  const pool = pools[type];
  return pool[Math.floor(Math.random() * pool.length)];
}

interface Props {
  title: string;
  description: string;
  type?: CTAType;
}

function ShareIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
  );
}

export default function ShareButton({ title, description, type = 'test' }: Props) {
  const [copied, setCopied] = useState(false);
  const [cta] = useState(() => getCTA(type));

  async function share() {
    const url = window.location.href;
    const text = description ? `${description}\n\n${url}` : url;
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      try {
        await navigator.share({ text: `${title}\n\n${description}\n\n${url}` });
        return;
      } catch (e) {
        if ((e as Error).name === 'AbortError') return;
      }
    }
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <div className="mt-8 pt-6 border-t border-slate-100">
      <p className="text-center text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">공유하기</p>
      <button
        onClick={share}
        className="
          w-full h-14 flex items-center justify-center gap-2.5
          bg-gradient-to-r from-fuchsia-500 via-pink-500 to-orange-400
          text-white rounded-2xl font-bold text-[15px]
          shadow-lg shadow-pink-200
          hover:shadow-xl hover:shadow-pink-300 hover:scale-[1.02]
          active:scale-[0.97]
          transition-all duration-200
        "
      >
        {copied ? (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            링크가 복사됐어요!
          </>
        ) : (
          <>
            <ShareIcon />
            {cta}
          </>
        )}
      </button>
    </div>
  );
}
