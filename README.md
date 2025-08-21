# KumbhSahyogi

A comprehensive platform for Kumbh Mela services including hotel bookings, medical facilities, transport options, and emergency services.

## Features

- 🏨 Hotel Booking System
- 🏥 Medical Services Directory
- 🚗 Transport Options
- 🆘 Emergency Services
- 🌐 Multi-language Support
- 📱 Responsive Design

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI Components**: Radix UI + Tailwind CSS
- **Database**: PostgreSQL with Drizzle ORM
- **Deployment**: Vercel

## Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   # Add your DATABASE_URL to .env.local
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Deployment on Vercel

### Prerequisites

1. **Database Setup**: You'll need a PostgreSQL database. You can use:
   - [Neon](https://neon.tech) (recommended for Vercel)
   - [Supabase](https://supabase.com)
   - [Railway](https://railway.app)
   - Any other PostgreSQL provider

2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)

### Deployment Steps

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect it as a Vite project

3. **Configure Environment Variables**:
   - In your Vercel project dashboard, go to Settings → Environment Variables
   - Add the following variable:
     - `DATABASE_URL`: Your PostgreSQL connection string

4. **Deploy**:
   - Click "Deploy" in Vercel
   - Vercel will automatically build and deploy your application

### Environment Variables

Make sure to set these in your Vercel project settings:

- `DATABASE_URL`: Your PostgreSQL connection string

### Build Configuration

The project is configured with:
- **Build Command**: `npm run build`
- **Output Directory**: `dist/public`
- **Framework**: Vite

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utilities and configurations
│   └── index.html         # HTML entry point
├── shared/                # Shared schemas and types
├── vercel.json           # Vercel configuration
└── package.json          # Project dependencies
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run db:push` - Push database schema changes

## Support

For deployment issues or questions, please check the Vercel documentation or create an issue in this repository.
