import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import MeasureTool from '@/components/food/MeasureTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('fr', 'measure');

export default function FrFoodMeasurePage() {
  return (
    <FoodShellIntl slug="measure" lang="fr">
      <MeasureTool lang="fr" />
    </FoodShellIntl>
  );
}
