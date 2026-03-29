const HSK4_EXAMPLES: Record<string, { cn: string; en: string }[]> = {
  '辩论': [
    { cn: '学生们在辩论比赛中表现很好。', en: 'The students performed well in the debate competition.' },
    { cn: '他们正在辩论这个问题。', en: 'They are debating this issue.' },
    { cn: '辩论可以提高思维能力。', en: 'Debating can improve thinking skills.' },
  ],
  '编': [
    { cn: '她正在编一条围巾。', en: 'She is knitting a scarf.' },
    { cn: '这本书是他编的。', en: 'This book was compiled by him.' },
    { cn: '奶奶喜欢用竹子编篮子。', en: 'Grandma likes to weave baskets with bamboo.' },
  ],
  '标志': [
    { cn: '这座建筑是城市的标志。', en: 'This building is a symbol of the city.' },
    { cn: '路边有一个交通标志。', en: 'There is a traffic sign by the road.' },
    { cn: '长城是中国的标志之一。', en: 'The Great Wall is one of the symbols of China.' },
  ],
  '表情': [
    { cn: '她的表情看起来很开心。', en: 'Her expression looks very happy.' },
    { cn: '他的表情突然变了。', en: 'His expression suddenly changed.' },
    { cn: '从他的表情可以看出他很紧张。', en: 'You can tell from his expression that he is nervous.' },
  ],
  '表扬': [
    { cn: '老师表扬了他的进步。', en: 'The teacher praised his progress.' },
    { cn: '她因为工作出色受到了表扬。', en: 'She was praised for her outstanding work.' },
    { cn: '孩子需要经常得到表扬。', en: 'Children need to receive praise often.' },
  ],
  '败': [
    { cn: '我们的球队败给了对手。', en: 'Our team lost to the opponent.' },
    { cn: '他在比赛中败了下来。', en: 'He was defeated in the competition.' },
    { cn: '骄傲使人失败，谦虚使人成功，败在骄傲的人太多了。', en: 'Pride leads to failure and humility to success; too many people are defeated by pride.' },
  ],
  '办事': [
    { cn: '他办事效率很高。', en: 'He handles affairs very efficiently.' },
    { cn: '我今天要去政府部门办事。', en: 'I need to go to a government office to handle some business today.' },
    { cn: '办事要认真负责。', en: 'One should be serious and responsible when handling affairs.' },
  ],
  '抱': [
    { cn: '妈妈抱着孩子走了过来。', en: 'Mom walked over holding the child.' },
    { cn: '他紧紧地抱住了她。', en: 'He hugged her tightly.' },
    { cn: '请帮我抱一下这个箱子。', en: 'Please help me carry this box.' },
  ],
  '倍': [
    { cn: '今年的收入是去年的两倍。', en: 'This year\'s income is twice that of last year.' },
    { cn: '这个房间比那个大三倍。', en: 'This room is three times bigger than that one.' },
    { cn: '他的努力是别人的好几倍。', en: 'His effort is several times that of others.' },
  ],
  '背景': [
    { cn: '这幅画的背景是一片森林。', en: 'The background of this painting is a forest.' },
    { cn: '你了解这件事的背景吗？', en: 'Do you understand the background of this matter?' },
    { cn: '他有很强的学术背景。', en: 'He has a strong academic background.' },
  ],
  '被迫': [
    { cn: '他被迫离开了自己的家乡。', en: 'He was forced to leave his hometown.' },
    { cn: '公司被迫裁员。', en: 'The company was forced to lay off employees.' },
    { cn: '她被迫放弃了自己的梦想。', en: 'She was forced to give up her dream.' },
  ],
  '笨': [
    { cn: '他并不笨，只是不够努力。', en: 'He is not stupid; he just doesn\'t try hard enough.' },
    { cn: '这个办法太笨了。', en: 'This method is too clumsy.' },
    { cn: '别说自己笨，你很聪明的。', en: 'Don\'t call yourself stupid; you are very smart.' },
  ],
  '避': [
    { cn: '他看到老板就避开了。', en: 'He avoided his boss when he saw him.' },
    { cn: '下雨了，我们找个地方避一避吧。', en: 'It\'s raining; let\'s find a place to take shelter.' },
    { cn: '这个问题避不了，必须面对。', en: 'This problem cannot be avoided; it must be faced.' },
  ],
  '避免': [
    { cn: '我们应该避免犯同样的错误。', en: 'We should avoid making the same mistakes.' },
    { cn: '为了避免迟到，他提前出发了。', en: 'To avoid being late, he set off early.' },
    { cn: '多喝水可以避免生病。', en: 'Drinking more water can help avoid getting sick.' },
  ],
  '毕业': [
    { cn: '她去年从大学毕业了。', en: 'She graduated from university last year.' },
    { cn: '毕业以后你打算做什么？', en: 'What do you plan to do after graduation?' },
    { cn: '毕业典礼非常隆重。', en: 'The graduation ceremony was very grand.' },
  ],
  '毕业生': [
    { cn: '今年的毕业生很多。', en: 'There are many graduates this year.' },
    { cn: '毕业生找工作越来越难了。', en: 'It is getting harder and harder for graduates to find jobs.' },
    { cn: '作为毕业生，他感到既兴奋又紧张。', en: 'As a graduate, he felt both excited and nervous.' },
  ],
  '薄': [
    { cn: '这件衣服太薄了，不够暖和。', en: 'This piece of clothing is too thin; it\'s not warm enough.' },
    { cn: '冬天的冰很薄，不能在上面走。', en: 'The ice is thin in winter; you can\'t walk on it.' },
    { cn: '她切了几片薄薄的面包。', en: 'She sliced a few thin pieces of bread.' },
  ],
  '不管': [
    { cn: '不管天气怎样，我都要去。', en: 'No matter what the weather is like, I\'m going.' },
    { cn: '不管遇到什么困难，我们都不放弃。', en: 'No matter what difficulties we encounter, we won\'t give up.' },
    { cn: '他不管别人怎么说，坚持自己的想法。', en: 'Regardless of what others say, he sticks to his own ideas.' },
  ],
  '不然': [
    { cn: '快走吧，不然就迟到了。', en: 'Let\'s go quickly, or else we\'ll be late.' },
    { cn: '你要多穿点衣服，不然会感冒。', en: 'You should wear more clothes, otherwise you\'ll catch a cold.' },
    { cn: '事实并不然，情况比想象的好。', en: 'That is not so; the situation is better than imagined.' },
  ],
  '步行': [
    { cn: '从这里步行到学校大约十分钟。', en: 'It takes about ten minutes to walk from here to the school.' },
    { cn: '他每天步行上班。', en: 'He walks to work every day.' },
    { cn: '步行对身体很有好处。', en: 'Walking is very good for your health.' },
  ],
  '不要紧': [
    { cn: '没关系，不要紧的。', en: 'It\'s okay; it doesn\'t matter.' },
    { cn: '迟到一会儿不要紧。', en: 'Being a little late doesn\'t matter.' },
    { cn: '这个伤口不要紧，很快就会好。', en: 'This wound is not serious; it will heal quickly.' },
  ],
  '布置': [
    { cn: '她正在布置新房间。', en: 'She is decorating the new room.' },
    { cn: '老师布置了很多作业。', en: 'The teacher assigned a lot of homework.' },
    { cn: '会场已经布置好了。', en: 'The venue has already been set up.' },
  ],
  '不在乎': [
    { cn: '他根本不在乎别人的看法。', en: 'He doesn\'t care about other people\'s opinions at all.' },
    { cn: '她不在乎钱多钱少。', en: 'She doesn\'t care whether there\'s a lot of money or not.' },
    { cn: '年轻人往往不在乎这些小事。', en: 'Young people often don\'t care about these small things.' },
  ],
  '巴士': [
    { cn: '我们可以坐巴士去机场。', en: 'We can take a bus to the airport.' },
    { cn: '这辆巴士每十分钟一班。', en: 'This bus runs every ten minutes.' },
    { cn: '巴士站就在前面。', en: 'The bus stop is just ahead.' },
  ],
  '包裹': [
    { cn: '我收到了一个包裹。', en: 'I received a package.' },
    { cn: '请把这个包裹寄到北京。', en: 'Please send this package to Beijing.' },
    { cn: '她用毯子把孩子包裹起来。', en: 'She wrapped the child in a blanket.' },
  ],
  '包含': [
    { cn: '这本书包含了很多有用的知识。', en: 'This book contains a lot of useful knowledge.' },
    { cn: '价格包含早餐吗？', en: 'Does the price include breakfast?' },
    { cn: '他的话包含着深刻的道理。', en: 'His words contain profound truths.' },
  ],
  '包括': [
    { cn: '费用包括住宿和餐饮。', en: 'The cost includes accommodation and meals.' },
    { cn: '我们班包括我一共三十人。', en: 'Our class has thirty people in total, including me.' },
    { cn: '这个计划包括三个阶段。', en: 'This plan includes three phases.' },
  ],
  '本科': [
    { cn: '她正在读本科。', en: 'She is doing her undergraduate studies.' },
    { cn: '他本科学的是计算机。', en: 'He studied computer science as an undergraduate.' },
    { cn: '本科毕业后他打算读研究生。', en: 'He plans to go to graduate school after finishing his undergraduate degree.' },
  ],
  '冰': [
    { cn: '湖面上结了一层冰。', en: 'A layer of ice formed on the lake.' },
    { cn: '请给我加点冰。', en: 'Please add some ice for me.' },
    { cn: '冬天河水会结冰。', en: 'The river water freezes in winter.' },
  ],
  '兵': [
    { cn: '他当了三年兵。', en: 'He served as a soldier for three years.' },
    { cn: '这支军队有五千名兵。', en: 'This army has five thousand soldiers.' },
    { cn: '古代打仗需要很多兵。', en: 'Ancient warfare required a lot of soldiers.' },
  ],
  '冰箱': [
    { cn: '把牛奶放进冰箱里。', en: 'Put the milk in the refrigerator.' },
    { cn: '冰箱里还有很多食物。', en: 'There is still a lot of food in the fridge.' },
    { cn: '我们需要买一个新冰箱。', en: 'We need to buy a new refrigerator.' },
  ],
  '冰雪': [
    { cn: '北方的冬天到处是冰雪。', en: 'In the northern winter, there is ice and snow everywhere.' },
    { cn: '孩子们在冰雪中玩耍。', en: 'The children are playing in the ice and snow.' },
    { cn: '冰雪融化后，春天就来了。', en: 'After the ice and snow melt, spring arrives.' },
  ],
  '摆': [
    { cn: '请把书摆整齐。', en: 'Please arrange the books neatly.' },
    { cn: '桌上摆着一束花。', en: 'A bouquet of flowers is placed on the table.' },
    { cn: '钟摆在不停地摆动。', en: 'The pendulum keeps swinging back and forth.' },
  ],
  '摆动': [
    { cn: '树枝在风中摆动。', en: 'The tree branches sway in the wind.' },
    { cn: '她走路时手臂自然地摆动。', en: 'Her arms swing naturally when she walks.' },
    { cn: '钟摆不停地摆动着。', en: 'The pendulum swings back and forth ceaselessly.' },
  ],
  '百货': [
    { cn: '这家百货商店很大。', en: 'This department store is very big.' },
    { cn: '她在百货公司买了一件外套。', en: 'She bought a coat at the department store.' },
    { cn: '百货大楼里什么都有。', en: 'The department store has everything.' },
  ],
  '摆脱': [
    { cn: '他终于摆脱了困境。', en: 'He finally got out of the difficult situation.' },
    { cn: '她想摆脱过去的痛苦。', en: 'She wants to break free from past pain.' },
    { cn: '我们必须摆脱旧的思维方式。', en: 'We must get rid of old ways of thinking.' },
  ],
  '宝': [
    { cn: '这颗宝石非常珍贵。', en: 'This gem is very precious.' },
    { cn: '妈妈叫她的孩子小宝。', en: 'Mom calls her child little treasure.' },
    { cn: '知识是无价之宝。', en: 'Knowledge is a priceless treasure.' },
  ],
  '宝宝': [
    { cn: '宝宝今天会走路了。', en: 'The baby can walk today.' },
    { cn: '她刚生了一个宝宝。', en: 'She just had a baby.' },
    { cn: '宝宝睡着了，别吵。', en: 'The baby is sleeping; don\'t make noise.' },
  ],
  '宝贝': [
    { cn: '这是我最珍贵的宝贝。', en: 'This is my most precious treasure.' },
    { cn: '她叫女儿宝贝。', en: 'She calls her daughter darling.' },
    { cn: '博物馆里收藏了很多宝贝。', en: 'The museum houses many treasures.' },
  ],
  '宝贵': [
    { cn: '时间是最宝贵的。', en: 'Time is the most precious thing.' },
    { cn: '谢谢你提供的宝贵意见。', en: 'Thank you for your valuable advice.' },
    { cn: '这是一次宝贵的经验。', en: 'This was a valuable experience.' },
  ],
  '保密': [
    { cn: '这件事你一定要保密。', en: 'You must keep this matter confidential.' },
    { cn: '公司要求员工对客户信息保密。', en: 'The company requires employees to keep client information confidential.' },
    { cn: '他很擅长保密。', en: 'He is very good at keeping secrets.' },
  ],
  '宝石': [
    { cn: '她戴了一条宝石项链。', en: 'She wore a gemstone necklace.' },
    { cn: '这颗宝石价值连城。', en: 'This gemstone is priceless.' },
    { cn: '宝石在灯光下闪闪发光。', en: 'The gem sparkles under the light.' },
  ],
  '保守': [
    { cn: '他的想法比较保守。', en: 'His ideas are rather conservative.' },
    { cn: '你能帮我保守这个秘密吗？', en: 'Can you keep this secret for me?' },
    { cn: '老一代人往往比较保守。', en: 'The older generation tends to be more conservative.' },
  ],
  '比分': [
    { cn: '现在的比分是三比二。', en: 'The current score is three to two.' },
    { cn: '最后的比分让所有人都感到意外。', en: 'The final score surprised everyone.' },
    { cn: '比赛快结束了，比分还没有变化。', en: 'The game is almost over, and the score hasn\'t changed.' },
  ],
  '传统': [
    { cn: '春节是中国的传统节日。', en: 'Spring Festival is a traditional Chinese holiday.' },
    { cn: '我们应该保护传统文化。', en: 'We should protect traditional culture.' },
    { cn: '这种传统已经延续了几百年。', en: 'This tradition has continued for hundreds of years.' },
  ],
  '穿上': [
    { cn: '天冷了，穿上外套吧。', en: 'It\'s cold; put on your coat.' },
    { cn: '她穿上了新买的裙子。', en: 'She put on the skirt she just bought.' },
    { cn: '穿上这双鞋试试。', en: 'Try putting on this pair of shoes.' },
  ],
  '窗户': [
    { cn: '请把窗户打开。', en: 'Please open the window.' },
    { cn: '窗户外面的风景很美。', en: 'The scenery outside the window is beautiful.' },
    { cn: '她站在窗户旁边看雨。', en: 'She stood by the window watching the rain.' },
  ],
  '窗台': [
    { cn: '窗台上放着一盆花。', en: 'There is a pot of flowers on the window sill.' },
    { cn: '猫喜欢趴在窗台上晒太阳。', en: 'The cat likes to lie on the window ledge and sunbathe.' },
    { cn: '她把书放在窗台上了。', en: 'She put the book on the window sill.' },
  ],
  '窗子': [
    { cn: '这个房间的窗子很大。', en: 'The window of this room is very large.' },
    { cn: '请关上窗子，外面太吵了。', en: 'Please close the window; it\'s too noisy outside.' },
    { cn: '阳光从窗子照进来。', en: 'Sunlight shines in through the window.' },
  ],
  '唱片': [
    { cn: '他收藏了很多老唱片。', en: 'He has collected many old records.' },
    { cn: '这张唱片卖得很好。', en: 'This album is selling very well.' },
    { cn: '她出了一张新唱片。', en: 'She released a new album.' },
  ],
  '茶叶': [
    { cn: '这是上好的茶叶。', en: 'This is premium tea.' },
    { cn: '中国的茶叶很有名。', en: 'Chinese tea is very famous.' },
    { cn: '他送了我一盒茶叶。', en: 'He gave me a box of tea.' },
  ],
  '常识': [
    { cn: '这是基本的常识。', en: 'This is basic common sense.' },
    { cn: '每个人都应该有一些科学常识。', en: 'Everyone should have some basic scientific knowledge.' },
    { cn: '交通安全常识很重要。', en: 'Traffic safety knowledge is very important.' },
  ],
  '长途': [
    { cn: '他经常出长途差。', en: 'He often goes on long-distance business trips.' },
    { cn: '长途旅行很累人。', en: 'Long-distance travel is very tiring.' },
    { cn: '我们坐了一趟长途汽车。', en: 'We took a long-distance bus.' },
  ],
  '潮': [
    { cn: '这件衣服很潮，年轻人都喜欢。', en: 'This outfit is very trendy; young people all like it.' },
    { cn: '南方的春天特别潮。', en: 'Spring in the south is particularly humid.' },
    { cn: '海潮一浪接一浪地涌来。', en: 'The tides surge in wave after wave.' },
  ],
  '潮流': [
    { cn: '他总是走在潮流的前面。', en: 'He is always ahead of the trend.' },
    { cn: '时尚潮流变化很快。', en: 'Fashion trends change very quickly.' },
    { cn: '我们不能盲目追随潮流。', en: 'We shouldn\'t blindly follow trends.' },
  ],
  '潮湿': [
    { cn: '南方的天气比较潮湿。', en: 'The weather in the south is relatively humid.' },
    { cn: '地下室很潮湿。', en: 'The basement is very damp.' },
    { cn: '潮湿的环境容易长霉。', en: 'A damp environment easily grows mold.' },
  ],
  '彻底': [
    { cn: '房间需要彻底打扫一下。', en: 'The room needs a thorough cleaning.' },
    { cn: '他彻底改变了自己的生活方式。', en: 'He completely changed his lifestyle.' },
    { cn: '这个问题必须彻底解决。', en: 'This problem must be thoroughly resolved.' },
  ],
  '沉': [
    { cn: '石头沉到了水底。', en: 'The stone sank to the bottom of the water.' },
    { cn: '这个箱子太沉了，搬不动。', en: 'This box is too heavy to move.' },
    { cn: '船慢慢地沉下去了。', en: 'The boat slowly sank.' },
  ],
  '沉默': [
    { cn: '他听到这个消息后沉默了很久。', en: 'He was silent for a long time after hearing this news.' },
    { cn: '沉默不代表同意。', en: 'Silence does not mean agreement.' },
    { cn: '她是一个沉默寡言的人。', en: 'She is a person of few words.' },
  ],
  '沉重': [
    { cn: '他的心情很沉重。', en: 'His mood is very heavy.' },
    { cn: '这个消息给大家带来了沉重的打击。', en: 'This news dealt a heavy blow to everyone.' },
    { cn: '他迈着沉重的脚步走开了。', en: 'He walked away with heavy steps.' },
  ],
  '承担': [
    { cn: '你必须承担这个责任。', en: 'You must take on this responsibility.' },
    { cn: '公司承担了所有的费用。', en: 'The company bore all the costs.' },
    { cn: '他勇敢地承担了这项任务。', en: 'He bravely took on this task.' },
  ],
  '承认': [
    { cn: '他承认了自己的错误。', en: 'He admitted his mistake.' },
    { cn: '你必须承认这个事实。', en: 'You must acknowledge this fact.' },
    { cn: '她不愿意承认失败。', en: 'She is unwilling to admit defeat.' },
  ],
  '成人': [
    { cn: '他已经是成人了，可以自己做决定。', en: 'He is already an adult and can make his own decisions.' },
    { cn: '成人票多少钱一张？', en: 'How much is an adult ticket?' },
    { cn: '这部电影只适合成人观看。', en: 'This movie is only suitable for adults.' },
  ],
  '诚实': [
    { cn: '做人要诚实。', en: 'One should be honest.' },
    { cn: '他是一个诚实的人。', en: 'He is an honest person.' },
    { cn: '诚实是最好的品质之一。', en: 'Honesty is one of the best qualities.' },
  ],
  '承受': [
    { cn: '他已经承受不了这么大的压力了。', en: 'He can no longer bear such great pressure.' },
    { cn: '这座桥能承受多少重量？', en: 'How much weight can this bridge bear?' },
    { cn: '她默默地承受着一切。', en: 'She silently endured everything.' },
  ],
  '诚信': [
    { cn: '做生意最重要的是诚信。', en: 'The most important thing in business is good faith.' },
    { cn: '诚信是做人的基本原则。', en: 'Integrity is a basic principle of being a person.' },
    { cn: '这家公司以诚信著称。', en: 'This company is known for its integrity.' },
  ],
  '程序': [
    { cn: '请按照程序办事。', en: 'Please follow the procedures.' },
    { cn: '他是一名程序员。', en: 'He is a programmer.' },
    { cn: '这个程序运行得很快。', en: 'This program runs very fast.' },
  ],
  '迟到': [
    { cn: '对不起，我迟到了。', en: 'Sorry, I\'m late.' },
    { cn: '他上班经常迟到。', en: 'He is often late for work.' },
    { cn: '考试不能迟到。', en: 'You can\'t be late for the exam.' },
  ],
  '虫子': [
    { cn: '她很怕虫子。', en: 'She is very afraid of insects.' },
    { cn: '花园里有很多虫子。', en: 'There are many bugs in the garden.' },
    { cn: '这种虫子对庄稼有害。', en: 'This kind of insect is harmful to crops.' },
  ],
  '纯': [
    { cn: '这是纯棉的衣服。', en: 'This is pure cotton clothing.' },
    { cn: '她的笑容很纯。', en: 'Her smile is very pure.' },
    { cn: '这瓶酒是纯粮酿造的。', en: 'This bottle of wine is brewed from pure grain.' },
  ],
  '纯净水': [
    { cn: '请给我一瓶纯净水。', en: 'Please give me a bottle of purified water.' },
    { cn: '纯净水比自来水干净。', en: 'Purified water is cleaner than tap water.' },
    { cn: '超市里有很多牌子的纯净水。', en: 'There are many brands of purified water in the supermarket.' },
  ],
  '抄': [
    { cn: '不要抄别人的作业。', en: 'Don\'t copy other people\'s homework.' },
    { cn: '请把这段话抄下来。', en: 'Please copy this passage down.' },
    { cn: '考试的时候不能抄。', en: 'You can\'t cheat during exams.' },
  ],
  '抄写': [
    { cn: '老师让我们抄写课文。', en: 'The teacher asked us to copy the text.' },
    { cn: '他每天抄写生词。', en: 'He copies new words every day.' },
    { cn: '抄写可以帮助记忆。', en: 'Copying can help with memorization.' },
  ],
  '称赞': [
    { cn: '大家都称赞她的勇气。', en: 'Everyone praised her courage.' },
    { cn: '老师称赞了他的作文。', en: 'The teacher praised his essay.' },
    { cn: '他的表现受到了同事们的称赞。', en: 'His performance was praised by his colleagues.' },
  ],
  '尺': [
    { cn: '这块布有三尺长。', en: 'This piece of cloth is three chi long.' },
    { cn: '一尺大约等于三十三厘米。', en: 'One chi is approximately thirty-three centimeters.' },
    { cn: '裁缝用尺量了一下布料。', en: 'The tailor measured the fabric with a ruler.' },
  ],
  '吃惊': [
    { cn: '听到这个消息，我很吃惊。', en: 'I was very surprised to hear this news.' },
    { cn: '他的变化让人吃惊。', en: 'His transformation was astonishing.' },
    { cn: '她吃惊地张大了嘴巴。', en: 'She opened her mouth wide in surprise.' },
  ],
  '冲': [
    { cn: '他冲了一杯咖啡。', en: 'He brewed a cup of coffee.' },
    { cn: '大水冲走了桥。', en: 'The flood washed away the bridge.' },
    { cn: '请用热水冲一下。', en: 'Please rinse it with hot water.' },
  ],
  '充电': [
    { cn: '我的手机需要充电了。', en: 'My phone needs to be charged.' },
    { cn: '充电大概需要两个小时。', en: 'Charging takes about two hours.' },
    { cn: '他利用周末给自己充电。', en: 'He uses weekends to recharge himself.' },
  ],
  '充电器': [
    { cn: '你带充电器了吗？', en: 'Did you bring a charger?' },
    { cn: '我的充电器坏了。', en: 'My charger is broken.' },
    { cn: '这个充电器可以给手机快速充电。', en: 'This charger can charge a phone quickly.' },
  ],
  '充分': [
    { cn: '我们要做好充分的准备。', en: 'We need to make thorough preparations.' },
    { cn: '他有充分的理由拒绝。', en: 'He has ample reasons to refuse.' },
    { cn: '请充分利用好这次机会。', en: 'Please make full use of this opportunity.' },
  ],
  '抽': [
    { cn: '他从口袋里抽出一张纸。', en: 'He pulled out a piece of paper from his pocket.' },
    { cn: '请抽一张卡片。', en: 'Please draw a card.' },
    { cn: '我抽不出时间去看电影。', en: 'I can\'t find the time to go see a movie.' },
  ],
  '抽奖': [
    { cn: '今天的活动有抽奖环节。', en: 'Today\'s event has a lucky draw.' },
    { cn: '她在抽奖中中了一等奖。', en: 'She won the first prize in the raffle.' },
    { cn: '很多人排队参加抽奖。', en: 'Many people lined up to join the lottery.' },
  ],
  '抽烟': [
    { cn: '这里不能抽烟。', en: 'You can\'t smoke here.' },
    { cn: '他已经戒了抽烟的习惯。', en: 'He has already quit the habit of smoking.' },
    { cn: '抽烟对健康有害。', en: 'Smoking is harmful to health.' },
  ],
  '出售': [
    { cn: '这套房子正在出售。', en: 'This house is for sale.' },
    { cn: '超市出售各种日用品。', en: 'The supermarket sells various daily necessities.' },
    { cn: '门票在网上出售。', en: 'Tickets are sold online.' },
  ],
  '出色': [
    { cn: '他的工作表现非常出色。', en: 'His work performance is outstanding.' },
    { cn: '她是一位出色的老师。', en: 'She is a remarkable teacher.' },
    { cn: '运动员们的表现很出色。', en: 'The athletes\' performance was excellent.' },
  ],
  '出席': [
    { cn: '他没有出席今天的会议。', en: 'He did not attend today\'s meeting.' },
    { cn: '所有的领导都出席了典礼。', en: 'All the leaders attended the ceremony.' },
    { cn: '请准时出席明天的活动。', en: 'Please attend tomorrow\'s event on time.' },
  ],
  '春季': [
    { cn: '春季是播种的好时候。', en: 'Spring is a good time for sowing.' },
    { cn: '春季的天气很舒适。', en: 'The weather in spring is very pleasant.' },
    { cn: '学校春季学期已经开始了。', en: 'The school\'s spring semester has already started.' },
  ],
  '产品': [
    { cn: '这家公司的产品质量很好。', en: 'The products of this company are of high quality.' },
    { cn: '新产品下个月就上市了。', en: 'The new product will be launched next month.' },
    { cn: '他们在开发新产品。', en: 'They are developing new products.' },
  ],
  '尺寸': [
    { cn: '请问这件衣服有什么尺寸？', en: 'What sizes does this piece of clothing come in?' },
    { cn: '这个尺寸不太合适。', en: 'This size doesn\'t quite fit.' },
    { cn: '请先量一下尺寸。', en: 'Please measure the dimensions first.' },
  ],
  '尺子': [
    { cn: '你有尺子吗？我需要量一下。', en: 'Do you have a ruler? I need to measure something.' },
    { cn: '尺子放在铅笔盒里。', en: 'The ruler is in the pencil case.' },
    { cn: '用尺子画一条直线。', en: 'Use a ruler to draw a straight line.' },
  ],
  '处': [
    { cn: '他们在一起相处得很好。', en: 'They get along very well together.' },
    { cn: '身处异乡，他很想念家人。', en: 'Being in a foreign land, he misses his family very much.' },
    { cn: '这件事不好处理。', en: 'This matter is not easy to handle.' },
  ],
  '处于': [
    { cn: '公司目前处于快速发展阶段。', en: 'The company is currently in a phase of rapid development.' },
    { cn: '他处于非常困难的境地。', en: 'He is in a very difficult situation.' },
    { cn: '这个项目处于初期阶段。', en: 'This project is in its early stage.' },
  ],
  '措施': [
    { cn: '政府采取了有效的措施。', en: 'The government took effective measures.' },
    { cn: '我们必须采取紧急措施。', en: 'We must take emergency measures.' },
    { cn: '安全措施很重要。', en: 'Safety measures are very important.' },
  ],
  '财产': [
    { cn: '他的财产都留给了孩子。', en: 'He left all his property to his children.' },
    { cn: '我们要保护自己的财产。', en: 'We need to protect our property.' },
    { cn: '法律保护公民的财产权。', en: 'The law protects citizens\' property rights.' },
  ],
  '财富': [
    { cn: '健康是最大的财富。', en: 'Health is the greatest wealth.' },
    { cn: '他积累了大量的财富。', en: 'He has accumulated a large amount of wealth.' },
    { cn: '知识也是一种财富。', en: 'Knowledge is also a kind of wealth.' },
  ],
  '材料': [
    { cn: '盖房子需要很多材料。', en: 'Building a house requires a lot of materials.' },
    { cn: '请准备好面试的材料。', en: 'Please prepare the materials for the interview.' },
    { cn: '这种材料很结实。', en: 'This material is very sturdy.' },
  ],
  '测': [
    { cn: '护士给他测了体温。', en: 'The nurse took his temperature.' },
    { cn: '老师让我们测一下自己的水平。', en: 'The teacher asked us to test our own level.' },
    { cn: '我们需要测一下这条河的深度。', en: 'We need to measure the depth of this river.' },
  ],
  '测量': [
    { cn: '工人正在测量道路的宽度。', en: 'Workers are measuring the width of the road.' },
    { cn: '请先测量一下房间的面积。', en: 'Please measure the area of the room first.' },
    { cn: '测量结果很精确。', en: 'The measurement results are very precise.' },
  ],
  '测试': [
    { cn: '明天有一个英语测试。', en: 'There is an English test tomorrow.' },
    { cn: '这款软件正在测试中。', en: 'This software is being tested.' },
    { cn: '我们需要对产品进行测试。', en: 'We need to test the product.' },
  ],
  '刺激': [
    { cn: '这部电影太刺激了。', en: 'This movie is so thrilling.' },
    { cn: '辣椒会刺激肠胃。', en: 'Chili peppers can irritate the stomach.' },
    { cn: '消费刺激了经济增长。', en: 'Consumption stimulated economic growth.' },
  ],
  '词汇': [
    { cn: '学习语言需要积累词汇。', en: 'Learning a language requires accumulating vocabulary.' },
    { cn: '他的英语词汇量很大。', en: 'He has a large English vocabulary.' },
    { cn: '这本书包含很多专业词汇。', en: 'This book contains many technical terms.' },
  ],
  '从此': [
    { cn: '从此以后，他变了一个人。', en: 'From then on, he became a different person.' },
    { cn: '他们从此再也没有见过面。', en: 'They never saw each other again after that.' },
    { cn: '从此，她开始了新的生活。', en: 'From then on, she started a new life.' },
  ],
  '促进': [
    { cn: '运动可以促进健康。', en: 'Exercise can promote health.' },
    { cn: '这项政策促进了经济发展。', en: 'This policy promoted economic development.' },
    { cn: '交流可以促进友谊。', en: 'Communication can promote friendship.' },
  ],
  '促使': [
    { cn: '是什么促使你做出这个决定的？', en: 'What prompted you to make this decision?' },
    { cn: '这件事促使他改变了想法。', en: 'This matter prompted him to change his mind.' },
    { cn: '老师的鼓励促使他更加努力。', en: 'The teacher\'s encouragement urged him to work harder.' },
  ],
  '促销': [
    { cn: '超市正在搞促销活动。', en: 'The supermarket is running a promotion.' },
    { cn: '这款商品正在促销。', en: 'This product is on sale.' },
    { cn: '促销价格比平时便宜很多。', en: 'The promotional price is much cheaper than usual.' },
  ],
  '擦': [
    { cn: '请擦一下桌子。', en: 'Please wipe the table.' },
    { cn: '他擦了擦眼泪。', en: 'He wiped away his tears.' },
    { cn: '我的鞋擦得干干净净。', en: 'My shoes are polished clean.' },
  ],
  '参考': [
    { cn: '这本书可以作为参考。', en: 'This book can be used as a reference.' },
    { cn: '你的意见我会参考的。', en: 'I will take your opinion into consideration.' },
    { cn: '参考资料在图书馆里。', en: 'The reference materials are in the library.' },
  ],
  '参与': [
    { cn: '欢迎大家积极参与。', en: 'Everyone is welcome to actively participate.' },
    { cn: '他参与了这个项目。', en: 'He participated in this project.' },
    { cn: '参与讨论的人很多。', en: 'Many people participated in the discussion.' },
  ],
  '操场': [
    { cn: '学生们在操场上踢球。', en: 'The students are playing football on the field.' },
    { cn: '操场很大，可以举办运动会。', en: 'The field is large enough to hold a sports meet.' },
    { cn: '早上他在操场跑步。', en: 'He runs on the field in the morning.' },
  ],
  '操作': [
    { cn: '这台机器操作简单。', en: 'This machine is easy to operate.' },
    { cn: '请按照说明书操作。', en: 'Please operate according to the instructions.' },
    { cn: '他正在学习操作新设备。', en: 'He is learning to operate the new equipment.' },
  ],
  '刺': [
    { cn: '小心，玫瑰花上有刺。', en: 'Be careful; there are thorns on the rose.' },
    { cn: '他的手被刺扎了一下。', en: 'His hand was pricked by a thorn.' },
    { cn: '鱼骨头刺了我的嗓子。', en: 'A fish bone pricked my throat.' },
  ],
  '粗': [
    { cn: '这根绳子太粗了。', en: 'This rope is too thick.' },
    { cn: '他的嗓门很粗。', en: 'His voice is very rough.' },
    { cn: '这棵树的树干很粗。', en: 'The trunk of this tree is very thick.' },
  ],
  '粗心': [
    { cn: '他做事太粗心了。', en: 'He is too careless in his work.' },
    { cn: '粗心的人容易犯错。', en: 'Careless people tend to make mistakes.' },
    { cn: '因为粗心，他考试丢了很多分。', en: 'Because of carelessness, he lost many points on the exam.' },
  ],
  '采访': [
    { cn: '记者正在采访一位明星。', en: 'The reporter is interviewing a celebrity.' },
    { cn: '你能接受我们的采访吗？', en: 'Could you accept our interview?' },
    { cn: '这篇采访报道写得很好。', en: 'This interview report is very well written.' },
  ],
  '此': [
    { cn: '此事我已经知道了。', en: 'I already know about this matter.' },
    { cn: '到此为止吧。', en: 'Let\'s stop here.' },
    { cn: '此人非常有才华。', en: 'This person is very talented.' },
  ],
  '此外': [
    { cn: '此外，我还有一件事要说。', en: 'Besides, I have one more thing to say.' },
    { cn: '他会说英语，此外还会法语。', en: 'He speaks English, and in addition, French.' },
    { cn: '此外，我们需要更多的资金。', en: 'Moreover, we need more funding.' },
  ],
  '底': [
    { cn: '湖底有很多石头。', en: 'There are many stones at the bottom of the lake.' },
    { cn: '他到底想要什么？', en: 'What does he really want?' },
    { cn: '杯子的底部有个裂缝。', en: 'There is a crack at the bottom of the cup.' },
  ],
  '电灯': [
    { cn: '请打开电灯。', en: 'Please turn on the light.' },
    { cn: '电灯坏了，需要换一个。', en: 'The light is broken and needs to be replaced.' },
    { cn: '爱迪生发明了电灯。', en: 'Edison invented the electric light.' },
  ],
  '电梯': [
    { cn: '我们坐电梯上去吧。', en: 'Let\'s take the elevator up.' },
    { cn: '电梯正在维修。', en: 'The elevator is under repair.' },
    { cn: '这栋楼有两部电梯。', en: 'This building has two elevators.' },
  ],
  '电源': [
    { cn: '请接上电源。', en: 'Please connect to the power source.' },
    { cn: '电源在哪里？', en: 'Where is the power outlet?' },
    { cn: '关掉电源再离开。', en: 'Turn off the power before leaving.' },
  ],
  '电动车': [
    { cn: '越来越多的人买电动车了。', en: 'More and more people are buying electric vehicles.' },
    { cn: '电动车比较环保。', en: 'Electric vehicles are more environmentally friendly.' },
    { cn: '他骑电动车上班。', en: 'He rides an electric vehicle to work.' },
  ],
  '点名': [
    { cn: '老师开始点名了。', en: 'The teacher started taking roll call.' },
    { cn: '会议一开始就点名。', en: 'Roll call was taken at the start of the meeting.' },
    { cn: '他被老师点名回答问题。', en: 'He was called on by the teacher to answer a question.' },
  ],
  '典型': [
    { cn: '这是一个典型的例子。', en: 'This is a typical example.' },
    { cn: '他是典型的中国人性格。', en: 'He has a typical Chinese personality.' },
    { cn: '这种病的典型症状是发烧。', en: 'The typical symptom of this disease is fever.' },
  ],
  '锻炼': [
    { cn: '他每天早上锻炼身体。', en: 'He exercises every morning.' },
    { cn: '锻炼对身体有好处。', en: 'Exercise is good for the body.' },
    { cn: '多锻炼可以增强体质。', en: 'More exercise can strengthen your constitution.' },
  ],
  '对比': [
    { cn: '把这两个方案对比一下。', en: 'Compare these two plans.' },
    { cn: '对比之下，这个更好。', en: 'By comparison, this one is better.' },
    { cn: '价格对比后再做决定。', en: 'Make a decision after comparing prices.' },
  ],
  '对付': [
    { cn: '他很会对付这种情况。', en: 'He is good at dealing with this kind of situation.' },
    { cn: '这个问题不太好对付。', en: 'This problem is not easy to deal with.' },
    { cn: '中午随便对付一下就行了。', en: 'Just make do with something simple for lunch.' },
  ],
  '对于': [
    { cn: '对于这个问题，你怎么看？', en: 'What do you think about this issue?' },
    { cn: '对于初学者来说，这很难。', en: 'For beginners, this is very difficult.' },
    { cn: '对于他的建议，我表示赞同。', en: 'Regarding his suggestion, I agree.' },
  ],
  '多次': [
    { cn: '我多次去过北京。', en: 'I have been to Beijing many times.' },
    { cn: '他多次提醒我注意安全。', en: 'He reminded me many times to pay attention to safety.' },
    { cn: '这个实验经过了多次验证。', en: 'This experiment has been verified multiple times.' },
  ],
  '多年': [
    { cn: '他们是多年的好朋友。', en: 'They have been good friends for many years.' },
    { cn: '多年以后，他终于回到了家乡。', en: 'After many years, he finally returned to his hometown.' },
    { cn: '他有多年的教学经验。', en: 'He has many years of teaching experience.' },
  ],
  '多样': [
    { cn: '这里的食物种类很多样。', en: 'The types of food here are very diverse.' },
    { cn: '文化的多样性应该被尊重。', en: 'Cultural diversity should be respected.' },
    { cn: '多样的活动让大家都很开心。', en: 'The diverse activities made everyone very happy.' },
  ],
  '多种': [
    { cn: '这家店提供多种口味的冰淇淋。', en: 'This shop offers multiple flavors of ice cream.' },
    { cn: '解决问题有多种方法。', en: 'There are multiple ways to solve the problem.' },
    { cn: '他会说多种语言。', en: 'He can speak multiple languages.' },
  ],
  '大巴': [
    { cn: '我们坐大巴去旅游。', en: 'We take a coach for the trip.' },
    { cn: '大巴上有空调。', en: 'The coach has air conditioning.' },
    { cn: '大巴每小时一班。', en: 'The coach runs once every hour.' },
  ],
  '大多': [
    { cn: '大多数人都同意这个方案。', en: 'Most people agree with this plan.' },
    { cn: '他的朋友大多是同学。', en: 'Most of his friends are classmates.' },
    { cn: '大多数时候他都很安静。', en: 'Most of the time he is very quiet.' },
  ],
  '大方': [
    { cn: '她穿着很大方。', en: 'She dresses very elegantly.' },
    { cn: '他对朋友很大方。', en: 'He is very generous to his friends.' },
    { cn: '她举止大方，给人留下了好印象。', en: 'Her poised manner left a good impression.' },
  ],
  '大规模': [
    { cn: '公司计划进行大规模招聘。', en: 'The company plans to do large-scale hiring.' },
    { cn: '大规模的建设正在进行中。', en: 'Large-scale construction is underway.' },
    { cn: '这是一次大规模的活动。', en: 'This is a large-scale event.' },
  ],
  '大哥': [
    { cn: '大哥对弟弟妹妹们很好。', en: 'The eldest brother is very good to his younger siblings.' },
    { cn: '我的大哥在上海工作。', en: 'My eldest brother works in Shanghai.' },
    { cn: '大哥，请问火车站怎么走？', en: 'Excuse me sir, how do I get to the train station?' },
  ],
  '大会': [
    { cn: '下周要开一个大会。', en: 'There is a general meeting next week.' },
    { cn: '这次大会有来自世界各地的代表。', en: 'This convention has representatives from all over the world.' },
    { cn: '大会上通过了几项重要决议。', en: 'Several important resolutions were passed at the assembly.' },
  ],
  '大姐': [
    { cn: '大姐在银行上班。', en: 'My eldest sister works at a bank.' },
    { cn: '大姐，这个多少钱？', en: 'Ma\'am, how much is this?' },
    { cn: '她是我们家的大姐。', en: 'She is the eldest sister in our family.' },
  ],
  '大楼': [
    { cn: '这座大楼有二十层。', en: 'This building has twenty floors.' },
    { cn: '办公大楼就在前面。', en: 'The office building is just ahead.' },
    { cn: '他们在盖一栋新大楼。', en: 'They are building a new building.' },
  ],
  '大陆': [
    { cn: '非洲是世界第二大的大陆。', en: 'Africa is the second largest continent in the world.' },
    { cn: '他从大陆来到了岛上。', en: 'He came to the island from the mainland.' },
    { cn: '大陆和台湾隔着一条海峡。', en: 'The mainland and Taiwan are separated by a strait.' },
  ],
  '大妈': [
    { cn: '大妈热情地招呼我们。', en: 'The auntie warmly greeted us.' },
    { cn: '隔壁的大妈人很好。', en: 'The auntie next door is very nice.' },
    { cn: '大妈们在广场上跳舞。', en: 'The aunties are dancing in the square.' },
  ],
  '大型': [
    { cn: '这是一个大型购物中心。', en: 'This is a large shopping center.' },
    { cn: '公司举办了一场大型活动。', en: 'The company held a large-scale event.' },
    { cn: '大型机器已经运到了工地。', en: 'The large machines have been delivered to the construction site.' },
  ],
  '大爷': [
    { cn: '大爷，请问去医院怎么走？', en: 'Sir, how do I get to the hospital?' },
    { cn: '大爷每天在公园里散步。', en: 'The elderly man takes a walk in the park every day.' },
    { cn: '隔壁的大爷会下棋。', en: 'The elderly man next door can play chess.' },
  ],
  '大众': [
    { cn: '这款产品面向大众。', en: 'This product is aimed at the general public.' },
    { cn: '大众的意见很重要。', en: 'Public opinion is very important.' },
    { cn: '电视是大众传播的重要工具。', en: 'Television is an important tool for mass communication.' },
  ],
  '袋': [
    { cn: '他提着一袋水果。', en: 'He is carrying a bag of fruit.' },
    { cn: '请给我一个塑料袋。', en: 'Please give me a plastic bag.' },
    { cn: '这袋米有十斤重。', en: 'This bag of rice weighs ten jin.' },
  ],
  '戴': [
    { cn: '她戴了一副新眼镜。', en: 'She is wearing a new pair of glasses.' },
    { cn: '冬天要戴手套。', en: 'You should wear gloves in winter.' },
    { cn: '他戴着一顶帽子。', en: 'He is wearing a hat.' },
  ],
  '代替': [
    { cn: '没有人能代替她的位置。', en: 'No one can take her place.' },
    { cn: '电脑正在代替许多传统工具。', en: 'Computers are replacing many traditional tools.' },
    { cn: '请你代替我去开会。', en: 'Please attend the meeting in my place.' },
  ],
  '待遇': [
    { cn: '这家公司的待遇不错。', en: 'The pay at this company is pretty good.' },
    { cn: '员工对待遇不太满意。', en: 'The employees are not very satisfied with the compensation.' },
    { cn: '他享受的是教授级别的待遇。', en: 'He enjoys treatment at the professor level.' },
  ],
  '淡': [
    { cn: '这个汤太淡了，加点盐吧。', en: 'This soup is too bland; add some salt.' },
    { cn: '她穿了一件淡蓝色的衣服。', en: 'She wore a light blue dress.' },
    { cn: '他们的关系越来越淡了。', en: 'Their relationship is becoming more and more distant.' },
  ],
  '答案': [
    { cn: '你知道正确答案吗？', en: 'Do you know the correct answer?' },
    { cn: '答案写在卷子背面。', en: 'The answers are written on the back of the test paper.' },
    { cn: '这个问题没有标准答案。', en: 'This question has no standard answer.' },
  ],
  '得意': [
    { cn: '他考了第一名，非常得意。', en: 'He got first place and was very pleased with himself.' },
    { cn: '不要太得意，要保持谦虚。', en: 'Don\'t be too complacent; stay humble.' },
    { cn: '她得意地笑了。', en: 'She smiled smugly.' },
  ],
  '地面': [
    { cn: '地面上湿滑，小心走路。', en: 'The ground is slippery; walk carefully.' },
    { cn: '飞机即将降落到地面。', en: 'The plane is about to land on the ground.' },
    { cn: '他把地面打扫得很干净。', en: 'He swept the floor very clean.' },
  ],
  '地位': [
    { cn: '她在公司的地位很高。', en: 'She has a high position in the company.' },
    { cn: '教育的地位越来越重要。', en: 'The status of education is becoming increasingly important.' },
    { cn: '中国的国际地位不断提高。', en: 'China\'s international standing continues to rise.' },
  ],
  '地下': [
    { cn: '地下室很凉快。', en: 'The basement is very cool.' },
    { cn: '这条河在地下流动。', en: 'This river flows underground.' },
    { cn: '地下停车场在一楼下面。', en: 'The underground parking lot is below the first floor.' },
  ],
  '地址': [
    { cn: '请告诉我你的地址。', en: 'Please tell me your address.' },
    { cn: '他搬家后换了新地址。', en: 'He changed to a new address after moving.' },
    { cn: '这个地址是错的。', en: 'This address is wrong.' },
  ],
  '定': [
    { cn: '我们定好了出发时间。', en: 'We have set the departure time.' },
    { cn: '这件事还没有定下来。', en: 'This matter has not been determined yet.' },
    { cn: '他定了一个目标。', en: 'He set a goal.' },
  ],
  '的确': [
    { cn: '他说的的确是事实。', en: 'What he said is indeed the truth.' },
    { cn: '今天的确很冷。', en: 'It is indeed very cold today.' },
    { cn: '这本书的确值得一读。', en: 'This book is indeed worth reading.' },
  ],
  '敌人': [
    { cn: '我们要团结起来，打败敌人。', en: 'We must unite to defeat the enemy.' },
    { cn: '他把困难看成自己的敌人。', en: 'He sees difficulties as his enemy.' },
    { cn: '敌人已经被包围了。', en: 'The enemy has been surrounded.' },
  ],
  '动画片': [
    { cn: '孩子们喜欢看动画片。', en: 'Children like to watch cartoons.' },
    { cn: '这部动画片很受欢迎。', en: 'This animated film is very popular.' },
    { cn: '他小时候最爱看动画片。', en: 'He loved watching cartoons when he was little.' },
  ],
  '动摇': [
    { cn: '他的决心没有动摇。', en: 'His determination has not wavered.' },
    { cn: '不要轻易被别人动摇。', en: 'Don\'t be easily swayed by others.' },
    { cn: '这件事动摇了他的信心。', en: 'This matter shook his confidence.' },
  ],
  '豆腐': [
    { cn: '我喜欢吃麻婆豆腐。', en: 'I like to eat mapo tofu.' },
    { cn: '豆腐是很有营养的食物。', en: 'Tofu is a very nutritious food.' },
    { cn: '这道菜是用豆腐做的。', en: 'This dish is made with tofu.' },
  ],
  '度过': [
    { cn: '我们在海边度过了一个愉快的假期。', en: 'We spent a pleasant vacation by the sea.' },
    { cn: '他度过了一段困难的时期。', en: 'He went through a difficult period.' },
    { cn: '祝你度过美好的一天。', en: 'I wish you a wonderful day.' },
  ],
  '肚子': [
    { cn: '我肚子饿了。', en: 'I\'m hungry.' },
    { cn: '他吃坏了肚子。', en: 'He ate something bad and got a stomachache.' },
    { cn: '肚子疼得厉害。', en: 'My stomach hurts badly.' },
  ],
  '独立': [
    { cn: '孩子应该学会独立。', en: 'Children should learn to be independent.' },
    { cn: '这个国家已经独立了很多年。', en: 'This country has been independent for many years.' },
    { cn: '她是一个很独立的人。', en: 'She is a very independent person.' },
  ],
  '独特': [
    { cn: '这座城市有独特的魅力。', en: 'This city has a unique charm.' },
    { cn: '她的设计风格很独特。', en: 'Her design style is very distinctive.' },
    { cn: '每个人都有自己独特的优点。', en: 'Everyone has their own unique strengths.' },
  ],
  '独自': [
    { cn: '他独自一个人去旅行了。', en: 'He went traveling alone.' },
    { cn: '她独自完成了这项任务。', en: 'She completed this task on her own.' },
    { cn: '独自生活需要很大的勇气。', en: 'Living alone requires a lot of courage.' },
  ],
  '担保': [
    { cn: '他为朋友做了担保。', en: 'He acted as a guarantor for his friend.' },
    { cn: '银行需要担保才能贷款。', en: 'The bank requires a guarantee before lending.' },
    { cn: '我可以担保他是个好人。', en: 'I can vouch that he is a good person.' },
  ],
  '单纯': [
    { cn: '她是一个很单纯的女孩。', en: 'She is a very innocent girl.' },
    { cn: '这个问题没那么单纯。', en: 'This issue is not that simple.' },
    { cn: '他的想法太单纯了。', en: 'His thinking is too naive.' },
  ],
  '单调': [
    { cn: '他觉得这份工作太单调了。', en: 'He thinks this job is too monotonous.' },
    { cn: '单调的生活让他很无聊。', en: 'The monotonous life bores him.' },
    { cn: '这首歌的旋律有点单调。', en: 'The melody of this song is a bit monotonous.' },
  ],
  '单独': [
    { cn: '老师想单独和你谈谈。', en: 'The teacher wants to talk to you alone.' },
    { cn: '他喜欢单独工作。', en: 'He likes to work alone.' },
    { cn: '这件事需要单独处理。', en: 'This matter needs to be dealt with separately.' },
  ],
  '担任': [
    { cn: '她担任公司的总经理。', en: 'She serves as the general manager of the company.' },
    { cn: '他担任了这次活动的主持人。', en: 'He served as the host of this event.' },
    { cn: '谁担任这个项目的负责人？', en: 'Who is in charge of this project?' },
  ],
  '担心': [
    { cn: '妈妈总是担心我的健康。', en: 'Mom always worries about my health.' },
    { cn: '别担心，一切都会好的。', en: 'Don\'t worry; everything will be fine.' },
    { cn: '他很担心明天的考试。', en: 'He is very worried about tomorrow\'s exam.' },
  ],
  '登': [
    { cn: '他们一起登上了山顶。', en: 'They climbed to the top of the mountain together.' },
    { cn: '旅客们正在登机。', en: 'The passengers are boarding the plane.' },
    { cn: '这条新闻登上了报纸头版。', en: 'This news appeared on the front page of the newspaper.' },
  ],
  '灯光': [
    { cn: '舞台上的灯光很美。', en: 'The stage lighting is beautiful.' },
    { cn: '灯光下她的脸显得很红。', en: 'Her face looks very red under the light.' },
    { cn: '远处的灯光闪烁着。', en: 'The lights in the distance are flickering.' },
  ],
  '登记': [
    { cn: '请在这里登记你的名字。', en: 'Please register your name here.' },
    { cn: '入住酒店需要登记身份证。', en: 'You need to register your ID to check into a hotel.' },
    { cn: '他去民政局登记结婚了。', en: 'He went to the civil affairs bureau to register for marriage.' },
  ],
  '登录': [
    { cn: '请输入密码登录。', en: 'Please enter your password to log in.' },
    { cn: '我忘了登录密码。', en: 'I forgot my login password.' },
    { cn: '你可以用手机号登录。', en: 'You can log in with your phone number.' },
  ],
  '登山': [
    { cn: '他们周末去登山了。', en: 'They went mountain climbing over the weekend.' },
    { cn: '登山是一项很好的运动。', en: 'Mountain climbing is a great sport.' },
    { cn: '登山的时候要注意安全。', en: 'Pay attention to safety when climbing mountains.' },
  ],
  '冬季': [
    { cn: '冬季的北方很冷。', en: 'The north is very cold in winter.' },
    { cn: '冬季运动会下个月举行。', en: 'The winter games will be held next month.' },
    { cn: '冬季是滑雪的好季节。', en: 'Winter is a good season for skiing.' },
  ],
  '打败': [
    { cn: '他在比赛中打败了对手。', en: 'He defeated his opponent in the competition.' },
    { cn: '我们一定能打败困难。', en: 'We can definitely overcome difficulties.' },
    { cn: '他的球队被打败了。', en: 'His team was defeated.' },
  ],
  '打雷': [
    { cn: '外面正在打雷。', en: 'It\'s thundering outside.' },
    { cn: '打雷的时候不要站在树下。', en: 'Don\'t stand under a tree when it\'s thundering.' },
    { cn: '昨晚打雷把我吵醒了。', en: 'The thunder woke me up last night.' },
  ],
  '打扫': [
    { cn: '我正在打扫房间。', en: 'I am cleaning the room.' },
    { cn: '他每天都打扫卫生。', en: 'He cleans every day.' },
    { cn: '过年前要把家里打扫干净。', en: 'Clean the house before the New Year.' },
  ],
  '打折': [
    { cn: '这件衣服打折吗？', en: 'Is this piece of clothing on sale?' },
    { cn: '所有商品打八折。', en: 'All products are 20% off.' },
    { cn: '打折的时候买东西比较划算。', en: 'It\'s more cost-effective to buy things when they\'re on sale.' },
  ],
  '打针': [
    { cn: '医生说需要打针。', en: 'The doctor said an injection is needed.' },
    { cn: '小孩子都怕打针。', en: 'Little children are all afraid of injections.' },
    { cn: '我去医院打针了。', en: 'I went to the hospital to get an injection.' },
  ],
  '倒闭': [
    { cn: '那家餐馆已经倒闭了。', en: 'That restaurant has already gone bankrupt.' },
    { cn: '很多小公司因为竞争激烈而倒闭。', en: 'Many small companies went bankrupt due to fierce competition.' },
    { cn: '他的工厂差点倒闭。', en: 'His factory almost went bankrupt.' },
  ],
  '倒车': [
    { cn: '你需要在下一站倒车。', en: 'You need to transfer at the next stop.' },
    { cn: '去机场要倒车两次。', en: 'Going to the airport requires two transfers.' },
    { cn: '这趟车直达，不用倒车。', en: 'This ride is direct; no transfer needed.' },
  ],
  '导游': [
    { cn: '导游带我们参观了故宫。', en: 'The tour guide took us to visit the Forbidden City.' },
    { cn: '她在旅行社当导游。', en: 'She works as a tour guide at a travel agency.' },
    { cn: '我们请了一位当地的导游。', en: 'We hired a local tour guide.' },
  ],
  '导致': [
    { cn: '抽烟会导致很多疾病。', en: 'Smoking can lead to many diseases.' },
    { cn: '暴雨导致了严重的水灾。', en: 'The heavy rain caused severe flooding.' },
    { cn: '粗心导致了这次失误。', en: 'Carelessness caused this mistake.' },
  ],
  '顶': [
    { cn: '山顶的风景很壮观。', en: 'The scenery at the mountaintop is spectacular.' },
    { cn: '他用手顶着门。', en: 'He propped the door with his hand.' },
    { cn: '球员用头顶球进了门。', en: 'The player headed the ball into the goal.' },
  ],
  '堵': [
    { cn: '下水道堵了。', en: 'The drain is blocked.' },
    { cn: '用东西把这个洞堵上。', en: 'Block this hole with something.' },
    { cn: '他堵住了敌人的去路。', en: 'He blocked the enemy\'s escape route.' },
  ],
  '堵车': [
    { cn: '早上上班的时候经常堵车。', en: 'There are often traffic jams during the morning commute.' },
    { cn: '因为堵车，我迟到了。', en: 'I was late because of the traffic jam.' },
    { cn: '这条路经常堵车。', en: 'This road is often congested.' },
  ],
