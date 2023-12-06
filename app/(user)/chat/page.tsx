import ChatList from "@/components/ChatList";

type Props = {
    params: {};
    searchParams: {
        error: string;
    };
};

function ChatsPage() {
  return (
    <div>
        {/* Chat Permissioner */}
        {/* ChatList  */}
        <ChatList />
    </div>
  )
}

export default ChatsPage