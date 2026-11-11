# ⚡ XOR Bit — Personal Life & Engineering OS

> A single-file, offline-first dashboard that runs your studies, habits, money, focus and projects in one place. No backend, no account, no build step. Open `XOR.html` and go.

**Stack:** React 18 · Tailwind (CDN) · Babel Standalone · localStorage + IndexedDB
**Size:** one HTML file (~480 KB, ~10k lines)
**Themes:** Obsidian (dark) · Editorial Paper · Swiss Industrial

---

## What it is

XOR Bit is a personal operating system built for an engineering student. It combines a course tracker, wallet, task manager, habit system, focus tools, spaced-recall study tools and a few games into one app. Everything is stored in your own browser. Your data never leaves your device.

Progress is gamified: completing missions, logging habits and focus sessions earns **XP** and raises your **Operator Level**. Some features (like parts of Style Lab) unlock only at a given level or wallet balance.

---

## Quick start

1. Download `XOR.html`.
2. Double-click it to open in Chrome, Edge, Firefox or Safari.
3. Set your name, title and semester in the profile.
4. Add your first course, habit or mission.

> Needs an internet connection the first time (and whenever the browser cache is cleared) to load Tailwind, React, Babel and Google Fonts from CDNs.

### Keyboard shortcuts

| Key | Action |
|---|---|
| `Ctrl/Cmd + K` or `/` | Open command palette (searches courses, missions, projects, ideas, Feynman notes, recall questions) |
| `1` – `9` | Jump to the first nine visible sidebar modules |
| `Alt + S` | Style Lab |
| `Alt + G` | Simulation Deck (arcade) |
| `Esc` | Close modals / palette |

---

## Modules

### 🎯 Core
| Module | What it does |
|---|---|
| **Today** | Dashboard with level/XP, habit streaks, pending missions, attendance and balance at a glance |
| **Academy** | Course and attendance matrix with target attendance % and topic tracking |
| **Wallet** | Income and expense log (₹), savings pots, net balance |
| **Mission Control** | Tasks as missions with ₹ bounties and XP rewards |
| **Skill Matrix** | Skill tree with levels (up to 5), targets and mastery progress |
| **Project Lab** | Engineering project portfolio |
| **Innovation Canvas** | Idea cards and wireframes, with image uploads |
| **Unified Calendar** | Events plus colour-coded day types (productive, hackathon, chill, travel, deadline, rest, plus your own) |

### 🔁 Habits & discipline
| Module | What it does |
|---|---|
| **Habit Matrix** | Daily protocols with month grid, 365-day view, streaks, completion rate and streak shields for rest or exam days |
| **Habit Design** | Habit blueprints and identity votes (identity-based habit building) |
| **Focus Discipline** | Focus sessions, distraction log, daily focus-hour goal, end-of-day shutdown checklist |

### 🧠 Learning
| Module | What it does |
|---|---|
| **Learning Engine** | Feynman-technique notes and active-recall questions, graded Confusing → Getting There → Mastered |
| **Study Vault** | Revision topics and problem-page tracking |

### 🧘 Mind & life
| Module | What it does |
|---|---|
| **Bio-State Lab** | Daily bio log with templates, generated focus/sleep audio (pink, brown, white noise, 40 Hz binaural), sleep timer and guided NSDR |
| **Executive Lab** | Morning routine and launchpad, decision log, priority quadrants |
| **Trajectory** | Growth metrics and long-term roadmaps |
| **Life & Money** | Life Wheel snapshots over time and money-area tracking |
| **Extracurriculars** | Clubs, events and activities |
| **Style Lab** | Wardrobe and outfits, with photos stored in IndexedDB |
| **Experience Archive / Memory Vault** | Log of trips, experiences and diary entries |

### 🎮 Simulation Deck
Built-in games and trainers: **Rover Simulation**, **Vector Snake**, **Reaction Latency Test**, logic puzzles, Pong and a memory game. Scores are saved to your profile. There is also a hidden vault.

### ⚙️ System Core
Profile, theme switcher, sound and gamification toggles, sidebar module visibility, JSON backup export/import and a full reset.

---

## Data & privacy

- **Text data:** saved in `localStorage` under the key `NEXORA_ARCHITECTURAL_OS_V1`.
- **Images** (wardrobe, canvas): saved in IndexedDB (`NexoraStyleVaultDB`).
- **Sidebar layout:** saved under `NEXORA_SIDEBAR_HIDDEN_V1`.
- Nothing is sent to a server. There is no sync between devices.

### Back up your data
**System Core → Export JSON Snapshot** downloads everything, media included. Import it on another browser or device to restore. Imported files are validated against the app's schema before being loaded.

> ⚠️ Clearing site data, using private browsing, or switching browsers will remove your data unless you have exported a backup. Export regularly.

---

## Project structure

```
XOR.html
├── <head>          Tailwind config, theme CSS variables, fonts
├── EMPTY_STATE     Default (zero-demo-data) app state
├── Helpers         Storage, IndexedDB, audio, icons, empty states
├── Games           Rover, Snake, Reaction test, puzzles
├── Views           One React component per module
└── NexoraApp       Shell: sidebar, command palette, XP/level, focus timer, routing
```

### Theming
Themes are CSS variable sets (`--bg-canvas`, `--ink-primary`, `--accent`, …) scoped by `[data-theme="obsidian | paper | industrial"]`. To add a theme, add a new block and a matching entry in System Core.

---

## Known limitations

- **First load is heavy:** JSX is compiled in the browser by Babel Standalone and Tailwind runs from its CDN. Fine for personal use; for production, precompile with Vite and build Tailwind.
- **Needs internet on first run** for CDN assets and fonts.
- **Browser storage limits:** localStorage is about 5 MB. The app warns you when a save fails, so export a backup when you see it.
- **Single device:** no cloud sync or multi-user support.
- **Naming:** the title says *XOR Bit* but internal keys still say *Nexora*. Don't rename the storage keys, or existing data will appear to vanish.

## Ideas for next steps

- [ ] Move to Vite + React and compile Tailwind locally (faster, works fully offline)
- [ ] Install as a PWA with a service worker
- [ ] Optional cloud sync or auto-backup to a file
- [ ] Split the single file into modules
- [ ] Charts for wallet, focus hours and habit trends
- [ ] Mobile-first layout pass

---

## Credits

Built with AI assistance, then reviewed and refined by **Shrishaila M**.

## License

Personal project. Add a license (for example MIT) if you publish it.
