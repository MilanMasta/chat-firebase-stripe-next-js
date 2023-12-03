import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import Image from "next/image"

function UserAvatar({
    name,
    image,
    className
}: {
    name?: string | null;
    image?: string | null;
    className?: string;
}) {
    return (
        <Avatar className={cn("bg-white text-black", className)}>
            {image && (
                <Image
                    src={image}
                    alt={name || ""}
                    width={40}
                    height={40}
                    className="rounded-full"
                />
            )}
            <AvatarFallback>
                A
            </AvatarFallback>
        </Avatar>
    )
}

export default UserAvatar