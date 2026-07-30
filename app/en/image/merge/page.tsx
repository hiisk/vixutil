import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import MergeTool from '@/components/image/MergeTool';

export const metadata: Metadata = {
  title: 'Combine Images — Merge Several Photos Into One',
  description: 'For stitching chat screenshots into a single image, or putting a before and after next to each other. Photos of different widths are aligned for you, and you can set the gap between them and the background colour.',
  alternates: {
    canonical: '/en/image/merge',
    languages: { 'en': '/en/image/merge', 'ko': '/image/merge', 'x-default': '/en/image/merge' },
  },
};

export default function EnImageMergePage() {
  return (
    <ImageShellIntl slug="merge" lang="en">
      <MergeTool lang="en" />
    </ImageShellIntl>
  );
}
