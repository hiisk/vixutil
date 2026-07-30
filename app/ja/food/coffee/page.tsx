import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import CoffeeTool from '@/components/food/CoffeeTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('ja', 'coffee');

export default function JaFoodCoffeePage() {
  return (
    <FoodShellIntl slug="coffee" lang="ja">
      <CoffeeTool lang="ja" />
    </FoodShellIntl>
  );
}
