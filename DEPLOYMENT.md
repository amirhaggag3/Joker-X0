# Deployment (GitHub -> Vercel)

1. Push the contents of this folder to the **root** of the GitHub repo
   (`package.json` and `app/` must be at the top level of the repo).
2. In Vercel: New Project -> import the repo. Leave **Root Directory** empty.
   Framework is Next.js (set in `vercel.json`); build command is `npm run build`.
3. Add Environment Variables (Settings -> Environment Variables):
   - `ADMIN_USER` and `ADMIN_PASSWORD` – protect `/admin` and `/api/admin/*`
     (without them these routes return 503).
4. Deploy.

Note: orders are stored in the server's temp folder on Vercel, which is not
durable. Replace `lib/orders.ts` with a database before going live.
