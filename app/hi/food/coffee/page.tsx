import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import CoffeeTool from '@/components/food/CoffeeTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('hi', 'coffee');

export default function HiFoodCoffeePage() {
  return (
    <FoodShellIntl slug="coffee" lang="hi">
      <CoffeeTool lang="hi" />
    </FoodShellIntl>
  );
}
