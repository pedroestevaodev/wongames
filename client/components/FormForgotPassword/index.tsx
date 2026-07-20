'use client';

import { FormError, FormLoading, FormSuccess, FormWrapper } from "../Form";
import * as z from "zod";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCircleExclamation, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordSchema } from "@/schemas/authSchema";
import TextField from "../TextField";
import Button from "../Button";
import { forgotPassword } from "@/actions/forgotPassword";

const FormForgotPassword = () => {
    const searchParams = useSearchParams();
    const searchEmail = searchParams.get("email");

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
        resolver: zodResolver(ForgotPasswordSchema),
        defaultValues: {
            email: searchEmail || "",
        },
    });

    const onSubmit = (values: z.infer<typeof ForgotPasswordSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            forgotPassword(values)
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
                    console.log("Error in forgot password", error);
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
                            name="email"
                            render={({ field, fieldState }) => (
                                <TextField 
                                    {...field}
                                    type="text"
                                    placeholder="Email"
                                    icon={<FontAwesomeIcon icon={faEnvelope} />}
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
                                <span>Send email</span>
                            )}
                        </Button>
                    </form>
                </>
            )}
        </FormWrapper>
    );
};

export default FormForgotPassword;