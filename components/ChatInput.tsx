"use client"

import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem } from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import React from 'react';
import { addDoc, getDocs, serverTimestamp } from 'firebase/firestore';
import { User, limitedMessageRef, messageRef } from '@/lib/converters/Message';
import { isPro } from '@/lib/utils';
import { toast } from './ui/use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
    input: z.string().max(1000),
})

function ChatInput({ chatId }: { chatId: string }) {

    const { data: session } = useSession();
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            input: '',
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const inputCopy = values.input.trim();
        form.reset();
        if (inputCopy.length === 0) return;

        if (!session?.user) return;


        const messages = (await getDocs(limitedMessageRef(chatId))).docs.map((doc) => doc.data()
        ).length;

        const isProActive = isPro(session?.user.subscription);

        if (!isProActive && messages >= 20) {
            toast({
                title: 'Upgrade to Pro',
                description: 'You have reached the limit of 20 messages per chat. Upgrade to Pro to send more messages.',
                duration: 5000,
                variant: 'destructive',
                action: (
                    <ToastAction
                        altText='Upgrade'
                        onClick={() => router.push("/register")}>
                        Upgrade to PRO
                    </ToastAction>
                ),
            });

            return;
        }
        const userToStore: User = {
            id: session.user.id!,
            name: session.user.name!,
            image: session.user.image || "",
            email: session.user.email!,
        }

        addDoc(messageRef(chatId), {
            input: inputCopy,
            user: userToStore,
            timestamp: serverTimestamp(),
        });

    }

    return (
        <div>
            <div className="sticky bottom-0">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex space-x-2 rounded-t-xl max-w-4xl mx-auto bg-white border dark:bg-slate-800"
                    >
                        <FormField
                            control={form.control}
                            name="input"
                            render={({ field }) => (
                                <FormItem className='flex-1'>
                                    <FormControl>
                                        <Input
                                            className='border-none bg-transparent dark:placeholder:text-white/70'
                                            placeholder='Enter message'
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="bg-violet-600 text-white">
                            Send
                        </Button>
                    </form>
                </Form>
            </div >
        </div>
    )
}
export default ChatInput