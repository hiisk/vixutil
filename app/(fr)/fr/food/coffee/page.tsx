import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import CoffeeTool from '@/components/food/CoffeeTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('fr', 'coffee');

export default function FrFoodCoffeePage() {
  return (
    <FoodShellIntl slug="coffee" lang="fr">
      <CoffeeTool lang="fr" />
    </FoodShellIntl>
  );
}
