/* 생성됨(gen.mjs) — 메타 전용. 뷰(<Page/>)는 같은 이름의 원본 모듈에 있고
   components/FoldView.tsx가 클라이언트에서 따로 부른다. 여기서 뷰를 부르면
   서버 그래프가 클라이언트 컴포넌트에 닿아 라우트의 청크가 도로 합쳐진다. */
import type { Metadata } from 'next';
import { allDays, birthdayFacts, daySlug, parseDaySlug } from '@/lib/fortune/birthday-grid';
import { BIRTHDAY_UI } from '@/lib/fortune/birthday-ui';
import { zodiacSigns } from '@/lib/fortune-intl';
import { alternateLanguages10, localeHref, type AnyLocale10 } from '@/lib/locales';
import { withCard } from '@/lib/og-cards';
import { prerender } from '@/lib/prerender';
/** 생일 낱장 — `/fortune/birthday/<MM-DD>` 366일 × 열 언어 = 3,660장 */
export function buildMeta(lang: AnyLocale10) {
  async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const hit = parseDaySlug(slug);
    if (!hit) return {};
    const f = birthdayFacts(hit.month, hit.day);
    const t = BIRTHDAY_UI[lang];
    const sign = zodiacSigns(lang).find(s => s.id === f.zodiac.id)?.name ?? f.zodiac.id;
    const label = t.dateLabel(hit.month, hit.day);
    const route = `/fortune/birthday/${daySlug(hit.month, hit.day)}`;
    return withCard({
      title: t.metaTitle(label, sign),
      description: t.metaDesc(label, sign, f.birth.stone),
      alternates: { canonical: localeHref(lang, route), languages: alternateLanguages10(route) },
    });
  }

  const generateStaticParams = () => prerender(allDays().map(d => ({ slug: daySlug(d.month, d.day) })));

  return { generateMetadata, generateStaticParams };
}
