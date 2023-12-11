import { authOptions } from "@/auth";
import AdminControls from "@/components/AdminControls";
import ChatInput from "@/components/ChatInput";
import ChatMembersBadges from "@/components/ChatMembersBadges";
import ChatMessages from "@/components/ChatMessages";
import { ChatMembersRef } from "@/lib/converters/ChatMembers";
import { sortedMessageRef } from "@/lib/converters/Message";
import { getDocs } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function ChatPage({ params: { chatId } }: { params: { chatId: string } }) {
  const session = await getServerSession(authOptions);
  const initialMessages = (await getDocs(sortedMessageRef(chatId))).docs.map((doc) => doc.data());

  const hasAccess = (await getDocs(ChatMembersRef(chatId))).docs.
    map((doc) => doc.id).includes(session?.user.id);
  if (!hasAccess) {
    redirect('/chat?error=permision')
  }

  return (
    <>
      <AdminControls chatId={chatId} />
      <ChatMembersBadges chatId={chatId} />
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