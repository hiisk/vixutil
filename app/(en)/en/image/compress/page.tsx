import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import CompressTool from '@/components/image/CompressTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('en', 'compress');

export default function EnImageCompressPage() {
  return (
    <ImageShellIntl slug="compress" lang="en">
      <CompressTool lang="en" />
    </ImageShellIntl>
  );
}
