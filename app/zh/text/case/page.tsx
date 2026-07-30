import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import CaseTool from '@/components/text/CaseTool';

export const metadata: Metadata = {
  title: '大小写转换 — 全大写、全小写、首字母大写、camelCase',
  description: '转成全大写、全小写、每个单词首字母大写，也能转成 camelCase、snake_case、kebab-case 这些开发常用写法。每种结果都能单独复制。',
  alternates: {
    canonical: '/zh/text/case',
    languages: { 'en': '/en/text/case', 'zh': '/zh/text/case', 'ko': '/text/case', 'x-default': '/en/text/case' },
  },
};

export default function ZhTextCasePage() {
  return (
    <TextShellIntl slug="case" lang="zh">
      <CaseTool lang="zh" />
    </TextShellIntl>
  );
}
