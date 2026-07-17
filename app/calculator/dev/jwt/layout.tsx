import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'JWT 디코더 - JWT 헤더·페이로드 파싱 및 만료 확인',
  description: 'JWT(JSON Web Token) 문자열을 붙여넣으면 헤더, 페이로드를 파싱하고 만료(exp) 시간을 확인합니다. 서버 전송 없이 브라우저에서 처리합니다.',
  alternates: { canonical: '/calculator/dev/jwt' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
