import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import SaltTool from '@/components/food/SaltTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('hi', 'salt');

export default function HiFoodSaltPage() {
  return (
    <FoodShellIntl slug="salt" lang="hi">
      <SaltTool lang="hi" />
    </FoodShellIntl>
  );
}
