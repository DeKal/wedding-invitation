import Head from 'next/head';
import dynamic from 'next/dynamic';
import { SITE_URL, OG_IMAGE } from '../../lib/ceremonyMeta';

// The invitation body is a verbatim port of hand-written HTML and is purely
// client-interactive, so we load it with ssr:false. This skips server rendering
// (and therefore hydration), which eliminated the hydration mismatch crash
// (React #418/#423). The <Head> and the visually-hidden <section> below ARE
// server-rendered into the HTML, so metadata, link previews and crawlable text
// all work without re-introducing hydration of the raw markup.
const InvitationApp = dynamic(() => import('./InvitationApp'), {
  ssr: false,
});

// Visually hidden but present in the DOM / server HTML, so crawlers index the
// real event text while the styled art renders client-side.
const srOnly = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
};

// Shared page shell for every ceremony route (/, /le-cuoi, /le-vu-quy). `meta`
// is a descriptor from lib/ceremonyMeta.js; `initialCeremony` (0|1) picks which
// ceremony the Information section loads first.
export default function InvitationPage({ meta, initialCeremony = 0 }) {
  const canonical = `${SITE_URL}${meta.canonicalPath}`;

  // schema.org Event — helps search engines show a rich wedding/event result.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: meta.jsonLd.name,
    description: meta.description,
    startDate: meta.jsonLd.startDate,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    image: [OG_IMAGE],
    url: canonical,
    organizer: { '@type': 'Person', name: 'Hữu Phát & Mỹ Duyên' },
    location: {
      '@type': 'Place',
      name: meta.jsonLd.locationName,
      address: {
        '@type': 'PostalAddress',
        streetAddress: meta.jsonLd.streetAddress,
        addressLocality: meta.jsonLd.addressLocality,
        addressCountry: 'VN',
      },
    },
  };

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* LCP hero is a CSS background-image on a client-rendered (ssr:false) div,
            so it isn't discoverable in the static HTML. Both cover photos are
            above the fold and alternate as the LCP element; now that they're WebP
            (18KB + 108KB) preloading them is cheap and makes the LCP image
            discoverable + high-priority, so it paints as soon as the body mounts. */}
        <link rel="preload" as="image" href="/assets/images/photos/couple-01.webp" fetchPriority="high" />
        <link rel="preload" as="image" href="/assets/images/photos/couple-02.webp" fetchPriority="high" />
        <meta name="description" content={meta.description} />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-title" content="Phat & Duyen" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="canonical" href={canonical} />

        {/* Favicons / PWA */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Open Graph (Facebook / Zalo / Messenger) */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Thiệp cưới Hữu Phát & Mỹ Duyên" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:secure_url" content={OG_IMAGE} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="644" />
        <meta property="og:image:alt" content="Hữu Phát & Mỹ Duyên" />
        <meta property="og:locale" content="vi_VN" />

        {/* Twitter card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={OG_IMAGE} />
        <meta name="twitter:image:alt" content="Hữu Phát & Mỹ Duyên" />

        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      {/* Crawlable, screen-reader-friendly summary (server-rendered) */}
      <section style={srOnly} aria-label="Thông tin lễ cưới">
        <h1>{meta.srOnly.heading}</h1>
        <p>{meta.srOnly.intro}</p>
        <p>{meta.srOnly.time}</p>
        <p>{meta.srOnly.place}</p>
      </section>

      <InvitationApp initialCeremony={initialCeremony} />
    </>
  );
}
