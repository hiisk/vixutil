import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import BakingPanTool from '@/components/food/BakingPanTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('es', 'baking-pan');

export default function EsFoodBakingPanPage() {
  return (
    <FoodShellIntl slug="baking-pan" lang="es">
      <BakingPanTool lang="es" />
    </FoodShellIntl>
  );
}
