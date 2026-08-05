import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import MergeTool from '@/components/image/MergeTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('hi', 'merge');

export default function HiImageMergePage() {
  return (
    <ImageShellIntl slug="merge" lang="hi">
      <MergeTool lang="hi" />
    </ImageShellIntl>
  );
}
