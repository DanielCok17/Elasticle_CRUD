import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    // Ignorovanie problémových modulov
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "aws-sdk": false,
      "mock-aws-s3": false,
      "nock": false,
      "@mapbox/node-pre-gyp": false,
      "fs.realpath": false,
    };

    return config;
  },
};

export default nextConfig;
