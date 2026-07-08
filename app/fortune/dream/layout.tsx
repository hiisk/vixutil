import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '꿈 해몽 - 돼지·뱀·불 등 50가지 꿈의 의미 분석',
  description: '무료 꿈해몽 사전. 태몽·동물꿈·자연현상 등 다양한 꿈의 길흉과 의미를 검색해보세요.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
