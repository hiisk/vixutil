import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '표정 감정 분석 - AI로 보는 사진 속 감정',
  description: '사진 한 장을 AI 감정 인식 모델로 분석해 행복·놀람·무표정 등 7가지 감정의 비율을 알려주는 참여형 테스트입니다.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
