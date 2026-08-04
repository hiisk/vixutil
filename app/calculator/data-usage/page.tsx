'use client';
import { useState } from 'react';
import CalcShell, { Card, TabBar } from '@/components/CalcShell';

/**
 * 활동마다 한 시간에 쓰는 데이터(GB)만 적는다. 나머지는 곱셈과 나눗셈이다.
 *
 * 여기 적은 값은 넷플릭스·유튜브가 밝힌 어림과 널리 쓰이는 값이다. 실제
 * 소모량은 화면 크기·코덱·영상 내용(움직임이 많을수록 커진다)에 따라 달라진다.
 */
const ACTIVITIES = [
  { id: 'video480', label: '영상 480p', gbPerHour: 0.7, emoji: '📺' },
  { id: 'video720', label: '영상 720p', gbPerHour: 1.5, emoji: '📺' },
  { id: 'video1080', label: '영상 1080p', gbPerHour: 3, emoji: '🎬' },
  { id: 'video4k', label: '영상 4K', gbPerHour: 7, emoji: '🎬' },
  { id: 'music', label: '음악 스트리밍', gbPerHour: 0.15, emoji: '🎵' },
  { id: 'call', label: '영상통화', gbPerHour: 0.5, emoji: '📞' },
  { id: 'web', label: '웹서핑·SNS', gbPerHour: 0.15, emoji: '🌐' },
  { id: 'game', label: '모바일 게임', gbPerHour: 0.06, emoji: '🎮' },
] as const;

const fmtHours = (h: number) => {
  if (h >= 100) return `${Math.round(h)}시간`;
  const whole = Math.floor(h);
  const mins = Math.round((h - whole) * 60);
  return mins === 0 ? `${whole}시간` : `${whole}시간 ${mins}분`;
};

export default function DataUsagePage() {
  const [mode, setMode] = useState<'howlong' | 'howmuch'>('howlong');
  const [act, setAct] = useState<(typeof ACTIVITIES)[number]['id']>('video1080');
  const [gb, setGb] = useState('');
  const [hours, setHours] = useState('');

  const a = ACTIVITIES.find(x => x.id === act)!;
  const g = Number(gb);
  const h = Number(hours);

  const canHours = mode === 'howlong' && g > 0;
  const canGb = mode === 'howmuch' && h > 0;

  return (
    <CalcShell
      path="/calculator/data-usage"
      title="데이터 사용량 계산기"
      description="남은 데이터로 얼마나 볼 수 있는지, 얼마나 필요한지 계산합니다"
      intro={
        <>
          <h2>데이터를 가장 많이 먹는 것은 영상입니다</h2>
          <p>
            1080p 영상은 한 시간에 <strong>3GB쯤</strong> 씁니다. 같은 시간 음악 스트리밍은 0.15GB,
            웹서핑도 비슷합니다. 스무 배 차이입니다. 데이터가 모자란다면 손댈 곳은 거의 언제나
            영상 화질입니다.
          </p>
          <h2>화질 한 단계가 절반입니다</h2>
          <p>
            1080p에서 720p로 한 단계만 내려도 소모량이 절반으로 줄어듭니다. 휴대전화 화면에서는
            둘의 차이를 알아보기 어려우므로, 밖에서는 720p로 두는 것이 데이터를 아끼는 가장 쉬운
            방법입니다. 4K는 한 시간에 7GB로, 휴대전화에서는 화면이 작아 의미가 거의 없습니다.
          </p>
          <h2>어림값입니다</h2>
          <p>
            같은 1080p라도 움직임이 많은 화면은 데이터를 더 씁니다. 최신 코덱(AV1, HEVC)을 쓰는
            앱은 같은 화질에서 30~50% 적게 쓰기도 합니다. 실제 사용량은 휴대전화 설정의 데이터
            사용량 화면에서 확인하세요.
          </p>
          <h2>자동 재생과 미리 불러오기</h2>
          <p>
            SNS 앱의 자동 재생은 보지 않은 영상까지 내려받습니다. 데이터를 아끼려면 앱 설정에서
            자동 재생을 &lsquo;Wi-Fi에서만&rsquo;으로 바꾸는 것이 화질을 낮추는 것보다 효과가 큽니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <TabBar
          options={[
            { value: 'howlong', label: '남은 데이터로 얼마나' },
            { value: 'howmuch', label: '이만큼 쓰면 얼마' },
          ]}
          value={mode}
          onChange={v => setMode(v as 'howlong' | 'howmuch')}
        />

        <div className="grid grid-cols-4 gap-2">
          {ACTIVITIES.map(x => (
            <button
              key={x.id}
              onClick={() => setAct(x.id)}
              className={`rounded-xl border px-1 py-3 text-center transition-colors ${
                act === x.id
                  ? 'border-violet-400 bg-violet-50 dark:bg-violet-950/30'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span className="block text-lg">{x.emoji}</span>
              <span className={`block text-[11px] font-bold mt-0.5 ${act === x.id ? 'text-violet-700 dark:text-violet-300' : 'text-slate-700 dark:text-slate-200'}`}>
                {x.label}
              </span>
            </button>
          ))}
        </div>

        <Card className="p-5">
          <div className="relative">
            {mode === 'howlong' ? (
              <input
                key="gb"
                type="number"
                value={gb}
                onChange={e => setGb(e.target.value)}
                placeholder="남은 데이터 GB"
                min={0}
                step={0.5}
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-4 text-2xl font-bold text-slate-900 dark:text-slate-100 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500 pr-16"
              />
            ) : (
              <input
                key="hours"
                type="number"
                value={hours}
                onChange={e => setHours(e.target.value)}
                placeholder="사용 시간"
                min={0}
                step={0.5}
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-4 text-2xl font-bold text-slate-900 dark:text-slate-100 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500 pr-16"
              />
            )}
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-bold">
              {mode === 'howlong' ? 'GB' : '시간'}
            </span>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
            {a.label}은 한 시간에 약 {a.gbPerHour}GB를 씁니다
          </p>
        </Card>

        {(canHours || canGb) && (
          <>
            <div className="bg-violet-600 rounded-2xl p-6 text-center">
              <p className="text-violet-200 text-sm mb-2">{mode === 'howlong' ? `${a.label} 가능 시간` : `${a.label} ${h}시간이면`}</p>
              <p className="text-white text-5xl font-black">
                {mode === 'howlong' ? fmtHours(g / a.gbPerHour) : (h * a.gbPerHour).toFixed(1)}
              </p>
              {mode === 'howmuch' && <p className="text-violet-200 text-xl mt-1">GB</p>}
              {mode === 'howlong' && (
                <p className="text-violet-100 text-sm mt-3 opacity-90">
                  하루 {fmtHours(g / a.gbPerHour / 30)}씩 쓰면 한 달을 씁니다
                </p>
              )}
            </div>

            <Card>
              <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  {mode === 'howlong' ? `${gb}GB로 할 수 있는 것` : `${hours}시간 쓰면`}
                </p>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {ACTIVITIES.map(x => (
                  <div key={x.id} className={`px-5 py-3 flex justify-between items-center text-sm ${x.id === act ? 'bg-violet-50 dark:bg-violet-950/30' : ''}`}>
                    <span className={`font-semibold ${x.id === act ? 'text-violet-700 dark:text-violet-300' : 'text-slate-700 dark:text-slate-200'}`}>
                      {x.emoji} {x.label}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">
                      {mode === 'howlong' ? fmtHours(g / x.gbPerHour) : `${(h * x.gbPerHour).toFixed(1)}GB`}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
