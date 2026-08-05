import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import CoffeeTool from '@/components/food/CoffeeTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('zh-hans', 'coffee');

export default function EnFoodCoffeePage() {
  return (
    <FoodShellIntl slug="coffee" lang="zh-hans">
      <CoffeeTool lang="zh-hans" />
    </FoodShellIntl>
  );
}
