import type { Metadata } from 'next';
import ConvertHub from '@/components/ConvertHub';
import { convertHubMetaIntl } from '@/lib/convert-ui-intl';

export const metadata: Metadata = convertHubMetaIntl('ko');

export default function ConvertHubPage() {
  return <ConvertHub lang="ko" />;
}
