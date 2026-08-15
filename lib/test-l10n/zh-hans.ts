import type { Test } from '../types.ts';

/** 중국어 간체 심리테스트 — 구조와 점수는 [[lib/test-en.ts]]와 같다. */
export const TESTS_ZH_HANS: Test[] = [
  {
    slug: 'social-battery',
    title: '社交电量测试',
    desc: '和人相处会让你掉多少电，又是什么真正把你充满',
    icon: '🔋',
    category: '性格',
    questions: [
      { q: '和人待了一整天之后，你最想要什么？', opts: [
        { text: '彻底一个人待着', score: 0 }, { text: '安静地有人陪着', score: 1 },
        { text: '和一个朋友做点轻松的事', score: 2 }, { text: '让这一晚继续下去', score: 3 }] },
      { q: '空着的晚上突然来了个邀约。', opts: [
        { text: '几乎是本能地拒绝', score: 0 }, { text: '认真掂量一下', score: 1 },
        { text: '通常会答应', score: 2 }, { text: '还没看清细节就答应了', score: 3 }] },
      { q: '在一群人的聊天里，你通常：', opts: [
        { text: '听着，很少开口', score: 0 }, { text: '主要跟旁边的人聊', score: 1 },
        { text: '自然地加入', score: 2 }, { text: '最后是我在带着聊', score: 3 }] },
      { q: '什么都没安排的周末，你觉得：', opts: [
        { text: '这是最好的结果', score: 0 }, { text: '不错，再加一个小安排', score: 1 },
        { text: '有点空', score: 2 }, { text: '像是哪里出了问题', score: 3 }] },
      { q: '在人来人往的开放式办公室工作：', opts: [
        { text: '完全毁掉我的专注', score: 0 }, { text: '戴上耳机还能应付', score: 1 },
        { text: '大多数时候没问题', score: 2 }, { text: '反而让我更有劲', score: 3 }] },
      { q: '你到了一个只认识一个人的聚会。', opts: [
        { text: '整晚都待在他旁边', score: 0 }, { text: '通过他认识几个人', score: 1 },
        { text: '到处走走，和好几拨人聊', score: 2 }, { text: '到最后认识了半屋子人', score: 3 }] },
      { q: '手机响了，陌生号码。', opts: [
        { text: '从来不接', score: 0 }, { text: '先不管，之后再看', score: 1 },
        { text: '有空就接', score: 2 }, { text: '立刻就接', score: 3 }] },
      { q: '你觉得一群人的长途旅行怎么样？', opts: [
        { text: '我需要自己的房间和自己的作息', score: 0 }, { text: '还行，中间要有独处的时间', score: 1 },
        { text: '我挺享受的', score: 2 }, { text: '人越多越好', score: 3 }] },
      { q: '一个愉快的社交夜晚之后，你觉得：', opts: [
        { text: '就算很顺利，还是被掏空了', score: 0 }, { text: '满足，但可以收工了', score: 1 },
        { text: '兴奋劲儿还能持续一阵', score: 2 }, { text: '明天还想再来一次', score: 3 }] },
      { q: '成为全场焦点这件事：', opts: [
        { text: '真的很不自在', score: 0 }, { text: '短时间还行', score: 1 },
        { text: '场合对了会挺享受', score: 2 }, { text: '那才是最像我自己的时候', score: 3 }] },
    ],
    results: [
      { min: 0, max: 12, emoji: '🕯️', title: '深度充电型', color: 'from-slate-500 to-slate-700',
        desc: '有人在的时候你掉电很快，只有独处才补得回来。这不是害羞，是实打实的能量消耗。与其为此道歉，不如照着它来安排一周，日子会好过得多。把恢复的时间像会议一样写进日程里。',
        traits: ['需要独处', '专注得深', '有选择', '稳定'] },
      { min: 13, max: 14, emoji: '🌙', title: '安静的余量', color: 'from-indigo-500 to-violet-600',
        desc: '你应付得来社交，但事后要还。小圈子和熟面孔几乎不耗你，人多又生疏的场合就很费。每周守住一个真正空着的晚上，通常就够你保持平衡。',
        traits: ['适合小圈子', '独处恢复', '想得多', '一对一时温暖'] },
      { min: 15, max: 17, emoji: '🌤️', title: '平衡的电量', color: 'from-sky-500 to-blue-600',
        desc: '你在人群和独处之间转换得不费劲，这是实打实的长处。风险在于消耗攒起来了才察觉——在答应连着第四个晚上之前问问自己，而不是之后。',
        traits: ['适应力强', '好相处', '了解自己', '平稳'] },
      { min: 18, max: 30, emoji: '⚡', title: '靠人充电型', color: 'from-amber-400 to-orange-500',
        desc: '你的能量来自别人，所以空着的日程看起来像问题而不是休息。不过值得知道：独处仍然能给你一些人群给不了的东西——哪怕只是一小段安静，之后的一切都会更清楚。',
        traits: ['和人在一起就充电', '很快熟络', '表达丰富', '想到就做'] },
    ],
  },
  {
    slug: 'stress-style',
    title: '你怎么应对压力',
    desc: '压力之下你的默认反应，以及该拿它怎么办',
    icon: '🌊',
    category: '身心',
    questions: [
      { q: '截止日提前了一周。你第一反应是：', opts: [
        { text: '愣住，盯着看半天', score: 0 }, { text: '胃里发紧，然后开始列清单', score: 1 },
        { text: '马上重新排计划', score: 2 }, { text: '反而有点来劲', score: 3 }] },
      { q: '有压力的时候，你的睡眠：', opts: [
        { text: '彻底乱掉', score: 0 }, { text: '变短', score: 1 },
        { text: '大致照常', score: 2 }, { text: '完全不受影响', score: 3 }] },
      { q: '压力下你会不会找人说：', opts: [
        { text: '完全不说，我会闭嘴', score: 0 }, { text: '等事情过去才说', score: 1 },
        { text: '跟一个信得过的人说', score: 2 }, { text: '边发生边坦白地说', score: 3 }] },
      { q: '压力下你的身体：', opts: [
        { text: '头疼、胃疼、发紧，样样都来', score: 0 }, { text: '固定会犯一个毛病', score: 1 },
        { text: '只是有点紧绷', score: 2 }, { text: '几乎没反应', score: 3 }] },
      { q: '出了岔子之后你通常：', opts: [
        { text: '反反复复想上好几天', score: 0 }, { text: '纠结一个晚上', score: 1 },
        { text: '记下教训然后往前走', score: 2 }, { text: '几乎立刻就翻篇', score: 3 }] },
      { q: '事情堆得太多的时候，你：', opts: [
        { text: '一件都做不下去', score: 0 }, { text: '先挑最容易的做', score: 1 },
        { text: '排好顺序，从最上面开始', score: 2 }, { text: '分出去或者砍掉一些', score: 3 }] },
      { q: '工作上被批评，你的感受是：', opts: [
        { text: '扎得很深，而且很久', score: 0 }, { text: '当下难受，之后会淡', score: 1 },
        { text: '当成信息', score: 2 }, { text: '当成有用的东西', score: 3 }] },
      { q: '你惯常的解压方式是：', opts: [
        { text: '我没有', score: 0 }, { text: '刷手机或者吃点什么', score: 1 },
        { text: '散步、运动、泡个澡', score: 2 }, { text: '有安排、有规律的事', score: 3 }] },
      { q: '真出了急事，你是：', opts: [
        { text: '最先慌的那个', score: 0 }, { text: '手抖但还能动', score: 1 },
        { text: '够冷静', score: 2 }, { text: '全场最稳的那个', score: 3 }] },
      { q: '回头看最近一个难熬的月份：', opts: [
        { text: '我还背着它', score: 0 }, { text: '花了很久才甩掉', score: 1 },
        { text: '恢复得还算可以', score: 2 }, { text: '出来的时候比进去时更好了', score: 3 }] },
    ],
    results: [
      { min: 0, max: 12, emoji: '🫧', title: '全都吸进去', color: 'from-blue-500 to-indigo-700',
        desc: '压力会穿过你的防线，留在身体里。与其硬扛，不如当回事——压力表现为失眠和身体不适的那种模式，是会越积越多的。一个具体的出口，加上一个能说话的人，通常比多大的决心都管用。',
        traits: ['很敏感', '往里收', '需要恢复', '共情'] },
      { min: 13, max: 14, emoji: '🌧️', title: '慢慢熬过去', color: 'from-sky-500 to-blue-600',
        desc: '难熬的阶段你都撑过来了，但是要付代价，恢复也比你希望的慢。管用的是早点发现——该出手的时刻是睡眠刚开始变化的时候，而不是所有事都堆起来之后。',
        traits: ['扛得住', '恢复慢', '认真', '安静地坚韧'] },
      { min: 15, max: 17, emoji: '⛅', title: '压得住', color: 'from-emerald-500 to-teal-600',
        desc: '压力不会让你脱轨，主要是因为你一边感受一边照样运转。风险在于以为自己没事，因为还在干活：在压力下有产出，和不受压力影响，是两回事。',
        traits: ['务实', '沉着', '恢复得好', '靠得住'] },
      { min: 18, max: 30, emoji: '🗿', title: '风暴里的安静', color: 'from-slate-600 to-slate-800',
        desc: '事情不顺的时候你依旧持平，所以出事时大家都来找你。要留意的是：这么稳的人往往低估累积的负担，而周围的人也就不再问一句你还好吗。',
        traits: ['不动如山', '果断', '被信赖', '反应平缓'] },
    ],
  },
  {
    slug: 'decision-style',
    title: '你怎么做决定',
    desc: '凭直觉、讲逻辑，还是介于两者之间',
    icon: '🧭',
    category: '性格',
    questions: [
      { q: '和朋友挑吃饭的地方：', opts: [
        { text: '我先把评论全看一遍', score: 0 }, { text: '看两三条', score: 1 },
        { text: '推荐一家我喜欢过的', score: 2 }, { text: '看着顺眼就定', score: 3 }] },
      { q: '一笔大开销，你会考虑多久？', opts: [
        { text: '好几周，还做表格', score: 0 }, { text: '几天', score: 1 },
        { text: '一两天', score: 2 }, { text: '感觉对了就买', score: 3 }] },
      { q: '定下来之后你还会翻出来重想吗？', opts: [
        { text: '一直在想', score: 0 }, { text: '有时候', score: 1 },
        { text: '很少', score: 2 }, { text: '从不——就这么定了', score: 3 }] },
      { q: '有人来找你拿主意，你会：', opts: [
        { text: '问很多细节把情况弄清楚', score: 0 }, { text: '把选项摆出来', score: 1 },
        { text: '说我会怎么做', score: 2 }, { text: '当场就给答案', score: 3 }] },
      { q: '两个都不错的选项，分不出高下：', opts: [
        { text: '拖着，等情况替我决定', score: 0 }, { text: '列个清单比一比', score: 1 },
        { text: '过一夜再说', score: 2 }, { text: '凭直觉定', score: 3 }] },
      { q: '你多久会为一个决定后悔一次？', opts: [
        { text: '经常，而且很久', score: 0 }, { text: '有时候', score: 1 },
        { text: '很少', score: 2 }, { text: '几乎没有', score: 3 }] },
      { q: '会开到没人肯拍板的时候：', opts: [
        { text: '我等别人先说', score: 0 }, { text: '我问我们漏了什么', score: 1 },
        { text: '我提一个方案', score: 2 }, { text: '我拍板，然后往下走', score: 3 }] },
      { q: '你相信对一个人的第一印象吗？', opts: [
        { text: '完全不信', score: 0 }, { text: '信一点', score: 1 },
        { text: '基本上信', score: 2 }, { text: '几乎完全信', score: 3 }] },
      { q: '新信息和你的选择相冲突时：', opts: [
        { text: '整个决定都塌了', score: 0 }, { text: '认真重新考虑', score: 1 },
        { text: '要紧的话就调整', score: 2 }, { text: '基本上照原路走', score: 3 }] },
      { q: '你做决定时最容易掉的坑是：', opts: [
        { text: '干脆一直不定', score: 0 }, { text: '定得太晚', score: 1 },
        { text: '有一件事没核就定了', score: 2 }, { text: '定得太快，来不及回头', score: 3 }] },
    ],
    results: [
      { min: 0, max: 12, emoji: '🔍', title: '深思型', color: 'from-slate-500 to-slate-700',
        desc: '你要看清全局才肯落定，所以决定扎实，也慢。代价是实在的：你还在查的时候，选项已经过期了；而悬而未决的焦虑，往往比稍微选错的风险更重。给"选择"本身定个期限，而不只是给结果定。',
        traits: ['周全', '看得见风险', '善分析', '不轻易落定'] },
      { min: 13, max: 14, emoji: '⚖️', title: '权衡型', color: 'from-sky-500 to-indigo-600',
        desc: '你收集到足以放心的程度就定下来——这是个好习惯。要留意的是那种情形：最后 10% 的功课花掉 90% 的时间，结论却一点没变。',
        traits: ['平衡', '慎重', '务实', '讲道理'] },
      { min: 15, max: 17, emoji: '🎯', title: '拍板型', color: 'from-emerald-500 to-teal-600',
        desc: '信息够了你就快速行动，也很少回头，所以在没人愿意拍板的场合特别有用。有一个习惯值得保留：把你押注的那个前提说出来，这样它一旦落空你能察觉。',
        traits: ['果断', '自信', '向前走', '少后悔'] },
      { min: 18, max: 30, emoji: '⚡', title: '直觉型', color: 'from-amber-400 to-rose-500',
        desc: '你信直觉、动作快，在局势多变的时候这是真本事。碰上不可逆的决定，它就变成负担——好用的规矩是：只在没法反悔的事情上放慢，其余照旧快。',
        traits: ['快', '直觉', '先动手', '果断'] },
    ],
  },
  {
    slug: 'work-style',
    title: '你的工作方式',
    desc: '你实际上是怎么把事做完的，而不是你觉得应该怎么做',
    icon: '💼',
    category: '工作',
    questions: [
      { q: '你最好的产出发生在：', opts: [
        { text: '一整段没人打扰的长时间', score: 0 }, { text: '两三段专注的时段', score: 1 },
        { text: '一天里零散的短爆发', score: 2 }, { text: '有急事的时候', score: 3 }] },
      { q: '你的待办清单是：', opts: [
        { text: '详细而且一直在维护', score: 0 }, { text: '大致列着，基本照着走', score: 1 },
        { text: '几条随手记', score: 2 }, { text: '在脑子里', score: 3 }] },
      { q: '来了个没定期限的大项目：', opts: [
        { text: '我自己定一个，并且守住', score: 0 }, { text: '定一个，基本能守住', score: 1 },
        { text: '等我觉得准备好了再开始', score: 2 }, { text: '一直搁着，直到有什么逼过来', score: 3 }] },
      { q: '卡住的时候你会：', opts: [
        { text: '一直死磕', score: 0 }, { text: '短暂离开再回来', score: 1 },
        { text: '换一件事做', score: 2 }, { text: '马上找人问', score: 3 }] },
      { q: '一周里的会议：', opts: [
        { text: '把我一整天都打碎', score: 0 }, { text: '排在一起还能忍', score: 1 },
        { text: '是工作的正常部分', score: 2 }, { text: '是我脑子转得最快的地方', score: 3 }] },
      { q: '你偏好的工作是：', opts: [
        { text: '一个人往深里做', score: 0 }, { text: '基本独立，定期对齐', score: 1 },
        { text: '协作着做', score: 2 }, { text: '一直在对话里', score: 3 }] },
      { q: '你和截止日的关系：', opts: [
        { text: '早早就做完', score: 0 }, { text: '留有余地地做完', score: 1 },
        { text: '刚好赶上', score: 2 }, { text: '贴着边儿反而最能干', score: 3 }] },
      { q: '碰上无聊的活儿：', opts: [
        { text: '先干掉它清场', score: 0 }, { text: '给它排个时间', score: 1 },
        { text: '往后拖一阵', score: 2 }, { text: '它就一直躺在那儿', score: 3 }] },
      { q: '半成品阶段的反馈：', opts: [
        { text: '我宁愿先做完', score: 0 }, { text: '在几个节点上', score: 1 },
        { text: '相当频繁', score: 2 }, { text: '一路上随时都要', score: 3 }] },
      { q: '你的工位：', opts: [
        { text: '得收拾干净我才开得了工', score: 0 }, { text: '大体上是整齐的', score: 1 },
        { text: '有生活气息', score: 2 }, { text: '乱，但转得动', score: 3 }] },
    ],
    results: [
      { min: 0, max: 12, emoji: '🎯', title: '深度工作者', color: 'from-indigo-500 to-violet-700',
        desc: '你在安静的长时段里做出最好的东西，其余安排都围着保住这些时段转。这确实带来深度，但也让你经不起打断——划算的做法是每周死守两三个整块，其他一切保持灵活。',
        traits: ['专注', '有条理', '自驱', '受不了打断'] },
      { min: 13, max: 14, emoji: '📋', title: '稳健的计划者', color: 'from-sky-500 to-blue-600',
        desc: '你会计划、会分配节奏，说什么时候好就什么时候好。这份可靠比多数人以为的更值钱。只要偶尔确认一下：计划还在为工作服务，而不是反过来。',
        traits: ['可靠', '有条理', '节奏稳', '前后一致'] },
      { min: 15, max: 17, emoji: '🔄', title: '灵活机动型', color: 'from-emerald-500 to-teal-600',
        desc: '你成波地干活，切换轻松，对冒出来的事随时接得住。这很适合节奏快的工作。要留神的是：不停切换会让人觉得很有产出，同时又让真正难啃的问题更难收尾。',
        traits: ['适应力强', '响应快', '善协作', '利落'] },
      { min: 18, max: 30, emoji: '🔥', title: '压线爆发型', color: 'from-amber-400 to-rose-500',
        desc: '把你点着的是紧迫感，贴着截止日你反而交得漂亮。这套管用——直到两个截止日撞在一起。给自己造几个提前的小期限是老办法，比试着把自己改造成另一种人有效得多。',
        traits: ['压力下反应快', '临场应变', '有冲劲', '被期限驱动'] },
    ],
  },
  {
    slug: 'love-language',
    type: 'category',
    title: '你怎么表达在乎',
    desc: '你表达关心的方式，以及你希望被关心的方式',
    icon: '💝',
    category: '感情',
    questions: [
      { q: '伴侣今天过得很糟。你会：', opts: [
        { text: '把我欣赏他的地方具体说出来', score: 0, k: 'words' },
        { text: '坐在旁边，不多说什么', score: 1, k: 'time' },
        { text: '不声不响地替他挡掉一件事', score: 2, k: 'acts' },
        { text: '带一样他喜欢的东西回来', score: 3, k: 'gifts' }] },
      { q: '什么最让你觉得被在乎？', opts: [
        { text: '有人把话说出口', score: 0, k: 'words' }, { text: '不被打扰的相处时间', score: 1, k: 'time' },
        { text: '有人替我把事情办了', score: 2, k: 'acts' }, { text: '一件用心挑的东西', score: 3, k: 'gifts' }] },
      { q: '纪念日你的第一反应是：', opts: [
        { text: '写点什么', score: 0, k: 'words' }, { text: '计划一整天在一起', score: 1, k: 'time' },
        { text: '把他一直需要的实事办掉', score: 2, k: 'acts' }, { text: '找到那件对的礼物', score: 3, k: 'gifts' }] },
      { q: '一段关系里最伤人的是什么？', opts: [
        { text: '从来听不到一句"我们挺好的"', score: 0, k: 'words' }, { text: '人在旁边，心不在', score: 1, k: 'time' },
        { text: '什么都丢给我一个人扛', score: 2, k: 'acts' }, { text: '在最要紧的那天被忘掉', score: 3, k: 'gifts' }] },
      { q: '朋友正在经历难事：', opts: [
        { text: '我把我对他的看法讲给他听', score: 0, k: 'words' }, { text: '我空出一个晚上给他', score: 1, k: 'time' },
        { text: '我替他把一件实事办了', score: 2, k: 'acts' }, { text: '我给他寄点东西', score: 3, k: 'gifts' }] },
      { q: '你表达"我想你了"的方式是：', opts: [
        { text: '直接说出来', score: 0, k: 'words' }, { text: '马上腾出时间', score: 1, k: 'time' },
        { text: '替对方做点什么', score: 2, k: 'acts' }, { text: '带点东西回来', score: 3, k: 'gifts' }] },
      { q: '最能打动你的夸奖是：', opts: [
        { text: '关于我是个什么样的人，具体的那种', score: 0, k: 'words' }, { text: '"我总想和你多待一会儿"', score: 1, k: 'time' },
        { text: '"你总是把事情都照顾好"', score: 2, k: 'acts' }, { text: '"我看到这个就想到你"', score: 3, k: 'gifts' }] },
      { q: '吵架之后，什么最快能修好？', opts: [
        { text: '听到他仍然看重我什么', score: 0, k: 'words' }, { text: '坐下来好好谈一次', score: 1, k: 'time' },
        { text: '他做点什么把心意做出来', score: 2, k: 'acts' }, { text: '一个说明他想过这事的举动', score: 3, k: 'gifts' }] },
      { q: '伴侣要离开一个月。你会：', opts: [
        { text: '发很长的消息', score: 0, k: 'words' }, { text: '雷打不动地约好通话', score: 1, k: 'time' },
        { text: '把家里全扛下来，让他不用操心', score: 2, k: 'acts' }, { text: '给他寄东西', score: 3, k: 'gifts' }] },
      { q: '哪一样不见了你会最先发现？', opts: [
        { text: '有人把感受说给我听', score: 0, k: 'words' }, { text: '真正在一起的时间', score: 1, k: 'time' },
        { text: '不用开口就有人搭把手', score: 2, k: 'acts' }, { text: '那些小小的、用心的惊喜', score: 3, k: 'gifts' }] },
    ],
    results: [
      { min: 0, max: 0, k: 'words', emoji: '💬', title: '言语', color: 'from-sky-500 to-blue-600',
        desc: '你的爱是靠说出来的话来给和收的。有人明明白白讲出他看重你什么，比任何举动都更往心里去；而沉默会被你读成疏远，哪怕什么事都没有。这值得跟伴侣讲清楚——用别的方式表达爱的人，常常以为这不用说也看得见。',
        traits: ['靠说', '直接', '表达丰富', '让人安心'] },
      { min: 0, max: 0, k: 'time', emoji: '⏳', title: '时间', color: 'from-violet-500 to-purple-600',
        desc: '对你来说，注意力才是硬通货。一个人真的在场、手机收起来，比他买得起或说得出的任何东西都重。反过来说：人在身边却心不在焉，在你这里等同于缺席——与其憋着记恨，不如把这句话讲出来。',
        traits: ['在场', '专注', '有耐心', '重视连接'] },
      { min: 0, max: 0, k: 'acts', emoji: '🛠️', title: '行动', color: 'from-emerald-500 to-teal-600',
        desc: '你用做事来表达在乎，也会注意到谁默默替你办掉了你正发怵的那件事。对那些等着听见的人来说，你的关心可能是隐形的，所以偶尔除了做，也说一句。',
        traits: ['务实', '靠得住', '观察细', '不张扬'] },
      { min: 0, max: 0, k: 'gifts', emoji: '🎁', title: '心意', color: 'from-rose-400 to-pink-600',
        desc: '在你这里，一件东西装的是它背后的心思——"我看到这个就想到你"才是全部，价钱不是。所以在要紧的日子被忘掉，会疼得超出常理，这值得说明白，而不是指望别人自己领会。',
        traits: ['体贴', '重象征', '留意细节', '爱存回忆'] },
    ],
  },
];

export const TESTS_ZH_HANS_MAP: Record<string, Test> = Object.fromEntries(
  TESTS_ZH_HANS.map(t => [t.slug, t]),
);
