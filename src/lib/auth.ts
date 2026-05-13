import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "../../utils/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
  emailVerification: {
        autoSignInAfterVerification: true,
        sendOnSignUp: true, 
        sendVerificationEmail: async ({ user, url, token }) => {
            await resend.emails.send({
                from: "ShieldLimit <onboarding@shreyaa.me>", 
                to: user.email,
                subject: "Verify your email address",
                html: `Click the link to verify your email: <a href="${url}">Verify Email</a>`,
            });
        },
    },

    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
        requireEmailVerification: false, 
        sendResetPassword: async ({ user, url, token }) => {
            await resend.emails.send({
                from: "ShieldLimit <auth@shreyaa.me>",
                to: user.email,
                subject: "Reset your password",
                html: `<p>Click <a href="${url}">here</a> to reset your password.</p>`,
            });
    },
},
    
 

  account: {
        accountLinking: {
            enabled: true,
            trustedProviders: ["google", "github"], 
        }
    }, 

socialProviders: {
    github: {
        clientId: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
    google: {
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
     
    },
},


});