import type { Metadata } from 'next';
import FirstImpression from '@/components/snap/FirstImpression';

export const metadata: Metadata = {
  title: "第一印象分析 — 你属于六种印象中的哪一种",
  description: "从一张照片测量眼睛大小、脸型比例与嘴角上扬，判定你属于六种第一印象中的哪一种。全部在浏览器内完成，照片不会上传。",
  alternates: {
    canonical: '/zh/snap/first-impression',
    languages: { 'en': '/en/snap/first-impression', 'zh': '/zh/snap/first-impression', 'ko': '/snap/first-impression', 'x-default': '/en/snap/first-impression' },
  },
};

export default function ZhFirstImpressionPage() {
  return <FirstImpression lang="zh" />;
}
