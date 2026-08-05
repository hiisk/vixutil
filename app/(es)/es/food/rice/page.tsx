import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import RiceTool from '@/components/food/RiceTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('es', 'rice');

export default function EsFoodRicePage() {
  return (
    <FoodShellIntl slug="rice" lang="es">
      <RiceTool lang="es" />
    </FoodShellIntl>
  );
}
