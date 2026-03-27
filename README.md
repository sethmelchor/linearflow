# Linearflow — The Exposure Triangle

A static website that teaches the fundamentals of photography exposure through scroll storytelling and an interactive simulator.

## What's Inside

- **Scroll storytelling** — Visual walkthrough of ISO, Aperture, and Shutter Speed with comparison photos
- **Interactive Exposure Simulator** — Drag sliders to see how the three settings interact in real-time
- **Zero dependencies** — Pure HTML, CSS, and vanilla JavaScript

## Run Locally

Open `index.html` directly in your browser. That's it.

Or use a local server:

```bash
python3 -m http.server 8000
# Visit http://localhost:8000
```

## Replacing Placeholder Images

The `images/` directory contains placeholder photos. To swap in real photography:

- **Format:** JPEG
- **Recommended width:** 1600px for hero, 800px for comparison images
- **Aspect ratio:** 3:2 (landscape)
- **Keep the same filenames** so no code changes are needed

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for the Linear-integrated workflow.
