'use client';
import { useRef, useState, useCallback } from 'react';
import { drawResultCard, canvasToBlob } from '@/lib/canvas-result-card';
import ReferralCards from './ReferralCards';

interface Props {
  emoji: string;
  title: string;
  subtitle: string;
  body: string;
  from: string;
  to: string;
  fileName: string;
}

type SaveState = 'idle' | 'saving' | 'done';

/** 스냅테스트 결과를 정사각형 이미지로 저장·공유하는 버튼. 링크 공유(ShareButton)와 별개로,
 *  캡처해서 SNS에 올리기 좋은 실제 이미지 파일을 만들어준다. */
export default function SaveResultCard({ emoji, title, subtitle, body, from, to, fileName }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState<SaveState>('idle');

  const handleSave = useCallback(async () => {
    setState('saving');
    const canvas = canvasRef.current;
    if (!canvas) { setState('idle'); return; }
    drawResultCard(canvas, { emoji, title, subtitle, body, from, to });
    const blob = await canvasToBlob(canvas);
    if (!blob) { setState('idle'); return; }

    const file = new File([blob], `${fileName}.png`, { type: 'image/png' });
    const nav = navigator as Navigator & { canShare?: (data: { files: File[] }) => boolean };
    if (nav.canShare && nav.canShare({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title, text: `${title} — vixutil.com/snap` });
        setState('done');
        setTimeout(() => setState('idle'), 1500);
        return;
      } catch {
        // 사용자가 취소한 경우 다운로드로 폴백하지 않고 종료
        setState('idle');
        return;
      }
    }

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.png`;
    a.click();
    URL.revokeObjectURL(url);
    setState('done');
    setTimeout(() => setState('idle'), 1500);
  }, [emoji, title, subtitle, body, from, to, fileName]);

  return (
    <div>
      <canvas ref={canvasRef} className="hidden" />
      <button
        onClick={handleSave}
        disabled={state === 'saving'}
        className="w-full py-3.5 rounded-2xl font-bold text-sm text-white transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
        style={{ background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)` }}
      >
        {state === 'saving' ? '이미지 만드는 중...' : state === 'done' ? '완료! ✓' : '🖼️ 결과 이미지로 저장·공유'}
      </button>

      {/*
        스냅테스트 결과 지점. 이 컴포넌트는 스냅 전용이고 11개 페이지 중 10개가
        쓰므로, 페이지마다 따로 붙이는 대신 여기 한 번만 넣는다. 사진을 올리고
        분석이 끝난 뒤에만 렌더되는 자리라 조건도 따로 필요 없다.
        (ShareButton에 넣지 않은 이유: 테스트·퀴즈·생성기·운세도 그걸 쓰는데
        그쪽은 이미 결과 카드를 따로 붙여둬서 두 번 나온다.)
      */}
      <ReferralCards placement="result" />
    </div>
  );
}
