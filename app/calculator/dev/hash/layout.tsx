import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '해시 생성기 - MD5·SHA1·SHA256·SHA512 온라인 계산',
  description: '텍스트를 입력하면 MD5, SHA-1, SHA-256, SHA-512 해시값을 즉시 생성합니다. 브라우저 내 Web Crypto API로 처리되어 서버 전송이 없습니다.',
  alternates: { canonical: '/calculator/dev/hash' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
