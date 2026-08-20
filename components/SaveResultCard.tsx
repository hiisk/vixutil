'use client';
import { useRef, useState, useCallback } from 'react';
import { drawResultCard, canvasToBlob } from '@/lib/canvas-result-card';
import { langOfLocale } from '@/lib/i18n/lang';
import type { AnyLocale10 } from '@/lib/locales';
import { SHARE_UI } from '@/lib/share/ui';
import ReferralCards from './ReferralCards';

interface Props {
  emoji: string;
  title: string;
  subtitle: string;
  body: string;
  from: string;
  to: string;
  fileName: string;
  /** 안 넘기면 한국어다 — 스냅 열한 장이 그대로 쓴다 */
  lang?: AnyLocale10;
  /** 카드 위쪽 머리글. 섹션 이름이라 번역하지 않는다 */
  eyebrow?: string;
  /** 카드 아래 워터마크에 넣을 주소 */
  url?: string;
  /** 제휴 카드를 여기서 세울지 — 결과 엔진들은 이미 자기 것을 갖고 있다 */
  referral?: boolean;
}

type SaveState = 'idle' | 'saving' | 'done';

/** 스냅테스트 결과를 정사각형 이미지로 저장·공유하는 버튼. 링크 공유(ShareButton)와 별개로,
 *  캡처해서 SNS에 올리기 좋은 실제 이미지 파일을 만들어준다. */
export default function SaveResultCard({
  emoji, title, subtitle, body, from, to, fileName,
  lang = 'ko', eyebrow, url = 'vixutil.com/snap', referral = true,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState<SaveState>('idle');
  const ui = SHARE_UI[langOfLocale(lang)];

  const handleSave = useCallback(async () => {
    setState('saving');
    const canvas = canvasRef.current;
    if (!canvas) { setState('idle'); return; }
    drawResultCard(canvas, {
      emoji, title, subtitle, body, from, to, eyebrow, lang,
      footer: SHARE_UI[langOfLocale(lang)].cardFooter.replace('{u}', url),
    });
    const blob = await canvasToBlob(canvas);
    if (!blob) { setState('idle'); return; }

    const file = new File([blob], `${fileName}.png`, { type: 'image/png' });
    const nav = navigator as Navigator & { canShare?: (data: { files: File[] }) => boolean };
    if (nav.canShare && nav.canShare({ files: [file] })) {
      try {
        /*
         * 그림만 보낸다 — 글을 같이 넘기면 갈라진다.
         *
         * 카카오톡을 비롯한 메신저는 files와 text를 같이 받으면 하나로 못 묶고
         * 사진 한 통, 글 한 통으로 따로 보낸다. 받는 쪽에는 관계없는 두 개가
         * 나란히 오는 것처럼 보인다.
         *
         * 잃는 것은 없다. 출처는 이미 그림 안에 있다 — canvas-result-card가
         * 'SNAP TEST · vixutil.com'과 'vixutil.com/snap 에서 나도 해보기'를
         * 카드에 그려 넣는다. text는 그것을 한 번 더 적은 것이었다.
         *
         * title도 뺀다. 안드로이드 쪽 앱 중에 title을 글로 붙여 보내는 것이 있어서,
         * 남겨 두면 같은 일이 다시 일어난다.
         */
        await navigator.share({ files: [file] });
        setState('done');
        setTimeout(() => setState('idle'), 1500);
        return;
      } catch {
        // 사용자가 취소한 경우 다운로드로 폴백하지 않고 종료
        setState('idle');
        return;
      }
    }

    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = objectUrl;
    a.download = `${fileName}.png`;
    a.click();
    URL.revokeObjectURL(objectUrl);
    setState('done');
    setTimeout(() => setState('idle'), 1500);
  }, [emoji, title, subtitle, body, from, to, fileName, lang, eyebrow, url]);

  return (
    <div>
      <canvas ref={canvasRef} className="hidden" />
      <button
        onClick={handleSave}
        disabled={state === 'saving'}
        /* 부 동작이라 테두리만 — 까닭은 globals.css의 .sh-go 머리말 */
        className="sh-alt disabled:opacity-60"
      >
        {state === 'saving' ? ui.cardSaving : state === 'done' ? ui.cardDone : ui.cardSave}
      </button>

      {/*
        스냅테스트 결과 지점. 이 컴포넌트는 스냅 전용이고 11개 페이지 중 10개가
        쓰므로, 페이지마다 따로 붙이는 대신 여기 한 번만 넣는다. 사진을 올리고
        분석이 끝난 뒤에만 렌더되는 자리라 조건도 따로 필요 없다.
        (ShareButton에 넣지 않은 이유: 테스트·퀴즈·생성기·운세도 그걸 쓰는데
        그쪽은 이미 결과 카드를 따로 붙여둬서 두 번 나온다. 그 셋이 이 버튼을
        쓸 때는 referral={false}로 여기 것을 끈다.)
      */}
      {referral && <ReferralCards placement="result" />}
    </div>
  );
}
