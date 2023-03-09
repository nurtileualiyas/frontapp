/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '' : '',
  publicRuntimeConfig: {
    contextPath: process.env.NODE_ENV === 'production' ? '' : '',
    apiBaseUrl: 'http://almaback.almatv.kz/api',
    baseUrl: 'http://almaback.almatv.kz'
  }
}

module.exports = nextConfig
