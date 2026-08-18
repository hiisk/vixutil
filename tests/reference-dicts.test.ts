/**
 * 참고 사전 세 섹션 — /cmd, /shortcut, /emoji.
 * (/error는 2026-08-18에 지웠다 — 스택오버플로에 밀려 들어오는 사람이 없었다)
 *
 * 세 섹션이 같은 꼴이다. 식별자(명령 이름·키 조합·이모지 글자)는 프로그램과
 * 유니코드가 정한 것이라 옮기지 않고, 열 언어로 쓰는 것은 한 줄 설명뿐이다.
 * 그 설명은 Record<string, Ten>에 담겨 있고, **Ten이 튜플이라 tsc는 열 칸이
 * 채워졌는지까지만 본다** — 빈 문자열이나 영어 원문이 들어와도 통과한다.
 * 그래서 여기서 값을 직접 센다.
 *
 * 이 검사를 세우면서 실제로 잡은 것 둘을 적어 둔다.
 *
 * 하나. /cmd에는 검사가 아예 없었다. 227개 × 열 언어가 아무것도 대조되지 않은
 * 채 들어가 있었고, 설명이 빠진 자리는 화면에서 영어로 조용히 떨어졌다.
 *
 * 둘. 세 섹션의 facts.ts가 이웃을 "갈래의 앞에서 여덟 개"로 골랐다. 그래서 각
 * 갈래의 아홉째부터는 **들어오는 링크가 0**이었다 — 사이트맵에는 있고 아무
 * 페이지도 가리키지 않는 낱장이다. 예전에 낱장 174곳이 같은 이유로 그랬다.
 * 자기 자리 다음부터 원형으로 고르게 바꿨고, 아래 "모든 항목이 어딘가에서
 * 가리켜진다"가 그것을 지킨다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { CMD_ITEMS, cmdItem } from '../lib/cmd/list.ts';
import { CMD_DESC } from '../lib/cmd/desc.ts';
import { cmdFacts } from '../lib/cmd/facts.ts';
import { SC_ITEMS, scItem, SC_APPS } from '../lib/shortcut/list.ts';
import { NA } from '../lib/shortcut/types.ts';
import { SC_DESC } from '../lib/shortcut/desc.ts';
import { scFacts, keyCount } from '../lib/shortcut/facts.ts';
import { EM_ITEMS, emojiItem, EM_GROUPS, codePoints } from '../lib/emoji/list.ts';
import { EM_DESC } from '../lib/emoji/desc.ts';
import { emojiFacts } from '../lib/emoji/facts.ts';

const LANGS = ['ko', 'en', 'es', 'pt', 'ja', 'de', 'fr', 'hi', 'zh', 'tw'] as const;

/** 한 섹션을 통째로 보는 묶음 — 세 섹션이 같은 검사를 받는다 */
type Section = {
  name: string;
  slugs: string[];
  desc: Record<string, readonly string[]>;
  /** 그 낱장이 가리키는 이웃들 */
  related: (slug: string) => string[];
  /** 갈래 이름 → 그 갈래에 든 개수 */
  groups: Record<string, number>;
};

const SECTIONS: Section[] = [
  {
    name: 'cmd',
    slugs: CMD_ITEMS.map(x => x.slug),
    desc: CMD_DESC,
    related: s => cmdFacts(cmdItem(s)!).related,
    groups: Object.fromEntries(
      [...new Set(CMD_ITEMS.map(x => x.category))].map(c => [c, CMD_ITEMS.filter(x => x.category === c).length]),
    ),
  },
  {
    name: 'shortcut',
    slugs: SC_ITEMS.map(x => x.slug),
    desc: SC_DESC,
    related: s => scFacts(scItem(s)!).related,
    groups: Object.fromEntries(SC_APPS.map(a => [a, SC_ITEMS.filter(x => x.app === a).length])),
  },
  {
    name: 'emoji',
    slugs: EM_ITEMS.map(x => x.slug),
    desc: EM_DESC,
    related: s => emojiFacts(emojiItem(s)!).related,
    groups: Object.fromEntries(EM_GROUPS.map(g => [g, EM_ITEMS.filter(x => x.group === g).length])),
  },
];

for (const sec of SECTIONS) {
  test(`${sec.name}: 슬러그가 유일하고 주소에 쓸 수 있다`, () => {
    const dup = sec.slugs.filter((s, i) => sec.slugs.indexOf(s) !== i);
    assert.deepEqual([...new Set(dup)], [], '같은 슬러그가 둘이면 뒤엣것이 화면에서 사라진다');
    const bad = sec.slugs.filter(s => !/^[a-z0-9][a-z0-9-]*[a-z0-9]$/.test(s));
    assert.deepEqual(bad, [], '소문자·숫자·붙임표만 쓴다 — 대문자나 밑줄은 주소에서 갈린다');
  });

  test(`${sec.name}: 설명과 목록이 양쪽 다 맞는다`, () => {
    const missing = sec.slugs.filter(s => !sec.desc[s]);
    assert.deepEqual(missing, [], '설명이 없으면 낱장이 빈 문단으로 나온다');
    const ghost = Object.keys(sec.desc).filter(s => !sec.slugs.includes(s));
    assert.deepEqual(ghost, [], '목록에 없는 설명이다 — 슬러그를 고치고 사전을 안 고쳤을 때 생긴다');
  });

  test(`${sec.name}: 열 언어가 모두 채워져 있다`, () => {
    const holes: string[] = [];
    for (const s of sec.slugs) {
      const row = sec.desc[s];
      if (!row) continue;
      assert.equal(row.length, 10, `${s}: 열 칸이 아니라 ${row.length}칸`);
      row.forEach((v, i) => {
        if (!v || !v.trim()) holes.push(`${s}.${LANGS[i]}`);
      });
    }
    assert.deepEqual(holes.slice(0, 20), [], `빈 칸 ${holes.length}개 — 화면에서 영어로 떨어진다`);
  });

  test(`${sec.name}: 영어 원문을 그대로 둔 칸이 없다`, () => {
    /*
     * 폴백이 미번역을 숨긴다. 어느 언어 칸이 영어와 글자까지 같으면 옮기지 않은
     * 것이다 — 한두 낱말이면 우연일 수 있지만 한 문장이 통째로 같을 수는 없다.
     */
    const same: string[] = [];
    for (const s of sec.slugs) {
      const row = sec.desc[s];
      if (!row) continue;
      const en = row[1];
      LANGS.forEach((l, i) => {
        if (l === 'en' || l === 'ko') return;
        if (row[i] === en && en.length > 25) same.push(`${s}.${l}`);
      });
    }
    assert.deepEqual(same.slice(0, 20), [], `영어와 같은 칸 ${same.length}개`);
  });

  test(`${sec.name}: 한글이 한국어 칸 밖으로 새지 않는다`, () => {
    const leak: string[] = [];
    for (const s of sec.slugs) {
      const row = sec.desc[s];
      if (!row) continue;
      LANGS.forEach((l, i) => {
        if (l === 'ko') return;
        if (/[가-힣]/.test(row[i])) leak.push(`${s}.${l}`);
      });
    }
    assert.deepEqual(leak.slice(0, 20), [], `한글이 섞인 칸 ${leak.length}개`);
  });

  test(`${sec.name}: 키릴 문자가 어디에도 없다`, () => {
    /* 예전에 일본어 설명에 "этот"가 새 들어왔다. 열 언어에 키릴을 쓰는 언어는 없다 */
    const bad: string[] = [];
    for (const s of sec.slugs) {
      const row = sec.desc[s];
      if (!row) continue;
      LANGS.forEach((l, i) => {
        if (/[Ѐ-ӿ]/.test(row[i])) bad.push(`${s}.${l}`);
      });
    }
    assert.deepEqual(bad, [], '키릴이 섞였다');
  });

  test(`${sec.name}: 모든 항목이 어딘가에서 가리켜진다`, () => {
    const inbound = new Map(sec.slugs.map(s => [s, 0]));
    for (const s of sec.slugs) {
      for (const n of sec.related(s)) inbound.set(n, (inbound.get(n) ?? 0) + 1);
    }
    const orphans = [...inbound].filter(([, n]) => n === 0).map(([s]) => s);
    assert.deepEqual(orphans, [], '들어오는 링크가 0인 낱장이다 — 사이트맵에만 있고 아무도 안 가리킨다');
  });

  test(`${sec.name}: 이웃에 자기 자신이 없다`, () => {
    const self = sec.slugs.filter(s => sec.related(s).includes(s));
    assert.deepEqual(self, [], '자기를 가리키는 링크는 누를 데가 없다');
  });

  test(`${sec.name}: 갈래마다 항목이 있다`, () => {
    const empty = Object.entries(sec.groups).filter(([, n]) => n === 0).map(([g]) => g);
    assert.deepEqual(empty, [], '갈래만 있고 항목이 없으면 허브에 빈 제목이 남는다');
  });
}

test('shortcut: 키 조합에 빈칸을 아무렇게나 두지 않는다', () => {
  /*
   * 표기를 한 꼴로 맞춘다 — 'Ctrl + S'가 아니라 'Ctrl+S'다. 빈칸은 차례로 이어
   * 누르는 코드에서만 쓴다: 'Ctrl+K Ctrl+S'. 섞이면 화면에서 칩이 잘못 갈린다.
   */
  const bad = SC_ITEMS.filter(x => [x.win, x.mac].some(c => / \+|\+ /.test(c)));
  assert.deepEqual(bad.map(x => `${x.slug}: ${x.win} / ${x.mac}`), []);
});

test('shortcut: 두 운영체제 조합이 모두 있다', () => {
  const holes = SC_ITEMS.filter(x => !x.win.trim() || !x.mac.trim());
  assert.deepEqual(holes.map(x => x.slug), [], '한쪽만 있으면 그 자리가 빈 칸으로 나온다');
});

/**
 * 수식 키만으로 되어 있는 것이 **맞는** 자리.
 *
 * 수식 키 하나는 그 자체로 단축키일 수 있어(Win 키가 시작 메뉴를 연다) 검사에서
 * 아예 빼지만, 둘 이상 겹친 것은 대개 마지막 키를 적다 끊긴 자리다. 그런데 Zoom은
 * 수식 키 셋을 함께 누르는 것을 실제로 하나의 단축키로 두고 있다 — 화면 공유로
 * 조작 줄이 가려졌을 때 거기에 초점을 옮기는 길이다.
 */
const MOD_ONLY_OK = new Map<string, string>([
  ['zoom-focus-meeting-controls', 'Zoom이 수식 키 셋 자체를 조작 줄 초점 이동으로 둔다'],
]);

test('shortcut: 수식 키를 겹쳐 놓고 끝난 조합이 없다', () => {
  /*
   * 'Ctrl+Shift'는 단축키가 아니다 — 마지막에 눌리는 키가 빠진 것이다. 적다가
   * 끊긴 자리를 잡는 검사다.
   *
   * 수식 키 **하나**는 그 자체로 단축키일 수 있어 뺀다. Win 키만 눌러 시작
   * 메뉴가 열리는 것이 그렇다.
   */
  const MOD = new Set(['Ctrl', 'Cmd', 'Shift', 'Alt', 'Option', 'Win', 'Fn', 'Meta']);
  const bad = SC_ITEMS.filter(x => !MOD_ONLY_OK.has(x.slug) && [x.win, x.mac].some(c => {
    const keys = c.split(' ').pop()!.split('+').filter(Boolean);
    return keys.length > 1 && keys.every(k => MOD.has(k));
  }));
  assert.deepEqual(bad.map(x => `${x.slug}: ${x.win} / ${x.mac}`), []);
});

test('shortcut: 키 수 세기가 이어 누르는 조합과 더하기 키를 견딘다', () => {
  assert.equal(keyCount('Ctrl+Shift+P'), 3);
  assert.equal(keyCount('F2'), 1);
  // 더하기가 키인 경우 — 확대 단축키가 그렇다
  assert.equal(keyCount('Ctrl++'), 2);
});

/**
 * 같은 조합이 한 앱에서 두 일을 하는 것이 **맞는** 자리.
 *
 * 대개는 베껴 적다 생긴 잘못이지만, 프로그램이 초점(focus)에 따라 같은 키에
 * 다른 기능을 붙여 둔 경우가 있다. 그것을 여기 적어 두고 까닭을 남긴다 —
 * 검사에서 빼려면 왜 빼는지가 코드에 남아야 한다.
 */
const SAME_COMBO_OK = new Map<string, string>([
  // 시트에서는 다시 계산, 수식 입력줄에서 일부를 골라 놓고 누르면 그 조각의 값
  ['excel|F9', '초점이 시트냐 수식 입력줄이냐로 갈린다'],
  // 편집기에서는 줄 복제, 커밋 창에서는 차이 보기 — JetBrains가 창마다 다르게 붙였다
  ['intellij|Ctrl+D', '초점이 편집기냐 버전 관리 창이냐로 갈린다'],
  // 전화가 오면 거절, 아니면 이 채널을 읽음으로 표시. 작성 중이면 초안까지 지운다
  ['discord|Esc', '전화가 오는 중이냐 아니냐로 갈린다 — 한 키가 세 일을 한다'],
]);

test('shortcut: 같은 앱에서 같은 조합이 두 일을 하지 않는다', () => {
  /*
   * 한 앱에서 같은 키 조합이 두 항목에 적혀 있으면 대개 하나가 틀렸다.
   * 초점에 따라 갈리는 자리만 위 표에 적어 두고 빼낸다.
   */
  const seen = new Map<string, string>();
  const clash: string[] = [];
  for (const x of SC_ITEMS) {
    /* NA는 조합이 아니라 조합이 없다는 표시다 — 겹칠 수 있는 값이 아니다 */
    if (x.win === NA) continue;
    const key = `${x.app}|${x.win}`;
    if (SAME_COMBO_OK.has(key)) continue;
    const prev = seen.get(key);
    if (prev) clash.push(`${x.app} ${x.win}: ${prev} / ${x.action}`);
    else seen.set(key, x.action);
  }
  assert.deepEqual(clash, [], '같은 앱의 같은 조합이 둘이다 — 한쪽이 틀렸다');
});

test('emoji: 글자와 코드포인트가 서로 맞는다', () => {
  /*
   * code에 적은 코드포인트를 실제로 이어 붙이면 char가 나와야 한다. 손으로 옮겨
   * 적는 값이라 한 자리만 틀려도 다른 그림이 되고, 화면과 설명이 어긋난다.
   */
  const bad: string[] = [];
  for (const x of EM_ITEMS) {
    const built = x.code.trim().split(/\s+/).map(c => String.fromCodePoint(parseInt(c.replace(/^U\+/i, ''), 16))).join('');
    if (built !== x.char) bad.push(`${x.slug}: ${x.code} → ${built}, 글자는 ${x.char}`);
  }
  assert.deepEqual(bad.slice(0, 15), [], `어긋난 것 ${bad.length}개`);
});

test('emoji: 코드포인트 셈이 이어 붙인 글자를 센다', () => {
  assert.equal(codePoints('😀'), 1);
  // 변이 선택자가 붙은 글자는 둘로 센다
  assert.ok(codePoints('❤️') >= 2, '❤️는 U+2764 U+FE0F다');
});

test('emoji: 피부색 변이를 싣지 않았다', () => {
  const bad = EM_ITEMS.filter(x => /[\u{1F3FB}-\u{1F3FF}]/u.test(x.char));
  assert.deepEqual(bad.map(x => x.slug), [], '뜻이 같아 낱장이 겹친다 — 기본형 한 장에 함께 설명한다');
});

test('emoji: 글자가 겹치지 않는다', () => {
  const seen = new Map<string, string>();
  const dup: string[] = [];
  for (const x of EM_ITEMS) {
    const prev = seen.get(x.char);
    if (prev) dup.push(`${x.char}: ${prev} / ${x.slug}`);
    else seen.set(x.char, x.slug);
  }
  assert.deepEqual(dup, [], '같은 이모지가 주소 둘을 갖는다');
});

/*
 * 섹션을 가로지르는 슬러그 겹침은 검사하지 않는다.
 *
 * 처음에는 겹치면 안 된다고 보고 검사를 세웠는데, 세워 보니 cmd의 `cat`(파일을
 * 이어 붙여 찍는 명령)과 emoji의 `cat`(🐱)이 잡혔다. 이 둘은 주소가 갈라져
 * 있고(/cmd/cat, /emoji/cat) 서로 다른 것을 설명하며, 검색 목록에서도 제목이
 * 다르다 — emoji 쪽 제목에는 글자가 앞에 붙는다. 겹쳐도 되는 것을 못 겹치게
 * 하면 이름을 억지로 비틀어야 하고, 사람들이 실제로 치는 말에서 멀어진다.
 *
 * 한 섹션 **안에서** 겹치는 것은 위의 '슬러그가 유일하고' 검사가 잡는다.
 */
