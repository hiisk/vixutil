import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import MeasureTool from '@/components/food/MeasureTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('zh-hant', 'measure');

export default function EnFoodMeasurePage() {
  return (
    <FoodShellIntl slug="measure" lang="zh-hant">
      <MeasureTool lang="zh-hant" />
    </FoodShellIntl>
  );
}
