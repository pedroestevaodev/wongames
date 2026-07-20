import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string({ required_error: "Email is required" })
        .min(1, "Email is required")
        .email("Inválid email"),
    password: z.string({ required_error: "Password is required" })
        .min(1, "Password is required")
        .min(4, "Password must be more than 4 characters")
        .max(32, "Password must be less than 32 characters"),
});

export const RegisterSchema = z.object({
    email: z.string({ required_error: "Email is required" })
        .min(1, "Email is required")
        .email("Inválid email"),
    password: z.string({ required_error: "Password is required" })
        .min(1, "Password is required")
        .min(4, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters"),
    username: z.string({ required_error: "Username is required" })
        .min(1, "Username is required")
        .min(4, "Username must be more than 4 characters")
        .max(25, "Username must be less than 25 characters"),
});

export const ForgotPasswordSchema = z.object({
    email: z.string({ required_error: "Email is required" })
        .min(1, "Email is required")
        .email("Inválid email"),
});

export const ResetPasswordSchema = z.object({
    password: z.string({ required_error: "Password is required" })
        .min(1, "Password is required")
        .min(4, "Password must be more than 4 characters")
        .max(32, "Password must be less than 32 characters"),
    passwordConfirmation: z.string({ required_error: "Password is required" })
        .min(1, "Password is required")
        .min(4, "Password must be more than 4 characters")
        .max(32, "Password must be less than 32 characters"),
    code: z.string(),
}).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
});