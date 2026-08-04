import type { Metadata } from 'next';
import FractionHubPage from '@/components/fraction/FractionHubPage';
import { hubMetadata } from '@/lib/fraction/route';

export const metadata: Metadata = hubMetadata('zh');

export default function FractionHub() {
  return <FractionHubPage lang="zh" />;
}
