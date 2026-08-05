import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import OvenTool from '@/components/food/OvenTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('es', 'oven');

export default function EsFoodOvenPage() {
  return (
    <FoodShellIntl slug="oven" lang="es">
      <OvenTool lang="es" />
    </FoodShellIntl>
  );
}
