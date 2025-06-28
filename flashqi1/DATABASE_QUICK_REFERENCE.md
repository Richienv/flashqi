# FlashQi Database Quick Reference

## 🚀 Quick Start Commands

### Check Current Data
```sql
-- See what's in your flashcards table
SELECT id, lesson_id, hanzi, pinyin, english FROM flashcards LIMIT 10;

-- Check if you have any user review data
SELECT COUNT(*) FROM flashcard_reviews;

-- View your RPC functions
SELECT routine_name FROM information_schema.routines 
WHERE routine_type = 'FUNCTION' AND routine_name LIKE '%card%';
```

### Test the System
```sql
-- Test getting review status for cards
SELECT * FROM get_cards_review_status(
  ARRAY(SELECT id FROM flashcards LIMIT 3)
);

-- Test the lesson query function
SELECT * FROM get_cards_by_lesson_text('lesson1') LIMIT 5;
```

## 📊 Data Population

### If You Need to Add Sample Data
```sql
-- Add a sample lesson UUID (you'll need actual lesson UUIDs)
INSERT INTO flashcards (lesson_id, hanzi, pinyin, english, example_sentence, difficulty_level)
VALUES 
  (gen_random_uuid(), '你好', 'nǐ hǎo', 'Hello', 'Sample sentence', 1),
  (gen_random_uuid(), '谢谢', 'xiè xie', 'Thank you', 'Sample sentence', 1);
```

### Check Your Current Schema
```sql
-- View flashcards table structure
\d flashcards

-- View flashcard_reviews table structure  
\d flashcard_reviews

-- Check indexes
SELECT indexname, tablename FROM pg_indexes 
WHERE tablename IN ('flashcards', 'flashcard_reviews');
```

## 🔧 Common Operations

### For Development
```sql
-- Clear all review data (for testing)
DELETE FROM flashcard_reviews WHERE user_id = auth.uid();

-- Reset a specific card's progress
DELETE FROM flashcard_reviews 
WHERE card_id = 'your-card-uuid' AND user_id = auth.uid();

-- Check user's learning progress
SELECT 
  status, 
  COUNT(*) as count,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER(), 2) as percentage
FROM flashcard_reviews 
WHERE user_id = auth.uid() 
GROUP BY status;
```

### For Production
```sql
-- Get cards due for review today
SELECT f.hanzi, f.pinyin, f.english, fr.last_reviewed, fr.interval_days
FROM flashcards f
JOIN flashcard_reviews fr ON f.id = fr.card_id
WHERE fr.user_id = auth.uid()
  AND (
    fr.status = 'new' OR 
    fr.last_reviewed + (fr.interval_days || ' days')::INTERVAL <= NOW()
  )
ORDER BY fr.last_reviewed ASC NULLS FIRST;

-- Update a card's review status
SELECT batch_update_reviews('[{
  "card_id": "your-card-uuid",
  "status": "known", 
  "interval_days": 7,
  "last_reviewed": "2024-12-01T10:00:00Z"
}]'::JSONB);
```

## 🐛 Troubleshooting

### Performance Issues
```sql
-- Check if your queries are using indexes
EXPLAIN ANALYZE SELECT * FROM flashcard_reviews WHERE user_id = auth.uid();

-- Check RPC function performance
SELECT calls, total_time, mean_time 
FROM pg_stat_user_functions 
WHERE funcname LIKE '%card%';
```

### Data Issues
```sql
-- Find orphaned review records (cards that don't exist)
SELECT fr.card_id 
FROM flashcard_reviews fr 
LEFT JOIN flashcards f ON fr.card_id = f.id 
WHERE f.id IS NULL;

-- Find cards without any review data for current user
SELECT f.id, f.hanzi 
FROM flashcards f 
LEFT JOIN flashcard_reviews fr ON f.id = fr.card_id AND fr.user_id = auth.uid()
WHERE fr.card_id IS NULL;
```

## 🔒 Security Check

### Verify RLS is Working
```sql
-- This should only show your own data
SELECT COUNT(*) FROM flashcard_reviews;

-- This should show all flashcards (shared content)
SELECT COUNT(*) FROM flashcards;

-- Check RLS policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename IN ('flashcards', 'flashcard_reviews');
```

## 📱 Frontend Integration

### React Query Keys to Use
```typescript
// For lesson cards
['lesson-cards', lessonId]

// For card statuses  
['card-statuses', lessonId]

// For spaced repetition
['spaced-repetition-cards', filter]

// For due count
['due-cards-count']
```

### Example Service Calls
```typescript
// Get cards with status
const { data: cards } = useQuery({
  queryKey: ['lesson-cards', 'lesson1'],
  queryFn: () => UnifiedFlashcardService.getCardsForLesson('lesson1')
});

// Update review
await UnifiedFlashcardService.updateCardReview(cardId, true, 'medium');
```

## 🎯 Next Steps

1. **Populate Data**: Add your flashcard content to the `flashcards` table
2. **Test Functions**: Verify all RPC functions work with your data
3. **Frontend Integration**: Update your React components to use the new system
4. **Monitor Performance**: Watch query times and optimize as needed

## 📞 Need Help?

- Check `DATABASE_ARCHITECTURE.md` for detailed documentation
- Use the debug queries above to diagnose issues
- Monitor the browser console for React Query errors
- Check Supabase logs for database errors

---
*Quick Reference v1.0 - December 2024* 