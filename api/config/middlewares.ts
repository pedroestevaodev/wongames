export default [
	'strapi::logger',
	'strapi::errors',
	'strapi::security',
	'strapi::cors',
	'strapi::poweredBy',
	'strapi::query',
	'strapi::body',
	'strapi::session',
	'strapi::favicon',
	'strapi::public',
	{
		name: 'strapi::security',
		config: {
			contentSecurityPolicy: {
				useDefaults: true,
				directives: {
					'connect-src': ["'self'", 'https:', 'https://proxy-event.ckeditor.com'],
					'frame-src': ["'self'", 'https://www.youtube.com'],
					'img-src': ["'self'", 'data:', 'blob:', 'market-assets.strapi.io', 'res.cloudinary.com', 'https://www.youtube.com'],
					'media-src': [
						"'self'",
						'data:',
						'blob:',
						'market-assets.strapi.io',
						'res.cloudinary.com',
						'https://www.youtube.com',
					],
					'script-src': ["'self'", 'https://cdn.ckeditor.com', process.env.MY_HEROKU_URL],
					upgradeInsecureRequests: null,
				},
			},
		},
	},
];
