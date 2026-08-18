<div align="center">

# buildbyfahad.github.io

### Personal portfolio of **Fahad Memon** — Full-Stack &amp; Mobile Developer

[![Live site](https://img.shields.io/badge/live-buildbyfahad.github.io-58A6FF?style=for-the-badge&labelColor=0D1117)](https://buildbyfahad.github.io)
[![Built with](https://img.shields.io/badge/built%20with-HTML%20%C2%B7%20CSS%20%C2%B7%20JS-F0F6FC?style=for-the-badge&labelColor=0D1117)](#stack)
[![No dependencies](https://img.shields.io/badge/dependencies-0-3FB950?style=for-the-badge&labelColor=0D1117)](#stack)
[![Transfer size](https://img.shields.io/badge/transfer-~63%20KB-79C0FF?style=for-the-badge&labelColor=0D1117)](#performance)

**[→ buildbyfahad.github.io](https://buildbyfahad.github.io)**

</div>

---

## About

A single-page portfolio covering the products I've shipped — web platforms, cross-platform
mobile apps and the tools built around them — with a filterable project grid, a categorised
tech stack, and a contact section.

Hand-written HTML, CSS and vanilla JavaScript. **No framework, no build step, no
dependencies, no bundler.** Clone it and open `index.html`.

## Highlights

- **Filterable project grid** — All / Web / Mobile app / Backend / npm package, driven by
  `data-cat` attributes; projects can belong to more than one category
- **88 inline brand logos** from [simple-icons](https://simpleicons.org), colour-corrected so
  dark brand marks stay legible on a dark background without losing their hue
- **Animated hero** — staggered line reveal, drifting gradient mesh, count-up statistics
- **Scroll reveals** via `IntersectionObserver`, with a no-JS fallback so content is never
  hidden if scripting fails
- **Fully responsive** — four-column grids collapse in stages; the hero portrait becomes a
  compact identity row on phones
- **Accessible** — `prefers-reduced-motion` disables every animation, filter tabs use
  `role="tablist"` with `aria-selected`, hidden cards use the `hidden` attribute so screen
  readers skip them

## Stack

| | |
|---|---|
| **Markup** | Semantic HTML5 |
| **Styling** | CSS custom properties, Grid, Flexbox, `clamp()` fluid type |
| **Scripting** | Vanilla JS — `IntersectionObserver`, no libraries |
| **Type** | [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) + [Inter](https://fonts.google.com/specimen/Inter) |
| **Icons** | [simple-icons](https://simpleicons.org), inlined as SVG |
| **Hosting** | GitHub Pages |

Palette follows GitHub's dark theme — `#0D1117` background, `#161B22` surfaces,
`#58A6FF` accent.

## Performance

Everything is inlined or self-hosted, so the page makes no third-party asset requests
beyond Google Fonts.

| Asset | Raw | Gzipped |
|---|---|---|
| `index.html` | 145 KB | **39 KB** |
| `assets/style.css` | 14.9 KB | **4.1 KB** |
| `assets/main.js` | 2 KB | ~1 KB |
| `assets/profile.jpg` | 20 KB | — |
| **Total transfer** | | **~63 KB** |

The HTML is large uncompressed because 88 SVG icon paths are inlined — they repeat, so they
compress to roughly a quarter of their size.

## Structure

```
.
├── index.html          # every section — hero, services, stack, work, process, about, contact
├── assets/
│   ├── style.css       # design tokens, layout, responsive breakpoints
│   ├── main.js         # scroll reveals, count-up stats, project filter
│   └── profile.jpg     # portrait
├── .nojekyll           # bypass Jekyll processing
└── README.md
```

## Running locally

No build step — serve the directory with anything:

```bash
git clone https://github.com/buildbyfahad/buildbyfahad.github.io.git
cd buildbyfahad.github.io
python3 -m http.server 8000
```

Then open <http://127.0.0.1:8000>.

> On macOS use `127.0.0.1` rather than `localhost` — `localhost` resolves to IPv6 `::1`,
> which `http.server` does not bind.

## Deploying

Push to `main`. GitHub Pages rebuilds automatically, usually within a minute.

```bash
git add -A
git commit -m "Update content"
git push
```

## Contact

- **Site** — [buildbyfahad.github.io](https://buildbyfahad.github.io)
- **LinkedIn** — [in/fahadmeman](https://in.linkedin.com/in/fahadmeman)
- **Email** — [fahadittechnical@gmail.com](mailto:fahadittechnical@gmail.com)

<div align="center"><sub>Built by hand in Surat, India.</sub></div>
