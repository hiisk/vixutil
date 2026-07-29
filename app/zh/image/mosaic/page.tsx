import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import MosaicTool from '@/components/image/MosaicTool';

export const metadata: Metadata = {
  title: '照片打码 — 遮住照片里的人脸与个人信息',
  description: '二手交易实拍里的地址、合照里别人的脸，用手指或鼠标涂过去，只有涂到的地方会被打码。照片不会上传服务器，所以含个人信息的截图也能放心处理。',
  alternates: {
    canonical: '/zh/image/mosaic',
    languages: { 'en': '/en/image/mosaic', 'zh': '/zh/image/mosaic', 'ko': '/image/mosaic', 'x-default': '/en/image/mosaic' },
  },
};

export default function ZhImageMosaicPage() {
  return (
    <ImageShellIntl slug="mosaic" lang="zh">
      <MosaicTool lang="zh" />
    </ImageShellIntl>
  );
}
