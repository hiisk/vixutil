import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import ResizeTool from '@/components/image/ResizeTool';

export const metadata: Metadata = {
  title: '图片尺寸调整 — 修改照片宽高像素',
  description: '可以直接输入宽高，也可以按百分比缩小；打开等比锁定，照片就不会被拉变形。Instagram、YouTube 缩略图、头像这些常用尺寸按一下就能套用。',
  alternates: {
    canonical: '/zh/image/resize',
    languages: { 'en': '/en/image/resize', 'zh': '/zh/image/resize', 'ko': '/image/resize', 'x-default': '/en/image/resize' },
  },
};

export default function ZhImageResizePage() {
  return (
    <ImageShellIntl slug="resize" lang="zh">
      <ResizeTool lang="zh" />
    </ImageShellIntl>
  );
}
