import type { Metadata } from 'next';
import { ChecklistIntlHub, checklistIntlMeta } from '@/components/ChecklistIntlPage';

export const metadata: Metadata = checklistIntlMeta('zh-hant');

export default function ChecklistHub() {
  return <ChecklistIntlHub lang="zh-hant" />;
}
