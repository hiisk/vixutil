import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import ResizeTool from '@/components/image/ResizeTool';

export const metadata: Metadata = {
  title: 'Image Resizer — Change Photo Dimensions in Pixels',
  description: 'Type the width and height directly or scale by percentage, and lock the aspect ratio so the photo does not stretch. Common sizes — Instagram posts, YouTube thumbnails, profile pictures — are one button away.',
  alternates: {
    canonical: '/en/image/resize',
    languages: { 'en': '/en/image/resize', 'ko': '/image/resize', 'x-default': '/en/image/resize' },
  },
};

export default function EnImageResizePage() {
  return (
    <ImageShellIntl slug="resize" lang="en">
      <ResizeTool lang="en" />
    </ImageShellIntl>
  );
}
