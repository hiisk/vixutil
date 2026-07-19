'use client';
import { useState } from 'react';
import CalcShell, {
  Card, Label, inputCls, selectCls, PrimaryBtn,
  SummaryGrid, SummaryCard, TableWrap,
} from '@/components/CalcShell';

type GradeSystem = '4.5' | '4.3';

const GRADES_45 = [
  { label: 'A+', point: 4.5 }, { label: 'A0', point: 4.0 },
  { label: 'B+', point: 3.5 }, { label: 'B0', point: 3.0 },
  { label: 'C+', point: 2.5 }, { label: 'C0', point: 2.0 },
  { label: 'D+', point: 1.5 }, { label: 'D0', point: 1.0 },
  { label: 'F',  point: 0.0 },
];

const GRADES_43 = [
  { label: 'A+', point: 4.3 }, { label: 'A0', point: 4.0 },
  { label: 'B+', point: 3.3 }, { label: 'B0', point: 3.0 },
  { label: 'C+', point: 2.3 }, { label: 'C0', point: 2.0 },
  { label: 'D+', point: 1.3 }, { label: 'D0', point: 1.0 },
  { label: 'F',  point: 0.0 },
];

interface Course {
  id: number;
  name: string;
  credits: string;
  grade: string;
  isPf: boolean;
  pfGrade: 'P' | 'F';
}

let nextId = 10;

const INITIAL_COURSES: Course[] = [
  { id: 1, name: '자료구조',   credits: '3', grade: 'A+', isPf: false, pfGrade: 'P' },
  { id: 2, name: '운영체제',   credits: '3', grade: 'B+', isPf: false, pfGrade: 'P' },
  { id: 3, name: '영어회화',   credits: '2', grade: 'A0', isPf: false, pfGrade: 'P' },
  { id: 4, name: '체육 (P/F)', credits: '1', grade: 'A0', isPf: true,  pfGrade: 'P' },
  { id: 5, name: '알고리즘',   credits: '3', grade: 'B0', isPf: false, pfGrade: 'P' },
];

function getGrades(system: GradeSystem) {
  return system === '4.5' ? GRADES_45 : GRADES_43;
}

function getPoint(system: GradeSystem, gradeLabel: string): number {
  return getGrades(system).find(g => g.label === gradeLabel)?.point ?? 0;
}

function calcResult(courses: Course[], system: GradeSystem) {
  let totalPoints = 0;
  let gpaCredits = 0;
  let totalCredits = 0;
  let earnedCredits = 0;

  for (const c of courses) {
    const cr = Number(c.credits);
    if (!cr) continue;
    totalCredits += cr;

    if (c.isPf) {
      // P/F 과목: 학점은 취득(P인 경우)하지만 GPA 산정에서는 제외
      if (c.pfGrade === 'P') earnedCredits += cr;
      continue;
    }

    const point = getPoint(system, c.grade);
    gpaCredits += cr;
    if (point > 0) earnedCredits += cr;
    totalPoints += point * cr;
  }

  return {
    gpa: gpaCredits > 0 ? totalPoints / gpaCredits : 0,
    totalCredits,
    earnedCredits,
    gpaCredits,
    courseCount: courses.length,
  };
}

export default function GpaPage() {
  const [system, setSystem] = useState<GradeSystem>('4.5');
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [result, setResult] = useState<ReturnType<typeof calcResult> | null>(null);

  function calculate() {
    setResult(calcResult(courses, system));
  }

  function addCourse() {
    setCourses(prev => [...prev, {
      id: nextId++, name: '', credits: '3', grade: 'A+', isPf: false, pfGrade: 'P',
    }]);
  }

  function removeCourse(id: number) {
    if (courses.length <= 1) return;
    setCourses(prev => prev.filter(c => c.id !== id));
  }

  function update(id: number, patch: Partial<Course>) {
    setCourses(prev => prev.map(c => c.id === id ? { ...c, ...patch } : c));
  }

  const gradeList = getGrades(system);
  const maxGpa = system === '4.5' ? 4.5 : 4.3;

  return (
    <CalcShell
      path="/calculator/gpa"
      wide
      title="학점 GPA 계산기"
      description="과목별 성적을 입력하면 GPA를 계산합니다 · P/F 과목은 학점에 포함, GPA 산정 제외"
      intro={
        <>
          <h2>학점 수로 가중평균합니다</h2>
          <p>
            평점은 과목 점수를 단순히 평균 내는 게 아니라 <strong>(평점 × 학점)의 합 ÷ 총 학점</strong>
            입니다. 3학점 과목이 1학점 과목보다 세 배 무겁게 반영되므로, 학점이 큰 전공과목 하나가
            교양 여러 개보다 평점에 영향이 큽니다.
          </p>
          <h2>4.5와 4.3</h2>
          <p>
            학교마다 만점이 다릅니다. <strong>A+를 4.5로 보는 곳</strong>과 <strong>4.3으로 보는
            곳</strong>이 있어서, 같은 성적이어도 표기 숫자가 달라집니다. 이력서나 지원서에 적을 때는{' '}
            <strong>4.2/4.5</strong>처럼 만점을 함께 써야 오해가 없습니다.
          </p>
          <h2>P/F 과목은 평점에서 빠집니다</h2>
          <p>
            Pass/Fail로 듣는 과목은 <strong>학점은 인정되지만 평점 계산에는 들어가지 않습니다</strong>.
            이 계산기도 그렇게 처리합니다. 그래서 P/F로 들으면 평점이 깎이지 않지만, 반대로 잘해도
            평점을 올리지 못합니다.
          </p>
          <h2>재수강 처리는 학교 규정을 따르세요</h2>
          <p>
            재수강한 과목을 어떻게 반영하는지는 학교마다 다릅니다. 이전 성적을 지우는 곳도 있고
            둘 다 남기는 곳도 있으며, 재수강 시 받을 수 있는 최고 학점에 제한을 두기도 합니다.
            이 계산기는 입력한 대로만 계산하므로 <strong>참고용</strong>으로 쓰고 공식 성적은 학사
            시스템에서 확인하세요.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">

        {/* 성적 체계 */}
        <Card className="p-5">
          <Label>성적 체계</Label>
          <div className="grid grid-cols-2 gap-2">
            {([
              { value: '4.5', label: '4.5제', sub: 'A+(4.5) ~ F(0.0)' },
              { value: '4.3', label: '4.3제', sub: 'A+(4.3) ~ F(0.0)' },
            ] as const).map(opt => (
              <button key={opt.value} type="button" onClick={() => setSystem(opt.value)}
                className={`py-3 text-sm font-semibold rounded-xl border transition-colors leading-tight ${
                  system === opt.value ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-blue-300'
                }`}>
                {opt.label}
                <span className={`block text-xs font-normal ${system === opt.value ? 'text-blue-200' : 'text-slate-400 dark:text-slate-500'}`}>
                  {opt.sub}
                </span>
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-3">
            💡 P/F 과목은 각 과목의 <strong>P/F 토글</strong>로 표시하세요. 이수 학점에는 포함되지만 GPA 산정에서는 제외됩니다.
          </p>
        </Card>

        {result && (
          <>
            <SummaryGrid>
              <SummaryCard
                label={`GPA (${system}제)`}
                value={result.gpa.toFixed(2)}
                sub={`만점 ${maxGpa}`}
                variant="primary"
              />
              <SummaryCard label="총 이수학점" value={`${result.totalCredits}학점`} />
              <SummaryCard
                label="취득학점"
                value={`${result.earnedCredits}학점`}
                sub="F 제외"
                variant="green"
              />
              <SummaryCard label="과목 수" value={`${result.courseCount}과목`} />
            </SummaryGrid>

            <Card className="p-5">
              <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                <span>0.0</span>
                <span className="font-bold text-blue-600">{result.gpa.toFixed(2)} / {maxGpa}</span>
                <span>{maxGpa}</span>
              </div>
              <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full transition-all"
                  style={{ width: `${(result.gpa / maxGpa) * 100}%` }} />
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1.5 text-center">
                만점 대비 {((result.gpa / maxGpa) * 100).toFixed(1)}%
                {result.gpaCredits < result.totalCredits && (
                  <span className="ml-2 text-teal-600">
                    (P/F {result.totalCredits - result.gpaCredits}학점 제외 후 계산)
                  </span>
                )}
              </p>
            </Card>
          </>
        )}

        {/* 과목 목록 */}
        <Card className="p-5">
          <div className="flex justify-between items-center mb-3">
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">과목 목록</p>
            <button type="button" onClick={addCourse}
              className="text-xs font-semibold text-blue-600 border border-blue-200 dark:border-blue-900/50 rounded-lg px-3 py-1.5 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors">
              + 과목 추가
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {courses.map((course, idx) => (
              <div key={course.id} className="bg-slate-50 dark:bg-slate-950 rounded-xl p-3">
                <div className="grid grid-cols-12 gap-2 items-end">
                  {/* 과목명 */}
                  <div className="col-span-4">
                    {idx === 0 && <Label>과목명</Label>}
                    <input type="text" value={course.name}
                      onChange={e => update(course.id, { name: e.target.value })}
                      placeholder={`과목 ${idx + 1}`} className={inputCls} />
                  </div>

                  {/* 학점 */}
                  <div className="col-span-2">
                    {idx === 0 && <Label>학점</Label>}
                    <select value={course.credits}
                      onChange={e => update(course.id, { credits: e.target.value })}
                      className={selectCls}>
                      {[1, 2, 3, 4].map(n => (
                        <option key={n} value={n}>{n}학점</option>
                      ))}
                    </select>
                  </div>

                  {/* P/F 토글 */}
                  <div className="col-span-2 flex flex-col">
                    {idx === 0 && <Label>P/F</Label>}
                    <button type="button"
                      onClick={() => update(course.id, { isPf: !course.isPf })}
                      className={`py-3 text-xs font-bold rounded-xl border transition-colors ${
                        course.isPf
                          ? 'bg-teal-600 border-teal-600 text-white'
                          : 'border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600 hover:border-slate-300'
                      }`}>
                      {course.isPf ? 'P/F' : '-'}
                    </button>
                  </div>

                  {/* 성적 */}
                  <div className="col-span-3">
                    {idx === 0 && <Label>성적</Label>}
                    {course.isPf ? (
                      <select value={course.pfGrade}
                        onChange={e => update(course.id, { pfGrade: e.target.value as 'P' | 'F' })}
                        className={selectCls}>
                        <option value="P">P (Pass)</option>
                        <option value="F">F (Fail)</option>
                      </select>
                    ) : (
                      <select value={course.grade}
                        onChange={e => update(course.id, { grade: e.target.value })}
                        className={selectCls}>
                        {gradeList.map(g => (
                          <option key={g.label} value={g.label}>{g.label} ({g.point.toFixed(1)})</option>
                        ))}
                      </select>
                    )}
                  </div>

                  {/* 삭제 */}
                  <div className="col-span-1 flex flex-col">
                    {idx === 0 && <div className="h-5 mb-1.5" />}
                    <button type="button" onClick={() => removeCourse(course.id)}
                      disabled={courses.length <= 1}
                      className="py-3 text-xs text-red-400 border border-red-200 dark:border-red-900/50 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors disabled:opacity-30">
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

        {result && <Card>
          <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800">
            <p className="font-bold text-slate-800 dark:text-slate-100 text-sm">과목별 상세</p>
          </div>
          <TableWrap>
            <table className="calc-table">
              <thead>
                <tr>
                  <th>과목명</th>
                  <th>학점</th>
                  <th>성적</th>
                  <th>평점</th>
                  <th>기여 (점수×학점)</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((c, i) => {
                  const cr = Number(c.credits) || 0;
                  const point = c.isPf ? null : getPoint(system, c.grade);
                  const contrib = point !== null ? point * cr : null;
                  return (
                    <tr key={c.id}>
                      <td className="font-medium text-slate-700 dark:text-slate-200">{c.name || `과목 ${i + 1}`}</td>
                      <td>{cr}학점</td>
                      <td>
                        <span className={`font-bold ${
                          c.isPf
                            ? c.pfGrade === 'P' ? 'text-teal-600' : 'text-red-500'
                            : c.grade.startsWith('A') ? 'text-emerald-700 dark:text-emerald-300'
                            : c.grade.startsWith('B') ? 'text-blue-700 dark:text-blue-300'
                            : c.grade.startsWith('C') ? 'text-amber-600'
                            : c.grade === 'F' ? 'text-red-500'
                            : 'text-slate-500 dark:text-slate-400'
                        }`}>
                          {c.isPf ? `${c.pfGrade} (Pass/Fail)` : c.grade}
                        </span>
                      </td>
                      <td>
                        {c.isPf
                          ? <span className="text-xs text-teal-600 bg-teal-50 dark:bg-teal-950/30 px-2 py-0.5 rounded-full">GPA 제외</span>
                          : point?.toFixed(1)}
                      </td>
                      <td className="font-semibold text-slate-700 dark:text-slate-200">
                        {contrib !== null ? `${contrib.toFixed(2)}점` : '—'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </TableWrap>
        </Card>}

        {/* 성적 기준표 */}
        <Card className="p-5">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
            {system}제 성적 기준표
          </p>
          <div className="grid grid-cols-5 gap-2">
            {gradeList.map(g => (
              <div key={g.label} className="bg-slate-50 dark:bg-slate-950 rounded-xl p-2.5 text-center border border-slate-100 dark:border-slate-800">
                <p className="text-sm font-black text-slate-800 dark:text-slate-100">{g.label}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{g.point.toFixed(1)}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </CalcShell>
  );
}
