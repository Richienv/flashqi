const HSK5_EXAMPLES: Record<string, { cn: string; en: string }[]> = {
  '变动': [
    { cn: '公司最近人事变动很大。', en: 'There have been major personnel changes in the company recently.' },
    { cn: '计划有变动，请大家注意。', en: 'There are changes to the plan, please pay attention everyone.' },
    { cn: '价格随时可能发生变动。', en: 'Prices may change at any time.' },
  ],
  '便利': [
    { cn: '这家超市购物非常便利。', en: 'Shopping at this supermarket is very convenient.' },
    { cn: '网上支付给我们的生活带来了很多便利。', en: 'Online payment has brought a lot of convenience to our lives.' },
    { cn: '交通便利是选择住所的重要条件。', en: 'Convenient transportation is an important condition for choosing a residence.' },
  ],
  '便条': [
    { cn: '她在桌上留了一张便条。', en: 'She left a note on the table.' },
    { cn: '我写了一张便条提醒自己。', en: 'I wrote a note to remind myself.' },
    { cn: '请把这张便条转交给他。', en: 'Please pass this note to him.' },
  ],
  '便于': [
    { cn: '这样做便于管理。', en: 'Doing it this way is convenient for management.' },
    { cn: '为了便于查找，文件已经分类整理好了。', en: 'For ease of searching, the files have been sorted and organized.' },
    { cn: '我们把信息数字化，便于保存和传播。', en: 'We digitized the information to make it easy to store and share.' },
  ],
  '边境': [
    { cn: '士兵们在边境站岗。', en: 'Soldiers are standing guard at the border.' },
    { cn: '这个小镇靠近中越边境。', en: 'This small town is near the China-Vietnam border.' },
    { cn: '边境贸易促进了两国的经济发展。', en: 'Border trade has promoted economic development in both countries.' },
  ],
  '编辑': [
    { cn: '他是一名资深的编辑。', en: 'He is a senior editor.' },
    { cn: '这篇文章还需要编辑一下。', en: 'This article still needs some editing.' },
    { cn: '她正在编辑一本新书。', en: 'She is editing a new book.' },
  ],
  '拜访': [
    { cn: '明天我要去拜访老师。', en: 'I am going to pay a visit to my teacher tomorrow.' },
    { cn: '春节期间，我们拜访了很多亲戚。', en: 'During the Spring Festival, we visited many relatives.' },
    { cn: '他拜访了当地的一位专家。', en: 'He paid a visit to a local expert.' },
  ],
  '扮演': [
    { cn: '她在剧中扮演一个母亲的角色。', en: 'She plays the role of a mother in the drama.' },
    { cn: '他扮演的警察非常逼真。', en: 'The police officer he played was very realistic.' },
    { cn: '互联网在现代生活中扮演着重要角色。', en: 'The internet plays an important role in modern life.' },
  ],
  '棒': [
    { cn: '你做得真棒！', en: 'You did a great job!' },
    { cn: '他的球技很棒。', en: 'His ball skills are great.' },
    { cn: '这根木棒可以用来防身。', en: 'This wooden stick can be used for self-defense.' },
  ],
  '报答': [
    { cn: '我一定会报答你的恩情。', en: 'I will definitely repay your kindness.' },
    { cn: '他想用实际行动报答父母。', en: 'He wants to repay his parents with concrete actions.' },
    { cn: '这份恩情我无以报答。', en: 'I have no way to repay this kindness.' },
  ],
  '报警': [
    { cn: '发现小偷后，他立刻报警了。', en: 'After spotting the thief, he immediately called the police.' },
    { cn: '遇到危险要及时报警。', en: 'You should report to the police promptly when encountering danger.' },
    { cn: '火灾报警器响了。', en: 'The fire alarm went off.' },
  ],
  '抱怨': [
    { cn: '他总是抱怨工作太忙。', en: 'He always complains about being too busy with work.' },
    { cn: '抱怨解决不了问题。', en: 'Complaining won\'t solve the problem.' },
    { cn: '她从不抱怨生活的艰苦。', en: 'She never complains about the hardships of life.' },
  ],
  '拔': [
    { cn: '他去医院拔了一颗牙。', en: 'He went to the hospital to have a tooth pulled.' },
    { cn: '请帮我把这根钉子拔出来。', en: 'Please help me pull this nail out.' },
    { cn: '小孩在草地上拔草玩。', en: 'The child was pulling up grass on the lawn for fun.' },
  ],
  '白酒': [
    { cn: '中国人过年常喝白酒。', en: 'Chinese people often drink baijiu during the New Year.' },
    { cn: '这瓶白酒是五十年的陈酿。', en: 'This bottle of baijiu is aged fifty years.' },
    { cn: '他不太会喝白酒。', en: 'He can\'t really handle baijiu.' },
  ],
  '辈': [
    { cn: '他是我们这辈人中最优秀的。', en: 'He is the best among our generation.' },
    { cn: '老一辈的人非常勤劳。', en: 'The older generation is very hardworking.' },
    { cn: '我们晚辈应该孝敬长辈。', en: 'We younger ones should show filial respect to our elders.' },
  ],
  '被动': [
    { cn: '我们不能总是处于被动地位。', en: 'We can\'t always be in a passive position.' },
    { cn: '这个决定让公司陷入了被动局面。', en: 'This decision put the company in a passive situation.' },
    { cn: '他在谈判中很被动。', en: 'He was very passive in the negotiations.' },
  ],
  '必': [
    { cn: '这件事必有原因。', en: 'There must be a reason for this.' },
    { cn: '有志者事竟成，我必能做到。', en: 'Where there\'s a will there\'s a way; I will certainly make it.' },
    { cn: '言必信，行必果。', en: 'One must keep one\'s word and be resolute in action.' },
  ],
  '毕竟': [
    { cn: '他毕竟是个孩子，别太严格。', en: 'He is a child after all; don\'t be too strict.' },
    { cn: '毕竟我们是多年的朋友了。', en: 'After all, we have been friends for many years.' },
    { cn: '这件事毕竟不简单。', en: 'This matter is not simple after all.' },
  ],
  '闭幕': [
    { cn: '运动会下周闭幕。', en: 'The sports meet will close next week.' },
    { cn: '电影节已经闭幕了。', en: 'The film festival has already ended.' },
    { cn: '大会在热烈的掌声中闭幕。', en: 'The conference came to a close amid warm applause.' },
  ],
  '闭幕式': [
    { cn: '闭幕式上表演了精彩的节目。', en: 'Wonderful performances were presented at the closing ceremony.' },
    { cn: '你打算去看闭幕式吗？', en: 'Are you planning to watch the closing ceremony?' },
    { cn: '闭幕式在体育馆举行。', en: 'The closing ceremony was held in the stadium.' },
  ],
  '必需': [
    { cn: '食物和水是生活必需的。', en: 'Food and water are essential for life.' },
    { cn: '这是完成任务必需的工具。', en: 'These are the tools required to complete the task.' },
    { cn: '睡眠是身体健康所必需的。', en: 'Sleep is essential for physical health.' },
  ],
  '病毒': [
    { cn: '电脑中了病毒。', en: 'The computer got a virus.' },
    { cn: '这种病毒传播速度很快。', en: 'This virus spreads very fast.' },
    { cn: '科学家正在研究新型病毒。', en: 'Scientists are researching new types of viruses.' },
  ],
  '鼻子': [
    { cn: '她的鼻子又高又挺。', en: 'Her nose is tall and straight.' },
    { cn: '我感冒了，鼻子不通气。', en: 'I have a cold, and my nose is stuffy.' },
    { cn: '他摸了摸鼻子，没说话。', en: 'He touched his nose and said nothing.' },
  ],
  '博客': [
    { cn: '他每天都写博客。', en: 'He writes a blog every day.' },
    { cn: '我在博客上分享了旅行经历。', en: 'I shared my travel experience on my blog.' },
    { cn: '她的博客有很多粉丝。', en: 'Her blog has many followers.' },
  ],
  '博览会': [
    { cn: '世界博览会每五年举办一次。', en: 'The World Expo is held every five years.' },
    { cn: '这次博览会吸引了很多参展商。', en: 'This exposition attracted many exhibitors.' },
    { cn: '我们去参观了国际博览会。', en: 'We went to visit the international fair.' },
  ],
  '薄弱': [
    { cn: '他的数学基础比较薄弱。', en: 'His math foundation is rather weak.' },
    { cn: '公司管理方面存在薄弱环节。', en: 'There are weak links in the company\'s management.' },
    { cn: '我们要加强薄弱地区的建设。', en: 'We need to strengthen development in weak areas.' },
  ],
  '博士': [
    { cn: '她正在攻读博士学位。', en: 'She is currently pursuing a doctoral degree.' },
    { cn: '他是一位物理学博士。', en: 'He is a doctor of physics.' },
    { cn: '博士毕业后他留校任教。', en: 'After getting his Ph.D., he stayed at the university to teach.' },
  ],
  '博物馆': [
    { cn: '周末我们去了国家博物馆。', en: 'We went to the national museum on the weekend.' },
    { cn: '这座博物馆收藏了很多文物。', en: 'This museum houses many cultural relics.' },
    { cn: '博物馆每天免费开放。', en: 'The museum is open for free every day.' },
  ],
  '不曾': [
    { cn: '我不曾去过那个地方。', en: 'I have never been to that place.' },
    { cn: '他不曾想到会有这样的结果。', en: 'He had never expected such a result.' },
    { cn: '这种事她不曾经历过。', en: 'She has never experienced such a thing.' },
  ],
  '不得了': [
    { cn: '他高兴得不得了。', en: 'He was extremely happy.' },
    { cn: '这件事闹得不得了。', en: 'This matter has caused a huge fuss.' },
    { cn: '天气热得不得了。', en: 'The weather is unbearably hot.' },
  ],
  '不顾': [
    { cn: '他不顾危险去救人。', en: 'He rescued people regardless of the danger.' },
    { cn: '她不顾家人的反对出国了。', en: 'She went abroad despite her family\'s opposition.' },
    { cn: '他不顾一切地奔跑。', en: 'He ran recklessly without caring about anything.' },
  ],
  '不敢当': [
    { cn: '您太客气了，不敢当。', en: 'You are too kind; I don\'t deserve such praise.' },
    { cn: '大家这么说，我真不敢当。', en: 'Everyone says so, but I really don\'t deserve it.' },
    { cn: '称我为专家，实在不敢当。', en: 'Calling me an expert is really more than I deserve.' },
  ],
  '不良': [
    { cn: '吸烟是一种不良习惯。', en: 'Smoking is a bad habit.' },
    { cn: '这种药物可能有不良反应。', en: 'This medicine may have adverse reactions.' },
    { cn: '不良的饮食习惯会影响健康。', en: 'Unhealthy eating habits will affect your health.' },
  ],
  '不利': [
    { cn: '下雨天对我们比赛不利。', en: 'Rainy weather is unfavorable for our competition.' },
    { cn: '这个决定对他很不利。', en: 'This decision is very disadvantageous to him.' },
    { cn: '污染对环境极为不利。', en: 'Pollution is extremely harmful to the environment.' },
  ],
  '不免': [
    { cn: '第一次上台演讲，不免有些紧张。', en: 'Giving a speech on stage for the first time, one inevitably feels a bit nervous.' },
    { cn: '在国外生活，不免想家。', en: 'Living abroad, one inevitably feels homesick.' },
    { cn: '遇到这种事，不免让人生气。', en: 'Encountering such a thing, one can\'t help but feel angry.' },
  ],
  '不耐烦': [
    { cn: '他等了很久，开始不耐烦了。', en: 'He waited for a long time and started to get impatient.' },
    { cn: '老师对他的问题有些不耐烦。', en: 'The teacher was somewhat impatient with his questions.' },
    { cn: '别不耐烦，再等一会儿。', en: 'Don\'t be impatient; wait a bit longer.' },
  ],
  '不能不': [
    { cn: '这件事我不能不管。', en: 'I have to take care of this matter.' },
    { cn: '面对事实，你不能不承认。', en: 'Faced with the facts, you cannot but admit it.' },
    { cn: '他的成绩不能不让人佩服。', en: 'His achievements cannot help but be admired.' },
  ],
  '不时': [
    { cn: '他不时地抬头看看窗外。', en: 'He looked up from time to time to glance out the window.' },
    { cn: '路上不时有行人经过。', en: 'Pedestrians passed by now and then on the road.' },
    { cn: '她不时地发出笑声。', en: 'She burst out laughing from time to time.' },
  ],
  '不停': [
    { cn: '雨不停地下着。', en: 'The rain kept falling without stopping.' },
    { cn: '他不停地说话，让人受不了。', en: 'He kept talking nonstop, which was unbearable.' },
    { cn: '电话不停地响。', en: 'The phone kept ringing incessantly.' },
  ],
  '部位': [
    { cn: '请指出疼痛的部位。', en: 'Please point out the area where it hurts.' },
    { cn: '这个部位的肌肉需要锻炼。', en: 'The muscles in this part need to be exercised.' },
    { cn: '受伤部位已经消肿了。', en: 'The swelling in the injured area has gone down.' },
  ],
  '不幸': [
    { cn: '他不幸在事故中受伤了。', en: 'He was unfortunately injured in the accident.' },
    { cn: '这个家庭遭遇了不幸。', en: 'This family suffered misfortune.' },
    { cn: '不幸的是，航班取消了。', en: 'Unfortunately, the flight was cancelled.' },
  ],
  '不许': [
    { cn: '这里不许吸烟。', en: 'Smoking is not allowed here.' },
    { cn: '妈妈不许我晚上出去。', en: 'Mom doesn\'t allow me to go out at night.' },
    { cn: '考试期间不许交头接耳。', en: 'Whispering is not allowed during the exam.' },
  ],
  '不易': [
    { cn: '成功来之不易。', en: 'Success does not come easily.' },
    { cn: '这种材料不易变形。', en: 'This material doesn\'t deform easily.' },
    { cn: '创业不易，需要很大的勇气。', en: 'Starting a business is not easy and requires great courage.' },
  ],
  '不止': [
    { cn: '参加活动的人不止一百。', en: 'More than a hundred people attended the event.' },
    { cn: '她不止一次提醒过我。', en: 'She has reminded me more than once.' },
    { cn: '这个问题的影响不止于此。', en: 'The impact of this issue goes beyond this.' },
  ],
  '不足': [
    { cn: '人手不足是最大的问题。', en: 'Insufficient manpower is the biggest problem.' },
    { cn: '这篇文章有很多不足之处。', en: 'This article has many shortcomings.' },
    { cn: '经验不足导致了这次失败。', en: 'Lack of experience led to this failure.' },
  ],
  '包围': [
    { cn: '警察已经把大楼包围了。', en: 'The police have already surrounded the building.' },
    { cn: '这座城市被群山包围着。', en: 'This city is surrounded by mountains.' },
    { cn: '敌人被我军包围了。', en: 'The enemy was encircled by our army.' },
  ],
  '包装': [
    { cn: '这个礼物的包装很精美。', en: 'The packaging of this gift is very exquisite.' },
    { cn: '请帮我把这个东西包装一下。', en: 'Please help me wrap this thing up.' },
    { cn: '过度包装是一种浪费。', en: 'Excessive packaging is a waste.' },
  ],
  '背包': [
    { cn: '他背着一个大背包去旅行。', en: 'He went traveling with a big backpack.' },
    { cn: '我的背包里装满了书。', en: 'My backpack is filled with books.' },
    { cn: '她买了一个新背包。', en: 'She bought a new backpack.' },
  ],
  '悲剧': [
    { cn: '这部电影讲的是一个悲剧故事。', en: 'This movie tells a tragic story.' },
    { cn: '我们要避免悲剧再次发生。', en: 'We must prevent the tragedy from happening again.' },
    { cn: '莎士比亚写了很多悲剧。', en: 'Shakespeare wrote many tragedies.' },
  ],
  '悲伤': [
    { cn: '听到这个消息，她非常悲伤。', en: 'She was very sad upon hearing this news.' },
    { cn: '别太悲伤了，一切都会好起来的。', en: 'Don\'t be too sad; everything will get better.' },
    { cn: '他脸上满是悲伤的表情。', en: 'His face was full of sorrowful expression.' },
  ],
  '北极': [
    { cn: '北极的冰川正在融化。', en: 'The glaciers in the Arctic are melting.' },
    { cn: '北极熊生活在北极地区。', en: 'Polar bears live in the Arctic region.' },
    { cn: '他梦想有一天能去北极探险。', en: 'He dreams of exploring the North Pole one day.' },
  ],
  '本人': [
    { cn: '请本人携带身份证来办理。', en: 'Please come in person with your ID to process it.' },
    { cn: '这张照片和本人很像。', en: 'This photo looks very much like the person.' },
    { cn: '本人不同意这项决定。', en: 'I myself do not agree with this decision.' },
  ],
  '宾馆': [
    { cn: '我们住在市中心的宾馆里。', en: 'We are staying at a hotel in the city center.' },
    { cn: '这家宾馆的服务很好。', en: 'The service at this hotel is very good.' },
    { cn: '请帮我预订一家宾馆。', en: 'Please help me book a hotel.' },
  ],
  '玻璃': [
    { cn: '窗户的玻璃被打碎了。', en: 'The glass of the window was broken.' },
    { cn: '请小心，地上有碎玻璃。', en: 'Be careful, there is broken glass on the ground.' },
    { cn: '这扇门是玻璃做的。', en: 'This door is made of glass.' },
  ],
  '版': [
    { cn: '这是这本书的最新版。', en: 'This is the latest edition of this book.' },
    { cn: '这个新闻登在报纸的头版。', en: 'This news was published on the front page of the newspaper.' },
    { cn: '我买了一本英文版的小说。', en: 'I bought an English edition of the novel.' },
  ],
  '保卫': [
    { cn: '军队保卫着国家的安全。', en: 'The army defends the nation\'s security.' },
    { cn: '我们要保卫自己的家园。', en: 'We must defend our homeland.' },
    { cn: '保卫和平是每个人的责任。', en: 'Safeguarding peace is everyone\'s responsibility.' },
  ],
  '保养': [
    { cn: '汽车需要定期保养。', en: 'Cars need regular maintenance.' },
    { cn: '她很注意皮肤保养。', en: 'She pays a lot of attention to skincare.' },
    { cn: '机器保养得好可以用很多年。', en: 'A well-maintained machine can last for many years.' },
  ],
  '彼此': [
    { cn: '我们彼此信任。', en: 'We trust each other.' },
    { cn: '虽然分开了，但彼此还记在心里。', en: 'Although separated, we still keep each other in our hearts.' },
    { cn: '邻居之间应该彼此照顾。', en: 'Neighbors should take care of one another.' },
  ],
  '比方': [
    { cn: '打个比方来说，人生就像一场旅行。', en: 'For instance, life is like a journey.' },
    { cn: '比方说你是老板，你会怎么做？', en: 'For example, if you were the boss, what would you do?' },
    { cn: '他举了一个比方来解释这个概念。', en: 'He gave an analogy to explain this concept.' },
  ],
  '比重': [
    { cn: '服务业在经济中的比重越来越大。', en: 'The proportion of the service industry in the economy is growing.' },
    { cn: '这种金属的比重很高。', en: 'The specific gravity of this metal is very high.' },
    { cn: '出口在GDP中占很大比重。', en: 'Exports account for a large proportion of GDP.' },
  ],
  '饼': [
    { cn: '妈妈烙了几张饼。', en: 'Mom made several flatbreads.' },
    { cn: '这种饼又香又脆。', en: 'This kind of cake is fragrant and crispy.' },
    { cn: '中秋节要吃月饼。', en: 'You should eat mooncakes on the Mid-Autumn Festival.' },
  ],
  '饼干': [
    { cn: '孩子们都喜欢吃饼干。', en: 'Children all like to eat cookies.' },
    { cn: '她买了一盒饼干当零食。', en: 'She bought a box of crackers as snacks.' },
    { cn: '这种饼干味道很好。', en: 'These biscuits taste very good.' },
  ],
  '补偿': [
    { cn: '公司给受害者提供了经济补偿。', en: 'The company provided financial compensation to the victims.' },
    { cn: '我会用行动来补偿你的损失。', en: 'I will make up for your loss with action.' },
    { cn: '这笔钱不足以补偿他的损失。', en: 'This amount of money is not enough to compensate for his loss.' },
  ],
  '补贴': [
    { cn: '政府给农民发放了补贴。', en: 'The government issued subsidies to farmers.' },
    { cn: '公司每月有交通补贴。', en: 'The company provides a monthly transportation allowance.' },
    { cn: '他靠补贴才勉强维持生活。', en: 'He barely makes a living relying on subsidies.' },
  ],
  '创立': [
    { cn: '他创立了自己的公司。', en: 'He founded his own company.' },
    { cn: '这个品牌是十年前创立的。', en: 'This brand was established ten years ago.' },
    { cn: '她创立了一种新的教学方法。', en: 'She established a new teaching method.' },
  ],
  '传达': [
    { cn: '请把这个消息传达给大家。', en: 'Please convey this message to everyone.' },
    { cn: '他负责传达领导的指示。', en: 'He is responsible for relaying the leader\'s instructions.' },
    { cn: '这幅画传达了和平的理念。', en: 'This painting conveys the concept of peace.' },
  ],
  '传递': [
    { cn: '运动员们传递着奥运火炬。', en: 'The athletes are passing the Olympic torch.' },
    { cn: '请把这份文件传递给下一位同事。', en: 'Please pass this document to the next colleague.' },
    { cn: '音乐可以传递情感。', en: 'Music can transmit emotions.' },
  ],
  '传真': [
    { cn: '请把合同用传真发过来。', en: 'Please send the contract by fax.' },
    { cn: '传真机坏了，我们用邮件吧。', en: 'The fax machine is broken; let\'s use email.' },
    { cn: '我已经收到你的传真了。', en: 'I have already received your fax.' },
  ],
  '窗帘': [
    { cn: '她拉开了窗帘，阳光照了进来。', en: 'She opened the curtains and sunlight streamed in.' },
    { cn: '我们需要买一副新窗帘。', en: 'We need to buy new curtains.' },
    { cn: '这间卧室的窗帘颜色很好看。', en: 'The curtain color in this bedroom is very nice.' },
  ],
  '闯': [
    { cn: '他从小就在社会上闯荡。', en: 'He has been out making his way in the world since he was young.' },
    { cn: '那辆车闯了红灯。', en: 'That car ran a red light.' },
    { cn: '年轻人应该出去闯一闯。', en: 'Young people should go out and take on the world.' },
  ],
  '差点儿': [
    { cn: '我差点儿迟到了。', en: 'I almost arrived late.' },
    { cn: '他差点儿摔倒。', en: 'He almost fell down.' },
    { cn: '我差点儿忘了今天开会。', en: 'I almost forgot about today\'s meeting.' },
  ],
  '差一点儿': [
    { cn: '他差一点儿就赢了。', en: 'He almost won.' },
    { cn: '我差一点儿错过了飞机。', en: 'I almost missed the plane.' },
    { cn: '差一点儿就成功了，真可惜。', en: 'It was so close to succeeding; what a pity.' },
  ],
  '倡导': [
    { cn: '学校倡导健康的生活方式。', en: 'The school advocates a healthy lifestyle.' },
    { cn: '政府倡导节约用水。', en: 'The government advocates water conservation.' },
    { cn: '他倡导建立新的合作机制。', en: 'He proposed establishing a new cooperation mechanism.' },
  ],
  '查询': [
    { cn: '你可以在网上查询航班信息。', en: 'You can check flight information online.' },
    { cn: '我去银行查询了一下余额。', en: 'I went to the bank to check the balance.' },
    { cn: '请查询一下这个订单的状态。', en: 'Please check the status of this order.' },
  ],
  '肠': [
    { cn: '他的肠胃不太好。', en: 'His stomach and intestines are not in great shape.' },
    { cn: '大肠和小肠各有不同的功能。', en: 'The large intestine and small intestine each have different functions.' },
    { cn: '医生说他的肠有炎症。', en: 'The doctor said there is inflammation in his intestines.' },
  ],
  '尝': [
    { cn: '你尝尝这道菜好不好吃。', en: 'Try this dish and see if it\'s good.' },
    { cn: '我尝了一口，味道不错。', en: 'I had a taste; the flavor is quite good.' },
    { cn: '让我尝尝你做的蛋糕。', en: 'Let me taste the cake you made.' },
  ],
  '长度': [
    { cn: '这条河的长度超过五百公里。', en: 'The length of this river exceeds five hundred kilometers.' },
    { cn: '请测量一下这根绳子的长度。', en: 'Please measure the length of this rope.' },
    { cn: '文章的长度不能超过两千字。', en: 'The length of the article cannot exceed two thousand words.' },
  ],
  '尝试': [
    { cn: '我们应该勇于尝试新事物。', en: 'We should be brave enough to try new things.' },
    { cn: '他尝试了很多方法来解决问题。', en: 'He tried many methods to solve the problem.' },
    { cn: '这是一次大胆的尝试。', en: 'This is a bold attempt.' },
  ],
  '长寿': [
    { cn: '祝您健康长寿！', en: 'Wishing you health and longevity!' },
    { cn: '这个地区的人都很长寿。', en: 'The people in this region all have long lives.' },
    { cn: '运动是长寿的秘诀之一。', en: 'Exercise is one of the secrets to longevity.' },
  ],
  '乘': [
    { cn: '我每天乘地铁上班。', en: 'I take the subway to work every day.' },
    { cn: '他乘飞机去了北京。', en: 'He flew to Beijing.' },
    { cn: '趁机乘胜追击。', en: 'Take the opportunity to press the advantage.' },
  ],
  '承办': [
    { cn: '这次会议由我们部门承办。', en: 'This conference is organized by our department.' },
    { cn: '他承办了这个大型活动。', en: 'He undertook this large-scale event.' },
    { cn: '哪家公司承办了这个项目？', en: 'Which company undertook this project?' },
  ],
  '成本': [
    { cn: '我们要降低生产成本。', en: 'We need to reduce production costs.' },
    { cn: '这个项目的成本太高了。', en: 'The cost of this project is too high.' },
    { cn: '人工成本在不断上升。', en: 'Labor costs keep rising.' },
  ],
  '乘车': [
    { cn: '请乘车的乘客排好队。', en: 'Passengers boarding the vehicle, please line up.' },
    { cn: '我每天乘车要花一个小时。', en: 'I spend an hour riding in a vehicle every day.' },
    { cn: '乘车时请系好安全带。', en: 'Please fasten your seatbelt when riding in a vehicle.' },
  ],
  '成交': [
    { cn: '这笔生意终于成交了。', en: 'This deal was finally closed.' },
    { cn: '双方以一百万的价格成交。', en: 'Both sides reached a deal at a price of one million.' },
    { cn: '今天的成交量很大。', en: 'Today\'s trading volume is very large.' },
  ],
  '乘客': [
    { cn: '飞机上有两百多名乘客。', en: 'There are more than two hundred passengers on the plane.' },
    { cn: '请乘客们注意安全。', en: 'Please pay attention to safety, passengers.' },
    { cn: '这位乘客在车上睡着了。', en: 'This passenger fell asleep on the bus.' },
  ],
  '成效': [
    { cn: '新政策已经取得了明显的成效。', en: 'The new policy has achieved significant results.' },
    { cn: '减肥要坚持才能见成效。', en: 'You must persist with weight loss to see results.' },
    { cn: '治疗的成效令人满意。', en: 'The effect of the treatment is satisfactory.' },
  ],
  '成语': [
    { cn: '中国有很多有趣的成语。', en: 'China has many interesting idioms.' },
    { cn: '他喜欢在写作中使用成语。', en: 'He likes to use idioms in his writing.' },
    { cn: '"守株待兔"是一个常见的成语。', en: '"Waiting by the stump for a rabbit" is a common idiom.' },
  ],
  '乘坐': [
    { cn: '你可以乘坐公交车到达那里。', en: 'You can get there by taking the bus.' },
    { cn: '乘坐飞机旅行又快又方便。', en: 'Traveling by plane is fast and convenient.' },
    { cn: '他每天乘坐出租车上班。', en: 'He takes a taxi to work every day.' },
  ],
  '城里': [
    { cn: '他搬到城里去住了。', en: 'He moved to live in the city.' },
    { cn: '城里的生活节奏比较快。', en: 'The pace of life in the city is relatively fast.' },
    { cn: '她每周进城里买一次东西。', en: 'She goes into the city to shop once a week.' },
  ],
  '迟': [
    { cn: '你来得太迟了，电影已经开始了。', en: 'You came too late; the movie has already started.' },
    { cn: '迟到是不礼貌的行为。', en: 'Being late is impolite behavior.' },
    { cn: '他动作很迟，总是最后一个完成。', en: 'He is slow and always the last one to finish.' },
  ],
  '池子': [
    { cn: '花园里有一个小池子。', en: 'There is a small pool in the garden.' },
    { cn: '池子里养了很多金鱼。', en: 'There are many goldfish in the pond.' },
    { cn: '孩子们在池子边玩耍。', en: 'The children are playing by the pool.' },
  ],
  '臭': [
    { cn: '这条河水很臭。', en: 'The water in this river smells terrible.' },
    { cn: '冰箱里有东西变臭了。', en: 'Something in the refrigerator has gone bad and smells.' },
    { cn: '他的袜子真臭。', en: 'His socks really stink.' },
  ],
  '愁': [
    { cn: '她最近为找工作发愁。', en: 'She has been worrying about finding a job recently.' },
    { cn: '别愁了，办法总会有的。', en: 'Stop worrying; there will always be a way.' },
    { cn: '他愁得整夜睡不着觉。', en: 'He was so worried that he couldn\'t sleep all night.' },
  ],
  '厨房': [
    { cn: '妈妈在厨房做饭。', en: 'Mom is cooking in the kitchen.' },
    { cn: '我们家的厨房很宽敞。', en: 'Our kitchen is very spacious.' },
    { cn: '厨房里飘出了香味。', en: 'A delicious smell wafted from the kitchen.' },
  ],
  '除非': [
    { cn: '除非你亲自去，否则他不会相信。', en: 'Unless you go in person, he won\'t believe it.' },
    { cn: '除非下雨，我们明天去爬山。', en: 'Unless it rains, we will go hiking tomorrow.' },
    { cn: '除非有紧急情况，会议不会取消。', en: 'Unless there is an emergency, the meeting will not be cancelled.' },
  ],
  '除夕': [
    { cn: '除夕那天全家人一起吃年夜饭。', en: 'On New Year\'s Eve, the whole family eats the New Year dinner together.' },
    { cn: '除夕的夜晚到处是烟花。', en: 'Fireworks are everywhere on New Year\'s Eve.' },
    { cn: '中国人很重视除夕。', en: 'Chinese people attach great importance to New Year\'s Eve.' },
  ],
  '叉': [
    { cn: '请给我一把叉。', en: 'Please give me a fork.' },
    { cn: '他用叉子叉起一块牛排。', en: 'He picked up a piece of steak with a fork.' },
    { cn: '这个路口是一个叉路。', en: 'This intersection is a fork in the road.' },
  ],
  '插': [
    { cn: '她把花插在花瓶里。', en: 'She put the flowers in the vase.' },
    { cn: '请把插头插到插座上。', en: 'Please plug the plug into the socket.' },
    { cn: '别人说话的时候不要插嘴。', en: 'Don\'t interrupt when others are speaking.' },
  ],
  '差别': [
    { cn: '城市和农村的差别很大。', en: 'There is a big difference between urban and rural areas.' },
    { cn: '两者之间没有太大的差别。', en: 'There is not much difference between the two.' },
    { cn: '价格上的差别很明显。', en: 'The difference in price is very obvious.' },
  ],
  '差距': [
    { cn: '我们和发达国家还有一定的差距。', en: 'There is still a certain gap between us and developed countries.' },
    { cn: '他正在努力缩小差距。', en: 'He is working hard to narrow the gap.' },
    { cn: '贫富差距越来越大。', en: 'The gap between rich and poor is getting bigger and bigger.' },
  ],
  '叉子': [
    { cn: '你用筷子还是叉子？', en: 'Do you use chopsticks or a fork?' },
    { cn: '请再给我一把叉子。', en: 'Please give me another fork.' },
    { cn: '西餐通常用刀和叉子吃。', en: 'Western food is usually eaten with a knife and fork.' },
  ],
  '拆': [
    { cn: '他小心地把信拆开了。', en: 'He carefully opened the letter.' },
    { cn: '这座旧楼要拆了。', en: 'This old building is going to be torn down.' },
    { cn: '他喜欢把东西拆开来研究。', en: 'He likes to take things apart to study them.' },
  ],
  '拆除': [
    { cn: '政府决定拆除违章建筑。', en: 'The government decided to demolish illegal buildings.' },
    { cn: '这座桥已经被拆除了。', en: 'This bridge has been demolished.' },
    { cn: '施工队正在拆除旧围墙。', en: 'The construction team is dismantling the old wall.' },
  ],
  '超越': [
    { cn: '他超越了自己的极限。', en: 'He surpassed his own limits.' },
    { cn: '中国的经济总量已经超越了很多国家。', en: 'China\'s total economic output has surpassed that of many countries.' },
    { cn: '我们要不断超越自我。', en: 'We must continuously transcend ourselves.' },
  ],
  '车主': [
    { cn: '车主把车停在了路边。', en: 'The car owner parked the car on the roadside.' },
    { cn: '请车主尽快来挪车。', en: 'Please have the vehicle owner come move the car as soon as possible.' },
    { cn: '这辆车的车主是谁？', en: 'Who is the owner of this vehicle?' },
  ],
  '称号': [
    { cn: '他获得了"优秀教师"的称号。', en: 'He received the title of "Outstanding Teacher."' },
    { cn: '这个城市有"花城"的称号。', en: 'This city has the title of "City of Flowers."' },
    { cn: '她不在乎那些虚名称号。', en: 'She doesn\'t care about those empty titles.' },
  ],
  '吃力': [
    { cn: '他搬那个大箱子搬得很吃力。', en: 'He struggled to move that big box.' },
    { cn: '这门课学起来很吃力。', en: 'This course is very demanding to study.' },
    { cn: '老人爬楼梯很吃力。', en: 'It is strenuous for the elderly to climb stairs.' },
  ],
  '冲动': [
    { cn: '做事不要太冲动。', en: 'Don\'t be too impulsive when doing things.' },
    { cn: '他一时冲动说了不该说的话。', en: 'He impulsively said things he shouldn\'t have.' },
    { cn: '冲动是魔鬼。', en: 'Impulsiveness is the devil.' },
  ],
  '冲突': [
    { cn: '双方发生了激烈的冲突。', en: 'A fierce conflict broke out between the two sides.' },
    { cn: '我们要尽量避免冲突。', en: 'We should try to avoid conflicts.' },
    { cn: '他的计划和我的时间有冲突。', en: 'His plan conflicts with my schedule.' },
  ],
  '充足': [
    { cn: '这里的阳光很充足。', en: 'The sunlight here is abundant.' },
    { cn: '出发前要做好充足的准备。', en: 'Make sufficient preparations before departure.' },
    { cn: '充足的睡眠有利于健康。', en: 'Adequate sleep is good for health.' },
  ],
  '出版': [
    { cn: '这本书去年出版的。', en: 'This book was published last year.' },
    { cn: '他的新小说即将出版。', en: 'His new novel is about to be published.' },
    { cn: '这家出版社出版了很多畅销书。', en: 'This publishing house has published many bestsellers.' },
  ],
  '出差': [
    { cn: '他经常出差去外地。', en: 'He often goes on business trips to other places.' },
    { cn: '下周我要去上海出差。', en: 'I\'m going on a business trip to Shanghai next week.' },
    { cn: '出差的费用由公司报销。', en: 'Business trip expenses are reimbursed by the company.' },
  ],
  '出汗': [
    { cn: '运动后他出了一身汗。', en: 'He was covered in sweat after exercising.' },
    { cn: '天气太热了，不停地出汗。', en: 'The weather is too hot; I keep sweating.' },
    { cn: '紧张的时候他总是出汗。', en: 'He always sweats when he\'s nervous.' },
  ],
  '初期': [
    { cn: '改革初期遇到了很多困难。', en: 'Many difficulties were encountered in the initial stage of reform.' },
    { cn: '创业初期资金不足。', en: 'There was a lack of funding in the early stage of the business.' },
    { cn: '初期的症状并不明显。', en: 'The symptoms in the initial stage are not obvious.' },
  ],
  '出于': [
    { cn: '他这样做完全出于好意。', en: 'He did this entirely out of good intentions.' },
    { cn: '出于安全考虑，请系好安全带。', en: 'For safety reasons, please fasten your seatbelt.' },
    { cn: '她出于好奇打开了那个盒子。', en: 'She opened the box out of curiosity.' },
  ],
  '产业': [
    { cn: '旅游业是当地的主要产业。', en: 'Tourism is the main industry of the area.' },
    { cn: '他们家有很多产业。', en: 'Their family has a lot of property.' },
    { cn: '新兴产业发展很快。', en: 'Emerging industries are developing very fast.' },
  ],
  '场面': [
    { cn: '婚礼的场面非常盛大。', en: 'The wedding scene was very grand.' },
    { cn: '这个场面让人感动。', en: 'This scene moved people.' },
    { cn: '他很会应付各种场面。', en: 'He is good at handling various occasions.' },
  ],
  '厂长': [
    { cn: '厂长正在开会。', en: 'The factory director is in a meeting.' },
    { cn: '他被任命为新厂长。', en: 'He was appointed as the new factory director.' },
    { cn: '厂长决定扩大生产规模。', en: 'The factory director decided to expand the production scale.' },
  ],
  '丑': [
    { cn: '他觉得自己长得很丑。', en: 'He thinks he looks ugly.' },
    { cn: '这件衣服颜色真丑。', en: 'The color of this piece of clothing is really ugly.' },
    { cn: '丑小鸭最后变成了天鹅。', en: 'The ugly duckling eventually turned into a swan.' },
  ],
  '处罚': [
    { cn: '违反规定的人将受到处罚。', en: 'Those who violate the rules will be punished.' },
    { cn: '法院对他进行了处罚。', en: 'The court imposed a punishment on him.' },
    { cn: '这次处罚太轻了。', en: 'This punishment was too light.' },
  ],
  '处分': [
    { cn: '他因迟到被学校处分了。', en: 'He was disciplined by the school for being late.' },
    { cn: '这次处分会记入档案。', en: 'This disciplinary action will be put on record.' },
    { cn: '她受到了严重的处分。', en: 'She received a serious disciplinary action.' },
  ],
  '处在': [
    { cn: '我们处在一个信息爆炸的时代。', en: 'We are in an era of information explosion.' },
    { cn: '他处在人生的十字路口。', en: 'He is at a crossroads in life.' },
    { cn: '公司目前处在发展的关键阶段。', en: 'The company is currently at a critical stage of development.' },
  ],
  '脆': [
    { cn: '这个苹果又甜又脆。', en: 'This apple is both sweet and crispy.' },
    { cn: '她的声音清脆悦耳。', en: 'Her voice is clear and pleasant.' },
    { cn: '这种材料比较脆，容易断。', en: 'This material is rather brittle and breaks easily.' },
  ],
  '裁判': [
    { cn: '裁判做出了公正的判决。', en: 'The referee made a fair judgment.' },
    { cn: '这场比赛的裁判是谁？', en: 'Who is the referee for this game?' },
    { cn: '球迷们对裁判的判罚很不满。', en: 'The fans were very dissatisfied with the referee\'s call.' },
  ],
  '册': [
    { cn: '这套书一共有三册。', en: 'This set of books has three volumes in total.' },
    { cn: '请翻到第二册第五页。', en: 'Please turn to page five of volume two.' },
    { cn: '他送了我一册诗集。', en: 'He gave me a book of poetry.' },
  ],
  '层次': [
    { cn: '这篇文章层次分明。', en: 'This article has clear structure and layers.' },
    { cn: '不同层次的学生需要不同的教学方法。', en: 'Students of different levels need different teaching methods.' },
    { cn: '这幅画的色彩层次很丰富。', en: 'The color gradation of this painting is very rich.' },
  ],
  '辞典': [
    { cn: '我经常查辞典学新词。', en: 'I often look up new words in the dictionary.' },
    { cn: '这本辞典收录了十万个词条。', en: 'This dictionary contains one hundred thousand entries.' },
    { cn: '他正在编写一本辞典。', en: 'He is compiling a dictionary.' },
  ],
  '辞职': [
    { cn: '他递交了辞职信。', en: 'He submitted his resignation letter.' },
    { cn: '她决定辞职去创业。', en: 'She decided to resign and start her own business.' },
    { cn: '辞职之前要考虑清楚。', en: 'Think carefully before resigning.' },
  ],
  '从中': [
    { cn: '我从中学到了很多。', en: 'I learned a lot from it.' },
    { cn: '他从中获得了很大的利益。', en: 'He gained great benefits from it.' },
    { cn: '我们要从中吸取教训。', en: 'We should draw lessons from it.' },
  ],
  '从而': [
    { cn: '他努力学习，从而考上了大学。', en: 'He studied hard and thus got into college.' },
    { cn: '降低成本，从而提高竞争力。', en: 'Reducing costs, thereby improving competitiveness.' },
    { cn: '坚持锻炼，从而增强了体质。', en: 'By persisting in exercise, he thus improved his physique.' },
  ],
  '寸': [
    { cn: '他没有让步一寸。', en: 'He didn\'t give an inch.' },
    { cn: '光阴一寸值千金。', en: 'Every inch of time is worth its weight in gold.' },
    { cn: '这块地寸土寸金。', en: 'Every inch of this land is worth a fortune.' },
  ],
  '存款': [
    { cn: '他在银行有一笔存款。', en: 'He has a deposit in the bank.' },
    { cn: '我每个月都会存款。', en: 'I save money every month.' },
    { cn: '她的存款不多了。', en: 'She doesn\'t have much savings left.' },
  ],
  '猜': [
    { cn: '你猜我遇到谁了？', en: 'Guess who I ran into?' },
    { cn: '我猜他大概三十岁。', en: 'I guess he is about thirty years old.' },
    { cn: '让我猜猜你想说什么。', en: 'Let me guess what you want to say.' },
  ],
  '猜测': [
    { cn: '大家对结果有各种猜测。', en: 'Everyone has various guesses about the result.' },
    { cn: '不要随便猜测别人的想法。', en: 'Don\'t casually speculate about other people\'s thoughts.' },
    { cn: '他的猜测被证明是正确的。', en: 'His conjecture proved to be correct.' },
  ],
  '餐馆': [
    { cn: '这家餐馆的菜很好吃。', en: 'The food at this restaurant is very delicious.' },
    { cn: '我们去附近的餐馆吃饭吧。', en: 'Let\'s go eat at a nearby restaurant.' },
    { cn: '这条街上有很多餐馆。', en: 'There are many restaurants on this street.' },
  ],
  '餐厅': [
    { cn: '公司的餐厅在二楼。', en: 'The company\'s dining hall is on the second floor.' },
    { cn: '我在餐厅等你。', en: 'I\'ll wait for you in the dining room.' },
    { cn: '这家餐厅装修得很漂亮。', en: 'This restaurant is decorated very nicely.' },
  ],
  '餐饮': [
    { cn: '餐饮行业竞争很激烈。', en: 'The food and beverage industry is very competitive.' },
    { cn: '他从事餐饮业已经十年了。', en: 'He has been in the catering business for ten years.' },
    { cn: '这个商场的餐饮区在三楼。', en: 'The food and beverage area of this mall is on the third floor.' },
  ],
  '聪明': [
    { cn: '这个孩子非常聪明。', en: 'This child is very intelligent.' },
    { cn: '她聪明又勤奋。', en: 'She is both smart and hardworking.' },
    { cn: '聪明人不会犯同样的错误。', en: 'A smart person won\'t make the same mistake twice.' },
  ],
  '采购': [
    { cn: '公司派他去采购原材料。', en: 'The company sent him to purchase raw materials.' },
    { cn: '采购部门负责买办公用品。', en: 'The procurement department is responsible for buying office supplies.' },
    { cn: '我们需要集中采购来降低成本。', en: 'We need centralized purchasing to reduce costs.' },
  ],
  '彩票': [
    { cn: '他买彩票中了大奖。', en: 'He won a big prize from buying a lottery ticket.' },
    { cn: '买彩票纯粹靠运气。', en: 'Buying lottery tickets is purely a matter of luck.' },
    { cn: '她每周都会买一张彩票。', en: 'She buys a lottery ticket every week.' },
  ],
  '草原': [
    { cn: '内蒙古的草原非常美丽。', en: 'The grasslands of Inner Mongolia are very beautiful.' },
    { cn: '牛羊在草原上吃草。', en: 'Cattle and sheep graze on the prairie.' },
    { cn: '我们在草原上搭了帐篷。', en: 'We set up tents on the grassland.' },
  ],
  '此后': [
    { cn: '此后他再也没有回来。', en: 'After that, he never came back.' },
    { cn: '事故发生后，此后的日子很难过。', en: 'After the accident, the days that followed were hard.' },
    { cn: '此后两国的关系有所改善。', en: 'Thereafter, the relationship between the two countries improved.' },
  ],
  '此刻': [
    { cn: '此刻我非常激动。', en: 'I am very excited at this moment.' },
    { cn: '此刻他正在飞往伦敦的途中。', en: 'At this moment, he is on his way to London.' },
    { cn: '此刻最重要的是冷静。', en: 'The most important thing at this moment is to stay calm.' },
  ],
  '此时': [
    { cn: '此时夜已经深了。', en: 'By this time, the night was already deep.' },
    { cn: '此时此刻，我想感谢所有人。', en: 'At this very moment, I want to thank everyone.' },
    { cn: '此时的他已经是一位成功的企业家了。', en: 'By now, he was already a successful entrepreneur.' },
  ],
  '电池': [
    { cn: '手机电池没电了。', en: 'The phone battery is dead.' },
    { cn: '请帮我换一下遥控器的电池。', en: 'Please help me replace the batteries in the remote.' },
    { cn: '这种电池可以充电。', en: 'This type of battery is rechargeable.' },
  ],
  '电饭锅': [
    { cn: '用电饭锅做饭很方便。', en: 'Cooking with an electric rice cooker is very convenient.' },
    { cn: '我买了一个新电饭锅。', en: 'I bought a new electric rice cooker.' },
    { cn: '电饭锅里的饭已经熟了。', en: 'The rice in the rice cooker is done.' },
  ],
  '电子版': [
    { cn: '这本书有电子版吗？', en: 'Is there an electronic version of this book?' },
    { cn: '我把电子版发到你的邮箱。', en: 'I\'ll send the digital version to your email.' },
    { cn: '现在很多人喜欢看电子版的报纸。', en: 'Nowadays many people prefer reading the digital edition of newspapers.' },
  ],
  '调动': [
    { cn: '他被调动到另一个部门。', en: 'He was transferred to another department.' },
    { cn: '领导善于调动员工的积极性。', en: 'The leader is good at motivating employees\' enthusiasm.' },
    { cn: '公司调动了大量资源。', en: 'The company mobilized a large amount of resources.' },
  ],
  '丢': [
    { cn: '我把钥匙丢了。', en: 'I lost my keys.' },
    { cn: '别把垃圾丢在地上。', en: 'Don\'t throw garbage on the ground.' },
    { cn: '她丢了一个很重要的文件。', en: 'She lost a very important document.' },
  ],
  '典礼': [
    { cn: '毕业典礼在大礼堂举行。', en: 'The graduation ceremony was held in the auditorium.' },
    { cn: '他出席了开幕典礼。', en: 'He attended the opening ceremony.' },
    { cn: '颁奖典礼非常隆重。', en: 'The award ceremony was very grand.' },
  ],
  '点燃': [
    { cn: '他点燃了一支蜡烛。', en: 'He lit a candle.' },
    { cn: '这场演讲点燃了大家的热情。', en: 'This speech ignited everyone\'s enthusiasm.' },
    { cn: '请不要在室内点燃烟花。', en: 'Please do not light fireworks indoors.' },
  ],
  '对立': [
    { cn: '双方的意见完全对立。', en: 'The opinions of both sides are completely opposed.' },
    { cn: '我们不应该把自己和别人对立起来。', en: 'We should not set ourselves against others.' },
    { cn: '对立的两派终于坐下来谈判了。', en: 'The two opposing factions finally sat down to negotiate.' },
  ],
  '对应': [
    { cn: '每个问题都有对应的答案。', en: 'Every question has a corresponding answer.' },
    { cn: '这两组数据是一一对应的。', en: 'These two sets of data correspond one-to-one.' },
    { cn: '英文单词和中文意思要对应准确。', en: 'English words must correspond accurately to Chinese meanings.' },
  ],
  '堆': [
    { cn: '桌上堆了一堆文件。', en: 'A pile of documents is stacked on the desk.' },
    { cn: '孩子们在堆雪人。', en: 'The children are making a snowman.' },
    { cn: '角落里堆着很多箱子。', en: 'Many boxes are piled up in the corner.' },
  ],
  '躲': [
    { cn: '他躲在门后面。', en: 'He hid behind the door.' },
    { cn: '下雨了，我们快找个地方躲雨。', en: 'It\'s raining; let\'s quickly find a place to take shelter.' },
    { cn: '问题来了不能躲，要面对。', en: 'When problems come, you can\'t hide; you must face them.' },
  ],
  '朵': [
    { cn: '他送给她一朵玫瑰花。', en: 'He gave her a rose.' },
    { cn: '天上飘着几朵白云。', en: 'A few white clouds float in the sky.' },
    { cn: '花园里开了好几朵牡丹花。', en: 'Several peony flowers have bloomed in the garden.' },
  ],
  '大都': [
    { cn: '来参加会议的大都是专家。', en: 'Those who came to the meeting were mostly experts.' },
    { cn: '孩子们大都喜欢吃甜食。', en: 'Children mostly like to eat sweets.' },
    { cn: '这些问题大都可以解决。', en: 'Most of these problems can be solved.' },
  ],
  '大胆': [
    { cn: '他很大胆地提出了自己的想法。', en: 'He boldly put forward his own ideas.' },
    { cn: '大胆尝试才能有新发现。', en: 'Only by daring to try can we make new discoveries.' },
    { cn: '这是一个大胆的计划。', en: 'This is a bold plan.' },
  ],
  '大纲': [
    { cn: '老师发了课程大纲。', en: 'The teacher distributed the course outline.' },
    { cn: '写文章之前先列一个大纲。', en: 'Make an outline before writing the article.' },
    { cn: '考试大纲已经公布了。', en: 'The exam syllabus has been announced.' },
  ],
  '大伙儿': [
    { cn: '大伙儿一起去吃饭吧。', en: 'Let\'s all go eat together.' },
    { cn: '大伙儿都赞成这个方案。', en: 'Everyone agrees with this plan.' },
    { cn: '有事大伙儿商量着来。', en: 'If something comes up, let\'s all discuss it together.' },
  ],
  '大奖赛': [
    { cn: '他参加了国际钢琴大奖赛。', en: 'He participated in the international piano grand prix.' },
    { cn: '这次大奖赛的奖金很丰厚。', en: 'The prize money for this grand prix is very generous.' },
    { cn: 'F1大奖赛在上海举行。', en: 'The F1 Grand Prix was held in Shanghai.' },
  ],
  '大脑': [
    { cn: '大脑是人体最重要的器官之一。', en: 'The brain is one of the most important organs in the body.' },
    { cn: '运动对大脑有好处。', en: 'Exercise is good for the brain.' },
    { cn: '他的大脑反应很快。', en: 'His brain reacts very quickly.' },
  ],
  '大事': [
    { cn: '结婚是人生的大事。', en: 'Getting married is a major event in life.' },
    { cn: '国家大事关系到每个人。', en: 'National affairs are relevant to everyone.' },
    { cn: '别紧张，没什么大事。', en: 'Don\'t worry; it\'s nothing major.' },
  ],
  '大厅': [
    { cn: '酒店的大厅非常豪华。', en: 'The hotel lobby is very luxurious.' },
    { cn: '请在大厅等候。', en: 'Please wait in the hall.' },
    { cn: '活动在学校的大厅举行。', en: 'The event was held in the school hall.' },
  ],
  '大象': [
    { cn: '大象是陆地上最大的动物。', en: 'Elephants are the largest animals on land.' },
    { cn: '动物园里有两头大象。', en: 'There are two elephants in the zoo.' },
    { cn: '孩子们很喜欢看大象表演。', en: 'Children love watching elephant shows.' },
  ],
  '大熊猫': [
    { cn: '大熊猫是中国的国宝。', en: 'The giant panda is China\'s national treasure.' },
    { cn: '大熊猫喜欢吃竹子。', en: 'Giant pandas like to eat bamboo.' },
    { cn: '我在动物园看到了大熊猫。', en: 'I saw giant pandas at the zoo.' },
  ],
  '大于': [
    { cn: '十大于五。', en: 'Ten is greater than five.' },
    { cn: '这个项目的收入大于支出。', en: 'The revenue of this project is greater than the expenditure.' },
    { cn: '需求大于供给。', en: 'Demand is greater than supply.' },
  ],
  '大致': [
    { cn: '我大致了解了情况。', en: 'I have a rough understanding of the situation.' },
    { cn: '他大致说了一下计划。', en: 'He roughly described the plan.' },
    { cn: '大致上这个方案是可行的。', en: 'Roughly speaking, this plan is feasible.' },
  ],
  '代价': [
    { cn: '成功是有代价的。', en: 'Success comes at a price.' },
    { cn: '他为此付出了沉重的代价。', en: 'He paid a heavy price for this.' },
    { cn: '不惜一切代价完成任务。', en: 'Complete the task at all costs.' },
  ],
  '贷款': [
    { cn: '他向银行申请了一笔贷款。', en: 'He applied for a loan from the bank.' },
    { cn: '贷款买房是很普遍的做法。', en: 'Taking out a loan to buy a house is a very common practice.' },
    { cn: '这笔贷款的利息是多少？', en: 'What is the interest on this loan?' },
  ],
  '代理': [
    { cn: '她是这个品牌的代理商。', en: 'She is the agent for this brand.' },
    { cn: '经理不在时由他代理。', en: 'He acts on behalf of the manager when the manager is away.' },
    { cn: '我们在寻找一个区域代理。', en: 'We are looking for a regional agent.' },
  ],
  '带有': [
    { cn: '他说话总是带有一点口音。', en: 'He always speaks with a slight accent.' },
    { cn: '这篇文章带有明显的偏见。', en: 'This article has an obvious bias.' },
    { cn: '她的笑容带有一丝忧伤。', en: 'Her smile carries a hint of sadness.' },
  ],
  '弹': [
    { cn: '子弹穿过了墙壁。', en: 'The bullet went through the wall.' },
    { cn: '这种弹药已经过期了。', en: 'This ammunition has expired.' },
    { cn: '炸弹被成功拆除了。', en: 'The bomb was successfully defused.' },
  ],
  '蛋糕': [
    { cn: '生日蛋糕上插了八根蜡烛。', en: 'Eight candles were placed on the birthday cake.' },
    { cn: '她做的蛋糕非常好吃。', en: 'The cake she made is very delicious.' },
    { cn: '我们去买个蛋糕庆祝一下。', en: 'Let\'s go buy a cake to celebrate.' },
  ],
  '道德': [
    { cn: '我们应该遵守社会道德。', en: 'We should abide by social morality.' },
    { cn: '他是一个有道德的人。', en: 'He is a person of virtue.' },
    { cn: '道德教育非常重要。', en: 'Moral education is very important.' },
  ],
  '到来': [
    { cn: '春天的到来让人心情愉快。', en: 'The arrival of spring makes people feel cheerful.' },
    { cn: '他的到来让大家很高兴。', en: 'His arrival made everyone happy.' },
    { cn: '随着新年的到来，大家都很兴奋。', en: 'With the arrival of the new year, everyone is excited.' },
  ],
  '倒是': [
    { cn: '他没来，她倒是来了。', en: 'He didn\'t come, but she actually did.' },
    { cn: '这个办法倒是不错。', en: 'This method is actually quite good.' },
    { cn: '你说得倒是轻松。', en: 'It\'s easy for you to say.' },
  ],
  '达成': [
    { cn: '双方最终达成了协议。', en: 'Both sides finally reached an agreement.' },
    { cn: '经过谈判，我们达成了一致。', en: 'After negotiations, we reached a consensus.' },
    { cn: '他达成了自己的目标。', en: 'He accomplished his goal.' },
  ],
  '答复': [
    { cn: '请尽快给我答复。', en: 'Please reply to me as soon as possible.' },
    { cn: '他的答复让我很满意。', en: 'His reply satisfied me very much.' },
    { cn: '我们还在等他们的答复。', en: 'We are still waiting for their reply.' },
  ],
  '得了': [
    { cn: '得了，别再说了。', en: 'All right, stop talking about it.' },
    { cn: '得了吧，我不信。', en: 'Come on, I don\'t believe it.' },
    { cn: '得了，就这样决定了。', en: 'All right, that\'s settled then.' },
  ],
  '得以': [
    { cn: '在大家的帮助下，问题得以解决。', en: 'With everyone\'s help, the problem was able to be solved.' },
    { cn: '他的才能得以充分发挥。', en: 'His talents were able to be fully utilized.' },
    { cn: '这项技术使产量得以提高。', en: 'This technology enabled the output to increase.' },
  ],
  '递': [
    { cn: '请把那本书递给我。', en: 'Please hand me that book.' },
    { cn: '他递了一杯水过来。', en: 'He passed a glass of water over.' },
    { cn: '她递上了自己的名片。', en: 'She handed over her business card.' },
  ],
  '地带': [
    { cn: '这是一个危险的地带。', en: 'This is a dangerous zone.' },
    { cn: '热带地带气候炎热。', en: 'Tropical zones have hot climates.' },
    { cn: '沿海地带经济比较发达。', en: 'Coastal zones have relatively developed economies.' },
  ],
  '递给': [
    { cn: '她把笔递给了同学。', en: 'She handed the pen to her classmate.' },
    { cn: '请把盐递给我。', en: 'Please pass me the salt.' },
    { cn: '他把文件递给了经理。', en: 'He handed the document to the manager.' },
  ],
  '地形': [
    { cn: '这里的地形非常复杂。', en: 'The terrain here is very complex.' },
    { cn: '作战前要先了解地形。', en: 'Before battle, one must first understand the terrain.' },
    { cn: '中国的地形多种多样。', en: 'China\'s topography is diverse.' },
  ],
  '地震': [
    { cn: '昨天发生了一场地震。', en: 'An earthquake occurred yesterday.' },
    { cn: '地震造成了严重的损失。', en: 'The earthquake caused severe losses.' },
    { cn: '这个地区经常发生地震。', en: 'Earthquakes frequently occur in this area.' },
  ],
  '冻': [
    { cn: '水管冻住了。', en: 'The water pipe froze.' },
    { cn: '外面太冷了，我快冻死了。', en: 'It\'s too cold outside; I\'m freezing to death.' },
    { cn: '把剩菜冻起来以后再吃。', en: 'Freeze the leftovers and eat them later.' },
  ],
  '洞': [
    { cn: '墙上有一个洞。', en: 'There is a hole in the wall.' },
    { cn: '他们发现了一个山洞。', en: 'They discovered a cave.' },
    { cn: '衣服上破了一个洞。', en: 'A hole has been torn in the clothes.' },
  ],
  '动机': [
    { cn: '他的动机是什么？', en: 'What is his motive?' },
    { cn: '警察正在调查犯罪动机。', en: 'The police are investigating the motive for the crime.' },
    { cn: '我怀疑他的动机不纯。', en: 'I suspect his motives are not pure.' },
  ],
  '动手': [
    { cn: '别光说不动手。', en: 'Don\'t just talk without taking action.' },
    { cn: '他先动手打了人。', en: 'He threw the first punch.' },
    { cn: '我们现在就动手做吧。', en: 'Let\'s get started on it now.' },
  ],
  '动态': [
    { cn: '请关注市场的最新动态。', en: 'Please pay attention to the latest market developments.' },
    { cn: '我们要了解行业动态。', en: 'We need to understand industry trends.' },
    { cn: '他时刻关注着国际局势的动态。', en: 'He keeps a constant eye on developments in the international situation.' },
  ],
  '动员': [
    { cn: '政府动员了大量人力抗洪。', en: 'The government mobilized a large number of people to fight the flood.' },
    { cn: '校长动员全体师生参加活动。', en: 'The principal mobilized all teachers and students to participate.' },
    { cn: '战争开始前进行了总动员。', en: 'A general mobilization was carried out before the war began.' },
  ],
  '豆制品': [
    { cn: '豆制品含有丰富的蛋白质。', en: 'Soybean products are rich in protein.' },
    { cn: '中国人很喜欢吃各种豆制品。', en: 'Chinese people love to eat various soybean products.' },
    { cn: '常见的豆制品有豆腐和豆浆。', en: 'Common soybean products include tofu and soy milk.' },
  ],
  '毒': [
    { cn: '这种蘑菇有毒。', en: 'This kind of mushroom is poisonous.' },
    { cn: '他被毒蛇咬了一口。', en: 'He was bitten by a venomous snake.' },
    { cn: '毒品对身体危害极大。', en: 'Drugs are extremely harmful to the body.' },
  ],
  '答': [
    { cn: '老师问了一个问题，他马上就答出来了。', en: 'The teacher asked a question, and he answered it right away.' },
    { cn: '请用中文答题。', en: 'Please answer the questions in Chinese.' },
    { cn: '他答对了所有的问题。', en: 'He answered all the questions correctly.' },
  ],
  '呆': [
    { cn: '他站在那里发呆。', en: 'He stood there in a daze.' },
    { cn: '别呆着了，快行动！', en: 'Stop being dull; act quickly!' },
    { cn: '她吓得呆住了。', en: 'She was so scared that she froze.' },
  ],
  '待': [
    { cn: '他在家待了一整天。', en: 'He stayed at home for the whole day.' },
    { cn: '你打算在这里待多久？', en: 'How long do you plan to stay here?' },
    { cn: '她在北京待了三年。', en: 'She stayed in Beijing for three years.' },
  ],
  '单一': [
    { cn: '这个国家的经济结构比较单一。', en: 'The economic structure of this country is rather singular.' },
    { cn: '饮食不能太单一。', en: 'One\'s diet should not be too monotonous.' },
    { cn: '单一的方法解决不了复杂的问题。', en: 'A single method cannot solve complex problems.' },
  ],
  '当场': [
    { cn: '小偷被当场抓住了。', en: 'The thief was caught on the spot.' },
    { cn: '他当场就答应了。', en: 'He agreed on the spot.' },
    { cn: '她当场就哭了起来。', en: 'She burst into tears right then and there.' },
  ],
  '当代': [
    { cn: '这是一部当代文学作品。', en: 'This is a contemporary literary work.' },
    { cn: '当代年轻人面临很多压力。', en: 'Contemporary young people face a lot of pressure.' },
    { cn: '他是当代最有名的画家之一。', en: 'He is one of the most famous painters of the contemporary era.' },
  ],
  '当年': [
    { cn: '当年他还是一个穷学生。', en: 'Back then, he was still a poor student.' },
    { cn: '回想当年，真是感慨万千。', en: 'Looking back on those days, one is filled with emotion.' },
    { cn: '当年的同学现在都成了各行各业的精英。', en: 'The classmates from those days have all become elites in various fields.' },
  ],
  '当前': [
    { cn: '当前最重要的任务是发展经济。', en: 'The most important task at present is to develop the economy.' },
    { cn: '我们要面对当前的困难。', en: 'We must face the current difficulties.' },
    { cn: '当前的国际形势比较复杂。', en: 'The current international situation is rather complex.' },
  ],
  '当选': [
    { cn: '他当选为班长。', en: 'He was elected class president.' },
    { cn: '她当选了新一届主席。', en: 'She was elected as the new chairperson.' },
    { cn: '他以高票当选。', en: 'He was elected by a large majority of votes.' },
  ],
  '等候': [
    { cn: '请在候车室等候。', en: 'Please wait in the waiting room.' },
    { cn: '我已经等候多时了。', en: 'I have been waiting for a long time.' },
    { cn: '他在门口等候她。', en: 'He waited for her at the entrance.' },
  ],
  '等级': [
    { cn: '这家酒店是五星等级的。', en: 'This hotel is five-star rated.' },
    { cn: '他通过了英语四级等级考试。', en: 'He passed the Level 4 English proficiency exam.' },
    { cn: '不同等级的产品价格不同。', en: 'Products of different grades have different prices.' },
  ],
  '低于': [
    { cn: '今天的气温低于零度。', en: 'Today\'s temperature is below zero.' },
    { cn: '他的工资低于平均水平。', en: 'His salary is below the average level.' },
    { cn: '这个价格低于成本。', en: 'This price is lower than the cost.' },
  ],
  '吨': [
    { cn: '这辆卡车能装十吨货物。', en: 'This truck can carry ten tons of cargo.' },
    { cn: '今年产量达到了五百万吨。', en: 'This year\'s output reached five million tons.' },
    { cn: '这座桥的承重是二十吨。', en: 'The load capacity of this bridge is twenty tons.' },
  ],
  '打扮': [
    { cn: '她今天打扮得很漂亮。', en: 'She dressed up beautifully today.' },
    { cn: '出门前她总要打扮一番。', en: 'She always dresses up before going out.' },
    { cn: '他打扮成圣诞老人。', en: 'He dressed up as Santa Claus.' },
  ],
  '打包': [
    { cn: '吃不完的菜我们打包带走。', en: 'Let\'s pack up the food we can\'t finish and take it with us.' },
    { cn: '我要打包行李了。', en: 'I need to pack my luggage.' },
    { cn: '服务员，请帮我打包。', en: 'Waiter, please pack this up for me.' },
  ],
  '打架': [
    { cn: '两个男孩在操场上打架。', en: 'Two boys were fighting on the playground.' },
    { cn: '打架是不对的。', en: 'Fighting is wrong.' },
    { cn: '他因为打架被处分了。', en: 'He was disciplined for fighting.' },
  ],
  '打击': [
    { cn: '这件事对他是一个沉重的打击。', en: 'This was a heavy blow to him.' },
    { cn: '政府正在严厉打击犯罪活动。', en: 'The government is cracking down severely on criminal activities.' },
    { cn: '别让失败打击你的信心。', en: 'Don\'t let failure undermine your confidence.' },
  ],
  '打扰': [
    { cn: '对不起，打扰一下。', en: 'Excuse me, sorry to bother you.' },
    { cn: '请不要打扰他学习。', en: 'Please don\'t disturb his studying.' },
    { cn: '很抱歉打扰你的休息。', en: 'I\'m sorry to disturb your rest.' },
  ],
  '胆': [
    { cn: '他胆很大，什么都不怕。', en: 'He has a lot of guts and is afraid of nothing.' },
    { cn: '我没有胆量跟他说。', en: 'I don\'t have the courage to tell him.' },
    { cn: '吓得他胆战心惊。', en: 'It scared him out of his wits.' },
  ],
  '胆小': [
    { cn: '他从小就很胆小。', en: 'He has been timid since childhood.' },
    { cn: '别那么胆小，大胆一点。', en: 'Don\'t be so timid; be bolder.' },
    { cn: '她胆小得连虫子都害怕。', en: 'She is so timid that she is even afraid of bugs.' },
  ],
  '挡': [
    { cn: '大树挡住了阳光。', en: 'The big tree blocked the sunlight.' },
    { cn: '你别挡着我的路。', en: 'Don\'t block my way.' },
    { cn: '他用手挡住了飞来的球。', en: 'He blocked the flying ball with his hand.' },
  ],
  '放大': [
    { cn: '请把这张照片放大一倍。', en: 'Please enlarge this photo by one size.' },
    { cn: '他用放大镜观察昆虫。', en: 'He uses a magnifying glass to observe insects.' },
    { cn: '不要把小问题放大。', en: 'Don\'t blow small problems out of proportion.' },
  ],
  '放弃': [
    { cn: '他不愿意放弃自己的梦想。', en: 'He is unwilling to give up his dream.' },
    { cn: '遇到困难不能轻易放弃。', en: 'Don\'t give up easily when encountering difficulties.' },
    { cn: '她放弃了出国留学的机会。', en: 'She gave up the opportunity to study abroad.' },
  ],
  '罚': [
    { cn: '老师罚他站了一节课。', en: 'The teacher punished him by making him stand for one class period.' },
    { cn: '他因为违反交通规则被罚了。', en: 'He was fined for violating traffic rules.' },
    { cn: '迟到要罚款。', en: 'Being late will result in a fine.' },
  ],
  '罚款': [
    { cn: '他因超速被罚款五百元。', en: 'He was fined five hundred yuan for speeding.' },
    { cn: '乱扔垃圾会被罚款。', en: 'Littering will result in a fine.' },
    { cn: '这次罚款的金额不小。', en: 'The amount of this fine is not small.' },
  ],
  '繁荣': [
    { cn: '这座城市越来越繁荣。', en: 'This city is becoming more and more prosperous.' },
    { cn: '经济的繁荣带来了人民生活水平的提高。', en: 'Economic prosperity has raised people\'s living standards.' },
    { cn: '我们要共同促进文化繁荣。', en: 'We must work together to promote cultural prosperity.' },
  ],
  '防治': [
    { cn: '政府加大了污染防治力度。', en: 'The government has increased efforts in pollution prevention and control.' },
    { cn: '防治疾病需要大家共同努力。', en: 'Preventing and treating diseases requires everyone\'s joint efforts.' },
    { cn: '专家们正在研究这种病的防治方法。', en: 'Experts are studying methods to prevent and treat this disease.' },
  ],
  '附件': [
    { cn: '邮件里有一个附件。', en: 'There is an attachment in the email.' },
    { cn: '请查看附件中的文件。', en: 'Please check the file in the attachment.' },
    { cn: '我忘了添加附件了。', en: 'I forgot to add the attachment.' },
  ],
  '负责人': [
    { cn: '请问这个项目的负责人是谁？', en: 'May I ask who is the person in charge of this project?' },
    { cn: '负责人正在开会。', en: 'The person in charge is in a meeting.' },
    { cn: '他被任命为新的负责人。', en: 'He was appointed as the new person in charge.' },
  ],
  '扶': [
    { cn: '他扶着老人过马路。', en: 'He helped the elderly person cross the road.' },
    { cn: '摔倒了，快扶他起来。', en: 'He fell down; quickly help him up.' },
    { cn: '她扶着栏杆慢慢走下楼。', en: 'She held onto the railing and slowly walked downstairs.' },
  ],
  '幅': [
    { cn: '墙上挂着一幅画。', en: 'A painting hangs on the wall.' },
    { cn: '这幅照片拍得真好。', en: 'This photo was taken really well.' },
    { cn: '他画了一幅山水画。', en: 'He painted a landscape painting.' },
  ],
  '服从': [
    { cn: '军人必须服从命令。', en: 'Soldiers must obey orders.' },
    { cn: '少数服从多数。', en: 'The minority should defer to the majority.' },
    { cn: '他不愿意服从不合理的要求。', en: 'He is unwilling to comply with unreasonable demands.' },
  ],
  '幅度': [
    { cn: '今年工资的涨幅度不大。', en: 'The extent of salary increases this year is not large.' },
    { cn: '物价上涨幅度超出了预期。', en: 'The range of price increases exceeded expectations.' },
    { cn: '气温下降的幅度很大。', en: 'The temperature dropped by a large extent.' },
  ],
  '福利': [
    { cn: '公司的福利待遇很好。', en: 'The company\'s benefits are very good.' },
    { cn: '社会福利制度需要不断完善。', en: 'The social welfare system needs continuous improvement.' },
    { cn: '这是员工的福利活动。', en: 'This is a welfare activity for employees.' },
  ],
  '发布': [
    { cn: '政府发布了新的政策。', en: 'The government released a new policy.' },
    { cn: '公司发布了年度报告。', en: 'The company issued its annual report.' },
    { cn: '他在网上发布了一条消息。', en: 'He posted a message online.' },
  ],
  '发觉': [
    { cn: '我发觉他最近变了很多。', en: 'I noticed that he has changed a lot recently.' },
    { cn: '她发觉有人跟踪自己。', en: 'She became aware that someone was following her.' },
    { cn: '等他发觉的时候已经太晚了。', en: 'By the time he realized it, it was already too late.' },
  ],
  '发射': [
    { cn: '火箭成功发射了。', en: 'The rocket was successfully launched.' },
    { cn: '卫星发射基地在西北。', en: 'The satellite launch base is in the northwest.' },
    { cn: '他们正在准备发射新的卫星。', en: 'They are preparing to launch a new satellite.' },
  ],
  '发行': [
    { cn: '这张专辑全球发行。', en: 'This album was released worldwide.' },
    { cn: '银行发行了新版纸币。', en: 'The bank issued new banknotes.' },
    { cn: '这本杂志每月发行一次。', en: 'This magazine is published once a month.' },
  ],
  '分成': [
    { cn: '老师把学生分成了四组。', en: 'The teacher divided the students into four groups.' },
    { cn: '一个苹果分成两半。', en: 'An apple is divided into two halves.' },
    { cn: '利润按比例分成。', en: 'Profits are split proportionally.' },
  ],
  '分解': [
    { cn: '这种物质在水中可以分解。', en: 'This substance can decompose in water.' },
    { cn: '老师把这道题分解成几个步骤。', en: 'The teacher broke down this problem into several steps.' },
    { cn: '塑料很难被自然分解。', en: 'Plastic is difficult to decompose naturally.' },
  ],
  '分类': [
    { cn: '垃圾要分类处理。', en: 'Garbage needs to be sorted for disposal.' },
    { cn: '请把这些文件分类整理。', en: 'Please sort and organize these files.' },
    { cn: '图书馆的书按类别分类。', en: 'The books in the library are classified by category.' },
  ],
  '分离': [
    { cn: '他们不得不分离。', en: 'They had to separate.' },
    { cn: '分离了多年的家人终于团聚了。', en: 'The family that had been separated for many years was finally reunited.' },
    { cn: '这种技术可以将混合物分离。', en: 'This technology can separate mixtures.' },
  ],
  '分享': [
    { cn: '他经常在网上分享生活。', en: 'He often shares his life online.' },
    { cn: '谢谢你和我分享这个好消息。', en: 'Thank you for sharing this good news with me.' },
    { cn: '好东西要和朋友分享。', en: 'Good things should be shared with friends.' },
  ],
  '分析': [
    { cn: '我们需要仔细分析这些数据。', en: 'We need to carefully analyze this data.' },
    { cn: '他善于分析问题。', en: 'He is good at analyzing problems.' },
    { cn: '经过分析，原因找到了。', en: 'After analysis, the cause was found.' },
  ],
  '疯': [
    { cn: '你疯了吗？这太危险了！', en: 'Are you crazy? This is too dangerous!' },
    { cn: '他高兴得快要疯了。', en: 'He was so happy he was going crazy.' },
    { cn: '这条狗疯了，大家小心。', en: 'This dog has gone mad; everyone be careful.' },
  ],
  '风度': [
    { cn: '他是一个很有风度的绅士。', en: 'He is a very elegant gentleman.' },
    { cn: '失败了也要保持风度。', en: 'Even in defeat, one should maintain one\'s elegance.' },
    { cn: '他说话做事都很有风度。', en: 'He speaks and acts with great demeanor.' },
  ],
  '风光': [
    { cn: '这里的风光非常迷人。', en: 'The scenery here is very charming.' },
    { cn: '我们一路欣赏沿途的风光。', en: 'We enjoyed the views along the way.' },
    { cn: '海边的风光美极了。', en: 'The coastal scenery is absolutely beautiful.' },
  ],
  '疯狂': [
    { cn: '球迷们疯狂地欢呼。', en: 'The fans cheered wildly.' },
    { cn: '他疯狂地爱上了她。', en: 'He fell madly in love with her.' },
    { cn: '圣诞节期间人们疯狂购物。', en: 'People go on a shopping frenzy during Christmas.' },
  ],
  '丰收': [
    { cn: '今年是一个丰收的年份。', en: 'This year is a year of bumper harvest.' },
    { cn: '农民们庆祝丰收。', en: 'The farmers celebrate the bumper harvest.' },
    { cn: '辛勤的劳动换来了丰收。', en: 'Hard work brought a bumper harvest.' },
  ],
  '法规': [
    { cn: '我们必须遵守法律法规。', en: 'We must abide by laws and regulations.' },
    { cn: '新的法规即将生效。', en: 'The new regulations will take effect soon.' },
    { cn: '这项法规保护了消费者的权益。', en: 'This regulation protects the rights of consumers.' },
  ],
  '法制': [
    { cn: '国家要加强法制建设。', en: 'The nation must strengthen the construction of the legal system.' },
    { cn: '法制是社会稳定的基础。', en: 'The legal system is the foundation of social stability.' },
    { cn: '公民应该有法制意识。', en: 'Citizens should have awareness of the legal system.' },
  ],
  '返回': [
    { cn: '飞机即将返回北京。', en: 'The plane is about to return to Beijing.' },
    { cn: '他完成任务后返回了基地。', en: 'He returned to the base after completing the mission.' },
    { cn: '请按"返回"键。', en: 'Please press the "return" key.' },
  ],
  '辅助': [
    { cn: '这种药起辅助治疗的作用。', en: 'This medicine serves as an auxiliary treatment.' },
    { cn: '教学中可以使用辅助工具。', en: 'Auxiliary tools can be used in teaching.' },
    { cn: '他是项目的辅助人员。', en: 'He is the auxiliary staff for the project.' },
  ],
  '冠军': [
    { cn: '他获得了世界冠军。', en: 'He won the world championship.' },
    { cn: '我们的球队夺得了冠军。', en: 'Our team won the championship.' },
    { cn: '她是去年的游泳冠军。', en: 'She was last year\'s swimming champion.' },
  ],
  '柜子': [
    { cn: '把衣服放进柜子里。', en: 'Put the clothes in the cabinet.' },
    { cn: '厨房里有一个新柜子。', en: 'There is a new cupboard in the kitchen.' },
    { cn: '柜子里放满了书。', en: 'The cabinet is filled with books.' },
  ],
  '过度': [
    { cn: '过度饮酒对身体有害。', en: 'Excessive drinking is harmful to health.' },
    { cn: '不要过度紧张。', en: 'Don\'t be overly nervous.' },
    { cn: '他因为过度劳累病倒了。', en: 'He fell ill due to excessive fatigue.' },
  ],
  '过敏': [
    { cn: '她对花粉过敏。', en: 'She is allergic to pollen.' },
    { cn: '我吃海鲜会过敏。', en: 'I get allergic reactions from eating seafood.' },
    { cn: '他的皮肤比较容易过敏。', en: 'His skin is rather prone to allergies.' },
  ],
  '过于': [
    { cn: '他做事过于谨慎。', en: 'He is too cautious in doing things.' },
    { cn: '这个要求过于苛刻。', en: 'This requirement is excessively harsh.' },
    { cn: '不要对自己过于严格。', en: 'Don\'t be too strict with yourself.' },
  ],
  '国籍': [
    { cn: '他是什么国籍？', en: 'What nationality is he?' },
    { cn: '她已经加入了美国国籍。', en: 'She has already obtained American citizenship.' },
    { cn: '出入境时需要出示国籍证明。', en: 'You need to show proof of nationality when entering or leaving the country.' },
  ],
  '国民': [
    { cn: '国民的幸福是国家发展的目标。', en: 'The happiness of citizens is the goal of national development.' },
    { cn: '提高国民素质是教育的使命。', en: 'Improving the quality of the citizenry is the mission of education.' },
    { cn: '国民经济持续增长。', en: 'The national economy continues to grow.' },
  ],
  '关怀': [
    { cn: '感谢您对我的关怀。', en: 'Thank you for your care for me.' },
    { cn: '老师对学生充满了关怀。', en: 'The teacher is full of care for the students.' },
    { cn: '他需要家人更多的关怀。', en: 'He needs more care from his family.' },
  ],
  '关键': [
    { cn: '这是解决问题的关键。', en: 'This is the key to solving the problem.' },
    { cn: '关键时刻不能犯错。', en: 'You can\'t make mistakes at crucial moments.' },
    { cn: '成功的关键在于坚持。', en: 'The key to success lies in perseverance.' },
  ],
  '光荣': [
    { cn: '为国争光是很光荣的事。', en: 'Winning glory for the country is a very honorable thing.' },
    { cn: '劳动最光荣。', en: 'Labor is most glorious.' },
    { cn: '他光荣地完成了任务。', en: 'He accomplished the task with glory.' },
  ],
  '光线': [
    { cn: '这间房子的光线很好。', en: 'This room has good lighting.' },
    { cn: '光线太暗了，看不清楚。', en: 'The light is too dim to see clearly.' },
    { cn: '画家需要充足的光线。', en: 'A painter needs adequate lighting.' },
  ],
  '规划': [
    { cn: '城市规划需要长远考虑。', en: 'City planning requires long-term consideration.' },
    { cn: '我们要做好未来的规划。', en: 'We need to plan well for the future.' },
    { cn: '这个项目的规划很合理。', en: 'The planning of this project is very reasonable.' },
  ],
  '锅': [
    { cn: '妈妈用锅炖了一锅汤。', en: 'Mom used a pot to stew a pot of soup.' },
    { cn: '我买了一口新锅。', en: 'I bought a new pot.' },
    { cn: '火锅是中国人最爱的美食之一。', en: 'Hot pot is one of the favorite foods of Chinese people.' },
  ],
  '广泛': [
    { cn: '他的兴趣非常广泛。', en: 'His interests are very extensive.' },
    { cn: '这种技术的应用非常广泛。', en: 'This technology is very widely applied.' },
    { cn: '大家广泛讨论了这个问题。', en: 'Everyone discussed this issue extensively.' },
  ],
  '鬼': [
    { cn: '他不相信世上有鬼。', en: 'He doesn\'t believe there are ghosts in the world.' },
    { cn: '小孩子最怕鬼故事。', en: 'Children are most afraid of ghost stories.' },
    { cn: '他心里有鬼，所以不敢看我。', en: 'He has a guilty conscience, so he doesn\'t dare look at me.' },
  ],
  '个儿': [
    { cn: '他个儿很高。', en: 'He is very tall.' },
    { cn: '这孩子个儿长得真快。', en: 'This child is growing tall really fast.' },
    { cn: '她虽然个儿小，但力气大。', en: 'Although she is small in stature, she is strong.' },
  ],
  '隔壁': [
    { cn: '隔壁住着一对老夫妻。', en: 'An elderly couple lives next door.' },
    { cn: '隔壁太吵了，我睡不着。', en: 'It\'s too noisy next door; I can\'t sleep.' },
    { cn: '隔壁的孩子经常来找我玩。', en: 'The child next door often comes to play with me.' },
  ],
  '共计': [
    { cn: '参加会议的共计五十人。', en: 'A total of fifty people attended the meeting.' },
    { cn: '费用共计一万元。', en: 'The total cost is ten thousand yuan.' },
    { cn: '今年共计生产了两百万台。', en: 'This year, a total of two million units were produced.' },
  ],
  '共享': [
    { cn: '现在共享单车很流行。', en: 'Shared bikes are very popular now.' },
    { cn: '我们可以共享这个办公室。', en: 'We can share this office.' },
    { cn: '资源共享可以减少浪费。', en: 'Resource sharing can reduce waste.' },
  ],
  '顾问': [
    { cn: '他是公司的法律顾问。', en: 'He is the company\'s legal adviser.' },
    { cn: '我们聘请了一位财务顾问。', en: 'We hired a financial consultant.' },
    { cn: '顾问提出了很好的建议。', en: 'The consultant put forward very good suggestions.' },
  ],
  '干脆': [
    { cn: '既然下雨了，我们干脆在家看电影吧。', en: 'Since it\'s raining, let\'s just watch a movie at home.' },
    { cn: '他说话很干脆，从不拖泥带水。', en: 'He speaks very directly, never beating around the bush.' },
    { cn: '干脆把这件事告诉他吧。', en: 'Just go ahead and tell him about this.' },
  ],
  '干扰': [
    { cn: '噪音严重干扰了我的学习。', en: 'The noise seriously interfered with my studying.' },
    { cn: '请不要干扰别人工作。', en: 'Please don\'t disturb other people\'s work.' },
    { cn: '信号受到了干扰。', en: 'The signal was subject to interference.' },
  ],
  '干预': [
    { cn: '他不喜欢别人干预他的私事。', en: 'He doesn\'t like others to interfere in his personal affairs.' },
    { cn: '政府干预了市场。', en: 'The government intervened in the market.' },
    { cn: '父母不应过多干预孩子的选择。', en: 'Parents should not overly intervene in their children\'s choices.' },
  ],
  '钢笔': [
    { cn: '他用钢笔写了一封信。', en: 'He wrote a letter with a fountain pen.' },
    { cn: '这支钢笔是爷爷送给我的。', en: 'This fountain pen was given to me by my grandfather.' },
    { cn: '钢笔的墨水用完了。', en: 'The ink in the fountain pen has run out.' },
  ],
  '钢琴': [
    { cn: '她从小就学钢琴。', en: 'She has been learning piano since she was young.' },
    { cn: '他弹钢琴弹得非常好。', en: 'He plays the piano very well.' },
    { cn: '客厅里放着一架钢琴。', en: 'There is a piano in the living room.' },
  ],
  '高大': [
    { cn: '他长得又高大又帅气。', en: 'He is tall, big, and handsome.' },
    { cn: '路两旁种着高大的树。', en: 'Tall trees are planted on both sides of the road.' },
    { cn: '这座高大的建筑是新建的。', en: 'This tall building is newly built.' },
  ],
  '高度': [
    { cn: '飞机正在上升高度。', en: 'The plane is gaining altitude.' },
    { cn: '领导对这件事高度重视。', en: 'The leadership attaches great importance to this matter.' },
    { cn: '珠穆朗玛峰的高度超过八千米。', en: 'The height of Mount Everest exceeds eight thousand meters.' },
  ],
  '高跟鞋': [
    { cn: '她穿着一双红色的高跟鞋。', en: 'She is wearing a pair of red high-heeled shoes.' },
    { cn: '穿高跟鞋走路不太舒服。', en: 'Walking in high heels is not very comfortable.' },
    { cn: '这双高跟鞋很适合你。', en: 'These high heels suit you very well.' },
  ],
  '高温': [
    { cn: '夏天经常出现高温天气。', en: 'High temperatures often occur in summer.' },
    { cn: '高温下要注意防暑。', en: 'Take care to prevent heatstroke in high temperatures.' },
    { cn: '今天最高温度达到了四十度。', en: 'Today\'s high temperature reached forty degrees.' },
  ],
  '高原': [
    { cn: '青藏高原是世界上最高的高原。', en: 'The Qinghai-Tibet Plateau is the highest plateau in the world.' },
    { cn: '他到高原后有些高原反应。', en: 'He had some altitude sickness after arriving at the plateau.' },
    { cn: '高原上的风景非常壮观。', en: 'The scenery on the plateau is very spectacular.' },
  ],
  '高于': [
    { cn: '今年的销售额高于去年。', en: 'This year\'s sales are higher than last year\'s.' },
    { cn: '这个数字高于平均值。', en: 'This number is higher than the average.' },
    { cn: '他的成绩高于录取分数线。', en: 'His score is higher than the admission cutoff.' },
  ],
  '歌曲': [
    { cn: '这首歌曲很好听。', en: 'This song is very pleasant to listen to.' },
    { cn: '他创作了很多流行歌曲。', en: 'He has composed many popular songs.' },
    { cn: '大家一起唱了一首歌曲。', en: 'Everyone sang a song together.' },
  ],
  '跟前': [
    { cn: '他走到我跟前说了几句话。', en: 'He came up to me and said a few words.' },
    { cn: '孩子总喜欢待在妈妈跟前。', en: 'Children always like to stay close to their mothers.' },
    { cn: '她把椅子搬到窗户跟前。', en: 'She moved the chair to the front of the window.' },
  ],
  '跟随': [
    { cn: '他跟随师傅学了三年。', en: 'He followed his master and studied for three years.' },
    { cn: '请跟随导游参观。', en: 'Please follow the guide for the tour.' },
    { cn: '小狗一直跟随着主人。', en: 'The dog kept following its owner.' },
  ],
  '更换': [
    { cn: '这台电脑需要更换零件。', en: 'This computer needs to have parts replaced.' },
    { cn: '他更换了手机号码。', en: 'He changed his phone number.' },
    { cn: '定期更换密码可以保护安全。', en: 'Regularly changing passwords can protect security.' },
  ],
  '更新': [
    { cn: '请更新你的软件。', en: 'Please update your software.' },
    { cn: '网站的内容需要定期更新。', en: 'The content of the website needs to be updated regularly.' },
    { cn: '城市在不断更新发展。', en: 'The city is constantly renewing and developing.' },
  ],
  '公告': [
    { cn: '学校发布了一条公告。', en: 'The school issued an announcement.' },
    { cn: '请注意看公告栏上的通知。', en: 'Please pay attention to the notices on the bulletin board.' },
    { cn: '公司张贴了招聘公告。', en: 'The company posted a recruitment announcement.' },
  ],
  '公认': [
    { cn: '他是公认的好老师。', en: 'He is publicly recognized as a good teacher.' },
    { cn: '这是一个公认的事实。', en: 'This is an acknowledged fact.' },
    { cn: '她的能力是大家公认的。', en: 'Her ability is recognized by everyone.' },
  ],
  '公式': [
    { cn: '这个数学公式很重要。', en: 'This mathematical formula is very important.' },
    { cn: '他记住了所有的物理公式。', en: 'He memorized all the physics formulas.' },
    { cn: '请用公式计算面积。', en: 'Please use the formula to calculate the area.' },
  ],
  '工艺': [
    { cn: '中国的传统工艺非常精湛。', en: 'China\'s traditional craftsmanship is very exquisite.' },
    { cn: '这种工艺已经流传了几百年。', en: 'This craft has been passed down for hundreds of years.' },
    { cn: '他学习了陶瓷工艺。', en: 'He studied ceramic craftsmanship.' },
  ],
  '工艺品': [
    { cn: '这些工艺品做得非常精美。', en: 'These handicraft articles are made very exquisitely.' },
    { cn: '我买了一些工艺品作为纪念。', en: 'I bought some handicrafts as souvenirs.' },
    { cn: '民间工艺品很有特色。', en: 'Folk handicrafts are very distinctive.' },
  ],
  '公正': [
    { cn: '法官应该公正地判案。', en: 'Judges should pass judgment fairly.' },
    { cn: '我们需要一个公正的裁判。', en: 'We need a fair referee.' },
    { cn: '社会需要公正和平等。', en: 'Society needs justice and equality.' },
  ],
  '工作日': [
    { cn: '工作日我很忙，没时间休息。', en: 'I\'m very busy on workdays and have no time to rest.' },
    { cn: '银行只在工作日营业。', en: 'The bank is only open on weekdays.' },
    { cn: '请在工作日来办理手续。', en: 'Please come to handle the procedures on a working day.' },
  ],
  '沟': [
    { cn: '路边有一条排水沟。', en: 'There is a drainage ditch on the side of the road.' },
    { cn: '他不小心掉进了沟里。', en: 'He accidentally fell into the ditch.' },
    { cn: '这条沟很深，要小心。', en: 'This ditch is very deep; be careful.' },
  ],
  '沟通': [
    { cn: '良好的沟通很重要。', en: 'Good communication is very important.' },
    { cn: '我们需要和客户多沟通。', en: 'We need to communicate more with clients.' },
    { cn: '父母应该经常和孩子沟通。', en: 'Parents should communicate with their children often.' },
  ],
  '估计': [
    { cn: '我估计他明天不会来。', en: 'I estimate he won\'t come tomorrow.' },
    { cn: '这项工程的费用估计要一百万。', en: 'The cost of this project is estimated at one million.' },
    { cn: '据估计，参加活动的人超过了三千。', en: 'It is estimated that more than three thousand people attended the event.' },
  ],
  '改革': [
    { cn: '中国的改革开放取得了巨大成就。', en: 'China\'s reform and opening up has achieved great accomplishments.' },
    { cn: '公司正在进行内部改革。', en: 'The company is undergoing internal reform.' },
    { cn: '教育改革势在必行。', en: 'Education reform is imperative.' },
  ],
  '感想': [
    { cn: '你对这部电影有什么感想？', en: 'What are your thoughts on this movie?' },
    { cn: '听完演讲后，我有很多感想。', en: 'After hearing the speech, I had many reflections.' },
    { cn: '请大家谈谈自己的感想。', en: 'Please share your reflections, everyone.' },
  ],
  '搞': [
    { cn: '他在搞科学研究。', en: 'He is doing scientific research.' },
    { cn: '你搞清楚了没有？', en: 'Have you figured it out?' },
    { cn: '别把事情搞复杂了。', en: 'Don\'t make things complicated.' },
  ],
  '搞好': [
    { cn: '我们一定要搞好这次活动。', en: 'We must do a good job with this event.' },
    { cn: '搞好环境卫生是大家的责任。', en: 'Maintaining good environmental hygiene is everyone\'s responsibility.' },
    { cn: '他把工作搞好了才回家。', en: 'He went home only after finishing his work well.' },
  ],
  '鼓': [
    { cn: '他在打鼓。', en: 'He is playing the drum.' },
    { cn: '锣鼓声震天响。', en: 'The sound of gongs and drums was deafening.' },
    { cn: '节日里到处都是鼓声。', en: 'During the festival, the sound of drums is everywhere.' },
  ],
  '鼓励': [
    { cn: '老师经常鼓励我们好好学习。', en: 'The teacher often encourages us to study hard.' },
    { cn: '谢谢你的鼓励。', en: 'Thank you for your encouragement.' },
    { cn: '父母的鼓励让他充满了信心。', en: 'His parents\' encouragement filled him with confidence.' },
  ],
  '古老': [
    { cn: '这是一座古老的城市。', en: 'This is an ancient city.' },
    { cn: '中国有很多古老的传统。', en: 'China has many age-old traditions.' },
    { cn: '这棵古老的树已经有三百年了。', en: 'This ancient tree is already three hundred years old.' },
  ],
  '鼓掌': [
    { cn: '演出结束后，观众热烈鼓掌。', en: 'After the performance, the audience applauded enthusiastically.' },
    { cn: '大家为他的成功鼓掌。', en: 'Everyone clapped for his success.' },
    { cn: '他的演讲赢得了阵阵鼓掌。', en: 'His speech won rounds of applause.' },
  ],
  '滚': [
    { cn: '球滚到了马路对面。', en: 'The ball rolled to the other side of the road.' },
    { cn: '水已经滚了，可以泡茶了。', en: 'The water has boiled; you can make tea now.' },
    { cn: '滚开！别碰我的东西！', en: 'Get lost! Don\'t touch my stuff!' },
  ],
  '划分': [
    { cn: '全国划分为几个大区。', en: 'The country is divided into several major regions.' },
    { cn: '我们要把任务划分清楚。', en: 'We need to divide up the tasks clearly.' },
    { cn: '这个标准怎么划分的？', en: 'How is this standard divided up?' },
  ],
  '画面': [
    { cn: '电影的画面非常美。', en: 'The visuals in the movie are very beautiful.' },
    { cn: '这个画面让我印象深刻。', en: 'This scene left a deep impression on me.' },
    { cn: '摄像头拍下了当时的画面。', en: 'The camera captured the scene at that time.' },
  ],
  '化石': [
    { cn: '考古学家发现了恐龙化石。', en: 'Archaeologists discovered dinosaur fossils.' },
    { cn: '这块化石有几百万年的历史。', en: 'This fossil is millions of years old.' },
    { cn: '博物馆里陈列着很多化石。', en: 'Many fossils are displayed in the museum.' },
  ],
  '滑': [
    { cn: '地上很滑，小心走路。', en: 'The ground is slippery; walk carefully.' },
    { cn: '孩子们在冰上滑来滑去。', en: 'The children are sliding back and forth on the ice.' },
    { cn: '他滑了一跤。', en: 'He slipped and fell.' },
  ],
  '华语': [
    { cn: '华语是东南亚地区通用的语言之一。', en: 'Chinese is one of the commonly used languages in Southeast Asia.' },
    { cn: '他是华语歌坛的天王。', en: 'He is a king of the Chinese-language music scene.' },
    { cn: '这部华语电影获得了大奖。', en: 'This Chinese-language film won a major award.' },
  ],
  '环节': [
    { cn: '这是工作中最重要的环节。', en: 'This is the most important link in the work.' },
    { cn: '每个环节都不能出错。', en: 'No mistakes can be made at any stage.' },
    { cn: '节目中有互动环节。', en: 'There is an interactive segment in the program.' },
  ],
  '汇款': [
    { cn: '他每个月给家里汇款。', en: 'He remits money home every month.' },
    { cn: '请通过银行汇款。', en: 'Please remit the money through the bank.' },
    { cn: '汇款已经到账了。', en: 'The remittance has been received.' },
  ],
  '会谈': [
    { cn: '两国领导人举行了正式会谈。', en: 'Leaders of the two countries held formal talks.' },
    { cn: '会谈取得了积极的成果。', en: 'The talks achieved positive results.' },
    { cn: '双方将在下周进行会谈。', en: 'Both sides will hold talks next week.' },
  ],
  '回报': [
    { cn: '付出总会有回报。', en: 'Effort always pays off in return.' },
    { cn: '他希望得到丰厚的投资回报。', en: 'He hopes for a generous return on investment.' },
    { cn: '我要回报父母的养育之恩。', en: 'I want to repay my parents for raising me.' },
  ],
  '回避': [
    { cn: '遇到问题不能回避。', en: 'You can\'t avoid problems when they arise.' },
    { cn: '他总是回避这个话题。', en: 'He always avoids this topic.' },
    { cn: '证人不能回避出庭。', en: 'The witness cannot evade appearing in court.' },
  ],
  '回顾': [
    { cn: '让我们回顾一下这一年的工作。', en: 'Let us look back on this year\'s work.' },
    { cn: '回顾过去，展望未来。', en: 'Review the past and look forward to the future.' },
    { cn: '他在回忆录中回顾了自己的一生。', en: 'He reviewed his whole life in his memoirs.' },
  ],
  '回收': [
    { cn: '废旧电池应该回收处理。', en: 'Used batteries should be recycled.' },
    { cn: '我们要积极回收利用资源。', en: 'We should actively recycle and reuse resources.' },
    { cn: '这些瓶子可以回收再利用。', en: 'These bottles can be recycled and reused.' },
  ],
  '回头': [
    { cn: '他回头看了一眼。', en: 'He turned his head and took a look.' },
    { cn: '我回头再找你。', en: 'I\'ll get back to you later.' },
    { cn: '走错了路就要回头。', en: 'If you\'ve taken the wrong path, you should turn back.' },
  ],
  '回信': [
    { cn: '请尽快给我回信。', en: 'Please write back to me as soon as possible.' },
    { cn: '我还没收到他的回信。', en: 'I haven\'t received his reply yet.' },
    { cn: '她立刻写了一封回信。', en: 'She immediately wrote a reply letter.' },
  ],
  '回忆': [
    { cn: '这首歌让我想起了很多回忆。', en: 'This song brings back many memories.' },
    { cn: '童年的回忆总是美好的。', en: 'Childhood memories are always beautiful.' },
    { cn: '他在回忆过去的日子。', en: 'He is reminiscing about the old days.' },
  ],
  '或是': [
    { cn: '你可以坐地铁或是公交车。', en: 'You can take the subway or the bus.' },
    { cn: '周末我们去爬山或是游泳吧。', en: 'Let\'s go hiking or swimming on the weekend.' },
    { cn: '不管是工作或是生活，他都很认真。', en: 'Whether it\'s work or life, he is very serious.' },
  ],
  '活力': [
    { cn: '年轻人充满了活力。', en: 'Young people are full of vitality.' },
    { cn: '这座城市到处都是活力。', en: 'This city is full of energy everywhere.' },
    { cn: '运动可以让人恢复活力。', en: 'Exercise can restore one\'s energy.' },
  ],
  '活泼': [
    { cn: '这个孩子非常活泼可爱。', en: 'This child is very lively and cute.' },
    { cn: '课堂气氛很活泼。', en: 'The classroom atmosphere is very lively.' },
    { cn: '她性格活泼开朗。', en: 'She has a lively and cheerful personality.' },
  ],
  '慌': [
    { cn: '听到这个消息，她慌了。', en: 'Upon hearing this news, she panicked.' },
    { cn: '别慌，慢慢来。', en: 'Don\'t panic; take it slowly.' },
    { cn: '他慌得不知所措。', en: 'He panicked and didn\'t know what to do.' },
  ],
  '慌忙': [
    { cn: '他慌忙跑出了教室。', en: 'He hurriedly ran out of the classroom.' },
    { cn: '听到警报，大家慌忙逃跑。', en: 'Hearing the alarm, everyone fled in a great rush.' },
    { cn: '她慌忙收拾东西离开了。', en: 'She hastily packed up her things and left.' },
  ],
  '恢复': [
    { cn: '他的身体正在慢慢恢复。', en: 'His body is slowly recovering.' },
    { cn: '系统已经恢复正常运行。', en: 'The system has resumed normal operation.' },
    { cn: '两国恢复了外交关系。', en: 'The two countries restored diplomatic relations.' },
  ],
  '灰色': [
    { cn: '他穿着一件灰色的外套。', en: 'He is wearing a gray coat.' },
    { cn: '天空是灰色的，看起来要下雨。', en: 'The sky is gray; it looks like it\'s going to rain.' },
    { cn: '她喜欢灰色的装修风格。', en: 'She likes a gray decorating style.' },
  ],
  '火柴': [
    { cn: '他划了一根火柴。', en: 'He struck a match.' },
    { cn: '火柴受潮了，点不着。', en: 'The matches got damp and won\'t light.' },
    { cn: '你有火柴吗？', en: 'Do you have matches?' },
  ],
  '火腿': [
    { cn: '早餐有火腿和鸡蛋。', en: 'Breakfast includes ham and eggs.' },
    { cn: '金华火腿是中国有名的特产。', en: 'Jinhua ham is a famous Chinese specialty.' },
    { cn: '请给我切几片火腿。', en: 'Please slice me a few pieces of ham.' },
  ],
  '火灾': [
    { cn: '这场火灾造成了严重的损失。', en: 'This fire caused serious losses.' },
    { cn: '消防队及时赶到扑灭了火灾。', en: 'The fire brigade arrived in time to extinguish the fire.' },
    { cn: '预防火灾人人有责。', en: 'Everyone is responsible for fire prevention.' },
  ],
  '害': [
    { cn: '抽烟害了他的健康。', en: 'Smoking harmed his health.' },
    { cn: '这种行为害人害己。', en: 'This kind of behavior harms others and oneself.' },
    { cn: '他害怕一个人待在家里。', en: 'He is afraid of staying home alone.' },
  ],
  '号召': [
    { cn: '校长号召全体师生节约用水。', en: 'The principal called on all teachers and students to conserve water.' },
    { cn: '政府号召大家保护环境。', en: 'The government appeals to everyone to protect the environment.' },
    { cn: '他的号召得到了大家的响应。', en: 'His call received everyone\'s response.' },
  ],
  '汗': [
    { cn: '他跑得满头大汗。', en: 'He ran until he was dripping with sweat.' },
    { cn: '天太热了，浑身是汗。', en: 'It\'s too hot; I\'m covered in sweat.' },
    { cn: '她紧张得手心直冒汗。', en: 'She was so nervous that her palms kept sweating.' },
  ],
  '吓': [
    { cn: '那个声音把我吓了一跳。', en: 'That sound gave me a fright.' },
    { cn: '别吓我！', en: 'Don\'t scare me!' },
    { cn: '他被突然出现的蛇吓到了。', en: 'He was frightened by the snake that suddenly appeared.' },
  ],
  '贺卡': [
    { cn: '她给朋友寄了一张贺卡。', en: 'She sent a greeting card to her friend.' },
    { cn: '圣诞节我收到了很多贺卡。', en: 'I received many greeting cards at Christmas.' },
    { cn: '这张贺卡设计得很漂亮。', en: 'This greeting card is designed very beautifully.' },
  ],
  '恨': [
    { cn: '他很恨自己当初的决定。', en: 'He really regrets his decision back then.' },
    { cn: '她恨不得马上就走。', en: 'She wished she could leave immediately.' },
    { cn: '恨铁不成钢。', en: 'To be frustrated that iron won\'t turn to steel (to be disappointed someone won\'t improve).' },
  ],
  '盒': [
    { cn: '她买了一盒巧克力。', en: 'She bought a box of chocolates.' },
    { cn: '这个小盒里面装着戒指。', en: 'There is a ring inside this small box.' },
    { cn: '请把铅笔放进盒里。', en: 'Please put the pencils in the box.' },
  ],
  '合并': [
    { cn: '两家公司决定合并。', en: 'The two companies decided to merge.' },
    { cn: '这两个部门已经合并了。', en: 'These two departments have been merged.' },
    { cn: '小班合并成了一个大班。', en: 'The small classes were combined into one large class.' },
  ],
  '合成': [
    { cn: '这件衣服是合成材料做的。', en: 'This piece of clothing is made of synthetic material.' },
    { cn: '科学家成功合成了新的化合物。', en: 'Scientists successfully synthesized a new compound.' },
    { cn: '这张照片是合成的。', en: 'This photo is composited.' },
  ],
  '盒饭': [
    { cn: '中午我吃了一份盒饭。', en: 'I had a boxed meal for lunch.' },
    { cn: '公司给员工订了盒饭。', en: 'The company ordered boxed meals for employees.' },
    { cn: '这家店的盒饭味道不错。', en: 'The boxed meals at this shop taste good.' },
  ],
  '盒子': [
    { cn: '请把东西放到盒子里。', en: 'Please put the things in the box.' },
    { cn: '这个盒子装满了照片。', en: 'This box is full of photos.' },
    { cn: '她打开了一个漂亮的盒子。', en: 'She opened a pretty box.' },
  ],
  '后悔': [
    { cn: '他很后悔当初没有好好学习。', en: 'He really regrets not studying hard back then.' },
    { cn: '做了这个决定你不会后悔的。', en: 'You won\'t regret making this decision.' },
    { cn: '后悔也来不及了。', en: 'It\'s too late for regrets.' },
  ],
  '猴': [
    { cn: '动物园里有很多猴。', en: 'There are many monkeys in the zoo.' },
    { cn: '那只猴在树上跳来跳去。', en: 'That monkey jumps around in the trees.' },
    { cn: '猴是十二生肖之一。', en: 'The monkey is one of the twelve zodiac animals.' },
  ],
  '胡子': [
    { cn: '他留了一把长胡子。', en: 'He has grown a long beard.' },
    { cn: '请把胡子刮干净。', en: 'Please shave your beard clean.' },
    { cn: '他的胡子都白了。', en: 'His beard has gone white.' },
  ],
  '胡同儿': [
    { cn: '北京有很多有名的胡同儿。', en: 'Beijing has many famous hutongs.' },
    { cn: '他从小在胡同儿里长大。', en: 'He grew up in the hutongs since childhood.' },
    { cn: '我们去胡同儿里逛逛吧。', en: 'Let\'s go stroll around the hutongs.' },
  ],
  '咳': [
    { cn: '他咳了好几天了。', en: 'He has been coughing for several days.' },
    { cn: '咳，你怎么才来？', en: 'Ahem, how come you just now got here?' },
    { cn: '她一直不停地咳。', en: 'She keeps coughing nonstop.' },
  ],
  '好运': [
    { cn: '祝你好运！', en: 'Good luck to you!' },
    { cn: '他今天好运连连。', en: 'He had a streak of good luck today.' },
    { cn: '好运终于降临到他身上了。', en: 'Good fortune finally came to him.' },
  ],
  '虎': [
    { cn: '虎是百兽之王。', en: 'The tiger is the king of all beasts.' },
    { cn: '他属虎。', en: 'He was born in the Year of the Tiger.' },
    { cn: '中国人认为虎是力量的象征。', en: 'Chinese people consider the tiger a symbol of strength.' },
  ],
  '价': [
    { cn: '这件东西的价太高了。', en: 'The price of this item is too high.' },
    { cn: '讨价还价是买卖的常事。', en: 'Bargaining is common in business.' },
    { cn: '他开了一个很好的价。', en: 'He offered a very good price.' },
  ],
  '驾驶': [
    { cn: '他正在学习驾驶汽车。', en: 'He is learning to drive a car.' },
    { cn: '驾驶时请注意安全。', en: 'Please pay attention to safety while driving.' },
    { cn: '她有多年的驾驶经验。', en: 'She has many years of driving experience.' },
  ],
  '驾照': [
    { cn: '他刚拿到驾照。', en: 'He just got his driver\'s license.' },
    { cn: '考驾照需要通过笔试和路考。', en: 'Getting a driver\'s license requires passing a written test and a road test.' },
    { cn: '他的驾照被吊销了。', en: 'His driver\'s license was revoked.' },
  ],
  '键': [
    { cn: '请按回车键。', en: 'Please press the Enter key.' },
    { cn: '键盘上有很多键。', en: 'There are many keys on the keyboard.' },
    { cn: '这个键坏了，按不下去。', en: 'This key is broken; it can\'t be pressed.' },
  ],
  '间接': [
    { cn: '他间接地提出了批评意见。', en: 'He indirectly raised criticism.' },
    { cn: '吸烟对周围的人有间接的危害。', en: 'Smoking poses indirect harm to those nearby.' },
    { cn: '这件事和他有间接的关系。', en: 'This matter is indirectly related to him.' },
  ],
  '键盘': [
    { cn: '我的键盘坏了，需要换一个。', en: 'My keyboard is broken; I need to replace it.' },
    { cn: '他打键盘的速度很快。', en: 'He types on the keyboard very fast.' },
    { cn: '请用键盘输入密码。', en: 'Please enter the password using the keyboard.' },
  ],
  '健全': [
    { cn: '公司的管理制度还不够健全。', en: 'The company\'s management system is not yet robust enough.' },
    { cn: '我们要建立健全的法律体系。', en: 'We need to establish a sound legal system.' },
    { cn: '他身体很健全。', en: 'He is in robust health.' },
  ],
  '建筑': [
    { cn: '这座建筑有一百多年的历史。', en: 'This building has a history of over one hundred years.' },
    { cn: '他是一位著名的建筑师。', en: 'He is a famous architect.' },
    { cn: '城市里到处都在建筑新楼。', en: 'New buildings are being constructed everywhere in the city.' },
  ],
  '建造': [
    { cn: '他们正在建造一座新的桥梁。', en: 'They are constructing a new bridge.' },
    { cn: '这座大坝是五十年前建造的。', en: 'This dam was built fifty years ago.' },
    { cn: '建造这栋大楼花了三年时间。', en: 'It took three years to build this building.' },
  ],
  '戒': [
    { cn: '他决定戒烟。', en: 'He decided to quit smoking.' },
    { cn: '医生劝他戒酒。', en: 'The doctor advised him to give up alcohol.' },
    { cn: '我们要引以为戒。', en: 'We should take this as a warning.' },
  ],
  '届': [
    { cn: '这是第三届运动会。', en: 'This is the third session of the sports meet.' },
    { cn: '上一届毕业生已经工作了。', en: 'The previous class of graduates is already working.' },
    { cn: '他是2020届的学生。', en: 'He is a student from the class of 2020.' },
  ],
  '救灾': [
    { cn: '政府组织了救灾行动。', en: 'The government organized disaster relief operations.' },
    { cn: '很多志愿者参加了救灾工作。', en: 'Many volunteers participated in the disaster relief work.' },
    { cn: '救灾物资已经送到了灾区。', en: 'Disaster relief supplies have been delivered to the affected area.' },
  ],
  '夹': [
    { cn: '她用发夹夹住了头发。', en: 'She clipped her hair with a hairpin.' },
    { cn: '请用筷子夹菜。', en: 'Please pick up food with chopsticks.' },
    { cn: '他把文件夹在书里。', en: 'He sandwiched the document in the book.' },
  ],
  '加热': [
    { cn: '请把牛奶加热一下。', en: 'Please heat up the milk.' },
    { cn: '微波炉可以快速加热食物。', en: 'A microwave can quickly heat food.' },
    { cn: '水加热到一百度就会沸腾。', en: 'Water boils when heated to one hundred degrees.' },
  ],
  '加上': [
    { cn: '三加上五等于八。', en: 'Three plus five equals eight.' },
    { cn: '他本来就累，加上没吃饭，更没力气了。', en: 'He was already tired, and on top of not eating, he had even less energy.' },
    { cn: '加上运费，一共是两百元。', en: 'Including shipping, the total is two hundred yuan.' },
  ],
  '加速': [
    { cn: '汽车在高速公路上加速了。', en: 'The car accelerated on the highway.' },
    { cn: '科技的发展加速了社会的进步。', en: 'The development of technology has accelerated social progress.' },
    { cn: '我们要加速推进改革。', en: 'We must speed up the reform process.' },
  ],
  '加以': [
    { cn: '这个问题需要加以重视。', en: 'This problem needs to be given attention.' },
    { cn: '原材料经过加工加以利用。', en: 'Raw materials are processed and utilized.' },
    { cn: '对存在的问题要加以解决。', en: 'Existing problems must be addressed and resolved.' },
  ],
  '肩': [
    { cn: '他把包挎在肩上。', en: 'He slung the bag over his shoulder.' },
    { cn: '我的肩有点疼。', en: 'My shoulder hurts a bit.' },
    { cn: '他肩负着重要的责任。', en: 'He shoulders important responsibilities.' },
  ],
  '坚定': [
    { cn: '他的态度非常坚定。', en: 'His attitude is very firm.' },
    { cn: '她坚定地走自己的路。', en: 'She steadfastly walks her own path.' },
    { cn: '我们要坚定信心。', en: 'We must be firm in our confidence.' },
  ],
  '艰苦': [
    { cn: '创业是一件很艰苦的事情。', en: 'Starting a business is a very arduous thing.' },
    { cn: '他在艰苦的环境中长大。', en: 'He grew up in difficult conditions.' },
    { cn: '经过艰苦的训练，他终于成功了。', en: 'After arduous training, he finally succeeded.' },
  ],
  '艰难': [
    { cn: '这是一个艰难的决定。', en: 'This is a difficult decision.' },
    { cn: '他艰难地走完了最后一公里。', en: 'He completed the last kilometer with great difficulty.' },
    { cn: '艰难困苦磨炼了他的意志。', en: 'Hardships tempered his will.' },
  ],
  '将': [
    { cn: '比赛将在下周举行。', en: 'The competition will be held next week.' },
    { cn: '他将成为一名医生。', en: 'He will become a doctor.' },
    { cn: '我将把这件事告诉大家。', en: 'I will tell everyone about this matter.' },
  ],
  '将要': [
    { cn: '火车将要到站了。', en: 'The train is about to arrive at the station.' },
    { cn: '他将要出国留学。', en: 'He is going to study abroad.' },
    { cn: '天将要黑了，我们快回家。', en: 'It\'s about to get dark; let\'s go home quickly.' },
  ],
  '交代': [
    { cn: '领导交代了几件事情。', en: 'The leader gave instructions about several things.' },
    { cn: '请把事情的经过交代清楚。', en: 'Please give a clear account of what happened.' },
    { cn: '他把工作交代给了同事。', en: 'He handed over the work to his colleague.' },
  ],
  '胶带': [
    { cn: '请用胶带把箱子封好。', en: 'Please seal the box with tape.' },
    { cn: '我需要一卷胶带。', en: 'I need a roll of adhesive tape.' },
    { cn: '这种胶带粘性很强。', en: 'This kind of tape has very strong adhesion.' },
  ],
  '郊区': [
    { cn: '他们住在郊区。', en: 'They live in the suburbs.' },
    { cn: '郊区的房价比市中心便宜。', en: 'Housing prices in the suburbs are cheaper than downtown.' },
    { cn: '周末我们去郊区野餐。', en: 'Let\'s go for a picnic in the suburbs on the weekend.' },
  ],
  '胶水': [
    { cn: '请用胶水把这两张纸粘在一起。', en: 'Please glue these two pieces of paper together.' },
    { cn: '胶水干了，粘不住了。', en: 'The glue has dried out and won\'t stick anymore.' },
    { cn: '他买了一瓶胶水。', en: 'He bought a bottle of glue.' },
  ],
  '接触': [
    { cn: '我和他很少接触。', en: 'I rarely have contact with him.' },
    { cn: '孩子应该多接触大自然。', en: 'Children should have more contact with nature.' },
    { cn: '他第一次接触到这种技术。', en: 'He came into contact with this technology for the first time.' },
  ],
  '接连': [
    { cn: '他接连赢了三场比赛。', en: 'He won three games in a row.' },
    { cn: '接连下了几天雨。', en: 'It rained for several days in succession.' },
    { cn: '公司接连遇到了很多困难。', en: 'The company encountered many difficulties one after another.' },
  ],
  '解除': [
    { cn: '他们解除了合同。', en: 'They terminated the contract.' },
    { cn: '警报已经解除了。', en: 'The alert has been lifted.' },
    { cn: '医生解除了他的隔离。', en: 'The doctor removed his quarantine.' },
  ],
  '解放': [
    { cn: '技术的进步解放了劳动力。', en: 'Technological progress has liberated the labor force.' },
    { cn: '上海于1949年解放。', en: 'Shanghai was liberated in 1949.' },
    { cn: '我们要解放思想。', en: 'We must emancipate our minds.' },
  ],
  '甲': [
    { cn: '甲方和乙方签订了合同。', en: 'Party A and Party B signed the contract.' },
    { cn: '甲同学的成绩最好。', en: 'Student A has the best grades.' },
    { cn: '甲骨文是中国最古老的文字之一。', en: 'Oracle bone script is one of China\'s oldest writing systems.' },
  ],
  '剪': [
    { cn: '她去理发店剪头发了。', en: 'She went to the barber shop to cut her hair.' },
    { cn: '请帮我剪一下这根线。', en: 'Please help me cut this thread.' },
    { cn: '他在剪报纸上的文章。', en: 'He is cutting out articles from the newspaper.' },
  ],
  '剪刀': [
    { cn: '你有剪刀吗？我需要用一下。', en: 'Do you have scissors? I need to use them.' },
    { cn: '请用剪刀把绳子剪断。', en: 'Please cut the rope with scissors.' },
    { cn: '这把剪刀很锋利。', en: 'These scissors are very sharp.' },
  ],
  '减轻': [
    { cn: '运动可以减轻压力。', en: 'Exercise can ease stress.' },
    { cn: '这种药可以减轻疼痛。', en: 'This medicine can alleviate pain.' },
    { cn: '我们要减轻学生的负担。', en: 'We need to lighten the burden on students.' },
  ],
  '检验': [
    { cn: '实践是检验真理的标准。', en: 'Practice is the criterion for testing truth.' },
    { cn: '产品在出厂前要经过严格检验。', en: 'Products must undergo strict inspection before leaving the factory.' },
    { cn: '这次考试检验了学生的学习成果。', en: 'This exam tested the students\' learning outcomes.' },
  ],
  '剪子': [
    { cn: '把剪子递给我。', en: 'Hand me the scissors.' },
    { cn: '她用剪子裁剪布料。', en: 'She uses scissors to cut fabric.' },
    { cn: '这把剪子不够快了。', en: 'These scissors are not sharp enough.' },
  ],
  '奖励': [
    { cn: '老师奖励了表现好的学生。', en: 'The teacher rewarded the students who performed well.' },
    { cn: '公司给他发了奖励。', en: 'The company gave him a reward.' },
    { cn: '适当的奖励可以激发积极性。', en: 'Appropriate rewards can stimulate motivation.' },
  ],
  '脚步': [
    { cn: '我听到门外有脚步声。', en: 'I heard footsteps outside the door.' },
    { cn: '他加快了脚步。', en: 'He quickened his pace.' },
    { cn: '时代的脚步越来越快。', en: 'The pace of the times is getting faster and faster.' },
  ],
  '酒鬼': [
    { cn: '他是一个酒鬼，天天喝酒。', en: 'He is a drunkard who drinks every day.' },
    { cn: '这个酒鬼又喝醉了。', en: 'This drunkard is drunk again.' },
    { cn: '她不想嫁给一个酒鬼。', en: 'She doesn\'t want to marry a drunkard.' },
  ],
  '决不': [
    { cn: '我决不放弃！', en: 'I will never give up!' },
    { cn: '他决不会做这种事。', en: 'He would never do such a thing.' },
    { cn: '这样的错误决不能再犯。', en: 'Such a mistake must never be made again.' },
  ],
  '绝望': [
    { cn: '他对生活感到绝望。', en: 'He felt desperate about life.' },
    { cn: '在最绝望的时刻，她没有放弃。', en: 'At the most desperate moment, she did not give up.' },
    { cn: '不要绝望，总会有希望的。', en: 'Don\'t despair; there will always be hope.' },
  ],
  '继承': [
    { cn: '他继承了父亲的事业。', en: 'He inherited his father\'s business.' },
    { cn: '我们要继承优秀的传统文化。', en: 'We should carry on excellent traditional culture.' },
    { cn: '她继承了一笔遗产。', en: 'She inherited an estate.' },
  ],
  '技能': [
    { cn: '他掌握了很多实用的技能。', en: 'He has mastered many practical skills.' },
    { cn: '在工作中不断提高技能很重要。', en: 'It is important to continuously improve skills at work.' },
    { cn: '这些技能对找工作很有帮助。', en: 'These skills are very helpful for finding a job.' },
  ],
  '记忆': [
    { cn: '他的记忆力很好。', en: 'He has a very good memory.' },
    { cn: '童年的记忆十分珍贵。', en: 'Childhood memories are very precious.' },
    { cn: '这件事在我的记忆中很深刻。', en: 'This event is deeply etched in my memory.' },
  ],
  '进化': [
    { cn: '人类是从猿进化来的。', en: 'Humans evolved from apes.' },
    { cn: '达尔文提出了进化论。', en: 'Darwin proposed the theory of evolution.' },
    { cn: '科技的发展推动了社会的进化。', en: 'The development of technology drives social evolution.' },
  ],
  '近来': [
    { cn: '近来他的身体不太好。', en: 'His health hasn\'t been great lately.' },
    { cn: '近来天气变化很大。', en: 'The weather has changed a lot recently.' },
    { cn: '你近来怎么样？', en: 'How have you been recently?' },
  ],
  '竞赛': [
    { cn: '他参加了数学竞赛。', en: 'He participated in a math competition.' },
    { cn: '这场竞赛非常激烈。', en: 'This competition was very fierce.' },
    { cn: '竞赛的结果明天公布。', en: 'The results of the competition will be announced tomorrow.' },
  ],
  '竞争': [
    { cn: '市场竞争越来越激烈。', en: 'Market competition is becoming more and more intense.' },
    { cn: '他和同事之间存在竞争关系。', en: 'There is a competitive relationship between him and his colleagues.' },
    { cn: '健康的竞争有利于进步。', en: 'Healthy competition is conducive to progress.' },
  ],
  '即使': [
    { cn: '即使下雨，我也会去。', en: 'Even if it rains, I will still go.' },
    { cn: '即使失败了，也不要灰心。', en: 'Even if you fail, don\'t lose heart.' },
    { cn: '即使很忙，他每天都锻炼身体。', en: 'Even though he\'s very busy, he exercises every day.' },
  ],
  '集团': [
    { cn: '他在一家大型集团工作。', en: 'He works at a large corporation.' },
    { cn: '这个集团旗下有很多子公司。', en: 'This group has many subsidiaries.' },
    { cn: '犯罪集团被警方一网打尽。', en: 'The criminal group was completely rounded up by the police.' },
  ],
  '剧本': [
    { cn: '他正在写一个电影剧本。', en: 'He is writing a movie screenplay.' },
    { cn: '这部剧的剧本非常精彩。', en: 'The script of this drama is very brilliant.' },
    { cn: '导演修改了剧本的结尾。', en: 'The director modified the ending of the script.' },
  ],
  '拒绝': [
    { cn: '他拒绝了我的邀请。', en: 'He declined my invitation.' },
    { cn: '她拒绝回答这个问题。', en: 'She refused to answer this question.' },
    { cn: '这个要求我没办法拒绝。', en: 'I have no way to refuse this request.' },
  ],
  '俱乐部': [
    { cn: '他加入了学校的读书俱乐部。', en: 'He joined the school\'s book club.' },
    { cn: '这家俱乐部的会员很多。', en: 'This club has many members.' },
    { cn: '周末我们去俱乐部打网球。', en: 'Let\'s go play tennis at the club on the weekend.' },
  ],
  '局面': [
    { cn: '我们要改变当前的局面。', en: 'We need to change the current situation.' },
    { cn: '谈判陷入了僵持的局面。', en: 'The negotiations reached a stalemate.' },
    { cn: '新政策打开了新的局面。', en: 'The new policy opened up a new phase.' },
  ],
  '局长': [
    { cn: '他是公安局局长。', en: 'He is the chief of the public security bureau.' },
    { cn: '局长召集大家开了一个会。', en: 'The bureau chief convened everyone for a meeting.' },
    { cn: '新任局长上任了。', en: 'The new bureau chief has taken office.' },
  ],
  '基地': [
    { cn: '这里是我们的训练基地。', en: 'This is our training base.' },
    { cn: '他们建立了一个研究基地。', en: 'They established a research base.' },
    { cn: '军事基地戒备森严。', en: 'The military base is heavily guarded.' },
  ],
  '基金': [
    { cn: '他投资了一只股票基金。', en: 'He invested in a stock fund.' },
    { cn: '这个基金是用来帮助贫困学生的。', en: 'This fund is used to help impoverished students.' },
    { cn: '他们设立了一项慈善基金。', en: 'They set up a charitable fund.' },
  ],
  '机器人': [
    { cn: '工厂里有很多机器人。', en: 'There are many robots in the factory.' },
    { cn: '机器人技术发展得越来越快。', en: 'Robot technology is developing faster and faster.' },
    { cn: '这个机器人可以和人对话。', en: 'This robot can talk with people.' },
  ],
  '肌肉': [
    { cn: '他的肌肉很发达。', en: 'His muscles are very well-developed.' },
    { cn: '运动后肌肉有点酸痛。', en: 'My muscles are a bit sore after exercising.' },
    { cn: '锻炼可以增强肌肉力量。', en: 'Exercise can strengthen muscle power.' },
  ],
  '机制': [
    { cn: '我们需要建立有效的管理机制。', en: 'We need to establish an effective management mechanism.' },
    { cn: '市场机制在经济发展中起着重要作用。', en: 'Market mechanisms play an important role in economic development.' },
    { cn: '这种药物的作用机制还不清楚。', en: 'The mechanism of action of this drug is not yet clear.' },
  ],
  '今日': [
    { cn: '今日事，今日毕。', en: 'What should be done today should be finished today.' },
    { cn: '今日的天气真好。', en: 'The weather today is really nice.' },
    { cn: '他今日终于回来了。', en: 'He finally came back today.' },
  ],
  '经费': [
    { cn: '研究经费不够用。', en: 'The research funds are not sufficient.' },
    { cn: '学校增加了教育经费。', en: 'The school increased educational funding.' },
    { cn: '这个项目的经费由政府拨款。', en: 'The funding for this project is allocated by the government.' },
  ],
  '居然': [
    { cn: '他居然忘了我的生日！', en: 'He actually forgot my birthday!' },
    { cn: '这么难的题他居然做对了。', en: 'He actually got this difficult question right.' },
    { cn: '她居然一个人去了西藏。', en: 'She actually went to Tibet alone.' },
  ],
  '军人': [
    { cn: '他是一名光荣的军人。', en: 'He is a glorious serviceman.' },
    { cn: '军人的职责是保卫国家。', en: 'A soldier\'s duty is to defend the country.' },
    { cn: '她嫁给了一位军人。', en: 'She married a military man.' },
  ],
  '挤': [
    { cn: '地铁上太挤了。', en: 'The subway is too crowded.' },
    { cn: '大家都挤在门口。', en: 'Everyone is crowded at the entrance.' },
    { cn: '他从人群中挤了过去。', en: 'He squeezed through the crowd.' },
  ],
  '尽管': [
    { cn: '尽管天气不好，他还是出门了。', en: 'Despite the bad weather, he still went out.' },
    { cn: '尽管很累，她还是坚持工作。', en: 'Although very tired, she still persisted in working.' },
    { cn: '你尽管说，不用客气。', en: 'Just go ahead and say it; no need to be polite.' },
  ],
  '紧紧': [
    { cn: '她紧紧地抱住了孩子。', en: 'She held the child tightly.' },
    { cn: '他紧紧地握着我的手。', en: 'He gripped my hand tightly.' },
    { cn: '门紧紧地关着。', en: 'The door is shut tight.' },
  ],
  '尽可能': [
    { cn: '我会尽可能帮助你。', en: 'I will help you as much as possible.' },
    { cn: '请尽可能早点到。', en: 'Please arrive as early as possible.' },
    { cn: '尽可能减少浪费。', en: 'Reduce waste as much as possible.' },
  ],
  '警告': [
    { cn: '老师警告他不要再迟到。', en: 'The teacher warned him not to be late again.' },
    { cn: '他收到了一份书面警告。', en: 'He received a written warning.' },
    { cn: '气象台发布了暴风雨警告。', en: 'The weather station issued a storm warning.' },
  ],
  '景象': [
    { cn: '春天到了，万物复苏，一片美好的景象。', en: 'Spring has arrived; everything is reviving, a beautiful sight.' },
    { cn: '节日的街头呈现出热闹的景象。', en: 'The streets during the festival present a lively scene.' },
    { cn: '灾区的景象让人心痛。', en: 'The sight of the disaster area is heartbreaking.' },
  ],
  '举动': [
    { cn: '他的举动引起了大家的注意。', en: 'His actions attracted everyone\'s attention.' },
    { cn: '她的一举一动都很优雅。', en: 'Her every move is very elegant.' },
    { cn: '这个举动出乎意料。', en: 'This act was unexpected.' },
  ],
  '快活': [
    { cn: '孩子们在公园里玩得很快活。', en: 'The children are playing happily in the park.' },
    { cn: '退休后他过得很快活。', en: 'He lives happily after retirement.' },
    { cn: '听到好消息，大家都很快活。', en: 'Everyone was cheerful upon hearing the good news.' },
  ],
  '狂': [
    { cn: '外面狂风暴雨。', en: 'There is a wild storm raging outside.' },
    { cn: '他高兴得发狂。', en: 'He was wild with joy.' },
    { cn: '球迷们狂热地支持自己的队伍。', en: 'Fans wildly support their team.' },
  ],
  '宽度': [
    { cn: '这条路的宽度是十米。', en: 'The width of this road is ten meters.' },
    { cn: '请量一下门的宽度。', en: 'Please measure the width of the door.' },
    { cn: '河流的宽度在这里变窄了。', en: 'The width of the river narrows here.' },
  ],
  '亏': [
    { cn: '幸亏你提醒我，否则我就忘了。', en: 'Luckily you reminded me; otherwise I would have forgotten.' },
    { cn: '这笔生意亏了不少钱。', en: 'This deal lost quite a bit of money.' },
    { cn: '做人不能做亏心事。', en: 'One should not do things that weigh on one\'s conscience.' },
  ],
  '看成': [
    { cn: '大家都把他看成榜样。', en: 'Everyone regards him as a role model.' },
    { cn: '别把我看成外人。', en: 'Don\'t regard me as an outsider.' },
    { cn: '他把工作看成生活的一部分。', en: 'He regards work as part of life.' },
  ],
  '看出': [
    { cn: '我看出他不太高兴。', en: 'I could see that he was not very happy.' },
    { cn: '从他的表情看出他在说谎。', en: 'I can tell from his expression that he is lying.' },
    { cn: '你看出什么问题了吗？', en: 'Did you notice any problems?' },
  ],
  '看待': [
    { cn: '我们应该正确看待失败。', en: 'We should look upon failure correctly.' },
    { cn: '你怎么看待这件事？', en: 'How do you regard this matter?' },
    { cn: '不同的人看待问题的角度不同。', en: 'Different people view problems from different angles.' },
  ],
  '靠近': [
    { cn: '请不要靠近悬崖。', en: 'Please don\'t get close to the cliff.' },
    { cn: '他慢慢靠近了那只猫。', en: 'He slowly approached the cat.' },
    { cn: '我家靠近地铁站。', en: 'My home is close to the subway station.' },
  ],
  '客户': [
    { cn: '我们要为客户提供最好的服务。', en: 'We must provide the best service to our clients.' },
    { cn: '这位客户是我们的老朋友了。', en: 'This client is an old friend of ours.' },
    { cn: '公司今年新增了很多客户。', en: 'The company gained many new customers this year.' },
  ],
  '客气': [
    { cn: '你太客气了！', en: 'You are too polite!' },
    { cn: '别客气，请坐。', en: 'Don\'t be formal; please sit down.' },
    { cn: '他是一个很客气的人。', en: 'He is a very courteous person.' },
  ],
  '课题': [
    { cn: '他正在研究一个新的课题。', en: 'He is researching a new topic.' },
    { cn: '这是一个重要的科学课题。', en: 'This is an important scientific issue.' },
    { cn: '这个课题的研究已经完成了。', en: 'The research on this topic has been completed.' },
  ],
  '客厅': [
    { cn: '客人们在客厅里聊天。', en: 'The guests are chatting in the living room.' },
    { cn: '我们家的客厅很大。', en: 'Our living room is very large.' },
    { cn: '客厅里摆着一套沙发。', en: 'A set of sofas is placed in the living room.' },
  ],
  '控制': [
    { cn: '你要学会控制自己的情绪。', en: 'You need to learn to control your emotions.' },
    { cn: '火势已经得到了控制。', en: 'The fire has been brought under control.' },
    { cn: '他控制不住自己的眼泪。', en: 'He couldn\'t control his tears.' },
  ],
  '库': [
    { cn: '仓库里堆满了货物。', en: 'The warehouse is piled high with goods.' },
    { cn: '这是一个数据库。', en: 'This is a database.' },
    { cn: '他去库里取了一些材料。', en: 'He went to the storehouse to get some materials.' },
  ],
  '困扰': [
    { cn: '这个问题一直困扰着我。', en: 'This problem has been bothering me all along.' },
    { cn: '失眠困扰了她很久。', en: 'Insomnia has troubled her for a long time.' },
    { cn: '别让小事困扰你。', en: 'Don\'t let small things bother you.' },
  ],
  '开幕': [
    { cn: '奥运会昨天正式开幕了。', en: 'The Olympics officially opened yesterday.' },
    { cn: '展览下周开幕。', en: 'The exhibition opens next week.' },
    { cn: '大会在欢乐的气氛中开幕。', en: 'The conference opened in a joyful atmosphere.' },
  ],
  '开幕式': [
    { cn: '开幕式非常壮观。', en: 'The opening ceremony was very spectacular.' },
    { cn: '我们一起看了开幕式的直播。', en: 'We watched the live broadcast of the opening ceremony together.' },
    { cn: '开幕式上有精彩的表演。', en: 'There were wonderful performances at the opening ceremony.' },
  ],
  '颗': [
    { cn: '天上有好多颗星星。', en: 'There are many stars in the sky.' },
    { cn: '他捡起了一颗石头。', en: 'He picked up a small stone.' },
    { cn: '这颗珍珠非常漂亮。', en: 'This pearl is very beautiful.' },
  ],
  '可': [
    { cn: '今天可真冷啊。', en: 'It\'s really cold today.' },
    { cn: '你可要小心啊。', en: 'You must be careful.' },
    { cn: '这件事可不简单。', en: 'This matter is no simple thing.' },
  ],
  '可怜': [
    { cn: '这个孩子真可怜。', en: 'This child is really pitiful.' },
    { cn: '他的遭遇令人可怜。', en: 'His experience is pitiable.' },
    { cn: '大家都很可怜她。', en: 'Everyone felt sorry for her.' },
  ],
  '渴望': [
    { cn: '他渴望成功。', en: 'He yearns for success.' },
    { cn: '孩子们渴望得到父母的关爱。', en: 'Children long for their parents\' love and care.' },
    { cn: '人们渴望和平。', en: 'People thirst for peace.' },
  ],
  '可惜': [
    { cn: '可惜你没来，晚会很精彩。', en: 'It\'s a pity you didn\'t come; the party was wonderful.' },
    { cn: '这么好的机会，错过了太可惜。', en: 'Such a good opportunity; it\'s a shame to miss it.' },
    { cn: '可惜我当时不在场。', en: 'Unfortunately, I was not there at the time.' },
  ],
  '肯定': [
    { cn: '我肯定他会来的。', en: 'I\'m certain he will come.' },
    { cn: '老师肯定了他的努力。', en: 'The teacher affirmed his efforts.' },
    { cn: '她给了我一个肯定的答复。', en: 'She gave me a positive answer.' },
  ],
  '空中': [
    { cn: '飞机在空中飞行。', en: 'The plane is flying in the air.' },
    { cn: '空中飘着几朵白云。', en: 'A few white clouds are floating in the sky.' },
    { cn: '烟花在空中绽放。', en: 'Fireworks bloomed in the sky.' },
  ],
  '考核': [
    { cn: '公司每年对员工进行考核。', en: 'The company assesses employees every year.' },
    { cn: '他通过了年终考核。', en: 'He passed the year-end assessment.' },
    { cn: '考核的标准很严格。', en: 'The assessment criteria are very strict.' },
  ],
  '烤肉': [
    { cn: '周末我们去烤肉吧。', en: 'Let\'s go have barbecue on the weekend.' },
    { cn: '韩国烤肉非常有名。', en: 'Korean barbecue is very famous.' },
    { cn: '他最喜欢吃烤肉。', en: 'He likes eating barbecue the most.' },
  ],
  '烤鸭': [
    { cn: '北京烤鸭是中国名菜。', en: 'Beijing roast duck is a famous Chinese dish.' },
    { cn: '我们去全聚德吃烤鸭。', en: 'Let\'s go to Quanjude to eat roast duck.' },
    { cn: '这家店的烤鸭味道很好。', en: 'The roast duck at this restaurant tastes great.' },
  ],
  '口号': [
    { cn: '他们喊着口号游行。', en: 'They marched shouting slogans.' },
    { cn: '公司的口号是"顾客至上"。', en: 'The company\'s slogan is "Customer First."' },
    { cn: '光喊口号没有用。', en: 'Just shouting slogans is useless.' },
  ],
  '恋爱': [
    { cn: '他们正在谈恋爱。', en: 'They are in a relationship.' },
    { cn: '大学生谈恋爱很普遍。', en: 'It\'s very common for college students to date.' },
    { cn: '她第一次恋爱是在高中。', en: 'Her first love was in high school.' },
  ],
  '连接': [
    { cn: '这条路连接了两个城市。', en: 'This road connects two cities.' },
    { cn: '请把电脑连接到网络。', en: 'Please connect the computer to the network.' },
    { cn: '桥梁连接了河的两岸。', en: 'The bridge connects the two banks of the river.' },
  ],
  '联络': [
    { cn: '我会和你保持联络。', en: 'I will stay in touch with you.' },
    { cn: '他负责和客户联络。', en: 'He is responsible for contacting clients.' },
    { cn: '请留下你的联络方式。', en: 'Please leave your contact information.' },
  ],
  '联想': [
    { cn: '这首歌让我联想到了童年。', en: 'This song makes me think of my childhood.' },
    { cn: '看到这幅画你会联想到什么？', en: 'What do you associate with when you see this painting?' },
    { cn: '由此我联想到一个故事。', en: 'From this, a story comes to mind.' },
  ],
  '流动': [
    { cn: '河水在流动。', en: 'The river water is flowing.' },
    { cn: '城市里人口流动很大。', en: 'There is a large flow of population in the city.' },
    { cn: '资金在不断流动。', en: 'Capital is constantly circulating.' },
  ],
  '流通': [
    { cn: '货币在市场上流通。', en: 'Currency circulates in the market.' },
    { cn: '商品的流通带动了经济发展。', en: 'The distribution of goods drives economic development.' },
    { cn: '这种货币已经停止流通了。', en: 'This currency has stopped circulating.' },
  ],
  '脸盆': [
    { cn: '她用脸盆打了一盆水。', en: 'She filled a washbowl with water.' },
    { cn: '脸盆放在洗手间里。', en: 'The washbasin is placed in the bathroom.' },
    { cn: '请帮我买一个新脸盆。', en: 'Please help me buy a new washbasin.' },
  ],
  '脸色': [
    { cn: '他的脸色不太好，好像生病了。', en: 'His complexion doesn\'t look good; it seems like he\'s sick.' },
    { cn: '听到这个消息，她脸色一变。', en: 'Upon hearing this news, her expression changed.' },
    { cn: '老板的脸色很难看。', en: 'The boss looks very displeased.' },
  ],
  '两岸': [
    { cn: '河的两岸种满了柳树。', en: 'Both banks of the river are lined with willow trees.' },
    { cn: '海峡两岸的交流越来越多。', en: 'Exchanges between both sides of the strait are increasing.' },
    { cn: '两岸人民都渴望和平。', en: 'People on both sides long for peace.' },
  ],
  '落实': [
    { cn: '政策要落实到位。', en: 'Policies must be implemented thoroughly.' },
    { cn: '这件事已经落实了。', en: 'This matter has been implemented.' },
    { cn: '计划制定后要抓紧落实。', en: 'After the plan is made, it must be quickly put into practice.' },
  ],
  '逻辑': [
    { cn: '他说话很有逻辑。', en: 'He speaks very logically.' },
    { cn: '这个论点缺乏逻辑。', en: 'This argument lacks logic.' },
    { cn: '逻辑思维能力很重要。', en: 'Logical thinking ability is very important.' },
  ],
  '烂': [
    { cn: '苹果烂了，不能吃了。', en: 'The apple has rotted; it can\'t be eaten.' },
    { cn: '这条路修得很烂。', en: 'This road was poorly built.' },
    { cn: '肉炖得很烂，很好吃。', en: 'The meat was stewed until very soft; it\'s delicious.' },
  ],
  '浪漫': [
    { cn: '他是一个很浪漫的人。', en: 'He is a very romantic person.' },
    { cn: '巴黎是一座浪漫的城市。', en: 'Paris is a romantic city.' },
    { cn: '她喜欢浪漫的氛围。', en: 'She likes a romantic atmosphere.' },
  ],
  '来信': [
    { cn: '我收到了朋友的来信。', en: 'I received a letter from a friend.' },
    { cn: '他的来信让我很高兴。', en: 'His letter made me very happy.' },
    { cn: '欢迎读者来信提意见。', en: 'Readers are welcome to write in with suggestions.' },
  ],
  '劳动': [
    { cn: '劳动是光荣的。', en: 'Labor is glorious.' },
    { cn: '他从小就参加劳动。', en: 'He has participated in physical labor since childhood.' },
    { cn: '五一国际劳动节是全世界劳动者的节日。', en: 'May Day is a holiday for workers around the world.' },
  ],
  '立': [
    { cn: '他站起来立在那里。', en: 'He stood up there.' },
    { cn: '国旗高高地立在广场上。', en: 'The national flag stands tall in the square.' },
    { cn: '他决心立刻行动。', en: 'He resolved to take action immediately.' },
  ],
  '立场': [
    { cn: '他在这个问题上的立场很坚定。', en: 'His position on this issue is very firm.' },
    { cn: '请站在对方的立场想一想。', en: 'Please think from the other person\'s standpoint.' },
    { cn: '我不会改变自己的立场。', en: 'I will not change my position.' },
  ],
  '厉害': [
    { cn: '他太厉害了，什么都会。', en: 'He is so formidable; he can do everything.' },
    { cn: '今天头疼得厉害。', en: 'I have a severe headache today.' },
    { cn: '暴风雨来得很厉害。', en: 'The storm came on fiercely.' },
  ],
  '利润': [
    { cn: '今年公司的利润增长了百分之十。', en: 'The company\'s profits grew by ten percent this year.' },
    { cn: '这个行业的利润很高。', en: 'The profits in this industry are very high.' },
    { cn: '降低成本可以提高利润。', en: 'Reducing costs can improve profits.' },
  ],
  '例外': [
    { cn: '这次没有例外，所有人都要参加。', en: 'There are no exceptions this time; everyone must participate.' },
    { cn: '他是一个例外。', en: 'He is an exception.' },
    { cn: '每条规则都有例外。', en: 'Every rule has its exceptions.' },
  ],
  '梨': [
    { cn: '秋天的梨又大又甜。', en: 'Pears in autumn are big and sweet.' },
    { cn: '她买了几个梨回来。', en: 'She bought a few pears.' },
    { cn: '梨对嗓子有好处。', en: 'Pears are good for the throat.' },
  ],
  '邻居': [
    { cn: '我的邻居非常友好。', en: 'My neighbors are very friendly.' },
    { cn: '他和邻居相处得很好。', en: 'He gets along well with his neighbors.' },
    { cn: '隔壁邻居搬走了。', en: 'The next-door neighbors moved away.' },
  ],
  '铃': [
    { cn: '上课铃响了。', en: 'The class bell rang.' },
    { cn: '他在猫脖子上挂了一个铃。', en: 'He hung a bell on the cat\'s neck.' },
    { cn: '风一吹，铃就响。', en: 'When the wind blows, the bell rings.' },
  ],
  '令': [
    { cn: '这个消息令人振奋。', en: 'This news is inspiring.' },
    { cn: '他下了一道命令。', en: 'He issued an order.' },
    { cn: '她的表现令老师很满意。', en: 'Her performance made the teacher very satisfied.' },
  ],
  '铃声': [
    { cn: '我的手机铃声响了。', en: 'My phone ringtone went off.' },
    { cn: '下课铃声终于响了。', en: 'The dismissal bell finally rang.' },
    { cn: '他没听到闹钟的铃声。', en: 'He didn\'t hear the alarm bell.' },
  ],
  '漏': [
    { cn: '屋顶漏了，需要修理。', en: 'The roof is leaking; it needs repair.' },
    { cn: '他不小心漏掉了一个步骤。', en: 'He accidentally left out a step.' },
    { cn: '水管漏水了。', en: 'The water pipe is leaking.' },
  ],
  '漏洞': [
    { cn: '这个计划有很多漏洞。', en: 'This plan has many loopholes.' },
    { cn: '系统被发现了一个安全漏洞。', en: 'A security vulnerability was found in the system.' },
    { cn: '他的话里有漏洞。', en: 'There are holes in what he said.' },
  ],
  '朗读': [
    { cn: '请大声朗读这篇课文。', en: 'Please read this text aloud.' },
    { cn: '她的朗读声很好听。', en: 'Her reading voice is pleasant to listen to.' },
    { cn: '每天朗读对学语言很有帮助。', en: 'Reading aloud every day is very helpful for language learning.' },
  ],
  '礼': [
    { cn: '他给我带了一份礼。', en: 'He brought me a gift.' },
    { cn: '中国是礼仪之邦。', en: 'China is a land of propriety and ceremony.' },
    { cn: '送礼是中国文化的一部分。', en: 'Giving gifts is part of Chinese culture.' },
  ],
  '礼拜': [
    { cn: '这个礼拜你有空吗？', en: 'Are you free this week?' },
    { cn: '他每个礼拜天去教堂做礼拜。', en: 'He goes to church every Sunday for worship.' },
    { cn: '下个礼拜我们再见。', en: 'We\'ll meet again next week.' },
  ],
  '礼貌': [
    { cn: '这个孩子很有礼貌。', en: 'This child is very polite.' },
    { cn: '说话要注意礼貌。', en: 'Pay attention to manners when speaking.' },
    { cn: '打招呼是基本的礼貌。', en: 'Greeting people is basic courtesy.' },
  ],
  '领带': [
    { cn: '他今天戴了一条红色的领带。', en: 'He wore a red necktie today.' },
    { cn: '正式场合要打领带。', en: 'You should wear a tie on formal occasions.' },
    { cn: '她帮他系好了领带。', en: 'She helped him tie his necktie.' },
  ],
  '面貌': [
    { cn: '城市的面貌发生了很大变化。', en: 'The appearance of the city has changed greatly.' },
    { cn: '这个村庄的面貌焕然一新。', en: 'The appearance of this village has taken on a completely new look.' },
    { cn: '精神面貌很重要。', en: 'One\'s mental outlook is very important.' },
  ],
  '面子': [
    { cn: '他很爱面子，不愿意认错。', en: 'He cares a lot about face and is unwilling to admit his mistakes.' },
    { cn: '请给我一个面子。', en: 'Please do me this favor (give me face).' },
    { cn: '她不想在人前丢面子。', en: 'She doesn\'t want to lose face in front of others.' },
  ],
  '秒': [
    { cn: '一分钟有六十秒。', en: 'There are sixty seconds in a minute.' },
    { cn: '他跑完一百米只用了十秒。', en: 'He finished the hundred meters in only ten seconds.' },
    { cn: '倒计时还剩五秒。', en: 'There are five seconds left in the countdown.' },
  ],
  '骂': [
    { cn: '妈妈骂了他一顿。', en: 'Mom gave him a scolding.' },
    { cn: '不能随便骂人。', en: 'You shouldn\'t casually scold people.' },
    { cn: '他被老板骂了一顿。', en: 'He got scolded by the boss.' },
  ],
  '漫长': [
    { cn: '冬天的夜晚很漫长。', en: 'Winter nights are very long.' },
    { cn: '等待的过程是漫长的。', en: 'The process of waiting is long.' },
    { cn: '他经历了漫长的康复过程。', en: 'He went through a long recovery process.' },
  ],
  '漫画': [
    { cn: '他喜欢看日本漫画。', en: 'He likes reading Japanese manga.' },
    { cn: '这幅漫画画得很有趣。', en: 'This cartoon is drawn very humorously.' },
    { cn: '她想成为一名漫画家。', en: 'She wants to become a cartoonist.' },
  ],
  '冒': [
    { cn: '他冒着大雨来上班。', en: 'He braved heavy rain to come to work.' },
    { cn: '烟囱在冒烟。', en: 'Smoke is coming out of the chimney.' },
    { cn: '他冒了很大的风险。', en: 'He took a great risk.' },
  ],
  '贸易': [
    { cn: '中国和很多国家有贸易往来。', en: 'China has trade relations with many countries.' },
    { cn: '国际贸易对经济发展很重要。', en: 'International trade is very important for economic development.' },
    { cn: '自由贸易区正在建设中。', en: 'The free trade zone is under construction.' },
  ],
  '毛笔': [
    { cn: '他用毛笔写书法。', en: 'He writes calligraphy with a writing brush.' },
    { cn: '毛笔字要练好不容易。', en: 'It\'s not easy to get good at writing with a brush.' },
    { cn: '这支毛笔是用狼毫做的。', en: 'This writing brush is made of wolf hair.' },
  ],
  '矛盾': [
    { cn: '他们之间产生了矛盾。', en: 'A conflict arose between them.' },
    { cn: '这两种说法是矛盾的。', en: 'These two statements are contradictory.' },
    { cn: '我们要学会化解矛盾。', en: 'We need to learn to resolve conflicts.' },
  ],
  '煤': [
    { cn: '煤是一种重要的能源。', en: 'Coal is an important energy source.' },
    { cn: '这个地区盛产煤。', en: 'This region is rich in coal.' },
    { cn: '他以前在煤矿工作。', en: 'He used to work in a coal mine.' },
  ],
  '煤气': [
    { cn: '出门前记得关煤气。', en: 'Remember to turn off the gas before going out.' },
    { cn: '煤气泄漏很危险。', en: 'A gas leak is very dangerous.' },
    { cn: '她用煤气灶做饭。', en: 'She cooks with a gas stove.' },
  ],
  '门诊': [
    { cn: '他去医院看门诊。', en: 'He went to the hospital for outpatient services.' },
    { cn: '门诊的挂号费是多少？', en: 'How much is the outpatient registration fee?' },
    { cn: '这家医院的门诊量很大。', en: 'This hospital has a large outpatient volume.' },
  ],
  '命令': [
    { cn: '将军下达了进攻的命令。', en: 'The general issued the order to attack.' },
    { cn: '军人必须服从命令。', en: 'Soldiers must obey orders.' },
    { cn: '他命令大家立刻出发。', en: 'He ordered everyone to depart immediately.' },
  ],
  '迷人': [
    { cn: '她有一双迷人的眼睛。', en: 'She has a pair of enchanting eyes.' },
    { cn: '这里的夜景非常迷人。', en: 'The night view here is very charming.' },
    { cn: '她的笑容很迷人。', en: 'Her smile is very captivating.' },
  ],
  '迷信': [
    { cn: '他不相信迷信。', en: 'He doesn\'t believe in superstition.' },
    { cn: '我们要用科学代替迷信。', en: 'We should replace superstition with science.' },
    { cn: '有些老人比较迷信。', en: 'Some elderly people are rather superstitious.' },
  ],
  '明亮': [
    { cn: '教室里很明亮。', en: 'The classroom is very bright.' },
    { cn: '月光明亮，照亮了小路。', en: 'The moonlight is bright, illuminating the path.' },
    { cn: '她有一双明亮的大眼睛。', en: 'She has a pair of bright big eyes.' },
  ],
  '明明': [
    { cn: '他明明知道，却装不知道。', en: 'He obviously knows, but pretends not to.' },
    { cn: '明明是你的错，为什么不承认？', en: 'It\'s obviously your fault; why don\'t you admit it?' },
    { cn: '我明明把钥匙放在这里了。', en: 'I clearly put the keys right here.' },
  ],
  '摩擦': [
    { cn: '两国之间发生了贸易摩擦。', en: 'Trade friction occurred between the two countries.' },
    { cn: '他们之间有些摩擦。', en: 'There is some friction between them.' },
    { cn: '摩擦可以产生热量。', en: 'Friction can generate heat.' },
  ],
  '模范': [
    { cn: '他是全国劳动模范。', en: 'He is a national model worker.' },
    { cn: '她是大家学习的模范。', en: 'She is a model for everyone to learn from.' },
    { cn: '我们要向模范人物学习。', en: 'We should learn from model figures.' },
  ],
  '模仿': [
    { cn: '小孩子喜欢模仿大人。', en: 'Small children like to imitate adults.' },
    { cn: '他模仿得很像。', en: 'His imitation is very convincing.' },
    { cn: '创新比模仿更重要。', en: 'Innovation is more important than imitation.' },
  ],
  '模糊': [
    { cn: '这张照片太模糊了。', en: 'This photo is too blurry.' },
    { cn: '我对那件事的记忆已经很模糊了。', en: 'My memory of that event has become very vague.' },
    { cn: '他的回答很模糊。', en: 'His answer was very vague.' },
  ],
  '模式': [
    { cn: '这种商业模式很成功。', en: 'This business model is very successful.' },
    { cn: '教育模式需要改革。', en: 'The educational model needs reform.' },
    { cn: '手机进入了省电模式。', en: 'The phone has entered power-saving mode.' },
  ],
  '摩托': [
    { cn: '他骑摩托车上班。', en: 'He rides a motorbike to work.' },
    { cn: '那辆摩托车开得太快了。', en: 'That motorcycle is going too fast.' },
    { cn: '他买了一辆新摩托。', en: 'He bought a new motorbike.' },
  ],
  '目光': [
    { cn: '她的目光充满了温柔。', en: 'Her gaze was full of tenderness.' },
    { cn: '所有人的目光都集中在他身上。', en: 'Everyone\'s attention was focused on him.' },
    { cn: '他用怀疑的目光看着我。', en: 'He looked at me with a suspicious gaze.' },
  ],
  '模样': [
    { cn: '她长得很有模样。', en: 'She is good-looking.' },
    { cn: '他走路的模样很滑稽。', en: 'The way he walks looks funny.' },
    { cn: '这孩子的模样像他妈妈。', en: 'This child\'s appearance resembles his mother.' },
  ],
  '码头': [
    { cn: '船已经到码头了。', en: 'The ship has arrived at the dock.' },
    { cn: '我们在码头等渡船。', en: 'We are waiting for the ferry at the pier.' },
    { cn: '码头上停了很多船。', en: 'Many boats are docked at the wharf.' },
  ],
  '买卖': [
    { cn: '他做了一笔好买卖。', en: 'He made a good deal.' },
    { cn: '买卖要讲诚信。', en: 'Business dealings should be based on integrity.' },
    { cn: '这个买卖不赚钱。', en: 'This business doesn\'t make money.' },
  ],
  '敏感': [
    { cn: '她的皮肤很敏感。', en: 'Her skin is very sensitive.' },
    { cn: '这是一个敏感的话题。', en: 'This is a sensitive topic.' },
    { cn: '他对气温变化很敏感。', en: 'He is very susceptible to temperature changes.' },
  ],
  '年度': [
    { cn: '他获得了年度最佳员工奖。', en: 'He won the Annual Best Employee award.' },
    { cn: '公司发布了年度财务报告。', en: 'The company released its annual financial report.' },
    { cn: '年度计划已经制定好了。', en: 'The annual plan has been finalized.' },
  ],
  '年龄': [
    { cn: '请问您的年龄是多少？', en: 'May I ask how old you are?' },
    { cn: '他已经到了退休年龄。', en: 'He has already reached retirement age.' },
    { cn: '年龄不是问题，能力才是。', en: 'Age is not the issue; ability is.' },
  ],
  '年前': [
    { cn: '年前商场都在打折。', en: 'Stores all have discounts before the New Year.' },
    { cn: '他打算年前把房子装修好。', en: 'He plans to finish renovating the house before the New Year.' },
    { cn: '年前工作特别忙。', en: 'Work is especially busy before the end of the year.' },
  ],
  '牛仔裤': [
    { cn: '他喜欢穿牛仔裤。', en: 'He likes wearing jeans.' },
    { cn: '这条牛仔裤很合身。', en: 'These jeans fit very well.' },
    { cn: '牛仔裤是年轻人最爱的服装之一。', en: 'Jeans are one of young people\'s favorite types of clothing.' },
  ],
  '暖': [
    { cn: '今天天气很暖。', en: 'The weather is warm today.' },
    { cn: '太阳出来了，暖洋洋的。', en: 'The sun has come out; it feels nice and warm.' },
    { cn: '他的话让我心里很暖。', en: 'His words warmed my heart.' },
  ],
  '耐心': [
    { cn: '老师很有耐心地讲解。', en: 'The teacher explains with great patience.' },
    { cn: '做这件事需要很大的耐心。', en: 'Doing this requires a lot of patience.' },
    { cn: '请你耐心等一等。', en: 'Please wait patiently.' },
  ],
  '南北': [
    { cn: '中国南北气候差异很大。', en: 'The climate differs greatly between the north and south of China.' },
    { cn: '这条路是南北方向的。', en: 'This road runs north to south.' },
    { cn: '南北饮食习惯不同。', en: 'Eating habits differ between the north and south.' },
  ],
  '难得': [
    { cn: '这次机会很难得。', en: 'This opportunity is rare.' },
    { cn: '他难得有空，我们一起吃个饭。', en: 'He seldom has free time; let\'s have a meal together.' },
    { cn: '今天天气这么好，真难得。', en: 'Such nice weather today is really hard to come by.' },
  ],
  '南极': [
    { cn: '南极是世界上最冷的地方。', en: 'The South Pole is the coldest place in the world.' },
    { cn: '科学家在南极进行了考察。', en: 'Scientists conducted an expedition in Antarctica.' },
    { cn: '企鹅生活在南极。', en: 'Penguins live in the Antarctic.' },
  ],
  '男性': [
    { cn: '这个岗位只招男性。', en: 'This position only recruits males.' },
    { cn: '男性的平均寿命比女性短。', en: 'The average lifespan of males is shorter than that of females.' },
    { cn: '男性在这方面的表现不如女性。', en: 'Males perform worse than females in this regard.' },
  ],
  '难以': [
    { cn: '这个问题难以解决。', en: 'This problem is hard to solve.' },
    { cn: '他的话令人难以置信。', en: 'His words are hard to believe.' },
    { cn: '损失难以估计。', en: 'The losses are hard to estimate.' },
  ],
  '内在': [
    { cn: '内在的美比外在更重要。', en: 'Inner beauty is more important than outward appearance.' },
    { cn: '他有丰富的内在修养。', en: 'He has rich inner cultivation.' },
    { cn: '我们要注重事物的内在联系。', en: 'We should focus on the intrinsic connections between things.' },
  ],
  '能量': [
    { cn: '运动需要消耗大量能量。', en: 'Exercise requires consuming a lot of energy.' },
    { cn: '食物为我们提供能量。', en: 'Food provides us with energy.' },
    { cn: '他身上充满了正能量。', en: 'He is full of positive energy.' },
  ],
  '农产品': [
    { cn: '这个地区的农产品很丰富。', en: 'Agricultural products in this region are very abundant.' },
    { cn: '绿色农产品越来越受欢迎。', en: 'Green agricultural produce is becoming increasingly popular.' },
    { cn: '我们出口了大量农产品。', en: 'We exported a large quantity of agricultural products.' },
  ],
  '脑子': [
    { cn: '他脑子很聪明。', en: 'He has a clever brain.' },
    { cn: '动动脑子想想办法。', en: 'Use your brains and think of a solution.' },
    { cn: '我脑子一片空白。', en: 'My mind went blank.' },
  ],
  '女性': [
    { cn: '越来越多的女性走进了职场。', en: 'More and more women are entering the workplace.' },
    { cn: '女性的社会地位在不断提高。', en: 'The social status of women continues to improve.' },
    { cn: '这款产品专门为女性设计。', en: 'This product is designed specifically for women.' },
  ],
