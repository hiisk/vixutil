import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import MeasureTool from '@/components/food/MeasureTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('de', 'measure');

export default function DeFoodMeasurePage() {
  return (
    <FoodShellIntl slug="measure" lang="de">
      <MeasureTool lang="de" />
    </FoodShellIntl>
  );
}
