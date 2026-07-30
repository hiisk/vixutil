import type { Metadata } from 'next';
import { alternateLanguages } from '@/lib/locales';
import FoodShell from '@/components/FoodShell';
import SteakTool from '@/components/food/SteakTool';

export const metadata: Metadata = {
  title: '고기 굽기 온도 - 스테이크 중심 온도와 시간',
  description: '굽기 단계별 중심 온도와, 잔열을 감안해 불에서 언제 꺼내야 하는지 알려줍니다. 두께를 넣으면 한 면당 대략 몇 분 구워야 하는지도 계산합니다.',
  alternates: {
    canonical: '/food/steak',
    languages: alternateLanguages('/food/steak'),
  },
};

export default function Page() {
  return (
    <FoodShell slug="steak">
      <SteakTool />
    </FoodShell>
  );
}
