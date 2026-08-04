import type { Metadata } from 'next';
import YearHubPage from '@/components/year/YearHubPage';
import { hubMetadata } from '@/lib/year/route';

export const metadata: Metadata = hubMetadata('tw');

export default function YearHub() {
  return <YearHubPage lang="tw" />;
}
