import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import DedupeTool from '@/components/text/DedupeTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('es', 'dedupe');

export default function EsTextDedupePage() {
  return (
    <TextShellIntl slug="dedupe" lang="es">
      <DedupeTool lang="es" />
    </TextShellIntl>
  );
}
