# CafeFlow

> A single-cafe ordering system that moves browsing, ordering, token generation, and kitchen management into one responsive web application.

---

## Overview

CafeFlow eliminates the friction of manual cafe ordering. Customers browse menu categories, add items to a cart, place an order without creating an account, and receive a token number. They can later track their order status using just their phone number.

Cafe staff get a PIN-protected admin dashboard to view active orders, update kitchen status in real time, and review weekly sales analytics — all without touching a third-party POS system.

The project is built as a single Next.js codebase that handles both the customer-facing storefront and the protected admin backend using Server Actions and Supabase PostgreSQL.

---

## Key Features

**Customer Side**
- Browse menu across three categories: Cold Coffee, Thick Shakes, and Mocktails
- Persistent cart stored securely in local storage
- Checkout with name and phone number — no account required (with Zod validation)
- Token number (`order_no`) displayed on successful order placement
- Order history lookup by 10-digit phone number

**Admin Side**
- PIN-based login with a signed `httpOnly` session cookie
- Live order dashboard split into active orders and order history
- One-click status transitions: `pending → preparing → completed / cancelled`
- Auto-polling every 5 seconds for fresh order data
- Weekly analytics page with daily order breakdowns

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.1.1 (App Router) |
| UI Library | React 19.2.3 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Database | Supabase PostgreSQL |
| Validation | Zod & React Hook Form |
| Toasts | Sonner |
| State Management | Zustand (persisted cart store) |
| Icons | Lucide React |
| Testing | Vitest |

---

## Screenshots

<p align="center">
  <img src="assets/home.png" alt="Home" width="900">
</p>

<p align="center">
  <img src="assets/cart.png" alt="Cart" width="49%">
  <img src="assets/footer.png" alt="Footer" width="49%">
</p>

---

## Documentation

All project documentation lives in the `/docs` folder (or alongside source files). Each file covers a specific layer of the system:

| File | Description |
|---|---|
| [`01_PRD.md`](./docs/01_PRD.md) | Product requirements — goals, user roles, features, business rules, and constraints |
| [`02_TRD.md`](./docs/02_TRD.md) | Technical requirements — architecture, API design, auth model, security, and state management |
| [`03_AppFlow.md`](./docs/03_AppFlow.md) | Application flows — navigation structure, user journeys, data flow, and edge cases |
| [`04_UI_UX.md`](./docs/04_UI_UX.md) | UI/UX specifications — color system, component library, page inventory, responsive rules, and empty/error states |
| [`05_BackendSchema.md`](./docs/05_BackendSchema.md) | Database schema — tables, constraints, indexes, RLS policies, and SQL functions |

---

## Getting Started

### Prerequisites

Make sure the following are installed on your machine:

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A [Supabase](https://supabase.com/) project (free tier works)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/cafeflow.git
cd cafeflow

# 2. Install dependencies
npm install
```

### Environment Variables

Copy the example environment file and fill in your Supabase credentials:

```bash
cp .env.example .env.local
```

Open `.env.local` and set the following values:

```env
# Supabase – found in your project's API settings
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Admin PIN – used for staff login
ADMIN_PIN=your-admin-pin

# Cookie signing secret – any random string (min 32 chars recommended)
COOKIE_SECRET=your-cookie-secret
```

> ⚠️ Never commit `.env.local` to version control. The `SUPABASE_SERVICE_ROLE_KEY` is sensitive and must only be used in server-side code.

**Database Setup**

Apply the schema to your Supabase project by running the SQL file in the Supabase SQL editor:

```
assets/DATABASE.sql
```

This creates the `menu_items` and `orders` tables, the `order_status_type` enum, all indexes, RLS policies, and the `get_orders_by_phone` function. After running the script, manually seed the `menu_items` table with your cafe's menu data.

### Running Locally

```bash
# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

- Customer menu: `http://localhost:3000`
- Admin dashboard: `http://localhost:3000/admin/login`

---

## Available Scripts

| Script | Command | Description |
|---|---|---|
| Development | `npm run dev` | Start the Next.js dev server with hot reload |
| Build | `npm run build` | Create an optimised production build |
| Start | `npm run start` | Run the production build locally |
| Lint | `npm run lint` | Run ESLint across the project |
| Test | `npm run test` | Run unit tests with Vitest |

---

## Deployment

CafeFlow is a standard Next.js application and can be deployed to any platform that supports Node.js or edge runtimes.

**Recommended: [Vercel](https://vercel.com/)**

1. Push your repository to GitHub.
2. Import the project in Vercel.
3. Add all environment variables from `.env.local` in the Vercel project settings.
4. Deploy — Vercel handles builds and routing automatically.

> Make sure `COOKIE_SECRET` is set in production. The admin session cookie uses `secure: true` in production, so the app must be served over HTTPS.

---

## 🤝 Contributing

Contributions are always welcome!

If you'd like to improve this project, please read our
[Contributing Guide](./CONTRIBUTING.md) before submitting a Pull Request.

## License

This project is open source and available under the [MIT License](./LICENSE).

---

## Contact Owner
Built by **Harshit Singhal** | BTech CSE | Manav Rachna University

- [Portfolio](https://harshit-singhal.vercel.app)
- [LinkedIn](https://linkedin.com/in/harshitsinghal11)

> _Feel free to reach out if you're building something similar or have questions about the implementation._
