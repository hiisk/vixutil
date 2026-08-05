import type { Metadata } from 'next';
import FoodHubIntl from '@/components/FoodHubIntl';
import { foodHubMetaIntl } from '@/lib/food-tools-intl';

/* 화면은 components/FoodHubIntl.tsx 하나를 일곱 언어가 같이 쓴다 */
export const metadata: Metadata = foodHubMetaIntl('ja');

export default function JaFoodHub() {
  return <FoodHubIntl lang="ja" />;
}
