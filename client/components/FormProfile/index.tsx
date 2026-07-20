'use client';

import React, { useState, useTransition } from 'react';
import * as z from "zod";
import * as S from './styles';
import Heading from '../Heading';
import TextField from '../TextField';
import Button from '../Button';
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ProfileSchema } from "@/schemas/profileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { FormError, FormLoading, FormSuccess } from "../Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { updateProfile } from "@/actions/updateProfile";
import { logout } from "@/actions/logout";

const FormProfile = () => {
	const { data: session } = useSession();

	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof ProfileSchema>>({
		resolver: zodResolver(ProfileSchema),
		defaultValues: {
			id: session?.user?.id || "",
			username: session?.user?.name || "",
			email: session?.user?.email || "",
		},
	});

	const onSubmit = (values: z.infer<typeof ProfileSchema>) => {
		setError("");
		setSuccess("");

		startTransition(() => {
			updateProfile(values)
				.then((data) => {
					if (data?.error) {
						form.reset();
						setError(data.error);
					}

					if (data?.success) {
						form.reset();
						setSuccess(data.success);

						const updatedUser = {
							...session?.user,
							name: data.me.username,
							email: data.me.email,
						};
						
						form.reset({
							username: updatedUser.name,
							email: updatedUser.email,
						});

						logout();
					}
				}).catch((error) => {
					console.log("Error in update profile", error);
                    setError("Something went wrong f!");
				});
		});
	};

	return (
		<>
			<Heading lineBottom color="black" size="small">
				My profile
			</Heading>

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

			<S.Form
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
							label="Username"
							placeholder="username"
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
							label="Email"
							placeholder="Email"
							error={fieldState.error?.message}
							disabled={isPending}
						/>
					)}
				/>

				<S.ButtonContainer>
					<Button
						as={Link}
						href={`/forgot-password?email=${session?.user?.email}`}
						size="medium"
						minimal
					>
						Reset Password
					</Button>

					<Button 
						type="submit"
						size="large"
						disabled={isPending}
					>
						{isPending ? (
							<FormLoading src="/img/dots.svg" alt="Loading" width={20} height={20} />
						) : (
							<span>Save</span>
						)}
					</Button>
				</S.ButtonContainer>

			</S.Form>
		</>
	);
};

export default FormProfile;
