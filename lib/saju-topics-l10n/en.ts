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
