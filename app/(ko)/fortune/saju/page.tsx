'use client';
import SajuKo from '@/components/fortune/SajuKo';

/**
 * 사주 통합 화면 — 알맹이는 components/fortune/SajuKo.tsx에 있다.
 *
 * 주제 낱장(/fortune/saju/<주제>)이 **같은 컴포넌트를 그대로 쓴다.** 예전에는
 * 주제 낱장이 근거·해설·배경만 그리는 얇은 조각이라, 주제로 들어온 사람이
 * 통합으로 들어온 사람보다 적게 봤다 — 일주 심층해석도 세운도 없었다.
 * 그래서 알맹이를 컴포넌트로 빼고 라우트는 껍데기만 남긴다.
 */
export default function SajuPage() {
  return <SajuKo />;
}
