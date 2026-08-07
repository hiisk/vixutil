import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import ReverseTool from '@/components/text/ReverseTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('es', 'reverse');

export default function EsTextReversePage() {
  return (
    <TextShellIntl slug="reverse" lang="es">
      <ReverseTool lang="es" />
    </TextShellIntl>
  );
}
