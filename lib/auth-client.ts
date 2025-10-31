import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({})

export const signIn = async (provider: "google" | "github") => {
    const data = await authClient.signIn.social({
        provider: provider
    })
}