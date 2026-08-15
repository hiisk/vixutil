import type { Test } from '../types.ts';

/**
 * 중국어 번체 심리테스트 — 구조와 점수는 [[lib/test-en.ts]]와 같다.
 *
 * 간체를 기계로 바꾼 것이 아니라 대만·홍콩에서 쓰는 말로 골랐다. 예를 들어
 * 간체의 "有生活气息"은 그대로 두어도 뜻은 통하지만, 어휘가 갈리는 자리
 * (办/辦, 干活/做事, 手机/手機)는 각 지역 표기를 따른다.
 */
export const TESTS_ZH_HANT: Test[] = [
  {
    slug: 'social-battery',
    title: '社交電量測驗',
    desc: '跟人相處會讓你掉多少電，又是什麼真正把你充滿',
    icon: '🔋',
    category: '性格',
    questions: [
      { q: '跟人待了一整天之後，你最想要什麼？', opts: [
        { text: '徹底一個人待著', score: 0 }, { text: '安靜地有人陪著', score: 1 },
        { text: '跟一個朋友做點輕鬆的事', score: 2 }, { text: '讓這一晚繼續下去', score: 3 }] },
      { q: '空著的晚上突然來了個邀約。', opts: [
        { text: '幾乎是本能地拒絕', score: 0 }, { text: '認真掂量一下', score: 1 },
        { text: '通常會答應', score: 2 }, { text: '還沒看清細節就答應了', score: 3 }] },
      { q: '在一群人的聊天裡，你通常：', opts: [
        { text: '聽著，很少開口', score: 0 }, { text: '主要跟旁邊的人聊', score: 1 },
        { text: '自然地加入', score: 2 }, { text: '最後是我在帶著聊', score: 3 }] },
      { q: '什麼都沒安排的週末，你覺得：', opts: [
        { text: '這是最好的結果', score: 0 }, { text: '不錯，再加一個小安排', score: 1 },
        { text: '有點空', score: 2 }, { text: '像是哪裡出了問題', score: 3 }] },
      { q: '在人來人往的開放式辦公室工作：', opts: [
        { text: '完全毀掉我的專注', score: 0 }, { text: '戴上耳機還能應付', score: 1 },
        { text: '大多數時候沒問題', score: 2 }, { text: '反而讓我更有勁', score: 3 }] },
      { q: '你到了一個只認識一個人的聚會。', opts: [
        { text: '整晚都待在他旁邊', score: 0 }, { text: '透過他認識幾個人', score: 1 },
        { text: '到處走走，跟好幾群人聊', score: 2 }, { text: '到最後認識了半屋子人', score: 3 }] },
      { q: '手機響了，陌生號碼。', opts: [
        { text: '從來不接', score: 0 }, { text: '先不管，之後再看', score: 1 },
        { text: '有空就接', score: 2 }, { text: '立刻就接', score: 3 }] },
      { q: '你覺得一群人的長途旅行怎麼樣？', opts: [
        { text: '我需要自己的房間和自己的作息', score: 0 }, { text: '還行，中間要有獨處的時間', score: 1 },
        { text: '我挺享受的', score: 2 }, { text: '人越多越好', score: 3 }] },
      { q: '一個愉快的社交夜晚之後，你覺得：', opts: [
        { text: '就算很順利，還是被掏空了', score: 0 }, { text: '滿足，但可以收工了', score: 1 },
        { text: '興奮勁還能持續一陣', score: 2 }, { text: '明天還想再來一次', score: 3 }] },
      { q: '成為全場焦點這件事：', opts: [
        { text: '真的很不自在', score: 0 }, { text: '短時間還行', score: 1 },
        { text: '場合對了會挺享受', score: 2 }, { text: '那才是最像我自己的時候', score: 3 }] },
    ],
    results: [
      { min: 0, max: 12, emoji: '🕯️', title: '深度充電型', color: 'from-slate-500 to-slate-700',
        desc: '有人在的時候你掉電很快，只有獨處才補得回來。這不是害羞，是實實在在的能量消耗。與其為此道歉，不如照著它來安排一週，日子會好過得多。把恢復的時間像會議一樣寫進行事曆裡。',
        traits: ['需要獨處', '專注得深', '有選擇', '穩定'] },
      { min: 13, max: 14, emoji: '🌙', title: '安靜的餘量', color: 'from-indigo-500 to-violet-600',
        desc: '你應付得來社交，但事後要還。小圈子和熟面孔幾乎不耗你，人多又生疏的場合就很費。每週守住一個真正空著的晚上，通常就夠你保持平衡。',
        traits: ['適合小圈子', '獨處恢復', '想得多', '一對一時溫暖'] },
      { min: 15, max: 17, emoji: '🌤️', title: '平衡的電量', color: 'from-sky-500 to-blue-600',
        desc: '你在人群和獨處之間轉換得不費力，這是實實在在的長處。風險在於消耗累積起來了才察覺——在答應連著第四個晚上之前問問自己，而不是之後。',
        traits: ['適應力強', '好相處', '了解自己', '平穩'] },
      { min: 18, max: 30, emoji: '⚡', title: '靠人充電型', color: 'from-amber-400 to-orange-500',
        desc: '你的能量來自別人，所以空著的行程看起來像問題而不是休息。不過值得知道：獨處仍然能給你一些人群給不了的東西——哪怕只是一小段安靜，之後的一切都會更清楚。',
        traits: ['和人在一起就充電', '很快熟絡', '表達豐富', '想到就做'] },
    ],
  },
  {
    slug: 'stress-style',
    title: '你怎麼應對壓力',
    desc: '壓力之下你的預設反應，以及該拿它怎麼辦',
    icon: '🌊',
    category: '身心',
    questions: [
      { q: '截止日提前了一週。你第一反應是：', opts: [
        { text: '愣住，盯著看半天', score: 0 }, { text: '胃裡發緊，然後開始列清單', score: 1 },
        { text: '馬上重新排計畫', score: 2 }, { text: '反而有點來勁', score: 3 }] },
      { q: '有壓力的時候，你的睡眠：', opts: [
        { text: '徹底亂掉', score: 0 }, { text: '變短', score: 1 },
        { text: '大致照常', score: 2 }, { text: '完全不受影響', score: 3 }] },
      { q: '壓力下你會不會找人說：', opts: [
        { text: '完全不說，我會閉嘴', score: 0 }, { text: '等事情過去才說', score: 1 },
        { text: '跟一個信得過的人說', score: 2 }, { text: '邊發生邊坦白地說', score: 3 }] },
      { q: '壓力下你的身體：', opts: [
        { text: '頭痛、胃痛、發緊，樣樣都來', score: 0 }, { text: '固定會犯一個毛病', score: 1 },
        { text: '只是有點緊繃', score: 2 }, { text: '幾乎沒反應', score: 3 }] },
      { q: '出了差錯之後你通常：', opts: [
        { text: '反反覆覆想上好幾天', score: 0 }, { text: '糾結一個晚上', score: 1 },
        { text: '記下教訓然後往前走', score: 2 }, { text: '幾乎立刻就翻篇', score: 3 }] },
      { q: '事情堆得太多的時候，你：', opts: [
        { text: '一件都做不下去', score: 0 }, { text: '先挑最容易的做', score: 1 },
        { text: '排好順序，從最上面開始', score: 2 }, { text: '分出去或者砍掉一些', score: 3 }] },
      { q: '工作上被批評，你的感受是：', opts: [
        { text: '扎得很深，而且很久', score: 0 }, { text: '當下難受，之後會淡', score: 1 },
        { text: '當成資訊', score: 2 }, { text: '當成有用的東西', score: 3 }] },
      { q: '你慣常的紓壓方式是：', opts: [
        { text: '我沒有', score: 0 }, { text: '滑手機或者吃點什麼', score: 1 },
        { text: '散步、運動、泡個澡', score: 2 }, { text: '有安排、有規律的事', score: 3 }] },
      { q: '真出了急事，你是：', opts: [
        { text: '最先慌的那個', score: 0 }, { text: '手抖但還能動', score: 1 },
        { text: '夠冷靜', score: 2 }, { text: '全場最穩的那個', score: 3 }] },
      { q: '回頭看最近一個難熬的月份：', opts: [
        { text: '我還背著它', score: 0 }, { text: '花了很久才甩掉', score: 1 },
        { text: '恢復得還算可以', score: 2 }, { text: '出來的時候比進去時更好了', score: 3 }] },
    ],
    results: [
      { min: 0, max: 12, emoji: '🫧', title: '全都吸進去', color: 'from-blue-500 to-indigo-700',
        desc: '壓力會穿過你的防線，留在身體裡。與其硬撐，不如當回事——壓力表現為失眠和身體不適的那種模式，是會越積越多的。一個具體的出口，加上一個能說話的人，通常比多大的決心都管用。',
        traits: ['很敏感', '往裡收', '需要恢復', '共感'] },
      { min: 13, max: 14, emoji: '🌧️', title: '慢慢熬過去', color: 'from-sky-500 to-blue-600',
        desc: '難熬的階段你都撐過來了，但是要付代價，恢復也比你希望的慢。管用的是早點發現——該出手的時刻是睡眠剛開始變化的時候，而不是所有事都堆起來之後。',
        traits: ['扛得住', '恢復慢', '認真', '安靜地堅韌'] },
      { min: 15, max: 17, emoji: '⛅', title: '壓得住', color: 'from-emerald-500 to-teal-600',
        desc: '壓力不會讓你脫軌，主要是因為你一邊感受一邊照樣運轉。風險在於以為自己沒事，因為還在做事：在壓力下有產出，和不受壓力影響，是兩回事。',
        traits: ['務實', '沉著', '恢復得好', '靠得住'] },
      { min: 18, max: 30, emoji: '🗿', title: '風暴裡的安靜', color: 'from-slate-600 to-slate-800',
        desc: '事情不順的時候你依舊持平，所以出事時大家都來找你。要留意的是：這麼穩的人往往低估累積的負擔，而周圍的人也就不再問一句你還好嗎。',
        traits: ['不動如山', '果斷', '被信賴', '反應平緩'] },
    ],
  },
  {
    slug: 'decision-style',
    title: '你怎麼做決定',
    desc: '憑直覺、講邏輯，還是介於兩者之間',
    icon: '🧭',
    category: '性格',
    questions: [
      { q: '跟朋友挑吃飯的地方：', opts: [
        { text: '我先把評論全看一遍', score: 0 }, { text: '看兩三則', score: 1 },
        { text: '推薦一家我喜歡過的', score: 2 }, { text: '看著順眼就定', score: 3 }] },
      { q: '一筆大開銷，你會考慮多久？', opts: [
        { text: '好幾週，還做表格', score: 0 }, { text: '幾天', score: 1 },
        { text: '一兩天', score: 2 }, { text: '感覺對了就買', score: 3 }] },
      { q: '定下來之後你還會翻出來重想嗎？', opts: [
        { text: '一直在想', score: 0 }, { text: '有時候', score: 1 },
        { text: '很少', score: 2 }, { text: '從不——就這麼定了', score: 3 }] },
      { q: '有人來找你拿主意，你會：', opts: [
        { text: '問很多細節把情況弄清楚', score: 0 }, { text: '把選項擺出來', score: 1 },
        { text: '說我會怎麼做', score: 2 }, { text: '當場就給答案', score: 3 }] },
      { q: '兩個都不錯的選項，分不出高下：', opts: [
        { text: '拖著，等情況替我決定', score: 0 }, { text: '列個清單比一比', score: 1 },
        { text: '過一夜再說', score: 2 }, { text: '憑直覺定', score: 3 }] },
      { q: '你多久會為一個決定後悔一次？', opts: [
        { text: '經常，而且很久', score: 0 }, { text: '有時候', score: 1 },
        { text: '很少', score: 2 }, { text: '幾乎沒有', score: 3 }] },
      { q: '會開到沒人肯拍板的時候：', opts: [
        { text: '我等別人先說', score: 0 }, { text: '我問我們漏了什麼', score: 1 },
        { text: '我提一個方案', score: 2 }, { text: '我拍板，然後往下走', score: 3 }] },
      { q: '你相信對一個人的第一印象嗎？', opts: [
        { text: '完全不信', score: 0 }, { text: '信一點', score: 1 },
        { text: '基本上信', score: 2 }, { text: '幾乎完全信', score: 3 }] },
      { q: '新資訊和你的選擇相衝突時：', opts: [
        { text: '整個決定都塌了', score: 0 }, { text: '認真重新考慮', score: 1 },
        { text: '要緊的話就調整', score: 2 }, { text: '基本上照原路走', score: 3 }] },
      { q: '你做決定時最容易掉的坑是：', opts: [
        { text: '乾脆一直不定', score: 0 }, { text: '定得太晚', score: 1 },
        { text: '有一件事沒查就定了', score: 2 }, { text: '定得太快，來不及回頭', score: 3 }] },
    ],
    results: [
      { min: 0, max: 12, emoji: '🔍', title: '深思型', color: 'from-slate-500 to-slate-700',
        desc: '你要看清全局才肯落定，所以決定紮實，也慢。代價是實在的：你還在查的時候，選項已經過期了；而懸而未決的焦慮，往往比稍微選錯的風險更重。給「選擇」本身定個期限，而不只是給結果定。',
        traits: ['周全', '看得見風險', '善分析', '不輕易落定'] },
      { min: 13, max: 14, emoji: '⚖️', title: '權衡型', color: 'from-sky-500 to-indigo-600',
        desc: '你收集到足以放心的程度就定下來——這是個好習慣。要留意的是那種情形：最後 10% 的功課花掉 90% 的時間，結論卻一點沒變。',
        traits: ['平衡', '慎重', '務實', '講道理'] },
      { min: 15, max: 17, emoji: '🎯', title: '拍板型', color: 'from-emerald-500 to-teal-600',
        desc: '資訊夠了你就快速行動，也很少回頭，所以在沒人願意拍板的場合特別有用。有一個習慣值得保留：把你押注的那個前提說出來，這樣它一旦落空你能察覺。',
        traits: ['果斷', '自信', '向前走', '少後悔'] },
      { min: 18, max: 30, emoji: '⚡', title: '直覺型', color: 'from-amber-400 to-rose-500',
        desc: '你信直覺、動作快，在局勢多變的時候這是真本事。碰上不可逆的決定，它就變成負擔——好用的規矩是：只在沒法反悔的事情上放慢，其餘照舊快。',
        traits: ['快', '直覺', '先動手', '果斷'] },
    ],
  },
  {
    slug: 'work-style',
    title: '你的工作方式',
    desc: '你實際上是怎麼把事做完的，而不是你覺得應該怎麼做',
    icon: '💼',
    category: '工作',
    questions: [
      { q: '你最好的產出發生在：', opts: [
        { text: '一整段沒人打擾的長時間', score: 0 }, { text: '兩三段專注的時段', score: 1 },
        { text: '一天裡零散的短爆發', score: 2 }, { text: '有急事的時候', score: 3 }] },
      { q: '你的待辦清單是：', opts: [
        { text: '詳細而且一直在維護', score: 0 }, { text: '大致列著，基本照著走', score: 1 },
        { text: '幾條隨手記', score: 2 }, { text: '在腦子裡', score: 3 }] },
      { q: '來了個沒定期限的大專案：', opts: [
        { text: '我自己定一個，並且守住', score: 0 }, { text: '定一個，基本能守住', score: 1 },
        { text: '等我覺得準備好了再開始', score: 2 }, { text: '一直擱著，直到有什麼逼過來', score: 3 }] },
      { q: '卡住的時候你會：', opts: [
        { text: '一直硬磕', score: 0 }, { text: '短暫離開再回來', score: 1 },
        { text: '換一件事做', score: 2 }, { text: '馬上找人問', score: 3 }] },
      { q: '一週裡的會議：', opts: [
        { text: '把我一整天都打碎', score: 0 }, { text: '排在一起還能忍', score: 1 },
        { text: '是工作的正常部分', score: 2 }, { text: '是我腦子轉得最快的地方', score: 3 }] },
      { q: '你偏好的工作是：', opts: [
        { text: '一個人往深裡做', score: 0 }, { text: '基本獨立，定期對齊', score: 1 },
        { text: '協作著做', score: 2 }, { text: '一直在對話裡', score: 3 }] },
      { q: '你和截止日的關係：', opts: [
        { text: '早早就做完', score: 0 }, { text: '留有餘地地做完', score: 1 },
        { text: '剛好趕上', score: 2 }, { text: '貼著邊反而最能做', score: 3 }] },
      { q: '碰上無聊的工作：', opts: [
        { text: '先做掉它清場', score: 0 }, { text: '給它排個時間', score: 1 },
        { text: '往後拖一陣', score: 2 }, { text: '它就一直躺在那裡', score: 3 }] },
      { q: '半成品階段的回饋：', opts: [
        { text: '我寧願先做完', score: 0 }, { text: '在幾個節點上', score: 1 },
        { text: '相當頻繁', score: 2 }, { text: '一路上隨時都要', score: 3 }] },
      { q: '你的座位：', opts: [
        { text: '得收拾乾淨我才開得了工', score: 0 }, { text: '大體上是整齊的', score: 1 },
        { text: '有生活感', score: 2 }, { text: '亂，但轉得動', score: 3 }] },
    ],
    results: [
      { min: 0, max: 12, emoji: '🎯', title: '深度工作者', color: 'from-indigo-500 to-violet-700',
        desc: '你在安靜的長時段裡做出最好的東西，其餘安排都圍著保住這些時段轉。這確實帶來深度，但也讓你經不起打斷——划算的做法是每週死守兩三個整塊，其他一切保持彈性。',
        traits: ['專注', '有條理', '自主', '受不了打斷'] },
      { min: 13, max: 14, emoji: '📋', title: '穩健的規劃者', color: 'from-sky-500 to-blue-600',
        desc: '你會規劃、會分配節奏，說什麼時候好就什麼時候好。這份可靠比多數人以為的更值錢。只要偶爾確認一下：計畫還在為工作服務，而不是反過來。',
        traits: ['可靠', '有條理', '節奏穩', '前後一致'] },
      { min: 15, max: 17, emoji: '🔄', title: '靈活機動型', color: 'from-emerald-500 to-teal-600',
        desc: '你成波地做事，切換輕鬆，對冒出來的事隨時接得住。這很適合節奏快的工作。要留神的是：不停切換會讓人覺得很有產出，同時又讓真正難啃的問題更難收尾。',
        traits: ['適應力強', '反應快', '善協作', '俐落'] },
      { min: 18, max: 30, emoji: '🔥', title: '壓線爆發型', color: 'from-amber-400 to-rose-500',
        desc: '把你點著的是緊迫感，貼著截止日你反而交得漂亮。這套管用——直到兩個截止日撞在一起。給自己造幾個提前的小期限是老辦法，比試著把自己改造成另一種人有效得多。',
        traits: ['壓力下反應快', '臨場應變', '有衝勁', '被期限驅動'] },
    ],
  },
  {
    slug: 'love-language',
    type: 'category',
    title: '你怎麼表達在乎',
    desc: '你表達關心的方式，以及你希望被關心的方式',
    icon: '💝',
    category: '感情',
    questions: [
      { q: '伴侶今天過得很糟。你會：', opts: [
        { text: '把我欣賞他的地方具體說出來', score: 0, k: 'words' },
        { text: '坐在旁邊，不多說什麼', score: 1, k: 'time' },
        { text: '不聲不響地替他擋掉一件事', score: 2, k: 'acts' },
        { text: '帶一樣他喜歡的東西回來', score: 3, k: 'gifts' }] },
      { q: '什麼最讓你覺得被在乎？', opts: [
        { text: '有人把話說出口', score: 0, k: 'words' }, { text: '不被打擾的相處時間', score: 1, k: 'time' },
        { text: '有人替我把事情辦了', score: 2, k: 'acts' }, { text: '一件用心挑的東西', score: 3, k: 'gifts' }] },
      { q: '紀念日你的第一反應是：', opts: [
        { text: '寫點什麼', score: 0, k: 'words' }, { text: '規劃一整天在一起', score: 1, k: 'time' },
        { text: '把他一直需要的實事辦掉', score: 2, k: 'acts' }, { text: '找到那件對的禮物', score: 3, k: 'gifts' }] },
      { q: '一段關係裡最傷人的是什麼？', opts: [
        { text: '從來聽不到一句「我們挺好的」', score: 0, k: 'words' }, { text: '人在旁邊，心不在', score: 1, k: 'time' },
        { text: '什麼都丟給我一個人扛', score: 2, k: 'acts' }, { text: '在最要緊的那天被忘掉', score: 3, k: 'gifts' }] },
      { q: '朋友正在經歷難事：', opts: [
        { text: '我把我對他的看法講給他聽', score: 0, k: 'words' }, { text: '我空出一個晚上給他', score: 1, k: 'time' },
        { text: '我替他把一件實事辦了', score: 2, k: 'acts' }, { text: '我寄點東西給他', score: 3, k: 'gifts' }] },
      { q: '你表達「我想你了」的方式是：', opts: [
        { text: '直接說出來', score: 0, k: 'words' }, { text: '馬上騰出時間', score: 1, k: 'time' },
        { text: '替對方做點什麼', score: 2, k: 'acts' }, { text: '帶點東西回來', score: 3, k: 'gifts' }] },
      { q: '最能打動你的稱讚是：', opts: [
        { text: '關於我是個什麼樣的人，具體的那種', score: 0, k: 'words' }, { text: '「我總想跟你多待一會兒」', score: 1, k: 'time' },
        { text: '「你總是把事情都照顧好」', score: 2, k: 'acts' }, { text: '「我看到這個就想到你」', score: 3, k: 'gifts' }] },
      { q: '吵架之後，什麼最快能修好？', opts: [
        { text: '聽到他仍然看重我什麼', score: 0, k: 'words' }, { text: '坐下來好好談一次', score: 1, k: 'time' },
        { text: '他做點什麼把心意做出來', score: 2, k: 'acts' }, { text: '一個說明他想過這事的舉動', score: 3, k: 'gifts' }] },
      { q: '伴侶要離開一個月。你會：', opts: [
        { text: '傳很長的訊息', score: 0, k: 'words' }, { text: '雷打不動地約好通話', score: 1, k: 'time' },
        { text: '把家裡全扛下來，讓他不用操心', score: 2, k: 'acts' }, { text: '寄東西給他', score: 3, k: 'gifts' }] },
      { q: '哪一樣不見了你會最先發現？', opts: [
        { text: '有人把感受說給我聽', score: 0, k: 'words' }, { text: '真正在一起的時間', score: 1, k: 'time' },
        { text: '不用開口就有人搭把手', score: 2, k: 'acts' }, { text: '那些小小的、用心的驚喜', score: 3, k: 'gifts' }] },
    ],
    results: [
      { min: 0, max: 0, k: 'words', emoji: '💬', title: '言語', color: 'from-sky-500 to-blue-600',
        desc: '你的愛是靠說出來的話來給和收的。有人明明白白講出他看重你什麼，比任何舉動都更往心裡去；而沉默會被你讀成疏遠，哪怕什麼事都沒有。這值得跟伴侶講清楚——用別的方式表達愛的人，常常以為這不用說也看得見。',
        traits: ['靠說', '直接', '表達豐富', '讓人安心'] },
      { min: 0, max: 0, k: 'time', emoji: '⏳', title: '時間', color: 'from-violet-500 to-purple-600',
        desc: '對你來說，注意力才是硬通貨。一個人真的在場、手機收起來，比他買得起或說得出的任何東西都重。反過來說：人在身邊卻心不在焉，在你這裡等同於缺席——與其憋著記恨，不如把這句話講出來。',
        traits: ['在場', '專注', '有耐心', '重視連結'] },
      { min: 0, max: 0, k: 'acts', emoji: '🛠️', title: '行動', color: 'from-emerald-500 to-teal-600',
        desc: '你用做事來表達在乎，也會注意到誰默默替你辦掉了你正發怵的那件事。對那些等著聽見的人來說，你的關心可能是隱形的，所以偶爾除了做，也說一句。',
        traits: ['務實', '靠得住', '觀察細', '不張揚'] },
      { min: 0, max: 0, k: 'gifts', emoji: '🎁', title: '心意', color: 'from-rose-400 to-pink-600',
        desc: '在你這裡，一件東西裝的是它背後的心思——「我看到這個就想到你」才是全部，價錢不是。所以在要緊的日子被忘掉，會疼得超出常理，這值得說明白，而不是指望別人自己領會。',
        traits: ['體貼', '重象徵', '留意細節', '愛存回憶'] },
    ],
  },
];

export const TESTS_ZH_HANT_MAP: Record<string, Test> = Object.fromEntries(
  TESTS_ZH_HANT.map(t => [t.slug, t]),
);
