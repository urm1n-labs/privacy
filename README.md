# privacy

Clean GitHub Pages repository for hosting multiple app privacy policies with one shared design and no build step.

## Structure

```text
privacy/
├── assets/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── template.js
├── template/
│   └── index.html
├── calculator/
│   └── index.html
├── sample-app/
│   └── index.html
├── index.html
├── README.md
└── .nojekyll
```

## Global Profile (single place to edit)

Update your shared details in `assets/js/template.js` inside `GLOBAL_PROFILE`:

- `developerName`
- `baseContactEmail`

`contactAlias` in each app page automatically generates app-specific emails like:

- `urmin.org+calculator@gmail.com`
- `urmin.org+sample-app@gmail.com`

## How to add a new app privacy policy

1. Copy `template/index.html`.
2. Create a root app folder, for example `my-app/`.
3. Paste as `my-app/index.html`.
4. Edit `window.APP_CONFIG` values:
   - `appName`
   - `contactAlias` (or set `contactEmail` directly)
   - `lastUpdated`
5. Replace the policy content section text.
6. Add the app entry in root `index.html` inside the `APPS` array.
7. Commit and push to GitHub.

## GitHub Pages setup

1. Push this repository to GitHub.
2. In **Settings > Pages**, set source to your default branch and root (`/`).
3. Your URLs will be SEO-friendly:
   - Main: `/privacy/`
   - App policy: `/privacy/my-app/`

`.nojekyll` is included for direct static file hosting compatibility.

## Notes

- App pages can stay minimal: policy content + `window.APP_CONFIG`.
- Shared developer details are managed in one place: `assets/js/template.js` (`GLOBAL_PROFILE`).
- If `developer` or `contactEmail` are omitted in `APP_CONFIG`, global defaults are used automatically.
