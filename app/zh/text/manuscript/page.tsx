import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import ManuscriptTool from '@/components/text/ManuscriptTool';

export const metadata: Metadata = {
  title: '字数统计 — 含空格与不含空格、稿纸张数',
  description: '把文字贴进来，它会告出含空格和不含空格各多少字、相当于 200 字稿纸几张。设好投稿或作业给的字数上限，还会显示还差多少字。',
  alternates: {
    canonical: '/zh/text/manuscript',
    languages: { 'en': '/en/text/manuscript', 'zh': '/zh/text/manuscript', 'ko': '/text/manuscript', 'x-default': '/en/text/manuscript' },
  },
};

export default function ZhTextManuscriptPage() {
  return (
    <TextShellIntl slug="manuscript" lang="zh">
      <ManuscriptTool lang="zh" />
    </TextShellIntl>
  );
}
