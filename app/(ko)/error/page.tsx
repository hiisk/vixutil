import type { Metadata } from 'next';
import ErrHubPage from '@/components/errmsg/ErrHubPage';
import { hubMetadata } from '@/lib/errmsg/route';

export const metadata: Metadata = hubMetadata('ko');

export default function ErrHub() {
  return <ErrHubPage lang="ko" />;
}
