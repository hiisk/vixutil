import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import SpecialCharTool from '@/components/text/SpecialCharTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('de', 'special-char');

export default function DeTextSpecialCharPage() {
  return (
    <TextShellIntl slug="special-char" lang="de">
      <SpecialCharTool lang="de" />
    </TextShellIntl>
  );
}
