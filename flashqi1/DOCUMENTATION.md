# FlashQi - Chinese Learning Application Documentation

## Table of Contents
1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Features](#features)
4. [Tech Stack](#tech-stack)
5. [Project Structure](#project-structure)
6. [Data Models](#data-models)
7. [Authentication System](#authentication-system)
8. [Core Features](#core-features)
9. [UI/UX Design](#uiux-design)
10. [Database Schema](#database-schema)
11. [Development Setup](#development-setup)
12. [API Integration](#api-integration)
13. [Deployment](#deployment)
14. [Contributing](#contributing)

## Overview

FlashQi (快玉) is a comprehensive Chinese language learning application that combines modern web technologies with proven language learning methodologies. The app provides an immersive learning experience through interactive flashcards, spaced repetition algorithms, handwriting recognition, speaking practice, and gamified learning modes.

### Key Learning Methodologies
- **Spaced Repetition System (SRS)**: Optimizes review intervals based on user performance
- **Multi-Modal Learning**: Combines visual, auditory, and kinesthetic learning approaches
- **Progressive Difficulty**: Structured lesson progression from beginner to advanced
- **Gamification**: Battle modes and progress tracking to maintain engagement

## Architecture

FlashQi follows a modern full-stack architecture with the following components:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (Next.js)     │◄──►│   (Supabase)    │◄──►│   (PostgreSQL)  │
│                 │    │                 │    │                 │
│ - React 19      │    │ - Auth          │    │ - User Data     │
│ - TypeScript    │    │ - Real-time     │    │ - Flashcards    │
│ - Tailwind CSS  │    │ - Storage       │    │ - Progress      │
│ - App Router    │    │ - Edge Funcs    │    │ - Game Rooms    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Design Patterns
- **Context Pattern**: For global state management (Auth, Theme, Game Room)
- **Component Composition**: Reusable UI components with shadcn/ui
- **Server Components**: Leveraging Next.js 15 App Router for performance
- **Real-time Updates**: Supabase subscriptions for live data synchronization

## Features

### 🎯 Core Learning Features
- **Interactive Flashcards**: Chinese characters with Hanzi, Pinyin, and English translations
- **Spaced Repetition**: Intelligent review scheduling based on learning progress
- **Handwriting Recognition**: Practice writing Chinese characters with AI feedback
- **Speaking Practice**: Pronunciation practice with voice recognition
- **Reading Comprehension**: Structured reading exercises with vocabulary support
- **Progress Tracking**: Detailed analytics and learning statistics

### 🎮 Gamification Features
- **Battle Mode**: Competitive multiplayer flashcard battles
- **Achievement System**: Progress badges and milestones
- **Streak Tracking**: Daily learning streak maintenance
- **Leaderboards**: Community-driven competitive elements

### 📚 Content Management
- **Lesson Organization**: Structured curriculum with 25+ lessons
- **Custom Flashcards**: User-generated content creation
- **Homework System**: Assignment tracking and completion
- **Exam Preparation**: Specialized test preparation modes

### 🎨 User Experience
- **Dark/Light Theme**: Adaptive UI with system preference detection
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Glassmorphism UI**: Modern, translucent design elements
- **Smooth Animations**: Engaging transitions and micro-interactions

## Tech Stack

### Frontend
- **Framework**: Next.js 15.2.1 (App Router)
- **Language**: TypeScript 5
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4 with custom utilities
- **Components**: shadcn/ui with Radix UI primitives
- **Icons**: Lucide React
- **Animations**: Tailwind CSS Animate
- **Forms**: React Hook Form with Zod validation

### Backend & Database
- **Backend-as-a-Service**: Supabase
- **Database**: PostgreSQL with real-time subscriptions
- **Authentication**: Supabase Auth with JWT tokens
- **Storage**: Supabase Storage for media files
- **Real-time**: WebSocket connections for live features

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint 9 with Next.js config
- **Testing**: Jest with TypeScript support
- **Build Tool**: Next.js with Turbopack (dev mode)
- **Version Control**: Git with conventional commits

### External Integrations
- **Handwriting Recognition**: HanziWriter library
- **Voice Recognition**: Web Speech API
- **Deployment**: Vercel (planned)

## Project Structure

```
flashqi/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── dashboard/          # Main application dashboard
│   │   │   ├── flashcards/     # Flashcard learning interface
│   │   │   ├── homework/       # Assignment management
│   │   │   ├── exam-test/      # Exam preparation
│   │   │   └── practice/       # Additional practice modes
│   │   ├── auth/               # Authentication pages
│   │   ├── admin/              # Administrative interface
│   │   └── api/                # API routes
│   ├── components/             # Reusable React components
│   │   ├── ui/                 # Base UI components
│   │   ├── auth/               # Authentication components
│   │   └── flashcard/          # Flashcard-specific components
│   ├── contexts/               # React Context providers
│   │   ├── auth-context.tsx    # Authentication state
│   │   ├── ThemeContext.tsx    # Theme management
│   │   └── game-room-context.tsx # Multiplayer game state
│   ├── data/                   # Static data and content
│   │   ├── flashcardData.ts    # Lesson flashcard content
│   │   ├── level2FlashcardData.ts # Advanced content
│   │   └── readingLessonData.ts # Reading exercises
│   ├── lib/                    # Utility libraries
│   │   ├── supabase/           # Database configuration
│   │   └── utils.ts            # Helper functions
│   ├── types/                  # TypeScript type definitions
│   ├── hooks/                  # Custom React hooks
│   └── services/               # External service integrations
├── public/                     # Static assets
├── scripts/                    # Build and deployment scripts
└── supabase/                   # Database migrations and config
```

## Data Models

### Core Entities

#### Flashcard
```typescript
interface Flashcard {
  id: string;
  lesson_id: string;
  hanzi: string;           // Chinese characters
  pinyin: string;          // Pronunciation guide
  english: string;         // English translation
  example_sentence?: {     // Usage example
    hanzi: string;
    pinyin: string;
    english: string;
  };
  difficulty_level: number; // 1-5 difficulty rating
  created_at: string;
}
```

#### User Progress
```typescript
interface UserProgress {
  id: string;
  user_id: string;
  flashcard_id: string;
  familiarity_level: number;    // 1-5 mastery level
  next_review_date: string;     // SRS scheduling
  created_at: string;
  updated_at: string;
}
```

#### Lesson
```typescript
interface Lesson {
  id: string;
  lesson_number: number;
  title: string;
  description: string;
  created_at: string;
}
```

### Learning Progress Tracking
- **Spaced Repetition Levels**: 0-5 with increasing intervals
- **Mastery Tracking**: Individual card familiarity scoring
- **Lesson Completion**: Percentage-based progress indicators
- **Streak Counting**: Daily engagement metrics

## Authentication System

### Architecture
FlashQi uses Supabase Auth for secure user management with the following features:

- **Email/Password Authentication**: Traditional signup and login
- **Session Management**: Persistent sessions with automatic refresh
- **Route Protection**: Client-side route guards for protected pages
- **Error Handling**: Comprehensive error states and retry mechanisms

### Auth Context Implementation
```typescript
type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, name: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
};
```

### Security Features
- **JWT Token Management**: Automatic token refresh and validation
- **Session Persistence**: Secure session storage across browser sessions
- **Network Resilience**: Retry mechanisms for network failures
- **Error Recovery**: Graceful degradation when auth services are unavailable

## Core Features

### 1. Flashcard Learning System

#### Interactive Flashcard Interface
- **Card Flipping Animation**: 3D CSS transforms for engaging interactions
- **Touch/Click Support**: Multi-input method compatibility
- **Progress Indicators**: Visual feedback on learning progress
- **Keyboard Navigation**: Accessibility-focused navigation

#### Spaced Repetition Algorithm
```typescript
// Interval calculation based on repetition level
const intervals = {
  0: 1 * 60 * 60 * 1000,      // 1 hour
  1: 24 * 60 * 60 * 1000,     // 1 day
  2: 3 * 24 * 60 * 60 * 1000, // 3 days
  3: 7 * 24 * 60 * 60 * 1000, // 1 week
  4: 14 * 24 * 60 * 60 * 1000, // 2 weeks
  5: 30 * 24 * 60 * 60 * 1000  // 30 days
};
```

### 2. Handwriting Recognition

#### Features
- **Canvas-based Drawing**: HTML5 Canvas for character input
- **Stroke Analysis**: Real-time stroke order and shape analysis
- **Character Recognition**: AI-powered Chinese character identification
- **Feedback System**: Visual feedback on writing accuracy

#### Technical Implementation
- **HanziWriter Integration**: Professional Chinese character writing library
- **Touch Event Handling**: Multi-touch support for mobile devices
- **Stroke Data Processing**: Vector analysis for character matching
- **Performance Optimization**: Efficient canvas rendering and memory management

### 3. Speaking Practice

#### Voice Recognition
- **Web Speech API**: Browser-native speech recognition
- **Pronunciation Scoring**: Accuracy assessment for Chinese pronunciation
- **Audio Playback**: Native speaker audio examples
- **Progress Tracking**: Speaking skill development metrics

#### Content Organization
- **Category System**: Organized phrase collections
- **Custom Phrases**: User-generated content creation
- **Spaced Repetition**: Speaking-specific SRS implementation
- **Difficulty Progression**: Structured speaking skill development

### 4. Battle Mode (Multiplayer)

#### Real-time Gameplay
- **WebSocket Communication**: Supabase real-time subscriptions
- **Room Management**: Game room creation and joining
- **Player Synchronization**: Real-time player state updates
- **Competitive Scoring**: Performance-based ranking system

#### Game Mechanics
- **Turn-based Gameplay**: Structured competitive rounds
- **Time Limits**: Pressure-based learning challenges
- **Scoring System**: Points based on speed and accuracy
- **Matchmaking**: Skill-based player pairing

### 5. Progress Analytics

#### Learning Metrics
- **Mastery Tracking**: Individual card familiarity levels
- **Time-based Analytics**: Learning velocity and consistency
- **Difficulty Analysis**: Performance across different complexity levels
- **Retention Rates**: Long-term memory retention tracking

#### Visual Dashboards
- **Progress Charts**: Visual learning progress representation
- **Streak Indicators**: Daily engagement tracking
- **Achievement Badges**: Milestone recognition system
- **Comparative Analytics**: Performance benchmarking

## UI/UX Design

### Design System

#### Color Palette
- **Primary**: Blue gradient system for primary actions
- **Secondary**: Complementary colors for different content types
- **Semantic Colors**: Success (green), warning (amber), error (red)
- **Neutral Grays**: Comprehensive grayscale for text and backgrounds

#### Typography
- **Font Stack**: Geist Sans for UI, Geist Mono for code
- **Hierarchy**: Structured heading system (h1-h6)
- **Responsive Scaling**: Fluid typography across device sizes
- **Accessibility**: High contrast ratios and readable font sizes

#### Component Design
- **Glassmorphism**: Translucent backgrounds with backdrop blur
- **Rounded Corners**: Consistent border radius system
- **Shadows**: Layered shadow system for depth perception
- **Animations**: Smooth transitions and micro-interactions

### Responsive Design

#### Breakpoint System
```css
/* Mobile First Approach */
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
2xl: 1536px /* 2X large devices */
```

#### Layout Patterns
- **Grid Systems**: CSS Grid for complex layouts
- **Flexbox**: Flexible component arrangements
- **Container Queries**: Component-based responsive design
- **Mobile Navigation**: Collapsible navigation for small screens

### Accessibility Features
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: ARIA labels and semantic HTML
- **Color Contrast**: WCAG AA compliance
- **Focus Management**: Visible focus indicators
- **Reduced Motion**: Respect for user motion preferences

## Database Schema

### Core Tables

#### Users (Supabase Auth)
- Managed by Supabase Auth system
- Extended with user metadata for profiles
- Integrated with application-specific user data

#### Flashcards
```sql
CREATE TABLE flashcards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id TEXT NOT NULL,
  hanzi TEXT NOT NULL,
  pinyin TEXT NOT NULL,
  english TEXT NOT NULL,
  example_sentence JSONB,
  difficulty_level INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### User Progress
```sql
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  flashcard_id UUID REFERENCES flashcards(id) ON DELETE CASCADE,
  familiarity_level INTEGER DEFAULT 1,
  next_review_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Speaking System
```sql
-- Speaking Categories
CREATE TABLE speaking_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  total_phrases INTEGER DEFAULT 0,
  completion_percentage INTEGER DEFAULT 0,
  custom BOOLEAN DEFAULT false,
  color TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Speaking Phrases
CREATE TABLE speaking_phrases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES speaking_categories(id) ON DELETE CASCADE,
  chinese TEXT NOT NULL,
  pinyin TEXT NOT NULL,
  english TEXT NOT NULL,
  learned BOOLEAN DEFAULT false,
  repetition_level INTEGER DEFAULT 0,
  last_practiced TIMESTAMP WITH TIME ZONE,
  next_practice TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Game Rooms (Battle Mode)
```sql
-- Game Rooms
CREATE TABLE game_rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  host_id UUID REFERENCES auth.users(id),
  status TEXT DEFAULT 'waiting',
  max_players INTEGER DEFAULT 4,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Game Players
CREATE TABLE game_players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID REFERENCES game_rooms(id) ON DELETE CASCADE,
  user_id UUID,
  username TEXT NOT NULL,
  email TEXT,
  avatar_url TEXT,
  is_ready BOOLEAN DEFAULT false,
  score INTEGER DEFAULT 0,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Data Relationships
- **One-to-Many**: Users → Progress, Lessons → Flashcards
- **Many-to-Many**: Users ↔ Game Rooms (through game_players)
- **Hierarchical**: Categories → Phrases, Lessons → Sub-lessons

### Indexing Strategy
- **Primary Keys**: UUID with btree indexes
- **Foreign Keys**: Indexed for join performance
- **Search Fields**: GIN indexes for full-text search
- **Temporal Data**: Indexes on timestamp fields for date-based queries

## Development Setup

### Prerequisites
- **Node.js**: Version 16.x or higher
- **npm**: Latest stable version
- **Git**: For version control
- **Supabase Account**: For backend services

### Installation Steps

1. **Clone Repository**
```bash
git clone https://github.com/yourusername/flashqi.git
cd flashqi
```

2. **Install Dependencies**
```bash
npm install
```

3. **Environment Configuration**
```bash
# Copy environment template
cp .env.example .env.local

# Configure environment variables
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Database Setup**
```bash
# Run database migrations
npx supabase db reset

# Seed initial data
npm run seed
```

5. **Development Server**
```bash
# Start development server with Turbopack
npm run dev

# Application available at http://localhost:3000
```

### Development Scripts
```json
{
  "dev": "next dev --turbopack",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "test": "jest",
  "test:watch": "jest --watch",
  "type-check": "tsc --noEmit"
}
```

### Code Quality Tools
- **ESLint**: Code linting with Next.js configuration
- **TypeScript**: Static type checking
- **Prettier**: Code formatting (recommended)
- **Husky**: Git hooks for pre-commit checks

## API Integration

### Supabase Integration

#### Client Configuration
```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
);
```

#### Real-time Subscriptions
```typescript
// Subscribe to game room updates
const subscription = supabase
  .channel('game_rooms')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'game_rooms' },
    (payload) => {
      // Handle real-time updates
    }
  )
  .subscribe();
```

### External APIs
- **Web Speech API**: Browser-native speech recognition
- **HanziWriter**: Chinese character writing library
- **Canvas API**: For handwriting input and recognition

### Error Handling
- **Network Resilience**: Automatic retry mechanisms
- **Graceful Degradation**: Fallback functionality when services are unavailable
- **User Feedback**: Clear error messages and recovery suggestions

## Deployment

### Vercel Deployment (Recommended)

1. **Connect Repository**
   - Link GitHub repository to Vercel
   - Configure automatic deployments

2. **Environment Variables**
   - Set production environment variables
   - Configure Supabase production URLs

3. **Build Configuration**
   - Next.js optimized builds
   - Static asset optimization
   - Edge function deployment

### Alternative Deployment Options
- **Netlify**: Static site deployment with serverless functions
- **Railway**: Full-stack deployment with database
- **Docker**: Containerized deployment for custom infrastructure

### Performance Optimization
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic route-based code splitting
- **Caching Strategy**: Static generation and ISR where appropriate
- **CDN Integration**: Global content delivery for static assets

## Contributing

### Development Workflow

1. **Fork Repository**
   - Create personal fork of the main repository
   - Clone fork to local development environment

2. **Branch Strategy**
   - `main`: Production-ready code
   - `develop`: Integration branch for features
   - `feature/*`: Individual feature development
   - `hotfix/*`: Critical bug fixes

3. **Code Standards**
   - Follow TypeScript best practices
   - Use conventional commit messages
   - Maintain test coverage above 80%
   - Document new features and APIs

4. **Pull Request Process**
   - Create detailed PR descriptions
   - Include screenshots for UI changes
   - Ensure all tests pass
   - Request code review from maintainers

### Code Style Guidelines
- **TypeScript**: Strict mode enabled
- **React**: Functional components with hooks
- **CSS**: Tailwind CSS utility classes
- **File Naming**: kebab-case for files, PascalCase for components

### Testing Strategy
- **Unit Tests**: Jest for component and utility testing
- **Integration Tests**: Testing user workflows
- **E2E Tests**: Playwright for full application testing
- **Performance Tests**: Lighthouse CI for performance monitoring

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Supabase**: Backend-as-a-Service platform
- **Next.js**: React framework for production
- **Tailwind CSS**: Utility-first CSS framework
- **HanziWriter**: Chinese character writing library
- **shadcn/ui**: Beautiful and accessible component library

---

*Last updated: December 2024*
*Version: 0.1.0* 