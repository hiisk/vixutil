'use client';
import { useEffect, useState } from 'react';
import { langOfLocale } from '@/lib/i18n/lang';
import type { AnyLocale10 } from '@/lib/locales';
import { SHARE_UI, shareOne } from '@/lib/share/ui';

// 계산기는 CalcShareBtn이 자체 공유를 구현하므로 여기 타입에 없다.
type CTAType = 'test' | 'quiz' | 'generator' | 'fortune';

function getCTA(pool: string[]): string {
  return pool[Math.floor(Math.random() * pool.length)];
}

interface Props {
  title: string;
  description: string;
  type?: CTAType;
  /** 안 넘기면 한국어다 — 한국어 전용 페이지 스물일곱 장이 그대로 쓴다 */
  lang?: AnyLocale10;
  /**
   * 공유할 주소 — 안 넘기면 지금 보고 있는 장이다.
   *
   * 결과에 해당하는 «낱장»이 따로 있으면 그쪽을 넘긴다. 공유 카드는 주소가
   * 정하므로, 지금 장을 그대로 보내면 결과가 무엇이든 그림이 하나다.
   * 물음표를 붙여도 카드는 안 바뀐다 — 자세한 까닭은 lib/ilju-card.tsx.
   */
  url?: string;
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

export default function ShareButton({ title, description, type = 'test', lang = 'ko', url }: Props) {
  const ui = SHARE_UI[langOfLocale(lang)];
  const [copied, setCopied] = useState(false);

  /**
   * 문구는 붙은 뒤에 고른다.
   *
   * 예전에는 useState 초기값에서 골랐는데, 그 자리는 서버에서도 한 번 돌아간다.
   * 서버가 "점수 공유하기"를, 브라우저가 "몇 점 받을 수 있을까?"를 그리면
   * hydration이 깨지고 React가 그 가지를 통째로 다시 그린다. 화면은 멀쩡해
   * 보여서 콘솔을 열기 전까지 아무도 모른다 — ShareButton을 쓰는 27장이 전부
   * 그 상태였다.
   *
   * 그래서 서버는 늘 첫 문구를 그리고, 붙은 뒤에 바꿔 끼운다. 무작위는 그대로
   * 살아 있고 서버와 브라우저가 어긋나지 않는다.
   */
  const [cta, setCta] = useState(ui.cta[type][0]);
  // 무작위 문구는 프리렌더 시점에 고를 수 없다(서버와 어긋난다) — 붙은 뒤 바꾼다
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setCta(getCTA(SHARE_UI[langOfLocale(lang)].cta[type])); }, [type, lang]);

  /** 제목(결과)이 첫 줄, 설명이 둘째 줄 — 주소는 shareOne이 뒤에 붙인다 */
  const msg = description ? `${title}\n${description}` : title;

  async function share() {
    if (await shareOne(msg, url ?? location.href)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  }

  return (
    <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
      {/* 머리글 자리에 「공유하기」 대신 실제로 나갈 첫 줄을 그대로 보여준다.
          누르기 전에 뭐가 가는지 모르면 안 누른다. 새 요소는 안 만든다. */}
      <p className="sh-peek">{ui.heading} · “{title}”</p>
      <button
        onClick={share}
        className="sh-go"
      >
        {copied ? (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {ui.copied}
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
