# Content and photography refresh

The existing colours, fonts, spacing system, logo, navigation, cards, and responsive breakpoints are preserved. New CSS is limited to the service index and the long service sections.

## Pages and copy

Home, Our Services, About Us, How It Works, and Contact have revised copy. Shared values, final contact sections, the footer, form introductions, process steps, FAQs, and relevant metadata have also been updated. Privacy and Accessibility were reviewed and retain their substantive wording.

Each section now has a distinct purpose: the audience and offer; the range of services; personal attention and trust; everyday interests; the getting-started process; and respite for family caregivers. The main content of Home, About, How It Works, and Contact now has no standalone occurrences of “help.” Service descriptions are excluded from this editorial change.

## Service wording

All 11 descriptions were copied directly from the supplied request into `src/lib/services.json`. `src/lib/business.ts` exports this centralized data and selects the six short homepage previews. The complete descriptions are shown on Services; the homepage uses brief summaries only.

The exact source is preserved in `docs/service-copy.txt`. Tests compare configured blocks and rendered text against that source, allowing only whitespace and list formatting changes. No description has been paraphrased or corrected.

Services: Personal Care; Meal Preparation; Housekeeping; Senior Care; Alzheimer's & Dementia Care; Companion Care; Comprehensive Home Care; Respite Care; End of Life Care; Transportation Services; Errands & Task Support.

Visitors can jump to any service from the index, read all content without opening accordions, and return to the index from each section. Section headings, lists, 18px text, and a maximum 740px content width keep the longer copy readable.

There is no Veterans Affairs Program section, government partnership, approval, funding, or direct-billing claim. The About page continues to welcome Canadian veterans and their families, and also naturally includes people with disabilities and families seeking respite.

## CTA reduction

Counts below are button-styled links inside main page content, excluding the shared header and mobile contact bar.

| Page | Before | After | Removed |
| --- | ---: | ---: | ---: |
| Home | 5 | 3 | 2 |
| Services | 2 | 1 | 1 |
| About | 1 | 1 | 0 |
| How It Works | 1 | 1 | 0 |

Three CTA buttons were removed in total. Seven additional promotional text links were removed from the homepage: six service-card prompts and the family section's contact link. The homepage retains its two hero buttons, one Services preview link, and one final contact button. Service jump links and “Back to services” are page navigation, not sales CTAs. The header, email links, footer navigation, and mobile contact action remain available.

## Photography

Three original illustrative images were generated using the built-in imagegen tool and optimized to WebP. They are not actual clients, caregivers, or client stories.

| Existing slot | New asset | Approximate size |
| --- | --- | ---: |
| Home hero | `public/images/senior-companion-kitchen.webp` | 201 KB |
| Home editorial section | `public/images/wheelchair-client-caregiver.webp` | 169 KB |
| About editorial section | `public/images/canadian-veteran-home-care.webp` | 176 KB |

The senior tends seedlings with a companion; a wheelchair user prepares pancakes alongside a companion; a Canadian veteran builds a model boat with personal service mementos in the background. None are posed looking at the camera, and no government relationship is implied. Frames and dimensions are retained. Alt text and asset paths are centralized in `business.images`. Social metadata uses the new hero image. The old `care-at-home` assets remain on disk for reference but are no longer used by the site. No image slots remain unfilled; real company photography can replace these illustrations later.

Full prompts are in `docs/image-prompts-refresh.json`.

## Supplied wording to review separately

The following were preserved exactly, as requested:

- Spelling and grammar such as “alot,” “a significant affect,” “delivering the to your home,” and “continue maintain.”
- Mixed capitalization of “Home care,” “Caregivers,” and other terms; mixed “favorite”/“favourite” conventions and possessives such as “loved ones.”
- The Respite Care “2 times as likely” stress statistic has no citation in the supplied material. It has not been independently substantiated in this content pass.
- “Perfect caregiver,” “round the clock,” and “wherever you want, whenever you want” are broad promises; their wording should match actual matching and scheduling arrangements.
- Personal Care includes catheter/ostomy care, Meal Preparation includes swallowing support, and the copy includes caregiver training claims. These are owner-supplied statements; confirm the wording matches the company's actual scope, staff qualifications, and processes before launch.

No unprovided certifications, credentials, prices, reviews, staff counts, or dates have been added.

## Verification

Browser checks cover all seven pages at 375, 430, 768, 1024, 1440, and 1920px, image loading, console errors, horizontal overflow, keyboard navigation, FAQs, and the mobile menu. Automated WCAG A/AA checks cover all seven pages on desktop and mobile. Content tests check all 11 exact descriptions, jump links, reduced CTAs, contact email, image selection, and absence of affiliation claims.

Content-pass test command (does not send form enquiries to any configured delivery endpoint):

```powershell
npm run test:e2e -- --grep "Every page|All pages|Desktop navigation|Mobile menu|eleven supplied|Sales CTAs|photo set"
```

The seven content-pass browser tests, lint, TypeScript, and production build all pass. All project text files were also checked for valid UTF-8 and mojibake. The existing contact delivery implementation and `.env.local` were not changed; no test enquiry was sent.

Next.js 16.4.0 emitted a security upgrade advisory. A fresh production dependency audit reports a critical finding in `next` and offers 16.4.3 as a non-major fix. The first build completed compilation and then stopped for the advisory; the retry exited successfully with the warning. Upgrade Next.js before deployment. No framework or dependency upgrade is included in this content pass.

## Files changed

- `src/app/page.tsx`
- `src/app/services/page.tsx`
- `src/app/about/page.tsx`
- `src/app/how-it-works/page.tsx`
- `src/app/contact/page.tsx`
- `src/app/layout.tsx`
- `src/app/globals.css`
- `src/components/ui.tsx`
- `src/components/footer.tsx`
- `src/components/contact-form.tsx`
- `src/lib/business.ts`
- `src/lib/services.json` (new)
- `src/lib/metadata.ts`
- `tests/site.spec.ts`
- `tests/content-refresh.spec.ts` (new)
- `README.md`
- `docs/service-copy.txt` (new)
- `docs/image-prompts-refresh.json` (new)
- `docs/content-refresh.md` (new)
- `public/images/senior-companion-kitchen.webp` (new)
- `public/images/canadian-veteran-home-care.webp` (new)
- `public/images/wheelchair-client-caregiver.webp` (new)

Next.js also regenerates `next-env.d.ts` when switching between build and development modes; it was not edited manually.
