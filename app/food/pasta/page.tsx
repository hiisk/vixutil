import type { Metadata } from 'next';
import FoodShell from '@/components/FoodShell';
import PastaTool from '@/components/food/PastaTool';

export const metadata: Metadata = {
  title: '파스타 물·소금 계산 - 면 삶는 황금비율',
  description: '면 100g에 물 1L, 소금 10g이 기본 비율입니다. 면 양을 넣으면 물과 소금을 계산해 주고, 면 종류별 삶는 시간도 함께 알려줍니다.',
  alternates: { canonical: '/food/pasta' },
};

export default function Page() {
  return (
    <FoodShell slug="pasta">
      <PastaTool />
    </FoodShell>
  );
}
