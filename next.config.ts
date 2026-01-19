import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
            },
        ],
    },
    serverExternalPackages: ["qrcode", "form-data"],
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                canvas: false,
            };
        }
        return config;
    },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
