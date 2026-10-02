/** @type {import('next').NextConfig} */
const nextConfig = {
  // The React invitation (pages/index.jsx) is served at the root. The original
  // static export remains reachable at /invitation.html for reference.
  // Long-cache the localized assets (fonts, images, music), matching the old vercel.json.
  async headers() {
    return [
      {
        source: '/assets/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

export default nextConfig;
