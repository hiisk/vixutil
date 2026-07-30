/* ────────────────────────────────────────────────
   타로 메이저 아르카나 22장의 영어·중국어 해석.

   카드 id·이모지·색은 fortune-data.ts의 TAROT_CARDS를 그대로 쓰고, 여기에는
   정방향·역방향 해석만 둔다. 같은 시드가 같은 카드를 뽑아야 하므로 배열이
   아니라 id를 키로 하는 표로 만든다.

   카드 이름은 이미 nameEn이 있어 영어는 그대로 쓰고, 중국어만 새로 붙였다.
──────────────────────────────────────────────── */
import { MINOR_NAMES_ZH, MINOR_READINGS_EN, MINOR_READINGS_ZH } from './tarot-minor-intl.ts';

export type TarotIntlLang = 'en' | 'zh';

interface Reading { upright: string; reversed: string }

const MAJOR_NAMES_ZH: Record<number, string> = {
  0: '愚者', 1: '魔术师', 2: '女祭司', 3: '皇后', 4: '皇帝', 5: '教皇',
  6: '恋人', 7: '战车', 8: '力量', 9: '隐者', 10: '命运之轮', 11: '正义',
  12: '倒吊人', 13: '死神', 14: '节制', 15: '恶魔', 16: '高塔', 17: '星星',
  18: '月亮', 19: '太阳', 20: '审判', 21: '世界',
};

/** 78장 전체 중국어 이름 — 메이저 22장 + 마이너 56장 */
export const TAROT_NAMES_ZH: Record<number, string> = { ...MAJOR_NAMES_ZH, ...MINOR_NAMES_ZH };

const MAJOR_READINGS: Record<TarotIntlLang, Record<number, Reading>> = {
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
  zh: {
    0: { upright: '预示旅程开始的牌。你站在还未成形的可能性面前，此刻需要的是不带完整计划也敢迈出第一步的单纯勇气。相信直觉、保持开放，它往往会带你去比计划更好的地方。',
         reversed: '热情可能跑在了判断前面。要么正要不加确认就纵身一跃，要么因为害怕而站着不动，眼看真正的机会溜走。先停一下，做最起码的现实核对，然后再动。' },
    1: { upright: '你已经拥有实现所想所需的一切。专注力与意志力都处在高点，正是把念头转成行动的时刻。相信自己的能力，别再迂回，直接去做。',
         reversed: '能力没被用上，或者用错了方向。留意过度自信、想操控他人的冲动，或者走捷径的念头。重新确认真正的意图，用诚实的方式接近目标。' },
    2: { upright: '这里更深的真相不在表面。此刻更适合听而不是说、感受而不是行动。留意直觉发出的微弱信号。不需要着急 —— 隐藏的东西时候到了自己会浮现。',
         reversed: '分析过多可能反而模糊了判断。要么直觉与理性失衡，要么你正在压过自己内心的声音。也许还有事情没揭开 —— 别急着下决定。' },
    3: { upright: '丰盛与创造的时期。相信自然涌出的感受力和生产力。亲近的关系里温度在上升，新的想法或计划正在扎根。打开五感，好好享受眼前的好。',
         reversed: '可能出现依赖或创造力的堵塞。要么在忽略自己，要么抓得太紧、想控制周围。对自己和别人都更宽容一点，也照顾好自己的需要。' },
    4: { upright: '秩序与权威。此刻适合立规矩、划界线，为事情的形状负起责任。在清晰的框架里踏实用力，成果会真的出来。',
         reversed: '僵硬可能正在造成损害。要么控制变成了不知变通，要么因为完全没有结构而在漂。该松的松，该立的立。' },
    5: { upright: '传统、学习与指引。既成的做法和走过这条路的人，此刻是有价值的。去问、去学，让别人累积的经验替你省下弯路。',
         reversed: '惯例可能在束缚而不是帮助你。质疑一下那条你从没检视就一直遵守的规则 —— 其中有些是继承来的，不是你选的。' },
    6: { upright: '连结与选择之牌。有重要的东西正在对齐，可能在一段关系里，也可能在方向的抉择上。按你真正看重的来选，而不是看起来正确的。',
         reversed: '不和谐，或者在回避决定。关系里有什么失衡了，或者你在拖延一个选择、指望它自己有答案。把真正在意的价值说出来，然后照着做。' },
    7: { upright: '推进与掌控。相对的力量正被意志拢在一起，此刻靠决心是能往前走的。握住缰绳，把它开出去。',
         reversed: '可能迷失了方向，或者力气用在了没用的地方。在更用力之前先确认要去哪 —— 朝错方向的速度，代价比停下来更大。' },
    8: { upright: '安静的力量。不是蛮力，而是站得住的耐心与温柔。看似难以应付的事，在这里靠的是稳而不是压。',
         reversed: '自我怀疑或急躁可能占了上风。力量还在，只是对它的信心滑落了。先对自己温柔一点。' },
    9: { upright: '退开与内在探寻。此刻独处和沉思比社交能得到更多。给自己一段抽离的时间，让自己的光照出下一步。',
         reversed: '孤立可能已经超过有益的程度。要么退得太远，要么在拒绝真心提供的帮助。让一个人进来。' },
    10: { upright: '转折点。情势正在以你无法控制的方式变动，有用的姿态是顺着转而不是逆着转。此刻开始的事，其实更早就被启动了。',
         reversed: '抗拒改变可能正在付出代价。或者某个循环在重复，因为背后的模式还没被检视。看看什么在反复回来。' },
    11: { upright: '平衡与因果。事情会按实际发生的样子落定，而不是按你本来的意图。此刻公正行事，结果自会诚实回应。',
         reversed: '有什么失衡了，或者在回避担责。评估别人之前，先诚实看看自己那一份。' },
    12: { upright: '停顿，以及视角的转换。进展被悬置了，但从这个角度看到的东西不一样，值得拿到手。让等待发挥作用，而不是硬要动。',
         reversed: '没有目的的拖延。停顿已经不再有用，变成了回避。总得动起来，哪怕只动一小步。' },
    13: { upright: '腾出空间的结束。有什么真的在收尾，抓着不放会挡住接下来的东西。这张牌很少是为了失去本身 —— 它讲的是清空。',
         reversed: '在抗拒一个必要的结束。事实上已经结束了，只是还没承认，难处就卡在这个落差里。' },
    14: { upright: '节制与调和。答案在中间 —— 把看似对立的东西合起来，调整比例，而不是选边站。',
         reversed: '过度或失衡。有什么偏得太远了。在代价变大之前，把比例调回来。' },
    15: { upright: '执着与束缚。有什么抓着你的力度，比你承认的更大 —— 可能是习惯、需求，或一段关系。这张牌里的锁链是松的，能说出它是什么，就已经做完了大半。',
         reversed: '束缚正在松开。你已经开始看清，抓住你的东西正在失去力道。继续走。' },
    16: { upright: '突然的崩解。建在不牢地基上的东西塌了，这既痛也让人看清。撑过这一下的，才是本来就结实的部分。',
         reversed: '避开了一次崩塌，或者正在把它拖长。要么你绕过去了，要么在硬撑一个不如放手的东西。' },
    17: { upright: '难关之后的希望与澄澈。最糟的已经过去，某种安静而真实的东西正在恢复。相信这个方向 —— 它比感觉上更稳。',
         reversed: '希望在见底，或者期待已经偏离了现实。回到真正支撑你的东西上，而不是你希望为真的那个。' },
    18: { upright: '不确定与想象。这里并非一切都如所见，情绪正在给感知上色。慢一点走，核对一下你以为你知道的事。',
         reversed: '混沌正在散去。原本不清楚的正在明朗，附着其上的恐惧也在失去力量。' },
    19: { upright: '清澈、温暖与顺遂。事情以它本来的样子被看见，你建起来的东西正在被认可。坦然享受它。' ,
         reversed: '乐观可能有点单薄，或者来得迟。好的东西还在，只是被遮住了。去找那件小而确定的事，而不是等整幅图。' },
    20: { upright: '清算与更新。有什么正在被衡量，一个真正的新阶段是可得的。诚实地回应召唤，而不是防御性地回应。',
         reversed: '在回避一次诚实的评估。过度自责或它的反面，正挡着你看清楚。' },
    21: { upright: '圆满。一个循环妥当地合上了，各部分都归了位。接下来的事，会从一个真正完成的基础上开始。',
         reversed: '差一点就完成，但还没收口。去找那最后一块，而不是把下一件事直接叠上去。' },
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
  zh: { ...MAJOR_READINGS.zh, ...MINOR_READINGS_ZH },
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
  zh: {
    dailyTitle: '今日塔罗',
    dailyLead: '从 22 张大阿尔卡纳中抽一张，一整天都是同一张',
    dailyPrivacy: '牌是根据当天日期选出的，所以刷新多少次都一样，日期变了才会换。',
    yesnoTitle: '塔罗是与否',
    yesnoLead: '心里想着问题，抽一张牌',
    yesnoPrivacy: '每次抽牌都是随机的。不保存任何内容，也不会发送到任何地方。',
    draw: '抽一张牌', drawn: '你的牌', again: '🔄 再抽一次',
    upright: '正位', reversed: '逆位',
    yes: '是', no: '否', maybe: '尚未明朗',
    question: '想好你的问题，然后抽牌。',
    disclaimer: '塔罗用于自省与娱乐。重要的决定请用充分的信息和自己的判断来做。',
  },
};
