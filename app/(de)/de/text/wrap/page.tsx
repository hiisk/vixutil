import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import WrapTool from '@/components/text/WrapTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('de', 'wrap');

export default function DeTextWrapPage() {
  return (
    <TextShellIntl slug="wrap" lang="de">
      <WrapTool lang="de" />
    </TextShellIntl>
  );
}
