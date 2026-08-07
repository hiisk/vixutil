import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import WrapTool from '@/components/text/WrapTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('en', 'wrap');

export default function EnTextWrapPage() {
  return (
    <TextShellIntl slug="wrap" lang="en">
      <WrapTool lang="en" />
    </TextShellIntl>
  );
}
