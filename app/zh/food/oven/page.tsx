import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import OvenTool from '@/components/food/OvenTool';

export const metadata: Metadata = {
  title: '烤箱温度换算 — 华氏、摄氏、Gas Mark 与空气炸锅',
  description: '把外国菜谱里的 350°F 换成摄氏，也告诉你 Gas Mark 4 到底是多少度。同一道菜改用空气炸锅时的温度和时间也一起算好。',
  alternates: {
    canonical: '/zh/food/oven',
    languages: { 'en': '/en/food/oven', 'zh': '/zh/food/oven', 'ko': '/food/oven', 'x-default': '/en/food/oven' },
  },
};

export default function ZhFoodOvenPage() {
  return (
    <FoodShellIntl slug="oven" lang="zh">
      <OvenTool lang="zh" />
    </FoodShellIntl>
  );
}
