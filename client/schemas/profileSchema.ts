import * as z from "zod";

export const ProfileSchema = z.object({
    id: z.string(),
    email: z.string({ required_error: "Email is required" })
        .min(1, "Email is required")
        .email("Inválid email"),
    username: z.string({ required_error: "Username is required" })
        .min(1, "Username is required")
        .min(4, "Username must be more than 4 characters")
        .max(25, "Username must be less than 25 characters"),
});