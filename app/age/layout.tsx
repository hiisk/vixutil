import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '나이 계산기 - 만 나이·세는 나이·연 나이 동시 계산',
  description: '생년월일을 입력하면 2026년 만 나이, 세는 나이, 연 나이를 한번에 계산합니다. 2023년부터 법적 만 나이 통일 기준 적용.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
