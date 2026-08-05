import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import SteakTool from '@/components/food/SteakTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('ja', 'steak');

export default function JaFoodSteakPage() {
  return (
    <FoodShellIntl slug="steak" lang="ja">
      <SteakTool lang="ja" />
    </FoodShellIntl>
  );
}
