import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import PaletteTool from '@/components/image/PaletteTool';

export const metadata: Metadata = {
  title: '图片取色 — 从照片中提取 HEX 色值',
  description: '想沿用某张喜欢的照片的氛围时，它会把那张照片里用得最多的颜色提取出来，给出 HEX 与 RGB 值。在照片上任意一点点一下，也能立刻知道那个位置的颜色。',
  alternates: {
    canonical: '/zh/image/palette',
    languages: { 'en': '/en/image/palette', 'zh': '/zh/image/palette', 'ko': '/image/palette', 'x-default': '/en/image/palette' },
  },
};

export default function ZhImagePalettePage() {
  return (
    <ImageShellIntl slug="palette" lang="zh">
      <PaletteTool lang="zh" />
    </ImageShellIntl>
  );
}
