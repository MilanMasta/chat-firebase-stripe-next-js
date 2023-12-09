import { authOptions } from '@/auth'
import { chatMemberCollectionGroupRef } from '@/lib/converters/ChatMembers';
import { getDocs } from 'firebase/firestore';
import { getServerSession } from 'next-auth'
import ChatListRows from './ChatListRows';

export default async function ChatList() {
    const session = await getServerSession(authOptions);
    
    const chatsSnashot = await getDocs(
        chatMemberCollectionGroupRef(session?.user.id!)
    );

    const initialChats = chatsSnashot.docs.map((doc) => ({
        ...doc.data(),
        timestamp: null,
    }));

    return (
        <ChatListRows initialChats={initialChats} />
    )
}
