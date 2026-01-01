## NextPlay AI Business Automation

This project delivers a full-stack automation console that classifies customer intent, routes the request to specialized AI playbooks (sales, support, payments, call scheduling, or general business reply), and surfaces the generated response in real time.

Built with **Next.js App Router**, **React**, and the **OpenAI API**. Deployed to Vercel in seconds.

---

## 1. Prerequisites

- Node.js 18.18+ (or any runtime supported by Next.js 16)
- npm (installed automatically with Node.js)
- An [OpenAI API key](https://platform.openai.com/api-keys) for production-grade replies

---

## 2. Environment Setup

Copy the sample environment file and add your OpenAI credentials:

```bash
cp .env.example .env.local
```

Update `.env.local`:

```bash
OPENAI_API_KEY=sk-your-key
OPENAI_MODEL=gpt-4o-mini # optional override
```

Without a key the app will still run using deterministic fallback responses, which is useful for demos and smoke tests.

---

## 3. Install & Run

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to access the automation console.

---

## 4. Production Build

```bash
npm run build
npm start
```

This compiles the app for production and serves it with Next.js.

---

## 5. API Contract

`POST /api/ai`

```json
{
  "message": "Customer message text",
  "channel": "chat | email | call",
  "customer_name": "Customer Name"
}
```

Successful response:

```json
{
  "intent": "BUY",
  "reply": "AI generated reply",
  "time": "2025-01-01T12:00:00.000Z"
}
```

Errors return `{ "error": "<message>" }` with the appropriate HTTP status code.

---

## 6. Deployment

Vercel is the recommended target:

```bash
vercel deploy --prod --token $VERCEL_TOKEN --name agentic-43fa3da7
```

Ensure the production project has `OPENAI_API_KEY` (and optionally `OPENAI_MODEL`) configured in the Vercel dashboard or via `vercel env`.

---

## 7. Stack

- Next.js 16 (App Router, server actions)
- React 19
- Tailwind CSS v4 (utility-first styling)
- OpenAI Chat Completions API

---

## 8. Development Notes

- The UI provides immediate feedback with loading and error states.
- API requests gracefully degrade when OpenAI credentials are missing, enabling local development without external calls.
- Intent detection and reply generation live in `src/lib/automation.ts` for easy reuse.
