import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '자동차세 계산기 - 배기량·연식 기준 연간 자동차세 계산',
  description: '차량 배기량과 연식을 입력하면 비영업용·영업용 구분으로 연간 자동차세와 교육세를 계산합니다. 연납 시 최대 7% 할인 혜택도 안내합니다.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
