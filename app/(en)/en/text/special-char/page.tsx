import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import SpecialCharTool from '@/components/text/SpecialCharTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('en', 'special-char');

export default function EnTextSpecialCharPage() {
  return (
    <TextShellIntl slug="special-char" lang="en">
      <SpecialCharTool lang="en" />
    </TextShellIntl>
  );
}
