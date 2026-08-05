import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import RotateTool from '@/components/image/RotateTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('de', 'rotate');

export default function DeImageRotatePage() {
  return (
    <ImageShellIntl slug="rotate" lang="de">
      <RotateTool lang="de" />
    </ImageShellIntl>
  );
}
