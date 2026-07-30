import type { Metadata } from 'next';
import GameHubIntl from '@/components/GameHubIntl';
import { gameHubMetaIntl } from '@/lib/game-tools-intl';

/* 화면은 components/GameHubIntl.tsx 하나를 일곱 언어가 같이 쓴다 */
export const metadata: Metadata = gameHubMetaIntl('es');

export default function EsGameHub() {
  return <GameHubIntl lang="es" />;
}
