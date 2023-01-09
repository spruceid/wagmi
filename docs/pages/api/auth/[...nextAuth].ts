import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { SSXNextAuth } from "@spruceid/ssx-react/next-auth/backend";
import { SSXServer } from "@spruceid/ssx-server";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
    const ssx = new SSXServer();
    const { credentials, authorize, session } = SSXNextAuth(req, res, ssx);
    const providers = [
        CredentialsProvider({
            name: "Ethereum",
            credentials,
            authorize,
        }),
    ];

    return await NextAuth(req, res, {
        providers,
        session: {
            strategy: "jwt",
        },
        secret: process.env.NEXT_AUTH_SECRET,
        callbacks: {
            session,
        },
    });
}
