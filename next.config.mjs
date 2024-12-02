// next.config.mjs
export default {
    webpack(config, { isServer }) {
      if (!isServer) {
        // Ignore Node.js specific modules like `fs` during the build for the client
        config.resolve.fallback = {
          fs: false,
          path: false,
          os: false,
        };
      }
      return config;
    },
  };
  