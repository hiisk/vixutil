import type { Metadata } from 'next';
import CmdHubPage from '@/components/cmd/CmdHubPage';
import { hubMetadata } from '@/lib/cmd/route';

export const metadata: Metadata = hubMetadata('ko');

export default function CmdHub() {
  return <CmdHubPage lang="ko" />;
}
