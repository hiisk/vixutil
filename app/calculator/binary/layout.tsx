import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '진수 변환기 - 2진수·8진수·10진수·16진수 변환',
  description: '2진수, 8진수, 10진수, 16진수를 즉시 상호 변환합니다. 16진수 0x 접두사, 2진수 4자리 단위 표시.',
  alternates: { canonical: '/calculator/binary' },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
