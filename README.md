# Ali Aliyev — Personal Portfolio (Jekyll)

Personal portfolio showcasing competitive programming achievements, research, activities (Codeforces, volunteering), and contact links.

## Highlights

- Jekyll site (qualifies for the +10% bonus). Custom HTML design with front matter and Liquid variables.
- Fully responsive design with fluid type and modern CSS (Grid/Flex/variables).
- Mobile navigation drawer that becomes a full‑height, scrollable panel (works at extreme zoom).
- “Around the Web” section with colored brand icons; social/contact icons in Connect.
- Research papers are collapsible with accessible toggle text and ARIA state.
- Open Graph/Twitter meta tags for rich link previews.
- Performance: lazy‑loaded images, reduced‑motion friendly, minimal dependencies.

## Tech Stack

- Jekyll + Liquid front matter/variables
- HTML5, CSS3, Vanilla JavaScript
- GitHub Pages for hosting

## Project Structure

```
personal-portfolio/
├── index.html          # Custom homepage (with front matter)
├── style.css           # Styles (responsive, fluid type, components)
├── script.js           # Smooth scroll, mobile drawer, observers, toggles
├── _config.yml         # Site metadata + build settings (excludes index.markdown)
├── Gemfile             # Jekyll dependencies
├── 404.html, about.markdown, _posts/  # standard Jekyll items
├── assets/
│   └── images/
│       ├── profile.jpg
│       └── codecademy_icon.png (or .svg)
└── README.md
```

## Run Locally (Jekyll)

1) Install Ruby + Bundler (if needed).

2) From the project folder:

```powershell
cd "C:\Users\alish\Desktop\_\Other\ADA U\Semester 1\P. Info systems\Project 3\personal-portfolio"
bundle install
bundle exec jekyll serve --livereload
```

Visit http://127.0.0.1:4000/personal-portfolio/ (project page with baseurl).

Note: Opening index.html directly will show the YAML front matter. Serve through Jekyll for correct rendering.

## Deploy (GitHub Pages)

- Push to the `main` branch.
- In repo Settings → Pages: Source = `GitHub Actions` or `Deploy from a branch (main)`.
- If using a project page, set `baseurl` in `_config.yml` as needed.

## Sections

- Home / Hero
- Around the Web (icons)
- About (Education, Languages, Location)
- Skills
- Achievements
- Projects (with research papers toggle)
- Activities (Codeforces, Volunteering, Codecademy)
- Work Experience
- Connect (social + email/phone)

## Commands

Commit/push from Windows PowerShell:

```powershell
cd "C:\Users\alish\Desktop\_\Other\ADA U\Semester 1\P. Info systems\Project 3\personal-portfolio"; git add .; git commit -m "Update site and docs"; git push
```

## Contact

- GitHub: https://github.com/NELT14
- Codecademy: https://www.codecademy.com/profiles/net9134894948
- Codeforces: https://codeforces.com/profile/Nxxlt
- LinkedIn: https://linkedin.com/in/ali-aliyev-1b24a6381
- Instagram: https://www.instagram.com/nelt_13
- Email: ali__aliyev@outlook.com

---
