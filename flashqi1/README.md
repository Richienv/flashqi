# FlashQi - Chinese Flashcard App

FlashQi is a modern web application for learning Chinese through flashcards with spaced repetition. It helps users efficiently learn and retain Chinese vocabulary.

## Features

- **Interactive Flashcards** - Study Chinese characters with hanzi, pinyin, and English translations
- **Spaced Repetition** - Optimized learning algorithm for maximum retention
- **Lesson Organization** - Structured content organized by lessons
- **Progress Tracking** - Monitor your learning journey and achievements
- **Mobile Responsive** - Works on all devices from phones to desktops
- **User Authentication** - Secure login and registration

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase for authentication, database, and storage
- **Deployment**: Vercel (coming soon)

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/flashqi.git
cd flashqi
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Local Development with Supabase

For local development with Supabase:

1. Install the Supabase CLI
2. Set up a local Supabase instance
3. Update the environment variables in `.env.local`

Refer to the [Supabase documentation](https://supabase.com/docs) for detailed instructions.

## Project Structure

- `src/app/*` - App router pages
- `src/components/*` - Reusable React components
- `src/lib/*` - Utility functions and library configurations
- `src/types/*` - TypeScript interfaces and types

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Thanks to all the open source libraries that made this project possible
- Inspired by spaced repetition systems like Anki and SuperMemo
