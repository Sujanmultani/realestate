# Real Estate Portal (Next.js 15 Full-Stack)

A complete, production-ready Real Estate Portal built with Next.js 15 (App Router), Tailwind CSS, MongoDB, Mongoose, NextAuth.js, and Cloudinary.

---

## Key Features

1. **Server-Rendered Listings & Details**: SEO-optimized public pages fetching data directly via Mongoose.
2. **URL-Driven Search & Filters**: Filter properties by city, listing type (sale/rent), category (apartment/villa/house/plot/commercial), price range, and BHK count via `searchParams`.
3. **Interactive Buyer Inquiries**: Direct owner contact modal powered by Next.js Server Actions with immediate feedback.
4. **Saved Favorites**: Shortlist properties with optimistic state toggling and server-side `/favorites` view.
5. **Role-Gated Admin Panel**:
   - Secure layout guard (`/admin/*`).
   - Dashboard analytics (Total Properties, Active Listings, Inquiries, Total Views).
   - Property management (Add/Edit/Delete with Cloudinary image upload & automatic `revalidatePath`).
   - Inquiry lead manager (Update status from `pending` -> `contacted` -> `closed`).

---

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS (Zinc/Slate neutral palette + Emerald accent)
- **Database**: MongoDB + Mongoose (Cached connection singleton)
- **Auth**: NextAuth.js (Credentials Provider + JWT sessions + bcryptjs)
- **Uploads**: Cloudinary API Signed Uploads
- **Icons**: Lucide React

---

## Getting Started

### 1. Prerequisites
- Node.js 18.x or 20.x installed.
- Local MongoDB running on `mongodb://127.0.0.1:27017` OR MongoDB Atlas connection URI.

### 2. Environment Setup
Create a `.env.local` file in the root directory:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/realestate
NEXTAUTH_SECRET=super_secret_real_estate_key_2026
NEXTAUTH_URL=http://localhost:3000

# Cloudinary (Optional, fallback provided)
CLOUDINARY_CLOUD_NAME=demo
CLOUDINARY_API_KEY=1234567890
CLOUDINARY_API_SECRET=demo_secret
```

### 3. Installation & Run

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Database Seeding

To populate the database with realistic demo properties and pre-configured user & admin accounts:

1. Ensure the app is running (`npm run dev`).
2. Visit [http://localhost:3000/api/seed](http://localhost:3000/api/seed) in your browser OR run:
   ```bash
   npm run seed
   ```

### Pre-Configured Demo Credentials

| Role | Email | Password | Access |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@realestate.com` | `admin123` | Full access to `/admin` dashboard & management |
| **User** | `user@realestate.com` | `user123` | Standard user for saving favorites |

---

## Project Structure

```
realestate-portal/
├── app/
│   ├── (public)/
│   │   ├── page.jsx                   # Home Page (Server Component)
│   │   ├── listings/page.jsx          # Property Listings (Server Component + searchParams)
│   │   ├── property/[id]/page.jsx     # Property Detail (Server Component + views counter)
│   │   ├── login/page.jsx             # NextAuth Login
│   │   └── register/page.jsx          # User Registration
│   ├── (protected)/
│   │   └── favorites/page.jsx         # User Favorites (Server Guarded)
│   ├── admin/
│   │   ├── layout.jsx                 # Admin Role Guard Layout
│   │   ├── page.jsx                   # Dashboard Overview & Stats
│   │   ├── properties/page.jsx        # Manage Properties
│   │   └── inquiries/page.jsx         # Manage Inquiries
│   ├── api/
│   │   ├── auth/[...nextauth]/route.js# NextAuth handler
│   │   ├── properties/route.js        # GET/POST properties
│   │   ├── properties/[id]/route.js   # GET/PUT/DELETE property
│   │   ├── inquiries/route.js         # Inquiry API
│   │   ├── favorites/route.js         # Favorites API
│   │   ├── register/route.js          # User Registration API
│   │   ├── upload/route.js            # Cloudinary signature API
│   │   └── seed/route.js              # Database seed API
│   ├── layout.jsx                     # Root Layout
│   └── globals.css
├── components/                        # UI Components (Navbar, Footer, PropertyCard, FilterBar, ContactModal, etc.)
├── lib/                               # Core utilities (db.js, auth.js, data.js, actions.js, cloudinary.js)
├── models/                            # Mongoose Schemas (User.js, Property.js, Inquiry.js)
├── DECISIONS.md                       # Architectural Decisions
└── README.md
```
