import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import CoffeeTool from '@/components/food/CoffeeTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('en', 'coffee');

export default function EnFoodCoffeePage() {
  return (
    <FoodShellIntl slug="coffee" lang="en">
      <CoffeeTool lang="en" />
    </FoodShellIntl>
  );
}
