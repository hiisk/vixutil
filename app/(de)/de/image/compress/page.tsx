import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import CompressTool from '@/components/image/CompressTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('de', 'compress');

export default function DeImageCompressPage() {
  return (
    <ImageShellIntl slug="compress" lang="de">
      <CompressTool lang="de" />
    </ImageShellIntl>
  );
}
