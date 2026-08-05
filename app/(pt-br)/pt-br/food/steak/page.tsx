import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import SteakTool from '@/components/food/SteakTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('pt-br', 'steak');

export default function PtBrFoodSteakPage() {
  return (
    <FoodShellIntl slug="steak" lang="pt-br">
      <SteakTool lang="pt-br" />
    </FoodShellIntl>
  );
}
