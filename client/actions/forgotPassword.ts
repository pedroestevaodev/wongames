'use server';

import { ForgotPasswordSchema } from "@/schemas/authSchema";
import * as z from "zod";

export const forgotPassword = async (values: z.infer<typeof ForgotPasswordSchema>) => {
    const validatedFields = ForgotPasswordSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Inválid field!" };
    }

    const { email } = validatedFields.data;
    
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (data.error) {
            return { error: `Something went wrong!` };
        } else {
            return { success: "Email sent successfully" };
        }
    } catch (error) {
        return { error: `Error to forgot password! - ${error}`};
    }
};