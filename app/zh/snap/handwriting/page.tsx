import type { Metadata } from 'next';
import Handwriting from '@/components/snap/Handwriting';

export const metadata: Metadata = {
  title: "笔迹分析 — 从照片测量倾斜度与笔压",
  description: "拍下手写字，用结构张量测量笔画倾斜度，并由笔画深浅计算笔压。全部在浏览器内完成，照片不会上传。",
  alternates: {
    canonical: '/zh/snap/handwriting',
    languages: { 'en': '/en/snap/handwriting', 'zh': '/zh/snap/handwriting', 'ko': '/snap/handwriting', 'x-default': '/en/snap/handwriting' },
  },
};

export default function ZhHandwritingPage() {
  return <Handwriting lang="zh" />;
}
