'use server';

import { ProfileSchema } from "@/schemas/profileSchema";
import { auth } from "@/services/auth";
import * as z from "zod";

export const updateProfile = async (values: z.infer<typeof ProfileSchema>) => {
    const session = await auth();

    const token = session?.user.jwt;

    const validatedFields = ProfileSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Inválid fields!" };
    }

    const { id, username, email } = validatedFields.data;

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                username,
                email,
            }),
        });

        const data = await response.json();

        if (data.error) {
            return { error: `Something went wrong s!` };
        } else {
            return { success: "Profile updated successfully", me: data };
        }
    } catch (error) {
        return { error: `Error to update profile! - ${error}` };
    }
};