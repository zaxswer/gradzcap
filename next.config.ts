// next.config.ts
const nextConfig = {
  turbopack: {
    // Empty turbopack config to silence Turbopack warnings
  },
  serverExternalPackages: ['algosdk'],
  webpack: (config: any, { isServer }: any) => {
    if (!isServer) {
      config.externals = config.externals || []
      config.externals.push({
        'algosdk': 'algosdk',
      })

      // Fallbacks for Node built-ins used by algosdk
      config.resolve.fallback = {
        ...config.resolve.fallback,
        crypto: false,
        buffer: require.resolve('buffer/'),
        stream: false,
        path: false,
        fs: false,
      }
    }
    return config
  },
}

export default nextConfig