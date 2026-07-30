import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import LoremTool from '@/components/text/LoremTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('en', 'lorem');

export default function EnTextLoremPage() {
  return (
    <TextShellIntl slug="lorem" lang="en">
      <LoremTool lang="en" />
    </TextShellIntl>
  );
}
