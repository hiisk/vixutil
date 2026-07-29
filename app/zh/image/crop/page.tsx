import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import CropTool from '@/components/image/CropTool';

export const metadata: Metadata = {
  title: '图片裁剪 — 按任意区域或比例裁照片',
  description: '在照片上拖动，只保留想要的部分。锁定 1:1、16:9 或头像比例就能按规格裁切，留成自由比例则可以随意框选。',
  alternates: {
    canonical: '/zh/image/crop',
    languages: { 'en': '/en/image/crop', 'zh': '/zh/image/crop', 'ko': '/image/crop', 'x-default': '/en/image/crop' },
  },
};

export default function ZhImageCropPage() {
  return (
    <ImageShellIntl slug="crop" lang="zh">
      <CropTool lang="zh" />
    </ImageShellIntl>
  );
}
