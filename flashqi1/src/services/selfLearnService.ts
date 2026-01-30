
// Mock dictionary for "translation"
const DICTIONARY: { [key: string]: { hanzi: string; pinyin: string; english: string } } = {
    'apple': { hanzi: '苹果', pinyin: 'píng guǒ', english: 'Apple' },
    'banana': { hanzi: '香蕉', pinyin: 'xiāng jiāo', english: 'Banana' },
    'cat': { hanzi: '猫', pinyin: 'māo', english: 'Cat' },
    'dog': { hanzi: '狗', pinyin: 'gǒu', english: 'Dog' },
    'hello': { hanzi: '你好', pinyin: 'nǐ hǎo', english: 'Hello' },
    'goodbye': { hanzi: '再见', pinyin: 'zài jiàn', english: 'Goodbye' },
    'thank you': { hanzi: '谢谢', pinyin: 'xiè xie', english: 'Thank You' },
    'water': { hanzi: '水', pinyin: 'shuǐ', english: 'Water' },
    'friend': { hanzi: '朋友', pinyin: 'péng you', english: 'Friend' },
    'love': { hanzi: '爱', pinyin: 'ài', english: 'Love' },
    'book': { hanzi: '书', pinyin: 'shū', english: 'Book' },
    'teacher': { hanzi: '老师', pinyin: 'lǎo shī', english: 'Teacher' },
    'student': { hanzi: '学生', pinyin: 'xué shēng', english: 'Student' },
    'china': { hanzi: '中国', pinyin: 'zhōng guó', english: 'China' },
    'yes': { hanzi: '是', pinyin: 'shì', english: 'Yes' },
    'no': { hanzi: '不是', pinyin: 'bú shì', english: 'No' },
};

export class SelfLearnService {
    /**
     * Simulate finding Chinese/Pinyin from English input
     */
    static async translate(text: string): Promise<{ hanzi: string; pinyin: string; english: string } | null> {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const lower = text.toLowerCase().trim();
        if (DICTIONARY[lower]) {
            return DICTIONARY[lower];
        }

        // Heuristics for demo if not in dictionary
        // If input looks like Chinese (has simplified char), maybe just return it
        if (/[\u4e00-\u9fa5]/.test(text)) {
            return {
                hanzi: text,
                pinyin: 'Unknown Pinyin',
                english: 'Custom Entry'
            }
        }

        return null;
    }
}
