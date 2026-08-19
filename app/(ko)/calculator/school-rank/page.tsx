'use client';
import { useState } from 'react';
import MoneyInput from '@/components/MoneyInput';
import Link from 'next/link';
import CalcShell, { Card, CardHeader, Label, inputCls, selectCls } from '@/components/CalcShell';
import {
  SYSTEMS, averageGrade, gradeBands, rankToGrade, standing,
  type GradeSystem,
} from '@/lib/school-rank';

const one = (n: number) => n.toFixed(1);
const two = (n: number) => n.toFixed(2);

interface Row {
  key: number;
  name: string;
  units: string;
  grade: string;
}

const START: Row[] = [
  { key: 1, name: '국어', units: '4', grade: '2' },
  { key: 2, name: '수학', units: '4', grade: '3' },
  { key: 3, name: '영어', units: '4', grade: '1' },
  { key: 4, name: '한국사', units: '2', grade: '5' },
];

export default function SchoolRankPage() {
  const [system, setSystem] = useState<GradeSystem>(9);

  /* 석차 → 등급 */
  const [rank, setRank] = useState('12');
  const [total, setTotal] = useState('180');
  const [tied, setTied] = useState('1');
  const ranked = rankToGrade({
    rank: Math.floor(Number(rank)),
    total: Math.floor(Number(total)),
    tied: Math.max(1, Math.floor(Number(tied)) || 1),
    system,
  });
  const bands = gradeBands(Math.floor(Number(total)) || 0, system);

  /* 과목별 등급 → 평균 등급 */
  const [rows, setRows] = useState<Row[]>(START);
  const avg = averageGrade(
    rows.map(r => ({ name: r.name, units: Number(r.units), grade: Number(r.grade) })),
  );

  /* 원점수 → 표준점수 */
  const [raw, setRaw] = useState('');
  const [mean, setMean] = useState('');
  const [sd, setSd] = useState('');
  const score = standing({ raw: Number(raw), mean: Number(mean), sd: Number(sd), system });

  const patch = (key: number, part: Partial<Row>) =>
    setRows(rs => rs.map(r => (r.key === key ? { ...r, ...part } : r)));

  return (
    <CalcShell
      path="/calculator/school-rank"
      title="내신 등급 계산기"
      description="석차등급과 이수단위 가중평균 등급을 계산합니다"
      intro={
        <>
          <h2>내신 등급은 점수가 아니라 석차로 정해집니다</h2>
          <p>
            90점을 받아도 그 과목에서 다들 90점을 받았다면 1등급이 아니고, 60점이어도 상위 4% 안이면
            1등급입니다. 등급을 정하는 것은 <strong>석차의 누적 비율</strong>이기 때문입니다. 그래서 이
            계산기가 받는 것은 점수가 아니라 <strong>석차와 수강자수</strong>입니다. 원점수로 등급을
            어림하는 칸도 아래에 뒀지만, 그것은 점수 분포가 정규분포라고 가정한 <strong>추정</strong>일
            뿐 성적표의 석차등급이 아닙니다.
          </p>

          <h2>소인원 과목에는 1등급이 아예 없습니다</h2>
          <p>
            1등급은 상위 4%인데, 20명이 듣는 과목의 4%는 0.8명입니다. 사람을 0.8명으로 셀 수 없으니
            <strong> 1등을 해도 1등급이 나오지 않습니다</strong>. 4%가 한 명이 되려면 25명이 필요합니다.
            선택 과목이 잘게 쪼개질수록 이 문제가 커지는데, 아래 등급 컷 표에서 수강자수를 바꿔 보면
            어느 등급이 통째로 비는지 바로 보입니다. 인원이 적은 과목을 고를 때 먼저 확인할 것이 이것입니다.
          </p>

          <h2>평균 등급은 단순평균이 아니라 이수단위 가중평균입니다</h2>
          <p>
            과목마다 이수단위(학점)가 다르므로 등급을 그냥 더해 나누면 안 됩니다.
            <strong> Σ(등급 × 단위수) ÷ 단위수 합</strong>으로 셈해야 합니다. 4단위 과목의 1등급과 2단위
            과목의 1등급은 무게가 두 배 다릅니다. 아래 표에서는 가중평균과 단순평균을 나란히 보여 주니
            두 값이 얼마나 벌어지는지 확인할 수 있습니다. 단위수가 큰 과목에서 등급을 올리는 쪽이 평균을
            더 많이 끌어내립니다.
          </p>

          <h2>동석차는 묶음의 가운데로 셉니다</h2>
          <p>
            같은 등수가 여럿이면 <strong>중간석차 = 석차 + (동석차 인원 − 1) ÷ 2</strong>로 셉니다. 5등이
            세 명이면 그 세 명이 5·6·7등 자리를 차지하니 중간석차는 6이고, 세 명 모두 같은 등급을 받습니다.
            맨 앞도 맨 뒤도 아닌 가운데로 정해지기 때문에 동점자가 많은 과목에서는 등급이 실제로 갈립니다.
          </p>

          <h2>이 계산의 한계</h2>
          <p>
            여기서 나오는 것은 <strong>석차등급과 그 가중평균</strong>까지입니다. 어느 학년을 몇 퍼센트
            반영하는지, 어느 교과를 넣고 빼는지, 계열별 가중치를 어떻게 주는지는{' '}
            <strong>학교와 대학마다 다릅니다</strong> — 그 값을 지어내지 않았습니다. 대학별 환산 점수가
            필요하면 해당 대학의 모집요강에 있는 식에 이 평균 등급을 넣으세요. 반영 교과만 남기고
            평균을 보려면 표에서 과목을 지우면 됩니다. 대학 학점이 필요하다면{' '}
            <Link href="/calculator/gpa">학점 계산기</Link>가 따로 있습니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div>
            <Label>등급 체계</Label>
            <select
              value={system}
              onChange={e => setSystem(Number(e.target.value) as GradeSystem)}
              className={selectCls}
            >
              {SYSTEMS.map(s => (
                <option key={s} value={s}>{s}등급제</option>
              ))}
            </select>
          </div>
        </Card>

        {/* ── 석차 → 등급 ───────────────────────────── */}
        <Card className="p-5">
          <CardHeader title="석차로 등급 보기" />
          <div className="grid grid-cols-3 gap-x-4 gap-y-5">
            <div>
              <Label>석차</Label>
              <input type="number" min="1" value={rank} onChange={e => setRank(e.target.value)}
                className={inputCls} />
            </div>
            <div>
              <Label>수강자수</Label>
              <input type="number" min="1" value={total} onChange={e => setTotal(e.target.value)}
                className={inputCls} />
            </div>
            <div>
              <Label>동석차 인원</Label>
              <MoneyInput value={tied} onChange={setTied} />
            </div>
          </div>

          {ranked ? (
            <div className="mt-4 stat-pri">
              <p className="mb-1 text-xs text-slate-500 dark:text-slate-400">석차등급</p>
              <p className="stat-value">{ranked.grade}등급</p>
              <p className="mt-1 stat-sub">
                중간석차 {one(ranked.midRank)}등 · 상위 {two(ranked.percent)}% (컷 {ranked.cut}%)
              </p>
              {ranked.nextRank !== null && (
                <p className="mt-2 stat-sub">
                  {ranked.nextRank === 0
                    ? `이 인원에서는 ${ranked.grade - 1}등급이 나오지 않습니다`
                    : `${ranked.grade - 1}등급은 ${ranked.nextRank}등까지입니다`}
                </p>
              )}
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              석차와 수강자수를 정수로 넣어 주세요. 동석차 묶음이 수강자수를 넘을 수는 없습니다.
            </p>
          )}
        </Card>

        {/* ── 등급 컷 표 ───────────────────────────── */}
        {bands.length > 0 && Number(total) >= 1 && (
          <Card className="p-5">
            <CardHeader title="이 인원의 등급 컷" />
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-slate-500 dark:text-slate-400">
                    <th className="py-1 text-left font-medium">등급</th>
                    <th className="py-1 text-right font-medium">누적</th>
                    <th className="py-1 text-right font-medium">등수</th>
                    <th className="py-1 text-right font-medium">인원</th>
                  </tr>
                </thead>
                <tbody>
                  {bands.map(b => (
                    <tr
                      key={b.grade}
                      className={
                        ranked && b.grade === ranked.grade
                          ? 'font-bold text-blue-600 dark:text-blue-400'
                          : b.count === 0
                            ? 'text-slate-400 dark:text-slate-500'
                            : ''
                      }
                    >
                      <td className="py-1">{b.grade}등급</td>
                      <td className="py-1 text-right">{b.cut}%</td>
                      <td className="py-1 text-right">
                        {b.count === 0 ? '없음' : b.from === b.to ? `${b.from}등` : `${b.from}~${b.to}등`}
                      </td>
                      <td className="py-1 text-right">{b.count}명</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* ── 과목별 등급 → 평균 ───────────────────── */}
        <Card className="p-5">
          <CardHeader title="과목별 등급으로 평균 내기" />
          <div className="flex flex-col gap-2">
            {rows.map(r => (
              <div key={r.key} className="grid grid-cols-[1fr_5rem_5rem_2rem] items-end gap-2">
                <div>
                  <Label>과목</Label>
                  <input value={r.name} onChange={e => patch(r.key, { name: e.target.value })}
                    className={inputCls} placeholder="과목명" />
                </div>
                <div>
                  <Label>단위</Label>
                  <input type="number" min="0" value={r.units}
                    onChange={e => patch(r.key, { units: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <Label>등급</Label>
                  <input type="number" min="1" max={system} value={r.grade}
                    onChange={e => patch(r.key, { grade: e.target.value })} className={inputCls} />
                </div>
                <button
                  type="button"
                  onClick={() => setRows(rs => (rs.length > 1 ? rs.filter(x => x.key !== r.key) : rs))}
                  className="h-10 rounded-lg text-slate-400 hover:text-red-500"
                  aria-label={`${r.name || '과목'} 지우기`}
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setRows(rs => [...rs, { key: Math.max(...rs.map(x => x.key)) + 1, name: '', units: '3', grade: '3' }])
              }
              className="mt-1 rounded-lg border border-dashed border-slate-300 py-2 text-sm text-slate-500 dark:border-slate-600 dark:text-slate-400"
            >
              과목 추가
            </button>
          </div>

          {avg && (
            <>
              <div className="mt-4 rounded-lg bg-slate-900 p-5 dark:bg-slate-800">
                <p className="mb-1 text-xs text-slate-400">평균 등급 (이수단위 가중평균)</p>
                <p className="stat-value">{two(avg.average)}</p>
                <p className="mt-1 text-sm text-slate-400">
                  Σ(등급 × 단위) {avg.weightedSum} ÷ 단위 합 {avg.units}
                </p>
              </div>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                단순평균으로 내면 {two(avg.plainAverage)}입니다 —{' '}
                {Math.abs(avg.gap) < 0.005
                  ? '단위수가 모두 같아 두 값이 같습니다.'
                  : `${two(Math.abs(avg.gap))}만큼 ${avg.gap > 0 ? '낮게' : '높게'} 나와 실제보다 유리하게 보입니다.`}
              </p>
            </>
          )}
        </Card>

        {/* ── 원점수 → 표준점수 ───────────────────── */}
        <Card className="p-5">
          <CardHeader title="원점수로 위치 어림하기 (참고)" />
          <div className="grid grid-cols-3 gap-x-4 gap-y-5">
            <div>
              <Label>원점수</Label>
              <MoneyInput value={raw} onChange={setRaw} placeholder="성적표 값" />
            </div>
            <div>
              <Label>과목 평균</Label>
              <input type="number" value={mean} onChange={e => setMean(e.target.value)}
                className={inputCls} placeholder="성적표 값" />
            </div>
            <div>
              <Label>표준편차</Label>
              <input type="number" value={sd} onChange={e => setSd(e.target.value)}
                className={inputCls} placeholder="성적표 값" />
            </div>
          </div>
          {score && (
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl bg-slate-100 p-3 dark:bg-slate-800">
                <p className="text-xs text-slate-500 dark:text-slate-400">표준점수 Z</p>
                <p className="text-lg font-bold">{two(score.z)}</p>
              </div>
              <div className="rounded-xl bg-slate-100 p-3 dark:bg-slate-800">
                <p className="text-xs text-slate-500 dark:text-slate-400">상위</p>
                <p className="text-lg font-bold">{one(score.topPercent)}%</p>
              </div>
              <div className="rounded-xl bg-slate-100 p-3 dark:bg-slate-800">
                <p className="text-xs text-slate-500 dark:text-slate-400">추정 등급</p>
                <p className="text-lg font-bold">{score.estimatedGrade}등급</p>
              </div>
            </div>
          )}
          <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">
            * 점수 분포가 정규분포라고 가정한 어림입니다. 한 반의 분포는 정규분포가 아니고 동점자가 많으면
            크게 어긋나므로, 성적표에 석차가 적혀 있으면 위쪽 칸을 쓰세요.
          </p>
        </Card>
      </div>
    </CalcShell>
  );
}
