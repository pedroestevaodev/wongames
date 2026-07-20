import Icon from "./extensions/icon.png";
import Logo from "./extensions/logo.svg";

export default {
  config: {
		auth: {
			logo: Logo,
		},
		head: {
			favicon: Icon,
		},
		locales: [],
		translations: {
			en: {
				"Auth.form.welcome.title": "Welcome to Won Games!",
				"Auth.form.welcome.subtitle": "Log in to your account",
				"app.components.LeftMenu.navbrand.title": "Won Games Dashboard",
			},
		},
		menu: {
			logo: Icon,
		},
		theme: {
			light: {},
			dark: {},
		},
		tutorials: false,
		notifications: {
			releases: false,
		},
	},
  bootstrap() {},
};
