'use client';

import React, { useState, useTransition } from 'react';
import * as z from "zod";
import Link from 'next/link';
import TextField from '../TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser, faCircleExclamation, faCheck } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button';
import { useMutation } from "@apollo/client";
import { MUTATION_REGISTER } from "@/graphql/mutations/register";
import { FormError, FormLink, FormLoading, FormSuccess, FormWrapper } from "../Form";
import { RegisterSchema } from "@/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { login } from "@/actions/login";
import { useSession } from "next-auth/react";

const FormSignUp = () => {
	const { update } = useSession();

	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const [createUser] = useMutation(MUTATION_REGISTER, {
		onError: (err) => {
			setError(err.graphQLErrors[0].message);
		},
		onCompleted: () => {
			if (!error) {
				login({
					email: form.getValues("email") as string,
					password: form.getValues("password") as string,
				});
			}
		},
	});

	const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
		setError("");
        setSuccess("");

		const validatedFields = RegisterSchema.safeParse(values);

		if (!validatedFields.success) {
			return { error: "Inválid fields!" };
		}

		startTransition(() => {
			createUser({
				variables: {
					input: {
						username: values.username,
						email: values.email,
						password: values.password,
					},
				},
			}).then((data) => {
				if (data.errors) {
					form.reset();
					setError(data.errors[0].message);
				}

				if (data.data) {
				    form.reset();
				    setSuccess("Success to create user!");
				}

				update();
			}).catch((error) => {
				console.log("Error in login", error);
				setError(error);
			})
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

			<form
				method="POST"
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<Controller
					control={form.control}
					name="username"
					render={({ field, fieldState }) => (
						<TextField
							{...field}
							type="text"
							placeholder="Username"
							icon={<FontAwesomeIcon icon={faUser} />}
							error={fieldState.error?.message}
							disabled={isPending}
						/>
					)}
				/>
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

				<Button
					type="submit"
					size="large"
					fullWidth
					disabled={isPending}
				>
					{isPending ? (
						<FormLoading src="/img/dots.svg" alt="Loading" />
					) : (
						<span>Sign up now</span>
					)}
				</Button>

				<FormLink>
					Already have an account? <Link href="/sign-in">Sign in</Link>
				</FormLink>
			</form>
		</FormWrapper>
	);
};

export default FormSignUp;
