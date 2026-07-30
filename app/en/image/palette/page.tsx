import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import PaletteTool from '@/components/image/PaletteTool';

export const metadata: Metadata = {
  title: 'Image Colour Extractor — Get HEX Codes From a Photo',
  description: 'When you want to reuse the mood of a photo you like, this pulls out the colours it uses most and gives you the HEX and RGB codes. Tap anywhere on the photo and you get the colour at that exact point.',
  alternates: {
    canonical: '/en/image/palette',
    languages: { 'en': '/en/image/palette', 'ko': '/image/palette', 'x-default': '/en/image/palette' },
  },
};

export default function EnImagePalettePage() {
  return (
    <ImageShellIntl slug="palette" lang="en">
      <PaletteTool lang="en" />
    </ImageShellIntl>
  );
}
