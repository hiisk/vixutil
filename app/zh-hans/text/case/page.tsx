import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import CaseTool from '@/components/text/CaseTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('zh-hans', 'case');

export default function ZhHansTextCasePage() {
  return (
    <TextShellIntl slug="case" lang="zh-hans">
      <CaseTool lang="zh-hans" />
    </TextShellIntl>
  );
}
