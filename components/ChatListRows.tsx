import React from 'react';
import { ChatMembers } from '@/lib/converters/ChatMembers';

function ChatListRows({ initialChats }: { initialChats: ChatMembers[] }) {
    return (
        <div>
            {initialChats.map((chat) => (
                <div key={chat.chatId}>
                    <img src={chat.image} alt={chat.email} />
                    <p>{chat.email}</p>
                    <p>{chat.timestamp instanceof Date ? chat.timestamp.toString() : ''}</p>
                    <p>{chat.isAdmin ? 'Admin' : 'User'}</p>
                </div>
            ))}
        </div>
    );
}

export default ChatListRows;