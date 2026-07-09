import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'ATR TP/SL 세팅 - 코인 변동성 기반 익절·손절 계산기',
  description: '바이낸스 거래량 상위 코인의 일봉 ATR(14)을 실시간으로 계산해, 진입가·방향·배수에 따른 익절(TP)·손절(SL) 가격과 손익비를 산출하는 도구입니다. 투자 자문이 아닌 참고용 계산기입니다.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
