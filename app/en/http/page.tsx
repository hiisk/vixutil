import type { Metadata } from 'next';
import HttpHubPage from '@/components/http/HttpHubPage';
import { hubMetadata } from '@/lib/http/route';

export const metadata: Metadata = hubMetadata('en');

export default function HttpHub() {
  return <HttpHubPage lang="en" />;
}
