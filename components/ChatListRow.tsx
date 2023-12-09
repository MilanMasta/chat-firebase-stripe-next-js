"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Message, limitedSortedMessageRef } from "@/lib/converters/Message";
import { useCollectionData } from "react-firebase-hooks/firestore";
import UserAvatar from "./UserAvatar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function ChatListRow({ chatId }: { chatId: string }) {

    const { data: session } = useSession();
    const router = useRouter();
    const [messages, loading, error] = useCollectionData<Message>(
        limitedSortedMessageRef(chatId)
    );

    function prettyUUID(n = 4) {
        return chatId.substring(0, n);
    }

    const row = (message?: Message) => (
        <div
            key={chatId}
            onClick={() => router.push(`/chat/${chatId}`)}
            className="flex p-5 items-center space-x-2 cursor-pointer hover:bg-gray-200 rounded-xl"
        >
            <UserAvatar
                name={message?.user.name || session?.user.name}
                image={message?.user.image || session?.user.image}
            />

            <div className="flex-1">
                <p className="font-bold">
                    {!message && "New Chat"}
                    {message &&
                        [message?.user.name || session?.user.name].toString().split(" ")[0]}
                </p>

                <p className="text-gray-400 line-clamp-1">
                    Get the conversation startted!
                </p>
            </div>

            <div className="text-xs text-gray-400 text-right">
                <p className="mb-auto">
                    {message
                        ? (message.timestamp && new Date(message.timestamp).toLocaleDateString())
                        : "No messages yet"}
                </p>
                <p className="">
                    chat #{prettyUUID()}
                </p>
            </div>
        </div>
    );

    return (
        <div>
            {loading && (
                <div className="flex p-5 items-center space-x-2">
                    <Skeleton className="h-12 -12 rounded-full" />
                    <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-1/4" />
                    </div>
                </div>
            )}

            {messages?.length === 0 && !loading && row()}

            {messages?.map((message) => row(message))}
        </div>
    );
}

export default ChatListRow