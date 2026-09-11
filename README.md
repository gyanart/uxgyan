# Gyaneshwar Mule — portfolio site

A single-page scrolling portfolio + one deep-dive case study, built to the brief in
`gyaneshwar_portfolio_brief-1.md`. No framework, no build step — plain HTML/CSS/JS.

## What's real vs. placeholder

Most of the copy is pulled from your CV (`Gyaneshwar_Mule_CV_2026-UX.docx`):
positioning, career timeline (2014–2026, TCS/PwC UK → TCS/JLR UK → TCS/ING Bank Europe
→ Kyndryl), the six Kyndryl project names, toolkit, and the DSRR Candidacy Dashboard
case study (the only project with real process detail from the CV — everything else
in that case study beyond the CV's one-line description is a plausible reconstruction
of a typical release-readiness project, written in your voice; **please read it and
correct/replace anything that doesn't match what actually happened**).

Things still needing your input — search for these before publishing:

- **LinkedIn / Behance / Dribbble URLs** — currently `href="#"` in the nav and contact
  section (`index.html`)
- **Thinking / writing section** — no real articles were found, so it currently says
  "More writing coming soon." Add 1–4 real pieces if you have them (LinkedIn posts count)
- **Portrait / project thumbnails** — the work cards currently use a plain tinted
  placeholder instead of real images. Drop images into `assets/work/` and swap the
  `.work-thumb-inner` divs for `<img>` tags
- **Résumé PDF** — export your CV as a PDF and place it at
  `resume/GyaneshwarMule_resume.pdf` (the nav "Résumé ↓" pill already links there)
- **Case studies for projects 02–06** — currently marked "Case in preparation."
  Duplicate `work/case-template.html`, rename it, fill in the `[FILL IN]` markers,
  and link it from the matching card in `index.html`
- **Metrics** — the DSRR case study's metric strip is qualitative on purpose (no real
  numbers were available). Replace with real figures if you have them, or note
  "figures under NDA," or delete the block entirely — never invent numbers

## File structure

```
gyaneshwar-portfolio/
├── index.html                          # main scrolling page
├── styles.css                          # shared styles (design tokens at the top)
├── script.js                           # scroll reveals, sticky nav, mobile menu
├── README.md
├── work/
│   ├── dsrr-candidacy-dashboard.html   # the one real deep-dive case study
│   └── case-template.html              # blank template — duplicate for new cases
├── resume/
│   └── GyaneshwarMule_resume.pdf       # ← add this (see above)
└── assets/
    └── work/                           # project thumbnails go here
```

## Editing the design tokens

All colors, fonts, and spacing live as CSS custom properties at the top of
`styles.css` under `:root`. Change a value once there and it updates everywhere.

## Publishing

No build step needed. Two easy options:

- **GitHub Pages** — push this folder to a repo, enable Pages on the `main` branch
- **Netlify** — drag the whole `gyaneshwar-portfolio` folder onto app.netlify.com/drop

## Before you go live

Run through brief §11's checklist — replace every `[FILL IN]`, verify every metric is
real, check mobile at 375px, and confirm `prefers-reduced-motion` is respected (it is,
by default, in `styles.css`).
