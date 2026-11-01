# BookNook

**A small online library. Add a book, borrow a book, return a book.**

Live site: https://YOUR-SITE.vercel.app  <!-- replace with your real Vercel URL -->
Server repo: https://github.com/YOUR_NAME/booknook-server

## Features

- Email/password and Google login with Better Auth (MongoDB adapter), with JWTs for the API.
- Add a book with a cover image (imgbb), category and total copies; edit or delete your own books with a confirm modal.
- Borrow a book in one step. Copies drop by one with `$inc`, come back when you return, and the button turns to "Not Available" at zero.
- A reader cannot borrow the same book twice at the same time.
- Home page slider (Swiper), live New Arrivals, a borrowing guide and category shortcuts.
- Private routes that survive a page reload, a custom 404 page, a title on every route, and toast messages everywhere.
- Light and dark theme, responsive from phone to desktop.

## Tech

Next.js (App Router), DaisyUI, Better Auth, Swiper, Framer Motion, react-hot-toast, Express, MongoDB.

## Run locally

```bash
npm install
cp .env.example .env.local   # fill in the values
npm run dev
```

## Deploy on Vercel

1. Import this repo into Vercel.
2. Add every variable from `.env.example`. Set `BETTER_AUTH_URL` and `NEXT_PUBLIC_APP_URL` to your live URL, and `NEXT_PUBLIC_API_URL` to the deployed server.
3. In Google Cloud Console add `https://YOUR-SITE.vercel.app/api/auth/callback/google` as an authorized redirect URI.
