import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '관상 테스트 - 사진으로 보는 실제 얼굴 인식 관상 분석',
  description: '사진 한 장으로 실제 얼굴 인식 기반 관상 테스트를 즐겨보세요. 얼굴형·눈매·이목구비를 실측해 분석하며, 사진은 서버에 저장되지 않습니다.',
  alternates: { canonical: '/snap/face-reading' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
