import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import LoremTool from '@/components/text/LoremTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('hi', 'lorem');

export default function HiTextLoremPage() {
  return (
    <TextShellIntl slug="lorem" lang="hi">
      <LoremTool lang="hi" />
    </TextShellIntl>
  );
}
