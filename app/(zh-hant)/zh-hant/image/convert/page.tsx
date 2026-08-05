import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import ConvertTool from '@/components/image/ConvertTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('zh-hant', 'convert');

export default function ZhHantImageConvertPage() {
  return (
    <ImageShellIntl slug="convert" lang="zh-hant">
      <ConvertTool lang="zh-hant" />
    </ImageShellIntl>
  );
}
