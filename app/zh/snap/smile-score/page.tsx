import type { Metadata } from 'next';
import SmileScore from '@/components/snap/SmileScore';

export const metadata: Metadata = {
  title: '微笑指数 — 一张照片测出你的笑容',
  description: '上传一张照片，测量嘴角上扬程度、嘴部张开度与左右平衡。全部在浏览器内完成，照片不会上传。',
  alternates: {
    canonical: '/zh/snap/smile-score',
    languages: { 'en': '/en/snap/smile-score', 'zh': '/zh/snap/smile-score', 'ko': '/snap/smile-score', 'x-default': '/en/snap/smile-score' },
  },
};

export default function ZhSmileScorePage() {
  return <SmileScore lang="zh" />;
}
