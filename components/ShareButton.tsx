'use client';
import { useState } from 'react';

const TEST_CTA = ['🚀 결과 공유하기','🔥 친구도 테스트 해보기','🎯 내 결과 자랑하기','✨ 친구 결과와 비교해보기','👀 친구는 어떤 결과가 나올까?','🎉 이 결과 생각보다 정확한데?','💡 친구한테도 보내보기','🧠 친구도 테스트 해보게 하기','🔥 이건 친구도 해봐야 함','😆 의외로 정확한 테스트'];
const QUIZ_CTA = ['🏆 내 점수 자랑하기','🔥 친구도 도전해보기','🎯 몇 점 받을 수 있을까?','📚 친구와 퀴즈 대결하기','😎 생각보다 쉽지 않은데?','🚀 점수 공유하기','💡 친구도 맞출 수 있을까?','📢 친구에게 퀴즈 보내기'];
const GEN_CTA = ['✨ 결과 공유하기','🎁 이 이름 어때?','🔥 친구도 하나 뽑아보기','😆 의외로 괜찮은 결과','🚀 친구에게 보여주기','👀 친구는 뭐가 나올까?','🎉 결과 공유하기'];
const CALC_CTA = ['💰 계산 결과 공유하기','📊 친구 결과와 비교하기','🚀 결과 보내기','💡 도움이 됐다면 공유하기','📈 계산 결과 공유하기'];

type CTAType = 'test' | 'quiz' | 'generator' | 'calculator';

function getCTA(type: CTAType): string {
  const pools: Record<CTAType, string[]> = { test: TEST_CTA, quiz: QUIZ_CTA, generator: GEN_CTA, calculator: CALC_CTA };
  const pool = pools[type];
  return pool[Math.floor(Math.random() * pool.length)];
}

interface Props {
  title: string;
  description: string;
  type?: CTAType;
}

export default function ShareButton({ title, description, type = 'test' }: Props) {
  const [copied, setCopied] = useState(false);
  const [cta] = useState(() => getCTA(type));

  async function share() {
    const url = window.location.href;
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      try {
        await navigator.share({ title, text: description, url });
        return;
      } catch (e) {
        if ((e as Error).name === 'AbortError') return;
      }
    }
    // PC fallback: copy URL
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <div className="mt-6 border-t border-slate-100 pt-5">
      <button
        onClick={share}
        className="w-full h-14 flex items-center justify-center gap-2 bg-gradient-to-r from-violet-500 to-pink-500 text-white rounded-2xl font-bold text-sm hover:opacity-90 active:scale-[0.98] transition-all shadow-sm"
      >
        {copied ? '✅ 링크가 복사됐어요!' : cta}
      </button>
    </div>
  );
}
