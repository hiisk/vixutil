import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import MeasureTool from '@/components/food/MeasureTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('ja', 'measure');

export default function JaFoodMeasurePage() {
  return (
    <FoodShellIntl slug="measure" lang="ja">
      <MeasureTool lang="ja" />
    </FoodShellIntl>
  );
}
