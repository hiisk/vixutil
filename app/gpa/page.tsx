'use client';
import { useState } from 'react';
import CalcShell, {
  Card, Label, inputCls, selectCls, PrimaryBtn,
  SummaryGrid, SummaryCard, TableWrap,
} from '@/components/CalcShell';

type GradeSystem = '4.5' | '4.3' | 'pf';

// 4.5 제 성적 테이블
const GRADES_45 = [
  { label: 'A+', point: 4.5 },
  { label: 'A0', point: 4.0 },
  { label: 'B+', point: 3.5 },
  { label: 'B0', point: 3.0 },
  { label: 'C+', point: 2.5 },
  { label: 'C0', point: 2.0 },
  { label: 'D+', point: 1.5 },
  { label: 'D0', point: 1.0 },
  { label: 'F',  point: 0.0 },
];

// 4.3 제 성적 테이블
const GRADES_43 = [
  { label: 'A+', point: 4.3 },
  { label: 'A0', point: 4.0 },
  { label: 'B+', point: 3.3 },
  { label: 'B0', point: 3.0 },
  { label: 'C+', point: 2.3 },
  { label: 'C0', point: 2.0 },
  { label: 'D+', point: 1.3 },
  { label: 'D0', point: 1.0 },
  { label: 'F',  point: 0.0 },
];

// Pass/Fail 성적 (GPA 계산 시 P는 포함 안 함)
const GRADES_PF = [
  { label: 'P (Pass)', point: null },
  { label: 'F (Fail)',  point: 0.0 },
];

interface Course {
  id: number;
  name: string;
  credits: string;
  grade: string;
  isPf: boolean; // Pass/Fail 과목 여부
}

let nextId = 1;

function getGradeList(system: GradeSystem) {
  if (system === '4.5') return GRADES_45;
  if (system === '4.3') return GRADES_43;
  return GRADES_PF;
}

function getPoint(system: GradeSystem, gradeLabel: string): number | null {
  const list = getGradeList(system);
  const found = list.find(g => g.label === gradeLabel);
  return found?.point ?? null;
}

function defaultGrade(system: GradeSystem) {
  return system === 'pf' ? 'P (Pass)' : 'A+';
}

export default function GpaPage() {
  const [system, setSystem] = useState<GradeSystem>('4.5');
  const [courses, setCourses] = useState<Course[]>([
    { id: nextId++, name: '', credits: '3', grade: 'A+', isPf: false },
  ]);
  const [result, setResult] = useState<{
    gpa: number;
    totalCredits: number;
    earnedCredits: number;
    courseCount: number;
  } | null>(null);

  function addCourse() {
    setCourses(prev => [...prev, {
      id: nextId++, name: '', credits: '3',
      grade: defaultGrade(system), isPf: system === 'pf',
    }]);
  }

  function removeCourse(id: number) {
    setCourses(prev => prev.filter(c => c.id !== id));
  }

  function updateCourse(id: number, field: keyof Course, value: string | boolean) {
    setCourses(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c));
  }

  function changeSystem(s: GradeSystem) {
    setSystem(s);
    setResult(null);
    setCourses(prev => prev.map(c => ({
      ...c,
      grade: defaultGrade(s),
      isPf: s === 'pf',
    })));
  }

  function calculate() {
    let totalPoints = 0;
    let totalCredits = 0;
    let earnedCredits = 0;

    for (const c of courses) {
      const cr = Number(c.credits);
      if (!cr || cr < 1) continue;
      totalCredits += cr;

      if (c.isPf) {
        // Pass/Fail 과목: Pass는 학점 취득하지만 GPA 계산 제외
        if (c.grade === 'P (Pass)') earnedCredits += cr;
        continue;
      }

      const point = getPoint(system, c.grade);
      if (point === null) continue;

      if (point > 0) earnedCredits += cr;
      totalPoints += point * cr;
    }

    const gpaCredits = courses
      .filter(c => !c.isPf)
      .reduce((s, c) => s + (Number(c.credits) || 0), 0);

    setResult({
      gpa: gpaCredits > 0 ? totalPoints / gpaCredits : 0,
      totalCredits,
      earnedCredits,
      courseCount: courses.length,
    });
  }

  const gradeList = getGradeList(system);
  const maxGpa = system === '4.5' ? 4.5 : system === '4.3' ? 4.3 : 4.0;

  return (
    <CalcShell wide title="학점 GPA 계산기" description="과목별 학점과 성적을 입력하면 4.5제·4.3제 GPA를 계산합니다">
      <div className="flex flex-col gap-4">

        {/* 성적 체계 선택 */}
        <Card className="p-5">
          <Label>성적 체계</Label>
          <div className="grid grid-cols-3 gap-2">
            {([
              { value: '4.5', label: '4.5제', sub: 'A+(4.5)~F' },
              { value: '4.3', label: '4.3제', sub: 'A+(4.3)~F' },
              { value: 'pf', label: 'Pass/Fail', sub: 'P / F' },
            ] as const).map(opt => (
              <button key={opt.value} type="button" onClick={() => changeSystem(opt.value)}
                className={`py-3 text-sm font-semibold rounded-xl border transition-colors leading-tight ${
                  system === opt.value ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-200 text-slate-500 hover:border-blue-300'
                }`}>
                {opt.label}
                <span className={`block text-xs font-normal ${system === opt.value ? 'text-blue-200' : 'text-slate-400'}`}>
                  {opt.sub}
                </span>
              </button>
            ))}
          </div>
        </Card>

        {/* 과목 목록 */}
        <Card className="p-5">
          <div className="flex justify-between items-center mb-3">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">과목 목록</p>
            <button type="button" onClick={addCourse}
              className="text-xs font-semibold text-blue-600 border border-blue-200 rounded-lg px-3 py-1.5 hover:bg-blue-50 transition-colors">
              + 과목 추가
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {courses.map((course, idx) => (
              <div key={course.id} className="bg-slate-50 rounded-xl p-3">
                <div className="grid grid-cols-12 gap-2 items-end">
                  {/* 과목명 */}
                  <div className="col-span-5">
                    {idx === 0 && <Label>과목명</Label>}
                    <input type="text" value={course.name}
                      onChange={e => updateCourse(course.id, 'name', e.target.value)}
                      placeholder={`과목 ${idx + 1}`}
                      className={inputCls} />
                  </div>

                  {/* 학점 */}
                  <div className="col-span-2">
                    {idx === 0 && <Label>학점</Label>}
                    <select value={course.credits}
                      onChange={e => updateCourse(course.id, 'credits', e.target.value)}
                      className={selectCls}>
                      {[1,2,3,4].map(n => (
                        <option key={n} value={n}>{n}학점</option>
                      ))}
                    </select>
                  </div>

                  {/* P/F 여부 (4.5, 4.3제에서만 표시) */}
                  {system !== 'pf' && (
                    <div className="col-span-2 flex flex-col">
                      {idx === 0 && <Label>P/F</Label>}
                      <button type="button"
                        onClick={() => updateCourse(course.id, 'isPf', !course.isPf)}
                        className={`py-3 text-xs font-semibold rounded-xl border transition-colors ${
                          course.isPf ? 'bg-slate-200 border-slate-300 text-slate-700' : 'border-slate-200 text-slate-400 hover:border-slate-300'
                        }`}>
                        {course.isPf ? 'P/F' : '-'}
                      </button>
                    </div>
                  )}

                  {/* 성적 */}
                  <div className={system !== 'pf' ? 'col-span-2' : 'col-span-4'}>
                    {idx === 0 && <Label>성적</Label>}
                    {course.isPf ? (
                      <select value={course.grade}
                        onChange={e => updateCourse(course.id, 'grade', e.target.value)}
                        className={selectCls}>
                        <option value="P (Pass)">P</option>
                        <option value="F (Fail)">F</option>
                      </select>
                    ) : (
                      <select value={course.grade}
                        onChange={e => updateCourse(course.id, 'grade', e.target.value)}
                        className={selectCls}>
                        {gradeList.map(g => (
                          <option key={g.label} value={g.label}>{g.label}</option>
                        ))}
                      </select>
                    )}
                  </div>

                  {/* 삭제 */}
                  <div className="col-span-1 flex flex-col">
                    {idx === 0 && <div className="h-5 mb-1.5" />}
                    <button type="button" onClick={() => removeCourse(course.id)}
                      className="py-3 text-xs text-red-400 border border-red-200 rounded-xl hover:bg-red-50 transition-colors">
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <PrimaryBtn onClick={calculate}>GPA 계산하기</PrimaryBtn>
          </div>
        </Card>

        {/* 결과 */}
        {result && (
          <>
            <SummaryGrid>
              <SummaryCard
                label={`GPA (${system}제)`}
                value={result.gpa.toFixed(2)}
                sub={`만점 ${maxGpa}`}
                variant="primary"
              />
              <SummaryCard
                label="총 이수학점"
                value={`${result.totalCredits}학점`}
              />
              <SummaryCard
                label="취득학점"
                value={`${result.earnedCredits}학점`}
                sub="F 제외"
                variant="green"
              />
              <SummaryCard
                label="이수 과목 수"
                value={`${result.courseCount}과목`}
              />
            </SummaryGrid>

            {/* GPA 바 */}
            <Card className="p-5">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">GPA 현황</p>
              <div className="mb-2">
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>0.0</span>
                  <span className="font-bold text-blue-600">{result.gpa.toFixed(2)}</span>
                  <span>{maxGpa}</span>
                </div>
                <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full transition-all"
                    style={{ width: `${(result.gpa / maxGpa) * 100}%` }} />
                </div>
                <p className="text-xs text-slate-400 mt-1 text-center">
                  {((result.gpa / maxGpa) * 100).toFixed(1)}% (만점 대비)
                </p>
              </div>
            </Card>

            {/* 과목 상세 테이블 */}
            <Card>
              <div className="px-5 py-4 border-b border-slate-100">
                <p className="font-bold text-slate-800 text-sm">과목별 상세</p>
              </div>
              <TableWrap>
                <table className="calc-table">
                  <thead>
                    <tr>
                      <th>과목명</th>
                      <th>학점</th>
                      <th>성적</th>
                      <th>평점</th>
                      <th>기여도</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((c, i) => {
                      const cr = Number(c.credits) || 0;
                      const point = c.isPf ? null : getPoint(system, c.grade);
                      const contrib = point !== null ? point * cr : null;
                      return (
                        <tr key={c.id}>
                          <td className="font-medium text-slate-700">{c.name || `과목 ${i + 1}`}</td>
                          <td>{cr}학점</td>
                          <td>
                            <span className={`font-bold ${
                              c.grade.startsWith('A') ? 'text-emerald-700' :
                              c.grade.startsWith('B') ? 'text-blue-700' :
                              c.grade.startsWith('C') ? 'text-amber-600' :
                              c.grade === 'P (Pass)' ? 'text-teal-600' :
                              'text-red-500'
                            }`}>
                              {c.grade}
                            </span>
                          </td>
                          <td>{c.isPf ? <span className="text-slate-400 text-xs">GPA 제외</span> : point?.toFixed(1)}</td>
                          <td className="font-semibold text-slate-700">
                            {contrib !== null ? `${contrib.toFixed(1)}점` : '-'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </TableWrap>
            </Card>

            {/* 성적 기준표 */}
            {system !== 'pf' && (
              <Card className="p-5">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">
                  {system}제 성적 기준표
                </p>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                  {gradeList.map(g => (
                    <div key={g.label} className="bg-slate-50 rounded-xl p-2.5 text-center border border-slate-100">
                      <p className="text-sm font-black text-slate-800">{g.label}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{g.point?.toFixed(1)}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </>
        )}
      </div>
    </CalcShell>
  );
}
