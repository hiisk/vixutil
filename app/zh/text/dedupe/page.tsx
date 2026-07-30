import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import DedupeTool from '@/components/text/DedupeTool';

export const metadata: Metadata = {
  title: '去除重复行 — 在线列表去重与排序',
  description: '把名单或列表贴进来，它会删掉重复的行并按字母顺序排好。只有首尾空格不同、或只有大小写不同的行，是否算同一行也可以自己选，正好是整理真实名单需要的。',
  alternates: {
    canonical: '/zh/text/dedupe',
    languages: { 'en': '/en/text/dedupe', 'zh': '/zh/text/dedupe', 'ko': '/text/dedupe', 'x-default': '/en/text/dedupe' },
  },
};

export default function ZhTextDedupePage() {
  return (
    <TextShellIntl slug="dedupe" lang="zh">
      <DedupeTool lang="zh" />
    </TextShellIntl>
  );
}
