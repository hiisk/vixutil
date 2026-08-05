import { ogImage } from '@/lib/og-image';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return ogImage(
    ogCard({
      icon: '🪙',
      eyebrow: 'Crypto Tools',
      title: 'Crypto Trading Tools',
      desc: 'Volatility & TP/SL from Binance market data',
      from: '#f59e0b',
      to: '#ea580c',
    }),
  );
}
