import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import MergeTool from '@/components/image/MergeTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('en', 'merge');

export default function EnImageMergePage() {
  return (
    <ImageShellIntl slug="merge" lang="en">
      <MergeTool lang="en" />
    </ImageShellIntl>
  );
}
