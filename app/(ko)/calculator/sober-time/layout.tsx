import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '음주 후 운전 가능 시간 계산기 - 혈중알코올농도·분해 시간',
  description: '마신 술 종류와 양, 체중, 성별을 넣으면 위드마크 공식으로 혈중알코올농도와 면허정지(0.03%)·완전 분해까지 걸리는 시간을 추정합니다. 다음 날 숙취운전 위험을 확인하세요. 운전을 허락하는 도구가 아닌 참고용입니다.',
  alternates: { canonical: '/calculator/sober-time' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
