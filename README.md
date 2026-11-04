# Osama Megahed: Portfolio

My personal developer portfolio, built with React 19, TypeScript and Vite.

**Live site:** [portfolio-nine-phi-nw8cnmt42u.vercel.app](https://portfolio-nine-phi-nw8cnmt42u.vercel.app)

## Sections

- **About:** education, experience, certificates and volunteering
- **The Venture:** a case study of Vectos (formerly ShoesFit), my smart-shoe startup
- **Skills, Projects and Services**
- **Design Gallery:** my Photoshop work
- **Testimonials and Contact**

## Features

- **Command palette:** press `Ctrl + K` to jump to any section
- **Custom cursor and scroll progress bar**
- **Scroll reveal animations** through a reusable `useScrollReveal` hook
- **Justified gallery layout** calculated in `justifyRows.js`

## Tech stack

| Area | Tools |
| --- | --- |
| Framework | React 19 |
| Language | TypeScript and JavaScript (JSX) |
| Build tool | Vite |
| Styling | Plain CSS, one file per component |
| Icons | React Icons |
| Hosting | Vercel |

## Getting started

```bash
npm install
npm run dev
```

To create and preview a production build:

```bash
npm run build
npm run preview
```

## Project structure

```text
src/Components/   One folder per section, with its styles
src/assets/       Images and certificates
src/utils/        Hooks and helpers
public/           Static files
```
