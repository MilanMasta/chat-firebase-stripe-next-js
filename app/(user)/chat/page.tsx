import ChatList from "@/components/ChatList";
import { ChatPermisionError } from "@/components/ChatPermisionError";

type Props = {
  params: {};
  searchParams: {
    error: string;
  };
};

function ChatsPage({ searchParams: { error } }: Props) {

  return (
    <div>
      {error == "permision" && <ChatPermisionError />}
      <ChatList />
    </div>
  )
}

export default ChatsPage