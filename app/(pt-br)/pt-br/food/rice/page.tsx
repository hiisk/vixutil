import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import RiceTool from '@/components/food/RiceTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('pt-br', 'rice');

export default function PtBrFoodRicePage() {
  return (
    <FoodShellIntl slug="rice" lang="pt-br">
      <RiceTool lang="pt-br" />
    </FoodShellIntl>
  );
}
