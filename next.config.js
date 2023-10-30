/** @type {import('next').NextConfig} */
const nextConfig = {
  modularizeImports: {
    "@radix-ui": {
      transform: "@radix-ui/{{member}}",
    },
    "@emotion": {
      transform: "@emotion/{{member}}",
    },
    "react-icons/?(((w)?/?)*)": {
      transform: "react-icons/{{ matches.[1] }}/{{member}}",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.stripe.com",
        port: "",
        pathname: "/links/**",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
