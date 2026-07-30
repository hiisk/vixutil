import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import CleanTool from '@/components/text/CleanTool';

export const metadata: Metadata = {
  title: 'Text Cleaner — Remove Invisible Characters and Fix Line Breaks',
  description: 'Text copied out of a PDF or a web page carries invisible characters, spaces that look normal but are not, and line breaks in the middle of sentences. This clears all of it in one pass and tells you how many of each it removed.',
  alternates: {
    canonical: '/en/text/clean',
    languages: { 'en': '/en/text/clean', 'zh': '/zh/text/clean', 'ko': '/text/clean', 'x-default': '/en/text/clean' },
  },
};

export default function EnTextCleanPage() {
  return (
    <TextShellIntl slug="clean" lang="en">
      <CleanTool lang="en" />
    </TextShellIntl>
  );
}
