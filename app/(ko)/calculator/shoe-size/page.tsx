'use client';
import { useState } from 'react';
import CalcShell, { Card } from '@/components/CalcShell';
import LangPicker from '@/components/LangPicker';
import { ALL_LOCALES10 } from '@/lib/locales';

/**
 * 발 길이(mm)와 EU·US(남성)만 적고 나머지는 관계식으로 뺀다.
 *   UK = US(남성) - 1,  US(여성) = US(남성) + 1.5
 *
 * 발 길이는 나라마다 같지만 치수 이름은 브랜드마다 다르다. 여기 적은 값은
 * 국내에서 널리 쓰는 대조표를 따른 것이고, 브랜드에 따라 반 치수까지 어긋난다.
 */
const CHART = [
  { mm: 220, eu: 35, usM: 3.5 },
  { mm: 225, eu: 35.5, usM: 4 },
  { mm: 230, eu: 36, usM: 4.5 },
  { mm: 235, eu: 37, usM: 5 },
  { mm: 240, eu: 38, usM: 6 },
  { mm: 245, eu: 38.5, usM: 6.5 },
  { mm: 250, eu: 39.5, usM: 7 },
  { mm: 255, eu: 40, usM: 7.5 },
  { mm: 260, eu: 41, usM: 8 },
  { mm: 265, eu: 42, usM: 8.5 },
  { mm: 270, eu: 43, usM: 9 },
  { mm: 275, eu: 43.5, usM: 9.5 },
  { mm: 280, eu: 44, usM: 10 },
  { mm: 285, eu: 45, usM: 10.5 },
  { mm: 290, eu: 45.5, usM: 11 },
  { mm: 295, eu: 46, usM: 11.5 },
  { mm: 300, eu: 47, usM: 12.5 },
];

const nearest = (mm: number) =>
  CHART.reduce((best, row) => (Math.abs(row.mm - mm) < Math.abs(best.mm - mm) ? row : best));

export default function ShoeSizePage() {
  const [foot, setFoot] = useState('');

  const n = Number(foot);
  const valid = n >= 200 && n <= 320;
  const row = valid ? nearest(n) : null;
  /** 신발은 발보다 5~10mm 길게 신는다 — 걸을 때 발이 앞으로 밀린다 */
  const recommend = valid ? nearest(n + 7) : null;

  return (
    <CalcShell
      path="/calculator/shoe-size"
      title="신발 사이즈 변환기"
      description="발 길이(mm)를 EU·UK·US 치수로 변환합니다"
      intro={
        <>
          <h2>한국 치수는 발 길이 그대로입니다</h2>
          <p>
            국내에서 쓰는 250, 260 같은 숫자는 <strong>발 길이를 밀리미터로 적은 것</strong>입니다.
            반면 EU·UK·US 치수는 신발 골(라스트)의 길이를 각자의 눈금으로 센 값이라 서로 환산해야
            합니다. 그래서 기준이 되는 것은 언제나 발 길이입니다.
          </p>
          <h2>발 길이 재는 법</h2>
          <p>
            종이를 벽에 대고 뒤꿈치를 붙인 뒤 <strong>서서</strong> 가장 긴 발가락 끝을 표시하고
            잽니다. 앉아서 재면 짧게 나옵니다. 저녁에는 발이 부어 아침보다 몇 밀리미터 큽니다.
            양발 길이가 다른 사람이 많으니 둘 다 재서 <strong>긴 쪽</strong>에 맞추세요.
          </p>
          <h2>발 길이보다 5~10mm 크게</h2>
          <p>
            걸을 때 발이 앞으로 밀리므로 신발은 발보다 조금 길어야 합니다. 운동화는 발 길이에
            5~10mm, 달리기용은 10mm쯤 더합니다. 구두는 여유를 적게 두는 편입니다. 이 계산기는
            발 길이 그대로의 치수와 여유를 더한 치수를 함께 보여 줍니다.
          </p>
          <h2>브랜드마다 다릅니다</h2>
          <p>
            같은 260mm 표기라도 브랜드에 따라 반 치수까지 차이가 납니다. 발볼(넓이)은 아예
            표기하지 않는 브랜드도 많습니다. 이 표는 출발점이고, 가능하면 신어 보고 사세요.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <div className="flex justify-end">
          <LangPicker current="ko" route="/calculator/shoe-size" available={ALL_LOCALES10} />
        </div>
        <Card className="p-5">
          <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">발 길이</label>
          <div className="relative">
            <input
              type="number"
              value={foot}
              onChange={e => setFoot(e.target.value)}
              placeholder="예: 255"
              min={200}
              max={320}
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-4 text-2xl font-bold text-slate-900 dark:text-slate-100 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-16"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 font-bold">mm</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">신발 치수가 아니라 맨발 길이를 넣으세요</p>
        </Card>

        {row && recommend && (
          <>
            <div className="stat-pri">
              <p className="text-slate-500 dark:text-slate-400 text-xs text-center mb-4">발 길이 {n}mm 기준</p>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-center">
                <div>
                  <p className="stat-label">한국(mm)</p>
                  <p className="stat-value">{row.mm}</p>
                </div>
                <div>
                  <p className="stat-label">EU</p>
                  <p className="stat-value">{row.eu}</p>
                </div>
                <div>
                  <p className="stat-label">UK</p>
                  <p className="stat-value">{row.usM - 1}</p>
                </div>
                <div>
                  <p className="stat-label">US 남성</p>
                  <p className="stat-value">{row.usM}</p>
                </div>
              </div>
              <p className="stat-sub text-center mt-4">US 여성 {row.usM + 1.5}</p>
            </div>

            <Card className="p-5 border-emerald-200 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-950/30">
              <p className="text-sm text-emerald-800 dark:text-emerald-200 leading-relaxed">
                운동화라면 여유를 두어 <strong>{recommend.mm}mm(EU {recommend.eu} · US 남성 {recommend.usM})</strong>{' '}
                쪽이 편합니다. 발이 앞으로 밀릴 자리를 5~10mm 남기는 계산입니다.
              </p>
            </Card>

            <Card>
              <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-800 grid grid-cols-5 text-xs font-medium text-slate-500 dark:text-slate-400">
                <span>mm</span>
                <span className="text-right">EU</span>
                <span className="text-right">UK</span>
                <span className="text-right">US 남</span>
                <span className="text-right">US 여</span>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-96 overflow-y-auto">
                {CHART.map(r => (
                  <button
                    key={r.mm}
                    onClick={() => setFoot(String(r.mm))}
                    className={`w-full px-5 py-2.5 grid grid-cols-5 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                      r.mm === row.mm ? 'bg-blue-50 dark:bg-blue-950/30' : ''
                    }`}
                  >
                    <span className={`font-semibold text-left ${r.mm === row.mm ? 'text-blue-700 dark:text-blue-300' : 'text-slate-700 dark:text-slate-200'}`}>
                      {r.mm}
                    </span>
                    <span className="text-right text-slate-500 dark:text-slate-400">{r.eu}</span>
                    <span className="text-right text-slate-500 dark:text-slate-400">{r.usM - 1}</span>
                    <span className="text-right text-slate-500 dark:text-slate-400">{r.usM}</span>
                    <span className="text-right text-slate-500 dark:text-slate-400">{r.usM + 1.5}</span>
                  </button>
                ))}
              </div>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
