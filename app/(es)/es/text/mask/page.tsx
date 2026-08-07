import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import MaskTool from '@/components/text/MaskTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('es', 'mask');

export default function EsTextMaskPage() {
  return (
    <TextShellIntl slug="mask" lang="es">
      <MaskTool lang="es" />
    </TextShellIntl>
  );
}
