import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import RotateTool from '@/components/image/RotateTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('en', 'rotate');

export default function EnImageRotatePage() {
  return (
    <ImageShellIntl slug="rotate" lang="en">
      <RotateTool lang="en" />
    </ImageShellIntl>
  );
}
