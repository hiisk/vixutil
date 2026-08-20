'use client';
import { useEffect, useRef, useState } from 'react';
import { COUPANG, COUPANG_DISCLOSURE, COUPANG_MIN_WIDTH, coupangWidgetUrl } from '@/lib/coupang';

/**
 * 쿠팡 파트너스 캐러셀.
 *
 * ── g.js를 안 쓴다 ─────────────────────────────────────────
 * 쿠팡이 주는 스니펫은 <script src="g.js"> 뒤에 new PartnersCoupang.G({...})를
 * 부르는 꼴이다. 붙여 보고 실제로 무엇을 하는지 쟀더니 이랬다:
 *
 *   · **<ins>를 document.body 끝에 붙인다.** script를 어느 div 안에서 실행하든
 *     상관없다 — document.currentScript를 안 본다. React가 그리는 자리에
 *     담을 방법이 없다(처음에 «슬롯 안에서 실행하면 거기 꽂힌다»고 봤는데
 *     틀렸다. 그때 슬롯 안에 있던 것은 script 하나였고 광고는 body에 있었다).
 *   · 그 <ins> 안에 iframe 하나를 넣는다. 주소는 아래 coupangWidgetUrl이 만드는
 *     것과 같고, **넘긴 width를 그대로 지킨다.**
 *
 * 그래서 그 iframe을 우리가 직접 그린다. 얻는 것:
 *   전역 스크립트가 없고, body가 안 더러워지고, 폭이 정확하고,
 *   StrictMode에서 두 번 그려도 겹치지 않고, 높이를 미리 잡아 화면이 안 튄다.
 *
 * ── 폭은 상수가 아니다 ─────────────────────────────────────
 * 위젯은 넘긴 width 그대로 iframe을 만든다. 반응형이 아니다. 실측:
 *
 *     1200  →  iframe 1200px, 모바일에서 문서 scrollWidth 1200 (화면이 밀림)
 *      358  →  iframe 358px, 넘침 없음
 *     100%  →  390px (컨테이너가 아니라 뷰포트 폭을 잡는다)
 *
 * 이 사이트의 광고 자리는 모바일 328~398px, 데스크톱 본문 544~640px이다.
 * 붙는 자리를 재서 넘긴다.
 */
export default function CoupangAd({ lang = 'ko', className = '' }: { lang?: string; className?: string }) {
  const slot = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  /** 쿠팡은 한국에서만 산다 — 아홉 언어 화면에 띄우면 자리만 버리고 신뢰도 잃는다 */
  const enabled = lang === 'ko';

  useEffect(() => {
    if (!enabled) return;
    const el = slot.current;
    if (!el) return;
    const measure = () => {
      const w = Math.floor(el.clientWidth);
      /* 몇 px씩 흔들리는 것(스크롤바 유무)으로 iframe을 다시 받지 않는다 */
      setWidth(prev => (Math.abs(w - prev) >= 40 ? w : prev));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [enabled]);

  if (!enabled) return null;

  return (
    <aside className={`mt-8 border-t border-slate-100 dark:border-slate-800 pt-4 ${className}`}>
      {/*
        대가성 표기는 광고 «위»에 둔다. 아래에 적으면 이미 다 보고 난 뒤라
        알린 뜻이 없다.
      */}
      <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
        <span className="mr-1.5 inline-block rounded bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300">
          광고
        </span>
        {COUPANG_DISCLOSURE}
      </p>
      {/*
        높이를 미리 잡는다. 광고가 늦게 떠서 아래 내용을 밀면 그게 CLS다.
        폭을 재기 전(width 0)에도 이 상자는 자리를 지킨다.
      */}
      <div ref={slot} className="mt-3 overflow-hidden" style={{ minHeight: COUPANG.height }}>
        {width >= COUPANG_MIN_WIDTH && (
          <iframe
            key={width}
            src={coupangWidgetUrl(width)}
            width={width}
            height={COUPANG.height}
            /* 화면 밖이면 안 받아 온다 — 광고는 본문 아래에 있다 */
            loading="lazy"
            scrolling="no"
            referrerPolicy="unsafe-url"
            title="쿠팡 파트너스 추천 상품"
            className="block border-0"
          />
        )}
      </div>
    </aside>
  );
}
