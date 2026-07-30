import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import LoremTool from '@/components/text/LoremTool';

export const metadata: Metadata = {
  title: 'Lorem Ipsum Generator — Placeholder Text, Any Length',
  description: 'Generates the filler text you need while building a design or a screen. Set how many paragraphs and how long each one runs, or cut it to an exact character count so it fits the box you are testing.',
  alternates: {
    canonical: '/en/text/lorem',
    languages: { 'en': '/en/text/lorem', 'ko': '/text/lorem', 'x-default': '/en/text/lorem' },
  },
};

export default function EnTextLoremPage() {
  return (
    <TextShellIntl slug="lorem" lang="en">
      <LoremTool lang="en" />
    </TextShellIntl>
  );
}
