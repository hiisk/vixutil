'use client';
import { useEffect, useState } from 'react';

/**
 * 도시의 현재 시각 — 브라우저가 그린다.
 *
 * 서버에서 계산하면 빌드한 순간이 굳어 버리고, 서버 HTML과 첫 렌더가 어긋나
 * 하이드레이션이 깨진다. 그래서 처음에는 빈 자리를 두고 마운트 뒤에 채운다.
 *
 * 시간대 변환은 Intl에 맡긴다. 오프셋을 직접 더하면 서머타임 전환일에 한 시간
 * 틀리고, 그 하루는 아무도 확인하지 않는다.
 */
export default function CityClock({ zone, locale }: { zone: string; locale: string }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    // 첫 값을 setTimeout으로 미룬다 — 효과 본문에서 바로 setState하면
    // React Compiler 규칙에 걸리고 렌더 중 상태 변경이 된다
    const tick = () => setNow(new Date());
    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, 1000);
    return () => { window.clearTimeout(first); window.clearInterval(id); };
  }, []);

  const time = now
    ? new Intl.DateTimeFormat(locale, {
        timeZone: zone, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
      }).format(now)
    : '--:--:--';
  const date = now
    ? new Intl.DateTimeFormat(locale, {
        timeZone: zone, year: 'numeric', month: 'long', day: 'numeric', weekday: 'long',
      }).format(now)
    : '';

  return (
    <div data-city-clock={zone}>
      <p className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-slate-100 tabular-nums tracking-tight">
        {time}
      </p>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 min-h-[1rem]">{date}</p>
    </div>
  );
}
