-- ================================================================
-- POPULATE LESSONS 9-17 FLASHCARDS (BASED ON lesson-data.txt)
-- ================================================================
-- This script adds flashcards for lessons 9-17 with authentic textbook vocabulary

SELECT 'Starting to populate lessons 9-17 flashcards...' as status;

-- First, create lessons 9-17 if they don't exist
INSERT INTO lessons (id, title, level, lesson_number, description, created_at, updated_at)
VALUES 
  (gen_random_uuid(), 'Money and Currency', 1, 9, 'Currency, time expressions, and places', NOW(), NOW()),
  (gen_random_uuid(), 'Locations and Contact', 1, 10, 'Office, home, phone numbers and addresses', NOW(), NOW()),
  (gen_random_uuid(), 'Introductions', 1, 11, 'Meeting people and formal introductions', NOW(), NOW()),
  (gen_random_uuid(), 'Language Learning', 1, 12, 'Discussing language learning and university', NOW(), NOW()),
  (gen_random_uuid(), 'Objects and Descriptions', 1, 13, 'Describing objects, colors, and belongings', NOW(), NOW()),
  (gen_random_uuid(), 'Daily Life', 1, 14, 'Work, transportation, and daily activities', NOW(), NOW()),
  (gen_random_uuid(), 'Family and Professions', 1, 15, 'Family members and different jobs', NOW(), NOW()),
  (gen_random_uuid(), 'Activities and Internet', 1, 16, 'Internet activities, studying, and socializing', NOW(), NOW()),
  (gen_random_uuid(), 'Learning and Media', 1, 17, 'Education, media, and cultural activities', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Lesson 9 Flashcards
DO $$
DECLARE
    lesson9_id UUID;
BEGIN
    SELECT id INTO lesson9_id FROM lessons WHERE level = 1 AND lesson_number = 9;
    
    INSERT INTO flashcards (id, lesson_id, hanzi, pinyin, english, difficulty_level, created_at, updated_at) VALUES
    (gen_random_uuid(), lesson9_id, '下午', 'xià wǔ', 'afternoon', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson9_id, '上午', 'shàng wǔ', 'morning', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson9_id, '图书馆', 'tú shū guǎn', 'library', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson9_id, '换', 'huàn', 'to exchange', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson9_id, '下街', 'xià jiē', 'to go downtown', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson9_id, '营业员', 'yíng yè yuán', 'sales clerk', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson9_id, '人民币', 'rén mín bì', 'Chinese yuan', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson9_id, '百', 'bǎi', 'hundred', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson9_id, '千', 'qiān', 'thousand', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson9_id, '万', 'wàn', 'ten thousand', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson9_id, '美元', 'měi yuán', 'US dollar', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson9_id, '港币', 'gǎng bì', 'Hong Kong dollar', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson9_id, '日元', 'rì yuán', 'Japanese yen', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson9_id, '韩元', 'hán yuán', 'Korean won', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson9_id, '欧元', 'ōu yuán', 'Euro', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson9_id, '等', 'děng', 'to wait/etc.', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson9_id, '一会儿', 'yī huì r', 'a moment', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson9_id, '先生', 'xiān sheng', 'mister', 1, NOW(), NOW());
    
    RAISE NOTICE 'Inserted % flashcards for Lesson 9', 18;
END $$;

-- Lesson 10 Flashcards
DO $$
DECLARE
    lesson10_id UUID;
BEGIN
    SELECT id INTO lesson10_id FROM lessons WHERE level = 1 AND lesson_number = 10;
    
    INSERT INTO flashcards (id, lesson_id, hanzi, pinyin, english, difficulty_level, created_at, updated_at) VALUES
    (gen_random_uuid(), lesson10_id, '办公室', 'bàn gōng shì', 'office', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson10_id, '办公', 'bàn gōng', 'to work in office', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson10_id, '找', 'zhǎo', 'to look for', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson10_id, '在', 'zài', 'at/in', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson10_id, '家', 'jiā', 'home/family', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson10_id, '呢', 'ne', 'particle', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson10_id, '号', 'hào', 'number', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson10_id, '楼', 'lóu', 'building/floor', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson10_id, '门', 'mén', 'door/gate', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson10_id, '零', 'líng', 'zero', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson10_id, '房间', 'fáng jiān', 'room', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson10_id, '知道', 'zhī dao', 'to know', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson10_id, '电话', 'diàn huà', 'telephone', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson10_id, '电', 'diàn', 'electricity', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson10_id, '话', 'huà', 'speech/words', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson10_id, '号码', 'hào mǎ', 'number', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson10_id, '手机', 'shǒu jī', 'mobile phone', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson10_id, '手', 'shǒu', 'hand', 1, NOW(), NOW());
    
    RAISE NOTICE 'Inserted % flashcards for Lesson 10', 18;
END $$;

-- Lesson 11 Flashcards
DO $$
DECLARE
    lesson11_id UUID;
BEGIN
    SELECT id INTO lesson11_id FROM lessons WHERE level = 1 AND lesson_number = 11;
    
    INSERT INTO flashcards (id, lesson_id, hanzi, pinyin, english, difficulty_level, created_at, updated_at) VALUES
    (gen_random_uuid(), lesson11_id, '秘书', 'mì shū', 'secretary', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson11_id, '先', 'xiān', 'first', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson11_id, '介绍', 'jiè shào', 'to introduce', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson11_id, '一下', 'yī xià', 'a bit', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson11_id, '校长', 'xiào zhǎng', 'principal', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson11_id, '教书', 'jiāo shū', 'to teach', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson11_id, '欢迎', 'huān yíng', 'welcome', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson11_id, '留学生', 'liú xué shēng', 'international student', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson11_id, '留学', 'liú xué', 'to study abroad', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson11_id, '你们', 'nǐ men', 'you (plural)', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson11_id, '我们', 'wǒ men', 'we/us', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson11_id, '都', 'dōu', 'all', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson11_id, '和', 'hé', 'and', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson11_id, '俩', 'liǎ', 'two (people)', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson11_id, '学生', 'xué sheng', 'student', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson11_id, '没什么', 'méi shén me', 'nothing much', 1, NOW(), NOW());
    
    RAISE NOTICE 'Inserted % flashcards for Lesson 11', 16;
END $$;

-- Lesson 12 Flashcards
DO $$
DECLARE
    lesson12_id UUID;
BEGIN
    SELECT id INTO lesson12_id FROM lessons WHERE level = 1 AND lesson_number = 12;
    
    INSERT INTO flashcards (id, lesson_id, hanzi, pinyin, english, difficulty_level, created_at, updated_at) VALUES
    (gen_random_uuid(), lesson12_id, '语言', 'yǔ yán', 'language', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson12_id, '大学', 'dà xué', 'university', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson12_id, '什么样', 'shén me yàng', 'what kind', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson12_id, '觉得', 'jué de', 'to feel/think', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson12_id, '语法', 'yǔ fǎ', 'grammar', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson12_id, '说', 'shuō', 'to speak', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson12_id, '比较', 'bǐ jiào', 'comparatively', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson12_id, '容易', 'róng yì', 'easy', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson12_id, '但是', 'dàn shì', 'but', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson12_id, '读', 'dú', 'to read', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson12_id, '写', 'xiě', 'to write', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson12_id, '信', 'xìn', 'letter', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson12_id, '同学', 'tóng xué', 'classmate', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson12_id, '同屋', 'tóng wū', 'roommate', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson12_id, '班', 'bān', 'class', 1, NOW(), NOW());
    
    RAISE NOTICE 'Inserted % flashcards for Lesson 12', 15;
END $$;

-- Lesson 13 Flashcards
DO $$
DECLARE
    lesson13_id UUID;
BEGIN
    SELECT id INTO lesson13_id FROM lessons WHERE level = 1 AND lesson_number = 13;
    
    INSERT INTO flashcards (id, lesson_id, hanzi, pinyin, english, difficulty_level, created_at, updated_at) VALUES
    (gen_random_uuid(), lesson13_id, '没有', 'méi yǒu', 'to not have', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson13_id, '箱子', 'xiāng zi', 'box/suitcase', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson13_id, '有', 'yǒu', 'to have', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson13_id, '重', 'zhòng', 'heavy', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson13_id, '轻', 'qīng', 'light', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson13_id, '黑', 'hēi', 'black', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson13_id, '红', 'hóng', 'red', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson13_id, '旧', 'jiù', 'old', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson13_id, '药', 'yào', 'medicine', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson13_id, '中药', 'zhōng yào', 'Chinese medicine', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson13_id, '西药', 'xī yào', 'Western medicine', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson13_id, '茶叶', 'chá yè', 'tea leaves', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson13_id, '里', 'lǐ', 'inside', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson13_id, '日用品', 'rì yòng pǐn', 'daily necessities', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson13_id, '件', 'jiàn', 'measure word for clothes', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson13_id, '衣服', 'yī fu', 'clothes', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson13_id, '把', 'bǎ', 'measure word', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson13_id, '雨伞', 'yǔ sǎn', 'umbrella', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson13_id, '平板', 'píng bǎn', 'tablet', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson13_id, '电脑', 'diàn nǎo', 'computer', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson13_id, '本', 'běn', 'measure word for books', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson13_id, '词典', 'cí diǎn', 'dictionary', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson13_id, '优盘', 'yōu pán', 'USB drive', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson13_id, '支', 'zhī', 'measure word for pens', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson13_id, '毛笔', 'máo bǐ', 'brush pen', 1, NOW(), NOW());
    
    RAISE NOTICE 'Inserted % flashcards for Lesson 13', 24;
END $$;

-- Lesson 14 Flashcards
DO $$
DECLARE
    lesson14_id UUID;
BEGIN
    SELECT id INTO lesson14_id FROM lessons WHERE level = 1 AND lesson_number = 14;
    
    INSERT INTO flashcards (id, lesson_id, hanzi, pinyin, english, difficulty_level, created_at, updated_at) VALUES
    (gen_random_uuid(), lesson14_id, '经理', 'jīng lǐ', 'manager', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson14_id, '好久', 'hǎo jiǔ', 'long time', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson14_id, '啊', 'a', 'exclamation particle', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson14_id, '马马虎虎', 'mǎ ma hū hū', 'so-so', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson14_id, '租金', 'zū jīn', 'rent', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson14_id, '刚', 'gāng', 'just', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson14_id, '开学', 'kāi xué', 'school starts', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson14_id, '开', 'kāi', 'to open', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson14_id, '有点儿', 'yǒu diǎn r', 'a little', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson14_id, '还是', 'hái shi', 'or/still', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson14_id, '咖啡', 'kā fēi', 'coffee', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson14_id, '杯', 'bēi', 'cup', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson14_id, '车', 'chē', 'vehicle', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson14_id, '自行车', 'zì xíng chē', 'bicycle', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson14_id, '汽车', 'qì chē', 'car', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson14_id, '摩托车', 'mó tuō chē', 'motorcycle', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson14_id, '出租车', 'chū zū chē', 'taxi', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson14_id, '眼睛', 'yǎn jing', 'eyes', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson14_id, '蓝', 'lán', 'blue', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson14_id, '辆', 'liàng', 'measure word for vehicles', 1, NOW(), NOW());
    
    RAISE NOTICE 'Inserted % flashcards for Lesson 14', 20;
END $$;

-- Lesson 15 Flashcards
DO $$
DECLARE
    lesson15_id UUID;
BEGIN
    SELECT id INTO lesson15_id FROM lessons WHERE level = 1 AND lesson_number = 15;
    
    INSERT INTO flashcards (id, lesson_id, hanzi, pinyin, english, difficulty_level, created_at, updated_at) VALUES
    (gen_random_uuid(), lesson15_id, '全', 'quán', 'whole/all', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson15_id, '照片', 'zhào piàn', 'photo', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson15_id, '张', 'zhāng', 'measure word for flat objects', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson15_id, '看', 'kàn', 'to look/see', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson15_id, '姐姐', 'jiě jie', 'older sister', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson15_id, '只', 'zhǐ', 'only', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson15_id, '做', 'zuò', 'to do', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson15_id, '大夫', 'dài fu', 'doctor', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson15_id, '公司', 'gōng sī', 'company', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson15_id, '商店', 'shāng diàn', 'store', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson15_id, '律师', 'lǜ shī', 'lawyer', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson15_id, '外贸', 'wài mào', 'foreign trade', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson15_id, '小', 'xiǎo', 'small', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson15_id, '员工', 'yuán gōng', 'employee', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson15_id, '大概', 'dà gài', 'probably', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson15_id, '外国', 'wài guó', 'foreign country', 1, NOW(), NOW());
    
    RAISE NOTICE 'Inserted % flashcards for Lesson 15', 16;
END $$;

-- Lesson 16 Flashcards
DO $$
DECLARE
    lesson16_id UUID;
BEGIN
    SELECT id INTO lesson16_id FROM lessons WHERE level = 1 AND lesson_number = 16;
    
    INSERT INTO flashcards (id, lesson_id, hanzi, pinyin, english, difficulty_level, created_at, updated_at) VALUES
    (gen_random_uuid(), lesson16_id, '现在', 'xiàn zài', 'now', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson16_id, '跟', 'gēn', 'with', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson16_id, '一起', 'yī qǐ', 'together', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson16_id, '咱们', 'zán men', 'we (inclusive)', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson16_id, '走', 'zǒu', 'to walk', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson16_id, '常常', 'cháng cháng', 'often', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson16_id, '借', 'jiè', 'to borrow', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson16_id, '有时候', 'yǒu shí hou', 'sometimes', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson16_id, '上网', 'shàng wǎng', 'to go online', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson16_id, '网', 'wǎng', 'internet', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson16_id, '查', 'chá', 'to check', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson16_id, '资料', 'zī liào', 'material', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson16_id, '总是', 'zǒng shì', 'always', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson16_id, '宿舍', 'sù shè', 'dormitory', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson16_id, '安静', 'ān jìng', 'quiet', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson16_id, '晚上', 'wǎn shang', 'evening', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson16_id, '复习', 'fù xí', 'to review', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson16_id, '课文', 'kè wén', 'text', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson16_id, '预习', 'yù xí', 'to preview', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson16_id, '生字', 'shēng zì', 'new character', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson16_id, '或者', 'huò zhě', 'or', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson16_id, '练习', 'liàn xí', 'to practice', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson16_id, '聊天儿', 'liáo tiān r', 'to chat', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson16_id, '发', 'fā', 'to send', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson16_id, '微信', 'wēi xìn', 'WeChat', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson16_id, '收发', 'shōu fā', 'to receive and send', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson16_id, '收', 'shōu', 'to receive', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson16_id, '邮件', 'yóu jiàn', 'email', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson16_id, '电影', 'diàn yǐng', 'movie', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson16_id, '电视剧', 'diàn shì jù', 'TV drama', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson16_id, '电视', 'diàn shì', 'television', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson16_id, '休息', 'xiū xi', 'to rest', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson16_id, '公园', 'gōng yuán', 'park', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson16_id, '超市', 'chāo shì', 'supermarket', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson16_id, '东西', 'dōng xi', 'thing', 1, NOW(), NOW());
    
    RAISE NOTICE 'Inserted % flashcards for Lesson 16', 35;
END $$;

-- Lesson 17 Flashcards
DO $$
DECLARE
    lesson17_id UUID;
BEGIN
    SELECT id INTO lesson17_id FROM lessons WHERE level = 1 AND lesson_number = 17;
    
    INSERT INTO flashcards (id, lesson_id, hanzi, pinyin, english, difficulty_level, created_at, updated_at) VALUES
    (gen_random_uuid(), lesson17_id, '出来', 'chū lái', 'to come out', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson17_id, '正在', 'zhèng zài', 'in the process of', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson17_id, '音乐', 'yīn yuè', 'music', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson17_id, '正', 'zhèng', 'in the course of', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson17_id, '录音', 'lù yīn', 'to record', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson17_id, '事儿', 'shì r', 'matter', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson17_id, '书店', 'shū diàn', 'bookstore', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson17_id, '想', 'xiǎng', 'to want/think', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson17_id, '汉英', 'hàn yīng', 'Chinese-English', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson17_id, '骑', 'qí', 'to ride', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson17_id, '行', 'xíng', 'okay/alright', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson17_id, '学期', 'xué qī', 'semester', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson17_id, '门', 'mén', 'measure word for courses', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson17_id, '课', 'kè', 'class/course', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson17_id, '综合', 'zōng hé', 'comprehensive', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson17_id, '口语', 'kǒu yǔ', 'spoken language', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson17_id, '听力', 'tīng lì', 'listening', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson17_id, '阅读', 'yuè dú', 'reading', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson17_id, '文化', 'wén huà', 'culture', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson17_id, '体育', 'tǐ yù', 'physical education', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson17_id, '教', 'jiāo', 'to teach', 1, NOW(), NOW());
    
    RAISE NOTICE 'Inserted % flashcards for Lesson 17', 21;
END $$;

-- Final verification
SELECT 'Verification Results for Lessons 9-17:' as status;

SELECT 
  l.lesson_number,
  l.title,
  COUNT(f.id) as flashcard_count
FROM lessons l
LEFT JOIN flashcards f ON l.id = f.lesson_id
WHERE l.level = 1 AND l.lesson_number BETWEEN 9 AND 17
GROUP BY l.id, l.lesson_number, l.title
ORDER BY l.lesson_number;

SELECT 
  COUNT(*) as total_new_flashcards,
  'authentic textbook flashcards created for lessons 9-17' as note
FROM flashcards f
JOIN lessons l ON f.lesson_id = l.id
WHERE l.level = 1 AND l.lesson_number BETWEEN 9 AND 17;

-- Show overall progress
SELECT 
  COUNT(*) as total_all_flashcards,
  'total authentic flashcards (lessons 1-17)' as note
FROM flashcards f
JOIN lessons l ON f.lesson_id = l.id
WHERE l.level = 1 AND l.lesson_number BETWEEN 1 AND 17;

SELECT 'Lessons 9-17 flashcards population completed successfully!' as status; 