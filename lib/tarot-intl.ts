/* ────────────────────────────────────────────────
   타로 메이저 아르카나 22장의 영어·중국어 해석.

   카드 id·이모지·색은 fortune-data.ts의 TAROT_CARDS를 그대로 쓰고, 여기에는
   정방향·역방향 해석만 둔다. 같은 시드가 같은 카드를 뽑아야 하므로 배열이
   아니라 id를 키로 하는 표로 만든다.

   카드 이름은 이미 nameEn이 있어 영어는 그대로 쓰고, 중국어만 새로 붙였다.
──────────────────────────────────────────────── */
import { MINOR_READINGS_EN } from './tarot-minor-intl.ts';
import { tarotReadingsOf, tarotNamesOf } from './tarot-l10n.ts';

export type TarotIntlLang = 'en' | 'es' | 'pt-br' | 'ja' | 'de' | 'fr' | 'hi' | 'zh-hans' | 'zh-hant';

/** 영어 말고 여덟 언어 */
const L8 = ['es', 'pt-br', 'ja', 'de', 'fr', 'hi', 'zh-hans', 'zh-hant'] as const;

interface Reading { upright: string; reversed: string }

/** 78장 전체 중국어 이름 — 메이저 22장 + 마이너 56장 */

const MAJOR_READINGS: Record<'en', Record<number, Reading>> = {
  en: {
    0: { upright: 'A card for the start of a journey. You are standing in front of possibility that has not been shaped yet, and what it asks for is the plain courage to take a first step without a complete plan. Trust the instinct and keep the mind open — it tends to lead somewhere better than the plan would have.',
         reversed: 'Enthusiasm may be running ahead of judgement. Either you are about to leap without checking anything, or fear has you standing still while a genuine opening passes. Pause, do the minimum reality check, and then move.' },
    1: { upright: 'You already hold everything needed to make the thing you want. Focus and will are at their peak, which makes this the moment to convert thought into action. Believe your own capability and put the idea into practice without hedging.',
         reversed: 'Ability is going unused, or being pointed the wrong way. Watch for overconfidence, for the urge to manage other people, or for shortcuts. Check the real intention and go at the goal honestly.' },
    2: { upright: 'The deeper truth here is not on the surface. This is a time for listening rather than speaking, feeling rather than acting. Pay attention to the faint signals intuition is sending. Nothing needs rushing — what is hidden surfaces when it is ready.',
         reversed: 'Too much analysis may be clouding judgement. Either intuition and reason are out of balance, or you are overriding your own inner voice. Something may still be concealed — do not force the decision.' },
    3: { upright: 'A period of abundance and creation. Trust the sensitivity and productivity that come naturally. Warmth grows in your close relationships, and new ideas or projects take root. Open the senses and let yourself enjoy what is good.',
         reversed: 'Dependence or a creative block may be showing. Either you are neglecting yourself, or holding on too tightly and trying to control the surroundings. Be more generous with yourself and others, and tend to your own needs.' },
    4: { upright: 'Structure and authority. This is the time to set the rules, define the boundary and take responsibility for the shape of things. Steady effort within a clear framework produces real results now.',
         reversed: 'Rigidity may be doing damage. Either control has hardened into inflexibility, or the absence of any structure is causing the drift. Loosen where you can and firm up where nothing is holding.' },
    5: { upright: 'Tradition, learning and guidance. There is value here in the established way and in someone who has walked the road before. Ask, learn, and let the accumulated wisdom of others save you the detour.',
         reversed: 'Convention may be constraining rather than helping. Question the rule you have been following without examining it — some of it is inherited rather than chosen.' },
    6: { upright: 'A card of connection and of choice. Something meaningful is being aligned, whether in a relationship or in a decision about direction. Choose according to what you actually value rather than what looks right.',
         reversed: 'Discord or an avoided decision. Something in a relationship is out of balance, or a choice is being deferred in the hope it decides itself. Name the value at stake and act on it.' },
    7: { upright: 'Momentum and control. Opposing forces are being held together by will, and progress is possible now through determination. Keep hold of the reins and drive it forward.',
         reversed: 'Direction may be lost, or force is being applied where it does not help. Recheck where you are going before pushing harder — speed in the wrong direction costs more than delay.' },
    8: { upright: 'Quiet strength. Not force, but patience and gentleness that hold their ground. What looks unmanageable yields to steadiness here rather than to pressure.',
         reversed: 'Self-doubt or impatience may be taking over. The strength is still there; the confidence in it has slipped. Go gently with yourself first.' },
    9: { upright: 'Withdrawal and inner search. There is more to gain from solitude and reflection now than from company. Take the time apart and let your own light show the next step.',
         reversed: 'Isolation may have gone past useful. Either you have withdrawn too far, or you are refusing help that is genuinely offered. Let one person in.' },
    10: { upright: 'A turning point. Circumstances are shifting in ways outside your control, and the useful posture is to move with the turn rather than against it. What is beginning now was set in motion earlier.',
         reversed: 'Resistance to change may be costing you. Or a cycle is repeating because the pattern behind it has not been examined. Look at what keeps coming back.' },
    11: { upright: 'Balance and consequence. Things settle according to what actually happened, not what was intended. Act with fairness now and the outcome follows honestly.',
         reversed: 'Something is out of balance, or accountability is being avoided. Look honestly at your own part before assessing anyone else’s.' },
    12: { upright: 'A pause, and a change of perspective. Progress is suspended, but the view from here is different and worth having. Let the waiting do its work rather than forcing motion.',
         reversed: 'Stalling without purpose. The pause has stopped being useful and become avoidance. Something has to move, even if it is small.' },
    13: { upright: 'An ending that makes room. Something is genuinely finishing, and holding on prevents what comes next. This card is rarely about loss for its own sake — it is about clearing.',
         reversed: 'Resisting a necessary ending. Something has already finished in fact but not in acknowledgement, and the gap is where the difficulty sits.' },
    14: { upright: 'Moderation and blending. The answer here is in the middle — combining what seemed opposed, adjusting the proportions rather than choosing a side.',
         reversed: 'Excess or imbalance. Something is tipping too far one way. Bring the proportions back before it costs more.' },
    15: { upright: 'Attachment and constraint. Something is holding you more tightly than you have admitted — a habit, a need, a relationship. The chain in this card is loose; naming it is most of the work.',
         reversed: 'A binding is loosening. Recognition has already begun, and what held you is losing its grip. Keep going.' },
    16: { upright: 'Sudden disruption. Something built on an unsound base gives way, which is painful and also clarifying. What survives this is what was actually solid.',
         reversed: 'A collapse avoided, or one being drawn out. Either you sidestepped it, or you are propping up what would be better let go.' },
    17: { upright: 'Hope and clarity after difficulty. The worst has passed and something quiet and genuine is being restored. Trust the direction — it is steadier than it feels.',
         reversed: 'Hope is running low, or expectation has drifted from what is real. Reconnect with what actually sustains you rather than what you wish were true.' },
    18: { upright: 'Uncertainty and imagination. Not everything here is what it appears, and feeling is colouring perception. Move slowly and check what you think you know.',
         reversed: 'Confusion is lifting. What was unclear is resolving, and the fear attached to it is losing its hold.' },
    19: { upright: 'Clarity, warmth and success. Things are visible for what they are, and what you have built is being recognised. Enjoy it plainly.',
         reversed: 'Optimism may be thin or delayed. The good is still there but obscured. Look for the small clear thing rather than waiting for the whole picture.' },
    20: { upright: 'Reckoning and renewal. Something is being weighed up and a genuine new phase is available. Answer the call honestly rather than defensively.',
         reversed: 'Avoiding an honest assessment. Self-criticism or its opposite is getting in the way of seeing clearly.' },
    21: { upright: 'Completion. A cycle closes properly, with the pieces integrated. What comes next starts from a genuinely finished foundation.',
         reversed: 'Something is nearly done but not closed off. Find the last piece rather than starting the next thing on top of it.' },
  },
};

/**
 * 78장 전체 해석 — 메이저 22장에 마이너 56장을 합친다.
 *
 * fortune-data.ts의 getFullDeck()이 22~77을 마이너에 매기므로 id가 그대로 맞는다.
 * 세 언어가 같은 id를 봐야 같은 카드가 나온다.
 */
export const TAROT_READINGS: Record<TarotIntlLang, Record<number, Reading>> = {
  en: { ...MAJOR_READINGS.en, ...MINOR_READINGS_EN },
  ...Object.fromEntries(L8.map(l => [l, tarotReadingsOf(l)])) as Record<typeof L8[number], Record<number, Reading>>,
};

/**
 * 카드 이름 — 예전에는 화면이 nameEn을 그대로 찍어서, 아홉 언어 어디서나
 * 카드만 영어로 나왔다. 사전과 같은 이름을 쓴다.
 */
export const TAROT_NAMES: Record<TarotIntlLang, Record<number, string>> = {
  en: tarotNamesOf('en'),
  ...Object.fromEntries(L8.map(l => [l, tarotNamesOf(l)])) as Record<typeof L8[number], Record<number, string>>,
};

export const TAROT_UI: Record<TarotIntlLang, {
  dailyTitle: string; dailyLead: string; dailyPrivacy: string;
  yesnoTitle: string; yesnoLead: string; yesnoPrivacy: string;
  draw: string; drawn: string; again: string;
  upright: string; reversed: string;
  yes: string; no: string; maybe: string; question: string;
  disclaimer: string;
}> = {
  en: {
    dailyTitle: 'Today’s Tarot Card',
    dailyLead: 'One card from the 22 major arcana, the same all day',
    dailyPrivacy: 'The card is chosen from today’s date, so it stays the same however many times you reload — and changes when the date does.',
    yesnoTitle: 'Tarot Yes or No',
    yesnoLead: 'Hold a question in mind and draw one card',
    yesnoPrivacy: 'The draw is random each time. Nothing is stored and nothing is sent anywhere.',
    draw: 'Draw a card', drawn: 'Your card', again: '🔄 Draw again',
    upright: 'Upright', reversed: 'Reversed',
    yes: 'Yes', no: 'No', maybe: 'Not yet clear',
    question: 'Think of your question, then draw.',
    disclaimer: 'Tarot is for reflection and entertainment. Make decisions that matter with real information and your own judgement.',
  },
  es: {
    dailyTitle: 'La carta de tarot de hoy',
    dailyLead: 'Una carta de los 22 arcanos mayores, la misma todo el día',
    dailyPrivacy: 'La carta se elige a partir de la fecha de hoy, así que no cambia por muchas veces que recargues, y cambia cuando cambia el día.',
    yesnoTitle: 'Tarot sí o no',
    yesnoLead: 'Ten una pregunta en mente y saca una carta',
    yesnoPrivacy: 'Cada tirada es aleatoria. No se guarda nada ni se envía nada a ninguna parte.',
    draw: 'Sacar una carta', drawn: 'Tu carta', again: '🔄 Sacar otra',
    upright: 'Del derecho', reversed: 'Invertida',
    yes: 'Sí', no: 'No', maybe: 'Aún no está claro',
    question: 'Piensa tu pregunta y saca la carta.',
    disclaimer: 'El tarot sirve para pensar y para entretenerse. Las decisiones que importan tómalas con información real y con tu propio criterio.',
  },
  'pt-br': {
    dailyTitle: 'A carta de tarô de hoje',
    dailyLead: 'Uma carta dos 22 arcanos maiores, a mesma o dia inteiro',
    dailyPrivacy: 'A carta é escolhida pela data de hoje, então ela não muda por mais que você recarregue — e muda quando o dia muda.',
    yesnoTitle: 'Tarô sim ou não',
    yesnoLead: 'Tenha uma pergunta em mente e tire uma carta',
    yesnoPrivacy: 'Cada tiragem é aleatória. Nada é guardado e nada é enviado a lugar nenhum.',
    draw: 'Tirar uma carta', drawn: 'Sua carta', again: '🔄 Tirar outra',
    upright: 'Em pé', reversed: 'Invertida',
    yes: 'Sim', no: 'Não', maybe: 'Ainda não está claro',
    question: 'Pense na sua pergunta e tire a carta.',
    disclaimer: 'O tarô serve para refletir e para entreter. As decisões que importam, tome com informação real e com o seu próprio julgamento.',
  },
  ja: {
    dailyTitle: '今日のタロット',
    dailyLead: '大アルカナ22枚から1枚。今日一日は同じカードです',
    dailyPrivacy: 'カードは今日の日付から選ばれるので、何度読み込んでも同じで、日付が変わると変わります。',
    yesnoTitle: 'タロット イエス／ノー',
    yesnoLead: '質問を思い浮かべて1枚引いてください',
    yesnoPrivacy: '引くたびにランダムです。何も保存せず、どこにも送りません。',
    draw: 'カードを引く', drawn: 'あなたのカード', again: '🔄 もう一度引く',
    upright: '正位置', reversed: '逆位置',
    yes: 'はい', no: 'いいえ', maybe: 'まだはっきりしません',
    question: '質問を思い浮かべてから引いてください。',
    disclaimer: 'タロットは考えを整理するためと、楽しむためのものです。大事な判断は実際の情報と自分の考えで決めてください。',
  },
  de: {
    dailyTitle: 'Die Tarotkarte des Tages',
    dailyLead: 'Eine Karte aus den 22 großen Arkana — den ganzen Tag dieselbe',
    dailyPrivacy: 'Die Karte wird aus dem heutigen Datum gewählt, bleibt also gleich, so oft du auch neu lädst — und wechselt, wenn das Datum wechselt.',
    yesnoTitle: 'Tarot Ja oder Nein',
    yesnoLead: 'Halt eine Frage im Kopf und zieh eine Karte',
    yesnoPrivacy: 'Jeder Zug ist zufällig. Nichts wird gespeichert und nichts irgendwohin geschickt.',
    draw: 'Karte ziehen', drawn: 'Deine Karte', again: '🔄 Neu ziehen',
    upright: 'Aufrecht', reversed: 'Umgekehrt',
    yes: 'Ja', no: 'Nein', maybe: 'Noch nicht klar',
    question: 'Denk an deine Frage und zieh dann.',
    disclaimer: 'Tarot dient dem Nachdenken und der Unterhaltung. Wichtige Entscheidungen triffst du mit echten Informationen und eigenem Urteil.',
  },
  fr: {
    dailyTitle: 'La carte de tarot du jour',
    dailyLead: 'Une carte parmi les 22 arcanes majeurs, la même toute la journée',
    dailyPrivacy: 'La carte est choisie à partir de la date du jour : elle ne change pas quel que soit le nombre de rechargements, et change quand la date change.',
    yesnoTitle: 'Tarot oui ou non',
    yesnoLead: 'Gardez une question en tête et tirez une carte',
    yesnoPrivacy: 'Chaque tirage est aléatoire. Rien n’est conservé ni envoyé nulle part.',
    draw: 'Tirer une carte', drawn: 'Votre carte', again: '🔄 Retirer une carte',
    upright: 'À l’endroit', reversed: 'À l’envers',
    yes: 'Oui', no: 'Non', maybe: 'Pas encore clair',
    question: 'Pensez à votre question, puis tirez.',
    disclaimer: 'Le tarot sert à réfléchir et à se divertir. Les décisions qui comptent se prennent avec de vraies informations et votre propre jugement.',
  },
  hi: {
    dailyTitle: 'आज का टैरो कार्ड',
    dailyLead: '22 मेजर अर्काना में से एक कार्ड, पूरे दिन वही',
    dailyPrivacy: 'कार्ड आज की तारीख़ से चुना जाता है, इसलिए कितनी भी बार पेज खोलिए वही रहेगा — और तारीख़ बदलते ही बदल जाएगा।',
    yesnoTitle: 'टैरो हाँ या ना',
    yesnoLead: 'मन में एक सवाल रखिए और एक कार्ड निकालिए',
    yesnoPrivacy: 'हर बार का चुनाव अनियमित है। कुछ भी सहेजा नहीं जाता और कहीं नहीं भेजा जाता।',
    draw: 'कार्ड निकालें', drawn: 'आपका कार्ड', again: '🔄 दोबारा निकालें',
    upright: 'सीधा', reversed: 'उल्टा',
    yes: 'हाँ', no: 'नहीं', maybe: 'अभी साफ़ नहीं',
    question: 'अपना सवाल सोचिए, फिर कार्ड निकालिए।',
    disclaimer: 'टैरो सोचने और मन बहलाने के लिए है। जो फ़ैसले मायने रखते हैं, वे सही जानकारी और अपनी समझ से लीजिए।',
  },
  'zh-hans': {
    dailyTitle: '今天的塔罗牌',
    dailyLead: '从22张大阿尔卡纳里抽一张，一整天都是同一张',
    dailyPrivacy: '牌是按今天的日期选的，所以刷新多少次都一样，换一天才会换。',
    yesnoTitle: '塔罗是或否',
    yesnoLead: '心里想着一个问题，抽一张牌',
    yesnoPrivacy: '每次抽牌都是随机的。什么都不保存，也不会送到任何地方。',
    draw: '抽一张牌', drawn: '你的牌', again: '🔄 再抽一次',
    upright: '正位', reversed: '逆位',
    yes: '是', no: '否', maybe: '还看不清楚',
    question: '想好你的问题，再抽牌。',
    disclaimer: '塔罗是用来整理思路和图个乐的。要紧的决定，请用真实的信息和自己的判断。',
  },
  'zh-hant': {
    dailyTitle: '今天的塔羅牌',
    dailyLead: '從22張大阿爾克那裡抽一張，一整天都是同一張',
    dailyPrivacy: '牌是按今天的日期選的，所以重新整理多少次都一樣，換一天才會換。',
    yesnoTitle: '塔羅是或否',
    yesnoLead: '心裡想著一個問題，抽一張牌',
    yesnoPrivacy: '每次抽牌都是隨機的。什麼都不儲存，也不會送到任何地方。',
    draw: '抽一張牌', drawn: '你的牌', again: '🔄 再抽一次',
    upright: '正位', reversed: '逆位',
    yes: '是', no: '否', maybe: '還看不清楚',
    question: '想好你的問題，再抽牌。',
    disclaimer: '塔羅是用來整理思路和圖個樂的。要緊的決定，請用真實的資訊和自己的判斷。',
  },
};
