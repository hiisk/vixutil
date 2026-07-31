import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import PastaTool from '@/components/food/PastaTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('zh-hant', 'pasta');

export default function EnFoodPastaPage() {
  return (
    <FoodShellIntl slug="pasta" lang="zh-hant">
      <PastaTool lang="zh-hant" />
    </FoodShellIntl>
  );
}
