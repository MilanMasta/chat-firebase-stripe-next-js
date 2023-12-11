"user client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import useAdminId from "@/hooks/useAdminId";
import { useSubscriptionStore } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod"
import { PlusCircleIcon } from "lucide-react"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useToast } from "./ui/use-toast"
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form"
import { getDocs, serverTimestamp, setDoc } from "firebase/firestore"
import { ChatMembersRef, addChatRef } from "@/lib/converters/ChatMembers"
import { isPro } from "@/lib/utils"
import { ToastAction } from "@radix-ui/react-toast"
import { getUserByEmailRef } from "@/lib/converters/User"
import ShareLink from "./ShareLink";

interface InviteUserProps {
    chatId: string;
}

const formSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
});

function InviteUser({ chatId }: InviteUserProps) {
    const { data: session } = useSession();
    const { toast } = useToast();
    const adminId = useAdminId({ chatId });
    const subscription = useSubscriptionStore((state) => state.subscription);
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [openInviteLink, setOpenInviteLink] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (!session?.user.id) return;
        
        if (session?.user.email === values.email) {
            toast({
                title: "Error",
                description: "You can't invite yourself.",
                variant: "destructive",
            });
            return;
        }

        toast({
            title: "Sending invite...",
            description: "We're sending an invite to the user you specified.",
        })

        const noOfUsersInChat = (await getDocs(ChatMembersRef(chatId))).docs.map((doc) => doc.id).length;

        const isProMember = isPro(subscription || null);

        if (!isProMember && noOfUsersInChat >= 2) {
            toast({
                title: "Upgrade to Pro",
                description: "You need to upgrade to Pro to invite more than 2 users to a chat.",
                variant: "destructive",
                action: (
                    <ToastAction
                        altText="Upgrade to Pro"
                        onClick={() => router.push("/register")}
                    >
                        Upgrade to Pro
                    </ToastAction>
                )
            });
            return;
        }

        const querySnapshot = await getDocs(getUserByEmailRef(values.email));

        if (querySnapshot.empty) {
            toast({
                title: "User not found",
                description: "We couldn't find a user with that email address.",
                variant: "destructive",
            });
            return;
        } else {
            const user = querySnapshot.docs[0].data();

            await setDoc(addChatRef(chatId, user.id), {
                userId: user.id,
                email: user.email!,
                timestamp: serverTimestamp(),
                chatId: chatId,
                isAdmin: false,
                image: user.image || "",
            }).then(() => {
                toast({
                    title: "Invite sent",
                    description: `We've sent an invite to ${user.email}.`,
                    className: "bg-green-500 text-white",

                });
                setOpenInviteLink(true);
            }).catch((error) => {
                toast({
                    title: "Error",
                    description: error.message,
                    variant: "destructive",
                });
            });

        }

        form.reset();

    }
    return (
        adminId === session?.user?.id && (
            <>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusCircleIcon className="mr-1">Invite User</PlusCircleIcon>
                            Add User
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Invite User</DialogTitle>
                            <DialogDescription>
                                Invite a user to this chat
                            </DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="flex flex-col space-y-3"
                            >
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="example@ex.co" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <DialogFooter>
                                    <Button variant="secondary" onClick={() => setOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit">Invite</Button>
                                </DialogFooter>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog >

                <ShareLink
                    isOpen={openInviteLink}
                    setIsOpen={setOpenInviteLink}
                    chatId={chatId}
                />
            </>
        )
    )
}

export default InviteUser
