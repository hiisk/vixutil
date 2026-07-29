import type { ReactElement } from 'react';

/** 공유(OG) 이미지 공통 규격·템플릿 — next/og(Satori)로 렌더 */
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

/** #rrggbb → rgba(r,g,b,a) */
function alpha(hex: string, a: number): string {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

/** 왼쪽 글 영역의 안쪽 폭. 이보다 넘치면 오른쪽 아이콘을 침범한다. */
const TEXT_BOX = 624;

/**
 * 글자 하나가 차지하는 폭을 em 단위로 어림한다.
 * 한글·한자·가나는 정사각에 가깝고 라틴·숫자·문장부호는 절반 남짓이다.
 * 글자 수만 세면 "판타지 이름 생성기"와 "Fantasy Name Generator"가 같은
 * 길이로 잡혀 한쪽은 넘치고 한쪽은 쪼그라든다.
 */
function charUnits(ch: string): number {
  const c = ch.codePointAt(0) ?? 0;
  if (c >= 0xac00 && c <= 0xd7a3) return 1;      // 한글 음절
  if (c >= 0x1100 && c <= 0x11ff) return 1;      // 한글 자모
  if (c >= 0x2e80 && c <= 0xa4cf) return 1;      // 한자·가나·부수
  if (c >= 0xf900 && c <= 0xfaff) return 1;      // 한자 호환
  if (c >= 0xff00 && c <= 0xff60) return 1;      // 전각
  if (c >= 0x1f000) return 1;                    // 이모지
  return 0.55;
}

/**
 * 제목 폰트 크기.
 *
 * Satori에는 넘친 글자를 잘라낼 수단이 마땅치 않아서, 넘치면 그대로 아이콘
 * 위로 올라탄다. 그래서 폭을 미리 재고 크기를 맞춘다 — 한 줄에 들어가면
 * 크게 뽑고, 안 되면 두 줄 기준으로 줄인다. 두 줄 계산에 1.15를 곱하는 건
 * 단어 단위 줄바꿈이라 줄 끝에 늘 빈 자리가 남기 때문이다.
 */
function titleSize(title: string): number {
  const units = [...title].reduce((s, c) => s + charUnits(c), 0) || 1;
  const oneLine = TEXT_BOX / units;
  if (oneLine >= 56) return Math.min(86, Math.floor(oneLine));
  return Math.max(42, Math.min(66, Math.floor((TEXT_BOX * 2) / (units * 1.15))));
}

/**
 * 공유 카드 — "스포트라이트".
 *
 * 배경은 거의 검게 두고 오른쪽 아이콘에만 accent 색 빛을 몰아준다. 링크
 * 미리보기는 피드에서 작게 잘려 보이는데, 요소를 여럿 늘어놓으면 그 크기에선
 * 전부 뭉개진다. 그래서 밝은 지점을 하나만 만들고 나머지는 비웠다.
 *
 * 왼쪽 글, 오른쪽 아이콘의 2단 구성이다. 예전 템플릿은 왼쪽에만 내용을
 * 몰아넣어 오른쪽 절반이 통째로 비어 있었다.
 *
 * 색은 페이지 accent 두 개(from·to)로만 만든다. 800장이 넘는 카드가 같은
 * 형태를 쓰므로 색과 아이콘이 유일한 구분 수단이다.
 *
 * Satori는 backdrop-filter·filter·CSS grid를 지원하지 않는다. 여기 쓰인
 * flex·radial-gradient·border-radius·box-shadow만으로 짜야 한다.
 */
export function ogCard({
  icon,
  eyebrow,
  title,
  desc,
  from,
  to,
}: {
  icon: string;
  eyebrow: string;
  title: string;
  desc: string;
  from: string;
  to: string;
}): ReactElement {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
        color: '#ffffff',
        background: `radial-gradient(700px 700px at 80% 50%, ${alpha(to, 0.42)}, transparent 66%), radial-gradient(900px 600px at 0% 0%, ${alpha(from, 0.3)}, transparent 60%), linear-gradient(160deg, #0f1226 0%, #06070f 60%, #0a0b16 100%)`,
      }}
    >
      {/* 오른쪽 위에서 비스듬히 떨어지는 빛 */}
      <div
        style={{
          position: 'absolute',
          display: 'flex',
          top: 0,
          right: 0,
          width: 640,
          height: 630,
          background: `linear-gradient(200deg, ${alpha(to, 0.3)} 0%, transparent 58%)`,
        }}
      />
      {/* 아이콘 뒤 후광 */}
      <div
        style={{
          position: 'absolute',
          display: 'flex',
          top: 145,
          right: 128,
          width: 340,
          height: 340,
          borderRadius: 999,
          background: `radial-gradient(circle, ${alpha(to, 0.55)}, transparent 70%)`,
        }}
      />
      {/* 아이콘 디스크 */}
      <div
        style={{
          position: 'absolute',
          display: 'flex',
          top: 170,
          right: 152,
          width: 292,
          height: 292,
          borderRadius: 999,
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 178,
          background: 'linear-gradient(150deg, rgba(255,255,255,0.14), rgba(255,255,255,0.03))',
          border: '1px solid rgba(255,255,255,0.3)',
          boxShadow: `0 30px 90px ${alpha(to, 0.5)}`,
        }}
      >
        {icon}
      </div>

      {/* ── 왼쪽: 글 ── */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: TEXT_BOX + 78,
          height: '100%',
          padding: '66px 0 62px 78px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              width: 8,
              height: 8,
              borderRadius: 999,
              marginRight: 12,
              background: to,
            }}
          />
          <div style={{ display: 'flex', fontSize: 20, fontWeight: 900, letterSpacing: '0.2em', color: alpha(to, 0.95) }}>
            {eyebrow.toUpperCase()}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center' }}>
          <div
            style={{
              display: 'flex',
              fontSize: titleSize(title),
              fontWeight: 900,
              letterSpacing: '-0.035em',
              lineHeight: 1.1,
              marginBottom: 24,
              maxWidth: TEXT_BOX,
              // 없으면 한글이 음절 단위로 잘려 "체크리스 / 트"처럼 끊긴다
              wordBreak: 'keep-all',
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 27,
              lineHeight: 1.45,
              color: 'rgba(255,255,255,0.6)',
              maxWidth: 590,
              wordBreak: 'keep-all',
            }}
          >
            {desc}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', fontSize: 24, fontWeight: 900, color: 'rgba(255,255,255,0.45)' }}>
          vixutil.com
        </div>
      </div>
    </div>
  );
}
