import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import CompressTool from '@/components/image/CompressTool';

export const metadata: Metadata = {
  title: '图片压缩 — 免费减小照片文件大小',
  description: '附件超过大小限制时用它。一点点降低画质，把原图与结果并排对比，还能立刻看到减小了百分之几。照片只在浏览器内处理，不会上传。',
  alternates: {
    canonical: '/zh/image/compress',
    languages: { 'en': '/en/image/compress', 'zh': '/zh/image/compress', 'ko': '/image/compress', 'x-default': '/en/image/compress' },
  },
};

export default function ZhImageCompressPage() {
  return (
    <ImageShellIntl slug="compress" lang="zh">
      <CompressTool lang="zh" />
    </ImageShellIntl>
  );
}
