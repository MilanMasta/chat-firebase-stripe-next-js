"use client"

import { Message, sortedMessageRef } from '@/lib/converters/Message';
import { MessageCircleIcon } from 'lucide-react';
import { Session } from 'next-auth';
import { createRef, useEffect } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import UserAvatar from './UserAvatar';

interface ChatMessagesProps {
    chatId: string;
    session: Session | null;
    initialMessages: Message[];
}

function ChatMessages({ chatId, session, initialMessages }: ChatMessagesProps) {
    const messageEndRef = createRef<HTMLDivElement>();

    const [messages, loading, error] = useCollectionData<Message>(sortedMessageRef(chatId), {
        initialValue: initialMessages,
    });

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, messageEndRef]);

    return (
        <div className='p-5'>
            {!loading && messages?.length === 0 && (
                <div className="flex flex-col justify-center text-center items-center rounded-xl space-y-2 bg-indigo-400 text-white font-light">
                    <MessageCircleIcon className="w-20 h-20" />

                    <h2>
                        <span className="font-semibold">No messages yet.</span>
                        <br />
                        Send a message to get started.
                    </h2>
                </div>
            )}

            {messages?.map((message) => {
                const isSender = message.user.id === session?.user?.id;

                return (
                    <div key={message.id} className="flex my-2 items-end">
                        <div className={`flex flex-col relative space-y-2 p-4 w-fit line-clamp-1 mx-2 rounded-lg ${!isSender ? 'ml-auto bg-violet-600 text-white rounded-br-none' : 'bg-gray-100 dark:bg-slate-800 text-black dark:text-white'}`}>
                            <p
                                className={`text-xs italic font-extralight line-clamp-1 ${isSender ? "text-right" : "text-left"}`}
                            >
                                {message.user.name.split(" ")[0]}
                            </p>
                            <div className="flex flex-col space-x-2">
                                <p>{message.input}</p>
                            </div>
                        </div>
                        <UserAvatar
                            name={message.user.name}
                            image={message.user.image}
                            className={`${isSender && "-order-1"}`}
                        />
                    </div>
                )
            })}
        </div >
    )
}

export default ChatMessages