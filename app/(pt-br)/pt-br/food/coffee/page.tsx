import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import CoffeeTool from '@/components/food/CoffeeTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('pt-br', 'coffee');

export default function PtBrFoodCoffeePage() {
  return (
    <FoodShellIntl slug="coffee" lang="pt-br">
      <CoffeeTool lang="pt-br" />
    </FoodShellIntl>
  );
}
