import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'ATR 타점 보드 - 코인 진입·TP·SL 자동 업데이트',
  description: '바이낸스 현물·선물 거래량 상위 코인의 UTC 일봉 ATR 타점(진입가·타겟·손절)과 실시간 수익률을 3시간마다 자동 갱신해 보여주는 대시보드입니다. 투자 자문이 아닌 참고용입니다.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
