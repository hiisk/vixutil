import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import MeasureTool from '@/components/food/MeasureTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('zh-hans', 'measure');

export default function EnFoodMeasurePage() {
  return (
    <FoodShellIntl slug="measure" lang="zh-hans">
      <MeasureTool lang="zh-hans" />
    </FoodShellIntl>
  );
}
