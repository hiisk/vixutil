import type { Metadata } from 'next';
import PasswordHubPage from '@/components/password/PasswordHubPage';
import { hubMetadata } from '@/lib/password/route';

export const metadata: Metadata = hubMetadata('zh');

export default function PasswordHub() {
  return <PasswordHubPage lang="zh" />;
}
