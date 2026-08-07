import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import VerticalTool from '@/components/text/VerticalTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('hi', 'vertical');

export default function HiTextVerticalPage() {
  return (
    <TextShellIntl slug="vertical" lang="hi">
      <VerticalTool lang="hi" />
    </TextShellIntl>
  );
}
