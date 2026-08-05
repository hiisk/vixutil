import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import RiceTool from '@/components/food/RiceTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('ja', 'rice');

export default function JaFoodRicePage() {
  return (
    <FoodShellIntl slug="rice" lang="ja">
      <RiceTool lang="ja" />
    </FoodShellIntl>
  );
}
