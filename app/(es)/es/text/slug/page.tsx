import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import SlugTool from '@/components/text/SlugTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('es', 'slug');

export default function EsTextSlugPage() {
  return (
    <TextShellIntl slug="slug" lang="es">
      <SlugTool lang="es" />
    </TextShellIntl>
  );
}
