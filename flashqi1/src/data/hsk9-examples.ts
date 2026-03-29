const HSK9_EXAMPLES: Record<string, { cn: string; en: string }[]> = {
  '收支': [
    { cn: '这个月的收支基本持平。', en: 'This month\'s income and expenditure are roughly balanced.' },
    { cn: '公司需要定期审核收支情况。', en: 'The company needs to regularly review its financial balance.' },
    { cn: '他每天都记录家庭的收支明细。', en: 'He records the household\'s income and expenditure details every day.' },
  ],
  '手臂': [
    { cn: '他的手臂上有一道很深的伤疤。', en: 'There is a deep scar on his arm.' },
    { cn: '她抬起手臂向远处的朋友挥手。', en: 'She raised her arm and waved to her friend in the distance.' },
    { cn: '经过长时间的锻炼，他的手臂变得很结实。', en: 'After a long period of exercise, his arms became very strong.' },
  ],
  '手册': [
    { cn: '请仔细阅读这本使用手册。', en: 'Please read this user manual carefully.' },
    { cn: '新员工入职时会收到一本员工手册。', en: 'New employees receive an employee handbook when they join.' },
    { cn: '这本旅行手册介绍了当地的风土人情。', en: 'This travel handbook introduces the local customs and culture.' },
  ],
  '手动': [
    { cn: '这台机器可以在手动和自动模式之间切换。', en: 'This machine can switch between manual and automatic modes.' },
    { cn: '他更喜欢开手动挡的车。', en: 'He prefers to drive a manual transmission car.' },
    { cn: '系统出故障时，需要手动重启。', en: 'When the system malfunctions, a manual restart is needed.' },
  ],
  '手脚': [
    { cn: '天太冷了，我的手脚都冻僵了。', en: 'It\'s too cold; my hands and feet are frozen stiff.' },
    { cn: '有人在这笔账目上动了手脚。', en: 'Someone tampered with these accounts.' },
    { cn: '他做事手脚很麻利。', en: 'He works quickly and nimbly.' },
  ],
  '手帕': [
    { cn: '她从口袋里掏出一条手帕擦眼泪。', en: 'She took out a handkerchief from her pocket to wipe her tears.' },
    { cn: '这条手帕是奶奶亲手绣的。', en: 'This handkerchief was embroidered by grandmother herself.' },
    { cn: '他总是随身带着一条白手帕。', en: 'He always carries a white handkerchief with him.' },
  ],
  '手枪': [
    { cn: '警察从腰间拔出了手枪。', en: 'The police officer drew the pistol from his waist.' },
    { cn: '这把手枪的射程大约五十米。', en: 'This pistol has a range of about fifty meters.' },
    { cn: '未经许可，平民不得持有手枪。', en: 'Civilians are not allowed to possess pistols without permission.' },
  ],
  '手势': [
    { cn: '他用手势示意大家安静。', en: 'He used a gesture to signal everyone to be quiet.' },
    { cn: '不同文化中，同一个手势可能有不同的含义。', en: 'In different cultures, the same gesture may have different meanings.' },
    { cn: '交通警察用手势指挥车辆通行。', en: 'Traffic police direct vehicles using gestures.' },
  ],
  '手术室': [
    { cn: '病人已经被推进了手术室。', en: 'The patient has already been wheeled into the operating room.' },
    { cn: '手术室里必须保持无菌环境。', en: 'A sterile environment must be maintained in the operating room.' },
    { cn: '家属在手术室外焦急地等待着。', en: 'Family members waited anxiously outside the operating room.' },
  ],
  '手头': [
    { cn: '我手头正好有一本你需要的书。', en: 'I happen to have the book you need on hand.' },
    { cn: '最近手头有点紧，不能乱花钱。', en: 'Money has been a bit tight lately; I can\'t spend carelessly.' },
    { cn: '他手头的工作还没完成。', en: 'The work he has on hand isn\'t finished yet.' },
  ],
  '手腕': [
    { cn: '她戴了一块精致的手表在手腕上。', en: 'She wore an exquisite watch on her wrist.' },
    { cn: '这位政治家以高明的手腕著称。', en: 'This politician is known for his shrewd finesse.' },
    { cn: '打网球时不小心扭伤了手腕。', en: 'I accidentally sprained my wrist while playing tennis.' },
  ],
  '手艺': [
    { cn: '这位师傅的手艺在方圆百里无人能比。', en: 'This craftsman\'s workmanship is unmatched within a hundred li.' },
    { cn: '他从小跟父亲学了一门好手艺。', en: 'He learned a fine craft from his father since childhood.' },
    { cn: '这道菜真好吃，你的手艺越来越好了。', en: 'This dish is delicious; your cooking skills are getting better and better.' },
  ],
  '手掌': [
    { cn: '她把硬币紧紧握在手掌里。', en: 'She held the coin tightly in her palm.' },
    { cn: '算命先生仔细看了看他的手掌。', en: 'The fortune teller carefully examined his palm.' },
    { cn: '他的手掌因为长年劳动布满了老茧。', en: 'His palms were covered in calluses from years of labor.' },
  ],
  '守候': [
    { cn: '母亲在病床前守候了整整三天。', en: 'The mother kept watch at the bedside for three full days.' },
    { cn: '记者们在门口守候着明星的到来。', en: 'Reporters waited at the entrance for the star\'s arrival.' },
    { cn: '他默默地守候在她身边。', en: 'He quietly kept watch by her side.' },
  ],
  '守护': [
    { cn: '父母是守护孩子成长的天使。', en: 'Parents are the angels who guard their children\'s growth.' },
    { cn: '士兵们日夜守护着国家的边疆。', en: 'Soldiers guard the nation\'s borders day and night.' },
    { cn: '这条狗忠诚地守护着主人的家。', en: 'This dog faithfully guards its master\'s home.' },
  ],
  '守株待兔': [
    { cn: '不能守株待兔，要主动寻找机会。', en: 'You can\'t just wait for opportunities to come to you; you must actively seek them.' },
    { cn: '他整天守株待兔，不愿付出努力。', en: 'He just waits for good luck all day without being willing to make an effort.' },
    { cn: '成功需要勤奋，守株待兔是行不通的。', en: 'Success requires diligence; trusting to chance won\'t work.' },
  ],
  '首创': [
    { cn: '这项技术是我们公司首创的。', en: 'This technology was originally created by our company.' },
    { cn: '他首创了一种全新的教学方法。', en: 'He pioneered a brand-new teaching method.' },
    { cn: '这种商业模式在国内属于首创。', en: 'This business model is a first in the country.' },
  ],
  '首府': [
    { cn: '拉萨是西藏自治区的首府。', en: 'Lhasa is the capital city of the Tibet Autonomous Region.' },
    { cn: '我们计划下个月去参观那个州的首府。', en: 'We plan to visit that state\'s capital next month.' },
    { cn: '首府的经济发展速度很快。', en: 'The capital city\'s economic development is very rapid.' },
  ],
  '首批': [
    { cn: '首批疫苗已经运抵目的地。', en: 'The first batch of vaccines has arrived at the destination.' },
    { cn: '他是首批被录取的学生之一。', en: 'He was one of the first batch of admitted students.' },
    { cn: '首批产品将于下月正式上市。', en: 'The first batch of products will officially launch next month.' },
  ],
  '首饰': [
    { cn: '她收到了一套精美的首饰作为生日礼物。', en: 'She received a set of exquisite jewelry as a birthday gift.' },
    { cn: '这家店专门出售金银首饰。', en: 'This shop specializes in selling gold and silver jewelry.' },
    { cn: '她把首饰都锁在保险柜里。', en: 'She locked all her jewelry in the safe.' },
  ],
  '首要': [
    { cn: '安全是我们首要考虑的问题。', en: 'Safety is our primary concern.' },
    { cn: '提高教育质量是国家发展的首要任务。', en: 'Improving the quality of education is the most important task for national development.' },
    { cn: '他认为诚信是做人的首要品质。', en: 'He believes integrity is the most important quality in a person.' },
  ],
  '寿命': [
    { cn: '随着医学进步，人类的平均寿命不断延长。', en: 'With medical advances, human life expectancy keeps increasing.' },
    { cn: '这台电脑的使用寿命大约是五年。', en: 'This computer has a lifespan of about five years.' },
    { cn: '健康的生活方式有助于延长寿命。', en: 'A healthy lifestyle helps extend one\'s lifespan.' },
  ],
  '受过': [
    { cn: '这件事不是他做的，却替别人受过。', en: 'He didn\'t do it, but he took the blame for someone else.' },
    { cn: '他甘愿为朋友受过。', en: 'He was willing to take the blame for his friend.' },
    { cn: '不能让无辜的人受过。', en: 'We can\'t let innocent people take the blame.' },
  ],
  '受害': [
    { cn: '很多人在这次灾难中受害。', en: 'Many people were harmed in this disaster.' },
    { cn: '网络诈骗让许多老人受害。', en: 'Online scams have victimized many elderly people.' },
    { cn: '受害地区急需救援物资。', en: 'The affected areas urgently need relief supplies.' },
  ],
  '受害人': [
    { cn: '警方正在寻找这起案件的受害人。', en: 'The police are looking for the victim of this case.' },
    { cn: '受害人已经向法院提起了诉讼。', en: 'The victim has filed a lawsuit with the court.' },
    { cn: '律师代表受害人出庭作证。', en: 'The lawyer appeared in court to testify on behalf of the victim.' },
  ],
  '受贿': [
    { cn: '那个官员因受贿被判了刑。', en: 'That official was sentenced for accepting bribes.' },
    { cn: '受贿是一种严重的违法行为。', en: 'Accepting bribes is a serious illegal act.' },
    { cn: '他坚决拒绝受贿，保持清廉。', en: 'He firmly refused to accept bribes and remained clean.' },
  ],
  '受惊': [
    { cn: '那匹马受惊后拼命往前跑。', en: 'The horse bolted forward after being startled.' },
    { cn: '孩子被突然的雷声吓得受惊了。', en: 'The child was startled by the sudden thunder.' },
    { cn: '受惊的小鸟从树上飞走了。', en: 'The startled bird flew away from the tree.' },
  ],
  '受苦': [
    { cn: '他小时候受苦受累，长大后格外珍惜生活。', en: 'He suffered hardship in childhood and cherishes life all the more as an adult.' },
    { cn: '不要让老人跟着我们受苦。', en: 'Don\'t let the elderly suffer along with us.' },
    { cn: '战争让无数百姓受苦。', en: 'War causes countless people to suffer.' },
  ],
  '受理': [
    { cn: '法院已经受理了这个案件。', en: 'The court has accepted this case for hearing.' },
    { cn: '这个窗口受理签证申请业务。', en: 'This counter handles visa applications.' },
    { cn: '投诉已经被相关部门受理。', en: 'The complaint has been accepted by the relevant department.' },
  ],
  '受骗': [
    { cn: '她不小心在网上受骗了。', en: 'She was accidentally deceived online.' },
    { cn: '很多人因为贪小便宜而受骗。', en: 'Many people get cheated because of greed for small gains.' },
    { cn: '他意识到自己受骗后立刻报了警。', en: 'He called the police immediately after realizing he had been deceived.' },
  ],
  '受益': [
    { cn: '读书让我受益匪浅。', en: 'Reading has benefited me greatly.' },
    { cn: '这项政策让广大农民受益。', en: 'This policy benefits farmers broadly.' },
    { cn: '他从导师的指导中受益良多。', en: 'He benefited greatly from his mentor\'s guidance.' },
  ],
  '售价': [
    { cn: '这款手机的售价是三千元。', en: 'The selling price of this phone is three thousand yuan.' },
    { cn: '商品的售价通常高于成本价。', en: 'The selling price of goods is usually higher than the cost price.' },
    { cn: '为了促销，商家降低了售价。', en: 'To promote sales, the merchant lowered the selling price.' },
  ],
  '售票': [
    { cn: '售票窗口排了很长的队。', en: 'There was a long line at the ticket window.' },
    { cn: '现在很多景点都可以在网上售票。', en: 'Nowadays many scenic spots can sell tickets online.' },
    { cn: '售票员告诉我票已经卖完了。', en: 'The ticket seller told me the tickets were sold out.' },
  ],
  '授权': [
    { cn: '总经理授权副总处理这件事。', en: 'The general manager authorized the deputy to handle this matter.' },
    { cn: '未经授权，不得进入该区域。', en: 'No entry is allowed without authorization.' },
    { cn: '这家公司获得了品牌的官方授权。', en: 'This company received official brand authorization.' },
  ],
  '授予': [
    { cn: '学校授予他荣誉博士学位。', en: 'The university conferred an honorary doctorate upon him.' },
    { cn: '政府授予她"劳动模范"的称号。', en: 'The government awarded her the title of "Model Worker."' },
    { cn: '组委会授予获奖者金质奖章。', en: 'The organizing committee awarded gold medals to the winners.' },
  ],
  '书橱': [
    { cn: '他家客厅里有一个很大的书橱。', en: 'There is a large bookcase in his living room.' },
    { cn: '书橱里摆满了各种各样的书籍。', en: 'The bookcase is filled with all kinds of books.' },
    { cn: '这个古董书橱是他祖父留下来的。', en: 'This antique bookcase was left by his grandfather.' },
  ],
  '书籍': [
    { cn: '图书馆里收藏了大量珍贵书籍。', en: 'The library houses a large collection of precious books.' },
    { cn: '阅读书籍是获取知识的重要途径。', en: 'Reading books is an important way to acquire knowledge.' },
    { cn: '这些书籍涵盖了文学、科学等多个领域。', en: 'These books cover multiple fields including literature and science.' },
  ],
  '书记': [
    { cn: '村书记带领大家脱贫致富。', en: 'The village party secretary led everyone out of poverty.' },
    { cn: '他被选为学校的团委书记。', en: 'He was elected as the school\'s Communist Youth League secretary.' },
    { cn: '书记在会上作了重要讲话。', en: 'The secretary made an important speech at the meeting.' },
  ],
  '书面': [
    { cn: '请提交一份书面申请。', en: 'Please submit a written application.' },
    { cn: '口头承诺不如书面协议可靠。', en: 'An oral promise is less reliable than a written agreement.' },
    { cn: '考试包括口语和书面两部分。', en: 'The exam includes both oral and written sections.' },
  ],
  '书写': [
    { cn: '他的汉字书写非常工整。', en: 'His Chinese character writing is very neat.' },
    { cn: '请用黑色墨水书写你的名字。', en: 'Please write your name in black ink.' },
    { cn: '每一代人都在书写自己的历史。', en: 'Every generation writes its own history.' },
  ],
  '抒情': [
    { cn: '这首诗充满了抒情的意味。', en: 'This poem is full of lyrical sentiment.' },
    { cn: '她最擅长演唱抒情歌曲。', en: 'She excels at singing lyrical songs.' },
    { cn: '散文是一种适合抒情的文学形式。', en: 'Prose is a literary form well-suited for expressing emotions.' },
  ],
  '枢纽': [
    { cn: '上海是中国重要的交通枢纽。', en: 'Shanghai is an important transportation hub in China.' },
    { cn: '这座城市是东西方文化交流的枢纽。', en: 'This city is a hub for cultural exchange between East and West.' },
    { cn: '新建的高铁站将成为该地区的交通枢纽。', en: 'The newly built high-speed rail station will become the region\'s transportation hub.' },
  ],
  '梳': [
    { cn: '她每天早上都会仔细地梳头发。', en: 'She carefully combs her hair every morning.' },
    { cn: '妈妈轻轻地给女儿梳辫子。', en: 'Mother gently combs her daughter\'s braids.' },
    { cn: '这把梳是用檀木做的。', en: 'This comb is made of sandalwood.' },
  ],
  '梳理': [
    { cn: '她在镜子前梳理自己的长发。', en: 'She combs her long hair in front of the mirror.' },
    { cn: '我们需要梳理一下目前的工作思路。', en: 'We need to sort out our current work approach.' },
    { cn: '律师正在梳理案件的所有证据。', en: 'The lawyer is sorting through all the evidence in the case.' },
  ],
  '梳子': [
    { cn: '她从包里拿出一把小梳子。', en: 'She took out a small comb from her bag.' },
    { cn: '这把梳子的齿断了几根。', en: 'Several teeth of this comb are broken.' },
    { cn: '牛角梳子对头发比较好。', en: 'A horn comb is better for your hair.' },
  ],
  '疏导': [
    { cn: '交警在路口疏导交通。', en: 'Traffic police direct traffic at the intersection.' },
    { cn: '老师及时疏导了学生的不良情绪。', en: 'The teacher promptly helped the student work through negative emotions.' },
    { cn: '政府采取措施疏导洪水。', en: 'The government took measures to channel the floodwaters.' },
  ],
  '疏忽': [
    { cn: '由于工作人员的疏忽，发生了严重事故。', en: 'Due to the staff\'s negligence, a serious accident occurred.' },
    { cn: '这个错误是因为我一时疏忽造成的。', en: 'This mistake was caused by my momentary oversight.' },
    { cn: '安全问题绝对不能疏忽。', en: 'Safety issues must never be overlooked.' },
  ],
  '疏散': [
    { cn: '火灾发生后，所有人员被迅速疏散。', en: 'After the fire broke out, all personnel were quickly evacuated.' },
    { cn: '学校定期进行紧急疏散演练。', en: 'The school regularly conducts emergency evacuation drills.' },
    { cn: '警方正在疏散周围的群众。', en: 'The police are evacuating the surrounding crowd.' },
  ],
  '疏通': [
    { cn: '工人们正在疏通堵塞的下水道。', en: 'Workers are unclogging the blocked sewer.' },
    { cn: '他帮忙疏通了两个部门之间的关系。', en: 'He helped smooth the relationship between the two departments.' },
    { cn: '需要疏通河道，防止洪水泛滥。', en: 'The river channel needs to be dredged to prevent flooding.' },
  ],
  '舒畅': [
    { cn: '在大自然中散步让人心情舒畅。', en: 'Taking a walk in nature makes one feel happy and carefree.' },
    { cn: '问题解决后，他终于感到舒畅了。', en: 'After the problem was solved, he finally felt relieved.' },
    { cn: '深呼吸一下，你会觉得舒畅很多。', en: 'Take a deep breath and you\'ll feel much more relaxed.' },
  ],
  '输家': [
    { cn: '在这场比赛中，没有人愿意成为输家。', en: 'In this competition, no one wants to be the loser.' },
    { cn: '真正的输家是那些不敢尝试的人。', en: 'The real losers are those who don\'t dare to try.' },
    { cn: '贸易战中双方都可能成为输家。', en: 'Both sides may become losers in a trade war.' },
  ],
  '输送': [
    { cn: '这条管道用来输送石油。', en: 'This pipeline is used to transport oil.' },
    { cn: '大学为社会输送了大量人才。', en: 'Universities deliver a large number of talented people to society.' },
    { cn: '血管负责向全身输送血液。', en: 'Blood vessels are responsible for conveying blood throughout the body.' },
  ],
  '输血': [
    { cn: '病人急需输血，请大家踊跃献血。', en: 'The patient urgently needs a blood transfusion; please donate blood.' },
    { cn: '输血前必须确认血型匹配。', en: 'Blood type compatibility must be confirmed before a transfusion.' },
    { cn: '政府向这个困难地区进行了经济输血。', en: 'The government provided economic aid to this struggling area.' },
  ],
  '输液': [
    { cn: '医生让他住院输液三天。', en: 'The doctor asked him to stay in the hospital for three days of IV treatment.' },
    { cn: '感冒严重的话可能需要输液。', en: 'If the cold is severe, an IV drip may be needed.' },
    { cn: '护士正在给病人输液。', en: 'The nurse is giving the patient an intravenous infusion.' },
  ],
  '赎': [
    { cn: '他花了很多钱才把抵押的房子赎回来。', en: 'He spent a lot of money to redeem the mortgaged house.' },
    { cn: '绑匪要求用一百万赎人质。', en: 'The kidnappers demanded one million to ransom the hostage.' },
    { cn: '他想用善行来赎自己过去犯下的罪过。', en: 'He wants to redeem his past sins through good deeds.' },
  ],
  '属性': [
    { cn: '每个角色都有不同的属性。', en: 'Each character has different attributes.' },
    { cn: '水的化学属性非常特殊。', en: 'The chemical properties of water are very unique.' },
    { cn: '你可以在设置中修改文件的属性。', en: 'You can modify the file\'s properties in the settings.' },
  ],
  '暑期': [
    { cn: '暑期是学生们最期待的假期。', en: 'Summer vacation is the holiday students look forward to most.' },
    { cn: '他利用暑期去了一趟欧洲旅行。', en: 'He took a trip to Europe during the summer vacation.' },
    { cn: '很多培训班在暑期特别火爆。', en: 'Many training classes are especially popular during summer.' },
  ],
  '曙光': [
    { cn: '经过长时间的研究，终于看到了成功的曙光。', en: 'After a long period of research, the dawn of success finally appeared.' },
    { cn: '东方的天空出现了一丝曙光。', en: 'A glimmer of dawn appeared in the eastern sky.' },
    { cn: '和平谈判给冲突地区带来了曙光。', en: 'Peace talks brought a ray of hope to the conflict zone.' },
  ],
  '束缚': [
    { cn: '她渴望摆脱传统观念的束缚。', en: 'She longs to break free from the constraints of traditional ideas.' },
    { cn: '不要让恐惧束缚了你的行动。', en: 'Don\'t let fear restrict your actions.' },
    { cn: '过多的规则会束缚创造力。', en: 'Too many rules will stifle creativity.' },
  ],
  '树立': [
    { cn: '老师在学生心中树立了良好的榜样。', en: 'The teacher set a good example in the students\' hearts.' },
    { cn: '公司需要树立自己的品牌形象。', en: 'The company needs to establish its brand image.' },
    { cn: '我们要树立正确的价值观。', en: 'We need to establish correct values.' },
  ],
  '树木': [
    { cn: '公园里种了很多树木。', en: 'Many trees are planted in the park.' },
    { cn: '秋天到了，树木的叶子变黄了。', en: 'Autumn has arrived, and the leaves on the trees have turned yellow.' },
    { cn: '保护树木就是保护环境。', en: 'Protecting trees is protecting the environment.' },
  ],
  '树梢': [
    { cn: '小鸟停在树梢上唱歌。', en: 'A little bird perched on the treetop singing.' },
    { cn: '夕阳的余晖映照在树梢上。', en: 'The afterglow of sunset shone on the treetops.' },
    { cn: '风吹过，树梢轻轻地摇摆。', en: 'The wind blew, and the treetops swayed gently.' },
  ],
  '树荫': [
    { cn: '夏天，人们喜欢在树荫下乘凉。', en: 'In summer, people like to cool off in the shade of trees.' },
    { cn: '孩子们在树荫下玩耍。', en: 'Children play under the shade of the tree.' },
    { cn: '这条路两旁都是树荫，走起来很凉快。', en: 'Both sides of this road are shaded by trees, making it cool to walk along.' },
  ],
  '树枝': [
    { cn: '暴风雨过后，很多树枝被吹断了。', en: 'After the storm, many tree branches were blown off.' },
    { cn: '小鸟站在树枝上叽叽喳喳地叫。', en: 'Little birds chirped on the tree branches.' },
    { cn: '他捡了几根树枝生起了篝火。', en: 'He picked up a few branches and started a campfire.' },
  ],
  '竖': [
    { cn: '请把这根杆子竖起来。', en: 'Please set this pole upright.' },
    { cn: '他竖起大拇指表示赞赏。', en: 'He gave a thumbs-up to show his approval.' },
    { cn: '墙上竖着一面大旗。', en: 'A large flag was erected on the wall.' },
  ],
  '数额': [
    { cn: '这笔贷款的数额相当大。', en: 'The amount of this loan is quite large.' },
    { cn: '合同上注明了付款的具体数额。', en: 'The specific amount of payment is noted on the contract.' },
    { cn: '捐款数额已经超过了预期目标。', en: 'The donation amount has exceeded the expected target.' },
  ],
  '数据库': [
    { cn: '公司建立了一个庞大的客户数据库。', en: 'The company established a large customer database.' },
    { cn: '这个数据库存储了上百万条记录。', en: 'This database stores millions of records.' },
    { cn: '数据库出了故障，需要紧急修复。', en: 'The database malfunctioned and needs urgent repair.' },
  ],
  '刷新': [
    { cn: '他在这次比赛中刷新了世界纪录。', en: 'He broke the world record in this competition.' },
    { cn: '请刷新一下页面看看最新内容。', en: 'Please refresh the page to see the latest content.' },
    { cn: '这栋老房子经过翻修后焕然一新，彻底刷新了面貌。', en: 'After renovation, this old house looks completely new.' },
  ],
  '耍': [
    { cn: '孩子们在院子里耍得很开心。', en: 'The children had a great time playing in the yard.' },
    { cn: '别跟我耍花招。', en: 'Don\'t play tricks on me.' },
    { cn: '他在台上耍了一套漂亮的刀法。', en: 'He displayed a beautiful set of knife skills on stage.' },
  ],
  '耍赖': [
    { cn: '他输了比赛就耍赖，不肯认输。', en: 'He acted shamelessly after losing the game and refused to admit defeat.' },
    { cn: '小孩子耍赖是常有的事。', en: 'It\'s common for little kids to act shamelessly to get their way.' },
    { cn: '你答应过的事不能耍赖。', en: 'You can\'t go back on something you promised.' },
  ],
  '衰减': [
    { cn: '信号在传输过程中会逐渐衰减。', en: 'The signal gradually weakens during transmission.' },
    { cn: '药效随时间推移会逐步衰减。', en: 'The drug\'s effectiveness gradually diminishes over time.' },
    { cn: '地震波在远离震源后逐渐衰减。', en: 'Seismic waves gradually attenuate as they move away from the epicenter.' },
  ],
  '衰竭': [
    { cn: '病人因为器官衰竭去世了。', en: 'The patient passed away due to organ failure.' },
    { cn: '长期的过度劳累导致他身体衰竭。', en: 'Long-term overwork led to his physical exhaustion.' },
    { cn: '心力衰竭是一种严重的疾病。', en: 'Heart failure is a serious disease.' },
  ],
  '衰老': [
    { cn: '衰老是每个人都要面对的自然过程。', en: 'Aging is a natural process everyone must face.' },
    { cn: '适当的运动可以延缓衰老。', en: 'Moderate exercise can slow down aging.' },
    { cn: '他虽然已经衰老，但精神依然矍铄。', en: 'Although he has aged, his spirit is still hale and hearty.' },
  ],
  '衰弱': [
    { cn: '长期卧床使他的身体非常衰弱。', en: 'Long-term bed rest made his body very weak.' },
    { cn: '经济衰弱导致很多人失业。', en: 'The weak economy caused many people to lose their jobs.' },
    { cn: '他身体衰弱，连走路都困难。', en: 'He is so feeble that even walking is difficult.' },
  ],
  '衰退': [
    { cn: '全球经济正面临衰退的风险。', en: 'The global economy is facing the risk of recession.' },
    { cn: '他的记忆力随着年龄增长开始衰退。', en: 'His memory started to decline with age.' },
    { cn: '这个行业近年来持续衰退。', en: 'This industry has been in continuous decline in recent years.' },
  ],
  '摔跤': [
    { cn: '小孩子走路不稳，经常摔跤。', en: 'Toddlers are unsteady on their feet and often trip and fall.' },
    { cn: '他从小就练习摔跤。', en: 'He has been practicing wrestling since childhood.' },
    { cn: '路上很滑，小心摔跤。', en: 'The road is slippery; be careful not to fall.' },
  ],
  '甩': [
    { cn: '她生气地甩门走了。', en: 'She angrily flung the door and left.' },
    { cn: '他被女朋友甩了。', en: 'He was dumped by his girlfriend.' },
    { cn: '狗使劲甩了甩身上的水。', en: 'The dog vigorously shook the water off its body.' },
  ],
  '拴': [
    { cn: '他把马拴在了树上。', en: 'He tied the horse to the tree.' },
    { cn: '请把狗拴好，别让它跑出去。', en: 'Please tie up the dog; don\'t let it run out.' },
    { cn: '她把钥匙拴在腰带上。', en: 'She tied the key to her belt.' },
  ],
  '涮': [
    { cn: '冬天最适合吃涮羊肉了。', en: 'Winter is the best time to eat hot pot-style lamb.' },
    { cn: '把蔬菜放进锅里涮一下就能吃了。', en: 'Dip the vegetables briefly in the pot and they\'re ready to eat.' },
    { cn: '他被朋友涮了一把。', en: 'He was tricked by his friend.' },
  ],
  '双胞胎': [
    { cn: '她生了一对双胞胎女儿。', en: 'She gave birth to twin daughters.' },
    { cn: '这对双胞胎长得一模一样。', en: 'These twins look exactly alike.' },
    { cn: '双胞胎之间常常有心灵感应。', en: 'Twins often have a telepathic connection.' },
  ],
  '双边': [
    { cn: '两国签署了双边贸易协定。', en: 'The two countries signed a bilateral trade agreement.' },
    { cn: '双边关系近年来不断改善。', en: 'Bilateral relations have been improving in recent years.' },
    { cn: '总统出席了双边会谈。', en: 'The president attended the bilateral talks.' },
  ],
  '双向': [
    { cn: '这条路是双向通行的。', en: 'This road has two-way traffic.' },
    { cn: '教育应该是双向的互动过程。', en: 'Education should be a two-way interactive process.' },
    { cn: '我们要建立双向的沟通机制。', en: 'We need to establish a two-way communication mechanism.' },
  ],
  '双赢': [
    { cn: '合作的目标是实现双赢。', en: 'The goal of cooperation is to achieve a win-win outcome.' },
    { cn: '这项协议对双方都有利，是一个双赢的结果。', en: 'This agreement benefits both parties; it\'s a win-win result.' },
    { cn: '好的谈判应该追求双赢的局面。', en: 'Good negotiation should pursue a win-win situation.' },
  ],
  '双重': [
    { cn: '他拥有中美双重国籍。', en: 'He holds dual Chinese-American citizenship.' },
    { cn: '这个决定对他来说是双重打击。', en: 'This decision was a double blow for him.' },
    { cn: '产品经过了双重质量检测。', en: 'The product went through double quality inspection.' },
  ],
  '霜': [
    { cn: '今天早上地面上结了一层薄霜。', en: 'A thin layer of frost formed on the ground this morning.' },
    { cn: '她每天晚上都会涂护肤霜。', en: 'She applies skin cream every night.' },
    { cn: '霜降以后天气明显变冷了。', en: 'The weather became noticeably colder after the Frost Descent solar term.' },
  ],
  '爽快': [
    { cn: '他是一个很爽快的人，做事从不拖泥带水。', en: 'He is a straightforward person who never drags things out.' },
    { cn: '洗完澡后感觉特别爽快。', en: 'I feel especially refreshed after taking a shower.' },
    { cn: '她爽快地答应了我的请求。', en: 'She readily agreed to my request.' },
  ],
  '谁知道': [
    { cn: '谁知道他突然就辞职了。', en: 'Who would have imagined he suddenly resigned.' },
    { cn: '谁知道明天会发生什么事。', en: 'Who knows what will happen tomorrow.' },
    { cn: '我以为一切顺利，谁知道半路出了问题。', en: 'I thought everything was going smoothly; who knew problems would arise halfway through.' },
  ],
  '水槽': [
    { cn: '请把碗放到水槽里。', en: 'Please put the bowl in the sink.' },
    { cn: '水槽堵了，需要找人来修。', en: 'The sink is clogged; we need to find someone to fix it.' },
    { cn: '她在水槽里洗着蔬菜。', en: 'She was washing vegetables in the sink.' },
  ],
  '水稻': [
    { cn: '南方是中国主要的水稻产区。', en: 'The south is China\'s main rice-producing region.' },
    { cn: '袁隆平对杂交水稻的研究做出了巨大贡献。', en: 'Yuan Longping made enormous contributions to hybrid rice research.' },
    { cn: '水稻在生长期需要充足的水分。', en: 'Rice needs sufficient water during its growing period.' },
  ],
  '水管': [
    { cn: '冬天水管容易冻裂。', en: 'Water pipes are prone to freezing and cracking in winter.' },
    { cn: '水管漏了，地板上都是水。', en: 'The water pipe is leaking; there\'s water all over the floor.' },
    { cn: '工人正在更换老旧的水管。', en: 'Workers are replacing the old water pipes.' },
  ],
  '水壶': [
    { cn: '水壶里的水开了。', en: 'The water in the kettle has boiled.' },
    { cn: '出门运动别忘了带水壶。', en: 'Don\'t forget to bring a water bottle when going out to exercise.' },
    { cn: '她买了一个保温水壶。', en: 'She bought an insulated water kettle.' },
  ],
  '水货': [
    { cn: '这部手机是水货，不是正品。', en: 'This phone is an unauthorized import, not a genuine product.' },
    { cn: '买水货虽然便宜，但没有保修。', en: 'Buying unauthorized goods is cheaper, but there\'s no warranty.' },
    { cn: '海关查获了一批走私水货。', en: 'Customs seized a batch of smuggled goods.' },
  ],
  '水晶': [
    { cn: '她戴了一条漂亮的水晶项链。', en: 'She wore a beautiful crystal necklace.' },
    { cn: '这个水晶球在阳光下闪闪发光。', en: 'This crystal ball sparkles in the sunlight.' },
    { cn: '这件工艺品是用天然水晶制成的。', en: 'This craft item is made of natural crystal.' },
  ],
  '水利': [
    { cn: '政府加大了对水利设施的投入。', en: 'The government has increased investment in water conservancy facilities.' },
    { cn: '水利工程有效地防止了洪水灾害。', en: 'Water conservancy projects effectively prevent flood disasters.' },
    { cn: '他是一名水利工程师。', en: 'He is a water conservancy engineer.' },
  ],
  '水灵灵': [
    { cn: '这些刚摘的水果看起来水灵灵的。', en: 'These freshly picked fruits look fresh and dewy.' },
    { cn: '小姑娘长得水灵灵的，很可爱。', en: 'The little girl looks lovely and fresh-faced.' },
    { cn: '园子里的蔬菜水灵灵的，一看就很新鲜。', en: 'The vegetables in the garden are fresh and tender, obviously very fresh.' },
  ],
  '水龙头': [
    { cn: '请拧紧水龙头，别浪费水。', en: 'Please tighten the faucet; don\'t waste water.' },
    { cn: '厨房的水龙头坏了，一直在滴水。', en: 'The kitchen faucet is broken and keeps dripping.' },
    { cn: '他安装了一个感应式水龙头。', en: 'He installed a sensor-activated faucet.' },
  ],
  '水落石出': [
    { cn: '经过调查，事情终于水落石出了。', en: 'After investigation, the truth finally came to light.' },
    { cn: '我相信总有一天会水落石出的。', en: 'I believe the truth will come out someday.' },
    { cn: '警方努力工作，一定要让真相水落石出。', en: 'The police are working hard to make sure the truth comes to light.' },
  ],
  '水面': [
    { cn: '夕阳在水面上洒下一片金光。', en: 'The sunset cast a golden glow on the water surface.' },
    { cn: '鱼儿不时跳出水面。', en: 'Fish occasionally jump out of the water.' },
    { cn: '微风吹过，水面泛起了涟漪。', en: 'A gentle breeze blew across the water surface, creating ripples.' },
  ],
  '水手': [
    { cn: '他年轻时做过水手。', en: 'He worked as a sailor when he was young.' },
    { cn: '水手们在甲板上忙碌着。', en: 'The sailors were busy on the deck.' },
    { cn: '经验丰富的水手能预测天气变化。', en: 'Experienced sailors can predict weather changes.' },
  ],
  '水温': [
    { cn: '请先试一下水温再给宝宝洗澡。', en: 'Please test the water temperature before bathing the baby.' },
    { cn: '水温太高会烫伤皮肤。', en: 'Water that is too hot can scald the skin.' },
    { cn: '泡茶的水温很重要。', en: 'The water temperature for brewing tea is very important.' },
  ],
  '水域': [
    { cn: '这片水域禁止捕鱼。', en: 'Fishing is prohibited in these waters.' },
    { cn: '船只不得进入军事水域。', en: 'Vessels are not allowed to enter military waters.' },
    { cn: '这一水域的生态环境正在逐步恢复。', en: 'The ecological environment of this body of water is gradually recovering.' },
  ],
  '水源': [
    { cn: '保护水源是每个人的责任。', en: 'Protecting water sources is everyone\'s responsibility.' },
    { cn: '这个村子的水源来自山上的泉水。', en: 'This village\'s water supply comes from mountain springs.' },
    { cn: '工厂排污严重污染了附近的水源。', en: 'Factory discharge seriously polluted the nearby water source.' },
  ],
  '水涨船高': [
    { cn: '经济发展了，工资水涨船高。', en: 'As the economy develops, wages rise with the tide.' },
    { cn: '房价涨了，租金也水涨船高。', en: 'House prices went up, and rents rose accordingly.' },
    { cn: '原材料价格上涨，产品价格自然水涨船高。', en: 'When raw material prices rise, product prices naturally follow suit.' },
  ],
  '水准': [
    { cn: '他的钢琴演奏达到了专业水准。', en: 'His piano performance has reached a professional level.' },
    { cn: '这部电影的制作水准非常高。', en: 'The production quality of this film is very high.' },
    { cn: '我们要努力提高教学水准。', en: 'We must work hard to raise teaching standards.' },
  ],
  '税收': [
    { cn: '税收是国家财政收入的主要来源。', en: 'Taxation is the main source of national revenue.' },
    { cn: '政府出台了新的税收政策。', en: 'The government introduced a new taxation policy.' },
    { cn: '企业依法纳税是应尽的税收义务。', en: 'Paying taxes according to law is a tax obligation enterprises must fulfill.' },
  ],
  '税务': [
    { cn: '他在税务局工作了二十年。', en: 'He has worked at the tax bureau for twenty years.' },
    { cn: '公司请了专业人员处理税务事宜。', en: 'The company hired professionals to handle tax matters.' },
    { cn: '税务稽查发现了一些账目问题。', en: 'The tax audit uncovered some accounting issues.' },
  ],
  '睡袋': [
    { cn: '野营的时候别忘了带睡袋。', en: 'Don\'t forget to bring a sleeping bag when camping.' },
    { cn: '这个睡袋可以抵御零下十度的严寒。', en: 'This sleeping bag can withstand temperatures down to minus ten degrees.' },
    { cn: '他在睡袋里睡得很香。', en: 'He slept soundly in the sleeping bag.' },
  ],
  '顺便': [
    { cn: '你去超市的时候，顺便帮我买瓶水。', en: 'When you go to the supermarket, buy me a bottle of water while you\'re at it.' },
    { cn: '我去邮局寄信，顺便去银行取了点钱。', en: 'I went to the post office to mail a letter and stopped by the bank to withdraw some money.' },
    { cn: '顺便说一下，明天的会议改到下午了。', en: 'By the way, tomorrow\'s meeting has been moved to the afternoon.' },
  ],
  '顺差': [
    { cn: '今年中国的贸易顺差进一步扩大。', en: 'China\'s trade surplus further expanded this year.' },
    { cn: '持续的顺差有利于增加外汇储备。', en: 'A sustained surplus helps increase foreign exchange reserves.' },
    { cn: '政府采取措施减少贸易顺差。', en: 'The government took measures to reduce the trade surplus.' },
  ],
  '顺畅': [
    { cn: '交通非常顺畅，没有堵车。', en: 'Traffic was very smooth with no congestion.' },
    { cn: '这篇文章写得很顺畅。', en: 'This article is written very fluently.' },
    { cn: '沟通顺畅是团队合作的基础。', en: 'Smooth communication is the foundation of teamwork.' },
  ],
  '顺从': [
    { cn: '她从小就很顺从父母的安排。', en: 'She has been obedient to her parents\' arrangements since childhood.' },
    { cn: '他不愿意盲目顺从权威。', en: 'He is unwilling to blindly submit to authority.' },
    { cn: '顺从不等于软弱。', en: 'Compliance does not equal weakness.' },
  ],
  '顺理成章': [
    { cn: '他能力出众，升职是顺理成章的事。', en: 'He is exceptionally capable, so his promotion was only natural.' },
    { cn: '在那种情况下，这样的结果顺理成章。', en: 'Under those circumstances, such a result was only to be expected.' },
    { cn: '论证充分，结论自然顺理成章。', en: 'With thorough argumentation, the conclusion naturally follows logically.' },
  ],
  '顺路': [
    { cn: '既然顺路，我就送你回家吧。', en: 'Since it\'s on the way, let me give you a ride home.' },
    { cn: '下班顺路去超市买了些菜。', en: 'On the way home from work, I stopped by the supermarket to buy groceries.' },
    { cn: '顺路经过花店时，他买了一束花。', en: 'Passing by the flower shop on the way, he bought a bouquet.' },
  ],
  '顺其自然': [
    { cn: '有些事情强求不来，还是顺其自然吧。', en: 'Some things can\'t be forced; just let nature take its course.' },
    { cn: '感情的事，顺其自然就好。', en: 'When it comes to feelings, just let things happen naturally.' },
    { cn: '他学会了顺其自然，不再焦虑。', en: 'He learned to let nature take its course and stopped being anxious.' },
  ],
  '顺势': [
    { cn: '他顺势推了对手一把。', en: 'He took the opportunity to push his opponent.' },
    { cn: '公司顺势推出了新产品。', en: 'The company seized the moment to launch a new product.' },
    { cn: '她顺势坐了下来。', en: 'She took the opportunity to sit down.' },
  ],
  '顺手': [
    { cn: '出门的时候顺手把门关上。', en: 'Close the door on your way out.' },
    { cn: '他顺手拿了桌上的报纸。', en: 'He casually picked up the newspaper on the table.' },
    { cn: '这把刀用起来很顺手。', en: 'This knife is very handy to use.' },
  ],
  '顺心': [
    { cn: '祝你新的一年万事顺心。', en: 'I wish you a smooth and happy new year.' },
    { cn: '最近工作不太顺心，总遇到麻烦。', en: 'Work hasn\'t been going well lately; I keep running into trouble.' },
    { cn: '生活不可能事事顺心。', en: 'Life can\'t always go the way you want.' },
  ],
  '顺应': [
    { cn: '企业要顺应市场变化及时调整策略。', en: 'Enterprises must adapt to market changes and adjust strategies promptly.' },
    { cn: '我们应该顺应时代潮流。', en: 'We should conform to the trends of the times.' },
    { cn: '顺应自然规律才能获得可持续发展。', en: 'Only by conforming to natural laws can sustainable development be achieved.' },
  ],
  '顺着': [
    { cn: '顺着这条路一直走就到了。', en: 'Just keep walking along this road and you\'ll get there.' },
    { cn: '她顺着河边慢慢散步。', en: 'She walked slowly along the riverside.' },
    { cn: '泪水顺着她的脸颊流了下来。', en: 'Tears flowed down along her cheeks.' },
  ],
  '瞬间': [
    { cn: '那一瞬间，时间仿佛凝固了。', en: 'In that instant, time seemed to freeze.' },
    { cn: '烟花在空中绽放的瞬间美丽极了。', en: 'The moment fireworks bloomed in the sky was incredibly beautiful.' },
    { cn: '他瞬间就明白了事情的真相。', en: 'He understood the truth of the matter in an instant.' },
  ],
  '说白了': [
    { cn: '说白了，他就是不想帮忙。', en: 'To put it bluntly, he just doesn\'t want to help.' },
    { cn: '说白了，这不过是利益之争。', en: 'Frankly speaking, this is nothing but a conflict of interests.' },
    { cn: '说白了，成功没有捷径。', en: 'To be frank, there are no shortcuts to success.' },
  ],
  '说不上': [
    { cn: '对这件事我也说不上什么意见。', en: 'I can\'t really say much about this matter.' },
    { cn: '他的成绩说不上好，但也不算差。', en: 'His grades can\'t be called good, but they\'re not bad either.' },
    { cn: '我们的关系说不上很亲密。', en: 'Our relationship can\'t be called very close.' },
  ],
  '说到底': [
    { cn: '说到底，还是钱的问题。', en: 'In the end, it\'s still about money.' },
    { cn: '说到底，他就是不愿意承认错误。', en: 'At the end of the day, he just doesn\'t want to admit his mistake.' },
    { cn: '说到底，健康才是最重要的。', en: 'When all is said and done, health is the most important thing.' },
  ],
  '说道': [
    { cn: '"我们出发吧。"他说道。', en: '"Let\'s set off," he said.' },
    { cn: '老师说道："同学们请安静。"', en: 'The teacher said, "Students, please be quiet."' },
    { cn: '他停了停，然后慢慢说道。', en: 'He paused, then spoke slowly.' },
  ],
  '说干就干': [
    { cn: '他是个说干就干的人。', en: 'He is a man of action who does things without delay.' },
    { cn: '大家决定了就说干就干，马上行动。', en: 'Once everyone decided, they acted right away without delay.' },
    { cn: '这件事不能再拖了，说干就干！', en: 'This can\'t be delayed any longer; let\'s just do it!' },
  ],
  '说谎': [
    { cn: '小孩子不应该养成说谎的习惯。', en: 'Children should not develop a habit of lying.' },
    { cn: '他一说谎脸就红。', en: 'His face turns red whenever he lies.' },
    { cn: '说谎的人最终会失去别人的信任。', en: 'People who lie will eventually lose others\' trust.' },
  ],
  '说老实话': [
    { cn: '说老实话，我觉得这个方案不太可行。', en: 'To be honest, I don\'t think this plan is very feasible.' },
    { cn: '说老实话，我更喜欢待在家里。', en: 'Honestly, I prefer staying at home.' },
    { cn: '说老实话，他的表现让我很失望。', en: 'To tell the truth, his performance was very disappointing.' },
  ],
  '说起来': [
    { cn: '说起来，我们已经十年没见了。', en: 'Come to think of it, we haven\'t seen each other for ten years.' },
    { cn: '说起来容易做起来难。', en: 'It\'s easier said than done.' },
    { cn: '说起来，这件事还得从头说起。', en: 'Speaking of which, this matter has to be told from the beginning.' },
  ],
  '说情': [
    { cn: '他请朋友帮忙去领导那里说情。', en: 'He asked a friend to intercede with the boss on his behalf.' },
    { cn: '这件事谁来说情都没用。', en: 'No matter who pleads on his behalf, it won\'t help.' },
    { cn: '她不想让别人替自己说情。', en: 'She doesn\'t want others to plead on her behalf.' },
  ],
  '说闲话': [
    { cn: '她们总是在背后说闲话。', en: 'They always gossip behind people\'s backs.' },
    { cn: '别在上班时间说闲话了。', en: 'Stop chatting during work hours.' },
    { cn: '邻居们聚在一起说闲话。', en: 'The neighbors gathered together to gossip.' },
  ],
  '说真的': [
    { cn: '说真的，我很欣赏你的勇气。', en: 'Honestly, I really admire your courage.' },
    { cn: '说真的，这道菜太好吃了。', en: 'To tell the truth, this dish is really delicious.' },
    { cn: '说真的，我从来没想过会来到这里。', en: 'Honestly, I never thought I would end up here.' },
  ],
  '硕果': [
    { cn: '经过多年努力，他终于取得了硕果。', en: 'After years of effort, he finally achieved great results.' },
    { cn: '这个实验室在科研方面取得了丰硕的硕果。', en: 'This laboratory has achieved fruitful results in scientific research.' },
    { cn: '他是这个领域仅存的硕果。', en: 'He is one of the few remaining achievements in this field.' },
  ],
  '丝': [
    { cn: '天空中飘着几丝白云。', en: 'A few wisps of white clouds drifted across the sky.' },
    { cn: '这种面料是纯丝制成的。', en: 'This fabric is made of pure silk.' },
    { cn: '她把土豆切成了细丝。', en: 'She cut the potatoes into thin shreds.' },
  ],
  '丝绸': [
    { cn: '中国是丝绸的发源地。', en: 'China is the birthplace of silk.' },
    { cn: '她穿了一件丝绸连衣裙。', en: 'She wore a silk dress.' },
    { cn: '古代的丝绸之路连接了东西方。', en: 'The ancient Silk Road connected the East and the West.' },
  ],
  '丝毫': [
    { cn: '他对这件事丝毫不感兴趣。', en: 'He is not the slightest bit interested in this matter.' },
    { cn: '手术非常成功，丝毫没有差错。', en: 'The surgery was very successful, without the slightest error.' },
    { cn: '她丝毫不在意别人的看法。', en: 'She doesn\'t care in the least about what others think.' },
  ],
  '司法': [
    { cn: '司法独立是法治社会的基石。', en: 'Judicial independence is the cornerstone of a society ruled by law.' },
    { cn: '他在司法部门工作了三十年。', en: 'He has worked in the judicial department for thirty years.' },
    { cn: '这个案件引发了对司法公正的讨论。', en: 'This case sparked a discussion about judicial fairness.' },
  ],
  '司空见惯': [
    { cn: '在大城市，加班到深夜已经司空见惯了。', en: 'In big cities, working overtime until late at night is commonplace.' },
    { cn: '这种现象在当地司空见惯。', en: 'This phenomenon is common locally.' },
    { cn: '交通拥堵对上班族来说早已司空见惯。', en: 'Traffic jams have long been a common occurrence for commuters.' },
  ],
  '司令': [
    { cn: '他被任命为战区司令。', en: 'He was appointed as the theater commander.' },
    { cn: '司令下达了作战命令。', en: 'The commanding officer issued the combat orders.' },
    { cn: '总司令视察了前线部队。', en: 'The commander-in-chief inspected the front-line troops.' },
  ],
  '私房钱': [
    { cn: '他偷偷攒了一些私房钱。', en: 'He secretly saved up some private stash money.' },
    { cn: '她发现丈夫藏了不少私房钱。', en: 'She discovered that her husband had hidden quite a bit of secret money.' },
    { cn: '有些人喜欢存私房钱以备不时之需。', en: 'Some people like to keep a secret purse for emergencies.' },
  ],
  '私家车': [
    { cn: '现在越来越多的家庭拥有私家车。', en: 'More and more families now own private cars.' },
    { cn: '他每天开私家车上下班。', en: 'He drives his private car to and from work every day.' },
    { cn: '城市里私家车太多，停车位很难找。', en: 'There are too many private cars in the city, and parking spots are hard to find.' },
  ],
  '私立': [
    { cn: '她把孩子送到了一所私立学校。', en: 'She sent her child to a private school.' },
    { cn: '私立医院的收费通常比较高。', en: 'Private hospitals usually charge higher fees.' },
    { cn: '这是一所有名的私立大学。', en: 'This is a well-known private university.' },
  ],
  '私事': [
    { cn: '上班时间不要处理私事。', en: 'Don\'t handle personal matters during work hours.' },
    { cn: '这是我的私事，不用你操心。', en: 'This is my personal matter; you don\'t need to worry about it.' },
    { cn: '他向经理请假处理私事。', en: 'He asked the manager for leave to handle personal matters.' },
  ],
  '私下': [
    { cn: '他们私下达成了协议。', en: 'They reached an agreement in private.' },
    { cn: '虽然公开场合很冷漠，但他们私下关系不错。', en: 'Although they seem cold in public, they get along well in private.' },
    { cn: '他私下告诉我了这件事。', en: 'He told me about this matter privately.' },
  ],
  '私营': [
    { cn: '私营企业在国民经济中发挥着重要作用。', en: 'Private enterprises play an important role in the national economy.' },
    { cn: '他经营着一家私营公司。', en: 'He runs a privately-owned company.' },
    { cn: '政府出台了支持私营经济发展的政策。', en: 'The government introduced policies to support the development of the private economy.' },
  ],
  '私有': [
    { cn: '这块土地属于私有财产。', en: 'This land is private property.' },
    { cn: '该公司已经完成了私有化改革。', en: 'The company has completed its privatization reform.' },
    { cn: '私有制是资本主义经济的基础。', en: 'Private ownership is the foundation of the capitalist economy.' },
  ],
  '私自': [
    { cn: '他私自动用了公司的资金。', en: 'He used company funds without authorization.' },
    { cn: '员工不得私自将公司资料带出办公室。', en: 'Employees are not allowed to take company materials out of the office without permission.' },
    { cn: '孩子私自出门被父母批评了。', en: 'The child was criticized by the parents for going out without permission.' },
  ],
  '思路': [
    { cn: '他的思路很清晰，表达也很有条理。', en: 'His line of thinking is very clear, and his expression is well-organized.' },
    { cn: '换个思路想想，也许会有新的发现。', en: 'Try a different approach; maybe you\'ll make new discoveries.' },
    { cn: '写论文之前，先理清思路。', en: 'Before writing the paper, first clarify your thinking.' },
  ],
  '思念': [
    { cn: '他在国外时非常思念家人。', en: 'He missed his family very much when he was abroad.' },
    { cn: '对故乡的思念常常涌上心头。', en: 'The longing for his hometown often wells up in his heart.' },
    { cn: '每到中秋节，思念之情格外浓烈。', en: 'Every Mid-Autumn Festival, feelings of missing loved ones are especially intense.' },
  ],
  '思前想后': [
    { cn: '他思前想后，最终决定辞职。', en: 'After thinking it over thoroughly, he finally decided to resign.' },
    { cn: '思前想后，她觉得还是应该道歉。', en: 'After much deliberation, she felt she should apologize.' },
    { cn: '别思前想后了，赶快做决定吧。', en: 'Stop mulling it over and make a decision quickly.' },
  ],
  '思索': [
    { cn: '他坐在窗前思索着人生的意义。', en: 'He sat by the window pondering the meaning of life.' },
    { cn: '经过一番深入思索，他找到了问题的答案。', en: 'After deep contemplation, he found the answer to the problem.' },
    { cn: '这个问题值得我们认真思索。', en: 'This question is worth our serious contemplation.' },
  ],
  '撕': [
    { cn: '她气得把信撕成了碎片。', en: 'She was so angry that she tore the letter to pieces.' },
    { cn: '请沿虚线撕开包装。', en: 'Please tear open the packaging along the dotted line.' },
    { cn: '他不小心把书页撕坏了。', en: 'He accidentally tore a page of the book.' },
  ],
  '死心': [
    { cn: '他还不死心，想再试一次。', en: 'He hasn\'t given up and wants to try again.' },
    { cn: '看到那个结果，她终于死心了。', en: 'After seeing that result, she finally gave up.' },
    { cn: '你就死心吧，这件事不会改变了。', en: 'Just give up; this matter won\'t change.' },
  ],
  '死心塌地': [
    { cn: '她死心塌地地跟着他。', en: 'She follows him with unswerving devotion.' },
    { cn: '他死心塌地地要完成这个项目。', en: 'He is dead set on completing this project.' },
    { cn: '这个人怎么就死心塌地地相信骗子呢？', en: 'Why is this person so completely taken in by the scammer?' },
  ],
  '四合院': [
    { cn: '北京有很多古老的四合院。', en: 'There are many old courtyard houses in Beijing.' },
    { cn: '他们一家住在一座传统的四合院里。', en: 'Their family lives in a traditional courtyard house.' },
    { cn: '很多四合院现在已经被改造成了旅游景点。', en: 'Many courtyard houses have now been converted into tourist attractions.' },
  ],
  '四季': [
    { cn: '昆明四季如春，气候宜人。', en: 'Kunming has spring-like weather all year round with a pleasant climate.' },
    { cn: '一年四季他都坚持锻炼。', en: 'He exercises consistently through all four seasons.' },
    { cn: '这种植物四季常绿。', en: 'This plant stays green all year round.' },
  ],
  '四面八方': [
    { cn: '人们从四面八方赶来参加庆典。', en: 'People came from all directions to attend the celebration.' },
    { cn: '声音从四面八方传来。', en: 'Sounds came from all around.' },
    { cn: '游客从四面八方涌向这个小镇。', en: 'Tourists poured into this small town from far and near.' },
  ],
  '寺庙': [
    { cn: '山顶有一座古老的寺庙。', en: 'There is an ancient temple at the top of the mountain.' },
    { cn: '每逢初一十五，很多人去寺庙烧香。', en: 'On the first and fifteenth of the lunar month, many people go to temples to burn incense.' },
    { cn: '这座寺庙已有上千年的历史。', en: 'This temple has a history of over a thousand years.' },
  ],
  '饲料': [
    { cn: '这种饲料含有丰富的蛋白质。', en: 'This feed is rich in protein.' },
    { cn: '农民用玉米做牲畜的饲料。', en: 'Farmers use corn as livestock feed.' },
    { cn: '有机饲料的价格比普通饲料贵。', en: 'Organic feed is more expensive than regular feed.' },
  ],
  '饲养': [
    { cn: '他在农场饲养了一百多头牛。', en: 'He raises over a hundred cattle on the farm.' },
    { cn: '饲养宠物需要耐心和爱心。', en: 'Raising pets requires patience and love.' },
    { cn: '这种动物不适合人工饲养。', en: 'This animal is not suitable for artificial rearing.' },
  ],
  '松绑': [
    { cn: '警方把嫌疑人带回后才松绑。', en: 'The police didn\'t untie the suspect until after bringing him back.' },
    { cn: '政府对中小企业进行了政策松绑。', en: 'The government eased policy restrictions on small and medium enterprises.' },
    { cn: '房地产市场有松绑的迹象。', en: 'There are signs of easing restrictions in the real estate market.' },
  ],
  '松弛': [
    { cn: '做瑜伽可以让身体得到松弛。', en: 'Doing yoga can help the body relax.' },
    { cn: '安全管理不能有丝毫松弛。', en: 'Safety management cannot be lax in the slightest.' },
    { cn: '他的表情很松弛，看起来很放松。', en: 'His expression was relaxed and he looked at ease.' },
  ],
  '耸立': [
    { cn: '一座高楼大厦耸立在城市中心。', en: 'A tall building stands towering in the city center.' },
    { cn: '远处的山峰巍然耸立。', en: 'Distant mountain peaks stand tall and majestic.' },
    { cn: '纪念碑耸立在广场中央。', en: 'A monument towers in the center of the square.' },
  ],
  '送别': [
    { cn: '朋友们到机场送别他。', en: 'Friends went to the airport to see him off.' },
    { cn: '送别的场面十分感人。', en: 'The farewell scene was very touching.' },
    { cn: '李白写了很多送别诗。', en: 'Li Bai wrote many farewell poems.' },
  ],
  '搜查': [
    { cn: '警方对嫌疑人的住所进行了搜查。', en: 'The police searched the suspect\'s residence.' },
    { cn: '海关对入境旅客的行李进行搜查。', en: 'Customs searched the luggage of incoming passengers.' },
    { cn: '搜查行动持续了整整一天。', en: 'The search operation lasted a whole day.' },
  ],
  '搜集': [
    { cn: '他花了很长时间搜集相关资料。', en: 'He spent a long time collecting relevant materials.' },
    { cn: '科学家们在野外搜集标本。', en: 'Scientists collect specimens in the field.' },
    { cn: '律师正在搜集有利于当事人的证据。', en: 'The lawyer is gathering evidence favorable to the client.' },
  ],
  '搜救': [
    { cn: '搜救队伍已经出发前往灾区。', en: 'The search and rescue team has set out for the disaster area.' },
    { cn: '搜救工作在恶劣天气下仍在继续。', en: 'Search and rescue work continues despite the bad weather.' },
    { cn: '消防员展开了紧急搜救行动。', en: 'Firefighters launched an emergency search and rescue operation.' },
  ],
  '搜寻': [
    { cn: '他们在森林中搜寻失踪的登山者。', en: 'They searched the forest for the missing climber.' },
    { cn: '警方正在全城搜寻嫌疑犯。', en: 'Police are searching the entire city for the suspect.' },
    { cn: '考古学家在沙漠中搜寻古代遗迹。', en: 'Archaeologists are searching the desert for ancient ruins.' },
  ],
  '艘': [
    { cn: '港口停泊着几十艘渔船。', en: 'Dozens of fishing boats are moored in the harbor.' },
    { cn: '一艘巨大的邮轮缓缓驶入港口。', en: 'A huge cruise ship slowly sailed into the port.' },
    { cn: '海军派出了三艘军舰。', en: 'The navy dispatched three warships.' },
  ],
  '苏醒': [
    { cn: '病人在昏迷三天后终于苏醒了。', en: 'The patient finally regained consciousness after three days in a coma.' },
    { cn: '春天来了，大地从沉睡中苏醒。', en: 'Spring has come, and the earth awakens from its slumber.' },
    { cn: '他被冷水泼醒后慢慢苏醒过来。', en: 'After being splashed with cold water, he slowly came to.' },
  ],
  '酥': [
    { cn: '这块饼干又酥又脆，非常好吃。', en: 'This biscuit is flaky and crispy, very tasty.' },
    { cn: '她的腿酥了，走不动了。', en: 'Her legs went weak and she couldn\'t walk anymore.' },
    { cn: '桃酥是一种传统的中式糕点。', en: 'Peach pastry is a traditional Chinese baked good.' },
  ],
  '俗': [
    { cn: '这首歌的歌词太俗了。', en: 'The lyrics of this song are too vulgar.' },
    { cn: '入乡随俗是旅行的基本礼貌。', en: 'Following local customs is basic travel etiquette.' },
    { cn: '他的画作虽然通俗，但不落俗套。', en: 'His paintings are popular but not trite.' },
  ],
  '俗话': [
    { cn: '俗话说得好，"早起的鸟儿有虫吃。"', en: 'As the saying goes, "The early bird catches the worm."' },
    { cn: '这句俗话在民间流传已久。', en: 'This proverb has been circulating among the people for a long time.' },
    { cn: '俗话里包含着很多生活智慧。', en: 'Common sayings contain a lot of life wisdom.' },
  ],
  '俗话说': [
    { cn: '俗话说，"活到老，学到老。"', en: 'As they say, "You\'re never too old to learn."' },
    { cn: '俗话说得好，"三个臭皮匠，顶个诸葛亮。"', en: 'As the saying goes, "Three cobblers combined are a match for Zhuge Liang."' },
    { cn: '俗话说，"远亲不如近邻。"', en: 'As they say, "A distant relative is not as helpful as a close neighbor."' },
  ],
  '俗语': [
    { cn: '中国有很多有趣的俗语。', en: 'China has many interesting proverbs.' },
    { cn: '这句俗语在当地很流行。', en: 'This proverb is very popular locally.' },
    { cn: '老师用一句俗语总结了今天的课。', en: 'The teacher summarized today\'s lesson with a proverb.' },
  ],
  '素': [
    { cn: '她已经吃素好几年了。', en: 'She has been vegetarian for several years.' },
    { cn: '他向来以素雅著称。', en: 'He has always been known for his plain elegance.' },
    { cn: '这道菜是素的，没有放肉。', en: 'This dish is vegetarian; no meat was added.' },
  ],
  '素不相识': [
    { cn: '他们素不相识，却在困难时互相帮助。', en: 'They were total strangers, yet they helped each other in times of difficulty.' },
    { cn: '一个素不相识的人主动帮她提行李。', en: 'A total stranger offered to carry her luggage.' },
    { cn: '虽然素不相识，但大家都为灾区捐款。', en: 'Although they are strangers, everyone donated money for the disaster area.' },
  ],
  '素材': [
    { cn: '生活是文学创作最好的素材。', en: 'Life is the best source material for literary creation.' },
    { cn: '他到乡下去搜集写作素材。', en: 'He went to the countryside to collect writing material.' },
    { cn: '网上有很多免费的设计素材。', en: 'There are many free design materials online.' },
  ],
  '素描': [
    { cn: '她从小学习素描，画得很好。', en: 'She has been learning to sketch since childhood and draws very well.' },
    { cn: '老师让学生们先画一幅素描。', en: 'The teacher asked the students to draw a sketch first.' },
    { cn: '素描是绑定绑定绘画的基础。', en: 'Sketching is the foundation of painting.' },
  ],
  '素食': [
    { cn: '这家餐厅只提供素食。', en: 'This restaurant only serves vegetarian food.' },
    { cn: '越来越多的人开始选择素食。', en: 'More and more people are choosing a vegetarian diet.' },
    { cn: '素食对身体健康有很多好处。', en: 'A vegetarian diet has many health benefits.' },
  ],
  '素养': [
    { cn: '提高公民素养是社会进步的标志。', en: 'Raising citizens\' personal cultivation is a sign of social progress.' },
    { cn: '他的音乐素养很高。', en: 'He has a high level of musical cultivation.' },
    { cn: '良好的职业素养是成功的基础。', en: 'Good professional competence is the foundation of success.' },
  ],
  '塑造': [
    { cn: '这部小说成功地塑造了几个鲜明的人物。', en: 'This novel successfully portrayed several vivid characters.' },
    { cn: '教育对塑造孩子的性格至关重要。', en: 'Education is crucial in shaping a child\'s character.' },
    { cn: '公司正在努力塑造新的品牌形象。', en: 'The company is working hard to create a new brand image.' },
  ],
  '诉苦': [
    { cn: '她经常向朋友诉苦。', en: 'She often complains to her friends.' },
    { cn: '他从不向别人诉苦。', en: 'He never complains to others.' },
    { cn: '员工向领导诉苦，反映工作条件太差。', en: 'The employee complained to the manager about the poor working conditions.' },
  ],
  '诉说': [
    { cn: '她含泪诉说了自己的遭遇。', en: 'She tearfully recounted her experience.' },
    { cn: '老房子无声地诉说着过去的故事。', en: 'The old house silently tells stories of the past.' },
    { cn: '他向医生诉说了自己的病情。', en: 'He told the doctor about his condition.' },
  ],
  '诉讼': [
    { cn: '他决定提起诉讼维护自己的权益。', en: 'He decided to file a lawsuit to protect his rights.' },
    { cn: '这场诉讼持续了两年之久。', en: 'This lawsuit lasted for two years.' },
    { cn: '律师建议通过诉讼解决争端。', en: 'The lawyer suggested resolving the dispute through litigation.' },
  ],
  '蒜': [
    { cn: '做这道菜需要放几瓣蒜。', en: 'This dish requires a few cloves of garlic.' },
    { cn: '他不喜欢蒜的味道。', en: 'He doesn\'t like the taste of garlic.' },
    { cn: '蒜有杀菌的作用。', en: 'Garlic has antibacterial properties.' },
  ],
  '算计': [
    { cn: '他在心里算计着这笔买卖的利润。', en: 'He was calculating the profit of this deal in his mind.' },
    { cn: '做人不要总是算计别人。', en: 'Don\'t always scheme against others.' },
    { cn: '他算计好了每一步该怎么走。', en: 'He planned out every step carefully.' },
  ],
  '算盘': [
    { cn: '爷爷教我怎么用算盘。', en: 'Grandfather taught me how to use an abacus.' },
    { cn: '他心里打着自己的小算盘。', en: 'He has his own little scheme in mind.' },
    { cn: '算盘是中国古代的计算工具。', en: 'The abacus is an ancient Chinese computing tool.' },
  ],
  '算账': [
    { cn: '年底了，会计正在算账。', en: 'It\'s the end of the year, and the accountant is balancing the books.' },
    { cn: '你等着，以后再跟你算账！', en: 'Just wait; I\'ll settle the score with you later!' },
    { cn: '他把这笔债记在心里，迟早要算账。', en: 'He kept this debt in mind and will settle accounts sooner or later.' },
  ],
  '虽说': [
    { cn: '虽说天气不好，但我们还是出发了。', en: 'Although the weather was bad, we still set off.' },
    { cn: '虽说价格贵了点，质量确实很好。', en: 'Though the price is a bit high, the quality is indeed very good.' },
    { cn: '虽说他年纪大了，精力依然充沛。', en: 'Though he is getting old, his energy is still abundant.' },
  ],
  '随处可见': [
    { cn: '春天到了，街头随处可见盛开的花朵。', en: 'Spring has arrived, and blooming flowers can be seen everywhere on the streets.' },
    { cn: '在日本，自动售货机随处可见。', en: 'In Japan, vending machines can be seen everywhere.' },
    { cn: '这种鸟在南方随处可见。', en: 'This type of bird can be seen everywhere in the south.' },
  ],
  '随大溜': [
    { cn: '他不喜欢随大溜，总有自己的想法。', en: 'He doesn\'t like following the crowd and always has his own ideas.' },
    { cn: '别总是随大溜，要有自己的判断。', en: 'Don\'t always go with the flow; have your own judgment.' },
    { cn: '很多人买房只是随大溜。', en: 'Many people buy houses just to follow the crowd.' },
  ],
  '随机': [
    { cn: '电脑随机生成了一组密码。', en: 'The computer randomly generated a set of passwords.' },
    { cn: '面对突发情况，要学会随机应变。', en: 'When facing unexpected situations, learn to adapt accordingly.' },
    { cn: '问卷调查采用了随机抽样的方法。', en: 'The survey used a random sampling method.' },
  ],
  '随即': [
    { cn: '他听到消息后随即赶了过来。', en: 'He came over immediately after hearing the news.' },
    { cn: '会议结束后，总经理随即召开了紧急会议。', en: 'After the meeting ended, the general manager immediately convened an emergency meeting.' },
    { cn: '警报响起，人们随即撤离了大楼。', en: 'The alarm sounded, and people immediately evacuated the building.' },
  ],
  '随身': [
    { cn: '旅行时请保管好随身物品。', en: 'Please take care of your personal belongings while traveling.' },
    { cn: '他总是随身携带一本笔记本。', en: 'He always carries a notebook on his person.' },
    { cn: '乘飞机时随身行李不能超过限定重量。', en: 'Carry-on luggage cannot exceed the weight limit when flying.' },
  ],
  '随时随地': [
    { cn: '有了手机，我们随时随地都能上网。', en: 'With smartphones, we can go online anytime and anywhere.' },
    { cn: '他随时随地都在学习。', en: 'He studies anytime and anywhere.' },
    { cn: '如果有任何问题，随时随地可以联系我。', en: 'If you have any questions, you can contact me anytime, anywhere.' },
  ],
  '随心所欲': [
    { cn: '退休以后，他终于可以随心所欲地生活了。', en: 'After retirement, he can finally live as he pleases.' },
    { cn: '人不能随心所欲，要考虑他人的感受。', en: 'One can\'t do as one pleases; one must consider others\' feelings.' },
    { cn: '这位画家的技法已经到了随心所欲的境界。', en: 'This painter\'s technique has reached a level of complete freedom.' },
  ],
  '遂心': [
    { cn: '事情的发展并不遂心。', en: 'Things did not develop to one\'s liking.' },
    { cn: '祝你万事遂心。', en: 'May everything go as you wish.' },
    { cn: '生活不可能总是遂心如意的。', en: 'Life can\'t always go the way you want it to.' },
  ],
  '隧道': [
    { cn: '火车穿过了一条长长的隧道。', en: 'The train passed through a long tunnel.' },
    { cn: '这条隧道连接了两座城市。', en: 'This tunnel connects two cities.' },
    { cn: '隧道里的灯光很暗。', en: 'The lights in the tunnel are very dim.' },
  ],
  '损': [
    { cn: '他说话太损了，把大家都得罪了。', en: 'He speaks too harshly and offended everyone.' },
    { cn: '这件衣服放久了有些损了。', en: 'This piece of clothing has deteriorated somewhat from being stored too long.' },
    { cn: '别说这么损的话，太伤人了。', en: 'Don\'t say such caustic things; it\'s too hurtful.' },
  ],
  '损坏': [
    { cn: '暴风雨损坏了不少房屋。', en: 'The storm damaged many houses.' },
    { cn: '请勿损坏公共设施。', en: 'Please do not damage public facilities.' },
    { cn: '这些文物因保管不当而损坏了。', en: 'These cultural relics were damaged due to improper storage.' },
  ],
  '损人利己': [
    { cn: '他做了损人利己的事，受到了大家的谴责。', en: 'He did something that benefited himself at others\' expense and was condemned by everyone.' },
    { cn: '损人利己的行为终究会受到惩罚。', en: 'Behavior that harms others for personal gain will eventually be punished.' },
    { cn: '我们要反对损人利己的做法。', en: 'We should oppose practices that benefit oneself at others\' expense.' },
  ],
  '损伤': [
    { cn: '过度运动可能对关节造成损伤。', en: 'Excessive exercise may cause damage to joints.' },
    { cn: '他在事故中脑部受到了损伤。', en: 'He suffered brain damage in the accident.' },
    { cn: '紫外线会损伤皮肤。', en: 'Ultraviolet rays can damage the skin.' },
  ],
  '缩': [
    { cn: '毛衣洗了以后缩了一号。', en: 'The sweater shrank one size after washing.' },
    { cn: '小猫受到惊吓后缩成一团。', en: 'The kitten curled up into a ball after being frightened.' },
    { cn: '公司决定缩小业务规模。', en: 'The company decided to reduce the scale of its operations.' },
  ],
  '缩水': [
    { cn: '这件衣服洗后严重缩水。', en: 'This piece of clothing shrank badly after washing.' },
    { cn: '公司的利润缩水了不少。', en: 'The company\'s profits shrank considerably.' },
    { cn: '他的资产在股市大跌中大幅缩水。', en: 'His assets shrank significantly in the stock market crash.' },
  ],
  '缩影': [
    { cn: '这个小村庄是中国农村发展的缩影。', en: 'This small village is a microcosm of China\'s rural development.' },
    { cn: '他的经历是那个时代的缩影。', en: 'His experience is an epitome of that era.' },
    { cn: '这部纪录片是城市变迁的缩影。', en: 'This documentary is a miniature version of urban transformation.' },
  ],
  '所属': [
    { cn: '请在表格上填写你所属的部门。', en: 'Please fill in the department you belong to on the form.' },
    { cn: '这些士兵归第三军所属。', en: 'These soldiers are under the command of the Third Army.' },
    { cn: '他不清楚自己所属的管辖区域。', en: 'He is not clear about the jurisdiction he belongs to.' },
  ],
  '所谓': [
    { cn: '所谓的"专家"其实什么都不懂。', en: 'The so-called "expert" actually doesn\'t understand anything.' },
    { cn: '所谓成功，就是不断努力。', en: 'What we call success is continuous effort.' },
    { cn: '他所谓的承诺从来没有兑现过。', en: 'His so-called promises have never been fulfilled.' },
  ],
  '所作所为': [
    { cn: '他为自己的所作所为感到后悔。', en: 'He regrets his conduct and deeds.' },
    { cn: '每个人都要为自己的所作所为负责。', en: 'Everyone must be responsible for their own actions.' },
    { cn: '她的所作所为赢得了大家的尊敬。', en: 'Her conduct earned everyone\'s respect.' },
  ],
  '索赔': [
    { cn: '消费者有权向商家索赔。', en: 'Consumers have the right to claim damages from the merchant.' },
    { cn: '保险公司拒绝了他的索赔请求。', en: 'The insurance company rejected his claim for damages.' },
    { cn: '他因产品质量问题向厂家索赔。', en: 'He claimed damages from the manufacturer due to product quality issues.' },
  ],
  '索取': [
    { cn: '他从不向别人索取什么。', en: 'He never demands anything from others.' },
    { cn: '你可以到前台索取免费的地图。', en: 'You can get a free map at the front desk.' },
    { cn: '对自然只知索取，不知回报，最终会付出代价。', en: 'Only taking from nature without giving back will eventually have consequences.' },
  ],
  '索性': [
    { cn: '既然来都来了，索性多玩几天。', en: 'Since we\'re already here, we might as well stay a few more days.' },
    { cn: '下雨了，索性不出门了。', en: 'It\'s raining; I might as well not go out.' },
    { cn: '反正睡不着，索性起来看书。', en: 'Since I can\'t sleep anyway, I might as well get up and read.' },
  ],
  '锁定': [
    { cn: '警方已经锁定了犯罪嫌疑人。', en: 'The police have identified the criminal suspect.' },
    { cn: '请记得在离开时锁定电脑屏幕。', en: 'Please remember to lock your computer screen when you leave.' },
    { cn: '公司锁定了三个潜在的合作伙伴。', en: 'The company has targeted three potential partners.' },
  ],
  '他人': [
    { cn: '我们应该尊重他人的隐私。', en: 'We should respect other people\'s privacy.' },
    { cn: '帮助他人也是在帮助自己。', en: 'Helping others is also helping yourself.' },
    { cn: '不要把自己的快乐建立在他人的痛苦之上。', en: 'Don\'t build your happiness on others\' suffering.' },
  ],
  '塌': [
    { cn: '年久失修的老房子塌了。', en: 'The old house that had been neglected for years collapsed.' },
    { cn: '大雨导致了山体塌方。', en: 'Heavy rain caused a landslide.' },
    { cn: '桥梁因为洪水的冲击而塌了。', en: 'The bridge collapsed due to the impact of the flood.' },
  ],
  '拓宽': [
    { cn: '政府计划拓宽这条主干道。', en: 'The government plans to widen this main road.' },
    { cn: '旅行可以拓宽我们的视野。', en: 'Travel can broaden our horizons.' },
    { cn: '他正在努力拓宽自己的知识面。', en: 'He is working hard to broaden his knowledge base.' },
  ],
  '拓展': [
    { cn: '公司正在积极拓展海外市场。', en: 'The company is actively expanding its overseas market.' },
    { cn: '学习新技能可以拓展职业发展空间。', en: 'Learning new skills can expand career development opportunities.' },
    { cn: '这家企业不断拓展业务范围。', en: 'This enterprise continuously expands the scope of its business.' },
  ],
  '踏上': [
    { cn: '他踏上了通往成功的道路。', en: 'He set foot on the road to success.' },
    { cn: '终于踏上了故乡的土地。', en: 'He finally set foot on the soil of his hometown.' },
    { cn: '年轻人踏上了求学的旅程。', en: 'The young person embarked on the journey of education.' },
  ],
  '胎': [
    { cn: '她怀的是第一胎。', en: 'She is pregnant with her first child.' },
    { cn: '这只母猫一胎生了五只小猫。', en: 'This mother cat gave birth to five kittens in one litter.' },
    { cn: '汽车轮胎爆了，需要更换。', en: 'The car tire blew out and needs to be replaced.' },
  ],
  '胎儿': [
    { cn: '医生通过B超检查胎儿的发育情况。', en: 'The doctor checks the fetus\'s development through an ultrasound.' },
    { cn: '孕妇应该注意胎儿的健康。', en: 'Pregnant women should pay attention to the health of the fetus.' },
    { cn: '胎儿已经六个月了。', en: 'The fetus is already six months old.' },
  ],
  '台球': [
    { cn: '他们周末经常去打台球。', en: 'They often go play billiards on weekends.' },
    { cn: '台球是一项需要精准度的运动。', en: 'Billiards is a sport that requires precision.' },
    { cn: '这家酒吧里有两张台球桌。', en: 'There are two billiard tables in this bar.' },
  ],
  '太极': [
    { cn: '太极是中国传统文化的重要组成部分。', en: 'Tai chi is an important part of traditional Chinese culture.' },
    { cn: '老人每天早上在公园里练太极。', en: 'The elderly practice tai chi in the park every morning.' },
    { cn: '太极哲学强调阴阳平衡。', en: 'Tai chi philosophy emphasizes the balance of yin and yang.' },
  ],
  '太极拳': [
    { cn: '太极拳有助于强身健体。', en: 'Tai chi is beneficial for strengthening the body.' },
    { cn: '他从小就跟爷爷学太极拳。', en: 'He has been learning tai chi from his grandfather since childhood.' },
    { cn: '太极拳的动作看似缓慢，却蕴含力量。', en: 'The movements of tai chi appear slow but contain great power.' },
  ],
  '太平': [
    { cn: '人民渴望过上太平的日子。', en: 'The people yearn for peaceful days.' },
    { cn: '国泰民安，天下太平。', en: 'The country is prosperous and the people are at peace.' },
    { cn: '这个小镇一直都很太平。', en: 'This small town has always been peaceful and safe.' },
  ],
  '泰斗': [
    { cn: '他是中国文学界的泰斗。', en: 'He is a leading authority in Chinese literary circles.' },
    { cn: '这位教授被公认为该领域的泰斗。', en: 'This professor is widely recognized as a doyen in the field.' },
    { cn: '作为医学泰斗，他的意见很有权威性。', en: 'As a leading medical authority, his opinions carry great weight.' },
  ],
  '贪': [
    { cn: '做人不能太贪。', en: 'One shouldn\'t be too greedy.' },
    { cn: '他因为贪小便宜吃了大亏。', en: 'He suffered a big loss because of his greed for small gains.' },
    { cn: '贪多嚼不烂，做事要专注。', en: 'Biting off more than you can chew won\'t work; focus on what you\'re doing.' },
  ],
  '贪婪': [
    { cn: '贪婪是导致腐败的主要原因。', en: 'Greed is the main cause of corruption.' },
    { cn: '他的眼中充满了贪婪的目光。', en: 'His eyes were full of greedy looks.' },
    { cn: '不要被贪婪蒙蔽了双眼。', en: 'Don\'t let greed blind your eyes.' },
  ],
  '贪玩儿': [
    { cn: '这个孩子太贪玩儿了，不愿意写作业。', en: 'This child is too playful and doesn\'t want to do homework.' },
    { cn: '小时候贪玩儿是正常的。', en: 'It\'s normal to be playful as a child.' },
    { cn: '别太贪玩儿了，考试快到了。', en: 'Don\'t be too playful; the exam is coming soon.' },
  ],
  '贪污': [
    { cn: '那个官员因贪污被判了十年。', en: 'That official was sentenced to ten years for corruption.' },
    { cn: '国家加大了反贪污的力度。', en: 'The country has intensified its anti-corruption efforts.' },
    { cn: '贪污腐败严重损害了政府的公信力。', en: 'Corruption seriously undermines the government\'s credibility.' },
  ],
  '摊': [
    { cn: '路边摆了很多小摊。', en: 'Many small vendor stands were set up along the roadside.' },
    { cn: '他在街头摊了一张地图研究路线。', en: 'He spread out a map on the street to study the route.' },
    { cn: '损失由大家共同来摊。', en: 'The losses will be shared equally among everyone.' },
  ],
  '瘫': [
    { cn: '他累得瘫在沙发上。', en: 'He was so tired that he collapsed on the sofa.' },
    { cn: '车祸导致他双腿瘫了。', en: 'The car accident left his legs paralyzed.' },
    { cn: '听到那个消息后，她整个人都瘫了。', en: 'After hearing the news, she went completely limp.' },
  ],
  '瘫痪': [
    { cn: '他因为意外事故导致下半身瘫痪。', en: 'He became paralyzed from the waist down due to an accident.' },
    { cn: '暴风雪导致整个城市的交通瘫痪。', en: 'The blizzard caused the entire city\'s transportation system to be paralyzed.' },
    { cn: '网络攻击使公司的系统瘫痪了。', en: 'The cyberattack paralyzed the company\'s system.' },
  ],
  '坛': [
    { cn: '文坛上又出了一位新秀。', en: 'A new talent has emerged in the literary world.' },
    { cn: '他在体坛享有盛誉。', en: 'He has a great reputation in the sports world.' },
    { cn: '论坛上有很多有价值的讨论。', en: 'There are many valuable discussions on the forum.' },
  ],
  '谈不上': [
    { cn: '我们的关系谈不上好，也谈不上坏。', en: 'Our relationship can\'t be called good or bad.' },
    { cn: '他的中文水平还谈不上流利。', en: 'His Chinese level can hardly be called fluent.' },
    { cn: '这顿饭谈不上丰盛，但很可口。', en: 'This meal can\'t be called lavish, but it\'s tasty.' },
  ],
  '谈到': [
    { cn: '谈到这个话题，他变得很严肃。', en: 'When speaking about this topic, he became very serious.' },
    { cn: '她每次谈到家人都很开心。', en: 'She is always happy when talking about her family.' },
    { cn: '报告中谈到了几个关键问题。', en: 'The report addressed several key issues.' },
  ],
  '谈论': [
    { cn: '大家都在谈论这部新上映的电影。', en: 'Everyone is talking about this newly released movie.' },
    { cn: '我们不应该在公开场合谈论别人的隐私。', en: 'We shouldn\'t discuss other people\'s privacy in public.' },
    { cn: '同事们经常谈论工作中的问题。', en: 'Colleagues often discuss problems at work.' },
  ],
  '谈起': [
    { cn: '谈起往事，他的眼中充满了感慨。', en: 'When speaking of the past, his eyes were full of emotion.' },
    { cn: '每次谈起自己的孩子，她总是很骄傲。', en: 'She is always proud whenever she talks about her children.' },
    { cn: '谈起这件事，大家都很生气。', en: 'Everyone gets angry when this matter is brought up.' },
  ],
  '痰': [
    { cn: '感冒的时候经常会有痰。', en: 'There is often phlegm when you have a cold.' },
    { cn: '请不要在公共场所随地吐痰。', en: 'Please do not spit phlegm in public places.' },
    { cn: '医生说他的痰里带有血丝。', en: 'The doctor said there were traces of blood in his phlegm.' },
  ],
  '坦白': [
    { cn: '他向警察坦白了自己的罪行。', en: 'He confessed his crimes to the police.' },
    { cn: '坦白说，我不太同意你的看法。', en: 'To be honest, I don\'t quite agree with your view.' },
    { cn: '他是一个坦白直率的人。', en: 'He is an honest and straightforward person.' },
  ],
  '坦诚': [
    { cn: '双方进行了坦诚的对话。', en: 'Both parties had a frank dialogue.' },
    { cn: '我们应该坦诚地面对自己的不足。', en: 'We should candidly face our shortcomings.' },
    { cn: '他的坦诚赢得了大家的好感。', en: 'His candor won everyone\'s favor.' },
  ],
  '坦克': [
    { cn: '坦克是现代陆军的重要装备。', en: 'Tanks are important equipment of modern armies.' },
    { cn: '这种新型坦克的防护能力很强。', en: 'This new type of tank has very strong protective capabilities.' },
    { cn: '博物馆里陈列着一辆二战时期的坦克。', en: 'A World War II-era tank is displayed in the museum.' },
  ],
  '坦率': [
    { cn: '他坦率地表达了自己的意见。', en: 'He frankly expressed his opinions.' },
    { cn: '我很欣赏他坦率的性格。', en: 'I really appreciate his frank personality.' },
    { cn: '坦率地说，这个方案有很多问题。', en: 'Frankly speaking, this plan has many problems.' },
  ],
  '坦然': [
    { cn: '面对失败，他表现得很坦然。', en: 'He appeared calm in the face of failure.' },
    { cn: '她坦然地接受了批评。', en: 'She accepted the criticism calmly.' },
    { cn: '做了正确的事，心里就很坦然。', en: 'Having done the right thing, one feels at ease.' },
  ],
  '毯子': [
    { cn: '冬天的晚上盖一条厚毯子很暖和。', en: 'Covering with a thick blanket on winter nights is very warm.' },
    { cn: '她给宝宝盖上了一条柔软的毯子。', en: 'She covered the baby with a soft blanket.' },
    { cn: '飞机上的乘务员给旅客发毯子。', en: 'The flight attendant distributed blankets to passengers.' },
  ],
  '炭': [
    { cn: '冬天他们用炭火取暖。', en: 'In winter, they use charcoal for heating.' },
    { cn: '烧烤需要先把炭点着。', en: 'For barbecue, you need to light the charcoal first.' },
    { cn: '活性炭可以用来净化水质。', en: 'Activated charcoal can be used to purify water.' },
  ],
  '探': [
    { cn: '他探出头来看了看外面的情况。', en: 'He stuck his head out to see what was going on outside.' },
    { cn: '我们去探一下这个山洞。', en: 'Let\'s go explore this cave.' },
    { cn: '他星期天去医院探了一位老朋友。', en: 'He visited an old friend in the hospital on Sunday.' },
  ],
  '探测': [
    { cn: '科学家用雷达探测地下的矿物资源。', en: 'Scientists use radar to survey underground mineral resources.' },
    { cn: '探测器成功登陆了火星表面。', en: 'The probe successfully landed on the surface of Mars.' },
    { cn: '这种仪器可以探测出空气中的有害气体。', en: 'This instrument can detect harmful gases in the air.' },
  ],
  '探亲': [
    { cn: '他请了假回老家探亲。', en: 'He took leave to go back to his hometown to visit family.' },
    { cn: '春节是中国人探亲的高峰期。', en: 'Spring Festival is the peak period for Chinese people visiting family.' },
    { cn: '她每年都会回乡探亲一次。', en: 'She goes back to her hometown to visit family once a year.' },
  ],
  '探求': [
    { cn: '科学家们一直在探求宇宙的奥秘。', en: 'Scientists have been seeking the mysteries of the universe.' },
    { cn: '他不断探求新的研究方向。', en: 'He constantly pursues new research directions.' },
    { cn: '探求真理是学者的使命。', en: 'Seeking truth is the mission of scholars.' },
  ],
  '探望': [
    { cn: '他周末去医院探望了生病的同事。', en: 'He visited a sick colleague at the hospital on the weekend.' },
    { cn: '朋友们纷纷来探望新生的婴儿。', en: 'Friends came one after another to visit the newborn baby.' },
    { cn: '她每个月都会去养老院探望父母。', en: 'She visits her parents at the nursing home every month.' },
  ],
  '探险': [
    { cn: '他从小就热爱探险。', en: 'He has loved adventure since childhood.' },
    { cn: '探险队在亚马逊丛林中发现了新物种。', en: 'The expedition discovered new species in the Amazon jungle.' },
    { cn: '深海探险需要专业的设备和技术。', en: 'Deep-sea exploration requires professional equipment and technology.' },
  ],
  '碳': [
    { cn: '碳是有机物的基本元素之一。', en: 'Carbon is one of the basic elements of organic matter.' },
    { cn: '减少碳排放是应对气候变化的关键。', en: 'Reducing carbon emissions is key to addressing climate change.' },
    { cn: '钻石的主要成分就是碳。', en: 'The main component of diamonds is carbon.' },
  ],
  '汤圆': [
    { cn: '元宵节吃汤圆象征着团圆。', en: 'Eating glutinous rice balls during the Lantern Festival symbolizes reunion.' },
    { cn: '奶奶包的汤圆最好吃了。', en: 'Grandmother\'s glutinous rice balls are the most delicious.' },
    { cn: '她买了一袋速冻汤圆。', en: 'She bought a bag of frozen glutinous rice balls.' },
  ],
  '堂': [
    { cn: '他们一家人坐在大堂里吃饭。', en: 'Their family sat in the main hall eating.' },
    { cn: '今天下午有两堂课。', en: 'There are two classes this afternoon.' },
    { cn: '他和堂兄长得很像。', en: 'He looks a lot like his paternal cousin.' },
  ],
  '糖果': [
    { cn: '孩子们最喜欢吃糖果了。', en: 'Children love candy the most.' },
    { cn: '万圣节的时候，孩子们会挨家挨户讨糖果。', en: 'During Halloween, children go door to door asking for candy.' },
    { cn: '吃太多糖果对牙齿不好。', en: 'Eating too much candy is bad for your teeth.' },
  ],
  '糖尿病': [
    { cn: '他患有糖尿病，需要每天注射胰岛素。', en: 'He has diabetes and needs daily insulin injections.' },
    { cn: '糖尿病的发病率越来越高。', en: 'The incidence rate of diabetes is getting higher and higher.' },
    { cn: '控制饮食是预防糖尿病的重要手段。', en: 'Controlling diet is an important means of preventing diabetes.' },
  ],
  '倘若': [
    { cn: '倘若明天下雨，活动就取消。', en: 'If it rains tomorrow, the activity will be cancelled.' },
    { cn: '倘若你同意，我们就签合同。', en: 'If you agree, we\'ll sign the contract.' },
    { cn: '倘若没有他的帮助，我不可能成功。', en: 'If it weren\'t for his help, I couldn\'t have succeeded.' },
  ],
  '淌': [
    { cn: '汗水从他的额头上淌了下来。', en: 'Sweat trickled down from his forehead.' },
    { cn: '小溪的水哗哗地淌着。', en: 'The water in the stream flows with a babbling sound.' },
    { cn: '她的眼泪止不住地淌。', en: 'Her tears kept flowing uncontrollably.' },
  ],
  '烫': [
    { cn: '小心，这碗汤很烫！', en: 'Be careful, this soup is very hot!' },
    { cn: '她去理发店烫了个新发型。', en: 'She went to the hair salon to get a new perm.' },
    { cn: '他用熨斗烫平了衬衫。', en: 'He ironed the shirt flat with an iron.' },
  ],
  '掏钱': [
    { cn: '最后还是他掏钱请大家吃了饭。', en: 'In the end, he paid for everyone\'s meal.' },
    { cn: '谁也不愿意掏钱修这条路。', en: 'Nobody wants to pay to repair this road.' },
    { cn: '别让他掏钱了，今天我请客。', en: 'Don\'t let him pay; I\'m treating today.' },
  ],
  '滔滔不绝': [
    { cn: '他说起自己的经历来滔滔不绝。', en: 'He talks endlessly about his experiences.' },
    { cn: '演讲者滔滔不绝地讲了两个小时。', en: 'The speaker talked non-stop for two hours.' },
    { cn: '她滔滔不绝地介绍着当地的美食。', en: 'She went on and on about the local cuisine.' },
  ],
  '逃避': [
    { cn: '逃避问题不是解决问题的办法。', en: 'Avoiding problems is not the way to solve them.' },
    { cn: '他一直在逃避现实。', en: 'He has been evading reality.' },
    { cn: '不要试图逃避责任。', en: 'Don\'t try to shirk responsibility.' },
  ],
  '逃生': [
    { cn: '火灾发生时要迅速找到逃生通道。', en: 'When a fire breaks out, quickly find the escape route.' },
    { cn: '他在地震中幸运地逃生了。', en: 'He was lucky enough to escape in the earthquake.' },
    { cn: '学校定期组织逃生演练。', en: 'The school regularly organizes escape drills.' },
  ],
  '逃亡': [
    { cn: '罪犯在逃亡途中被抓获。', en: 'The criminal was captured while on the run.' },
    { cn: '战争期间，很多人开始了逃亡生活。', en: 'During the war, many people began a life of flight.' },
    { cn: '他逃亡了三年才被抓到。', en: 'He was on the run for three years before being caught.' },
  ],
  '陶瓷': [
    { cn: '景德镇是中国著名的陶瓷产地。', en: 'Jingdezhen is a famous ceramics-producing area in China.' },
    { cn: '这套陶瓷餐具非常精美。', en: 'This set of ceramic tableware is very exquisite.' },
    { cn: '陶瓷艺术有着悠久的历史。', en: 'Ceramic art has a long history.' },
  ],
  '陶冶': [
    { cn: '音乐可以陶冶人的情操。', en: 'Music can cultivate one\'s temperament.' },
    { cn: '读书有助于陶冶性情。', en: 'Reading helps mold one\'s character.' },
    { cn: '大自然能够陶冶人的心灵。', en: 'Nature can nurture the human spirit.' },
  ],
  '陶醉': [
    { cn: '她陶醉在美妙的音乐声中。', en: 'She was enchanted by the beautiful music.' },
    { cn: '他被眼前的美景陶醉了。', en: 'He was intoxicated by the beautiful scenery before him.' },
    { cn: '不要陶醉于过去的成绩。', en: 'Don\'t be intoxicated by past achievements.' },
  ],
  '淘': [
    { cn: '淘米的时候要轻一点。', en: 'Be gentle when washing the rice.' },
    { cn: '她喜欢在网上淘便宜货。', en: 'She likes to hunt for bargains online.' },
    { cn: '经过大浪淘沙，剩下的都是精品。', en: 'After being sifted through waves of competition, what remains is the best.' },
  ],
  '淘气': [
    { cn: '这个小男孩特别淘气。', en: 'This little boy is especially naughty.' },
    { cn: '淘气的猫把花瓶打碎了。', en: 'The mischievous cat broke the vase.' },
    { cn: '小时候淘气的孩子长大后往往很聪明。', en: 'Children who are naughty in childhood often grow up to be smart.' },
  ],
  '淘汰': [
    { cn: '落后的技术终将被淘汰。', en: 'Outdated technology will eventually be phased out.' },
    { cn: '他在第一轮比赛中就被淘汰了。', en: 'He was eliminated in the first round of the competition.' },
    { cn: '市场竞争激烈，很多企业被淘汰了。', en: 'Market competition is fierce, and many enterprises have been weeded out.' },
  ],
  '讨': [
    { cn: '孩子们挨家挨户讨糖吃。', en: 'The children went door to door asking for candy.' },
    { cn: '他欠了人家的钱，被人上门来讨。', en: 'He owed someone money, and the person came to his door to demand it.' },
    { cn: '这件事可有的讨论了。', en: 'There\'s plenty to discuss about this matter.' },
  ],
  '讨好': [
    { cn: '他总是想方设法讨好上司。', en: 'He always tries every way to curry favor with his boss.' },
    { cn: '讨好所有人是不可能的。', en: 'It\'s impossible to please everyone.' },
    { cn: '费了这么大劲也没讨好。', en: 'Despite all the effort, it didn\'t lead to a favorable outcome.' },
  ],
  '讨价还价': [
    { cn: '她在市场上和摊贩讨价还价。', en: 'She haggled with the vendors at the market.' },
    { cn: '这个价格已经很低了，不能再讨价还价了。', en: 'This price is already very low; no more bargaining.' },
    { cn: '买二手车的时候一定要讨价还价。', en: 'You must bargain when buying a used car.' },
  ],
  '讨人喜欢': [
    { cn: '她长得讨人喜欢，性格也好。', en: 'She is attractive and has a nice personality too.' },
    { cn: '这只小狗非常讨人喜欢。', en: 'This little dog is very endearing.' },
    { cn: '他说话做事都很讨人喜欢。', en: 'Everything he says and does is charming.' },
  ],
  '特产': [
    { cn: '他给朋友带了一些家乡的特产。', en: 'He brought some local specialties from his hometown for friends.' },
    { cn: '这个地方的特产是龙井茶。', en: 'The specialty of this place is Longjing tea.' },
    { cn: '旅游景点附近有很多卖特产的商店。', en: 'There are many shops selling local specialties near the tourist attraction.' },
  ],
  '特例': [
    { cn: '这是一个特例，不能作为通用标准。', en: 'This is a special case and cannot serve as a universal standard.' },
    { cn: '他的情况属于特例，需要特殊处理。', en: 'His situation is a special case that requires special handling.' },
    { cn: '科学研究不能基于特例下结论。', en: 'Scientific research cannot draw conclusions based on isolated examples.' },
  ],
  '特权': [
    { cn: '法律面前人人平等，没有人享有特权。', en: 'Everyone is equal before the law; no one has privileges.' },
    { cn: '贵宾会员享有优先登机的特权。', en: 'VIP members enjoy the privilege of priority boarding.' },
    { cn: '滥用特权是不可接受的。', en: 'Abuse of privilege is unacceptable.' },
  ],
  '特邀': [
    { cn: '他是这次活动的特邀嘉宾。', en: 'He is a specially invited guest for this event.' },
    { cn: '节目组特邀了一位著名演员参加演出。', en: 'The show team specially invited a famous actor to participate in the performance.' },
    { cn: '这场音乐会特邀了国际知名指挥家。', en: 'This concert specially invited an internationally renowned conductor.' },
  ],
  '特长': [
    { cn: '她的特长是弹钢琴。', en: 'Her strong point is playing the piano.' },
    { cn: '每个人都应该发挥自己的特长。', en: 'Everyone should make the most of their special abilities.' },
    { cn: '简历上要写清楚自己的特长。', en: 'You should clearly list your strengths on your resume.' },
  ],
  '特制': [
    { cn: '这是一款特制的蛋糕。', en: 'This is a specially made cake.' },
    { cn: '他穿着一件特制的西装。', en: 'He wore a specially made suit.' },
    { cn: '这种特制的材料非常耐用。', en: 'This specially made material is very durable.' },
  ],
  '特质': [
    { cn: '领导者需要具备哪些特质？', en: 'What qualities does a leader need to possess?' },
    { cn: '诚实是他最突出的特质。', en: 'Honesty is his most prominent characteristic.' },
    { cn: '每种文化都有其独特的特质。', en: 'Every culture has its unique qualities.' },
  ],
  '腾': [
    { cn: '请你把这张桌子腾出来。', en: 'Please clear this table.' },
    { cn: '他一下子就腾地站了起来。', en: 'He sprang to his feet in one movement.' },
    { cn: '你能腾出一点时间来帮我吗？', en: 'Can you spare some time to help me?' },
  ],
  '藤椅': [
    { cn: '奶奶喜欢坐在藤椅上晒太阳。', en: 'Grandmother likes to sit in a rattan chair and bask in the sun.' },
    { cn: '阳台上放了一把舒适的藤椅。', en: 'A comfortable rattan chair was placed on the balcony.' },
    { cn: '这把藤椅已经用了很多年了。', en: 'This rattan chair has been in use for many years.' },
  ],
  '剔除': [
    { cn: '我们需要剔除名单上不合格的候选人。', en: 'We need to eliminate unqualified candidates from the list.' },
    { cn: '编辑剔除了文章中多余的段落。', en: 'The editor removed the redundant paragraphs from the article.' },
    { cn: '请把坏掉的水果剔除出去。', en: 'Please remove the bad fruit.' },
  ],
  '梯子': [
    { cn: '他爬上梯子修理屋顶。', en: 'He climbed up the ladder to repair the roof.' },
    { cn: '仓库里有一把很高的梯子。', en: 'There is a tall ladder in the warehouse.' },
    { cn: '请帮我扶一下梯子。', en: 'Please hold the ladder for me.' },
  ],
  '提拔': [
    { cn: '他因表现出色被提拔为经理。', en: 'He was promoted to manager due to his outstanding performance.' },
    { cn: '领导决定提拔年轻人担任重要岗位。', en: 'The leaders decided to promote young people to important positions.' },
    { cn: '他是被前任领导一手提拔起来的。', en: 'He was personally promoted by the former leader.' },
  ],
  '提防': [
    { cn: '出门在外要提防小偷。', en: 'Be on guard against pickpockets when you\'re out.' },
    { cn: '你要提防那个人，他不值得信任。', en: 'You should watch out for that person; he\'s not trustworthy.' },
    { cn: '她提防着周围任何可疑的动静。', en: 'She was vigilant about any suspicious movements around her.' },
  ],
  '提炼': [
    { cn: '工厂从矿石中提炼金属。', en: 'The factory extracts metals from ore.' },
    { cn: '作家善于从日常生活中提炼创作灵感。', en: 'Writers are good at distilling creative inspiration from daily life.' },
    { cn: '这种技术可以从海水中提炼出盐分。', en: 'This technology can extract salt from seawater.' },
  ],
  '提名': [
    { cn: '他被提名为最佳导演候选人。', en: 'He was nominated as a candidate for Best Director.' },
    { cn: '这部电影获得了多项奥斯卡提名。', en: 'This film received multiple Oscar nominations.' },
    { cn: '委员会提名她为新任主席。', en: 'The committee nominated her as the new chairperson.' },
  ],
  '提速': [
    { cn: '铁路多次提速，大大缩短了旅行时间。', en: 'Multiple speed increases on the railways have greatly shortened travel time.' },
    { cn: '项目进展太慢，需要提速。', en: 'The project is progressing too slowly and needs to speed up.' },
    { cn: '汽车在高速公路上开始提速。', en: 'The car began to pick up speed on the highway.' },
  ],
  '提心吊胆': [
    { cn: '走夜路时她总是提心吊胆。', en: 'She is always on edge when walking at night.' },
    { cn: '考试还没出成绩，他提心吊胆地等着。', en: 'The exam results haven\'t come out yet; he waits on tenterhooks.' },
    { cn: '一个人住在那么偏僻的地方，让人提心吊胆的。', en: 'Living alone in such a remote place makes people very worried.' },
  ],
  '提议': [
    { cn: '他提议我们去爬山。', en: 'He suggested that we go hiking.' },
    { cn: '她的提议得到了大家的赞同。', en: 'Her proposal was approved by everyone.' },
    { cn: '会议上有人提议修改规章制度。', en: 'At the meeting, someone proposed revising the rules and regulations.' },
  ],
  '提早': [
    { cn: '为了避免迟到，他提早出门了。', en: 'To avoid being late, he left home earlier than planned.' },
    { cn: '公司决定提早完成这个项目。', en: 'The company decided to complete this project ahead of schedule.' },
    { cn: '最好提早预订酒店。', en: 'It\'s better to book the hotel in advance.' },
  ],
  '体谅': [
    { cn: '请体谅他的难处。', en: 'Please show understanding for his difficulties.' },
    { cn: '她很体谅父母的辛苦。', en: 'She is very understanding of her parents\' hard work.' },
    { cn: '互相体谅是维持良好关系的关键。', en: 'Mutual understanding is the key to maintaining good relationships.' },
  ],
  '体面': [
    { cn: '他穿着很体面地出席了宴会。', en: 'He attended the banquet dressed very respectably.' },
    { cn: '她希望能找到一份体面的工作。', en: 'She hopes to find a respectable job.' },
    { cn: '做事要体面，不能丢人现眼。', en: 'Do things with dignity; don\'t embarrass yourself.' },
  ],
  '体能': [
    { cn: '运动员的体能训练很重要。', en: 'Physical training is very important for athletes.' },
    { cn: '他的体能已经跟不上年轻人了。', en: 'His physical capability can no longer keep up with young people.' },
    { cn: '参军前需要通过体能测试。', en: 'You need to pass a physical fitness test before joining the army.' },
  ],
  '体贴': [
    { cn: '她的丈夫非常体贴。', en: 'Her husband is very considerate.' },
    { cn: '他体贴地为妻子披上了外套。', en: 'He considerately draped a coat over his wife.' },
    { cn: '朋友之间需要互相体贴。', en: 'Friends need to be considerate of each other.' },
  ],
  '体温': [
    { cn: '护士给病人量了体温。', en: 'The nurse took the patient\'s temperature.' },
    { cn: '他的体温升到了三十九度。', en: 'His temperature rose to thirty-nine degrees.' },
    { cn: '正常人的体温大约是三十七度。', en: 'A normal person\'s body temperature is about thirty-seven degrees.' },
  ],
  '体系': [
    { cn: '中国已经建立了完善的教育体系。', en: 'China has established a comprehensive education system.' },
    { cn: '这个理论体系非常严密。', en: 'This theoretical system is very rigorous.' },
    { cn: '公司正在构建新的管理体系。', en: 'The company is building a new management system.' },
  ],
  '体制': [
    { cn: '经济体制改革取得了显著成效。', en: 'Economic system reform has achieved remarkable results.' },
    { cn: '他在体制内工作了二十多年。', en: 'He has worked within the system for more than twenty years.' },
    { cn: '这个问题涉及到体制层面的改变。', en: 'This issue involves changes at the institutional level.' },
  ],
  '体质': [
    { cn: '他从小体质就不太好。', en: 'He has had a weak constitution since childhood.' },
    { cn: '经常锻炼可以增强体质。', en: 'Regular exercise can strengthen one\'s constitution.' },
    { cn: '每个人的体质不同，反应也不同。', en: 'Everyone\'s constitution is different, so reactions vary.' },
  ],
  '剃': [
    { cn: '他今天去理发店剃了头。', en: 'He went to the barbershop to get his head shaved today.' },
    { cn: '爷爷每天早上都要剃胡子。', en: 'Grandfather shaves his beard every morning.' },
    { cn: '僧人入寺要剃度出家。', en: 'Monks shave their heads when entering the temple.' },
  ],
  '替换': [
    { cn: '这个零件坏了，需要替换。', en: 'This part is broken and needs to be replaced.' },
    { cn: '教练用新球员替换了受伤的队员。', en: 'The coach substituted the injured player with a new one.' },
    { cn: '可以用牛奶替换水来做这道甜点。', en: 'You can substitute milk for water to make this dessert.' },
  ],
  '替身': [
    { cn: '这个危险镜头用了替身演员。', en: 'A stunt double was used for this dangerous shot.' },
    { cn: '他找了一个替身参加会议。', en: 'He found a stand-in to attend the meeting.' },
    { cn: '皇帝让他的替身出现在公众面前。', en: 'The emperor had his body double appear before the public.' },
  ],
  '天地': [
    { cn: '来到乡村，仿佛进入了一个新天地。', en: 'Coming to the countryside feels like entering a new world.' },
    { cn: '天地之间，人显得那么渺小。', en: 'Between heaven and earth, humans seem so small.' },
    { cn: '他在自己的专业领域闯出了一片天地。', en: 'He has carved out a world for himself in his professional field.' },
  ],
  '天鹅': [
    { cn: '湖面上有几只优雅的天鹅。', en: 'There are several elegant swans on the lake.' },
    { cn: '《天鹅湖》是一部经典的芭蕾舞剧。', en: 'Swan Lake is a classic ballet.' },
    { cn: '天鹅是忠贞爱情的象征。', en: 'Swans are a symbol of faithful love.' },
  ],
  '天分': [
    { cn: '她在音乐方面有很高的天分。', en: 'She has a great natural gift for music.' },
    { cn: '天分固然重要，但努力更不可少。', en: 'Natural talent is important, but effort is even more essential.' },
    { cn: '老师很早就发现了他的绘画天分。', en: 'The teacher discovered his painting talent early on.' },
  ],
  '天赋': [
    { cn: '他有语言天赋，学什么语言都很快。', en: 'He has a gift for languages and picks up any language quickly.' },
    { cn: '天赋加上努力才能取得非凡的成就。', en: 'Talent combined with effort can lead to extraordinary achievements.' },
    { cn: '她的音乐天赋从小就显现出来了。', en: 'Her musical talent was evident from a young age.' },
  ],
  '天经地义': [
    { cn: '尊敬长辈是天经地义的事。', en: 'Respecting one\'s elders is a matter of course.' },
    { cn: '父母养育孩子是天经地义的。', en: 'It is perfectly natural for parents to raise their children.' },
    { cn: '他觉得享受特殊待遇是天经地义的。', en: 'He thinks it is his rightful due to enjoy special treatment.' },
  ],
  '天平': [
    { cn: '用天平可以精确地称量物品的重量。', en: 'A balance can precisely measure the weight of objects.' },
    { cn: '在正义的天平上，法律是公平的。', en: 'On the scales of justice, the law is fair.' },
    { cn: '化学实验室里有一台精密的天平。', en: 'There is a precision balance in the chemistry laboratory.' },
  ],
  '天桥': [
    { cn: '学生们走天桥过马路比较安全。', en: 'It\'s safer for students to cross the road via the overpass.' },
    { cn: '这座天桥连接了两栋商业大楼。', en: 'This pedestrian bridge connects two commercial buildings.' },
    { cn: '新修的天桥大大方便了行人。', en: 'The newly built overpass has greatly facilitated pedestrians.' },
  ],
  '天生': [
    { cn: '她天生丽质，不用化妆就很美。', en: 'She is naturally beautiful and looks lovely without makeup.' },
    { cn: '他天生具有领导才能。', en: 'He has an innate talent for leadership.' },
    { cn: '有些人天生就比较乐观。', en: 'Some people are naturally more optimistic.' },
  ],
  '天使': [
    { cn: '护士被人们称为"白衣天使"。', en: 'Nurses are called "angels in white."' },
    { cn: '她在他心目中就像一个天使。', en: 'She is like an angel in his eyes.' },
    { cn: '这个孩子可爱得像个小天使。', en: 'This child is as cute as a little angel.' },
  ],
  '天线': [
    { cn: '屋顶上竖着一根电视天线。', en: 'A TV antenna stands on the roof.' },
    { cn: '他在政府里有天线，能得到内部消息。', en: 'He has connections in the government and can get inside information.' },
    { cn: '这款手机的天线信号接收很好。', en: 'This phone\'s antenna receives signals very well.' },
  ],
  '天性': [
    { cn: '好奇是人的天性。', en: 'Curiosity is human nature.' },
    { cn: '他天性善良，总是乐于助人。', en: 'He is kind by nature and always willing to help others.' },
    { cn: '孩子爱玩是天性使然。', en: 'Children\'s love of play is in their nature.' },
  ],
  '天长地久': [
    { cn: '祝你们的爱情天长地久。', en: 'May your love last forever.' },
    { cn: '没有什么事情是天长地久的。', en: 'Nothing lasts forever.' },
    { cn: '他们发誓要天长地久在一起。', en: 'They swore to be together for eternity.' },
  ],
  '天主教': [
    { cn: '天主教在欧洲有着深远的影响。', en: 'Catholicism has had a profound influence in Europe.' },
    { cn: '她是一名虔诚的天主教徒。', en: 'She is a devout Catholic.' },
    { cn: '这座教堂是当地天主教活动的中心。', en: 'This church is the center of local Catholic activities.' },
  ],
  '添加': [
    { cn: '请在这道菜里添加一点盐。', en: 'Please add a little salt to this dish.' },
    { cn: '系统支持随时添加新用户。', en: 'The system supports adding new users at any time.' },
    { cn: '这种食品没有添加任何防腐剂。', en: 'This food has no preservatives added.' },
  ],
  '甜美': [
    { cn: '她有一副甜美的嗓音。', en: 'She has a sweet voice.' },
    { cn: '回忆起那段日子，心中涌起一股甜美的感觉。', en: 'Recalling those days, a sweet feeling wells up in my heart.' },
    { cn: '她脸上露出了甜美的微笑。', en: 'A sweet smile appeared on her face.' },
  ],
  '甜蜜': [
    { cn: '他们过着甜蜜的婚后生活。', en: 'They live a happy married life.' },
    { cn: '这是一段甜蜜的回忆。', en: 'This is a sweet memory.' },
    { cn: '情侣们甜蜜地手牵着手散步。', en: 'The couple walked hand in hand sweetly.' },
  ],
  '甜头': [
    { cn: '尝到了甜头之后，他更加努力了。', en: 'After tasting the sweetness of success, he worked even harder.' },
    { cn: '投资股市让他尝到了不少甜头。', en: 'Investing in the stock market has brought him many benefits.' },
    { cn: '要让大家都尝到改革的甜头。', en: 'Everyone should get to taste the benefits of reform.' },
  ],
  '填补': [
    { cn: '这项研究填补了国内在该领域的空白。', en: 'This research fills a gap in the domestic field.' },
    { cn: '公司紧急招聘以填补人员空缺。', en: 'The company urgently recruited to fill personnel vacancies.' },
    { cn: '他的到来填补了团队的不足。', en: 'His arrival filled the gaps in the team.' },
  ],
  '填充': [
    { cn: '枕头里填充的是羽绒。', en: 'The pillow is stuffed with down feathers.' },
    { cn: '工人用水泥填充墙壁上的裂缝。', en: 'Workers filled the cracks in the wall with cement.' },
    { cn: '这个玩偶里面填充了棉花。', en: 'This doll is filled with cotton inside.' },
  ],
  '填写': [
    { cn: '请填写这张申请表。', en: 'Please fill in this application form.' },
    { cn: '他仔细地填写了个人信息。', en: 'He carefully filled in his personal information.' },
    { cn: '在线填写问卷只需要五分钟。', en: 'Filling out the online questionnaire only takes five minutes.' },
  ],
  '舔': [
    { cn: '小狗高兴地舔主人的手。', en: 'The puppy happily licked its owner\'s hand.' },
    { cn: '她舔了舔嘴唇，觉得冰淇淋真好吃。', en: 'She licked her lips, thinking the ice cream was really delicious.' },
    { cn: '猫总是用舌头舔自己的毛。', en: 'Cats always lick their fur with their tongues.' },
  ],
  '挑起': [
    { cn: '他故意挑起了两个部门之间的矛盾。', en: 'He deliberately provoked conflict between the two departments.' },
    { cn: '年轻一代要挑起社会发展的重任。', en: 'The younger generation must take on the heavy responsibility of social development.' },
    { cn: '一些媒体试图挑起公众的愤怒情绪。', en: 'Some media tried to stir up public anger.' },
  ],
  '挑剔': [
    { cn: '她对食物很挑剔。', en: 'She is very picky about food.' },
    { cn: '老板对工作质量非常挑剔。', en: 'The boss is very fussy about work quality.' },
    { cn: '别太挑剔了，这个已经很好了。', en: 'Don\'t be so picky; this is already very good.' },
  ],
  '挑衅': [
    { cn: '他的言行带有明显的挑衅意味。', en: 'His words and actions carried an obvious provocative tone.' },
    { cn: '面对挑衅，我们要保持冷静。', en: 'In the face of provocation, we must remain calm.' },
    { cn: '他们不断地挑衅对方的底线。', en: 'They kept provoking the other side\'s bottom line.' },
  ],
  '条款': [
    { cn: '请仔细阅读合同中的每一条款。', en: 'Please carefully read every clause in the contract.' },
    { cn: '这项条款对双方都有约束力。', en: 'This clause is binding on both parties.' },
    { cn: '律师建议修改其中几个条款。', en: 'The lawyer suggested modifying several clauses.' },
  ],
  '条例': [
    { cn: '新的交通条例开始实施了。', en: 'The new traffic regulations have been implemented.' },
    { cn: '公司制定了严格的安全条例。', en: 'The company has established strict safety regulations.' },
    { cn: '违反条例者将受到处罚。', en: 'Those who violate the regulations will be punished.' },
  ],
  '条约': [
    { cn: '两国签订了和平条约。', en: 'The two countries signed a peace treaty.' },
    { cn: '这项条约对缔约国具有法律效力。', en: 'This treaty has legal force on the signatory countries.' },
    { cn: '他们违反了国际条约的规定。', en: 'They violated the provisions of the international treaty.' },
  ],
  '跳槽': [
    { cn: '他最近打算跳槽到另一家公司。', en: 'He is planning to change jobs to another company recently.' },
    { cn: '频繁跳槽对职业发展不利。', en: 'Frequent job-hopping is detrimental to career development.' },
    { cn: '为了更好的发展机会，她决定跳槽。', en: 'For better development opportunities, she decided to change jobs.' },
  ],
  '跳动': [
    { cn: '他能感觉到心脏剧烈地跳动。', en: 'He could feel his heart beating rapidly.' },
    { cn: '烛光在微风中轻轻跳动。', en: 'The candlelight flickered gently in the breeze.' },
    { cn: '屏幕上的光标不停地跳动。', en: 'The cursor on the screen keeps blinking.' },
  ],
  '跳伞': [
    { cn: '他第一次跳伞时非常紧张。', en: 'He was very nervous when he went parachuting for the first time.' },
    { cn: '跳伞是一项极限运动。', en: 'Skydiving is an extreme sport.' },
    { cn: '飞行员在紧急情况下选择了跳伞。', en: 'The pilot chose to bail out in an emergency.' },
  ],
  '跳跃': [
    { cn: '小鹿在草地上欢快地跳跃。', en: 'The little deer leaped joyfully on the grass.' },
    { cn: '他跳跃着越过了水沟。', en: 'He jumped over the ditch.' },
    { cn: '这首音乐节奏跳跃，充满活力。', en: 'This music has a bouncy rhythm and is full of vitality.' },
  ],
  '帖子': [
    { cn: '他在论坛上发了一个帖子。', en: 'He posted a message on the forum.' },
    { cn: '这个帖子引起了网友的热烈讨论。', en: 'This post sparked heated discussion among netizens.' },
    { cn: '她收到了一张婚礼请帖子。', en: 'She received a wedding invitation card.' },
  ],
  '贴近': [
    { cn: '这部电影的故事非常贴近生活。', en: 'The story of this movie is very close to real life.' },
    { cn: '她贴近他的耳朵低声说了几句话。', en: 'She pressed close to his ear and whispered a few words.' },
    { cn: '产品设计要贴近用户需求。', en: 'Product design should be close to user needs.' },
  ],
  '贴切': [
    { cn: '这个比喻非常贴切。', en: 'This metaphor is very apt.' },
    { cn: '他用了一个贴切的词来形容这种感觉。', en: 'He used a fitting word to describe this feeling.' },
    { cn: '翻译要做到准确贴切。', en: 'Translation should be accurate and fitting.' },
  ],
  '听从': [
    { cn: '他决定听从医生的建议。', en: 'He decided to follow the doctor\'s advice.' },
    { cn: '孩子应该听从父母的教导。', en: 'Children should heed their parents\' guidance.' },
    { cn: '士兵必须听从上级的命令。', en: 'Soldiers must obey their superiors\' orders.' },
  ],
  '听话': [
    { cn: '这个孩子很听话，从不惹麻烦。', en: 'This child is very obedient and never causes trouble.' },
    { cn: '听话的员工更容易得到提升。', en: 'Obedient employees are more likely to get promoted.' },
    { cn: '你要是听话，我就给你买糖吃。', en: 'If you behave, I\'ll buy you candy.' },
  ],
  '停车位': [
    { cn: '这附近很难找到停车位。', en: 'It\'s hard to find a parking spot around here.' },
    { cn: '小区里的停车位不够用了。', en: 'There aren\'t enough parking spaces in the residential complex.' },
    { cn: '他终于在商场找到了一个停车位。', en: 'He finally found a parking space at the mall.' },
  ],
  '停电': [
    { cn: '台风过后整个小区停电了。', en: 'The entire neighborhood had a power outage after the typhoon.' },
    { cn: '停电了，只好点蜡烛照明。', en: 'The power went out, so we had to use candles for light.' },
    { cn: '供电公司通知明天上午停电三小时。', en: 'The power company notified that there will be a three-hour power cut tomorrow morning.' },
  ],
  '停顿': [
    { cn: '他说到一半突然停顿了一下。', en: 'He suddenly paused halfway through speaking.' },
    { cn: '谈判出现了短暂的停顿。', en: 'The negotiations came to a brief halt.' },
    { cn: '项目因资金问题而停顿了。', en: 'The project was halted due to funding issues.' },
  ],
  '停放': [
    { cn: '请把车辆停放在指定区域。', en: 'Please park your vehicle in the designated area.' },
    { cn: '这里不允许停放自行车。', en: 'Parking bicycles here is not allowed.' },
    { cn: '码头上停放着几艘渔船。', en: 'Several fishing boats are moored at the dock.' },
  ],
  '停泊': [
    { cn: '几艘游艇停泊在港湾里。', en: 'Several yachts are anchored in the harbor.' },
    { cn: '轮船在码头停泊了一夜。', en: 'The ship was moored at the dock for a night.' },
    { cn: '这个港口可以停泊大型货轮。', en: 'This port can accommodate large cargo ships.' },
  ],
  '停业': [
    { cn: '这家餐厅因卫生问题被责令停业整顿。', en: 'This restaurant was ordered to cease trading for hygiene violations.' },
    { cn: '受疫情影响，很多商铺不得不停业。', en: 'Due to the pandemic, many shops had to close down.' },
    { cn: '银行周末停业两天。', en: 'The bank closes for two days on weekends.' },
  ],
  '通畅': [
    { cn: '疏通后，道路终于通畅了。', en: 'After clearing, the road was finally unobstructed.' },
    { cn: '他的文章写得非常通畅。', en: 'His article is written very fluently.' },
    { cn: '保持信息通畅对团队很重要。', en: 'Maintaining smooth information flow is important for the team.' },
  ],
  '通车': [
    { cn: '新建的高速公路下月通车。', en: 'The newly built highway will open to traffic next month.' },
    { cn: '这条地铁线终于通车了。', en: 'This subway line has finally opened.' },
    { cn: '这个村子去年才通车，以前只能靠走路。', en: 'This village didn\'t get road access until last year; before that, people could only walk.' },
  ],
  '通风': [
    { cn: '房间要经常通风透气。', en: 'Rooms should be ventilated regularly.' },
    { cn: '有人提前给他通风报信了。', en: 'Someone tipped him off in advance.' },
    { cn: '厨房的通风系统需要检修。', en: 'The kitchen\'s ventilation system needs maintenance.' },
  ],
  '通告': [
    { cn: '学校发布了一份通告。', en: 'The school issued an announcement.' },
    { cn: '物业管理处贴出了停水通告。', en: 'The property management office posted a notice about water stoppage.' },
    { cn: '政府向市民发出了紧急通告。', en: 'The government issued an emergency announcement to citizens.' },
  ],
  '通缉': [
    { cn: '警方对这名在逃犯进行了通缉。', en: 'The police issued a wanted notice for this fugitive.' },
    { cn: '他已经被列入全国通缉名单。', en: 'He has been placed on the national wanted list.' },
    { cn: '通缉令上印着嫌疑人的照片。', en: 'The suspect\'s photo is printed on the wanted poster.' },
  ],
  '通顺': [
    { cn: '这篇作文写得很通顺。', en: 'This essay is written very smoothly.' },
    { cn: '翻译要做到语句通顺。', en: 'Translations should be clear and coherent.' },
    { cn: '她的中文已经说得很通顺了。', en: 'Her Chinese has already become quite fluent.' },
  ],
  '通俗': [
    { cn: '这本科普读物写得很通俗易懂。', en: 'This popular science book is written in a very accessible way.' },
    { cn: '通俗文学拥有广泛的读者群。', en: 'Popular literature has a wide readership.' },
    { cn: '请用通俗的语言解释这个概念。', en: 'Please explain this concept in everyday language.' },
  ],
  '通通': [
    { cn: '旧的东西通通扔掉。', en: 'Throw away all the old stuff.' },
    { cn: '他把桌上的文件通通整理好了。', en: 'He organized all the documents on the desk.' },
    { cn: '这些问题通通需要解决。', en: 'All these problems need to be resolved.' },
  ],
  '通往': [
    { cn: '这条路通往山顶。', en: 'This road leads to the mountaintop.' },
    { cn: '成功没有捷径，只有一条通往成功的路。', en: 'There are no shortcuts to success; there\'s only one road leading there.' },
    { cn: '通往幸福的路并不平坦。', en: 'The road to happiness is not smooth.' },
  ],
  '通宵': [
    { cn: '他为了赶论文通宵没有睡觉。', en: 'He stayed up all night to finish his paper.' },
    { cn: '这家便利店是通宵营业的。', en: 'This convenience store is open all night.' },
    { cn: '学生们在考试前通宵复习。', en: 'Students reviewed throughout the night before the exam.' },
  ],
  '通行证': [
    { cn: '进入这个区域需要通行证。', en: 'A pass is required to enter this area.' },
    { cn: '他办了一张港澳通行证。', en: 'He applied for a Hong Kong and Macau travel permit.' },
    { cn: '没有通行证的人不能进入。', en: 'People without a pass cannot enter.' },
  ],
  '同伴': [
    { cn: '他和旅行同伴走散了。', en: 'He got separated from his travel companion.' },
    { cn: '她是我从小到大的同伴。', en: 'She has been my companion since childhood.' },
    { cn: '登山时一定要和同伴待在一起。', en: 'When climbing, always stay with your companions.' },
  ],
  '同步': [
    { cn: '两台设备的数据已经同步了。', en: 'The data on the two devices has been synchronized.' },
    { cn: '经济发展要和环境保护同步进行。', en: 'Economic development should proceed in step with environmental protection.' },
    { cn: '这部电影将在全球同步上映。', en: 'This film will be released simultaneously worldwide.' },
  ],
  '同等': [
    { cn: '男女应该享有同等的权利。', en: 'Men and women should enjoy equal rights.' },
    { cn: '我们给予每位员工同等的发展机会。', en: 'We give every employee equal development opportunities.' },
    { cn: '在同等条件下，经验丰富的人更有优势。', en: 'Under equal conditions, experienced people have more advantages.' },
  ],
  '同感': [
    { cn: '对于你的看法，我深有同感。', en: 'I deeply share your view.' },
    { cn: '他的发言引起了在场所有人的同感。', en: 'His speech resonated with everyone present.' },
    { cn: '我跟你有同感，这件事确实不公平。', en: 'I feel the same way; this matter is indeed unfair.' },
  ],
  '同伙': [
    { cn: '警察抓住了犯罪嫌疑人和他的同伙。', en: 'The police caught the suspect and his accomplices.' },
    { cn: '他的同伙已经交代了犯罪经过。', en: 'His accomplice has confessed to the crime.' },
    { cn: '这个诈骗团伙的同伙遍布全国。', en: 'This fraud ring\'s accomplices are spread across the country.' },
  ],
  '同类': [
    { cn: '和同类产品相比，我们的更有竞争力。', en: 'Compared with similar products, ours is more competitive.' },
    { cn: '鸟类总是喜欢和同类待在一起。', en: 'Birds always like to stay with their own kind.' },
    { cn: '他在同类研究中首次提出了这个观点。', en: 'He first proposed this viewpoint among similar studies.' },
  ],
  '同盟': [
    { cn: '两国结成了军事同盟。', en: 'The two countries formed a military alliance.' },
    { cn: '他们在商业上建立了战略同盟。', en: 'They established a strategic alliance in business.' },
    { cn: '同盟国在战争中互相支持。', en: 'Allied nations supported each other during the war.' },
  ],
  '同年': [
    { cn: '他们同年出生，同年入学。', en: 'They were born in the same year and started school in the same year.' },
    { cn: '公司成立的同年就实现了盈利。', en: 'The company became profitable the same year it was established.' },
    { cn: '他和我是同年的。', en: 'He is from the same year as me.' },
  ],
  '同人': [
    { cn: '医院的同人都很尊敬他。', en: 'His colleagues at the hospital all respect him.' },
    { cn: '网上有很多同人创作的小说。', en: 'There are many fan fiction novels online.' },
    { cn: '行业同人聚在一起交流经验。', en: 'Professionals in the industry gathered to exchange experiences.' },
  ],
  '同志': [
    { cn: '同志们，加油干！', en: 'Comrades, let\'s work hard!' },
    { cn: '他是一位值得尊敬的老同志。', en: 'He is a respected veteran comrade.' },
    { cn: '革命同志之间的友谊很深厚。', en: 'The friendship among revolutionary comrades runs deep.' },
  ],
  '同舟共济': [
    { cn: '在困难面前，我们要同舟共济。', en: 'In the face of difficulties, we must pull together.' },
    { cn: '团队成员应该同舟共济，共克时艰。', en: 'Team members should work together to overcome hardships.' },
    { cn: '面对自然灾害，全国人民同舟共济。', en: 'In the face of natural disasters, the whole nation joins forces.' },
  ],
  '铜': [
    { cn: '铜是一种重要的工业金属。', en: 'Copper is an important industrial metal.' },
    { cn: '这尊雕像是用铜铸成的。', en: 'This statue is cast in copper.' },
    { cn: '铜的导电性能非常好。', en: 'Copper has excellent electrical conductivity.' },
  ],
  '统筹': [
    { cn: '他负责统筹这次活动的所有安排。', en: 'He is responsible for the overall planning of all arrangements for this event.' },
    { cn: '政府统筹城乡发展。', en: 'The government plans urban and rural development as a whole.' },
    { cn: '项目需要统筹各方面的资源。', en: 'The project needs to coordinate resources from all aspects.' },
  ],
  '统统': [
    { cn: '这些旧书统统捐给图书馆了。', en: 'All these old books were donated to the library.' },
    { cn: '不合格的产品统统退回。', en: 'All unqualified products are to be returned.' },
    { cn: '他把该说的话统统说了出来。', en: 'He said everything that needed to be said.' },
  ],
  '统治': [
    { cn: '这个王朝统治了中国近三百年。', en: 'This dynasty ruled China for nearly three hundred years.' },
    { cn: '人民反对暴力统治。', en: 'The people oppose tyrannical rule.' },
    { cn: '殖民统治给当地人民带来了深重的苦难。', en: 'Colonial rule brought deep suffering to the local people.' },
  ],
  '捅': [
    { cn: '他不小心捅了马蜂窝。', en: 'He accidentally stirred up a hornet\'s nest.' },
    { cn: '谁把这件事捅出去的？', en: 'Who leaked this matter?' },
    { cn: '别拿棍子捅那条蛇。', en: 'Don\'t poke that snake with a stick.' },
  ],
  '桶': [
    { cn: '他提了一桶水来浇花。', en: 'He brought a bucket of water to water the flowers.' },
    { cn: '厨房里有一个垃圾桶。', en: 'There is a trash can in the kitchen.' },
    { cn: '国际石油价格按桶计算。', en: 'International oil prices are calculated per barrel.' },
  ],
  '筒': [
    { cn: '他拿起望远镜的目镜筒对准远方。', en: 'He picked up the eyepiece tube of the telescope and aimed it at the distance.' },
    { cn: '她戴了一双高筒靴。', en: 'She wore a pair of knee-high boots.' },
    { cn: '这个万花筒很好看。', en: 'This kaleidoscope is very pretty.' },
  ],
  '痛心': [
    { cn: '看到文物被破坏，专家感到非常痛心。', en: 'Seeing cultural relics destroyed, the expert felt deeply pained.' },
    { cn: '他对自己犯下的错误深感痛心。', en: 'He felt deeply grieved about the mistakes he made.' },
    { cn: '令人痛心的是，这种现象还在继续。', en: 'What is heartbreaking is that this phenomenon continues.' },
  ],
  '偷看': [
    { cn: '她偷看了他的日记。', en: 'She peeked at his diary.' },
    { cn: '小孩子在门缝里偷看大人聊天。', en: 'The child peeked through the crack in the door to watch the adults chat.' },
    { cn: '考试时不许偷看同学的答案。', en: 'You are not allowed to peek at classmates\' answers during exams.' },
  ],
  '偷窥': [
    { cn: '偷窥他人隐私是违法的。', en: 'Peeping at others\' privacy is illegal.' },
    { cn: '他被发现偷窥邻居。', en: 'He was caught peeping at the neighbor.' },
    { cn: '在网上偷窥别人的私生活是不道德的。', en: 'Snooping on others\' private lives online is unethical.' },
  ],
  '偷懒': [
    { cn: '老板不在的时候，有些人就开始偷懒。', en: 'When the boss is away, some people start slacking off.' },
    { cn: '他偷懒了几天，结果工作堆积如山。', en: 'He was lazy for a few days, and as a result, work piled up.' },
    { cn: '学习不能偷懒，要持之以恒。', en: 'You can\'t be lazy in studying; you must be persistent.' },
  ],
  '头部': [
    { cn: '他在事故中头部受了伤。', en: 'He injured his head in the accident.' },
    { cn: '骑摩托车时要戴头盔保护头部。', en: 'Wear a helmet to protect your head when riding a motorcycle.' },
    { cn: '医生检查了他的头部没有发现异常。', en: 'The doctor examined his head and found nothing abnormal.' },
  ],
  '头顶': [
    { cn: '烈日当空，头顶上火辣辣的。', en: 'The scorching sun was overhead, burning hot on top of the head.' },
    { cn: '他头顶上已经秃了一块。', en: 'He already has a bald spot on top of his head.' },
    { cn: '一只鹰在我们头顶上盘旋。', en: 'An eagle circled above our heads.' },
  ],
  '头号': [
    { cn: '他是全公司公认的头号人才。', en: 'He is recognized as the number one talent in the entire company.' },
    { cn: '恐怖主义是全球的头号威胁。', en: 'Terrorism is the number one threat globally.' },
    { cn: '她是国家队的头号选手。', en: 'She is the top-ranked player on the national team.' },
  ],
  '头条': [
    { cn: '这条新闻登上了今天报纸的头条。', en: 'This news made the headline of today\'s newspaper.' },
    { cn: '明星的绯闻又上了头条。', en: 'The celebrity\'s scandal made headlines again.' },
    { cn: '他每天早上第一件事就是看头条新闻。', en: 'The first thing he does every morning is read the headlines.' },
  ],
  '头头是道': [
    { cn: '他讲起历史来头头是道。', en: 'He speaks about history in a clear and logical way.' },
    { cn: '虽然年纪不大，但分析问题头头是道。', en: 'Although young, he analyzes problems in a clear and logical manner.' },
    { cn: '她对市场的分析头头是道。', en: 'Her analysis of the market is clear and well-reasoned.' },
  ],
  '头衔': [
    { cn: '他拥有教授的头衔。', en: 'He holds the title of professor.' },
    { cn: '头衔并不代表一个人的真正能力。', en: 'A title does not represent a person\'s true ability.' },
    { cn: '她获得了"最佳员工"的头衔。', en: 'She won the title of "Best Employee."' },
  ],
  '头晕': [
    { cn: '她站起来太快，感觉有些头晕。', en: 'She stood up too quickly and felt a bit dizzy.' },
    { cn: '长时间看手机会导致头晕。', en: 'Looking at your phone for too long can cause dizziness.' },
    { cn: '他因为低血糖头晕了好几次。', en: 'He felt dizzy several times due to low blood sugar.' },
  ],
  '投奔': [
    { cn: '战乱时期，他投奔了亲戚家。', en: 'During the war, he sought shelter with relatives.' },
    { cn: '走投无路的人只能投奔他人。', en: 'People with no way out can only seek asylum with others.' },
    { cn: '他辞掉工作，投奔了一家创业公司。', en: 'He quit his job and joined a startup company.' },
  ],
  '投稿': [
    { cn: '她向杂志社投稿了一篇文章。', en: 'She submitted an article to a magazine.' },
    { cn: '欢迎广大读者踊跃投稿。', en: 'We welcome readers to actively submit articles.' },
    { cn: '他的投稿被多家出版社拒绝了。', en: 'His submissions were rejected by multiple publishers.' },
  ],
  '投机': [
    { cn: '他们一见面就觉得很投机。', en: 'They felt a natural rapport as soon as they met.' },
    { cn: '在股市上投机是有风险的。', en: 'Speculating in the stock market is risky.' },
    { cn: '不要做投机取巧的事情。', en: 'Don\'t try to take shortcuts or be opportunistic.' },
  ],
  '投降': [
    { cn: '敌军被迫投降。', en: 'The enemy forces were forced to surrender.' },
    { cn: '面对困难，他绝不投降。', en: 'In the face of difficulty, he will never surrender.' },
    { cn: '将军拒绝了投降的要求。', en: 'The general rejected the demand to surrender.' },
  ],
  '投射': [
    { cn: '阳光透过树叶投射在地面上。', en: 'Sunlight was cast through the leaves onto the ground.' },
    { cn: '探照灯向天空投射出强烈的光柱。', en: 'Searchlights cast powerful beams of light into the sky.' },
    { cn: '他把自己的情感投射到了作品中。', en: 'He projected his emotions into his works.' },
  ],
  '投身': [
    { cn: '她毅然投身公益事业。', en: 'She resolutely threw herself into public welfare work.' },
    { cn: '越来越多的年轻人投身创业。', en: 'More and more young people are throwing themselves into entrepreneurship.' },
    { cn: '他投身科学研究已经二十年了。', en: 'He has devoted himself to scientific research for twenty years.' },
  ],
  '透彻': [
    { cn: '他对这个问题的分析非常透彻。', en: 'His analysis of this issue is very thorough.' },
    { cn: '只有深入学习才能理解得透彻。', en: 'Only through in-depth study can one understand things thoroughly.' },
    { cn: '老师把道理讲得非常透彻。', en: 'The teacher explained the principles very incisively.' },
  ],
  '透过': [
    { cn: '透过窗户可以看到远处的山。', en: 'Through the window, you can see the mountains in the distance.' },
    { cn: '阳光透过云层照射下来。', en: 'Sunlight penetrated through the clouds.' },
    { cn: '透过这件事，我们可以看出他的性格。', en: 'Through this matter, we can see his character.' },
  ],
  '透气': [
    { cn: '这种面料很透气，夏天穿很舒服。', en: 'This fabric is very breathable and comfortable to wear in summer.' },
    { cn: '在办公室待久了，出去透透气。', en: 'After being in the office for a long time, go out for some fresh air.' },
    { cn: '千万别把消息透气出去。', en: 'Don\'t leak the news to anyone.' },
  ],
  '透支': [
    { cn: '他的信用卡已经透支了。', en: 'His credit card is already overdrawn.' },
    { cn: '长期熬夜是在透支健康。', en: 'Staying up late regularly is exhausting one\'s health.' },
    { cn: '公司的资金已经严重透支。', en: 'The company\'s funds are seriously overdrawn.' },
  ],
  '凸': [
    { cn: '这面墙凸出来一块。', en: 'A section of this wall protrudes.' },
    { cn: '凸透镜可以聚集光线。', en: 'A convex lens can focus light.' },
    { cn: '路面有个凸起的部分，开车要小心。', en: 'There\'s a protruding part on the road; drive carefully.' },
  ],
  '凸显': [
    { cn: '这次事件凸显了管理上的漏洞。', en: 'This incident highlighted the loopholes in management.' },
    { cn: '数据凸显了问题的严重性。', en: 'The data clearly shows the severity of the problem.' },
    { cn: '对比之下，他的优势更加凸显。', en: 'In comparison, his advantages become even more prominent.' },
  ],
  '秃': [
    { cn: '他年纪轻轻就秃了。', en: 'He went bald at a young age.' },
    { cn: '铅笔用得太短了，笔尖都秃了。', en: 'The pencil has been used so much that the tip is blunt.' },
    { cn: '冬天的树光秃秃的。', en: 'Trees are bare in winter.' },
  ],
  '突发': [
    { cn: '突发事件需要及时应对。', en: 'Sudden incidents need to be dealt with promptly.' },
    { cn: '他因突发心脏病被送往医院。', en: 'He was rushed to the hospital due to a sudden heart attack.' },
    { cn: '突发暴雨打乱了我们的计划。', en: 'A sudden downpour disrupted our plans.' },
  ],
  '突击': [
    { cn: '特种部队对敌营发动了突击。', en: 'Special forces launched an assault on the enemy camp.' },
    { cn: '考试前一天他开始突击复习。', en: 'He started cramming the day before the exam.' },
    { cn: '警方对犯罪窝点进行了突击检查。', en: 'The police conducted a surprise raid on the criminal hideout.' },
  ],
  '突破口': [
    { cn: '我们终于找到了解决问题的突破口。', en: 'We finally found a breakthrough point for solving the problem.' },
    { cn: '侦探从一个细节找到了案件的突破口。', en: 'The detective found the breakthrough in the case from a detail.' },
    { cn: '科研团队正在寻找技术上的突破口。', en: 'The research team is looking for a technological breakthrough point.' },
  ],
  '突如其来': [
    { cn: '一场突如其来的暴风雨打断了野餐。', en: 'A sudden storm interrupted the picnic.' },
    { cn: '面对突如其来的变故，他显得很镇定。', en: 'Facing the sudden turn of events, he appeared very calm.' },
    { cn: '这个突如其来的消息让所有人震惊。', en: 'This sudden news shocked everyone.' },
  ],
  '图表': [
    { cn: '报告中包含了大量的图表。', en: 'The report contains a large number of charts.' },
    { cn: '用图表展示数据更加直观。', en: 'Displaying data with charts is more intuitive.' },
    { cn: '这张图表清楚地显示了销售趋势。', en: 'This chart clearly shows the sales trend.' },
  ],
  '图像': [
    { cn: '摄像头拍到了清晰的图像。', en: 'The camera captured a clear image.' },
    { cn: '这款软件可以处理各种图像。', en: 'This software can process various images.' },
    { cn: '卫星传回了地球表面的图像。', en: 'The satellite transmitted images of the Earth\'s surface.' },
  ],
  '图形': [
    { cn: '数学课上学习了各种几何图形。', en: 'We learned various geometric shapes in math class.' },
    { cn: '这个设计使用了大量的抽象图形。', en: 'This design uses a lot of abstract shapes.' },
    { cn: '请用尺子画出标准的图形。', en: 'Please use a ruler to draw the standard shapes.' },
  ],
  '图纸': [
    { cn: '建筑师正在审核设计图纸。', en: 'The architect is reviewing the design blueprints.' },
    { cn: '施工必须严格按照图纸进行。', en: 'Construction must strictly follow the blueprints.' },
    { cn: '这套图纸已经经过了多次修改。', en: 'These blueprints have been revised multiple times.' },
  ],
  '徒步': [
    { cn: '他们计划徒步穿越沙漠。', en: 'They plan to cross the desert on foot.' },
    { cn: '徒步旅行是一种很好的锻炼方式。', en: 'Hiking is a great way to exercise.' },
    { cn: '我们徒步走了整整一天。', en: 'We walked on foot for an entire day.' },
  ],
  '屠杀': [
    { cn: '南京大屠杀是人类历史上的悲剧。', en: 'The Nanjing Massacre is a tragedy in human history.' },
    { cn: '我们必须铭记历史，反对屠杀。', en: 'We must remember history and oppose massacres.' },
    { cn: '战争中无辜平民遭到了屠杀。', en: 'Innocent civilians were massacred during the war.' },
  ],
  '土匪': [
    { cn: '过去这个地方经常有土匪出没。', en: 'In the past, bandits often appeared in this area.' },
    { cn: '解放军消灭了山上的土匪。', en: 'The PLA eliminated the bandits in the mountains.' },
    { cn: '那个年代，土匪横行，百姓苦不堪言。', en: 'In that era, bandits ran rampant, and the people suffered terribly.' },
  ],
  '土壤': [
    { cn: '肥沃的土壤有利于农作物生长。', en: 'Fertile soil is conducive to crop growth.' },
    { cn: '工业废水严重污染了土壤。', en: 'Industrial wastewater has seriously polluted the soil.' },
    { cn: '科学家正在研究土壤的成分。', en: 'Scientists are studying the composition of the soil.' },
  ],
  '土生土长': [
    { cn: '他是土生土长的北京人。', en: 'He is a born and bred Beijinger.' },
    { cn: '虽然是土生土长的农村人，但他见识广博。', en: 'Although he grew up locally in the countryside, he is well-informed.' },
    { cn: '她是这个小镇土生土长的居民。', en: 'She is a locally born and bred resident of this town.' },
  ],
  '涂': [
    { cn: '她在脸上涂了一层防晒霜。', en: 'She applied a layer of sunscreen on her face.' },
    { cn: '工人正在给墙壁涂油漆。', en: 'Workers are painting the walls.' },
    { cn: '小孩子在纸上乱涂乱画。', en: 'The child scribbled all over the paper.' },
  ],
  '团伙': [
    { cn: '警方一举捣毁了这个犯罪团伙。', en: 'The police smashed this criminal gang in one fell swoop.' },
    { cn: '诈骗团伙的成员都已被抓获。', en: 'All members of the fraud gang have been arrested.' },
    { cn: '这个走私团伙的活动范围很广。', en: 'This smuggling gang operated over a wide area.' },
  ],
  '团聚': [
    { cn: '春节是全家团聚的时候。', en: 'Spring Festival is a time for family reunions.' },
    { cn: '分别多年后，兄弟俩终于团聚了。', en: 'After years of separation, the two brothers finally reunited.' },
    { cn: '她盼望着和家人团聚的那一天。', en: 'She looks forward to the day she reunites with her family.' },
  ],
  '团员': [
    { cn: '旅行团的团员们在导游的带领下参观博物馆。', en: 'The tour group members visited the museum under the guide\'s leadership.' },
    { cn: '他是共青团的团员。', en: 'He is a member of the Communist Youth League.' },
    { cn: '团员们都按时到达了集合地点。', en: 'All group members arrived at the meeting point on time.' },
  ],
  '团圆': [
    { cn: '中秋节是一个象征团圆的节日。', en: 'The Mid-Autumn Festival is a holiday symbolizing reunion.' },
    { cn: '祝你们一家人永远团圆幸福。', en: 'I wish your family eternal reunion and happiness.' },
    { cn: '经过长期的分离，他们终于团圆了。', en: 'After a long separation, they finally had a reunion.' },
  ],
  '推测': [
    { cn: '根据现有证据，我们推测凶手是本地人。', en: 'Based on the existing evidence, we speculate that the murderer is a local.' },
    { cn: '科学家推测这颗行星上可能有水。', en: 'Scientists speculate that there may be water on this planet.' },
    { cn: '他的推测后来被证实是正确的。', en: 'His conjecture was later proven correct.' },
  ],
  '推辞': [
    { cn: '他再三推辞，最后还是接受了邀请。', en: 'He repeatedly declined but finally accepted the invitation.' },
    { cn: '她推辞了公司给的升职机会。', en: 'She declined the promotion opportunity offered by the company.' },
    { cn: '这种好事，你就别推辞了。', en: 'This is a good thing; don\'t decline it.' },
  ],
  '推断': [
    { cn: '根据线索，警方推断犯罪嫌疑人是男性。', en: 'Based on the clues, the police deduced that the suspect is male.' },
    { cn: '科学家根据化石推断恐龙的生活习性。', en: 'Scientists inferred dinosaurs\' living habits from fossils.' },
    { cn: '从他的表情可以推断他不太满意。', en: 'From his expression, it can be inferred that he is not very satisfied.' },
  ],
  '推翻': [
    { cn: '人民推翻了腐败的政权。', en: 'The people overthrew the corrupt regime.' },
    { cn: '新的证据推翻了之前的结论。', en: 'New evidence overturned the previous conclusion.' },
    { cn: '他的观点被事实推翻了。', en: 'His viewpoint was refuted by facts.' },
  ],
  '推荐': [
    { cn: '你能推荐一家好的餐厅吗？', en: 'Can you recommend a good restaurant?' },
    { cn: '老师推荐我参加这个比赛。', en: 'The teacher recommended that I participate in this competition.' },
    { cn: '这本书非常值得推荐。', en: 'This book is highly recommended.' },
  ],
  '推理': [
    { cn: '她喜欢看推理小说。', en: 'She likes reading mystery novels.' },
    { cn: '通过逻辑推理可以得出正确的结论。', en: 'Correct conclusions can be drawn through logical reasoning.' },
    { cn: '侦探的推理能力令人佩服。', en: 'The detective\'s reasoning ability is admirable.' },
  ],
  '推敲': [
    { cn: '好的文章需要反复推敲。', en: 'A good article needs to be carefully thought over.' },
    { cn: '他仔细推敲了每一个用词。', en: 'He carefully deliberated over every word choice.' },
    { cn: '这个方案还需要再推敲推敲。', en: 'This plan still needs more careful consideration.' },
  ],
  '推算': [
    { cn: '天文学家可以推算出日食的时间。', en: 'Astronomers can calculate the time of solar eclipses.' },
    { cn: '根据这些数据推算，明年的增长率约为百分之五。', en: 'Based on these data, the estimated growth rate for next year is about five percent.' },
    { cn: '他推算出这座古建筑有八百年的历史。', en: 'He calculated that this ancient building is eight hundred years old.' },
  ],
  '推卸': [
    { cn: '他总是想方设法推卸责任。', en: 'He always tries to shirk responsibility.' },
    { cn: '出了问题不能互相推卸。', en: 'When problems arise, you can\'t pass the buck to each other.' },
    { cn: '这是你的工作，不能推卸给别人。', en: 'This is your job; you can\'t shift it to others.' },
  ],
  '推选': [
    { cn: '大家一致推选她为班长。', en: 'Everyone unanimously elected her as class president.' },
    { cn: '委员会推选了新的主席。', en: 'The committee elected a new chairman.' },
    { cn: '他被推选为代表参加会议。', en: 'He was chosen as a representative to attend the meeting.' },
  ],
  '推移': [
    { cn: '随着时间的推移，伤痛会慢慢愈合。', en: 'With the passage of time, wounds will slowly heal.' },
    { cn: '随着形势的推移，我们需要调整策略。', en: 'As the situation evolves, we need to adjust our strategy.' },
    { cn: '随着岁月的推移，他越来越成熟了。', en: 'As the years pass, he has become more and more mature.' },
  ],
  '颓废': [
    { cn: '失恋后，他过了一段颓废的日子。', en: 'After the breakup, he went through a period of depression.' },
    { cn: '不要因为一次失败就变得颓废。', en: 'Don\'t become dispirited because of one failure.' },
    { cn: '他的生活方式越来越颓废了。', en: 'His lifestyle has become increasingly decadent.' },
  ],
  '退回': [
    { cn: '这件商品有质量问题，我要退回。', en: 'This product has quality issues; I want to return it.' },
    { cn: '邮件被退回了，地址写错了。', en: 'The mail was returned; the address was wrong.' },
    { cn: '他把多收的钱退回给了顾客。', en: 'He returned the overcharged money to the customer.' },
  ],
  '退却': [
    { cn: '面对困难他从不退却。', en: 'He never retreats in the face of difficulty.' },
    { cn: '敌军在猛烈的攻击下开始退却。', en: 'The enemy began to retreat under fierce attack.' },
    { cn: '热情退却之后，他开始理性地思考。', en: 'After the initial enthusiasm faded, he began to think rationally.' },
  ],
  '退让': [
    { cn: '在原则问题上不能退让。', en: 'There can be no concession on matters of principle.' },
    { cn: '双方各退让一步，达成了协议。', en: 'Both sides made concessions and reached an agreement.' },
    { cn: '她不愿意在这个问题上退让。', en: 'She is unwilling to back down on this issue.' },
  ],
  '退缩': [
    { cn: '面对挑战不要退缩。', en: 'Don\'t shrink back from challenges.' },
    { cn: '困难再大也不能退缩。', en: 'No matter how great the difficulty, one must not cower.' },
    { cn: '他看到对手的阵势有些退缩了。', en: 'He shrank back a bit when he saw the opponent\'s formation.' },
  ],
  '退休金': [
    { cn: '他每月靠退休金生活。', en: 'He lives on his pension every month.' },
    { cn: '政府提高了退休金的标准。', en: 'The government raised the pension standard.' },
    { cn: '她把退休金的一部分捐给了慈善机构。', en: 'She donated part of her pension to charity.' },
  ],
  '退学': [
    { cn: '他因为经济原因退学了。', en: 'He dropped out of school for financial reasons.' },
    { cn: '父母坚决反对他退学创业。', en: 'His parents firmly opposed his dropping out to start a business.' },
    { cn: '退学之后他一直在家自学。', en: 'After quitting school, he has been self-studying at home.' },
  ],
  '退役': [
    { cn: '这位运动员明年将正式退役。', en: 'This athlete will officially retire next year.' },
    { cn: '退役军人可以享受很多优惠政策。', en: 'Retired military personnel can enjoy many preferential policies.' },
    { cn: '这架飞机已经退役了。', en: 'This aircraft has been decommissioned.' },
  ],
  '屯': [
    { cn: '他们在边境屯了大量的兵力。', en: 'They stationed a large number of troops at the border.' },
    { cn: '超市打折的时候她屯了很多东西。', en: 'She stocked up on a lot of things when the supermarket had sales.' },
    { cn: '这个屯子只有几十户人家。', en: 'This village has only a few dozen households.' },
  ],
  '托付': [
    { cn: '临走前他把孩子托付给了邻居。', en: 'Before leaving, he entrusted the child to the neighbor.' },
    { cn: '这件重要的事他只能托付给最信任的人。', en: 'He can only entrust this important matter to the person he trusts most.' },
    { cn: '老人把房产托付给律师管理。', en: 'The elderly person entrusted the property to a lawyer to manage.' },
  ],
  '拖累': [
    { cn: '他不想拖累家人。', en: 'He doesn\'t want to be a burden on his family.' },
    { cn: '一个人的表现差会拖累整个团队。', en: 'One person\'s poor performance can drag down the entire team.' },
    { cn: '债务问题拖累了公司的发展。', en: 'Debt problems have encumbered the company\'s development.' },
  ],
  '拖欠': [
    { cn: '公司拖欠了员工三个月的工资。', en: 'The company is three months behind in paying employees\' wages.' },
    { cn: '他拖欠房租被房东催了很多次。', en: 'He defaulted on rent and was reminded many times by the landlord.' },
    { cn: '拖欠贷款会影响个人信用。', en: 'Defaulting on loans will affect one\'s credit score.' },
  ],
  '拖延': [
    { cn: '不要再拖延了，今天必须完成。', en: 'Don\'t procrastinate any longer; it must be finished today.' },
    { cn: '他总是拖延交作业。', en: 'He always delays turning in homework.' },
    { cn: '工程因天气原因被拖延了两周。', en: 'The project was delayed by two weeks due to weather.' },
  ],
  '脱节': [
    { cn: '理论与实践脱节是教育的一大问题。', en: 'The disconnect between theory and practice is a major problem in education.' },
    { cn: '他的思想已经和时代脱节了。', en: 'His thinking has become disconnected from the times.' },
    { cn: '课程设置与社会需求严重脱节。', en: 'The curriculum is seriously out of touch with social needs.' },
  ],
  '脱口而出': [
    { cn: '他不假思索地脱口而出了一句粗话。', en: 'Without thinking, he blurted out a rude remark.' },
    { cn: '答案脱口而出，她自己都吓了一跳。', en: 'The answer slipped out, surprising even herself.' },
    { cn: '有些话最好想清楚再说，不要脱口而出。', en: 'Some words are better thought through before saying; don\'t just blurt them out.' },
  ],
  '脱落': [
    { cn: '墙上的油漆已经脱落了。', en: 'The paint on the wall has peeled off.' },
    { cn: '秋天树叶自然脱落。', en: 'In autumn, leaves naturally fall off.' },
    { cn: '他的牙齿因为年龄大开始脱落。', en: 'His teeth started to fall out due to old age.' },
  ],
  '脱身': [
    { cn: '他借故脱身离开了聚会。', en: 'He made an excuse to get away and left the party.' },
    { cn: '事务缠身，他一时无法脱身。', en: 'Busy with affairs, he couldn\'t free himself for the moment.' },
    { cn: '她好不容易才从那个麻烦中脱身。', en: 'She finally managed to extricate herself from that trouble.' },
  ],
  '脱颖而出': [
    { cn: '她在众多竞争者中脱颖而出。', en: 'She distinguished herself among many competitors.' },
    { cn: '这个品牌凭借优质的产品脱颖而出。', en: 'This brand stood out with high-quality products.' },
    { cn: '他在面试中脱颖而出，获得了这份工作。', en: 'He stood out in the interview and got the job.' },
  ],
  '驮': [
    { cn: '骡子驮着货物翻过了山。', en: 'The mule carried the goods over the mountain.' },
    { cn: '骆驼可以驮很重的东西。', en: 'Camels can carry very heavy loads.' },
    { cn: '他的背驮着一大袋粮食。', en: 'He carried a large sack of grain on his back.' },
  ],
  '妥': [
    { cn: '这件事安排妥了。', en: 'This matter has been properly arranged.' },
    { cn: '他把一切都准备妥当了。', en: 'He has gotten everything ready.' },
    { cn: '事情还没有办妥。', en: 'The matter hasn\'t been settled yet.' },
  ],
  '妥当': [
    { cn: '一切都安排得很妥当。', en: 'Everything has been arranged properly.' },
    { cn: '他处理问题总是很妥当。', en: 'He always handles problems appropriately.' },
    { cn: '出发前一定要把准备工作做妥当。', en: 'Make sure to get all preparations properly done before departure.' },
  ],
  '妥善': [
    { cn: '请妥善保管好你的证件。', en: 'Please keep your documents properly.' },
    { cn: '我们会妥善处理这件事的。', en: 'We will handle this matter properly.' },
    { cn: '文物需要妥善保存。', en: 'Cultural relics need to be properly preserved.' },
  ],
  '妥协': [
    { cn: '双方经过谈判终于达成了妥协。', en: 'After negotiation, both sides finally reached a compromise.' },
    { cn: '在质量问题上绝不妥协。', en: 'There is absolutely no compromise on quality issues.' },
    { cn: '婚姻需要双方的妥协和包容。', en: 'Marriage requires compromise and tolerance from both sides.' },
  ],
  '唾液': [
    { cn: '唾液在消化过程中起重要作用。', en: 'Saliva plays an important role in the digestion process.' },
    { cn: '看到美食，他忍不住分泌了唾液。', en: 'Seeing the delicious food, he couldn\'t help secreting saliva.' },
    { cn: '唾液检测可以用来做基因分析。', en: 'Saliva testing can be used for genetic analysis.' },
  ],
  '挖掘': [
    { cn: '考古队正在挖掘古墓。', en: 'The archaeological team is excavating an ancient tomb.' },
    { cn: '企业要善于挖掘人才的潜力。', en: 'Enterprises should be good at uncovering talent\'s potential.' },
    { cn: '这里正在挖掘一条新的地铁隧道。', en: 'A new subway tunnel is being dug here.' },
  ],
  '挖苦': [
    { cn: '他说话总爱挖苦别人。', en: 'He always likes to make cutting remarks about others.' },
    { cn: '她被同事挖苦了几句，心里很不舒服。', en: 'She was teased by her colleagues and felt uncomfortable.' },
    { cn: '不要挖苦别人，这样很不礼貌。', en: 'Don\'t be sarcastic to others; it\'s very rude.' },
  ],
  '瓦': [
    { cn: '屋顶上的瓦被风吹掉了几片。', en: 'A few tiles were blown off the roof by the wind.' },
    { cn: '这种灯泡的功率是六十瓦。', en: 'The power of this bulb is sixty watts.' },
    { cn: '古建筑上的琉璃瓦非常漂亮。', en: 'The glazed tiles on ancient buildings are very beautiful.' },
  ],
  '歪': [
    { cn: '画挂歪了，请调整一下。', en: 'The painting is hung crooked; please adjust it.' },
    { cn: '他喜欢歪着头想问题。', en: 'He likes to tilt his head when thinking about problems.' },
    { cn: '别信他，他尽出歪主意。', en: 'Don\'t listen to him; he only comes up with bad ideas.' },
  ],
  '歪曲': [
    { cn: '他故意歪曲了事实真相。', en: 'He deliberately distorted the truth.' },
    { cn: '不要歪曲我说的话。', en: 'Don\'t misrepresent what I said.' },
    { cn: '媒体不应该歪曲报道。', en: 'The media should not distort reports.' },
  ],
  '外表': [
    { cn: '不要被他的外表所迷惑。', en: 'Don\'t be deceived by his outward appearance.' },
    { cn: '她很注重外表的修饰。', en: 'She pays great attention to her appearance.' },
    { cn: '外表并不能代表一个人的内在。', en: 'Appearance cannot represent a person\'s inner self.' },
  ],
  '外公': [
    { cn: '外公今年八十岁了，身体还很硬朗。', en: 'Grandfather (maternal) is eighty this year and still in good health.' },
    { cn: '小时候我经常去外公家玩。', en: 'I often went to my maternal grandfather\'s house to play when I was young.' },
    { cn: '外公给我讲了很多有趣的故事。', en: 'My maternal grandfather told me many interesting stories.' },
  ],
  '外号': [
    { cn: '同学们给他取了一个有趣的外号。', en: 'The classmates gave him a funny nickname.' },
    { cn: '他的外号叫"小胖"。', en: 'His nickname is "Little Fatty."' },
    { cn: '不要随便给别人取外号。', en: 'Don\'t casually give others nicknames.' },
  ],
  '外籍': [
    { cn: '这所学校有很多外籍教师。', en: 'This school has many foreign teachers.' },
    { cn: '外籍员工需要办理工作签证。', en: 'Foreign employees need to apply for work visas.' },
    { cn: '她嫁给了一个外籍人士。', en: 'She married a foreign national.' },
  ],
  '外贸': [
    { cn: '他在一家外贸公司工作。', en: 'He works at a foreign trade company.' },
    { cn: '中国的外贸额逐年增长。', en: 'China\'s foreign trade volume grows year by year.' },
    { cn: '外贸出口是该地区的经济支柱。', en: 'Foreign trade exports are the economic pillar of this region.' },
  ],
  '外貌': [
    { cn: '不能以外貌来判断一个人。', en: 'You can\'t judge a person by appearance.' },
    { cn: '警方根据目击者描述的外貌寻找嫌疑人。', en: 'The police searched for the suspect based on the appearance described by witnesses.' },
    { cn: '她的外貌和她母亲很像。', en: 'Her appearance is very similar to her mother\'s.' },
  ],
  '外婆': [
    { cn: '外婆做的饭菜是世界上最好吃的。', en: 'Grandmother\'s (maternal) cooking is the best in the world.' },
    { cn: '我每年暑假都去外婆家住。', en: 'I stay at my maternal grandmother\'s house every summer vacation.' },
    { cn: '外婆虽然年纪大了，但记忆力还很好。', en: 'Although grandmother is old, her memory is still good.' },
  ],
  '外企': [
    { cn: '他毕业后进了一家外企。', en: 'After graduation, he joined a foreign enterprise.' },
    { cn: '外企的薪资待遇通常比较好。', en: 'Foreign companies generally offer better salaries and benefits.' },
    { cn: '越来越多的外企选择在中国设立总部。', en: 'More and more foreign companies choose to establish headquarters in China.' },
  ],
  '外星人': [
    { cn: '你相信外星人存在吗？', en: 'Do you believe in the existence of aliens?' },
    { cn: '这部科幻电影讲的是外星人入侵地球的故事。', en: 'This sci-fi movie is about aliens invading Earth.' },
    { cn: '科学家一直在寻找外星人的信号。', en: 'Scientists have been searching for signals from extraterrestrials.' },
  ],
  '外行': [
    { cn: '对于医学，我完全是个外行。', en: 'When it comes to medicine, I\'m a complete layman.' },
    { cn: '外行看热闹，内行看门道。', en: 'Laymen watch the excitement; experts see the technique.' },
    { cn: '他虽然是外行，但学得很快。', en: 'Although he\'s an amateur, he learns very quickly.' },
  ],
  '外形': [
    { cn: '这款车的外形设计很时尚。', en: 'The exterior design of this car is very fashionable.' },
    { cn: '飞机的外形像一只展翅的大鸟。', en: 'The shape of the airplane looks like a bird spreading its wings.' },
    { cn: '从外形上看，这两种植物很相似。', en: 'In terms of appearance, these two plants are very similar.' },
  ],
  '外援': [
    { cn: '这支球队签了两名外援。', en: 'This team signed two foreign players.' },
    { cn: '发展中国家需要更多的外援支持。', en: 'Developing countries need more foreign aid support.' },
    { cn: '外援的表现对球队的成绩影响很大。', en: 'Foreign players\' performance greatly impacts the team\'s results.' },
  ],
  '丸': [
    { cn: '医生给他开了几瓶药丸。', en: 'The doctor prescribed him several bottles of pills.' },
    { cn: '他搓了几个肉丸放进汤里。', en: 'He rolled a few meatballs and put them in the soup.' },
    { cn: '这种中药丸每天吃三次。', en: 'This Chinese medicine pill should be taken three times a day.' },
  ],
  '完备': [
    { cn: '这套设备功能非常完备。', en: 'This set of equipment is very comprehensive in functionality.' },
    { cn: '酒店的设施非常完备。', en: 'The hotel\'s facilities are very complete.' },
    { cn: '法律体系还不够完备。', en: 'The legal system is not yet comprehensive enough.' },
  ],
  '完毕': [
    { cn: '报告已经完毕，请领导审阅。', en: 'The report is completed; please review it, sir.' },
    { cn: '装修工程预计下月完毕。', en: 'The renovation project is expected to be completed next month.' },
    { cn: '检查完毕，一切正常。', en: 'Inspection complete; everything is normal.' },
  ],
  '完蛋': [
    { cn: '这次考试完蛋了，一道题都不会。', en: 'This exam is a disaster; I can\'t answer a single question.' },
    { cn: '如果被老板发现，我就完蛋了。', en: 'If the boss finds out, I\'m done for.' },
    { cn: '手机掉进水里，完蛋了！', en: 'The phone fell into water; it\'s done for!' },
  ],
  '完好': [
    { cn: '这件古董保存得非常完好。', en: 'This antique is preserved in very good condition.' },
    { cn: '虽然经历了地震，但建筑完好无损。', en: 'Despite experiencing the earthquake, the building is intact.' },
    { cn: '包裹到的时候完好无损。', en: 'The package arrived in good condition.' },
  ],
  '玩耍': [
    { cn: '孩子们在操场上快乐地玩耍。', en: 'Children play happily on the playground.' },
    { cn: '不要在马路上玩耍。', en: 'Don\'t play on the road.' },
    { cn: '周末他带孩子去公园玩耍。', en: 'On weekends, he takes his children to the park to play.' },
  ],
  '玩意儿': [
    { cn: '这是什么玩意儿？', en: 'What is this thing?' },
    { cn: '他喜欢收集各种小玩意儿。', en: 'He likes to collect all kinds of gadgets.' },
    { cn: '这个电子玩意儿挺好用的。', en: 'This electronic gadget is quite useful.' },
  ],
  '顽固': [
    { cn: '他非常顽固，谁的话都听不进去。', en: 'He is very stubborn and won\'t listen to anyone.' },
    { cn: '这种顽固的污渍很难去除。', en: 'This stubborn stain is very hard to remove.' },
    { cn: '不要太顽固了，听听别人的意见。', en: 'Don\'t be so obstinate; listen to others\' opinions.' },
  ],
  '挽': [
    { cn: '她挽着母亲的手臂逛街。', en: 'She walked arm in arm with her mother while shopping.' },
    { cn: '他挽起了袖子开始干活。', en: 'He rolled up his sleeves and started working.' },
    { cn: '新娘挽着父亲的手走向礼台。', en: 'The bride walked arm in arm with her father toward the altar.' },
  ],
  '挽回': [
    { cn: '他努力想挽回这段感情。', en: 'He tried hard to retrieve the relationship.' },
    { cn: '已经造成的损失很难挽回。', en: 'The damage already done is hard to undo.' },
    { cn: '他想用行动来挽回自己的名声。', en: 'He wants to redeem his reputation through actions.' },
  ],
  '挽救': [
    { cn: '医生们竭尽全力挽救病人的生命。', en: 'The doctors did their best to save the patient\'s life.' },
    { cn: '为了挽救濒危物种，我们必须行动。', en: 'To save endangered species, we must take action.' },
    { cn: '及时的措施挽救了公司。', en: 'Timely measures saved the company.' },
  ],
  '惋惜': [
    { cn: '大家对他的离去感到非常惋惜。', en: 'Everyone felt very sorry about his departure.' },
    { cn: '这么好的机会白白错过了，真让人惋惜。', en: 'Such a great opportunity was missed; it\'s really a pity.' },
    { cn: '他惋惜地摇了摇头。', en: 'He shook his head regretfully.' },
  ],
  '晚间': [
    { cn: '晚间新闻马上就要开始了。', en: 'The evening news is about to start.' },
    { cn: '这家餐厅晚间的生意特别好。', en: 'This restaurant does particularly good business in the evening.' },
    { cn: '晚间散步有助于消化。', en: 'An evening walk helps with digestion.' },
  ],
  '晚年': [
    { cn: '他晚年生活得很幸福。', en: 'He lived very happily in his later years.' },
    { cn: '画家在晚年创作了很多杰出的作品。', en: 'The painter created many outstanding works in his later years.' },
    { cn: '她把晚年的时光都奉献给了慈善事业。', en: 'She devoted her later years to charitable causes.' },
  ],
  '晚期': [
    { cn: '他被诊断为癌症晚期。', en: 'He was diagnosed with terminal cancer.' },
    { cn: '这座建筑属于唐代晚期的风格。', en: 'This building belongs to the late Tang Dynasty style.' },
    { cn: '晚期的治疗效果通常不太好。', en: 'Treatment at the end stage usually isn\'t very effective.' },
  ],
  '万分': [
    { cn: '我万分感谢你的帮助。', en: 'I am extremely grateful for your help.' },
    { cn: '听到这个消息，他万分激动。', en: 'Hearing this news, he was extremely excited.' },
    { cn: '她对这个结果万分遗憾。', en: 'She greatly regrets this result.' },
  ],
  '万古长青': [
    { cn: '友谊万古长青！', en: 'May friendship last forever!' },
    { cn: '他的精神将万古长青。', en: 'His spirit will remain eternally fresh.' },
    { cn: '人民英雄永垂不朽，精神万古长青。', en: 'The people\'s heroes are immortal; their spirit remains forever.' },
  ],
  '万能': [
    { cn: '金钱不是万能的。', en: 'Money is not omnipotent.' },
    { cn: '这把万能钥匙可以打开所有的门。', en: 'This master key can open all doors.' },
    { cn: '他是公司里的万能员工，什么都会。', en: 'He is the all-purpose employee of the company; he can do everything.' },
  ],
  '万万': [
    { cn: '这件事万万不可大意。', en: 'You absolutely must not be careless about this.' },
    { cn: '我万万没想到他会来。', en: 'I absolutely never expected he would come.' },
    { cn: '安全问题万万不能忽视。', en: 'Safety issues absolutely cannot be ignored.' },
  ],
  '万无一失': [
    { cn: '做了这么充分的准备，应该万无一失。', en: 'With such thorough preparation, it should be absolutely safe.' },
    { cn: '计划虽好，但也不能保证万无一失。', en: 'The plan is good, but it can\'t guarantee zero risk.' },
    { cn: '他再三检查，确保万无一失。', en: 'He checked repeatedly to ensure everything was foolproof.' },
  ],
  '汪洋': [
    { cn: '船在汪洋大海中航行。', en: 'The ship sailed on the vast ocean.' },
    { cn: '洪水过后，到处是一片汪洋。', en: 'After the flood, everywhere was a vast expanse of water.' },
    { cn: '面对汪洋大海，人显得格外渺小。', en: 'Facing the vast ocean, humans seem particularly insignificant.' },
  ],
  '亡羊补牢': [
    { cn: '亡羊补牢，为时未晚。', en: 'It\'s never too late to mend; better late than never.' },
    { cn: '虽然犯了错，但亡羊补牢还来得及。', en: 'Although mistakes were made, it\'s not too late to fix things.' },
    { cn: '发现问题就要及时改正，亡羊补牢。', en: 'When problems are found, correct them promptly; it\'s better late than never.' },
  ],
  '王国': [
    { cn: '英国是一个历史悠久的王国。', en: 'Britain is a kingdom with a long history.' },
    { cn: '他在自己的领域建立了一个商业王国。', en: 'He built a business empire in his field.' },
    { cn: '童话里描写了一个美丽的王国。', en: 'The fairy tale described a beautiful kingdom.' },
  ],
  '王牌': [
    { cn: '他是公司的王牌销售员。', en: 'He is the company\'s trump card salesman.' },
    { cn: '这是我们手中最大的王牌。', en: 'This is our biggest trump card.' },
    { cn: '他打出了自己的王牌。', en: 'He played his trump card.' },
  ],
  '网点': [
    { cn: '这家银行在全市设立了五十多个网点。', en: 'This bank has set up more than fifty service outlets across the city.' },
    { cn: '快递公司的网点覆盖了全国各地。', en: 'The express delivery company\'s outlets cover the entire country.' },
    { cn: '我们需要扩大销售网点。', en: 'We need to expand our sales outlets.' },
  ],
  '网民': [
    { cn: '中国的网民数量已超过十亿。', en: 'The number of internet users in China has exceeded one billion.' },
    { cn: '网民对这条新闻展开了热烈讨论。', en: 'Netizens engaged in heated discussion about this news.' },
    { cn: '网民的意见不容忽视。', en: 'The opinions of internet users should not be ignored.' },
  ],
  '往常': [
    { cn: '今天比往常来得早一些。', en: 'I came a bit earlier than usual today.' },
    { cn: '他的表现和往常一样出色。', en: 'His performance was as outstanding as usual.' },
    { cn: '一切似乎和往常没什么两样。', en: 'Everything seems the same as usual.' },
  ],
  '往返': [
    { cn: '北京到上海的往返机票多少钱？', en: 'How much is a round-trip ticket from Beijing to Shanghai?' },
    { cn: '他每天往返于家和公司之间。', en: 'He commutes between home and the office every day.' },
    { cn: '两地之间有定期的往返班车。', en: 'There is a regular shuttle bus between the two places.' },
  ],
  '往日': [
    { cn: '往日的欢声笑语还在耳边回荡。', en: 'The laughter of past days still echoes in my ears.' },
    { cn: '他回忆起往日的时光，感慨万千。', en: 'He reminisced about the past and was filled with emotion.' },
    { cn: '这里和往日已经大不相同了。', en: 'This place is very different from what it used to be.' },
  ],
  '往事': [
    { cn: '提起往事，她不禁流下了眼泪。', en: 'Mentioning past events, she couldn\'t help shedding tears.' },
    { cn: '往事不堪回首。', en: 'The past is too painful to look back on.' },
    { cn: '老人常常沉浸在往事的回忆中。', en: 'The elderly often immerse themselves in memories of the past.' },
  ],
  '妄想': [
    { cn: '不努力就想成功，那是妄想。', en: 'Wanting to succeed without effort is a delusion.' },
    { cn: '他妄想逃脱法律的制裁。', en: 'He vainly attempted to escape legal sanctions.' },
    { cn: '别妄想不劳而获。', en: 'Don\'t fantasize about getting something for nothing.' },
  ],
  '忘不了': [
    { cn: '我永远忘不了他对我的帮助。', en: 'I can never forget his help.' },
    { cn: '这次旅行的经历让人忘不了。', en: 'The experience of this trip is unforgettable.' },
    { cn: '那个温暖的微笑，我一辈子都忘不了。', en: 'That warm smile is something I will never forget in my life.' },
  ],
  '忘掉': [
    { cn: '试着忘掉那些不愉快的事情吧。', en: 'Try to forget those unpleasant things.' },
    { cn: '他已经忘掉了过去的痛苦。', en: 'He has already forgotten the pain of the past.' },
    { cn: '有些记忆是永远忘掉不了的。', en: 'Some memories can never be forgotten.' },
  ],
  '旺': [
    { cn: '春节期间，商店的生意特别旺。', en: 'During Spring Festival, business at stores is especially brisk.' },
    { cn: '炉子里的火烧得很旺。', en: 'The fire in the stove burns vigorously.' },
    { cn: '他们家的人丁很旺。', en: 'Their family has many descendants.' },
  ],
  '旺季': [
    { cn: '暑假是旅游的旺季。', en: 'Summer vacation is the peak tourist season.' },
    { cn: '旺季的酒店价格会上涨很多。', en: 'Hotel prices rise significantly during peak season.' },
    { cn: '商家在旺季加班加点地赶订单。', en: 'Merchants work overtime to fulfill orders during the busy season.' },
  ],
  '旺盛': [
    { cn: '年轻人精力旺盛。', en: 'Young people are full of energy.' },
    { cn: '这里的植物生长非常旺盛。', en: 'The plants here grow very vigorously.' },
    { cn: '他对知识的渴望非常旺盛。', en: 'His thirst for knowledge is very strong.' },
  ],
  '望': [
    { cn: '她站在窗前望着远方。', en: 'She stood by the window gazing into the distance.' },
    { cn: '我们一直望着他的身影消失在人群中。', en: 'We watched his figure disappear into the crowd.' },
    { cn: '他满怀期望地望着儿子。', en: 'He looked at his son full of hope.' },
  ],
  '望远镜': [
    { cn: '他用望远镜观察远处的鸟类。', en: 'He uses binoculars to observe birds in the distance.' },
    { cn: '天文望远镜可以观测到遥远的星系。', en: 'Astronomical telescopes can observe distant galaxies.' },
    { cn: '她买了一副望远镜准备去看演唱会。', en: 'She bought a pair of binoculars to go to the concert.' },
  ],
  '危及': [
    { cn: '空气污染已经危及到人们的健康。', en: 'Air pollution has already endangered people\'s health.' },
    { cn: '洪水危及了周边居民的安全。', en: 'The flood endangered the safety of surrounding residents.' },
    { cn: '过度开发可能危及生态平衡。', en: 'Excessive development may endanger ecological balance.' },
  ],
  '危急': [
    { cn: '病人的情况十分危急。', en: 'The patient\'s condition is very critical.' },
    { cn: '在危急时刻，他挺身而出。', en: 'He stepped forward in the critical moment.' },
    { cn: '战场上的形势一度非常危急。', en: 'The situation on the battlefield was once very desperate.' },
  ],
  '威风': [
    { cn: '穿上军装，他显得特别威风。', en: 'He looks particularly impressive in his military uniform.' },
    { cn: '老虎是森林中最威风的动物。', en: 'Tigers are the most imposing animals in the forest.' },
    { cn: '他昨天在比赛中大出威风。', en: 'He was very impressive in yesterday\'s competition.' },
  ],
  '威力': [
    { cn: '台风的威力非常大。', en: 'The power of the typhoon is tremendous.' },
    { cn: '这种新型武器的威力令人震惊。', en: 'The power of this new weapon is astonishing.' },
    { cn: '科学技术的威力不可小觑。', en: 'The power of science and technology should not be underestimated.' },
  ],
  '威慑': [
    { cn: '核武器具有强大的威慑作用。', en: 'Nuclear weapons have a powerful deterrent effect.' },
    { cn: '法律的威慑力有助于维护社会秩序。', en: 'The deterrent power of the law helps maintain social order.' },
    { cn: '这次行动对犯罪分子起到了威慑作用。', en: 'This operation had a deterrent effect on criminals.' },
  ],
  '威信': [
    { cn: '他在群众中享有很高的威信。', en: 'He enjoys high prestige among the masses.' },
    { cn: '领导要靠能力树立威信。', en: 'Leaders should build their authority through capability.' },
    { cn: '他的威信因为这件事受到了损害。', en: 'His credibility was damaged because of this incident.' },
  ],
  '萎缩': [
    { cn: '长期不锻炼会导致肌肉萎缩。', en: 'Long-term lack of exercise can cause muscle atrophy.' },
    { cn: '市场萎缩导致很多企业倒闭。', en: 'Market contraction caused many enterprises to close.' },
    { cn: '由于干旱，湖泊面积不断萎缩。', en: 'Due to drought, the lake area continues to shrink.' },
  ],
  '微不足道': [
    { cn: '这点小事微不足道，不必放在心上。', en: 'This trivial matter is insignificant; don\'t take it to heart.' },
    { cn: '和宇宙相比，人类是微不足道的。', en: 'Compared to the universe, humans are insignificant.' },
    { cn: '再微不足道的努力也有意义。', en: 'Even the most insignificant effort has meaning.' },
  ],
  '微观': [
    { cn: '微观经济学研究个体消费者和企业的行为。', en: 'Microeconomics studies the behavior of individual consumers and firms.' },
    { cn: '显微镜让我们能观察微观世界。', en: 'Microscopes allow us to observe the microscopic world.' },
    { cn: '从微观层面分析这个问题会有新发现。', en: 'Analyzing this issue at the micro level will yield new findings.' },
  ],
  '微妙': [
    { cn: '他们之间的关系很微妙。', en: 'The relationship between them is subtle.' },
    { cn: '谈判进入了一个微妙的阶段。', en: 'The negotiations entered a delicate phase.' },
    { cn: '她注意到了气氛中微妙的变化。', en: 'She noticed the subtle change in the atmosphere.' },
  ],
  '微弱': [
    { cn: '远处传来微弱的光芒。', en: 'A faint glow came from the distance.' },
    { cn: '病人的心跳非常微弱。', en: 'The patient\'s heartbeat is very faint.' },
    { cn: '手机信号在这里非常微弱。', en: 'The phone signal is very weak here.' },
  ],
  '微型': [
    { cn: '这是一架微型无人机。', en: 'This is a miniature drone.' },
    { cn: '微型企业也能创造巨大价值。', en: 'Micro enterprises can also create enormous value.' },
    { cn: '科学家开发了一种微型传感器。', en: 'Scientists developed a tiny sensor.' },
  ],
  '围墙': [
    { cn: '学校的围墙很高。', en: 'The school\'s perimeter wall is very high.' },
    { cn: '他翻过围墙逃了出去。', en: 'He climbed over the fence and escaped.' },
    { cn: '花园被一堵砖围墙包围着。', en: 'The garden is surrounded by a brick wall.' },
  ],
  '违背': [
    { cn: '他的做法违背了职业道德。', en: 'His actions violated professional ethics.' },
    { cn: '我不愿意做违背良心的事。', en: 'I don\'t want to do things that go against my conscience.' },
    { cn: '这项决定违背了大多数人的意愿。', en: 'This decision goes against the wishes of the majority.' },
  ],
  '违约': [
    { cn: '一方违约要承担相应的法律责任。', en: 'The party that breaches the contract must bear corresponding legal responsibility.' },
    { cn: '他因违约被对方起诉了。', en: 'He was sued by the other party for breach of contract.' },
    { cn: '合同中明确规定了违约的赔偿标准。', en: 'The contract clearly stipulates the compensation standards for breach.' },
  ],
  '违章': [
    { cn: '他因违章驾驶被罚了款。', en: 'He was fined for violating traffic regulations.' },
    { cn: '这栋违章建筑将被拆除。', en: 'This building constructed in violation of regulations will be demolished.' },
    { cn: '交通违章的记录会影响驾照分数。', en: 'Traffic violation records will affect one\'s driver\'s license points.' },
  ],
  '唯': [
    { cn: '他是唯一一个通过考试的人。', en: 'He is the only one who passed the exam.' },
    { cn: '唯有努力才能取得成功。', en: 'Only through effort can one achieve success.' },
    { cn: '这是他唯一的要求。', en: 'This is his only request.' },
  ],
  '唯独': [
    { cn: '别人都同意了，唯独他反对。', en: 'Everyone else agreed; only he was opposed.' },
    { cn: '什么都不怕，唯独怕蛇。', en: 'I\'m not afraid of anything, except snakes.' },
    { cn: '大家都去了，唯独她没去。', en: 'Everyone went except her.' },
  ],
  '伪造': [
    { cn: '他因伪造证件被捕了。', en: 'He was arrested for forging documents.' },
    { cn: '这张钞票是伪造的。', en: 'This banknote is counterfeit.' },
    { cn: '伪造他人签名是违法行为。', en: 'Forging someone else\'s signature is illegal.' },
  ],
  '伪装': [
    { cn: '他伪装成修理工混了进去。', en: 'He disguised himself as a repairman and sneaked in.' },
    { cn: '士兵们用树叶做伪装。', en: 'The soldiers used leaves for camouflage.' },
    { cn: '她的笑容只是一种伪装。', en: 'Her smile is just a pretense.' },
  ],
  '尾气': [
    { cn: '汽车尾气是城市空气污染的主要来源。', en: 'Vehicle exhaust is the main source of urban air pollution.' },
    { cn: '政府限制高排放尾气的车辆上路。', en: 'The government restricts vehicles with high exhaust emissions from the road.' },
    { cn: '电动车没有尾气排放。', en: 'Electric vehicles have no exhaust emissions.' },
  ],
  '尾声': [
    { cn: '这场比赛已经进入了尾声。', en: 'This game has entered its final stage.' },
    { cn: '项目即将进入尾声。', en: 'The project is about to come to an end.' },
    { cn: '小说的尾声让人回味无穷。', en: 'The epilogue of the novel leaves much to ponder.' },
  ],
  '纬度': [
    { cn: '北京位于北纬四十度左右。', en: 'Beijing is located at about 40 degrees north latitude.' },
    { cn: '纬度越高，气温通常越低。', en: 'The higher the latitude, the lower the temperature usually is.' },
    { cn: '这两个城市的纬度差不多。', en: 'These two cities are at about the same latitude.' },
  ],
  '委屈': [
    { cn: '她受了很多委屈，却从不抱怨。', en: 'She suffered many grievances but never complained.' },
    { cn: '孩子觉得委屈就哭了起来。', en: 'The child felt wronged and started crying.' },
    { cn: '别委屈自己，有什么话说出来。', en: 'Don\'t suffer in silence; speak up.' },
  ],
  '委婉': [
    { cn: '她用很委婉的方式拒绝了邀请。', en: 'She declined the invitation in a very tactful way.' },
    { cn: '批评别人要委婉一些。', en: 'Criticism of others should be more tactful.' },
    { cn: '他委婉地表达了不同意见。', en: 'He expressed his disagreement euphemistically.' },
  ],
  '委员': [
    { cn: '他是全国政协委员。', en: 'He is a member of the National Committee of the CPPCC.' },
    { cn: '委员们对提案进行了讨论。', en: 'The committee members discussed the proposals.' },
    { cn: '她被选为学生会的委员。', en: 'She was elected as a member of the student council.' },
  ],
  '委员会': [
    { cn: '委员会通过了新的规章制度。', en: 'The committee approved the new regulations.' },
    { cn: '他是奥林匹克委员会的成员。', en: 'He is a member of the Olympic Committee.' },
    { cn: '安全委员会将对此事进行调查。', en: 'The safety committee will investigate this matter.' },
  ],
  '卫视': [
    { cn: '湖南卫视的综艺节目很受欢迎。', en: 'Hunan Satellite TV\'s variety shows are very popular.' },
    { cn: '这部电视剧将在卫视首播。', en: 'This TV series will premiere on satellite TV.' },
    { cn: '各大卫视竞争非常激烈。', en: 'Competition among major satellite TV stations is very fierce.' },
  ],
  '为人': [
    { cn: '他为人正直，深受大家尊敬。', en: 'He is upright in character and deeply respected by everyone.' },
    { cn: '她为人热情，乐于助人。', en: 'She is warm in character and willing to help others.' },
    { cn: '他的为人处世很圆滑。', en: 'His way of conducting himself is very tactful.' },
  ],
  '未': [
    { cn: '未经许可不得入内。', en: 'No entry without permission.' },
    { cn: '这项工作尚未完成。', en: 'This work has not yet been completed.' },
    { cn: '他至今未婚。', en: 'He is still unmarried to this day.' },
  ],
  '未成年人': [
    { cn: '法律保护未成年人的合法权益。', en: 'The law protects the legitimate rights of minors.' },
    { cn: '未成年人不得进入这个场所。', en: 'Minors are not allowed to enter this venue.' },
    { cn: '未成年人犯罪问题日益受到关注。', en: 'Juvenile crime is receiving increasing attention.' },
  ],
  '未经': [
    { cn: '未经同意，不能使用别人的照片。', en: 'You cannot use other people\'s photos without their consent.' },
    { cn: '未经证实的消息不要随意传播。', en: 'Don\'t casually spread unverified information.' },
    { cn: '这篇文章未经编辑就发表了。', en: 'This article was published without having been edited.' },
  ],
  '未免': [
    { cn: '他的要求未免太过分了。', en: 'His demands are really too excessive.' },
    { cn: '你这样做未免有些冒险。', en: 'What you\'re doing is rather risky.' },
    { cn: '这样处理问题未免太简单粗暴了。', en: 'Handling the problem this way is really too crude.' },
  ],
  '未知数': [
    { cn: '他能否成功还是个未知数。', en: 'Whether he can succeed is still unknown.' },
    { cn: '未来充满了未知数。', en: 'The future is full of unknowns.' },
    { cn: '这次考试的难度对大家来说都是未知数。', en: 'The difficulty of this exam is an unknown for everyone.' },
  ],
  '位子': [
    { cn: '这个位子有人坐吗？', en: 'Is this seat taken?' },
    { cn: '他好不容易才找到一个位子坐下。', en: 'He finally found a seat and sat down.' },
    { cn: '请给老人让个位子。', en: 'Please give up your seat for the elderly person.' },
  ],
  '味精': [
    { cn: '这道菜放了味精，味道更鲜。', en: 'MSG was added to this dish, making it more savory.' },
    { cn: '很多人不喜欢吃放味精的食物。', en: 'Many people don\'t like food with MSG.' },
    { cn: '味精是中国菜中常用的调味品。', en: 'MSG is a commonly used seasoning in Chinese cuisine.' },
  ],
  '畏惧': [
    { cn: '他从不畏惧困难和挑战。', en: 'He never fears difficulties and challenges.' },
    { cn: '士兵们毫无畏惧地冲向战场。', en: 'The soldiers charged fearlessly onto the battlefield.' },
    { cn: '她克服了对黑暗的畏惧。', en: 'She overcame her fear of darkness.' },
  ],
  '畏缩': [
    { cn: '面对强大的对手，他没有畏缩。', en: 'Facing a powerful opponent, he did not flinch.' },
    { cn: '她畏缩地缩在角落里。', en: 'She cowered in the corner.' },
    { cn: '困难面前不能畏缩不前。', en: 'One must not recoil in the face of difficulties.' },
  ],
  '胃口': [
    { cn: '他今天胃口特别好。', en: 'He has a particularly good appetite today.' },
    { cn: '这部电影不合我的胃口。', en: 'This movie is not to my liking.' },
    { cn: '天气太热，影响了大家的胃口。', en: 'The weather is too hot and has affected everyone\'s appetite.' },
  ],
  '喂养': [
    { cn: '她精心喂养着一群小鸡。', en: 'She carefully feeds a flock of chicks.' },
    { cn: '母乳喂养对婴儿的健康最有益。', en: 'Breastfeeding is most beneficial for infant health.' },
    { cn: '他每天按时喂养鱼缸里的金鱼。', en: 'He feeds the goldfish in the tank on time every day.' },
  ],
  '慰劳': [
    { cn: '公司领导到工地慰劳工人。', en: 'Company leaders went to the construction site to show appreciation to the workers.' },
    { cn: '春节前，部队派人慰劳驻守边疆的战士。', en: 'Before Spring Festival, the army sent people to comfort soldiers stationed at the border.' },
    { cn: '邻居送来了水果慰劳我们。', en: 'The neighbors brought fruit to comfort us.' },
  ],
  '温度计': [
    { cn: '护士用温度计给病人量体温。', en: 'The nurse measures the patient\'s temperature with a thermometer.' },
    { cn: '温度计显示今天气温三十五度。', en: 'The thermometer shows today\'s temperature is 35 degrees.' },
    { cn: '电子温度计比水银温度计更安全。', en: 'Electronic thermometers are safer than mercury thermometers.' },
  ],
  '温泉': [
    { cn: '冬天泡温泉是一种享受。', en: 'Soaking in hot springs in winter is a pleasure.' },
    { cn: '这个地方因为温泉而闻名。', en: 'This place is famous for its hot springs.' },
    { cn: '温泉的水温常年保持在四十度左右。', en: 'The water temperature of the hot spring stays around 40 degrees year-round.' },
  ],
  '温柔': [
    { cn: '她说话的声音很温柔。', en: 'She speaks in a very gentle voice.' },
    { cn: '他用温柔的目光看着妻子。', en: 'He looked at his wife with gentle eyes.' },
    { cn: '妈妈温柔地抚摸着孩子的头。', en: 'Mother gently stroked the child\'s head.' },
  ],
  '温室': [
    { cn: '温室里种着各种热带植物。', en: 'Various tropical plants grow in the greenhouse.' },
    { cn: '温室效应导致全球变暖。', en: 'The greenhouse effect leads to global warming.' },
    { cn: '这些蔬菜是在温室里培育的。', en: 'These vegetables were grown in a greenhouse.' },
  ],
  '温习': [
    { cn: '考试前他花了三天时间温习功课。', en: 'He spent three days reviewing his lessons before the exam.' },
    { cn: '每天温习新学的知识非常重要。', en: 'It is very important to review newly learned knowledge every day.' },
    { cn: '老师让学生回家温习今天的内容。', en: 'The teacher asked students to review today\'s content at home.' },
  ],
  '温馨': [
    { cn: '她把家布置得非常温馨。', en: 'She decorated her home to be very warm and cozy.' },
    { cn: '温馨的烛光晚餐让他们度过了一个浪漫的夜晚。', en: 'The warm candlelight dinner gave them a romantic evening.' },
    { cn: '这是一段温馨的回忆。', en: 'This is a warm and comforting memory.' },
  ],
  '瘟疫': [
    { cn: '中世纪的欧洲曾遭受过严重的瘟疫。', en: 'Medieval Europe suffered from severe plagues.' },
    { cn: '瘟疫的传播速度非常快。', en: 'The plague spreads very quickly.' },
    { cn: '古代很多人死于瘟疫。', en: 'In ancient times, many people died from plagues.' },
  ],
  '文': [
    { cn: '他的文笔非常好。', en: 'His writing style is very good.' },
    { cn: '中华文明源远流长。', en: 'Chinese civilization has a long and rich history.' },
    { cn: '他是一个文质彬彬的年轻人。', en: 'He is a gentle and refined young man.' },
  ],
  '文具': [
    { cn: '开学前要准备好各种文具。', en: 'Prepare various stationery items before school starts.' },
    { cn: '这家文具店的东西很齐全。', en: 'This stationery store has a complete selection.' },
    { cn: '她喜欢收集各种漂亮的文具。', en: 'She likes to collect all kinds of beautiful stationery.' },
  ],
  '文科': [
    { cn: '她高中选了文科。', en: 'She chose liberal arts in high school.' },
    { cn: '文科学生需要大量的阅读。', en: 'Liberal arts students need to do a lot of reading.' },
    { cn: '他的文科成绩比理科好。', en: 'His liberal arts grades are better than his science grades.' },
  ],
  '文盲': [
    { cn: '新中国成立后，扫除了大量文盲。', en: 'After the founding of New China, a large number of illiterate people were educated.' },
    { cn: '在偏远地区，文盲率仍然较高。', en: 'In remote areas, the illiteracy rate remains relatively high.' },
    { cn: '他虽然不识字，但并不是真正的文盲。', en: 'Although he can\'t read, he is not truly illiterate.' },
  ],
  '文凭': [
    { cn: '现在找工作越来越重视文凭。', en: 'Nowadays, diplomas are increasingly valued when job hunting.' },
    { cn: '他拿到了大学本科的文凭。', en: 'He obtained a bachelor\'s degree diploma.' },
    { cn: '文凭不代表能力。', en: 'A diploma doesn\'t represent ability.' },
  ],
  '文人': [
    { cn: '古代文人喜欢吟诗作赋。', en: 'Ancient scholars liked to compose poems and verses.' },
    { cn: '这里曾是很多文人墨客聚集的地方。', en: 'This was once a gathering place for many literati.' },
    { cn: '他是当代著名的文人学者。', en: 'He is a well-known contemporary scholar.' },
  ],
  '文物': [
    { cn: '博物馆里收藏了许多珍贵的文物。', en: 'The museum houses many precious cultural relics.' },
    { cn: '保护文物是我们共同的责任。', en: 'Protecting cultural relics is our shared responsibility.' },
    { cn: '这些文物已有两千多年的历史。', en: 'These cultural relics are more than two thousand years old.' },
  ],
  '文献': [
    { cn: '他查阅了大量的历史文献。', en: 'He consulted a large number of historical documents.' },
    { cn: '这份文献记录了当时的社会状况。', en: 'This document records the social conditions of that time.' },
    { cn: '写论文需要引用可靠的文献。', en: 'Writing a thesis requires citing reliable documents.' },
  ],
  '文雅': [
    { cn: '她的举止非常文雅。', en: 'Her demeanor is very elegant.' },
    { cn: '这家餐厅的环境很文雅。', en: 'The atmosphere of this restaurant is very refined.' },
    { cn: '他说话总是很文雅。', en: 'He always speaks in a refined manner.' },
  ],
  '闻名': [
    { cn: '西湖以美丽的景色闻名天下。', en: 'West Lake is famous throughout the world for its beautiful scenery.' },
    { cn: '这位教授在学术界非常闻名。', en: 'This professor is very well-known in academic circles.' },
    { cn: '他的画作已经闻名海内外。', en: 'His paintings are famous both at home and abroad.' },
  ],
  '蚊帐': [
    { cn: '夏天挂上蚊帐可以防蚊子。', en: 'Hanging a mosquito net in summer can prevent mosquitoes.' },
    { cn: '她在床上支起了蚊帐。', en: 'She set up a mosquito net over the bed.' },
    { cn: '这种蚊帐的网眼非常细密。', en: 'The mesh of this mosquito net is very fine.' },
  ],
  '蚊子': [
    { cn: '夏天蚊子特别多。', en: 'There are especially many mosquitoes in summer.' },
    { cn: '他被蚊子叮了好几个包。', en: 'He got several mosquito bites.' },
    { cn: '蚊子会传播疾病。', en: 'Mosquitoes can spread diseases.' },
  ],
  '吻': [
    { cn: '她在孩子的额头上印了一个吻。', en: 'She planted a kiss on the child\'s forehead.' },
    { cn: '他们在夕阳下深情地吻了对方。', en: 'They kissed each other affectionately in the sunset.' },
    { cn: '这是一个充满爱意的吻。', en: 'This was a kiss full of love.' },
  ],
  '吻合': [
    { cn: '调查结果与我们的推测完全吻合。', en: 'The investigation results are completely consistent with our speculation.' },
    { cn: '证人的陈述和监控录像吻合。', en: 'The witness\'s testimony matches the surveillance video.' },
    { cn: '理论必须和实践吻合。', en: 'Theory must be consistent with practice.' },
  ],
  '紊乱': [
    { cn: '长期熬夜会导致生物钟紊乱。', en: 'Staying up late for a long time can cause disruption of the biological clock.' },
    { cn: '公司的管理出现了严重紊乱。', en: 'Serious disorder has appeared in the company\'s management.' },
    { cn: '交通秩序一度十分紊乱。', en: 'Traffic order was once very chaotic.' },
  ],
  '稳固': [
    { cn: '他们的友谊非常稳固。', en: 'Their friendship is very solid.' },
    { cn: '要稳固好基础才能建高楼。', en: 'A stable foundation must be laid before building tall buildings.' },
    { cn: '经济发展的基础越来越稳固。', en: 'The foundation of economic development is becoming increasingly stable.' },
  ],
  '稳健': [
    { cn: '他的投资策略非常稳健。', en: 'His investment strategy is very steady.' },
    { cn: '公司采取了稳健的发展方针。', en: 'The company adopted a steady development policy.' },
    { cn: '她步伐稳健地走上了讲台。', en: 'She walked to the podium with firm, steady steps.' },
  ],
  '稳妥': [
    { cn: '这个方案比较稳妥。', en: 'This plan is relatively dependable.' },
    { cn: '重要文件一定要稳妥保管。', en: 'Important documents must be kept safely.' },
    { cn: '他做事一向稳妥可靠。', en: 'He has always been dependable in his work.' },
  ],
  '稳重': [
    { cn: '他做事很稳重，从不冲动。', en: 'He does things in a steady manner and is never impulsive.' },
    { cn: '她比同龄人更加稳重成熟。', en: 'She is more steady and mature than her peers.' },
    { cn: '面对突发情况，他表现得非常稳重。', en: 'Facing the unexpected situation, he acted very composed.' },
  ],
  '问卷': [
    { cn: '请填写一下这份问卷。', en: 'Please fill out this questionnaire.' },
    { cn: '我们通过问卷调查收集了大量数据。', en: 'We collected a large amount of data through questionnaire surveys.' },
    { cn: '这份问卷一共有三十道题。', en: 'This questionnaire has a total of thirty questions.' },
  ],
  '问世': [
    { cn: '这部小说一问世就引起了轰动。', en: 'This novel caused a sensation as soon as it was published.' },
    { cn: '第一台计算机是什么时候问世的？', en: 'When was the first computer created?' },
    { cn: '新产品即将问世。', en: 'The new product is about to come out.' },
  ],
  '窝': [
    { cn: '鸟儿在树上筑了一个窝。', en: 'The bird built a nest in the tree.' },
    { cn: '他窝在沙发上看电视。', en: 'He lounged on the sofa watching TV.' },
    { cn: '他的眼窝深深的，看起来很疲惫。', en: 'His eye sockets are deep-set, making him look very tired.' },
  ],
  '卧': [
    { cn: '他在床上卧了一整天。', en: 'He lay in bed for an entire day.' },
    { cn: '小猫卧在垫子上睡觉。', en: 'The kitten lies on the mat sleeping.' },
    { cn: '这间是卧房。', en: 'This is the bedroom.' },
  ],
  '污秽': [
    { cn: '这条河水已经变得非常污秽。', en: 'The water in this river has become very filthy.' },
    { cn: '他说了一些污秽的语言。', en: 'He used some foul language.' },
    { cn: '工人们正在清理污秽的环境。', en: 'Workers are cleaning up the sordid environment.' },
  ],
  '呜咽': [
    { cn: '她在角落里低声呜咽。', en: 'She sobbed softly in the corner.' },
    { cn: '听到坏消息后，她忍不住呜咽起来。', en: 'After hearing the bad news, she couldn\'t help but whimper.' },
    { cn: '远处传来一阵呜咽的风声。', en: 'A whimpering wind sound came from the distance.' },
  ],
  '巫婆': [
    { cn: '童话故事里总有一个邪恶的巫婆。', en: 'There is always an evil witch in fairy tales.' },
    { cn: '村里的巫婆声称能治百病。', en: 'The village witch claims to be able to cure all diseases.' },
    { cn: '孩子们害怕故事里的巫婆。', en: 'The children are afraid of the witch in the story.' },
  ],
  '屋顶': [
    { cn: '猫在屋顶上晒太阳。', en: 'The cat is sunbathing on the roof.' },
    { cn: '屋顶被暴风雨掀翻了。', en: 'The roof was blown off by the storm.' },
    { cn: '他们在屋顶上安装了太阳能板。', en: 'They installed solar panels on the roof.' },
  ],
  '无比': [
    { cn: '她感到无比幸福。', en: 'She felt incomparably happy.' },
    { cn: '这里的风景无比壮观。', en: 'The scenery here is incomparably spectacular.' },
    { cn: '他对工作充满无比的热情。', en: 'He is filled with incomparable enthusiasm for his work.' },
  ],
  '无不': [
    { cn: '听到这个消息，大家无不感到震惊。', en: 'Upon hearing this news, everyone without exception was shocked.' },
    { cn: '看过这部电影的人无不为之感动。', en: 'Everyone who has seen this movie was moved by it.' },
    { cn: '他的成就无不令人敬佩。', en: 'His achievements are all worthy of admiration.' },
  ],
  '无偿': [
    { cn: '他无偿为社区提供法律咨询服务。', en: 'He provides free legal consultation services to the community.' },
    { cn: '志愿者们无偿献血。', en: 'Volunteers donate blood for free.' },
    { cn: '这块土地是政府无偿划拨的。', en: 'This land was allocated by the government at no cost.' },
  ],
  '无敌': [
    { cn: '他在这个项目上几乎是无敌的。', en: 'He is virtually unrivaled in this project.' },
    { cn: '这支球队在赛季中表现无敌。', en: 'This team performed unbeatable during the season.' },
    { cn: '知识就是力量，团结就是无敌。', en: 'Knowledge is power; unity is invincible.' },
  ],
  '无恶不作': [
    { cn: '那个犯罪团伙无恶不作。', en: 'That criminal gang commits every imaginable misdeed.' },
    { cn: '历史上有一些暴君无恶不作。', en: 'In history, there were some tyrants who committed every crime.' },
    { cn: '这些人无恶不作，终于受到了法律的制裁。', en: 'These people committed every crime and were finally brought to justice.' },
  ],
  '无非': [
    { cn: '他这样做无非是想引起注意。', en: 'He is doing this for nothing other than to attract attention.' },
    { cn: '她生气无非就是因为你没有告诉她。', en: 'She\'s angry simply because you didn\'t tell her.' },
    { cn: '成功的秘诀无非就是坚持和努力。', en: 'The secret to success is nothing but persistence and effort.' },
  ],
  '无辜': [
    { cn: '不要伤害无辜的人。', en: 'Don\'t harm innocent people.' },
    { cn: '他是无辜的，没有犯罪。', en: 'He is innocent; he did not commit a crime.' },
    { cn: '战争中死了太多无辜的百姓。', en: 'Too many innocent civilians died in the war.' },
  ],
  '无故': [
    { cn: '他无故缺席了好几次会议。', en: 'He was absent from several meetings without cause.' },
    { cn: '不能无故解雇员工。', en: 'You cannot dismiss employees without reason.' },
    { cn: '她无故被调离了原来的岗位。', en: 'She was transferred from her original position without reason.' },
  ],
  '无关紧要': [
    { cn: '这些都是无关紧要的小事。', en: 'These are all insignificant trifles.' },
    { cn: '他觉得这个问题无关紧要。', en: 'He thinks this issue is insignificant.' },
    { cn: '不要把精力浪费在无关紧要的事情上。', en: 'Don\'t waste energy on trivial matters.' },
  ],
  '无话可说': [
    { cn: '面对铁证，他无话可说。', en: 'Facing the irrefutable evidence, he had nothing to say.' },
    { cn: '他们吵完架后彼此无话可说。', en: 'After the argument, they had nothing to say to each other.' },
    { cn: '结果如此明显，让人无话可说。', en: 'The result is so obvious that there is nothing to say.' },
  ],
  '无济于事': [
    { cn: '事情已经发生了，后悔也无济于事。', en: 'What\'s done is done; regret is of no use.' },
    { cn: '光说不做是无济于事的。', en: 'Just talking without action is useless.' },
    { cn: '抱怨无济于事，还是想办法解决问题吧。', en: 'Complaining is useless; let\'s think of a way to solve the problem.' },
  ],
  '无家可归': [
    { cn: '地震之后，很多人无家可归。', en: 'After the earthquake, many people were homeless.' },
    { cn: '政府为无家可归的人提供了临时住所。', en: 'The government provided temporary housing for the homeless.' },
    { cn: '她收养了一只无家可归的流浪猫。', en: 'She adopted a homeless stray cat.' },
  ],
  '无精打采': [
    { cn: '他今天看起来无精打采的。', en: 'He looks listless today.' },
    { cn: '考试没考好，他整天无精打采。', en: 'He didn\'t do well on the exam and has been dispirited all day.' },
    { cn: '那些花因为缺水无精打采地垂着头。', en: 'Those flowers droop listlessly due to lack of water.' },
  ],
  '无可奉告': [
    { cn: '记者追问时，发言人说无可奉告。', en: 'When pressed by reporters, the spokesperson said no comment.' },
    { cn: '关于这件事，我无可奉告。', en: 'I have no comment about this matter.' },
    { cn: '公司对外发表声明表示无可奉告。', en: 'The company issued a statement saying no comment.' },
  ],
  '无可厚非': [
    { cn: '年轻人追求时尚无可厚非。', en: 'It\'s understandable for young people to pursue fashion.' },
    { cn: '他这样选择无可厚非。', en: 'His choice is not to be criticized.' },
    { cn: '在那种情况下做出这种决定无可厚非。', en: 'Making such a decision under those circumstances is understandable.' },
  ],
  '无可奈何': [
    { cn: '面对这种局面，他无可奈何。', en: 'Facing this situation, he was helpless.' },
    { cn: '无可奈何之下，她只好接受了现实。', en: 'Having no alternative, she had to accept reality.' },
    { cn: '他无可奈何地叹了口气。', en: 'He sighed helplessly.' },
  ],
  '无理': [
    { cn: '他的要求太无理了。', en: 'His demands are too unreasonable.' },
    { cn: '不要无理取闹。', en: 'Don\'t be unreasonable.' },
    { cn: '她拒绝了对方无理的请求。', en: 'She refused the other party\'s unreasonable request.' },
  ],
  '无力': [
    { cn: '他感到浑身无力。', en: 'He feels weak all over.' },
    { cn: '政府无力解决所有问题。', en: 'The government is powerless to solve all problems.' },
    { cn: '面对这种局面，他感到无力改变。', en: 'Facing this situation, he felt powerless to change it.' },
  ],
  '无论如何': [
    { cn: '无论如何，我们都不能放弃。', en: 'No matter what, we must not give up.' },
    { cn: '无论如何要把这件事做好。', en: 'By all means, this must be done well.' },
    { cn: '他无论如何也不肯承认错误。', en: 'He refuses to admit his mistake no matter what.' },
  ],
};
export default HSK9_EXAMPLES;
