import type { Metadata } from 'next';
import PaceHubPage from '@/components/pace/PaceHubPage';
import { hubMetadata } from '@/lib/pace/route';

export const metadata: Metadata = hubMetadata('en');

export default function PaceHub() {
  return <PaceHubPage lang="en" />;
}
