# Deploying to your GitHub repo (strvedic/srvbirlatrip)

Everything is now a **single file**: `index.html`. It has the school logo, styling, and all 269 students built in — no separate CSS/JSON files, so there's nothing that can fail to load.

## 1. Upload to GitHub

1. Go to **https://github.com/strvedic/srvbirlatrip**
2. Click **Add file → Upload files**
3. Drag in `index.html` from this package
4. Scroll down, click **Commit changes**

## 2. Turn on GitHub Pages

1. In the repo, go to **Settings → Pages** (left sidebar)
2. Under "Build and deployment" → Source, choose **Deploy from a branch**
3. Branch: **main**, folder: **/ (root)** → **Save**
4. Wait ~1 minute, refresh the page. Your live link will show, something like:
   `https://strvedic.github.io/srvbirlatrip/`
5. Open it on your phone to test: enter an admission ID (e.g. `MPV24S1003`), confirm, tap Pay, check your UPI app opens with ₹100 pre-filled.

That's it — share that link with parents on WhatsApp/SMS.

---

## Optional: log who tapped "Pay" (for your own tracking)

A static page can't confirm a payment actually landed — it can only confirm the UPI app was opened. Since every student already has their own unique UPI ID, you can reconcile actual payments from your bank statement. But if you also want a simple tap log:

1. Create a new Google Sheet (e.g. "Birla Trip Payment Log")
2. **Extensions → Apps Script**, paste in the contents of `Code.gs` (included in this package)
3. **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Copy the Web app URL (ends in `/exec`)
5. Open `index.html` in a text editor, find this line near the top of the `<script>` block:
   ```js
   const LOG_URL = "";
   ```
   Paste your URL between the quotes, save, and re-upload `index.html` to GitHub (commit again).

Every "Pay" tap will then add a row to a `PaymentLog` tab: timestamp, admission ID, name, class, UPI ID, amount.

---

## Updating the student list later

If students are added/removed, send me the updated CSV and I'll regenerate `index.html` with the new list — the whole thing is one file, so updating is just a re-upload.
