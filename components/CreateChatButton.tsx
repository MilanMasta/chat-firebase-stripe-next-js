"use client"

import { LucideMessageSquarePlus } from "lucide-react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation";

function CreateChatButton() {
    const router = useRouter();

    const createNewChat = async () => {

        router.push('/chat/abc');
    }
    return (
        <Button variant={"ghost"}>
            <LucideMessageSquarePlus />
        </Button>)

}

export default CreateChatButton