import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import CoffeeTool from '@/components/food/CoffeeTool';

export const metadata: Metadata = {
  title: '咖啡粉水比计算 — 手冲、法压、冷萃',
  description: '手冲、法压壶、冷萃各自的粉水比都不同，这里帮你算好。定好要喝多少，马上就知道该磨多少克豆子。',
  alternates: {
    canonical: '/zh/food/coffee',
    languages: { 'en': '/en/food/coffee', 'zh': '/zh/food/coffee', 'ko': '/food/coffee', 'x-default': '/en/food/coffee' },
  },
};

export default function ZhFoodCoffeePage() {
  return (
    <FoodShellIntl slug="coffee" lang="zh">
      <CoffeeTool lang="zh" />
    </FoodShellIntl>
  );
}
