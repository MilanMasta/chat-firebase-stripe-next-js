"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import UserAvatar from "./UserAvatar"
import { Session } from "next-auth"
import { Button } from "./ui/button"
import { signIn, signOut } from "next-auth/react"
import { useSubscriptionStore } from "@/store/store"
import LoadingSpinner from "./LoadingSpinner"
import { StarIcon } from "lucide-react"
import ManageAccountButton from "./ManageAccountButton"
import { isPro } from "@/lib/utils"

function UserButton({ session }: { session: Session | null }) {
    const subscription = useSubscriptionStore(state => state.subscription) || null;
    const isSubActivePro = isPro(subscription);

    if (!session) {
        return (
            <Button
            variant={"outline"}
            onClick={() => signIn()}
            className="flex ml-4 z-50">
                Sign In
            </Button>
        )
    }

    return session && (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <UserAvatar
                    name={session.user?.name}
                    image={session.user?.image}
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel
                    className="flex justify-center items-center space-x-1"
                >
                    {session.user?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {subscription === undefined && (
                    <DropdownMenuItem
                        className="flex justify-center items-center space-x-1">
                        <LoadingSpinner />
                    </DropdownMenuItem>
                )}

                {isSubActivePro && (
                    <>
                        <DropdownMenuLabel className="text-xs flex text-[#E935C1] justify-center items-center space-x-1 animate-pulse">
                            <StarIcon fill="#E935C1" />
                            <p>PRO</p>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="flex justify-center items-center space-x-1">
                            <ManageAccountButton />
                        </DropdownMenuItem>
                    </>
                )}
                <DropdownMenuItem
                    className="flex justify-center items-center space-x-1"
                    onClick={() => signOut()}>
                    Sign Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserButton