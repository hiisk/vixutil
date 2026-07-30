import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import LoremTool from '@/components/text/LoremTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('de', 'lorem');

export default function DeTextLoremPage() {
  return (
    <TextShellIntl slug="lorem" lang="de">
      <LoremTool lang="de" />
    </TextShellIntl>
  );
}
