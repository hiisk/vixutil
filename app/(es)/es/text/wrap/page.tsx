import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import WrapTool from '@/components/text/WrapTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('es', 'wrap');

export default function EsTextWrapPage() {
  return (
    <TextShellIntl slug="wrap" lang="es">
      <WrapTool lang="es" />
    </TextShellIntl>
  );
}
