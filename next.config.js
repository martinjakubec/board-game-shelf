/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cf.geekdo-images.com"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
