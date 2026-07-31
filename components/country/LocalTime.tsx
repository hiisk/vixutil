'use client';
import { useEffect, useState } from 'react';
import type { FormulaLang } from '@/lib/formula/terms';
import { localeTag } from '@/lib/locales';

/**
 * 그 나라의 현재 시각.
 *
 * 숫자 오프셋으로 계산하면 서머타임 기간에 한 시간이 틀린다. IANA 시간대를
 * Intl에 넘기면 브라우저의 시간대 데이터가 서머타임까지 처리해 준다.
 *
 * 서버에는 "지금"이 없으므로 마운트 전에는 비워 둔다 — 서버가 렌더한 시각과
 * 브라우저의 시각이 다르면 하이드레이션이 어긋난다.
 */
export default function LocalTime({ tz, lang }: { tz: string; lang: FormulaLang }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    // 첫 값도 콜백으로 넣는다 — 이펙트 본문에서 바로 setState하면 렌더가 한 번 더 돈다
    const tick = () => setNow(new Date());
    const id = window.setInterval(tick, 1000);
    const first = window.setTimeout(tick, 0);
    return () => { window.clearInterval(id); window.clearTimeout(first); };
  }, []);

  if (!now) return <span className="text-slate-300 dark:text-slate-600">--:--</span>;

  // ko-KR·es-ES처럼 지역까지 붙은 태그라야 Intl이 그 나라 표기를 쓴다
  const locale = {
    ko: 'ko-KR', en: 'en-US', es: 'es-ES', 'pt-br': 'pt-BR', ja: 'ja-JP',
    de: 'de-DE', fr: 'fr-FR', hi: 'hi-IN', 'zh-hans': 'zh-CN', 'zh-hant': 'zh-TW',
  }[lang] ?? localeTag(lang);
  const time = new Intl.DateTimeFormat(locale, {
    timeZone: tz, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
  }).format(now);
  const date = new Intl.DateTimeFormat(locale, {
    timeZone: tz, month: 'short', day: 'numeric', weekday: 'short',
  }).format(now);

  return (
    <span>
      <span className="tabular-nums">{time}</span>
      <span className="ml-1.5 text-xs font-medium text-white/60">{date}</span>
    </span>
  );
}
