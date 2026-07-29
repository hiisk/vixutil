import type { Metadata } from 'next';
import CoupleMatch from '@/components/snap/CoupleMatch';

export const metadata: Metadata = {
  title: "情侣面相配对 — 比较两张照片",
  description: "上传两张照片，比较六项实测五官比例并给出相似度分数。两张照片都在浏览器内分析，不会上传。",
  alternates: {
    canonical: '/zh/snap/couple-match',
    languages: { 'en': '/en/snap/couple-match', 'zh': '/zh/snap/couple-match', 'ko': '/snap/couple-match', 'x-default': '/en/snap/couple-match' },
  },
};

export default function ZhCoupleMatchPage() {
  return <CoupleMatch lang="zh" />;
}
