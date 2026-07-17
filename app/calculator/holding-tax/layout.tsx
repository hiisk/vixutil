import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '종합부동산세 계산기 - 공시가격 합산 종부세 계산',
  description: '보유 주택의 공시가격 합산액과 공제금액을 기준으로 종합부동산세를 계산합니다. 1주택자·다주택자·법인 구분 세율 적용.',
  alternates: { canonical: '/calculator/holding-tax' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
