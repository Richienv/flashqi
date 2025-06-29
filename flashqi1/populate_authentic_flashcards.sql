-- ================================================================
-- POPULATE AUTHENTIC TEXTBOOK FLASHCARDS (BASED ON lesson-data.txt)
-- ================================================================
-- This script populates flashcards with the exact vocabulary from your textbook

SELECT 'Starting to populate authentic textbook flashcards...' as status;

-- Clear existing flashcards first
DELETE FROM flashcards;

-- Lesson 1 Flashcards
DO $$
DECLARE
    lesson1_id UUID;
BEGIN
    SELECT id INTO lesson1_id FROM lessons WHERE level = 1 AND lesson_number = 1;
    
    INSERT INTO flashcards (id, lesson_id, hanzi, pinyin, english, difficulty_level, created_at, updated_at) VALUES
    (gen_random_uuid(), lesson1_id, '你', 'nǐ', 'you', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson1_id, '好', 'hǎo', 'good', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson1_id, '你好', 'nǐ hǎo', 'hello', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson1_id, '一', 'yī', 'one', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson1_id, '五', 'wǔ', 'five', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson1_id, '八', 'bā', 'eight', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson1_id, '大', 'dà', 'big', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson1_id, '不', 'bù', 'not', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson1_id, '口', 'kǒu', 'mouth', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson1_id, '白', 'bái', 'white', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson1_id, '女', 'nǚ', 'woman', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson1_id, '马', 'mǎ', 'horse', 1, NOW(), NOW());
    
    RAISE NOTICE 'Inserted % flashcards for Lesson 1', 12;
END $$;

-- Lesson 2 Flashcards
DO $$
DECLARE
    lesson2_id UUID;
BEGIN
    SELECT id INTO lesson2_id FROM lessons WHERE level = 1 AND lesson_number = 2;
    
    INSERT INTO flashcards (id, lesson_id, hanzi, pinyin, english, difficulty_level, created_at, updated_at) VALUES
    (gen_random_uuid(), lesson2_id, '忙', 'máng', 'busy', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson2_id, '吗', 'ma', 'question particle', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson2_id, '很', 'hěn', 'very', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson2_id, '汉语', 'hàn yǔ', 'Chinese language', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson2_id, '难', 'nán', 'difficult', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson2_id, '太', 'tài', 'too', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson2_id, '爸爸', 'bà ba', 'father', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson2_id, '妈妈', 'mā ma', 'mother', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson2_id, '她', 'tā', 'she', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson2_id, '他们', 'tā men', 'they', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson2_id, '男', 'nán', 'male', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson2_id, '哥哥', 'gē ge', 'older brother', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson2_id, '弟弟', 'dì di', 'younger brother', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson2_id, '妹妹', 'mèi mei', 'younger sister', 1, NOW(), NOW());
    
    RAISE NOTICE 'Inserted % flashcards for Lesson 2', 14;
END $$;

-- Lesson 3 Flashcards
DO $$
DECLARE
    lesson3_id UUID;
BEGIN
    SELECT id INTO lesson3_id FROM lessons WHERE level = 1 AND lesson_number = 3;
    
    INSERT INTO flashcards (id, lesson_id, hanzi, pinyin, english, difficulty_level, created_at, updated_at) VALUES
    (gen_random_uuid(), lesson3_id, '学', 'xué', 'to study', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson3_id, '英语', 'yīng yǔ', 'English language', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson3_id, '阿拉伯语', 'ā lā bó yǔ', 'Arabic language', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson3_id, '德语', 'dé yǔ', 'German language', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson3_id, '俄语', 'é yǔ', 'Russian language', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson3_id, '法语', 'fǎ yǔ', 'French language', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson3_id, '韩国语', 'hán guó yǔ', 'Korean language', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson3_id, '日语', 'rì yǔ', 'Japanese language', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson3_id, '西班牙语', 'xī bān yá yǔ', 'Spanish language', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson3_id, '去', 'qù', 'to go', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson3_id, '对', 'duì', 'correct', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson3_id, '邮局', 'yóu jú', 'post office', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson3_id, '几', 'jǐ', 'how many', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson3_id, '新', 'xīn', 'new', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson3_id, '银行', 'yín háng', 'bank', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson3_id, '取', 'qǔ', 'to take/withdraw', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson3_id, '钱', 'qián', 'money', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson3_id, '明天', 'míng tiān', 'tomorrow', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson3_id, '天', 'tiān', 'day', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson3_id, '见', 'jiàn', 'to see', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson3_id, '六', 'liù', 'six', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson3_id, '七', 'qī', 'seven', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson3_id, '九', 'jiǔ', 'nine', 1, NOW(), NOW());
    
    RAISE NOTICE 'Inserted % flashcards for Lesson 3', 23;
END $$;

-- Lesson 4 Flashcards
DO $$
DECLARE
    lesson4_id UUID;
BEGIN
    SELECT id INTO lesson4_id FROM lessons WHERE level = 1 AND lesson_number = 4;
    
    INSERT INTO flashcards (id, lesson_id, hanzi, pinyin, english, difficulty_level, created_at, updated_at) VALUES
    (gen_random_uuid(), lesson4_id, '今天', 'jīn tiān', 'today', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson4_id, '昨天', 'zuó tiān', 'yesterday', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson4_id, '星期', 'xīng qī', 'week', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson4_id, '星期一', 'xīng qī yī', 'Monday', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson4_id, '星期二', 'xīng qī èr', 'Tuesday', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson4_id, '星期三', 'xīng qī sān', 'Wednesday', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson4_id, '星期四', 'xīng qī sì', 'Thursday', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson4_id, '星期五', 'xīng qī wǔ', 'Friday', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson4_id, '星期六', 'xīng qī liù', 'Saturday', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson4_id, '星期天', 'xīng qī tiān', 'Sunday', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson4_id, '二', 'èr', 'two', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson4_id, '三', 'sān', 'three', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson4_id, '四', 'sì', 'four', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson4_id, '哪儿', 'nǎr', 'where', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson4_id, '那儿', 'nàr', 'there', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson4_id, '我', 'wǒ', 'I/me', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson4_id, '会', 'huì', 'can/will', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson4_id, '学校', 'xué xiào', 'school', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson4_id, '对不起', 'duì bu qǐ', 'sorry', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson4_id, '没关系', 'méi guān xi', 'it doesn''t matter', 1, NOW(), NOW());
    
    RAISE NOTICE 'Inserted % flashcards for Lesson 4', 20;
END $$;

-- Lesson 5 Flashcards
DO $$
DECLARE
    lesson5_id UUID;
BEGIN
    SELECT id INTO lesson5_id FROM lessons WHERE level = 1 AND lesson_number = 5;
    
    INSERT INTO flashcards (id, lesson_id, hanzi, pinyin, english, difficulty_level, created_at, updated_at) VALUES
    (gen_random_uuid(), lesson5_id, '这', 'zhè', 'this', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson5_id, '是', 'shì', 'to be', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson5_id, '老师', 'lǎo shī', 'teacher', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson5_id, '您', 'nín', 'you (formal)', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson5_id, '请', 'qǐng', 'please', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson5_id, '进', 'jìn', 'to enter', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson5_id, '坐', 'zuò', 'to sit', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson5_id, '喝', 'hē', 'to drink', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson5_id, '茶', 'chá', 'tea', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson5_id, '谢谢', 'xiè xie', 'thank you', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson5_id, '不客气', 'bù kè qi', 'you''re welcome', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson5_id, '客气', 'kè qi', 'polite', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson5_id, '工作', 'gōng zuò', 'work', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson5_id, '身体', 'shēn tǐ', 'body', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson5_id, '身', 'shēn', 'body', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson5_id, '时', 'shí', 'time', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson5_id, '日', 'rì', 'day', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson5_id, '忘', 'wàng', 'to forget', 1, NOW(), NOW());
    
    RAISE NOTICE 'Inserted % flashcards for Lesson 5', 18;
END $$;

-- Lesson 6 Flashcards
DO $$
DECLARE
    lesson6_id UUID;
BEGIN
    SELECT id INTO lesson6_id FROM lessons WHERE level = 1 AND lesson_number = 6;
    
    INSERT INTO flashcards (id, lesson_id, hanzi, pinyin, english, difficulty_level, created_at, updated_at) VALUES
    (gen_random_uuid(), lesson6_id, '请问', 'qǐng wèn', 'excuse me', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson6_id, '问', 'wèn', 'to ask', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson6_id, '贵姓', 'guì xìng', 'your surname (polite)', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson6_id, '姓', 'xìng', 'surname', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson6_id, '叫', 'jiào', 'to be called', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson6_id, '名字', 'míng zi', 'name', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson6_id, '那', 'nà', 'that', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson6_id, '国', 'guó', 'country', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson6_id, '人', 'rén', 'person', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson6_id, '认识', 'rèn shi', 'to know', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson6_id, '高兴', 'gāo xìng', 'happy', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson6_id, '也', 'yě', 'also', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson6_id, '什么', 'shén me', 'what', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson6_id, '发音', 'fā yīn', 'pronunciation', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson6_id, '汉字', 'hàn zì', 'Chinese character', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson6_id, '书', 'shū', 'book', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson6_id, '谁', 'shéi', 'who', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson6_id, '的', 'de', 'possessive particle', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson6_id, '杂志', 'zá zhì', 'magazine', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson6_id, '文', 'wén', 'text', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson6_id, '朋友', 'péng you', 'friend', 1, NOW(), NOW());
    
    RAISE NOTICE 'Inserted % flashcards for Lesson 6', 21;
END $$;

-- Lesson 7 Flashcards
DO $$
DECLARE
    lesson7_id UUID;
BEGIN
    SELECT id INTO lesson7_id FROM lessons WHERE level = 1 AND lesson_number = 7;
    
    INSERT INTO flashcards (id, lesson_id, hanzi, pinyin, english, difficulty_level, created_at, updated_at) VALUES
    (gen_random_uuid(), lesson7_id, '中午', 'zhōng wǔ', 'noon', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson7_id, '吃', 'chī', 'to eat', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson7_id, '饭', 'fàn', 'food/meal', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson7_id, '食堂', 'shí táng', 'dining hall', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson7_id, '馒头', 'mán tou', 'steamed bun', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson7_id, '要', 'yào', 'to want', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson7_id, '给', 'gěi', 'to give', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson7_id, '个', 'gè', 'measure word', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson7_id, '米饭', 'mǐ fàn', 'rice', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson7_id, '米', 'mǐ', 'rice', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson7_id, '碗', 'wǎn', 'bowl', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson7_id, '鸡蛋', 'jī dàn', 'egg', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson7_id, '鸡', 'jī', 'chicken', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson7_id, '蛋', 'dàn', 'egg', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson7_id, '汤', 'tāng', 'soup', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson7_id, '啤酒', 'pí jiǔ', 'beer', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson7_id, '就这些', 'jiù zhè xiē', 'just these', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson7_id, '些', 'xiē', 'some', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson7_id, '一些', 'yī xiē', 'some', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson7_id, '那些', 'nà xiē', 'those', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson7_id, '饺子', 'jiǎo zi', 'dumplings', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson7_id, '包子', 'bāo zi', 'steamed stuffed bun', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson7_id, '面条儿', 'miàn tiáo r', 'noodles', 1, NOW(), NOW());
    
    RAISE NOTICE 'Inserted % flashcards for Lesson 7', 23;
END $$;

-- Lesson 8 Flashcards
DO $$
DECLARE
    lesson8_id UUID;
BEGIN
    SELECT id INTO lesson8_id FROM lessons WHERE level = 1 AND lesson_number = 8;
    
    INSERT INTO flashcards (id, lesson_id, hanzi, pinyin, english, difficulty_level, created_at, updated_at) VALUES
    (gen_random_uuid(), lesson8_id, '买', 'mǎi', 'to buy', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson8_id, '水果', 'shuǐ guǒ', 'fruit', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson8_id, '苹果', 'píng guǒ', 'apple', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson8_id, '斤', 'jīn', 'catty (500g)', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson8_id, '公斤', 'gōng jīn', 'kilogram', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson8_id, '多少', 'duō shao', 'how much/many', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson8_id, '多', 'duō', 'many', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson8_id, '少', 'shǎo', 'few', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson8_id, '块', 'kuài', 'yuan (currency)', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson8_id, '毛', 'máo', 'jiao (10 cents)', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson8_id, '分', 'fēn', 'fen (1 cent)', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson8_id, '贵', 'guì', 'expensive', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson8_id, '太...了', 'tài...le', 'too...', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson8_id, '便宜', 'pián yi', 'cheap', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson8_id, '点儿', 'diǎn r', 'a little', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson8_id, '来', 'lái', 'to come', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson8_id, '吧', 'ba', 'particle', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson8_id, '还', 'hái', 'still/also', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson8_id, '别的', 'bié de', 'other', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson8_id, '橘子', 'jú zi', 'orange', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson8_id, '怎么', 'zěn me', 'how', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson8_id, '两', 'liǎng', 'two', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson8_id, '一共', 'yī gòng', 'altogether', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson8_id, '找', 'zhǎo', 'to look for/change (money)', 1, NOW(), NOW());
    
    RAISE NOTICE 'Inserted % flashcards for Lesson 8', 24;
END $$;

-- Final verification
SELECT 'Verification Results:' as status;

SELECT 
  l.lesson_number,
  l.title,
  COUNT(f.id) as flashcard_count
FROM lessons l
LEFT JOIN flashcards f ON l.id = f.lesson_id
WHERE l.level = 1 AND l.lesson_number BETWEEN 1 AND 8
GROUP BY l.id, l.lesson_number, l.title
ORDER BY l.lesson_number;

SELECT 
  COUNT(*) as total_flashcards,
  'authentic textbook flashcards created' as note
FROM flashcards f
JOIN lessons l ON f.lesson_id = l.id
WHERE l.level = 1 AND l.lesson_number BETWEEN 1 AND 8;

SELECT 'Authentic textbook flashcards population completed successfully!' as status; 