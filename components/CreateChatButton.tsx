"use client"

import { LucideMessageSquarePlus } from "lucide-react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useToast } from "./ui/use-toast";
import { useSubscriptionStore } from "@/store/store";
import LoadingSpinner from "./LoadingSpinner";
import { v4 as uuidv4 } from 'uuid';
import { serverTimestamp, setDoc } from "@firebase/firestore";
import { addChatRef } from "@/lib/converters/ChatMembers";

export default function CreateChatButton({ isLarge }: { isLarge?: boolean }) {
    const router = useRouter();
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const subscription = useSubscriptionStore(state => state.subscription);

    const createNewChat = async () => {
        if (!session?.user.id) return;

        setLoading(true);
        toast({
            title: "Creating new chat...",
            duration: 3000,
            className: "bg-indigo-500 text-white",
            description: "This may take a few seconds",
        });

        const chatId = uuidv4();

        await setDoc(addChatRef(chatId, session.user.id), {
            userId: session.user.id,
            email: session.user.email!,
            timestamp: serverTimestamp(),
            isAdmin: true,
            chatId: chatId,
            image: session.user.image || "",
        }).then(() => {
            toast({
                title: "Chat created!",
                duration: 3000,
                className: "bg-green-500 text-white",
                description: "You can now start chatting with your friend",
            });
            router.push(`/chat/${chatId}`);
        }).catch((e) => {
            console.error(e);
            toast({
                duration: 3000,
                description: "Please try again later",
                variant: "destructive",
            });
        }
        ).finally(() => {
            setLoading(false);
        });

    }

    if (isLarge)
        return (
            <div>
                <Button variant={"default"} onClick={createNewChat}>
                    {loading ? <LoadingSpinner /> : "Create Chat"}
                </Button>
            </div>
        )

    return (
        <Button onClick={createNewChat} variant={"ghost"}>
            <LucideMessageSquarePlus />
        </Button>)
}