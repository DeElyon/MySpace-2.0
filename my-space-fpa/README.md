# My Space FPA - Next-Gen Freelance Platform

This is the prototype implementation of the **My Space FPA** platform, built with the 2026 Tech Stack.

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (Cosmic Theme)
- **UI:** Custom Glassmorphism Components

## Getting Started

1. Navigate to the web app:
   ```bash
   cd apps/web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure
- `apps/web`: The main Next.js application.
  - `app/globals.css`: Contains the Design System (Colors, Fonts, Animations).
  - `components/`: Reusable UI components (Navbar, Hero, etc.).

## Design System
The project uses the "Cosmic" theme defined in the Design Document:
- **Primary Colors:** Deep Space (`#0A0F1E`), Cosmic Purple (`#6366F1`), Neon Cyan (`#22D3EE`).
- **Typography:** Inter (Sans), JetBrains Mono (Code), Space Grotesk (Display).
- **Effects:** Glassmorphism, Neon Glows, Floating Animations.
