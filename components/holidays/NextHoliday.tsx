'use client';

import { useSyncExternalStore } from 'react';
import type { AnyLocale10 } from '@/lib/locales';
import { intlTag, uiOf } from '@/lib/holidays/ui-l10n';

/**
 * 다음 공휴일까지 며칠.
 *
 * 이 장은 한 번 구워 캐시에 둔다(revalidate=false). 「오늘」을 서버에서 읽으면
 * **구운 날이 그대로 굳어**, 몇 달 뒤에 열어도 그때 날짜로 센다. 그래서 붙은
 * 뒤에 손님의 시계로 센다.
 *
 * 붙기 전에는 아무것도 안 그린다 — 서버가 그린 것과 손님이 그린 것이 달라
 * 깜빡이는 것보다, 한 박자 뒤에 나타나는 편이 낫다.
 */
const isoToday = () => {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
};

/*
  글월을 통째로 이쪽에서 읽는다. 서버에서 `days: (n) => …` 같은 함수를 넘기면
  **클라이언트 경계를 함수는 못 넘어** 500이 난다(실제로 그렇게 만들어 봤다).
  남은 날 수는 손님 쪽에서만 정해지므로 문장도 여기서 지어야 한다.
*/
export default function NextHoliday({
  items,
  locale,
}: {
  items: { date: string; name: string }[];
  locale: AnyLocale10;
}) {
  const ui = uiOf(locale);
  const tag = intlTag(locale);
  /*
    서버에서는 빈 값, 손님 쪽에서는 그 사람의 «오늘».

    effect로 넣고 setState 하면 같은 일을 하지만 렌더가 한 번 더 돌고
    (react-hooks/set-state-in-effect가 그래서 막는다), 무엇보다 «서버 값»과
    «손님 값»이 갈린다는 것이 코드에 안 드러난다. 이 훅은 그 둘을 인자로
    받으므로 의도가 그대로 보인다.

    구독은 안 한다 — 날짜는 사람이 이 장을 열어 두고 자정을 넘길 때만 바뀌고,
    그때 한 줄이 하루 어긋나는 것은 다시 그릴 값이 아니다.
  */
  const today = useSyncExternalStore(() => () => {}, isoToday, () => '');

  if (!today) return null;

  const next = items.find(x => x.date >= today);
  if (!next) return null;

  const days = Math.round(
    (Date.parse(`${next.date}T00:00:00Z`) - Date.parse(`${today}T00:00:00Z`)) / 86400000,
  );
  const when = days === 0 ? ui.today : ui.daysLeft(days);
  const shown = new Intl.DateTimeFormat(tag, { month: 'long', day: 'numeric', timeZone: 'UTC' })
    .format(new Date(`${next.date}T00:00:00Z`));

  return (
    <div className="result-card mt-4">
      <p className="label-caps">{ui.nextUp}</p>
      <p className="mt-1 text-2xl font-bold tracking-tight">{next.name}</p>
      <p className="mt-1 text-sm">{shown} · {when}</p>
    </div>
  );
}
