import type { Metadata } from 'next';
import { ChecklistIntlHub, checklistIntlMeta } from '@/components/ChecklistIntlPage';

export const metadata: Metadata = checklistIntlMeta('ja');

export default function ChecklistHub() {
  return <ChecklistIntlHub lang="ja" />;
}
