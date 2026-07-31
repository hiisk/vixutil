import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import SteakTool from '@/components/food/SteakTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('zh-hans', 'steak');

export default function EnFoodSteakPage() {
  return (
    <FoodShellIntl slug="steak" lang="zh-hans">
      <SteakTool lang="zh-hans" />
    </FoodShellIntl>
  );
}
