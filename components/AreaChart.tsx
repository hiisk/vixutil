/**
 * 면적 그래프 — 값의 흐름을 한눈에 (2026-08-19).
 *
 * ── 왜 만들었나 ──────────────────────────────────────────────────
 * 대출 계산기는 360개월치를 이미 계산해 놓고 **표로만** 보여 준다. 표는 «13회에
 * 얼마»를 찾을 때 쓰는 물건이고, «이 대출이 어떻게 줄어드는가»는 못 보여 준다.
 * 그 모양은 숫자 360개가 아니라 선 하나로 읽힌다.
 *
 * ── 왜 라이브러리를 안 쓰나 ─────────────────────────────────────
 * 이 저장소는 의존성이 넷뿐이고(next·react·react-dom·analytics), 차트 하나
 * 그리자고 수십 KB를 싣는 것은 이 사이트의 전송량 예산에 안 맞는다. 필요한 것은
 * 폴리라인 하나와 면적 하나라 SVG로 충분하다.
 *
 * ── 서버에서 그린다 ─────────────────────────────────────────────
 * 'use client'가 없다. 값이 이미 정해져 있으므로 상호작용이 필요 없고, 서버에서
 * 그리면 자바스크립트가 한 바이트도 안 는다. 색은 --c-sec를 물어 갈래를 따라간다.
 */
type Props = {
  /** 왼쪽에서 오른쪽으로 흐르는 값. 두 개 미만이면 아무것도 안 그린다 */
  values: number[];
  /** 그래프 위에 적을 이름 */
  label?: string;
  /** 가로축 양 끝에 적을 것 (예: '1회' · '360회') */
  from?: string;
  to?: string;
  /** 세로축 꼭대기에 적을 것 — 값의 단위를 아는 쪽이 만들어 넘긴다 */
  peak?: string;
  className?: string;
};

const W = 600;
const H = 150;

export default function AreaChart({ values, label, from, to, peak, className = '' }: Props) {
  if (values.length < 2) return null;

  /*
   * 점을 다 그리지 않는다. 360개월이면 폴리라인 좌표가 360쌍이고, 그것이 낱장
   * HTML에 그대로 실린다(그리고 .rsc·.segments까지 세 벌). 눈으로는 60점이나
   * 360점이나 같은 곡선이라 60점으로 솎는다.
   */
  const step = Math.max(1, Math.ceil(values.length / 60));
  const pts = values.filter((_, i) => i % step === 0 || i === values.length - 1);

  const max = Math.max(...pts);
  const min = Math.min(...pts, 0);
  const span = max - min || 1;
  const x = (i: number) => (i / (pts.length - 1)) * W;
  const y = (v: number) => H - ((v - min) / span) * H;

  const line = pts.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const area = `0,${H} ${line} ${W},${H}`;

  return (
    <div className={className}>
      {label && <p className="chart-label">{label}</p>}
      <svg viewBox={`0 0 ${W} ${H}`} className="chart-svg" preserveAspectRatio="none" role="img" aria-label={label}>
        {/* 눈금 셋 — 값을 읽는 선이 아니라 높이를 가늠하는 실마리다 */}
        {[0.25, 0.5, 0.75].map(t => (
          <line key={t} x1="0" x2={W} y1={H * t} y2={H * t} className="chart-grid" />
        ))}
        <polygon points={area} className="chart-area" />
        <polyline points={line} className="chart-line" />
      </svg>
      {(from || to || peak) && (
        <div className="chart-foot">
          <span>{from}</span>
          {peak && <span className="chart-peak">{peak}</span>}
          <span>{to}</span>
        </div>
      )}
    </div>
  );
}
