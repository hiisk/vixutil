import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import CompressTool from '@/components/image/CompressTool';

export const metadata: Metadata = {
  title: 'Image Compressor — Reduce Photo File Size Free',
  description: 'For when an attachment is over the size limit. Lower the quality step by step, compare the original and the result side by side, and see exactly what percentage you saved. Your photo is processed inside the browser and never uploaded.',
  alternates: {
    canonical: '/en/image/compress',
    languages: { 'en': '/en/image/compress', 'zh': '/zh/image/compress', 'ko': '/image/compress', 'x-default': '/en/image/compress' },
  },
};

export default function EnImageCompressPage() {
  return (
    <ImageShellIntl slug="compress" lang="en">
      <CompressTool lang="en" />
    </ImageShellIntl>
  );
}
