import { LoginSchema } from "@/schemas/authSchema";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { ZodError } from "zod";

export const { handlers, signIn, signOut, auth } = NextAuth({
    session: {
        strategy: "jwt",
    },
    providers: [
        Credentials({
            type: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                try {
                    const { email, password } = await LoginSchema.parseAsync(credentials);

                    const credentialDetails = {
                        identifier: email,
                        password: password,
                    };

                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/local`, {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(credentialDetails),
                    });

                    const data = await response.json();

                    if (data.user) {
                        return { ...data.user, name: data.user.username, jwt: data.jwt };
                    } else {
                        return null;
                    }
                } catch (error) {
                    if (error instanceof ZodError) {
                        return null;
                    }
                }
            },
        }),
    ],
    pages: {
        signIn: "/sign-in",
        signOut: "/sign-in",
    },
    callbacks: {
        session: async ({ token, session }) => {
            if (token.id && session.user) {
                session.user.id = token.id;
            }

            if (token.jwt) {
                session.user.jwt = token.jwt;
            }

            if (session.user) {
                session.user.name = token.name;
                session.user.email = token.email as string;
            }

            return session;
        },
        jwt: async ({ token, user }) => {
            if (!token.sub) return token;
            if (!user) return token;

            token.id = user.documentId;
            token.name = user.name;
            token.email = user.email;
            token.jwt = user.jwt;

            return token;
        },
    },
});
