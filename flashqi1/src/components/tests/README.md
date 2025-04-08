# Chinese Level 1 Midterm Prep Test

This component provides a comprehensive midterm preparation test for Level 1 Chinese language students. The test is designed to help students practice and test their knowledge of Chinese vocabulary, grammar, and character recognition.

## Features

The midterm prep test includes the following exercise types:

1. **Pinyin for Hanzi**: Write the Pinyin for given Hanzi characters
2. **Hanzi from Radicals**: Identify Hanzi characters based on provided radicals
3. **Fill in the Blanks**: Complete sentences with appropriate words
4. **Rearrange Words**: Rearrange words to their correct positions in a sentence
5. **Opposite Words**: Write the opposite word for given words
6. **Form Questions**: Create questions about underlined parts of sentences
7. **Form Sentences**: Sort given words to form correct sentences
8. **Create Sentences**: Create sentences using provided Hanzi characters

## How to Use

The test is designed with a "Generate Test" button that displays all test sections when clicked. Students can work through each section, and answers are provided in gray text below each question for self-checking.

## Data Structure

The test data is stored in `src/data/midterm-test-data.ts` and organized by section. Each section contains an array of question objects with the following structure:

```typescript
// Example data structure for Pinyin for Hanzi section
pinyinForHanzi: [
  { hanzi: '你好', pinyin: 'nǐ hǎo', meaning: 'hello' },
  // More items...
]
```

## Customization

To customize the test content:

1. Edit the data in `src/data/midterm-test-data.ts` to change questions, answers, or add new items
2. Modify the `MidtermPrepTest.tsx` component to change the layout or functionality

## Integration

The test page is available at `/tests/midterm-prep` and can be linked from any part of the application.

## Future Enhancements

Potential future enhancements could include:

- Randomized question selection
- Timed test mode
- Score tracking and result saving
- Audio pronunciation exercises
- Character writing practice with stroke order

## Dependencies

This component uses:

- React for rendering
- Shadcn UI components for styling
- TailwindCSS for layout and design 