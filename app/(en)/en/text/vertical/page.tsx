import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import VerticalTool from '@/components/text/VerticalTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('en', 'vertical');

export default function EnTextVerticalPage() {
  return (
    <TextShellIntl slug="vertical" lang="en">
      <VerticalTool lang="en" />
    </TextShellIntl>
  );
}
