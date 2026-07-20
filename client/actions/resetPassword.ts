'use server';

import { ResetPasswordSchema } from "@/schemas/authSchema";
import * as z from "zod";

export const resetPassword = async (values: z.infer<typeof ResetPasswordSchema>) => {
    const validatedFields = ResetPasswordSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Inválid fields!" };
    }

    const { password, passwordConfirmation, code } = validatedFields.data;
    
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/reset-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                password,
                passwordConfirmation,
                code,
            }),
        });

        const data = await response.json();

        if (data.error) {
            return { error: `Something went wrong!` };
        } else {
            return { success: "Password reseted successfully" };
        }
    } catch (error) {
        return { error: `Error to reset password! - ${error}`};
    }
};