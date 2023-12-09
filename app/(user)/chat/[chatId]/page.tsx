import { authOptions } from "@/auth";
import ChatInput from "@/components/ChatInput";
import ChatMessages from "@/components/ChatMessages";
import { sortedMessageRef } from "@/lib/converters/Message";
import { getDocs } from "firebase/firestore";
import { getServerSession } from "next-auth";

async function ChatPage({ params: { chatId } }: { params: { chatId: string } }) {
  const session = await getServerSession(authOptions);
 const initialMessages = (await getDocs(sortedMessageRef(chatId))).docs.map((doc) => doc.data());

  return (
    <>
      <div className="flex-1">
        <ChatMessages
          chatId={chatId}
          session={session}
          initialMessages={initialMessages}
        />
      </div>
      <ChatInput chatId={chatId} />
    </>
  );
}

export default ChatPage