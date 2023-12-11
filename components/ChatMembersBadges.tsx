"use client"

import { Badge } from "@/components/ui/badge";
import { ChatMembers, ChatMembersRef } from "@/lib/converters/ChatMembers";
import { useCollectionData } from "react-firebase-hooks/firestore";
import LoadingSpinner from "./LoadingSpinner";
import { Button } from "./ui/button";
import UserAvatar from "./UserAvatar";
import useAdminId from "@/hooks/useAdminId";



function ChatMembersBadges({ chatId
}: { chatId: string }) {
    const [members, loading, error] = useCollectionData<ChatMembers>(ChatMembersRef(chatId)
    );
    const adminId = useAdminId({ chatId });

    if (loading && !members) return <LoadingSpinner />;

    if (error) return <>{`Error: ${error}`}</>;

    return (
        !loading && (
            <div className="p-2 border rounded-xl -5">
                <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 p-2">
                    {members?.map((member) => (
                        <Badge
                            variant="secondary"
                            key={member.email}
                            className="h-14 p-5 pl-2 pr-5 flex space-x-2"
                        >
                            <div className="flex items-center space-x-2">
                                <UserAvatar name={member.email} image={member.image} />
                            </div>
                            <div>
                                <p>{member.email}</p>
                                {member.userId === adminId && (
                                    <p className="text-indigo-400 animate-pulse">Admin</p>
                                )}

                            </div>
                        </Badge>
                    ))}
                </div>
            </div >
        )
    )
}

export default ChatMembersBadges;