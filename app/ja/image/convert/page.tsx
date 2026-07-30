import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import ConvertTool from '@/components/image/ConvertTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('ja', 'convert');

export default function JaImageConvertPage() {
  return (
    <ImageShellIntl slug="convert" lang="ja">
      <ConvertTool lang="ja" />
    </ImageShellIntl>
  );
}
