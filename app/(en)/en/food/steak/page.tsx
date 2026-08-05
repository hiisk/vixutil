import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import SteakTool from '@/components/food/SteakTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('en', 'steak');

export default function EnFoodSteakPage() {
  return (
    <FoodShellIntl slug="steak" lang="en">
      <SteakTool lang="en" />
    </FoodShellIntl>
  );
}
