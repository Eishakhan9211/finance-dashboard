 💰 Personal Finance Tracker

Web dashboard for monthly spending: bar chart, optional pie chart, month filter, and transaction table. The live app is built with **Next.js** and is ready to deploy on [Vercel](https://vercel.com). The original Streamlit version is kept under `streamlit-legacy/` if you want to run it locally with Python.

## Deploy on Vercel

1. Push this repository to GitHub (already set up for Next.js in the project root).
2. In Vercel, **Import Project** → select this repo.
3. Framework preset: **Next.js** (default). Build: `npm run build`, Output: handled automatically.
4. Deploy. No extra environment variables are required for the sample dashboard.

## Run Next.js locally

Requires [Node.js](https://nodejs.org/) 18+.

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Optional: Streamlit (local only)

Streamlit uses a long-running server and is **not** used for the Vercel deployment.

```bash
pip install -r streamlit-legacy/requirements.txt
streamlit run streamlit-legacy/dashboard.py
```

## Features

1. Monthly spending analysis  
2. Bar chart and optional pie chart  
3. Filter by month  
4. Optional full transaction table  
