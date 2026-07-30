import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import SpecialCharTool from '@/components/text/SpecialCharTool';

export const metadata: Metadata = {
  title: '特殊符号 — 复制箭头、图形与各种符号',
  description: '箭头（→ ⇒）、图形（★ ◆ ▶）、标点（※ 「」）、数学与单位（㎡ ℃ ±）、货币（€ ¥）、带圈字符（① ㉠），点一下就复制。不用再到处找键盘打不出来的符号。',
  alternates: {
    canonical: '/zh/text/special-char',
    languages: { 'en': '/en/text/special-char', 'zh': '/zh/text/special-char', 'ko': '/text/special-char', 'x-default': '/en/text/special-char' },
  },
};

export default function ZhTextSpecialCharPage() {
  return (
    <TextShellIntl slug="special-char" lang="zh">
      <SpecialCharTool lang="zh" />
    </TextShellIntl>
  );
}
