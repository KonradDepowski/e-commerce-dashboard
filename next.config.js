module.exports = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
    optimizePackageImports: [
      "react-icons",
      "lucide-react",
      "recharts",
      "@radix-ui/react-icons",
    ],
  },
};
