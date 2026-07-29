import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import SteakTool from '@/components/food/SteakTool';

export const metadata: Metadata = {
  title: '牛排熟度对照 — 中心温度与时间',
  description: '给出各熟度的中心温度，以及考虑余温后应该什么时候离火。输入厚度，还能估出每面大约要煎几分钟。',
  alternates: {
    canonical: '/zh/food/steak',
    languages: { 'en': '/en/food/steak', 'zh': '/zh/food/steak', 'ko': '/food/steak', 'x-default': '/en/food/steak' },
  },
};

export default function ZhFoodSteakPage() {
  return (
    <FoodShellIntl slug="steak" lang="zh">
      <SteakTool lang="zh" />
    </FoodShellIntl>
  );
}
