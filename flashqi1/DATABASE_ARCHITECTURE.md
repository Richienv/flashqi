# FlashQi Database Architecture Documentation

## Overview

The FlashQi database implements a high-performance, two-phase loading system that combines static content delivery with user-specific spaced repetition tracking. This architecture provides Netflix-level performance with instant card loading and seamless cross-device synchronization.

## Architecture Philosophy

### Two-Phase Loading System
```
Phase 1: Static Content (0ms) → Instant Card Display
Phase 2: User Data (Async) → Status Badges & Progress
```

This approach ensures users see flashcards immediately while spaced repetition data loads in the background.

## Database Schema

### Core Tables

#### 1. `flashcards` (Shared Content)
Contains the master flashcard content shared across all users.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key (auto-generated) |
| `lesson_id` | UUID | Reference to lesson |
| `hanzi` | TEXT | Chinese characters |
| `pinyin` | TEXT | Pronunciation guide |
| `english` | TEXT | English translation |
| `example_sentence` | TEXT | Example usage |
| `audio_url` | TEXT | Audio file reference |
| `difficulty_level` | INTEGER | Difficulty rating (1-5) |
| `created_at` | TIMESTAMP | Creation timestamp |
| `updated_at` | TIMESTAMP | Last update timestamp |
| `last_reviewed` | TIMESTAMP | Global last review (legacy) |
| `status` | TEXT | Global status (legacy) |
| `interval_days` | INTEGER | Global interval (legacy) |

**Indexes:**
- `idx_flashcards_lesson` on `lesson_id`

#### 2. `flashcard_reviews` (User-Specific Data)
Stores individual user progress and spaced repetition data.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key (auto-generated) |
| `card_id` | UUID | Foreign key to `flashcards.id` |
| `user_id` | UUID | Foreign key to `auth.users.id` |
| `last_reviewed` | TIMESTAMP | When user last reviewed this card |
| `status` | TEXT | User's status: 'new', 'known', 'due' |
| `interval_days` | INTEGER | Days until next review |
| `review_count` | INTEGER | Number of times reviewed |
| `ease_factor` | DECIMAL(3,2) | SM-2 algorithm ease factor |
| `created_at` | TIMESTAMP | Creation timestamp |
| `updated_at` | TIMESTAMP | Last update timestamp |

**Constraints:**
- `UNIQUE(card_id, user_id)` - One review record per card per user
- `CHECK (status IN ('new', 'known', 'due'))`

**Indexes:**
- `idx_flashcard_reviews_user_status` on `(user_id, status)`
- `idx_flashcard_reviews_user_due` on `(user_id, last_reviewed, interval_days)` WHERE status IN ('new', 'due')
- `idx_flashcard_reviews_card_user` on `(card_id, user_id)`

## Security Model

### Row Level Security (RLS)

#### flashcard_reviews
- **Policy**: "Users can only see their own reviews"
- **Rule**: `auth.uid() = user_id`
- **Effect**: Users can only access their own progress data

#### flashcards
- **Access**: Public read access (shared content)
- **Modification**: Restricted to admin operations

## API Functions (RPC)

### 1. `get_cards_review_status(card_ids UUID[], user_uuid UUID)`

Retrieves user-specific review status for multiple cards in a single query.

**Parameters:**
- `card_ids`: Array of flashcard UUIDs
- `user_uuid`: User ID (defaults to current authenticated user)

**Returns:**
```sql
TABLE(
  card_id UUID,
  status TEXT,
  last_reviewed TIMESTAMP,
  interval_days INTEGER,
  review_count INTEGER
)
```

**Usage:**
```sql
SELECT * FROM get_cards_review_status(
  ARRAY['uuid1', 'uuid2', 'uuid3']::UUID[]
);
```

### 2. `batch_update_reviews(updates JSONB, user_uuid UUID)`

Updates multiple review records in a single transaction for optimal performance.

**Parameters:**
- `updates`: JSONB array of review updates
- `user_uuid`: User ID (defaults to current authenticated user)

**Update Format:**
```json
[
  {
    "card_id": "uuid",
    "last_reviewed": "2024-01-01T00:00:00Z",
    "status": "known",
    "interval_days": 7,
    "review_count": 1
  }
]
```

**Usage:**
```sql
SELECT batch_update_reviews('[
  {"card_id": "uuid", "status": "known", "interval_days": 7}
]'::JSONB);
```

### 3. `initialize_user_card_review(p_card_id UUID, p_user_id UUID)`

Creates initial review record for a user-card pair.

**Parameters:**
- `p_card_id`: Flashcard UUID
- `p_user_id`: User ID (defaults to current authenticated user)

**Returns:** BOOLEAN (success/failure)

### 4. `get_cards_with_review_status(p_lesson_id UUID, p_user_id UUID, p_limit INTEGER)`

Retrieves flashcards with merged user review status.

**Parameters:**
- `p_lesson_id`: Lesson UUID (NULL for all lessons)
- `p_user_id`: User ID (defaults to current authenticated user)
- `p_limit`: Maximum number of cards (default: 50)

**Returns:** Complete flashcard data with user status

### 5. `get_cards_by_lesson_text(p_lesson_text TEXT, p_user_id UUID, p_limit INTEGER)`

Helper function for compatibility with text-based lesson identifiers.

**Parameters:**
- `p_lesson_text`: Lesson identifier (e.g., "lesson1")
- `p_user_id`: User ID (defaults to current authenticated user)
- `p_limit`: Maximum number of cards (default: 50)

## Performance Optimizations

### Query Performance
1. **Composite Indexes**: Optimized for common query patterns
2. **Batch Operations**: Single-query updates for multiple cards
3. **RPC Functions**: Reduced round-trips between client and database

### Caching Strategy
1. **Static Content**: Cached indefinitely (never changes)
2. **User Progress**: 30-second cache with optimistic updates
3. **Due Counts**: 1-minute cache with periodic refresh

### Connection Efficiency
1. **Prepared Statements**: RPC functions use prepared execution plans
2. **Connection Pooling**: Supabase handles connection management
3. **Batch Processing**: Minimizes database round-trips

## Spaced Repetition Algorithm

### SM-2 Enhanced Algorithm

**Base Intervals:** [1, 6, 14, 30, 90, 180] days

**Strength Level Multipliers:**
- Low: 1.5x (easier reviews)
- Medium: 1.0x (standard)
- High: 0.7x (more frequent reviews)

**Calculation Logic:**
```javascript
if (!isCorrect) return 1; // Reset to day 1

if (reviewCount < baseIntervals.length) {
  return Math.floor(baseIntervals[reviewCount] * strengthMultiplier);
}

// After base intervals, use exponential growth
return Math.floor(currentInterval * 2.5 * strengthMultiplier);
```

### Status Transitions
- **New** → **Known** (correct answer)
- **New** → **Due** (incorrect answer)
- **Due** → **Known** (correct answer)
- **Due** → **Due** (incorrect answer, reset interval)
- **Known** → **Due** (when interval expires)

## Integration with Frontend

### React Query Configuration
```typescript
// Static content - never stales
staleTime: mode === 'lesson' ? Infinity : 30000
gcTime: mode === 'lesson' ? Infinity : 300000

// User progress - 30-second freshness
staleTime: 30000
gcTime: 300000
```

### Optimistic Updates
1. **Immediate UI Response**: Status changes appear instantly
2. **Background Sync**: Actual database updates happen asynchronously
3. **Error Recovery**: Failed updates revert optimistic changes

### Two-Phase Loading Implementation
```typescript
// Phase 1: Static cards (instant)
const staticCards = getStaticCards(lessonId);

// Phase 2: User statuses (async)
const statuses = await loadReviewStatuses(cardIds);

// Merge for final display
const mergedCards = mergeCardsWithStatuses(staticCards, statuses);
```

## Data Migration Strategy

### From localStorage to Database
1. **Automatic Detection**: Check for existing localStorage data
2. **Batch Migration**: Convert and upload in efficient batches
3. **Validation**: Verify successful migration
4. **Cleanup**: Remove localStorage data after confirmation

### Schema Evolution
1. **Backward Compatibility**: Old columns maintained during transition
2. **Gradual Migration**: Feature flags control rollout
3. **Rollback Safety**: Can revert to previous system if needed

## Monitoring and Maintenance

### Key Metrics
1. **Query Performance**: Monitor RPC function execution times
2. **Cache Hit Rates**: Track static vs dynamic content performance
3. **User Engagement**: Review completion rates and intervals
4. **Error Rates**: Failed updates and sync issues

### Maintenance Tasks
1. **Index Optimization**: Regular ANALYZE for query planning
2. **Data Cleanup**: Archive old review records if needed
3. **Performance Tuning**: Adjust batch sizes based on usage patterns

## Development Guidelines

### Adding New Cards
```sql
INSERT INTO flashcards (lesson_id, hanzi, pinyin, english, example_sentence, difficulty_level)
VALUES (lesson_uuid, '新', 'xīn', 'New', 'Example sentence', 1);
```

### Querying User Progress
```sql
-- Get user's progress for a lesson
SELECT * FROM get_cards_with_review_status(lesson_uuid, user_uuid);

-- Get cards due for review
SELECT * FROM get_cards_with_review_status(NULL, user_uuid)
WHERE status IN ('new', 'due');
```

### Batch Updates
```typescript
const updates = cards.map(card => ({
  card_id: card.id,
  status: card.isCorrect ? 'known' : 'due',
  interval_days: calculateNextInterval(card),
  last_reviewed: new Date().toISOString()
}));

await supabase.rpc('batch_update_reviews', {
  updates: JSON.stringify(updates)
});
```

## Troubleshooting

### Common Issues

#### Slow Query Performance
1. Check if indexes are being used: `EXPLAIN ANALYZE`
2. Verify RLS policies aren't causing table scans
3. Consider batch size adjustments

#### Cache Inconsistency
1. Invalidate React Query cache: `queryClient.invalidateQueries()`
2. Check optimistic update error handling
3. Verify WebSocket connections for real-time updates

#### Migration Issues
1. Check localStorage data format compatibility
2. Verify user authentication during migration
3. Monitor batch upload success rates

### Debug Queries

```sql
-- Check user's review status distribution
SELECT status, COUNT(*) 
FROM flashcard_reviews 
WHERE user_id = auth.uid() 
GROUP BY status;

-- Find cards due for review
SELECT f.hanzi, fr.last_reviewed, fr.interval_days
FROM flashcards f
JOIN flashcard_reviews fr ON f.id = fr.card_id
WHERE fr.user_id = auth.uid()
  AND fr.last_reviewed + (fr.interval_days || ' days')::INTERVAL <= NOW();

-- Performance check for RPC functions
SELECT schemaname, funcname, calls, total_time, mean_time
FROM pg_stat_user_functions
WHERE funcname LIKE '%card%';
```

## Future Enhancements

### Planned Features
1. **Advanced Analytics**: Learning curve analysis and predictions
2. **Collaborative Learning**: Shared decks and progress comparison
3. **AI Integration**: Personalized difficulty adjustment
4. **Offline Support**: Progressive Web App with sync capabilities

### Scalability Considerations
1. **Horizontal Scaling**: Partition large user bases
2. **CDN Integration**: Static content delivery optimization
3. **Real-time Updates**: WebSocket integration for live progress
4. **Machine Learning**: Adaptive spaced repetition algorithms

---

*Last Updated: December 2024*
*Version: 1.0*
*Maintainer: FlashQi Development Team* 