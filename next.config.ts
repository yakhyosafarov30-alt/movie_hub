/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.uzmovi.tv",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com", // fallback image
      },
    ],
  },
};

export default nextConfig;
