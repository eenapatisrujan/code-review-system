
# AI Code Review Assistant

An interactive code review UI built with React + Vite and a Node/Express backend. It lets you upload a file or paste code, then shows a report with metrics, charts, and insights. The report includes an accurate “Lines of Code” metric derived directly from the uploaded/pasted content.

I built most of this project and used AI assistance selectively (to help plan and validate approaches, draft some boilerplate, and speed up integration). I reviewed, adapted, and tested the final implementation.

## Features

- Accurate “Lines of Code” metric for uploaded/pasted content
- Upload file or paste code for analysis
- Polished review page with summary, charts, and recommendations
- Mocked analysis text for local/demo use (swap in a real LLM later)
- Clean separation between frontend and backend

## Tech Stack

- Frontend: React + TypeScript (Vite), motion, recharts, lucide-react
- Backend: Node.js (Express, Multer for uploads), CORS

## Architecture

- Frontend posts code/file to backend `/api/analyze`.
- Backend reads content, computes `lineCount`, returns `{ analysis, lineCount }`.
- Frontend wires response to app state and renders metrics on the review page.

```
[UI Upload/Paste] -> POST /api/analyze -> [Express reads content] -> lineCount
                                              |-> { analysis, lineCount } -> [UI Review]
```

## Prerequisites

- Node.js 18+ (recommended)
- npm or yarn

## Setup

1) Install dependencies

```
npm install
```

2) Environment variables (backend)

Create a `.env` file in the project root:

```
GEMINI_API_KEY=your_key_here
```

Note: The backend currently returns a mocked analysis text but still expects the key at startup.

## Running Locally

Start the backend (port 3001):

```
node server.js
```

Start the frontend (port 3000):

```
npm run dev
```

Visit `http://localhost:3000`.

## Usage

1. Open the app and choose “Upload File” or “Paste Text”.
2. Provide the content and click “Generate Review”.
3. The review page displays metrics; verify “Lines of Code” matches your input.

### Quick Checks

- Paste exactly three lines (`a\nb\nc`) → expect 3 lines.
- Include a trailing newline (`a\nb\nc\n`) → expect 4 lines.

## API (Local)

`POST /api/analyze`

- Content-Type: `multipart/form-data` with field `file`, or `application/json` with `{ code: string }`.
- Returns: `{ analysis: string, lineCount: number }`.

## Key Files Changed (LOC feature)

- `server.js`: computes `lineCount` and returns it
- `src/components/BedowUploadPage.tsx`: reads `lineCount` from response and lifts it
- `src/App.tsx`: stores `lineCount` in state and passes to review page
- `src/components/BedowReviewPage.tsx`: renders the dynamic `lineCount`

## Troubleshooting

- Backend requires `GEMINI_API_KEY` even for mocked output. If you don’t have a key, you can stub the check in `server.js` for local demos.
- Ports in use: frontend runs on 3000, backend on 3001. Ensure both are free or adjust configs.
- CORS: backend allows `http://localhost:3000`. Update origin if your frontend runs elsewhere.
- Windows paths: uploads use the `uploads/` directory created by Multer.

## Roadmap / Future Work

- Replace mocked analysis with a real LLM response
- Expand metrics (function counts, cyclomatic complexity, dependencies) using static analysis
- Exportable PDF/HTML reports
- Persist report history to a database

## Credits & Acknowledgements

- UI inspiration: Figma concept (see `src/Attributions.md` and design references)
- Libraries: motion, recharts, lucide-react, express, multer

## Scripts

- `npm run dev`: start Vite dev server (frontend)
- `node server.js`: start backend

## Project Structure (Top Level)

- `src/` – React app (components, pages, styles)
- `server.js` – Express API server
- `uploads/` – temp storage for Multer uploads
- `vite.config.ts` – Vite config and dev proxy

## Notes on AI Assistance

I used AI to help plan and double-check some parts of the implementation and to speed up routine edits. I validated the outputs, wrote and integrated the final code, and tested the behavior locally.
  
