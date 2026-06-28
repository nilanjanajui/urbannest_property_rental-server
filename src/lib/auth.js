import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI);

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,
    database: mongodbAdapter(client.db("urbarnest-admin")),

    plugins: [jwt()],

    advanced: {
        useSecureCookies: true,
        defaultCookieAttributes: {
            sameSite: "none",
            secure: true,
        },
    },

    emailAndPassword: { enabled: true },

    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
    },

    user: {
        additionalFields: {
            role: { type: "string", defaultValue: "tenant" },
            photo: { type: "string", required: false, defaultValue: "" },
        },
    },

    databaseHooks: {
        user: {
            create: {
                before: async (user) => ({
                    data: { ...user, role: user.role || "tenant" },
                }),
            },
        },
    },

    trustedOrigins: [process.env.CLIENT_URL],
});