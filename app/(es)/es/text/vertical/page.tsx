import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import VerticalTool from '@/components/text/VerticalTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('es', 'vertical');

export default function EsTextVerticalPage() {
  return (
    <TextShellIntl slug="vertical" lang="es">
      <VerticalTool lang="es" />
    </TextShellIntl>
  );
}
