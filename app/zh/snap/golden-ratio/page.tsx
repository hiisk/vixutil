import type { Metadata } from 'next';
import GoldenRatio from '@/components/snap/GoldenRatio';

export const metadata: Metadata = {
  title: '黄金比例脸测试 — 与 φ 1.618 的接近程度',
  description: '用一张照片测量四项五官比例与黄金比的接近程度。基于真实关键点坐标，在浏览器内计算，照片不会上传。',
  alternates: {
    canonical: '/zh/snap/golden-ratio',
    languages: { 'en': '/en/snap/golden-ratio', 'zh': '/zh/snap/golden-ratio', 'ko': '/snap/golden-ratio', 'x-default': '/en/snap/golden-ratio' },
  },
};

export default function ZhGoldenRatioPage() {
  return <GoldenRatio lang="zh" />;
}
