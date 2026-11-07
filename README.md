# Max Conine – Personal Website

Live at https://maxconine.netlify.app

Plain HTML/CSS/JS: `index.html`, `music.html`, `style.css`, `script.js`.

## Local preview

```bash
npm install
npm run dev
```

## Images

- Full-size photos live in `images/` (max 1600px on the long edge) and open in the lightbox.
- Thumbnails live in `images/thumbs/` (max 700px) and are what the cards and galleries load.
- When adding a photo, add both versions and reference them as
  `<img src="./images/thumbs/NAME" data-full="./images/NAME" alt="...">`.

On macOS you can make the two versions with:

```bash
sips -Z 1600 -s formatOptions 70 photo.jpeg --out images/photo.jpeg
sips -Z 700 -s formatOptions 70 images/photo.jpeg --out images/thumbs/photo.jpeg
```
