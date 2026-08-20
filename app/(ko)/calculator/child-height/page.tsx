'use client';
import { useState } from 'react';
import CalcShell, {
  Card, CardHeader, Label, PrimaryBtn, inputCls, selectCls,
  SummaryCard, SummaryGrid,
} from '@/components/CalcShell';
import { calcChildHeight, type ChildHeightResult, type ChildSex } from '@/lib/child-height';
import LangPicker from '@/components/LangPicker';
import { ALL_LOCALES10 } from '@/lib/locales';

export default function ChildHeightPage() {
  const [father, setFather] = useState('175');
  const [mother, setMother] = useState('162');
  const [sex, setSex] = useState<ChildSex>('boy');
  const [current, setCurrent] = useState('');
  const [result, setResult] = useState<ChildHeightResult | null>(null);

  function calculate() {
    setResult(calcChildHeight(Number(father) || 0, Number(mother) || 0, sex, Number(current) || undefined));
  }

  return (
    <CalcShell
      path="/calculator/child-height"
      title="자녀 예상 키 계산기"
      description="부모 키로 중간부모키와 예상 성인 키 범위를 계산합니다"
      intro={
        <>
          <h2>소아과에서 쓰는 계산은 「중간부모키」입니다</h2>
          <p>
            부모 두 사람의 키를 평균 낸 뒤, 아들이면 <strong>6.5cm를 더하고</strong> 딸이면
            6.5cm를 뺍니다. 남녀 성인 평균 키 차이가 대략 13cm라 그 절반씩을 옮기는 것입니다.
            이 값이 예측의 한가운데가 됩니다.
          </p>
          <h2>하나의 수가 아니라 범위로 봐야 합니다</h2>
          <p>
            이 식의 오차는 큽니다. 실제 성인 키의 약 <strong>68%가 중간부모키 ±8.5cm</strong> 안에,
            95%가 ±17cm 안에 들어갑니다. 수 하나만 보면 그것이 목표처럼 읽히는데, 자녀 키는
            부모가 가장 조바심 내는 숫자라 더 그렇습니다. 그래서 두 구간을 함께 냅니다.
          </p>
          <h2>유전이 전부는 아닙니다</h2>
          <p>
            성인 키 차이에서 유전이 설명하는 몫은 <strong>약 80%</strong>이고, 나머지는 영양·수면·
            만성질환 같은 것이 가릅니다. 또 이 계산은 <strong>지금 아이의 키를 보지 않습니다</strong> —
            성장 곡선에서 또래 대비 어디쯤인지가 걱정된다면 소아청소년과의 성장도표로 봐야 합니다.
          </p>
        </>
      }
    >
      <div className="flex justify-end mb-4">
        <LangPicker current="ko" route="/calculator/child-height" available={ALL_LOCALES10} />
      </div>
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <CardHeader title="부모 키" />
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>아버지 (cm)</Label>
                <input type="number" value={father} onChange={e => setFather(e.target.value)} min="0" className={inputCls} />
              </div>
              <div>
                <Label>어머니 (cm)</Label>
                <input type="number" value={mother} onChange={e => setMother(e.target.value)} min="0" className={inputCls} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>자녀 성별</Label>
                <select value={sex} onChange={e => setSex(e.target.value as ChildSex)} className={selectCls}>
                  <option value="boy">아들</option>
                  <option value="girl">딸</option>
                </select>
              </div>
              <div>
                <Label>현재 키 (cm) — 선택</Label>
                <input type="number" value={current} onChange={e => setCurrent(e.target.value)} min="0" className={inputCls} />
              </div>
            </div>
          </div>
        </Card>

        <PrimaryBtn onClick={calculate}>예상 키 계산</PrimaryBtn>

        {result && (
          <>
            <SummaryGrid>
              <SummaryCard label="예상 성인 키 (중간부모키)" value={`${result.mid}cm`} variant="primary" />
              <SummaryCard label="열 명 중 일곱" value={`${result.likelyMin}~${result.likelyMax}cm`} />
              <SummaryCard label="스무 명 중 열아홉" value={`${result.wideMin}~${result.wideMax}cm`} />
              <SummaryCard label="부모 평균" value={`${result.parentAvg}cm`} />
              {result.current && (
                <SummaryCard
                  label="지금 키와 예상치 차이"
                  value={`${result.current.diff > 0 ? '+' : ''}${result.current.diff}cm`}
                />
              )}
            </SummaryGrid>

            <Card className="p-5">
              <CardHeader title="어떻게 나온 값인가" />
              <div className="kv-table">
                <div className="kv-row">
                  <span>부모 평균</span>
                  <span className="tabular-nums font-bold">({father} + {mother}) ÷ 2 = {result.parentAvg}cm</span>
                </div>
                <div className="kv-row">
                  <span>성별 보정</span>
                  <span className="tabular-nums font-bold">{result.sex === 'boy' ? '+' : '−'} 6.5cm</span>
                </div>
                <div className="kv-row">
                  <span>중간부모키</span>
                  <span className="tabular-nums font-bold">{result.mid}cm</span>
                </div>
              </div>
              <p className="note mt-3">
                이 계산은 지금 아이의 키·나이·성장 속도를 보지 않습니다. 또래 대비 위치가
                걱정된다면 소아청소년과의 성장도표로 확인하세요.
              </p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
