# OpenDesign portfolio preview

The design remains in the local OpenDesign project. This server serves the same
HTML and assets on loopback. It does not replace or deploy the Next.js portfolio.

Requires Node 24.

```sh
node scripts/portfolio-preview.mjs --design-dir "/absolute/path/to/OpenDesign/project" --entry jerome-portfolio-v6.html
```

Open `http://127.0.0.1:43117/`, or use the v6 preview inside OpenDesign.

The preview binds to loopback only and serves only the portfolio HTML files and
their `assets/` directory, never workspace or env files.

```sh
npx eslint scripts/portfolio-*.mjs
```
