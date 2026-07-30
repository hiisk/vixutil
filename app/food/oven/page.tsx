import type { Metadata } from 'next';
import FoodShell from '@/components/FoodShell';
import OvenTool from '@/components/food/OvenTool';

export const metadata: Metadata = {
  title: '오븐 온도 변환 - 화씨·가스마크·에어프라이어',
  description: '외국 레시피의 350°F가 몇 도인지, 가스마크 4가 얼마인지 바꿔 줍니다. 같은 요리를 에어프라이어로 할 때의 온도와 시간도 함께 계산합니다.',
  alternates: {
    canonical: '/food/oven',
    languages: { 'ko': '/food/oven', 'en': '/en/food/oven', 'x-default': '/en/food/oven' },
  },
};

export default function Page() {
  return (
    <FoodShell slug="oven">
      <OvenTool />
    </FoodShell>
  );
}
