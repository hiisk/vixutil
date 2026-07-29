import type { Metadata } from 'next';
import PhotoMood from '@/components/snap/PhotoMood';

export const metadata: Metadata = {
  title: "照片氛围分析 — 读出任意照片的色彩调性",
  description: "上传任意照片，从像素测量亮度、饱和度、冷暖与对比，并提取主要色彩。不需要人脸，照片不会上传。",
  alternates: {
    canonical: '/zh/snap/photo-mood',
    languages: { 'en': '/en/snap/photo-mood', 'zh': '/zh/snap/photo-mood', 'ko': '/snap/photo-mood', 'x-default': '/en/snap/photo-mood' },
  },
};

export default function ZhPhotoMoodPage() {
  return <PhotoMood lang="zh" />;
}
