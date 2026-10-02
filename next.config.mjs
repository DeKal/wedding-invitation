/** @type {import('next').NextConfig} */
const nextConfig = {
  // Serve the pre-built invitation page (public/invitation.html) at the root.
  // Kept as a static document so its inline scripts and styled-jsx run unchanged.
  async rewrites() {
    return [{ source: '/', destination: '/invitation.html' }];
  },
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
