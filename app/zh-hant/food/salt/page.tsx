import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import SaltTool from '@/components/food/SaltTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('zh-hant', 'salt');

export default function EnFoodSaltPage() {
  return (
    <FoodShellIntl slug="salt" lang="zh-hant">
      <SaltTool lang="zh-hant" />
    </FoodShellIntl>
  );
}
