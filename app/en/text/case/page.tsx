import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import CaseTool from '@/components/text/CaseTool';

export const metadata: Metadata = {
  title: 'Case Converter — UPPERCASE, lowercase, Title Case, camelCase',
  description: 'Convert to all caps, all lowercase or title case, and to developer conventions like camelCase, snake_case and kebab-case. Each result can be copied on its own.',
  alternates: {
    canonical: '/en/text/case',
    languages: { 'en': '/en/text/case', 'ko': '/text/case', 'x-default': '/en/text/case' },
  },
};

export default function EnTextCasePage() {
  return (
    <TextShellIntl slug="case" lang="en">
      <CaseTool lang="en" />
    </TextShellIntl>
  );
}
