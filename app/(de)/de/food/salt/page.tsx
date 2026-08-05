import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import SaltTool from '@/components/food/SaltTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('de', 'salt');

export default function DeFoodSaltPage() {
  return (
    <FoodShellIntl slug="salt" lang="de">
      <SaltTool lang="de" />
    </FoodShellIntl>
  );
}
