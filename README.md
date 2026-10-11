# Abdul Rab — Academic Website

[Visit the website](https://abdulrab.github.io/)

Professional academic portfolio and openly accessible mathematics teaching resources. Built as a static GitHub Pages website with no build or external framework dependency.

## Pages
- `index.html` — short academic introduction and highlights
- `research.html` — journal publications, preprints, research interests
- `teaching.html` — single primary course directory (current and previously taught)
- `courses/index.html` — backwards-compatible redirect to Teaching
- `courses/*.html` — individual course pages; content supplied by `assets/js/course-data.js`
- `courses/na-notes/` — available Numerical Analysis detailed web notes
- `courses/numerical-analysis-i/materials/` — archive of verified accessible text editions
- `books.html` — free Class XI manual via official Zenodo DOI and forthcoming Class XII
- `cv.html`, `contact.html` — CV and academic correspondence

## Updating content
1. Update course titles, statuses, weekly topics, and notes in `assets/js/course-data.js`, using only verified information.
2. If you add a genuinely new course, add its page under `courses/` using existing pages as templates and add its URL to `sitemap.xml`.
3. Official course outlines belong under `assets/course-outlines/` **after** the author supplies approved files. Do not describe provisional teaching plans as official outlines.
4. Update the published journal citations in `research.html` when new research appears.
5. Update the books and DOI records in `books.html`; for a direct PDF download button, use the exact verified Zenodo file link. The Class XI cover is `assets/books/class-xi-cover.webp`.
6. Replace `assets/cv/Abdul_Rab_CV.pdf` when a revised CV becomes available.
7. Update site theme in `assets/css/site.css`, resource layouts in `assets/css/courses.css`, and book styles in `assets/css/books.css`.

## Safe publishing
- Propose changes in a new Git branch and open a pull request to `main`.
- The `Website checks` GitHub Action checks internal links, page titles, and critical local assets on pull requests.
- Review and merge into `main` to publish via GitHub Pages.
- Keep existing book PDFs, research links, CV, and lecture archives intact when reorganizing navigation.

## Archive note
Some legacy MAT-315 resource bundles are incomplete (the old combined `mat315-semester-package.txt` and a package segment were absent). The current archive lists individual verified compressed note files and renders them as text editions in modern browsers. The original package chunks remain in the repository for future recovery; only publish full PDF downloads when source files are complete.

## Future optional enhancements
- Add Google Scholar / ORCID links if the author provides them.
- Add more course outlines and original PDFs/LaTeX sources as they become available.
- Add a higher-resolution book cover when supplied.
- Enable privacy-conscious traffic analytics only with an approved service/account configuration.
