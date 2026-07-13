import { ImageResponse } from 'next/og';

/**
 * iOS 홈 화면 아이콘.
 *
 * apple-icon 파일 규약은 .jpg/.jpeg/.png만 지원한다(icon과 달리 .svg는 안 된다).
 * 기존의 app/apple-icon.svg는 <link rel="apple-touch-icon">만 생기고 정작 파일은
 * 빌드 출력에 나오지 않아, 모든 페이지가 없는 아이콘을 가리키고 있었다.
 * ImageResponse로 PNG를 생성해 규약을 맞춘다. 디자인은 icon.svg와 동일하다.
 */
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';
export const dynamic = 'force-static';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #6366f1 0%, #7c3aed 100%)',
          color: 'white',
          fontSize: 118,
          fontWeight: 900,
          letterSpacing: -4,
        }}
      >
        v
      </div>
    ),
    { ...size }
  );
}
