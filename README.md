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

- **Includes** (`_includes/`): Reusable components
  - `social-links.html` - Dynamic social media links grid
  - `contact-section.html` - Reusable contact section
  - `nav.html`, `head.html`, `footer.html` - Layout components

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
about.html          # /about/
projects.html       # /projects/
activities.html     # /activities/
style.css           # styles
script.js           # interactions (no JS URL rewriting; navigation uses real links)
_config.yml         # site config
assets/images/      # images
_layouts/           # Jekyll layout templates
  default.html      # base layout
_includes/          # reusable HTML includes
  head.html        # page head (meta, styles)
  nav.html         # navigation bar
  footer.html      # site footer
  social-links.html # social media links component
  contact-section.html # contact section component
_data/              # Jekyll data files (YAML)
  social.yml       # social media links
  contact.yml      # contact information
  personal.yml     # personal info, education, skills
  projects.yml     # projects data
  activities.yml   # activities data
  achievements.yml # achievements data
```

## License / contact

Copyright © Ali Aliyev. See the live site for contact links.
