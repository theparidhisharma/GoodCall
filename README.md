# GoodCall

A React TypeScript application for food product scanning and analysis.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up your API key in `src/config.ts`:
```typescript
export const API_KEY = "your-api-key-here";
```

3. Run the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── MatchScoreRing.tsx
│   ├── VerdictBanner.tsx
│   ├── KeyTradeoff.tsx
│   └── MicroPromptBar.tsx
├── views/            # View components (pages/screens)
│   ├── CameraView.tsx
│   ├── DecisionView.tsx
│   ├── CompareView.tsx
│   ├── WarningView.tsx
│   ├── WrappedView.tsx
│   ├── GoalsView.tsx
│   ├── HistoryView.tsx
│   └── AnalysisView.tsx
├── services/         # Business logic and API services
│   └── GeminiService.ts
├── types.ts          # TypeScript type definitions
├── config.ts         # Configuration constants
├── constants.ts      # Application constants
├── App.tsx           # Main application component
└── index.tsx         # Application entry point
```

## Technologies

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lucide React (icons)
