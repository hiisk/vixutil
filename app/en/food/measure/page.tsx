import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import MeasureTool from '@/components/food/MeasureTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('en', 'measure');

export default function EnFoodMeasurePage() {
  return (
    <FoodShellIntl slug="measure" lang="en">
      <MeasureTool lang="en" />
    </FoodShellIntl>
  );
}
