import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import EmoticonTool from '@/components/text/EmoticonTool';

export const metadata: Metadata = {
  title: '颜文字大全 — 复制颜文字与字符表情',
  description: '¯\\_(ツ)_/¯、(╯°□°）╯、ಠ_ಠ 这类纯用字符拼出来的表情，按心情分好类。因为是文字不是图片，贴到哪里都不会坏，用在昵称和签名里也可以。',
  alternates: {
    canonical: '/zh/text/emoticon',
    languages: { 'en': '/en/text/emoticon', 'zh': '/zh/text/emoticon', 'ko': '/text/emoticon', 'x-default': '/en/text/emoticon' },
  },
};

export default function ZhTextEmoticonPage() {
  return (
    <TextShellIntl slug="emoticon" lang="zh">
      <EmoticonTool lang="zh" />
    </TextShellIntl>
  );
}
