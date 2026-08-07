import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import SplitTool from '@/components/image/SplitTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('hi', 'split');

export default function HiImageSplitPage() {
  return (
    <ImageShellIntl slug="split" lang="hi">
      <SplitTool lang="hi" />
    </ImageShellIntl>
  );
}
