/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "platform-lookaside.fbsbx.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: '',
        pathname: "/**",
        search: ""
      },
      {
        protocol: "https",
        hostname: "s2.coinmarketcap.com",
        port: '',
        pathname: "/**",
        search: ""
      },
      {
        protocol: "https",
        hostname: "crypto.snapi.dev",
        port: '',
        pathname: "/**",
        search: ""
      },
    ]
  },
};

export default nextConfig;
