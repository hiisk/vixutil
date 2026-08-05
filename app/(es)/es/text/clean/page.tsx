import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import CleanTool from '@/components/text/CleanTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('es', 'clean');

export default function EsTextCleanPage() {
  return (
    <TextShellIntl slug="clean" lang="es">
      <CleanTool lang="es" />
    </TextShellIntl>
  );
}
