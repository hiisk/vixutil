import type { Metadata } from 'next';
import ResistorHubPage from '@/components/resistor/ResistorHubPage';
import { hubMetadata } from '@/lib/resistor/route';

export const metadata: Metadata = hubMetadata('ko');

export default function ResistorHub() {
  return <ResistorHubPage lang="ko" />;
}
