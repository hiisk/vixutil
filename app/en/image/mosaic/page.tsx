import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import MosaicTool from '@/components/image/MosaicTool';

export const metadata: Metadata = {
  title: 'Blur or Pixelate a Photo — Hide Faces and Personal Details',
  description: 'Brush with a finger or the mouse over anything you need hidden — an address in a marketplace photo, someone else’s face in a group shot — and only that spot gets pixelated. Nothing is uploaded, so screens holding personal details are safe to work on.',
  alternates: {
    canonical: '/en/image/mosaic',
    languages: { 'en': '/en/image/mosaic', 'ko': '/image/mosaic', 'x-default': '/en/image/mosaic' },
  },
};

export default function EnImageMosaicPage() {
  return (
    <ImageShellIntl slug="mosaic" lang="en">
      <MosaicTool lang="en" />
    </ImageShellIntl>
  );
}
