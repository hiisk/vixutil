import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import RoundTool from '@/components/image/RoundTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('en', 'round');

export default function EnImageRoundPage() {
  return (
    <ImageShellIntl slug="round" lang="en">
      <RoundTool lang="en" />
    </ImageShellIntl>
  );
}
