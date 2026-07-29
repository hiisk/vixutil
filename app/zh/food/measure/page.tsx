import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import MeasureTool from '@/components/food/MeasureTool';

export const metadata: Metadata = {
  title: '量杯换算克数 — 按材料换算，免费',
  description: '一杯面粉是 120g，一杯糖是 200g。同样的体积，材料不同重量也不同，所以必须选好材料才准。没有秤时，也可以反过来把克换成杯与勺。',
  alternates: {
    canonical: '/zh/food/measure',
    languages: { 'en': '/en/food/measure', 'zh': '/zh/food/measure', 'ko': '/food/measure', 'x-default': '/en/food/measure' },
  },
};

export default function ZhFoodMeasurePage() {
  return (
    <FoodShellIntl slug="measure" lang="zh">
      <MeasureTool lang="zh" />
    </FoodShellIntl>
  );
}
