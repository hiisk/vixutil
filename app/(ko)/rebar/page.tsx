import type { Metadata } from 'next';
import RebarHubPage from '@/components/rebar/RebarHubPage';
import { hubMetadata } from '@/lib/rebar/route';

export const metadata: Metadata = hubMetadata('ko');

export default function RebarHub() {
  return <RebarHubPage lang="ko" />;
}
