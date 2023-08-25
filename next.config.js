const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    formats: ['image/webp'],
    domains: ['avatars.githubusercontent.com'],
  },
}

module.exports = withContentlayer(nextConfig)
