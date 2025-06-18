# RepoVitals UI

The frontend for RepoVitals — giving developers, maintainers, and enterprises a visual overview of open-source project health.

## 🌐 Tech Stack

- Framework: React + Next.js
- State: Zustand
- Styling: TailwindCSS
- Auth: Clerk or Firebase (OAuth + Email)
- API: Connects to [`repovitals-api`](https://github.com/repovitals/repovitals-api)

## 💡 Key Features

- Search + filter across thousands of projects
- Repo summary view with health, security, and maintenance signals
- Score history and metric breakdowns
- Login for scan tracking and premium plans
- Pricing tiers and Stripe integration


## 🚀 Getting Started

```bash
git clone https://github.com/repovitals/repovitals-ui.git
cd repovitals-ui
cp .env.example .env.local
npm install
npm run dev
```
Requires a running instance of the API server.

## Fair Use Notice

While the source code for RepoVitals UI is publicly available under the Apache 2.0 License, please note:

- This UI is intended to be used in conjunction with the official RepoVitals API and backend.
- Commercial use of this frontend to replicate or compete with the RepoVitals platform is not permitted without a commercial license.
- For partnership or commercial inquiries, please contact us at: support@repovitals.com

We welcome contributions, improvements, and forks for personal or educational use.

## 📄 License

Apache License (2.0) 
