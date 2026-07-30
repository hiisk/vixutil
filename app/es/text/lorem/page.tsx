import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import LoremTool from '@/components/text/LoremTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('es', 'lorem');

export default function EsTextLoremPage() {
  return (
    <TextShellIntl slug="lorem" lang="es">
      <LoremTool lang="es" />
    </TextShellIntl>
  );
}
