import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import RotateTool from '@/components/image/RotateTool';

export const metadata: Metadata = {
  title: '图片旋转与翻转 — 转动照片、左右镜像',
  description: '把存成横躺的照片按 90 度扶正，把镜像反了的自拍用左右翻转还原。还能以 1 度为单位微调角度，把地平线调平。',
  alternates: {
    canonical: '/zh/image/rotate',
    languages: { 'en': '/en/image/rotate', 'zh': '/zh/image/rotate', 'ko': '/image/rotate', 'x-default': '/en/image/rotate' },
  },
};

export default function ZhImageRotatePage() {
  return (
    <ImageShellIntl slug="rotate" lang="zh">
      <RotateTool lang="zh" />
    </ImageShellIntl>
  );
}
