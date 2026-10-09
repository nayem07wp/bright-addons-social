# Post graphic generator

Renders 1080 x 1080 post graphics in the Bright Addons look into `../images/`.

    cd tools && npm install
    node gen.js posts.js

`posts.js` exports a list of posts: `date`, `slug`, `eyebrow`, `h1` (use `<br>` and `<em>` for the amber line), optional `sub`, `kind` (`list`, `steps`, `poll`, `keys`, `myth`), `items`, optional `foot` and `hs` (headline size). See `posts.example.js`. The script prints `OVERLAP` for any graphic whose content runs into the footer.
