import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import LoremTool from '@/components/text/LoremTool';

export const metadata: Metadata = {
  title: '占位文本生成 — Lorem Ipsum 与中文假字',
  description: '做设计稿或界面时用来填空的示例文字。可以设定段数和每段长度，也能按确定的字数裁切，正好塞进你要测的那个框里。',
  alternates: {
    canonical: '/zh/text/lorem',
    languages: { 'en': '/en/text/lorem', 'zh': '/zh/text/lorem', 'ko': '/text/lorem', 'x-default': '/en/text/lorem' },
  },
};

export default function ZhTextLoremPage() {
  return (
    <TextShellIntl slug="lorem" lang="zh">
      <LoremTool lang="zh" />
    </TextShellIntl>
  );
}
