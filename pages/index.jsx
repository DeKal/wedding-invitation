import Head from 'next/head';
import dynamic from 'next/dynamic';

// The invitation body is a verbatim port of hand-written HTML and is purely
// client-interactive, so we load it with ssr:false. This skips server rendering
// (and therefore hydration), which eliminated the hydration mismatch crash
// (React #418/#423). The <Head> and the visually-hidden <section> below ARE
// server-rendered into the HTML, so metadata, link previews and crawlable text
// all work without re-introducing hydration of the raw markup.
const InvitationApp = dynamic(() => import('../components/invitation/InvitationApp'), {
  ssr: false,
});

const SITE_URL = 'https://phat-duyen-wedding.vercel.app';
const OG_IMAGE = `${SITE_URL}/assets/images/og-cover.jpg`; // 1200x630, generated from the cover photo
const TITLE = 'Hữu Phát & Mỹ Duyên — Thiệp cưới · 07.11.2026';
const DESCRIPTION =
  'Trân trọng kính mời bạn đến dự lễ cưới của Hữu Phát & Mỹ Duyên — Thứ Bảy, 07/11/2026, 18:30, Sảnh BallRoom, Tầng 3 Khách sạn Caravelle.';

// schema.org Event — helps search engines show a rich wedding/event result.
const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'Lễ cưới Hữu Phát & Mỹ Duyên',
  description: DESCRIPTION,
  startDate: '2026-11-07T18:30:00+07:00',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  image: [OG_IMAGE],
  url: SITE_URL,
  organizer: { '@type': 'Person', name: 'Hữu Phát & Mỹ Duyên' },
  location: {
    '@type': 'Place',
    name: 'Khách sạn Caravelle — Sảnh BallRoom, Tầng 3',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '19-23 Công trường Lam Sơn, Bến Nghé, Quận 1',
      addressLocality: 'Thành phố Hồ Chí Minh',
      addressCountry: 'VN',
    },
  },
};

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

export default function ReactInvitation() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={DESCRIPTION} />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#000000" />
        <link rel="canonical" href={SITE_URL} />

        {/* Favicons / PWA */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Open Graph (Facebook / Zalo / Messenger) */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Thiệp cưới Hữu Phát & Mỹ Duyên" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:secure_url" content={OG_IMAGE} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Hữu Phát & Mỹ Duyên" />
        <meta property="og:locale" content="vi_VN" />

        {/* Twitter card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE} />
        <meta name="twitter:image:alt" content="Hữu Phát & Mỹ Duyên" />

        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </Head>

      {/* Crawlable, screen-reader-friendly summary (server-rendered) */}
      <section style={srOnly} aria-label="Thông tin lễ cưới">
        <h1>Hữu Phát &amp; Mỹ Duyên — Thiệp cưới</h1>
        <p>
          Trân trọng kính mời quý khách đến dự lễ cưới của Hữu Phát &amp; Mỹ Duyên.
        </p>
        <p>Thời gian: Thứ Bảy, 07/11/2026, 18:30 (Âm lịch 29/09).</p>
        <p>Địa điểm: Sảnh BallRoom, Tầng 3, Khách sạn Caravelle, Thành phố Hồ Chí Minh.</p>
      </section>

      <InvitationApp />
    </>
  );
}
