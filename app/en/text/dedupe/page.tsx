import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import DedupeTool from '@/components/text/DedupeTool';

export const metadata: Metadata = {
  title: 'Remove Duplicate Lines — Dedupe and Sort a List Online',
  description: 'Paste a list and it removes the repeated lines and sorts what is left alphabetically. You can choose whether lines that differ only in surrounding whitespace or letter case count as the same, which is what real lists actually need.',
  alternates: {
    canonical: '/en/text/dedupe',
    languages: { 'en': '/en/text/dedupe', 'zh': '/zh/text/dedupe', 'ko': '/text/dedupe', 'x-default': '/en/text/dedupe' },
  },
};

export default function EnTextDedupePage() {
  return (
    <TextShellIntl slug="dedupe" lang="en">
      <DedupeTool lang="en" />
    </TextShellIntl>
  );
}
