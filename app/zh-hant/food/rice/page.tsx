import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import RiceTool from '@/components/food/RiceTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('zh-hant', 'rice');

export default function EnFoodRicePage() {
  return (
    <FoodShellIntl slug="rice" lang="zh-hant">
      <RiceTool lang="zh-hant" />
    </FoodShellIntl>
  );
}
