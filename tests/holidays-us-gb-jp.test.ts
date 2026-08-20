import { test } from 'node:test';
import assert from 'node:assert/strict';
import { holidaysOf } from '../lib/holidays/engine.ts';
import { US } from '../lib/holidays/us.ts';
import { GB } from '../lib/holidays/gb.ts';
import { JP } from '../lib/holidays/jp.ts';

/**
 * 미국·영국·일본 공휴일이 실제 날짜와 맞는가.
 *
 * 날짜는 「그럴듯해 보인다」로 확인할 수 없다. 각국이 공표한 값에 못을 박는다 —
 * 미국 연방 인사관리처(OPM), 영국 gov.uk, 일본 내각부가 내는 목록이다.
 * 규칙을 잘못 짜면 여기서 반드시 걸린다.
 */

const on = (c: typeof US, y: number, slug: string) =>
  holidaysOf(c, y).find(h => h.slug === slug)?.observed;
const date = (c: typeof US, y: number, slug: string) =>
  holidaysOf(c, y).find(h => h.slug === slug)?.date;

test('미국 2026년이 OPM 목록과 맞는다', () => {
  const WANT: Record<string, string> = {
    'new-years-day': '2026-01-01',   // 목
    'mlk-day': '2026-01-19',         // 1월 셋째 월
    'presidents-day': '2026-02-16',  // 2월 셋째 월
    'memorial-day': '2026-05-25',    // 5월 마지막 월
    'juneteenth': '2026-06-19',      // 금
    'independence-day': '2026-07-03', // 7/4가 토 → 금요일로 관측
    'labor-day': '2026-09-07',       // 9월 첫째 월
    'columbus-day': '2026-10-12',    // 10월 둘째 월
    'veterans-day': '2026-11-11',    // 수
    'thanksgiving': '2026-11-26',    // 11월 넷째 목
    'christmas-day': '2026-12-25',   // 금
  };
  const got = holidaysOf(US, 2026);
  assert.equal(got.length, 11, `연방 공휴일이 ${got.length}개다`);
  for (const [slug, want] of Object.entries(WANT)) {
    assert.equal(on(US, 2026, slug), want, `${slug}`);
  }
});

test('미국 대체는 토→금, 일→월이다', () => {
  /* 2027-07-04는 일요일 → 7월 5일 월요일에 관측 */
  assert.equal(date(US, 2027, 'independence-day'), '2027-07-04');
  assert.equal(on(US, 2027, 'independence-day'), '2027-07-05');
  /* 2027-12-25는 토요일 → 12월 24일 금요일 */
  assert.equal(on(US, 2027, 'christmas-day'), '2027-12-24');
});

test('미국은 준틴스가 2021년부터다', () => {
  assert.equal(holidaysOf(US, 2020).some(h => h.slug === 'juneteenth'), false);
  assert.equal(holidaysOf(US, 2021).some(h => h.slug === 'juneteenth'), true);
  assert.equal(holidaysOf(US, 2020).length, 10);
});

test('영국 2026년이 gov.uk 목록과 맞는다', () => {
  /* 2026년 부활절은 4월 5일 */
  const WANT: Record<string, string> = {
    'new-years-day': '2026-01-01',
    'good-friday': '2026-04-03',
    'easter-monday': '2026-04-06',
    'early-may': '2026-05-04',
    'spring-bank': '2026-05-25',
    'summer-bank': '2026-08-31',
    'christmas-day': '2026-12-25',
    'boxing-day': '2026-12-28',   // 12/26이 토 → 다음 평일 월요일
  };
  const got = holidaysOf(GB, 2026);
  assert.equal(got.length, 8, `은행 휴일이 ${got.length}개다`);
  for (const [slug, want] of Object.entries(WANT)) {
    assert.equal(on(GB, 2026, slug), want, `${slug}`);
  }
});

test('영국 크리스마스·박싱데이가 주말에 걸려도 안 겹친다', () => {
  for (const y of [2021, 2022, 2027, 2032]) {
    const h = holidaysOf(GB, y);
    const c = h.find(x => x.slug === 'christmas-day')!.observed;
    const b = h.find(x => x.slug === 'boxing-day')!.observed;
    assert.notEqual(c, b, `${y}년에 둘이 같은 날이다`);
    assert.equal(new Set(h.map(x => x.observed)).size, h.length, `${y}년에 겹치는 휴일이 있다`);
  }
  /* 2027: 12/25 토, 12/26 일 → 27일 월, 28일 화 */
  assert.equal(on(GB, 2027, 'christmas-day'), '2027-12-27');
  assert.equal(on(GB, 2027, 'boxing-day'), '2027-12-28');
});

test('일본 2026년이 내각부 목록과 맞는다', () => {
  const WANT: Record<string, string> = {
    'ganjitsu': '2026-01-01',
    'seijin': '2026-01-12',      // 1월 둘째 월
    'kenkoku': '2026-02-11',
    'tenno-tanjobi': '2026-02-23',
    'shunbun': '2026-03-20',     // 관보 확정값
    'showa': '2026-04-29',
    'kenpo': '2026-05-06',     // 5/3이 일요일, 5/4·5/5가 이미 축일 → 5/6
    'midori': '2026-05-04',
    'kodomo': '2026-05-05',
    'umi': '2026-07-20',         // 7월 셋째 월
    'yama': '2026-08-11',
    'keiro': '2026-09-21',       // 9월 셋째 월
    'shubun': '2026-09-23',      // 관보 확정값
    'sports': '2026-10-12',      // 10월 둘째 월
    'bunka': '2026-11-03',
    'kinro': '2026-11-23',
  };
  const got = holidaysOf(JP, 2026);
  assert.equal(got.length, 16, `축일이 ${got.length}개다`);
  for (const [slug, want] of Object.entries(WANT)) {
    assert.equal(on(JP, 2026, slug), want, `${slug}`);
  }
});

test('일본은 일요일일 때만 대체한다', () => {
  /* 2026-05-03 헌법기념일은 일요일 → 대체휴일이 생긴다.
     5/4·5/5가 이미 축일이므로 5/6으로 밀린다 */
  assert.equal(date(JP, 2026, 'kenpo'), '2026-05-03');
  assert.equal(on(JP, 2026, 'kenpo'), '2026-05-06');
  /* 토요일은 대체가 없다 — 2026-02-11 수요일 말고 토요일에 걸리는 해로 본다.
     2023-02-11이 토요일이었다 */
  assert.equal(date(JP, 2023, 'kenkoku'), '2023-02-11');
  assert.equal(on(JP, 2023, 'kenkoku'), '2023-02-11');
});

test('일본 올림픽 특별법 두 해를 덮어쓴다', () => {
  assert.equal(date(JP, 2020, 'umi'), '2020-07-23');
  assert.equal(date(JP, 2020, 'sports'), '2020-07-24');
  assert.equal(date(JP, 2021, 'umi'), '2021-07-22');
  /* 덮어쓰지 않은 해는 규칙대로 — 2022년 바다의 날은 7월 셋째 월요일 */
  assert.equal(date(JP, 2022, 'umi'), '2022-07-18');
});

test('세 나라 모두 여러 해에서 날짜가 겹치지 않는다', () => {
  for (const c of [US, GB, JP]) {
    for (let y = 2024; y <= 2035; y++) {
      const h = holidaysOf(c, y);
      assert.equal(new Set(h.map(x => x.observed)).size, h.length,
        `${c.code} ${y}년에 같은 날에 두 휴일이 있다`);
      for (const x of h) {
        assert.match(x.observed, /^\d{4}-\d{2}-\d{2}$/, `${c.code} ${x.slug} 날짜 꼴이 틀렸다`);
        /* 규칙이 정한 «원래» 날짜는 반드시 그 해 안이다. 관측일은 아닐 수 있다 */
        assert.equal(x.date.slice(0, 4), String(y), `${c.code} ${x.slug}이 다른 해로 샜다`);
      }
    }
  }
});

test('이 검사가 실제로 문다', () => {
  /* 규칙을 한 칸 밀면 알려진 값과 달라야 한다 */
  const shifted = { ...US, holidays: US.holidays.map(h =>
    h.slug === 'thanksgiving' ? { ...h, rule: { kind: 'nth' as const, month: 11, weekday: 4 as const, n: 3 } } : h) };
  assert.notEqual(holidaysOf(shifted, 2026).find(h => h.slug === 'thanksgiving')!.observed, '2026-11-26');
  /* 나라마다 개수가 다른지 — 같으면 셋이 한 표를 쓰고 있는 것이다 */
  const counts = [US, GB, JP].map(c => holidaysOf(c, 2026).length);
  assert.equal(new Set(counts).size, 3, `개수가 ${counts.join('/')}로 겹친다`);
});

test('설날이 토요일이면 미국은 전해 12월 31일에 쉰다', () => {
  /*
    5 U.S.C. §6103의 nearest 규칙은 해를 넘는다. 2028-01-01이 토요일이라
    연방 기관은 2027-12-31 금요일에 문을 닫는다 — 2022년 1월 1일도 그래서
    2021-12-31에 쉬었다. 그러니 «그 해 목록»의 날짜가 전해로 나갈 수 있다.
    화면에서는 이 날을 그 해 목록에 그대로 두되 «전해에 쉰다»고 밝혀야 한다.
  */
  const ny = holidaysOf(US, 2028).find(h => h.slug === 'new-years-day')!;
  assert.equal(ny.date, '2028-01-01');
  assert.equal(ny.observed, '2027-12-31');
  assert.equal(ny.moved, true);
  /* 해를 넘는 것은 미국뿐이다 — 영국은 다음 평일로 미므로 앞으로만 간다 */
  assert.equal(holidaysOf(GB, 2028).every(h => h.observed >= '2028-01-01'), true);
});

test('공휴일마다 이름이 있다', async () => {
  const { COUNTRIES } = await import('../lib/holidays/countries.ts');
  const { HOLIDAY_NAMES } = await import('../lib/holidays/names.ts');
  /*
    nameOf에 폴백이 있어 이름이 빠져도 화면은 안 깨진다 — 슬러그가 그대로
    제목에 나갈 뿐이다. 그래서 사전을 직접 센다. 실제로 스페인의
    «asuncion-de-la-virgen»이 «asuncion»으로 적혀 조용히 빠져 있었다.
  */
  const keys = new Set<string>();
  for (const c of COUNTRIES) {
    for (const h of c.def.holidays) {
      const k = `${c.code}:${h.slug}`;
      keys.add(k);
      assert.ok(HOLIDAY_NAMES[k], `${k} 이름이 없다`);
      assert.ok(HOLIDAY_NAMES[k].native.length > 1, `${k} 현지어 이름이 비었다`);
      assert.ok(HOLIDAY_NAMES[k].en.length > 1, `${k} 영어 이름이 비었다`);
    }
  }
  /* 반대쪽도 — 안 쓰는 이름이 남아 있으면 슬러그를 고치다 흘린 것이다 */
  for (const k of Object.keys(HOLIDAY_NAMES)) {
    assert.ok(keys.has(k), `${k}는 어느 나라에도 없다`);
  }
  assert.equal(keys.size, 75, `공휴일이 ${keys.size}개다`);
});
