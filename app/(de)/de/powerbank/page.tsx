import type { Metadata } from 'next';
import PowerBankHubPage from '@/components/powerbank/PowerBankHubPage';
import { hubMetadata } from '@/lib/powerbank/route';

export const metadata: Metadata = hubMetadata('de');

export default function PowerBankHub() {
  return <PowerBankHubPage lang="de" />;
}
