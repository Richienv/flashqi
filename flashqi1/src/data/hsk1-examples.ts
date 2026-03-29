const HSK1_EXAMPLES: Record<string, { cn: string; en: string }[]> = {
  '爱': [
    { cn: '我爱我的家人。', en: 'I love my family.' },
    { cn: '她爱吃水果。', en: 'She loves eating fruit.' },
    { cn: '爱是最重要的。', en: 'Love is the most important thing.' },
  ],
  '爱好': [
    { cn: '你有什么爱好？', en: 'What hobbies do you have?' },
    { cn: '我的爱好是读书。', en: 'My hobby is reading.' },
    { cn: '他爱好运动。', en: 'He is fond of sports.' },
  ],
  '八': [
    { cn: '我们家有八口人。', en: 'There are eight people in our family.' },
    { cn: '现在是八点钟。', en: 'It is eight o\'clock now.' },
    { cn: '他八岁了。', en: 'He is eight years old.' },
  ],
  '爸': [
    { cn: '我爸在家。', en: 'My dad is at home.' },
    { cn: '她爸做饭很好吃。', en: 'Her dad cooks very well.' },
    { cn: '你爸多大了？', en: 'How old is your dad?' },
  ],
  '爸爸': [
    { cn: '爸爸去上班了。', en: 'Dad went to work.' },
    { cn: '我爸爸是老师。', en: 'My dad is a teacher.' },
    { cn: '爸爸很喜欢喝茶。', en: 'Dad likes drinking tea very much.' },
  ],
  '吧': [
    { cn: '我们走吧。', en: 'Let\'s go.' },
    { cn: '你是学生吧？', en: 'You\'re a student, right?' },
    { cn: '休息一下吧。', en: 'Let\'s take a break.' },
  ],
  '白': [
    { cn: '她穿了一件白衣服。', en: 'She is wearing a white piece of clothing.' },
    { cn: '这张纸是白的。', en: 'This piece of paper is white.' },
    { cn: '他白跑了一趟。', en: 'He made a trip in vain.' },
  ],
  '白天': [
    { cn: '白天我在学校上课。', en: 'During the day I attend classes at school.' },
    { cn: '他白天工作，晚上学习。', en: 'He works during the day and studies at night.' },
    { cn: '白天的天气很好。', en: 'The weather during the day is nice.' },
  ],
  '百': [
    { cn: '这本书一百块钱。', en: 'This book costs one hundred yuan.' },
    { cn: '教室里有一百个学生。', en: 'There are one hundred students in the classroom.' },
    { cn: '他跑了一百米。', en: 'He ran one hundred meters.' },
  ],
  '班': [
    { cn: '我们班有三十个人。', en: 'There are thirty people in our class.' },
    { cn: '你是哪个班的？', en: 'Which class are you in?' },
    { cn: '下一班车几点来？', en: 'What time does the next bus come?' },
  ],
  '半': [
    { cn: '现在是三点半。', en: 'It is half past three now.' },
    { cn: '我等了半个小时。', en: 'I waited for half an hour.' },
    { cn: '他吃了半个苹果。', en: 'He ate half an apple.' },
  ],
  '半年': [
    { cn: '我来中国半年了。', en: 'I have been in China for half a year.' },
    { cn: '半年以后我要回家。', en: 'I will go home after half a year.' },
    { cn: '他学了半年汉语。', en: 'He has studied Chinese for half a year.' },
  ],
  '半天': [
    { cn: '我等了半天也没来。', en: 'I waited for a long time but nobody came.' },
    { cn: '他想了半天才回答。', en: 'He thought for quite a while before answering.' },
    { cn: '我们只有半天时间。', en: 'We only have half a day.' },
  ],
  '帮': [
    { cn: '请你帮我一下。', en: 'Please help me.' },
    { cn: '他常常帮朋友。', en: 'He often helps his friends.' },
    { cn: '谁能帮我？', en: 'Who can help me?' },
  ],
  '帮忙': [
    { cn: '谢谢你帮忙！', en: 'Thank you for your help!' },
    { cn: '你能帮忙吗？', en: 'Can you help?' },
    { cn: '他来帮忙了。', en: 'He came to help.' },
  ],
  '包': [
    { cn: '我买了一个新包。', en: 'I bought a new bag.' },
    { cn: '请帮我包起来。', en: 'Please wrap it up for me.' },
    { cn: '她的包很好看。', en: 'Her bag looks very nice.' },
  ],
  '包子': [
    { cn: '我早饭吃了两个包子。', en: 'I ate two steamed buns for breakfast.' },
    { cn: '这个包子很好吃。', en: 'This steamed bun is very tasty.' },
    { cn: '妈妈做的包子最好吃。', en: 'Mom\'s steamed buns are the most delicious.' },
  ],
  '杯': [
    { cn: '请给我一杯水。', en: 'Please give me a glass of water.' },
    { cn: '他喝了两杯茶。', en: 'He drank two cups of tea.' },
    { cn: '我想要一杯咖啡。', en: 'I want a cup of coffee.' },
  ],
  '杯子': [
    { cn: '这个杯子是你的吗？', en: 'Is this cup yours?' },
    { cn: '杯子里有水。', en: 'There is water in the cup.' },
    { cn: '我买了一个新杯子。', en: 'I bought a new cup.' },
  ],
  '北': [
    { cn: '学校在城市的北边。', en: 'The school is in the north of the city.' },
    { cn: '风从北边吹来。', en: 'The wind is blowing from the north.' },
    { cn: '他家在路的北面。', en: 'His home is on the north side of the road.' },
  ],
  '北边': [
    { cn: '图书馆在学校北边。', en: 'The library is to the north of the school.' },
    { cn: '北边的天气很冷。', en: 'The weather in the north is very cold.' },
    { cn: '他住在公园北边。', en: 'He lives to the north of the park.' },
  ],
  '北京': [
    { cn: '我去过北京。', en: 'I have been to Beijing.' },
    { cn: '北京是中国的首都。', en: 'Beijing is the capital of China.' },
    { cn: '他在北京工作。', en: 'He works in Beijing.' },
  ],
  '本': [
    { cn: '我买了三本书。', en: 'I bought three books.' },
    { cn: '这本书很好看。', en: 'This book is very good.' },
    { cn: '请给我两本本子。', en: 'Please give me two notebooks.' },
  ],
  '本子': [
    { cn: '我需要一个新本子。', en: 'I need a new notebook.' },
    { cn: '本子上写了很多字。', en: 'A lot of characters are written in the notebook.' },
    { cn: '这个本子是谁的？', en: 'Whose notebook is this?' },
  ],
  '比': [
    { cn: '他比我高。', en: 'He is taller than me.' },
    { cn: '今天比昨天冷。', en: 'Today is colder than yesterday.' },
    { cn: '比赛的比分是三比二。', en: 'The score of the match is three to two.' },
  ],
  '别': [
    { cn: '别走，等一下。', en: 'Don\'t go, wait a moment.' },
    { cn: '别忘了带书。', en: 'Don\'t forget to bring your book.' },
    { cn: '别生气了。', en: 'Don\'t be angry.' },
  ],
  '别的': [
    { cn: '你还要别的吗？', en: 'Do you want anything else?' },
    { cn: '别的同学都走了。', en: 'The other classmates have all left.' },
    { cn: '我想看别的电影。', en: 'I want to watch a different movie.' },
  ],
  '别人': [
    { cn: '别人都来了。', en: 'Everyone else has arrived.' },
    { cn: '不要拿别人的东西。', en: 'Don\'t take other people\'s things.' },
    { cn: '他不喜欢和别人说话。', en: 'He doesn\'t like talking to other people.' },
  ],
  '病': [
    { cn: '他生病了。', en: 'He is sick.' },
    { cn: '这个病不严重。', en: 'This illness is not serious.' },
    { cn: '她的病好了。', en: 'She has recovered from her illness.' },
  ],
  '病人': [
    { cn: '医院里有很多病人。', en: 'There are many patients in the hospital.' },
    { cn: '医生在看病人。', en: 'The doctor is seeing a patient.' },
    { cn: '这个病人需要休息。', en: 'This patient needs rest.' },
  ],
  '不': [
    { cn: '我不去了。', en: 'I\'m not going.' },
    { cn: '他不是学生。', en: 'He is not a student.' },
    { cn: '今天不冷。', en: 'It\'s not cold today.' },
  ],
  '不大': [
    { cn: '这个房间不大。', en: 'This room is not very big.' },
    { cn: '他不大喜欢喝咖啡。', en: 'He doesn\'t really like drinking coffee.' },
    { cn: '今天不大热。', en: 'It\'s not too hot today.' },
  ],
  '不对': [
    { cn: '你说的不对。', en: 'What you said is incorrect.' },
    { cn: '这个答案不对。', en: 'This answer is wrong.' },
    { cn: '我觉得不对。', en: 'I feel something is wrong.' },
  ],
  '不客气': [
    { cn: '不客气，这是我应该做的。', en: 'You\'re welcome, it\'s what I should do.' },
    { cn: '"谢谢！""不客气！"', en: '"Thank you!" "You\'re welcome!"' },
    { cn: '不用说不客气。', en: 'No need to say you\'re welcome.' },
  ],
  '不用': [
    { cn: '不用谢。', en: 'No need to thank me.' },
    { cn: '你不用来了。', en: 'You don\'t need to come.' },
    { cn: '不用担心，没问题。', en: 'No need to worry, no problem.' },
  ],
  '菜': [
    { cn: '今天的菜很好吃。', en: 'Today\'s dishes are very delicious.' },
    { cn: '妈妈买了很多菜。', en: 'Mom bought a lot of vegetables.' },
    { cn: '你想吃什么菜？', en: 'What dish would you like to eat?' },
  ],
  '茶': [
    { cn: '请喝茶。', en: 'Please have some tea.' },
    { cn: '中国人喜欢喝茶。', en: 'Chinese people like drinking tea.' },
    { cn: '这个茶很好喝。', en: 'This tea tastes very good.' },
  ],
  '差': [
    { cn: '他的成绩很差。', en: 'His grades are very poor.' },
    { cn: '还差五分钟。', en: 'There are still five minutes to go.' },
    { cn: '差一点儿就迟到了。', en: 'I was almost late.' },
  ],
  '常': [
    { cn: '他常来我家。', en: 'He often comes to my home.' },
    { cn: '我常去那个商店。', en: 'I often go to that shop.' },
    { cn: '她常给我打电话。', en: 'She often calls me.' },
  ],
  '常常': [
    { cn: '我常常去图书馆。', en: 'I often go to the library.' },
    { cn: '他常常迟到。', en: 'He is often late.' },
    { cn: '她常常帮助别人。', en: 'She often helps others.' },
  ],
  '唱': [
    { cn: '她唱得很好听。', en: 'She sings very beautifully.' },
    { cn: '我们一起唱吧。', en: 'Let\'s sing together.' },
    { cn: '他喜欢唱中国歌。', en: 'He likes singing Chinese songs.' },
  ],
  '唱歌': [
    { cn: '她喜欢唱歌。', en: 'She likes singing.' },
    { cn: '我们一起去唱歌吧。', en: 'Let\'s go sing together.' },
    { cn: '他唱歌唱得很好。', en: 'He sings very well.' },
  ],
  '车': [
    { cn: '车来了。', en: 'The bus/car is here.' },
    { cn: '他有一辆新车。', en: 'He has a new car.' },
    { cn: '请在车上等我。', en: 'Please wait for me in the car.' },
  ],
  '车票': [
    { cn: '我买了两张车票。', en: 'I bought two bus tickets.' },
    { cn: '车票多少钱？', en: 'How much is the ticket?' },
    { cn: '请把车票给我看看。', en: 'Please show me the ticket.' },
  ],
  '车上': [
    { cn: '车上有很多人。', en: 'There are many people on the bus.' },
    { cn: '我把书忘在车上了。', en: 'I left my book on the bus.' },
    { cn: '请不要在车上吃东西。', en: 'Please don\'t eat on the bus.' },
  ],
  '车站': [
    { cn: '车站在哪儿？', en: 'Where is the bus station?' },
    { cn: '我在车站等你。', en: 'I\'ll wait for you at the bus station.' },
    { cn: '从这儿到车站要走十分钟。', en: 'It takes ten minutes to walk from here to the station.' },
  ],
  '吃': [
    { cn: '你想吃什么？', en: 'What do you want to eat?' },
    { cn: '我已经吃了。', en: 'I have already eaten.' },
    { cn: '多吃水果对身体好。', en: 'Eating more fruit is good for your health.' },
  ],
  '吃饭': [
    { cn: '我们去吃饭吧。', en: 'Let\'s go eat.' },
    { cn: '你吃饭了吗？', en: 'Have you eaten yet?' },
    { cn: '他在饭店吃饭。', en: 'He is eating at a restaurant.' },
  ],
  '出': [
    { cn: '太阳出来了。', en: 'The sun has come out.' },
    { cn: '他出了一个好主意。', en: 'He came up with a good idea.' },
    { cn: '请出去一下。', en: 'Please step outside for a moment.' },
  ],
  '出来': [
    { cn: '他从房间里出来了。', en: 'He came out of the room.' },
    { cn: '太阳出来了。', en: 'The sun has come out.' },
    { cn: '你出来一下。', en: 'Come out for a moment.' },
  ],
  '出去': [
    { cn: '我想出去走走。', en: 'I want to go out for a walk.' },
    { cn: '他出去买东西了。', en: 'He went out to buy things.' },
    { cn: '外面太冷了，别出去。', en: 'It\'s too cold outside, don\'t go out.' },
  ],
  '穿': [
    { cn: '她今天穿了一件红色的衣服。', en: 'She is wearing a red piece of clothing today.' },
    { cn: '天冷了，多穿一点。', en: 'It\'s cold, put on more clothes.' },
    { cn: '你穿多大号的？', en: 'What size do you wear?' },
  ],
  '床': [
    { cn: '这张床很大。', en: 'This bed is very big.' },
    { cn: '他在床上睡觉。', en: 'He is sleeping on the bed.' },
    { cn: '我想买一张新床。', en: 'I want to buy a new bed.' },
  ],
  '次': [
    { cn: '这是我第一次来中国。', en: 'This is my first time coming to China.' },
    { cn: '他去了两次北京。', en: 'He has been to Beijing twice.' },
    { cn: '下次再来吧。', en: 'Come again next time.' },
  ],
  '从': [
    { cn: '我从学校回来了。', en: 'I came back from school.' },
    { cn: '从这儿到那儿很远。', en: 'It is far from here to there.' },
    { cn: '他从早上开始工作。', en: 'He starts working from the morning.' },
  ],
  '错': [
    { cn: '你说错了。', en: 'You said it wrong.' },
    { cn: '这道题我做错了。', en: 'I got this question wrong.' },
    { cn: '对不起，是我的错。', en: 'I\'m sorry, it\'s my fault.' },
  ],
  '打': [
    { cn: '他打了我一下。', en: 'He hit me once.' },
    { cn: '我在打字。', en: 'I am typing.' },
    { cn: '别打人。', en: 'Don\'t hit people.' },
  ],
  '打车': [
    { cn: '我们打车去吧。', en: 'Let\'s take a taxi.' },
    { cn: '打车要多少钱？', en: 'How much does it cost to take a taxi?' },
    { cn: '太远了，还是打车吧。', en: 'It\'s too far, let\'s take a taxi.' },
  ],
  '打电话': [
    { cn: '我要给他打电话。', en: 'I need to give him a call.' },
    { cn: '她在打电话。', en: 'She is making a phone call.' },
    { cn: '你什么时候方便打电话？', en: 'When is it convenient for you to call?' },
  ],
  '打开': [
    { cn: '请打开窗户。', en: 'Please open the window.' },
    { cn: '他打开了书。', en: 'He opened the book.' },
    { cn: '打开电视吧。', en: 'Turn on the TV.' },
  ],
  '打球': [
    { cn: '我们去打球吧。', en: 'Let\'s go play ball.' },
    { cn: '他每天都打球。', en: 'He plays ball every day.' },
    { cn: '你喜欢打球吗？', en: 'Do you like playing ball?' },
  ],
  '大': [
    { cn: '这个房子很大。', en: 'This house is very big.' },
    { cn: '你多大了？', en: 'How old are you?' },
    { cn: '他是我的大哥。', en: 'He is my eldest brother.' },
  ],
  '大学': [
    { cn: '我在大学学习。', en: 'I study at a university.' },
    { cn: '他考上了大学。', en: 'He got into university.' },
    { cn: '这个大学很有名。', en: 'This university is very famous.' },
  ],
  '大学生': [
    { cn: '他是一个大学生。', en: 'He is a university student.' },
    { cn: '大学生应该好好学习。', en: 'University students should study hard.' },
    { cn: '她是大学生，学的是中文。', en: 'She is a college student, studying Chinese.' },
  ],
  '到': [
    { cn: '我们到学校了。', en: 'We have arrived at the school.' },
    { cn: '他到北京去了。', en: 'He went to Beijing.' },
    { cn: '从这儿到那儿走路要十分钟。', en: 'It takes ten minutes to walk from here to there.' },
  ],
  '地': [
    { cn: '她高兴地笑了。', en: 'She laughed happily.' },
    { cn: '他认真地学习。', en: 'He studies earnestly.' },
    { cn: '请你慢慢地说。', en: 'Please speak slowly.' },
  ],
  '地点': [
    { cn: '见面的地点在哪里？', en: 'Where is the meeting place?' },
    { cn: '请告诉我地点。', en: 'Please tell me the location.' },
    { cn: '我们换一个地点吧。', en: 'Let\'s change the location.' },
  ],
  '地方': [
    { cn: '这个地方很漂亮。', en: 'This place is very beautiful.' },
    { cn: '你住在什么地方？', en: 'Where do you live?' },
    { cn: '我找不到地方坐了。', en: 'I can\'t find a place to sit.' },
  ],
  '地上': [
    { cn: '地上有一本书。', en: 'There is a book on the ground.' },
    { cn: '别坐在地上。', en: 'Don\'t sit on the ground.' },
    { cn: '他的东西掉在地上了。', en: 'His things fell on the floor.' },
  ],
  '地图': [
    { cn: '你有地图吗？', en: 'Do you have a map?' },
    { cn: '我在看地图。', en: 'I am looking at a map.' },
    { cn: '地图上找不到这个地方。', en: 'This place can\'t be found on the map.' },
  ],
  '的': [
    { cn: '这是我的书。', en: 'This is my book.' },
    { cn: '红色的花很好看。', en: 'Red flowers are very pretty.' },
    { cn: '他说的是对的。', en: 'What he said is correct.' },
  ],
  '得到': [
    { cn: '他得到了一个好成绩。', en: 'He got a good grade.' },
    { cn: '我得到了老师的帮助。', en: 'I received the teacher\'s help.' },
    { cn: '她得到了一份好工作。', en: 'She got a good job.' },
  ],
  '等': [
    { cn: '请等我一下。', en: 'Please wait for me a moment.' },
    { cn: '我在这儿等你。', en: 'I\'ll wait for you here.' },
    { cn: '他等了很长时间。', en: 'He waited for a very long time.' },
  ],
  '弟': [
    { cn: '他是我弟。', en: 'He is my younger brother.' },
    { cn: '我弟今年十岁。', en: 'My younger brother is ten this year.' },
    { cn: '她弟在上小学。', en: 'Her younger brother is in elementary school.' },
  ],
  '弟弟': [
    { cn: '我弟弟比我小两岁。', en: 'My younger brother is two years younger than me.' },
    { cn: '弟弟在家做作业。', en: 'My younger brother is doing homework at home.' },
    { cn: '他有一个弟弟。', en: 'He has a younger brother.' },
  ],
  '第': [
    { cn: '他是第一名。', en: 'He is number one.' },
    { cn: '这是第三课。', en: 'This is lesson three.' },
    { cn: '请翻到第五页。', en: 'Please turn to page five.' },
  ],
  '第二': [
    { cn: '他考了第二名。', en: 'He got second place.' },
    { cn: '第二天我们去了北京。', en: 'The next day we went to Beijing.' },
    { cn: '这是我第二次来中国。', en: 'This is my second time coming to China.' },
  ],
  '点': [
    { cn: '现在几点了？', en: 'What time is it now?' },
    { cn: '我想点两个菜。', en: 'I want to order two dishes.' },
    { cn: '他三点钟来。', en: 'He comes at three o\'clock.' },
  ],
  '电': [
    { cn: '家里没有电了。', en: 'There is no electricity at home.' },
    { cn: '小心，有电！', en: 'Be careful, there is electricity!' },
    { cn: '这里的电费很贵。', en: 'The electricity bill here is expensive.' },
  ],
  '电话': [
    { cn: '你的电话号码是多少？', en: 'What is your phone number?' },
    { cn: '电话响了。', en: 'The phone is ringing.' },
    { cn: '他在打电话。', en: 'He is on the phone.' },
  ],
  '电脑': [
    { cn: '我用电脑学习。', en: 'I use a computer to study.' },
    { cn: '他买了一台新电脑。', en: 'He bought a new computer.' },
    { cn: '电脑坏了。', en: 'The computer is broken.' },
  ],
  '电视': [
    { cn: '我在看电视。', en: 'I am watching TV.' },
    { cn: '他不喜欢看电视。', en: 'He doesn\'t like watching TV.' },
    { cn: '电视上在播新闻。', en: 'The news is playing on TV.' },
  ],
  '电视机': [
    { cn: '我们家有两台电视机。', en: 'Our family has two TV sets.' },
    { cn: '这台电视机是新的。', en: 'This TV set is new.' },
    { cn: '电视机太旧了，要换一台。', en: 'The TV set is too old, we need to replace it.' },
  ],
  '电影': [
    { cn: '我们去看电影吧。', en: 'Let\'s go watch a movie.' },
    { cn: '这部电影很好看。', en: 'This movie is very good.' },
    { cn: '你喜欢看什么电影？', en: 'What kind of movies do you like?' },
  ],
  '电影院': [
    { cn: '电影院在哪儿？', en: 'Where is the movie theater?' },
    { cn: '我们去电影院看电影吧。', en: 'Let\'s go to the movie theater to watch a movie.' },
    { cn: '这个电影院很大。', en: 'This movie theater is very big.' },
  ],
  '东': [
    { cn: '太阳从东边出来。', en: 'The sun rises from the east.' },
    { cn: '学校在东边。', en: 'The school is to the east.' },
    { cn: '他住在城市的东面。', en: 'He lives on the east side of the city.' },
  ],
  '东边': [
    { cn: '学校在我家东边。', en: 'The school is to the east of my home.' },
    { cn: '东边有一个公园。', en: 'There is a park to the east.' },
    { cn: '请往东边走。', en: 'Please go east.' },
  ],
  '东西': [
    { cn: '你买了什么东西？', en: 'What did you buy?' },
    { cn: '这个东西多少钱？', en: 'How much is this thing?' },
    { cn: '别忘了拿你的东西。', en: 'Don\'t forget to take your things.' },
  ],
  '动': [
    { cn: '别动！', en: 'Don\'t move!' },
    { cn: '他动了一下。', en: 'He moved a little.' },
    { cn: '风把树叶吹动了。', en: 'The wind blew the leaves.' },
  ],
  '动作': [
    { cn: '他的动作很快。', en: 'His movements are very fast.' },
    { cn: '请跟着我做动作。', en: 'Please follow my movements.' },
    { cn: '这个动作不难。', en: 'This movement is not difficult.' },
  ],
  '都': [
    { cn: '我们都是学生。', en: 'We are all students.' },
    { cn: '他什么都知道。', en: 'He knows everything.' },
    { cn: '大家都来了。', en: 'Everyone has arrived.' },
  ],
  '读': [
    { cn: '请你读一下这个字。', en: 'Please read this character aloud.' },
    { cn: '她喜欢读小说。', en: 'She likes reading novels.' },
    { cn: '这个字怎么读？', en: 'How do you read this character?' },
  ],
  '读书': [
    { cn: '他在图书馆读书。', en: 'He is reading at the library.' },
    { cn: '我喜欢读书。', en: 'I like reading.' },
    { cn: '她每天都读书。', en: 'She reads every day.' },
  ],
  '对': [
    { cn: '你说得对。', en: 'You are right.' },
    { cn: '对，就是这样。', en: 'Right, that\'s exactly how it is.' },
    { cn: '他对我很好。', en: 'He is very kind to me.' },
  ],
  '对不起': [
    { cn: '对不起，我迟到了。', en: 'I\'m sorry, I\'m late.' },
    { cn: '对不起，我不知道。', en: 'I\'m sorry, I don\'t know.' },
    { cn: '他说了对不起。', en: 'He said sorry.' },
  ],
  '多': [
    { cn: '这里人很多。', en: 'There are a lot of people here.' },
    { cn: '他比我大多了。', en: 'He is much older than me.' },
    { cn: '你多吃一点。', en: 'Eat a little more.' },
  ],
  '多少': [
    { cn: '这个多少钱？', en: 'How much is this?' },
    { cn: '你的电话号码是多少？', en: 'What is your phone number?' },
    { cn: '你班上有多少学生？', en: 'How many students are there in your class?' },
  ],
  '饿': [
    { cn: '我饿了。', en: 'I\'m hungry.' },
    { cn: '你饿不饿？', en: 'Are you hungry?' },
    { cn: '别饿着自己。', en: 'Don\'t let yourself go hungry.' },
  ],
  '儿子': [
    { cn: '她有一个儿子。', en: 'She has a son.' },
    { cn: '他的儿子很聪明。', en: 'His son is very smart.' },
    { cn: '我儿子今年五岁。', en: 'My son is five years old this year.' },
  ],
  '二': [
    { cn: '他有二十块钱。', en: 'He has twenty yuan.' },
    { cn: '二加二等于四。', en: 'Two plus two equals four.' },
    { cn: '现在是二月。', en: 'It is February now.' },
  ],
  '饭': [
    { cn: '饭做好了。', en: 'The meal is ready.' },
    { cn: '我们吃饭吧。', en: 'Let\'s eat.' },
    { cn: '这里的饭很好吃。', en: 'The food here is very good.' },
  ],
  '饭店': [
    { cn: '我们去饭店吃饭吧。', en: 'Let\'s go eat at a restaurant.' },
    { cn: '这个饭店的菜很好吃。', en: 'The food at this restaurant is very delicious.' },
    { cn: '他在饭店工作。', en: 'He works at a restaurant.' },
  ],
  '房间': [
    { cn: '这个房间很大。', en: 'This room is very big.' },
    { cn: '他的房间很干净。', en: 'His room is very clean.' },
    { cn: '我在房间里看书。', en: 'I am reading in the room.' },
  ],
  '房子': [
    { cn: '这个房子很漂亮。', en: 'This house is very beautiful.' },
    { cn: '他们买了一个新房子。', en: 'They bought a new house.' },
    { cn: '我家的房子不大。', en: 'Our house is not big.' },
  ],
  '放': [
    { cn: '请把书放在桌子上。', en: 'Please put the book on the table.' },
    { cn: '他把东西放下了。', en: 'He put the things down.' },
    { cn: '你放在哪儿了？', en: 'Where did you put it?' },
  ],
  '放假': [
    { cn: '我们明天放假。', en: 'We have a holiday tomorrow.' },
    { cn: '放假了，你想去哪儿？', en: 'It\'s vacation, where do you want to go?' },
    { cn: '他们下个星期放假。', en: 'They have a holiday next week.' },
  ],
  '放学': [
    { cn: '放学了，我们回家吧。', en: 'School is over, let\'s go home.' },
    { cn: '你每天几点放学？', en: 'What time do you get out of school every day?' },
    { cn: '放学以后我去图书馆。', en: 'After school I go to the library.' },
  ],
  '飞': [
    { cn: '鸟在天上飞。', en: 'The bird is flying in the sky.' },
    { cn: '飞机飞得很高。', en: 'The airplane flies very high.' },
    { cn: '时间飞快地过去了。', en: 'Time flew by quickly.' },
  ],
  '飞机': [
    { cn: '我坐飞机去北京。', en: 'I take a plane to Beijing.' },
    { cn: '飞机几点起飞？', en: 'What time does the plane take off?' },
    { cn: '那是一架大飞机。', en: 'That is a big airplane.' },
  ],
  '非常': [
    { cn: '我非常高兴。', en: 'I am very happy.' },
    { cn: '他非常喜欢中国。', en: 'He likes China very much.' },
    { cn: '今天非常冷。', en: 'It is very cold today.' },
  ],
  '分': [
    { cn: '现在是三点十分。', en: 'It is ten past three now.' },
    { cn: '请把苹果分给大家。', en: 'Please divide the apples among everyone.' },
    { cn: '他考了九十分。', en: 'He scored ninety points.' },
  ],
  '风': [
    { cn: '今天风很大。', en: 'The wind is strong today.' },
    { cn: '外面在刮风。', en: 'It\'s windy outside.' },
    { cn: '一阵风吹来了。', en: 'A gust of wind blew over.' },
  ],
  '干': [
    { cn: '你在干什么？', en: 'What are you doing?' },
    { cn: '这个工作不好干。', en: 'This job is not easy to do.' },
    { cn: '他干得很好。', en: 'He does a great job.' },
  ],
  '干净': [
    { cn: '请把房间打扫干净。', en: 'Please clean the room.' },
    { cn: '这件衣服很干净。', en: 'This piece of clothing is very clean.' },
    { cn: '你的手洗干净了吗？', en: 'Have you washed your hands clean?' },
  ],
  '干什么': [
    { cn: '你在干什么？', en: 'What are you doing?' },
    { cn: '明天你想干什么？', en: 'What do you want to do tomorrow?' },
    { cn: '他去干什么了？', en: 'What did he go to do?' },
  ],
  '高': [
    { cn: '他很高。', en: 'He is very tall.' },
    { cn: '这座山很高。', en: 'This mountain is very high.' },
    { cn: '你有多高？', en: 'How tall are you?' },
  ],
  '高兴': [
    { cn: '认识你很高兴。', en: 'Nice to meet you.' },
    { cn: '他今天很高兴。', en: 'He is very happy today.' },
    { cn: '听到这个消息我很高兴。', en: 'I\'m glad to hear this news.' },
  ],
  '告诉': [
    { cn: '请告诉我你的名字。', en: 'Please tell me your name.' },
    { cn: '他告诉了我一个好消息。', en: 'He told me some good news.' },
    { cn: '谁告诉你的？', en: 'Who told you?' },
  ],
  '哥': [
    { cn: '他是我哥。', en: 'He is my older brother.' },
    { cn: '我哥在北京工作。', en: 'My older brother works in Beijing.' },
    { cn: '她哥比她大三岁。', en: 'Her older brother is three years older than her.' },
  ],
  '哥哥': [
    { cn: '我哥哥是医生。', en: 'My older brother is a doctor.' },
    { cn: '哥哥教我写字。', en: 'My older brother teaches me to write characters.' },
    { cn: '他有两个哥哥。', en: 'He has two older brothers.' },
  ],
  '歌': [
    { cn: '这首歌很好听。', en: 'This song sounds very nice.' },
    { cn: '你会唱这首歌吗？', en: 'Can you sing this song?' },
    { cn: '她最喜欢的歌是什么？', en: 'What is her favorite song?' },
  ],
  '个': [
    { cn: '我买了三个苹果。', en: 'I bought three apples.' },
    { cn: '他是一个好人。', en: 'He is a good person.' },
    { cn: '你有几个朋友？', en: 'How many friends do you have?' },
  ],
  '给': [
    { cn: '请给我一杯水。', en: 'Please give me a glass of water.' },
    { cn: '他给我打了电话。', en: 'He called me.' },
    { cn: '妈妈给我做了饭。', en: 'Mom made food for me.' },
  ],
  '跟': [
    { cn: '我跟他一起去。', en: 'I go together with him.' },
    { cn: '你跟我来。', en: 'Come with me.' },
    { cn: '他跟她一样高。', en: 'He is as tall as her.' },
  ],
  '工人': [
    { cn: '他是一个工人。', en: 'He is a worker.' },
    { cn: '工厂里有很多工人。', en: 'There are many workers in the factory.' },
    { cn: '工人每天工作八个小时。', en: 'Workers work eight hours every day.' },
  ],
  '工作': [
    { cn: '他在银行工作。', en: 'He works at a bank.' },
    { cn: '你的工作是什么？', en: 'What is your job?' },
    { cn: '我找到了一份好工作。', en: 'I found a good job.' },
  ],
  '关': [
    { cn: '请关上门。', en: 'Please close the door.' },
    { cn: '这件事跟我没关系。', en: 'This matter has nothing to do with me.' },
    { cn: '商店关了。', en: 'The store is closed.' },
  ],
  '关上': [
    { cn: '请把门关上。', en: 'Please close the door.' },
    { cn: '他关上了灯。', en: 'He turned off the light.' },
    { cn: '窗户关上了吗？', en: 'Is the window closed?' },
  ],
  '贵': [
    { cn: '这个东西太贵了。', en: 'This thing is too expensive.' },
    { cn: '请问您贵姓？', en: 'May I ask your family name?' },
    { cn: '北京的房子很贵。', en: 'Houses in Beijing are very expensive.' },
  ],
  '国': [
    { cn: '中国是一个大国。', en: 'China is a big country.' },
    { cn: '你是哪国人？', en: 'Which country are you from?' },
    { cn: '他去过很多国家。', en: 'He has been to many countries.' },
  ],
  '国家': [
    { cn: '中国是一个大国家。', en: 'China is a big country.' },
    { cn: '你去过哪些国家？', en: 'Which countries have you been to?' },
    { cn: '每个国家都有自己的文化。', en: 'Every country has its own culture.' },
  ],
  '国外': [
    { cn: '他在国外工作。', en: 'He works abroad.' },
    { cn: '你去过国外吗？', en: 'Have you been abroad?' },
    { cn: '很多人想去国外留学。', en: 'Many people want to study abroad.' },
  ],
  '过': [
    { cn: '你去过中国吗？', en: 'Have you been to China?' },
    { cn: '时间过得真快。', en: 'Time really passes quickly.' },
    { cn: '我们走过了那座桥。', en: 'We walked across that bridge.' },
  ],
  '还': [
    { cn: '他还没来。', en: 'He hasn\'t come yet.' },
    { cn: '你还要别的吗？', en: 'Do you want anything else?' },
    { cn: '他还在学校。', en: 'He is still at school.' },
  ],
  '还是': [
    { cn: '你喝茶还是喝咖啡？', en: 'Do you want tea or coffee?' },
    { cn: '还是你说得对。', en: 'After all, you were right.' },
    { cn: '我觉得还是走路好。', en: 'I think it\'s better to walk.' },
  ],
  '还有': [
    { cn: '还有一个问题。', en: 'There is one more question.' },
    { cn: '你还有钱吗？', en: 'Do you still have money?' },
    { cn: '还有什么需要的？', en: 'Is there anything else you need?' },
  ],
  '孩子': [
    { cn: '她有两个孩子。', en: 'She has two children.' },
    { cn: '孩子在学校上课。', en: 'The children are in class at school.' },
    { cn: '这个孩子很可爱。', en: 'This child is very cute.' },
  ],
  '汉语': [
    { cn: '我在学习汉语。', en: 'I am learning Chinese.' },
    { cn: '汉语很有意思。', en: 'Chinese is very interesting.' },
    { cn: '你的汉语说得很好。', en: 'You speak Chinese very well.' },
  ],
  '汉字': [
    { cn: '我在学写汉字。', en: 'I am learning to write Chinese characters.' },
    { cn: '这个汉字怎么读？', en: 'How do you read this Chinese character?' },
    { cn: '汉字很难写。', en: 'Chinese characters are hard to write.' },
  ],
  '好': [
    { cn: '你好！', en: 'Hello!' },
    { cn: '这本书很好。', en: 'This book is very good.' },
    { cn: '好的，没问题。', en: 'OK, no problem.' },
  ],
  '好吃': [
    { cn: '这个菜很好吃。', en: 'This dish is very delicious.' },
    { cn: '妈妈做的饭最好吃。', en: 'Mom\'s cooking is the most delicious.' },
    { cn: '这里的面条好吃吗？', en: 'Are the noodles here good?' },
  ],
  '好看': [
    { cn: '这件衣服很好看。', en: 'This piece of clothing looks very nice.' },
    { cn: '这部电影好看吗？', en: 'Is this movie good?' },
    { cn: '她长得很好看。', en: 'She is very good-looking.' },
  ],
  '好听': [
    { cn: '这首歌真好听。', en: 'This song is really pleasant to hear.' },
    { cn: '她的声音很好听。', en: 'Her voice sounds very nice.' },
    { cn: '你说的话真好听。', en: 'What you said sounds really nice.' },
  ],
  '好玩儿': [
    { cn: '这个游戏很好玩儿。', en: 'This game is very fun.' },
    { cn: '那个地方好玩儿吗？', en: 'Is that place fun?' },
    { cn: '我们去一个好玩儿的地方吧。', en: 'Let\'s go to a fun place.' },
  ],
  '号': [
    { cn: '今天几号？', en: 'What is today\'s date?' },
    { cn: '我的手机号是多少？', en: 'What is my phone number?' },
    { cn: '他住在三号楼。', en: 'He lives in building number three.' },
  ],
  '喝': [
    { cn: '你想喝什么？', en: 'What would you like to drink?' },
    { cn: '我喝了一杯水。', en: 'I drank a glass of water.' },
    { cn: '多喝水对身体好。', en: 'Drinking more water is good for your health.' },
  ],
  '和': [
    { cn: '我和他是朋友。', en: 'He and I are friends.' },
    { cn: '爸爸和妈妈都来了。', en: 'Both Dad and Mom are here.' },
    { cn: '我喜欢吃米饭和面条。', en: 'I like eating rice and noodles.' },
  ],
  '很': [
    { cn: '今天很冷。', en: 'It\'s very cold today.' },
    { cn: '她很漂亮。', en: 'She is very beautiful.' },
    { cn: '这本书很好看。', en: 'This book is very good.' },
  ],
  '后': [
    { cn: '学校在商店后面。', en: 'The school is behind the store.' },
    { cn: '他走在我后面。', en: 'He is walking behind me.' },
    { cn: '考试以后我们去玩儿。', en: 'We\'ll go have fun after the exam.' },
  ],
  '后边': [
    { cn: '学校在医院后边。', en: 'The school is behind the hospital.' },
    { cn: '后边还有位子。', en: 'There are seats in the back.' },
    { cn: '他坐在我后边。', en: 'He sits behind me.' },
  ],
  '后天': [
    { cn: '后天是星期五。', en: 'The day after tomorrow is Friday.' },
    { cn: '后天我们去旅行。', en: 'We are going on a trip the day after tomorrow.' },
    { cn: '他后天回来。', en: 'He will come back the day after tomorrow.' },
  ],
  '花': [
    { cn: '这朵花很好看。', en: 'This flower is very pretty.' },
    { cn: '他给她买了花。', en: 'He bought flowers for her.' },
    { cn: '我花了很多钱。', en: 'I spent a lot of money.' },
  ],
  '话': [
    { cn: '他说了很多话。', en: 'He said a lot.' },
    { cn: '你的话我听懂了。', en: 'I understood what you said.' },
    { cn: '他不爱说话。', en: 'He doesn\'t like to talk.' },
  ],
  '坏': [
    { cn: '这个手机坏了。', en: 'This phone is broken.' },
    { cn: '他不是坏人。', en: 'He is not a bad person.' },
    { cn: '天气太坏了。', en: 'The weather is terrible.' },
  ],
  '回': [
    { cn: '你什么时候回来？', en: 'When will you come back?' },
    { cn: '他回了一封信。', en: 'He replied with a letter.' },
    { cn: '我要回中国。', en: 'I want to go back to China.' },
  ],
  '回答': [
    { cn: '请回答这个问题。', en: 'Please answer this question.' },
    { cn: '他的回答是对的。', en: 'His answer is correct.' },
    { cn: '我不知道怎么回答。', en: 'I don\'t know how to answer.' },
  ],
  '回到': [
    { cn: '他回到了家。', en: 'He returned home.' },
    { cn: '我想回到北京。', en: 'I want to go back to Beijing.' },
    { cn: '她回到了学校。', en: 'She returned to school.' },
  ],
  '回家': [
    { cn: '我要回家了。', en: 'I\'m going home now.' },
    { cn: '你几点回家？', en: 'What time do you go home?' },
    { cn: '放学后我们一起回家。', en: 'Let\'s go home together after school.' },
  ],
  '回来': [
    { cn: '他什么时候回来？', en: 'When will he come back?' },
    { cn: '妈妈回来了。', en: 'Mom is back.' },
    { cn: '你快回来吧。', en: 'Come back soon.' },
  ],
  '回去': [
    { cn: '我要回去了。', en: 'I need to go back now.' },
    { cn: '你先回去吧。', en: 'You go back first.' },
    { cn: '天黑了，我们回去吧。', en: 'It\'s dark, let\'s go back.' },
  ],
  '会': [
    { cn: '你会说中文吗？', en: 'Can you speak Chinese?' },
    { cn: '明天会下雨。', en: 'It will rain tomorrow.' },
    { cn: '他会开车。', en: 'He knows how to drive.' },
  ],
  '火车': [
    { cn: '我坐火车去上海。', en: 'I take the train to Shanghai.' },
    { cn: '火车几点开？', en: 'What time does the train depart?' },
    { cn: '火车上的人很多。', en: 'There are many people on the train.' },
  ],
  '机场': [
    { cn: '我去机场接朋友。', en: 'I\'m going to the airport to pick up a friend.' },
    { cn: '机场离这里很远。', en: 'The airport is far from here.' },
    { cn: '他在机场等飞机。', en: 'He is waiting for the plane at the airport.' },
  ],
  '机票': [
    { cn: '机票太贵了。', en: 'The plane ticket is too expensive.' },
    { cn: '我买了一张机票。', en: 'I bought a plane ticket.' },
    { cn: '你的机票买好了吗？', en: 'Have you bought your plane ticket yet?' },
  ],
  '鸡蛋': [
    { cn: '我早饭吃了一个鸡蛋。', en: 'I had an egg for breakfast.' },
    { cn: '鸡蛋多少钱一斤？', en: 'How much are the eggs per jin?' },
    { cn: '她会做鸡蛋饭。', en: 'She can make egg fried rice.' },
  ],
  '几': [
    { cn: '你几岁了？', en: 'How old are you?' },
    { cn: '现在几点了？', en: 'What time is it now?' },
    { cn: '教室里有几个人？', en: 'How many people are in the classroom?' },
  ],
  '记': [
    { cn: '我记不住他的名字。', en: 'I can\'t remember his name.' },
    { cn: '请把这些字记下来。', en: 'Please write down these characters.' },
    { cn: '你要记好时间。', en: 'You should note down the time.' },
  ],
  '记得': [
    { cn: '我记得他的名字。', en: 'I remember his name.' },
    { cn: '你记得那个地方吗？', en: 'Do you remember that place?' },
    { cn: '我还记得小时候的事。', en: 'I still remember things from my childhood.' },
  ],
  '记住': [
    { cn: '请记住这个电话号码。', en: 'Please remember this phone number.' },
    { cn: '我记住了。', en: 'I\'ve remembered it.' },
    { cn: '你要记住老师说的话。', en: 'You should remember what the teacher said.' },
  ],
  '家': [
    { cn: '我家在北京。', en: 'My home is in Beijing.' },
    { cn: '欢迎来我家。', en: 'Welcome to my home.' },
    { cn: '他们一家人很开心。', en: 'Their whole family is very happy.' },
  ],
  '家里': [
    { cn: '我在家里看书。', en: 'I am reading at home.' },
    { cn: '家里有人吗？', en: 'Is anyone home?' },
    { cn: '他家里有五口人。', en: 'There are five people in his family.' },
  ],
  '家人': [
    { cn: '我的家人都在北京。', en: 'My family members are all in Beijing.' },
    { cn: '他很爱他的家人。', en: 'He loves his family very much.' },
    { cn: '你的家人好吗？', en: 'How is your family?' },
  ],
  '间': [
    { cn: '我住在一间小房间里。', en: 'I live in a small room.' },
    { cn: '教室有二十间。', en: 'There are twenty classrooms.' },
    { cn: '这间屋子很亮。', en: 'This room is very bright.' },
  ],
  '见': [
    { cn: '好久不见！', en: 'Long time no see!' },
    { cn: '明天见！', en: 'See you tomorrow!' },
    { cn: '我想见你。', en: 'I want to see you.' },
  ],
  '见面': [
    { cn: '我们明天见面吧。', en: 'Let\'s meet tomorrow.' },
    { cn: '很高兴和你见面。', en: 'Nice to meet you.' },
    { cn: '他们在学校见面了。', en: 'They met at school.' },
  ],
  '叫': [
    { cn: '我叫王明。', en: 'My name is Wang Ming.' },
    { cn: '有人在叫你。', en: 'Someone is calling you.' },
    { cn: '他叫我去他家。', en: 'He asked me to go to his home.' },
  ],
  '教': [
    { cn: '她教我们中文。', en: 'She teaches us Chinese.' },
    { cn: '谁教你的？', en: 'Who taught you?' },
    { cn: '请教我怎么做。', en: 'Please teach me how to do it.' },
  ],
  '教学楼': [
    { cn: '我在教学楼上课。', en: 'I have class in the teaching building.' },
    { cn: '教学楼在图书馆旁边。', en: 'The teaching building is next to the library.' },
    { cn: '新的教学楼很大。', en: 'The new teaching building is very big.' },
  ],
  '介绍': [
    { cn: '请你介绍一下自己。', en: 'Please introduce yourself.' },
    { cn: '我来介绍一下，这是我的朋友。', en: 'Let me introduce, this is my friend.' },
    { cn: '他给我介绍了一份工作。', en: 'He introduced a job to me.' },
  ],
  '姐': [
    { cn: '她是我姐。', en: 'She is my older sister.' },
    { cn: '我姐今年二十岁。', en: 'My older sister is twenty years old this year.' },
    { cn: '他姐在大学学习。', en: 'His older sister studies at university.' },
  ],
  '姐姐': [
    { cn: '我姐姐是老师。', en: 'My older sister is a teacher.' },
    { cn: '姐姐做饭很好吃。', en: 'My older sister cooks very well.' },
    { cn: '他有一个姐姐。', en: 'He has an older sister.' },
  ],
  '今年': [
    { cn: '今年我二十岁。', en: 'I am twenty years old this year.' },
    { cn: '今年天气很热。', en: 'The weather is very hot this year.' },
    { cn: '你今年去哪里旅行？', en: 'Where are you traveling this year?' },
  ],
  '今天': [
    { cn: '今天天气很好。', en: 'The weather is very nice today.' },
    { cn: '今天是星期一。', en: 'Today is Monday.' },
    { cn: '你今天忙不忙？', en: 'Are you busy today?' },
  ],
  '进': [
    { cn: '请进！', en: 'Please come in!' },
    { cn: '他进了教室。', en: 'He entered the classroom.' },
    { cn: '外面的人不能进去。', en: 'People outside cannot go in.' },
  ],
  '进来': [
    { cn: '请进来坐。', en: 'Please come in and have a seat.' },
    { cn: '他进来了。', en: 'He came in.' },
    { cn: '外面冷，快进来吧。', en: 'It\'s cold outside, come in quickly.' },
  ],
  '进去': [
    { cn: '我可以进去吗？', en: 'May I go in?' },
    { cn: '他进去了。', en: 'He went in.' },
    { cn: '门关着，进不去。', en: 'The door is closed, can\'t go in.' },
  ],
  '九': [
    { cn: '他今年九岁。', en: 'He is nine years old this year.' },
    { cn: '现在九点了。', en: 'It\'s nine o\'clock now.' },
    { cn: '九月开学。', en: 'School starts in September.' },
  ],
  '就': [
    { cn: '我就来。', en: 'I\'ll be right there.' },
    { cn: '他一回来就吃饭了。', en: 'He ate as soon as he came back.' },
    { cn: '我就要这个。', en: 'I want just this one.' },
  ],
  '觉得': [
    { cn: '我觉得这个很好。', en: 'I think this is very good.' },
    { cn: '你觉得怎么样？', en: 'What do you think?' },
    { cn: '他觉得有点累。', en: 'He feels a bit tired.' },
  ],
  '开': [
    { cn: '请开门。', en: 'Please open the door.' },
    { cn: '会议几点开？', en: 'What time does the meeting start?' },
    { cn: '水开了。', en: 'The water has boiled.' },
  ],
  '开车': [
    { cn: '他在学开车。', en: 'He is learning to drive.' },
    { cn: '谁来开车？', en: 'Who is going to drive?' },
    { cn: '开车要小心。', en: 'Be careful when driving.' },
  ],
  '开会': [
    { cn: '我们下午要开会。', en: 'We have a meeting this afternoon.' },
    { cn: '他在开会，不方便接电话。', en: 'He is in a meeting and can\'t take calls.' },
    { cn: '今天开会讨论什么？', en: 'What are we discussing at today\'s meeting?' },
  ],
  '开玩笑': [
    { cn: '他在开玩笑。', en: 'He is joking.' },
    { cn: '别跟我开玩笑了。', en: 'Stop joking with me.' },
    { cn: '我说的是真的，不是开玩笑。', en: 'What I said is true, I\'m not joking.' },
  ],
  '看': [
    { cn: '你在看什么？', en: 'What are you looking at?' },
    { cn: '我想看那本书。', en: 'I want to read that book.' },
    { cn: '我们去看电影吧。', en: 'Let\'s go watch a movie.' },
  ],
  '看病': [
    { cn: '他去医院看病了。', en: 'He went to the hospital to see a doctor.' },
    { cn: '你不舒服，应该去看病。', en: 'You\'re not feeling well, you should see a doctor.' },
    { cn: '看病要带什么？', en: 'What do I need to bring to see a doctor?' },
  ],
  '看到': [
    { cn: '我看到他了。', en: 'I saw him.' },
    { cn: '你看到我的书了吗？', en: 'Have you seen my book?' },
    { cn: '她看到了一朵漂亮的花。', en: 'She saw a beautiful flower.' },
  ],
  '看见': [
    { cn: '我看见他了。', en: 'I saw him.' },
    { cn: '你看见那个人了吗？', en: 'Did you see that person?' },
    { cn: '我没看见。', en: 'I didn\'t see it.' },
  ],
  '考': [
    { cn: '明天要考数学。', en: 'There\'s a math exam tomorrow.' },
    { cn: '他考了一百分。', en: 'He scored one hundred points.' },
    { cn: '你考得怎么样？', en: 'How did your exam go?' },
  ],
  '考试': [
    { cn: '明天有考试。', en: 'There is an exam tomorrow.' },
    { cn: '你考试考得怎么样？', en: 'How was your exam?' },
    { cn: '我在准备考试。', en: 'I am preparing for an exam.' },
  ],
  '渴': [
    { cn: '我渴了，想喝水。', en: 'I\'m thirsty and want some water.' },
    { cn: '你渴不渴？', en: 'Are you thirsty?' },
    { cn: '运动以后很渴。', en: 'I\'m very thirsty after exercising.' },
  ],
  '课': [
    { cn: '今天有三节课。', en: 'There are three classes today.' },
    { cn: '这节课很有意思。', en: 'This class is very interesting.' },
    { cn: '你最喜欢什么课？', en: 'What class do you like the most?' },
  ],
  '课本': [
    { cn: '请打开课本。', en: 'Please open your textbook.' },
    { cn: '我忘了带课本。', en: 'I forgot to bring my textbook.' },
    { cn: '这本课本是新的。', en: 'This textbook is new.' },
  ],
  '课文': [
    { cn: '请你读一下课文。', en: 'Please read the text aloud.' },
    { cn: '这篇课文不难。', en: 'This text is not difficult.' },
    { cn: '我们学了一篇新课文。', en: 'We learned a new text.' },
  ],
  '口': [
    { cn: '我喝了一口水。', en: 'I took a sip of water.' },
    { cn: '我们家有四口人。', en: 'There are four people in our family.' },
    { cn: '别张着口说话。', en: 'Don\'t talk with your mouth open.' },
  ],
  '块': [
    { cn: '这个苹果三块钱。', en: 'This apple costs three yuan.' },
    { cn: '给我一块蛋糕。', en: 'Give me a piece of cake.' },
    { cn: '我买了两块肉。', en: 'I bought two pieces of meat.' },
  ],
  '快': [
    { cn: '他跑得很快。', en: 'He runs very fast.' },
    { cn: '快一点！', en: 'Hurry up!' },
    { cn: '时间过得真快。', en: 'Time passes so quickly.' },
  ],
  '来': [
    { cn: '他来了。', en: 'He has arrived.' },
    { cn: '请你来我家吧。', en: 'Please come to my home.' },
    { cn: '明天你能来吗？', en: 'Can you come tomorrow?' },
  ],
  '来到': [
    { cn: '我来到了北京。', en: 'I arrived in Beijing.' },
    { cn: '他来到了学校。', en: 'He arrived at the school.' },
    { cn: '我们来到了一个新地方。', en: 'We arrived at a new place.' },
  ],
  '老': [
    { cn: '他是一个老人。', en: 'He is an elderly person.' },
    { cn: '这条路很老了。', en: 'This road is very old.' },
    { cn: '他老是迟到。', en: 'He is always late.' },
  ],
  '老人': [
    { cn: '那个老人很和气。', en: 'That elderly person is very kind.' },
    { cn: '我们要尊重老人。', en: 'We should respect the elderly.' },
    { cn: '公园里有很多老人。', en: 'There are many elderly people in the park.' },
  ],
  '老师': [
    { cn: '老师好！', en: 'Hello, teacher!' },
    { cn: '我们的老师很好。', en: 'Our teacher is very good.' },
    { cn: '他是中文老师。', en: 'He is a Chinese teacher.' },
  ],
  '了': [
    { cn: '我吃了饭了。', en: 'I have eaten.' },
    { cn: '天黑了。', en: 'It\'s gotten dark.' },
    { cn: '他走了。', en: 'He left.' },
  ],
  '累': [
    { cn: '我今天很累。', en: 'I\'m very tired today.' },
    { cn: '工作太累了。', en: 'Work is too tiring.' },
    { cn: '走了这么远的路，真累。', en: 'Walking such a long way, I\'m really tired.' },
  ],
  '冷': [
    { cn: '今天很冷。', en: 'It\'s very cold today.' },
    { cn: '外面太冷了。', en: 'It\'s too cold outside.' },
    { cn: '你冷不冷？', en: 'Are you cold?' },
  ],
  '里': [
    { cn: '房间里有很多书。', en: 'There are many books in the room.' },
    { cn: '学校在城里。', en: 'The school is in the city.' },
    { cn: '杯子里有水。', en: 'There is water inside the cup.' },
  ],
  '里边': [
    { cn: '里边请。', en: 'Please come inside.' },
    { cn: '箱子里边有什么？', en: 'What\'s inside the box?' },
    { cn: '教室里边有很多学生。', en: 'There are many students inside the classroom.' },
  ],
  '两': [
    { cn: '我有两本书。', en: 'I have two books.' },
    { cn: '他们两个是好朋友。', en: 'The two of them are good friends.' },
    { cn: '我等了两个小时。', en: 'I waited for two hours.' },
  ],
  '零': [
    { cn: '今天零下五度。', en: 'It\'s minus five degrees today.' },
    { cn: '电话号码里有两个零。', en: 'There are two zeros in the phone number.' },
    { cn: '从零开始学。', en: 'Start learning from zero.' },
  ],
  '六': [
    { cn: '他六点起床。', en: 'He gets up at six o\'clock.' },
    { cn: '我们家有六口人。', en: 'There are six people in our family.' },
    { cn: '六月天气很热。', en: 'The weather in June is very hot.' },
  ],
  '楼': [
    { cn: '我住在五楼。', en: 'I live on the fifth floor.' },
    { cn: '那栋楼很高。', en: 'That building is very tall.' },
    { cn: '教学楼在前面。', en: 'The teaching building is in front.' },
  ],
  '楼上': [
    { cn: '楼上有人在走路。', en: 'Someone is walking upstairs.' },
    { cn: '他住在楼上。', en: 'He lives upstairs.' },
    { cn: '我的房间在楼上。', en: 'My room is upstairs.' },
  ],
  '楼下': [
    { cn: '我在楼下等你。', en: 'I\'ll wait for you downstairs.' },
    { cn: '楼下有一个商店。', en: 'There is a shop downstairs.' },
    { cn: '请到楼下来。', en: 'Please come downstairs.' },
  ],
  '路': [
    { cn: '这条路很长。', en: 'This road is very long.' },
    { cn: '你知道去学校的路吗？', en: 'Do you know the way to school?' },
    { cn: '路上小心。', en: 'Be careful on the way.' },
  ],
  '路口': [
    { cn: '在路口往右拐。', en: 'Turn right at the intersection.' },
    { cn: '路口有红绿灯。', en: 'There are traffic lights at the intersection.' },
    { cn: '前面就是路口了。', en: 'The intersection is just ahead.' },
  ],
  '路上': [
    { cn: '路上小心。', en: 'Be careful on the road.' },
    { cn: '他在路上了。', en: 'He is on the way.' },
    { cn: '路上车很多。', en: 'There are many cars on the road.' },
  ],
  '妈': [
    { cn: '我妈做饭很好吃。', en: 'My mom cooks very well.' },
    { cn: '她妈在家。', en: 'Her mom is at home.' },
    { cn: '你妈来了吗？', en: 'Did your mom come?' },
  ],
  '妈妈': [
    { cn: '妈妈，我回来了。', en: 'Mom, I\'m back.' },
    { cn: '我妈妈是医生。', en: 'My mom is a doctor.' },
    { cn: '妈妈给我做了好吃的饭。', en: 'Mom made delicious food for me.' },
  ],
  '马路': [
    { cn: '过马路要小心。', en: 'Be careful when crossing the street.' },
    { cn: '马路上车很多。', en: 'There are many cars on the street.' },
    { cn: '学校在马路对面。', en: 'The school is across the street.' },
  ],
  '马上': [
    { cn: '我马上来。', en: 'I\'ll be right there.' },
    { cn: '马上就要上课了。', en: 'Class is about to start.' },
    { cn: '他马上就回来。', en: 'He will be back right away.' },
  ],
  '吗': [
    { cn: '你是学生吗？', en: 'Are you a student?' },
    { cn: '你吃了吗？', en: 'Have you eaten?' },
    { cn: '他来了吗？', en: 'Has he come?' },
  ],
  '买': [
    { cn: '我要去买东西。', en: 'I\'m going to buy things.' },
    { cn: '他买了一本新书。', en: 'He bought a new book.' },
    { cn: '这个你在哪儿买的？', en: 'Where did you buy this?' },
  ],
  '慢': [
    { cn: '请慢一点说。', en: 'Please speak more slowly.' },
    { cn: '他走得很慢。', en: 'He walks very slowly.' },
    { cn: '慢慢吃，不要急。', en: 'Eat slowly, don\'t rush.' },
  ],
  '忙': [
    { cn: '我最近很忙。', en: 'I\'ve been very busy recently.' },
    { cn: '你忙什么呢？', en: 'What are you busy with?' },
    { cn: '他忙着做作业。', en: 'He is busy doing homework.' },
  ],
  '毛': [
    { cn: '这件东西三块五毛钱。', en: 'This thing costs three yuan and fifty cents.' },
    { cn: '小猫的毛很软。', en: 'The kitten\'s fur is very soft.' },
    { cn: '一毛钱都不要浪费。', en: 'Don\'t waste even a dime.' },
  ],
  '没': [
    { cn: '我没去过北京。', en: 'I have never been to Beijing.' },
    { cn: '他没来上课。', en: 'He didn\'t come to class.' },
    { cn: '我没带钱。', en: 'I didn\'t bring money.' },
  ],
  '没关系': [
    { cn: '没关系，没事的。', en: 'It doesn\'t matter, it\'s fine.' },
    { cn: '"对不起。""没关系。"', en: '"I\'m sorry." "It doesn\'t matter."' },
    { cn: '没关系，下次注意就好。', en: 'It doesn\'t matter, just be careful next time.' },
  ],
  '没什么': [
    { cn: '没什么，你别担心。', en: 'It\'s nothing, don\'t worry.' },
    { cn: '你怎么了？没什么。', en: 'What\'s wrong? It\'s nothing.' },
    { cn: '这件事没什么大不了的。', en: 'This is no big deal.' },
  ],
  '没事儿': [
    { cn: '没事儿，别担心。', en: 'It\'s nothing, don\'t worry.' },
    { cn: '你没事儿吧？', en: 'Are you okay?' },
    { cn: '今天没事儿，我们出去玩吧。', en: 'I\'m free today, let\'s go out and have fun.' },
  ],
  '没有': [
    { cn: '我没有钱。', en: 'I don\'t have money.' },
    { cn: '教室里没有人。', en: 'There is no one in the classroom.' },
    { cn: '他没有来。', en: 'He didn\'t come.' },
  ],
  '妹': [
    { cn: '她是我妹。', en: 'She is my younger sister.' },
    { cn: '我妹很可爱。', en: 'My younger sister is very cute.' },
    { cn: '他妹还小。', en: 'His younger sister is still young.' },
  ],
  '妹妹': [
    { cn: '我妹妹在上小学。', en: 'My younger sister is in elementary school.' },
    { cn: '她有一个妹妹。', en: 'She has a younger sister.' },
    { cn: '妹妹比我小三岁。', en: 'My younger sister is three years younger than me.' },
  ],
  '门': [
    { cn: '请把门打开。', en: 'Please open the door.' },
    { cn: '门开着呢。', en: 'The door is open.' },
    { cn: '有人在敲门。', en: 'Someone is knocking on the door.' },
  ],
  '门口': [
    { cn: '我在门口等你。', en: 'I\'ll wait for you at the entrance.' },
    { cn: '门口有一棵树。', en: 'There is a tree at the doorway.' },
    { cn: '他站在门口。', en: 'He is standing at the entrance.' },
  ],
  '门票': [
    { cn: '门票多少钱？', en: 'How much is the admission ticket?' },
    { cn: '我买了两张门票。', en: 'I bought two admission tickets.' },
    { cn: '这个地方不要门票。', en: 'This place doesn\'t require a ticket.' },
  ],
  '们': [
    { cn: '同学们好！', en: 'Hello, classmates!' },
    { cn: '他们是我的朋友。', en: 'They are my friends.' },
    { cn: '孩子们在外面玩儿。', en: 'The children are playing outside.' },
  ],
  '米饭': [
    { cn: '我想吃米饭。', en: 'I want to eat rice.' },
    { cn: '米饭做好了。', en: 'The rice is ready.' },
    { cn: '中国人常常吃米饭。', en: 'Chinese people often eat rice.' },
  ],
  '面包': [
    { cn: '我早饭吃了面包。', en: 'I had bread for breakfast.' },
    { cn: '这个面包很好吃。', en: 'This bread is very tasty.' },
    { cn: '我去买面包。', en: 'I\'m going to buy bread.' },
  ],
  '面条儿': [
    { cn: '我想吃面条儿。', en: 'I want to eat noodles.' },
    { cn: '这碗面条儿很好吃。', en: 'This bowl of noodles is very delicious.' },
    { cn: '妈妈做的面条儿最好吃。', en: 'Mom\'s noodles are the most delicious.' },
  ],
  '名字': [
    { cn: '你叫什么名字？', en: 'What is your name?' },
    { cn: '他的名字很好听。', en: 'His name sounds very nice.' },
    { cn: '请写下你的名字。', en: 'Please write down your name.' },
  ],
  '明白': [
    { cn: '我明白了。', en: 'I understand now.' },
    { cn: '你明白我的意思吗？', en: 'Do you understand what I mean?' },
    { cn: '这个问题我不明白。', en: 'I don\'t understand this question.' },
  ],
  '明年': [
    { cn: '明年我要去中国。', en: 'Next year I\'m going to China.' },
    { cn: '明年他上大学。', en: 'He will go to university next year.' },
    { cn: '明年再来吧。', en: 'Come again next year.' },
  ],
  '明天': [
    { cn: '明天是星期六。', en: 'Tomorrow is Saturday.' },
    { cn: '明天见！', en: 'See you tomorrow!' },
    { cn: '明天你有空吗？', en: 'Are you free tomorrow?' },
  ],
  '拿': [
    { cn: '请拿好你的东西。', en: 'Please hold on to your belongings.' },
    { cn: '他手里拿着一本书。', en: 'He is holding a book in his hand.' },
    { cn: '我帮你拿吧。', en: 'Let me carry it for you.' },
  ],
  '哪': [
    { cn: '你是哪国人？', en: 'Which country are you from?' },
    { cn: '你住在哪？', en: 'Where do you live?' },
    { cn: '你去哪？', en: 'Where are you going?' },
  ],
  '哪儿': [
    { cn: '你去哪儿？', en: 'Where are you going?' },
    { cn: '你家在哪儿？', en: 'Where is your home?' },
    { cn: '你在哪儿工作？', en: 'Where do you work?' },
  ],
  '哪里': [
    { cn: '你家在哪里？', en: 'Where is your home?' },
    { cn: '哪里，哪里。', en: 'You flatter me.' },
    { cn: '你从哪里来？', en: 'Where are you from?' },
  ],
  '哪些': [
    { cn: '你喜欢哪些水果？', en: 'Which fruits do you like?' },
    { cn: '哪些是你的书？', en: 'Which ones are your books?' },
    { cn: '明天要带哪些东西？', en: 'What things do we need to bring tomorrow?' },
  ],
  '那': [
    { cn: '那是我的书。', en: 'That is my book.' },
    { cn: '那个人是谁？', en: 'Who is that person?' },
    { cn: '那你明天来吧。', en: 'Then come tomorrow.' },
  ],
  '那边': [
    { cn: '学校在那边。', en: 'The school is over there.' },
    { cn: '那边有一个公园。', en: 'There is a park over there.' },
    { cn: '你看那边。', en: 'Look over there.' },
  ],
  '那儿': [
    { cn: '我在那儿等你。', en: 'I\'ll wait for you there.' },
    { cn: '那儿有一个商店。', en: 'There is a shop there.' },
    { cn: '你去过那儿吗？', en: 'Have you been there?' },
  ],
  '那里': [
    { cn: '他住在那里。', en: 'He lives there.' },
    { cn: '那里的风景很美。', en: 'The scenery there is very beautiful.' },
    { cn: '你能带我去那里吗？', en: 'Can you take me there?' },
  ],
  '那些': [
    { cn: '那些书是我的。', en: 'Those books are mine.' },
    { cn: '那些人是谁？', en: 'Who are those people?' },
    { cn: '我不认识那些字。', en: 'I don\'t know those characters.' },
  ],
  '奶': [
    { cn: '他喝了一杯奶。', en: 'He drank a glass of milk.' },
    { cn: '这个奶很新鲜。', en: 'This milk is very fresh.' },
    { cn: '我每天都喝奶。', en: 'I drink milk every day.' },
  ],
  '奶奶': [
    { cn: '奶奶，您好！', en: 'Hello, Grandma!' },
    { cn: '我奶奶今年八十岁了。', en: 'My grandma is eighty years old this year.' },
    { cn: '奶奶做的菜很好吃。', en: 'Grandma\'s cooking is very delicious.' },
  ],
  '男': [
    { cn: '他是一个男老师。', en: 'He is a male teacher.' },
    { cn: '那个男的是谁？', en: 'Who is that man?' },
    { cn: '男女都可以参加。', en: 'Both men and women can participate.' },
  ],
  '男孩儿': [
    { cn: '那个男孩儿很可爱。', en: 'That boy is very cute.' },
    { cn: '他们有一个男孩儿。', en: 'They have a boy.' },
    { cn: '男孩儿在操场上踢球。', en: 'The boy is playing soccer on the field.' },
  ],
  '男朋友': [
    { cn: '她有男朋友了。', en: 'She has a boyfriend.' },
    { cn: '你的男朋友是做什么的？', en: 'What does your boyfriend do?' },
    { cn: '她的男朋友很帅。', en: 'Her boyfriend is very handsome.' },
  ],
  '男人': [
    { cn: '那个男人是我爸爸。', en: 'That man is my father.' },
    { cn: '他是一个好男人。', en: 'He is a good man.' },
    { cn: '门口站着一个男人。', en: 'A man is standing at the entrance.' },
  ],
  '男生': [
    { cn: '我们班有十个男生。', en: 'There are ten boys in our class.' },
    { cn: '他是新来的男生。', en: 'He is the new boy.' },
    { cn: '男生站在左边。', en: 'The boys stand on the left.' },
  ],
  '南': [
    { cn: '他家在城市的南边。', en: 'His home is in the south of the city.' },
    { cn: '南方的天气比较热。', en: 'The weather in the south is relatively hot.' },
    { cn: '鸟往南飞了。', en: 'The birds flew south.' },
  ],
  '南边': [
    { cn: '学校在我家南边。', en: 'The school is to the south of my home.' },
    { cn: '南边有一条河。', en: 'There is a river to the south.' },
    { cn: '公园在商店南边。', en: 'The park is to the south of the store.' },
  ],
  '难': [
    { cn: '这个题很难。', en: 'This question is very difficult.' },
    { cn: '汉字不难写。', en: 'Chinese characters are not hard to write.' },
    { cn: '学中文难不难？', en: 'Is it difficult to learn Chinese?' },
  ],
  '呢': [
    { cn: '你呢？', en: 'And you?' },
    { cn: '他在哪儿呢？', en: 'Where is he?' },
    { cn: '你的书呢？', en: 'Where is your book?' },
  ],
  '能': [
    { cn: '你能帮我吗？', en: 'Can you help me?' },
    { cn: '我不能去了。', en: 'I can\'t go anymore.' },
    { cn: '他能说三种语言。', en: 'He can speak three languages.' },
  ],
  '你': [
    { cn: '你好！', en: 'Hello!' },
    { cn: '你是哪里人？', en: 'Where are you from?' },
    { cn: '我想告诉你一件事。', en: 'I want to tell you something.' },
  ],
  '你们': [
    { cn: '你们好！', en: 'Hello, everyone!' },
    { cn: '你们是哪个班的？', en: 'Which class are you from?' },
    { cn: '你们想吃什么？', en: 'What do you all want to eat?' },
  ],
  '年': [
    { cn: '今年是二零二六年。', en: 'This year is 2026.' },
    { cn: '他在中国住了三年。', en: 'He lived in China for three years.' },
    { cn: '新年快乐！', en: 'Happy New Year!' },
  ],
  '您': [
    { cn: '您好！', en: 'Hello! (polite)' },
    { cn: '请问您贵姓？', en: 'May I ask your family name?' },
    { cn: '请您坐。', en: 'Please have a seat. (polite)' },
  ],
  '牛奶': [
    { cn: '我每天都喝牛奶。', en: 'I drink milk every day.' },
    { cn: '牛奶很好喝。', en: 'Milk tastes good.' },
    { cn: '给我一杯牛奶。', en: 'Give me a glass of milk.' },
  ],
  '女': [
    { cn: '她是一个女老师。', en: 'She is a female teacher.' },
    { cn: '那个女的是谁？', en: 'Who is that woman?' },
    { cn: '女孩子们在唱歌。', en: 'The girls are singing.' },
  ],
  '女儿': [
    { cn: '她有一个女儿。', en: 'She has a daughter.' },
    { cn: '我女儿今年六岁。', en: 'My daughter is six years old this year.' },
    { cn: '他的女儿很漂亮。', en: 'His daughter is very beautiful.' },
  ],
  '女孩儿': [
    { cn: '那个女孩儿很可爱。', en: 'That girl is very cute.' },
    { cn: '她们有一个女孩儿。', en: 'They have a girl.' },
    { cn: '女孩儿在看书。', en: 'The girl is reading.' },
  ],
  '女朋友': [
    { cn: '他有女朋友了。', en: 'He has a girlfriend.' },
    { cn: '你的女朋友在哪里？', en: 'Where is your girlfriend?' },
    { cn: '他的女朋友很漂亮。', en: 'His girlfriend is very beautiful.' },
  ],
  '女人': [
    { cn: '那个女人是我妈妈。', en: 'That woman is my mother.' },
    { cn: '她是一个很有能力的女人。', en: 'She is a very capable woman.' },
    { cn: '门口站着一个女人。', en: 'A woman is standing at the entrance.' },
  ],
  '女生': [
    { cn: '我们班有二十个女生。', en: 'There are twenty girls in our class.' },
    { cn: '她是新来的女生。', en: 'She is the new girl.' },
    { cn: '女生站在右边。', en: 'The girls stand on the right.' },
  ],
  '旁边': [
    { cn: '学校旁边有一个公园。', en: 'There is a park next to the school.' },
    { cn: '他坐在我旁边。', en: 'He sits next to me.' },
    { cn: '旁边的人很多。', en: 'There are many people nearby.' },
  ],
  '跑': [
    { cn: '他在操场上跑。', en: 'He is running on the playground.' },
    { cn: '快跑！', en: 'Run!' },
    { cn: '小狗跑得很快。', en: 'The puppy runs very fast.' },
  ],
  '朋友': [
    { cn: '他是我的好朋友。', en: 'He is my good friend.' },
    { cn: '我想和朋友一起去。', en: 'I want to go with my friends.' },
    { cn: '你有很多朋友吗？', en: 'Do you have many friends?' },
  ],
  '票': [
    { cn: '你买票了吗？', en: 'Have you bought a ticket?' },
    { cn: '这张票多少钱？', en: 'How much is this ticket?' },
    { cn: '票卖完了。', en: 'The tickets are sold out.' },
  ],
  '七': [
    { cn: '现在是七点。', en: 'It\'s seven o\'clock now.' },
    { cn: '一个星期有七天。', en: 'There are seven days in a week.' },
    { cn: '他七岁了。', en: 'He is seven years old.' },
  ],
  '起': [
    { cn: '他早上六点起。', en: 'He gets up at six in the morning.' },
    { cn: '风起了。', en: 'The wind has picked up.' },
    { cn: '一、二、三，起！', en: 'One, two, three, lift!' },
  ],
  '起床': [
    { cn: '我每天六点起床。', en: 'I get up at six every day.' },
    { cn: '快起床，要迟到了！', en: 'Get up quickly, you\'ll be late!' },
    { cn: '今天他起床很晚。', en: 'He got up very late today.' },
  ],
  '起来': [
    { cn: '他站起来了。', en: 'He stood up.' },
    { cn: '天气暖和起来了。', en: 'The weather has warmed up.' },
    { cn: '请你起来回答问题。', en: 'Please stand up and answer the question.' },
  ],
  '汽车': [
    { cn: '马路上有很多汽车。', en: 'There are many cars on the road.' },
    { cn: '他开汽车去上班。', en: 'He drives a car to work.' },
    { cn: '我想买一辆汽车。', en: 'I want to buy a car.' },
  ],
  '前': [
    { cn: '前面有一个商店。', en: 'There is a store up ahead.' },
    { cn: '他坐在我前面。', en: 'He sits in front of me.' },
    { cn: '三天前他来了。', en: 'He came three days ago.' },
  ],
  '前边': [
    { cn: '前边有一个饭店。', en: 'There is a restaurant ahead.' },
    { cn: '他坐在我前边。', en: 'He sits in front of me.' },
    { cn: '请往前边走。', en: 'Please walk forward.' },
  ],
  '前天': [
    { cn: '前天下雨了。', en: 'It rained the day before yesterday.' },
    { cn: '他前天到的北京。', en: 'He arrived in Beijing the day before yesterday.' },
    { cn: '前天我去看了电影。', en: 'I went to see a movie the day before yesterday.' },
  ],
  '钱': [
    { cn: '你有多少钱？', en: 'How much money do you have?' },
    { cn: '这个东西不要钱。', en: 'This thing is free.' },
    { cn: '我没有带钱。', en: 'I didn\'t bring money.' },
  ],
  '钱包': [
    { cn: '我的钱包丢了。', en: 'I lost my wallet.' },
    { cn: '这个钱包是新买的。', en: 'This wallet was newly bought.' },
    { cn: '钱包里有多少钱？', en: 'How much money is in the wallet?' },
  ],
  '请': [
    { cn: '请坐。', en: 'Please sit down.' },
    { cn: '请你帮我一下。', en: 'Please help me.' },
    { cn: '我想请你吃饭。', en: 'I want to treat you to a meal.' },
  ],
  '请假': [
    { cn: '我想请假一天。', en: 'I want to take a day off.' },
    { cn: '他今天请假了。', en: 'He took the day off today.' },
    { cn: '请假要跟老师说。', en: 'You need to tell the teacher when taking leave.' },
  ],
  '请进': [
    { cn: '请进，请坐。', en: 'Please come in, please sit down.' },
    { cn: '门开着，请进！', en: 'The door is open, please come in!' },
    { cn: '老师说请进。', en: 'The teacher said please come in.' },
  ],
  '请问': [
    { cn: '请问，去学校怎么走？', en: 'Excuse me, how do I get to the school?' },
    { cn: '请问，这个多少钱？', en: 'Excuse me, how much is this?' },
    { cn: '请问，您是哪位？', en: 'Excuse me, who are you?' },
  ],
  '请坐': [
    { cn: '请坐，请喝茶。', en: 'Please sit down, please have tea.' },
    { cn: '大家请坐。', en: 'Everyone, please have a seat.' },
    { cn: '来，请坐这里。', en: 'Come, please sit here.' },
  ],
  '球': [
    { cn: '他在打球。', en: 'He is playing ball.' },
    { cn: '球在哪儿？', en: 'Where is the ball?' },
    { cn: '我买了一个新球。', en: 'I bought a new ball.' },
  ],
  '去': [
    { cn: '你去哪儿？', en: 'Where are you going?' },
    { cn: '我去学校。', en: 'I\'m going to school.' },
    { cn: '我们一起去吧。', en: 'Let\'s go together.' },
  ],
  '去年': [
    { cn: '去年我去了中国。', en: 'Last year I went to China.' },
    { cn: '去年的冬天很冷。', en: 'Last winter was very cold.' },
    { cn: '他去年开始学中文。', en: 'He started learning Chinese last year.' },
  ],
  '热': [
    { cn: '今天很热。', en: 'It\'s very hot today.' },
    { cn: '水太热了。', en: 'The water is too hot.' },
    { cn: '夏天的北京很热。', en: 'Beijing is very hot in summer.' },
  ],
  '人': [
    { cn: '那个人是谁？', en: 'Who is that person?' },
    { cn: '这里人很多。', en: 'There are many people here.' },
    { cn: '他是一个好人。', en: 'He is a good person.' },
  ],
  '认识': [
    { cn: '认识你很高兴。', en: 'Nice to meet you.' },
    { cn: '你认识他吗？', en: 'Do you know him?' },
    { cn: '我不认识这个字。', en: 'I don\'t know this character.' },
  ],
  '认真': [
    { cn: '他学习很认真。', en: 'He studies very earnestly.' },
    { cn: '请认真听老师讲课。', en: 'Please listen carefully to the teacher.' },
    { cn: '做事要认真。', en: 'You should be serious about your work.' },
  ],
  '日': [
    { cn: '今天是几月几日？', en: 'What is today\'s date?' },
    { cn: '生日快乐！', en: 'Happy birthday!' },
    { cn: '他三月一日来。', en: 'He is coming on March 1st.' },
  ],
  '日期': [
    { cn: '你知道日期吗？', en: 'Do you know the date?' },
    { cn: '请写上日期。', en: 'Please write the date.' },
    { cn: '考试的日期是什么时候？', en: 'When is the exam date?' },
  ],
  '肉': [
    { cn: '我喜欢吃肉。', en: 'I like eating meat.' },
    { cn: '今天的肉很新鲜。', en: 'Today\'s meat is very fresh.' },
    { cn: '他不吃肉。', en: 'He doesn\'t eat meat.' },
  ],
  '三': [
    { cn: '我有三本书。', en: 'I have three books.' },
    { cn: '他们三个人一起去。', en: 'The three of them go together.' },
    { cn: '三点钟开会。', en: 'The meeting is at three o\'clock.' },
  ],
  '山': [
    { cn: '那座山很高。', en: 'That mountain is very high.' },
    { cn: '我们去爬山吧。', en: 'Let\'s go climb a mountain.' },
    { cn: '山上有很多树。', en: 'There are many trees on the mountain.' },
  ],
  '商场': [
    { cn: '我们去商场买东西吧。', en: 'Let\'s go shopping at the mall.' },
    { cn: '商场里人很多。', en: 'There are many people in the mall.' },
    { cn: '这个商场很大。', en: 'This shopping mall is very big.' },
  ],
  '商店': [
    { cn: '学校旁边有一个商店。', en: 'There is a shop next to the school.' },
    { cn: '商店几点关门？', en: 'What time does the store close?' },
    { cn: '我去商店买东西。', en: 'I\'m going to the store to buy things.' },
  ],
  '上': [
    { cn: '书在桌子上。', en: 'The book is on the table.' },
    { cn: '他上楼了。', en: 'He went upstairs.' },
    { cn: '请上车。', en: 'Please get on the vehicle.' },
  ],
  '上班': [
    { cn: '他每天八点上班。', en: 'He goes to work at eight every day.' },
    { cn: '妈妈去上班了。', en: 'Mom went to work.' },
    { cn: '你在哪儿上班？', en: 'Where do you work?' },
  ],
  '上边': [
    { cn: '书在桌子上边。', en: 'The book is on top of the table.' },
    { cn: '上边有你的名字。', en: 'Your name is on top.' },
    { cn: '山的上边有一棵树。', en: 'There is a tree on top of the mountain.' },
  ],
  '上车': [
    { cn: '请上车。', en: 'Please get in the car.' },
    { cn: '大家快上车吧。', en: 'Everyone, get on the bus quickly.' },
    { cn: '我们在哪儿上车？', en: 'Where do we get on?' },
  ],
  '上次': [
    { cn: '上次见你是什么时候？', en: 'When was the last time I saw you?' },
    { cn: '上次我去了北京。', en: 'Last time I went to Beijing.' },
    { cn: '上次的考试你考得怎么样？', en: 'How did you do on the last exam?' },
  ],
  '上课': [
    { cn: '我们八点上课。', en: 'We have class at eight.' },
    { cn: '上课的时候不要说话。', en: 'Don\'t talk during class.' },
    { cn: '他在上课，不能接电话。', en: 'He is in class and can\'t answer the phone.' },
  ],
  '上网': [
    { cn: '我在上网。', en: 'I am surfing the Internet.' },
    { cn: '他喜欢上网。', en: 'He likes going online.' },
    { cn: '现在可以上网了。', en: 'You can go online now.' },
  ],
  '上午': [
    { cn: '上午我在学校上课。', en: 'In the morning I have class at school.' },
    { cn: '今天上午很忙。', en: 'This morning was very busy.' },
    { cn: '上午九点来找我。', en: 'Come find me at nine in the morning.' },
  ],
  '上学': [
    { cn: '孩子们去上学了。', en: 'The children went to school.' },
    { cn: '他每天走路上学。', en: 'He walks to school every day.' },
    { cn: '你在哪里上学？', en: 'Where do you go to school?' },
  ],
  '少': [
    { cn: '这里的人很少。', en: 'There are few people here.' },
    { cn: '他少说话，多做事。', en: 'He talks less and does more.' },
    { cn: '钱太少了。', en: 'The money is too little.' },
  ],
  '身上': [
    { cn: '他身上有一百块钱。', en: 'He has one hundred yuan on him.' },
    { cn: '小猫跳到我身上了。', en: 'The kitten jumped onto me.' },
    { cn: '你身上怎么了？', en: 'What happened to you?' },
  ],
  '身体': [
    { cn: '他的身体很好。', en: 'His health is very good.' },
    { cn: '运动对身体好。', en: 'Exercise is good for the body.' },
    { cn: '你身体怎么样？', en: 'How is your health?' },
  ],
  '什么': [
    { cn: '你叫什么名字？', en: 'What is your name?' },
    { cn: '你在做什么？', en: 'What are you doing?' },
    { cn: '这是什么？', en: 'What is this?' },
  ],
  '生病': [
    { cn: '他生病了，不能来上课。', en: 'He is sick and can\'t come to class.' },
    { cn: '你生病了吗？', en: 'Are you sick?' },
    { cn: '天冷了，容易生病。', en: 'When it gets cold, it\'s easy to get sick.' },
  ],
  '生气': [
    { cn: '别生气了。', en: 'Don\'t be angry.' },
    { cn: '他很生气。', en: 'He is very angry.' },
    { cn: '妈妈生我的气了。', en: 'Mom is angry with me.' },
  ],
  '生日': [
    { cn: '今天是我的生日。', en: 'Today is my birthday.' },
    { cn: '生日快乐！', en: 'Happy birthday!' },
    { cn: '你的生日是哪天？', en: 'When is your birthday?' },
  ],
  '十': [
    { cn: '我有十块钱。', en: 'I have ten yuan.' },
    { cn: '他十岁了。', en: 'He is ten years old.' },
    { cn: '十个人都来了。', en: 'All ten people have come.' },
  ],
  '时候': [
    { cn: '你什么时候来？', en: 'When will you come?' },
    { cn: '小时候我很喜欢唱歌。', en: 'When I was little, I loved singing.' },
    { cn: '吃饭的时候不要看书。', en: 'Don\'t read while eating.' },
  ],
  '时间': [
    { cn: '你有时间吗？', en: 'Do you have time?' },
    { cn: '时间过得真快。', en: 'Time really flies.' },
    { cn: '我没有时间了。', en: 'I don\'t have time anymore.' },
  ],
  '事': [
    { cn: '你有什么事？', en: 'What\'s the matter?' },
    { cn: '今天有很多事要做。', en: 'There are many things to do today.' },
    { cn: '没事，你忙吧。', en: 'It\'s nothing, go ahead with your work.' },
  ],
  '试': [
    { cn: '你试一下。', en: 'Give it a try.' },
    { cn: '我想试试这件衣服。', en: 'I want to try on this piece of clothing.' },
    { cn: '让我试试。', en: 'Let me try.' },
  ],
  '是': [
    { cn: '我是中国人。', en: 'I am Chinese.' },
    { cn: '他是老师。', en: 'He is a teacher.' },
    { cn: '这是我的书。', en: 'This is my book.' },
  ],
  '是不是': [
    { cn: '他是不是你的朋友？', en: 'Is he your friend or not?' },
    { cn: '你是不是生病了？', en: 'Are you sick?' },
    { cn: '明天是不是星期天？', en: 'Is tomorrow Sunday?' },
  ],
  '手': [
    { cn: '请举手。', en: 'Please raise your hand.' },
    { cn: '他的手很大。', en: 'His hands are very big.' },
    { cn: '先洗手再吃饭。', en: 'Wash your hands before eating.' },
  ],
  '手机': [
    { cn: '我的手机在哪儿？', en: 'Where is my phone?' },
    { cn: '他买了一个新手机。', en: 'He bought a new phone.' },
    { cn: '上课不能玩手机。', en: 'You can\'t use your phone during class.' },
  ],
  '书': [
    { cn: '我在看书。', en: 'I am reading a book.' },
    { cn: '这本书很好看。', en: 'This book is very good.' },
    { cn: '你的书在桌子上。', en: 'Your book is on the table.' },
  ],
  '书包': [
    { cn: '我的书包很重。', en: 'My schoolbag is very heavy.' },
    { cn: '书包里有什么？', en: 'What\'s in the schoolbag?' },
    { cn: '他买了一个新书包。', en: 'He bought a new schoolbag.' },
  ],
  '书店': [
    { cn: '我在书店买了一本书。', en: 'I bought a book at the bookstore.' },
    { cn: '书店在学校旁边。', en: 'The bookstore is next to the school.' },
    { cn: '我们去书店看看吧。', en: 'Let\'s go to the bookstore and have a look.' },
  ],
  '树': [
    { cn: '这棵树很高。', en: 'This tree is very tall.' },
    { cn: '公园里有很多树。', en: 'There are many trees in the park.' },
    { cn: '树上有一只鸟。', en: 'There is a bird in the tree.' },
  ],
  '谁': [
    { cn: '他是谁？', en: 'Who is he?' },
    { cn: '谁来了？', en: 'Who came?' },
    { cn: '这是谁的书？', en: 'Whose book is this?' },
  ],
  '水': [
    { cn: '请给我一杯水。', en: 'Please give me a glass of water.' },
    { cn: '多喝水。', en: 'Drink more water.' },
    { cn: '这里的水很干净。', en: 'The water here is very clean.' },
  ],
  '水果': [
    { cn: '我喜欢吃水果。', en: 'I like eating fruit.' },
    { cn: '这些水果很新鲜。', en: 'These fruits are very fresh.' },
    { cn: '你最喜欢什么水果？', en: 'What is your favorite fruit?' },
  ],
  '睡': [
    { cn: '他在床上睡着了。', en: 'He fell asleep on the bed.' },
    { cn: '你昨天几点睡的？', en: 'What time did you go to sleep last night?' },
    { cn: '我想睡一会儿。', en: 'I want to sleep for a while.' },
  ],
  '睡觉': [
    { cn: '我每天十点睡觉。', en: 'I go to bed at ten every day.' },
    { cn: '他在睡觉。', en: 'He is sleeping.' },
    { cn: '快去睡觉吧。', en: 'Go to sleep now.' },
  ],
  '说': [
    { cn: '请你说一下。', en: 'Please say it.' },
    { cn: '他说的是中文。', en: 'He is speaking Chinese.' },
    { cn: '你说什么？', en: 'What did you say?' },
  ],
  '说话': [
    { cn: '请小声说话。', en: 'Please speak quietly.' },
    { cn: '他在跟朋友说话。', en: 'He is talking to a friend.' },
    { cn: '上课不要说话。', en: 'Don\'t talk in class.' },
  ],
  '四': [
    { cn: '一年有四个季节。', en: 'There are four seasons in a year.' },
    { cn: '他有四本书。', en: 'He has four books.' },
    { cn: '现在四点了。', en: 'It\'s four o\'clock now.' },
  ],
  '送': [
    { cn: '我送你一本书。', en: 'I\'ll give you a book as a gift.' },
    { cn: '他送我去机场。', en: 'He is seeing me off at the airport.' },
    { cn: '谁送的花？', en: 'Who sent the flowers?' },
  ],
  '岁': [
    { cn: '你今年多大岁数？', en: 'How old are you this year?' },
    { cn: '他二十岁了。', en: 'He is twenty years old.' },
    { cn: '我女儿三岁了。', en: 'My daughter is three years old.' },
  ],
  '他': [
    { cn: '他是我的朋友。', en: 'He is my friend.' },
    { cn: '你认识他吗？', en: 'Do you know him?' },
    { cn: '他在那儿。', en: 'He is over there.' },
  ],
  '他们': [
    { cn: '他们是学生。', en: 'They are students.' },
    { cn: '他们在打球。', en: 'They are playing ball.' },
    { cn: '请告诉他们。', en: 'Please tell them.' },
  ],
  '她': [
    { cn: '她是我的老师。', en: 'She is my teacher.' },
    { cn: '你认识她吗？', en: 'Do you know her?' },
    { cn: '她很漂亮。', en: 'She is very beautiful.' },
  ],
  '她们': [
    { cn: '她们是我的同学。', en: 'They are my classmates.' },
    { cn: '她们在唱歌。', en: 'They (the girls) are singing.' },
    { cn: '你认识她们吗？', en: 'Do you know them?' },
  ],
  '太': [
    { cn: '太好了！', en: 'Great!' },
    { cn: '这个东西太贵了。', en: 'This thing is too expensive.' },
    { cn: '今天太热了。', en: 'It\'s too hot today.' },
  ],
  '天': [
    { cn: '今天天气很好。', en: 'The weather is nice today.' },
    { cn: '天黑了。', en: 'It\'s gotten dark.' },
    { cn: '他在中国住了三天。', en: 'He stayed in China for three days.' },
  ],
  '天气': [
    { cn: '今天天气很好。', en: 'The weather is very nice today.' },
    { cn: '明天的天气怎么样？', en: 'How will the weather be tomorrow?' },
    { cn: '天气越来越冷了。', en: 'The weather is getting colder and colder.' },
  ],
  '听': [
    { cn: '请认真听。', en: 'Please listen carefully.' },
    { cn: '我在听音乐。', en: 'I am listening to music.' },
    { cn: '你听见了吗？', en: 'Did you hear it?' },
  ],
  '听到': [
    { cn: '我听到了一个声音。', en: 'I heard a sound.' },
    { cn: '你听到他说什么了吗？', en: 'Did you hear what he said?' },
    { cn: '我没听到。', en: 'I didn\'t hear it.' },
  ],
  '听见': [
    { cn: '你听见了吗？', en: 'Did you hear it?' },
    { cn: '我没有听见。', en: 'I didn\'t hear it.' },
    { cn: '她听见有人在叫她。', en: 'She heard someone calling her.' },
  ],
  '听写': [
    { cn: '今天有听写。', en: 'There is a dictation test today.' },
    { cn: '老师让我们听写生词。', en: 'The teacher asked us to do a dictation of new words.' },
    { cn: '我的听写错了两个字。', en: 'I got two characters wrong in the dictation.' },
  ],
  '同学': [
    { cn: '他是我的同学。', en: 'He is my classmate.' },
    { cn: '同学们好！', en: 'Hello, classmates!' },
    { cn: '我和同学一起去图书馆。', en: 'I go to the library with my classmates.' },
  ],
  '图书馆': [
    { cn: '我在图书馆看书。', en: 'I am reading at the library.' },
    { cn: '图书馆在学校旁边。', en: 'The library is next to the school.' },
    { cn: '图书馆里很安静。', en: 'It is very quiet in the library.' },
  ],
  '外': [
    { cn: '外面下雨了。', en: 'It\'s raining outside.' },
    { cn: '你在门外等我。', en: 'Wait for me outside the door.' },
    { cn: '除了他以外，别人都来了。', en: 'Aside from him, everyone else came.' },
  ],
  '外边': [
    { cn: '外边在下雨。', en: 'It\'s raining outside.' },
    { cn: '外边有人在等你。', en: 'Someone is waiting for you outside.' },
    { cn: '我们去外边走走吧。', en: 'Let\'s go for a walk outside.' },
  ],
  '外国': [
    { cn: '他是外国人。', en: 'He is a foreigner.' },
    { cn: '我没去过外国。', en: 'I have never been to a foreign country.' },
    { cn: '这个学校有很多外国学生。', en: 'This school has many foreign students.' },
  ],
  '外语': [
    { cn: '你会说几种外语？', en: 'How many foreign languages can you speak?' },
    { cn: '学外语很重要。', en: 'Learning foreign languages is important.' },
    { cn: '她的外语说得很好。', en: 'She speaks foreign languages very well.' },
  ],
  '玩儿': [
    { cn: '我们出去玩儿吧。', en: 'Let\'s go out and have fun.' },
    { cn: '孩子在外面玩儿。', en: 'The children are playing outside.' },
    { cn: '你喜欢去哪儿玩儿？', en: 'Where do you like to go for fun?' },
  ],
  '晚': [
    { cn: '太晚了，快回家吧。', en: 'It\'s too late, go home quickly.' },
    { cn: '他来晚了。', en: 'He came late.' },
    { cn: '今天晚上你有空吗？', en: 'Are you free tonight?' },
  ],
  '晚饭': [
    { cn: '晚饭吃什么？', en: 'What are we having for dinner?' },
    { cn: '妈妈在做晚饭。', en: 'Mom is making dinner.' },
    { cn: '我们六点吃晚饭。', en: 'We eat dinner at six.' },
  ],
  '晚上': [
    { cn: '晚上好！', en: 'Good evening!' },
    { cn: '我晚上看电视。', en: 'I watch TV in the evening.' },
    { cn: '晚上我们去吃饭吧。', en: 'Let\'s go eat dinner in the evening.' },
  ],
  '网上': [
    { cn: '我在网上买东西。', en: 'I buy things online.' },
    { cn: '网上有很多信息。', en: 'There is a lot of information online.' },
    { cn: '你在网上做什么？', en: 'What are you doing online?' },
  ],
  '网友': [
    { cn: '他有很多网友。', en: 'He has many online friends.' },
    { cn: '我和网友见面了。', en: 'I met my online friend.' },
    { cn: '不要随便相信网友。', en: 'Don\'t easily trust online friends.' },
  ],
  '忘': [
    { cn: '我忘了。', en: 'I forgot.' },
    { cn: '别忘了带书。', en: 'Don\'t forget to bring your book.' },
    { cn: '他忘了她的名字。', en: 'He forgot her name.' },
  ],
  '忘记': [
    { cn: '我忘记带钱了。', en: 'I forgot to bring money.' },
    { cn: '不要忘记做作业。', en: 'Don\'t forget to do your homework.' },
    { cn: '她忘记了那件事。', en: 'She forgot about that matter.' },
  ],
  '问': [
    { cn: '我想问你一个问题。', en: 'I want to ask you a question.' },
    { cn: '他问我去不去。', en: 'He asked me whether I\'m going or not.' },
    { cn: '有问题就问老师。', en: 'If you have questions, ask the teacher.' },
  ],
  '我': [
    { cn: '我是学生。', en: 'I am a student.' },
    { cn: '请给我看看。', en: 'Please show me.' },
    { cn: '我想喝水。', en: 'I want to drink water.' },
  ],
  '我们': [
    { cn: '我们是好朋友。', en: 'We are good friends.' },
    { cn: '我们一起去吧。', en: 'Let\'s go together.' },
    { cn: '这是我们的教室。', en: 'This is our classroom.' },
  ],
  '五': [
    { cn: '他有五本书。', en: 'He has five books.' },
    { cn: '现在是五点。', en: 'It\'s five o\'clock now.' },
    { cn: '我等了五分钟。', en: 'I waited for five minutes.' },
  ],
  '午饭': [
    { cn: '你吃午饭了吗？', en: 'Have you eaten lunch?' },
    { cn: '午饭我吃了米饭。', en: 'I had rice for lunch.' },
    { cn: '我们一起去吃午饭吧。', en: 'Let\'s go have lunch together.' },
  ],
  '洗': [
    { cn: '我去洗手。', en: 'I\'m going to wash my hands.' },
    { cn: '她在洗衣服。', en: 'She is washing clothes.' },
    { cn: '你洗澡了吗？', en: 'Have you taken a bath?' },
  ],
  '洗手间': [
    { cn: '请问，洗手间在哪儿？', en: 'Excuse me, where is the restroom?' },
    { cn: '我去一下洗手间。', en: 'I\'m going to the restroom.' },
    { cn: '洗手间在那边。', en: 'The restroom is over there.' },
  ],
  '喜欢': [
    { cn: '我喜欢看书。', en: 'I like reading.' },
    { cn: '你喜欢吃什么？', en: 'What do you like to eat?' },
    { cn: '她很喜欢这个地方。', en: 'She likes this place very much.' },
  ],
  '西': [
    { cn: '太阳从西边落下。', en: 'The sun sets in the west.' },
    { cn: '他住在城市的西面。', en: 'He lives on the west side of the city.' },
    { cn: '学校在西边。', en: 'The school is to the west.' },
  ],
  '西边': [
    { cn: '学校在我家西边。', en: 'The school is to the west of my home.' },
    { cn: '西边有一个商场。', en: 'There is a shopping mall to the west.' },
    { cn: '请往西边走。', en: 'Please walk west.' },
  ],
  '下': [
    { cn: '桌子下面有一只猫。', en: 'There is a cat under the table.' },
    { cn: '请下车。', en: 'Please get off the vehicle.' },
    { cn: '下个星期见。', en: 'See you next week.' },
  ],
  '下班': [
    { cn: '你几点下班？', en: 'What time do you get off work?' },
    { cn: '他下班了。', en: 'He got off work.' },
    { cn: '下班以后我去买菜。', en: 'After work I go buy groceries.' },
  ],
  '下边': [
    { cn: '桌子下边有一本书。', en: 'There is a book under the table.' },
    { cn: '下边还有一页。', en: 'There is another page below.' },
    { cn: '请看下边的内容。', en: 'Please look at the content below.' },
  ],
  '下车': [
    { cn: '我们到了，请下车。', en: 'We\'ve arrived, please get off.' },
    { cn: '他在学校门口下车。', en: 'He gets off at the school entrance.' },
    { cn: '下一站我要下车。', en: 'I need to get off at the next stop.' },
  ],
  '下次': [
    { cn: '下次再来玩吧。', en: 'Come play again next time.' },
    { cn: '下次注意一点。', en: 'Be more careful next time.' },
    { cn: '下次我请你吃饭。', en: 'Next time I\'ll treat you to a meal.' },
  ],
  '下课': [
    { cn: '下课了！', en: 'Class is over!' },
    { cn: '下课以后我们去吃饭。', en: 'Let\'s go eat after class.' },
    { cn: '还有十分钟下课。', en: 'There are ten more minutes until class ends.' },
  ],
  '下午': [
    { cn: '下午我有课。', en: 'I have class this afternoon.' },
    { cn: '下午两点见。', en: 'See you at two this afternoon.' },
    { cn: '他下午去图书馆。', en: 'He goes to the library in the afternoon.' },
  ],
  '下雨': [
    { cn: '外面在下雨。', en: 'It\'s raining outside.' },
    { cn: '明天可能会下雨。', en: 'It might rain tomorrow.' },
    { cn: '下雨了，带把伞吧。', en: 'It\'s raining, bring an umbrella.' },
  ],
  '先': [
    { cn: '你先走吧。', en: 'You go first.' },
    { cn: '先吃饭，再做作业。', en: 'Eat first, then do homework.' },
    { cn: '请先坐一会儿。', en: 'Please have a seat first.' },
  ],
  '先生': [
    { cn: '先生，您好！', en: 'Hello, sir!' },
    { cn: '王先生在家吗？', en: 'Is Mr. Wang at home?' },
    { cn: '她先生是医生。', en: 'Her husband is a doctor.' },
  ],
  '现在': [
    { cn: '现在几点了？', en: 'What time is it now?' },
    { cn: '他现在在北京。', en: 'He is in Beijing now.' },
    { cn: '现在开始上课。', en: 'Class starts now.' },
  ],
  '想': [
    { cn: '我想你了。', en: 'I miss you.' },
    { cn: '你想吃什么？', en: 'What do you want to eat?' },
    { cn: '我想去中国。', en: 'I want to go to China.' },
  ],
  '小': [
    { cn: '这个房间很小。', en: 'This room is very small.' },
    { cn: '他有一只小猫。', en: 'He has a small cat.' },
    { cn: '她是我小妹。', en: 'She is my youngest sister.' },
  ],
  '小孩儿': [
    { cn: '那个小孩儿真可爱。', en: 'That child is really cute.' },
    { cn: '公园里有很多小孩儿。', en: 'There are many children in the park.' },
    { cn: '小孩儿不能一个人出去。', en: 'Children can\'t go out alone.' },
  ],
  '小姐': [
    { cn: '小姐，你好！', en: 'Hello, miss!' },
    { cn: '王小姐在吗？', en: 'Is Miss Wang here?' },
    { cn: '这位小姐是我的同事。', en: 'This young lady is my colleague.' },
  ],
  '小朋友': [
    { cn: '小朋友们好！', en: 'Hello, children!' },
    { cn: '那个小朋友在哭。', en: 'That child is crying.' },
    { cn: '小朋友都喜欢玩儿。', en: 'Children all like to play.' },
  ],
  '小时': [
    { cn: '我等了两个小时。', en: 'I waited for two hours.' },
    { cn: '从这儿到那儿要一个小时。', en: 'It takes one hour from here to there.' },
    { cn: '他每天学习三个小时。', en: 'He studies for three hours every day.' },
  ],
  '小学': [
    { cn: '我弟弟在上小学。', en: 'My younger brother is in elementary school.' },
    { cn: '这个小学很有名。', en: 'This elementary school is very famous.' },
    { cn: '小学在哪里？', en: 'Where is the elementary school?' },
  ],
  '小学生': [
    { cn: '他是一个小学生。', en: 'He is an elementary school student.' },
    { cn: '小学生要认真学习。', en: 'Elementary school students should study hard.' },
    { cn: '那些小学生在操场上跑步。', en: 'Those elementary school students are running on the playground.' },
  ],
  '笑': [
    { cn: '她在笑。', en: 'She is laughing.' },
    { cn: '他笑了笑。', en: 'He smiled a little.' },
    { cn: '别笑话我。', en: 'Don\'t laugh at me.' },
  ],
  '写': [
    { cn: '请写下你的名字。', en: 'Please write your name.' },
    { cn: '他在写作业。', en: 'He is doing his homework.' },
    { cn: '这个字怎么写？', en: 'How do you write this character?' },
  ],
  '谢谢': [
    { cn: '谢谢你！', en: 'Thank you!' },
    { cn: '非常谢谢！', en: 'Thank you very much!' },
    { cn: '谢谢你的帮助。', en: 'Thank you for your help.' },
  ],
  '新': [
    { cn: '我买了一本新书。', en: 'I bought a new book.' },
    { cn: '他穿了一件新衣服。', en: 'He is wearing a new piece of clothing.' },
    { cn: '这个学校是新的。', en: 'This school is new.' },
  ],
  '新年': [
    { cn: '新年快乐！', en: 'Happy New Year!' },
    { cn: '新年要到了。', en: 'The New Year is coming.' },
    { cn: '你新年有什么打算？', en: 'What are your plans for the New Year?' },
  ],
  '星期': [
    { cn: '一个星期有七天。', en: 'There are seven days in a week.' },
    { cn: '今天星期几？', en: 'What day of the week is today?' },
    { cn: '下个星期我去北京。', en: 'I am going to Beijing next week.' },
  ],
  '星期日': [
    { cn: '星期日我不上班。', en: 'I don\'t work on Sunday.' },
    { cn: '星期日你想做什么？', en: 'What do you want to do on Sunday?' },
    { cn: '我们星期日去公园吧。', en: 'Let\'s go to the park on Sunday.' },
  ],
  '星期天': [
    { cn: '星期天我休息。', en: 'I rest on Sunday.' },
    { cn: '星期天你有时间吗？', en: 'Are you free on Sunday?' },
    { cn: '我们星期天见面吧。', en: 'Let\'s meet on Sunday.' },
  ],
  '行': [
    { cn: '行，没问题。', en: 'OK, no problem.' },
    { cn: '这样行不行？', en: 'Is this OK?' },
    { cn: '你看这样行吗？', en: 'Do you think this will work?' },
  ],
  '休息': [
    { cn: '你应该多休息。', en: 'You should rest more.' },
    { cn: '我们休息一下吧。', en: 'Let\'s take a break.' },
    { cn: '周末好好休息。', en: 'Rest well on the weekend.' },
  ],
  '学': [
    { cn: '我在学中文。', en: 'I am learning Chinese.' },
    { cn: '你想学什么？', en: 'What do you want to learn?' },
    { cn: '他学得很快。', en: 'He learns very quickly.' },
  ],
  '学生': [
    { cn: '我是学生。', en: 'I am a student.' },
    { cn: '学生都在教室里。', en: 'The students are all in the classroom.' },
    { cn: '他是一个好学生。', en: 'He is a good student.' },
  ],
  '学习': [
    { cn: '我在学习汉语。', en: 'I am studying Chinese.' },
    { cn: '学习是很重要的事情。', en: 'Studying is a very important thing.' },
    { cn: '他每天都认真学习。', en: 'He studies earnestly every day.' },
  ],
  '学校': [
    { cn: '我在学校上课。', en: 'I have class at school.' },
    { cn: '学校离我家很近。', en: 'The school is very close to my home.' },
    { cn: '这个学校很大。', en: 'This school is very big.' },
  ],
  '学院': [
    { cn: '他在外语学院学习。', en: 'He studies at the Foreign Languages School.' },
    { cn: '这个学院很有名。', en: 'This college is very famous.' },
    { cn: '学院里有很多老师。', en: 'There are many teachers in the college.' },
  ],
  '要': [
    { cn: '我要去北京。', en: 'I want to go to Beijing.' },
    { cn: '你要什么？', en: 'What do you want?' },
    { cn: '快要下雨了。', en: 'It\'s about to rain.' },
  ],
  '也': [
    { cn: '我也是学生。', en: 'I am also a student.' },
    { cn: '他也喜欢看书。', en: 'He also likes reading.' },
    { cn: '我也不知道。', en: 'I don\'t know either.' },
  ],
  '页': [
    { cn: '请翻到第三页。', en: 'Please turn to page three.' },
    { cn: '这本书有两百页。', en: 'This book has two hundred pages.' },
    { cn: '我看了二十页。', en: 'I read twenty pages.' },
  ],
  '爷爷': [
    { cn: '爷爷今年七十岁了。', en: 'Grandpa is seventy years old this year.' },
    { cn: '我爷爷很喜欢喝茶。', en: 'My grandpa likes drinking tea very much.' },
    { cn: '爷爷每天去公园散步。', en: 'Grandpa goes for a walk in the park every day.' },
  ],
  '一': [
    { cn: '我有一本书。', en: 'I have one book.' },
    { cn: '一个人也可以去。', en: 'You can go alone too.' },
    { cn: '他们一家人很开心。', en: 'Their whole family is very happy.' },
  ],
  '一半': [
    { cn: '给你一半。', en: 'Here is half for you.' },
    { cn: '我吃了一半。', en: 'I ate half.' },
    { cn: '工作做了一半了。', en: 'The work is half done.' },
  ],
  '一边': [
    { cn: '他一边吃饭一边看电视。', en: 'He eats while watching TV.' },
    { cn: '请站在一边。', en: 'Please stand to one side.' },
    { cn: '一边是山，一边是水。', en: 'On one side is a mountain, on the other is water.' },
  ],
  '一点儿': [
    { cn: '我会说一点儿中文。', en: 'I can speak a little Chinese.' },
    { cn: '请你说慢一点儿。', en: 'Please speak a bit more slowly.' },
    { cn: '一点儿也不难。', en: 'It\'s not difficult at all.' },
  ],
  '一会儿': [
    { cn: '请等一会儿。', en: 'Please wait a moment.' },
    { cn: '我一会儿就来。', en: 'I\'ll be there in a moment.' },
    { cn: '一会儿我们去吃饭。', en: 'In a moment we\'ll go eat.' },
  ],
  '一块儿': [
    { cn: '我们一块儿去吧。', en: 'Let\'s go together.' },
    { cn: '他们一块儿学习。', en: 'They study together.' },
    { cn: '我想跟你一块儿走。', en: 'I want to walk with you together.' },
  ],
  '一起': [
    { cn: '我们一起吃饭吧。', en: 'Let\'s eat together.' },
    { cn: '他们一起去学校。', en: 'They go to school together.' },
    { cn: '大家一起来！', en: 'Everyone, come together!' },
  ],
  '一下儿': [
    { cn: '请等一下儿。', en: 'Please wait a moment.' },
    { cn: '我看一下儿。', en: 'Let me take a look.' },
    { cn: '你试一下儿。', en: 'You try it once.' },
  ],
  '一些': [
    { cn: '我买了一些水果。', en: 'I bought some fruit.' },
    { cn: '你有一些什么问题？', en: 'What questions do you have?' },
    { cn: '这里有一些书。', en: 'There are some books here.' },
  ],
  '一样': [
    { cn: '他们两个一样高。', en: 'The two of them are the same height.' },
    { cn: '这两本书一样。', en: 'These two books are the same.' },
    { cn: '你的和我的不一样。', en: 'Yours and mine are different.' },
  ],
  '衣服': [
    { cn: '这件衣服很好看。', en: 'This piece of clothing looks very nice.' },
    { cn: '她在洗衣服。', en: 'She is washing clothes.' },
    { cn: '我想买一件新衣服。', en: 'I want to buy a new piece of clothing.' },
  ],
  '医生': [
    { cn: '他是一个医生。', en: 'He is a doctor.' },
    { cn: '医生说我没事。', en: 'The doctor said I\'m fine.' },
    { cn: '你应该去看医生。', en: 'You should go see a doctor.' },
  ],
  '医院': [
    { cn: '他在医院工作。', en: 'He works at a hospital.' },
    { cn: '医院在学校旁边。', en: 'The hospital is next to the school.' },
    { cn: '我要去医院看病。', en: 'I need to go to the hospital to see a doctor.' },
  ],
  '用': [
    { cn: '请用中文说。', en: 'Please say it in Chinese.' },
    { cn: '你会用筷子吗？', en: 'Can you use chopsticks?' },
    { cn: '这个东西很有用。', en: 'This thing is very useful.' },
  ],
  '有': [
    { cn: '我有一本书。', en: 'I have a book.' },
    { cn: '教室里有很多学生。', en: 'There are many students in the classroom.' },
    { cn: '你有时间吗？', en: 'Do you have time?' },
  ],
  '有的': [
    { cn: '有的人喜欢喝茶，有的人喜欢喝咖啡。', en: 'Some people like tea, some like coffee.' },
    { cn: '有的学生来了，有的没来。', en: 'Some students came, some didn\'t.' },
    { cn: '有的东西很贵。', en: 'Some things are very expensive.' },
  ],
  '有名': [
    { cn: '这个地方很有名。', en: 'This place is very famous.' },
    { cn: '他是一个有名的老师。', en: 'He is a famous teacher.' },
    { cn: '北京大学很有名。', en: 'Peking University is very famous.' },
  ],
  '有时': [
    { cn: '有时我去跑步。', en: 'Sometimes I go running.' },
    { cn: '他有时来看我。', en: 'He comes to see me sometimes.' },
    { cn: '有时天气好，有时天气不好。', en: 'Sometimes the weather is good, sometimes it\'s not.' },
  ],
  '有时候': [
    { cn: '有时候我走路去上班。', en: 'Sometimes I walk to work.' },
    { cn: '有时候他会迟到。', en: 'Sometimes he is late.' },
    { cn: '我有时候很想家。', en: 'Sometimes I miss home very much.' },
  ],
  '有些': [
    { cn: '有些事情很难说。', en: 'Some things are hard to say.' },
    { cn: '我有些累了。', en: 'I\'m somewhat tired.' },
    { cn: '有些人不喜欢吃辣的。', en: 'Some people don\'t like spicy food.' },
  ],
  '有一些': [
    { cn: '我有一些问题。', en: 'I have some questions.' },
    { cn: '桌子上有一些书。', en: 'There are some books on the table.' },
    { cn: '今天有一些冷。', en: 'It\'s somewhat cold today.' },
  ],
  '有用': [
    { cn: '学中文很有用。', en: 'Learning Chinese is very useful.' },
    { cn: '这本书很有用。', en: 'This book is very useful.' },
    { cn: '这个方法很有用。', en: 'This method is very useful.' },
  ],
  '右': [
    { cn: '请往右走。', en: 'Please go right.' },
    { cn: '学校在右边。', en: 'The school is on the right.' },
    { cn: '右手拿笔。', en: 'Hold the pen in your right hand.' },
  ],
  '右边': [
    { cn: '商店在右边。', en: 'The store is on the right side.' },
    { cn: '请坐在右边。', en: 'Please sit on the right side.' },
    { cn: '右边有一个公园。', en: 'There is a park on the right.' },
  ],
  '雨': [
    { cn: '雨下得很大。', en: 'It\'s raining heavily.' },
    { cn: '雨停了。', en: 'The rain has stopped.' },
    { cn: '今天可能有雨。', en: 'There might be rain today.' },
  ],
  '元': [
    { cn: '这本书二十元。', en: 'This book costs twenty yuan.' },
    { cn: '一共多少元？', en: 'How many yuan in total?' },
    { cn: '我身上只有五十元。', en: 'I only have fifty yuan on me.' },
  ],
  '远': [
    { cn: '学校离这儿很远。', en: 'The school is far from here.' },
    { cn: '你家远不远？', en: 'Is your home far?' },
    { cn: '那个地方太远了。', en: 'That place is too far.' },
  ],
  '月': [
    { cn: '一年有十二个月。', en: 'There are twelve months in a year.' },
    { cn: '今天是三月。', en: 'It is March now.' },
    { cn: '下个月我去旅行。', en: 'I\'m going traveling next month.' },
  ],
  '再': [
    { cn: '请再说一次。', en: 'Please say it again.' },
    { cn: '再见！', en: 'Goodbye!' },
    { cn: '我不想再去了。', en: 'I don\'t want to go again.' },
  ],
  '再见': [
    { cn: '再见，明天见！', en: 'Goodbye, see you tomorrow!' },
    { cn: '老师再见！', en: 'Goodbye, teacher!' },
    { cn: '我们说了再见。', en: 'We said goodbye.' },
  ],
  '在': [
    { cn: '他在家。', en: 'He is at home.' },
    { cn: '我在学习中文。', en: 'I am studying Chinese.' },
    { cn: '书在桌子上。', en: 'The book is on the table.' },
  ],
  '在家': [
    { cn: '他在家做饭。', en: 'He is cooking at home.' },
    { cn: '你妈妈在家吗？', en: 'Is your mom at home?' },
    { cn: '我周末在家休息。', en: 'I rest at home on weekends.' },
  ],
  '早': [
    { cn: '早！你好！', en: 'Good morning! Hello!' },
    { cn: '他来得很早。', en: 'He came very early.' },
    { cn: '明天要早一点来。', en: 'Come a little earlier tomorrow.' },
  ],
  '早饭': [
    { cn: '你吃早饭了吗？', en: 'Have you had breakfast?' },
    { cn: '早饭我吃了面包。', en: 'I had bread for breakfast.' },
    { cn: '不要不吃早饭。', en: 'Don\'t skip breakfast.' },
  ],
  '早上': [
    { cn: '早上好！', en: 'Good morning!' },
    { cn: '我早上六点起床。', en: 'I get up at six in the morning.' },
    { cn: '早上的空气很好。', en: 'The morning air is very fresh.' },
  ],
  '怎么': [
    { cn: '这个字怎么写？', en: 'How do you write this character?' },
    { cn: '你怎么了？', en: 'What\'s wrong with you?' },
    { cn: '去学校怎么走？', en: 'How do I get to the school?' },
  ],
  '站': [
    { cn: '请站起来。', en: 'Please stand up.' },
    { cn: '他站在门口。', en: 'He is standing at the entrance.' },
    { cn: '下一站是哪里？', en: 'Where is the next stop?' },
  ],
  '找': [
    { cn: '我在找我的书。', en: 'I am looking for my book.' },
    { cn: '你找谁？', en: 'Who are you looking for?' },
    { cn: '他找到工作了。', en: 'He found a job.' },
  ],
  '找到': [
    { cn: '我找到了！', en: 'I found it!' },
    { cn: '你找到你的钱包了吗？', en: 'Did you find your wallet?' },
    { cn: '他终于找到了工作。', en: 'He finally found a job.' },
  ],
  '这': [
    { cn: '这是我的书。', en: 'This is my book.' },
    { cn: '这个很好。', en: 'This one is very good.' },
    { cn: '你看这个怎么样？', en: 'What do you think of this one?' },
  ],
  '这边': [
    { cn: '请往这边走。', en: 'Please walk this way.' },
    { cn: '这边人少一些。', en: 'There are fewer people on this side.' },
    { cn: '来，这边坐。', en: 'Come, sit over here.' },
  ],
  '这儿': [
    { cn: '我在这儿等你。', en: 'I\'ll wait for you here.' },
    { cn: '这儿有一个公园。', en: 'There is a park here.' },
    { cn: '你来这儿做什么？', en: 'What are you doing here?' },
  ],
  '这里': [
    { cn: '这里很漂亮。', en: 'It\'s very beautiful here.' },
    { cn: '请你坐在这里。', en: 'Please sit here.' },
    { cn: '这里离学校很近。', en: 'It\'s very close to the school here.' },
  ],
  '这些': [
    { cn: '这些书是你的吗？', en: 'Are these books yours?' },
    { cn: '这些苹果很好吃。', en: 'These apples are very tasty.' },
    { cn: '这些人都是我的朋友。', en: 'These people are all my friends.' },
  ],
  '着': [
    { cn: '门开着呢。', en: 'The door is open.' },
    { cn: '他穿着一件白衣服。', en: 'He is wearing a white piece of clothing.' },
    { cn: '她笑着说。', en: 'She said with a smile.' },
  ],
  '真': [
    { cn: '你真好！', en: 'You\'re really great!' },
    { cn: '今天真冷。', en: 'It\'s really cold today.' },
    { cn: '这是真的吗？', en: 'Is this real?' },
  ],
  '真的': [
    { cn: '真的吗？', en: 'Really?' },
    { cn: '这是真的。', en: 'This is true.' },
    { cn: '你真的不去吗？', en: 'Are you really not going?' },
  ],
  '正': [
    { cn: '他说得正对。', en: 'What he said is just right.' },
    { cn: '正好三点钟。', en: 'It\'s exactly three o\'clock.' },
    { cn: '你来得正好。', en: 'You came at just the right time.' },
  ],
  '正在': [
    { cn: '我正在吃饭。', en: 'I am eating right now.' },
    { cn: '他正在看书。', en: 'He is reading right now.' },
    { cn: '她正在打电话。', en: 'She is on the phone right now.' },
  ],
  '知道': [
    { cn: '我知道了。', en: 'I see. / I understand.' },
    { cn: '你知道吗？', en: 'Do you know?' },
    { cn: '我不知道他在哪儿。', en: 'I don\'t know where he is.' },
  ],
  '知识': [
    { cn: '学习知识很重要。', en: 'Learning knowledge is very important.' },
    { cn: '他的知识很丰富。', en: 'His knowledge is very extensive.' },
    { cn: '书里有很多知识。', en: 'There is a lot of knowledge in books.' },
  ],
  '中': [
    { cn: '他在考试中考了第一。', en: 'He came first in the exam.' },
    { cn: '房间中有一张桌子。', en: 'There is a table in the room.' },
    { cn: '他是中学生。', en: 'He is a middle school student.' },
  ],
  '中国': [
    { cn: '我在中国学习。', en: 'I study in China.' },
    { cn: '中国很大。', en: 'China is very big.' },
    { cn: '他去过中国三次。', en: 'He has been to China three times.' },
  ],
  '中间': [
    { cn: '他坐在中间。', en: 'He sits in the middle.' },
    { cn: '学校在医院和商店的中间。', en: 'The school is between the hospital and the store.' },
    { cn: '请把花放在桌子中间。', en: 'Please put the flowers in the middle of the table.' },
  ],
  '中文': [
    { cn: '你会说中文吗？', en: 'Can you speak Chinese?' },
    { cn: '我在学中文。', en: 'I am learning Chinese.' },
    { cn: '他的中文说得很好。', en: 'He speaks Chinese very well.' },
  ],
  '中午': [
    { cn: '中午吃什么？', en: 'What are we eating for lunch?' },
    { cn: '中午我睡了一会儿。', en: 'I took a nap at noon.' },
    { cn: '中午十二点见。', en: 'See you at noon.' },
  ],
  '中学': [
    { cn: '他在中学教书。', en: 'He teaches at a middle school.' },
    { cn: '这个中学很大。', en: 'This middle school is very big.' },
    { cn: '她明年上中学。', en: 'She will go to middle school next year.' },
  ],
  '中学生': [
    { cn: '他是一个中学生。', en: 'He is a middle school student.' },
    { cn: '中学生每天都很忙。', en: 'Middle school students are very busy every day.' },
    { cn: '那些中学生在打球。', en: 'Those middle school students are playing ball.' },
  ],
  '重': [
    { cn: '这个箱子很重。', en: 'This box is very heavy.' },
    { cn: '你的书包太重了。', en: 'Your schoolbag is too heavy.' },
    { cn: '这件事很重要。', en: 'This matter is very important.' },
  ],
  '重要': [
    { cn: '学习很重要。', en: 'Studying is very important.' },
    { cn: '这是一件重要的事。', en: 'This is an important matter.' },
    { cn: '健康最重要。', en: 'Health is the most important.' },
  ],
  '住': [
    { cn: '你住在哪儿？', en: 'Where do you live?' },
    { cn: '我住在学校旁边。', en: 'I live next to the school.' },
    { cn: '他在北京住了三年。', en: 'He lived in Beijing for three years.' },
  ],
  '准备': [
    { cn: '你准备好了吗？', en: 'Are you ready?' },
    { cn: '我在准备考试。', en: 'I am preparing for the exam.' },
    { cn: '他准备明天走。', en: 'He plans to leave tomorrow.' },
  ],
  '桌子': [
    { cn: '桌子上有一本书。', en: 'There is a book on the table.' },
    { cn: '请把东西放在桌子上。', en: 'Please put things on the table.' },
    { cn: '这张桌子是新的。', en: 'This table is new.' },
  ],
  '字': [
    { cn: '这个字怎么读？', en: 'How do you read this character?' },
    { cn: '他的字写得很好看。', en: 'He writes characters very nicely.' },
    { cn: '请你写几个字。', en: 'Please write a few characters.' },
  ],
  '子': [
    { cn: '儿子长大了。', en: 'The son has grown up.' },
    { cn: '桌子上有一本书。', en: 'There is a book on the table.' },
    { cn: '这个孩子很聪明。', en: 'This child is very smart.' },
  ],
  '走': [
    { cn: '我们走吧。', en: 'Let\'s go.' },
    { cn: '他走了。', en: 'He left.' },
    { cn: '从这儿走到学校要十分钟。', en: 'It takes ten minutes to walk from here to school.' },
  ],
  '走路': [
    { cn: '我每天走路去上班。', en: 'I walk to work every day.' },
    { cn: '走路对身体好。', en: 'Walking is good for your health.' },
    { cn: '小孩儿学会走路了。', en: 'The child has learned to walk.' },
  ],
  '最': [
    { cn: '他是最好的学生。', en: 'He is the best student.' },
    { cn: '我最喜欢吃中国菜。', en: 'I like Chinese food the most.' },
    { cn: '这里的冬天最冷。', en: 'Winter here is the coldest.' },
  ],
  '最好': [
    { cn: '他是我最好的朋友。', en: 'He is my best friend.' },
    { cn: '你最好早一点来。', en: 'You had better come a bit earlier.' },
    { cn: '这家饭店的菜最好吃。', en: 'This restaurant\'s food is the best.' },
  ],
  '最后': [
    { cn: '最后一个问题。', en: 'The last question.' },
    { cn: '他是最后一个到的。', en: 'He was the last to arrive.' },
    { cn: '最后他还是去了。', en: 'In the end, he still went.' },
  ],
  '昨天': [
    { cn: '昨天我去了商店。', en: 'Yesterday I went to the store.' },
    { cn: '昨天下雨了。', en: 'It rained yesterday.' },
    { cn: '你昨天做了什么？', en: 'What did you do yesterday?' },
  ],
  '左': [
    { cn: '请往左走。', en: 'Please go left.' },
    { cn: '学校在左边。', en: 'The school is on the left.' },
    { cn: '左手拿书。', en: 'Hold the book in your left hand.' },
  ],
  '左边': [
    { cn: '图书馆在左边。', en: 'The library is on the left side.' },
    { cn: '请坐在左边。', en: 'Please sit on the left side.' },
    { cn: '左边有一个门。', en: 'There is a door on the left.' },
  ],
  '坐': [
    { cn: '请坐。', en: 'Please sit down.' },
    { cn: '我坐公共汽车去学校。', en: 'I take the bus to school.' },
    { cn: '他坐在那儿。', en: 'He is sitting there.' },
  ],
  '坐下': [
    { cn: '请坐下。', en: 'Please sit down.' },
    { cn: '大家都坐下了。', en: 'Everyone has sat down.' },
    { cn: '他坐下来休息。', en: 'He sat down to rest.' },
  ],
  '做': [
    { cn: '你在做什么？', en: 'What are you doing?' },
    { cn: '妈妈在做饭。', en: 'Mom is cooking.' },
    { cn: '这件事要认真做。', en: 'This task should be done seriously.' },
  ],
};

export default HSK1_EXAMPLES;
