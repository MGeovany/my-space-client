import TerserPlugin from 'terser-webpack-plugin'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.google.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config) => {
    config.optimization.minimizer = [
      new TerserPlugin({
        terserOptions: {
          format: {
            ascii_only: true,
          },
        },
      }),
    ]
    return config
  },
}

export default nextConfig
