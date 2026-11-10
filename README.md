# Industrial Gases — Website

Website for Industrial Gases (Devi Gas Products Pvt. Ltd. group), Kolkata.
Plain HTML, CSS and JavaScript — no build step, no dependencies.

## Run locally
Open `index.html` in a browser, or serve the folder:
```bash
npx serve .
```

## Deploy on GitHub Pages
1. Create a new repository and push this folder to it.
2. Go to **Settings → Pages**.
3. Set **Source** to the `main` branch, `/ (root)`, and save.
4. The site will be live at `https://<username>.github.io/<repo>/` within a minute or two.

For the domain `devigasproducts.com`, add it under **Settings → Pages → Custom domain**
and update the domain's DNS records to point to GitHub Pages.

## Before going live
- Search for `REPLACE` in `index.html`:
  - Add the phone number and confirm the contact email.
  - Create a free form at https://formspree.io and paste its ID into the form `action`
    so quote requests arrive by email.
