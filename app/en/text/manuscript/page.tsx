import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import ManuscriptTool from '@/components/text/ManuscriptTool';

export const metadata: Metadata = {
  title: 'Word and Character Counter — With and Without Spaces',
  description: 'Paste your text and get the word count, the character count with and without spaces, and roughly how many pages that is. Set the limit an application or a brief gives you and it shows how much you have left.',
  alternates: {
    canonical: '/en/text/manuscript',
    languages: { 'en': '/en/text/manuscript', 'ko': '/text/manuscript', 'x-default': '/en/text/manuscript' },
  },
};

export default function EnTextManuscriptPage() {
  return (
    <TextShellIntl slug="manuscript" lang="en">
      <ManuscriptTool lang="en" />
    </TextShellIntl>
  );
}
