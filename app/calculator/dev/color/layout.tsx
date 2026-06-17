import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '색상 변환기 - HEX·RGB·HSL 색상 코드 상호 변환',
  description: 'HEX, RGB, HSL 색상 코드를 상호 변환합니다. 색상 피커로 선택하거나 직접 값을 입력해 변환 결과를 즉시 확인합니다.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
