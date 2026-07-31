import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import CaseTool from '@/components/text/CaseTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('zh-hant', 'case');

export default function ZhHantTextCasePage() {
  return (
    <TextShellIntl slug="case" lang="zh-hant">
      <CaseTool lang="zh-hant" />
    </TextShellIntl>
  );
}
