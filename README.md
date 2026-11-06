# Ali Aliyev — Personal Portfolio

Personal portfolio covering software projects, applied AI, publications, teaching, and competitive programming.

Live site: https://nelt14.github.io/personal-portfolio/

## Development

Built with Jekyll, HTML, CSS, and vanilla JavaScript. Install a current Ruby and the Bundler version in `Gemfile.lock`, then run:

```sh
bundle install
bundle exec jekyll serve --livereload
```

Open http://127.0.0.1:4000/personal-portfolio/.

## Updating content

Edit the YAML files in `_data/`: `personal.yml`, `projects.yml`, `activities.yml`, `achievements.yml`, `social.yml`, and `contact.yml`. Shared templates live in `_includes/`; the base layout is `_layouts/default.html`.

Keep education and experience dates explicit. The footer year updates automatically. Publication links use native HTML disclosures and remain available without JavaScript.

## GitHub Pages

Keep `url` and `baseurl` in `_config.yml` aligned with the deployment URL. Build with `bundle exec jekyll build`. The diagnostic page is excluded from the published site.

Copyright © Ali Aliyev. All rights reserved.
