import type { Test } from './types';

/**
 * 영어 심리테스트.
 *
 * 한국어 264종(2026-08-07)은 데이터가 3만 줄을 넘고 상당수가 한국 맥락(회사 문화·연애
 * 관습)에 묶여 있어 옮기는 것이 의미가 없다. 영어권에서 실제로 검색되는
 * 주제만 골라 새로 썼다.
 *
 * 결과 구간은 min~max로 겹치지 않게 이어 붙인다. 겹치면 앞의 것이 항상 이기고,
 * 비면 점수에 해당하는 결과가 없어 화면이 비어버린다.
 */
export const TESTS_EN: Test[] = [
  {
    slug: 'social-battery',
    title: 'Social Battery Test',
    desc: 'How quickly people drain you — and what actually recharges you',
    icon: '🔋',
    category: 'Personality',
    questions: [
      { q: 'After a long day with people, what do you want most?', opts: [
        { text: 'To be completely alone', score: 0 }, { text: 'Quiet company', score: 1 },
        { text: 'Something low-key with one friend', score: 2 }, { text: 'To keep the night going', score: 3 }] },
      { q: 'An unplanned invitation lands on a free evening.', opts: [
        { text: 'I decline almost automatically', score: 0 }, { text: 'I weigh it carefully', score: 1 },
        { text: 'I usually say yes', score: 2 }, { text: 'I say yes before reading the details', score: 3 }] },
      { q: 'In a group conversation you tend to:', opts: [
        { text: 'Listen and speak rarely', score: 0 }, { text: 'Talk mostly to the person beside me', score: 1 },
        { text: 'Join in comfortably', score: 2 }, { text: 'End up leading it', score: 3 }] },
      { q: 'A weekend with nothing scheduled feels:', opts: [
        { text: 'Like the best possible outcome', score: 0 }, { text: 'Good, with one small plan', score: 1 },
        { text: 'A bit empty', score: 2 }, { text: 'Like something went wrong', score: 3 }] },
      { q: 'Working in a busy open office:', opts: [
        { text: 'Wrecks my concentration', score: 0 }, { text: 'Is manageable with headphones', score: 1 },
        { text: 'Is fine most days', score: 2 }, { text: 'Keeps my energy up', score: 3 }] },
      { q: 'You arrive at a party where you know one person.', opts: [
        { text: 'I stay near them all night', score: 0 }, { text: 'I meet a few people through them', score: 1 },
        { text: 'I drift and talk to several groups', score: 2 }, { text: 'I know half the room by the end', score: 3 }] },
      { q: 'Your phone rings, unknown number.', opts: [
        { text: 'I never answer', score: 0 }, { text: 'I let it go and check later', score: 1 },
        { text: 'I answer if I am free', score: 2 }, { text: 'I answer straight away', score: 3 }] },
      { q: 'How do you feel about long trips with a group?', opts: [
        { text: 'I need my own room and my own hours', score: 0 }, { text: 'Fine, with breaks alone', score: 1 },
        { text: 'I enjoy them', score: 2 }, { text: 'The more people the better', score: 3 }] },
      { q: 'After a great social evening you feel:', opts: [
        { text: 'Drained, even if it went well', score: 0 }, { text: 'Content but ready to stop', score: 1 },
        { text: 'Buzzing for a while', score: 2 }, { text: 'Ready to do it again tomorrow', score: 3 }] },
      { q: 'Being the centre of attention is:', opts: [
        { text: 'Genuinely uncomfortable', score: 0 }, { text: 'Fine briefly', score: 1 },
        { text: 'Enjoyable in the right room', score: 2 }, { text: 'Where I am most myself', score: 3 }] },
    ],
    results: [
      { min: 0, max: 12, emoji: '🕯️', title: 'Deep recharger', color: 'from-slate-500 to-slate-700',
        desc: 'Your battery drains fast in company and refills only in solitude. That is not shyness — it is a real energy cost, and the sooner you plan around it rather than apologise for it, the better your weeks go. Build recovery time into the calendar the way you would a meeting.',
        traits: ['Needs solitude', 'Deep focus', 'Selective', 'Steady'] },
      { min: 13, max: 14, emoji: '🌙', title: 'Quiet reserve', color: 'from-indigo-500 to-violet-600',
        desc: 'You handle company well but pay for it afterwards. Small groups and familiar faces cost you almost nothing; large unfamiliar ones cost a lot. Protecting one genuinely empty evening a week is usually all it takes to stay level.',
        traits: ['Small groups', 'Recovers alone', 'Thoughtful', 'Warm one-to-one'] },
      { min: 15, max: 17, emoji: '🌤️', title: 'Balanced charge', color: 'from-sky-500 to-blue-600',
        desc: 'You move between company and solitude without much friction, which is a genuinely useful trait. The risk is not noticing the drain until it has built up — check in with yourself before saying yes to a fourth night out, not after.',
        traits: ['Adaptable', 'Sociable', 'Self-aware', 'Even'] },
      { min: 18, max: 30, emoji: '⚡', title: 'Powered by people', color: 'from-amber-400 to-orange-500',
        desc: 'Other people are where your energy comes from, so an empty calendar reads as a problem rather than a rest. It is worth knowing that solitude still does something for you that company cannot — even a short quiet stretch tends to sharpen everything else.',
        traits: ['Energised by people', 'Quick to connect', 'Expressive', 'Spontaneous'] },
    ],
  },
  {
    slug: 'stress-style',
    title: 'How You Handle Stress',
    desc: 'Your default reaction under pressure, and what to do about it',
    icon: '🌊',
    category: 'Wellbeing',
    questions: [
      { q: 'A deadline moves up by a week. Your first move is:', opts: [
        { text: 'Freeze and stare at it for a while', score: 0 }, { text: 'Feel sick, then start listing tasks', score: 1 },
        { text: 'Replan immediately', score: 2 }, { text: 'Get slightly energised by it', score: 3 }] },
      { q: 'When stressed, your sleep:', opts: [
        { text: 'Falls apart completely', score: 0 }, { text: 'Gets shorter', score: 1 },
        { text: 'Stays roughly normal', score: 2 }, { text: 'Is unaffected', score: 3 }] },
      { q: 'Under pressure you talk to others:', opts: [
        { text: 'Not at all — I go quiet', score: 0 }, { text: 'Only after it is over', score: 1 },
        { text: 'To one trusted person', score: 2 }, { text: 'Openly, as it happens', score: 3 }] },
      { q: 'Your body under stress:', opts: [
        { text: 'Headaches, stomach, tension — all of it', score: 0 }, { text: 'One reliable symptom', score: 1 },
        { text: 'Mild tension only', score: 2 }, { text: 'Barely registers it', score: 3 }] },
      { q: 'When something goes wrong you tend to:', opts: [
        { text: 'Replay it for days', score: 0 }, { text: 'Dwell for an evening', score: 1 },
        { text: 'Note the lesson and move', score: 2 }, { text: 'Move on almost immediately', score: 3 }] },
      { q: 'Faced with too many tasks, you:', opts: [
        { text: 'Do none of them', score: 0 }, { text: 'Do the easiest first', score: 1 },
        { text: 'Rank and start at the top', score: 2 }, { text: 'Delegate or cut some', score: 3 }] },
      { q: 'Criticism at work lands:', opts: [
        { text: 'Very hard, for a long time', score: 0 }, { text: 'Hard, then fades', score: 1 },
        { text: 'As information', score: 2 }, { text: 'As something useful', score: 3 }] },
      { q: 'Your usual stress release is:', opts: [
        { text: 'I do not have one', score: 0 }, { text: 'Scrolling or snacking', score: 1 },
        { text: 'A walk, a workout, a bath', score: 2 }, { text: 'Something planned and regular', score: 3 }] },
      { q: 'In an actual crisis you are:', opts: [
        { text: 'The one who panics', score: 0 }, { text: 'Shaky but functional', score: 1 },
        { text: 'Calm enough', score: 2 }, { text: 'The steadiest person there', score: 3 }] },
      { q: 'Looking back at your last hard month:', opts: [
        { text: 'I am still carrying it', score: 0 }, { text: 'It took a long time to shake', score: 1 },
        { text: 'I recovered reasonably', score: 2 }, { text: 'I came out of it better', score: 3 }] },
    ],
    results: [
      { min: 0, max: 12, emoji: '🫧', title: 'Absorbs everything', color: 'from-blue-500 to-indigo-700',
        desc: 'Pressure goes straight through your defences and stays in your body. This is worth taking seriously rather than pushing through — the pattern where stress shows up as sleep loss and physical symptoms tends to compound. One concrete outlet and one person to tell usually changes more than any amount of resolve.',
        traits: ['Highly sensitive', 'Internalises', 'Needs recovery', 'Empathetic'] },
      { min: 13, max: 14, emoji: '🌧️', title: 'Weathers it slowly', color: 'from-sky-500 to-blue-600',
        desc: 'You get through hard stretches but they cost you, and the recovery is slower than you would like. The useful move is catching it earlier — the point to intervene is when sleep first shifts, not when everything has already piled up.',
        traits: ['Endures', 'Slow to recover', 'Conscientious', 'Quietly resilient'] },
      { min: 15, max: 17, emoji: '⛅', title: 'Steady under load', color: 'from-emerald-500 to-teal-600',
        desc: 'You handle pressure without it derailing you, mostly because you keep functioning while feeling it. The risk is assuming you are fine because you are still working — being productive under stress is not the same as being unaffected by it.',
        traits: ['Practical', 'Composed', 'Recovers well', 'Reliable'] },
      { min: 18, max: 30, emoji: '🗿', title: 'Calm in the storm', color: 'from-slate-600 to-slate-800',
        desc: 'You stay level when things go wrong, which makes you the person others turn to in a crisis. Worth watching: people this steady often underestimate the cumulative load, and the ones around them stop asking whether they are alright.',
        traits: ['Unflappable', 'Decisive', 'Trusted', 'Low reactivity'] },
    ],
  },
  {
    slug: 'decision-style',
    title: 'How You Make Decisions',
    desc: 'Gut, logic, or somewhere in between',
    icon: '🧭',
    category: 'Personality',
    questions: [
      { q: 'Choosing where to eat with friends:', opts: [
        { text: 'I read every review first', score: 0 }, { text: 'I check a couple', score: 1 },
        { text: 'I suggest somewhere I liked', score: 2 }, { text: 'I pick whatever looks good', score: 3 }] },
      { q: 'A big purchase — how long do you deliberate?', opts: [
        { text: 'Weeks, with spreadsheets', score: 0 }, { text: 'A few days', score: 1 },
        { text: 'A day or two', score: 2 }, { text: 'If it feels right, I buy it', score: 3 }] },
      { q: 'When you have decided, do you revisit it?', opts: [
        { text: 'Constantly', score: 0 }, { text: 'Sometimes', score: 1 },
        { text: 'Rarely', score: 2 }, { text: 'Never — it is done', score: 3 }] },
      { q: 'Someone asks your advice. You:', opts: [
        { text: 'Ask a lot of clarifying questions', score: 0 }, { text: 'Lay out the options', score: 1 },
        { text: 'Say what I would do', score: 2 }, { text: 'Tell them straight away', score: 3 }] },
      { q: 'Two good options, no clear winner:', opts: [
        { text: 'I stall until circumstances decide', score: 0 }, { text: 'I make a list', score: 1 },
        { text: 'I sleep on it once', score: 2 }, { text: 'I go with instinct', score: 3 }] },
      { q: 'How often do you regret decisions?', opts: [
        { text: 'Often, and for a long time', score: 0 }, { text: 'Sometimes', score: 1 },
        { text: 'Rarely', score: 2 }, { text: 'Almost never', score: 3 }] },
      { q: 'In a meeting where nobody will decide:', opts: [
        { text: 'I wait for someone else', score: 0 }, { text: 'I ask what we are missing', score: 1 },
        { text: 'I propose something', score: 2 }, { text: 'I call it and move on', score: 3 }] },
      { q: 'Do you trust a first impression of a person?', opts: [
        { text: 'Not at all', score: 0 }, { text: 'A little', score: 1 },
        { text: 'Usually', score: 2 }, { text: 'Almost completely', score: 3 }] },
      { q: 'When new information contradicts your choice:', opts: [
        { text: 'I unravel the whole decision', score: 0 }, { text: 'I reconsider seriously', score: 1 },
        { text: 'I adjust if it matters', score: 2 }, { text: 'I usually stay the course', score: 3 }] },
      { q: 'Your worst decision-making trap is:', opts: [
        { text: 'Never deciding at all', score: 0 }, { text: 'Deciding too late', score: 1 },
        { text: 'Deciding without checking one thing', score: 2 }, { text: 'Deciding too fast to change course', score: 3 }] },
    ],
    results: [
      { min: 0, max: 12, emoji: '🔍', title: 'The deliberator', color: 'from-slate-500 to-slate-700',
        desc: 'You want the full picture before committing, which means your decisions are well-founded and slow. The cost is real: options expire while you research, and the anxiety of an open decision often outweighs the risk of a slightly wrong one. Set a deadline for the choice itself, not just the outcome.',
        traits: ['Thorough', 'Risk-aware', 'Analytical', 'Slow to commit'] },
      { min: 13, max: 14, emoji: '⚖️', title: 'The weigher', color: 'from-sky-500 to-indigo-600',
        desc: 'You gather enough to feel confident, then decide — a good default. Watch for the pattern where the last 10% of research takes 90% of the time and changes nothing.',
        traits: ['Balanced', 'Considered', 'Practical', 'Reasonable'] },
      { min: 15, max: 17, emoji: '🎯', title: 'The decider', color: 'from-emerald-500 to-teal-600',
        desc: 'You move quickly with enough information and rarely look back, which makes you useful in rooms where nobody else will call it. The one habit worth keeping: name the assumption you are betting on, so you notice if it turns out wrong.',
        traits: ['Decisive', 'Confident', 'Forward-moving', 'Low regret'] },
      { min: 18, max: 30, emoji: '⚡', title: 'The instinctive', color: 'from-amber-400 to-rose-500',
        desc: 'You trust your gut and act fast, which is genuinely an advantage in fluid situations. It becomes a liability on the irreversible ones — the useful rule is to slow down specifically for decisions you cannot undo, and keep the speed for everything else.',
        traits: ['Fast', 'Intuitive', 'Action-first', 'Decisive'] },
    ],
  },
  {
    slug: 'work-style',
    title: 'Your Working Style',
    desc: 'How you actually get things done, not how you think you should',
    icon: '💼',
    category: 'Work',
    questions: [
      { q: 'Your best work happens:', opts: [
        { text: 'In one long uninterrupted block', score: 0 }, { text: 'In a couple of focused stretches', score: 1 },
        { text: 'In shorter bursts through the day', score: 2 }, { text: 'Whenever something is urgent', score: 3 }] },
      { q: 'Your to-do list is:', opts: [
        { text: 'Detailed and maintained', score: 0 }, { text: 'A rough list I mostly follow', score: 1 },
        { text: 'A few notes', score: 2 }, { text: 'In my head', score: 3 }] },
      { q: 'A big project arrives with no deadline:', opts: [
        { text: 'I set my own and stick to it', score: 0 }, { text: 'I set one and mostly hold it', score: 1 },
        { text: 'I start when I feel ready', score: 2 }, { text: 'It waits until something forces it', score: 3 }] },
      { q: 'When you get stuck you:', opts: [
        { text: 'Keep grinding at it', score: 0 }, { text: 'Take a short break, then return', score: 1 },
        { text: 'Switch to another task', score: 2 }, { text: 'Ask someone immediately', score: 3 }] },
      { q: 'Meetings in your week:', opts: [
        { text: 'Break my whole day', score: 0 }, { text: 'Are tolerable if batched', score: 1 },
        { text: 'Are a normal part of it', score: 2 }, { text: 'Are where I do my best thinking', score: 3 }] },
      { q: 'You prefer work that is:', opts: [
        { text: 'Deep and solo', score: 0 }, { text: 'Mostly solo with check-ins', score: 1 },
        { text: 'Collaborative', score: 2 }, { text: 'Constantly in conversation', score: 3 }] },
      { q: 'Your relationship with deadlines:', opts: [
        { text: 'I finish well ahead', score: 0 }, { text: 'I finish comfortably', score: 1 },
        { text: 'I finish just in time', score: 2 }, { text: 'I work best right at the edge', score: 3 }] },
      { q: 'A task you find boring:', opts: [
        { text: 'I do it first to clear it', score: 0 }, { text: 'I schedule it', score: 1 },
        { text: 'I put it off a while', score: 2 }, { text: 'It sits there indefinitely', score: 3 }] },
      { q: 'Feedback on work in progress:', opts: [
        { text: 'I would rather finish first', score: 0 }, { text: 'At a few checkpoints', score: 1 },
        { text: 'Fairly often', score: 2 }, { text: 'Constantly, as I go', score: 3 }] },
      { q: 'Your workspace:', opts: [
        { text: 'Has to be tidy to start', score: 0 }, { text: 'Is broadly organised', score: 1 },
        { text: 'Is lived-in', score: 2 }, { text: 'Is chaos that works', score: 3 }] },
    ],
    results: [
      { min: 0, max: 12, emoji: '🎯', title: 'Deep worker', color: 'from-indigo-500 to-violet-700',
        desc: 'You do your best work in long, quiet stretches and structure everything around protecting them. This produces real depth, but it makes you fragile to interruption — the useful investment is defending two or three blocks a week absolutely, and being flexible about everything else.',
        traits: ['Focused', 'Structured', 'Self-directed', 'Interruption-averse'] },
      { min: 13, max: 14, emoji: '📋', title: 'Steady planner', color: 'from-sky-500 to-blue-600',
        desc: 'You plan, you pace, and things land when you said they would. That reliability is worth more than most people realise. Just check occasionally that the plan is still serving the work rather than the other way around.',
        traits: ['Reliable', 'Organised', 'Paced', 'Consistent'] },
      { min: 15, max: 17, emoji: '🔄', title: 'Flexible mover', color: 'from-emerald-500 to-teal-600',
        desc: 'You work in bursts, switch easily and stay responsive to whatever comes up. That suits fast-moving work well. The thing to watch is that constant switching feels productive while making genuinely hard problems harder to finish.',
        traits: ['Adaptable', 'Responsive', 'Collaborative', 'Quick'] },
      { min: 18, max: 30, emoji: '🔥', title: 'Pressure performer', color: 'from-amber-400 to-rose-500',
        desc: 'Urgency is what switches you on, and you produce well right at the deadline. It works — until two deadlines land together. Manufacturing earlier, smaller deadlines is the standard fix and it works better than trying to become a different kind of worker.',
        traits: ['Fast under pressure', 'Improvises', 'Energetic', 'Deadline-driven'] },
    ],
  },
  {
    slug: 'love-language',
    type: 'category',
    title: 'How You Show Affection',
    desc: 'The way you express care, and the way you want to receive it',
    icon: '💝',
    category: 'Relationships',
    questions: [
      { q: 'A partner has had an awful day. You:', opts: [
        { text: 'Tell them exactly what you appreciate about them', score: 0, k: 'words' },
        { text: 'Sit with them without saying much', score: 1, k: 'time' },
        { text: 'Quietly take something off their plate', score: 2, k: 'acts' },
        { text: 'Bring back something they like', score: 3, k: 'gifts' }] },
      { q: 'What makes you feel most cared for?', opts: [
        { text: 'Being told, out loud', score: 0, k: 'words' }, { text: 'Undivided time together', score: 1, k: 'time' },
        { text: 'Someone handling something for me', score: 2, k: 'acts' }, { text: 'A thoughtful object', score: 3, k: 'gifts' }] },
      { q: 'Your instinct on an anniversary:', opts: [
        { text: 'Write something', score: 0, k: 'words' }, { text: 'Plan a whole day together', score: 1, k: 'time' },
        { text: 'Do something practical they have needed', score: 2, k: 'acts' }, { text: 'Find the right present', score: 3, k: 'gifts' }] },
      { q: 'What hurts most in a relationship?', opts: [
        { text: 'Never hearing that it is going well', score: 0, k: 'words' }, { text: 'Being physically there but distracted', score: 1, k: 'time' },
        { text: 'Being left to handle everything', score: 2, k: 'acts' }, { text: 'Being forgotten on the day that mattered', score: 3, k: 'gifts' }] },
      { q: 'A friend is going through something hard:', opts: [
        { text: 'I tell them what I think of them', score: 0, k: 'words' }, { text: 'I clear an evening for them', score: 1, k: 'time' },
        { text: 'I sort out something practical', score: 2, k: 'acts' }, { text: 'I send them something', score: 3, k: 'gifts' }] },
      { q: 'You show you missed someone by:', opts: [
        { text: 'Saying it directly', score: 0, k: 'words' }, { text: 'Making time immediately', score: 1, k: 'time' },
        { text: 'Doing something for them', score: 2, k: 'acts' }, { text: 'Bringing something back', score: 3, k: 'gifts' }] },
      { q: 'The compliment that lands hardest:', opts: [
        { text: 'Something specific about who I am', score: 0, k: 'words' }, { text: '"I always want more time with you"', score: 1, k: 'time' },
        { text: '"You always take care of things"', score: 2, k: 'acts' }, { text: '"I saw this and thought of you"', score: 3, k: 'gifts' }] },
      { q: 'In an argument, what repairs it fastest?', opts: [
        { text: 'Hearing what they still value in me', score: 0, k: 'words' }, { text: 'Sitting down properly to talk', score: 1, k: 'time' },
        { text: 'Them doing something that shows it', score: 2, k: 'acts' }, { text: 'A gesture that says they thought about it', score: 3, k: 'gifts' }] },
      { q: 'Your partner is away for a month. You:', opts: [
        { text: 'Send long messages', score: 0, k: 'words' }, { text: 'Schedule calls religiously', score: 1, k: 'time' },
        { text: 'Handle everything at home so they need not worry', score: 2, k: 'acts' }, { text: 'Post things to them', score: 3, k: 'gifts' }] },
      { q: 'Which would you notice missing first?', opts: [
        { text: 'Being told how they feel', score: 0, k: 'words' }, { text: 'Real time together', score: 1, k: 'time' },
        { text: 'Being helped without asking', score: 2, k: 'acts' }, { text: 'Small thoughtful surprises', score: 3, k: 'gifts' }] },
    ],
    results: [
      { min: 0, max: 0, k: 'words', emoji: '💬', title: 'Words', color: 'from-sky-500 to-blue-600',
        desc: 'You give and receive affection through what is said. Being told plainly what someone values in you lands harder than any gesture, and silence reads as distance even when nothing is wrong. Worth saying out loud to a partner — people who show love differently often assume it is obvious.',
        traits: ['Verbal', 'Direct', 'Expressive', 'Reassuring'] },
      { min: 0, max: 0, k: 'time', emoji: '⏳', title: 'Time', color: 'from-violet-500 to-purple-600',
        desc: 'Attention is the currency for you. Someone genuinely present, phone away, matters more than anything they could buy or say. The flip side: a partner physically there but distracted registers as absence, which is worth naming rather than resenting.',
        traits: ['Present', 'Attentive', 'Patient', 'Connection-led'] },
      { min: 0, max: 0, k: 'acts', emoji: '🛠️', title: 'Acts', color: 'from-emerald-500 to-teal-600',
        desc: 'You show care by doing things, and you notice when someone quietly handles what you were dreading. Your affection can be invisible to people who are waiting to hear it, so it is worth occasionally saying the thing as well as doing it.',
        traits: ['Practical', 'Dependable', 'Observant', 'Understated'] },
      { min: 0, max: 0, k: 'gifts', emoji: '🎁', title: 'Tokens', color: 'from-rose-400 to-pink-600',
        desc: 'For you an object carries the thought behind it — "I saw this and thought of you" is the whole point, not the price. That means being forgotten on a date that mattered stings disproportionately, which is worth explaining rather than expecting people to intuit.',
        traits: ['Thoughtful', 'Symbolic', 'Attentive to detail', 'Memory-keeping'] },
    ],
  },
];

export const TESTS_EN_MAP: Record<string, Test> = Object.fromEntries(
  TESTS_EN.map(t => [t.slug, t]),
);
