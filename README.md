## SAAT Menu

https://github.com/vichea/saat-menu

## Tech Stack

- Next.js 16
- React 19 + TypeScript
- Tailwind CSS
- Zustand

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Visit `http://localhost:3000` to view the web app.

## Project Structure

- `src/app` – App Router pages (`/`, `/menu`, `/menu/[id]`, `/order`)
- `src/components` – Reusable UI (header, menu browse, add-to-order button)
- `src/data/menu.json` – Static menu json data
- `src/store/cartStore.ts` – Zustand cart logic
- `src/types` – Shared TypeScript types
