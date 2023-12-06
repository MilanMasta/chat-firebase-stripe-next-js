/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        esmExternals: false,
    },
    images: {
        domains: ["lh3.googleusercontent.com", "giphy.com"],
    },
}

module.exports = nextConfig
