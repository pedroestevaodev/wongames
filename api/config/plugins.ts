import type { EmailConfig } from "strapi-plugin-email-designer-5/dist/server/src";

export default ({ env }) => ({
	email: {
		config: {
			provider: "nodemailer",
			providerOptions: {
				host: env('SMTP_HOST', 'smtp.gmail.com'),
				port: env('SMTP_PORT', 587),
				service: "gmail",
				auth: {
					user: env('SMTP_USERNAME'),
					pass: env('SMTP_PASSWORD'),
				},
			},
			settings: {
				defaultFrom: 'contatonoisefy@gmail.com',
				defaultReplyTo: 'contatonoisefy@gmail.com',
			},
		},
	},
	"email-designer-5": {
		enabled: true,
		config: {
			mergeTags: {
				company: {
					name: "Won Games",
					mergeTags: {
						name: {
							name: "Won Games",
							value: "Won Games",
							sample: "Won Games",
						},
					},
				},
			},
		} as EmailConfig,
	},
	upload: {
		config: {
			provider: 'cloudinary',
			providerOptions: {
				cloud_name: env('CLOUDINARY_CLOUD_NAME'),
				api_key: env('CLOUDINARY_API_KEY'),
				api_secret: env('CLOUDINARY_API_SECRET'),
			},
			actionOptions: {
				upload: {},
				uploadStream: {
					folder: process.env.CLOUDINARY_FOLDER || 'wongames-assets',
				},
				delete: {},
			},
		},
	},
});
