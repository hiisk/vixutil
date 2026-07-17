import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Base64 인코딩·디코딩 - 온라인 무료 변환 도구',
  description: '텍스트 또는 파일을 Base64로 인코딩하거나 Base64 문자열을 원문으로 디코딩합니다. 브라우저에서 즉시 처리되어 서버 전송 없이 안전합니다.',
  alternates: { canonical: '/calculator/dev/base64' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
