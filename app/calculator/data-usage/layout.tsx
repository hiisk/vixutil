import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '데이터 사용량 계산기 - 화질별 소모량과 가능 시간',
  description: '남은 데이터로 영상을 몇 시간 볼 수 있는지, 얼마나 필요한지 계산합니다. 480p·720p·1080p·4K와 음악·영상통화·웹서핑을 함께 비교합니다.',
  alternates: { canonical: '/calculator/data-usage' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
