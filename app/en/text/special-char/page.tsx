import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import SpecialCharTool from '@/components/text/SpecialCharTool';

export const metadata: Metadata = {
  title: 'Special Characters — Copy Arrows, Shapes and Symbols',
  description: 'Arrows (→ ⇒), shapes (★ ◆ ▶), punctuation (※ 「」), maths and units (㎡ ℃ ±), currency (€ ₩) and enclosed characters (① ㉠) — tap any of them to copy. No more hunting for a symbol your keyboard cannot type.',
  alternates: {
    canonical: '/en/text/special-char',
    languages: { 'en': '/en/text/special-char', 'zh': '/zh/text/special-char', 'ko': '/text/special-char', 'x-default': '/en/text/special-char' },
  },
};

export default function EnTextSpecialCharPage() {
  return (
    <TextShellIntl slug="special-char" lang="en">
      <SpecialCharTool lang="en" />
    </TextShellIntl>
  );
}
