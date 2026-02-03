/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  // On GitHub Pages, the site is served from /jainmandir/
  basePath: isProd ? '/jainmandir' : '',
  assetPrefix: isProd ? '/jainmandir/' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
