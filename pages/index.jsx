import Head from 'next/head';
import dynamic from 'next/dynamic';

// The invitation body is a verbatim port of hand-written HTML and is purely
// client-interactive, so we load it with ssr:false. This skips server rendering
// (and therefore hydration), which eliminated the hydration mismatch crash
// (React #418/#423) caused by the browser normalizing the raw markup differently
// than React's SSR output. The <Head> below is still emitted into the served
// HTML <head>, so link-preview (Open Graph / Twitter) and SEO metadata work.
const InvitationApp = dynamic(() => import('../components/invitation/InvitationApp'), {
  ssr: false,
});

const SITE_URL = 'https://phat-duyen-wedding.vercel.app';
const OG_IMAGE = `${SITE_URL}/assets/images/photos/couple-01.jpg`;
const TITLE = 'Hữu Phát & Mỹ Duyên — Thiệp cưới · 07.11.2026';
const DESCRIPTION =
  'Trân trọng kính mời bạn đến dự lễ cưới của Hữu Phát & Mỹ Duyên — Thứ Bảy, 07/11/2026, 18:30, Sảnh BallRoom, Tầng 3 Khách sạn Caravelle.';

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

        {/* Favicon (no .ico in the project; reuse the couple avatar) */}
        <link rel="icon" type="image/jpeg" href="/assets/images/photos/avatar.jpg" />
        <link rel="apple-touch-icon" href="/assets/images/photos/avatar.jpg" />

        {/* Open Graph (Facebook / Zalo / Messenger link previews) */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Thiệp cưới Hữu Phát & Mỹ Duyên" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="500" />
        <meta property="og:image:height" content="838" />
        <meta property="og:image:alt" content="Hữu Phát & Mỹ Duyên" />
        <meta property="og:locale" content="vi_VN" />

        {/* Twitter card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE} />
      </Head>
      <InvitationApp />
    </>
  );
}
