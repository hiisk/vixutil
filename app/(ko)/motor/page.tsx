import type { Metadata } from 'next';
import MotorHubPage from '@/components/motor/MotorHubPage';
import { hubMetadata } from '@/lib/motor/route';

export const metadata: Metadata = hubMetadata('ko');

export default function MotorHub() {
  return <MotorHubPage lang="ko" />;
}
