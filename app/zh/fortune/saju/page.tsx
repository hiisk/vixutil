import type { Metadata } from 'next';
import SajuIntl from '@/components/fortune/SajuIntl';

export const metadata: Metadata = {
  title: "八字排盘 — 由出生年月日时排出四柱",
  description: "输入出生年月日时排出八字四柱：天干地支、五行分布、十神与大运。免费，在浏览器内计算。",
  alternates: {
    canonical: '/zh/fortune/saju',
    languages: { 'en': '/en/fortune/saju', 'zh': '/zh/fortune/saju', 'ko': '/fortune/saju', 'x-default': '/en/fortune/saju' },
  },
};

export default function ZhSajuPage() {
  return <SajuIntl lang="zh" />;
}
