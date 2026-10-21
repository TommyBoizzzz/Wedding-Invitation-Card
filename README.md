<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Wedding Invitation Website

## Run Locally

**Prerequisites:** Node.js 20.19+ or 22.12+


1. Install dependencies: `npm ci`
2. Copy `.env.example` to `.env.local` and configure the Turso and Admin variables below.
3. Start the full app (Vite plus its local API middleware): `npm run dev`
4. Open `http://localhost:3000`.

## Deploying with Vercel and Turso

The app uses a hosted Turso (libSQL/SQLite-compatible) database through Vercel Functions. It does not store application data in Vercel's temporary filesystem or in each visitor's browser.

1. Create a Turso database and generate an authentication token using the [Turso quickstart](https://docs.turso.tech/quickstart).
2. Add these environment variables in **Vercel → Project → Settings → Environment Variables**:
   - `TURSO_DATABASE_URL`: the database URL shown by Turso (for example, `libsql://your-database-name.turso.io`).
   - `TURSO_AUTH_TOKEN`: the database authentication token. Keep it private.
   - `ADMIN_PIN`: a unique passphrase of at least 12 characters used to unlock the Admin dashboard. Login is rate-limited after five failed attempts per IP in a 15-minute window.
   - `ADMIN_SESSION_SECRET`: a random secret of at least 32 characters used to sign secure Admin session cookies. Admin login remains remembered in that browser until logout, cookies are cleared, or the secret is rotated.
   - `VITE_APP_URL`: the production website URL, for example `https://n-p.vercel.app`.
3. Apply the variables to Production (and Preview if needed), then redeploy. The tables are initialized automatically on the first API request.

To generate a session secret locally, run `node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"` and add its output to Vercel. Never commit real tokens, PINs, or session secrets.

The first database request creates the application tables automatically and drops the obsolete `rsvps` table. **Existing RSVP records in that table are permanently deleted**; the website no longer collects or displays RSVP data. The guestbook starts empty rather than inserting sample messages into the shared production database.

Existing records in browser local storage are not automatically copied to Turso. Each browser had its own separate database. Before switching, use the old deployment's Admin SQLite export to download a backup from any browser whose data you need, then use **Import old SQLite** in the new Admin dashboard. Import supports up to 250 gifts and wishes, is allowed once, and only while the cloud database has no records. RSVP data from old backups is ignored.

The Admin dashboard can delete individual gift or wish records, or clear all gifts and wishes from the shared database. Each deletion requires confirmation and is permanent; download a backup first if you may need the data later.
