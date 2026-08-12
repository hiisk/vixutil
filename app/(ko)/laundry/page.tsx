import type { Metadata } from 'next';
import LaundryHubPage from '@/components/laundry/LaundryHubPage';
import { hubMetadata } from '@/lib/laundry/route';

export const metadata: Metadata = hubMetadata('ko');

export default function LaundryHub() {
  return <LaundryHubPage lang="ko" />;
}
