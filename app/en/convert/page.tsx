import type { Metadata } from 'next';
import ConvertHub from '@/components/ConvertHub';
import { convertHubMetaIntl } from '@/lib/convert-ui-intl';

export const metadata: Metadata = convertHubMetaIntl('en');

export default function EnConvertHub() {
  return <ConvertHub lang="en" />;
}
