'use client';

import React, { useState, useTransition } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import * as S from './styles';
import Button from '../Button';
import TextField from '../TextField';
import { Controller, useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faEnvelope,
	faLock,
	faCircleExclamation,
	faCheck
} from '@fortawesome/free-solid-svg-icons';
import { useSearchParams } from 'next/navigation';
import { LoginSchema } from '@/schemas/authSchema';
import { login } from '@/actions/login';
import {
	FormError,
	FormLink,
	FormLoading,
	FormSuccess,
	FormWrapper
} from '../Form';
import { signIn } from 'next-auth/react';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

const FormSignIn = () => {
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get('callbackUrl');

	const [error, setError] = useState<string | undefined>('');
	const [success, setSuccess] = useState<string | undefined>('');
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	});

	const onSubmit = (values: z.infer<typeof LoginSchema>) => {
		setError('');
		setSuccess('');

		startTransition(async () => {
			try {
				const result = await login(values);

				if (result?.error) {
					form.reset();
					setError(result.error);
				}

				await signIn('credentials', {
					redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT
				});
			} catch (error) {
				console.log('Error in login', error);
				setError('Something went wrong!');
			}
		});
	};

	return (
		<FormWrapper>
			{!!error && (
				<FormError>
					<FontAwesomeIcon icon={faCircleExclamation} />
					{error}
				</FormError>
			)}
			{!!success && (
				<FormSuccess>
					<FontAwesomeIcon icon={faCheck} />
					{success}
				</FormSuccess>
			)}

			<form method="POST" onSubmit={form.handleSubmit(onSubmit)}>
				<Controller
					control={form.control}
					name="email"
					render={({ field, fieldState }) => (
						<TextField
							{...field}
							type="email"
							placeholder="Email"
							icon={<FontAwesomeIcon icon={faEnvelope} />}
							error={fieldState.error?.message}
							disabled={isPending}
						/>
					)}
				/>
				<Controller
					control={form.control}
					name="password"
					render={({ field, fieldState }) => (
						<TextField
							{...field}
							type="password"
							placeholder="Password"
							icon={<FontAwesomeIcon icon={faLock} />}
							error={fieldState.error?.message}
							disabled={isPending}
						/>
					)}
				/>

				<S.ForgotPassword href="/forgot-password">
					Forgot your password?
				</S.ForgotPassword>

				<Button
					type="submit"
					size="large"
					fullWidth
					disabled={isPending}
				>
					{isPending ? (
						<FormLoading
							src="/img/dots.svg"
							alt="Loading"
							width={20}
							height={20}
						/>
					) : (
						<span>Sign in now</span>
					)}
				</Button>

				<FormLink>
					Don’t have an account? <Link href="/sign-up">Sign up</Link>
				</FormLink>
			</form>
		</FormWrapper>
	);
};

export default FormSignIn;
