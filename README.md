# Jainam Shah — Portfolio

Personal 3D interactive portfolio for Jainam Shah, Quant Finance Analyst & Builder.

## Credits

The site architecture, animations, and design (React + TypeScript + Vite, GSAP
ScrollSmoother/ScrollTrigger, react-three-fiber physics tech-stack visualization) are
based on [Moncy Yohannan's open-source portfolio](https://github.com/MoncyDev/Portfolio-Website),
used and adapted per its [Personal Portfolio License](https://github.com/MoncyDev/Portfolio-Website/blob/main/LICENSE).

The original repository's 3D character, rig, and animations are proprietary and excluded
from that license, so this project uses different, properly-licensed assets instead:

- **3D character** ([`RobotExpressive.glb`](https://github.com/mrdoob/three.js/tree/dev/examples/models/gltf/RobotExpressive)) —
  from the [three.js](https://github.com/mrdoob/three.js) examples, MIT License
- **HDRI environment map** — from [Poly Haven](https://polyhaven.com), CC0 (public domain)

## Tech Stack

React 18 • TypeScript • Vite • Three.js • React Three Fiber/Drei/Cannon/Rapier/Postprocessing
• GSAP • react-fast-marquee

## Development

```bash
npm install
npm run dev      # local dev server
npm run build    # production build (deploys to Vercel from repo root)
```

GitHub Pages (served from `/portfolio/`) builds and deploys automatically via
`.github/workflows/deploy-pages.yml` on every push to `main`.
