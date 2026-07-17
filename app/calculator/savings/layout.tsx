import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '적금 계산기 - 월 납입액·이율로 만기 수령액 계산',
  description: '월 납입금액과 연이율, 적금 기간을 입력하면 만기 수령액과 실수령 이자를 계산합니다. 이자소득세 공제 후 실수령액도 확인할 수 있습니다.',
  alternates: { canonical: '/calculator/savings' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
