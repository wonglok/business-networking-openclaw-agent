/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            'sharp$': false,
            'onnxruntime-node$': false,
            // "@huggingface/transformers": false
        }

        if (dev) {
            config.devServer = config.devServer || {}
            config.devServer.allowedHosts = 'all'

        }

        return config
    }
    ,
    images: {
        unoptimized: process.env.NODE_ENV === 'development',
    },
    devIndicators: false
};

export default config;
