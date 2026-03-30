const HSK3_EXAMPLES: Record<string, { cn: string; en: string }[]> = {
  '爱心': [
    { cn: '她是一个有爱心的人。', en: 'She is a caring person.' },
    { cn: '我们要有爱心。', en: 'We should have compassion.' },
    { cn: '爱心可以改变世界。', en: 'Kindness can change the world.' },
  ],
  '安排': [
    { cn: '老师安排了明天的考试。', en: 'The teacher arranged tomorrow\'s exam.' },
    { cn: '你有什么安排？', en: 'What are your plans?' },
    { cn: '公司安排我去出差。', en: 'The company arranged for me to go on a business trip.' },
  ],
  '安装': [
    { cn: '我需要安装一个新软件。', en: 'I need to install new software.' },
    { cn: '师傅来安装空调了。', en: 'The technician came to install the air conditioner.' },
    { cn: '这个程序安装很简单。', en: 'This program is easy to install.' },
  ],
  '按': [
    { cn: '请按这个按钮。', en: 'Please press this button.' },
    { cn: '按规定办事。', en: 'Act according to the rules.' },
    { cn: '他按住了我的肩膀。', en: 'He pressed down on my shoulder.' },
  ],
  '按照': [
    { cn: '请按照要求完成作业。', en: 'Please complete the homework according to the requirements.' },
    { cn: '我们按照计划进行。', en: 'We proceed according to plan.' },
    { cn: '按照他的说法，事情并不复杂。', en: 'According to him, the matter is not complicated.' },
  ],
  '把': [
    { cn: '请把门关上。', en: 'Please close the door.' },
    { cn: '他把书放在桌子上。', en: 'He put the book on the table.' },
    { cn: '我把这件事忘了。', en: 'I forgot about this matter.' },
  ],
  '把握': [
    { cn: '我们要把握好这次机会。', en: 'We must seize this opportunity.' },
    { cn: '他对这件事没有把握。', en: 'He is not sure about this matter.' },
    { cn: '你要学会把握时间。', en: 'You need to learn to manage your time.' },
  ],
  '白菜': [
    { cn: '冬天白菜很便宜。', en: 'Chinese cabbage is very cheap in winter.' },
    { cn: '妈妈用白菜做了一道汤。', en: 'Mom made a soup with Chinese cabbage.' },
    { cn: '这棵白菜很新鲜。', en: 'This Chinese cabbage is very fresh.' },
  ],
  '班级': [
    { cn: '我们班级有三十个学生。', en: 'Our class has thirty students.' },
    { cn: '他是班级里成绩最好的。', en: 'He has the best grades in the class.' },
    { cn: '每个班级都要派一个代表。', en: 'Each class must send a representative.' },
  ],
  '搬': [
    { cn: '请帮我搬一下这个箱子。', en: 'Please help me move this box.' },
    { cn: '这张桌子太重了，搬不动。', en: 'This table is too heavy to move.' },
    { cn: '他把椅子搬到了外面。', en: 'He moved the chair outside.' },
  ],
  '搬家': [
    { cn: '我们下个月要搬家。', en: 'We are moving next month.' },
    { cn: '搬家是一件很累的事。', en: 'Moving house is very tiring.' },
    { cn: '他刚搬家到这个小区。', en: 'He just moved to this neighborhood.' },
  ],
  '板': [
    { cn: '这块板很结实。', en: 'This board is very sturdy.' },
    { cn: '老师在黑板上写字。', en: 'The teacher writes on the blackboard.' },
    { cn: '他的表情很板。', en: 'His expression is very stiff.' },
  ],
  '办理': [
    { cn: '我去银行办理业务。', en: 'I went to the bank to handle some business.' },
    { cn: '请到前台办理入住手续。', en: 'Please go to the front desk to check in.' },
    { cn: '办理签证需要多长时间？', en: 'How long does it take to process a visa?' },
  ],
  '保': [
    { cn: '我们要保住这份工作。', en: 'We must keep this job.' },
    { cn: '他保了一个平安。', en: 'He ensured safety.' },
    { cn: '这件事我保你没问题。', en: 'I guarantee you there\'s no problem with this.' },
  ],
  '保安': [
    { cn: '大门口站着一个保安。', en: 'A security guard stands at the gate.' },
    { cn: '保安检查了我的证件。', en: 'The security guard checked my ID.' },
    { cn: '他在商场当保安。', en: 'He works as a security guard at the mall.' },
  ],
  '保持': [
    { cn: '请保持安静。', en: 'Please keep quiet.' },
    { cn: '他一直保持着良好的习惯。', en: 'He has always maintained good habits.' },
    { cn: '我们要保持联系。', en: 'We should keep in touch.' },
  ],
  '保存': [
    { cn: '请把文件保存好。', en: 'Please save the file properly.' },
    { cn: '这些食物需要低温保存。', en: 'These foods need to be stored at low temperature.' },
    { cn: '他保存了很多老照片。', en: 'He has kept many old photos.' },
  ],
  '保护': [
    { cn: '我们应该保护环境。', en: 'We should protect the environment.' },
    { cn: '父母总是想保护自己的孩子。', en: 'Parents always want to protect their children.' },
    { cn: '这个地区受到法律保护。', en: 'This area is protected by law.' },
  ],
  '保留': [
    { cn: '我保留了所有的信件。', en: 'I kept all the letters.' },
    { cn: '他对这个计划有所保留。', en: 'He has reservations about this plan.' },
    { cn: '这个传统被保留了下来。', en: 'This tradition has been preserved.' },
  ],
  '保险': [
    { cn: '你买保险了吗？', en: 'Have you bought insurance?' },
    { cn: '这样做比较保险。', en: 'Doing it this way is safer.' },
    { cn: '他在一家保险公司工作。', en: 'He works at an insurance company.' },
  ],
  '保证': [
    { cn: '我保证不会迟到。', en: 'I guarantee I won\'t be late.' },
    { cn: '质量有保证。', en: 'The quality is guaranteed.' },
    { cn: '他保证完成任务。', en: 'He guaranteed to complete the task.' },
  ],
  '报': [
    { cn: '今天的报上有什么新闻？', en: 'What news is in today\'s paper?' },
    { cn: '我每天都看报。', en: 'I read the newspaper every day.' },
    { cn: '他向老师报了名。', en: 'He signed up with the teacher.' },
  ],
  '报到': [
    { cn: '新生明天报到。', en: 'New students register tomorrow.' },
    { cn: '请在八点前报到。', en: 'Please check in before eight o\'clock.' },
    { cn: '我已经到学校报到了。', en: 'I have already checked in at the school.' },
  ],
  '报道': [
    { cn: '电视台报道了这条新闻。', en: 'The TV station reported this news.' },
    { cn: '这篇报道写得很好。', en: 'This news report is well written.' },
    { cn: '记者对这件事进行了报道。', en: 'The reporter covered this event.' },
  ],
  '报告': [
    { cn: '我写了一份工作报告。', en: 'I wrote a work report.' },
    { cn: '他向领导报告了情况。', en: 'He reported the situation to the leader.' },
    { cn: '这个报告很详细。', en: 'This report is very detailed.' },
  ],
  '北部': [
    { cn: '中国北部冬天很冷。', en: 'Northern China is very cold in winter.' },
    { cn: '他住在城市的北部。', en: 'He lives in the northern part of the city.' },
    { cn: '北部地区下了大雪。', en: 'There was heavy snow in the northern region.' },
  ],
  '背后': [
    { cn: '不要在别人背后说坏话。', en: 'Don\'t speak ill of others behind their backs.' },
    { cn: '成功的背后有很多努力。', en: 'Behind success there is a lot of effort.' },
    { cn: '他站在我的背后。', en: 'He stood behind me.' },
  ],
  '被': [
    { cn: '他被老师表扬了。', en: 'He was praised by the teacher.' },
    { cn: '窗户被风吹开了。', en: 'The window was blown open by the wind.' },
    { cn: '那本书被借走了。', en: 'That book has been borrowed.' },
  ],
  '被子': [
    { cn: '天冷了，盖厚被子吧。', en: 'It\'s cold, use a thick quilt.' },
    { cn: '妈妈帮我晒了被子。', en: 'Mom aired out the quilt for me.' },
    { cn: '这条被子很暖和。', en: 'This quilt is very warm.' },
  ],
  '本来': [
    { cn: '我本来想去，但是下雨了。', en: 'I originally planned to go, but it rained.' },
    { cn: '这件事本来就很简单。', en: 'This matter was simple to begin with.' },
    { cn: '他本来是学医的。', en: 'He originally studied medicine.' },
  ],
  '本领': [
    { cn: '他有很大的本领。', en: 'He has great skills.' },
    { cn: '学好本领才能找到好工作。', en: 'Only by mastering skills can you find a good job.' },
    { cn: '这个人真有本领。', en: 'This person is really capable.' },
  ],
  '本事': [
    { cn: '他很有本事。', en: 'He is very capable.' },
    { cn: '有本事你自己来。', en: 'If you\'re so capable, do it yourself.' },
    { cn: '年轻人要学点本事。', en: 'Young people should learn some skills.' },
  ],
  '比较': [
    { cn: '这两个方案比较一下。', en: 'Let\'s compare these two plans.' },
    { cn: '今天比较冷。', en: 'It\'s relatively cold today.' },
    { cn: '他的成绩比较好。', en: 'His grades are comparatively good.' },
  ],
  '比例': [
    { cn: '男女比例是一比一。', en: 'The male-to-female ratio is one to one.' },
    { cn: '这幅画的比例不太对。', en: 'The proportions of this painting are not quite right.' },
    { cn: '按比例分配资源。', en: 'Distribute resources proportionally.' },
  ],
  '比赛': [
    { cn: '明天有一场足球比赛。', en: 'There is a soccer match tomorrow.' },
    { cn: '他在比赛中得了第一名。', en: 'He won first place in the competition.' },
    { cn: '我们要参加歌唱比赛。', en: 'We are going to participate in a singing competition.' },
  ],
  '必然': [
    { cn: '努力必然会有回报。', en: 'Hard work will inevitably be rewarded.' },
    { cn: '这是必然的结果。', en: 'This is an inevitable result.' },
    { cn: '成功和失败之间没有必然的联系。', en: 'There is no inevitable connection between success and failure.' },
  ],
  '必要': [
    { cn: '这是非常必要的。', en: 'This is very necessary.' },
    { cn: '没有必要担心。', en: 'There is no need to worry.' },
    { cn: '做好准备是必要的。', en: 'Being well-prepared is essential.' },
  ],
  '变化': [
    { cn: '这几年城市变化很大。', en: 'The city has changed a lot in recent years.' },
    { cn: '天气变化无常。', en: 'The weather changes unpredictably.' },
    { cn: '他注意到了一些变化。', en: 'He noticed some changes.' },
  ],
  '变为': [
    { cn: '水变为冰了。', en: 'Water turned into ice.' },
    { cn: '他的梦想变为了现实。', en: 'His dream became reality.' },
    { cn: '小村庄变为了大城市。', en: 'The small village turned into a big city.' },
  ],
  '标题': [
    { cn: '这篇文章的标题是什么？', en: 'What is the title of this article?' },
    { cn: '请给你的作文写一个标题。', en: 'Please write a title for your essay.' },
    { cn: '新闻标题很吸引人。', en: 'The news headline is very eye-catching.' },
  ],
  '标准': [
    { cn: '他的普通话很标准。', en: 'His Mandarin is very standard.' },
    { cn: '这个产品符合国家标准。', en: 'This product meets national standards.' },
    { cn: '每个人的标准不一样。', en: 'Everyone has different standards.' },
  ],
  '表达': [
    { cn: '他不善于表达自己的感情。', en: 'He is not good at expressing his feelings.' },
    { cn: '请用中文表达你的想法。', en: 'Please express your thoughts in Chinese.' },
    { cn: '这首诗表达了对家乡的思念。', en: 'This poem expresses longing for one\'s hometown.' },
  ],
  '表格': [
    { cn: '请填写这张表格。', en: 'Please fill out this form.' },
    { cn: '表格里的信息要准确。', en: 'The information in the form must be accurate.' },
    { cn: '我做了一个表格来记录数据。', en: 'I made a table to record the data.' },
  ],
  '表面': [
    { cn: '水的表面很平静。', en: 'The surface of the water is very calm.' },
    { cn: '不要只看表面。', en: 'Don\'t just look at the surface.' },
    { cn: '表面上他很开心。', en: 'On the surface, he seems happy.' },
  ],
  '表明': [
    { cn: '研究表明运动有益健康。', en: 'Research indicates that exercise is beneficial to health.' },
    { cn: '他表明了自己的立场。', en: 'He made his position clear.' },
    { cn: '数据表明经济在增长。', en: 'The data shows that the economy is growing.' },
  ],
  '表现': [
    { cn: '他今天表现得很好。', en: 'He performed very well today.' },
    { cn: '孩子们的表现让老师很满意。', en: 'The children\'s performance satisfied the teacher.' },
    { cn: '她在比赛中表现突出。', en: 'She performed outstandingly in the competition.' },
  ],
  '表演': [
    { cn: '孩子们表演了一个节目。', en: 'The children performed a show.' },
    { cn: '她的表演非常精彩。', en: 'Her performance was wonderful.' },
    { cn: '今晚有一场表演。', en: 'There is a performance tonight.' },
  ],
  '并': [
    { cn: '他看了信并回复了。', en: 'He read the letter and replied.' },
    { cn: '这并不难。', en: 'This is not difficult at all.' },
    { cn: '我并没有说过这样的话。', en: 'I never said such a thing.' },
  ],
  '并且': [
    { cn: '他聪明并且努力。', en: 'He is smart and hardworking.' },
    { cn: '这个方法简单并且有效。', en: 'This method is simple and effective.' },
    { cn: '我喜欢唱歌并且喜欢跳舞。', en: 'I like singing and also like dancing.' },
  ],
  '播出': [
    { cn: '这个节目每周五播出。', en: 'This program airs every Friday.' },
    { cn: '电视剧将在下个月播出。', en: 'The TV series will be broadcast next month.' },
    { cn: '新闻已经播出了。', en: 'The news has already been broadcast.' },
  ],
  '播放': [
    { cn: '请播放下一首歌。', en: 'Please play the next song.' },
    { cn: '电台正在播放音乐。', en: 'The radio station is playing music.' },
    { cn: '这个视频已经播放了一百万次。', en: 'This video has been played one million times.' },
  ],
  '补': [
    { cn: '衣服破了，我帮你补一下。', en: 'Your clothes are torn, let me mend them for you.' },
    { cn: '他需要补一补身体。', en: 'He needs to nourish his body.' },
    { cn: '我要补一颗牙。', en: 'I need to get a tooth filled.' },
  ],
  '补充': [
    { cn: '运动后要补充水分。', en: 'You should replenish fluids after exercise.' },
    { cn: '我想补充几点。', en: 'I want to add a few points.' },
    { cn: '这些是补充材料。', en: 'These are supplementary materials.' },
  ],
  '不安': [
    { cn: '他心里感到不安。', en: 'He felt uneasy in his heart.' },
    { cn: '等待结果的时候我很不安。', en: 'I was very anxious while waiting for the results.' },
    { cn: '社会的不安影响了大家。', en: 'Social unrest affected everyone.' },
  ],
  '不必': [
    { cn: '你不必担心。', en: 'You don\'t need to worry.' },
    { cn: '不必客气。', en: 'No need to be polite.' },
    { cn: '这件事不必着急。', en: 'There is no need to rush this matter.' },
  ],
  '不得不': [
    { cn: '下雨了，我不得不留下来。', en: 'It rained, so I had no choice but to stay.' },
    { cn: '他不得不放弃了这个计划。', en: 'He had to give up this plan.' },
    { cn: '我不得不承认他说得对。', en: 'I have to admit he was right.' },
  ],
  '不断': [
    { cn: '科技在不断进步。', en: 'Technology is constantly advancing.' },
    { cn: '他不断地努力学习。', en: 'He continuously works hard at studying.' },
    { cn: '问题不断出现。', en: 'Problems keep arising.' },
  ],
  '不光': [
    { cn: '不光是我，大家都这么想。', en: 'Not only me, everyone thinks so.' },
    { cn: '他不光会说中文，还会说日文。', en: 'He can speak not only Chinese but also Japanese.' },
    { cn: '不光要学习，还要锻炼身体。', en: 'You should not only study but also exercise.' },
  ],
  '不仅': [
    { cn: '他不仅聪明，而且勤奋。', en: 'He is not only smart but also diligent.' },
    { cn: '这不仅是我的问题。', en: 'This is not only my problem.' },
    { cn: '这本书不仅有趣，还很有用。', en: 'This book is not only interesting but also very useful.' },
  ],
  '不论': [
    { cn: '不论发生什么，我都支持你。', en: 'No matter what happens, I support you.' },
    { cn: '不论天气如何，他都坚持跑步。', en: 'Regardless of the weather, he insists on running.' },
    { cn: '不论男女，机会都是平等的。', en: 'Regardless of gender, opportunities are equal.' },
  ],
  '布': [
    { cn: '这块布很柔软。', en: 'This piece of cloth is very soft.' },
    { cn: '她买了一些布来做衣服。', en: 'She bought some fabric to make clothes.' },
    { cn: '桌子上铺了一块布。', en: 'A cloth is spread on the table.' },
  ],
  '步': [
    { cn: '他迈出了第一步。', en: 'He took the first step.' },
    { cn: '走了几步就到了。', en: 'It\'s just a few steps away.' },
    { cn: '一步一步来，不要着急。', en: 'Take it step by step, don\'t rush.' },
  ],
  '部': [
    { cn: '这部电影很好看。', en: 'This movie is great.' },
    { cn: '教育部发布了新政策。', en: 'The Ministry of Education released a new policy.' },
    { cn: '他在外交部工作。', en: 'He works at the Ministry of Foreign Affairs.' },
  ],
  '部门': [
    { cn: '他在哪个部门工作？', en: 'Which department does he work in?' },
    { cn: '各部门要互相配合。', en: 'All departments should cooperate with each other.' },
    { cn: '人事部门负责招聘。', en: 'The HR department is responsible for recruitment.' },
  ],
  '部长': [
    { cn: '部长主持了这次会议。', en: 'The minister presided over this meeting.' },
    { cn: '新任部长上任了。', en: 'The new minister has taken office.' },
    { cn: '部长发表了重要讲话。', en: 'The minister gave an important speech.' },
  ],
  '才能': [
    { cn: '他有音乐方面的才能。', en: 'He has talent in music.' },
    { cn: '每个人都有自己的才能。', en: 'Everyone has their own talents.' },
    { cn: '发挥你的才能吧。', en: 'Put your talents to use.' },
  ],
  '采取': [
    { cn: '我们必须采取措施。', en: 'We must take measures.' },
    { cn: '政府采取了新的政策。', en: 'The government adopted new policies.' },
    { cn: '他决定采取行动。', en: 'He decided to take action.' },
  ],
  '采用': [
    { cn: '公司采用了新技术。', en: 'The company adopted new technology.' },
    { cn: '这个方案被采用了。', en: 'This plan was adopted.' },
    { cn: '我们采用最新的方法。', en: 'We employ the latest methods.' },
  ],
  '彩色': [
    { cn: '孩子们喜欢彩色的气球。', en: 'Children like colorful balloons.' },
    { cn: '这台彩色打印机很好用。', en: 'This color printer works very well.' },
    { cn: '她穿了一件彩色的裙子。', en: 'She wore a colorful dress.' },
  ],
  '曾经': [
    { cn: '我曾经去过北京。', en: 'I have been to Beijing before.' },
    { cn: '他曾经是一名老师。', en: 'He was once a teacher.' },
    { cn: '我们曾经在一起工作过。', en: 'We once worked together.' },
  ],
  '产生': [
    { cn: '误会容易产生矛盾。', en: 'Misunderstandings easily give rise to conflicts.' },
    { cn: '这个事件产生了很大的影响。', en: 'This event had a great impact.' },
    { cn: '新的想法不断产生。', en: 'New ideas keep emerging.' },
  ],
  '厂': [
    { cn: '他在一家汽车厂工作。', en: 'He works at a car factory.' },
    { cn: '这个厂已经关了。', en: 'This factory has closed.' },
    { cn: '厂里有几百个工人。', en: 'There are several hundred workers in the factory.' },
  ],
  '场合': [
    { cn: '在正式场合要穿西装。', en: 'You should wear a suit on formal occasions.' },
    { cn: '这种场合不适合开玩笑。', en: 'This occasion is not suitable for joking.' },
    { cn: '他在各种场合都表现得很好。', en: 'He performs well on various occasions.' },
  ],
  '场所': [
    { cn: '公共场所禁止吸烟。', en: 'Smoking is prohibited in public places.' },
    { cn: '图书馆是学习的好场所。', en: 'The library is a good place for studying.' },
    { cn: '这是一个娱乐场所。', en: 'This is an entertainment venue.' },
  ],
  '超级': [
    { cn: '他是一个超级英雄迷。', en: 'He is a superhero fan.' },
    { cn: '这家超级市场很大。', en: 'This supermarket is very big.' },
    { cn: '今天的考试超级难。', en: 'Today\'s exam was super difficult.' },
  ],
  '朝': [
    { cn: '他的窗户朝南。', en: 'His window faces south.' },
    { cn: '唐朝是中国历史上的一个伟大朝代。', en: 'The Tang Dynasty was a great dynasty in Chinese history.' },
    { cn: '他朝我走过来了。', en: 'He walked towards me.' },
  ],
  '吵': [
    { cn: '外面太吵了。', en: 'It\'s too noisy outside.' },
    { cn: '别吵了，让我安静一会儿。', en: 'Stop being noisy, let me have some quiet.' },
    { cn: '他们两个又吵起来了。', en: 'The two of them started arguing again.' },
  ],
  '吵架': [
    { cn: '他们经常吵架。', en: 'They often quarrel.' },
    { cn: '别为小事吵架。', en: 'Don\'t quarrel over small things.' },
    { cn: '夫妻之间难免会吵架。', en: 'It\'s inevitable for couples to quarrel.' },
  ],
  '衬衫': [
    { cn: '他穿了一件白衬衫。', en: 'He wore a white shirt.' },
    { cn: '这件衬衫需要熨一下。', en: 'This shirt needs to be ironed.' },
    { cn: '她买了一件新衬衫。', en: 'She bought a new shirt.' },
  ],
  '衬衣': [
    { cn: '他穿了一件蓝色的衬衣。', en: 'He wore a blue shirt.' },
    { cn: '这件衬衣是棉的。', en: 'This shirt is made of cotton.' },
    { cn: '衬衣的扣子掉了。', en: 'The button on the shirt fell off.' },
  ],
  '称为': [
    { cn: '长城被称为世界奇迹。', en: 'The Great Wall is known as a world wonder.' },
    { cn: '他被称为最好的老师。', en: 'He is called the best teacher.' },
    { cn: '这种花被称为月季。', en: 'This flower is called a Chinese rose.' },
  ],
  '成功': [
    { cn: '他终于成功了。', en: 'He finally succeeded.' },
    { cn: '成功需要努力和坚持。', en: 'Success requires effort and persistence.' },
    { cn: '祝你成功！', en: 'Wish you success!' },
  ],
  '成果': [
    { cn: '这是多年研究的成果。', en: 'This is the result of years of research.' },
    { cn: '我们取得了很大的成果。', en: 'We have achieved great results.' },
    { cn: '他展示了自己的研究成果。', en: 'He displayed his research achievements.' },
  ],
  '成就': [
    { cn: '他在科学方面取得了很大的成就。', en: 'He has achieved great accomplishments in science.' },
    { cn: '这是她一生最大的成就。', en: 'This is the greatest achievement of her life.' },
    { cn: '他们的成就值得骄傲。', en: 'Their accomplishments are worth being proud of.' },
  ],
  '成立': [
    { cn: '公司是去年成立的。', en: 'The company was established last year.' },
    { cn: '他们成立了一个新的组织。', en: 'They established a new organization.' },
    { cn: '这个理由不成立。', en: 'This reason doesn\'t hold water.' },
  ],
  '成熟': [
    { cn: '苹果成熟了。', en: 'The apples are ripe.' },
    { cn: '他变得更加成熟了。', en: 'He has become more mature.' },
    { cn: '这个计划还不够成熟。', en: 'This plan is not mature enough.' },
  ],
  '成员': [
    { cn: '他是我们团队的成员。', en: 'He is a member of our team.' },
    { cn: '家庭成员都很健康。', en: 'All family members are healthy.' },
    { cn: '每个成员都要负责。', en: 'Every member must be responsible.' },
  ],
  '成长': [
    { cn: '孩子们在快乐中成长。', en: 'Children grow up in happiness.' },
    { cn: '他在农村长大，在城市成长。', en: 'He grew up in the countryside and matured in the city.' },
    { cn: '经历困难让人成长。', en: 'Going through difficulties helps people grow.' },
  ],
  '城': [
    { cn: '这座城有几百年的历史。', en: 'This city has a history of hundreds of years.' },
    { cn: '古城的城墙还在。', en: 'The city walls of the old city still remain.' },
    { cn: '他住在城里。', en: 'He lives in the city.' },
  ],
  '城市': [
    { cn: '北京是一个很大的城市。', en: 'Beijing is a very large city.' },
    { cn: '城市的生活节奏很快。', en: 'The pace of city life is very fast.' },
    { cn: '我喜欢这个城市。', en: 'I like this city.' },
  ],
  '程度': [
    { cn: '他的中文水平达到了很高的程度。', en: 'His Chinese level has reached a high degree.' },
    { cn: '在一定程度上我同意你的看法。', en: 'To a certain extent, I agree with your view.' },
    { cn: '损害的程度很严重。', en: 'The degree of damage is severe.' },
  ],
  '持续': [
    { cn: '雨持续下了三天。', en: 'The rain lasted for three days.' },
    { cn: '经济持续增长。', en: 'The economy continues to grow.' },
    { cn: '高温天气将持续一周。', en: 'The hot weather will last for a week.' },
  ],
  '充满': [
    { cn: '他对未来充满希望。', en: 'He is full of hope for the future.' },
    { cn: '教室里充满了笑声。', en: 'The classroom was filled with laughter.' },
    { cn: '她的眼睛充满了泪水。', en: 'Her eyes were filled with tears.' },
  ],
  '初': [
    { cn: '九月初天气开始变凉。', en: 'The weather starts getting cooler in early September.' },
    { cn: '初到北京，一切都很新鲜。', en: 'When I first arrived in Beijing, everything was new.' },
    { cn: '这只是初步的想法。', en: 'This is just a preliminary idea.' },
  ],
  '初步': [
    { cn: '我们已经有了初步的计划。', en: 'We already have a preliminary plan.' },
    { cn: '初步调查结果出来了。', en: 'The preliminary investigation results are out.' },
    { cn: '双方达成了初步的协议。', en: 'Both sides reached a preliminary agreement.' },
  ],
  '初级': [
    { cn: '他在学初级汉语。', en: 'He is studying elementary Chinese.' },
    { cn: '这是一本初级教材。', en: 'This is a beginner-level textbook.' },
    { cn: '初级阶段很重要。', en: 'The beginner stage is very important.' },
  ],
  '初一': [
    { cn: '他上初一了。', en: 'He is in the first year of junior high school.' },
    { cn: '大年初一我们去拜年。', en: 'We visit relatives on New Year\'s Day.' },
    { cn: '初一的课程不太难。', en: 'The first-year junior high curriculum is not too difficult.' },
  ],
  '初中': [
    { cn: '她在读初中。', en: 'She is attending junior high school.' },
    { cn: '初中三年是很重要的阶段。', en: 'The three years of junior high are a very important stage.' },
    { cn: '我的初中同学现在都在哪里？', en: 'Where are my junior high school classmates now?' },
  ],
  '除了': [
    { cn: '除了他，大家都来了。', en: 'Everyone came except him.' },
    { cn: '除了学习，他还喜欢运动。', en: 'Besides studying, he also likes sports.' },
    { cn: '除了周末，我每天都上班。', en: 'Except for weekends, I work every day.' },
  ],
  '处理': [
    { cn: '这件事你打算怎么处理？', en: 'How do you plan to deal with this matter?' },
    { cn: '他处理问题很有经验。', en: 'He is very experienced in handling problems.' },
    { cn: '垃圾需要及时处理。', en: 'Garbage needs to be dealt with promptly.' },
  ],
  '传': [
    { cn: '请把球传给我。', en: 'Please pass the ball to me.' },
    { cn: '这个消息传开了。', en: 'This news has spread.' },
    { cn: '这种病会传给别人。', en: 'This disease can be transmitted to others.' },
  ],
  '传播': [
    { cn: '网络加速了信息的传播。', en: 'The internet has accelerated the spread of information.' },
    { cn: '谣言传播得很快。', en: 'Rumors spread very fast.' },
    { cn: '文化通过交流传播到世界各地。', en: 'Culture spreads around the world through exchange.' },
  ],
  '传来': [
    { cn: '远处传来了歌声。', en: 'Singing could be heard from far away.' },
    { cn: '一个好消息传来了。', en: 'Good news arrived.' },
    { cn: '窗外传来了鸟叫声。', en: 'The sound of birds came from outside the window.' },
  ],
  '传说': [
    { cn: '这是一个古老的传说。', en: 'This is an ancient legend.' },
    { cn: '传说这座山上住着神仙。', en: 'Legend has it that immortals live on this mountain.' },
    { cn: '关于龙的传说有很多。', en: 'There are many legends about dragons.' },
  ],
  '创新': [
    { cn: '创新是发展的动力。', en: 'Innovation is the driving force of development.' },
    { cn: '这家公司很注重创新。', en: 'This company pays great attention to innovation.' },
    { cn: '我们需要创新思维。', en: 'We need innovative thinking.' },
  ],
  '创业': [
    { cn: '很多年轻人想创业。', en: 'Many young people want to start a business.' },
    { cn: '创业的过程很辛苦。', en: 'The process of starting a business is very hard.' },
    { cn: '他去年开始创业了。', en: 'He started his own business last year.' },
  ],
  '创造': [
    { cn: '人类创造了灿烂的文明。', en: 'Humans created brilliant civilizations.' },
    { cn: '他创造了一项新纪录。', en: 'He set a new record.' },
    { cn: '我们要创造更好的未来。', en: 'We should create a better future.' },
  ],
  '创作': [
    { cn: '他创作了很多优秀的作品。', en: 'He has created many outstanding works.' },
    { cn: '音乐创作需要灵感。', en: 'Musical creation requires inspiration.' },
    { cn: '这部小说是他最新的创作。', en: 'This novel is his latest creation.' },
  ],
  '从来': [
    { cn: '我从来没去过日本。', en: 'I have never been to Japan.' },
    { cn: '她从来不迟到。', en: 'She is never late.' },
    { cn: '他从来都是这样的。', en: 'He has always been like this.' },
  ],
  '从前': [
    { cn: '从前有一个国王。', en: 'Once upon a time there was a king.' },
    { cn: '从前的事不要再提了。', en: 'Don\'t bring up things from the past.' },
    { cn: '他跟从前不一样了。', en: 'He is different from before.' },
  ],
  '从事': [
    { cn: '他从事教育工作二十年了。', en: 'He has been engaged in education for twenty years.' },
    { cn: '她从事医学研究。', en: 'She is engaged in medical research.' },
    { cn: '你从事什么工作？', en: 'What work do you do?' },
  ],
  '村': [
    { cn: '他住在一个小村里。', en: 'He lives in a small village.' },
    { cn: '村里的人都认识他。', en: 'Everyone in the village knows him.' },
    { cn: '这个村有一百多户人家。', en: 'This village has over a hundred households.' },
  ],
  '存': [
    { cn: '我要去银行存钱。', en: 'I need to go to the bank to deposit money.' },
    { cn: '把文件存在电脑里。', en: 'Save the file on the computer.' },
    { cn: '冰箱里存了很多食物。', en: 'A lot of food is stored in the fridge.' },
  ],
  '存在': [
    { cn: '这个问题一直存在。', en: 'This problem has always existed.' },
    { cn: '我不否认问题的存在。', en: 'I don\'t deny the existence of the problem.' },
    { cn: '外星人是否存在？', en: 'Do aliens exist?' },
  ],
  '错误': [
    { cn: '每个人都会犯错误。', en: 'Everyone makes mistakes.' },
    { cn: '请改正你的错误。', en: 'Please correct your mistakes.' },
    { cn: '这个答案是错误的。', en: 'This answer is wrong.' },
  ],
  '达到': [
    { cn: '他的成绩达到了优秀。', en: 'His grades reached the excellent level.' },
    { cn: '我们要达到这个目标。', en: 'We must reach this goal.' },
    { cn: '温度达到了四十度。', en: 'The temperature reached forty degrees.' },
  ],
  '打破': [
    { cn: '他打破了世界纪录。', en: 'He broke the world record.' },
    { cn: '杯子不小心被打破了。', en: 'The cup was accidentally broken.' },
    { cn: '沉默被一声笑声打破了。', en: 'The silence was broken by a laugh.' },
  ],
  '打听': [
    { cn: '我去打听一下情况。', en: 'Let me go ask around about the situation.' },
    { cn: '他到处打听这件事。', en: 'He asked around everywhere about this matter.' },
    { cn: '你帮我打听一下那个地方怎么走。', en: 'Can you ask around for me on how to get to that place?' },
  ],
  '大夫': [
    { cn: '我去看大夫了。', en: 'I went to see the doctor.' },
    { cn: '大夫说我没什么大问题。', en: 'The doctor said I don\'t have any major problems.' },
    { cn: '他是一位很好的大夫。', en: 'He is a very good doctor.' },
  ],
  '大概': [
    { cn: '大概需要两个小时。', en: 'It takes approximately two hours.' },
    { cn: '他大概不会来了。', en: 'He probably won\'t come.' },
    { cn: '你能说个大概吗？', en: 'Can you give a rough idea?' },
  ],
  '大使馆': [
    { cn: '中国大使馆在那条街上。', en: 'The Chinese embassy is on that street.' },
    { cn: '我去大使馆办签证。', en: 'I went to the embassy to apply for a visa.' },
    { cn: '大使馆周末不上班。', en: 'The embassy is closed on weekends.' },
  ],
  '大约': [
    { cn: '大约有一百人参加了活动。', en: 'About a hundred people attended the event.' },
    { cn: '他大约八点到。', en: 'He will arrive at approximately eight o\'clock.' },
    { cn: '从这里到学校大约五公里。', en: 'It is approximately five kilometers from here to school.' },
  ],
  '代': [
    { cn: '这是新一代的产品。', en: 'This is a new generation of products.' },
    { cn: '请代我向他问好。', en: 'Please say hello to him for me.' },
    { cn: '上一代人吃了很多苦。', en: 'The previous generation endured a lot of hardship.' },
  ],
  '代表': [
    { cn: '他代表公司参加了会议。', en: 'He attended the meeting on behalf of the company.' },
    { cn: '红色代表热情。', en: 'Red represents passion.' },
    { cn: '她是我们班的代表。', en: 'She is the representative of our class.' },
  ],
  '代表团': [
    { cn: '中国代表团到达了巴黎。', en: 'The Chinese delegation arrived in Paris.' },
    { cn: '代表团一共有二十人。', en: 'The delegation has twenty people in total.' },
    { cn: '他是代表团的团长。', en: 'He is the head of the delegation.' },
  ],
  '带动': [
    { cn: '旅游业带动了当地经济。', en: 'Tourism has driven the local economy.' },
    { cn: '他的热情带动了大家。', en: 'His enthusiasm inspired everyone.' },
    { cn: '一个人可以带动整个团队。', en: 'One person can drive an entire team.' },
  ],
  '带领': [
    { cn: '老师带领学生参观博物馆。', en: 'The teacher led the students to visit the museum.' },
    { cn: '他带领团队完成了项目。', en: 'He led the team to complete the project.' },
    { cn: '导游带领我们参观了故宫。', en: 'The tour guide led us on a tour of the Forbidden City.' },
  ],
  '单元': [
    { cn: '他住在三号楼二单元。', en: 'He lives in Building 3, Unit 2.' },
    { cn: '这本书共有十个单元。', en: 'This book has ten units in total.' },
    { cn: '我们今天学第五单元。', en: 'We are studying Unit 5 today.' },
  ],
  '当初': [
    { cn: '当初我不该那样做。', en: 'I shouldn\'t have done that back then.' },
    { cn: '他当初是个普通工人。', en: 'He was an ordinary worker at that time.' },
    { cn: '当初的选择是对的。', en: 'The choice made back then was right.' },
  ],
  '当地': [
    { cn: '我们品尝了当地的美食。', en: 'We tasted the local cuisine.' },
    { cn: '当地的气候很温暖。', en: 'The local climate is very warm.' },
    { cn: '当地人非常热情。', en: 'The local people are very hospitable.' },
  ],
  '当然': [
    { cn: '你去吗？当然去！', en: 'Are you going? Of course!' },
    { cn: '这当然是真的。', en: 'This is of course true.' },
    { cn: '他当然知道这件事。', en: 'He naturally knows about this.' },
  ],
  '当中': [
    { cn: '人群当中有一个孩子。', en: 'Among the crowd there was a child.' },
    { cn: '这些学生当中谁最优秀？', en: 'Who is the best among these students?' },
    { cn: '他站在教室的当中。', en: 'He stood in the middle of the classroom.' },
  ],
  '刀': [
    { cn: '这把刀很锋利。', en: 'This knife is very sharp.' },
    { cn: '用刀切菜要小心。', en: 'Be careful when cutting vegetables with a knife.' },
    { cn: '他买了一把新刀。', en: 'He bought a new knife.' },
  ],
  '导演': [
    { cn: '这部电影的导演是谁？', en: 'Who is the director of this movie?' },
    { cn: '他是一位著名的导演。', en: 'He is a famous director.' },
    { cn: '导演对演员的要求很高。', en: 'The director has high demands on actors.' },
  ],
  '到达': [
    { cn: '飞机几点到达北京？', en: 'What time does the plane arrive in Beijing?' },
    { cn: '我们终于到达了目的地。', en: 'We finally arrived at our destination.' },
    { cn: '火车准时到达了车站。', en: 'The train arrived at the station on time.' },
  ],
  '到底': [
    { cn: '你到底想怎么样？', en: 'What on earth do you want?' },
    { cn: '到底发生了什么事？', en: 'What exactly happened?' },
    { cn: '坚持到底就是胜利。', en: 'Persevering to the end is victory.' },
  ],
  '地区': [
    { cn: '这个地区很安全。', en: 'This area is very safe.' },
    { cn: '不同地区有不同的风俗。', en: 'Different regions have different customs.' },
    { cn: '沿海地区经济比较发达。', en: 'The coastal region has a relatively developed economy.' },
  ],
  '得分': [
    { cn: '他在比赛中得分最高。', en: 'He scored the highest in the competition.' },
    { cn: '最后一分钟他得分了。', en: 'He scored in the last minute.' },
    { cn: '这次考试的得分情况如何？', en: 'How are the scores for this exam?' },
  ],
  '等待': [
    { cn: '请耐心等待。', en: 'Please wait patiently.' },
    { cn: '我已经等待了很久。', en: 'I have been waiting for a long time.' },
    { cn: '等待的过程很难受。', en: 'The process of waiting is uncomfortable.' },
  ],
  '底下': [
    { cn: '桌子底下有一只猫。', en: 'There is a cat under the table.' },
    { cn: '床底下很脏。', en: 'It\'s very dirty under the bed.' },
    { cn: '树底下坐着一位老人。', en: 'An old man is sitting under the tree.' },
  ],
  '电视剧': [
    { cn: '这部电视剧很好看。', en: 'This TV series is very good.' },
    { cn: '她最近在追一部电视剧。', en: 'She is recently binge-watching a TV series.' },
    { cn: '这部电视剧有五十集。', en: 'This TV series has fifty episodes.' },
  ],
  '电视台': [
    { cn: '他在电视台工作。', en: 'He works at a television station.' },
    { cn: '电视台正在直播比赛。', en: 'The TV station is broadcasting the match live.' },
    { cn: '中央电视台是最大的电视台。', en: 'CCTV is the largest television station.' },
  ],
  '电台': [
    { cn: '我每天听电台。', en: 'I listen to the radio every day.' },
    { cn: '电台播放了一首新歌。', en: 'The radio station played a new song.' },
    { cn: '他在电台当主持人。', en: 'He is a host at the radio station.' },
  ],
  '电子邮件': [
    { cn: '请给我发一封电子邮件。', en: 'Please send me an email.' },
    { cn: '我每天都会查电子邮件。', en: 'I check my email every day.' },
    { cn: '电子邮件比信件快多了。', en: 'Email is much faster than regular mail.' },
  ],
  '调': [
    { cn: '他被调到了北京工作。', en: 'He was transferred to work in Beijing.' },
    { cn: '这首歌的调太高了。', en: 'The key of this song is too high.' },
    { cn: '公司调了一批人去支援。', en: 'The company transferred a group of people for support.' },
  ],
  '调查': [
    { cn: '警察正在调查这件案子。', en: 'The police are investigating this case.' },
    { cn: '我们做了一项市场调查。', en: 'We conducted a market survey.' },
    { cn: '调查结果很快就出来了。', en: 'The survey results will come out soon.' },
  ],
  '调整': [
    { cn: '他调整了自己的计划。', en: 'He adjusted his plan.' },
    { cn: '公司调整了工作时间。', en: 'The company adjusted the working hours.' },
    { cn: '你需要调整一下心态。', en: 'You need to adjust your mindset.' },
  ],
  '订': [
    { cn: '我订了一份报纸。', en: 'I subscribed to a newspaper.' },
    { cn: '请帮我订一个房间。', en: 'Please book a room for me.' },
    { cn: '合同已经订好了。', en: 'The contract has been drawn up.' },
  ],
  '定期': [
    { cn: '我们定期开会。', en: 'We hold meetings regularly.' },
    { cn: '要定期检查身体。', en: 'You should have regular physical checkups.' },
    { cn: '银行有定期存款服务。', en: 'The bank offers fixed-term deposit services.' },
  ],
  '东部': [
    { cn: '中国东部沿海地区很发达。', en: 'The eastern coastal regions of China are very developed.' },
    { cn: '他住在城市的东部。', en: 'He lives in the eastern part of the city.' },
    { cn: '东部地区雨水较多。', en: 'The eastern region has more rainfall.' },
  ],
  '动力': [
    { cn: '家人是我最大的动力。', en: 'My family is my greatest motivation.' },
    { cn: '这件事给了他前进的动力。', en: 'This matter gave him the motivation to move forward.' },
    { cn: '经济发展需要动力。', en: 'Economic development needs driving force.' },
  ],
  '动人': [
    { cn: '她讲了一个动人的故事。', en: 'She told a moving story.' },
    { cn: '这首歌非常动人。', en: 'This song is very touching.' },
    { cn: '他的演讲很动人。', en: 'His speech was very moving.' },
  ],
  '读者': [
    { cn: '这本书有很多读者。', en: 'This book has many readers.' },
    { cn: '读者对这本书评价很高。', en: 'Readers rate this book very highly.' },
    { cn: '作者感谢了所有的读者。', en: 'The author thanked all the readers.' },
  ],
  '短处': [
    { cn: '每个人都有短处。', en: 'Everyone has shortcomings.' },
    { cn: '不要总是看别人的短处。', en: 'Don\'t always focus on other people\'s shortcomings.' },
    { cn: '他知道自己的短处。', en: 'He knows his own weaknesses.' },
  ],
  '短裤': [
    { cn: '夏天穿短裤很凉快。', en: 'Wearing shorts in summer is very cool.' },
    { cn: '他买了一条新短裤。', en: 'He bought a new pair of shorts.' },
    { cn: '运动的时候我喜欢穿短裤。', en: 'I like to wear shorts when exercising.' },
  ],
  '短期': [
    { cn: '这是一个短期项目。', en: 'This is a short-term project.' },
    { cn: '短期内很难看到效果。', en: 'It\'s hard to see results in the short term.' },
    { cn: '他申请了一个短期签证。', en: 'He applied for a short-term visa.' },
  ],
  '断': [
    { cn: '绳子断了。', en: 'The rope broke.' },
    { cn: '他跟那个朋友断了联系。', en: 'He cut off contact with that friend.' },
    { cn: '电话突然断了。', en: 'The phone call was suddenly cut off.' },
  ],
  '队员': [
    { cn: '每个队员都很努力。', en: 'Every team member works very hard.' },
    { cn: '他是篮球队的队员。', en: 'He is a member of the basketball team.' },
    { cn: '队员们一起庆祝胜利。', en: 'The team members celebrated the victory together.' },
  ],
  '对待': [
    { cn: '我们应该认真对待每一件事。', en: 'We should treat every matter seriously.' },
    { cn: '他对待朋友很真诚。', en: 'He treats his friends sincerely.' },
    { cn: '要平等地对待每一个人。', en: 'Treat everyone equally.' },
  ],
  '对方': [
    { cn: '你要尊重对方的意见。', en: 'You should respect the other party\'s opinions.' },
    { cn: '对方同意了我们的条件。', en: 'The other side agreed to our conditions.' },
    { cn: '他不了解对方的想法。', en: 'He doesn\'t understand the other person\'s thoughts.' },
  ],
  '对手': [
    { cn: '他的对手很强大。', en: 'His opponent is very strong.' },
    { cn: '我们要尊重对手。', en: 'We should respect our opponents.' },
    { cn: '在商场上他没有对手。', en: 'He has no rival in business.' },
  ],
  '对象': [
    { cn: '她还没有找到对象。', en: 'She hasn\'t found a partner yet.' },
    { cn: '这项研究的对象是学生。', en: 'The subjects of this research are students.' },
    { cn: '你有对象了吗？', en: 'Do you have a boyfriend/girlfriend?' },
  ],
  '顿': [
    { cn: '我一天吃三顿饭。', en: 'I eat three meals a day.' },
    { cn: '他被骂了一顿。', en: 'He was given a scolding.' },
    { cn: '中午这顿饭我请客。', en: 'I\'ll treat you to this lunch.' },
  ],
  '发表': [
    { cn: '他在杂志上发表了一篇文章。', en: 'He published an article in a magazine.' },
    { cn: '总统发表了讲话。', en: 'The president made a speech.' },
    { cn: '这项研究成果已经发表了。', en: 'This research finding has been published.' },
  ],
  '发出': [
    { cn: '他发出了一声叹息。', en: 'He let out a sigh.' },
    { cn: '公司发出了通知。', en: 'The company issued a notice.' },
    { cn: '手机发出了响声。', en: 'The phone emitted a sound.' },
  ],
  '发达': [
    { cn: '日本是一个发达国家。', en: 'Japan is a developed country.' },
    { cn: '这个地区的经济很发达。', en: 'The economy of this area is well developed.' },
    { cn: '交通越来越发达了。', en: 'Transportation is becoming more and more developed.' },
  ],
  '发动': [
    { cn: '他发动了汽车的引擎。', en: 'He started the car engine.' },
    { cn: '老师发动全班同学参加活动。', en: 'The teacher mobilized the whole class to participate in the activity.' },
    { cn: '他们发动了一次进攻。', en: 'They launched an attack.' },
  ],
  '发明': [
    { cn: '中国人发明了造纸术。', en: 'The Chinese invented papermaking.' },
    { cn: '这是一项伟大的发明。', en: 'This is a great invention.' },
    { cn: '他发明了一种新的机器。', en: 'He invented a new kind of machine.' },
  ],
  '发生': [
    { cn: '昨天发生了一件奇怪的事。', en: 'A strange thing happened yesterday.' },
    { cn: '这里发生了什么？', en: 'What happened here?' },
    { cn: '意外随时可能发生。', en: 'Accidents can happen at any time.' },
  ],
  '发送': [
    { cn: '我已经发送了邮件。', en: 'I have already sent the email.' },
    { cn: '请发送一条短信给他。', en: 'Please send him a text message.' },
    { cn: '文件已经发送成功。', en: 'The file has been sent successfully.' },
  ],
  '发言': [
    { cn: '他在会上发言了。', en: 'He spoke at the meeting.' },
    { cn: '请大家自由发言。', en: 'Everyone is free to speak.' },
    { cn: '他的发言很精彩。', en: 'His speech was wonderful.' },
  ],
  '发展': [
    { cn: '中国经济发展很快。', en: 'China\'s economy is developing rapidly.' },
    { cn: '科技的发展改变了生活。', en: 'The development of technology has changed life.' },
    { cn: '我们要发展教育事业。', en: 'We should develop the education sector.' },
  ],
  '反对': [
    { cn: '我反对这个计划。', en: 'I oppose this plan.' },
    { cn: '很多人反对这个决定。', en: 'Many people are against this decision.' },
    { cn: '父母反对他出国。', en: 'His parents are against him going abroad.' },
  ],
  '反复': [
    { cn: '他反复检查了好几遍。', en: 'He checked repeatedly several times.' },
    { cn: '这个问题反复出现。', en: 'This problem keeps recurring.' },
    { cn: '反复练习才能学好。', en: 'Only through repeated practice can you learn well.' },
  ],
  '反应': [
    { cn: '他的反应很快。', en: 'His reaction is very fast.' },
    { cn: '大家对这件事的反应如何？', en: 'How did everyone react to this matter?' },
    { cn: '观众的反应很热烈。', en: 'The audience\'s response was enthusiastic.' },
  ],
  '反正': [
    { cn: '反正我不去。', en: 'In any case, I\'m not going.' },
    { cn: '反正时间还早，不着急。', en: 'Anyway, it\'s still early, no rush.' },
    { cn: '反正他也不在乎。', en: 'He doesn\'t care anyway.' },
  ],
  '范围': [
    { cn: '考试的范围很广。', en: 'The scope of the exam is very broad.' },
    { cn: '请在规定范围内活动。', en: 'Please stay within the designated area.' },
    { cn: '这超出了我的能力范围。', en: 'This is beyond the scope of my ability.' },
  ],
  '方式': [
    { cn: '每个人的生活方式不同。', en: 'Everyone has a different lifestyle.' },
    { cn: '你可以换一种方式试试。', en: 'You can try a different way.' },
    { cn: '沟通方式很重要。', en: 'The way of communication is very important.' },
  ],
  '防': [
    { cn: '我们要防火防盗。', en: 'We should guard against fire and theft.' },
    { cn: '这种药可以防感冒。', en: 'This medicine can prevent colds.' },
    { cn: '出门要防晒。', en: 'You should protect against sunburn when going out.' },
  ],
  '防止': [
    { cn: '我们要防止事故的发生。', en: 'We must prevent accidents from happening.' },
    { cn: '防止感冒要多喝水。', en: 'Drink more water to prevent colds.' },
    { cn: '这个措施可以防止浪费。', en: 'This measure can prevent waste.' },
  ],
  '房东': [
    { cn: '房东要涨房租了。', en: 'The landlord is going to raise the rent.' },
    { cn: '我的房东人很好。', en: 'My landlord is a very nice person.' },
    { cn: '房东同意我养猫。', en: 'The landlord agreed to let me have a cat.' },
  ],
  '房屋': [
    { cn: '这些房屋都是新建的。', en: 'These houses are all newly built.' },
    { cn: '地震损坏了很多房屋。', en: 'The earthquake damaged many buildings.' },
    { cn: '房屋的价格越来越高。', en: 'Housing prices are getting higher and higher.' },
  ],
  '房租': [
    { cn: '这里的房租太贵了。', en: 'The rent here is too expensive.' },
    { cn: '每个月要付三千块房租。', en: 'I have to pay three thousand yuan in rent every month.' },
    { cn: '房租又涨了。', en: 'The rent has gone up again.' },
  ],
  '访问': [
    { cn: '总统访问了中国。', en: 'The president visited China.' },
    { cn: '记者访问了当地居民。', en: 'The journalist interviewed local residents.' },
    { cn: '这个网站每天有百万次访问。', en: 'This website gets millions of visits every day.' },
  ],
  '放到': [
    { cn: '请把书放到书架上。', en: 'Please put the book on the shelf.' },
    { cn: '他把钱放到了口袋里。', en: 'He put the money into his pocket.' },
    { cn: '把东西放到合适的位置。', en: 'Put things in the appropriate place.' },
  ],
  '飞行': [
    { cn: '飞行时间大约三个小时。', en: 'The flight time is about three hours.' },
    { cn: '他的梦想是成为飞行员。', en: 'His dream is to become a pilot.' },
    { cn: '飞机正在飞行中。', en: 'The airplane is in flight.' },
  ],
  '费': [
    { cn: '这太费时间了。', en: 'This takes too much time.' },
    { cn: '学费要交多少？', en: 'How much is the tuition fee?' },
    { cn: '这件事很费力气。', en: 'This matter requires a lot of effort.' },
  ],
  '费用': [
    { cn: '旅行的费用不低。', en: 'The cost of the trip is not low.' },
    { cn: '所有费用由公司承担。', en: 'All expenses are covered by the company.' },
    { cn: '生活费用越来越高。', en: 'The cost of living is getting higher and higher.' },
  ],
  '分别': [
    { cn: '我们在机场分别了。', en: 'We parted at the airport.' },
    { cn: '他们分别来自不同的国家。', en: 'They come from different countries respectively.' },
    { cn: '分别了三年，他们终于见面了。', en: 'After being apart for three years, they finally met.' },
  ],
  '分配': [
    { cn: '老师分配了作业。', en: 'The teacher assigned the homework.' },
    { cn: '资源要合理分配。', en: 'Resources should be distributed reasonably.' },
    { cn: '每个人都分配到了任务。', en: 'Everyone was assigned a task.' },
  ],
  '分组': [
    { cn: '老师让我们分组讨论。', en: 'The teacher asked us to discuss in groups.' },
    { cn: '比赛先要进行分组。', en: 'The competition first requires grouping.' },
    { cn: '我们已经分组完毕。', en: 'We have finished the grouping.' },
  ],
  '丰富': [
    { cn: '他的经验很丰富。', en: 'He has rich experience.' },
    { cn: '这里的物产非常丰富。', en: 'The products here are very abundant.' },
    { cn: '阅读可以丰富我们的知识。', en: 'Reading can enrich our knowledge.' },
  ],
  '风险': [
    { cn: '投资都有风险。', en: 'All investments carry risks.' },
    { cn: '这样做风险太大了。', en: 'Doing it this way is too risky.' },
    { cn: '我们要降低风险。', en: 'We need to reduce the risk.' },
  ],
  '否定': [
    { cn: '他否定了我的建议。', en: 'He rejected my suggestion.' },
    { cn: '不要轻易否定别人。', en: 'Don\'t easily negate others.' },
    { cn: '他的回答是否定的。', en: 'His answer was negative.' },
  ],
  '否认': [
    { cn: '他否认了所有的指控。', en: 'He denied all the charges.' },
    { cn: '事实无法否认。', en: 'Facts cannot be denied.' },
    { cn: '她否认自己说过那些话。', en: 'She denied having said those words.' },
  ],
  '服务员': [
    { cn: '服务员，请买单。', en: 'Waiter, the check please.' },
    { cn: '这家餐厅的服务员很热情。', en: 'The waiters at this restaurant are very friendly.' },
    { cn: '她在酒店当服务员。', en: 'She works as a waitress at a hotel.' },
  ],
  '服装': [
    { cn: '她喜欢设计服装。', en: 'She likes to design clothes.' },
    { cn: '这家服装店的衣服很时尚。', en: 'The clothes in this clothing store are very fashionable.' },
    { cn: '运动员穿上了统一的服装。', en: 'The athletes put on uniform clothing.' },
  ],
  '福': [
    { cn: '过年的时候大家都贴福字。', en: 'Everyone puts up the character for fortune during Chinese New Year.' },
    { cn: '祝你幸福！', en: 'Wish you happiness!' },
    { cn: '他是个有福的人。', en: 'He is a lucky person.' },
  ],
  '父母': [
    { cn: '父母为我们付出了很多。', en: 'Our parents have given so much for us.' },
    { cn: '他非常孝顺父母。', en: 'He is very filial to his parents.' },
    { cn: '我和父母住在一起。', en: 'I live with my parents.' },
  ],
  '父亲': [
    { cn: '我的父亲是医生。', en: 'My father is a doctor.' },
    { cn: '父亲节快乐！', en: 'Happy Father\'s Day!' },
    { cn: '他很想念自己的父亲。', en: 'He misses his father very much.' },
  ],
  '付': [
    { cn: '请问怎么付钱？', en: 'How do I pay?' },
    { cn: '我已经付了账。', en: 'I have already paid the bill.' },
    { cn: '你用现金还是刷卡付？', en: 'Do you pay by cash or card?' },
  ],
  '负责': [
    { cn: '他负责这个项目。', en: 'He is in charge of this project.' },
    { cn: '谁来负责这件事？', en: 'Who will be responsible for this matter?' },
    { cn: '他是一个很负责的人。', en: 'He is a very responsible person.' },
  ],
  '复印': [
    { cn: '请帮我复印三份。', en: 'Please make three copies for me.' },
    { cn: '复印机坏了。', en: 'The photocopier is broken.' },
    { cn: '这份文件需要复印。', en: 'This document needs to be photocopied.' },
  ],
  '复杂': [
    { cn: '这个问题很复杂。', en: 'This problem is very complicated.' },
    { cn: '情况比我想的复杂。', en: 'The situation is more complicated than I thought.' },
    { cn: '不要把事情搞得太复杂。', en: 'Don\'t make things too complicated.' },
  ],
  '富': [
    { cn: '他是一个富人。', en: 'He is a rich person.' },
    { cn: '这个地方物产丰富。', en: 'This place is rich in products.' },
    { cn: '他们家很富。', en: 'Their family is very wealthy.' },
  ],
  '改进': [
    { cn: '我们需要改进工作方法。', en: 'We need to improve our working methods.' },
    { cn: '产品质量有了很大的改进。', en: 'Product quality has greatly improved.' },
    { cn: '他提出了几点改进意见。', en: 'He offered several suggestions for improvement.' },
  ],
  '改造': [
    { cn: '政府改造了这条老街。', en: 'The government renovated this old street.' },
    { cn: '他们把旧房子改造成了咖啡馆。', en: 'They transformed the old house into a cafe.' },
    { cn: '这个地区正在进行改造。', en: 'This area is being renovated.' },
  ],
  '概念': [
    { cn: '你理解这个概念吗？', en: 'Do you understand this concept?' },
    { cn: '这是一个新的概念。', en: 'This is a new concept.' },
    { cn: '他对时间没有概念。', en: 'He has no concept of time.' },
  ],
  '赶': [
    { cn: '快走，我们要赶公共汽车。', en: 'Hurry up, we need to catch the bus.' },
    { cn: '他赶了一天的路。', en: 'He traveled on the road for a whole day.' },
    { cn: '我赶不上火车了。', en: 'I can\'t catch the train.' },
  ],
  '赶到': [
    { cn: '他及时赶到了现场。', en: 'He rushed to the scene in time.' },
    { cn: '我们赶到的时候，会议已经开始了。', en: 'When we arrived, the meeting had already started.' },
    { cn: '救护车很快赶到了。', en: 'The ambulance arrived quickly.' },
  ],
  '赶紧': [
    { cn: '赶紧走吧，要迟到了。', en: 'Let\'s go quickly, we\'re going to be late.' },
    { cn: '他赶紧打了一个电话。', en: 'He hurriedly made a phone call.' },
    { cn: '下雨了，赶紧收衣服。', en: 'It\'s raining, hurry and bring in the clothes.' },
  ],
  '赶快': [
    { cn: '赶快出发吧！', en: 'Let\'s set off quickly!' },
    { cn: '你赶快回家吧。', en: 'Go home quickly.' },
    { cn: '赶快把作业做完。', en: 'Hurry up and finish the homework.' },
  ],
  '敢': [
    { cn: '你敢不敢一个人走夜路？', en: 'Do you dare to walk alone at night?' },
    { cn: '他不敢说实话。', en: 'He doesn\'t dare to tell the truth.' },
    { cn: '有什么话你就敢说。', en: 'If you have something to say, just dare to say it.' },
  ],
  '感冒': [
    { cn: '我感冒了。', en: 'I caught a cold.' },
    { cn: '天气变化容易感冒。', en: 'Weather changes make it easy to catch a cold.' },
    { cn: '多喝水，感冒会好得快一些。', en: 'Drink more water, and the cold will get better faster.' },
  ],
  '感情': [
    { cn: '他们之间的感情很深。', en: 'The feelings between them are very deep.' },
    { cn: '不要伤害别人的感情。', en: 'Don\'t hurt other people\'s feelings.' },
    { cn: '他是一个很有感情的人。', en: 'He is a very emotional person.' },
  ],
  '感受': [
    { cn: '你有什么感受？', en: 'What are your feelings?' },
    { cn: '我能感受到他的真诚。', en: 'I can feel his sincerity.' },
    { cn: '这次旅行让我感受到了大自然的美。', en: 'This trip let me experience the beauty of nature.' },
  ],
  '干吗': [
    { cn: '你干吗不去上课？', en: 'Why aren\'t you going to class?' },
    { cn: '你在干吗？', en: 'What are you doing?' },
    { cn: '干吗要那么着急？', en: 'Why be in such a hurry?' },
  ],
  '高速': [
    { cn: '高速列车很方便。', en: 'High-speed trains are very convenient.' },
    { cn: '经济在高速发展。', en: 'The economy is developing at high speed.' },
    { cn: '他在高速路上开车。', en: 'He is driving on the highway.' },
  ],
  '高速公路': [
    { cn: '高速公路上车很多。', en: 'There are many cars on the highway.' },
    { cn: '走高速公路比较快。', en: 'It\'s faster to take the highway.' },
    { cn: '高速公路的限速是一百二十公里。', en: 'The speed limit on the highway is 120 kilometers.' },
  ],
  '告别': [
    { cn: '我们在机场告别了。', en: 'We said goodbye at the airport.' },
    { cn: '他含泪告别了家人。', en: 'He said farewell to his family with tears.' },
    { cn: '是时候告别过去了。', en: 'It\'s time to say goodbye to the past.' },
  ],
  '歌迷': [
    { cn: '她有很多歌迷。', en: 'She has many fans.' },
    { cn: '歌迷们排队等签名。', en: 'Fans lined up waiting for autographs.' },
    { cn: '他是一个忠实的歌迷。', en: 'He is a loyal fan.' },
  ],
  '歌声': [
    { cn: '远处传来了美妙的歌声。', en: 'Beautiful singing came from the distance.' },
    { cn: '她的歌声非常动听。', en: 'Her singing voice is very pleasant.' },
    { cn: '教室里传出了歌声。', en: 'Singing could be heard from the classroom.' },
  ],
  '歌手': [
    { cn: '她是一位著名的歌手。', en: 'She is a famous singer.' },
    { cn: '这位歌手的歌很好听。', en: 'This singer\'s songs are very nice.' },
    { cn: '他想成为一名歌手。', en: 'He wants to become a singer.' },
  ],
  '个人': [
    { cn: '这是我个人的看法。', en: 'This is my personal opinion.' },
    { cn: '个人信息要保护好。', en: 'Personal information should be well protected.' },
    { cn: '每个人都有个人隐私。', en: 'Everyone has personal privacy.' },
  ],
  '个性': [
    { cn: '她的个性很独立。', en: 'Her personality is very independent.' },
    { cn: '每个人都有自己的个性。', en: 'Everyone has their own personality.' },
    { cn: '他穿衣服很有个性。', en: 'He dresses with a lot of personality.' },
  ],
  '各': [
    { cn: '各班派一名代表参加。', en: 'Each class sends one representative to attend.' },
    { cn: '各有各的想法。', en: 'Each person has their own ideas.' },
    { cn: '各国代表出席了会议。', en: 'Representatives from each country attended the meeting.' },
  ],
  '各地': [
    { cn: '游客从各地赶来。', en: 'Tourists came from all over.' },
    { cn: '各地的风俗不同。', en: 'Customs vary from place to place.' },
    { cn: '他去过中国各地。', en: 'He has been to various places in China.' },
  ],
  '各位': [
    { cn: '各位同学，请安静。', en: 'Students, please be quiet.' },
    { cn: '各位请坐。', en: 'Everyone, please be seated.' },
    { cn: '感谢各位的支持。', en: 'Thank you all for your support.' },
  ],
  '各种': [
    { cn: '超市里有各种水果。', en: 'There are all kinds of fruits in the supermarket.' },
    { cn: '他面临各种困难。', en: 'He faces all kinds of difficulties.' },
    { cn: '各种颜色都有。', en: 'There are all kinds of colors.' },
  ],
  '各自': [
    { cn: '大家各自回家吧。', en: 'Everyone go back to your own homes.' },
    { cn: '他们各自有各自的想法。', en: 'They each have their own ideas.' },
    { cn: '毕业以后各自发展。', en: 'After graduation, everyone went their own way.' },
  ],
  '根本': [
    { cn: '他根本不知道这件事。', en: 'He doesn\'t know about this at all.' },
    { cn: '这是问题的根本原因。', en: 'This is the fundamental cause of the problem.' },
    { cn: '我根本没说过这样的话。', en: 'I never said such a thing at all.' },
  ],
  '更加': [
    { cn: '他更加努力了。', en: 'He worked even harder.' },
    { cn: '经过训练，他更加自信了。', en: 'After training, he became even more confident.' },
    { cn: '生活变得更加美好了。', en: 'Life has become even better.' },
  ],
  '工厂': [
    { cn: '这家工厂生产汽车。', en: 'This factory produces cars.' },
    { cn: '工厂里有很多工人。', en: 'There are many workers in the factory.' },
    { cn: '他在工厂工作了十年。', en: 'He worked in the factory for ten years.' },
  ],
  '工程师': [
    { cn: '他是一名软件工程师。', en: 'He is a software engineer.' },
    { cn: '工程师们设计了这座桥。', en: 'The engineers designed this bridge.' },
    { cn: '她的爸爸是工程师。', en: 'Her father is an engineer.' },
  ],
  '工夫': [
    { cn: '你有工夫帮我一下吗？', en: 'Do you have time to help me?' },
    { cn: '他花了很大工夫准备。', en: 'He spent a lot of effort preparing.' },
    { cn: '做饭很费工夫。', en: 'Cooking takes a lot of effort.' },
  ],
  '工具': [
    { cn: '修理需要用到一些工具。', en: 'Repairs require some tools.' },
    { cn: '语言是交流的工具。', en: 'Language is a tool for communication.' },
    { cn: '工具箱里有锤子和螺丝刀。', en: 'There are hammers and screwdrivers in the toolbox.' },
  ],
  '工业': [
    { cn: '这个城市的工业很发达。', en: 'The industry in this city is well developed.' },
    { cn: '工业革命改变了世界。', en: 'The Industrial Revolution changed the world.' },
    { cn: '发展工业需要大量资金。', en: 'Developing industry requires a lot of capital.' },
  ],
  '工资': [
    { cn: '他的工资不高。', en: 'His salary is not high.' },
    { cn: '这个月的工资发了吗？', en: 'Has this month\'s salary been paid?' },
    { cn: '她希望能涨工资。', en: 'She hopes to get a raise.' },
  ],
  '公布': [
    { cn: '考试结果已经公布了。', en: 'The exam results have been announced.' },
    { cn: '政府公布了新的法规。', en: 'The government announced new regulations.' },
    { cn: '名单明天公布。', en: 'The list will be announced tomorrow.' },
  ],
  '公共': [
    { cn: '请爱护公共财物。', en: 'Please take care of public property.' },
    { cn: '公共场所不要大声说话。', en: 'Don\'t speak loudly in public places.' },
    { cn: '公共交通很方便。', en: 'Public transportation is very convenient.' },
  ],
  '公开': [
    { cn: '他公开表示支持。', en: 'He publicly expressed his support.' },
    { cn: '这是一场公开的比赛。', en: 'This is an open competition.' },
    { cn: '信息应该公开透明。', en: 'Information should be open and transparent.' },
  ],
  '公民': [
    { cn: '他是一名中国公民。', en: 'He is a Chinese citizen.' },
    { cn: '公民有选举权。', en: 'Citizens have the right to vote.' },
    { cn: '每个公民都应该遵守法律。', en: 'Every citizen should obey the law.' },
  ],
  '公务员': [
    { cn: '她是一名公务员。', en: 'She is a civil servant.' },
    { cn: '很多人想考公务员。', en: 'Many people want to take the civil service exam.' },
    { cn: '公务员的工作比较稳定。', en: 'Civil service jobs are relatively stable.' },
  ],
  '功夫': [
    { cn: '中国功夫很有名。', en: 'Chinese kung fu is very famous.' },
    { cn: '他学了十年功夫。', en: 'He studied kung fu for ten years.' },
    { cn: '只要下功夫，就能学好。', en: 'As long as you put in the effort, you can learn it well.' },
  ],
  '功课': [
    { cn: '你做完功课了吗？', en: 'Have you finished your homework?' },
    { cn: '他的功课很好。', en: 'He does well in his studies.' },
    { cn: '今天的功课太多了。', en: 'There is too much homework today.' },
  ],
  '功能': [
    { cn: '这个手机功能很多。', en: 'This phone has many functions.' },
    { cn: '这个软件增加了新功能。', en: 'This software added new features.' },
    { cn: '心脏的功能是输送血液。', en: 'The function of the heart is to pump blood.' },
  ],
  '共同': [
    { cn: '我们有共同的爱好。', en: 'We have common hobbies.' },
    { cn: '大家共同努力，一定能成功。', en: 'If everyone works together, we will surely succeed.' },
    { cn: '这是我们共同的目标。', en: 'This is our common goal.' },
  ],
  '共有': [
    { cn: '我们班共有三十个学生。', en: 'Our class has thirty students in total.' },
    { cn: '这栋楼共有二十层。', en: 'This building has twenty floors in total.' },
    { cn: '公司共有五百名员工。', en: 'The company has five hundred employees in total.' },
  ],
  '姑娘': [
    { cn: '那个姑娘很漂亮。', en: 'That girl is very pretty.' },
    { cn: '他有两个姑娘。', en: 'He has two daughters.' },
    { cn: '这位姑娘在哪里工作？', en: 'Where does this young lady work?' },
  ],
  '古': [
    { cn: '这座古城有千年历史。', en: 'This ancient city has a thousand years of history.' },
    { cn: '他喜欢收藏古书。', en: 'He likes to collect ancient books.' },
    { cn: '古今中外，人人都爱美。', en: 'Throughout all times and places, everyone loves beauty.' },
  ],
  '古代': [
    { cn: '古代的中国非常强大。', en: 'Ancient China was very powerful.' },
    { cn: '他对古代历史很感兴趣。', en: 'He is very interested in ancient history.' },
    { cn: '古代人没有手机。', en: 'People in ancient times didn\'t have phones.' },
  ],
  '故乡': [
    { cn: '他离开故乡已经很多年了。', en: 'He has left his hometown for many years.' },
    { cn: '我很想念我的故乡。', en: 'I miss my hometown very much.' },
    { cn: '故乡的山水最美。', en: 'The scenery of one\'s hometown is the most beautiful.' },
  ],
  '挂': [
    { cn: '墙上挂着一幅画。', en: 'A painting hangs on the wall.' },
    { cn: '他把衣服挂在衣架上。', en: 'He hung the clothes on the hanger.' },
    { cn: '别挂电话，等一下。', en: 'Don\'t hang up the phone, wait a moment.' },
  ],
  '关系': [
    { cn: '他们的关系很好。', en: 'Their relationship is very good.' },
    { cn: '这件事跟你没关系。', en: 'This matter has nothing to do with you.' },
    { cn: '没关系，别在意。', en: 'It doesn\'t matter, don\'t worry about it.' },
  ],
  '关注': [
    { cn: '大家很关注这件事。', en: 'Everyone is paying close attention to this matter.' },
    { cn: '请关注我们的公众号。', en: 'Please follow our official account.' },
    { cn: '他一直关注环保问题。', en: 'He has always been concerned about environmental issues.' },
  ],
  '观察': [
    { cn: '科学家观察了这种动物的行为。', en: 'Scientists observed the behavior of this animal.' },
    { cn: '他善于观察周围的事物。', en: 'He is good at observing things around him.' },
    { cn: '请仔细观察这幅图。', en: 'Please observe this picture carefully.' },
  ],
  '观看': [
    { cn: '我们一起观看了比赛。', en: 'We watched the match together.' },
    { cn: '数百万人观看了直播。', en: 'Millions of people watched the live broadcast.' },
    { cn: '欢迎大家来观看演出。', en: 'Welcome everyone to watch the performance.' },
  ],
  '观念': [
    { cn: '他的观念比较传统。', en: 'His views are relatively traditional.' },
    { cn: '每个人的观念不同。', en: 'Everyone has different ideas.' },
    { cn: '我们要转变旧观念。', en: 'We need to change old ideas.' },
  ],
  '观众': [
    { cn: '观众们热烈鼓掌。', en: 'The audience applauded enthusiastically.' },
    { cn: '现场有几万名观众。', en: 'There were tens of thousands of spectators at the scene.' },
    { cn: '观众对演出非常满意。', en: 'The audience was very satisfied with the performance.' },
  ],
  '管': [
    { cn: '这件事你别管了。', en: 'Don\'t worry about this matter.' },
    { cn: '谁管这个部门？', en: 'Who is in charge of this department?' },
    { cn: '管他呢，我们走吧。', en: 'Never mind, let\'s go.' },
  ],
  '管理': [
    { cn: '他负责管理公司。', en: 'He is responsible for managing the company.' },
    { cn: '学校的管理很严格。', en: 'The school\'s management is very strict.' },
    { cn: '我们需要加强管理。', en: 'We need to strengthen management.' },
  ],
  '光': [
    { cn: '阳光照进了房间。', en: 'Sunlight shone into the room.' },
    { cn: '光说不做是没用的。', en: 'Just talking without doing is useless.' },
    { cn: '月光很美。', en: 'The moonlight is beautiful.' },
  ],
  '光明': [
    { cn: '未来是光明的。', en: 'The future is bright.' },
    { cn: '他的前途一片光明。', en: 'His future is bright.' },
    { cn: '我们要做一个光明磊落的人。', en: 'We should be open and honest people.' },
  ],
  '广播': [
    { cn: '学校的广播响了。', en: 'The school broadcast sounded.' },
    { cn: '他在广播里听到了这个消息。', en: 'He heard the news on the broadcast.' },
    { cn: '广播电台每天播放新闻。', en: 'The radio station broadcasts news every day.' },
  ],
  '广大': [
    { cn: '广大群众表示支持。', en: 'The general public expressed support.' },
    { cn: '这里有广大的草原。', en: 'There are vast grasslands here.' },
    { cn: '感谢广大读者的关注。', en: 'Thanks to the many readers for their attention.' },
  ],
  '规定': [
    { cn: '学校规定不能迟到。', en: 'School rules don\'t allow being late.' },
    { cn: '请遵守公司的规定。', en: 'Please follow the company\'s rules.' },
    { cn: '按照规定办事。', en: 'Act according to the regulations.' },
  ],
  '规范': [
    { cn: '我们要规范自己的行为。', en: 'We should regulate our own behavior.' },
    { cn: '这个行业需要更多的规范。', en: 'This industry needs more regulations.' },
    { cn: '他说话很规范。', en: 'He speaks in a very standard way.' },
  ],
  '国内': [
    { cn: '国内的经济形势很好。', en: 'The domestic economic situation is very good.' },
    { cn: '他在国内外都很有名。', en: 'He is famous both at home and abroad.' },
    { cn: '国内旅游越来越受欢迎。', en: 'Domestic tourism is becoming more and more popular.' },
  ],
  '国庆': [
    { cn: '国庆节放七天假。', en: 'There are seven days off for National Day.' },
    { cn: '国庆期间到处都是人。', en: 'There are people everywhere during National Day.' },
    { cn: '祝大家国庆快乐！', en: 'Happy National Day to everyone!' },
  ],
  '果然': [
    { cn: '果然不出我所料。', en: 'Just as I expected.' },
    { cn: '他说会下雨，果然下雨了。', en: 'He said it would rain, and sure enough it did.' },
    { cn: '这道菜果然好吃。', en: 'This dish is indeed delicious, as expected.' },
  ],
  '果汁': [
    { cn: '我想喝一杯果汁。', en: 'I want to drink a glass of juice.' },
    { cn: '这杯果汁是新鲜的。', en: 'This glass of juice is fresh.' },
    { cn: '橙子可以榨果汁。', en: 'Oranges can be squeezed into juice.' },
  ],
  '过程': [
    { cn: '学习是一个漫长的过程。', en: 'Learning is a long process.' },
    { cn: '你能描述一下过程吗？', en: 'Can you describe the process?' },
    { cn: '在这个过程中我学到了很多。', en: 'I learned a lot in this process.' },
  ],
  '哈哈': [
    { cn: '哈哈，太好笑了！', en: 'Haha, that\'s so funny!' },
    { cn: '他哈哈大笑起来。', en: 'He burst out laughing.' },
    { cn: '哈哈，你真有意思。', en: 'Haha, you\'re really funny.' },
  ],
  '海关': [
    { cn: '我在海关等了很久。', en: 'I waited a long time at customs.' },
    { cn: '海关检查了我的行李。', en: 'Customs inspected my luggage.' },
    { cn: '过海关需要出示护照。', en: 'You need to show your passport to go through customs.' },
  ],
  '害怕': [
    { cn: '她害怕一个人在家。', en: 'She is afraid to be home alone.' },
    { cn: '不要害怕，我在这里。', en: 'Don\'t be afraid, I\'m here.' },
    { cn: '小孩子害怕黑暗。', en: 'Children are scared of the dark.' },
  ],
  '好好': [
    { cn: '你要好好学习。', en: 'You should study hard.' },
    { cn: '好好休息一下吧。', en: 'Get some good rest.' },
    { cn: '我们好好谈谈。', en: 'Let\'s have a good talk.' },
  ],
  '好奇': [
    { cn: '孩子对一切都很好奇。', en: 'Children are curious about everything.' },
    { cn: '我很好奇他是怎么做到的。', en: 'I\'m curious how he did it.' },
    { cn: '好奇心是学习的动力。', en: 'Curiosity is the driving force of learning.' },
  ],
  '合': [
    { cn: '这双鞋很合脚。', en: 'These shoes fit well.' },
    { cn: '大家合在一起讨论。', en: 'Everyone got together to discuss.' },
    { cn: '两家公司合为一家。', en: 'The two companies merged into one.' },
  ],
  '合法': [
    { cn: '他的行为是合法的。', en: 'His actions are legal.' },
    { cn: '我们要通过合法的方式解决问题。', en: 'We should solve problems through legal means.' },
    { cn: '这笔交易完全合法。', en: 'This transaction is completely legal.' },
  ],
  '合格': [
    { cn: '产品检验合格了。', en: 'The product passed inspection.' },
    { cn: '他是一名合格的老师。', en: 'He is a qualified teacher.' },
    { cn: '考试成绩不合格要补考。', en: 'If exam results are not up to standard, you need a make-up exam.' },
  ],
  '合理': [
    { cn: '这个价格很合理。', en: 'This price is very reasonable.' },
    { cn: '我们要合理安排时间。', en: 'We should arrange our time reasonably.' },
    { cn: '他的建议很合理。', en: 'His suggestion is very sensible.' },
  ],
  '合作': [
    { cn: '两家公司开始合作了。', en: 'The two companies started cooperating.' },
    { cn: '合作才能共赢。', en: 'Cooperation leads to mutual success.' },
    { cn: '期待与你合作。', en: 'Looking forward to working with you.' },
  ],
  '和平': [
    { cn: '世界需要和平。', en: 'The world needs peace.' },
    { cn: '我们热爱和平。', en: 'We love peace.' },
    { cn: '和平的环境有利于发展。', en: 'A peaceful environment is conducive to development.' },
  ],
  '红茶': [
    { cn: '英国人喜欢喝红茶。', en: 'British people like to drink black tea.' },
    { cn: '请给我一杯红茶。', en: 'Please give me a cup of black tea.' },
    { cn: '红茶有暖胃的作用。', en: 'Black tea has the effect of warming the stomach.' },
  ],
  '红酒': [
    { cn: '他喜欢喝红酒。', en: 'He likes to drink red wine.' },
    { cn: '这瓶红酒很贵。', en: 'This bottle of red wine is very expensive.' },
    { cn: '法国的红酒很有名。', en: 'French red wine is very famous.' },
  ],
  '后果': [
    { cn: '你要为自己的行为承担后果。', en: 'You must bear the consequences of your actions.' },
    { cn: '后果非常严重。', en: 'The consequences are very serious.' },
    { cn: '他没有想到后果。', en: 'He didn\'t think of the consequences.' },
  ],
  '后面': [
    { cn: '学校在超市后面。', en: 'The school is behind the supermarket.' },
    { cn: '请排在后面。', en: 'Please line up at the back.' },
    { cn: '后面的内容更精彩。', en: 'The content that follows is even more exciting.' },
  ],
  '后年': [
    { cn: '他后年毕业。', en: 'He will graduate the year after next.' },
    { cn: '后年我打算去留学。', en: 'I plan to study abroad the year after next.' },
    { cn: '后年的计划还不确定。', en: 'Plans for the year after next are not yet certain.' },
  ],
  '互联网': [
    { cn: '互联网改变了我们的生活。', en: 'The Internet has changed our lives.' },
    { cn: '现在大家都在用互联网。', en: 'Everyone is using the Internet now.' },
    { cn: '互联网让世界变得更小了。', en: 'The Internet has made the world smaller.' },
  ],
  '互相': [
    { cn: '我们应该互相帮助。', en: 'We should help each other.' },
    { cn: '同学之间要互相尊重。', en: 'Classmates should respect each other.' },
    { cn: '他们互相看了一眼。', en: 'They glanced at each other.' },
  ],
  '华人': [
    { cn: '海外华人很多。', en: 'There are many overseas Chinese.' },
    { cn: '华人在全球各地都有分布。', en: 'Ethnic Chinese are distributed all over the world.' },
    { cn: '他是一位杰出的华人科学家。', en: 'He is an outstanding Chinese scientist.' },
  ],
  '化': [
    { cn: '冰雪融化了。', en: 'The ice and snow melted.' },
    { cn: '现代化的城市很美丽。', en: 'Modernized cities are very beautiful.' },
    { cn: '简单的问题不要复杂化。', en: 'Don\'t overcomplicate simple problems.' },
  ],
  '划船': [
    { cn: '我们去湖上划船吧。', en: 'Let\'s go rowing on the lake.' },
    { cn: '划船是一项很好的运动。', en: 'Rowing is a great sport.' },
    { cn: '他们在公园里划船。', en: 'They are rowing in the park.' },
  ],
  '话剧': [
    { cn: '今晚有一场话剧。', en: 'There is a play tonight.' },
    { cn: '她喜欢看话剧。', en: 'She likes watching plays.' },
    { cn: '这部话剧很受欢迎。', en: 'This play is very popular.' },
  ],
  '话题': [
    { cn: '这个话题很有意思。', en: 'This topic is very interesting.' },
    { cn: '我们换个话题吧。', en: 'Let\'s change the subject.' },
    { cn: '环保是热门话题。', en: 'Environmental protection is a hot topic.' },
  ],
  '环': [
    { cn: '五环是奥运会的标志。', en: 'The five rings are the symbol of the Olympics.' },
    { cn: '这条路绕了一个大环。', en: 'This road goes around in a big loop.' },
    { cn: '她戴了一个金环。', en: 'She wore a gold ring.' },
  ],
  '环保': [
    { cn: '我们要注意环保。', en: 'We should pay attention to environmental protection.' },
    { cn: '这种材料是环保的。', en: 'This material is environmentally friendly.' },
    { cn: '环保人人有责。', en: 'Everyone is responsible for environmental protection.' },
  ],
  '环境': [
    { cn: '这里的环境很好。', en: 'The environment here is very good.' },
    { cn: '保护环境是我们的责任。', en: 'Protecting the environment is our responsibility.' },
    { cn: '学习环境很重要。', en: 'The learning environment is very important.' },
  ],
  '欢乐': [
    { cn: '节日里到处都是欢乐的气氛。', en: 'There is a joyful atmosphere everywhere during the festival.' },
    { cn: '孩子们度过了一个欢乐的下午。', en: 'The children spent a happy afternoon.' },
    { cn: '欢乐的歌声飘荡在空中。', en: 'Joyful singing floated in the air.' },
  ],
  '会议': [
    { cn: '下午有一个重要的会议。', en: 'There is an important meeting this afternoon.' },
    { cn: '会议讨论了很多问题。', en: 'The meeting discussed many issues.' },
    { cn: '请准时参加会议。', en: 'Please attend the meeting on time.' },
  ],
  '会员': [
    { cn: '他是这个俱乐部的会员。', en: 'He is a member of this club.' },
    { cn: '成为会员可以享受折扣。', en: 'Becoming a member gives you discounts.' },
    { cn: '会员卡可以积分。', en: 'The membership card can accumulate points.' },
  ],
  '活': [
    { cn: '这条鱼还活着。', en: 'This fish is still alive.' },
    { cn: '他干活很认真。', en: 'He works very conscientiously.' },
    { cn: '人活着要有希望。', en: 'People need hope to live.' },
  ],
  '火': [
    { cn: '小心火！', en: 'Be careful of fire!' },
    { cn: '他急得像火一样。', en: 'He was as anxious as fire.' },
    { cn: '火灭了。', en: 'The fire went out.' },
  ],
  '机器': [
    { cn: '这台机器很先进。', en: 'This machine is very advanced.' },
    { cn: '机器坏了需要修理。', en: 'The machine is broken and needs repair.' },
    { cn: '工厂里有很多机器。', en: 'There are many machines in the factory.' },
  ],
  '积极': [
    { cn: '他做事很积极。', en: 'He is very proactive in doing things.' },
    { cn: '要积极面对困难。', en: 'Face difficulties positively.' },
    { cn: '大家都积极参加活动。', en: 'Everyone actively participates in activities.' },
  ],
  '积极性': [
    { cn: '要提高员工的积极性。', en: 'We need to improve the employees\' enthusiasm.' },
    { cn: '他的积极性很高。', en: 'His enthusiasm is very high.' },
    { cn: '好的制度能调动大家的积极性。', en: 'A good system can mobilize everyone\'s enthusiasm.' },
  ],
  '基本': [
    { cn: '这是基本的要求。', en: 'This is a basic requirement.' },
    { cn: '基本问题已经解决了。', en: 'The basic problems have been solved.' },
    { cn: '他掌握了基本的技能。', en: 'He has mastered the basic skills.' },
  ],
  '基本上': [
    { cn: '工作基本上完成了。', en: 'The work is basically done.' },
    { cn: '他基本上每天都跑步。', en: 'He basically runs every day.' },
    { cn: '我基本上同意你的看法。', en: 'I basically agree with your view.' },
  ],
  '基础': [
    { cn: '打好基础很重要。', en: 'Laying a good foundation is very important.' },
    { cn: '他的中文基础不错。', en: 'His Chinese foundation is good.' },
    { cn: '教育是国家发展的基础。', en: 'Education is the foundation of national development.' },
  ],
  '及时': [
    { cn: '他及时赶到了。', en: 'He arrived in time.' },
    { cn: '请及时通知我。', en: 'Please notify me promptly.' },
    { cn: '及时处理问题很重要。', en: 'It is important to deal with problems promptly.' },
  ],
  '极了': [
    { cn: '今天热极了。', en: 'It\'s extremely hot today.' },
    { cn: '这道菜好吃极了。', en: 'This dish is extremely delicious.' },
    { cn: '他高兴极了。', en: 'He was extremely happy.' },
  ],
  '集体': [
    { cn: '这是集体的决定。', en: 'This is a collective decision.' },
    { cn: '我们要有集体精神。', en: 'We should have team spirit.' },
    { cn: '大家一起集体合影。', en: 'Everyone took a group photo together.' },
  ],
  '集中': [
    { cn: '请集中注意力。', en: 'Please concentrate.' },
    { cn: '人口集中在大城市。', en: 'The population is concentrated in big cities.' },
    { cn: '他把精力集中在工作上。', en: 'He focused his energy on work.' },
  ],
  '计算': [
    { cn: '请你计算一下总数。', en: 'Please calculate the total.' },
    { cn: '计算机可以快速计算。', en: 'Computers can calculate quickly.' },
    { cn: '他计算了所有的费用。', en: 'He calculated all the expenses.' },
  ],
  '记录': [
    { cn: '他打破了世界记录。', en: 'He broke the world record.' },
    { cn: '请做好会议记录。', en: 'Please keep good meeting minutes.' },
    { cn: '我记录了每天的开支。', en: 'I recorded my daily expenses.' },
  ],
  '记者': [
    { cn: '记者采访了市长。', en: 'The journalist interviewed the mayor.' },
    { cn: '他是一名优秀的记者。', en: 'He is an excellent journalist.' },
    { cn: '很多记者来到了现场。', en: 'Many reporters came to the scene.' },
  ],
  '纪录': [
    { cn: '这是一部纪录片。', en: 'This is a documentary.' },
    { cn: '他创下了新的纪录。', en: 'He set a new record.' },
    { cn: '这项纪录保持了十年。', en: 'This record has been held for ten years.' },
  ],
  '纪念': [
    { cn: '这是纪念品。', en: 'This is a souvenir.' },
    { cn: '我们纪念这个重要的日子。', en: 'We commemorate this important day.' },
    { cn: '他买了一些纪念品。', en: 'He bought some souvenirs.' },
  ],
  '技术': [
    { cn: '他的技术很高。', en: 'His skills are very high.' },
    { cn: '科学技术是第一生产力。', en: 'Science and technology are the primary productive forces.' },
    { cn: '新技术改变了生产方式。', en: 'New technology has changed the way of production.' },
  ],
  '继续': [
    { cn: '请继续说。', en: 'Please continue.' },
    { cn: '他决定继续学习。', en: 'He decided to continue studying.' },
    { cn: '雨还在继续下。', en: 'The rain is still continuing.' },
  ],
  '加工': [
    { cn: '这些产品需要加工。', en: 'These products need processing.' },
    { cn: '食品加工厂在郊区。', en: 'The food processing factory is in the suburbs.' },
    { cn: '木头被加工成了家具。', en: 'The wood was processed into furniture.' },
  ],
  '加快': [
    { cn: '请加快速度。', en: 'Please speed up.' },
    { cn: '城市建设的步伐在加快。', en: 'The pace of urban construction is accelerating.' },
    { cn: '他加快了脚步。', en: 'He quickened his pace.' },
  ],
  '加强': [
    { cn: '我们要加强合作。', en: 'We need to strengthen cooperation.' },
    { cn: '学校加强了安全管理。', en: 'The school strengthened safety management.' },
    { cn: '加强锻炼有益健康。', en: 'Strengthening exercise is beneficial to health.' },
  ],
  '家具': [
    { cn: '他买了一套新家具。', en: 'He bought a set of new furniture.' },
    { cn: '这些家具是木头做的。', en: 'This furniture is made of wood.' },
    { cn: '家具店在二楼。', en: 'The furniture store is on the second floor.' },
  ],
  '家属': [
    { cn: '家属可以来探望。', en: 'Family members can come to visit.' },
    { cn: '请通知他的家属。', en: 'Please notify his family.' },
    { cn: '职工家属也可以参加。', en: 'Employees\' family members can also participate.' },
  ],
  '家乡': [
    { cn: '我的家乡在南方。', en: 'My hometown is in the south.' },
    { cn: '他回到了自己的家乡。', en: 'He returned to his hometown.' },
    { cn: '家乡的变化真大。', en: 'The changes in my hometown are really big.' },
  ],
  '价格': [
    { cn: '这个价格太高了。', en: 'This price is too high.' },
    { cn: '价格可以商量吗？', en: 'Can the price be negotiated?' },
    { cn: '房子的价格在上涨。', en: 'Housing prices are rising.' },
  ],
  '价钱': [
    { cn: '这个东西价钱不贵。', en: 'This thing is not expensive.' },
    { cn: '价钱多少？', en: 'How much is the price?' },
    { cn: '他嫌价钱太高。', en: 'He thinks the price is too high.' },
  ],
  '价值': [
    { cn: '这幅画很有价值。', en: 'This painting is very valuable.' },
    { cn: '健康是最大的价值。', en: 'Health is the greatest value.' },
    { cn: '每个人都有自己的价值。', en: 'Everyone has their own value.' },
  ],
  '架': [
    { cn: '书架上有很多书。', en: 'There are many books on the bookshelf.' },
    { cn: '一架飞机飞过去了。', en: 'An airplane flew by.' },
    { cn: '他搭了一个架子放东西。', en: 'He set up a rack to put things on.' },
  ],
  '坚持': [
    { cn: '他坚持每天锻炼。', en: 'He insists on exercising every day.' },
    { cn: '坚持就是胜利。', en: 'Persistence leads to victory.' },
    { cn: '我坚持自己的看法。', en: 'I insist on my own view.' },
  ],
  '坚决': [
    { cn: '他坚决反对这个提议。', en: 'He firmly opposes this proposal.' },
    { cn: '我们坚决支持你。', en: 'We firmly support you.' },
    { cn: '态度要坚决。', en: 'The attitude must be firm.' },
  ],
  '坚强': [
    { cn: '她是一个坚强的人。', en: 'She is a strong person.' },
    { cn: '面对困难要坚强。', en: 'Be strong in the face of difficulties.' },
    { cn: '他表现得很坚强。', en: 'He appeared very strong.' },
  ],
  '简单': [
    { cn: '这个问题很简单。', en: 'This problem is very simple.' },
    { cn: '简单地说一下情况。', en: 'Briefly describe the situation.' },
    { cn: '生活越简单越好。', en: 'The simpler life is, the better.' },
  ],
  '简直': [
    { cn: '这简直太好了！', en: 'This is simply wonderful!' },
    { cn: '他简直不敢相信。', en: 'He simply couldn\'t believe it.' },
    { cn: '今天简直热死了。', en: 'It\'s simply boiling hot today.' },
  ],
  '建': [
    { cn: '他们在建一座新桥。', en: 'They are building a new bridge.' },
    { cn: '这栋楼是去年建的。', en: 'This building was built last year.' },
    { cn: '村里建了一所学校。', en: 'A school was built in the village.' },
  ],
  '建成': [
    { cn: '这座桥已经建成了。', en: 'This bridge has been completed.' },
    { cn: '新机场将在明年建成。', en: 'The new airport will be completed next year.' },
    { cn: '学校已经建成并投入使用。', en: 'The school has been built and put into use.' },
  ],
  '建立': [
    { cn: '两国建立了外交关系。', en: 'The two countries established diplomatic relations.' },
    { cn: '我们要建立信任。', en: 'We need to establish trust.' },
    { cn: '他建立了自己的公司。', en: 'He established his own company.' },
  ],
  '建设': [
    { cn: '国家正在大力建设基础设施。', en: 'The country is vigorously building infrastructure.' },
    { cn: '城市建设进展很快。', en: 'Urban construction is progressing rapidly.' },
    { cn: '我们要为建设美丽家园而努力。', en: 'We should work hard to build a beautiful homeland.' },
  ],
  '建议': [
    { cn: '我建议你多休息。', en: 'I suggest you rest more.' },
    { cn: '他提出了一个好建议。', en: 'He made a good suggestion.' },
    { cn: '谢谢你的建议。', en: 'Thank you for your advice.' },
  ],
  '将近': [
    { cn: '他在这里住了将近十年。', en: 'He has lived here for nearly ten years.' },
    { cn: '将近一半的人投了赞成票。', en: 'Nearly half of the people voted in favor.' },
    { cn: '时间已经将近中午了。', en: 'It\'s almost noon already.' },
  ],
  '将来': [
    { cn: '将来你想做什么？', en: 'What do you want to do in the future?' },
    { cn: '将来的事谁也说不准。', en: 'No one can predict the future.' },
    { cn: '他对将来充满信心。', en: 'He is full of confidence about the future.' },
  ],
  '交费': [
    { cn: '请到柜台交费。', en: 'Please go to the counter to pay.' },
    { cn: '你交费了吗？', en: 'Have you paid the fee?' },
    { cn: '每个月要按时交费。', en: 'You need to pay the fee on time every month.' },
  ],
  '交警': [
    { cn: '交警在路口指挥交通。', en: 'Traffic police are directing traffic at the intersection.' },
    { cn: '他被交警拦下了。', en: 'He was stopped by the traffic police.' },
    { cn: '交警给他开了一张罚单。', en: 'The traffic police gave him a ticket.' },
  ],
  '交流': [
    { cn: '我们经常交流学习经验。', en: 'We often exchange learning experiences.' },
    { cn: '文化交流很重要。', en: 'Cultural exchange is very important.' },
    { cn: '他跟外国朋友交流很顺畅。', en: 'He communicates smoothly with foreign friends.' },
  ],
  '交往': [
    { cn: '他们交往了两年。', en: 'They have been dating for two years.' },
    { cn: '人际交往需要真诚。', en: 'Social interaction requires sincerity.' },
    { cn: '她不太善于与人交往。', en: 'She is not very good at socializing.' },
  ],
  '交易': [
    { cn: '这笔交易很成功。', en: 'This deal was very successful.' },
    { cn: '网上交易越来越普遍。', en: 'Online transactions are becoming more common.' },
    { cn: '交易双方都很满意。', en: 'Both parties to the transaction are very satisfied.' },
  ],
  '较': [
    { cn: '今天的气温较低。', en: 'Today\'s temperature is relatively low.' },
    { cn: '这个方案较为合理。', en: 'This plan is comparatively reasonable.' },
    { cn: '他的成绩较上次有了进步。', en: 'His grades improved compared to last time.' },
  ],
  '教材': [
    { cn: '这本教材很实用。', en: 'This textbook is very practical.' },
    { cn: '老师编写了新教材。', en: 'The teacher compiled new teaching materials.' },
    { cn: '我们用的教材是最新版的。', en: 'The textbook we use is the latest edition.' },
  ],
  '教练': [
    { cn: '教练对我们要求很严格。', en: 'The coach is very strict with us.' },
    { cn: '他是一位游泳教练。', en: 'He is a swimming coach.' },
    { cn: '教练鼓励了每一位队员。', en: 'The coach encouraged every team member.' },
  ],
  '接待': [
    { cn: '公司接待了外国客人。', en: 'The company received foreign guests.' },
    { cn: '接待处在一楼。', en: 'The reception is on the first floor.' },
    { cn: '他负责接待工作。', en: 'He is in charge of reception work.' },
  ],
  '接近': [
    { cn: '冬天接近了。', en: 'Winter is approaching.' },
    { cn: '他试着接近那只小猫。', en: 'He tried to approach the kitten.' },
    { cn: '两个人的想法非常接近。', en: 'The two people\'s ideas are very close.' },
  ],
  '节约': [
    { cn: '我们要节约用水。', en: 'We should conserve water.' },
    { cn: '节约是一种美德。', en: 'Frugality is a virtue.' },
    { cn: '他很节约，从不乱花钱。', en: 'He is very frugal and never wastes money.' },
  ],
  '结合': [
    { cn: '理论要和实际结合起来。', en: 'Theory should be combined with practice.' },
    { cn: '他把中西方文化结合在一起。', en: 'He combined Chinese and Western cultures.' },
    { cn: '结合自己的经验谈谈看法。', en: 'Share your views based on your own experience.' },
  ],
  '结婚': [
    { cn: '他们下个月结婚。', en: 'They are getting married next month.' },
    { cn: '结婚是人生大事。', en: 'Getting married is a major life event.' },
    { cn: '他还没有结婚。', en: 'He is not married yet.' },
  ],
  '结实': [
    { cn: '这张桌子很结实。', en: 'This table is very sturdy.' },
    { cn: '他的身体很结实。', en: 'His body is very strong.' },
    { cn: '这双鞋又轻又结实。', en: 'These shoes are both light and durable.' },
  ],
  '结束': [
    { cn: '会议已经结束了。', en: 'The meeting has ended.' },
    { cn: '比赛什么时候结束？', en: 'When does the match end?' },
    { cn: '假期即将结束。', en: 'The holiday is about to end.' },
  ],
  '解决': [
    { cn: '我们要尽快解决这个问题。', en: 'We need to solve this problem as soon as possible.' },
    { cn: '这个问题已经解决了。', en: 'This problem has been resolved.' },
    { cn: '他善于解决困难。', en: 'He is good at solving difficulties.' },
  ],
  '解开': [
    { cn: '他解开了绳子。', en: 'He untied the rope.' },
    { cn: '这个谜终于被解开了。', en: 'This mystery was finally solved.' },
    { cn: '她解开了衬衫的扣子。', en: 'She unbuttoned her shirt.' },
  ],
  '金': [
    { cn: '这枚戒指是金的。', en: 'This ring is gold.' },
    { cn: '他获得了一枚金牌。', en: 'He won a gold medal.' },
    { cn: '金色的阳光照在脸上。', en: 'Golden sunlight shone on the face.' },
  ],
  '金牌': [
    { cn: '她获得了金牌。', en: 'She won the gold medal.' },
    { cn: '中国队拿了很多金牌。', en: 'The Chinese team won many gold medals.' },
    { cn: '金牌是运动员的梦想。', en: 'A gold medal is an athlete\'s dream.' },
  ],
  '仅': [
    { cn: '这仅是开始。', en: 'This is merely the beginning.' },
    { cn: '现场仅有十个人。', en: 'There were only ten people at the scene.' },
    { cn: '他仅用了一个小时就完成了。', en: 'He finished in only one hour.' },
  ],
  '仅仅': [
    { cn: '他仅仅是个学生。', en: 'He is merely a student.' },
    { cn: '仅仅靠努力是不够的。', en: 'Effort alone is not enough.' },
    { cn: '这仅仅是我的个人看法。', en: 'This is merely my personal opinion.' },
  ],
  '尽量': [
    { cn: '我会尽量准时到。', en: 'I will try my best to arrive on time.' },
    { cn: '请尽量少吃甜食。', en: 'Please try to eat less sweets.' },
    { cn: '尽量不要迟到。', en: 'Try not to be late.' },
  ],
  '紧': [
    { cn: '这条裤子太紧了。', en: 'These pants are too tight.' },
    { cn: '时间很紧。', en: 'Time is tight.' },
    { cn: '他紧紧地抱住了孩子。', en: 'He held the child tightly.' },
  ],
  '紧急': [
    { cn: '这是一个紧急情况。', en: 'This is an emergency.' },
    { cn: '请拨打紧急电话。', en: 'Please call the emergency number.' },
    { cn: '他收到了一个紧急通知。', en: 'He received an urgent notification.' },
  ],
  '紧张': [
    { cn: '考试前我很紧张。', en: 'I was very nervous before the exam.' },
    { cn: '别紧张，放轻松。', en: 'Don\'t be nervous, relax.' },
    { cn: '工作非常紧张。', en: 'The work is very intense.' },
  ],
  '近期': [
    { cn: '近期天气会变冷。', en: 'The weather will get colder in the near future.' },
    { cn: '他近期打算换工作。', en: 'He plans to change jobs soon.' },
    { cn: '近期有很多好消息。', en: 'There has been a lot of good news recently.' },
  ],
  '进步': [
    { cn: '你的中文进步很大。', en: 'Your Chinese has improved a lot.' },
    { cn: '社会在不断进步。', en: 'Society is constantly progressing.' },
    { cn: '他最近进步了不少。', en: 'He has made considerable progress recently.' },
  ],
  '进一步': [
    { cn: '我们需要进一步讨论。', en: 'We need to discuss further.' },
    { cn: '双方将进一步加强合作。', en: 'Both sides will further strengthen cooperation.' },
    { cn: '进一步的调查正在进行中。', en: 'Further investigation is underway.' },
  ],
  '进展': [
    { cn: '项目进展顺利。', en: 'The project is progressing smoothly.' },
    { cn: '有什么新的进展吗？', en: 'Is there any new progress?' },
    { cn: '谈判取得了重要进展。', en: 'The negotiations made important progress.' },
  ],
  '京剧': [
    { cn: '京剧是中国的国粹。', en: 'Beijing opera is the quintessence of Chinese culture.' },
    { cn: '他从小就喜欢京剧。', en: 'He has liked Beijing opera since childhood.' },
    { cn: '今晚有一场京剧表演。', en: 'There is a Beijing opera performance tonight.' },
  ],
  '经济': [
    { cn: '中国的经济发展很快。', en: 'China\'s economy is developing rapidly.' },
    { cn: '经济形势不太好。', en: 'The economic situation is not very good.' },
    { cn: '他学的是经济学。', en: 'He studies economics.' },
  ],
  '经历': [
    { cn: '这是一次难忘的经历。', en: 'This was an unforgettable experience.' },
    { cn: '他经历了很多困难。', en: 'He went through many difficulties.' },
    { cn: '每个人都有不同的经历。', en: 'Everyone has different experiences.' },
  ],
  '经验': [
    { cn: '他有丰富的工作经验。', en: 'He has rich work experience.' },
    { cn: '经验是最好的老师。', en: 'Experience is the best teacher.' },
    { cn: '你能分享一下你的经验吗？', en: 'Can you share your experience?' },
  ],
  '经营': [
    { cn: '他经营一家餐厅。', en: 'He runs a restaurant.' },
    { cn: '这家店经营得很好。', en: 'This shop is managed very well.' },
    { cn: '经营一家公司不容易。', en: 'Running a company is not easy.' },
  ],
  '精彩': [
    { cn: '这场比赛非常精彩。', en: 'This match was very exciting.' },
    { cn: '他的演讲很精彩。', en: 'His speech was brilliant.' },
    { cn: '人生因努力而精彩。', en: 'Life is wonderful because of effort.' },
  ],
  '精神': [
    { cn: '他的精神状态很好。', en: 'His mental state is very good.' },
    { cn: '团队精神很重要。', en: 'Team spirit is very important.' },
    { cn: '她今天精神不太好。', en: 'She doesn\'t seem in good spirits today.' },
  ],
  '景色': [
    { cn: '这里的景色真美。', en: 'The scenery here is really beautiful.' },
    { cn: '秋天的景色最好看。', en: 'The scenery in autumn is the most beautiful.' },
    { cn: '山上的景色让人陶醉。', en: 'The mountain scenery is intoxicating.' },
  ],
  '警察': [
    { cn: '警察来了。', en: 'The police came.' },
    { cn: '他是一名警察。', en: 'He is a police officer.' },
    { cn: '请马上报警察。', en: 'Please call the police immediately.' },
  ],
  '静': [
    { cn: '教室里很安静。', en: 'The classroom is very quiet.' },
    { cn: '请保持安静。', en: 'Please keep quiet.' },
    { cn: '夜里四周很静。', en: 'It was very quiet all around at night.' },
  ],
  '久': [
    { cn: '好久不见！', en: 'Long time no see!' },
    { cn: '他在这里住了很久。', en: 'He has lived here for a long time.' },
    { cn: '这件事不会持续太久。', en: 'This won\'t last too long.' },
  ],
  '旧': [
    { cn: '这件衣服太旧了。', en: 'This piece of clothing is too old.' },
    { cn: '他住在一栋旧楼里。', en: 'He lives in an old building.' },
    { cn: '旧的不去，新的不来。', en: 'Out with the old, in with the new.' },
  ],
  '救': [
    { cn: '医生救了他的命。', en: 'The doctor saved his life.' },
    { cn: '救命！', en: 'Help! Save me!' },
    { cn: '消防员救出了被困的人。', en: 'The firefighters rescued the trapped people.' },
  ],
  '就是': [
    { cn: '他就是我们的新老师。', en: 'He is precisely our new teacher.' },
    { cn: '就是这个地方。', en: 'It\'s exactly this place.' },
    { cn: '我就是不同意。', en: 'I simply don\'t agree.' },
  ],
  '就业': [
    { cn: '大学生就业压力很大。', en: 'College graduates face great employment pressure.' },
    { cn: '政府出台了促进就业的政策。', en: 'The government introduced policies to promote employment.' },
    { cn: '他毕业后顺利就业了。', en: 'He found a job smoothly after graduation.' },
  ],
  '举办': [
    { cn: '学校举办了运动会。', en: 'The school held a sports meeting.' },
    { cn: '明年这里将举办国际会议。', en: 'An international conference will be held here next year.' },
    { cn: '他们举办了一场音乐会。', en: 'They held a concert.' },
  ],
  '具体': [
    { cn: '请说得具体一点。', en: 'Please be more specific.' },
    { cn: '具体的时间还没确定。', en: 'The specific time has not been determined.' },
    { cn: '他提出了具体的方案。', en: 'He proposed a specific plan.' },
  ],
  '具有': [
    { cn: '他具有领导才能。', en: 'He possesses leadership ability.' },
    { cn: '这种药具有很好的效果。', en: 'This medicine has very good effects.' },
    { cn: '这个城市具有悠久的历史。', en: 'This city has a long history.' },
  ],
  '剧场': [
    { cn: '剧场里座无虚席。', en: 'The theater was packed to capacity.' },
    { cn: '我们在剧场看了一场话剧。', en: 'We watched a play at the theater.' },
    { cn: '这个剧场可以容纳一千人。', en: 'This theater can hold one thousand people.' },
  ],
  '据说': [
    { cn: '据说明天会下雨。', en: 'It is said that it will rain tomorrow.' },
    { cn: '据说他已经出国了。', en: 'It is said that he has gone abroad.' },
    { cn: '据说这家餐厅的菜很好吃。', en: 'It is said that the food at this restaurant is very good.' },
  ],
  '决定': [
    { cn: '他决定去留学。', en: 'He decided to study abroad.' },
    { cn: '这个决定很重要。', en: 'This decision is very important.' },
    { cn: '你自己决定吧。', en: 'You decide for yourself.' },
  ],
  '决赛': [
    { cn: '他进入了决赛。', en: 'He made it to the finals.' },
    { cn: '决赛将在周六举行。', en: 'The finals will be held on Saturday.' },
    { cn: '决赛的结果出来了。', en: 'The results of the finals are out.' },
  ],
  '决心': [
    { cn: '他下定了决心。', en: 'He made up his mind.' },
    { cn: '我有决心完成这个任务。', en: 'I am determined to complete this task.' },
    { cn: '她的决心很坚定。', en: 'Her determination is very firm.' },
  ],
  '绝对': [
    { cn: '这绝对不可能。', en: 'This is absolutely impossible.' },
    { cn: '我绝对相信你。', en: 'I absolutely believe you.' },
    { cn: '没有绝对的事。', en: 'Nothing is absolute.' },
  ],
  '咖啡': [
    { cn: '我每天早上喝一杯咖啡。', en: 'I drink a cup of coffee every morning.' },
    { cn: '你要加糖的咖啡吗？', en: 'Do you want coffee with sugar?' },
    { cn: '我们去咖啡厅坐坐吧。', en: 'Let\'s go sit in a cafe.' },
  ],
  '开发': [
    { cn: '这家公司在开发新产品。', en: 'This company is developing new products.' },
    { cn: '西部地区还有待开发。', en: 'The western region is yet to be developed.' },
    { cn: '他是一名软件开发人员。', en: 'He is a software developer.' },
  ],
  '开放': [
    { cn: '公园全天开放。', en: 'The park is open all day.' },
    { cn: '中国实行改革开放政策。', en: 'China implemented the reform and opening-up policy.' },
    { cn: '花儿开放了。', en: 'The flowers bloomed.' },
  ],
  '开始': [
    { cn: '比赛开始了。', en: 'The match has started.' },
    { cn: '我们什么时候开始？', en: 'When do we start?' },
    { cn: '万事开头难。', en: 'Everything is difficult at the beginning.' },
  ],
  '开业': [
    { cn: '新店下周开业。', en: 'The new store opens next week.' },
    { cn: '祝你开业大吉！', en: 'Wish you good luck on your grand opening!' },
    { cn: '这家餐厅刚开业不久。', en: 'This restaurant just opened not long ago.' },
  ],
  '开展': [
    { cn: '学校开展了丰富的课外活动。', en: 'The school launched rich extracurricular activities.' },
    { cn: '我们要积极开展合作。', en: 'We should actively develop cooperation.' },
    { cn: '工作已经全面开展。', en: 'The work has been fully launched.' },
  ],
  '看起来': [
    { cn: '他看起来很累。', en: 'He looks very tired.' },
    { cn: '这道菜看起来很好吃。', en: 'This dish looks very delicious.' },
    { cn: '看起来要下雨了。', en: 'It looks like it\'s going to rain.' },
  ],
  '看上去': [
    { cn: '她看上去很年轻。', en: 'She looks very young.' },
    { cn: '这件衣服看上去不错。', en: 'This piece of clothing looks nice.' },
    { cn: '他看上去心情不好。', en: 'He looks like he\'s in a bad mood.' },
  ],
  '考验': [
    { cn: '这是对我们的一次考验。', en: 'This is a test for us.' },
    { cn: '困难是对人的考验。', en: 'Difficulties are a test of character.' },
    { cn: '时间会考验一切。', en: 'Time will test everything.' },
  ],
  '科技': [
    { cn: '科技改变了世界。', en: 'Technology has changed the world.' },
    { cn: '他在科技公司工作。', en: 'He works at a technology company.' },
    { cn: '中国的科技发展很快。', en: 'China\'s technology is developing rapidly.' },
  ],
  '可靠': [
    { cn: '他是一个可靠的人。', en: 'He is a reliable person.' },
    { cn: '这个消息可靠吗？', en: 'Is this news reliable?' },
    { cn: '这种产品质量很可靠。', en: 'This product\'s quality is very reliable.' },
  ],
  '可乐': [
    { cn: '我要一杯可乐。', en: 'I want a cola.' },
    { cn: '孩子们都喜欢喝可乐。', en: 'Children all like to drink cola.' },
    { cn: '可乐里有很多糖。', en: 'Cola contains a lot of sugar.' },
  ],
  '克服': [
    { cn: '我们要克服困难。', en: 'We must overcome difficulties.' },
    { cn: '他克服了恐惧。', en: 'He overcame his fear.' },
    { cn: '只要努力就能克服一切。', en: 'As long as you try hard, you can overcome everything.' },
  ],
  '客观': [
    { cn: '我们要客观地看问题。', en: 'We should look at problems objectively.' },
    { cn: '他的评价很客观。', en: 'His evaluation is very objective.' },
    { cn: '客观事实不容否认。', en: 'Objective facts cannot be denied.' },
  ],
  '课程': [
    { cn: '这学期的课程很多。', en: 'There are many courses this semester.' },
    { cn: '他选了一门新课程。', en: 'He chose a new course.' },
    { cn: '网上课程越来越受欢迎。', en: 'Online courses are becoming more and more popular.' },
  ],
  '空': [
    { cn: '房间是空的。', en: 'The room is empty.' },
    { cn: '天空很蓝。', en: 'The sky is very blue.' },
    { cn: '他的话都是空话。', en: 'His words are all empty talk.' },
  ],
  '空调': [
    { cn: '请打开空调。', en: 'Please turn on the air conditioner.' },
    { cn: '空调坏了。', en: 'The air conditioner is broken.' },
    { cn: '夏天没有空调很难受。', en: 'Summer is uncomfortable without air conditioning.' },
  ],
  '空儿': [
    { cn: '你有空儿吗？', en: 'Do you have free time?' },
    { cn: '等有空儿我去看你。', en: 'I\'ll visit you when I have free time.' },
    { cn: '他最近没有空儿。', en: 'He hasn\'t had any free time lately.' },
  ],
  '恐怕': [
    { cn: '恐怕他不会来了。', en: 'I\'m afraid he won\'t come.' },
    { cn: '恐怕要迟到了。', en: 'I\'m afraid we\'re going to be late.' },
    { cn: '这件事恐怕没那么简单。', en: 'I\'m afraid this matter is not that simple.' },
  ],
  '裤子': [
    { cn: '这条裤子太长了。', en: 'These pants are too long.' },
    { cn: '他穿了一条黑裤子。', en: 'He wore a pair of black pants.' },
    { cn: '我想买一条新裤子。', en: 'I want to buy a new pair of pants.' },
  ],
  '快速': [
    { cn: '他快速地跑过去了。', en: 'He ran over quickly.' },
    { cn: '经济在快速发展。', en: 'The economy is developing rapidly.' },
    { cn: '网络使信息传播更加快速。', en: 'The internet makes information spread faster.' },
  ],
  '困': [
    { cn: '我好困，想睡觉。', en: 'I\'m so sleepy, I want to sleep.' },
    { cn: '他们被困在了山上。', en: 'They were trapped on the mountain.' },
    { cn: '下午两点特别容易困。', en: 'It\'s especially easy to feel sleepy at two in the afternoon.' },
  ],
  '困难': [
    { cn: '他遇到了很大的困难。', en: 'He encountered great difficulties.' },
    { cn: '困难是暂时的。', en: 'Difficulties are temporary.' },
    { cn: '我们要勇敢面对困难。', en: 'We should bravely face difficulties.' },
  ],
  '浪费': [
    { cn: '不要浪费食物。', en: 'Don\'t waste food.' },
    { cn: '这是在浪费时间。', en: 'This is a waste of time.' },
    { cn: '浪费水资源是不对的。', en: 'Wasting water resources is wrong.' },
  ],
  '老百姓': [
    { cn: '老百姓的生活越来越好了。', en: 'Ordinary people\'s lives are getting better and better.' },
    { cn: '政府要为老百姓服务。', en: 'The government should serve the people.' },
    { cn: '老百姓最关心的是什么？', en: 'What do ordinary people care about most?' },
  ],
  '老板': [
    { cn: '老板对我们很好。', en: 'The boss is very good to us.' },
    { cn: '他是这家店的老板。', en: 'He is the owner of this shop.' },
    { cn: '老板决定给大家涨工资。', en: 'The boss decided to give everyone a raise.' },
  ],
  '老太太': [
    { cn: '那位老太太很和蔼。', en: 'That old lady is very kind.' },
    { cn: '隔壁的老太太身体很好。', en: 'The old lady next door is in good health.' },
    { cn: '老太太每天都去散步。', en: 'The old lady goes for a walk every day.' },
  ],
  '老头儿': [
    { cn: '那个老头儿在下棋。', en: 'That old man is playing chess.' },
    { cn: '老头儿讲了一个故事。', en: 'The old man told a story.' },
    { cn: '公园里有几个老头儿在聊天。', en: 'There are a few old men chatting in the park.' },
  ],
  '乐': [
    { cn: '大家都很快乐。', en: 'Everyone is very happy.' },
    { cn: '他乐得合不拢嘴。', en: 'He was so happy he couldn\'t stop smiling.' },
    { cn: '助人为乐。', en: 'Finding joy in helping others.' },
  ],
  '乐队': [
    { cn: '他是乐队的吉他手。', en: 'He is the guitarist of the band.' },
    { cn: '乐队在舞台上表演。', en: 'The band performed on stage.' },
    { cn: '他们组了一个乐队。', en: 'They formed a band.' },
  ],
  '乐观': [
    { cn: '他是一个乐观的人。', en: 'He is an optimistic person.' },
    { cn: '对未来要保持乐观。', en: 'Stay optimistic about the future.' },
    { cn: '乐观的态度很重要。', en: 'An optimistic attitude is very important.' },
  ],
  '类': [
    { cn: '这类问题很常见。', en: 'This type of problem is very common.' },
    { cn: '你喜欢哪类电影？', en: 'What type of movies do you like?' },
    { cn: '同类产品中它是最好的。', en: 'It is the best among similar products.' },
  ],
  '类似': [
    { cn: '这两个问题很类似。', en: 'These two problems are very similar.' },
    { cn: '以前发生过类似的事。', en: 'Similar things have happened before.' },
    { cn: '类似的情况还有很多。', en: 'There are many similar situations.' },
  ],
  '离婚': [
    { cn: '他们去年离婚了。', en: 'They divorced last year.' },
    { cn: '离婚对孩子影响很大。', en: 'Divorce has a great impact on children.' },
    { cn: '他不想离婚。', en: 'He doesn\'t want to get divorced.' },
  ],
  '里面': [
    { cn: '箱子里面有什么？', en: 'What\'s inside the box?' },
    { cn: '里面请坐。', en: 'Please take a seat inside.' },
    { cn: '他在屋子里面。', en: 'He is inside the room.' },
  ],
  '理发': [
    { cn: '我该去理发了。', en: 'I should go get a haircut.' },
    { cn: '附近有理发店吗？', en: 'Is there a barber shop nearby?' },
    { cn: '他每个月理发一次。', en: 'He gets a haircut once a month.' },
  ],
  '理解': [
    { cn: '我理解你的心情。', en: 'I understand your feelings.' },
    { cn: '这篇文章不太好理解。', en: 'This article is not easy to understand.' },
    { cn: '谢谢你的理解。', en: 'Thank you for your understanding.' },
  ],
  '理论': [
    { cn: '理论要和实践相结合。', en: 'Theory should be combined with practice.' },
    { cn: '他的理论很有道理。', en: 'His theory makes a lot of sense.' },
    { cn: '这只是一个理论。', en: 'This is just a theory.' },
  ],
  '理由': [
    { cn: '你有什么理由？', en: 'What is your reason?' },
    { cn: '他的理由很充分。', en: 'His reasons are very sufficient.' },
    { cn: '没有理由不同意。', en: 'There is no reason to disagree.' },
  ],
  '力': [
    { cn: '他的力气很大。', en: 'He is very strong.' },
    { cn: '知识就是力量。', en: 'Knowledge is power.' },
    { cn: '我会尽力而为。', en: 'I will do my best.' },
  ],
  '力量': [
    { cn: '团结就是力量。', en: 'Unity is strength.' },
    { cn: '科技的力量是无穷的。', en: 'The power of technology is infinite.' },
    { cn: '他用尽了全部力量。', en: 'He used all his strength.' },
  ],
  '立刻': [
    { cn: '请你立刻过来。', en: 'Please come here immediately.' },
    { cn: '他立刻就答应了。', en: 'He agreed immediately.' },
    { cn: '听到消息后他立刻出发了。', en: 'He set off immediately after hearing the news.' },
  ],
  '利用': [
    { cn: '我们要利用好时间。', en: 'We should make good use of our time.' },
    { cn: '他利用假期去旅行了。', en: 'He used the holiday to travel.' },
    { cn: '要合理利用资源。', en: 'Resources should be used rationally.' },
  ],
  '连': [
    { cn: '他连饭都没吃。', en: 'He didn\'t even eat.' },
    { cn: '连小孩子都知道。', en: 'Even children know this.' },
    { cn: '他连续工作了十个小时。', en: 'He worked for ten hours in a row.' },
  ],
  '连忙': [
    { cn: '他连忙站了起来。', en: 'He hurriedly stood up.' },
    { cn: '看到老师来了，他连忙把手机收起来。', en: 'Seeing the teacher coming, he quickly put away his phone.' },
    { cn: '她连忙道歉。', en: 'She promptly apologized.' },
  ],
  '连续': [
    { cn: '他连续工作了三天。', en: 'He worked for three days in a row.' },
    { cn: '连续下了一周的雨。', en: 'It rained continuously for a week.' },
    { cn: '她连续获得了三次冠军。', en: 'She won the championship three times in a row.' },
  ],
  '连续剧': [
    { cn: '这部连续剧很好看。', en: 'This TV series is very good.' },
    { cn: '她每天晚上看连续剧。', en: 'She watches TV dramas every night.' },
    { cn: '这部连续剧有三十集。', en: 'This TV series has thirty episodes.' },
  ],
  '联合': [
    { cn: '两个公司联合了。', en: 'The two companies united.' },
    { cn: '大家联合起来解决问题。', en: 'Everyone united to solve the problem.' },
    { cn: '他们采取了联合行动。', en: 'They took joint action.' },
  ],
  '联合国': [
    { cn: '联合国总部在纽约。', en: 'The United Nations headquarters is in New York.' },
    { cn: '联合国有很多成员国。', en: 'The United Nations has many member states.' },
    { cn: '联合国致力于维护世界和平。', en: 'The United Nations is committed to maintaining world peace.' },
  ],
  '联系': [
    { cn: '请跟我联系。', en: 'Please contact me.' },
    { cn: '我们保持联系吧。', en: 'Let\'s keep in touch.' },
    { cn: '他跟老同学失去了联系。', en: 'He lost contact with his old classmates.' },
  ],
  '凉水': [
    { cn: '请给我一杯凉水。', en: 'Please give me a glass of cool water.' },
    { cn: '不要喝凉水，对胃不好。', en: 'Don\'t drink cold water, it\'s bad for your stomach.' },
    { cn: '夏天喝凉水很舒服。', en: 'Drinking cool water in summer is very refreshing.' },
  ],
  '领': [
    { cn: '你去领一下快递吧。', en: 'Go pick up the delivery.' },
    { cn: '他领了新的工作证。', en: 'He received a new work ID.' },
    { cn: '衬衫的领子很硬。', en: 'The collar of the shirt is very stiff.' },
  ],
  '领导': [
    { cn: '领导很重视这件事。', en: 'The leader attaches great importance to this matter.' },
    { cn: '他是我们公司的领导。', en: 'He is the leader of our company.' },
    { cn: '好的领导要以身作则。', en: 'A good leader should lead by example.' },
  ],
  '领先': [
    { cn: '我们队领先三分。', en: 'Our team is leading by three points.' },
    { cn: '这项技术在世界上领先。', en: 'This technology leads the world.' },
    { cn: '他一直领先其他选手。', en: 'He has been leading the other contestants.' },
  ],
  '另外': [
    { cn: '另外还有一个问题。', en: 'There is also another issue.' },
    { cn: '他另外找了一份工作。', en: 'He found another job.' },
    { cn: '另外，我想说一件事。', en: 'Besides, I want to mention something.' },
  ],
  '另一方面': [
    { cn: '一方面要学习，另一方面要锻炼。', en: 'On one hand we should study, on the other hand we should exercise.' },
    { cn: '另一方面，这也有好处。', en: 'On the other hand, this also has benefits.' },
    { cn: '另一方面来看，他说的也有道理。', en: 'From another perspective, what he says also makes sense.' },
  ],
  '留学': [
    { cn: '他打算去美国留学。', en: 'He plans to study in the United States.' },
    { cn: '留学生活很丰富。', en: 'Studying abroad is a rich experience.' },
    { cn: '她在英国留学了三年。', en: 'She studied in the UK for three years.' },
  ],
  '龙': [
    { cn: '龙是中国的象征。', en: 'The dragon is a symbol of China.' },
    { cn: '他属龙。', en: 'He was born in the year of the dragon.' },
    { cn: '舞龙是传统活动。', en: 'Dragon dancing is a traditional activity.' },
  ],
  '录': [
    { cn: '他把演讲录了下来。', en: 'He recorded the speech.' },
    { cn: '这段视频是谁录的？', en: 'Who recorded this video?' },
    { cn: '请把这首歌录下来。', en: 'Please record this song.' },
  ],
  '录音': [
    { cn: '老师播放了录音。', en: 'The teacher played the recording.' },
    { cn: '他在录音棚里录音。', en: 'He is recording in the studio.' },
    { cn: '这段录音很清楚。', en: 'This recording is very clear.' },
  ],
  '路线': [
    { cn: '我们走哪条路线？', en: 'Which route should we take?' },
    { cn: '他规划了旅行路线。', en: 'He planned the travel route.' },
    { cn: '公共汽车路线图在这里。', en: 'The bus route map is here.' },
  ],
  '旅馆': [
    { cn: '这家旅馆很干净。', en: 'This hotel is very clean.' },
    { cn: '附近有旅馆吗？', en: 'Is there a hotel nearby?' },
    { cn: '我在旅馆住了两个晚上。', en: 'I stayed at the hotel for two nights.' },
  ],
  '旅行社': [
    { cn: '我通过旅行社订了机票。', en: 'I booked my flight through a travel agency.' },
    { cn: '旅行社安排了行程。', en: 'The travel agency arranged the itinerary.' },
    { cn: '这家旅行社的服务很好。', en: 'This travel agency has very good service.' },
  ],
  '绿茶': [
    { cn: '我喜欢喝绿茶。', en: 'I like to drink green tea.' },
    { cn: '绿茶有很多好处。', en: 'Green tea has many benefits.' },
    { cn: '请给我一杯绿茶。', en: 'Please give me a cup of green tea.' },
  ],
  '乱': [
    { cn: '房间太乱了。', en: 'The room is too messy.' },
    { cn: '不要乱扔垃圾。', en: 'Don\'t throw garbage randomly.' },
    { cn: '他心里很乱。', en: 'His mind is in a mess.' },
  ],
  '落后': [
    { cn: '不要落后于别人。', en: 'Don\'t fall behind others.' },
    { cn: '这个地区的经济比较落后。', en: 'The economy of this area is relatively backward.' },
    { cn: '我们队落后了两分。', en: 'Our team is behind by two points.' },
  ],
  '麻烦': [
    { cn: '麻烦你帮我一下。', en: 'Could you please help me?' },
    { cn: '这件事很麻烦。', en: 'This matter is very troublesome.' },
    { cn: '给你添麻烦了。', en: 'Sorry for the trouble.' },
  ],
  '马': [
    { cn: '他会骑马。', en: 'He can ride a horse.' },
    { cn: '草原上有很多马。', en: 'There are many horses on the grassland.' },
    { cn: '那匹马跑得很快。', en: 'That horse runs very fast.' },
  ],
  '满足': [
    { cn: '他对现在的生活很满足。', en: 'He is very content with his current life.' },
    { cn: '这个方案满足了所有要求。', en: 'This plan meets all requirements.' },
    { cn: '人不能轻易满足。', en: 'People shouldn\'t be easily satisfied.' },
  ],
  '慢慢': [
    { cn: '慢慢来，不着急。', en: 'Take it slowly, no rush.' },
    { cn: '天慢慢黑了。', en: 'It\'s slowly getting dark.' },
    { cn: '他的中文慢慢进步了。', en: 'His Chinese has slowly improved.' },
  ],
  '毛病': [
    { cn: '这台电脑有毛病。', en: 'This computer has a problem.' },
    { cn: '每个人都有毛病。', en: 'Everyone has shortcomings.' },
    { cn: '他的老毛病又犯了。', en: 'His old problem has come back again.' },
  ],
  '没用': [
    { cn: '说那么多没用。', en: 'It\'s useless to say so much.' },
    { cn: '这个东西没用了。', en: 'This thing is useless.' },
    { cn: '光着急没用，要想办法。', en: 'Just worrying is useless, you need to find a way.' },
  ],
  '媒体': [
    { cn: '媒体报道了这件事。', en: 'The media reported on this matter.' },
    { cn: '社交媒体影响很大。', en: 'Social media has a big influence.' },
    { cn: '他在媒体行业工作。', en: 'He works in the media industry.' },
  ],
  '每': [
    { cn: '我每天六点起床。', en: 'I get up at six o\'clock every day.' },
    { cn: '每个学生都要参加考试。', en: 'Every student must take the exam.' },
    { cn: '他每周运动三次。', en: 'He exercises three times a week.' },
  ],
  '美': [
    { cn: '这朵花真美。', en: 'This flower is really beautiful.' },
    { cn: '她长得很美。', en: 'She is very beautiful.' },
    { cn: '生活中处处都有美。', en: 'There is beauty everywhere in life.' },
  ],
  '美好': [
    { cn: '祝你有一个美好的一天。', en: 'Wish you a wonderful day.' },
    { cn: '我们对未来充满美好的期待。', en: 'We are full of wonderful expectations for the future.' },
    { cn: '童年的回忆很美好。', en: 'Childhood memories are beautiful.' },
  ],
  '美丽': [
    { cn: '这个地方非常美丽。', en: 'This place is very beautiful.' },
    { cn: '她是一个美丽的姑娘。', en: 'She is a beautiful girl.' },
    { cn: '美丽的风景吸引了很多游客。', en: 'The beautiful scenery attracted many tourists.' },
  ],
  '美食': [
    { cn: '中国有很多美食。', en: 'China has a lot of fine food.' },
    { cn: '他是一个美食爱好者。', en: 'He is a food lover.' },
    { cn: '这条街上有各种美食。', en: 'There are all kinds of gourmet food on this street.' },
  ],
  '美术': [
    { cn: '她学的是美术。', en: 'She studies fine arts.' },
    { cn: '美术馆里有很多名画。', en: 'There are many famous paintings in the art museum.' },
    { cn: '他是美术老师。', en: 'He is an art teacher.' },
  ],
  '美元': [
    { cn: '一美元等于多少人民币？', en: 'How much RMB is one US dollar?' },
    { cn: '他花了一百美元。', en: 'He spent one hundred US dollars.' },
    { cn: '美元是国际货币。', en: 'The US dollar is an international currency.' },
  ],
  '迷': [
    { cn: '他是一个球迷。', en: 'He is a sports fan.' },
    { cn: '她迷上了中国文化。', en: 'She became fascinated with Chinese culture.' },
    { cn: '他在森林里迷路了。', en: 'He got lost in the forest.' },
  ],
  '面对': [
    { cn: '我们要勇敢面对现实。', en: 'We should bravely face reality.' },
    { cn: '面对困难不要退缩。', en: 'Don\'t shrink back in the face of difficulties.' },
    { cn: '他面对镜头很紧张。', en: 'He is very nervous facing the camera.' },
  ],
  '面积': [
    { cn: '这个房间的面积是多少？', en: 'What is the area of this room?' },
    { cn: '中国的面积很大。', en: 'China has a very large area.' },
    { cn: '森林面积在减少。', en: 'Forest area is decreasing.' },
  ],
  '民间': [
    { cn: '这是一个民间故事。', en: 'This is a folk story.' },
    { cn: '民间艺术很有特色。', en: 'Folk art has distinctive characteristics.' },
    { cn: '民间传说丰富多彩。', en: 'Folk legends are rich and colorful.' },
  ],
  '民族': [
    { cn: '中国有五十六个民族。', en: 'China has fifty-six ethnic groups.' },
    { cn: '每个民族都有自己的文化。', en: 'Every ethnic group has its own culture.' },
    { cn: '民族团结很重要。', en: 'Ethnic unity is very important.' },
  ],
  '明确': [
    { cn: '目标要明确。', en: 'Goals should be clear.' },
    { cn: '他明确表示反对。', en: 'He clearly expressed his opposition.' },
    { cn: '规定很明确。', en: 'The regulations are very clear.' },
  ],
  '明显': [
    { cn: '效果很明显。', en: 'The effect is very obvious.' },
    { cn: '他的进步很明显。', en: 'His progress is very apparent.' },
    { cn: '明显是他的错。', en: 'It\'s obviously his fault.' },
  ],
  '命运': [
    { cn: '命运掌握在自己手中。', en: 'Fate is in your own hands.' },
    { cn: '他想改变自己的命运。', en: 'He wants to change his own destiny.' },
    { cn: '两个人的命运紧密相连。', en: 'The fates of the two people are closely linked.' },
  ],
  '某': [
    { cn: '某天他突然来了。', en: 'One day he suddenly came.' },
    { cn: '某位同学提出了一个好问题。', en: 'A certain student raised a good question.' },
    { cn: '在某种程度上我同意。', en: 'To a certain extent I agree.' },
  ],
  '母亲': [
    { cn: '母亲节快乐！', en: 'Happy Mother\'s Day!' },
    { cn: '他的母亲是老师。', en: 'His mother is a teacher.' },
    { cn: '母亲为孩子付出了很多。', en: 'A mother gives a lot for her children.' },
  ],
  '木头': [
    { cn: '这张桌子是木头做的。', en: 'This table is made of wood.' },
    { cn: '他搬了几块木头。', en: 'He moved a few pieces of wood.' },
    { cn: '木头房子很暖和。', en: 'Wooden houses are very warm.' },
  ],
  '目标': [
    { cn: '他有明确的目标。', en: 'He has clear goals.' },
    { cn: '我们的目标是第一名。', en: 'Our goal is first place.' },
    { cn: '实现目标需要努力。', en: 'Achieving goals requires effort.' },
  ],
  '目前': [
    { cn: '目前情况还不清楚。', en: 'The current situation is still unclear.' },
    { cn: '目前我住在北京。', en: 'Currently I live in Beijing.' },
    { cn: '目前没有更好的办法。', en: 'There is no better method at present.' },
  ],
  '奶茶': [
    { cn: '她每天都喝奶茶。', en: 'She drinks milk tea every day.' },
    { cn: '这家店的奶茶很好喝。', en: 'The milk tea at this shop is very good.' },
    { cn: '我想要一杯珍珠奶茶。', en: 'I want a cup of bubble milk tea.' },
  ],
  '男子': [
    { cn: '这位男子是谁？', en: 'Who is this man?' },
    { cn: '男子一百米决赛开始了。', en: 'The men\'s 100-meter final has begun.' },
    { cn: '一名男子在路边等车。', en: 'A man was waiting for a bus on the roadside.' },
  ],
  '南部': [
    { cn: '中国南部气候温暖。', en: 'Southern China has a warm climate.' },
    { cn: '他住在城市的南部。', en: 'He lives in the southern part of the city.' },
    { cn: '南部地区经济发展很快。', en: 'The southern region\'s economy is developing rapidly.' },
  ],
  '难道': [
    { cn: '难道你不知道吗？', en: 'Don\'t you know?' },
    { cn: '难道这不是真的？', en: 'Could it be that this isn\'t true?' },
    { cn: '难道他已经走了？', en: 'Could it be that he has already left?' },
  ],
  '难度': [
    { cn: '这道题的难度很大。', en: 'This question has a high degree of difficulty.' },
    { cn: '增加了考试的难度。', en: 'The difficulty of the exam has been increased.' },
    { cn: '工作的难度超出了预期。', en: 'The difficulty of the work exceeded expectations.' },
  ],
  '内': [
    { cn: '一个月内完成。', en: 'Complete within one month.' },
    { cn: '校内禁止吸烟。', en: 'Smoking is prohibited on campus.' },
    { cn: '三天内给我答复。', en: 'Give me a reply within three days.' },
  ],
  '内容': [
    { cn: '这本书的内容很丰富。', en: 'The content of this book is very rich.' },
    { cn: '请介绍一下会议内容。', en: 'Please introduce the content of the meeting.' },
    { cn: '邮件的内容是什么？', en: 'What is the content of the email?' },
  ],
  '内心': [
    { cn: '他内心很激动。', en: 'He was very excited inside.' },
    { cn: '内心的平静最重要。', en: 'Inner peace is the most important.' },
    { cn: '她内心非常善良。', en: 'She is very kind at heart.' },
  ],
  '能不能': [
    { cn: '你能不能帮我一下？', en: 'Could you help me?' },
    { cn: '能不能便宜一点？', en: 'Could it be a little cheaper?' },
    { cn: '你能不能安静一会儿？', en: 'Could you be quiet for a moment?' },
  ],
  '能力': [
    { cn: '他有很强的学习能力。', en: 'He has a strong ability to learn.' },
    { cn: '每个人的能力不同。', en: 'Everyone has different abilities.' },
    { cn: '我们要提高自己的能力。', en: 'We should improve our own abilities.' },
  ],
  '年初': [
    { cn: '年初他制定了新的计划。', en: 'He made new plans at the beginning of the year.' },
    { cn: '年初的时候他还在上学。', en: 'At the beginning of the year he was still in school.' },
    { cn: '公司年初招了一批新人。', en: 'The company hired a batch of new people at the beginning of the year.' },
  ],
  '年代': [
    { cn: '八十年代的歌曲很好听。', en: 'Songs from the eighties are very nice.' },
    { cn: '那个年代的人很勤劳。', en: 'People from that era were very hardworking.' },
    { cn: '不同年代有不同的流行。', en: 'Different decades have different trends.' },
  ],
  '年底': [
    { cn: '年底工作特别忙。', en: 'Work is especially busy at the end of the year.' },
    { cn: '他打算年底结婚。', en: 'He plans to get married at the end of the year.' },
    { cn: '年底要做总结。', en: 'A summary needs to be done at year-end.' },
  ],
  '年纪': [
    { cn: '他年纪不大。', en: 'He is not very old.' },
    { cn: '年纪大了，记性不好了。', en: 'Getting older, memory isn\'t as good.' },
    { cn: '你多大年纪了？', en: 'How old are you?' },
  ],
  '念': [
    { cn: '请念一下这个字。', en: 'Please read this character aloud.' },
    { cn: '他很想念家人。', en: 'He misses his family very much.' },
    { cn: '老师让我们念课文。', en: 'The teacher asked us to read the text aloud.' },
  ],
  '牛': [
    { cn: '农民在田里放牛。', en: 'The farmer was herding cattle in the field.' },
    { cn: '这个人真牛！', en: 'This person is really awesome!' },
    { cn: '牛肉面很好吃。', en: 'Beef noodles are very delicious.' },
  ],
  '农村': [
    { cn: '他在农村长大。', en: 'He grew up in the countryside.' },
    { cn: '农村的空气很好。', en: 'The air in the countryside is very good.' },
    { cn: '越来越多的人回到了农村。', en: 'More and more people have returned to the countryside.' },
  ],
  '农民': [
    { cn: '农民在田里干活。', en: 'Farmers are working in the fields.' },
    { cn: '他的父亲是农民。', en: 'His father is a farmer.' },
    { cn: '农民的收入在增加。', en: 'Farmers\' income is increasing.' },
  ],
  '农业': [
    { cn: '中国是一个农业大国。', en: 'China is a major agricultural country.' },
    { cn: '现代农业需要科技。', en: 'Modern agriculture needs technology.' },
    { cn: '农业是国家的基础。', en: 'Agriculture is the foundation of the country.' },
  ],
  '女子': [
    { cn: '她参加了女子游泳比赛。', en: 'She participated in the women\'s swimming competition.' },
    { cn: '那位女子是谁？', en: 'Who is that woman?' },
    { cn: '女子足球队表现很好。', en: 'The women\'s football team performed very well.' },
  ],
  '暖和': [
    { cn: '今天天气很暖和。', en: 'The weather is very warm today.' },
    { cn: '屋子里很暖和。', en: 'The room is very warm.' },
    { cn: '穿上这件衣服就暖和了。', en: 'You\'ll be warm once you put on this coat.' },
  ],
  '拍': [
    { cn: '他拍了很多照片。', en: 'He took many photos.' },
    { cn: '她拍了拍我的肩膀。', en: 'She patted me on the shoulder.' },
    { cn: '导演在拍一部新电影。', en: 'The director is shooting a new movie.' },
  ],
  '排名': [
    { cn: '他在班级里排名第一。', en: 'He ranks first in the class.' },
    { cn: '这所大学的排名很高。', en: 'This university ranks very high.' },
    { cn: '排名结果已经出来了。', en: 'The ranking results are already out.' },
  ],
  '牌子': [
    { cn: '这是什么牌子的手机？', en: 'What brand of phone is this?' },
    { cn: '门口有一个牌子。', en: 'There is a sign at the door.' },
    { cn: '她喜欢名牌子的包。', en: 'She likes brand-name bags.' },
  ],
  '派': [
    { cn: '公司派他去出差。', en: 'The company sent him on a business trip.' },
    { cn: '学校派了几名老师参加培训。', en: 'The school sent several teachers to attend training.' },
    { cn: '他被派到国外工作。', en: 'He was assigned to work abroad.' },
  ],
  '判断': [
    { cn: '你的判断是正确的。', en: 'Your judgment is correct.' },
    { cn: '不要轻易做出判断。', en: 'Don\'t make judgments too easily.' },
    { cn: '他根据事实做出了判断。', en: 'He made a judgment based on facts.' },
  ],
  '胖': [
    { cn: '他比以前胖了。', en: 'He is fatter than before.' },
    { cn: '吃太多会变胖。', en: 'Eating too much will make you fat.' },
    { cn: '她觉得自己太胖了。', en: 'She thinks she is too fat.' },
  ],
  '跑步': [
    { cn: '他每天早上跑步。', en: 'He runs every morning.' },
    { cn: '跑步是很好的运动。', en: 'Running is a great exercise.' },
    { cn: '我们一起去跑步吧。', en: 'Let\'s go running together.' },
  ],
  '配': [
    { cn: '这条裙子配什么鞋子好？', en: 'What shoes go well with this skirt?' },
    { cn: '他配了一副新眼镜。', en: 'He got a new pair of glasses.' },
    { cn: '颜色搭配得很好。', en: 'The colors are matched very well.' },
  ],
  '配合': [
    { cn: '请大家配合一下。', en: 'Please cooperate, everyone.' },
    { cn: '他们配合得很默契。', en: 'They cooperated very smoothly.' },
    { cn: '各部门要互相配合。', en: 'All departments should coordinate with each other.' },
  ],
  '批评': [
    { cn: '老师批评了他。', en: 'The teacher criticized him.' },
    { cn: '不要害怕批评。', en: 'Don\'t be afraid of criticism.' },
    { cn: '他虚心接受了批评。', en: 'He humbly accepted the criticism.' },
  ],
  '批准': [
    { cn: '他的申请被批准了。', en: 'His application was approved.' },
    { cn: '领导批准了这个计划。', en: 'The leader approved this plan.' },
    { cn: '签证还没有被批准。', en: 'The visa has not been approved yet.' },
  ],
  '皮': [
    { cn: '这个包是皮的。', en: 'This bag is made of leather.' },
    { cn: '苹果的皮可以吃。', en: 'Apple skin can be eaten.' },
    { cn: '这个孩子真皮。', en: 'This child is really naughty.' },
  ],
  '皮包': [
    { cn: '她买了一个皮包。', en: 'She bought a leather handbag.' },
    { cn: '这个皮包是真皮的。', en: 'This handbag is genuine leather.' },
    { cn: '他把文件放在皮包里。', en: 'He put the documents in his briefcase.' },
  ],
  '啤酒': [
    { cn: '他喜欢喝啤酒。', en: 'He likes to drink beer.' },
    { cn: '来两瓶啤酒。', en: 'Bring two bottles of beer.' },
    { cn: '冰啤酒在夏天很受欢迎。', en: 'Cold beer is very popular in summer.' },
  ],
  '票价': [
    { cn: '电影票价是多少？', en: 'What is the movie ticket price?' },
    { cn: '票价上涨了。', en: 'The ticket price has increased.' },
    { cn: '学生可以享受半价票价。', en: 'Students can enjoy half-price tickets.' },
  ],
  '评价': [
    { cn: '大家对他的评价很高。', en: 'Everyone rates him very highly.' },
    { cn: '你怎么评价这部电影？', en: 'How do you evaluate this movie?' },
    { cn: '客户对我们的评价不错。', en: 'Customers have a good evaluation of us.' },
  ],
  '苹果': [
    { cn: '我喜欢吃苹果。', en: 'I like to eat apples.' },
    { cn: '一天一个苹果，医生远离我。', en: 'An apple a day keeps the doctor away.' },
    { cn: '这些苹果很甜。', en: 'These apples are very sweet.' },
  ],
  '破': [
    { cn: '杯子破了。', en: 'The cup is broken.' },
    { cn: '这件衣服破了个洞。', en: 'This piece of clothing has a hole in it.' },
    { cn: '他穿着一双破鞋。', en: 'He wore a pair of worn-out shoes.' },
  ],
  '破坏': [
    { cn: '不要破坏公共财物。', en: 'Don\'t damage public property.' },
    { cn: '环境被严重破坏了。', en: 'The environment has been seriously damaged.' },
    { cn: '这种行为破坏了规则。', en: 'This behavior violated the rules.' },
  ],
  '普遍': [
    { cn: '这种现象很普遍。', en: 'This phenomenon is very common.' },
    { cn: '智能手机已经普遍使用了。', en: 'Smartphones are already widely used.' },
    { cn: '大家普遍认为这个方案好。', en: 'Everyone generally thinks this plan is good.' },
  ],
  '普及': [
    { cn: '电脑已经普及了。', en: 'Computers have become widespread.' },
    { cn: '我们要普及科学知识。', en: 'We should spread scientific knowledge.' },
    { cn: '互联网在全球普及。', en: 'The internet has spread worldwide.' },
  ],
  '期': [
    { cn: '这一期杂志很好看。', en: 'This issue of the magazine is great.' },
    { cn: '下一期的活动是什么时候？', en: 'When is the next session of the activity?' },
    { cn: '学期快结束了。', en: 'The semester is almost over.' },
  ],
  '齐': [
    { cn: '人到齐了吗？', en: 'Is everyone here?' },
    { cn: '他把书摆得很齐。', en: 'He arranged the books very neatly.' },
    { cn: '大家齐心协力。', en: 'Everyone works together with one mind.' },
  ],
  '其次': [
    { cn: '首先要健康，其次才是事业。', en: 'First comes health, then career.' },
    { cn: '其次，我想谈谈教育问题。', en: 'Secondly, I want to discuss education issues.' },
    { cn: '他的英语最好，其次是数学。', en: 'His English is the best, followed by math.' },
  ],
  '其实': [
    { cn: '其实事情没那么复杂。', en: 'Actually, things are not that complicated.' },
    { cn: '他其实很善良。', en: 'He is actually very kind.' },
    { cn: '其实我早就知道了。', en: 'Actually, I already knew.' },
  ],
  '奇怪': [
    { cn: '这件事很奇怪。', en: 'This matter is very strange.' },
    { cn: '他觉得很奇怪。', en: 'He found it very strange.' },
    { cn: '奇怪，他怎么还没来？', en: 'Strange, why hasn\'t he come yet?' },
  ],
  '气候': [
    { cn: '这里的气候很温暖。', en: 'The climate here is very warm.' },
    { cn: '气候变化是全球问题。', en: 'Climate change is a global issue.' },
    { cn: '他不习惯这里的气候。', en: 'He is not used to the climate here.' },
  ],
  '千万': [
    { cn: '千万不要忘了。', en: 'Be sure not to forget.' },
    { cn: '千万要小心。', en: 'Be very careful.' },
    { cn: '这笔投资值千万。', en: 'This investment is worth tens of millions.' },
  ],
  '前后': [
    { cn: '国庆前后游客最多。', en: 'There are the most tourists around National Day.' },
    { cn: '前后花了两个月。', en: 'It took about two months altogether.' },
    { cn: '他前后矛盾。', en: 'He contradicts himself.' },
  ],
  '前进': [
    { cn: '部队继续前进。', en: 'The troops continued to advance.' },
    { cn: '困难不能阻止我们前进。', en: 'Difficulties cannot stop us from moving forward.' },
    { cn: '社会在不断前进。', en: 'Society is constantly moving forward.' },
  ],
  '前面': [
    { cn: '学校在前面。', en: 'The school is ahead.' },
    { cn: '请走到队伍前面。', en: 'Please walk to the front of the line.' },
    { cn: '前面的路还很长。', en: 'The road ahead is still long.' },
  ],
  '前往': [
    { cn: '他前往机场接人。', en: 'He went to the airport to pick someone up.' },
    { cn: '代表团前往北京参加会议。', en: 'The delegation went to Beijing to attend the conference.' },
    { cn: '我们即将前往下一站。', en: 'We are about to proceed to the next stop.' },
  ],
  '强': [
    { cn: '他的身体很强。', en: 'He is physically strong.' },
    { cn: '这支球队很强。', en: 'This team is very strong.' },
    { cn: '他比我强多了。', en: 'He is much better than me.' },
  ],
  '强大': [
    { cn: '中国变得越来越强大。', en: 'China is becoming more and more powerful.' },
    { cn: '知识是强大的武器。', en: 'Knowledge is a powerful weapon.' },
    { cn: '他有一个强大的团队。', en: 'He has a powerful team.' },
  ],
  '强调': [
    { cn: '老师强调了这个知识点。', en: 'The teacher emphasized this key point.' },
    { cn: '他强调安全的重要性。', en: 'He stressed the importance of safety.' },
    { cn: '我要强调一下。', en: 'I want to emphasize this.' },
  ],
  '强烈': [
    { cn: '我强烈推荐这本书。', en: 'I strongly recommend this book.' },
    { cn: '阳光非常强烈。', en: 'The sunlight is very intense.' },
    { cn: '他表达了强烈的不满。', en: 'He expressed strong dissatisfaction.' },
  ],
  '桥': [
    { cn: '这座桥很长。', en: 'This bridge is very long.' },
    { cn: '我们走过桥去。', en: 'Let\'s walk across the bridge.' },
    { cn: '河上建了一座新桥。', en: 'A new bridge was built over the river.' },
  ],
  '巧': [
    { cn: '真巧，我们又见面了。', en: 'What a coincidence, we meet again.' },
    { cn: '她的手很巧。', en: 'She is very skillful with her hands.' },
    { cn: '巧得很，他也在那里。', en: 'Coincidentally, he was there too.' },
  ],
  '亲': [
    { cn: '妈妈亲了孩子一下。', en: 'Mom gave the child a kiss.' },
    { cn: '他们是亲戚。', en: 'They are relatives.' },
    { cn: '这个人很亲切。', en: 'This person is very warm and friendly.' },
  ],
  '亲切': [
    { cn: '她的笑容很亲切。', en: 'Her smile is very warm.' },
    { cn: '老师对学生很亲切。', en: 'The teacher is very kind to students.' },
    { cn: '他给人一种亲切的感觉。', en: 'He gives people a friendly feeling.' },
  ],
  '亲人': [
    { cn: '他很想念远方的亲人。', en: 'He misses his relatives who are far away.' },
    { cn: '亲人的支持很重要。', en: 'The support of family is very important.' },
    { cn: '春节是和亲人团聚的日子。', en: 'Chinese New Year is a time for family reunions.' },
  ],
  '亲自': [
    { cn: '他亲自来了。', en: 'He came in person.' },
    { cn: '这件事我要亲自处理。', en: 'I will handle this matter personally.' },
    { cn: '总统亲自接见了他们。', en: 'The president personally received them.' },
  ],
  '情感': [
    { cn: '他是一个情感丰富的人。', en: 'He is a person rich in emotion.' },
    { cn: '这首歌表达了深厚的情感。', en: 'This song expresses deep emotions.' },
    { cn: '人们需要情感上的支持。', en: 'People need emotional support.' },
  ],
  '情况': [
    { cn: '你了解情况吗？', en: 'Do you understand the situation?' },
    { cn: '目前的情况不太好。', en: 'The current situation is not very good.' },
    { cn: '请汇报一下情况。', en: 'Please report on the situation.' },
  ],
  '请教': [
    { cn: '我想向你请教一个问题。', en: 'I would like to consult you on a question.' },
    { cn: '不懂就要请教别人。', en: 'If you don\'t understand, you should ask others.' },
    { cn: '请教一下，这个字怎么读？', en: 'May I ask, how is this character read?' },
  ],
  '庆祝': [
    { cn: '大家一起庆祝新年。', en: 'Everyone celebrates the New Year together.' },
    { cn: '他们在庆祝胜利。', en: 'They are celebrating the victory.' },
    { cn: '我们出去庆祝一下吧。', en: 'Let\'s go out and celebrate.' },
  ],
  '球迷': [
    { cn: '他是一个足球迷。', en: 'He is a soccer fan.' },
    { cn: '球迷们为自己的球队加油。', en: 'Fans cheered for their team.' },
    { cn: '体育场里挤满了球迷。', en: 'The stadium was packed with fans.' },
  ],
  '区': [
    { cn: '他住在海淀区。', en: 'He lives in Haidian District.' },
    { cn: '这个区的环境很好。', en: 'The environment of this district is very good.' },
    { cn: '工业区在城市的东边。', en: 'The industrial zone is east of the city.' },
  ],
  '区别': [
    { cn: '这两个词有什么区别？', en: 'What is the difference between these two words?' },
    { cn: '要区别对待不同情况。', en: 'Different situations should be treated differently.' },
    { cn: '区别很明显。', en: 'The difference is obvious.' },
  ],
  '取消': [
    { cn: '航班被取消了。', en: 'The flight was canceled.' },
    { cn: '他取消了今天的约会。', en: 'He canceled today\'s appointment.' },
    { cn: '活动因为下雨取消了。', en: 'The activity was canceled because of rain.' },
  ],
  '去世': [
    { cn: '他的爷爷去世了。', en: 'His grandfather passed away.' },
    { cn: '她去世前留下了遗言。', en: 'She left a message before she passed away.' },
    { cn: '那位作家去世已经十年了。', en: 'That writer has been dead for ten years.' },
  ],
  '全场': [
    { cn: '全场响起了掌声。', en: 'The whole audience burst into applause.' },
    { cn: '全场观众都站了起来。', en: 'The entire audience stood up.' },
    { cn: '超市全场打八折。', en: 'Everything in the store is 20% off.' },
  ],
  '全面': [
    { cn: '我们要全面发展。', en: 'We should develop comprehensively.' },
    { cn: '他做了一个全面的报告。', en: 'He gave a comprehensive report.' },
    { cn: '要全面地看问题。', en: 'Look at problems comprehensively.' },
  ],
  '全球': [
    { cn: '全球气温在上升。', en: 'Global temperatures are rising.' },
    { cn: '这个品牌在全球都有市场。', en: 'This brand has a market worldwide.' },
    { cn: '全球化是一个趋势。', en: 'Globalization is a trend.' },
  ],
  '缺': [
    { cn: '家里缺盐了。', en: 'We\'re out of salt at home.' },
    { cn: '这个团队缺一个领导。', en: 'This team lacks a leader.' },
    { cn: '什么都不缺。', en: 'Nothing is lacking.' },
  ],
  '缺点': [
    { cn: '每个人都有缺点。', en: 'Everyone has shortcomings.' },
    { cn: '他的缺点是太急躁。', en: 'His shortcoming is being too impatient.' },
    { cn: '要勇于承认自己的缺点。', en: 'Be brave in admitting your own shortcomings.' },
  ],
  '缺少': [
    { cn: '我们缺少经验。', en: 'We lack experience.' },
    { cn: '这个项目缺少资金。', en: 'This project is short of funds.' },
    { cn: '他不缺少朋友。', en: 'He doesn\'t lack friends.' },
  ],
  '确保': [
    { cn: '我们要确保安全。', en: 'We must ensure safety.' },
    { cn: '请确保信息准确。', en: 'Please ensure the information is accurate.' },
    { cn: '为了确保成功，要提前准备。', en: 'To ensure success, prepare in advance.' },
  ],
  '确定': [
    { cn: '时间确定了吗？', en: 'Has the time been decided?' },
    { cn: '我确定他会来。', en: 'I\'m sure he will come.' },
    { cn: '还没有确定最终的方案。', en: 'The final plan has not been determined yet.' },
  ],
  '确实': [
    { cn: '你说的确实有道理。', en: 'What you said is indeed reasonable.' },
    { cn: '他确实很努力。', en: 'He is indeed very hardworking.' },
    { cn: '这件事确实很难办。', en: 'This matter is indeed hard to handle.' },
  ],
  '裙子': [
    { cn: '她穿了一条红裙子。', en: 'She wore a red skirt.' },
    { cn: '这条裙子很好看。', en: 'This skirt is very pretty.' },
    { cn: '夏天穿裙子很凉快。', en: 'Wearing a skirt in summer is very cool.' },
  ],
  '群': [
    { cn: '一群孩子在玩。', en: 'A group of children are playing.' },
    { cn: '他建了一个微信群。', en: 'He created a WeChat group.' },
    { cn: '远处有一群羊。', en: 'There is a flock of sheep in the distance.' },
  ],
  '热爱': [
    { cn: '他热爱自己的工作。', en: 'He loves his job ardently.' },
    { cn: '我们应该热爱生活。', en: 'We should love life passionately.' },
    { cn: '她热爱音乐。', en: 'She has a passion for music.' },
  ],
  '热烈': [
    { cn: '观众报以热烈的掌声。', en: 'The audience responded with warm applause.' },
    { cn: '大家热烈欢迎新同学。', en: 'Everyone warmly welcomes the new classmates.' },
    { cn: '讨论非常热烈。', en: 'The discussion was very enthusiastic.' },
  ],
  '人才': [
    { cn: '公司需要更多的人才。', en: 'The company needs more talented people.' },
    { cn: '他是一个难得的人才。', en: 'He is a rare talent.' },
    { cn: '培养人才是教育的目标。', en: 'Cultivating talent is the goal of education.' },
  ],
  '人工': [
    { cn: '这是人工做的。', en: 'This is handmade.' },
    { cn: '人工智能发展很快。', en: 'Artificial intelligence is developing rapidly.' },
    { cn: '人工成本越来越高。', en: 'Labor costs are getting higher and higher.' },
  ],
  '人类': [
    { cn: '人类要保护地球。', en: 'Humanity should protect the Earth.' },
    { cn: '这是人类的共同问题。', en: 'This is a common problem for all mankind.' },
    { cn: '人类的历史很悠久。', en: 'Human history is very long.' },
  ],
  '人民': [
    { cn: '人民的生活越来越好。', en: 'The people\'s lives are getting better and better.' },
    { cn: '政府为人民服务。', en: 'The government serves the people.' },
    { cn: '人民是国家的主人。', en: 'The people are the masters of the country.' },
  ],
  '人民币': [
    { cn: '一美元换多少人民币？', en: 'How much RMB is one US dollar?' },
    { cn: '人民币是中国的货币。', en: 'RMB is China\'s currency.' },
    { cn: '请用人民币付款。', en: 'Please pay in RMB.' },
  ],
  '人群': [
    { cn: '人群中有人在喊。', en: 'Someone was shouting in the crowd.' },
    { cn: '他在人群中找到了朋友。', en: 'He found his friend in the crowd.' },
    { cn: '人群慢慢散去了。', en: 'The crowd gradually dispersed.' },
  ],
  '人生': [
    { cn: '人生只有一次。', en: 'You only live once.' },
    { cn: '他对人生充满了希望。', en: 'He is full of hope for life.' },
    { cn: '人生的道路并不平坦。', en: 'The road of life is not always smooth.' },
  ],
  '人员': [
    { cn: '工作人员请注意。', en: 'Staff members, please pay attention.' },
    { cn: '公司招聘了新的人员。', en: 'The company hired new staff.' },
    { cn: '所有人员必须佩戴证件。', en: 'All personnel must wear ID badges.' },
  ],
  '认出': [
    { cn: '我一眼就认出了他。', en: 'I recognized him at first sight.' },
    { cn: '他变化太大了，我没认出来。', en: 'He changed so much, I didn\'t recognize him.' },
    { cn: '你能认出这个字吗？', en: 'Can you recognize this character?' },
  ],
  '认得': [
    { cn: '你认得他吗？', en: 'Do you know him?' },
    { cn: '我认得这个地方。', en: 'I recognize this place.' },
    { cn: '她认得路。', en: 'She knows the way.' },
  ],
  '认可': [
    { cn: '他的能力得到了大家的认可。', en: 'His ability has been recognized by everyone.' },
    { cn: '这个方案已经得到了认可。', en: 'This plan has been approved.' },
    { cn: '我认可你的做法。', en: 'I approve of your approach.' },
  ],
  '任': [
    { cn: '他任经理已经三年了。', en: 'He has served as manager for three years.' },
    { cn: '任他怎么说，我都不同意。', en: 'No matter what he says, I disagree.' },
    { cn: '新任校长上任了。', en: 'The new principal has taken office.' },
  ],
  '任何': [
    { cn: '任何人都不能迟到。', en: 'No one is allowed to be late.' },
    { cn: '在任何情况下都不能放弃。', en: 'Never give up under any circumstances.' },
    { cn: '如果有任何问题，请告诉我。', en: 'If you have any questions, please let me know.' },
  ],
  '任务': [
    { cn: '他完成了这项任务。', en: 'He completed this task.' },
    { cn: '我们的任务是什么？', en: 'What is our mission?' },
    { cn: '这个任务很艰巨。', en: 'This task is very arduous.' },
  ],
  '仍': [
    { cn: '他仍在努力。', en: 'He is still working hard.' },
    { cn: '问题仍没有解决。', en: 'The problem still hasn\'t been resolved.' },
    { cn: '天仍在下雨。', en: 'It is still raining.' },
  ],
  '仍然': [
    { cn: '他仍然坚持自己的观点。', en: 'He still holds to his views.' },
    { cn: '十年过去了，她仍然那么美。', en: 'Ten years have passed, and she is still so beautiful.' },
    { cn: '问题仍然存在。', en: 'The problem still exists.' },
  ],
  '日常': [
    { cn: '这是日常生活中的小事。', en: 'These are small things in daily life.' },
    { cn: '运动是他日常的习惯。', en: 'Exercise is his daily habit.' },
    { cn: '日常开支并不大。', en: 'Daily expenses are not large.' },
  ],
  '容易': [
    { cn: '这道题很容易。', en: 'This question is very easy.' },
    { cn: '说起来容易做起来难。', en: 'Easier said than done.' },
    { cn: '天气变化容易感冒。', en: 'You can easily catch a cold with weather changes.' },
  ],
  '如何': [
    { cn: '你觉得这个方案如何？', en: 'What do you think of this plan?' },
    { cn: '如何提高学习效率？', en: 'How to improve learning efficiency?' },
    { cn: '不管如何，我都支持你。', en: 'No matter what, I support you.' },
  ],
  '散步': [
    { cn: '我们去公园散步吧。', en: 'Let\'s go for a walk in the park.' },
    { cn: '他喜欢在河边散步。', en: 'He likes to take walks along the river.' },
    { cn: '散步有益健康。', en: 'Walking is good for health.' },
  ],
  '沙发': [
    { cn: '请坐沙发上吧。', en: 'Please sit on the sofa.' },
    { cn: '这个沙发很舒服。', en: 'This sofa is very comfortable.' },
    { cn: '他躺在沙发上看电视。', en: 'He lay on the sofa watching TV.' },
  ],
  '沙子': [
    { cn: '海边有很多沙子。', en: 'There is a lot of sand at the beach.' },
    { cn: '风把沙子吹了起来。', en: 'The wind blew the sand up.' },
    { cn: '孩子在玩沙子。', en: 'The children are playing with sand.' },
  ],
  '伤': [
    { cn: '他的手受伤了。', en: 'His hand was injured.' },
    { cn: '伤口还没有好。', en: 'The wound hasn\'t healed yet.' },
    { cn: '不要伤了身体。', en: 'Don\'t injure your body.' },
  ],
  '伤心': [
    { cn: '她很伤心。', en: 'She is very sad.' },
    { cn: '别伤心了，一切都会好的。', en: 'Don\'t be sad, everything will be fine.' },
    { cn: '这件事让他很伤心。', en: 'This matter made him very sad.' },
  ],
  '商品': [
    { cn: '这家店的商品很多。', en: 'This store has many products.' },
    { cn: '商品的质量很好。', en: 'The quality of the goods is very good.' },
    { cn: '网上购买商品很方便。', en: 'Buying goods online is very convenient.' },
  ],
  '商业': [
    { cn: '这是一个商业区。', en: 'This is a commercial district.' },
    { cn: '商业合作对双方都有利。', en: 'Business cooperation benefits both sides.' },
    { cn: '他对商业很感兴趣。', en: 'He is very interested in business.' },
  ],
  '上来': [
    { cn: '你上来吧。', en: 'Come up.' },
    { cn: '他从楼下走上来了。', en: 'He walked up from downstairs.' },
    { cn: '一时想不上来他的名字。', en: 'I can\'t think of his name at the moment.' },
  ],
  '上面': [
    { cn: '上面写着什么？', en: 'What is written on it?' },
    { cn: '书在桌子上面。', en: 'The book is on the table.' },
    { cn: '上面的指示要执行。', en: 'Instructions from above must be carried out.' },
  ],
  '上去': [
    { cn: '你先上去吧。', en: 'You go up first.' },
    { cn: '他爬上去了。', en: 'He climbed up.' },
    { cn: '看上去他很高兴。', en: 'He appears to be very happy.' },
  ],
  '上升': [
    { cn: '温度在上升。', en: 'The temperature is rising.' },
    { cn: '物价不断上升。', en: 'Prices keep rising.' },
    { cn: '公司的业绩在上升。', en: 'The company\'s performance is improving.' },
  ],
  '上衣': [
    { cn: '他穿了一件蓝色的上衣。', en: 'He wore a blue jacket.' },
    { cn: '这件上衣很暖和。', en: 'This jacket is very warm.' },
    { cn: '她买了一件新上衣。', en: 'She bought a new top.' },
  ],
  '设备': [
    { cn: '医院有先进的设备。', en: 'The hospital has advanced equipment.' },
    { cn: '设备需要定期检查。', en: 'Equipment needs regular inspection.' },
    { cn: '这些设备是进口的。', en: 'This equipment is imported.' },
  ],
  '设计': [
    { cn: '他设计了一栋房子。', en: 'He designed a house.' },
    { cn: '这个设计很漂亮。', en: 'This design is very beautiful.' },
    { cn: '她是一名服装设计师。', en: 'She is a fashion designer.' },
  ],
  '设立': [
    { cn: '学校设立了奖学金。', en: 'The school established scholarships.' },
    { cn: '公司在海外设立了分部。', en: 'The company set up branches overseas.' },
    { cn: '这个机构是去年设立的。', en: 'This institution was established last year.' },
  ],
  '社会': [
    { cn: '他关心社会问题。', en: 'He cares about social issues.' },
    { cn: '社会在不断进步。', en: 'Society is constantly progressing.' },
    { cn: '我们要为社会做贡献。', en: 'We should contribute to society.' },
  ],
  '身份证': [
    { cn: '请出示你的身份证。', en: 'Please show your ID card.' },
    { cn: '他的身份证丢了。', en: 'He lost his ID card.' },
    { cn: '办理业务需要身份证。', en: 'An ID card is required to process business.' },
  ],
  '深': [
    { cn: '这条河很深。', en: 'This river is very deep.' },
    { cn: '他对中国文化有很深的了解。', en: 'He has a deep understanding of Chinese culture.' },
    { cn: '夜深了，该睡觉了。', en: 'It\'s late at night, time to sleep.' },
  ],
  '深刻': [
    { cn: '这件事给我留下了深刻的印象。', en: 'This matter left a deep impression on me.' },
    { cn: '他的分析很深刻。', en: 'His analysis is very profound.' },
    { cn: '老师的话意义深刻。', en: 'The teacher\'s words are deeply meaningful.' },
  ],
  '深入': [
    { cn: '我们需要深入调查。', en: 'We need to investigate thoroughly.' },
    { cn: '他深入了解了当地的情况。', en: 'He gained a thorough understanding of the local situation.' },
    { cn: '讨论越来越深入。', en: 'The discussion is getting more and more in-depth.' },
  ],
  '升': [
    { cn: '太阳从东方升起来了。', en: 'The sun rose from the east.' },
    { cn: '他被升为经理了。', en: 'He was promoted to manager.' },
    { cn: '国旗升起来了。', en: 'The national flag was raised.' },
  ],
  '生产': [
    { cn: '这家工厂生产手机。', en: 'This factory produces phones.' },
    { cn: '提高生产效率是目标。', en: 'Improving production efficiency is the goal.' },
    { cn: '中国是世界上最大的生产国之一。', en: 'China is one of the largest producing countries in the world.' },
  ],
  '生存': [
    { cn: '动物需要水才能生存。', en: 'Animals need water to survive.' },
    { cn: '生存环境越来越差。', en: 'The living environment is getting worse.' },
    { cn: '在竞争中生存下来不容易。', en: 'It\'s not easy to survive in competition.' },
  ],
  '生动': [
    { cn: '他讲的故事很生动。', en: 'The story he told was very vivid.' },
    { cn: '老师的课讲得很生动。', en: 'The teacher\'s class is very lively.' },
    { cn: '这幅画画得很生动。', en: 'This painting is very vivid.' },
  ],
  '生命': [
    { cn: '生命是宝贵的。', en: 'Life is precious.' },
    { cn: '医生救了他的生命。', en: 'The doctor saved his life.' },
    { cn: '每一个生命都值得尊重。', en: 'Every life deserves respect.' },
  ],
  '生意': [
    { cn: '他的生意很好。', en: 'His business is very good.' },
    { cn: '做生意要讲信用。', en: 'Doing business requires credibility.' },
    { cn: '最近生意不太好。', en: 'Business hasn\'t been very good lately.' },
  ],
  '生长': [
    { cn: '树木在春天生长最快。', en: 'Trees grow fastest in spring.' },
    { cn: '他在北京生长。', en: 'He grew up in Beijing.' },
    { cn: '植物需要阳光才能生长。', en: 'Plants need sunlight to grow.' },
  ],
  '声明': [
    { cn: '公司发表了一份声明。', en: 'The company issued a statement.' },
    { cn: '他声明自己是清白的。', en: 'He declared his innocence.' },
    { cn: '政府发布了正式声明。', en: 'The government issued an official statement.' },
  ],
  '胜': [
    { cn: '我们队胜了。', en: 'Our team won.' },
    { cn: '三比二，主队胜了。', en: 'Three to two, the home team won.' },
    { cn: '事实胜于雄辩。', en: 'Facts speak louder than words.' },
  ],
  '胜利': [
    { cn: '我们取得了胜利。', en: 'We achieved victory.' },
    { cn: '胜利属于我们。', en: 'Victory belongs to us.' },
    { cn: '大家庆祝胜利。', en: 'Everyone celebrated the victory.' },
  ],
  '失去': [
    { cn: '他失去了工作。', en: 'He lost his job.' },
    { cn: '失去了才知道珍惜。', en: 'You don\'t appreciate something until you lose it.' },
    { cn: '她失去了一个好机会。', en: 'She lost a good opportunity.' },
  ],
  '石头': [
    { cn: '路上有一块大石头。', en: 'There is a big stone on the road.' },
    { cn: '孩子们在扔石头。', en: 'The children are throwing stones.' },
    { cn: '这座桥是用石头建的。', en: 'This bridge is built with stone.' },
  ],
  '石油': [
    { cn: '石油是重要的资源。', en: 'Petroleum is an important resource.' },
    { cn: '石油价格在上涨。', en: 'Oil prices are rising.' },
    { cn: '中东地区石油丰富。', en: 'The Middle East is rich in oil.' },
  ],
  '时': [
    { cn: '吃饭的时候不要说话。', en: 'Don\'t talk while eating.' },
    { cn: '他有时候很安静。', en: 'He is sometimes very quiet.' },
    { cn: '现在是北京时间八点。', en: 'It is now eight o\'clock Beijing time.' },
  ],
  '时代': [
    { cn: '我们生活在一个信息时代。', en: 'We live in an information age.' },
    { cn: '时代在变化。', en: 'Times are changing.' },
    { cn: '每个时代都有自己的特点。', en: 'Every era has its own characteristics.' },
  ],
  '时刻': [
    { cn: '这是一个重要的时刻。', en: 'This is an important moment.' },
    { cn: '他时刻准备着。', en: 'He is ready at all times.' },
    { cn: '我们时刻不能放松。', en: 'We must not relax at any moment.' },
  ],
  '实际上': [
    { cn: '实际上他并不笨。', en: 'In fact, he is not stupid.' },
    { cn: '实际上情况比想象的好。', en: 'In reality, the situation is better than imagined.' },
    { cn: '实际上我们已经完成了。', en: 'As a matter of fact, we have already finished.' },
  ],
  '实力': [
    { cn: '他的实力很强。', en: 'His strength is very great.' },
    { cn: '要用实力说话。', en: 'Let your abilities speak for themselves.' },
    { cn: '两支球队的实力相当。', en: 'The two teams are evenly matched in strength.' },
  ],
  '实行': [
    { cn: '公司实行了新的制度。', en: 'The company implemented a new system.' },
    { cn: '这项政策从明年开始实行。', en: 'This policy will take effect starting next year.' },
    { cn: '计划已经开始实行了。', en: 'The plan has already been put into practice.' },
  ],
  '实验': [
    { cn: '学生们在做实验。', en: 'The students are doing experiments.' },
    { cn: '实验结果很成功。', en: 'The experiment results were very successful.' },
    { cn: '这个实验需要三天。', en: 'This experiment takes three days.' },
  ],
  '实验室': [
    { cn: '他在实验室工作。', en: 'He works in the laboratory.' },
    { cn: '实验室的设备很先进。', en: 'The laboratory equipment is very advanced.' },
    { cn: '进入实验室要穿白大褂。', en: 'You need to wear a lab coat to enter the lab.' },
  ],
  '食品': [
    { cn: '食品安全很重要。', en: 'Food safety is very important.' },
    { cn: '超市里有各种食品。', en: 'There are all kinds of food in the supermarket.' },
    { cn: '绿色食品越来越受欢迎。', en: 'Organic food is becoming more popular.' },
  ],
  '使': [
    { cn: '这件事使他很高兴。', en: 'This matter made him very happy.' },
    { cn: '运动使身体健康。', en: 'Exercise makes the body healthy.' },
    { cn: '他的话使大家感动了。', en: 'His words moved everyone.' },
  ],
  '始终': [
    { cn: '他始终坚持自己的立场。', en: 'He has always maintained his position.' },
    { cn: '她始终面带微笑。', en: 'She always had a smile on her face.' },
    { cn: '我始终相信他。', en: 'I have always believed in him.' },
  ],
  '世纪': [
    { cn: '二十一世纪是信息时代。', en: 'The twenty-first century is the information age.' },
    { cn: '上个世纪发生了很多变化。', en: 'Many changes happened in the last century.' },
    { cn: '这座建筑有一个世纪的历史。', en: 'This building has a century of history.' },
  ],
  '世界': [
    { cn: '世界很大，我想去看看。', en: 'The world is big, I want to see it.' },
    { cn: '世界各国都在发展经济。', en: 'Countries around the world are developing their economies.' },
    { cn: '他环游了世界。', en: 'He traveled around the world.' },
  ],
  '世界杯': [
    { cn: '世界杯四年一次。', en: 'The World Cup is held every four years.' },
    { cn: '他在看世界杯比赛。', en: 'He is watching the World Cup.' },
    { cn: '世界杯是最大的足球赛事。', en: 'The World Cup is the biggest soccer event.' },
  ],
  '市场': [
    { cn: '市场上有很多新产品。', en: 'There are many new products on the market.' },
    { cn: '他去市场买菜了。', en: 'He went to the market to buy vegetables.' },
    { cn: '房地产市场很火。', en: 'The real estate market is booming.' },
  ],
  '事故': [
    { cn: '高速公路上发生了事故。', en: 'An accident occurred on the highway.' },
    { cn: '我们要防止事故的发生。', en: 'We must prevent accidents from occurring.' },
    { cn: '交通事故造成了堵车。', en: 'The traffic accident caused a traffic jam.' },
  ],
  '事件': [
    { cn: '这是一个重大事件。', en: 'This is a major event.' },
    { cn: '他报道了这个事件。', en: 'He reported on this event.' },
    { cn: '这个事件引起了广泛关注。', en: 'This incident attracted widespread attention.' },
  ],
  '事实': [
    { cn: '事实胜于雄辩。', en: 'Facts speak louder than words.' },
    { cn: '我们要尊重事实。', en: 'We must respect the facts.' },
    { cn: '事实证明他是对的。', en: 'Facts proved he was right.' },
  ],
  '事实上': [
    { cn: '事实上他已经知道了。', en: 'In fact, he already knew.' },
    { cn: '事实上问题并不严重。', en: 'In reality, the problem is not serious.' },
    { cn: '事实上我们都同意。', en: 'Actually, we all agree.' },
  ],
  '事业': [
    { cn: '他的事业很成功。', en: 'His career is very successful.' },
    { cn: '她把所有精力都投入到事业中。', en: 'She put all her energy into her career.' },
    { cn: '教育是伟大的事业。', en: 'Education is a great undertaking.' },
  ],
  '试题': [
    { cn: '这道试题很难。', en: 'This exam question is very difficult.' },
    { cn: '老师出了十道试题。', en: 'The teacher set ten exam questions.' },
    { cn: '试题的难度适中。', en: 'The difficulty of the test questions is moderate.' },
  ],
  '试验': [
    { cn: '科学家正在进行试验。', en: 'Scientists are conducting experiments.' },
    { cn: '试验结果还没出来。', en: 'The test results haven\'t come out yet.' },
    { cn: '新药需要经过多次试验。', en: 'New drugs need to go through many tests.' },
  ],
  '室': [
    { cn: '办公室在三楼。', en: 'The office is on the third floor.' },
    { cn: '教室里有三十个学生。', en: 'There are thirty students in the classroom.' },
    { cn: '请到会议室开会。', en: 'Please go to the meeting room for the meeting.' },
  ],
  '适合': [
    { cn: '这份工作很适合你。', en: 'This job is very suitable for you.' },
    { cn: '这个季节适合旅行。', en: 'This season is suitable for traveling.' },
    { cn: '他找到了适合自己的方法。', en: 'He found a method suitable for himself.' },
  ],
  '适应': [
    { cn: '他很快就适应了新环境。', en: 'He quickly adapted to the new environment.' },
    { cn: '需要时间来适应。', en: 'It takes time to adapt.' },
    { cn: '她还没有适应这里的气候。', en: 'She hasn\'t adapted to the climate here yet.' },
  ],
  '适用': [
    { cn: '这个方法适用于所有人。', en: 'This method is applicable to everyone.' },
    { cn: '这条规定适用于全校师生。', en: 'This rule applies to all teachers and students.' },
    { cn: '这个软件适用于各种系统。', en: 'This software is compatible with all systems.' },
  ],
  '收费': [
    { cn: '停车场收费吗？', en: 'Does the parking lot charge a fee?' },
    { cn: '这里的收费很合理。', en: 'The fees here are very reasonable.' },
    { cn: '这条高速公路不收费。', en: 'This highway doesn\'t charge a toll.' },
  ],
  '收看': [
    { cn: '全国观众收看了这个节目。', en: 'Viewers across the country watched this program.' },
    { cn: '请收看今天的新闻。', en: 'Please watch today\'s news.' },
    { cn: '每天有很多人收看直播。', en: 'Many people watch live broadcasts every day.' },
  ],
  '收听': [
    { cn: '他每天收听广播。', en: 'He listens to the radio every day.' },
    { cn: '请收听我们的节目。', en: 'Please tune in to our program.' },
    { cn: '很多人在收听这个电台。', en: 'Many people are listening to this station.' },
  ],
  '收音机': [
    { cn: '爷爷喜欢听收音机。', en: 'Grandpa likes to listen to the radio.' },
    { cn: '这台收音机是老式的。', en: 'This radio is old-fashioned.' },
    { cn: '收音机里传来了音乐。', en: 'Music came from the radio.' },
  ],
  '手续': [
    { cn: '办理入住手续。', en: 'Go through check-in procedures.' },
    { cn: '手续很简单。', en: 'The procedures are simple.' },
    { cn: '你还要办哪些手续？', en: 'What other procedures do you need to complete?' },
  ],
  '手指': [
    { cn: '他用手指指着地图。', en: 'He pointed at the map with his finger.' },
    { cn: '我的手指受伤了。', en: 'My finger is injured.' },
    { cn: '她戴了一枚戒指在手指上。', en: 'She wore a ring on her finger.' },
  ],
  '首都': [
    { cn: '北京是中国的首都。', en: 'Beijing is the capital of China.' },
    { cn: '每个国家都有自己的首都。', en: 'Every country has its own capital.' },
    { cn: '首都的交通很方便。', en: 'Transportation in the capital is very convenient.' },
  ],
  '首先': [
    { cn: '首先，我要感谢大家。', en: 'First of all, I want to thank everyone.' },
    { cn: '首先要打好基础。', en: 'First, you need to lay a good foundation.' },
    { cn: '做事首先要有计划。', en: 'You should first have a plan before doing anything.' },
  ],
  '受': [
    { cn: '这部电影很受欢迎。', en: 'This movie is very popular.' },
    { cn: '他受到了大家的表扬。', en: 'He received praise from everyone.' },
    { cn: '我受不了这种天气。', en: 'I can\'t stand this weather.' },
  ],
  '受伤': [
    { cn: '他在比赛中受伤了。', en: 'He was injured in the match.' },
    { cn: '幸好没有人受伤。', en: 'Fortunately, no one was injured.' },
    { cn: '她的腿受伤了。', en: 'Her leg was injured.' },
  ],
  '书架': [
    { cn: '书架上放满了书。', en: 'The bookshelf is full of books.' },
    { cn: '他买了一个新书架。', en: 'He bought a new bookshelf.' },
    { cn: '请把书放回书架上。', en: 'Please put the book back on the shelf.' },
  ],
  '输': [
    { cn: '我们队输了。', en: 'Our team lost.' },
    { cn: '他不怕输。', en: 'He is not afraid of losing.' },
    { cn: '比赛输了，但我们学到了很多。', en: 'We lost the match, but we learned a lot.' },
  ],
  '输入': [
    { cn: '请输入你的密码。', en: 'Please enter your password.' },
    { cn: '他在电脑上输入了数据。', en: 'He entered data on the computer.' },
    { cn: '输入法可以打中文。', en: 'The input method can type Chinese.' },
  ],
  '熟人': [
    { cn: '他在这里没有熟人。', en: 'He has no acquaintances here.' },
    { cn: '通过熟人介绍找到了工作。', en: 'He found a job through an acquaintance\'s introduction.' },
    { cn: '那个人是我的熟人。', en: 'That person is my acquaintance.' },
  ],
  '属': [
    { cn: '你属什么？', en: 'What is your zodiac sign?' },
    { cn: '我属虎。', en: 'I was born in the year of the tiger.' },
    { cn: '这个问题属于技术问题。', en: 'This problem belongs to the category of technical issues.' },
  ],
  '属于': [
    { cn: '这本书属于图书馆。', en: 'This book belongs to the library.' },
    { cn: '胜利属于坚持到底的人。', en: 'Victory belongs to those who persist.' },
    { cn: '他属于管理层。', en: 'He belongs to the management level.' },
  ],
  '束': [
    { cn: '他送了她一束花。', en: 'He gave her a bouquet of flowers.' },
    { cn: '她把头发束起来了。', en: 'She tied her hair up.' },
    { cn: '一束阳光照进了房间。', en: 'A beam of sunlight shone into the room.' },
  ],
  '数量': [
    { cn: '数量有限，先到先得。', en: 'Quantities are limited, first come first served.' },
    { cn: '参加的人数量很多。', en: 'The number of participants is large.' },
    { cn: '质量比数量重要。', en: 'Quality is more important than quantity.' },
  ],
  '双': [
    { cn: '她有一双大眼睛。', en: 'She has a pair of big eyes.' },
    { cn: '我买了一双新鞋。', en: 'I bought a new pair of shoes.' },
    { cn: '双手合在一起。', en: 'Both hands clasped together.' },
  ],
  '双方': [
    { cn: '双方达成了协议。', en: 'Both sides reached an agreement.' },
    { cn: '谈判双方都很满意。', en: 'Both negotiating parties are very satisfied.' },
    { cn: '双方要互相尊重。', en: 'Both parties should respect each other.' },
  ],
  '思想': [
    { cn: '他的思想很先进。', en: 'His ideas are very progressive.' },
    { cn: '我们要解放思想。', en: 'We should free our thinking.' },
    { cn: '这位哲学家的思想影响了很多人。', en: 'This philosopher\'s ideas influenced many people.' },
  ],
  '死': [
    { cn: '花死了。', en: 'The flower died.' },
    { cn: '他热死了。', en: 'He is dying of heat.' },
    { cn: '这件事已经是死结了。', en: 'This matter is already a dead end.' },
  ],
  '速度': [
    { cn: '他开车的速度很快。', en: 'He drives very fast.' },
    { cn: '请降低速度。', en: 'Please slow down.' },
    { cn: '网络速度越来越快。', en: 'Internet speed is getting faster and faster.' },
  ],
  '随': [
    { cn: '随他去吧。', en: 'Let him do as he pleases.' },
    { cn: '你随便坐。', en: 'Sit wherever you like.' },
    { cn: '随着时间的变化。', en: 'Along with the passage of time.' },
  ],
  '所': [
    { cn: '这所学校很有名。', en: 'This school is very famous.' },
    { cn: '一所医院在附近。', en: 'A hospital is nearby.' },
    { cn: '研究所在大学旁边。', en: 'The research institute is next to the university.' },
  ],
  '所长': [
    { cn: '他是研究所的所长。', en: 'He is the director of the research institute.' },
    { cn: '所长主持了会议。', en: 'The director presided over the meeting.' },
    { cn: '新所长上任了。', en: 'The new director has taken office.' },
  ],
  '台': [
    { cn: '桌子上有一台电脑。', en: 'There is a computer on the desk.' },
    { cn: '他买了一台新电视。', en: 'He bought a new TV.' },
    { cn: '舞台上有一架钢琴。', en: 'There is a piano on the stage.' },
  ],
  '谈': [
    { cn: '我们谈谈吧。', en: 'Let\'s have a talk.' },
    { cn: '他们在谈生意。', en: 'They are discussing business.' },
    { cn: '关于这件事我不想谈。', en: 'I don\'t want to talk about this matter.' },
  ],
  '谈话': [
    { cn: '他们正在进行一次谈话。', en: 'They are having a conversation.' },
    { cn: '领导找他谈话了。', en: 'The leader had a talk with him.' },
    { cn: '谈话的内容是保密的。', en: 'The content of the conversation is confidential.' },
  ],
  '谈判': [
    { cn: '双方开始了谈判。', en: 'Both sides began negotiations.' },
    { cn: '谈判进行得很顺利。', en: 'The negotiations went smoothly.' },
    { cn: '他参加了一次重要的谈判。', en: 'He participated in an important negotiation.' },
  ],
  '汤': [
    { cn: '妈妈做了一碗汤。', en: 'Mom made a bowl of soup.' },
    { cn: '这碗汤很好喝。', en: 'This soup is very delicious.' },
    { cn: '冬天喝汤暖身体。', en: 'Drinking soup in winter warms the body.' },
  ],
  '糖': [
    { cn: '咖啡里放糖吗？', en: 'Do you put sugar in your coffee?' },
    { cn: '小孩子喜欢吃糖。', en: 'Children like to eat candy.' },
    { cn: '少吃糖对健康有好处。', en: 'Eating less sugar is good for health.' },
  ],
  '特色': [
    { cn: '这是当地的特色菜。', en: 'This is a local specialty dish.' },
    { cn: '每个城市都有自己的特色。', en: 'Every city has its own characteristics.' },
    { cn: '这家店很有特色。', en: 'This shop has a lot of character.' },
  ],
  '提前': [
    { cn: '请提前到达。', en: 'Please arrive early.' },
    { cn: '会议提前了一天。', en: 'The meeting was moved up by one day.' },
    { cn: '他提前完成了任务。', en: 'He completed the task ahead of time.' },
  ],
  '提问': [
    { cn: '老师开始提问了。', en: 'The teacher started asking questions.' },
    { cn: '如果有问题请提问。', en: 'If you have questions, please ask.' },
    { cn: '他提问了一个很好的问题。', en: 'He asked a very good question.' },
  ],
  '题目': [
    { cn: '这道题目很难。', en: 'This question is very difficult.' },
    { cn: '文章的题目是什么？', en: 'What is the title of the article?' },
    { cn: '老师出了几个题目。', en: 'The teacher set several questions.' },
  ],
  '体会': [
    { cn: '请谈谈你的体会。', en: 'Please share your experience.' },
    { cn: '我深深地体会到了他的辛苦。', en: 'I deeply felt his hardship.' },
    { cn: '只有亲身经历才能体会。', en: 'You can only understand through personal experience.' },
  ],
  '体现': [
    { cn: '这体现了他的能力。', en: 'This reflects his ability.' },
    { cn: '作品体现了作者的思想。', en: 'The work embodies the author\'s ideas.' },
    { cn: '团队精神在比赛中得到了体现。', en: 'Team spirit was reflected in the competition.' },
  ],
  '体验': [
    { cn: '这是一次难忘的体验。', en: 'This was an unforgettable experience.' },
    { cn: '你想体验一下农村生活吗？', en: 'Would you like to experience rural life?' },
    { cn: '亲自体验才能真正了解。', en: 'You can only truly understand by experiencing it yourself.' },
  ],
  '天空': [
    { cn: '天空很蓝。', en: 'The sky is very blue.' },
    { cn: '天空中飞过一群鸟。', en: 'A flock of birds flew across the sky.' },
    { cn: '夜晚的天空布满了星星。', en: 'The night sky was full of stars.' },
  ],
  '甜': [
    { cn: '这块蛋糕很甜。', en: 'This cake is very sweet.' },
    { cn: '她笑得很甜。', en: 'She smiled sweetly.' },
    { cn: '西瓜又甜又好吃。', en: 'The watermelon is sweet and delicious.' },
  ],
  '跳': [
    { cn: '小孩子喜欢跳来跳去。', en: 'Children like to jump around.' },
    { cn: '他跳过了那道墙。', en: 'He jumped over that wall.' },
    { cn: '她的心跳得很快。', en: 'Her heart was beating fast.' },
  ],
  '跳高': [
    { cn: '他擅长跳高。', en: 'He is good at high jump.' },
    { cn: '跳高比赛就要开始了。', en: 'The high jump competition is about to begin.' },
    { cn: '她在跳高项目中获得了金牌。', en: 'She won the gold medal in high jump.' },
  ],
  '跳舞': [
    { cn: '她喜欢跳舞。', en: 'She likes to dance.' },
    { cn: '我们一起去跳舞吧。', en: 'Let\'s go dancing together.' },
    { cn: '他跳舞跳得很好。', en: 'He dances very well.' },
  ],
  '跳远': [
    { cn: '他参加了跳远比赛。', en: 'He participated in the long jump competition.' },
    { cn: '跳远需要很好的爆发力。', en: 'Long jump requires great explosive power.' },
    { cn: '她在跳远中获得了第二名。', en: 'She got second place in long jump.' },
  ],
  '铁': [
    { cn: '这把刀是铁做的。', en: 'This knife is made of iron.' },
    { cn: '他的意志像铁一样坚强。', en: 'His will is as strong as iron.' },
    { cn: '铁是一种常见的金属。', en: 'Iron is a common metal.' },
  ],
  '铁路': [
    { cn: '中国的铁路网很发达。', en: 'China\'s railway network is very developed.' },
    { cn: '铁路连接了两个城市。', en: 'The railway connects the two cities.' },
    { cn: '他在铁路部门工作。', en: 'He works in the railway department.' },
  ],
  '听力': [
    { cn: '他的听力不太好。', en: 'His hearing is not very good.' },
    { cn: '今天有听力考试。', en: 'There is a listening test today.' },
    { cn: '多听可以提高听力。', en: 'Listening more can improve listening ability.' },
  ],
  '听众': [
    { cn: '听众对演讲反应很好。', en: 'The audience responded well to the speech.' },
    { cn: '广播的听众越来越少了。', en: 'Radio listeners are getting fewer and fewer.' },
    { cn: '他感谢了所有的听众。', en: 'He thanked all the listeners.' },
  ],
  '停止': [
    { cn: '请停止说话。', en: 'Please stop talking.' },
    { cn: '雨停止了。', en: 'The rain stopped.' },
    { cn: '工厂已经停止生产了。', en: 'The factory has stopped production.' },
  ],
  '通常': [
    { cn: '他通常七点起床。', en: 'He usually gets up at seven.' },
    { cn: '通常情况下不会有问题。', en: 'Usually there won\'t be any problems.' },
    { cn: '我通常坐地铁上班。', en: 'I usually take the subway to work.' },
  ],
  '通信': [
    { cn: '现在通信很方便。', en: 'Communication is very convenient now.' },
    { cn: '他们通过信件通信。', en: 'They communicate through letters.' },
    { cn: '通信技术发展很快。', en: 'Communication technology is developing rapidly.' },
  ],
  '同意': [
    { cn: '我同意你的看法。', en: 'I agree with your view.' },
    { cn: '他不同意这个计划。', en: 'He doesn\'t agree with this plan.' },
    { cn: '大家一致同意了。', en: 'Everyone agreed unanimously.' },
  ],
  '痛': [
    { cn: '我头痛。', en: 'I have a headache.' },
    { cn: '他的腿很痛。', en: 'His leg hurts a lot.' },
    { cn: '伤口还在痛。', en: 'The wound still hurts.' },
  ],
  '痛苦': [
    { cn: '他经历了很多痛苦。', en: 'He experienced a lot of pain.' },
    { cn: '失去亲人是很痛苦的。', en: 'Losing loved ones is very painful.' },
    { cn: '痛苦让人成长。', en: 'Pain helps people grow.' },
  ],
  '头脑': [
    { cn: '他的头脑很清楚。', en: 'His mind is very clear.' },
    { cn: '要保持冷静的头脑。', en: 'Keep a cool head.' },
    { cn: '她是一个头脑聪明的人。', en: 'She is a smart person.' },
  ],
  '突出': [
    { cn: '他的表现很突出。', en: 'His performance is outstanding.' },
    { cn: '这是最突出的问题。', en: 'This is the most prominent problem.' },
    { cn: '要突出重点。', en: 'Emphasize the key points.' },
  ],
  '突然': [
    { cn: '他突然出现了。', en: 'He appeared suddenly.' },
    { cn: '天气突然变冷了。', en: 'The weather suddenly turned cold.' },
    { cn: '突然停电了。', en: 'The power went out suddenly.' },
  ],
  '图': [
    { cn: '请看这张图。', en: 'Please look at this picture.' },
    { cn: '地图上标着路线。', en: 'The route is marked on the map.' },
    { cn: '他在画一幅图。', en: 'He is drawing a picture.' },
  ],
  '图画': [
    { cn: '墙上挂着一幅图画。', en: 'A picture hangs on the wall.' },
    { cn: '孩子们在画图画。', en: 'The children are drawing pictures.' },
    { cn: '这本书有很多图画。', en: 'This book has many illustrations.' },
  ],
  '土': [
    { cn: '花盆里的土很干。', en: 'The soil in the flowerpot is very dry.' },
    { cn: '这是本土的产品。', en: 'This is a local product.' },
    { cn: '他的方法太土了。', en: 'His method is too unsophisticated.' },
  ],
  '团': [
    { cn: '旅行团明天出发。', en: 'The tour group departs tomorrow.' },
    { cn: '他参加了一个学习团。', en: 'He joined a study group.' },
    { cn: '一团火在燃烧。', en: 'A ball of fire is burning.' },
  ],
  '团结': [
    { cn: '大家要团结一致。', en: 'Everyone should unite as one.' },
    { cn: '团结就是力量。', en: 'Unity is strength.' },
    { cn: '我们班很团结。', en: 'Our class is very united.' },
  ],
  '团体': [
    { cn: '他加入了一个体育团体。', en: 'He joined a sports organization.' },
    { cn: '团体活动增进了友谊。', en: 'Group activities enhanced friendship.' },
    { cn: '这个团体有一百多名成员。', en: 'This group has over a hundred members.' },
  ],
  '推动': [
    { cn: '科技推动了社会进步。', en: 'Technology has driven social progress.' },
    { cn: '他推动了这项改革。', en: 'He promoted this reform.' },
    { cn: '我们要推动经济发展。', en: 'We should promote economic development.' },
  ],
  '推广': [
    { cn: '公司在推广新产品。', en: 'The company is promoting new products.' },
    { cn: '普通话在全国推广。', en: 'Mandarin is being promoted nationwide.' },
    { cn: '这项技术值得推广。', en: 'This technology is worth promoting.' },
  ],
  '推进': [
    { cn: '项目正在稳步推进。', en: 'The project is advancing steadily.' },
    { cn: '我们要推进改革。', en: 'We should push forward with reforms.' },
    { cn: '计划按步骤推进中。', en: 'The plan is advancing step by step.' },
  ],
  '推开': [
    { cn: '他推开了门。', en: 'He pushed open the door.' },
    { cn: '她轻轻地推开窗户。', en: 'She gently pushed open the window.' },
    { cn: '他推开了面前的杯子。', en: 'He pushed away the cup in front of him.' },
  ],
  '退': [
    { cn: '他退了一步。', en: 'He took a step back.' },
    { cn: '这个东西可以退吗？', en: 'Can this be returned?' },
    { cn: '洪水已经退了。', en: 'The floodwaters have receded.' },
  ],
  '退出': [
    { cn: '他退出了比赛。', en: 'He withdrew from the competition.' },
    { cn: '请退出程序。', en: 'Please quit the program.' },
    { cn: '她决定退出这个组织。', en: 'She decided to withdraw from this organization.' },
  ],
  '退休': [
    { cn: '他明年退休。', en: 'He retires next year.' },
    { cn: '退休以后他打算去旅行。', en: 'After retirement, he plans to travel.' },
    { cn: '她已经到了退休年龄。', en: 'She has reached retirement age.' },
  ],
  '外交': [
    { cn: '他从事外交工作。', en: 'He is engaged in diplomatic work.' },
    { cn: '两国建立了外交关系。', en: 'The two countries established diplomatic relations.' },
    { cn: '外交政策很重要。', en: 'Foreign policy is very important.' },
  ],
  '外面': [
    { cn: '外面在下雨。', en: 'It\'s raining outside.' },
    { cn: '孩子们在外面玩。', en: 'The children are playing outside.' },
    { cn: '外面的温度很低。', en: 'The temperature outside is very low.' },
  ],
  '外文': [
    { cn: '他会说好几种外文。', en: 'He can speak several foreign languages.' },
    { cn: '外文书店在前面。', en: 'The foreign language bookstore is ahead.' },
    { cn: '学外文需要多练习。', en: 'Learning a foreign language requires a lot of practice.' },
  ],
  '完美': [
    { cn: '他的表演很完美。', en: 'His performance was perfect.' },
    { cn: '没有人是完美的。', en: 'No one is perfect.' },
    { cn: '这是一个完美的计划。', en: 'This is a perfect plan.' },
  ],
  '完善': [
    { cn: '制度需要进一步完善。', en: 'The system needs further improvement.' },
    { cn: '公司正在完善管理体系。', en: 'The company is improving its management system.' },
    { cn: '这个方案已经很完善了。', en: 'This plan is already very well-developed.' },
  ],
  '完整': [
    { cn: '请提交完整的材料。', en: 'Please submit complete materials.' },
    { cn: '这套书很完整。', en: 'This set of books is complete.' },
    { cn: '他讲了一个完整的故事。', en: 'He told a complete story.' },
  ],
  '玩具': [
    { cn: '孩子们喜欢玩玩具。', en: 'Children like to play with toys.' },
    { cn: '他给儿子买了一个新玩具。', en: 'He bought his son a new toy.' },
    { cn: '玩具店在二楼。', en: 'The toy store is on the second floor.' },
  ],
  '往往': [
    { cn: '成功往往需要耐心。', en: 'Success often requires patience.' },
    { cn: '他往往很晚才回家。', en: 'He often comes home very late.' },
    { cn: '事情往往不像想象的那么简单。', en: 'Things are often not as simple as imagined.' },
  ],
  '危害': [
    { cn: '吸烟危害健康。', en: 'Smoking is harmful to health.' },
    { cn: '污染对环境造成了危害。', en: 'Pollution has caused harm to the environment.' },
    { cn: '这种行为危害了公共安全。', en: 'This behavior endangered public safety.' },
  ],
  '危险': [
    { cn: '这里很危险。', en: 'It\'s very dangerous here.' },
    { cn: '不要做危险的事。', en: 'Don\'t do dangerous things.' },
    { cn: '病人已经脱离了危险。', en: 'The patient is out of danger.' },
  ],
  '围': [
    { cn: '孩子们围着老师坐。', en: 'The children sat around the teacher.' },
    { cn: '他围着操场跑了三圈。', en: 'He ran three laps around the playground.' },
    { cn: '她围了一条围巾。', en: 'She wore a scarf.' },
  ],
  '伟大': [
    { cn: '他是一位伟大的科学家。', en: 'He is a great scientist.' },
    { cn: '母爱是伟大的。', en: 'A mother\'s love is great.' },
    { cn: '这是一项伟大的工程。', en: 'This is a great project.' },
  ],
  '卫生': [
    { cn: '注意个人卫生。', en: 'Pay attention to personal hygiene.' },
    { cn: '这家餐厅的卫生很好。', en: 'This restaurant has good hygiene.' },
    { cn: '他在卫生部门工作。', en: 'He works in the health department.' },
  ],
  '卫生间': [
    { cn: '卫生间在哪里？', en: 'Where is the bathroom?' },
    { cn: '卫生间很干净。', en: 'The bathroom is very clean.' },
    { cn: '这间房有独立的卫生间。', en: 'This room has its own bathroom.' },
  ],
  '为了': [
    { cn: '为了健康，要多运动。', en: 'For the sake of health, exercise more.' },
    { cn: '他为了家人努力工作。', en: 'He works hard for his family.' },
    { cn: '为了考试我复习了一整天。', en: 'I reviewed all day for the exam.' },
  ],
  '温暖': [
    { cn: '春天的阳光很温暖。', en: 'The spring sunshine is very warm.' },
    { cn: '他的话让人感到温暖。', en: 'His words made people feel warm.' },
    { cn: '这个地方冬天也很温暖。', en: 'This place is warm even in winter.' },
  ],
  '文化': [
    { cn: '中国文化历史悠久。', en: 'Chinese culture has a long history.' },
    { cn: '文化交流促进了理解。', en: 'Cultural exchange promotes understanding.' },
    { cn: '他对中国文化很感兴趣。', en: 'He is very interested in Chinese culture.' },
  ],
  '文件': [
    { cn: '请把文件发给我。', en: 'Please send me the file.' },
    { cn: '这份文件很重要。', en: 'This document is very important.' },
    { cn: '文件已经签好了。', en: 'The document has been signed.' },
  ],
  '文明': [
    { cn: '中华文明是世界上最古老的文明之一。', en: 'Chinese civilization is one of the oldest in the world.' },
    { cn: '要做一个文明的人。', en: 'Be a civilized person.' },
    { cn: '文明驾驶很重要。', en: 'Civilized driving is important.' },
  ],
  '文学': [
    { cn: '他喜欢中国文学。', en: 'He likes Chinese literature.' },
    { cn: '她学的是英国文学。', en: 'She studies English literature.' },
    { cn: '文学作品反映了社会。', en: 'Literary works reflect society.' },
  ],
  '文章': [
    { cn: '他写了一篇很好的文章。', en: 'He wrote a very good article.' },
    { cn: '这篇文章发表在报纸上。', en: 'This article was published in the newspaper.' },
    { cn: '请认真阅读这篇文章。', en: 'Please read this article carefully.' },
  ],
  '文字': [
    { cn: '中国文字很复杂。', en: 'Chinese characters are very complex.' },
    { cn: '文字是记录语言的工具。', en: 'Writing is a tool for recording language.' },
    { cn: '他的文字功底很好。', en: 'He has a strong foundation in writing.' },
  ],
  '握手': [
    { cn: '他们握手表示友好。', en: 'They shook hands to show friendliness.' },
    { cn: '两位领导人握手了。', en: 'The two leaders shook hands.' },
    { cn: '见面时通常要握手。', en: 'It\'s customary to shake hands when meeting.' },
  ],
  '屋子': [
    { cn: '屋子里很暖和。', en: 'The room is very warm.' },
    { cn: '他打扫了屋子。', en: 'He cleaned the room.' },
    { cn: '屋子虽然小，但很干净。', en: 'The room is small but very clean.' },
  ],
  '武器': [
    { cn: '知识是最好的武器。', en: 'Knowledge is the best weapon.' },
    { cn: '不允许携带武器。', en: 'Weapons are not allowed.' },
    { cn: '古代的武器有刀和剑。', en: 'Ancient weapons included knives and swords.' },
  ],
  '武术': [
    { cn: '中国武术历史悠久。', en: 'Chinese martial arts have a long history.' },
    { cn: '他从小就练武术。', en: 'He has practiced martial arts since childhood.' },
    { cn: '武术是中国的传统运动。', en: 'Martial arts are a traditional Chinese sport.' },
  ],
  '舞台': [
    { cn: '她站在舞台上唱歌。', en: 'She stood on the stage singing.' },
    { cn: '舞台上灯光闪耀。', en: 'The lights on stage are shining.' },
    { cn: '人生就是一个大舞台。', en: 'Life is a big stage.' },
  ],
  '希望': [
    { cn: '我希望你能来。', en: 'I hope you can come.' },
    { cn: '不要放弃希望。', en: 'Don\'t give up hope.' },
    { cn: '她对未来充满了希望。', en: 'She is full of hope for the future.' },
  ],
  '系': [
    { cn: '他在中文系学习。', en: 'He studies in the Chinese department.' },
    { cn: '这件事跟他有关系。', en: 'This matter is related to him.' },
    { cn: '请系好安全带。', en: 'Please fasten your seat belt.' },
  ],
  '西部': [
    { cn: '中国西部地区面积很大。', en: 'The western region of China has a large area.' },
    { cn: '西部开发是国家战略。', en: 'Western development is a national strategy.' },
    { cn: '他去了中国西部旅游。', en: 'He went to western China for tourism.' },
  ],
  '下来': [
    { cn: '你下来吧。', en: 'Come down.' },
    { cn: '他从楼上走下来了。', en: 'He walked down from upstairs.' },
    { cn: '把名字记下来。', en: 'Write down the name.' },
  ],
  '下面': [
    { cn: '下面请看第二张图。', en: 'Next, please look at the second picture.' },
    { cn: '桌子下面有一只猫。', en: 'There is a cat under the table.' },
    { cn: '下面我来回答大家的问题。', en: 'Next I will answer everyone\'s questions.' },
  ],
  '下去': [
    { cn: '这样下去不是办法。', en: 'It won\'t work to continue like this.' },
    { cn: '他走了下去。', en: 'He went down.' },
    { cn: '坚持下去就会成功。', en: 'If you keep going, you will succeed.' },
  ],
  '先进': [
    { cn: '这项技术很先进。', en: 'This technology is very advanced.' },
    { cn: '他被评为先进工作者。', en: 'He was named an advanced worker.' },
    { cn: '先进的设备提高了效率。', en: 'Advanced equipment improved efficiency.' },
  ],
  '显得': [
    { cn: '她穿这件衣服显得很漂亮。', en: 'She looks very pretty in this outfit.' },
    { cn: '他今天显得很高兴。', en: 'He seems very happy today.' },
    { cn: '房间显得很宽敞。', en: 'The room appears very spacious.' },
  ],
  '显然': [
    { cn: '显然他说的不对。', en: 'Obviously what he said is wrong.' },
    { cn: '这显然是个误会。', en: 'This is obviously a misunderstanding.' },
    { cn: '他显然很生气。', en: 'He is obviously very angry.' },
  ],
  '显示': [
    { cn: '数据显示经济在增长。', en: 'The data shows that the economy is growing.' },
    { cn: '屏幕上显示了结果。', en: 'The results were displayed on the screen.' },
    { cn: '这显示了他的能力。', en: 'This demonstrates his ability.' },
  ],
  '现场': [
    { cn: '记者赶到了现场。', en: 'The journalist rushed to the scene.' },
    { cn: '现场有很多观众。', en: 'There were many spectators at the scene.' },
    { cn: '我们进行了现场直播。', en: 'We conducted a live broadcast on site.' },
  ],
  '现代': [
    { cn: '现代社会变化很快。', en: 'Modern society changes very quickly.' },
    { cn: '他是一位现代作家。', en: 'He is a modern writer.' },
    { cn: '现代科技改变了生活。', en: 'Modern technology has changed life.' },
  ],
  '现代化': [
    { cn: '国家在推进现代化建设。', en: 'The country is promoting modernization.' },
    { cn: '农业现代化是重要目标。', en: 'Agricultural modernization is an important goal.' },
    { cn: '这座城市非常现代化。', en: 'This city is very modernized.' },
  ],
  '现金': [
    { cn: '你可以用现金支付。', en: 'You can pay in cash.' },
    { cn: '他身上没有现金。', en: 'He doesn\'t have cash on him.' },
    { cn: '现在很少有人用现金了。', en: 'Very few people use cash now.' },
  ],
  '现实': [
    { cn: '要面对现实。', en: 'Face reality.' },
    { cn: '现实和理想之间有差距。', en: 'There is a gap between reality and ideals.' },
    { cn: '他是一个很现实的人。', en: 'He is a very practical person.' },
  ],
  '现象': [
    { cn: '这是一种普遍现象。', en: 'This is a common phenomenon.' },
    { cn: '自然现象很有趣。', en: 'Natural phenomena are very interesting.' },
    { cn: '这种现象值得研究。', en: 'This phenomenon is worth studying.' },
  ],
  '线': [
    { cn: '请在线后面排队。', en: 'Please line up behind the line.' },
    { cn: '他沿着这条线走。', en: 'He walked along this line.' },
    { cn: '电话线断了。', en: 'The phone line was cut off.' },
  ],
  '相比': [
    { cn: '和去年相比，今年进步了很多。', en: 'Compared with last year, there has been a lot of progress this year.' },
    { cn: '两者相比，这个更好。', en: 'Comparing the two, this one is better.' },
    { cn: '相比之下，她的方案更合理。', en: 'By comparison, her plan is more reasonable.' },
  ],
  '相当': [
    { cn: '他的中文水平相当高。', en: 'His Chinese level is quite high.' },
    { cn: '这件事相当重要。', en: 'This matter is quite important.' },
    { cn: '两个人的能力相当。', en: 'The two people\'s abilities are equivalent.' },
  ],
  '相关': [
    { cn: '这两件事是相关的。', en: 'These two matters are related.' },
    { cn: '请提供相关的资料。', en: 'Please provide relevant information.' },
    { cn: '相关部门正在处理。', en: 'The relevant departments are handling it.' },
  ],
  '相互': [
    { cn: '同学之间要相互帮助。', en: 'Classmates should help each other.' },
    { cn: '两国相互信任。', en: 'The two countries trust each other.' },
    { cn: '我们要相互学习。', en: 'We should learn from each other.' },
  ],
  '相似': [
    { cn: '他们两个长得很相似。', en: 'The two of them look very similar.' },
    { cn: '这两种文化有相似之处。', en: 'These two cultures have similarities.' },
    { cn: '情况和上次很相似。', en: 'The situation is very similar to last time.' },
  ],
  '香': [
    { cn: '花很香。', en: 'The flowers smell nice.' },
    { cn: '这道菜真香。', en: 'This dish smells really good.' },
    { cn: '他睡得很香。', en: 'He slept soundly.' },
  ],
  '香蕉': [
    { cn: '我喜欢吃香蕉。', en: 'I like to eat bananas.' },
    { cn: '香蕉富含钾元素。', en: 'Bananas are rich in potassium.' },
    { cn: '这些香蕉还没熟。', en: 'These bananas are not ripe yet.' },
  ],
  '消费': [
    { cn: '消费水平在提高。', en: 'The consumption level is rising.' },
    { cn: '他在这里消费了五百元。', en: 'He spent five hundred yuan here.' },
    { cn: '理性消费很重要。', en: 'Rational consumption is important.' },
  ],
  '消失': [
    { cn: '他突然消失了。', en: 'He suddenly disappeared.' },
    { cn: '声音渐渐消失了。', en: 'The sound gradually faded away.' },
    { cn: '很多动物正在消失。', en: 'Many animals are disappearing.' },
  ],
  '消息': [
    { cn: '你有什么消息吗？', en: 'Do you have any news?' },
    { cn: '这是一个好消息。', en: 'This is good news.' },
    { cn: '他还没有收到消息。', en: 'He hasn\'t received the message yet.' },
  ],
  '效果': [
    { cn: '效果非常好。', en: 'The effect is very good.' },
    { cn: '这种药的效果怎么样？', en: 'How effective is this medicine?' },
    { cn: '学习的效果取决于方法。', en: 'The effectiveness of learning depends on the method.' },
  ],
  '写作': [
    { cn: '写作是他的爱好。', en: 'Writing is his hobby.' },
    { cn: '她在大学学习写作。', en: 'She studies writing in college.' },
    { cn: '写作需要灵感和练习。', en: 'Writing requires inspiration and practice.' },
  ],
  '心': [
    { cn: '他的心很善良。', en: 'He has a kind heart.' },
    { cn: '我心里很高兴。', en: 'I feel very happy in my heart.' },
    { cn: '放心吧，没问题的。', en: 'Don\'t worry, there\'s no problem.' },
  ],
  '信封': [
    { cn: '他把信放进了信封。', en: 'He put the letter in the envelope.' },
    { cn: '信封上写着地址。', en: 'The address is written on the envelope.' },
    { cn: '请给我一个信封。', en: 'Please give me an envelope.' },
  ],
  '信任': [
    { cn: '我完全信任你。', en: 'I completely trust you.' },
    { cn: '信任是合作的基础。', en: 'Trust is the foundation of cooperation.' },
    { cn: '他赢得了大家的信任。', en: 'He earned everyone\'s trust.' },
  ],
  '行李': [
    { cn: '请带好你的行李。', en: 'Please take your luggage.' },
    { cn: '行李太多了。', en: 'There is too much luggage.' },
    { cn: '他把行李放在了车上。', en: 'He put the luggage in the car.' },
  ],
  '形成': [
    { cn: '好习惯需要慢慢形成。', en: 'Good habits need to form gradually.' },
    { cn: '已经形成了统一意见。', en: 'A consensus has been formed.' },
    { cn: '这座山是火山活动形成的。', en: 'This mountain was formed by volcanic activity.' },
  ],
  '形式': [
    { cn: '活动的形式很多样。', en: 'The activity takes many forms.' },
    { cn: '不要只注重形式。', en: 'Don\'t focus only on formalities.' },
    { cn: '教学形式需要创新。', en: 'Teaching methods need innovation.' },
  ],
  '形象': [
    { cn: '他的形象很好。', en: 'He has a good image.' },
    { cn: '这个角色的形象很生动。', en: 'The image of this character is very vivid.' },
    { cn: '公司很注重形象。', en: 'The company pays great attention to its image.' },
  ],
  '形状': [
    { cn: '这块石头的形状很特别。', en: 'The shape of this stone is very unique.' },
    { cn: '各种各样的形状。', en: 'All kinds of shapes.' },
    { cn: '请描述一下它的形状。', en: 'Please describe its shape.' },
  ],
  '幸福': [
    { cn: '他们过着幸福的生活。', en: 'They live a happy life.' },
    { cn: '幸福是什么？', en: 'What is happiness?' },
    { cn: '祝你们幸福！', en: 'Wish you happiness!' },
  ],
  '幸运': [
    { cn: '他很幸运。', en: 'He is very lucky.' },
    { cn: '幸运的是没有人受伤。', en: 'Fortunately, no one was injured.' },
    { cn: '祝你好运！', en: 'Good luck to you!' },
  ],
  '性': [
    { cn: '他的性格很好。', en: 'He has a good character.' },
    { cn: '这个问题的重要性不言而喻。', en: 'The importance of this issue goes without saying.' },
    { cn: '安全性是第一位的。', en: 'Safety is the top priority.' },
  ],
  '性别': [
    { cn: '性别歧视是不对的。', en: 'Gender discrimination is wrong.' },
    { cn: '不分性别，人人平等。', en: 'Regardless of gender, everyone is equal.' },
    { cn: '请填写你的性别。', en: 'Please fill in your gender.' },
  ],
  '性格': [
    { cn: '她的性格很开朗。', en: 'She has an outgoing personality.' },
    { cn: '每个人的性格都不同。', en: 'Everyone\'s personality is different.' },
    { cn: '性格决定命运。', en: 'Character determines destiny.' },
  ],
  '修': [
    { cn: '他在修自行车。', en: 'He is repairing a bicycle.' },
    { cn: '这条路需要修一修。', en: 'This road needs to be repaired.' },
    { cn: '他把房子修了一下。', en: 'He fixed up the house.' },
  ],
  '修改': [
    { cn: '请修改一下这篇文章。', en: 'Please revise this article.' },
    { cn: '计划需要修改。', en: 'The plan needs to be revised.' },
    { cn: '他修改了好几次才满意。', en: 'He revised it several times before he was satisfied.' },
  ],
  '需求': [
    { cn: '市场的需求在增加。', en: 'Market demand is increasing.' },
    { cn: '满足客户的需求。', en: 'Meet customer requirements.' },
    { cn: '这种产品的需求量很大。', en: 'The demand for this product is very large.' },
  ],
  '需要': [
    { cn: '我需要你的帮助。', en: 'I need your help.' },
    { cn: '不需要担心。', en: 'No need to worry.' },
    { cn: '这件事需要时间。', en: 'This matter needs time.' },
  ],
  '宣布': [
    { cn: '总统宣布了新政策。', en: 'The president announced the new policy.' },
    { cn: '他宣布退休。', en: 'He announced his retirement.' },
    { cn: '比赛结果已经宣布了。', en: 'The competition results have been announced.' },
  ],
  '宣传': [
    { cn: '我们要加强宣传。', en: 'We need to strengthen publicity.' },
    { cn: '这是一次很好的宣传活动。', en: 'This is a very good publicity campaign.' },
    { cn: '他负责公司的宣传工作。', en: 'He is in charge of the company\'s publicity work.' },
  ],
  '选手': [
    { cn: '他是一名优秀的选手。', en: 'He is an excellent contestant.' },
    { cn: '各国选手都很厉害。', en: 'Contestants from all countries are very impressive.' },
    { cn: '选手们正在做准备。', en: 'The contestants are preparing.' },
  ],
  '学费': [
    { cn: '大学的学费不便宜。', en: 'University tuition is not cheap.' },
    { cn: '他的学费是父母付的。', en: 'His tuition is paid by his parents.' },
    { cn: '学费涨了不少。', en: 'Tuition has gone up quite a bit.' },
  ],
  '血': [
    { cn: '他的手指流血了。', en: 'His finger is bleeding.' },
    { cn: '献血可以救人。', en: 'Donating blood can save lives.' },
    { cn: '血的颜色是红色的。', en: 'The color of blood is red.' },
  ],
  '训练': [
    { cn: '运动员每天都要训练。', en: 'Athletes need to train every day.' },
    { cn: '经过训练，他进步了很多。', en: 'After training, he improved a lot.' },
    { cn: '训练的时间是早上六点。', en: 'Training time is at six in the morning.' },
  ],
  '压': [
    { cn: '不要压在上面。', en: 'Don\'t press on top of it.' },
    { cn: '书把花压扁了。', en: 'The book flattened the flower.' },
    { cn: '他压住了心里的怒气。', en: 'He suppressed the anger in his heart.' },
  ],
  '压力': [
    { cn: '工作压力很大。', en: 'Work pressure is very high.' },
    { cn: '他承受着很大的压力。', en: 'He is under a lot of pressure.' },
    { cn: '适当的压力有好处。', en: 'A moderate amount of pressure is beneficial.' },
  ],
  '烟': [
    { cn: '他不抽烟。', en: 'He doesn\'t smoke.' },
    { cn: '厨房里冒出了烟。', en: 'Smoke came from the kitchen.' },
    { cn: '烟对健康有害。', en: 'Smoking is harmful to health.' },
  ],
  '眼前': [
    { cn: '眼前的困难是暂时的。', en: 'The difficulties before us are temporary.' },
    { cn: '美丽的景色展现在眼前。', en: 'Beautiful scenery unfolded before our eyes.' },
    { cn: '不要只看眼前的利益。', en: 'Don\'t just focus on immediate benefits.' },
  ],
  '演': [
    { cn: '他演了一部新电影。', en: 'He acted in a new movie.' },
    { cn: '这个角色谁来演？', en: 'Who will play this role?' },
    { cn: '她演得非常好。', en: 'She performed very well.' },
  ],
  '演唱': [
    { cn: '她在晚会上演唱了一首歌。', en: 'She sang a song at the party.' },
    { cn: '他的演唱感动了观众。', en: 'His singing moved the audience.' },
    { cn: '演唱会就要开始了。', en: 'The concert is about to begin.' },
  ],
  '演唱会': [
    { cn: '我买了演唱会的票。', en: 'I bought tickets for the concert.' },
    { cn: '演唱会非常精彩。', en: 'The concert was wonderful.' },
    { cn: '他举办了一场个人演唱会。', en: 'He held a solo concert.' },
  ],
  '演出': [
    { cn: '今天的演出非常成功。', en: 'Today\'s performance was very successful.' },
    { cn: '演出从八点开始。', en: 'The performance starts at eight o\'clock.' },
    { cn: '他们到各地去演出。', en: 'They go on tour to perform in various places.' },
  ],
  '演员': [
    { cn: '她是一名优秀的演员。', en: 'She is an excellent actress.' },
    { cn: '这部电影的演员都很有名。', en: 'All the actors in this movie are famous.' },
    { cn: '他想当演员。', en: 'He wants to be an actor.' },
  ],
  '羊': [
    { cn: '山坡上有一群羊。', en: 'There is a flock of sheep on the hillside.' },
    { cn: '羊肉串很好吃。', en: 'Lamb skewers are very delicious.' },
    { cn: '他养了很多羊。', en: 'He raises many sheep.' },
  ],
  '阳光': [
    { cn: '今天阳光很好。', en: 'The sunshine is very nice today.' },
    { cn: '阳光照在身上很舒服。', en: 'The sunlight feels nice on the body.' },
    { cn: '他是一个阳光的男孩。', en: 'He is an upbeat boy.' },
  ],
  '要是': [
    { cn: '要是明天下雨，我们就不去了。', en: 'If it rains tomorrow, we won\'t go.' },
    { cn: '要是你有时间，来我家吧。', en: 'If you have time, come to my place.' },
    { cn: '要是早知道就好了。', en: 'If only I had known earlier.' },
  ],
  '一方面': [
    { cn: '一方面要工作，一方面要照顾家庭。', en: 'On one hand we need to work, on the other hand we need to take care of the family.' },
    { cn: '一方面是压力，另一方面是动力。', en: 'On one hand it\'s pressure, on the other hand it\'s motivation.' },
    { cn: '一方面他很聪明。', en: 'On one hand, he is very smart.' },
  ],
  '一切': [
    { cn: '一切都会好的。', en: 'Everything will be fine.' },
    { cn: '他把一切都准备好了。', en: 'He prepared everything.' },
    { cn: '一切顺利吗？', en: 'Is everything going smoothly?' },
  ],
  '衣架': [
    { cn: '请把衣服挂在衣架上。', en: 'Please hang the clothes on the hanger.' },
    { cn: '衣架上挂着一件外套。', en: 'A coat is hanging on the hanger.' },
    { cn: '她买了几个新衣架。', en: 'She bought a few new hangers.' },
  ],
  '已': [
    { cn: '他已经走了。', en: 'He has already left.' },
    { cn: '事情已成事实。', en: 'The matter is already a fact.' },
    { cn: '已是深夜了。', en: 'It is already late at night.' },
  ],
  '以来': [
    { cn: '开学以来他一直很努力。', en: 'He has been working hard since the start of school.' },
    { cn: '自古以来就是如此。', en: 'It has been so since ancient times.' },
    { cn: '来中国以来，他学了很多。', en: 'Since coming to China, he has learned a lot.' },
  ],
  '艺术': [
    { cn: '他热爱艺术。', en: 'He loves art.' },
    { cn: '艺术可以陶冶情操。', en: 'Art can cultivate one\'s character.' },
    { cn: '这是一件艺术品。', en: 'This is a work of art.' },
  ],
  '意外': [
    { cn: '这件事完全是意外。', en: 'This was completely unexpected.' },
    { cn: '意外时有发生。', en: 'Accidents happen from time to time.' },
    { cn: '结果出乎意外。', en: 'The result was unexpected.' },
  ],
  '意义': [
    { cn: '这件事很有意义。', en: 'This matter is very meaningful.' },
    { cn: '生命的意义是什么？', en: 'What is the meaning of life?' },
    { cn: '教育具有重大意义。', en: 'Education has great significance.' },
  ],
  '因此': [
    { cn: '他生病了，因此没来上课。', en: 'He was sick, so he didn\'t come to class.' },
    { cn: '天气不好，因此航班取消了。', en: 'The weather was bad, therefore the flight was canceled.' },
    { cn: '我们应该因此更加努力。', en: 'We should therefore work even harder.' },
  ],
  '银': [
    { cn: '这条项链是银的。', en: 'This necklace is silver.' },
    { cn: '银行在前面。', en: 'The bank is ahead.' },
    { cn: '银色的月光很美。', en: 'The silver moonlight is very beautiful.' },
  ],
  '银牌': [
    { cn: '她获得了银牌。', en: 'She won the silver medal.' },
    { cn: '银牌也是很好的成绩。', en: 'A silver medal is also a great achievement.' },
    { cn: '他在比赛中拿了银牌。', en: 'He won the silver medal in the competition.' },
  ],
  '印象': [
    { cn: '他给我留下了很好的印象。', en: 'He left a very good impression on me.' },
    { cn: '我对这个地方印象很深。', en: 'I have a deep impression of this place.' },
    { cn: '第一印象很重要。', en: 'First impressions are very important.' },
  ],
  '应当': [
    { cn: '我们应当遵守法律。', en: 'We should obey the law.' },
    { cn: '应当尊重每一个人。', en: 'We ought to respect everyone.' },
    { cn: '你应当早点休息。', en: 'You should rest earlier.' },
  ],
  '应用': [
    { cn: '这项技术被广泛应用。', en: 'This technology is widely applied.' },
    { cn: '他在手机上下载了一个应用。', en: 'He downloaded an app on his phone.' },
    { cn: '理论要应用到实际中去。', en: 'Theory should be applied to practice.' },
  ],
  '迎接': [
    { cn: '大家去机场迎接客人。', en: 'Everyone went to the airport to welcome the guests.' },
    { cn: '让我们迎接新的一年。', en: 'Let us welcome the new year.' },
    { cn: '他们热情地迎接了我们。', en: 'They welcomed us warmly.' },
  ],
  '营养': [
    { cn: '水果的营养很丰富。', en: 'Fruits are very nutritious.' },
    { cn: '孩子需要均衡的营养。', en: 'Children need balanced nutrition.' },
    { cn: '这道菜既好吃又有营养。', en: 'This dish is both delicious and nutritious.' },
  ],
  '赢': [
    { cn: '我们赢了！', en: 'We won!' },
    { cn: '他赢了比赛。', en: 'He won the match.' },
    { cn: '想赢就要努力。', en: 'If you want to win, you have to work hard.' },
  ],
  '影视': [
    { cn: '他在影视行业工作。', en: 'He works in the film and television industry.' },
    { cn: '影视作品反映了社会现实。', en: 'Film and TV works reflect social reality.' },
    { cn: '这座城市是影视拍摄基地。', en: 'This city is a film and TV shooting location.' },
  ],
  '优点': [
    { cn: '每个人都有自己的优点。', en: 'Everyone has their own merits.' },
    { cn: '他的优点是勤奋。', en: 'His strength is diligence.' },
    { cn: '要多看别人的优点。', en: 'Focus more on other people\'s strengths.' },
  ],
  '优势': [
    { cn: '他有语言优势。', en: 'He has a language advantage.' },
    { cn: '发挥自己的优势。', en: 'Play to your own strengths.' },
    { cn: '我们的产品有很大优势。', en: 'Our products have a great advantage.' },
  ],
  '由': [
    { cn: '这个项目由他负责。', en: 'This project is handled by him.' },
    { cn: '活动由学校组织。', en: 'The activity is organized by the school.' },
    { cn: '由于天气原因，航班延误了。', en: 'Due to weather, the flight was delayed.' },
  ],
  '由于': [
    { cn: '由于下雨，比赛取消了。', en: 'Due to rain, the match was canceled.' },
    { cn: '由于工作太忙，他没时间休息。', en: 'Because of being too busy with work, he had no time to rest.' },
    { cn: '由于经验不足，他犯了错。', en: 'Due to lack of experience, he made a mistake.' },
  ],
  '邮件': [
    { cn: '我收到了一封邮件。', en: 'I received an email.' },
    { cn: '请查收邮件。', en: 'Please check your email.' },
    { cn: '他每天都会回复邮件。', en: 'He replies to emails every day.' },
  ],
  '邮票': [
    { cn: '他喜欢收集邮票。', en: 'He likes to collect stamps.' },
    { cn: '你需要贴一张邮票。', en: 'You need to put a stamp on it.' },
    { cn: '这枚邮票很珍贵。', en: 'This stamp is very valuable.' },
  ],
  '邮箱': [
    { cn: '请把文件发到我的邮箱。', en: 'Please send the file to my email.' },
    { cn: '你的邮箱地址是什么？', en: 'What is your email address?' },
    { cn: '我每天都会检查邮箱。', en: 'I check my email every day.' },
  ],
  '游': [
    { cn: '鱼在水里游。', en: 'Fish swim in the water.' },
    { cn: '他去三峡游了一趟。', en: 'He went on a trip to the Three Gorges.' },
    { cn: '我们明天去游长城。', en: 'We are going to tour the Great Wall tomorrow.' },
  ],
  '游戏': [
    { cn: '孩子们在玩游戏。', en: 'The children are playing games.' },
    { cn: '他喜欢玩电脑游戏。', en: 'He likes to play computer games.' },
    { cn: '这个游戏很有趣。', en: 'This game is very fun.' },
  ],
  '游泳': [
    { cn: '他喜欢游泳。', en: 'He likes swimming.' },
    { cn: '夏天我们去游泳吧。', en: 'Let\'s go swimming in summer.' },
    { cn: '游泳是很好的运动。', en: 'Swimming is a great exercise.' },
  ],
  '有的是': [
    { cn: '时间有的是，不着急。', en: 'There\'s plenty of time, no rush.' },
    { cn: '我们有的是办法。', en: 'We have plenty of ways to do it.' },
    { cn: '钱有的是，不用担心。', en: 'There\'s plenty of money, don\'t worry.' },
  ],
  '有利': [
    { cn: '这个条件对我们有利。', en: 'This condition is favorable to us.' },
    { cn: '运动有利于健康。', en: 'Exercise is beneficial to health.' },
    { cn: '好的环境有利于学习。', en: 'A good environment is conducive to learning.' },
  ],
  '有效': [
    { cn: '这个方法很有效。', en: 'This method is very effective.' },
    { cn: '签证在三个月内有效。', en: 'The visa is valid for three months.' },
    { cn: '我们要提高工作的有效性。', en: 'We should improve the effectiveness of our work.' },
  ],
  '预报': [
    { cn: '天气预报说明天会下雨。', en: 'The weather forecast says it will rain tomorrow.' },
    { cn: '预报很准确。', en: 'The forecast is very accurate.' },
    { cn: '请注意天气预报。', en: 'Please pay attention to the weather forecast.' },
  ],
  '预防': [
    { cn: '预防疾病很重要。', en: 'Disease prevention is very important.' },
    { cn: '预防胜于治疗。', en: 'Prevention is better than cure.' },
    { cn: '我们要做好预防工作。', en: 'We should do a good job in prevention.' },
  ],
  '预计': [
    { cn: '预计明天会晴天。', en: 'It is expected to be sunny tomorrow.' },
    { cn: '预计需要三天时间。', en: 'It is estimated to take three days.' },
    { cn: '预计参加的人数超过一百。', en: 'The estimated number of participants exceeds one hundred.' },
  ],
  '预习': [
    { cn: '请预习下一课的内容。', en: 'Please preview the content of the next lesson.' },
    { cn: '预习可以提高学习效果。', en: 'Preview can improve learning outcomes.' },
    { cn: '他每天都预习功课。', en: 'He previews his lessons every day.' },
  ],
  '员': [
    { cn: '他是公司的职员。', en: 'He is a company employee.' },
    { cn: '服务员态度很好。', en: 'The waiter has a very good attitude.' },
    { cn: '团员要积极参加活动。', en: 'Members should actively participate in activities.' },
  ],
  '员工': [
    { cn: '公司有五百名员工。', en: 'The company has five hundred employees.' },
    { cn: '员工们工作很努力。', en: 'The employees work very hard.' },
    { cn: '老板对员工很好。', en: 'The boss is very good to the staff.' },
  ],
  '愿望': [
    { cn: '他的愿望是当医生。', en: 'His wish is to become a doctor.' },
    { cn: '希望你的愿望能实现。', en: 'I hope your wish can come true.' },
    { cn: '她许了一个愿望。', en: 'She made a wish.' },
  ],
  '约': [
    { cn: '我和朋友约好了见面。', en: 'I made an appointment to meet my friend.' },
    { cn: '大约需要一个小时。', en: 'It takes approximately one hour.' },
    { cn: '他约我明天吃饭。', en: 'He invited me to dinner tomorrow.' },
  ],
  '运输': [
    { cn: '货物正在运输中。', en: 'The goods are being transported.' },
    { cn: '运输成本越来越高。', en: 'Transportation costs are getting higher.' },
    { cn: '他在一家运输公司工作。', en: 'He works at a transportation company.' },
  ],
  '杂志': [
    { cn: '她每月都买杂志。', en: 'She buys magazines every month.' },
    { cn: '这本杂志的内容很丰富。', en: 'The content of this magazine is very rich.' },
    { cn: '他在杂志上发表了文章。', en: 'He published an article in the magazine.' },
  ],
  '早已': [
    { cn: '我早已知道了。', en: 'I knew long ago.' },
    { cn: '他早已离开了。', en: 'He left a long time ago.' },
    { cn: '这个问题早已解决了。', en: 'This problem was resolved long ago.' },
  ],
  '造': [
    { cn: '他们正在造一座新桥。', en: 'They are building a new bridge.' },
    { cn: '这艘船是中国造的。', en: 'This ship was made in China.' },
    { cn: '不要造谣。', en: 'Don\'t spread rumors.' },
  ],
  '造成': [
    { cn: '暴雨造成了严重的损失。', en: 'Heavy rain caused serious losses.' },
    { cn: '这件事造成了很大的影响。', en: 'This matter caused a great impact.' },
    { cn: '误会造成了不必要的麻烦。', en: 'The misunderstanding caused unnecessary trouble.' },
  ],
  '责任': [
    { cn: '这是我的责任。', en: 'This is my responsibility.' },
    { cn: '每个人都要承担自己的责任。', en: 'Everyone must bear their own responsibilities.' },
    { cn: '他是一个有责任心的人。', en: 'He is a responsible person.' },
  ],
  '增加': [
    { cn: '公司的收入增加了。', en: 'The company\'s income has increased.' },
    { cn: '请增加一些人手。', en: 'Please add some more people.' },
    { cn: '运动可以增加体力。', en: 'Exercise can increase physical strength.' },
  ],
  '增长': [
    { cn: '经济保持稳定增长。', en: 'The economy maintains steady growth.' },
    { cn: '人口增长速度在放慢。', en: 'The rate of population growth is slowing down.' },
    { cn: '销售额增长了百分之二十。', en: 'Sales grew by twenty percent.' },
  ],
  '展开': [
    { cn: '他展开了地图。', en: 'He unfolded the map.' },
    { cn: '双方展开了激烈的讨论。', en: 'Both sides launched an intense discussion.' },
    { cn: '救援工作已经展开。', en: 'Rescue work has been launched.' },
  ],
  '张': [
    { cn: '给我两张纸。', en: 'Give me two sheets of paper.' },
    { cn: '桌子上有一张照片。', en: 'There is a photo on the table.' },
    { cn: '他张开了双臂。', en: 'He spread his arms wide.' },
  ],
  '长城': [
    { cn: '长城是中国的象征。', en: 'The Great Wall is a symbol of China.' },
    { cn: '不到长城非好汉。', en: 'He who has never been to the Great Wall is not a true hero.' },
    { cn: '长城有几千年的历史。', en: 'The Great Wall has thousands of years of history.' },
  ],
  '长处': [
    { cn: '每个人都有自己的长处。', en: 'Everyone has their own strengths.' },
    { cn: '要善于发现别人的长处。', en: 'Be good at discovering others\' strengths.' },
    { cn: '他的长处是耐心。', en: 'His strong point is patience.' },
  ],
  '长期': [
    { cn: '这需要长期的努力。', en: 'This requires long-term effort.' },
    { cn: '他在国外长期居住。', en: 'He lives abroad long-term.' },
    { cn: '长期坚持才能看到效果。', en: 'You can only see results through long-term persistence.' },
  ],
  '照': [
    { cn: '阳光照在窗户上。', en: 'Sunlight shines on the window.' },
    { cn: '他照了一张相。', en: 'He took a photo.' },
    { cn: '按照规定办事。', en: 'Act according to regulations.' },
  ],
  '者': [
    { cn: '作者是一位年轻人。', en: 'The author is a young person.' },
    { cn: '读者对这本书评价很高。', en: 'Readers rate this book highly.' },
    { cn: '记者报道了这件事。', en: 'The reporter covered this event.' },
  ],
  '真实': [
    { cn: '这个故事是真实的。', en: 'This story is true.' },
    { cn: '他说的都是真实的。', en: 'Everything he said is real.' },
    { cn: '真实的感受最重要。', en: 'Genuine feelings are the most important.' },
  ],
  '争': [
    { cn: '他们在争第一名。', en: 'They are competing for first place.' },
    { cn: '不要争了。', en: 'Stop arguing.' },
    { cn: '大家都在争这个机会。', en: 'Everyone is fighting for this opportunity.' },
  ],
  '争取': [
    { cn: '我们要争取更好的成绩。', en: 'We should strive for better results.' },
    { cn: '他争取到了出国的机会。', en: 'He won the opportunity to go abroad.' },
    { cn: '争取时间完成任务。', en: 'Race against time to complete the task.' },
  ],
  '整': [
    { cn: '他等了整整一天。', en: 'He waited a whole day.' },
    { cn: '把房间整一整。', en: 'Tidy up the room.' },
    { cn: '一切都很整齐。', en: 'Everything is very orderly.' },
  ],
  '整个': [
    { cn: '整个城市很安静。', en: 'The entire city is very quiet.' },
    { cn: '他花了整个下午写报告。', en: 'He spent the entire afternoon writing the report.' },
    { cn: '整个过程很顺利。', en: 'The entire process went smoothly.' },
  ],
  '整理': [
    { cn: '请整理一下你的房间。', en: 'Please tidy up your room.' },
    { cn: '他在整理资料。', en: 'He is organizing materials.' },
    { cn: '出发前要整理好行李。', en: 'Pack your luggage before departure.' },
  ],
  '整齐': [
    { cn: '书架上的书排列得很整齐。', en: 'The books on the shelf are arranged neatly.' },
    { cn: '同学们站得很整齐。', en: 'The students stood very neatly.' },
    { cn: '他的衣服总是很整齐。', en: 'His clothes are always very neat.' },
  ],
  '整体': [
    { cn: '从整体来看，效果不错。', en: 'Overall, the effect is good.' },
    { cn: '整体水平有了提高。', en: 'The overall level has improved.' },
    { cn: '我们要从整体上考虑问题。', en: 'We should consider problems from an overall perspective.' },
  ],
  '整天': [
    { cn: '他整天都在学习。', en: 'He studies all day long.' },
    { cn: '不要整天看手机。', en: 'Don\'t look at your phone all day.' },
    { cn: '她整天忙个不停。', en: 'She is busy all day long.' },
  ],
  '整整': [
    { cn: '他等了整整三个小时。', en: 'He waited for a whole three hours.' },
    { cn: '整整一年过去了。', en: 'A whole year has passed.' },
    { cn: '我在那里住了整整两年。', en: 'I lived there for a full two years.' },
  ],
  '正式': [
    { cn: '这是一个正式的场合。', en: 'This is a formal occasion.' },
    { cn: '合同已经正式签署了。', en: 'The contract has been officially signed.' },
    { cn: '他正式加入了公司。', en: 'He officially joined the company.' },
  ],
  '证': [
    { cn: '你有证吗？', en: 'Do you have an ID?' },
    { cn: '他拿出了工作证。', en: 'He took out his work permit.' },
    { cn: '事实可以证明一切。', en: 'Facts can prove everything.' },
  ],
  '证件': [
    { cn: '请出示你的证件。', en: 'Please show your identification documents.' },
    { cn: '证件带了吗？', en: 'Did you bring your ID?' },
    { cn: '所有证件都要保管好。', en: 'All documents should be kept safe.' },
  ],
  '证据': [
    { cn: '警察找到了证据。', en: 'The police found evidence.' },
    { cn: '没有证据不能下结论。', en: 'You can\'t draw conclusions without evidence.' },
    { cn: '证据确凿。', en: 'The evidence is conclusive.' },
  ],
  '证明': [
    { cn: '事实证明他是对的。', en: 'Facts proved he was right.' },
    { cn: '请提供一份证明。', en: 'Please provide a certificate.' },
    { cn: '他用行动证明了自己。', en: 'He proved himself through actions.' },
  ],
  '支': [
    { cn: '给我一支笔。', en: 'Give me a pen.' },
    { cn: '他买了一支新铅笔。', en: 'He bought a new pencil.' },
    { cn: '这支队伍很强大。', en: 'This team is very strong.' },
  ],
  '支持': [
    { cn: '我支持你的决定。', en: 'I support your decision.' },
    { cn: '谢谢大家的支持。', en: 'Thank you all for your support.' },
    { cn: '他得到了家人的支持。', en: 'He received support from his family.' },
  ],
  '支付': [
    { cn: '你可以用手机支付。', en: 'You can pay with your phone.' },
    { cn: '请支付一百元。', en: 'Please pay one hundred yuan.' },
    { cn: '费用由公司支付。', en: 'The expenses are paid by the company.' },
  ],
  '直': [
    { cn: '这条路很直。', en: 'This road is very straight.' },
    { cn: '他一直往前走。', en: 'He kept walking straight ahead.' },
    { cn: '他说话很直。', en: 'He speaks very frankly.' },
  ],
  '直播': [
    { cn: '比赛正在直播。', en: 'The match is being broadcast live.' },
    { cn: '她在网上做直播。', en: 'She is livestreaming online.' },
    { cn: '观看直播的人很多。', en: 'Many people are watching the livestream.' },
  ],
  '直到': [
    { cn: '他一直等到天黑。', en: 'He waited until dark.' },
    { cn: '直到最后我才明白。', en: 'I didn\'t understand until the very end.' },
    { cn: '直到现在他还没来。', en: 'He still hasn\'t come until now.' },
  ],
  '值': [
    { cn: '这幅画值很多钱。', en: 'This painting is worth a lot of money.' },
    { cn: '这本书值得一读。', en: 'This book is worth reading.' },
    { cn: '今天谁值班？', en: 'Who is on duty today?' },
  ],
  '值得': [
    { cn: '这部电影值得看。', en: 'This movie is worth watching.' },
    { cn: '他的经验值得学习。', en: 'His experience is worth learning from.' },
    { cn: '值得一提的是。', en: 'It is worth mentioning that...' },
  ],
  '职工': [
    { cn: '公司有两百名职工。', en: 'The company has two hundred workers.' },
    { cn: '职工的福利很好。', en: 'The employees\' benefits are very good.' },
    { cn: '职工代表大会明天召开。', en: 'The workers\' congress will be held tomorrow.' },
  ],
  '职业': [
    { cn: '你的职业是什么？', en: 'What is your occupation?' },
    { cn: '他是一名职业运动员。', en: 'He is a professional athlete.' },
    { cn: '选择职业要慎重。', en: 'Choose your career carefully.' },
  ],
  '只好': [
    { cn: '没有公共汽车了，只好走路。', en: 'There are no more buses, so I had to walk.' },
    { cn: '他只好同意了。', en: 'He had no choice but to agree.' },
    { cn: '商店关门了，只好明天再来。', en: 'The store is closed, I\'ll have to come back tomorrow.' },
  ],
  '只是': [
    { cn: '我只是随便说说。', en: 'I\'m just saying it casually.' },
    { cn: '只是有点累。', en: 'I\'m just a little tired.' },
    { cn: '他只是一个学生。', en: 'He is merely a student.' },
  ],
  '只有': [
    { cn: '只有努力才能成功。', en: 'Only through effort can you succeed.' },
    { cn: '只有他一个人来了。', en: 'Only he came.' },
    { cn: '只有坚持才有希望。', en: 'Only by persisting is there hope.' },
  ],
  '指': [
    { cn: '他用手指着地图。', en: 'He pointed at the map with his finger.' },
    { cn: '你指的是哪一个？', en: 'Which one are you referring to?' },
    { cn: '这个词指的是什么意思？', en: 'What does this word refer to?' },
  ],
  '指出': [
    { cn: '老师指出了我的错误。', en: 'The teacher pointed out my mistakes.' },
    { cn: '专家指出了问题所在。', en: 'Experts pointed out where the problem lies.' },
    { cn: '他指出这个方案有缺陷。', en: 'He pointed out that this plan has flaws.' },
  ],
  '指导': [
    { cn: '老师的指导对我帮助很大。', en: 'The teacher\'s guidance helped me a lot.' },
    { cn: '他指导学生写论文。', en: 'He guides students in writing theses.' },
    { cn: '请多多指导。', en: 'Please give me more guidance.' },
  ],
  '至今': [
    { cn: '至今他还没有回来。', en: 'He still hasn\'t come back to this day.' },
    { cn: '这座桥至今已有百年历史。', en: 'This bridge has a hundred years of history to this day.' },
    { cn: '至今我还记得那天的事。', en: 'To this day I still remember what happened that day.' },
  ],
  '至少': [
    { cn: '至少要准备三天。', en: 'You need at least three days to prepare.' },
    { cn: '至少有一百个人。', en: 'There are at least a hundred people.' },
    { cn: '至少你应该试一试。', en: 'At least you should try.' },
  ],
  '志愿': [
    { cn: '他的志愿是当医生。', en: 'His aspiration is to be a doctor.' },
    { cn: '很多人志愿参加了活动。', en: 'Many people volunteered for the activity.' },
    { cn: '填报高考志愿很重要。', en: 'Filling in college entrance exam preferences is very important.' },
  ],
  '志愿者': [
    { cn: '他是一名志愿者。', en: 'He is a volunteer.' },
    { cn: '志愿者们帮助了很多人。', en: 'The volunteers helped many people.' },
    { cn: '我想当志愿者。', en: 'I want to be a volunteer.' },
  ],
  '制定': [
    { cn: '公司制定了新的规章制度。', en: 'The company formulated new rules and regulations.' },
    { cn: '我们需要制定一个计划。', en: 'We need to draw up a plan.' },
    { cn: '政府制定了新的政策。', en: 'The government formulated new policies.' },
  ],
  '制度': [
    { cn: '公司有完善的制度。', en: 'The company has a well-developed system.' },
    { cn: '教育制度在不断改革。', en: 'The education system is constantly being reformed.' },
    { cn: '好的制度有利于发展。', en: 'A good system is conducive to development.' },
  ],
  '制造': [
    { cn: '这家工厂制造汽车。', en: 'This factory manufactures cars.' },
    { cn: '中国制造的产品质量越来越好。', en: 'The quality of made-in-China products is getting better.' },
    { cn: '他们制造了很多问题。', en: 'They created many problems.' },
  ],
  '制作': [
    { cn: '她制作了一个蛋糕。', en: 'She made a cake.' },
    { cn: '这个节目是我们制作的。', en: 'This program was made by us.' },
    { cn: '手工制作的东西很特别。', en: 'Handmade things are very special.' },
  ],
  '中部': [
    { cn: '他住在中国的中部。', en: 'He lives in the central part of China.' },
    { cn: '城市中部是商业区。', en: 'The central part of the city is a commercial district.' },
    { cn: '中部地区发展很快。', en: 'The central region is developing rapidly.' },
  ],
  '中华民族': [
    { cn: '中华民族有悠久的历史。', en: 'The Chinese nation has a long history.' },
    { cn: '中华民族是勤劳勇敢的民族。', en: 'The Chinese nation is hardworking and brave.' },
    { cn: '我们为中华民族感到骄傲。', en: 'We are proud of the Chinese nation.' },
  ],
  '终于': [
    { cn: '他终于成功了。', en: 'He finally succeeded.' },
    { cn: '雨终于停了。', en: 'The rain finally stopped.' },
    { cn: '我终于找到了答案。', en: 'I finally found the answer.' },
  ],
  '钟': [
    { cn: '墙上挂着一个钟。', en: 'A clock hangs on the wall.' },
    { cn: '现在几点钟了？', en: 'What time is it now?' },
    { cn: '再等十分钟。', en: 'Wait another ten minutes.' },
  ],
  '种': [
    { cn: '这种水果很甜。', en: 'This kind of fruit is very sweet.' },
    { cn: '有很多种方法。', en: 'There are many kinds of methods.' },
    { cn: '你喜欢哪种颜色？', en: 'Which kind of color do you like?' },
  ],
  '种子': [
    { cn: '春天要播种子。', en: 'Seeds should be sown in spring.' },
    { cn: '种子发芽了。', en: 'The seeds have sprouted.' },
    { cn: '他在花盆里种了种子。', en: 'He planted seeds in the flowerpot.' },
  ],
  '重大': [
    { cn: '这是一个重大的发现。', en: 'This is a major discovery.' },
    { cn: '公司做出了重大决定。', en: 'The company made a major decision.' },
    { cn: '今天发生了重大事件。', en: 'A major event happened today.' },
  ],
  '周围': [
    { cn: '学校周围有很多商店。', en: 'There are many shops around the school.' },
    { cn: '他看了看周围。', en: 'He looked around.' },
    { cn: '周围的环境很安静。', en: 'The surrounding environment is very quiet.' },
  ],
  '猪': [
    { cn: '农场里养了很多猪。', en: 'The farm raises many pigs.' },
    { cn: '猪肉是中国人最常吃的肉。', en: 'Pork is the meat most commonly eaten by Chinese people.' },
    { cn: '他属猪。', en: 'He was born in the year of the pig.' },
  ],
  '主持': [
    { cn: '他主持了今天的会议。', en: 'He presided over today\'s meeting.' },
    { cn: '她是这个节目的主持人。', en: 'She is the host of this program.' },
    { cn: '谁来主持这次活动？', en: 'Who will host this event?' },
  ],
  '主动': [
    { cn: '他主动帮助别人。', en: 'He takes the initiative to help others.' },
    { cn: '做事要主动。', en: 'Be proactive in doing things.' },
    { cn: '她主动向老师提问。', en: 'She took the initiative to ask the teacher questions.' },
  ],
  '主任': [
    { cn: '他是科室主任。', en: 'He is the department director.' },
    { cn: '主任同意了我们的方案。', en: 'The director agreed to our plan.' },
    { cn: '请去找主任签字。', en: 'Please go to the director for a signature.' },
  ],
  '主意': [
    { cn: '你有什么好主意？', en: 'Do you have any good ideas?' },
    { cn: '这是一个好主意。', en: 'This is a good idea.' },
    { cn: '她自己拿主意。', en: 'She makes her own decisions.' },
  ],
  '主张': [
    { cn: '他主张和平解决问题。', en: 'He advocates solving problems peacefully.' },
    { cn: '大家的主张不一样。', en: 'Everyone has different viewpoints.' },
    { cn: '我主张先讨论再决定。', en: 'I advocate discussing first before deciding.' },
  ],
  '注意': [
    { cn: '请注意安全。', en: 'Please pay attention to safety.' },
    { cn: '他没有注意到这个问题。', en: 'He didn\'t notice this problem.' },
    { cn: '注意你的言行。', en: 'Watch your words and actions.' },
  ],
  '祝': [
    { cn: '祝你生日快乐！', en: 'Happy birthday to you!' },
    { cn: '祝你一切顺利。', en: 'Wish you all the best.' },
    { cn: '祝大家新年快乐！', en: 'Wish everyone a happy New Year!' },
  ],
  '抓': [
    { cn: '猫抓了他一下。', en: 'The cat scratched him.' },
    { cn: '警察抓住了小偷。', en: 'The police caught the thief.' },
    { cn: '快抓紧时间。', en: 'Hurry up and make the most of the time.' },
  ],
  '抓住': [
    { cn: '他抓住了那根绳子。', en: 'He grabbed hold of the rope.' },
    { cn: '要抓住机会。', en: 'Seize the opportunity.' },
    { cn: '警察抓住了罪犯。', en: 'The police captured the criminal.' },
  ],
  '专家': [
    { cn: '他是一位医学专家。', en: 'He is a medical expert.' },
    { cn: '专家们进行了讨论。', en: 'The experts held a discussion.' },
    { cn: '请教一下专家的意见。', en: 'Please consult the expert\'s opinion.' },
  ],
  '专门': [
    { cn: '他专门研究中国历史。', en: 'He specializes in Chinese history.' },
    { cn: '这是专门为你准备的。', en: 'This is specially prepared for you.' },
    { cn: '我们专门开了一个会。', en: 'We held a special meeting.' },
  ],
  '专题': [
    { cn: '今天的专题是环保。', en: 'Today\'s special topic is environmental protection.' },
    { cn: '电视台播了一期专题节目。', en: 'The TV station aired a special program.' },
    { cn: '他做了一个专题报告。', en: 'He gave a special report.' },
  ],
  '专业': [
    { cn: '你学的什么专业？', en: 'What is your major?' },
    { cn: '他是一个很专业的人。', en: 'He is a very professional person.' },
    { cn: '这个问题需要专业知识。', en: 'This problem requires specialized knowledge.' },
  ],
  '转': [
    { cn: '请向右转。', en: 'Please turn right.' },
    { cn: '地球绕着太阳转。', en: 'The Earth revolves around the sun.' },
    { cn: '他把话题转了。', en: 'He changed the topic.' },
  ],
  '转变': [
    { cn: '他的态度发生了转变。', en: 'His attitude has changed.' },
    { cn: '观念的转变需要时间。', en: 'A change in mindset takes time.' },
    { cn: '公司正在转变发展方式。', en: 'The company is transforming its development approach.' },
  ],
  '状况': [
    { cn: '他的健康状况不好。', en: 'His health condition is not good.' },
    { cn: '经济状况在改善。', en: 'The economic situation is improving.' },
    { cn: '请了解一下目前的状况。', en: 'Please understand the current situation.' },
  ],
  '状态': [
    { cn: '他最近状态很好。', en: 'He has been in good form recently.' },
    { cn: '保持良好的精神状态。', en: 'Maintain a good mental state.' },
    { cn: '运动员需要调整状态。', en: 'Athletes need to adjust their condition.' },
  ],
  '追': [
    { cn: '他在追那只猫。', en: 'He is chasing that cat.' },
    { cn: '警察追上了小偷。', en: 'The police caught up with the thief.' },
    { cn: '年轻人追求梦想。', en: 'Young people pursue their dreams.' },
  ],
  '准': [
    { cn: '这块表很准。', en: 'This watch is very accurate.' },
    { cn: '他的判断很准。', en: 'His judgment is very accurate.' },
    { cn: '天气预报不太准。', en: 'The weather forecast is not very accurate.' },
  ],
  '资格': [
    { cn: '他有参加比赛的资格。', en: 'He is qualified to participate in the competition.' },
    { cn: '你没有资格说这种话。', en: 'You are not qualified to say such things.' },
    { cn: '考试合格才能取得资格。', en: 'You can only get the qualification by passing the exam.' },
  ],
  '资金': [
    { cn: '项目缺少资金。', en: 'The project lacks funds.' },
    { cn: '他投入了大量资金。', en: 'He invested a large amount of capital.' },
    { cn: '资金问题已经解决了。', en: 'The funding issue has been resolved.' },
  ],
  '自从': [
    { cn: '自从他走了以后，我很想他。', en: 'Since he left, I miss him very much.' },
    { cn: '自从来到中国，他学到了很多。', en: 'Since coming to China, he has learned a lot.' },
    { cn: '自从那次以后他再也没来过。', en: 'He has never come back since that time.' },
  ],
  '自动': [
    { cn: '门是自动的。', en: 'The door is automatic.' },
    { cn: '他自动报名参加了活动。', en: 'He voluntarily signed up for the activity.' },
    { cn: '自动售货机很方便。', en: 'Vending machines are very convenient.' },
  ],
  '自觉': [
    { cn: '学习要自觉。', en: 'Studying should be done consciously on your own initiative.' },
    { cn: '他很自觉地遵守规定。', en: 'He consciously follows the rules.' },
    { cn: '要培养自觉的习惯。', en: 'Develop the habit of self-discipline.' },
  ],
  '自然': [
    { cn: '大自然是美丽的。', en: 'Nature is beautiful.' },
    { cn: '一切顺其自然吧。', en: 'Let everything take its natural course.' },
    { cn: '他的表情很自然。', en: 'His expression is very natural.' },
  ],
  '自身': [
    { cn: '要提高自身的能力。', en: 'Improve your own abilities.' },
    { cn: '问题出在自身。', en: 'The problem lies with oneself.' },
    { cn: '他对自身要求很高。', en: 'He has high standards for himself.' },
  ],
  '自主': [
    { cn: '要培养独立自主的能力。', en: 'Cultivate the ability to be independent and autonomous.' },
    { cn: '学生应该自主学习。', en: 'Students should study independently.' },
    { cn: '自主创新很重要。', en: 'Independent innovation is very important.' },
  ],
  '子女': [
    { cn: '父母关心子女的教育。', en: 'Parents care about their children\'s education.' },
    { cn: '他有两个子女。', en: 'He has two children.' },
    { cn: '子女要孝顺父母。', en: 'Children should be filial to their parents.' },
  ],
  '总': [
    { cn: '他总是很忙。', en: 'He is always very busy.' },
    { cn: '总会有办法的。', en: 'There will always be a way.' },
    { cn: '总的来说，效果不错。', en: 'Overall, the results are good.' },
  ],
  '总结': [
    { cn: '老师做了课程总结。', en: 'The teacher gave a course summary.' },
    { cn: '请总结一下你的经验。', en: 'Please summarize your experience.' },
    { cn: '年底要做一个工作总结。', en: 'A work summary needs to be done at year-end.' },
  ],
  '总是': [
    { cn: '他总是第一个到。', en: 'He is always the first to arrive.' },
    { cn: '她总是面带微笑。', en: 'She always has a smile on her face.' },
    { cn: '问题总是出在细节上。', en: 'Problems always arise from the details.' },
  ],
  '足够': [
    { cn: '时间足够吗？', en: 'Is there enough time?' },
    { cn: '他有足够的经验。', en: 'He has enough experience.' },
    { cn: '钱足够用了。', en: 'There is enough money.' },
  ],
  '足球': [
    { cn: '他喜欢踢足球。', en: 'He likes to play soccer.' },
    { cn: '足球是世界上最受欢迎的运动。', en: 'Soccer is the most popular sport in the world.' },
    { cn: '今晚有一场足球赛。', en: 'There is a soccer match tonight.' },
  ],
  '组合': [
    { cn: '这是一个新的组合。', en: 'This is a new combination.' },
    { cn: '不同元素的组合产生了新的效果。', en: 'The combination of different elements produced new effects.' },
    { cn: '他们是一个音乐组合。', en: 'They are a music group.' },
  ],
  '左右': [
    { cn: '大约八点左右到。', en: 'Arriving at around eight o\'clock.' },
    { cn: '请看左右两边。', en: 'Please look at both sides.' },
    { cn: '一个小时左右就能到。', en: 'You can get there in about an hour.' },
  ],
  '作品': [
    { cn: '这是他最新的作品。', en: 'This is his latest work.' },
    { cn: '她的作品很受欢迎。', en: 'Her works are very popular.' },
    { cn: '美术馆里展出了很多作品。', en: 'Many works are exhibited in the art museum.' },
  ],
  '作者': [
    { cn: '这本书的作者是谁？', en: 'Who is the author of this book?' },
    { cn: '作者花了三年写这本书。', en: 'The author spent three years writing this book.' },
    { cn: '我很喜欢这位作者。', en: 'I really like this author.' },
  ],
  '做客': [
    { cn: '欢迎到我家做客。', en: 'Welcome to visit my home.' },
    { cn: '他去朋友家做客了。', en: 'He went to visit a friend\'s home.' },
    { cn: '做客时要注意礼貌。', en: 'Pay attention to manners when visiting.' },
  ],
};
export default HSK3_EXAMPLES;
