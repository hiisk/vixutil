import type { Metadata } from 'next';
import FoodShell from '@/components/FoodShell';
import CoffeeTool from '@/components/food/CoffeeTool';

export const metadata: Metadata = {
  title: '커피 비율 계산 - 원두와 물의 황금비율',
  description: '핸드드립·프렌치프레스·콜드브루마다 다른 원두와 물의 비율을 계산합니다. 마실 양을 정하면 원두 몇 그램을 갈아야 하는지 바로 나옵니다.',
  alternates: {
    canonical: '/food/coffee',
    languages: { 'ko': '/food/coffee', 'en': '/en/food/coffee', 'zh': '/zh/food/coffee', 'x-default': '/en/food/coffee' },
  },
};

export default function Page() {
  return (
    <FoodShell slug="coffee">
      <CoffeeTool />
    </FoodShell>
  );
}
