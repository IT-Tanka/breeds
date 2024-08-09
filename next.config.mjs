/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_CAT_API_URL: 'https://api.thecatapi.com/v1/images',
    NEXT_PUBLIC_DOG_API_URL: 'https://api.thedogapi.com/v1/images',
  },
  images: {
    domains: ['cdn2.thedogapi.com', 'cdn2.thecatapi.com'],
  },
};

export default nextConfig;
