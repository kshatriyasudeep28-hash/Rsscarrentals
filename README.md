# 🚗 Carvelle — Luxury Car Rental System

A premium, full-stack luxury car rental web application built with **Next.js 16**, **TypeScript**, and **Razorpay** payment integration. Features a cinematic dark-themed UI with amber/gold accents inspired by high-end automotive brands.

---

## ✨ Features

### Customer-Facing
- **Home Page** — Hero section, stats bar, featured vehicles, how-it-works, and CTA banner
- **Fleet Page** (`/cars`) — Browse all 9 luxury vehicles with real-time search, filter (fuel, transmission, seats), and sort
- **Car Detail Page** (`/cars/[id]`) — Full vehicle details, thumbnail gallery, features list, trust badges, and related vehicles
- **Booking Page** (`/booking`) — Multi-step form with Razorpay payment integration (INR pricing)
- **Login Page** (`/login`) — Authentication form with show/hide password and admin portal link
- **Register Page** (`/register`) — Account creation with terms acceptance
- **About Page** (`/about`) — Company story, stats, mission, core values, and team section
- **Contact Page** (`/contact`) — Contact info cards and working message form with success state

### Admin Panel
- **Admin Login** (`/admin/login`) — Secure login with dark Carvelle theme
  - Credentials: `admin@carvelle.com` / `admin123`
- **Admin Dashboard** (`/admin/dashboard`) — Revenue/booking stat cards, full orders table with search, filter by status, and coloured status badges

### Payment
- **Razorpay Integration** — Create orders via `/api/create-order`, verify payments via `/api/verify-payment`
- All prices displayed in **Indian Rupees (₹)**

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.1.6 (App Router + Turbopack) |
| Language | TypeScript |
| Styling | Vanilla CSS with CSS variables + Tailwind utility classes |
| Fonts | Inter (Google Fonts) |
| Icons | Lucide React |
| Payments | Razorpay |
| Runtime | Node.js |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Home page
│   ├── layout.tsx            # Root layout (Navbar + Footer)
│   ├── globals.css           # Design tokens & global styles
│   ├── about/page.tsx        # About Us page
│   ├── contact/page.tsx      # Contact page
│   ├── login/page.tsx        # User login
│   ├── register/page.tsx     # User registration
│   ├── cars/
│   │   ├── page.tsx          # Fleet listing with filters
│   │   └── [id]/page.tsx     # Car detail page
│   ├── booking/page.tsx      # Booking + payment page
│   ├── admin/
│   │   ├── login/page.tsx    # Admin login
│   │   └── dashboard/page.tsx # Admin dashboard
│   └── api/
│       ├── create-order/route.ts   # Razorpay order creation
│       └── verify-payment/route.ts # Payment verification
├── components/
│   ├── Navbar.tsx            # Sticky, scroll-aware navbar
│   ├── Hero.tsx              # Cinematic hero with search
│   ├── CarCard.tsx           # Vehicle card component
│   ├── BookingForm.tsx       # Multi-step booking form
│   ├── Footer.tsx            # Site footer
│   └── Button.tsx            # Reusable button component
├── data/
│   ├── cars.ts               # 9 luxury vehicles dataset
│   └── orders.ts             # Sample orders dataset
└── types/
    └── index.ts              # TypeScript interfaces (Car, Order)
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- A Razorpay account (for payment features)

### Installation

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd car-rental-system

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.local.example .env.local
# Then edit .env.local with your Razorpay keys

# 4. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Environment Variables

Create a `.env.local` file in the project root:

```env
# Razorpay Payment Gateway
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
```

> **How to get Razorpay keys:**
> 1. Sign up at [razorpay.com](https://razorpay.com)
> 2. Go to **Settings → API Keys**
> 3. Generate a key pair and copy to `.env.local`

---

## 🛣️ Routes

| Route | Description |
|-------|-------------|
| `/` | Home page |
| `/cars` | Full fleet listing with filters |
| `/cars/:id` | Individual car detail page |
| `/booking?carId=:id` | Booking & payment page |
| `/login` | User login |
| `/register` | User registration |
| `/about` | About Carvelle |
| `/contact` | Contact form |
| `/admin/login` | Admin portal login |
| `/admin/dashboard` | Admin bookings dashboard |
| `POST /api/create-order` | Create Razorpay order |
| `POST /api/verify-payment` | Verify payment signature |

---

## 🎨 Design System

The UI uses CSS custom properties defined in `globals.css`:

| Variable | Value | Usage |
|----------|-------|-------|
| `--background` | `#0a0a0f` | Page background |
| `--surface` | `#111118` | Card/panel background |
| `--primary` | `#c9a96e` | Amber gold accent |
| `--foreground` | `#f0ede8` | Primary text |
| `--border` | `rgba(255,255,255,0.08)` | Subtle borders |

---

## 🚗 Fleet (Sample Data)

| # | Car | Price/Day |
|---|-----|-----------|
| 1 | BMW M4 Competition (2024) | ₹38,000 |
| 2 | Mercedes-Benz S-Class (2023) | ₹46,000 |
| 3 | Audi RS e-tron GT (2024) | ₹51,000 |
| 4 | Porsche 911 Carrera (2023) | ₹59,500 |
| 5 | Range Rover Autobiography (2024) | ₹42,000 |
| 6 | Tesla Model S Plaid (2023) | ₹34,000 |
| 7 | Ferrari SF90 Stradale (2024) | ₹1,02,000 |
| 8 | Lamborghini Huracán EVO (2023) | ₹93,500 |
| 9 | Rolls-Royce Ghost (2024) | ₹1,27,500 |

---

## 🔑 Admin Demo Credentials

| Field | Value |
|-------|-------|
| Email | `admin@carvelle.com` |
| Password | `admin123` |

> ⚠️ This uses mock cookie-based auth. Replace with real authentication (NextAuth.js, Clerk, etc.) for production.

---

## 📜 Scripts

```bash
npm run dev      # Start development server (Turbopack)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## 📄 License

MIT © 2026 Carvelle. All rights reserved.
