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

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| VITE_SERVER_URL | Backend server URL | http://localhost:8000 |

## Project Structure

```
web-client/
├── src/
│   ├── components/     # React components
│   ├── lib/           # Utility functions and configurations
│   ├── store/         # State management
│   └── App.tsx        # Main application component
├── public/            # Static assets
└── package.json       # Project dependencies
```

## Features

- Drag and drop image upload
- Image cropping with various aspect ratios:
  - Free (no fixed ratio)
  - Square (1:1)
  - Landscape (16:9)
  - Portrait (9:16)
  - Widescreen (21:9)
- Real-time preview
- Responsive design

## License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.
