import Link from 'next/link';
import { localeHref, type AnyLocale10 } from '@/lib/locales';
import { TOPIC_SLUGS, type TopicSlug } from '@/lib/saju-topics';
import { TOPIC_L10N } from '@/lib/saju-topics-l10n/index';

/**
 * 주제 전환 칩.
 *
 * ── 왜 주소는 안 합치고 장치만 놓았나 ────────────────────
 * 일곱 주소는 그대로 둔다. "사주 연애운"으로 검색해 그 낱장에 바로 떨어지는
 * 유입이 주소를 합치면 통째로 사라진다. 유입은 나눠 받고, 들어온 사람은 안
 * 떠나고 옮겨 다니게 — 그래서 주소는 일곱, 장치는 일곱 장 모두에 같은 것.
 *
 * ── 값을 들고 간다 ──────────────────────────────────────
 * query에 ?y=&m=&d=&h=&g=가 실려 온다. 주제를 바꿀 때마다 생년월일을 다시
 * 넣어야 하면 아무도 안 쓴다. 이름은 주소에 안 실으므로(개인정보) 받는 쪽이
 * sessionStorage에서 꺼낸다 — lib/saju-topics.ts의 NAME_KEY.
 *
 * ── 마크업을 짧게 ───────────────────────────────────────
 * 컬러 이모지는 뺐다(2026-08-20). 칩 일곱이 색색 이모지를 하나씩 달고 늘어서면
 * 목록이 어수선하고, 이모지가 제목보다 먼저 읽혀 무엇을 고르는지가 늦게 온다.
 * 지금 보고 있는 것은 채워진 칩으로 이미 구별된다.
 *
 * .chip-v/.chip-now는 globals.css가 이미 가진 값 칩 한 벌이다. 색은 --c-sec를
 * 물려받으므로(PageGlow의 acc-*) 마크업에 섹션색을 안 적는다. 낱장 한 장이
 * HTML·.rsc·.segments 세 곳에 저장되니 class 문자열이 그대로 세 배가 된다.
 */
export default function SajuTopicNav({ lang, current, query = '' }: {
  lang: AnyLocale10; current?: TopicSlug; query?: string;
}) {
  const c = TOPIC_L10N[lang];
  return (
    <nav aria-label={c.ui.otherTopics}>
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
        {c.ui.otherTopics}
      </p>
      <div className="flex flex-wrap gap-2">
        {TOPIC_SLUGS.map(s => (
          s === current ? (
            // 지금 보고 있는 것은 링크가 아니라 채워진 칩이다 — 어디에 있는지가 분명해야 한다
            <span key={s} className="chip-v chip-now" aria-current="page">
              {c.title[s]}
            </span>
          ) : (
            <Link key={s} href={localeHref(lang, `/fortune/saju/${s}`) + query} className="chip-v">
              {c.title[s]}
            </Link>
          )
        ))}
      </div>
    </nav>
  );
}
