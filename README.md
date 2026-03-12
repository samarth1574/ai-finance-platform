# Welth - AI-Powered Financial Management Platform

Welth is a modern, full-stack financial management platform powered by Next.js, Supabase, Prisma, Clerk, Inngest, ArcJet, and Google Gemini AI. It helps you track, analyze, and optimize your spending with real-time AI insights, automated recurring transactions, and custom budget alerts.

## Features

- **Dashboard**: Get an overview of your total balance, recent transactions, and accounts.
- **Account Management**: Add, update, and manage multiple bank accounts or cash holdings.
- **Transaction Tracker**: Log income and expenses with categories and receipts.
- **Recurring Transactions**: Automatically process recurring income and expenses via background jobs.
- **AI Insights**: Generate personalized financial advice, monthly reports, and budget recommendations powered by Gemini.
- **Budget Alerts**: Set budgets and get email notifications via Resend when spending exceeds thresholds.
- **Security**: Protect endpoints against abuse and bot attacks with ArcJet.

---

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: Supabase (PostgreSQL)
- **ORM**: Prisma Client
- **Authentication**: Clerk Auth
- **Background Jobs**: Inngest
- **Security / Rate Limiting**: ArcJet
- **Email Service**: Resend
- **AI Engine**: Google Gemini AI
- **UI Components**: Shadcn UI & Tailwind CSS

---

## Setup Instructions

### 1. Clone the repository and install dependencies
```bash
npm install
```

### 2. Environment Variables Setup
Create a `.env` file in the root directory and add the following keys:

```env
# Database (Supabase)
DATABASE_URL="your-supabase-transaction-pooler-url"
DIRECT_URL="your-supabase-direct-connection-url"

# Authentication (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your-clerk-publishable-key"
CLERK_SECRET_KEY="your-clerk-secret-key"
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# AI (Google Gemini)
GEMINI_API_KEY="your-gemini-api-key"

# Emails (Resend)
RESEND_API_KEY="your-resend-api-key"

# Security (ArcJet)
ARCJET_KEY="your-arcjet-key"
```

### 2.1 Clerk authentication setup
This project uses Clerk's hosted `<SignIn />` and `<SignUp />` components, so the available sign-in methods are controlled from the Clerk Dashboard.

For a free-friendly setup, disable phone number/SMS authentication and use email-based authentication instead:
1. Open the Clerk Dashboard for your application.
2. Click the top-level **Configure** tab.
3. In the left sidebar, open **User & Authentication** or **Authentication**.
4. Disable **Phone number** as a sign-in/sign-up option.
5. Enable **Email address** authentication, such as email code, email link, or password.
6. Save the settings, then retry sign-in.

SMS OTP can require a paid Clerk plan in production, so keep phone authentication disabled unless the project intentionally supports paid SMS verification.

### 3. Database Migration
Push your database schema to Supabase:
```bash
npx prisma db push
```

### 4. Running the Development Server
Start the local server:
```bash
npm run dev
```

In a separate terminal, start the Inngest Dev Server to run background jobs locally:
```bash
npx inngest-cli@latest dev
# Or: npx inngest dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.
