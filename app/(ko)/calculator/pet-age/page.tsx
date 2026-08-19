'use client';
import { useState } from 'react';
import CalcShell, { Card, TabBar } from '@/components/CalcShell';
import LangPicker from '@/components/LangPicker';
import { ALL_LOCALES10 } from '@/lib/locales';

/**
 * 널리 쓰이는 환산 방식 — 첫해에 15살, 둘째 해에 9살을 더하고 그 뒤부터
 * 해마다 일정한 값을 더한다. 개는 덩치가 클수록 빨리 늙어 더하는 값이 다르고,
 * 고양이는 덩치 차이가 작아 한 가지만 쓴다.
 *
 * "사람 나이 × 7"은 널리 퍼졌지만 맞지 않는다. 그 셈으로는 한 살 강아지가
 * 일곱 살이 되는데, 실제로는 이미 사춘기를 지난 상태다.
 */
const DOG_SIZES = [
  { id: 'small', label: '소형견', hint: '~10kg', perYear: 4 },
  { id: 'medium', label: '중형견', hint: '10~25kg', perYear: 5 },
  { id: 'large', label: '대형견', hint: '25kg~', perYear: 6 },
] as const;

const CAT_PER_YEAR = 4;

function humanAge(age: number, perYear: number): number {
  if (age <= 0) return 0;
  if (age <= 1) return 15 * age;
  if (age <= 2) return 15 + 9 * (age - 1);
  return 24 + perYear * (age - 2);
}

const STAGES = [
  { max: 6, label: '어린 시절', desc: '활동량이 많고 사회화가 자리 잡는 때입니다.' },
  { max: 24, label: '청년기', desc: '몸이 가장 좋을 때입니다. 체중 관리를 시작하기 좋습니다.' },
  { max: 45, label: '중년기', desc: '치아와 체중을 살펴야 하는 시기입니다.' },
  { max: 60, label: '노년 초입', desc: '해마다 건강검진을 권하는 시기입니다.' },
  { max: Infinity, label: '노령', desc: '관절과 신장을 눈여겨보고 검진 주기를 좁히세요.' },
];

export default function PetAgePage() {
  const [kind, setKind] = useState<'dog' | 'cat'>('dog');
  const [size, setSize] = useState<(typeof DOG_SIZES)[number]['id']>('small');
  const [age, setAge] = useState('');

  const n = Number(age);
  const perYear = kind === 'cat' ? CAT_PER_YEAR : DOG_SIZES.find(s => s.id === size)!.perYear;
  const result = n > 0 && n <= 30 ? humanAge(n, perYear) : null;
  const stage = result ? STAGES.find(s => result < s.max)! : null;

  return (
    <CalcShell
      path="/calculator/pet-age"
      title="반려동물 나이 계산기"
      description="개·고양이의 나이를 사람 나이로 환산합니다"
      intro={
        <>
          <h2>7을 곱하는 셈은 맞지 않습니다</h2>
          <p>
            나이에 7을 곱하는 방법이 널리 퍼져 있지만 실제와 어긋납니다. 그 셈으로는 한 살 강아지가
            일곱 살이 되는데, 한 살이면 이미 사춘기를 지나 몸이 거의 다 자란 상태입니다. 반대로
            노년에는 7을 곱하는 것보다 천천히 늙습니다.
          </p>
          <h2>첫 두 해가 가장 빠릅니다</h2>
          <p>
            이 계산기는 널리 쓰이는 방식을 따릅니다. <strong>첫해에 15살</strong>, <strong>둘째 해에 9살</strong>을
            더하고, 그 뒤부터 해마다 일정한 값을 더합니다. 두 살이면 이미 사람으로 스물넷쯤입니다.
          </p>
          <h2>개는 덩치가 클수록 빨리 늙습니다</h2>
          <p>
            셋째 해부터 더하는 값이 소형견은 4, 중형견은 5, 대형견은 6입니다. 같은 열 살이어도
            소형견은 사람으로 쉰여섯, 대형견은 일흔둘쯤 됩니다. 고양이는 덩치 차이가 작아 한 가지
            값(4)만 씁니다.
          </p>
          <h2>어림값입니다</h2>
          <p>
            품종과 개체에 따라 차이가 큽니다. 건강 상태를 판단하는 기준으로 쓰지 말고, 검진 주기를
            정할 때 참고하는 정도로 보세요.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <div className="flex justify-end">
          <LangPicker current="ko" route="/calculator/pet-age" available={ALL_LOCALES10} />
        </div>
        <TabBar
          options={[
            { value: 'dog', label: '🐕 강아지' },
            { value: 'cat', label: '🐈 고양이' },
          ]}
          value={kind}
          onChange={v => setKind(v as 'dog' | 'cat')}
        />

        {kind === 'dog' && (
          <div className="grid grid-cols-3 gap-2">
            {DOG_SIZES.map(s => (
              <button
                key={s.id}
                onClick={() => setSize(s.id)}
                className={`rounded-xl border px-3 py-3 text-center transition-colors ${
                  size === s.id
                    ? 'border-blue-400 bg-blue-50 dark:bg-blue-950/30'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <span className={`block text-sm font-bold ${size === s.id ? 'text-blue-700 dark:text-blue-300' : 'text-slate-700 dark:text-slate-200'}`}>
                  {s.label}
                </span>
                <span className="block text-xs text-slate-400 dark:text-slate-500 mt-0.5">{s.hint}</span>
              </button>
            ))}
          </div>
        )}

        <Card className="p-5">
          <div className="relative">
            <input
              type="number"
              value={age}
              onChange={e => setAge(e.target.value)}
              placeholder="나이 입력"
              min={0}
              step={0.5}
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-4 text-2xl font-bold text-slate-900 dark:text-slate-100 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-14"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-bold">살</span>
          </div>
        </Card>

        {result !== null && (
          <>
            <div className="stat-pri text-center">
              <p className="stat-sub mb-2">사람 나이로</p>
              <p className="text-slate-900 dark:text-slate-50 text-5xl font-black">{Math.round(result)}</p>
              <p className="text-slate-500 dark:text-slate-400 text-xl mt-1">살</p>
              {stage && <p className="stat-sub mt-3 font-semibold">{stage.label}</p>}
            </div>

            {stage && (
              <Card className="p-5">
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{stage.desc}</p>
              </Card>
            )}

            <Card>
              <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-800">
                <p className="label-caps">나이별 환산표</p>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {[1, 2, 3, 5, 7, 10, 13, 15].map(y => (
                  <button
                    key={y}
                    onClick={() => setAge(String(y))}
                    className={`w-full px-5 py-3 flex justify-between items-center text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                      n === y ? 'bg-blue-50 dark:bg-blue-950/30' : ''
                    }`}
                  >
                    <span className={`font-semibold ${n === y ? 'text-blue-700 dark:text-blue-300' : 'text-slate-700 dark:text-slate-200'}`}>{y}살</span>
                    <span className="text-slate-400 dark:text-slate-500">사람 나이 {Math.round(humanAge(y, perYear))}살</span>
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
