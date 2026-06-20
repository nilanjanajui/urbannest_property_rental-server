import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

export const auth = betterAuth({
    database: mongodbAdapter(client.db("property-rental")),

    emailAndPassword: {
        enabled: true,
    },

    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
    },

    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "tenant",
            },
            photo: {
                type: "string",
                required: false,
                defaultValue: "",
            },
        },
    },

    databaseHooks: {
        user: {
            create: {
                before: async (user) => {
                    return {
                        data: {
                            ...user,
                            role: user.role || "tenant",
                        },
                    };
                },
            },
        },
    },

    trustedOrigins: [process.env.CLIENT_URL],
});