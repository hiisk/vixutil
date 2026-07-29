import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import ConvertTool from '@/components/image/ConvertTool';

export const metadata: Metadata = {
  title: 'Image Converter — JPG, PNG and WebP Both Ways',
  description: 'For uploading somewhere that will not take WebP, or the other way round when you want a smaller file. A PNG with a transparent background gets that background filled when it becomes a JPG, so you can pick the fill colour too.',
  alternates: {
    canonical: '/en/image/convert',
    languages: { 'en': '/en/image/convert', 'zh': '/zh/image/convert', 'ko': '/image/convert', 'x-default': '/en/image/convert' },
  },
};

export default function EnImageConvertPage() {
  return (
    <ImageShellIntl slug="convert" lang="en">
      <ConvertTool lang="en" />
    </ImageShellIntl>
  );
}
