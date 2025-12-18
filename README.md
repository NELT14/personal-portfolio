# Ali Aliyev — Personal Portfolio

This repository contains the source of my personal website. The live site is available at:

https://nelt14.github.io/personal-portfolio/

The portfolio itself holds all content (projects, achievements, contacts). This README focuses only on how to work with the codebase.

## Stack

- Jekyll (Liquid templates, front matter, data files, includes)
- HTML, CSS, and vanilla JavaScript
- GitHub Pages for hosting

## Jekyll Features Used

This site demonstrates comprehensive use of Jekyll's features:

- **Data Files** (`_data/`): Content stored in YAML files for easy management
  - `social.yml` - Social media links and contact information
  - `contact.yml` - Contact details
  - `personal.yml` - Personal information, education, languages, skills
  - `projects.yml` - Project data with metadata
  - `activities.yml` - Work experience and extracurricular activities
  - `achievements.yml` - Awards and achievements

- **Includes** (`_includes/`): Reusable, modular components
  - **Layout Components**: `head.html`, `nav.html`, `footer.html` - Core layout structure
  - **Content Components**: 
    - `social-links.html` - Dynamic social media links grid
    - `project-card.html` - Reusable card for projects, work experience, and activities
    - `achievement-card.html` - Reusable achievement/award cards
    - `skill-card.html` - Reusable skill category cards
    - `info-card.html` - Reusable info cards (education, languages, etc.)
  - **UI Components**:
    - `page-header.html` - Page title and description header
    - `subsection-header.html` - Subsection title headers
    - `subsection-description.html` - Subsection description text

- **Layouts** (`_layouts/`): Template system
  - `default.html` - Base layout for all pages

- **Liquid Templating**: Dynamic content generation
  - Loops (`{% for %}`) for iterating over data
  - Conditionals (`{% if %}`) for conditional rendering
  - Filters (`| relative_url`, `| join`) for data manipulation
  - Site variables (`site.data.*`, `site.title`, etc.)

- **Pretty Permalinks**: Clean URLs without `.html` extension

## Pages / URLs

This site uses **Jekyll pretty permalinks**, so pages do **not** end with `.html` in the browser:

- Home: `/personal-portfolio/`
- About: `/personal-portfolio/about/`
- Projects: `/personal-portfolio/projects/`
- Activities: `/personal-portfolio/activities/`

## Local development

Prerequisites: Ruby and Bundler.

```bash
git clone https://github.com/NELT14/personal-portfolio.git
cd personal-portfolio
bundle install
bundle exec jekyll serve --livereload
```

Then open:

- http://127.0.0.1:4000/personal-portfolio/

Note: Opening `index.html` directly will show the YAML front matter. Always run through Jekyll.

## Configuration & deploy

- `_config.yml` is set for a project page:
	- `url: https://nelt14.github.io`
	- `baseurl: /personal-portfolio`
	- `permalink: pretty`
- To publish via GitHub Pages, push to `main` and enable Pages in the repository settings (Actions workflow or Branch source).
- If you fork this repo under a different path, update `url`/`baseurl` accordingly.

## Structure

```
index.html          # homepage with front matter
about.html          # /about/ (uses modular includes)
projects.html       # /projects/ (uses modular includes)
activities.html     # /activities/ (uses modular includes)
style.css           # styles (responsive, mobile-optimized)
script.js           # interactions (smooth scrolling, animations, no URL rewriting)
_config.yml         # site config
assets/images/      # images

_layouts/           # Jekyll layout templates
  default.html      # base layout (includes nav, footer automatically)

_includes/          # reusable, modular HTML components
  # Layout Components
  head.html         # page head (meta, styles, fonts)
  nav.html          # navigation bar
  footer.html       # site footer (includes contact section)
  
  # Content Components
  social-links.html      # social media links grid
  project-card.html      # reusable project/work/activity card
  achievement-card.html  # reusable achievement/award card
  skill-card.html        # reusable skill category card
  info-card.html         # reusable info card (education, languages)
  
  # UI Components
  page-header.html           # page title and description
  subsection-header.html     # subsection title
  subsection-description.html # subsection description

_data/              # Jekyll data files (YAML)
  social.yml        # social media links
  contact.yml       # contact information
  personal.yml      # personal info, education, languages, skills
  projects.yml      # projects data
  activities.yml    # work experience and extracurricular activities
  achievements.yml  # awards and achievements
```

## Code Architecture

This codebase follows **DRY (Don't Repeat Yourself)** principles with a highly modular structure:

- **No code duplication**: All repetitive HTML structures are extracted into reusable includes
- **Single source of truth**: Content is stored in data files, presentation in includes
- **Easy maintenance**: Update a component once, changes apply everywhere it's used
- **Consistent styling**: All cards and sections use the same components, ensuring visual consistency

For example, the `project-card.html` include is used for:
- Projects on the Projects page
- Work experience on the Activities page
- Extracurricular activities on the Activities page

This means any styling or structural changes to cards only need to be made in one place.

## License / contact

Copyright © Ali Aliyev. See the live site for contact links.
