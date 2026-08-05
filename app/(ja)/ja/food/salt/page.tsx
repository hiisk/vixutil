import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import SaltTool from '@/components/food/SaltTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('ja', 'salt');

export default function JaFoodSaltPage() {
  return (
    <FoodShellIntl slug="salt" lang="ja">
      <SaltTool lang="ja" />
    </FoodShellIntl>
  );
}
