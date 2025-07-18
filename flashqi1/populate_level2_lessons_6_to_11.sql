-- Populate Level 2 Lessons 6-11 with Authentic Flashcard Data
-- Based on lesson2-data.txt authentic textbook vocabulary

-- Get lesson IDs for Level 2 lessons 6-11
DO $$
DECLARE
    lesson6_id UUID;
    lesson7_id UUID;
    lesson8_id UUID;
    lesson9_id UUID;
    lesson10_id UUID;
    lesson11_id UUID;
BEGIN
    -- Get lesson IDs
    SELECT id INTO lesson6_id FROM lessons WHERE level = 2 AND lesson_number = 6;
    SELECT id INTO lesson7_id FROM lessons WHERE level = 2 AND lesson_number = 7;
    SELECT id INTO lesson8_id FROM lessons WHERE level = 2 AND lesson_number = 8;
    SELECT id INTO lesson9_id FROM lessons WHERE level = 2 AND lesson_number = 9;
    SELECT id INTO lesson10_id FROM lessons WHERE level = 2 AND lesson_number = 10;
    SELECT id INTO lesson11_id FROM lessons WHERE level = 2 AND lesson_number = 11;

    -- Level 2 Lesson 6: Daily Life and Environment
    INSERT INTO flashcards (lesson_id, hanzi, pinyin, english, difficulty_level) VALUES
    (lesson6_id, '变化', 'biànhuà', 'change', 2),
    (lesson6_id, '比那', 'bǐ nà', 'compared to that', 2),
    (lesson6_id, '暑假', 'shǔjià', 'summer vacation', 2),
    (lesson6_id, '海', 'hǎi', 'sea', 2),
    (lesson6_id, '比', 'bǐ', 'to compare', 2),
    (lesson6_id, '人口', 'rénkǒu', 'population', 2),
    (lesson6_id, '最', 'zuì', 'most', 2),
    (lesson6_id, '城市', 'chéngshì', 'city', 2),
    (lesson6_id, '增加', 'zēngjiā', 'to increase', 2),
    (lesson6_id, '建筑', 'jiànzhù', 'building/architecture', 2),
    (lesson6_id, '过去', 'guòqù', 'past', 2),
    (lesson6_id, '更', 'gèng', 'more', 2),
    (lesson6_id, '漂亮', 'piàoliang', 'beautiful', 2),
    (lesson6_id, '冬天', 'dōngtiān', 'winter', 2),
    (lesson6_id, '暖和', 'nuǎnhuo', 'warm', 2),
    (lesson6_id, '可是', 'kěshì', 'but', 2),
    (lesson6_id, '天气', 'tiānqì', 'weather', 2),
    (lesson6_id, '预报', 'yùbào', 'forecast', 2),
    (lesson6_id, '气温', 'qìwēn', 'temperature', 2),
    (lesson6_id, '高', 'gāo', 'high', 2),
    (lesson6_id, '度', 'dù', 'degree', 2),
    (lesson6_id, '裙子', 'qúnzi', 'skirt', 2),
    (lesson6_id, '暖气', 'nuǎnqì', 'heating', 2),
    (lesson6_id, '感觉', 'gǎnjué', 'to feel', 2),
    (lesson6_id, '家庭', 'jiātíng', 'family', 2),
    (lesson6_id, '旅馆', 'lǚguǎn', 'hotel', 2),
    (lesson6_id, '饭店', 'fàndiàn', 'restaurant', 2),
    (lesson6_id, '米', 'mǐ', 'meter', 2),
    (lesson6_id, '光', 'guāng', 'light', 2),
    (lesson6_id, '交响乐', 'jiāoxiǎngyuè', 'symphony', 2),
    (lesson6_id, '下载', 'xiàzài', 'to download', 2),
    (lesson6_id, '收', 'shōu', 'to receive', 2),
    (lesson6_id, '也许', 'yěxǔ', 'perhaps', 2),
    (lesson6_id, '古典', 'gǔdiǎn', 'classical', 2),
    (lesson6_id, '现代', 'xiàndài', 'modern', 2),
    (lesson6_id, '世界', 'shìjiè', 'world', 2),
    (lesson6_id, '名曲', 'míngqǔ', 'famous song', 2),
    (lesson6_id, '民歌', 'míngē', 'folk song', 2),
    (lesson6_id, '流行', 'liúxíng', 'popular', 2),
    (lesson6_id, '歌曲', 'gēqǔ', 'song', 2),
    (lesson6_id, '年轻', 'niánqīng', 'young', 2),
    (lesson6_id, '歌词', 'gēcí', 'lyrics', 2),
    (lesson6_id, '有些', 'yǒuxiē', 'some', 2),
    (lesson6_id, '遥远', 'yáoyuǎn', 'distant', 2);

    -- Level 2 Lesson 7: Countries and Seasons
    INSERT INTO flashcards (lesson_id, hanzi, pinyin, english, difficulty_level) VALUES
    (lesson7_id, '国家', 'guójiā', 'country', 2),
    (lesson7_id, '一样', 'yīyàng', 'same', 2),
    (lesson7_id, '时差', 'shíchā', 'time difference', 2),
    (lesson7_id, '夜', 'yè', 'night', 2),
    (lesson7_id, '季节', 'jìjié', 'season', 2),
    (lesson7_id, '季', 'jì', 'season', 2),
    (lesson7_id, '春', 'chūn', 'spring', 2),
    (lesson7_id, '夏天', 'xiàtiān', 'summer', 2),
    (lesson7_id, '秋', 'qiū', 'autumn', 2),
    (lesson7_id, '热', 'rè', 'hot', 2),
    (lesson7_id, '冷', 'lěng', 'cold', 2),
    (lesson7_id, '刮风', 'guā fēng', 'windy', 2),
    (lesson7_id, '风', 'fēng', 'wind', 2),
    (lesson7_id, '下雪', 'xià xuě', 'to snow', 2),
    (lesson7_id, '下', 'xià', 'to fall (rain/snow)', 2),
    (lesson7_id, '雪', 'xuě', 'snow', 2),
    (lesson7_id, '下雨', 'xià yǔ', 'to rain', 2),
    (lesson7_id, '不但...而且', 'bùdàn...érqiě', 'not only...but also', 2),
    (lesson7_id, '分', 'fēn', 'score/point', 2),
    (lesson7_id, '得', 'de', 'to get/obtain', 2),
    (lesson7_id, '听写', 'tīngxiě', 'dictation', 2),
    (lesson7_id, '周末', 'zhōumò', 'weekend', 2),
    (lesson7_id, '出去', 'chūqù', 'to go out', 2),
    (lesson7_id, '历史', 'lìshǐ', 'history', 2),
    (lesson7_id, '画册', 'huàcè', 'album', 2),
    (lesson7_id, '研究', 'yánjiū', 'to research', 2),
    (lesson7_id, '知识', 'zhīshì', 'knowledge', 2),
    (lesson7_id, '老', 'lǎo', 'old', 2),
    (lesson7_id, '改革', 'gǎigé', 'reform', 2),
    (lesson7_id, '开放', 'kāifàng', 'opening up', 2),
    (lesson7_id, '一切', 'yīqiè', 'everything', 2);

    -- Level 2 Lesson 8: Travel and Scenery
    INSERT INTO flashcards (lesson_id, hanzi, pinyin, english, difficulty_level) VALUES
    (lesson8_id, '爱', 'ài', 'to love', 2),
    (lesson8_id, '滑冰', 'huá bīng', 'to skate', 2),
    (lesson8_id, '滑雪', 'huá xuě', 'to ski', 2),
    (lesson8_id, '家乡', 'jiāxiāng', 'hometown', 2),
    (lesson8_id, '水', 'shuǐ', 'water', 2),
    (lesson8_id, '有名', 'yǒumíng', 'famous', 2),
    (lesson8_id, '风景', 'fēngjǐng', 'scenery', 2),
    (lesson8_id, '去', 'qù', 'to go', 2),
    (lesson8_id, '旅游', 'lǚyóu', 'to travel', 2),
    (lesson8_id, '尤其', 'yóuqí', 'especially', 2),
    (lesson8_id, '凉快', 'liángkuai', 'cool', 2),
    (lesson8_id, '避暑', 'bì shǔ', 'to spend holiday at a summer resort', 2),
    (lesson8_id, '人家', 'rénjiā', 'household', 2),
    (lesson8_id, '靠', 'kào', 'to rely on', 2),
    (lesson8_id, '经营', 'jīngyíng', 'to manage', 2),
    (lesson8_id, '发财', 'fā cái', 'to make money', 2),
    (lesson8_id, '树叶', 'shùyè', 'leaves', 2),
    (lesson8_id, '树', 'shù', 'tree', 2),
    (lesson8_id, '叶', 'yè', 'leaf', 2),
    (lesson8_id, '见', 'jiàn', 'to see', 2),
    (lesson8_id, '红叶', 'hóngyè', 'red leaves', 2),
    (lesson8_id, '着急', 'zháojí', 'anxious', 2),
    (lesson8_id, '这么', 'zhème', 'so/this way', 2),
    (lesson8_id, '表', 'biǎo', 'watch', 2),
    (lesson8_id, '坏', 'huài', 'broken', 2),
    (lesson8_id, '哎呀', 'āiyā', 'oh my', 2),
    (lesson8_id, '停', 'tíng', 'to stop', 2),
    (lesson8_id, '该', 'gāi', 'should', 2),
    (lesson8_id, '电池', 'diànchí', 'battery', 2),
    (lesson8_id, '迟到', 'chídào', 'to be late', 2),
    (lesson8_id, '厚实', 'hòushí', 'thick/substantial', 2),
    (lesson8_id, '坏事', 'huàishì', 'bad thing', 2),
    (lesson8_id, '拉', 'lā', 'to pull', 2),
    (lesson8_id, '母亲', 'mǔqīn', 'mother', 2),
    (lesson8_id, '父亲', 'fùqīn', 'father', 2),
    (lesson8_id, '得', 'de', 'must', 2),
    (lesson8_id, '结婚', 'jié hūn', 'to get married', 2),
    (lesson8_id, '离婚', 'lí hūn', 'to divorce', 2),
    (lesson8_id, '妻子', 'qīzi', 'wife', 2),
    (lesson8_id, '未婚妻', 'wèihūnqī', 'fiancée', 2),
    (lesson8_id, '将来', 'jiānglái', 'future', 2),
    (lesson8_id, '这样', 'zhèyàng', 'this way', 2),
    (lesson8_id, '那样', 'nàyàng', 'that way', 2);

    -- Level 2 Lesson 9: Meetings and Communication
    INSERT INTO flashcards (lesson_id, hanzi, pinyin, english, difficulty_level) VALUES
    (lesson9_id, '开会', 'kāi huì', 'to have a meeting', 2),
    (lesson9_id, '教学', 'jiàoxué', 'teaching', 2),
    (lesson9_id, '研讨会', 'yántǎohuì', 'seminar', 2),
    (lesson9_id, '研讨', 'yántǎo', 'to discuss', 2),
    (lesson9_id, '经过', 'jīngguò', 'to pass through', 2),
    (lesson9_id, '想', 'xiǎng', 'to think', 2),
    (lesson9_id, '问好', 'wèn hǎo', 'to say hello', 2),
    (lesson9_id, '少', 'shǎo', 'few/little', 2),
    (lesson9_id, '送', 'sòng', 'to send/give', 2),
    (lesson9_id, '过去', 'guòqù', 'to go over', 2),
    (lesson9_id, '过来', 'guòlái', 'to come over', 2),
    (lesson9_id, '辛苦', 'xīnkǔ', 'hard work', 2),
    (lesson9_id, '麻烦', 'máfan', 'trouble', 2),
    (lesson9_id, '堂', 'táng', 'hall', 2),
    (lesson9_id, '进去', 'jìnqù', 'to go in', 2),
    (lesson9_id, '爱人', 'àiren', 'spouse', 2),
    (lesson9_id, '办事', 'bàn shì', 'to handle affairs', 2),
    (lesson9_id, '慢', 'màn', 'slow', 2),
    (lesson9_id, '上来', 'shànglái', 'to come up', 2),
    (lesson9_id, '马上', 'mǎshàng', 'immediately', 2),
    (lesson9_id, '开车', 'kāi chē', 'to drive', 2),
    (lesson9_id, '照相机', 'zhàoxiàngjī', 'camera', 2),
    (lesson9_id, '照相', 'zhào xiàng', 'to take photos', 2),
    (lesson9_id, '座位', 'zuòwèi', 'seat', 2),
    (lesson9_id, '注意', 'zhùyì', 'to pay attention', 2),
    (lesson9_id, '出土', 'chū tǔ', 'to be unearthed', 2),
    (lesson9_id, '文物', 'wénwù', 'cultural relics', 2),
    (lesson9_id, '展览', 'zhǎnlǎn', 'exhibition', 2),
    (lesson9_id, '展览馆', 'zhǎnlǎnguǎn', 'exhibition hall', 2),
    (lesson9_id, '大约', 'dàyuē', 'approximately', 2),
    (lesson9_id, '要求', 'yāoqiú', 'requirement', 2),
    (lesson9_id, '声', 'shēng', 'sound', 2),
    (lesson9_id, '清楚', 'qīngchǔ', 'clear', 2),
    (lesson9_id, '师父', 'shīfu', 'master', 2),
    (lesson9_id, '大使馆', 'dàshǐguǎn', 'embassy', 2),
    (lesson9_id, '大使', 'dàshǐ', 'ambassador', 2);

    -- Level 2 Lesson 10: Health and Traditional Medicine
    INSERT INTO flashcards (lesson_id, hanzi, pinyin, english, difficulty_level) VALUES
    (lesson10_id, '过', 'guò', 'to pass', 2),
    (lesson10_id, '住院', 'zhù yuán', 'to be hospitalized', 2),
    (lesson10_id, '中医', 'zhōngyī', 'traditional Chinese medicine', 2),
    (lesson10_id, '苦中成药', 'kǔzhōngchéngyào', 'bitter Chinese medicine', 2),
    (lesson10_id, '甜', 'tián', 'sweet', 2),
    (lesson10_id, '摸', 'mō', 'to touch', 2),
    (lesson10_id, '买', 'mǎi', 'to buy', 2),
    (lesson10_id, '药房', 'yàofáng', 'pharmacy', 2),
    (lesson10_id, '按摩', 'ànmó', 'massage', 2),
    (lesson10_id, '神酒', 'shénjiǔ', 'medicinal wine', 2),
    (lesson10_id, '方法', 'fāngfǎ', 'method', 2),
    (lesson10_id, '治', 'zhì', 'to treat', 2),
    (lesson10_id, '针', 'zhēn', 'needle', 2),
    (lesson10_id, '扎针', 'zhā zhēn', 'acupuncture', 2),
    (lesson10_id, '洗', 'xǐ', 'to wash', 2),
    (lesson10_id, '曾经', 'céngjīng', 'once/formerly', 2),
    (lesson10_id, '地', 'dì', 'ground', 2),
    (lesson10_id, '中餐', 'zhōngcān', 'Chinese food', 2),
    (lesson10_id, '烤鸭', 'kǎoyā', 'roast duck', 2),
    (lesson10_id, '烤', 'kǎo', 'to roast', 2),
    (lesson10_id, '白薯', 'báishǔ', 'sweet potato', 2),
    (lesson10_id, '糖葫芦', 'tánghúlu', 'candied fruit on a stick', 2),
    (lesson10_id, '糖', 'táng', 'sugar', 2),
    (lesson10_id, '什么的', 'shénmede', 'and so on', 2),
    (lesson10_id, '琴儿', 'qín''ér', 'musical instrument', 2),
    (lesson10_id, '钢琴', 'gāngqín', 'piano', 2),
    (lesson10_id, '家', 'jiā', 'home', 2),
    (lesson10_id, '演奏', 'yǎnzòu', 'to perform', 2),
    (lesson10_id, '极了', 'jíle', 'extremely', 2),
    (lesson10_id, '小提琴', 'xiǎotíqín', 'violin', 2),
    (lesson10_id, '协奏曲', 'xiézòuqǔ', 'concerto', 2),
    (lesson10_id, '曲', 'qǔ', 'song/tune', 2),
    (lesson10_id, '好听', 'hǎotīng', 'nice to listen to', 2),
    (lesson10_id, '换', 'huàn', 'to change', 2),
    (lesson10_id, '吗', 'ma', 'question particle', 2);

    -- Level 2 Lesson 11: Time and Travel Plans
    INSERT INTO flashcards (lesson_id, hanzi, pinyin, english, difficulty_level) VALUES
    (lesson11_id, '前天', 'qiántiān', 'the day before yesterday', 2),
    (lesson11_id, '后天', 'hòutiān', 'the day after tomorrow', 2),
    (lesson11_id, '到', 'dào', 'to arrive', 2),
    (lesson11_id, '研究生', 'yánjiūshēng', 'graduate student', 2),
    (lesson11_id, '打工', 'dǎ gōng', 'to work part-time', 2),
    (lesson11_id, '利用', 'lìyòng', 'to utilize', 2),
    (lesson11_id, '假期', 'jiàqī', 'vacation', 2),
    (lesson11_id, '旅行社', 'lǚxíngshè', 'travel agency', 2),
    (lesson11_id, '组织', 'zǔzhī', 'to organize', 2),
    (lesson11_id, '老板', 'lǎobǎn', 'boss', 2),
    (lesson11_id, '需要', 'xūyào', 'to need', 2),
    (lesson11_id, '经常', 'jīngcháng', 'often', 2),
    (lesson11_id, '收集', 'shōují', 'to gather', 2),
    (lesson11_id, '一...就', 'yī...jiù', 'as soon as', 2),
    (lesson11_id, '安排', 'ānpái', 'to arrange', 2),
    (lesson11_id, '帮助', 'bāngzhù', 'to help', 2),
    (lesson11_id, '帮', 'bāng', 'to help', 2),
    (lesson11_id, '高铁', 'gāotiě', 'high speed rail', 2),
    (lesson11_id, '铁路', 'tiělù', 'railway', 2),
    (lesson11_id, '风光', 'fēngguāng', 'scenery', 2),
    (lesson11_id, '商量', 'shāngliáng', 'to consult', 2),
    (lesson11_id, '故乡', 'gùxiāng', 'birthplace', 2),
    (lesson11_id, '自由', 'zìyóu', 'free', 2),
    (lesson11_id, '华东', 'huádōng', 'East China', 2),
    (lesson11_id, '马马虎虎', 'mǎmǎhūhū', 'so-so', 2),
    (lesson11_id, '老外', 'lǎowài', 'foreigner', 2),
    (lesson11_id, '呀', 'ya', 'particle (when preceding character ends in a e i o u)', 2),
    (lesson11_id, '鼻子', 'bízi', 'nose', 2),
    (lesson11_id, '头发', 'tóufa', 'hair', 2),
    (lesson11_id, '眼睛', 'yǎnjīng', 'eyes', 2),
    (lesson11_id, '深调', 'shēndiào', 'deep tone', 2),
    (lesson11_id, '互相', 'hùxiāng', 'mutually', 2),
    (lesson11_id, '希望', 'xīwàng', 'to hope', 2);

    RAISE NOTICE 'Successfully populated Level 2 lessons 6-11 with % flashcards total', 
        (SELECT COUNT(*) FROM flashcards WHERE lesson_id IN (lesson6_id, lesson7_id, lesson8_id, lesson9_id, lesson10_id, lesson11_id));
    
END $$; 