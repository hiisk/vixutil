import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import EmoticonTool from '@/components/text/EmoticonTool';

export const metadata: Metadata = {
  title: 'Text Emoticons — Copy Kaomoji and ASCII Faces',
  description: 'Emoticons built purely from characters — ¯\\_(ツ)_/¯, (╯°□°）╯, ಠ_ಠ — collected by mood. Because they are text and not images, they paste anywhere without breaking, and work in usernames and status messages.',
  alternates: {
    canonical: '/en/text/emoticon',
    languages: { 'en': '/en/text/emoticon', 'zh': '/zh/text/emoticon', 'ko': '/text/emoticon', 'x-default': '/en/text/emoticon' },
  },
};

export default function EnTextEmoticonPage() {
  return (
    <TextShellIntl slug="emoticon" lang="en">
      <EmoticonTool lang="en" />
    </TextShellIntl>
  );
}
