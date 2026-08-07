import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import RoundTool from '@/components/image/RoundTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('es', 'round');

export default function EsImageRoundPage() {
  return (
    <ImageShellIntl slug="round" lang="es">
      <RoundTool lang="es" />
    </ImageShellIntl>
  );
}
