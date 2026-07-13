import type { Generator } from './types';

/** 한 번에 뽑는 결과 수 */
export const BATCH = 5;

/**
 * 제너레이터 한 건 생성.
 *
 * 순수 랜덤이므로 호출마다 결과가 다르다 — 결정론이 필요한 곳(운세 등)과 달리
 * 여기서는 다시 눌렀을 때 새 결과가 나오는 게 목적이다.
 */
export function makeOne(gen: Generator): string {
  switch (gen.type) {
    case 'combine': {
      if (!gen.pools?.length) return '';
      return gen.pools.map(p => p[Math.floor(Math.random() * p.length)]).join(gen.separator ?? ' ');
    }
    case 'pick': {
      if (!gen.items?.length) return '';
      return gen.items[Math.floor(Math.random() * gen.items.length)] ?? '';
    }
    case 'password': {
      const len = Math.max(4, gen.count ?? 16);
      // 헷갈리는 문자(I, l, 1, O, 0)는 뺐다.
      const upper = 'ABCDEFGHJKMNPQRSTUVWXYZ';
      const lower = 'abcdefghjkmnpqrstuvwxyz';
      const nums = '23456789';
      const syms = '!@#$%&*';
      const all = upper + lower + nums + syms;
      return [
        upper[Math.floor(Math.random() * upper.length)],
        nums[Math.floor(Math.random() * nums.length)],
        syms[Math.floor(Math.random() * syms.length)],
        ...Array.from({ length: len - 3 }, () => all[Math.floor(Math.random() * all.length)]),
      ].sort(() => Math.random() - 0.5).join('');
    }
    case 'number': {
      const min = gen.min ?? 1;
      const max = gen.max ?? 100;
      if (max < min) return String(min);
      return String(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    case 'sample': {
      // min~max에서 중복 없이 count개. 로또처럼 "같은 숫자가 두 번 나오면 안 되는" 경우.
      const min = gen.min ?? 1;
      const max = gen.max ?? 45;
      const size = max - min + 1;
      const count = Math.min(Math.max(1, gen.count ?? 6), Math.max(1, size));
      if (size <= 0) return '';

      // 부분 피셔-예이츠 — 범위 전체를 만들지 않고 필요한 만큼만 섞는다.
      const pool = Array.from({ length: size }, (_, i) => min + i);
      for (let i = 0; i < count; i++) {
        const j = i + Math.floor(Math.random() * (size - i));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
      return pool
        .slice(0, count)
        .sort((a, b) => a - b)
        .join(gen.separator ?? ', ');
    }
    default:
      return '';
  }
}

/** 중복 없이 BATCH개를 모은다. 경우의 수가 적으면 그만큼만 나온다. */
export function makeBatch(gen: Generator, size = BATCH): string[] {
  const results: string[] = [];
  const seen = new Set<string>();
  let tries = 0;
  while (results.length < size && tries < size * 6) {
    const r = makeOne(gen);
    if (r && !seen.has(r)) {
      seen.add(r);
      results.push(r);
    }
    tries++;
  }
  return results;
}
