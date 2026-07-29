import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import MergeTool from '@/components/image/MergeTool';

export const metadata: Metadata = {
  title: '图片拼接 — 把多张照片合成一张',
  description: '把聊天截图接成一张，或者把前后对比并排放在一起。宽度不同的照片会自动对齐，照片之间的间距和底色也可以自己选。',
  alternates: {
    canonical: '/zh/image/merge',
    languages: { 'en': '/en/image/merge', 'zh': '/zh/image/merge', 'ko': '/image/merge', 'x-default': '/en/image/merge' },
  },
};

export default function ZhImageMergePage() {
  return (
    <ImageShellIntl slug="merge" lang="zh">
      <MergeTool lang="zh" />
    </ImageShellIntl>
  );
}
