# FlashQi Speaking Feature

## Overview

The Speaking feature allows users to practice Chinese language phrases with a spaced repetition system for efficient learning. Users can create categories of phrases, add custom phrases, and practice them with a flashcard interface.

## Features

- **Categories Management**: Create and organize phrases into categories
- **Phrase Management**: Add custom phrases with Chinese, Pinyin, and English translations
- **Spaced Repetition System**: Smart scheduling of phrase reviews based on learning progress
- **Practice Mode**: Interactive flashcard interface for efficient practice

## Database Setup

The Speaking feature requires two tables in your Supabase database:

1. `speaking_categories`: Stores categories of phrases
2. `speaking_phrases`: Stores the actual phrases with their translations and spaced repetition metadata

### Setting Up the Database

There are two ways to set up the necessary tables and functions:

#### Automatic Setup (Recommended)

The Speaking feature will automatically attempt to set up the required tables when you first access the Speaking page. No additional steps are needed.

#### Manual Setup

If you prefer to set up the database manually, follow these steps:

1. Run the setup script:
   ```bash
   npx ts-node scripts/setup-speaking-tables.ts
   ```

2. Or manually run the SQL in the Supabase SQL Editor:
   - Go to your Supabase project
   - Navigate to the SQL Editor
   - Copy the contents of `src/lib/supabase/sql/speaking-tables.sql`
   - Run the SQL

### Database Schema

#### speaking_categories

| Column                | Type      | Description                                |
|-----------------------|-----------|--------------------------------------------|
| id                    | UUID      | Primary key                                |
| title                 | TEXT      | Category title                             |
| description           | TEXT      | Category description                       |
| total_phrases         | INTEGER   | Number of phrases in the category          |
| completion_percentage | INTEGER   | Percentage of learned phrases              |
| custom                | BOOLEAN   | Whether this is a custom user category     |
| color                 | TEXT      | CSS gradient color class                   |
| borderColor           | TEXT      | CSS border color class                     |
| bgColor               | TEXT      | CSS background color class                 |
| buttonColor           | TEXT      | CSS button color class                     |
| created_at            | TIMESTAMP | Creation timestamp                         |
| updated_at            | TIMESTAMP | Last update timestamp                      |

#### speaking_phrases

| Column           | Type      | Description                                |
|------------------|-----------|--------------------------------------------|
| id               | UUID      | Primary key                                |
| category_id      | UUID      | Foreign key to speaking_categories         |
| chinese          | TEXT      | Chinese text                               |
| pinyin           | TEXT      | Pinyin pronunciation                       |
| english          | TEXT      | English translation                        |
| learned          | BOOLEAN   | Whether the phrase is marked as learned    |
| repetition_level | INTEGER   | Current level in spaced repetition (0-5)   |
| last_practiced   | TIMESTAMP | When the phrase was last practiced         |
| next_practice    | TIMESTAMP | When the phrase should be practiced next   |
| created_at       | TIMESTAMP | Creation timestamp                         |
| updated_at       | TIMESTAMP | Last update timestamp                      |

## Spaced Repetition Algorithm

The Speaking feature implements a simple but effective spaced repetition algorithm:

1. New phrases start at level 0
2. When a phrase is marked as "I Know This", its level increases by 1 (up to max level 5)
3. When a phrase is marked as "Review Again", its level is reset to 0
4. The intervals between repetitions increase with the level:
   - Level 0: 1 hour
   - Level 1: 1 day
   - Level 2: 3 days
   - Level 3: 1 week
   - Level 4: 2 weeks
   - Level 5: 30 days

## Usage

1. **Adding Categories**:
   - Navigate to the Speaking page
   - Click "Add New Category"
   - Enter a name and description

2. **Adding Phrases**:
   - Navigate to a category
   - Click "Add New Phrase"
   - Enter the Chinese text, Pinyin, and English translation

3. **Practicing**:
   - Navigate to a category
   - Click "Practice Mode"
   - Tap cards to flip them
   - Mark phrases as "I Know This" or "Review Again"

4. **Filtering**:
   - Use the dropdown to filter phrases by "All", "Learned", or "Not Learned"

## Development

### Important Files

- `src/app/dashboard/flashcards/speaking/page.tsx`: Main Speaking page
- `src/app/dashboard/flashcards/speaking/[categoryId]/page.tsx`: Category detail page
- `src/components/ui/speaking-flashcard.tsx`: Flashcard component
- `src/lib/supabase/setup-speaking.ts`: Database setup utility
- `src/lib/supabase/sql/speaking-tables.sql`: SQL for creating tables

## Future Enhancements

Potential future enhancements for the Speaking feature:

1. Voice recognition for pronunciation practice
2. Audio playback of phrases
3. Import/export functionality
4. Sharing categories with other users
5. Advanced statistics and learning analytics 