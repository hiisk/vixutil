import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import ConvertTool from '@/components/image/ConvertTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('hi', 'convert');

export default function HiImageConvertPage() {
  return (
    <ImageShellIntl slug="convert" lang="hi">
      <ConvertTool lang="hi" />
    </ImageShellIntl>
  );
}
