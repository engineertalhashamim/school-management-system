This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

<<<<<<< HEAD
=======
## School Management System Frontend

A modern, responsive school management system built with Next.js 14, TypeScript, and Tailwind CSS.

### Features Implemented

#### 🔐 Authentication System
- **Login Form** (`/components/LoginForm.tsx`)
  - Email/Phone input field
  - Password field with show/hide toggle
  - Forgot password link
  - Login button with gradient styling
  - Switch to signup option

- **Signup Form** (`/components/SignupForm.tsx`)
  - Full name, email, password, and confirm password fields
  - Password visibility toggles
  - Signup button with gradient styling
  - Switch to login option

- **Auth Pages**
  - Root page (`/app/page.tsx`) - Combined login/signup toggle interface
  - Login page (`/app/(auth)/login/page.tsx`) - Dedicated login page
  - Signup page (`/app/(auth)/signup/page.tsx`) - Dedicated signup page

#### 📊 Dashboard
- **Dashboard Page** (`/app/dashboard/page.tsx`)
  - Sidebar navigation with active state management
  - Search bar for students and teachers
  - Notification bell with indicator
  - User avatar placeholder

- **Dashboard Components**
  - **Sidebar** (`/components/dashboard/Sidebar.tsx`) - Navigation menu
  - **DashboardHome** (`/components/dashboard/DashboardHome.tsx`) - Main dashboard content
  - **StatsCard** (`/components/dashboard/StatsCard.tsx`) - Statistics display cards

- **Dashboard Statistics**
  - Total Students: 2,480 (+12 this month)
  - Total Teachers: 186 (3 new this semester)
  - Total Classes: 48 (Across 12 grades)
  - Attendance Today: 94% (147 absents)
  - Fees Collected: $84,200 (This month)
  - Pending Fees: 320 students
  - Exams Scheduled: 8 (Next: May 10)

#### 🎨 UI/UX Features
- **Responsive Design** - Works on desktop and mobile devices
- **Gradient Backgrounds** - Purple gradient theme throughout
- **Modern Components** - Clean, professional interface
- **Interactive Elements** - Hover effects, transitions, and animations
- **Form Validation Ready** - Input fields with focus states and styling

#### 🛠️ Technical Implementation
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Component Architecture** - Reusable, modular components
- **Client-side Navigation** - Smooth routing between pages
- **State Management** - React hooks for local state

### Project Structure

```
frontend/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── dashboard/page.tsx
│   └── page.tsx (root auth page)
├── components/
│   ├── dashboard/
│   │   ├── DashboardHome.tsx
│   │   ├── Sidebar.tsx
│   │   └── StatsCard.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   └── Table.tsx
│   ├── LoginForm.tsx
│   └── SignupForm.tsx
├── hooks/
├── lib/
├── services/
└── types/
```

>>>>>>> 293cfc5 (full project setup)
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
