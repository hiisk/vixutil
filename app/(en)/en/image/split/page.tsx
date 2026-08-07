import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import SplitTool from '@/components/image/SplitTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('en', 'split');

export default function EnImageSplitPage() {
  return (
    <ImageShellIntl slug="split" lang="en">
      <SplitTool lang="en" />
    </ImageShellIntl>
  );
}
