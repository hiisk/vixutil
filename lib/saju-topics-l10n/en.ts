import type { TopicCopy } from './types.ts';

/* 영어. 사주는 한자 문화권 밖에서 "Four Pillars of Destiny" 또는 "BaZi"로 검색된다 —
   제목에 그 말을 넣고, 술어는 한자를 괄호로 남긴다. */
export const EN: TopicCopy = {
  title: {
    love: 'BaZi Love Reading',
    job: 'BaZi Career Reading',
    career: 'BaZi Job Change Reading',
    promotion: 'BaZi Promotion Reading',
    money: 'BaZi Wealth Reading',
    health: 'BaZi Health Reading',
    study: 'BaZi Study Reading',
  },
  lead: {
    love: 'Reads your spouse palace (day branch), your partner star and the Peach Blossom star to show how romance reaches you.',
    job: 'Reads the Authority stars (官星), Resource stars (印星) and your month branch — the career palace — to show which kind of organisation fits you.',
    career: 'Reads the Travelling Horse star (驛馬) and the turning points of your luck pillars to show whether this is a year to move or to stay.',
    promotion: 'Reads the Direct Officer (正官) and the Officer-Resource cycle (官印相生) to show how rank opens up inside an organisation.',
    money: 'Reads the Wealth stars (財星) and the Output-to-Wealth cycle (食傷生財) to show where money comes in and where it leaks.',
    health: 'Reads excess and deficiency across the five elements to show which part of the body tires first.',
    study: 'Reads the Resource stars (印星) and the Literary Star (文昌貴人) to show how study and exams go for you.',
  },
  terms: {
    spouseSeat: 'Spouse palace (day branch)',
    careerSeat: 'Career palace (month branch)',
    authStar: 'Authority star (官星)',
    wealthStar: 'Wealth star (財星)',
    resourceStar: 'Resource star (印星)',
    authCount: 'Authority stars',
    wealthCount: 'Wealth stars',
    resourceCount: 'Resource stars',
    selfCount: 'Companion stars (比劫)',
    peach: 'Peach Blossom (桃花殺)',
    yongma: 'Travelling Horse (驛馬殺)',
    daewoonNow: 'Current luck pillar (大運)',
    gwanIn: 'Officer-Resource cycle (官印相生)',
    sanggwan: 'Hurting Officer clash (傷官見官)',
    siksangSaengJae: 'Output feeds Wealth (食傷生財)',
    munchang: 'Literary Star (文昌貴人)',
    missingEl: 'Missing element',
    dominantEl: 'Strongest element',
    missingCount: 'Elements missing',
    strength: 'Day master strength',
  },
  /* 영어권은 낱장 주제(취업·이직·승진·학업)의 검색 수요가 사실상 없다 —
     구글 자동완성에서 `bazi job`은 `steve jobs bazi`만, `bazi study`는
     `bazi case study`만 돌려준다. 그래서 제목에 억지로 낱말을 넣지 않고
     설명만 정확히 적는다. 수요가 있는 것은 계산기·차트·재물·연애다. */
  faqCommon: [
    {
      q: 'Is this BaZi reading really free?',
      a: 'Yes. There is no signup, no login and no payment step. The whole chart is calculated in your browser, and your birth details and name are never sent to a server.',
    },
    {
      q: 'What if I do not know my birth time?',
      a: 'You can still read the chart. Leave the time blank and it is built from three pillars — year, month and day — instead of four. The hour pillar covers partner, children and later life, so adding a time makes the reading more specific. When you do give a time, it is corrected to true solar time and for historical daylight saving before the pillar is set.',
    },
  ],
  faqTopic: {
    love: {
      q: 'What does a BaZi chart actually look at for love?',
      a: 'The day branch — the spouse palace — and your partner star. For a woman the Authority star (官星) marks partners; for a man it is the Wealth star (財星). The Peach Blossom star (桃花殺) shows charm that draws people in first. This page reads one person\'s romance luck; matching two charts against each other is a separate compatibility reading.',
    },
    job: {
      q: 'Can a BaZi chart tell me which job suits me?',
      a: 'It shows the shape of work that fits, not a specific employer. A strong Authority star (官星) does well where rules and rank are clear; a strong Output star (食傷) does better where expression and invention are the point. The month branch is read as the career palace, describing the working environment around you.',
    },
    career: {
      q: 'Can BaZi tell me when to change jobs?',
      a: 'It reads timing rather than outcome. The Travelling Horse star (驛馬殺) marks a chart that resolves through movement, and the year a luck pillar (大運) turns over is the structural pivot. This page shows your current luck pillar alongside whether the Travelling Horse is present, so you can weigh it against how prepared you actually are.',
    },
    promotion: {
      q: 'How is promotion different from career in BaZi?',
      a: 'Different characters are read. What work suits you is decided by the Output and Wealth stars, but whether rank opens above you is decided by the Direct Officer (正官). When a Resource star joins it to form 官印相生, the post arrives by appointment rather than by pushing. The reverse case, 傷官見官, is where the Hurting Officer strikes the Officer and standing built over years can come apart.',
    },
    money: {
      q: 'Does an empty Wealth star mean I cannot earn?',
      a: 'No. It means money reaches you by a different route. When the Output star feeds the Wealth star — the 食傷生財 configuration — ability converts into income directly. With no Wealth star, turning knowledge and skill into value is the better path. A heavy Companion group (比劫) means money that arrives also leaves, which makes management the deciding factor.',
    },
    health: {
      q: 'Can a BaZi chart diagnose an illness?',
      a: 'No, and it should never be used that way. The health reading looks at imbalance across the five elements — which element is missing and which is in excess — and names the organs traditionally paired with them, to point at where you are likely to overreach. If something feels wrong, see a doctor.',
    },
    study: {
      q: 'What does BaZi look at for study and exams?',
      a: 'The Resource stars (印星) are the root of study. The Direct Resource (正印) suits patient accumulation; the Indirect Resource (偏印) absorbs fast and sideways. On top of that sits the Literary Star (文昌貴人), fixed by your day master, which is read as the auspicious star of writing, examinations and documents. Passing an exam, though, is decided by preparation rather than by a chart.',
    },
  },
  body: {
    love: [
      { h: 'The spouse palace is a single character: the day branch',
        p: 'Of the eight characters, the seat of a partner is the branch of the birth day — one character. When that character supports the day stem, the reading is of a partner whose grain runs with yours; when it clashes, of a partner who grates the closer you get. Hanging a whole marriage on one of eight characters looks narrow, but the day pillar stands for the self, so the character sitting beside it is read as the person closest to you.' },
      { h: 'The star for romance differs by sex',
        p: 'For women the authority star (官星), the element that controls the day stem, marks partners; for men it is the wealth star (財星), the element the day stem controls. Two or more of them and relationships come and go frequently; none at all and long stretches go to work and personal goals instead. Absence is not read as being alone — it is read as connections arriving by a different route.' },
      { h: 'The peach blossom is not a curse',
        p: 'Peach blossom (桃花殺) attaches to the four branches zi, wu, mao and you. Older texts read it as promiscuity; modern practice reads it as charm that shows before anything else does. People notice you and approach first, which is an asset in performance, sales and any work built on being seen. The cost is that plenty arrives, so without your own standard it is easy to be pulled around.' },
    ],
    job: [
      { h: 'The month branch is the seat of work',
        p: 'The branch of the birth month is the strongest position in the chart and the one that describes the environment society puts you in. Which of the ten gods sits there decides whether you run as an organisation person or a specialist, whether the work faces people or faces a problem alone. That is why aptitude is read from the month branch before the day stem.' },
      { h: 'Authority and output point in different directions',
        p: 'The authority star (官星) means rule and responsibility, and fits organisations, public service and licensed work. The output star (食傷) means expression and production, and fits making, teaching and publishing. Strong in both suits work with your own voice inside a structure; weak in both usually means the resource star (印星) is carrying you, and study or research sits easier.' },
      { h: 'A chart does not decide whether you get hired',
        p: 'It shows the grain that suits you, not which company says yes. "Good career luck" reads closer to "move now and the odds of meeting a fitting position are higher", and those odds go unused without preparation. Treating the chart as a way to pick timing rather than to make the decision is what actually helps.' },
    ],
    career: [
      { h: 'The travelling horse resolves through movement',
        p: 'The travelling horse (驛馬殺) attaches to the branches yin, shen, si and hai, and marks a structure that opens when you move rather than when you stay. For such a chart a transfer, a relocation or a move abroad is not a loss but closer to the normal path. A chart without it tends to scatter what it has accumulated each time it moves.' },
      { h: 'The year a luck pillar turns is the hinge',
        p: 'The great luck pillar (大運) changes every ten years, and around the turn the existing arrangement comes apart while new positions open, often at the same time. If you are weighing a move, checking whether you are near such a turn frequently explains the question underneath it — why does this feel stuck right now.' },
      { h: 'Flow alone cannot say stay or go',
        p: 'A chart shows the grain; the decision has to be made together with how prepared you are. Good flow with no track record and no savings makes the year after the move harder, and poor flow with real preparation still lands well. Flow is best used to choose the timing, not the outcome.' },
    ],
    promotion: [
      { h: 'Rank is decided by the direct officer',
        p: 'What work fits you is set by output and wealth stars, but whether your title rises inside an organisation is set by the direct officer (正官) among the authority stars. It is the energy of being recognised while keeping to the rules, so a clear one reads as a seat opening through proper procedure. With only the indirect officer (偏官) the force is there, but what arrives is more work rather than a higher seat.' },
      { h: 'Officer feeding resource is the structure of an appointment',
        p: 'When the authority star produces the resource star and the resource star supports the day stem, the chart is said to have officer feeding resource (官印相生). The organisation recognises you and that recognition is recorded in documents and credentials, so promotions, appointments and qualifications tend to arrive together. Reading promotion luck, this flow matters more than a single officer character.' },
      { h: 'Output striking the officer shakes what was built',
        p: 'When the hurting officer (傷官) strikes the direct officer, the reading is of standing built up and then unsettled, usually because what needed saying was said. It is not a lack of ability but friction with the rules, and such charts often do better under their own name than inside someone else’s structure.' },
    ],
    money: [
      { h: 'The wealth star is a way of handling money, not money itself',
        p: 'The wealth star is the element the day stem controls — what you take charge of and turn into value. Direct wealth (正財) is a fixed share arriving steadily, which fits salary and rent; indirect wealth (偏財) earns and spends in large swings, which fits business and investment. Many wealth stars do not mean wealth; they mean money moves through in wide amounts.' },
      { h: 'Output feeding wealth is talent turning into income',
        p: 'When the output star produces the wealth star, the chart has output feeding wealth (食傷生財). What you make and express converts directly into value, so even a weak wealth star keeps earning steady when this link stands. A large wealth star with no output is the structure where the opportunity is visible but there is nothing to sell.' },
      { h: 'Heavy peers make the outflow the problem',
        p: 'Peers (比劫) share the day stem’s element and are read as the seat where wealth is divided. A chart heavy with them is not weak at earning; it is a structure where money that arrives leaves through people, partnerships and guarantees. Cutting the paths money leaves by works far faster here than raising income.' },
    ],
    health: [
      { h: 'The elements pair with organs',
        p: 'Wood pairs with the liver and gallbladder, fire with the heart and small intestine, earth with the spleen and stomach, metal with the lungs and large intestine, water with the kidneys and bladder. An element missing from the chart marks a place that tires easily; an element in excess marks a place that is easy to overwork. This is for knowing where not to push, not for diagnosis.' },
      { h: 'Excess and deficiency point opposite ways',
        p: 'An element in surplus is called excess (太過), one absent or very weak deficiency (不及). Excess is read as something to drain, deficiency as something to fill. With the same fire element, excess calls for a cooling routine and deficiency for a warming one — the direction reverses entirely.' },
      { h: 'A chart cannot tell you that you are ill',
        p: 'Health reading here is neither statistics nor diagnosis. It reads the imbalance of the elements to point out where strain gathers, and the actual state of a body is knowable only by examination. If you have symptoms, see a doctor regardless of what this page says.' },
    ],
    study: [
      { h: 'The resource star is the root of study',
        p: 'The resource star is the element that produces and supports the day stem, and in a chart it means learning and documents. Direct resource (正印) suits knowledge built up in layers and holds up in long examinations; indirect resource (偏印) absorbs quickly but does not hold, so it suits short, concentrated pushes. With no resource star at all, learning by doing usually beats learning by sitting.' },
      { h: 'The literary star is fixed by the day stem',
        p: 'The literary star (文昌貴人) is one specific branch determined by the day stem; when that branch appears in the chart it is read as a benefactor for writing, examinations and documents. Among the symbolic stars it is the one tied most directly to study, so it is checked first in an exam chart. Having it does not pass the exam — it means hours spent turn into results more readily.' },
      { h: 'Passing is decided by preparation, not by the chart',
        p: 'Good study luck reads closer to "a period when what you studied converts into a result". Good flow with no hours changes nothing, and poor flow with enough hours still passes. The chart earns its keep when used to choose where to concentrate effort.' },
    ],
  },
  ui: {
    empty: 'Enter your birth date and gender to read this one topic on its own.',
    evidence: 'What your chart shows here',
    reading: 'Reading',
    background: 'What this reading looks at',
    yes: 'Present',
    no: 'Absent',
    none: 'None',
    strong: 'Strong (身强)',
    weak: 'Weak (身弱)',
    countOf: '{n}',
    nameLabel: 'Name (optional)',
    namePh: 'e.g. Alex',
    nameNote: 'Your name stays in this browser. It is never put in the URL and never sent to a server.',
    metaTitle: 'Free {topic} — BaZi Four Pillars Calculator',
    metaDescSuffix: 'Free, no signup, calculated in your browser.',
    titleOf: "{name}'s {topic}",
    introLead: 'In your chart, {term} is {value}. Read everything below against that.',
    otherTopics: 'Other readings',
    backToAll: 'See the full chart reading',
  },
};
