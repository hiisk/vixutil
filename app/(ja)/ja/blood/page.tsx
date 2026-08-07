import type { Metadata } from 'next';
import BloodHubPage from '@/components/blood/BloodHubPage';
import { hubMetadata } from '@/lib/blood/route';

export const metadata: Metadata = hubMetadata('ja');

export default function BloodHub() {
  return <BloodHubPage lang="ja" />;
}
