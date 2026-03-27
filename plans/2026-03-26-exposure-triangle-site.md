# Plan: Linearflow — Exposure Triangle Photography Site + Linear Integration Demo

## Context

Seth Melchor is interviewing with the Linear team. The interview involves a role-play where Seth operates a repository integrated with Linear to demonstrate issue tracking workflows. Ian and Seth need:

1. A static HTML/CSS/JS website that "teaches" the Exposure Triangle in photography — scroll storytelling with 5-6 placeholder photos and an interactive simulator
2. A git branching model (main + develop) with a CONTRIBUTING.md documenting the Linear workflow
3. The site ships **without dark mode** so Seth can demo a full Linear ticket lifecycle during the interview: create a triage ticket → branch from develop → implement dark mode → QA → merge to production

---

## Phase 1: Static Photography Site

### 1.1 Project Structure

```
linearflow/
├── index.html              # Single-page app
├── css/
│   └── style.css           # All styles (light mode only)
├── js/
│   └── app.js              # Exposure Triangle simulator logic
├── images/
│   ├── hero.jpg             # Hero/header image (placeholder)
│   ├── iso-low.jpg          # Low ISO example
│   ├── iso-high.jpg         # High ISO example (grainy)
│   ├── aperture-wide.jpg    # Wide aperture (shallow DOF)
│   ├── aperture-narrow.jpg  # Narrow aperture (deep DOF)
│   └── shutter-fast.jpg     # Fast shutter (frozen motion)
├── CONTRIBUTING.md          # Linear workflow docs
└── README.md                # Project overview
```

### 1.2 Page Layout (scroll storytelling)

1. **Hero section** — Full-width photo, title "The Exposure Triangle", subtitle with Seth's name
2. **Intro section** — Brief text: "Every photo is a balance of three settings..."
3. **ISO section** — Explanation + side-by-side comparison photos (low vs high ISO)
4. **Aperture section** — Explanation + comparison photos (wide vs narrow)
5. **Shutter Speed section** — Explanation + comparison photo (fast shutter freeze)
6. **Interactive Simulator** — The centerpiece:
   - Three sliders: ISO (100–6400), Aperture (f/1.4–f/22), Shutter Speed (1/4000–1s)
   - A simulated photo preview that reacts in real-time:
     - **Brightness** changes based on combined exposure value
     - **Grain/noise** overlay increases with higher ISO
     - **Blur** effect increases with slower shutter speed
     - **Depth of field** indicator changes with aperture
   - Text readout showing current settings and whether the shot is underexposed/overexposed/balanced
7. **Footer** — Simple credit line

### 1.3 Image Placeholders

Use 6 royalty-free placeholder images from Unsplash (downloaded and committed to repo). When Seth is ready to swap in his own photography:

- **Format:** JPEG, ideally 1600px wide (good balance of quality vs file size)
- **Naming:** Keep the same filenames so no code changes needed
- **Aspect ratio:** Landscape (16:9 or 3:2) works best with the scroll layout

### 1.4 Tech Stack

- **Pure HTML/CSS/JS** — no frameworks, no build step, no dependencies
- Open `index.html` directly in browser or use `python3 -m http.server` for local serving
- CSS: modern features (CSS Grid, custom properties, scroll-snap optional), light mode only
- JS: vanilla — sliders use `<input type="range">`, simulator uses CSS filters (`brightness`, `blur`, `contrast`) and a noise SVG overlay

---

## Phase 2: Git Branching & Linear Workflow Docs

### 2.1 Branch Setup

- `main` — production branch (already exists)
- `develop` — integration branch (already created by Ian on remote)
- Fetch develop locally: `git fetch origin develop && git checkout -b develop origin/develop`

### 2.2 CONTRIBUTING.md

Linear-specific workflow documentation covering:

1. **Branch naming:** `{linear-id}-short-description` (e.g., `LIN-42-add-dark-mode`)
2. **Workflow steps:**
   - Ticket created in Linear (Triage status)
   - Move ticket to In Progress → Linear auto-creates branch from develop
   - Developer checks out branch locally
   - Implement changes, push commits
   - Open PR targeting `develop`
   - Code review + QA approval in Linear
   - Merge PR → ticket moves to Done
   - Periodically merge `develop` → `main` for production releases
3. **The dark mode example** — Mention it as the planned first ticket to walk through the full flow

---

## Phase 3: Pre-Interview Prep

### 3.1 What Gets Pushed to Main

All site code from Phase 1 + CONTRIBUTING.md. This is the "production" state of the site before Seth's interview demo.

### 3.2 What Seth Does During the Interview

1. Shows the live site (light mode only)
2. Creates a Linear ticket: "Add dark mode toggle" (Triage → In Progress)
3. Linear creates a branch from `develop`
4. Seth checks out the branch locally
5. Implements a dark mode toggle (CSS custom properties + a toggle button in the header)
6. Pushes, opens PR to `develop`
7. Reviews in Linear, approves QA
8. Merges → ticket moves to Done
9. Shows the site now has dark mode

### 3.3 Dark Mode Implementation Hints

To keep the demo fast, the site CSS should already use CSS custom properties for colors:
```css
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f5f5f5;
  --text-primary: #1a1a1a;
  --text-secondary: #666666;
  /* etc. */
}
```
This way Seth only needs to add a `.dark-mode` class override + a toggle button — a 15-minute change that's visually impressive.

---

## Implementation Order

1. Create `css/style.css` with full layout + CSS custom properties for colors
2. Create `js/app.js` with the Exposure Triangle simulator (sliders + simulated preview)
3. Create `index.html` with all sections wired together
4. Download and add 6 placeholder images to `images/`
5. Test locally — verify scroll storytelling and simulator work
6. Create `CONTRIBUTING.md` with Linear workflow docs
7. Update `README.md` with project description + how to run locally
8. Commit everything, push to main

---

## Verification

- [ ] `index.html` opens in browser with no errors in console
- [ ] All 6 images load (no broken image icons)
- [ ] Scroll storytelling flows smoothly through all sections
- [ ] Exposure Triangle simulator sliders all respond in real-time
- [ ] Brightness, noise, and blur effects visually change the preview
- [ ] Exposure readout correctly shows under/over/balanced
- [ ] CSS uses custom properties for all colors (dark mode prep)
- [ ] CONTRIBUTING.md accurately describes Linear workflow
- [ ] `develop` branch exists and is in sync with main after push

---

## Files to Create/Modify

| File | Action |
|------|--------|
| `index.html` | Create — full page with all sections |
| `css/style.css` | Create — layout, typography, colors via custom properties |
| `js/app.js` | Create — simulator logic |
| `images/*.jpg` | Create — 6 placeholder photos |
| `CONTRIBUTING.md` | Create — Linear workflow docs |
| `README.md` | Update — project description |
