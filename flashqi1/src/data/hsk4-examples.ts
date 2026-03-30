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
  '放松': [
    { cn: '周末我想好好放松一下。', en: 'I want to relax well this weekend.' },
    { cn: '听音乐可以帮你放松。', en: 'Listening to music can help you relax.' },
    { cn: '别紧张，放松一点。', en: 'Don\'t be nervous; relax a little.' },
  ],
  '烦': [
    { cn: '这件事让我很烦。', en: 'This matter really bothers me.' },
    { cn: '别烦我，我在忙。', en: 'Don\'t bother me; I\'m busy.' },
    { cn: '他最近心情很烦。', en: 'He has been feeling very vexed lately.' },
  ],
  '奋斗': [
    { cn: '年轻人应该为梦想而奋斗。', en: 'Young people should strive for their dreams.' },
    { cn: '他奋斗了一辈子。', en: 'He struggled his whole life.' },
    { cn: '成功需要不断地奋斗。', en: 'Success requires continuous striving.' },
  ],
  '肥': [
    { cn: '这块肉太肥了。', en: 'This piece of meat is too fatty.' },
    { cn: '这条裤子有点肥。', en: 'These pants are a bit loose-fitting.' },
    { cn: '这块地很肥沃。', en: 'This piece of land is very fertile.' },
  ],
  '付出': [
    { cn: '成功需要付出很多努力。', en: 'Success requires a lot of effort.' },
    { cn: '他为这个项目付出了大量时间。', en: 'He invested a lot of time in this project.' },
    { cn: '只要付出就会有回报。', en: 'As long as you put in effort, there will be rewards.' },
  ],
  '负担': [
    { cn: '学费对这个家庭来说是个很大的负担。', en: 'Tuition is a heavy burden for this family.' },
    { cn: '他不想成为家里的负担。', en: 'He doesn\'t want to be a burden to the family.' },
    { cn: '这些费用由公司负担。', en: 'These costs are borne by the company.' },
  ],
  '附近': [
    { cn: '附近有没有银行？', en: 'Is there a bank nearby?' },
    { cn: '我住在学校附近。', en: 'I live near the school.' },
    { cn: '附近的餐厅很多。', en: 'There are many restaurants nearby.' },
  ],
  '复制': [
    { cn: '请复制这份文件。', en: 'Please copy this document.' },
    { cn: '这幅画是复制品。', en: 'This painting is a copy.' },
    { cn: '你可以复制粘贴这段文字。', en: 'You can copy and paste this text.' },
  ],
  '符号': [
    { cn: '这个符号是什么意思？', en: 'What does this symbol mean?' },
    { cn: '数学里有很多符号。', en: 'There are many symbols in mathematics.' },
    { cn: '请在这里填上标点符号。', en: 'Please add punctuation marks here.' },
  ],
  '符合': [
    { cn: '他的条件符合要求。', en: 'His qualifications meet the requirements.' },
    { cn: '这个方案符合实际情况。', en: 'This plan is in line with the actual situation.' },
    { cn: '检测结果符合标准。', en: 'The test results meet the standards.' },
  ],
  '发挥': [
    { cn: '他在比赛中发挥得很好。', en: 'He performed very well in the competition.' },
    { cn: '要充分发挥自己的优势。', en: 'You should fully utilize your strengths.' },
    { cn: '她这次考试没有发挥好。', en: 'She didn\'t perform well on this exam.' },
  ],
  '发票': [
    { cn: '请给我开一张发票。', en: 'Please give me a receipt.' },
    { cn: '报销需要提供发票。', en: 'Reimbursement requires an invoice.' },
    { cn: '发票上的金额写错了。', en: 'The amount on the invoice is wrong.' },
  ],
  '发烧': [
    { cn: '他发烧了，需要休息。', en: 'He has a fever and needs rest.' },
    { cn: '孩子半夜突然发烧了。', en: 'The child suddenly got a fever in the middle of the night.' },
    { cn: '发烧的时候要多喝水。', en: 'Drink plenty of water when you have a fever.' },
  ],
  '翻': [
    { cn: '请翻到第五十页。', en: 'Please turn to page fifty.' },
    { cn: '船被大浪翻了过来。', en: 'The boat was overturned by the big waves.' },
    { cn: '他翻了翻口袋，什么都没有。', en: 'He rummaged through his pockets but found nothing.' },
  ],
  '翻译': [
    { cn: '请把这段话翻译成英文。', en: 'Please translate this passage into English.' },
    { cn: '她是一位专业翻译。', en: 'She is a professional translator.' },
    { cn: '翻译这本书花了两年时间。', en: 'It took two years to translate this book.' },
  ],
  '方': [
    { cn: '这张桌子是方的。', en: 'This table is square.' },
    { cn: '东方的太阳升起来了。', en: 'The sun has risen in the east.' },
    { cn: '双方都同意了这个条件。', en: 'Both sides agreed to this condition.' },
  ],
  '方针': [
    { cn: '公司制定了新的方针。', en: 'The company has formulated new guidelines.' },
    { cn: '教育方针需要不断改进。', en: 'Education policies need continuous improvement.' },
    { cn: '我们要坚持正确的方针。', en: 'We must adhere to the correct policy.' },
  ],
  '方案': [
    { cn: '我们讨论了几个方案。', en: 'We discussed several proposals.' },
    { cn: '这个方案比较可行。', en: 'This plan is relatively feasible.' },
    { cn: '他提出了一个新方案。', en: 'He proposed a new plan.' },
  ],
  '非': [
    { cn: '这种做法非常不合适。', en: 'This approach is very inappropriate.' },
    { cn: '他非要去不可。', en: 'He insists on going.' },
    { cn: '是非分明是做人的基本原则。', en: 'Distinguishing right from wrong is a basic principle of conduct.' },
  ],
  '分布': [
    { cn: '人口分布不太均匀。', en: 'The population distribution is not very even.' },
    { cn: '这种植物广泛分布在南方。', en: 'This plant is widely distributed in the south.' },
    { cn: '商店分布在城市各个角落。', en: 'Shops are distributed in every corner of the city.' },
  ],
  '纷纷': [
    { cn: '听到消息后，大家纷纷赶来。', en: 'After hearing the news, everyone came one after another.' },
    { cn: '树叶纷纷落下。', en: 'Leaves fell one by one.' },
    { cn: '同学们纷纷举手发言。', en: 'The students raised their hands to speak one after another.' },
  ],
  '分手': [
    { cn: '他们已经分手了。', en: 'They have already broken up.' },
    { cn: '分手以后她很伤心。', en: 'She was very sad after the breakup.' },
    { cn: '他们在路口分手了。', en: 'They parted ways at the intersection.' },
  ],
  '分散': [
    { cn: '请不要分散注意力。', en: 'Please don\'t let your attention wander.' },
    { cn: '人群慢慢分散了。', en: 'The crowd slowly dispersed.' },
    { cn: '把风险分散开来比较安全。', en: 'It\'s safer to spread out the risk.' },
  ],
  '分为': [
    { cn: '这本书分为三个部分。', en: 'This book is divided into three parts.' },
    { cn: '一年分为四个季节。', en: 'A year is divided into four seasons.' },
    { cn: '我们把学生分为几个小组。', en: 'We divided the students into several groups.' },
  ],
  '分之': [
    { cn: '三分之一的学生来自农村。', en: 'One-third of the students come from rural areas.' },
    { cn: '百分之八十的人同意。', en: 'Eighty percent of the people agree.' },
    { cn: '他只花了五分之一的时间。', en: 'He only spent one-fifth of the time.' },
  ],
  '封闭': [
    { cn: '这条路已经封闭了。', en: 'This road has been closed off.' },
    { cn: '他的性格比较封闭。', en: 'His personality is rather closed off.' },
    { cn: '工厂因为安全问题被封闭了。', en: 'The factory was shut down due to safety issues.' },
  ],
  '风格': [
    { cn: '他的写作风格很独特。', en: 'His writing style is very unique.' },
    { cn: '这栋建筑是中国风格的。', en: 'This building is in Chinese style.' },
    { cn: '每个人都有自己的风格。', en: 'Everyone has their own style.' },
  ],
  '风景': [
    { cn: '这里的风景太美了。', en: 'The scenery here is so beautiful.' },
    { cn: '山上的风景非常壮观。', en: 'The mountain scenery is very spectacular.' },
    { cn: '她喜欢拍风景照。', en: 'She likes to take landscape photos.' },
  ],
  '风俗': [
    { cn: '各地的风俗不一样。', en: 'Customs vary from place to place.' },
    { cn: '过年放鞭炮是中国的传统风俗。', en: 'Setting off firecrackers during New Year is a traditional Chinese custom.' },
    { cn: '我们要尊重当地的风俗。', en: 'We should respect local customs.' },
  ],
  '夫妇': [
    { cn: '这对夫妇结婚二十年了。', en: 'This couple has been married for twenty years.' },
    { cn: '隔壁夫妇人很好。', en: 'The couple next door are very nice.' },
    { cn: '这对年轻夫妇刚搬来。', en: 'This young couple just moved in.' },
  ],
  '夫妻': [
    { cn: '他们是一对恩爱的夫妻。', en: 'They are a loving married couple.' },
    { cn: '夫妻之间要互相尊重。', en: 'Husband and wife should respect each other.' },
    { cn: '他们夫妻关系很好。', en: 'Their marital relationship is very good.' },
  ],
  '夫人': [
    { cn: '这是王先生的夫人。', en: 'This is Mr. Wang\'s wife.' },
    { cn: '夫人，请这边走。', en: 'Madam, please come this way.' },
    { cn: '总统和夫人一起出席了晚宴。', en: 'The president and his wife attended the dinner together.' },
  ],
  '法': [
    { cn: '我想不出更好的法子了。', en: 'I can\'t think of a better way.' },
    { cn: '做事要讲究方法。', en: 'One should pay attention to method when doing things.' },
    { cn: '他这个用法是对的。', en: 'His usage is correct.' },
  ],
  '法官': [
    { cn: '法官做出了公正的判决。', en: 'The judge made a fair ruling.' },
    { cn: '她的梦想是成为一名法官。', en: 'Her dream is to become a judge.' },
    { cn: '法官宣读了最后的判决。', en: 'The judge read out the final verdict.' },
  ],
  '法律': [
    { cn: '每个人都要遵守法律。', en: 'Everyone must obey the law.' },
    { cn: '他大学学的是法律。', en: 'He studied law in college.' },
    { cn: '法律面前人人平等。', en: 'Everyone is equal before the law.' },
  ],
  '法院': [
    { cn: '他在法院工作。', en: 'He works at the court.' },
    { cn: '案件已经提交到法院了。', en: 'The case has been submitted to the court.' },
    { cn: '明天法院会开庭审理。', en: 'The court will hold a hearing tomorrow.' },
  ],
  '反': [
    { cn: '他穿反了衣服。', en: 'He wore his clothes inside out.' },
    { cn: '结果和我想的正好相反。', en: 'The result is exactly the opposite of what I thought.' },
    { cn: '他反过来帮了我一把。', en: 'He turned around and helped me instead.' },
  ],
  '反映': [
    { cn: '这部电影反映了社会现实。', en: 'This movie reflects social reality.' },
    { cn: '群众向政府反映了这个问题。', en: 'The people reported this problem to the government.' },
    { cn: '数据反映了市场的变化。', en: 'The data reflects changes in the market.' },
  ],
  '反而': [
    { cn: '吃了药，病反而更严重了。', en: 'After taking the medicine, the illness got worse instead.' },
    { cn: '他不但没生气，反而笑了。', en: 'Not only was he not angry, but he laughed instead.' },
    { cn: '价格降了，销量反而上去了。', en: 'The price dropped, and sales went up instead.' },
  ],
  '否则': [
    { cn: '你必须努力，否则会失败。', en: 'You must work hard; otherwise, you will fail.' },
    { cn: '赶紧出发吧，否则来不及了。', en: 'Let\'s leave quickly, or else it will be too late.' },
    { cn: '要遵守规则，否则会受到处罚。', en: 'Follow the rules; otherwise, you will be punished.' },
  ],
  '怪': [
    { cn: '这件事太奇怪了。', en: 'This matter is too strange.' },
    { cn: '别怪他，他不是故意的。', en: 'Don\'t blame him; he didn\'t do it on purpose.' },
    { cn: '今天的天气有点怪。', en: 'The weather today is a bit odd.' },
  ],
  '逛': [
    { cn: '周末我们去逛街吧。', en: 'Let\'s go shopping on the weekend.' },
    { cn: '她喜欢逛超市。', en: 'She likes to browse the supermarket.' },
    { cn: '他们逛了一整天的公园。', en: 'They strolled around the park all day.' },
  ],
  '过分': [
    { cn: '他的要求太过分了。', en: 'His demands are too excessive.' },
    { cn: '你说的话有点过分。', en: 'What you said is a bit too much.' },
    { cn: '不要过分担心。', en: 'Don\'t worry excessively.' },
  ],
  '瓜': [
    { cn: '夏天吃西瓜很舒服。', en: 'It\'s nice to eat watermelon in summer.' },
    { cn: '他种了好几种瓜。', en: 'He grew several types of melon.' },
    { cn: '这个瓜又大又甜。', en: 'This melon is big and sweet.' },
  ],
  '官': [
    { cn: '他在政府当官。', en: 'He holds a government position.' },
    { cn: '这位官员负责教育工作。', en: 'This official is in charge of education.' },
    { cn: '当官要为民办事。', en: 'Officials should serve the people.' },
  ],
  '关闭': [
    { cn: '商店已经关闭了。', en: 'The store has already closed.' },
    { cn: '请关闭手机。', en: 'Please turn off your phone.' },
    { cn: '工厂因为污染被关闭了。', en: 'The factory was shut down because of pollution.' },
  ],
  '官方': [
    { cn: '这是官方发布的消息。', en: 'This is an official announcement.' },
    { cn: '请查看官方网站了解详情。', en: 'Please check the official website for details.' },
    { cn: '官方数据显示经济在增长。', en: 'Official data shows the economy is growing.' },
  ],
  '关于': [
    { cn: '关于这个问题，我有话要说。', en: 'Regarding this issue, I have something to say.' },
    { cn: '这是一本关于历史的书。', en: 'This is a book about history.' },
    { cn: '关于明天的安排，请大家注意。', en: 'Please pay attention to the arrangements for tomorrow.' },
  ],
  '光临': [
    { cn: '欢迎光临！', en: 'Welcome!' },
    { cn: '感谢各位的光临。', en: 'Thank you all for honoring us with your presence.' },
    { cn: '下次欢迎再次光临。', en: 'You are welcome to visit again next time.' },
  ],
  '光盘': [
    { cn: '这张光盘里有什么内容？', en: 'What is on this CD?' },
    { cn: '现在很少有人用光盘了。', en: 'Very few people use CDs nowadays.' },
    { cn: '请把文件刻到光盘上。', en: 'Please burn the files onto a CD.' },
  ],
  '归': [
    { cn: '他终于归来了。', en: 'He has finally returned.' },
    { cn: '这本书应该归还图书馆。', en: 'This book should be returned to the library.' },
    { cn: '一切又归于平静。', en: 'Everything returned to calm.' },
  ],
  '规律': [
    { cn: '生活要有规律。', en: 'Life should have a regular pattern.' },
    { cn: '他发现了一个有趣的规律。', en: 'He discovered an interesting pattern.' },
    { cn: '大自然有自己的规律。', en: 'Nature has its own laws.' },
  ],
  '规模': [
    { cn: '这家公司的规模很大。', en: 'This company is very large in scale.' },
    { cn: '我们需要扩大生产规模。', en: 'We need to expand our production scale.' },
    { cn: '活动的规模超出了预期。', en: 'The scale of the event exceeded expectations.' },
  ],
  '规则': [
    { cn: '比赛有严格的规则。', en: 'The competition has strict rules.' },
    { cn: '每个人都要遵守规则。', en: 'Everyone must follow the rules.' },
    { cn: '规则是为大家制定的。', en: 'Rules are made for everyone.' },
  ],
  '果实': [
    { cn: '秋天是果实成熟的季节。', en: 'Autumn is the season when fruit ripens.' },
    { cn: '树上结满了果实。', en: 'The tree is full of fruit.' },
    { cn: '努力的果实是甜美的。', en: 'The fruits of hard work are sweet.' },
  ],
  '概括': [
    { cn: '请用一句话概括文章的内容。', en: 'Please summarize the content of the article in one sentence.' },
    { cn: '他概括了会议的主要内容。', en: 'He summarized the main content of the meeting.' },
    { cn: '概括来说，情况还不错。', en: 'To sum up, the situation is not bad.' },
  ],
  '个别': [
    { cn: '个别学生没有完成作业。', en: 'A few individual students didn\'t finish their homework.' },
    { cn: '这只是个别现象。', en: 'This is just an isolated phenomenon.' },
    { cn: '老师对个别学生进行了辅导。', en: 'The teacher tutored individual students.' },
  ],
  '各个': [
    { cn: '各个部门都派了代表。', en: 'Each department sent a representative.' },
    { cn: '他去过中国的各个城市。', en: 'He has been to various cities in China.' },
    { cn: '各个方面都需要考虑到。', en: 'Every aspect needs to be considered.' },
  ],
  '个体': [
    { cn: '每个个体都是独一无二的。', en: 'Every individual is unique.' },
    { cn: '他是一个个体经营者。', en: 'He is a self-employed individual.' },
    { cn: '个体的力量是有限的。', en: 'The power of an individual is limited.' },
  ],
  '隔': [
    { cn: '我们两家只隔一条街。', en: 'Our two homes are just one street apart.' },
    { cn: '他隔着窗户看外面。', en: 'He looked outside through the window.' },
    { cn: '隔了几年没见，她变了很多。', en: 'After a few years apart, she has changed a lot.' },
  ],
  '隔开': [
    { cn: '用一堵墙把两个房间隔开。', en: 'Separate the two rooms with a wall.' },
    { cn: '座位之间要隔开一米。', en: 'There should be one meter between seats.' },
    { cn: '大海把两个岛隔开了。', en: 'The sea separates the two islands.' },
  ],
  '格外': [
    { cn: '今天的天气格外好。', en: 'The weather is especially nice today.' },
    { cn: '她今天打扮得格外漂亮。', en: 'She is dressed especially beautifully today.' },
    { cn: '下过雨后，空气格外清新。', en: 'After the rain, the air is especially fresh.' },
  ],
  '共': [
    { cn: '我们一共有三十个人。', en: 'We have thirty people in total.' },
    { cn: '大家共同努力，完成了任务。', en: 'Everyone worked together and completed the task.' },
    { cn: '这些书共花了两百块。', en: 'These books cost two hundred yuan in total.' },
  ],
  '构成': [
    { cn: '水由氢和氧构成。', en: 'Water is composed of hydrogen and oxygen.' },
    { cn: '这些因素构成了一个完整的体系。', en: 'These factors constitute a complete system.' },
    { cn: '他的行为构成了犯罪。', en: 'His behavior constituted a crime.' },
  ],
  '购买': [
    { cn: '你可以在网上购买机票。', en: 'You can buy airline tickets online.' },
    { cn: '他购买了一台新电脑。', en: 'He purchased a new computer.' },
    { cn: '请提前购买门票。', en: 'Please purchase tickets in advance.' },
  ],
  '购物': [
    { cn: '她喜欢在网上购物。', en: 'She likes shopping online.' },
    { cn: '周末我们去购物吧。', en: 'Let\'s go shopping this weekend.' },
    { cn: '这是一个大型购物中心。', en: 'This is a large shopping center.' },
  ],
  '构造': [
    { cn: '地球的内部构造很复杂。', en: 'The internal structure of the Earth is very complex.' },
    { cn: '这种机器的构造很简单。', en: 'The structure of this machine is very simple.' },
    { cn: '房子的构造需要仔细设计。', en: 'The construction of a house needs careful design.' },
  ],
  '固定': [
    { cn: '请把这个架子固定好。', en: 'Please secure this shelf.' },
    { cn: '他有一份固定的工作。', en: 'He has a stable job.' },
    { cn: '我们每周有固定的会议时间。', en: 'We have a set meeting time each week.' },
  ],
  '高潮': [
    { cn: '故事的高潮非常精彩。', en: 'The climax of the story is very exciting.' },
    { cn: '演出达到了高潮。', en: 'The performance reached its climax.' },
    { cn: '比赛进入了高潮。', en: 'The competition reached its peak.' },
  ],
  '高价': [
    { cn: '他以高价买了一幅画。', en: 'He bought a painting at a high price.' },
    { cn: '这种水果卖到了高价。', en: 'This kind of fruit sold at a high price.' },
    { cn: '高价并不代表高质量。', en: 'A high price doesn\'t necessarily mean high quality.' },
  ],
  '高尚': [
    { cn: '他是一个品格高尚的人。', en: 'He is a person of noble character.' },
    { cn: '她的行为非常高尚。', en: 'Her behavior is very noble.' },
    { cn: '这种精神是高尚的。', en: 'This spirit is admirable.' },
  ],
  '高铁': [
    { cn: '坐高铁去上海很方便。', en: 'It\'s very convenient to take the high-speed rail to Shanghai.' },
    { cn: '中国的高铁发展得很快。', en: 'China\'s high-speed rail has developed rapidly.' },
    { cn: '高铁票需要提前预订。', en: 'High-speed rail tickets need to be booked in advance.' },
  ],
  '根': [
    { cn: '树的根扎得很深。', en: 'The tree\'s roots go very deep.' },
    { cn: '这根绳子够长吗？', en: 'Is this rope long enough?' },
    { cn: '问题的根源在哪里？', en: 'Where is the root of the problem?' },
  ],
  '根据': [
    { cn: '根据天气预报，明天会下雨。', en: 'According to the weather forecast, it will rain tomorrow.' },
    { cn: '我们根据实际情况做出了调整。', en: 'We made adjustments based on the actual situation.' },
    { cn: '这个结论没有根据。', en: 'This conclusion has no basis.' },
  ],
  '盖': [
    { cn: '他们在这里盖了一栋新楼。', en: 'They built a new building here.' },
    { cn: '请把锅盖盖上。', en: 'Please put the lid on the pot.' },
    { cn: '用毯子把孩子盖上。', en: 'Cover the child with a blanket.' },
  ],
  '工程': [
    { cn: '这个工程需要三年才能完成。', en: 'This project will take three years to complete.' },
    { cn: '他是一名土木工程师。', en: 'He is a civil engineer.' },
    { cn: '建设工程正在进行中。', en: 'The construction project is underway.' },
  ],
  '公元': [
    { cn: '公元二零零零年是一个特殊的年份。', en: 'The year 2000 AD was a special year.' },
    { cn: '这座寺庙建于公元七世纪。', en: 'This temple was built in the 7th century AD.' },
    { cn: '公元前五百年左右，孔子出生了。', en: 'Around 500 BC, Confucius was born.' },
  ],
  '供应': [
    { cn: '超市供应新鲜蔬菜。', en: 'The supermarket supplies fresh vegetables.' },
    { cn: '供应跟不上需求。', en: 'Supply can\'t keep up with demand.' },
    { cn: '这家工厂为全市供应自来水。', en: 'This plant supplies tap water to the entire city.' },
  ],
  '改善': [
    { cn: '我们要改善生活条件。', en: 'We need to improve living conditions.' },
    { cn: '关系已经有所改善。', en: 'The relationship has improved somewhat.' },
    { cn: '他的健康状况在逐渐改善。', en: 'His health is gradually improving.' },
  ],
  '改正': [
    { cn: '请改正你的错误。', en: 'Please correct your mistakes.' },
    { cn: '他已经改正了不好的习惯。', en: 'He has already corrected his bad habits.' },
    { cn: '知错就改正，这是好事。', en: 'Correcting mistakes once you know them is a good thing.' },
  ],
  '感兴趣': [
    { cn: '她对历史很感兴趣。', en: 'She is very interested in history.' },
    { cn: '你对什么感兴趣？', en: 'What are you interested in?' },
    { cn: '越来越多的人对中文感兴趣。', en: 'More and more people are interested in Chinese.' },
  ],
  '骨头': [
    { cn: '狗喜欢啃骨头。', en: 'Dogs like to gnaw on bones.' },
    { cn: '他摔倒了，骨头受伤了。', en: 'He fell and injured his bones.' },
    { cn: '鱼骨头卡在喉咙里了。', en: 'A fish bone got stuck in the throat.' },
  ],
  '划': [
    { cn: '他们在湖上划船。', en: 'They are rowing a boat on the lake.' },
    { cn: '这样做划算吗？', en: 'Is it worthwhile to do this?' },
    { cn: '周末去划船吧。', en: 'Let\'s go rowing this weekend.' },
  ],
  '怀念': [
    { cn: '他很怀念大学的时光。', en: 'He cherishes the memory of his college days.' },
    { cn: '我们都很怀念那位老师。', en: 'We all miss that teacher.' },
    { cn: '她怀念在家乡的日子。', en: 'She misses the days in her hometown.' },
  ],
  '怀疑': [
    { cn: '我怀疑他说的不是真话。', en: 'I doubt what he said is the truth.' },
    { cn: '警察开始怀疑这个人。', en: 'The police began to suspect this person.' },
    { cn: '不要随便怀疑别人。', en: 'Don\'t casually doubt others.' },
  ],
  '黄瓜': [
    { cn: '夏天吃黄瓜很爽口。', en: 'Eating cucumber in summer is very refreshing.' },
    { cn: '她买了两根黄瓜。', en: 'She bought two cucumbers.' },
    { cn: '拍黄瓜是一道简单的凉菜。', en: 'Smashed cucumber is a simple cold dish.' },
  ],
  '黄金': [
    { cn: '黄金的价格在上涨。', en: 'The price of gold is rising.' },
    { cn: '早上八点到十点是黄金时段。', en: 'Eight to ten in the morning is the prime time.' },
    { cn: '她戴了一条黄金项链。', en: 'She wore a gold necklace.' },
  ],
  '汇': [
    { cn: '请把钱汇到我的账户。', en: 'Please transfer the money to my account.' },
    { cn: '几条河在这里汇合。', en: 'Several rivers converge here.' },
    { cn: '她汇了一笔钱给父母。', en: 'She remitted some money to her parents.' },
  ],
  '汇报': [
    { cn: '他向领导汇报了工作进展。', en: 'He reported the work progress to the leader.' },
    { cn: '请把情况向上级汇报。', en: 'Please report the situation to your superiors.' },
    { cn: '明天要做一个汇报。', en: 'A report needs to be given tomorrow.' },
  ],
  '汇率': [
    { cn: '今天的汇率是多少？', en: 'What is today\'s exchange rate?' },
    { cn: '汇率每天都在变化。', en: 'The exchange rate changes every day.' },
    { cn: '人民币对美元的汇率下降了。', en: 'The exchange rate of RMB to USD has dropped.' },
  ],
  '回复': [
    { cn: '请尽快回复我的邮件。', en: 'Please reply to my email as soon as possible.' },
    { cn: '他还没有回复我的消息。', en: 'He hasn\'t replied to my message yet.' },
    { cn: '我收到了你的回复。', en: 'I received your reply.' },
  ],
  '货': [
    { cn: '这批货已经到了。', en: 'This batch of goods has arrived.' },
    { cn: '他们在搬货。', en: 'They are moving goods.' },
    { cn: '这家店的货不多了。', en: 'This store doesn\'t have much stock left.' },
  ],
  '获': [
    { cn: '他获了一等奖。', en: 'He won the first prize.' },
    { cn: '付出才能有所获。', en: 'You can only gain something if you put in effort.' },
    { cn: '她获准出国留学。', en: 'She was granted permission to study abroad.' },
  ],
  '获得': [
    { cn: '她获得了奖学金。', en: 'She obtained a scholarship.' },
    { cn: '他通过努力获得了成功。', en: 'He achieved success through hard work.' },
    { cn: '我们获得了宝贵的经验。', en: 'We gained valuable experience.' },
  ],
  '获奖': [
    { cn: '这部电影获奖了。', en: 'This movie won an award.' },
    { cn: '获奖者上台领奖。', en: 'The winners went up on stage to receive their awards.' },
    { cn: '他的论文在比赛中获奖了。', en: 'His paper won a prize in the competition.' },
  ],
  '获取': [
    { cn: '你可以通过网络获取信息。', en: 'You can obtain information through the internet.' },
    { cn: '获取知识的方法有很多种。', en: 'There are many ways to acquire knowledge.' },
    { cn: '他在实践中获取了经验。', en: 'He gained experience through practice.' },
  ],
  '或许': [
    { cn: '或许他已经到了。', en: 'Perhaps he has already arrived.' },
    { cn: '或许我们应该换一种方法。', en: 'Perhaps we should try a different approach.' },
    { cn: '明天或许会下雨。', en: 'It might rain tomorrow.' },
  ],
  '缓解': [
    { cn: '运动可以缓解压力。', en: 'Exercise can relieve stress.' },
    { cn: '这种药可以缓解疼痛。', en: 'This medicine can alleviate pain.' },
    { cn: '紧张的局势有所缓解。', en: 'The tense situation has eased somewhat.' },
  ],
  '伙': [
    { cn: '他们是一伙的。', en: 'They are in the same group.' },
    { cn: '来了一伙人。', en: 'A group of people came.' },
    { cn: '这伙人看起来不太友好。', en: 'This group of people doesn\'t look very friendly.' },
  ],
  '伙伴': [
    { cn: '他是我的工作伙伴。', en: 'He is my work partner.' },
    { cn: '小伙伴们一起去郊游了。', en: 'The friends went on an outing together.' },
    { cn: '找到好的伙伴很重要。', en: 'Finding a good partner is important.' },
  ],
  '号码': [
    { cn: '请告诉我你的电话号码。', en: 'Please tell me your phone number.' },
    { cn: '你的座位号码是多少？', en: 'What is your seat number?' },
    { cn: '他记住了车牌号码。', en: 'He memorized the license plate number.' },
  ],
  '含': [
    { cn: '这种饮料含有维生素C。', en: 'This drink contains vitamin C.' },
    { cn: '她含着眼泪说了一声再见。', en: 'She said goodbye with tears in her eyes.' },
    { cn: '嘴里含了一颗糖。', en: 'There is a candy in the mouth.' },
  ],
  '寒假': [
    { cn: '寒假你打算去哪儿？', en: 'Where do you plan to go during winter vacation?' },
    { cn: '寒假有一个月的时间。', en: 'Winter vacation lasts one month.' },
    { cn: '他寒假在家帮父母干活。', en: 'He helps his parents with work at home during winter vacation.' },
  ],
  '含量': [
    { cn: '这种食物的蛋白质含量很高。', en: 'This food has a high protein content.' },
    { cn: '水中的矿物质含量不高。', en: 'The mineral content in the water is not high.' },
    { cn: '空气中氧的含量是多少？', en: 'What is the oxygen content in the air?' },
  ],
  '寒冷': [
    { cn: '冬天的北方非常寒冷。', en: 'The north is very cold in winter.' },
    { cn: '寒冷的天气让人不想出门。', en: 'The cold weather makes people not want to go out.' },
    { cn: '她在寒冷中等了一个小时。', en: 'She waited for an hour in the cold.' },
  ],
  '含义': [
    { cn: '这个词有什么含义？', en: 'What is the meaning of this word?' },
    { cn: '他的话有很深的含义。', en: 'His words have a very deep meaning.' },
    { cn: '你理解这句话的含义吗？', en: 'Do you understand the meaning of this sentence?' },
  ],
  '含有': [
    { cn: '牛奶含有丰富的钙。', en: 'Milk contains rich calcium.' },
    { cn: '这种药含有多种成分。', en: 'This medicine contains multiple ingredients.' },
    { cn: '这道菜含有花生。', en: 'This dish contains peanuts.' },
  ],
  '航班': [
    { cn: '我的航班延误了。', en: 'My flight has been delayed.' },
    { cn: '下一个航班是几点？', en: 'What time is the next flight?' },
    { cn: '请确认你的航班信息。', en: 'Please confirm your flight information.' },
  ],
  '航空': [
    { cn: '他在航空公司工作。', en: 'He works at an airline.' },
    { cn: '航空技术发展得很快。', en: 'Aviation technology has developed rapidly.' },
    { cn: '航空安全是最重要的。', en: 'Aviation safety is the most important thing.' },
  ],
  '行业': [
    { cn: '他在金融行业工作。', en: 'He works in the finance industry.' },
    { cn: '每个行业都有自己的规则。', en: 'Every industry has its own rules.' },
    { cn: 'IT行业发展很快。', en: 'The IT industry is developing rapidly.' },
  ],
  '毫米': [
    { cn: '这个零件的误差不能超过一毫米。', en: 'The error of this part cannot exceed one millimeter.' },
    { cn: '一毫米等于千分之一米。', en: 'One millimeter equals one-thousandth of a meter.' },
    { cn: '降雨量达到了五十毫米。', en: 'The rainfall reached fifty millimeters.' },
  ],
  '毫升': [
    { cn: '每天喝两千毫升水。', en: 'Drink two thousand milliliters of water every day.' },
    { cn: '这个杯子能装五百毫升。', en: 'This cup can hold five hundred milliliters.' },
    { cn: '每次吃五毫升的药。', en: 'Take five milliliters of medicine each time.' },
  ],
  '合同': [
    { cn: '请仔细阅读合同内容。', en: 'Please read the contract contents carefully.' },
    { cn: '他们签了一份合同。', en: 'They signed a contract.' },
    { cn: '合同的期限是两年。', en: 'The contract period is two years.' },
  ],
  '厚': [
    { cn: '这本书很厚。', en: 'This book is very thick.' },
    { cn: '冬天要穿厚衣服。', en: 'You should wear thick clothes in winter.' },
    { cn: '他对人很厚道。', en: 'He is very kind to people.' },
  ],
  '后头': [
    { cn: '他在队伍的后头。', en: 'He is at the back of the line.' },
    { cn: '后头还有很多人。', en: 'There are still many people behind.' },
    { cn: '学校就在公园后头。', en: 'The school is just behind the park.' },
  ],
  '红包': [
    { cn: '过年的时候，长辈会给小孩红包。', en: 'During the New Year, elders give children red envelopes.' },
    { cn: '她在微信上发了一个红包。', en: 'She sent a red envelope on WeChat.' },
    { cn: '婚礼上要给红包。', en: 'You should give a red envelope at a wedding.' },
  ],
  '户': [
    { cn: '这栋楼有一百多户人家。', en: 'This building has over a hundred households.' },
    { cn: '你的户口在哪里？', en: 'Where is your household registration?' },
    { cn: '银行为每一户客户建立档案。', en: 'The bank creates a file for each customer.' },
  ],
  '护士': [
    { cn: '护士正在给病人打针。', en: 'The nurse is giving the patient an injection.' },
    { cn: '她是一名很有经验的护士。', en: 'She is a very experienced nurse.' },
    { cn: '护士的工作很辛苦。', en: 'A nurse\'s work is very hard.' },
  ],
  '黑暗': [
    { cn: '天已经黑暗了。', en: 'It has already gotten dark.' },
    { cn: '他在黑暗中摸索着前进。', en: 'He groped forward in the darkness.' },
    { cn: '黑暗过后就是光明。', en: 'After darkness comes light.' },
  ],
  '忽视': [
    { cn: '我们不能忽视这个问题。', en: 'We cannot overlook this problem.' },
    { cn: '他忽视了医生的建议。', en: 'He ignored the doctor\'s advice.' },
    { cn: '安全问题不容忽视。', en: 'Safety issues cannot be disregarded.' },
  ],
  '呼吸': [
    { cn: '请深呼吸，放松一下。', en: 'Please take a deep breath and relax.' },
    { cn: '他的呼吸很急促。', en: 'His breathing is very rapid.' },
    { cn: '新鲜空气让人呼吸舒畅。', en: 'Fresh air makes breathing comfortable.' },
  ],
  '婚礼': [
    { cn: '他们的婚礼很隆重。', en: 'Their wedding ceremony was very grand.' },
    { cn: '我被邀请参加她的婚礼。', en: 'I was invited to attend her wedding.' },
    { cn: '婚礼定在下个月。', en: 'The wedding is set for next month.' },
  ],
  '海水': [
    { cn: '海水是咸的。', en: 'Seawater is salty.' },
    { cn: '孩子们在海水里游泳。', en: 'The children are swimming in the seawater.' },
    { cn: '海水被阳光照得闪闪发光。', en: 'The seawater sparkles in the sunlight.' },
  ],
  '海鲜': [
    { cn: '他喜欢吃海鲜。', en: 'He likes to eat seafood.' },
    { cn: '这家餐厅的海鲜很新鲜。', en: 'The seafood at this restaurant is very fresh.' },
    { cn: '沿海城市的海鲜种类很多。', en: 'Coastal cities have many types of seafood.' },
  ],
  '好友': [
    { cn: '他是我最好的好友。', en: 'He is my best friend.' },
    { cn: '她和好友一起去旅行了。', en: 'She went traveling with her close friends.' },
    { cn: '我在微信上加了一个新好友。', en: 'I added a new friend on WeChat.' },
  ],
  '渐渐': [
    { cn: '天渐渐黑了。', en: 'It gradually got dark.' },
    { cn: '他渐渐习惯了这里的生活。', en: 'He gradually got used to life here.' },
    { cn: '伤口渐渐好了。', en: 'The wound gradually healed.' },
  ],
  '健身': [
    { cn: '他每天去健身房健身。', en: 'He goes to the gym to work out every day.' },
    { cn: '健身对身体很有好处。', en: 'Working out is very good for your health.' },
    { cn: '越来越多的人开始健身。', en: 'More and more people are starting to work out.' },
  ],
  '降': [
    { cn: '气温突然降了下来。', en: 'The temperature suddenly dropped.' },
    { cn: '大雪从天空降下来。', en: 'Heavy snow fell from the sky.' },
    { cn: '物价降了不少。', en: 'Prices have dropped quite a bit.' },
  ],
  '降低': [
    { cn: '我们要想办法降低成本。', en: 'We need to find ways to reduce costs.' },
    { cn: '请降低音量。', en: 'Please lower the volume.' },
    { cn: '降低风险是很重要的。', en: 'Reducing risk is very important.' },
  ],
  '降价': [
    { cn: '这款手机降价了。', en: 'This phone has been reduced in price.' },
    { cn: '超市的蔬菜降价了。', en: 'The vegetables at the supermarket have been discounted.' },
    { cn: '商家为了促销而降价。', en: 'The store cut prices for a promotion.' },
  ],
  '降落': [
    { cn: '飞机即将降落。', en: 'The plane is about to land.' },
    { cn: '雪花慢慢降落在地上。', en: 'Snowflakes slowly fell to the ground.' },
    { cn: '飞机安全降落了。', en: 'The plane landed safely.' },
  ],
  '降温': [
    { cn: '明天要降温了，多穿点衣服。', en: 'It\'s going to cool down tomorrow; wear more clothes.' },
    { cn: '这几天大幅降温。', en: 'There has been a big temperature drop these past few days.' },
    { cn: '空调可以帮助降温。', en: 'Air conditioning can help lower the temperature.' },
  ],
  '教授': [
    { cn: '他是大学的教授。', en: 'He is a university professor.' },
    { cn: '教授的讲课很有趣。', en: 'The professor\'s lectures are very interesting.' },
    { cn: '她被聘为教授。', en: 'She was appointed as a professor.' },
  ],
  '教训': [
    { cn: '这次失败给了我很大的教训。', en: 'This failure taught me a big lesson.' },
    { cn: '他从中得到了深刻的教训。', en: 'He learned a profound lesson from it.' },
    { cn: '妈妈教训了他一顿。', en: 'Mom gave him a good scolding.' },
  ],
  '结构': [
    { cn: '这栋建筑的结构很牢固。', en: 'The structure of this building is very solid.' },
    { cn: '文章的结构要清晰。', en: 'The structure of an article should be clear.' },
    { cn: '公司的组织结构做了调整。', en: 'The company\'s organizational structure has been adjusted.' },
  ],
  '结论': [
    { cn: '你的结论是什么？', en: 'What is your conclusion?' },
    { cn: '现在还不能下结论。', en: 'We can\'t draw a conclusion yet.' },
    { cn: '研究得出了一个重要的结论。', en: 'The study reached an important conclusion.' },
  ],
  '节省': [
    { cn: '节省时间很重要。', en: 'Saving time is very important.' },
    { cn: '这样做可以节省很多钱。', en: 'Doing this can save a lot of money.' },
    { cn: '他想节省开支。', en: 'He wants to cut down on expenses.' },
  ],
  '加班': [
    { cn: '他今天又要加班。', en: 'He has to work overtime again today.' },
    { cn: '加班到很晚才回家。', en: 'He worked overtime until very late before going home.' },
    { cn: '公司经常让员工加班。', en: 'The company often asks employees to work overtime.' },
  ],
  '加入': [
    { cn: '欢迎你加入我们的团队。', en: 'Welcome to join our team.' },
    { cn: '他加入了篮球队。', en: 'He joined the basketball team.' },
    { cn: '请在汤里加入一点盐。', en: 'Please add a little salt to the soup.' },
  ],
  '家务': [
    { cn: '她每天都要做家务。', en: 'She does housework every day.' },
    { cn: '丈夫应该分担家务。', en: 'Husbands should share the housework.' },
    { cn: '做家务也是一种运动。', en: 'Doing housework is also a form of exercise.' },
  ],
  '加油站': [
    { cn: '前面有一个加油站。', en: 'There is a gas station ahead.' },
    { cn: '我需要去加油站加油。', en: 'I need to go to the gas station to refuel.' },
    { cn: '最近的加油站在哪里？', en: 'Where is the nearest gas station?' },
  ],
  '浅': [
    { cn: '这条河水很浅。', en: 'The water in this river is very shallow.' },
    { cn: '她穿了一件浅绿色的衣服。', en: 'She wore a light green dress.' },
    { cn: '他对这个问题的理解还比较浅。', en: 'His understanding of this issue is still rather shallow.' },
  ],
  '坚固': [
    { cn: '这座桥非常坚固。', en: 'This bridge is very sturdy.' },
    { cn: '城墙建得很坚固。', en: 'The city wall was built very solidly.' },
    { cn: '我们的友谊很坚固。', en: 'Our friendship is very strong.' },
  ],
  '江': [
    { cn: '长江是中国最长的江。', en: 'The Yangtze River is the longest river in China.' },
    { cn: '江面上有很多船。', en: 'There are many boats on the river.' },
    { cn: '他站在江边看日落。', en: 'He stood by the river watching the sunset.' },
  ],
  '交换': [
    { cn: '我们交换了联系方式。', en: 'We exchanged contact information.' },
    { cn: '能和你交换一下座位吗？', en: 'Can I switch seats with you?' },
    { cn: '双方交换了意见。', en: 'Both sides exchanged opinions.' },
  ],
  '交际': [
    { cn: '他很擅长交际。', en: 'He is very good at socializing.' },
    { cn: '交际能力在工作中很重要。', en: 'Social skills are very important at work.' },
    { cn: '她参加了一个交际舞会。', en: 'She attended a social dance.' },
  ],
  '结': [
    { cn: '树上结了很多苹果。', en: 'The tree bore many apples.' },
    { cn: '这棵果树今年结的果实特别大。', en: 'The fruit this tree bore this year is especially large.' },
    { cn: '西红柿已经结果了。', en: 'The tomatoes have already borne fruit.' },
  ],
  '阶段': [
    { cn: '项目已经进入了最后阶段。', en: 'The project has entered its final stage.' },
    { cn: '每个阶段都有不同的任务。', en: 'Each stage has different tasks.' },
    { cn: '这只是初级阶段。', en: 'This is just the initial stage.' },
  ],
  '街道': [
    { cn: '这条街道很繁华。', en: 'This street is very bustling.' },
    { cn: '街道两旁种满了树。', en: 'Trees are planted on both sides of the street.' },
    { cn: '清洁工人正在打扫街道。', en: 'The sanitation workers are cleaning the streets.' },
  ],
  '姐妹': [
    { cn: '她们是一对好姐妹。', en: 'They are a pair of close sisters.' },
    { cn: '我有两个姐妹。', en: 'I have two sisters.' },
    { cn: '姐妹之间要互相帮助。', en: 'Sisters should help each other.' },
  ],
  '解释': [
    { cn: '你能解释一下这个问题吗？', en: 'Can you explain this question?' },
    { cn: '他的解释很有道理。', en: 'His explanation makes a lot of sense.' },
    { cn: '不需要解释，我明白了。', en: 'No explanation needed; I understand.' },
  ],
  '究竟': [
    { cn: '事情究竟是怎么回事？', en: 'What exactly happened?' },
    { cn: '他究竟去哪儿了？', en: 'Where on earth did he go?' },
    { cn: '究竟谁说的是对的？', en: 'Who is actually right?' },
  ],
  '假如': [
    { cn: '假如明天下雨，我们就不去了。', en: 'If it rains tomorrow, we won\'t go.' },
    { cn: '假如你是我，你会怎么做？', en: 'If you were me, what would you do?' },
    { cn: '假如有机会，我想去留学。', en: 'If I have the chance, I\'d like to study abroad.' },
  ],
  '减': [
    { cn: '十减三等于七。', en: 'Ten minus three equals seven.' },
    { cn: '他在想办法减体重。', en: 'He is trying to lose weight.' },
    { cn: '政府决定减税。', en: 'The government decided to reduce taxes.' },
  ],
  '检测': [
    { cn: '产品出厂前要经过严格检测。', en: 'Products must undergo strict testing before leaving the factory.' },
    { cn: '水质检测合格了。', en: 'The water quality test passed.' },
    { cn: '他去医院做了一次全面检测。', en: 'He went to the hospital for a comprehensive checkup.' },
  ],
  '减肥': [
    { cn: '她正在减肥。', en: 'She is trying to lose weight.' },
    { cn: '减肥需要坚持运动。', en: 'Losing weight requires consistent exercise.' },
    { cn: '光节食减肥是不健康的。', en: 'Losing weight only by dieting is unhealthy.' },
  ],
  '简历': [
    { cn: '请把你的简历发给我。', en: 'Please send me your resume.' },
    { cn: '他的简历写得很好。', en: 'His resume is very well written.' },
    { cn: '投简历找工作是第一步。', en: 'Submitting resumes to find a job is the first step.' },
  ],
  '减少': [
    { cn: '我们要减少浪费。', en: 'We need to reduce waste.' },
    { cn: '人口减少是一个问题。', en: 'Population decline is a problem.' },
    { cn: '这项措施可以减少污染。', en: 'This measure can reduce pollution.' },
  ],
  '奖': [
    { cn: '她得了一个大奖。', en: 'She won a big prize.' },
    { cn: '这个奖是对他努力的肯定。', en: 'This award is a recognition of his hard work.' },
    { cn: '老师奖了他一本书。', en: 'The teacher gave him a book as a reward.' },
  ],
  '讲究': [
    { cn: '他吃东西很讲究。', en: 'He is very particular about food.' },
    { cn: '中国人在过年时很讲究。', en: 'Chinese people are very particular during the New Year.' },
    { cn: '写文章要讲究结构。', en: 'Writing an article requires attention to structure.' },
  ],
  '奖金': [
    { cn: '公司发了年终奖金。', en: 'The company gave out year-end bonuses.' },
    { cn: '他把奖金存了起来。', en: 'He saved the bonus money.' },
    { cn: '获奖者可以得到一笔奖金。', en: 'The winners can receive a sum of prize money.' },
  ],
  '奖学金': [
    { cn: '她申请了奖学金。', en: 'She applied for a scholarship.' },
    { cn: '他拿到了全额奖学金。', en: 'He received a full scholarship.' },
    { cn: '奖学金帮助了很多贫困学生。', en: 'Scholarships have helped many students in need.' },
  ],
  '讲座': [
    { cn: '今天有一个关于健康的讲座。', en: 'There is a lecture on health today.' },
    { cn: '教授的讲座非常精彩。', en: 'The professor\'s lecture was wonderful.' },
    { cn: '学校经常举办各种讲座。', en: 'The school often holds various lectures.' },
  ],
  '酒吧': [
    { cn: '他们去酒吧喝了一杯。', en: 'They went to a bar for a drink.' },
    { cn: '这条街上有很多酒吧。', en: 'There are many bars on this street.' },
    { cn: '酒吧里的音乐很好听。', en: 'The music in the bar is very nice.' },
  ],
  '角色': [
    { cn: '他在电影中扮演了一个重要角色。', en: 'He played an important role in the movie.' },
    { cn: '每个人在社会中都有自己的角色。', en: 'Everyone has their own role in society.' },
    { cn: '她很喜欢这个角色。', en: 'She likes this character very much.' },
  ],
  '圈': [
    { cn: '他跑了操场一圈。', en: 'He ran one lap around the field.' },
    { cn: '她的朋友圈很广。', en: 'Her social circle is very wide.' },
    { cn: '用笔画一个圈。', en: 'Draw a circle with a pen.' },
  ],
  '卷': [
    { cn: '她把头发卷了起来。', en: 'She curled her hair.' },
    { cn: '请把这张纸卷起来。', en: 'Please roll up this paper.' },
    { cn: '大风卷起了很多沙子。', en: 'The strong wind swept up a lot of sand.' },
  ],
  '季': [
    { cn: '一年有四季。', en: 'There are four seasons in a year.' },
    { cn: '现在是雨季。', en: 'It is now the rainy season.' },
    { cn: '这个电视剧已经到了第三季。', en: 'This TV series has reached its third season.' },
  ],
  '既': [
    { cn: '她既聪明又漂亮。', en: 'She is both smart and beautiful.' },
    { cn: '既然来了，就安心住下吧。', en: 'Since you\'re here, settle down and stay.' },
    { cn: '他既是老师，也是作家。', en: 'He is both a teacher and a writer.' },
  ],
  '寄': [
    { cn: '请帮我寄一封信。', en: 'Please help me mail a letter.' },
    { cn: '她给家人寄了一份礼物。', en: 'She sent a gift to her family.' },
    { cn: '我把包裹寄出去了。', en: 'I sent the package out.' },
  ],
  '季度': [
    { cn: '公司第一季度的利润增长了。', en: 'The company\'s profit grew in the first quarter.' },
    { cn: '每个季度要做一次总结。', en: 'A summary should be done every quarter.' },
    { cn: '第三季度的数据还没出来。', en: 'The data for the third quarter is not out yet.' },
  ],
  '季节': [
    { cn: '你最喜欢哪个季节？', en: 'Which season do you like best?' },
    { cn: '春天是最美的季节。', en: 'Spring is the most beautiful season.' },
    { cn: '不同的季节有不同的水果。', en: 'Different seasons have different fruits.' },
  ],
  '纪律': [
    { cn: '军队的纪律非常严格。', en: 'Military discipline is very strict.' },
    { cn: '学生要遵守学校的纪律。', en: 'Students should observe school discipline.' },
    { cn: '他违反了公司的纪律。', en: 'He violated the company\'s discipline.' },
  ],
  '技巧': [
    { cn: '写作需要一定的技巧。', en: 'Writing requires certain skills.' },
    { cn: '他的球技很有技巧。', en: 'His ball skills are very skillful.' },
    { cn: '学习语言有很多技巧。', en: 'There are many techniques for learning a language.' },
  ],
  '既然': [
    { cn: '既然你决定了，就去做吧。', en: 'Since you\'ve decided, go ahead and do it.' },
    { cn: '既然来了，就多待一会儿。', en: 'Since you\'re here, stay a while longer.' },
    { cn: '既然知道错了，就应该改正。', en: 'Since you know it\'s wrong, you should correct it.' },
  ],
  '记载': [
    { cn: '历史书上记载了这件事。', en: 'This event is recorded in history books.' },
    { cn: '古书中记载了很多故事。', en: 'Many stories are recorded in ancient books.' },
    { cn: '他的日记记载了每天的生活。', en: 'His diary records his daily life.' },
  ],
  '近代': [
    { cn: '近代中国经历了很多变化。', en: 'Modern China has gone through many changes.' },
    { cn: '这座博物馆展出了近代历史。', en: 'This museum exhibits modern history.' },
    { cn: '近代科学发展很快。', en: 'Modern science has developed rapidly.' },
  ],
  '进口': [
    { cn: '这辆车是进口的。', en: 'This car is imported.' },
    { cn: '中国进口了大量石油。', en: 'China imports a large amount of oil.' },
    { cn: '进口商品一般比较贵。', en: 'Imported goods are generally more expensive.' },
  ],
  '尽力': [
    { cn: '我会尽力帮你的。', en: 'I will do my best to help you.' },
    { cn: '他已经尽力了。', en: 'He has already done his best.' },
    { cn: '尽力而为就好。', en: 'Just do your best.' },
  ],
  '禁止': [
    { cn: '这里禁止吸烟。', en: 'Smoking is prohibited here.' },
    { cn: '禁止在图书馆里大声说话。', en: 'Talking loudly in the library is forbidden.' },
    { cn: '学校禁止学生使用手机。', en: 'The school forbids students from using phones.' },
  ],
  '竟然': [
    { cn: '他竟然通过了考试。', en: 'To my surprise, he passed the exam.' },
    { cn: '没想到她竟然会说中文。', en: 'I didn\'t expect she could actually speak Chinese.' },
    { cn: '这件事竟然是真的。', en: 'Surprisingly, this turned out to be true.' },
  ],
  '镜头': [
    { cn: '摄影师调整了镜头。', en: 'The photographer adjusted the lens.' },
    { cn: '这个镜头拍得很好。', en: 'This shot was taken very well.' },
    { cn: '电影中有很多感人的镜头。', en: 'There are many touching scenes in the movie.' },
  ],
  '镜子': [
    { cn: '她每天照镜子。', en: 'She looks in the mirror every day.' },
    { cn: '镜子碎了，小心别割到手。', en: 'The mirror is broken; be careful not to cut your hand.' },
    { cn: '浴室里有一面大镜子。', en: 'There is a large mirror in the bathroom.' },
  ],
  '极': [
    { cn: '今天热极了。', en: 'It\'s extremely hot today.' },
    { cn: '南极的冰川正在融化。', en: 'The glaciers in the Antarctic are melting.' },
    { cn: '他高兴极了。', en: 'He is extremely happy.' },
  ],
  '及格': [
    { cn: '他的数学考试及格了。', en: 'He passed his math exam.' },
    { cn: '六十分以上才算及格。', en: 'You need sixty points or above to pass.' },
    { cn: '这次考试有很多人没有及格。', en: 'Many people didn\'t pass this exam.' },
  ],
  '集合': [
    { cn: '早上八点在学校门口集合。', en: 'Gather at the school gate at eight in the morning.' },
    { cn: '全体同学在操场集合。', en: 'All students assemble on the field.' },
    { cn: '这是一个数据的集合。', en: 'This is a set of data.' },
  ],
  '即将': [
    { cn: '毕业季即将到来。', en: 'Graduation season is approaching.' },
    { cn: '飞机即将起飞。', en: 'The plane is about to take off.' },
    { cn: '新产品即将上市。', en: 'The new product is about to launch.' },
  ],
  '急忙': [
    { cn: '他急忙赶去机场。', en: 'He hurriedly rushed to the airport.' },
    { cn: '听到消息后，她急忙跑了出去。', en: 'After hearing the news, she hastily ran out.' },
    { cn: '他急忙收拾好东西出门了。', en: 'He hastily packed his things and left.' },
  ],
  '极其': [
    { cn: '这件事极其重要。', en: 'This matter is extremely important.' },
    { cn: '他的表现极其出色。', en: 'His performance is extremely outstanding.' },
    { cn: '那里的环境极其恶劣。', en: 'The environment there is extremely harsh.' },
  ],
  '聚': [
    { cn: '朋友们聚在一起吃饭。', en: 'Friends gathered together for a meal.' },
    { cn: '好久没聚了，找个时间聚一聚吧。', en: 'We haven\'t gotten together in a while; let\'s find a time to meet up.' },
    { cn: '人群渐渐聚了起来。', en: 'The crowd gradually gathered.' },
  ],
  '具备': [
    { cn: '他具备当领导的能力。', en: 'He possesses the ability to be a leader.' },
    { cn: '申请人需要具备相关经验。', en: 'Applicants need to have relevant experience.' },
    { cn: '这个方案已经具备了实施条件。', en: 'This plan already has the conditions for implementation.' },
  ],
  '巨大': [
    { cn: '这是一个巨大的挑战。', en: 'This is a huge challenge.' },
    { cn: '他取得了巨大的进步。', en: 'He has made tremendous progress.' },
    { cn: '这件事产生了巨大的影响。', en: 'This event had a huge impact.' },
  ],
  '聚会': [
    { cn: '周末我们有一个聚会。', en: 'We have a party this weekend.' },
    { cn: '同学聚会上大家很开心。', en: 'Everyone was very happy at the class reunion.' },
    { cn: '他组织了一次家庭聚会。', en: 'He organized a family gathering.' },
  ],
  '距离': [
    { cn: '从这里到火车站的距离不远。', en: 'The distance from here to the train station is not far.' },
    { cn: '两个城市之间的距离很远。', en: 'The distance between the two cities is very far.' },
    { cn: '保持安全距离。', en: 'Keep a safe distance.' },
  ],
  '局': [
    { cn: '他在邮局工作。', en: 'He works at the post office.' },
    { cn: '这盘棋下了三局。', en: 'They played three rounds of chess.' },
    { cn: '目前的局势很复杂。', en: 'The current situation is very complex.' },
  ],
  '激动': [
    { cn: '听到好消息，她非常激动。', en: 'She was very excited to hear the good news.' },
    { cn: '他激动得说不出话来。', en: 'He was so moved he couldn\'t speak.' },
    { cn: '别太激动，冷静一下。', en: 'Don\'t get too excited; calm down.' },
  ],
  '机构': [
    { cn: '这是一家教育机构。', en: 'This is an educational institution.' },
    { cn: '政府机构需要改革。', en: 'Government institutions need reform.' },
    { cn: '他在一家研究机构工作。', en: 'He works at a research organization.' },
  ],
  '几乎': [
    { cn: '他几乎每天都跑步。', en: 'He runs almost every day.' },
    { cn: '这个消息几乎所有人都知道了。', en: 'Almost everyone knows this news.' },
    { cn: '我几乎忘了你的生日。', en: 'I almost forgot your birthday.' },
  ],
  '激烈': [
    { cn: '比赛非常激烈。', en: 'The competition is very fierce.' },
    { cn: '双方展开了激烈的讨论。', en: 'Both sides engaged in intense discussion.' },
    { cn: '市场竞争越来越激烈。', en: 'Market competition is becoming increasingly fierce.' },
  ],
  '积累': [
    { cn: '学习需要不断积累。', en: 'Learning requires continuous accumulation.' },
    { cn: '他积累了丰富的经验。', en: 'He has accumulated rich experience.' },
    { cn: '财富是慢慢积累起来的。', en: 'Wealth is accumulated slowly.' },
  ],
  '机遇': [
    { cn: '机遇和挑战并存。', en: 'Opportunities and challenges coexist.' },
    { cn: '他抓住了一个难得的机遇。', en: 'He seized a rare opportunity.' },
    { cn: '好的机遇不会经常出现。', en: 'Good opportunities don\'t come along often.' },
  ],
  '经典': [
    { cn: '这是一部经典的电影。', en: 'This is a classic movie.' },
    { cn: '经典作品值得反复阅读。', en: 'Classic works are worth reading repeatedly.' },
    { cn: '他引用了一句经典名言。', en: 'He quoted a classic saying.' },
  ],
  '精力': [
    { cn: '他把全部精力投入到工作中。', en: 'He put all his energy into work.' },
    { cn: '年轻人精力充沛。', en: 'Young people are full of energy.' },
    { cn: '不要浪费精力在无用的事情上。', en: 'Don\'t waste energy on useless things.' },
  ],
  '居民': [
    { cn: '这个小区有三千多居民。', en: 'This community has over three thousand residents.' },
    { cn: '居民们对新政策很满意。', en: 'The residents are very satisfied with the new policy.' },
    { cn: '城市居民的生活水平提高了。', en: 'The living standards of urban residents have improved.' },
  ],
  '居住': [
    { cn: '他在北京居住了十年。', en: 'He has lived in Beijing for ten years.' },
    { cn: '这个地方不适合居住。', en: 'This place is not suitable for living.' },
    { cn: '他们居住在城市中心。', en: 'They live in the city center.' },
  ],
  '尽快': [
    { cn: '请尽快完成这项工作。', en: 'Please complete this work as soon as possible.' },
    { cn: '我会尽快给你答复。', en: 'I will reply to you as soon as possible.' },
    { cn: '尽快把资料准备好。', en: 'Get the materials ready as soon as possible.' },
  ],
  '紧密': [
    { cn: '他们之间的关系很紧密。', en: 'The relationship between them is very close.' },
    { cn: '理论和实践要紧密结合。', en: 'Theory and practice should be closely integrated.' },
    { cn: '两国的合作日益紧密。', en: 'The cooperation between the two countries is becoming increasingly close.' },
  ],
  '快递': [
    { cn: '我的快递到了。', en: 'My express delivery has arrived.' },
    { cn: '请帮我寄一个快递。', en: 'Please help me send an express package.' },
    { cn: '快递员每天要送很多包裹。', en: 'The delivery person has to deliver many packages every day.' },
  ],
  '会计': [
    { cn: '她是一名会计。', en: 'She is an accountant.' },
    { cn: '公司需要招聘一名会计。', en: 'The company needs to hire an accountant.' },
    { cn: '他大学学的是会计专业。', en: 'He majored in accounting in college.' },
  ],
  '矿泉水': [
    { cn: '请给我一瓶矿泉水。', en: 'Please give me a bottle of mineral water.' },
    { cn: '矿泉水含有矿物质。', en: 'Mineral water contains minerals.' },
    { cn: '登山的时候要带够矿泉水。', en: 'Bring enough mineral water when climbing mountains.' },
  ],
  '扩大': [
    { cn: '公司计划扩大经营规模。', en: 'The company plans to expand its business scale.' },
    { cn: '差距在不断扩大。', en: 'The gap is constantly widening.' },
    { cn: '我们需要扩大市场。', en: 'We need to expand the market.' },
  ],
  '括号': [
    { cn: '请在括号里填上答案。', en: 'Please fill in the answer in the brackets.' },
    { cn: '括号里的内容是补充说明。', en: 'The content in the brackets is supplementary.' },
    { cn: '注意使用正确的括号。', en: 'Be sure to use the correct brackets.' },
  ],
  '扩展': [
    { cn: '公司正在扩展海外业务。', en: 'The company is expanding its overseas business.' },
    { cn: '他想扩展自己的知识面。', en: 'He wants to broaden his knowledge.' },
    { cn: '这个功能可以扩展使用。', en: 'This function can be extended for use.' },
  ],
  '宽': [
    { cn: '这条马路很宽。', en: 'This road is very wide.' },
    { cn: '这件衣服对我来说太宽了。', en: 'This piece of clothing is too wide for me.' },
    { cn: '他的心胸很宽。', en: 'He is very broad-minded.' },
  ],
  '宽广': [
    { cn: '眼前是一片宽广的草原。', en: 'Before us is a vast grassland.' },
    { cn: '他的胸怀很宽广。', en: 'He has a very broad mind.' },
    { cn: '这条河非常宽广。', en: 'This river is very wide.' },
  ],
  '看不起': [
    { cn: '不要看不起任何人。', en: 'Don\'t look down on anyone.' },
    { cn: '他被人看不起，但没有放弃。', en: 'He was looked down upon but didn\'t give up.' },
    { cn: '看不起别人是不对的。', en: 'It\'s wrong to despise others.' },
  ],
  '看来': [
    { cn: '看来他不会来了。', en: 'It seems he won\'t be coming.' },
    { cn: '看来明天会下雨。', en: 'It looks like it will rain tomorrow.' },
    { cn: '看来这个方法行不通。', en: 'Apparently this method won\'t work.' },
  ],
  '看望': [
    { cn: '周末我去看望了爷爷奶奶。', en: 'I went to visit my grandparents on the weekend.' },
    { cn: '他去医院看望了生病的朋友。', en: 'He went to the hospital to visit his sick friend.' },
    { cn: '她经常回老家看望父母。', en: 'She often goes back to her hometown to visit her parents.' },
  ],
  '开花': [
    { cn: '春天花都开花了。', en: 'In spring, the flowers all bloom.' },
    { cn: '桃树开花了，很漂亮。', en: 'The peach trees are in bloom and look beautiful.' },
    { cn: '这种植物冬天也会开花。', en: 'This plant blooms even in winter.' },
  ],
  '开水': [
    { cn: '请给我一杯开水。', en: 'Please give me a cup of boiled water.' },
    { cn: '泡茶要用开水。', en: 'Use boiling water to make tea.' },
    { cn: '小心，开水很烫。', en: 'Be careful; the boiling water is very hot.' },
  ],
  '棵': [
    { cn: '院子里有一棵大树。', en: 'There is a big tree in the yard.' },
    { cn: '他种了三棵苹果树。', en: 'He planted three apple trees.' },
    { cn: '路边每隔几米就有一棵树。', en: 'There is a tree every few meters along the road.' },
  ],
  '可见': [
    { cn: '由此可见，他说的是对的。', en: 'From this, it can be seen that what he said is correct.' },
    { cn: '可见这个问题的重要性。', en: 'This shows the importance of the issue.' },
    { cn: '他的努力可见一斑。', en: 'His efforts are clearly visible.' },
  ],
  '空间': [
    { cn: '这个房间的空间很大。', en: 'This room has a lot of space.' },
    { cn: '我们需要更多的储存空间。', en: 'We need more storage space.' },
    { cn: '给孩子一些自由的空间。', en: 'Give children some free space.' },
  ],
  '考察': [
    { cn: '他们去那里考察了一番。', en: 'They went there to inspect.' },
    { cn: '专家们正在考察当地的环境。', en: 'Experts are studying the local environment.' },
    { cn: '公司派人去国外考察。', en: 'The company sent people abroad for an inspection trip.' },
  ],
  '考虑': [
    { cn: '让我考虑一下。', en: 'Let me think about it.' },
    { cn: '你有没有考虑过换工作？', en: 'Have you considered changing jobs?' },
    { cn: '做决定之前要仔细考虑。', en: 'Think carefully before making a decision.' },
  ],
  '口袋': [
    { cn: '他把钥匙放在口袋里。', en: 'He put the keys in his pocket.' },
    { cn: '口袋里有什么？', en: 'What\'s in the pocket?' },
    { cn: '她的口袋里装满了糖果。', en: 'Her pocket is filled with candy.' },
  ],
  '口语': [
    { cn: '他的英语口语很好。', en: 'His spoken English is very good.' },
    { cn: '多练习口语很重要。', en: 'Practicing spoken language more is very important.' },
    { cn: '口语考试明天举行。', en: 'The oral exam will be held tomorrow.' },
  ],
  '苦': [
    { cn: '这种药太苦了。', en: 'This medicine is too bitter.' },
    { cn: '他小时候吃了很多苦。', en: 'He endured a lot of hardship when he was young.' },
    { cn: '苦尽甘来。', en: 'After bitterness comes sweetness.' },
  ],
  '量': [
    { cn: '她量了一下体温。', en: 'She took her temperature.' },
    { cn: '裁缝在量衣服的尺寸。', en: 'The tailor is measuring the size of the clothes.' },
    { cn: '买鞋之前先量量脚。', en: 'Measure your foot before buying shoes.' },
  ],
  '良好': [
    { cn: '他的成绩一直很良好。', en: 'His grades have always been good.' },
    { cn: '保持良好的心态很重要。', en: 'Maintaining a good attitude is important.' },
    { cn: '双方建立了良好的合作关系。', en: 'Both sides established a good cooperative relationship.' },
  ],
  '粮食': [
    { cn: '粮食是人类最基本的需要。', en: 'Food is the most basic human need.' },
    { cn: '我们不能浪费粮食。', en: 'We should not waste food.' },
    { cn: '今年粮食产量增加了。', en: 'This year\'s grain output has increased.' },
  ],
  '疗养': [
    { cn: '他去海边疗养了一段时间。', en: 'He went to the seaside to recuperate for a while.' },
    { cn: '这里是一个疗养院。', en: 'This is a sanatorium.' },
    { cn: '医生建议他休息疗养。', en: 'The doctor recommended that he rest and recuperate.' },
  ],
  '列': [
    { cn: '请把名单列出来。', en: 'Please list the names.' },
    { cn: '他列了一个购物清单。', en: 'He made a shopping list.' },
    { cn: '学生们排成一列。', en: 'The students lined up in a row.' },
  ],
  '列车': [
    { cn: '列车即将进站。', en: 'The train is about to arrive at the station.' },
    { cn: '这趟列车开往上海。', en: 'This train is heading to Shanghai.' },
    { cn: '列车上有餐车服务。', en: 'There is a dining car service on the train.' },
  ],
  '列入': [
    { cn: '这个项目已经列入了计划。', en: 'This project has been included in the plan.' },
    { cn: '长城被列入世界遗产名录。', en: 'The Great Wall was listed as a World Heritage Site.' },
    { cn: '他的名字被列入了名单。', en: 'His name was included on the list.' },
  ],
  '列为': [
    { cn: '这种动物被列为保护动物。', en: 'This animal is classified as a protected species.' },
    { cn: '他被列为重点培养对象。', en: 'He was designated as a key person to develop.' },
    { cn: '这个地区被列为旅游景点。', en: 'This area was listed as a tourist attraction.' },
  ],
  '流传': [
    { cn: '这个故事流传了几百年。', en: 'This story has been passed down for hundreds of years.' },
    { cn: '这首歌在民间广泛流传。', en: 'This song is widely circulated among the people.' },
    { cn: '这个消息很快就流传开了。', en: 'This news spread quickly.' },
  ],
  '俩': [
    { cn: '我们俩是好朋友。', en: 'The two of us are good friends.' },
    { cn: '他们俩在一起很开心。', en: 'The two of them are very happy together.' },
    { cn: '你们俩别吵了。', en: 'You two stop arguing.' },
  ],
  '两边': [
    { cn: '马路两边都是商店。', en: 'There are shops on both sides of the road.' },
    { cn: '河的两边风景不同。', en: 'The scenery on both sides of the river is different.' },
    { cn: '两边的意见都要听一听。', en: 'Listen to the opinions of both sides.' },
  ],
  '了不起': [
    { cn: '你真了不起！', en: 'You are really amazing!' },
    { cn: '能做到这一步已经很了不起了。', en: 'It\'s already remarkable to have gotten this far.' },
    { cn: '她是一个了不起的人。', en: 'She is an extraordinary person.' },
  ],
  '了解': [
    { cn: '我想了解一下这家公司。', en: 'I want to learn about this company.' },
    { cn: '你了解他吗？', en: 'Do you know him well?' },
    { cn: '我对中国文化有了更多的了解。', en: 'I have gained a better understanding of Chinese culture.' },
  ],
  '辣': [
    { cn: '四川菜很辣。', en: 'Sichuan food is very spicy.' },
    { cn: '你能吃辣吗？', en: 'Can you eat spicy food?' },
    { cn: '这道菜太辣了，我受不了。', en: 'This dish is too spicy; I can\'t take it.' },
  ],
  '落': [
    { cn: '他把钱包落在出租车上了。', en: 'He left his wallet in the taxi.' },
    { cn: '别把东西落下了。', en: 'Don\'t leave anything behind.' },
    { cn: '名单上落了他的名字。', en: 'His name was left off the list.' },
  ],
  '来不及': [
    { cn: '来不及了，我们快走吧。', en: 'There\'s no time; let\'s hurry.' },
    { cn: '已经来不及改了。', en: 'It\'s too late to change it now.' },
    { cn: '如果现在不出发，就来不及了。', en: 'If we don\'t leave now, it will be too late.' },
  ],
  '来得及': [
    { cn: '别着急，还来得及。', en: 'Don\'t worry; there\'s still time.' },
    { cn: '现在出发还来得及吗？', en: 'Is there still time if we leave now?' },
    { cn: '只要努力，一切都来得及。', en: 'As long as you work hard, everything can still be done in time.' },
  ],
  '来源': [
    { cn: '这条消息的来源可靠吗？', en: 'Is the source of this news reliable?' },
    { cn: '工资是他的主要收入来源。', en: 'His salary is his main source of income.' },
    { cn: '知识的来源有很多。', en: 'There are many sources of knowledge.' },
  ],
  '乐趣': [
    { cn: '读书给他带来了很多乐趣。', en: 'Reading brings him a lot of pleasure.' },
    { cn: '旅行的乐趣在于发现新事物。', en: 'The joy of travel lies in discovering new things.' },
    { cn: '学习中文很有乐趣。', en: 'Learning Chinese is very enjoyable.' },
  ],
  '泪': [
    { cn: '她流下了感动的泪。', en: 'She shed tears of emotion.' },
    { cn: '他含着泪说了再见。', en: 'He said goodbye with tears.' },
    { cn: '泪从她脸上流了下来。', en: 'Tears rolled down her face.' },
  ],
  '泪水': [
    { cn: '她的泪水止不住地往下流。', en: 'Her tears couldn\'t stop flowing.' },
    { cn: '泪水模糊了他的视线。', en: 'Tears blurred his vision.' },
    { cn: '她擦干了脸上的泪水。', en: 'She wiped the tears from her face.' },
  ],
  '类型': [
    { cn: '你喜欢什么类型的电影？', en: 'What type of movie do you like?' },
    { cn: '这家店有各种类型的服装。', en: 'This store has all types of clothing.' },
    { cn: '他不是我喜欢的类型。', en: 'He is not my type.' },
  ],
  '立即': [
    { cn: '请立即离开这里。', en: 'Please leave here immediately.' },
    { cn: '他立即赶到了现场。', en: 'He immediately rushed to the scene.' },
    { cn: '问题必须立即解决。', en: 'The problem must be solved immediately.' },
  ],
  '力气': [
    { cn: '他的力气很大。', en: 'He has a lot of strength.' },
    { cn: '我没有力气了。', en: 'I have no strength left.' },
    { cn: '搬这些东西需要很大的力气。', en: 'Moving these things requires a lot of strength.' },
  ],
  '历史': [
    { cn: '中国有五千年的历史。', en: 'China has five thousand years of history.' },
    { cn: '他对历史很感兴趣。', en: 'He is very interested in history.' },
    { cn: '历史不会重演。', en: 'History will not repeat itself.' },
  ],
  '利息': [
    { cn: '银行存款的利息很低。', en: 'The interest on bank deposits is very low.' },
    { cn: '贷款的利息是多少？', en: 'What is the interest on the loan?' },
    { cn: '他每个月要还一笔利息。', en: 'He has to pay a sum of interest every month.' },
  ],
  '利益': [
    { cn: '我们要维护国家的利益。', en: 'We should safeguard the interests of the country.' },
    { cn: '不能只考虑个人利益。', en: 'You can\'t only consider personal interests.' },
    { cn: '这项政策符合大众的利益。', en: 'This policy serves the interests of the public.' },
  ],
  '离不开': [
    { cn: '现代人离不开手机。', en: 'Modern people can\'t live without their phones.' },
    { cn: '植物的生长离不开阳光。', en: 'Plant growth is inseparable from sunlight.' },
    { cn: '成功离不开努力。', en: 'Success is inseparable from hard work.' },
  ],
  '厘米': [
    { cn: '这条鱼有三十厘米长。', en: 'This fish is thirty centimeters long.' },
    { cn: '一厘米等于十毫米。', en: 'One centimeter equals ten millimeters.' },
    { cn: '他比我高五厘米。', en: 'He is five centimeters taller than me.' },
  ],
  '临时': [
    { cn: '这只是一个临时的安排。', en: 'This is just a temporary arrangement.' },
    { cn: '他临时有事，来不了了。', en: 'Something came up at the last minute, and he can\'t come.' },
    { cn: '公司招了一批临时工。', en: 'The company hired a batch of temporary workers.' },
  ],
  '零食': [
    { cn: '小孩子都喜欢吃零食。', en: 'Children all like to eat snacks.' },
    { cn: '她买了很多零食带去旅行。', en: 'She bought a lot of snacks to take on the trip.' },
    { cn: '少吃零食对身体好。', en: 'Eating fewer snacks is good for health.' },
  ],
  '楼梯': [
    { cn: '电梯坏了，走楼梯吧。', en: 'The elevator is broken; let\'s take the stairs.' },
    { cn: '他跑着上了楼梯。', en: 'He ran up the stairs.' },
    { cn: '楼梯很窄，小心走。', en: 'The staircase is narrow; walk carefully.' },
  ],
  '陆地': [
    { cn: '地球表面大部分是海洋，不是陆地。', en: 'Most of the Earth\'s surface is ocean, not land.' },
    { cn: '他们终于看到了陆地。', en: 'They finally saw land.' },
    { cn: '陆地上的动物种类很多。', en: 'There are many species of land animals.' },
  ],
  '录取': [
    { cn: '他被北京大学录取了。', en: 'He was admitted to Peking University.' },
    { cn: '今年录取的分数线是多少？', en: 'What is the admission cutoff score this year?' },
    { cn: '收到录取通知书后，她高兴极了。', en: 'She was overjoyed when she received the admission letter.' },
  ],
  '陆续': [
    { cn: '客人们陆续到达了。', en: 'The guests arrived one after another.' },
    { cn: '学生们陆续走进了教室。', en: 'Students filed into the classroom one after another.' },
    { cn: '消息陆续传来。', en: 'News came in one after another.' },
  ],
  '论文': [
    { cn: '他正在写毕业论文。', en: 'He is writing his graduation thesis.' },
    { cn: '这篇论文发表在国际期刊上。', en: 'This paper was published in an international journal.' },
    { cn: '论文的截止日期快到了。', en: 'The deadline for the thesis is approaching.' },
  ],
  '轮': [
    { cn: '该轮到你了。', en: 'It\'s your turn.' },
    { cn: '车轮坏了，需要修理。', en: 'The wheel is broken and needs repair.' },
    { cn: '比赛进入了第二轮。', en: 'The competition has entered the second round.' },
  ],
  '轮船': [
    { cn: '他们坐轮船过了大海。', en: 'They crossed the sea by steamship.' },
    { cn: '轮船在海上行驶着。', en: 'The steamer is sailing on the sea.' },
    { cn: '港口停着几艘大轮船。', en: 'Several large ships are docked at the port.' },
  ],
  '轮椅': [
    { cn: '他受伤后需要坐轮椅。', en: 'He needs to use a wheelchair after his injury.' },
    { cn: '医院门口有轮椅可以借。', en: 'There are wheelchairs available to borrow at the hospital entrance.' },
    { cn: '她推着轮椅上的老人散步。', en: 'She pushed the elderly person in the wheelchair for a walk.' },
  ],
  '轮子': [
    { cn: '自行车的轮子坏了。', en: 'The bicycle wheel is broken.' },
    { cn: '轮子不停地转。', en: 'The wheel keeps turning.' },
    { cn: '换一个新轮子吧。', en: 'Let\'s change to a new wheel.' },
  ],
  '垃圾': [
    { cn: '请把垃圾扔到垃圾桶里。', en: 'Please throw the trash in the trash can.' },
    { cn: '不要乱扔垃圾。', en: 'Don\'t litter.' },
    { cn: '垃圾分类很重要。', en: 'Garbage sorting is very important.' },
  ],
  '拉开': [
    { cn: '她拉开了窗帘。', en: 'She pulled open the curtains.' },
    { cn: '两个人的差距正在拉开。', en: 'The gap between the two is widening.' },
    { cn: '他拉开了抽屉。', en: 'He pulled open the drawer.' },
  ],
  '冷静': [
    { cn: '遇到问题要冷静。', en: 'Stay calm when encountering problems.' },
    { cn: '请你冷静一下。', en: 'Please calm down.' },
    { cn: '她是一个非常冷静的人。', en: 'She is a very calm person.' },
  ],
  '老公': [
    { cn: '她的老公在银行工作。', en: 'Her husband works at a bank.' },
    { cn: '老公，帮我拿一下那个东西。', en: 'Honey, help me get that thing.' },
    { cn: '她和老公一起去旅行了。', en: 'She went traveling with her husband.' },
  ],
  '老家': [
    { cn: '过年了，我要回老家。', en: 'It\'s New Year; I\'m going back to my hometown.' },
    { cn: '他的老家在东北。', en: 'His hometown is in the northeast.' },
    { cn: '她很想念老家的亲人。', en: 'She misses her family back home.' },
  ],
  '老婆': [
    { cn: '他很爱他的老婆。', en: 'He loves his wife very much.' },
    { cn: '老婆做的饭很好吃。', en: 'The food my wife makes is delicious.' },
    { cn: '他和老婆结婚十年了。', en: 'He has been married to his wife for ten years.' },
  ],
  '老实': [
    { cn: '他是个老实人。', en: 'He is an honest person.' },
    { cn: '老实说，我不太同意。', en: 'Honestly speaking, I don\'t quite agree.' },
    { cn: '这个孩子很老实。', en: 'This child is very well-behaved.' },
  ],
  '律师': [
    { cn: '他请了一位律师。', en: 'He hired a lawyer.' },
    { cn: '律师在法庭上为他辩护。', en: 'The lawyer defended him in court.' },
    { cn: '她是一名有名的律师。', en: 'She is a famous lawyer.' },
  ],
  '面临': [
    { cn: '我们面临着很大的挑战。', en: 'We are facing great challenges.' },
    { cn: '公司面临破产的危险。', en: 'The company is facing the danger of bankruptcy.' },
    { cn: '毕业生面临就业压力。', en: 'Graduates face employment pressure.' },
  ],
  '面试': [
    { cn: '明天我要去面试。', en: 'I have a job interview tomorrow.' },
    { cn: '面试的时候要穿正装。', en: 'Wear formal clothes for the interview.' },
    { cn: '她通过了面试。', en: 'She passed the interview.' },
  ],
  '描述': [
    { cn: '请描述一下你看到的情况。', en: 'Please describe what you saw.' },
    { cn: '他的描述非常生动。', en: 'His description is very vivid.' },
    { cn: '无法用言语描述那种感觉。', en: 'That feeling cannot be described in words.' },
  ],
  '描写': [
    { cn: '这部小说描写了农村生活。', en: 'This novel depicts rural life.' },
    { cn: '作者描写人物非常细腻。', en: 'The author portrays characters very delicately.' },
    { cn: '他的文章描写了美丽的自然风光。', en: 'His article describes beautiful natural scenery.' },
  ],
  '免费': [
    { cn: '这个活动是免费的。', en: 'This event is free of charge.' },
    { cn: '儿童可以免费入场。', en: 'Children can enter for free.' },
    { cn: '她在网上下载了免费的软件。', en: 'She downloaded free software online.' },
  ],
  '帽子': [
    { cn: '她戴了一顶红色的帽子。', en: 'She wore a red hat.' },
    { cn: '帽子被风吹走了。', en: 'The hat was blown away by the wind.' },
    { cn: '这顶帽子很适合你。', en: 'This hat suits you very well.' },
  ],
  '毛巾': [
    { cn: '请给我一条毛巾。', en: 'Please give me a towel.' },
    { cn: '毛巾应该经常换洗。', en: 'Towels should be washed regularly.' },
    { cn: '他用毛巾擦了擦脸。', en: 'He wiped his face with a towel.' },
  ],
  '毛衣': [
    { cn: '天冷了，穿一件毛衣吧。', en: 'It\'s cold; put on a sweater.' },
    { cn: '奶奶给我织了一件毛衣。', en: 'Grandma knitted a sweater for me.' },
    { cn: '这件毛衣很暖和。', en: 'This sweater is very warm.' },
  ],
  '梦': [
    { cn: '昨晚我做了一个奇怪的梦。', en: 'I had a strange dream last night.' },
    { cn: '他的梦想终于实现了。', en: 'His dream finally came true.' },
    { cn: '她在梦中笑了。', en: 'She smiled in her dream.' },
  ],
  '梦见': [
    { cn: '我昨晚梦见了小时候的朋友。', en: 'I dreamed of my childhood friend last night.' },
    { cn: '她经常梦见回到老家。', en: 'She often dreams about going back to her hometown.' },
    { cn: '他梦见自己在天上飞。', en: 'He dreamed that he was flying in the sky.' },
  ],
  '梦想': [
    { cn: '他的梦想是当一名医生。', en: 'His dream is to become a doctor.' },
    { cn: '不要轻易放弃自己的梦想。', en: 'Don\'t easily give up on your dreams.' },
    { cn: '只要努力，梦想就能实现。', en: 'As long as you work hard, dreams can come true.' },
  ],
  '没错': [
    { cn: '没错，就是这样。', en: 'That\'s right, that\'s how it is.' },
    { cn: '你说得没错。', en: 'What you said is correct.' },
    { cn: '没错，我就是这么想的。', en: 'That\'s right; that\'s exactly what I think.' },
  ],
  '没想到': [
    { cn: '没想到你会来。', en: 'I didn\'t expect you to come.' },
    { cn: '没想到事情会变成这样。', en: 'I didn\'t expect things to turn out like this.' },
    { cn: '真没想到他能考第一名。', en: 'I really didn\'t expect him to get first place.' },
  ],
  '没法儿': [
    { cn: '这么多作业，没法儿做完。', en: 'So much homework; there\'s no way to finish it.' },
    { cn: '路太堵了，没法儿开车。', en: 'The road is too congested; there\'s no way to drive.' },
    { cn: '他这个人没法儿沟通。', en: 'There\'s no way to communicate with this person.' },
  ],
  '密': [
    { cn: '这片树林很密。', en: 'This forest is very dense.' },
    { cn: '人口密度很高。', en: 'The population density is very high.' },
    { cn: '他把密封的信打开了。', en: 'He opened the sealed letter.' },
  ],
  '秘密': [
    { cn: '我告诉你一个秘密。', en: 'I\'ll tell you a secret.' },
    { cn: '这件事是秘密，不能告诉别人。', en: 'This matter is a secret; you can\'t tell others.' },
    { cn: '她偷偷地保守着这个秘密。', en: 'She secretly kept this secret.' },
  ],
  '密码': [
    { cn: '请输入你的密码。', en: 'Please enter your password.' },
    { cn: '我忘了银行卡的密码。', en: 'I forgot my bank card password.' },
    { cn: '密码要设得复杂一点。', en: 'The password should be set to be more complex.' },
  ],
  '密切': [
    { cn: '他们的关系非常密切。', en: 'Their relationship is very close.' },
    { cn: '我们要密切关注事态发展。', en: 'We should closely monitor the development of the situation.' },
    { cn: '两国的经济联系日益密切。', en: 'The economic ties between the two countries are increasingly close.' },
  ],
  '秘书': [
    { cn: '她是总经理的秘书。', en: 'She is the general manager\'s secretary.' },
    { cn: '秘书帮他安排了会议。', en: 'The secretary arranged a meeting for him.' },
    { cn: '他在公司做了三年秘书。', en: 'He worked as a secretary at the company for three years.' },
  ],
  '名片': [
    { cn: '这是我的名片。', en: 'This is my business card.' },
    { cn: '请收下我的名片。', en: 'Please accept my card.' },
    { cn: '他交换了名片。', en: 'He exchanged business cards.' },
  ],
  '名人': [
    { cn: '他是一位有名的名人。', en: 'He is a well-known celebrity.' },
    { cn: '名人的生活并不容易。', en: 'The life of a celebrity is not easy.' },
    { cn: '很多名人来参加了这次活动。', en: 'Many celebrities came to this event.' },
  ],
  '名牌儿': [
    { cn: '她喜欢买名牌儿。', en: 'She likes to buy famous brands.' },
    { cn: '这件衣服是名牌儿的。', en: 'This piece of clothing is a famous brand.' },
    { cn: '名牌儿的东西不一定都好。', en: 'Famous brand items are not necessarily all good.' },
  ],
  '末': [
    { cn: '月末有一场考试。', en: 'There is an exam at the end of the month.' },
    { cn: '这是学期末的总结。', en: 'This is the summary for the end of the semester.' },
    { cn: '明朝末年发生了很多战争。', en: 'Many wars occurred at the end of the Ming Dynasty.' },
  ],
  '默默': [
    { cn: '她默默地流下了眼泪。', en: 'She silently shed tears.' },
    { cn: '他默默地为大家付出了很多。', en: 'He silently gave a lot for everyone.' },
    { cn: '老师默默地关注着每一个学生。', en: 'The teacher silently pays attention to every student.' },
  ],
  '模特儿': [
    { cn: '她是一名时装模特儿。', en: 'She is a fashion model.' },
    { cn: '模特儿在台上走秀。', en: 'The model is walking the runway on stage.' },
    { cn: '他梦想成为一名模特儿。', en: 'He dreams of becoming a model.' },
  ],
  '模型': [
    { cn: '他做了一个飞机模型。', en: 'He made an airplane model.' },
    { cn: '这是一个建筑模型。', en: 'This is an architectural model.' },
    { cn: '科学家建立了一个数学模型。', en: 'The scientists built a mathematical model.' },
  ],
  '美金': [
    { cn: '这件东西要五百美金。', en: 'This item costs five hundred US dollars.' },
    { cn: '他换了一些美金。', en: 'He exchanged some US dollars.' },
    { cn: '美金和人民币的汇率不断变化。', en: 'The exchange rate between USD and RMB keeps changing.' },
  ],
  '美女': [
    { cn: '她是公认的美女。', en: 'She is a recognized beauty.' },
    { cn: '美女，请问这个怎么卖？', en: 'Miss, how much does this cost?' },
    { cn: '他画了一幅美女的肖像。', en: 'He painted a portrait of a beautiful woman.' },
  ],
  '摸': [
    { cn: '小孩子喜欢摸小动物。', en: 'Little children like to touch small animals.' },
    { cn: '他摸了摸口袋，什么都没有。', en: 'He felt around in his pocket but found nothing.' },
    { cn: '别摸那个，很危险。', en: 'Don\'t touch that; it\'s dangerous.' },
  ],
  '暖气': [
    { cn: '北方冬天都有暖气。', en: 'In the north, there is heating in winter.' },
    { cn: '暖气开了，房间很暖和。', en: 'The heating is on; the room is very warm.' },
    { cn: '暖气坏了，找人来修吧。', en: 'The heater is broken; let\'s find someone to fix it.' },
  ],
  '闹': [
    { cn: '小孩子在屋里闹个不停。', en: 'The children are making a fuss nonstop in the room.' },
    { cn: '别闹了，安静一点。', en: 'Stop making noise; be quiet.' },
    { cn: '他们闹了一场大矛盾。', en: 'They had a big conflict.' },
  ],
  '闹钟': [
    { cn: '闹钟响了，该起床了。', en: 'The alarm clock rang; it\'s time to get up.' },
    { cn: '我忘了设闹钟。', en: 'I forgot to set the alarm clock.' },
    { cn: '把闹钟定在早上六点。', en: 'Set the alarm for six in the morning.' },
  ],
  '难免': [
    { cn: '生活中难免会遇到困难。', en: 'In life, it\'s inevitable to encounter difficulties.' },
    { cn: '初学者犯错是难免的。', en: 'It\'s hard for beginners to avoid making mistakes.' },
    { cn: '人生难免有遗憾。', en: 'It\'s hard to avoid regrets in life.' },
  ],
  '男女': [
    { cn: '男女平等是社会进步的标志。', en: 'Gender equality is a sign of social progress.' },
    { cn: '这个班有十五个男女学生。', en: 'This class has fifteen male and female students.' },
    { cn: '男女老少都喜欢这个节目。', en: 'Men, women, old and young all like this show.' },
  ],
  '男士': [
    { cn: '这位男士是谁？', en: 'Who is this gentleman?' },
    { cn: '男士请穿正装出席。', en: 'Gentlemen, please wear formal attire.' },
    { cn: '这是男士专用的洗手间。', en: 'This is the men\'s restroom.' },
  ],
  '内部': [
    { cn: '这是公司的内部文件。', en: 'This is an internal company document.' },
    { cn: '内部矛盾需要尽快解决。', en: 'Internal conflicts need to be resolved quickly.' },
    { cn: '他了解组织的内部情况。', en: 'He understands the internal situation of the organization.' },
  ],
  '内科': [
    { cn: '他在医院内科工作。', en: 'He works in the internal medicine department at the hospital.' },
    { cn: '内科门诊在二楼。', en: 'The internal medicine outpatient clinic is on the second floor.' },
    { cn: '你应该先去看内科。', en: 'You should go to the internal medicine department first.' },
  ],
  '能干': [
    { cn: '她是一个很能干的人。', en: 'She is a very capable person.' },
    { cn: '这个年轻人真能干。', en: 'This young person is really competent.' },
    { cn: '能干的人到哪里都受欢迎。', en: 'Capable people are welcome everywhere.' },
  ],
  '宁静': [
    { cn: '夜晚的湖边很宁静。', en: 'The lakeside at night is very tranquil.' },
    { cn: '他向往宁静的生活。', en: 'He yearns for a tranquil life.' },
    { cn: '教室里一片宁静。', en: 'The classroom is completely quiet.' },
  ],
  '浓': [
    { cn: '这杯咖啡太浓了。', en: 'This cup of coffee is too strong.' },
    { cn: '花园里花香很浓。', en: 'The floral scent in the garden is strong.' },
    { cn: '他们之间的友情很浓。', en: 'The friendship between them is deep.' },
  ],
  '哪怕': [
    { cn: '哪怕只有一点希望，也不放弃。', en: 'Even if there is only a little hope, don\'t give up.' },
    { cn: '哪怕下雨，我也要去。', en: 'Even if it rains, I\'m going.' },
    { cn: '哪怕失败了，也要试一试。', en: 'Even if you fail, you should still try.' },
  ],
  '脑袋': [
    { cn: '他的脑袋很聪明。', en: 'He has a smart head.' },
    { cn: '我的脑袋疼。', en: 'My head hurts.' },
    { cn: '他摇了摇脑袋。', en: 'He shook his head.' },
  ],
  '女士': [
    { cn: '女士们先生们，欢迎大家。', en: 'Ladies and gentlemen, welcome.' },
    { cn: '这位女士想买什么？', en: 'What would this lady like to buy?' },
    { cn: '女士优先。', en: 'Ladies first.' },
  ],
  '片面': [
    { cn: '你的看法太片面了。', en: 'Your view is too one-sided.' },
    { cn: '不能只听片面之词。', en: 'You can\'t just listen to one side of the story.' },
    { cn: '片面的理解会导致错误的结论。', en: 'A one-sided understanding will lead to wrong conclusions.' },
  ],
  '胖子': [
    { cn: '他小时候是个胖子。', en: 'He was a fat kid when he was young.' },
    { cn: '胖子跑步比较吃力。', en: 'Running is harder for overweight people.' },
    { cn: '别叫他胖子，那样不礼貌。', en: 'Don\'t call him fatty; that\'s rude.' },
  ],
  '牌': [
    { cn: '晚上我们打牌吧。', en: 'Let\'s play cards tonight.' },
    { cn: '他手里的牌不太好。', en: 'The cards in his hand are not very good.' },
    { cn: '这个牌子的手机很好用。', en: 'This brand of phone works well.' },
  ],
  '排列': [
    { cn: '请按照顺序排列。', en: 'Please arrange them in order.' },
    { cn: '这些数字是怎么排列的？', en: 'How are these numbers arranged?' },
    { cn: '学生们按照身高排列。', en: 'The students are lined up by height.' },
  ],
  '盘': [
    { cn: '请再来一盘饺子。', en: 'Please bring another plate of dumplings.' },
    { cn: '她端来了一盘水果。', en: 'She brought over a plate of fruit.' },
    { cn: '他吃了两盘菜。', en: 'He ate two plates of food.' },
  ],
  '盘子': [
    { cn: '请把盘子洗了。', en: 'Please wash the plates.' },
    { cn: '盘子里还有剩菜。', en: 'There are leftovers on the plate.' },
    { cn: '她买了一套新盘子。', en: 'She bought a new set of plates.' },
  ],
  '培训': [
    { cn: '公司组织了一次培训。', en: 'The company organized a training session.' },
    { cn: '新员工需要接受培训。', en: 'New employees need to receive training.' },
    { cn: '他参加了一个英语培训班。', en: 'He attended an English training class.' },
  ],
  '培训班': [
    { cn: '她报了一个舞蹈培训班。', en: 'She signed up for a dance training class.' },
    { cn: '这个培训班为期三个月。', en: 'This training class lasts three months.' },
    { cn: '暑假有很多培训班。', en: 'There are many training classes in summer.' },
  ],
  '培育': [
    { cn: '科学家培育了新品种的水稻。', en: 'Scientists bred a new variety of rice.' },
    { cn: '培育人才是学校的任务。', en: 'Cultivating talent is the task of schools.' },
    { cn: '园丁精心培育这些花朵。', en: 'The gardener carefully cultivates these flowers.' },
  ],
  '培养': [
    { cn: '要从小培养孩子的好习惯。', en: 'Good habits should be cultivated in children from a young age.' },
    { cn: '大学的任务是培养人才。', en: 'The task of universities is to cultivate talent.' },
    { cn: '她正在培养自己的兴趣爱好。', en: 'She is developing her hobbies and interests.' },
  ],
  '平方': [
    { cn: '这间房子有一百平方米。', en: 'This house is one hundred square meters.' },
    { cn: '三的平方是九。', en: 'Three squared is nine.' },
    { cn: '公园的面积有五百平方米。', en: 'The park covers an area of five hundred square meters.' },
  ],
  '平静': [
    { cn: '湖面很平静。', en: 'The lake surface is very calm.' },
    { cn: '她的心情渐渐平静下来了。', en: 'Her mood gradually calmed down.' },
    { cn: '他用平静的语气说话。', en: 'He spoke in a calm tone.' },
  ],
  '平均': [
    { cn: '平均每天工作八小时。', en: 'On average, eight hours of work per day.' },
    { cn: '班里的平均成绩提高了。', en: 'The class\'s average score has improved.' },
    { cn: '请把蛋糕平均分成四份。', en: 'Please divide the cake evenly into four pieces.' },
  ],
  '平稳': [
    { cn: '飞机飞行得很平稳。', en: 'The plane is flying very smoothly.' },
    { cn: '经济发展保持平稳。', en: 'Economic development has remained steady.' },
    { cn: '他的情绪很平稳。', en: 'His emotions are very stable.' },
  ],
  '破产': [
    { cn: '那家公司已经破产了。', en: 'That company has already gone bankrupt.' },
    { cn: '他差点破产。', en: 'He almost went bankrupt.' },
    { cn: '破产的原因是管理不善。', en: 'The reason for the bankruptcy was poor management.' },
  ],
  '迫切': [
    { cn: '他迫切地想找到一份工作。', en: 'He urgently wants to find a job.' },
    { cn: '解决污染问题非常迫切。', en: 'Solving the pollution problem is very urgent.' },
    { cn: '大家都有迫切的愿望。', en: 'Everyone has an urgent desire.' },
  ],
  '拍照': [
    { cn: '我们在这里拍照吧。', en: 'Let\'s take a picture here.' },
    { cn: '她喜欢用手机拍照。', en: 'She likes to take photos with her phone.' },
    { cn: '这里不允许拍照。', en: 'Photography is not allowed here.' },
  ],
  '批': [
    { cn: '老师批了我们的作业。', en: 'The teacher graded our homework.' },
    { cn: '这批货质量不错。', en: 'This batch of goods is of good quality.' },
    { cn: '他批评了那种做法。', en: 'He criticized that approach.' },
  ],
  '品质': [
    { cn: '诚实是一种好品质。', en: 'Honesty is a good quality.' },
    { cn: '这个产品的品质很好。', en: 'The quality of this product is very good.' },
    { cn: '他是一个品质高尚的人。', en: 'He is a person of high quality.' },
  ],
  '前头': [
    { cn: '前头有一家超市。', en: 'There is a supermarket up ahead.' },
    { cn: '他走在队伍的前头。', en: 'He walks at the front of the line.' },
    { cn: '前头的路不太好走。', en: 'The road ahead is not easy to walk.' },
  ],
  '前途': [
    { cn: '他的前途一片光明。', en: 'His future is bright.' },
    { cn: '年轻人要为自己的前途努力。', en: 'Young people should work hard for their future.' },
    { cn: '这个专业的前途怎么样？', en: 'What are the prospects for this major?' },
  ],
  '穷': [
    { cn: '他小时候家里很穷。', en: 'His family was very poor when he was young.' },
    { cn: '虽然穷，但他很快乐。', en: 'Although poor, he is very happy.' },
    { cn: '穷人的生活很不容易。', en: 'Life is not easy for the poor.' },
  ],
  '穷人': [
    { cn: '社会应该帮助穷人。', en: 'Society should help the poor.' },
    { cn: '穷人也有追求幸福的权利。', en: 'Poor people also have the right to pursue happiness.' },
    { cn: '政府制定了帮助穷人的政策。', en: 'The government has formulated policies to help the poor.' },
  ],
  '切': [
    { cn: '请把苹果切成小块。', en: 'Please cut the apple into small pieces.' },
    { cn: '她在厨房切菜。', en: 'She is cutting vegetables in the kitchen.' },
    { cn: '小心别切到手。', en: 'Be careful not to cut your hand.' },
  ],
  '秋季': [
    { cn: '秋季是丰收的季节。', en: 'Autumn is the harvest season.' },
    { cn: '秋季的天气很凉爽。', en: 'The weather in autumn is very cool.' },
    { cn: '秋季学期下周开始。', en: 'The fall semester starts next week.' },
  ],
  '巧克力': [
    { cn: '她最喜欢吃巧克力。', en: 'She loves eating chocolate the most.' },
    { cn: '他送了她一盒巧克力。', en: 'He gave her a box of chocolates.' },
    { cn: '巧克力吃多了会胖。', en: 'Eating too much chocolate will make you gain weight.' },
  ],
  '权利': [
    { cn: '每个人都有受教育的权利。', en: 'Everyone has the right to education.' },
    { cn: '我们要维护自己的权利。', en: 'We should protect our rights.' },
    { cn: '公民享有平等的权利。', en: 'Citizens enjoy equal rights.' },
  ],
  '却': [
    { cn: '他很聪明，却不爱学习。', en: 'He is very smart but doesn\'t like to study.' },
    { cn: '天气预报说今天晴天，却下起了雨。', en: 'The forecast said sunny today, but it rained instead.' },
    { cn: '她嘴上说不在乎，心里却很难过。', en: 'She says she doesn\'t care, but she\'s actually very sad.' },
  ],
  '确认': [
    { cn: '请确认你的订单。', en: 'Please confirm your order.' },
    { cn: '我已经确认了航班信息。', en: 'I have confirmed the flight information.' },
    { cn: '他确认了消息的真实性。', en: 'He verified the authenticity of the news.' },
  ],
  '器官': [
    { cn: '心脏是人体最重要的器官之一。', en: 'The heart is one of the most important organs in the human body.' },
    { cn: '器官移植手术很复杂。', en: 'Organ transplant surgery is very complex.' },
    { cn: '保护好自己的器官很重要。', en: 'It\'s important to take care of your organs.' },
  ],
  '气球': [
    { cn: '孩子们喜欢玩气球。', en: 'Children like to play with balloons.' },
    { cn: '天空中飘着很多气球。', en: 'Many balloons are floating in the sky.' },
    { cn: '生日派对上挂满了气球。', en: 'The birthday party was decorated with balloons.' },
  ],
  '汽水': [
    { cn: '天气热，来一瓶汽水吧。', en: 'It\'s hot; let\'s have a bottle of soda.' },
    { cn: '他不喜欢喝汽水。', en: 'He doesn\'t like drinking soda.' },
    { cn: '汽水喝多了对牙齿不好。', en: 'Drinking too much soda is bad for your teeth.' },
  ],
  '汽油': [
    { cn: '汽油价格又涨了。', en: 'Gasoline prices have gone up again.' },
    { cn: '这辆车加什么汽油？', en: 'What gasoline does this car take?' },
    { cn: '汽油快用完了。', en: 'The gasoline is almost used up.' },
  ],
  '其余': [
    { cn: '除了他以外，其余的人都到了。', en: 'Everyone except him has arrived.' },
    { cn: '其余的事情明天再说。', en: 'The rest of the matters can wait until tomorrow.' },
    { cn: '他只吃了一个苹果，其余的都留给了弟弟。', en: 'He only ate one apple and left the rest for his younger brother.' },
  ],
  '情景': [
    { cn: '这是一个感人的情景。', en: 'This is a touching scene.' },
    { cn: '当时的情景让人难忘。', en: 'The scene at that time was unforgettable.' },
    { cn: '老师用情景对话的方式教学。', en: 'The teacher teaches using situational dialogues.' },
  ],
  '期待': [
    { cn: '我很期待明天的旅行。', en: 'I\'m really looking forward to tomorrow\'s trip.' },
    { cn: '大家都期待着好消息。', en: 'Everyone is looking forward to good news.' },
    { cn: '他没有辜负父母的期待。', en: 'He didn\'t disappoint his parents\' expectations.' },
  ],
  '期间': [
    { cn: '春节期间，大家都放假了。', en: 'During the Spring Festival, everyone is on holiday.' },
    { cn: '在此期间，他一直在学习。', en: 'During this period, he has been studying.' },
    { cn: '比赛期间不能使用手机。', en: 'You can\'t use your phone during the competition.' },
  ],
  '期末': [
    { cn: '期末考试下周开始。', en: 'Final exams start next week.' },
    { cn: '期末的时候大家都很紧张。', en: 'Everyone is very nervous at the end of the term.' },
    { cn: '他的期末成绩很好。', en: 'His end-of-term grades are very good.' },
  ],
  '期限': [
    { cn: '申请的期限是什么时候？', en: 'What is the deadline for the application?' },
    { cn: '还款期限已经到了。', en: 'The repayment deadline has arrived.' },
    { cn: '我们要在期限内完成任务。', en: 'We must complete the task within the time limit.' },
  ],
  '期中': [
    { cn: '期中考试你准备好了吗？', en: 'Are you ready for the midterm exam?' },
    { cn: '期中成绩还不错。', en: 'The midterm grades are pretty good.' },
    { cn: '期中的时候我们会做一次总结。', en: 'We will do a summary at midterm.' },
  ],
  '妻子': [
    { cn: '他和妻子结婚十年了。', en: 'He has been married to his wife for ten years.' },
    { cn: '他的妻子是一名老师。', en: 'His wife is a teacher.' },
    { cn: '妻子为他准备了丰盛的晚餐。', en: 'His wife prepared a rich dinner for him.' },
  ],
  '亲密': [
    { cn: '他们是一对亲密的朋友。', en: 'They are a pair of close friends.' },
    { cn: '两国关系越来越亲密。', en: 'Relations between the two countries are getting closer.' },
    { cn: '她和母亲的关系非常亲密。', en: 'Her relationship with her mother is very intimate.' },
  ],
  '亲爱': [
    { cn: '亲爱的同学们，大家好。', en: 'Dear classmates, hello everyone.' },
    { cn: '亲爱的妈妈，节日快乐。', en: 'Dear Mom, happy holiday.' },
    { cn: '她对亲爱的家人很想念。', en: 'She misses her dear family very much.' },
  ],
  '青春': [
    { cn: '青春是最美好的时光。', en: 'Youth is the most beautiful time.' },
    { cn: '他们把青春献给了事业。', en: 'They devoted their youth to their career.' },
    { cn: '青春一去不复返。', en: 'Youth never comes back once it\'s gone.' },
  ],
  '轻松': [
    { cn: '考完试后，大家都很轻松。', en: 'After the exam, everyone felt relaxed.' },
    { cn: '周末可以轻松一下。', en: 'You can relax on the weekend.' },
    { cn: '他用轻松的语气说话。', en: 'He spoke in a relaxed tone.' },
  ],
  '清醒': [
    { cn: '他终于清醒过来了。', en: 'He finally regained consciousness.' },
    { cn: '头脑要保持清醒。', en: 'Keep a clear head.' },
    { cn: '喝杯咖啡让自己清醒一下。', en: 'Have a cup of coffee to wake yourself up.' },
  ],
  '轻易': [
    { cn: '不要轻易放弃。', en: 'Don\'t give up easily.' },
    { cn: '他不会轻易相信别人。', en: 'He won\'t easily trust others.' },
    { cn: '成功不是轻易能得到的。', en: 'Success is not easily obtained.' },
  ],
  '趋势': [
    { cn: '这是一个发展趋势。', en: 'This is a development trend.' },
    { cn: '经济呈现增长的趋势。', en: 'The economy is showing a trend of growth.' },
    { cn: '网购已经成为一种趋势。', en: 'Online shopping has become a trend.' },
  ],
  '企业': [
    { cn: '他在一家大企业工作。', en: 'He works at a large enterprise.' },
    { cn: '中小企业需要更多支持。', en: 'Small and medium enterprises need more support.' },
    { cn: '这家企业有一百多名员工。', en: 'This company has over one hundred employees.' },
  ],
  '弱': [
    { cn: '他的身体比较弱。', en: 'His body is relatively weak.' },
    { cn: '信号太弱了，上不了网。', en: 'The signal is too weak to get online.' },
    { cn: '弱者也有自己的力量。', en: 'Even the weak have their own strength.' },
  ],
  '燃料': [
    { cn: '飞机需要大量的燃料。', en: 'Airplanes require a lot of fuel.' },
    { cn: '这种燃料燃烧效率很高。', en: 'This fuel burns very efficiently.' },
    { cn: '科学家正在研发新型燃料。', en: 'Scientists are developing new types of fuel.' },
  ],
  '燃烧': [
    { cn: '木头在火中燃烧。', en: 'Wood burns in the fire.' },
    { cn: '森林正在燃烧。', en: 'The forest is burning.' },
    { cn: '他燃烧着对事业的热情。', en: 'He burns with passion for his career.' },
  ],
  '然而': [
    { cn: '他很努力，然而没有成功。', en: 'He worked very hard; however, he did not succeed.' },
    { cn: '计划很完美，然而执行起来有困难。', en: 'The plan is perfect; however, it is difficult to implement.' },
    { cn: '天气预报说是晴天，然而下了雨。', en: 'The forecast said sunny, yet it rained.' },
  ],
  '热闹': [
    { cn: '过年的时候特别热闹。', en: 'It\'s especially lively during the New Year.' },
    { cn: '街上很热闹。', en: 'The streets are very bustling.' },
    { cn: '我们来凑个热闹吧。', en: 'Let\'s join in the fun.' },
  ],
  '热心': [
    { cn: '她是一个热心的人。', en: 'She is a warm-hearted person.' },
    { cn: '他很热心地帮助了我。', en: 'He enthusiastically helped me.' },
    { cn: '热心的邻居帮我找到了钥匙。', en: 'A warm-hearted neighbor helped me find my keys.' },
  ],
  '人家': [
    { cn: '人家都走了，你还不走？', en: 'Everyone else has left; aren\'t you going?' },
    { cn: '村子里有几十户人家。', en: 'There are several dozen households in the village.' },
    { cn: '别管人家的事。', en: 'Don\'t meddle in other people\'s business.' },
  ],
  '日记': [
    { cn: '她每天都写日记。', en: 'She writes in her diary every day.' },
    { cn: '日记记录了他的成长。', en: 'The diary recorded his growth.' },
    { cn: '他翻开了小时候的日记。', en: 'He opened his childhood diary.' },
  ],
  '日历': [
    { cn: '看一下日历，今天几号？', en: 'Check the calendar; what\'s the date today?' },
    { cn: '日历上标着几个重要的日子。', en: 'Several important dates are marked on the calendar.' },
    { cn: '他在手机上查了日历。', en: 'He checked the calendar on his phone.' },
  ],
  '如今': [
    { cn: '如今的生活比以前好多了。', en: 'Life nowadays is much better than before.' },
    { cn: '如今科技发展很快。', en: 'Technology is developing rapidly nowadays.' },
    { cn: '如今他已经是一名成功的企业家。', en: 'Now he is already a successful entrepreneur.' },
  ],
  '帅': [
    { cn: '他长得很帅。', en: 'He is very handsome.' },
    { cn: '你今天穿得很帅。', en: 'You look very sharp today.' },
    { cn: '她觉得这个演员很帅。', en: 'She thinks this actor is very handsome.' },
  ],
  '帅哥': [
    { cn: '帅哥，请问这个怎么走？', en: 'Excuse me, handsome, how do I get there?' },
    { cn: '他是学校里有名的帅哥。', en: 'He is a well-known handsome guy in the school.' },
    { cn: '她找了一个帅哥做男朋友。', en: 'She found a handsome guy as her boyfriend.' },
  ],
  '率先': [
    { cn: '他率先完成了任务。', en: 'He took the lead in completing the task.' },
    { cn: '中国率先发展了高铁技术。', en: 'China took the lead in developing high-speed rail technology.' },
    { cn: '这家公司率先采用了新技术。', en: 'This company was the first to adopt the new technology.' },
  ],
  '睡着': [
    { cn: '孩子已经睡着了。', en: 'The child has fallen asleep.' },
    { cn: '他看电影的时候睡着了。', en: 'He fell asleep while watching the movie.' },
    { cn: '昨晚我很久才睡着。', en: 'It took me a long time to fall asleep last night.' },
  ],
  '刷': [
    { cn: '他在刷牙。', en: 'He is brushing his teeth.' },
    { cn: '请把墙壁刷一下。', en: 'Please paint the wall.' },
    { cn: '她用刷子刷鞋。', en: 'She is brushing her shoes with a brush.' },
  ],
  '刷牙': [
    { cn: '早上起来要刷牙。', en: 'Brush your teeth when you wake up in the morning.' },
    { cn: '他每天刷牙两次。', en: 'He brushes his teeth twice a day.' },
    { cn: '刷牙是保护牙齿的好方法。', en: 'Brushing teeth is a good way to protect your teeth.' },
  ],
  '刷子': [
    { cn: '他用刷子刷干净了鞋。', en: 'He cleaned his shoes with a brush.' },
    { cn: '画家用刷子画画。', en: 'The painter paints with a brush.' },
    { cn: '这把刷子很好用。', en: 'This brush works well.' },
  ],
  '说不定': [
    { cn: '说不定他已经到了。', en: 'Maybe he has already arrived.' },
    { cn: '说不定明天会下雪。', en: 'It might snow tomorrow.' },
    { cn: '这件事说不定会有转机。', en: 'This matter may take a turn for the better.' },
  ],
  '说服': [
    { cn: '他终于说服了父母。', en: 'He finally persuaded his parents.' },
    { cn: '我怎么都说服不了她。', en: 'I can\'t convince her no matter what.' },
    { cn: '用事实来说服别人。', en: 'Convince others with facts.' },
  ],
  '晒': [
    { cn: '她在阳台上晒衣服。', en: 'She is drying clothes on the balcony.' },
    { cn: '别在太阳下晒太久。', en: 'Don\'t stay in the sun for too long.' },
    { cn: '晒太阳对身体有好处。', en: 'Sunbathing is good for health.' },
  ],
  '单': [
    { cn: '他买了一张单程票。', en: 'He bought a one-way ticket.' },
    { cn: '这个字念单音节。', en: 'This character is a monosyllable.' },
    { cn: '他单身好几年了。', en: 'He has been single for several years.' },
  ],
  '善良': [
    { cn: '她是一个善良的人。', en: 'She is a kindhearted person.' },
    { cn: '善良是一种美德。', en: 'Kindness is a virtue.' },
    { cn: '他对人很善良。', en: 'He is very kind to people.' },
  ],
  '善于': [
    { cn: '她善于和人交流。', en: 'She is good at communicating with people.' },
    { cn: '他善于解决问题。', en: 'He is adept at solving problems.' },
    { cn: '善于学习是成功的关键。', en: 'Being good at learning is the key to success.' },
  ],
  '上个月': [
    { cn: '上个月我去了北京。', en: 'I went to Beijing last month.' },
    { cn: '上个月的工资已经发了。', en: 'Last month\'s salary has been paid.' },
    { cn: '他上个月刚搬到这里。', en: 'He just moved here last month.' },
  ],
  '上楼': [
    { cn: '请上楼到三楼开会。', en: 'Please go upstairs to the third floor for the meeting.' },
    { cn: '他提着行李上楼了。', en: 'He carried his luggage upstairs.' },
    { cn: '上楼的时候注意安全。', en: 'Be careful when going upstairs.' },
  ],
  '上门': [
    { cn: '快递员上门送货。', en: 'The delivery person delivers to the door.' },
    { cn: '有人上门推销产品。', en: 'Someone came to the door to sell products.' },
    { cn: '我们提供上门服务。', en: 'We offer door-to-door service.' },
  ],
  '设施': [
    { cn: '这个小区的设施很齐全。', en: 'The facilities of this community are very complete.' },
    { cn: '医院的医疗设施很先进。', en: 'The hospital\'s medical facilities are very advanced.' },
    { cn: '公共设施需要定期维护。', en: 'Public facilities need regular maintenance.' },
  ],
  '设置': [
    { cn: '请检查一下手机的设置。', en: 'Please check the settings on your phone.' },
    { cn: '学校设置了很多课程。', en: 'The school has set up many courses.' },
    { cn: '你可以在设置里修改密码。', en: 'You can change your password in the settings.' },
  ],
  '甚至': [
    { cn: '他很紧张，甚至说不出话来。', en: 'He was so nervous that he couldn\'t even speak.' },
    { cn: '这道菜太辣了，甚至让人流泪。', en: 'This dish is so spicy it even makes people cry.' },
    { cn: '甚至连小孩都知道这件事。', en: 'Even children know about this.' },
  ],
  '折': [
    { cn: '树枝被大风折断了。', en: 'The tree branch was snapped by the strong wind.' },
    { cn: '他不小心把筷子折断了。', en: 'He accidentally broke the chopsticks.' },
    { cn: '这根棍子一折就断了。', en: 'This stick broke as soon as it was bent.' },
  ],
  '神话': [
    { cn: '中国有很多古代神话故事。', en: 'China has many ancient myths.' },
    { cn: '她喜欢读希腊神话。', en: 'She likes reading Greek mythology.' },
    { cn: '这不过是一个神话罢了。', en: 'This is nothing but a myth.' },
  ],
  '神秘': [
    { cn: '这个地方很神秘。', en: 'This place is very mysterious.' },
    { cn: '他总是一副神秘的样子。', en: 'He always looks mysterious.' },
    { cn: '宇宙充满了神秘的力量。', en: 'The universe is full of mysterious forces.' },
  ],
  '士兵': [
    { cn: '士兵们在训练。', en: 'The soldiers are training.' },
    { cn: '这位士兵非常勇敢。', en: 'This soldier is very brave.' },
    { cn: '士兵要服从命令。', en: 'Soldiers must obey orders.' },
  ],
  '似的': [
    { cn: '他跑得飞一样似的快。', en: 'He runs as fast as flying.' },
    { cn: '她高兴得像个孩子似的。', en: 'She is happy like a child.' },
    { cn: '天冷得冰似的。', en: 'It\'s cold as ice.' },
  ],
  '是否': [
    { cn: '请确认是否收到了邮件。', en: 'Please confirm whether you received the email.' },
    { cn: '他在考虑是否要换工作。', en: 'He is considering whether to change jobs.' },
    { cn: '是否同意这个方案？', en: 'Do you agree with this plan or not?' },
  ],
  '试卷': [
    { cn: '老师在批改试卷。', en: 'The teacher is grading the exam papers.' },
    { cn: '试卷上的题目很难。', en: 'The questions on the exam paper are very difficult.' },
    { cn: '请把试卷交上来。', en: 'Please hand in your test papers.' },
  ],
  '市区': [
    { cn: '他住在市区。', en: 'He lives in the city center.' },
    { cn: '市区的交通很拥挤。', en: 'Traffic in the downtown area is very congested.' },
    { cn: '市区的房价比较高。', en: 'Housing prices in the urban area are relatively high.' },
  ],
  '事物': [
    { cn: '每种事物都有两面性。', en: 'Everything has two sides.' },
    { cn: '新事物总是不断出现。', en: 'New things keep appearing.' },
    { cn: '我们要用新眼光看待事物。', en: 'We should look at things with a new perspective.' },
  ],
  '事先': [
    { cn: '你应该事先通知我。', en: 'You should have notified me in advance.' },
    { cn: '事先没有人告诉他。', en: 'Nobody told him beforehand.' },
    { cn: '事先做好准备很重要。', en: 'It\'s important to prepare in advance.' },
  ],
  '实施': [
    { cn: '新政策已经开始实施了。', en: 'The new policy has already been implemented.' },
    { cn: '这个计划将于下月实施。', en: 'This plan will be carried out next month.' },
    { cn: '实施改革需要时间。', en: 'Implementing reforms takes time.' },
  ],
  '食堂': [
    { cn: '学校的食堂饭菜还不错。', en: 'The food in the school cafeteria is not bad.' },
    { cn: '中午我在食堂吃饭。', en: 'I eat lunch in the cafeteria.' },
    { cn: '食堂里人很多。', en: 'There are many people in the cafeteria.' },
  ],
  '实用': [
    { cn: '这个工具非常实用。', en: 'This tool is very practical.' },
    { cn: '他送了我一个很实用的礼物。', en: 'He gave me a very practical gift.' },
    { cn: '学一些实用的技能很重要。', en: 'Learning some practical skills is important.' },
  ],
  '受不了': [
    { cn: '天太热了，我受不了了。', en: 'It\'s too hot; I can\'t stand it.' },
    { cn: '这种噪音让人受不了。', en: 'This noise is unbearable.' },
    { cn: '他的行为让人受不了。', en: 'His behavior is intolerable.' },
  ],
  '售货员': [
    { cn: '售货员很热情地接待了我们。', en: 'The salesperson warmly received us.' },
    { cn: '她是一名超市的售货员。', en: 'She is a salesperson at a supermarket.' },
    { cn: '售货员推荐了几款产品。', en: 'The salesperson recommended several products.' },
  ],
  '数据': [
    { cn: '请提供准确的数据。', en: 'Please provide accurate data.' },
    { cn: '数据分析是他的强项。', en: 'Data analysis is his strong suit.' },
    { cn: '这些数据说明了问题。', en: 'These data illustrate the problem.' },
  ],
  '树林': [
    { cn: '树林里很安静。', en: 'It\'s very quiet in the woods.' },
    { cn: '他们在树林里散步。', en: 'They are taking a walk in the forest.' },
    { cn: '一片树林出现在眼前。', en: 'A grove of trees appeared before our eyes.' },
  ],
  '数码': [
    { cn: '他买了一台数码相机。', en: 'He bought a digital camera.' },
    { cn: '数码产品更新换代很快。', en: 'Digital products are updated very quickly.' },
    { cn: '我们已经进入了数码时代。', en: 'We have entered the digital age.' },
  ],
  '树叶': [
    { cn: '秋天树叶变黄了。', en: 'In autumn, the leaves turn yellow.' },
    { cn: '树叶纷纷落下。', en: 'Leaves are falling one after another.' },
    { cn: '风吹得树叶沙沙响。', en: 'The wind makes the leaves rustle.' },
  ],
  '顺序': [
    { cn: '请按照顺序排队。', en: 'Please line up in order.' },
    { cn: '他把文件按照时间顺序整理好了。', en: 'He organized the files in chronological order.' },
    { cn: '做事要有顺序。', en: 'Things should be done in order.' },
  ],
  '熟练': [
    { cn: '她的英语说得很熟练。', en: 'She speaks English very fluently.' },
    { cn: '他已经熟练掌握了这项技术。', en: 'He has already mastered this technique proficiently.' },
    { cn: '熟练工人的效率更高。', en: 'Skilled workers are more efficient.' },
  ],
  '伤害': [
    { cn: '不要伤害别人的感情。', en: 'Don\'t hurt other people\'s feelings.' },
    { cn: '吸烟对身体有很大的伤害。', en: 'Smoking causes great harm to the body.' },
    { cn: '她的话伤害了他。', en: 'Her words hurt him.' },
  ],
  '商务': [
    { cn: '他经常出差处理商务。', en: 'He often travels for business.' },
    { cn: '这是一次商务会议。', en: 'This is a business meeting.' },
    { cn: '商务英语是一门重要的课程。', en: 'Business English is an important course.' },
  ],
  '烧': [
    { cn: '水烧开了。', en: 'The water has boiled.' },
    { cn: '她在厨房烧饭。', en: 'She is cooking in the kitchen.' },
    { cn: '那栋楼烧起来了。', en: 'That building caught fire.' },
  ],
  '身材': [
    { cn: '她的身材很好。', en: 'She has a great figure.' },
    { cn: '他身材高大。', en: 'He has a tall build.' },
    { cn: '运动可以保持好身材。', en: 'Exercise can help maintain a good figure.' },
  ],
  '身份': [
    { cn: '请出示你的身份证。', en: 'Please show your ID card.' },
    { cn: '他的真实身份是什么？', en: 'What is his real identity?' },
    { cn: '她以学生的身份参加了比赛。', en: 'She entered the competition as a student.' },
  ],
  '身高': [
    { cn: '他的身高有一米八。', en: 'His height is 1.8 meters.' },
    { cn: '身高不是最重要的。', en: 'Height is not the most important thing.' },
    { cn: '请填写你的身高和体重。', en: 'Please fill in your height and weight.' },
  ],
  '深厚': [
    { cn: '他们之间的友谊很深厚。', en: 'The friendship between them is very deep.' },
    { cn: '他有深厚的文化功底。', en: 'He has a profound cultural foundation.' },
    { cn: '这个国家有深厚的历史底蕴。', en: 'This country has a deep historical heritage.' },
  ],
  '申请': [
    { cn: '我想申请这个职位。', en: 'I want to apply for this position.' },
    { cn: '他提交了出国留学的申请。', en: 'He submitted an application to study abroad.' },
    { cn: '申请已经被批准了。', en: 'The application has been approved.' },
  ],
  '诗': [
    { cn: '他写了一首美丽的诗。', en: 'He wrote a beautiful poem.' },
    { cn: '唐诗是中国文学的瑰宝。', en: 'Tang poetry is a treasure of Chinese literature.' },
    { cn: '她很喜欢读诗。', en: 'She really enjoys reading poetry.' },
  ],
  '湿': [
    { cn: '衣服被雨淋湿了。', en: 'The clothes got wet from the rain.' },
    { cn: '地面很湿，小心滑倒。', en: 'The ground is wet; be careful not to slip.' },
    { cn: '把湿毛巾晾干。', en: 'Dry the wet towel.' },
  ],
  '失败': [
    { cn: '失败是成功之母。', en: 'Failure is the mother of success.' },
    { cn: '这次实验失败了。', en: 'This experiment failed.' },
    { cn: '他不怕失败。', en: 'He is not afraid of failure.' },
  ],
  '诗人': [
    { cn: '李白是中国著名的诗人。', en: 'Li Bai is a famous Chinese poet.' },
    { cn: '这位诗人写了很多经典作品。', en: 'This poet wrote many classic works.' },
    { cn: '她梦想成为一名诗人。', en: 'She dreams of becoming a poet.' },
  ],
  '失望': [
    { cn: '考试结果让他很失望。', en: 'The exam results disappointed him.' },
    { cn: '不要对自己感到失望。', en: 'Don\'t feel disappointed in yourself.' },
    { cn: '她对他的表现很失望。', en: 'She was very disappointed with his performance.' },
  ],
  '失业': [
    { cn: '他失业了，正在找工作。', en: 'He is unemployed and looking for a job.' },
    { cn: '失业率在上升。', en: 'The unemployment rate is rising.' },
    { cn: '失业对一个家庭的影响很大。', en: 'Unemployment has a big impact on a family.' },
  ],
  '收回': [
    { cn: '请收回你刚才的话。', en: 'Please take back what you just said.' },
    { cn: '银行收回了贷款。', en: 'The bank recovered the loan.' },
    { cn: '公司决定收回这批产品。', en: 'The company decided to recall this batch of products.' },
  ],
  '收获': [
    { cn: '这次旅行让我收获很多。', en: 'This trip has given me many gains.' },
    { cn: '秋天是收获的季节。', en: 'Autumn is the harvest season.' },
    { cn: '努力之后总会有收获。', en: 'There will always be gains after hard work.' },
  ],
  '收益': [
    { cn: '这笔投资的收益很高。', en: 'The return on this investment is very high.' },
    { cn: '公司今年的收益增加了。', en: 'The company\'s earnings increased this year.' },
    { cn: '读书让他受益很多。', en: 'Reading has benefited him greatly.' },
  ],
  '叔叔': [
    { cn: '叔叔好！', en: 'Hello, uncle!' },
    { cn: '他的叔叔是一名医生。', en: 'His uncle is a doctor.' },
    { cn: '叔叔带他去了动物园。', en: 'Uncle took him to the zoo.' },
  ],
  '舒适': [
    { cn: '这个沙发坐着很舒适。', en: 'This sofa is very comfortable to sit on.' },
    { cn: '酒店的房间很舒适。', en: 'The hotel room is very comfortable.' },
    { cn: '大家都想要舒适的生活。', en: 'Everyone wants a comfortable life.' },
  ],
  '闪': [
    { cn: '天上闪了一道光。', en: 'A flash of light appeared in the sky.' },
    { cn: '他闪到了一边。', en: 'He dodged to the side.' },
    { cn: '钻石在灯光下闪闪发光。', en: 'The diamond sparkles under the light.' },
  ],
  '闪电': [
    { cn: '闪电照亮了夜空。', en: 'Lightning lit up the night sky.' },
    { cn: '闪电和雷声几乎同时出现。', en: 'The lightning and thunder appeared almost simultaneously.' },
    { cn: '打雷闪电的时候很可怕。', en: 'It\'s scary when there\'s thunder and lightning.' },
  ],
  '赏': [
    { cn: '我们去公园赏花吧。', en: 'Let\'s go to the park to admire the flowers.' },
    { cn: '中秋节赏月是中国的传统。', en: 'Admiring the moon during the Mid-Autumn Festival is a Chinese tradition.' },
    { cn: '老板赏了他一笔奖金。', en: 'The boss awarded him a bonus.' },
  ],
  '使劲': [
    { cn: '使劲推，门就开了。', en: 'Push hard and the door will open.' },
    { cn: '他使劲跑，终于赶上了公交车。', en: 'He ran with all his might and finally caught the bus.' },
    { cn: '大家一起使劲！', en: 'Everyone, push together!' },
  ],
  '守': [
    { cn: '士兵们在守卫边境。', en: 'The soldiers are guarding the border.' },
    { cn: '你要守信用。', en: 'You should keep your word.' },
    { cn: '他守了一夜的门。', en: 'He guarded the door all night.' },
  ],
  '首': [
    { cn: '他是这个城市的首富。', en: 'He is the richest person in this city.' },
    { cn: '她唱了一首歌。', en: 'She sang a song.' },
    { cn: '首先，我要感谢大家。', en: 'First of all, I want to thank everyone.' },
  ],
  '手工': [
    { cn: '这是手工制作的。', en: 'This is handmade.' },
    { cn: '手工艺品很有特色。', en: 'Handicrafts are very distinctive.' },
    { cn: '她喜欢做手工。', en: 'She likes doing handicrafts.' },
  ],
  '手里': [
    { cn: '他手里拿着一本书。', en: 'He is holding a book in his hand.' },
    { cn: '决定权在你手里。', en: 'The decision is in your hands.' },
    { cn: '手里的钱不多了。', en: 'There isn\'t much money left in hand.' },
  ],
  '手术': [
    { cn: '他明天要做手术。', en: 'He will have surgery tomorrow.' },
    { cn: '手术很成功。', en: 'The surgery was very successful.' },
    { cn: '手术后需要好好休息。', en: 'Good rest is needed after surgery.' },
  ],
  '手套': [
    { cn: '冬天要戴手套。', en: 'Wear gloves in winter.' },
    { cn: '她织了一双手套。', en: 'She knitted a pair of gloves.' },
    { cn: '这双手套很暖和。', en: 'These gloves are very warm.' },
  ],
  '暑假': [
    { cn: '暑假你打算做什么？', en: 'What do you plan to do during summer vacation?' },
    { cn: '暑假我在家学习。', en: 'I study at home during summer vacation.' },
    { cn: '暑假快到了，大家都很开心。', en: 'Summer vacation is coming soon, and everyone is happy.' },
  ],
  '随手': [
    { cn: '请随手关门。', en: 'Please close the door behind you.' },
    { cn: '他随手拿起了一本书。', en: 'He casually picked up a book.' },
    { cn: '随手关灯是个好习惯。', en: 'Turning off the lights when you leave is a good habit.' },
  ],
  '酸': [
    { cn: '这个柠檬太酸了。', en: 'This lemon is too sour.' },
    { cn: '他跑完步觉得腿很酸。', en: 'His legs felt sore after running.' },
    { cn: '酸奶是酸的。', en: 'Yogurt is sour.' },
  ],
  '酸奶': [
    { cn: '她每天喝一杯酸奶。', en: 'She drinks a cup of yogurt every day.' },
    { cn: '酸奶对肠胃有好处。', en: 'Yogurt is good for the stomach.' },
    { cn: '超市里有很多口味的酸奶。', en: 'There are many flavors of yogurt in the supermarket.' },
  ],
  '缩短': [
    { cn: '我们要想办法缩短时间。', en: 'We need to find ways to shorten the time.' },
    { cn: '高铁大大缩短了旅行时间。', en: 'High-speed rail has greatly shortened travel time.' },
    { cn: '距离被缩短了。', en: 'The distance has been shortened.' },
  ],
  '缩小': [
    { cn: '请把图片缩小一点。', en: 'Please make the image smaller.' },
    { cn: '贫富差距在缩小。', en: 'The gap between rich and poor is narrowing.' },
    { cn: '范围可以缩小一些。', en: 'The range can be reduced a bit.' },
  ],
  '散': [
    { cn: '会议结束了，大家散了吧。', en: 'The meeting is over; let\'s disperse.' },
    { cn: '晚饭后他出去散步。', en: 'He went for a walk after dinner.' },
    { cn: '把种子散在地里。', en: 'Scatter the seeds in the field.' },
  ],
  '色': [
    { cn: '这块布是什么色的？', en: 'What color is this cloth?' },
    { cn: '秋天到处都是金色。', en: 'In autumn, there is gold color everywhere.' },
    { cn: '她的脸色不太好。', en: 'Her complexion doesn\'t look too good.' },
  ],
  '色彩': [
    { cn: '这幅画的色彩很鲜艳。', en: 'The colors of this painting are very vivid.' },
    { cn: '秋天的色彩非常丰富。', en: 'The colors of autumn are very rich.' },
    { cn: '他的生活充满了色彩。', en: 'His life is full of color.' },
  ],
  '似乎': [
    { cn: '他似乎不太高兴。', en: 'He seems not very happy.' },
    { cn: '天似乎要下雨了。', en: 'It seems like it\'s about to rain.' },
    { cn: '事情似乎没有那么简单。', en: 'Things don\'t seem to be that simple.' },
  ],
  '塑料': [
    { cn: '塑料污染是一个大问题。', en: 'Plastic pollution is a big problem.' },
    { cn: '这个杯子是塑料做的。', en: 'This cup is made of plastic.' },
    { cn: '我们应该减少使用塑料。', en: 'We should reduce the use of plastic.' },
  ],
  '塑料袋': [
    { cn: '超市不再提供免费的塑料袋。', en: 'Supermarkets no longer provide free plastic bags.' },
    { cn: '请用环保袋代替塑料袋。', en: 'Please use eco-friendly bags instead of plastic bags.' },
    { cn: '他把东西装进了塑料袋。', en: 'He put the things in a plastic bag.' },
  ],
  '思考': [
    { cn: '让我思考一下。', en: 'Let me think about it.' },
    { cn: '这个问题值得深入思考。', en: 'This question is worth thinking about deeply.' },
    { cn: '独立思考是很重要的能力。', en: 'Independent thinking is a very important ability.' },
  ],
  '松': [
    { cn: '他的鞋带松了。', en: 'His shoelaces came loose.' },
    { cn: '把绳子松一松。', en: 'Loosen the rope a bit.' },
    { cn: '这棵松树很高大。', en: 'This pine tree is very tall.' },
  ],
  '松树': [
    { cn: '山上种了很多松树。', en: 'Many pine trees are planted on the mountain.' },
    { cn: '松树四季常青。', en: 'Pine trees are evergreen throughout the year.' },
    { cn: '这棵松树有一百多年了。', en: 'This pine tree is over one hundred years old.' },
  ],
  '孙女': [
    { cn: '他的孙女今年五岁了。', en: 'His granddaughter is five years old this year.' },
    { cn: '爷爷最疼孙女。', en: 'Grandpa loves his granddaughter the most.' },
    { cn: '孙女给奶奶画了一幅画。', en: 'The granddaughter drew a picture for grandma.' },
  ],
  '孙子': [
    { cn: '他有两个孙子。', en: 'He has two grandsons.' },
    { cn: '奶奶带着孙子去公园了。', en: 'Grandma took her grandson to the park.' },
    { cn: '孙子长得像爷爷。', en: 'The grandson looks like his grandfather.' },
  ],
  '伞': [
    { cn: '今天可能下雨，带把伞吧。', en: 'It might rain today; bring an umbrella.' },
    { cn: '她忘了带伞。', en: 'She forgot to bring an umbrella.' },
    { cn: '这把伞是新买的。', en: 'This umbrella is newly bought.' },
  ],
  '扫': [
    { cn: '请把地扫一下。', en: 'Please sweep the floor.' },
    { cn: '他每天早上扫院子。', en: 'He sweeps the yard every morning.' },
    { cn: '用扫帚把落叶扫走。', en: 'Sweep the fallen leaves away with a broom.' },
  ],
