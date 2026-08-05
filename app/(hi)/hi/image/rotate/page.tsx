import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import RotateTool from '@/components/image/RotateTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('hi', 'rotate');

export default function HiImageRotatePage() {
  return (
    <ImageShellIntl slug="rotate" lang="hi">
      <RotateTool lang="hi" />
    </ImageShellIntl>
  );
}
