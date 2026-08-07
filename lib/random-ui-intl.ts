// node에서 직접 로드할 수 있게 확장자를 명시한다 (allowImportingTsExtensions)
import { alternateLanguages10, localeHref, openGraphFor, type AnyLocale10, type IntlLocale } from './locales.ts';
import { RANDOM_TOOLS_MAP } from './random-tools.ts';
import { withCard } from './og-cards/index.ts';

/**
 * 랜덤 뽑기 화면의 여덟 언어 문구.
 *
 * 이 섹션은 문구가 컴포넌트 안에 삼항으로 박혀 있었다 — `ko ? '앞' : zh ? '正面' : 'Heads'`
 * 같은 줄이 아홉 파일에 예순 개 넘게 흩어져 있었고, zh는 이미 `const zh = false`라
 * 닿지 않는 코드였다. 언어를 여덟으로 늘리면 그 삼항이 여덟 겹이 되므로 문구를
 * 전부 여기로 옮긴다. 컴포넌트는 RANDOM_UI[lang]만 읽는다.
 *
 * 예시 이름과 룰렛 항목은 번역이 아니라 그 언어권에서 실제로 쓰는 것으로 바꾼다.
 * 'Alex'를 힌디어 화면에 그대로 두면 예시가 아니라 남의 나라 이야기가 된다.
 */

export type RandomLang = AnyLocale10;

export interface RandomUi {
  /* 허브 */
  eyebrow: string;
  hubTitle: string;
  hubLead: string;
  hubFoot: string;
  metaTitle: string;
  metaDesc: string;

  /* 도구 페이지 */
  privacyNote: string;
  aboutTitle: (name: string) => string;
  moreTools: string;

  /* 룰렛 */
  spin: string;
  spinning: string;
  winner: string;
  optionPlaceholder: (i: number) => string;
  addOption: string;
  remove: string;
  rouletteDefaults: string[];
  presets: { label: string; items: string[] }[];

  /* 이름 뽑기·순서·팀·마니또가 함께 쓰는 것 */
  sampleNames: string[];
  listPlaceholder: string;
  peopleCount: (n: number) => string;
  itemCount: (n: number) => string;

  /* 이름 뽑기 */
  howMany: string;
  pickLine: (n: number, c: number) => string;
  drumroll: string;
  whoWillIt: string;
  drawing: string;
  drawAgain: string;
  draw: string;

  /* 순서 섞기 */
  shuffleOrder: string;

  /* 팀 나누기 */
  teamCount: string;
  makeTeams: string;
  teamLabel: (i: number, n: number) => string;

  /* 숫자 뽑기 */
  min: string;
  max: string;
  count: string;
  noDuplicates: string;
  generate: string;
  lottery: string;
  luckyNumbers: string;
  result: string;

  /* 동전·주사위 */
  coinTab: string;
  diceTab: string;
  heads: string;
  tails: string;
  coinResult: (face: string) => string;
  flipping: string;
  flip: string;
  diceCount: string;
  diceTotal: (n: number) => string;
  rolling: string;
  roll: string;

  /* 사다리 */
  ladderNames: string[];
  ladderResults: string[];
  reshuffle: string;
  players: string;
  results: string;
  playerPlaceholder: (i: number) => string;
  resultPlaceholder: (i: number) => string;
  newPlayer: (i: number) => string;
  newResult: string;
  fewer: string;
  more: string;

  /* 마니또 */
  santaPlaceholder: string;
  santaDuplicate: string;
  santaDraw: string;
  santaHint: string;
  santaMatched: string;
  santaTapName: string;
  santaOnly: (name: string) => string;
  santaReveal: string;
  santaYourMatch: string;
  santaGotIt: string;
}

export const RANDOM_UI: Record<RandomLang, RandomUi> = {
  ko: {
    eyebrow: '랜덤 뽑기', hubTitle: '랜덤 뽑기',
    hubLead: '고민될 땐 운에 맡기세요 — 공정하게, 바로, 무료로.',
    hubFoot: '무료 랜덤 결정 도구',
    metaTitle: '랜덤 뽑기 — 룰렛·사다리타기·팀 나누기·주사위',
    metaDesc: '룰렛 돌림판, 사다리타기, 이름 뽑기, 팀 나누기, 숫자 추첨, 동전 던지기, 주사위, 마니또까지. 설치 없이 바로 쓰는 무료 랜덤 결정 도구.',
    privacyNote: '결과는 브라우저에서 그때그때 만들어집니다. 입력한 내용은 저장되지도, 어디로 보내지지도 않습니다.',
    aboutTitle: n => `${n}란`,
    moreTools: '다른 도구',
    spin: '돌리기 🎡', spinning: '돌아가는 중…', winner: '당첨 🎉',
    optionPlaceholder: i => `항목 ${i}`, addOption: '+ 항목 추가', remove: '삭제',
    rouletteDefaults: ['치킨', '피자', '떡볶이', '초밥', '햄버거', '마라탕'],
    presets: [
      { label: '점심 메뉴', items: ['한식', '중식', '일식', '분식', '치킨', '피자', '햄버거', '샐러드'] },
      { label: '예 / 아니오', items: ['예', '아니오'] },
      { label: '벌칙', items: ['꿀밤', '노래', '개인기', '심부름', '통과', '한 잔'] },
      { label: '커피 내기', items: ['1번', '2번', '3번', '4번'] },
    ],
    sampleNames: ['철수', '영희', '민수', '지연', '현우', '서준', '하은', '도윤'],
    listPlaceholder: '한 줄에 하나씩, 또는 쉼표로 구분해 입력하세요',
    peopleCount: n => `총 ${n}명`, itemCount: n => `총 ${n}개`,
    howMany: '뽑을 인원', pickLine: (n, c) => `총 ${n}명 · ${c}명 뽑기`,
    drumroll: '두구두구두구…', whoWillIt: '누가 뽑힐까요? 🎯',
    drawing: '뽑는 중…', drawAgain: '🎯 다시 뽑기', draw: '🎯 뽑기 시작!',
    shuffleOrder: '🔀 순서 정하기',
    teamCount: '팀 개수', makeTeams: '👥 팀 나누기', teamLabel: (i, n) => `${i}팀 · ${n}명`,
    min: '최소', max: '최대', count: '개수', noDuplicates: '중복 없이 뽑기',
    generate: '🔢 숫자 뽑기', lottery: '🍀 로또 번호 (1~45 중 6개)',
    luckyNumbers: '이번 주 행운의 번호 🍀', result: '결과',
    coinTab: '🪙 동전', diceTab: '🎲 주사위', heads: '앞', tails: '뒤',
    coinResult: f => `${f}면!`, flipping: '던지는 중…', flip: '동전 던지기',
    diceCount: '주사위 개수', diceTotal: n => `합계 ${n}`, rolling: '굴리는 중…', roll: '주사위 굴리기',
    ladderNames: ['철수', '영희', '민수', '지연'],
    ladderResults: ['🎁 선물', '💸 벌금', '☕ 커피', '😆 통과'],
    reshuffle: '🔀 사다리 다시 섞기', players: '참가자', results: '결과',
    playerPlaceholder: i => `참가 ${i}`, resultPlaceholder: i => `결과 ${i}`,
    newPlayer: i => `참가${i}`, newResult: '결과', fewer: '− 줄이기', more: '+ 추가',
    santaPlaceholder: '참가자 이름을 한 줄에 하나씩 (3명 이상)',
    santaDuplicate: '이름이 겹쳐요. 구분되게 입력해 주세요(예: 김철수, 이철수).',
    santaDraw: '🎁 마니또 뽑기',
    santaHint: '뽑은 뒤 폰을 돌려가며 각자 자기 마니또만 몰래 확인하세요.',
    santaMatched: '배정 완료! 🎁', santaTapName: '이름을 눌러 각자 자기 마니또를 확인하세요',
    santaOnly: n => `${n}님만 보세요 🤫`, santaReveal: '🎁 내 마니또 확인하기',
    santaYourMatch: '당신의 마니또는', santaGotIt: '확인했어요, 닫기',
  },

  en: {
    eyebrow: 'Random Picker', hubTitle: 'Random Tools',
    hubLead: 'Let chance decide — fair, instant, free.',
    hubFoot: 'Free random decision tools',
    metaTitle: 'Random Picker Tools — Wheel, Name Picker, Dice & More',
    metaDesc: 'Free random decision tools: spin the wheel, ghost leg ladder, random name picker, team generator, number generator, coin flip, dice roller and Secret Santa. Instant, no sign-up.',
    privacyNote: 'Results are generated live in your browser with real randomness. Nothing you enter is stored or sent.',
    aboutTitle: n => `About the ${n}`,
    moreTools: 'More tools',
    spin: 'Spin 🎡', spinning: 'Spinning…', winner: 'Winner 🎉',
    optionPlaceholder: i => `Option ${i}`, addOption: '+ Add option', remove: 'Remove',
    rouletteDefaults: ['Pizza', 'Burgers', 'Sushi', 'Tacos', 'Salad', 'Ramen'],
    presets: [
      { label: 'Lunch', items: ['Pizza', 'Burgers', 'Sushi', 'Tacos', 'Salad', 'Pasta', 'BBQ', 'Ramen'] },
      { label: 'Yes / No', items: ['Yes', 'No'] },
      { label: 'Dare', items: ['Sing', 'Dance', 'Push-ups', 'Tell a joke', 'Skip', 'Free pass'] },
      { label: 'Who pays', items: ['#1', '#2', '#3', '#4'] },
    ],
    sampleNames: ['Alex', 'Sam', 'Jordan', 'Taylor', 'Jamie', 'Casey', 'Riley', 'Morgan'],
    listPlaceholder: 'One per line, or separated by commas',
    peopleCount: n => `${n} people`, itemCount: n => `${n} items`,
    howMany: 'How many', pickLine: (n, c) => `${n} names · pick ${c}`,
    drumroll: 'drumroll…', whoWillIt: 'Who will it be? 🎯',
    drawing: 'Drawing…', drawAgain: '🎯 Draw again', draw: '🎯 Draw!',
    shuffleOrder: '🔀 Shuffle order',
    teamCount: 'Teams', makeTeams: '👥 Make teams', teamLabel: (i, n) => `Team ${i} · ${n}`,
    min: 'Min', max: 'Max', count: 'Count', noDuplicates: 'No duplicates',
    generate: '🔢 Generate numbers', lottery: '🍀 Lottery (6 of 1–45)',
    luckyNumbers: 'Your lucky numbers 🍀', result: 'Result',
    coinTab: '🪙 Coin', diceTab: '🎲 Dice', heads: 'Heads', tails: 'Tails',
    coinResult: f => `${f}!`, flipping: 'Flipping…', flip: 'Flip coin',
    diceCount: 'Dice', diceTotal: n => `Total ${n}`, rolling: 'Rolling…', roll: 'Roll dice',
    ladderNames: ['Alex', 'Sam', 'Jordan', 'Taylor'],
    ladderResults: ['🎁 Gift', '💸 Pay', '☕ Coffee', '😆 Free'],
    reshuffle: '🔀 Reshuffle ladder', players: 'Players', results: 'Results',
    playerPlaceholder: i => `Player ${i}`, resultPlaceholder: i => `Result ${i}`,
    newPlayer: i => `Player ${i}`, newResult: 'Result', fewer: '− Remove', more: '+ Add',
    santaPlaceholder: 'One name per line (3 or more)',
    santaDuplicate: 'Duplicate names — make them unique (e.g. John S, John K).',
    santaDraw: '🎁 Draw Secret Santa',
    santaHint: 'After drawing, pass the phone around so each person privately checks their own match.',
    santaMatched: 'All matched! 🎁', santaTapName: 'Tap your name to see your match',
    santaOnly: n => `${n} only 🤫`, santaReveal: '🎁 Reveal my match',
    santaYourMatch: 'Your match is', santaGotIt: 'Got it, close',
  },

  es: {
    eyebrow: 'Sorteo', hubTitle: 'Herramientas de azar',
    hubLead: 'Deja que decida la suerte — justo, al instante y gratis.',
    hubFoot: 'Herramientas de decisión al azar, gratis',
    metaTitle: 'Sorteos al azar — ruleta, sorteo de nombres, dados y más',
    metaDesc: 'Herramientas gratis para decidir al azar: ruleta, amidakuji, sorteo de nombres, generador de equipos, números aleatorios, cara o cruz, dados y amigo invisible. Al instante y sin registro.',
    privacyNote: 'Los resultados se generan en tu navegador en el momento. Nada de lo que escribes se guarda ni se envía.',
    aboutTitle: n => `Sobre ${n}`,
    moreTools: 'Más herramientas',
    spin: 'Girar 🎡', spinning: 'Girando…', winner: 'Ganador 🎉',
    optionPlaceholder: i => `Opción ${i}`, addOption: '+ Añadir opción', remove: 'Quitar',
    rouletteDefaults: ['Pizza', 'Hamburguesa', 'Sushi', 'Tacos', 'Ensalada', 'Ramen'],
    presets: [
      { label: 'Comida', items: ['Pizza', 'Hamburguesa', 'Sushi', 'Tacos', 'Ensalada', 'Pasta', 'Asado', 'Ramen'] },
      { label: 'Sí / No', items: ['Sí', 'No'] },
      { label: 'Prenda', items: ['Cantar', 'Bailar', 'Flexiones', 'Contar un chiste', 'Pasar', 'Te salvas'] },
      { label: 'Quién paga', items: ['N.º 1', 'N.º 2', 'N.º 3', 'N.º 4'] },
    ],
    sampleNames: ['Alejandro', 'Sofía', 'Mateo', 'Lucía', 'Diego', 'Valeria', 'Pablo', 'Carmen'],
    listPlaceholder: 'Uno por línea, o separados por comas',
    peopleCount: n => `${n} personas`, itemCount: n => `${n} elementos`,
    howMany: 'Cuántos', pickLine: (n, c) => `${n} nombres · sacar ${c}`,
    drumroll: 'redoble…', whoWillIt: '¿Quién será? 🎯',
    drawing: 'Sorteando…', drawAgain: '🎯 Sortear otra vez', draw: '🎯 ¡Sortear!',
    shuffleOrder: '🔀 Ordenar al azar',
    teamCount: 'Equipos', makeTeams: '👥 Hacer equipos', teamLabel: (i, n) => `Equipo ${i} · ${n}`,
    min: 'Mín', max: 'Máx', count: 'Cantidad', noDuplicates: 'Sin repetidos',
    generate: '🔢 Generar números', lottery: '🍀 Lotería (6 de 1–45)',
    luckyNumbers: 'Tus números de la suerte 🍀', result: 'Resultado',
    coinTab: '🪙 Moneda', diceTab: '🎲 Dados', heads: 'Cara', tails: 'Cruz',
    coinResult: f => `¡${f}!`, flipping: 'Lanzando…', flip: 'Lanzar moneda',
    diceCount: 'Dados', diceTotal: n => `Total ${n}`, rolling: 'Tirando…', roll: 'Tirar dados',
    ladderNames: ['Alejandro', 'Sofía', 'Mateo', 'Lucía'],
    ladderResults: ['🎁 Regalo', '💸 Paga', '☕ Café', '😆 Libre'],
    reshuffle: '🔀 Rehacer la escalera', players: 'Participantes', results: 'Resultados',
    playerPlaceholder: i => `Participante ${i}`, resultPlaceholder: i => `Resultado ${i}`,
    newPlayer: i => `Participante ${i}`, newResult: 'Resultado', fewer: '− Quitar', more: '+ Añadir',
    santaPlaceholder: 'Un nombre por línea (3 o más)',
    santaDuplicate: 'Hay nombres repetidos. Escríbelos de forma que se distingan (por ejemplo, Ana G. y Ana M.).',
    santaDraw: '🎁 Sortear amigo invisible',
    santaHint: 'Después del sorteo, pasad el móvil para que cada uno vea en privado a quién le ha tocado.',
    santaMatched: '¡Sorteo hecho! 🎁', santaTapName: 'Toca tu nombre para ver a quién te ha tocado',
    santaOnly: n => `Solo ${n} 🤫`, santaReveal: '🎁 Ver a quién me ha tocado',
    santaYourMatch: 'Te ha tocado', santaGotIt: 'Ya está, cerrar',
  },

  'pt-br': {
    eyebrow: 'Sorteio', hubTitle: 'Ferramentas de sorteio',
    hubLead: 'Deixe a sorte decidir — justo, na hora e de graça.',
    hubFoot: 'Ferramentas de decisão aleatória, grátis',
    metaTitle: 'Sorteio aleatório — roleta, sorteio de nomes, dados e mais',
    metaDesc: 'Ferramentas grátis para decidir no aleatório: roleta, jogo da escadinha, sorteio de nomes, gerador de times, números aleatórios, cara ou coroa, dados e amigo secreto. Na hora e sem cadastro.',
    privacyNote: 'Os resultados são gerados no seu navegador na hora. Nada do que você digita é guardado nem enviado.',
    aboutTitle: n => `Sobre ${n}`,
    moreTools: 'Mais ferramentas',
    spin: 'Girar 🎡', spinning: 'Girando…', winner: 'Ganhador 🎉',
    optionPlaceholder: i => `Opção ${i}`, addOption: '+ Adicionar opção', remove: 'Remover',
    rouletteDefaults: ['Pizza', 'Hambúrguer', 'Sushi', 'Feijoada', 'Salada', 'Lámen'],
    presets: [
      { label: 'Almoço', items: ['Pizza', 'Hambúrguer', 'Sushi', 'Feijoada', 'Salada', 'Massa', 'Churrasco', 'Lámen'] },
      { label: 'Sim / Não', items: ['Sim', 'Não'] },
      { label: 'Prenda', items: ['Cantar', 'Dançar', 'Flexões', 'Contar uma piada', 'Passar', 'Escapou'] },
      { label: 'Quem paga', items: ['N.º 1', 'N.º 2', 'N.º 3', 'N.º 4'] },
    ],
    sampleNames: ['João', 'Maria', 'Pedro', 'Ana', 'Lucas', 'Beatriz', 'Rafael', 'Juliana'],
    listPlaceholder: 'Um por linha, ou separados por vírgula',
    peopleCount: n => `${n} pessoas`, itemCount: n => `${n} itens`,
    howMany: 'Quantos', pickLine: (n, c) => `${n} nomes · sortear ${c}`,
    drumroll: 'rufem os tambores…', whoWillIt: 'Quem será? 🎯',
    drawing: 'Sorteando…', drawAgain: '🎯 Sortear de novo', draw: '🎯 Sortear!',
    shuffleOrder: '🔀 Definir a ordem',
    teamCount: 'Times', makeTeams: '👥 Formar times', teamLabel: (i, n) => `Time ${i} · ${n}`,
    min: 'Mín', max: 'Máx', count: 'Quantidade', noDuplicates: 'Sem repetir',
    generate: '🔢 Gerar números', lottery: '🍀 Loteria (6 de 1–45)',
    luckyNumbers: 'Seus números da sorte 🍀', result: 'Resultado',
    coinTab: '🪙 Moeda', diceTab: '🎲 Dados', heads: 'Cara', tails: 'Coroa',
    coinResult: f => `${f}!`, flipping: 'Jogando…', flip: 'Jogar moeda',
    diceCount: 'Dados', diceTotal: n => `Total ${n}`, rolling: 'Rolando…', roll: 'Rolar dados',
    ladderNames: ['João', 'Maria', 'Pedro', 'Ana'],
    ladderResults: ['🎁 Presente', '💸 Paga', '☕ Café', '😆 Livre'],
    reshuffle: '🔀 Refazer a escadinha', players: 'Participantes', results: 'Resultados',
    playerPlaceholder: i => `Participante ${i}`, resultPlaceholder: i => `Resultado ${i}`,
    newPlayer: i => `Participante ${i}`, newResult: 'Resultado', fewer: '− Remover', more: '+ Adicionar',
    santaPlaceholder: 'Um nome por linha (3 ou mais)',
    santaDuplicate: 'Há nomes repetidos. Escreva de um jeito que dê para distinguir (por exemplo, Ana S. e Ana C.).',
    santaDraw: '🎁 Sortear amigo secreto',
    santaHint: 'Depois do sorteio, passem o celular para cada um ver em segredo quem tirou.',
    santaMatched: 'Sorteio feito! 🎁', santaTapName: 'Toque no seu nome para ver quem você tirou',
    santaOnly: n => `Só ${n} 🤫`, santaReveal: '🎁 Ver quem eu tirei',
    santaYourMatch: 'Você tirou', santaGotIt: 'Entendi, fechar',
  },

  ja: {
    eyebrow: 'ランダム', hubTitle: 'ランダム選び',
    hubLead: '迷ったら運に任せましょう — 公平に、すぐに、無料で。',
    hubFoot: '無料のランダム決定ツール',
    metaTitle: 'ランダム選び — ルーレット・あみだくじ・チーム分け・サイコロ',
    metaDesc: 'ルーレット、あみだくじ、名前抽選、チーム分け、乱数、コイントス、サイコロ、シークレットサンタまで。インストール不要ですぐ使える無料のランダム決定ツール。',
    privacyNote: '結果はブラウザ上でその場で作られます。入力した内容は保存も送信もされません。',
    aboutTitle: n => `${n}について`,
    moreTools: 'ほかのツール',
    spin: '回す 🎡', spinning: '回転中…', winner: '当たり 🎉',
    optionPlaceholder: i => `項目 ${i}`, addOption: '+ 項目を追加', remove: '削除',
    rouletteDefaults: ['ラーメン', 'カレー', '寿司', 'ピザ', '焼肉', 'パスタ'],
    presets: [
      { label: 'ランチ', items: ['ラーメン', 'カレー', '寿司', 'ピザ', '焼肉', 'パスタ', '定食', 'そば'] },
      { label: 'はい / いいえ', items: ['はい', 'いいえ'] },
      { label: '罰ゲーム', items: ['歌う', '踊る', '腕立て', '一発ギャグ', 'パス', '免除'] },
      { label: '誰がおごる', items: ['1番', '2番', '3番', '4番'] },
    ],
    sampleNames: ['太郎', '花子', '健太', 'さくら', '大輔', '美咲', '翔太', '結衣'],
    listPlaceholder: '1行に1つ、またはカンマ区切りで入力してください',
    peopleCount: n => `${n}人`, itemCount: n => `${n}件`,
    howMany: '選ぶ人数', pickLine: (n, c) => `${n}人中 ${c}人を選ぶ`,
    drumroll: 'ドコドコドコ…', whoWillIt: '誰が選ばれる？🎯',
    drawing: '抽選中…', drawAgain: '🎯 もう一度', draw: '🎯 抽選する！',
    shuffleOrder: '🔀 順番を決める',
    teamCount: 'チーム数', makeTeams: '👥 チーム分け', teamLabel: (i, n) => `${i}チーム · ${n}人`,
    min: '最小', max: '最大', count: '個数', noDuplicates: '重複なし',
    generate: '🔢 数字を出す', lottery: '🍀 ロト番号（1〜45から6個）',
    luckyNumbers: '今週のラッキーナンバー 🍀', result: '結果',
    coinTab: '🪙 コイン', diceTab: '🎲 サイコロ', heads: '表', tails: '裏',
    coinResult: f => `${f}！`, flipping: '投げ中…', flip: 'コインを投げる',
    diceCount: 'サイコロの数', diceTotal: n => `合計 ${n}`, rolling: '振り中…', roll: 'サイコロを振る',
    ladderNames: ['太郎', '花子', '健太', 'さくら'],
    ladderResults: ['🎁 プレゼント', '💸 おごり', '☕ コーヒー', '😆 セーフ'],
    reshuffle: '🔀 あみだを引き直す', players: '参加者', results: '結果',
    playerPlaceholder: i => `参加者 ${i}`, resultPlaceholder: i => `結果 ${i}`,
    newPlayer: i => `参加者${i}`, newResult: '結果', fewer: '− 減らす', more: '+ 増やす',
    santaPlaceholder: '参加者の名前を1行に1つ（3人以上）',
    santaDuplicate: '同じ名前があります。区別できるように入力してください（例：田中A、田中B）。',
    santaDraw: '🎁 シークレットサンタを決める',
    santaHint: '決めたあとはスマホを回して、各自が自分の相手だけをこっそり確認してください。',
    santaMatched: '割り当て完了！🎁', santaTapName: '名前を押して自分の相手を確認してください',
    santaOnly: n => `${n}さんだけ見てください 🤫`, santaReveal: '🎁 自分の相手を見る',
    santaYourMatch: 'あなたの相手は', santaGotIt: '確認しました、閉じる',
  },

  de: {
    eyebrow: 'Zufall', hubTitle: 'Zufallswerkzeuge',
    hubLead: 'Lass den Zufall entscheiden — fair, sofort, kostenlos.',
    hubFoot: 'Kostenlose Werkzeuge für Zufallsentscheidungen',
    metaTitle: 'Zufallsgenerator — Glücksrad, Namen ziehen, Würfel und mehr',
    metaDesc: 'Kostenlose Werkzeuge für Zufallsentscheidungen: Glücksrad, Amidakuji-Leiter, Namen ziehen, Teams bilden, Zufallszahlen, Münzwurf, Würfel und Wichteln. Sofort, ohne Anmeldung.',
    privacyNote: 'Die Ergebnisse entstehen direkt in deinem Browser. Was du eingibst, wird weder gespeichert noch verschickt.',
    aboutTitle: n => `Über ${n}`,
    moreTools: 'Weitere Werkzeuge',
    spin: 'Drehen 🎡', spinning: 'Dreht…', winner: 'Gewinner 🎉',
    optionPlaceholder: i => `Option ${i}`, addOption: '+ Option hinzufügen', remove: 'Entfernen',
    rouletteDefaults: ['Pizza', 'Burger', 'Sushi', 'Döner', 'Salat', 'Pasta'],
    presets: [
      { label: 'Mittagessen', items: ['Pizza', 'Burger', 'Sushi', 'Döner', 'Salat', 'Pasta', 'Grillen', 'Ramen'] },
      { label: 'Ja / Nein', items: ['Ja', 'Nein'] },
      { label: 'Aufgabe', items: ['Singen', 'Tanzen', 'Liegestütze', 'Witz erzählen', 'Aussetzen', 'Freilos'] },
      { label: 'Wer zahlt', items: ['Nr. 1', 'Nr. 2', 'Nr. 3', 'Nr. 4'] },
    ],
    sampleNames: ['Lukas', 'Anna', 'Felix', 'Marie', 'Jonas', 'Lena', 'Paul', 'Sophie'],
    listPlaceholder: 'Eins pro Zeile, oder mit Komma getrennt',
    peopleCount: n => `${n} Personen`, itemCount: n => `${n} Einträge`,
    howMany: 'Wie viele', pickLine: (n, c) => `${n} Namen · ${c} ziehen`,
    drumroll: 'Trommelwirbel…', whoWillIt: 'Wer wird es? 🎯',
    drawing: 'Wird gezogen…', drawAgain: '🎯 Nochmal ziehen', draw: '🎯 Ziehen!',
    shuffleOrder: '🔀 Reihenfolge auslosen',
    teamCount: 'Teams', makeTeams: '👥 Teams bilden', teamLabel: (i, n) => `Team ${i} · ${n}`,
    min: 'Min', max: 'Max', count: 'Anzahl', noDuplicates: 'Ohne Wiederholung',
    generate: '🔢 Zahlen ziehen', lottery: '🍀 Lotto (6 aus 1–45)',
    luckyNumbers: 'Deine Glückszahlen 🍀', result: 'Ergebnis',
    coinTab: '🪙 Münze', diceTab: '🎲 Würfel', heads: 'Kopf', tails: 'Zahl',
    coinResult: f => `${f}!`, flipping: 'Wirft…', flip: 'Münze werfen',
    diceCount: 'Würfel', diceTotal: n => `Summe ${n}`, rolling: 'Würfelt…', roll: 'Würfeln',
    ladderNames: ['Lukas', 'Anna', 'Felix', 'Marie'],
    ladderResults: ['🎁 Geschenk', '💸 Zahlt', '☕ Kaffee', '😆 Frei'],
    reshuffle: '🔀 Leiter neu mischen', players: 'Teilnehmer', results: 'Ergebnisse',
    playerPlaceholder: i => `Teilnehmer ${i}`, resultPlaceholder: i => `Ergebnis ${i}`,
    newPlayer: i => `Teilnehmer ${i}`, newResult: 'Ergebnis', fewer: '− Weniger', more: '+ Mehr',
    santaPlaceholder: 'Ein Name pro Zeile (mindestens 3)',
    santaDuplicate: 'Doppelte Namen — schreib sie unterscheidbar (zum Beispiel Anna K. und Anna M.).',
    santaDraw: '🎁 Wichtel auslosen',
    santaHint: 'Nach der Auslosung das Handy herumreichen, damit jede Person nur den eigenen Namen aufdeckt.',
    santaMatched: 'Alles zugeteilt! 🎁', santaTapName: 'Tipp auf deinen Namen, um zu sehen, wen du hast',
    santaOnly: n => `Nur ${n} 🤫`, santaReveal: '🎁 Meinen Wichtel aufdecken',
    santaYourMatch: 'Du beschenkst', santaGotIt: 'Alles klar, schließen',
  },

  fr: {
    eyebrow: 'Hasard', hubTitle: 'Outils de tirage au sort',
    hubLead: 'Laisse le hasard trancher — équitable, immédiat, gratuit.',
    hubFoot: 'Outils gratuits pour décider au hasard',
    metaTitle: 'Tirage au sort — roue, tirage de noms, dés et plus',
    metaDesc: 'Outils gratuits pour décider au hasard : roue de la fortune, amidakuji, tirage de noms, générateur d’équipes, nombres aléatoires, pile ou face, dés et Père Noël secret. Immédiat, sans inscription.',
    privacyNote: 'Les résultats sont générés à la volée dans ton navigateur. Rien de ce que tu saisis n’est conservé ni envoyé.',
    aboutTitle: n => `À propos de ${n}`,
    moreTools: 'Autres outils',
    spin: 'Tourner 🎡', spinning: 'Ça tourne…', winner: 'Gagnant 🎉',
    optionPlaceholder: i => `Option ${i}`, addOption: '+ Ajouter une option', remove: 'Retirer',
    rouletteDefaults: ['Pizza', 'Burger', 'Sushi', 'Crêpes', 'Salade', 'Pâtes'],
    presets: [
      { label: 'Déjeuner', items: ['Pizza', 'Burger', 'Sushi', 'Crêpes', 'Salade', 'Pâtes', 'Barbecue', 'Ramen'] },
      { label: 'Oui / Non', items: ['Oui', 'Non'] },
      { label: 'Gage', items: ['Chanter', 'Danser', 'Pompes', 'Raconter une blague', 'Passer', 'Épargné'] },
      { label: 'Qui paie', items: ['N° 1', 'N° 2', 'N° 3', 'N° 4'] },
    ],
    sampleNames: ['Lucas', 'Emma', 'Hugo', 'Chloé', 'Louis', 'Léa', 'Jules', 'Manon'],
    listPlaceholder: 'Un par ligne, ou séparés par des virgules',
    peopleCount: n => `${n} personnes`, itemCount: n => `${n} éléments`,
    howMany: 'Combien', pickLine: (n, c) => `${n} noms · en tirer ${c}`,
    drumroll: 'roulement de tambour…', whoWillIt: 'Qui sera-ce ? 🎯',
    drawing: 'Tirage…', drawAgain: '🎯 Retirer au sort', draw: '🎯 Tirer !',
    shuffleOrder: '🔀 Tirer l’ordre',
    teamCount: 'Équipes', makeTeams: '👥 Former les équipes', teamLabel: (i, n) => `Équipe ${i} · ${n}`,
    min: 'Min', max: 'Max', count: 'Nombre', noDuplicates: 'Sans doublon',
    generate: '🔢 Générer des nombres', lottery: '🍀 Loto (6 parmi 1–45)',
    luckyNumbers: 'Tes numéros porte-bonheur 🍀', result: 'Résultat',
    coinTab: '🪙 Pièce', diceTab: '🎲 Dés', heads: 'Pile', tails: 'Face',
    coinResult: f => `${f} !`, flipping: 'Lancer…', flip: 'Lancer la pièce',
    diceCount: 'Dés', diceTotal: n => `Total ${n}`, rolling: 'Ça roule…', roll: 'Lancer les dés',
    ladderNames: ['Lucas', 'Emma', 'Hugo', 'Chloé'],
    ladderResults: ['🎁 Cadeau', '💸 Paie', '☕ Café', '😆 Libre'],
    reshuffle: '🔀 Refaire l’échelle', players: 'Participants', results: 'Résultats',
    playerPlaceholder: i => `Participant ${i}`, resultPlaceholder: i => `Résultat ${i}`,
    newPlayer: i => `Participant ${i}`, newResult: 'Résultat', fewer: '− Retirer', more: '+ Ajouter',
    santaPlaceholder: 'Un nom par ligne (3 minimum)',
    santaDuplicate: 'Des noms se répètent. Écris-les de façon distincte (par exemple Marie D. et Marie L.).',
    santaDraw: '🎁 Tirer le Père Noël secret',
    santaHint: 'Après le tirage, faites passer le téléphone pour que chacun découvre seulement son propre nom.',
    santaMatched: 'Tirage terminé ! 🎁', santaTapName: 'Touche ton nom pour voir à qui tu offres',
    santaOnly: n => `${n} uniquement 🤫`, santaReveal: '🎁 Découvrir mon tirage',
    santaYourMatch: 'Tu offres à', santaGotIt: 'C’est noté, fermer',
  },

  hi: {
    eyebrow: 'रैंडम', hubTitle: 'रैंडम चुनने के उपकरण',
    hubLead: 'तय न हो तो किस्मत पर छोड़ दें — निष्पक्ष, तुरंत, मुफ़्त।',
    hubFoot: 'मुफ़्त रैंडम निर्णय उपकरण',
    metaTitle: 'रैंडम चुनाव — चक्का, नाम निकालना, पासा और बहुत कुछ',
    metaDesc: 'रैंडम फ़ैसले के मुफ़्त उपकरण: घूमने वाला चक्का, सीढ़ी खेल, नाम निकालना, टीम बनाना, रैंडम संख्या, सिक्का उछालना, पासा और सीक्रेट सैंटा। तुरंत, बिना खाता बनाए।',
    privacyNote: 'परिणाम आपके ब्राउज़र में उसी समय बनते हैं। आप जो लिखते हैं वह न सहेजा जाता है, न कहीं भेजा जाता है।',
    aboutTitle: n => `${n} के बारे में`,
    moreTools: 'और उपकरण',
    spin: 'घुमाएँ 🎡', spinning: 'घूम रहा है…', winner: 'विजेता 🎉',
    optionPlaceholder: i => `विकल्प ${i}`, addOption: '+ विकल्प जोड़ें', remove: 'हटाएँ',
    rouletteDefaults: ['बिरयानी', 'डोसा', 'पिज़्ज़ा', 'छोले भटूरे', 'थाली', 'नूडल्स'],
    presets: [
      { label: 'दोपहर का खाना', items: ['बिरयानी', 'डोसा', 'पिज़्ज़ा', 'छोले भटूरे', 'थाली', 'नूडल्स', 'पराठा', 'रोल'] },
      { label: 'हाँ / नहीं', items: ['हाँ', 'नहीं'] },
      { label: 'चुनौती', items: ['गाना गाएँ', 'नाचें', 'पुश-अप', 'चुटकुला सुनाएँ', 'छोड़ दें', 'बच गए'] },
      { label: 'कौन देगा', items: ['नं. 1', 'नं. 2', 'नं. 3', 'नं. 4'] },
    ],
    sampleNames: ['आर्यन', 'प्रिया', 'रोहन', 'अनन्या', 'विवेक', 'नेहा', 'कबीर', 'मीरा'],
    listPlaceholder: 'हर पंक्ति में एक, या अल्पविराम से अलग करके लिखें',
    peopleCount: n => `${n} लोग`, itemCount: n => `${n} चीज़ें`,
    howMany: 'कितने', pickLine: (n, c) => `${n} नाम · ${c} चुनें`,
    drumroll: 'ढोल बज रहा है…', whoWillIt: 'कौन निकलेगा? 🎯',
    drawing: 'निकाल रहे हैं…', drawAgain: '🎯 फिर से निकालें', draw: '🎯 निकालें!',
    shuffleOrder: '🔀 क्रम तय करें',
    teamCount: 'टीमें', makeTeams: '👥 टीम बनाएँ', teamLabel: (i, n) => `टीम ${i} · ${n}`,
    min: 'न्यूनतम', max: 'अधिकतम', count: 'गिनती', noDuplicates: 'बिना दोहराव',
    generate: '🔢 संख्या निकालें', lottery: '🍀 लॉटरी (1–45 में से 6)',
    luckyNumbers: 'आपके भाग्यशाली अंक 🍀', result: 'परिणाम',
    coinTab: '🪙 सिक्का', diceTab: '🎲 पासा', heads: 'चित', tails: 'पट',
    coinResult: f => `${f}!`, flipping: 'उछल रहा है…', flip: 'सिक्का उछालें',
    diceCount: 'पासों की संख्या', diceTotal: n => `कुल ${n}`, rolling: 'चल रहा है…', roll: 'पासा फेंकें',
    ladderNames: ['आर्यन', 'प्रिया', 'रोहन', 'अनन्या'],
    ladderResults: ['🎁 तोहफ़ा', '💸 बिल', '☕ कॉफ़ी', '😆 छूट'],
    reshuffle: '🔀 सीढ़ी दोबारा बनाएँ', players: 'खिलाड़ी', results: 'परिणाम',
    playerPlaceholder: i => `खिलाड़ी ${i}`, resultPlaceholder: i => `परिणाम ${i}`,
    newPlayer: i => `खिलाड़ी ${i}`, newResult: 'परिणाम', fewer: '− घटाएँ', more: '+ बढ़ाएँ',
    santaPlaceholder: 'हर पंक्ति में एक नाम (कम से कम 3)',
    santaDuplicate: 'नाम दोहरा रहे हैं। ऐसे लिखें कि फ़र्क़ पता चले (जैसे प्रिया श. और प्रिया व.)।',
    santaDraw: '🎁 सीक्रेट सैंटा निकालें',
    santaHint: 'निकालने के बाद फ़ोन घुमाएँ, हर कोई सिर्फ़ अपना नाम चुपचाप देख ले।',
    santaMatched: 'सब तय हो गया! 🎁', santaTapName: 'अपना नाम दबाकर देखें किसे तोहफ़ा देना है',
    santaOnly: n => `सिर्फ़ ${n} 🤫`, santaReveal: '🎁 अपना नाम देखें',
    santaYourMatch: 'आपको तोहफ़ा देना है', santaGotIt: 'समझ गया, बंद करें',
  },
  'zh-hans': {
    eyebrow: '随机抽选',
    hubTitle: '随机工具',
    hubLead: '让运气来定 — 公平、即时、免费。',
    hubFoot: '免费随机决定工具',
    metaTitle: '随机抽选工具 — 转盘、抽名字、骰子等',
    metaDesc: '免费的随机决定工具：转盘、鬼脚图、随机抽名字、分组、随机数、抛硬币、掷骰子和交换礼物抽签。即时出结果，不用注册。',
    privacyNote: '结果是在你的浏览器里用真随机现场生成的。你填的东西不会被保存，也不会被送出去。',
    aboutTitle: n => `关于${n}`,
    moreTools: '更多工具',
    spin: '转 🎡',
    spinning: '转动中…',
    winner: '中了 🎉',
    optionPlaceholder: i => `选项${i}`,
    addOption: '+ 加一项',
    remove: '移除',
    rouletteDefaults: ['披萨', '汉堡', '寿司', '塔可', '沙拉', '拉面'],
    presets: [
      { label: '午餐', items: ['披萨', '汉堡', '寿司', '塔可', '沙拉', '意面', '烧烤', '拉面'] },
      { label: '是 / 否', items: ['是', '否'] },
      { label: '大冒险', items: ['唱歌', '跳舞', '做俯卧撑', '讲笑话', '跳过', '免罚'] },
      { label: '谁买单', items: ['1号', '2号', '3号', '4号'] },
    ],
    sampleNames: ['小明', '小红', '小刚', '小丽', '小华', '小强', '小芳', '小军'],
    listPlaceholder: '一行一个，或者用逗号隔开',
    peopleCount: n => `${n}人`,
    itemCount: n => `${n}项`,
    howMany: '抽几个',
    pickLine: (n, c) => `${n}个名字 · 抽${c}个`,
    drumroll: '鼓声…',
    whoWillIt: '会是谁呢？🎯',
    drawing: '抽取中…',
    drawAgain: '🎯 再抽一次',
    draw: '🎯 抽！',
    shuffleOrder: '🔀 打乱顺序',
    teamCount: '组数',
    makeTeams: '👥 分组',
    teamLabel: (i, n) => `第${i}组 · ${n}`,
    min: '最小',
    max: '最大',
    count: '个数',
    noDuplicates: '不重复',
    generate: '🔢 生成数字',
    lottery: '🍀 彩票（1–45取6）',
    luckyNumbers: '你的幸运数字 🍀',
    result: '结果',
    coinTab: '🪙 硬币',
    diceTab: '🎲 骰子',
    heads: '正面',
    tails: '反面',
    coinResult: f => `${f}！`,
    flipping: '抛掷中…',
    flip: '抛硬币',
    diceCount: '骰子数',
    diceTotal: n => `合计 ${n}`,
    rolling: '掷骰中…',
    roll: '掷骰子',
    ladderNames: ['小明', '小红', '小刚', '小丽'],
    ladderResults: ['🎁 礼物', '💸 买单', '☕ 咖啡', '😆 免罚'],
    reshuffle: '🔀 重新连线',
    players: '参加者',
    results: '结果',
    playerPlaceholder: i => `参加者${i}`,
    resultPlaceholder: i => `结果${i}`,
    newPlayer: i => `参加者${i}`,
    newResult: '结果',
    fewer: '− 减少',
    more: '+ 增加',
    santaPlaceholder: '一行一个名字（3个以上）',
    santaDuplicate: '有重名 — 请改成不一样的（例如 张三A、张三B）。',
    santaDraw: '🎁 抽交换礼物',
    santaHint: '抽完之后把手机传一圈，每个人自己私下看自己抽到谁。',
    santaMatched: '全部配好了！🎁',
    santaTapName: '点自己的名字看抽到谁',
    santaOnly: n => `只给${n}看 🤫`,
    santaReveal: '🎁 显示我抽到的人',
    santaYourMatch: '你抽到的是',
    santaGotIt: '知道了，关闭',
  },
  'zh-hant': {
    eyebrow: '隨機抽選',
    hubTitle: '隨機工具',
    hubLead: '讓運氣來定 — 公平、即時、免費。',
    hubFoot: '免費隨機決定工具',
    metaTitle: '隨機抽選工具 — 轉盤、抽名字、骰子等',
    metaDesc: '免費的隨機決定工具：轉盤、鬼腳圖、隨機抽名字、分組、隨機數、擲硬幣、擲骰子和交換禮物抽籤。即時出結果，不用註冊。',
    privacyNote: '結果是在你的瀏覽器裡用真隨機現場產生的。你填的東西不會被儲存，也不會被送出去。',
    aboutTitle: n => `關於${n}`,
    moreTools: '更多工具',
    spin: '轉 🎡',
    spinning: '轉動中…',
    winner: '中了 🎉',
    optionPlaceholder: i => `選項${i}`,
    addOption: '+ 加一項',
    remove: '移除',
    rouletteDefaults: ['披薩', '漢堡', '壽司', '塔可', '沙拉', '拉麵'],
    presets: [
      { label: '午餐', items: ['披薩', '漢堡', '壽司', '塔可', '沙拉', '義大利麵', '燒烤', '拉麵'] },
      { label: '是 / 否', items: ['是', '否'] },
      { label: '大冒險', items: ['唱歌', '跳舞', '做伏地挺身', '講笑話', '跳過', '免罰'] },
      { label: '誰買單', items: ['1號', '2號', '3號', '4號'] },
    ],
    sampleNames: ['小明', '小紅', '小剛', '小麗', '小華', '小強', '小芳', '小軍'],
    listPlaceholder: '一行一個，或者用逗號隔開',
    peopleCount: n => `${n}人`,
    itemCount: n => `${n}項`,
    howMany: '抽幾個',
    pickLine: (n, c) => `${n}個名字 · 抽${c}個`,
    drumroll: '鼓聲…',
    whoWillIt: '會是誰呢？🎯',
    drawing: '抽取中…',
    drawAgain: '🎯 再抽一次',
    draw: '🎯 抽！',
    shuffleOrder: '🔀 打亂順序',
    teamCount: '組數',
    makeTeams: '👥 分組',
    teamLabel: (i, n) => `第${i}組 · ${n}`,
    min: '最小',
    max: '最大',
    count: '個數',
    noDuplicates: '不重複',
    generate: '🔢 產生數字',
    lottery: '🍀 彩券（1–45取6）',
    luckyNumbers: '你的幸運數字 🍀',
    result: '結果',
    coinTab: '🪙 硬幣',
    diceTab: '🎲 骰子',
    heads: '正面',
    tails: '反面',
    coinResult: f => `${f}！`,
    flipping: '擲出中…',
    flip: '擲硬幣',
    diceCount: '骰子數',
    diceTotal: n => `合計 ${n}`,
    rolling: '擲骰中…',
    roll: '擲骰子',
    ladderNames: ['小明', '小紅', '小剛', '小麗'],
    ladderResults: ['🎁 禮物', '💸 買單', '☕ 咖啡', '😆 免罰'],
    reshuffle: '🔀 重新連線',
    players: '參加者',
    results: '結果',
    playerPlaceholder: i => `參加者${i}`,
    resultPlaceholder: i => `結果${i}`,
    newPlayer: i => `參加者${i}`,
    newResult: '結果',
    fewer: '− 減少',
    more: '+ 增加',
    santaPlaceholder: '一行一個名字（3個以上）',
    santaDuplicate: '有重名 — 請改成不一樣的（例如 張三A、張三B）。',
    santaDraw: '🎁 抽交換禮物',
    santaHint: '抽完之後把手機傳一圈，每個人自己私下看自己抽到誰。',
    santaMatched: '全部配好了！🎁',
    santaTapName: '點自己的名字看抽到誰',
    santaOnly: n => `只給${n}看 🤫`,
    santaReveal: '🎁 顯示我抽到的人',
    santaYourMatch: '你抽到的是',
    santaGotIt: '知道了，關閉',
  },
};

/**
 * 도구 아홉 종의 언어별 제목·설명.
 *
 * 문화색이 없는 도구라 개념은 그대로 옮기지만 이름은 그 나라에서 부르는 말을 쓴다 —
 * 사다리타기는 일본에서 あみだくじ, 영어권에서 ghost leg, 마니또는 영어권에서
 * Secret Santa, 독일에서 Wichteln이다. 직역하면 검색에서 안 잡힌다.
 */
export interface RandomL10n { title: string; desc: string; long: string; category: string }

export const RANDOM_L10N: Record<Exclude<AnyLocale10, 'ko'>, Record<string, RandomL10n>> = {
  en: {
    roulette: { title: 'Spin the Wheel', desc: 'Add options and spin to pick one at random', category: 'Pick', long: 'Add lunch options, penalties or chores and spin the wheel to decide at random. Includes handy presets like yes/no and food picks. Free and instant.' },
    ladder: { title: 'Ladder Game (Ghost Leg)', desc: 'Connect players to outcomes with a random ladder', category: 'Pick', long: 'Enter players and outcomes to build a random ladder (amidakuji / ghost leg). Tap a name to trace where it leads. Great for chores, gifts and turn order.' },
    pick: { title: 'Random Name Picker', desc: 'Draw winners from a list at random', category: 'Draw', long: 'Paste a list of names or items and draw as many random winners as you like. Perfect for giveaways, picking a presenter or choosing who does the chores.' },
    order: { title: 'Random Order Generator', desc: 'Shuffle a list into a random order', category: 'Draw', long: 'Enter names or items and get them back in a random order. Great for fairly deciding presentation order, game turns or who goes first.' },
    'secret-santa': { title: 'Secret Santa Generator', desc: 'Assign secret gift partners — no one gets themselves', category: 'Draw', long: 'Enter everyone and get a Secret Santa assignment where no one draws themselves. Pass the phone around so each person privately checks their own match. Perfect for holiday parties.' },
    team: { title: 'Random Team Generator', desc: 'Split people into balanced random teams', category: 'Draw', long: 'Enter a list of names and choose how many teams — everyone is split fairly at random. Great for group projects, game teams and study groups.' },
    number: { title: 'Random Number Generator', desc: 'Pick random numbers in any range', category: 'Numbers', long: 'Generate random numbers within any range. Draw several with no duplicates, or use the lottery preset (6 numbers from 1–45). Free and instant.' },
    'coin-dice': { title: 'Coin Flip & Dice Roller', desc: 'Flip a coin or roll dice instantly', category: 'Numbers', long: 'Flip a heads-or-tails coin and roll 1–6 dice in one place. Quick for simple decisions and games — roll several dice at once too.' },
    card: { title: "Card Draw", desc: "Draw at random from a full deck", category: "Draw", long: "Draws random cards from a standard 52-card deck. Because they come from one deck no card ever repeats, so you can use the result straight away for card games or forfeits." },
    rps: { title: "Rock Paper Scissors", desc: "Play against the computer", category: "Pick", long: "Play rock paper scissors without an opponent. Pick a hand and the computer throws one at random, then tells you who won and keeps a running record. All three hands come up equally often." },
    bingo: { title: "Bingo Card Maker", desc: "Random bingo cards from 3×3 to 5×5", category: "Numbers", long: "Builds a random bingo card. No number appears twice, so one call never clears two squares at once. Tap squares to mark them and it counts your completed lines." },
    weighted: { title: "Weighted Draw", desc: "Give each option a different chance", category: "Draw", long: "Draws from a list where each item carries its own weight. A bigger weight is picked more often and zero is never picked, and the chance of each item is shown as a percentage. Handy for prize tiers or a deliberately unfair draw." },
    duty: { title: "Duty Roster Maker", desc: "Take turns fairly, round by round", category: "Draw", long: "Works out who does the cleaning, the presenting or the washing up. Nobody comes up twice before everyone has had a turn, and nobody lands twice in a row when the rounds change. It shows how many turns each person got." },
    'yes-no': { title: "Yes or No Decider", desc: "Let it decide when you cannot", category: "Pick", long: "Decides yes or no for you. You can tilt the odds towards yes, which makes it useful for a different purpose too — watch how you feel about the answer, and if you are disappointed you already knew what you wanted." },
  },
  es: {
    roulette: { title: 'Ruleta de opciones', desc: 'Añade opciones y gira para sacar una al azar', category: 'Elegir', long: 'Escribe opciones de comida, prendas o tareas y gira la ruleta para decidir al azar. Trae ajustes rápidos como sí/no y menú del día. Gratis y al instante.' },
    ladder: { title: 'Amidakuji (escalera japonesa)', desc: 'Une participantes con resultados por una escalera al azar', category: 'Elegir', long: 'Escribe participantes y resultados y se dibuja una escalera al azar (amidakuji). Toca un nombre para seguir su camino. Va bien para tareas, regalos y turnos.' },
    pick: { title: 'Sorteo de nombres', desc: 'Saca ganadores de una lista al azar', category: 'Sortear', long: 'Pega una lista de nombres o elementos y saca tantos ganadores como quieras. Ideal para sorteos, elegir quién presenta o a quién le toca la tarea.' },
    order: { title: 'Generador de orden al azar', desc: 'Baraja una lista y devuelve un orden nuevo', category: 'Sortear', long: 'Escribe nombres o elementos y te los devuelve en orden aleatorio. Va bien para decidir el orden de las presentaciones, los turnos de juego o quién empieza.' },
    'secret-santa': { title: 'Amigo invisible', desc: 'Reparte regalos en secreto — nadie se saca a sí mismo', category: 'Sortear', long: 'Escribe a todo el grupo y el sorteo reparte el amigo invisible sin que nadie se saque a sí mismo. Pasad el móvil para que cada uno vea el suyo en privado. Perfecto para las fiestas.' },
    team: { title: 'Generador de equipos', desc: 'Reparte a las personas en equipos al azar', category: 'Sortear', long: 'Escribe la lista de nombres y elige cuántos equipos: el reparto es aleatorio y equilibrado. Va bien para trabajos en grupo, partidos y grupos de estudio.' },
    number: { title: 'Generador de números aleatorios', desc: 'Saca números al azar en cualquier rango', category: 'Números', long: 'Genera números aleatorios en el rango que quieras. Saca varios sin repetir, o usa el ajuste de lotería (6 números del 1 al 45). Gratis y al instante.' },
    'coin-dice': { title: 'Cara o cruz y dados', desc: 'Lanza una moneda o tira los dados al momento', category: 'Números', long: 'Lanza una moneda a cara o cruz y tira de 1 a 6 dados en el mismo sitio. Rápido para decisiones sencillas y para jugar, con varios dados a la vez.' },
    card: { title: "Sacar cartas", desc: "Saca al azar de una baraja completa", category: "Sortear", long: "Saca cartas al azar de una baraja de 52. Como salen de una sola baraja ninguna carta se repite, así que puedes usar el resultado tal cual para juegos o prendas." },
    rps: { title: "Piedra, papel o tijera", desc: "Juega contra el ordenador", category: "Elegir", long: "Juega a piedra, papel o tijera sin rival. Elige tu jugada, el ordenador saca una al azar y te dice quién gana, llevando el marcador. Las tres jugadas salen por igual." },
    bingo: { title: "Generador de cartones de bingo", desc: "Cartones al azar de 3×3 a 5×5", category: "Números", long: "Crea un cartón de bingo al azar. Ningún número sale dos veces, así que una bola nunca tacha dos casillas a la vez. Toca las casillas para marcarlas y te cuenta las líneas completas." },
    weighted: { title: "Sorteo con pesos", desc: "Da a cada opción una probabilidad distinta", category: "Sortear", long: "Sortea de una lista donde cada elemento lleva su propio peso. Un peso mayor sale más a menudo y cero nunca sale, y se muestra la probabilidad de cada uno en porcentaje. Útil para niveles de premio o un sorteo a propósito desigual." },
    duty: { title: "Generador de turnos", desc: "Turnarse con justicia, ronda a ronda", category: "Sortear", long: "Decide a quién le toca limpiar, presentar o fregar. Nadie sale dos veces antes de que todos hayan tenido su turno, ni dos veces seguidas al cambiar de ronda. Muestra cuántos turnos le tocaron a cada uno." },
    'yes-no': { title: "Decisor de sí o no", desc: "Que decida cuando tú no puedes", category: "Elegir", long: "Decide sí o no por ti. Puedes inclinar la probabilidad hacia el sí, lo que le da otro uso: fíjate en cómo te sientes con la respuesta, y si te decepciona es que ya sabías lo que querías." },
  },
  'pt-br': {
    roulette: { title: 'Roleta de opções', desc: 'Coloque as opções e gire para sortear uma', category: 'Escolher', long: 'Escreva opções de comida, prendas ou tarefas e gire a roleta para decidir no sorteio. Vem com atalhos como sim/não e sugestão de almoço. Grátis e na hora.' },
    ladder: { title: 'Jogo da escadinha (amidakuji)', desc: 'Liga participantes a resultados por uma escada sorteada', category: 'Escolher', long: 'Escreva participantes e resultados e a escada sai sorteada (amidakuji). Toque num nome para seguir o caminho. Bom para tarefas, presentes e ordem de vez.' },
    pick: { title: 'Sorteio de nomes', desc: 'Sorteia ganhadores de uma lista', category: 'Sortear', long: 'Cole uma lista de nomes ou itens e sorteie quantos ganhadores quiser. Ideal para sorteios, escolher quem apresenta ou quem faz a tarefa.' },
    order: { title: 'Gerador de ordem aleatória', desc: 'Embaralha a lista e devolve uma nova ordem', category: 'Sortear', long: 'Escreva nomes ou itens e receba tudo em ordem aleatória. Bom para decidir a ordem das apresentações, os turnos do jogo ou quem começa.' },
    'secret-santa': { title: 'Amigo secreto', desc: 'Sorteia os pares — ninguém tira a si mesmo', category: 'Sortear', long: 'Escreva o grupo todo e o sorteio distribui o amigo secreto sem ninguém tirar a si mesmo. Passem o celular para cada um ver o seu em segredo. Perfeito para a festa de fim de ano.' },
    team: { title: 'Gerador de times', desc: 'Divide as pessoas em times aleatórios', category: 'Sortear', long: 'Escreva a lista de nomes e escolha quantos times: a divisão sai no aleatório e equilibrada. Bom para trabalhos em grupo, peladas e grupos de estudo.' },
    number: { title: 'Gerador de números aleatórios', desc: 'Sorteia números em qualquer intervalo', category: 'Números', long: 'Gera números aleatórios no intervalo que você quiser. Sorteie vários sem repetir, ou use o atalho de loteria (6 números de 1 a 45). Grátis e na hora.' },
    'coin-dice': { title: 'Cara ou coroa e dados', desc: 'Jogue a moeda ou role os dados na hora', category: 'Números', long: 'Jogue cara ou coroa e role de 1 a 6 dados no mesmo lugar. Rápido para decisões simples e para jogar, com vários dados de uma vez.' },
    card: { title: "Tirar cartas", desc: "Tire ao acaso de um baralho completo", category: "Sortear", long: "Tira cartas ao acaso de um baralho de 52. Como vêm de um único baralho, nenhuma carta se repete, então dá para usar o resultado direto em jogos ou prendas." },
    rps: { title: "Pedra, papel e tesoura", desc: "Jogue contra o computador", category: "Escolher", long: "Jogue pedra, papel e tesoura sem adversário. Escolha sua jogada, o computador tira uma ao acaso e diz quem venceu, guardando o placar. As três jogadas saem igualmente." },
    bingo: { title: "Gerador de cartelas de bingo", desc: "Cartelas ao acaso de 3×3 a 5×5", category: "Números", long: "Cria uma cartela de bingo ao acaso. Nenhum número aparece duas vezes, então uma chamada nunca marca duas casas de uma vez. Toque nas casas para marcar e ele conta as linhas completas." },
    weighted: { title: "Sorteio com pesos", desc: "Dê a cada opção uma chance diferente", category: "Sortear", long: "Sorteia de uma lista em que cada item tem seu próprio peso. Um peso maior sai mais vezes e zero nunca sai, e a chance de cada um aparece em porcentagem. Útil para faixas de prêmio ou um sorteio propositalmente desigual." },
    duty: { title: "Gerador de escala", desc: "Revezar com justiça, rodada a rodada", category: "Sortear", long: "Decide quem limpa, quem apresenta ou quem lava a louça. Ninguém sai duas vezes antes de todos terem a vez, nem duas vezes seguidas na virada da rodada. Mostra quantas vezes coube a cada um." },
    'yes-no': { title: "Decisor de sim ou não", desc: "Deixe decidir quando você não consegue", category: "Escolher", long: "Decide sim ou não por você. Dá para inclinar a chance para o sim, o que lhe rende outro uso: repare em como você se sente com a resposta — se ficou decepcionado, você já sabia o que queria." },
  },
  ja: {
    roulette: { title: 'ルーレット', desc: '項目を入れて回し、ランダムに1つ選ぶ', category: '選ぶ', long: 'ランチの候補や罰ゲーム、当番などを入れて回すだけ。はい／いいえやメニュー決めのプリセットもあります。無料ですぐ使えます。' },
    ladder: { title: 'あみだくじ', desc: '参加者と結果をランダムなあみだで結ぶ', category: '選ぶ', long: '参加者と結果を入れるとあみだくじが自動で引かれます。名前を押すとどこにつながるかたどれます。当番決め、プレゼント交換、順番決めに。' },
    pick: { title: '名前の抽選', desc: 'リストからランダムに当選者を選ぶ', category: '抽選', long: '名前や項目のリストを貼り付けて、好きな人数だけランダムに選びます。プレゼント企画、発表者決め、当番決めに向いています。' },
    order: { title: '順番シャッフル', desc: 'リストの順番をランダムに並べ替える', category: '抽選', long: '名前や項目を入れるとランダムな順番で返ってきます。発表の順、ゲームの手番、先攻後攻を公平に決めるのに使えます。' },
    'secret-santa': { title: 'シークレットサンタ', desc: '自分自身に当たらないように相手を割り当てる', category: '抽選', long: '参加者全員を入れると、誰も自分自身に当たらないように相手が決まります。スマホを回して各自が自分の相手だけを確認できます。年末のパーティーに。' },
    team: { title: 'チーム分け', desc: '参加者をランダムなチームに分ける', category: '抽選', long: '名前のリストとチーム数を入れると、人数が偏らないようランダムに分けます。グループ課題、試合、勉強会に向いています。' },
    number: { title: '乱数ジェネレーター', desc: '好きな範囲でランダムな数字を出す', category: '数字', long: '指定した範囲でランダムな数字を出します。重複なしでまとめて出すことも、ロトのプリセット（1〜45から6個）を使うこともできます。無料ですぐ使えます。' },
    'coin-dice': { title: 'コイントス・サイコロ', desc: 'コインを投げる、サイコロを振る', category: '数字', long: '表裏のコイントスと1〜6個のサイコロを同じ画面で。ちょっとした決めごとやゲームに便利で、複数のサイコロも一度に振れます。' },
    card: { title: "カードを引く", desc: "1組から無作為に引きます", category: "抽選", long: "トランプ52枚の1組から無作為にカードを引きます。1組から引くので同じカードは二度出ず、そのままカードゲームや罰ゲームに使えます。" },
    rps: { title: "じゃんけん", desc: "ひとりでじゃんけんできます", category: "選ぶ", long: "相手なしでじゃんけんができます。手を選ぶとコンピューターが無作為に出し、勝敗を教えて戦績を積み上げます。3つの手は同じ割合で出ます。" },
    bingo: { title: "ビンゴ盤メーカー", desc: "3×3から5×5までの無作為ビンゴ盤", category: "数字", long: "無作為のビンゴ盤を作ります。同じ数字は二度入らないので、一つの数字で二マスが同時に消えることがありません。マスを押して消すと揃った列を数えます。" },
    weighted: { title: "重み付き抽選", desc: "項目ごとに確率を変えられます", category: "抽選", long: "項目ごとに重みを変えて抽選します。重みが大きいほどよく出て0は出ず、それぞれの確率を%で表示します。景品の等級や、あえて偏らせた抽選に使えます。" },
    duty: { title: "当番表メーカー", desc: "掃除や発表の当番を順番に、公平に", category: "抽選", long: "掃除・発表・皿洗いの当番を決めます。一巡するまで同じ人は二度当たらず、巡が変わるときも連続しません。人ごとの回数も表示します。" },
    'yes-no': { title: "はい・いいえ決定機", desc: "決められないときに代わりに決めます", category: "選ぶ", long: "はいかいいえを代わりに決めます。「はい」の確率を傾けられるので、別の使い方もできます — 答えが出たときの気持ちを見てください。がっかりしたなら、望みはもう決まっています。" },
  },
  de: {
    roulette: { title: 'Glücksrad', desc: 'Optionen eintragen und drehen — der Zufall wählt', category: 'Wählen', long: 'Trag Essensoptionen, Aufgaben oder Strafen ein und dreh das Rad. Fertige Vorlagen für Ja/Nein und Mittagessen sind dabei. Kostenlos und sofort.' },
    ladder: { title: 'Amidakuji-Leiter', desc: 'Verbindet Teilnehmer und Ergebnisse über eine zufällige Leiter', category: 'Wählen', long: 'Trag Teilnehmer und Ergebnisse ein, und die Leiter (Amidakuji, Ghost Leg) wird zufällig gezogen. Tipp auf einen Namen, um seinem Weg zu folgen. Gut für Aufgaben, Geschenke und Reihenfolge.' },
    pick: { title: 'Namen ziehen', desc: 'Zieht Gewinner zufällig aus einer Liste', category: 'Ziehen', long: 'Füg eine Liste mit Namen oder Einträgen ein und zieh so viele Gewinner, wie du willst. Passt für Verlosungen, für die Wahl der vortragenden Person oder für den Abwasch.' },
    order: { title: 'Zufällige Reihenfolge', desc: 'Mischt eine Liste in eine neue Reihenfolge', category: 'Ziehen', long: 'Trag Namen oder Einträge ein und bekomm sie in zufälliger Reihenfolge zurück. Gut, um Vortragsreihenfolge, Spielzüge oder den Anfang fair zu klären.' },
    'secret-santa': { title: 'Wichteln auslosen', desc: 'Verteilt die Wichtel — niemand zieht sich selbst', category: 'Ziehen', long: 'Trag alle ein, und die Auslosung verteilt die Wichtel so, dass niemand sich selbst zieht. Reicht das Handy herum, damit jede Person nur den eigenen Namen aufdeckt. Perfekt für die Weihnachtsfeier.' },
    team: { title: 'Teams auslosen', desc: 'Teilt Leute zufällig in gleich große Teams', category: 'Ziehen', long: 'Trag die Namen ein und wähl die Anzahl der Teams — aufgeteilt wird zufällig und gleichmäßig. Gut für Gruppenarbeit, Spiele und Lerngruppen.' },
    number: { title: 'Zufallszahlen', desc: 'Zieht Zufallszahlen in jedem Bereich', category: 'Zahlen', long: 'Erzeugt Zufallszahlen in einem beliebigen Bereich. Zieh mehrere ohne Wiederholung, oder nimm die Lotto-Vorlage (6 aus 1–45). Kostenlos und sofort.' },
    'coin-dice': { title: 'Münzwurf und Würfel', desc: 'Münze werfen oder würfeln, sofort', category: 'Zahlen', long: 'Kopf oder Zahl werfen und 1 bis 6 Würfel rollen, alles an einer Stelle. Schnell für einfache Entscheidungen und Spiele, auch mit mehreren Würfeln gleichzeitig.' },
    card: { title: "Karten ziehen", desc: "Zieh zufällig aus einem vollen Deck", category: "Ziehen", long: "Zieht zufällige Karten aus einem 52er-Deck. Da sie aus einem Deck kommen, wiederholt sich keine Karte — das Ergebnis lässt sich direkt für Kartenspiele oder Aufgaben nutzen." },
    rps: { title: "Schere, Stein, Papier", desc: "Spiel gegen den Computer", category: "Wählen", long: "Spiel Schere, Stein, Papier ohne Gegner. Wähle eine Hand, der Computer wirft zufällig und sagt dir, wer gewonnen hat — mit laufender Bilanz. Alle drei Hände kommen gleich oft." },
    bingo: { title: "Bingo-Karten-Generator", desc: "Zufällige Bingokarten von 3×3 bis 5×5", category: "Zahlen", long: "Erstellt eine zufällige Bingokarte. Keine Zahl kommt zweimal vor, eine Ziehung streicht also nie zwei Felder auf einmal. Tippe Felder an, um sie zu markieren — die fertigen Reihen werden gezählt." },
    weighted: { title: "Gewichtete Ziehung", desc: "Gib jeder Option eine eigene Chance", category: "Ziehen", long: "Zieht aus einer Liste, in der jeder Eintrag ein eigenes Gewicht trägt. Größeres Gewicht wird öfter gezogen, null nie — und die Chance jedes Eintrags wird in Prozent angezeigt. Praktisch für Preisstufen oder eine absichtlich ungleiche Ziehung." },
    duty: { title: "Dienstplan-Generator", desc: "Reihum, fair, Runde für Runde", category: "Ziehen", long: "Bestimmt, wer putzt, vorträgt oder abwäscht. Niemand kommt zweimal dran, bevor alle einmal dran waren — und auch nicht zweimal hintereinander beim Rundenwechsel. Zeigt, wie oft jeder dran war." },
    'yes-no': { title: "Ja-oder-Nein-Entscheider", desc: "Lass entscheiden, wenn du nicht kannst", category: "Wählen", long: "Entscheidet Ja oder Nein für dich. Du kannst die Chance Richtung Ja kippen — das gibt ihm noch einen zweiten Zweck: achte darauf, wie sich die Antwort anfühlt. Wenn du enttäuscht bist, wusstest du schon, was du wolltest." },
  },
  fr: {
    roulette: { title: 'Roue de la fortune', desc: 'Ajoute des options et fais tourner pour en tirer une', category: 'Choisir', long: 'Inscris des options de repas, des gages ou des corvées et fais tourner la roue. Des réglages tout prêts existent pour oui/non et le menu du midi. Gratuit et immédiat.' },
    ladder: { title: 'Amidakuji (échelle japonaise)', desc: 'Relie les participants aux résultats par une échelle tirée au sort', category: 'Choisir', long: 'Inscris les participants et les résultats, et l’échelle (amidakuji, ghost leg) se trace au hasard. Touche un nom pour suivre son chemin. Pratique pour les corvées, les cadeaux et l’ordre de passage.' },
    pick: { title: 'Tirage de noms', desc: 'Tire des gagnants au hasard dans une liste', category: 'Tirer', long: 'Colle une liste de noms ou d’éléments et tire autant de gagnants que tu veux. Parfait pour un concours, pour choisir qui présente ou qui fait la vaisselle.' },
    order: { title: 'Ordre aléatoire', desc: 'Mélange une liste et rend un nouvel ordre', category: 'Tirer', long: 'Inscris des noms ou des éléments et récupère-les dans un ordre aléatoire. Pratique pour fixer l’ordre des exposés, les tours de jeu ou qui commence.' },
    'secret-santa': { title: 'Père Noël secret', desc: 'Attribue les cadeaux — personne ne se tire soi-même', category: 'Tirer', long: 'Inscris tout le monde et le tirage attribue le Père Noël secret sans que personne ne se tire soi-même. Faites passer le téléphone pour que chacun découvre le sien en privé. Parfait pour les fêtes.' },
    team: { title: 'Générateur d’équipes', desc: 'Répartit les personnes en équipes tirées au sort', category: 'Tirer', long: 'Inscris la liste des noms et choisis le nombre d’équipes : la répartition est aléatoire et équilibrée. Pratique pour les travaux de groupe, les matchs et les groupes de révision.' },
    number: { title: 'Nombres aléatoires', desc: 'Tire des nombres au hasard dans n’importe quelle plage', category: 'Nombres', long: 'Génère des nombres aléatoires dans la plage de ton choix. Tires-en plusieurs sans doublon, ou utilise le réglage loto (6 numéros parmi 1–45). Gratuit et immédiat.' },
    'coin-dice': { title: 'Pile ou face et dés', desc: 'Lance une pièce ou des dés tout de suite', category: 'Nombres', long: 'Lance une pièce à pile ou face et jette 1 à 6 dés au même endroit. Rapide pour les décisions simples et pour jouer, avec plusieurs dés à la fois.' },
    card: { title: "Tirer des cartes", desc: "Tirez au hasard dans un jeu complet", category: "Tirage", long: "Tire des cartes au hasard dans un jeu de 52. Comme elles viennent d’un seul jeu, aucune carte ne se répète : le résultat est utilisable tel quel pour un jeu ou un gage." },
    rps: { title: "Pierre, feuille, ciseaux", desc: "Jouez contre l’ordinateur", category: "Choisir", long: "Jouez à pierre, feuille, ciseaux sans adversaire. Choisissez votre coup, l’ordinateur en joue un au hasard et vous dit qui gagne, en tenant le score. Les trois coups sortent également." },
    bingo: { title: "Générateur de cartons de bingo", desc: "Cartons au hasard de 3×3 à 5×5", category: "Nombres", long: "Construit un carton de bingo au hasard. Aucun nombre n’apparaît deux fois : un tirage ne raye jamais deux cases d’un coup. Touchez les cases pour les marquer, les lignes complètes sont comptées." },
    weighted: { title: "Tirage pondéré", desc: "Donnez à chaque option une chance différente", category: "Tirage", long: "Tire dans une liste où chaque élément porte son propre poids. Un poids plus grand sort plus souvent, zéro ne sort jamais, et la chance de chacun est affichée en pourcentage. Pratique pour des niveaux de lots ou un tirage volontairement inégal." },
    duty: { title: "Générateur de planning", desc: "Chacun son tour, équitablement", category: "Tirage", long: "Décide qui fait le ménage, la présentation ou la vaisselle. Personne ne revient deux fois avant que tout le monde soit passé, ni deux fois de suite au changement de tour. Affiche le nombre de tours de chacun." },
    'yes-no': { title: "Décideur oui ou non", desc: "Laissez décider quand vous ne pouvez pas", category: "Choisir", long: "Décide oui ou non à votre place. Vous pouvez pencher la probabilité vers le oui, ce qui lui donne un second usage : observez ce que vous ressentez face à la réponse — si vous êtes déçu, vous saviez déjà ce que vous vouliez." },
  },
  hi: {
    roulette: { title: 'घूमने वाला चक्का', desc: 'विकल्प डालें और घुमाकर एक चुनें', category: 'चुनें', long: 'खाने के विकल्प, चुनौतियाँ या काम लिखें और चक्का घुमाकर तय करें। हाँ/नहीं और खाने के तैयार सेट भी हैं। मुफ़्त और तुरंत।' },
    ladder: { title: 'सीढ़ी खेल (अमिदाकुजी)', desc: 'खिलाड़ियों और परिणामों को रैंडम सीढ़ी से जोड़ता है', category: 'चुनें', long: 'खिलाड़ी और परिणाम लिखें, सीढ़ी अपने आप रैंडम बन जाती है। नाम दबाकर देखें रास्ता कहाँ जाता है। काम बाँटने, तोहफ़े और बारी तय करने के लिए।' },
    pick: { title: 'नाम निकालना', desc: 'सूची से रैंडम विजेता निकालें', category: 'निकालें', long: 'नामों या चीज़ों की सूची चिपकाएँ और जितने चाहें उतने विजेता निकालें। लकी ड्रॉ, प्रस्तुति देने वाले का चुनाव या काम बाँटने के लिए बढ़िया।' },
    order: { title: 'रैंडम क्रम', desc: 'सूची को मिलाकर नया क्रम देता है', category: 'निकालें', long: 'नाम या चीज़ें लिखें और उन्हें रैंडम क्रम में वापस पाएँ। प्रस्तुति का क्रम, खेल की बारी या कौन पहले — सब निष्पक्ष तय हो जाता है।' },
    'secret-santa': { title: 'सीक्रेट सैंटा', desc: 'तोहफ़े के जोड़े बनाता है — किसी को अपना नाम नहीं मिलता', category: 'निकालें', long: 'सबके नाम लिखें और सीक्रेट सैंटा ऐसे बँटता है कि किसी को अपना ही नाम न मिले। फ़ोन घुमाएँ ताकि हर कोई सिर्फ़ अपना नाम देखे। पार्टी के लिए बढ़िया।' },
    team: { title: 'टीम बनाना', desc: 'लोगों को रैंडम टीमों में बाँटता है', category: 'निकालें', long: 'नामों की सूची लिखें और टीमों की संख्या चुनें — बँटवारा रैंडम और बराबर होता है। ग्रुप प्रोजेक्ट, मैच और पढ़ाई के समूह के लिए।' },
    number: { title: 'रैंडम संख्या', desc: 'किसी भी दायरे में रैंडम संख्या निकालें', category: 'संख्या', long: 'अपनी पसंद के दायरे में रैंडम संख्याएँ बनाएँ। बिना दोहराव के कई निकालें, या लॉटरी सेट (1–45 में से 6) इस्तेमाल करें। मुफ़्त और तुरंत।' },
    'coin-dice': { title: 'सिक्का और पासा', desc: 'सिक्का उछालें या पासा फेंकें', category: 'संख्या', long: 'चित-पट का सिक्का और 1 से 6 पासे एक ही जगह। छोटे फ़ैसलों और खेल के लिए तेज़, और कई पासे एक साथ भी फेंक सकते हैं।' },
    card: { title: "कार्ड निकालें", desc: "पूरे डेक से बेतरतीब निकालें", category: "ड्रॉ", long: "52 कार्ड के डेक से बेतरतीब कार्ड निकालता है। एक ही डेक से आने के कारण कोई कार्ड दोहराता नहीं, इसलिए परिणाम सीधे खेल या सज़ा तय करने में काम आता है।" },
    rps: { title: "पत्थर, कागज़, कैंची", desc: "कंप्यूटर के ख़िलाफ़ खेलें", category: "चुनें", long: "बिना प्रतिद्वंद्वी के पत्थर-कागज़-कैंची खेलें। अपना हाथ चुनें, कंप्यूटर बेतरतीब एक चलता है और बताता है कौन जीता, साथ में रिकॉर्ड रखता है। तीनों हाथ बराबर आते हैं।" },
    bingo: { title: "बिंगो कार्ड बनाएँ", desc: "3×3 से 5×5 तक बेतरतीब बिंगो कार्ड", category: "संख्याएँ", long: "बेतरतीब बिंगो कार्ड बनाता है। कोई संख्या दो बार नहीं आती, इसलिए एक पुकार से दो ख़ाने एक साथ नहीं कटते। ख़ानों को दबाकर चिह्नित करें, यह पूरी हुई पंक्तियाँ गिनता है।" },
    weighted: { title: "भारित ड्रॉ", desc: "हर विकल्प को अलग संभावना दें", category: "ड्रॉ", long: "ऐसी सूची से निकालता है जिसमें हर मद का अपना भार होता है। बड़ा भार अधिक बार निकलता है और शून्य कभी नहीं, और हर मद की संभावना प्रतिशत में दिखती है। इनाम श्रेणियों या जान-बूझकर असमान ड्रॉ के लिए उपयोगी।" },
    duty: { title: "रोस्टर जनरेटर", desc: "बारी-बारी से, निष्पक्ष रूप से", category: "ड्रॉ", long: "तय करता है कि सफ़ाई, प्रस्तुति या बर्तन किसके ज़िम्मे हैं। सबकी बारी आने से पहले कोई दोबारा नहीं आता, और चक्र बदलने पर भी लगातार दो बार नहीं। हर व्यक्ति को कितनी बार मिला, यह भी दिखाता है।" },
    'yes-no': { title: "हाँ या नहीं तय करने वाला", desc: "जब आप तय न कर पाएँ तो यह करे", category: "चुनें", long: "आपके लिए हाँ या नहीं तय करता है। आप \"हाँ\" की संभावना बढ़ा सकते हैं, जिससे इसका एक और उपयोग बनता है — देखें कि उत्तर पर आपको कैसा लगा; अगर निराशा हुई तो आप पहले से जानते थे कि आप क्या चाहते थे।" },
  },
  'zh-hans': {
    roulette: { title: '转盘', desc: '加上选项，转一下随机挑一个', category: '抽选', long: '把午餐选项、惩罚或家务填进去，转一下转盘随机决定。还带了「是/否」和吃什么这类现成预设。免费，即时出结果。' },
    ladder: { title: '鬼脚图', desc: '用随机的梯子把人和结果连起来', category: '抽选', long: '填上参加者和结果，就画出一张随机的鬼脚图。点一个名字就看得到它通到哪儿。分家务、分礼物、定顺序都好用。' },
    pick: { title: '随机抽名字', desc: '从名单里随机抽出中奖的人', category: '抽签', long: '把名字或项目的名单贴进来，想抽几个就抽几个。抽奖、挑谁上台报告、决定谁做家务都合适。' },
    order: { title: '随机排序', desc: '把名单打乱成随机顺序', category: '抽签', long: '填上名字或项目，它会按随机顺序还给你。定报告顺序、游戏轮次、谁先来都公平。' },
    'secret-santa': { title: '交换礼物抽签', desc: '随机配对送礼对象 — 不会抽到自己', category: '抽签', long: '把所有人填进去，抽出交换礼物的配对，谁都不会抽到自己。把手机传一圈，每个人私下看自己的。年末聚会正合适。' },
    team: { title: '随机分组', desc: '把人随机分成人数平均的几组', category: '抽签', long: '填上名单再选分几组 — 它会公平地随机分开。小组作业、比赛分队、读书会都用得上。' },
    number: { title: '随机数生成器', desc: '在任意范围里抽随机数', category: '数字', long: '在任意范围里生成随机数。可以一次抽好几个且不重复，也能用彩票预设（1–45里取6个）。免费，即时。' },
    'coin-dice': { title: '抛硬币和掷骰子', desc: '立刻抛一枚硬币或掷几颗骰子', category: '数字', long: '正反面的硬币和1到6颗骰子放在一处。做简单决定和玩游戏都快 — 也能一次掷好几颗。' },
    card: { title: "抽扑克牌", desc: "从一整副牌里随机抽取", category: "抽取", long: "从 52 张的一副扑克里随机抽牌。因为来自同一副牌，不会出现重复的牌，结果可以直接用来玩牌或定罚。" },
    rps: { title: "石头剪刀布", desc: "不用对手也能玩石头剪刀布", category: "选择", long: "不用对手也能玩石头剪刀布。选出手势后电脑随机出一个，告诉你谁赢并累计战绩。三种手势出现的机会相同。" },
    bingo: { title: "宾果卡生成器", desc: "3×3 到 5×5 的随机宾果卡", category: "数字", long: "生成随机宾果卡。没有数字出现两次，所以一次报号不会同时划掉两格。点格子标记，它会统计你完成的行数。" },
    weighted: { title: "权重抽奖", desc: "给每个选项不同的中奖概率", category: "抽取", long: "从每项带有各自权重的列表中抽取。权重越大越常被抽中，0 则不会被抽中，并以百分比显示每项的概率。适合奖项分级或刻意不均的抽奖。" },
    duty: { title: "值日表生成器", desc: "打扫、汇报轮流排班，公平到底", category: "抽取", long: "安排谁来打扫、谁来汇报、谁来洗碗。在每个人都轮过之前不会有人轮两次，换轮时也不会连着两次。还会显示每个人轮了几次。" },
    'yes-no': { title: "是否决定器", desc: "拿不定主意时替你决定", category: "选择", long: "替你决定「是」还是「否」。你可以把概率往「是」偏，这也带来了另一种用法——留意你对答案的反应，如果感到失望，说明你早就知道自己想要什么了。" },
  },
  'zh-hant': {
    roulette: { title: '轉盤', desc: '加上選項，轉一下隨機挑一個', category: '抽選', long: '把午餐選項、懲罰或家事填進去，轉一下轉盤隨機決定。還帶了「是/否」和吃什麼這類現成預設。免費，即時出結果。' },
    ladder: { title: '鬼腳圖', desc: '用隨機的梯子把人和結果連起來', category: '抽選', long: '填上參加者和結果，就畫出一張隨機的鬼腳圖。點一個名字就看得到它通到哪兒。分家事、分禮物、定順序都好用。' },
    pick: { title: '隨機抽名字', desc: '從名單裡隨機抽出中獎的人', category: '抽籤', long: '把名字或項目的名單貼進來，想抽幾個就抽幾個。抽獎、挑誰上台報告、決定誰做家事都合適。' },
    order: { title: '隨機排序', desc: '把名單打亂成隨機順序', category: '抽籤', long: '填上名字或項目，它會按隨機順序還給你。定報告順序、遊戲輪次、誰先來都公平。' },
    'secret-santa': { title: '交換禮物抽籤', desc: '隨機配對送禮對象 — 不會抽到自己', category: '抽籤', long: '把所有人填進去，抽出交換禮物的配對，誰都不會抽到自己。把手機傳一圈，每個人私下看自己的。年末聚會正合適。' },
    team: { title: '隨機分組', desc: '把人隨機分成人數平均的幾組', category: '抽籤', long: '填上名單再選分幾組 — 它會公平地隨機分開。小組作業、比賽分隊、讀書會都用得上。' },
    number: { title: '隨機數產生器', desc: '在任意範圍裡抽隨機數', category: '數字', long: '在任意範圍裡產生隨機數。可以一次抽好幾個且不重複，也能用彩券預設（1–45裡取6個）。免費，即時。' },
    'coin-dice': { title: '擲硬幣和擲骰子', desc: '立刻擲一枚硬幣或擲幾顆骰子', category: '數字', long: '正反面的硬幣和1到6顆骰子放在一處。做簡單決定和玩遊戲都快 — 也能一次擲好幾顆。' },
    card: { title: "抽撲克牌", desc: "從一整副牌裡隨機抽取", category: "抽取", long: "從 52 張的一副撲克裡隨機抽牌。因為來自同一副牌，不會出現重複的牌，結果可以直接用來玩牌或定罰。" },
    rps: { title: "剪刀石頭布", desc: "不用對手也能玩剪刀石頭布", category: "選擇", long: "不用對手也能玩剪刀石頭布。選出手勢後電腦隨機出一個，告訴你誰贏並累計戰績。三種手勢出現的機會相同。" },
    bingo: { title: "賓果卡產生器", desc: "3×3 到 5×5 的隨機賓果卡", category: "數字", long: "產生隨機賓果卡。沒有數字出現兩次，所以一次報號不會同時劃掉兩格。點格子標記，它會統計你完成的行數。" },
    weighted: { title: "權重抽獎", desc: "給每個選項不同的中獎機率", category: "抽取", long: "從每項帶有各自權重的清單中抽取。權重越大越常被抽中，0 則不會被抽中，並以百分比顯示每項的機率。適合獎項分級或刻意不均的抽獎。" },
    duty: { title: "值日表產生器", desc: "打掃、報告輪流排班，公平到底", category: "抽取", long: "安排誰來打掃、誰來報告、誰來洗碗。在每個人都輪過之前不會有人輪兩次，換輪時也不會連著兩次。還會顯示每個人輪了幾次。" },
    'yes-no': { title: "是否決定器", desc: "拿不定主意時替你決定", category: "選擇", long: "替你決定「是」還是「否」。你可以把機率往「是」偏，這也帶來了另一種用法——留意你對答案的反應，如果感到失望，說明你早就知道自己想要什麼了。" },
  },
};

/** 그 언어의 도구 문구. 한국어는 데이터의 원문을 쓴다. */
export function randomL10n(slug: string, lang: RandomLang): RandomL10n {
  const tool = RANDOM_TOOLS_MAP[slug];
  if (!tool) throw new Error(`random-ui-intl: 도구가 없다 — ${slug}`);
  return lang === 'ko'
    ? { title: tool.title, desc: tool.desc, long: tool.long, category: tool.category }
    : RANDOM_L10N[lang][slug];
}

/** 허브 라우트의 metadata */
export function randomHubMetaIntl(lang: RandomLang) {
  const ui = RANDOM_UI[lang];
  return withCard({
    title: ui.metaTitle,
    description: ui.metaDesc,
    openGraph: openGraphFor(lang),
    alternates: { canonical: localeHref(lang, '/random'), languages: alternateLanguages10('/random') },
  });
}

/** 도구 라우트의 metadata */
export function randomMetaIntl(lang: RandomLang, slug: string) {
  const t = randomL10n(slug, lang);
  return withCard({
    title: `${t.title} — vixutil`,
    description: t.long,
    openGraph: openGraphFor(lang),
    alternates: {
      canonical: localeHref(lang, `/random/${slug}`),
      languages: alternateLanguages10(`/random/${slug}`),
    },
  });
}
