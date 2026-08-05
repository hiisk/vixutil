import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import CaseTool from '@/components/text/CaseTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('hi', 'case');

export default function HiTextCasePage() {
  return (
    <TextShellIntl slug="case" lang="hi">
      <CaseTool lang="hi" />
    </TextShellIntl>
  );
}
