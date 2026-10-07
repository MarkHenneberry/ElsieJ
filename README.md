# Elsie J’s Home Care

A responsive seven-page website using Next.js 16 App Router, TypeScript, Tailwind CSS 4, Inter, and Lucide icons. The supplied logo and brand guidelines are preserved in `public/images/`.

## Run locally

```powershell
npm install
npm run dev
```

Visit http://localhost:3000. For the production server, run `npm run build` followed by `npm run start`.

## Owner setup

Edit **`src/lib/business.ts`**. Empty strings and arrays are deliberate placeholders and do not appear as developer text on the website.

- Add the real phone number and email. Phone links, header call action, footer contact details, and the mobile Call Us action appear automatically.
- Add the legal business name, service areas, address (if public), and hours. There are no invented location or availability claims.
- Confirm or remove the proposed services in the `services` array; update descriptions and set `servicesConfirmed: true` only when accurate. Until then, visitors are told to confirm availability. Service schema is omitted until confirmed.
- Add the real founder name and story if desired. This section stays hidden until supplied.
- Add only approved, genuine testimonials. The entire section remains hidden while the array is empty.
- Add optional social links.
- Replace lifestyle imagery with company photography when available. Image paths and alt text are centralized in `business.images`.

Copy `.env.example` to `.env.local` and configure:

- `NEXT_PUBLIC_SITE_URL`: the final HTTPS origin, without a trailing slash. This enables canonical URLs, absolute social images, the sitemap, and indexing. Rebuild after changing it. Until configured, the site intentionally asks search engines not to index it.
- `CONTACT_WEBHOOK_URL`: a trusted HTTPS endpoint that delivers or stores enquiries. The endpoint receives `name`, `phone`, `email`, `careFor`, and `message` as JSON. It must return a 2xx response only when it has accepted delivery.
- `CONTACT_WEBHOOK_TOKEN`: optional server-only bearer token for that endpoint. Do not put credentials in the public business config.

The form has client and server validation, an anti-bot honeypot, cross-origin checks, a payload length limit, and a delivery timeout. It shows success only after a successful delivery response. Without an endpoint it clearly reports that online requests are unavailable, and does not send or save enquiries. A delivery-provider account was not supplied, so no external requests have been sent. Add platform rate limiting and provider abuse protection when connecting the live endpoint.

Before launch, approve the service descriptions and business copy, finish the contact setup, and update the privacy statement to match the selected hosting/delivery providers and actual retention and access procedures. No medical, licensing, insurance, background-check, founding-date, pricing, staffing, or review claims were invented.

## Main files

- `src/app/page.tsx`: home page.
- `src/app/{services,about,how-it-works,contact,privacy,accessibility}/page.tsx`: individual pages.
- `src/app/globals.css`: responsive visual system and accessible interaction styles.
- `src/components/`: header, mobile navigation, footer, reusable sections, services, FAQ, testimonial component, and contact form.
- `src/lib/business.ts`: business details, proposed services, FAQs, process, and imagery.
- `src/lib/contact.ts` and `src/app/api/contact/route.ts`: contact validation and delivery.
- `src/lib/metadata.ts`, `src/app/robots.ts`, and `src/app/sitemap.ts`: SEO configuration.
- `tests/site.spec.ts`: browser checks for layouts, keyboard controls, accessibility, and form behaviour.

Service objects have stable slugs for anchors. Individual service or location routes can be added later using these objects and `pageMetadata`; publish only confirmed services and locations.

## Verification

```powershell
npm run typecheck
npm run lint
npm run build
npx playwright install chromium
npm run test:e2e
```

Browser tests cover all seven pages at 375, 430, 768, 1024, 1440, and 1920px, image loading, horizontal overflow, console errors, navigation, FAQ keyboard interaction, mobile menu, form validation, and API unavailable/cross-origin behaviour. Automated WCAG A/AA checks run on every page at desktop and mobile sizes. Success/error UI is tested using simulated delivery responses; actual provider delivery remains unverified until a provider is configured. Automated accessibility checks do not replace a manual assistive-technology review.

Production dependency audit reports no vulnerabilities. The complete audit currently reports five related development-only findings in the upstream Next ESLint plugin → fast-glob → micromatch → braces chain. The registry currently offers no patched braces release; the suggested downgrade would replace the Next 16 lint config with an incompatible older major. Recheck the advisory when updating dependencies.

## Image provenance

`public/images/care-at-home.png` was made with the built-in imagegen tool and optimized to `public/images/care-at-home.webp` (approximately 198 KB). It is illustrative imagery, not a photograph of actual employees or clients. The original supplied logos were not altered. See `docs/image-prompt.txt` for the generation prompt.

Framework implementation follows the official [Next.js installation](https://nextjs.org/docs/app/getting-started/installation) and [metadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) documentation.
