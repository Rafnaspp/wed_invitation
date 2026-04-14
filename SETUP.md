# Wedding Invitation SaaS App Setup

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

## Supabase Setup

1. Create a new Supabase project at https://supabase.com
2. Go to Settings > API to get your URL and keys
3. Run the SQL schema from `supabase/schema.sql` in your Supabase SQL editor
4. Enable Authentication in Supabase dashboard

## Database Schema

The `invitations` table includes:
- Couple information (names, parents, addresses)
- Wedding theme selection
- Two events with details
- Photo upload support
- User authentication integration

## Getting Started

1. Install dependencies: `npm install`
2. Set up environment variables (see above)
3. Set up Supabase project and run schema
4. Run development server: `npm run dev`

The app will be available at http://localhost:3000
