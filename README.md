# NextPlay AI Business Automation

Full-stack implementation of the NextPlay AI automation console. The app detects customer intent, routes the request to dedicated AI playbooks (sales, support, payment, call scheduling, or general), and surfaces the generated reply instantly.

- Frontend + API: [`agentic-app`](agentic-app) (Next.js 16, React 19, Tailwind CSS v4)
- Infrastructure ready for Vercel deployment

## Quickstart

```bash
cd agentic-app
npm install
cp .env.example .env.local # add OPENAI_API_KEY
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to use the automation console.

## Deployment

```bash
vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-43fa3da7
```

Ensure Vercel environment variables include `OPENAI_API_KEY` (and optionally `OPENAI_MODEL`).
