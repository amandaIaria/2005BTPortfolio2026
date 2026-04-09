---
name: seo-and-meta
description: 'Use when adding page titles, meta descriptions, Open Graph tags, structured data, social sharing images, or route-level head management. Covers SEO for portfolio sites with TanStack Router.'
---

# SEO & Meta Tags

## Route-Level Head Management

TanStack Router supports `head` in route options for per-page meta:

```tsx
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [
      { title: 'About — Amanda Iaria' },
      { name: 'description', content: 'Learn about my background, skills, and experience.' },
    ],
  }),
  component: AboutPage,
});
```

## Essential Meta Tags

Every page should have at minimum:

```tsx
head: () => ({
  meta: [
    { title: 'Page Title — Site Name' },
    { name: 'description', content: 'Concise 150-160 character description.' },
  ],
}),
```

## Open Graph (Social Sharing)

Add OG tags so links look good when shared on social media:

```tsx
head: () => ({
  meta: [
    { title: 'Amanda Iaria — Portfolio' },
    { name: 'description', content: 'Frontend developer portfolio.' },
    { property: 'og:title', content: 'Amanda Iaria — Portfolio' },
    { property: 'og:description', content: 'Frontend developer portfolio.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://yoursite.com/' },
    { property: 'og:image', content: 'https://yoursite.com/og-image.png' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Amanda Iaria — Portfolio' },
    { name: 'twitter:description', content: 'Frontend developer portfolio.' },
    { name: 'twitter:image', content: 'https://yoursite.com/og-image.png' },
  ],
}),
```

## OG Image

- Place in `public/og-image.png`
- Recommended size: 1200×630px
- Use the project brand colours (`--sea-ink`, `--lagoon`, `--palm`)

## index.html Baseline

The `index.html` should include baseline tags that apply to all pages:

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#173a40" />
  <link rel="icon" href="/favicon.ico" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
</head>
```

Route-level `head` entries override or supplement these.

## Structured Data (JSON-LD)

For a portfolio, add a Person schema on the home page:

```tsx
function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Amanda Iaria',
            url: 'https://yoursite.com',
            jobTitle: 'Frontend Developer',
            sameAs: [
              'https://github.com/yourusername',
              'https://x.com/yourhandle',
            ],
          }),
        }}
      />
      {/* page content */}
    </>
  );
}
```

## robots.txt

Already present at `public/robots.txt`. Ensure it allows crawling:

```
User-agent: *
Allow: /
Sitemap: https://yoursite.com/sitemap.xml
```

## Checklist for New Pages

1. Has a unique `title` with site name suffix
2. Has a `description` meta tag (150–160 chars)
3. Has Open Graph tags if the page might be shared
4. Headings follow a logical hierarchy (`h1` → `h2` → `h3`)
5. Images have descriptive `alt` text
6. Internal links use `<Link>` for client-side nav (good for perceived performance)
