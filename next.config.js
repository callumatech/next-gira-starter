/** @type {import('next').NextConfig} */

const apiUrl = process.env.API_URL;
const newApiUrl = process.env.NEW_API_URL;
const nextAuthUrl = process.env.NEXTAUTH_URL;
const nextAuthSecret = process.env.NEXTAUTH_SECRET;

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_URL: apiUrl,
    NEW_API_URL: newApiUrl,
    NEXTAUTH_URL: nextAuthUrl,
    NEXTAUTH_SECRET: nextAuthSecret,
  },
}

module.exports = nextConfig
