import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import keystatic from '@keystatic/astro'

// The Keystatic admin (/keystatic) is only mounted during local development
// (`npm run dev`). Production builds (`astro build`) are therefore 100% static:
// no admin route, no serverless functions, no adapter, nothing to secure.
// To edit content: run `npm run dev`, open http://localhost:4321/keystatic,
// save, then commit + push — Vercel rebuilds the static menu automatically.
const enableKeystatic =
  process.argv.includes('dev') || process.env.npm_lifecycle_event === 'dev'

export default defineConfig({
  integrations: [react(), ...(enableKeystatic ? [keystatic()] : [])],
})
