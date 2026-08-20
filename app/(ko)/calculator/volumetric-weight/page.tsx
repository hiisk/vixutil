'use client';
import { useState } from 'react';

/*
 * 첫 값은 플레이스홀더에 적혀 있던 예시다(«예: 175»). 빈 칸으로 열면 무엇을
 * 보여 주는 계산기인지 눌러 보기 전에는 모른다 — 값을 미리 넣어 두면 「계산하기」
 * 한 번에 한 벌이 통째로 보이고, 사람은 그 위에 자기 숫자를 덮어쓴다.
 * 값은 내가 지어내지 않고 저자가 이미 골라 둔 예시를 그대로 올렸다.
 */
import CalcShell, { Card, CardHeader, Label, inputCls, PrimaryBtn } from '@/components/CalcShell';
import LangPicker from '@/components/LangPicker';
import { ALL_LOCALES10 } from '@/lib/locales';
import { DIVISORS, maxVolumeFor, volumetricWeight } from '@/lib/volumetric';

const num = (n: number, d = 2) => Number(n.toFixed(d)).toLocaleString();

export default function VolumetricWeightPage() {
  const [width, setWidth] = useState('30');
  const [depth, setDepth] = useState('25');
  const [height, setHeight] = useState('20');
  const [actual, setActual] = useState('3');
  const [divisor, setDivisor] = useState('6000');
  const [result, setResult] = useState<null | (ReturnType<typeof volumetricWeight> & { limit: number })>(null);

  function calculate() {
    const box = {
      width: Number(width), depth: Number(depth),
      height: Number(height), actual: Number(actual),
    };
    if (box.width <= 0 || box.depth <= 0 || box.height <= 0 || box.actual <= 0) return;
    const d = Number(divisor);
    setResult({ ...volumetricWeight(box, d), limit: maxVolumeFor(box.actual, d) });
  }

  return (
    <CalcShell
      path="/calculator/volumetric-weight"
      title="부피무게 계산기"
      description="상자 크기로 택배·항공 운임 무게 계산"
      intro={
        <>
          <h2>운임은 무거운 쪽으로 매겨집니다</h2>
          <p>
            택배와 항공 운임은 실제 무게가 아니라 <strong>실제 무게와 부피무게 중 큰 값</strong>으로
            정해집니다. 가볍고 큰 짐이 차 안에서 더 넓은 자리를 차지하기 때문입니다. 그래서 스티로폼
            한 상자가 아령 한 개보다 비쌀 수 있습니다.
          </p>
          <h2>부피무게는 세 변을 곱해 계수로 나눕니다</h2>
          <p>
            <strong>가로 × 세로 × 높이(cm) ÷ 계수</strong>입니다. 계수는 업체가 정하는데 항공 특송은
            5000, 국내 택배는 6000을 흔히 씁니다. <strong>계수가 클수록 부피무게가 작게 나와</strong>{' '}
            보내는 쪽에 유리합니다.
          </p>
          <h2>세 변의 합도 따로 봅니다</h2>
          <p>
            부피가 같아도 길쭉한 상자는 취급이 어려워, 택배사가 <strong>세 변의 합</strong>에 따로 제한을
            겁니다. 같은 부피라도 모양에 따라 접수가 안 될 수 있으니 함께 확인하세요.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <div className="flex justify-end">
          <LangPicker current="ko" route="/calculator/volumetric-weight" available={ALL_LOCALES10} />
        </div>
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-3 gap-x-4 gap-y-5">
              <div>
                <Label>가로 (cm)</Label>
                <input type="number" value={width} onChange={e => setWidth(e.target.value)}
                  placeholder="40" className={inputCls} min="0" />
              </div>
              <div>
                <Label>세로 (cm)</Label>
                <input type="number" value={depth} onChange={e => setDepth(e.target.value)}
                  placeholder="30" className={inputCls} min="0" />
              </div>
              <div>
                <Label>높이 (cm)</Label>
                <input type="number" value={height} onChange={e => setHeight(e.target.value)}
                  placeholder="20" className={inputCls} min="0" />
              </div>
            </div>
            <div>
              <Label>실제 무게 (kg)</Label>
              <input type="number" value={actual} onChange={e => setActual(e.target.value)}
                placeholder="예: 3" className={inputCls} min="0" step="0.1" />
            </div>
            <div>
              <Label>계수</Label>
              <select value={divisor} onChange={e => setDivisor(e.target.value)} className={inputCls}>
                {DIVISORS.map(d => <option key={d.key} value={d.value}>{d.label}</option>)}
              </select>
            </div>
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className="stat-pri">
              <p className="stat-label">요금이 매겨지는 무게</p>
              <p className="stat-value">{num(result.billable)}kg</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                {result.byVolume ? '부피무게가 커서 부피로 매겨집니다' : '실제 무게로 매겨집니다'}
              </p>
            </div>
            <Card>
              <CardHeader title="내역" />
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {[
                  ['부피', `${num(result.volume, 0)}㎤`],
                  ['부피무게', `${num(result.volumetric)}kg`],
                  ['세 변의 합', `${num(result.girth, 0)}cm`],
                ].map(([k, v]) => (
                  <div key={k} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{k}</span>
                    <span className="font-semibold">{v}</span>
                  </div>
                ))}
              </div>
            </Card>
            {result.byVolume && (
              <Card className="p-4">
                <p className="text-sm font-semibold text-rose-600 dark:text-rose-400">
                  실제 무게로 부치려면 부피를 {num(result.limit, 0)}㎤ 아래로 줄여야 합니다
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  지금 부피는 {num(result.volume, 0)}㎤입니다. 빈 곳을 줄이거나 한 변을 낮추면 그만큼 내려갑니다.
                </p>
              </Card>
            )}
            <Card className="p-4">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                * 계수와 세 변 합 제한은 업체마다 다릅니다 · 접수 전에 해당 업체 기준을 확인하세요
              </p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
