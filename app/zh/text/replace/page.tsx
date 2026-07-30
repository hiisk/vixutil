import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import ReplaceTool from '@/components/text/ReplaceTool';

export const metadata: Metadata = {
  title: '在线查找替换 — 批量替换，支持正则',
  description: '名字或术语整个改了的时候，不必在长文里一处一处改。可以打开区分大小写和正则表达式，替换前还会先数出有多少处会被改。',
  alternates: {
    canonical: '/zh/text/replace',
    languages: { 'en': '/en/text/replace', 'zh': '/zh/text/replace', 'ko': '/text/replace', 'x-default': '/en/text/replace' },
  },
};

export default function ZhTextReplacePage() {
  return (
    <TextShellIntl slug="replace" lang="zh">
      <ReplaceTool lang="zh" />
    </TextShellIntl>
  );
}
