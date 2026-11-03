# Ali Ahmad Akram — NOVA Portfolio (Redesigned)

A completely redesigned, responsive developer portfolio for **Ali Ahmad Akram** featuring a dramatic midnight-violet / luminous lavender / sunset-peach palette. Visual identity, layout, typography and motion have been rebuilt from the previous warm-ivory version, and the site does **not** reuse Talha's emerald-black branding.

## Open the website

Unzip and open **`index.html`** in Chrome or Edge. The homepage has a giant three-line **ALI / AHMAD / AKRAM** name with a JavaScript letter-by-letter typing animation. An accessible reduced-motion fallback displays the complete name instantly. Font families are Chakra Petch (display), Outfit (body), and DM Mono (labels); they load from Google Fonts when online and gracefully fall back to system fonts when offline. No font files are bundled.

You can also preview via a local server using `python -m http.server 8000` then open `http://localhost:8000/`.

## Working browser demo projects

1. **Spendly — Expense Tracker**: `demos/expense-tracker/` — add/edit/delete transactions, balance calculations, expense charts, type/month filters and local persistence.
2. **Orbit — Task Manager**: `demos/taskflow/` — task CRUD, priorities, deadlines, drag-and-drop, mobile move controls, saved local Kanban board.
3. **KeySprint — Typing Challenge**: `demos/typerush/` — timed tests (30/60/120s), live WPM/accuracy, character feedback and a stored personal best.

All demo data is local to each device/browser (`localStorage`) and is not uploaded or synced. **These are newly provided demos**, so Ali should try them, understand them and personalize them before describing them as his independent professional work.

## Personal details represented

- Ali Ahmad Akram — Superior University Lahore, BS Computer Science, third semester; CGPA 3.70/4.00; expected graduation 2029.
- Intermediate in Computer Science: Punjab College, 2025. Matriculation: The Citizen Foundation School, 2023.
- Python, C++, AI fundamentals, MS Office, digital marketing, Facebook Ads, teamwork and problem-solving.
- Email: `aliahmadjutt4241@gmail.com`. LinkedIn: `https://www.linkedin.com/in/ali-ahmad-akram-cs/`.
- No profile photo, GitHub link, certificate section, or employment experience section, per request. No residential street address or phone number is published.

## Publish on GitHub Pages

1. Create/open a repository, e.g. `ali-ahmad-akram-portfolio`.
2. Upload **everything inside** `Ali_Ahmad_Akram_Nova_Portfolio` to the repository's **root**: `index.html`, `styles.css`, `script.js`, `assets/`, `demos/`, `.nojekyll`, and this README. Keep folder structure intact; do not upload just one HTML file.
3. Commit to `main` (or your default branch). Go to `Settings → Pages → Build and deployment`, select `Deploy from a branch`, choose `main` and `/ (root)`, and Save.
4. When deployment succeeds, visit `https://YOUR-USERNAME.github.io/REPO-NAME/`.
5. If text displays without colors, check that `styles.css` and the `assets` folder were uploaded at the same level as `index.html`. For cached old pages, hard-refresh (Ctrl+Shift+R).

All links are relative; no build step, dependency installation or paid hosting required. The demos run statically on GitHub Pages. Main page has responsive navigation, keyboard-friendly links, reduced-motion support, and scroll reveals.

## Customize

Website contents: `index.html`. Global theme and layout: `styles.css`. Typing, navigation, animations: `script.js`. Each demo has its own `index.html`, `style.css`, `app.js`. The project preview graphics in the homepage are illustrative CSS representations, not live financial or typing data.
