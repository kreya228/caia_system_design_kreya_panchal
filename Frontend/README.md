# CAIA – System Design Knowledge Base

A full-stack web application for browsing, searching, and managing system design concepts.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend Framework | React 19 + Vite |
| Styling | Tailwind CSS + Material UI |
| Routing | React Router DOM |
| State Management | Redux Toolkit + React Redux |
| HTTP Client | Axios |
| Backend | Node.js + Express |
| Database | MongoDB |

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd Frontend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

The app will be available at **http://localhost:5173**

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build production bundle |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run linter |

---

## Project Structure

```
src/
├── assets/         # Static assets (images, fonts)
├── components/     # Reusable UI components
├── features/       # Redux slices and feature modules
├── hooks/          # Custom React hooks
├── pages/          # Page-level components
├── services/       # Axios API service modules
├── store/          # Redux store configuration
├── utils/          # Utility helpers
├── App.jsx         # Root application component
├── main.jsx        # Application entry point
└── index.css       # Global styles + Tailwind directives
```

---

## Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```
VITE_API_BASE_URL=http://localhost:5000/api/v1
VITE_APP_NAME=CAIA
```

---

## License

MIT
