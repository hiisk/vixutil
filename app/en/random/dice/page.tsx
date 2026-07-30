import type { Metadata } from 'next';
import DiceHubPage from '@/components/dice/DiceHubPage';
import { hubMetadata } from '@/lib/dice/route';

export const metadata: Metadata = hubMetadata('en');

export default function DiceHub() {
  return <DiceHubPage lang="en" />;
}
