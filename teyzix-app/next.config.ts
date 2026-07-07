const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Yeh line build ke dauran kisi bhi type error ko ignore karegi
  },
  eslint: {
    ignoreDuringBuilds: true, // Yeh linting errors ko ignore karegi
  },
};

module.exports = nextConfig;