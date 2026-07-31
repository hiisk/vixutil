import type { Metadata } from 'next';
import FoodHubIntl from '@/components/FoodHubIntl';
import { foodHubMetaIntl } from '@/lib/food-tools-intl';

/* 화면은 components/FoodHubIntl.tsx 하나를 일곱 언어가 같이 쓴다 */
export const metadata: Metadata = foodHubMetaIntl('zh-hans');

export default function EnFoodHub() {
  return <FoodHubIntl lang="zh-hans" />;
}
