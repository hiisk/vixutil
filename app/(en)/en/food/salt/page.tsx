import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import SaltTool from '@/components/food/SaltTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('en', 'salt');

export default function EnFoodSaltPage() {
  return (
    <FoodShellIntl slug="salt" lang="en">
      <SaltTool lang="en" />
    </FoodShellIntl>
  );
}
