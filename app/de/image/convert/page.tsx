import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import ConvertTool from '@/components/image/ConvertTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('de', 'convert');

export default function DeImageConvertPage() {
  return (
    <ImageShellIntl slug="convert" lang="de">
      <ConvertTool lang="de" />
    </ImageShellIntl>
  );
}
