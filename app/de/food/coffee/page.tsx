import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import CoffeeTool from '@/components/food/CoffeeTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('de', 'coffee');

export default function DeFoodCoffeePage() {
  return (
    <FoodShellIntl slug="coffee" lang="de">
      <CoffeeTool lang="de" />
    </FoodShellIntl>
  );
}
