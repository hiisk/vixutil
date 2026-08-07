import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import WrapTool from '@/components/text/WrapTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('hi', 'wrap');

export default function HiTextWrapPage() {
  return (
    <TextShellIntl slug="wrap" lang="hi">
      <WrapTool lang="hi" />
    </TextShellIntl>
  );
}
