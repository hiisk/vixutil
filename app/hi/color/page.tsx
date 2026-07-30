import type { Metadata } from 'next';
import ColorHubIntl from '@/components/ColorHubIntl';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'रंग उपकरण — पैलेट, कंट्रास्ट, CSS ग्रेडिएंट',
  description: 'मुफ़्त रंग उपकरण: पैलेट जनरेटर, शेड श्रेणी, कंट्रास्ट जाँच, वर्णांधता सिम्युलेटर, CSS ग्रेडिएंट और छाया। ब्राउज़र में चलता है, इंस्टॉल करने की ज़रूरत नहीं।',
  alternates: {
    canonical: '/hi/color',
    languages: alternateLanguages('/color'),
  },
};

export default function HiColorHub() {
  return <ColorHubIntl lang="hi" />;
}
