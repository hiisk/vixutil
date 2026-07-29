import type { Metadata } from 'next';
import Biorhythm from '@/components/fortune/Biorhythm';

export const metadata: Metadata = {
  title: '生物节律计算器 — 身体·情绪·智力节律查询',
  description: '免费生物节律计算器：输入出生日期，绘制身体（23天）、情绪（28天）、智力（33天）三条节律曲线，并标出临界日。',
  alternates: {
    canonical: '/zh/fortune/biorhythm',
    languages: { 'zh': '/zh/fortune/biorhythm', 'en': '/en/fortune/biorhythm', 'ko': '/fortune/biorhythm', 'x-default': '/en/fortune/biorhythm' },
  },
};

export default function ZhBiorhythmPage() {
  return <Biorhythm lang="zh" />;
}
