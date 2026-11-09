# Emberwood Furniture Showroom

A responsive furniture catalog and showroom built with HTML, CSS, and vanilla
JavaScript. Browse the furniture collection, view item prices and details,
open product photos in the gallery, or explore a simple interactive 3D model.

## Run the site

Open `index.html` in a browser, or serve this folder with a local web server
(for example, the VS Code Live Server extension). The 3D showroom loads
Three.js from a CDN, so an internet connection is needed for that page's 3D
model.

## Pages

- `index.html` — home page and featured products.
- `products.html` — filterable catalog with 16 products across sofas, chairs,
  tables, and beds. Each product has its own displayed price.
- `showroom.html` — interactive 3D furniture viewer with color/material
  options, zoom controls, and product details.
- `about.html` — brand information and a photo gallery. Select a photo to open
  it in a larger viewer.
- `contact.html` — contact form demonstration. Submitting the form displays a
  confirmation in the page; it does not send or store a message.

## Furniture photos and logo

Product images and the site logo are stored in `assets/images/`. The About
gallery and catalog use the product images directly. Keep the existing
filenames when replacing assets, or update the matching image paths in
`js/data.js` and `css/style.css`. The Emberwood logo is also used as the
browser-tab favicon on every page.

## Catalog data

Edit `js/data.js` to change product names, prices, descriptions, specifications,
image paths, or color/material options. The catalog data is shared by the home,
collection, showroom, and gallery pages.

## Interactions and styling

- `js/showroom.js` controls 3D rotation, zoom, auto-spin, and color/material
  selection.
- `css/style.css` contains responsive layouts, page backgrounds, hover
  transitions, animations, and reduced-motion support.
