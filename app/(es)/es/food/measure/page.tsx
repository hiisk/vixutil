import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import MeasureTool from '@/components/food/MeasureTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('es', 'measure');

export default function EsFoodMeasurePage() {
  return (
    <FoodShellIntl slug="measure" lang="es">
      <MeasureTool lang="es" />
    </FoodShellIntl>
  );
}
