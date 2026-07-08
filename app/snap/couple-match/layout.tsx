import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '커플 관상 궁합 - 사진 두 장으로 보는 궁합',
  description: '두 사람의 사진을 올리면 각자의 이목구비 비율을 실제로 측정해 인상이 얼마나 닮았는지 커플 궁합 점수를 알려주는 참여형 테스트입니다.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
