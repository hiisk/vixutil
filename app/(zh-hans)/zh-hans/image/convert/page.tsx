import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import ConvertTool from '@/components/image/ConvertTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('zh-hans', 'convert');

export default function ZhHansImageConvertPage() {
  return (
    <ImageShellIntl slug="convert" lang="zh-hans">
      <ConvertTool lang="zh-hans" />
    </ImageShellIntl>
  );
}
