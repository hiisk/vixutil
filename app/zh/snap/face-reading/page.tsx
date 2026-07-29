import type { Metadata } from 'next';
import FaceReading from '@/components/snap/FaceReading';

export const metadata: Metadata = {
  title: "面相分析 — 七处五官的传统解读",
  description: "从照片实测七处五官比例，按传统面相解读。测量真实、解读娱乐，照片不会上传。",
  alternates: {
    canonical: '/zh/snap/face-reading',
    languages: { 'en': '/en/snap/face-reading', 'zh': '/zh/snap/face-reading', 'ko': '/snap/face-reading', 'x-default': '/en/snap/face-reading' },
  },
};

export default function ZhFaceReadingPage() {
  return <FaceReading lang="zh" />;
}
