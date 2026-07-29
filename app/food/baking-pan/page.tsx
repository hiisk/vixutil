import type { Metadata } from 'next';
import FoodShell from '@/components/FoodShell';
import BakingPanTool from '@/components/food/BakingPanTool';

export const metadata: Metadata = {
  title: '베이킹 팬 환산 - 틀 크기 바꿀 때 반죽량',
  description: '레시피는 15cm 원형인데 집에는 18cm 사각틀뿐일 때, 반죽을 몇 배로 해야 하는지 계산합니다. 넓이 비율로 계산하므로 높이가 비슷한 틀끼리는 그대로 맞습니다.',
  alternates: {
    canonical: '/food/baking-pan',
    languages: { 'ko': '/food/baking-pan', 'en': '/en/food/baking-pan', 'zh': '/zh/food/baking-pan', 'x-default': '/en/food/baking-pan' },
  },
};

export default function Page() {
  return (
    <FoodShell slug="baking-pan">
      <BakingPanTool />
    </FoodShell>
  );
}
