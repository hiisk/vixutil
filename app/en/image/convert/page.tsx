import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import ConvertTool from '@/components/image/ConvertTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('en', 'convert');

export default function EnImageConvertPage() {
  return (
    <ImageShellIntl slug="convert" lang="en">
      <ConvertTool lang="en" />
    </ImageShellIntl>
  );
}
