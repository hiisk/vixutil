import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import MergeTool from '@/components/image/MergeTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('de', 'merge');

export default function DeImageMergePage() {
  return (
    <ImageShellIntl slug="merge" lang="de">
      <MergeTool lang="de" />
    </ImageShellIntl>
  );
}
