# Amanat - Your Silver Atelier

A premium, state-of-the-art web application showcasing handcrafted 925 sterling silver jewelry. Articulated in silver, defined by movement.

This website is designed with a sleek, minimalist aesthetic tailored for luxury branding. It integrates custom smooth animations, Three.js 3D model visualization, and standard WhatsApp Business order placement flow.

---

## 📁 Repository Structure & Documentation

The project files have been organized to maintain a clean root directory. Detailed guides, installation setups, and integration details can be found inside the `docs/` folder:

* **[Setup & Installation Guide](file:///d:/Projects/AmanatSilver/docs/SETUP_GUIDE.md)**: Steps to run the development environment, configure environment variables, and verify builds.
* **[WhatsApp Business Integration](file:///d:/Projects/AmanatSilver/docs/WHATSAPP_SETUP.md)**: Configuration details for setting up direct order placements and contact enquiries via WhatsApp.
* **[Backend Integration Guide](file:///d:/Projects/AmanatSilver/docs/BACKEND_INTEGRATION.md)**: Comprehensive guide on Node.js/Express, MongoDB database schema, and serverless hosting on Vercel.
* **[Production & Performance Improvements](file:///d:/Projects/AmanatSilver/docs/PRODUCTION_IMPROVEMENTS.md)**: Highlights of caching strategies, responsive image scaling (preventing cropping via `object-contain`), error boundary setup, and loading performance optimizations.
* **[Troubleshooting Guide](file:///d:/Projects/AmanatSilver/docs/TROUBLESHOOTING.md)**: Common developer traps, dependency resolution steps, and runtime fixes.

---

## 🛠️ Technology Stack

* **Frontend**: React 19 (TypeScript, TSX)
* **Styling**: Tailwind CSS & custom Vanilla CSS layout structures
* **Animations**: GSAP (GreenSock Animation Platform)
* **3D Visualizer**: Three.js integration for product previews
* **Routing**: React Router DOM (HashRouter for server compatibility)
* **Bundler & Dev Server**: Vite

---

## 🚀 Deployment (AWS Hosting)

The production build of the website is generated using:
```bash
npm run build
```
This generates a static single-page app (SPA) output in the `dist/` directory.

Since the application is hosted on **Amazon Web Services (AWS)** (e.g. S3 + CloudFront, AWS Amplify, or EC2):
- Build files are outputted to `dist/`, which is ignored in `.gitignore`.
- Any local AWS credentials, parameters, private keys (`*.pem`), or `.env` files are ignored to ensure deployment security.
