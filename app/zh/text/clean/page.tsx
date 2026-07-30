import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import CleanTool from '@/components/text/CleanTool';

export const metadata: Metadata = {
  title: '文本清理 — 去除不可见字符、修正换行',
  description: '从 PDF 或网页复制的文字里，会混进看不见的字符、看起来像普通空格但其实不是的空格，以及句子中间断掉的换行。这里一次全部清理干净，并告诉你各清掉了多少个。',
  alternates: {
    canonical: '/zh/text/clean',
    languages: { 'en': '/en/text/clean', 'zh': '/zh/text/clean', 'ko': '/text/clean', 'x-default': '/en/text/clean' },
  },
};

export default function ZhTextCleanPage() {
  return (
    <TextShellIntl slug="clean" lang="zh">
      <CleanTool lang="zh" />
    </TextShellIntl>
  );
}
