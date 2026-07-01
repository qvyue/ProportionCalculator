# Proportion Calculator

A static prerendered React site for solving proportions and practicing proportion examples.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The build creates a prerendered `dist` folder with separate HTML files for:

- `/` -> `dist/index.html`
- `/proportion/examples` -> `dist/proportion/examples/index.html`

The public files are also copied to `dist`, including:

- `/robots.txt`
- `/sitemap.xml`
- `/_redirects`

## Deployment

Deploy the full `dist` folder as a static site.

These production URLs should return `200`:

- `https://www.proportion-calculator.com/`
- `https://www.proportion-calculator.com/proportion/examples`
- `https://www.proportion-calculator.com/robots.txt`
- `https://www.proportion-calculator.com/sitemap.xml`

The site is prerendered, so `/proportion/examples` should return
`dist/proportion/examples/index.html` directly on refresh.

For Vercel, `vercel.json` maps `/proportion/examples` to its prerendered HTML.
For Netlify-style hosts, `public/_redirects` does the same after build.
