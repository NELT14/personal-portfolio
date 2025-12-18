# Ali Aliyev — Personal Portfolio

This repository contains the source of my personal website. The live site is available at:

https://nelt14.github.io/personal-portfolio/

The portfolio itself holds all content (projects, achievements, contacts). This README focuses only on how to work with the codebase.

## Stack

- Jekyll (Liquid templates & front matter)
- HTML, CSS, and vanilla JavaScript
- GitHub Pages for hosting

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

## Structure (brief)

```
index.html      # homepage with front matter
about.html      # /about/
projects.html   # /projects/
activities.html # /activities/
style.css       # styles
script.js       # interactions (no JS URL rewriting; navigation uses real links)
_config.yml     # site config
assets/images/  # images
_layouts/       # Jekyll layout templates
_includes/      # reusable HTML includes (nav, footer, head)
```

## License / contact

Copyright © Ali Aliyev. See the live site for contact links.
