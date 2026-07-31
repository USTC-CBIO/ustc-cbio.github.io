# IBO Lab website

Static bilingual website for **IBO Lab — Intelligence for Biological Omics**.

## Preview locally

No build step is required. From this directory, run:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Content to update before launch

Search the project for these placeholders:

- `your-email@example.edu`
- `href="#"` links
- publication placeholder titles
- news placeholder titles
- team photo placeholder

The English/Chinese copy is in `index.html` and `script.js`.

## Deploy to GitHub Pages

1. Create an empty GitHub repository and push this folder to its `main` branch.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **GitHub Actions**.
4. The included workflow will publish the site after each push to `main`.

For a custom domain, add the domain under **Settings → Pages → Custom domain**,
then create a `CNAME` file containing that domain.
