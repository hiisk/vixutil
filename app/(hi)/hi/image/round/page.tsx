import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import RoundTool from '@/components/image/RoundTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('hi', 'round');

export default function HiImageRoundPage() {
  return (
    <ImageShellIntl slug="round" lang="hi">
      <RoundTool lang="hi" />
    </ImageShellIntl>
  );
}
