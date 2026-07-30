import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import MeasureTool from '@/components/food/MeasureTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('hi', 'measure');

export default function HiFoodMeasurePage() {
  return (
    <FoodShellIntl slug="measure" lang="hi">
      <MeasureTool lang="hi" />
    </FoodShellIntl>
  );
}
