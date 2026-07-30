import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import ReplaceTool from '@/components/text/ReplaceTool';

export const metadata: Metadata = {
  title: 'Find and Replace Text Online — Bulk Replace, Regex Supported',
  description: 'When a name or a term changes, you do not have to fix it one instance at a time. Case sensitivity and regular expressions can both be turned on, and it counts how many places will change before you commit.',
  alternates: {
    canonical: '/en/text/replace',
    languages: { 'en': '/en/text/replace', 'ko': '/text/replace', 'x-default': '/en/text/replace' },
  },
};

export default function EnTextReplacePage() {
  return (
    <TextShellIntl slug="replace" lang="en">
      <ReplaceTool lang="en" />
    </TextShellIntl>
  );
}
