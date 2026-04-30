import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "../../utils/prisma";

// const resend = new Resend(process.env.RESEND_API_KEY!);

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailVerification: {
        autoSignInAfterVerification: true,
       
    },
    
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
        requireEmailVerification: false,

       
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