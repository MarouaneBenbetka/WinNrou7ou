/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: [
			"dynamic-media-cdn.tripadvisor.com",
			"images.pexels.com",
			"i0.wp.com",
		],
	},
};

module.exports = nextConfig;
