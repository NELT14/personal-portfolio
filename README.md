# Ali Aliyev — Personal Portfolio

This repository contains the source code for my personal portfolio website.

**Live site:** https://nelt14.github.io/personal-portfolio/

> This README focuses on the codebase structure and development workflow. For portfolio content, visit the live site.

## Stack

- Jekyll (Liquid templates, front matter, data files, includes)
- HTML, CSS, and vanilla JavaScript
- GitHub Pages for hosting

## Jekyll Features

This site demonstrates comprehensive use of Jekyll's core features:

### Data Files (`_data/`)
Content stored in YAML files for easy management:
- `social.yml` — Social media links and contact information
- `contact.yml` — Contact details
- `personal.yml` — Personal information, education, languages, skills
- `projects.yml` — Project data with metadata
- `activities.yml` — Work experience and extracurricular activities
- `achievements.yml` — Awards and achievements

### Includes (`_includes/`)
Reusable, modular HTML components:

**Layout Components:**
- `head.html` — Page head (meta tags, styles, fonts)
- `nav.html` — Navigation bar
- `footer.html` — Site footer (includes contact section)

**Content Components:**
- `social-links.html` — Social media links grid
- `project-card.html` — Reusable card for projects, work experience, and activities
- `achievement-card.html` — Reusable achievement/award cards
- `skill-card.html` — Reusable skill category cards
- `info-card.html` — Reusable info cards (education, languages, etc.)

**UI Components:**
- `page-header.html` — Page title and description header
- `subsection-header.html` — Subsection title headers
- `subsection-description.html` — Subsection description text

### Layouts (`_layouts/`)
- `default.html` — Base layout for all pages (includes nav and footer automatically)

### Liquid Templating
- Loops (`{% for %}`) for iterating over data
- Conditionals (`{% if %}`) for conditional rendering
- Filters (`| relative_url`, `| join`) for data manipulation
- Site variables (`site.data.*`, `site.title`, etc.)

### Pretty Permalinks
Clean URLs without `.html` extension (e.g., `/about/` instead of `/about.html`)

## Pages

- **Home:** `/personal-portfolio/`
- **About:** `/personal-portfolio/about/`
- **Projects:** `/personal-portfolio/projects/`
- **Activities:** `/personal-portfolio/activities/`

## Local Development

**Required:** Ruby and Bundler must be installed

```bash
git clone https://github.com/NELT14/personal-portfolio.git
cd personal-portfolio
bundle install
bundle exec jekyll serve --livereload
```

Open: http://127.0.0.1:4000/personal-portfolio/

> **Note:** Always run through Jekyll. Opening `index.html` directly will show YAML front matter instead of rendered content.

## Configuration & Deployment

### Configuration (`_config.yml`)
- `url: https://nelt14.github.io`
- `baseurl: /personal-portfolio`
- `permalink: pretty`

### Deployment
1. Push to `main` branch
2. Enable GitHub Pages in repository settings (Actions workflow or Branch source)

> **Forking:** If you fork this repo under a different path, update `url` and `baseurl` in `_config.yml`.

## Project Structure

```
personal-portfolio/
├── index.html              # Homepage
├── about.html              # About page (uses modular includes)
├── projects.html           # Projects page (uses modular includes)
├── activities.html         # Activities page (uses modular includes)
├── style.css               # Styles (responsive, mobile-optimized)
├── script.js               # Interactions (smooth scrolling, animations)
├── _config.yml             # Site configuration
│
├── _layouts/
│   └── default.html        # Base layout (includes nav, footer automatically)
│
├── _includes/              # Reusable HTML components
│   ├── head.html           # Page head
│   ├── nav.html            # Navigation bar
│   ├── footer.html         # Footer (includes contact section)
│   ├── social-links.html   # Social media links grid
│   ├── project-card.html   # Reusable project/work/activity card
│   ├── achievement-card.html
│   ├── skill-card.html
│   ├── info-card.html
│   ├── page-header.html
│   ├── subsection-header.html
│   └── subsection-description.html
│
├── _data/                  # Content data (YAML)
│   ├── social.yml
│   ├── contact.yml
│   ├── personal.yml
│   ├── projects.yml
│   ├── activities.yml
│   └── achievements.yml
│
└── assets/
    └── images/             # Image assets
```

## Code Architecture

This codebase follows **DRY (Don't Repeat Yourself)** principles with a highly modular structure:

- **No code duplication:** All repetitive HTML structures are extracted into reusable includes
- **Single source of truth:** Content is stored in data files, and presentation is stored in include files
- **Easy maintenance:** Update a component once, changes apply everywhere it's used
- **Consistent styling:** All cards and sections use the same components, ensuring visual consistency

**Example:** The `project-card.html` include is reused for:
- Projects on the Projects page
- Work experience on the Activities page
- Extracurricular activities on the Activities page

This means any styling or structural changes to cards only need to be made in one place.

## License

Copyright © Ali Aliyev. All rights reserved.

For contact information, visit the [live site](https://nelt14.github.io/personal-portfolio/).
