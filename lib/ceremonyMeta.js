// Per-ceremony SEO/metadata, index-aligned with CEREMONIES in
// components/sections/InformationSection.jsx (0 = le-cuoi, 1 = le-vu-quy).
// Each route (/, /le-cuoi, /le-vu-quy) renders <Head> from one of these so the
// link preview, canonical URL and schema.org Event reflect the ceremony shown.

export const SITE_URL = 'https://phat-duyen-wedding.vercel.app';
export const OG_IMAGE = `${SITE_URL}/assets/images/og-cover.jpg?v=2`; // 1200x644 (resized from 3082; big one broke Messenger previews). ?v busts FB + CDN cache.

// URL slug per ceremony, index-aligned with CEREMONY_META / CEREMONIES.
export const EVENT_SLUG = ['le-cuoi', 'le-vu-quy'];

// Actual route path per ceremony. Lễ Cưới is the default and lives at the root
// (there is no /le-cuoi route), so the sticky-note toggle rewrites to '/' for it
// and '/le-vu-quy' for the other.
export const EVENT_PATH = ['/', '/le-vu-quy'];

export const CEREMONY_META = [
  {
    // Lễ Cưới — wedding party at Caravelle (default, served at the root /)
    canonicalPath: '/',
    title: 'Hữu Phát & Mỹ Duyên — Thiệp cưới · 07.11.2026',
    description:
      'Trân trọng kính mời bạn đến dự lễ cưới của Hữu Phát & Mỹ Duyên — Thứ Bảy, 07/11/2026, 18:30, Sảnh BallRoom, Tầng 3 Khách sạn Caravelle.',
    jsonLd: {
      name: 'Lễ cưới Hữu Phát & Mỹ Duyên',
      startDate: '2026-11-07T18:30:00+07:00',
      locationName: 'Khách sạn Caravelle — Sảnh BallRoom, Tầng 3',
      streetAddress: '19-23 Công trường Lam Sơn, Bến Nghé, Quận 1',
      addressLocality: 'Thành phố Hồ Chí Minh',
    },
    srOnly: {
      heading: 'Hữu Phát & Mỹ Duyên — Thiệp cưới',
      intro: 'Trân trọng kính mời quý khách đến dự lễ cưới của Hữu Phát & Mỹ Duyên.',
      time: 'Thời gian: Thứ Bảy, 07/11/2026, 18:30 (Âm lịch 29/09).',
      place: 'Địa điểm: Sảnh BallRoom, Tầng 3, Khách sạn Caravelle, Thành phố Hồ Chí Minh.',
    },
  },
  {
    // Lễ Vu Quy — bride's family rite at Thái Mỹ (served at /le-vu-quy)
    canonicalPath: '/le-vu-quy',
    title: 'Lễ Vu Quy Hữu Phát & Mỹ Duyên · 06.11.2026',
    description:
      'Trân trọng kính mời bạn đến dự Lễ Vu Quy của Hữu Phát & Mỹ Duyên — Thứ Sáu, 06/11/2026, 11:00, 18 Đường 656, Phước Hưng 1, X.Thái Mỹ, TP HCM.',
    jsonLd: {
      name: 'Lễ Vu Quy Hữu Phát & Mỹ Duyên',
      startDate: '2026-11-06T11:00:00+07:00',
      locationName: 'Tư gia — Lễ Vu Quy',
      streetAddress: '18 Đường 656, Phước Hưng 1, X.Thái Mỹ',
      addressLocality: 'Thành phố Hồ Chí Minh',
    },
    srOnly: {
      heading: 'Hữu Phát & Mỹ Duyên — Lễ Vu Quy',
      intro: 'Trân trọng kính mời quý khách đến dự Lễ Vu Quy của Hữu Phát & Mỹ Duyên.',
      time: 'Thời gian: Thứ Sáu, 06/11/2026, 11:00 (Âm lịch 28/09).',
      place: 'Địa điểm: 18 Đường 656, Phước Hưng 1, X.Thái Mỹ, Thành phố Hồ Chí Minh.',
    },
  },
];
