## Autofolio

Autofolio is a small React + TypeScript + Vite application that helps users quickly generate a simple portfolio page from a structured form.  
The app has **two main pages**:

- **Home / Form page (`/`)**: Users fill out a multi-section form describing their personal information, skills, and professional experiences.
- **Portfolio page (`/portfolio`)**: The app renders a portfolio-style single-page layout using the data from the form.

### How it works

- **Routing**: `App.tsx` uses `react-router-dom` to define two routes:
  - `/` → `Home` (which includes `NavBar`, `HeroSection`, and `FormSection`)
  - `/portfolio` → `Portfolio`
- **Data flow**:
  - `FormSection` collects:
    - Personal info: full name, job title, about me, email, phone, location, GitHub, LinkedIn
    - Skills: free-text with autocomplete suggestions from `allSkills` in `lib/contents.ts`
    - Experiences: one or more entries with title, company, start date, end date, description, and technologies used
  - When **“Generate My Portfolio”** is clicked, and the form passes validation, `useNavigate` sends the user to `/portfolio` with the collected data in the route `state`.
  - `Portfolio` reads that `state` via `useLocation` and renders a structured portfolio containing:
    - Hero section (name and job title)
    - About section (about me, simple stats, contact info)
    - Skills section (skills as cards)
    - Experiences section (each experience with dates, description, and technologies)

### Tech stack

- **Frontend**: React + TypeScript
- **Bundler/dev server**: Vite
- **Routing**: `react-router-dom`
- **Styling**: Plain CSS modules under `src/styles` (e.g., `FormSection.css`, `HeroSection.css`, `NavBar.css`, `Portfolio.css`)

### Getting started

From the project root:

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`) in your browser.

### Usage

1. **Open the Home page (`/`)**
   - Read the hero text explaining that the app builds a portfolio for you.
   - Use the navigation bar at the top (logo only).
2. **Fill out the form**
   - Complete required fields in each section:
     - Personal information (name, job title, about me).
     - Contact details (email, phone, location; optional GitHub and LinkedIn URLs).
     - Skills: type skills and either press Enter or choose suggestions from the dropdown; remove skills using the ✕ buttons.
     - Experiences: click **“+ Add Experience”**, then fill in job title, company, start date, optional end date, description, and technologies used (with autocomplete and removable tags).
   - The **“Generate My Portfolio”** button is enabled only when required fields and at least one skill and one experience are provided.
3. **Generate the portfolio**
   - Click **“Generate My Portfolio”**.
   - You are navigated to `/portfolio`, where your information is displayed in a portfolio-style layout with navigation buttons (Home, About, Skills, Experience) that smoothly scroll to each section.

### Notes and limitations

- The portfolio data is passed via React Router `state`; it is **not persisted** to a database or local storage.
- Refreshing the `/portfolio` page will lose the in-memory data and show “No portfolio data found.”
- The skills suggestion list is currently backed by a small static list in `lib/contents.ts`.
