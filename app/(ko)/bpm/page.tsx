import type { Metadata } from 'next';
import BpmHubPage from '@/components/bpm/BpmHubPage';
import { hubMetadata } from '@/lib/bpm/route';

export const metadata: Metadata = hubMetadata('ko');

export default function BpmHub() {
  return <BpmHubPage lang="ko" />;
}
