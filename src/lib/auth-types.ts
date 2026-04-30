import { authClient } from "./auth-client";

//  custom user fields
export interface CustomUser {
    id: string;
    email: string;
    name: string;
    emailVerified: boolean;
    image?: string | null;
    createdAt: Date;
    updatedAt: Date;
    
}

// export a helper to cast the session
export type Session = {
    user: CustomUser;
    session: typeof authClient.$Infer.Session.session;
} | null;