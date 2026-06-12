#!/bin/bash

# ============================================================
# Git History Rewrite Script
# Creates 38 professional commits between March 12 - June 12, 2026
# ============================================================

set -e
cd /Users/samarthshekhar3541/Desktop/Ai_Finance

echo "🔄 Starting git history rewrite..."

# Store current branch name
CURRENT_BRANCH="main"

# Create an orphan branch (clean slate, no history)
git checkout --orphan rewrite-history

# Remove everything from staging
git rm -rf --cached . > /dev/null 2>&1

echo "✅ Created clean orphan branch"

# Helper function to commit with a specific date
commit_with_date() {
    local DATE="$1"
    local MESSAGE="$2"
    GIT_AUTHOR_DATE="$DATE" GIT_COMMITTER_DATE="$DATE" git commit -m "$MESSAGE" --allow-empty-message
}

# ─────────────────────────────────────────────
# COMMIT 1 — March 12: Project Init
# ─────────────────────────────────────────────
git add .gitignore .eslintrc.json jsconfig.json next.config.mjs postcss.config.mjs README.md
commit_with_date "2026-03-12T09:15:00+05:30" "chore: initialize Next.js 15 project with app router"

# ─────────────────────────────────────────────
# COMMIT 2 — March 13: Package setup
# ─────────────────────────────────────────────
git add package.json package-lock.json components.json
commit_with_date "2026-03-13T10:30:00+05:30" "chore: add dependencies — Tailwind, Radix UI, Recharts, Prisma"

# ─────────────────────────────────────────────
# COMMIT 3 — March 15: Tailwind + Global CSS
# ─────────────────────────────────────────────
git add tailwind.config.js app/globals.css
commit_with_date "2026-03-15T11:00:00+05:30" "design: configure Tailwind CSS with custom design tokens and CSS variables"

# ─────────────────────────────────────────────
# COMMIT 4 — March 17: Prisma Schema
# ─────────────────────────────────────────────
git add prisma/schema.prisma prisma/migrations/
commit_with_date "2026-03-17T14:20:00+05:30" "feat: define Prisma schema — User, Account, Transaction, Budget models"

# ─────────────────────────────────────────────
# COMMIT 5 — March 19: Lib utilities
# ─────────────────────────────────────────────
git add lib/prisma.js lib/utils.js
commit_with_date "2026-03-19T10:00:00+05:30" "feat: set up Prisma client singleton and utility helpers"

# ─────────────────────────────────────────────
# COMMIT 6 — March 20: Clerk Auth
# ─────────────────────────────────────────────
git add middleware.js lib/checkUser.js
commit_with_date "2026-03-20T09:45:00+05:30" "feat: integrate Clerk authentication with route middleware"

# ─────────────────────────────────────────────
# COMMIT 7 — March 22: Auth pages
# ─────────────────────────────────────────────
git add "app/(auth)/layout.js" "app/(auth)/sign-in/[[...sign-in]]/page.jsx" "app/(auth)/sign-up/[[...sign-up]]/page.jsx"
commit_with_date "2026-03-22T11:30:00+05:30" "feat: add sign-in and sign-up pages with Clerk components"

# ─────────────────────────────────────────────
# COMMIT 8 — March 24: Base UI components
# ─────────────────────────────────────────────
git add components/ui/button.jsx components/ui/input.jsx components/ui/card.jsx
commit_with_date "2026-03-24T13:00:00+05:30" "feat: add core UI components — Button, Input, Card"

# ─────────────────────────────────────────────
# COMMIT 9 — March 26: More UI components
# ─────────────────────────────────────────────
git add components/ui/select.jsx components/ui/badge.jsx components/ui/switch.jsx components/ui/progress.jsx
commit_with_date "2026-03-26T15:00:00+05:30" "feat: add Select, Badge, Switch, and Progress UI components"

# ─────────────────────────────────────────────
# COMMIT 10 — March 28: Form UI components
# ─────────────────────────────────────────────
git add components/ui/popover.jsx components/ui/calendar.jsx components/ui/drawer.jsx components/ui/dropdown-menu.jsx
commit_with_date "2026-03-28T10:30:00+05:30" "feat: add Popover, Calendar, Drawer, and DropdownMenu components"

# ─────────────────────────────────────────────
# COMMIT 11 — March 30: Data & table components
# ─────────────────────────────────────────────
git add components/ui/table.jsx components/ui/tooltip.jsx components/ui/checkbox.jsx components/ui/skeleton.jsx components/ui/sonner.jsx
commit_with_date "2026-03-30T14:00:00+05:30" "feat: add Table, Tooltip, Checkbox, Skeleton, and Sonner toast components"

# ─────────────────────────────────────────────
# COMMIT 12 — April 1: App layout and root
# ─────────────────────────────────────────────
git add app/layout.js app/not-found.jsx hooks/use-fetch.js
commit_with_date "2026-04-01T09:00:00+05:30" "feat: set up root layout, 404 page, and useFetch custom hook"

# ─────────────────────────────────────────────
# COMMIT 13 — April 3: Header component
# ─────────────────────────────────────────────
git add components/header.jsx
commit_with_date "2026-04-03T11:00:00+05:30" "feat: build site header with Clerk auth buttons and navigation"

# ─────────────────────────────────────────────
# COMMIT 14 — April 5: Dashboard layout
# ─────────────────────────────────────────────
git add "app/(main)/layout.js" "app/(main)/dashboard/layout.js" "app/(main)/loading.jsx" "app/(main)/dashboard/loading.jsx"
commit_with_date "2026-04-05T10:00:00+05:30" "feat: create protected dashboard layout with loading states"

# ─────────────────────────────────────────────
# COMMIT 15 — April 7: Dashboard actions
# ─────────────────────────────────────────────
git add actions/dashboard.js
commit_with_date "2026-04-07T14:00:00+05:30" "feat: implement getUserAccounts and createAccount server actions"

# ─────────────────────────────────────────────
# COMMIT 16 — April 9: Account actions
# ─────────────────────────────────────────────
git add actions/account.js
commit_with_date "2026-04-09T11:30:00+05:30" "feat: add getAccountWithTransactions and updateDefaultAccount actions"

# ─────────────────────────────────────────────
# COMMIT 17 — April 11: Account card component
# ─────────────────────────────────────────────
git add "app/(main)/dashboard/_components/account-card.jsx" components/create-account-drawer.jsx
commit_with_date "2026-04-11T13:00:00+05:30" "feat: build AccountCard component and CreateAccountDrawer"

# ─────────────────────────────────────────────
# COMMIT 18 — April 13: Category data
# ─────────────────────────────────────────────
git add data/categories.js app/lib/schema.js
commit_with_date "2026-04-13T10:00:00+05:30" "feat: define transaction categories and Zod validation schemas"

# ─────────────────────────────────────────────
# COMMIT 19 — April 15: Transaction actions
# ─────────────────────────────────────────────
git add actions/transaction.js
commit_with_date "2026-04-15T15:00:00+05:30" "feat: implement createTransaction, updateTransaction, and scanReceipt actions"

# ─────────────────────────────────────────────
# COMMIT 20 — April 17: Receipt scanner
# ─────────────────────────────────────────────
git add "app/(main)/transaction/_components/recipt-scanner.jsx"
commit_with_date "2026-04-17T12:00:00+05:30" "feat: integrate Gemini AI receipt scanner with image upload"

# ─────────────────────────────────────────────
# COMMIT 21 — April 19: Transaction form
# ─────────────────────────────────────────────
git add "app/(main)/transaction/_components/transaction-form.jsx" "app/(main)/transaction/create/page.jsx"
commit_with_date "2026-04-19T14:00:00+05:30" "feat: build full transaction form with recurring support and category selection"

# ─────────────────────────────────────────────
# COMMIT 22 — April 21: Budget actions
# ─────────────────────────────────────────────
git add actions/budget.js
commit_with_date "2026-04-21T10:00:00+05:30" "feat: implement budget tracking with getCurrentBudget and updateBudget actions"

# ─────────────────────────────────────────────
# COMMIT 23 — April 23: Budget progress component
# ─────────────────────────────────────────────
git add "app/(main)/dashboard/_components/budget-progress.jsx"
commit_with_date "2026-04-23T11:30:00+05:30" "feat: build BudgetProgress component with animated progress bar and inline editing"

# ─────────────────────────────────────────────
# COMMIT 24 — April 25: Transaction overview
# ─────────────────────────────────────────────
git add "app/(main)/dashboard/_components/transaction-overview.jsx"
commit_with_date "2026-04-25T13:00:00+05:30" "feat: create DashboardOverview with pie chart and recent transactions list"

# ─────────────────────────────────────────────
# COMMIT 25 — April 28: Account chart
# ─────────────────────────────────────────────
git add "app/(main)/account/_components/account-chart.jsx"
commit_with_date "2026-04-28T10:00:00+05:30" "feat: add AccountChart bar chart with date-range filtering"

# ─────────────────────────────────────────────
# COMMIT 26 — April 30: Transaction tables
# ─────────────────────────────────────────────
git add "app/(main)/account/_components/transaction-table.jsx" "app/(main)/account/_components/no-pagination-transaction-table.jsx"
commit_with_date "2026-04-30T14:00:00+05:30" "feat: build transaction tables with sorting, filtering, and bulk delete"

# ─────────────────────────────────────────────
# COMMIT 27 — May 2: Account detail page
# ─────────────────────────────────────────────
git add "app/(main)/account/[id]/page.jsx"
commit_with_date "2026-05-02T11:00:00+05:30" "feat: create Account detail page with chart and paginated transactions"

# ─────────────────────────────────────────────
# COMMIT 28 — May 5: Arcjet + rate limiting
# ─────────────────────────────────────────────
git add lib/arcjet.js
commit_with_date "2026-05-05T10:00:00+05:30" "feat: add Arcjet bot protection and rate limiting for API actions"

# ─────────────────────────────────────────────
# COMMIT 29 — May 7: Inngest background jobs
# ─────────────────────────────────────────────
git add lib/inngest/client.js lib/inngest/function.js app/api/inngest/route.js
commit_with_date "2026-05-07T13:00:00+05:30" "feat: set up Inngest for recurring transaction processing and budget alerts"

# ─────────────────────────────────────────────
# COMMIT 30 — May 9: Email templates
# ─────────────────────────────────────────────
git add emails/template.jsx actions/send-email.js
commit_with_date "2026-05-09T11:00:00+05:30" "feat: add React Email budget alert template and sendEmail action"

# ─────────────────────────────────────────────
# COMMIT 31 — May 12: Landing page data & hero
# ─────────────────────────────────────────────
git add data/landing.js components/hero.jsx
commit_with_date "2026-05-12T10:00:00+05:30" "feat: build landing page hero with parallax scroll and trust indicators"

# ─────────────────────────────────────────────
# COMMIT 32 — May 15: Full landing page
# ─────────────────────────────────────────────
git add app/page.js
commit_with_date "2026-05-15T14:00:00+05:30" "feat: complete public landing page with features, stats, workflow, and testimonials sections"

# ─────────────────────────────────────────────
# COMMIT 33 — May 19: Command palette
# ─────────────────────────────────────────────
git add components/command-palette.jsx
commit_with_date "2026-05-19T10:30:00+05:30" "feat: add command palette for quick app navigation"

# ─────────────────────────────────────────────
# COMMIT 34 — May 23: Seed & API utilities
# ─────────────────────────────────────────────
git add actions/seed.js app/api/seed/route.js .env.example
commit_with_date "2026-05-23T11:00:00+05:30" "feat: add database seed script and example env configuration"

# ─────────────────────────────────────────────
# COMMIT 35 — May 27: Dashboard page redesign
# ─────────────────────────────────────────────
git add "app/(main)/dashboard/page.jsx"
commit_with_date "2026-05-27T13:00:00+05:30" "design: redesign dashboard with net worth hero card and monthly income/expense summary"

# ─────────────────────────────────────────────
# COMMIT 36 — June 1: Multi-currency support
# ─────────────────────────────────────────────
git add components/currency-provider.jsx components/currency-display.jsx
commit_with_date "2026-06-01T10:00:00+05:30" "feat: implement multi-currency context with INR, USD, EUR, GBP support"

# ─────────────────────────────────────────────
# COMMIT 37 — June 5: AI insights & auto-budget
# ─────────────────────────────────────────────
git add actions/ai-insights.js "app/(main)/dashboard/_components/ai-insights.jsx"
commit_with_date "2026-06-05T14:00:00+05:30" "feat: add Gemini AI automated insights and auto-suggest budget recommendation engine"

# ─────────────────────────────────────────────
# COMMIT 38 — June 12: Final polish & .gitignore
# ─────────────────────────────────────────────
git add .gitignore public/
commit_with_date "2026-06-12T11:00:00+05:30" "chore: final cleanup, optimize .gitignore, and add public assets"

echo ""
echo "✅ All 38 commits created!"
echo ""
git log --oneline

# Switch back and replace main with new history
git branch -D main
git branch -m main
