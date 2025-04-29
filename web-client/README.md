# Web Client

React-based frontend application for the Image Cropper project.

## Prerequisites

- Node.js 16 or higher
- Any package manager (npm preferred)

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create environment file:

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. Build the web app:

   ```bash
   npm run build
   ```

4. Preview the build

   ```bash
   npm run preview
   ```

The application will be available at [http://localhost:4173](http://localhost:4173).

## Environment Variables

| Variable        | Description        | Default               |
| --------------- | ------------------ | --------------------- |
| VITE_SERVER_URL | Backend server URL | http://localhost:8000 |

## Project Structure

```
web-client/
├── src/
│   ├── components/     # React components
│   ├── lib/             # Utility functions and configurations
│   └── App.tsx          # Main application component
├── public/              # Static assets
└── package.json         # Project dependencies
```

## Tech Stack

- React
- RxJS
- Tailwind CSS
- IndexedDB

## Preview

- Frontend runs locally on [http://localhost:4173](http://localhost:4173)
- Live deployment available at [https://image-cropper-henna.vercel.app/](https://image-cropper-henna.vercel.app/)
