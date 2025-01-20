import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    env: {
        API_KEY: '5a3242dc1f82d8b2e62a3531da2830f4'
    },
    images: {
        remotePatterns: [ {
            protocol: 'https',
            hostname: 'openweathermap.org',
            pathname: '/img/wn/**', // Matches the image path
        },
            {
                protocol: 'https',
                hostname: 'pic.onlinewebfonts.com',
                pathname: '/thumbnails/**', // Matches the image path
            }
        ],
    },
};

export default nextConfig;
