import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import SplitTool from '@/components/image/SplitTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('de', 'split');

export default function DeImageSplitPage() {
  return (
    <ImageShellIntl slug="split" lang="de">
      <SplitTool lang="de" />
    </ImageShellIntl>
  );
}
