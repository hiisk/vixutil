import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import MeasureTool from '@/components/food/MeasureTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('pt-br', 'measure');

export default function PtBrFoodMeasurePage() {
  return (
    <FoodShellIntl slug="measure" lang="pt-br">
      <MeasureTool lang="pt-br" />
    </FoodShellIntl>
  );
}
