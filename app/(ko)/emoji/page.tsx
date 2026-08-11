import type { Metadata } from 'next';
import EmojiHubPage from '@/components/emoji/EmojiHubPage';
import { hubMetadata } from '@/lib/emoji/route';

export const metadata: Metadata = hubMetadata('ko');

export default function EmojiHub() {
  return <EmojiHubPage lang="ko" />;
}
