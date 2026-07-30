import type { Metadata } from 'next';
import ExtHubPage from '@/components/ext/ExtHubPage';
import { hubMetadata } from '@/lib/ext/route';

export const metadata: Metadata = hubMetadata('en');

export default function ExtHub() {
  return <ExtHubPage lang="en" />;
}
