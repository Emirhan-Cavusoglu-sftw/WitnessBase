/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    experimental: {
        topLevelAwait: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};

export default nextConfig;