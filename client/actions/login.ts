'use server';

import * as z from 'zod';
import { LoginSchema } from '@/schemas/authSchema';
import { signIn } from '@/services/auth';
import { AuthError } from 'next-auth';

export const login = async (values: z.infer<typeof LoginSchema>) => {
	const validatedFields = LoginSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'Inválid fields!' };
	}

	const { email, password } = validatedFields.data;

	try {
		await signIn('credentials', {
			email,
			password,
			redirect: false
		});
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return { error: 'Invalid credentials!' };
				default:
					return { error: `Something went wrong! - ${error}` };
			}
		}

		throw error;
	}
};
