'use server';

import { signOut } from '@/services/auth';

export const logout = async () => {
	try {
		await signOut({
			redirect: false
		});
	} catch (error) {
		return { error: `Error to logout! - ${error}` };
	}
};
