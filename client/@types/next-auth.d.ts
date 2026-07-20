import { User as DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

export type ExtendedUser = DefaultUser & {
    documentId?: string | null;
    jwt?: string | null;
};

declare module "next-auth/jwt" {
    export interface JWT extends DefaultJWT {
        id?: string | null;
        jwt?: string | null;
    };
};

declare module "next-auth" {
    export interface User extends ExtendedUser {
        documentId?: string | null;
        jwt?: string | null;
    };
    export interface Session {
        user: ExtendedUser;
    };
};