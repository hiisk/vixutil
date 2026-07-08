import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '동물상 테스트 - 나는 무슨 동물상일까',
  description: '사진 한 장으로 강아지상부터 여우상까지, 12가지 동물상 중 나와 가장 닮은 동물을 실제 얼굴 인식으로 찾아보세요.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
