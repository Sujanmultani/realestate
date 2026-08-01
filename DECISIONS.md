# Real Estate Portal — Architecture & Design Decisions

This document outlines key technical and architectural decisions made while building the unified Next.js 15 full-stack Real Estate Portal.

---

## 1. Unified Next.js 15 (App Router) Architecture
- **Rationale**: Merging frontend UI and backend API/Server Actions into a single Next.js codebase simplifies deployment, eliminates CORS issues, and provides zero-waterfall server rendering.
- **Server Components by Default**: Public routes (`/`, `/listings`, `/property/[id]`, `/favorites`, `/admin`) directly invoke Mongoose data access functions (`lib/data.js`) on the server.
- **Client Component Boundaries**: Interactivity (`FilterBar`, `FavoriteButton`, `ContactModal`, `PropertyManagerClient`, `CloudinaryUploader`) is isolated to client component leaves for minimal JavaScript payload size.

---

## 2. Database & Connection Pooling (`lib/db.js`)
- **Singleton Connection Pattern**: In Next.js development and serverless environments, module re-evaluations can lead to unbounded MongoDB connection accumulation. `lib/db.js` implements global Mongoose connection caching (`global.mongoose`) to reuse existing sockets across hot module reloads.
- **Mongoose Indexing**: Indexed key lookup fields (`address.city`, `listingType`, `propertyType`, `price`) for instant query response times across large property catalogs.

---

## 3. URL-Driven Filtering via `searchParams`
- **Natural Next.js Advantage**: `/listings?city=Mumbai&listingType=sale&bedrooms=3&sort=price_asc` directly powers the MongoDB query on the server.
- **Shareable & SEO-Friendly**: Filter states can be bookmarked or shared via URL without client-side state loss.

---

## 4. NextAuth Credentials Authentication & Role Security
- **JWT Session Strategy**: Configured NextAuth Credentials Provider in `lib/auth.js` with `bcryptjs` password verification.
- **Server-Side Admin Layout Guard**: `/admin/layout.jsx` evaluates `session.user.role === 'admin'` before rendering any admin UI component, completely preventing client-side layout flashing.

---

## 5. Server Actions for Mutations & Path Revalidation
- **Inquiries & Favorites**: Form submissions and heart toggles execute Server Actions (`lib/actions.js`), performing atomic MongoDB updates.
- **Revalidation**: Admin property additions, edits, and deletions invoke `revalidatePath('/listings')` and `revalidatePath('/')` to instantly refresh cached public pages without full site rebuilds.

---

## 6. Image Upload via Cloudinary Signed Authorization
- **Route Handler Signature**: `/api/upload` issues signed Cloudinary upload tokens.
- **Direct Client Upload**: Admin images upload directly from the browser to Cloudinary, storing returned HTTPS URLs in the property document.
