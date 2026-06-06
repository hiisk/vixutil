import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '퍼센트 계산기 - 비율·증감률·할인율 즉시 계산',
  description: '퍼센트 계산, 할인율, 증가율, 역산(X는 Y의 몇%)을 지원하는 다용도 비율 계산기입니다.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
