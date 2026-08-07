import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import RoundTool from '@/components/image/RoundTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('de', 'round');

export default function DeImageRoundPage() {
  return (
    <ImageShellIntl slug="round" lang="de">
      <RoundTool lang="de" />
    </ImageShellIntl>
  );
}
