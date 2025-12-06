/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Docker 배포용
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
