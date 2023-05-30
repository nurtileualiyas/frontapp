/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '' : '',
  publicRuntimeConfig: {
    contextPath: process.env.NODE_ENV === 'production' ? '' : '',
    apiBaseUrl: 'http://almaback.almatv.kz/api',
    baseUrl: 'http://almaback.almatv.kz'
  },
  async redirects() {
    return [
      {
        source: '/agreements',
        destination: '/indev',
        permanent: false,
      },
    ]
  },
  images: {
    domains: ['almaback.almatv.kz'],
  },
  i18n: {
    locales: ['kz', 'ru'],
    defaultLocale: 'kz',
    localeDetection: false,
  }
}

module.exports = nextConfig
