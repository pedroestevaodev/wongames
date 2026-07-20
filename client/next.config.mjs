/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,
	compress: true,
	compiler: {
		removeConsole: true,
		styledComponents: true
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
				port: ''
			},
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '1337'
			},
			{
				protocol: 'https',
				hostname: 'wongames-api-2801443db7ef.herokuapp.com',
				port: ''
			},
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com',
				port: ''
			}
		]
	}
};

export default nextConfig;
