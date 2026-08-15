import { alternateLanguages10 } from '@/lib/locales';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import type { Metadata } from 'next';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  /*
   * 낱말은 네이버·구글 자동완성에서 실제로 나오는 것만 쓴다(2026-08-15 조사).
   * 수요 순: 무료사주 · 무료사주풀이 · 사주팔자 · 만세력 · 평생사주.
   *
   * "무료 운세"와 "오늘의 운세"는 일부러 뺐다 — 네이버 자동완성에서 무료운세는
   * 열 중 여섯이 은행·보험사 위젯이거나 "오늘"이 붙는, 생년월일시를 안 받는
   * 물음이다. /fortune/daily의 것이고, 여기서 노리면 우리끼리 싸운다.
   */
  title: '무료 사주풀이 - 생년월일로 보는 사주팔자·만세력',
  description: '생년월일시로 사주팔자 네 기둥을 세우고 오행 균형·십성·대운·세운까지 풀어 봅니다. 가입 없이 무료이며, 만세력 계산은 브라우저 안에서만 이루어집니다.',
  alternates: {
    canonical: '/fortune/saju',
    languages: alternateLanguages10('/fortune/saju'),
  },
});
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: '홈', path: '/' },
        { name: '운세', path: '/fortune' },
        { name: '사주 분석', path: '/fortune/saju' },
      ])} />
      {children}
    </>
  );
}
