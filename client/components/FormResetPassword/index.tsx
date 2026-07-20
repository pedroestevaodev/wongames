'use client';

import { FormError, FormLoading, FormSuccess, FormWrapper } from "../Form";
import * as z from "zod";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCircleExclamation, faLock } from '@fortawesome/free-solid-svg-icons';
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordSchema } from "@/schemas/authSchema";
import TextField from "../TextField";
import Button from "../Button";
import { resetPassword } from "@/actions/resetPassword";

const FormResetPassword = () => {
    const searchParams = useSearchParams();
    const searchCode = searchParams.get("code");

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof ResetPasswordSchema>>({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            password: '',
            passwordConfirmation: '',
            code: searchCode || '',
        },
    });

    const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            resetPassword(values)
                .then((data) => {
                    if (data?.error) {
                        form.reset();
                        setError(data.error);
                    }

                    if (data.success) {
                        form.reset();
                        setSuccess(data.success);
                    }
                }).catch((error) => {
                    console.log("Error in reset password", error);
                    setError("Something went wrong!");
                });
        });
    };

    return (
        <FormWrapper>
            {success ? (
                <FormSuccess>
                    <FontAwesomeIcon icon={faCheck} />
                    {success}
                </FormSuccess>
            ) : (
                <>
                    {!!error && (
                        <FormError>
                            <FontAwesomeIcon icon={faCircleExclamation} />
                            {error}
                        </FormError>
                    )}
                    <form
                        method="POST"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
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
                        <Controller 
                            control={form.control}
                            name="passwordConfirmation"
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    type="password"
                                    placeholder="Confirm Password"
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
                                <FormLoading src="/img/dots.svg" alt="Loading" width={20} height={20} />
                            ) : (
                                <span>Reset Password</span>
                            )}
                        </Button>
                    </form>
                </>
            )}
        </FormWrapper>
    );
};

export default FormResetPassword;