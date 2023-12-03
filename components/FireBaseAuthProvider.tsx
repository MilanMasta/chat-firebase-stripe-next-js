'use client'

import { auth } from "@/firebase";
import { signInWithCustomToken } from "firebase/auth";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect } from "react"

async function syncFirebaseAuth(session: Session) {
    console.log("SSS");
    console.log(session.firebaseToken);
    console.log("SSS2");
    
    if (session && session.firebaseToken) {
        try {
            await signInWithCustomToken(auth, session.firebaseToken);
        } catch (e) {
            console.log("Error signing in with custom token: " + e);
        }
    } else {
        auth.signOut();
    }
}

export default function FireBaseAuthProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const { data: session } = useSession();

    useEffect(() => {
        if (!session) return;

        syncFirebaseAuth(session);
    }, [])
    return <>{children}</>
}

