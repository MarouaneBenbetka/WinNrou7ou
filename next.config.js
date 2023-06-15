/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: [
			"dynamic-media-cdn.tripadvisor.com",
			"images.pexels.com",
			"i0.wp.com",
			"media-cdn.tripadvisor.com",
			"pbs.twimg.com",
			"lh3.googleusercontent.com",
		],
	},
};

module.exports = nextConfig;
