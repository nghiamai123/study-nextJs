/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imgvisuals.com",
        port: "",
        pathname: "/cdn/**",
      },
    ],
  },
};

export default nextConfig;
