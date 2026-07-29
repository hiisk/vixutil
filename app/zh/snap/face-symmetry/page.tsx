import type { Metadata } from 'next';
import FaceSymmetry from '@/components/snap/FaceSymmetry';

export const metadata: Metadata = {
  title: '脸部对称度测试 — 分部位看左右平衡',
  description: '用一张照片测量眼睛、眉毛、嘴角与下颌线的左右平衡。全部在浏览器内完成，照片不会上传到服务器。',
  alternates: {
    canonical: '/zh/snap/face-symmetry',
    languages: { 'en': '/en/snap/face-symmetry', 'zh': '/zh/snap/face-symmetry', 'ko': '/snap/face-symmetry', 'x-default': '/en/snap/face-symmetry' },
  },
};

export default function ZhFaceSymmetryPage() {
  return <FaceSymmetry lang="zh" />;
}
